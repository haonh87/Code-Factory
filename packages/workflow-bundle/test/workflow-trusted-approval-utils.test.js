#!/usr/bin/env node
// T1 - E-A identity matrix for trusted-receipt-namespace-resolution.
//
// Written BEFORE resolveCanonicalProjectRoot exists, so the first run must fail with
// "resolveCanonicalProjectRoot is not a function". Any other first-run failure means the
// fixture is wrong, not the code.
//
// Criteria covered: AC-001/SM-3, AC-003/SM-4, AC-006, EDGE-002, EDGE-003, and S05-R01.

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const {
  resolveCanonicalProjectRoot,
  buildProjectApprovalNamespace,
  buildReceiptPath,
  loadTrustedApprovalReceipt,
  normalizeTrustedApprovalReceipt,
  resolveApprovalPassphrase,
  resolveGateArtifact
} = require("../scripts/workflow-trusted-approval-utils");

let failures = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  PASS: ${message}`);
    return;
  }
  failures += 1;
  console.error(`  FAIL: ${message}`);
}

function git(cwd, args) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  }).trim();
}

function initRepo(root) {
  fs.mkdirSync(root, { recursive: true });
  git(root, ["init", "-q"]);
  git(root, ["config", "user.email", "fixture@example.test"]);
  git(root, ["config", "user.name", "fixture"]);
  fs.writeFileSync(path.join(root, "README.md"), "fixture\n", "utf8");
  git(root, ["add", "-A"]);
  // --no-verify: the operator's global commit-msg hook enforces Conventional Commits and
  // would otherwise reject fixture commits. Same workaround the sibling work item used.
  git(root, ["commit", "-q", "-m", "chore: fixture baseline", "--no-verify"]);
  return root;
}

function addWorktree(repoRoot, worktreePath, branch) {
  git(repoRoot, ["worktree", "add", "-q", worktreePath, "-b", branch]);
  return worktreePath;
}

function rmrf(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "wf-canonical-root-"));

try {
  const receiptV1 = {
    schema_version: 1,
    kind: "gate",
    approval_status: "APPROVED",
    signature: "signed-v1-payload"
  };
  const normalizedV1 = normalizeTrustedApprovalReceipt(receiptV1);
  assert(normalizedV1.artifact_shape === "legacy_receipt_v1", "T4: signed receipt schema v1 stays the compatibility shape");
  assert(normalizedV1.receipt === receiptV1, "T4: receipt v1 is returned unchanged, never auto-rewritten");
  let unsupportedSchemaRejected = false;
  try {
    normalizeTrustedApprovalReceipt({ schema_version: 2 });
  } catch (_error) {
    unsupportedSchemaRejected = true;
  }
  assert(unsupportedSchemaRejected, "T4: unknown receipt schema fails closed");

  // ---------------------------------------------------------------- AC-001 / SM-3
  // One repository read from two different absolute paths must resolve to one identity.
  const repoA = initRepo(path.join(tmpRoot, "repo-a"));
  const worktreeA = addWorktree(repoA, path.join(tmpRoot, "repo-a-worktree"), "wt-a");

  const canonicalFromRepo = resolveCanonicalProjectRoot(repoA);
  const canonicalFromWorktree = resolveCanonicalProjectRoot(worktreeA);

  assert(
    canonicalFromRepo === canonicalFromWorktree,
    `AC-001: repo and its worktree resolve to one canonical root (${canonicalFromRepo} vs ${canonicalFromWorktree})`
  );
  assert(
    fs.realpathSync(canonicalFromRepo) === fs.realpathSync(repoA),
    "AC-001: the canonical root is the main worktree toplevel, not the worktree path"
  );
  assert(
    buildProjectApprovalNamespace(repoA) === buildProjectApprovalNamespace(worktreeA),
    "SM-3: the approval namespace is identical from both paths"
  );

  // ---------------------------------------------------------------- EDGE-003
  // The repo's own convention: a worktree living INSIDE the main tree, and a worktree of a
  // worktree. Both must resolve to the main identity, because .claude/worktrees/ is exactly
  // this shape.
  const nestedWorktree = addWorktree(
    repoA,
    path.join(repoA, ".claude", "worktrees", "nested"),
    "wt-nested"
  );
  assert(
    resolveCanonicalProjectRoot(nestedWorktree) === canonicalFromRepo,
    "EDGE-003: a worktree inside the main tree resolves to the main identity"
  );

  const worktreeOfWorktree = addWorktree(worktreeA, path.join(tmpRoot, "repo-a-wt-of-wt"), "wt-of-wt");
  assert(
    resolveCanonicalProjectRoot(worktreeOfWorktree) === canonicalFromRepo,
    "EDGE-003: a worktree created from another worktree still resolves to the main identity"
  );

  // ---------------------------------------------------------------- AC-003 / SM-4
  // Fixing over-strictness must not create over-permissiveness: a different repository stays
  // a different project, and its receipts stay unreadable.
  const repoB = initRepo(path.join(tmpRoot, "repo-b"));
  assert(
    resolveCanonicalProjectRoot(repoB) !== canonicalFromRepo,
    "AC-003: an independent repository resolves to a different canonical root"
  );
  assert(
    buildProjectApprovalNamespace(repoB) !== buildProjectApprovalNamespace(repoA),
    "AC-003: two repositories never share an approval namespace"
  );

  // The requirement is a REFUSED READ, not merely two unequal strings. Plant a receipt in
  // repoA's namespace and confirm repoB cannot see it, and vice versa.
  const approvalRoot = path.join(tmpRoot, "approvals");
  const plant = (projectRoot, slug) => {
    const dir = path.join(approvalRoot, buildProjectApprovalNamespace(projectRoot), "gates", slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "spec.json"),
      JSON.stringify({ kind: "gate", work_item_slug: slug, gate: "spec", approval_status: "APPROVED" }),
      "utf8"
    );
  };
  plant(repoA, "only-in-a");

  const readFromA = loadTrustedApprovalReceipt({
    projectRoot: repoA,
    overrideRoot: approvalRoot,
    kind: "gate",
    workItemSlug: "only-in-a",
    gate: "spec"
  });
  const readFromWorktreeA = loadTrustedApprovalReceipt({
    projectRoot: worktreeA,
    overrideRoot: approvalRoot,
    kind: "gate",
    workItemSlug: "only-in-a",
    gate: "spec"
  });
  const readFromB = loadTrustedApprovalReceipt({
    projectRoot: repoB,
    overrideRoot: approvalRoot,
    kind: "gate",
    workItemSlug: "only-in-a",
    gate: "spec"
  });

  assert(Boolean(readFromA.receipt), "AC-001: the planted receipt is readable from the repo itself");
  assert(
    Boolean(readFromWorktreeA.receipt),
    "AC-001: the SAME receipt is readable from the worktree - this is the whole defect"
  );
  assert(
    readFromB.receipt === null || readFromB.receipt === undefined,
    "AC-003: a different project cannot read it - refused lookup, not just an unequal string"
  );

  // ---------------------------------------------------------------- EDGE-002 / AC-006
  // A directory that is not a git repository at all. Must be deterministic and must not throw:
  // A2's reject_if is exactly this case, so it is answered by design rather than at runtime.
  const plainDir = path.join(tmpRoot, "not-a-repo");
  fs.mkdirSync(plainDir, { recursive: true });

  let plainThrew = false;
  let plainResult = null;
  try {
    plainResult = resolveCanonicalProjectRoot(plainDir);
  } catch (_error) {
    plainThrew = true;
  }
  assert(!plainThrew, "EDGE-002: a non-git directory does not throw");
  assert(
    plainResult === plainDir,
    "EDGE-002: a non-git directory falls back to the projectRoot it was given (legacy behaviour)"
  );

  // ---------------------------------------------------------------- S05-R01
  // --separate-git-dir puts the git directory outside the project, so the '.git' basename
  // convention does not hold. Must fall back to legacy rather than guess.
  const sepWork = path.join(tmpRoot, "sep-worktree");
  const sepGitDir = path.join(tmpRoot, "sep-gitdir");
  fs.mkdirSync(sepWork, { recursive: true });
  execFileSync("git", ["init", "-q", `--separate-git-dir=${sepGitDir}`, sepWork], {
    stdio: ["ignore", "ignore", "ignore"]
  });
  assert(
    resolveCanonicalProjectRoot(sepWork) === sepWork,
    "S05-R01: a separate-git-dir layout falls back to the given projectRoot instead of guessing"
  );

  // ---------------------------------------------------------------- AC-006 determinism
  [["repo", repoA], ["worktree", worktreeA], ["non-git", plainDir], ["separate-git-dir", sepWork]].forEach(
    ([label, target]) => {
      assert(
        resolveCanonicalProjectRoot(target) === resolveCanonicalProjectRoot(target),
        `AC-006: resolution is deterministic for ${label}`
      );
    }
  );

  // ---------------------------------------------------------------- T3: AC-002 compatibility
  // A receipt written under the LEGACY scheme - basename + sha256 of the projectRoot itself -
  // must still be found after the change. This is the criterion that decided Opt-A over Opt-B,
  // so it is asserted rather than argued.
  const legacyNamespace = (projectRoot) => {
    const safe =
      path
        .basename(projectRoot)
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "") || "project";
    return `${safe}-${crypto.createHash("sha256").update(projectRoot).digest("hex").slice(0, 12)}`;
  };

  const legacyRoot = fs.realpathSync(repoA);
  assert(
    buildProjectApprovalNamespace(legacyRoot) === legacyNamespace(legacyRoot),
    "AC-002: for a plain main-tree checkout the new namespace equals the legacy one - no receipt moves"
  );

  const legacyDir = path.join(approvalRoot, legacyNamespace(legacyRoot), "gates", "legacy-item");
  fs.mkdirSync(legacyDir, { recursive: true });
  fs.writeFileSync(
    path.join(legacyDir, "spec.json"),
    JSON.stringify({ kind: "gate", work_item_slug: "legacy-item", gate: "spec", approval_status: "APPROVED" }),
    "utf8"
  );
  const legacyReadFromWorktree = loadTrustedApprovalReceipt({
    projectRoot: worktreeA,
    overrideRoot: approvalRoot,
    kind: "gate",
    workItemSlug: "legacy-item",
    gate: "spec"
  });
  assert(
    Boolean(legacyReadFromWorktree.receipt),
    "AC-002: a receipt written under the legacy scheme is readable from a worktree after the change"
  );

  // ---------------------------------------------------------------- T3: AC-005 controls
  // This work item edits the file implementing every approval control. An unasserted control
  // is an untested control, so each one gets its own named assertion.
  const savedFixtureFlag = process.env.WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE;
  delete process.env.WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE;

  let refusedNonInteractive = false;
  try {
    resolveApprovalPassphrase("some-passphrase");
  } catch (error) {
    refusedNonInteractive = /Non-interactive human approval is disabled/.test(error.message);
  }
  assert(refusedNonInteractive, "AC-005 control 1: an inline passphrase is refused in normal mode");

  process.env.WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE = "true";
  assert(
    resolveApprovalPassphrase("some-passphrase") === "some-passphrase",
    "AC-005 control 2: the fixture hatch still works when explicitly enabled - gated, not removed"
  );
  if (savedFixtureFlag === undefined) {
    delete process.env.WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE;
  } else {
    process.env.WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE = savedFixtureFlag;
  }

  const gatePaths = ["spec", "contract", "dor", "approach", "task_plan"].map((gate) =>
    buildReceiptPath({
      projectRoot: repoA,
      approvalRoot,
      kind: "gate",
      workItemSlug: "controls-item",
      gate
    })
  );
  assert(
    new Set(gatePaths).size === gatePaths.length,
    "AC-005 control 3: every gate still gets its own independent receipt path"
  );

  const noteDir = path.join(repoA, "work-items", "controls-item");
  fs.mkdirSync(noteDir, { recursive: true });
  const notePath = path.join(noteDir, "controls-item.s04.acceptance-criteria.md");
  fs.writeFileSync(notePath, "original\n", "utf8");
  const artifactBefore = resolveGateArtifact({
    projectRoot: repoA,
    workflowRoot: noteDir,
    workItemSlug: "controls-item",
    gate: "spec",
    ref: "",
    sddMode: "none"
  });
  fs.writeFileSync(notePath, "edited after sealing\n", "utf8");
  const artifactAfter = resolveGateArtifact({
    projectRoot: repoA,
    workflowRoot: noteDir,
    workItemSlug: "controls-item",
    gate: "spec",
    ref: "",
    sddMode: "none"
  });
  assert(
    artifactBefore.artifactSha256 !== artifactAfter.artifactSha256,
    "AC-005 control 4: a receipt binds to the host artifact sha256, so a post-seal edit is detectable"
  );
} finally {
  rmrf(tmpRoot);
}


// ---------------------------------------------------------------------------
// GOV-EX-001 residual debt. The EAGAIN retry in the hidden-passphrase prompt was
// committed with no work item and no test, to unblock a merge. The register scheduled
// the test for "immediately after codex/trusted-receipt-namespace-resolution merges",
// because tdd-enforce refused an edit to that file on main while THIS test file existed
// only on that branch. The branch has merged, so the debt is payable and is paid here.
//
// The retry is behaviour that already ships, so this is coverage rather than a change.
// fs.readSync is stubbed because the real call needs fd 0 in raw mode, which a test
// runner does not have - and the point is the retry decision, not the terminal.
// ---------------------------------------------------------------------------

function testEagainRetryIsCoveredGovEx001() {
  console.log("\nGOV-EX-001: the EAGAIN retry in the passphrase read is covered");

  const mod = require("../scripts/workflow-trusted-approval-utils");
  assert(
    typeof mod.readStdinByteSync === "function",
    "readStdinByteSync is exported so the retry can be tested at all (the register names this as part of the debt)"
  );
  if (typeof mod.readStdinByteSync !== "function") {
    return;
  }

  const realReadSync = fs.readSync;
  try {
    // Two EAGAIN throws then a byte: the retry must absorb the transient failures.
    let calls = 0;
    fs.readSync = () => {
      calls += 1;
      if (calls <= 2) {
        const err = new Error("EAGAIN: resource temporarily unavailable, read");
        err.code = "EAGAIN";
        throw err;
      }
      return 1;
    };
    const got = mod.readStdinByteSync(Buffer.alloc(1));
    assert(got === 1, `a byte is returned after transient EAGAIN (got ${got})`);
    assert(calls === 3, `the read is retried rather than failing on the first EAGAIN (calls=${calls})`);

    // A non-EAGAIN error must still propagate - the retry is bounded to EAGAIN only,
    // which is exactly what the exception's mitigation claims.
    fs.readSync = () => {
      const err = new Error("EBADF: bad file descriptor, read");
      err.code = "EBADF";
      throw err;
    };
    let threw = false;
    let code = "";
    try {
      mod.readStdinByteSync(Buffer.alloc(1));
    } catch (e) {
      threw = true;
      code = e && e.code;
    }
    assert(threw && code === "EBADF", `a non-EAGAIN error still throws instead of looping (threw=${threw}, code=${code})`);

    // Zero bytes must be returned as-is, so the caller's end-of-input path still works.
    fs.readSync = () => 0;
    assert(mod.readStdinByteSync(Buffer.alloc(1)) === 0, "a zero-byte read is returned, not retried forever");
  } finally {
    fs.readSync = realReadSync;
  }
}

testEagainRetryIsCoveredGovEx001();

if (failures > 0) {
  console.error(`\nworkflow-trusted-approval-utils.test.js: ${failures} assertion(s) failed.`);
  process.exit(1);
}
console.log("\nOK: workflow-trusted-approval-utils.test.js passed");
