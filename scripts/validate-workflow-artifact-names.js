const path = require("path");
const {
  collectFilesRecursive,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterValue,
  parseCliArgs,
  resolveExistingPath
} = require("./workflow-validator-utils");
const { getAllowedArtifactEntries } = require("./workflow-step-definitions");

function validateWorkflowArtifactNames(options) {
  const workflowRoot = resolveExistingPath(options.workflowRoot, "workflow-root");
  const extensions = new Set([".md", ".canvas", ".base"]);
  const allowedKeys = new Set();

  getAllowedArtifactEntries().forEach((entry) => {
    allowedKeys.add(`${entry.stepId}.${entry.stepSlug}.${entry.extension}`);
  });

  const pattern =
    /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.(?<ext>md|canvas|base)$/;
  const files = collectFilesRecursive(workflowRoot, extensions);
  const errors = [];
  let validatedCount = 0;

  for (const filePath of files) {
    const relativePath = path.relative(workflowRoot, filePath);
    if (relativePath === "README.md") {
      continue;
    }

    const fileName = path.basename(filePath);
    const match = fileName.match(pattern);

    if (!match || !match.groups) {
      errors.push(`Invalid filename format: ${filePath}`);
      continue;
    }

    const { work_item_slug: workItemSlug, step_id: stepId, step_slug: stepSlug, ext } = match.groups;
    const allowedKey = `${stepId}.${stepSlug}.${ext}`;
    validatedCount += 1;

    if (!allowedKeys.has(allowedKey)) {
      errors.push(`Unsupported step/slug/extension combination: ${filePath}`);
      continue;
    }

    if (ext !== "md") {
      continue;
    }

    const frontmatterLines = getFrontmatterLines(filePath);
    if (!frontmatterLines) {
      errors.push(`Missing YAML frontmatter: ${filePath}`);
      continue;
    }

    const expectedValues = {
      artifact_id: `${workItemSlug}.${stepId}.${stepSlug}`,
      work_item_slug: workItemSlug,
      step_id: stepId,
      step_slug: stepSlug
    };

    Object.entries(expectedValues).forEach(([key, expectedValue]) => {
      const actualValue = getFrontmatterValue(frontmatterLines, key);
      if (!actualValue) {
        errors.push(`Missing frontmatter key '${key}': ${filePath}`);
        return;
      }

      if (actualValue !== expectedValue) {
        errors.push(
          `Frontmatter mismatch for '${key}' in ${filePath}. Expected '${expectedValue}' but found '${actualValue}'.`
        );
      }
    });
  }

  return {
    ok: errors.length === 0,
    errors,
    validatedCount,
    workflowRoot
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = validateWorkflowArtifactNames({
      workflowRoot: args["workflow-root"]
    });

    if (!result.ok) {
      console.error(formatErrors(result.errors));
      process.exit(1);
    }

    console.log(`OK: validated ${result.validatedCount} workflow artifact files under ${result.workflowRoot}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  validateWorkflowArtifactNames
};
