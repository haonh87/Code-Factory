const fs = require("fs");
const path = require("path");
const { formatErrors, parseCliArgs } = require("./workflow-validator-utils");
const {
  assertBundleSources,
  collectSourceSkills,
  getBundlePaths,
  getManifestBundleName,
  getManifestBundleVersion,
  getInstalledSkillDirs,
  loadInstallState,
  loadBundleManifest,
  mergeProjectTargets,
  normalizeArray,
  normalizeSingleValue,
  readManagedSkillsManifest,
  resolveCodexHome,
  resolveRepoRoot,
  selectSkills,
  syncGlobalPolicy,
  syncProjectPolicy,
  syncSupportPolicies,
  syncSkills,
  validateInstallScope,
  writeInstallState,
  writeManagedSkillsManifest
} = require("./workflow-bundle-utils");

const SUPPORTED_ACTIONS = new Set(["help", "status", "install", "update", "skills"]);
const SUPPORTED_SKILL_ACTIONS = new Set(["list", "install", "add", "remove", "delete"]);

function getNowIso() {
  return new Date().toISOString();
}

function isHelpToken(value) {
  return value === "help" || value === "--help" || value === "-h";
}

function getRuntimeContext(args) {
  const repoRoot = resolveRepoRoot(normalizeSingleValue(args["repo-root"] || ""));
  const { manifest } = loadBundleManifest(repoRoot);
  const codexHome = resolveCodexHome(normalizeSingleValue(args["codex-home"] || ""));
  const bundlePaths = getBundlePaths({ repoRoot, codexHome, manifest });

  assertBundleSources(bundlePaths);

  return {
    repoRoot,
    manifest,
    codexHome,
    bundlePaths,
    availableSkills: collectSourceSkills(bundlePaths.skillsSourceRoot)
  };
}

function printHelp() {
  console.log(
    [
      "Workflow Bundle CLI",
      "",
      "Usage:",
      "  wfc install [--scope global|project|both] [--project-root PATH] [--skill NAME] [--exclude-skill NAME]",
      "  wfc update [--scope global|project|both] [--project-root PATH] [--skill NAME] [--exclude-skill NAME]",
      "  wfc status [--json]",
      "  wfc skills list [--json]",
      "  wfc skills add --skill NAME [--skill NAME]",
      "  wfc skills remove --skill NAME [--skill NAME]",
      "",
      "Options:",
      "  --repo-root PATH    Path to the workflow bundle source repo.",
      "  --codex-home PATH   Override Codex home. Default: $CODEX_HOME or ~/.codex",
      "  --scope VALUE       Install scope: global, project, both. Default install=global.",
      "  --project-root PATH Install AGENTS.md into a target project root. Repeatable.",
      "  --skill NAME        Select or add a skill by runtime flat name. Repeatable.",
      "  --exclude-skill     Exclude a skill during install/update. Repeatable.",
      "  --json              Print JSON output after the summary.",
      "",
      "Notes:",
      "  - 'wfc status' shows both source_bundle_version and installed_bundle_version.",
      "  - 'wfc update' overwrites the current installed bundle using the recorded install state."
    ].join("\n")
  );
}

function mergeInstallScope(currentScope, nextScope) {
  if (!currentScope) {
    return nextScope;
  }
  if (currentScope === nextScope) {
    return currentScope;
  }
  if (currentScope === "both" || nextScope === "both") {
    return "both";
  }
  return "both";
}

function printJson(summary, payload) {
  console.log(summary);
  console.log(JSON.stringify(payload, null, 2));
}

