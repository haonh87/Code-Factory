const fs = require("fs");
const path = require("path");
const {
  collectFilesRecursive,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterList,
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
  const roleIndexedHandoffPattern =
    /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.s07\.worker-handoff-report\.(?<assignment_id>[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\.md$/;
  const files = collectFilesRecursive(workflowRoot, extensions);
  const errors = [];
  const notices = [];
  let validatedCount = 0;

  for (const filePath of files) {
    const relativePath = path.relative(workflowRoot, filePath);
    if (relativePath === "README.md") {
      continue;
    }

    const fileName = path.basename(filePath);
    const roleIndexedMatch = fileName.match(roleIndexedHandoffPattern);
    const match = fileName.match(pattern);

    if ((!match || !match.groups) && (!roleIndexedMatch || !roleIndexedMatch.groups)) {
      errors.push(`Invalid filename format: ${filePath}`);
      continue;
    }

    const isRoleIndexedHandoff = Boolean(roleIndexedMatch && roleIndexedMatch.groups);
    const workItemSlug = isRoleIndexedHandoff
      ? roleIndexedMatch.groups.work_item_slug
      : match.groups.work_item_slug;
    const stepId = isRoleIndexedHandoff ? "s07" : match.groups.step_id;
    const stepSlug = isRoleIndexedHandoff ? "worker-handoff-report" : match.groups.step_slug;
    const ext = isRoleIndexedHandoff ? "md" : match.groups.ext;
    const allowedKey = `${stepId}.${stepSlug}.${ext}`;
    validatedCount += 1;

    if (!isRoleIndexedHandoff && !allowedKeys.has(allowedKey)) {
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
      artifact_id: isRoleIndexedHandoff
        ? `${workItemSlug}.${stepId}.${stepSlug}.${roleIndexedMatch.groups.assignment_id}`
        : `${workItemSlug}.${stepId}.${stepSlug}`,
      work_item_slug: workItemSlug,
      step_id: stepId,
      step_slug: stepSlug
    };

    if (isRoleIndexedHandoff) {
      expectedValues.assignment_id = roleIndexedMatch.groups.assignment_id;
    }

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

    if (isRoleIndexedHandoff) {
      const reason = getFrontmatterValue(frontmatterLines, "artifact_governance_exemption_reason");
      if (!reason) {
        errors.push(`Role-indexed handoff requires a non-empty artifact governance exemption reason: ${filePath}`);
      } else {
        notices.push(`Role-indexed handoff exemption: ${filePath} — ${reason}`);
      }

      const primaryPath = path.join(path.dirname(filePath), `${workItemSlug}.s07.implementation.md`);
      if (!fs.existsSync(primaryPath)) {
        errors.push(`Role-indexed handoff requires its primary s07 note: ${filePath}`);
      } else {
        const primaryFrontmatter = getFrontmatterLines(primaryPath);
        const linkedArtifacts = primaryFrontmatter && getFrontmatterList(primaryFrontmatter, "linked_artifacts");
        if (!linkedArtifacts || !linkedArtifacts.includes(fileName)) {
          errors.push(`Role-indexed handoff must appear in linked_artifacts of ${primaryPath}: ${fileName}`);
        }
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    notices,
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

    result.notices.forEach((notice) => console.log(`NOTICE: ${notice}`));
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
