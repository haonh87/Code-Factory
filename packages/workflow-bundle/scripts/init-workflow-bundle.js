const fs = require("fs");
const path = require("path");
const { ensureDirectory, parseCliArgs } = require("./workflow-validator-utils");
const {
  DEFAULT_ALWAYS_WRITABLE_PATHS,
  DEFAULT_AUTHORING_ROOTS,
  DEFAULT_IGNORED_ROOTS,
  syncCapabilityControl
} = require("./workflow-capability-control");

const DEFAULT_CONFIG = {
  projectRoot: ".",
  workflowRoot: "work-items",
  capabilityControl: {
    enabled: true,
    authoringRoots: DEFAULT_AUTHORING_ROOTS,
    alwaysWritablePaths: DEFAULT_ALWAYS_WRITABLE_PATHS,
    ignoredRoots: DEFAULT_IGNORED_ROOTS,
    protectedRoots: []
  }
};

function normalizeSingleValue(value) {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }

  return value;
}

function writeFileWithGuard(filePath, content, force) {
  if (fs.existsSync(filePath) && !force) {
    return false;
  }

  ensureDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

function getBootstrapFiles() {
  return [
    {
      relativePath: "workflow-bundle.config.json",
      content: `${JSON.stringify(DEFAULT_CONFIG, null, 2)}\n`
    },
    {
      relativePath: "work-items/.gitkeep",
      content: ""
    },
    {
      relativePath: "changes/.gitkeep",
      content: ""
    },
    {
      relativePath: "product-specs/brd/.gitkeep",
      content: ""
    },
    {
      relativePath: "product-specs/srs/.gitkeep",
      content: ""
    },
    {
      relativePath: "project-context/project-context.md",
      content: "# Project Context\n\nContext tối thiểu cho workflow bundle.\n"
    },
    {
      relativePath: "project-context/constitution.md",
      content: "# Constitution\n\nNguyên tắc nền cho workflow bundle.\n"
    },
    {
      relativePath: "project-context/governance-exception-register.md",
      content: [
        "# Governance Exception Register",
        "",
        "## Register",
        "",
        "| Exception ID | Work Item | Step | Principle | Owner | Status | Review Date | Notes |",
        "|---|---|---|---|---|---|---|---|",
        "| _none_ |  |  |  |  |  |  | Chưa có exception đang mở |",
        ""
      ].join("\n")
    },
    {
      relativePath: "project-context/checklists/default.md",
      content: "# Default Checklist\n\n- default\n"
    },
    {
      relativePath: "project-context/checklists/strict.md",
      content: "# Strict Checklist\n\n- strict\n"
    },
    {
      relativePath: "project-context/checklists/regulated.md",
      content: "# Regulated Checklist\n\n- regulated\n"
    },
    {
      relativePath: "project-context/custom/design-review.md",
      content: "# Custom Design Review\n\n- custom\n"
    }
  ];
}

function initWorkflowBundle(options) {
  const projectRootInput = normalizeSingleValue(options.projectRoot || process.cwd());
  const projectRoot = path.resolve(projectRootInput);
  const force = Boolean(options.force);
  const createdFiles = [];
  const skippedFiles = [];

  ensureDirectory(projectRoot);

  getBootstrapFiles().forEach((fileSpec) => {
    const filePath = path.join(projectRoot, fileSpec.relativePath);
    const created = writeFileWithGuard(filePath, fileSpec.content, force);
    if (created) {
      createdFiles.push(filePath);
    } else {
      skippedFiles.push(filePath);
    }
  });

  syncCapabilityControl({
    projectRoot,
    workflowRootBase: path.join(projectRoot, DEFAULT_CONFIG.workflowRoot)
  });

  return {
    projectRoot,
    createdFiles,
    skippedFiles
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = initWorkflowBundle({
      projectRoot: args["project-root"],
      force: args.force
    });

    console.log(`OK: initialized workflow bundle baseline under ${result.projectRoot}`);

    if (result.createdFiles.length > 0) {
      console.log(`Created ${result.createdFiles.length} file(s):`);
      result.createdFiles.forEach((filePath) => {
        console.log(filePath);
      });
    }

    if (result.skippedFiles.length > 0) {
      console.log(`Skipped ${result.skippedFiles.length} existing file(s). Use --force to overwrite.`);
    }
  } catch (error) {
    console.error(error.message.startsWith("ERROR:") ? error.message : `ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  DEFAULT_CONFIG,
  getBootstrapFiles,
  initWorkflowBundle
};
