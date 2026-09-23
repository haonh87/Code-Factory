const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const strictAssert = require("node:assert/strict");
const { execFileSync } = require("child_process");
const { materializeWorkItem } = require("../scripts/materialize-work-item");
const { SDD_LIGHT_PROFILE } = require("../scripts/workflow-sdd-definitions");
const { validateWorkItemProtocol } = require("../scripts/validate-work-item-protocol");
const { getStateCollectionErrors } = require("../scripts/work-item-protocol-utils");

let failures = 0;
const ADAPTIVE_ACTIVATION_ARGS = {
  "adaptive-source-version": "2.6.1",
  "adaptive-installed-version": ["2.6.4", "2.6.0"],
  "adaptive-parity-passed": "true"
};

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function rmrf(target) {
  try { fs.chmodSync(target, 0o755); } catch (_e) { /* ignore */ }
  try {
    for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
      const child = path.join(target, entry.name);
      if (entry.isDirectory()) rmrf(child);
      else { try { fs.chmodSync(child, 0o644); } catch (_e) { /* ignore */ } fs.rmSync(child, { force: true }); }
    }
  } catch (_e) { /* ignore */ }
  fs.rmSync(target, { recursive: true, force: true });
}

function buildProject() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "mat-light-"));
  fs.mkdirSync(path.join(projectRoot, "project-context", "checklists"), { recursive: true });
  fs.writeFileSync(path.join(projectRoot, "project-context", "project-context.md"), "# Project Context\n", "utf8");
  fs.writeFileSync(path.join(projectRoot, "project-context", "checklists", "default.md"), "# Default Checklist\n", "utf8");
  fs.mkdirSync(path.join(projectRoot, "work-items"), { recursive: true });
  return projectRoot;
}

function runMaterialize(projectRoot, extraArgs) {
  const workflowRootBase = path.join(projectRoot, "work-items");
  const reportPath = path.join(projectRoot, "report.json");
  const result = materializeWorkItem({
    args: {
      request: "add export button to dashboard",
      "project-root": projectRoot,
      "workflow-root": workflowRootBase,
      output: "report.json",
      ...extraArgs
    }
  });
  for (const key of ["blockers", "required_actions"]) {
    assert(getStateCollectionErrors(result.report[key], key).length === 0, `TS3: materialization emits valid ${key}`);
    assert(result.report[key].every(value => typeof value === "object" && value.kind !== "legacy"), `TS3: new ${key} are typed without relying on the load adapter`);
  }
  assert(result.report.work_items[0].blockers.every(value => typeof value === "object" && value.kind !== "legacy"), "TS3: materialization candidate blockers are typed");
  return result.report;
}

// ---------- CR-008 T2: adaptive admission must precede every delivery write ----------

function testNonDeliveryLaneShortCircuitsBeforeWrites() {
  const projectRoot = buildProject();
  try {
    const workflowRootBase = path.join(projectRoot, "work-items");
    const reportPath = path.join(projectRoot, "research-report.json");
    const result = materializeWorkItem({
      args: {
        request: "research current workflow friction",
        "request-lane": "research",
        "adaptive-writes": "true",
        "delivery-context": "brownfield",
        "project-root": projectRoot,
        "workflow-root": workflowRootBase,
        output: "research-report.json",
        "auto-scaffold": "true"
      }
    });

    assert(result.report.request_lane === "research", "non-delivery decision must preserve the research lane");
    assert(result.report.workflow_required === false, "research must not require the delivery workflow");
    assert(result.report.materialization_status === "NOT_APPLICABLE", "research must stop at NOT_APPLICABLE");
    assert(result.report.work_items.length === 0, "research must create no work-item candidate");
    assert(result.reportPath === "", "research must not return a delivery report path");
    assert(!fs.existsSync(reportPath), "research must not write the requested delivery report");
    assert(fs.readdirSync(workflowRootBase).length === 0, "research must create zero workflow artifacts");
    console.log("  PASS: non-delivery lane short-circuits before report, scaffold, and capability writes");
  } finally {
    rmrf(projectRoot);
  }
}

function testNonDeliveryTextDoesNotInventHardTrigger() {
  const projectRoot = buildProject();
  try {
    const workflowRootBase = path.join(projectRoot, "work-items");
    const plainDocumentation = materializeWorkItem({
      args: {
        request: "document the local adapter contract",
        "request-lane": "documentation",
        "adaptive-writes": "true",
        "delivery-context": "brownfield",
        "project-root": projectRoot,
        "workflow-root": workflowRootBase
      }
    }).report;
    const explicitPublicContract = materializeWorkItem({
      args: {
        request: "document the public API contract change",
        "request-lane": "documentation",
        "adaptive-writes": "true",
        "delivery-context": "brownfield",
        "public-contract": "true",
        ...ADAPTIVE_ACTIVATION_ARGS,
        "project-root": projectRoot,
        "workflow-root": workflowRootBase
      }
    }).report;

    assert(
      plainDocumentation.request_lane === "documentation" && plainDocumentation.workflow_required === false,
      "plain documentation text must not invent a public-contract hard trigger"
    );
    assert(
      explicitPublicContract.request_lane === "product_delivery" && explicitPublicContract.workflow_required === true,
      "structured public-contract signal must escalate to product_delivery"
    );
    assert(
      explicitPublicContract.escalation_reasons.includes("HARD_PUBLIC_CONTRACT"),
      "structured public-contract escalation must retain its reason"
    );
    console.log("  PASS: ambiguous text stays non-delivery while a structured hard trigger escalates");
  } finally {
    rmrf(projectRoot);
  }
}

function testAdaptiveBooleanFlagsRejectTypos() {
  const projectRoot = buildProject();
  try {
    let threw = false;
    let message = "";
    try {
      materializeWorkItem({
        args: {
          request: "document the public API behavior",
          "request-lane": "documentation",
          "adaptive-writes": "true",
          "delivery-context": "brownfield",
          "public-contract": "treu",
          "project-root": projectRoot,
          "workflow-root": path.join(projectRoot, "work-items")
        }
      });
    } catch (error) {
      threw = true;
      message = error.message;
    }

    assert(threw, "misspelled hard-trigger boolean must fail closed");
    assert(
      /triggers\.public_contract/.test(message) && /true, false/.test(message),
      `failure must name the structured flag and allowed values, got: ${message}`
    );
    console.log("  PASS: adaptive boolean typo fails closed instead of downgrading risk");
  } finally {
    rmrf(projectRoot);
  }
}

function testNonDeliveryMaterializationRequiresAuditedHumanOverride() {
  const projectRoot = buildProject();
  try {
    let threw = false;
    let message = "";
    try {
      materializeWorkItem({
        args: {
          request: "document the local adapter behavior",
          "request-lane": "documentation",
          "adaptive-writes": "true",
          "delivery-context": "brownfield",
          "explicit-materialization": "true",
          "project-root": projectRoot,
          "workflow-root": path.join(projectRoot, "work-items"),
          "auto-scaffold": "true"
        }
      });
    } catch (error) {
      threw = true;
      message = error.message;
    }

    assert(threw, "non-delivery materialization without audit fields must fail closed");
    assert(/override-actor/.test(message), `failure must name the missing human override audit field, got: ${message}`);
    assert(fs.readdirSync(path.join(projectRoot, "work-items")).length === 0, "failed override must leave zero workflow artifacts");
    console.log("  PASS: incomplete non-delivery human override fails closed before writes");
  } finally {
    rmrf(projectRoot);
  }
}

