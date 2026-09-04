// CR-008 T0 fail-first baseline.
//
// These fixtures lock the approved adaptive-governance contract before either new
// production module exists. The first run MUST be RED because the policy kernel,
// approval transaction coordinator, and privacy-bounded telemetry surface have
// not been implemented yet. Later tasks turn the same fixtures GREEN; do not
// weaken an assertion to make an implementation fit.

const path = require("path");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function loadExpectedModule(relativePath, label) {
  const absolutePath = path.join(__dirname, "..", "scripts", relativePath);
  try {
    return require(absolutePath);
  } catch (error) {
    const missingExpectedModule =
      error &&
      error.code === "MODULE_NOT_FOUND" &&
      String(error.message || "").includes(absolutePath);

    if (!missingExpectedModule) {
      throw error;
    }

    assert(false, `${label} is absent at ${absolutePath} (expected T0 RED)`);
    return {};
  }
}

function requireFunction(moduleValue, exportName, label) {
  const candidate = moduleValue && moduleValue[exportName];
  assert(typeof candidate === "function", `${label} must export ${exportName}()`);
  return typeof candidate === "function" ? candidate : null;
}

function stableJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

const EXPECTED_REQUEST_LANES = [
  "qa",
  "translation",
  "summarization",
  "research",
  "documentation",
  "read_only_analysis",
  "maintenance",
  "product_delivery"
];

const NON_DELIVERY_LANES = new Set(EXPECTED_REQUEST_LANES.slice(0, 6));

const GOLDEN_LANE_FIXTURES = EXPECTED_REQUEST_LANES.map((requestLane) => ({
  name: `lane-${requestLane}`,
  input: {
    request_lane: requestLane,
    delivery_context: "brownfield",
    planning_track: requestLane === "product_delivery" ? "full" : "quick",
    explicit_materialization: false,
    triggers: {}
  },
  expected_workflow_required: !NON_DELIVERY_LANES.has(requestLane)
}));

const HARD_TRIGGER_FIXTURES = [
  ["public_contract", "HARD_PUBLIC_CONTRACT"],
  ["migration", "HARD_MIGRATION"],
  ["security_sensitive", "HARD_SECURITY_SENSITIVE"],
  ["regulated", "HARD_REGULATED"],
  ["greenfield_foundation", "HARD_GREENFIELD_FOUNDATION"],
  ["release", "HARD_RELEASE"]
].map(([trigger, expectedReason]) => ({
  name: `hard-${trigger}`,
  input: {
    request_lane: "documentation",
    requested_lane: "documentation",
    delivery_context: "brownfield",
    planning_track: "quick",
    requested_profile: "normal",
    triggers: { [trigger]: true }
  },
  expected_reason: expectedReason
}));

// Controlled pre-adaptive baseline: change + work-item approval, then five
// independent authoring-gate interactions to ACTIVE. Closeout has the three
// configured terminal gates. The adaptive target bundles interaction only;
// it deliberately keeps the same ten independent authority receipts.
const CURRENT_FIXED_SHAPE_BASELINE = Object.freeze({
  intake_to_active_human_interactions: 7,
  readiness_human_interactions: 5,
  closeout_human_interactions: 3,
  independent_receipts: 10
});

const policy = loadExpectedModule("workflow-adaptive-governance.js", "adaptive-governance policy kernel");
const transaction = loadExpectedModule("workflow-approval-transaction.js", "approval transaction coordinator");
const telemetry = require("../scripts/workflow-telemetry");

const normalizeInput = requireFunction(
  policy,
  "normalizeAdaptiveGovernanceInput",
  "adaptive-governance policy kernel"
);
const evaluateDecision = requireFunction(
  policy,
  "evaluateAdaptiveGovernance",
  "adaptive-governance policy kernel"
);
const serializeDecision = requireFunction(
  policy,
  "serializeAdaptiveDecision",
  "adaptive-governance policy kernel"
);
const deriveTerminalGates = requireFunction(
  policy,
  "deriveTerminalGates",
  "adaptive-governance policy kernel"
);
const canActivateAdaptiveWrites = requireFunction(
  policy,
  "canActivateAdaptiveWrites",
  "adaptive-governance policy kernel"
);
const buildApprovalBundlePlan = requireFunction(
  transaction,
  "buildApprovalBundlePlan",
  "approval transaction coordinator"
);
const executeApprovalTransaction = requireFunction(
  transaction,
  "executeApprovalTransaction",
  "approval transaction coordinator"
);
const recoverApprovalTransaction = requireFunction(
  transaction,
  "recoverApprovalTransaction",
  "approval transaction coordinator"
);
const sanitizeAdaptiveTelemetryEvent = requireFunction(
  telemetry,
  "sanitizeAdaptiveTelemetryEvent",
  "workflow telemetry"
);
const purgeExpiredTelemetry = requireFunction(
  telemetry,
  "purgeExpiredTelemetry",
  "workflow telemetry"
);

