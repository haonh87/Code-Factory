const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

function assertPathExists(targetPath, message) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(message || `Expected path to exist: ${targetPath}`);
  }
}

function assertPathMissing(targetPath, message) {
  if (fs.existsSync(targetPath)) {
    throw new Error(message || `Expected path to be absent: ${targetPath}`);
  }
}

function assertContentIncludes(content, expected, message) {
  if (!content.includes(expected)) {
    throw new Error(message || `Expected content to include '${expected}'.`);
  }
}

function runNodeScriptCaptureOutput(scriptPath, args, cwd) {
  return execFileSync(process.execPath, [scriptPath, ...args], {
    cwd,
    stdio: "pipe",
    encoding: "utf8"
  });
}

function runNodeScriptExpectFailure(scriptPath, args, cwd, expectedMessage) {
  try {
    runNodeScriptCaptureOutput(scriptPath, args, cwd);
  } catch (error) {
    const detail = `${error.stderr || ""}\n${error.stdout || ""}\n${error.message || ""}`;
    if (expectedMessage && !detail.includes(expectedMessage)) {
      throw new Error(`Expected failure output to include '${expectedMessage}', got: ${detail}`);
    }
    return;
  }

  throw new Error(`Expected ${path.basename(scriptPath)} to fail.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function runCodexModeSmoke({ wfcBin, tempRoot, repoRoot }) {
  const codexHome = path.join(tempRoot, ".codex");
  const projectRoot = path.join(tempRoot, "project-a");
  const installStatePath = path.join(codexHome, ".codex-workflow-bundle.install-state.json");
  const legacyInstallStatePath = path.join(codexHome, ".codex-workflow-pack.install-state.json");
  const managedSkillsManifestPath = path.join(codexHome, ".codex-workflow-bundle.managed-skills.txt");
  const legacyManagedSkillsManifestPath = path.join(codexHome, ".codex-workflow-pack.managed-skills.txt");
  const globalAgentsPath = path.join(codexHome, "AGENTS.global.md");
  const projectAgentsPath = path.join(projectRoot, "AGENTS.md");
  const skillsHome = path.join(codexHome, "skills");
  const supportPoliciesPath = path.join(codexHome, "policies", "codex", "workflow-artifact-naming.md");
  const codexWorkflowChainPath = path.join(skillsHome, "codex-workflow-chain", "SKILL.md");

  runNodeScriptCaptureOutput(
    wfcBin,
    [
      "install",
      "--mode",
      "codex",
      "--codex-home",
      codexHome,
      "--scope",
      "both",
      "--project-root",
      projectRoot,
      "--skill",
      "codex-workflow-chain",
      "--skill",
      "step-goal-contract"
    ],
    tempRoot
  );

  assertPathExists(globalAgentsPath, "Expected global AGENTS to be installed.");
  assertPathExists(projectAgentsPath, "Expected project AGENTS.md to be installed.");
  assertPathExists(path.join(skillsHome, "codex-workflow-chain"), "Expected selected skill to be installed.");
  assertPathExists(path.join(skillsHome, "step-goal-contract"), "Expected selected skill to be installed.");
  assertPathMissing(path.join(skillsHome, "notebooklm"), "Expected unselected skill to remain absent.");
  assertPathExists(supportPoliciesPath, "Expected support policies to be installed.");
  assertPathExists(codexWorkflowChainPath, "Expected codex-workflow-chain skill file to be installed.");
  assertPathExists(installStatePath, "Expected bundle install state to be written.");
  assertPathExists(managedSkillsManifestPath, "Expected bundle managed skills manifest to be written.");
  assertPathMissing(legacyInstallStatePath, "Expected legacy install state path to stay absent after install.");
  assertPathMissing(
    legacyManagedSkillsManifestPath,
    "Expected legacy managed skills manifest path to stay absent after install."
  );

  const stateAfterInstall = readJson(installStatePath);
  const expectedVersion = readJson(path.join(repoRoot, "workflow-bundle.manifest.json")).bundleVersion;
  if (stateAfterInstall.installed_bundle_version !== expectedVersion) {
    throw new Error(`Expected installed_bundle_version=${expectedVersion}, got '${stateAfterInstall.installed_bundle_version}'.`);
  }
  if (stateAfterInstall.runtime_mode !== "codex") {
    throw new Error(`Expected runtime_mode=codex, got '${stateAfterInstall.runtime_mode}'.`);
  }
  if (stateAfterInstall.project_targets.length !== 1) {
    throw new Error(`Expected exactly one project target after install, got ${stateAfterInstall.project_targets.length}.`);
  }

  const skillsListOutput = runNodeScriptCaptureOutput(
    wfcBin,
    ["skills", "list", "--mode", "codex", "--codex-home", codexHome],
    tempRoot
  );
  assertContentIncludes(skillsListOutput, "codex-workflow-chain", "Expected source skill in skills list.");
  assertContentIncludes(skillsListOutput, "managed=yes", "Expected managed status in skills list.");

  runNodeScriptCaptureOutput(
    wfcBin,
    ["skills", "add", "--mode", "codex", "--codex-home", codexHome, "--skill", "notebooklm"],
    tempRoot
  );
  assertPathExists(path.join(skillsHome, "notebooklm"), "Expected newly added skill to be installed.");

  runNodeScriptCaptureOutput(
    wfcBin,
    ["skills", "remove", "--mode", "codex", "--codex-home", codexHome, "--skill", "notebooklm"],
    tempRoot
  );
  assertPathMissing(path.join(skillsHome, "notebooklm"), "Expected removed skill to be pruned.");

  fs.copyFileSync(installStatePath, legacyInstallStatePath);
  fs.copyFileSync(managedSkillsManifestPath, legacyManagedSkillsManifestPath);
  fs.rmSync(installStatePath, { force: true });
  fs.rmSync(managedSkillsManifestPath, { force: true });

  assertPathExists(legacyInstallStatePath, "Expected legacy install state fixture to exist before update.");
  assertPathExists(
    legacyManagedSkillsManifestPath,
    "Expected legacy managed skills manifest fixture to exist before update."
  );
  assertPathMissing(installStatePath, "Expected bundle install state to be removed before migration update.");
  assertPathMissing(managedSkillsManifestPath, "Expected bundle managed skills manifest to be removed before migration update.");

  runNodeScriptCaptureOutput(wfcBin, ["update", "--mode", "codex", "--codex-home", codexHome], tempRoot);

  assertPathExists(installStatePath, "Expected update to recreate bundle install state.");
  assertPathExists(managedSkillsManifestPath, "Expected update to recreate bundle managed skills manifest.");
  assertPathMissing(legacyInstallStatePath, "Expected update to remove legacy install state.");
  assertPathMissing(legacyManagedSkillsManifestPath, "Expected update to remove legacy managed skills manifest.");

  const statusJsonOutput = runNodeScriptCaptureOutput(
    wfcBin,
    ["status", "--mode", "codex", "--codex-home", codexHome, "--json"],
    tempRoot
  );
  assertContentIncludes(statusJsonOutput, '"runtime_mode": "codex"', "Expected runtime mode in status output.");
  assertContentIncludes(statusJsonOutput, `"installed_bundle_version": "${expectedVersion}"`, "Expected installed version in status output.");
  assertContentIncludes(
    statusJsonOutput,
    `"project_root": "${projectRoot.replace(/\\/g, "\\\\")}"`,
    "Expected project target in status output."
  );
  assertContentIncludes(
    statusJsonOutput,
    `"support_policies_path": "${path.join(codexHome, "policies", "codex").replace(/\\/g, "\\\\")}"`,
    "Expected support policies path in status output."
  );

  const globalAgentsContent = fs.readFileSync(globalAgentsPath, "utf8");
  assertContentIncludes(
    globalAgentsContent,
    "`Missing Gates` khác `NONE`, `Workflow Status` không được là `ACTIVE`",
    "Expected installed global AGENTS to hard-stop contradictory router status."
  );
  assertContentIncludes(
    globalAgentsContent,
    "`Next Human Action` không được là `NONE`",
    "Expected installed global AGENTS to forbid NONE next action when gates are missing."
  );

  const codexWorkflowChainContent = fs.readFileSync(codexWorkflowChainPath, "utf8");
  assertContentIncludes(
    codexWorkflowChainContent,
    "`Missing Gates` khác `NONE`, `Workflow Status` không được là `ACTIVE`",
    "Expected installed codex-workflow-chain skill to hard-stop contradictory router status."
  );
  assertContentIncludes(
    codexWorkflowChainContent,
    "`QR Voucher`",
    "Expected installed codex-workflow-chain skill to retain the greenfield QR Voucher hard-stop example."
  );
}

function runClaudeModeSmoke({ wfcBin, tempRoot }) {
  const claudeHome = path.join(tempRoot, ".claude");
  const projectRoot = path.join(tempRoot, "project-b");
  const installStatePath = path.join(claudeHome, ".claude-workflow-bundle.install-state.json");
  const managedSkillsManifestPath = path.join(claudeHome, ".claude-workflow-bundle.managed-skills.txt");
  const globalClaudePath = path.join(claudeHome, "CLAUDE.md");
  const projectClaudePath = path.join(projectRoot, "CLAUDE.md");
  const skillsHome = path.join(claudeHome, "skills");
  const supportPoliciesPath = path.join(claudeHome, "policies", "codex", "workflow-artifact-naming.md");

  runNodeScriptCaptureOutput(
    wfcBin,
    [
      "install",
      "--mode",
      "claude",
      "--claude-home",
      claudeHome,
      "--scope",
      "both",
      "--project-root",
      projectRoot,
      "--skill",
      "codex-workflow-chain"
    ],
    tempRoot
  );

  assertPathExists(globalClaudePath, "Expected global CLAUDE.md to be installed.");
  assertPathExists(projectClaudePath, "Expected project CLAUDE.md to be installed.");
  assertPathExists(path.join(skillsHome, "codex-workflow-chain"), "Expected selected Claude skill reference to be installed.");
  assertPathExists(supportPoliciesPath, "Expected Claude support policies to be installed.");
  assertPathExists(installStatePath, "Expected Claude install state to be written.");
  assertPathExists(managedSkillsManifestPath, "Expected Claude managed skills manifest to be written.");

  const stateAfterInstall = readJson(installStatePath);
  if (stateAfterInstall.runtime_mode !== "claude") {
    throw new Error(`Expected runtime_mode=claude, got '${stateAfterInstall.runtime_mode}'.`);
  }

  const statusJsonOutput = runNodeScriptCaptureOutput(
    wfcBin,
    ["status", "--mode", "claude", "--claude-home", claudeHome, "--json"],
    tempRoot
  );
  assertContentIncludes(statusJsonOutput, '"runtime_mode": "claude"', "Expected Claude runtime mode in status output.");
  assertContentIncludes(
    statusJsonOutput,
    `"runtime_home": "${claudeHome.replace(/\\/g, "\\\\")}"`,
    "Expected Claude runtime home in status output."
  );

  const skillsListOutput = runNodeScriptCaptureOutput(
    wfcBin,
    ["skills", "list", "--mode", "claude", "--claude-home", claudeHome],
    tempRoot
  );
  assertContentIncludes(skillsListOutput, "codex-workflow-chain", "Expected Claude skills list to show source skill.");
}

function runConfigHardeningSmoke({ wfcBin, tempRoot }) {
  const projectRoot = path.join(tempRoot, "project-config-hardening");
  const nestedRoot = path.join(projectRoot, "work-items", "rogue-scope");
  const rootConfigPath = path.join(projectRoot, "workflow-bundle.config.json");
  const nestedConfigPath = path.join(nestedRoot, "workflow-bundle.config.json");

  fs.mkdirSync(nestedRoot, { recursive: true });
  fs.writeFileSync(
    rootConfigPath,
    `${JSON.stringify({ projectRoot: ".", workflowRoot: "work-items" }, null, 2)}\n`,
    "utf8"
  );
  fs.writeFileSync(
    nestedConfigPath,
    `${JSON.stringify({ projectRoot: "..", workflowRoot: "." }, null, 2)}\n`,
    "utf8"
  );

  runNodeScriptExpectFailure(
    wfcBin,
    ["validate"],
    nestedRoot,
    "Workflow bundle config must live at the declared project root"
  );
}

function main() {
  const repoRoot = path.resolve(__dirname, "..", "..", "..");
  const packageRoot = path.join(repoRoot, "packages", "workflow-bundle");
  const wfcBin = path.join(packageRoot, "bin", "wfc.js");
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-bundle-smoke-"));

  try {
    runNodeScriptCaptureOutput(path.join(packageRoot, "scripts", "sync-workflow-bundle-runtime.js"), [], repoRoot);
    runCodexModeSmoke({ wfcBin, tempRoot, repoRoot });
    runClaudeModeSmoke({ wfcBin, tempRoot });
    runConfigHardeningSmoke({ wfcBin, tempRoot });
    console.log(`OK: workflow bundle smoke passed under ${tempRoot}`);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}
