const fs = require("fs");
const os = require("os");
const path = require("path");
const { validateWorkflowChange } = require("../scripts/validate-workflow-change");

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
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "val-cr-"));
  fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
  return projectRoot;
}

// Workflow step note referencing a CR. compact=true -> dùng cr_id/cr_status canonical.
function writeWorkflowNote(projectRoot, slug, changeId, changeStatus, archiveStatus, compact) {
  const workflowRoot = path.join(projectRoot, "work-items", slug);
  const idField = compact ? `cr_id: ${changeId}` : `change_id: ${changeId}`;
  const statusField = compact ? `cr_status: ${changeStatus}` : `change_status: ${changeStatus}`;
  writeFile(
    path.join(workflowRoot, `${slug}.s04.acceptance-criteria.md`),
    [
      "---",
      `artifact_id: "${slug}.s04.acceptance-criteria"`,
      "artifact_family: workflow-step",
      `work_item_slug: "${slug}"`,
      'step_id: "s04"',
      'step_slug: "acceptance-criteria"',
      "workflow_stage: delivery",
      "work_item_type: FEATURE",
      "delivery_context: brownfield",
      "artifact_role: primary",
      "artifact_kind: primary-note",
      "source_of_truth: true",
      "status: finalized",
      'governance_ref: "project-context/project-context.md"',
      "governance_profile: default",
      "governance_status: ALIGNED",
      "sdd_mode: light",
      "spec_status: approved",
      "planning_track: quick",
      "execution_mode: agentic",
      "review_mode: self",
      idField,
      statusField,
      `archive_status: ${archiveStatus}`,
      "approval_gates:",
      '  spec: "required"',
      "role_signoffs:",
      "  spec: [\"po\"]",
      "  dor: [\"po\"]",
      "  approach: [\"developer\"]",
      "  task_plan: [\"developer\"]",
      "  dod: [\"qc\"]",
      "gate_reviews:",
      '  spec_reviewed_by: ["po"]',
      '  spec_reviewed_at: "2026-07-16"',
      '  dor_reviewed_by: ["po"]',
      '  dor_reviewed_at: "2026-07-16"',
      '  approach_reviewed_by: ["developer"]',
      '  approach_reviewed_at: "2026-07-16"',
      '  task_plan_reviewed_by: ["developer"]',
      '  task_plan_reviewed_at: "2026-07-16"',
      "upstream_artifacts: []",
      "linked_artifacts: []",
      "tags: []",
      "---",
      "",
      "# s04"
    ].join("\n")
  );
  return workflowRoot;
}

function writeFullChangePackage(projectRoot, changeId, slug, approvalStatus, reviewedBy, reviewedAt) {
  const changeRoot = path.join(projectRoot, "changes", changeId);
  const proposalLines = [
    "---",
    `change_id: ${changeId}`,
    'artifact_kind: "change-proposal"',
    "status: draft",
    `linked_work_items: ["${slug}"]`,
    "decision_owner: agent",
    "review_required: true",
    `approval_status: ${approvalStatus}`,
    `reviewed_by: "${reviewedBy}"`,
    `reviewed_at: "${reviewedAt}"`,
    'materialization_ref: ""',
    'request_summary: "full pkg"',
    "review_notes: []",
    "---",
    "",
    "# Proposal"
  ].join("\n");
  writeFile(path.join(changeRoot, "proposal.md"), proposalLines);
  // 6 files còn lại chỉ cần frontmatter change_id.
  ["design.md", "tasks.md", "spec-delta/brd.delta.md", "spec-delta/srs.delta.md", "execution/task-status.md", "archive-metadata.md"].forEach((rel) => {
    writeFile(path.join(changeRoot, rel), `---\nchange_id: ${changeId}\nartifact_kind: "x"\n---\n# ${rel}\n`);
  });
}

function writeCompactRequest(projectRoot, crId, slug, crStatus, approvalStatus, reviewedBy, reviewedAt) {
  const changeRoot = path.join(projectRoot, "changes", crId);
  writeFile(
    path.join(changeRoot, "request.md"),
    [
      "---",
      `cr_id: ${crId}`,
      "cr_profile: compact",
      `cr_status: ${crStatus}`,
      'cr_strategy: "create_new"',
      'artifact_kind: "cr-request"',
      `linked_work_items: ["${slug}"]`,
      "decision_owner: agent",
      "review_required: true",
      `approval_status: ${approvalStatus}`,
      `reviewed_by: "${reviewedBy}"`,
      `reviewed_at: "${reviewedAt}"`,
      'materialization_ref: ""',
      'request_summary: "compact delta"',
      'defect_source: "n/a"',
      "spec_impact_classified: false",
      "linked_crs: []",
      'base_spec_version: ""',
      'accepted_spec_version: ""',
      "review_notes: []",
      "---",
      "",
      "# CR Request"
    ].join("\n")
  );
}

