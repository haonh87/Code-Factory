const fs = require("fs");
const path = require("path");
const {
  getFrontmatterLines,
  getFrontmatterList,
  getFrontmatterValue,
  readUtf8
} = require("./workflow-validator-utils");
const { getDefaultChangeApprovalState } = require("./workflow-change-definitions");

const MANAGED_PROPOSAL_SCALAR_KEYS = new Set([
  "status",
  "decision_owner",
  "review_required",
  "approval_status",
  "reviewed_by",
  "reviewed_at",
  "materialization_ref",
  "request_summary"
]);
const MANAGED_PROPOSAL_LIST_KEYS = new Set(["review_notes"]);

function normalizeSingleValue(value) {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }

  return value;
}

function normalizeArray(value) {
  if (value == null) {
    return [];
  }

  return (Array.isArray(value) ? value : [value])
    .flatMap((item) => (Array.isArray(item) ? item : [item]))
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function quoteYamlString(value) {
  return JSON.stringify(String(value == null ? "" : value));
}

function buildYamlList(key, values) {
  const normalized = normalizeArray(values);
  if (normalized.length === 0) {
    return [`${key}: []`];
  }

  return [key + ":", ...normalized.map((value) => `  - ${quoteYamlString(value)}`)];
}

function parseYamlBoolean(value, fallback = false) {
  if (typeof value === "boolean") {
    return value;
  }

  const normalized = String(value == null ? "" : value).trim().toLowerCase();
  if (normalized === "true") {
    return true;
  }
  if (normalized === "false") {
    return false;
  }

  return fallback;
}

function getChangePaths({ projectRoot, changeId }) {
  const changeRoot = path.resolve(projectRoot, "changes", changeId);
  return {
    changeRoot,
    proposalPath: path.join(changeRoot, "proposal.md")
  };
}

function splitFrontmatterDocument(filePath) {
  const content = readUtf8(filePath);
  const lines = content.split(/\r?\n/);

  if (lines.length < 3 || lines[0].trim() !== "---") {
    throw new Error(`Missing YAML frontmatter in ${filePath}`);
  }

  let closingIndex = -1;
  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === "---") {
      closingIndex = index;
      break;
    }
  }

  if (closingIndex < 1) {
    throw new Error(`Missing closing YAML frontmatter in ${filePath}`);
  }

  return {
    frontmatterLines: lines.slice(1, closingIndex),
    body: lines.slice(closingIndex + 1).join("\n")
  };
}

function normalizeChangeProposalState(input) {
  const decisionOwner = String(input.decision_owner || "human").trim() || "human";
  const approvalDefaults = getDefaultChangeApprovalState(decisionOwner);

  return {
    change_id: String(input.change_id || "").trim(),
    artifact_kind: String(input.artifact_kind || "change-proposal").trim(),
    status: String(input.status || "draft").trim(),
    linked_work_items: normalizeArray(input.linked_work_items),
    decision_owner: decisionOwner,
    review_required:
      typeof input.review_required === "boolean"
        ? input.review_required
        : parseYamlBoolean(input.review_required, approvalDefaults.review_required),
    approval_status: String(input.approval_status || approvalDefaults.approval_status).trim(),
    reviewed_by: String(input.reviewed_by || approvalDefaults.reviewed_by).trim(),
    reviewed_at: String(input.reviewed_at || approvalDefaults.reviewed_at).trim(),
    review_notes: normalizeArray(input.review_notes || approvalDefaults.review_notes),
    materialization_ref: String(input.materialization_ref || "").trim(),
    request_summary: String(input.request_summary || "").trim()
  };
}

