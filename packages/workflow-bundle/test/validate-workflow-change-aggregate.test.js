// T7b wiring (plan v5 §7, BR-05): prove validate-workflow-change surfaces CR
// aggregate reconciliation errors for compact CR (not silently skipped).
// verification_hint: "Deliberate missing contribution hoặc partial coverage chặn ACCEPTED."

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
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "val-agg-"));
  fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
  fs.mkdirSync(path.join(projectRoot, "work-items"), { recursive: true });
  fs.mkdirSync(path.join(projectRoot, "product-specs"), { recursive: true });
  return projectRoot;
}

function writeWorkItemReport(projectRoot, slug, protocolStatus) {
  writeFile(
    path.join(projectRoot, "work-items", slug, `${slug}.work-item-report.json`),
    JSON.stringify(
      {
        work_item_slug: slug,
        work_item_type: "FEATURE",
        delivery_context: "brownfield",
        protocol_status: protocolStatus,
        materialization_status: "MATERIALIZED",
        decision_owner: "agent",
        approval_status: "APPROVED",
        review_required: true,
        reviewed_by: "po",
        reviewed_at: "2026-07-16",
        workflow_root: path.join("work-items", slug),
        current_step: "s08",
        granted_write_paths: [],
        required_actions: [],
        blockers: [],
        refs: [],
        audit_events: [],
        decision_log: [],
        review_notes: []
      },
      null,
      2
    )
  );
}

function writeS08Contribution(projectRoot, slug, crId, coverageStatus, waived) {
  writeFile(
    path.join(projectRoot, "work-items", slug, `${slug}.s08.verify-and-dod.md`),
    [
      "---",
      `artifact_id: "${slug}.s08.verify-and-dod"`,
      "artifact_family: workflow-step",
      `work_item_slug: "${slug}"`,
      'step_id: "s08"',
      'step_slug: "verify-and-dod"',
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
      "approval_gates:",
      '  dod: "required"',
      "role_signoffs:",
      "  dod: [\"qc\"]",
      "gate_reviews:",
      '  dod_reviewed_by: ["qc"]',
      '  dod_reviewed_at: "2026-07-16"',
      "tags: []",
      "---",
      "",
      "# s08",
      "",
      "## CR Coverage Contribution",
      "```yaml",
      `cr_id: ${crId}`,
      `work_item_slug: ${slug}`,
      `coverage_status: ${coverageStatus}`,
      `waived: ${waived ? "true" : "false"}`,
      'waiver_reason: ""',
      'contributes_to: "REQ-001"',
      "```",
      ""
    ].join("\n")
  );
}

function writeWorkflowNote(projectRoot, slug, crId, crStatus) {
  writeFile(
    path.join(projectRoot, "work-items", slug, `${slug}.s04.acceptance-criteria.md`),
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
      `cr_id: ${crId}`,
      `cr_status: ${crStatus}`,
      "approval_gates:",
      '  spec: "required"',
      "role_signoffs:",
      "  spec: [\"po\"]",
      "  dor: [\"po\"]",
      "  dod: [\"qc\"]",
      "gate_reviews:",
      '  spec_reviewed_by: ["po"]',
      '  spec_reviewed_at: "2026-07-16"',
      '  dor_reviewed_by: ["po"]',
      '  dor_reviewed_at: "2026-07-16"',
      "tags: []",
      "---",
      "",
      "# s04"
    ].join("\n")
  );
}

function writeCompactRequest(projectRoot, crId, slug, crStatus, acceptedSpecVersion, provenance, backlink) {
  writeFile(
    path.join(projectRoot, "changes", crId, "request.md"),
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
      "approval_status: APPROVED",
      'reviewed_by: "po"',
      'reviewed_at: "2026-07-16"',
      'materialization_ref: ""',
      'request_summary: "agg"',
      'defect_source: "n/a"',
      "spec_impact_classified: false",
      "linked_crs: []",
      'base_spec_version: "1.0.0"',
      `accepted_spec_version: "${acceptedSpecVersion}"`,
      "review_notes: []",
      "---",
      "",
      `# CR Request - ${crId}`,
      "",
      "## Aggregate Coverage",
      "```yaml",
      "contributions:",
      `  - work_item_slug: ${slug}`,
      "    coverage_status: PASS",
      "    waived: false",
      "all_required_done: true",
      "coverage_pass: true",
      "```",
      "",
      "## Accepted Spec Version",
      "```yaml",
      `accepted_spec_version: "${acceptedSpecVersion}"`,
      `provenance: "${provenance}"`,
      `backlink: "${backlink}"`,
      "```",
      ""
    ].join("\n")
  );
}

