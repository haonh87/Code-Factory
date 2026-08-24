#!/usr/bin/env node

"use strict";

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const packageRoot = path.join(repoRoot, "packages", "workflow-bundle");
const candidateVersion = "2.6.0";
const candidateSkillCount = 42;
const rollbackVersion = "2.5.0";
const rollbackSkillCount = 42;
const retainedRollbackDigest = "36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec";
const defaultRollbackTarball = path.resolve(
  repoRoot,
  "..",
  "artifact-governance-enforcement",
  "packages",
  "workflow-bundle",
  "workflow-bundle-2.5.0.tgz"
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function snapshot(filePath) {
  return {
    sha256: sha256(filePath),
    mode: fs.statSync(filePath).mode & 0o777
  };
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

function installArtifact(tarballPath, installPrefix, cacheRoot) {
  const npmBin = process.platform === "win32" ? "npm.cmd" : "npm";
  execFileSync(
    npmBin,
    ["install", "--prefix", installPrefix, "--ignore-scripts", "--no-audit", "--no-fund", tarballPath],
    {
      cwd: path.dirname(installPrefix),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, npm_config_cache: cacheRoot, npm_config_update_notifier: "false" }
    }
  );
  return path.join(installPrefix, "node_modules", "workflow-bundle");
}

function assertArtifactIdentity(tarballPath, expectedDigest, label) {
  assert(path.isAbsolute(tarballPath), `${label} tarball path must be absolute`);
  assert(fs.existsSync(tarballPath), `${label} tarball missing: ${tarballPath}`);
  assert(/^[a-f0-9]{64}$/.test(expectedDigest), `${label} expected digest must be a lowercase SHA-256`);
  const actualDigest = sha256(tarballPath);
  assert(actualDigest === expectedDigest, `${label} digest mismatch: expected ${expectedDigest}, got ${actualDigest}`);
  return actualDigest;
}

function runSourcePreflight() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));
  assert(packageJson.version === candidateVersion, `source package version must be ${candidateVersion}, got ${packageJson.version}`);
  for (const mode of ["codex", "claude"]) {
    const skillsRoot = path.join(packageRoot, "runtime", mode, "skills");
    assert(countSkills(skillsRoot) === candidateSkillCount, `source ${mode} runtime must contain ${candidateSkillCount} skills`);
    assert(
      fs.existsSync(path.join(skillsRoot, "guardrails", "artifact-governance", "SKILL.vi.md")),
      `source ${mode} runtime must contain artifact-governance/SKILL.vi.md`
    );
  }
  assertArtifactIdentity(defaultRollbackTarball, retainedRollbackDigest, "retained v2.5.0 rollback");
  console.log(`OK: rollback preflight passed for v${candidateVersion} -> v${rollbackVersion}; no candidate tarball was created`);
}