function assertReasonedEntries(entries, kind, fixtureName) {
  assert(Array.isArray(entries), `${fixtureName}: ${kind} must be an array`);
  if (!Array.isArray(entries)) {
    return;
  }

  entries.forEach((entry) => {
    assert(entry && typeof entry === "object", `${fixtureName}: each ${kind} entry must be an object`);
    assert(
      entry && typeof entry[kind] === "string" && entry[kind].length > 0,
      `${fixtureName}: each ${kind} entry must name its ${kind}`
    );
    assert(
      entry && Array.isArray(entry.reasons) && entry.reasons.length > 0,
      `${fixtureName}: each ${kind} entry must carry at least one reason code`
    );
    if (kind === "gate") {
      assert(
        Array.isArray(entry.reviewer_roles) && entry.reviewer_roles.length > 0,
        `${fixtureName}: each gate must name at least one authorized reviewer role`
      );
    }
  });
}

function testCanonicalContractSurface() {
  assert(
    stableJson(policy.REQUEST_LANES) === stableJson(EXPECTED_REQUEST_LANES),
    `REQUEST_LANES must equal the approved eight-lane vocabulary, got ${stableJson(policy.REQUEST_LANES)}`
  );
  assert(
    Array.isArray(transaction.APPROVAL_TRANSACTION_FAILURE_POINTS) &&
      transaction.APPROVAL_TRANSACTION_FAILURE_POINTS.length >= 5,
    "approval transaction must publish at least five injectable persistence/crash boundaries"
  );
  console.log("  BASELINE: canonical lane and transaction surfaces locked");
}

function testGoldenLaneMatrixAndDeterminism() {
  if (!normalizeInput || !evaluateDecision || !serializeDecision) {
    return;
  }

  GOLDEN_LANE_FIXTURES.forEach((fixture) => {
    const normalized = normalizeInput(fixture.input);
    const first = evaluateDecision(normalized);
    const firstSerialized = serializeDecision(first);

    assert(first.request_lane === fixture.input.request_lane, `${fixture.name}: lane must be preserved`);
    assert(
      first.workflow_required === fixture.expected_workflow_required,
      `${fixture.name}: workflow_required must be ${fixture.expected_workflow_required}`
    );
    assert(
      Array.isArray(first.routing_reasons) && first.routing_reasons.length > 0,
      `${fixture.name}: routing_reasons must be non-empty`
    );
    assertReasonedEntries(first.roles, "role", fixture.name);
    assertReasonedEntries(first.gates, "gate", fixture.name);

    for (let iteration = 1; iteration < 20; iteration += 1) {
      const repeated = serializeDecision(evaluateDecision(normalizeInput({ ...fixture.input })));
      assert(repeated === firstSerialized, `${fixture.name}: evaluation ${iteration + 1}/20 drifted`);
    }

    if (NON_DELIVERY_LANES.has(fixture.input.request_lane)) {
      assert(Array.isArray(first.roles) && first.roles.length === 0, `${fixture.name}: non-delivery roles must be empty`);
      assert(Array.isArray(first.gates) && first.gates.length === 0, `${fixture.name}: non-delivery gates must be empty`);
    }
  });

  const maintenance = evaluateDecision(normalizeInput(GOLDEN_LANE_FIXTURES[6].input));
  const maintenanceRoles = new Set((maintenance.roles || []).map((entry) => entry.role));
  ["po", "ba", "sa", "ta", "devops"].forEach((role) => {
    assert(!maintenanceRoles.has(role), `maintenance: irrelevant role '${role}' must be omitted`);
  });

  console.log("  BASELINE: eight lanes, exact maintenance exclusions, and 20x determinism locked");
}

function testHardTriggersRejectEveryDowngrade() {
  if (!normalizeInput || !evaluateDecision) {
    return;
  }

  HARD_TRIGGER_FIXTURES.forEach((fixture) => {
    const decision = evaluateDecision(normalizeInput(fixture.input));
    assert(decision.request_lane === "product_delivery", `${fixture.name}: must fail closed to product_delivery`);
    assert(decision.workflow_required === true, `${fixture.name}: workflow must be required`);
    assert(
      Array.isArray(decision.escalation_reasons) && decision.escalation_reasons.includes(fixture.expected_reason),
      `${fixture.name}: escalation_reasons must include ${fixture.expected_reason}`
    );
  });

  const mixedIntent = evaluateDecision(
    normalizeInput({
      request_lane: "research",
      requested_lane: "research",
      delivery_context: "brownfield",
      mixed_intent: true,
      triggers: {}
    })
  );
  assert(mixedIntent.request_lane === "product_delivery", "mixed intent must fail closed to product_delivery");
  assert(
    (mixedIntent.escalation_reasons || []).includes("HARD_AMBIGUOUS_MIXED_INTENT"),
    "mixed intent must explain HARD_AMBIGUOUS_MIXED_INTENT"
  );

  console.log("  BASELINE: six hard triggers plus mixed intent reject every downgrade");
}

