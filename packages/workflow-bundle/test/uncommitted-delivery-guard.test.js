// Unit tests for the uncommitted-delivery guard decision rule.
//
// D-D / REQ-004: measured 2026-08-19, two work items reached DONE with every gate
// APPROVED and digest_match=true while main contained none of the change. The other
// three defects in this work item are friction - a command fails and the operator
// sees it. This one is silent: a sealed receipt certifies a verdict about work that
// is one `git clean` from disappearing.
//
// The decision is kept pure and separate from the git call so the edge matrix can be
// tested without a repository. AC-004 pins four cases: clean passes, dirty is
// refused, the hatch with a stated reason passes and echoes it, the hatch without a
// reason is refused. ODC-001's fallback adds a fifth: an empty declared scope refuses
// rather than passing vacuously.
//
// Work item: worktree-and-closure-integrity, requirement REQ-004, task T5.

const { evaluateUncommittedDelivery } = require("../scripts/workflow-gate-evidence-utils");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  } else {
    console.log(`  PASS: ${message}`);
  }
}

function evaluate(overrides = {}) {
  return evaluateUncommittedDelivery({
    grantedWritePaths: ["src"],
    dirtyEntries: [],
    isGitRepo: true,
    allowUncommitted: false,
    uncommittedReason: "",
    ...overrides
  });
}

console.log("Running uncommitted-delivery guard tests...\n");

function testExported() {
  console.log("evaluateUncommittedDelivery is exported so the rule is testable without git");
  assert(typeof evaluateUncommittedDelivery === "function", "evaluateUncommittedDelivery is exported");
}

function testCleanPasses() {
  console.log("\nAC-004: a clean declared scope passes");
  const result = evaluate();
  assert(result.errors.length === 0, "a clean tree over a non-empty declared scope produces no error");
  assert(result.waived === false, "and it is not recorded as a waiver");
}

function testDirtyIsRefused() {
  console.log("\nREQ-004: a dirty declared path is refused and named");
  const result = evaluate({ dirtyEntries: [" M src/app.js", "?? src/extra.js"] });
  assert(result.errors.length > 0, "a dirty declared path produces an error");
  assert(
    result.errors.some((e) => /src\/app\.js/.test(e)),
    "the error names the offending path so the operator knows what to commit"
  );
  assert(
    result.errors.some((e) => /src\/extra\.js/.test(e)),
    "every offending path is named, not just the first"
  );
  assert(result.waived === false, "a refusal is not a waiver");
}

function testEmptyScopeRefusesRatherThanPassesVacuously() {
  console.log("\nODC-001 fallback: an empty declared scope refuses rather than passing vacuously");
  const result = evaluate({ grantedWritePaths: [] });
  assert(result.errors.length > 0, "an empty granted_write_paths produces an error");
  assert(
    result.errors.some((e) => /declared|granted_write_paths|scope/i.test(e)),
    "the error explains that an empty declared scope is not evidence of a clean tree"
  );
}

function testHatchWithReasonWaives() {
  console.log("\nEDGE-002: the hatch WITH a stated reason waives the refusal and is visible");
  const result = evaluate({
    dirtyEntries: [" M src/app.js"],
    allowUncommitted: true,
    uncommittedReason: "research spike, no delivery expected"
  });
  assert(result.errors.length === 0, "the hatch with a reason clears the refusal");
  assert(result.waived === true, "the outcome is recorded as a waiver, not as a pass");
  assert(
    result.reason === "research spike, no delivery expected",
    "the stated reason is carried out so the caller can echo it"
  );
}

function testHatchWithoutReasonIsRefused() {
  console.log("\nAC-004: the hatch WITHOUT a reason is refused - an invisible exemption is worse than no check");
  const result = evaluate({ dirtyEntries: [" M src/app.js"], allowUncommitted: true });
  assert(result.errors.length > 0, "the hatch without a reason produces an error");
  assert(
    result.errors.some((e) => /reason/i.test(e)),
    "the error names the missing reason"
  );
  assert(result.waived === false, "an unreasoned hatch does not waive");

  const blank = evaluate({ dirtyEntries: [" M src/app.js"], allowUncommitted: true, uncommittedReason: "   " });
  assert(blank.errors.length > 0, "a whitespace-only reason is treated as no reason");

  // A malformed exemption request is refused even when nothing is dirty: the operator
  // asked for an exemption and got no confirmation either way, which is the failure
  // mode this fixture exists to prevent.
  const cleanTree = evaluate({ allowUncommitted: true });
  assert(cleanTree.errors.length > 0, "the hatch without a reason is refused even over a clean tree");
}

function testNonGitProjectHasNothingToVerify() {
  console.log("\na non-git project has no history to check, so the guard stays quiet");
  const result = evaluate({ isGitRepo: false, dirtyEntries: [], grantedWritePaths: [] });
  assert(result.errors.length === 0, "no error is raised outside a git repository");
  assert(
    result.not_a_git_repo === true,
    "the outcome says WHY it passed, so a caller can surface the limitation"
  );
}

testExported();
testCleanPasses();
testDirtyIsRefused();
testEmptyScopeRefusesRatherThanPassesVacuously();
testHatchWithReasonWaives();
testHatchWithoutReasonIsRefused();
testNonGitProjectHasNothingToVerify();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in uncommitted-delivery-guard.test.js`);
  process.exit(1);
}

console.log("\nAll uncommitted-delivery guard tests passed.");
