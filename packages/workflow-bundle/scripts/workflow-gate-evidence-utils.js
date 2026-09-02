const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
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

// Adaptive artifacts make applicability explicit for every human-controlled gate.
// Legacy artifacts remain readable because missing keys still use the historical
// defaults and the legacy finalized-step host map below.
const APPROVAL_GATE_KEYS = [...SIGNOFF_KEYS];

function artifactReferenceError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function splitInlineYamlValues(input) {
  const values = [];
  let current = "";
  let quote = "";

  for (const character of input) {
    if (quote) {
      current += character;
      if (character === quote) {
        quote = "";
      }
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      current += character;
      continue;
    }
    if (character === ",") {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += character;
  }
  if (current.trim()) {
    values.push(current.trim());
  }
  return values;
}

function parseArtifactYamlScalar(rawValue) {
  const value = String(rawValue || "").trim();
  if (value === "[]") return [];
  if (value === "{}") return {};
  if (value.startsWith("[") && value.endsWith("]")) {
    const body = value.slice(1, -1).trim();
    return body ? splitInlineYamlValues(body).map(parseArtifactYamlScalar) : [];
  }
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch (_error) {
      return value.slice(1, -1);
    }
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }
  if (/^(?:true|false)$/i.test(value)) return value.toLowerCase() === "true";
  if (/^(?:null|~)$/i.test(value)) return null;
  if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value)) return Number(value);
  return value;
}

function assertSafeArtifactYamlKey(key, lineIndex) {
  if (["__proto__", "constructor", "prototype"].includes(key)) {
    throw artifactReferenceError(
      "ARTIFACT_REFERENCE_YAML_INVALID",
      `Unsafe YAML mapping key '${key}' at line ${lineIndex + 1}.`
    );
  }
}

function parseArtifactYaml(yamlText) {
  const tokens = String(yamlText || "")
    .split(/\r?\n/)
    .map((line, lineIndex) => ({
      indent: (line.match(/^ */) || [""])[0].length,
      text: line.trim(),
      lineIndex
    }))
    .filter((token) => token.text && !token.text.startsWith("#"));

  function parseBlock(startIndex, indent) {
    const isList = tokens[startIndex] && tokens[startIndex].indent === indent && tokens[startIndex].text.startsWith("-");
    const value = isList ? [] : {};
    let index = startIndex;

    while (index < tokens.length) {
      const token = tokens[index];
      if (token.indent < indent) break;
      if (token.indent > indent) {
        throw artifactReferenceError(
          "ARTIFACT_REFERENCE_YAML_INVALID",
          `Unexpected YAML indentation at line ${token.lineIndex + 1}.`
        );
      }

      if (isList) {
        if (!token.text.startsWith("-")) break;
        const itemText = token.text.slice(1).trim();
        index += 1;
        if (!itemText) {
          if (index >= tokens.length || tokens[index].indent <= indent) {
            value.push(null);
          } else {
            const child = parseBlock(index, tokens[index].indent);
            value.push(child.value);
            index = child.nextIndex;
          }
          continue;
        }

        const itemMatch = itemText.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
        if (!itemMatch) {
          value.push(parseArtifactYamlScalar(itemText));
          continue;
        }

        const item = {};
        const initialKey = itemMatch[1];
        assertSafeArtifactYamlKey(initialKey, token.lineIndex);
        const initialValue = itemMatch[2] || "";
        item[initialKey] = initialValue ? parseArtifactYamlScalar(initialValue) : null;
        if (index < tokens.length && tokens[index].indent > indent) {
          const child = parseBlock(index, tokens[index].indent);
          if (initialValue) {
            if (!child.value || Array.isArray(child.value) || typeof child.value !== "object") {
              throw artifactReferenceError(
                "ARTIFACT_REFERENCE_YAML_INVALID",
                `Expected YAML mapping after list item at line ${token.lineIndex + 1}.`
              );
            }
            Object.assign(item, child.value);
          } else {
            item[initialKey] = child.value;
          }
          index = child.nextIndex;
        }
        value.push(item);
        continue;
      }

      if (token.text.startsWith("-")) break;
      const mappingMatch = token.text.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
      if (!mappingMatch) {
        throw artifactReferenceError(
          "ARTIFACT_REFERENCE_YAML_INVALID",
          `Unsupported YAML mapping at line ${token.lineIndex + 1}.`
        );
      }
      const key = mappingMatch[1];
      assertSafeArtifactYamlKey(key, token.lineIndex);
      const rawValue = mappingMatch[2] || "";
      index += 1;
      if (rawValue) {
        value[key] = parseArtifactYamlScalar(rawValue);
      } else if (index < tokens.length && tokens[index].indent > indent) {
        const child = parseBlock(index, tokens[index].indent);
        value[key] = child.value;
        index = child.nextIndex;
      } else {
        value[key] = null;
      }
    }

    return { value, nextIndex: index };
  }

  if (tokens.length === 0) return {};
  return parseBlock(0, tokens[0].indent).value;
}

