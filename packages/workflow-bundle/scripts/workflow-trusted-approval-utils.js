const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

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

const GATE_TO_STEP_ID = {
  bootstrap: "s01",
  spec: "s04",
  contract: "s04",
  dor: "s04",
  approach: "s05",
  foundation: "s05",
  task_plan: "s06",
  uat: "s08",
  release: "s08",
  business_acceptance: "s08",
  dod: "s08"
};

const SUPPORTED_RECEIPT_KINDS = new Set(["work-item", "change", "gate"]);
const APPROVED_RECEIPT_STATUSES = new Set(["APPROVED"]);
const PRIVATE_KEY_FILE = "approver-private.pem";
const PUBLIC_KEY_FILE = "approver-public.pem";
const NONINTERACTIVE_APPROVAL_FIXTURE_ENV = "WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE";

function normalizeSingleValue(value) {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }

  return value;
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function isWithinPath(parentPath, childPath) {
  return childPath === parentPath || childPath.startsWith(`${parentPath}${path.sep}`);
}

function normalizeProjectRelativePath(projectRoot, inputPath, label) {
  const raw = String(inputPath || "").trim();
  if (!raw || raw === ".") {
    return "";
  }

  const resolved = path.resolve(projectRoot, raw);
  if (!isWithinPath(projectRoot, resolved)) {
    throw new Error(`${label} must stay within project root: ${inputPath}`);
  }

  return path.relative(projectRoot, resolved).replace(/\\/g, "/");
}

function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function readFileSha256(filePath) {
  return sha256(fs.readFileSync(filePath));
}

function getGateStepId(gate) {
  const normalizedGate = String(gate || "").trim();
  const stepId = GATE_TO_STEP_ID[normalizedGate];
  if (!stepId) {
    throw new Error(`Unsupported workflow gate '${normalizedGate}'.`);
  }

  return stepId;
}

function getWorkflowStepNotePath(workflowRoot, workItemSlug, stepId) {
  const stepSlug = STEP_NOTE_SLUGS[stepId];
  if (!stepSlug) {
    throw new Error(`Unsupported workflow step '${stepId}'.`);
  }

  return path.join(workflowRoot, `${workItemSlug}.${stepId}.${stepSlug}.md`);
}

function resolveTrustedApprovalRoot({ projectRoot, overrideRoot }) {
  const explicitRoot =
    normalizeSingleValue(overrideRoot) ||
    normalizeSingleValue(process.env.WORKFLOW_BUNDLE_APPROVAL_ROOT) ||
    path.join(os.homedir(), ".workflow-bundle", "trusted-approvals");
  const approvalRoot = path.resolve(projectRoot, explicitRoot);
  const allowInsecure = String(process.env.WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT || "").trim().toLowerCase() === "true";

  if (!allowInsecure && isWithinPath(projectRoot, approvalRoot)) {
    throw new Error(
      `Trusted approval root must stay outside project root: ${approvalRoot}. ` +
        "Set WORKFLOW_BUNDLE_APPROVAL_ROOT to an external path or WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT=true for local test fixtures."
    );
  }

  return {
    approvalRoot,
    allowInsecure
  };
}

function buildProjectApprovalNamespace(projectRoot) {
  const safeProjectName =
    path
      .basename(projectRoot)
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "project";
  const projectHash = sha256(projectRoot).slice(0, 12);
  return `${safeProjectName}-${projectHash}`;
}

function getApproverKeyPaths(approvalRoot) {
  return {
    privateKeyPath: path.join(approvalRoot, PRIVATE_KEY_FILE),
    publicKeyPath: path.join(approvalRoot, PUBLIC_KEY_FILE)
  };
}

function promptHiddenInput(promptText) {
  if (!process.stdin.isTTY) {
    throw new Error("Human approval requires an interactive TTY. Run the approve command in a human-controlled terminal.");
  }

  const stdin = process.stdin;
  const stdout = process.stdout;
  const buffer = Buffer.alloc(1);
  const previousRawMode = stdin.isRaw;
  let value = "";

  stdout.write(promptText);
  stdin.resume();
  stdin.setRawMode(true);

  try {
    while (true) {
      const bytesRead = fs.readSync(0, buffer, 0, 1, null);
      if (bytesRead < 1) {
        break;
      }

      const char = buffer.toString("utf8", 0, bytesRead);
      if (char === "\r" || char === "\n") {
        stdout.write("\n");
        break;
      }
      if (char === "\u0003") {
        throw new Error("Approval entry cancelled.");
      }
      if (char === "\u007f") {
        value = value.slice(0, -1);
        continue;
      }

      value += char;
    }
  } finally {
    stdin.setRawMode(Boolean(previousRawMode));
    stdin.pause();
  }

  return value.trim();
}

