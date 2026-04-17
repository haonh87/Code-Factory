const fs = require("fs");
const path = require("path");
const {
  ensureDirectory,
  getFrontmatterLines,
  getFrontmatterValue,
  readUtf8
} = require("./workflow-validator-utils");

const PROTOCOL_STATUSES = [
  "INTAKE",
  "PROPOSED",
  "READY_TO_MATERIALIZE",
  "MATERIALIZED",
  "ACTIVE",
  "BLOCKED",
  "VERIFIED",
  "DONE",
  "ARCHIVED",
  "CANCELLED"
];

const APPROVAL_STATUSES = ["PENDING_REVIEW", "APPROVED", "REJECTED", "NOT_REQUIRED"];
const APPROVAL_GATE_PASSED = new Set(["APPROVED", "NOT_REQUIRED"]);

const PROTOCOL_TRANSITIONS = {
  INTAKE: ["PROPOSED"],
  PROPOSED: ["READY_TO_MATERIALIZE", "CANCELLED"],
  READY_TO_MATERIALIZE: ["MATERIALIZED", "CANCELLED"],
  MATERIALIZED: ["ACTIVE", "CANCELLED"],
  ACTIVE: ["BLOCKED", "VERIFIED", "CANCELLED"],
  BLOCKED: ["ACTIVE", "CANCELLED"],
  VERIFIED: ["DONE"],
  DONE: ["ARCHIVED"],
  ARCHIVED: [],
  CANCELLED: []
};

function normalizeSingleValue(value) {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }

  return value;
}

