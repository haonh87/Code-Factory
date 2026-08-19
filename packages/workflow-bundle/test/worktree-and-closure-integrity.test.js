// Regression fixtures for the four carried-forward defects D-A to D-D.
//
// Each test asserts the DESIRED behaviour, so every one is expected to be RED
// before its fix lands and green after. A fixture that cannot be made red means
// the symptom was misdiagnosed; in that case the requirement is withdrawn rather
// than the fixture weakened. Same contract as approval-path-defects.test.js,
// which these defects were carried out of.
//
// Work item: worktree-and-closure-integrity
// Requirements: REQ-001 (D-A), REQ-002 (D-B), REQ-003 (D-C), REQ-004 (D-D)
// Task: T1 (gates T2..T5)
//
// Scope note on D-A (decision F-02, recorded in s07): running `wfc protocol` from
// a worktree emits SIX errors, of which only the workflow_root mismatch is in this
// work item's boundary. The remaining five come from the receipt namespace being
// derived from projectRoot, which is a separate defect filed as its own work item.
// This fixture therefore asserts the mismatch line is gone, NOT that the command
// exits 0. Asserting exit 0 here would make the fixture fail for a reason this
// work item is not allowed to fix.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  } else {
    console.log(`  PASS: ${message}`);
  }
}

const WFC = path.join(__dirname, "..", "bin", "wfc.js");
const PROTOCOL_SCRIPT = path.join(__dirname, "..", "scripts", "work-item-protocol.js");
const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const TDD_HOOK = path.join(REPO_ROOT, "scripts", "hooks", "tdd-enforce.sh");

// Fixture-only approval env. Mirrors approval-path-defects.test.js: normal mode
// requires an interactive TTY, which a unit test does not have.
function fixtureApprovalEnv(approvalRoot) {
  return {
    WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
    WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
    WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot,
    WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT: "true"
  };
}

function tmpRoot(name) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `wci-${name}-`));
}

// Scaffolded files land read-only (0444), so chmod on the way down before removing.
function rmrf(target) {
  try { fs.chmodSync(target, 0o755); } catch (_e) { /* ignore */ }
  try {
    for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
      const child = path.join(target, entry.name);
      if (entry.isDirectory()) rmrf(child);
      else {
        try { fs.chmodSync(child, 0o644); } catch (_e) { /* ignore */ }
        fs.rmSync(child, { force: true });
      }
    }
  } catch (_e) { /* ignore */ }
  fs.rmSync(target, { recursive: true, force: true });
}

function makeWritable(filePath) {
  try { fs.chmodSync(filePath, 0o644); } catch (_e) { /* ignore */ }
}

// Never throws: these fixtures inspect failures rather than propagate them.
function run(file, args, opts = {}) {
  try {
    const stdout = execFileSync(process.execPath, [file, ...args], {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env, ...(opts.env || {}) }
    });
    return { status: 0, stdout, stderr: "", out: stdout };
  } catch (e) {
    const stdout = String(e.stdout || "");
    const stderr = String(e.stderr || "");
    return {
      status: e.status === undefined ? 1 : e.status,
      stdout,
      stderr,
      out: `${stdout}${stderr}`
    };
  }
}

function git(cwd, args) {
  try {
    return {
      status: 0,
      out: execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] })
    };
  } catch (e) {
    return { status: e.status === undefined ? 1 : e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
  }
}

// --no-verify because the developer's global commit-msg hook enforces Conventional
// Commits; a fixture must not depend on the operator's hook configuration.
function gitCommitAll(cwd, message) {
  git(cwd, ["add", "-A"]);
  return git(cwd, ["commit", "--no-verify", "-q", "-m", message]);
}

function initGitRepo(root) {
  git(root, ["init", "-q"]);
  git(root, ["config", "user.email", "fixture@example.test"]);
  git(root, ["config", "user.name", "Fixture"]);
  git(root, ["config", "commit.gpgsign", "false"]);
}

