const fs = require("fs");
const path = require("path");
const workflowBundlePackage = require("../package.json");
const { formatErrors, parseCliArgs, getFrontmatterLines, getFrontmatterValue } = require("./workflow-validator-utils");
const { loadChangeProposalState } = require("./change-item-utils");
const { CHANGE_APPROVAL_GATE_PASSED } = require("./workflow-change-definitions");
const {
  normalizeRelativeProjectPath,
  syncCapabilityControl
} = require("./workflow-capability-control");
const {
  hasApprovedReceipt,
  verifyRecordedDisposition,
  loadTrustedApprovalReceipt,
  resolveTrustedApprovalRoot,
  signDispositionIntent,
  writeTrustedApprovalReceipt
} = require("./workflow-trusted-approval-utils");
const {
  APPROVAL_GATE_PASSED,
  BOOTSTRAP_GATE_PASSED,
  atomicWriteRawProtocolReport,
  buildProtocolEvent,
  createStateEntry,
  assertProtocolSnapshotUnchanged,
  getDispositionTargets,
  getWorkItemPaths,
  isAllowedProtocolTransition,
  loadProtocolControl,
  loadProtocolReport,
  matchesStateEntry,
  normalizeArray,
  normalizeProtocolReport,
  normalizeSingleValue,
  normalizeStateCollection,
  resolveWorkflowRootBase,
  selectDispositionTarget,
  syncProtocolArtifacts,
  upsertProtocolBlockInS01,
  withProtocolReportLock
} = require("./work-item-protocol-utils");
const {
  getProtocolStepGateErrors,
  getUncommittedDeliveryErrors,
  getWorkflowStepNotePath
} = require("./workflow-gate-evidence-utils");
const { ensureLazyWorkflowNote } = require("./scaffold-workflow");
const {
  emitAdaptiveTelemetryEvent,
  isTelemetryEnabled
} = require("./workflow-telemetry");

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
  "cancel",
  "dispose-state"
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