function isNonInteractiveApprovalFixtureEnabled() {
  return String(process.env[NONINTERACTIVE_APPROVAL_FIXTURE_ENV] || "").trim().toLowerCase() === "true";
}

function resolveApprovalPassphrase(explicitPassphrase = "") {
  const inlinePassphrase = normalizeSingleValue(explicitPassphrase);
  const envPassphrase = normalizeSingleValue(process.env.WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE || "");

  if (inlinePassphrase || envPassphrase) {
    if (!isNonInteractiveApprovalFixtureEnabled()) {
      throw new Error(
        "Non-interactive human approval is disabled in normal mode. " +
          "Remove --approval-passphrase and WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE, then run the approve command in a human-controlled TTY."
      );
    }
  }

  const passphrase = inlinePassphrase || envPassphrase || promptHiddenInput("Enter human approval passphrase: ");

  if (!passphrase) {
    throw new Error("Missing human approval passphrase.");
  }

  return passphrase;
}

function serializeSignedReceiptPayload(payload) {
  return JSON.stringify(payload);
}

function ensureApproverKeyPair({ approvalRoot, passphrase }) {
  const { privateKeyPath, publicKeyPath } = getApproverKeyPaths(approvalRoot);
  if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath)) {
    return { privateKeyPath, publicKeyPath };
  }

  ensureDirectory(approvalRoot);
  const generated = crypto.generateKeyPairSync("ed25519", {
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase
    },
    publicKeyEncoding: {
      type: "spki",
      format: "pem"
    }
  });

  fs.writeFileSync(privateKeyPath, generated.privateKey, "utf8");
  fs.writeFileSync(publicKeyPath, generated.publicKey, "utf8");

  return { privateKeyPath, publicKeyPath };
}

function signReceiptPayload({ approvalRoot, payload, passphrase }) {
  const { privateKeyPath, publicKeyPath } = ensureApproverKeyPair({
    approvalRoot,
    passphrase
  });
  const signature = crypto.sign(null, Buffer.from(serializeSignedReceiptPayload(payload)), {
    key: fs.readFileSync(privateKeyPath, "utf8"),
    passphrase
  });

  return {
    signature: signature.toString("base64"),
    publicKeyPath
  };
}

function isTrustedReceiptSignatureValid({ approvalRoot, receipt }) {
  if (!receipt || !receipt.signature) {
    return false;
  }

  const { publicKeyPath } = getApproverKeyPaths(approvalRoot);
  if (!fs.existsSync(publicKeyPath)) {
    return false;
  }

  const payload = {
    schema_version: receipt.schema_version,
    kind: receipt.kind,
    project_root: receipt.project_root,
    work_item_slug: receipt.work_item_slug,
    change_id: receipt.change_id,
    gate: receipt.gate,
    approval_status: receipt.approval_status,
    reviewed_by: receipt.reviewed_by,
    reviewed_at: receipt.reviewed_at,
    note: receipt.note,
    artifact_ref: receipt.artifact_ref,
    artifact_sha256: receipt.artifact_sha256,
    recorded_at: receipt.recorded_at
  };

  return crypto.verify(
    null,
    Buffer.from(serializeSignedReceiptPayload(payload)),
    fs.readFileSync(publicKeyPath, "utf8"),
    Buffer.from(receipt.signature, "base64")
  );
}

function buildReceiptPath({ projectRoot, approvalRoot, kind, workItemSlug, changeId, gate }) {
  const normalizedKind = String(kind || "").trim();
  if (!SUPPORTED_RECEIPT_KINDS.has(normalizedKind)) {
    throw new Error(`Unsupported trusted approval kind '${normalizedKind}'.`);
  }

  const namespaceRoot = path.join(approvalRoot, buildProjectApprovalNamespace(projectRoot));

  switch (normalizedKind) {
    case "work-item":
      if (!workItemSlug) {
        throw new Error("Missing workItemSlug for trusted work-item receipt.");
      }
      return path.join(namespaceRoot, "work-items", `${workItemSlug}.json`);
    case "change":
      if (!changeId) {
        throw new Error("Missing changeId for trusted change receipt.");
      }
      return path.join(namespaceRoot, "changes", `${changeId}.json`);
    case "gate":
      if (!workItemSlug || !gate) {
        throw new Error("Missing workItemSlug or gate for trusted gate receipt.");
      }
      return path.join(namespaceRoot, "gates", workItemSlug, `${gate}.json`);
    default:
      throw new Error(`Unsupported trusted approval kind '${normalizedKind}'.`);
  }
}

