const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { ensureLightLazyStepNote } = require("../scripts/work-item-protocol");
const {
  loadTrustedApprovalReceipt,
  hasApprovedReceipt,
  normalizeTrustedApprovalReceipt,
  resolveGateArtifact
} = require("../scripts/workflow-trusted-approval-utils");
const { normalizeProtocolReport, renderProtocolBlock } = require("../scripts/work-item-protocol-utils");
const {
  getProtocolStateContradictionErrors,
  getTrustedReceiptArtifactErrors
} = require("../scripts/workflow-gate-evidence-utils");
const { APPROVAL_TRANSACTION_FAILURE_POINTS } = require("../scripts/workflow-approval-transaction");

const governanceFixtureRoot = path.join(__dirname, "..", "tests", "fixtures", "workflow-governance");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function testLegacyReceiptV1AndAdaptiveProtocolDualRead() {
  const legacyReceipt = {
    schema_version: 1,
    kind: "gate",
    approval_status: "APPROVED",
    reviewed_by: "qc",
    reviewed_at: "2026-08-29T04:37:56Z",
    signature: "legacy-signature"
  };
  const normalizedReceipt = normalizeTrustedApprovalReceipt(legacyReceipt);
  assert(normalizedReceipt.artifact_shape === "legacy_receipt_v1", "schema v1 receipt must be identified as legacy v1");
  assert(
    JSON.stringify(normalizedReceipt.receipt) === JSON.stringify(legacyReceipt),
    "schema v1 receipt payload must remain byte-field compatible and must not be rewritten"
  );

  const legacyReport = normalizeProtocolReport({ work_item_slug: "legacy-item" });
  assert(!Object.prototype.hasOwnProperty.call(legacyReport, "artifact_shape"), "legacy report normalization must not force adaptive fields");
  const adaptiveReport = normalizeProtocolReport({
    work_item_slug: "adaptive-item",
    artifact_shape: "adaptive_v1",
    request_lane: "maintenance",
    workflow_required: true,
    routing_reasons: ["LANE_MAINTENANCE"],
    escalation_reasons: [],
    roles: [{ role: "developer", reasons: ["ROLE_DEVELOPER_BOUNDED_CHANGE"] }],
    gates: [{ gate: "task_plan", reasons: ["GATE_TASK_PLAN_BOUNDED_CHANGE"], reviewer_roles: ["developer"] }],
    adaptive_activation: {
      source_version: "2.6.1",
      installed_versions: ["2.6.4"],
      parity_passed: true
    }
  });
  assert(adaptiveReport.request_lane === "maintenance", "adaptive report reader must preserve request lane");
  assert(adaptiveReport.roles.length === 1 && adaptiveReport.gates.length === 1, "adaptive report reader must preserve reasoned roles/gates");
  const block = renderProtocolBlock(adaptiveReport);
  assert(/artifact_shape: adaptive_v1/.test(block), "adaptive protocol block must expose its shape");
  assert(/request_lane: maintenance/.test(block), "adaptive protocol block must expose request lane");
  console.log("  PASS: receipt v1 and protocol reports dual-read without rewriting legacy shape");
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

function listFilesRecursively(target) {
  if (!fs.existsSync(target)) return [];
  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(target, entry.name);
    return entry.isDirectory() ? listFilesRecursively(child) : [child];
  });
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

function writeReadinessProtocolReport({ projectRoot, workflowRoot, slug }) {
  const report = normalizeProtocolReport({
    artifact_shape: "adaptive_v1",
    materialization_status: "MATERIALIZED",
    protocol_status: "MATERIALIZED",
    decision_owner: "agent",
    protocol_owner: "developer",
    work_item_slug: slug,
    work_item_type: "FEATURE",
    delivery_context: "brownfield",
    workflow_root: path.relative(projectRoot, workflowRoot),
    current_step: "s06",
    review_required: true,
    approval_status: "APPROVED",
    reviewed_by: "po",
    reviewed_at: "2026-07-16T00:00:00Z",
    handoff_target: "readiness-review",
    required_actions: [
      `wfc gate approve --work-item ${slug} --gate spec --reviewed-by po`,
      `wfc gate approve --work-item ${slug} --gate dor --reviewed-by po`,
      `wfc gate approve --work-item ${slug} --gate approach --reviewed-by tech-lead`,
      `wfc gate approve --work-item ${slug} --gate task_plan --reviewed-by tech-lead`,
      `wfc work-item activate --work-item ${slug} --step s07 --write-root <path>`
    ],
    blockers: [],
    audit_events: ["WORK_ITEM_APPROVED"],
    request_lane: "product_delivery",
    workflow_required: true,
    routing_reasons: ["LANE_PRODUCT_DELIVERY"],
    escalation_reasons: [],
    roles: [
      { role: "ba", reasons: ["ROLE_BA_PRODUCT_REQUIREMENTS"] },
      { role: "developer", reasons: ["ROLE_DEVELOPER_DELIVERY"] },
      { role: "qc", reasons: ["ROLE_QC_VERIFICATION"] }
    ],
    gates: [
      { gate: "spec", reasons: ["GATE_SPEC_PRODUCT_DELIVERY"], reviewer_roles: ["po"] },
      { gate: "dor", reasons: ["GATE_DOR_PRODUCT_DELIVERY"], reviewer_roles: ["po"] },
      { gate: "approach", reasons: ["GATE_APPROACH_PRODUCT_DELIVERY"], reviewer_roles: ["tech-lead"] },
      { gate: "task_plan", reasons: ["GATE_TASK_PLAN_PRODUCT_DELIVERY"], reviewer_roles: ["tech-lead"] }
    ],
    adaptive_activation: {
      source_version: "2.6.1",
      installed_versions: ["2.6.1"],
      parity_passed: true
    }
  });
  const reportPath = path.join(workflowRoot, `${slug}.work-item-report.json`);
  writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  return reportPath;
}

