#!/usr/bin/env node

"use strict";

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const packageRoot = path.join(repoRoot, "packages", "workflow-bundle");
const expectedVersion = "2.6.1";
const expectedSkillCount = 42;

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

function assertRuntimeContract(root, label) {
  for (const mode of ["codex", "claude"]) {
    const skillsRoot = path.join(root, "runtime", mode, "skills");
    assert(countSkills(skillsRoot) === expectedSkillCount, `${label}/${mode} must contain ${expectedSkillCount} skills`);
    const skillRoot = path.join(skillsRoot, "guardrails", "artifact-governance");
    assert(fs.existsSync(path.join(skillRoot, "SKILL.md")), `${label}/${mode} must contain artifact-governance/SKILL.md`);
    assert(fs.existsSync(path.join(skillRoot, "SKILL.vi.md")), `${label}/${mode} must contain artifact-governance/SKILL.vi.md`);
    for (const role of ["sa", "ta"]) {
      const roleRoot = path.join(skillsRoot, "analysis", role);
      assert(
        fs.existsSync(path.join(roleRoot, "references", "design-readiness-checklist.md")),
        `${label}/${mode} must contain ${role}/references/design-readiness-checklist.md`
      );
      assert(
        fs.existsSync(path.join(roleRoot, "references", "design-readiness-checklist.vi.md")),
        `${label}/${mode} must contain ${role}/references/design-readiness-checklist.vi.md`
      );
    }
  }
}

function runSourcePreflight() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));
  assert(packageJson.version === expectedVersion, `source package version must be ${expectedVersion}, got ${packageJson.version}`);
  assertRuntimeContract(packageRoot, "source package");
  console.log(`OK: pre-candidate source contract passed for v${expectedVersion}/${expectedSkillCount}; no tarball was created`);
}

function runExactArtifactSmoke(tarballPath, expectedDigest) {
  assert(path.isAbsolute(tarballPath), "WORKFLOW_BUNDLE_CANDIDATE_TARBALL must be an absolute path");
  assert(fs.existsSync(tarballPath), `candidate tarball missing: ${tarballPath}`);
  assert(/^[a-f0-9]{64}$/.test(expectedDigest), "WORKFLOW_BUNDLE_CANDIDATE_SHA256 must be a lowercase SHA-256");
  const actualDigest = sha256(tarballPath);
  assert(actualDigest === expectedDigest, `candidate digest mismatch: expected ${expectedDigest}, got ${actualDigest}`);

  console.log(`Running exact v${expectedVersion} package-artifact smoke...\n`);
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-bundle-v2.6.1-artifact-"));
  try {
    const cacheRoot = path.join(tempRoot, "npm-cache");
    const installPrefix = path.join(tempRoot, "install");
    const npmBin = process.platform === "win32" ? "npm.cmd" : "npm";
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
    assertRuntimeContract(installedPackageRoot, "installed candidate");

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

    console.log(`  PASS: tarball=${tarballPath}`);
    console.log(`  PASS: sha256=${actualDigest}`);
    console.log(`  PASS: wfc version=${versionOutput}; Codex/Claude x global/project=${results.length}/4`);
    console.log("\nOK: release-candidate-artifact-smoke.test.js passed");
  } finally {
    chmodTreeWritable(tempRoot);
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

const candidateTarball = process.env.WORKFLOW_BUNDLE_CANDIDATE_TARBALL;
if (candidateTarball) {
  runExactArtifactSmoke(candidateTarball, process.env.WORKFLOW_BUNDLE_CANDIDATE_SHA256 || "");
} else {
  runSourcePreflight();
}
