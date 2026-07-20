const fs = require("fs");
const os = require("os");
const path = require("path");
const { validateWorkflowSdd } = require("../scripts/validate-workflow-sdd");

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

const VALID_CARD = [
  "---",
  'artifact_id: "light-item.card"',
  "artifact_family: product-spec",
  "spec_type: SPEC_CARD",
  'spec_status: "approved"',
  'spec_version: "1.0"',
  'owner: "ba"',
  "reviewers:",
  '  - "developer"',
  "source_of_truth: true",
  "linked_work_items: []",
  "linked_crs: []",
  "---",
  "",
  "# Spec Card - light-item",
  "",
  "## Business Goal",
  "```yaml",
  'business_goal: "Cho phép tìm kiếm session theo scope"',
  "in_scope:",
  '  - "workflow authoring"',
  "out_scope: []",
  "```",
  "",
  "## Requirements",
  "```yaml",
  "requirements:",
  "  - id: REQ-001",
  '    description: "Truy vấn đúng theo scope"',
  "    provenance: BASELINE",
  "    cr_required: false",
  "  - id: REQ-002",
  '    description: "Lọc theo tag"',
  "    provenance: CR-001",
  "    cr_required: true",
  "```",
  "",
  "## Acceptance Criteria",
  "```yaml",
  "acceptance_criteria:",
  "  - id: AC-001",
  "    requirement: REQ-001",
  '    description: "Trả về đúng scope"',
  "  - id: AC-002",
  "    requirement: REQ-002",
  '    description: "Lọc theo tag đúng"',
  "```",
  "",
  "## Assumptions And Open Decisions",
  "```yaml",
  "assumptions:",
  "  - id: ASM-001",
  '    description: "Scope ổn định"',
  '    owner: "ba"',
  "open_decisions:",
  "  - id: ODC-001",
  '    description: "Chọn store"',
  '    owner: "po"',
  "```",
  "",
  "## Spec Freeze",
  "```yaml",
  "status: FROZEN",
  'authority: "po"',
  'decided_at: "2026-07-16"',
  "```",
  ""
].join("\n");

const VALID_NOTE = [
  "---",
  'artifact_id: "light-item.s04.acceptance-criteria"',
  "artifact_family: workflow-step",
  "artifact_role: primary",
  "sdd_mode: light",
  "spec_status: approved",
  "spec_refs:",
  '  card: "product-specs/cards/light-item.md"',
  "---",
  "",
  "# s04 - Acceptance Criteria",
  "",
  "## Spec Freeze",
  "```yaml",
  "status: READY",
  "requirement_ids: [REQ-001, REQ-002]",
  "```",
  "",
  "## SDD Traceability",
  "```yaml",
  "requirement_refs: [REQ-001, REQ-002]",
  "acceptance_refs: [AC-001, AC-002]",
  "```",
  ""
].join("\n");

function buildFixture(cardContent, noteContent = VALID_NOTE) {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sdd-light-card-"));
  writeFile(path.join(projectRoot, "product-specs", "cards", "light-item.md"), cardContent);
  writeFile(path.join(projectRoot, "work-items", "light-item", "light-item.s04.acceptance-criteria.md"), noteContent);
  return projectRoot;
}

function runValidation(projectRoot) {
  return validateWorkflowSdd({
    workflowRoot: path.join(projectRoot, "work-items", "light-item"),
    projectRoot
  });
}

function expectOk(projectRoot, label) {
  const result = runValidation(projectRoot);
  assert(result.ok === true, `${label}: expected ok=true, got errors: ${(result.errors || []).join(" | ")}`);
  console.log(`  PASS: ${label}`);
}

function expectFail(projectRoot, label, expectedErrorSubstring) {
  const result = runValidation(projectRoot);
  assert(result.ok === false, `${label}: expected ok=false, but validation passed`);
  if (expectedErrorSubstring) {
    const joined = (result.errors || []).join("\n");
    assert(
      joined.includes(expectedErrorSubstring),
      `${label}: expected error to include '${expectedErrorSubstring}', got: ${joined}`
    );
  }
  console.log(`  PASS: ${label} (fails as expected)`);
}

