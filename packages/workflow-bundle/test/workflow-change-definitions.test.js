const {
  CHANGE_STATUSES,
  CHANGE_ID_PATTERN,
  REQUIRED_CHANGE_PACKAGE_FILES,
  CR_STATUSES,
  CR_EXCEPTIONAL_STATUSES,
  CR_ID_PATTERN,
  CR_PROFILES,
  CR_LEGACY_FIELD_ALIASES,
  CR_LEGACY_TYPE_ALIASES,
  CR_ACCEPTED_SPEC_MERGE,
  normalizeCrId,
  isCanonicalCrId,
  isCrLifecycleTerminal
} = require("../scripts/workflow-change-definitions");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`FAIL: ${message}`);
  }
}

function testBackwardCompatibleExports() {
  assert(Array.isArray(CHANGE_STATUSES) && CHANGE_STATUSES.includes("verified"), "CHANGE_STATUSES must still include verified");
  assert(CHANGE_ID_PATTERN.test("CHANGE-001"), "CHANGE_ID_PATTERN must still match CHANGE-001");
  assert(
    REQUIRED_CHANGE_PACKAGE_FILES.includes("proposal.md") &&
      REQUIRED_CHANGE_PACKAGE_FILES.length === 7,
    "REQUIRED_CHANGE_PACKAGE_FILES must stay the 7-file full package"
  );
}

function testCanonicalCrLifecycle() {
  ["DRAFT", "APPROVED", "IMPLEMENTING", "VERIFIED", "ACCEPTED", "ARCHIVED"].forEach((status) => {
    assert(CR_STATUSES.includes(status), `CR_STATUSES must include ${status}`);
  });
  ["REJECTED", "CANCELLED", "SUPERSEDED"].forEach((status) => {
    assert(CR_EXCEPTIONAL_STATUSES.includes(status), `CR_EXCEPTIONAL_STATUSES must include ${status}`);
  });
}

function testCanonicalIdAndAliases() {
  assert(CR_ID_PATTERN.test("CR-001"), "CR_ID_PATTERN must match CR-001");
  assert(!CR_ID_PATTERN.test("CHANGE-001"), "CR_ID_PATTERN must not match legacy CHANGE-001");
  assert(normalizeCrId("CHANGE-001") === "CR-001", "normalizeCrId must map CHANGE-001 -> CR-001");
  assert(normalizeCrId("CR-001") === "CR-001", "normalizeCrId must keep canonical CR-001");
  assert(normalizeCrId("CHANGE-WFC-001") === "CR-WFC-001", "normalizeCrId must map CHANGE-WFC-001 -> CR-WFC-001");
  assert(isCanonicalCrId("CR-001") === true, "isCanonicalCrId(CR-001) must be true");
  assert(isCanonicalCrId("CHANGE-001") === false, "isCanonicalCrId(CHANGE-001) must be false");
}

function testFieldAliases() {
  assert(CR_LEGACY_FIELD_ALIASES.change_id === "cr_id", "alias change_id -> cr_id");
  assert(CR_LEGACY_FIELD_ALIASES.change_status === "cr_status", "alias change_status -> cr_status");
  assert(CR_LEGACY_FIELD_ALIASES.change_strategy === "cr_strategy", "alias change_strategy -> cr_strategy");
  assert(CR_LEGACY_FIELD_ALIASES.linked_changes === "linked_crs", "alias linked_changes -> linked_crs");
}

function testTypeAliases() {
  assert(CR_LEGACY_TYPE_ALIASES.CHANGE === "CR", "type alias CHANGE -> CR");
}

function testProfiles() {
  assert(CR_PROFILES.includes("compact"), "CR_PROFILES must include compact");
  assert(CR_PROFILES.includes("full"), "CR_PROFILES must include full");
}

function testAcceptedSpecMergeGate() {
  assert(CR_ACCEPTED_SPEC_MERGE.has("ACCEPTED"), "CR_ACCEPTED_SPEC_MERGE must include ACCEPTED");
  assert(!CR_ACCEPTED_SPEC_MERGE.has("VERIFIED"), "CR_ACCEPTED_SPEC_MERGE must NOT include VERIFIED");
  assert(!CR_ACCEPTED_SPEC_MERGE.has("APPROVED"), "CR_ACCEPTED_SPEC_MERGE must NOT include APPROVED");
}

function testLifecycleTerminalHelper() {
  assert(isCrLifecycleTerminal("ARCHIVED") === true, "ARCHIVED must be terminal");
  assert(isCrLifecycleTerminal("REJECTED") === true, "REJECTED must be terminal");
  assert(isCrLifecycleTerminal("SUPERSEDED") === true, "SUPERSEDED must be terminal");
  assert(isCrLifecycleTerminal("ACCEPTED") === false, "ACCEPTED must not be terminal");
  assert(isCrLifecycleTerminal("VERIFIED") === false, "VERIFIED must not be terminal");
}

testBackwardCompatibleExports();
testCanonicalCrLifecycle();
testCanonicalIdAndAliases();
testFieldAliases();
testTypeAliases();
testProfiles();
testAcceptedSpecMergeGate();
testLifecycleTerminalHelper();

if (failures > 0) {
  console.error(`${failures} assertion(s) failed in workflow-change-definitions.test.js`);
  process.exit(1);
}
console.log("OK: workflow-change-definitions.test.js passed");