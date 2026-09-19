const fs = require("fs");
const path = require("path");
const { createHash, randomUUID } = require("crypto");
const { normalizeTransactionId } = require("./workflow-approval-transaction");
const {
  ensureDirectory,
  getFrontmatterLines,
  getFrontmatterValue,
  readUtf8
} = require("./workflow-validator-utils");

const CONFIG_FILE_NAMES = ["workflow-bundle.config.json", "workflow-contracts.config.json"];
const PROTOCOL_LEGACY_SCAFFOLD_POLICIES = ["forbid", "allow_readonly"];
const DEFAULT_PROTOCOL_CONTROL = {
  legacyScaffoldPolicy: "forbid"
};
const PROJECT_BASELINE_FILES = [
  "package.json",
  "pyproject.toml",
  "requirements.txt",
  "go.mod",
  "Cargo.toml",
  "composer.json",
  "pom.xml",
  "build.gradle",
  "build.gradle.kts",
  "Gemfile",
  "Dockerfile",
  "compose.yaml",
  "docker-compose.yml"
];
const PROJECT_BASELINE_DIRS = ["src", "app", "services", "backend", "frontend", "api", "server", "client", "web", "packages"];

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
const TRANSACTION_BUNDLE_ACTIONS = new Set([
  "approve-readiness-bundle", "reject-readiness-bundle",
  "approve-closeout-bundle", "reject-closeout-bundle"
]);
const APPROVAL_GATE_PASSED = new Set(["APPROVED"]);
const BOOTSTRAP_GATE_STATUSES = ["PENDING_REVIEW", "APPROVED", "NOT_REQUIRED"];
const BOOTSTRAP_GATE_PASSED = new Set(["APPROVED", "NOT_REQUIRED"]);

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

const STATE_COLLECTIONS = ["blockers", "required_actions"];
const STATE_GATE_KEYS = ["bootstrap", "spec", "contract", "dor", "approach", "foundation", "task_plan", "uat", "release", "business_acceptance", "dod"];
const GATE_SCOPED_STATE_KINDS = ["approval_pending", "gate_approval"];
const STATE_ENTRY_KINDS = [
  ...GATE_SCOPED_STATE_KINDS,
  "readiness_bundle_approval", "closeout_bundle_approval",
  "readiness_bundle_rejected", "closeout_bundle_rejected",
  "resolve_readiness_rejection", "resolve_closeout_rejection",
  "work_item_activation", "work_item_close", "work_item_resume",
  "blocker_resolution", "workflow_followup", "delivery_blocker", "legacy"
];

function getStateCollectionErrors(values, collection) {
  if (!Array.isArray(values)) return [`${collection} must be an array.`];
  const errors = [], seenIds = new Set();
  values.forEach((entry, index) => {
    const location = `${collection}[${index}]`;
    // Raw strings are accepted only as pre-contract input to the load adapter.
    if (typeof entry === "string") return;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      errors.push(`${location} must be a state-entry object or legacy string.`);
      return;
    }
    if (!STATE_ENTRY_KINDS.includes(entry.kind)) errors.push(`${location} has an unknown kind.`);
    if (typeof entry.text !== "string" || (entry.kind !== "legacy" && !entry.text.trim())) {
      errors.push(`${location} text must be non-empty display content (legacy text is preserved exactly).`);
    }
    if (entry.kind === "legacy") {
      if (Object.keys(entry).some(key => key !== "kind" && key !== "text")) {
        errors.push(`${location} legacy entry must contain only kind and text.`);
      }
      return;
    }
    if (typeof entry.id !== "string" || !entry.id.trim()) errors.push(`${location} id must be a non-empty opaque string.`);
    else if (seenIds.has(entry.id)) errors.push(`${location} has duplicate id '${entry.id}'.`);
    else seenIds.add(entry.id);
    if (GATE_SCOPED_STATE_KINDS.includes(entry.kind)) {
      if (!STATE_GATE_KEYS.includes(entry.gate)) errors.push(`${location} gate must name a canonical gate for this kind.`);
    } else if (Object.hasOwn(entry, "gate")) errors.push(`${location} gate must be omitted for non-gate kinds.`);
    if (Object.keys(entry).some(key => !["id", "kind", "text", "gate"].includes(key))) {
      errors.push(`${location} contains unsupported state-entry fields.`);
    }
  });
  return errors;
}

