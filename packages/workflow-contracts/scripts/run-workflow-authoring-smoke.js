const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { parseCliArgs } = require("./workflow-validator-utils");

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function runNodeScript(repoRoot, scriptRelativePath, args) {
  execFileSync(process.execPath, [path.join(repoRoot, scriptRelativePath), ...args], {
    cwd: repoRoot,
    stdio: "pipe",
    encoding: "utf8"
  });
}

function replaceLine(content, pattern, replacement) {
  if (!pattern.test(content)) {
    throw new Error(`Pattern not found for replacement: ${pattern}`);
  }

  return content.replace(pattern, replacement);
}

function replaceYamlSection(content, heading, yamlLines) {
  const pattern = new RegExp(
    `(${escapeRegExp(heading)}\\n\`\`\`yaml\\n)([\\s\\S]*?)(\\n\`\`\`)`,
    "m"
  );

  if (!pattern.test(content)) {
    throw new Error(`Missing section '${heading}' for smoke patching.`);
  }

  return content.replace(pattern, `$1${yamlLines.join("\n")}$3`);
}

function seedProjectContext(projectRoot) {
  writeFile(
    path.join(projectRoot, "project-context", "project-context.md"),
    "# Project Context\n\nContext tối giản cho workflow authoring smoke.\n"
  );
  writeFile(
    path.join(projectRoot, "project-context", "constitution.md"),
    "# Constitution\n\nNguyên tắc tối giản cho smoke.\n"
  );
  writeFile(
    path.join(projectRoot, "project-context", "checklists", "default.md"),
    "# Default Checklist\n\n- default\n"
  );
  writeFile(
    path.join(projectRoot, "project-context", "checklists", "strict.md"),
    "# Strict Checklist\n\n- strict\n"
  );
  writeFile(
    path.join(projectRoot, "project-context", "checklists", "regulated.md"),
    "# Regulated Checklist\n\n- regulated\n"
  );
  writeFile(
    path.join(projectRoot, "project-context", "governance-exception-register.md"),
    [
      "# Governance Exception Register",
      "",
      "## Register",
      "",
      "| Exception ID | Work Item | Step | Principle | Owner | Status | Review Date | Notes |",
      "|---|---|---|---|---|---|---|---|",
      "| _none_ |  |  |  |  |  |  | Chưa có exception đang mở |",
      ""
    ].join("\n")
  );
}

function seedProductSpecs(projectRoot, scopeSlug) {
  writeFile(
    path.join(projectRoot, "product-specs", "brd", `${scopeSlug}.md`),
    [
      "---",
      `artifact_id: "${scopeSlug}.brd"`,
      "artifact_family: product-spec",
      "spec_type: BRD",
      'spec_status: "approved"',
      'spec_version: "1.0"',
      'owner: "po"',
      "reviewers:",
      '  - "ba"',
      "source_of_truth: true",
      "linked_work_items: []",
      "linked_changes: []",
      "---",
      "",
      `# BRD - ${scopeSlug}`,
      "",
      "## Business Context",
      "```yaml",
      "business_goals:",
      '  - id: BRD-001',
      '    description: "Cho phép tìm kiếm session theo scope đã chốt"',
      "scope:",
      '  in: ["workflow authoring smoke"]',
      "  out: []",
      "```",
      ""
    ].join("\n")
  );
  writeFile(
    path.join(projectRoot, "product-specs", "srs", `${scopeSlug}.md`),
    [
      "---",
      `artifact_id: "${scopeSlug}.srs"`,
      "artifact_family: product-spec",
      "spec_type: SRS",
      'spec_status: "approved"',
      'spec_version: "1.0"',
      'owner: "ba"',
      "reviewers:",
      '  - "developer"',
      '  - "qc"',
      "source_of_truth: true",
      "linked_work_items: []",
      "linked_changes: []",
      "---",
      "",
      `# SRS - ${scopeSlug}`,
      "",
      "## Requirement Spec",
      "```yaml",
      "functional_requirements:",
      '  - id: SRS-FR-001',
      '    description: "Truy vấn đúng theo scope smoke"',
      "    source_refs: [BRD-001]",
      "    acceptance_refs: [AC-001]",
      "non_functional_requirements:",
      '  - id: SRS-NFR-001',
      '    category: reliability',
      '    description: "Không làm vỡ flow validate"',
      "    acceptance_refs: [AC-002]",
      "ux_system_behavior:",
      '  - id: SRS-UX-001',
      '    description: "Output scaffold dễ chỉnh sửa"',
      "    acceptance_refs: [AC-003]",
      "constraints: []",
      "dependencies: []",
      "open_questions: []",
      "```",
      ""
    ].join("\n")
  );
}

