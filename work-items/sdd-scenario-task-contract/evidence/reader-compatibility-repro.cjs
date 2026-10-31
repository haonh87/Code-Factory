const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {getFinalizedStepSemanticEvidenceErrors, resolveArtifactReference} = require('../../../packages/workflow-bundle/scripts/workflow-gate-evidence-utils');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sdd-v1-reader-repro-'));
const note = path.join(root, 'probe.s06.task-breakdown.md');
const main = {implementation_goal: 'Validate a bounded task graph', task_breakdown: [{
  id: 'T1', owner_role: 'developer', name: 'Reject duplicate task IDs',
  objective: 'Reject duplicate task IDs without changing legacy plans', kind: 'behavior',
  paths_in_scope: ['src/validator.js', 'test/validator.test.js'], dependencies: [],
  outputs_expected: ['Duplicate-ID diagnostics'], review_checkpoint: 'Spec then code quality',
  verification_hint: 'Run focused duplicate-ID and legacy regression cases',
  verification: {cwd: '.', argv: ['node', 'test/validator.test.js'], test_refs: ['test/validator.test.js']}
}]};
const json = '---\ntask_contract_version: 1\n---\n\n## Main Artifact\n```json\n'+JSON.stringify(main,null,2)+'\n```\n\n## Traceability\n```json\n'+JSON.stringify({acceptance_refs:['AC-001'],task_refs:[{acceptance_ref:'AC-001',task_ids:['T1']}]},null,2)+'\n```\n';
const yaml = '---\n---\n\n## Main Artifact\n```yaml\ntask_breakdown:\n  - id: T1\n    verification_hint: "Run focused duplicate-ID and legacy regression cases"\n```\n';
try {
 const legacy = getFinalizedStepSemanticEvidenceErrors({stepId:'s06',content:yaml,filePath:note});
 const versioned = getFinalizedStepSemanticEvidenceErrors({stepId:'s06',content:json,filePath:note});
 assert.deepEqual(legacy, []);
 assert(versioned.some(e=>e.includes('Main Artifact.tasks must be a non-empty evidence list')));
 fs.writeFileSync(note,yaml);
 assert.equal(resolveArtifactReference({projectRoot:root,currentFile:note,reference:'#Main Artifact.task_breakdown[T1].id'}).value,'T1');
 fs.writeFileSync(note,json);
 let referenceError;
 try {resolveArtifactReference({projectRoot:root,currentFile:note,reference:'#Main Artifact.task_breakdown[T1].id'});}catch(e){referenceError={code:e.code,message:e.message};}
 assert.equal(referenceError?.code,'ARTIFACT_REFERENCE_YAML_MISSING');
 console.log(JSON.stringify({result:'REPRODUCED',legacy_semantic_errors:legacy,versioned_semantic_errors:versioned,versioned_reference_error:referenceError,source_changed:false},null,2));
} finally {fs.rmSync(root,{recursive:true,force:true});}
