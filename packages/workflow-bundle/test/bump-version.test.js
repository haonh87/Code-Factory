#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { resolveRepoRoot } = require("../scripts/bump-version");

function assert(condition, message) {
  if (!condition) throw new Error(message || "Assertion failed");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function runBumpVersion(tempRepoRoot, newVersion) {
  const scriptPath = path.resolve(__dirname, "..", "scripts", "bump-version.js");
  const args = newVersion != null
    ? [scriptPath, newVersion, "--repo-root", tempRepoRoot]
    : [scriptPath, "--repo-root", tempRepoRoot];
  return execFileSync(process.execPath, args, {
    cwd: tempRepoRoot,
    stdio: "pipe",
    encoding: "utf8"
  });
}

function runBumpVersionExpectFailure(tempRepoRoot, newVersion, expectedMessage) {
  try {
    runBumpVersion(tempRepoRoot, newVersion);
  } catch (error) {
    const detail = `${error.stderr || ""}\n${error.stdout || ""}\n${error.message || ""}`;
    if (expectedMessage && !detail.includes(expectedMessage)) {
      throw new Error(`Expected failure output to include '${expectedMessage}', got: ${detail}`);
    }
    return;
  }
  throw new Error("Expected bump-version to fail.");
}

function createTempRepo() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "bump-version-test-"));

  fs.mkdirSync(path.join(tempRoot, "packages", "workflow-bundle", "bin"), { recursive: true });
  fs.mkdirSync(path.join(tempRoot, "packages", "workflow-bundle", "scripts"), { recursive: true });
  fs.mkdirSync(path.join(tempRoot, "docs", "releases"), { recursive: true });
  fs.mkdirSync(path.join(tempRoot, ".claude"), { recursive: true });

  fs.writeFileSync(
    path.join(tempRoot, "workflow-bundle.manifest.json"),
    JSON.stringify({ bundleName: "workflow-bundle", bundleVersion: "1.0.0", content: {}, harnesses: ["codex"] }, null, 2) + "\n",
    "utf8"
  );

  fs.writeFileSync(
    path.join(tempRoot, "packages", "workflow-bundle", "workflow-bundle.manifest.json"),
    JSON.stringify({ bundleName: "workflow-bundle", bundleVersion: "1.0.0", codex: {} }, null, 2) + "\n",
    "utf8"
  );

  fs.writeFileSync(
    path.join(tempRoot, "packages", "workflow-bundle", "package.json"),
    JSON.stringify({ name: "workflow-bundle", version: "1.0.0" }, null, 2) + "\n",
    "utf8"
  );

  fs.writeFileSync(
    path.join(tempRoot, "packages", "workflow-bundle", "bin", "wfc.js"),
    `"Public v1.0.0 Flow:"\n`,
    "utf8"
  );

  fs.writeFileSync(path.join(tempRoot, ".claude", "CLAUDE.md"), "Public release: `workflow-bundle v1.0.0`.\n", "utf8");
  fs.writeFileSync(path.join(tempRoot, "README.md"), "Public release `v1.0.0`.\n", "utf8");
  fs.writeFileSync(path.join(tempRoot, "docs", "publish-surface.md"), "Public surface of `v1.0.0`.\n", "utf8");
  fs.writeFileSync(path.join(tempRoot, "docs", "workflow-bundle-quickstart.md"), "Quickstart for `v1.0.0`.\n", "utf8");
  fs.writeFileSync(path.join(tempRoot, "docs", "workflow-docs-map.md"), "Docs map for `v1.0.0`.\n", "utf8");
  fs.writeFileSync(path.join(tempRoot, "packages", "workflow-bundle", "README.md"), "Package README `v1.0.0`.\n", "utf8");

  return tempRoot;
}

