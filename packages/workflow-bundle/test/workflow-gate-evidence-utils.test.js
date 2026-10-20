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

// Preserve the protocol/report comparison and materialization lookup without reading a real
// work item. Resolve twice with different values so a constant or stale result cannot pass.
const protocolRoot = fs.mkdtempSync(path.join(os.tmpdir(), "artifact-reference-protocol-"));
try {
  const noteRef = "work-items/fixture-item/fixture-item.s01.restate.md";
  const fixtureNote = path.join(protocolRoot, noteRef);
  const reportPath = path.join(protocolRoot, "work-items", "fixture-item", "fixture-item.work-item-report.json");
  const crossFileReference = `${noteRef}#Work Item Materialization.work_item_slug`;

  for (const [status, slug] of [["VERIFIED", "fixture-before"], ["DONE", "fixture-after"]]) {
    writeFile(reportPath, JSON.stringify({ protocol_status: status }));
    writeFile(fixtureNote, [
      "# Fixture",
      "",
      "## Work Item Protocol",
      "```yaml",
      `protocol_status: ${status}`,
      "```",
      "",
      "## Work Item Materialization",
      "```yaml",
      `work_item_slug: ${slug}`,
      "```",
      ""
    ].join("\n"));

    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    const sameNote = resolveArtifactReference({
      projectRoot: protocolRoot,
      currentFile: fixtureNote,
      reference: "#Work Item Protocol.protocol_status"
    });
    assert(sameNote.value === report.protocol_status, `same-note resolver must match the fixture report (${status})`);

    const crossFile = resolveArtifactReference({
      projectRoot: protocolRoot,
      currentFile: __filename,
      reference: crossFileReference
    });
    assert(crossFile.value === slug, `cross-file resolver must read the fixture materialization block (${slug})`);
    assert(crossFile.artifactPath === fixtureNote, "cross-file resolver must return the fixture note path");
  }

  fs.unlinkSync(fixtureNote);
  expectReferenceError(
    () => resolveArtifactReference({ projectRoot: protocolRoot, currentFile: __filename, reference: crossFileReference }),
    "ARTIFACT_REFERENCE_FILE_MISSING"
  );
} finally {
  fs.rmSync(protocolRoot, { recursive: true, force: true });
}

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
