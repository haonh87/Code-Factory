#!/usr/bin/env node
// T1 - E-A identity matrix for trusted-receipt-namespace-resolution.
//
// Written BEFORE resolveCanonicalProjectRoot exists, so the first run must fail with
// "resolveCanonicalProjectRoot is not a function". Any other first-run failure means the
// fixture is wrong, not the code.
//
// Criteria covered: AC-001/SM-3, AC-003/SM-4, AC-006, EDGE-002, EDGE-003, and S05-R01.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const {
  resolveCanonicalProjectRoot,
  buildProjectApprovalNamespace,
  loadTrustedApprovalReceipt
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
} finally {
  rmrf(tmpRoot);
}

if (failures > 0) {
  console.error(`\nworkflow-trusted-approval-utils.test.js: ${failures} assertion(s) failed.`);
  process.exit(1);
}
console.log("\nOK: workflow-trusted-approval-utils.test.js passed");
