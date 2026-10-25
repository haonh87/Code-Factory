const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const skill = path.resolve(__dirname, '../../../skills/architecture/diagram-design-presentation-adapter');
const fixtures = path.join(__dirname, 'fixtures/diagram-design-presentation-adapter');
assert(fs.existsSync(path.join(skill, 'scripts/validate-request.js')), 'Request validator is required');
const { validateRequest } = require(path.join(skill, 'scripts/validate-request.js'));
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'diagram-request-'));
try {
  fs.cpSync(path.join(fixtures, 'models'), path.join(root, 'models'), {recursive:true});
  fs.mkdirSync(path.join(root, 'out'));
  const request = JSON.parse(fs.readFileSync(path.join(fixtures,'requests/accepted.json')));
  const context = { project_root:root, write_roots:['out'], change004_verified:true };
  assert.equal(validateRequest(request,context).status, 'ACCEPTED');
  for (const role of ['SA','TA']) for (const audience of ['AUD-BUSINESS','AUD-ENGINEERING'])
    assert.equal(validateRequest({...request,requesting_role:role,audience_profile:audience},context).status,'ACCEPTED');
  const negatives = [
    ['missing model',{canonical_model_ref:'missing.json'}],
    ['missing view',{canonical_view_ref:'missing.json'}],
    ['empty facts',{source_fact_ids:[]}],
    ['unknown fact',{source_fact_ids:['invented']}],
    ['incomplete facts',{source_fact_ids:['store']}],
    ['duplicate facts',{source_fact_ids:['store','erp','orders','store']}],
    ['missing identity',{presentation_artifact_id:''}],
    ['canonical identity',{presentation_artifact_id:'store-baseline'}],
    ['duplicate owner',{render_owner:['diagram-design-presentation-adapter','architecture-modeling']}],
    ['canonical owner',{render_owner:'architecture-modeling'}],
    ['scope escape',{destination_ref:'../outside'}],
    ['canonical collision',{destination_ref:'models/model.json'}],
    ['unsupported format',{requested_formats:['HTML','PDF']}],
    ['partial format set',{requested_formats:['HTML']}],
    ['invented content',{content:'Invent new architecture'}],
    ['remote instructions',{url:'https://example.invalid'}],
    ['active content',{html:'<script>alert(1)</script>'}],
    ['dependency override',{dependency_commit:'latest'}]
  ];
  for (const [label,delta] of negatives) {
    const result=validateRequest({...request,...delta},context);
    assert.equal(result.status,'REJECTED',label);
    assert(result.rejection_reasons.length,label);
    assert.deepEqual(result.output_refs,[],label);
    assert.deepEqual(fs.readdirSync(path.join(root,'out')),[],label);
  }
  const modelFile=path.join(root,'models/model.json'), modelBytes=fs.readFileSync(modelFile);
  const doc=JSON.parse(modelBytes);
  doc.architecture_model.elements[0].responsibility='Capture\u202Eorders';
  fs.writeFileSync(modelFile,JSON.stringify(doc));
  assert.equal(validateRequest(request,context).status,'REJECTED','Bidi controls must not obscure canonical labels');
  fs.writeFileSync(modelFile,modelBytes);
  for(const bad of ['\ufffe','\ud800'])assert.equal(validateRequest({...request,declared_question:bad},context).status,'REJECTED','Invalid Unicode rejected');
  assert.equal(validateRequest(request,{...context,change004_verified:false}).status,'REJECTED');
  assert.equal(validateRequest(request,{...context,write_roots:[]}).status,'REJECTED');
  fs.symlinkSync(path.join(root,'models'),path.join(root,'out/link'));
  assert.equal(validateRequest({...request,destination_ref:'out/link/new'},context).status,'REJECTED');
  for (const file of ['SKILL.md','SKILL.vi.md','agents/openai.yaml','references/request-result-contract.md','references/request-result-contract.vi.md'])
    assert(fs.existsSync(path.join(skill,file)),file);
} finally { fs.rmSync(root,{recursive:true,force:true}); }
console.log('PASS: four role/audience profiles and fail-closed request cases.');
