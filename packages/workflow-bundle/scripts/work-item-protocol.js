const fs = require("fs");
const path = require("path");
const { formatErrors, parseCliArgs } = require("./workflow-validator-utils");
const { loadChangeProposalState } = require("./change-item-utils");
const { CHANGE_APPROVAL_GATE_PASSED } = require("./workflow-change-definitions");
const {
  normalizeRelativeProjectPath,
  syncCapabilityControl
} = require("./workflow-capability-control");
const {
  hasApprovedReceipt,
  loadTrustedApprovalReceipt,
  writeTrustedApprovalReceipt
} = require("./workflow-trusted-approval-utils");
const {
  APPROVAL_GATE_PASSED,
  BOOTSTRAP_GATE_PASSED,
  buildProtocolEvent,
  getWorkItemPaths,
  isAllowedProtocolTransition,
  loadProtocolControl,
  loadProtocolReport,
  normalizeArray,
  normalizeProtocolReport,
  normalizeSingleValue,
  resolveWorkflowRootBase,
  syncProtocolArtifacts
} = require("./work-item-protocol-utils");
const { getProtocolStepGateErrors } = require("./workflow-gate-evidence-utils");

const SUPPORTED_ACTIONS = new Set([
  "list",
  "status",
  "approve",
  "reject",
  "activate",
  "block",
  "resume",
  "verify",
  "close",
  "archive",
  "cancel"
]);

const APPROVAL_REQUIRED_STATUSES = new Set(["ACTIVE", "VERIFIED", "DONE", "ARCHIVED"]);