function scaffoldStep({ projectRoot, slug, step }) {
  return run(WFC, [
    "scaffold-step",
    "--work-item", slug,
    "--step", step,
    "--single-step",
    "--project-root", projectRoot,
    "--workflow-root", path.join(projectRoot, "work-items", slug),
    "--delivery-context", "brownfield",
    "--sdd-mode", "light",
    "--planning-track", "quick"
  ]);
}

// Patch frontmatter so a gate host note is finalized and carries its human review.
// Deliberately blunt string surgery: a fixture should not depend on a YAML library
// the package does not already ship.
function finalizeGateHost(notePath, gate, reviewer) {
  makeWritable(notePath);
  let text = fs.readFileSync(notePath, "utf8");
  text = text.replace(/^status: draft$/m, "status: approved");
  text = text.replace(/^spec_status: draft$/m, "spec_status: approved");
  text = text.replace(
    new RegExp(`^  ${gate}_reviewed_by: \\[\\]$`, "m"),
    `  ${gate}_reviewed_by:\n    - "${reviewer}"`
  );
  text = text.replace(
    new RegExp(`^  ${gate}_reviewed_at: ""$`, "m"),
    `  ${gate}_reviewed_at: "2026-08-19T00:00:00.000Z"`
  );
  text = text.replace(
    new RegExp(`^  ${gate}: \\[\\]$`, "m"),
    `  ${gate}:\n    - "${reviewer}"`
  );
  fs.writeFileSync(notePath, text, "utf8");
}

// The capability write guard strips owner-write across the whole project root
// whenever no work item holds a matching grant, so a scaffolded temp project comes
// back read-only: src/ becomes 0555 and src/app.js 0444. That is the guard working
// as designed, not a defect. A fixture that needs to dirty a declared path must
// therefore re-open it first. Restores nothing afterwards: the tree is a tmpdir.
function makeDeclaredPathDirty(projectRoot, relFile, contents) {
  const abs = path.join(projectRoot, relFile);
  let cursor = path.dirname(abs);
  while (cursor.startsWith(projectRoot)) {
    try { fs.chmodSync(cursor, 0o755); } catch (_e) { /* ignore */ }
    const parent = path.dirname(cursor);
    if (parent === cursor) break;
    cursor = parent;
  }
  try { fs.chmodSync(projectRoot, 0o755); } catch (_e) { /* ignore */ }
  makeWritable(abs);
  fs.appendFileSync(abs, contents, "utf8");
}

function readReport(projectRoot, slug) {
  const p = path.join(projectRoot, "work-items", slug, `${slug}.work-item-report.json`);
  return { path: p, json: JSON.parse(fs.readFileSync(p, "utf8")) };
}

function writeReport(reportPath, json) {
  makeWritable(reportPath);
  fs.writeFileSync(reportPath, `${JSON.stringify(json, null, 2)}\n`, "utf8");
}

// ---------------------------------------------------------------------------
// D-A / REQ-001: wfc protocol must work when the stored workflow_root is an
// absolute path into an equivalent-but-different tree, which is exactly the
// condition a git worktree creates.
// ---------------------------------------------------------------------------

