const path = require("path");
const fs = require("fs");
const {
  collectFilesRecursive,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterList,
  getFrontmatterNestedList,
  getFrontmatterNestedValue,
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
const {
  APPROVAL_GATE_KEYS,
  SIGNOFF_KEYS,
  countYamlListItemsInSection,
  getApprovalGateDefault,
  getRequiredFinalizedGateKeys,
  getSectionScalarValue
} = require("./workflow-gate-evidence-utils");

const filePattern =
  /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.md$/;
const allowedProfiles = new Set(GOVERNANCE_PROFILES);
const allowedStatuses = new Set(GOVERNANCE_STATUSES);
const allowedRoles = new Set(GOVERNANCE_ROLES);
const allowedRegisterStatuses = new Set(EXCEPTION_REGISTER_STATUSES);
const allowedStandardGovernanceRefs = new Set(STANDARD_GOVERNANCE_REFS);
const expectedChecklistByProfile = CHECKLIST_BY_PROFILE;
const allowedDeliveryContexts = new Set(["greenfield", "brownfield"]);
const allowedApprovalGateStates = new Set(["required", "not_applicable"]);
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
const allowedBehaviorChangeStates = new Set(["YES", "NO"]);
const allowedTddStates = new Set(["DONE", "NOT_REQUIRED", "EXCEPTION"]);
const allowedChangeRiskProfiles = new Set(["QUICK_FIX", "STANDARD", "LARGE_OR_RISKY"]);
const allowedWorktreeStates = new Set(["USED", "NOT_REQUIRED", "SKIPPED_WITH_REASON"]);
const allowedReviewStates = new Set(["COMPLETED", "PARTIAL", "BLOCKED"]);
const allowedReviewVerdicts = new Set(["PASS", "FAIL", "PARTIAL", "NOT_RUN"]);
const allowedDelegationModes = new Set(["agentic", "multi_agent", "subagent", "sequential_multi_role"]);
const allowedIndependenceStates = new Set(["PASS", "FAIL", "NOT_APPLICABLE"]);

function hasRequiredBlock(fileContent, blockHeading) {
  const pattern = new RegExp(`^${escapeRegExp(blockHeading)}\\s*$`, "m");
  return pattern.test(fileContent);
}

function getExceptionIds(fileContent) {
  return [...fileContent.matchAll(/^\s*exception_id:\s*["']?([A-Z0-9-]+)["']?\s*$/gm)].map((match) => match[1]);
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

function getGateReviewFieldName(signoffKey, suffix) {
  return `${signoffKey}_reviewed_${suffix}`;
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

function hasYamlScalarValue(sectionContent, fieldName) {
  return Boolean(getSectionScalarValue(sectionContent, fieldName));
}

function validateWorkflowGovernance(options) {
  const workflowRoot = resolveExistingPath(options.workflowRoot, "workflow-root");
  const projectRoot = resolveExistingPath(options.projectRoot || process.cwd(), "project-root");
  const registerPath = path.join(projectRoot, "project-context", "governance-exception-register.md");
  const files = collectFilesRecursive(workflowRoot, new Set([".md"]));
  const errors = [];
  const workItemDeliveryContextMap = new Map();
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
    const rawDeliveryContext = getFrontmatterValue(frontmatterLines, "delivery_context");
    const deliveryContext = rawDeliveryContext || "brownfield";
    const noteStatus = getFrontmatterValue(frontmatterLines, "status") || "draft";
    const sddMode = getFrontmatterValue(frontmatterLines, "sdd_mode") || "none";

    if (!allowedDeliveryContexts.has(deliveryContext)) {
      errors.push(`Invalid delivery_context '${deliveryContext}' in ${filePath}`);
    }

    if (isFinalizedNoteStatus(noteStatus) && !rawDeliveryContext) {
      errors.push(`Finalized note requires explicit delivery_context: ${filePath}`);
    }

    const existingDeliveryContext = workItemDeliveryContextMap.get(workItemSlug);
    if (!existingDeliveryContext) {
      workItemDeliveryContextMap.set(workItemSlug, deliveryContext);
    } else if (existingDeliveryContext !== deliveryContext) {
      errors.push(`Inconsistent delivery_context within work item '${workItemSlug}': ${filePath}`);
    }

    let checklistRefs = getFrontmatterList(frontmatterLines, "checklist_refs");
    const specStatus = getFrontmatterValue(frontmatterLines, "spec_status") || "draft";
    const approvalGates = {};
    const roleSignoffs = {};
    const gateReviews = {};
    APPROVAL_GATE_KEYS.forEach((key) => {
      approvalGates[key] = getFrontmatterNestedValue(frontmatterLines, "approval_gates", key) || getApprovalGateDefault(key);
      if (!allowedApprovalGateStates.has(approvalGates[key])) {
        errors.push(`Invalid approval_gates.${key} '${approvalGates[key]}' in ${filePath}`);
      }
    });

    // Light không hỗ trợ foundation/contract gate (plan v5 §3, AC-06): required
    // là hard trigger buộc escalate full — phải fail rõ, không silent skip (S2,
    // "no silent skipped invariant").
    if (sddMode === "light") {
      ["foundation", "contract"].forEach((gateKey) => {
        if (approvalGates[gateKey] === "required") {
          errors.push(
            `sdd_mode=light does not support approval_gates.${gateKey}=required; escalate the work item to sdd_mode=none/strict (full profile): ${filePath}`
          );
        }
      });
    }
    SIGNOFF_KEYS.forEach((key) => {
      roleSignoffs[key] = getFrontmatterNestedList(frontmatterLines, "role_signoffs", key) || [];
      validateKnownRoles(roleSignoffs[key], `role_signoffs.${key}`, filePath, errors);

      const reviewedByField = getGateReviewFieldName(key, "by");
      const reviewedAtField = getGateReviewFieldName(key, "at");
      gateReviews[key] = {
        reviewedBy: getFrontmatterNestedList(frontmatterLines, "gate_reviews", reviewedByField) || [],
        reviewedAt: getFrontmatterNestedValue(frontmatterLines, "gate_reviews", reviewedAtField) || ""
      };
      validateKnownRoles(gateReviews[key].reviewedBy, `gate_reviews.${reviewedByField}`, filePath, errors);

      if (gateReviews[key].reviewedBy.length > 0 || gateReviews[key].reviewedAt) {
        if (gateReviews[key].reviewedBy.length < 1) {
          errors.push(`gate_reviews.${reviewedByField} is required when gate_reviews.${reviewedAtField} is set: ${filePath}`);
        }
        if (!gateReviews[key].reviewedAt) {
          errors.push(`gate_reviews.${reviewedAtField} is required when gate_reviews.${reviewedByField} is set: ${filePath}`);
        }
      }

      const unauthorizedReviewers = gateReviews[key].reviewedBy.filter((role) => !roleSignoffs[key].includes(role));
      if (unauthorizedReviewers.length > 0) {
        errors.push(
          `gate_reviews.${reviewedByField} must be a subset of role_signoffs.${key}; got [${unauthorizedReviewers.join(", ")}] in ${filePath}`
        );
      }
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

    if (isFinalizedNoteStatus(noteStatus)) {
      const requiredSignoffs = getRequiredFinalizedGateKeys(stepId, approvalGates, sddMode);
      requiredSignoffs.forEach((key) => {
        const reviewedByField = getGateReviewFieldName(key, "by");
        const reviewedAtField = getGateReviewFieldName(key, "at");
        if (roleSignoffs[key].length < 1) {
          errors.push(`Finalized ${stepId} note requires non-empty role_signoffs.${key}: ${filePath}`);
        }
        if (gateReviews[key].reviewedBy.length < 1) {
          errors.push(`Finalized ${stepId} note requires non-empty gate_reviews.${reviewedByField}: ${filePath}`);
        }
        if (!gateReviews[key].reviewedAt) {
          errors.push(`Finalized ${stepId} note requires non-empty gate_reviews.${reviewedAtField}: ${filePath}`);
        }
      });

      if (stepId === "s04" && approvalGates.spec === "required") {
        if (!["approved", "frozen"].includes(specStatus)) {
          errors.push(`Finalized s04 note with approval_gates.spec=required must use spec_status approved|frozen: ${filePath}`);
        }

        // Light dùng Spec Card (spec_refs.card) thay Requirement Baseline; SDD
        // validator lo semantic REQ/AC mapping. Non-light vẫn giữ Requirement Baseline.
        const specBaselineBlock = sddMode === "light" ? "## Spec Freeze" : "## Requirement Baseline";
        if (!hasRequiredBlock(content, specBaselineBlock)) {
          errors.push(`Finalized s04 note with approval_gates.spec=required requires '${specBaselineBlock}': ${filePath}`);
        }
      }

      if (stepId === "s04" && approvalGates.contract === "required" && !hasRequiredBlock(content, "## Contract Baseline")) {
        errors.push(`Finalized s04 note with approval_gates.contract=required requires '## Contract Baseline': ${filePath}`);
      }

      if (stepId === "s05") {
        const optionAnalysisSection = getMarkdownSectionContent(content, "## Option Analysis");
        const optionCount = countYamlListItemsInSection(optionAnalysisSection, "options");
        if (optionCount < 2 || optionCount > 3) {
          errors.push(`Finalized s05 note requires 2-3 options in '## Option Analysis'; got ${optionCount}: ${filePath}`);
        }
        if (!hasYamlScalarValue(optionAnalysisSection, "recommended_option")) {
          errors.push(`Finalized s05 note requires non-empty recommended_option in '## Option Analysis': ${filePath}`);
        }
      }

      // Light host s05 invariants (Option Analysis) tại s06 vì s05 không tồn tại.
      if (stepId === "s06" && sddMode === "light") {
        const lightOptionSection = getMarkdownSectionContent(content, "## Option Analysis");
        const lightOptionCount = countYamlListItemsInSection(lightOptionSection, "options");
        if (lightOptionCount < 2 || lightOptionCount > 3) {
          errors.push(`Finalized light s06 note requires 2-3 options in '## Option Analysis'; got ${lightOptionCount}: ${filePath}`);
        }
        if (!hasYamlScalarValue(lightOptionSection, "recommended_option")) {
          errors.push(`Finalized light s06 note requires non-empty recommended_option in '## Option Analysis': ${filePath}`);
        }
      }

      if (stepId === "s05" && approvalGates.foundation === "required" && !hasRequiredBlock(content, "## Foundation Decision")) {
        errors.push(`Finalized s05 note with approval_gates.foundation=required requires '## Foundation Decision': ${filePath}`);
      }

      if (stepId === "s05" && deliveryContext === "greenfield" && approvalGates.foundation !== "required") {
        errors.push(`Finalized greenfield s05 note requires approval_gates.foundation=required: ${filePath}`);
      }

      if (stepId === "s08" && approvalGates.uat === "required" && !hasRequiredBlock(content, "## UAT Summary")) {
        errors.push(`Finalized s08 note with approval_gates.uat=required requires '## UAT Summary': ${filePath}`);
      }

      if (stepId === "s08" && approvalGates.release === "required" && !hasRequiredBlock(content, "## Release Summary")) {
        errors.push(`Finalized s08 note with approval_gates.release=required requires '## Release Summary': ${filePath}`);
      }

      if (
        stepId === "s08" &&
        approvalGates.business_acceptance === "required" &&
        !hasRequiredBlock(content, "## Business Acceptance Summary")
      ) {
        errors.push(
          `Finalized s08 note with approval_gates.business_acceptance=required requires '## Business Acceptance Summary': ${filePath}`
        );
      }

      if (deliveryContext === "brownfield") {
        if (stepId === "s04" && !hasRequiredBlock(content, "## Existing System Baseline")) {
          errors.push(`Finalized brownfield s04 note requires '## Existing System Baseline': ${filePath}`);
        }
        if (stepId === "s05" && !hasRequiredBlock(content, "## Brownfield Impact Analysis")) {
          errors.push(`Finalized brownfield s05 note requires '## Brownfield Impact Analysis': ${filePath}`);
        }
        // Light host Brownfield Impact Analysis tại s06 (s05 không tồn tại).
        if (stepId === "s06" && sddMode === "light" && !hasRequiredBlock(content, "## Brownfield Impact Analysis")) {
          errors.push(`Finalized brownfield light s06 note requires '## Brownfield Impact Analysis': ${filePath}`);
        }
        if (stepId === "s06" && !hasRequiredBlock(content, "## Brownfield Delivery Plan")) {
          errors.push(`Finalized brownfield s06 note requires '## Brownfield Delivery Plan': ${filePath}`);
        }
        if (stepId === "s08" && !hasRequiredBlock(content, "## Regression & Compatibility Summary")) {
          errors.push(`Finalized brownfield s08 note requires '## Regression & Compatibility Summary': ${filePath}`);
        }
      }

      if (stepId === "s07") {
        if (!hasRequiredBlock(content, "## Delivery Rule Evidence")) {
          errors.push(`Finalized s07 note requires '## Delivery Rule Evidence': ${filePath}`);
        } else {
          const deliveryRuleSection = getMarkdownSectionContent(content, "## Delivery Rule Evidence");
          const behaviorChange = getSectionScalarValue(deliveryRuleSection, "behavior_change");
          const tddStatus = getSectionScalarValue(deliveryRuleSection, "tdd_status");
          const changeRiskProfile = getSectionScalarValue(deliveryRuleSection, "change_risk_profile");
          const worktreeStatus = getSectionScalarValue(deliveryRuleSection, "worktree_status");
          const reviewStatus = getSectionScalarValue(deliveryRuleSection, "review_status");
          const specComplianceStatus = getSectionScalarValue(deliveryRuleSection, "spec_compliance_status");
          const codeQualityStatus = getSectionScalarValue(deliveryRuleSection, "code_quality_status");
          const delegationMode = getSectionScalarValue(deliveryRuleSection, "delegation_mode");
          const independenceStatus = getSectionScalarValue(deliveryRuleSection, "independence_status");
          const tddTestRefs = countYamlListItemsInSection(deliveryRuleSection, "tdd_test_refs");
          const tddAlternativeVerifyPath = countYamlListItemsInSection(deliveryRuleSection, "tdd_alternative_verify_path");
          const worktreeRefs = countYamlListItemsInSection(deliveryRuleSection, "worktree_refs");
          const reviewRefs = countYamlListItemsInSection(deliveryRuleSection, "review_refs");
          const independenceRefs = countYamlListItemsInSection(deliveryRuleSection, "independence_refs");
          const verifyPathCount = countYamlListItemsInSection(deliveryRuleSection, "verify_path");
          const tddExceptionReason = getSectionScalarValue(deliveryRuleSection, "tdd_exception_reason");
          const worktreeReason = getSectionScalarValue(deliveryRuleSection, "worktree_reason");
          const mergePath = getSectionScalarValue(deliveryRuleSection, "merge_path");
          const executionMode = getFrontmatterValue(frontmatterLines, "execution_mode") || "agentic";

          if (!allowedBehaviorChangeStates.has(behaviorChange)) {
            errors.push(`Invalid behavior_change '${behaviorChange}' in '## Delivery Rule Evidence': ${filePath}`);
          }

          if (!allowedTddStates.has(tddStatus)) {
            errors.push(`Invalid tdd_status '${tddStatus}' in '## Delivery Rule Evidence': ${filePath}`);
          }

          if (behaviorChange === "YES" && tddStatus === "NOT_REQUIRED") {
            errors.push(`behavior_change=YES cannot use tdd_status=NOT_REQUIRED in ${filePath}`);
          }

          if (tddStatus === "DONE" && tddTestRefs < 1) {
            errors.push(`tdd_status=DONE requires non-empty tdd_test_refs in ${filePath}`);
          }

          if (tddStatus === "EXCEPTION") {
            if (!tddExceptionReason) {
              errors.push(`tdd_status=EXCEPTION requires tdd_exception_reason in ${filePath}`);
            }
            if (tddAlternativeVerifyPath < 1) {
              errors.push(`tdd_status=EXCEPTION requires tdd_alternative_verify_path in ${filePath}`);
            }
          }

          if (!allowedChangeRiskProfiles.has(changeRiskProfile)) {
            errors.push(`Invalid change_risk_profile '${changeRiskProfile}' in '## Delivery Rule Evidence': ${filePath}`);
          }

          if (!allowedWorktreeStates.has(worktreeStatus)) {
            errors.push(`Invalid worktree_status '${worktreeStatus}' in '## Delivery Rule Evidence': ${filePath}`);
          }

          if (changeRiskProfile === "LARGE_OR_RISKY" && worktreeStatus === "NOT_REQUIRED") {
            errors.push(`change_risk_profile=LARGE_OR_RISKY cannot use worktree_status=NOT_REQUIRED in ${filePath}`);
          }

          if (worktreeStatus === "USED" && worktreeRefs < 1) {
            errors.push(`worktree_status=USED requires non-empty worktree_refs in ${filePath}`);
          }

          if (worktreeStatus === "SKIPPED_WITH_REASON" && !worktreeReason) {
            errors.push(`worktree_status=SKIPPED_WITH_REASON requires worktree_reason in ${filePath}`);
          }

          if (!allowedReviewStates.has(reviewStatus)) {
            errors.push(`Invalid review_status '${reviewStatus}' in '## Delivery Rule Evidence': ${filePath}`);
          }

          if (!allowedReviewVerdicts.has(specComplianceStatus)) {
            errors.push(`Invalid spec_compliance_status '${specComplianceStatus}' in '## Delivery Rule Evidence': ${filePath}`);
          }

          if (!allowedReviewVerdicts.has(codeQualityStatus)) {
            errors.push(`Invalid code_quality_status '${codeQualityStatus}' in '## Delivery Rule Evidence': ${filePath}`);
          }

          if (specComplianceStatus === "NOT_RUN") {
            errors.push(`spec_compliance_status must not be NOT_RUN in finalized s07 note: ${filePath}`);
          }

          if (reviewStatus === "COMPLETED") {
            if (codeQualityStatus === "NOT_RUN") {
              errors.push(`review_status=COMPLETED requires code_quality_status to be executed in ${filePath}`);
            }
            if (reviewRefs < 1) {
              errors.push(`review_status=COMPLETED requires non-empty review_refs in ${filePath}`);
            }
          }

          if (reviewStatus === "PARTIAL" && reviewRefs < 1) {
            errors.push(`review_status=PARTIAL requires non-empty review_refs in ${filePath}`);
          }

          if (codeQualityStatus !== "NOT_RUN" && specComplianceStatus === "NOT_RUN") {
            errors.push(`code_quality_status cannot run before spec_compliance_status in ${filePath}`);
          }

          if (!allowedDelegationModes.has(delegationMode)) {
            errors.push(`Invalid delegation_mode '${delegationMode}' in '## Delivery Rule Evidence': ${filePath}`);
          }

          if (!allowedIndependenceStates.has(independenceStatus)) {
            errors.push(`Invalid independence_status '${independenceStatus}' in '## Delivery Rule Evidence': ${filePath}`);
          }

          if (executionMode === "multi_agent" && delegationMode !== "multi_agent") {
            errors.push(`execution_mode=multi_agent requires delegation_mode=multi_agent in ${filePath}`);
          }

          if (executionMode !== "multi_agent" && delegationMode === "multi_agent") {
            errors.push(`delegation_mode=multi_agent requires execution_mode=multi_agent in ${filePath}`);
          }

          if (["multi_agent", "subagent"].includes(delegationMode)) {
            if (independenceStatus !== "PASS") {
              errors.push(`delegation_mode=${delegationMode} requires independence_status=PASS in ${filePath}`);
            }
            if (independenceRefs < 1) {
              errors.push(`delegation_mode=${delegationMode} requires non-empty independence_refs in ${filePath}`);
            }
            if (!mergePath) {
              errors.push(`delegation_mode=${delegationMode} requires merge_path in ${filePath}`);
            }
            if (verifyPathCount < 1) {
              errors.push(`delegation_mode=${delegationMode} requires verify_path in ${filePath}`);
            }
          }

          if (delegationMode === "sequential_multi_role" && verifyPathCount < 1) {
            errors.push(`delegation_mode=sequential_multi_role requires verify_path in ${filePath}`);
          }

          if (delegationMode === "agentic" && independenceStatus === "FAIL") {
            errors.push(`delegation_mode=agentic cannot use independence_status=FAIL in ${filePath}`);
          }
        }
      }
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
