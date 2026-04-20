const fs = require("fs");
const path = require("path");
const {
  ensureDirectory,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterList,
  getFrontmatterValue,
  parseCliArgs,
  readUtf8
} = require("./workflow-validator-utils");
const { CHANGE_ID_PATTERN } = require("./workflow-change-definitions");
const { GOVERNANCE_PROFILES } = require("./workflow-governance-definitions");
const { PLANNING_TRACKS } = require("./workflow-planning-definitions");
const { EXECUTION_MODES } = require("./workflow-execution-definitions");
const { scaffoldWorkflowNotes } = require("./scaffold-workflow");
const { scaffoldChangePackage } = require("./scaffold-change-package");
const {
  buildProtocolEvent,
  getDefaultApprovalState,
  renderProtocolBlock
} = require("./work-item-protocol-utils");

const WORK_ITEM_TYPES = ["FEATURE", "BUG", "CHANGE", "REFACTOR", "RESEARCH"];
const DELIVERY_CONTEXTS = ["greenfield", "brownfield"];
const WORK_ITEM_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CHANGE_STRATEGIES = ["none", "reuse_existing", "create_new"];
const DECISION_OWNERS = ["agent", "coordinator"];

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "cho",
  "chuc",
  "cua",
  "de",
  "do",
  "duoc",
  "feature",
  "function",
  "he",
  "hay",
  "hoac",
  "i",
  "khi",
  "la",
  "lam",
  "mot",
  "muon",
  "nang",
  "new",
  "o",
  "of",
  "on",
  "or",
  "system",
  "tai",
  "the",
  "thi",
  "to",
  "toi",
  "tren",
  "under",
  "va",
  "ve",
  "voi",
  "want",
  "xuat",
  "yeu",
  "cau"
]);

const ACTION_TOKENS = new Set([
  "add",
  "bug",
  "consolidate",
  "cutover",
  "enable",
  "evaluate",
  "extract",
  "fix",
  "migrate",
  "normalize",
  "prevent",
  "refactor",
  "reindex",
  "research",
  "restore",
  "retire",
  "rollback",
  "rollout",
  "spike",
  "support",
  "upgrade"
]);

const BROAD_TOPIC_TOKENS = new Set([
  "auth",
  "billing",
  "dashboard",
  "export",
  "login",
  "payment",
  "profile",
  "search"
]);

const OUTCOME_TOKENS = new Set([
  "auth",
  "billing",
  "dashboard",
  "export",
  "index",
  "login",
  "payment",
  "profile",
  "report",
  "search",
  "session",
  "signup"
]);

const ENTERPRISE_TOKENS = new Set([
  "backfill",
  "compliance",
  "cutover",
  "migration",
  "payment",
  "production",
  "regulated",
  "release",
  "retention",
  "rollout"
]);

const STRICT_TOKENS = new Set([
  "access",
  "auth",
  "login",
  "oauth",
  "permission",
  "provider",
  "security",
  "session"
]);

const CHANGE_SIGNAL_TOKENS = new Set([
  "api",
  "backfill",
  "contract",
  "cutover",
  "index",
  "migration",
  "normalize",
  "oauth",
  "policy",
  "provider",
  "reindex",
  "rollout"
]);

const ACTIVE_CHANGE_STATUSES = new Set(["draft", "approved", "implementing", "verified"]);
const PROJECT_BASELINE_FILES = [
  "package.json",
  "pyproject.toml",
  "requirements.txt",
  "go.mod",
  "Cargo.toml",
  "composer.json",
  "pom.xml",
  "build.gradle",
  "build.gradle.kts",
  "Gemfile",
  "Dockerfile",
  "compose.yaml",
  "docker-compose.yml"
];
const PROJECT_BASELINE_DIRS = ["src", "app", "services", "backend", "frontend", "api", "server", "client", "web", "packages"];

const PHRASE_REPLACEMENTS = [
  [/\bdang nhap\b/g, "login"],
  [/\bdang ky\b/g, "signup"],
  [/\bquen mat khau\b/g, "password reset"],
  [/\bdoi mat khau\b/g, "password change"],
  [/\bnguoi dung\b/g, "user"],
  [/\bkhach hang\b/g, "customer"],
  [/\bthanh toan\b/g, "payment"],
  [/\bhoa don\b/g, "invoice"],
  [/\bgiao dich\b/g, "transaction"],
  [/\bdon hang\b/g, "order"],
  [/\bchuan hoa\b/g, "normalize"],
  [/\bnghien cuu\b/g, "research"],
  [/\btai cau truc\b/g, "refactor"],
  [/\bbo sung\b/g, "add"],
  [/\bthem\b/g, "add"],
  [/\bsua\b/g, "fix"],
  [/\bloi\b/g, "bug"],
  [/\bxac thuc\b/g, "auth"],
  [/\bcap quyen\b/g, "permission"],
  [/\bgoogle oauth\b/g, "google oauth"],
  [/\boauth google\b/g, "google oauth"],
  [/\bcat chuyen\b/g, "cutover"],
  [/\bnang cap\b/g, "upgrade"],
  [/\btrien khai\b/g, "rollout"],
  [/\bchi muc\b/g, "index"]
];

