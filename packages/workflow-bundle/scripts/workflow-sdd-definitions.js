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

module.exports = {
  REQUIRED_SDD_BLOCKS_BY_STEP,
  SDD_MODES,
  SPEC_STATUSES
};
