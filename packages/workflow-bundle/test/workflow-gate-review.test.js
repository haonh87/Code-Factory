// Unit tests for the gate-review authority guard.
//
// TD-02: a receipt is bound to the sha256 of its host note, while `work-item activate`
// additionally requires the note to be finalized. Sealing before finalizing therefore
// guaranteed a stale receipt. These tests pin the refusal that stops the documented
// order from being a trap.
//
// Work item: approval-path-defects, requirement REQ-002, task T4.

const { validateSnapshotAuthority } = require("../scripts/workflow-gate-review");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  } else {
    console.log(`  PASS: ${message}`);
  }
}

// Minimal snapshot shaped like loadWorkflowStepGateSnapshot output.
function snapshot(overrides = {}) {
  return {
    filePath: "/tmp/example.s04.acceptance-criteria.md",
    status: "approved",
    specStatus: "approved",
    gateReviews: {
      spec: { reviewedBy: ["ba"], reviewedAt: "2026-01-01T00:00:00.000Z" },
      dor: { reviewedBy: ["po"], reviewedAt: "2026-01-01T00:00:00.000Z" }
    },
    roleSignoffs: { spec: ["ba"], dor: ["po"] },
    ...overrides
  };
}

function expectThrow(fn, matcher, message) {
  let threw = false;
  let text = "";
  try {
    fn();
  } catch (e) {
    threw = true;
    text = String(e.message || "");
  }
  assert(threw && matcher.test(text), `${message}${threw ? ` (got: ${text.slice(0, 110)})` : " (did not throw)"}`);
}

function testExported() {
  console.log("\nvalidateSnapshotAuthority is exported so the guard is testable");
  assert(typeof validateSnapshotAuthority === "function", "validateSnapshotAuthority is exported");
}

function testHappyPath() {
  console.log("\na finalized note with full authority seals");
  let threw = false;
  try {
    validateSnapshotAuthority(snapshot(), "spec", "ba");
  } catch (e) {
    threw = true;
    console.error(`    unexpected: ${e.message}`);
  }
  assert(!threw, "a finalized note with reviewer, timestamp and signoff is accepted");
}

function testRefusesDraftHostNote() {
  console.log("\nTD-02: a draft host note is refused, and the message states the order");
  expectThrow(
    () => validateSnapshotAuthority(snapshot({ status: "draft" }), "spec", "ba"),
    /draft/i,
    "sealing is refused while the host note is status draft"
  );
  expectThrow(
    () => validateSnapshotAuthority(snapshot({ status: "draft" }), "spec", "ba"),
    /then seal|before sealing|order/i,
    "the refusal states the correct order so the failure teaches the fix"
  );
}

function testRefusesUnapprovedSpecStatus() {
  console.log("\nTD-02: spec gate requires spec_status approved or frozen");
  expectThrow(
    () => validateSnapshotAuthority(snapshot({ specStatus: "draft" }), "spec", "ba"),
    /spec_status/i,
    "sealing the spec gate is refused while spec_status is draft"
  );
  let threw = false;
  try {
    validateSnapshotAuthority(snapshot({ specStatus: "draft" }), "dor", "po");
  } catch (e) {
    threw = true;
  }
  assert(
    !threw,
    "a non-spec gate is unaffected by spec_status, mirroring the activate-time rule"
  );
  ["approved", "frozen"].forEach((value) => {
    let localThrew = false;
    try {
      validateSnapshotAuthority(snapshot({ specStatus: value }), "spec", "ba");
    } catch (e) {
      localThrew = true;
    }
    assert(!localThrew, `spec_status '${value}' is accepted`);
  });
}

function testExistingAuthorityChecksStillFire() {
  console.log("\nthe pre-existing authority checks are unchanged");
  expectThrow(
    () => validateSnapshotAuthority(snapshot({ gateReviews: { spec: { reviewedBy: [], reviewedAt: "x" } } }), "spec", "ba"),
    /gate_reviews\.spec_reviewed_by/,
    "an empty gate_reviews.spec_reviewed_by is still refused"
  );
  expectThrow(
    () => validateSnapshotAuthority(snapshot({ gateReviews: { spec: { reviewedBy: ["ba"], reviewedAt: "" } } }), "spec", "ba"),
    /gate_reviews\.spec_reviewed_at/,
    "a missing gate_reviews.spec_reviewed_at is still refused"
  );
  expectThrow(
    () => validateSnapshotAuthority(snapshot({ roleSignoffs: { spec: [] } }), "spec", "ba"),
    /role_signoffs\.spec/,
    "a reviewer absent from role_signoffs is still refused"
  );
}

function testBootstrapGateStillExempt() {
  console.log("\nthe bootstrap gate stays exempt");
  let threw = false;
  try {
    validateSnapshotAuthority(snapshot({ status: "draft", gateReviews: {}, roleSignoffs: {} }), "bootstrap", "po");
  } catch (e) {
    threw = true;
  }
  assert(!threw, "gate 'bootstrap' returns early as before");
}

console.log("Running workflow-gate-review tests...");
testExported();
if (typeof validateSnapshotAuthority === "function") {
  testHappyPath();
  testRefusesDraftHostNote();
  testRefusesUnapprovedSpecStatus();
  testExistingAuthorityChecksStillFire();
  testBootstrapGateStillExempt();
} else {
  console.error("  SKIP: remaining tests need the export");
}

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-gate-review.test.js`);
  process.exit(1);
}
console.log("\nAll workflow-gate-review tests passed.");
