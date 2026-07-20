const fs = require("fs");
const path = require("path");
const {
  ensureDirectory,
  formatErrors,
  parseCliArgs
} = require("./workflow-validator-utils");
const {
  CHANGE_DECISION_OWNERS,
  CHANGE_ID_PATTERN,
  CR_PROFILES,
  CR_VOCABULARIES,
  REQUIRED_CHANGE_PACKAGE_FILES,
  getDefaultChangeApprovalState,
  normalizeCrId
} = require("./workflow-change-definitions");
const { syncCapabilityControl } = require("./workflow-capability-control");

// --- Compact CR contract (plan v5 §6, T6) ---
// cr_profile=compact: một file request.md, canonical-write CR/cr_*. Chỉ dùng cho
// requirement delta low/medium risk. cr_profile=full: giữ 7-file package legacy.
const RISK_LEVELS = ["low", "medium", "high"];
// Compact eligibility violation tokens (plan §5/§6): migration/cutover/policy/
// contract/api buộc full CR. Compact chỉ dành cho requirement-only delta.
const COMPACT_VIOLATION_TOKENS = new Set([
  "migrate",
  "migration",
  "cutover",
  "backfill",
  "reindex",
  "policy",
  "contract",
  "api"
]);

// Match cả biến thể từ (M5): migrations, migrating, apis, contracts, policies...
// Stem bỏ "y"/"e" cuối rồi cho phép hậu tố y|ies|s|es|e|ing|ed — tránh miss
// đúng nhóm change mà plan bắt buộc full chỉ vì viết số nhiều/gerund.
function matchesTokenInflection(token, text) {
  let stem = token;
  if (stem.endsWith("y") || stem.endsWith("e")) {
    stem = stem.slice(0, -1);
  }
  return new RegExp(`\\b${stem}(y|ies|s|es|e|ing|ed)?\\b`).test(text);
}

function hasCompactEligibilityViolation(requestSummary, riskLevel) {
  if (riskLevel === "high") {
    return true;
  }
  const summary = String(requestSummary || "").toLowerCase();
  return [...COMPACT_VIOLATION_TOKENS].some((token) => matchesTokenInflection(token, summary));
}

function normalizeSingleValue(value) {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }

  return value;
}

function quoteYamlString(value) {
  return JSON.stringify(String(value));
}

function buildYamlList(key, values) {
  if (!values || values.length === 0) {
    return [`${key}: []`];
  }

  return [key + ":", ...values.map((value) => `  - ${quoteYamlString(value)}`)];
}

function validateChoice(name, value, allowedValues) {
  if (!allowedValues.includes(value)) {
    throw new Error(`Invalid ${name} '${value}'. Allowed values: ${allowedValues.join(", ")}`);
  }
}

function buildArtifactContent(changeId, artifactKind, extraLines = []) {
  const lines = [
    "---",
    `change_id: ${quoteYamlString(changeId)}`,
    `artifact_kind: ${quoteYamlString(artifactKind)}`,
    "status: draft",
    ...extraLines,
    "---",
    ""
  ];

  return lines.join("\n");
}

