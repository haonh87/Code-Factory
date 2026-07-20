// Review fixes cho validate-workflow-change (Batch A m3 + Batch B M4/m9):
// - m3: --workflow-root tùy biến phải được thread xuống aggregate reconcile.
// - M4: exceptional statuses (REJECTED/CANCELLED/SUPERSEDED) là cr_status hợp lệ.
// - m9: request.md phải tự validate cr_status; canonical cr_status thắng legacy
//   change_status khi note khai cả hai.

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
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "val-chg-"));
  fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
  return projectRoot;
}

function writeNote(projectRoot, base, slug, fields) {
  const lines = [
    "---",
    `artifact_id: "${slug}.s04.acceptance-criteria"`,
    "artifact_family: workflow-step",
    `work_item_slug: "${slug}"`,
    'step_id: "s04"',
    'step_slug: "acceptance-criteria"',
    "artifact_role: primary",
    "artifact_kind: primary-note",
    "status: finalized",
    ...fields,
    "---",
    "",
    "# s04"
  ];
  writeFile(path.join(projectRoot, base, slug, `${slug}.s04.acceptance-criteria.md`), lines.join("\n"));
}

function writeCompactRequest(projectRoot, crId, slug, opts = {}) {
  const crStatus = opts.crStatus || "DRAFT";
  const approvalStatus = opts.approvalStatus || "APPROVED";
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
      `approval_status: ${approvalStatus}`,
      'reviewed_by: "po"',
      'reviewed_at: "2026-07-16"',
      'materialization_ref: ""',
      'request_summary: "x"',
      'defect_source: "n/a"',
      "spec_impact_classified: false",
      "linked_crs: []",
      'base_spec_version: ""',
      'accepted_spec_version: ""',
      "review_notes: []",
      "---",
      "",
      "# CR Request",
      "",
      "## Aggregate Coverage",
      "```yaml",
      "contributions: []",
      "all_required_done: false",
      "coverage_pass: false",
      "```",
      "",
      "## Accepted Spec Version",
      "```yaml",
      'accepted_spec_version: ""',
      'provenance: ""',
      'backlink: ""',
      "```"
    ].join("\n")
  );
}

// ---------- M4: REJECTED là cr_status hợp lệ cho compact CR ----------

function testRejectedCrStatusValid() {
  const projectRoot = buildProject();
  try {
    writeNote(projectRoot, "work-items", "rej-item", ["cr_id: CR-101", "cr_status: REJECTED"]);
    writeCompactRequest(projectRoot, "CR-101", "rej-item", {
      crStatus: "REJECTED",
      approvalStatus: "REJECTED"
    });
    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "rej-item"),
      projectRoot
    });
    assert(result.validatedCount >= 1, "rejected CR note must be validated");
    assert(result.ok, `REJECTED must be representable, got ${JSON.stringify(result.errors)}`);
    console.log("  PASS: REJECTED cr_status is valid and representable");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- M4: CANCELLED hợp lệ; BOGUS vẫn fail ----------

function testCancelledValidBogusInvalid() {
  const projectRoot = buildProject();
  try {
    writeNote(projectRoot, "work-items", "cxl-item", ["cr_id: CR-102", "cr_status: CANCELLED"]);
    writeCompactRequest(projectRoot, "CR-102", "cxl-item", {
      crStatus: "CANCELLED",
      approvalStatus: "REJECTED"
    });
    const ok = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "cxl-item"),
      projectRoot
    });
    assert(ok.ok, `CANCELLED must be valid, got ${JSON.stringify(ok.errors)}`);

    writeNote(projectRoot, "work-items", "bogus-item", ["cr_id: CR-103", "cr_status: BOGUS"]);
    writeCompactRequest(projectRoot, "CR-103", "bogus-item", { crStatus: "DRAFT" });
    const bad = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "bogus-item"),
      projectRoot
    });
    assert(!bad.ok, "BOGUS cr_status must still fail");
    console.log("  PASS: CANCELLED valid; BOGUS still invalid");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- m9: request.md's own cr_status được validate ----------

function testRequestMdOwnCrStatusValidated() {
  const projectRoot = buildProject();
  try {
    // Note hợp lệ (DRAFT) nhưng request.md mang cr_status rác.
    writeNote(projectRoot, "work-items", "own-status-item", ["cr_id: CR-104", "cr_status: DRAFT"]);
    writeCompactRequest(projectRoot, "CR-104", "own-status-item", { crStatus: "banana" });
    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "own-status-item"),
      projectRoot
    });
    assert(!result.ok, "request.md with invalid own cr_status must fail");
    assert(
      result.errors.some((e) => /banana|request\.md/i.test(e)),
      `error must flag request.md cr_status, got ${JSON.stringify(result.errors)}`
    );
    console.log("  PASS: request.md own cr_status validated");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- m9: canonical cr_status thắng legacy change_status trên note ----------

