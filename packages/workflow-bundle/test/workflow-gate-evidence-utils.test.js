const fs = require("fs");
const os = require("os");
const path = require("path");
const { resolveArtifactReference } = require("../scripts/workflow-gate-evidence-utils");

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

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const liveS01 = path.join(
  repoRoot,
  "work-items",
  "artifact-governance-enforcement",
  "artifact-governance-enforcement.s01.restate.md"
);
const liveSameNote = resolveArtifactReference({
  projectRoot: repoRoot,
  currentFile: liveS01,
  reference: "#Work Item Protocol.protocol_status"
});
assert(liveSameNote.value === "ACTIVE", "same-note resolver must read the live P2 protocol status");

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
