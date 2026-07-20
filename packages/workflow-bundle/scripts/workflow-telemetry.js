const fs = require("fs");
const os = require("os");
const path = require("path");

// Telemetry tối thiểu (plan v5 §8, R3): thu thập metric cho preview/canary report
// chứng minh Light đạt budget (artifact/prompt/interaction/lead-time) và không làm
// yếu governance (validation error/warning, CR reconciliation mismatch).
//
// Out-of-band: report JSON được ghi ra NGOÀI work-items/ để KHÔNG thành workflow
// artifact — không phá budget AC-02/AC-03 và không chạm source-of-truth note.
// Mặc định ghi ra `$HOME/.workflow-telemetry/` (NGOÀI projectRoot) vì
// `syncCapabilityControl` chmod projectRoot read-only sau scaffold — ghi telemetry
// dưới projectRoot sẽ EACCES. Để pin dưới projectRoot, truyền `--telemetry-out`
// absolute HOẶC thêm path vào `alwaysWritablePaths` (capability control). Telemetry
// là opt-in (--telemetry / CF_TELEMETRY=on) để không ô nhiễm mỗi run.

const TELEMETRY_SCHEMA_VERSION = 1;
const DEFAULT_TELEMETRY_DIR = ".workflow-telemetry";
const TELEMETRY_ENV_DIR = process.env.CF_TELEMETRY_DIR || "";
const TELEMETRY_ENV_ON = String(process.env.CF_TELEMETRY || "").trim().toLowerCase() === "on";

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

// isTelemetryEnabled: arg tường minh (`--telemetry on|true`) hoặc env CF_TELEMETRY=on.
function isTelemetryEnabled(explicitFlag) {
  const value = String(explicitFlag == null ? "" : explicitFlag).trim().toLowerCase();
  if (value === "on" || value === "true" || value === "1") {
    return true;
  }
  return TELEMETRY_ENV_ON;
}

function resolveTelemetryOutputDir({ projectRoot, outputDirOverride }) {
  // Override/env tường minh: relative -> join projectRoot; absolute -> as-is.
  const base = outputDirOverride || TELEMETRY_ENV_DIR || "";
  if (base) {
    return path.isAbsolute(base) ? base : path.join(projectRoot, base);
  }
  // Default: user home (ngoài projectRoot) — tránh syncCapabilityControl chmod
  // read-only projectRoot gây EACCES khi ghi telemetry sau scaffold.
  return path.join(os.homedir(), DEFAULT_TELEMETRY_DIR);
}

function emptyState(workItemSlug) {
  return {
    schema_version: TELEMETRY_SCHEMA_VERSION,
    work_item_slug: workItemSlug || "",
    selected_profile: "",
    sdd_light_profile: "",
    escalation_reasons: [],
    artifact_count: null,
    generated_line_count: null,
    required_prompt_count: null,
    approval_interaction_count: null,
    validation: { errors: 0, warnings: 0, by_profile: {} },
    cr_reconciliation_mismatch: null,
    lead_time_ms: { ready: null, done: null },
    recorded_at: null
  };
}

// buildTelemetryReport (pure): serializer dùng bởi finalize, testable không fs.
function buildTelemetryReport(state) {
  return JSON.parse(JSON.stringify(state));
}

// summarizeValidationByProfile (pure): đếm errors/warnings (array hoặc count) và
// bucket theo profile. Trả shape khớp `validation` field của report.
function summarizeValidationByProfile(errors, warnings, profile) {
  const errorCount = Array.isArray(errors) ? errors.length : Number(errors) || 0;
  const warningCount = Array.isArray(warnings) ? warnings.length : Number(warnings) || 0;
  const byProfile = {};
  if (profile) {
    byProfile[String(profile)] = { errors: errorCount, warnings: warningCount };
  }
  return { errors: errorCount, warnings: warningCount, by_profile: byProfile };
}

// buildCrMismatchMetric (pure): từ reconcile result -> metric gọn cho telemetry.
function buildCrMismatchMetric(reconciled) {
  if (!reconciled) {
    return null;
  }
  return {
    cr_id: reconciled.cr_id || "",
    missing: Array.isArray(reconciled.missing_contributions) ? reconciled.missing_contributions.length : 0,
    unwaived_failures: Array.isArray(reconciled.unwaived_failures) ? reconciled.unwaived_failures.length : 0,
    incomplete: Array.isArray(reconciled.incomplete_work_items) ? reconciled.incomplete_work_items.length : 0,
    coverage_pass: Boolean(reconciled.coverage_pass)
  };
}

function createTelemetryRecorder({ projectRoot, workItemSlug = "", outputDirOverride } = {}) {
  const state = emptyState(workItemSlug);
  const resolvedOutputDirOverride = outputDirOverride;

  return {
    recordSelectedProfile({ selectedProfile, sddLightProfile, escalationReasons }) {
      state.selected_profile = String(selectedProfile || "");
      state.sdd_light_profile = String(sddLightProfile || "");
      state.escalation_reasons = Array.isArray(escalationReasons) ? [...escalationReasons] : [];
    },
    recordArtifactMetrics({ artifactCount, generatedLineCount, requiredPromptCount }) {
      if (artifactCount != null) state.artifact_count = artifactCount;
      if (generatedLineCount != null) state.generated_line_count = generatedLineCount;
      if (requiredPromptCount != null) state.required_prompt_count = requiredPromptCount;
    },
    recordApprovalInteraction({ count }) {
      state.approval_interaction_count = Number(count) || 0;
    },
    recordValidationSummary({ errors, warnings, profile }) {
      const summary = summarizeValidationByProfile(errors, warnings, profile);
      state.validation.errors = summary.errors;
      state.validation.warnings = summary.warnings;
      state.validation.by_profile = summary.by_profile;
    },
    recordCrReconciliationMismatch(metric) {
      state.cr_reconciliation_mismatch = metric;
    },
    recordLeadTime({ toReadyMs, toDoneMs }) {
      if (toReadyMs != null) state.lead_time_ms.ready = toReadyMs;
      if (toDoneMs != null) state.lead_time_ms.done = toDoneMs;
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
    finalize({ outputDirOverride: override, filename } = {}) {
      state.recorded_at = nowIso();
      const outDir = resolveTelemetryOutputDir({
        projectRoot,
        outputDirOverride: override || resolvedOutputDirOverride
      });
      ensureDirectory(outDir);
      const safeSlug = (workItemSlug || "telemetry").replace(/[^A-Za-z0-9_-]/g, "-");
      const name = filename || `${safeSlug}-${Date.now()}.json`;
      const reportPath = path.join(outDir, name);
      fs.writeFileSync(reportPath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
      return { reportPath, report: buildTelemetryReport(state) };
    }
  };
}

module.exports = {
  TELEMETRY_SCHEMA_VERSION,
  DEFAULT_TELEMETRY_DIR,
  buildCrMismatchMetric,
  buildTelemetryReport,
  createTelemetryRecorder,
  isTelemetryEnabled,
  resolveTelemetryOutputDir,
  summarizeValidationByProfile
};