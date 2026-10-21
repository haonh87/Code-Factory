const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const {validateRequest,ensure}=require('./validate-request');
const {sha}=require('./verify-upstream-provenance');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function wrap(text,width) {
  const rows=[]; let row='', used=0;
  for(const ch of Array.from(text)) {
    const cells=ch.codePointAt(0)>127?2:1;
    if(used+cells>width){rows.push(row);row='';used=0;}
    row+=ch;used+=cells;
  }
  if(row)rows.push(row);
  return rows.length?rows:[''];
}
function render(accepted,{columns=1}={}) {
  ensure(accepted.status==='ACCEPTED' && [1,2].includes(columns),'Invalid prepared request or layout');
  const {model,view,facts}=accepted.prepared;
  const width=columns===1?1000:1600, cardWidth=(width-64-(columns-1)*24)/columns;
  const lineWidth=Math.floor((cardWidth-32)/8.5);
  const heading=[
    'NON-CANONICAL PRESENTATION — '+accepted.presentation_artifact_id,
    'Canonical model: '+accepted.canonical_source_ref+' | view: '+accepted.canonical_view_ref,
    'Owner: '+accepted.render_owner+' | audience: '+accepted.audience_profile,
    'Question: '+accepted.declared_question,
    'Architecture state: '+model.architecture_state+' | canonical owner: '+view.render_owner
  ].concat(Object.entries(model).filter(([key])=>!['elements','relationships'].includes(key)).map(([key,value])=>`Model ${key}: ${typeof value==='string'?value:JSON.stringify(value)}`)).flatMap(x=>wrap(x,Math.floor((width-64)/8.5)));
  let y=32+heading.length*24+24;
  const blocks=[];
  for(let row=0;row<facts.length;row+=columns) {
    const cards=facts.slice(row,row+columns).map(fact=>({fact,lines:Object.entries(fact)
      .filter(([k])=>k!=='id').sort(([a],[b])=>a.localeCompare(b,'en'))
      .flatMap(([key,value])=>wrap(`${key}: ${Array.isArray(value)?JSON.stringify(value):value || '(unknown / not supplied)'}`,lineWidth))}));
    const height=Math.max(...cards.map(x=>x.lines.length))*23+60;
    cards.forEach(({fact,lines},col)=>{
      const x=32+col*(cardWidth+24);
      blocks.push(`<g data-source-fact-id="${escape(fact.id)}"><rect x="${x}" y="${y}" width="${cardWidth}" height="${height}" rx="12" fill="#f3f5f7" stroke="#697586"/><text x="${x+16}" y="${y+27}" font-weight="bold">${escape(fact.integration_id?'Directed relationship: '+fact.id:'System: '+fact.id)}</text>${lines.map((line,i)=>`<text x="${x+16}" y="${y+53+i*23}">${escape(line)}</text>`).join('')}</g>`);
    });
    y+=height+24;
  }
  const gaps=accepted.prepared.gaps || [];
  const gapLines=gaps.flatMap(g=>wrap('OPEN GAP: '+JSON.stringify(g),Math.floor((width-64)/8.5)));
  const gapBacking=gapLines.length?`<rect data-decoration="gap-background" x="16" y="${y}" width="${width-32}" height="${gapLines.length*23+32}" rx="12" fill="#ffffff"/>`:'';
  const gapText=gapLines.map((line,i)=>`<text x="32" y="${y+24+i*23}">${escape(line)}</text>`).join('');
  const height=y+gapLines.length*23+48;
  ensure(height<=16000,'Output exceeds safe canvas height; choose a smaller canonical view');
  const title='Non-canonical presentation: '+accepted.presentation_artifact_id;
  const description=`${accepted.declared_question} Canonical source ${accepted.canonical_source_ref}; view ${accepted.canonical_view_ref}; owner ${accepted.render_owner}.`;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description"><title id="title">${escape(title)}</title><desc id="description">${escape(description)}</desc><rect data-decoration="header-background" x="16" y="8" width="${width-32}" height="${heading.length*24+24}" rx="12" fill="#ffffff"/><g fill="#17212f" font-family="monospace" font-size="14">${heading.map((line,i)=>`<text x="32" y="${32+i*24}">${escape(line)}</text>`).join('')}${blocks.join('')}${gapBacking}${gapText}</g></svg>`;
  const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src 'none'; base-uri 'none'; form-action 'none'"><title>${escape(title)}</title><style>html,body{margin:0;background:transparent}svg{display:block;max-width:100%;height:auto}</style></head><body>${svg}</body></html>`;
  return {html,svg,width,height,columns};
}
function exportPresentation(request,context,layout={}) {
  let stage;
  try {
    const accepted=validateRequest(request,context);
    if(accepted.status!=='ACCEPTED')return accepted;
    const output=render(accepted,layout);
    const {validateOutput}=require('./validate-output');
    const validation=validateOutput(accepted,output);
    ensure(typeof context.png_python==='string'&&path.isAbsolute(context.png_python),'Explicit pre-provisioned Python path required');
    ensure(typeof context.browser_path==='string'&&path.isAbsolute(context.browser_path),'Explicit pre-provisioned browser cache required');
    const destination=accepted.prepared.destination;
    stage=fs.mkdtempSync(path.join(path.dirname(destination),'.diagram-stage-'));
    fs.writeFileSync(path.join(stage,'index.html'),output.html,{flag:'wx'});
    fs.writeFileSync(path.join(stage,'presentation.svg'),output.svg,{flag:'wx'});
    const result=cp.spawnSync(context.png_python,[path.join(__dirname,'export-png.py'),path.join(stage,'index.html'),path.join(stage,'presentation.png'),String(output.width),String(output.height)],{
      encoding:'utf8',timeout:60000,maxBuffer:1024*1024,
      env:{...process.env,PLAYWRIGHT_BROWSERS_PATH:context.browser_path,PYTHONNOUSERSITE:'1',PYTHONPATH:''}
    });
    ensure(!result.error && result.status===0,'PNG export failed: '+(result.error?.message||result.stderr||'browser failure').trim());
    const png=fs.readFileSync(path.join(stage,'presentation.png'));
    ensure(png.length>100 && png.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),'Invalid PNG output');
    ensure(png.readUInt32BE(16)===output.width && png.readUInt32BE(20)===output.height && png[25]===6,'PNG dimensions/transparency mismatch');
    const browserEvidence=JSON.parse(result.stdout);
    const {prepared,...envelope}=accepted;
    const manifest={...envelope,status:'ACCEPTED',validation,browser_evidence:browserEvidence,layout:{columns:output.columns},canonical_hashes:prepared.source_hashes,
      output_refs:['index.html','presentation.svg','presentation.png'].map(n=>`${request.destination_ref}/${n}`),
      validation_evidence_refs:[`${request.destination_ref}/manifest.json`],
      output_hashes:Object.fromEntries(['index.html','presentation.svg','presentation.png'].map(n=>[n,sha(fs.readFileSync(path.join(stage,n)))]))};
    fs.writeFileSync(path.join(stage,'manifest.json'),JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});
    // Revalidate paths, provenance and canonical bytes immediately before publication.
    const fresh=validateRequest(request,context);ensure(fresh.status==='ACCEPTED','Input changed before publication');
    ensure(JSON.stringify(fresh.prepared.source_hashes)===JSON.stringify(prepared.source_hashes),'Canonical input changed before publication');
    validateOutput(fresh,{...output,html:fs.readFileSync(path.join(stage,'index.html'),'utf8'),svg:fs.readFileSync(path.join(stage,'presentation.svg'),'utf8')});
    ensure(!fs.existsSync(destination),'Destination appeared before publication');
    fs.renameSync(stage,destination); stage=undefined;
    return manifest;
  } catch(error) {return {status:'REJECTED',rejection_reasons:[error.message],blocking_input_refs:[request?.destination_ref].filter(Boolean),output_refs:[],validation_evidence_refs:[]};}
  finally { if(stage)fs.rmSync(stage,{recursive:true,force:true}); }
}
module.exports={render,exportPresentation};
if(require.main===module) {
 try {const result=exportPresentation(JSON.parse(fs.readFileSync(process.argv[2],'utf8')),JSON.parse(fs.readFileSync(process.argv[3],'utf8')));console.log(JSON.stringify(result,null,2));if(result.status==='REJECTED')process.exitCode=1;}
 catch(error){console.error(error.message);process.exitCode=1;}
}
