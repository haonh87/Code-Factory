const fs = require("fs");
const path = require("path");
const { formatErrors, parseCliArgs, readUtf8 } = require("./workflow-validator-utils");
const {
  CHANGE_APPROVAL_STATUSES,
  CHANGE_DECISION_OWNERS,
  CHANGE_ID_PATTERN,
  CR_LEGACY_FIELD_ALIASES,
  normalizeCrId
} = require("./workflow-change-definitions");
const {
  loadChangeProposalState,
  normalizeArray,
  normalizeChangeProposalState,
  normalizeSingleValue,
  syncChangeProposalState
} = require("./change-item-utils");
const {
  hasApprovedReceipt,
  loadTrustedApprovalReceipt,
  writeTrustedApprovalReceipt
} = require("./workflow-trusted-approval-utils");

const SUPPORTED_ACTIONS = new Set(["status", "approve", "reject", "migrate"]);

// rewriteFrontmatterAliases (plan v5 §8, T6): đổi legacy alias keys -> canonical
// trong frontmatter (giữ nguyên value, không chạm body). Idempotent theo key.
function rewriteFrontmatterAliases(filePath) {
  const content = readUtf8(filePath);
  const lines = content.split(/\r?\n/);
  if (lines.length < 1 || lines[0].trim() !== "---") {
    return false;
  }
  let closingIndex = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "---") {
      closingIndex = i;
      break;
    }
  }
  if (closingIndex < 1) {
    return false;
  }
  let changed = false;
  let inLinkedCrsList = false;
  for (let i = 1; i < closingIndex; i += 1) {
    // Canonicalize value của list item dưới linked_changes/linked_crs (m6):
    // CHANGE-### -> CR-### để id đồng bộ với vocab canonical.
    const listItemMatch = lines[i].match(/^(\s+-\s+)(["']?)(.+?)(["']?)\s*$/);
    if (inLinkedCrsList && listItemMatch) {
      const normalizedItem = normalizeCrId(listItemMatch[3]);
      if (normalizedItem !== listItemMatch[3]) {
        lines[i] = `${listItemMatch[1]}${listItemMatch[2]}${normalizedItem}${listItemMatch[4]}`;
        changed = true;
      }
      continue;
    }

    const match = lines[i].match(/^([A-Za-z0-9_-]+):(\s*.*)$/);
    if (!match) {
      continue;
    }
    inLinkedCrsList = false;
    const legacyKey = match[1];
    const canonicalKey = CR_LEGACY_FIELD_ALIASES[legacyKey];
    if (legacyKey === "linked_changes" || legacyKey === "linked_crs") {
      inLinkedCrsList = true;
    }
    if (canonicalKey) {
      // change_id -> cr_id: canonicalize cả value (CHANGE-008 -> CR-008).
      if (legacyKey === "change_id") {
        const rawValue = match[2].trim().replace(/^["']|["']$/g, "");
        const wasQuoted = match[2].trim().startsWith('"') || match[2].trim().startsWith("'");
        const normalized = normalizeCrId(rawValue);
        lines[i] = `${canonicalKey}: ${wasQuoted ? JSON.stringify(normalized) : normalized}`;
      } else if (legacyKey === "change_status") {
        // change_status: draft -> cr_status: DRAFT — canonical CR vocab là
        // uppercase (m6).
        const rawValue = match[2].trim().replace(/^["']|["']$/g, "");
        lines[i] = `${canonicalKey}: ${rawValue.toUpperCase()}`;
      } else {
        lines[i] = `${canonicalKey}:${match[2]}`;
      }
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
  }
  return changed;
}

function collectPackageMdFiles(changeRoot) {
  const result = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const child = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(child);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        result.push(child);
      }
    }
  }
  walk(changeRoot);
  return result;
}

// migrateChangeVocabulary (plan v5 §8, T6): dry-run idempotent migration từ legacy
// CHANGE-### -> canonical CR-### (rename dir + rewrite frontmatter aliases). Mặc
// định dry-run; --apply để thực thi. Canonical dirs là no-op (idempotent).
function migrateChangeVocabulary({ projectRoot, changeId, dryRun = true }) {
  const changesRoot = path.join(projectRoot, "changes");
  if (!fs.existsSync(changesRoot)) {
    return { dryRun, plan: [], applied: 0 };
  }
  const allDirs = fs
    .readdirSync(changesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  let legacyDirs = allDirs.filter((name) => name.startsWith("CHANGE-"));
  if (changeId) {
    const targetCanonical = normalizeCrId(changeId);
    legacyDirs = legacyDirs.filter((name) => normalizeCrId(name) === targetCanonical);
  }

  const plan = legacyDirs.map((from) => {
    const to = normalizeCrId(from);
    return {
      from,
      to,
      files: collectPackageMdFiles(path.join(changesRoot, from)).map((f) => path.relative(projectRoot, f))
    };
  });

  if (dryRun) {
    return { dryRun: true, plan, applied: 0, skipped: [] };
  }

  let applied = 0;
  const skipped = [];
  for (const item of plan) {
    const fromDir = path.join(changesRoot, item.from);
    const toDir = path.join(changesRoot, item.to);
    if (fs.existsSync(toDir)) {
      // Không clobber canonical dir đã tồn tại; report rõ thay vì im lặng (m7)
      // — legacy dir bị shadow sẽ không bao giờ được đọc lại qua getChangePaths.
      skipped.push({
        from: item.from,
        to: item.to,
        reason: `canonical dir already exists; legacy '${item.from}' left in place and shadowed by '${item.to}'`
      });
      console.warn(
        `WARNING: skipped migrating '${item.from}' -> '${item.to}' (canonical dir already exists). ` +
          `Legacy content is shadowed and will not be read; reconcile or remove '${item.from}' manually.`
      );
      continue;
    }
    collectPackageMdFiles(fromDir).forEach((filePath) => rewriteFrontmatterAliases(filePath));
    fs.renameSync(fromDir, toDir);
    applied += 1;
  }
  return { dryRun: false, plan, applied, skipped };
}

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

function requireReviewedBy(args) {
  const reviewedBy = normalizeSingleValue(args["reviewed-by"] || "");
  if (!reviewedBy) {
    throw new Error("Missing required argument '--reviewed-by'.");
  }
  return reviewedBy;
}

function applyApprove(stateInput, args) {
  const state = normalizeChangeProposalState(stateInput);
  const reviewedBy = requireReviewedBy(args);
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
  const reviewedBy = requireReviewedBy(args);
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
  return printStatusWithReceipt(changeId, stateInput, null);
}

function printStatusWithReceipt(changeId, stateInput, receiptInfo) {
  const state = normalizeChangeProposalState(stateInput);
  const summary = [
    `OK: change '${changeId}'`,
    `status=${state.status}`,
    `approval_status=${state.approval_status}`,
    `decision_owner=${state.decision_owner}`,
    `review_required=${state.review_required ? "true" : "false"}`,
    `trusted_receipt=${receiptInfo && hasApprovedReceipt(receiptInfo.receipt, receiptInfo.approvalRoot) ? "APPROVED" : receiptInfo && receiptInfo.receipt ? receiptInfo.receipt.approval_status : "MISSING"}`
  ].join(" | ");

  console.log(summary);
  console.log(
    JSON.stringify(
      {
        ...state,
        trusted_receipt_path: receiptInfo ? receiptInfo.receiptPath : "",
        trusted_receipt: receiptInfo ? receiptInfo.receipt : null
      },
      null,
      2
    )
  );
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
    if (action === "migrate") {
      const projectRoot = path.resolve(normalizeSingleValue(args["project-root"] || process.cwd()));
      const changeId = normalizeSingleValue(args["change-id"] || "") || null;
      const dryRun = !args.apply;
      const result = migrateChangeVocabulary({ projectRoot, changeId, dryRun });
      if (dryRun) {
        console.log(`OK: dry-run planned ${result.plan.length} package(s). Use --apply to execute.`);
      } else {
        console.log(`OK: migrated ${result.applied} package(s) (canonical dirs skipped).`);
      }
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    const changeId = requireChangeId(args);
    const projectRoot = path.resolve(normalizeSingleValue(args["project-root"] || process.cwd()));
    const loaded = loadChangeProposalState({ projectRoot, changeId });
    validateChoice("decision_owner", loaded.state.decision_owner, CHANGE_DECISION_OWNERS);
    validateChoice("approval_status", loaded.state.approval_status, CHANGE_APPROVAL_STATUSES);
    const trustedReceipt = loadTrustedApprovalReceipt({
      projectRoot,
      overrideRoot: normalizeSingleValue(args["approval-root"] || ""),
      kind: "change",
      changeId
    });

    if (action === "status") {
      printStatusWithReceipt(changeId, loaded.state, trustedReceipt);
      return;
    }

    const updatedState = applyAction(loaded.state, action, args);
    syncChangeProposalState({
      proposalPath: loaded.proposalPath,
      frontmatterLines: loaded.frontmatterLines,
      body: loaded.body,
      state: updatedState
    });
    const reviewedBy = normalizeSingleValue(updatedState.reviewed_by || "");
    const reviewedAt = normalizeSingleValue(updatedState.reviewed_at || "");
    const reviewNote = normalizeArray(updatedState.review_notes).join(" | ");
    const storedReceipt = writeTrustedApprovalReceipt({
      projectRoot,
      overrideRoot: normalizeSingleValue(args["approval-root"] || ""),
      kind: "change",
      changeId,
      reviewedBy,
      reviewedAt,
      note: reviewNote,
      approvalStatus: updatedState.approval_status,
      approvalPassphrase: normalizeSingleValue(args["approval-passphrase"] || "")
    });
    printStatusWithReceipt(changeId, updatedState, storedReceipt);
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
  migrateChangeVocabulary,
  runCli
};