function patchStrictSddWorkflow(projectRoot, workflowRoot, workItemSlug, changeId) {
  const files = fs
    .readdirSync(workflowRoot)
    .filter((fileName) => fileName.startsWith(`${workItemSlug}.s0`) && fileName.endsWith(".md"))
    .sort();

  files.forEach((fileName) => {
    const filePath = path.join(workflowRoot, fileName);
    let content = fs.readFileSync(filePath, "utf8");

    content = replaceLine(
      content,
      /spec_refs:\n  brd: ".*"\n  srs: ".*"/,
      `spec_refs:\n  brd: "product-specs/brd/${workItemSlug}.md"\n  srs: "product-specs/srs/${workItemSlug}.md"`
    );
    content = replaceLine(content, /spec_status: .*/m, 'spec_status: frozen');
    content = replaceLine(content, /change_status: .*/m, "change_status: verified");
    content = replaceLine(content, /archive_status: .*/m, "archive_status: ready_to_archive");

    if (fileName.includes(".s04.")) {
      content = replaceYamlSection(content, "## Spec Freeze", [
        "status: READY",
        "requirement_ids: [BRD-001, SRS-FR-001, SRS-NFR-001, SRS-UX-001]",
        "accepted_assumptions: []",
        "blockers: []"
      ]);
    }

    if ([".s04.", ".s05.", ".s06.", ".s07.", ".s08."].some((token) => fileName.includes(token))) {
      content = replaceYamlSection(content, "## SDD Traceability", [
        "requirement_refs: [SRS-FR-001, SRS-NFR-001, SRS-UX-001]",
        "acceptance_refs: [AC-001, AC-002, AC-003]",
        "task_refs: [TASK-001, TASK-002]",
        "test_refs: [TEST-001, TEST-002, TEST-003]"
      ]);
    }

    if (fileName.includes(".s05.")) {
      content = replaceYamlSection(content, "## Spec Change", [
        `change_id: "${changeId}"`,
        "detected_in_step: s05",
        "impact_area: technical",
        "current_spec_refs:",
        "  - SRS-FR-001",
        'problem: "Không phát hiện gap mới trong smoke case"',
        'proposed_change: "Giữ nguyên spec hiện tại"',
        "decision: DEFERRED",
        'decision_owner: "developer"',
        "updated_artifacts: []",
        "required_followups: []"
      ]);
    }

    if (fileName.includes(".s08.")) {
      content = replaceYamlSection(content, "## Spec Coverage", [
        "coverage:",
        '  - ref: "SRS-FR-001"',
        "    status: PASS",
        '  - ref: "SRS-NFR-001"',
        "    status: PASS",
        '  - ref: "SRS-UX-001"',
        "    status: PASS"
      ]);
    }

    fs.writeFileSync(filePath, content, "utf8");
  });
}

function validateBaseline(repoRoot, workflowRoot, projectRoot) {
  runNodeScript(repoRoot, "scripts/validate-workflow.js", [
    "--workflow-root",
    workflowRoot,
    "--project-root",
    projectRoot
  ]);
}

function runCaseBasicFull(repoRoot, projectRoot) {
  const workflowRoot = path.join(projectRoot, "work-items", "smoke-full-item");
  runNodeScript(repoRoot, "scripts/scaffold-workflow.js", [
    "--work-item",
    "smoke-full-item",
    "--workflow-root",
    workflowRoot,
    "--project-root",
    projectRoot
  ]);
  validateBaseline(repoRoot, workflowRoot, projectRoot);
  runNodeScript(repoRoot, "scripts/validate-workflow-planning.js", ["--workflow-root", workflowRoot]);
}

function runCaseQuickSingleStep(repoRoot, projectRoot) {
  const workflowRoot = path.join(projectRoot, "work-items", "smoke-quick-item");
  runNodeScript(repoRoot, "scripts/scaffold-workflow.js", [
    "--single-step",
    "--step",
    "s04",
    "--planning-track",
    "quick",
    "--work-item",
    "smoke-quick-item",
    "--workflow-root",
    workflowRoot,
    "--project-root",
    projectRoot
  ]);
  validateBaseline(repoRoot, workflowRoot, projectRoot);
  runNodeScript(repoRoot, "scripts/validate-workflow-planning.js", ["--workflow-root", workflowRoot]);
}

