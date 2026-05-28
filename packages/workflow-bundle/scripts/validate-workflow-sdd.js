const path = require("path");
const {
  collectFilesRecursive,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterNestedValue,
  getFrontmatterValue,
  getMarkdownSectionContent,
  parseCliArgs,
  readUtf8,
  resolveExistingPath
} = require("./workflow-validator-utils");
const {
  REQUIRED_SDD_BLOCKS_BY_STEP,
  SDD_MODES,
  SPEC_STATUSES
} = require("./workflow-sdd-definitions");

const filePattern =
  /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.md$/;
const allowedSddModes = new Set(SDD_MODES);
const allowedSpecStatuses = new Set(SPEC_STATUSES);

function hasSectionContent(sectionContent, pattern) {
  return Boolean(sectionContent && pattern.test(sectionContent));
}

function validateSpecArtifact(specPath, expectedSpecType, errors, sourceFile, strictMode) {
  const content = readUtf8(specPath);
  const frontmatterLines = getFrontmatterLines(specPath);

  if (!frontmatterLines) {
    errors.push(`Missing or invalid YAML frontmatter in referenced spec: ${specPath} (from ${sourceFile})`);
    return;
  }

  const specType = getFrontmatterValue(frontmatterLines, "spec_type");
  const specStatus = getFrontmatterValue(frontmatterLines, "spec_status");

  if (specType !== expectedSpecType) {
    errors.push(`Referenced spec '${specPath}' must declare spec_type '${expectedSpecType}' (from ${sourceFile})`);
  }

  if (!specStatus || !allowedSpecStatuses.has(specStatus)) {
    errors.push(`Referenced spec '${specPath}' has invalid spec_status '${specStatus || ""}' (from ${sourceFile})`);
  }

  if (!strictMode) {
    return;
  }

  if (expectedSpecType === "BRD" && !/\bBRD-\d{3}\b/.test(content)) {
    errors.push(`Strict SDD requires at least one BRD ID in ${specPath} (from ${sourceFile})`);
  }

  if (expectedSpecType === "SRS" && !/\bSRS-(FR|NFR|UX)-\d{3}\b/.test(content)) {
    errors.push(`Strict SDD requires at least one SRS requirement ID in ${specPath} (from ${sourceFile})`);
  }
}

function resolveSpecPath(projectRoot, specRef, label, filePath, errors) {
  if (!specRef) {
    errors.push(`Missing spec_refs.${label} for SDD note: ${filePath}`);
    return null;
  }

  const resolved = path.resolve(projectRoot, specRef);
  if (!resolved.startsWith(projectRoot)) {
    errors.push(`spec_refs.${label} must stay within project root: ${filePath}`);
    return null;
  }

  try {
    return resolveExistingPath(resolved, `spec_refs.${label}`);
  } catch (_error) {
    errors.push(`Missing referenced spec '${specRef}' for ${filePath}`);
    return null;
  }
}

function validateStrictSectionContent(stepId, filePath, content, errors) {
  if (stepId === "s04") {
    const freezeSection = getMarkdownSectionContent(content, "## Spec Freeze");
    if (!hasSectionContent(freezeSection, /\b(BRD|SRS)-[A-Z0-9-]*\d{3}\b/)) {
      errors.push(`Strict SDD requires requirement IDs in '## Spec Freeze': ${filePath}`);
    }
  }

  if (["s04", "s05", "s06", "s07", "s08"].includes(stepId)) {
    const traceSection = getMarkdownSectionContent(content, "## SDD Traceability");
    if (!hasSectionContent(traceSection, /\b(SRS-(FR|NFR|UX)-\d{3}|AC-\d{3}|TASK-\d{3}|TEST-\d{3})\b/)) {
      errors.push(`Strict SDD requires trace IDs in '## SDD Traceability': ${filePath}`);
    }
  }

  if (stepId === "s08") {
    const coverageSection = getMarkdownSectionContent(content, "## Spec Coverage");
    if (!hasSectionContent(coverageSection, /\bSRS-(FR|NFR|UX)-\d{3}\b/)) {
      errors.push(`Strict SDD requires requirement IDs in '## Spec Coverage': ${filePath}`);
    }

    if (!hasSectionContent(coverageSection, /\bPASS\|FAIL\|PARTIAL\|UNTESTED\b/) && !hasSectionContent(coverageSection, /\b(PASS|FAIL|PARTIAL|UNTESTED)\b/)) {
      errors.push(`Strict SDD requires coverage status in '## Spec Coverage': ${filePath}`);
    }
  }
}

function validateWorkflowSdd(options) {
  const workflowRoot = resolveExistingPath(options.workflowRoot, "workflow-root");
  const projectRoot = resolveExistingPath(options.projectRoot || process.cwd(), "project-root");
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

    const sddMode = getFrontmatterValue(frontmatterLines, "sdd_mode") || "none";
    if (sddMode === "none") {
      continue;
    }

    validatedCount += 1;

    if (!allowedSddModes.has(sddMode)) {
      errors.push(`Invalid sdd_mode '${sddMode}' in ${filePath}`);
      continue;
    }

    const stepId = match.groups.step_id;
    const content = readUtf8(filePath);
    const specStatus = getFrontmatterValue(frontmatterLines, "spec_status");
    const brdRef = getFrontmatterNestedValue(frontmatterLines, "spec_refs", "brd");
    const srsRef = getFrontmatterNestedValue(frontmatterLines, "spec_refs", "srs");
    const strictMode = sddMode === "strict";

    if (!specStatus) {
      errors.push(`Missing spec_status for SDD note: ${filePath}`);
    } else if (!allowedSpecStatuses.has(specStatus)) {
      errors.push(`Invalid spec_status '${specStatus}' in ${filePath}`);
    }

    const requiredBlocks = REQUIRED_SDD_BLOCKS_BY_STEP[stepId] || [];
    requiredBlocks.forEach((heading) => {
      if (!getMarkdownSectionContent(content, heading)) {
        errors.push(`Missing required SDD block '${heading}' in ${filePath}`);
      }
    });

    const brdPath = resolveSpecPath(projectRoot, brdRef, "brd", filePath, errors);
    const srsPath = resolveSpecPath(projectRoot, srsRef, "srs", filePath, errors);

    if (brdPath) {
      validateSpecArtifact(brdPath, "BRD", errors, filePath, strictMode);
    }

    if (srsPath) {
      validateSpecArtifact(srsPath, "SRS", errors, filePath, strictMode);
    }

    if (strictMode) {
      validateStrictSectionContent(stepId, filePath, content, errors);
    }
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
    const result = validateWorkflowSdd({
      workflowRoot: args["workflow-root"],
      projectRoot: args["project-root"]
    });

    if (!result.ok) {
      console.error(formatErrors(result.errors));
      process.exit(1);
    }

    console.log(`OK: validated SDD for ${result.validatedCount} workflow note files under ${result.workflowRoot}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  validateWorkflowSdd
};
