const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  getRequiredFinalizedGateKeys,
  resolveArtifactReference
} = require("../scripts/workflow-gate-evidence-utils");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function expectReferenceError(fn, code) {
  try {
    fn();
    assert(false, `expected ${code}`);
  } catch (error) {
    assert(error && error.code === code, `expected ${code}, got ${error && error.code}: ${error && error.message}`);
  }
}

console.log("Running artifact reference resolver tests...\n");

const adaptiveMaintenanceGates = {
  spec: "not_applicable",
  contract: "not_applicable",
  dor: "not_applicable",
  approach: "not_applicable",
  foundation: "not_applicable",
  task_plan: "required",
  uat: "not_applicable",
  dod: "required",
  release: "not_applicable",
  business_acceptance: "not_applicable"
};
assert(
  getRequiredFinalizedGateKeys("s04", adaptiveMaintenanceGates, "none", "adaptive_v1").length === 0,
  "T4 adaptive reader treats maintenance s04 gates as explicitly not applicable"
);
assert(
  getRequiredFinalizedGateKeys("s06", adaptiveMaintenanceGates, "none", "adaptive_v1").join(",") === "task_plan",
  "T4 adaptive reader requires only task_plan at s06"
);
assert(
  getRequiredFinalizedGateKeys("s04", adaptiveMaintenanceGates, "none", "legacy_v1").join(",") === "spec,dor",
  "T4 legacy reader preserves fixed-shape spec/dor requirements"
);

// D-E / T7: this assertion used to read a LIVE work item note and require protocol_status to be
// ACTIVE. It broke the moment that work item closed, which made the suite result depend on which
// work items happen to be ACTIVE rather than on the resolver. The fixture below controls its own
// input instead.
//
// protocol_status is deliberately VERIFIED - a value no work item in this repo carries - so the
// assertion cannot pass by coincidence if the resolver ever returns a constant or a stale read.
const sameNoteRoot = fs.mkdtempSync(path.join(os.tmpdir(), "artifact-reference-same-note-"));
try {
  const fixtureNote = path.join(
    sameNoteRoot,
    "work-items",
    "fixture-item",
    "fixture-item.s01.restate.md"
  );
  writeFile(
    fixtureNote,
    [
      "---",
      'artifact_id: "fixture-item.s01.restate"',
      'work_item_slug: "fixture-item"',
      "---",
      "",
      "# Step 1 - Clarify",
      "",
      "## Work Item Protocol",
      "```yaml",
      "protocol_status: VERIFIED",
      'work_item_slug: "fixture-item"',
      "```",
      ""
    ].join("\n")
  );

  const sameNote = resolveArtifactReference({
    projectRoot: sameNoteRoot,
    currentFile: fixtureNote,
    reference: "#Work Item Protocol.protocol_status"
  });
  assert(
    sameNote.value === "VERIFIED",
    `same-note resolver must read protocol_status from the note it was given (got ${sameNote.value})`
  );
} finally {
  fs.rmSync(sameNoteRoot, { recursive: true, force: true });
}

// Preserve the protocol/report comparison and materialization lookup without reading a real
// work item. Resolve twice with different values so a constant or stale result cannot pass.
const protocolRoot = fs.mkdtempSync(path.join(os.tmpdir(), "artifact-reference-protocol-"));
try {
  const noteRef = "work-items/fixture-item/fixture-item.s01.restate.md";
  const fixtureNote = path.join(protocolRoot, noteRef);
  const reportPath = path.join(protocolRoot, "work-items", "fixture-item", "fixture-item.work-item-report.json");
  const crossFileReference = `${noteRef}#Work Item Materialization.work_item_slug`;

  for (const [status, slug] of [["VERIFIED", "fixture-before"], ["DONE", "fixture-after"]]) {
    writeFile(reportPath, JSON.stringify({ protocol_status: status }));
    writeFile(fixtureNote, [
      "# Fixture",
      "",
      "## Work Item Protocol",
      "```yaml",
      `protocol_status: ${status}`,
      "```",
      "",
      "## Work Item Materialization",
      "```yaml",
      `work_item_slug: ${slug}`,
      "```",
      ""
    ].join("\n"));

    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    const sameNote = resolveArtifactReference({
      projectRoot: protocolRoot,
      currentFile: fixtureNote,
      reference: "#Work Item Protocol.protocol_status"
    });
    assert(sameNote.value === report.protocol_status, `same-note resolver must match the fixture report (${status})`);

    const crossFile = resolveArtifactReference({
      projectRoot: protocolRoot,
      currentFile: __filename,
      reference: crossFileReference
    });
    assert(crossFile.value === slug, `cross-file resolver must read the fixture materialization block (${slug})`);
    assert(crossFile.artifactPath === fixtureNote, "cross-file resolver must return the fixture note path");
  }

  fs.unlinkSync(fixtureNote);
  expectReferenceError(
    () => resolveArtifactReference({ projectRoot: protocolRoot, currentFile: __filename, reference: crossFileReference }),
    "ARTIFACT_REFERENCE_FILE_MISSING"
  );
} finally {
  fs.rmSync(protocolRoot, { recursive: true, force: true });
}

