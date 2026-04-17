const fs = require("fs");
const path = require("path");
const {
  ensureDirectory,
  formatErrors,
  normalizeYamlScalar,
  parseCliArgs
} = require("./workflow-validator-utils");
const {
  GOVERNANCE_PROFILES,
  GOVERNANCE_STATUSES,
  getChecklistRefs,
  getGovernanceRef,
  normalizeToArray
} = require("./workflow-governance-definitions");
const {
  ARCHIVE_STATUSES,
  CHANGE_ID_PATTERN,
  CHANGE_STATUSES
} = require("./workflow-change-definitions");
const {
  EXECUTION_MODES,
  REVIEW_MODES,
  getRequiredExecutionArtifacts,
  renderExecutionArtifactBody
} = require("./workflow-execution-definitions");
const {
  PLANNING_TRACKS,
  getPlanningDefaults
} = require("./workflow-planning-definitions");
const { SDD_MODES } = require("./workflow-sdd-definitions");
const {
  getAllStepIds,
  getStepDefinition,
  renderStepBody
} = require("./workflow-step-definitions");
const { validateWorkflowArtifactNames } = require("./validate-workflow-artifact-names");
const { validateWorkflowExecution } = require("./validate-workflow-execution");
const { validateWorkflowGovernance } = require("./validate-workflow-governance");
const { validateWorkflowPlanning } = require("./validate-workflow-planning");

const WORK_ITEM_TYPES = ["FEATURE", "BUG", "CHANGE", "REFACTOR", "RESEARCH"];
const WORK_ITEM_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeSingleValue(value) {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }

  return value;
}

function quoteYamlString(value) {
  return JSON.stringify(String(value));
}

function buildYamlList(key, values, indent = "") {
  if (!values || values.length === 0) {
    return [`${indent}${key}: []`];
  }

  return [
    `${indent}${key}:`,
    ...values.map((value) => `${indent}  - ${quoteYamlString(value)}`)
  ];
}

function validateChoice(name, value, allowedValues) {
  if (!allowedValues.includes(value)) {
    throw new Error(`Invalid ${name} '${value}'. Allowed values: ${allowedValues.join(", ")}`);
  }
}

function getDefaultWorkflowRoot(workItemSlug) {
  return path.resolve("work-items", workItemSlug);
}

function getStepIdsFromArgs(args) {
  const singleStep = normalizeSingleValue(args.step);
  const stepList = normalizeSingleValue(args.steps);

  if (singleStep && stepList) {
    throw new Error("Use either --step or --steps, not both.");
  }

  if (singleStep) {
    return [singleStep];
  }

  if (stepList) {
    return stepList
      .split(",")
      .map((stepId) => stepId.trim())
      .filter(Boolean);
  }

  return getAllStepIds();
}

function getDefaultUpstreamArtifacts(stepId, workItemSlug) {
  const refsByStep = {
    s01: [],
    s02: ["s01"],
    s03: ["s01", "s02"],
    s04: ["s01", "s02", "s03"],
    s05: ["s04"],
    s06: ["s05"],
    s07: ["s06"],
    s08: ["s07"]
  };

  return (refsByStep[stepId] || []).map((upstreamStepId) => {
    const upstreamDefinition = getStepDefinition(upstreamStepId);
    return `${workItemSlug}.${upstreamDefinition.stepId}.${upstreamDefinition.stepSlug}.md`;
  });
}

function buildFrontmatter(definition, context) {
  const lines = [
    "---",
    `artifact_id: ${quoteYamlString(`${context.workItemSlug}.${definition.stepId}.${definition.stepSlug}`)}`,
    "artifact_family: workflow-step",
    `work_item_slug: ${quoteYamlString(context.workItemSlug)}`,
    `step_id: ${quoteYamlString(definition.stepId)}`,
    `step_slug: ${quoteYamlString(definition.stepSlug)}`,
    `workflow_stage: ${definition.workflowStage}`,
    `work_item_type: ${context.workItemType}`,
    "artifact_role: primary",
    "artifact_kind: primary-note",
    "source_of_truth: true",
    "status: draft",
    `governance_ref: ${quoteYamlString(context.governanceRef)}`,
    `governance_profile: ${context.governanceProfile}`,
    `governance_status: ${context.governanceStatus}`,
    ...buildYamlList("checklist_refs", context.checklistRefs),
    `change_id: ${quoteYamlString(context.changeId)}`,
    `change_status: ${context.changeStatus}`,
    ...buildYamlList("spec_delta_refs", context.specDeltaRefs),
    `archive_status: ${context.archiveStatus}`,
    `sdd_mode: ${context.sddMode}`,
    "spec_refs:",
    '  brd: ""',
    '  srs: ""',
    "spec_status: draft",
    `planning_track: ${context.planningTrack}`,
    `execution_mode: ${context.executionMode}`,
    ...buildYamlList("execution_roles", context.executionRoles),
    `review_mode: ${context.reviewMode}`,
    `verification_owner: ${quoteYamlString(context.verificationOwner)}`,
    "role_signoffs:",
    "  dor: []",
    "  approach: []",
    "  release: []",
    "  business_acceptance: []",
    "  dod: []",
    ...buildYamlList("content_skills", definition.contentSkills),
    ...buildYamlList("artifact_skills", definition.artifactSkills),
    ...buildYamlList("upstream_artifacts", getDefaultUpstreamArtifacts(definition.stepId, context.workItemSlug)),
    ...buildYamlList("linked_artifacts", getDefaultLinkedArtifacts(definition.stepId, context)),
    ...buildYamlList("tags", ["agent-ops", `workflow/${definition.stepId}`]),
    "---"
  ];

  return lines.join("\n");
}

