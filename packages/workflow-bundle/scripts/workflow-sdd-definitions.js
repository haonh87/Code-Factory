const SDD_MODES = ["none", "light", "strict"];
const SPEC_STATUSES = [
  "draft",
  "reviewed",
  "approved",
  "frozen",
  "change_requested",
  "implemented",
  "verified",
  "accepted",
  "deprecated",
  "blocked"
];

const REQUIRED_SDD_BLOCKS_BY_STEP = {
  s04: ["## Spec Freeze", "## SDD Traceability"],
  s05: ["## SDD Traceability"],
  s06: ["## SDD Traceability"],
  s07: ["## SDD Traceability"],
  s08: ["## Spec Coverage", "## SDD Traceability"]
};

// --- SDD Light profile contract (plan v5 §1, §8) ---
// Light là representation profile, không phải SDD mode mới. Eligibility router
// quyết định work item nào được chạy Light; hard escalation không bị override
// bằng explicit preset thường (BR-02).
const SDD_LIGHT_PROFILE = "sdd-light";

// Rollout flag sdd_light_profile (plan v5 §8): off|preview|default. Điều khiển
// router DEFAULT (preset auto). off = rollback -> auto giải full (không light),
// không rewrite artifact đã tạo. preview/default = auto->light khi eligible
// (default là preview trong R1/R2; default maturity sau canary). Explicit preset
// light vẫn đi qua eligibility (BR-02 hard guards) — off chỉ đổi default, không
// chặn human override tường minh.
const SDD_LIGHT_PROFILE_ROLLOUT = ["off", "preview", "default"];
const DEFAULT_SDD_LIGHT_PROFILE = "preview";

function resolveSddLightProfile(value) {
  const normalized = String(value == null ? "" : value).trim().toLowerCase();
  if (!normalized) {
    return DEFAULT_SDD_LIGHT_PROFILE;
  }
  if (!SDD_LIGHT_PROFILE_ROLLOUT.includes(normalized)) {
    throw new Error(`Invalid sdd_light_profile '${value}'. Allowed values: ${SDD_LIGHT_PROFILE_ROLLOUT.join(", ")}`);
  }
  return normalized;
}

// Schema versions cho compatibility/rollback (plan §8). Tách rời để Light và CR
// có thể cutover độc lập.
const SDD_LIGHT_SCHEMA_VERSION = "2026-07-light-1";
const CR_SCHEMA_VERSION = "2026-07-cr-1";
// workflow_schema_version (plan v5 §8 / AC-14): contract version cho workflow
// chain + Light profile schema, phát vào bundle manifest và sync sang installed
// copy. Trong revision này Light là workflow contract change, nên alias cùng giá
// trị với SDD_LIGHT_SCHEMA_VERSION; khóa quan hệ bằng test để không drift.
const WORKFLOW_SCHEMA_VERSION = SDD_LIGHT_SCHEMA_VERSION;

// Budget là acceptance gate, không chỉ số tham khảo (plan "Baseline Và Mục Tiêu
// Định Lượng"). baselineWorkflowNotes = 8 là số liệu scaffold full hiện tại;
// initialArtifact/finalArtifact là target Light theo profile.
const SDD_LIGHT_BUDGET = {
  baselineWorkflowNotes: 8,
  baselineInitialArtifacts: 10,
  initialArtifact: { noCr: 4, withCompactCr: 5 },
  finalArtifact: { noCr: 6, withCompactCr: 7 },
  initialWorkflowLines: 450,
  finalWorkflowLines: 600,
  requiredPromptsBeforeImplementation: 20,
  approvalInteractions: { noCr: 3, withCr: 4 },
  initialArtifactReductionTargetPercent: 60
};

// Mỗi hard trigger có reason slug testable để fixture positive/negative route.
const SDD_LIGHT_ESCALATION_REASONS = {
  GREENFIELD_OR_FOUNDATION: "greenfield-or-foundation",
  PUBLIC_CONTRACT: "public-contract",
  MIGRATION_OR_CUTOVER: "migration-or-cutover",
  REGULATED_EVIDENCE: "regulated-evidence",
  MULTI_AGENT_DELEGATION: "multi-agent-delegation",
  DEFECT_OR_SPEC_IMPACT_UNCLASSIFIED: "defect-or-spec-impact-unclassified",
  HIGH_BLAST_RADIUS: "high-blast-radius",
  COMPLEX_RELEASE_GATE: "complex-release-gate",
  GOVERNANCE_PROFILE_NOT_DEFAULT: "governance-profile-not-default",
  DELIVERY_CONTEXT_NOT_BROWNFIELD: "delivery-context-not-brownfield",
  PLANNING_TRACK_NOT_QUICK: "planning-track-not-quick",
  EXECUTION_MODE_NOT_AGENTIC: "execution-mode-not-agentic",
  INTERACTION_MODE_NOT_SELF: "interaction-mode-not-self",
  RISK_NOT_LOW_OR_MEDIUM: "risk-not-low-or-medium",
  COMPACT_CR_EXCEEDS_ELIGIBILITY: "compact-cr-exceeds-eligibility",
  // R2: rollback flag chặn auto->light (không phải eligibility failure, là quyết
  // định rollout) — vẫn ghi vào reasons để observable.
  LIGHT_PROFILE_DISABLED: "light-profile-disabled"
};