function createStateEntry({ collection, kind, text, gate, sourceKey }) {
  if (!STATE_COLLECTIONS.includes(collection)) throw new Error("State entry collection must be blockers or required_actions.");
  if (typeof sourceKey !== "string" || !sourceKey.trim()) throw new Error("State entry requires a non-empty sourceKey.");
  if (kind === "legacy") throw new Error("Newly generated state cannot use the legacy kind.");
  const id = "se:" + createHash("sha256").update(JSON.stringify([collection, kind, gate || "", sourceKey])).digest("hex");
  const entry = { id, kind, text, ...(gate !== undefined ? { gate } : {}) };
  const errors = getStateCollectionErrors([entry], collection);
  if (errors.length) throw new Error(errors.join("\n"));
  return entry;
}

// The ONLY legacy prose interpretation boundary. This deliberately recognizes
// exact protocol-owned constants, not synonyms, substring matches or casing.
const LEGACY_STATE_VALUES = new Map([
  ["Review and continue workflow backbone s01 -> s08.", "workflow_followup"],
  ["Continue active execution from step 7 onward.", "workflow_followup"],
  ["Continue active execution from the current step.", "workflow_followup"],
  ["Resolve blockers before resuming the work item.", "blocker_resolution"],
  ["Resolve review feedback before resuming ACTIVE delivery.", "blocker_resolution"],
  ["Collect DoD evidence and close the work item when ready.", "workflow_followup"],
  ["Archive the work item when all downstream lifecycle actions are complete.", "workflow_followup"],
  ["Resolve rejected readiness gates before activation.", "resolve_readiness_rejection"],
  ["Resolve rejected closeout gates before completion.", "resolve_closeout_rejection"],
  ["Readiness bundle rejected for gates: spec, dor, approach, task_plan.", "readiness_bundle_rejected"],
  ["Closeout bundle rejected for gates: release, business_acceptance.", "closeout_bundle_rejected"],
  ["Closeout bundle rejected for gates: dod, release, business_acceptance.", "closeout_bundle_rejected"],
  ["Closeout bundle rejected for gates: dod, uat, release, business_acceptance.", "closeout_bundle_rejected"]
]);