// E-B / REQ-004, carried from worktree-and-closure-integrity as L-01. The dod seal
// already refuses over a dirty declared scope, but sealing and transitioning are two
// moments: a tree clean at seal time can be dirty by the time DONE is recorded. This
// closes that window by re-checking at the transition.
//
// OQ-4 is answered by RE-EVALUATING rather than storing: no waiver is persisted in the
// receipt or the report, so a hatch granted at seal time does not silently outlive the
// condition it was granted for. The operator passes it again here, deliberately.
function assertUncommittedDeliveryGate(report, toStatus, projectRoot, options = {}) {
  if (toStatus !== "DONE") {
    return null;
  }

  const workflowRoot =
    report.workflow_root ||
    getWorkItemPaths({
      projectRoot,
      workflowRootBase: resolveWorkflowRootBase(projectRoot, ""),
      workItemSlug: report.work_item_slug
    }).workflowRoot;

  const verdict = getUncommittedDeliveryErrors({
    projectRoot,
    workflowRoot: path.resolve(workflowRoot),
    workItemSlug: report.work_item_slug,
    allowUncommitted: Boolean(options.allowUncommitted),
    uncommittedReason: options.uncommittedReason
  });

  if (verdict.errors.length > 0) {
    throw new Error(
      `Cannot move work item '${report.work_item_slug}' to DONE:\n- ${verdict.errors.join("\n- ")}`
    );
  }

  return verdict.waived ? verdict.reason : null;
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

  if (action === "archive" && report.blockers.length > 0) {
    throw new Error(`Cannot archive work item '${report.work_item_slug}' with active blockers; dispose each blocker by state_id first.`);
  }
  if ([...report.blockers, ...report.required_actions].some(entry => entry.kind === "legacy")) {
    throw new Error(`Cannot ${action} work item '${report.work_item_slug}' with unresolved opaque legacy state; use dispose-state with an exact state_id.`);
  }
  if (["activate", "resume"].includes(action) && report.blockers.length > 0) {
    throw new Error(`Cannot ${action} work item '${report.work_item_slug}' with active blockers; dispose each blocker by state_id first.`);
  }

  const priorActions = ({
    activate: [],
    block: ["activate", "resume"],
    resume: ["block"],
    verify: ["activate", "resume"],
    close: ["verify"],
    archive: ["close"],
    cancel: ["activate", "resume", "block", "verify", "close"]
  })[action] || [];
  const priorTransitionIds = new Set(priorActions.map(previous => createStateEntry({
    collection: "required_actions",
    kind: "workflow_followup",
    sourceKey: `transition:${previous}:${report.work_item_slug}:0`,
    text: "Transition-owned follow-up"
  }).id));
  const consumedKinds = ({
    activate: ["work_item_activation"],
    block: [],
    resume: ["blocker_resolution", "work_item_resume"],
    verify: [],
    close: ["work_item_close"],
    archive: [],
    cancel: []
  })[action] || [];
  let retainedActions = report.required_actions.filter(entry =>
    !priorTransitionIds.has(entry.id) && !consumedKinds.includes(entry.kind));
  if (action === "archive" && retainedActions.length > 0) {
    throw new Error(`Cannot archive work item '${report.work_item_slug}' with unresolved required_actions; dispose each by state_id first.`);
  }

  assertApprovalGate(report, toStatus, projectRoot);
  assertBootstrapGate(report, toStatus, projectRoot);
  assertStepGateEvidence(report, toStatus, projectRoot);
  const uncommittedWaiver = assertUncommittedDeliveryGate(report, toStatus, projectRoot, {
    allowUncommitted: options.allowUncommitted,
    uncommittedReason: options.uncommittedReason
  });
  if (action === "activate") {
    // Receipt checks above passed; retire only materializer-owned approval purposes by stable ID.
    const approvedActionIds = new Set([
      createStateEntry({ collection: "required_actions", kind: "workflow_followup",
        sourceKey: "work-item-approval:" + report.work_item_slug, text: "Approved work item" }).id
    ]);
    if (report.change_id) {
      approvedActionIds.add(createStateEntry({ collection: "required_actions", kind: "workflow_followup",
        sourceKey: "change-approval:" + report.change_id, text: "Approved change" }).id);
    }
    retainedActions = retainedActions.filter(entry => {
      if (approvedActionIds.has(entry.id)) return false;
      if (entry.kind !== "gate_approval" ||
          !["spec", "contract", "dor", "approach", "foundation", "task_plan"].includes(entry.gate)) return true;
      const materializerAction = createStateEntry({ collection: "required_actions", kind: "gate_approval",
        gate: entry.gate, sourceKey: "gate-approval:" + report.work_item_slug, text: "Approved gate" });
      if (entry.id !== materializerAction.id) return true;
      const receipt = loadTrustedApprovalReceipt({ projectRoot, kind: "gate",
        workItemSlug: report.work_item_slug, gate: entry.gate });
      return !hasApprovedReceipt(receipt.receipt, receipt.approvalRoot);
    });
  }
  if (uncommittedWaiver) {
    // Never silent: an exemption nobody can see is worse than no check.
    console.log(`WAIVED: closed over an uncommitted delivery. Reason: ${uncommittedWaiver}`);
  }

  report.protocol_status = toStatus;

  if (typeof currentStep === "string") {
    report.current_step = currentStep;
  }

  if (typeof handoffTarget === "string") {
    report.handoff_target = handoffTarget;
  }

  if (Array.isArray(blockers)) {
    const generatedBlockers = blockers.map((entry, index) => typeof entry === "string"
      ? createStateEntry({ collection: "blockers", kind: "delivery_blocker", sourceKey: `transition:${action}:${report.work_item_slug}:${index}`, text: entry })
      : entry);
    report.blockers = normalizeStateCollection([...report.blockers, ...generatedBlockers], "blockers");
  }

  if (Array.isArray(requiredActions)) {
    const generatedActions = requiredActions.map((entry, index) => typeof entry === "string"
      ? createStateEntry({ collection: "required_actions", kind: "workflow_followup", sourceKey: `transition:${action}:${report.work_item_slug}:${index}`, text: entry })
      : entry);
    report.required_actions = normalizeStateCollection([...retainedActions, ...generatedActions], "required_actions");
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
  for (const collection of ["blockers", "required_actions"]) {
    const pending = createStateEntry({ collection, kind: "workflow_followup", sourceKey: "work-item-approval:" + report.work_item_slug, text: "Work-item approval" });
    report[collection] = report[collection].filter(entry => !matchesStateEntry(entry, { id: pending.id }));
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
    const feedback = {
      blockers: createStateEntry({ collection: "blockers", kind: "delivery_blocker", sourceKey: "work-item-rejection:" + report.work_item_slug, text: `Approval rejected: ${noteText}` }),
      required_actions: createStateEntry({ collection: "required_actions", kind: "blocker_resolution", sourceKey: "work-item-rejection:" + report.work_item_slug, text: "Resolve review feedback before resuming ACTIVE delivery." })
    };
    for (const collection of ["blockers", "required_actions"]) {
      report[collection] = report[collection].filter(entry => !matchesStateEntry(entry, { id: feedback[collection].id }));
      report[collection].push(feedback[collection]);
    }
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

function reconcileApprovalBundleReport(
  reportInput,
  { phase, gates, decision, reviewedAt, recordProtocolEvent = true, transactionId } = {}
) {
  const report = normalizeProtocolReport(reportInput);
  const normalizedPhase = String(phase || "").trim();
  const normalizedDecision = String(decision || "").trim().toUpperCase();
  const gateNames = [...new Set((Array.isArray(gates) ? gates : []).map((gate) => String(gate || "").trim()).filter(Boolean))];
  if (!new Set(["readiness", "closeout"]).has(normalizedPhase)) {
    throw new Error(`Unsupported approval bundle reconciliation phase '${normalizedPhase}'.`);
  }
  if (!new Set(["APPROVED", "REJECTED"]).has(normalizedDecision)) {
    throw new Error(`Unsupported approval bundle reconciliation decision '${normalizedDecision}'.`);
  }
  if (gateNames.length < 1) {
    throw new Error("Approval bundle reconciliation requires at least one gate.");
  }

  const eventPrefix = normalizedPhase.toUpperCase();
  const gateList = gateNames.join(", ");
  const phaseKinds = [normalizedPhase + "_bundle_approval", normalizedPhase + "_bundle_rejected", "resolve_" + normalizedPhase + "_rejection"];
  const selected = entry => matchesStateEntry(entry, { kinds: phaseKinds }) ||
    gateNames.some(gate => matchesStateEntry(entry, { kinds: ["approval_pending", "gate_approval"], gate }));
  report.blockers = report.blockers.filter(entry => !selected(entry));
  report.required_actions = report.required_actions.filter(entry => !selected(entry));

  const auditEvent = `${eventPrefix}_BUNDLE_${normalizedDecision}`;
  if (normalizedDecision === "APPROVED") {
    appendAuditEvent(report, auditEvent);
    if (normalizedPhase === "readiness") {
      report.handoff_target = "step-s07-activation";
    } else {
      report.required_actions = report.required_actions.filter(entry => !matchesStateEntry(entry, { kind: "work_item_close" }));
      report.required_actions.push(createStateEntry({ collection: "required_actions", kind: "work_item_close", sourceKey: "work-item-close:" + report.work_item_slug, text: `wfc work-item close --work-item ${report.work_item_slug}` }));
      report.handoff_target = "protocol-close";
    }
  } else {
    const blocker = `${normalizedPhase === "readiness" ? "Readiness" : "Closeout"} bundle rejected for gates: ${gateList}.`;
    const action = `Resolve rejected ${normalizedPhase} gates before ${normalizedPhase === "readiness" ? "activation" : "completion"}.`;
    const sourceKey = `bundle:${normalizedPhase}:${report.work_item_slug}`;
    report.blockers.push(createStateEntry({ collection: "blockers", kind: normalizedPhase + "_bundle_rejected", sourceKey, text: blocker }));
    const retryAction =
      normalizedPhase === "readiness"
        ? `wfc gate approve-ready-bundle --work-item ${report.work_item_slug}`
        : `wfc gate approve-closeout-bundle --work-item ${report.work_item_slug}`;
    report.required_actions.unshift(
      createStateEntry({ collection: "required_actions", kind: "resolve_" + normalizedPhase + "_rejection", sourceKey, text: action }),
      createStateEntry({ collection: "required_actions", kind: normalizedPhase + "_bundle_approval", sourceKey, text: retryAction })
    );
    report.handoff_target = `${normalizedPhase}-rework`;
    appendAuditEvent(report, auditEvent);
  }

  // The coordinator classifies committed cycles from receipt/pre-event deltas.
  // Coarse audit markers and human notes are never event identity or dedup keys.
  if (recordProtocolEvent) {
    report.protocol_events.push(
      buildProtocolEvent({
        action: `${normalizedDecision === "APPROVED" ? "approve" : "reject"}-${normalizedPhase}-bundle`,
        actor: "human-review-bundle",
        fromStatus: report.protocol_status,
        toStatus: report.protocol_status,
        note: `${normalizedDecision} ${normalizedPhase} gates: ${gateList}`,
        timestamp: reviewedAt,
        transactionId
      })
    );
  }
  return report;
}

// Light transition hooks (plan v5 §2 + §3): s07 tạo khi chuyển ACTIVE, s08 tạo
// khi bắt đầu Verify. Idempotent — ensureLazyWorkflowNote no-op nếu note đã tồn tại.
// Chỉ kích hoạt cho sdd_mode=light (non-light scaffold đủ 8 note ngay từ đầu).
// Phải chạy TRƯỚC transitionReport để assertStepGateEvidence thấy note s08 tồn tại.
function ensureLightLazyStepNote(reportInput, projectRoot, stepId) {
  const report = normalizeProtocolReport(reportInput);
  const workflowRoot = path.resolve(
    report.workflow_root ||
      getWorkItemPaths({
        projectRoot,
        workflowRootBase: resolveWorkflowRootBase(projectRoot, ""),
        workItemSlug: report.work_item_slug
      }).workflowRoot
  );

  const s01Path = getWorkflowStepNotePath(workflowRoot, report.work_item_slug, "s01");
  if (!fs.existsSync(s01Path)) {
    return;
  }

  const frontmatterLines = getFrontmatterLines(s01Path);
  const sddMode = frontmatterLines ? getFrontmatterValue(frontmatterLines, "sdd_mode") || "none" : "none";
  if (sddMode !== "light") {
    return;
  }

  const planningTrack = frontmatterLines ? getFrontmatterValue(frontmatterLines, "planning_track") || "quick" : "quick";
  const deliveryContext = frontmatterLines ? getFrontmatterValue(frontmatterLines, "delivery_context") || "brownfield" : "brownfield";

  return ensureLazyWorkflowNote({
    args: {
      "work-item": report.work_item_slug,
      "sdd-mode": sddMode,
      "planning-track": planningTrack,
      "delivery-context": deliveryContext,
      "workflow-root": workflowRoot,
      "project-root": projectRoot
    },
    stepId
  });
}

// AC-05 (S3): lazy note chỉ được TỒN TẠI khi transition thành công. Note được
// tạo trước transitionReport (assertStepGateEvidence cần thấy note), nhưng nếu
// transition fail thì note vừa tạo phải được dọn — không để premature artifact
// trên đĩa làm bẩn budget và evidence timing.
function withLightLazyStepNote(reportInput, projectRoot, stepId, runTransition) {
  const created = ensureLightLazyStepNote(reportInput, projectRoot, stepId);
  try {
    return runTransition();
  } catch (error) {
    if (created && created.created && created.filePath && fs.existsSync(created.filePath)) {
      fs.rmSync(created.filePath, { force: true });
    }
    throw error;
  }
}

function applyAction(reportInput, action, args) {
  const projectRoot = path.resolve(normalizeSingleValue(args["project-root"] || process.cwd()));

  switch (action) {
    case "approve":
      return applyApprove(reportInput, args);
    case "reject":
      return applyReject(reportInput, args);
    case "activate":
      return withLightLazyStepNote(reportInput, projectRoot, "s07", () =>
        transitionReport(reportInput, {
          action,
          actor: normalizeSingleValue(args.actor || "coordinator"),
          toStatus: "ACTIVE",
          note: getNoteText(args, "Work item moved into active workflow execution."),
          currentStep: normalizeSingleValue(args.step || "s07"),
          handoffTarget: normalizeSingleValue(args["handoff-target"] || "step-s07-owner"),
          blockers: [],
          requiredActions: ["Continue active execution from step 7 onward."],
          protocolOwner: normalizeSingleValue(args["protocol-owner"] || args.actor || ""),
          grantedWritePaths: resolveGrantedWritePaths(reportInput, args, projectRoot, { requireNonEmpty: true }),
          auditEvent: "WORK_ITEM_ACTIVATED",
          projectRoot
        })
      );
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
      return withLightLazyStepNote(reportInput, projectRoot, "s08", () =>
        transitionReport(reportInput, {
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
        })
      );
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
        allowUncommitted: Boolean(args["allow-uncommitted-delivery"]),
        uncommittedReason: normalizeSingleValue(args["uncommitted-reason"] || ""),
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

function printStatus(reportInput, snapshot = {}) {
  const report = normalizeProtocolReport(reportInput);
  const rawBytes = snapshot.rawBytes || (snapshot.reportPath && fs.existsSync(snapshot.reportPath)
    ? fs.readFileSync(snapshot.reportPath)
    : null);
  const rawReport = snapshot.rawReport || (rawBytes ? JSON.parse(rawBytes.toString("utf8")) : null);
  const dispositionTargets = rawBytes ? getDispositionTargets(rawReport, rawBytes) : [];
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
        disposition_targets: dispositionTargets,
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

function requireDispositionArg(args, key) {
  const value = normalizeSingleValue(args[key] || "");
  if (typeof value !== "string" || !value.trim()) throw new Error(`dispose-state requires '--${key}'.`);
  return value.trim();
}


function refreshDispositionProjection({ s01Path, report, operationId }) {
  if (!fs.existsSync(s01Path)) return "NOT_APPLICABLE";
  try {
    if (process.env.WORKFLOW_BUNDLE_DISPOSITION_FAILURE_POINT === "before_projection_refresh") {
      throw new Error("Injected disposition failure at before_projection_refresh.");
    }
    upsertProtocolBlockInS01(s01Path, report);
    if (process.env.WORKFLOW_BUNDLE_DISPOSITION_FAILURE_POINT === "after_projection_refresh") {
      throw new Error("Injected disposition failure at after_projection_refresh.");
    }
    return "SYNCED";
  } catch (error) {
    throw new Error(`Disposition operation_id '${operationId}' is committed; s01 projection refresh failed: ${error.message}. Retry the same operation_id to repair the projection.`);
  }
}

function runDispositionAction({ projectRoot, workflowRootBase, workItemSlug, args }) {
  const stateId = requireDispositionArg(args, "state-id");
  const operationId = requireDispositionArg(args, "operation-id");
  const actor = requireDispositionArg(args, "reviewed-by");
  const reason = requireDispositionArg(args, "reason");
  if (actor !== "maintainer") throw new Error("dispose-state requires '--reviewed-by maintainer'.");
  const loaded = loadProtocolReport({ projectRoot, workflowRootBase, workItemSlug });
  const history = loaded.rawReport.resolved_state_history || [];
  const prior = history.filter((entry) => entry && entry.operation_id === operationId);
  if (prior.length > 1) throw new Error(`Duplicate disposition operation_id '${operationId}' in resolved history.`);
  if (prior.length === 1) {
    const { approvalRoot } = resolveTrustedApprovalRoot({
      projectRoot, overrideRoot: normalizeSingleValue(args["approval-root"] || "")
    });
    verifyRecordedDisposition({ record: prior[0], workItemSlug, stateId, operationId, actor, reason, approvalRoot });
    return { outcome: "NOOP", record: prior[0], projection_status: refreshDispositionProjection({
      s01Path: loaded.s01Path, report: loaded.rawReport, operationId
    }) };
  }

  // Unknown/stale ID is rejected before resolving a human passphrase or writing.
  const selected = selectDispositionTarget({ rawReport: loaded.rawReport, rawBytes: loaded.rawBytes, stateId });
  const { approvalRoot } = resolveTrustedApprovalRoot({
    projectRoot, overrideRoot: normalizeSingleValue(args["approval-root"] || "")
  });
  const resolvedAt = new Date().toISOString();
  const authorization = signDispositionIntent({
    approvalRoot, workItemSlug, operationId, stateId,
    sourceCollection: selected.collection, originalEntry: selected.originalEntry,
    actor, reason, resolvedAt,
    approvalPassphrase: normalizeSingleValue(args["approval-passphrase"] || "")
  });
  const originalText = typeof selected.originalEntry === "string" ? selected.originalEntry : selected.originalEntry.text;
  const record = {
    operation_id: operationId,
    source_collection: selected.collection,
    source_entry_id: stateId,
    original_entry: selected.originalEntry,
    original_text: originalText,
    actor,
    reason,
    resolved_at: resolvedAt,
    authorization
  };
  const nextReport = {
    ...loaded.rawReport,
    [selected.collection]: loaded.rawReport[selected.collection].filter((_entry, index) => index !== selected.index),
    resolved_state_history: [...history, record]
  };
  atomicWriteRawProtocolReport({
    report: nextReport,
    reportPath: loaded.reportPath,
    expectedBytes: loaded.rawBytes,
    failurePoint: String(process.env.WORKFLOW_BUNDLE_DISPOSITION_FAILURE_POINT || "")
  });
  return { outcome: "APPLIED", record, projection_status: refreshDispositionProjection({
    s01Path: loaded.s01Path, report: nextReport, operationId
  }) };
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
    if (action === "dispose-state") {
      const result = withProtocolReportLock({ workflowRootBase, workItemSlug }, () =>
        runDispositionAction({ projectRoot, workflowRootBase, workItemSlug, args })
      );
      console.log(`OK: disposition ${result.outcome.toLowerCase()} for '${workItemSlug}' | operation_id=${result.record.operation_id}`);
      console.log(JSON.stringify({
        outcome: result.outcome,
        work_item_slug: workItemSlug,
        operation_id: result.record.operation_id,
        state_id: result.record.source_entry_id,
        source_collection: result.record.source_collection,
        signature_verified: true,
        projection_status: result.projection_status
      }, null, 2));
      return;
    }
    // TD-01: a work item created by `wfc scaffold`/`scaffold-step` has no report, so
    // `approve` used to fail with "Missing work item report" and the manual authoring
    // path recommended by AGENTS.global.md could never reach ACTIVE.
    //
    // `status` keeps its policy gate: reading a legacy scaffold is a read-only courtesy
    // that `legacyScaffoldPolicy` is entitled to withhold. `approve` bootstraps
    // unconditionally, because the report it materialises carries approval_status
    // PENDING_REVIEW and an empty reviewed_by - recording that a scaffold exists grants
    // nothing, and the human decision is applied afterwards by applyAction. The audit
    // trail keeps REPORT_BOOTSTRAPPED so the provenance stays visible.
    // See approval-path-defects s06 ODC-001.
    const allowBootstrap =
      action === "approve" ||
      (action === "status" && protocolControl.legacyScaffoldPolicy === "allow_readonly");
    if (action === "status") {
      const loaded = loadProtocolReport({ projectRoot, workflowRootBase, workItemSlug, allowBootstrap });
      printStatus(loaded.report, loaded);
      return;
    }

    if (action === "block" && normalizeArray(args.blocker).length === 0) {
      throw new Error("block requires at least one '--blocker'.");
    }

    const { updatedReport, reportPath } = withProtocolReportLock({ workflowRootBase, workItemSlug }, () => {
      const loaded = loadProtocolReport({ projectRoot, workflowRootBase, workItemSlug, allowBootstrap });
      const updatedReport = applyAction(loaded.report, action, args);
      assertProtocolSnapshotUnchanged({
        reportPath: loaded.reportPath,
        rawBytes: loaded.existed ? loaded.rawBytes : null
      });
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
      return { updatedReport, reportPath: loaded.reportPath };
    });
    if (isTelemetryEnabled(args.telemetry)) {
      try {
        emitAdaptiveTelemetryEvent({
          enabled: true,
          projectRoot,
          outputDirOverride: normalizeSingleValue(args["telemetry-out"] || ""),
          event: {
            event_type: "work_item_transition",
            runtime_version: workflowBundlePackage.version,
            request_lane: updatedReport.request_lane,
            selected_profile: updatedReport.selected_profile,
            sdd_light_profile: updatedReport.sdd_light_profile,
            routing_reasons: updatedReport.routing_reasons,
            escalation_reasons: updatedReport.escalation_reasons,
            role_count: Array.isArray(updatedReport.roles) ? updatedReport.roles.length : null,
            gate_count: Array.isArray(updatedReport.gates) ? updatedReport.gates.length : null,
            interaction_count: action === "approve" || action === "reject" ? 1 : 0,
            override_count: updatedReport.human_override ? 1 : 0,
            retry_count: 0,
            outcome:
              action === "approve"
                ? "approved"
                : action === "reject"
                  ? "rejected"
                : String(updatedReport.protocol_status || "").toLowerCase(),
            work_item_slug: updatedReport.work_item_slug,
            retention_class: "raw",
            recorded_at: new Date().toISOString()
          }
        });
      } catch (_error) {
        // The protocol mutation is already durable. Optional local telemetry
        // must never convert a successful lifecycle transition into a failure.
        process.stderr.write("WARN: TELEMETRY_WRITE_FAILED\n");
      }
    }
    syncCapabilityControl({
      projectRoot,
      workflowRootBase
    });
    printStatus(updatedReport, { reportPath });
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
  assertUncommittedDeliveryGate,
  applyAction,
  ensureLightLazyStepNote,
  listWorkItems,
  reconcileApprovalBundleReport,
  runCli,
  transitionReport
};
