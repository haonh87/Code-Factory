#!/usr/bin/env bash
# SessionStart hook: inject workflow state into Claude Code context
# Called automatically when a new session starts.
# Outputs JSON with additionalContext and sessionTitle for Claude Code to read.
set -euo pipefail

# Read stdin JSON from Claude Code
INPUT=$(cat || echo '{}')

# Find project root by searching upward for the workflow bundle manifest
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

# Detect harness mode from environment and home directories
detect_mode() {
  if [ -n "${CLAUDE_HOME:-}" ]; then echo "claude"; return 0; fi
  if [ -n "${CODEX_HOME:-}" ]; then echo "codex"; return 0; fi
  if [ -d "$HOME/.claude" ] && [ ! -d "$HOME/.codex" ]; then echo "claude"; return 0; fi
  if [ -d "$HOME/.codex" ] && [ ! -d "$HOME/.claude" ]; then echo "codex"; return 0; fi
  echo "claude"
}

# Extract cwd from stdin JSON
CWD=$(echo "$INPUT" | node -e "
  let d = {};
  try { d = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); } catch(_e) {}
  process.stdout.write(d.cwd || process.cwd());
" 2>/dev/null || pwd)

PROJECT_ROOT=$(find_project_root "$CWD")
MODE=$(detect_mode)

# Run wfc status for bundle info — extract only the JSON part from the combined output
WFC_BIN="$PROJECT_ROOT/packages/workflow-bundle/bin/wfc.js"
BUNDLE_STATUS='{}'
if [ -f "$WFC_BIN" ]; then
  BUNDLE_STATUS=$(cd "$PROJECT_ROOT" && node "$WFC_BIN" status --mode "$MODE" --json 2>/dev/null | node -e "
    // wfc status --json outputs a summary line followed by a JSON block.
    // Extract the JSON block starting from the first line that begins with '{'.
    const lines = require('fs').readFileSync('/dev/stdin','utf8').split('\n');
    let jsonStart = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('{')) { jsonStart = i; break; }
    }
    if (jsonStart >= 0) {
      process.stdout.write(lines.slice(jsonStart).join('\n'));
    } else {
      process.stdout.write('{}');
    }
  " 2>/dev/null || echo '{}')
fi

