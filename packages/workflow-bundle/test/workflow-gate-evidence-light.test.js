const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  getRequiredFinalizedGateKeys,
  getProtocolStepGateErrors,
  loadWorkflowStepGateSnapshot
} = require("../scripts/workflow-gate-evidence-utils");
const { getGateStepId, resolveGateArtifact } = require("../scripts/workflow-trusted-approval-utils");

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

function buildDefaultApprovalGates() {
  return { spec: "required", contract: "not_applicable", foundation: "not_applicable", uat: "not_applicable", release: "not_applicable", business_acceptance: "not_applicable" };
}

// ---------- Gate host map theo profile ----------

function testGateHostMapLight() {
  // Light: approach gate hosted tại s06 (không phải s05).
  assert(getGateStepId("approach", "light") === "s06", "light approach gate must map to s06");
  assert(getGateStepId("approach") === "s05", "non-light approach gate stays s05");
  assert(getGateStepId("approach", "none") === "s05", "sdd_mode none approach stays s05");
  assert(getGateStepId("spec", "light") === "s04", "spec gate still s04 for light");
  assert(getGateStepId("task_plan", "light") === "s06", "task_plan gate still s06 for light");
  assert(getGateStepId("dod", "light") === "s08", "dod gate still s08 for light");
  console.log("  PASS: gate-host-map-light (approach->s06)");
}

function testRequiredFinalizedGateKeysLight() {
  const gates = buildDefaultApprovalGates();
  // Light s06 phải require approach + task_plan (s05 hosted tại s06).
  const s06Light = getRequiredFinalizedGateKeys("s06", gates, "light");
  assert(s06Light.includes("approach"), "light s06 must require approach");
  assert(s06Light.includes("task_plan"), "light s06 must require task_plan");
  // Non-light s06 chỉ require task_plan.
  const s06Full = getRequiredFinalizedGateKeys("s06", gates);
  assert(!s06Full.includes("approach"), "non-light s06 must not require approach");
  assert(s06Full.includes("task_plan"), "non-light s06 still requires task_plan");
  // Light s04 vẫn require spec + dor.
  const s04Light = getRequiredFinalizedGateKeys("s04", gates, "light");
  assert(s04Light.includes("spec") && s04Light.includes("dor"), "light s04 requires spec+dor");
  // Light s08 vẫn require dod.
  const s08Light = getRequiredFinalizedGateKeys("s08", gates, "light");
  assert(s08Light.includes("dod"), "light s08 requires dod");
  console.log("  PASS: required-finalized-gate-keys-light");
}

// ---------- Protocol step gate errors (transition gate) ----------

function makeNoteFrontmatter(slug, stepId, stepSlug, overrides = {}) {
  const lines = [
    "---",
    `artifact_id: "${slug}.${stepId}.${stepSlug}"`,
    "artifact_family: workflow-step",
    `work_item_slug: "${slug}"`,
    `step_id: "${stepId}"`,
    `step_slug: "${stepSlug}"`,
    `workflow_stage: delivery`,
    "work_item_type: FEATURE",
    "delivery_context: brownfield",
    "artifact_role: primary",
    "artifact_kind: primary-note",
    "source_of_truth: true",
    `status: ${overrides.status || "finalized"}`,
    'governance_ref: "project-context/project-context.md"',
    "governance_profile: default",
    "governance_status: CHECKS_PENDING",
    "checklist_refs:",
    '  - "project-context/checklists/default.md"',
    `sdd_mode: ${overrides.sddMode || "light"}`,
    "spec_refs:",
    '  card: ""',
    `spec_status: ${overrides.specStatus || "approved"}`,
    "planning_track: quick",
    "execution_mode: agentic",
    "review_mode: self",
    "approval_gates:",
    '  spec: "required"',
    "role_signoffs:",
    "  spec: [\"po\"]",
    "  dor: [\"po\"]",
    "  approach: [\"tech-lead\"]",
    "  task_plan: [\"tech-lead\"]",
    "  dod: [\"qc\"]",
    "gate_reviews:",
    '  spec_reviewed_by: ["po"]',
    '  spec_reviewed_at: "2026-07-16"',
    '  dor_reviewed_by: ["po"]',
    '  dor_reviewed_at: "2026-07-16"',
    '  approach_reviewed_by: ["tech-lead"]',
    '  approach_reviewed_at: "2026-07-16"',
    '  task_plan_reviewed_by: ["tech-lead"]',
    '  task_plan_reviewed_at: "2026-07-16"',
    '  dod_reviewed_by: ["qc"]',
    '  dod_reviewed_at: "2026-07-16"',
    "upstream_artifacts: []",
    "linked_artifacts: []",
    "tags: []",
    "---",
    ""
  ];
  return lines.join("\n");
}