function testCanonicalStatusWinsOverLegacyOnNote() {
  const projectRoot = buildProject();
  try {
    // Note khai CẢ change_status (legacy lowercase - không hợp lệ cho compact)
    // lẫn cr_status DRAFT hợp lệ -> canonical phải thắng, note pass.
    writeNote(projectRoot, "work-items", "dual-field-item", [
      "cr_id: CR-105",
      "change_status: draft",
      "cr_status: DRAFT"
    ]);
    writeCompactRequest(projectRoot, "CR-105", "dual-field-item", { crStatus: "DRAFT" });
    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "work-items", "dual-field-item"),
      projectRoot
    });
    assert(
      result.ok,
      `canonical cr_status must win over legacy change_status for compact, got ${JSON.stringify(result.errors)}`
    );
    console.log("  PASS: canonical cr_status wins over legacy change_status");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- m3: --workflow-root tùy biến thread xuống aggregate reconcile ----------

function testCustomWorkflowRootThreadedToAggregate() {
  const projectRoot = buildProject();
  try {
    // Work item sống ở delivery-items/ (không phải work-items/). CR ACCEPTED đủ
    // điều kiện; nếu reconcile hardcode work-items thì sẽ báo giả missing.
    writeNote(projectRoot, "delivery-items", "agg-item", ["cr_id: CR-106", "cr_status: ACCEPTED"]);
    writeFile(
      path.join(projectRoot, "changes", "CR-106", "request.md"),
      [
        "---",
        "cr_id: CR-106",
        "cr_profile: compact",
        "cr_status: ACCEPTED",
        'cr_strategy: "create_new"',
        'artifact_kind: "cr-request"',
        'linked_work_items: ["agg-item"]',
        "decision_owner: agent",
        "review_required: true",
        "approval_status: APPROVED",
        'reviewed_by: "po"',
        'reviewed_at: "2026-07-16"',
        'materialization_ref: ""',
        'request_summary: "x"',
        'defect_source: "n/a"',
        "spec_impact_classified: false",
        "linked_crs: []",
        'base_spec_version: "1.0.0"',
        'accepted_spec_version: "2.0.0"',
        "review_notes: []",
        "---",
        "",
        "# CR Request",
        "",
        "## Aggregate Coverage",
        "```yaml",
        "contributions:",
        "  - work_item_slug: agg-item",
        "    coverage_status: PASS",
        "    waived: false",
        "all_required_done: true",
        "coverage_pass: true",
        "```",
        "",
        "## Accepted Spec Version",
        "```yaml",
        'accepted_spec_version: "2.0.0"',
        'provenance: "CR-106"',
        'backlink: "product-specs/widget.md"',
        "```"
      ].join("\n")
    );
    writeFile(
      path.join(projectRoot, "delivery-items", "agg-item", "agg-item.work-item-report.json"),
      JSON.stringify(
        {
          work_item_slug: "agg-item",
          protocol_status: "DONE",
          decision_owner: "agent",
          approval_status: "APPROVED",
          review_required: true,
          work_item_type: "FEATURE",
          delivery_context: "brownfield",
          materialization_status: "MATERIALIZED",
          workflow_root: "delivery-items/agg-item",
          current_step: "s08",
          granted_write_paths: [],
          required_actions: [],
          blockers: [],
          refs: [],
          audit_events: [],
          decision_log: [],
          review_notes: [],
          reviewed_by: "po",
          reviewed_at: "2026-07-16"
        },
        null,
        2
      )
    );
    writeFile(
      path.join(projectRoot, "delivery-items", "agg-item", "agg-item.s08.verify-and-dod.md"),
      [
        "---",
        "artifact_family: workflow-step",
        "artifact_role: primary",
        'work_item_slug: "agg-item"',
        "---",
        "",
        "# s08",
        "",
        "## CR Coverage Contribution",
        "```yaml",
        "cr_id: CR-106",
        "work_item_slug: agg-item",
        "coverage_status: PASS",
        "waived: false",
        'waiver_reason: ""',
        'contributes_to: ""',
        "```"
      ].join("\n")
    );
    writeFile(
      path.join(projectRoot, "product-specs", "widget.md"),
      [
        "---",
        "spec_type: SPEC_CARD",
        'spec_version: "2.0.0"',
        "spec_status: approved",
        "---",
        "",
        "# Spec Card"
      ].join("\n")
    );

    const result = validateWorkflowChange({
      workflowRoot: path.join(projectRoot, "delivery-items", "agg-item"),
      projectRoot
    });
    assert(
      result.ok,
      `custom workflow root must reach aggregate contributions, got ${JSON.stringify(result.errors)}`
    );
    console.log("  PASS: custom --workflow-root threaded to aggregate reconcile");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running validate-workflow-change review-fix tests...\n");
testRejectedCrStatusValid();
testCancelledValidBogusInvalid();
testRequestMdOwnCrStatusValidated();
testCanonicalStatusWinsOverLegacyOnNote();
testCustomWorkflowRootThreadedToAggregate();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in validate-workflow-change.test.js`);
  process.exit(1);
}
console.log("\nAll validate-workflow-change review-fix tests passed.");
