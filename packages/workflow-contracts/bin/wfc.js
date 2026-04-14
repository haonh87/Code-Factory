#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const packageRoot = path.resolve(__dirname, "..");
const packageJson = require(path.join(packageRoot, "package.json"));
const configFileName = "workflow-contracts.config.json";

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
  fixtures: {
    script: "run-workflow-governance-fixtures.js",
    cwd: packageRoot
  },
  smoke: {
    script: "run-workflow-authoring-smoke.js",
    cwd: packageRoot
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
    const candidate = path.join(currentDir, configFileName);
    if (fs.existsSync(candidate)) {
      return candidate;
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
      "Workflow contracts CLI",
      "",
      "Usage:",
      "  wfc [validate] [--workflow-root <path>] [--project-root <path>]",
      "  wfc <command> [args]",
      "",
      "Commands:",
      "  validate        Validate workflow naming + governance",
      "  naming          Validate workflow artifact naming",
      "  governance      Validate workflow governance",
      "  sdd             Validate SDD workflow contracts",
      "  change          Validate change-layer contracts",
      "  exec            Validate execution-layer contracts",
      "  plan            Validate planning-track contracts",
      "  fixtures        Run package governance fixtures",
      "  smoke           Run scaffold -> validate smoke suite",
      "  scaffold        Scaffold workflow notes",
      "  scaffold-step   Scaffold a single workflow step",
      "  scaffold-change Scaffold a change package",
      "  version         Print version",
      "  help            Show this help",
      "",
      `Config: optional ${configFileName} in the repo root or any parent directory.`,
      "Defaults: projectRoot='.' and workflowRoot='work-items'."
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
