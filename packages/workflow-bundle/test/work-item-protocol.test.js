const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { ensureLightLazyStepNote } = require("../scripts/work-item-protocol");
const { loadTrustedApprovalReceipt, hasApprovedReceipt, resolveGateArtifact } = require("../scripts/workflow-trusted-approval-utils");
const {
  getProtocolStateContradictionErrors,
  getTrustedReceiptArtifactErrors
} = require("../scripts/workflow-gate-evidence-utils");

const governanceFixtureRoot = path.join(__dirname, "..", "tests", "fixtures", "workflow-governance");

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

function testStaleDigestFixtureIsRejected() {
  const fixture = JSON.parse(fs.readFileSync(path.join(governanceFixtureRoot, "stale-gate-receipt.json"), "utf8"));
  const errors = getTrustedReceiptArtifactErrors({
    gate: fixture.gate,
    receipt: fixture.receipt,
    artifact: fixture.artifact,
    filePath: "stale-gate-receipt.json"
  });
  assert(
    errors.some((error) => /stale after artifact changed/i.test(error)),
    `stale digest fixture must fail, got ${JSON.stringify(errors)}`
  );
  console.log("  PASS: stale trusted-receipt digest fixture is rejected");
}

function testContradictoryProtocolStateFixtureIsRejected() {
  const fixture = JSON.parse(
    fs.readFileSync(path.join(governanceFixtureRoot, "contradictory-protocol-state.json"), "utf8")
  );
  const receiptState = {
    ...fixture.receipt_state,
    approvedGates: new Set(fixture.receipt_state.approvedGates)
  };
  const errors = getProtocolStateContradictionErrors(fixture.report, receiptState, "protocol-report.json");
  assert(errors.some((error) => /work-item approval.*APPROVED/i.test(error)), `work-item contradiction missing: ${JSON.stringify(errors)}`);
  assert(errors.some((error) => /CHANGE-999.*APPROVED/i.test(error)), `change contradiction missing: ${JSON.stringify(errors)}`);
  assert(errors.some((error) => /task_plan.*APPROVED/i.test(error)), `task-plan contradiction missing: ${JSON.stringify(errors)}`);
  assert(errors.some((error) => /spec.*APPROVED/i.test(error)), `spec required-action contradiction missing: ${JSON.stringify(errors)}`);

  const source = fs.readFileSync(path.join(__dirname, "..", "scripts", "work-item-protocol.js"), "utf8");
  const activateCase = source.match(/case "activate":([\s\S]*?)case "block":/);
  assert(activateCase && /blockers:\s*\[\]/.test(activateCase[1]), "activate transition must clear stale blockers");
  console.log("  PASS: contradictory protocol state fixture is rejected and activate clears blockers");
}


// ---------------------------------------------------------------------------
// E-B / REQ-004 carried from worktree-and-closure-integrity as L-01: a work item
// must not reach DONE after its declared delivery was dirtied following a clean
// dod seal. The seal guard already exists on main; this asserts the TRANSITION,
// which is a different call site. A test that hits the seal instead would pass
// while proving nothing about L-01 - see T4's review checkpoint.
//
// Nothing is persisted: OQ-4 is answered by re-evaluating at transition time, so
// the hatch is passed again at the transition rather than stored in a receipt.
//
// Work item: trusted-receipt-namespace-resolution, task T4.
// ---------------------------------------------------------------------------

function git(cwd, args) {
  try {
    return { status: 0, out: execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }) };
  } catch (e) {
    return { status: e.status === undefined ? 1 : e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
  }
}

