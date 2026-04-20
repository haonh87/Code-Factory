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

function assertOwnerWritable(targetPath, expectedWritable, message) {
  const actualWritable = Boolean(fs.statSync(targetPath).mode & 0o200);
  if (actualWritable !== expectedWritable) {
    throw new Error(
      message ||
        `Expected owner writable=${expectedWritable ? "true" : "false"} for ${targetPath}, got ${
          actualWritable ? "true" : "false"
        }.`
    );
  }
}

function makeTreeOwnerWritable(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return;
  }

  const stat = fs.lstatSync(targetPath);
  if (stat.isSymbolicLink()) {
    return;
  }

  const nextMode = stat.mode | 0o200;
  if (nextMode !== stat.mode) {
    fs.chmodSync(targetPath, nextMode);
  }

  if (!stat.isDirectory()) {
    return;
  }

  fs.readdirSync(targetPath, { withFileTypes: true }).forEach((entry) => {
    makeTreeOwnerWritable(path.join(targetPath, entry.name));
  });
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

function patchReviewedWorkflowGate(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  content = replaceLine(content, /^status: draft$/m, "status: reviewed");

  replacements.forEach(({ pattern, replacement }) => {
    content = replaceLine(content, pattern, replacement);
  });

  fs.writeFileSync(filePath, content, "utf8");
}

function patchMaterializedWorkflowForActivation(workflowRoot, workItemSlug) {
  const s04Path = path.join(workflowRoot, `${workItemSlug}.s04.acceptance-criteria.md`);
  const s05Path = path.join(workflowRoot, `${workItemSlug}.s05.technical-approach.md`);
  const s06Path = path.join(workflowRoot, `${workItemSlug}.s06.task-breakdown.md`);

  patchReviewedWorkflowGate(s04Path, [
    { pattern: /^governance_status: CHECKS_PENDING$/m, replacement: "governance_status: ALIGNED" },
    { pattern: /^spec_status: draft$/m, replacement: "spec_status: approved" },
    { pattern: /^  spec: \[\]$/m, replacement: "  spec:\n    - po" },
    { pattern: /^  dor: \[\]$/m, replacement: "  dor:\n    - po" },
    { pattern: /^  spec_reviewed_by: \[\]$/m, replacement: '  spec_reviewed_by:\n    - po' },
    { pattern: /^  spec_reviewed_at: ""$/m, replacement: '  spec_reviewed_at: "2026-04-19T09:10:00Z"' },
    { pattern: /^  dor_reviewed_by: \[\]$/m, replacement: '  dor_reviewed_by:\n    - po' },
    { pattern: /^  dor_reviewed_at: ""$/m, replacement: '  dor_reviewed_at: "2026-04-19T09:12:00Z"' }
  ]);

  let s05Content = fs.readFileSync(s05Path, "utf8");
  s05Content = replaceLine(s05Content, /^status: draft$/m, "status: reviewed");
  s05Content = replaceLine(s05Content, /^  approach: \[\]$/m, "  approach:\n    - developer");
  s05Content = replaceLine(
    s05Content,
    /^  approach_reviewed_by: \[\]$/m,
    '  approach_reviewed_by:\n    - developer'
  );
  s05Content = replaceLine(
    s05Content,
    /^  approach_reviewed_at: ""$/m,
    '  approach_reviewed_at: "2026-04-19T09:20:00Z"'
  );
  s05Content = replaceYamlSection(s05Content, "## Option Analysis", [
    "options:",
    '  - "Giữ login hiện tại và thêm Google OAuth vào auth service"',
    '  - "Tách auth broker mới chỉ cho Google login"',
    'recommended_option: "Giữ login hiện tại và thêm Google OAuth vào auth service"',
    "trade_offs:",
    '  - "Phương án 1 delta nhỏ hơn, ít mở boundary hơn"',
    '  - "Phương án 2 cô lập hơn nhưng tăng complexity không cần thiết cho smoke"'
  ]);
  fs.writeFileSync(s05Path, s05Content, "utf8");

  patchReviewedWorkflowGate(s06Path, [
    { pattern: /^  task_plan: \[\]$/m, replacement: "  task_plan:\n    - developer" },
    {
      pattern: /^  task_plan_reviewed_by: \[\]$/m,
      replacement: '  task_plan_reviewed_by:\n    - developer'
    },
    {
      pattern: /^  task_plan_reviewed_at: ""$/m,
      replacement: '  task_plan_reviewed_at: "2026-04-19T09:30:00Z"'
    }
  ]);
}

