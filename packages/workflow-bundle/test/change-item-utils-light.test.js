const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  loadChangeProposalState,
  buildManagedProposalLines,
  syncChangeProposalState,
  normalizeChangeProposalState
} = require("../scripts/change-item-utils");

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

function writeProposal(projectRoot, changeId, extraLines) {
  const changeRoot = path.join(projectRoot, "changes", changeId);
  const proposalPath = path.join(changeRoot, "proposal.md");
  fs.mkdirSync(changeRoot, { recursive: true });
  const lines = [
    "---",
    `change_id: "${changeId}"`,
    "artifact_kind: change-proposal",
    "status: draft",
    "linked_work_items: []",
    "decision_owner: agent",
    "review_required: true",
    "approval_status: PENDING_REVIEW",
    "reviewed_by: \"\"",
    "reviewed_at: \"\"",
    "materialization_ref: \"\"",
    "request_summary: \"fix export timeout\"",
    "review_notes: []",
    ...(extraLines || []),
    "---",
    "",
    "# Proposal",
    "Body text"
  ].join("\n");
  fs.writeFileSync(proposalPath, lines, "utf8");
  return proposalPath;
}

// ---------- defect_source + spec_impact_classified round-trip ----------

function testNormalizeDefaultsDefectSourceAndSpecImpact() {
  const state = normalizeChangeProposalState({ change_id: "CHANGE-001" });
  assert(state.defect_source === "n/a", `defect_source default must be n/a, got ${state.defect_source}`);
  assert(state.spec_impact_classified === false, "spec_impact_classified default must be false");
  console.log("  PASS: normalizeChangeProposalState defaults defect_source=n/a, spec_impact_classified=false");
}

function testLoadReadsDefectSourceAndSpecImpact() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "change-light-"));
  try {
    writeProposal(projectRoot, "CHANGE-001", [
      "defect_source: code",
      "spec_impact_classified: true"
    ]);
    const loaded = loadChangeProposalState({ projectRoot, changeId: "CHANGE-001" });
    assert(loaded.state.defect_source === "code", `defect_source must read 'code', got ${loaded.state.defect_source}`);
    assert(loaded.state.spec_impact_classified === true, "spec_impact_classified must read true");
    console.log("  PASS: loadChangeProposalState reads defect_source + spec_impact_classified");
  } finally {
    rmrf(projectRoot);
  }
}

function testManagedLinesEmitDefectSourceAndSpecImpact() {
  const lines = buildManagedProposalLines({
    change_id: "CHANGE-001",
    defect_source: "code",
    spec_impact_classified: true
  });
  assert(lines.some((l) => l.startsWith("defect_source:")), "managed lines must emit defect_source");
  assert(lines.some((l) => l.startsWith("spec_impact_classified: true")), "managed lines must emit spec_impact_classified: true");
  console.log("  PASS: buildManagedProposalLines emits defect_source + spec_impact_classified");
}

function testSyncRoundTripsDefectSourceAndSpecImpact() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "change-light-"));
  try {
    writeProposal(projectRoot, "CHANGE-001", [
      "defect_source: n/a",
      "spec_impact_classified: false"
    ]);
    const loaded = loadChangeProposalState({ projectRoot, changeId: "CHANGE-001" });
    // BA/DEV classify defect + spec impact tại change-approval time.
    loaded.state.defect_source = "code";
    loaded.state.spec_impact_classified = true;
    syncChangeProposalState({
      proposalPath: loaded.proposalPath,
      frontmatterLines: loaded.frontmatterLines,
      body: loaded.body,
      state: loaded.state
    });

    const reloaded = loadChangeProposalState({ projectRoot, changeId: "CHANGE-001" });
    assert(reloaded.state.defect_source === "code", `sync must persist defect_source=code, got ${reloaded.state.defect_source}`);
    assert(reloaded.state.spec_impact_classified === true, "sync must persist spec_impact_classified=true");
    console.log("  PASS: syncChangeProposalState round-trips defect_source + spec_impact_classified");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running change-item-utils (Light classification) tests...\n");
testNormalizeDefaultsDefectSourceAndSpecImpact();
testLoadReadsDefectSourceAndSpecImpact();
testManagedLinesEmitDefectSourceAndSpecImpact();
testSyncRoundTripsDefectSourceAndSpecImpact();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in change-item-utils-light.test.js`);
  process.exit(1);
}
console.log("\nAll change-item-utils (Light classification) tests passed.");