function testValidLightCard() {
  const projectRoot = buildFixture(VALID_CARD);
  try {
    expectOk(projectRoot, "valid-light-card");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testMissingProvenance() {
  const card = VALID_CARD.replace("    provenance: BASELINE\n", "\n");
  const projectRoot = buildFixture(card);
  try {
    expectFail(projectRoot, "missing-provenance-origin", "provenance");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testAcMappingUnknownRequirement() {
  const card = VALID_CARD.replace("    requirement: REQ-001", "    requirement: REQ-999");
  const projectRoot = buildFixture(card);
  try {
    expectFail(projectRoot, "ac-mapping-unknown-requirement", "unknown requirement");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testAcMissingRequirementMapping() {
  const card = VALID_CARD.replace("    requirement: REQ-001\n", "\n");
  const projectRoot = buildFixture(card);
  try {
    expectFail(projectRoot, "ac-missing-requirement-mapping", "missing requirement mapping");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testFreezeAuthorityMissing() {
  const card = VALID_CARD.replace('authority: "po"\n', "\n");
  const projectRoot = buildFixture(card);
  try {
    expectFail(projectRoot, "freeze-authority-missing", "freeze authority");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testRequiredCrMissing() {
  // REQ-002 declares cr_required: true but provenance is BASELINE (no CR ref) -> fail.
  const card = VALID_CARD.replace("    provenance: CR-001\n    cr_required: true", "    provenance: BASELINE\n    cr_required: true");
  const projectRoot = buildFixture(card);
  try {
    expectFail(projectRoot, "required-cr-missing", "requires CR");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testDuplicateRequirementId() {
  const card = VALID_CARD.replace("  - id: REQ-002", "  - id: REQ-001");
  const projectRoot = buildFixture(card);
  try {
    expectFail(projectRoot, "duplicate-requirement-id", "duplicate requirement id");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testDuplicateAcId() {
  const card = VALID_CARD.replace("  - id: AC-002", "  - id: AC-001");
  const projectRoot = buildFixture(card);
  try {
    expectFail(projectRoot, "duplicate-ac-id", "duplicate acceptance criteria id");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testRequirementWithoutAcMapping() {
  // Add a third requirement with no AC referencing it -> fail.
  const card = VALID_CARD.replace(
    "    provenance: CR-001\n    cr_required: true\n```",
    "    provenance: CR-001\n    cr_required: true\n  - id: REQ-003\n    description: \"Extra\"\n    provenance: BASELINE\n    cr_required: false\n```"
  );
  const projectRoot = buildFixture(card);
  try {
    expectFail(projectRoot, "requirement-without-ac-mapping", "no acceptance criteria");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testInvalidProvenanceValue() {
  const card = VALID_CARD.replace("    provenance: BASELINE", "    provenance: LEGACY");
  const projectRoot = buildFixture(card);
  try {
    expectFail(projectRoot, "invalid-provenance-value", "provenance");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

// --- AC-04 deepening (review fix T2): freeze decision, identity, owner ---

function testFreezeStatusMissing() {
  // Xóa dòng status trong ## Spec Freeze -> phải fail (freeze decision là bắt buộc).
  const broken = VALID_CARD.replace("status: FROZEN\n", "");
  const projectRoot = buildFixture(broken);
  try {
    expectFail(projectRoot, "freeze-status-missing", "freeze status");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testFreezeStatusInvalidValue() {
  const broken = VALID_CARD.replace("status: FROZEN", "status: MAYBE");
  const projectRoot = buildFixture(broken);
  try {
    expectFail(projectRoot, "freeze-status-invalid", "freeze status");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testFrozenRequiresDecidedAt() {
  const broken = VALID_CARD.replace('decided_at: "2026-07-16"', 'decided_at: ""');
  const projectRoot = buildFixture(broken);
  try {
    expectFail(projectRoot, "frozen-requires-decided-at", "decided_at");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testDraftFreezeDoesNotRequireDecidedAt() {
  // Freeze status draft (chưa freeze) không bắt decided_at.
  const draftFreeze = VALID_CARD
    .replace("status: FROZEN", "status: draft")
    .replace('decided_at: "2026-07-16"', 'decided_at: ""');
  const projectRoot = buildFixture(draftFreeze);
  try {
    expectOk(projectRoot, "draft-freeze-no-decided-at");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testSpecVersionMissing() {
  const broken = VALID_CARD.replace('spec_version: "1.0"\n', "");
  const projectRoot = buildFixture(broken);
  try {
    expectFail(projectRoot, "spec-version-missing", "spec_version");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testOpenDecisionMissingOwner() {
  const broken = VALID_CARD.replace(
    ["  - id: ODC-001", '    description: "Chọn store"', '    owner: "po"'].join("\n"),
    ["  - id: ODC-001", '    description: "Chọn store"'].join("\n")
  );
  const projectRoot = buildFixture(broken);
  try {
    expectFail(projectRoot, "open-decision-missing-owner", "owner");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testAssumptionMissingOwner() {
  const broken = VALID_CARD.replace(
    ["  - id: ASM-001", '    description: "Scope ổn định"', '    owner: "ba"'].join("\n"),
    ["  - id: ASM-001", '    description: "Scope ổn định"'].join("\n")
  );
  const projectRoot = buildFixture(broken);
  try {
    expectFail(projectRoot, "assumption-missing-owner", "owner");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testMissingCardRef() {
  // Note references a card path that does not exist.
  const note = VALID_NOTE.replace('card: "product-specs/cards/light-item.md"', 'card: "product-specs/cards/missing.md"');
  const projectRoot = buildFixture(VALID_CARD, note);
  try {
    expectFail(projectRoot, "missing-card-ref", "Missing referenced spec");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

function testStrictModeRegression() {
  // Strict mode must still validate brd/srs (existing behavior unchanged).
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sdd-strict-regression-"));
  const brd = [
    "---",
    'artifact_id: "strict-item.brd"',
    "artifact_family: product-spec",
    "spec_type: BRD",
    'spec_status: "approved"',
    'spec_version: "1.0"',
    'owner: "po"',
    "reviewers:",
    '  - "ba"',
    "source_of_truth: true",
    "linked_work_items: []",
    "linked_changes: []",
    "---",
    "",
    "# BRD - strict-item",
    "",
    "## Business Context",
    "```yaml",
    "business_goals:",
    "  - id: BRD-001",
    '    description: "Goal"',
    "scope:",
    '  in: ["x"]',
    "  out: []",
    "```",
    ""
  ].join("\n");
  const srs = [
    "---",
    'artifact_id: "strict-item.srs"',
    "artifact_family: product-spec",
    "spec_type: SRS",
    'spec_status: "approved"',
    'spec_version: "1.0"',
    'owner: "ba"',
    "reviewers:",
    '  - "developer"',
    "source_of_truth: true",
    "linked_work_items: []",
    "linked_changes: []",
    "---",
    "",
    "# SRS - strict-item",
    "",
    "## Requirement Spec",
    "```yaml",
    "functional_requirements:",
    "  - id: SRS-FR-001",
    '    description: "FR"',
    "    source_refs: [BRD-001]",
    "    acceptance_refs: [AC-001]",
    "```",
    ""
  ].join("\n");
  const note = [
    "---",
    'artifact_id: "strict-item.s04.acceptance-criteria"',
    "artifact_family: workflow-step",
    "artifact_role: primary",
    "sdd_mode: strict",
    "spec_status: frozen",
    "spec_refs:",
    '  brd: "product-specs/brd/strict-item.md"',
    '  srs: "product-specs/srs/strict-item.md"',
    "---",
    "",
    "# s04",
    "",
    "## Spec Freeze",
    "```yaml",
    "status: READY",
    "requirement_ids: [BRD-001, SRS-FR-001]",
    "accepted_assumptions: []",
    "blockers: []",
    "```",
    "",
    "## SDD Traceability",
    "```yaml",
    "requirement_refs: [SRS-FR-001]",
    "acceptance_refs: [AC-001]",
    "task_refs: [TASK-001]",
    "test_refs: [TEST-001]",
    "```",
    ""
  ].join("\n");
  writeFile(path.join(projectRoot, "product-specs", "brd", "strict-item.md"), brd);
  writeFile(path.join(projectRoot, "product-specs", "srs", "strict-item.md"), srs);
  writeFile(path.join(projectRoot, "work-items", "strict-item", "strict-item.s04.acceptance-criteria.md"), note);
  try {
    const result = validateWorkflowSdd({
      workflowRoot: path.join(projectRoot, "work-items", "strict-item"),
      projectRoot
    });
    assert(result.ok === true, `strict-regression: expected ok=true, got: ${(result.errors || []).join(" | ")}`);
    console.log("  PASS: strict-mode-regression (brd/srs path unchanged)");
  } finally {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

console.log("Running validate-workflow-sdd (Spec Card) tests...\n");

testValidLightCard();
testMissingProvenance();
testInvalidProvenanceValue();
testAcMappingUnknownRequirement();
testAcMissingRequirementMapping();
testRequirementWithoutAcMapping();
testFreezeAuthorityMissing();
testRequiredCrMissing();
testDuplicateRequirementId();
testDuplicateAcId();
testFreezeStatusMissing();
testFreezeStatusInvalidValue();
testFrozenRequiresDecidedAt();
testDraftFreezeDoesNotRequireDecidedAt();
testSpecVersionMissing();
testOpenDecisionMissingOwner();
testAssumptionMissingOwner();
testMissingCardRef();
testStrictModeRegression();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in validate-workflow-sdd.test.js`);
  process.exit(1);
}
console.log("\nAll validate-workflow-sdd (Spec Card) tests passed.");