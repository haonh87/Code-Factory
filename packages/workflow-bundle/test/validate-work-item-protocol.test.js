// Unit tests for workflow_root equivalence.
//
// D-A / REQ-001: every .work-item-report.json stores an ABSOLUTE workflow_root, and
// the protocol validator compared it to the currently resolved path with strict
// string equality. Inside a git worktree the resolved path differs by prefix, so
// `wfc protocol` failed on every work item - and the message named whichever work
// item was walked first, so it read as data corruption rather than path resolution.
//
// The fix normalises at comparison time. It must NOT rewrite any stored report:
// four work items' reports are hashed into sealed trusted receipts (ASM-001).
//
// EDGE-003 is the load-bearing case here: a genuinely wrong workflow_root must
// still be rejected. A normalisation that accepts everything closes the defect and
// removes the check, which is worse than the defect.
//
// Work item: worktree-and-closure-integrity, requirement REQ-001, task T2.

const path = require("path");
const strictAssert = require("node:assert/strict");
const { isEquivalentWorkflowRoot } = require("../scripts/validate-work-item-protocol");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  } else {
    console.log(`  PASS: ${message}`);
  }
}

const MAIN_ROOT = path.join(path.sep, "repo", "code-factory");
const WORKTREE_ROOT = path.join(MAIN_ROOT, ".claude", "worktrees", "wt-item");
const SLUG = "wt-item";

function expected(projectRoot, slug = SLUG) {
  return path.join(projectRoot, "work-items", slug);
}

function check(stored, projectRoot = MAIN_ROOT, slug = SLUG) {
  return isEquivalentWorkflowRoot({
    storedWorkflowRoot: stored,
    expectedWorkflowRoot: expected(projectRoot, slug),
    projectRoot
  });
}

console.log("Running workflow_root equivalence tests...\n");

function testExported() {
  console.log("isEquivalentWorkflowRoot is exported so the rule is testable in isolation");
  assert(typeof isEquivalentWorkflowRoot === "function", "isEquivalentWorkflowRoot is exported");
}

function testIdenticalPaths() {
  console.log("\nan identical absolute path is equivalent");
  assert(check(expected(MAIN_ROOT)), "the same absolute path matches itself");
}

function testWorktreeCase() {
  console.log("\nD-A: a report written in one tree is read in an equivalent tree");
  assert(
    check(expected(MAIN_ROOT), WORKTREE_ROOT),
    "a report storing the MAIN tree path validates when resolved inside a worktree"
  );
  assert(
    check(expected(WORKTREE_ROOT), MAIN_ROOT),
    "and the reverse direction too - a worktree-written report validates from the main tree"
  );
  assert(
    check(path.join(path.sep, "ci", "build", "42", "work-items", SLUG), MAIN_ROOT),
    "an unrelated checkout path with the same relative location is equivalent (CI, moved clone)"
  );
}

function testEdge003WrongRootStillRejected() {
  console.log("\nEDGE-003: a genuinely wrong workflow_root is still rejected");
  assert(
    !check(path.join(MAIN_ROOT, "work-items", "a-completely-different-item")),
    "a different work item slug is NOT equivalent"
  );
  assert(
    !check(path.join(MAIN_ROOT, "work-items")),
    "the workflow root base itself is NOT equivalent to a work item dir"
  );
  assert(
    !check(path.join(MAIN_ROOT, "changes", SLUG)),
    "the right slug under the WRONG parent directory is NOT equivalent"
  );
  assert(
    !check(path.join(MAIN_ROOT, "work-items", SLUG, "nested")),
    "a deeper path that merely contains the expected one is NOT equivalent"
  );
  assert(
    !check(path.join(path.sep, "elsewhere", "work-items", `${SLUG}-suffix`)),
    "a slug that only shares a prefix is NOT equivalent - segment comparison, not substring"
  );
}

function testMissingAndMalformed() {
  console.log("\nmissing or malformed input is not equivalent");
  assert(!check(""), "an empty stored workflow_root is not equivalent");
  assert(!check(undefined), "an undefined stored workflow_root is not equivalent");
  assert(!check(null), "a null stored workflow_root is not equivalent");
}

