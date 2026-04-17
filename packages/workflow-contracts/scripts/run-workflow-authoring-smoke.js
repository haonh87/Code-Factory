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

function assertPathExists(targetPath, message) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(message || `Expected path to exist: ${targetPath}`);
  }
}

function assertContentIncludes(content, expected, message) {
  if (!content.includes(expected)) {
    throw new Error(message || `Expected content to include '${expected}'.`);
  }
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

function runNodeScriptCaptureOutput(repoRoot, scriptRelativePath, args) {
  return execFileSync(process.execPath, [path.join(repoRoot, scriptRelativePath), ...args], {
    cwd: repoRoot,
    stdio: "pipe",
    encoding: "utf8"
  });
}

function runNodeScriptExpectFailure(repoRoot, scriptRelativePath, args, expectedMessage) {
  try {
    runNodeScript(repoRoot, scriptRelativePath, args);
  } catch (error) {
    const detail = `${error.stderr || ""}\n${error.stdout || ""}\n${error.message || ""}`;
    if (expectedMessage && !detail.includes(expectedMessage)) {
      throw new Error(`Expected failure output to include '${expectedMessage}', got: ${detail}`);
    }
    return;
  }

  throw new Error(`Expected ${scriptRelativePath} to fail.`);
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
  const workflowRootBase = path.join(projectRoot, "work-items");
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

  const listOutput = runNodeScriptCaptureOutput(repoRoot, "scripts/work-item-protocol.js", [
    "list",
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase
  ]);
  assertContentIncludes(listOutput, "smoke-full-item", "Expected listed work item in work-item list output.");
  assertContentIncludes(listOutput, "bootstrap", "Expected legacy scaffold to appear as bootstrap source.");
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

function runCaseMaterializeAutoScaffold(repoRoot, projectRoot) {
  const workItemSlug = "add-google-oauth-login";
  const changeId = "CHANGE-001";
  const workflowRootBase = path.join(projectRoot, "work-items");
  const workflowRoot = path.join(workflowRootBase, workItemSlug);
  const reportPath = path.join(workflowRoot, `${workItemSlug}.work-item-report.json`);
  const s01Path = path.join(workflowRoot, `${workItemSlug}.s01.restate.md`);
  const changeProposalPath = path.join(projectRoot, "changes", changeId, "proposal.md");

  runNodeScript(repoRoot, "scripts/materialize-work-item.js", [
    "--request",
    "Thêm đăng nhập Google cho customer portal",
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--auto-scaffold"
  ]);

  assertPathExists(workflowRoot, `Expected materialized workflow root: ${workflowRoot}`);
  assertPathExists(s01Path, `Expected s01 note after materialize: ${s01Path}`);
  assertPathExists(reportPath, `Expected report JSON after materialize: ${reportPath}`);
  assertPathExists(changeProposalPath, `Expected change proposal after materialize: ${changeProposalPath}`);

  const s01Content = fs.readFileSync(s01Path, "utf8");
  assertContentIncludes(s01Content, "## Work Item Materialization", "Expected materialization block in s01.");
  assertContentIncludes(s01Content, "## Work Item Protocol", "Expected protocol block in s01.");
  assertContentIncludes(s01Content, 'materialization_status: READY', "Expected READY materialization status in s01.");
  assertContentIncludes(s01Content, 'protocol_status: MATERIALIZED', "Expected MATERIALIZED protocol status in s01.");
  assertContentIncludes(s01Content, `change_id: "${changeId}"`, "Expected change_id to be recorded in s01.");

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  if (report.protocol_status !== "MATERIALIZED") {
    throw new Error(`Expected protocol_status=MATERIALIZED, got '${report.protocol_status}'.`);
  }
  if (report.materialization_status !== "READY") {
    throw new Error(`Expected materialization_status=READY, got '${report.materialization_status}'.`);
  }
  if (report.work_item_slug !== workItemSlug) {
    throw new Error(`Expected work_item_slug='${workItemSlug}', got '${report.work_item_slug}'.`);
  }
  if (report.change_id !== changeId) {
    throw new Error(`Expected change_id='${changeId}', got '${report.change_id}'.`);
  }
  if (!Array.isArray(report.audit_events) || !report.audit_events.includes("WORKFLOW_SCAFFOLDED")) {
    throw new Error("Expected WORKFLOW_SCAFFOLDED audit event in materialize report.");
  }

  const proposalContent = fs.readFileSync(changeProposalPath, "utf8");
  assertContentIncludes(
    proposalContent,
    `- "${workItemSlug}"`,
    "Expected linked_work_items to include materialized work item."
  );
  assertContentIncludes(
    proposalContent,
    "approval_status: PENDING_REVIEW",
    "Expected pending approval state for agent-created change package."
  );

  const listOutput = runNodeScriptCaptureOutput(repoRoot, "scripts/work-item-protocol.js", [
    "list",
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase
  ]);
  assertContentIncludes(listOutput, workItemSlug, "Expected materialized work item in list output.");
  assertContentIncludes(listOutput, "protocol", "Expected protocol-managed work item source in list output.");

  runNodeScript(repoRoot, "scripts/work-item-protocol.js", [
    "approve",
    "--work-item",
    workItemSlug,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--reviewed-by",
    "po",
    "--note",
    "Approved after human review."
  ]);
  runNodeScriptExpectFailure(
    repoRoot,
    "scripts/work-item-protocol.js",
    [
      "activate",
      "--work-item",
      workItemSlug,
      "--project-root",
      projectRoot,
      "--workflow-root",
      workflowRootBase,
      "--actor",
      "coordinator"
    ],
    `change '${changeId}' approval_status=PENDING_REVIEW`
  );
  runNodeScript(repoRoot, "scripts/change-item.js", [
    "approve",
    "--change-id",
    changeId,
    "--project-root",
    projectRoot,
    "--reviewed-by",
    "po",
    "--note",
    "Approved change package after human review."
  ]);
  runNodeScript(repoRoot, "scripts/work-item-protocol.js", [
    "activate",
    "--work-item",
    workItemSlug,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--actor",
    "coordinator"
  ]);
  runNodeScript(repoRoot, "scripts/work-item-protocol.js", [
    "block",
    "--work-item",
    workItemSlug,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--actor",
    "coordinator",
    "--blocker",
    "Waiting for security checklist confirmation."
  ]);
  runNodeScript(repoRoot, "scripts/work-item-protocol.js", [
    "resume",
    "--work-item",
    workItemSlug,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--actor",
    "coordinator"
  ]);
  runNodeScript(repoRoot, "scripts/work-item-protocol.js", [
    "verify",
    "--work-item",
    workItemSlug,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--actor",
    "qc"
  ]);
  runNodeScript(repoRoot, "scripts/work-item-protocol.js", [
    "close",
    "--work-item",
    workItemSlug,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--actor",
    "coordinator"
  ]);

  const updatedReport = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  if (updatedReport.protocol_status !== "DONE") {
    throw new Error(`Expected protocol_status=DONE after lifecycle actions, got '${updatedReport.protocol_status}'.`);
  }
  if (updatedReport.approval_status !== "APPROVED") {
    throw new Error(`Expected approval_status=APPROVED after approve action, got '${updatedReport.approval_status}'.`);
  }

  const updatedS01Content = fs.readFileSync(s01Path, "utf8");
  assertContentIncludes(updatedS01Content, "approval_status: APPROVED", "Expected approval_status in synced s01 protocol block.");
  assertContentIncludes(updatedS01Content, "protocol_status: DONE", "Expected DONE protocol status in synced s01 protocol block.");

  validateBaseline(repoRoot, workflowRoot, projectRoot);
  runNodeScript(repoRoot, "scripts/validate-workflow-planning.js", ["--workflow-root", workflowRoot]);
  runNodeScript(repoRoot, "scripts/validate-workflow-execution.js", ["--workflow-root", workflowRoot]);
  runNodeScript(repoRoot, "scripts/validate-workflow-change.js", [
    "--workflow-root",
    workflowRoot,
    "--project-root",
    projectRoot
  ]);
  runNodeScript(repoRoot, "scripts/validate-work-item-protocol.js", [
    "--workflow-root",
    workflowRootBase,
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
    { name: "strict-sdd-change", run: runCaseStrictSddChange },
    { name: "materialize-auto-scaffold", run: runCaseMaterializeAutoScaffold }
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
