#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

// Telemetry is deliberately local, opt-in and out-of-band. It is never a
// workflow artifact and this module has no network/export surface.
const TELEMETRY_SCHEMA_VERSION = 2;
const DEFAULT_TELEMETRY_DIR = ".workflow-telemetry";
const INSTALLATION_SALT_FILE = ".installation-salt";
const RAW_RETENTION_DAYS = 30;
const AGGREGATE_RETENTION_DAYS = 90;
const DAY_MS = 24 * 60 * 60 * 1000;

const REQUEST_LANES = new Set([
  "qa",
  "translation",
  "summarization",
  "research",
  "documentation",
  "read_only_analysis",
  "maintenance",
  "product_delivery"
]);
const SELECTED_PROFILES = new Set(["quick", "full", "enterprise", "strict", "sdd-light"]);
const SDD_LIGHT_PROFILES = new Set(["off", "preview", "default"]);
const DURATION_BUCKETS = new Set(["unknown", "lt_1h", "1h_to_1d", "1d_to_7d", "gte_7d"]);
const RETENTION_CLASSES = new Set(["raw", "aggregate"]);
const EVENT_TYPES = new Set([
  "materialize",
  "approval_bundle",
  "work_item_transition",
  "validation",
  "cr_reconciliation",
  "aggregate"
]);
const OUTCOMES = new Set([
  "proposed",
  "materialized",
  "not_applicable",
  "approved",
  "rejected",
  "active",
  "verified",
  "done",
  "blocked",
  "waiting_approval",
  "noop",
  "pass",
  "fail"
]);
const ROUTING_REASON_CODES = new Set([
  ...Array.from(REQUEST_LANES, (lane) => `LANE_${lane.toUpperCase()}`),
  "HUMAN_MATERIALIZATION_OVERRIDE"
]);
const ESCALATION_REASON_CODES = new Set([
  "HARD_PUBLIC_CONTRACT",
  "HARD_MIGRATION",
  "HARD_SECURITY_SENSITIVE",
  "HARD_REGULATED",
  "HARD_GREENFIELD_FOUNDATION",
  "HARD_RELEASE",
  "HARD_AMBIGUOUS_MIXED_INTENT",
  "HARD_UNKNOWN_REQUEST_LANE",
  "greenfield-or-foundation",
  "public-contract",
  "migration-or-cutover",
  "regulated-evidence",
  "multi-agent-delegation",
  "defect-or-spec-impact-unclassified",
  "high-blast-radius",
  "complex-release-gate",
  "governance-profile-not-default",
  "delivery-context-not-brownfield",
  "planning-track-not-quick",
  "execution-mode-not-agentic",
  "interaction-mode-not-self",
  "risk-not-low-or-medium",
  "compact-cr-exceeds-eligibility",
  "light-profile-disabled"
]);

const TELEMETRY_ALLOWED_FIELDS = Object.freeze([
  "schema_version",
  "event_type",
  "runtime_version",
  "request_lane",
  "selected_profile",
  "sdd_light_profile",
  "routing_reasons",
  "escalation_reasons",
  "role_count",
  "gate_count",
  "artifact_count",
  "interaction_count",
  "override_count",
  "retry_count",
  "validation_error_count",
  "validation_warning_count",
  "cr_missing_count",
  "cr_unwaived_failure_count",
  "cr_incomplete_count",
  "cr_coverage_pass",
  "ready_duration_bucket",
  "done_duration_bucket",
  "outcome",
  "work_item_id",
  "retention_class",
  "recorded_at"
]);

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

function isTelemetryEnabled(explicitFlag) {
  if (explicitFlag !== undefined && explicitFlag !== null && explicitFlag !== "") {
    const value = String(explicitFlag).trim().toLowerCase();
    return value === "on" || value === "true" || value === "1";
  }
  return String(process.env.CF_TELEMETRY || "").trim().toLowerCase() === "on";
}

function resolveTelemetryOutputDir({ projectRoot = process.cwd(), outputDirOverride } = {}) {
  const base = outputDirOverride || process.env.CF_TELEMETRY_DIR || "";
  if (base) {
    return path.isAbsolute(base) ? path.resolve(base) : path.resolve(projectRoot, base);
  }
  return path.join(os.homedir(), DEFAULT_TELEMETRY_DIR);
}

function normalizeCount(value) {
  const count = Number(value);
  if (!Number.isFinite(count) || count < 0) {
    return null;
  }
  return Math.min(Math.floor(count), Number.MAX_SAFE_INTEGER);
}

