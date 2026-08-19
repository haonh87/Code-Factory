const fs = require("fs");
const os = require("os");
const path = require("path");
const { scaffoldWorkflowNotes, ensureLazyWorkflowNote } = require("../scripts/scaffold-workflow");
const { SDD_LIGHT_BUDGET, SDD_LIGHT_PROFILE } = require("../scripts/workflow-sdd-definitions");
const { validateWorkflowExecution } = require("../scripts/validate-workflow-execution");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

// syncCapabilityControl (chạy trong scaffoldWorkflowNotes) set quyền read-only
// trên protected roots, làm rmSync thất bại với ENOTEMPTY. Phải chmod lại trước.
function rmrf(target) {
  try {
    fs.chmodSync(target, 0o755);
  } catch (_e) {
    /* ignore */
  }
  try {
    const entries = fs.readdirSync(target, { withFileTypes: true });
    for (const entry of entries) {
      const child = path.join(target, entry.name);
      if (entry.isDirectory()) {
        rmrf(child);
      } else {
        try { fs.chmodSync(child, 0o644); } catch (_e) { /* ignore */ }
        fs.rmSync(child, { force: true });
      }
    }
  } catch (_e) {
    /* ignore */
  }
  fs.rmSync(target, { recursive: true, force: true });
}

function readNote(workflowRoot, slug, stepId, stepSlug) {
  return fs.readFileSync(path.join(workflowRoot, `${slug}.${stepId}.${stepSlug}.md`), "utf8");
}