# Scan work-items directory for active protocol reports
scan_work_items=$(node -e "
  const fs = require('fs');
  const path = require('path');
  const projectRoot = '$PROJECT_ROOT';
  const items = [];
  const wiDir = path.join(projectRoot, 'work-items');
  if (!fs.existsSync(wiDir)) { process.stdout.write('[]'); process.exit(0); }
  try {
    for (const entry of fs.readdirSync(wiDir, {withFileTypes:true})) {
      if (!entry.isDirectory()) continue;
      const reportPath = path.join(wiDir, entry.name, entry.name + '.work-item-report.json');
      if (!fs.existsSync(reportPath)) continue;
      try {
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        const status = (report.protocol_status || '').toUpperCase();
        if (['ACTIVE','BLOCKED','PROPOSED','READY_TO_MATERIALIZE','MATERIALIZED'].includes(status)) {
          items.push({
            slug: report.work_item_slug || entry.name,
            step: report.current_step || 'unknown',
            status: report.protocol_status || 'UNKNOWN',
            approval: report.approval_status || 'PENDING_REVIEW',
            context: report.delivery_context || 'brownfield',
            type: report.work_item_type || 'FEATURE',
            blockers: Array.isArray(report.blockers) ? report.blockers.join(', ') || 'none' : 'none',
            next_actions: Array.isArray(report.required_actions) ? report.required_actions.join(', ') || 'none' : 'none'
          });
        }
      } catch(_e) { /* skip malformed reports */ }
    }
  } catch(_e) { /* directory scan failed */ }
  process.stdout.write(JSON.stringify(items));
" 2>/dev/null || echo '[]')

# Read previous session state if available (prefer compact state over regular)
SESSION_STATE=""
STATE_FILE="$PROJECT_ROOT/.claude/session-state.json"
COMPACT_STATE_FILE="$PROJECT_ROOT/.claude/compact-state.json"
if [ -f "$COMPACT_STATE_FILE" ]; then
  SESSION_STATE=$(cat "$COMPACT_STATE_FILE" 2>/dev/null || echo '')
  # Remove compact state after reading — it's a one-time restore, not persistent state
  rm -f "$COMPACT_STATE_FILE"
elif [ -f "$STATE_FILE" ]; then
  SESSION_STATE=$(cat "$STATE_FILE" 2>/dev/null || echo '')
fi

# Read project instincts if available
INSTINCTS_FILE="$PROJECT_ROOT/.claude/instincts.yaml"
INSTINCTS_DATA=""
if [ -f "$INSTINCTS_FILE" ]; then
  INSTINCTS_DATA=$(cat "$INSTINCTS_FILE" 2>/dev/null || echo '')
fi

# Write variables to temp files to avoid shell escaping issues with JSON
BUNDLE_FILE=$(mktemp)
SCAN_FILE=$(mktemp)
STATE_FILE_TMP=$(mktemp)
INSTINCTS_FILE_TMP=$(mktemp)
echo "$BUNDLE_STATUS" > "$BUNDLE_FILE"
echo "$scan_work_items" > "$SCAN_FILE"
[ -n "$SESSION_STATE" ] && echo "$SESSION_STATE" > "$STATE_FILE_TMP" || echo '{}' > "$STATE_FILE_TMP"
[ -n "$INSTINCTS_DATA" ] && echo "$INSTINCTS_DATA" > "$INSTINCTS_FILE_TMP" || echo '' > "$INSTINCTS_FILE_TMP"

# Format and output JSON for Claude Code
node -e "
  const fs = require('fs');
  let bundle = {};
  try { bundle = JSON.parse(fs.readFileSync('$BUNDLE_FILE', 'utf8')); } catch(_e) {}

  let items = [];
  try { items = JSON.parse(fs.readFileSync('$SCAN_FILE', 'utf8')); } catch(_e) {}

  let prevState = null;
  try {
    const raw = fs.readFileSync('$STATE_FILE_TMP', 'utf8').trim();
    prevState = raw ? JSON.parse(raw) : null;
  } catch(_e) {}

  // Parse project instincts from YAML (simple line-by-line parser, no yaml dependency)
  let instincts = [];
  try {
    const yaml = fs.readFileSync('$INSTINCTS_FILE_TMP', 'utf8');
    let current = null;
    for (const line of yaml.split('\\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- id:')) {
        if (current) instincts.push(current);
        current = { id: trimmed.slice(5).trim() };
      } else if (current && trimmed.startsWith('trigger:')) {
        current.trigger = trimmed.slice(8).trim().replace(/^[\"']|[\"']$/g, '');
      } else if (current && trimmed.startsWith('action:')) {
        current.action = trimmed.slice(7).trim().replace(/^[\"']|[\"']$/g, '');
      } else if (current && trimmed.startsWith('domain:')) {
        current.domain = trimmed.slice(7).trim();
      }
    }
    if (current) instincts.push(current);
  } catch(_e) {}

  let ctx = '[Workflow State — Auto-loaded]\\n';
  ctx += 'Mode: ' + (bundle.runtime_mode || 'unknown') + ' | ';
  ctx += 'Bundle: ' + (bundle.bundle_name || 'unknown');
  if (bundle.source_bundle_version) ctx += ' v' + bundle.source_bundle_version;
  ctx += ' | ';
  ctx += 'Skills: ' + ((bundle.managed_skills || []).length || 0) + ' managed\\n';
  ctx += 'Active work items: ' + items.length + '\\n';

  for (const item of items) {
    ctx += '\\nWork item: ' + item.slug + '\\n';
    ctx += '  Step: ' + item.step + ' | Status: ' + item.status + ' | Approval: ' + item.approval + '\\n';
    ctx += '  Delivery context: ' + item.context + ' | Type: ' + item.type + '\\n';
    if (item.blockers && item.blockers !== 'none') ctx += '  Blockers: ' + item.blockers + '\\n';
    if (item.next_actions && item.next_actions !== 'none') ctx += '  Next actions: ' + item.next_actions + '\\n';
  }

  if (prevState) {
    // Check if this is a compact state restore (from /compact)
    const isCompactRestore = prevState.compacted_at !== undefined;
    if (isCompactRestore) {
      ctx += '\\n[Restored from compact — context was compressed]\\n';
      ctx += '  Compacted at: ' + (prevState.compacted_at || 'unknown') + '\\n';
      if (prevState.hook_profile) ctx += '  Hook profile: ' + prevState.hook_profile + '\\n';
      if (prevState.tdd) {
        ctx += '  TDD state: ' + (prevState.tdd.production_files || []).length + ' prod, ' + (prevState.tdd.test_files || []).length + ' test files tracked\\n';
      }
      if (prevState.active_work_items && prevState.active_work_items.length > 0) {
        ctx += '  Work items at compact time: ' + prevState.active_work_items.length + '\\n';
        for (const wi of prevState.active_work_items) {
          ctx += '    - ' + wi.slug + ': ' + wi.step + ' (' + wi.status + ')\\n';
        }
      }
    } else {
      ctx += '\\nPrevious session: ' + (prevState.ended_at || 'unknown');
      if (prevState.last_step) ctx += '\\n  Last step: ' + prevState.last_step;
      if (prevState.open_items) ctx += '\\n  Open: ' + prevState.open_items;
      ctx += '\\n';
    }
  }

  if (instincts.length > 0) {
    ctx += '\\n[Instincts — Project]\\n';
    for (const inst of instincts) {
      ctx += '  [' + (inst.domain || '?') + '] ' + inst.id + ':\\n';
      ctx += '    trigger: ' + (inst.trigger || '?') + '\\n';
      ctx += '    action: ' + (inst.action || '?') + '\\n';
    }
  }

  const title = items.length > 0
    ? items[0].slug + ' | ' + items[0].step
    : 'Code-Factory';

  const watchPaths = items.length > 0
    ? items.map(function(i) { return 'work-items/' + i.slug + '/'; })
    : [];

  const output = {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: ctx,
      sessionTitle: title,
      watchPaths: watchPaths
    }
  };
  process.stdout.write(JSON.stringify(output));
"

# Cleanup temp files
rm -f "$BUNDLE_FILE" "$SCAN_FILE" "$STATE_FILE_TMP" "$INSTINCTS_FILE_TMP"
# Non-blocking guarantee: luôn exit 0 (nhất quán với các hook khác)
exit 0
