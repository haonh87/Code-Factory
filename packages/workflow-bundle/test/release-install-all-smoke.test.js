#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { runHardenedUpdateMatrix } = require("../scripts/run-workflow-bundle-smoke");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const expectedSkillCount = 41;

console.log("Running v2.4.0 install-all hardened update matrix...\n");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-bundle-install-all-"));
try {
  const results = runHardenedUpdateMatrix({
    wfcBin: path.join(repoRoot, "packages", "workflow-bundle", "bin", "wfc.js"),
    tempRoot,
    skills: []
  });
  if (results.length !== 4) throw new Error(`expected 4 mode/scope scenarios, got ${results.length}`);
  results.forEach((result) => {
    if (!result.exit_ok) throw new Error(`${result.mode}/${result.scope}: update did not exit successfully`);
    if (!result.unmanaged_unchanged) throw new Error(`${result.mode}/${result.scope}: unmanaged snapshot changed`);
    if (result.managed_skill_count !== expectedSkillCount) {
      throw new Error(`${result.mode}/${result.scope}: expected ${expectedSkillCount} managed skills, got ${result.managed_skill_count}`);
    }
    console.log(`  PASS: ${result.mode}/${result.scope} managed_skills=${result.managed_skill_count}, unmanaged_unchanged=true`);
  });
  console.log("\nOK: release-install-all-smoke.test.js passed");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
