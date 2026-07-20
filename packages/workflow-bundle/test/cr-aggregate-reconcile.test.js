// T7 (plan v5 §7, F-08, F-14, BR-05): CR aggregate reconciliation + atomic ACCEPTED spec bump.
// Mỗi s08 phát một cr_coverage_contribution; CR aggregator kiểm tất cả required linked work
// item DONE, không có un-waived FAIL/PARTIAL/UNTESTED, và chỉ ACCEPTED mới atomic bump current spec.
//
// TDD: test-first. File này chạy cả reconcile (T7a) và acceptance validation (T7b).

const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  reconcileCrAggregate,
  validateCrAggregateAcceptance
} = require("../scripts/cr-aggregate-reconcile");

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
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-agg-"));
  fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
  fs.mkdirSync(path.join(projectRoot, "work-items"), { recursive: true });
  fs.mkdirSync(path.join(projectRoot, "product-specs"), { recursive: true });
  return projectRoot;
}

function writeWorkItemReport(projectRoot, slug, protocolStatus) {
  const reportPath = path.join(projectRoot, "work-items", slug, `${slug}.work-item-report.json`);
  writeFile(
    reportPath,
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
  return reportPath;
}

function writeS08Contribution(projectRoot, slug, crId, contribution) {
  const coverage = contribution.coverage_status || "PASS";
  const waived = contribution.waived ? "true" : "false";
  const waiverReason = contribution.waiver_reason || "";
  const contributesTo = contribution.contributes_to || "";
  const s08Path = path.join(
    projectRoot,
    "work-items",
    slug,
    `${slug}.s08.verify-and-dod.md`
  );
  writeFile(
    s08Path,
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
      "# s08 Verify + DoD",
      "",
      "## CR Coverage Contribution",
      "```yaml",
      `cr_id: ${crId}`,
      `work_item_slug: ${slug}`,
      `coverage_status: ${coverage}`,
      `waived: ${waived}`,
      `waiver_reason: "${waiverReason}"`,
      `contributes_to: "${contributesTo}"`,
      "```",
      ""
    ].join("\n")
  );
  return s08Path;
}

