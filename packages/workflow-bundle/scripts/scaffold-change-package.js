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
  REQUIRED_CHANGE_PACKAGE_FILES,
  getDefaultChangeApprovalState
} = require("./workflow-change-definitions");

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

function scaffoldChangePackage(options) {
  const args = options.args;
  const changeId = normalizeSingleValue(args["change-id"]);
  if (!changeId) {
    throw new Error("Missing required argument '--change-id'.");
  }

  if (!CHANGE_ID_PATTERN.test(changeId)) {
    throw new Error(`Invalid change ID '${changeId}'. Use uppercase tokens like CHANGE-001.`);
  }

  const workItemSlug = normalizeSingleValue(args["work-item"]) || "";
  const decisionOwner = normalizeSingleValue(args["decision-owner"] || "agent");
  validateChoice("decision-owner", decisionOwner, CHANGE_DECISION_OWNERS);
  const materializationRef = normalizeSingleValue(args["materialization-ref"] || "");
  const requestSummary = normalizeSingleValue(args["request-summary"] || "");
  const changeRoot = path.resolve(normalizeSingleValue(args["change-root"]) || path.join("changes", changeId));
  const force = Boolean(args.force);
  const errors = [];
  const createdFiles = [];
  const templateContext = {
    workItemSlug,
    decisionOwner,
    materializationRef,
    requestSummary
  };

  REQUIRED_CHANGE_PACKAGE_FILES.forEach((relativePath) => {
    const filePath = path.join(changeRoot, relativePath);
    ensureDirectory(path.dirname(filePath));

    if (fs.existsSync(filePath) && !force) {
      errors.push(`File already exists, use --force to overwrite: ${filePath}`);
      return;
    }

    fs.writeFileSync(filePath, getFileTemplate(changeId, templateContext, relativePath), "utf8");
    createdFiles.push(filePath);
  });

  if (errors.length > 0) {
    throw new Error(formatErrors(errors));
  }

  return {
    changeRoot,
    createdFiles
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = scaffoldChangePackage({ args });
    console.log(`OK: scaffolded ${result.createdFiles.length} change package file(s) under ${result.changeRoot}`);
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