function makeCloseoutHostNoteFrontmatter(slug, terminalGates) {
  const gateRoles = {
    dod: "qc",
    uat: "qc",
    release: "devops",
    business_acceptance: "po"
  };
  const allTerminal = ["dod", "uat", "release", "business_acceptance"];
  return [
    "---",
    `artifact_id: "${slug}.s08.verification"`,
    "artifact_family: workflow-step",
    `work_item_slug: "${slug}"`,
    'step_id: "s08"',
    'step_slug: "verification"',
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
    "sdd_mode: none",
    "spec_refs:",
    '  card: ""',
    "spec_status: approved",
    "planning_track: quick",
    "execution_mode: agentic",
    "review_mode: self",
    "approval_gates:",
    ...allTerminal.map((gate) => `  ${gate}: "${terminalGates.includes(gate) ? "required" : "not_applicable"}"`),
    "role_signoffs:",
    ...allTerminal.flatMap((gate) => [`  ${gate}:`, `    - "${gateRoles[gate]}"`]),
    "gate_reviews:",
    ...allTerminal.flatMap((gate) => [
      `  ${gate}_reviewed_by:`,
      `    - "${gateRoles[gate]}"`,
      `  ${gate}_reviewed_at: "2026-07-17T00:00:00Z"`
    ]),
    "upstream_artifacts: []",
    "linked_artifacts: []",
    "tags: []",
    "---",
    ""
  ].join("\n");
}

function buildCloseoutProject(slug, terminalGates) {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-closeout-"));
  const workflowRoot = path.join(projectRoot, "work-items", slug);
  writeFile(path.join(workflowRoot, `${slug}.s01.restate.md`), makeS01Frontmatter(slug, "none") + "# s01\n");
  writeFile(
    path.join(workflowRoot, `${slug}.s08.verification.md`),
    makeCloseoutHostNoteFrontmatter(slug, terminalGates) +
      "# s08\n\n## Technical Verification\n```yaml\nverdict: PASS\n```\n\n## Definition of Done\n```yaml\nverdict: READY_FOR_REVIEW\n```\n"
  );
  const reviewers = { dod: "qc", uat: "qc", release: "devops", business_acceptance: "po" };
  const report = normalizeProtocolReport({
    artifact_shape: "adaptive_v1",
    materialization_status: "MATERIALIZED",
    protocol_status: "VERIFIED",
    decision_owner: "agent",
    protocol_owner: "developer",
    work_item_slug: slug,
    work_item_type: "FEATURE",
    delivery_context: "brownfield",
    workflow_root: path.relative(projectRoot, workflowRoot),
    current_step: "s08",
    review_required: true,
    approval_status: "APPROVED",
    reviewed_by: "po",
    reviewed_at: "2026-07-16T00:00:00Z",
    handoff_target: "closeout-review",
    required_actions: [
      ...terminalGates.map((gate) => `wfc gate approve --work-item ${slug} --gate ${gate} --reviewed-by ${reviewers[gate]}`),
      `wfc work-item close --work-item ${slug}`
    ],
    blockers: [],
    audit_events: ["VERIFICATION_CONFIRMED"],
    request_lane: terminalGates.length === 1 ? "maintenance" : "product_delivery",
    workflow_required: true,
    routing_reasons: [terminalGates.length === 1 ? "LANE_MAINTENANCE" : "LANE_PRODUCT_DELIVERY"],
    escalation_reasons: [],
    roles: [
      { role: "developer", reasons: ["ROLE_DEVELOPER_DELIVERY"] },
      { role: "qc", reasons: ["ROLE_QC_VERIFICATION"] }
    ],
    gates: terminalGates.map((gate) => ({
      gate,
      reasons: [`GATE_${gate.toUpperCase()}_CLOSEOUT`],
      reviewer_roles: [reviewers[gate]]
    })),
    adaptive_activation: {
      source_version: "2.6.1",
      installed_versions: ["2.6.1"],
      parity_passed: true
    }
  });
  const reportPath = path.join(workflowRoot, `${slug}.work-item-report.json`);
  writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  return { projectRoot, workflowRoot, reportPath };
}