function getFrontmatterValue(content, key) {
  const pattern = new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m");
  const match = content.match(pattern);
  return match ? match[1].replace(/^["']|["']$/g, "") : null;
}

function getUpstreamArtifacts(content) {
  const lines = content.split(/\r?\n/);
  const inFront = lines[0].trim() === "---";
  if (!inFront) return [];
  const items = [];
  let inList = false;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "---") break;
    if (/^upstream_artifacts:\s*$/.test(lines[i])) { inList = true; continue; }
    if (inList) {
      const m = lines[i].match(/^\s{2,}-\s*(.+?)\s*$/);
      if (m) { items.push(m[1].replace(/^["']|["']$/g, "")); continue; }
      if (/^\S/.test(lines[i])) break;
    }
  }
  return items;
}

function buildProjectRoot() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "scaffold-light-"));
  fs.mkdirSync(path.join(projectRoot, "project-context"), { recursive: true });
  fs.writeFileSync(path.join(projectRoot, "project-context", "project-context.md"), "# Project Context\n", "utf8");
  return projectRoot;
}

const STEP_SLUGS = { s01: "restate", s04: "acceptance-criteria", s06: "task-breakdown", s07: "implementation", s08: "verification" };

function baseArgs(projectRoot, workflowRoot) {
  return {
    "work-item": "light-compact-item",
    "sdd-mode": "light",
    "planning-track": "quick",
    "delivery-context": "brownfield",
    "workflow-root": workflowRoot,
    "project-root": projectRoot
  };
}

function testCompactScaffold() {
  const projectRoot = buildProjectRoot();
  const workflowRoot = path.join(projectRoot, "work-items", "light-compact-item");
  const args = baseArgs(projectRoot, workflowRoot);
  const result = scaffoldWorkflowNotes({ args });

  const mdFiles = fs.readdirSync(workflowRoot).filter((f) => f.endsWith(".md")).sort();
  assert(mdFiles.length === 3, `expected 3 initial notes, got ${mdFiles.length}: ${mdFiles.join(", ")}`);
  assert(mdFiles.includes("light-compact-item.s01.restate.md"), "expected s01 note");
  assert(mdFiles.includes("light-compact-item.s04.acceptance-criteria.md"), "expected s04 note");
  assert(mdFiles.includes("light-compact-item.s06.task-breakdown.md"), "expected s06 note");
  assert(!mdFiles.some((f) => f.includes(".s02.")), "must not scaffold s02 for light");
  assert(!mdFiles.some((f) => f.includes(".s05.")), "must not scaffold s05 for light");

  // spec_refs.card for light; brd/srs omitted.
  const s01 = readNote(workflowRoot, "light-compact-item", "s01", STEP_SLUGS.s01);
  assert(/spec_refs:/.test(s01), "s01 must have spec_refs block");
  assert(/^\s{2}card:\s*""$/m.test(s01), "s01 spec_refs must include card");
  assert(!/^\s{2}brd:/m.test(s01), "s01 must not emit brd for light");
  assert(!/^\s{2}srs:/m.test(s01), "s01 must not emit srs for light");

  // Light hosts logical steps: s01 hosts Business Goal + Open Questions; s06 hosts Option Analysis + Technical Approach.
  assert(/## Business Goal/.test(s01), "s01 must host ## Business Goal (s02) for light");
  assert(/## Open Questions/.test(s01), "s01 must host ## Open Questions (s03) for light");
  const s06 = readNote(workflowRoot, "light-compact-item", "s06", STEP_SLUGS.s06);
  assert(/## Option Analysis/.test(s06), "s06 must host ## Option Analysis (s05) for light");
  assert(/## Technical Approach/.test(s06), "s06 must host ## Technical Approach (s05) for light");
  assert(/## Brownfield Impact Analysis/.test(s06), "s06 must host ## Brownfield Impact Analysis for brownfield light");

  // No dangling upstream refs: every upstream_artifacts entry must exist.
  mdFiles.forEach((file) => {
    const content = fs.readFileSync(path.join(workflowRoot, file), "utf8");
    const upstream = getUpstreamArtifacts(content);
    upstream.forEach((ref) => {
      assert(fs.existsSync(path.join(workflowRoot, ref)), `dangling upstream ref '${ref}' in ${file}`);
    });
  });

  // Budget: 3 notes <= initialWorkflowLines (450) and <= initialArtifact.noCr (4).
  const totalLines = mdFiles.reduce((sum, f) => sum + fs.readFileSync(path.join(workflowRoot, f), "utf8").split("\n").length, 0);
  assert(totalLines <= SDD_LIGHT_BUDGET.initialWorkflowLines, `initial ${totalLines} lines exceeds budget ${SDD_LIGHT_BUDGET.initialWorkflowLines}`);
  assert(mdFiles.length <= SDD_LIGHT_BUDGET.initialArtifact.noCr, `initial ${mdFiles.length} artifacts exceeds budget ${SDD_LIGHT_BUDGET.initialArtifact.noCr}`);
  console.log(`  PASS: compact-scaffold (3 notes, ${totalLines} lines, no dangling refs)`);

  // Lazy s07 + s08 idempotent.
  const r1 = ensureLazyWorkflowNote({ args, stepId: "s07" });
  assert(r1.created === true, "first ensureLazy s07 should create");
  const r2 = ensureLazyWorkflowNote({ args, stepId: "s07" });
  assert(r2.created === false, "second ensureLazy s07 must be idempotent (no duplicate)");
  const r3 = ensureLazyWorkflowNote({ args, stepId: "s08" });
  assert(r3.created === true, "first ensureLazy s08 should create");

  const mdFilesAfter = fs.readdirSync(workflowRoot).filter((f) => f.endsWith(".md")).sort();
  assert(mdFilesAfter.length === 5, `expected 5 notes after lazy s07+s08, got ${mdFilesAfter.length}`);
  assert(mdFilesAfter.filter((f) => f.includes(".s07.")).length === 1, "exactly one s07 note (no duplicate)");
  assert(mdFilesAfter.filter((f) => f.includes(".s08.")).length === 1, "exactly one s08 note (no duplicate)");

  // Lazy notes upstream must not dangle.
  const s07 = readNote(workflowRoot, "light-compact-item", "s07", STEP_SLUGS.s07);
  const s07Upstream = getUpstreamArtifacts(s07);
  assert(s07Upstream.includes("light-compact-item.s06.task-breakdown.md"), "s07 upstream must reference s06");
  s07Upstream.forEach((ref) => assert(fs.existsSync(path.join(workflowRoot, ref)), `dangling s07 upstream '${ref}'`));
  const s08 = readNote(workflowRoot, "light-compact-item", "s08", STEP_SLUGS.s08);
  const s08Upstream = getUpstreamArtifacts(s08);
  assert(s08Upstream.includes("light-compact-item.s07.implementation.md"), "s08 upstream must reference s07");
  s08Upstream.forEach((ref) => assert(fs.existsSync(path.join(workflowRoot, ref)), `dangling s08 upstream '${ref}'`));

  // Final budget: 5 notes <= finalArtifact.noCr (6) and <= finalWorkflowLines (600).
  const finalLines = mdFilesAfter.reduce((sum, f) => sum + fs.readFileSync(path.join(workflowRoot, f), "utf8").split("\n").length, 0);
  assert(mdFilesAfter.length <= SDD_LIGHT_BUDGET.finalArtifact.noCr, `final ${mdFilesAfter.length} artifacts exceeds ${SDD_LIGHT_BUDGET.finalArtifact.noCr}`);
  assert(finalLines <= SDD_LIGHT_BUDGET.finalWorkflowLines, `final ${finalLines} lines exceeds budget ${SDD_LIGHT_BUDGET.finalWorkflowLines}`);
  console.log(`  PASS: lazy-s07-s08 idempotent (5 notes, ${finalLines} lines, no dangling)`);

  rmrf(projectRoot);
}

function testExplicitStepsRespected() {
  // Explicit --steps must override light default set.
  const projectRoot = buildProjectRoot();
  const workflowRoot = path.join(projectRoot, "work-items", "light-explicit");
  const args = { ...baseArgs(projectRoot, workflowRoot), "work-item": "light-explicit", steps: "s01,s04" };
  const result = scaffoldWorkflowNotes({ args });
  const mdFiles = fs.readdirSync(workflowRoot).filter((f) => f.endsWith(".md")).sort();
  assert(mdFiles.length === 2, `explicit --steps should produce 2 notes, got ${mdFiles.length}`);
  assert(mdFiles.includes("light-explicit.s01.restate.md"), "explicit s01 present");
  assert(mdFiles.includes("light-explicit.s04.acceptance-criteria.md"), "explicit s04 present");
  console.log("  PASS: explicit-steps-respected");
  rmrf(projectRoot);
}

function testNonLightStillScaffoldsAll() {
  // sdd_mode=none (default) must still scaffold all 8 steps.
  const projectRoot = buildProjectRoot();
  const workflowRoot = path.join(projectRoot, "work-items", "full-item");
  const args = {
    "work-item": "full-item",
    "planning-track": "full",
    "delivery-context": "brownfield",
    "workflow-root": workflowRoot,
    "project-root": projectRoot
  };
  scaffoldWorkflowNotes({ args });
  const mdFiles = fs.readdirSync(workflowRoot).filter((f) => f.endsWith(".md")).sort();
  assert(mdFiles.length === 8, `non-light should scaffold 8 notes, got ${mdFiles.length}`);
  // Non-light must use brd/srs, not card.
  const s01 = readNote(workflowRoot, "full-item", "s01", STEP_SLUGS.s01);
  assert(/^\s{2}brd:\s*""$/m.test(s01), "non-light s01 must emit brd");
  assert(/^\s{2}srs:\s*""$/m.test(s01), "non-light s01 must emit srs");
  assert(!/^\s{2}card:/m.test(s01), "non-light must not emit card");
  console.log("  PASS: non-light-scaffolds-all-8 (brd/srs, no card)");
  rmrf(projectRoot);
}

function scaffoldMultiAgent(roleCount) {
  const projectRoot = buildProjectRoot();
  const slug = `multi-role-${roleCount}`;
  const workflowRoot = path.join(projectRoot, "work-items", slug);
  const roles = Array.from({ length: roleCount }, (_value, index) => `role-${index + 1}`);
  const args = {
    "work-item": slug,
    "planning-track": "full",
    "delivery-context": "brownfield",
    "workflow-root": workflowRoot,
    "project-root": projectRoot,
    steps: "s05,s06,s07",
    "execution-mode": "multi_agent",
    "execution-role": roles,
    "review-mode": "independent",
    "verification-owner": "qc"
  };
  scaffoldWorkflowNotes({ args });
  return { projectRoot, workflowRoot, slug, roles };
}

function testMultiAgentSectionsHaveFlatFileCount() {
  const scenarios = [2, 3, 4, 8].map(scaffoldMultiAgent);
  const counts = [];
  try {
    scenarios.forEach(({ workflowRoot, slug, roles }) => {
      const files = fs.readdirSync(workflowRoot).filter((file) => file.endsWith(".md")).sort();
      counts.push(files.length);
      ["execution-policy", "worker-assignment", "worker-handoff-report", "merge-report"].forEach((legacySlug) => {
        assert(!files.some((file) => file.includes(`.${legacySlug}.md`)), `new scaffold must not emit ${legacySlug}`);
      });

      const s05 = readNote(workflowRoot, slug, "s05", "technical-approach");
      const s06 = readNote(workflowRoot, slug, "s06", "task-breakdown");
      const s07 = readNote(workflowRoot, slug, "s07", "implementation");
      assert(/## Execution Topology/.test(s05), "s05 must host execution policy in ## Execution Topology");
      assert(/## Role Outputs/.test(s06) && /assignments:/.test(s06), "s06 must host assignments[] in ## Role Outputs");
      assert(/## Role Outputs/.test(s07) && /handoffs:/.test(s07), "s07 must host handoffs[] in ## Role Outputs");
      assert(/## Merge Summary/.test(s07), "s07 must host merge report in ## Merge Summary");
      assert((s06.match(/^\s+- assignment_id:/gm) || []).length === roles.length, "assignment count must match role count");
      assert((s07.match(/^\s+- assignment_id:/gm) || []).length === roles.length, "handoff count must match role count");
      assert(validateWorkflowExecution({ workflowRoot }).ok, "generated section-shaped runtime must validate");
    });
    assert(new Set(counts).size === 1, `2/3/4/8 roles must have identical file counts, got ${counts.join("/")}`);

    const sample = scenarios[0];
    const s07Path = path.join(sample.workflowRoot, `${sample.slug}.s07.implementation.md`);
    fs.chmodSync(s07Path, 0o644);
    const content = fs.readFileSync(s07Path, "utf8").replace(
      "merged_assignments:\n",
      'merged_assignments:\n  - "S06-ORPHAN-999"\n'
    );
    fs.writeFileSync(s07Path, content, "utf8");
    const orphanResult = validateWorkflowExecution({ workflowRoot: sample.workflowRoot });
    assert(
      !orphanResult.ok && orphanResult.errors.some((error) => /without a matching.*handoff/i.test(error)),
      `orphaned merged assignment must fail, got ${JSON.stringify(orphanResult.errors)}`
    );
    console.log(`  PASS: multi-agent 2/3/4/8 roles keep flat file count ${counts.join("/")} and reject orphan ids`);
  } finally {
    scenarios.forEach(({ projectRoot }) => rmrf(projectRoot));
  }
}

console.log("Running scaffold-workflow (Light compact) tests...\n");
testCompactScaffold();
testExplicitStepsRespected();
testNonLightStillScaffoldsAll();
testMultiAgentSectionsHaveFlatFileCount();

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in scaffold-workflow.test.js`);
  process.exit(1);
}
console.log("\nAll scaffold-workflow (Light compact) tests passed.");
