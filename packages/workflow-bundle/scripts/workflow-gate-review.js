const path = require("path");
const { formatErrors, parseCliArgs } = require("./workflow-validator-utils");
const {
  getUncommittedDeliveryErrors,
  loadWorkflowStepGateSnapshot
} = require("./workflow-gate-evidence-utils");
const {
  getGateStepId,
  hasApprovedReceipt,
  loadTrustedApprovalReceipt,
  resolveApprovalPassphrase,
  resolveGateArtifact,
  resolveTrustedApprovalRoot,
  writeTrustedApprovalReceipt
} = require("./workflow-trusted-approval-utils");
const {
  normalizeSingleValue,
  resolveWorkflowRootBase
} = require("./work-item-protocol-utils");

const SUPPORTED_ACTIONS = new Set(["status", "approve", "reject", "approve-ready-bundle"]);

// Ready bundle (plan v5 §3 output 5): seal 4 independent trusted receipts cho
// gate authoring trong một lệnh. Mỗi receipt hash artifact host riêng (light:
// approach->s06) và được validate authority trước khi seal.
const READY_BUNDLE_GATES = ["spec", "dor", "approach", "task_plan"];
const SUPPORTED_GATES = new Set([
  "bootstrap",
  "spec",
  "contract",
  "dor",
  "approach",
  "foundation",
  "task_plan",
  "uat",
  "release",
  "business_acceptance",
  "dod"
]);

function requireWorkItemSlug(args) {
  const workItemSlug = normalizeSingleValue(args["work-item"] || "");
  if (!workItemSlug) {
    throw new Error("Missing required argument '--work-item'.");
  }
  return workItemSlug;
}

function requireGate(args) {
  const gate = normalizeSingleValue(args.gate || "");
  if (!gate) {
    throw new Error("Missing required argument '--gate'.");
  }
  if (!SUPPORTED_GATES.has(gate)) {
    throw new Error(`Unsupported gate '${gate}'. Use one of: ${[...SUPPORTED_GATES].join(", ")}`);
  }
  return gate;
}

function requireReviewedBy(args) {
  const reviewedBy = normalizeSingleValue(args["reviewed-by"] || "");
  if (!reviewedBy) {
    throw new Error("Missing required argument '--reviewed-by'.");
  }
  return reviewedBy;
}

function getNoteText(args, fallback = "") {
  const raw = args.note;
  if (Array.isArray(raw)) {
    return raw.map((value) => String(value).trim()).filter(Boolean).join(" | ");
  }
  return String(raw || fallback).trim();
}

// Stated in every finalization refusal so the failure carries the fix with it,
// rather than requiring the operator to have read the flow documentation first.
const GATE_ORDER_HINT =
  "Correct order: fill gate_reviews -> set status and spec_status -> seal the gate -> activate. " +
  "Sealing before the note is finalized produces a receipt that activate will reject as stale, " +
  "because the receipt is bound to the note's content hash.";

function validateSnapshotAuthority(snapshot, gate, reviewedBy) {
  if (gate === "bootstrap") {
    return;
  }

  const reviewers = snapshot.gateReviews[gate] ? snapshot.gateReviews[gate].reviewedBy : [];
  const signoffs = snapshot.roleSignoffs[gate] || [];
  if (!reviewers.includes(reviewedBy)) {
    throw new Error(`gate_reviews.${gate}_reviewed_by in ${snapshot.filePath} must include '${reviewedBy}' before sealing trusted approval.`);
  }
  if (!snapshot.gateReviews[gate] || !snapshot.gateReviews[gate].reviewedAt) {
    throw new Error(`gate_reviews.${gate}_reviewed_at is required in ${snapshot.filePath} before sealing trusted approval.`);
  }
  if (!signoffs.includes(reviewedBy)) {
    throw new Error(`role_signoffs.${gate} in ${snapshot.filePath} must include '${reviewedBy}' before sealing trusted approval.`);
  }

  // TD-02: a receipt is bound to the sha256 of its host note, and `work-item activate`
  // additionally requires the note to be finalized - status non-draft, plus spec_status
  // approved|frozen for the spec gate. Sealing first and finalizing afterwards therefore
  // guaranteed a stale receipt, and the published flow listed exactly that order with
  // nothing in between. Refusing here is what stops the documented sequence being a trap.
  //
  // The alternative - letting a receipt survive later edits - would trade away the digest
  // binding that makes a receipt worth anything, so it was rejected in s06 ASM-002.
  //
  // The two conditions mirror workflow-gate-evidence-utils.js:264 and :282 so that sealing
  // and activating agree instead of each holding its own copy of the rule.
  if (!snapshot.status || snapshot.status === "draft") {
    throw new Error(
      `Cannot seal gate '${gate}': host note is still status draft in ${snapshot.filePath}. ${GATE_ORDER_HINT}`
    );
  }
  if (gate === "spec" && !["approved", "frozen"].includes(snapshot.specStatus)) {
    throw new Error(
      `Cannot seal gate 'spec': spec_status is '${snapshot.specStatus || "draft"}' in ${snapshot.filePath}, expected approved or frozen. ${GATE_ORDER_HINT}`
    );
  }
}

