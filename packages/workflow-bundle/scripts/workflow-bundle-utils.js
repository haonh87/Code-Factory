const fs = require("fs");
const path = require("path");
const { ensureDirectory, readUtf8 } = require("./workflow-validator-utils");

const BUNDLE_MANIFEST_FILE = "workflow-bundle.manifest.json";
const LEGACY_BUNDLE_MANIFEST_FILE = "workflow-pack.manifest.json";
const DEFAULT_MANAGED_SKILLS_MANIFEST_FILE = ".codex-workflow-bundle.managed-skills.txt";
const LEGACY_MANAGED_SKILLS_MANIFEST_FILE = ".codex-workflow-pack.managed-skills.txt";
const DEFAULT_INSTALL_STATE_FILE = ".codex-workflow-bundle.install-state.json";
const LEGACY_INSTALL_STATE_FILE = ".codex-workflow-pack.install-state.json";
const VALID_INSTALL_SCOPES = ["global", "project", "both"];

function getManifestBundleName(manifest) {
  return String((manifest && (manifest.bundleName || manifest.packName)) || "").trim();
}

function getManifestBundleVersion(manifest) {
  return String((manifest && (manifest.bundleVersion || manifest.packVersion)) || "").trim();
}

function normalizeSingleValue(value) {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }

  return value;
}