// Builds a Light work item sitting at VERIFIED with dod sealed over a CLEAN tree,
// which is the only state from which the DONE transition is reachable.
// --no-verify because the operator's global commit-msg hook enforces Conventional
// Commits; a fixture must not depend on the operator's hook configuration.
function buildProjectAtVerified(slug, opts = {}) {
  const { projectRoot, workflowRoot } = buildLightProject(slug);
  const approvalRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-eb-approvals-"));
  const workflowRootBase = path.dirname(workflowRoot);
  const childEnv = {
    ...process.env,
    WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
    WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
    WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot
  };

  const withGit = opts.withGit !== false;
  if (withGit) {
    git(projectRoot, ["init", "-q"]);
    git(projectRoot, ["config", "user.email", "fixture@example.test"]);
    git(projectRoot, ["config", "user.name", "Fixture"]);
  }
  writeFile(path.join(projectRoot, "src", "app.js"), "// committed delivery\n");

  // s07 must exist and be finalized before verify; s08 hosts the dod gate.
  writeFile(
    path.join(workflowRoot, `${slug}.s07.implementation.md`),
    makeHostNoteFrontmatter(slug, "s07", "implementation") +
      "## Delivery Rule Evidence\n```yaml\nbehavior_change: NO\ntdd_status: NOT_REQUIRED\nworktree_status: NOT_REQUIRED\nreview_status: COMPLETED\ndelegation_mode: agentic\n```\n"
  );
  writeFile(
    path.join(workflowRoot, `${slug}.s08.verification.md`),
    makeHostNoteFrontmatter(slug, "s08", "verification").replace(
      '  task_plan_reviewed_at: "2026-07-16"',
      '  task_plan_reviewed_at: "2026-07-16"\n  dod_reviewed_by: ["qc"]\n  dod_reviewed_at: "2026-07-16"'
    ) + "## Governance Checks\n```yaml\nchecklist_applied: []\n```\n## SDD Traceability\n```yaml\nrequirement_refs: [REQ-001]\n```\n"
  );

  // The dod seal guard (merged from the sibling work item) reads granted_write_paths
  // from the PERSISTED report, so the report must exist on disk before sealing or the
  // seal refuses with "granted_write_paths is empty" - the guard working as designed.
  const reportPath = path.join(workflowRoot, `${slug}.work-item-report.json`);
  writeFile(reportPath, JSON.stringify({
    work_item_slug: slug,
    workflow_root: workflowRoot,
    delivery_context: "brownfield",
    protocol_status: "VERIFIED",
    approval_status: "APPROVED",
    review_required: true,
    reviewed_by: "po",
    current_step: "s08",
    granted_write_paths: ["src"]
  }, null, 2) + "\n");

  // Commit BEFORE sealing. The L-01 scenario is "seal clean, then dirty, then transition",
  // so a fixture that seals over a dirty tree would be testing the seal guard instead.
  if (withGit) {
    git(projectRoot, ["add", "-A"]);
    git(projectRoot, ["commit", "--no-verify", "-q", "-m", "chore: seed"]);
  }

  // The DONE transition also requires a trusted WORK-ITEM receipt, not just gate receipts.
  const protocolScript = path.resolve(__dirname, "..", "scripts", "work-item-protocol.js");
  execFileSync(process.execPath, [protocolScript, "approve", "--work-item", slug, "--reviewed-by", "po",
    "--project-root", projectRoot, "--workflow-root", workflowRootBase, "--approval-root", approvalRoot],
    { env: childEnv, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });

  const gateScript = path.resolve(__dirname, "..", "scripts", "workflow-gate-review.js");
  execFileSync(process.execPath, [gateScript, "approve-ready-bundle", "--work-item", slug,
    "--project-root", projectRoot, "--workflow-root", workflowRootBase, "--approval-root", approvalRoot],
    { env: childEnv, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  execFileSync(process.execPath, [gateScript, "approve", "--work-item", slug, "--gate", "dod",
    "--reviewed-by", "qc", "--project-root", projectRoot, "--workflow-root", workflowRootBase,
    "--approval-root", approvalRoot], { env: childEnv, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });

  const report = {
    work_item_slug: slug,
    workflow_root: workflowRoot,
    delivery_context: "brownfield",
    protocol_status: "VERIFIED",
    approval_status: "APPROVED",
    review_required: true,
    reviewed_by: "po",
    current_step: "s08",
    granted_write_paths: ["src"]
  };
  return { projectRoot, workflowRoot, approvalRoot, report, childEnv };
}

function closeIt(ctx, extra = {}) {
  const { applyAction } = require("../scripts/work-item-protocol");
  // applyAction reads the approval root from the environment rather than from args,
  // so the fixture root is scoped around the call and restored afterwards.
  const prevRoot = process.env.WORKFLOW_BUNDLE_APPROVAL_ROOT;
  const prevInsecure = process.env.WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT;
  process.env.WORKFLOW_BUNDLE_APPROVAL_ROOT = ctx.approvalRoot;
  process.env.WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT = "true";
  try {
    return { ok: true, report: applyAction(ctx.report, "close", { "project-root": ctx.projectRoot, ...extra }) };
  } catch (e) {
    return { ok: false, message: String(e.message || e) };
  } finally {
    if (prevRoot === undefined) delete process.env.WORKFLOW_BUNDLE_APPROVAL_ROOT; else process.env.WORKFLOW_BUNDLE_APPROVAL_ROOT = prevRoot;
    if (prevInsecure === undefined) delete process.env.WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT; else process.env.WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT = prevInsecure;
  }
}

function dirty(ctx, rel, text) {
  const abs = path.join(ctx.projectRoot, rel);
  let cur = path.dirname(abs);
  while (cur.startsWith(ctx.projectRoot)) { try { fs.chmodSync(cur, 0o755); } catch (_e) {} const up = path.dirname(cur); if (up === cur) break; cur = up; }
  try { fs.chmodSync(ctx.projectRoot, 0o755); } catch (_e) {}
  try { fs.chmodSync(abs, 0o644); } catch (_e) {}
  fs.appendFileSync(abs, text, "utf8");
}

function testEbCleanTreeStillReachesDone() {
  console.log("\nE-B / AC-004: a clean declared scope still reaches DONE (no false positive)");
  const ctx = buildProjectAtVerified("eb-clean-item");
  try {
    const r = closeIt(ctx);
    assert(r.ok && r.report.protocol_status === "DONE", `clean tree must reach DONE (got: ${r.ok ? r.report.protocol_status : r.message})`);
  } finally { rmrf(ctx.projectRoot); rmrf(ctx.approvalRoot); }
}

function testEbDirtyDeclaredPathRefusedAtTransition() {
  console.log("\nE-B / REQ-004 / L-01: DONE is refused when a declared path is dirty AFTER a clean seal");
  const ctx = buildProjectAtVerified("eb-dirty-item");
  try {
    dirty(ctx, path.join("src", "app.js"), "// uncommitted after the seal\n");
    const st = git(ctx.projectRoot, ["status", "--porcelain", "--", "src"]);
    assert(st.out.trim() !== "", `precondition: src is dirty (got "${st.out.trim()}")`);
    const r = closeIt(ctx);
    assert(!r.ok, "the DONE transition is REFUSED while a declared path holds uncommitted changes (today: it succeeds - L-01)");
    assert(!r.ok && /src/.test(r.message), "the refusal names the offending path");
  } finally { rmrf(ctx.projectRoot); rmrf(ctx.approvalRoot); }
}

function testEbHatchNeedsAStatedReason() {
  console.log("\nE-B / AC-004: the transition hatch requires a stated reason and echoes it");
  const withReason = buildProjectAtVerified("eb-hatch-yes");
  try {
    dirty(withReason, path.join("src", "app.js"), "// uncommitted\n");
    const r = closeIt(withReason, { "allow-uncommitted-delivery": true, "uncommitted-reason": "docs-only follow-up, nothing to commit" });
    assert(r.ok, `the hatch WITH a reason permits DONE (got: ${r.ok ? "ok" : r.message})`);
  } finally { rmrf(withReason.projectRoot); rmrf(withReason.approvalRoot); }

  const noReason = buildProjectAtVerified("eb-hatch-no");
  try {
    dirty(noReason, path.join("src", "app.js"), "// uncommitted\n");
    const r = closeIt(noReason, { "allow-uncommitted-delivery": true });
    assert(!r.ok, "the hatch WITHOUT a reason is refused, so the exemption cannot be silent");
    assert(!r.ok && /reason/i.test(r.message), "the refusal names the missing reason");
  } finally { rmrf(noReason.projectRoot); rmrf(noReason.approvalRoot); }
}

function testEbEmptyScopeRefusesRatherThanPassesVacuously() {
  console.log("\nE-B / EDGE-005: an empty granted_write_paths refuses rather than passing vacuously");
  const ctx = buildProjectAtVerified("eb-empty-item");
  try {
    // The guard reads the PERSISTED report, which is the same object the CLI loads
    // before calling applyAction - so in the real flow the in-memory and on-disk scopes
    // cannot diverge. Emptying only the in-memory copy would construct a divergence that
    // is unreachable through the real path, and would test nothing.
    ctx.report.granted_write_paths = [];
    const reportPath = path.join(ctx.workflowRoot, `${ctx.report.work_item_slug}.work-item-report.json`);
    const persisted = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    persisted.granted_write_paths = [];
    try { fs.chmodSync(reportPath, 0o644); } catch (_e) {}
    fs.writeFileSync(reportPath, JSON.stringify(persisted, null, 2) + "\n");
    const r = closeIt(ctx);
    assert(!r.ok, "an empty declared scope is not evidence of a clean tree, so DONE is refused");
  } finally { rmrf(ctx.projectRoot); rmrf(ctx.approvalRoot); }
}

function testEbOutsideGitIsSilent() {
  console.log("\nE-B / EDGE-006: outside a git repository the guard stays silent (consistent with L-02)");
  const ctx = buildProjectAtVerified("eb-nogit-item", { withGit: false });
  try {
    const r = closeIt(ctx);
    assert(r.ok && r.report.protocol_status === "DONE", `no git history means nothing to verify, so DONE proceeds (got: ${r.ok ? r.report.protocol_status : r.message})`);
  } finally { rmrf(ctx.projectRoot); rmrf(ctx.approvalRoot); }
}


// T5 review checkpoint, learned from the sibling work item: its equivalent guard was
// first placed in a function the dod approve path never called, so the unit test passed
// while the real command was unguarded. The tests above call applyAction directly, which
// BYPASSES parseCliArgs - so they prove the guard, not the flag wiring. This drives the
// actual CLI so --allow-uncommitted-delivery and --uncommitted-reason are proven to reach it.
function testEbGuardIsOnTheRealCliPath() {
  console.log("\nE-B / T5 checkpoint: the guard is on the path the close CLI actually calls");
  const ctx = buildProjectAtVerified("eb-cli-item");
  const script = path.resolve(__dirname, "..", "scripts", "work-item-protocol.js");
  const env = {
    ...process.env,
    WORKFLOW_BUNDLE_APPROVAL_ROOT: ctx.approvalRoot,
    WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT: "true"
  };
  const run = (extra) => {
    try {
      return { status: 0, out: execFileSync(process.execPath,
        [script, "close", "--work-item", ctx.report.work_item_slug, "--project-root", ctx.projectRoot,
         "--workflow-root", path.dirname(ctx.workflowRoot), ...extra],
        { env, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }) };
    } catch (e) {
      return { status: e.status === undefined ? 1 : e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
    }
  };
  try {
    dirty(ctx, path.join("src", "app.js"), "// uncommitted after the seal\n");

    const refused = run([]);
    assert(refused.status !== 0, "the real close CLI refuses over a dirty declared path");
    assert(/src/.test(refused.out), "the CLI refusal names the offending path");

    const waived = run(["--allow-uncommitted-delivery", "--uncommitted-reason", "branch-parked on purpose"]);
    assert(waived.status === 0, `the CLI hatch flags actually reach the guard (got: ${waived.out.split("\n")[0]})`);
    assert(/WAIVED/.test(waived.out) && /branch-parked on purpose/.test(waived.out),
      "the CLI echoes the waiver and its reason, so the exemption is visible in the operator's output");
  } finally { rmrf(ctx.projectRoot); rmrf(ctx.approvalRoot); }
}

console.log("Running work-item-protocol (Light) tests...\n");
testEnsureLightLazyStepNoteCreatesS07S08();
testEnsureLightLazyNoopForNonLight();
testApproveReadyBundleSealsFourIndependentReceipts();
testFailedVerifyDoesNotLeavePrematureS08();
testStaleDigestFixtureIsRejected();
testContradictoryProtocolStateFixtureIsRejected();
testEbCleanTreeStillReachesDone();
testEbDirtyDeclaredPathRefusedAtTransition();
testEbHatchNeedsAStatedReason();
testEbEmptyScopeRefusesRatherThanPassesVacuously();
testEbOutsideGitIsSilent();
testEbGuardIsOnTheRealCliPath();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in work-item-protocol-light.test.js`);
  process.exit(1);
}
console.log("\nAll work-item-protocol (Light) tests passed.");
