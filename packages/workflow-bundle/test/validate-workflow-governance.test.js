// Review fix S2 (AC-06, "no silent skipped invariant"): work item Light khai
// approval_gates.foundation/contract = required KHÔNG được silent-skip — phải
// fail governance validation với guidance escalate full.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { validateWorkflowGovernance } = require("../scripts/validate-workflow-governance");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function rmrf(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function buildProject() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "val-gov-"));
  fs.mkdirSync(path.join(projectRoot, "project-context", "checklists"), { recursive: true });
  fs.writeFileSync(path.join(projectRoot, "project-context", "project-context.md"), "# Ctx\n", "utf8");
  fs.writeFileSync(path.join(projectRoot, "project-context", "checklists", "default.md"), "# CL\n", "utf8");
  return projectRoot;
}

function writeLightS01(projectRoot, slug, extraGates) {
  writeFile(
    path.join(projectRoot, "work-items", slug, `${slug}.s01.restate.md`),
    [
      "---",
      `artifact_id: "${slug}.s01.restate"`,
      "artifact_family: workflow-step",
      `work_item_slug: "${slug}"`,
      'step_id: "s01"',
      'step_slug: "restate"',
      "workflow_stage: discovery",
      "work_item_type: FEATURE",
      "delivery_context: brownfield",
      "artifact_role: primary",
      "artifact_kind: primary-note",
      "source_of_truth: true",
      "status: draft",
      'governance_ref: "project-context/project-context.md"',
      "governance_profile: default",
      "governance_status: CHECKS_PENDING",
      "checklist_refs:",
      '  - "project-context/checklists/default.md"',
      "sdd_mode: light",
      "spec_refs:",
      '  card: ""',
      "spec_status: draft",
      "planning_track: quick",
      "execution_mode: agentic",
      "review_mode: self",
      "approval_gates:",
      '  spec: "required"',
      ...extraGates,
      "upstream_artifacts: []",
      "linked_artifacts: []",
      "tags: []",
      "---",
      "",
      "# s01",
      "",
      "## Governance Context",
      "```yaml",
      "governance_notes: []",
      "```"
    ].join("\n")
  );
}

// ---------- S2: light + foundation required -> error, không silent skip ----------

function testLightFoundationRequiredErrors() {
  const projectRoot = buildProject();
  try {
    writeLightS01(projectRoot, "light-foundation-item", ['  foundation: "required"']);
    const result = validateWorkflowGovernance({
      workflowRoot: path.join(projectRoot, "work-items", "light-foundation-item"),
      projectRoot
    });
    assert(!result.ok, "light + foundation=required must fail governance validation");
    assert(
      result.errors.some((e) => /approval_gates\.foundation/.test(e) && /escalate/i.test(e)),
      `error must mention approval_gates.foundation + escalate guidance, got ${JSON.stringify(result.errors)}`
    );
    console.log("  PASS: light + foundation=required errors (no silent skip)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- S2: light + contract required -> error ----------

function testLightContractRequiredErrors() {
  const projectRoot = buildProject();
  try {
    writeLightS01(projectRoot, "light-contract-item", ['  contract: "required"']);
    const result = validateWorkflowGovernance({
      workflowRoot: path.join(projectRoot, "work-items", "light-contract-item"),
      projectRoot
    });
    assert(!result.ok, "light + contract=required must fail governance validation");
    assert(
      result.errors.some((e) => /approval_gates\.contract/.test(e) && /escalate/i.test(e)),
      `error must mention approval_gates.contract + escalate guidance, got ${JSON.stringify(result.errors)}`
    );
    console.log("  PASS: light + contract=required errors (no silent skip)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Regression: light không khai foundation/contract vẫn pass ----------

function testLightWithoutFoundationContractPasses() {
  const projectRoot = buildProject();
  try {
    writeLightS01(projectRoot, "light-clean-item", []);
    const result = validateWorkflowGovernance({
      workflowRoot: path.join(projectRoot, "work-items", "light-clean-item"),
      projectRoot
    });
    assert(result.ok, `light without foundation/contract must pass, got ${JSON.stringify(result.errors)}`);
    console.log("  PASS: light without foundation/contract still passes");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running validate-workflow-governance (light gate guard) tests...\n");
testLightFoundationRequiredErrors();
testLightContractRequiredErrors();
testLightWithoutFoundationContractPasses();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in validate-workflow-governance.test.js`);
  process.exit(1);
}
console.log("\nAll validate-workflow-governance (light gate guard) tests passed.");