// Đọc profile từ note s01 để resolve gate host map (light: approach->s06).
function resolveSddMode(workflowRoot, workItemSlug) {
  const snapshot = loadWorkflowStepGateSnapshot({ workflowRoot, workItemSlug, stepId: "s01" });
  return snapshot.sddMode || "none";
}

// Seal một gate receipt (dùng chung cho approve đơn lẻ và ready-bundle).
// resolvedPassphrase (tuỳ chọn) tránh prompt nhiều lần khi seal batch.
function sealGateReceipt({
  projectRoot,
  workflowRoot,
  workItemSlug,
  gate,
  reviewedBy,
  reviewedAt,
  note,
  approvalStatus,
  approvalRoot,
  approvalPassphrase,
  resolvedPassphrase,
  sddMode,
  allowUncommitted,
  uncommittedReason
}) {
  const artifact = resolveGateArtifact({ projectRoot, workflowRoot, workItemSlug, gate, sddMode });

  if (gate !== "bootstrap") {
    const snapshot = loadWorkflowStepGateSnapshot({
      workflowRoot,
      workItemSlug,
      stepId: getGateStepId(gate, sddMode)
    });
    validateSnapshotAuthority(snapshot, gate, reviewedBy);
  }

  // D-D / REQ-004: the gate that decides completion must read the artifact of
  // completion. Only dod: the authoring gates are sealed before a delivery exists,
  // so applying this to them would refuse every work item at s04.
  let uncommittedWaiver = null;
  if (gate === "dod" && approvalStatus === "APPROVED") {
    const verdict = getUncommittedDeliveryErrors({
      projectRoot,
      workflowRoot,
      workItemSlug,
      allowUncommitted,
      uncommittedReason
    });

    if (verdict.errors.length > 0) {
      throw new Error(
        `Cannot seal gate 'dod' for '${workItemSlug}':\n- ${verdict.errors.join("\n- ")}`
      );
    }

    if (verdict.waived) {
      uncommittedWaiver = verdict.reason;
    }
  }

  const result = writeTrustedApprovalReceipt({
    projectRoot,
    overrideRoot: approvalRoot,
    kind: "gate",
    workItemSlug,
    gate,
    reviewedBy,
    reviewedAt,
    note,
    approvalStatus,
    artifactRef: artifact.artifactRef,
    artifactSha256: artifact.artifactSha256,
    approvalPassphrase,
    resolvedPassphrase
  });

  return {
    gate,
    artifact_ref: artifact.artifactRef,
    artifact_sha256: artifact.artifactSha256,
    receipt_path: result.receiptPath,
    receipt_status: result.receipt.approval_status,
    reviewed_by: result.receipt.reviewed_by,
    reviewed_at: result.receipt.reviewed_at,
    // Surfaced so the CLI echoes it: an exemption nobody can see is worse than no check.
    ...(uncommittedWaiver ? { uncommitted_delivery_waived_reason: uncommittedWaiver } : {})
  };
}

