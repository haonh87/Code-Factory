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
  LIGHT_INITIAL_STEPS,
  getAllStepIds,
  getStepDefinition,
  getUpstreamStepIds,
  renderStepBody
} = require("./workflow-step-definitions");
const { syncCapabilityControl } = require("./workflow-capability-control");
const { validateWorkflowArtifactNames } = require("./validate-workflow-artifact-names");
const { validateWorkflowExecution } = require("./validate-workflow-execution");
const { validateWorkflowGovernance } = require("./validate-workflow-governance");
const { validateWorkflowPlanning } = require("./validate-workflow-planning");
const { inferDeliveryContext } = require("./work-item-protocol-utils");

const WORK_ITEM_TYPES = ["FEATURE", "BUG", "CHANGE", "REFACTOR", "RESEARCH"];
const DELIVERY_CONTEXTS = ["greenfield", "brownfield"];
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

// --- Light compact frontmatter (plan v5 §2, §3 + budget AC-03) ---
// Light chỉ giữ gate relevant cho quick/agentic/self/default: spec, dor,
// approach, task_plan, dod. Các gate N/A (contract, foundation, uat, release,
// business_acceptance) được omit; validator và gate-review snapshot default
// missing keys nên omit an toàn. approval_gates chỉ cần spec (required); phần
// còn lại default not_applicable.
const FULL_SIGNOFF_KEYS = [
  "spec",
  "contract",
  "dor",
  "approach",
  "foundation",
  "task_plan",
  "uat",
  "release",
  "business_acceptance",
  "dod"
];
const LIGHT_SIGNOFF_KEYS = ["spec", "dor", "approach", "task_plan", "dod"];
const LIGHT_APPROVAL_GATES = ["spec"];

function buildSpecRefsLines(sddMode) {
  if (sddMode === "light") {
    return ["spec_refs:", '  card: ""'];
  }
  return ["spec_refs:", '  brd: ""', '  srs: ""'];
}

function buildApprovalGatesLines(context) {
  if (context.sddMode === "light") {
    return [
      "approval_gates:",
      ...LIGHT_APPROVAL_GATES.map((gate) => `  ${gate}: "${gate === "spec" ? "required" : "not_applicable"}"`)
    ];
  }
  return [
    "approval_gates:",
    '  spec: "required"',
    `  contract: "${context.defaultApprovalGates.contract}"`,
    `  foundation: "${context.defaultApprovalGates.foundation}"`,
    '  uat: "not_applicable"',
    '  release: "not_applicable"',
    '  business_acceptance: "not_applicable"'
  ];
}

function buildRoleSignoffsLines(sddMode) {
  const keys = sddMode === "light" ? LIGHT_SIGNOFF_KEYS : FULL_SIGNOFF_KEYS;
  return ["role_signoffs:", ...keys.map((key) => `  ${key}: []`)];
}

function buildGateReviewsLines(sddMode) {
  const keys = sddMode === "light" ? LIGHT_SIGNOFF_KEYS : FULL_SIGNOFF_KEYS;
  const lines = ["gate_reviews:"];
  keys.forEach((key) => {
    lines.push(`  ${key}_reviewed_by: []`, `  ${key}_reviewed_at: ""`);
  });
  return lines;
}

function validateChoice(name, value, allowedValues) {
  if (!allowedValues.includes(value)) {
    throw new Error(`Invalid ${name} '${value}'. Allowed values: ${allowedValues.join(", ")}`);
  }
}

function getDefaultWorkflowRoot(workItemSlug) {
  return path.resolve("work-items", workItemSlug);
}

function getStepIdsFromArgs(args, sddMode) {
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

  // Light mặc định scaffold 3 note authoring (s01/s04/s06); s07/s08 tạo lazy khi
  // chuyển ACTIVE/Verify. Explicit --step/--steps vẫn override.
  if (sddMode === "light") {
    return [...LIGHT_INITIAL_STEPS];
  }

  return getAllStepIds();
}

function getDefaultUpstreamArtifacts(stepId, workItemSlug, sddMode) {
  return getUpstreamStepIds(stepId, sddMode).map((upstreamStepId) => {
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
    `delivery_context: ${context.deliveryContext}`,
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
    ...buildSpecRefsLines(context.sddMode),
    "spec_status: draft",
    `planning_track: ${context.planningTrack}`,
    `execution_mode: ${context.executionMode}`,
    // Light (agentic/self) không emit execution_roles rỗng và verification_owner
    // rỗng — planning/execution validator default missing keys nên omit an toàn.
    ...(context.sddMode === "light" ? [] : buildYamlList("execution_roles", context.executionRoles)),
    `review_mode: ${context.reviewMode}`,
    ...(context.sddMode === "light" ? [] : [`verification_owner: ${quoteYamlString(context.verificationOwner)}`]),
    ...buildApprovalGatesLines(context),
    ...buildRoleSignoffsLines(context.sddMode),
    ...buildGateReviewsLines(context.sddMode),
    ...buildYamlList("content_skills", definition.contentSkills),
    ...buildYamlList("artifact_skills", definition.artifactSkills),
    ...buildYamlList("upstream_artifacts", getDefaultUpstreamArtifacts(definition.stepId, context.workItemSlug, context.sddMode)),
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
  const projectRoot = path.resolve(normalizeSingleValue(args["project-root"]) || process.cwd());
  const deliveryContext = inferDeliveryContext(projectRoot, normalizeSingleValue(args["delivery-context"] || ""));
  const planningTrack = normalizeSingleValue(args["planning-track"] || "full");
  validateChoice("delivery-context", deliveryContext, DELIVERY_CONTEXTS);
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
    deliveryContext,
    defaultApprovalGates: {
      contract: "not_applicable",
      foundation: deliveryContext === "greenfield" ? "required" : "not_applicable"
    },
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
  const stepIds = getStepIdsFromArgs(args, context.sddMode);
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

  syncCapabilityControl({
    projectRoot,
    workflowRootBase: path.dirname(workflowRoot)
  });

  return {
    createdFiles,
    workflowRoot
  };
}

// Lazy note builder cho Light (plan v5 §2): s07 tạo khi chuyển ACTIVE, s08 tạo
// khi bắt đầu Verify. Idempotent — không ghi đè note đã tồn tại trừ khi force,
// không sinh duplicate. T4 sẽ nối builder này vào transition hooks.
function ensureLazyWorkflowNote(options) {
  const args = options.args;
  const stepId = options.stepId;
  const force = Boolean(options.force);

  const context = parseContextFromArgs(args);
  const definition = getStepDefinition(stepId);
  if (!definition) {
    throw new Error(`Unsupported step '${stepId}'.`);
  }

  const workflowRoot = path.resolve(
    normalizeSingleValue(args["workflow-root"]) || getDefaultWorkflowRoot(context.workItemSlug)
  );
  const filePath = path.join(
    workflowRoot,
    `${context.workItemSlug}.${definition.stepId}.${definition.stepSlug}.md`
  );

  if (fs.existsSync(filePath) && !force) {
    return { created: false, filePath, workflowRoot };
  }

  ensureDirectory(workflowRoot);
  const content = buildStepContent(definition, context);
  fs.writeFileSync(filePath, content, "utf8");

  return { created: true, filePath, workflowRoot };
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
  scaffoldWorkflowNotes,
  ensureLazyWorkflowNote
};