function printStatusSummary(context, installState, jsonOutput) {
  const bundleName = getManifestBundleName(context.manifest);
  const bundleVersion = getManifestBundleVersion(context.manifest);
  const payload = {
    bundle_name: bundleName,
    source_bundle_version: bundleVersion,
    installed_bundle_version: installState.installed_bundle_version,
    repo_root: context.repoRoot,
    codex_home: context.codexHome,
    install_scope: installState.install_scope,
    global_policy_enabled: installState.global_policy.enabled,
    global_agents_path: installState.global_policy.agents_path,
    support_policies_path:
      context.bundlePaths.supportPoliciesHome && fs.existsSync(context.bundlePaths.supportPoliciesHome)
        ? context.bundlePaths.supportPoliciesHome
        : "",
    managed_skills: installState.managed_skills,
    installed_skill_dirs: getInstalledSkillDirs(context.bundlePaths.skillsHome),
    project_targets: installState.project_targets,
    updated_at: installState.updated_at
  };

  const summary = [
    `OK: workflow bundle '${bundleName}'`,
    `source_version=${bundleVersion}`,
    `installed_version=${installState.installed_bundle_version || "<none>"}`,
    `managed_skills=${installState.managed_skills.length}`,
    `project_targets=${installState.project_targets.length}`
  ].join(" | ");

  if (jsonOutput) {
    printJson(summary, payload);
    return;
  }

  console.log(summary);
  console.log(`repo_root=${payload.repo_root}`);
  console.log(`codex_home=${payload.codex_home}`);
  console.log(`install_scope=${payload.install_scope}`);
  console.log(`global_policy_enabled=${payload.global_policy_enabled ? "true" : "false"}`);
  console.log(`global_agents_path=${payload.global_agents_path || "<none>"}`);
  console.log(`support_policies_path=${payload.support_policies_path || "<none>"}`);
  console.log(`managed_skills=${payload.managed_skills.join(", ") || "<none>"}`);
  console.log(`project_targets=${payload.project_targets.length}`);
  payload.project_targets.forEach((target) => {
    console.log(`- ${target.project_root}`);
  });
}

function applyInstallOrUpdate({ args, action }) {
  const context = getRuntimeContext(args);
  const currentState = loadInstallState({
    manifest: context.manifest,
    repoRoot: context.repoRoot,
    codexHome: context.codexHome,
    installStatePath: context.bundlePaths.installStatePath,
    legacyInstallStatePath: context.bundlePaths.legacyInstallStatePath
  });
  const requestedProjectRoots = normalizeArray(args["project-root"]).map((item) => path.resolve(item));
  const scopeValue =
    normalizeSingleValue(args.scope || "") ||
    (action === "update" ? currentState.install_scope || "global" : "global");
  validateInstallScope(scopeValue);

  if ((scopeValue === "project" || scopeValue === "both") && requestedProjectRoots.length === 0 && action === "install") {
    throw new Error("install with scope=project|both requires at least one '--project-root <path>'.");
  }

  const projectRootsForAction =
    action === "update"
      ? [
          ...currentState.project_targets.map((target) => target.project_root),
          ...requestedProjectRoots
        ]
      : requestedProjectRoots;

  const selectedSkillNames = selectSkills({
    availableSkills: context.availableSkills,
    requestedSkills: args.skill,
    excludedSkills: args["exclude-skill"],
    currentManagedSkills: currentState.managed_skills,
    mode:
      action === "install"
        ? normalizeArray(args.skill).length > 0
          ? "requested"
          : "all"
        : "current-or-all"
  });

  const previousManagedSkills = [
    ...readManagedSkillsManifest({
      managedSkillsManifestPath: context.bundlePaths.managedSkillsManifestPath,
      legacyManagedSkillsManifestPath: context.bundlePaths.legacyManagedSkillsManifestPath
    }),
    ...currentState.managed_skills
  ];
  const skillSyncResult = syncSkills({
    selectedSkillNames,
    availableSkills: context.availableSkills,
    skillsHome: context.bundlePaths.skillsHome,
    previousManagedSkills
  });
  writeManagedSkillsManifest(context.bundlePaths, selectedSkillNames);
  const supportPoliciesPath = syncSupportPolicies({
    supportPoliciesSourceRoot: context.bundlePaths.supportPoliciesSourceRoot,
    supportPoliciesDestRoot: context.bundlePaths.supportPoliciesHome,
    excludedFileNames: [context.bundlePaths.globalAgentsFileName]
  });

  let globalAgentsPath = currentState.global_policy.agents_path;
  const installGlobalPolicy = scopeValue === "global" || scopeValue === "both";
  if (installGlobalPolicy) {
    globalAgentsPath = syncGlobalPolicy({
      globalAgentsSource: context.bundlePaths.globalAgentsSource,
      globalAgentsDest: context.bundlePaths.globalAgentsDest
    });
  }

  const syncedProjectTargets =
    scopeValue === "project" || scopeValue === "both"
      ? projectRootsForAction.map((projectRoot) =>
          syncProjectPolicy({
            globalAgentsSource: context.bundlePaths.globalAgentsSource,
            projectRoot,
            projectAgentsFileName: context.bundlePaths.projectAgentsFileName
          })
        )
      : [];

  const timestamp = getNowIso();
  const nextState = writeInstallState(
    context.bundlePaths,
    {
      ...currentState,
      bundle_name: getManifestBundleName(context.manifest),
      installed_bundle_version: getManifestBundleVersion(context.manifest),
      repo_root: context.repoRoot,
      codex_home: context.codexHome,
      install_scope: mergeInstallScope(currentState.install_scope, scopeValue),
      managed_skills: selectedSkillNames,
      global_policy: {
        enabled: installGlobalPolicy ? true : currentState.global_policy.enabled,
        agents_path: globalAgentsPath
      },
      project_targets: mergeProjectTargets(currentState.project_targets, syncedProjectTargets),
      installed_at: currentState.installed_at || timestamp,
      updated_at: timestamp
    },
    {
      manifest: context.manifest,
      repoRoot: context.repoRoot,
      codexHome: context.codexHome
    }
  );

  return {
    context,
    state: nextState,
    skillSyncResult,
    supportPoliciesPath,
    syncedProjectTargets
  };
}

