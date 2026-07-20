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
const { loadChangeProposalState, resolveChangePaths } = require("./change-item-utils");
const {
  reconcileCrAggregate,
  validateCrAggregateAcceptance
} = require("./cr-aggregate-reconcile");
const {
  ARCHIVE_STATUSES,
  CHANGE_APPROVAL_GATE_PASSED,
  CHANGE_APPROVAL_STATUSES,
  CHANGE_DECISION_OWNERS,
  CHANGE_ID_PATTERN,
  CHANGE_STATUSES,
  CR_EXCEPTIONAL_STATUSES,
  CR_STATUSES,
  REQUIRED_CHANGE_PACKAGE_FILES,
  normalizeCrId
} = require("./workflow-change-definitions");

const filePattern =
  /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.md$/;
const allowedChangeStatuses = new Set(CHANGE_STATUSES);
// Exceptional terminal states (REJECTED/CANCELLED/SUPERSEDED) là cr_status hợp
// lệ (M4): một CR bị hủy phải biểu diễn được mà không fail validation.
const allowedCrStatuses = new Set([...CR_STATUSES, ...CR_EXCEPTIONAL_STATUSES]);
const exceptionalCrStatuses = new Set(CR_EXCEPTIONAL_STATUSES);
const allowedArchiveStatuses = new Set(ARCHIVE_STATUSES);
const allowedChangeApprovalStatuses = new Set(CHANGE_APPROVAL_STATUSES);
const allowedChangeDecisionOwners = new Set(CHANGE_DECISION_OWNERS);

function validateChangeProposalReviewState(changeState, proposalPath, workflowFilePath, workItemSlug, changeStatus, errors, profile = "full") {
  // Compact dùng cr_status (DRAFT uppercase); full dùng change_status (draft lowercase).
  const draftStatus = profile === "compact" ? "DRAFT" : "draft";
  const displayId = changeState.cr_id || changeState.change_id;

  if (!allowedChangeDecisionOwners.has(changeState.decision_owner)) {
    errors.push(`Invalid decision_owner '${changeState.decision_owner}' in ${proposalPath}`);
  }

  if (!allowedChangeApprovalStatuses.has(changeState.approval_status)) {
    errors.push(`Invalid approval_status '${changeState.approval_status}' in ${proposalPath}`);
  }

  if (changeState.review_required && changeState.approval_status === "NOT_REQUIRED") {
    errors.push(`review_required=true cannot use approval_status=NOT_REQUIRED in ${proposalPath}`);
  }

  if (!changeState.review_required) {
    errors.push(`review_required must stay true in ${proposalPath}`);
  }

  if (changeState.approval_status === "NOT_REQUIRED") {
    errors.push(`approval_status=NOT_REQUIRED is not allowed in ${proposalPath}`);
  }

  if (["APPROVED", "REJECTED"].includes(changeState.approval_status)) {
    if (!changeState.reviewed_by) {
      errors.push(`approval_status=${changeState.approval_status} requires reviewed_by in ${proposalPath}`);
    }
    if (!changeState.reviewed_at) {
      errors.push(`approval_status=${changeState.approval_status} requires reviewed_at in ${proposalPath}`);
    }
  }

  // Exceptional terminal states (compact): REJECTED/CANCELLED/SUPERSEDED là
  // trạng thái đóng hợp lệ, không phải tiến trình vượt gate — miễn rule
  // gate-passed và rule "rejected phải ở DRAFT" (M4).
  const isExceptionalTerminal =
    profile === "compact" && CR_EXCEPTIONAL_STATUSES.includes(changeStatus);

  if (
    !isExceptionalTerminal &&
    changeStatus !== draftStatus &&
    !CHANGE_APPROVAL_GATE_PASSED.has(changeState.approval_status)
  ) {
    errors.push(
      `Change '${displayId}' cannot use ${profile === "compact" ? "cr_status" : "change_status"}='${changeStatus}' in ${workflowFilePath} while approval_status=${changeState.approval_status}`
    );
  }

  if (
    !isExceptionalTerminal &&
    changeState.approval_status === "REJECTED" &&
    changeStatus !== draftStatus
  ) {
    errors.push(`Rejected change '${displayId}' must stay at ${profile === "compact" ? "cr_status='DRAFT'" : "change_status='draft'"}: ${workflowFilePath}`);
  }

  if (changeState.linked_work_items.length > 0 && !changeState.linked_work_items.includes(workItemSlug)) {
    errors.push(
      `Change proposal ${proposalPath} must link current work item '${workItemSlug}' when used by ${workflowFilePath}`
    );
  }
}

function validateChangePackageFrontmatter(filePath, changeId, errors) {
  const frontmatterLines = getFrontmatterLines(filePath);
  if (!frontmatterLines) {
    errors.push(`Missing or invalid YAML frontmatter in change package file: ${filePath}`);
    return;
  }

  const declaredChangeId = getFrontmatterValue(frontmatterLines, "change_id") || getFrontmatterValue(frontmatterLines, "cr_id");
  // Normalize cả hai vế (M2): sau migrate, package mang cr_id CR-### trong khi
  // note cũ còn change_id CHANGE-### — cùng một CR, không được báo mismatch.
  if (normalizeCrId(declaredChangeId) !== normalizeCrId(changeId)) {
    errors.push(`Change package file must declare change_id '${changeId}': ${filePath}`);
  }
}