function testDaProtocolWorksFromAnEquivalentTree() {
  console.log("\nD-A / REQ-001: wfc protocol tolerates a stored workflow_root from a sibling tree");
  const originalRoot = tmpRoot("da-origin");
  const approvalRoot = tmpRoot("da-approvals");
  let copyRoot = "";
  try {
    const slug = "da-item";
    assert(scaffoldStep({ projectRoot: originalRoot, slug, step: "s01" }).status === 0, "scaffold s01 succeeds");

    // Bootstrapping the report is what persists the ABSOLUTE workflow_root.
    const approve = run(PROTOCOL_SCRIPT, [
      "approve",
      "--work-item", slug,
      "--reviewed-by", "ba",
      "--project-root", originalRoot,
      "--workflow-root", path.join(originalRoot, "work-items"),
      "--approval-root", approvalRoot
    ], { env: fixtureApprovalEnv(approvalRoot) });
    assert(approve.status === 0, "work item approve bootstraps a report");

    const { json } = readReport(originalRoot, slug);
    assert(
      path.isAbsolute(json.workflow_root),
      `precondition: the report stores an ABSOLUTE workflow_root (got "${json.workflow_root}")`
    );

    // Simulate the worktree: identical content, different absolute root.
    copyRoot = `${originalRoot}-copy`;
    fs.cpSync(originalRoot, copyRoot, { recursive: true });

    const protocolFromCopy = run(WFC, [
      "protocol",
      "--project-root", copyRoot,
      "--workflow-root", path.join(copyRoot, "work-items")
    ], { env: fixtureApprovalEnv(approvalRoot) });

    console.log(`    protocol-from-copy exit=${protocolFromCopy.status}; first line: ${protocolFromCopy.out.trim().split("\n")[0] || "(empty)"}`);
    assert(
      !/workflow_root mismatch/.test(protocolFromCopy.out),
      "wfc protocol does not report a workflow_root mismatch when run against an equivalent tree (today: it does - D-A)"
    );

    // EDGE-003: normalisation must not swallow a genuinely wrong root.
    const copyReport = readReport(copyRoot, slug);
    copyReport.json.workflow_root = path.join(copyRoot, "work-items", "a-completely-different-item");
    writeReport(copyReport.path, copyReport.json);

    const protocolWrongRoot = run(WFC, [
      "protocol",
      "--project-root", copyRoot,
      "--workflow-root", path.join(copyRoot, "work-items")
    ], { env: fixtureApprovalEnv(approvalRoot) });

    console.log(`    protocol-wrong-root exit=${protocolWrongRoot.status}; first line: ${protocolWrongRoot.out.trim().split("\n")[0] || "(empty)"}`);
    assert(
      /workflow_root mismatch/.test(protocolWrongRoot.out),
      "EDGE-003: a genuinely wrong workflow_root is STILL rejected after normalisation"
    );
  } finally {
    rmrf(originalRoot);
    if (copyRoot) rmrf(copyRoot);
    rmrf(approvalRoot);
  }
}

// ---------------------------------------------------------------------------
// D-B / REQ-002: the tdd-enforce mapping has rules for /scripts/+/packages/,
// /src/+/mcp/ and a leading scripts/. A file under bin/ falls through to the
// generic sibling-test rule, and both fallbacks only rewrite /scripts/ and /src/.
// ---------------------------------------------------------------------------

function hookVerdict(relPath) {
  const payload = JSON.stringify({
    tool_name: "Edit",
    tool_input: { file_path: path.join(REPO_ROOT, relPath) }
  });
  try {
    const stdout = execFileSync("bash", [TDD_HOOK], {
      input: payload,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env, CF_HOOK_PROFILE: "strict", CF_DISABLED_HOOKS: "" }
    });
    return { status: 0, out: stdout };
  } catch (e) {
    return {
      status: e.status === undefined ? 1 : e.status,
      out: `${e.stdout || ""}${e.stderr || ""}`
    };
  }
}

