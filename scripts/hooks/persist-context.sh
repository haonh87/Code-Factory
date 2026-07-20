#!/usr/bin/env bash
# PreCompact hook: persist workflow state before context compression.
# When /compact is called, Claude Code compresses conversation context.
# This hook saves critical state so SessionStart can restore it.
#
# What gets persisted:
#   - Active work items (step, status, approval)
#   - TDD session state (production/test files tracked)
#   - Hook profile currently active
#   - Instincts file path (for reload)
#
# Output: none required (this hook runs for side effects only)
set -euo pipefail

# Read stdin JSON from Claude Code
INPUT=$(cat || echo '{}')

# Find project root
find_project_root() {
  local dir="${1:-$(pwd)}"
  while [ "$dir" != "/" ]; do
    if [ -f "$dir/workflow-bundle.manifest.json" ] || [ -f "$dir/package.json" ]; then
      echo "$dir"
      return 0
    fi
    dir=$(dirname "$dir")
  done
  echo "$(pwd)"
}

PROJECT_ROOT=$(find_project_root "$(dirname "$0")")
STATE_DIR="$PROJECT_ROOT/.claude"
STATE_FILE="$STATE_DIR/session-state.json"
TDD_STATE_FILE="$STATE_DIR/tdd-session-state.json"
COMPACT_STATE_FILE="$STATE_DIR/compact-state.json"

# Write stdin to temp file
INPUT_FILE=$(mktemp)
echo "$INPUT" > "$INPUT_FILE"

# Persist state in a single node call
node -e "
  const fs = require('fs');
  const path = require('path');
  const projectRoot = '$PROJECT_ROOT';
  const stateDir = '$STATE_DIR';
  const stateFile = '$STATE_FILE';
  const tddStateFile = '$TDD_STATE_FILE';
  const compactStateFile = '$COMPACT_STATE_FILE';
  const inputFile = '$INPUT_FILE';

  // Ensure .claude directory exists
  if (!fs.existsSync(stateDir)) fs.mkdirSync(stateDir, { recursive: true });

  // Build compact state from available sources
  const compactState = {
    compacted_at: new Date().toISOString(),
    hook_profile: process.env.CF_HOOK_PROFILE || 'strict',
    disabled_hooks: process.env.CF_DISABLED_HOOKS || ''
  };

  // Preserve TDD session state if it exists
  try {
    const tddState = JSON.parse(fs.readFileSync(tddStateFile, 'utf8'));
    compactState.tdd = {
      production_files: tddState.production_files || [],
      test_files: tddState.test_files || [],
      session_id: tddState.session_id || 'unknown'
    };
  } catch(_e) { /* no TDD state */ }

  // Preserve workflow session state if it exists
  try {
    const sessionState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    compactState.workflow = sessionState;
  } catch(_e) { /* no session state */ }

  // Scan work-items for active items (same logic as SessionStart)
  const wiDir = path.join(projectRoot, 'work-items');
  const activeItems = [];
  try {
    for (const entry of fs.readdirSync(wiDir, {withFileTypes: true})) {
      if (!entry.isDirectory()) continue;
      const reportPath = path.join(wiDir, entry.name, entry.name + '.work-item-report.json');
      if (!fs.existsSync(reportPath)) continue;
      try {
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        const status = (report.protocol_status || '').toUpperCase();
        if (['ACTIVE','BLOCKED','PROPOSED','READY_TO_MATERIALIZE','MATERIALIZED'].includes(status)) {
          activeItems.push({
            slug: report.work_item_slug || entry.name,
            step: report.current_step || 'unknown',
            status: report.protocol_status || 'UNKNOWN',
            approval: report.approval_status || 'PENDING_REVIEW'
          });
        }
      } catch(_e) { /* skip */ }
    }
  } catch(_e) { /* no work-items dir */ }
  compactState.active_work_items = activeItems;

  // Read project instincts count for reference
  const instinctsFile = path.join(stateDir, 'instincts.yaml');
  try {
    const yaml = fs.readFileSync(instinctsFile, 'utf8');
    compactState.instincts_count = (yaml.match(/^- id:/gm) || []).length;
  } catch(_e) {
    compactState.instincts_count = 0;
  }

  // Write compact state
  fs.writeFileSync(compactStateFile, JSON.stringify(compactState, null, 2));
" 2>/dev/null

# Clean up
rm -f "$INPUT_FILE"

exit 0