function normalizeArray(value) {
  if (value == null) {
    return [];
  }

  return (Array.isArray(value) ? value : [value])
    .flatMap((item) => (Array.isArray(item) ? item : [item]))
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function unique(items) {
  return [...new Set(items)];
}

function resolveExistingPath(baseDir, fileNames) {
  for (const fileName of fileNames) {
    const candidate = path.join(baseDir, fileName);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

function describeManifestFiles() {
  return `${BUNDLE_MANIFEST_FILE} (legacy ${LEGACY_BUNDLE_MANIFEST_FILE} also accepted)`;
}

function findManifestUpwards(startDir) {
  let currentDir = path.resolve(startDir);

  while (true) {
    const manifestPath = resolveExistingPath(currentDir, [BUNDLE_MANIFEST_FILE, LEGACY_BUNDLE_MANIFEST_FILE]);
    if (manifestPath) {
      return manifestPath;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return null;
    }

    currentDir = parentDir;
  }
}

function getDefaultRepoRoot() {
  const foundFromScriptDir = findManifestUpwards(__dirname);
  if (foundFromScriptDir) {
    return path.dirname(foundFromScriptDir);
  }

  return path.resolve(__dirname, "..");
}

function resolveRepoRoot(explicitRepoRoot) {
  if (explicitRepoRoot) {
    const resolved = path.resolve(explicitRepoRoot);
    const manifestPath = resolveExistingPath(resolved, [BUNDLE_MANIFEST_FILE, LEGACY_BUNDLE_MANIFEST_FILE]);
    if (!manifestPath) {
      throw new Error(`Missing workflow bundle manifest (${describeManifestFiles()}) under repo root: ${resolved}`);
    }
    return resolved;
  }

  const foundFromCwd = findManifestUpwards(process.cwd());
  if (foundFromCwd) {
    return path.dirname(foundFromCwd);
  }

  const defaultRepoRoot = getDefaultRepoRoot();
  const defaultManifest = resolveExistingPath(defaultRepoRoot, [BUNDLE_MANIFEST_FILE, LEGACY_BUNDLE_MANIFEST_FILE]);
  if (defaultManifest) {
    return defaultRepoRoot;
  }

  throw new Error(
    `Cannot resolve repo root. Pass '--repo-root <path>' that contains the workflow bundle manifest (${describeManifestFiles()}).`
  );
}

function loadBundleManifest(repoRoot) {
  const manifestPath = resolveExistingPath(repoRoot, [BUNDLE_MANIFEST_FILE, LEGACY_BUNDLE_MANIFEST_FILE]);
  if (!manifestPath) {
    throw new Error(`Missing workflow bundle manifest under ${repoRoot}. Expected ${describeManifestFiles()}.`);
  }

  const manifest = JSON.parse(readUtf8(manifestPath));
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    throw new Error(`Invalid workflow bundle manifest root in ${manifestPath}`);
  }

  if (!getManifestBundleName(manifest) || !getManifestBundleVersion(manifest) || !manifest.codex) {
    throw new Error(`Workflow bundle manifest is missing required fields in ${manifestPath}`);
  }

  return {
    manifestPath,
    manifest
  };
}

function resolveCodexHome(explicitCodexHome) {
  const value = explicitCodexHome || process.env.CODEX_HOME || path.join(require("os").homedir(), ".codex");
  return path.resolve(value);
}

function getConfiguredBundleFileNames(codexConfig) {
  const configuredManagedSkillsManifestFile = String(codexConfig.managedSkillsManifestFile || "").trim();
  const configuredInstallStateFile = String(codexConfig.installStateFile || "").trim();

  const managedSkillsManifestFile =
    configuredManagedSkillsManifestFile &&
    configuredManagedSkillsManifestFile !== LEGACY_MANAGED_SKILLS_MANIFEST_FILE
      ? configuredManagedSkillsManifestFile
      : DEFAULT_MANAGED_SKILLS_MANIFEST_FILE;

  const legacyManagedSkillsManifestFile = String(
    codexConfig.legacyManagedSkillsManifestFile ||
      (configuredManagedSkillsManifestFile &&
      configuredManagedSkillsManifestFile !== managedSkillsManifestFile
        ? configuredManagedSkillsManifestFile
        : LEGACY_MANAGED_SKILLS_MANIFEST_FILE)
  ).trim();

  const installStateFile =
    configuredInstallStateFile && configuredInstallStateFile !== LEGACY_INSTALL_STATE_FILE
      ? configuredInstallStateFile
      : DEFAULT_INSTALL_STATE_FILE;

  const legacyInstallStateFile = String(
    codexConfig.legacyInstallStateFile ||
      (configuredInstallStateFile && configuredInstallStateFile !== installStateFile
        ? configuredInstallStateFile
        : LEGACY_INSTALL_STATE_FILE)
  ).trim();

  return {
    managedSkillsManifestFile,
    legacyManagedSkillsManifestFile,
    installStateFile,
    legacyInstallStateFile
  };
}

function getBundlePaths({ repoRoot, codexHome, manifest }) {
  const codexConfig = manifest.codex;
  const bundleFileNames = getConfiguredBundleFileNames(codexConfig);
  const globalAgentsSource = path.join(repoRoot, codexConfig.globalAgentsSource);
  const skillsSourceRoot = path.join(repoRoot, codexConfig.skillsSourceRoot);
  const supportPoliciesSourceRoot = codexConfig.supportPoliciesSourceRoot
    ? path.join(repoRoot, codexConfig.supportPoliciesSourceRoot)
    : "";

  return {
    globalAgentsSource,
    skillsSourceRoot,
    supportPoliciesSourceRoot,
    globalAgentsFileName: codexConfig.globalAgentsFileName,
    globalAgentsDest: path.join(codexHome, codexConfig.globalAgentsFileName),
    skillsHome: path.join(codexHome, "skills"),
    supportPoliciesHome: codexConfig.supportPoliciesTargetRoot
      ? path.join(codexHome, codexConfig.supportPoliciesTargetRoot)
      : "",
    managedSkillsManifestPath: path.join(codexHome, bundleFileNames.managedSkillsManifestFile),
    legacyManagedSkillsManifestPath: path.join(codexHome, bundleFileNames.legacyManagedSkillsManifestFile),
    installStatePath: path.join(codexHome, bundleFileNames.installStateFile),
    legacyInstallStatePath: path.join(codexHome, bundleFileNames.legacyInstallStateFile),
    projectAgentsFileName: codexConfig.projectAgentsFileName
  };
}

function assertBundleSources(paths) {
  if (!fs.existsSync(paths.globalAgentsSource)) {
    throw new Error(`Missing source file: ${paths.globalAgentsSource}`);
  }
  if (!fs.existsSync(paths.skillsSourceRoot)) {
    throw new Error(`Missing skills folder: ${paths.skillsSourceRoot}`);
  }
  if (paths.supportPoliciesSourceRoot && !fs.existsSync(paths.supportPoliciesSourceRoot)) {
    throw new Error(`Missing support policies folder: ${paths.supportPoliciesSourceRoot}`);
  }
}

function collectSourceSkills(skillsSourceRoot) {
  const results = [];

  function walk(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    entries.forEach((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        return;
      }

      if (!entry.isFile() || entry.name !== "SKILL.md") {
        return;
      }

      const skillDir = path.dirname(fullPath);
      results.push({
        name: path.basename(skillDir),
        sourceDir: skillDir,
        relativeDir: path.relative(skillsSourceRoot, skillDir)
      });
    });
  }

  walk(skillsSourceRoot);

  const dedup = new Map();
  results
    .sort((left, right) => left.relativeDir.localeCompare(right.relativeDir))
    .forEach((skill) => {
      if (dedup.has(skill.name)) {
        throw new Error(
          `Duplicate skill name '${skill.name}' in source tree: ${dedup.get(skill.name).relativeDir} and ${skill.relativeDir}`
        );
      }
      dedup.set(skill.name, skill);
    });

  return [...dedup.values()].sort((left, right) => left.name.localeCompare(right.name));
}

function validateInstallScope(scope) {
  if (!VALID_INSTALL_SCOPES.includes(scope)) {
    throw new Error(`Invalid scope '${scope}'. Allowed values: ${VALID_INSTALL_SCOPES.join(", ")}`);
  }
}

function resolveInputPath(primaryPath, legacyPath) {
  if (primaryPath && fs.existsSync(primaryPath)) {
    return primaryPath;
  }

  if (legacyPath && fs.existsSync(legacyPath)) {
    return legacyPath;
  }

  return "";
}

function removeFileIfExists(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    return;
  }

  fs.rmSync(filePath, { force: true });
}

