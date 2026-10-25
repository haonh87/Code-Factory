const fs = require('node:fs'), path = require('node:path');
const { verify, sha } = require('./verify-upstream-provenance');
const OWNER = 'diagram-design-presentation-adapter';
const fields = ['requesting_role','audience_profile','declared_question','canonical_model_ref','canonical_view_ref','source_fact_ids','destination_ref','requested_formats','presentation_artifact_id','render_owner'];
function ensure(value, reason) { if (!value) throw new Error(reason); }
function text(value) { return typeof value === 'string' && value.trim().length > 0 && value.length <= 4096 && Buffer.from(value,'utf8').toString('utf8')===value && !/[\x00-\x1f\x7f\u202a-\u202e\u2066-\u2069\ufffe\uffff]/.test(value); }
function inside(root, target) { const rel=path.relative(root,target); return rel==='' || (!rel.startsWith('..'+path.sep) && rel!=='..' && !path.isAbsolute(rel)); }
function safePath(root, ref) {
  ensure(text(ref) && !path.isAbsolute(ref) && !ref.includes('\\') && !ref.includes(':') && !ref.split('/').some(x=>['','..','.'].includes(x)), 'Invalid local path');
  const result=path.resolve(root,ref); ensure(inside(root,result),'Path outside project');
  let current=root;
  ensure(!fs.lstatSync(root).isSymbolicLink(),'Project root is a symlink');
  for(const part of ref.split('/')) { current=path.join(current,part); if(fs.existsSync(current)) ensure(!fs.lstatSync(current).isSymbolicLink(),'Symlink path forbidden'); else { try { fs.lstatSync(current); throw new Error('Dangling symlink forbidden'); } catch(e) { if(e.code!=='ENOENT') throw e; } } }
  return result;
}
function safeValues(value,depth=0) {
  ensure(depth<=12,'Canonical nesting too deep');
  if(typeof value==='string')ensure(value===''||text(value),'Unsafe canonical text');
  else if(Array.isArray(value))value.forEach(v=>safeValues(v,depth+1));
  else if(value && typeof value==='object')for(const [key,v] of Object.entries(value)){ensure(text(key),'Unsafe canonical key');safeValues(v,depth+1);}
  else ensure(value===null || typeof value==='boolean' || typeof value==='number','Invalid canonical value');
}
function readJson(file) { ensure(fs.statSync(file).size<=2*1024*1024,'Input too large'); return JSON.parse(fs.readFileSync(file,'utf8')); }
function validateRequest(request, context) {
  try {
    ensure(request && typeof request==='object' && !Array.isArray(request),'Request must be an object');
    ensure(Object.keys(request).every(x=>fields.includes(x)), 'Unknown request field; content, URL and dependency overrides forbidden');
    ensure(fields.every(x=>Object.hasOwn(request,x)), 'Required request field missing');
    ensure(['SA','TA'].includes(request.requesting_role),'Invalid requesting role');
    ensure(['AUD-BUSINESS','AUD-ENGINEERING'].includes(request.audience_profile),'Invalid audience');
    ensure(text(request.declared_question),'Declared question required');
    ensure(typeof request.presentation_artifact_id==='string' && /^[a-zA-Z][a-zA-Z0-9._-]{0,95}$/.test(request.presentation_artifact_id),'Invalid presentation ID');
    ensure(request.render_owner===OWNER,'Exactly one presentation owner required');
    ensure(Array.isArray(request.requested_formats) && request.requested_formats.length===3 && ['HTML','SVG','PNG'].every(x=>request.requested_formats.includes(x)),'Complete HTML/SVG/PNG format set required');
    ensure(context && context.change004_verified===true,'CHANGE-004 baseline must be verified by the caller');
    ensure(Array.isArray(context.write_roots) && context.write_roots.length,'Explicit write roots required');
    const root=path.resolve(context.project_root);
    const modelPath=safePath(root,request.canonical_model_ref), viewPath=safePath(root,request.canonical_view_ref);
    const doc=readJson(modelPath), model=doc.architecture_model, view=readJson(viewPath);
    safeValues(doc); safeValues(view);
    ensure(model && text(model.model_id) && text(model.model_source) && ['baseline','transition','target','vision'].includes(model.architecture_state),'Canonical model missing or invalid');
    ensure(['ARCHITECTURE_YAML','STRUCTURIZR_DSL'].includes(model.model_format),'Unsupported canonical model projection');
    ensure(text(view.view_id) && text(view.render_owner) && view.render_owner!==OWNER,'Canonical view ownership unresolved');
    ensure(['DRAWIO','MERMAID','STRUCTURIZR_DSL'].includes(view.render_format),'Canonical routing unresolved');
    const canonical=safePath(root,view.artifact_path); ensure(fs.statSync(canonical).isFile(),'Canonical artifact missing');
    ensure(Array.isArray(model.elements) && Array.isArray(model.relationships),'Canonical facts missing');
    const all=[...model.elements.map(x=>({...x,id:x.system_id})),...model.relationships.map(x=>({...x,id:x.integration_id}))];
    ensure(all.length>0 && all.length<=100 && all.every(x=>text(x.id)) && new Set(all.map(x=>x.id)).size===all.length,'Invalid or duplicate fact identity');
    for(const fact of all) {
      ensure(Object.values(fact).every(v=>(typeof v==='string' && (v===''||text(v))) || (Array.isArray(v)&&v.every(text))),'Facts must contain safe text or text arrays');
      ensure(Object.entries(fact).every(([k,v])=>text(k)&&String(v).length<=4096),'Fact field too large');
      ensure(['CONFIRMED','INFERRED','OPEN'].includes(fact.evidence_state),'Fact evidence state missing');
    }
    for(const rel of model.relationships) ensure(rel.direction==='DIRECTED' && model.elements.some(x=>x.system_id===rel.from_system_id) && model.elements.some(x=>x.system_id===rel.to_system_id),'Invalid relationship endpoints or direction');
    ensure(!doc.gaps || Array.isArray(doc.gaps),'Invalid gaps');
    ensure(!doc.gaps?.some(x=>['BLOCK_MODEL','BLOCK_RENDER'].includes(x.effect)),'Canonical validation has a blocking gap');
    const ids=request.source_fact_ids, expected=view.source_fact_ids;
    ensure(Array.isArray(ids) && ids.length>0 && ids.every(text) && new Set(ids).size===ids.length,'Facts empty, missing or duplicated');
    ensure(Array.isArray(expected) && new Set(expected).size===expected.length && expected.length===ids.length && expected.every(x=>ids.includes(x)),'Incomplete canonical view fact set');
    ensure(ids.every(x=>all.some(f=>f.id===x)),'Unknown source fact');
    const facts=ids.map(id=>all.find(f=>f.id===id));
    ensure(facts.filter(x=>x.integration_id).every(x=>ids.includes(x.from_system_id)&&ids.includes(x.to_system_id)),'Relationship endpoint omitted');
    ensure(![model.model_id,view.view_id,...all.map(x=>x.id)].includes(request.presentation_artifact_id),'Presentation identity collides with canonical identity');
    const destination=safePath(root,request.destination_ref);
    const roots=context.write_roots.map(x=>safePath(root,x));
    ensure(roots.some(x=>inside(x,destination) && x!==destination),'Destination outside granted scope');
    ensure(![modelPath,viewPath,canonical].some(x=>inside(destination,x)||inside(x,destination)),'Destination collides with canonical artifact');
    ensure(!fs.existsSync(destination),'Destination exists; overwrite forbidden');
    ensure(fs.statSync(path.dirname(destination)).isDirectory(),'Destination parent must already exist');
    const provenance=verify();
    return {status:'ACCEPTED',presentation_artifact_id:request.presentation_artifact_id,render_owner:OWNER,
      canonical_source_ref:request.canonical_model_ref,canonical_view_ref:request.canonical_view_ref,
      audience_profile:request.audience_profile,declared_question:request.declared_question,source_fact_ids:[...ids],
      output_refs:[],validation_evidence_refs:[],provenance,
      prepared:{root,destination,model,view,facts,gaps:doc.gaps||[],source_hashes:Object.fromEntries([modelPath,viewPath,canonical].map(x=>[path.relative(root,x),sha(fs.readFileSync(x))]))}};
  } catch(error) { return {status:'REJECTED',rejection_reasons:[error.message],blocking_input_refs:[request?.canonical_model_ref,request?.canonical_view_ref,request?.destination_ref].filter(x=>typeof x==='string'),output_refs:[],validation_evidence_refs:[]}; }
}
module.exports={validateRequest,safePath,inside,ensure,OWNER};
if(require.main===module) {
  try { const result=validateRequest(readJson(process.argv[2]),readJson(process.argv[3])); const {prepared,...publicResult}=result; console.log(JSON.stringify(publicResult,null,2)); if(result.status==='REJECTED')process.exitCode=1; }
  catch(error){console.error(error.message);process.exitCode=1;}
}