function testNonDeliveryOverrideRejectsImpossibleTimestamp() {
  const projectRoot = buildProject();
  try {
    let threw = false;
    let message = "";
    try {
      materializeWorkItem({
        args: {
          request: "document the local adapter behavior",
          "request-lane": "documentation",
          "adaptive-writes": "true",
          "delivery-context": "brownfield",
          "explicit-materialization": "true",
          "override-actor": "human:maintainer",
          "override-reason": "Keep a durable decision record",
          "override-at": "2026-02-30T04:03:55Z",
          "project-root": projectRoot,
          "workflow-root": path.join(projectRoot, "work-items")
        }
      });
    } catch (error) {
      threw = true;
      message = error.message;
    }

    assert(threw, "impossible override timestamp must fail closed");
    assert(/override-at/.test(message), `timestamp failure must name override-at, got: ${message}`);
    console.log("  PASS: impossible human-override timestamp fails closed");
  } finally {
    rmrf(projectRoot);
  }
}

function testAuditedHumanOverrideOpensNonDeliveryMaterialization() {
  const projectRoot = buildProject();
  try {
    const result = materializeWorkItem({
      args: {
        request: "document the local adapter behavior",
        "request-lane": "documentation",
        "adaptive-writes": "true",
        "delivery-context": "brownfield",
        "explicit-materialization": "true",
        "override-actor": "human:maintainer",
        "override-reason": "Keep a durable implementation decision record",
        "override-at": "2026-08-29T04:03:55Z",
        ...ADAPTIVE_ACTIVATION_ARGS,
        "project-root": projectRoot,
        "workflow-root": path.join(projectRoot, "work-items")
      }
    });

    assert(result.report.request_lane === "documentation", "override must preserve the classified lane");
    assert(result.report.workflow_required === true, "complete human override must enable materialization");
    assert(
      Array.isArray(result.report.routing_reasons) &&
        result.report.routing_reasons.includes("HUMAN_MATERIALIZATION_OVERRIDE"),
      "override decision must carry HUMAN_MATERIALIZATION_OVERRIDE"
    );
    assert(
      result.report.human_override && result.report.human_override.actor === "human:maintainer",
      "override actor must be recorded"
    );
    assert(
      result.report.human_override && result.report.human_override.reason.length > 0,
      "override reason must be recorded"
    );
    assert(
      result.report.human_override && result.report.human_override.at === "2026-08-29T04:03:55Z",
      "override timestamp must be recorded"
    );
    console.log("  PASS: complete human override opens materialization and remains auditable");
  } finally {
    rmrf(projectRoot);
  }
}

function testAdaptiveMaterializeSkewFailsBeforeEveryWrite() {
  const projectRoot = buildProject();
  const reportPath = path.join(projectRoot, "adaptive-skew-report.json");
  let message = "";
  try {
    try {
      materializeWorkItem({
        args: {
          request: "change a bounded maintenance rule",
          "request-lane": "maintenance",
          "adaptive-writes": "true",
          "delivery-context": "brownfield",
          "project-root": projectRoot,
          "workflow-root": path.join(projectRoot, "work-items"),
          output: "adaptive-skew-report.json",
          "auto-scaffold": "true",
          "adaptive-source-version": "2.6.1",
          "adaptive-installed-version": ["2.6.3", "2.5.9"],
          "adaptive-parity-passed": "true"
        }
      });
    } catch (error) {
      message = error.message;
    }
    assert(/ADAPTIVE_RUNTIME_MINOR_SKEW/.test(message), `skew must fail closed, got: ${message}`);
    assert(!fs.existsSync(reportPath), "skew must write no report");
    assert(fs.readdirSync(path.join(projectRoot, "work-items")).length === 0, "skew must write no workflow artifacts");
    console.log("  PASS: adaptive materializer version skew fails before all delivery writes");
  } finally {
    rmrf(projectRoot);
  }
}

function testAdaptiveMaintenanceAutoScaffoldKeepsAdapterParity() {
  const projectRoot = buildProject();
  const slug = "adaptive-maintenance-flow";
  try {
    const result = materializeWorkItem({
      args: {
        request: "change a bounded maintenance rule",
        "work-item": slug,
        "work-item-type": "CHANGE",
        "request-lane": "maintenance",
        "adaptive-writes": "true",
        ...ADAPTIVE_ACTIVATION_ARGS,
        "planning-track": "full",
        "delivery-context": "brownfield",
        "change-strategy": "none",
        "project-root": projectRoot,
        "workflow-root": path.join(projectRoot, "work-items"),
        "auto-scaffold": "true"
      }
    });
    assert(result.report.artifact_shape === "adaptive_v1", "adaptive report must declare adaptive_v1");
    assert(result.report.protocol_status === "MATERIALIZED", "adaptive auto-scaffold must reach MATERIALIZED");
    assert(result.report.roles.map((entry) => entry.role).join(",") === "developer,qc", "report roles must match kernel");
    assert(result.report.gates.map((entry) => entry.gate).join(",") === "task_plan,dod", "report gates must match kernel");
    assert(
      result.report.required_actions.some((action) => action.kind === "gate_approval" && action.gate === "task_plan"),
      "maintenance actions must request only the applicable readiness gate"
    );
    assert(
      !result.report.required_actions.some((action) => action.kind === "gate_approval" && ["spec", "dor", "approach"].includes(action.gate)),
      `not_applicable readiness gates must create zero action, got ${JSON.stringify(result.report.required_actions)}`
    );
    const s01 = fs.readFileSync(
      path.join(projectRoot, "work-items", slug, `${slug}.s01.restate.md`),
      "utf8"
    );
    assert(/artifact_shape: adaptive_v1/.test(s01), "s01 frontmatter/protocol must carry adaptive shape");
    assert(/request_lane: maintenance/.test(s01), "s01 frontmatter/protocol must carry maintenance lane");
    const validated = validateWorkItemProtocol({
      args: { "project-root": projectRoot, "workflow-root": path.join(projectRoot, "work-items") }
    });
    assert(validated.validatedCount === 1, "adaptive report/protocol adapter pair must validate together");
    console.log("  PASS: adaptive materialize/scaffold/protocol adapters preserve one kernel decision");
  } finally {
    rmrf(projectRoot);
  }
}

