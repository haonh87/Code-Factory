const fs = require("fs");
const os = require("os");
const path = require("path");
const { migrateChangeVocabulary } = require("../scripts/change-item");

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

function writeLegacyFullPackage(projectRoot, changeId) {
  const changeRoot = path.join(projectRoot, "changes", changeId);
  writeFile(
    path.join(changeRoot, "proposal.md"),
    [
      "---",
      `change_id: ${changeId}`,
      'artifact_kind: "change-proposal"',
      "status: draft",
      "change_status: draft",
      "change_strategy: create_new",
      "linked_changes: []",
      "decision_owner: agent",
      "review_required: true",
      "approval_status: APPROVED",
      'reviewed_by: "po"',
      'reviewed_at: "2026-07-16"',
      "linked_work_items: []",
      'request_summary: "legacy"',
      "review_notes: []",
      "---",
      "",
      "# Proposal"
    ].join("\n")
  );
  ["design.md", "tasks.md"].forEach((rel) => {
    writeFile(path.join(changeRoot, rel), `---\nchange_id: ${changeId}\nartifact_kind: "x"\nchange_status: draft\n---\n# ${rel}\n`);
  });
  return changeRoot;
}

function buildProject() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-migrate-"));
  fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
  return projectRoot;
}

// ---------- Dry-run default: prints plan, writes nothing ----------