function testRejectMissingVersion() {
  const tempRoot = createTempRepo();
  try {
    runBumpVersionExpectFailure(tempRoot, undefined, "Usage:");
    console.log("  PASS: rejects missing version argument");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function testRejectInvalidSemver() {
  const tempRoot = createTempRepo();
  try {
    runBumpVersionExpectFailure(tempRoot, "abc", "not a valid semver");
    console.log("  PASS: rejects invalid semver");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function testRejectSameVersion() {
  const tempRoot = createTempRepo();
  try {
    runBumpVersionExpectFailure(tempRoot, "1.0.0", "same as current");
    console.log("  PASS: rejects same version as current");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function testSuccessfulBump() {
  const tempRoot = createTempRepo();
  try {
    const output = runBumpVersion(tempRoot, "2.0.0");
    assert(output.includes("1.0.0 -> 2.0.0"), "Output should show version transition");

    const rootManifest = readJson(path.join(tempRoot, "workflow-bundle.manifest.json"));
    assert(rootManifest.bundleVersion === "2.0.0", "Root manifest bundleVersion should be 2.0.0");

    const runtimeManifest = readJson(path.join(tempRoot, "packages", "workflow-bundle", "workflow-bundle.manifest.json"));
    assert(runtimeManifest.bundleVersion === "2.0.0", "Runtime manifest bundleVersion should be 2.0.0");

    const pkgJson = readJson(path.join(tempRoot, "packages", "workflow-bundle", "package.json"));
    assert(pkgJson.version === "2.0.0", "package.json version should be 2.0.0");

    const wfcContent = fs.readFileSync(path.join(tempRoot, "packages", "workflow-bundle", "bin", "wfc.js"), "utf8");
    assert(wfcContent.includes("Public v2.0.0 Flow:"), "wfc.js help text should have v2.0.0");
    assert(!wfcContent.includes("v1.0.0"), "wfc.js help text should not have v1.0.0");

    const claudeMd = fs.readFileSync(path.join(tempRoot, ".claude", "CLAUDE.md"), "utf8");
    assert(claudeMd.includes("v2.0.0") && !claudeMd.includes("v1.0.0"), ".claude/CLAUDE.md should have v2.0.0");

    const readme = fs.readFileSync(path.join(tempRoot, "README.md"), "utf8");
    assert(readme.includes("v2.0.0") && !readme.includes("v1.0.0"), "README.md should have v2.0.0");

    const releaseNotePath = path.join(tempRoot, "docs", "releases", "workflow-bundle-v2.0.0.md");
    assert(fs.existsSync(releaseNotePath), "Release note stub should be created");
    const releaseNote = fs.readFileSync(releaseNotePath, "utf8");
    assert(releaseNote.includes("v2.0.0"), "Release note should mention v2.0.0");
    assert(releaseNote.includes("v1.0.0"), "Release note should mention previous v1.0.0");

    console.log("  PASS: successful bump updates all core + doc files + creates release note stub");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function testNoOverwriteExistingReleaseNote() {
  const tempRoot = createTempRepo();
  try {
    const releaseNotePath = path.join(tempRoot, "docs", "releases", "workflow-bundle-v2.0.0.md");
    fs.writeFileSync(releaseNotePath, "existing content\n", "utf8");

    runBumpVersion(tempRoot, "2.0.0");

    const releaseNote = fs.readFileSync(releaseNotePath, "utf8");
    assert(releaseNote === "existing content\n", "Existing release note should not be overwritten");
    console.log("  PASS: does not overwrite existing release note");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function testRejectPrereleaseSemver() {
  const tempRoot = createTempRepo();
  try {
    runBumpVersionExpectFailure(tempRoot, "2.0.0-rc1", "not a valid semver");
    console.log("  PASS: rejects prerelease semver (only X.Y.Z accepted)");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function testSubstringSafety() {
  const tempRoot = createTempRepo();
  try {
    // Write a doc file that contains the old version as part of a longer version
    // e.g., "v1.0.0" inside "v1.0.01" should NOT be replaced
    fs.writeFileSync(path.join(tempRoot, "README.md"), "Release v1.0.01 and v1.0.0.\n", "utf8");

    runBumpVersion(tempRoot, "2.0.0");

    const readme = fs.readFileSync(path.join(tempRoot, "README.md"), "utf8");
    assert(readme.includes("v1.0.01"), "Substring v1.0.01 should not be corrupted");
    assert(readme.includes("v2.0.0"), "Exact version v1.0.0 should be replaced with v2.0.0");
    assert(!readme.includes("v1.0.0") || readme.includes("v1.0.01"), "v1.0.0 should not remain unless part of v1.0.01");

    console.log("  PASS: substring safety — version in longer version string preserved");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function testResolveRepoRootPrefersOutermostManifest() {
  // Regression: the repo has a manifest at the root AND a second one inside
  // packages/workflow-bundle/. resolveRepoRoot() must return the OUTERMOST
  // (repo root), not stop at the first (inner package) one it meets while
  // walking up from the script dir. The previous "return first match" bug
  // resolved to the inner package and then wrote to a doubled-up path.
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "resolve-root-test-"));
  try {
    const innerDir = path.join(tempRoot, "packages", "workflow-bundle");
    const scriptsDir = path.join(innerDir, "scripts");
    fs.mkdirSync(scriptsDir, { recursive: true });
    fs.writeFileSync(path.join(tempRoot, "workflow-bundle.manifest.json"), "{}\n", "utf8");
    fs.writeFileSync(path.join(innerDir, "workflow-bundle.manifest.json"), "{}\n", "utf8");

    const resolvedFromScripts = fs.realpathSync(resolveRepoRoot(scriptsDir));
    assert(resolvedFromScripts === fs.realpathSync(tempRoot),
      `resolveRepoRoot from scripts dir should be repo root '${tempRoot}', got '${resolvedFromScripts}'`);

    const resolvedFromInner = fs.realpathSync(resolveRepoRoot(innerDir));
    assert(resolvedFromInner === fs.realpathSync(tempRoot),
      `resolveRepoRoot from inner package dir should be repo root '${tempRoot}', got '${resolvedFromInner}'`);

    console.log("  PASS: resolveRepoRoot returns outermost manifest (repo root), not inner package");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function runTests() {
  console.log("Running bump-version tests...\n");

  testRejectMissingVersion();
  testRejectInvalidSemver();
  testRejectSameVersion();
  testSuccessfulBump();
  testNoOverwriteExistingReleaseNote();
  testRejectPrereleaseSemver();
  testSubstringSafety();
  testResolveRepoRootPrefersOutermostManifest();

  console.log("\nAll bump-version tests passed.");
}

if (require.main === module) {
  try {
    runTests();
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}