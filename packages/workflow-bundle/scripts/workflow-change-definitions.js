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
  REQUIRED_CHANGE_PACKAGE_FILES
};