function printInstallOrUpdateResult(action, result, jsonOutput) {
  const bundleName = getManifestBundleName(result.context.manifest);
  const bundleVersion = getManifestBundleVersion(result.context.manifest);
  const summary = [
    `OK: ${action} workflow bundle '${bundleName}'`,
    `bundle_version=${bundleVersion}`,
    `managed_skills=${result.state.managed_skills.length}`,
    `project_targets=${result.state.project_targets.length}`
  ].join(" | ");

  const payload = {
    bundle_name: bundleName,
    bundle_version: bundleVersion,
    codex_home: result.context.codexHome,
    install_scope: result.state.install_scope,
    global_policy: result.state.global_policy,
    support_policies_path: result.supportPoliciesPath,
    managed_skills: result.state.managed_skills,
    installed_skill_paths: result.skillSyncResult.installed,
    removed_skill_paths: result.skillSyncResult.removed,
    project_targets: result.state.project_targets,
    install_state_path: result.context.bundlePaths.installStatePath
  };

  if (jsonOutput) {
    printJson(summary, payload);
    return;
  }

  console.log(summary);
  console.log(`global_policy=${payload.global_policy.enabled ? payload.global_policy.agents_path : "<disabled>"}`);
  console.log(`support_policies=${payload.support_policies_path || "<none>"}`);
  console.log(`managed_skills=${payload.managed_skills.join(", ") || "<none>"}`);
  if (payload.project_targets.length > 0) {
    console.log(`project_targets=${payload.project_targets.length}`);
    payload.project_targets.forEach((target) => console.log(`- ${target.project_root}`));
  }
}

function applySkillsAction({ args, action }) {
  const context = getRuntimeContext(args);
  const currentState = loadInstallState({
    manifest: context.manifest,
    repoRoot: context.repoRoot,
    codexHome: context.codexHome,
    installStatePath: context.bundlePaths.installStatePath,
    legacyInstallStatePath: context.bundlePaths.legacyInstallStatePath
  });

  if (action === "list") {
    const installedSkillDirs = getInstalledSkillDirs(context.bundlePaths.skillsHome);
    const managedSkillSet = new Set(currentState.managed_skills);
    const availableSkills = context.availableSkills.map((skill) => ({
      name: skill.name,
      installed: installedSkillDirs.includes(skill.name),
      managed: managedSkillSet.has(skill.name),
      relative_dir: skill.relativeDir
    }));

    return {
      context,
      currentState,
      availableSkills,
      installedSkillDirs
    };
  }

  const selectionMode = action === "remove" || action === "delete" ? "remove-requested" : "merge-requested";
  const nextManagedSkills = selectSkills({
    availableSkills: context.availableSkills,
    requestedSkills: args.skill,
    excludedSkills: [],
    currentManagedSkills: currentState.managed_skills,
    mode: selectionMode
  });
  const previousManagedSkills = [
    ...readManagedSkillsManifest({
      managedSkillsManifestPath: context.bundlePaths.managedSkillsManifestPath,
      legacyManagedSkillsManifestPath: context.bundlePaths.legacyManagedSkillsManifestPath
    }),
    ...currentState.managed_skills
  ];
  const skillSyncResult = syncSkills({
    selectedSkillNames: nextManagedSkills,
    availableSkills: context.availableSkills,
    skillsHome: context.bundlePaths.skillsHome,
    previousManagedSkills
  });
  writeManagedSkillsManifest(context.bundlePaths, nextManagedSkills);

  const nextState = writeInstallState(
    context.bundlePaths,
    {
      ...currentState,
      bundle_name: getManifestBundleName(context.manifest),
      installed_bundle_version: currentState.installed_bundle_version || getManifestBundleVersion(context.manifest),
      repo_root: context.repoRoot,
      codex_home: context.codexHome,
      managed_skills: nextManagedSkills,
      updated_at: getNowIso()
    },
    {
      manifest: context.manifest,
      repoRoot: context.repoRoot,
      codexHome: context.codexHome
    }
  );

  return {
    context,
    currentState,
    nextState,
    skillSyncResult,
    action
  };
}