function testNonNormalisedInput() {
  console.log("\nnon-normalised but equivalent input is accepted");
  assert(
    check(`${expected(MAIN_ROOT)}${path.sep}`),
    "a trailing separator does not change equivalence"
  );
  assert(
    check(path.join(MAIN_ROOT, "work-items", ".", SLUG)),
    "a redundant '.' segment does not change equivalence"
  );
  assert(
    check(path.join(MAIN_ROOT, "work-items", "other", "..", SLUG)),
    "a '..' segment is resolved before comparing"
  );
  assert(
    check(path.join("work-items", SLUG)),
    "a RELATIVE stored workflow_root with the right relative location is equivalent"
  );
}

function testWorkflowRootOutsideProjectRoot() {
  console.log("\na workflow root outside the project root falls back to strict equality");
  const outside = path.join(path.sep, "elsewhere", "notes", SLUG);
  assert(
    isEquivalentWorkflowRoot({
      storedWorkflowRoot: outside,
      expectedWorkflowRoot: outside,
      projectRoot: MAIN_ROOT
    }),
    "an out-of-tree workflow root still matches itself"
  );
  assert(
    !isEquivalentWorkflowRoot({
      storedWorkflowRoot: path.join(path.sep, "elsewhere", "notes", "other-item"),
      expectedWorkflowRoot: outside,
      projectRoot: MAIN_ROOT
    }),
    "an out-of-tree workflow root does not match a different out-of-tree path"
  );
}

testExported();
testIdenticalPaths();
testWorktreeCase();
testEdge003WrongRootStillRejected();
testMissingAndMalformed();
testNonNormalisedInput();
testWorkflowRootOutsideProjectRoot();

// RCR TS1: the production validator must reject malformed typed state, not
// stringify it away. Keep these assertions separate from path-equivalence tests.
{
  const validator = require("../scripts/validate-work-item-protocol");
  assert(typeof validator.validateProtocolStateCollections === "function", "typed collection validator is exported");
  assert(typeof validator.validateProtocolBlockSync === "function", "protocol mirror validator is exported");
  if (typeof validator.validateProtocolStateCollections === "function" && typeof validator.validateProtocolBlockSync === "function") {
    const utils = require("../scripts/work-item-protocol-utils");
    const pending = { id: "r1", kind: "approval_pending", text: "Release pending", gate: "release" };
    const errors = [];
    validator.validateProtocolStateCollections({ blockers: [pending, pending], required_actions: [{ id: "r2", kind: "workflow_followup", gate: "release", text: "Follow up" }] }, "report.json", errors);
    assert(errors.some(e => /blockers\[1\].*duplicate.*id/i.test(e)), "duplicate IDs name collection/index");
    assert(errors.some(e => /required_actions\[0\].*gate/.test(e)), "non-gate kind cannot carry gate");
    const valid = utils.normalizeProtocolReport({ blockers: [pending], required_actions: [] });
    const syncErrors = [];
    validator.validateProtocolBlockSync(utils.renderProtocolBlock(valid), valid, "s01.md", syncErrors);
    strictAssert.deepEqual(syncErrors, []);
    const mismatched = utils.renderProtocolBlock(valid).replace('"Release pending"', '"Changed display"');
    const mismatchErrors = [];
    validator.validateProtocolBlockSync(mismatched, valid, "s01.md", mismatchErrors);
    assert(mismatchErrors.some(e => /blockers.*out of sync/i.test(e)), "structured mirror mismatch is rejected");
    const legacy = { blockers: [" Unknown review "], required_actions: ["wfc work-item close --work-item demo"] };
    const legacyBlock = utils.renderProtocolBlock(legacy).replace(/  - \{[^\n]+\}/g, line => {
      const entry = JSON.parse(line.slice(4));
      return "  - " + JSON.stringify(entry.text);
    });
    const legacyErrors = [];
    validator.validateProtocolBlockSync(legacyBlock, utils.normalizeProtocolReport(legacy), "legacy-s01.md", legacyErrors);
    strictAssert.deepEqual(legacyErrors, [], "legacy scalar mirror loads without migration");
  }
}

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in validate-work-item-protocol.test.js`);
  process.exit(1);
}

console.log("\nAll workflow_root equivalence tests passed.");
