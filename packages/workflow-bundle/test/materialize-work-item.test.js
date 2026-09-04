const fs = require("fs");
const os = require("os");
const path = require("path");
const { materializeWorkItem } = require("../scripts/materialize-work-item");
const { SDD_LIGHT_PROFILE } = require("../scripts/workflow-sdd-definitions");
const { validateWorkItemProtocol } = require("../scripts/validate-work-item-protocol");

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
      result.report.required_actions.some((action) => /--gate task_plan --reviewed-by developer/.test(action)),
      "maintenance actions must request only the applicable readiness gate"
    );
    assert(
      !result.report.required_actions.some((action) => /--gate (?:spec|dor|approach)/.test(action)),
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
    assert(tel.runtime_version === "2.6.2", `telemetry carries bounded runtime version, got ${tel.runtime_version}`);
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

testMaterializeEmitsTelemetryWhenOptIn();
testMaterializeNoTelemetryByDefault();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in materialize-work-item-light.test.js`);
  process.exit(1);
}
console.log("\nAll materialize-work-item (Light routing) tests passed.");
