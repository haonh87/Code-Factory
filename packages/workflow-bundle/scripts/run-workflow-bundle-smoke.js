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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function main() {
  const repoRoot = path.resolve(__dirname, "..", "..", "..");
  const packageRoot = path.join(repoRoot, "packages", "workflow-bundle");
  const wfcBin = path.join(packageRoot, "bin", "wfc.js");
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-bundle-smoke-"));
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

  try {
    runNodeScriptCaptureOutput(path.join(packageRoot, "scripts", "sync-workflow-bundle-runtime.js"), [], repoRoot);

    runNodeScriptCaptureOutput(
      wfcBin,
      [
        "install",
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
    assertPathExists(installStatePath, "Expected bundle install state to be written.");
    assertPathExists(managedSkillsManifestPath, "Expected bundle managed skills manifest to be written.");
    assertPathMissing(legacyInstallStatePath, "Expected legacy install state path to stay absent after install.");
    assertPathMissing(
      legacyManagedSkillsManifestPath,
      "Expected legacy managed skills manifest path to stay absent after install."
    );

    const stateAfterInstall = readJson(installStatePath);
    if (stateAfterInstall.installed_bundle_version !== "2.0.0") {
      throw new Error(`Expected installed_bundle_version=2.0.0, got '${stateAfterInstall.installed_bundle_version}'.`);
    }
    if (stateAfterInstall.project_targets.length !== 1) {
      throw new Error(`Expected exactly one project target after install, got ${stateAfterInstall.project_targets.length}.`);
    }

    const skillsListOutput = runNodeScriptCaptureOutput(wfcBin, ["skills", "list", "--codex-home", codexHome], tempRoot);
    assertContentIncludes(skillsListOutput, "codex-workflow-chain", "Expected source skill in skills list.");
    assertContentIncludes(skillsListOutput, "managed=yes", "Expected managed status in skills list.");

    runNodeScriptCaptureOutput(wfcBin, ["skills", "add", "--codex-home", codexHome, "--skill", "notebooklm"], tempRoot);
    assertPathExists(path.join(skillsHome, "notebooklm"), "Expected newly added skill to be installed.");

    runNodeScriptCaptureOutput(wfcBin, ["skills", "remove", "--codex-home", codexHome, "--skill", "notebooklm"], tempRoot);
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
    assertPathMissing(
      managedSkillsManifestPath,
      "Expected bundle managed skills manifest to be removed before migration update."
    );

    runNodeScriptCaptureOutput(wfcBin, ["update", "--codex-home", codexHome], tempRoot);

    assertPathExists(installStatePath, "Expected update to recreate bundle install state.");
    assertPathExists(managedSkillsManifestPath, "Expected update to recreate bundle managed skills manifest.");
    assertPathMissing(legacyInstallStatePath, "Expected update to remove legacy install state.");
    assertPathMissing(
      legacyManagedSkillsManifestPath,
      "Expected update to remove legacy managed skills manifest."
    );

    const statusJsonOutput = runNodeScriptCaptureOutput(wfcBin, ["status", "--codex-home", codexHome, "--json"], tempRoot);
    assertContentIncludes(statusJsonOutput, '"installed_bundle_version": "2.0.0"', "Expected installed version in status output.");
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