function runRollbackTransition({ candidatePackageRoot, rollbackPackageRoot, tempRoot, mode, scope }) {
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

  execFileSync(process.execPath, [path.join(candidatePackageRoot, "bin", "wfc.js"), ...installArgs], {
    cwd: candidatePackageRoot,
    stdio: "pipe",
    encoding: "utf8"
  });

  const statePath = path.join(runtimeHome, `${statePrefix}-workflow-bundle.install-state.json`);
  const candidateState = JSON.parse(fs.readFileSync(statePath, "utf8"));
  assert(candidateState.installed_bundle_version === candidateVersion, `${mode}/${scope}: candidate install must start at ${candidateVersion}`);
  assert(countSkills(path.join(runtimeHome, "skills")) === candidateSkillCount, `${mode}/${scope}: candidate must install ${candidateSkillCount} skills`);
  assert(fs.existsSync(path.join(runtimeHome, "skills", "artifact-governance", "SKILL.md")), `${mode}/${scope}: candidate must contain artifact-governance before rollback`);
  assert(
    fs.existsSync(path.join(runtimeHome, "skills", "sa", "references", "design-readiness-checklist.md")),
    `${mode}/${scope}: candidate must contain the v2.6.0 SA design-readiness reference before rollback`
  );

  execFileSync(process.execPath, [path.join(rollbackPackageRoot, "bin", "wfc.js"), ...installArgs], {
    cwd: rollbackPackageRoot,
    stdio: "pipe",
    encoding: "utf8"
  });

  const after = unmanagedPaths.map(snapshot);
  assert(JSON.stringify(after) === JSON.stringify(before), `${mode}/${scope}: unmanaged rollback marker changed`);
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  assert(state.installed_bundle_version === rollbackVersion, `${mode}/${scope}: expected installed version ${rollbackVersion}`);
  const skillCount = countSkills(path.join(runtimeHome, "skills"));
  assert(skillCount === rollbackSkillCount, `${mode}/${scope}: expected ${rollbackSkillCount} rollback skills, got ${skillCount}`);
  assert(fs.existsSync(path.join(runtimeHome, "skills", "artifact-governance", "SKILL.md")), `${mode}/${scope}: rollback must retain v2.5.0 artifact-governance`);
  assert(
    !fs.existsSync(path.join(runtimeHome, "skills", "sa", "references", "design-readiness-checklist.md")),
    `${mode}/${scope}: rollback must remove the v2.6.0 SA design-readiness reference`
  );
  return { mode, scope, installedVersion: state.installed_bundle_version, skillCount, unmanaged: after };
}

function runExactRollback(candidateTarball, candidateDigest, rollbackTarball, rollbackDigest) {
  const actualCandidateDigest = assertArtifactIdentity(candidateTarball, candidateDigest, "v2.6.0 candidate");
  const actualRollbackDigest = assertArtifactIdentity(rollbackTarball, rollbackDigest, "v2.5.0 rollback");
  console.log(`Running exact v${candidateVersion} -> v${rollbackVersion} rollback transition smoke...\n`);
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-bundle-v2.6.0-rollback-"));
  try {
    const cacheRoot = path.join(tempRoot, "npm-cache");
    const candidatePackageRoot = installArtifact(candidateTarball, path.join(tempRoot, "candidate-package"), cacheRoot);
    const rollbackPackageRoot = installArtifact(rollbackTarball, path.join(tempRoot, "rollback-package"), cacheRoot);
    const candidatePackage = JSON.parse(fs.readFileSync(path.join(candidatePackageRoot, "package.json"), "utf8"));
    const rollbackPackage = JSON.parse(fs.readFileSync(path.join(rollbackPackageRoot, "package.json"), "utf8"));
    assert(candidatePackage.version === candidateVersion, `candidate package version must be ${candidateVersion}`);
    assert(rollbackPackage.version === rollbackVersion, `rollback package version must be ${rollbackVersion}`);

    const results = [];
    for (const mode of ["codex", "claude"]) {
      for (const scope of ["global", "project"]) {
        results.push(runRollbackTransition({ candidatePackageRoot, rollbackPackageRoot, tempRoot, mode, scope }));
      }
    }
    results.forEach((result) => {
      console.log(`  PASS: ${result.mode}/${result.scope} installed_version=${result.installedVersion}, managed_skills=${result.skillCount}, unmanaged_markers=${result.unmanaged.length}`);
    });
    console.log(`  PASS: candidate_sha256=${actualCandidateDigest}`);
    console.log(`  PASS: rollback_sha256=${actualRollbackDigest}`);
    console.log("\nOK: release-rollback-smoke.test.js passed");
  } finally {
    chmodTreeWritable(tempRoot);
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

const candidateTarball = process.env.WORKFLOW_BUNDLE_CANDIDATE_TARBALL;
if (candidateTarball) {
  const rollbackTarball = process.env.WORKFLOW_BUNDLE_ROLLBACK_TARBALL || "";
  runExactRollback(
    candidateTarball,
    process.env.WORKFLOW_BUNDLE_CANDIDATE_SHA256 || "",
    rollbackTarball,
    process.env.WORKFLOW_BUNDLE_ROLLBACK_SHA256 || ""
  );
} else {
  runSourcePreflight();
}