function writeCompactRequest(
  projectRoot,
  crId,
  opts
) {
  const changeRoot = path.join(projectRoot, "changes", crId);
  const linkedWorkItems = opts.linked_work_items || [];
  const crStatus = opts.cr_status || "VERIFIED";
  const acceptedSpecVersion = opts.accepted_spec_version || "";
  const baseSpecVersion = opts.base_spec_version || "";
  const provenance = opts.provenance || "";
  const backlink = opts.backlink || "";
  const allRequiredDone = opts.all_required_done ? "true" : "false";
  const coveragePass = opts.coverage_pass ? "true" : "false";
  const contributions = opts.contributions || [];

  const contributionLines = linkedWorkItems.map((slug, idx) => {
    const c = contributions[idx] || {};
    return [
      `  - work_item_slug: ${slug}`,
      `    coverage_status: ${c.coverage_status || "PASS"}`,
      `    waived: ${c.waived ? "true" : "false"}`
    ].join("\n");
  });

  writeFile(
    path.join(changeRoot, "request.md"),
    [
      "---",
      `cr_id: ${crId}`,
      "cr_profile: compact",
      `cr_status: ${crStatus}`,
      'cr_strategy: "create_new"',
      'artifact_kind: "cr-request"',
      "decision_owner: agent",
      "review_required: true",
      "approval_status: APPROVED",
      'reviewed_by: "po"',
      'reviewed_at: "2026-07-16"',
      'materialization_ref: ""',
      'request_summary: "agg delta"',
      'defect_source: "n/a"',
      "spec_impact_classified: false",
      "linked_crs: []",
      `linked_work_items:`,
      ...linkedWorkItems.map((s) => `  - "${s}"`),
      `base_spec_version: "${baseSpecVersion}"`,
      `accepted_spec_version: "${acceptedSpecVersion}"`,
      "review_notes: []",
      "---",
      "",
      `# CR Request - ${crId}`,
      "",
      "## Aggregate Coverage",
      "```yaml",
      "contributions:",
      contributionLines.join("\n"),
      `all_required_done: ${allRequiredDone}`,
      `coverage_pass: ${coveragePass}`,
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
  return changeRoot;
}

function writeSpecCard(projectRoot, relPath, specVersion) {
  const fullPath = path.join(projectRoot, relPath);
  writeFile(
    fullPath,
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
  return fullPath;
}

// ---------- T7a: reconcile collects contributions across linked work items ----------

function testReconcileAllDonePassCoveragePass() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-020", {
      linked_work_items: ["add-export-button", "add-import-button"],
      cr_status: "VERIFIED",
      base_spec_version: "1.0.0",
      contributions: [
        { coverage_status: "PASS", waived: false },
        { coverage_status: "PASS", waived: false }
      ]
    });
    writeWorkItemReport(projectRoot, "add-export-button", "DONE");
    writeWorkItemReport(projectRoot, "add-import-button", "DONE");
    writeS08Contribution(projectRoot, "add-export-button", "CR-020", { coverage_status: "PASS" });
    writeS08Contribution(projectRoot, "add-import-button", "CR-020", { coverage_status: "PASS" });

    const result = reconcileCrAggregate({ projectRoot, changeId: "CR-020" });
    assert(result.cr_id === "CR-020", `cr_id CR-020, got ${result.cr_id}`);
    assert(result.profile === "compact", `profile compact, got ${result.profile}`);
    assert(result.linked_work_items.length === 2, "two linked work items");
    assert(result.contributions.length === 2, `collected 2 contributions, got ${result.contributions.length}`);
    assert(result.missing_contributions.length === 0, `no missing contributions, got ${JSON.stringify(result.missing_contributions)}`);
    assert(result.unwaived_failures.length === 0, "no un-waived failures");
    assert(result.all_required_done === true, "all required DONE");
    assert(result.coverage_pass === true, "coverage_pass true");
    assert(result.can_accept === true, "can_accept true when all done + pass");
    console.log("  PASS: reconcile all-DONE + PASS -> coverage_pass + can_accept");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7a: missing contribution blocks coverage ----------

function testReconcileMissingContributionBlocks() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-021", {
      linked_work_items: ["alpha", "beta"],
      cr_status: "VERIFIED"
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    writeWorkItemReport(projectRoot, "beta", "DONE");
    writeS08Contribution(projectRoot, "alpha", "CR-021", { coverage_status: "PASS" });
    // beta has no s08 contribution.

    const result = reconcileCrAggregate({ projectRoot, changeId: "CR-021" });
    assert(result.missing_contributions.includes("beta"), `beta missing, got ${JSON.stringify(result.missing_contributions)}`);
    assert(result.coverage_pass === false, "coverage_pass false when contribution missing");
    assert(result.can_accept === false, "can_accept false when contribution missing");
    console.log("  PASS: missing contribution blocks coverage_pass");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7a: un-waived PARTIAL/FAIL blocks; waived passes ----------

function testReconcileUnwaivedFailureBlocksWaivedPasses() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-022", {
      linked_work_items: ["alpha", "beta", "gamma"],
      cr_status: "VERIFIED",
      contributions: [
        { coverage_status: "PASS", waived: false },
        { coverage_status: "PARTIAL", waived: false },
        { coverage_status: "FAIL", waived: true }
      ]
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    writeWorkItemReport(projectRoot, "beta", "DONE");
    writeWorkItemReport(projectRoot, "gamma", "DONE");
    writeS08Contribution(projectRoot, "alpha", "CR-022", { coverage_status: "PASS" });
    writeS08Contribution(projectRoot, "beta", "CR-022", { coverage_status: "PARTIAL", waived: false });
    writeS08Contribution(projectRoot, "gamma", "CR-022", { coverage_status: "FAIL", waived: true, waiver_reason: "accepted risk" });

    const result = reconcileCrAggregate({ projectRoot, changeId: "CR-022" });
    assert(result.unwaived_failures.length === 1, `1 un-waived failure (beta), got ${JSON.stringify(result.unwaived_failures)}`);
    assert(result.unwaived_failures.some((f) => f.work_item_slug === "beta"), "beta is the un-waived failure");
    assert(result.coverage_pass === false, "coverage_pass false with un-waived PARTIAL");
    assert(result.can_accept === false, "can_accept false with un-waived failure");
    console.log("  PASS: un-waived PARTIAL blocks; waived FAIL does not count as failure");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7a: sibling work item not DONE blocks can_accept ----------

function testReconcileSiblingNotDoneBlocksAccept() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-023", {
      linked_work_items: ["alpha", "beta"],
      cr_status: "VERIFIED",
      contributions: [
        { coverage_status: "PASS", waived: false },
        { coverage_status: "PASS", waived: false }
      ]
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    writeWorkItemReport(projectRoot, "beta", "VERIFIED"); // not yet DONE
    writeS08Contribution(projectRoot, "alpha", "CR-023", { coverage_status: "PASS" });
    writeS08Contribution(projectRoot, "beta", "CR-023", { coverage_status: "PASS" });

    const result = reconcileCrAggregate({ projectRoot, changeId: "CR-023" });
    assert(result.all_required_done === false, "all_required_done false when sibling VERIFIED");
    assert(result.incomplete_work_items.includes("beta"), `beta incomplete, got ${JSON.stringify(result.incomplete_work_items)}`);
    assert(result.can_accept === false, "cannot ACCEPT while sibling not DONE (BR-05/F-14)");
    console.log("  PASS: sibling not DONE blocks can_accept (no self-ACCEPT of whole CR)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7a: full profile CR skips aggregate (returns profile=full, not_aggregate) ----------

function testReconcileFullProfileSkipsAggregate() {
  const projectRoot = buildProject();
  try {
    // Full CR = 7-file package, no request.md aggregate blocks.
    const changeRoot = path.join(projectRoot, "changes", "CR-024");
    ["proposal.md", "design.md", "tasks.md", "spec-delta/brd.delta.md", "spec-delta/srs.delta.md", "execution/task-status.md", "archive-metadata.md"].forEach((rel) => {
      writeFile(path.join(changeRoot, rel), `---\nchange_id: CR-024\nartifact_kind: "x"\nchange_status: draft\narchive_status: not_ready\n---\n# ${rel}\n`);
    });
    const result = reconcileCrAggregate({ projectRoot, changeId: "CR-024" });
    assert(result.profile === "full", `profile full, got ${result.profile}`);
    assert(result.aggregate_applicable === false, "aggregate not applicable to full CR");
    assert(Array.isArray(result.errors) && result.errors.length === 0, "full CR produces no aggregate errors");
    console.log("  PASS: full profile CR skips aggregate reconciliation");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7b: ACCEPTED without accepted_spec_version -> error ----------

function testAcceptedWithoutSpecVersionErrors() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-025", {
      linked_work_items: ["alpha"],
      cr_status: "ACCEPTED",
      accepted_spec_version: "", // missing
      provenance: "CR-025",
      backlink: "product-specs/widget.md"
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    writeS08Contribution(projectRoot, "alpha", "CR-025", { coverage_status: "PASS" });

    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-025" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length > 0, "ACCEPTED without accepted_spec_version must error");
    assert(errors.some((e) => /accepted_spec_version/i.test(e)), `error must mention accepted_spec_version, got ${JSON.stringify(errors)}`);
    console.log("  PASS: ACCEPTED without accepted_spec_version errors");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7b: ACCEPTED but spec card version != accepted_spec_version -> error (atomic bump) ----------

function testAcceptedSpecVersionMismatchErrors() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-026", {
      linked_work_items: ["alpha"],
      cr_status: "ACCEPTED",
      accepted_spec_version: "2.0.0",
      provenance: "CR-026",
      backlink: "product-specs/widget.md"
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    writeS08Contribution(projectRoot, "alpha", "CR-026", { coverage_status: "PASS" });
    writeSpecCard(projectRoot, "product-specs/widget.md", "1.0.0"); // NOT bumped to 2.0.0

    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-026" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length > 0, "spec card version mismatch must error (atomic bump not applied)");
    assert(errors.some((e) => /spec_version|bump|2\.0\.0|1\.0\.0/i.test(e)), `error must mention version mismatch, got ${JSON.stringify(errors)}`);
    console.log("  PASS: ACCEPTED but spec card not bumped errors (atomic bump check)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7b: ACCEPTED but provenance != cr_id -> error ----------

function testAcceptedProvenanceMismatchErrors() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-027", {
      linked_work_items: ["alpha"],
      cr_status: "ACCEPTED",
      accepted_spec_version: "2.0.0",
      provenance: "CR-099", // wrong
      backlink: "product-specs/widget.md"
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    writeS08Contribution(projectRoot, "alpha", "CR-027", { coverage_status: "PASS" });
    writeSpecCard(projectRoot, "product-specs/widget.md", "2.0.0");

    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-027" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length > 0, "provenance mismatch must error");
    assert(errors.some((e) => /provenance/i.test(e)), `error must mention provenance, got ${JSON.stringify(errors)}`);
    console.log("  PASS: ACCEPTED with wrong provenance errors");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7b: ACCEPTED but sibling not DONE -> error (cannot self-ACCEPT) ----------

function testAcceptedSiblingNotDoneErrors() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-028", {
      linked_work_items: ["alpha", "beta"],
      cr_status: "ACCEPTED",
      accepted_spec_version: "2.0.0",
      provenance: "CR-028",
      backlink: "product-specs/widget.md"
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    writeWorkItemReport(projectRoot, "beta", "VERIFIED"); // sibling not DONE
    writeS08Contribution(projectRoot, "alpha", "CR-028", { coverage_status: "PASS" });
    writeS08Contribution(projectRoot, "beta", "CR-028", { coverage_status: "PASS" });
    writeSpecCard(projectRoot, "product-specs/widget.md", "2.0.0");

    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-028" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length > 0, "ACCEPTED with sibling not DONE must error");
    assert(errors.some((e) => /DONE|required|beta|not.*done/i.test(e)), `error must mention not-DONE sibling, got ${JSON.stringify(errors)}`);
    console.log("  PASS: ACCEPTED while sibling not DONE errors (no self-ACCEPT)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7b: VERIFIED with premature spec bump -> error ----------

function testVerifiedPrematureBumpErrors() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-029", {
      linked_work_items: ["alpha"],
      cr_status: "VERIFIED",
      accepted_spec_version: "2.0.0", // premature: should be empty until ACCEPTED
      provenance: "CR-029",
      backlink: "product-specs/widget.md"
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    writeS08Contribution(projectRoot, "alpha", "CR-029", { coverage_status: "PASS" });

    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-029" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length > 0, "VERIFIED with accepted_spec_version set must error (premature bump)");
    assert(errors.some((e) => /accepted_spec_version|premature|before.*ACCEPTED|only.*ACCEPTED/i.test(e)), `error must mention premature bump, got ${JSON.stringify(errors)}`);
    console.log("  PASS: VERIFIED with premature spec bump errors");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7b: VERIFIED without premature bump + all-DONE PASS -> no errors (happy path to ACCEPT) ----------

function testVerifiedReadyNoErrors() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-030", {
      linked_work_items: ["alpha"],
      cr_status: "VERIFIED",
      accepted_spec_version: "", // not bumped yet
      provenance: "",
      backlink: ""
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    writeS08Contribution(projectRoot, "alpha", "CR-030", { coverage_status: "PASS" });

    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-030" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length === 0, `VERIFIED ready must have no errors, got ${JSON.stringify(errors)}`);
    assert(reconciled.can_accept === true, "can_accept true (ready for ACCEPTED gate)");
    console.log("  PASS: VERIFIED ready (all DONE + PASS, no premature bump) no errors");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- T7b: full happy ACCEPTED -> no errors (atomic bump applied) ----------

function testAcceptedHappyPathNoErrors() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-031", {
      linked_work_items: ["alpha", "beta"],
      cr_status: "ACCEPTED",
      accepted_spec_version: "2.0.0",
      provenance: "CR-031",
      backlink: "product-specs/widget.md"
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    writeWorkItemReport(projectRoot, "beta", "DONE");
    writeS08Contribution(projectRoot, "alpha", "CR-031", { coverage_status: "PASS" });
    writeS08Contribution(projectRoot, "beta", "CR-031", { coverage_status: "PASS" });
    writeSpecCard(projectRoot, "product-specs/widget.md", "2.0.0"); // bumped atomically

    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-031" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length === 0, `happy ACCEPTED must have no errors, got ${JSON.stringify(errors)}`);
    console.log("  PASS: ACCEPTED happy path (atomic bump + provenance + all DONE) no errors");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix B1: ARCHIVED (hậu-ACCEPTED) giữ nguyên bump, không fail ----------

function testArchivedAfterAcceptedNoErrors() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-032", {
      linked_work_items: ["alpha"],
      cr_status: "ARCHIVED",
      accepted_spec_version: "2.0.0",
      provenance: "CR-032",
      backlink: "product-specs/widget.md"
    });
    writeWorkItemReport(projectRoot, "alpha", "ARCHIVED");
    writeS08Contribution(projectRoot, "alpha", "CR-032", { coverage_status: "PASS" });
    writeSpecCard(projectRoot, "product-specs/widget.md", "2.0.0");

    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-032" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length === 0, `ARCHIVED after ACCEPTED must keep bump valid, got ${JSON.stringify(errors)}`);
    console.log("  PASS: ARCHIVED (post-ACCEPTED) keeps accepted_spec_version without errors");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix B1: ARCHIVED vẫn enforce ACCEPTED invariants ----------

function testArchivedStillEnforcesAtomicBump() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-033", {
      linked_work_items: ["alpha"],
      cr_status: "ARCHIVED",
      accepted_spec_version: "2.0.0",
      provenance: "CR-033",
      backlink: "product-specs/widget.md"
    });
    writeWorkItemReport(projectRoot, "alpha", "ARCHIVED");
    writeS08Contribution(projectRoot, "alpha", "CR-033", { coverage_status: "PASS" });
    writeSpecCard(projectRoot, "product-specs/widget.md", "1.0.0"); // bump chưa xảy ra

    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-033" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length > 0, "ARCHIVED with mismatched spec card version must still error");
    console.log("  PASS: ARCHIVED still enforces atomic bump invariant");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix B1: REJECTED/CANCELLED (exceptional) không enforce bump ----------

function testRejectedExceptionalSkipsBumpEnforcement() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-034", {
      linked_work_items: ["alpha"],
      cr_status: "REJECTED",
      accepted_spec_version: "",
      provenance: "",
      backlink: ""
    });
    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-034" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length === 0, `REJECTED CR (no bump) must pass aggregate validation, got ${JSON.stringify(errors)}`);
    console.log("  PASS: REJECTED exceptional status skips bump enforcement");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix M1: ACCEPTED với 0 linked work item phải fail ----------