function importLegacyStateEntry(text, collection, { workItemSlug = "", changeId = "" } = {}) {
  const exactKind = LEGACY_STATE_VALUES.get(text);
  if (exactKind) return createStateEntry({ collection, kind: exactKind, text, sourceKey: "legacy:" + text });

  // Explicit full-string wfc grammar. Each option is consumed as a key/value
  // pair; unknown/duplicate flags or extra prose make the entire input opaque.
  const match = /^wfc[ \t]+(gate|work-item|change-item)[ \t]+(approve|reject|approve-ready-bundle|reject-ready-bundle|approve-closeout-bundle|reject-closeout-bundle|activate|close|resume)((?:[ \t]+--[a-z-]+[ \t]+[^\s]+)+)$/.exec(text);
  if (!match || match[0] !== text) return { kind: "legacy", text };
  const optionTokens = match[3].trim().split(/[ \t]+/), options = {};
  const allowed = new Set(["--workflow-root", "--project-root"]);
  if (match[1] === "change-item") {
    if (match[2] !== "approve") return { kind: "legacy", text };
    allowed.add("--change-id"); allowed.add("--reviewed-by");
  } else {
    allowed.add("--work-item");
    if (match[1] === "gate" && ["approve", "reject"].includes(match[2])) {
      ["--gate", "--reviewed-by", "--ref"].forEach(key => allowed.add(key));
    } else if (match[1] === "work-item" && match[2] === "approve") allowed.add("--reviewed-by");
    else if (match[1] === "work-item" && ["activate", "resume"].includes(match[2])) {
      allowed.add("--step"); allowed.add("--write-root");
    }
  }
  for (let i = 0; i < optionTokens.length; i += 2) {
    const key = optionTokens[i], value = optionTokens[i + 1];
    if (!allowed.has(key) || (Object.hasOwn(options, key) && key !== "--write-root") || !value || value.startsWith("--")) return { kind: "legacy", text };
    options[key] = value;
  }
  const slug = options["--work-item"];
  if (match[1] !== "change-item" && (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || (workItemSlug && slug !== workItemSlug))) return { kind: "legacy", text };
  if (options["--step"] && !/^s0[1-8]$/.test(options["--step"])) return { kind: "legacy", text };
  let kind, gate, sourceKey = "legacy:" + text;
  if (match[1] === "change-item") {
    const id = options["--change-id"];
    if (!id || !/^[A-Z]+-[0-9]+$/.test(id) || (changeId && id !== changeId)) return { kind: "legacy", text };
    kind = "workflow_followup"; sourceKey = "change-approval:" + id;
  } else if (match[1] === "gate") {
    if (match[2] === "approve" || match[2] === "reject") {
      gate = options["--gate"];
      if (!STATE_GATE_KEYS.includes(gate)) return { kind: "legacy", text };
      kind = "gate_approval";
    } else if (["approve-ready-bundle", "reject-ready-bundle"].includes(match[2])) kind = "readiness_bundle_approval";
    else if (["approve-closeout-bundle", "reject-closeout-bundle"].includes(match[2])) kind = "closeout_bundle_approval";
  } else {
    kind = { approve: "workflow_followup", activate: "work_item_activation", close: "work_item_close", resume: "work_item_resume" }[match[2]];
    if (match[2] === "approve") sourceKey = "work-item-approval:" + slug;
  }
  if (!kind || (gate === undefined && Object.hasOwn(options, "--gate"))) return { kind: "legacy", text };
  return createStateEntry({ collection, kind, gate, text, sourceKey });
}

function normalizeStateCollection(values, collection, context) {
  const raw = values === undefined ? [] : values;
  const rawErrors = getStateCollectionErrors(raw, collection);
  if (rawErrors.length) throw new Error(rawErrors.join("\n"));
  const normalized = raw.map(entry => typeof entry === "string"
    ? importLegacyStateEntry(entry, collection, context)
    : { ...entry });
  const errors = getStateCollectionErrors(normalized, collection);
  if (errors.length) throw new Error(errors.join("\n"));
  return normalized;
}

function matchesStateEntry(entry, { id, kind, gate, kinds } = {}) {
  if (!entry || entry.kind === "legacy") return false;
  if (id !== undefined) return entry.id === id;
  const selectedKinds = kinds || (kind !== undefined ? [kind] : []);
  if (!selectedKinds.length || !selectedKinds.includes(entry.kind)) return false;
  if (GATE_SCOPED_STATE_KINDS.includes(entry.kind)) return gate !== undefined && entry.gate === gate;
  return gate === undefined;
}

function buildStateYamlList(key, values) {
  return values.length ? [key + ":", ...values.map(entry => "  - " + JSON.stringify(entry))] : [key + ": []"];
}

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
  return {
    review_required: true,
    approval_status: "PENDING_REVIEW",
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
  timestamp,
  transactionId
}) {
  const normalizedAction = String(action || "").trim();
  const transactionBacked = TRANSACTION_BUNDLE_ACTIONS.has(normalizedAction);
  if (transactionBacked && typeof transactionId !== "string") {
    throw new Error("New approval bundle event requires a direct string transaction_id.");
  }
  return {
    timestamp: timestamp || new Date().toISOString(),
    action: normalizedAction,
    actor: String(actor || "").trim(),
    from_status: String(fromStatus || "").trim(),
    to_status: String(toStatus || "").trim(),
    note: String(note || "").trim(),
    ...(transactionBacked ? { transaction_id: normalizeTransactionId(transactionId) } : {})
  };
}

