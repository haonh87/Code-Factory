// Regression fixtures for the four approval-path defects TD-01 to TD-04.
//
// Each test asserts the DESIRED behaviour, so every one is expected to be RED
// before its fix lands and green after. A fixture that cannot be made red means
// the symptom was misdiagnosed; in that case the requirement is withdrawn rather
// than the fixture weakened. See approval-path-defects.s06 task T1.
//
// Work item: approval-path-defects
// Requirements: REQ-001 (TD-01), REQ-002 (TD-02), REQ-003 (TD-03), REQ-004 (TD-04)

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  } else {
    console.log(`  PASS: ${message}`);
  }
}

const WFC = path.join(__dirname, "..", "bin", "wfc.js");

function tmpRoot(name) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `apd-${name}-`));
}

// Scaffolded files land read-only (0444), so chmod on the way down before removing.
// Same shape as the rmrf in work-item-protocol.test.js.
function rmrf(target) {
  try { fs.chmodSync(target, 0o755); } catch (_e) { /* ignore */ }
  try {
    for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
      const child = path.join(target, entry.name);
      if (entry.isDirectory()) rmrf(child);
      else {
        try { fs.chmodSync(child, 0o644); } catch (_e) { /* ignore */ }
        fs.rmSync(child, { force: true });
      }
    }
  } catch (_e) { /* ignore */ }
  fs.rmSync(target, { recursive: true, force: true });
}

// Scaffolded notes are read-only; make writable before editing frontmatter.
function makeWritable(filePath) {
  try { fs.chmodSync(filePath, 0o644); } catch (_e) { /* ignore */ }
}

// Run the CLI. Returns { status, stdout, stderr } and never throws, because the
// point of these fixtures is to inspect failures rather than propagate them.
function wfc(args, opts = {}) {
  try {
    const stdout = execFileSync(process.execPath, [WFC, ...args], {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env, ...(opts.env || {}) }
    });
    return { status: 0, stdout, stderr: "" };
  } catch (e) {
    return {
      status: e.status === undefined ? 1 : e.status,
      stdout: String(e.stdout || ""),
      stderr: String(e.stderr || "")
    };
  }
}

// delivery-context is pinned to brownfield. An empty temp project root makes
// inferDeliveryContext return greenfield, which sets approval_gates.foundation=required,
// which sdd_mode=light forbids by design. Pinning it models the real work items these
// fixtures are derived from and keeps the failure surface on the defect under test.
function scaffoldStep({ projectRoot, workflowRootBase, slug, step, extra = [] }) {
  return wfc([
    "scaffold-step",
    "--work-item", slug,
    "--step", step,
    "--single-step",
    "--project-root", projectRoot,
    "--workflow-root", path.join(workflowRootBase, slug),
    "--delivery-context", "brownfield",
    ...extra
  ]);
}

function readFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parts = raw.split("---");
  const fm = {};
  String(parts[1] || "")
    .split(/\r?\n/)
    .forEach((line) => {
      const m = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
      if (m) fm[m[1]] = m[2].replace(/^"|"$/g, "");
    });
  // spec_refs.card is nested; pick it up separately.
  const card = /^\s{2}card:\s*"?([^"\n]*)"?\s*$/m.exec(String(parts[1] || ""));
  fm["spec_refs.card"] = card ? card[1] : "";
  return fm;
}

function setFrontmatterValue(filePath, key, value) {
  makeWritable(filePath);
  const raw = fs.readFileSync(filePath, "utf8");
  const next = raw.replace(new RegExp(`^${key}:.*$`, "m"), `${key}: ${value}`);
  fs.writeFileSync(filePath, next, "utf8");
}