function buildLightProject(opts = {}) {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "gate-light-"));
  const slug = opts.slug || "light-gate-item";
  const workflowRoot = path.join(projectRoot, "work-items", slug);
  // s01 với sdd_mode light để getProtocolStepGateErrors nhận diện profile.
  writeFile(path.join(workflowRoot, `${slug}.s01.restate.md`), makeNoteFrontmatter(slug, "s01", "restate", { status: "finalized", sddMode: "light" }) + "# s01\n");
  writeFile(path.join(workflowRoot, `${slug}.s04.acceptance-criteria.md`), makeNoteFrontmatter(slug, "s04", "acceptance-criteria", { sddMode: "light", specStatus: "approved" }) + "## Governance Checks\n```yaml\nchecklist_applied: []\n```\n## Spec Freeze\n```yaml\nstatus: READY\nrequirement_ids: [REQ-001]\n```\n## SDD Traceability\n```yaml\nrequirement_refs: [REQ-001]\n```\n");
  writeFile(path.join(workflowRoot, `${slug}.s06.task-breakdown.md`), makeNoteFrontmatter(slug, "s06", "task-breakdown", { sddMode: "light" }) + "## Governance Checks\n```yaml\nchecklist_applied: []\n```\n## Option Analysis\n```yaml\noptions:\n  - id: OPT-1\n  - id: OPT-2\nrecommended_option: OPT-1\n```\n## SDD Traceability\n```yaml\nrequirement_refs: [REQ-001]\n```\n");
  return { projectRoot, workflowRoot, slug };
}