// Eligibility required conditions (plan §1): ALL phải đúng để chọn Light.
function checkEligibilityConditions(input) {
  const reasons = [];
  if (input.deliveryContext !== "brownfield") {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.DELIVERY_CONTEXT_NOT_BROWNFIELD, detail: "delivery_context must be brownfield" });
  }
  if (input.planningTrack !== "quick") {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.PLANNING_TRACK_NOT_QUICK, detail: "planning_track must be quick" });
  }
  if (input.governanceProfile !== "default") {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.GOVERNANCE_PROFILE_NOT_DEFAULT, detail: "governance_profile must be default" });
  }
  if (input.executionMode !== "agentic") {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.EXECUTION_MODE_NOT_AGENTIC, detail: "execution_mode must be agentic" });
  }
  if (input.interactionMode !== "self") {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.INTERACTION_MODE_NOT_SELF, detail: "interaction_mode must be self" });
  }
  if (input.riskLevel !== "low" && input.riskLevel !== "medium") {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.RISK_NOT_LOW_OR_MEDIUM, detail: "risk must be low or medium" });
  }
  return reasons;
}

// Hard escalation triggers (plan §1): ANY trigger buộc escalate full/strict.
function checkHardEscalationTriggers(input) {
  const reasons = [];
  if (input.deliveryContext === "greenfield" || input.foundationRequired === true) {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.GREENFIELD_OR_FOUNDATION, detail: "greenfield or foundation decision" });
  }
  if (input.hasPublicContract === true) {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.PUBLIC_CONTRACT, detail: "public API/event/data contract" });
  }
  if (input.hasMigration === true) {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.MIGRATION_OR_CUTOVER, detail: "database migration/backfill/cutover" });
  }
  if (input.hasRegulatedEvidence === true) {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.REGULATED_EVIDENCE, detail: "regulated or security-sensitive evidence" });
  }
  if (input.requiresMultiAgent === true) {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.MULTI_AGENT_DELEGATION, detail: "required multi-agent delegation" });
  }
  if (input.defectSource === "UNKNOWN" || input.specImpactClassified === false) {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.DEFECT_OR_SPEC_IMPACT_UNCLASSIFIED, detail: "defect_source UNKNOWN or spec impact unclassified" });
  }
  if (input.blastRadiusHigh === true) {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.HIGH_BLAST_RADIUS, detail: "high blast radius or multi-system" });
  }
  if (input.requiresComplexRelease === true) {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.COMPLEX_RELEASE_GATE, detail: "complex UAT/release gate" });
  }
  if (input.compactCrExceedsEligibility === true) {
    reasons.push({ reason: SDD_LIGHT_ESCALATION_REASONS.COMPACT_CR_EXCEEDS_ELIGIBILITY, detail: "compact CR exceeds requirement-only delta eligibility" });
  }
  return reasons;
}

// evaluateLightEligibility trả về { eligible, selected_profile, escalation_reasons[] }.
// Explicit preset là preference; hard escalation không bị override (BR-02).
function evaluateLightEligibility(input = {}) {
  const conditionFailures = checkEligibilityConditions(input);
  const hardTriggers = checkHardEscalationTriggers(input);

  const allReasons = [...conditionFailures.map((c) => c.reason), ...hardTriggers.map((c) => c.reason)];
  const dedupedReasons = Array.from(new Set(allReasons));

  const eligible = dedupedReasons.length === 0;
  let selectedProfile;
  if (eligible) {
    selectedProfile = SDD_LIGHT_PROFILE;
  } else if (input.governanceProfile === "strict" || input.governanceProfile === "regulated") {
    selectedProfile = "strict";
  } else {
    selectedProfile = "full";
  }

  return {
    eligible,
    selected_profile: selectedProfile,
    escalation_reasons: dedupedReasons
  };
}

module.exports = {
  REQUIRED_SDD_BLOCKS_BY_STEP,
  SDD_MODES,
  SPEC_STATUSES,
  SDD_LIGHT_PROFILE,
  SDD_LIGHT_PROFILE_ROLLOUT,
  DEFAULT_SDD_LIGHT_PROFILE,
  resolveSddLightProfile,
  SDD_LIGHT_SCHEMA_VERSION,
  WORKFLOW_SCHEMA_VERSION,
  CR_SCHEMA_VERSION,
  SDD_LIGHT_BUDGET,
  SDD_LIGHT_ESCALATION_REASONS,
  evaluateLightEligibility
};