function testAcceptedZeroLinkedWorkItemsErrors() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-035", {
      linked_work_items: [],
      cr_status: "ACCEPTED",
      accepted_spec_version: "2.0.0",
      provenance: "CR-035",
      backlink: "product-specs/widget.md"
    });
    writeSpecCard(projectRoot, "product-specs/widget.md", "2.0.0");

    const reconciled = reconcileCrAggregate({ projectRoot, changeId: "CR-035" });
    const errors = validateCrAggregateAcceptance(reconciled);
    assert(errors.length > 0, "ACCEPTED with zero linked work items must error");
    assert(
      errors.some((e) => /linked work item/i.test(e)),
      `error must mention linked work items, got ${JSON.stringify(errors)}`
    );
    console.log("  PASS: ACCEPTED with zero linked work items errors");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix m1: contribution của CR khác không tính vào unwaived_failures ----------

function testForeignCrContributionNotCountedAsFailure() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-036", {
      linked_work_items: ["alpha"],
      cr_status: "VERIFIED"
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    // alpha's s08 khai contribution cho CR KHÁC với coverage FAIL.
    writeS08Contribution(projectRoot, "alpha", "CR-999", { coverage_status: "FAIL", waived: false });

    const result = reconcileCrAggregate({ projectRoot, changeId: "CR-036" });
    assert(result.missing_contributions.includes("alpha"), "alpha counted missing (foreign cr_id)");
    assert(
      result.unwaived_failures.length === 0,
      `foreign-CR FAIL must NOT appear in unwaived_failures, got ${JSON.stringify(result.unwaived_failures)}`
    );
    console.log("  PASS: foreign-CR contribution not mis-attributed as failure");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix m10: findS08Note ưu tiên note artifact_role primary ----------