function runApproveReadyBundle({ projectRoot, workflowRoot, workItemSlug, approvalRoot, args, sddMode }) {
  const reviewedAt = normalizeSingleValue(args["reviewed-at"] || new Date().toISOString());
  const noteText = getNoteText(args, "Human review approved ready bundle authoring gates.");
  // Resolve passphrase đúng rule MỘT lần; truyền thẳng cho mỗi receipt để tránh
  // prompt lặp lại trong TTY hoặc mở rộng non-interactive không cần thiết.
  const resolvedPassphrase = resolveApprovalPassphrase(normalizeSingleValue(args["approval-passphrase"] || ""));
  const approvalPassphrase = normalizeSingleValue(args["approval-passphrase"] || "");

  // Mỗi gate có reviewer độc lập, lấy từ gate_reviews.{gate}_reviewed_by đã được
  // human điền trong note host. Trường chưa điền -> throw (chưa đủ authority).
  const sealed = READY_BUNDLE_GATES.map((gate) => {
    const stepId = getGateStepId(gate, sddMode);
    const snapshot = loadWorkflowStepGateSnapshot({ workflowRoot, workItemSlug, stepId });
    const reviewers = (snapshot.gateReviews[gate] && snapshot.gateReviews[gate].reviewedBy) || [];
    if (reviewers.length < 1) {
      throw new Error(`ready-bundle requires gate_reviews.${gate}_reviewed_by filled in ${snapshot.filePath}`);
    }

    return sealGateReceipt({
      projectRoot,
      workflowRoot,
      workItemSlug,
      gate,
      reviewedBy: reviewers[0],
      reviewedAt,
      note: noteText,
      approvalStatus: "APPROVED",
      approvalRoot,
      approvalPassphrase,
      resolvedPassphrase,
      sddMode
    });
  });

  const summary = {
    action: "approve-ready-bundle",
    work_item_slug: workItemSlug,
    sdd_mode: sddMode,
    sealed_gates: sealed
  };
  console.log(JSON.stringify(summary, null, 2));
}

function printStatus(summary, jsonOutput = false) {
  if (jsonOutput) {
    console.log(JSON.stringify(summary, null, 2));
    return;
  }

  console.log(
    [
      `OK: workflow gate '${summary.gate}'`,
      `work_item=${summary.work_item_slug}`,
      `status=${summary.receipt_status}`,
      `digest_match=${summary.digest_match ? "true" : "false"}`
    ].join(" | ")
  );
  // D-D: an exemption nobody can see is worse than no check, so it gets its own line
  // rather than only a key buried in the JSON dump below.
  if (summary.uncommitted_delivery_waived_reason) {
    console.log(
      `WAIVED: closed over an uncommitted delivery. Reason: ${summary.uncommitted_delivery_waived_reason}`
    );
  }
  console.log(JSON.stringify(summary, null, 2));
}

