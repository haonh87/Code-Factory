const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const APPROVAL_TRANSACTION_FAILURE_POINTS = Object.freeze([
  "after_lock",
  "after_journal",
  "after_first_stage",
  "after_staging",
  "after_first_commit",
  "after_commit",
  "before_verify",
  "after_verified_commit"
]);

function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function normalizeWorkItemSlug(value) {
  const slug = String(value || "").trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid approval transaction work_item_slug '${slug}'.`);
  }
  return slug;
}

function normalizeGateRow(row) {
  const normalized = {
    gate: String((row && row.gate) || "").trim(),
    reviewer_role: String((row && row.reviewer_role) || "").trim(),
    artifact_digest: String((row && row.artifact_digest) || "").trim(),
    consequence: String((row && row.consequence) || "").trim()
  };
  Object.entries(normalized).forEach(([field, value]) => {
    if (!value) {
      throw new Error(`Approval bundle gate row requires '${field}'.`);
    }
  });
  return normalized;
}

function buildApprovalBundlePlan(input = {}) {
  const phase = String(input.phase || "").trim();
  if (!new Set(["readiness", "closeout"]).has(phase)) {
    throw new Error(`Unsupported approval bundle phase '${phase}'.`);
  }
  const gates = (Array.isArray(input.gates) ? input.gates : []).map((row) => normalizeGateRow(row));
  if (gates.length < 1) {
    throw new Error("Approval bundle requires at least one applicable gate.");
  }
  const seen = new Set();
  gates.forEach((row) => {
    if (seen.has(row.gate)) {
      throw new Error(`Approval bundle contains duplicate gate '${row.gate}'.`);
    }
    seen.add(row.gate);
  });
  return {
    schema_version: 1,
    work_item_slug: normalizeWorkItemSlug(input.work_item_slug),
    phase,
    decision: (() => {
      const decision = String(input.decision || "APPROVED").trim().toUpperCase();
      if (!new Set(["APPROVED", "REJECTED"]).has(decision)) {
        throw new Error(`Unsupported approval bundle decision '${decision}'.`);
      }
      return decision;
    })(),
    gates
  };
}

function getApprovalTransactionPaths({ transaction_root: transactionRoot, work_item_slug: workItemSlug }) {
  const root = path.resolve(String(transactionRoot || ""));
  if (!transactionRoot) {
    throw new Error("Approval transaction requires transaction_root.");
  }
  const slug = normalizeWorkItemSlug(workItemSlug);
  return {
    transaction_root: root,
    lock_path: path.join(root, `${slug}.lock`),
    journal_path: path.join(root, `${slug}.journal.json`)
  };
}

function assertExpectedPathState(targetPath, expectedSha256, label) {
  const exists = fs.existsSync(targetPath);
  if (expectedSha256 === null) {
    if (exists) {
      throw new Error(`Approval transaction preflight failed: ${label} must not exist: ${targetPath}`);
    }
    return;
  }
  if (typeof expectedSha256 !== "string") {
    return;
  }
  if (!exists || !fs.statSync(targetPath).isFile()) {
    throw new Error(`Approval transaction preflight failed: missing ${label}: ${targetPath}`);
  }
  const actual = sha256(fs.readFileSync(targetPath));
  if (actual !== expectedSha256) {
    throw new Error(
      `Approval transaction preflight failed: digest mismatch for ${label}: expected ${expectedSha256}, got ${actual}`
    );
  }
}

function normalizeOperations(operationsInput) {
  const operations = Array.isArray(operationsInput) ? operationsInput : [];
  if (operations.length < 1) {
    throw new Error("Approval transaction requires at least one file operation.");
  }
  const targets = new Set();
  return operations.map((operation, index) => {
    const rawTargetPath = String((operation && operation.target_path) || "");
    const targetPath = path.resolve(rawTargetPath);
    if (!operation || !operation.target_path || !path.isAbsolute(rawTargetPath)) {
      throw new Error(`Approval transaction operation ${index + 1} requires an absolute target_path.`);
    }
    if (targets.has(targetPath)) {
      throw new Error(`Approval transaction contains duplicate target_path '${targetPath}'.`);
    }
    targets.add(targetPath);
    const content = Buffer.isBuffer(operation.content)
      ? operation.content
      : Buffer.from(String(operation.content == null ? "" : operation.content), "utf8");
    return {
      id: String(operation.id || `operation-${index + 1}`),
      target_path: targetPath,
      content,
      has_expected_sha256: Object.prototype.hasOwnProperty.call(operation, "expected_sha256"),
      expected_sha256: operation.expected_sha256,
      content_sha256: sha256(content)
    };
  });
}

function normalizeGuards(guardsInput) {
  return (Array.isArray(guardsInput) ? guardsInput : []).map((guard, index) => {
    if (!guard || !guard.path) {
      throw new Error(`Approval transaction guard ${index + 1} requires path.`);
    }
    return {
      path: path.resolve(String(guard.path)),
      expected_sha256: guard.expected_sha256
    };
  });
}

function assertPreflight(operations, guards) {
  guards.forEach((guard) => assertExpectedPathState(guard.path, guard.expected_sha256, "guard"));
  operations.forEach((operation) => {
    if (operation.has_expected_sha256) {
      assertExpectedPathState(operation.target_path, operation.expected_sha256, operation.id);
    }
    const parent = path.dirname(operation.target_path);
    if (fs.existsSync(parent) && !fs.statSync(parent).isDirectory()) {
      throw new Error(`Approval transaction preflight failed: target parent is not a directory: ${parent}`);
    }
  });
}

function writeJournal(journalPath, journal) {
  const tempPath = `${journalPath}.tmp`;
  fs.writeFileSync(tempPath, `${JSON.stringify(journal, null, 2)}\n`, "utf8");
  fs.renameSync(tempPath, journalPath);
}

function injectBoundary(name, failAt, crashAt) {
  if (failAt !== name && crashAt !== name) {
    return;
  }
  const error = new Error(`Injected approval transaction ${crashAt === name ? "crash" : "failure"} at ${name}.`);
  error.approvalTransactionCrash = crashAt === name;
  throw error;
}

function cleanupPath(targetPath) {
  if (targetPath && fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { force: true });
  }
}

function rollbackJournal(journal, paths) {
  const entries = Array.isArray(journal.operations) ? [...journal.operations].reverse() : [];
  entries.forEach((entry) => {
    if (entry.existed_before) {
      if (fs.existsSync(entry.backup_path)) {
        cleanupPath(entry.target_path);
        fs.renameSync(entry.backup_path, entry.target_path);
      }
    } else if (["COMMITTING", "COMMITTED"].includes(journal.state) && !fs.existsSync(entry.stage_path)) {
      cleanupPath(entry.target_path);
    }
    cleanupPath(entry.stage_path);
    cleanupPath(entry.backup_path);
  });
  cleanupPath(paths.journal_path);
  cleanupPath(`${paths.journal_path}.tmp`);
  cleanupPath(paths.lock_path);
}

function completeJournal(journal, paths) {
  journal.operations.forEach((entry) => {
    cleanupPath(entry.backup_path);
    cleanupPath(entry.stage_path);
  });
  cleanupPath(paths.journal_path);
  cleanupPath(`${paths.journal_path}.tmp`);
  cleanupPath(paths.lock_path);
}

function getLockOwner(lockPath) {
  if (!fs.existsSync(lockPath)) {
    return null;
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(lockPath, "utf8"));
    return Number.isInteger(parsed.pid) && parsed.pid > 0 ? parsed : { unknown: true };
  } catch (_error) {
    return { unknown: true };
  }
}

function isProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error && error.code === "EPERM";
  }
}

function recoverApprovalTransaction({
  transaction_root: transactionRoot,
  work_item_slug: workItemSlug,
  refuse_if_live: refuseIfLive = false
}) {
  const paths = getApprovalTransactionPaths({ transaction_root: transactionRoot, work_item_slug: workItemSlug });
  const lockOwner = getLockOwner(paths.lock_path);
  if (refuseIfLive && lockOwner && (lockOwner.unknown || isProcessAlive(lockOwner.pid))) {
    throw new Error(`Approval transaction already in progress for '${workItemSlug}' (lock: ${paths.lock_path}).`);
  }
  if (!fs.existsSync(paths.journal_path)) {
    if (lockOwner && !refuseIfLive) {
      cleanupPath(paths.lock_path);
      return { status: "STALE_LOCK_REMOVED", work_item_slug: normalizeWorkItemSlug(workItemSlug) };
    }
    if (lockOwner && !lockOwner.unknown && !isProcessAlive(lockOwner.pid)) {
      cleanupPath(paths.lock_path);
      return { status: "STALE_LOCK_REMOVED", work_item_slug: normalizeWorkItemSlug(workItemSlug) };
    }
    return { status: "NOOP", work_item_slug: normalizeWorkItemSlug(workItemSlug) };
  }
  const journal = JSON.parse(fs.readFileSync(paths.journal_path, "utf8"));
  if (journal.work_item_slug !== normalizeWorkItemSlug(workItemSlug)) {
    throw new Error(`Approval transaction journal work item mismatch in ${paths.journal_path}.`);
  }
  if (journal.state === "COMMITTED") {
    const complete = journal.operations.every((entry) => {
      if (!fs.existsSync(entry.target_path)) return false;
      return sha256(fs.readFileSync(entry.target_path)) === entry.content_sha256;
    });
    if (complete) {
      completeJournal(journal, paths);
      return {
        status: "COMPLETED",
        work_item_slug: journal.work_item_slug,
        transaction_id: journal.transaction_id
      };
    }
  }
  rollbackJournal(journal, paths);
  return {
    status: "ROLLED_BACK",
    work_item_slug: journal.work_item_slug,
    transaction_id: journal.transaction_id
  };
}

function executeApprovalTransaction({
  plan: planInput,
  transaction_root: transactionRoot,
  operations: operationsInput,
  guards: guardsInput,
  fail_at: failAt,
  crash_at: crashAt
}) {
  const plan = buildApprovalBundlePlan(planInput);
  const paths = getApprovalTransactionPaths({
    transaction_root: transactionRoot,
    work_item_slug: plan.work_item_slug
  });

  if (fs.existsSync(paths.journal_path)) {
    recoverApprovalTransaction({
      transaction_root: transactionRoot,
      work_item_slug: plan.work_item_slug,
      refuse_if_live: true
    });
  }
  if (fs.existsSync(paths.lock_path)) {
    throw new Error(`Approval transaction already in progress for '${plan.work_item_slug}' (lock: ${paths.lock_path}).`);
  }

  const operations = normalizeOperations(operationsInput);
  const guards = normalizeGuards(guardsInput);
  assertPreflight(operations, guards);

  fs.mkdirSync(paths.transaction_root, { recursive: true });
  let lockFd = null;
  let journal = null;
  const transactionId = crypto.randomUUID();
  try {
    lockFd = fs.openSync(paths.lock_path, "wx");
    fs.writeFileSync(
      lockFd,
      `${JSON.stringify({ schema_version: 1, transaction_id: transactionId, pid: process.pid, started_at: new Date().toISOString() })}\n`,
      "utf8"
    );
    fs.closeSync(lockFd);
    lockFd = null;
    injectBoundary("after_lock", failAt, crashAt);

    journal = {
      schema_version: 1,
      transaction_id: transactionId,
      work_item_slug: plan.work_item_slug,
      phase: plan.phase,
      decision: plan.decision,
      state: "PREPARED",
      committed_count: 0,
      operations: operations.map((operation) => {
        const directory = path.dirname(operation.target_path);
        const base = path.basename(operation.target_path);
        const existingStat = fs.existsSync(operation.target_path) ? fs.statSync(operation.target_path) : null;
        return {
          id: operation.id,
          target_path: operation.target_path,
          stage_path: path.join(directory, `.${base}.${transactionId}.stage`),
          backup_path: path.join(directory, `.${base}.${transactionId}.backup`),
          existed_before: fs.existsSync(operation.target_path),
          mode_before: existingStat ? existingStat.mode & 0o777 : null,
          content_sha256: operation.content_sha256
        };
      })
    };
    writeJournal(paths.journal_path, journal);
    injectBoundary("after_journal", failAt, crashAt);

    journal.operations.forEach((entry, index) => {
      fs.mkdirSync(path.dirname(entry.target_path), { recursive: true });
      fs.writeFileSync(entry.stage_path, operations[index].content);
      if (entry.mode_before !== null) {
        fs.chmodSync(entry.stage_path, entry.mode_before);
      }
      if (index === 0) {
        injectBoundary("after_first_stage", failAt, crashAt);
      }
    });
    journal.state = "STAGED";
    writeJournal(paths.journal_path, journal);
    injectBoundary("after_staging", failAt, crashAt);

    assertPreflight(operations, guards);
    journal.state = "COMMITTING";
    writeJournal(paths.journal_path, journal);
    journal.operations.forEach((entry, index) => {
      if (entry.existed_before) {
        fs.renameSync(entry.target_path, entry.backup_path);
      }
      fs.renameSync(entry.stage_path, entry.target_path);
      journal.committed_count = index + 1;
      writeJournal(paths.journal_path, journal);
      if (index === 0) {
        injectBoundary("after_first_commit", failAt, crashAt);
      }
    });
    injectBoundary("after_commit", failAt, crashAt);
    injectBoundary("before_verify", failAt, crashAt);

    journal.operations.forEach((entry) => {
      assertExpectedPathState(entry.target_path, entry.content_sha256, entry.id);
    });
    journal.state = "COMMITTED";
    writeJournal(paths.journal_path, journal);
    injectBoundary("after_verified_commit", failAt, crashAt);
    completeJournal(journal, paths);
    return {
      status: "COMMITTED",
      work_item_slug: plan.work_item_slug,
      transaction_id: journal.transaction_id,
      committed_paths: journal.operations.map((entry) => entry.target_path)
    };
  } catch (error) {
    if (lockFd !== null) {
      try {
        fs.closeSync(lockFd);
      } catch (_closeError) {
        // Best effort; the rollback below still removes the lock path.
      }
    }
    if (error.approvalTransactionCrash) {
      throw error;
    }
    if (journal && fs.existsSync(paths.journal_path)) {
      rollbackJournal(journal, paths);
    } else {
      cleanupPath(paths.lock_path);
    }
    throw error;
  }
}

module.exports = {
  APPROVAL_TRANSACTION_FAILURE_POINTS,
  buildApprovalBundlePlan,
  executeApprovalTransaction,
  getApprovalTransactionPaths,
  recoverApprovalTransaction
};
