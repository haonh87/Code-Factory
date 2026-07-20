// Review fix S5 (AC-12): legacy vocabulary phải dual-read ĐƯỢC nhưng kèm
// console.warn — migration window là trạng thái có tiếng ồn chủ đích, không im
// lặng. Canonical path không được warn.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { loadChangeProposalState } = require("../scripts/change-item-utils");

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
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-warn-"));
  fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
  return projectRoot;
}

function captureWarnings(run) {
  const warnings = [];
  const original = console.warn;
  console.warn = (...args) => warnings.push(args.join(" "));
  try {
    run();
  } finally {
    console.warn = original;
  }
  return warnings;
}

// ---------- S5: đọc legacy CHANGE-### dir + change_* fields -> warning ----------

function testLegacyReadEmitsWarning() {
  const projectRoot = buildProject();
  try {
    writeFile(
      path.join(projectRoot, "changes", "CHANGE-201", "proposal.md"),
      [
        "---",
        "change_id: CHANGE-201",
        'artifact_kind: "change-proposal"',
        "status: draft",
        "decision_owner: agent",
        "review_required: true",
        "approval_status: PENDING_REVIEW",
        'reviewed_by: ""',
        'reviewed_at: ""',
        "linked_work_items: []",
        'request_summary: "legacy"',
        "review_notes: []",
        "---",
        "",
        "# Proposal"
      ].join("\n")
    );
    const warnings = captureWarnings(() => {
      loadChangeProposalState({ projectRoot, changeId: "CHANGE-201" });
    });
    assert(
      warnings.some((w) => /legacy/i.test(w) && /CHANGE-201/.test(w)),
      `legacy read must emit warning naming the legacy id, got ${JSON.stringify(warnings)}`
    );
    console.log("  PASS: legacy CHANGE dir read emits deprecation warning");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- S5: canonical compact read KHÔNG warn ----------

function testCanonicalReadNoWarning() {
  const projectRoot = buildProject();
  try {
    writeFile(
      path.join(projectRoot, "changes", "CR-202", "request.md"),
      [
        "---",
        "cr_id: CR-202",
        "cr_profile: compact",
        "cr_status: DRAFT",
        'cr_strategy: "create_new"',
        'artifact_kind: "cr-request"',
        "decision_owner: agent",
        "review_required: true",
        "approval_status: PENDING_REVIEW",
        'reviewed_by: ""',
        'reviewed_at: ""',
        "linked_work_items: []",
        'request_summary: "canonical"',
        'defect_source: "n/a"',
        "spec_impact_classified: false",
        "linked_crs: []",
        "review_notes: []",
        "---",
        "",
        "# CR"
      ].join("\n")
    );
    const warnings = captureWarnings(() => {
      loadChangeProposalState({ projectRoot, changeId: "CR-202" });
    });
    assert(warnings.length === 0, `canonical read must not warn, got ${JSON.stringify(warnings)}`);
    console.log("  PASS: canonical compact read emits no warning");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running change-item-utils (legacy dual-read warning) tests...\n");
testLegacyReadEmitsWarning();
testCanonicalReadNoWarning();

// ---------- R2: cr_vocabulary rollout flag gates reader dir discovery ----------

function writeLegacyChangePackage(projectRoot, dirName) {
  writeFile(
    path.join(projectRoot, "changes", dirName, "proposal.md"),
    [`---`, `change_id: ${dirName}`, `artifact_kind: "change-proposal"`, `status: draft`, `---`, `# Proposal`].join("\n")
  );
}

function writeCanonicalChangePackage(projectRoot, dirName) {
  writeFile(
    path.join(projectRoot, "changes", dirName, "request.md"),
    [`---`, `cr_id: ${dirName}`, `cr_profile: compact`, `cr_status: DRAFT`, `---`, `# CR Request`].join("\n")
  );
}

function testCrVocabularyDualReadsBoth() {
  // dual (default): cả canonical CR- và legacy CHANGE- đều discovery được.
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-vocab-"));
  try {
    fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
    writeCanonicalChangePackage(projectRoot, "CR-021");
    writeLegacyChangePackage(projectRoot, "CHANGE-022");
    const canonical = loadChangeProposalState({ projectRoot, changeId: "CR-021", vocabulary: "dual" });
    assert(canonical.state.cr_id === "CR-021", "dual must discover canonical CR- dir");
    const legacy = loadChangeProposalState({ projectRoot, changeId: "CHANGE-022", vocabulary: "dual" });
    assert(legacy.state.cr_id === "CR-022", "dual must discover legacy CHANGE- dir (normalize to CR-)");
    console.log("  PASS: cr_vocabulary=dual discovers both canonical and legacy dirs");
  } finally {
    rmrf(projectRoot);
  }
}

function testCrVocabularyCanonicalIgnoresLegacy() {
  // canonical: legacy CHANGE- dir KHÔNG được fallback. Force canonical-only.
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-vocab-"));
  try {
    fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
    writeLegacyChangePackage(projectRoot, "CHANGE-023");
    let threw = false;
    try {
      loadChangeProposalState({ projectRoot, changeId: "CR-023", vocabulary: "canonical" });
    } catch (error) {
      threw = true;
    }
    assert(threw, "canonical vocabulary must NOT fall back to legacy CHANGE- dir (force canonical)");
    console.log("  PASS: cr_vocabulary=canonical ignores legacy dir (no fallback)");
  } finally {
    rmrf(projectRoot);
  }
}

function testCrVocabularyLegacyIgnoresCanonical() {
  // legacy: canonical CR- dir KHÔNG được discovery. Force legacy-only.
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-vocab-"));
  try {
    fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
    writeCanonicalChangePackage(projectRoot, "CR-024");
    let threw = false;
    try {
      loadChangeProposalState({ projectRoot, changeId: "CR-024", vocabulary: "legacy" });
    } catch (error) {
      threw = true;
    }
    assert(threw, "legacy vocabulary must NOT discover canonical CR- dir (force legacy)");
    console.log("  PASS: cr_vocabulary=legacy ignores canonical dir (no fallback)");
  } finally {
    rmrf(projectRoot);
  }
}

testCrVocabularyDualReadsBoth();
testCrVocabularyCanonicalIgnoresLegacy();
testCrVocabularyLegacyIgnoresCanonical();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in change-item-utils.test.js`);
  process.exit(1);
}
console.log("\nAll change-item-utils (legacy dual-read warning) tests passed.");
