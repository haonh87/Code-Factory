const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  TELEMETRY_SCHEMA_VERSION,
  buildCrMismatchMetric,
  buildTelemetryReport,
  createTelemetryRecorder,
  resolveTelemetryOutputDir,
  summarizeValidationByProfile
} = require("../scripts/workflow-telemetry");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function rmrf(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

// ---------- R3: pure builders ----------

function testBuildTelemetryReportShape() {
  const state = {
    schema_version: TELEMETRY_SCHEMA_VERSION,
    work_item_slug: "add-export-button",
    selected_profile: "sdd-light",
    sdd_light_profile: "preview",
    escalation_reasons: ["greenfield-or-foundation"],
    artifact_count: 4,
    generated_line_count: null,
    required_prompt_count: null,
    approval_interaction_count: null,
    validation: { errors: 0, warnings: 0, by_profile: {} },
    cr_reconciliation_mismatch: null,
    lead_time_ms: { ready: null, done: null },
    recorded_at: null
  };
  const report = buildTelemetryReport(state);
  assert(report.schema_version === TELEMETRY_SCHEMA_VERSION, "report carries telemetry schema version");
  assert(report.selected_profile === "sdd-light", "report carries selected_profile");
  assert(Array.isArray(report.escalation_reasons), "escalation_reasons is array");
  assert(report.work_item_slug === "add-export-button", "work_item_slug preserved");
  console.log("  PASS: buildTelemetryReport produces full-schema report");
}

function testSummarizeValidationByProfile() {
  const summary = summarizeValidationByProfile(
    ["err1", "err2"],
    ["warn1"],
    "sdd-light"
  );
  assert(summary.errors === 2, `errors counted, got ${summary.errors}`);
  assert(summary.warnings === 1, `warnings counted, got ${summary.warnings}`);
  assert(summary.by_profile["sdd-light"].errors === 2, "by_profile buckets errors");
  assert(summary.by_profile["sdd-light"].warnings === 1, "by_profile buckets warnings");
  // Accepts counts too (not just arrays).
  const fromCounts = summarizeValidationByProfile(3, 0, "full");
  assert(fromCounts.errors === 3 && fromCounts.by_profile.full.errors === 3, "accepts numeric counts");
  console.log("  PASS: summarizeValidationByProfile counts + buckets by profile");
}

function testBuildCrMismatchMetric() {
  const reconciled = {
    cr_id: "CR-001",
    missing_contributions: ["wi-a"],
    unwaived_failures: [{ work_item_slug: "wi-b", coverage_status: "FAIL" }],
    incomplete_work_items: ["wi-c"],
    coverage_pass: false
  };
  const metric = buildCrMismatchMetric(reconciled);
  assert(metric.cr_id === "CR-001", "metric carries cr_id");
  assert(metric.missing === 1, `missing count, got ${metric.missing}`);
  assert(metric.unwaived_failures === 1, `unwaived failures count, got ${metric.unwaived_failures}`);
  assert(metric.incomplete === 1, `incomplete count, got ${metric.incomplete}`);
  assert(metric.coverage_pass === false, "coverage_pass propagated");
  console.log("  PASS: buildCrMismatchMetric extracts mismatch counts from reconcile result");
}

// ---------- R3: recorder writes out-of-band JSON (not under work-items/) ----------

function testRecorderWritesOutOfBandJson() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "telemetry-"));
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "telemetry-out-"));
  try {
    const recorder = createTelemetryRecorder({ projectRoot, workItemSlug: "add-export-button", outputDirOverride: outDir });
    recorder.recordSelectedProfile({
      selectedProfile: "sdd-light",
      sddLightProfile: "preview",
      escalationReasons: []
    });
    recorder.recordArtifactMetrics({ artifactCount: 4, generatedLineCount: 120, requiredPromptCount: 8 });
    const { reportPath, report } = recorder.finalize({ filename: "add-export-button-test.json" });
    assert(fs.existsSync(reportPath), `telemetry report written, got ${reportPath}`);
    // Out-of-band: KHÔNG nằm dưới work-items/.
    assert(!reportPath.includes(path.join("work-items", "add-export-button")), "telemetry must NOT be written under work-items/ (budget-safe)");
    assert(reportPath.startsWith(outDir), "telemetry written to explicit out-of-band dir");
    assert(report.selected_profile === "sdd-light", "written report carries selected_profile");
    assert(report.artifact_count === 4, "written report carries artifact_count");
    assert(report.generated_line_count === 120, "written report carries generated_line_count");
    assert(report.required_prompt_count === 8, "written report carries required_prompt_count");
    assert(typeof report.recorded_at === "string" && report.recorded_at.length > 0, "recorded_at timestamp set");
    console.log("  PASS: recorder writes out-of-band JSON with full metrics");
  } finally {
    rmrf(projectRoot);
    rmrf(outDir);
  }
}

