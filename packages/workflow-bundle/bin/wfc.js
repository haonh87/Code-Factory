#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const packageRoot = path.resolve(__dirname, "..");
const packageJson = require(path.join(packageRoot, "package.json"));
const configFileName = "workflow-bundle.config.json";
const legacyConfigFileName = "workflow-contracts.config.json";

const commandTable = {
  validate: {
    script: "validate-workflow.js",
    useProjectRoot: true,
    useWorkflowRoot: true
  },
  naming: {
    script: "validate-workflow-artifact-names.js",
    useWorkflowRoot: true
  },
  governance: {
    script: "validate-workflow-governance.js",
    useProjectRoot: true,
    useWorkflowRoot: true
  },
  sdd: {
    script: "validate-workflow-sdd.js",
    useProjectRoot: true,
    useWorkflowRoot: true
  },
  change: {
    script: "validate-workflow-change.js",
    useProjectRoot: true,
    useWorkflowRoot: true
  },
  exec: {
    script: "validate-workflow-execution.js",
    useWorkflowRoot: true
  },
  plan: {
    script: "validate-workflow-planning.js",
    useWorkflowRoot: true
  },
  protocol: {
    script: "validate-work-item-protocol.js",
    useProjectRoot: true,
    useWorkflowRoot: true
  },
  fixtures: {
    script: "run-workflow-governance-fixtures.js",
    cwd: packageRoot
  },
  init: {
    script: "init-workflow-bundle.js"
  },
  smoke: {
    script: "run-workflow-authoring-smoke.js",
    cwd: packageRoot
  },
  "bundle-smoke": {
    script: "run-workflow-bundle-smoke.js",
    cwd: packageRoot
  },
  install: {
    script: "workflow-bundle-cli.js",
    injectArgs: ["install"]
  },
  update: {
    script: "workflow-bundle-cli.js",
    injectArgs: ["update"]
  },
  status: {
    script: "workflow-bundle-cli.js",
    injectArgs: ["status"]
  },
  skills: {
    script: "workflow-bundle-cli.js",
    injectArgs: ["skills"]
  },
  materialize: {
    script: "materialize-work-item.js",
    useProjectRoot: true,
    useWorkflowRoot: true
  },
  "change-item": {
    script: "change-item.js",
    useProjectRoot: true
  },
  "work-item": {
    script: "work-item-protocol.js",
    useProjectRoot: true,
    useWorkflowRoot: true
  },
  scaffold: {
    script: "scaffold-workflow.js",
    useProjectRoot: true,
    useWorkflowRoot: true,
    scaffoldWorkflow: true
  },
  "scaffold-step": {
    script: "scaffold-workflow.js",
    injectArgs: ["--single-step"],
    useProjectRoot: true,
    useWorkflowRoot: true,
    scaffoldWorkflow: true
  },
  "scaffold-change": {
    script: "scaffold-change-package.js",
    useProjectRoot: true,
    scaffoldChange: true
  }
};

const aliasTable = {
  check: "validate",
  execution: "exec",
  planning: "plan",
  workflow: "scaffold",
  step: "scaffold-step"
};

function findConfigFile(startDir) {
  let currentDir = path.resolve(startDir);

  while (true) {
    const bundleCandidate = path.join(currentDir, configFileName);
    if (fs.existsSync(bundleCandidate)) {
      return bundleCandidate;
    }

    const legacyCandidate = path.join(currentDir, legacyConfigFileName);
    if (fs.existsSync(legacyCandidate)) {
      return legacyCandidate;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return null;
    }

    currentDir = parentDir;
  }
}

function loadConfig() {
  const configPath = findConfigFile(process.cwd());
  const baseDir = configPath ? path.dirname(configPath) : process.cwd();

  if (!configPath) {
    return { baseDir, values: {} };
  }

  try {
    const raw = fs.readFileSync(configPath, "utf8");
    const values = JSON.parse(raw);

    if (!values || typeof values !== "object" || Array.isArray(values)) {
      throw new Error("Config root must be a JSON object.");
    }

    return { baseDir, values };
  } catch (error) {
    console.error(`ERROR: failed to read ${configPath}: ${error.message}`);
    process.exit(1);
  }
}

function hasOption(args, optionName) {
  return args.includes(`--${optionName}`);
}

function getLastOptionValue(args, optionName) {
  const flag = `--${optionName}`;
  let value = null;

  for (let index = 0; index < args.length; index += 1) {
    if (args[index] !== flag) {
      continue;
    }

    const next = args[index + 1];
    if (!next || next.startsWith("--")) {
      value = true;
      continue;
    }

    value = next;
    index += 1;
  }

  return value;
}

function resolveConfigPath(baseDir, rawValue, fallbackValue) {
  const value = rawValue || fallbackValue;
  return path.resolve(baseDir, value);
}