function resolveGateArtifact({ projectRoot, workflowRoot, workItemSlug, gate, ref }) {
  const stepId = getGateStepId(gate);
  let artifactPath = "";

  if (gate === "bootstrap") {
    if (!ref) {
      throw new Error("bootstrap approval requires '--ref <path>' to the bootstrap artifact.");
    }

    const relativeRef = normalizeProjectRelativePath(projectRoot, ref, "bootstrap ref");
    artifactPath = path.join(projectRoot, relativeRef);
  } else {
    artifactPath = getWorkflowStepNotePath(workflowRoot, workItemSlug, stepId);
  }

  if (!fs.existsSync(artifactPath)) {
    throw new Error(`Missing artifact for trusted gate approval: ${artifactPath}`);
  }

  return {
    gate,
    stepId,
    artifactPath,
    artifactRef: path.relative(projectRoot, artifactPath).replace(/\\/g, "/"),
    artifactSha256: readFileSha256(artifactPath)
  };
}

function loadTrustedApprovalReceipt({ projectRoot, overrideRoot, kind, workItemSlug, changeId, gate }) {
  const { approvalRoot } = resolveTrustedApprovalRoot({ projectRoot, overrideRoot });
  const receiptPath = buildReceiptPath({
    projectRoot,
    approvalRoot,
    kind,
    workItemSlug,
    changeId,
    gate
  });

  if (!fs.existsSync(receiptPath)) {
    return {
      approvalRoot,
      receiptPath,
      receipt: null
    };
  }

  return {
    approvalRoot,
    receiptPath,
    receipt: JSON.parse(fs.readFileSync(receiptPath, "utf8"))
  };
}

function writeTrustedApprovalReceipt({
  projectRoot,
  overrideRoot,
  kind,
  workItemSlug,
  changeId,
  gate,
  reviewedBy,
  reviewedAt,
  note,
  approvalStatus,
  artifactRef,
  artifactSha256,
  approvalPassphrase
}) {
  const normalizedStatus = String(approvalStatus || "").trim().toUpperCase();
  const { approvalRoot } = resolveTrustedApprovalRoot({ projectRoot, overrideRoot });
  const receiptPath = buildReceiptPath({
    projectRoot,
    approvalRoot,
    kind,
    workItemSlug,
    changeId,
    gate
  });

  ensureDirectory(path.dirname(receiptPath));

  const payload = {
    schema_version: 1,
    kind,
    project_root: projectRoot,
    work_item_slug: workItemSlug || "",
    change_id: changeId || "",
    gate: gate || "",
    approval_status: normalizedStatus,
    reviewed_by: String(reviewedBy || "").trim(),
    reviewed_at: String(reviewedAt || "").trim(),
    note: String(note || "").trim(),
    artifact_ref: artifactRef || "",
    artifact_sha256: artifactSha256 || "",
    recorded_at: new Date().toISOString()
  };
  const passphrase = resolveApprovalPassphrase(approvalPassphrase);
  const { signature } = signReceiptPayload({
    approvalRoot,
    payload,
    passphrase
  });
  const signedPayload = {
    ...payload,
    signature
  };

  fs.writeFileSync(receiptPath, `${JSON.stringify(signedPayload, null, 2)}\n`, "utf8");

  return {
    approvalRoot,
    receiptPath,
    receipt: signedPayload
  };
}

function hasApprovedReceipt(receipt, approvalRoot = "") {
  return Boolean(
    receipt &&
      APPROVED_RECEIPT_STATUSES.has(String(receipt.approval_status || "").trim().toUpperCase()) &&
      approvalRoot &&
      isTrustedReceiptSignatureValid({ approvalRoot, receipt })
  );
}

module.exports = {
  APPROVED_RECEIPT_STATUSES,
  GATE_TO_STEP_ID,
  buildReceiptPath,
  ensureApproverKeyPair,
  getGateStepId,
  getApproverKeyPaths,
  getWorkflowStepNotePath,
  hasApprovedReceipt,
  isTrustedReceiptSignatureValid,
  loadTrustedApprovalReceipt,
  normalizeProjectRelativePath,
  resolveApprovalPassphrase,
  resolveGateArtifact,
  resolveTrustedApprovalRoot,
  writeTrustedApprovalReceipt
};