function normalizeTimestamp(value) {
  if (typeof value !== "string" || value.length > 40) {
    return null;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function normalizeRuntimeVersion(value) {
  const normalized = String(value || "").trim();
  return /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(normalized) ? normalized : null;
}

function normalizeEnum(value, allowed) {
  const normalized = String(value || "").trim();
  return allowed.has(normalized) ? normalized : null;
}

function normalizeReasonCodes(values, allowed) {
  if (!Array.isArray(values)) {
    return [];
  }
  return [...new Set(values.map((value) => String(value || "").trim()).filter((value) => allowed.has(value)))];
}

function pseudonymizeWorkItem(workItemSlug, installationSalt) {
  const slug = String(workItemSlug || "").trim();
  if (!slug) {
    return null;
  }
  const salt = String(installationSalt || "");
  if (!salt) {
    throw new Error("installation_salt is required to pseudonymize work_item_slug");
  }
  return `wi_${crypto.createHmac("sha256", salt).update(slug, "utf8").digest("hex").slice(0, 24)}`;
}

function bucketDurationMs(value) {
  if (value === null || value === undefined || value === "") {
    return "unknown";
  }
  const duration = Number(value);
  if (!Number.isFinite(duration) || duration < 0) {
    return "unknown";
  }
  if (duration < 60 * 60 * 1000) {
    return "lt_1h";
  }
  if (duration < DAY_MS) {
    return "1h_to_1d";
  }
  if (duration < 7 * DAY_MS) {
    return "1d_to_7d";
  }
  return "gte_7d";
}

function assignEnum(output, input, field, allowed) {
  const normalized = normalizeEnum(input[field], allowed);
  if (normalized !== null) {
    output[field] = normalized;
  }
}

function assignCount(output, input, field) {
  const normalized = normalizeCount(input[field]);
  if (normalized !== null) {
    output[field] = normalized;
  }
}

// Absolute allowlist mapper. It constructs a new object and never copies an
// unknown field, nested object, free-form note, path, credential or receipt.
function sanitizeAdaptiveTelemetryEvent(input = {}, { installation_salt: installationSalt } = {}) {
  const output = { schema_version: TELEMETRY_SCHEMA_VERSION };
  assignEnum(output, input, "event_type", EVENT_TYPES);
  const runtimeVersion = normalizeRuntimeVersion(input.runtime_version);
  if (runtimeVersion !== null) output.runtime_version = runtimeVersion;
  assignEnum(output, input, "request_lane", REQUEST_LANES);
  assignEnum(output, input, "selected_profile", SELECTED_PROFILES);
  assignEnum(output, input, "sdd_light_profile", SDD_LIGHT_PROFILES);

  output.routing_reasons = normalizeReasonCodes(input.routing_reasons, ROUTING_REASON_CODES);
  output.escalation_reasons = normalizeReasonCodes(input.escalation_reasons, ESCALATION_REASON_CODES);

  [
    "role_count",
    "gate_count",
    "artifact_count",
    "interaction_count",
    "override_count",
    "retry_count",
    "validation_error_count",
    "validation_warning_count",
    "cr_missing_count",
    "cr_unwaived_failure_count",
    "cr_incomplete_count"
  ].forEach((field) => assignCount(output, input, field));

  if (typeof input.cr_coverage_pass === "boolean") {
    output.cr_coverage_pass = input.cr_coverage_pass;
  }
  assignEnum(output, input, "ready_duration_bucket", DURATION_BUCKETS);
  assignEnum(output, input, "done_duration_bucket", DURATION_BUCKETS);
  assignEnum(output, input, "outcome", OUTCOMES);
  assignEnum(output, input, "retention_class", RETENTION_CLASSES);

  const workItemId = pseudonymizeWorkItem(input.work_item_slug, installationSalt);
  if (workItemId) {
    output.work_item_id = workItemId;
  } else if (/^wi_[a-f0-9]{24}$/.test(String(input.work_item_id || ""))) {
    output.work_item_id = input.work_item_id;
  }

  output.retention_class = output.retention_class || "raw";
  output.recorded_at = normalizeTimestamp(input.recorded_at) || nowIso();
  return output;
}

function buildTelemetryReport(state, options) {
  return sanitizeAdaptiveTelemetryEvent(state, options);
}

function summarizeValidationByProfile(errors, warnings) {
  return {
    errors: Array.isArray(errors) ? errors.length : normalizeCount(errors) || 0,
    warnings: Array.isArray(warnings) ? warnings.length : normalizeCount(warnings) || 0
  };
}

function buildCrMismatchMetric(reconciled) {
  if (!reconciled) {
    return null;
  }
  return {
    missing: Array.isArray(reconciled.missing_contributions)
      ? reconciled.missing_contributions.length
      : normalizeCount(reconciled.missing) || 0,
    unwaived_failures: Array.isArray(reconciled.unwaived_failures)
      ? reconciled.unwaived_failures.length
      : normalizeCount(reconciled.unwaived_failures) || 0,
    incomplete: Array.isArray(reconciled.incomplete_work_items)
      ? reconciled.incomplete_work_items.length
      : normalizeCount(reconciled.incomplete) || 0,
    coverage_pass: Boolean(reconciled.coverage_pass)
  };
}

function resolveInstallationSalt(outputDir, providedSalt) {
  if (providedSalt) {
    return String(providedSalt);
  }
  ensureDirectory(outputDir);
  const saltPath = path.join(outputDir, INSTALLATION_SALT_FILE);
  if (fs.existsSync(saltPath)) {
    const existing = fs.readFileSync(saltPath, "utf8").trim();
    if (!/^[a-f0-9]{64}$/.test(existing)) {
      throw new Error(`Invalid telemetry installation salt at '${saltPath}'.`);
    }
    return existing;
  }
  const generated = crypto.randomBytes(32).toString("hex");
  fs.writeFileSync(saltPath, `${generated}\n`, { encoding: "utf8", flag: "wx", mode: 0o600 });
  return generated;
}

function safeEventFilename(filename, eventType) {
  if (filename) {
    const leaf = path.basename(String(filename)).replace(/[^A-Za-z0-9_.-]/g, "-");
    return leaf.endsWith(".json") ? leaf : `${leaf}.json`;
  }
  const event = EVENT_TYPES.has(eventType) ? eventType : "event";
  return `${event}-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.json`;
}

function emitAdaptiveTelemetryEvent({
  enabled,
  projectRoot,
  outputDirOverride,
  installationSalt,
  event,
  filename
} = {}) {
  if (!isTelemetryEnabled(enabled)) {
    return { written: false, reportPath: "", report: null };
  }
  const outputDir = resolveTelemetryOutputDir({ projectRoot, outputDirOverride });
  ensureDirectory(outputDir);
  const salt = resolveInstallationSalt(outputDir, installationSalt);
  const report = sanitizeAdaptiveTelemetryEvent(event, { installation_salt: salt });
  const reportPath = path.join(outputDir, safeEventFilename(filename, report.event_type));
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
  return { written: true, reportPath, report };
}

function createTelemetryRecorder({
  projectRoot,
  workItemSlug = "",
  outputDirOverride,
  installationSalt,
  enabled = true
} = {}) {
  const state = {
    event_type: "materialize",
    retention_class: "raw",
    routing_reasons: [],
    escalation_reasons: []
  };

  return {
    recordSelectedProfile({
      selectedProfile,
      sddLightProfile,
      requestLane,
      routingReasons,
      escalationReasons,
      roleCount,
      gateCount,
      runtimeVersion
    } = {}) {
      state.selected_profile = selectedProfile;
      state.sdd_light_profile = sddLightProfile;
      state.request_lane = requestLane;
      state.routing_reasons = Array.isArray(routingReasons) ? [...routingReasons] : [];
      state.escalation_reasons = Array.isArray(escalationReasons) ? [...escalationReasons] : [];
      state.role_count = roleCount;
      state.gate_count = gateCount;
      state.runtime_version = runtimeVersion;
    },
    recordArtifactMetrics({ artifactCount } = {}) {
      state.artifact_count = artifactCount;
    },
    recordApprovalInteraction({ count, retryCount, overrideCount } = {}) {
      state.interaction_count = count;
      state.retry_count = retryCount;
      state.override_count = overrideCount;
    },
    recordValidationSummary({ errors, warnings } = {}) {
      const summary = summarizeValidationByProfile(errors, warnings);
      state.validation_error_count = summary.errors;
      state.validation_warning_count = summary.warnings;
    },
    recordCrReconciliationMismatch(metric) {
      const summary = buildCrMismatchMetric(metric);
      if (!summary) return;
      state.cr_missing_count = summary.missing;
      state.cr_unwaived_failure_count = summary.unwaived_failures;
      state.cr_incomplete_count = summary.incomplete;
      state.cr_coverage_pass = summary.coverage_pass;
    },
    recordLeadTime({ toReadyMs, toDoneMs } = {}) {
      state.ready_duration_bucket = bucketDurationMs(toReadyMs);
      state.done_duration_bucket = bucketDurationMs(toDoneMs);
    },
    getState() {
      return { ...state, routing_reasons: [...state.routing_reasons], escalation_reasons: [...state.escalation_reasons] };
    },
    finalize({ outputDirOverride: override, filename, outcome } = {}) {
      if (outcome) state.outcome = outcome;
      return emitAdaptiveTelemetryEvent({
        enabled,
        projectRoot,
        outputDirOverride: override || outputDirOverride,
        installationSalt,
        event: { ...state, work_item_slug: workItemSlug },
        filename
      });
    }
  };
}

function getTelemetryOwnershipError(event) {
  if (!event || typeof event !== "object" || Array.isArray(event)) {
    return "UNSUPPORTED_EVENT_SHAPE";
  }
  if (event.schema_version !== TELEMETRY_SCHEMA_VERSION) {
    return "UNSUPPORTED_SCHEMA_VERSION";
  }
  if (!EVENT_TYPES.has(event.event_type)) {
    return "UNSUPPORTED_EVENT_TYPE";
  }
  if (!RETENTION_CLASSES.has(event.retention_class)) {
    return "INVALID_RETENTION_CLASS";
  }
  if (Object.keys(event).some((field) => !TELEMETRY_ALLOWED_FIELDS.includes(field))) {
    return "NON_ALLOWLIST_FIELD";
  }
  return "";
}

function purgeExpiredTelemetry({ outputDir, projectRoot, outputDirOverride, now = new Date() } = {}) {
  const resolvedOutputDir = outputDir || resolveTelemetryOutputDir({ projectRoot, outputDirOverride });
  const result = { outputDir: resolvedOutputDir, scanned: 0, deleted: [], kept: [], invalid: [] };
  if (!fs.existsSync(resolvedOutputDir)) {
    return result;
  }
  const nowDate = now instanceof Date ? now : new Date(now);
  if (Number.isNaN(nowDate.getTime())) {
    throw new Error("Invalid telemetry purge timestamp.");
  }

  fs.readdirSync(resolvedOutputDir, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      return;
    }
    result.scanned += 1;
    const eventPath = path.join(resolvedOutputDir, entry.name);
    let event;
    try {
      event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
    } catch (error) {
      result.invalid.push({ file: entry.name, reason: "INVALID_JSON" });
      return;
    }
    const ownershipError = getTelemetryOwnershipError(event);
    if (ownershipError) {
      result.invalid.push({ file: entry.name, reason: ownershipError });
      return;
    }
    const recordedAt = new Date(event.recorded_at);
    const retentionDays = event.retention_class === "aggregate" ? AGGREGATE_RETENTION_DAYS : RAW_RETENTION_DAYS;
    if (Number.isNaN(recordedAt.getTime())) {
      result.invalid.push({ file: entry.name, reason: "INVALID_RECORDED_AT" });
      return;
    }
    if (nowDate.getTime() - recordedAt.getTime() > retentionDays * DAY_MS) {
      fs.rmSync(eventPath);
      result.deleted.push(entry.name);
      return;
    }
    result.kept.push(entry.name);
  });
  return result;
}

function parseCliArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));
  const action = args._[0] || "";
  if (action !== "purge") {
    console.error("Usage: workflow-telemetry.js purge [--telemetry-out <local-dir>] [--project-root <dir>]");
    process.exit(1);
  }
  const result = purgeExpiredTelemetry({
    projectRoot: path.resolve(args["project-root"] || process.cwd()),
    outputDirOverride: args["telemetry-out"] || ""
  });
  console.log(
    `OK: telemetry purge scanned=${result.scanned} deleted=${result.deleted.length} ` +
      `kept=${result.kept.length} invalid=${result.invalid.length}`
  );
}

if (require.main === module) {
  runCli();
}

module.exports = {
  AGGREGATE_RETENTION_DAYS,
  DEFAULT_TELEMETRY_DIR,
  INSTALLATION_SALT_FILE,
  RAW_RETENTION_DAYS,
  TELEMETRY_ALLOWED_FIELDS,
  TELEMETRY_SCHEMA_VERSION,
  bucketDurationMs,
  buildCrMismatchMetric,
  buildTelemetryReport,
  createTelemetryRecorder,
  emitAdaptiveTelemetryEvent,
  isTelemetryEnabled,
  purgeExpiredTelemetry,
  resolveTelemetryOutputDir,
  sanitizeAdaptiveTelemetryEvent,
  summarizeValidationByProfile
};
