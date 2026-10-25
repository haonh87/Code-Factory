const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const frozenReleaseDigests = {
  "docs/releases/workflow-bundle-v2.6.4.md": "32f2ba37279141ae0e8aae8ca7e53414481ae4d7bbd06adb5c133475f99843b4",
  "docs/releases/workflow-bundle-v2.6.3.md": "de44ac6adf73f775b4f1507c5bc2028aa6cf815a931c70c0386f87ff015349af",
  "docs/releases/workflow-bundle-v2.6.2.md": "761a67c18b894f398d2b4c17d0b80d6a9fc7ab1e7fff250494212d1a5bc67769",
  "docs/releases/workflow-bundle-v2.6.1.md": "e5fd05b23ce86184309429e5ad7228cb618c008da215ed96424aff0e59bd6d2d",
  "docs/releases/workflow-bundle-v2.6.0.md": "12e2e49d61d7145a71e12eaf6c2c82e7fcdc46d349ce16716daa9b858dc45151",
  "docs/releases/workflow-bundle-v2.5.0.md": "ff383e19db45d43888627c46a332aba85f24aca45eb3edb6e4d3f1cae7b3da4d",
  "docs/releases/workflow-bundle-v2.4.0.md": "2b84621cccae1e0126287d9de48fa425dada7fd833b92d722fac33e2c15755a5",
  "docs/releases/workflow-bundle-v2.3.2.md": "476b3804e3fb901feb0ede4f817c31475072b1c578de4bdeab8c2d2a10fed98d",
  "docs/releases/workflow-bundle-v2.3.1.md": "8017d38477643d0a9e5eece0299c9595653cc67128ed6505e0ca2cd0d6c1d050",
  "docs/releases/workflow-bundle-v2.3.0.md": "299b4cedd5fcb0fbd9fdf3dd97f17f057e279e6f7904fcf6ef4f617e7185f9a5",
  "docs/releases/workflow-bundle-v2.2.1.md": "a9dccebb33a2b8e63516c59afd98d8f7fb8ec0a2281cb9a2c9aba63f0edccee1",
  "docs/releases/workflow-bundle-v2.2.0.md": "887b53947eba084b8ed17dae326d8c4be21238f80bb22a9a0b2b5266db1da97e",
  "docs/releases/workflow-bundle-v2.0.2.md": "3bad363ef358875311dd67bb29e95704cc88f7458e3903abe2cbf7bf10bc27a4",
  "docs/releases/workflow-bundle-v2.0.1.md": "fc4bb384e41db5588db47bcd76eb81c4ff82ada9e3344dfe22bb7a3093b11a9e",
  "docs/releases/workflow-bundle-v2.0.0.md": "2305427a8a6aea5e54c046ac3951fcc8a5b93ac5c2201d548b2b8e7d94e317c8"
};
const installerDigests = {
  "adapters/codex/install-codex-workflow.sh": "20e54a10ef2e3fdadda39623913dd3bec8367a1249bc4207eef35e82a4438ce5",
  "adapters/codex/install-codex-workflow.ps1": "859c41118ae1a9c3e8d0bf6154e7d00083a999dae08eb81b0eb60f818f475afa"
};
for(const [p,h] of Object.entries({...frozenReleaseDigests,...installerDigests}))assert.equal(sha(p),h,'Historical/installer drift: '+p);
for(const p of ['workflow-bundle.manifest.json','packages/workflow-bundle/workflow-bundle.manifest.json'])assert.equal(JSON.parse(read(p)).bundleVersion,'2.7.0');
assert.equal(JSON.parse(read('packages/workflow-bundle/package.json')).version,'2.7.0');
assert(read('packages/workflow-bundle/bin/wfc.js').includes('Public v2.7.0 Flow:'));
const docs=['README.md','README.vi.md','packages/workflow-bundle/README.md','packages/workflow-bundle/README.vi.md','.claude/CLAUDE.md','docs/publish-surface.md','docs/publish-surface.vi.md','docs/workflow-docs-map.md','docs/workflow-docs-map.vi.md','docs/workflow-bundle-quickstart.md','docs/workflow-bundle-quickstart.vi.md'];
for(const p of docs){
 const s=read(p);assert(s.includes('v2.7.0'),p+' candidate identity');
 assert(!s.includes('prepared release candidate is `workflow-bundle v2.6.4`'),p+' stale candidate');
 assert(!s.includes('prepared for the `v2.6.4` release candidate'),p+' stale package candidate');
 assert(!s.includes('`v2.7.0` is the current public release'),p+' premature publication claim');
}
for(const p of ['README.md','packages/workflow-bundle/README.md']){
 const s=read(p);assert(s.includes('diagram-design-presentation-adapter'));assert(s.includes('unpublished'));assert(s.includes('2.6.4'));assert(s.includes('43 managed skills'));
}
for(const mode of ['codex','claude']){
 const runtime=path.join(root,'packages/workflow-bundle/runtime',mode,'skills');
 const files=[];const walk=d=>fs.readdirSync(d,{withFileTypes:true}).forEach(e=>e.isDirectory()?walk(path.join(d,e.name)):e.name==='SKILL.md'&&files.push(path.join(d,e.name)));walk(runtime);assert.equal(files.length,43);
 assert(fs.existsSync(path.join(runtime,'architecture/diagram-design-presentation-adapter/SKILL.md')));
}
const note=read('docs/releases/workflow-bundle-v2.7.0.md');
for(const term of ['Status: **PUBLISHED on GitHub**','CHANGE-005','43 managed skills','HTML','SVG','PNG','## Compatibility','## Known Limitations','## Verification','## Rollback','## Release Gates','READER-TASK-001','9d7c5395ff5fb3ae2a64d26089a2c4c62122fb769a7cacd2e3bcea3f6fa35e84'])assert(note.includes(term),'Release record missing '+term);
assert(!/\bTODO\b|\bTBD\b/.test(note));
console.log('PASS: v2.7.0 publication record, 43-skill inventory, frozen package snapshot and immutable history/installers.');
