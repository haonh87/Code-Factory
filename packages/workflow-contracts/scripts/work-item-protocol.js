const fs = require("fs");
const path = require("path");
const { formatErrors, parseCliArgs } = require("./workflow-validator-utils");
const { loadChangeProposalState } = require("./change-item-utils");
const { CHANGE_APPROVAL_GATE_PASSED } = require("./workflow-change-definitions");
const {
  APPROVAL_GATE_PASSED,
  buildProtocolEvent,
  isAllowedProtocolTransition,
  loadProtocolReport,
  normalizeArray,
  normalizeProtocolReport,
  normalizeSingleValue,
  resolveWorkflowRootBase,
  syncProtocolArtifacts
} = require("./work-item-protocol-utils");

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

function assertChangeApprovalGate(report, toStatus, projectRoot) {
  if (!APPROVAL_REQUIRED_STATUSES.has(toStatus) || !report.change_id) {
    return;
  }

  const loadedChange = loadChangeProposalState({
    projectRoot,
    changeId: report.change_id
  });
  if (loadedChange.state.review_required && !CHANGE_APPROVAL_GATE_PASSED.has(loadedChange.state.approval_status)) {
    throw new Error(
      `Cannot move work item '${report.work_item_slug}' to ${toStatus} while change '${report.change_id}' approval_status=${loadedChange.state.approval_status}.`
    );
  }
}

function assertApprovalGate(report, toStatus, projectRoot) {
  if (!APPROVAL_REQUIRED_STATUSES.has(toStatus)) {
    return;
  }

  if (report.review_required && !APPROVAL_GATE_PASSED.has(report.approval_status)) {
    throw new Error(
      `Cannot move work item '${report.work_item_slug}' to ${toStatus} while approval_status=${report.approval_status}.`
    );
  }

  assertChangeApprovalGate(report, toStatus, projectRoot);
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
    protocolOwner,
    auditEvent,
    projectRoot
  } = options;
  const fromStatus = report.protocol_status;

  if (!isAllowedProtocolTransition(fromStatus, toStatus)) {
    throw new Error(`Invalid protocol transition ${fromStatus} -> ${toStatus} for work item '${report.work_item_slug}'.`);
  }

  assertApprovalGate(report, toStatus, projectRoot);

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
  const reviewedBy = normalizeSingleValue(args["reviewed-by"] || args.actor || "human");
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
  const reviewedBy = normalizeSingleValue(args["reviewed-by"] || args.actor || "human");
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
        note: getNoteText(args, "Work item moved into active workflow delivery."),
        currentStep: normalizeSingleValue(args.step || "s01"),
        handoffTarget: normalizeSingleValue(args["handoff-target"] || "step-s01-owner"),
        requiredActions: ["Continue workflow backbone from the current step."],
        protocolOwner: normalizeSingleValue(args["protocol-owner"] || args.actor || ""),
        auditEvent: "WORK_ITEM_ACTIVATED",
        projectRoot
      });
    case "block":
      return transitionReport(reportInput, {
        action,
        actor: normalizeSingleValue(args.actor || "coordinator"),
        toStatus: "BLOCKED",
        note: getNoteText(args, "Work item blocked."),
        currentStep: normalizeSingleValue(args.step || reportInput.current_step || "s01"),
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
        currentStep: normalizeSingleValue(args.step || reportInput.current_step || "s01"),
        handoffTarget: normalizeSingleValue(args["handoff-target"] || "step-owner"),
        blockers: [],
        requiredActions: ["Continue active delivery from the current step."],
        protocolOwner: normalizeSingleValue(args["protocol-owner"] || ""),
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
  const summary = [
    `OK: work item '${report.work_item_slug}'`,
    `protocol_status=${report.protocol_status}`,
    `approval_status=${report.approval_status}`,
    `current_step=${report.current_step || "<none>"}`,
    `handoff_target=${report.handoff_target || "<none>"}`
  ].join(" | ");

  console.log(summary);
  console.log(JSON.stringify(report, null, 2));
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

function listWorkItems({ projectRoot, workflowRootBase }) {
  return collectWorkItemDirs(workflowRootBase).map((workItemSlug) => {
    try {
      const loaded = loadProtocolReport({
        projectRoot,
        workflowRootBase,
        workItemSlug,
        allowBootstrap: true
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

    if (action === "list") {
      const entries = listWorkItems({
        projectRoot,
        workflowRootBase
      });
      printList(entries, workflowRootBase, Boolean(args.json));
      return;
    }

    const workItemSlug = requireWorkItemSlug(args);
    const loaded = loadProtocolReport({
      projectRoot,
      workflowRootBase,
      workItemSlug,
      allowBootstrap: true
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