function loadChangeProposalState({ projectRoot, changeId }) {
  const paths = getChangePaths({ projectRoot, changeId });
  if (!fs.existsSync(paths.proposalPath)) {
    throw new Error(`Missing change proposal: ${paths.proposalPath}`);
  }

  const document = splitFrontmatterDocument(paths.proposalPath);
  const frontmatterLines = getFrontmatterLines(paths.proposalPath);
  if (!frontmatterLines) {
    throw new Error(`Missing YAML frontmatter in ${paths.proposalPath}`);
  }

  return {
    ...paths,
    ...document,
    state: normalizeChangeProposalState({
      change_id: getFrontmatterValue(frontmatterLines, "change_id") || changeId,
      artifact_kind: getFrontmatterValue(frontmatterLines, "artifact_kind") || "change-proposal",
      status: getFrontmatterValue(frontmatterLines, "status") || "draft",
      linked_work_items: getFrontmatterList(frontmatterLines, "linked_work_items") || [],
      decision_owner: getFrontmatterValue(frontmatterLines, "decision_owner") || "human",
      review_required: getFrontmatterValue(frontmatterLines, "review_required"),
      approval_status: getFrontmatterValue(frontmatterLines, "approval_status"),
      reviewed_by: getFrontmatterValue(frontmatterLines, "reviewed_by"),
      reviewed_at: getFrontmatterValue(frontmatterLines, "reviewed_at"),
      review_notes: getFrontmatterList(frontmatterLines, "review_notes") || [],
      materialization_ref: getFrontmatterValue(frontmatterLines, "materialization_ref"),
      request_summary: getFrontmatterValue(frontmatterLines, "request_summary")
    })
  };
}

function stripManagedProposalLines(frontmatterLines) {
  const cleaned = [];
  let skipListItems = false;

  for (const line of frontmatterLines) {
    if (skipListItems) {
      if (/^\s*-\s+/.test(line) || /^\s*$/.test(line)) {
        continue;
      }

      skipListItems = false;
    }

    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyMatch) {
      cleaned.push(line);
      continue;
    }

    const [, key, remainder] = keyMatch;
    if (MANAGED_PROPOSAL_SCALAR_KEYS.has(key)) {
      continue;
    }

    if (MANAGED_PROPOSAL_LIST_KEYS.has(key)) {
      if (!remainder.trim().startsWith("[")) {
        skipListItems = true;
      }
      continue;
    }

    cleaned.push(line);
  }

  return cleaned;
}

function buildManagedProposalLines(stateInput) {
  const state = normalizeChangeProposalState(stateInput);

  return [
    `status: ${state.status}`,
    `decision_owner: ${quoteYamlString(state.decision_owner)}`,
    `review_required: ${state.review_required ? "true" : "false"}`,
    `approval_status: ${state.approval_status}`,
    `reviewed_by: ${quoteYamlString(state.reviewed_by)}`,
    `reviewed_at: ${quoteYamlString(state.reviewed_at)}`,
    `materialization_ref: ${quoteYamlString(state.materialization_ref)}`,
    `request_summary: ${quoteYamlString(state.request_summary)}`,
    ...buildYamlList("review_notes", state.review_notes)
  ];
}

function syncChangeProposalState({ proposalPath, frontmatterLines, body, state }) {
  const cleanedLines = stripManagedProposalLines(frontmatterLines);
  const managedLines = buildManagedProposalLines(state);
  const anchorIndex = cleanedLines.findIndex((line) => /^artifact_kind:\s*/.test(line));
  const splitIndex = anchorIndex >= 0 ? anchorIndex + 1 : cleanedLines.length;
  const finalFrontmatterLines = [
    ...cleanedLines.slice(0, splitIndex),
    ...managedLines,
    ...cleanedLines.slice(splitIndex)
  ];

  const serialized = `---\n${finalFrontmatterLines.join("\n")}\n---\n${body}`;
  fs.writeFileSync(proposalPath, serialized, "utf8");
}

module.exports = {
  buildYamlList,
  getChangePaths,
  loadChangeProposalState,
  normalizeArray,
  normalizeChangeProposalState,
  normalizeSingleValue,
  parseYamlBoolean,
  quoteYamlString,
  syncChangeProposalState
};