// ---------------------------------------------------------------------------
// TD-01 / REQ-001
// A work item created only by wfc scaffold-step must be approvable, and the
// report that makes it approvable must not imply approval.
// Observed today: ERROR: Missing work item report: .../<slug>.work-item-report.json
// ---------------------------------------------------------------------------
function testTd01ScaffoldedWorkItemIsApprovable() {
  console.log("\nTD-01 / REQ-001: a scaffold-created work item is approvable");
  const projectRoot = tmpRoot("td01");
  try {
    const workflowRootBase = path.join(projectRoot, "work-items");
    const slug = "td01-item";

    const approvalRoot = tmpRoot("td01-approvals");
    const scaffold = scaffoldStep({ projectRoot, workflowRootBase, slug, step: "s01" });
    assert(scaffold.status === 0, "scaffold-step succeeds");

    const reportPath = path.join(workflowRootBase, slug, `${slug}.work-item-report.json`);
    assert(
      !fs.existsSync(reportPath),
      "precondition: scaffold-step alone writes no report, which is correct - scaffold makes notes, protocol makes protocol state"
    );

    // AC-001 is about approve succeeding, not about scaffold writing the report.
    // An earlier version of this fixture asserted the latter and was stricter than
    // the acceptance criterion; corrected here so the fixture tests the contract.
    const protocolScript = path.resolve(__dirname, "..", "scripts", "work-item-protocol.js");
    const approve = (() => {
      try {
        const stdout = execFileSync(
          process.execPath,
          [protocolScript, "approve",
            "--work-item", slug,
            "--reviewed-by", "ba",
            "--project-root", projectRoot,
            "--workflow-root", workflowRootBase,
            "--approval-root", approvalRoot],
          {
            encoding: "utf8",
            stdio: ["pipe", "pipe", "pipe"],
            env: {
              ...process.env,
              WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
              WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
              WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot,
              WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT: "true"
            }
          }
        );
        return { status: 0, out: stdout };
      } catch (e) {
        return { status: e.status === undefined ? 1 : e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
      }
    })();

    console.log(`    approve exit=${approve.status}; first line: ${String(approve.out).trim().split("\n")[0] || "(empty)"}`);
    assert(
      approve.status === 0,
      "wfc work-item approve succeeds on a scaffold-created work item with no manual file creation (today: Missing work item report - TD-01)"
    );
    assert(
      fs.existsSync(reportPath),
      "approve leaves a persisted report behind"
    );

    if (fs.existsSync(reportPath)) {
      const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
      assert(
        report.request_source === "legacy-scaffold",
        `the report came from the bootstrap path, not fabricated (request_source="${report.request_source}")`
      );
      assert(
        report.approval_status === "APPROVED" && report.reviewed_by === "ba",
        "after approve the report records the human decision, and only then"
      );
      assert(
        Array.isArray(report.audit_events) && report.audit_events.includes("REPORT_BOOTSTRAPPED"),
        "the audit trail says the report was bootstrapped, so its provenance is not hidden"
      );
    }
  } finally {
    rmrf(projectRoot);
  }
}

// ---------------------------------------------------------------------------
// TD-02 / REQ-002
// Sealing a gate on a note that is still draft must be refused, because
// finalizing afterwards changes the note hash and makes the receipt stale.
// The refusal message must name what is wrong so the failure teaches the fix.
// ---------------------------------------------------------------------------
function testTd02SealRefusesUnfinalizedNote() {
  console.log("\nTD-02 / REQ-002: sealing an unfinalized note is refused");
  const projectRoot = tmpRoot("td02");
  try {
    const workflowRootBase = path.join(projectRoot, "work-items");
    const slug = "td02-item";
    // Approval root must live OUTSIDE the project root, per the guard in
    // workflow-trusted-approval-utils. Keeping it inside produced a refusal that
    // looked like the TD-02 refusal but was not - a false green worth avoiding.
    const approvalRoot = tmpRoot("td02-approvals");

    ["s01", "s04", "s06"].forEach((step) => {
      scaffoldStep({ projectRoot, workflowRootBase, slug, step });
    });

    const dir = path.join(workflowRootBase, slug);
    const s01 = path.join(dir, `${slug}.s01.restate.md`);
    const s04 = path.join(dir, `${slug}.s04.acceptance-criteria.md`);

    [s01, s04].forEach((f) => {
      setFrontmatterValue(f, "sdd_mode", "light");
      setFrontmatterValue(f, "planning_track", "quick");
    });

    // Authority satisfied, note deliberately left status: draft.
    makeWritable(s04);
    const raw = fs.readFileSync(s04, "utf8");
    fs.writeFileSync(
      s04,
      raw
        .replace(/^role_signoffs:\n(?:\s{2}[\w]+:(?: \[\])?\n(?:\s{4}- .*\n)*)+/m,
          'role_signoffs:\n  spec:\n    - "ba"\n  dor:\n    - "ba"\n  approach:\n    - "developer"\n  task_plan:\n    - "developer"\n  dod:\n    - "qc"\n')
        .replace(/^  spec_reviewed_by: \[\]\n  spec_reviewed_at: ""$/m,
          '  spec_reviewed_by:\n    - "ba"\n  spec_reviewed_at: "2026-01-01T00:00:00.000Z"'),
      "utf8"
    );

    const fmBefore = readFrontmatter(s04);
    assert(fmBefore.status === "draft", "precondition: the host note is still status draft");

    const gateScript = path.resolve(__dirname, "..", "scripts", "workflow-gate-review.js");
    const seal = (() => {
      try {
        const stdout = execFileSync(
          process.execPath,
          [gateScript, "approve",
            "--work-item", slug,
            "--gate", "spec",
            "--reviewed-by", "ba",
            "--project-root", projectRoot,
            "--workflow-root", workflowRootBase,
            "--approval-root", approvalRoot],
          {
            encoding: "utf8",
            stdio: ["pipe", "pipe", "pipe"],
            env: {
              ...process.env,
              WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE: "true",
              WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE: "test-passphrase",
              WORKFLOW_BUNDLE_APPROVAL_ROOT: approvalRoot,
              WORKFLOW_BUNDLE_ALLOW_INSECURE_APPROVAL_ROOT: "true"
            }
          }
        );
        return { status: 0, out: stdout };
      } catch (e) {
        return { status: e.status === undefined ? 1 : e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
      }
    })();

    // Print the refusal so a green "is refused" cannot hide a refusal for the wrong
    // reason. An assertion that passes for the wrong reason is worse than a red one.
    console.log(`    seal exit=${seal.status}; first line: ${String(seal.out).trim().split("\n")[0] || "(empty)"}`);

    assert(
      seal.status !== 0,
      "sealing is refused while the host note is draft (today it succeeds, then activate calls the receipt stale - TD-02)"
    );
    // Only meaningful once a refusal exists. Checking the message of a SUCCESS
    // would match "status=APPROVED" and pass for the wrong reason.
    assert(
      seal.status !== 0 && /\bstatus\b.*draft|spec_status|finali[sz]e/i.test(seal.out),
      "the refusal names the unfinalized field so the failure teaches the fix (no refusal exists today - TD-02)"
    );
  } finally {
    rmrf(projectRoot);
  }
}

// ---------------------------------------------------------------------------
// TD-03 / REQ-003
// A note created lazily must inherit the work item's spec_refs, work_item_type
// and spec_status. Today it inherits sdd_mode and planning_track but drops the
// other three, so wfc sdd fails on the note the CLI just generated.
// ---------------------------------------------------------------------------
function testTd03LazyNoteInheritsSpecRefs() {
  console.log("\nTD-03 / REQ-003: a lazily created note inherits spec_refs, type and spec_status");
  const projectRoot = tmpRoot("td03");
  try {
    const workflowRootBase = path.join(projectRoot, "work-items");
    const slug = "td03-item";

    const scaffold = scaffoldStep({ projectRoot, workflowRootBase, slug, step: "s01" });
    assert(scaffold.status === 0, "scaffold-step s01 succeeds");

    const s01 = path.join(workflowRootBase, slug, `${slug}.s01.restate.md`);
    // Make the work item look like a light, card-backed BUG, as the real one is.
    setFrontmatterValue(s01, "work_item_type", "BUG");
    setFrontmatterValue(s01, "sdd_mode", "light");
    setFrontmatterValue(s01, "planning_track", "quick");
    setFrontmatterValue(s01, "spec_status", "approved");
    makeWritable(s01);
    const raw = fs.readFileSync(s01, "utf8");
    fs.writeFileSync(
      s01,
      raw.replace(/^spec_refs:\n(?:\s{2}\w+: .*\n)+/m, 'spec_refs:\n  card: "product-specs/cards/td03-item.md"\n'),
      "utf8"
    );

    const { ensureLightLazyStepNote } = require("../scripts/work-item-protocol");
    // Positional signature: (reportInput, projectRoot, stepId).
    ensureLightLazyStepNote(
      {
        work_item_slug: slug,
        work_item_type: "BUG",
        delivery_context: "brownfield",
        sdd_mode: "light",
        planning_track: "quick",
        workflow_root: path.join(workflowRootBase, slug)
      },
      projectRoot,
      "s07"
    );

    const s07 = path.join(workflowRootBase, slug, `${slug}.s07.implementation.md`);
    assert(fs.existsSync(s07), "the lazy s07 note is created");

    if (fs.existsSync(s07)) {
      const fm = readFrontmatter(s07);
      assert(
        fm["spec_refs.card"] === "product-specs/cards/td03-item.md",
        `s07 inherits spec_refs.card (got "${fm["spec_refs.card"]}" - TD-03)`
      );
      assert(
        fm.work_item_type === "BUG",
        `s07 inherits work_item_type (got "${fm.work_item_type}" - TD-03)`
      );
      // spec_status is deliberately NOT inherited. It is a per-note lifecycle field and
      // is supposed to differ: a human finalizes the gate host notes while s01 stays
      // draft. Inheriting it made `work-item activate` fail with "Sibling notes disagree
      // on spec_status" in the ordinary flow - found by the T5 end-to-end run. The
      // observed TD-03 symptom was "Missing spec_refs.card", never a spec_status
      // mismatch, so this assertion pins the documented default instead.
      assert(
        fm.spec_status === "draft",
        `s07 keeps the documented spec_status default, not a sibling's lifecycle value (got "${fm.spec_status}")`
      );
      // These two already work today; asserted so a fix cannot regress them.
      assert(fm.sdd_mode === "light", "s07 still inherits sdd_mode (already works)");
      assert(fm.planning_track === "quick", "s07 still inherits planning_track (already works)");
    }
  } finally {
    rmrf(projectRoot);
  }
}

// ---------------------------------------------------------------------------
// TD-04 / REQ-004
// A note created by wfc scaffold-step must inherit planning_track, sdd_mode and
// work_item_type from its sibling notes.
// Observed today: ERROR: Inconsistent planning_track within work item '<slug>'
// ---------------------------------------------------------------------------
function testTd04ScaffoldStepInheritsFromSiblings() {
  console.log("\nTD-04 / REQ-004: scaffold-step inherits planning_track, sdd_mode and type");
  const projectRoot = tmpRoot("td04");
  try {
    const workflowRootBase = path.join(projectRoot, "work-items");
    const slug = "td04-item";

    assert(scaffoldStep({ projectRoot, workflowRootBase, slug, step: "s01" }).status === 0, "scaffold s01 succeeds");

    const s01 = path.join(workflowRootBase, slug, `${slug}.s01.restate.md`);
    setFrontmatterValue(s01, "planning_track", "quick");
    setFrontmatterValue(s01, "sdd_mode", "light");
    setFrontmatterValue(s01, "work_item_type", "BUG");

    assert(scaffoldStep({ projectRoot, workflowRootBase, slug, step: "s04" }).status === 0, "scaffold s04 succeeds");

    const s04 = path.join(workflowRootBase, slug, `${slug}.s04.acceptance-criteria.md`);
    const fm = readFrontmatter(s04);
    assert(
      fm.planning_track === "quick",
      `s04 inherits planning_track from s01 (got "${fm.planning_track}" - TD-04)`
    );
    assert(
      fm.sdd_mode === "light",
      `s04 inherits sdd_mode from s01 (got "${fm.sdd_mode}" - TD-04)`
    );
    assert(
      fm.work_item_type === "BUG",
      `s04 inherits work_item_type from s01 (got "${fm.work_item_type}" - TD-04)`
    );

    const validate = wfc(["--workflow-root", workflowRootBase, "--project-root", projectRoot]);
    assert(
      validate.status === 0,
      "wfc validate passes on the scaffolded pair with no hand editing (today it reports Inconsistent planning_track - TD-04)"
    );

    // EDGE-001: with no sibling to inherit from, the documented defaults still stand.
    const fresh = "td04-fresh";
    assert(
      scaffoldStep({ projectRoot, workflowRootBase, slug: fresh, step: "s01" }).status === 0,
      "EDGE-001: a first scaffold with no sibling still succeeds"
    );
    const freshFm = readFrontmatter(path.join(workflowRootBase, fresh, `${fresh}.s01.restate.md`));
    assert(
      freshFm.planning_track === "full" && freshFm.work_item_type === "FEATURE",
      `EDGE-001: with no sibling the documented defaults apply (got ${freshFm.planning_track}/${freshFm.work_item_type})`
    );

    // EDGE-002: siblings that disagree must be refused, not silently picked from.
    setFrontmatterValue(s04, "planning_track", "full");
    const conflict = scaffoldStep({ projectRoot, workflowRootBase, slug, step: "s06" });
    assert(
      conflict.status !== 0 && /disagree/i.test(`${conflict.stdout}${conflict.stderr}`),
      "EDGE-002: scaffolding is refused while siblings disagree, rather than inheriting from an inconsistent set"
    );
  } finally {
    rmrf(projectRoot);
  }
}

console.log("Running approval-path-defects regression fixtures...");
console.log("Expected state before the fixes land: every TD assertion RED.\n");

testTd01ScaffoldedWorkItemIsApprovable();
testTd02SealRefusesUnfinalizedNote();
testTd03LazyNoteInheritsSpecRefs();
testTd04ScaffoldStepInheritsFromSiblings();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in approval-path-defects.test.js`);
  process.exit(1);
}
console.log("\nAll approval-path-defects fixtures passed.");
