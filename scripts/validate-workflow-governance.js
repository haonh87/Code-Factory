const path = require("path");
const fs = require("fs");
const {
  collectFilesRecursive,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterList,
  getFrontmatterNestedList,
  getFrontmatterValue,
  getMarkdownSectionContent,
  parseCliArgs,
  readUtf8,
  resolveExistingPath
} = require("./workflow-validator-utils");
const {
  CHECKLIST_BY_PROFILE,
  EXCEPTION_REGISTER_STATUSES,
  GOVERNANCE_PROFILES,
  GOVERNANCE_ROLES,
  GOVERNANCE_STATUSES,
  STANDARD_GOVERNANCE_REFS
} = require("./workflow-governance-definitions");

const filePattern =
  /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.md$/;
const allowedProfiles = new Set(GOVERNANCE_PROFILES);
const allowedStatuses = new Set(GOVERNANCE_STATUSES);
const allowedRoles = new Set(GOVERNANCE_ROLES);
const allowedRegisterStatuses = new Set(EXCEPTION_REGISTER_STATUSES);
const allowedStandardGovernanceRefs = new Set(STANDARD_GOVERNANCE_REFS);
const expectedChecklistByProfile = CHECKLIST_BY_PROFILE;
const signoffKeys = ["dor", "approach", "release", "business_acceptance", "dod"];
const requiredBlocksByStep = {
  s01: ["## Governance Context"],
  s04: ["## Governance Checks"],
  s06: ["## Governance Checks"],
  s08: ["## Governance Checks"]
};
const disallowedFinalizedStatusesByStep = {
  s04: new Set(["CHECKS_PENDING", "NOT_APPLICABLE"]),
  s08: new Set(["CHECKS_PENDING", "NOT_APPLICABLE"])
};

function hasRequiredBlock(fileContent, blockHeading) {
  const pattern = new RegExp(`^${escapeRegExp(blockHeading)}\\s*$`, "m");
  return pattern.test(fileContent);
}

