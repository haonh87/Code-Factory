// T7 (plan v5 §7, F-08, F-14, BR-05): CR aggregate reconciliation + atomic
// ACCEPTED spec bump.
//
// Mỗi s08 chỉ phát một `cr_coverage_contribution` cho scope work item của nó. CR
// aggregator kiểm:
//   - tất cả required linked work item đã DONE (protocol_status DONE|ARCHIVED);
//   - approved requirement delta đều có task/test/evidence (qua contribution);
//   - không có FAIL|PARTIAL|UNTESTED chưa được waive;
//   - accepted spec update là atomic và ghi provenance/backlink.
//
// Chỉ cr_status=ACCEPTED mới được atomic merge delta + bump current spec version
// (BR-05/F-14). VERIFIED chỉ chứng minh technical implementation; một work item
// không tự ACCEPT toàn bộ CR khi còn required work item khác.
//
// Reconciliation chỉ áp dụng cho cr_profile=compact (một file request.md với các
// block Aggregate Coverage + Accepted Spec Version). cr_profile=full giữ
// package 7 file và được chi phối bởi process nặng hơn -> aggregate N/A.

const fs = require("fs");
const path = require("path");
const {
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
  extractYamlFence,
  parseScalarFromYaml
} = require("./validate-workflow-sdd");
const {
  loadChangeProposalState,
  resolveChangePaths
} = require("./change-item-utils");
const { loadProtocolReport } = require("./work-item-protocol-utils");
const { buildCrMismatchMetric } = require("./workflow-telemetry");
const {
  CR_STATUSES,
  CR_EXCEPTIONAL_STATUSES,
  CR_ACCEPTED_SPEC_MERGE,
  normalizeCrId
} = require("./workflow-change-definitions");

const COVERAGE_STATUSES = ["PASS", "FAIL", "PARTIAL", "UNTESTED"];
const COVERAGE_FAILURE_STATUSES = new Set(["FAIL", "PARTIAL", "UNTESTED"]);
// Work item được coi "done" khi protocol_status đạt DONE hoặc đã ARCHIVED (past DONE).
const DONE_PROTOCOL_STATUSES = new Set(["DONE", "ARCHIVED"]);
const S08_FILE_PATTERN = /\.s08\.[a-z-]+\.md$/;

function isTruthyFlag(value) {
  return value === "true" || value === true;
}

function parseCoverageContributionSection(s08Path) {
  const content = readUtf8(s08Path);
  const section = getMarkdownSectionContent(content, "## CR Coverage Contribution");
  if (!section) {
    return null;
  }
  const yaml = extractYamlFence(section);
  if (!yaml) {
    return null;
  }
  return {
    cr_id: parseScalarFromYaml(yaml, "cr_id") || "",
    work_item_slug: parseScalarFromYaml(yaml, "work_item_slug") || "",
    coverage_status: parseScalarFromYaml(yaml, "coverage_status") || "",
    waived: isTruthyFlag(parseScalarFromYaml(yaml, "waived")),
    waiver_reason: parseScalarFromYaml(yaml, "waiver_reason") || "",
    contributes_to: parseScalarFromYaml(yaml, "contributes_to") || "",
    source_file: s08Path
  };
}

// Ưu tiên note s08 có artifact_role: primary (source-of-truth). Draft/secondary
// chỉ được dùng khi không có primary nào (m10: tránh stale draft sort trước
// theo alphabet chiếm chỗ nguồn contribution).
function findS08Note(workflowRoot, workItemSlug) {
  if (!fs.existsSync(workflowRoot)) {
    return null;
  }
  const candidates = fs
    .readdirSync(workflowRoot)
    .filter((name) => name.startsWith(`${workItemSlug}.s08.`) && S08_FILE_PATTERN.test(name))
    .map((name) => path.join(workflowRoot, name))
    .sort();
  const primary = candidates.find((filePath) => {
    const frontmatterLines = getFrontmatterLines(filePath);
    return frontmatterLines && getFrontmatterValue(frontmatterLines, "artifact_role") === "primary";
  });
  return primary || candidates[0] || null;
}

function readCrAggregateBlocks(requestPath) {
  const content = readUtf8(requestPath);
  const coverageYaml = extractYamlFence(getMarkdownSectionContent(content, "## Aggregate Coverage"));
  const acceptedYaml = extractYamlFence(getMarkdownSectionContent(content, "## Accepted Spec Version"));
  return {
    contributions: parseCoverageContributionsList(coverageYaml),
    all_required_done: isTruthyFlag(parseScalarFromYaml(coverageYaml, "all_required_done")),
    coverage_pass: isTruthyFlag(parseScalarFromYaml(coverageYaml, "coverage_pass")),
    accepted_spec_version: parseScalarFromYaml(acceptedYaml, "accepted_spec_version") || "",
    provenance: parseScalarFromYaml(acceptedYaml, "provenance") || "",
    backlink: parseScalarFromYaml(acceptedYaml, "backlink") || ""
  };
}