// A supported pre-adaptive report has no artifact_shape or reasoned gates array.
// Its s08 may also predate an explicit approval_gates.dod key, while the finalized
// host contract still requires DoD through role_signoffs and gate_reviews.
function buildLegacyCloseoutProject(slug, optionalTerminalGates, { omitApprovalGates = false } = {}) {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-closeout-legacy-"));
  const workflowRoot = path.join(projectRoot, "work-items", slug);
  const gateRoles = { dod: "qc", uat: "qc", release: "devops", business_acceptance: "po" };
  const terminalGates = ["dod", ...optionalTerminalGates];
  let hostFrontmatter = makeCloseoutHostNoteFrontmatter(slug, terminalGates);
  hostFrontmatter = omitApprovalGates
    ? hostFrontmatter.replace(
        /approval_gates:\n(?:  (?:dod|uat|release|business_acceptance): "[^"]+"\n)+/,
        ""
      )
    : hostFrontmatter.replace(/^  dod: "required"\n/m, "");

  writeFile(path.join(workflowRoot, `${slug}.s01.restate.md`), makeS01Frontmatter(slug, "none") + "# s01\n");
  const hostPath = path.join(workflowRoot, `${slug}.s08.verification.md`);
  writeFile(
    hostPath,
    hostFrontmatter +
      "# s08\n\n## Technical Verification\n```yaml\nverdict: PASS\n```\n\n## Definition of Done\n```yaml\nverdict: READY_FOR_REVIEW\n```\n"
  );

  const report = normalizeProtocolReport({
    materialization_status: "MATERIALIZED",
    protocol_status: "VERIFIED",
    decision_owner: "agent",
    protocol_owner: "developer",
    work_item_slug: slug,
    work_item_type: "FEATURE",
    delivery_context: "brownfield",
    workflow_root: path.relative(projectRoot, workflowRoot),
    current_step: "s08",
    review_required: true,
    approval_status: "APPROVED",
    reviewed_by: "po",
    reviewed_at: "2026-07-16T00:00:00Z",
    handoff_target: "closeout-review",
    required_actions: [
      ...terminalGates.map((gate) => `wfc gate approve --work-item ${slug} --gate ${gate} --reviewed-by ${gateRoles[gate]}`),
      `wfc work-item close --work-item ${slug}`
    ],
    blockers: [],
    audit_events: ["VERIFICATION_CONFIRMED"]
  });
  const reportPath = path.join(workflowRoot, `${slug}.work-item-report.json`);
  writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  return { projectRoot, workflowRoot, reportPath, hostPath };
}

function runGateCommand(scriptPath, args, env) {
  try {
    return {
      status: 0,
      stdout: execFileSync(process.execPath, [scriptPath, ...args], {
        env,
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"]
      }),
      stderr: ""
    };
  } catch (error) {
    return {
      status: error.status || 1,
      stdout: String(error.stdout || ""),
      stderr: String(error.stderr || "")
    };
  }
}

function buildCloseoutApprovalFixture(prefix) {
  const approvalRoot = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  return {
    approvalRoot,
    env: {
      ...process.env,
      WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
      WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
      WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot
    }
  };
}

