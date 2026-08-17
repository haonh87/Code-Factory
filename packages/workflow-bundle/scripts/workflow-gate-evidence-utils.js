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
const {
  hasApprovedReceipt,
  loadTrustedApprovalReceipt,
  resolveGateArtifact
} = require("./workflow-trusted-approval-utils");

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

// Light host contract (plan v5 §3): s05 không tồn tại; gate `approach` được host
// tại s06 cùng `task_plan`. s04/s08 giữ nguyên. contract/foundation không áp dụng
// cho light (default not_applicable).
const LIGHT_REQUIRED_FINALIZED_SIGNOFF_BY_STEP = {
  s04: ["spec", "dor"],
  s06: ["approach", "task_plan"],
  s08: ["dod"]
};

function getApprovalGateDefault(key) {
  return key === "spec" ? "required" : "not_applicable";
}

function getRequiredFinalizedGateKeys(stepId, approvalGates, sddMode) {
  // Light: dùng host map gọn — s06 require approach+task_plan, bỏ s05.
  // contract/foundation không áp dụng (light default not_applicable).
  if (sddMode === "light") {
    const required = [...(LIGHT_REQUIRED_FINALIZED_SIGNOFF_BY_STEP[stepId] || [])];

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

const PLACEHOLDER_SCALAR_PATTERN = /^(?:tbd|todo|placeholder|ready\|blocked\|partial|pass\|fail\|partial|<[^>]+>)$/i;

function isPlaceholderScalar(value) {
  const normalized = String(value || "").trim().replace(/^['"]|['"]$/g, "").trim();
  return !normalized || PLACEHOLDER_SCALAR_PATTERN.test(normalized);
}

function getArtifactSection(content) {
  return getMarkdownSectionContent(content, "## Main Artifact") || getMarkdownSectionContent(content, "## Artifact Chính");
}

function getYamlListItemBlocks(sectionContent, key) {
  if (!sectionContent) {
    return [];
  }

  const lines = sectionContent.split(/\r?\n/);
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const keyPattern = new RegExp(`^(\\s*)${escapedKey}:\\s*(?:\\[\\])?\\s*$`);
  const keyIndex = lines.findIndex((line) => keyPattern.test(line));
  if (keyIndex < 0 || /:\s*\[\]\s*$/.test(lines[keyIndex])) {
    return [];
  }

  const keyIndent = (lines[keyIndex].match(/^\s*/) || [""])[0].length;
  const blocks = [];
  let current = [];

  for (let index = keyIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim() || /^\s*```/.test(line)) {
      continue;
    }

    const indent = (line.match(/^\s*/) || [""])[0].length;
    if (indent <= keyIndent && /^[A-Za-z0-9_]+:\s*/.test(line.trim())) {
      break;
    }

    if (indent === keyIndent + 2 && /^\s*-\s+/.test(line)) {
      if (current.length > 0) {
        blocks.push(current.join("\n"));
      }
      current = [line];
    } else if (current.length > 0) {
      current.push(line);
    }
  }

  if (current.length > 0) {
    blocks.push(current.join("\n"));
  }
  return blocks;
}

function getYamlBlockScalar(block, fieldName) {
  const escapedField = fieldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = String(block || "").match(
    new RegExp(
      `(?:^|\\s)(?:-\\s+)?${escapedField}:\\s*(?:"([^"]*)"|'([^']*)'|([^\\n]*?))(?=\\s+[A-Za-z0-9_]+:\\s*|\\s*$)`,
      "m"
    )
  );
  return match ? String(match[1] ?? match[2] ?? match[3] ?? "").trim() : "";
}

function requireNonEmptyYamlList(section, key, label, filePath, errors) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const inlineList = String(section || "").match(new RegExp(`^\\s*${escapedKey}:\\s*\\[([^\\]]*)\\]\\s*$`, "m"));
  const hasInlineItem = inlineList && inlineList[1].trim().length > 0;
  if (!hasInlineItem && countYamlListItemsInSection(section, key) < 1) {
    errors.push(`${label}.${key} must be a non-empty evidence list in finalized note: ${filePath}`);
  }
}

function parseCoverageEvidence(sectionContent) {
  const entries = getYamlListItemBlocks(sectionContent, "coverage").map((block) => ({
    id: getYamlBlockScalar(block, "id") || getYamlBlockScalar(block, "ref"),
    status: getYamlBlockScalar(block, "status").toUpperCase()
  }));
  const lines = String(sectionContent || "").split(/\r?\n/);
  const topStatusLine = lines.find((line) => /^status:\s*/.test(line));
  const topStatus = topStatusLine
    ? topStatusLine.replace(/^status:\s*["']?/, "").replace(/["']?\s*$/, "").toUpperCase()
    : "";
  const summary = {};
  const inlineSummary = String(sectionContent || "").match(/^summary:\s*\{([^}]+)\}\s*$/m);

  if (inlineSummary) {
    inlineSummary[1].split(",").forEach((pair) => {
      const [rawKey, rawValue] = pair.split(":");
      if (rawKey && rawValue && /^\d+$/.test(rawValue.trim())) {
        summary[rawKey.trim().toLowerCase()] = Number(rawValue.trim());
      }
    });
  } else {
    const summaryIndex = lines.findIndex((line) => /^summary:\s*$/.test(line));
    if (summaryIndex >= 0) {
      for (let index = summaryIndex + 1; index < lines.length; index += 1) {
        const match = lines[index].match(/^\s+([a-z_]+):\s*(\d+)\s*$/i);
        if (!match) {
          if (lines[index].trim() && !/^\s*```/.test(lines[index])) {
            break;
          }
          continue;
        }
        summary[match[1].toLowerCase()] = Number(match[2]);
      }
    }
  }

  return { entries, summary, topStatus };
}

function getFinalizedStepSemanticEvidenceErrors({
  stepId,
  content,
  filePath,
  sddMode = "none",
  deliveryContext = "brownfield",
  requireReady = false
}) {
  const errors = [];

  if (stepId === "s04") {
    const artifactSection = getArtifactSection(content);
    const acceptanceBlocks = getYamlListItemBlocks(artifactSection, "acceptance_criteria");
    if (acceptanceBlocks.length < 1) {
      errors.push(`Main Artifact.acceptance_criteria must be a non-empty evidence list in finalized note: ${filePath}`);
    }
    acceptanceBlocks.forEach((block, index) => {
      ["id", "criterion", "verification"].forEach((field) => {
        if (isPlaceholderScalar(getYamlBlockScalar(block, field))) {
          errors.push(`Acceptance criterion ${index + 1} has empty or placeholder ${field}: ${filePath}`);
        }
      });
    });

    const dorSection = getMarkdownSectionContent(content, "## Definition of Ready");
    const dorStatus = getSectionScalarValue(dorSection, "status").toUpperCase();
    if (isPlaceholderScalar(dorStatus) || !["READY", "BLOCKED", "PARTIAL"].includes(dorStatus)) {
      errors.push(`Definition of Ready requires one concrete status READY|BLOCKED|PARTIAL: ${filePath}`);
    } else if (requireReady && dorStatus !== "READY") {
      errors.push(`Definition of Ready must be READY before protocol transition; got '${dorStatus}': ${filePath}`);
    }

    if (deliveryContext === "brownfield") {
      const baselineSection = getMarkdownSectionContent(content, "## Existing System Baseline");
      ["current_behavior_refs", "impacted_surfaces", "compatibility_constraints", "rollback_constraints"].forEach((key) => {
        requireNonEmptyYamlList(baselineSection, key, "Existing System Baseline", filePath, errors);
      });
    }

    const requirementSection = getMarkdownSectionContent(
      content,
      sddMode === "light" ? "## Spec Freeze" : "## Requirement Baseline"
    );
    if (sddMode === "light") {
      requireNonEmptyYamlList(requirementSection, "requirement_ids", "Spec Freeze", filePath, errors);
    } else {
      requireNonEmptyYamlList(requirementSection, "approved_spec_refs", "Requirement Baseline", filePath, errors);
      requireNonEmptyYamlList(requirementSection, "approved_spec_digests", "Requirement Baseline", filePath, errors);
    }
  }

  if (stepId === "s06") {
    const artifactSection = getArtifactSection(content);
    const taskKey = /(?:^|\n)\s*task_breakdown:\s*/.test(artifactSection) ? "task_breakdown" : "tasks";
    const taskBlocks = getYamlListItemBlocks(artifactSection, taskKey);
    if (taskBlocks.length < 1) {
      errors.push(`Main Artifact.${taskKey} must be a non-empty evidence list in finalized note: ${filePath}`);
    }
    taskBlocks.forEach((block, index) => {
      const verifyValue = getYamlBlockScalar(block, "verification_hint") || getYamlBlockScalar(block, "verify");
      if (isPlaceholderScalar(getYamlBlockScalar(block, "id"))) {
        errors.push(`Task ${index + 1} has empty or placeholder id: ${filePath}`);
      }
      if (isPlaceholderScalar(verifyValue)) {
        errors.push(`Task ${index + 1} has empty or placeholder verification path: ${filePath}`);
      }
    });
    if (sddMode === "light") {
      const traceSection = getMarkdownSectionContent(content, "## SDD Traceability");
      ["requirement_refs", "acceptance_refs", "task_refs", "test_refs"].forEach((key) => {
        requireNonEmptyYamlList(traceSection, key, "SDD Traceability", filePath, errors);
      });
    }
  }

  if (stepId === "s08") {
    const coverageSection = getMarkdownSectionContent(content, "## Spec Coverage");
    const coverage = parseCoverageEvidence(coverageSection);
    if (coverage.entries.length < 1) {
      errors.push(`Spec Coverage.coverage must be a non-empty evidence list in finalized note: ${filePath}`);
    }
    const actualCounts = coverage.entries.reduce((counts, entry) => {
      const key = entry.status.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {});
    Object.entries(coverage.summary).forEach(([key, expected]) => {
      if (key === "total") {
        if (expected !== coverage.entries.length) {
          errors.push(`Spec Coverage summary.total=${expected} does not match ${coverage.entries.length} coverage entries: ${filePath}`);
        }
        return;
      }
      const actual = actualCounts[key] || 0;
      if (expected !== actual) {
        errors.push(`Spec Coverage summary.${key.toUpperCase()}=${expected} does not match actual ${actual}: ${filePath}`);
      }
    });
    if (coverage.topStatus === "PASS" && coverage.entries.some((entry) => entry.status !== "PASS")) {
      errors.push(`Spec Coverage status PASS contradicts one or more non-PASS coverage entries: ${filePath}`);
    }
  }

  return errors;
}

function getTrustedReceiptArtifactErrors({ gate, receipt, artifact, filePath }) {
  const errors = [];
  if (receipt.artifact_ref !== artifact.artifactRef) {
    errors.push(`Trusted approval receipt for gate '${gate}' points to stale artifact ref in ${filePath}`);
  }
  if (receipt.artifact_sha256 !== artifact.artifactSha256) {
    errors.push(`Trusted approval receipt for gate '${gate}' is stale after artifact changed: ${filePath}`);
  }
  return errors;
}

const GATE_TEXT_ALIASES = {
  spec: ["spec"],
  contract: ["contract"],
  dor: ["dor", "definition of ready"],
  approach: ["approach"],
  foundation: ["foundation"],
  task_plan: ["task plan", "task_plan"],
  uat: ["uat"],
  release: ["release"],
  business_acceptance: ["business acceptance", "business_acceptance"],
  dod: ["dod", "definition of done"]
};

function textClaimsApprovalPending(text, aliases) {
  const normalized = String(text || "").toLowerCase();
  return aliases.some((alias) => {
    const index = normalized.indexOf(alias);
    if (index < 0) {
      return false;
    }
    const nearby = normalized.slice(Math.max(0, index - 60), index + 140);
    return /pending|not\s+(?:passed|approved)|has\s+not\s+passed|review\s+and\s+approve/.test(nearby);
  });
}

function getProtocolStateContradictionErrors(report, receiptState, reportPath) {
  const errors = [];
  const claims = [...(report.blockers || []), ...(report.required_actions || [])];
  if (receiptState.workItemApproved && claims.some((claim) => textClaimsApprovalPending(claim, ["work-item", "work item"]))) {
    errors.push(`Protocol blockers/required_actions claim work-item approval is pending after trusted receipt is APPROVED: ${reportPath}`);
  }
  if (
    report.change_id &&
    receiptState.changeApproved &&
    claims.some((claim) => textClaimsApprovalPending(claim, [String(report.change_id).toLowerCase(), "change approval"]))
  ) {
    errors.push(`Protocol blockers/required_actions claim ${report.change_id} approval is pending after trusted receipt is APPROVED: ${reportPath}`);
  }
  const approvedGates = receiptState.approvedGates instanceof Set
    ? receiptState.approvedGates
    : new Set(receiptState.approvedGates || []);
  approvedGates.forEach((gate) => {
    const aliases = GATE_TEXT_ALIASES[gate] || [String(gate).replace(/_/g, " ")];
    if (claims.some((claim) => textClaimsApprovalPending(claim, aliases))) {
      errors.push(`Protocol blockers/required_actions claim gate '${gate}' is pending after trusted receipt is APPROVED: ${reportPath}`);
    }
  });
  return errors;
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
      governanceProfile: "default",
      sddMode: "none",
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
      governanceProfile: "default",
      sddMode: "none",
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
    governanceProfile: getFrontmatterValue(frontmatterLines, "governance_profile") || "default",
    sddMode: getFrontmatterValue(frontmatterLines, "sdd_mode") || "none",
    approvalGates,
    roleSignoffs,
    gateReviews
  };
}

function getMissingGateEvidenceErrors(snapshot, requiredKeys, context = {}) {
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

  if (context.projectRoot && context.workflowRoot && context.workItemSlug) {
    requiredKeys.forEach((key) => {
      const trustedReceipt = loadTrustedApprovalReceipt({
        projectRoot: context.projectRoot,
        kind: "gate",
        workItemSlug: context.workItemSlug,
        gate: key
      });

      if (!hasApprovedReceipt(trustedReceipt.receipt, trustedReceipt.approvalRoot)) {
        errors.push(`Missing trusted approval receipt for gate '${key}' in ${snapshot.filePath}`);
        return;
      }

      const artifact = resolveGateArtifact({
        projectRoot: context.projectRoot,
        workflowRoot: context.workflowRoot,
        workItemSlug: context.workItemSlug,
        gate: key,
        sddMode: context.sddMode
      });

      errors.push(
        ...getTrustedReceiptArtifactErrors({
          gate: key,
          receipt: trustedReceipt.receipt,
          artifact,
          filePath: snapshot.filePath
        })
      );

      if ((snapshot.gateReviews[key] && snapshot.gateReviews[key].reviewedBy.length) > 0) {
        const unauthorizedReceipt = !snapshot.gateReviews[key].reviewedBy.includes(trustedReceipt.receipt.reviewed_by);
        if (unauthorizedReceipt) {
          errors.push(
            `Trusted approval receipt reviewer '${trustedReceipt.receipt.reviewed_by}' for gate '${key}' must match gate_reviews in ${snapshot.filePath}`
          );
        }
      }
    });
  }

  // Semantic enforcement is mandatory for strict/regulated transitions. Default
  // remains backward-compatible with already-finalized legacy notes.
  if (context.stepId && ["strict", "regulated"].includes(snapshot.governanceProfile)) {
    errors.push(
      ...getFinalizedStepSemanticEvidenceErrors({
        stepId: context.stepId,
        content: snapshot.content,
        filePath: snapshot.filePath,
        sddMode: context.sddMode || snapshot.sddMode,
        deliveryContext: snapshot.deliveryContext,
        requireReady: context.stepId === "s04"
      })
    );
  }

  return errors;
}

// S07 evidence boundary (plan v5 §3, universal): không dồn evidence s07 sang s08.
// Khi chuyển VERIFIED+, s07 phải tồn tại, đã finalized và có '## Delivery Rule
// Evidence'. Đây là boundary gate, không thay thế validate-workflow-governance chi
// tiết hơn cho s07.
function getS07EvidenceErrors({ workflowRoot, workItemSlug }) {
  const errors = [];
  const snapshot = loadWorkflowStepGateSnapshot({ workflowRoot, workItemSlug, stepId: "s07" });
  if (!snapshot.exists) {
    errors.push(`Missing required workflow step note: ${snapshot.filePath}`);
    return errors;
  }
  if (!snapshot.status || snapshot.status === "draft") {
    errors.push(`s07 implementation note must be reviewed or finalized before verification: ${snapshot.filePath}`);
  }
  if (!/## Delivery Rule Evidence/.test(snapshot.content || "")) {
    errors.push(`Missing '## Delivery Rule Evidence' in s07 implementation note: ${snapshot.filePath}`);
  }
  return errors;
}

function getProtocolStepGateErrors({ projectRoot, workflowRoot, workItemSlug, toStatus, sddMode }) {
  const errors = [];

  if (!workflowRoot) {
    return ["Missing workflow_root for protocol-managed work item."];
  }

  // Profile detection: ưu tiên sddMode truyền vào; thiếu thì đọc từ note s01.
  let resolvedSddMode = sddMode;
  if (!resolvedSddMode) {
    const s01Snapshot = loadWorkflowStepGateSnapshot({ workflowRoot, workItemSlug, stepId: "s01" });
    resolvedSddMode = s01Snapshot.sddMode || "none";
  }
  const isLight = resolvedSddMode === "light";
  // Light không có s05; pre-step gate check chỉ chạy cho s04 + s06.
  const preSteps = isLight ? ["s04", "s06"] : ["s04", "s05", "s06"];

  if (["ACTIVE", "VERIFIED", "DONE", "ARCHIVED"].includes(toStatus)) {
    preSteps.forEach((stepId) => {
      const snapshot = loadWorkflowStepGateSnapshot({
        workflowRoot,
        workItemSlug,
        stepId
      });
      errors.push(
        ...getMissingGateEvidenceErrors(snapshot, getRequiredFinalizedGateKeys(stepId, snapshot.approvalGates, resolvedSddMode), {
          projectRoot,
          workflowRoot,
          workItemSlug,
          sddMode: resolvedSddMode,
          stepId
        })
      );
    });
  }

  if (["VERIFIED", "DONE", "ARCHIVED"].includes(toStatus)) {
    const s08Path = getWorkflowStepNotePath(workflowRoot, workItemSlug, "s08");
    if (!fs.existsSync(s08Path)) {
      errors.push(`Missing required workflow step note: ${s08Path}`);
    }
    // S07 evidence boundary (plan v5 §3, Light-specific): s08 không được kết luận
    // thay s07. Non-light đã có s07 Delivery Rule Evidence check tại governance
    // validator khi finalize s07, nên protocol boundary chỉ kích hoạt cho light.
    if (isLight) {
      errors.push(...getS07EvidenceErrors({ workflowRoot, workItemSlug }));
    }
  }

  if (["DONE", "ARCHIVED"].includes(toStatus)) {
    const snapshot = loadWorkflowStepGateSnapshot({
      workflowRoot,
      workItemSlug,
      stepId: "s08"
    });
    errors.push(
      ...getMissingGateEvidenceErrors(snapshot, getRequiredFinalizedGateKeys("s08", snapshot.approvalGates, resolvedSddMode), {
        projectRoot,
        workflowRoot,
        workItemSlug,
        sddMode: resolvedSddMode,
        stepId: "s08"
      })
    );
  }

  return errors;
}

module.exports = {
  APPROVAL_GATE_KEYS,
  REQUIRED_FINALIZED_SIGNOFF_BY_STEP,
  SIGNOFF_KEYS,
  countYamlListItemsInSection,
  getApprovalGateDefault,
  getFinalizedStepSemanticEvidenceErrors,
  getProtocolStepGateErrors,
  getProtocolStateContradictionErrors,
  getMarkdownSectionContent,
  getMissingGateEvidenceErrors,
  getRequiredFinalizedGateKeys,
  getSectionScalarValue,
  getTrustedReceiptArtifactErrors,
  getWorkflowStepNotePath,
  loadWorkflowStepGateSnapshot
};
