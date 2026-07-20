const path = require("path");
const {
  collectFilesRecursive,
  formatErrors,
  getFrontmatterLines,
  getFrontmatterNestedValue,
  getFrontmatterValue,
  getMarkdownSectionContent,
  normalizeYamlScalar,
  parseCliArgs,
  readUtf8,
  resolveExistingPath
} = require("./workflow-validator-utils");

function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const {
  REQUIRED_SDD_BLOCKS_BY_STEP,
  SDD_MODES,
  SPEC_STATUSES
} = require("./workflow-sdd-definitions");
const { isCanonicalCrId } = require("./workflow-change-definitions");

const filePattern =
  /^(?<work_item_slug>[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<step_id>s0[1-8])\.(?<step_slug>[a-z-]+)\.md$/;
const allowedSddModes = new Set(SDD_MODES);
const allowedSpecStatuses = new Set(SPEC_STATUSES);
const PROVENANCE_BASELINE = "BASELINE";
// Freeze decision (plan §4, AC-04): draft = chưa freeze; FROZEN = đã chốt.
// FROZEN bắt buộc decided_at (freeze là decision có thời điểm, không phải cờ mềm).
const allowedFreezeStatuses = new Set(["draft", "FROZEN"]);

function hasSectionContent(sectionContent, pattern) {
  return Boolean(sectionContent && pattern.test(sectionContent));
}

function validateSpecArtifact(specPath, expectedSpecType, errors, sourceFile, strictMode) {
  const content = readUtf8(specPath);
  const frontmatterLines = getFrontmatterLines(specPath);

  if (!frontmatterLines) {
    errors.push(`Missing or invalid YAML frontmatter in referenced spec: ${specPath} (from ${sourceFile})`);
    return;
  }

  const specType = getFrontmatterValue(frontmatterLines, "spec_type");
  const specStatus = getFrontmatterValue(frontmatterLines, "spec_status");

  if (specType !== expectedSpecType) {
    errors.push(`Referenced spec '${specPath}' must declare spec_type '${expectedSpecType}' (from ${sourceFile})`);
  }

  if (!specStatus || !allowedSpecStatuses.has(specStatus)) {
    errors.push(`Referenced spec '${specPath}' has invalid spec_status '${specStatus || ""}' (from ${sourceFile})`);
  }

  if (!strictMode) {
    return;
  }

  if (expectedSpecType === "BRD" && !/\bBRD-\d{3}\b/.test(content)) {
    errors.push(`Strict SDD requires at least one BRD ID in ${specPath} (from ${sourceFile})`);
  }

  if (expectedSpecType === "SRS" && !/\bSRS-(FR|NFR|UX)-\d{3}\b/.test(content)) {
    errors.push(`Strict SDD requires at least one SRS requirement ID in ${specPath} (from ${sourceFile})`);
  }
}

function resolveSpecPath(projectRoot, specRef, label, filePath, errors) {
  if (!specRef) {
    errors.push(`Missing spec_refs.${label} for SDD note: ${filePath}`);
    return null;
  }

  const resolved = path.resolve(projectRoot, specRef);
  if (!resolved.startsWith(projectRoot)) {
    errors.push(`spec_refs.${label} must stay within project root: ${filePath}`);
    return null;
  }

  try {
    return resolveExistingPath(resolved, `spec_refs.${label}`);
  } catch (_error) {
    errors.push(`Missing referenced spec '${specRef}' for ${filePath}`);
    return null;
  }
}

function validateStrictSectionContent(stepId, filePath, content, errors) {
  if (stepId === "s04") {
    const freezeSection = getMarkdownSectionContent(content, "## Spec Freeze");
    if (!hasSectionContent(freezeSection, /\b(BRD|SRS)-[A-Z0-9-]*\d{3}\b/)) {
      errors.push(`Strict SDD requires requirement IDs in '## Spec Freeze': ${filePath}`);
    }
  }

  if (["s04", "s05", "s06", "s07", "s08"].includes(stepId)) {
    const traceSection = getMarkdownSectionContent(content, "## SDD Traceability");
    if (!hasSectionContent(traceSection, /\b(SRS-(FR|NFR|UX)-\d{3}|AC-\d{3}|TASK-\d{3}|TEST-\d{3})\b/)) {
      errors.push(`Strict SDD requires trace IDs in '## SDD Traceability': ${filePath}`);
    }
  }

  if (stepId === "s08") {
    const coverageSection = getMarkdownSectionContent(content, "## Spec Coverage");
    if (!hasSectionContent(coverageSection, /\bSRS-(FR|NFR|UX)-\d{3}\b/)) {
      errors.push(`Strict SDD requires requirement IDs in '## Spec Coverage': ${filePath}`);
    }

    if (!hasSectionContent(coverageSection, /\bPASS\|FAIL\|PARTIAL\|UNTESTED\b/) && !hasSectionContent(coverageSection, /\b(PASS|FAIL|PARTIAL|UNTESTED)\b/)) {
      errors.push(`Strict SDD requires coverage status in '## Spec Coverage': ${filePath}`);
    }
  }
}

// --- Spec Card (Light) semantic validation (plan v5 §4, F-05) ---
// Light dùng một source-of-truth Spec Card thay BRD/SRS riêng. Validator kiểm
// REQ/AC mapping, provenance (BASELINE|CR-###), freeze authority và no-duplicate.

function extractYamlFence(sectionContent) {
  if (!sectionContent) {
    return "";
  }
  const match = sectionContent.match(/```ya?ml\n([\s\S]*?)\n```/);
  return match ? match[1] : "";
}

function parseScalarFromYaml(yamlText, key) {
  if (!yamlText) {
    return null;
  }
  const pattern = new RegExp(`^\\s*${escapeRegExp(key)}:\\s*(.+?)\\s*$`, "m");
  const match = yamlText.match(pattern);
  return match ? normalizeYamlScalar(match[1]) : null;
}

// Parse một YAML list-of-objects block dạng:
//   <listKey>:
//     - id: REQ-001
//       field: value
// Trả về mảng object { id, ...fields }. Không phụ thuộc thư viện YAML.
function parseYamlListOfObjects(yamlText, listKey) {
  if (!yamlText) {
    return [];
  }
  const lines = yamlText.split(/\r?\n/);
  const items = [];
  let inList = false;
  let currentItem = null;
  const startPattern = new RegExp(`^${escapeRegExp(listKey)}:\\s*$`);

  const finalize = () => {
    if (currentItem) {
      items.push(currentItem);
      currentItem = null;
    }
  };

  for (const line of lines) {
    if (!inList) {
      if (startPattern.test(line)) {
        inList = true;
      }
      continue;
    }

    const itemMatch = line.match(/^\s{2,}-\s+([\w-]+):\s*(.*)$/);
    if (itemMatch) {
      finalize();
      currentItem = {};
      currentItem[itemMatch[1]] = normalizeYamlScalar(itemMatch[2]);
      continue;
    }

    const fieldMatch = line.match(/^\s{4,}([\w-]+):\s*(.*)$/);
    if (fieldMatch && currentItem) {
      currentItem[fieldMatch[1]] = normalizeYamlScalar(fieldMatch[2]);
      continue;
    }

    if (/^\s*$/.test(line) || /^\s*#/.test(line)) {
      continue;
    }

    if (/^\S/.test(line)) {
      inList = false;
      finalize();
    }
  }

  finalize();
  return items;
}

function isTruthyFlag(value) {
  return value === "true" || value === true;
}

function validateSpecCard(cardPath, sourceFile, errors) {
  const content = readUtf8(cardPath);
  const frontmatterLines = getFrontmatterLines(cardPath);

  if (!frontmatterLines) {
    errors.push(`Spec Card missing or invalid frontmatter: ${cardPath} (from ${sourceFile})`);
    return;
  }

  const specType = getFrontmatterValue(frontmatterLines, "spec_type");
  if (specType !== "SPEC_CARD") {
    errors.push(`Spec Card must declare spec_type 'SPEC_CARD' in ${cardPath} (from ${sourceFile})`);
  }

  const specStatus = getFrontmatterValue(frontmatterLines, "spec_status");
  if (!specStatus || !allowedSpecStatuses.has(specStatus)) {
    errors.push(`Spec Card has invalid spec_status '${specStatus || ""}' in ${cardPath} (from ${sourceFile})`);
  }

  // Identity (plan §4): spec_version là bắt buộc — atomic bump ở CR ACCEPTED
  // so sánh trực tiếp với trường này, thiếu nó thì provenance chain đứt.
  const specVersion = getFrontmatterValue(frontmatterLines, "spec_version");
  if (!specVersion) {
    errors.push(`Spec Card missing spec_version in ${cardPath} (from ${sourceFile})`);
  }

  const reqYaml = extractYamlFence(getMarkdownSectionContent(content, "## Requirements"));
  const acYaml = extractYamlFence(getMarkdownSectionContent(content, "## Acceptance Criteria"));
  const freezeYaml = extractYamlFence(getMarkdownSectionContent(content, "## Spec Freeze"));

  const requirements = parseYamlListOfObjects(reqYaml, "requirements");
  const acceptanceCriteria = parseYamlListOfObjects(acYaml, "acceptance_criteria");

  if (requirements.length === 0) {
    errors.push(`Spec Card requires at least one requirement in '## Requirements': ${cardPath} (from ${sourceFile})`);
  }
  if (acceptanceCriteria.length === 0) {
    errors.push(`Spec Card requires at least one acceptance criterion in '## Acceptance Criteria': ${cardPath} (from ${sourceFile})`);
  }

  const reqIds = new Set();
  requirements.forEach((req) => {
    const id = req.id;
    if (!id) {
      errors.push(`Spec Card has a requirement missing id in ${cardPath} (from ${sourceFile})`);
      return;
    }
    if (reqIds.has(id)) {
      errors.push(`Spec Card duplicate requirement id '${id}' in ${cardPath} (from ${sourceFile})`);
    } else {
      reqIds.add(id);
    }

    const provenance = req.provenance;
    if (!provenance) {
      errors.push(`Spec Card requirement '${id}' missing provenance (origin) in ${cardPath} (from ${sourceFile})`);
    } else if (provenance !== PROVENANCE_BASELINE && !isCanonicalCrId(provenance)) {
      errors.push(`Spec Card requirement '${id}' has invalid provenance '${provenance}' in ${cardPath} (from ${sourceFile})`);
    }

    const crRequired = isTruthyFlag(req.cr_required);
    if (crRequired && !(provenance && isCanonicalCrId(provenance))) {
      errors.push(`Spec Card requirement '${id}' requires CR but provenance is not a CR reference in ${cardPath} (from ${sourceFile})`);
    }
  });

  const acIds = new Set();
  const coveredReqs = new Set();
  acceptanceCriteria.forEach((ac) => {
    const id = ac.id;
    if (!id) {
      errors.push(`Spec Card has an acceptance criterion missing id in ${cardPath} (from ${sourceFile})`);
      return;
    }
    if (acIds.has(id)) {
      errors.push(`Spec Card duplicate acceptance criteria id '${id}' in ${cardPath} (from ${sourceFile})`);
    } else {
      acIds.add(id);
    }

    const requirement = ac.requirement;
    if (!requirement) {
      errors.push(`Spec Card acceptance criteria '${id}' missing requirement mapping in ${cardPath} (from ${sourceFile})`);
      return;
    }
    if (!reqIds.has(requirement)) {
      errors.push(`Spec Card acceptance criteria '${id}' maps to unknown requirement '${requirement}' in ${cardPath} (from ${sourceFile})`);
    } else {
      coveredReqs.add(requirement);
    }
  });

  // No-duplicate-trace / full mapping: mỗi requirement phải có ít nhất một AC.
  requirements.forEach((req) => {
    if (req.id && !coveredReqs.has(req.id)) {
      errors.push(`Spec Card requirement '${req.id}' has no acceptance criteria mapping in ${cardPath} (from ${sourceFile})`);
    }
  });

  const authority = parseScalarFromYaml(freezeYaml, "authority");
  if (!authority) {
    errors.push(`Spec Card missing freeze authority in '## Spec Freeze': ${cardPath} (from ${sourceFile})`);
  }

  // Freeze decision (AC-04): status bắt buộc và phải là draft|FROZEN; FROZEN
  // phải có decided_at (thời điểm chốt là một phần của decision).
  const freezeStatus = parseScalarFromYaml(freezeYaml, "status");
  if (!freezeStatus || !allowedFreezeStatuses.has(freezeStatus)) {
    errors.push(
      `Spec Card has invalid freeze status '${freezeStatus || ""}' in '## Spec Freeze' (expected draft|FROZEN): ${cardPath} (from ${sourceFile})`
    );
  } else if (freezeStatus === "FROZEN") {
    const decidedAt = parseScalarFromYaml(freezeYaml, "decided_at");
    if (!decidedAt) {
      errors.push(`Spec Card freeze status FROZEN requires decided_at in '## Spec Freeze': ${cardPath} (from ${sourceFile})`);
    }
  }

  // Assumptions/open decisions (plan §4): mỗi item phải có owner rõ.
  const assumptionsYaml = extractYamlFence(
    getMarkdownSectionContent(content, "## Assumptions And Open Decisions")
  );
  const assumptions = parseYamlListOfObjects(assumptionsYaml, "assumptions");
  const openDecisions = parseYamlListOfObjects(assumptionsYaml, "open_decisions");
  assumptions.forEach((item) => {
    if (!item.owner) {
      errors.push(
        `Spec Card assumption '${item.id || "(no id)"}' missing owner in ${cardPath} (from ${sourceFile})`
      );
    }
  });
  openDecisions.forEach((item) => {
    if (!item.owner) {
      errors.push(
        `Spec Card open decision '${item.id || "(no id)"}' missing owner in ${cardPath} (from ${sourceFile})`
      );
    }
  });
}

function validateWorkflowSdd(options) {
  const workflowRoot = resolveExistingPath(options.workflowRoot, "workflow-root");
  const projectRoot = resolveExistingPath(options.projectRoot || process.cwd(), "project-root");
  const files = collectFilesRecursive(workflowRoot, new Set([".md"]));
  const errors = [];
  let validatedCount = 0;

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    const match = fileName.match(filePattern);
    if (!match || !match.groups) {
      continue;
    }

    const frontmatterLines = getFrontmatterLines(filePath);
    if (!frontmatterLines) {
      continue;
    }

    const artifactFamily = getFrontmatterValue(frontmatterLines, "artifact_family");
    const artifactRole = getFrontmatterValue(frontmatterLines, "artifact_role");
    if (artifactFamily !== "workflow-step" || artifactRole !== "primary") {
      continue;
    }

    const sddMode = getFrontmatterValue(frontmatterLines, "sdd_mode") || "none";
    if (sddMode === "none") {
      continue;
    }

    validatedCount += 1;

    if (!allowedSddModes.has(sddMode)) {
      errors.push(`Invalid sdd_mode '${sddMode}' in ${filePath}`);
      continue;
    }

    const stepId = match.groups.step_id;
    const content = readUtf8(filePath);
    const specStatus = getFrontmatterValue(frontmatterLines, "spec_status");
    const lightMode = sddMode === "light";
    const strictMode = sddMode === "strict";

    if (!specStatus) {
      errors.push(`Missing spec_status for SDD note: ${filePath}`);
    } else if (!allowedSpecStatuses.has(specStatus)) {
      errors.push(`Invalid spec_status '${specStatus}' in ${filePath}`);
    }

    const requiredBlocks = REQUIRED_SDD_BLOCKS_BY_STEP[stepId] || [];
    requiredBlocks.forEach((heading) => {
      if (!getMarkdownSectionContent(content, heading)) {
        errors.push(`Missing required SDD block '${heading}' in ${filePath}`);
      }
    });

    if (lightMode) {
      // Light dùng spec_refs.card (Spec Card); brd/srs không bắt buộc.
      const cardRef = getFrontmatterNestedValue(frontmatterLines, "spec_refs", "card");
      const cardPath = resolveSpecPath(projectRoot, cardRef, "card", filePath, errors);
      if (cardPath) {
        validateSpecCard(cardPath, filePath, errors);
      }
      continue;
    }

    const brdRef = getFrontmatterNestedValue(frontmatterLines, "spec_refs", "brd");
    const srsRef = getFrontmatterNestedValue(frontmatterLines, "spec_refs", "srs");
    const brdPath = resolveSpecPath(projectRoot, brdRef, "brd", filePath, errors);
    const srsPath = resolveSpecPath(projectRoot, srsRef, "srs", filePath, errors);

    if (brdPath) {
      validateSpecArtifact(brdPath, "BRD", errors, filePath, strictMode);
    }

    if (srsPath) {
      validateSpecArtifact(srsPath, "SRS", errors, filePath, strictMode);
    }

    if (strictMode) {
      validateStrictSectionContent(stepId, filePath, content, errors);
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    validatedCount,
    workflowRoot
  };
}

function runCli() {
  const args = parseCliArgs(process.argv.slice(2));

  try {
    const result = validateWorkflowSdd({
      workflowRoot: args["workflow-root"],
      projectRoot: args["project-root"]
    });

    if (!result.ok) {
      console.error(formatErrors(result.errors));
      process.exit(1);
    }

    console.log(`OK: validated SDD for ${result.validatedCount} workflow note files under ${result.workflowRoot}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  validateWorkflowSdd,
  validateSpecCard,
  parseYamlListOfObjects,
  parseScalarFromYaml,
  extractYamlFence
};
