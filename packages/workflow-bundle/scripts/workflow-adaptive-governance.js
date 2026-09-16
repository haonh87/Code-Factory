const REQUEST_LANES = Object.freeze([
  "qa",
  "translation",
  "summarization",
  "research",
  "documentation",
  "read_only_analysis",
  "maintenance",
  "product_delivery"
]);

const NON_DELIVERY_LANES = new Set(REQUEST_LANES.slice(0, 6));

const HARD_TRIGGER_DEFINITIONS = Object.freeze([
  Object.freeze({ trigger: "public_contract", reason: "HARD_PUBLIC_CONTRACT" }),
  Object.freeze({ trigger: "migration", reason: "HARD_MIGRATION" }),
  Object.freeze({ trigger: "security_sensitive", reason: "HARD_SECURITY_SENSITIVE" }),
  Object.freeze({ trigger: "regulated", reason: "HARD_REGULATED" }),
  Object.freeze({ trigger: "greenfield_foundation", reason: "HARD_GREENFIELD_FOUNDATION" }),
  Object.freeze({ trigger: "release", reason: "HARD_RELEASE" })
]);

const LANE_REASON_CODES = Object.freeze(
  Object.fromEntries(REQUEST_LANES.map((lane) => [lane, `LANE_${lane.toUpperCase()}`]))
);

const ROLE_ORDER = Object.freeze(["po", "ba", "sa", "ta", "developer", "qc", "devops"]);
const GATE_ORDER = Object.freeze([
  "spec",
  "contract",
  "dor",
  "approach",
  "foundation",
  "task_plan",
  "uat",
  "dod",
  "release",
  "business_acceptance"
]);

function normalizeBoolean(value, fieldName = "boolean") {
  if (value === true || value === "true") {
    return true;
  }
  if (value === false || value === "false" || value == null || value === "") {
    return false;
  }
  throw new Error(`Invalid ${fieldName} '${value}'. Allowed values: true, false`);
}

function normalizeText(value) {
  return value == null ? "" : String(value).trim();
}

function normalizeOverride(input) {
  const nested = input && input.human_override && typeof input.human_override === "object"
    ? input.human_override
    : {};
  return {
    actor: normalizeText(nested.actor || input.override_actor),
    reason: normalizeText(nested.reason || input.override_reason),
    at: normalizeText(nested.at || input.override_at)
  };
}

function assertAuditedHumanOverride(humanOverride) {
  const missing = [];
  if (!humanOverride.actor) missing.push("override-actor");
  if (!humanOverride.reason) missing.push("override-reason");
  if (!humanOverride.at) missing.push("override-at");
  if (missing.length > 0) {
    throw new Error(
      `Non-delivery materialization requires an audited human override. Missing: ${missing.join(", ")}.`
    );
  }

  const parsed = new Date(humanOverride.at);
  const formatMatches = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(humanOverride.at);
  const canonicalInput = humanOverride.at.includes(".")
    ? humanOverride.at
    : humanOverride.at.replace(/Z$/, ".000Z");
  if (Number.isNaN(parsed.getTime()) || !formatMatches || parsed.toISOString() !== canonicalInput) {
    throw new Error("Invalid override-at. Use a UTC ISO-8601 timestamp such as 2026-08-29T04:03:55Z.");
  }
}

function normalizeAdaptiveGovernanceInput(input = {}) {
  const requestedLane = normalizeText(input.requested_lane || input.request_lane);
  const requestLane = REQUEST_LANES.includes(requestedLane) ? requestedLane : "product_delivery";
  const triggers = {};
  HARD_TRIGGER_DEFINITIONS.forEach(({ trigger }) => {
    triggers[trigger] = normalizeBoolean(
      input.triggers && input.triggers[trigger],
      `triggers.${trigger}`
    );
  });

  return {
    request_lane: requestLane,
    requested_lane: requestedLane || "product_delivery",
    delivery_context: normalizeText(input.delivery_context) || "brownfield",
    planning_track: normalizeText(input.planning_track) || "full",
    requested_profile: normalizeText(input.requested_profile),
    explicit_materialization: normalizeBoolean(input.explicit_materialization, "explicit_materialization"),
    mixed_intent: normalizeBoolean(input.mixed_intent, "mixed_intent"),
    triggers,
    human_override: normalizeOverride(input)
  };
}

function pushReasonedEntry(entries, key, value, reasons, reviewerRoles) {
  const existing = entries.find((entry) => entry[key] === value);
  if (existing) {
    existing.reasons = [...new Set([...existing.reasons, ...reasons])].sort();
    if (key === "gate") {
      existing.reviewer_roles = [...new Set([...existing.reviewer_roles, ...reviewerRoles])].sort();
    }
    return;
  }

  const entry = { [key]: value, reasons: [...new Set(reasons)].sort() };
  if (key === "gate") {
    entry.reviewer_roles = [...new Set(reviewerRoles)].sort();
  }
  entries.push(entry);
}