function testS08PrimaryNotePreferredOverDraft() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-037", {
      linked_work_items: ["alpha"],
      cr_status: "VERIFIED"
    });
    writeWorkItemReport(projectRoot, "alpha", "DONE");
    // Draft s08 sort trước theo alphabet ("abandoned-draft" < "verify-and-dod")
    // nhưng KHÔNG phải primary -> phải bị bỏ qua.
    writeFile(
      path.join(projectRoot, "work-items", "alpha", "alpha.s08.abandoned-draft.md"),
      [
        "---",
        "artifact_family: workflow-step",
        "artifact_role: draft",
        'work_item_slug: "alpha"',
        "---",
        "",
        "# stale draft (no contribution)"
      ].join("\n")
    );
    writeS08Contribution(projectRoot, "alpha", "CR-037", { coverage_status: "PASS" });

    const result = reconcileCrAggregate({ projectRoot, changeId: "CR-037" });
    assert(
      result.contributions.length === 1 && result.contributions[0].coverage_status === "PASS",
      `primary s08 must be the contribution source, got ${JSON.stringify(result.contributions)}`
    );
    assert(result.missing_contributions.length === 0, "no missing when primary note has contribution");
    console.log("  PASS: primary s08 note preferred over alphabetically-first draft");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix m3: workflowRootBase option được tôn trọng ----------