function getFileTemplate(changeId, templateContext, relativePath) {
  const {
    workItemSlug,
    decisionOwner,
    materializationRef,
    requestSummary
  } = templateContext;
  const commonLinks = workItemSlug ? [`linked_work_items:\n  - ${quoteYamlString(workItemSlug)}`] : ["linked_work_items: []"];
  const approvalDefaults = getDefaultChangeApprovalState(decisionOwner);

  switch (relativePath) {
    case "proposal.md":
      return [
        buildArtifactContent(changeId, "change-proposal", [
          `decision_owner: ${quoteYamlString(decisionOwner)}`,
          `review_required: ${approvalDefaults.review_required ? "true" : "false"}`,
          `approval_status: ${approvalDefaults.approval_status}`,
          `reviewed_by: ${quoteYamlString(approvalDefaults.reviewed_by)}`,
          `reviewed_at: ${quoteYamlString(approvalDefaults.reviewed_at)}`,
          `materialization_ref: ${quoteYamlString(materializationRef)}`,
          `request_summary: ${quoteYamlString(requestSummary)}`,
          ...buildYamlList("review_notes", approvalDefaults.review_notes),
          ...commonLinks
        ]),
        `# Change Proposal - ${changeId}`,
        "",
        "## Summary",
        "```yaml",
        'problem: ""',
        'intent: ""',
        'change_scope: ""',
        "impact_areas: []",
        "affected_specs: []",
        "```",
        "",
        "## Decision",
        "```yaml",
        "status: draft|approved|rejected|deferred",
        'owner: ""',
        "reviewers: []",
        "```",
        ""
      ].join("\n");
    case "design.md":
      return [
        buildArtifactContent(changeId, "change-design", commonLinks),
        `# Change Design - ${changeId}`,
        "",
        "## Design",
        "```yaml",
        'summary: ""',
        "technical_changes: []",
        "ux_or_runtime_changes: []",
        "risk_notes: []",
        "```",
        ""
      ].join("\n");
    case "tasks.md":
      return [
        buildArtifactContent(changeId, "change-tasks", commonLinks),
        `# Change Tasks - ${changeId}`,
        "",
        "## Tasks",
        "```yaml",
        "tasks: []",
        "dependencies: []",
        "verification_tasks: []",
        "release_tasks: []",
        "```",
        ""
      ].join("\n");
    case "spec-delta/brd.delta.md":
      return [
        buildArtifactContent(changeId, "spec-delta-brd", commonLinks),
        `# BRD Delta - ${changeId}`,
        "",
        "## Delta",
        "```yaml",
        'base_spec_ref: ""',
        "adds: []",
        "updates: []",
        "removes: []",
        "```",
        ""
      ].join("\n");
    case "spec-delta/srs.delta.md":
      return [
        buildArtifactContent(changeId, "spec-delta-srs", commonLinks),
        `# SRS Delta - ${changeId}`,
        "",
        "## Delta",
        "```yaml",
        'base_spec_ref: ""',
        "adds: []",
        "updates: []",
        "removes: []",
        "```",
        ""
      ].join("\n");
    case "execution/task-status.md":
      return [
        buildArtifactContent(changeId, "change-task-status", commonLinks),
        `# Task Status - ${changeId}`,
        "",
        "## Status",
        "```yaml",
        "task_status: []",
        "blocking_items: []",
        "next_action: \"\"",
        "```",
        ""
      ].join("\n");
    case "archive-metadata.md":
      return [
        buildArtifactContent(changeId, "change-archive-metadata", commonLinks),
        `# Archive Metadata - ${changeId}`,
        "",
        "## Archive Status",
        "```yaml",
        "archive_status: not_ready|ready_to_archive|archived",
        "verified_by: []",
        "business_acceptance: PENDING|READY|DONE|NOT_APPLICABLE",
        "release_status: PENDING|READY|DONE|NOT_APPLICABLE",
        "notes: []",
        "```",
        ""
      ].join("\n");
    default:
      throw new Error(`Unsupported change package file template: ${relativePath}`);
  }
}