function resolveArtifactYamlPath(document, dottedPath, reference) {
  if (!dottedPath) return document;
  const segments = dottedPath.split(".").filter(Boolean);
  let current = document;

  for (const segment of segments) {
    const match = segment.match(/^([A-Za-z0-9_-]+)(?:\[([^\]]*)\])?$/);
    if (!match) {
      throw artifactReferenceError(
        "ARTIFACT_REFERENCE_PATH_MISSING",
        `Unsupported path segment '${segment}' in artifact reference '${reference}'.`
      );
    }
    const key = match[1];
    const selector = match[2];
    if (!current || Array.isArray(current) || typeof current !== "object" || !Object.prototype.hasOwnProperty.call(current, key)) {
      throw artifactReferenceError(
        "ARTIFACT_REFERENCE_PATH_MISSING",
        `Path '${dottedPath}' was not found in artifact reference '${reference}'.`
      );
    }
    current = current[key];
    if (selector !== undefined) {
      if (!Array.isArray(current)) {
        throw artifactReferenceError(
          "ARTIFACT_REFERENCE_PATH_MISSING",
          `Path segment '${segment}' does not select a list in artifact reference '${reference}'.`
        );
      }
      if (selector) {
        const selected = current.find((entry) => entry && typeof entry === "object" && String(entry.id) === selector);
        if (!selected) {
          throw artifactReferenceError(
            "ARTIFACT_REFERENCE_PATH_MISSING",
            `List item '${selector}' was not found in artifact reference '${reference}'.`
          );
        }
        current = selected;
      }
    }
  }
  return current;
}

