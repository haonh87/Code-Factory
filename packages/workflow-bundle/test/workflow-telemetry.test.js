const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  AGGREGATE_RETENTION_DAYS,
  RAW_RETENTION_DAYS,
  TELEMETRY_ALLOWED_FIELDS,
  TELEMETRY_SCHEMA_VERSION,
  bucketDurationMs,
  buildCrMismatchMetric,
  createTelemetryRecorder,
  emitAdaptiveTelemetryEvent,
  purgeExpiredTelemetry,
  resolveTelemetryOutputDir,
  sanitizeAdaptiveTelemetryEvent,
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

function writeJson(target, value) {
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function testSanitizerUsesAbsoluteAllowlistAndPseudonym() {
  const canary = "T7_SECRET_CANARY_DO_NOT_PERSIST";
  const input = {
    schema_version: 999,
    event_type: "materialize",
    runtime_version: "2.6.1",
    request_lane: "maintenance",
    selected_profile: "sdd-light",
    sdd_light_profile: "preview",
    routing_reasons: ["LANE_MAINTENANCE", canary],
    escalation_reasons: ["public-contract", canary],
    role_count: 2,
    gate_count: 1,
    artifact_count: 4,
    interaction_count: 1,
    override_count: 0,
    retry_count: 0,
    ready_duration_bucket: "lt_1h",
    done_duration_bucket: "1d_to_7d",
    outcome: "active",
    retention_class: "raw",
    recorded_at: "2026-08-31T10:00:00.000Z",
    work_item_slug: `customer-${canary}`,
    raw_request: canary,
    absolute_path: `/private/${canary}`,
    username: canary,
    passphrase: canary,
    signature: canary,
    receipt_body: canary,
    review_note: canary,
    nested: { canary }
  };
  const first = sanitizeAdaptiveTelemetryEvent(input, {
    installation_salt: "installation-a"
  });
  const repeat = sanitizeAdaptiveTelemetryEvent(input, {
    installation_salt: "installation-a"
  });
  const anotherInstall = sanitizeAdaptiveTelemetryEvent(input, {
    installation_salt: "installation-b"
  });
  const serialized = JSON.stringify(first);

  assert(first.schema_version === TELEMETRY_SCHEMA_VERSION, "sanitizer owns schema version");
  assert(typeof first.work_item_id === "string" && /^wi_[a-f0-9]{24}$/.test(first.work_item_id), "slug becomes a bounded pseudonym");
  assert(first.work_item_id === repeat.work_item_id, "same install salt produces stable pseudonym");
  assert(first.work_item_id !== anotherInstall.work_item_id, "different install salt prevents cross-install correlation");
  assert(!serialized.includes(canary), "secret canary is absent from sanitized event");
  assert(first.routing_reasons.length === 1 && first.routing_reasons[0] === "LANE_MAINTENANCE", "unknown/free-form routing reason is dropped");
  assert(first.escalation_reasons.length === 1 && first.escalation_reasons[0] === "public-contract", "unknown/free-form escalation reason is dropped");
  Object.keys(first).forEach((field) => {
    assert(TELEMETRY_ALLOWED_FIELDS.includes(field), `sanitized field '${field}' must be allowlisted`);
  });
  [
    "work_item_slug",
    "raw_request",
    "absolute_path",
    "username",
    "passphrase",
    "signature",
    "receipt_body",
    "review_note",
    "nested"
  ].forEach((field) => assert(!(field in first), `prohibited field '${field}' omitted`));
  console.log("  PASS: sanitizer applies absolute allowlist + per-install pseudonym + canary rejection");
}

function testDurationBuckets() {
  assert(bucketDurationMs(null) === "unknown", "missing duration is unknown");
  assert(bucketDurationMs(-1) === "unknown", "negative duration is unknown");
  assert(bucketDurationMs(59 * 60 * 1000) === "lt_1h", "duration below one hour bucketed");
  assert(bucketDurationMs(60 * 60 * 1000) === "1h_to_1d", "one hour boundary bucketed");
  assert(bucketDurationMs(24 * 60 * 60 * 1000) === "1d_to_7d", "one day boundary bucketed");
  assert(bucketDurationMs(7 * 24 * 60 * 60 * 1000) === "gte_7d", "seven day boundary bucketed");
  console.log("  PASS: lead time is bucketed instead of persisted as a raw duration");
}

function testDisabledEmitterIsCompleteNoOp() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "telemetry-disabled-project-"));
  const outputDir = path.join(projectRoot, "must-not-exist");
  try {
    const result = emitAdaptiveTelemetryEvent({
      enabled: false,
      projectRoot,
      outputDirOverride: outputDir,
      event: { event_type: "materialize", work_item_slug: "secret-slug" }
    });
    assert(result.written === false, "disabled emitter reports no write");
    assert(result.reportPath === "", "disabled emitter returns no report path");
    assert(!fs.existsSync(outputDir), "disabled emitter creates no directory, salt, or event file");
    console.log("  PASS: telemetry disabled mode is a complete filesystem no-op");
  } finally {
    rmrf(projectRoot);
  }
}