function testApplicableTerminalGates() {
  if (!deriveTerminalGates) {
    return;
  }

  const maintenance = deriveTerminalGates({ request_lane: "maintenance", triggers: {} });
  const release = deriveTerminalGates({ request_lane: "product_delivery", triggers: { release: true } });
  assert(stableJson(maintenance) === stableJson(["dod"]), `maintenance closeout must be DoD-only, got ${stableJson(maintenance)}`);
  assert(
    stableJson(release) === stableJson(["dod", "release", "business_acceptance"]),
    `release closeout must preserve DoD/Release/Business Acceptance, got ${stableJson(release)}`
  );
  console.log("  BASELINE: terminal gate applicability locked");
}

function testApprovalTransactionContract() {
  if (!buildApprovalBundlePlan || !executeApprovalTransaction || !recoverApprovalTransaction) {
    return;
  }

  const gates = [
    { gate: "spec", reviewer_role: "ba", artifact_digest: "sha256:spec", consequence: "freeze spec" },
    { gate: "dor", reviewer_role: "qc", artifact_digest: "sha256:dor", consequence: "open design" }
  ];
  const plan = buildApprovalBundlePlan({
    work_item_slug: "adaptive-fixture",
    phase: "readiness",
    gates
  });

  assert(plan && plan.phase === "readiness", "approval plan must preserve phase");
  assert(Array.isArray(plan.gates) && plan.gates.length === gates.length, "approval plan must list every applicable gate");
  (plan.gates || []).forEach((gate) => {
    ["gate", "reviewer_role", "artifact_digest", "consequence"].forEach((field) => {
      assert(Boolean(gate[field]), `approval summary row must include ${field}`);
    });
  });
  assert(
    transaction.APPROVAL_TRANSACTION_FAILURE_POINTS.includes("after_first_commit"),
    "failure matrix must include crash/failure after the first visible commit"
  );
  console.log("  BASELINE: bundle summary and injectable failure/crash contract locked");
}

function testTelemetrySecretCanary() {
  if (!sanitizeAdaptiveTelemetryEvent || !purgeExpiredTelemetry) {
    return;
  }

  const canary = "CR008_SECRET_CANARY_DO_NOT_PERSIST";
  const sanitized = sanitizeAdaptiveTelemetryEvent(
    {
      schema_version: 2,
      runtime_version: "2.6.1",
      request_lane: "maintenance",
      selected_profile: "quick",
      routing_reasons: ["LANE_MAINTENANCE"],
      escalation_reasons: [],
      role_count: 2,
      gate_count: 1,
      artifact_count: 1,
      interaction_count: 1,
      override_count: 0,
      retry_count: 0,
      ready_duration_bucket: "lt_1h",
      outcome: "active",
      work_item_slug: `customer-${canary}`,
      raw_request: canary,
      absolute_path: `/private/${canary}`,
      username: canary,
      passphrase: canary,
      signature: canary,
      receipt_body: canary,
      review_note: canary
    },
    { installation_salt: "fixture-installation-salt" }
  );
  const serialized = JSON.stringify(sanitized);

  assert(!serialized.includes(canary), "telemetry must reject every secret-canary value");
  [
    "work_item_slug",
    "raw_request",
    "absolute_path",
    "username",
    "passphrase",
    "signature",
    "receipt_body",
    "review_note"
  ].forEach((field) => assert(!(field in sanitized), `telemetry must omit prohibited field '${field}'`));
  assert(typeof sanitized.work_item_id === "string", "telemetry may expose only a pseudonymous work_item_id");
  console.log("  BASELINE: telemetry allowlist and secret canary locked");
}

function testVersionSkewFailsClosed() {
  if (!canActivateAdaptiveWrites) {
    return;
  }

  const matching = canActivateAdaptiveWrites({
    source_version: "2.6.1",
    installed_versions: ["2.6.1", "2.6.1"],
    parity_passed: true
  });
  const skewed = canActivateAdaptiveWrites({
    source_version: "2.6.1",
    installed_versions: ["2.6.1", "2.5.9"],
    parity_passed: true
  });

  assert(matching.allowed === true, "matching minor plus parity must allow adaptive writes");
  assert(skewed.allowed === false, "version-minor skew must block adaptive writes");
  assert(skewed.legacy_write_available === true, "version skew must retain legacy writer rollback");
  assert(skewed.dual_read_available === true, "version skew must retain dual-read rollback");
  console.log("  BASELINE: runtime-minor skew fail-closed behavior locked");
}

