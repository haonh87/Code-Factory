// i18n rollout (2026-06-24) renamed the sample work-items' section heading
// from "## Artifact Chính" to "## Main Artifact", but the execution validator
// still only recognized the Vietnamese heading, breaking CI for every note
// that already migrated. This locks both headings as valid so the validator
// tolerates old and newly-translated runtime artifacts alike.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { validateWorkflowExecution } = require("../scripts/validate-workflow-execution");
const { getExecutionArtifactDefinitions, renderExecutionArtifactBody } = require("../scripts/workflow-execution-definitions");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function buildProject(artifactHeading) {
  const workflowRoot = fs.mkdtempSync(path.join(os.tmpdir(), "val-exec-"));
  const slug = "sample-execution-item";

  writeFile(
    path.join(workflowRoot, slug, `${slug}.s05.technical-approach.md`),
    [
      "---",
      `artifact_id: "${slug}.s05.technical-approach"`,
      "artifact_family: workflow-step",
      `work_item_slug: "${slug}"`,
      'step_id: "s05"',
      'step_slug: "technical-approach"',
      "artifact_role: primary",
      "artifact_kind: primary-note",
      "source_of_truth: true",
      "status: draft",
      "execution_mode: multi_agent",
      "review_mode: self",
      'verification_owner: "qc"',
      "execution_roles:",
      "  - developer",
      "  - qc",
      "linked_artifacts:",
      `  - "${slug}.s05.execution-policy.md"`,
      "tags: []",
      "---",
      "",
      "# s05"
    ].join("\n")
  );

  const definition = getExecutionArtifactDefinitions("s05").find((item) => item.stepSlug === "execution-policy");
  const body = renderExecutionArtifactBody(definition, {
    workItemSlug: slug,
    executionMode: "multi_agent",
    reviewMode: "self",
    verificationOwner: "qc"
  });
  const translatedBody = artifactHeading === "## Main Artifact" ? body.replace("## Artifact Chính", "## Main Artifact") : body;

  writeFile(path.join(workflowRoot, slug, `${slug}.s05.execution-policy.md`), translatedBody);

  return workflowRoot;
}

function buildSectionAssignmentProject(omitField = "") {
  const workflowRoot = fs.mkdtempSync(path.join(os.tmpdir(), "val-exec-section-"));
  const slug = "section-assignment-item";
  const assignmentFields = {
    assignment_id: ['    assignment_id: "S06-ASSIGN-001"'],
    role: ['    role: "developer"'],
    owned_scope: ["    owned_scope:", '      - "packages/example.js"'],
    done_when: ["    done_when:", '      - "focused test passes"'],
    status: ["    status: READY"]
  };
  const assignmentLines = Object.entries(assignmentFields)
    .filter(([field]) => field !== omitField)
    .flatMap(([, lines]) => lines);

  writeFile(
    path.join(workflowRoot, slug, `${slug}.s06.task-breakdown.md`),
    [
      "---",
      `artifact_id: "${slug}.s06.task-breakdown"`,
      "artifact_family: workflow-step",
      `work_item_slug: "${slug}"`,
      'step_id: "s06"',
      'step_slug: "task-breakdown"',
      "artifact_role: primary",
      "artifact_kind: primary-note",
      "source_of_truth: true",
      "status: draft",
      "execution_mode: multi_agent",
      "review_mode: self",
      'verification_owner: "qc"',
      "execution_roles:",
      "  - developer",
      "  - qc",
      "linked_artifacts: []",
      "tags: []",
      "---",
      "",
      "# s06",
      "",
      "## Role Outputs",
      "```yaml",
      "assignments:",
      "  -",
      ...assignmentLines,
      "```",
      ""
    ].join("\n")
  );
  return workflowRoot;
}

