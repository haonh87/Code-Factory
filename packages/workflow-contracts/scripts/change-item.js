const path = require("path");
const { formatErrors, parseCliArgs } = require("./workflow-validator-utils");
const {
  CHANGE_APPROVAL_STATUSES,
  CHANGE_DECISION_OWNERS,
  CHANGE_ID_PATTERN
} = require("./workflow-change-definitions");
const {
  loadChangeProposalState,
  normalizeArray,
  normalizeChangeProposalState,
  normalizeSingleValue,
  syncChangeProposalState
} = require("./change-item-utils");

const SUPPORTED_ACTIONS = new Set(["status", "approve", "reject"]);

function validateChoice(name, value, allowedValues) {
  if (!allowedValues.includes(value)) {
    throw new Error(`Invalid ${name} '${value}'. Allowed values: ${allowedValues.join(", ")}`);
  }
}

function requireChangeId(args) {
  const changeId = normalizeSingleValue(args["change-id"] || "");
  if (!changeId) {
    throw new Error("Missing required argument '--change-id'.");
  }
  if (!CHANGE_ID_PATTERN.test(changeId)) {
    throw new Error(`Invalid change-id '${changeId}'. Use uppercase tokens like CHANGE-001.`);
  }
  return changeId;
}

function getNoteText(args, fallback = "") {
  const notes = normalizeArray(args.note);
  if (notes.length > 0) {
    return notes.join(" | ");
  }

  return fallback;
}

function applyApprove(stateInput, args) {
  const state = normalizeChangeProposalState(stateInput);
  const reviewedBy = normalizeSingleValue(args["reviewed-by"] || args.actor || "human");
  const reviewedAt = normalizeSingleValue(args["reviewed-at"] || new Date().toISOString());
  const noteText = getNoteText(args, "Human review approved this change package.");

  return normalizeChangeProposalState({
    ...state,
    status: "approved",
    review_required: true,
    approval_status: "APPROVED",
    reviewed_by: reviewedBy,
    reviewed_at: reviewedAt,
    review_notes: noteText ? [noteText] : state.review_notes
  });
}

function applyReject(stateInput, args) {
  const state = normalizeChangeProposalState(stateInput);
  const reviewedBy = normalizeSingleValue(args["reviewed-by"] || args.actor || "human");
  const reviewedAt = normalizeSingleValue(args["reviewed-at"] || new Date().toISOString());
  const noteText = getNoteText(args, "Human review rejected this change package.");

  return normalizeChangeProposalState({
    ...state,
    status: "draft",
    review_required: true,
    approval_status: "REJECTED",
    reviewed_by: reviewedBy,
    reviewed_at: reviewedAt,
    review_notes: noteText ? [noteText] : state.review_notes
  });
}

function applyAction(stateInput, action, args) {
  switch (action) {
    case "approve":
      return applyApprove(stateInput, args);
    case "reject":
      return applyReject(stateInput, args);
    default:
      throw new Error(`Unsupported change-item action '${action}'.`);
  }
}

function printStatus(changeId, stateInput) {
  const state = normalizeChangeProposalState(stateInput);
  const summary = [
    `OK: change '${changeId}'`,
    `status=${state.status}`,
    `approval_status=${state.approval_status}`,
    `decision_owner=${state.decision_owner}`,
    `review_required=${state.review_required ? "true" : "false"}`
  ].join(" | ");

  console.log(summary);
  console.log(JSON.stringify(state, null, 2));
}

function runCli() {
  const action = process.argv[2];
  if (!SUPPORTED_ACTIONS.has(action)) {
    console.error(
      formatErrors([`Unknown change-item action '${action || ""}'. Use one of: ${[...SUPPORTED_ACTIONS].join(", ")}`])
    );
    process.exit(1);
  }

  const args = parseCliArgs(process.argv.slice(3));

  try {
    const changeId = requireChangeId(args);
    const projectRoot = path.resolve(normalizeSingleValue(args["project-root"] || process.cwd()));
    const loaded = loadChangeProposalState({ projectRoot, changeId });
    validateChoice("decision_owner", loaded.state.decision_owner, CHANGE_DECISION_OWNERS);
    validateChoice("approval_status", loaded.state.approval_status, CHANGE_APPROVAL_STATUSES);

    if (action === "status") {
      printStatus(changeId, loaded.state);
      return;
    }

    const updatedState = applyAction(loaded.state, action, args);
    syncChangeProposalState({
      proposalPath: loaded.proposalPath,
      frontmatterLines: loaded.frontmatterLines,
      body: loaded.body,
      state: updatedState
    });
    printStatus(changeId, updatedState);
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
  applyAction,
  runCli
};
