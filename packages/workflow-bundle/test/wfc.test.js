// Tests for the wfc CLI help surface.
//
// TD-02 / REQ-002 / AC-002: the published flow used to list "seal gates" immediately
// followed by "activate", with nothing in between - while activate additionally requires
// the host note to be finalized. Following the documented order therefore guaranteed a
// stale receipt. AC-002 requires the missing step to be documented, so it is pinned here
// rather than left as a claim in a note.
//
// Work item: approval-path-defects, task T4.

const path = require("path");
const { execFileSync } = require("child_process");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  } else {
    console.log(`  PASS: ${message}`);
  }
}

function helpText() {
  const wfc = path.join(__dirname, "..", "bin", "wfc.js");
  try {
    return execFileSync(process.execPath, [wfc, "help"], { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  } catch (e) {
    return `${e.stdout || ""}${e.stderr || ""}`;
  }
}

function testFinalizeStepIsDocumented() {
  console.log("\nAC-002: the flow documents finalizing the note before sealing");
  const text = helpText();

  assert(
    /finali[sz]e the gate host note/i.test(text),
    "the flow names a step for finalizing the gate host note"
  );
  assert(
    /spec_status/.test(text) && /status to non-draft/i.test(text),
    "the step names both fields that activate checks: status and spec_status"
  );
  assert(
    /content hash|stale/i.test(text),
    "the flow says why the order matters, not just what to do"
  );
}

function testFinalizeStepPrecedesSealing() {
  console.log("\nAC-002: the finalize step appears before the seal step, not after");
  const text = helpText();
  const finalizeAt = text.search(/finali[sz]e the gate host note/i);
  const sealAt = text.search(/seal required human gates/i);
  const activateAt = text.search(/work-item activate --work-item/);

  assert(finalizeAt >= 0 && sealAt >= 0 && activateAt >= 0, "all three flow steps are present");
  assert(
    finalizeAt >= 0 && sealAt >= 0 && finalizeAt < sealAt,
    `the finalize step comes before sealing (finalize@${finalizeAt}, seal@${sealAt})`
  );
  assert(
    sealAt >= 0 && activateAt >= 0 && sealAt < activateAt,
    "sealing still comes before activating"
  );
}

// D-C / REQ-003 / AC-003: approval-path-defects TD-02 documented the finalization
// requirement for the seal-then-activate call site as steps 7b/7c. `work-item verify`
// is a DIFFERENT call site with the same requirement, and it was left undocumented,
// so the operator meets "s07 implementation note must be reviewed or finalized before
// verification" as a surprise. Extends the pattern above rather than inventing one.
//
// Work item: worktree-and-closure-integrity, requirement REQ-003, task T4.
function testVerifyStageFinalizationIsDocumented() {
  console.log("\nAC-003: the flow documents the verify-stage finalization requirement");
  const text = helpText();
  const flowLines = text.split("\n").filter((line) => /^\s*\d+[a-z]?\./.test(line));
  const verifyLines = flowLines.filter((line) => /verify/i.test(line));

  assert(verifyLines.length > 0, "the documented flow includes a step for the verify transition");
  assert(
    verifyLines.some((line) => /s07/.test(line)),
    "the verify step names s07, so the operator knows WHICH note must be finalized"
  );
  assert(
    verifyLines.some((line) => /finali[sz]e|reviewed/i.test(line)),
    "the verify step names the finalize/reviewed requirement, not merely the word verify"
  );
}

function testVerifyStepFollowsActivate() {
  console.log("\nAC-003: the verify step sits after activate, matching the state machine");
  const text = helpText();
  const activateAt = text.search(/work-item activate --work-item/);
  const verifyAt = text.search(/work-item verify/);

  assert(verifyAt >= 0, "the flow names `wfc work-item verify`");
  assert(
    activateAt >= 0 && verifyAt >= 0 && activateAt < verifyAt,
    `activate is documented before verify (activate@${activateAt}, verify@${verifyAt})`
  );
}

function testApprovalRuleStillDocumented() {
  console.log("\nthe existing approval controls are still documented");
  const text = helpText();
  assert(/interactive TTY/i.test(text), "the TTY requirement is still stated");
  assert(
    /non-interactive approval is reserved/i.test(text),
    "the non-interactive restriction is still stated"
  );
}

console.log("Running wfc CLI help tests...");
testFinalizeStepIsDocumented();
testFinalizeStepPrecedesSealing();
testVerifyStageFinalizationIsDocumented();
testVerifyStepFollowsActivate();
testApprovalRuleStillDocumented();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in wfc.test.js`);
  process.exit(1);
}
console.log("\nAll wfc CLI help tests passed.");
