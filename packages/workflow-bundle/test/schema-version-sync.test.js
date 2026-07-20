const fs = require("fs");
const path = require("path");
const {
  CR_SCHEMA_VERSION,
  SDD_LIGHT_SCHEMA_VERSION,
  WORKFLOW_SCHEMA_VERSION
} = require("../scripts/workflow-sdd-definitions");
const {
  getManifestCrSchemaVersion,
  getManifestWorkflowSchemaVersion
} = require("../scripts/workflow-bundle-utils");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

// ---------- R1 / AC-14: root manifest contract versions must not drift from code ----------

function testRootManifestMatchesCodeConstants() {
  const repoRoot = path.resolve(__dirname, "..", "..", "..");
  const rootManifestPath = path.join(repoRoot, "workflow-bundle.manifest.json");
  assert(fs.existsSync(rootManifestPath), `root manifest must exist at ${rootManifestPath}`);
  const rootManifest = JSON.parse(fs.readFileSync(rootManifestPath, "utf8"));

  assert(
    getManifestWorkflowSchemaVersion(rootManifest) === WORKFLOW_SCHEMA_VERSION,
    `root manifest workflowSchemaVersion must equal WORKFLOW_SCHEMA_VERSION ('${WORKFLOW_SCHEMA_VERSION}'), got '${getManifestWorkflowSchemaVersion(rootManifest)}' (no drift, AC-14)`
  );
  assert(
    getManifestCrSchemaVersion(rootManifest) === CR_SCHEMA_VERSION,
    `root manifest crSchemaVersion must equal CR_SCHEMA_VERSION ('${CR_SCHEMA_VERSION}'), got '${getManifestCrSchemaVersion(rootManifest)}' (no drift, AC-14)`
  );
  console.log("  PASS: root manifest schema versions match code constants (AC-14 no drift)");
}

function testWorkflowSchemaVersionAlias() {
  // WORKFLOW_SCHEMA_VERSION là alias ngữ nghĩa của SDD_LIGHT_SCHEMA_VERSION trong
  // revision này (light là workflow contract change). Khóa quan hệ để không drift.
  assert(
    WORKFLOW_SCHEMA_VERSION === SDD_LIGHT_SCHEMA_VERSION,
    "WORKFLOW_SCHEMA_VERSION must alias SDD_LIGHT_SCHEMA_VERSION in this revision"
  );
  assert(typeof WORKFLOW_SCHEMA_VERSION === "string" && WORKFLOW_SCHEMA_VERSION.length > 0, "WORKFLOW_SCHEMA_VERSION non-empty string");
  console.log("  PASS: WORKFLOW_SCHEMA_VERSION aliases SDD_LIGHT_SCHEMA_VERSION");
}

console.log("Running schema-version-sync (AC-14 contract) tests...\n");
testWorkflowSchemaVersionAlias();
testRootManifestMatchesCodeConstants();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in schema-version-sync.test.js`);
  process.exit(1);
}
console.log("\nOK: schema-version-sync.test.js passed");