#!/usr/bin/env bash
# PostToolUse hook: TDD tracking — record Edit/Write file paths into session state.
# This hook runs AFTER a successful Edit or Write tool call.
# It records which production files and test files were modified,
# so the Stop hook can summarize TDD compliance at end of session.
#
# Hook runtime controls:
#   CF_HOOK_PROFILE=minimal    — all TDD hooks disabled (docs-only sessions)
#   CF_HOOK_PROFILE=standard   — TDD tracking only, no blocking
#   CF_HOOK_PROFILE=strict     — TDD enforce + track (default, full enforcement)
#   CF_DISABLED_HOOKS=tdd-enforce,tdd-track-write — disable specific hooks by ID
set -euo pipefail

# --- Hook runtime controls ---
HOOK_ID="tdd-track-write"
PROFILE="${CF_HOOK_PROFILE:-strict}"
DISABLED="${CF_DISABLED_HOOKS:-}"

is_disabled() {
  if [ -n "$DISABLED" ]; then
    case ",$DISABLED," in
      *",$HOOK_ID,"*) return 0 ;;
    esac
  fi
  case "$PROFILE" in
    minimal) return 0 ;;
    *) return 1 ;;
  esac
}

if is_disabled; then
  exit 0
fi

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
STATE_FILE="$PROJECT_ROOT/.claude/tdd-session-state.json"

# Write input to temp file for reliable processing
INPUT_FILE=$(mktemp)
echo "$INPUT" > "$INPUT_FILE"

# Process in a single node call
node -e "
  const fs = require('fs');
  const path = require('path');
  const projectRoot = '$PROJECT_ROOT';
  const stateFile = '$STATE_FILE';
  const inputFile = '$INPUT_FILE';

  // Read stdin JSON
  let d = {};
  try { d = JSON.parse(fs.readFileSync(inputFile, 'utf8')); } catch(_e) {}

  const toolName = (d.tool_name || '').toLowerCase();
  if (toolName !== 'edit' && toolName !== 'write') { process.exit(0); }

  const filePath = d.tool_input?.file_path || d.tool_input?.path || '';
  if (!filePath) { process.exit(0); }

  const sessionId = d.session_id || 'unknown';

  // Make path relative to project root
  let relPath = filePath;
  if (relPath.startsWith(projectRoot + '/')) {
    relPath = relPath.slice(projectRoot.length + 1);
  } else if (relPath.startsWith(projectRoot)) {
    relPath = relPath.slice(projectRoot.length);
  }

  // Classify: test file, exempt file, or production file
  // Exempt files are not tracked — they don't need TDD coverage
  const isTest = relPath.includes('/test/') || relPath.includes('/__tests__/') ||
    relPath.endsWith('.test.js') || relPath.endsWith('.spec.js') ||
    relPath.endsWith('.test.ts') || relPath.endsWith('.spec.ts');

  // Same exemption logic as tdd-enforce.sh — skip config, docs, hooks, etc.
  const isExempt = relPath.endsWith('.json') || relPath.endsWith('.yaml') || relPath.endsWith('.yml') ||
    relPath.endsWith('.toml') || relPath.endsWith('.lock') || relPath.endsWith('.txt') ||
    relPath.endsWith('.md') || relPath.endsWith('.css') || relPath.endsWith('.html') ||
    relPath.endsWith('.svg') || relPath.endsWith('.png') || relPath.endsWith('.jpg') ||
    relPath.endsWith('.ico') || relPath.endsWith('.sh') || relPath.endsWith('.ps1') ||
    relPath.endsWith('.cmd') || relPath.endsWith('.bat') ||
    relPath.includes('/scripts/hooks/') ||
    !(relPath.includes('/scripts/') || relPath.includes('/packages/') || relPath.includes('/mcp/'));

  if (isExempt) { process.exit(0); }

  const fileType = isTest ? 'test' : 'production';

  // Read existing state or create new
  let state = { session_id: sessionId, production_files: [], test_files: [], started_at: new Date().toISOString() };
  try {
    state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  } catch(_e) { /* new session */ }

  // Reset state if session changed
  if (state.session_id && state.session_id !== sessionId) {
    state = { session_id: sessionId, production_files: [], test_files: [], started_at: new Date().toISOString() };
  }
  state.session_id = sessionId;
  state.updated_at = new Date().toISOString();

  // Add file to appropriate list (deduplicate)
  if (fileType === 'test') {
    if (!state.test_files.includes(relPath)) state.test_files.push(relPath);
  } else {
    if (!state.production_files.includes(relPath)) state.production_files.push(relPath);
  }

  // Ensure .claude directory exists
  const dir = path.dirname(stateFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
" 2>/dev/null

# Clean up temp file
rm -f "$INPUT_FILE"

exit 0