function testAdaptiveWriterFlagOffKeepsLegacyShape() {
  const projectRoot = buildProject();
  try {
    const result = materializeWorkItem({
      args: {
        request: "change a bounded maintenance rule",
        "request-lane": "maintenance",
        "adaptive-writes": "false",
        "delivery-context": "brownfield",
        "project-root": projectRoot,
        "workflow-root": path.join(projectRoot, "work-items")
      }
    });
    assert(!Object.prototype.hasOwnProperty.call(result.report, "artifact_shape"), "flag off must keep legacy report shape");
    assert(!Object.prototype.hasOwnProperty.call(result.report, "request_lane"), "flag off must not partially write adaptive routing fields");
    console.log("  PASS: one activation flag restores the legacy writer shape");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Output 1: preset passthrough + selected-profile result ----------

function testPostMaterializationWritersEmitTypedState() {
  for (const adaptive of [false, true]) {
    const projectRoot = buildProject();
    try {
      const report = runMaterialize(projectRoot, {
        "work-item": "ts3-materialized-writer",
        output: "work-items/ts3-materialized-writer/ts3-materialized-writer.work-item-report.json",
        "delivery-context": "brownfield",
        "auto-scaffold": true,
        ...(adaptive ? { "adaptive-writes": "true", "request-lane": "maintenance", ...ADAPTIVE_ACTIVATION_ARGS } : {})
      });
      assert(report.protocol_status === "MATERIALIZED", "TS3: fixture reaches post-materialization writer");
      assert(report.required_actions.some(value => value.kind === "work_item_activation"), "TS3: activation hint has exact machine kind");
      assert(report.required_actions.some(value => value.kind === "gate_approval" || value.kind === "readiness_bundle_approval"), "TS3: readiness approval hint has exact machine kind");
    } finally { rmrf(projectRoot); }
  }
}

function testLightEligibleSelectsLightProfile() {
  const projectRoot = buildProject();
  try {
    const report = runMaterialize(projectRoot, {
      "planning-track": "quick",
      "delivery-context": "brownfield",
      "sdd-preset": "auto"
    });
    const item = report.work_items[0];
    assert(report.selected_profile === SDD_LIGHT_PROFILE, `light-eligible must select sdd-light, got ${report.selected_profile}`);
    assert(item.sdd_mode === "light", `item.sdd_mode must be light, got ${item.sdd_mode}`);
    assert(Array.isArray(report.sdd_reasons) && report.sdd_reasons.length === 0, "light-eligible must have no escalation reasons");
    assert(report.sdd_preset === "auto", "sdd_preset must be recorded");
    // scaffold_actions phải truyền --sdd-mode light.
    const workflowAction = item.scaffold_actions.find((a) => a.includes("scaffold:workflow"));
    assert(workflowAction && workflowAction.includes("--sdd-mode light"), `scaffold action must pass --sdd-mode light, got ${workflowAction}`);
    console.log("  PASS: light-eligible selects sdd-light + passes --sdd-mode light");
  } finally {
    rmrf(projectRoot);
  }
}

function testPresetFullShortCircuitsToFull() {
  const projectRoot = buildProject();
  try {
    const report = runMaterialize(projectRoot, {
      "planning-track": "quick",
      "delivery-context": "brownfield",
      "sdd-preset": "full"
    });
    assert(report.selected_profile === "full", `preset full must select full, got ${report.selected_profile}`);
    assert(report.work_items[0].sdd_mode === "none", "preset full must keep sdd_mode none");
    assert(Array.isArray(report.sdd_reasons) && report.sdd_reasons.length === 0, "preset full is an explicit choice, no escalation reasons");
    console.log("  PASS: preset full short-circuits to full (no escalation)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Output 3: hard escalation reasons (không silently guess) ----------

function testGreenfieldEscalatesWithReason() {
  const projectRoot = buildProject();
  try {
    const report = runMaterialize(projectRoot, {
      "planning-track": "quick",
      "delivery-context": "greenfield",
      "sdd-preset": "auto"
    });
    assert(report.selected_profile !== SDD_LIGHT_PROFILE, "greenfield must not silently select light");
    assert(report.work_items[0].sdd_mode === "none", "greenfield must keep sdd_mode none");
    assert(report.sdd_reasons.includes("greenfield-or-foundation"), `greenfield must record greenfield-or-foundation reason, got ${JSON.stringify(report.sdd_reasons)}`);
    console.log("  PASS: greenfield escalates with recorded reason (not silently light)");
  } finally {
    rmrf(projectRoot);
  }
}

function testPresetLightOnGreenfieldStillEscalates() {
  // BR-02: hard escalation không bị override bằng explicit preset.
  const projectRoot = buildProject();
  try {
    const report = runMaterialize(projectRoot, {
      "planning-track": "quick",
      "delivery-context": "greenfield",
      "sdd-preset": "light"
    });
    assert(report.selected_profile !== SDD_LIGHT_PROFILE, "preset light must NOT override greenfield hard escalation");
    assert(report.sdd_reasons.includes("greenfield-or-foundation"), "hard escalation reason still recorded despite preset light");
    console.log("  PASS: preset light cannot override greenfield hard escalation (BR-02)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Output 2: spec_impact/defect_source explicit override ----------

function testBugWithoutDefectSourceEscalates() {
  const projectRoot = buildProject();
  try {
    const report = materializeWorkItem({
      args: {
        request: "fix export timeout",
        "project-root": projectRoot,
        "workflow-root": path.join(projectRoot, "work-items"),
        output: "report.json",
        "planning-track": "quick",
        "delivery-context": "brownfield",
        "sdd-preset": "auto"
      }
    }).report;
    assert(report.work_items[0].work_item_type === "BUG", "expected BUG type");
    assert(report.selected_profile !== SDD_LIGHT_PROFILE, "unclassified BUG must not silently select light");
    assert(report.sdd_reasons.includes("defect-or-spec-impact-unclassified"), `unclassified BUG must record defect-or-spec-impact-unclassified, got ${JSON.stringify(report.sdd_reasons)}`);
    console.log("  PASS: BUG without defect_source escalates (not silently light)");
  } finally {
    rmrf(projectRoot);
  }
}

function testBugWithDefectSourceOverrideBecomesLight() {
  const projectRoot = buildProject();
  try {
    const report = materializeWorkItem({
      args: {
        request: "fix export timeout",
        "project-root": projectRoot,
        "workflow-root": path.join(projectRoot, "work-items"),
        output: "report.json",
        "planning-track": "quick",
        "delivery-context": "brownfield",
        "defect-source": "code",
        "spec-impact-classified": "true",
        "sdd-preset": "auto"
      }
    }).report;
    assert(report.work_items[0].work_item_type === "BUG", "expected BUG type");
    assert(report.selected_profile === SDD_LIGHT_PROFILE, `classified BUG with quick/default must be light, got ${report.selected_profile}`);
    assert(report.work_items[0].sdd_mode === "light", "classified BUG must set sdd_mode light");
    assert(!report.sdd_reasons.includes("defect-or-spec-impact-unclassified"), "classified defect must NOT trigger unclassified reason");
    console.log("  PASS: BUG with defect_source override + spec_impact classified becomes light");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- End-to-end: materializer -> scaffold truyền Light contract (F-03) ----------

// ---------- Review fix M5: token inflections escalate (migrations/apis/policies) ----------

function testTokenInflectionsEscalateLight() {
  const cases = [
    { request: "run database migrations for orders", reason: "migration-or-cutover" },
    { request: "migrating user data to new table", reason: "migration-or-cutover" },
    { request: "update the apis for partner integration", reason: "public-contract" },
    { request: "apply new retention policies", reason: "public-contract" },
    { request: "renegotiate vendor contracts flow", reason: "public-contract" }
  ];
  cases.forEach(({ request, reason }) => {
    const projectRoot = buildProject();
    try {
      const result = materializeWorkItem({
        args: {
          request,
          "project-root": projectRoot,
          "workflow-root": path.join(projectRoot, "work-items"),
          output: "report.json",
          "planning-track": "quick",
          "delivery-context": "brownfield",
          "sdd-preset": "auto"
        }
      });
      const report = result.report;
      assert(
        report.selected_profile !== SDD_LIGHT_PROFILE,
        `"${request}" must escalate away from light, got ${report.selected_profile}`
      );
      assert(
        (report.sdd_reasons || []).includes(reason),
        `"${request}" must carry reason ${reason}, got ${JSON.stringify(report.sdd_reasons)}`
      );
    } finally {
      rmrf(projectRoot);
    }
  });
  console.log("  PASS: token inflections escalate light -> full with correct reasons");
}

function testAutoScaffoldLightCreatesLightNotes() {
  const projectRoot = buildProject();
  try {
    const workflowRootBase = path.join(projectRoot, "work-items");
    materializeWorkItem({
      args: {
        request: "add export button",
        "project-root": projectRoot,
        "workflow-root": workflowRootBase,
        "planning-track": "quick",
        "delivery-context": "brownfield",
        "sdd-preset": "auto",
        "auto-scaffold": "true"
      }
    });
    const slug = "add-export-button";
    const workflowRoot = path.join(workflowRootBase, slug);
    assert(fs.existsSync(workflowRoot), "auto-scaffold must create work item dir");
    const mdFiles = fs.readdirSync(workflowRoot).filter((f) => f.endsWith(".md")).sort();
    // Light compact scaffold: 3 note authoring (s01/s04/s06), không s02/s05/s07/s08.
    assert(mdFiles.includes(`${slug}.s01.restate.md`), "light scaffold must create s01");
    assert(mdFiles.includes(`${slug}.s04.acceptance-criteria.md`), "light scaffold must create s04");
    assert(mdFiles.includes(`${slug}.s06.task-breakdown.md`), "light scaffold must create s06");
    assert(!mdFiles.some((f) => f.includes(".s02.")), "light scaffold must not create s02");
    assert(!mdFiles.some((f) => f.includes(".s05.")), "light scaffold must not create s05");
    const s01 = fs.readFileSync(path.join(workflowRoot, `${slug}.s01.restate.md`), "utf8");
    assert(/^sdd_mode: light$/m.test(s01), "scaffolded s01 must carry sdd_mode: light");
    console.log("  PASS: auto-scaffold routes Light contract (3 compact notes, sdd_mode=light)");
  } finally {
    rmrf(projectRoot);
  }
}

// ---------- Review fix m8: --spec-impact-classified chỉ nhận true|false ----------

function testSpecImpactClassifiedStrictParse() {
  const projectRoot = buildProject();
  try {
    let threw = false;
    let message = "";
    try {
      materializeWorkItem({
        args: {
          request: "fix login bug",
          "project-root": projectRoot,
          "workflow-root": path.join(projectRoot, "work-items"),
          output: "report.json",
          "spec-impact-classified": "yes"
        }
      });
    } catch (error) {
      threw = true;
      message = error.message;
    }
    assert(threw, "--spec-impact-classified yes must throw (strict true|false parse)");
    assert(
      /spec-impact-classified/.test(message) && /true|false/.test(message),
      `error must name the flag and allowed values, got: ${message}`
    );
    console.log("  PASS: --spec-impact-classified strict parse rejects non-boolean");
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running materialize-work-item (Light routing) tests...\n");
testNonDeliveryLaneShortCircuitsBeforeWrites();
testNonDeliveryTextDoesNotInventHardTrigger();
testAdaptiveBooleanFlagsRejectTypos();
testNonDeliveryMaterializationRequiresAuditedHumanOverride();
testNonDeliveryOverrideRejectsImpossibleTimestamp();
testAuditedHumanOverrideOpensNonDeliveryMaterialization();
testAdaptiveMaterializeSkewFailsBeforeEveryWrite();
testAdaptiveMaintenanceAutoScaffoldKeepsAdapterParity();
testAdaptiveWriterFlagOffKeepsLegacyShape();
testPostMaterializationWritersEmitTypedState();
testLightEligibleSelectsLightProfile();
testPresetFullShortCircuitsToFull();
testGreenfieldEscalatesWithReason();
testPresetLightOnGreenfieldStillEscalates();
testBugWithoutDefectSourceEscalates();
testBugWithDefectSourceOverrideBecomesLight();
testTokenInflectionsEscalateLight();
testSpecImpactClassifiedStrictParse();
testAutoScaffoldLightCreatesLightNotes();

// ---------- R2: sdd_light_profile rollout flag (plan v5 §8) ----------

function testSddLightProfileOffRollsBackAutoToFull() {
  // sdd_light_profile=off + preset auto + eligible -> full (rollback default),
  // không silently chọn light. Reason light-profile-disabled được ghi lại để
  // observable (rollback là quyết định có tiếng ồn, không im lặng).
  const projectRoot = buildProject();
  try {
    const report = runMaterialize(projectRoot, {
      "planning-track": "quick",
      "delivery-context": "brownfield",
      "sdd-preset": "auto",
      "sdd-light-profile": "off"
    });
    assert(report.selected_profile !== SDD_LIGHT_PROFILE, "off+auto must NOT select light even when eligible");
    assert(report.work_items[0].sdd_mode === "none", "off+auto must keep sdd_mode none");
    assert(
      (report.sdd_reasons || []).includes("light-profile-disabled"),
      `off+auto must record light-profile-disabled reason, got ${JSON.stringify(report.sdd_reasons)}`
    );
    assert(report.sdd_light_profile === "off", "report must record sdd_light_profile=off");
    console.log("  PASS: sdd_light_profile=off rolls auto back to full + records reason");
  } finally {
    rmrf(projectRoot);
  }
}

function testSddLightProfilePreviewPreservesCurrentBehavior() {
  // preview (default) + auto + eligible -> light (current behavior không đổi).
  const projectRoot = buildProject();
  try {
    const report = runMaterialize(projectRoot, {
      "planning-track": "quick",
      "delivery-context": "brownfield",
      "sdd-preset": "auto",
      "sdd-light-profile": "preview"
    });
    assert(report.selected_profile === SDD_LIGHT_PROFILE, "preview+auto+eligible must select light");
    assert(!((report.sdd_reasons || []).includes("light-profile-disabled")), "preview must NOT add light-profile-disabled reason");
    assert(report.sdd_light_profile === "preview", "report must record sdd_light_profile=preview");
    console.log("  PASS: sdd_light_profile=preview preserves current auto->light behavior");
  } finally {
    rmrf(projectRoot);
  }
}

function testSddLightProfileOffDoesNotBlockExplicitLightPreset() {
  // off chỉ đổi router DEFAULT (auto). Explicit --sdd-preset light là human
  // override vẫn đi qua eligibility (hard guards vẫn áp dụng). BR-02 giữ nguyên.
  const projectRoot = buildProject();
  try {
    const report = runMaterialize(projectRoot, {
      "planning-track": "quick",
      "delivery-context": "brownfield",
      "sdd-preset": "light",
      "sdd-light-profile": "off"
    });
    assert(report.selected_profile === SDD_LIGHT_PROFILE, "explicit preset light must still win over off (off only changes auto default)");
    assert(!((report.sdd_reasons || []).includes("light-profile-disabled")), "explicit light must not add light-profile-disabled");
    console.log("  PASS: sdd_light_profile=off does not block explicit --sdd-preset light");
  } finally {
    rmrf(projectRoot);
  }
}

function testSddLightProfileInvalidThrows() {
  const projectRoot = buildProject();
  try {
    let threw = false;
    let message = "";
    try {
      runMaterialize(projectRoot, {
        "planning-track": "quick",
        "delivery-context": "brownfield",
        "sdd-preset": "auto",
        "sdd-light-profile": "bogus"
      });
    } catch (error) {
      threw = true;
      message = error.message;
    }
    assert(threw, "invalid sdd_light_profile must throw");
    assert(/sdd_light_profile/.test(message) && /off|preview|default/.test(message), `error must name flag + allowed values, got: ${message}`);
    console.log("  PASS: invalid sdd_light_profile rejected with allowed-values hint");
  } finally {
    rmrf(projectRoot);
  }
}

testSddLightProfileOffRollsBackAutoToFull();
testSddLightProfilePreviewPreservesCurrentBehavior();
testSddLightProfileOffDoesNotBlockExplicitLightPreset();
testSddLightProfileInvalidThrows();

// ---------- R3: materialize emits opt-in out-of-band telemetry ----------

function testMaterializeEmitsTelemetryWhenOptIn() {
  const projectRoot = buildProject();
  const telemetryDir = fs.mkdtempSync(path.join(os.tmpdir(), "mat-telemetry-"));
  const privateSlug = "telemetry-private-work-item";
  const privateRequest = "change a bounded maintenance rule with private context";
  try {
    const result = materializeWorkItem({
      args: {
        request: privateRequest,
        "work-item": privateSlug,
        "work-item-type": "CHANGE",
        "request-lane": "maintenance",
        "adaptive-writes": "true",
        ...ADAPTIVE_ACTIVATION_ARGS,
        "project-root": projectRoot,
        "workflow-root": path.join(projectRoot, "work-items"),
        "planning-track": "quick",
        "delivery-context": "brownfield",
        "sdd-preset": "auto",
        "auto-scaffold": "true",
        telemetry: "true",
        "telemetry-out": telemetryDir
      }
    });
    assert(result.telemetryPath, "materialize must return telemetryPath when telemetry opted in");
    assert(fs.existsSync(result.telemetryPath), `telemetry report file exists, got ${result.telemetryPath}`);
    assert(!result.telemetryPath.includes(path.join("work-items")), "telemetry out-of-band (not under work-items/)");
    const tel = JSON.parse(fs.readFileSync(result.telemetryPath, "utf8"));
    const serialized = JSON.stringify(tel);
    assert(tel.schema_version === 2, `telemetry uses privacy schema v2, got ${tel.schema_version}`);
    assert(tel.event_type === "materialize", `telemetry identifies lifecycle event, got ${tel.event_type}`);
    assert(tel.runtime_version === "2.6.3", `telemetry carries bounded runtime version, got ${tel.runtime_version}`);
    assert(tel.request_lane === "maintenance", `telemetry carries lane, got ${tel.request_lane}`);
    assert(tel.selected_profile === SDD_LIGHT_PROFILE, `telemetry carries selected_profile, got ${tel.selected_profile}`);
    assert(tel.sdd_light_profile === "preview", "telemetry carries sdd_light_profile default preview");
    assert(tel.role_count === 2 && tel.gate_count === 2, `telemetry carries only role/gate counts, got ${tel.role_count}/${tel.gate_count}`);
    assert(typeof tel.artifact_count === "number" && tel.artifact_count > 0, `telemetry carries artifact_count>0 when auto-scaffold ran, got ${tel.artifact_count}`);
    assert(/^wi_[a-f0-9]{24}$/.test(tel.work_item_id), "telemetry carries only pseudonymous work-item id");
    assert(!serialized.includes(privateSlug) && !serialized.includes(privateRequest), "materialize adapter persists no slug or raw request");
    console.log("  PASS: materialize emits privacy-bounded opt-in lifecycle telemetry");
  } finally {
    rmrf(projectRoot);
  }
}

function testMaterializeNoTelemetryByDefault() {
  // Telemetry phải opt-in: mặc định không ghi telemetry (không ô nhiễm mỗi run).
  const projectRoot = buildProject();
  try {
    const result = materializeWorkItem({
      args: {
        request: "add export button",
        "project-root": projectRoot,
        "workflow-root": path.join(projectRoot, "work-items"),
        "planning-track": "quick",
        "delivery-context": "brownfield",
        "sdd-preset": "auto",
        "auto-scaffold": "true"
      }
    });
    assert(!result.telemetryPath, "default run must NOT produce telemetry (opt-in only)");
    assert(!fs.existsSync(path.join(projectRoot, ".workflow-telemetry")), "no telemetry dir created by default");
    console.log("  PASS: telemetry is opt-in (no telemetry written by default)");
  } finally {
    rmrf(projectRoot);
  }
}

function testTarMaterializerCannotReplaceGovernedReport() {
  const projectRoot = buildProject();
  const slug = "tar-existing-item";
  const reportPath = path.join(projectRoot, "report.json");
  const original = `${JSON.stringify({ work_item_slug: slug, protocol_status: "ACTIVE",
    blockers: [{ kind: "legacy", text: "Peer review outstanding" }], required_actions: [],
    resolved_state_history: [{ operation_id: "historical", original_text: "keep" }] }, null, 2)}\n`;
  try {
    fs.writeFileSync(reportPath, original, "utf8");
    let refused = false;
    try {
      materializeWorkItem({ args: { request: "replace an already governed candidate", "work-item": slug,
        "project-root": projectRoot, "workflow-root": path.join(projectRoot, "work-items"),
        output: "report.json", "delivery-context": "brownfield" } });
    } catch (error) { refused = /existing|governed|replace|overwrite/i.test(String(error.message)); }
    assert(refused, "TAR materializer refuses to replace an existing governed report");
    assert(fs.readFileSync(reportPath, "utf8") === original,
      "TAR materializer preserves exact live and history bytes on refusal");
  } finally { rmrf(projectRoot); }
}

function testTarMaterializerHonorsReportLock() {
  const projectRoot = buildProject();
  const slug = "tar-materializer-lock";
  const lockPath = path.join(projectRoot, "work-items", `.${slug}.work-item-report.lock`);
  const reportPath = path.join(projectRoot, "report.json");
  try {
    fs.writeFileSync(lockPath, JSON.stringify({ pid: process.pid, nonce: "another-writer" }) + "\n", "utf8");
    let refused = false;
    try {
      materializeWorkItem({ args: { request: "create a candidate", "work-item": slug,
        "project-root": projectRoot, "workflow-root": path.join(projectRoot, "work-items"),
        output: "report.json", "delivery-context": "brownfield" } });
    } catch (error) { refused = /report.*lock|lock.*report/i.test(String(error.message)); }
    assert(refused, "TAR materializer shares the per-item lock with CLI and gate bundle");
    assert(!fs.existsSync(reportPath), "TAR locked materializer cannot write its candidate report");
    assert(fs.existsSync(lockPath), "TAR locked materializer cannot remove another writer's lock");
  } finally { rmrf(projectRoot); }
}

// Recovery fixtures always use a separate temporary trust root. Never sign with
// the developer's installed approval identity.
function buildRecoveryFixture(review = false, extraArgs = {}) {
  const projectRoot = buildProject();
  const approvalRoot = fs.mkdtempSync(path.join(os.tmpdir(), "resume-approvals-"));
  const slug = "dashboard-export-recovery";
  const workflowRoot = path.join(projectRoot, "work-items", slug);
  if (review) fs.mkdirSync(path.join(projectRoot, "work-items", "dashboard-existing"));
  const result = materializeWorkItem({ args: {
    request: "add export button to dashboard", "work-item": slug,
    "project-root": projectRoot, "workflow-root": path.dirname(workflowRoot),
    output: path.join(workflowRoot, `${slug}.work-item-report.json`),
    "delivery-context": "brownfield", "planning-track": "quick", ...extraArgs
  } });
  strictAssert.equal(result.report.dedup_result, review ? "needs_review" : "no_conflict");
  return { projectRoot, approvalRoot, slug, workflowRoot, reportPath: result.reportPath,
    dispose() { rmrf(projectRoot); rmrf(approvalRoot); } };
}

function resolveFixtureAdmission(ctx) {
  const { ensureApproverKeyPair } = require("../scripts/workflow-trusted-approval-utils");
  const { getDispositionTargets } = require("../scripts/work-item-protocol-utils");
  const passphrase = "isolated-resume-fixture-only";
  ensureApproverKeyPair({ approvalRoot: ctx.approvalRoot, passphrase });
  const script = path.resolve(__dirname, "../scripts/work-item-protocol.js");
  while (true) {
    const bytes = fs.readFileSync(ctx.reportPath);
    const raw = JSON.parse(bytes);
    const targets = getDispositionTargets(raw, bytes);
    if (!targets.length) return raw;
    execFileSync(process.execPath, [script, "dispose-state", "--project-root", ctx.projectRoot,
      "--work-item", ctx.slug, "--state-id", targets[0].state_id,
      "--operation-id", crypto.randomUUID(), "--reviewed-by", "maintainer",
      "--reason", "Fixture admission reviewed; independent bounded authoring allowed"], {
      env: { ...process.env, WORKFLOW_BUNDLE_APPROVAL_ROOT: ctx.approvalRoot,
        WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
        WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: passphrase }, stdio: "pipe"
    });
  }
}

function recoveryArgs(ctx, extra = {}) {
  return { "resume-proposal": true, "project-root": ctx.projectRoot,
    "work-item": ctx.slug, "approval-root": ctx.approvalRoot,
    "expected-report-sha256": crypto.createHash("sha256").update(fs.readFileSync(ctx.reportPath)).digest("hex"),
    "operation-id": crypto.randomUUID(), ...extra };
}

function testResumeReadyAndSignedReview() {
  for (const reviewed of [false, true]) {
    const ctx = buildRecoveryFixture(reviewed);
    try {
      const before = reviewed ? resolveFixtureAdmission(ctx) : JSON.parse(fs.readFileSync(ctx.reportPath));
      const args = recoveryArgs(ctx);
      let result;
      try { result = materializeWorkItem({ args }); }
      catch (error) { assert(false, `resume ${reviewed ? "signed review" : "READY"}: ${error.message}`); continue; }
      assert(result.report.protocol_status === "MATERIALIZED", "resume reaches authoring MATERIALIZED");
      assert(result.report.approval_status === "PENDING_REVIEW" && result.report.granted_write_paths.length === 0,
        "resume never approves or grants implementation");
      assert(JSON.stringify(result.report.work_items) === JSON.stringify(before.work_items), "candidate snapshot retained");
      assert(JSON.stringify(result.report.resolved_state_history) === JSON.stringify(before.resolved_state_history),
        "signed history retained verbatim");
      const bytes = fs.readFileSync(ctx.reportPath);
      const retry = materializeWorkItem({ args });
      assert(retry.outcome === "NOOP" && fs.readFileSync(ctx.reportPath).equals(bytes), "same-operation retry is byte-stable");
    } finally { ctx.dispose(); }
  }
}

function testDefaultMaterializerPreservesUnapprovedReports() {
  for (const reviewed of [false, true]) {
    const ctx = buildRecoveryFixture(reviewed);
    try {
      const bytes = fs.readFileSync(ctx.reportPath);
      let refused = false;
      try { materializeWorkItem({ args: { request: "different fresh request", "project-root": ctx.projectRoot,
        "work-item": ctx.slug, output: ctx.reportPath, "delivery-context": "brownfield" } }); }
      catch (error) { refused = /existing|resume|replace|overwrite/i.test(error.message); }
      assert(refused && fs.readFileSync(ctx.reportPath).equals(bytes), "default materialize preserves PROPOSED/READY report");
    } finally { ctx.dispose(); }
  }
}

function treeSnapshot(root) {
  const result = {};
  function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const target = path.join(dir, entry.name), key = path.relative(root, target);
      if (entry.isSymbolicLink()) result[key] = "link:" + fs.readlinkSync(target);
      else if (entry.isDirectory()) { result[key] = "directory"; visit(target); }
      else result[key] = crypto.createHash("sha256").update(fs.readFileSync(target)).digest("hex");
    }
  }
  visit(root);
  return JSON.stringify(result);
}

function assertRecoveryRefusal(ctx, args, message) {
  const before = treeSnapshot(ctx.projectRoot), trust = treeSnapshot(ctx.approvalRoot);
  let error;
  try { materializeWorkItem({ args }); } catch (caught) { error = caught; }
  assert(Boolean(error), `refuse ${message}`);
  assert(before === treeSnapshot(ctx.projectRoot) && trust === treeSnapshot(ctx.approvalRoot), `zero writes: ${message}`);
}

function testResumeRejectsUntrustedAndConflictingState() {
  const ctx = buildRecoveryFixture(true);
  try {
    const base = resolveFixtureAdmission(ctx);
    base.unknown_future_metadata = { keep: ["exact", "value"] };
    const mutations = [
      ["missing history", d => { delete d.resolved_state_history; }],
      ["missing concern", d => d.resolved_state_history.pop()],
      ["bad signature", d => { d.resolved_state_history[0].authorization.signature = "forged"; }],
      ...["operation_id", "source_entry_id", "source_collection", "actor", "reason", "resolved_at", "original_text"]
        .map(key => [`conflicting ${key}`, d => { d.resolved_state_history[0][key] = "tampered"; }]),
      ["wrong signed item", d => { d.resolved_state_history[0].authorization.intent.work_item_slug = "other-item"; }],
      ["modified original object", d => { d.resolved_state_history[0].original_entry.text += " changed"; }],
      ["duplicate history operation", d => d.resolved_state_history.push(d.resolved_state_history[0])],
      ["unresolved blocker", d => d.blockers.push({ kind: "legacy", text: "still pending" })],
      ["unknown pending action", d => d.required_actions.push({ kind: "legacy", text: "still pending" })],
      ["greenfield", d => { d.delivery_context = "greenfield"; }],
      ["split", d => { d.split_decision = "split"; }],
      ["change", d => { d.change_id = "CR-123"; }],
      ["grant", d => { d.granted_write_paths = ["src"]; }],
      ["already approved", d => { d.approval_status = "APPROVED"; }],
      ["later state", d => { d.protocol_status = "ACTIVE"; }],
      ["duplicate metadata", d => { d.work_items[0].delivery_context = "greenfield"; }],
      ["changed candidate blocker", d => { d.work_items[0].blockers[0].text += " changed"; }],
      ["reconstructed reuse", d => { d.dedup_result = "reuse_work_item"; }]
    ];
    for (const [name, mutate] of mutations) {
      const raw = JSON.parse(JSON.stringify(base)); mutate(raw);
      fs.writeFileSync(ctx.reportPath, JSON.stringify(raw, null, 2) + "\n");
      assertRecoveryRefusal(ctx, recoveryArgs(ctx), name);
    }
    fs.writeFileSync(ctx.reportPath, JSON.stringify(base, null, 2) + "\n");
    for (const delta of [{ request: "override" }, { "planning-track": "quick" }, { "operation-id": "bad" },
      { "expected-report-sha256": "b".repeat(64) }, { force: true }]) {
      assertRecoveryRefusal(ctx, recoveryArgs(ctx, delta), `argument ${Object.keys(delta)[0]}`);
    }
    const result = materializeWorkItem({ args: recoveryArgs(ctx) });
    assert(JSON.stringify(result.report.unknown_future_metadata) === JSON.stringify(base.unknown_future_metadata), "unknown raw fields survive recovery");
    const script = path.resolve(__dirname, "../scripts/work-item-protocol.js");
    let denied = false;
    try { execFileSync(process.execPath, [script, "activate", "--project-root", ctx.projectRoot, "--work-item", ctx.slug,
      "--step", "s07", "--write-root", "src"], { env: { ...process.env, WORKFLOW_BUNDLE_APPROVAL_ROOT: ctx.approvalRoot }, stdio: "pipe" }); }
    catch (error) { denied = /approval|receipt|gate/i.test(String(error.stderr)); }
    assert(denied, "resumed item cannot activate without ordinary authoring approval");
  } finally { ctx.dispose(); }
}

function testResumeFailuresAndOwnedNotes() {
  for (const failurePoint of ["after_first_note", "before_report_rename", "before_projection_refresh"]) {
    const ctx = buildRecoveryFixture();
    try {
      const before = fs.readFileSync(ctx.reportPath), args = recoveryArgs(ctx);
      process.env.WORKFLOW_BUNDLE_RECOVERY_FAILURE_POINT = failurePoint;
      let error;
      try { materializeWorkItem({ args }); } catch (caught) { error = caught; }
      finally { delete process.env.WORKFLOW_BUNDLE_RECOVERY_FAILURE_POINT; }
      assert(Boolean(error), `failure injected at ${failurePoint}`);
      if (failurePoint !== "before_projection_refresh") assert(fs.readFileSync(ctx.reportPath).equals(before), "precommit failure preserves original report");
      else assert(/committed/.test(error?.message || "") && error.message.includes(args["operation-id"]), "postcommit failure identifies retry operation");
      const existing = fs.readdirSync(ctx.workflowRoot).filter(name => name.endsWith(".md"));
      const protectedNote = path.join(ctx.workflowRoot, existing[0]);
      fs.appendFileSync(protectedNote, "\nUser-authored recovery note.\n");
      const bytes = fs.readFileSync(protectedNote, "utf8");
      const result = materializeWorkItem({ args });
      assert(result.outcome === (failurePoint === "before_projection_refresh" ? "NOOP" : "APPLIED"), "retry has correct outcome");
      assert(fs.readFileSync(protectedNote, "utf8").includes("User-authored recovery note."), "owned prose retained on retry");
      if (!protectedNote.includes(".s01.")) assert(fs.readFileSync(protectedNote, "utf8") === bytes, "non-s01 existing note byte-identical");
    } finally { delete process.env.WORKFLOW_BUNDLE_RECOVERY_FAILURE_POINT; ctx.dispose(); }
  }
  const ctx = buildRecoveryFixture();
  try {
    const args = recoveryArgs(ctx), lock = path.join(path.dirname(ctx.workflowRoot), `.${ctx.slug}.work-item-report.lock`);
    fs.writeFileSync(lock, "other owner\n");
    assertRecoveryRefusal(ctx, args, "existing report lock"); fs.unlinkSync(lock);
    const foreign = path.join(ctx.approvalRoot, "foreign.md"); fs.writeFileSync(foreign, "never overwrite\n");
    const note = path.join(ctx.workflowRoot, `${ctx.slug}.s01.restate.md`);
    fs.symlinkSync(foreign, note); assertRecoveryRefusal(ctx, args, "symlink escape"); fs.unlinkSync(note);
    // Generate one legitimate partial note, then deliberately corrupt its owner.
    process.env.WORKFLOW_BUNDLE_RECOVERY_FAILURE_POINT = "after_first_note";
    try { materializeWorkItem({ args }); } catch (_) { /* expected injected failure */ }
    finally { delete process.env.WORKFLOW_BUNDLE_RECOVERY_FAILURE_POINT; }
    const original = fs.readFileSync(note, "utf8");
    fs.writeFileSync(note, original.replace(`work_item_slug: "${ctx.slug}"`, 'work_item_slug: "foreign-owner"'));
    assertRecoveryRefusal(ctx, args, "wrong-slug existing note");
    fs.writeFileSync(note, original.replace("status: draft", "status: approved"));
    assertRecoveryRefusal(ctx, args, "finalized existing note");
    fs.writeFileSync(note, original);
    materializeWorkItem({ args });
    assertRecoveryRefusal(ctx, { ...args, "operation-id": crypto.randomUUID() }, "different retry operation");
    const raw = JSON.parse(fs.readFileSync(ctx.reportPath)); raw.protocol_status = "ACTIVE";
    fs.writeFileSync(ctx.reportPath, JSON.stringify(raw)); assertRecoveryRefusal(ctx, args, "retry after lifecycle advance");
  } finally { delete process.env.WORKFLOW_BUNDLE_RECOVERY_FAILURE_POINT; ctx.dispose(); }
}

function testResumeAdaptiveAdmission() {
  const ctx = buildRecoveryFixture(false, { "planning-track": "full", "adaptive-writes": "true",
    "request-lane": "product_delivery", "public-contract": true, ...ADAPTIVE_ACTIVATION_ARGS });
  try {
    const result = materializeWorkItem({ args: recoveryArgs(ctx) });
    assert(result.report.artifact_shape === "adaptive_v1" && result.report.required_actions.some(entry => entry.gate === "contract"),
      "adaptive resume preserves applicable contract gate");
    assert(fs.readdirSync(ctx.workflowRoot).filter(name => name.endsWith(".md")).length === 8, "full resume creates eight notes");
  } finally { ctx.dispose(); }
}

function testResumeRetryRevalidatesHistory() {
  const ctx = buildRecoveryFixture(true);
  try {
    resolveFixtureAdmission(ctx);
    const args = recoveryArgs(ctx);
    materializeWorkItem({ args });
    const baseline = JSON.parse(fs.readFileSync(ctx.reportPath));
    for (const [label, mutate] of [
      ["retry forged signature", d => { d.resolved_state_history[0].authorization.signature = "forged"; }],
      ["retry recovery references", d => { d.materialization_recovery.disposition_operation_ids = []; }],
      ["retry wrong result", d => { d.materialization_status = "PROPOSED"; }],
      ["retry unresolved blocker", d => { d.blockers = [{ kind: "legacy", text: "unresolved" }]; }]
    ]) {
      const changed = JSON.parse(JSON.stringify(baseline)); mutate(changed);
      fs.writeFileSync(ctx.reportPath, JSON.stringify(changed));
      assertRecoveryRefusal(ctx, args, label);
    }
  } finally { ctx.dispose(); }
}

function testResumeNoteGovernanceConflict() {
  const ctx = buildRecoveryFixture(false, { "planning-track": "full", "adaptive-writes": "true",
    "request-lane": "product_delivery", "public-contract": true, ...ADAPTIVE_ACTIVATION_ARGS });
  try {
    const args = recoveryArgs(ctx);
    process.env.WORKFLOW_BUNDLE_RECOVERY_FAILURE_POINT = "after_first_note";
    try { materializeWorkItem({ args }); } catch (_) { /* expected partial scaffold */ }
    finally { delete process.env.WORKFLOW_BUNDLE_RECOVERY_FAILURE_POINT; }
    const note = path.join(ctx.workflowRoot, `${ctx.slug}.s01.restate.md`);
    const raw = fs.readFileSync(note, "utf8");
    // Both values remain individually schema-valid but differ from the report.
    fs.writeFileSync(note, raw.replace('  contract: "required"', '  contract: "not_applicable"'));
    assertRecoveryRefusal(ctx, args, "existing note gate differs from report");
  } finally { delete process.env.WORKFLOW_BUNDLE_RECOVERY_FAILURE_POINT; ctx.dispose(); }
}

function testResumeMissingReportAndSnapshotRace() {
  const ctx = buildRecoveryFixture();
  try {
    const args = recoveryArgs(ctx);
    assertRecoveryRefusal(ctx, { ...args, "workflow-root": path.join(ctx.projectRoot, "absent-workflows") }, "absent workflow root");
    const raw = JSON.parse(fs.readFileSync(ctx.reportPath)); raw.concurrent_editor = "must survive";
    const concurrentBytes = JSON.stringify(raw, null, 2) + "\n";
    const originalOpen = fs.openSync;
    let injected = false, rejected = false;
    fs.openSync = function (target, ...rest) {
      if (!injected && String(target).startsWith(ctx.reportPath + ".disposition-")) {
        injected = true; fs.writeFileSync(ctx.reportPath, concurrentBytes);
      }
      return originalOpen.call(fs, target, ...rest);
    };
    try { materializeWorkItem({ args }); }
    catch (error) { rejected = /changed|snapshot/i.test(error.message); }
    finally { fs.openSync = originalOpen; }
    assert(injected && rejected, "snapshot race rejected before report replacement");
    assert(fs.readFileSync(ctx.reportPath, "utf8") === concurrentBytes, "concurrent editor's report preserved");
    assert(!fs.readdirSync(ctx.workflowRoot).some(name => name.endsWith(".tmp")), "failed atomic commit leaves no staged report");
  } finally { ctx.dispose(); }
}

function testResumeCliAndLegacyFullNotes() {
  const ctx = buildRecoveryFixture(false, { "planning-track": "full" });
  try {
    const args = recoveryArgs(ctx), cli = path.resolve(__dirname, "../bin/wfc.js");
    const argv = [cli, "materialize", "--resume-proposal", "--work-item", ctx.slug,
      "--project-root", ctx.projectRoot, "--workflow-root", "work-items",
      "--expected-report-sha256", args["expected-report-sha256"], "--operation-id", args["operation-id"],
      "--approval-root", ctx.approvalRoot];
    const first = execFileSync(process.execPath, argv, { encoding: "utf8" });
    const retry = execFileSync(process.execPath, argv, { encoding: "utf8" });
    assert(first.includes("APPLIED") && retry.includes("NOOP") && retry.includes("projection_status=SYNCED"),
      "public wfc CLI reports APPLIED/NOOP and projection status");
    assert(fs.readdirSync(ctx.workflowRoot).filter(name => name.endsWith(".md")).length === 8, "legacy full profile keeps eight notes");
    console.log("  PASS: proposal recovery CLI, signatures, refusal matrix, partial-write retry, notes, and snapshot race");
  } finally { ctx.dispose(); }
}

function testResumeMalformedAdaptiveInputIsReadOnly() {
  const ctx = buildRecoveryFixture(false, { "planning-track": "full", "adaptive-writes": "true",
    "request-lane": "product_delivery", "public-contract": true, ...ADAPTIVE_ACTIVATION_ARGS });
  try {
    const base = JSON.parse(fs.readFileSync(ctx.reportPath));
    for (const [name, mutate] of [
      ["empty role reasons", d => { d.roles[0].reasons = []; }],
      ["empty gate reviewers", d => { d.gates[0].reviewer_roles = []; }],
      ["invalid lane", d => { d.request_lane = "invalid"; }],
      ["missing routing reasons", d => { d.routing_reasons = []; }],
      ["unknown role", d => { d.roles[0].role = "invented"; }]
    ]) {
      const d = JSON.parse(JSON.stringify(base)); mutate(d); fs.writeFileSync(ctx.reportPath, JSON.stringify(d));
      assertRecoveryRefusal(ctx, recoveryArgs(ctx), name);
    }
  } finally { ctx.dispose(); }
}

testResumeMalformedAdaptiveInputIsReadOnly();
testResumeCliAndLegacyFullNotes();
testResumeMissingReportAndSnapshotRace();
testResumeRetryRevalidatesHistory();
testResumeNoteGovernanceConflict();
testResumeRejectsUntrustedAndConflictingState();
testResumeFailuresAndOwnedNotes();
testResumeAdaptiveAdmission();
testResumeReadyAndSignedReview();
testDefaultMaterializerPreservesUnapprovedReports();
testMaterializeEmitsTelemetryWhenOptIn();
testMaterializeNoTelemetryByDefault();
testTarMaterializerCannotReplaceGovernedReport();
testTarMaterializerHonorsReportLock();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in materialize-work-item-light.test.js`);
  process.exit(1);
}
console.log("\nAll materialize-work-item (Light routing) tests passed.");
