const CHANGE_STATUSES = ["draft", "approved", "implementing", "verified", "archived"];
const ARCHIVE_STATUSES = ["not_ready", "ready_to_archive", "archived"];
const CHANGE_ID_PATTERN = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/;

const REQUIRED_CHANGE_PACKAGE_FILES = [
  "proposal.md",
  "design.md",
  "tasks.md",
  "spec-delta/brd.delta.md",
  "spec-delta/srs.delta.md",
  "execution/task-status.md",
  "archive-metadata.md"
];

module.exports = {
  ARCHIVE_STATUSES,
  CHANGE_ID_PATTERN,
  CHANGE_STATUSES,
  REQUIRED_CHANGE_PACKAGE_FILES
};