function testCustomWorkflowRootBase() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-038", {
      linked_work_items: ["alpha"],
      cr_status: "VERIFIED"
    });
    // Work item nằm ở custom root "delivery-items" thay vì "work-items".
    const customBase = path.join(projectRoot, "delivery-items");
    fs.mkdirSync(customBase, { recursive: true });
    const reportSrc = path.join(projectRoot, "work-items");
    // Ghi thẳng vào custom base.
    const slugRoot = path.join(customBase, "alpha");
    fs.mkdirSync(slugRoot, { recursive: true });
    fs.writeFileSync(
      path.join(slugRoot, "alpha.work-item-report.json"),
      JSON.stringify({ work_item_slug: "alpha", protocol_status: "DONE", decision_owner: "agent", approval_status: "APPROVED", review_required: true, work_item_type: "FEATURE", delivery_context: "brownfield", materialization_status: "MATERIALIZED", workflow_root: "delivery-items/alpha", current_step: "s08", granted_write_paths: [], required_actions: [], blockers: [], refs: [], audit_events: [], decision_log: [], review_notes: [], reviewed_by: "po", reviewed_at: "2026-07-16" }, null, 2),
      "utf8"
    );
    fs.writeFileSync(
      path.join(slugRoot, "alpha.s08.verify-and-dod.md"),
      [
        "---",
        "artifact_family: workflow-step",
        "artifact_role: primary",
        'work_item_slug: "alpha"',
        "---",
        "",
        "# s08",
        "",
        "## CR Coverage Contribution",
        "```yaml",
        "cr_id: CR-038",
        "work_item_slug: alpha",
        "coverage_status: PASS",
        "waived: false",
        'waiver_reason: ""',
        'contributes_to: ""',
        "```"
      ].join("\n"),
      "utf8"
    );

    const result = reconcileCrAggregate({ projectRoot, changeId: "CR-038", workflowRootBase: customBase });
    assert(result.contributions.length === 1, `custom root contribution collected, got ${JSON.stringify(result.missing_contributions)}`);
    assert(result.all_required_done === true, "custom root DONE resolved");
    console.log("  PASS: custom workflowRootBase respected");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running T7 CR aggregate reconciliation + atomic ACCEPTED spec bump tests...\n");