function testDbBinMappingResolvesToPackageTestDir() {
  console.log("\nD-B / REQ-002: tdd-enforce maps packages/X/bin/foo.js to packages/X/test/foo.test.js");

  // Precondition, stated rather than assumed: the real test exists, the demanded one does not.
  assert(
    fs.existsSync(path.join(REPO_ROOT, "packages", "workflow-bundle", "test", "wfc.test.js")),
    "precondition: packages/workflow-bundle/test/wfc.test.js exists"
  );
  assert(
    !fs.existsSync(path.join(REPO_ROOT, "packages", "workflow-bundle", "bin", "test", "wfc.test.js")),
    "precondition: packages/workflow-bundle/bin/test/wfc.test.js does NOT exist"
  );

  const binWithTest = hookVerdict("packages/workflow-bundle/bin/wfc.js");
  console.log(`    bin/wfc.js exit=${binWithTest.status}; expected-test line: ${(binWithTest.out.match(/^Expected test file: .*$/m) || ["(none)"])[0]}`);
  assert(
    binWithTest.status === 0,
    "editing packages/workflow-bundle/bin/wfc.js is ALLOWED because its test exists at packages/workflow-bundle/test/wfc.test.js (today: blocked, demanding bin/test/ - D-B)"
  );

  // The rule must be a mapping fix, not a policy hole: a bin/ file with no test stays blocked.
  const binWithoutTest = hookVerdict("packages/workflow-bundle/bin/no-such-module-xyz.js");
  console.log(`    bin/no-such-module-xyz.js exit=${binWithoutTest.status}`);
  assert(
    binWithoutTest.status === 2,
    "EDGE-004: a bin/ file with NO matching test is still blocked - the mapping is fixed, not the policy"
  );

  // Control: the existing /scripts/+/packages/ rule must be untouched.
  const scriptsWithTest = hookVerdict("packages/workflow-bundle/scripts/workflow-gate-review.js");
  assert(
    scriptsWithTest.status === 0,
    "control: the existing packages/X/scripts/ mapping still allows a file whose test exists"
  );
  const scriptsWithoutTest = hookVerdict("packages/workflow-bundle/scripts/validate-work-item-protocol.js");
  assert(
    scriptsWithoutTest.status === 2,
    "control: a packages/X/scripts/ file with no test is still blocked"
  );

  // Control: the four exemption classes still exit 0.
  const exemptions = [
    ["CLAUDE.md", "markdown docs"],
    ["packages/workflow-bundle/workflow-bundle.manifest.json", "json config"],
    ["scripts/hooks/tdd-enforce.sh", "hook scripts"],
    ["packages/workflow-bundle/test/wfc.test.js", "test files themselves"]
  ];
  exemptions.forEach(([rel, label]) => {
    assert(hookVerdict(rel).status === 0, `exemption preserved: ${label} (${rel})`);
  });
}

// ---------------------------------------------------------------------------
// D-C / REQ-003: `wfc work-item verify` refuses unless the s07 note is reviewed
// or finalized. approval-path-defects TD-02 documented that requirement for the
// seal-then-activate call site as steps 7b/7c; the verify call site was left
// undocumented, so the operator meets it as a surprise.
// ---------------------------------------------------------------------------

function testDcHelpDocumentsVerifyStageFinalization() {
  console.log("\nD-C / REQ-003: wfc help documents the verify-stage finalization requirement");
  const help = run(WFC, ["help"]);
  assert(help.status === 0, "wfc help exits 0");

  const text = help.out;
  const flowLines = text.split("\n");

  // The requirement is real: this is the message the operator hits today.
  const guardMessage = "s07 implementation note must be reviewed or finalized before verification";
  assert(
    fs.readFileSync(path.join(__dirname, "..", "scripts", "workflow-gate-evidence-utils.js"), "utf8").includes(guardMessage),
    `precondition: the guard message "${guardMessage}" exists in workflow-gate-evidence-utils.js`
  );

  const verifyLines = flowLines.filter((l) => /work-item verify|verify/i.test(l) && /^\s*\d+[a-z]?\./.test(l));
  console.log(`    flow lines mentioning verify: ${verifyLines.length ? JSON.stringify(verifyLines) : "(none)"}`);

  assert(
    verifyLines.length > 0,
    "the documented flow includes a step for the verify transition (today: absent - D-C)"
  );
  assert(
    verifyLines.some((l) => /s07/.test(l)),
    "the verify flow step names s07, so the operator knows WHICH note must be finalized"
  );
  assert(
    verifyLines.some((l) => /finaliz|reviewed/i.test(l)),
    "the verify flow step names the finalize/reviewed requirement, not just the word verify"
  );

  // Ordering: the requirement must be stated before the verify step is reached.
  const verifyIdx = flowLines.findIndex((l) => /work-item verify/.test(l));
  const activateIdx = flowLines.findIndex((l) => /work-item activate/.test(l));
  if (verifyIdx >= 0 && activateIdx >= 0) {
    assert(
      activateIdx < verifyIdx,
      "the flow keeps activate before verify, so the documented order matches the state machine"
    );
  }
}