function normalizeSingleValue(value) {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }

  return value;
}

function validateChoice(name, value, allowedValues) {
  if (!allowedValues.includes(value)) {
    throw new Error(`Invalid ${name} '${value}'. Allowed values: ${allowedValues.join(", ")}`);
  }
}

function stripDiacritics(input) {
  return String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function normalizeRequestText(request) {
  let normalized = stripDiacritics(request).toLowerCase();
  PHRASE_REPLACEMENTS.forEach(([pattern, replacement]) => {
    normalized = normalized.replace(pattern, replacement);
  });

  return normalized.replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function tokenizeRequest(request) {
  const normalized = normalizeRequestText(request);
  if (!normalized) {
    return [];
  }

  return normalized
    .split(" ")
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => !STOPWORDS.has(token));
}

function unique(items) {
  return [...new Set(items)];
}

function intersectionCount(left, right) {
  const rightSet = new Set(right);
  return left.filter((value) => rightSet.has(value)).length;
}

function collectExistingWorkItems(workflowRootBase) {
  if (!fs.existsSync(workflowRootBase)) {
    return [];
  }

  return fs
    .readdirSync(workflowRootBase, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      slug: entry.name,
      path: path.join(workflowRootBase, entry.name),
      tokens: entry.name.split("-").filter(Boolean)
    }));
}

function collectExistingChanges(changesRoot) {
  if (!fs.existsSync(changesRoot)) {
    return [];
  }

  return fs
    .readdirSync(changesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && CHANGE_ID_PATTERN.test(entry.name))
    .map((entry) => {
      const changeRoot = path.join(changesRoot, entry.name);
      const proposalPath = path.join(changeRoot, "proposal.md");
      let status = "draft";
      let linkedWorkItems = [];

      if (fs.existsSync(proposalPath)) {
        const frontmatterLines = getFrontmatterLines(proposalPath);
        if (frontmatterLines) {
          status = getFrontmatterValue(frontmatterLines, "status") || status;
          linkedWorkItems = getFrontmatterList(frontmatterLines, "linked_work_items") || [];
        }
      }

      return {
        changeId: entry.name,
        path: changeRoot,
        status,
        linkedWorkItems,
        active: ACTIVE_CHANGE_STATUSES.has(status)
      };
    });
}

function inferWorkItemType(tokens, rawRequest, explicitType) {
  if (explicitType) {
    return explicitType;
  }

  const request = normalizeRequestText(rawRequest);
  const tokenSet = new Set(tokens);

  if (tokenSet.has("research") || tokenSet.has("evaluate") || tokenSet.has("spike")) {
    return "RESEARCH";
  }

  if (tokenSet.has("refactor") || tokenSet.has("extract") || tokenSet.has("consolidate")) {
    return "REFACTOR";
  }

  if (
    tokenSet.has("fix") ||
    tokenSet.has("bug") ||
    tokenSet.has("timeout") ||
    tokenSet.has("error") ||
    request.includes("khong") ||
    request.includes("fail")
  ) {
    return "BUG";
  }

  if (
    tokenSet.has("migrate") ||
    tokenSet.has("migration") ||
    tokenSet.has("normalize") ||
    tokenSet.has("backfill") ||
    tokenSet.has("cutover") ||
    tokenSet.has("reindex") ||
    tokenSet.has("rollout") ||
    tokenSet.has("contract") ||
    tokenSet.has("policy")
  ) {
    return "CHANGE";
  }

  return "FEATURE";
}

function inferSplitDecision(tokens, rawRequest, inferredType) {
  const normalized = normalizeRequestText(rawRequest);
  const outcomeCount = tokens.filter((token) => OUTCOME_TOKENS.has(token)).length;

  if (tokens.length <= 1 || (tokens.length <= 2 && tokens.every((token) => BROAD_TOPIC_TOKENS.has(token)))) {
    return "defer";
  }

  if (
    (normalized.includes(" va ") || normalized.includes(" and ")) &&
    (outcomeCount >= 2 || (tokens.includes("research") && inferredType !== "RESEARCH"))
  ) {
    return "split";
  }

  if (tokens.includes("research") && inferredType !== "RESEARCH") {
    return "split";
  }

  return "single";
}