function applyDefaultArgs(command, forwardedArgs, config) {
  const args = [...(command.injectArgs || []), ...forwardedArgs];
  const explicitProjectRoot = getLastOptionValue(args, "project-root");
  const explicitWorkflowRoot = getLastOptionValue(args, "workflow-root");
  const projectRoot =
    typeof explicitProjectRoot === "string" && explicitProjectRoot.length > 0
      ? path.resolve(process.cwd(), explicitProjectRoot)
      : resolveConfigPath(config.baseDir, config.values.projectRoot, ".");
  const workflowRootBase =
    typeof explicitProjectRoot === "string" &&
    explicitProjectRoot.length > 0 &&
    (explicitWorkflowRoot == null || explicitWorkflowRoot === true)
      ? path.join(projectRoot, "work-items")
      : resolveConfigPath(config.baseDir, config.values.workflowRoot, path.join(projectRoot, "work-items"));

  if (command.useProjectRoot && !hasOption(args, "project-root")) {
    args.push("--project-root", projectRoot);
  }

  if (command.useWorkflowRoot && !hasOption(args, "workflow-root")) {
    if (command.scaffoldWorkflow) {
      const workItem = getLastOptionValue(args, "work-item");
      if (typeof workItem === "string" && workItem.length > 0) {
        args.push("--workflow-root", path.join(workflowRootBase, workItem));
      }
    } else {
      args.push("--workflow-root", workflowRootBase);
    }
  }

  if (command.scaffoldChange && !hasOption(args, "change-root")) {
    const changeId = getLastOptionValue(args, "change-id");
    if (typeof changeId === "string" && changeId.length > 0) {
      args.push("--change-root", path.join(projectRoot, "changes", changeId));
    }
  }

  return args;
}

function printHelp() {
  console.log(
    [
      `wfc v${packageJson.version}`,
      "",
      "Workflow bundle CLI",
      "",
      "Usage:",
      "  wfc [validate] [--workflow-root <path>] [--project-root <path>]",
      "  wfc <command> [args]",
      "",
      "Commands:",
      "  validate        Validate workflow naming + governance",
      "  naming          Validate workflow artifact naming",
      "  governance      Validate workflow governance",
      "  sdd             Validate SDD workflow bundle contracts",
      "  change          Validate change-layer contracts",
      "  exec            Validate execution-layer contracts",
      "  plan            Validate planning-track contracts",
      "  protocol        Validate work-item protocol + approval gate",
      "  fixtures        Run package governance fixtures",
      "  init            Create minimal workflow-bundle baseline in a repo",
      "  smoke           Run scaffold -> validate smoke suite",
      "  bundle-smoke    Run install/update workflow bundle smoke suite",
      "  install         Install the published workflow bundle into Codex home/project",
      "  update          Update installed workflow bundle from current package bundle",
      "  status          Show installed workflow bundle status",
      "  skills          List/add/remove managed workflow skills",
      "  materialize     Propose or scaffold a work item from a raw request",
      "  change-item     Manage human approval for change packages",
      "  work-item       Manage work-item approval and protocol lifecycle",
      "  scaffold        Scaffold workflow notes",
      "  scaffold-step   Scaffold a single workflow step",
      "  scaffold-change Scaffold a change package",
      "  version         Print version",
      "  help            Show this help",
      "",
      "Public v2.0.0 Flow:",
      "  1. wfc install --scope global",
      "  2. wfc init",
      "  3. choose one:",
      "     - manual: wfc scaffold --work-item <work-item-slug>",
      "     - agentic: wfc materialize --request \"<raw-request>\" --auto-scaffold",
      "  4. if agentic flow created a change package: wfc change-item approve --change-id <CHANGE-ID> --reviewed-by <role>",
      "  5. wfc work-item list",
      "  6. wfc work-item status --work-item <work-item-slug>",
      "  7. if the work item came from agentic flow: wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>",
      "  8. if the work item came from agentic flow: wfc work-item activate --work-item <work-item-slug>",
      "  9. wfc",
      " 10. wfc sdd | wfc change | wfc plan",
      " 11. if the work item uses execution metadata/artifacts: wfc exec",
      " 12. if the work item uses protocol approval flow: wfc protocol",
      "",
      "Bundle Management:",
      "  - wfc install --scope global|project|both",
      "  - wfc update",
      "  - wfc status",
      "  - wfc skills list|add|remove",
      "",
      `Config: optional ${configFileName} in the repo root or any parent directory.`,
      `Legacy config still accepted: ${legacyConfigFileName}.`,
      "Defaults: projectRoot='.' and workflowRoot='work-items'.",
      "Requirements: Node >= 18, npm >= 9, writable ~/.codex for install/update/skills."
    ].join("\n")
  );
}

function resolveCommand(input) {
  if (!input || input.startsWith("--")) {
    return {
      name: "validate",
      args: input ? process.argv.slice(2) : []
    };
  }

  if (input === "help" || input === "--help" || input === "-h") {
    return { name: "help", args: [] };
  }

  if (input === "version" || input === "--version" || input === "-v") {
    return { name: "version", args: [] };
  }

  const normalized = aliasTable[input] || input;
  return {
    name: normalized,
    args: process.argv.slice(3)
  };
}

function run() {
  const resolved = resolveCommand(process.argv[2]);

  if (resolved.name === "help") {
    printHelp();
    return;
  }

  if (resolved.name === "version") {
    console.log(packageJson.version);
    return;
  }

  const command = commandTable[resolved.name];
  if (!command) {
    console.error(`ERROR: unknown command '${process.argv[2]}'. Use 'wfc help' for usage.`);
    process.exit(1);
  }

  const config = loadConfig();
  const scriptArgs = applyDefaultArgs(command, resolved.args, config);
  const scriptPath = path.join(packageRoot, "scripts", command.script);

  try {
    execFileSync(process.execPath, [scriptPath, ...scriptArgs], {
      cwd: command.cwd || process.cwd(),
      stdio: "inherit"
    });
  } catch (error) {
    if (typeof error.status === "number") {
      process.exit(error.status);
    }

    console.error(`ERROR: failed to run ${path.basename(scriptPath)}: ${error.message}`);
    process.exit(1);
  }
}

run();