// ---------------------------------------------------------------------------
// D-D / REQ-004: a work item must not seal dod while its declared delivery paths
// hold uncommitted changes. Measured 2026-08-19: two work items reached DONE with
// every gate sealed while main contained none of the change.
// ---------------------------------------------------------------------------

function buildDodSealableItem(name) {
  const projectRoot = tmpRoot(name);
  const approvalRoot = tmpRoot(`${name}-approvals`);
  const slug = `${name}-item`;

  initGitRepo(projectRoot);
  fs.mkdirSync(path.join(projectRoot, "src"), { recursive: true });
  fs.writeFileSync(path.join(projectRoot, "src", "app.js"), "// committed delivery\n", "utf8");

  ["s01", "s04", "s06", "s08"].forEach((step) => {
    scaffoldStep({ projectRoot, slug, step });
  });

  run(PROTOCOL_SCRIPT, [
    "approve",
    "--work-item", slug,
    "--reviewed-by", "ba",
    "--project-root", projectRoot,
    "--workflow-root", path.join(projectRoot, "work-items"),
    "--approval-root", approvalRoot
  ], { env: fixtureApprovalEnv(approvalRoot) });

  const s08 = path.join(projectRoot, "work-items", slug, `${slug}.s08.verification.md`);
  finalizeGateHost(s08, "dod", "qc");

  // granted_write_paths is written straight into the report rather than driven
  // through `activate`, which would require sealing s04 and s06 first. This
  // fixture is about the dod seal, so the activation path is not re-tested here.
  const report = readReport(projectRoot, slug);
  report.json.granted_write_paths = ["src"];
  writeReport(report.path, report.json);

  gitCommitAll(projectRoot, "chore: seed committed delivery");

  return { projectRoot, approvalRoot, slug };
}

function sealDod(ctx, extraArgs = []) {
  return run(WFC, [
    "gate", "approve",
    "--work-item", ctx.slug,
    "--gate", "dod",
    "--reviewed-by", "qc",
    "--project-root", ctx.projectRoot,
    "--workflow-root", path.join(ctx.projectRoot, "work-items"),
    "--approval-root", ctx.approvalRoot,
    ...extraArgs
  ], { env: fixtureApprovalEnv(ctx.approvalRoot) });
}

function testDdCleanTreeStillSeals() {
  console.log("\nD-D / AC-004: a clean declared path still seals dod (no false positive)");
  const ctx = buildDodSealableItem("dd-clean");
  try {
    const status = git(ctx.projectRoot, ["status", "--porcelain", "--", "src"]);
    assert(status.out.trim() === "", `precondition: src is clean (git status: "${status.out.trim()}")`);

    const seal = sealDod(ctx);
    console.log(`    seal exit=${seal.status}; first line: ${seal.out.trim().split("\n")[0] || "(empty)"}`);
    assert(seal.status === 0, "sealing dod over a CLEAN declared path succeeds");
  } finally {
    rmrf(ctx.projectRoot);
    rmrf(ctx.approvalRoot);
  }
}