function deriveRoles(normalized, requestLane, workflowRequired) {
  if (!workflowRequired) {
    return [];
  }

  const roles = [];
  if (requestLane !== "product_delivery") {
    pushReasonedEntry(roles, "role", "developer", ["ROLE_DEVELOPER_BOUNDED_CHANGE"]);
    pushReasonedEntry(roles, "role", "qc", ["ROLE_QC_DOD_VERIFICATION"]);
    return roles;
  }

  pushReasonedEntry(roles, "role", "po", ["ROLE_PO_PRODUCT_OUTCOME"]);
  pushReasonedEntry(roles, "role", "ba", ["ROLE_BA_REQUIREMENTS"]);
  pushReasonedEntry(roles, "role", "developer", ["ROLE_DEVELOPER_DELIVERY"]);
  pushReasonedEntry(roles, "role", "qc", ["ROLE_QC_VERIFICATION"]);

  const systemArchitectureReasons = [];
  if (normalized.triggers.public_contract) systemArchitectureReasons.push("ROLE_SA_PUBLIC_CONTRACT_BOUNDARY");
  if (normalized.triggers.regulated) systemArchitectureReasons.push("ROLE_SA_REGULATED_BOUNDARY");
  if (normalized.triggers.greenfield_foundation) systemArchitectureReasons.push("ROLE_SA_FOUNDATION_BOUNDARY");
  if (systemArchitectureReasons.length > 0) {
    pushReasonedEntry(roles, "role", "sa", systemArchitectureReasons);
  }

  const technicalArchitectureReasons = [];
  if (normalized.triggers.public_contract) technicalArchitectureReasons.push("ROLE_TA_PUBLIC_CONTRACT_RISK");
  if (normalized.triggers.migration) technicalArchitectureReasons.push("ROLE_TA_MIGRATION_RISK");
  if (normalized.triggers.security_sensitive) technicalArchitectureReasons.push("ROLE_TA_SECURITY_RISK");
  if (normalized.triggers.regulated) technicalArchitectureReasons.push("ROLE_TA_REGULATED_RISK");
  if (normalized.triggers.greenfield_foundation) technicalArchitectureReasons.push("ROLE_TA_FOUNDATION_RISK");
  if (technicalArchitectureReasons.length > 0) {
    pushReasonedEntry(roles, "role", "ta", technicalArchitectureReasons);
  }

  if (normalized.triggers.release) {
    pushReasonedEntry(roles, "role", "devops", ["ROLE_DEVOPS_RELEASE"]);
  }

  return roles.sort((left, right) => ROLE_ORDER.indexOf(left.role) - ROLE_ORDER.indexOf(right.role));
}

function deriveGates(normalized, requestLane, workflowRequired) {
  if (!workflowRequired) {
    return [];
  }

  const gates = [];
  if (requestLane !== "product_delivery") {
    pushReasonedEntry(gates, "gate", "task_plan", ["GATE_TASK_PLAN_BOUNDED_CHANGE"], ["developer"]);
    pushReasonedEntry(gates, "gate", "dod", ["GATE_DOD_TECHNICAL_CLOSEOUT"], ["qc"]);
    return gates;
  }

  pushReasonedEntry(gates, "gate", "spec", ["GATE_SPEC_PRODUCT_DELIVERY"], ["ba"]);
  pushReasonedEntry(gates, "gate", "dor", ["GATE_DOR_PRODUCT_DELIVERY"], ["ba", "qc"]);
  pushReasonedEntry(gates, "gate", "approach", ["GATE_APPROACH_PRODUCT_DELIVERY"], ["developer"]);
  pushReasonedEntry(gates, "gate", "task_plan", ["GATE_TASK_PLAN_PRODUCT_DELIVERY"], ["developer"]);
  pushReasonedEntry(gates, "gate", "dod", ["GATE_DOD_PRODUCT_DELIVERY"], ["qc"]);
  pushReasonedEntry(
    gates,
    "gate",
    "business_acceptance",
    ["GATE_BUSINESS_ACCEPTANCE_PRODUCT_OUTCOME"],
    ["po"]
  );

  if (normalized.triggers.public_contract) {
    pushReasonedEntry(gates, "gate", "contract", ["GATE_CONTRACT_PUBLIC_CONTRACT"], ["developer"]);
  }
  if (normalized.triggers.greenfield_foundation) {
    pushReasonedEntry(gates, "gate", "foundation", ["GATE_FOUNDATION_GREENFIELD"], ["developer"]);
  }
  if (normalized.triggers.release) {
    pushReasonedEntry(gates, "gate", "release", ["GATE_RELEASE_PUBLICATION"], ["devops", "qc"]);
    pushReasonedEntry(gates, "gate", "business_acceptance", ["GATE_BUSINESS_ACCEPTANCE_RELEASE_OUTCOME"], ["po"]);
  }

  return gates.sort((left, right) => GATE_ORDER.indexOf(left.gate) - GATE_ORDER.indexOf(right.gate));
}

