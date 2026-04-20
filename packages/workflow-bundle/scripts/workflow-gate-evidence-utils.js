const fs = require("fs");
const path = require("path");
const {
  getFrontmatterLines,
  getFrontmatterNestedList,
  getFrontmatterNestedValue,
  getFrontmatterValue,
  getMarkdownSectionContent,
  readUtf8
} = require("./workflow-validator-utils");

const STEP_NOTE_SLUGS = {
  s01: "restate",
  s02: "business-goal",
  s03: "open-questions",
  s04: "acceptance-criteria",
  s05: "technical-approach",
  s06: "task-breakdown",
  s07: "implementation",
  s08: "verification"
};

const SIGNOFF_KEYS = [
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

const APPROVAL_GATE_KEYS = ["spec", "contract", "foundation", "uat", "release", "business_acceptance"];

const REQUIRED_FINALIZED_SIGNOFF_BY_STEP = {
  s04: ["spec", "dor"],
  s05: ["approach"],
  s06: ["task_plan"],
  s08: ["dod"]
};

function getApprovalGateDefault(key) {
  return key === "spec" ? "required" : "not_applicable";
}

function getRequiredFinalizedGateKeys(stepId, approvalGates) {
  const required = [...(REQUIRED_FINALIZED_SIGNOFF_BY_STEP[stepId] || [])];

  if (stepId === "s04" && approvalGates.contract === "required") {
    required.push("contract");
  }

  if (stepId === "s05" && approvalGates.foundation === "required") {
    required.push("foundation");
  }

  if (stepId === "s08") {
    if (approvalGates.uat === "required") {
      required.push("uat");
    }

    if (approvalGates.release === "required") {
      required.push("release");
    }

    if (approvalGates.business_acceptance === "required") {
      required.push("business_acceptance");
    }
  }

  return [...new Set(required)];
}

function getWorkflowStepNotePath(workflowRoot, workItemSlug, stepId) {
  const stepSlug = STEP_NOTE_SLUGS[stepId];
  if (!stepSlug) {
    throw new Error(`Unsupported workflow step '${stepId}'.`);
  }

  return path.join(workflowRoot, `${workItemSlug}.${stepId}.${stepSlug}.md`);
}

function getSectionScalarValue(sectionContent, fieldName) {
  if (!sectionContent) {
    return "";
  }

  const escapedField = fieldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^\\s*${escapedField}:\\s*["']?([^"']+?)["']?\\s*$`, "m");
  const match = sectionContent.match(pattern);
  return match && match[1] ? match[1].trim() : "";
}

function countYamlListItemsInSection(sectionContent, key) {
  if (!sectionContent) {
    return 0;
  }

  const lines = sectionContent.split(/\r?\n/);
  let foundKey = false;
  let count = 0;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line === "```" || line.startsWith("```")) {
      continue;
    }

    if (!foundKey) {
      if (line === `${key}:`) {
        foundKey = true;
      }
      continue;
    }

    if (/^-\s+/.test(line)) {
      count += 1;
      continue;
    }

    if (/^[A-Za-z0-9_]+:\s*/.test(line)) {
      break;
    }
  }

  return count;
}

function buildDefaultApprovalGates() {
  return Object.fromEntries(APPROVAL_GATE_KEYS.map((key) => [key, getApprovalGateDefault(key)]));
}

function loadWorkflowStepGateSnapshot({ workflowRoot, workItemSlug, stepId }) {
  const filePath = getWorkflowStepNotePath(workflowRoot, workItemSlug, stepId);
  if (!fs.existsSync(filePath)) {
    return {
      exists: false,
      filePath,
      frontmatterLines: null,
      content: "",
      status: "",
      specStatus: "",
      deliveryContext: "",
      approvalGates: buildDefaultApprovalGates(),
      roleSignoffs: Object.fromEntries(SIGNOFF_KEYS.map((key) => [key, []])),
      gateReviews: Object.fromEntries(
        SIGNOFF_KEYS.map((key) => [
          key,
          {
            reviewedBy: [],
            reviewedAt: ""
          }
        ])
      )
    };
  }

  const content = readUtf8(filePath);
  const frontmatterLines = getFrontmatterLines(filePath);
  if (!frontmatterLines) {
    return {
      exists: true,
      filePath,
      frontmatterLines: null,
      content,
      status: "",
      specStatus: "",
      deliveryContext: "",
      approvalGates: buildDefaultApprovalGates(),
      roleSignoffs: Object.fromEntries(SIGNOFF_KEYS.map((key) => [key, []])),
      gateReviews: Object.fromEntries(
        SIGNOFF_KEYS.map((key) => [
          key,
          {
            reviewedBy: [],
            reviewedAt: ""
          }
        ])
      )
    };
  }

  const approvalGates = buildDefaultApprovalGates();
  APPROVAL_GATE_KEYS.forEach((key) => {
    approvalGates[key] = getFrontmatterNestedValue(frontmatterLines, "approval_gates", key) || getApprovalGateDefault(key);
  });

  const roleSignoffs = {};
  const gateReviews = {};
  SIGNOFF_KEYS.forEach((key) => {
    roleSignoffs[key] = getFrontmatterNestedList(frontmatterLines, "role_signoffs", key) || [];
    gateReviews[key] = {
      reviewedBy: getFrontmatterNestedList(frontmatterLines, "gate_reviews", `${key}_reviewed_by`) || [],
      reviewedAt: getFrontmatterNestedValue(frontmatterLines, "gate_reviews", `${key}_reviewed_at`) || ""
    };
  });

  return {
    exists: true,
    filePath,
    frontmatterLines,
    content,
    status: getFrontmatterValue(frontmatterLines, "status") || "draft",
    specStatus: getFrontmatterValue(frontmatterLines, "spec_status") || "draft",
    deliveryContext: getFrontmatterValue(frontmatterLines, "delivery_context") || "brownfield",
    approvalGates,
    roleSignoffs,
    gateReviews
  };
}

function getMissingGateEvidenceErrors(snapshot, requiredKeys) {
  const errors = [];

  if (!snapshot.exists) {
    return [`Missing required workflow step note: ${snapshot.filePath}`];
  }

  if (!snapshot.frontmatterLines) {
    return [`Missing or invalid YAML frontmatter: ${snapshot.filePath}`];
  }

  if (!snapshot.status || snapshot.status === "draft") {
    errors.push(`Required workflow gate note must be reviewed or finalized before protocol transition: ${snapshot.filePath}`);
  }

  requiredKeys.forEach((key) => {
    if ((snapshot.roleSignoffs[key] || []).length < 1) {
      errors.push(`Missing role_signoffs.${key} in ${snapshot.filePath}`);
    }

    if ((snapshot.gateReviews[key] && snapshot.gateReviews[key].reviewedBy.length) < 1) {
      errors.push(`Missing gate_reviews.${key}_reviewed_by in ${snapshot.filePath}`);
    }

    if (!snapshot.gateReviews[key] || !snapshot.gateReviews[key].reviewedAt) {
      errors.push(`Missing gate_reviews.${key}_reviewed_at in ${snapshot.filePath}`);
    }
  });

  if (requiredKeys.includes("spec") && !["approved", "frozen"].includes(snapshot.specStatus)) {
    errors.push(`spec_status must be approved|frozen before protocol transition: ${snapshot.filePath}`);
  }

  return errors;
}

function getProtocolStepGateErrors({ workflowRoot, workItemSlug, toStatus }) {
  const errors = [];

  if (!workflowRoot) {
    return ["Missing workflow_root for protocol-managed work item."];
  }

  if (["ACTIVE", "VERIFIED", "DONE", "ARCHIVED"].includes(toStatus)) {
    ["s04", "s05", "s06"].forEach((stepId) => {
      const snapshot = loadWorkflowStepGateSnapshot({
        workflowRoot,
        workItemSlug,
        stepId
      });
      errors.push(...getMissingGateEvidenceErrors(snapshot, getRequiredFinalizedGateKeys(stepId, snapshot.approvalGates)));
    });
  }

  if (["VERIFIED", "DONE", "ARCHIVED"].includes(toStatus)) {
    const s08Path = getWorkflowStepNotePath(workflowRoot, workItemSlug, "s08");
    if (!fs.existsSync(s08Path)) {
      errors.push(`Missing required workflow step note: ${s08Path}`);
    }
  }

  if (["DONE", "ARCHIVED"].includes(toStatus)) {
    const snapshot = loadWorkflowStepGateSnapshot({
      workflowRoot,
      workItemSlug,
      stepId: "s08"
    });
    errors.push(...getMissingGateEvidenceErrors(snapshot, getRequiredFinalizedGateKeys("s08", snapshot.approvalGates)));
  }

  return errors;
}

module.exports = {
  APPROVAL_GATE_KEYS,
  REQUIRED_FINALIZED_SIGNOFF_BY_STEP,
  SIGNOFF_KEYS,
  countYamlListItemsInSection,
  getApprovalGateDefault,
  getProtocolStepGateErrors,
  getMarkdownSectionContent,
  getMissingGateEvidenceErrors,
  getRequiredFinalizedGateKeys,
  getSectionScalarValue,
  getWorkflowStepNotePath,
  loadWorkflowStepGateSnapshot
};