function resolveArtifactReference({ projectRoot, currentFile, reference }) {
  const root = path.resolve(projectRoot || ".");
  const sourceFile = path.resolve(currentFile || "");
  const rawReference = String(reference || "").trim();
  const hashIndex = rawReference.indexOf("#");
  if (hashIndex < 0 || hashIndex === rawReference.length - 1) {
    throw artifactReferenceError(
      "ARTIFACT_REFERENCE_PATH_MISSING",
      `Artifact reference must contain '#<Section Heading>.<path>': '${rawReference}'.`
    );
  }

  const artifactRef = rawReference.slice(0, hashIndex);
  const fragment = rawReference.slice(hashIndex + 1);
  const dotIndex = fragment.indexOf(".");
  const heading = (dotIndex < 0 ? fragment : fragment.slice(0, dotIndex)).trim();
  const dottedPath = dotIndex < 0 ? "" : fragment.slice(dotIndex + 1).trim();
  const artifactPath = artifactRef ? path.resolve(root, artifactRef) : sourceFile;
  const relativeArtifactPath = path.relative(root, artifactPath);
  if (relativeArtifactPath === ".." || relativeArtifactPath.startsWith(`..${path.sep}`) || path.isAbsolute(relativeArtifactPath)) {
    throw artifactReferenceError(
      "ARTIFACT_REFERENCE_FILE_OUTSIDE_ROOT",
      `Artifact reference escapes project root: '${rawReference}'.`
    );
  }
  if (!fs.existsSync(artifactPath) || !fs.statSync(artifactPath).isFile()) {
    throw artifactReferenceError(
      "ARTIFACT_REFERENCE_FILE_MISSING",
      `Artifact reference file does not exist: ${artifactPath}`
    );
  }

  const lines = readUtf8(artifactPath).split(/\r?\n/);
  const headingLine = `## ${heading}`;
  const headingIndex = lines.findIndex((line) => line.trim() === headingLine);
  if (headingIndex < 0) {
    throw artifactReferenceError(
      "ARTIFACT_REFERENCE_HEADING_MISSING",
      `Artifact reference heading '${headingLine}' was not found in ${artifactPath}.`
    );
  }

  let yamlStart = -1;
  let yamlEnd = -1;
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    if (/^##\s+/.test(lines[index].trim())) break;
    if (yamlStart < 0 && lines[index].trim() === "```yaml") {
      yamlStart = index + 1;
      continue;
    }
    if (yamlStart >= 0 && lines[index].trim() === "```") {
      yamlEnd = index;
      break;
    }
  }
  if (yamlStart < 0 || yamlEnd < yamlStart) {
    throw artifactReferenceError(
      "ARTIFACT_REFERENCE_YAML_MISSING",
      `Artifact reference heading '${headingLine}' has no complete YAML block in ${artifactPath}.`
    );
  }

  const document = parseArtifactYaml(lines.slice(yamlStart, yamlEnd).join("\n"));
  return {
    artifactPath,
    heading,
    dottedPath,
    value: resolveArtifactYamlPath(document, dottedPath, rawReference)
  };
}

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

// D-D / REQ-004: the DoD gate decides whether a work item is finished, and it never
// looked at the artifact of finishing. Measured 2026-08-19: two work items reached
// DONE with every gate APPROVED and digest_match=true while main contained none of
// the change. The other three defects in this work item are friction - a command
// fails and the operator sees it. This one is silent.
//
// The decision is deliberately pure and separate from the git call so its edge matrix
// is testable without a repository. See uncommitted-delivery-guard.test.js.
function evaluateUncommittedDelivery({
  grantedWritePaths,
  dirtyEntries,
  isGitRepo,
  allowUncommitted,
  uncommittedReason
}) {
  const errors = [];
  const reason = String(uncommittedReason || "").trim();
  const paths = Array.isArray(grantedWritePaths) ? grantedWritePaths.filter(Boolean) : [];
  const dirty = Array.isArray(dirtyEntries) ? dirtyEntries.filter(Boolean) : [];

  // A malformed exemption request is refused unconditionally, including over a clean
  // tree: the operator asked for an exemption and must not be left guessing whether
  // it applied. An invisible exemption is worse than no check.
  if (allowUncommitted && !reason) {
    errors.push(
      "--allow-uncommitted-delivery requires a non-empty --uncommitted-reason, so the exemption is visible in the record."
    );
    return { errors, waived: false, reason: "", not_a_git_repo: !isGitRepo };
  }

  if (!isGitRepo) {
    // Nothing to verify: there is no history a delivery could be missing from.
    return { errors, waived: false, reason, not_a_git_repo: true };
  }

  const violations = [];
  if (paths.length === 0) {
    violations.push(
      "granted_write_paths is empty, so there is no declared scope to check. An empty declared scope is not evidence of a clean tree."
    );
  }
  if (dirty.length > 0) {
    violations.push(
      `the declared delivery scope holds uncommitted changes:\n    ${dirty.map((line) => line.trim()).join("\n    ")}`
    );
  }

  if (violations.length === 0) {
    return { errors, waived: false, reason, not_a_git_repo: false };
  }

  if (allowUncommitted) {
    return { errors, waived: true, reason, not_a_git_repo: false };
  }

  violations.forEach((violation) => {
    errors.push(
      `Refusing to close over an undelivered change: ${violation}\n` +
        "  Commit the delivery, or pass --allow-uncommitted-delivery with --uncommitted-reason \"<why>\"."
    );
  });

  return { errors, waived: false, reason, not_a_git_repo: false };
}

