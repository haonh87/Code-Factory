const fs = require("fs");
const path = require("path");
const { ensureDirectory, readUtf8 } = require("./workflow-validator-utils");

const BUNDLE_MANIFEST_FILE = "workflow-bundle.manifest.json";
const LEGACY_BUNDLE_MANIFEST_FILE = "workflow-pack.manifest.json";

function loadJson(filePath) {
  return JSON.parse(readUtf8(filePath));
}

function resolveManifestPath(rootPath) {
  const bundleManifestPath = path.join(rootPath, BUNDLE_MANIFEST_FILE);
  if (fs.existsSync(bundleManifestPath)) {
    return bundleManifestPath;
  }

  const legacyManifestPath = path.join(rootPath, LEGACY_BUNDLE_MANIFEST_FILE);
  if (fs.existsSync(legacyManifestPath)) {
    return legacyManifestPath;
  }

  return bundleManifestPath;
}

function removeFileIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  fs.rmSync(filePath, { force: true });
}

function copyDirectory(sourcePath, destinationPath) {
  fs.rmSync(destinationPath, { recursive: true, force: true });
  fs.cpSync(sourcePath, destinationPath, { recursive: true });
}

function copyDirectoryWithoutFiles(sourcePath, destinationPath, excludedFileNames) {
  fs.rmSync(destinationPath, { recursive: true, force: true });
  fs.mkdirSync(destinationPath, { recursive: true });

  const entries = fs.readdirSync(sourcePath, { withFileTypes: true });
  entries.forEach((entry) => {
    const sourceEntryPath = path.join(sourcePath, entry.name);
    const destinationEntryPath = path.join(destinationPath, entry.name);

    if (entry.isFile() && excludedFileNames.has(entry.name)) {
      return;
    }

    if (entry.isDirectory()) {
      copyDirectoryWithoutFiles(sourceEntryPath, destinationEntryPath, excludedFileNames);
      return;
    }

    if (entry.isFile()) {
      fs.copyFileSync(sourceEntryPath, destinationEntryPath);
    }
  });
}

function countBundledSkills(skillsRoot) {
  let count = 0;

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    entries.forEach((entry) => {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        return;
      }

      if (entry.isFile() && entry.name === "SKILL.md") {
        count += 1;
      }
    });
  }

  walk(skillsRoot);
  return count;
}

function main() {
  const repoRoot = path.resolve(__dirname, "..", "..", "..");
  const packageRoot = path.resolve(__dirname, "..");
  const sourceManifestPath = resolveManifestPath(repoRoot);
  const packageManifestPath = path.join(packageRoot, BUNDLE_MANIFEST_FILE);
  const legacyPackageManifestPath = path.join(packageRoot, LEGACY_BUNDLE_MANIFEST_FILE);
  const runtimeCodexRoot = path.join(packageRoot, "runtime", "codex");
  const runtimeSkillsRoot = path.join(runtimeCodexRoot, "skills");
  const runtimePoliciesRoot = path.join(runtimeCodexRoot, "policies", "codex");

  if (!fs.existsSync(sourceManifestPath)) {
    throw new Error(`Missing root manifest: ${sourceManifestPath}`);
  }

  const sourceManifest = loadJson(sourceManifestPath);
  const sourceGlobalAgents = path.join(repoRoot, sourceManifest.codex.globalAgentsSource);
  const sourceSkillsRoot = path.join(repoRoot, sourceManifest.codex.skillsSourceRoot);
  const sourceSupportPoliciesRoot = path.join(repoRoot, sourceManifest.codex.supportPoliciesSourceRoot);

  if (!fs.existsSync(sourceGlobalAgents)) {
    throw new Error(`Missing source AGENTS policy: ${sourceGlobalAgents}`);
  }
  if (!fs.existsSync(sourceSkillsRoot)) {
    throw new Error(`Missing source skills root: ${sourceSkillsRoot}`);
  }
  if (!fs.existsSync(sourceSupportPoliciesRoot)) {
    throw new Error(`Missing support policies root: ${sourceSupportPoliciesRoot}`);
  }

  fs.rmSync(runtimeCodexRoot, { recursive: true, force: true });
  ensureDirectory(runtimeCodexRoot);
  ensureDirectory(path.dirname(runtimePoliciesRoot));

  fs.copyFileSync(sourceGlobalAgents, path.join(runtimeCodexRoot, path.basename(sourceGlobalAgents)));
  copyDirectory(sourceSkillsRoot, runtimeSkillsRoot);
  copyDirectoryWithoutFiles(sourceSupportPoliciesRoot, runtimePoliciesRoot, new Set([sourceManifest.codex.globalAgentsFileName]));

  const packageManifest = {
    bundleName: sourceManifest.bundleName || sourceManifest.packName,
    bundleVersion: sourceManifest.bundleVersion || sourceManifest.packVersion,
    codex: {
      ...sourceManifest.codex,
      globalAgentsSource: `runtime/codex/${path.basename(sourceGlobalAgents)}`,
      skillsSourceRoot: "runtime/codex/skills",
      supportPoliciesSourceRoot: "runtime/codex/policies/codex"
    }
  };

  fs.writeFileSync(packageManifestPath, `${JSON.stringify(packageManifest, null, 2)}\n`, "utf8");
  if (legacyPackageManifestPath !== packageManifestPath) {
    removeFileIfExists(legacyPackageManifestPath);
  }

  const bundledSkillCount = countBundledSkills(runtimeSkillsRoot);

  console.log(
    [
      "OK: bundled workflow bundle runtime",
      `package_root=${packageRoot}`,
      `bundle_version=${packageManifest.bundleVersion}`,
      `skills=${bundledSkillCount}`,
      `manifest=${packageManifestPath}`
    ].join(" | ")
  );
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  main
};
