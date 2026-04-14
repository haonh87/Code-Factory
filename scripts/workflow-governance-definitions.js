const DEFAULT_GOVERNANCE_REF = "project-context/project-context.md";
const STANDARD_GOVERNANCE_REFS = [
  "project-context/project-context.md",
  "project-context/constitution.md"
];
const GOVERNANCE_PROFILES = ["default", "strict", "regulated", "custom"];
const GOVERNANCE_STATUSES = [
  "ALIGNED",
  "CHECKS_PENDING",
  "EXCEPTION_RECORDED",
  "WAIVER_APPROVED",
  "BLOCKED",
  "NOT_APPLICABLE"
];
const GOVERNANCE_ROLES = ["po", "ba", "designer", "developer", "qc", "devops"];
const EXCEPTION_REGISTER_STATUSES = ["PROPOSED", "APPROVED", "REJECTED", "EXPIRED", "RESOLVED"];
const CHECKLIST_BY_PROFILE = {
  default: "project-context/checklists/default.md",
  strict: "project-context/checklists/strict.md",
  regulated: "project-context/checklists/regulated.md"
};

function getChecklistRefs(governanceProfile, customChecklistRefs = []) {
  if (governanceProfile === "custom") {
    return normalizeToArray(customChecklistRefs).filter(Boolean);
  }

  const standardChecklist = CHECKLIST_BY_PROFILE[governanceProfile];
  return standardChecklist ? [standardChecklist] : [];
}

function getGovernanceRef(governanceProfile, governanceRef) {
  if (governanceProfile === "custom") {
    return governanceRef || DEFAULT_GOVERNANCE_REF;
  }

  return governanceRef || DEFAULT_GOVERNANCE_REF;
}

function normalizeToArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value == null || value === false) {
    return [];
  }

  return [value];
}

module.exports = {
  CHECKLIST_BY_PROFILE,
  DEFAULT_GOVERNANCE_REF,
  EXCEPTION_REGISTER_STATUSES,
  GOVERNANCE_PROFILES,
  GOVERNANCE_ROLES,
  GOVERNANCE_STATUSES,
  STANDARD_GOVERNANCE_REFS,
  getChecklistRefs,
  getGovernanceRef,
  normalizeToArray
};