function getDefaultLinkedArtifacts(stepId, context) {
  return getRequiredExecutionArtifacts(stepId, context.executionMode).map(
    (artifact) => `${context.workItemSlug}.${artifact.stepId}.${artifact.stepSlug}.md`
  );
}

function buildStepContent(definition, context) {
  return `${buildFrontmatter(definition, context)}\n\n${renderStepBody(definition, context)}\n`;
}

function parseContextFromArgs(args) {
  const workItemSlug = normalizeSingleValue(args["work-item"]);
  if (!workItemSlug) {
    throw new Error("Missing required argument '--work-item'.");
  }

  if (!WORK_ITEM_PATTERN.test(workItemSlug)) {
    throw new Error(`Invalid work item slug '${workItemSlug}'. Use kebab-case [a-z0-9-].`);
  }

  const workItemType = normalizeSingleValue(args["work-item-type"] || "FEATURE");
  const planningTrack = normalizeSingleValue(args["planning-track"] || "full");
  validateChoice("planning-track", planningTrack, PLANNING_TRACKS);
  const planningDefaults = getPlanningDefaults(planningTrack);
  const governanceProfile = normalizeSingleValue(args["governance-profile"] || planningDefaults.governanceProfile);
  const governanceStatus = normalizeSingleValue(args["governance-status"] || "CHECKS_PENDING");
  const sddMode = normalizeSingleValue(args["sdd-mode"] || planningDefaults.sddMode);
  const executionMode = normalizeSingleValue(args["execution-mode"] || planningDefaults.executionMode);
  const reviewMode = normalizeSingleValue(
    args["review-mode"] || (executionMode === "multi_agent" ? "independent" : planningDefaults.reviewMode)
  );
  const verificationOwner = normalizeYamlScalar(normalizeSingleValue(args["verification-owner"] || ""));
  const executionRoles = normalizeToArray(args["execution-role"]).map((item) => normalizeYamlScalar(item));
  const governanceRef = normalizeSingleValue(args["governance-ref"]);
  const changeId = normalizeSingleValue(args["change-id"] || "");
  const changeStatus = normalizeSingleValue(args["change-status"] || "draft");
  const archiveStatus = normalizeSingleValue(args["archive-status"] || "not_ready");
  const specDeltaRefs = normalizeToArray(args["spec-delta-ref"]).map((item) => normalizeYamlScalar(item));
  const checklistRefsArg = normalizeToArray(args["checklist-ref"]).map((item) => normalizeYamlScalar(item));

  validateChoice("work-item-type", workItemType, WORK_ITEM_TYPES);
  validateChoice("governance-profile", governanceProfile, GOVERNANCE_PROFILES);
  validateChoice("governance-status", governanceStatus, GOVERNANCE_STATUSES);
  validateChoice("sdd-mode", sddMode, SDD_MODES);
  validateChoice("execution-mode", executionMode, EXECUTION_MODES);
  validateChoice("review-mode", reviewMode, REVIEW_MODES);
  validateChoice("change-status", changeStatus, CHANGE_STATUSES);
  validateChoice("archive-status", archiveStatus, ARCHIVE_STATUSES);

  if (executionMode === "multi_agent" && executionRoles.length < 2) {
    throw new Error("multi_agent execution requires at least two '--execution-role' values.");
  }

  const finalVerificationOwner =
    verificationOwner || (reviewMode !== "self" || executionMode === "multi_agent" ? planningDefaults.verificationOwner : "");

  if (reviewMode !== "self" && !finalVerificationOwner) {
    throw new Error("review_mode other than 'self' requires '--verification-owner'.");
  }

  if (changeId && !CHANGE_ID_PATTERN.test(changeId)) {
    throw new Error(`Invalid change-id '${changeId}'. Use uppercase tokens like CHANGE-001.`);
  }

  if (!changeId && specDeltaRefs.length > 0) {
    throw new Error("Spec delta refs require '--change-id'.");
  }

  if (!changeId && changeStatus !== "draft") {
    throw new Error("Custom change-status requires '--change-id'.");
  }

  if (!changeId && archiveStatus !== "not_ready") {
    throw new Error("Custom archive-status requires '--change-id'.");
  }

  if (governanceProfile === "custom") {
    if (!governanceRef) {
      throw new Error("Custom governance profile requires '--governance-ref'.");
    }

    if (checklistRefsArg.length < 1) {
      throw new Error("Custom governance profile requires at least one '--checklist-ref'.");
    }
  }

  return {
    planningTrack,
    workItemSlug,
    workItemType,
    governanceProfile,
    governanceStatus,
    governanceRef: getGovernanceRef(governanceProfile, governanceRef),
    checklistRefs: getChecklistRefs(governanceProfile, checklistRefsArg),
    changeId,
    changeStatus,
    specDeltaRefs,
    archiveStatus,
    sddMode,
    executionMode,
    executionRoles,
    reviewMode,
    verificationOwner: finalVerificationOwner
  };
}