function pickImportantTokens(tokens, inferredType) {
  const tokenSet = new Set(tokens);

  if (inferredType === "FEATURE" && tokenSet.has("login")) {
    if (tokenSet.has("google")) {
      return ["google", "oauth", "login"];
    }

    if (tokenSet.has("password")) {
      return ["user", "login"];
    }

    return ["user", "login"];
  }

  if (inferredType === "BUG" && tokenSet.has("login") && tokenSet.has("timeout")) {
    return ["login", "timeout"];
  }

  if (inferredType === "CHANGE" && tokenSet.has("customer") && tokenSet.has("phone") && tokenSet.has("index")) {
    return ["customer", "phone", "index"];
  }

  const contentTokens = tokens.filter((token) => !ACTION_TOKENS.has(token) && token.length > 1);
  return unique(contentTokens).slice(0, 4);
}

function inferSlugPrefix(tokens, inferredType) {
  if (inferredType === "BUG") {
    return "fix";
  }

  if (inferredType === "RESEARCH") {
    return "research";
  }

  if (inferredType === "REFACTOR") {
    return "refactor";
  }

  if (tokens.includes("normalize")) {
    return "normalize";
  }

  if (tokens.includes("migrate") || tokens.includes("migration")) {
    return "migrate";
  }

  if (tokens.includes("cutover")) {
    return "cutover";
  }

  if (tokens.includes("reindex")) {
    return "reindex";
  }

  if (tokens.includes("add") || inferredType === "FEATURE") {
    return tokens.includes("login") && !tokens.includes("google") ? "" : "add";
  }

  return "";
}

function inferWorkItemSlug(tokens, inferredType, explicitSlug) {
  if (explicitSlug) {
    return explicitSlug;
  }

  const prefix = inferSlugPrefix(tokens, inferredType);
  const importantTokens = pickImportantTokens(tokens, inferredType);
  const slugTokens = unique([prefix, ...importantTokens].filter(Boolean));

  if (slugTokens.length === 0) {
    return "";
  }

  return slugTokens.join("-");
}

function inferPlanningTrack(tokens, inferredType, explicitTrack) {
  if (explicitTrack) {
    return explicitTrack;
  }

  if (tokens.some((token) => ENTERPRISE_TOKENS.has(token))) {
    return "enterprise";
  }

  if (inferredType === "BUG") {
    return "quick";
  }

  if (inferredType === "REFACTOR" && tokens.length <= 6) {
    return "quick";
  }

  return "full";
}

function inferGovernanceProfile(tokens, explicitProfile) {
  if (explicitProfile) {
    return explicitProfile;
  }

  if (tokens.some((token) => ENTERPRISE_TOKENS.has(token))) {
    return "regulated";
  }

  if (tokens.some((token) => STRICT_TOKENS.has(token))) {
    return "strict";
  }

  return "default";
}

function inferExecutionMode(explicitMode) {
  return explicitMode || "agentic";
}

function findWorkItemMatches(existingWorkItems, slug, coreTokens) {
  const exactMatch = existingWorkItems.find((item) => item.slug === slug) || null;
  const nearMatches = existingWorkItems
    .filter((item) => item.slug !== slug)
    .map((item) => ({
      ...item,
      score: intersectionCount(item.tokens, coreTokens)
    }))
    .filter((item) => item.score >= 1)
    .sort((left, right) => right.score - left.score);

  return {
    exactMatch,
    nearMatches
  };
}

function findChangeMatches(existingChanges, slug, coreTokens) {
  const exactMatch =
    existingChanges.find((change) => change.active && change.linkedWorkItems.includes(slug)) || null;

  if (exactMatch) {
    return {
      exactMatch,
      nearMatches: []
    };
  }

  const nearMatches = existingChanges
    .filter((change) => change.active)
    .map((change) => {
      const linkedTokens = unique(
        change.linkedWorkItems.flatMap((itemSlug) => itemSlug.split("-").filter(Boolean))
      );
      return {
        ...change,
        score: intersectionCount(linkedTokens, coreTokens)
      };
    })
    .filter((change) => change.score >= 1)
    .sort((left, right) => right.score - left.score);

  return {
    exactMatch: null,
    nearMatches
  };
}