function loadWorkflowProjectConfig(projectRoot) {
  for (const fileName of CONFIG_FILE_NAMES) {
    const filePath = path.join(projectRoot, fileName);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error(`Config root must be a JSON object: ${filePath}`);
    }

    return parsed;
  }

  return {};
}

function loadProtocolControl(projectRoot) {
  const rawConfig = loadWorkflowProjectConfig(projectRoot);
  const protocolControl =
    rawConfig.protocolControl && typeof rawConfig.protocolControl === "object" && !Array.isArray(rawConfig.protocolControl)
      ? rawConfig.protocolControl
      : {};
  const legacyScaffoldPolicy = String(
    protocolControl.legacyScaffoldPolicy || DEFAULT_PROTOCOL_CONTROL.legacyScaffoldPolicy
  )
    .trim()
    .toLowerCase();

  if (!PROTOCOL_LEGACY_SCAFFOLD_POLICIES.includes(legacyScaffoldPolicy)) {
    throw new Error(
      `Invalid protocolControl.legacyScaffoldPolicy '${legacyScaffoldPolicy}' under ${projectRoot}. ` +
        `Allowed values: ${PROTOCOL_LEGACY_SCAFFOLD_POLICIES.join(", ")}`
    );
  }

  return {
    legacyScaffoldPolicy
  };
}

function hasProjectImplementationBaseline(projectRoot) {
  if (PROJECT_BASELINE_FILES.some((fileName) => fs.existsSync(path.join(projectRoot, fileName)))) {
    return true;
  }

  return PROJECT_BASELINE_DIRS.some((dirName) => {
    const dirPath = path.join(projectRoot, dirName);
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      return false;
    }

    const children = fs
      .readdirSync(dirPath)
      .filter((entry) => !entry.startsWith("."))
      .filter((entry) => !["docs", "work-items", "changes", "project-context"].includes(entry));

    return children.length > 0;
  });
}

