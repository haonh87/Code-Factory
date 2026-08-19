// Review fix S2 (AC-06, "no silent skipped invariant"): work item Light khai
// approval_gates.foundation/contract = required KHÔNG được silent-skip — phải
// fail governance validation với guidance escalate full.

const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  ARTIFACT_OWNERSHIP_RULES,
  DEFAULT_ARTIFACT_GOVERNANCE_LAYER_ROOTS,
  getArtifactOwnershipDuplicationErrors,
  getArtifactGovernanceLayerRoots,
  validateWorkflowGovernance
} = require("../scripts/validate-workflow-governance");
const { getFinalizedStepSemanticEvidenceErrors } = require("../scripts/workflow-gate-evidence-utils");

const semanticFixtureRoot = path.join(__dirname, "..", "tests", "fixtures", "workflow-governance");

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

function testArtifactGovernanceLayerRoots() {
  const projectRoot = buildProject();
  try {
    assert(
      JSON.stringify(getArtifactGovernanceLayerRoots(projectRoot)) ===
        JSON.stringify(DEFAULT_ARTIFACT_GOVERNANCE_LAYER_ROOTS),
      "missing artifactGovernance config must inherit the six Code-Factory layer roots"
    );

    const customRoots = {
      spec: "specs",
      design: "delivery",
      plan: "delivery",
      progress: "delivery",
      verify: "evidence",
      decision: "decisions"
    };
    writeFile(
      path.join(projectRoot, "workflow-contracts.config.json"),
      `${JSON.stringify({ artifactGovernance: { layerRoots: customRoots } }, null, 2)}\n`
    );
    assert(
      JSON.stringify(getArtifactGovernanceLayerRoots(projectRoot)) === JSON.stringify(customRoots),
      "artifactGovernance.layerRoots must override the shipped default"
    );
    console.log("  PASS: artifactGovernance layer roots default + custom config");
  } finally {
    rmrf(projectRoot);
  }
}

function copySemanticFixture(name, targetPath) {
  writeFile(targetPath, readSemanticFixture(name));
}

function testArtifactPlacementAndExemption() {
  const projectRoot = buildProject();
  const outsideRoot = path.join(projectRoot, "outside");
  try {
    copySemanticFixture("unplaced-artifact.md", path.join(outsideRoot, "unplaced-artifact.md"));
    let result = validateWorkflowGovernance({ workflowRoot: outsideRoot, projectRoot });
    assert(!result.ok, "artifact outside every declared layer root must fail");
    assert(
      result.errors.some((error) => /no declared artifact-governance layer root/i.test(error)),
      `unplaced error must name the missing declared root, got ${JSON.stringify(result.errors)}`
    );

    rmrf(outsideRoot);
    copySemanticFixture("exemption-without-reason.md", path.join(outsideRoot, "exemption-without-reason.md"));
    result = validateWorkflowGovernance({ workflowRoot: outsideRoot, projectRoot });
    assert(!result.ok, "empty artifact governance exemption reason must fail");
    assert(
      result.errors.some((error) => /exemption reason.*non-empty/i.test(error)),
      `empty exemption error must be explicit, got ${JSON.stringify(result.errors)}`
    );

    rmrf(outsideRoot);
    const statedReason = "External signer requires this artifact to keep an independently addressable path.";
    copySemanticFixture("exemption-with-reason.md", path.join(outsideRoot, "exemption-with-reason.md"));
    result = validateWorkflowGovernance({ workflowRoot: outsideRoot, projectRoot });
    assert(result.ok, `stated artifact governance exemption must pass, got ${JSON.stringify(result.errors)}`);
    assert(
      Array.isArray(result.notices) && result.notices.some((notice) => notice.includes(statedReason)),
      `validation notices must echo the exemption reason, got ${JSON.stringify(result.notices)}`
    );
    console.log("  PASS: artifact placement rejects unplaced/empty exemption and echoes stated reason");
  } finally {
    rmrf(projectRoot);
  }
}