function writeSpecCard(projectRoot, relPath, specVersion) {
  writeFile(
    path.join(projectRoot, relPath),
    [
      "---",
      "spec_type: SPEC_CARD",
      `spec_version: "${specVersion}"`,
      "spec_status: approved",
      'spec_card_id: "widget-001"',
      "---",
      "",
      "# Spec Card",
      "",
      "## Requirements",
      "```yaml",
      "requirements:",
      "  - id: REQ-001",
      "    provenance: BASELINE",
      "    cr_required: false",
      "```",
      "",
      "## Acceptance Criteria",
      "```yaml",
      "acceptance_criteria:",
      "  - id: AC-001",
      "    requirement: REQ-001",
      "```",
      "",
      "## Spec Freeze",
      "```yaml",
      "authority: po",
      "```"
    ].join("\n")
  );
}

// ---------- ACCEPTED but spec card not bumped -> validateWorkflowChange errors ----------

function testAcceptedNotBumpedSurfacesError() {
  const projectRoot = buildProject();
  try {
    writeWorkflowNote(projectRoot, "widget", "CR-040", "ACCEPTED");
    writeCompactRequest(projectRoot, "CR-040", "widget", "ACCEPTED", "2.0.0", "CR-040", "product-specs/widget.md");
    writeWorkItemReport(projectRoot, "widget", "DONE");
    writeS08Contribution(projectRoot, "widget", "CR-040", "PASS", false);
    writeSpecCard(projectRoot, "product-specs/widget.md", "1.0.0"); // NOT bumped

    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "widget"),
      projectRoot
    });
    assert(result.validatedCount >= 1, "compact CR must be validated (not skipped)");
    assert(!result.ok, "ACCEPTED without atomic bump must surface errors");
    assert(
      result.errors.some((e) => /atomic spec bump|spec_version|2\.0\.0/i.test(e)),
      `error must mention atomic bump, got ${JSON.stringify(result.errors)}`
    );
    console.log("  PASS: validateWorkflowChange surfaces ACCEPTED-without-bump error");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Missing contribution -> validateWorkflowChange errors (blocks ACCEPTED) ----------

function testMissingContributionSurfacesError() {
  const projectRoot = buildProject();
  try {
    writeWorkflowNote(projectRoot, "widget", "CR-041", "ACCEPTED");
    writeCompactRequest(projectRoot, "CR-041", "widget", "ACCEPTED", "2.0.0", "CR-041", "product-specs/widget.md");
    writeWorkItemReport(projectRoot, "widget", "DONE");
    // No s08 contribution written -> missing.
    writeSpecCard(projectRoot, "product-specs/widget.md", "2.0.0");

    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "widget"),
      projectRoot
    });
    assert(!result.ok, "missing contribution must surface errors");
    assert(
      result.errors.some((e) => /missing contribution/i.test(e)),
      `error must mention missing contribution, got ${JSON.stringify(result.errors)}`
    );
    console.log("  PASS: validateWorkflowChange surfaces missing-contribution error (blocks ACCEPTED)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Un-waived PARTIAL -> validateWorkflowChange errors ----------

function testUnwaivedPartialSurfacesError() {
  const projectRoot = buildProject();
  try {
    writeWorkflowNote(projectRoot, "widget", "CR-042", "ACCEPTED");
    writeCompactRequest(projectRoot, "CR-042", "widget", "ACCEPTED", "2.0.0", "CR-042", "product-specs/widget.md");
    writeWorkItemReport(projectRoot, "widget", "DONE");
    writeS08Contribution(projectRoot, "widget", "CR-042", "PARTIAL", false); // un-waived
    writeSpecCard(projectRoot, "product-specs/widget.md", "2.0.0");

    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "widget"),
      projectRoot
    });
    assert(!result.ok, "un-waived PARTIAL must surface errors");
    assert(
      result.errors.some((e) => /un-waived coverage failure|PARTIAL/i.test(e)),
      `error must mention un-waived failure, got ${JSON.stringify(result.errors)}`
    );
    console.log("  PASS: validateWorkflowChange surfaces un-waived PARTIAL error");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Happy ACCEPTED -> validateWorkflowChange passes (regression guard) ----------

function testHappyAcceptedPasses() {
  const projectRoot = buildProject();
  try {
    writeWorkflowNote(projectRoot, "widget", "CR-043", "ACCEPTED");
    writeCompactRequest(projectRoot, "CR-043", "widget", "ACCEPTED", "2.0.0", "CR-043", "product-specs/widget.md");
    writeWorkItemReport(projectRoot, "widget", "DONE");
    writeS08Contribution(projectRoot, "widget", "CR-043", "PASS", false);
    writeSpecCard(projectRoot, "product-specs/widget.md", "2.0.0");

    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "widget"),
      projectRoot
    });
    assert(result.ok, `happy ACCEPTED must pass, got ${JSON.stringify(result.errors)}`);
    console.log("  PASS: validateWorkflowChange happy ACCEPTED passes");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running T7b wiring (validate-workflow-change aggregate) tests...\n");
testAcceptedNotBumpedSurfacesError();
testMissingContributionSurfacesError();
testUnwaivedPartialSurfacesError();
testHappyAcceptedPasses();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in validate-workflow-change-aggregate.test.js`);
  process.exit(1);
}
console.log("\nAll T7b wiring (validate-workflow-change aggregate) tests passed.");