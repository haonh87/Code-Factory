const fs = require("fs");
const os = require("os");
const path = require("path");
const { materializeWorkItem } = require("../scripts/materialize-work-item");
const { SDD_LIGHT_PROFILE } = require("../scripts/workflow-sdd-definitions");

let failures = 0;

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
  try {
    const result = materializeWorkItem({
      args: {
        request: "add export button",
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
    assert(tel.selected_profile === SDD_LIGHT_PROFILE, `telemetry carries selected_profile, got ${tel.selected_profile}`);
    assert(tel.sdd_light_profile === "preview", "telemetry carries sdd_light_profile default preview");
    assert(typeof tel.artifact_count === "number" && tel.artifact_count > 0, `telemetry carries artifact_count>0 when auto-scaffold ran, got ${tel.artifact_count}`);
    console.log("  PASS: materialize emits opt-in out-of-band telemetry with profile + artifact count");
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