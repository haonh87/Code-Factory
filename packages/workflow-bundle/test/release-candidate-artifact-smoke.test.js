#!/usr/bin/env node

"use strict";

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const packageRoot = path.join(repoRoot, "packages", "workflow-bundle");
const expectedVersion = "2.4.0";
const expectedSkillCount = 41;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function chmodTreeWritable(targetPath) {
  if (!fs.existsSync(targetPath)) return;
  const stat = fs.lstatSync(targetPath);
  if (stat.isSymbolicLink()) return;
  if (stat.isDirectory()) {
    fs.chmodSync(targetPath, (stat.mode & 0o777) | 0o700);
    fs.readdirSync(targetPath).forEach((name) => chmodTreeWritable(path.join(targetPath, name)));
    return;
  }
  fs.chmodSync(targetPath, (stat.mode & 0o777) | 0o600);
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

console.log("Running exact v2.4.0 package-artifact smoke...\n");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-bundle-v2.4.0-artifact-"));
try {
  const packRoot = path.join(tempRoot, "pack");
  const cacheRoot = path.join(tempRoot, "npm-cache");
  const installPrefix = path.join(tempRoot, "install");
  fs.mkdirSync(packRoot, { recursive: true });

  const npmBin = process.platform === "win32" ? "npm.cmd" : "npm";
  const packOutput = execFileSync(
    npmBin,
    ["pack", "--json", "--silent", "--pack-destination", packRoot, "--cache", cacheRoot],
    {
      cwd: packageRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, npm_config_audit: "false", npm_config_fund: "false", npm_config_update_notifier: "false" }
    }
  );
  const jsonStart = packOutput.indexOf("[");
  assert(jsonStart >= 0, `npm pack did not emit JSON metadata: ${packOutput}`);
  const packResult = JSON.parse(packOutput.slice(jsonStart));
  assert(Array.isArray(packResult) && packResult.length === 1, "npm pack must return exactly one artifact");
  const tarballPath = path.join(packRoot, packResult[0].filename);
  assert(fs.existsSync(tarballPath), `packed tarball missing: ${tarballPath}`);

  execFileSync(
    npmBin,
    ["install", "--prefix", installPrefix, "--ignore-scripts", "--no-audit", "--no-fund", tarballPath],
    {
      cwd: tempRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, npm_config_cache: cacheRoot, npm_config_update_notifier: "false" }
    }
  );

  const installedPackageRoot = path.join(installPrefix, "node_modules", "workflow-bundle");
  const installedPackage = JSON.parse(fs.readFileSync(path.join(installedPackageRoot, "package.json"), "utf8"));
  assert(installedPackage.version === expectedVersion, `installed tarball version must be ${expectedVersion}`);
  for (const mode of ["codex", "claude"]) {
    assert(
      fs.existsSync(path.join(installedPackageRoot, "runtime", mode, "skills", "architecture", "architecture-modeling", "SKILL.md")),
      `${mode} runtime in the tarball must contain architecture-modeling`
    );
  }

  const wfcBin = path.join(installedPackageRoot, "bin", "wfc.js");
  const versionOutput = execFileSync(process.execPath, [wfcBin, "version"], {
    cwd: tempRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
  assert(versionOutput === expectedVersion, `wfc version from installed tarball must be ${expectedVersion}, got ${versionOutput}`);

  const { runHardenedUpdateMatrix } = require(path.join(installedPackageRoot, "scripts", "run-workflow-bundle-smoke.js"));
  const results = runHardenedUpdateMatrix({
    wfcBin,
    tempRoot: path.join(tempRoot, "matrix"),
    skills: []
  });
  assert(results.length === 4, `expected 4 installed-artifact scenarios, got ${results.length}`);
  assert(results.every((result) => result.exit_ok), "all installed-artifact scenarios must exit successfully");
  assert(results.every((result) => result.unmanaged_unchanged), "installed artifact must preserve unmanaged hashes and modes");
  assert(
    results.every((result) => result.managed_skill_count === expectedSkillCount),
    `installed artifact must install ${expectedSkillCount} managed skills in every scenario`
  );

  console.log(`  PASS: tarball=${path.basename(tarballPath)}`);
  console.log(`  PASS: sha256=${sha256(tarballPath)}`);
  console.log(`  PASS: wfc version=${versionOutput}; Codex/Claude x global/project=${results.length}/4`);
  console.log("\nOK: release-candidate-artifact-smoke.test.js passed");
} finally {
  chmodTreeWritable(tempRoot);
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
