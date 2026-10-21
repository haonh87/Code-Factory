const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const skill=path.resolve(__dirname,'../../../skills/architecture/diagram-design-presentation-adapter');
assert(fs.existsSync(path.join(skill,'scripts/export-svg.js')),'Atomic exporter required');
const {render,exportPresentation}=require(path.join(skill,'scripts/export-svg.js'));
const {validateRequest}=require(path.join(skill,'scripts/validate-request.js'));
const {validateOutput}=require(path.join(skill,'scripts/validate-output.js'));
const fixture=path.join(__dirname,'fixtures/diagram-design-presentation-adapter');
function pixelAlpha(png,x,y) {
 const zlib=require('node:zlib'), chunks=[];
 const width=png.readUInt32BE(16), height=png.readUInt32BE(20), stride=width*4;
 assert.equal(png[24],8);assert.equal(png[25],6);assert.equal(png[28],0);
 for(let offset=8;offset<png.length;){const size=png.readUInt32BE(offset);if(png.toString('ascii',offset+4,offset+8)==='IDAT')chunks.push(png.subarray(offset+8,offset+8+size));offset+=size+12;}
 const raw=zlib.inflateSync(Buffer.concat(chunks));let prior=Buffer.alloc(stride);
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
 for(let row=0;row<height;row++){
  const start=row*(stride+1),filter=raw[start],decoded=Buffer.alloc(stride);
  assert(filter<=4);
  for(let i=0;i<stride;i++){const a=i>=4?decoded[i-4]:0,b=prior[i],c=i>=4?prior[i-4]:0;decoded[i]=(raw[start+1+i]+[0,a,b,Math.floor((a+b)/2),paeth(a,b,c)][filter])&255;}
  if(row===y)return decoded[x*4+3];prior=decoded;
 }
 throw new Error('Pixel outside PNG');
}
const root=fs.mkdtempSync(path.join(os.tmpdir(),'diagram-output-'));
try {
 fs.cpSync(path.join(fixture,'models'),path.join(root,'models'),{recursive:true});fs.mkdirSync(path.join(root,'out'));
 const request=JSON.parse(fs.readFileSync(path.join(fixture,'requests/accepted.json')));
 const context={project_root:root,write_roots:['out'],change004_verified:true};
 const accepted=validateRequest(request,context);assert.equal(accepted.status,'ACCEPTED');
 accepted.prepared.model.constraints=['Retain orders for seven days'];
 assert(render(accepted).svg.includes('Retain orders for seven days'),'Model constraints must remain visible');
 delete accepted.prepared.model.constraints;
 const originals=Object.fromEntries(fs.readdirSync(path.join(root,'models')).map(n=>[n,fs.readFileSync(path.join(root,'models',n))]));
 for(const columns of [1,2]) {
   const output=render(accepted,{columns});
   assert.equal(validateOutput(accepted,output).status,'PASS');
   assert(output.svg.includes('data-decoration="header-background"'),'Header must have its own opaque backing on transparent exports');
   assert(output.svg.includes('data-source-fact-id="orders"'));
   for(const replace of [
     s=>s.replace('Submit orders','Invented purpose'),
     s=>s.replace('from_system_id: store','from_system_id: erp'),
     s=>s.replace('data-source-fact-id="orders"','data-source-fact-id="merged"'),
     s=>s.replace('<title id="title">','<title id="removed">'),
     s=>s.replace('</svg>','<script>alert(1)</script></svg>'),
     s=>s.replace('</svg>','<image href="https://example.invalid/x"/></svg>'),
     s=>s.replace('<svg ','<svg onload="alert(1)" '),
     s=>s.replace('</svg>','<foreignObject>active</foreignObject></svg>')
   ]) assert.throws(()=>validateOutput(accepted,{...output,svg:replace(output.svg)}),/output|semantic|static|accessible/i);
   assert.throws(()=>validateOutput(accepted,{...output,html:output.html.replace('</body>','<script>active</script></body>')}),/output|static/i);
 }
 const missing=exportPresentation(request,{...context,png_python:'/nonexistent/python',browser_path:'/nonexistent/browser'});
 assert.equal(missing.status,'REJECTED');assert.deepEqual(fs.readdirSync(path.join(root,'out')),[]);
 const failed=exportPresentation(request,{...context,png_python:process.execPath,browser_path:'/nonexistent/browser'});
 assert.equal(failed.status,'REJECTED');assert.deepEqual(fs.readdirSync(path.join(root,'out')),[]);
 if(process.env.DIAGRAM_PNG_PYTHON && process.env.PLAYWRIGHT_BROWSERS_PATH) {
   const result=exportPresentation(request,{...context,png_python:process.env.DIAGRAM_PNG_PYTHON,browser_path:process.env.PLAYWRIGHT_BROWSERS_PATH});
   assert.equal(result.status,'ACCEPTED',JSON.stringify(result));
   const originalRename=fs.renameSync;
   try {
     fs.renameSync=()=>{throw new Error('Forced publication failure');};
     const rejected=exportPresentation({...request,destination_ref:'out/move-failure'},{...context,png_python:process.env.DIAGRAM_PNG_PYTHON,browser_path:process.env.PLAYWRIGHT_BROWSERS_PATH});
     assert.equal(rejected.status,'REJECTED');
     assert(rejected.rejection_reasons[0].includes('Forced publication failure'));
     assert.deepEqual(fs.readdirSync(path.join(root,'out')),['presentation']);
   } finally { fs.renameSync=originalRename; }
   const noBrowser=exportPresentation({...request,destination_ref:'out/browser-failure'},{...context,png_python:process.env.DIAGRAM_PNG_PYTHON,browser_path:path.join(root,'missing-browser')});
   assert.equal(noBrowser.status,'REJECTED');
   assert.deepEqual(fs.readdirSync(path.join(root,'out')),['presentation']);

   assert.deepEqual(fs.readdirSync(path.join(root,'out/presentation')).sort(),['index.html','manifest.json','presentation.png','presentation.svg']);
   const png=fs.readFileSync(path.join(root,'out/presentation/presentation.png'));
   assert.equal(png.subarray(1,4).toString(),'PNG');assert.equal(png[25],6);
   assert.equal(pixelAlpha(png,0,0),0,'PNG margin remains transparent');
   assert.equal(pixelAlpha(png,24,24),255,'Header remains opaque on dark/transparent hosts');
   assert.equal(result.validation.fact_coverage,1);assert.equal(result.validation.semantic_diff_count,0);
   assert.equal(exportPresentation(request,{...context,png_python:process.env.DIAGRAM_PNG_PYTHON,browser_path:process.env.PLAYWRIGHT_BROWSERS_PATH}).status,'REJECTED');
   console.log('PASS: actual pinned browser export, transparent PNG, complete inventory and collision protection.');
 } else console.log('Positive PNG integration not run: set DIAGRAM_PNG_PYTHON and PLAYWRIGHT_BROWSERS_PATH to the pre-provisioned tuple.');
 for(const [n,b] of Object.entries(originals))assert.deepEqual(fs.readFileSync(path.join(root,'models',n)),b);
} finally {fs.rmSync(root,{recursive:true,force:true});}
console.log('PASS: semantics, two layouts, static security, accessibility, missing-tool failure and canonical preservation.');
