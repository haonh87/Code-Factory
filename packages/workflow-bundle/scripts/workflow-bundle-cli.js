const fs = require("fs");
const path = require("path");
const readline = require("readline/promises");
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
  resolveRuntimeHome,
  resolveRuntimeMode,
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
const INSTALL_MODE_OPTIONS = ["codex", "claude"];
const INSTALL_SCOPE_OPTIONS = ["global", "project", "both"];

function getNowIso() {
  return new Date().toISOString();
}

function isHelpToken(value) {
  return value === "help" || value === "--help" || value === "-h";
}

async function promptForChoice({ label, options }) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    console.log(`${label}:`);
    options.forEach((option, index) => {
      console.log(`  ${index + 1}. ${option}`);
    });

    while (true) {
      const answer = String(await rl.question(`Choose [1-${options.length}]: `)).trim();
      const numeric = Number.parseInt(answer, 10);
      if (Number.isInteger(numeric) && numeric >= 1 && numeric <= options.length) {
        return options[numeric - 1];
      }

      console.log("Invalid selection. Enter the number of one option above.");
    }
  } finally {
    rl.close();
  }
}

async function promptForInput({ label, defaultValue = "" }) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const promptLabel = defaultValue ? `${label} [${defaultValue}]: ` : `${label}: `;
    while (true) {
      const answer = String(await rl.question(promptLabel)).trim();
      if (answer) {
        return answer;
      }
      if (defaultValue) {
        return defaultValue;
      }
      console.log("Input is required.");
    }
  } finally {
    rl.close();
  }
}

function assertInteractivePromptAvailable(actionLabel, missingFieldLabels) {
  if (process.stdin.isTTY && process.stdout.isTTY) {
    return;
  }

  throw new Error(
    `${actionLabel} requires ${missingFieldLabels.join(" and ")} when not running in an interactive terminal.`
  );
}

async function prepareInteractiveInstallArgs(args) {
  const nextArgs = { ...args };
  const missingFields = [];

  if (!normalizeSingleValue(nextArgs.mode || "")) {
    missingFields.push("'--mode <codex|claude>'");
  }
  if (!normalizeSingleValue(nextArgs.scope || "")) {
    missingFields.push("'--scope <global|project|both>'");
  }

  if (missingFields.length > 0) {
    assertInteractivePromptAvailable("install", missingFields);
  }

  if (!normalizeSingleValue(nextArgs.mode || "")) {
    nextArgs.mode = await promptForChoice({
      label: "Select runtime mode",
      options: INSTALL_MODE_OPTIONS
    });
  }

  if (!normalizeSingleValue(nextArgs.scope || "")) {
    nextArgs.scope = await promptForChoice({
      label: "Select install scope",
      options: INSTALL_SCOPE_OPTIONS
    });
  }

  const scopeValue = normalizeSingleValue(nextArgs.scope || "");
  const projectRoots = normalizeArray(nextArgs["project-root"]);
  if ((scopeValue === "project" || scopeValue === "both") && projectRoots.length === 0) {
    assertInteractivePromptAvailable("install", ["'--project-root <path>'"]);
    nextArgs["project-root"] = await promptForInput({
      label: "Project root",
      defaultValue: process.cwd()
    });
  }

  return nextArgs;
}

async function prepareInteractiveModeArgs(args, actionLabel) {
  const nextArgs = { ...args };
  if (normalizeSingleValue(nextArgs.mode || "")) {
    return nextArgs;
  }

  assertInteractivePromptAvailable(actionLabel, ["'--mode <codex|claude>'"]);
  nextArgs.mode = await promptForChoice({
    label: `Select runtime mode for ${actionLabel}`,
    options: INSTALL_MODE_OPTIONS
  });
  return nextArgs;
}