function scaffoldWorkflowNotes(options) {
  const args = options.args;
  const context = parseContextFromArgs(args);
  const stepIds = getStepIdsFromArgs(args);
  const workflowRoot = path.resolve(
    normalizeSingleValue(args["workflow-root"]) || getDefaultWorkflowRoot(context.workItemSlug)
  );
  const projectRoot = path.resolve(normalizeSingleValue(args["project-root"]) || process.cwd());
  const force = Boolean(args.force);
  const createdFiles = [];
  const errors = [];

  stepIds.forEach((stepId) => {
    const definition = getStepDefinition(stepId);
    if (!definition) {
      errors.push(`Unsupported step '${stepId}'.`);
    }
  });

  if (errors.length > 0) {
    throw new Error(formatErrors(errors));
  }

  ensureDirectory(workflowRoot);

  stepIds.forEach((stepId) => {
    const definition = getStepDefinition(stepId);
    const filePath = path.join(
      workflowRoot,
      `${context.workItemSlug}.${definition.stepId}.${definition.stepSlug}.md`
    );

    if (fs.existsSync(filePath) && !force) {
      errors.push(`File already exists, use --force to overwrite: ${filePath}`);
      return;
    }

    const content = buildStepContent(definition, context);
    fs.writeFileSync(filePath, content, "utf8");
    createdFiles.push(filePath);

    const runtimeArtifacts = getRequiredExecutionArtifacts(stepId, context.executionMode);
    runtimeArtifacts.forEach((artifact) => {
      const runtimeFilePath = path.join(
        workflowRoot,
        `${context.workItemSlug}.${artifact.stepId}.${artifact.stepSlug}.md`
      );

      if (fs.existsSync(runtimeFilePath) && !force) {
        errors.push(`File already exists, use --force to overwrite: ${runtimeFilePath}`);
        return;
      }

      const runtimeContent = renderExecutionArtifactBody(artifact, context);
      fs.writeFileSync(runtimeFilePath, runtimeContent, "utf8");
      createdFiles.push(runtimeFilePath);
    });
  });

  if (errors.length > 0) {
    throw new Error(formatErrors(errors));
  }

  const namingResult = validateWorkflowArtifactNames({ workflowRoot });
  const governanceResult = validateWorkflowGovernance({ workflowRoot, projectRoot });
  const executionResult =
    context.executionMode === "multi_agent" ? validateWorkflowExecution({ workflowRoot }) : { errors: [] };
  const planningResult = validateWorkflowPlanning({ workflowRoot });
  const validationErrors = [
    ...namingResult.errors,
    ...governanceResult.errors,
    ...executionResult.errors,
    ...planningResult.errors
  ];

  if (validationErrors.length > 0) {
    throw new Error(formatErrors(validationErrors));
  }

  return {
    createdFiles,
    workflowRoot
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  if (args["single-step"] && !args.step) {
    console.error("ERROR: '--single-step' requires '--step <sNN>'.");
    process.exit(1);
  }

  try {
    const result = scaffoldWorkflowNotes({ args });
    console.log(`OK: scaffolded ${result.createdFiles.length} workflow note file(s) under ${result.workflowRoot}`);
    result.createdFiles.forEach((filePath) => {
      console.log(filePath);
    });
    console.log(
      "Next: edit nội dung rồi chạy `npm run validate:workflow -- --workflow-root <workflow-root> --project-root <repo-root>`; nếu có SDD/change/multi_agent thì chạy thêm validator chuyên biệt tương ứng."
    );
  } catch (error) {
    console.error(error.message.startsWith("ERROR:") ? error.message : `ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  scaffoldWorkflowNotes
};
