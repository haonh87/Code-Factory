const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const identity = Object.freeze({
  repository: 'https://github.com/cathrynlavery/diagram-design.git',
  commit: '5f1b6ddc66036554dd68701798bd12aa5e3ef3f9',
  digest: '97c4979fcbb92f4b0e1af8ef6fa79728ed2fa9cffccf838c6a0fa2e11738de96',
  file_count: 155, byte_count: 2113085, license: 'MIT', capabilities: ['Read', 'Write']
});
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function verify(root = path.resolve(__dirname, '../resources/upstream')) {
  const entries = [];
  let bytes = 0;
  function visit(dir, rel = '') {
    for (const name of fs.readdirSync(dir)) {
      const file = path.join(dir, name), stored = rel ? `${rel}/${name}` : name;
      const stat = fs.lstatSync(file);
      assert(!stat.isSymbolicLink(), `Symbolic link forbidden: ${stored}`);
      if (stat.isDirectory()) { visit(file, stored); continue; }
      assert(stat.isFile(), `Unexpected entry: ${stored}`);
      assert(name !== 'SKILL.md', `Nested skill forbidden: ${stored}`);
      const logical = 'skills/diagram-design/' + (stored === 'UPSTREAM-SKILL.md' ? 'SKILL.md' : stored);
      const content = fs.readFileSync(file);
      bytes += content.length;
      entries.push({ logical, hash: sha(content) });
    }
  }
  visit(path.join(root, 'diagram-design'));
  entries.sort((a,b) => Buffer.compare(Buffer.from(a.logical), Buffer.from(b.logical)));
  assert.equal(entries.length, identity.file_count, 'Upstream file count mismatch');
  assert.equal(bytes, identity.byte_count, 'Upstream byte count mismatch');
  assert.equal(sha(entries.map(e => `${e.hash}  ${e.logical}\n`).join('')), identity.digest, 'Upstream digest mismatch');
  for (const [name, hash] of Object.entries({
    'LICENSE': 'bb7e12e91fecef43024111123ff784cec6c485585561d8b552557c0173b3ed29',
    'codex-plugin.json': 'bc8e4a632cb6f85b8da2912e36c26325dafd947ed45389d65329b620b19acd55',
    'diagram-design/UPSTREAM-SKILL.md': 'a334d1d59c64637fa8439ab116290f4541c17badb0947f584483387b634dd6ee'
  })) {
    assert(fs.lstatSync(path.join(root, name)).isFile(), `Unexpected identity file: ${name}`);
    assert.equal(sha(fs.readFileSync(path.join(root, name))), hash, `Identity mismatch: ${name}`);
  }
  const plugin = JSON.parse(fs.readFileSync(path.join(root, 'codex-plugin.json'), 'utf8'));
  assert.equal(plugin.license, 'MIT');
  assert.deepEqual(plugin.interface.capabilities, identity.capabilities);
  return { ...identity, capabilities: [...identity.capabilities] };
}
module.exports = { verify, identity, sha };
if (require.main === module) {
  try { console.log(JSON.stringify(verify(), null, 2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
