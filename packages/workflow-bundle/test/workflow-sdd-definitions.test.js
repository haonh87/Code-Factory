const {
  SDD_MODES,
  SPEC_STATUSES,
  SDD_LIGHT_PROFILE,
  SDD_LIGHT_SCHEMA_VERSION,
  CR_SCHEMA_VERSION,
  SDD_LIGHT_BUDGET,
  SDD_LIGHT_PROFILE_ROLLOUT,
  DEFAULT_SDD_LIGHT_PROFILE,
  resolveSddLightProfile,
  evaluateLightEligibility
} = require("../scripts/workflow-sdd-definitions");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`FAIL: ${message}`);
  }
}

const eligibleBaselineInput = {
  deliveryContext: "brownfield",
  planningTrack: "quick",
  governanceProfile: "default",
  executionMode: "agentic",
  interactionMode: "self",
  riskLevel: "medium",
  foundationRequired: false,
  hasPublicContract: false,
  hasMigration: false,
  hasRegulatedEvidence: false,
  requiresMultiAgent: false,
  defectSource: "IMPLEMENTATION",
  specImpactClassified: true,
  blastRadiusHigh: false,
  requiresComplexRelease: false,
  compactCrExceedsEligibility: false
};

const escalationCases = [
  { name: "escalate-greenfield", override: { deliveryContext: "greenfield" }, reason: "greenfield-or-foundation" },
  { name: "escalate-foundation-required", override: { foundationRequired: true }, reason: "greenfield-or-foundation" },
  { name: "escalate-public-contract", override: { hasPublicContract: true }, reason: "public-contract" },
  { name: "escalate-migration", override: { hasMigration: true }, reason: "migration-or-cutover" },
  { name: "escalate-regulated-evidence", override: { hasRegulatedEvidence: true }, reason: "regulated-evidence" },
  { name: "escalate-multi-agent", override: { requiresMultiAgent: true }, reason: "multi-agent-delegation" },
  { name: "escalate-defect-unknown", override: { defectSource: "UNKNOWN" }, reason: "defect-or-spec-impact-unclassified" },
  { name: "escalate-spec-impact-unclassified", override: { specImpactClassified: false }, reason: "defect-or-spec-impact-unclassified" },
  { name: "escalate-blast-radius", override: { blastRadiusHigh: true }, reason: "high-blast-radius" },
  { name: "escalate-complex-release", override: { requiresComplexRelease: true }, reason: "complex-release-gate" },
  { name: "escalate-governance-strict", override: { governanceProfile: "strict" }, reason: "governance-profile-not-default" },
  { name: "escalate-planning-track-full", override: { planningTrack: "full" }, reason: "planning-track-not-quick" },
  // deliveryContext không hợp lệ (không phải greenfield để tránh fire hard trigger
  // greenfield-or-foundation) phải có slug RIÊNG, không mượn planning-track-not-quick.
  { name: "escalate-delivery-context-unset", override: { deliveryContext: undefined }, reason: "delivery-context-not-brownfield" },
  { name: "escalate-delivery-context-other", override: { deliveryContext: "hybrid" }, reason: "delivery-context-not-brownfield" },
  { name: "escalate-execution-not-agentic", override: { executionMode: "multi_agent" }, reason: "execution-mode-not-agentic" },
  { name: "escalate-interaction-not-self", override: { interactionMode: "coordinated" }, reason: "interaction-mode-not-self" },
  { name: "escalate-high-risk", override: { riskLevel: "high" }, reason: "risk-not-low-or-medium" },
  { name: "escalate-compact-cr-exceeds", override: { compactCrExceedsEligibility: true }, reason: "compact-cr-exceeds-eligibility" }
];

function testEligibilityBaseline() {
  const result = evaluateLightEligibility(eligibleBaselineInput);
  assert(result.eligible === true, "eligible-baseline: expected eligible=true");
  assert(result.selected_profile === SDD_LIGHT_PROFILE, `eligible-baseline: expected selected_profile='${SDD_LIGHT_PROFILE}'`);
  assert(Array.isArray(result.escalation_reasons) && result.escalation_reasons.length === 0, "eligible-baseline: expected no escalation_reasons");
}

function testEscalationCases() {
  escalationCases.forEach((esc) => {
    const result = evaluateLightEligibility({ ...eligibleBaselineInput, ...esc.override });
    assert(result.eligible === false, `${esc.name}: expected eligible=false`);
    assert(
      result.selected_profile === "full" || result.selected_profile === "strict",
      `${esc.name}: expected selected_profile full|strict, got '${result.selected_profile}'`
    );
    assert(
      Array.isArray(result.escalation_reasons) && result.escalation_reasons.includes(esc.reason),
      `${esc.name}: expected escalation_reasons to include '${esc.reason}', got ${JSON.stringify(result.escalation_reasons)}`
    );
  });
}

function testPresetCannotOverrideHardGuard() {
  const forced = evaluateLightEligibility({
    ...eligibleBaselineInput,
    deliveryContext: "greenfield",
    preset: "sdd-light"
  });
  assert(forced.eligible === false, "preset-override: explicit preset must not bypass hard guard");
  assert(
    forced.escalation_reasons.includes("greenfield-or-foundation"),
    "preset-override: expected greenfield escalation reason even with preset"
  );
}

// Dedup không được nuốt reason khác nhau: fail cả delivery-context lẫn
// planning-track phải báo ĐỦ 2 slug riêng biệt.
function testCombinedConditionFailuresReportDistinctReasons() {
  const result = evaluateLightEligibility({
    ...eligibleBaselineInput,
    deliveryContext: "hybrid",
    planningTrack: "full"
  });
  assert(result.eligible === false, "combined-conditions: expected eligible=false");
  assert(
    result.escalation_reasons.includes("delivery-context-not-brownfield"),
    `combined-conditions: expected delivery-context-not-brownfield, got ${JSON.stringify(result.escalation_reasons)}`
  );
  assert(
    result.escalation_reasons.includes("planning-track-not-quick"),
    `combined-conditions: expected planning-track-not-quick, got ${JSON.stringify(result.escalation_reasons)}`
  );
}