function testRecorderWritesOnlyAllowlistedLocalData() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "telemetry-project-"));
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "telemetry-out-"));
  const canary = "RECORDER_SECRET_CANARY";
  try {
    const recorder = createTelemetryRecorder({
      projectRoot,
      workItemSlug: `customer-${canary}`,
      outputDirOverride: outputDir,
      installationSalt: "recorder-test-installation"
    });
    recorder.recordSelectedProfile({
      selectedProfile: "sdd-light",
      sddLightProfile: "preview",
      requestLane: "maintenance",
      routingReasons: ["LANE_MAINTENANCE"],
      escalationReasons: [],
      roleCount: 2,
      gateCount: 1
    });
    recorder.recordArtifactMetrics({ artifactCount: 4, generatedLineCount: 120, requiredPromptCount: 8 });
    recorder.recordApprovalInteraction({ count: 3, retryCount: 1, overrideCount: 0 });
    recorder.recordValidationSummary({ errors: 1, warnings: 2, profile: "sdd-light" });
    recorder.recordCrReconciliationMismatch({
      cr_id: canary,
      missing: 2,
      unwaived_failures: 0,
      incomplete: 1,
      coverage_pass: false
    });
    recorder.recordLeadTime({ toReadyMs: 1500, toDoneMs: 2 * 24 * 60 * 60 * 1000 });
    const { reportPath, report } = recorder.finalize({ filename: "materialize-event.json" });
    const serialized = fs.readFileSync(reportPath, "utf8");

    assert(fs.existsSync(reportPath), "recorder writes event locally");
    assert(reportPath.startsWith(outputDir), "explicit local output directory honored");
    assert(!reportPath.includes(path.join("work-items")), "telemetry remains outside workflow artifacts");
    assert(!serialized.includes(canary), "recorder output contains no slug or CR-id canary");
    assert(!("generated_line_count" in report), "non-contract generated line metric is dropped");
    assert(!("required_prompt_count" in report), "non-contract prompt metric is dropped");
    assert(!("lead_time_ms" in report), "raw lead time is never persisted");
    assert(!("validation" in report), "nested validation object is never persisted");
    assert(!("cr_reconciliation_mismatch" in report), "nested CR object is never persisted");
    assert(report.ready_duration_bucket === "lt_1h", "ready lead time stored as bucket");
    assert(report.done_duration_bucket === "1d_to_7d", "done lead time stored as bucket");
    assert(report.validation_error_count === 1 && report.validation_warning_count === 2, "validation counts retained without messages");
    assert(report.cr_missing_count === 2 && report.cr_incomplete_count === 1, "CR counts retained without CR identity");
    assert(report.interaction_count === 3 && report.retry_count === 1, "interaction and retry counts retained");
    assert(Object.keys(report).every((field) => TELEMETRY_ALLOWED_FIELDS.includes(field)), "recorder output remains allowlist-only");
    console.log("  PASS: recorder writes only privacy-bounded, local, allowlisted metrics");
  } finally {
    rmrf(projectRoot);
    rmrf(outputDir);
  }
}

