#!/usr/bin/env bash
# PreToolUse hook: TDD enforcement — block Edit/Write on production files
# when no corresponding test file exists.
#
# Hook runtime controls:
#   CF_HOOK_PROFILE=minimal    — all TDD hooks disabled (docs-only sessions)
#   CF_HOOK_PROFILE=standard   — TDD tracking only, no blocking
#   CF_HOOK_PROFILE=strict     — TDD enforce + track (default, full enforcement)
#   CF_DISABLED_HOOKS=tdd-enforce,tdd-track-write — disable specific hooks by ID
#
# Behavior (strict mode):
#   - Reads stdin JSON from Claude Code (PreToolUse event)
#   - Extracts tool_name and file_path from tool_input
#   - If tool is Edit or Write and file is a production code file:
#     - Check if corresponding test file exists
#     - If test file missing: exit 2 (block) with message
#     - If test file exists: exit 0 (allow)
#   - Exempted files (config, docs, hooks, tests) always exit 0
#
# Test file convention:
#   packages/X/scripts/foo.js  → packages/X/test/foo.test.js
#   mcp/X/src/bar.js           → mcp/X/test/bar.test.js
#   mcp/X/src/baz/handler.js   → mcp/X/test/baz/handler.test.js
#   scripts/foo.js             → scripts/test/foo.test.js
set -euo pipefail

# --- Hook runtime controls ---
HOOK_ID="tdd-enforce"
PROFILE="${CF_HOOK_PROFILE:-strict}"
DISABLED="${CF_DISABLED_HOOKS:-}"

# Check if this specific hook is disabled
is_disabled() {
  # CF_DISABLED_HOOKS takes priority — comma-separated list of hook IDs
  if [ -n "$DISABLED" ]; then
    case ",$DISABLED," in
      *",$HOOK_ID,"*) return 0 ;;
    esac
  fi
  # CF_HOOK_PROFILE: minimal disables all TDD hooks
  case "$PROFILE" in
    minimal) return 0 ;;
    standard) return 0 ;;  # standard mode: no blocking, tracking only
    strict) return 1 ;;   # strict mode: enforce
    *) return 1 ;;        # unknown profile: default to enforce (safe default)
  esac
}

if is_disabled; then
  exit 0
fi

# Read stdin JSON from Claude Code
INPUT=$(cat || echo '{}')

# Determine if this is an Edit or Write tool call on a production file
# that needs a corresponding test.
TOOL_NAME=$(echo "$INPUT" | node -e "
  let d = {};
  try { d = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); } catch(_e) {}
  process.stdout.write((d.tool_name || '').toLowerCase());
" 2>/dev/null || echo "")

# Only intercept Edit and Write tools
if [ "$TOOL_NAME" != "edit" ] && [ "$TOOL_NAME" != "write" ]; then
  exit 0
fi

# Extract file path from tool_input
FILE_PATH=$(echo "$INPUT" | node -e "
  let d = {};
  try { d = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); } catch(_e) {}
  process.stdout.write(d.tool_input?.file_path || '');
" 2>/dev/null || echo "")

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Find project root by searching upward for workflow bundle manifest
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

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT=$(find_project_root "$SCRIPT_DIR")
PROJECT_ROOT=$(cd "$PROJECT_ROOT" && pwd)
REL_PATH=""
if [ -f "$FILE_PATH" ]; then
  # Try to make path relative to project root
  REL_PATH=$(echo "$FILE_PATH" | sed "s|^$PROJECT_ROOT/||" 2>/dev/null || echo "$FILE_PATH")
else
  # File doesn't exist yet (Write to new file) — use as-is
  REL_PATH=$(echo "$FILE_PATH" | sed "s|^$PROJECT_ROOT/||" 2>/dev/null || echo "$FILE_PATH")
fi

