const path = require("path");
const { formatErrors, parseCliArgs } = require("./workflow-validator-utils");
const {
  loadWorkflowStepGateSnapshot
} = require("./workflow-gate-evidence-utils");
const {
  getGateStepId,
  hasApprovedReceipt,
  loadTrustedApprovalReceipt,
  resolveGateArtifact,
  resolveTrustedApprovalRoot,
  writeTrustedApprovalReceipt
} = require("./workflow-trusted-approval-utils");
const {
  normalizeSingleValue,
  resolveWorkflowRootBase
} = require("./work-item-protocol-utils");

const SUPPORTED_ACTIONS = new Set(["status", "approve", "reject"]);
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
    const gate = requireGate(args);
    const workflowRoot = path.join(workflowRootBase, workItemSlug);
    const approvalRootInfo = resolveTrustedApprovalRoot({
      projectRoot,
      overrideRoot: normalizeSingleValue(args["approval-root"] || "")
    });
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
          ref: normalizeSingleValue(args.ref || loaded.receipt.artifact_ref || "")
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
      ref: normalizeSingleValue(args.ref || "")
    });

    if (action === "approve" && gate !== "bootstrap") {
      const snapshot = loadWorkflowStepGateSnapshot({
        workflowRoot,
        workItemSlug,
        stepId: getGateStepId(gate)
      });
      validateSnapshotAuthority(snapshot, gate, reviewedBy);
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
        current_artifact_sha256: result.receipt.artifact_sha256
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
  runCli
};