function normalizeArray(value) {
  if (value == null) {
    return [];
  }

  return (Array.isArray(value) ? value : [value])
    .flatMap((item) => (Array.isArray(item) ? item : [item]))
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function quoteYamlString(value) {
  return JSON.stringify(String(value == null ? "" : value));
}

function buildYamlList(key, values, indent = "") {
  const normalized = normalizeArray(values);
  if (normalized.length === 0) {
    return [`${indent}${key}: []`];
  }

  return [
    `${indent}${key}:`,
    ...normalized.map((value) => `${indent}  - ${quoteYamlString(value)}`)
  ];
}

function getDefaultApprovalState(decisionOwner) {
  const reviewRequired = decisionOwner === "agent";
  return {
    review_required: reviewRequired,
    approval_status: reviewRequired ? "PENDING_REVIEW" : "NOT_REQUIRED",
    reviewed_by: "",
    reviewed_at: "",
    review_notes: []
  };
}

function buildProtocolEvent({
  action,
  actor,
  fromStatus,
  toStatus,
  note,
  timestamp
}) {
  return {
    timestamp: timestamp || new Date().toISOString(),
    action: String(action || "").trim(),
    actor: String(actor || "").trim(),
    from_status: String(fromStatus || "").trim(),
    to_status: String(toStatus || "").trim(),
    note: String(note || "").trim()
  };
}

function resolveWorkflowRootBase(projectRoot, workflowRootBase) {
  return path.resolve(workflowRootBase || path.join(projectRoot, "work-items"));
}

function getWorkItemPaths({ projectRoot, workflowRootBase, workItemSlug }) {
  const resolvedWorkflowRootBase = resolveWorkflowRootBase(projectRoot, workflowRootBase);
  const workflowRoot =
    path.basename(resolvedWorkflowRootBase) === workItemSlug &&
    fs.existsSync(path.join(resolvedWorkflowRootBase, `${workItemSlug}.s01.restate.md`))
      ? resolvedWorkflowRootBase
      : path.join(resolvedWorkflowRootBase, workItemSlug);

  return {
    workflowRootBase: resolvedWorkflowRootBase,
    workflowRoot,
    s01Path: path.join(workflowRoot, `${workItemSlug}.s01.restate.md`),
    reportPath: path.join(workflowRoot, `${workItemSlug}.work-item-report.json`)
  };
}

function normalizeProtocolEvent(event) {
  if (!event || typeof event !== "object" || Array.isArray(event)) {
    return null;
  }

  return {
    timestamp: String(event.timestamp || "").trim(),
    action: String(event.action || "").trim(),
    actor: String(event.actor || "").trim(),
    from_status: String(event.from_status || "").trim(),
    to_status: String(event.to_status || "").trim(),
    note: String(event.note || "").trim()
  };
}

function normalizeProtocolReport(report) {
  const decisionOwner = String(report.decision_owner || "agent").trim() || "agent";
  const approvalDefaults = getDefaultApprovalState(decisionOwner);

  return {
    materialization_status: String(report.materialization_status || "PROPOSED").trim(),
    protocol_status: String(report.protocol_status || "PROPOSED").trim(),
    decision_owner: decisionOwner,
    protocol_owner: String(report.protocol_owner || "").trim(),
    raw_request_summary: String(report.raw_request_summary || "").trim(),
    request_source: String(report.request_source || "").trim(),
    candidate_count: Number(report.candidate_count || 1),
    split_decision: String(report.split_decision || "single").trim(),
    dedup_result: String(report.dedup_result || "no_conflict").trim(),
    work_items: Array.isArray(report.work_items) ? report.work_items : [],
    decision_log: normalizeArray(report.decision_log),
    work_item_slug: String(report.work_item_slug || "").trim(),
    work_item_type: String(report.work_item_type || "FEATURE").trim(),
    workflow_root: String(report.workflow_root || "").trim(),
    current_step: String(report.current_step || "").trim(),
    change_strategy: String(report.change_strategy || "none").trim(),
    change_id: String(report.change_id || "").trim(),
    handoff_target: String(report.handoff_target || "").trim(),
    required_actions: normalizeArray(report.required_actions),
    blockers: normalizeArray(report.blockers),
    refs: normalizeArray(report.refs),
    audit_events: normalizeArray(report.audit_events),
    review_required:
      typeof report.review_required === "boolean" ? report.review_required : approvalDefaults.review_required,
    approval_status: String(report.approval_status || approvalDefaults.approval_status).trim(),
    reviewed_by: String(report.reviewed_by || approvalDefaults.reviewed_by).trim(),
    reviewed_at: String(report.reviewed_at || approvalDefaults.reviewed_at).trim(),
    review_notes: normalizeArray(report.review_notes || approvalDefaults.review_notes),
    protocol_events: (Array.isArray(report.protocol_events) ? report.protocol_events : [])
      .map((entry) => {
        try {
          return typeof entry === "string" ? JSON.parse(entry) : entry;
        } catch (error) {
          return null;
        }
      })
      .map((event) => normalizeProtocolEvent(event))
      .filter(Boolean)
  };
}

function buildBootstrapReport({ projectRoot, workflowRootBase, workItemSlug, workflowRoot, s01Path }) {
  const frontmatterLines = getFrontmatterLines(s01Path);
  if (!frontmatterLines) {
    throw new Error(`Missing frontmatter in ${s01Path}`);
  }

  const workItemType = getFrontmatterValue(frontmatterLines, "work_item_type") || "FEATURE";
  const changeId = getFrontmatterValue(frontmatterLines, "change_id") || "";
  const workflowRootRef = workflowRoot || getWorkItemPaths({ projectRoot, workflowRootBase, workItemSlug }).workflowRoot;
  const approvalDefaults = getDefaultApprovalState("human");

  return normalizeProtocolReport({
    materialization_status: "READY",
    protocol_status: "MATERIALIZED",
    decision_owner: "human",
    protocol_owner: "",
    raw_request_summary: "",
    request_source: "legacy-scaffold",
    candidate_count: 1,
    split_decision: "single",
    dedup_result: "no_conflict",
    work_items: [],
    decision_log: ["bootstrap_from_existing_s01=true"],
    work_item_slug: workItemSlug,
    work_item_type: workItemType,
    workflow_root: workflowRootRef,
    current_step: "s01",
    change_strategy: changeId ? "reuse_existing" : "none",
    change_id: changeId,
    handoff_target: "author-s01",
    required_actions: ["Review and continue workflow backbone s01 -> s08."],
    blockers: [],
    refs: [path.relative(projectRoot, workflowRootRef)],
    audit_events: ["REPORT_BOOTSTRAPPED"],
    ...approvalDefaults,
    protocol_events: [
      buildProtocolEvent({
        action: "bootstrap",
        actor: "system",
        fromStatus: "READY_TO_MATERIALIZE",
        toStatus: "MATERIALIZED",
        note: "Bootstrapped report from existing scaffold."
      })
    ]
  });
}

function loadProtocolReport({ projectRoot, workflowRootBase, workItemSlug, allowBootstrap = false }) {
  const paths = getWorkItemPaths({ projectRoot, workflowRootBase, workItemSlug });

  if (fs.existsSync(paths.reportPath)) {
    const raw = JSON.parse(readUtf8(paths.reportPath));
    return {
      report: normalizeProtocolReport(raw),
      ...paths,
      existed: true
    };
  }

  if (!allowBootstrap) {
    throw new Error(`Missing work item report: ${paths.reportPath}`);
  }

  if (!fs.existsSync(paths.s01Path)) {
    throw new Error(`Missing s01 note for work item '${workItemSlug}': ${paths.s01Path}`);
  }

  return {
    report: buildBootstrapReport({
      projectRoot,
      workflowRootBase: paths.workflowRootBase,
      workItemSlug,
      workflowRoot: paths.workflowRoot,
      s01Path: paths.s01Path
    }),
    ...paths,
    existed: false
  };
}

function renderProtocolBlock(reportInput) {
  const report = normalizeProtocolReport(reportInput);
  const lastEvent = report.protocol_events.length > 0 ? report.protocol_events[report.protocol_events.length - 1] : null;

  return [
    "## Work Item Protocol",
    "```yaml",
    `protocol_status: ${report.protocol_status}`,
    `approval_status: ${report.approval_status}`,
    `review_required: ${report.review_required ? "true" : "false"}`,
    `work_item_slug: ${quoteYamlString(report.work_item_slug)}`,
    `work_item_type: ${report.work_item_type}`,
    `workflow_root: ${quoteYamlString(report.workflow_root)}`,
    `current_step: ${quoteYamlString(report.current_step)}`,
    `materialization_status: ${report.materialization_status}`,
    `change_strategy: ${report.change_strategy}`,
    `change_id: ${quoteYamlString(report.change_id)}`,
    `decision_owner: ${quoteYamlString(report.decision_owner)}`,
    `protocol_owner: ${quoteYamlString(report.protocol_owner)}`,
    `reviewed_by: ${quoteYamlString(report.reviewed_by)}`,
    `reviewed_at: ${quoteYamlString(report.reviewed_at)}`,
    `handoff_target: ${quoteYamlString(report.handoff_target)}`,
    `last_transition_action: ${quoteYamlString(lastEvent ? lastEvent.action : "")}`,
    `last_transition_at: ${quoteYamlString(lastEvent ? lastEvent.timestamp : "")}`,
    ...buildYamlList("required_actions", report.required_actions),
    ...buildYamlList("blockers", report.blockers),
    ...buildYamlList("review_notes", report.review_notes),
    ...buildYamlList("refs", report.refs),
    ...buildYamlList("audit_events", report.audit_events),
    "```"
  ].join("\n");
}

function upsertProtocolBlockInS01(s01Path, reportInput) {
  const report = normalizeProtocolReport(reportInput);
  const content = readUtf8(s01Path);
  const protocolBlock = `${renderProtocolBlock(report)}\n\n`;
  const sectionPattern = /## Work Item Protocol\n```yaml\n[\s\S]*?\n```\n*/m;

  if (sectionPattern.test(content)) {
    const updated = content.replace(sectionPattern, protocolBlock);
    fs.writeFileSync(s01Path, updated, "utf8");
    return;
  }

  const marker = "## Traceability";
  const markerIndex = content.indexOf(marker);
  const updated =
    markerIndex >= 0
      ? `${content.slice(0, markerIndex)}${protocolBlock}${content.slice(markerIndex)}`
      : `${content.trim()}\n\n${protocolBlock}`;

  fs.writeFileSync(s01Path, updated, "utf8");
}

function writeProtocolReport(reportInput, reportPath) {
  const report = normalizeProtocolReport(reportInput);
  ensureDirectory(path.dirname(reportPath));
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

function syncProtocolArtifacts({ report, reportPath, s01Path }) {
  writeProtocolReport(report, reportPath);
  if (fs.existsSync(s01Path)) {
    upsertProtocolBlockInS01(s01Path, report);
  }
}

function isAllowedProtocolTransition(fromStatus, toStatus) {
  if (fromStatus === toStatus) {
    return true;
  }

  return Boolean(PROTOCOL_TRANSITIONS[fromStatus] && PROTOCOL_TRANSITIONS[fromStatus].includes(toStatus));
}

module.exports = {
  APPROVAL_GATE_PASSED,
  APPROVAL_STATUSES,
  PROTOCOL_STATUSES,
  PROTOCOL_TRANSITIONS,
  buildProtocolEvent,
  buildYamlList,
  getDefaultApprovalState,
  getWorkItemPaths,
  isAllowedProtocolTransition,
  loadProtocolReport,
  normalizeArray,
  normalizeProtocolReport,
  normalizeSingleValue,
  quoteYamlString,
  renderProtocolBlock,
  resolveWorkflowRootBase,
  syncProtocolArtifacts,
  upsertProtocolBlockInS01,
  writeProtocolReport
};