function testProtocolStepGatesLightSkipsS05() {
  // Light ACTIVE: phải check s04 + s06, KHÔNG check s05 (s05 không tồn tại).
  // Không có trusted receipts → phải có lỗi cho s04/s06 nhưng KHÔNG có lỗi "Missing s05 note".
  const { projectRoot, workflowRoot, slug } = buildLightProject();
  try {
    const errors = getProtocolStepGateErrors({ projectRoot, workflowRoot, workItemSlug: slug, toStatus: "ACTIVE" });
    const joined = errors.join("\n");
    assert(!/s05/.test(joined), `light ACTIVE must not reference s05, got: ${joined}`);
    assert(/s04/.test(joined), "light ACTIVE must reference s04 gate evidence");
    assert(/s06/.test(joined), "light ACTIVE must reference s06 gate evidence");
    assert(/approach/.test(joined), "light ACTIVE must require approach receipt (hosted at s06)");
    console.log("  PASS: protocol-step-gates-light-skips-s05 (requires s04+s06+approach, no s05)");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testProtocolStepGatesNonLightChecksS05() {
  // Non-light ACTIVE vẫn check s04+s05+s06.
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "gate-full-"));
  const slug = "full-gate-item";
  const workflowRoot = path.join(projectRoot, "work-items", slug);
  writeFile(path.join(workflowRoot, `${slug}.s01.restate.md`), makeNoteFrontmatter(slug, "s01", "restate", { status: "finalized", sddMode: "none" }) + "# s01\n");
  writeFile(path.join(workflowRoot, `${slug}.s04.acceptance-criteria.md`), makeNoteFrontmatter(slug, "s04", "acceptance-criteria", { sddMode: "none" }) + "## Governance Checks\n```yaml\nchecklist_applied: []\n```\n");
  writeFile(path.join(workflowRoot, `${slug}.s05.technical-approach.md`), makeNoteFrontmatter(slug, "s05", "technical-approach", { sddMode: "none" }) + "## Option Analysis\n```yaml\noptions:\n  - id: OPT-1\n  - id: OPT-2\nrecommended_option: OPT-1\n```\n");
  writeFile(path.join(workflowRoot, `${slug}.s06.task-breakdown.md`), makeNoteFrontmatter(slug, "s06", "task-breakdown", { sddMode: "none" }) + "## Governance Checks\n```yaml\nchecklist_applied: []\n```\n");
  try {
    const errors = getProtocolStepGateErrors({ projectRoot, workflowRoot, workItemSlug: slug, toStatus: "ACTIVE" });
    const joined = errors.join("\n");
    assert(/s05/.test(joined), "non-light ACTIVE must reference s05 gate evidence");
    console.log("  PASS: protocol-step-gates-non-light-checks-s05");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testProtocolStepGatesS08RequiresS07Evidence() {
  // VERIFIED+ phải fail nếu s07 thiếu Delivery Rule Evidence (s07 evidence boundary).
  const { projectRoot, workflowRoot, slug } = buildLightProject();
  // Tạo s07 thiếu Delivery Rule Evidence.
  writeFile(path.join(workflowRoot, `${slug}.s07.implementation.md`), makeNoteFrontmatter(slug, "s07", "implementation", { sddMode: "light" }) + "## SDD Traceability\n```yaml\nrequirement_refs: [REQ-001]\n```\n");
  // s08 tồn tại nhưng DoD chưa check (VERIFIED chỉ cần s08 exists).
  writeFile(path.join(workflowRoot, `${slug}.s08.verification.md`), makeNoteFrontmatter(slug, "s08", "verification", { sddMode: "light" }) + "## Governance Checks\n```yaml\nchecklist_applied: []\n```\n## Spec Coverage\n```yaml\ncoverage: []\nstatus: PASS\n```\n## SDD Traceability\n```yaml\nrequirement_refs: [REQ-001]\n```\n");
  try {
    const errors = getProtocolStepGateErrors({ projectRoot, workflowRoot, workItemSlug: slug, toStatus: "VERIFIED" });
    const joined = errors.join("\n");
    assert(/s07/.test(joined) && /Delivery Rule Evidence/i.test(joined), `VERIFIED must fail when s07 lacks Delivery Rule Evidence, got: ${joined}`);
    console.log("  PASS: protocol-step-gates-s08-requires-s07-evidence");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testResolveGateArtifactLightApproach() {
  // resolveGateArtifact cho approach (light) phải trỏ tới s06 artifact.
  const { projectRoot, workflowRoot, slug } = buildLightProject();
  try {
    const artifact = resolveGateArtifact({ projectRoot, workflowRoot, workItemSlug: slug, gate: "approach", sddMode: "light" });
    assert(/s06\.task-breakdown\.md$/.test(artifact.artifactPath), `light approach artifact must be s06, got ${artifact.artifactPath}`);
    assert(artifact.stepId === "s06", "light approach stepId must be s06");
    // Non-light approach phải trỏ tới s05 (không tồn tại → throw).
    let threw = false;
    try {
      resolveGateArtifact({ projectRoot, workflowRoot, workItemSlug: slug, gate: "approach" });
    } catch (_e) {
      threw = true;
    }
    assert(threw, "non-light approach must point to s05 (missing here -> throw)");
    console.log("  PASS: resolve-gate-artifact-light-approach (s06)");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

console.log("Running workflow-gate-evidence (Light) tests...\n");

testGateHostMapLight();
testRequiredFinalizedGateKeysLight();
testProtocolStepGatesLightSkipsS05();
testProtocolStepGatesNonLightChecksS05();
testProtocolStepGatesS08RequiresS07Evidence();
testResolveGateArtifactLightApproach();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-gate-evidence-light.test.js`);
  process.exit(1);
}
console.log("\nAll workflow-gate-evidence (Light) tests passed.");