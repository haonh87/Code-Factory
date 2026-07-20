const fs = require("fs");
const path = require("path");
const { ensureDirectory, readUtf8 } = require("./workflow-validator-utils");
const { listAvailableHarnesses, loadAdapter, getRuntimeConfigFromAdapter } = require("./workflow-bundle-utils");

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
  // Ensure copied files are writable (source may be read-only)
  fs.chmodSync(destinationPath, 0o755);
  for (const entry of fs.readdirSync(destinationPath, { withFileTypes: true })) {
    const entryPath = path.join(destinationPath, entry.name);
    if (entry.isFile()) {
      fs.chmodSync(entryPath, 0o644);
    } else if (entry.isDirectory()) {
      // Recursively chmod subdirectories
      function chmodRecursive(dirPath) {
        fs.chmodSync(dirPath, 0o755);
        for (const sub of fs.readdirSync(dirPath, { withFileTypes: true })) {
          const subPath = path.join(dirPath, sub.name);
          if (sub.isFile()) {
            fs.chmodSync(subPath, 0o644);
          } else if (sub.isDirectory()) {
            chmodRecursive(subPath);
          }
        }
      }
      chmodRecursive(entryPath);
    }
  }
}

function copyFileWritable(sourcePath, destinationPath) {
  fs.copyFileSync(sourcePath, destinationPath);
  fs.chmodSync(destinationPath, 0o644);
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
      copyFileWritable(sourceEntryPath, destinationEntryPath);
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

function bundleRuntimeMode({ repoRoot, packageRoot, sourceManifest, mode }) {
  // Determine runtime config: new format uses adapter, old format uses manifest key
  let runtimeConfig;
  if (sourceManifest.content && sourceManifest.harnesses) {
    // New format: content + adapter
    try {
      const adapter = loadAdapter(mode, repoRoot);
      runtimeConfig = getRuntimeConfigFromAdapter(sourceManifest, adapter);
    } catch (_) {
      // Adapter not found for this mode — skip
      return null;
    }
  } else {
    // Legacy format: top-level mode key
    runtimeConfig = sourceManifest[mode];
  }

  if (!runtimeConfig) {
    return null;
  }

  const runtimeRoot = path.join(packageRoot, "runtime", mode);
  const runtimeSkillsRoot = path.join(runtimeRoot, "skills");
  const supportPoliciesTargetRoot = runtimeConfig.supportPoliciesTargetRoot || "";
  const runtimePoliciesRoot = supportPoliciesTargetRoot ? path.join(runtimeRoot, supportPoliciesTargetRoot) : "";
  const sourceGlobalAgents = path.join(repoRoot, runtimeConfig.globalAgentsSource);
  const sourceSkillsRoot = path.join(repoRoot, runtimeConfig.skillsSourceRoot);
  const sourceSupportPoliciesRoot = runtimeConfig.supportPoliciesSourceRoot
    ? path.join(repoRoot, runtimeConfig.supportPoliciesSourceRoot)
    : "";

  if (!fs.existsSync(sourceGlobalAgents)) {
    throw new Error(`Missing source policy for mode '${mode}': ${sourceGlobalAgents}`);
  }
  if (!fs.existsSync(sourceSkillsRoot)) {
    throw new Error(`Missing source skills root for mode '${mode}': ${sourceSkillsRoot}`);
  }
  if (sourceSupportPoliciesRoot && !fs.existsSync(sourceSupportPoliciesRoot)) {
    throw new Error(`Missing support policies root for mode '${mode}': ${sourceSupportPoliciesRoot}`);
  }

  fs.rmSync(runtimeRoot, { recursive: true, force: true });
  ensureDirectory(runtimeRoot);
  if (runtimePoliciesRoot) {
    ensureDirectory(path.dirname(runtimePoliciesRoot));
  }

  copyFileWritable(sourceGlobalAgents, path.join(runtimeRoot, path.basename(sourceGlobalAgents)));
  copyDirectory(sourceSkillsRoot, runtimeSkillsRoot);
  if (runtimePoliciesRoot && sourceSupportPoliciesRoot) {
    copyDirectoryWithoutFiles(sourceSupportPoliciesRoot, runtimePoliciesRoot, new Set([runtimeConfig.globalAgentsFileName]));
  }

  return {
    ...runtimeConfig,
    globalAgentsSource: `runtime/${mode}/${path.basename(sourceGlobalAgents)}`,
    skillsSourceRoot: `runtime/${mode}/skills`,
    supportPoliciesSourceRoot: runtimePoliciesRoot ? `runtime/${mode}/${supportPoliciesTargetRoot}` : ""
  };
}

function main() {
  const repoRoot = path.resolve(__dirname, "..", "..", "..");
  const packageRoot = path.resolve(__dirname, "..");
  const sourceManifestPath = resolveManifestPath(repoRoot);
  const packageManifestPath = path.join(packageRoot, BUNDLE_MANIFEST_FILE);
  const legacyPackageManifestPath = path.join(packageRoot, LEGACY_BUNDLE_MANIFEST_FILE);
  if (!fs.existsSync(sourceManifestPath)) {
    throw new Error(`Missing root manifest: ${sourceManifestPath}`);
  }

  const sourceManifest = loadJson(sourceManifestPath);
  const packageManifest = {
    bundleName: sourceManifest.bundleName || sourceManifest.packName,
    bundleVersion: sourceManifest.bundleVersion || sourceManifest.packVersion
  };

  // Determine harness modes from adapters or manifest
  const availableHarnesses = listAvailableHarnesses(repoRoot);
  const harnessModes = availableHarnesses.length > 0
    ? availableHarnesses.map((h) => h.harnessId)
    : (sourceManifest.harnesses || ["codex", "claude"]);

  harnessModes.forEach((mode) => {
    const bundledRuntime = bundleRuntimeMode({ repoRoot, packageRoot, sourceManifest, mode });
    if (bundledRuntime) {
      packageManifest[mode] = bundledRuntime;
    }
  });

  fs.writeFileSync(packageManifestPath, `${JSON.stringify(packageManifest, null, 2)}\n`, "utf8");
  if (legacyPackageManifestPath !== packageManifestPath) {
    removeFileIfExists(legacyPackageManifestPath);
  }

  const runtimeModes = Object.keys(packageManifest).filter((key) => key !== "bundleName" && key !== "bundleVersion" && key !== "content" && key !== "harnesses");
  const bundledSkillCount = runtimeModes.reduce((total, mode) => total + countBundledSkills(path.join(packageRoot, "runtime", mode, "skills")), 0);

  console.log(
    [
      "OK: bundled workflow bundle runtime",
      `package_root=${packageRoot}`,
      `bundle_version=${packageManifest.bundleVersion}`,
      `modes=${runtimeModes.join(",")}`,
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
  main,
  copyDirectory
};