# Check exemption rules — files that are never blocked
IS_EXEMPT=$(node -e "
  const p = '$REL_PATH';

  // Exempt: test files themselves
  if (p.includes('/test/') || p.includes('/__tests__/') || p.endsWith('.test.js') || p.endsWith('.spec.js') || p.endsWith('.test.ts') || p.endsWith('.spec.ts')) {
    process.stdout.write('true'); process.exit(0);
  }

  // Exempt: config and data files
  if (p.endsWith('.json') || p.endsWith('.yaml') || p.endsWith('.yml') || p.endsWith('.toml') || p.endsWith('.lock') || p.endsWith('.txt')) {
    process.stdout.write('true'); process.exit(0);
  }

  // Exempt: markdown docs (workflow notes, references, skill definitions)
  if (p.endsWith('.md')) {
    // Only block .md files that are NOT in exempt locations
    // skills/*/SKILL.md — governance docs, not behavior
    // work-items/ — workflow notes
    // references/ — reference docs
    // project-context/ — governance docs
    // docs/ — documentation
    const exemptMdPatterns = [/\/skills\/[^/]+\/SKILL\.md$/, /\/work-items\//, /\/references\//, /\/project-context\//, /\/docs\//, /CLAUDE\.md$/, /AGENTS\.global\.md$/, /AGENTS\.md$/];
    for (const pat of exemptMdPatterns) {
      if (pat.test(p)) { process.stdout.write('true'); process.exit(0); }
    }
    // Other .md files in src/scripts — these might be behavior docs, still exempt
    process.stdout.write('true'); process.exit(0);
  }

  // Exempt: hook scripts
  if (p.includes('/scripts/hooks/')) {
    process.stdout.write('true'); process.exit(0);
  }

  // Exempt: shell scripts (not production JS behavior)
  if (p.endsWith('.sh') || p.endsWith('.ps1') || p.endsWith('.cmd') || p.endsWith('.bat')) {
    process.stdout.write('true'); process.exit(0);
  }

  // Exempt: CSS, HTML, SVG, image files
  if (p.endsWith('.css') || p.endsWith('.html') || p.endsWith('.svg') || p.endsWith('.png') || p.endsWith('.jpg') || p.endsWith('.ico')) {
    process.stdout.write('true'); process.exit(0);
  }

  // Exempt: files outside the core code paths (scripts/, packages/, mcp/)
  const corePaths = ['/scripts/', '/packages/', '/mcp/'];
  const isCore = corePaths.some(cp => p.includes(cp)) || p.startsWith('packages/') || p.startsWith('scripts/') || p.startsWith('mcp/');
  if (!isCore) {
    process.stdout.write('true'); process.exit(0);
  }

  process.stdout.write('false');
" 2>/dev/null || echo "true")

if [ "$IS_EXEMPT" = "true" ]; then
  exit 0
fi

# Determine expected test file path
EXPECTED_TEST=$(node -e "
  const p = '$REL_PATH';
  const path = require('path');

  // Remove extension
  const ext = path.extname(p);
  const base = p.slice(0, -ext.length || Infinity);

  let testPath;

  // packages/X/scripts/foo.js → packages/X/test/foo.test.js
  if (p.includes('/scripts/') && (p.includes('/packages/') || p.startsWith('packages/'))) {
    testPath = p.replace('/scripts/', '/test/').replace(ext, '.test' + ext);
  }
  // mcp/X/src/bar.js → mcp/X/test/bar.test.js
  else if (p.includes('/src/') && p.includes('/mcp/')) {
    testPath = p.replace('/src/', '/test/').replace(ext, '.test' + ext);
  }
  // scripts/foo.js → scripts/test/foo.test.js
  else if (p.startsWith('scripts/') && !p.includes('/packages/')) {
    testPath = p.replace('scripts/', 'scripts/test/').replace(ext, '.test' + ext);
  }
  // Generic: foo/bar.js → foo/test/bar.test.js (insert /test/ before filename)
  else {
    const dir = path.dirname(p);
    const filename = path.basename(p, ext);
    testPath = path.join(dir, 'test', filename + '.test' + ext);
  }

  process.stdout.write(testPath);
" 2>/dev/null || echo "")

if [ -z "$EXPECTED_TEST" ]; then
  exit 0
fi

# Check if test file exists
FULL_TEST_PATH="${PROJECT_ROOT}/${EXPECTED_TEST}"
if [ -f "$FULL_TEST_PATH" ]; then
  # Test file exists — allow
  exit 0
fi

# Also check alternative test file locations
ALT_TEST_PATH_1=$(echo "$EXPECTED_TEST" | sed 's|/scripts/|/test/|' 2>/dev/null || echo "")
ALT_TEST_PATH_2=$(echo "$EXPECTED_TEST" | sed 's|/src/|/test/|' 2>/dev/null || echo "")

for alt in "$ALT_TEST_PATH_1" "$ALT_TEST_PATH_2"; do
  if [ -n "$alt" ] && [ "$alt" != "$EXPECTED_TEST" ] && [ -f "${PROJECT_ROOT}/${alt}" ]; then
    exit 0
  fi
done

# No test file found — block with message
echo "TDD Enforcement: No test file found for production file '$REL_PATH'."
echo "Expected test file: $EXPECTED_TEST"
echo ""
echo "Per governance policy (TDD cho Behavior Change), write the test first:"
echo "  1. Create $EXPECTED_TEST"
echo "  2. Write failing test for the desired behavior"
echo "  3. Then write production code to make it pass"
echo ""
echo "If this file is exempt from TDD (docs-only, config, rename, metadata), describe why in your implementation note."
echo ""
echo "Tip: Set CF_HOOK_PROFILE=standard to track-only (no block) or CF_HOOK_PROFILE=minimal to disable."

exit 2