function readManagedSkillsManifest({ managedSkillsManifestPath, legacyManagedSkillsManifestPath }) {
  const manifestPath = resolveInputPath(managedSkillsManifestPath, legacyManagedSkillsManifestPath);
  if (!manifestPath) {
    return [];
  }

  return readUtf8(manifestPath)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function writeManagedSkillsManifest(bundlePaths, managedSkills) {
  ensureDirectory(path.dirname(bundlePaths.managedSkillsManifestPath));
  fs.writeFileSync(bundlePaths.managedSkillsManifestPath, `${managedSkills.join("\n")}\n`, "utf8");

  if (bundlePaths.legacyManagedSkillsManifestPath !== bundlePaths.managedSkillsManifestPath) {
    removeFileIfExists(bundlePaths.legacyManagedSkillsManifestPath);
  }
}

function getDefaultInstallState({ manifest, repoRoot, codexHome }) {
  const bundleName = getManifestBundleName(manifest);

  return {
    bundle_name: bundleName,
    installed_bundle_version: "",
    repo_root: repoRoot,
    codex_home: codexHome,
    install_scope: "",
    managed_skills: [],
    global_policy: {
      enabled: false,
      agents_path: ""
    },
    project_targets: [],
    installed_at: "",
    updated_at: ""
  };
}

function normalizeProjectTargets(targetsInput) {
  const map = new Map();

  (Array.isArray(targetsInput) ? targetsInput : []).forEach((target) => {
    if (!target || typeof target !== "object" || Array.isArray(target)) {
      return;
    }

    const projectRoot = String(target.project_root || "").trim();
    const agentsPath = String(target.agents_path || "").trim();
    if (!projectRoot) {
      return;
    }

    map.set(projectRoot, {
      project_root: projectRoot,
      agents_path: agentsPath
    });
  });

  return [...map.values()].sort((left, right) => left.project_root.localeCompare(right.project_root));
}

function normalizeInstallState(stateInput, context) {
  const defaults = getDefaultInstallState(context);
  const bundleName = String(stateInput.bundle_name || stateInput.pack_name || defaults.bundle_name).trim();
  const installedBundleVersion = String(
    stateInput.installed_bundle_version || stateInput.installed_pack_version || defaults.installed_bundle_version
  ).trim();

  return {
    bundle_name: bundleName,
    installed_bundle_version: installedBundleVersion,
    repo_root: String(stateInput.repo_root || defaults.repo_root).trim(),
    codex_home: String(stateInput.codex_home || defaults.codex_home).trim(),
    install_scope: String(stateInput.install_scope || defaults.install_scope).trim(),
    managed_skills: unique(normalizeArray(stateInput.managed_skills || defaults.managed_skills)).sort((a, b) =>
      a.localeCompare(b)
    ),
    global_policy: {
      enabled:
        typeof stateInput?.global_policy?.enabled === "boolean"
          ? stateInput.global_policy.enabled
          : defaults.global_policy.enabled,
      agents_path: String(stateInput?.global_policy?.agents_path || defaults.global_policy.agents_path).trim()
    },
    project_targets: normalizeProjectTargets(stateInput.project_targets || defaults.project_targets),
    installed_at: String(stateInput.installed_at || defaults.installed_at).trim(),
    updated_at: String(stateInput.updated_at || defaults.updated_at).trim()
  };
}

function loadInstallState({ manifest, repoRoot, codexHome, installStatePath, legacyInstallStatePath }) {
  const statePath = resolveInputPath(installStatePath, legacyInstallStatePath);
  if (!statePath) {
    return normalizeInstallState({}, { manifest, repoRoot, codexHome });
  }

  const rawState = JSON.parse(readUtf8(statePath));
  return normalizeInstallState(rawState, { manifest, repoRoot, codexHome });
}

function writeInstallState(bundlePaths, stateInput, context) {
  const normalizedState = normalizeInstallState(stateInput, context);
  ensureDirectory(path.dirname(bundlePaths.installStatePath));
  fs.writeFileSync(bundlePaths.installStatePath, `${JSON.stringify(normalizedState, null, 2)}\n`, "utf8");

  if (bundlePaths.legacyInstallStatePath !== bundlePaths.installStatePath) {
    removeFileIfExists(bundlePaths.legacyInstallStatePath);
  }

  return normalizedState;
}

function selectSkills({ availableSkills, requestedSkills, excludedSkills, currentManagedSkills, mode }) {
  const availableByName = new Map(availableSkills.map((skill) => [skill.name, skill]));
  const availableNames = [...availableByName.keys()].sort((a, b) => a.localeCompare(b));
  const requested = unique(normalizeArray(requestedSkills));
  const excluded = new Set(unique(normalizeArray(excludedSkills)));
  let selectedNames;

  switch (mode) {
    case "all":
      selectedNames = availableNames;
      break;
    case "requested":
      if (requested.length === 0) {
        throw new Error("This command requires at least one '--skill <name>'.");
      }
      selectedNames = requested;
      break;
    case "merge-requested":
      if (requested.length === 0) {
        throw new Error("This command requires at least one '--skill <name>'.");
      }
      selectedNames = unique([...normalizeArray(currentManagedSkills), ...requested]);
      break;
    case "remove-requested":
      if (requested.length === 0) {
        throw new Error("This command requires at least one '--skill <name>'.");
      }
      selectedNames = normalizeArray(currentManagedSkills).filter((skillName) => !requested.includes(skillName));
      break;
    case "current-or-all":
      selectedNames =
        normalizeArray(currentManagedSkills).length > 0 ? normalizeArray(currentManagedSkills) : [...availableNames];
      if (requested.length > 0) {
        selectedNames = requested;
      }
      break;
    default:
      throw new Error(`Unsupported skill selection mode '${mode}'.`);
  }

  const invalidNames = selectedNames.filter((skillName) => !availableByName.has(skillName));
  if (invalidNames.length > 0) {
    throw new Error(`Unknown skill(s): ${invalidNames.join(", ")}`);
  }

  const finalNames = selectedNames.filter((skillName) => !excluded.has(skillName));
  const finalInvalidExcludes = [...excluded].filter((skillName) => !availableByName.has(skillName));
  if (finalInvalidExcludes.length > 0) {
    throw new Error(`Unknown skill(s) in '--exclude-skill': ${finalInvalidExcludes.join(", ")}`);
  }

  return unique(finalNames).sort((left, right) => left.localeCompare(right));
}

function syncSkills({ selectedSkillNames, availableSkills, skillsHome, previousManagedSkills }) {
  ensureDirectory(skillsHome);
  const availableByName = new Map(availableSkills.map((skill) => [skill.name, skill]));
  const installed = [];
  const removed = [];

  selectedSkillNames.forEach((skillName) => {
    const skill = availableByName.get(skillName);
    const skillDest = path.join(skillsHome, skillName);
    fs.rmSync(skillDest, { recursive: true, force: true });
    fs.cpSync(skill.sourceDir, skillDest, { recursive: true });
    installed.push(skillDest);
  });

  previousManagedSkills.forEach((skillName) => {
    if (selectedSkillNames.includes(skillName)) {
      return;
    }

    const staleSkillDest = path.join(skillsHome, skillName);
    if (!fs.existsSync(staleSkillDest)) {
      return;
    }

    fs.rmSync(staleSkillDest, { recursive: true, force: true });
    removed.push(staleSkillDest);
  });

  return {
    installed,
    removed
  };
}

function syncGlobalPolicy({ globalAgentsSource, globalAgentsDest }) {
  ensureDirectory(path.dirname(globalAgentsDest));
  fs.copyFileSync(globalAgentsSource, globalAgentsDest);
  return globalAgentsDest;
}

function syncProjectPolicy({ globalAgentsSource, projectRoot, projectAgentsFileName }) {
  const resolvedProjectRoot = path.resolve(projectRoot);
  ensureDirectory(resolvedProjectRoot);
  const destinationPath = path.join(resolvedProjectRoot, projectAgentsFileName);
  fs.copyFileSync(globalAgentsSource, destinationPath);

  return {
    project_root: resolvedProjectRoot,
    agents_path: destinationPath
  };
}

function copyTreeContents(sourceRoot, destinationRoot, excludedFileNames) {
  const entries = fs.readdirSync(sourceRoot, { withFileTypes: true });

  entries.forEach((entry) => {
    const sourcePath = path.join(sourceRoot, entry.name);
    const destinationPath = path.join(destinationRoot, entry.name);

    if (entry.isFile() && excludedFileNames.has(entry.name)) {
      return;
    }

    if (entry.isDirectory()) {
      ensureDirectory(destinationPath);
      copyTreeContents(sourcePath, destinationPath, excludedFileNames);
      return;
    }

    if (entry.isFile()) {
      ensureDirectory(path.dirname(destinationPath));
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

function syncSupportPolicies({ supportPoliciesSourceRoot, supportPoliciesDestRoot, excludedFileNames = [] }) {
  if (!supportPoliciesSourceRoot || !supportPoliciesDestRoot) {
    return "";
  }

  ensureDirectory(supportPoliciesDestRoot);
  copyTreeContents(supportPoliciesSourceRoot, supportPoliciesDestRoot, new Set(normalizeArray(excludedFileNames)));
  return supportPoliciesDestRoot;
}

function mergeProjectTargets(existingTargets, newTargets) {
  return normalizeProjectTargets([...(existingTargets || []), ...(newTargets || [])]);
}

function getInstalledSkillDirs(skillsHome) {
  if (!fs.existsSync(skillsHome)) {
    return [];
  }

  return fs
    .readdirSync(skillsHome, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

module.exports = {
  BUNDLE_MANIFEST_FILE,
  LEGACY_BUNDLE_MANIFEST_FILE,
  DEFAULT_INSTALL_STATE_FILE,
  DEFAULT_MANAGED_SKILLS_MANIFEST_FILE,
  LEGACY_INSTALL_STATE_FILE,
  LEGACY_MANAGED_SKILLS_MANIFEST_FILE,
  VALID_INSTALL_SCOPES,
  assertBundleSources,
  collectSourceSkills,
  getBundlePaths,
  getDefaultInstallState,
  getInstalledSkillDirs,
  getManifestBundleName,
  getManifestBundleVersion,
  loadBundleManifest,
  loadInstallState,
  mergeProjectTargets,
  normalizeArray,
  normalizeInstallState,
  normalizeProjectTargets,
  normalizeSingleValue,
  readManagedSkillsManifest,
  resolveCodexHome,
  resolveRepoRoot,
  selectSkills,
  syncGlobalPolicy,
  syncProjectPolicy,
  syncSupportPolicies,
  syncSkills,
  unique,
  validateInstallScope,
  writeInstallState,
  writeManagedSkillsManifest
};
