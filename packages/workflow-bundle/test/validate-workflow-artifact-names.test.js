const fs = require("fs");
const os = require("os");
const path = require("path");
const { validateWorkflowArtifactNames } = require("../scripts/validate-workflow-artifact-names");

let failures = 0;

function assert(condition, message) {
  if (condition) return;
  failures += 1;
  console.error(`  FAIL: ${message}`);
}

function buildFixture({ link = true, reason = "Concurrent workers write from isolated worktrees.", assignmentId = "S07-BACKEND-001" } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-artifact-names-"));
  const slug = "role-indexed-handoff";
  const fileName = `${slug}.s07.worker-handoff-report.S07-BACKEND-001.md`;
  const linkedArtifacts = link ? `linked_artifacts:\n  - "${fileName}"` : "linked_artifacts: []";
  fs.writeFileSync(
    path.join(root, `${slug}.s07.implementation.md`),
    [
      "---",
      `artifact_id: "${slug}.s07.implementation"`,
      `work_item_slug: "${slug}"`,
      'step_id: "s07"',
      'step_slug: "implementation"',
      linkedArtifacts,
      "---",
      "# Implementation",
      ""
    ].join("\n"),
    "utf8"
  );
  fs.writeFileSync(
    path.join(root, fileName),
    [
      "---",
      `artifact_id: "${slug}.s07.worker-handoff-report.S07-BACKEND-001"`,
      `work_item_slug: "${slug}"`,
      'step_id: "s07"',
      'step_slug: "worker-handoff-report"',
      `assignment_id: "${assignmentId}"`,
      `artifact_governance_exemption_reason: "${reason}"`,
      "---",
      "# Worker Handoff Report",
      ""
    ].join("\n"),
    "utf8"
  );
  return root;
}

function runCase(options) {
  const root = buildFixture(options);
  try {
    return validateWorkflowArtifactNames({ workflowRoot: root });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

console.log("Running validate-workflow-artifact-names tests...\n");

const valid = runCase();
assert(valid.ok, `registered role-indexed handoff must pass: ${valid.errors.join(" | ")}`);
assert(
  valid.notices.some((notice) => /Concurrent workers write from isolated worktrees/.test(notice)),
  "role-indexed escape-hatch reason must be visible in validator output"
);

const missingLink = runCase({ link: false });
assert(
  !missingLink.ok && missingLink.errors.some((error) => /linked_artifacts/.test(error)),
  `role-indexed handoff must be linked by the primary note: ${missingLink.errors.join(" | ")}`
);

const missingReason = runCase({ reason: "" });
assert(
  !missingReason.ok && missingReason.errors.some((error) => /exemption reason/i.test(error)),
  `role-indexed handoff must state an exemption reason: ${missingReason.errors.join(" | ")}`
);

const mismatchedAssignment = runCase({ assignmentId: "S07-FRONTEND-002" });
assert(
  !mismatchedAssignment.ok && mismatchedAssignment.errors.some((error) => /assignment_id/.test(error)),
  `filename discriminator must match assignment_id: ${mismatchedAssignment.errors.join(" | ")}`
);

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in validate-workflow-artifact-names.test.js`);
  process.exit(1);
}

console.log("OK: validate-workflow-artifact-names.test.js passed");