function printSkillsResult(result, jsonOutput) {
  if (Array.isArray(result.availableSkills)) {
    const summary = [
      `OK: listed ${result.availableSkills.length} source skills`,
      `installed_dirs=${result.installedSkillDirs.length}`,
      `managed_skills=${result.currentState.managed_skills.length}`
    ].join(" | ");

    if (jsonOutput) {
      printJson(summary, {
        source_skills: result.availableSkills,
        installed_skill_dirs: result.installedSkillDirs,
        managed_skills: result.currentState.managed_skills
      });
      return;
    }

    console.log(summary);
    result.availableSkills.forEach((skill) => {
      console.log(
        `- ${skill.name} | installed=${skill.installed ? "yes" : "no"} | managed=${skill.managed ? "yes" : "no"}`
      );
    });
    return;
  }

  const summary = [
    `OK: ${result.action} skill set`,
    `managed_skills=${result.nextState.managed_skills.length}`,
    `installed_paths=${result.skillSyncResult.installed.length}`,
    `removed_paths=${result.skillSyncResult.removed.length}`
  ].join(" | ");

  const payload = {
    managed_skills: result.nextState.managed_skills,
    installed_skill_paths: result.skillSyncResult.installed,
    removed_skill_paths: result.skillSyncResult.removed
  };

  if (jsonOutput) {
    printJson(summary, payload);
    return;
  }

  console.log(summary);
  console.log(`managed_skills=${result.nextState.managed_skills.join(", ") || "<none>"}`);
}

function runCli() {
  const action = normalizeSingleValue(process.argv[2] || "help");
  if (!SUPPORTED_ACTIONS.has(action)) {
    console.error(
      formatErrors([`Unknown workflow bundle action '${action}'. Use one of: ${[...SUPPORTED_ACTIONS].join(", ")}`])
    );
    process.exit(1);
  }

  if (action === "help") {
    printHelp();
    return;
  }

  const args = parseCliArgs(process.argv.slice(3));
  const jsonOutput = Boolean(args.json);
  if (args.help) {
    printHelp();
    return;
  }

  try {
    switch (action) {
      case "status": {
        const context = getRuntimeContext(args);
        const state = loadInstallState({
          manifest: context.manifest,
          repoRoot: context.repoRoot,
          codexHome: context.codexHome,
          installStatePath: context.bundlePaths.installStatePath,
          legacyInstallStatePath: context.bundlePaths.legacyInstallStatePath
        });
        printStatusSummary(context, state, jsonOutput);
        return;
      }
      case "install": {
        const result = applyInstallOrUpdate({ args, action: "install" });
        printInstallOrUpdateResult("installed", result, jsonOutput);
        return;
      }
      case "update": {
        const result = applyInstallOrUpdate({ args, action: "update" });
        printInstallOrUpdateResult("updated", result, jsonOutput);
        return;
      }
      case "skills": {
        const rawSkillAction = normalizeSingleValue(process.argv[3] || "list");
        if (isHelpToken(rawSkillAction)) {
          printHelp();
          return;
        }
        const skillAction = rawSkillAction;
        if (!SUPPORTED_SKILL_ACTIONS.has(skillAction)) {
          throw new Error(`Unknown skills action '${skillAction}'. Use one of: ${[...SUPPORTED_SKILL_ACTIONS].join(", ")}`);
        }
        const skillArgs = parseCliArgs(process.argv.slice(4));
        if (skillArgs.help) {
          printHelp();
          return;
        }
        const result = applySkillsAction({
          args: skillArgs,
          action: skillAction
        });
        printSkillsResult(result, Boolean(skillArgs.json));
        return;
      }
      default:
        throw new Error(`Unsupported action '${action}'.`);
    }
  } catch (error) {
    const message = error.message.startsWith("ERROR:") ? error.message : formatErrors([error.message]);
    console.error(message);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  applyInstallOrUpdate,
  applySkillsAction,
  runCli
};
