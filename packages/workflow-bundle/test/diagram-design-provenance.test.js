const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const root = path.resolve(__dirname, "../../../skills/architecture/diagram-design-presentation-adapter");
assert(fs.existsSync(path.join(root, "scripts/verify-upstream-provenance.js")), "Pinned provenance verifier is required");
const { verify } = require(path.join(root, "scripts/verify-upstream-provenance.js"));
const actual = verify();
assert.equal(actual.file_count, 155);
assert.equal(actual.byte_count, 2113085);
assert.equal(actual.digest, "97c4979fcbb92f4b0e1af8ef6fa79728ed2fa9cffccf838c6a0fa2e11738de96");
assert.equal(actual.commit, "5f1b6ddc66036554dd68701798bd12aa5e3ef3f9");
assert.equal(actual.license, "MIT");
assert.deepEqual(actual.capabilities, ["Read", "Write"]);
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "diagram-provenance-"));
try {
  fs.cpSync(path.join(root, "resources/upstream"), scratch, { recursive: true });
  const skill = path.join(scratch, "diagram-design/UPSTREAM-SKILL.md");
  fs.appendFileSync(skill, "\nchanged");
  assert.throws(() => verify(scratch), /digest|identity|count/i);
  fs.copyFileSync(path.join(root, "resources/upstream/diagram-design/UPSTREAM-SKILL.md"), skill);
  fs.writeFileSync(path.join(scratch, "diagram-design/SKILL.md"), "unexpected nested skill");
  assert.throws(() => verify(scratch), /nested|count|unexpected/i);
  fs.unlinkSync(path.join(scratch, "diagram-design/SKILL.md"));
  fs.unlinkSync(skill);
  fs.symlinkSync(path.join(root, "resources/upstream/diagram-design/UPSTREAM-SKILL.md"), skill);
  assert.throws(() => verify(scratch), /symbolic|symlink/i);
} finally {
  fs.rmSync(scratch, { recursive: true, force: true });
}
console.log("PASS: pinned identity, byte manifest, mutation, nested discovery and symlink rejection.");
