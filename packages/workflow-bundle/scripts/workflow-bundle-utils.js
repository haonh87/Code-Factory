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
const VALID_RUNTIME_MODES = ["codex", "claude"];

function getManifestBundleName(manifest) {
  return String((manifest && (manifest.bundleName || manifest.packName)) || "").trim();
}

function getManifestBundleVersion(manifest) {
  return String((manifest && (manifest.bundleVersion || manifest.packVersion)) || "").trim();
}

function validateRuntimeMode(mode) {
  if (!VALID_RUNTIME_MODES.includes(mode)) {
    throw new Error(`Invalid mode '${mode}'. Allowed values: ${VALID_RUNTIME_MODES.join(", ")}`);
  }
}

function resolveRuntimeMode(explicitMode) {
  const mode = String(explicitMode || "codex").trim().toLowerCase();
  validateRuntimeMode(mode);
  return mode;
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

function getRuntimeConfig(manifest, mode) {
  const runtimeConfig = manifest?.[mode];
  if (!runtimeConfig || typeof runtimeConfig !== "object" || Array.isArray(runtimeConfig)) {
    throw new Error(`Workflow bundle manifest is missing runtime config '${mode}'.`);
  }

  return runtimeConfig;
}

function getDefaultRuntimeHome(mode) {
  if (mode === "claude") {
    return path.join(require("os").homedir(), ".claude");
  }

  return path.join(require("os").homedir(), ".codex");
}

function resolveRuntimeHome({ mode, explicitRuntimeHome, explicitCodexHome, explicitClaudeHome }) {
  if (explicitRuntimeHome) {
    return path.resolve(explicitRuntimeHome);
  }

  if (mode === "claude") {
    return path.resolve(explicitClaudeHome || process.env.CLAUDE_HOME || getDefaultRuntimeHome("claude"));
  }

  return path.resolve(explicitCodexHome || process.env.CODEX_HOME || getDefaultRuntimeHome("codex"));
}

function resolveCodexHome(explicitCodexHome) {
  return resolveRuntimeHome({ mode: "codex", explicitCodexHome });
}

function getConfiguredBundleFileNames(runtimeConfig) {
  const configuredManagedSkillsManifestFile = String(runtimeConfig.managedSkillsManifestFile || "").trim();
  const configuredInstallStateFile = String(runtimeConfig.installStateFile || "").trim();

  const managedSkillsManifestFile =
    configuredManagedSkillsManifestFile &&
    configuredManagedSkillsManifestFile !== LEGACY_MANAGED_SKILLS_MANIFEST_FILE
      ? configuredManagedSkillsManifestFile
      : DEFAULT_MANAGED_SKILLS_MANIFEST_FILE;

  const legacyManagedSkillsManifestFile = String(
    runtimeConfig.legacyManagedSkillsManifestFile ||
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
    runtimeConfig.legacyInstallStateFile ||
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

function getBundlePaths({ repoRoot, runtimeHome, manifest, mode }) {
  const runtimeConfig = getRuntimeConfig(manifest, mode);
  const bundleFileNames = getConfiguredBundleFileNames(runtimeConfig);
  const globalAgentsSource = path.join(repoRoot, runtimeConfig.globalAgentsSource);
  const skillsSourceRoot = path.join(repoRoot, runtimeConfig.skillsSourceRoot);
  const supportPoliciesSourceRoot = runtimeConfig.supportPoliciesSourceRoot
    ? path.join(repoRoot, runtimeConfig.supportPoliciesSourceRoot)
    : "";

  return {
    mode,
    runtimeHome,
    globalAgentsSource,
    skillsSourceRoot,
    supportPoliciesSourceRoot,
    globalAgentsFileName: runtimeConfig.globalAgentsFileName,
    globalAgentsDest: path.join(runtimeHome, runtimeConfig.globalAgentsFileName),
    skillsHome: path.join(runtimeHome, "skills"),
    supportPoliciesHome: runtimeConfig.supportPoliciesTargetRoot
      ? path.join(runtimeHome, runtimeConfig.supportPoliciesTargetRoot)
      : "",
    managedSkillsManifestPath: path.join(runtimeHome, bundleFileNames.managedSkillsManifestFile),
    legacyManagedSkillsManifestPath: path.join(runtimeHome, bundleFileNames.legacyManagedSkillsManifestFile),
    installStatePath: path.join(runtimeHome, bundleFileNames.installStateFile),
    legacyInstallStatePath: path.join(runtimeHome, bundleFileNames.legacyInstallStateFile),
    projectAgentsFileName: runtimeConfig.projectAgentsFileName
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

function getDefaultInstallState({ manifest, repoRoot, runtimeHome, mode }) {
  const bundleName = getManifestBundleName(manifest);

  return {
    bundle_name: bundleName,
    installed_bundle_version: "",
    repo_root: repoRoot,
    runtime_mode: mode,
    runtime_home: runtimeHome,
    codex_home: mode === "codex" ? runtimeHome : "",
    claude_home: mode === "claude" ? runtimeHome : "",
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
  const runtimeMode = resolveRuntimeMode(stateInput.runtime_mode || defaults.runtime_mode);
  const runtimeHome = String(
    stateInput.runtime_home ||
      (runtimeMode === "claude" ? stateInput.claude_home : stateInput.codex_home) ||
      defaults.runtime_home
  ).trim();

  return {
    bundle_name: bundleName,
    installed_bundle_version: installedBundleVersion,
    repo_root: String(stateInput.repo_root || defaults.repo_root).trim(),
    runtime_mode: runtimeMode,
    runtime_home: runtimeHome,
    codex_home: runtimeMode === "codex" ? runtimeHome : String(stateInput.codex_home || "").trim(),
    claude_home: runtimeMode === "claude" ? runtimeHome : String(stateInput.claude_home || "").trim(),
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

function loadInstallState({ manifest, repoRoot, runtimeHome, mode, installStatePath, legacyInstallStatePath }) {
  const statePath = resolveInputPath(installStatePath, legacyInstallStatePath);
  if (!statePath) {
    return normalizeInstallState({}, { manifest, repoRoot, runtimeHome, mode });
  }

  const rawState = JSON.parse(readUtf8(statePath));
  return normalizeInstallState(rawState, { manifest, repoRoot, runtimeHome, mode });
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
  VALID_RUNTIME_MODES,
  assertBundleSources,
  collectSourceSkills,
  getConfiguredBundleFileNames,
  getBundlePaths,
  getDefaultInstallState,
  getDefaultRuntimeHome,
  getInstalledSkillDirs,
  getManifestBundleName,
  getManifestBundleVersion,
  getRuntimeConfig,
  loadBundleManifest,
  loadInstallState,
  mergeProjectTargets,
  normalizeArray,
  normalizeInstallState,
  normalizeProjectTargets,
  normalizeSingleValue,
  readManagedSkillsManifest,
  resolveCodexHome,
  resolveRuntimeHome,
  resolveRuntimeMode,
  resolveRepoRoot,
  selectSkills,
  syncGlobalPolicy,
  syncProjectPolicy,
  syncSupportPolicies,
  syncSkills,
  unique,
  validateInstallScope,
  validateRuntimeMode,
  writeInstallState,
  writeManagedSkillsManifest
};