function evaluateAdaptiveGovernance(input = {}) {
  const normalized = normalizeAdaptiveGovernanceInput(input);
  const escalationReasons = HARD_TRIGGER_DEFINITIONS
    .filter(({ trigger }) => normalized.triggers[trigger])
    .map(({ reason }) => reason);

  if (normalized.mixed_intent) {
    escalationReasons.push("HARD_AMBIGUOUS_MIXED_INTENT");
  }
  if (!REQUEST_LANES.includes(normalized.requested_lane)) {
    escalationReasons.push("HARD_UNKNOWN_REQUEST_LANE");
  }

  const requestLane = escalationReasons.length > 0 ? "product_delivery" : normalized.request_lane;
  const nonDelivery = NON_DELIVERY_LANES.has(requestLane);

  if (nonDelivery && normalized.explicit_materialization) {
    assertAuditedHumanOverride(normalized.human_override);
  }

  const workflowRequired =
    requestLane === "maintenance" ||
    requestLane === "product_delivery" ||
    (nonDelivery && normalized.explicit_materialization);
  const routingReasons = [LANE_REASON_CODES[requestLane]];
  if (nonDelivery && normalized.explicit_materialization) {
    routingReasons.push("HUMAN_MATERIALIZATION_OVERRIDE");
  }

  return {
    request_lane: requestLane,
    requested_lane: normalized.requested_lane,
    workflow_required: workflowRequired,
    routing_reasons: routingReasons,
    escalation_reasons: [...new Set(escalationReasons)],
    roles: deriveRoles(normalized, requestLane, workflowRequired),
    gates: deriveGates(normalized, requestLane, workflowRequired),
    human_override:
      nonDelivery && normalized.explicit_materialization
        ? { ...normalized.human_override }
        : null
  };
}

function stableClone(value) {
  if (Array.isArray(value)) {
    return value.map(stableClone);
  }
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((result, key) => {
        result[key] = stableClone(value[key]);
        return result;
      }, {});
  }
  return value;
}

function serializeAdaptiveDecision(decision) {
  return JSON.stringify(stableClone(decision));
}

function deriveTerminalGates(input = {}) {
  const decision = evaluateAdaptiveGovernance(input);
  if (!decision.workflow_required) {
    return [];
  }
  if (decision.request_lane !== "product_delivery") {
    return ["dod"];
  }
  if (input.triggers && normalizeBoolean(input.triggers.release, "triggers.release")) {
    return ["dod", "release", "business_acceptance"];
  }
  return ["dod", "business_acceptance"];
}

function parseMinor(version) {
  const match = normalizeText(version).match(/^(\d+)\.(\d+)\.\d+$/);
  return match ? `${match[1]}.${match[2]}` : "";
}

function canActivateAdaptiveWrites(input = {}) {
  const sourceMinor = parseMinor(input.source_version);
  const installedVersions = Array.isArray(input.installed_versions) ? input.installed_versions : [];
  const installedMinors = installedVersions.map(parseMinor);
  const reasons = [];

  if (!sourceMinor || installedVersions.length === 0 || installedMinors.some((minor) => !minor)) {
    reasons.push("ADAPTIVE_RUNTIME_VERSION_INVALID");
  } else if (installedMinors.some((minor) => minor !== sourceMinor)) {
    reasons.push("ADAPTIVE_RUNTIME_MINOR_SKEW");
  }
  if (input.parity_passed !== true) {
    reasons.push("ADAPTIVE_RUNTIME_PARITY_REQUIRED");
  }

  return {
    allowed: reasons.length === 0,
    reasons,
    source_minor: sourceMinor,
    installed_minors: installedMinors,
    legacy_write_available: true,
    dual_read_available: true
  };
}

module.exports = {
  GATE_ORDER,
  HARD_TRIGGER_DEFINITIONS,
  LANE_REASON_CODES,
  NON_DELIVERY_LANES,
  REQUEST_LANES,
  ROLE_ORDER,
  canActivateAdaptiveWrites,
  deriveTerminalGates,
  evaluateAdaptiveGovernance,
  normalizeAdaptiveGovernanceInput,
  serializeAdaptiveDecision
};