function testCustomLayerRootsAcceptAdopterLayout() {
  const projectRoot = buildProject();
  const slug = "custom-layout-item";
  const defaultRoot = path.join(projectRoot, "work-items", slug);
  const customRoot = path.join(projectRoot, "delivery", slug);
  try {
    writeLightS01(projectRoot, slug, []);
    fs.mkdirSync(path.dirname(customRoot), { recursive: true });
    fs.renameSync(defaultRoot, customRoot);

    let result = validateWorkflowGovernance({ workflowRoot: customRoot, projectRoot });
    assert(!result.ok, "adopter layout without declared roots must inherit the default and fail placement");

    const customRoots = Object.fromEntries(
      ["spec", "design", "plan", "progress", "verify", "decision"].map((layer) => [layer, "delivery"])
    );
    writeFile(
      path.join(projectRoot, "workflow-contracts.config.json"),
      `${JSON.stringify({ artifactGovernance: { layerRoots: customRoots } }, null, 2)}\n`
    );
    result = validateWorkflowGovernance({ workflowRoot: customRoot, projectRoot });
    assert(result.ok, `adopter layout must pass after declaring custom roots, got ${JSON.stringify(result.errors)}`);
    console.log("  PASS: custom artifactGovernance roots accept an adopter layout");
  } finally {
    rmrf(projectRoot);
  }
}

