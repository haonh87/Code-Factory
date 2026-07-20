const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  loadChangeProposalState,
  buildManagedProposalLines,
  syncChangeProposalState,
  normalizeChangeProposalState,
  resolveChangePaths
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

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

// ---------- resolveChangePaths: dual physical + file ----------

function testResolveChangePathsFreshDefaultsCanonical() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-paths-"));
  try {
    fs.mkdirSync(path.join(projectRoot, "changes"), { recursive: true });
    const resolved = resolveChangePaths({ projectRoot, changeId: "CR-001" });
    assert(resolved.changeRoot === path.join(projectRoot, "changes", "CR-001"), `fresh canonical root, got ${resolved.changeRoot}`);
    assert(resolved.proposalFile === "proposal.md", `fresh default file proposal.md, got ${resolved.proposalFile}`);
    assert(resolved.profile === "full", `fresh default profile full, got ${resolved.profile}`);
    console.log("  PASS: resolveChangePaths fresh -> canonical root + proposal.md (full)");
  } finally {
    rmrf(projectRoot);
  }
}

function testResolveChangePathsLegacyDirDualRead() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-paths-"));
  try {
    writeFile(path.join(projectRoot, "changes", "CHANGE-001", "proposal.md"), "---\nchange_id: CHANGE-001\n---\n");
    // Input canonical CR-001 phải dual-read về legacy CHANGE-001 dir.
    const resolved = resolveChangePaths({ projectRoot, changeId: "CR-001" });
    assert(resolved.changeRoot === path.join(projectRoot, "changes", "CHANGE-001"), `dual-read must find legacy CHANGE-001 dir, got ${resolved.changeRoot}`);
    assert(resolved.proposalFile === "proposal.md", "legacy uses proposal.md");
    assert(resolved.profile === "full", "legacy proposal.md -> full");
    console.log("  PASS: resolveChangePaths dual-reads legacy CHANGE-### dir");
  } finally {
    rmrf(projectRoot);
  }
}

function testResolveChangePathsCompactRequestMd() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-paths-"));
  try {
    writeFile(path.join(projectRoot, "changes", "CR-002", "request.md"), "---\ncr_id: CR-002\ncr_profile: compact\n---\n");
    const resolved = resolveChangePaths({ projectRoot, changeId: "CR-002" });
    assert(resolved.proposalFile === "request.md", `compact must resolve request.md, got ${resolved.proposalFile}`);
    assert(resolved.profile === "compact", `compact profile detected, got ${resolved.profile}`);
    console.log("  PASS: resolveChangePaths detects compact request.md");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- normalizeChangeProposalState dual-read ----------

function testNormalizeDualReadCanonical() {
  const state = normalizeChangeProposalState({
    cr_id: "CR-001",
    cr_status: "DRAFT",
    cr_strategy: "create_new",
    linked_crs: ["w1"],
    cr_profile: "compact"
  });
  assert(state.cr_id === "CR-001", "cr_id canonical read");
  assert(state.cr_status === "DRAFT", "cr_status canonical read");
  assert(state.cr_strategy === "create_new", "cr_strategy canonical read");
  assert(state.linked_crs && state.linked_crs[0] === "w1", "linked_crs canonical read");
  assert(state.cr_profile === "compact", "cr_profile read");
  console.log("  PASS: normalizeChangeProposalState reads canonical cr_* fields");
}

function testNormalizeDualReadLegacyFallback() {
  const state = normalizeChangeProposalState({
    change_id: "CHANGE-001",
    change_status: "draft",
    change_strategy: "reuse_existing",
    linked_changes: ["w2"]
  });
  // Legacy aliases phải fallback về canonical state.
  assert(state.cr_id === "CR-001", `legacy change_id fallback -> cr_id CR-001, got ${state.cr_id}`);
  assert(state.change_id === "CHANGE-001", "legacy change_id preserved for compat");
  assert(state.cr_profile === "full", "default profile full when not compact");
  console.log("  PASS: normalizeChangeProposalState legacy alias fallback -> canonical");
}

// ---------- loadChangeProposalState compact vs legacy ----------

function testLoadCompactRequestMd() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-load-"));
  try {
    writeFile(
      path.join(projectRoot, "changes", "CR-003", "request.md"),
      [
        "---",
        "cr_id: CR-003",
        "cr_profile: compact",
        "cr_status: DRAFT",
        "cr_strategy: create_new",
        "artifact_kind: cr-request",
        "decision_owner: agent",
        "review_required: true",
        "approval_status: PENDING_REVIEW",
        "linked_crs: []",
        "request_summary: \"add export\"",
        "defect_source: code",
        "spec_impact_classified: true",
        "---",
        "",
        "# CR Request"
      ].join("\n")
    );
    const loaded = loadChangeProposalState({ projectRoot, changeId: "CR-003" });
    assert(loaded.state.cr_id === "CR-003", "compact load cr_id");
    assert(loaded.state.cr_profile === "compact", "compact load profile");
    assert(loaded.state.cr_status === "DRAFT", "compact load cr_status");
    assert(loaded.state.defect_source === "code", "compact load defect_source");
    assert(loaded.proposalFile === "request.md", `compact proposalFile request.md, got ${loaded.proposalFile}`);
    console.log("  PASS: loadChangeProposalState reads compact request.md (canonical)");
  } finally {
    rmrf(projectRoot);
  }
}