function patchMaterializedWorkflowForDone(workflowRoot, workItemSlug) {
  const s08Path = path.join(workflowRoot, `${workItemSlug}.s08.verification.md`);

  patchReviewedWorkflowGate(s08Path, [
    { pattern: /^governance_status: CHECKS_PENDING$/m, replacement: "governance_status: ALIGNED" },
    { pattern: /^  dod: \[\]$/m, replacement: "  dod:\n    - qc" },
    { pattern: /^  dod_reviewed_by: \[\]$/m, replacement: '  dod_reviewed_by:\n    - qc' },
    { pattern: /^  dod_reviewed_at: ""$/m, replacement: '  dod_reviewed_at: "2026-04-19T10:00:00Z"' }
  ]);
}

function sealWorkflowGate(repoRoot, projectRoot, workflowRootBase, workItemSlug, gate, reviewedBy, extraArgs = []) {
  runNodeScript(repoRoot, "scripts/workflow-gate-review.js", [
    "approve",
    "--work-item",
    workItemSlug,
    "--gate",
    gate,
    "--reviewed-by",
    reviewedBy,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    ...extraArgs
  ]);
}

function sealActivationGates(repoRoot, projectRoot, workflowRootBase, workItemSlug) {
  sealWorkflowGate(repoRoot, projectRoot, workflowRootBase, workItemSlug, "spec", "po");
  sealWorkflowGate(repoRoot, projectRoot, workflowRootBase, workItemSlug, "dor", "po");
  sealWorkflowGate(repoRoot, projectRoot, workflowRootBase, workItemSlug, "approach", "developer");
  sealWorkflowGate(repoRoot, projectRoot, workflowRootBase, workItemSlug, "task_plan", "developer");
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

function runCaseMutatingActionRequiresReport(repoRoot, projectRoot) {
  const workItemSlug = "legacy-report-required-item";
  const workflowRootBase = path.join(projectRoot, "work-items");
  const workflowRoot = path.join(workflowRootBase, workItemSlug);
  const reportPath = path.join(workflowRoot, `${workItemSlug}.work-item-report.json`);

  runNodeScript(repoRoot, "scripts/scaffold-workflow.js", [
    "--work-item",
    workItemSlug,
    "--workflow-root",
    workflowRoot,
    "--project-root",
    projectRoot
  ]);

  const statusOutput = runNodeScriptCaptureOutput(repoRoot, "scripts/work-item-protocol.js", [
    "status",
    "--work-item",
    workItemSlug,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase
  ]);
  assertContentIncludes(statusOutput, "protocol_status=MATERIALIZED", "Expected read-only bootstrap status for legacy scaffold.");
  assertContentIncludes(statusOutput, '"bootstrap_gate_status": "NOT_REQUIRED"', "Expected bootstrap status in read-only report.");

  runNodeScriptExpectFailure(
    repoRoot,
    "scripts/work-item-protocol.js",
    [
      "approve",
      "--work-item",
      workItemSlug,
      "--project-root",
      projectRoot,
      "--workflow-root",
      workflowRootBase
    ],
    `Missing work item report: ${reportPath}`
  );

  if (fs.existsSync(reportPath)) {
    throw new Error("Mutating action must not bootstrap and write a new protocol report.");
  }
}

function runCaseCapabilityControl(repoRoot, projectRoot) {
  const workItemSlug = "capability-guard-item";
  const workflowRootBase = path.join(projectRoot, "work-items");
  const workflowRoot = path.join(workflowRootBase, workItemSlug);
  const reportPath = path.join(workflowRoot, `${workItemSlug}.work-item-report.json`);
  const guardedRoot = path.join(projectRoot, "src");
  const guardedFile = path.join(guardedRoot, "main.ts");

  writeFile(guardedFile, "export const ready = true;\n");

  runNodeScript(repoRoot, "scripts/materialize-work-item.js", [
    "--request",
    "Thêm QR voucher screen cho khách hàng",
    "--work-item",
    workItemSlug,
    "--delivery-context",
    "brownfield",
    "--change-strategy",
    "create_new",
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--auto-scaffold"
  ]);

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const changeId = report.change_id;
  if (!changeId) {
    throw new Error("Expected change_id to be present for capability control smoke case.");
  }

  assertOwnerWritable(guardedRoot, false, "Expected implementation root to be locked before ACTIVE.");
  assertOwnerWritable(guardedFile, false, "Expected implementation file to be locked before ACTIVE.");

  runNodeScript(repoRoot, "scripts/work-item-protocol.js", [
    "approve",
    "--work-item",
    workItemSlug,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--reviewed-by",
    "po"
  ]);
  runNodeScript(repoRoot, "scripts/change-item.js", [
    "approve",
    "--change-id",
    changeId,
    "--project-root",
    projectRoot,
    "--reviewed-by",
    "po"
  ]);
  patchMaterializedWorkflowForActivation(workflowRoot, workItemSlug);
  sealActivationGates(repoRoot, projectRoot, workflowRootBase, workItemSlug);
  runNodeScript(repoRoot, "scripts/work-item-protocol.js", [
    "activate",
    "--work-item",
    workItemSlug,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--actor",
    "coordinator",
    "--write-root",
    "src"
  ]);

  assertOwnerWritable(guardedRoot, true, "Expected implementation root to be unlocked at ACTIVE s07.");
  assertOwnerWritable(guardedFile, true, "Expected implementation file to be unlocked at ACTIVE s07.");

  const capabilityStatus = runNodeScriptCaptureOutput(repoRoot, "scripts/workflow-capability-control.js", [
    "status",
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase
  ]);
  assertContentIncludes(capabilityStatus, '"granted_write_roots": [', "Expected granted write roots in capability status.");
  assertContentIncludes(capabilityStatus, '"src"', "Expected src write root in capability status.");

  patchMaterializedWorkflowForDone(workflowRoot, workItemSlug);
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

  assertOwnerWritable(guardedRoot, false, "Expected implementation root to be relocked after leaving ACTIVE.");
  assertOwnerWritable(guardedFile, false, "Expected implementation file to be relocked after leaving ACTIVE.");
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
  runNodeScript(repoRoot, "scripts/change-item.js", [
    "approve",
    "--change-id",
    changeId,
    "--project-root",
    projectRoot,
    "--reviewed-by",
    "po",
    "--note",
    "Approved change package for strict SDD smoke."
  ]);

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
  const workflowRootBase = path.join(projectRoot, "work-items");
  const workflowRoot = path.join(workflowRootBase, workItemSlug);
  const reportPath = path.join(workflowRoot, `${workItemSlug}.work-item-report.json`);
  const s01Path = path.join(workflowRoot, `${workItemSlug}.s01.restate.md`);

  runNodeScript(repoRoot, "scripts/materialize-work-item.js", [
    "--request",
    "Thêm đăng nhập Google cho customer portal",
    "--delivery-context",
    "brownfield",
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--auto-scaffold"
  ]);

  assertPathExists(workflowRoot, `Expected materialized workflow root: ${workflowRoot}`);
  assertPathExists(s01Path, `Expected s01 note after materialize: ${s01Path}`);
  assertPathExists(reportPath, `Expected report JSON after materialize: ${reportPath}`);

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const changeId = report.change_id;
  const changeProposalPath = path.join(projectRoot, "changes", changeId, "proposal.md");
  assertPathExists(changeProposalPath, `Expected change proposal after materialize: ${changeProposalPath}`);

  const s01Content = fs.readFileSync(s01Path, "utf8");
  assertContentIncludes(s01Content, "## Work Item Materialization", "Expected materialization block in s01.");
  assertContentIncludes(s01Content, "## Work Item Protocol", "Expected protocol block in s01.");
  assertContentIncludes(s01Content, 'materialization_status: READY', "Expected READY materialization status in s01.");
  assertContentIncludes(s01Content, 'protocol_status: MATERIALIZED', "Expected MATERIALIZED protocol status in s01.");
  assertContentIncludes(s01Content, `change_id: "${changeId}"`, "Expected change_id to be recorded in s01.");

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
      "coordinator",
      "--write-root",
      "src"
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
  patchMaterializedWorkflowForActivation(workflowRoot, workItemSlug);
  sealActivationGates(repoRoot, projectRoot, workflowRootBase, workItemSlug);
  runNodeScript(repoRoot, "scripts/work-item-protocol.js", [
    "activate",
    "--work-item",
    workItemSlug,
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--actor",
    "coordinator",
    "--write-root",
    "src"
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
    "coordinator",
    "--write-root",
    "src"
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
  patchMaterializedWorkflowForDone(workflowRoot, workItemSlug);
  sealWorkflowGate(repoRoot, projectRoot, workflowRootBase, workItemSlug, "dod", "qc");
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

function runCaseGreenfieldBootstrapPreflight(repoRoot, projectRoot) {
  const workItemSlug = "bootstrap-site-foundation";
  const workflowRootBase = path.join(projectRoot, "work-items");
  const blockedReportPath = path.join(projectRoot, "tmp", `${workItemSlug}.blocked.json`);
  const workflowRoot = path.join(workflowRootBase, workItemSlug);
  const approvedReportPath = path.join(workflowRoot, `${workItemSlug}.work-item-report.json`);
  const s01Path = path.join(workflowRoot, `${workItemSlug}.s01.restate.md`);
  const bootstrapRef = path.join(projectRoot, "project-context", "greenfield-bootstrap-approval.md");

  writeFile(
    bootstrapRef,
    [
      "# Greenfield Bootstrap Approval",
      "",
      "- Spec: approved",
      "- Contract: approved",
      "- Approach: approved",
      "- Foundation: approved"
    ].join("\n")
  );

  runNodeScript(repoRoot, "scripts/materialize-work-item.js", [
    "--request",
    "Tạo landing page marketing cho sản phẩm A",
    "--work-item",
    workItemSlug,
    "--work-item-type",
    "FEATURE",
    "--delivery-context",
    "greenfield",
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--output",
    blockedReportPath,
    "--auto-scaffold"
  ]);

  const blockedReport = JSON.parse(fs.readFileSync(blockedReportPath, "utf8"));
  if (blockedReport.protocol_status !== "PROPOSED") {
    throw new Error(`Expected greenfield preflight to keep protocol_status=PROPOSED, got '${blockedReport.protocol_status}'.`);
  }
  if (blockedReport.bootstrap_gate_status !== "PENDING_REVIEW") {
    throw new Error(`Expected bootstrap_gate_status=PENDING_REVIEW, got '${blockedReport.bootstrap_gate_status}'.`);
  }
  if (fs.existsSync(workflowRoot)) {
    throw new Error("Greenfield materialize without bootstrap approval must not scaffold workflow root.");
  }

  sealWorkflowGate(repoRoot, projectRoot, workflowRootBase, workItemSlug, "bootstrap", "po", [
    "--ref",
    path.relative(projectRoot, bootstrapRef)
  ]);

  runNodeScript(repoRoot, "scripts/materialize-work-item.js", [
    "--request",
    "Tạo landing page marketing cho sản phẩm A",
    "--work-item",
    workItemSlug,
    "--work-item-type",
    "FEATURE",
    "--delivery-context",
    "greenfield",
    "--project-root",
    projectRoot,
    "--workflow-root",
    workflowRootBase,
    "--auto-scaffold"
  ]);

  assertPathExists(workflowRoot, `Expected greenfield workflow root after bootstrap approval: ${workflowRoot}`);
  assertPathExists(s01Path, `Expected greenfield s01 note after bootstrap approval: ${s01Path}`);
  assertPathExists(approvedReportPath, `Expected greenfield report after bootstrap approval: ${approvedReportPath}`);

  const approvedReport = JSON.parse(fs.readFileSync(approvedReportPath, "utf8"));
  if (approvedReport.protocol_status !== "MATERIALIZED") {
    throw new Error(`Expected approved greenfield protocol_status=MATERIALIZED, got '${approvedReport.protocol_status}'.`);
  }
  if (approvedReport.bootstrap_gate_status !== "APPROVED") {
    throw new Error(`Expected approved greenfield bootstrap_gate_status=APPROVED, got '${approvedReport.bootstrap_gate_status}'.`);
  }
  if (approvedReport.delivery_context !== "greenfield") {
    throw new Error(`Expected greenfield delivery_context, got '${approvedReport.delivery_context}'.`);
  }

  const s01Content = fs.readFileSync(s01Path, "utf8");
  assertContentIncludes(s01Content, "delivery_context: greenfield", "Expected delivery_context in greenfield protocol block.");
  assertContentIncludes(s01Content, "bootstrap_gate_status: APPROVED", "Expected bootstrap gate approval in greenfield protocol block.");
}

function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const repoRoot = path.resolve(__dirname, "..");
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-authoring-smoke-"));
  const approvalRoot = `${tempRoot}-trusted-approvals`;
  const keepTemp = Boolean(args["keep-temp"]);
  const cases = [
    { name: "basic-full", run: runCaseBasicFull },
    { name: "quick-single-step", run: runCaseQuickSingleStep },
    { name: "mutating-action-requires-report", run: runCaseMutatingActionRequiresReport },
    { name: "capability-control", run: runCaseCapabilityControl },
    { name: "enterprise-multi-agent", run: runCaseEnterpriseMultiAgent },
    { name: "strict-sdd-change", run: runCaseStrictSddChange },
    { name: "materialize-auto-scaffold", run: runCaseMaterializeAutoScaffold },
    { name: "greenfield-bootstrap-preflight", run: runCaseGreenfieldBootstrapPreflight }
  ];
  const failures = [];

  try {
    process.env.WORKFLOW_BUNDLE_APPROVAL_ROOT = approvalRoot;
    process.env.WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE = "smoke-passphrase";
    seedProjectContext(tempRoot);

    cases.forEach((smokeCase) => {
      try {
        makeTreeOwnerWritable(tempRoot);
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
    delete process.env.WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE;
    delete process.env.WORKFLOW_BUNDLE_APPROVAL_ROOT;
    fs.rmSync(approvalRoot, { recursive: true, force: true });
    if (!keepTemp) {
      makeTreeOwnerWritable(tempRoot);
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
