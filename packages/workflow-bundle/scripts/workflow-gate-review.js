const fs = require("fs");
const path = require("path");
const workflowBundlePackage = require("../package.json");
const { formatErrors, parseCliArgs } = require("./workflow-validator-utils");
const {
  getUncommittedDeliveryErrors,
  loadWorkflowStepGateSnapshot
} = require("./workflow-gate-evidence-utils");
const {
  buildProjectApprovalNamespace,
  buildTrustedApprovalReceipt,
  getGateStepId,
  hasApprovedReceipt,
  isTrustedReceiptSignatureValid,
  loadTrustedApprovalReceipt,
  readFileSha256,
  resolveApprovalPassphrase,
  resolveGateArtifact,
  resolveTrustedApprovalRoot,
  writeTrustedApprovalReceipt
} = require("./workflow-trusted-approval-utils");
const {
  loadProtocolReport,
  normalizeSingleValue,
  renderProtocolBlock,
  resolveWorkflowRootBase
} = require("./work-item-protocol-utils");
const { reconcileApprovalBundleReport } = require("./work-item-protocol");
const {
  buildApprovalBundlePlan,
  executeApprovalTransaction,
  recoverApprovalTransaction
} = require("./workflow-approval-transaction");
const {
  emitAdaptiveTelemetryEvent,
  isTelemetryEnabled
} = require("./workflow-telemetry");

const SUPPORTED_ACTIONS = new Set([
  "status",
  "approve",
  "reject",
  "approve-ready-bundle",
  "reject-ready-bundle",
  "approve-closeout-bundle",
  "reject-closeout-bundle"
]);

// Ready bundle (plan v5 §3 output 5): seal 4 independent trusted receipts cho
// gate authoring trong một lệnh. Mỗi receipt hash artifact host riêng (light:
// approach->s06) và được validate authority trước khi seal.
const READY_BUNDLE_GATES = ["spec", "dor", "approach", "task_plan"];
const READINESS_GATES = new Set(["spec", "contract", "dor", "approach", "foundation", "task_plan"]);
const CLOSEOUT_GATES = new Set(["dod", "uat", "release", "business_acceptance"]);
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

function getBundleConsequence(gate) {
  return {
    spec: "freeze the approved requirement baseline",
    contract: "lock the approved public or integration contract",
    dor: "confirm the work item is ready for technical design and delivery",
    approach: "lock the approved technical direction",
    foundation: "lock the approved foundation decision",
    task_plan: "open the approved implementation sequence",
    dod: "confirm the technical Definition of Done",
    uat: "confirm user acceptance testing",
    release: "authorize the configured release handoff",
    business_acceptance: "confirm the configured business acceptance"
  }[gate] || "record the human gate decision";
}

function loadOptionalProtocolReport({ projectRoot, workflowRootBase, workItemSlug }) {
  try {
    return loadProtocolReport({ projectRoot, workflowRootBase, workItemSlug, allowBootstrap: false });
  } catch (error) {
    if (/^Missing work item report:/.test(error.message)) {
      return null;
    }
    throw error;
  }
}

function deriveBundleGates({ protocolReport, sddMode, workflowRoot, workItemSlug, phase }) {
  const allowedGates = phase === "readiness" ? READINESS_GATES : CLOSEOUT_GATES;
  if (protocolReport && protocolReport.report.artifact_shape === "adaptive_v1") {
    const gates = protocolReport.report.gates
      .map((entry) => entry.gate)
      .filter((gate) => allowedGates.has(gate));
    if (gates.length < 1) {
      throw new Error(`Adaptive ${phase} bundle has no applicable gates.`);
    }
    return gates;
  }
  if (phase === "readiness") {
    // Compatibility window: the existing Light/non-Light alias keeps its four
    // historical authoring gates when no adaptive report is present.
    return [...READY_BUNDLE_GATES];
  }
  const snapshot = loadWorkflowStepGateSnapshot({ workflowRoot, workItemSlug, stepId: "s08" });
  const gates = [...CLOSEOUT_GATES].filter((gate) => snapshot.approvalGates[gate] === "required");
  if (gates.length < 1) {
    throw new Error("Legacy closeout bundle has no required terminal gates in the s08 host note.");
  }
  return gates;
}

function renderReconciledS01Content(s01Path, report) {
  const content = fs.readFileSync(s01Path, "utf8");
  const block = `${renderProtocolBlock(report)}\n\n`;
  const sectionPattern = /## Work Item Protocol\n```yaml\n[\s\S]*?\n```\n*/m;
  if (sectionPattern.test(content)) {
    return content.replace(sectionPattern, block);
  }
  const marker = "## Traceability";
  const markerIndex = content.indexOf(marker);
  return markerIndex >= 0
    ? `${content.slice(0, markerIndex)}${block}${content.slice(markerIndex)}`
    : `${content.trim()}\n\n${block}`;
}

