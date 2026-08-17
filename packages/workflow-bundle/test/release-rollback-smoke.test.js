#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const rollbackTag = "v2.3.2";
const candidateVersion = "2.4.0";
const candidateSkillCount = 41;
const expectedVersion = "2.3.2";
const expectedSkillCount = 40;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function snapshot(filePath) {
  return {
    sha256: crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex"),
    mode: fs.statSync(filePath).mode & 0o777
  };
}

function countSkills(root) {
  let count = 0;
  function walk(current) {
    fs.readdirSync(current, { withFileTypes: true }).forEach((entry) => {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) walk(target);
      if (entry.isFile() && entry.name === "SKILL.md") count += 1;
    });
  }
  walk(root);
  return count;
}

function runRollbackTransition({ oldRepoRoot, tempRoot, mode, scope }) {
  const scenarioRoot = path.join(tempRoot, `${mode}-${scope}`);
  const runtimeHome = path.join(scenarioRoot, `.${mode}`);
  const projectRoot = path.join(scenarioRoot, "project");
  const homeFlag = mode === "codex" ? "--codex-home" : "--claude-home";
  const statePrefix = mode === "codex" ? ".codex" : ".claude";
  const markerPath = path.join(runtimeHome, "unmanaged.rollback.keep");
  fs.mkdirSync(runtimeHome, { recursive: true });
  fs.writeFileSync(markerPath, `${mode}-unmanaged-rollback\n`, "utf8");
  fs.chmodSync(markerPath, 0o440);
  const unmanagedPaths = [markerPath];
  if (scope === "project") {
    fs.mkdirSync(projectRoot, { recursive: true });
    const projectMarker = path.join(projectRoot, "unmanaged.rollback.keep");
    fs.writeFileSync(projectMarker, `${mode}-project-unmanaged-rollback\n`, "utf8");
    fs.chmodSync(projectMarker, 0o440);
    unmanagedPaths.push(projectMarker);
  }
  const before = unmanagedPaths.map(snapshot);
  const installArgs = ["install", "--mode", mode, homeFlag, runtimeHome, "--scope", scope];
  if (scope === "project") installArgs.push("--project-root", projectRoot);

  execFileSync(
    process.execPath,
    [path.join(repoRoot, "packages", "workflow-bundle", "bin", "wfc.js"), ...installArgs],
    { cwd: repoRoot, stdio: "pipe", encoding: "utf8" }
  );

  const candidateState = JSON.parse(
    fs.readFileSync(path.join(runtimeHome, `${statePrefix}-workflow-bundle.install-state.json`), "utf8")
  );
  assert(candidateState.installed_bundle_version === candidateVersion, `${mode}/${scope}: candidate install must start at ${candidateVersion}`);
  assert(countSkills(path.join(runtimeHome, "skills")) === candidateSkillCount, `${mode}/${scope}: candidate must install ${candidateSkillCount} skills`);
  assert(fs.existsSync(path.join(runtimeHome, "skills", "architecture-modeling", "SKILL.md")), `${mode}/${scope}: candidate must contain architecture-modeling before rollback`);

  execFileSync(
    process.execPath,
    [
      path.join(oldRepoRoot, "packages", "workflow-bundle", "bin", "wfc.js"),
      ...installArgs
    ],
    { cwd: oldRepoRoot, stdio: "pipe", encoding: "utf8" }
  );

  const after = unmanagedPaths.map(snapshot);
  assert(JSON.stringify(after) === JSON.stringify(before), `${mode}/${scope}: unmanaged rollback marker changed`);
  const state = JSON.parse(fs.readFileSync(path.join(runtimeHome, `${statePrefix}-workflow-bundle.install-state.json`), "utf8"));
  assert(state.installed_bundle_version === expectedVersion, `${mode}/${scope}: expected installed version ${expectedVersion}`);
  const skillCount = countSkills(path.join(runtimeHome, "skills"));
  assert(skillCount === expectedSkillCount, `${mode}/${scope}: expected ${expectedSkillCount} rollback skills, got ${skillCount}`);
  assert(!fs.existsSync(path.join(runtimeHome, "skills", "architecture-modeling")), `${mode}/${scope}: rollback must remove architecture-modeling`);
  return { mode, scope, installedVersion: state.installed_bundle_version, skillCount, unmanaged: after };
}

console.log("Running isolated v2.4.0 -> v2.3.2 rollback transition smoke...\n");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-bundle-v2.3.2-rollback-"));
try {
  const archivePath = path.join(tempRoot, "source.tar");
  const oldRepoRoot = path.join(tempRoot, "source");
  fs.mkdirSync(oldRepoRoot, { recursive: true });
  execFileSync("git", ["archive", "--format=tar", "--output", archivePath, rollbackTag], {
    cwd: repoRoot,
    stdio: "pipe"
  });
  execFileSync("tar", ["-xf", archivePath, "-C", oldRepoRoot], { stdio: "pipe" });
  execFileSync(process.execPath, [path.join(oldRepoRoot, "packages", "workflow-bundle", "scripts", "sync-workflow-bundle-runtime.js")], {
    cwd: oldRepoRoot,
    stdio: "pipe",
    encoding: "utf8"
  });

  const results = [];
  for (const mode of ["codex", "claude"]) {
    for (const scope of ["global", "project"]) {
      results.push(runRollbackTransition({ oldRepoRoot, tempRoot, mode, scope }));
    }
  }
  results.forEach((result) => {
    console.log(`  PASS: ${result.mode}/${result.scope} installed_version=${result.installedVersion}, managed_skills=${result.skillCount}, unmanaged_markers=${result.unmanaged.length}`);
  });
  console.log("\nOK: release-rollback-smoke.test.js passed");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
