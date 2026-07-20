const fs = require("fs");
const path = require("path");
const {
  getFrontmatterLines,
  getFrontmatterList,
  getFrontmatterValue,
  readUtf8
} = require("./workflow-validator-utils");
const {
  CR_LEGACY_FIELD_ALIASES,
  DEFAULT_CR_VOCABULARY,
  getDefaultChangeApprovalState,
  normalizeCrId,
  resolveCrVocabulary
} = require("./workflow-change-definitions");

const MANAGED_PROPOSAL_SCALAR_KEYS = new Set([
  "status",
  "decision_owner",
  "review_required",
  "approval_status",
  "reviewed_by",
  "reviewed_at",
  "materialization_ref",
  "request_summary",
  "defect_source",
  "spec_impact_classified",
  "cr_id",
  "cr_profile",
  "cr_status",
  "cr_strategy"
]);
const MANAGED_PROPOSAL_LIST_KEYS = new Set(["review_notes", "linked_crs"]);

// Compact canonical-write strip set: khi sync compact, legacy alias keys bị loại
// khỏi frontmatter để new writer chỉ emit CR/cr_* (AC-12).
const COMPACT_STRIP_LEGACY_KEYS = new Set([
  "change_id",
  "change_status",
  "change_strategy",
  "linked_changes",
  "status"
]);

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

// resolveChangePaths (plan v5 §5, §6, T6, R2): dual-read physical root + proposal
// file. normalizeCrId đầu vào; thử cả canonical CR-### và legacy CHANGE-###; thử
// cả request.md (compact) và proposal.md (full/legacy). Trả về profile phát hiện
// được. vocabulary (legacy|dual|canonical, default dual) gate DIR discovery:
// canonical = chỉ canonical root (không fallback legacy), legacy = chỉ legacy
// root (không fallback canonical), dual = cả hai (current). Frontmatter key
// dual-read ở state layer độc lập với flag này. Mặc định (chưa tồn tại) theo
// vocabulary: canonical/dual -> canonical root, legacy -> legacy root.
function getChangePaths({ projectRoot, changeId, vocabulary }) {
  const resolvedVocabulary = resolveCrVocabulary(
    vocabulary != null ? vocabulary : (process.env.CF_CR_VOCABULARY || DEFAULT_CR_VOCABULARY)
  );
  const canonicalId = normalizeCrId(changeId);
  const changesRoot = path.resolve(projectRoot, "changes");
  const canonicalRoot = path.join(changesRoot, canonicalId);
  const legacyRoot = canonicalId.startsWith("CR-")
    ? path.join(changesRoot, "CHANGE-" + canonicalId.slice("CR-".length))
    : path.join(changesRoot, canonicalId);

  const candidateRoots = [];
  if (resolvedVocabulary === "canonical") {
    candidateRoots.push(canonicalRoot);
  } else if (resolvedVocabulary === "legacy") {
    candidateRoots.push(legacyRoot);
  } else {
    // dual (default): canonical trước, legacy fallback.
    candidateRoots.push(canonicalRoot);
    if (canonicalId !== changeId) {
      candidateRoots.push(path.join(changesRoot, changeId));
    }
    if (legacyRoot !== canonicalRoot && !candidateRoots.includes(legacyRoot)) {
      candidateRoots.push(legacyRoot);
    }
  }

  for (const root of candidateRoots) {
    if (!fs.existsSync(root)) {
      continue;
    }
    const requestPath = path.join(root, "request.md");
    const proposalPath = path.join(root, "proposal.md");
    if (fs.existsSync(requestPath)) {
      return { changeRoot: root, proposalPath: requestPath, proposalFile: "request.md", profile: "compact" };
    }
    if (fs.existsSync(proposalPath)) {
      return { changeRoot: root, proposalPath: proposalPath, proposalFile: "proposal.md", profile: "full" };
    }
  }

  const defaultRoot = resolvedVocabulary === "legacy" ? legacyRoot : canonicalRoot;
  return {
    changeRoot: defaultRoot,
    proposalPath: path.join(defaultRoot, "proposal.md"),
    proposalFile: "proposal.md",
    profile: "full"
  };
}