function buildCompactRequestContent(changeId, context) {
  const {
    workItemSlug,
    decisionOwner,
    materializationRef,
    requestSummary,
    crStrategy,
    baseSpecVersion,
    acceptedSpecVersion
  } = context;
  const approvalDefaults = getDefaultChangeApprovalState(decisionOwner);
  const linkedWorkItems = workItemSlug ? [workItemSlug] : [];
  const lines = [
    "---",
    `cr_id: ${quoteYamlString(changeId)}`,
    "cr_profile: compact",
    "cr_status: DRAFT",
    `cr_strategy: ${quoteYamlString(crStrategy || "create_new")}`,
    'artifact_kind: "cr-request"',
    `decision_owner: ${quoteYamlString(decisionOwner)}`,
    `review_required: ${approvalDefaults.review_required ? "true" : "false"}`,
    `approval_status: ${approvalDefaults.approval_status}`,
    `reviewed_by: ${quoteYamlString(approvalDefaults.reviewed_by)}`,
    `reviewed_at: ${quoteYamlString(approvalDefaults.reviewed_at)}`,
    `materialization_ref: ${quoteYamlString(materializationRef)}`,
    `request_summary: ${quoteYamlString(requestSummary)}`,
    'defect_source: "n/a"',
    "spec_impact_classified: false",
    ...buildYamlList("linked_crs", []),
    ...buildYamlList("linked_work_items", linkedWorkItems),
    `base_spec_version: ${quoteYamlString(baseSpecVersion || "")}`,
    `accepted_spec_version: ${quoteYamlString(acceptedSpecVersion || "")}`,
    ...buildYamlList("review_notes", approvalDefaults.review_notes),
    "---",
    "",
    `# CR Request - ${changeId}`,
    "",
    "## Summary",
    "```yaml",
    'problem: ""',
    'intent: ""',
    'change_scope: ""',
    "impact_areas: []",
    "affected_specs: []",
    "```",
    "",
    "## Structured Delta",
    "```yaml",
    `base_spec_version: ${quoteYamlString(baseSpecVersion || "")}`,
    "adds: []",
    "updates: []",
    "removes: []",
    "```",
    "",
    "## Approval",
    "```yaml",
    `approval_status: ${approvalDefaults.approval_status}`,
    `reviewed_by: ${quoteYamlString(approvalDefaults.reviewed_by)}`,
    `reviewed_at: ${quoteYamlString(approvalDefaults.reviewed_at)}`,
    "```",
    "",
    "## Linked Work Items",
    "```yaml",
    ...buildYamlList("linked_work_items", linkedWorkItems),
    "```",
    "",
    "## Aggregate Coverage",
    "```yaml",
    "contributions: []",
    "all_required_done: false",
    "coverage_pass: false",
    "```",
    "",
    "## Accepted Spec Version",
    "```yaml",
    `accepted_spec_version: ${quoteYamlString(acceptedSpecVersion || "")}`,
    'provenance: ""',
    'backlink: ""',
    "```",
    ""
  ];
  return lines.join("\n");
}