function validateCompactRequestFrontmatter(filePath, canonicalId, errors) {
  const frontmatterLines = getFrontmatterLines(filePath);
  if (!frontmatterLines) {
    errors.push(`Missing or invalid YAML frontmatter in compact CR request: ${filePath}`);
    return;
  }
  const declaredCrId = getFrontmatterValue(frontmatterLines, "cr_id");
  if (declaredCrId !== canonicalId) {
    errors.push(`Compact CR request must declare cr_id '${canonicalId}': ${filePath}`);
  }
  // request.md tự khai cr_status; giá trị ngoài lifecycle vocab phải fail (m9)
  // thay vì lọt qua và làm aggregate validator hiểu nhầm trạng thái.
  const declaredCrStatus = getFrontmatterValue(frontmatterLines, "cr_status");
  if (!declaredCrStatus || !allowedCrStatuses.has(declaredCrStatus)) {
    errors.push(`Compact CR request has invalid cr_status '${declaredCrStatus || ""}' in ${filePath}`);
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

    // Dual-read canonical/legacy (plan v5 §5, T6). Canonical (cr_*) thắng khi
    // note khai cả hai (m9): legacy chỉ là fallback trong migration window.
    const rawChangeId = getFrontmatterValue(frontmatterLines, "cr_id") || getFrontmatterValue(frontmatterLines, "change_id");
    const changeId = rawChangeId;
    const changeStatus =
      getFrontmatterValue(frontmatterLines, "cr_status") || getFrontmatterValue(frontmatterLines, "change_status");
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

    // Phát hiện profile qua physical layout: request.md -> compact, proposal.md/7-file -> full.
    const paths = resolveChangePaths({ projectRoot, changeId });
    const isCompact = paths.profile === "compact";
    const canonicalId = normalizeCrId(changeId);

    if (isCompact) {
      if (!allowedCrStatuses.has(changeStatus)) {
        errors.push(`Invalid cr_status '${changeStatus || ""}' in ${filePath}`);
      }
    } else {
      if (!changeStatus || !allowedChangeStatuses.has(changeStatus)) {
        errors.push(`Invalid change_status '${changeStatus || ""}' in ${filePath}`);
      }
      if (!archiveStatus || !allowedArchiveStatuses.has(archiveStatus)) {
        errors.push(`Invalid archive_status '${archiveStatus || ""}' in ${filePath}`);
      }
    }

    if (!fs.existsSync(paths.changeRoot) || !fs.existsSync(paths.proposalPath)) {
      errors.push(`Missing change package ${isCompact ? "request.md" : "root"} for '${changeId}': ${paths.changeRoot}`);
      continue;
    }

    seenChangeIds.add(changeId);

    if (isCompact) {
      validateCompactRequestFrontmatter(paths.proposalPath, canonicalId, errors);
    } else {
      REQUIRED_CHANGE_PACKAGE_FILES.forEach((relativePath) => {
        const fullPath = path.join(paths.changeRoot, relativePath);
        if (!fs.existsSync(fullPath)) {
          errors.push(`Missing required change package file '${relativePath}' for ${changeId}: ${filePath}`);
          return;
        }
        validateChangePackageFrontmatter(fullPath, changeId, errors);
      });
    }

    try {
      const loadedChange = loadChangeProposalState({ projectRoot, changeId });
      validateChangeProposalReviewState(
        loadedChange.state,
        loadedChange.proposalPath,
        filePath,
        match.groups.work_item_slug,
        changeStatus,
        errors,
        paths.profile
      );
    } catch (error) {
      errors.push(error.message);
    }

    // T7 (plan v5 §7, F-14, BR-05): compact CR aggregate reconciliation + atomic
    // ACCEPTED spec bump. ACCEPTED chỉ hợp lệ khi tất cả required work item DONE,
    // coverage_pass, và spec card đã bump atomic. VERIFIED không được bump sớm.
    if (isCompact) {
      try {
        // workflowRootBase = cha của thư mục work item đang validate (m3: tôn
        // trọng --workflow-root tùy biến thay vì hardcode work-items/).
        const reconciled = reconcileCrAggregate({
          projectRoot,
          changeId,
          workflowRootBase: path.dirname(path.dirname(filePath))
        });
        validateCrAggregateAcceptance(reconciled).forEach((err) => errors.push(err));
      } catch (error) {
        errors.push(error.message);
      }
    }

    specDeltaRefs.forEach((specDeltaRef) => {
      const resolved = path.resolve(projectRoot, specDeltaRef);
      if (!resolved.startsWith(projectRoot) || !fs.existsSync(resolved)) {
        errors.push(`Missing spec_delta_ref '${specDeltaRef}' in ${filePath}`);
      }
    });

    // archive_status + verified/archived gate chỉ áp dụng full (compact dùng cr_status lifecycle).
    if (!isCompact) {
      if (changeStatus === "verified" && archiveStatus === "not_ready") {
        errors.push(`Verified change should not stay at archive_status 'not_ready': ${filePath}`);
      }

      if (changeStatus === "archived" && archiveStatus !== "archived") {
        errors.push(`Archived change must use archive_status 'archived': ${filePath}`);
      }
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