function inferChangeStrategy(tokens, inferredType, explicitStrategy, changeMatches) {
  if (explicitStrategy) {
    return explicitStrategy;
  }

  if (changeMatches.exactMatch) {
    return "reuse_existing";
  }

  if (inferredType === "CHANGE") {
    return "create_new";
  }

  if (
    inferredType === "FEATURE" &&
    (tokens.includes("login") ||
      tokens.includes("signup") ||
      tokens.includes("oauth") ||
      tokens.includes("provider") ||
      tokens.includes("payment"))
  ) {
    return "create_new";
  }

  if (tokens.some((token) => CHANGE_SIGNAL_TOKENS.has(token))) {
    return "create_new";
  }

  return "none";
}

function getNextChangeId(changesRoot) {
  if (!fs.existsSync(changesRoot)) {
    return "CHANGE-001";
  }

  const maxSequence = fs
    .readdirSync(changesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const match = entry.name.match(/^CHANGE-(\d+)$/);
      return match ? Number(match[1]) : 0;
    })
    .reduce((max, current) => Math.max(max, current), 0);

  return `CHANGE-${String(maxSequence + 1).padStart(3, "0")}`;
}

function hasProjectImplementationBaseline(projectRoot) {
  if (PROJECT_BASELINE_FILES.some((fileName) => fs.existsSync(path.join(projectRoot, fileName)))) {
    return true;
  }

  return PROJECT_BASELINE_DIRS.some((dirName) => {
    const dirPath = path.join(projectRoot, dirName);
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      return false;
    }

    const children = fs
      .readdirSync(dirPath)
      .filter((entry) => !entry.startsWith("."))
      .filter((entry) => !["docs", "work-items", "changes", "project-context"].includes(entry));

    return children.length > 0;
  });
}

function inferDeliveryContext(projectRoot, explicitDeliveryContext) {
  if (explicitDeliveryContext) {
    return explicitDeliveryContext;
  }

  return hasProjectImplementationBaseline(projectRoot) ? "brownfield" : "greenfield";
}

function buildBootstrapGate({
  deliveryContext,
  bootstrapGateRef,
  bootstrapReviewedBy,
  bootstrapReviewedAt
}) {
  if (deliveryContext !== "greenfield") {
    return {
      status: "NOT_REQUIRED",
      ref: "",
      reviewedBy: "",
      reviewedAt: "",
      blocker: "",
      requiredActions: []
    };
  }

  if (bootstrapGateRef && bootstrapReviewedBy && bootstrapReviewedAt) {
    return {
      status: "APPROVED",
      ref: bootstrapGateRef,
      reviewedBy: bootstrapReviewedBy,
      reviewedAt: bootstrapReviewedAt,
      blocker: "",
      requiredActions: []
    };
  }

  return {
    status: "PENDING_REVIEW",
    ref: "",
    reviewedBy: "",
    reviewedAt: "",
    blocker: "Greenfield bootstrap gate chưa được human approve; chưa được scaffold work item implementation đầu tiên.",
    requiredActions: [
      "Hoàn tất `Spec`, `Contract` khi có, `Approach` và `Foundation Decision` cho project mới.",
      "Rerun materialization với `--bootstrap-ref`, `--bootstrap-reviewed-by`, `--bootstrap-reviewed-at` sau khi human approve bootstrap gate."
    ]
  };
}

function buildScaffoldActions(item, projectRoot) {
  const actions = [];

  if (item.change_strategy === "create_new" && item.change_id) {
    actions.push(`npm run scaffold:change -- --change-id ${item.change_id} --work-item ${item.work_item_slug}`);
  }

  const workflowActionParts = [
    `npm run scaffold:workflow -- --work-item ${item.work_item_slug}`,
    `--planning-track ${item.planning_track}`,
    `--delivery-context ${item.delivery_context}`
  ];

  if (item.change_id) {
    workflowActionParts.push(`--change-id ${item.change_id}`);
  }

  if (item.governance_profile !== "default") {
    workflowActionParts.push(`--governance-profile ${item.governance_profile}`);
  }

  if (item.execution_mode !== "agentic") {
    workflowActionParts.push(`--execution-mode ${item.execution_mode}`);
  }

  actions.push(workflowActionParts.join(" "));
  actions.push(`npm run validate:workflow -- --workflow-root ${path.join("work-items", item.work_item_slug)} --project-root ${projectRoot}`);

  return actions;
}

function buildPostMaterializationActions(report, item) {
  if (!report.review_required) {
    return ["Điền nội dung thực tế cho s01 Clarify.", "Tiếp tục workflow backbone s01 -> s08."];
  }

  const actions = [];
  if (item.change_id) {
    actions.push(`wfc change-item approve --change-id ${item.change_id} --reviewed-by <role>`);
  }
  actions.push(`wfc work-item approve --work-item ${item.work_item_slug} --reviewed-by <role>`);
  actions.push(`wfc work-item activate --work-item ${item.work_item_slug} --step s07`);
  return actions;
}