// Parse list-of-objects dạng:
//   contributions:
//     - work_item_slug: alpha
//       coverage_status: PASS
//       waived: false
function parseCoverageContributionsList(yamlText) {
  if (!yamlText) {
    return [];
  }
  const lines = yamlText.split(/\r?\n/);
  const items = [];
  let inList = false;
  let current = null;
  const finalize = () => {
    if (current) {
      items.push(current);
      current = null;
    }
  };
  for (const line of lines) {
    if (!inList) {
      if (/^contributions:\s*$/.test(line)) {
        inList = true;
      }
      continue;
    }
    const itemMatch = line.match(/^\s{2,}-\s+([\w-]+):\s*(.*)$/);
    if (itemMatch) {
      finalize();
      current = {};
      current[itemMatch[1]] = normalizeScalar(itemMatch[2]);
      continue;
    }
    const fieldMatch = line.match(/^\s{4,}([\w-]+):\s*(.*)$/);
    if (fieldMatch && current) {
      current[fieldMatch[1]] = normalizeScalar(fieldMatch[2]);
      continue;
    }
    if (/^\s*$/.test(line) || /^\s*#/.test(line)) {
      continue;
    }
    if (/^\S/.test(line)) {
      inList = false;
      finalize();
    }
  }
  finalize();
  return items;
}

