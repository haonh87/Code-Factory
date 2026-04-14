const fs = require("fs");
const path = require("path");
const {
  collectFilesRecursive,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterList,
  getFrontmatterValue,
  parseCliArgs,
  readUtf8,
  resolveExistingPath
} = require("./workflow-validator-utils");
const {
  ARCHIVE_STATUSES,
  CHANGE_ID_PATTERN,
  CHANGE_STATUSES,
  REQUIRED_CHANGE_PACKAGE_FILES
} = require("./workflow-change-definitions");

const filePattern =
  /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.md$/;
const allowedChangeStatuses = new Set(CHANGE_STATUSES);
const allowedArchiveStatuses = new Set(ARCHIVE_STATUSES);

function validateChangePackageFrontmatter(filePath, changeId, errors) {
  const frontmatterLines = getFrontmatterLines(filePath);
  if (!frontmatterLines) {
    errors.push(`Missing or invalid YAML frontmatter in change package file: ${filePath}`);
    return;
  }

  const declaredChangeId = getFrontmatterValue(frontmatterLines, "change_id");
  if (declaredChangeId !== changeId) {
    errors.push(`Change package file must declare change_id '${changeId}': ${filePath}`);
  }
}

function validateWorkflowChange(options) {
  const workflowRoot = resolveExistingPath(options.workflowRoot, "workflow-root");
  const projectRoot = resolveExistingPath(options.projectRoot || process.cwd(), "project-root");
  const files = collectFilesRecursive(workflowRoot, new Set([".md"]));
  const errors = [];
  const seenChangeIds = new Set();
  let validatedCount = 0;

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    const match = fileName.match(filePattern);
    if (!match || !match.groups) {
      continue;
    }

    const frontmatterLines = getFrontmatterLines(filePath);
    if (!frontmatterLines) {
      continue;
    }

    const artifactFamily = getFrontmatterValue(frontmatterLines, "artifact_family");
    const artifactRole = getFrontmatterValue(frontmatterLines, "artifact_role");
    if (artifactFamily !== "workflow-step" || artifactRole !== "primary") {
      continue;
    }

    const changeId = getFrontmatterValue(frontmatterLines, "change_id");
    const changeStatus = getFrontmatterValue(frontmatterLines, "change_status");
    const archiveStatus = getFrontmatterValue(frontmatterLines, "archive_status");
    const specDeltaRefs = getFrontmatterList(frontmatterLines, "spec_delta_refs") || [];

    if (!changeId) {
      continue;
    }

    validatedCount += 1;

    if (!CHANGE_ID_PATTERN.test(changeId)) {
      errors.push(`Invalid change_id '${changeId}' in ${filePath}`);
      continue;
    }

    if (!changeStatus || !allowedChangeStatuses.has(changeStatus)) {
      errors.push(`Invalid change_status '${changeStatus || ""}' in ${filePath}`);
    }

    if (!archiveStatus || !allowedArchiveStatuses.has(archiveStatus)) {
      errors.push(`Invalid archive_status '${archiveStatus || ""}' in ${filePath}`);
    }

    const changeRoot = path.join(projectRoot, "changes", changeId);
    if (!fs.existsSync(changeRoot)) {
      errors.push(`Missing change package root for '${changeId}': ${changeRoot}`);
      continue;
    }

    seenChangeIds.add(changeId);

    REQUIRED_CHANGE_PACKAGE_FILES.forEach((relativePath) => {
      const fullPath = path.join(changeRoot, relativePath);
      if (!fs.existsSync(fullPath)) {
        errors.push(`Missing required change package file '${relativePath}' for ${changeId}: ${filePath}`);
        return;
      }
      validateChangePackageFrontmatter(fullPath, changeId, errors);
    });

    specDeltaRefs.forEach((specDeltaRef) => {
      const resolved = path.resolve(projectRoot, specDeltaRef);
      if (!resolved.startsWith(projectRoot) || !fs.existsSync(resolved)) {
        errors.push(`Missing spec_delta_ref '${specDeltaRef}' in ${filePath}`);
      }
    });

    if (changeStatus === "verified" && archiveStatus === "not_ready") {
      errors.push(`Verified change should not stay at archive_status 'not_ready': ${filePath}`);
    }

    if (changeStatus === "archived" && archiveStatus !== "archived") {
      errors.push(`Archived change must use archive_status 'archived': ${filePath}`);
    }
  }

  if (validatedCount === 0) {
    return {
      ok: true,
      errors,
      validatedCount,
      workflowRoot
    };
  }

  return {
    ok: errors.length === 0,
    errors,
    validatedCount,
    workflowRoot,
    seenChangeIds: [...seenChangeIds]
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = validateWorkflowChange({
      workflowRoot: args["workflow-root"],
      projectRoot: args["project-root"]
    });

    if (!result.ok) {
      console.error(formatErrors(result.errors));
      process.exit(1);
    }

    console.log(`OK: validated change layer for ${result.validatedCount} workflow note files under ${result.workflowRoot}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  validateWorkflowChange
};