function runCli() {
  const action = process.argv[2];
  if (!SUPPORTED_ACTIONS.has(action)) {
    console.error(formatErrors([`Unknown gate action '${action || ""}'. Use one of: ${[...SUPPORTED_ACTIONS].join(", ")}`]));
    process.exit(1);
  }

  const args = parseCliArgs(process.argv.slice(3));

  try {
    const projectRoot = path.resolve(normalizeSingleValue(args["project-root"] || process.cwd()));
    const workflowRootBase = resolveWorkflowRootBase(projectRoot, normalizeSingleValue(args["workflow-root"] || ""));
    const workItemSlug = requireWorkItemSlug(args);
    const workflowRoot = path.join(workflowRootBase, workItemSlug);
    const approvalRootInfo = resolveTrustedApprovalRoot({
      projectRoot,
      overrideRoot: normalizeSingleValue(args["approval-root"] || "")
    });
    const sddMode = resolveSddMode(workflowRoot, workItemSlug);

    if (action === "approve-ready-bundle") {
      runApproveReadyBundle({
        projectRoot,
        workflowRoot,
        workItemSlug,
        approvalRoot: approvalRootInfo.approvalRoot,
        args,
        sddMode
      });
      return;
    }

    const gate = requireGate(args);
    const loaded = loadTrustedApprovalReceipt({
      projectRoot,
      overrideRoot: approvalRootInfo.approvalRoot,
      kind: "gate",
      workItemSlug,
      gate
    });

    if (action === "status") {
      let digestMatch = false;
      let currentArtifactRef = "";
      let currentArtifactSha256 = "";

      if (loaded.receipt && hasApprovedReceipt(loaded.receipt, loaded.approvalRoot)) {
        const artifact = resolveGateArtifact({
          projectRoot,
          workflowRoot,
          workItemSlug,
          gate,
          ref: normalizeSingleValue(args.ref || loaded.receipt.artifact_ref || ""),
          sddMode
        });
        currentArtifactRef = artifact.artifactRef;
        currentArtifactSha256 = artifact.artifactSha256;
        digestMatch =
          loaded.receipt.artifact_ref === currentArtifactRef && loaded.receipt.artifact_sha256 === currentArtifactSha256;
      }

      printStatus(
        {
          gate,
          work_item_slug: workItemSlug,
          approval_root: approvalRootInfo.approvalRoot,
          receipt_path: loaded.receiptPath,
        receipt_status: loaded.receipt ? loaded.receipt.approval_status : "MISSING",
          reviewed_by: loaded.receipt ? loaded.receipt.reviewed_by : "",
          reviewed_at: loaded.receipt ? loaded.receipt.reviewed_at : "",
          artifact_ref: loaded.receipt ? loaded.receipt.artifact_ref : "",
          current_artifact_ref: currentArtifactRef,
        digest_match: digestMatch,
        current_artifact_sha256: currentArtifactSha256
      },
        Boolean(args.json)
      );
      return;
    }

    const reviewedBy = requireReviewedBy(args);
    const reviewedAt = normalizeSingleValue(args["reviewed-at"] || new Date().toISOString());
    const noteText =
      getNoteText(args, action === "approve" ? "Human review approved this workflow gate." : "Human review rejected this workflow gate.");
    const artifact = resolveGateArtifact({
      projectRoot,
      workflowRoot,
      workItemSlug,
      gate,
      ref: normalizeSingleValue(args.ref || ""),
      sddMode
    });

    if (action === "approve" && gate !== "bootstrap") {
      const snapshot = loadWorkflowStepGateSnapshot({
        workflowRoot,
        workItemSlug,
        stepId: getGateStepId(gate, sddMode)
      });
      validateSnapshotAuthority(snapshot, gate, reviewedBy);
    }

    // D-D / REQ-004. Only dod, and only on approve: the authoring gates are sealed
    // before any delivery exists, so applying this to them would refuse at s04.
    let uncommittedWaiver = null;
    if (action === "approve" && gate === "dod") {
      const verdict = getUncommittedDeliveryErrors({
        projectRoot,
        workflowRoot,
        workItemSlug,
        allowUncommitted: Boolean(args["allow-uncommitted-delivery"]),
        uncommittedReason: normalizeSingleValue(args["uncommitted-reason"] || "")
      });

      if (verdict.errors.length > 0) {
        throw new Error(`Cannot seal gate 'dod' for '${workItemSlug}':\n- ${verdict.errors.join("\n- ")}`);
      }

      if (verdict.waived) {
        uncommittedWaiver = verdict.reason;
      }
    }

    const result = writeTrustedApprovalReceipt({
      projectRoot,
      overrideRoot: approvalRootInfo.approvalRoot,
      kind: "gate",
      workItemSlug,
      gate,
      reviewedBy,
      reviewedAt,
      note: noteText,
      approvalStatus: action === "approve" ? "APPROVED" : "REJECTED",
      artifactRef: artifact.artifactRef,
      artifactSha256: artifact.artifactSha256,
      approvalPassphrase: normalizeSingleValue(args["approval-passphrase"] || "")
    });

    printStatus(
      {
        gate,
        work_item_slug: workItemSlug,
        approval_root: result.approvalRoot,
        receipt_path: result.receiptPath,
        receipt_status: result.receipt.approval_status,
        reviewed_by: result.receipt.reviewed_by,
        reviewed_at: result.receipt.reviewed_at,
        artifact_ref: result.receipt.artifact_ref,
        current_artifact_ref: result.receipt.artifact_ref,
        digest_match: true,
        current_artifact_sha256: result.receipt.artifact_sha256,
        ...(uncommittedWaiver ? { uncommitted_delivery_waived_reason: uncommittedWaiver } : {})
      },
      Boolean(args.json)
    );
  } catch (error) {
    const message = error.message.startsWith("ERROR:") ? error.message : formatErrors([error.message]);
    console.error(message);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  runCli,
  // Exported so the finalization guard is unit-testable. See
  // packages/workflow-bundle/test/workflow-gate-review.test.js.
  validateSnapshotAuthority,
  GATE_ORDER_HINT
};
