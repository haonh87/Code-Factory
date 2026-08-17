#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const rollbackTag = "v2.3.2";
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

function runRollbackInstall({ oldRepoRoot, tempRoot, mode }) {
  const runtimeHome = path.join(tempRoot, `.${mode}`);
  const homeFlag = mode === "codex" ? "--codex-home" : "--claude-home";
  const statePrefix = mode === "codex" ? ".codex" : ".claude";
  const markerPath = path.join(runtimeHome, "unmanaged.rollback.keep");
  fs.mkdirSync(runtimeHome, { recursive: true });
  fs.writeFileSync(markerPath, `${mode}-unmanaged-rollback\n`, "utf8");
  fs.chmodSync(markerPath, 0o440);
  const before = snapshot(markerPath);

  execFileSync(
    process.execPath,
    [
      path.join(oldRepoRoot, "packages", "workflow-bundle", "bin", "wfc.js"),
      "install",
      "--mode",
      mode,
      homeFlag,
      runtimeHome,
      "--scope",
      "global"
    ],
    { cwd: oldRepoRoot, stdio: "pipe", encoding: "utf8" }
  );

  const after = snapshot(markerPath);
  assert(JSON.stringify(after) === JSON.stringify(before), `${mode}: unmanaged rollback marker changed`);
  const state = JSON.parse(fs.readFileSync(path.join(runtimeHome, `${statePrefix}-workflow-bundle.install-state.json`), "utf8"));
  assert(state.installed_bundle_version === expectedVersion, `${mode}: expected installed version ${expectedVersion}`);
  const skillCount = countSkills(path.join(runtimeHome, "skills"));
  assert(skillCount === expectedSkillCount, `${mode}: expected ${expectedSkillCount} rollback skills, got ${skillCount}`);
  return { mode, installedVersion: state.installed_bundle_version, skillCount, unmanaged: after };
}

console.log("Running isolated v2.3.2 rollback smoke...\n");
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

  const results = ["codex", "claude"].map((mode) => runRollbackInstall({ oldRepoRoot, tempRoot, mode }));
  results.forEach((result) => {
    console.log(`  PASS: ${result.mode} installed_version=${result.installedVersion}, managed_skills=${result.skillCount}, unmanaged_sha256=${result.unmanaged.sha256}`);
  });
  console.log("\nOK: release-rollback-smoke.test.js passed");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