// ---------- Legacy full CHANGE fixture vẫn pass (compatibility gate) ----------

function testLegacyFullChangePasses() {
  const projectRoot = buildProject();
  try {
    writeWorkflowNote(projectRoot, "legacy-item", "CHANGE-001", "draft", "not_ready", false);
    writeFullChangePackage(projectRoot, "CHANGE-001", "legacy-item", "APPROVED", "po", "2026-07-16");
    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "legacy-item"),
      projectRoot
    });
    assert(result.validatedCount >= 1, "legacy fixture must be validated (not skipped)");
    assert(result.ok, `legacy full CHANGE fixture must pass, got errors: ${JSON.stringify(result.errors)}`);
    console.log("  PASS: legacy full CHANGE-001 fixture dual-reads and passes");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Compact CR validates via request.md (no 7-file requirement) ----------

function testCompactCrPasses() {
  const projectRoot = buildProject();
  try {
    writeWorkflowNote(projectRoot, "compact-item", "CR-003", "DRAFT", "not_ready", true);
    writeCompactRequest(projectRoot, "CR-003", "compact-item", "DRAFT", "APPROVED", "po", "2026-07-16");
    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "compact-item"),
      projectRoot
    });
    assert(result.validatedCount >= 1, "compact CR must be validated (not skipped via cr_id)");
    assert(result.ok, `compact CR must validate via request.md, got errors: ${JSON.stringify(result.errors)}`);
    console.log("  PASS: compact CR validates via request.md (no 7-file requirement)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Compact missing request.md -> error ----------

function testCompactMissingRequestMdErrors() {
  const projectRoot = buildProject();
  try {
    writeWorkflowNote(projectRoot, "missing-req-item", "CR-004", "DRAFT", "not_ready", true);
    // No package at all.
    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "missing-req-item"),
      projectRoot
    });
    assert(!result.ok, "missing compact request.md must produce errors");
    assert(result.errors.some((e) => /Missing change package/i.test(e) || /CR-004/i.test(e)), "error must reference missing package");
    console.log("  PASS: compact missing request.md produces error");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Compact invalid cr_status -> error ----------

function testCompactInvalidCrStatusErrors() {
  const projectRoot = buildProject();
  try {
    writeWorkflowNote(projectRoot, "bad-status-item", "CR-005", "BOGUS", "not_ready", true);
    writeCompactRequest(projectRoot, "CR-005", "bad-status-item", "BOGUS", "APPROVED", "po", "2026-07-16");
    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "bad-status-item"),
      projectRoot
    });
    assert(!result.ok, "invalid cr_status must produce errors");
    assert(result.errors.some((e) => /cr_status|Invalid.*BOGUS|BOGUS/i.test(e)), `error must flag invalid cr_status, got ${JSON.stringify(result.errors)}`);
    console.log("  PASS: compact invalid cr_status produces error");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Dual-read: note dùng change_id legacy nhưng package là compact request.md ----------

function testDualReadChangeIdAliasFindsCompact() {
  const projectRoot = buildProject();
  try {
    // Note dùng legacy field change_id: CR-006 (canonical id qua legacy field name).
    writeWorkflowNote(projectRoot, "alias-item", "CR-006", "DRAFT", "not_ready", false);
    writeCompactRequest(projectRoot, "CR-006", "alias-item", "DRAFT", "APPROVED", "po", "2026-07-16");
    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "alias-item"),
      projectRoot
    });
    assert(result.ok, `dual-read change_id->compact must pass, got ${JSON.stringify(result.errors)}`);
    console.log("  PASS: dual-read change_id alias resolves compact request.md");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running validate-workflow-change (compact CR + dual-read) tests...\n");
testLegacyFullChangePasses();
testCompactCrPasses();
testCompactMissingRequestMdErrors();
testCompactInvalidCrStatusErrors();
testDualReadChangeIdAliasFindsCompact();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in validate-workflow-change-compact.test.js`);
  process.exit(1);
}
console.log("\nAll validate-workflow-change (compact CR + dual-read) tests passed.");