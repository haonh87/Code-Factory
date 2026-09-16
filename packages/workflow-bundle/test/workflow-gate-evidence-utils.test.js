const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  getRequiredFinalizedGateKeys,
  resolveArtifactReference
} = require("../scripts/workflow-gate-evidence-utils");

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

function expectReferenceError(fn, code) {
  try {
    fn();
    assert(false, `expected ${code}`);
  } catch (error) {
    assert(error && error.code === code, `expected ${code}, got ${error && error.code}: ${error && error.message}`);
  }
}

console.log("Running artifact reference resolver tests...\n");

const adaptiveMaintenanceGates = {
  spec: "not_applicable",
  contract: "not_applicable",
  dor: "not_applicable",
  approach: "not_applicable",
  foundation: "not_applicable",
  task_plan: "required",
  uat: "not_applicable",
  dod: "required",
  release: "not_applicable",
  business_acceptance: "not_applicable"
};
assert(
  getRequiredFinalizedGateKeys("s04", adaptiveMaintenanceGates, "none", "adaptive_v1").length === 0,
  "T4 adaptive reader treats maintenance s04 gates as explicitly not applicable"
);
assert(
  getRequiredFinalizedGateKeys("s06", adaptiveMaintenanceGates, "none", "adaptive_v1").join(",") === "task_plan",
  "T4 adaptive reader requires only task_plan at s06"
);
assert(
  getRequiredFinalizedGateKeys("s04", adaptiveMaintenanceGates, "none", "legacy_v1").join(",") === "spec,dor",
  "T4 legacy reader preserves fixed-shape spec/dor requirements"
);

const repoRoot = path.resolve(__dirname, "..", "..", "..");


// D-E / T7: this assertion used to read a LIVE work item note and require protocol_status to be
// ACTIVE. It broke the moment that work item closed, which made the suite result depend on which
// work items happen to be ACTIVE rather than on the resolver. The fixture below controls its own
// input instead.
//
// protocol_status is deliberately VERIFIED - a value no work item in this repo carries - so the
// assertion cannot pass by coincidence if the resolver ever returns a constant or a stale read.
const sameNoteRoot = fs.mkdtempSync(path.join(os.tmpdir(), "artifact-reference-same-note-"));
try {
  const fixtureNote = path.join(
    sameNoteRoot,
    "work-items",
    "fixture-item",
    "fixture-item.s01.restate.md"
  );
  writeFile(
    fixtureNote,
    [
      "---",
      'artifact_id: "fixture-item.s01.restate"',
      'work_item_slug: "fixture-item"',
      "---",
      "",
      "# Step 1 - Clarify",
      "",
      "## Work Item Protocol",
      "```yaml",
      "protocol_status: VERIFIED",
      'work_item_slug: "fixture-item"',
      "```",
      ""
    ].join("\n")
  );

  const sameNote = resolveArtifactReference({
    projectRoot: sameNoteRoot,
    currentFile: fixtureNote,
    reference: "#Work Item Protocol.protocol_status"
  });
  assert(
    sameNote.value === "VERIFIED",
    `same-note resolver must read protocol_status from the note it was given (got ${sameNote.value})`
  );
} finally {
  fs.rmSync(sameNoteRoot, { recursive: true, force: true });
}

// Merge note (2026-08-28): main's 26591a2 fixed the same original brittleness a different way -
// it kept reading the live note but compared against the live report, so a status change no longer
// breaks it. AC-006 requires the CONTROLLED fixture, so that one is authoritative here; main's
// live self-consistency check is kept as an additional assertion so the merge loses nothing.
// The live check is coupled to that work item continuing to EXIST, which is the residual risk
// already recorded in s07 as residual-cross-file and owned by the test-hygiene work item.
const liveS01 = path.join(
  repoRoot,
  "work-items",
  "artifact-governance-enforcement",
  "artifact-governance-enforcement.s01.restate.md"
);
const liveReport = JSON.parse(
  fs.readFileSync(
    path.join(
      repoRoot,
      "work-items",
      "artifact-governance-enforcement",
      "artifact-governance-enforcement.work-item-report.json"
    ),
    "utf8"
  )
);
const liveSameNote = resolveArtifactReference({
  projectRoot: repoRoot,
  currentFile: liveS01,
  reference: "#Work Item Protocol.protocol_status"
});
assert(
  liveSameNote.value === liveReport.protocol_status,
  "same-note resolver must match the live P2 protocol source-of-truth"
);