// Thin git shell around the pure rule above. Kept separate so a caller can be tested
// without a repository, and so a git failure degrades to "nothing to verify" rather
// than to a crash inside a gate.
function inspectDeclaredScopeCleanliness({ projectRoot, grantedWritePaths }) {
  const paths = Array.isArray(grantedWritePaths) ? grantedWritePaths.filter(Boolean) : [];

  let isGitRepo = false;
  try {
    const inside = execFileSync("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"]
    });
    isGitRepo = String(inside).trim() === "true";
  } catch (_e) {
    isGitRepo = false;
  }

  if (!isGitRepo || paths.length === 0) {
    return { isGitRepo, dirtyEntries: [] };
  }

  try {
    const out = execFileSync("git", ["status", "--porcelain", "--", ...paths], {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"]
    });
    return {
      isGitRepo,
      dirtyEntries: String(out)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    };
  } catch (_e) {
    return { isGitRepo, dirtyEntries: [] };
  }
}

// Reads the declared scope from the persisted report. Never writes it: four reports
// are hashed into sealed trusted receipts (ASM-001).
function readGrantedWritePaths({ workflowRoot, workItemSlug }) {
  const reportPath = path.join(workflowRoot, `${workItemSlug}.work-item-report.json`);
  if (!fs.existsSync(reportPath)) {
    return [];
  }
  try {
    const report = JSON.parse(readUtf8(reportPath));
    return Array.isArray(report.granted_write_paths) ? report.granted_write_paths.filter(Boolean) : [];
  } catch (_e) {
    return [];
  }
}

function getUncommittedDeliveryErrors({ projectRoot, workflowRoot, workItemSlug, allowUncommitted, uncommittedReason }) {
  const grantedWritePaths = readGrantedWritePaths({ workflowRoot, workItemSlug });
  const { isGitRepo, dirtyEntries } = inspectDeclaredScopeCleanliness({ projectRoot, grantedWritePaths });

  return evaluateUncommittedDelivery({
    grantedWritePaths,
    dirtyEntries,
    isGitRepo,
    allowUncommitted,
    uncommittedReason
  });
}

function getRequiredFinalizedGateKeys(stepId, approvalGates, sddMode, artifactShape = "legacy_v1") {
  if (artifactShape === "adaptive_v1") {
    const hostByGate = {
      spec: "s04",
      contract: "s04",
      dor: "s04",
      approach: sddMode === "light" ? "s06" : "s05",
      foundation: "s05",
      task_plan: "s06",
      uat: "s08",
      release: "s08",
      business_acceptance: "s08",
      dod: "s08"
    };
    return SIGNOFF_KEYS.filter(
      (key) => hostByGate[key] === stepId && approvalGates[key] === "required"
    );
  }

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
      artifactShape: "legacy_v1",
      requestLane: "",
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
      artifactShape: "legacy_v1",
      requestLane: "",
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
    artifactShape: getFrontmatterValue(frontmatterLines, "artifact_shape") || "legacy_v1",
    requestLane: getFrontmatterValue(frontmatterLines, "request_lane") || "",
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
        ...getMissingGateEvidenceErrors(snapshot, getRequiredFinalizedGateKeys(
          stepId,
          snapshot.approvalGates,
          resolvedSddMode,
          snapshot.artifactShape
        ), {
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
      ...getMissingGateEvidenceErrors(snapshot, getRequiredFinalizedGateKeys(
        "s08",
        snapshot.approvalGates,
        resolvedSddMode,
        snapshot.artifactShape
      ), {
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
  evaluateUncommittedDelivery,
  getApprovalGateDefault,
  getUncommittedDeliveryErrors,
  getFinalizedStepSemanticEvidenceErrors,
  getProtocolStepGateErrors,
  getProtocolStateContradictionErrors,
  getMarkdownSectionContent,
  getMissingGateEvidenceErrors,
  getRequiredFinalizedGateKeys,
  getSectionScalarValue,
  getTrustedReceiptArtifactErrors,
  getWorkflowStepNotePath,
  loadWorkflowStepGateSnapshot,
  resolveArtifactReference
};
