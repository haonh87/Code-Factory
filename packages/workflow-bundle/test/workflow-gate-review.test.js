// Unit tests for the gate-review authority guard.
//
// TD-02: a receipt is bound to the sha256 of its host note, while `work-item activate`
// additionally requires the note to be finalized. Sealing before finalizing therefore
// guaranteed a stale receipt. These tests pin the refusal that stops the documented
// order from being a trap.
//
// Work item: approval-path-defects, requirement REQ-002, task T4.

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { validateSnapshotAuthority } = require("../scripts/workflow-gate-review");

let approvalTransaction = {};
try {
  approvalTransaction = require("../scripts/workflow-approval-transaction");
} catch (_error) {
  approvalTransaction = {};
}

const {
  APPROVAL_TRANSACTION_FAILURE_POINTS,
  buildApprovalBundlePlan,
  executeApprovalTransaction,
  getApprovalTransactionPaths,
  recoverApprovalTransaction
} = approvalTransaction;

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

function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function tempRoot(name) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `approval-transaction-${name}-`));
}

function rmrf(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

function makePlan(workItemSlug = "transaction-item") {
  return buildApprovalBundlePlan({
    work_item_slug: workItemSlug,
    phase: "readiness",
    gates: [
      { gate: "spec", reviewer_role: "ba", artifact_digest: "sha256:spec", consequence: "freeze spec" },
      { gate: "dor", reviewer_role: "qc", artifact_digest: "sha256:dor", consequence: "open design" }
    ]
  });
}

function makeOperations(root) {
  const statePath = path.join(root, "work-items", "transaction-item", "report.json");
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, "before\n", "utf8");
  return {
    statePath,
    receiptOne: path.join(root, "approvals", "transaction-item", "spec.json"),
    receiptTwo: path.join(root, "approvals", "transaction-item", "dor.json"),
    operations: [
      {
        id: "receipt:spec",
        target_path: path.join(root, "approvals", "transaction-item", "spec.json"),
        content: `${JSON.stringify({ schema_version: 1, gate: "spec" })}\n`,
        expected_sha256: null
      },
      {
        id: "receipt:dor",
        target_path: path.join(root, "approvals", "transaction-item", "dor.json"),
        content: `${JSON.stringify({ schema_version: 1, gate: "dor" })}\n`,
        expected_sha256: null
      },
      {
        id: "protocol:report",
        target_path: statePath,
        content: "after\n",
        expected_sha256: sha256("before\n")
      }
    ]
  };
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

function testApprovalTransactionSurfaceAndSummary() {
  console.log("\nCR-008 T5: transaction surface and complete human summary");
  assert(Array.isArray(APPROVAL_TRANSACTION_FAILURE_POINTS), "failure-point catalog is exported");
  assert(typeof buildApprovalBundlePlan === "function", "buildApprovalBundlePlan is exported");
  assert(typeof executeApprovalTransaction === "function", "executeApprovalTransaction is exported");
  assert(typeof recoverApprovalTransaction === "function", "recoverApprovalTransaction is exported");
  assert(typeof getApprovalTransactionPaths === "function", "getApprovalTransactionPaths is exported");
  if (typeof buildApprovalBundlePlan !== "function") return;

  const plan = makePlan();
  assert(plan.phase === "readiness", "bundle summary preserves the readiness phase");
  assert(plan.gates.length === 2, "bundle summary lists every applicable gate");
  plan.gates.forEach((gate) => {
    ["gate", "reviewer_role", "artifact_digest", "consequence"].forEach((field) => {
      assert(Boolean(gate[field]), `bundle summary includes ${field}`);
    });
  });
  assert(
    APPROVAL_TRANSACTION_FAILURE_POINTS.length >= 5 && APPROVAL_TRANSACTION_FAILURE_POINTS.includes("after_first_commit"),
    "transaction publishes at least five failure boundaries including after_first_commit"
  );
}

function testPreflightFailureWritesNothing() {
  if (typeof executeApprovalTransaction !== "function") return;
  console.log("\nCR-008 T5: preflight failure leaves zero receipt, state, journal or lock writes");
  const root = tempRoot("preflight");
  const transactionRoot = path.join(root, "transactions");
  const targetPath = path.join(root, "receipt.json");
  try {
    const hostPath = path.join(root, "host.md");
    fs.writeFileSync(hostPath, "current host\n", "utf8");
    expectThrow(
      () => executeApprovalTransaction({
        plan: makePlan(),
        transaction_root: transactionRoot,
        operations: [{ id: "receipt:spec", target_path: targetPath, content: "receipt\n", expected_sha256: null }],
        guards: [{ path: hostPath, expected_sha256: sha256("stale host\n") }]
      }),
      /preflight|digest mismatch/i,
      "a stale host digest is rejected during preflight"
    );
    assert(!fs.existsSync(targetPath), "preflight failure writes no receipt");
    assert(!fs.existsSync(transactionRoot), "preflight failure creates no journal or lock directory");
  } finally {
    rmrf(root);
  }
}

function testAtomicCommitAndIndependentReceipts() {
  if (typeof executeApprovalTransaction !== "function") return;
  console.log("\nCR-008 T5: successful commit is atomic and keeps independent receipt-v1 files");
  const root = tempRoot("success");
  const transactionRoot = path.join(root, "transactions");
  try {
    const fixture = makeOperations(root);
    const result = executeApprovalTransaction({
      plan: makePlan(),
      transaction_root: transactionRoot,
      operations: fixture.operations
    });
    assert(result.status === "COMMITTED", "successful transaction returns COMMITTED");
    assert(fs.readFileSync(fixture.statePath, "utf8") === "after\n", "derived protocol state commits with receipts");
    const receiptOne = JSON.parse(fs.readFileSync(fixture.receiptOne, "utf8"));
    const receiptTwo = JSON.parse(fs.readFileSync(fixture.receiptTwo, "utf8"));
    assert(receiptOne.schema_version === 1 && receiptTwo.schema_version === 1, "each gate keeps an independent receipt schema v1 file");
    assert(receiptOne.gate === "spec" && receiptTwo.gate === "dor", "receipt files retain independent gate identities");
    const paths = getApprovalTransactionPaths({ transaction_root: transactionRoot, work_item_slug: "transaction-item" });
    assert(!fs.existsSync(paths.journal_path) && !fs.existsSync(paths.lock_path), "successful commit removes journal and lock");
  } finally {
    rmrf(root);
  }
}

function testCaughtFailureRollsBackFirstVisibleCommit() {
  if (typeof executeApprovalTransaction !== "function") return;
  console.log("\nCR-008 T5: every caught persistence failure rolls every target back");
  APPROVAL_TRANSACTION_FAILURE_POINTS.forEach((failurePoint) => {
    const root = tempRoot(`rollback-${failurePoint}`);
    const transactionRoot = path.join(root, "transactions");
    try {
      const fixture = makeOperations(root);
      expectThrow(
        () => executeApprovalTransaction({
          plan: makePlan(),
          transaction_root: transactionRoot,
          operations: fixture.operations,
          fail_at: failurePoint
        }),
        new RegExp(`${failurePoint}|injected`, "i"),
        `failure injection reaches ${failurePoint}`
      );
      assert(!fs.existsSync(fixture.receiptOne) && !fs.existsSync(fixture.receiptTwo), `${failurePoint}: rollback removes every partial receipt`);
      assert(fs.readFileSync(fixture.statePath, "utf8") === "before\n", `${failurePoint}: rollback restores prior derived state`);
      const paths = getApprovalTransactionPaths({ transaction_root: transactionRoot, work_item_slug: "transaction-item" });
      assert(!fs.existsSync(paths.journal_path) && !fs.existsSync(paths.lock_path), `${failurePoint}: rollback removes journal and lock`);
    } finally {
      rmrf(root);
    }
  });
}

function testCrashRecoveryIsIdempotent() {
  if (typeof executeApprovalTransaction !== "function") return;
  console.log("\nCR-008 T5: crash recovery rolls back deterministically and is idempotent");
  const root = tempRoot("crash");
  const transactionRoot = path.join(root, "transactions");
  try {
    const fixture = makeOperations(root);
    expectThrow(
      () => executeApprovalTransaction({
        plan: makePlan(),
        transaction_root: transactionRoot,
        operations: fixture.operations,
        crash_at: "after_first_commit"
      }),
      /after_first_commit|crash/i,
      "crash injection interrupts after the first visible commit"
    );
    const paths = getApprovalTransactionPaths({ transaction_root: transactionRoot, work_item_slug: "transaction-item" });
    assert(fs.existsSync(paths.journal_path), "simulated crash leaves a recovery journal");
    const first = recoverApprovalTransaction({ transaction_root: transactionRoot, work_item_slug: "transaction-item" });
    assert(first.status === "ROLLED_BACK", "first recovery rolls the interrupted transaction back");
    assert(!fs.existsSync(fixture.receiptOne) && fs.readFileSync(fixture.statePath, "utf8") === "before\n", "recovery restores the complete pre-transaction state");
    const second = recoverApprovalTransaction({ transaction_root: transactionRoot, work_item_slug: "transaction-item" });
    assert(second.status === "NOOP", "repeating recovery is a no-op");
  } finally {
    rmrf(root);
  }
}

function testCrashAfterVerifiedCommitCompletesIdempotently() {
  if (typeof executeApprovalTransaction !== "function") return;
  console.log("\nCR-008 T5: recovery completes a fully verified commit instead of rolling it back");
  const root = tempRoot("crash-complete");
  const transactionRoot = path.join(root, "transactions");
  try {
    const fixture = makeOperations(root);
    expectThrow(
      () => executeApprovalTransaction({
        plan: makePlan(),
        transaction_root: transactionRoot,
        operations: fixture.operations,
        crash_at: "after_verified_commit"
      }),
      /after_verified_commit|crash/i,
      "crash injection interrupts after the verified COMMITTED journal state"
    );
    const recovery = recoverApprovalTransaction({ transaction_root: transactionRoot, work_item_slug: "transaction-item" });
    assert(recovery.status === "COMPLETED", "recovery completes a fully verified committed transaction");
    assert(fs.existsSync(fixture.receiptOne) && fs.existsSync(fixture.receiptTwo), "completed recovery retains every committed receipt");
    assert(fs.readFileSync(fixture.statePath, "utf8") === "after\n", "completed recovery retains reconciled protocol state");
    const second = recoverApprovalTransaction({ transaction_root: transactionRoot, work_item_slug: "transaction-item" });
    assert(second.status === "NOOP", "completed recovery is idempotent on retry");
  } finally {
    rmrf(root);
  }
}

function testPerWorkItemLockRefusesConcurrentTransaction() {
  if (typeof executeApprovalTransaction !== "function") return;
  console.log("\nCR-008 T5: per-work-item lock refuses a concurrent transaction");
  const root = tempRoot("lock");
  const transactionRoot = path.join(root, "transactions");
  try {
    const fixture = makeOperations(root);
    const paths = getApprovalTransactionPaths({ transaction_root: transactionRoot, work_item_slug: "transaction-item" });
    fs.mkdirSync(path.dirname(paths.lock_path), { recursive: true });
    fs.writeFileSync(paths.lock_path, "active\n", "utf8");
    expectThrow(
      () => executeApprovalTransaction({ plan: makePlan(), transaction_root: transactionRoot, operations: fixture.operations }),
      /lock|in progress|concurrent/i,
      "a live lock blocks another transaction for the same work item"
    );
    assert(!fs.existsSync(fixture.receiptOne), "concurrent refusal writes no receipt");
    assert(fs.readFileSync(fixture.statePath, "utf8") === "before\n", "concurrent refusal leaves derived state unchanged");
  } finally {
    rmrf(root);
  }
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
testApprovalTransactionSurfaceAndSummary();
if (
  typeof buildApprovalBundlePlan === "function" &&
  typeof executeApprovalTransaction === "function" &&
  typeof recoverApprovalTransaction === "function" &&
  typeof getApprovalTransactionPaths === "function"
) {
  testPreflightFailureWritesNothing();
  testAtomicCommitAndIndependentReceipts();
  testCaughtFailureRollsBackFirstVisibleCommit();
  testCrashRecoveryIsIdempotent();
  testCrashAfterVerifiedCommitCompletesIdempotently();
  testPerWorkItemLockRefusesConcurrentTransaction();
}

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-gate-review.test.js`);
  process.exit(1);
}
console.log("\nAll workflow-gate-review tests passed.");