function runCloseoutFixture({ slug, projectRoot, workflowRoot, approvalRoot, env, extraArgs = [] }) {
  return runGateCommand(
    path.resolve(__dirname, "..", "scripts", "workflow-gate-review.js"),
    [
      "approve-closeout-bundle",
      "--work-item", slug,
      "--project-root", projectRoot,
      "--workflow-root", path.dirname(workflowRoot),
      "--approval-root", approvalRoot,
      ...extraArgs
    ],
    env
  );
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
  const telemetryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-telemetry-"));
  const workflowRootBase = path.dirname(workflowRoot);
  const scriptPath = path.resolve(__dirname, "..", "scripts", "workflow-gate-review.js");
  const childEnv = {
    ...process.env,
    WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
    WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
    WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot
  };
  try {
    const reportPath = writeReadinessProtocolReport({ projectRoot, workflowRoot, slug });
    const stdout = execFileSync(
      process.execPath,
      [
        scriptPath,
        "approve-ready-bundle",
        "--work-item", slug,
        "--project-root", projectRoot,
        "--workflow-root", workflowRootBase,
        "--approval-root", approvalRoot,
        "--telemetry", "true",
        "--telemetry-out", telemetryRoot
      ],
      { env: childEnv, encoding: "utf8" }
    );
    const summary = JSON.parse(stdout);
    assert(summary.action === "approve-ready-bundle", "ready-bundle must emit action summary");
    assert(Array.isArray(summary.sealed_gates) && summary.sealed_gates.length === 4, `ready-bundle must seal 4 gates, got ${summary.sealed_gates && summary.sealed_gates.length}`);
    assert(summary.sdd_mode === "light", "ready-bundle must detect light profile");
    assert(summary.transaction && summary.transaction.status === "COMMITTED", "ready-bundle must commit through the journaled transaction coordinator");
    assert(summary.approval_plan && summary.approval_plan.gates.length === 4, "ready-bundle must return the complete human summary used for approval");

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

    const reconciled = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    assert(
      reconciled.required_actions.length === 1 && /work-item activate/.test(reconciled.required_actions[0]),
      `readiness reconciliation must leave only the activation action, got ${JSON.stringify(reconciled.required_actions)}`
    );
    assert(reconciled.blockers.length === 0, "approved readiness reconciliation must leave no stale gate blocker");
    assert(reconciled.audit_events.includes("READINESS_BUNDLE_APPROVED"), "protocol report records the atomic readiness approval event");
    const s01 = fs.readFileSync(path.join(workflowRoot, `${slug}.s01.restate.md`), "utf8");
    assert(!/wfc gate approve/.test(s01) && /wfc work-item activate/.test(s01), "s01 protocol block is reconciled in the same transaction");

    const firstTelemetryFiles = fs.readdirSync(telemetryRoot).filter((name) => name.endsWith(".json"));
    assert(firstTelemetryFiles.length === 1, `committed approval bundle emits one opt-in event, got ${firstTelemetryFiles.length}`);
    if (firstTelemetryFiles.length === 1) {
      const telemetry = JSON.parse(fs.readFileSync(path.join(telemetryRoot, firstTelemetryFiles[0]), "utf8"));
      const serialized = JSON.stringify(telemetry);
      assert(telemetry.event_type === "approval_bundle" && telemetry.outcome === "approved", "bundle adapter records bounded event type and outcome");
      assert(telemetry.request_lane === "product_delivery", "bundle adapter records the selected request lane");
      assert(telemetry.role_count === 3 && telemetry.gate_count === 4, "bundle adapter records only role and gate counts");
      assert(telemetry.interaction_count === 1 && telemetry.retry_count === 0, "first bundle interaction is not a retry");
      assert(/^wi_[a-f0-9]{24}$/.test(telemetry.work_item_id), "bundle adapter pseudonymizes the work item");
      assert(!serialized.includes(slug) && !("approval_plan" in telemetry), "bundle telemetry stores no slug, plan, receipt, digest, or note body");
    }

    const receiptBeforeRetry = fs.readFileSync(specReceipt.receiptPath, "utf8");
    const retry = JSON.parse(
      execFileSync(
        process.execPath,
        [
          scriptPath,
          "approve-ready-bundle",
          "--work-item", slug,
          "--project-root", projectRoot,
          "--workflow-root", workflowRootBase,
          "--approval-root", approvalRoot,
          "--telemetry", "true",
          "--telemetry-out", telemetryRoot
        ],
        { env: childEnv, encoding: "utf8" }
      )
    );
    assert(retry.transaction.status === "NOOP", "an exact duplicate ready-bundle retry is idempotent");
    assert(fs.readFileSync(specReceipt.receiptPath, "utf8") === receiptBeforeRetry, "an idempotent retry does not rewrite signed receipt v1");
    const afterRetry = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    assert(
      afterRetry.protocol_events.filter((event) => event.action === "approve-readiness-bundle").length === 1,
      "an idempotent retry does not duplicate protocol approval events"
    );
    const retryTelemetryFiles = fs.readdirSync(telemetryRoot).filter((name) => name.endsWith(".json"));
    assert(retryTelemetryFiles.length === 2, "idempotent retry records a second interaction event without changing governance state");
    if (retryTelemetryFiles.length === 2) {
      const retryEvents = retryTelemetryFiles.map((name) => JSON.parse(fs.readFileSync(path.join(telemetryRoot, name), "utf8")));
      assert(retryEvents.some((event) => event.retry_count === 1 && event.outcome === "approved"), "NOOP retry is observable only as a bounded retry count");
    }

    console.log("  PASS: approve-ready-bundle (4 independent receipts, approach->s06, per-gate reviewer)");
  } finally {
    rmrf(projectRoot);
    rmrf(approvalRoot);
    rmrf(telemetryRoot);
  }
}