function scaffoldChangePackage(options) {
  const args = options.args;
  const changeId = normalizeSingleValue(args["change-id"]);
  if (!changeId) {
    throw new Error("Missing required argument '--change-id'.");
  }

  if (!CHANGE_ID_PATTERN.test(changeId)) {
    throw new Error(`Invalid change ID '${changeId}'. Use uppercase tokens like CHANGE-001.`);
  }

  let crProfile = normalizeSingleValue(args["cr-profile"] || "full");
  validateChoice("cr-profile", crProfile, CR_PROFILES);

  const crVocabulary = normalizeSingleValue(args["cr-vocabulary"] || "dual");
  validateChoice("cr-vocabulary", crVocabulary, CR_VOCABULARIES);

  const riskLevel = normalizeSingleValue(args["risk-level"] || "");
  if (riskLevel) {
    validateChoice("risk-level", riskLevel, RISK_LEVELS);
  }

  const workItemSlug = normalizeSingleValue(args["work-item"]) || "";
  const decisionOwner = normalizeSingleValue(args["decision-owner"] || "agent");
  validateChoice("decision-owner", decisionOwner, CHANGE_DECISION_OWNERS);
  const materializationRef = normalizeSingleValue(args["materialization-ref"] || "");
  const requestSummary = normalizeSingleValue(args["request-summary"] || "");
  const baseSpecVersion = normalizeSingleValue(args["base-spec-version"] || "");
  const acceptedSpecVersion = normalizeSingleValue(args["accepted-spec-version"] || "");
  const crStrategy = normalizeSingleValue(args["cr-strategy"] || "create_new");

  // Compact eligibility (plan v5 §6, verification_hint): compact chỉ cho requirement
  // delta low/medium risk. Migration/cutover/policy/contract/api hoặc risk high buộc
  // escalate full — không silently tạo compact cho change rủi ro cao.
  let escalated = false;
  if (crProfile === "compact" && hasCompactEligibilityViolation(requestSummary, riskLevel)) {
    console.warn(
      `WARNING: compact CR eligibility violation (risk=${riskLevel || "n/a"}, summary="${requestSummary}"); escalating cr_profile to full.`
    );
    crProfile = "full";
    escalated = true;
  }

  // Compact canonical-write: normalize legacy CHANGE-### -> CR-### cho dir + cr_id.
  // Full giữ nguyên change id legacy (compatibility gate cho fixtures CHANGE-001).
  const effectiveId = crProfile === "compact" ? normalizeCrId(changeId) : changeId;
  const explicitChangeRoot = normalizeSingleValue(args["change-root"]) || "";
  const changeRoot = path.resolve(explicitChangeRoot || path.join("changes", effectiveId));
  // Chỉ redirect sang canonical dir khi (M3): compact + KHÔNG có --change-root
  // tường minh, hoặc --change-root là default path mang legacy ID (basename khớp
  // changeId gốc). --change-root custom của user phải được tôn trọng nguyên vẹn.
  const shouldRedirectToCanonical =
    crProfile === "compact" &&
    effectiveId !== changeId &&
    (!explicitChangeRoot || path.basename(changeRoot) === changeId);
  const finalChangeRoot = shouldRedirectToCanonical
    ? path.join(path.dirname(changeRoot), effectiveId)
    : changeRoot;
  const projectRoot = path.resolve(normalizeSingleValue(args["project-root"]) || path.join(finalChangeRoot, "..", ".."));
  const force = Boolean(args.force);
  const errors = [];
  const createdFiles = [];
  const templateContext = {
    workItemSlug,
    decisionOwner,
    materializationRef,
    requestSummary,
    crStrategy,
    baseSpecVersion,
    acceptedSpecVersion
  };

  if (crProfile === "compact") {
    const filePath = path.join(finalChangeRoot, "request.md");
    ensureDirectory(path.dirname(filePath));
    if (fs.existsSync(filePath) && !force) {
      throw new Error(formatErrors([`File already exists, use --force to overwrite: ${filePath}`]));
    }
    fs.writeFileSync(filePath, buildCompactRequestContent(effectiveId, templateContext), "utf8");
    createdFiles.push(filePath);
  } else {
    REQUIRED_CHANGE_PACKAGE_FILES.forEach((relativePath) => {
      const filePath = path.join(finalChangeRoot, relativePath);
      ensureDirectory(path.dirname(filePath));

      if (fs.existsSync(filePath) && !force) {
        errors.push(`File already exists, use --force to overwrite: ${filePath}`);
        return;
      }

      fs.writeFileSync(filePath, getFileTemplate(effectiveId, templateContext, relativePath), "utf8");
      createdFiles.push(filePath);
    });

    if (errors.length > 0) {
      throw new Error(formatErrors(errors));
    }
  }

  syncCapabilityControl({
    projectRoot,
    workflowRootBase: path.join(projectRoot, "work-items")
  });

  return {
    changeRoot: finalChangeRoot,
    createdFiles,
    profile: crProfile,
    escalated,
    cr_vocabulary: crVocabulary
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = scaffoldChangePackage({ args });
    console.log(
      `OK: scaffolded ${result.createdFiles.length} change package file(s) under ${result.changeRoot} (cr_profile=${result.profile}${result.escalated ? ", escalated" : ""})`
    );
    result.createdFiles.forEach((filePath) => console.log(filePath));
  } catch (error) {
    console.error(error.message.startsWith("ERROR:") ? error.message : `ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  scaffoldChangePackage
};