const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "artifact-reference-"));
try {
  const currentFile = path.join(projectRoot, "work-items", "example", "example.s06.task-breakdown.md");
  const otherFile = path.join(projectRoot, "product-specs", "cards", "example.md");

  writeFile(
    currentFile,
    [
      "# Example",
      "",
      "## Main Artifact",
      "```yaml",
      "task_breakdown:",
      "  - id: T1",
      "    paths_in_scope:",
      '      - "packages/a.js"',
      '      - "packages/a.test.js"',
      "  - id: T2",
      "    paths_in_scope: []",
      "```",
      ""
    ].join("\n")
  );
  writeFile(
    otherFile,
    [
      "# Card",
      "",
      "## Acceptance Criteria",
      "```yaml",
      "acceptance_criteria:",
      "  - id: AC-001",
      '    criterion: "Resolver follows a repository-root reference"',
      "```",
      ""
    ].join("\n")
  );

  const sameNote = resolveArtifactReference({
    projectRoot,
    currentFile,
    reference: "#Main Artifact.task_breakdown[T1].paths_in_scope"
  });
  assert(Array.isArray(sameNote.value), "same-note reference must resolve a list");
  assert(sameNote.value.length === 2 && sameNote.value[0] === "packages/a.js", "same-note list contents must be preserved");
  assert(sameNote.artifactPath === currentFile, "same-note reference must resolve currentFile");

  const crossFile = resolveArtifactReference({
    projectRoot,
    currentFile,
    reference: "product-specs/cards/example.md#Acceptance Criteria.acceptance_criteria[AC-001].criterion"
  });
  assert(crossFile.value === "Resolver follows a repository-root reference", "cross-file reference must resolve by repository root");
  assert(crossFile.artifactPath === otherFile, "cross-file reference must return the target path");

  expectReferenceError(
    () => resolveArtifactReference({ projectRoot, currentFile, reference: "missing.md#Main Artifact.value" }),
    "ARTIFACT_REFERENCE_FILE_MISSING"
  );
  expectReferenceError(
    () => resolveArtifactReference({ projectRoot, currentFile, reference: "#Missing Heading.value" }),
    "ARTIFACT_REFERENCE_HEADING_MISSING"
  );

  const noYaml = path.join(projectRoot, "no-yaml.md");
  writeFile(noYaml, "## Main Artifact\nPlain text only.\n");
  expectReferenceError(
    () => resolveArtifactReference({ projectRoot, currentFile, reference: "no-yaml.md#Main Artifact.value" }),
    "ARTIFACT_REFERENCE_YAML_MISSING"
  );
  expectReferenceError(
    () => resolveArtifactReference({ projectRoot, currentFile, reference: "#Main Artifact.task_breakdown[T9].paths_in_scope" }),
    "ARTIFACT_REFERENCE_PATH_MISSING"
  );

  const unsafeYaml = path.join(projectRoot, "unsafe-yaml.md");
  writeFile(unsafeYaml, "## Main Artifact\n```yaml\n__proto__:\n  polluted: true\n```\n");
  expectReferenceError(
    () => resolveArtifactReference({ projectRoot, currentFile, reference: "unsafe-yaml.md#Main Artifact.__proto__" }),
    "ARTIFACT_REFERENCE_YAML_INVALID"
  );
} finally {
  fs.rmSync(projectRoot, { recursive: true, force: true });
}

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-gate-evidence-utils.test.js`);
  process.exit(1);
}

console.log("OK: workflow-gate-evidence-utils.test.js passed");

// Opt-in task contract compatibility; keep every legacy resolver regression above.
(() => {
const assert = require('assert');
const fs = require('fs');
const { fixture } = require('./validate-workflow-planning.test');
const { getFinalizedStepSemanticEvidenceErrors, getMissingGateEvidenceErrors, resolveArtifactReference } = require('../scripts/workflow-gate-evidence-utils');
const { getArtifactOwnershipDuplicationErrors } = require('../scripts/validate-workflow-governance');
const { validateWorkflowSdd } = require('../scripts/validate-workflow-sdd');
const failures = [];
let count = 0;
function check(name, run) {
  const f = fixture();
  try { run(f); count++; } catch (e) { failures.push(`${name}: ${e.message}`); }
  finally { fs.rmSync(f.root, { recursive: true, force: true }); }
}
function semantic(f, content = f.render(), sddMode = 'none') {
  fs.writeFileSync(f.file, content);
  return getFinalizedStepSemanticEvidenceErrors({ stepId: 's06', filePath: f.file, content, projectRoot: f.root, sddMode });
}
function resolve(f, fragment) { return resolveArtifactReference({projectRoot:f.root,currentFile:f.file,reference:fragment}); }
check('v1 semantic readiness', f => assert.deepStrictEqual(semantic(f), []));
check('Light uses the same JSON trace owner', f => assert.deepStrictEqual(semantic(f, f.render(), 'light'), []));
check('exact task lookup', f => { fs.writeFileSync(f.file,f.render()); assert.strictEqual(resolve(f,'#Main Artifact.task_breakdown[T1].id').value,'T1'); });
check('trace lookup', f => { fs.writeFileSync(f.file,f.render()); assert.deepStrictEqual(resolve(f,'#Traceability.acceptance_refs').value,['AC-001']); });
check('legacy semantics unchanged', f => { f.version=undefined; assert.deepStrictEqual(semantic(f, f.render().replace(/## Main Artifact[\s\S]*/, '## Main Artifact\n```yaml\ntask_breakdown:\n  - id: T1\n    verification_hint: Run event regression\n```\n')),[]); assert.strictEqual(resolve(f,'#Main Artifact.task_breakdown[T1].id').value,'T1'); });
for (const [name, edit, pattern] of [
 ['unknown version', s=>s.replace('task_contract_version: 1','task_contract_version: 9'),/task_contract_version/],
 ['duplicate key', s=>s.replace('"id": "T1",','"id": "T1", "id": "T9",'),/duplicate/],
 ['duplicate heading', s=>s+'\n## Main Artifact\n```json\n{}\n```',/owner/],
 ['malformed JSON', s=>s.replace('"implementation_goal":','"implementation_goal"'),/JSON/]
]) {
 check(`${name} semantic rejects`, f=>assert.match(semantic(f,edit(f.render())).join('\n'),pattern));
 check(`${name} reference rejects without fallback`, f=>{fs.writeFileSync(f.file,edit(f.render())); assert.throws(()=>resolve(f,'#Main Artifact.task_breakdown[T1].id'),pattern);});
}
check('governance catches duplicated JSON path map', f=>{
 f.main.dev_lane={path_map:['src/events.js']}; const content=f.render(); fs.writeFileSync(f.file,content);
 assert.match(getArtifactOwnershipDuplicationErrors({filePath:f.file,content,projectRoot:f.root}).join('\n'),/Duplicate task paths/);
});
check('SDD validates opted-in mapping even with sdd_mode none', f=>{
 f.trace.task_refs[0].task_ids=['T9']; fs.writeFileSync(f.file,f.render());
 assert.match(validateWorkflowSdd({workflowRoot:f.dir,projectRoot:f.root}).errors.join('\n'),/T9/);
});
check('default-profile gate rejects invalid v1', f=>{
 f.main.task_breakdown=[];
 const errors=getMissingGateEvidenceErrors({exists:true,frontmatterLines:[],status:'reviewed',roleSignoffs:{},gateReviews:{},governanceProfile:'default',filePath:f.file,content:f.render()}, [], {stepId:'s06',projectRoot:f.root});
 assert.match(errors.join('\n'),/task_breakdown/);
});
check('reference missing task is explicit', f=>{fs.writeFileSync(f.file,f.render());assert.throws(()=>resolve(f,'#Main Artifact.task_breakdown[T9].id'),e=>e.code==='ARTIFACT_REFERENCE_PATH_MISSING');});
for (const mode of ['light', 'strict']) check(`SDD ${mode} integration uses JSON Traceability`, f => {
  const path = require('path');
  const spec = path.join(f.root, 'product-specs/spec.md');
  let content = f.render().replace('planning_track: full', `planning_track: full\nsdd_mode: ${mode}\nspec_status: approved`);
  if (mode === 'light') {
    fs.writeFileSync(spec, ['---','spec_type: SPEC_CARD','spec_status: approved','spec_version: "1.0"','---',
      '## Requirements','```yaml','requirements:','  - id: REQ-001','    provenance: BASELINE','    cr_required: false','```',
      '## Acceptance Criteria','```yaml','acceptance_criteria:','  - id: AC-001','    requirement: REQ-001','```',
      '## Spec Freeze','```yaml','status: FROZEN','authority: ba','decided_at: "2026-10-30"','```'].join('\n'));
    content = content.replace('  srs:', '  card:');
  } else {
    fs.writeFileSync(spec, fs.readFileSync(spec,'utf8').replace('spec_type: SRS', 'spec_type: SRS\nspec_status: approved') + '\nSRS-FR-001\n');
    fs.writeFileSync(path.join(f.root,'product-specs/brd.md'), '---\nspec_type: BRD\nspec_status: approved\n---\nBRD-001\n');
    content = content.replace('spec_refs:', 'spec_refs:\n  brd: product-specs/brd.md');
  }
  fs.writeFileSync(f.file,content);
  const result=validateWorkflowSdd({workflowRoot:f.dir,projectRoot:f.root});
  assert.deepStrictEqual(result.errors,[]);
});
assert.deepStrictEqual(failures, [], failures.join('\n'));
console.log(`OK: ${count} versioned reader and legacy compatibility cases passed`);

})();