function buildDecisionLog({
  splitDecision,
  inferredType,
  dedupResult,
  changeStrategy,
  planningTrack,
  governanceProfile,
  deliveryContext
}) {
  return [
    `split_decision=${splitDecision}`,
    `work_item_type=${inferredType}`,
    `delivery_context=${deliveryContext}`,
    `dedup_result=${dedupResult}`,
    `change_strategy=${changeStrategy}`,
    `planning_track=${planningTrack}`,
    `governance_profile=${governanceProfile}`
  ];
}

function toTitleCaseFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
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

function renderMaterializationBlock(report, item) {
  return [
    "## Work Item Materialization",
    "```yaml",
    `materialization_status: ${report.materialization_status}`,
    `decision_owner: ${quoteYamlString(report.decision_owner)}`,
    `raw_request_summary: ${quoteYamlString(report.raw_request_summary)}`,
    `split_decision: ${report.split_decision}`,
    `dedup_result: ${report.dedup_result}`,
    `work_item_slug: ${quoteYamlString(item.work_item_slug)}`,
    `work_item_type: ${item.work_item_type}`,
    `delivery_context: ${item.delivery_context}`,
    `bootstrap_gate_status: ${report.bootstrap_gate_status}`,
    `bootstrap_gate_ref: ${quoteYamlString(report.bootstrap_gate_ref)}`,
    `change_strategy: ${item.change_strategy}`,
    `change_id: ${quoteYamlString(item.change_id)}`,
    ...buildYamlList("decision_reason", report.decision_log),
    ...buildYamlList("existing_refs", item.existing_refs),
    ...buildYamlList("blockers", item.blockers),
    "```"
  ].join("\n");
}

function injectWorkItemSectionsIntoS01(s01Path, report, item) {
  const content = readUtf8(s01Path);
  if (content.includes("## Work Item Materialization") || content.includes("## Work Item Protocol")) {
    return;
  }

  const insertion = `${renderMaterializationBlock(report, item)}\n\n${renderProtocolBlock(report)}\n\n`;
  const marker = "## Traceability";
  const insertionIndex = content.indexOf(marker);

  const updatedContent =
    insertionIndex >= 0
      ? `${content.slice(0, insertionIndex)}${insertion}${content.slice(insertionIndex)}`
      : `${content.trim()}\n\n${insertion}`;

  fs.writeFileSync(s01Path, updatedContent, "utf8");
}