function testArtifactOwnershipDuplicationRules() {
  const projectRoot = path.resolve(__dirname, "..", "..", "..");
  const cases = [
    ["duplicate-technical-sequence.s06.md", "Main Artifact.task_breakdown[].dependencies"],
    ["duplicate-path-map.s06.md", "Main Artifact.task_breakdown[].paths_in_scope"],
    ["duplicate-tdd-targets.s06.md", "Main Artifact.task_breakdown[].verification_hint"],
    ["duplicate-acceptance-coverage.s06.md", "Traceability.task_refs"],
    ["duplicate-human-review-points.s06.md", "frontmatter.role_signoffs"]
  ];
  assert(ARTIFACT_OWNERSHIP_RULES.length === 5, "ownership enforcement must define exactly the five measured F9 rules");
  cases.forEach(([name, owner]) => {
    const filePath = path.join(semanticFixtureRoot, name);
    const errors = getArtifactOwnershipDuplicationErrors({
      filePath,
      content: readSemanticFixture(name),
      projectRoot
    });
    assert(errors.length === 1, `${name} must produce one duplication error, got ${JSON.stringify(errors)}`);
    assert(errors[0] && errors[0].includes(owner), `${name} error must name owning block '${owner}'`);
  });

  const cleanName = "deduplicated-role-output.s06.md";
  const cleanErrors = getArtifactOwnershipDuplicationErrors({
    filePath: path.join(semanticFixtureRoot, cleanName),
    content: readSemanticFixture(cleanName),
    projectRoot
  });
  assert(cleanErrors.length === 0, `deduplicated equivalent must pass, got ${JSON.stringify(cleanErrors)}`);
  console.log("  PASS: five F9 duplication rules name their owners; deduplicated equivalent passes");
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

function readSemanticFixture(name) {
  return fs.readFileSync(path.join(semanticFixtureRoot, name), "utf8");
}

function testFinalizedSemanticEvidenceFixtures() {
  const emptyErrors = getFinalizedStepSemanticEvidenceErrors({
    stepId: "s04",
    content: readSemanticFixture("invalid-empty-required-evidence.s04.md"),
    filePath: "invalid-empty-required-evidence.s04.md",
    sddMode: "none"
  });
  assert(
    emptyErrors.some((error) => /acceptance_criteria.*non-empty/i.test(error)),
    `empty required evidence must fail, got ${JSON.stringify(emptyErrors)}`
  );
  assert(
    emptyErrors.some((error) => /current_behavior_refs.*non-empty/i.test(error)),
    `empty brownfield baseline must fail, got ${JSON.stringify(emptyErrors)}`
  );

  const placeholderErrors = getFinalizedStepSemanticEvidenceErrors({
    stepId: "s04",
    content: readSemanticFixture("invalid-placeholder-evidence.s04.md"),
    filePath: "invalid-placeholder-evidence.s04.md",
    sddMode: "none"
  });
  assert(
    placeholderErrors.some((error) => /placeholder.*criterion/i.test(error)),
    `placeholder criterion must fail, got ${JSON.stringify(placeholderErrors)}`
  );
  assert(
    placeholderErrors.some((error) => /Definition of Ready.*concrete status/i.test(error)),
    `placeholder DoR status must fail, got ${JSON.stringify(placeholderErrors)}`
  );

  const coverageErrors = getFinalizedStepSemanticEvidenceErrors({
    stepId: "s08",
    content: readSemanticFixture("invalid-coverage-total.s08.md"),
    filePath: "invalid-coverage-total.s08.md",
    sddMode: "none"
  });
  assert(
    coverageErrors.some((error) => /coverage summary.*PASS/i.test(error)),
    `coverage count mismatch must fail, got ${JSON.stringify(coverageErrors)}`
  );
  assert(
    coverageErrors.some((error) => /coverage status PASS.*non-PASS/i.test(error)),
    `contradictory coverage status must fail, got ${JSON.stringify(coverageErrors)}`
  );

  const validErrors = getFinalizedStepSemanticEvidenceErrors({
    stepId: "s04",
    content: readSemanticFixture("valid-semantic-evidence.s04.md"),
    filePath: "valid-semantic-evidence.s04.md",
    sddMode: "none"
  });
  assert(validErrors.length === 0, `valid semantic evidence must pass, got ${JSON.stringify(validErrors)}`);
  console.log("  PASS: finalized semantic evidence negative/control fixtures");
}

function testStrictFinalizedNoteUsesSemanticValidator() {
  const projectRoot = buildProject();
  const slug = "strict-semantic-item";
  const workflowRoot = path.join(projectRoot, "work-items", slug);
  try {
    writeFile(path.join(projectRoot, "project-context", "checklists", "strict.md"), "# Strict\n");
    writeFile(
      path.join(workflowRoot, `${slug}.s04.acceptance-criteria.md`),
      [
        "---",
        `artifact_id: \"${slug}.s04.acceptance-criteria\"`,
        "artifact_family: workflow-step",
        `work_item_slug: \"${slug}\"`,
        'step_id: "s04"',
        'step_slug: "acceptance-criteria"',
        "workflow_stage: design",
        "work_item_type: CHANGE",
        "delivery_context: brownfield",
        "artifact_role: primary",
        "artifact_kind: primary-note",
        "source_of_truth: true",
        "status: approved",
        'governance_ref: "project-context/project-context.md"',
        "governance_profile: strict",
        "governance_status: CHECKS_PASSED",
        "checklist_refs:",
        '  - "project-context/checklists/strict.md"',
        "sdd_mode: none",
        "spec_status: approved",
        "planning_track: full",
        "execution_mode: agentic",
        "review_mode: targeted",
        "approval_gates:",
        '  spec: "required"',
        "role_signoffs:",
        '  spec: ["ba"]',
        '  dor: ["qc"]',
        "gate_reviews:",
        '  spec_reviewed_by: ["ba"]',
        '  spec_reviewed_at: "2026-08-17"',
        '  dor_reviewed_by: ["qc"]',
        '  dor_reviewed_at: "2026-08-17"',
        "upstream_artifacts: []",
        "linked_artifacts: []",
        "tags: []",
        "---",
        "",
        "# s04",
        "",
        readSemanticFixture("invalid-empty-required-evidence.s04.md"),
        "",
        "## Governance Checks",
        "```yaml",
        'checklist_applied: ["project-context/checklists/strict.md"]',
        "checks: []",
        "blocking_items: []",
        'owner: "qc"',
        'next_action: "fix evidence"',
        "```"
      ].join("\n")
    );
    const result = validateWorkflowGovernance({ workflowRoot, projectRoot });
    assert(!result.ok, "strict finalized note with empty evidence must fail governance validation");
    assert(
      result.errors.some((error) => /acceptance_criteria.*non-empty/i.test(error)),
      `strict semantic integration error missing, got ${JSON.stringify(result.errors)}`
    );
    console.log("  PASS: strict/regulated finalized notes route through semantic validator");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running validate-workflow-governance (light gate guard) tests...\n");
testArtifactGovernanceLayerRoots();
testArtifactPlacementAndExemption();
testCustomLayerRootsAcceptAdopterLayout();
testArtifactOwnershipDuplicationRules();
testLightFoundationRequiredErrors();
testLightContractRequiredErrors();
testLightWithoutFoundationContractPasses();
testFinalizedSemanticEvidenceFixtures();
testStrictFinalizedNoteUsesSemanticValidator();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in validate-workflow-governance.test.js`);
  process.exit(1);
}
console.log("\nAll validate-workflow-governance (light gate guard) tests passed.");