function collectWorkItemDirs(workflowRootBase) {
  if (!fs.existsSync(workflowRootBase)) {
    return [];
  }

  return fs
    .readdirSync(workflowRootBase, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

function appendAuditEvent(report, eventName) {
  if (!report.audit_events.includes(eventName)) {
    report.audit_events.push(eventName);
  }
}

function requireWorkItemSlug(args) {
  const workItemSlug = normalizeSingleValue(args["work-item"] || "");
  if (!workItemSlug) {
    throw new Error("Missing required argument '--work-item'.");
  }
  return workItemSlug;
}

function getNoteText(args, fallback = "") {
  const notes = normalizeArray(args.note);
  if (notes.length > 0) {
    return notes.join(" | ");
  }

  return fallback;
}

function requireReviewedBy(args) {
  const reviewedBy = normalizeSingleValue(args["reviewed-by"] || "");
  if (!reviewedBy) {
    throw new Error("Missing required argument '--reviewed-by'.");
  }
  return reviewedBy;
}

function resolveGrantedWritePaths(reportInput, args, projectRoot, { requireNonEmpty = false } = {}) {
  const explicitPaths = normalizeArray(args["write-root"]).map((item) =>
    normalizeRelativeProjectPath(projectRoot, item, "write-root")
  );
  const existingPaths = normalizeArray(reportInput.granted_write_paths).map((item) =>
    normalizeRelativeProjectPath(projectRoot, item, "granted_write_paths")
  );
  const grantedWritePaths = explicitPaths.length > 0 ? explicitPaths : existingPaths;

  if (requireNonEmpty && grantedWritePaths.length < 1) {
    throw new Error("ACTIVE execution requires at least one '--write-root <path>' or existing granted_write_paths.");
  }

  return grantedWritePaths;
}

function assertChangeApprovalGate(report, toStatus, projectRoot) {
  if (!APPROVAL_REQUIRED_STATUSES.has(toStatus) || !report.change_id) {
    return;
  }

  const loadedChange = loadChangeProposalState({
    projectRoot,
    changeId: report.change_id
  });
  if (!loadedChange.state.review_required) {
    throw new Error(
      `Cannot move work item '${report.work_item_slug}' to ${toStatus} while change '${report.change_id}' review_required=false.`
    );
  }

  if (!CHANGE_APPROVAL_GATE_PASSED.has(loadedChange.state.approval_status)) {
    throw new Error(
      `Cannot move work item '${report.work_item_slug}' to ${toStatus} while change '${report.change_id}' approval_status=${loadedChange.state.approval_status}.`
    );
  }

  const trustedReceipt = loadTrustedApprovalReceipt({
    projectRoot,
    kind: "change",
    changeId: report.change_id
  });
  if (!hasApprovedReceipt(trustedReceipt.receipt, trustedReceipt.approvalRoot)) {
    throw new Error(
      `Cannot move work item '${report.work_item_slug}' to ${toStatus} without trusted approval receipt for change '${report.change_id}'.`
    );
  }
}

function assertApprovalGate(report, toStatus, projectRoot) {
  if (!APPROVAL_REQUIRED_STATUSES.has(toStatus)) {
    return;
  }

  if (!report.review_required) {
    throw new Error(
      `Cannot move work item '${report.work_item_slug}' to ${toStatus} while review_required=false.`
    );
  }

  if (!APPROVAL_GATE_PASSED.has(report.approval_status)) {
    throw new Error(
      `Cannot move work item '${report.work_item_slug}' to ${toStatus} while approval_status=${report.approval_status}.`
    );
  }

  const trustedReceipt = loadTrustedApprovalReceipt({
    projectRoot,
    kind: "work-item",
    workItemSlug: report.work_item_slug
  });
  if (!hasApprovedReceipt(trustedReceipt.receipt, trustedReceipt.approvalRoot)) {
    throw new Error(
      `Cannot move work item '${report.work_item_slug}' to ${toStatus} without trusted work-item approval receipt.`
    );
  }

  assertChangeApprovalGate(report, toStatus, projectRoot);
}

function assertBootstrapGate(report, toStatus, projectRoot) {
  if (report.delivery_context !== "greenfield") {
    return;
  }

  if (!["ACTIVE", "VERIFIED", "DONE", "ARCHIVED"].includes(toStatus)) {
    return;
  }

  if (!BOOTSTRAP_GATE_PASSED.has(report.bootstrap_gate_status)) {
    throw new Error(
      `Cannot move greenfield work item '${report.work_item_slug}' to ${toStatus} while bootstrap_gate_status=${report.bootstrap_gate_status}.`
    );
  }

  const trustedReceipt = loadTrustedApprovalReceipt({
    projectRoot,
    kind: "gate",
    workItemSlug: report.work_item_slug,
    gate: "bootstrap"
  });
  if (!hasApprovedReceipt(trustedReceipt.receipt, trustedReceipt.approvalRoot)) {
    throw new Error(
      `Cannot move greenfield work item '${report.work_item_slug}' to ${toStatus} without trusted bootstrap approval receipt.`
    );
  }
}

function assertStepGateEvidence(report, toStatus, projectRoot) {
  const workflowRoot =
    report.workflow_root ||
    getWorkItemPaths({
      projectRoot,
      workflowRootBase: resolveWorkflowRootBase(projectRoot, ""),
      workItemSlug: report.work_item_slug
    }).workflowRoot;

  const errors = getProtocolStepGateErrors({
    projectRoot,
    workflowRoot: path.resolve(workflowRoot),
    workItemSlug: report.work_item_slug,
    toStatus
  });

  if (errors.length > 0) {
    throw new Error(
      `Cannot move work item '${report.work_item_slug}' to ${toStatus} because step gates are not satisfied:\n- ${errors.join("\n- ")}`
    );
  }
}

function transitionReport(reportInput, options) {
  const report = normalizeProtocolReport(reportInput);
  const {
    action,
    actor,
    toStatus,
    note,
    currentStep,
    handoffTarget,
    blockers,
    requiredActions,
    grantedWritePaths,
    protocolOwner,
    auditEvent,
    projectRoot
  } = options;
  const fromStatus = report.protocol_status;

  if (!isAllowedProtocolTransition(fromStatus, toStatus)) {
    throw new Error(`Invalid protocol transition ${fromStatus} -> ${toStatus} for work item '${report.work_item_slug}'.`);
  }

  assertApprovalGate(report, toStatus, projectRoot);
  assertBootstrapGate(report, toStatus, projectRoot);
  assertStepGateEvidence(report, toStatus, projectRoot);

  report.protocol_status = toStatus;

  if (typeof currentStep === "string") {
    report.current_step = currentStep;
  }

  if (typeof handoffTarget === "string") {
    report.handoff_target = handoffTarget;
  }

  if (Array.isArray(blockers)) {
    report.blockers = blockers;
  }

  if (Array.isArray(requiredActions)) {
    report.required_actions = requiredActions;
  }

  if (Array.isArray(grantedWritePaths)) {
    report.granted_write_paths = grantedWritePaths;
  }

  if (typeof protocolOwner === "string" && protocolOwner.trim()) {
    report.protocol_owner = protocolOwner.trim();
  }

  if (auditEvent) {
    appendAuditEvent(report, auditEvent);
  }

  report.protocol_events.push(
    buildProtocolEvent({
      action,
      actor,
      fromStatus,
      toStatus,
      note
    })
  );

  return report;
}

function applyApprove(reportInput, args) {
  const report = normalizeProtocolReport(reportInput);
  const reviewedBy = requireReviewedBy(args);
  const reviewedAt = normalizeSingleValue(args["reviewed-at"] || new Date().toISOString());
  const noteText = getNoteText(args, "Human review approved.");

  report.review_required = true;
  report.approval_status = "APPROVED";
  report.reviewed_by = reviewedBy;
  report.reviewed_at = reviewedAt;
  report.review_notes = normalizeArray(args.note);
  if (report.review_notes.length === 0) {
    report.review_notes = [noteText];
  }
  if (!report.protocol_owner) {
    report.protocol_owner = reviewedBy;
  }

  appendAuditEvent(report, "WORK_ITEM_APPROVED");
  report.protocol_events.push(
    buildProtocolEvent({
      action: "approve",
      actor: reviewedBy,
      fromStatus: report.protocol_status,
      toStatus: report.protocol_status,
      note: noteText
    })
  );

  return report;
}

function applyReject(reportInput, args) {
  const report = normalizeProtocolReport(reportInput);
  const reviewedBy = requireReviewedBy(args);
  const reviewedAt = normalizeSingleValue(args["reviewed-at"] || new Date().toISOString());
  const noteText = getNoteText(args, "Human review rejected the current work item state.");
  const handoffTarget = normalizeSingleValue(args["handoff-target"] || "coordinator-rework");

  report.review_required = true;
  report.approval_status = "REJECTED";
  report.reviewed_by = reviewedBy;
  report.reviewed_at = reviewedAt;
  report.review_notes = normalizeArray(args.note);
  if (report.review_notes.length === 0) {
    report.review_notes = [noteText];
  }

  appendAuditEvent(report, "WORK_ITEM_REJECTED");

  if (report.protocol_status === "ACTIVE") {
    report.blockers = [`Approval rejected: ${noteText}`];
    report.required_actions = ["Resolve review feedback before resuming ACTIVE delivery."];
    report.handoff_target = handoffTarget;
    report.protocol_status = "BLOCKED";
    report.protocol_events.push(
      buildProtocolEvent({
        action: "reject",
        actor: reviewedBy,
        fromStatus: "ACTIVE",
        toStatus: "BLOCKED",
        note: noteText
      })
    );
    appendAuditEvent(report, "WORK_ITEM_BLOCKED");
    return report;
  }

  report.handoff_target = handoffTarget;
  report.protocol_events.push(
    buildProtocolEvent({
      action: "reject",
      actor: reviewedBy,
      fromStatus: report.protocol_status,
      toStatus: report.protocol_status,
      note: noteText
    })
  );

  return report;
}

function applyAction(reportInput, action, args) {
  const projectRoot = path.resolve(normalizeSingleValue(args["project-root"] || process.cwd()));

  switch (action) {
    case "approve":
      return applyApprove(reportInput, args);
    case "reject":
      return applyReject(reportInput, args);
    case "activate":
      return transitionReport(reportInput, {
        action,
        actor: normalizeSingleValue(args.actor || "coordinator"),
        toStatus: "ACTIVE",
        note: getNoteText(args, "Work item moved into active workflow execution."),
        currentStep: normalizeSingleValue(args.step || "s07"),
        handoffTarget: normalizeSingleValue(args["handoff-target"] || "step-s07-owner"),
        requiredActions: ["Continue active execution from step 7 onward."],
        protocolOwner: normalizeSingleValue(args["protocol-owner"] || args.actor || ""),
        grantedWritePaths: resolveGrantedWritePaths(reportInput, args, projectRoot, { requireNonEmpty: true }),
        auditEvent: "WORK_ITEM_ACTIVATED",
        projectRoot
      });
    case "block":
      return transitionReport(reportInput, {
        action,
        actor: normalizeSingleValue(args.actor || "coordinator"),
        toStatus: "BLOCKED",
        note: getNoteText(args, "Work item blocked."),
        currentStep: normalizeSingleValue(args.step || reportInput.current_step || "s07"),
        handoffTarget: normalizeSingleValue(args["handoff-target"] || "blocker-owner"),
        blockers: normalizeArray(args.blocker),
        requiredActions: ["Resolve blockers before resuming the work item."],
        protocolOwner: normalizeSingleValue(args["protocol-owner"] || ""),
        auditEvent: "WORK_ITEM_BLOCKED",
        projectRoot
      });
    case "resume":
      return transitionReport(reportInput, {
        action,
        actor: normalizeSingleValue(args.actor || "coordinator"),
        toStatus: "ACTIVE",
        note: getNoteText(args, "Blockers resolved and work item resumed."),
        currentStep: normalizeSingleValue(args.step || reportInput.current_step || "s07"),
        handoffTarget: normalizeSingleValue(args["handoff-target"] || "step-owner"),
        blockers: [],
        requiredActions: ["Continue active execution from the current step."],
        protocolOwner: normalizeSingleValue(args["protocol-owner"] || ""),
        grantedWritePaths: resolveGrantedWritePaths(reportInput, args, projectRoot, { requireNonEmpty: true }),
        auditEvent: "WORK_ITEM_RESUMED",
        projectRoot
      });
    case "verify":
      return transitionReport(reportInput, {
        action,
        actor: normalizeSingleValue(args.actor || "qc"),
        toStatus: "VERIFIED",
        note: getNoteText(args, "Technical verification completed."),
        currentStep: "s08",
        handoffTarget: normalizeSingleValue(args["handoff-target"] || "definition-of-done"),
        requiredActions: ["Collect DoD evidence and close the work item when ready."],
        protocolOwner: normalizeSingleValue(args["protocol-owner"] || ""),
        auditEvent: "VERIFICATION_CONFIRMED",
        projectRoot
      });
    case "close":
      return transitionReport(reportInput, {
        action,
        actor: normalizeSingleValue(args.actor || "coordinator"),
        toStatus: "DONE",
        note: getNoteText(args, "Definition of Done confirmed."),
        handoffTarget: normalizeSingleValue(args["handoff-target"] || "archive-lifecycle"),
        requiredActions: ["Archive the work item when all downstream lifecycle actions are complete."],
        protocolOwner: normalizeSingleValue(args["protocol-owner"] || ""),
        auditEvent: "DONE_CONFIRMED",
        projectRoot
      });
    case "archive":
      return transitionReport(reportInput, {
        action,
        actor: normalizeSingleValue(args.actor || "coordinator"),
        toStatus: "ARCHIVED",
        note: getNoteText(args, "Work item lifecycle archived."),
        handoffTarget: normalizeSingleValue(args["handoff-target"] || "none"),
        requiredActions: [],
        protocolOwner: normalizeSingleValue(args["protocol-owner"] || ""),
        auditEvent: "ARCHIVE_CONFIRMED",
        projectRoot
      });
    case "cancel": {
      const cancelReason = normalizeSingleValue(args.reason || "");
      if (!cancelReason) {
        throw new Error("cancel requires '--reason'.");
      }

      return transitionReport(reportInput, {
        action,
        actor: normalizeSingleValue(args.actor || "coordinator"),
        toStatus: "CANCELLED",
        note: cancelReason,
        handoffTarget: normalizeSingleValue(args["handoff-target"] || "none"),
        blockers: [cancelReason],
        requiredActions: [],
        protocolOwner: normalizeSingleValue(args["protocol-owner"] || ""),
        auditEvent: "WORK_ITEM_CANCELLED",
        projectRoot
      });
    }
    default:
      throw new Error(`Unsupported work item action '${action}'.`);
  }
}

function printStatus(reportInput) {
  const report = normalizeProtocolReport(reportInput);
  const trustedReceipt = loadTrustedApprovalReceipt({
    projectRoot: path.resolve(report.project_root || ""),
    kind: "work-item",
    workItemSlug: report.work_item_slug
  });
  const summary = [
    `OK: work item '${report.work_item_slug}'`,
    `protocol_status=${report.protocol_status}`,
    `approval_status=${report.approval_status}`,
    `current_step=${report.current_step || "<none>"}`,
    `handoff_target=${report.handoff_target || "<none>"}`,
    `trusted_receipt=${hasApprovedReceipt(trustedReceipt.receipt, trustedReceipt.approvalRoot) ? "APPROVED" : trustedReceipt.receipt ? trustedReceipt.receipt.approval_status : "MISSING"}`
  ].join(" | ");

  console.log(summary);
  console.log(
    JSON.stringify(
      {
        ...report,
        trusted_receipt_path: trustedReceipt.receiptPath,
        trusted_receipt: trustedReceipt.receipt
      },
      null,
      2
    )
  );
}

function formatListCell(value, width) {
  return String(value || "").padEnd(width, " ");
}

function printList(entriesInput, workflowRootBase, jsonOutput = false) {
  const entries = [...entriesInput];
  const summary = `OK: listed ${entries.length} work items under ${workflowRootBase}`;

  if (jsonOutput) {
    console.log(summary);
    console.log(JSON.stringify(entries, null, 2));
    return;
  }

  console.log(summary);

  if (entries.length === 0) {
    return;
  }

  const columns = [
    { key: "work_item_slug", label: "WORK_ITEM" },
    { key: "protocol_status", label: "STATUS" },
    { key: "approval_status", label: "APPROVAL" },
    { key: "current_step", label: "STEP" },
    { key: "change_id", label: "CHANGE" },
    { key: "source", label: "SOURCE" }
  ];
  const widths = Object.fromEntries(
    columns.map((column) => [
      column.key,
      Math.max(column.label.length, ...entries.map((entry) => String(entry[column.key] || "").length))
    ])
  );

  console.log(columns.map((column) => formatListCell(column.label, widths[column.key])).join(" | "));
  console.log(columns.map((column) => "-".repeat(widths[column.key])).join("-+-"));
  entries.forEach((entry) => {
    console.log(columns.map((column) => formatListCell(entry[column.key], widths[column.key])).join(" | "));
  });

  const invalidEntries = entries.filter((entry) => entry.error);
  invalidEntries.forEach((entry) => {
    console.log(`WARN: ${entry.work_item_slug}: ${entry.error}`);
  });
}

function listWorkItems({ projectRoot, workflowRootBase, protocolControl }) {
  return collectWorkItemDirs(workflowRootBase).map((workItemSlug) => {
    try {
      const loaded = loadProtocolReport({
        projectRoot,
        workflowRootBase,
        workItemSlug,
        allowBootstrap: protocolControl.legacyScaffoldPolicy === "allow_readonly"
      });
      const report = normalizeProtocolReport(loaded.report);
      return {
        work_item_slug: report.work_item_slug,
        protocol_status: report.protocol_status,
        approval_status: report.approval_status,
        current_step: report.current_step || "",
        change_id: report.change_id || "",
        source: loaded.existed ? "protocol" : "bootstrap",
        workflow_root: report.workflow_root
      };
    } catch (error) {
      return {
        work_item_slug: workItemSlug,
        protocol_status: "INVALID",
        approval_status: "",
        current_step: "",
        change_id: "",
        source: "error",
        workflow_root: "",
        error: error.message
      };
    }
  });
}

function runCli() {
  const action = process.argv[2];
  if (!SUPPORTED_ACTIONS.has(action)) {
    console.error(
      formatErrors([
        `Unknown work-item action '${action || ""}'. Use one of: ${[...SUPPORTED_ACTIONS].join(", ")}`
      ])
    );
    process.exit(1);
  }

  const args = parseCliArgs(process.argv.slice(3));

  try {
    const projectRoot = path.resolve(normalizeSingleValue(args["project-root"] || process.cwd()));
    const workflowRootBase = resolveWorkflowRootBase(projectRoot, normalizeSingleValue(args["workflow-root"] || ""));
    const protocolControl = loadProtocolControl(projectRoot);

    if (action === "list") {
      const entries = listWorkItems({
        projectRoot,
        workflowRootBase,
        protocolControl
      });
      printList(entries, workflowRootBase, Boolean(args.json));
      return;
    }

    const workItemSlug = requireWorkItemSlug(args);
    const loaded = loadProtocolReport({
      projectRoot,
      workflowRootBase,
      workItemSlug,
      allowBootstrap: action === "status" && protocolControl.legacyScaffoldPolicy === "allow_readonly"
    });

    if (action === "status") {
      printStatus(loaded.report);
      return;
    }

    if (action === "block" && normalizeArray(args.blocker).length === 0) {
      throw new Error("block requires at least one '--blocker'.");
    }

    const updatedReport = applyAction(loaded.report, action, args);
    syncProtocolArtifacts({
      report: updatedReport,
      reportPath: loaded.reportPath,
      s01Path: loaded.s01Path
    });
    if (action === "approve" || action === "reject") {
      writeTrustedApprovalReceipt({
        projectRoot,
        overrideRoot: normalizeSingleValue(args["approval-root"] || ""),
        kind: "work-item",
        workItemSlug: updatedReport.work_item_slug,
        reviewedBy: updatedReport.reviewed_by,
        reviewedAt: updatedReport.reviewed_at,
        note: normalizeArray(updatedReport.review_notes).join(" | "),
        approvalStatus: updatedReport.approval_status,
        approvalPassphrase: normalizeSingleValue(args["approval-passphrase"] || "")
      });
    }
    syncCapabilityControl({
      projectRoot,
      workflowRootBase
    });
    printStatus(updatedReport);
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
  applyAction,
  listWorkItems,
  runCli,
  transitionReport
};