function testDefaultOutputDirOutsideProjectRoot() {
  // Default dir phải NẰM NGOÀI projectRoot (syncCapabilityControl chmod
  // projectRoot read-only -> ghi dưới đó sẽ EACCES). Resolution-only check, không ghi.
  const projectRoot = "/tmp/some-project";
  const resolved = resolveTelemetryOutputDir({ projectRoot });
  assert(path.isAbsolute(resolved), "default telemetry dir is absolute");
  assert(!resolved.startsWith(projectRoot), "default telemetry dir must NOT be under projectRoot (avoids capability-control lock)");
  assert(resolved.includes(".workflow-telemetry"), "default dir leaf is .workflow-telemetry");
  // Explicit relative override -> under projectRoot (caller's choice).
  const rel = resolveTelemetryOutputDir({ projectRoot, outputDirOverride: "telemetry-out" });
  assert(rel.startsWith(projectRoot), "relative override resolves under projectRoot");
  console.log("  PASS: default telemetry dir resolves outside projectRoot");
}

function testRecorderCustomOutputDir() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "telemetry-"));
  try {
    const recorder = createTelemetryRecorder({ projectRoot, workItemSlug: "wi", outputDirOverride: ".workflow-telemetry" });
    const { reportPath } = recorder.finalize({ filename: "custom.json" });
    assert(reportPath.includes(".workflow-telemetry"), "custom output dir honored");
    assert(fs.existsSync(reportPath), "custom dir report written");
    console.log("  PASS: recorder honors custom output dir override");
  } finally {
    rmrf(projectRoot);
  }
}

function testRecorderCrMismatchAndValidation() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "telemetry-"));
  try {
    const recorder = createTelemetryRecorder({ projectRoot, workItemSlug: "wi" });
    recorder.recordCrReconciliationMismatch({
      cr_id: "CR-002",
      missing: 2,
      unwaived_failures: 0,
      incomplete: 1,
      coverage_pass: false
    });
    recorder.recordValidationSummary({ errors: 1, warnings: 2, profile: "full" });
    recorder.recordApprovalInteraction({ count: 3 });
    recorder.recordLeadTime({ toReadyMs: 1500, toDoneMs: null });
    const { report } = recorder.finalize({ filename: "mix.json" });
    assert(report.cr_reconciliation_mismatch && report.cr_reconciliation_mismatch.cr_id === "CR-002", "cr mismatch recorded");
    assert(report.cr_reconciliation_mismatch.missing === 2, "cr mismatch missing count");
    assert(report.validation.errors === 1 && report.validation.warnings === 2, "validation summary recorded");
    assert(report.validation.by_profile.full.errors === 1, "validation by_profile recorded");
    assert(report.approval_interaction_count === 3, "approval interaction count recorded");
    assert(report.lead_time_ms.ready === 1500, "lead time ready recorded");
    console.log("  PASS: recorder captures CR mismatch + validation + approval + lead-time");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running workflow-telemetry tests...\n");
testBuildTelemetryReportShape();
testSummarizeValidationByProfile();
testBuildCrMismatchMetric();
testRecorderWritesOutOfBandJson();
testDefaultOutputDirOutsideProjectRoot();
testRecorderCustomOutputDir();
testRecorderCrMismatchAndValidation();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-telemetry.test.js`);
  process.exit(1);
}
console.log("\nOK: workflow-telemetry.test.js passed");