function inferDeliveryContext(projectRoot, explicitDeliveryContext) {
  if (explicitDeliveryContext) {
    return explicitDeliveryContext;
  }

  return hasProjectImplementationBaseline(projectRoot) ? "brownfield" : "greenfield";
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

function getProtocolReportLockPath({ workflowRootBase, workItemSlug }) {
  if (typeof workItemSlug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(workItemSlug)) {
    throw new Error("Report lock requires a valid work item slug.");
  }
  const base = path.resolve(workflowRootBase);
  const rootBase = path.basename(base) === workItemSlug &&
    fs.existsSync(path.join(base, `${workItemSlug}.s01.restate.md`))
      ? path.dirname(base) : base;
  return path.join(rootBase, `.${workItemSlug}.work-item-report.lock`);
}

// Fail closed on an existing lock, including an orphan. Automatic stale-lock
// removal can race a new owner and silently undo serialization. Recovery is an
// explicit operator action after checking the recorded PID and current state.
function withProtocolReportLock(options, callback) {
  if (typeof callback !== "function") throw new Error("Report lock requires a synchronous callback.");
  const lockPath = getProtocolReportLockPath(options);
  ensureDirectory(path.dirname(lockPath));
  const owner = `${JSON.stringify({ pid: process.pid, nonce: randomUUID(), acquired_at: new Date().toISOString() })}\n`;
  let fd;
  try {
    fd = fs.openSync(lockPath, "wx", 0o600);
  } catch (error) {
    if (error.code === "EEXIST") throw new Error(`Report mutation lock already exists for '${options.workItemSlug}' (${lockPath}).`);
    throw error;
  }
  try {
    fs.writeFileSync(fd, owner, "utf8");
  } catch (error) {
    fs.closeSync(fd);
    if (fs.existsSync(lockPath) && fs.readFileSync(lockPath, "utf8") === owner) fs.unlinkSync(lockPath);
    throw error;
  }
  fs.closeSync(fd);
  try {
    const result = callback({ lockPath });
    if (result && typeof result.then === "function") throw new Error("Report lock callback must be synchronous.");
    return result;
  } finally {
    if (!fs.existsSync(lockPath) || fs.readFileSync(lockPath, "utf8") !== owner) {
      throw new Error(`Report mutation lock ownership changed for '${options.workItemSlug}'; refusing to remove it.`);
    }
    fs.unlinkSync(lockPath);
  }
}

function assertProtocolSnapshotUnchanged({ reportPath, rawBytes }) {
  const exists = fs.existsSync(reportPath);
  if (rawBytes === null) {
    if (!exists) return;
  } else if (Buffer.isBuffer(rawBytes) && exists && fs.readFileSync(reportPath).equals(rawBytes)) {
    return;
  }
  throw new Error(`Work item report snapshot changed before commit: ${reportPath}`);
}

function normalizeProtocolEvent(event) {
  if (!event || typeof event !== "object" || Array.isArray(event)) {
    return null;
  }

  if (Object.hasOwn(event, "transaction_id") && typeof event.transaction_id !== "string") {
    throw new Error("Persisted approval event transaction_id must be a canonical string UUID.");
  }

  return {
    timestamp: String(event.timestamp || "").trim(),
    action: String(event.action || "").trim(),
    actor: String(event.actor || "").trim(),
    from_status: String(event.from_status || "").trim(),
    to_status: String(event.to_status || "").trim(),
    // History is load-only. Missing legacy identity is never inferred from prose.
    note: String(event.note || ""),
    ...(Object.hasOwn(event, "transaction_id") ? { transaction_id: normalizeTransactionId(event.transaction_id) } : {})
  };
}

function normalizeReasonedEntries(entries, key) {
  return (Array.isArray(entries) ? entries : [])
    .filter((entry) => entry && typeof entry === "object" && !Array.isArray(entry))
    .map((entry) => ({
      [key]: String(entry[key] || "").trim(),
      reasons: normalizeArray(entry.reasons),
      ...(key === "gate" ? { reviewer_roles: normalizeArray(entry.reviewer_roles) } : {})
    }))
    .filter((entry) => entry[key]);
}

function isAdaptiveProtocolReport(report) {
  return Boolean(report && report.artifact_shape === "adaptive_v1");
}

function normalizeProtocolReport(report) {
  const decisionOwner = String(report.decision_owner || "agent").trim() || "agent";
  const approvalDefaults = getDefaultApprovalState(decisionOwner);

  const normalized = {
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
    delivery_context: String(report.delivery_context || "brownfield").trim(),
    workflow_root: String(report.workflow_root || "").trim(),
    current_step: String(report.current_step || "").trim(),
    granted_write_paths: normalizeArray(report.granted_write_paths),
    change_strategy: String(report.change_strategy || "none").trim(),
    change_id: String(report.change_id || "").trim(),
    handoff_target: String(report.handoff_target || "").trim(),
    required_actions: normalizeStateCollection(report.required_actions, "required_actions", { workItemSlug: report.work_item_slug, changeId: report.change_id }),
    blockers: normalizeStateCollection(report.blockers, "blockers", { workItemSlug: report.work_item_slug, changeId: report.change_id }),
    refs: normalizeArray(report.refs),
    audit_events: normalizeArray(report.audit_events),
    review_required:
      typeof report.review_required === "boolean" ? report.review_required : approvalDefaults.review_required,
    approval_status: String(report.approval_status || approvalDefaults.approval_status).trim(),
    reviewed_by: String(report.reviewed_by || approvalDefaults.reviewed_by).trim(),
    reviewed_at: String(report.reviewed_at || approvalDefaults.reviewed_at).trim(),
    review_notes: normalizeArray(report.review_notes || approvalDefaults.review_notes),
    bootstrap_gate_status: String(report.bootstrap_gate_status || "NOT_REQUIRED").trim(),
    bootstrap_gate_ref: String(report.bootstrap_gate_ref || "").trim(),
    bootstrap_reviewed_by: String(report.bootstrap_reviewed_by || "").trim(),
    bootstrap_reviewed_at: String(report.bootstrap_reviewed_at || "").trim(),
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

  if (Object.hasOwn(report, "resolved_state_history")) {
    if (!Array.isArray(report.resolved_state_history)) {
      throw new Error("resolved_state_history must be an array.");
    }
    normalized.resolved_state_history = [...report.resolved_state_history];
  }

  if (!isAdaptiveProtocolReport(report)) {
    return normalized;
  }

  const activation =
    report.adaptive_activation && typeof report.adaptive_activation === "object" && !Array.isArray(report.adaptive_activation)
      ? report.adaptive_activation
      : {};
  return {
    ...normalized,
    artifact_shape: "adaptive_v1",
    request_lane: String(report.request_lane || "").trim(),
    workflow_required: report.workflow_required === true,
    routing_reasons: normalizeArray(report.routing_reasons),
    escalation_reasons: normalizeArray(report.escalation_reasons),
    roles: normalizeReasonedEntries(report.roles, "role"),
    gates: normalizeReasonedEntries(report.gates, "gate"),
    human_override:
      report.human_override && typeof report.human_override === "object" && !Array.isArray(report.human_override)
        ? {
            actor: String(report.human_override.actor || "").trim(),
            reason: String(report.human_override.reason || "").trim(),
            at: String(report.human_override.at || "").trim()
          }
        : null,
    adaptive_activation: {
      source_version: String(activation.source_version || "").trim(),
      installed_versions: normalizeArray(activation.installed_versions),
      parity_passed: activation.parity_passed === true
    }
  };
}

function buildBootstrapReport({ projectRoot, workflowRootBase, workItemSlug, workflowRoot, s01Path }) {
  const frontmatterLines = getFrontmatterLines(s01Path);
  if (!frontmatterLines) {
    throw new Error(`Missing frontmatter in ${s01Path}`);
  }

  const workItemType = getFrontmatterValue(frontmatterLines, "work_item_type") || "FEATURE";
  const deliveryContext = getFrontmatterValue(frontmatterLines, "delivery_context") || "brownfield";
  const changeId = getFrontmatterValue(frontmatterLines, "change_id") || "";
  const workflowRootRef = workflowRoot || getWorkItemPaths({ projectRoot, workflowRootBase, workItemSlug }).workflowRoot;
  const approvalDefaults = getDefaultApprovalState("coordinator");

  return normalizeProtocolReport({
    materialization_status: "READY",
    protocol_status: "MATERIALIZED",
    decision_owner: "coordinator",
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
    delivery_context: deliveryContext,
    workflow_root: workflowRootRef,
    current_step: "s01",
    change_strategy: changeId ? "reuse_existing" : "none",
    change_id: changeId,
    handoff_target: "author-s01",
    required_actions: ["Review and continue workflow backbone s01 -> s08."],
    blockers: [],
    refs: [path.relative(projectRoot, workflowRootRef)],
    audit_events: ["REPORT_BOOTSTRAPPED"],
    bootstrap_gate_status: deliveryContext === "greenfield" ? "PENDING_REVIEW" : "NOT_REQUIRED",
    bootstrap_gate_ref: "",
    bootstrap_reviewed_by: "",
    bootstrap_reviewed_at: "",
    ...approvalDefaults,
    protocol_events: [
      buildProtocolEvent({
        action: "bootstrap",
        actor: "system",
        fromStatus: "READY_TO_MATERIALIZE",
        toStatus: "MATERIALIZED",
        note: "Bootstrapped read-only report from existing scaffold."
      })
    ]
  });
}

function loadProtocolReport({ projectRoot, workflowRootBase, workItemSlug, allowBootstrap = false }) {
  const paths = getWorkItemPaths({ projectRoot, workflowRootBase, workItemSlug });

  if (fs.existsSync(paths.reportPath)) {
    const rawBytes = fs.readFileSync(paths.reportPath);
    const rawReport = JSON.parse(rawBytes.toString("utf8"));
    return {
      report: normalizeProtocolReport(rawReport),
      rawReport,
      rawBytes,
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

function getDispositionTargets(rawReport, snapshotBytes) {
  if (!rawReport || typeof rawReport !== "object" || Array.isArray(rawReport)) {
    throw new Error("Disposition targets require a raw report object.");
  }
  if (!Buffer.isBuffer(snapshotBytes)) {
    throw new Error("Disposition targets require exact report snapshot bytes.");
  }
  const snapshotHash = createHash("sha256").update(snapshotBytes).digest("hex");
  return STATE_COLLECTIONS.flatMap((collection) => {
    const entries = rawReport[collection] === undefined ? [] : rawReport[collection];
    const errors = getStateCollectionErrors(entries, collection);
    if (errors.length > 0) throw new Error(errors.join("\n"));
    return entries.map((entry, index) => ({
      state_id: "di:" + createHash("sha256")
        .update(JSON.stringify([snapshotHash, collection, index]))
        .digest("hex"),
      collection,
      kind: typeof entry === "string" ? "legacy" : entry.kind,
      text: typeof entry === "string" ? entry : entry.text
    }));
  });
}

function selectDispositionTarget({ rawReport, rawBytes, stateId }) {
  if (typeof stateId !== "string" || !/^di:[0-9a-f]{64}$/.test(stateId)) {
    throw new Error("Disposition requires an exact state_id from the current report snapshot.");
  }
  const targets = getDispositionTargets(rawReport, rawBytes);
  const matches = targets.filter((entry) => entry.state_id === stateId);
  if (matches.length !== 1) throw new Error("Unknown, stale, or ambiguous state_id; refresh work-item status.");
  const target = matches[0];
  const index = targets.slice(0, targets.indexOf(target)).filter((entry) => entry.collection === target.collection).length;
  return { ...target, index, originalEntry: rawReport[target.collection][index] };
}

function atomicWriteRawProtocolReport({ report, reportPath, expectedBytes, failurePoint = "" }) {
  if (!Buffer.isBuffer(expectedBytes)) throw new Error("Atomic report replacement requires exact prior snapshot bytes.");
  // Validate state without serializing the normalized copy: untouched legacy
  // strings and objects must retain their original raw shapes and text.
  normalizeProtocolReport(report);
  const nextBytes = Buffer.from(`${JSON.stringify(report, null, 2)}\n`, "utf8");
  const stagedPath = `${reportPath}.disposition-${randomUUID()}.tmp`;
  const inject = (point) => {
    if (failurePoint === point) throw new Error(`Injected disposition failure at ${point}.`);
  };
  assertProtocolSnapshotUnchanged({ reportPath, rawBytes: expectedBytes });
  let fd = null;
  try {
    fd = fs.openSync(stagedPath, "wx", 0o600);
    fs.fchmodSync(fd, fs.statSync(reportPath).mode & 0o777);
    fs.writeFileSync(fd, nextBytes);
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fd = null;
    inject("after_stage");
    assertProtocolSnapshotUnchanged({ reportPath, rawBytes: expectedBytes });
    inject("before_report_rename");
    fs.renameSync(stagedPath, reportPath);
    inject("after_report_rename");
    return nextBytes;
  } finally {
    if (fd !== null) fs.closeSync(fd);
    if (fs.existsSync(stagedPath)) fs.unlinkSync(stagedPath);
  }
}

function renderProtocolBlock(reportInput) {
  const report = normalizeProtocolReport(reportInput);
  const lastEvent = report.protocol_events.length > 0 ? report.protocol_events[report.protocol_events.length - 1] : null;
  const adaptiveLines = isAdaptiveProtocolReport(report)
    ? [
        `artifact_shape: ${report.artifact_shape}`,
        `request_lane: ${report.request_lane}`,
        `workflow_required: ${report.workflow_required ? "true" : "false"}`,
        ...buildYamlList("routing_reasons", report.routing_reasons),
        ...buildYamlList("escalation_reasons", report.escalation_reasons),
        ...buildYamlList("role_applicability", report.roles.map((entry) => JSON.stringify(entry))),
        ...buildYamlList("gate_applicability", report.gates.map((entry) => JSON.stringify(entry)))
      ]
    : [];

  return [
    "## Work Item Protocol",
    "```yaml",
    `protocol_status: ${report.protocol_status}`,
    `approval_status: ${report.approval_status}`,
    `review_required: ${report.review_required ? "true" : "false"}`,
    ...adaptiveLines,
    `work_item_slug: ${quoteYamlString(report.work_item_slug)}`,
    `work_item_type: ${report.work_item_type}`,
    `delivery_context: ${report.delivery_context}`,
    `workflow_root: ${quoteYamlString(report.workflow_root)}`,
    `current_step: ${quoteYamlString(report.current_step)}`,
    ...buildYamlList("granted_write_paths", report.granted_write_paths),
    `materialization_status: ${report.materialization_status}`,
    `bootstrap_gate_status: ${report.bootstrap_gate_status}`,
    `bootstrap_gate_ref: ${quoteYamlString(report.bootstrap_gate_ref)}`,
    `bootstrap_reviewed_by: ${quoteYamlString(report.bootstrap_reviewed_by)}`,
    `bootstrap_reviewed_at: ${quoteYamlString(report.bootstrap_reviewed_at)}`,
    `change_strategy: ${report.change_strategy}`,
    `change_id: ${quoteYamlString(report.change_id)}`,
    `decision_owner: ${quoteYamlString(report.decision_owner)}`,
    `protocol_owner: ${quoteYamlString(report.protocol_owner)}`,
    `reviewed_by: ${quoteYamlString(report.reviewed_by)}`,
    `reviewed_at: ${quoteYamlString(report.reviewed_at)}`,
    `handoff_target: ${quoteYamlString(report.handoff_target)}`,
    `last_transition_action: ${quoteYamlString(lastEvent ? lastEvent.action : "")}`,
    `last_transition_at: ${quoteYamlString(lastEvent ? lastEvent.timestamp : "")}`,
    ...buildStateYamlList("required_actions", report.required_actions),
    ...buildStateYamlList("blockers", report.blockers),
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
  STATE_COLLECTIONS,
  STATE_GATE_KEYS,
  STATE_ENTRY_KINDS,
  GATE_SCOPED_STATE_KINDS,
  createStateEntry,
  getStateCollectionErrors,
  normalizeStateCollection,
  matchesStateEntry,
  buildStateYamlList,
  APPROVAL_GATE_PASSED,
  APPROVAL_STATUSES,
  BOOTSTRAP_GATE_PASSED,
  BOOTSTRAP_GATE_STATUSES,
  CONFIG_FILE_NAMES,
  DEFAULT_PROTOCOL_CONTROL,
  PROTOCOL_LEGACY_SCAFFOLD_POLICIES,
  PROTOCOL_STATUSES,
  PROTOCOL_TRANSITIONS,
  buildProtocolEvent,
  buildYamlList,
  getDefaultApprovalState,
  getWorkItemPaths,
  getProtocolReportLockPath,
  withProtocolReportLock,
  assertProtocolSnapshotUnchanged,
  getDispositionTargets,
  selectDispositionTarget,
  atomicWriteRawProtocolReport,
  hasProjectImplementationBaseline,
  inferDeliveryContext,
  isAllowedProtocolTransition,
  loadProtocolReport,
  loadProtocolControl,
  normalizeArray,
  normalizeProtocolReport,
  isAdaptiveProtocolReport,
  normalizeSingleValue,
  quoteYamlString,
  renderProtocolBlock,
  resolveWorkflowRootBase,
  syncProtocolArtifacts,
  upsertProtocolBlockInS01,
  writeProtocolReport
};