function testSchemaVersions() {
  assert(typeof SDD_LIGHT_SCHEMA_VERSION === "string" && SDD_LIGHT_SCHEMA_VERSION.length > 0, "SDD_LIGHT_SCHEMA_VERSION must be a non-empty string");
  assert(typeof CR_SCHEMA_VERSION === "string" && CR_SCHEMA_VERSION.length > 0, "CR_SCHEMA_VERSION must be a non-empty string");
  assert(SDD_LIGHT_SCHEMA_VERSION !== CR_SCHEMA_VERSION, "schema versions should be distinct");
}

// Budget contract test kiểm INVARIANT giữa các trường (không lặp lại literal —
// literal đã được enforce bởi golden smoke case light-golden-budget chạy trên
// artifact thật). Ở đây chỉ khóa quan hệ nội tại và ceiling từ plan v5.
function testBudgetContract() {
  const b = SDD_LIGHT_BUDGET;
  const positiveInts = [
    b.baselineWorkflowNotes,
    b.initialArtifact.noCr,
    b.initialArtifact.withCompactCr,
    b.finalArtifact.noCr,
    b.finalArtifact.withCompactCr,
    b.initialWorkflowLines,
    b.finalWorkflowLines,
    b.requiredPromptsBeforeImplementation,
    b.approvalInteractions.noCr,
    b.approvalInteractions.withCr
  ];
  assert(
    positiveInts.every((v) => Number.isInteger(v) && v > 0),
    "all budget fields must be positive integers"
  );
  assert(
    Number.isInteger(b.baselineInitialArtifacts) && b.baselineInitialArtifacts > 0,
    "baselineInitialArtifacts must be a positive integer (plan v5 baseline: >=10 artifacts no-CR)"
  );
  assert(b.initialArtifact.noCr < b.baselineWorkflowNotes, "Light initial artifacts must undercut full-scaffold baseline");
  assert(b.initialArtifact.withCompactCr === b.initialArtifact.noCr + 1, "compact CR adds exactly one initial artifact");
  assert(b.finalArtifact.withCompactCr === b.finalArtifact.noCr + 1, "compact CR adds exactly one final artifact");
  assert(b.initialArtifact.noCr <= b.finalArtifact.noCr, "final artifact budget must not shrink below initial");
  assert(b.initialWorkflowLines < b.finalWorkflowLines, "line budget must grow from initial to final");
  assert(b.initialWorkflowLines <= 450, "plan v5 AC-03: initial line budget ceiling is 450");
  assert(b.finalWorkflowLines <= 600, "plan v5 AC-03: final line budget ceiling is 600");
  assert(b.requiredPromptsBeforeImplementation <= 20, "plan v5 AC-03: required prompts ceiling is 20");
  assert(b.approvalInteractions.noCr < b.approvalInteractions.withCr, "CR path must add approval interactions");
  // Plan v5 baseline table: artifact không CR tối thiểu 10 -> 4 ban đầu (= 60%).
  const reduction = 1 - b.initialArtifact.noCr / b.baselineInitialArtifacts;
  assert(
    reduction * 100 >= b.initialArtifactReductionTargetPercent,
    `initial artifact reduction ${Math.round(reduction * 100)}% must meet target ${b.initialArtifactReductionTargetPercent}%`
  );
}

function testBackwardCompatibleExports() {
  assert(Array.isArray(SDD_MODES) && SDD_MODES.includes("light"), "SDD_MODES must still include light");
  assert(Array.isArray(SPEC_STATUSES) && SPEC_STATUSES.includes("frozen"), "SPEC_STATUSES must still include frozen");
}

// ---------- R2: sdd_light_profile rollout flag resolver (plan v5 §8) ----------
function testSddLightProfileResolver() {
  assert(Array.isArray(SDD_LIGHT_PROFILE_ROLLOUT), "SDD_LIGHT_PROFILE_ROLLOUT must be an array");
  assert(SDD_LIGHT_PROFILE_ROLLOUT.includes("off") && SDD_LIGHT_PROFILE_ROLLOUT.includes("preview") && SDD_LIGHT_PROFILE_ROLLOUT.includes("default"), "SDD_LIGHT_PROFILE_ROLLOUT = [off,preview,default]");
  assert(DEFAULT_SDD_LIGHT_PROFILE === "preview", "default rollout flag is preview (preserve current auto->light)");
  assert(resolveSddLightProfile(undefined) === "preview", "absent -> default preview");
  assert(resolveSddLightProfile("") === "preview", "empty -> default preview");
  assert(resolveSddLightProfile("OFF") === "off", "resolver lowercases");
  assert(resolveSddLightProfile("default") === "default", "default accepted");
  let threw = false;
  try { resolveSddLightProfile("bogus"); } catch (_e) { threw = true; }
  assert(threw, "invalid sdd_light_profile must throw");
}

testEligibilityBaseline();
testEscalationCases();
testCombinedConditionFailuresReportDistinctReasons();
testPresetCannotOverrideHardGuard();
testSchemaVersions();
testBudgetContract();
testBackwardCompatibleExports();
testSddLightProfileResolver();

if (failures > 0) {
  console.error(`${failures} assertion(s) failed in workflow-sdd-definitions.test.js`);
  process.exit(1);
}
console.log("OK: workflow-sdd-definitions.test.js passed");