function analyzeRequest(options) {
  const {
    request,
    requestSource,
    explicitSlug,
    explicitWorkItemType,
    explicitPlanningTrack,
    explicitGovernanceProfile,
    explicitExecutionMode,
    explicitChangeStrategy,
    explicitChangeId,
    explicitDeliveryContext,
    bootstrapGateRef,
    bootstrapReviewedBy,
    bootstrapReviewedAt,
    decisionOwner,
    projectRoot,
    workflowRootBase
  } = options;

  const tokens = tokenizeRequest(request);
  const inferredType = inferWorkItemType(tokens, request, explicitWorkItemType);
  const splitDecision = inferSplitDecision(tokens, request, inferredType);
  const workItemSlug = inferWorkItemSlug(tokens, inferredType, explicitSlug);
  const planningTrack = inferPlanningTrack(tokens, inferredType, explicitPlanningTrack);
  const governanceProfile = inferGovernanceProfile(tokens, explicitGovernanceProfile);
  const executionMode = inferExecutionMode(explicitExecutionMode);
  const deliveryContext = inferDeliveryContext(projectRoot, explicitDeliveryContext);
  const coreTokens = unique(tokens.filter((token) => !ACTION_TOKENS.has(token)));

  const existingWorkItems = collectExistingWorkItems(workflowRootBase);
  const workItemMatches = findWorkItemMatches(existingWorkItems, workItemSlug, coreTokens);

  const changesRoot = path.join(projectRoot, "changes");
  const existingChanges = collectExistingChanges(changesRoot);
  const changeMatches = findChangeMatches(existingChanges, workItemSlug, coreTokens);

  const changeStrategy = inferChangeStrategy(tokens, inferredType, explicitChangeStrategy, changeMatches);

  let changeId = "";
  if (changeStrategy === "reuse_existing" && changeMatches.exactMatch) {
    changeId = changeMatches.exactMatch.changeId;
  } else if (changeStrategy === "create_new") {
    changeId = explicitChangeId || getNextChangeId(changesRoot);
  }

  const blockers = [];

  if (!workItemSlug || !WORK_ITEM_PATTERN.test(workItemSlug)) {
    blockers.push("Không suy ra được work_item_slug hợp lệ từ raw request.");
  }

  if (splitDecision === "defer") {
    blockers.push("Scope còn quá rộng hoặc quá mơ hồ để auto-scaffold.");
  }

  if (splitDecision === "split") {
    blockers.push("Request có dấu hiệu chứa nhiều outcome; cần split trước khi scaffold.");
  }

  if (workItemMatches.exactMatch) {
    blockers.push(`Work item đã tồn tại: ${workItemMatches.exactMatch.slug}`);
  }

  if (!workItemMatches.exactMatch && workItemMatches.nearMatches.length > 0) {
    blockers.push(
      `Có work item gần nghĩa cần review: ${workItemMatches.nearMatches
        .slice(0, 3)
        .map((item) => item.slug)
        .join(", ")}`
    );
  }

  if (changeStrategy === "reuse_existing" && !changeMatches.exactMatch) {
    blockers.push("change_strategy=reuse_existing nhưng chưa tìm được change package active phù hợp.");
  }

  const bootstrapGate = buildBootstrapGate({
    deliveryContext,
    bootstrapGateRef,
    bootstrapReviewedBy,
    bootstrapReviewedAt
  });
  if (bootstrapGate.blocker) {
    blockers.push(bootstrapGate.blocker);
  }

  const dedupResult = workItemMatches.exactMatch
    ? "reuse_work_item"
    : changeMatches.exactMatch
      ? "reuse_change"
      : workItemMatches.nearMatches.length > 0
        ? "needs_review"
        : "no_conflict";

  const materializationStatus = blockers.length > 0 ? "PROPOSED" : "READY";
  const protocolStatus = materializationStatus === "READY" ? "READY_TO_MATERIALIZE" : "PROPOSED";
  const approvalDefaults = getDefaultApprovalState(decisionOwner);

  const item = {
    work_item_slug: workItemSlug,
    work_item_title: toTitleCaseFromSlug(workItemSlug),
    work_item_type: inferredType,
    scope_summary: request.trim(),
    primary_outcome: request.trim(),
    in_scope: [],
    out_of_scope: [],
    planning_track: planningTrack,
    delivery_context: deliveryContext,
    sdd_mode: "none",
    governance_profile: governanceProfile,
    execution_mode: executionMode,
    existing_refs: [
      ...workItemMatches.exactMatch ? [path.relative(projectRoot, workItemMatches.exactMatch.path)] : [],
      ...workItemMatches.nearMatches.slice(0, 3).map((match) => path.relative(projectRoot, match.path)),
      ...changeMatches.exactMatch ? [path.relative(projectRoot, changeMatches.exactMatch.path)] : []
    ],
    collision_notes: workItemMatches.nearMatches.slice(0, 3).map((match) => `${match.slug} (score=${match.score})`),
    change_strategy: changeStrategy,
    change_id: changeId,
    change_reason:
      changeStrategy === "create_new"
        ? "Scope có tín hiệu cần change layer riêng."
        : changeStrategy === "reuse_existing"
          ? "Đã có change package active phù hợp."
          : "Scope chưa cần change layer riêng.",
    change_refs: changeMatches.exactMatch ? [path.relative(projectRoot, changeMatches.exactMatch.path)] : [],
    scaffold_actions: [],
    blockers: [...blockers]
  };

  item.scaffold_actions = buildScaffoldActions(item, projectRoot);

  const decisionLog = buildDecisionLog({
    splitDecision,
    inferredType,
    dedupResult,
    changeStrategy,
    planningTrack,
    governanceProfile,
    deliveryContext
  });

  const requiredActions =
    materializationStatus === "READY"
      ? [...item.scaffold_actions]
      : [
          ...bootstrapGate.requiredActions,
          "Làm rõ scope để chốt single hay split.",
          "Review existing work-items/changes trước khi scaffold."
        ];

  const auditEvents = ["REQUEST_CAPTURED", "CANDIDATE_PROPOSED"];
  if (workItemSlug && WORK_ITEM_PATTERN.test(workItemSlug)) {
    auditEvents.push("SLUG_LOCKED");
  }
  if (dedupResult === "no_conflict") {
    auditEvents.push("DEDUP_CONFIRMED");
  }
  if (dedupResult === "reuse_change") {
    auditEvents.push("CHANGE_REUSED");
  }

  const protocolEvents = [
    buildProtocolEvent({
      action: "propose",
      actor: decisionOwner,
      fromStatus: "INTAKE",
      toStatus: "PROPOSED",
      note: "Initial work item materialization decision."
    })
  ];

  if (protocolStatus === "READY_TO_MATERIALIZE") {
    protocolEvents.push(
      buildProtocolEvent({
        action: "materialize-ready",
        actor: decisionOwner,
        fromStatus: "PROPOSED",
        toStatus: "READY_TO_MATERIALIZE",
        note: "Materialization inputs are ready for scaffold."
      })
    );
  }

  return {
    materialization_status: materializationStatus,
    protocol_status: protocolStatus,
    decision_owner: decisionOwner,
    protocol_owner: "",
    raw_request_summary: request.trim(),
    request_source: requestSource,
    candidate_count: splitDecision === "split" ? 2 : 1,
    split_decision: splitDecision,
    dedup_result: dedupResult,
    work_items: [item],
    decision_log: decisionLog,
    work_item_slug: item.work_item_slug,
    work_item_type: item.work_item_type,
    delivery_context: deliveryContext,
    workflow_root: item.work_item_slug ? path.join(workflowRootBase, item.work_item_slug) : "",
    current_step: "",
    change_strategy: item.change_strategy,
    change_id: item.change_id,
    handoff_target: materializationStatus === "READY" ? "scaffold" : "human-clarify",
    required_actions: requiredActions,
    blockers: [...blockers],
    refs: item.existing_refs,
    audit_events: auditEvents,
    bootstrap_gate_status: bootstrapGate.status,
    bootstrap_gate_ref: bootstrapGate.ref,
    bootstrap_reviewed_by: bootstrapGate.reviewedBy,
    bootstrap_reviewed_at: bootstrapGate.reviewedAt,
    ...approvalDefaults,
    protocol_events: protocolEvents
  };
}

