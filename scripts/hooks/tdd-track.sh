#!/usr/bin/env bash
# Stop hook: TDD compliance summary + instinct recommendations at end of session.
# Reads session state and instincts, outputs summary with suggestions for
# new instincts based on session patterns.
#
# Hook runtime controls:
#   CF_HOOK_PROFILE=minimal    — all TDD hooks disabled (docs-only sessions)
#   CF_HOOK_PROFILE=standard   — TDD tracking only, no blocking
#   CF_HOOK_PROFILE=strict     — TDD enforce + track (default, full enforcement)
#   CF_DISABLED_HOOKS=tdd-enforce,tdd-track — disable specific hooks by ID
set -euo pipefail

# --- Hook runtime controls ---
HOOK_ID="tdd-track"
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
INSTINCTS_FILE="$PROJECT_ROOT/.claude/instincts.yaml"

# Write stdin to temp file for reliable processing
INPUT_FILE=$(mktemp)
echo "$INPUT" > "$INPUT_FILE"

# Check if state file exists — if not, skip TDD summary but still check instincts
TDD_STATE_EXISTS="false"
if [ -f "$STATE_FILE" ]; then
  TDD_STATE_EXISTS="true"
fi

# Process everything in a single node call
node -e "
  const fs = require('fs');
  const projectRoot = '$PROJECT_ROOT';
  const stateFile = '$STATE_FILE';
  const instinctsFile = '$INSTINCTS_FILE';
  const inputFile = '$INPUT_FILE';
  const tddExists = '$TDD_STATE_EXISTS' === 'true';

  // Read stdin for session end context
  let stdin = {};
  try { stdin = JSON.parse(fs.readFileSync(inputFile, 'utf8')); } catch(_e) {}

  let msg = '';

  // --- TDD Compliance Summary ---
  if (tddExists) {
    let state;
    try {
      state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    } catch(_e) {
      state = null;
    }

    if (state) {
      const prodFiles = state.production_files || [];
      const testFiles = state.test_files || [];

      if (prodFiles.length > 0 || testFiles.length > 0) {
        const uncovered = prodFiles.filter(pf => {
          const baseName = pf.replace(/\\.[^.]+$/, '').split('/').pop();
          return !testFiles.some(tf => {
            const testBaseName = tf.replace(/\\.[^.]+$/, '').split('/').pop();
            return testBaseName.includes(baseName.replace(/\\.test$/, '').replace(/\\.spec$/, ''));
          });
        });

        msg += '[TDD Compliance Summary]\\n';
        msg += 'Production files modified: ' + prodFiles.length + '\\n';
        msg += 'Test files modified: ' + testFiles.length + '\\n';

        if (uncovered.length > 0) {
          msg += 'Files without test coverage: ' + uncovered.length + '\\n';
          for (const f of uncovered) {
            msg += '  - ' + f + '\\n';
          }
          msg += '\\nPer governance policy, behavior changes require TDD evidence.';
          msg += ' If any of these files contain behavior changes, write tests before marking done.\\n';
        } else {
          msg += 'All modified production files have corresponding test changes. Good TDD compliance.\\n';
        }
      }
    }
  }

  // --- Instinct Recommendations ---
  // Parse existing instincts to avoid duplicates
  let existingIds = new Set();
  try {
    const yaml = fs.readFileSync(instinctsFile, 'utf8');
    for (const line of yaml.split('\\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- id:')) {
        existingIds.add(trimmed.slice(5).trim());
      }
    }
  } catch(_e) { /* no instincts file yet */ }

  // Detect patterns that suggest new instincts
  let recommendations = [];

  // Pattern 1: TDD violations suggest an instinct about testing workflow
  if (tddExists) {
    try {
      const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
      const uncovered = (state.production_files || []).filter(pf => {
        const baseName = pf.replace(/\\.[^.]+$/, '').split('/').pop();
        return !(state.test_files || []).some(tf => {
          const testBaseName = tf.replace(/\\.[^.]+$/, '').split('/').pop();
          return testBaseName.includes(baseName.replace(/\\.test$/, '').replace(/\\.spec$/, ''));
        });
      });
      if (uncovered.length > 2 && !existingIds.has('always-tdd-for-behavior-changes')) {
        recommendations.push({
          id: 'always-tdd-for-behavior-changes',
          trigger: 'editing production code in scripts/ or packages/',
          action: 'write corresponding test file first per governance TDD rule',
          domain: 'testing',
          reason: 'Multiple TDD violations detected this session (' + uncovered.length + ' uncovered files)'
        });
      }
    } catch(_e) {}
  }

  // Pattern 2: If session modified hook scripts, suggest verifying in live session
  let modifiedHooks = false;
  if (tddExists) {
    try {
      const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
      const allFiles = [...(state.production_files || []), ...(state.test_files || [])];
      if (allFiles.some(f => f.includes('/scripts/hooks/')) && !existingIds.has('verify-hooks-in-live-session')) {
        recommendations.push({
          id: 'verify-hooks-in-live-session',
          trigger: 'modifying files in scripts/hooks/',
          action: 'test hooks in a live Claude Code session after shell simulation — hook env differs from interactive shell',
          domain: 'testing',
          reason: 'Hook scripts were modified this session'
        });
      }
    } catch(_e) {}
  }

  // Pattern 3: If session modified manifest or config, suggest version bump check
  if (tddExists) {
    try {
      const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
      const allFiles = [...(state.production_files || []), ...(state.test_files || [])];
      if (allFiles.some(f => f.includes('manifest.json') || f.includes('package.json'))
          && !existingIds.has('version-bump-smoke-test')) {
        recommendations.push({
          id: 'version-bump-smoke-test',
          trigger: 'modifying manifest.json or bundle version',
          action: 'update version assertion in smoke test and run npm run test:smoke before committing',
          domain: 'release',
          reason: 'Manifest or package.json was modified this session'
        });
      }
    } catch(_e) {}
  }

  if (recommendations.length > 0) {
    msg += '\\n[Instinct Recommendations]\\n';
    msg += 'The following patterns were detected this session. Consider adding them as instincts:\\n';
    for (const rec of recommendations) {
      msg += '\\n  - id: ' + rec.id + '\\n';
      msg += '    trigger: \"' + rec.trigger + '\"\\n';
      msg += '    action: \"' + rec.action + '\"\\n';
      msg += '    domain: ' + rec.domain + '\\n';
      msg += '    reason: ' + rec.reason + '\\n';
    }
    msg += '\\nTo add: say \\'save that instinct\\' or manually add to .claude/instincts.yaml\\n';
  }

  if (!msg) { process.exit(0); }

  const output = {
    hookSpecificOutput: {
      hookEventName: 'Stop',
      systemMessage: msg
    }
  };
  process.stdout.write(JSON.stringify(output));
" 2>/dev/null

# Clean up
rm -f "$INPUT_FILE"

exit 0