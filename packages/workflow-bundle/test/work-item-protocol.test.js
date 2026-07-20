const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { ensureLightLazyStepNote } = require("../scripts/work-item-protocol");
const { loadTrustedApprovalReceipt, hasApprovedReceipt, resolveGateArtifact } = require("../scripts/workflow-trusted-approval-utils");

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

function rmrf(target) {
  try { fs.chmodSync(target, 0o755); } catch (_e) { /* ignore */ }
  try {
    for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
      const child = path.join(target, entry.name);
      if (entry.isDirectory()) rmrf(child);
      else { try { fs.chmodSync(child, 0o644); } catch (_e) { /* ignore */ } fs.rmSync(child, { force: true }); }
    }
  } catch (_e) { /* ignore */ }
  fs.rmSync(target, { recursive: true, force: true });
}

// s01 note với profile light; các note khác chỉ cần đủ frontmatter cho gate snapshot.
function makeS01Frontmatter(slug, sddMode) {
  return [
    "---",
    `artifact_id: "${slug}.s01.restate"`,
    "artifact_family: workflow-step",
    `work_item_slug: "${slug}"`,
    "step_id: \"s01\"",
    "step_slug: \"restate\"",
    "workflow_stage: discovery",
    "work_item_type: FEATURE",
    "delivery_context: brownfield",
    "artifact_role: primary",
    "artifact_kind: primary-note",
    "source_of_truth: true",
    "status: finalized",
    'governance_ref: "project-context/project-context.md"',
    "governance_profile: default",
    "governance_status: CHECKS_PENDING",
    "checklist_refs:",
    '  - "project-context/checklists/default.md"',
    `sdd_mode: ${sddMode}`,
    "spec_refs:",
    '  card: ""',
    "spec_status: approved",
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
    "upstream_artifacts: []",
    "linked_artifacts: []",
    "tags: []",
    "---",
    ""
  ].join("\n");
}

function makeHostNoteFrontmatter(slug, stepId, stepSlug) {
  return [
    "---",
    `artifact_id: "${slug}.${stepId}.${stepSlug}"`,
    "artifact_family: workflow-step",
    `work_item_slug: "${slug}"`,
    `step_id: "${stepId}"`,
    `step_slug: "${stepSlug}"`,
    "workflow_stage: delivery",
    "work_item_type: FEATURE",
    "delivery_context: brownfield",
    "artifact_role: primary",
    "artifact_kind: primary-note",
    "source_of_truth: true",
    "status: finalized",
    'governance_ref: "project-context/project-context.md"',
    "governance_profile: default",
    "governance_status: CHECKS_PENDING",
    "checklist_refs:",
    '  - "project-context/checklists/default.md"',
    "sdd_mode: light",
    "spec_refs:",
    '  card: ""',
    "spec_status: approved",
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
    "upstream_artifacts: []",
    "linked_artifacts: []",
    "tags: []",
    "---",
    ""
  ].join("\n");
}

function buildLightProject(slug) {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-light-"));
  const workflowRoot = path.join(projectRoot, "work-items", slug);
  writeFile(path.join(workflowRoot, `${slug}.s01.restate.md`), makeS01Frontmatter(slug, "light") + "# s01\n");
  writeFile(path.join(workflowRoot, `${slug}.s04.acceptance-criteria.md`), makeHostNoteFrontmatter(slug, "s04", "acceptance-criteria") + "## Governance Checks\n```yaml\nchecklist_applied: []\n```\n## Spec Freeze\n```yaml\nstatus: READY\nrequirement_ids: [REQ-001]\n```\n## SDD Traceability\n```yaml\nrequirement_refs: [REQ-001]\n```\n");
  writeFile(path.join(workflowRoot, `${slug}.s06.task-breakdown.md`), makeHostNoteFrontmatter(slug, "s06", "task-breakdown") + "## Governance Checks\n```yaml\nchecklist_applied: []\n```\n## Option Analysis\n```yaml\noptions:\n  - id: OPT-1\n  - id: OPT-2\nrecommended_option: OPT-1\n```\n## Technical Approach\n```yaml\nrecommended_approach: \"x\"\n```\n## Brownfield Impact Analysis\n```yaml\nimpacted_modules: []\n```\n## Brownfield Delivery Plan\n```yaml\nregression_checkpoints: []\n```\n## SDD Traceability\n```yaml\nrequirement_refs: [REQ-001]\n```\n");
  return { projectRoot, workflowRoot };
}