function getRuntimeContext(args) {
  const repoRoot = resolveRepoRoot(normalizeSingleValue(args["repo-root"] || ""));
  const { manifest } = loadBundleManifest(repoRoot);
  const mode = resolveRuntimeMode(normalizeSingleValue(args.mode || ""));
  const runtimeHome = resolveRuntimeHome({
    mode,
    explicitRuntimeHome: normalizeSingleValue(args["runtime-home"] || ""),
    explicitCodexHome: normalizeSingleValue(args["codex-home"] || ""),
    explicitClaudeHome: normalizeSingleValue(args["claude-home"] || "")
  });
  const bundlePaths = getBundlePaths({ repoRoot, runtimeHome, manifest, mode });

  assertBundleSources(bundlePaths);

  return {
    repoRoot,
    manifest,
    mode,
    runtimeHome,
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
      "  wfc install [--mode codex|claude] [--scope global|project|both] [--project-root PATH] [--skill NAME] [--exclude-skill NAME]",
      "  wfc update [--mode codex|claude] [--scope global|project|both] [--project-root PATH] [--skill NAME] [--exclude-skill NAME]",
      "  wfc status [--mode codex|claude] [--json]",
      "  wfc skills list [--mode codex|claude] [--json]",
      "  wfc skills add [--mode codex|claude] --skill NAME [--skill NAME]",
      "  wfc skills remove [--mode codex|claude] --skill NAME [--skill NAME]",
      "",
      "Options:",
      "  --repo-root PATH    Path to the workflow bundle source repo.",
      "  --mode VALUE        Runtime mode: codex, claude. Install/update/status prompt when omitted in TTY.",
      "  --runtime-home PATH Override runtime home directly.",
      "  --codex-home PATH   Override Codex home. Default: $CODEX_HOME or ~/.codex",
      "  --claude-home PATH  Override Claude home. Default: $CLAUDE_HOME or ~/.claude",
      "  --scope VALUE       Install scope: global, project, both. Install prompts when omitted in TTY.",
      "  --project-root PATH Install AGENTS.md or CLAUDE.md into a target project root. Repeatable.",
      "  --skill NAME        Select or add a skill by runtime flat name. Repeatable.",
      "  --exclude-skill     Exclude a skill during install/update. Repeatable.",
      "  --json              Print JSON output after the summary.",
      "",
      "Notes:",
      "  - 'wfc status' shows both source_bundle_version and installed_bundle_version.",
      "  - 'wfc update' overwrites the current installed bundle using the recorded install state.",
      "  - 'wfc install' shows numbered choices for mode and scope when they are omitted in an interactive terminal.",
      "  - 'wfc update', 'wfc status' and 'wfc skills ...' show a numbered choice for mode when '--mode' is omitted in an interactive terminal.",
      "  - Claude mode installs workflow memory/policy files plus managed skill references under ~/.claude/skills."
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
    runtime_mode: context.mode,
    repo_root: context.repoRoot,
    runtime_home: context.runtimeHome,
    codex_home: context.mode === "codex" ? context.runtimeHome : "",
    claude_home: context.mode === "claude" ? context.runtimeHome : "",
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
    `mode=${context.mode}`,
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
  console.log(`runtime_mode=${payload.runtime_mode}`);
  console.log(`runtime_home=${payload.runtime_home}`);
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
    runtimeHome: context.runtimeHome,
    mode: context.mode,
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
      runtime_mode: context.mode,
      runtime_home: context.runtimeHome,
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
      runtimeHome: context.runtimeHome,
      mode: context.mode
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
    `mode=${result.context.mode}`,
    `bundle_version=${bundleVersion}`,
    `managed_skills=${result.state.managed_skills.length}`,
    `project_targets=${result.state.project_targets.length}`
  ].join(" | ");

  const payload = {
    bundle_name: bundleName,
    bundle_version: bundleVersion,
    runtime_mode: result.context.mode,
    runtime_home: result.context.runtimeHome,
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
  console.log(`runtime=${payload.runtime_mode} home=${payload.runtime_home}`);
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
    runtimeHome: context.runtimeHome,
    mode: context.mode,
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
      runtime_mode: context.mode,
      runtime_home: context.runtimeHome,
      managed_skills: nextManagedSkills,
      updated_at: getNowIso()
    },
    {
      manifest: context.manifest,
      repoRoot: context.repoRoot,
      runtimeHome: context.runtimeHome,
      mode: context.mode
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

async function runCli() {
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

  let args = parseCliArgs(process.argv.slice(3));
  const jsonOutput = Boolean(args.json);
  if (args.help) {
    printHelp();
    return;
  }

  try {
    switch (action) {
      case "status": {
        args = await prepareInteractiveModeArgs(args, "status");
        const context = getRuntimeContext(args);
        const state = loadInstallState({
          manifest: context.manifest,
          repoRoot: context.repoRoot,
          runtimeHome: context.runtimeHome,
          mode: context.mode,
          installStatePath: context.bundlePaths.installStatePath,
          legacyInstallStatePath: context.bundlePaths.legacyInstallStatePath
        });
        printStatusSummary(context, state, jsonOutput);
        return;
      }
      case "install": {
        args = await prepareInteractiveInstallArgs(args);
        const result = applyInstallOrUpdate({ args, action: "install" });
        printInstallOrUpdateResult("installed", result, jsonOutput);
        return;
      }
      case "update": {
        args = await prepareInteractiveModeArgs(args, "update");
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
        const preparedSkillArgs = await prepareInteractiveModeArgs(skillArgs, `skills ${skillAction}`);
        const result = applySkillsAction({
          args: preparedSkillArgs,
          action: skillAction
        });
        printSkillsResult(result, Boolean(preparedSkillArgs.json));
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
  runCli().catch((error) => {
    const message = error.message.startsWith("ERROR:") ? error.message : formatErrors([error.message]);
    console.error(message);
    process.exit(1);
  });
}

module.exports = {
  applyInstallOrUpdate,
  applySkillsAction,
  prepareInteractiveInstallArgs,
  prepareInteractiveModeArgs,
  runCli
};