function testDdDirtyTreeIsRefused() {
  console.log("\nD-D / REQ-004: sealing dod over a DIRTY declared path is refused");
  const ctx = buildDodSealableItem("dd-dirty");
  try {
    makeDeclaredPathDirty(ctx.projectRoot, path.join("src", "app.js"), "// uncommitted delivery\n");
    const status = git(ctx.projectRoot, ["status", "--porcelain", "--", "src"]);
    assert(status.out.trim() !== "", `precondition: src is dirty (git status: "${status.out.trim()}")`);

    const seal = sealDod(ctx);
    console.log(`    seal exit=${seal.status}; first line: ${seal.out.trim().split("\n")[0] || "(empty)"}`);
    assert(
      seal.status !== 0,
      "sealing dod is REFUSED while a declared path holds uncommitted changes (today: it succeeds - D-D)"
    );
    assert(
      /src/.test(seal.out),
      "the refusal names the offending path, so the operator knows what to commit"
    );
  } finally {
    rmrf(ctx.projectRoot);
    rmrf(ctx.approvalRoot);
  }
}

function testDdHatchRequiresAStatedReason() {
  console.log("\nD-D / AC-004: the escape hatch requires a stated reason and echoes it");
  const withReason = buildDodSealableItem("dd-hatch-yes");
  try {
    makeDeclaredPathDirty(withReason.projectRoot, path.join("src", "app.js"), "// uncommitted\n");
    const seal = sealDod(withReason, ["--allow-uncommitted-delivery", "--uncommitted-reason", "research spike, no delivery expected"]);
    console.log(`    hatch-with-reason exit=${seal.status}; first line: ${seal.out.trim().split("\n")[0] || "(empty)"}`);
    assert(seal.status === 0, "the hatch WITH a stated reason permits the seal (EDGE-002)");
    assert(
      /research spike, no delivery expected/.test(seal.out),
      "the stated reason is echoed into output - an invisible exemption is worse than no check"
    );
  } finally {
    rmrf(withReason.projectRoot);
    rmrf(withReason.approvalRoot);
  }

  const withoutReason = buildDodSealableItem("dd-hatch-no");
  try {
    makeDeclaredPathDirty(withoutReason.projectRoot, path.join("src", "app.js"), "// uncommitted\n");
    const seal = sealDod(withoutReason, ["--allow-uncommitted-delivery"]);
    console.log(`    hatch-without-reason exit=${seal.status}; first line: ${seal.out.trim().split("\n")[0] || "(empty)"}`);
    assert(seal.status !== 0, "the hatch WITHOUT a reason is refused, so the exemption cannot be silent");
  } finally {
    rmrf(withoutReason.projectRoot);
    rmrf(withoutReason.approvalRoot);
  }
}

function testDdEmptyDeclaredScopeRefusesRatherThanPassesVacuously() {
  console.log("\nD-D / ODC-001 fallback: an empty granted_write_paths refuses rather than passing vacuously");
  const ctx = buildDodSealableItem("dd-empty");
  try {
    const report = readReport(ctx.projectRoot, ctx.slug);
    report.json.granted_write_paths = [];
    writeReport(report.path, report.json);

    const seal = sealDod(ctx);
    console.log(`    seal exit=${seal.status}; first line: ${seal.out.trim().split("\n")[0] || "(empty)"}`);
    assert(
      seal.status !== 0,
      "an empty declared scope is not evidence of a clean tree, so the seal is refused (today: it succeeds)"
    );
  } finally {
    rmrf(ctx.projectRoot);
    rmrf(ctx.approvalRoot);
  }
}

testDaProtocolWorksFromAnEquivalentTree();
testDbBinMappingResolvesToPackageTestDir();
testDcHelpDocumentsVerifyStageFinalization();
testDdCleanTreeStillSeals();
testDdDirtyTreeIsRefused();
testDdHatchRequiresAStatedReason();
testDdEmptyDeclaredScopeRefusesRatherThanPassesVacuously();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in worktree-and-closure-integrity.test.js`);
  process.exit(1);
}

console.log("\nAll worktree-and-closure-integrity tests passed.");