// Alias rõ ràng cho semantic mới; giữ getChangePaths cho backward compat.
function resolveChangePaths(options) {
  return getChangePaths(options);
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
  const decisionOwner = String(input.decision_owner || "agent").trim() || "agent";
  const approvalDefaults = getDefaultChangeApprovalState(decisionOwner);

  // Dual-read canonical CR fields (plan v5 §5, T6): canonical thắng, legacy alias
  // fallback. Giữ legacy field trong state cho backward compat với reader cũ.
  const rawChangeId = String(input.change_id || "").trim();
  const rawCrId = String(input.cr_id || "").trim();
  const crId = rawCrId || normalizeCrId(rawChangeId);
  const changeId = rawChangeId || rawCrId;

  const rawChangeStatus = String(input.change_status || input.status || "").trim();
  const rawCrStatus = String(input.cr_status || "").trim();
  const crStatus = rawCrStatus || rawChangeStatus;
  const legacyStatus = rawChangeStatus || rawCrStatus;

  const rawChangeStrategy = String(input.change_strategy || "").trim();
  const rawCrStrategy = String(input.cr_strategy || "").trim();
  const crStrategy = rawCrStrategy || rawChangeStrategy;

  const rawLinkedCrs = normalizeArray(input.linked_crs);
  const rawLinkedChanges = normalizeArray(input.linked_changes);
  const linkedCrs = rawLinkedCrs.length > 0 ? rawLinkedCrs : rawLinkedChanges;

  return {
    change_id: changeId,
    cr_id: crId,
    artifact_kind: String(input.artifact_kind || "change-proposal").trim(),
    status: legacyStatus || "draft",
    cr_status: crStatus || "DRAFT",
    cr_profile: String(input.cr_profile || "full").trim() || "full",
    cr_strategy: crStrategy,
    linked_work_items: normalizeArray(input.linked_work_items),
    linked_crs: linkedCrs,
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
    request_summary: String(input.request_summary || "").trim(),
    // Light classification knobs (plan v5 §1, T5): BA/DEV chốt defect_source và
    // spec_impact_classified tại change-approval time để eligibility router không
    // escalate DEFECT_OR_SPEC_IMPACT_UNCLASSIFIED. Default n/a / false — phải được
    // classify tường minh để cho phép Light.
    defect_source: String(input.defect_source || "n/a").trim() || "n/a",
    spec_impact_classified: parseYamlBoolean(input.spec_impact_classified, false)
  };
}