testReconcileAllDonePassCoveragePass();
testReconcileMissingContributionBlocks();
testReconcileUnwaivedFailureBlocksWaivedPasses();
testReconcileSiblingNotDoneBlocksAccept();
testReconcileFullProfileSkipsAggregate();
testAcceptedWithoutSpecVersionErrors();
testAcceptedSpecVersionMismatchErrors();
testAcceptedProvenanceMismatchErrors();
testAcceptedSiblingNotDoneErrors();
testVerifiedPrematureBumpErrors();
testVerifiedReadyNoErrors();
testAcceptedHappyPathNoErrors();
testArchivedAfterAcceptedNoErrors();
testArchivedStillEnforcesAtomicBump();
testRejectedExceptionalSkipsBumpEnforcement();
testAcceptedZeroLinkedWorkItemsErrors();
testForeignCrContributionNotCountedAsFailure();
testS08PrimaryNotePreferredOverDraft();
testCustomWorkflowRootBase();

// ---------- R3: reconcile emits CR mismatch to optional recorder ----------

function testReconcileEmitsMismatchToRecorder() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-040", {
      linked_work_items: ["beta"],
      cr_status: "VERIFIED"
    });
    // beta chưa DONE + coverage FAIL (un-waived) -> mismatch.
    writeWorkItemReport(projectRoot, "beta", "ACTIVE");
    writeS08Contribution(projectRoot, "beta", "CR-040", { coverage_status: "FAIL", waived: false });
    let recorded = null;
    const recorder = {
      recordCrReconciliationMismatch(metric) { recorded = metric; }
    };
    reconcileCrAggregate({ projectRoot, changeId: "CR-040", recorder });
    assert(recorded && recorded.cr_id === "CR-040", "recorder must receive cr_id mismatch metric");
    assert(typeof recorded.missing === "number", "metric carries missing count");
    assert(typeof recorded.unwaived_failures === "number", "metric carries unwaived_failures count");
    assert(typeof recorded.coverage_pass === "boolean", "metric carries coverage_pass");
    console.log("  PASS: reconcile emits CR mismatch metric to optional recorder");
  } finally {
    rmrf(projectRoot);
  }
}

function testReconcileWithoutRecorderIsNoop() {
  const projectRoot = buildProject();
  try {
    writeCompactRequest(projectRoot, "CR-041", {
      linked_work_items: [],
      cr_status: "DRAFT"
    });
    const result = reconcileCrAggregate({ projectRoot, changeId: "CR-041" });
    assert(result.aggregate_applicable === true, "reconcile still works without recorder");
    console.log("  PASS: reconcile without recorder is backward-compatible (noop)");
  } finally {
    rmrf(projectRoot);
  }
}

testReconcileEmitsMismatchToRecorder();
testReconcileWithoutRecorderIsNoop();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in cr-aggregate-reconcile.test.js`);
  process.exit(1);
}
console.log("\nAll T7 CR aggregate reconciliation + atomic ACCEPTED spec bump tests passed.");