function testPurgeAppliesThirtyAndNinetyDayRetention() {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "telemetry-purge-"));
  const now = new Date("2026-08-31T12:00:00.000Z");
  try {
    writeJson(path.join(outputDir, "raw-expired.json"), {
      schema_version: TELEMETRY_SCHEMA_VERSION,
      event_type: "materialize",
      retention_class: "raw",
      recorded_at: "2026-07-31T11:59:59.000Z"
    });
    writeJson(path.join(outputDir, "raw-kept.json"), {
      schema_version: TELEMETRY_SCHEMA_VERSION,
      event_type: "approval_bundle",
      retention_class: "raw",
      recorded_at: "2026-08-02T12:00:00.000Z"
    });
    writeJson(path.join(outputDir, "aggregate-expired.json"), {
      schema_version: TELEMETRY_SCHEMA_VERSION,
      event_type: "aggregate",
      retention_class: "aggregate",
      recorded_at: "2026-05-31T11:59:59.000Z"
    });
    writeJson(path.join(outputDir, "aggregate-kept.json"), {
      schema_version: TELEMETRY_SCHEMA_VERSION,
      event_type: "aggregate",
      retention_class: "aggregate",
      recorded_at: "2026-06-03T12:00:00.000Z"
    });
    writeJson(path.join(outputDir, "foreign-expired.json"), {
      application: "not-workflow-telemetry",
      retention_class: "raw",
      recorded_at: "2026-01-01T00:00:00.000Z"
    });
    fs.writeFileSync(path.join(outputDir, "invalid.json"), "not-json\n", "utf8");
    fs.writeFileSync(path.join(outputDir, ".installation-salt"), "local-salt\n", { encoding: "utf8", mode: 0o600 });

    const result = purgeExpiredTelemetry({ outputDir, now });
    assert(RAW_RETENTION_DAYS === 30 && AGGREGATE_RETENTION_DAYS === 90, "retention contract is 30/90 days");
    assert(!fs.existsSync(path.join(outputDir, "raw-expired.json")), "raw event older than 30 days purged");
    assert(fs.existsSync(path.join(outputDir, "raw-kept.json")), "raw event within 30 days retained");
    assert(!fs.existsSync(path.join(outputDir, "aggregate-expired.json")), "aggregate older than 90 days purged");
    assert(fs.existsSync(path.join(outputDir, "aggregate-kept.json")), "aggregate within 90 days retained");
    assert(fs.existsSync(path.join(outputDir, "foreign-expired.json")), "foreign JSON is never deleted by telemetry purge");
    assert(fs.existsSync(path.join(outputDir, "invalid.json")), "unparseable file retained for safe inspection");
    assert(fs.existsSync(path.join(outputDir, ".installation-salt")), "installation salt is not treated as an event");
    assert(result.deleted.length === 2, `purge reports two deletions, got ${result.deleted.length}`);
    assert(result.invalid.length === 2, `purge reports invalid or foreign events without deleting them, got ${result.invalid.length}`);
    console.log("  PASS: purge enforces raw<=30d and aggregate<=90d without unsafe deletion");
  } finally {
    rmrf(outputDir);
  }
}

function testPureCountHelpersDoNotReturnIdentifiers() {
  const summary = summarizeValidationByProfile(["secret error"], ["secret warning"], "sdd-light");
  assert(summary.errors === 1 && summary.warnings === 1, "validation helper returns counts");
  assert(!("by_profile" in summary), "validation helper does not build a dynamic-key object");

  const metric = buildCrMismatchMetric({
    cr_id: "CR-SECRET",
    missing_contributions: ["wi-a"],
    unwaived_failures: [{ work_item_slug: "wi-b" }],
    incomplete_work_items: ["wi-c"],
    coverage_pass: false
  });
  assert(!("cr_id" in metric), "CR helper drops CR identity");
  assert(metric.missing === 1 && metric.unwaived_failures === 1 && metric.incomplete === 1, "CR helper keeps aggregate counts");
  console.log("  PASS: helper outputs contain counts, not messages or identifiers");
}

function testDefaultOutputDirOutsideProjectRoot() {
  const projectRoot = "/tmp/some-project";
  const resolved = resolveTelemetryOutputDir({ projectRoot });
  assert(path.isAbsolute(resolved), "default telemetry dir is absolute");
  assert(!resolved.startsWith(projectRoot), "default telemetry dir stays outside protected project root");
  assert(resolved.includes(".workflow-telemetry"), "default telemetry directory is recognizable");
  const relative = resolveTelemetryOutputDir({ projectRoot, outputDirOverride: "telemetry-out" });
  assert(relative.startsWith(projectRoot), "explicit relative override resolves under project root");
  console.log("  PASS: telemetry output remains local and out-of-band by default");
}

console.log("Running workflow-telemetry tests...\n");
testSanitizerUsesAbsoluteAllowlistAndPseudonym();
testDurationBuckets();
testDisabledEmitterIsCompleteNoOp();
testRecorderWritesOnlyAllowlistedLocalData();
testPurgeAppliesThirtyAndNinetyDayRetention();
testPureCountHelpersDoNotReturnIdentifiers();
testDefaultOutputDirOutsideProjectRoot();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-telemetry.test.js`);
  process.exit(1);
}
console.log("\nOK: workflow-telemetry.test.js passed");
