const CHANGE_STATUSES = ["draft", "approved", "implementing", "verified", "archived"];
const ARCHIVE_STATUSES = ["not_ready", "ready_to_archive", "archived"];
const CHANGE_ID_PATTERN = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/;
const CHANGE_DECISION_OWNERS = ["agent", "coordinator"];
const CHANGE_APPROVAL_STATUSES = ["PENDING_REVIEW", "APPROVED", "REJECTED", "NOT_REQUIRED"];
const CHANGE_APPROVAL_GATE_PASSED = new Set(["APPROVED"]);

const REQUIRED_CHANGE_PACKAGE_FILES = [
  "proposal.md",
  "design.md",
  "tasks.md",
  "spec-delta/brd.delta.md",
  "spec-delta/srs.delta.md",
  "execution/task-status.md",
  "archive-metadata.md"
];

// --- Canonical CR vocabulary (plan v5 §5, §6) ---
// CR = Change Request. Canonical ID/field là CR-### / cr_*. Legacy CHANGE/change_*
// được dual-read trong migration window; writer mới chỉ emit canonical.
//
// Normal lifecycle: DRAFT -> APPROVED -> IMPLEMENTING -> VERIFIED -> ACCEPTED -> ARCHIVED
// Exception terminal states: REJECTED, CANCELLED, SUPERSEDED.
const CR_STATUSES = [
  "DRAFT",
  "APPROVED",
  "IMPLEMENTING",
  "VERIFIED",
  "ACCEPTED",
  "ARCHIVED"
];
const CR_EXCEPTIONAL_STATUSES = ["REJECTED", "CANCELLED", "SUPERSEDED"];
const CR_ID_PATTERN = /^CR-[A-Z0-9]+(?:-[A-Z0-9]+)*$/;
const CR_PROFILES = ["compact", "full"];

// Rollout flag cr_vocabulary (plan v5 §8): legacy|dual|canonical. Điều khiển
// reader dir discovery (và là contract surface cho writer). dual (default) =
// canonical-write + dual-read (current). legacy = pre-migration (legacy-only
// discovery). canonical = post-deprecation (canonical-only discovery, không
// fallback legacy). Frontmatter dual-read ở state layer đã xử lý key alias, nên
// flag ở đây chỉ gate DIR.
const CR_VOCABULARIES = ["legacy", "dual", "canonical"];
const DEFAULT_CR_VOCABULARY = "dual";

function resolveCrVocabulary(value) {
  const normalized = String(value == null ? "" : value).trim().toLowerCase();
  if (!normalized) {
    return DEFAULT_CR_VOCABULARY;
  }
  if (!CR_VOCABULARIES.includes(normalized)) {
    throw new Error(`Invalid cr_vocabulary '${value}'. Allowed values: ${CR_VOCABULARIES.join(", ")}`);
  }
  return normalized;
}

// Legacy read alias -> canonical write (plan §5 alias table).
const CR_LEGACY_FIELD_ALIASES = {
  change_id: "cr_id",
  change_status: "cr_status",
  change_strategy: "cr_strategy",
  linked_changes: "linked_crs"
};

// work_item_type legacy alias (plan §5): CHANGE -> CR.
const CR_LEGACY_TYPE_ALIASES = {
  CHANGE: "CR"
};

// Chỉ ACCEPTED được atomic merge current spec (BR-05, F-14). VERIFIED chỉ chứng
// minh technical implementation; một work item không tự ACCEPT toàn bộ CR.
const CR_ACCEPTED_SPEC_MERGE = new Set(["ACCEPTED"]);

const LEGACY_CR_PREFIX = "CHANGE-";
const CANONICAL_CR_PREFIX = "CR-";

// Dual-read: normalize legacy CHANGE-### -> canonical CR-###. Canonical ID trả
// nguyên dạng. Giữ segment sau prefix (vd CHANGE-WFC-001 -> CR-WFC-001).
function normalizeCrId(rawId) {
  if (typeof rawId !== "string" || rawId.length === 0) {
    return rawId;
  }
  if (rawId.startsWith(CANONICAL_CR_PREFIX)) {
    return rawId;
  }
  if (rawId.startsWith(LEGACY_CR_PREFIX)) {
    return CANONICAL_CR_PREFIX + rawId.slice(LEGACY_CR_PREFIX.length);
  }
  return rawId;
}

function isCanonicalCrId(rawId) {
  return typeof rawId === "string" && CR_ID_PATTERN.test(rawId);
}

// ACCEPTED không phải terminal theo nghĩa "record đóng hành động" — nó còn chờ
// archive; nhưng ARCHIVED/REJECTED/CANCELLED/SUPERSEDED là terminal thật.
function isCrLifecycleTerminal(status) {
  return status === "ARCHIVED" || CR_EXCEPTIONAL_STATUSES.includes(status);
}

function getDefaultChangeApprovalState(decisionOwner) {
  return {
    review_required: true,
    approval_status: "PENDING_REVIEW",
    reviewed_by: "",
    reviewed_at: "",
    review_notes: []
  };
}

module.exports = {
  ARCHIVE_STATUSES,
  CHANGE_APPROVAL_GATE_PASSED,
  CHANGE_APPROVAL_STATUSES,
  CHANGE_DECISION_OWNERS,
  CHANGE_ID_PATTERN,
  CHANGE_STATUSES,
  getDefaultChangeApprovalState,
  REQUIRED_CHANGE_PACKAGE_FILES,
  CR_STATUSES,
  CR_EXCEPTIONAL_STATUSES,
  CR_ID_PATTERN,
  CR_PROFILES,
  CR_VOCABULARIES,
  DEFAULT_CR_VOCABULARY,
  resolveCrVocabulary,
  CR_LEGACY_FIELD_ALIASES,
  CR_LEGACY_TYPE_ALIASES,
  CR_ACCEPTED_SPEC_MERGE,
  normalizeCrId,
  isCanonicalCrId,
  isCrLifecycleTerminal
};