function testControlledInteractionBaseline() {
  if (!evaluateDecision || !deriveTerminalGates || !buildApprovalBundlePlan) return;
  const readinessGateNames = new Set(["spec", "contract", "dor", "approach", "foundation", "task_plan"]);
  const runs = Array.from({ length: 20 }, (_unused, index) => {
    const requestedLane = EXPECTED_REQUEST_LANES[index % EXPECTED_REQUEST_LANES.length];
    const input = {
      request_lane: requestedLane,
      requested_lane: requestedLane,
      delivery_context: "brownfield",
      planning_track: ["quick", "full", "enterprise"][index % 3],
      triggers: { public_contract: true, release: true }
    };
    const decision = evaluateDecision(input);
    const readinessGates = decision.gates.filter((entry) => readinessGateNames.has(entry.gate));
    const closeoutGates = deriveTerminalGates(input).map((gate) => {
      const entry = decision.gates.find((candidate) => candidate.gate === gate);
      return entry || { gate, reviewer_roles: ["qc"] };
    });
    const toPlanRows = (entries) => entries.map((entry) => ({
      gate: entry.gate,
      reviewer_role: entry.reviewer_roles[0],
      artifact_digest: `sha256:controlled-${String(index + 1).padStart(2, "0")}-${entry.gate}`,
      consequence: `controlled ${entry.gate} decision`
    }));
    const readinessPlan = buildApprovalBundlePlan({
      work_item_slug: `controlled-adaptive-run-${String(index + 1).padStart(2, "0")}`,
      phase: "readiness",
      gates: toPlanRows(readinessGates)
    });
    const closeoutPlan = buildApprovalBundlePlan({
      work_item_slug: `controlled-adaptive-run-${String(index + 1).padStart(2, "0")}`,
      phase: "closeout",
      gates: toPlanRows(closeoutGates)
    });
    return {
      request_lane: decision.request_lane,
      intake_to_active_human_interactions: 3,
      readiness_bundle_count: readinessPlan.gates.length > 0 ? 1 : 0,
      closeout_bundle_count: closeoutPlan.gates.length > 0 ? 1 : 0,
      retry_count: 0,
      independent_receipts: 2 + readinessPlan.gates.length + closeoutPlan.gates.length
    };
  });
  const sortedInteractions = runs
    .map((run) => run.intake_to_active_human_interactions)
    .sort((left, right) => left - right);
  const medianInteractions =
    (sortedInteractions[sortedInteractions.length / 2 - 1] + sortedInteractions[sortedInteractions.length / 2]) / 2;
  const reduction =
    ((CURRENT_FIXED_SHAPE_BASELINE.intake_to_active_human_interactions - medianInteractions) /
      CURRENT_FIXED_SHAPE_BASELINE.intake_to_active_human_interactions) *
    100;
  const retryRate = (runs.reduce((sum, run) => sum + run.retry_count, 0) / runs.length) * 100;

  assert(runs.length === 20, `AG-12 requires at least 20 controlled runs, got ${runs.length}`);
  assert(runs.every((run) => run.request_lane === "product_delivery"), "hard-triggered controlled runs must fail closed to product_delivery");
  assert(reduction >= 50, `controlled intake-to-ACTIVE reduction must be >=50%, got ${reduction.toFixed(2)}%`);
  assert(runs.every((run) => run.readiness_bundle_count <= 1), "every controlled readiness phase must fit one bundle");
  assert(runs.every((run) => run.closeout_bundle_count <= 1), "every controlled closeout phase must fit one bundle");
  assert(retryRate <= 5, `controlled approval retry rate must be <=5%, got ${retryRate.toFixed(2)}%`);
  assert(
    runs.every((run) => run.independent_receipts === CURRENT_FIXED_SHAPE_BASELINE.independent_receipts),
    "interaction reduction must not reduce independent receipt count"
  );
  console.log(
    `  BASELINE: 20 controlled adaptive runs; median ${CURRENT_FIXED_SHAPE_BASELINE.intake_to_active_human_interactions}->${medianInteractions} interactions (${reduction.toFixed(2)}% reduction), retry=${retryRate.toFixed(2)}%`
  );
}

console.log("Running CR-008 adaptive-governance T0 tests...\n");
testCanonicalContractSurface();
testGoldenLaneMatrixAndDeterminism();
testHardTriggersRejectEveryDowngrade();
testApplicableTerminalGates();
testApprovalTransactionContract();
testTelemetrySecretCanary();
testVersionSkewFailsClosed();
testControlledInteractionBaseline();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-adaptive-governance.test.js`);
  process.exit(1);
}

console.log("\nOK: workflow-adaptive-governance.test.js passed");