function buildLegacyAssignmentProject() {
  const workflowRoot = fs.mkdtempSync(path.join(os.tmpdir(), "val-exec-legacy-assignment-"));
  const slug = "legacy-assignment-item";
  const runtimeName = `${slug}.s06.worker-assignment.md`;
  writeFile(
    path.join(workflowRoot, slug, `${slug}.s06.task-breakdown.md`),
    [
      "---",
      `artifact_id: "${slug}.s06.task-breakdown"`,
      "artifact_family: workflow-step",
      `work_item_slug: "${slug}"`,
      'step_id: "s06"',
      'step_slug: "task-breakdown"',
      "artifact_role: primary",
      "artifact_kind: primary-note",
      "source_of_truth: true",
      "status: draft",
      "execution_mode: multi_agent",
      "review_mode: self",
      'verification_owner: "qc"',
      "execution_roles:",
      "  - developer",
      "  - qc",
      "linked_artifacts:",
      `  - "${runtimeName}"`,
      "tags: []",
      "---",
      "",
      "# s06"
    ].join("\n")
  );
  const definition = getExecutionArtifactDefinitions("s06").find((item) => item.stepSlug === "worker-assignment");
  writeFile(
    path.join(workflowRoot, slug, runtimeName),
    renderExecutionArtifactBody(definition, {
      workItemSlug: slug,
      executionMode: "multi_agent",
      reviewMode: "self",
      verificationOwner: "qc"
    })
  );
  return workflowRoot;
}

function testAcceptsLegacyVietnameseHeading() {
  const workflowRoot = buildProject("## Artifact Chính");
  const result = validateWorkflowExecution({ workflowRoot });
  assert(result.ok, `expected legacy '## Artifact Chính' heading to pass, got errors: ${result.errors.join(" | ")}`);
  fs.rmSync(workflowRoot, { recursive: true, force: true });
}

function testAcceptsTranslatedEnglishHeading() {
  const workflowRoot = buildProject("## Main Artifact");
  const result = validateWorkflowExecution({ workflowRoot });
  assert(result.ok, `expected translated '## Main Artifact' heading to pass, got errors: ${result.errors.join(" | ")}`);
  fs.rmSync(workflowRoot, { recursive: true, force: true });
}

function testReadsAssignmentsFromRoleOutputs() {
  const workflowRoot = buildSectionAssignmentProject();
  const result = validateWorkflowExecution({ workflowRoot });
  assert(result.ok, `new assignments[] section must pass without a worker-assignment file: ${result.errors.join(" | ")}`);
  fs.rmSync(workflowRoot, { recursive: true, force: true });
}

function testAssignmentFieldReaders() {
  ["assignment_id", "role", "owned_scope", "done_when", "status"].forEach((field) => {
    const workflowRoot = buildSectionAssignmentProject(field);
    const result = validateWorkflowExecution({ workflowRoot });
    assert(
      !result.ok && result.errors.some((error) => error.includes(`missing required field '${field}'`)),
      `assignments[] reader must reject missing ${field}; got ${result.errors.join(" | ")}`
    );
    fs.rmSync(workflowRoot, { recursive: true, force: true });
  });
}

function testLegacyWorkerAssignmentStillPasses() {
  const workflowRoot = buildLegacyAssignmentProject();
  const result = validateWorkflowExecution({ workflowRoot });
  assert(result.ok, `legacy worker-assignment file must remain readable: ${result.errors.join(" | ")}`);
  fs.rmSync(workflowRoot, { recursive: true, force: true });
}

console.log("Running validate-workflow-execution (heading i18n) tests...\n");
testAcceptsLegacyVietnameseHeading();
console.log("  PASS: accepts legacy '## Artifact Chính' heading");
testAcceptsTranslatedEnglishHeading();
console.log("  PASS: accepts translated '## Main Artifact' heading");
testReadsAssignmentsFromRoleOutputs();
console.log("  PASS: reads assignments[] from ## Role Outputs");
testAssignmentFieldReaders();
console.log("  PASS: assignment_id/role/owned_scope/done_when/status readers reject missing fields");
testLegacyWorkerAssignmentStillPasses();
console.log("  PASS: legacy worker-assignment file remains accepted");

if (failures > 0) {
  console.error(`\nFAILED: ${failures} assertion(s) failed in validate-workflow-execution.test.js`);
  process.exit(1);
}

console.log("\nOK: validate-workflow-execution.test.js passed");
