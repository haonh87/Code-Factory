#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SEMVER_RE = /^\d+\.\d+\.\d+$/;

function resolveRepoRoot(startDir = __dirname) {
  // Walk up and return the OUTERMOST directory that holds a
  // workflow-bundle.manifest.json. The repo ships two manifests — one at the
  // repo root and one inside packages/workflow-bundle/ — so returning the first
  // match while walking up from the script dir would resolve to the inner
  // package and then build doubled-up paths like
  // packages/workflow-bundle/packages/workflow-bundle/... The repo root is the
  // topmost manifest, so keep the highest one seen.
  let dir = path.resolve(startDir);
  let found = null;
  while (true) {
    if (fs.existsSync(path.join(dir, "workflow-bundle.manifest.json"))) {
      found = dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  if (!found) {
    throw new Error("Cannot find repo root (missing workflow-bundle.manifest.json).");
  }
  return found;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function replaceInFile(filePath, oldStr, newStr) {
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(oldStr)) {
    return false;
  }
  const escaped = oldStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const updated = content.replace(new RegExp(escaped + "(?!\\d)", "g"), newStr);
  fs.writeFileSync(filePath, updated, "utf8");
  return true;
}

function generateReleaseNote(newVersion, oldVersion) {
  const today = new Date().toISOString().split("T")[0];
  return [
    `# workflow-bundle v${newVersion}`,
    "",
    `Released: \`${today}\``,
    `Tag: \`v${newVersion}\``,
    `Branch: \`release/v${newVersion}\``,
    "",
    "## Release Preparation",
    "",
    `This candidate advances structured package metadata from \`v${oldVersion}\` to \`v${newVersion}\`.`,
    "Release-specific changes must be reviewed and recorded here before the human Release gate.",
    "",
    "## Metadata Changes",
    "",
    `- Root and package manifests target \`v${newVersion}\`.`,
    `- Package metadata and the public CLI flow label target \`v${newVersion}\`.`,
    "- Public documentation is intentionally not rewritten by this tool; it requires explicit review.",
    "",
    "## Verification",
    "",
    "- No verification is inferred by the version bump.",
    "- Record test, audit, package digest, and smoke evidence before release approval.",
    "",
    "## Rollback",
    "",
    `- Keep \`v${oldVersion}\` as the current published fallback until \`v${newVersion}\` passes its Release gate.`,
    "- Do not publish, tag, or update live installations from this generated note alone.",
    "",
    "## Public Docs",
    "",
    "- [`docs/publish-surface.md`](../publish-surface.md)",
    "- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)",
    "- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)",
    "- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)",
    "",
    "## Release Gates",
    "",
    "- Status: candidate metadata only.",
    "- Human Release approval remains required before tag or publication."
  ].join("\n") + "\n";
}

function parseArgs(argv) {
  let repoRoot = null;
  let newVersion = null;
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--repo-root" && argv[i + 1]) {
      repoRoot = path.resolve(argv[++i]);
    } else if (!newVersion && !argv[i].startsWith("--")) {
      newVersion = argv[i];
    }
  }
  return { newVersion, repoRoot };
}

function main() {
  const { newVersion, repoRoot: explicitRepoRoot } = parseArgs(process.argv);
  if (!newVersion) {
    console.error("Usage: bump-version.js <new-version> [--repo-root <path>]");
    console.error("Example: bump-version.js 2.2.0");
    process.exit(1);
  }

  if (!SEMVER_RE.test(newVersion)) {
    console.error(`ERROR: '${newVersion}' is not a valid semver (expected X.Y.Z).`);
    process.exit(1);
  }

  const repoRoot = explicitRepoRoot || resolveRepoRoot();
  const rootManifestPath = path.join(repoRoot, "workflow-bundle.manifest.json");
  const rootManifest = readJson(rootManifestPath);
  const oldVersion = rootManifest.bundleVersion || rootManifest.packVersion;
  if (!oldVersion) {
    console.error("ERROR: Cannot read bundleVersion from root manifest.");
    process.exit(1);
  }
  if (oldVersion === newVersion) {
    console.error(`ERROR: New version '${newVersion}' is the same as current version.`);
    process.exit(1);
  }

  console.log(`Bumping version: ${oldVersion} -> ${newVersion}`);
  console.log("");

  let updated = 0;

  rootManifest.bundleVersion = newVersion;
  writeJson(rootManifestPath, rootManifest);
  console.log(`  [1] ${path.relative(repoRoot, rootManifestPath)} — bundleVersion`);
  updated++;

  const runtimeManifestPath = path.join(repoRoot, "packages", "workflow-bundle", "workflow-bundle.manifest.json");
  const runtimeManifest = readJson(runtimeManifestPath);
  runtimeManifest.bundleVersion = newVersion;
  writeJson(runtimeManifestPath, runtimeManifest);
  console.log(`  [2] ${path.relative(repoRoot, runtimeManifestPath)} — bundleVersion`);
  updated++;

  const packageJsonPath = path.join(repoRoot, "packages", "workflow-bundle", "package.json");
  const packageJson = readJson(packageJsonPath);
  packageJson.version = newVersion;
  writeJson(packageJsonPath, packageJson);
  console.log(`  [3] ${path.relative(repoRoot, packageJsonPath)} — version`);
  updated++;

  const wfcBinPath = path.join(repoRoot, "packages", "workflow-bundle", "bin", "wfc.js");
  if (replaceInFile(wfcBinPath, `Public v${oldVersion} Flow:`, `Public v${newVersion} Flow:`)) {
    console.log(`  [4] ${path.relative(repoRoot, wfcBinPath)} — help text`);
    updated++;
  } else {
    console.warn(`  [4] ${path.relative(repoRoot, wfcBinPath)} — 'Public v${oldVersion} Flow:' not found, skipped`);
  }

  const docFiles = [
    path.join(repoRoot, ".claude", "CLAUDE.md"),
    path.join(repoRoot, "README.md"),
    path.join(repoRoot, "docs", "publish-surface.md"),
    path.join(repoRoot, "docs", "workflow-bundle-quickstart.md"),
    path.join(repoRoot, "docs", "workflow-docs-map.md"),
    path.join(repoRoot, "packages", "workflow-bundle", "README.md")
  ];

  console.log("\nManual review required: public docs are not rewritten automatically.");
  docFiles.forEach((filePath) => {
    console.log(`  - ${path.relative(repoRoot, filePath)}`);
  });

  const releaseNotePath = path.join(repoRoot, "docs", "releases", `workflow-bundle-v${newVersion}.md`);
  if (fs.existsSync(releaseNotePath)) {
    console.warn(`  [11] ${path.relative(repoRoot, releaseNotePath)} — already exists, skipped`);
  } else {
    fs.mkdirSync(path.dirname(releaseNotePath), { recursive: true });
    fs.writeFileSync(releaseNotePath, generateReleaseNote(newVersion, oldVersion), "utf8");
    console.log(`  [11] ${path.relative(repoRoot, releaseNotePath)} — stub created`);
    updated++;
  }

  console.log("");
  console.log(`Done. ${updated} file(s) updated.`);
  console.log("Next steps:");
  console.log("  1. Review and update public docs plus the generated release note explicitly");
  console.log("  2. Run: wfc bundle-smoke");
  console.log("  3. Commit and tag");
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { resolveRepoRoot };