function testLoadLegacyProposalMdDualRead() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-load-"));
  try {
    writeFile(
      path.join(projectRoot, "changes", "CHANGE-001", "proposal.md"),
      [
        "---",
        "change_id: CHANGE-001",
        "artifact_kind: change-proposal",
        "status: draft",
        "decision_owner: agent",
        "review_required: true",
        "approval_status: PENDING_REVIEW",
        "linked_work_items: []",
        "request_summary: \"legacy\"",
        "---",
        "",
        "# Proposal"
      ].join("\n")
    );
    // Query bằng canonical CR-001 phải dual-read về legacy CHANGE-001.
    const loaded = loadChangeProposalState({ projectRoot, changeId: "CR-001" });
    assert(loaded.state.cr_id === "CR-001", `legacy dual-read -> cr_id CR-001, got ${loaded.state.cr_id}`);
    assert(loaded.state.change_id === "CHANGE-001", "legacy change_id preserved");
    assert(loaded.proposalFile === "proposal.md", "legacy proposal.md");
    console.log("  PASS: loadChangeProposalState dual-reads legacy CHANGE proposal.md");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- buildManagedProposalLines + sync: canonical-write cho compact ----------

function testManagedLinesCompactEmitsCanonicalOnly() {
  const lines = buildManagedProposalLines({
    cr_id: "CR-009",
    cr_profile: "compact",
    cr_status: "DRAFT",
    cr_strategy: "create_new",
    decision_owner: "agent",
    review_required: true,
    approval_status: "PENDING_REVIEW",
    defect_source: "n/a",
    spec_impact_classified: false
  });
  assert(lines.some((l) => l.startsWith("cr_id:")), "compact managed must emit cr_id");
  assert(lines.some((l) => l.startsWith("cr_profile: compact")), "compact managed must emit cr_profile");
  assert(lines.some((l) => l.startsWith("cr_status:")), "compact managed must emit cr_status");
  // Compact writer chỉ emit canonical — không emit legacy change_id managed.
  assert(!lines.some((l) => l.startsWith("change_id:")), "compact managed must NOT emit legacy change_id");
  console.log("  PASS: buildManagedProposalLines compact emits canonical only (new writer CR/cr_*)");
}

function testSyncCompactStripsLegacyAliases() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cr-sync-"));
  try {
    // File có cả legacy change_id và sẽ được sync compact -> legacy alias bị strip.
    writeFile(
      path.join(projectRoot, "changes", "CR-010", "request.md"),
      [
        "---",
        "cr_id: CR-010",
        "cr_profile: compact",
        "artifact_kind: cr-request",
        "change_id: CHANGE-010",
        "change_status: draft",
        "decision_owner: agent",
        "review_required: true",
        "approval_status: PENDING_REVIEW",
        "linked_crs: []",
        "request_summary: \"x\"",
        "---",
        "",
        "# Body"
      ].join("\n")
    );
    const loaded = loadChangeProposalState({ projectRoot, changeId: "CR-010" });
    loaded.state.cr_status = "APPROVED";
    syncChangeProposalState({
      proposalPath: loaded.proposalPath,
      frontmatterLines: loaded.frontmatterLines,
      body: loaded.body,
      state: loaded.state
    });
    const reloaded = loadChangeProposalState({ projectRoot, changeId: "CR-010" });
    assert(reloaded.state.cr_status === "APPROVED", `sync compact persists cr_status APPROVED, got ${reloaded.state.cr_status}`);
    assert(reloaded.state.cr_id === "CR-010", "sync compact keeps cr_id");
    // Legacy alias phải bị strip khỏi compact file.
    const raw = fs.readFileSync(loaded.proposalPath, "utf8");
    assert(!/^change_id:/m.test(raw), "sync compact must strip legacy change_id");
    assert(!/^change_status:/m.test(raw), "sync compact must strip legacy change_status");
    console.log("  PASS: syncChangeProposalState compact canonical-write strips legacy aliases");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running change-item-utils (CR canonical/dual-read) tests...\n");
testResolveChangePathsFreshDefaultsCanonical();
testResolveChangePathsLegacyDirDualRead();
testResolveChangePathsCompactRequestMd();
testNormalizeDualReadCanonical();
testNormalizeDualReadLegacyFallback();
testLoadCompactRequestMd();
testLoadLegacyProposalMdDualRead();
testManagedLinesCompactEmitsCanonicalOnly();
testSyncCompactStripsLegacyAliases();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in change-item-utils-cr.test.js`);
  process.exit(1);
}
console.log("\nAll change-item-utils (CR canonical/dual-read) tests passed.");