// ---------- Output 4: transition hooks tạo s07/s08 đúng thời điểm ----------

function testEnsureLightLazyStepNoteCreatesS07S08() {
  const slug = "proto-hook-item";
  const { projectRoot, workflowRoot } = buildLightProject(slug);
  try {
    const report = { work_item_slug: slug, workflow_root: workflowRoot, delivery_context: "brownfield" };
    // Chưa có s07/s08.
    assert(!fs.existsSync(path.join(workflowRoot, `${slug}.s07.implementation.md`)), "s07 must not exist before activate hook");
    assert(!fs.existsSync(path.join(workflowRoot, `${slug}.s08.verification.md`)), "s08 must not exist before verify hook");

    // activate hook -> tạo s07.
    ensureLightLazyStepNote(report, projectRoot, "s07");
    const s07Path = path.join(workflowRoot, `${slug}.s07.implementation.md`);
    assert(fs.existsSync(s07Path), "activate hook must create s07 note");
    const s07Before = fs.readFileSync(s07Path, "utf8");

    // Idempotent: gọi lại không ghi đè / không duplicate.
    ensureLightLazyStepNote(report, projectRoot, "s07");
    assert(fs.readFileSync(s07Path, "utf8") === s07Before, "activate hook must be idempotent (no overwrite)");

    // verify hook -> tạo s08.
    ensureLightLazyStepNote(report, projectRoot, "s08");
    assert(fs.existsSync(path.join(workflowRoot, `${slug}.s08.verification.md`)), "verify hook must create s08 note");

    console.log("  PASS: ensure-light-lazy-step-note (s07 on activate, s08 on verify, idempotent)");
  } finally {
    rmrf(projectRoot);
  }
}