function getExceptionIds(fileContent) {
  return [...fileContent.matchAll(/^\s*exception_id:\s*["']?([A-Z0-9-]+)["']?\s*$/gm)].map((match) => match[1]);
}

function getSectionScalarValue(sectionContent, fieldName) {
  if (!sectionContent) {
    return "";
  }

  const pattern = new RegExp(`^\\s*${escapeRegExp(fieldName)}:\\s*["']?([^"']+?)["']?\\s*$`, "m");
  const match = sectionContent.match(pattern);
  return match && match[1] ? match[1].trim() : "";
}

function parseRoleList(value) {
  if (!value) {
    return [];
  }

  return [...new Set(
    String(value)
      .split(",")
      .map((role) => role.trim())
      .filter(Boolean)
  )];
}

function parseRegisterEntries(registerContent) {
  if (!registerContent) {
    return new Map();
  }

  const lines = registerContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));

  const entries = new Map();
  if (lines.length < 3) {
    return entries;
  }

  lines.slice(2).forEach((line) => {
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

    if (cells.length < 8) {
      return;
    }

    const [exceptionId, workItem, step, principle, owner, status, reviewDate, notes] = cells;
    if (!exceptionId || exceptionId === "_none_") {
      return;
    }

    entries.set(exceptionId, {
      exceptionId,
      workItem,
      step,
      principle,
      owner,
      status,
      reviewDate,
      notes
    });
  });

  return entries;
}

function validateKnownRoles(roles, label, filePath, errors) {
  roles.forEach((role) => {
    if (!allowedRoles.has(role)) {
      errors.push(`Unknown governance role '${role}' in ${label}: ${filePath}`);
    }
  });
}

function isFinalizedNoteStatus(noteStatus) {
  return Boolean(noteStatus) && noteStatus !== "draft";
}

function shouldRequireRegister(stepId, governanceProfile, governanceStatus) {
  if (!["EXCEPTION_RECORDED", "WAIVER_APPROVED"].includes(governanceStatus)) {
    return false;
  }

  if (governanceProfile === "regulated") {
    return true;
  }

  if (governanceStatus === "WAIVER_APPROVED") {
    return true;
  }

  return stepId === "s08";
}

function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function validateWorkflowGovernance(options) {
  const workflowRoot = resolveExistingPath(options.workflowRoot, "workflow-root");
  const projectRoot = resolveExistingPath(options.projectRoot || process.cwd(), "project-root");
  const registerPath = path.join(projectRoot, "project-context", "governance-exception-register.md");
  const files = collectFilesRecursive(workflowRoot, new Set([".md"]));
  const errors = [];
  let matchedFiles = 0;
  let registerContent = "";

  if (fs.existsSync(registerPath)) {
    registerContent = readUtf8(registerPath);
  }

  const registerEntries = parseRegisterEntries(registerContent);
  registerEntries.forEach((entry) => {
    if (!allowedRegisterStatuses.has(entry.status)) {
      errors.push(`Invalid register status '${entry.status}' for exception '${entry.exceptionId}': ${registerPath}`);
    }

    if (["PROPOSED", "APPROVED"].includes(entry.status) && !entry.reviewDate) {
      errors.push(`Open register entry '${entry.exceptionId}' requires review date: ${registerPath}`);
    }
  });

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    const match = fileName.match(filePattern);
    if (!match || !match.groups) {
      continue;
    }

    const frontmatterLines = getFrontmatterLines(filePath);

    if (!frontmatterLines) {
      errors.push(`Missing or invalid YAML frontmatter: ${filePath}`);
      continue;
    }

    const artifactFamily = getFrontmatterValue(frontmatterLines, "artifact_family");
    const artifactRole = getFrontmatterValue(frontmatterLines, "artifact_role");
    if (artifactFamily !== "workflow-step" || artifactRole !== "primary") {
      continue;
    }

    matchedFiles += 1;
    const stepId = match.groups.step_id;
    const workItemSlug = match.groups.work_item_slug;

    const content = readUtf8(filePath);
    const governanceRef = getFrontmatterValue(frontmatterLines, "governance_ref");
    const governanceProfile = getFrontmatterValue(frontmatterLines, "governance_profile");
    const governanceStatus = getFrontmatterValue(frontmatterLines, "governance_status");
    const noteStatus = getFrontmatterValue(frontmatterLines, "status") || "draft";
    let checklistRefs = getFrontmatterList(frontmatterLines, "checklist_refs");
    const roleSignoffs = {};
    signoffKeys.forEach((key) => {
      roleSignoffs[key] = getFrontmatterNestedList(frontmatterLines, "role_signoffs", key) || [];
      validateKnownRoles(roleSignoffs[key], `role_signoffs.${key}`, filePath, errors);
    });

    if (!governanceRef) {
      errors.push(`Missing governance_ref: ${filePath}`);
    } else if (governanceProfile === "custom") {
      if (!governanceRef.startsWith("project-context/")) {
        errors.push(`Custom governance_ref must still trace into project-context/: ${filePath}`);
      }
    } else if (!allowedStandardGovernanceRefs.has(governanceRef)) {
      errors.push(
        `Invalid governance_ref '${governanceRef}' in ${filePath}. Expected one of: ${[...allowedStandardGovernanceRefs].join(", ")}`
      );
    }

    if (!governanceProfile) {
      errors.push(`Missing governance_profile: ${filePath}`);
    } else if (!allowedProfiles.has(governanceProfile)) {
      errors.push(`Invalid governance_profile '${governanceProfile}' in ${filePath}`);
    }

    if (!governanceStatus) {
      errors.push(`Missing governance_status: ${filePath}`);
    } else if (!allowedStatuses.has(governanceStatus)) {
      errors.push(`Invalid governance_status '${governanceStatus}' in ${filePath}`);
    }

    if (checklistRefs == null) {
      errors.push(`Missing checklist_refs: ${filePath}`);
      checklistRefs = [];
    }

    if (["default", "strict", "regulated"].includes(governanceProfile)) {
      const expectedChecklist = expectedChecklistByProfile[governanceProfile];
      if (!checklistRefs.includes(expectedChecklist)) {
        errors.push(
          `Checklist ref '${expectedChecklist}' is required for governance_profile '${governanceProfile}': ${filePath}`
        );
      }
    } else if (governanceProfile === "custom" && checklistRefs.length < 1) {
      errors.push(`Custom governance_profile requires at least one checklist ref: ${filePath}`);
    }

    const requiredBlocks = requiredBlocksByStep[stepId] || [];
    requiredBlocks.forEach((requiredBlock) => {
      if (!hasRequiredBlock(content, requiredBlock)) {
        errors.push(`Missing required block '${requiredBlock}': ${filePath}`);
      }
    });

    const exceptionRequired = ["EXCEPTION_RECORDED", "WAIVER_APPROVED"].includes(governanceStatus);
    const exceptionIds = getExceptionIds(content);
    const exceptionSection = getMarkdownSectionContent(content, "## Governance Exceptions");
    const exceptionOwner = getSectionScalarValue(exceptionSection, "owner");
    const exceptionApprovalStatus = getSectionScalarValue(exceptionSection, "status");
    const approvedByRoles = parseRoleList(getSectionScalarValue(exceptionSection, "approved_by"));
    validateKnownRoles(approvedByRoles, "Governance Exceptions.approved_by", filePath, errors);

    if (exceptionRequired) {
      if (!hasRequiredBlock(content, "## Governance Exceptions")) {
        errors.push(`Missing required block '## Governance Exceptions': ${filePath}`);
      }

      if (exceptionIds.length < 1) {
        errors.push(`governance_status '${governanceStatus}' requires at least one exception_id: ${filePath}`);
      }
    }

    if (governanceStatus === "WAIVER_APPROVED") {
      if (!approvedByRoles.length) {
        errors.push(`WAIVER_APPROVED requires non-empty approved_by: ${filePath}`);
      }

      if (!getSectionScalarValue(exceptionSection, "review_date")) {
        errors.push(`WAIVER_APPROVED requires non-empty review_date: ${filePath}`);
      }

      if (exceptionApprovalStatus && exceptionApprovalStatus !== "APPROVED") {
        errors.push(`WAIVER_APPROVED requires Governance Exceptions.status 'APPROVED': ${filePath}`);
      }

      if (governanceProfile === "regulated" && approvedByRoles.length < 2) {
        errors.push(`regulated waiver requires at least two approver roles in approved_by: ${filePath}`);
      }

      if (governanceProfile === "regulated" && exceptionOwner && approvedByRoles.length === 1 && approvedByRoles[0] === exceptionOwner) {
        errors.push(`regulated waiver cannot be self-approved by owner '${exceptionOwner}' only: ${filePath}`);
      }

      if (roleSignoffs.release.length > 0 && !approvedByRoles.some((role) => ["devops", "qc"].includes(role))) {
        errors.push(`release-related waiver requires devops or qc in approved_by: ${filePath}`);
      }

      if (roleSignoffs.business_acceptance.length > 0 && !approvedByRoles.includes("po")) {
        errors.push(`business_acceptance-related waiver requires po in approved_by: ${filePath}`);
      }
    }

    if (governanceStatus === "EXCEPTION_RECORDED" && exceptionApprovalStatus === "APPROVED") {
      errors.push(`EXCEPTION_RECORDED cannot use Governance Exceptions.status 'APPROVED': ${filePath}`);
    }

    if (
      isFinalizedNoteStatus(noteStatus) &&
      disallowedFinalizedStatusesByStep[stepId] &&
      disallowedFinalizedStatusesByStep[stepId].has(governanceStatus)
    ) {
      errors.push(
        `Finalized note status '${noteStatus}' cannot keep governance_status '${governanceStatus}' on ${stepId}: ${filePath}`
      );
    }

    if (shouldRequireRegister(stepId, governanceProfile, governanceStatus)) {
      if (!registerContent) {
        errors.push(`Missing governance exception register at expected path: ${registerPath}`);
      } else {
        exceptionIds.forEach((exceptionId) => {
          const registerEntry = registerEntries.get(exceptionId);
          if (!registerEntry) {
            errors.push(`Exception '${exceptionId}' must appear in governance-exception-register.md: ${filePath}`);
            return;
          }

          if (registerEntry.workItem && registerEntry.workItem !== workItemSlug) {
            errors.push(
              `Register entry '${exceptionId}' must reference work item '${workItemSlug}', got '${registerEntry.workItem}': ${filePath}`
            );
          }

          if (registerEntry.step) {
            const registerSteps = registerEntry.step
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);

            if (registerSteps.length > 0 && !registerSteps.includes(stepId)) {
              errors.push(`Register entry '${exceptionId}' must include step '${stepId}': ${filePath}`);
            }
          }

          if (governanceStatus === "WAIVER_APPROVED" && !["APPROVED", "RESOLVED"].includes(registerEntry.status)) {
            errors.push(
              `WAIVER_APPROVED note requires register status APPROVED or RESOLVED for '${exceptionId}': ${filePath}`
            );
          }

          if (governanceStatus === "EXCEPTION_RECORDED" && ["REJECTED", "EXPIRED", "RESOLVED"].includes(registerEntry.status)) {
            errors.push(
              `Open exception note cannot point to register status '${registerEntry.status}' for '${exceptionId}': ${filePath}`
            );
          }
        });
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    validatedCount: matchedFiles,
    workflowRoot
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = validateWorkflowGovernance({
      workflowRoot: args["workflow-root"],
      projectRoot: args["project-root"]
    });

    if (!result.ok) {
      console.error(formatErrors(result.errors));
      process.exit(1);
    }

    console.log(`OK: validated governance for ${result.validatedCount} workflow note files under ${result.workflowRoot}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  validateWorkflowGovernance
};
