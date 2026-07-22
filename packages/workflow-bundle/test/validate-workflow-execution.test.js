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

console.log("Running validate-workflow-execution (heading i18n) tests...\n");
testAcceptsLegacyVietnameseHeading();
console.log("  PASS: accepts legacy '## Artifact Chính' heading");
testAcceptsTranslatedEnglishHeading();
console.log("  PASS: accepts translated '## Main Artifact' heading");

if (failures > 0) {
  console.error(`\nFAILED: ${failures} assertion(s) failed in validate-workflow-execution.test.js`);
  process.exit(1);
}

console.log("\nOK: validate-workflow-execution.test.js passed");