function runCaseEnterpriseMultiAgent(repoRoot, projectRoot) {
  const workflowRoot = path.join(projectRoot, "work-items", "smoke-enterprise-item");
  runNodeScript(repoRoot, "scripts/scaffold-workflow.js", [
    "--work-item",
    "smoke-enterprise-item",
    "--steps",
    "s05,s06,s07,s08",
    "--planning-track",
    "enterprise",
    "--execution-mode",
    "multi_agent",
    "--execution-role",
    "developer",
    "--execution-role",
    "qc",
    "--workflow-root",
    workflowRoot,
    "--project-root",
    projectRoot
  ]);
  validateBaseline(repoRoot, workflowRoot, projectRoot);
  runNodeScript(repoRoot, "scripts/validate-workflow-planning.js", ["--workflow-root", workflowRoot]);
  runNodeScript(repoRoot, "scripts/validate-workflow-execution.js", ["--workflow-root", workflowRoot]);
}

function runCaseStrictSddChange(repoRoot, projectRoot) {
  const workItemSlug = "smoke-sdd-change-item";
  const changeId = "CHANGE-SMOKE-001";
  const workflowRoot = path.join(projectRoot, "work-items", workItemSlug);
  const changeRoot = path.join(projectRoot, "changes", changeId);

  seedProductSpecs(projectRoot, workItemSlug);
  runNodeScript(repoRoot, "scripts/scaffold-change-package.js", [
    "--change-id",
    changeId,
    "--work-item",
    workItemSlug,
    "--change-root",
    changeRoot
  ]);
  runNodeScript(repoRoot, "scripts/scaffold-workflow.js", [
    "--work-item",
    workItemSlug,
    "--sdd-mode",
    "strict",
    "--change-id",
    changeId,
    "--change-status",
    "verified",
    "--archive-status",
    "ready_to_archive",
    "--spec-delta-ref",
    `changes/${changeId}/spec-delta/brd.delta.md`,
    "--spec-delta-ref",
    `changes/${changeId}/spec-delta/srs.delta.md`,
    "--workflow-root",
    workflowRoot,
    "--project-root",
    projectRoot
  ]);

  patchStrictSddWorkflow(projectRoot, workflowRoot, workItemSlug, changeId);

  validateBaseline(repoRoot, workflowRoot, projectRoot);
  runNodeScript(repoRoot, "scripts/validate-workflow-planning.js", ["--workflow-root", workflowRoot]);
  runNodeScript(repoRoot, "scripts/validate-workflow-sdd.js", [
    "--workflow-root",
    workflowRoot,
    "--project-root",
    projectRoot
  ]);
  runNodeScript(repoRoot, "scripts/validate-workflow-change.js", [
    "--workflow-root",
    workflowRoot,
    "--project-root",
    projectRoot
  ]);
}

function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const repoRoot = path.resolve(__dirname, "..");
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-authoring-smoke-"));
  const keepTemp = Boolean(args["keep-temp"]);
  const cases = [
    { name: "basic-full", run: runCaseBasicFull },
    { name: "quick-single-step", run: runCaseQuickSingleStep },
    { name: "enterprise-multi-agent", run: runCaseEnterpriseMultiAgent },
    { name: "strict-sdd-change", run: runCaseStrictSddChange }
  ];
  const failures = [];

  try {
    seedProjectContext(tempRoot);

    cases.forEach((smokeCase) => {
      try {
        smokeCase.run(repoRoot, tempRoot);
        console.log(`PASS: ${smokeCase.name}`);
      } catch (error) {
        const detail = error.stderr || error.stdout || error.message;
        failures.push(`[${smokeCase.name}] ${detail}`.trim());
      }
    });

    if (failures.length > 0) {
      failures.forEach((failure) => {
        console.error(`ERROR: ${failure}`);
      });
      process.exit(1);
    }

    console.log(`OK: workflow authoring smoke passed for ${cases.length} scaffold cases under ${tempRoot}`);
  } finally {
    if (!keepTemp) {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  main
};