function testDryRunDefaultWritesNothing() {
  const projectRoot = buildProject();
  try {
    writeLegacyFullPackage(projectRoot, "CHANGE-007");
    const result = migrateChangeVocabulary({ projectRoot });
    assert(result.dryRun === true, "migrate must default to dry-run");
    assert(result.plan && result.plan.length === 1, `dry-run must plan 1 package, got ${result.plan && result.plan.length}`);
    assert(result.plan[0].from === "CHANGE-007" && result.plan[0].to === "CR-007", "plan must map CHANGE-007 -> CR-007");
    // Không rename, không rewrite.
    assert(fs.existsSync(path.join(projectRoot, "changes", "CHANGE-007")), "dry-run must keep legacy dir");
    assert(!fs.existsSync(path.join(projectRoot, "changes", "CR-007")), "dry-run must NOT create canonical dir");
    const proposal = fs.readFileSync(path.join(projectRoot, "changes", "CHANGE-007", "proposal.md"), "utf8");
    assert(/^change_id: CHANGE-007$/m.test(proposal), "dry-run must NOT rewrite frontmatter");
    console.log("  PASS: dry-run (default) plans without writing");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Non-dry-run: rename dir + rewrite frontmatter aliases ----------

function testMigrateRenamesAndRewrites() {
  const projectRoot = buildProject();
  try {
    writeLegacyFullPackage(projectRoot, "CHANGE-008");
    const result = migrateChangeVocabulary({ projectRoot, dryRun: false });
    assert(result.dryRun === false, "non-dry-run reported");
    assert(result.applied === 1, `applied count 1, got ${result.applied}`);
    assert(!fs.existsSync(path.join(projectRoot, "changes", "CHANGE-008")), "legacy dir renamed away");
    const canonicalRoot = path.join(projectRoot, "changes", "CR-008");
    assert(fs.existsSync(canonicalRoot), "canonical dir created");
    const proposal = fs.readFileSync(path.join(canonicalRoot, "proposal.md"), "utf8");
    assert(/^cr_id: CR-008$/m.test(proposal), "frontmatter change_id -> cr_id");
    assert(!/^change_id:/m.test(proposal), "legacy change_id removed");
    assert(/^cr_status: DRAFT$/m.test(proposal), "change_status -> cr_status (canonical uppercase)");
    assert(/^cr_strategy: create_new$/m.test(proposal), "change_strategy -> cr_strategy");
    const design = fs.readFileSync(path.join(canonicalRoot, "design.md"), "utf8");
    assert(/^cr_id: CR-008$/m.test(design), "secondary file cr_id rewritten");
    console.log("  PASS: migrate renames dir + rewrites frontmatter aliases");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Idempotent: canonical dir is no-op ----------

function testMigrateIdempotent() {
  const projectRoot = buildProject();
  try {
    writeLegacyFullPackage(projectRoot, "CHANGE-009");
    migrateChangeVocabulary({ projectRoot, dryRun: false });
    // Second run: nothing left to migrate.
    const result2 = migrateChangeVocabulary({ projectRoot, dryRun: false });
    assert(result2.applied === 0, `second run must apply 0, got ${result2.applied}`);
    assert(result2.plan.length === 0, "second run plan empty (idempotent)");
    // Canonical dir untouched.
    const proposal = fs.readFileSync(path.join(projectRoot, "changes", "CR-009", "proposal.md"), "utf8");
    assert(/^cr_id: CR-009$/m.test(proposal), "canonical file unchanged after second run");
    console.log("  PASS: migrate idempotent (canonical dirs no-op)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- --change-id restricts scope ----------

function testMigrateScopedByChangeId() {
  const projectRoot = buildProject();
  try {
    writeLegacyFullPackage(projectRoot, "CHANGE-010");
    writeLegacyFullPackage(projectRoot, "CHANGE-011");
    const result = migrateChangeVocabulary({ projectRoot, changeId: "CHANGE-010", dryRun: false });
    assert(result.applied === 1, `scoped migrate applies 1, got ${result.applied}`);
    assert(fs.existsSync(path.join(projectRoot, "changes", "CR-010")), "scoped target renamed");
    assert(fs.existsSync(path.join(projectRoot, "changes", "CHANGE-011")), "non-target left untouched");
    console.log("  PASS: migrate scoped by --change-id");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix m6: value canonicalization (status uppercase, linked ids) ----------

function testMigrateCanonicalizesValues() {
  const projectRoot = buildProject();
  try {
    // Package legacy có linked_changes trỏ CR khác bằng ID legacy.
    const changeRoot = path.join(projectRoot, "changes", "CHANGE-012");
    writeFile(
      path.join(changeRoot, "proposal.md"),
      [
        "---",
        "change_id: CHANGE-012",
        'artifact_kind: "change-proposal"',
        "status: draft",
        "change_status: draft",
        "change_strategy: create_new",
        "linked_changes:",
        '  - "CHANGE-001"',
        "  - CHANGE-002",
        "decision_owner: agent",
        "review_required: true",
        "approval_status: APPROVED",
        'reviewed_by: "po"',
        'reviewed_at: "2026-07-16"',
        "linked_work_items: []",
        'request_summary: "legacy"',
        "review_notes: []",
        "---",
        "",
        "# Proposal"
      ].join("\n")
    );
    const { migrateChangeVocabulary: migrate } = require("../scripts/change-item");
    migrate({ projectRoot, dryRun: false });
    const proposal = fs.readFileSync(path.join(projectRoot, "changes", "CR-012", "proposal.md"), "utf8");
    const frontmatter = proposal.split("---")[1] || "";
    // change_status: draft -> cr_status: DRAFT (canonical uppercase vocab).
    assert(/^cr_status: DRAFT$/m.test(proposal), `cr_status value must be uppercased, got: ${(proposal.match(/^cr_status:.*$/m) || [])[0]}`);
    // linked_changes list items CHANGE-### -> CR-### dưới key linked_crs.
    assert(/^linked_crs:$/m.test(proposal), "linked_crs multiline key present");
    assert(/CR-001/.test(frontmatter) && /CR-002/.test(frontmatter), "linked ids canonicalized to CR-###");
    assert(!/CHANGE-001|CHANGE-002/.test(frontmatter), `frontmatter must not retain legacy linked ids, got: ${frontmatter}`);
    console.log("  PASS: migrate canonicalizes status case + linked CR ids");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix m7: skip-do-canonical-tồn-tại phải được report rõ ----------

function testMigrateReportsShadowedSkips() {
  const projectRoot = buildProject();
  try {
    writeLegacyFullPackage(projectRoot, "CHANGE-013");
    // Canonical dir đã tồn tại trước -> migrate phải skip (no-clobber) và
    // REPORT skip đó trong kết quả, không im lặng.
    writeFile(path.join(projectRoot, "changes", "CR-013", "request.md"), "---\ncr_id: CR-013\n---\n# existing");
    const result = migrateChangeVocabulary({ projectRoot, changeId: "CHANGE-013", dryRun: false });
    assert(result.applied === 0, `shadowed package must not be applied, got ${result.applied}`);
    assert(
      Array.isArray(result.skipped) && result.skipped.length === 1,
      `skipped list must report the shadowed package, got ${JSON.stringify(result.skipped)}`
    );
    assert(
      result.skipped[0].from === "CHANGE-013" && /exist/i.test(result.skipped[0].reason || ""),
      `skip entry must carry from + reason, got ${JSON.stringify(result.skipped)}`
    );
    // Legacy dir vẫn còn (không clobber).
    assert(fs.existsSync(path.join(projectRoot, "changes", "CHANGE-013")), "legacy dir kept on skip");
    console.log("  PASS: migrate reports shadowed skips explicitly");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running change-item migrate (dry-run idempotent) tests...\n");
testDryRunDefaultWritesNothing();
testMigrateRenamesAndRewrites();
testMigrateIdempotent();
testMigrateScopedByChangeId();
testMigrateCanonicalizesValues();
testMigrateReportsShadowedSkips();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in change-item-migrate.test.js`);
  process.exit(1);
}
console.log("\nAll change-item migrate (dry-run idempotent) tests passed.");