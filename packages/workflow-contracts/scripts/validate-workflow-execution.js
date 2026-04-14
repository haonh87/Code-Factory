const fs = require("fs");
const path = require("path");
const {
  collectFilesRecursive,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterList,
  getFrontmatterValue,
  getMarkdownSectionContent,
  parseCliArgs,
  readUtf8,
  resolveExistingPath
} = require("./workflow-validator-utils");
const {
  EXECUTION_MODES,
  REVIEW_MODES,
  getRequiredExecutionArtifacts
} = require("./workflow-execution-definitions");

const filePattern =
  /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.md$/;
const allowedExecutionModes = new Set(EXECUTION_MODES);
const allowedReviewModes = new Set(REVIEW_MODES);
const multiAgentAllowedSteps = new Set(["s05", "s06", "s07", "s08"]);

function validateArtifactFrontmatter(runtimePath, expected, errors, sourceFile) {
  const frontmatterLines = getFrontmatterLines(runtimePath);
  if (!frontmatterLines) {
    errors.push(`Missing or invalid YAML frontmatter in runtime artifact '${runtimePath}' (from ${sourceFile})`);
    return null;
  }

  const artifactFamily = getFrontmatterValue(frontmatterLines, "artifact_family");
  const artifactRole = getFrontmatterValue(frontmatterLines, "artifact_role");
  const artifactKind = getFrontmatterValue(frontmatterLines, "artifact_kind");
  const executionMode = getFrontmatterValue(frontmatterLines, "execution_mode");

  if (artifactFamily !== "workflow-runtime-artifact") {
    errors.push(`Runtime artifact must declare artifact_family 'workflow-runtime-artifact': ${runtimePath}`);
  }

  if (artifactRole !== "secondary") {
    errors.push(`Runtime artifact must declare artifact_role 'secondary': ${runtimePath}`);
  }

  if (artifactKind !== expected.stepSlug) {
    errors.push(`Runtime artifact kind mismatch in ${runtimePath}. Expected '${expected.stepSlug}'.`);
  }

  if (executionMode !== "multi_agent") {
    errors.push(`Runtime artifact '${runtimePath}' must use execution_mode 'multi_agent'.`);
  }

  return frontmatterLines;
}

function validateRuntimeArtifactContent(runtimePath, expected, errors) {
  const content = readUtf8(runtimePath);
  const artifactSection = getMarkdownSectionContent(content, "## Artifact Chính");

  if (!artifactSection) {
    errors.push(`Missing '## Artifact Chính' in runtime artifact: ${runtimePath}`);
    return;
  }

  const requiredPatternsBySlug = {
    "execution-policy": [/execution_mode:\s*multi_agent/, /coordinator_role:/, /verification_owner:/, /fallback_mode:/],
    "worker-assignment": [/assignment_id:/, /role:/, /owned_scope:/, /done_when:/, /status:/],
    "worker-handoff-report": [/assignment_id:/, /status:/, /summary:/, /evidence:/],
    "merge-report": [/execution_mode:\s*multi_agent/, /coordinator_role:/, /merged_assignments:/, /ready_for_audit:/],
    "execution-escalation": [/raised_by_role:/, /severity:/, /reason:/, /status:/]
  };

  const patterns = requiredPatternsBySlug[expected.stepSlug] || [];
  patterns.forEach((pattern) => {
    if (!pattern.test(artifactSection)) {
      errors.push(`Runtime artifact '${runtimePath}' is missing required content matching ${pattern}: ${runtimePath}`);
    }
  });
}

function validateWorkflowExecution(options) {
  const workflowRoot = resolveExistingPath(options.workflowRoot, "workflow-root");
  const files = collectFilesRecursive(workflowRoot, new Set([".md"]));
  const errors = [];
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

    validatedCount += 1;

    const executionMode = getFrontmatterValue(frontmatterLines, "execution_mode") || "agentic";
    const reviewMode = getFrontmatterValue(frontmatterLines, "review_mode") || "self";
    const verificationOwner = getFrontmatterValue(frontmatterLines, "verification_owner") || "";
    const executionRoles = getFrontmatterList(frontmatterLines, "execution_roles") || [];
    const linkedArtifacts = getFrontmatterList(frontmatterLines, "linked_artifacts") || [];
    const { work_item_slug: workItemSlug, step_id: stepId } = match.groups;

    if (!allowedExecutionModes.has(executionMode)) {
      errors.push(`Invalid execution_mode '${executionMode}' in ${filePath}`);
      continue;
    }

    if (!allowedReviewModes.has(reviewMode)) {
      errors.push(`Invalid review_mode '${reviewMode}' in ${filePath}`);
    }

    if (reviewMode !== "self" && !verificationOwner) {
      errors.push(`review_mode '${reviewMode}' requires non-empty verification_owner: ${filePath}`);
    }

    if (executionMode !== "multi_agent") {
      continue;
    }

    if (!multiAgentAllowedSteps.has(stepId)) {
      errors.push(`multi_agent execution is only supported on steps s05-s08 in current rollout: ${filePath}`);
      continue;
    }

    if (executionRoles.length < 2) {
      errors.push(`multi_agent execution requires at least two execution_roles: ${filePath}`);
    }

    if (!verificationOwner) {
      errors.push(`multi_agent execution requires verification_owner: ${filePath}`);
    }

    if (stepId === "s08" && reviewMode === "self") {
      errors.push(`multi_agent step 8 requires review_mode 'independent' or 'auto_fix_loop': ${filePath}`);
    }

    const requiredArtifacts = getRequiredExecutionArtifacts(stepId, executionMode);
    requiredArtifacts.forEach((artifact) => {
      const runtimeFileName = `${workItemSlug}.${artifact.stepId}.${artifact.stepSlug}.md`;
      const runtimePath = path.join(path.dirname(filePath), runtimeFileName);

      if (!fs.existsSync(runtimePath)) {
        errors.push(`Missing required runtime artifact '${runtimeFileName}' for ${filePath}`);
        return;
      }

      if (!linkedArtifacts.includes(runtimeFileName)) {
        errors.push(`Primary note must link runtime artifact '${runtimeFileName}' in linked_artifacts: ${filePath}`);
      }

      validateArtifactFrontmatter(runtimePath, artifact, errors, filePath);
      validateRuntimeArtifactContent(runtimePath, artifact, errors);
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
    const result = validateWorkflowExecution({
      workflowRoot: args["workflow-root"]
    });

    if (!result.ok) {
      console.error(formatErrors(result.errors));
      process.exit(1);
    }

    console.log(`OK: validated execution runtime for ${result.validatedCount} workflow note files under ${result.workflowRoot}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  validateWorkflowExecution
};