function testReadyBundlePreflightsEveryReviewerBeforeWriting() {
  const slug = "proto-ready-preflight-item";
  const { projectRoot, workflowRoot } = buildLightProject(slug);
  const approvalRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-approvals-preflight-"));
  const workflowRootBase = path.dirname(workflowRoot);
  const scriptPath = path.resolve(__dirname, "..", "scripts", "workflow-gate-review.js");
  const childEnv = {
    ...process.env,
    WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
    WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
    WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot
  };
  try {
    const reportPath = writeReadinessProtocolReport({ projectRoot, workflowRoot, slug });
    const s06Path = path.join(workflowRoot, `${slug}.s06.task-breakdown.md`);
    fs.writeFileSync(
      s06Path,
      fs.readFileSync(s06Path, "utf8").replace('  task_plan_reviewed_by: ["tech-lead"]', "  task_plan_reviewed_by: []"),
      "utf8"
    );
    const reportBefore = fs.readFileSync(reportPath, "utf8");
    const s01Path = path.join(workflowRoot, `${slug}.s01.restate.md`);
    const s01Before = fs.readFileSync(s01Path, "utf8");
    let outcome;
    try {
      outcome = {
        status: 0,
        output: execFileSync(
          process.execPath,
          [scriptPath, "approve-ready-bundle", "--work-item", slug, "--project-root", projectRoot, "--workflow-root", workflowRootBase, "--approval-root", approvalRoot],
          { env: childEnv, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
        )
      };
    } catch (error) {
      outcome = { status: error.status || 1, output: `${error.stdout || ""}${error.stderr || ""}` };
    }
    assert(outcome.status !== 0 && /task_plan_reviewed_by/.test(outcome.output), "missing reviewer fails during complete bundle preflight");
    ["spec", "dor", "approach", "task_plan"].forEach((gate) => {
      const loaded = loadTrustedApprovalReceipt({ projectRoot, overrideRoot: approvalRoot, kind: "gate", workItemSlug: slug, gate });
      assert(!loaded.receipt, `preflight failure writes zero receipts, including ${gate}`);
    });
    assert(fs.readFileSync(reportPath, "utf8") === reportBefore, "reviewer preflight failure leaves the protocol report byte-identical");
    assert(fs.readFileSync(s01Path, "utf8") === s01Before, "reviewer preflight failure leaves the s01 protocol surface byte-identical");
  } finally {
    rmrf(projectRoot);
    rmrf(approvalRoot);
  }
}

function testRejectReadyBundleKeepsIndependentDecisionEvidence() {
  const slug = "proto-ready-reject-item";
  const { projectRoot, workflowRoot } = buildLightProject(slug);
  const approvalRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-approvals-reject-"));
  const workflowRootBase = path.dirname(workflowRoot);
  const scriptPath = path.resolve(__dirname, "..", "scripts", "workflow-gate-review.js");
  const childEnv = {
    ...process.env,
    WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
    WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
    WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot
  };
  try {
    const reportPath = writeReadinessProtocolReport({ projectRoot, workflowRoot, slug });
    const stdout = execFileSync(
      process.execPath,
      [scriptPath, "reject-ready-bundle", "--work-item", slug, "--project-root", projectRoot, "--workflow-root", workflowRootBase, "--approval-root", approvalRoot],
      { env: childEnv, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
    );
    const summary = JSON.parse(stdout);
    assert(summary.action === "reject-ready-bundle" && summary.transaction.status === "COMMITTED", "ready-bundle rejection is one journaled transaction");
    ["spec", "dor", "approach", "task_plan"].forEach((gate) => {
      const loaded = loadTrustedApprovalReceipt({ projectRoot, overrideRoot: approvalRoot, kind: "gate", workItemSlug: slug, gate });
      assert(loaded.receipt && loaded.receipt.approval_status === "REJECTED", `rejection keeps independent ${gate} evidence`);
    });
    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    assert(report.blockers.some((entry) => /readiness bundle rejected/i.test(entry)), "rejected bundle adds an explicit activation blocker");
    assert(report.required_actions.some((entry) => /resolve rejected readiness/i.test(entry)), "rejected bundle records a concrete rework action");
  } finally {
    rmrf(projectRoot);
    rmrf(approvalRoot);
  }
}

function testMaintenanceCloseoutBundlesOnlyDod() {
  const slug = "proto-maintenance-closeout-item";
  const { projectRoot, workflowRoot, reportPath } = buildCloseoutProject(slug, ["dod"]);
  const approvalRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-closeout-maintenance-approvals-"));
  const scriptPath = path.resolve(__dirname, "..", "scripts", "workflow-gate-review.js");
  const env = {
    ...process.env,
    WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
    WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
    WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot
  };
  try {
    const outcome = runGateCommand(
      scriptPath,
      ["approve-closeout-bundle", "--work-item", slug, "--project-root", projectRoot, "--workflow-root", path.dirname(workflowRoot), "--approval-root", approvalRoot],
      env
    );
    assert(outcome.status === 0, `maintenance closeout command succeeds (got: ${outcome.stderr.split("\n")[0]})`);
    if (outcome.status !== 0) return;
    const summary = JSON.parse(outcome.stdout);
    assert(summary.transaction.status === "COMMITTED", "maintenance closeout uses the journaled coordinator");
    assert(summary.sealed_gates.map((entry) => entry.gate).join(",") === "dod", "maintenance closeout seals DoD only");
    ["release", "business_acceptance"].forEach((gate) => {
      const loaded = loadTrustedApprovalReceipt({ projectRoot, overrideRoot: approvalRoot, kind: "gate", workItemSlug: slug, gate });
      assert(!loaded.receipt, `maintenance closeout emits no ${gate} receipt`);
    });
    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    assert(report.required_actions.length === 1 && /work-item close/.test(report.required_actions[0]), "maintenance reconciliation leaves only the close transition");
    assert(report.audit_events.includes("CLOSEOUT_BUNDLE_APPROVED"), "maintenance report records closeout bundle approval");
  } finally {
    rmrf(projectRoot);
    rmrf(approvalRoot);
  }
}

function testProductReleaseCloseoutKeepsConfiguredAuthority() {
  const slug = "proto-product-closeout-item";
  const gates = ["dod", "release", "business_acceptance"];
  const { projectRoot, workflowRoot, reportPath } = buildCloseoutProject(slug, gates);
  const approvalRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-closeout-product-approvals-"));
  const scriptPath = path.resolve(__dirname, "..", "scripts", "workflow-gate-review.js");
  const env = {
    ...process.env,
    WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
    WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
    WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot
  };
  try {
    const outcome = runGateCommand(
      scriptPath,
      ["approve-closeout-bundle", "--work-item", slug, "--project-root", projectRoot, "--workflow-root", path.dirname(workflowRoot), "--approval-root", approvalRoot],
      env
    );
    assert(outcome.status === 0, `product closeout command succeeds (got: ${outcome.stderr.split("\n")[0]})`);
    if (outcome.status !== 0) return;
    const summary = JSON.parse(outcome.stdout);
    assert(summary.sealed_gates.map((entry) => entry.gate).join(",") === gates.join(","), "product closeout keeps DoD, Release and Business Acceptance in order");
    const expectedReviewers = { dod: "qc", release: "devops", business_acceptance: "po" };
    gates.forEach((gate) => {
      const loaded = loadTrustedApprovalReceipt({ projectRoot, overrideRoot: approvalRoot, kind: "gate", workItemSlug: slug, gate });
      assert(loaded.receipt && loaded.receipt.approval_status === "APPROVED", `${gate} has an independent approved receipt`);
      assert(loaded.receipt && loaded.receipt.reviewed_by === expectedReviewers[gate], `${gate} retains its configured reviewer authority`);
    });
    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    assert(report.required_actions.length === 1 && /work-item close/.test(report.required_actions[0]), "product closeout removes every stale terminal gate action");
  } finally {
    rmrf(projectRoot);
    rmrf(approvalRoot);
  }
}

function testLegacyMaintenanceCloseoutRestoresImplicitDod() {
  const slug = "proto-legacy-maintenance-closeout-item";
  const { projectRoot, workflowRoot, reportPath, hostPath } = buildLegacyCloseoutProject(slug, [], { omitApprovalGates: true });
  const { approvalRoot, env } = buildCloseoutApprovalFixture("proto-closeout-legacy-maintenance-approvals-");
  try {
    const reportBefore = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    const hostContent = fs.readFileSync(hostPath, "utf8");
    assert(!Object.prototype.hasOwnProperty.call(reportBefore, "artifact_shape"), "legacy maintenance fixture omits artifact_shape");
    assert(!Object.prototype.hasOwnProperty.call(reportBefore, "gates"), "legacy maintenance fixture omits adaptive gates");
    assert(!/^approval_gates:/m.test(hostContent), "legacy maintenance s08 omits the whole approval_gates block");

    const outcome = runCloseoutFixture({ slug, projectRoot, workflowRoot, approvalRoot, env });
    assert(outcome.status === 0, `legacy maintenance closeout restores implicit DoD (got: ${outcome.stderr.split("\n")[0]})`);
    if (outcome.status !== 0) return;
    const summary = JSON.parse(outcome.stdout);
    assert(summary.sealed_gates.map((entry) => entry.gate).join(",") === "dod", "legacy maintenance closeout seals exactly DoD");
  } finally {
    rmrf(projectRoot);
    rmrf(approvalRoot);
  }
}

function testLegacyProductReleaseCloseoutRestoresImplicitDod() {
  const slug = "proto-legacy-product-closeout-item";
  const expectedGates = ["dod", "release", "business_acceptance"];
  const { projectRoot, workflowRoot, reportPath, hostPath } = buildLegacyCloseoutProject(slug, ["release", "business_acceptance"]);
  const { approvalRoot, env } = buildCloseoutApprovalFixture("proto-closeout-legacy-product-approvals-");
  try {
    const reportBefore = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    const hostContent = fs.readFileSync(hostPath, "utf8");
    const approvalBlock = hostContent.match(/approval_gates:\n([\s\S]*?)role_signoffs:/)[1];
    assert(!Object.prototype.hasOwnProperty.call(reportBefore, "artifact_shape"), "legacy product fixture omits artifact_shape");
    assert(!Object.prototype.hasOwnProperty.call(reportBefore, "gates"), "legacy product fixture omits adaptive gates");
    assert(!/^\s+dod:/m.test(approvalBlock), "legacy product s08 omits approval_gates.dod");

    const outcome = runCloseoutFixture({ slug, projectRoot, workflowRoot, approvalRoot, env });
    assert(outcome.status === 0, `legacy product closeout command succeeds (got: ${outcome.stderr.split("\n")[0]})`);
    if (outcome.status !== 0) return;
    const summary = JSON.parse(outcome.stdout);
    assert(summary.transaction.status === "COMMITTED", "legacy product closeout commits one transaction");
    assert(
      summary.sealed_gates.map((entry) => entry.gate).join(",") === expectedGates.join(","),
      "legacy product closeout restores DoD before configured Release and Business Acceptance"
    );
    const expectedReviewers = { dod: "qc", release: "devops", business_acceptance: "po" };
    expectedGates.forEach((gate) => {
      const loaded = loadTrustedApprovalReceipt({ projectRoot, overrideRoot: approvalRoot, kind: "gate", workItemSlug: slug, gate });
      assert(Boolean(loaded.receipt), `legacy product closeout emits an independent ${gate} receipt`);
      assert(loaded.receipt && loaded.receipt.reviewed_by === expectedReviewers[gate], `legacy ${gate} receipt retains ${expectedReviewers[gate]} authority`);
    });

    const s01Path = path.join(workflowRoot, `${slug}.s01.restate.md`);
    const reportAfter = fs.readFileSync(reportPath, "utf8");
    const s01After = fs.readFileSync(s01Path, "utf8");
    const normalizedAfter = JSON.parse(reportAfter);
    assert(
      normalizedAfter.required_actions.length === 1 && /work-item close/.test(normalizedAfter.required_actions[0]),
      "legacy product reconciliation removes every terminal gate action"
    );
    assert(
      normalizedAfter.audit_events.filter((event) => event === "CLOSEOUT_BUNDLE_APPROVED").length === 1,
      "legacy product reconciliation records one closeout approval event"
    );
    assert(/CLOSEOUT_BUNDLE_APPROVED/.test(s01After), "legacy product s01 mirrors the reconciled closeout event");

    const retry = runCloseoutFixture({ slug, projectRoot, workflowRoot, approvalRoot, env });
    assert(retry.status === 0, `unchanged legacy product closeout retry succeeds (got: ${retry.stderr.split("\n")[0]})`);
    if (retry.status === 0) {
      const retrySummary = JSON.parse(retry.stdout);
      assert(retrySummary.transaction.status === "NOOP", "unchanged legacy product retry performs no duplicate transaction writes");
    }
    assert(fs.readFileSync(reportPath, "utf8") === reportAfter, "unchanged legacy product retry leaves report byte-identical");
    assert(fs.readFileSync(s01Path, "utf8") === s01After, "unchanged legacy product retry leaves s01 byte-identical");
  } finally {
    rmrf(projectRoot);
    rmrf(approvalRoot);
  }
}

function testLegacyCloseoutKeepsOptionalTerminalGatesIndependent() {
  ["release", "business_acceptance"].forEach((optionalGate) => {
    const slug = `proto-legacy-${optionalGate.replace(/_/g, "-")}-closeout-item`;
    const { projectRoot, workflowRoot } = buildLegacyCloseoutProject(slug, [optionalGate]);
    const { approvalRoot, env } = buildCloseoutApprovalFixture("proto-closeout-legacy-optional-approvals-");
    try {
      const outcome = runCloseoutFixture({ slug, projectRoot, workflowRoot, approvalRoot, env });
      assert(outcome.status === 0, `legacy closeout with only ${optionalGate} succeeds (got: ${outcome.stderr.split("\n")[0]})`);
      if (outcome.status !== 0) return;
      const summary = JSON.parse(outcome.stdout);
      assert(
        summary.sealed_gates.map((entry) => entry.gate).join(",") === ["dod", optionalGate].join(","),
        `legacy closeout selects DoD plus only configured ${optionalGate}`
      );
      const excludedGate = optionalGate === "release" ? "business_acceptance" : "release";
      const excluded = loadTrustedApprovalReceipt({ projectRoot, overrideRoot: approvalRoot, kind: "gate", workItemSlug: slug, gate: excludedGate });
      assert(!excluded.receipt, `legacy closeout does not add unconfigured ${excludedGate}`);
    } finally {
      rmrf(projectRoot);
      rmrf(approvalRoot);
    }
  });
}

function testLegacyProductCloseoutFailureMatrixLeavesNoPartialState() {
  APPROVAL_TRANSACTION_FAILURE_POINTS.forEach((failurePoint) => {
    const slug = `proto-legacy-closeout-fail-${failurePoint.replace(/_/g, "-")}`;
    const { projectRoot, workflowRoot, reportPath } = buildLegacyCloseoutProject(slug, ["release", "business_acceptance"]);
    const { approvalRoot, env } = buildCloseoutApprovalFixture("proto-closeout-legacy-failure-approvals-");
    const s01Path = path.join(workflowRoot, `${slug}.s01.restate.md`);
    const reportBefore = fs.readFileSync(reportPath, "utf8");
    const s01Before = fs.readFileSync(s01Path, "utf8");
    try {
      const outcome = runCloseoutFixture({
        slug,
        projectRoot,
        workflowRoot,
        approvalRoot,
        env,
        extraArgs: ["--transaction-fail-at", failurePoint]
      });
      assert(outcome.status !== 0, `${failurePoint}: injected legacy closeout failure is observed`);
      ["dod", "release", "business_acceptance"].forEach((gate) => {
        const loaded = loadTrustedApprovalReceipt({ projectRoot, overrideRoot: approvalRoot, kind: "gate", workItemSlug: slug, gate });
        assert(!loaded.receipt, `${failurePoint}: no partial ${gate} receipt remains`);
      });
      assert(fs.readFileSync(reportPath, "utf8") === reportBefore, `${failurePoint}: protocol report remains byte-identical`);
      assert(fs.readFileSync(s01Path, "utf8") === s01Before, `${failurePoint}: s01 remains byte-identical`);
      const transactionResidue = listFilesRecursively(approvalRoot).filter(
        (filePath) => !new Set(["approver-private.pem", "approver-public.pem"]).has(path.basename(filePath))
      );
      assert(transactionResidue.length === 0, `${failurePoint}: no journal, lock, stage, or receipt file remains`);
    } finally {
      rmrf(projectRoot);
      rmrf(approvalRoot);
    }
  });
}

function testWorkItemLifecycleAdapterEmitsBoundedTelemetry() {
  const slug = "proto-private-transition-item";
  const blockerCanary = "PRIVATE_BLOCKER_CANARY_DO_NOT_PERSIST";
  const { projectRoot, workflowRoot } = buildLightProject(slug);
  const telemetryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "proto-transition-telemetry-"));
  const protocolScript = path.resolve(__dirname, "..", "scripts", "work-item-protocol.js");
  try {
    const reportPath = writeReadinessProtocolReport({ projectRoot, workflowRoot, slug });
    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    report.protocol_status = "ACTIVE";
    report.current_step = "s07";
    report.handoff_target = "developer";
    report.blockers = [];
    report.required_actions = ["Continue implementation."];
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

    const outcome = runGateCommand(
      protocolScript,
      [
        "block",
        "--work-item", slug,
        "--project-root", projectRoot,
        "--workflow-root", path.dirname(workflowRoot),
        "--blocker", blockerCanary,
        "--note", blockerCanary,
        "--telemetry", "true",
        "--telemetry-out", telemetryRoot
      ],
      { ...process.env }
    );
    assert(outcome.status === 0, `work-item block transition succeeds (got: ${outcome.stderr.split("\n")[0]})`);
    const eventFiles = fs.readdirSync(telemetryRoot).filter((name) => name.endsWith(".json"));
    assert(eventFiles.length === 1, `work-item transition emits one opt-in event, got ${eventFiles.length}`);
    if (eventFiles.length === 1) {
      const event = JSON.parse(fs.readFileSync(path.join(telemetryRoot, eventFiles[0]), "utf8"));
      const serialized = JSON.stringify(event);
      assert(event.event_type === "work_item_transition" && event.outcome === "blocked", "lifecycle adapter records only transition type and bounded outcome");
      assert(event.role_count === 3 && event.gate_count === 4, "lifecycle adapter records role/gate counts without role identities");
      assert(event.interaction_count === 0 && event.retry_count === 0, "non-approval transition records zero interaction/retry count");
      assert(/^wi_[a-f0-9]{24}$/.test(event.work_item_id), "lifecycle adapter pseudonymizes work-item identity");
      assert(!serialized.includes(slug) && !serialized.includes(blockerCanary), "lifecycle telemetry excludes slug, blocker and free-form note");
    }
  } finally {
    rmrf(projectRoot);
    rmrf(telemetryRoot);
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
    makeHostNoteFrontmatter(slug, "s08", "verification")
      .replace('  spec: "required"', '  spec: "required"\n  dod: "required"')
      .replace(
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

function testCloseoutBundlePreservesUncommittedDeliveryGuard() {
  console.log("\nCR-008 T6: closeout bundle preserves the uncommitted-delivery guard");
  const ctx = buildProjectAtVerified("closeout-bundle-dirty-item");
  const gateScript = path.resolve(__dirname, "..", "scripts", "workflow-gate-review.js");
  try {
    dirty(ctx, path.join("src", "app.js"), "// dirtied before closeout bundle\n");
    const reportPath = path.join(ctx.workflowRoot, `${ctx.report.work_item_slug}.work-item-report.json`);
    const reportBefore = fs.readFileSync(reportPath, "utf8");
    const dodBefore = loadTrustedApprovalReceipt({
      projectRoot: ctx.projectRoot,
      overrideRoot: ctx.approvalRoot,
      kind: "gate",
      workItemSlug: ctx.report.work_item_slug,
      gate: "dod"
    });
    const receiptBefore = fs.readFileSync(dodBefore.receiptPath, "utf8");
    const outcome = runGateCommand(
      gateScript,
      ["approve-closeout-bundle", "--work-item", ctx.report.work_item_slug, "--project-root", ctx.projectRoot, "--workflow-root", path.dirname(ctx.workflowRoot), "--approval-root", ctx.approvalRoot],
      ctx.childEnv
    );
    assert(outcome.status !== 0 && /uncommitted|dirty|src/i.test(`${outcome.stdout}${outcome.stderr}`), "dirty declared delivery blocks the closeout bundle before transaction writes");
    assert(fs.readFileSync(reportPath, "utf8") === reportBefore, "blocked closeout leaves protocol report byte-identical");
    assert(fs.readFileSync(dodBefore.receiptPath, "utf8") === receiptBefore, "blocked closeout does not rewrite the existing DoD receipt");
  } finally {
    rmrf(ctx.projectRoot);
    rmrf(ctx.approvalRoot);
  }
}

console.log("Running work-item-protocol (Light) tests...\n");
testLegacyReceiptV1AndAdaptiveProtocolDualRead();
testEnsureLightLazyStepNoteCreatesS07S08();
testEnsureLightLazyNoopForNonLight();
testApproveReadyBundleSealsFourIndependentReceipts();
testReadyBundlePreflightsEveryReviewerBeforeWriting();
testRejectReadyBundleKeepsIndependentDecisionEvidence();
testMaintenanceCloseoutBundlesOnlyDod();
testProductReleaseCloseoutKeepsConfiguredAuthority();
testLegacyMaintenanceCloseoutRestoresImplicitDod();
testLegacyProductReleaseCloseoutRestoresImplicitDod();
testLegacyCloseoutKeepsOptionalTerminalGatesIndependent();
testLegacyProductCloseoutFailureMatrixLeavesNoPartialState();
testWorkItemLifecycleAdapterEmitsBoundedTelemetry();
testFailedVerifyDoesNotLeavePrematureS08();
testStaleDigestFixtureIsRejected();
testContradictoryProtocolStateFixtureIsRejected();
testEbCleanTreeStillReachesDone();
testEbDirtyDeclaredPathRefusedAtTransition();
testEbHatchNeedsAStatedReason();
testEbEmptyScopeRefusesRatherThanPassesVacuously();
testEbOutsideGitIsSilent();
testEbGuardIsOnTheRealCliPath();
testCloseoutBundlePreservesUncommittedDeliveryGuard();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in work-item-protocol-light.test.js`);
  process.exit(1);
}
console.log("\nAll work-item-protocol (Light) tests passed.");