function buildProtocolReconciliationOperations({ protocolReport, phase, gates, decision, reviewedAt }) {
  if (!protocolReport) {
    return [];
  }
  const reconciled = reconcileApprovalBundleReport(protocolReport.report, {
    phase,
    gates,
    decision,
    reviewedAt
  });
  const operations = [];
  const reportContent = `${JSON.stringify(reconciled, null, 2)}\n`;
  if (!fs.existsSync(protocolReport.reportPath) || fs.readFileSync(protocolReport.reportPath, "utf8") !== reportContent) {
    operations.push({
      id: "protocol:report",
      target_path: protocolReport.reportPath,
      content: reportContent,
      expected_sha256: fs.existsSync(protocolReport.reportPath) ? readFileSha256(protocolReport.reportPath) : null
    });
  }
  if (fs.existsSync(protocolReport.s01Path)) {
    const s01Content = renderReconciledS01Content(protocolReport.s01Path, reconciled);
    if (fs.readFileSync(protocolReport.s01Path, "utf8") !== s01Content) {
      operations.push({
        id: "protocol:s01",
        target_path: protocolReport.s01Path,
        content: s01Content,
        expected_sha256: readFileSha256(protocolReport.s01Path)
      });
    }
  }
  return operations;
}

function runGateBundle({ projectRoot, workflowRootBase, workflowRoot, workItemSlug, approvalRoot, args, sddMode, action }) {
  const phase = action.includes("closeout") ? "closeout" : "readiness";
  const decision = action.startsWith("reject-") ? "REJECTED" : "APPROVED";
  const reviewedAt = normalizeSingleValue(args["reviewed-at"] || new Date().toISOString());
  const noteText = getNoteText(
    args,
    decision === "APPROVED"
      ? `Human review approved ${phase} bundle gates.`
      : `Human review rejected ${phase} bundle gates.`
  );
  const approvalPassphrase = normalizeSingleValue(args["approval-passphrase"] || "");
  const transactionRoot = path.join(approvalRoot, buildProjectApprovalNamespace(projectRoot), "transactions");

  // Recovery runs before reading current approval inputs. An interrupted bundle
  // can therefore never be mistaken for current gate state by the next command.
  recoverApprovalTransaction({
    transaction_root: transactionRoot,
    work_item_slug: workItemSlug,
    refuse_if_live: true
  });
  const protocolReport = loadOptionalProtocolReport({ projectRoot, workflowRootBase, workItemSlug });
  const gates = deriveBundleGates({ protocolReport, sddMode, workflowRoot, workItemSlug, phase });

  // Complete preflight happens for every gate before passphrase resolution,
  // signing, staging or visible receipt/state writes.
  const contexts = gates.map((gate) => {
    const stepId = getGateStepId(gate, sddMode);
    const snapshot = loadWorkflowStepGateSnapshot({ workflowRoot, workItemSlug, stepId });
    const reviewers = (snapshot.gateReviews[gate] && snapshot.gateReviews[gate].reviewedBy) || [];
    if (reviewers.length < 1) {
      throw new Error(`ready-bundle requires gate_reviews.${gate}_reviewed_by filled in ${snapshot.filePath}`);
    }
    validateSnapshotAuthority(snapshot, gate, reviewers[0]);
    const artifact = resolveGateArtifact({ projectRoot, workflowRoot, workItemSlug, gate, sddMode });
    return {
      gate,
      reviewedBy: reviewers[0],
      artifact
    };
  });

  let uncommittedWaiver = null;
  if (phase === "closeout" && decision === "APPROVED" && gates.includes("dod")) {
    const verdict = getUncommittedDeliveryErrors({
      projectRoot,
      workflowRoot,
      workItemSlug,
      allowUncommitted: Boolean(args["allow-uncommitted-delivery"]),
      uncommittedReason: normalizeSingleValue(args["uncommitted-reason"] || "")
    });
    if (verdict.errors.length > 0) {
      throw new Error(`Cannot seal closeout bundle for '${workItemSlug}':\n- ${verdict.errors.join("\n- ")}`);
    }
    if (verdict.waived) {
      uncommittedWaiver = verdict.reason;
    }
  }

  const approvalPlan = buildApprovalBundlePlan({
    work_item_slug: workItemSlug,
    phase,
    decision,
    gates: contexts.map(({ gate, reviewedBy, artifact }) => ({
      gate,
      reviewer_role: reviewedBy,
      artifact_digest: `sha256:${artifact.artifactSha256}`,
      consequence: getBundleConsequence(gate)
    }))
  });

  if (process.stdin.isTTY) {
    process.stderr.write(`Approval bundle summary:\n${JSON.stringify(approvalPlan, null, 2)}\n`);
  }
  const resolvedPassphrase = resolveApprovalPassphrase(approvalPassphrase);
  const guards = contexts.map(({ artifact }) => ({
    path: artifact.artifactPath,
    expected_sha256: artifact.artifactSha256
  }));
  const sealed = [];
  const operations = [];
  contexts.forEach(({ gate, reviewedBy, artifact }) => {
    const existing = loadTrustedApprovalReceipt({
      projectRoot,
      overrideRoot: approvalRoot,
      kind: "gate",
      workItemSlug,
      gate
    });
    const existingMatches = Boolean(
      existing.receipt &&
        isTrustedReceiptSignatureValid({ approvalRoot: existing.approvalRoot, receipt: existing.receipt }) &&
        existing.receipt.approval_status === decision &&
        existing.receipt.reviewed_by === reviewedBy &&
        existing.receipt.artifact_ref === artifact.artifactRef &&
        existing.receipt.artifact_sha256 === artifact.artifactSha256
    );
    const built = existingMatches
      ? existing
      : buildTrustedApprovalReceipt({
          projectRoot,
          overrideRoot: approvalRoot,
          kind: "gate",
          workItemSlug,
          gate,
          reviewedBy,
          reviewedAt,
          note: noteText,
          approvalStatus: decision,
          artifactRef: artifact.artifactRef,
          artifactSha256: artifact.artifactSha256,
          resolvedPassphrase
        });
    if (!existingMatches) {
      operations.push({
        id: `receipt:${gate}`,
        target_path: built.receiptPath,
        content: `${JSON.stringify(built.receipt, null, 2)}\n`,
        expected_sha256: fs.existsSync(built.receiptPath) ? readFileSha256(built.receiptPath) : null
      });
    }
    sealed.push({
      gate,
      artifact_ref: artifact.artifactRef,
      artifact_sha256: artifact.artifactSha256,
      receipt_path: built.receiptPath,
      receipt_status: built.receipt.approval_status,
      reviewed_by: built.receipt.reviewed_by,
      reviewed_at: built.receipt.reviewed_at
    });
  });
  operations.push(
    ...buildProtocolReconciliationOperations({
      protocolReport,
      phase,
      gates,
      decision,
      reviewedAt
    })
  );

  const fixtureMode = String(process.env.WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE || "").toLowerCase() === "true";
  const failAt = fixtureMode ? normalizeSingleValue(args["transaction-fail-at"] || "") : "";
  const crashAt = fixtureMode ? normalizeSingleValue(args["transaction-crash-at"] || "") : "";
  const transaction = operations.length > 0
    ? executeApprovalTransaction({
        plan: approvalPlan,
        transaction_root: transactionRoot,
        operations,
        guards,
        fail_at: failAt,
        crash_at: crashAt
      })
    : { status: "NOOP", work_item_slug: workItemSlug, committed_paths: [] };

  let telemetryPath = "";
  let telemetryError = "";
  if (isTelemetryEnabled(args.telemetry)) {
    try {
      const protocolState = protocolReport ? protocolReport.report : {};
      const telemetry = emitAdaptiveTelemetryEvent({
        enabled: true,
        projectRoot,
        outputDirOverride: normalizeSingleValue(args["telemetry-out"] || ""),
        event: {
          event_type: "approval_bundle",
          runtime_version: workflowBundlePackage.version,
          request_lane: protocolState.request_lane,
          selected_profile:
            protocolState.selected_profile || (sddMode === "light" ? "sdd-light" : undefined),
          sdd_light_profile: protocolState.sdd_light_profile,
          routing_reasons: protocolState.routing_reasons,
          escalation_reasons: protocolState.escalation_reasons,
          role_count: Array.isArray(protocolState.roles) ? protocolState.roles.length : null,
          gate_count: gates.length,
          interaction_count: 1,
          override_count: protocolState.human_override ? 1 : 0,
          retry_count: transaction.status === "NOOP" ? 1 : 0,
          outcome: decision.toLowerCase(),
          work_item_slug: workItemSlug,
          retention_class: "raw",
          recorded_at: reviewedAt
        }
      });
      telemetryPath = telemetry.reportPath;
    } catch (_error) {
      // Telemetry is optional observability after the governance transaction.
      // A local telemetry failure must not invalidate already-committed receipts.
      telemetryError = "TELEMETRY_WRITE_FAILED";
    }
  }

  const summary = {
    action,
    work_item_slug: workItemSlug,
    sdd_mode: sddMode,
    approval_plan: approvalPlan,
    transaction,
    sealed_gates: sealed,
    ...(telemetryPath ? { telemetry_path: telemetryPath } : {}),
    ...(telemetryError ? { telemetry_error: telemetryError } : {}),
    ...(uncommittedWaiver ? { uncommitted_delivery_waived_reason: uncommittedWaiver } : {})
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

    if (/^(?:approve|reject)-(?:ready|closeout)-bundle$/.test(action)) {
      runGateBundle({
        projectRoot,
        workflowRootBase,
        workflowRoot,
        workItemSlug,
        approvalRoot: approvalRootInfo.approvalRoot,
        args,
        sddMode,
        action
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