function testEnsureLightLazyNoopForNonLight() {
  const slug = "proto-nonlight-item";
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-nonlight-"));
  const workflowRoot = path.join(projectRoot, "work-items", slug);
  writeFile(path.join(workflowRoot, `${slug}.s01.restate.md`), makeS01Frontmatter(slug, "none") + "# s01\n");
  try {
    const report = { work_item_slug: slug, workflow_root: workflowRoot, delivery_context: "brownfield" };
    ensureLightLazyStepNote(report, projectRoot, "s07");
    assert(!fs.existsSync(path.join(workflowRoot, `${slug}.s07.implementation.md`)), "non-light must not trigger lazy s07 creation");
    console.log("  PASS: ensure-light-lazy-noop-for-non-light");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Output 5: ready bundle với independent trusted receipts ----------

function testApproveReadyBundleSealsFourIndependentReceipts() {
  const slug = "proto-ready-item";
  const { projectRoot, workflowRoot } = buildLightProject(slug);
  const approvalRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-approvals-"));
  const workflowRootBase = path.dirname(workflowRoot);
  const scriptPath = path.resolve(__dirname, "..", "scripts", "workflow-gate-review.js");
  const childEnv = {
    ...process.env,
    WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
    WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
    WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot
  };
  try {
    const stdout = execFileSync(
      process.execPath,
      [
        scriptPath,
        "approve-ready-bundle",
        "--work-item", slug,
        "--project-root", projectRoot,
        "--workflow-root", workflowRootBase,
        "--approval-root", approvalRoot
      ],
      { env: childEnv, encoding: "utf8" }
    );
    const summary = JSON.parse(stdout);
    assert(summary.action === "approve-ready-bundle", "ready-bundle must emit action summary");
    assert(Array.isArray(summary.sealed_gates) && summary.sealed_gates.length === 4, `ready-bundle must seal 4 gates, got ${summary.sealed_gates && summary.sealed_gates.length}`);
    assert(summary.sdd_mode === "light", "ready-bundle must detect light profile");

    const sealedGates = summary.sealed_gates.map((s) => s.gate).sort();
    assert(sealedGates.join(",") === "approach,dor,spec,task_plan", `ready-bundle must seal spec/dor/approach/task_plan, got ${sealedGates.join(",")}`);

    // Mỗi receipt tồn tại, APPROVED, signature valid, và artifact_ref khớp host.
    const gates = [
      { gate: "spec", expectStep: "s04" },
      { gate: "dor", expectStep: "s04" },
      { gate: "approach", expectStep: "s06" },
      { gate: "task_plan", expectStep: "s06" }
    ];
    gates.forEach(({ gate, expectStep }) => {
      const loaded = loadTrustedApprovalReceipt({ projectRoot, overrideRoot: approvalRoot, kind: "gate", workItemSlug: slug, gate });
      assert(loaded.receipt && loaded.receipt.approval_status === "APPROVED", `receipt ${gate} must be APPROVED`);
      assert(hasApprovedReceipt(loaded.receipt, loaded.approvalRoot), `receipt ${gate} signature must verify`);
      const artifact = resolveGateArtifact({ projectRoot, workflowRoot, workItemSlug: slug, gate, sddMode: "light" });
      assert(loaded.receipt.artifact_ref === artifact.artifactRef, `receipt ${gate} artifact_ref must match host`);
      assert(loaded.receipt.artifact_ref.includes(`.${expectStep}.`), `receipt ${gate} must hash ${expectStep} note, got ${loaded.receipt.artifact_ref}`);
    });

    // Reviewer độc lập theo gate_reviews: spec/dor -> po, approach/task_plan -> tech-lead.
    const specReceipt = loadTrustedApprovalReceipt({ projectRoot, overrideRoot: approvalRoot, kind: "gate", workItemSlug: slug, gate: "spec" });
    const approachReceipt = loadTrustedApprovalReceipt({ projectRoot, overrideRoot: approvalRoot, kind: "gate", workItemSlug: slug, gate: "approach" });
    assert(specReceipt.receipt.reviewed_by === "po", "spec receipt reviewer must be po");
    assert(approachReceipt.receipt.reviewed_by === "tech-lead", "approach receipt reviewer must be tech-lead");

    console.log("  PASS: approve-ready-bundle (4 independent receipts, approach->s06, per-gate reviewer)");
  } finally {
    rmrf(projectRoot);
    rmrf(approvalRoot);
  }
}

// ---------- Review fix S3 (AC-05): transition fail không được để lại lazy note ----------

function testFailedVerifyDoesNotLeavePrematureS08() {
  const slug = "proto-premature-item";
  const { projectRoot, workflowRoot } = buildLightProject(slug);
  try {
    const { applyAction } = require("../scripts/work-item-protocol");
    // Report ACTIVE nhưng KHÔNG có s07 note -> verify phải fail vì thiếu s07
    // evidence, và s08 note không được tồn tại sau khi fail.
    const report = {
      work_item_slug: slug,
      workflow_root: workflowRoot,
      delivery_context: "brownfield",
      protocol_status: "ACTIVE",
      approval_status: "APPROVED",
      review_required: true,
      decision_owner: "coordinator",
      work_item_type: "FEATURE",
      current_step: "s07"
    };
    let threw = false;
    try {
      applyAction(report, "verify", { "project-root": projectRoot });
    } catch (_error) {
      threw = true;
    }
    assert(threw, "verify without s07 evidence must throw");
    const s08Candidates = fs
      .readdirSync(workflowRoot)
      .filter((name) => name.includes(".s08."));
    assert(
      s08Candidates.length === 0,
      `failed verify must not leave premature s08 note, got ${JSON.stringify(s08Candidates)}`
    );
    console.log("  PASS: failed verify leaves no premature s08 note (AC-05)");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running work-item-protocol (Light) tests...\n");
testEnsureLightLazyStepNoteCreatesS07S08();
testEnsureLightLazyNoopForNonLight();
testApproveReadyBundleSealsFourIndependentReceipts();
testFailedVerifyDoesNotLeavePrematureS08();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in work-item-protocol-light.test.js`);
  process.exit(1);
}
console.log("\nAll work-item-protocol (Light) tests passed.");