function loadChangeProposalState({ projectRoot, changeId, vocabulary }) {
  const paths = getChangePaths({ projectRoot, changeId, vocabulary });
  if (!fs.existsSync(paths.proposalPath)) {
    throw new Error(`Missing change proposal: ${paths.proposalPath}`);
  }

  // AC-12 (S5): legacy vocabulary vẫn dual-read được nhưng phải kèm warning —
  // migration window có tiếng ồn chủ đích để thúc chuyển sang canonical.
  const resolvedDirName = path.basename(paths.changeRoot);
  if (resolvedDirName.startsWith("CHANGE-")) {
    console.warn(
      `WARNING: reading legacy change package '${resolvedDirName}' (legacy CHANGE-###/change_* vocabulary). ` +
        `Migrate with: wfc change-item migrate --change-id ${resolvedDirName} --apply`
    );
  }

  const document = splitFrontmatterDocument(paths.proposalPath);
  const frontmatterLines = getFrontmatterLines(paths.proposalPath);
  if (!frontmatterLines) {
    throw new Error(`Missing YAML frontmatter in ${paths.proposalPath}`);
  }

  return {
    ...paths,
    ...document,
    proposalFile: paths.proposalFile,
    profile: paths.profile,
    state: normalizeChangeProposalState({
      change_id: getFrontmatterValue(frontmatterLines, "change_id") || changeId,
      cr_id: getFrontmatterValue(frontmatterLines, "cr_id"),
      artifact_kind: getFrontmatterValue(frontmatterLines, "artifact_kind") || "change-proposal",
      status: getFrontmatterValue(frontmatterLines, "status") || "draft",
      change_status: getFrontmatterValue(frontmatterLines, "change_status"),
      cr_status: getFrontmatterValue(frontmatterLines, "cr_status"),
      cr_profile: getFrontmatterValue(frontmatterLines, "cr_profile"),
      change_strategy: getFrontmatterValue(frontmatterLines, "change_strategy"),
      cr_strategy: getFrontmatterValue(frontmatterLines, "cr_strategy"),
      linked_work_items: getFrontmatterList(frontmatterLines, "linked_work_items") || [],
      linked_crs: getFrontmatterList(frontmatterLines, "linked_crs") || [],
      linked_changes: getFrontmatterList(frontmatterLines, "linked_changes") || [],
      decision_owner: getFrontmatterValue(frontmatterLines, "decision_owner") || "agent",
      review_required: getFrontmatterValue(frontmatterLines, "review_required"),
      approval_status: getFrontmatterValue(frontmatterLines, "approval_status"),
      reviewed_by: getFrontmatterValue(frontmatterLines, "reviewed_by"),
      reviewed_at: getFrontmatterValue(frontmatterLines, "reviewed_at"),
      review_notes: getFrontmatterList(frontmatterLines, "review_notes") || [],
      materialization_ref: getFrontmatterValue(frontmatterLines, "materialization_ref"),
      request_summary: getFrontmatterValue(frontmatterLines, "request_summary"),
      defect_source: getFrontmatterValue(frontmatterLines, "defect_source"),
      spec_impact_classified: getFrontmatterValue(frontmatterLines, "spec_impact_classified")
    })
  };
}

function stripManagedProposalLines(frontmatterLines, profile = "full") {
  const cleaned = [];
  let skipListItems = false;
  const stripLegacy = profile === "compact";

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

    // Compact canonical-write: loại legacy alias keys khỏi frontmatter (AC-12).
    if (stripLegacy && COMPACT_STRIP_LEGACY_KEYS.has(key)) {
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

  const common = [
    `decision_owner: ${quoteYamlString(state.decision_owner)}`,
    `review_required: ${state.review_required ? "true" : "false"}`,
    `approval_status: ${state.approval_status}`,
    `reviewed_by: ${quoteYamlString(state.reviewed_by)}`,
    `reviewed_at: ${quoteYamlString(state.reviewed_at)}`,
    `materialization_ref: ${quoteYamlString(state.materialization_ref)}`,
    `request_summary: ${quoteYamlString(state.request_summary)}`,
    `defect_source: ${quoteYamlString(state.defect_source)}`,
    `spec_impact_classified: ${state.spec_impact_classified ? "true" : "false"}`,
    ...buildYamlList("review_notes", state.review_notes)
  ];

  // Compact canonical-write (AC-12): new writer chỉ emit CR/cr_*.
  if (state.cr_profile === "compact") {
    return [
      `cr_id: ${quoteYamlString(state.cr_id)}`,
      `cr_profile: compact`,
      `cr_status: ${state.cr_status}`,
      `cr_strategy: ${quoteYamlString(state.cr_strategy)}`,
      ...buildYamlList("linked_crs", state.linked_crs),
      ...common
    ];
  }

  // Full/legacy writer: giữ change_id (unmanaged, preserve) + legacy status.
  return [
    `status: ${state.status}`,
    ...common
  ];
}

function syncChangeProposalState({ proposalPath, frontmatterLines, body, state }) {
  const profile = (state && state.cr_profile) || "full";
  const cleanedLines = stripManagedProposalLines(frontmatterLines, profile);
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
  buildManagedProposalLines,
  getChangePaths,
  loadChangeProposalState,
  normalizeArray,
  normalizeChangeProposalState,
  normalizeSingleValue,
  parseYamlBoolean,
  quoteYamlString,
  resolveChangePaths,
  syncChangeProposalState
};