const liveCrossFile = resolveArtifactReference({
  projectRoot: repoRoot,
  currentFile: __filename,
  reference:
    "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s01.restate.md#Work Item Materialization.work_item_slug"
});
assert(liveCrossFile.value === "artifact-governance-enforcement", "cross-file resolver must read the live P2 materialization block");

const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "artifact-reference-"));
try {
  const currentFile = path.join(projectRoot, "work-items", "example", "example.s06.task-breakdown.md");
  const otherFile = path.join(projectRoot, "product-specs", "cards", "example.md");

  writeFile(
    currentFile,
    [
      "# Example",
      "",
      "## Main Artifact",
      "```yaml",
      "task_breakdown:",
      "  - id: T1",
      "    paths_in_scope:",
      '      - "packages/a.js"',
      '      - "packages/a.test.js"',
      "  - id: T2",
      "    paths_in_scope: []",
      "```",
      ""
    ].join("\n")
  );
  writeFile(
    otherFile,
    [
      "# Card",
      "",
      "## Acceptance Criteria",
      "```yaml",
      "acceptance_criteria:",
      "  - id: AC-001",
      '    criterion: "Resolver follows a repository-root reference"',
      "```",
      ""
    ].join("\n")
  );

  const sameNote = resolveArtifactReference({
    projectRoot,
    currentFile,
    reference: "#Main Artifact.task_breakdown[T1].paths_in_scope"
  });
  assert(Array.isArray(sameNote.value), "same-note reference must resolve a list");
  assert(sameNote.value.length === 2 && sameNote.value[0] === "packages/a.js", "same-note list contents must be preserved");
  assert(sameNote.artifactPath === currentFile, "same-note reference must resolve currentFile");

  const crossFile = resolveArtifactReference({
    projectRoot,
    currentFile,
    reference: "product-specs/cards/example.md#Acceptance Criteria.acceptance_criteria[AC-001].criterion"
  });
  assert(crossFile.value === "Resolver follows a repository-root reference", "cross-file reference must resolve by repository root");
  assert(crossFile.artifactPath === otherFile, "cross-file reference must return the target path");

  expectReferenceError(
    () => resolveArtifactReference({ projectRoot, currentFile, reference: "missing.md#Main Artifact.value" }),
    "ARTIFACT_REFERENCE_FILE_MISSING"
  );
  expectReferenceError(
    () => resolveArtifactReference({ projectRoot, currentFile, reference: "#Missing Heading.value" }),
    "ARTIFACT_REFERENCE_HEADING_MISSING"
  );

  const noYaml = path.join(projectRoot, "no-yaml.md");
  writeFile(noYaml, "## Main Artifact\nPlain text only.\n");
  expectReferenceError(
    () => resolveArtifactReference({ projectRoot, currentFile, reference: "no-yaml.md#Main Artifact.value" }),
    "ARTIFACT_REFERENCE_YAML_MISSING"
  );
  expectReferenceError(
    () => resolveArtifactReference({ projectRoot, currentFile, reference: "#Main Artifact.task_breakdown[T9].paths_in_scope" }),
    "ARTIFACT_REFERENCE_PATH_MISSING"
  );

  const unsafeYaml = path.join(projectRoot, "unsafe-yaml.md");
  writeFile(unsafeYaml, "## Main Artifact\n```yaml\n__proto__:\n  polluted: true\n```\n");
  expectReferenceError(
    () => resolveArtifactReference({ projectRoot, currentFile, reference: "unsafe-yaml.md#Main Artifact.__proto__" }),
    "ARTIFACT_REFERENCE_YAML_INVALID"
  );
} finally {
  fs.rmSync(projectRoot, { recursive: true, force: true });
}

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-gate-evidence-utils.test.js`);
  process.exit(1);
}

console.log("OK: workflow-gate-evidence-utils.test.js passed");