function normalizeScalar(raw) {
  if (raw == null) {
    return "";
  }
  const value = String(raw).trim();
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return value.replace(/^["']|["']$/g, "");
}

function resolveWorkItemDone(projectRoot, workItemSlug, workflowRootBase) {
  try {
    const loaded = loadProtocolReport({
      projectRoot,
      workflowRootBase: workflowRootBase || path.join(projectRoot, "work-items"),
      workItemSlug,
      allowBootstrap: false
    });
    return {
      done: DONE_PROTOCOL_STATUSES.has(loaded.report.protocol_status),
      protocol_status: loaded.report.protocol_status
    };
  } catch (_error) {
    // Missing report -> không coi done; reconcile sẽ ghi thiếu contribution/DONE.
    return { done: false, protocol_status: "MISSING" };
  }
}

function reconcileCrAggregate({ projectRoot, changeId, workflowRootBase, recorder }) {
  const canonicalId = normalizeCrId(changeId);
  const resolvedWorkflowRootBase = workflowRootBase || path.join(projectRoot, "work-items");
  const paths = resolveChangePaths({ projectRoot, changeId: canonicalId });
  const profile = paths.profile || "full";

  // Full CR không có block aggregate trong request.md -> N/A.
  if (profile !== "compact") {
    return {
      cr_id: canonicalId,
      profile,
      aggregate_applicable: false,
      linked_work_items: [],
      contributions: [],
      missing_contributions: [],
      unwaived_failures: [],
      incomplete_work_items: [],
      all_required_done: false,
      coverage_pass: false,
      accepted_spec_version: "",
      provenance: "",
      backlink: "",
      spec_card_path: "",
      spec_card_version: "",
      cr_status: "",
      can_accept: false,
      errors: []
    };
  }

  const loaded = loadChangeProposalState({ projectRoot, changeId: canonicalId });
  const state = loaded.state;
  const linkedWorkItems = Array.isArray(state.linked_work_items) ? state.linked_work_items : [];
  const crStatus = state.cr_status || state.change_status || "";

  const blocks = readCrAggregateBlocks(loaded.proposalPath);

  // Thu thập contribution từ s08 của mỗi linked work item.
  const contributions = [];
  const missingContributions = [];
  const unwaivedFailures = [];
  const incompleteWorkItems = [];

  linkedWorkItems.forEach((slug) => {
    const workflowRoot = path.join(resolvedWorkflowRootBase, slug);
    const s08Path = findS08Note(workflowRoot, slug);
    if (!s08Path) {
      missingContributions.push(slug);
      incompleteWorkItems.push(slug);
      return;
    }
    const contribution = parseCoverageContributionSection(s08Path);
    // Contribution chỉ thuộc CR này khi cr_id khớp (legacy alias qua normalizeCrId).
    // Contribution của CR khác = thiếu contribution cho CR này, và KHÔNG được
    // tính coverage failure của nó vào CR này (m1: tránh mis-attribution).
    const ownContribution =
      contribution && (!contribution.cr_id || normalizeCrId(contribution.cr_id) === canonicalId)
        ? contribution
        : null;
    if (!ownContribution) {
      missingContributions.push(slug);
    } else {
      contributions.push(ownContribution);
    }

    const doneState = resolveWorkItemDone(projectRoot, slug, resolvedWorkflowRootBase);
    if (!doneState.done) {
      incompleteWorkItems.push(slug);
    }

    if (
      ownContribution &&
      COVERAGE_FAILURE_STATUSES.has(ownContribution.coverage_status) &&
      !ownContribution.waived
    ) {
      unwaivedFailures.push({
        work_item_slug: slug,
        coverage_status: ownContribution.coverage_status,
        source_file: s08Path
      });
    }
  });

  const allRequiredDone = incompleteWorkItems.length === 0 && missingContributions.length === 0;
  const coveragePass = unwaivedFailures.length === 0 && missingContributions.length === 0;

  // Spec card resolution cho atomic bump check.
  let specCardPath = "";
  let specCardVersion = "";
  if (blocks.backlink) {
    const resolved = path.resolve(projectRoot, blocks.backlink);
    // So với projectRoot + sep để tránh prefix-collision (/a/b vs /a/bc).
    if (resolved.startsWith(path.resolve(projectRoot) + path.sep) && fs.existsSync(resolved)) {
      specCardPath = resolved;
      const cardFm = getFrontmatterLines(resolved);
      if (cardFm) {
        specCardVersion = getFrontmatterValue(cardFm, "spec_version") || "";
      }
    }
  }

  const canAccept =
    allRequiredDone && coveragePass && linkedWorkItems.length > 0;

  const reconciled = {
    cr_id: canonicalId,
    profile,
    aggregate_applicable: true,
    linked_work_items: linkedWorkItems,
    contributions,
    missing_contributions: missingContributions,
    unwaived_failures: unwaivedFailures,
    incomplete_work_items: incompleteWorkItems,
    all_required_done: allRequiredDone,
    coverage_pass: coveragePass,
    accepted_spec_version: blocks.accepted_spec_version,
    provenance: blocks.provenance,
    backlink: blocks.backlink,
    spec_card_path: specCardPath,
    spec_card_version: specCardVersion,
    cr_status: crStatus,
    can_accept: canAccept,
    errors: []
  };

  // R3: emit CR reconciliation mismatch metric nếu caller truyền recorder (opt-in
  // telemetry). Không truyền recorder -> noop, backward compatible.
  if (recorder && typeof recorder.recordCrReconciliationMismatch === "function") {
    recorder.recordCrReconciliationMismatch(buildCrMismatchMetric(reconciled));
  }

  return reconciled;
}

// validateCrAggregateAcceptance: chốt rule gate theo cr_status (T7b).
// - ACCEPTED và ARCHIVED (hậu-ACCEPTED trong lifecycle): phải có
//   accepted_spec_version, provenance == cr_id, backlink tồn tại trong project
//   root, spec card spec_version == accepted_spec_version (atomic bump đã xảy
//   ra), tất cả required work item DONE + coverage_pass, và có >= 1 linked work
//   item (M1: không cho ACCEPT CR rỗng).
// - REJECTED/CANCELLED/SUPERSEDED (exceptional terminal): không enforce bump —
//   record đóng bất thường, spec không merge từ CR này.
// - VERIFIED (chưa ACCEPTED): accepted_spec_version phải rỗng (chưa bump).
// - DRAFT/APPROVED/IMPLEMENTING: accepted_spec_version phải rỗng.
// Trả mảng error string.
function validateCrAggregateAcceptance(reconciled) {
  const errors = [];
  if (!reconciled || !reconciled.aggregate_applicable) {
    return errors;
  }
  const status = reconciled.cr_status;
  // ARCHIVED đi sau ACCEPTED trong normal lifecycle -> giữ nguyên invariant
  // của ACCEPTED (bump đã hợp lệ), không coi là premature (B1).
  const isAccepted = CR_ACCEPTED_SPEC_MERGE.has(status) || status === "ARCHIVED";
  const isVerified = status === "VERIFIED";
  const isExceptional = CR_EXCEPTIONAL_STATUSES.includes(status);

  if (isExceptional) {
    return errors;
  }

  if (isAccepted) {
    if (reconciled.linked_work_items.length === 0) {
      errors.push(
        `CR '${reconciled.cr_id}' cr_status=${status} requires at least one linked work item (cannot accept an empty CR)`
      );
    }
    if (!reconciled.accepted_spec_version) {
      errors.push(
        `CR '${reconciled.cr_id}' cr_status=${status} requires accepted_spec_version in ${reconciled.cr_id}/request.md`
      );
    }
    if (reconciled.provenance !== reconciled.cr_id) {
      errors.push(
        `CR '${reconciled.cr_id}' cr_status=${status} requires provenance='${reconciled.cr_id}' but got '${reconciled.provenance}'`
      );
    }
    if (!reconciled.backlink) {
      errors.push(`CR '${reconciled.cr_id}' cr_status=${status} requires backlink to spec card`);
    } else if (!reconciled.spec_card_path) {
      errors.push(
        `CR '${reconciled.cr_id}' cr_status=${status} backlink '${reconciled.backlink}' does not resolve to an existing spec card within project root`
      );
    } else if (
      reconciled.accepted_spec_version &&
      reconciled.spec_card_version &&
      reconciled.spec_card_version !== reconciled.accepted_spec_version
    ) {
      errors.push(
        `CR '${reconciled.cr_id}' cr_status=${status} atomic spec bump not applied: spec card spec_version='${reconciled.spec_card_version}' != accepted_spec_version='${reconciled.accepted_spec_version}'`
      );
    }
    if (!reconciled.all_required_done) {
      errors.push(
        `CR '${reconciled.cr_id}' cannot be ACCEPTED while required work item(s) not DONE: ${reconciled.incomplete_work_items.join(", ")}`
      );
    }
    if (!reconciled.coverage_pass) {
      if (reconciled.unwaived_failures.length > 0) {
        errors.push(
          `CR '${reconciled.cr_id}' cannot be ACCEPTED with un-waived coverage failure(s): ${reconciled.unwaived_failures
            .map((f) => `${f.work_item_slug}=${f.coverage_status}`)
            .join(", ")}`
        );
      }
      if (reconciled.missing_contributions.length > 0) {
        errors.push(
          `CR '${reconciled.cr_id}' cannot be ACCEPTED with missing contribution(s): ${reconciled.missing_contributions.join(", ")}`
        );
      }
    }
  } else if (isVerified) {
    // VERIFIED chỉ chứng minh implementation; spec chưa bump đến khi ACCEPTED.
    if (reconciled.accepted_spec_version) {
      errors.push(
        `CR '${reconciled.cr_id}' cr_status=VERIFIED must not set accepted_spec_version before ACCEPTED (got '${reconciled.accepted_spec_version}')`
      );
    }
  } else {
    // Trạng thái trước VERIFIED: chưa được bump.
    if (reconciled.accepted_spec_version) {
      errors.push(
        `CR '${reconciled.cr_id}' cr_status=${status} must not set accepted_spec_version (only ACCEPTED merges spec; got '${reconciled.accepted_spec_version}')`
      );
    }
  }
  return errors;
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));
  try {
    const changeId = args["change-id"];
    if (!changeId) {
      throw new Error("Missing required argument '--change-id'.");
    }
    const projectRoot = path.resolve(args["project-root"] || process.cwd());
    const reconciled = reconcileCrAggregate({ projectRoot, changeId });
    const acceptanceErrors = validateCrAggregateAcceptance(reconciled);
    const allErrors = [...reconciled.errors, ...acceptanceErrors];

    if (allErrors.length > 0) {
      console.error(formatErrors(allErrors));
      process.exit(1);
    }

    const summary = [
      `OK: CR '${reconciled.cr_id}' aggregate`,
      `profile=${reconciled.profile}`,
      `cr_status=${reconciled.cr_status}`,
      `linked=${reconciled.linked_work_items.length}`,
      `contributions=${reconciled.contributions.length}`,
      `missing=${reconciled.missing_contributions.length}`,
      `unwaived_failures=${reconciled.unwaived_failures.length}`,
      `all_required_done=${reconciled.all_required_done ? "true" : "false"}`,
      `coverage_pass=${reconciled.coverage_pass ? "true" : "false"}`,
      `can_accept=${reconciled.can_accept ? "true" : "false"}`,
      `accepted_spec_version=${reconciled.accepted_spec_version || ""}`
    ].join(" | ");
    console.log(summary);
    console.log(JSON.stringify(reconciled, null, 2));
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  reconcileCrAggregate,
  validateCrAggregateAcceptance,
  parseCoverageContributionSection,
  readCrAggregateBlocks,
  runCli
};