function writeReportFile(report, outputPath) {
  ensureDirectory(path.dirname(outputPath));
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

function materializeWorkItem(options) {
  const args = options.args;
  const request = normalizeSingleValue(args.request);
  if (!request) {
    throw new Error("Missing required argument '--request'.");
  }

  const explicitSlug = normalizeSingleValue(args["work-item"] || "");
  if (explicitSlug && !WORK_ITEM_PATTERN.test(explicitSlug)) {
    throw new Error(`Invalid work item slug '${explicitSlug}'. Use kebab-case [a-z0-9-].`);
  }

  const explicitType = normalizeSingleValue(args["work-item-type"] || "");
  if (explicitType) {
    validateChoice("work-item-type", explicitType, WORK_ITEM_TYPES);
  }

  const explicitPlanningTrack = normalizeSingleValue(args["planning-track"] || "");
  if (explicitPlanningTrack) {
    validateChoice("planning-track", explicitPlanningTrack, PLANNING_TRACKS);
  }

  const explicitGovernanceProfile = normalizeSingleValue(args["governance-profile"] || "");
  if (explicitGovernanceProfile) {
    validateChoice("governance-profile", explicitGovernanceProfile, GOVERNANCE_PROFILES);
  }

  const explicitExecutionMode = normalizeSingleValue(args["execution-mode"] || "");
  if (explicitExecutionMode) {
    validateChoice("execution-mode", explicitExecutionMode, EXECUTION_MODES);
  }

  const explicitDeliveryContext = normalizeSingleValue(args["delivery-context"] || "");
  if (explicitDeliveryContext) {
    validateChoice("delivery-context", explicitDeliveryContext, DELIVERY_CONTEXTS);
  }

  const explicitChangeStrategy = normalizeSingleValue(args["change-strategy"] || "");
  if (explicitChangeStrategy) {
    validateChoice("change-strategy", explicitChangeStrategy, CHANGE_STRATEGIES);
  }

  const explicitChangeId = normalizeSingleValue(args["change-id"] || "");
  if (explicitChangeId && !CHANGE_ID_PATTERN.test(explicitChangeId)) {
    throw new Error(`Invalid change-id '${explicitChangeId}'. Use uppercase tokens like CHANGE-001.`);
  }

  const decisionOwner = normalizeSingleValue(args["decision-owner"] || "agent");
  validateChoice("decision-owner", decisionOwner, DECISION_OWNERS);
  const bootstrapGateRef = normalizeSingleValue(args["bootstrap-ref"] || "");
  const bootstrapReviewedBy = normalizeSingleValue(args["bootstrap-reviewed-by"] || "");
  const bootstrapReviewedAt = normalizeSingleValue(args["bootstrap-reviewed-at"] || "");

  if (bootstrapGateRef && (!bootstrapReviewedBy || !bootstrapReviewedAt)) {
    throw new Error("bootstrap approval requires '--bootstrap-ref', '--bootstrap-reviewed-by' and '--bootstrap-reviewed-at' together.");
  }

  if (!bootstrapGateRef && (bootstrapReviewedBy || bootstrapReviewedAt)) {
    throw new Error("bootstrap review metadata requires '--bootstrap-ref'.");
  }

  const projectRoot = path.resolve(normalizeSingleValue(args["project-root"] || process.cwd()));
  const workflowRootBase = path.resolve(
    normalizeSingleValue(args["workflow-root"] || path.join(projectRoot, "work-items"))
  );

  const autoScaffold = Boolean(args["auto-scaffold"]);
  const report = analyzeRequest({
    request,
    requestSource: normalizeSingleValue(args["request-source"] || "user"),
    explicitSlug,
    explicitWorkItemType: explicitType,
    explicitPlanningTrack,
    explicitGovernanceProfile,
    explicitExecutionMode,
    explicitDeliveryContext,
    explicitChangeStrategy,
    explicitChangeId,
    bootstrapGateRef,
    bootstrapReviewedBy,
    bootstrapReviewedAt,
    decisionOwner,
    projectRoot,
    workflowRootBase
  });

  const item = report.work_items[0];
  const outputArg = normalizeSingleValue(args.output || "");
  let reportPath = outputArg ? path.resolve(projectRoot, outputArg) : "";

  if (
    autoScaffold &&
    report.materialization_status === "READY" &&
    report.protocol_status === "READY_TO_MATERIALIZE" &&
    report.dedup_result === "no_conflict"
  ) {
    const workflowRoot = path.join(workflowRootBase, item.work_item_slug);
    const changesRoot = path.join(projectRoot, "changes");

    if (item.change_strategy === "create_new") {
      const changeRoot = path.join(changesRoot, item.change_id);
      const materializationRef = path.relative(
        projectRoot,
        reportPath || path.join(workflowRoot, `${item.work_item_slug}.work-item-report.json`)
      );
      scaffoldChangePackage({
        args: {
          "change-id": item.change_id,
          "work-item": item.work_item_slug,
          "change-root": changeRoot,
          "decision-owner": report.decision_owner,
          "materialization-ref": materializationRef,
          "request-summary": report.raw_request_summary
        }
      });
      report.audit_events.push("CHANGE_CREATED");
    }

    scaffoldWorkflowNotes({
      args: {
        "work-item": item.work_item_slug,
        "work-item-type": item.work_item_type,
        "delivery-context": item.delivery_context,
        "planning-track": item.planning_track,
        "governance-profile": item.governance_profile,
        "execution-mode": item.execution_mode,
        "project-root": projectRoot,
        "workflow-root": workflowRoot,
        ...(item.change_id ? { "change-id": item.change_id } : {})
      }
    });

    report.protocol_status = "MATERIALIZED";
    report.workflow_root = workflowRoot;
    report.current_step = "s01";
    report.handoff_target = report.review_required ? "human-review" : "author-s01";
    report.required_actions = buildPostMaterializationActions(report, item);
    report.refs = [...unique([...report.refs, path.relative(projectRoot, workflowRoot)])];
    report.audit_events.push("WORKFLOW_SCAFFOLDED");
    report.audit_events.push("STEP_OPENED");
    report.protocol_events.push(
      buildProtocolEvent({
        action: "materialize",
        actor: report.decision_owner,
        fromStatus: "READY_TO_MATERIALIZE",
        toStatus: "MATERIALIZED",
        note: "Auto-scaffolded workflow artifacts."
      })
    );

    const s01Path = path.join(workflowRoot, `${item.work_item_slug}.s01.restate.md`);
    injectWorkItemSectionsIntoS01(s01Path, report, item);

    if (!reportPath) {
      reportPath = path.join(workflowRoot, `${item.work_item_slug}.work-item-report.json`);
    }
  }

  if (reportPath) {
    writeReportFile(report, reportPath);
  }

  return {
    report,
    reportPath
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = materializeWorkItem({ args });
    const report = result.report;
    const slug = report.work_item_slug || "<unresolved>";
    const summary = [
      `OK: materialized work item candidate '${slug}'`,
      `materialization_status=${report.materialization_status}`,
      `protocol_status=${report.protocol_status}`,
      `dedup_result=${report.dedup_result}`,
      `change_strategy=${report.change_strategy}`
    ].join(" | ");

    console.log(summary);
    if (result.reportPath) {
      console.log(`Report: ${result.reportPath}`);
    }
    console.log(JSON.stringify(report, null, 2));
  } catch (error) {
    const message = error.message.startsWith("ERROR:") ? error.message : formatErrors([error.message]);
    console.error(message);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  materializeWorkItem
};
