const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { validateWorkflowPlanning } = require('../scripts/validate-workflow-planning');

function task(id = 'T1') {
  return { id, owner_role: 'developer', name: 'Reject duplicate events',
    objective: 'Preserve the first accepted event', kind: 'behavior',
    paths_in_scope: ['src/events.js', 'test/events.test.js'], dependencies: [],
    outputs_expected: ['Duplicate event regression passes'], review_checkpoint: 'Review AC-001 then code quality',
    verification_hint: 'Run the duplicate-event regression',
    verification: { cwd: '.', argv: ['node', 'test/events.test.js'], test_refs: ['test/events.test.js'] } };
}
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'task-contract-'));
  const dir = path.join(root, 'work-items', 'sample');
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(path.join(root, 'product-specs'), { recursive: true });
  fs.writeFileSync(path.join(root, 'product-specs/spec.md'), '---\nspec_type: SRS\n---\n## Acceptance Criteria\n```yaml\nacceptance_criteria:\n  - id: AC-001\n    description: Preserve first event\n  - id: AC-002\n    description: Report malformed event\n```\n');
  const f = { root, dir, file: path.join(dir, 'sample.s06.task-breakdown.md'),
    version: '1', main: { implementation_goal: 'Make duplicate event processing deterministic', task_breakdown: [task()] },
    trace: { acceptance_refs: ['AC-001'], task_refs: [{ acceptance_ref: 'AC-001', task_ids: ['T1'] }] } };
  f.render = () => ['---', 'artifact_family: workflow-step', 'artifact_role: primary', 'planning_track: full',
    'step_id: s06', ...(f.version === undefined ? [] : [`task_contract_version: ${f.version}`]),
    'spec_refs:', '  srs: product-specs/spec.md', '---', '## Main Artifact', '```json',
    JSON.stringify(f.main, null, 2), '```', '## Traceability', '```json', JSON.stringify(f.trace, null, 2), '```', ''].join('\n');
  f.check = (text = f.render()) => { fs.writeFileSync(f.file, text); return validateWorkflowPlanning({ workflowRoot: f.dir, projectRoot: root }); };
  return f;
}
let count = 0;
const failures = [];
function check(name, mutate, pattern) {
  const f = fixture();
  try {
    const text = mutate ? mutate(f) : undefined;
    const result = f.check(text);
    assert.strictEqual(result.ok, !pattern, `${name}: ${JSON.stringify(result.errors)}`);
    if (pattern) assert.match(result.errors.join('\n'), pattern, name);
    count++;
  } catch (error) { failures.push(`${name}: ${error.message}`); }
  finally { fs.rmSync(f.root, { recursive: true, force: true }); }
}
function run() {
  check('valid v1');
  check('legacy ignores new payload', f => { f.version = undefined; f.main = null; });
  for (const version of ['2', '"1"', "'1'", 'null', 'true', '', '[]', '1.0'])
    check(`invalid version ${version}`, f => { f.version = version; }, /task_contract_version/);
  check('duplicate version', f => f.render().replace('task_contract_version: 1', 'task_contract_version: 1\ntask_contract_version: 1'), /task_contract_version/);
  check('malformed JSON', f => f.render().replace('"implementation_goal":', '"implementation_goal"'), /Main Artifact.*JSON/);
  check('duplicate decoded JSON key', f => f.render().replace('"id": "T1",', '"id": "T1", "\\u0069d": "T2",'), /duplicate.*id/i);
  check('duplicate owner heading', f => f.render() + '\n## Main Artifact\n```json\n{}\n```\n', /Main Artifact.*owner/);
  check('two owner fences', f => f.render().replace('## Traceability', '```yaml\ntask_breakdown: []\n```\n## Traceability'), /Main Artifact.*one/);
  check('null main', f => { f.main = null; }, /Main Artifact.*object/);
  check('empty task list', f => { f.main.task_breakdown = []; }, /task_breakdown/);
  check('wrong field type', f => { f.main.task_breakdown[0].objective = []; }, /T1.*objective/);
  check('placeholder objective', f => { f.main.task_breakdown[0].objective = 'handle edge case'; }, /T1.*objective/);
  check('duplicate task ID', f => { f.main.task_breakdown.push(task()); }, /duplicate.*T1/i);
  check('unknown dependency', f => { f.main.task_breakdown[0].dependencies = ['T9']; }, /T1.*dependencies.*T9/);
  check('self dependency', f => { f.main.task_breakdown[0].dependencies = ['T1']; }, /T1.*dependencies.*self/);
  check('duplicate dependency', f => { f.main.task_breakdown.push(task('T2')); f.main.task_breakdown[0].dependencies = ['T2', 'T2']; }, /dependencies.*duplicate/);
  check('cycle', f => { f.main.task_breakdown.push(task('T2')); f.main.task_breakdown[0].dependencies = ['T2']; f.main.task_breakdown[1].dependencies = ['T1']; }, /cycle/);
  check('DAG', f => { f.main.task_breakdown.push(task('T2')); f.main.task_breakdown[1].dependencies = ['T1']; });
  for (const scope of ['', '.', '..', '../out.js', '/tmp/a.js', 'C:/a.js', 'C:a.js', '\\\\server/share.js', 'src/*.js', 'src/../a.js', 'src//a.js', 'TODO'])
    check(`invalid scope ${scope}`, f => { f.main.task_breakdown[0].paths_in_scope = [scope]; }, /paths_in_scope/);
  check('directory is not file grant', f => { f.main.task_breakdown[0].paths_in_scope = ['product-specs']; }, /paths_in_scope/);
  check('planned leaf file', f => { f.main.task_breakdown[0].paths_in_scope.push('new/nested/planned.js'); });
  check('symlink escape', f => { fs.symlinkSync(os.tmpdir(), path.join(f.root, 'outside')); f.main.task_breakdown[0].paths_in_scope.push('outside/planned.js'); }, /paths_in_scope.*escape/);
  check('broken symlink fails closed', f => { fs.symlinkSync('missing', path.join(f.root, 'broken')); f.main.task_breakdown[0].paths_in_scope.push('broken/planned.js'); }, /paths_in_scope/);
  check('invalid kind', f => { f.main.task_breakdown[0].kind = 'other'; }, /kind/);
  check('missing verification', f => { delete f.main.task_breakdown[0].verification; }, /verification/);
  check('bad cwd', f => { f.main.task_breakdown[0].verification.cwd = '../'; }, /cwd/);
  check('file cwd', f => { f.main.task_breakdown[0].verification.cwd = 'product-specs/spec.md'; }, /cwd/);
  check('empty argv', f => { f.main.task_breakdown[0].verification.argv = []; }, /argv/);
  check('empty argv token', f => { f.main.task_breakdown[0].verification.argv.push(''); }, /argv/);
  check('placeholder argv', f => { f.main.task_breakdown[0].verification.argv = ['write tests']; }, /argv/);
  for (const argv of [['sh', '-c', 'echo ok'], ['/bin/bash', '-lc', 'echo ok'], ['cmd.exe', '/c', 'echo ok'], ['pwsh', '-Command', 'echo ok'], ['node', 'x.js', '&&', 'echo']])
    check('shell command/control', f => { f.main.task_breakdown[0].verification.argv = argv; }, /argv/);
  check('missing behavior tests', f => { f.main.task_breakdown[0].verification.test_refs = []; }, /test_refs/);
  check('out of scope tests', f => { f.main.task_breakdown[0].verification.test_refs = ['test/other.js']; }, /test_refs/);
  check('documentation with reason', f => { const t=f.main.task_breakdown[0]; t.kind='documentation'; t.verification.test_refs=[]; t.verification_hint='No test_refs: documentation only; inspect UTF-8 and links'; });
  check('inert argv never executed', f => { const sentinel=path.join(f.root,'MUST_NOT_EXIST'); f.main.task_breakdown[0].verification.argv=['node','-e',`require('fs').writeFileSync(${JSON.stringify(sentinel)},'bad')`]; const result=f.check(); assert(result.ok); assert(!fs.existsSync(sentinel)); });
  check('unknown changed AC', f => { f.trace.acceptance_refs=['AC-999']; f.trace.task_refs[0].acceptance_ref='AC-999'; }, /AC-999/);
  check('missing mapping', f => { f.trace.task_refs=[]; }, /task_refs/);
  check('unknown mapped task', f => { f.trace.task_refs[0].task_ids=['T9']; }, /T9/);
  check('duplicate mapped task', f => { f.trace.task_refs[0].task_ids=['T1','T1']; }, /task_ids.*duplicate/);
  check('duplicate mapping', f => { f.trace.task_refs.push(f.trace.task_refs[0]); }, /duplicate.*AC-001/);
  check('duplicate declared AC', f => { f.trace.acceptance_refs.push('AC-001'); }, /acceptance_refs.*duplicate/);
  check('undeclared AC mapping', f => { f.trace.task_refs.push({acceptance_ref:'AC-002',task_ids:['T1']}); }, /AC-002.*declared/);
  check('empty trace', f => { f.trace={}; }, /acceptance_refs/);
  check('exact spec lookup, no substring', f => { fs.writeFileSync(path.join(f.root,'product-specs/spec.md'),'## Acceptance Criteria\n```yaml\nacceptance_criteria:\n  - id: AC-0010\n    description: AC-001 mentioned in prose\n```\n'); }, /AC-001/);
  check('duplicate spec AC', f => { const p=path.join(f.root,'product-specs/spec.md'); fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('AC-002','AC-001')); }, /duplicate.*AC-001/);
  check('spec path traversal', f => f.render().replace('product-specs/spec.md','../outside.md'), /spec_refs/);
  check('missing spec', f => f.render().replace('product-specs/spec.md','missing.md'), /spec_refs/);
  check('Spec Card lookup', f => { const p=path.join(f.root,'product-specs/spec.md'); fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('SRS','SPEC_CARD')); return f.render().replace('  srs:', '  card:'); });
  check('AC id can follow description', f => { const p=path.join(f.root,'product-specs/spec.md'); fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('  - id: AC-001\n    description: Preserve first event','  - description: Preserve first event\n    id: AC-001')); });
  check('AC list accepts four-space indentation', f => { const p=path.join(f.root,'product-specs/spec.md'); fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace(/^  /gm,'    ')); });
  check('nested id cannot impersonate AC', f => { const p=path.join(f.root,'product-specs/spec.md'); fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('  - id: AC-001','  - id: AC-OTHER\n    details:\n      id: AC-001')); }, /AC-001/);
  for (const suffix of ['', '.vi']) check(`documented example ${suffix || 'en'}`, f => {
    const doc=fs.readFileSync(path.resolve(__dirname,'../../../skills/delivery/task-breakdown-planner/SKILL'+suffix+'.md'),'utf8');
    const blocks=[...doc.matchAll(/```json\n([\s\S]*?)\n```/g)];
    f.main=JSON.parse(blocks[0][1]); f.trace=JSON.parse(blocks[1][1]);
  });
  assert.deepStrictEqual(failures, [], failures.join("\n"));
  console.log(`OK: ${count} task contract cases passed`);
}
if (require.main === module) run();
module.exports = { fixture, task };
