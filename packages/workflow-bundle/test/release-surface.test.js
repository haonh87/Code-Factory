#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const releaseVersion = "2.4.0";
const releaseLabel = `v${releaseVersion}`;
const expectedSkillCount = 41;
let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function countSkills(root) {
  let count = 0;
  function walk(current) {
    fs.readdirSync(current, { withFileTypes: true }).forEach((entry) => {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) walk(target);
      if (entry.isFile() && entry.name === "SKILL.md") count += 1;
    });
  }
  walk(root);
  return count;
}

console.log("Running v2.4.0 release-surface tests...\n");

const rootManifest = readJson("workflow-bundle.manifest.json");
const packageManifest = readJson("packages/workflow-bundle/workflow-bundle.manifest.json");
const packageJson = readJson("packages/workflow-bundle/package.json");
assert(rootManifest.bundleVersion === releaseVersion, `root bundleVersion must be ${releaseVersion}`);
assert(packageManifest.bundleVersion === releaseVersion, `package bundleVersion must be ${releaseVersion}`);
assert(packageJson.version === releaseVersion, `package version must be ${releaseVersion}`);
assert(read("packages/workflow-bundle/bin/wfc.js").includes(`Public ${releaseLabel} Flow:`), "wfc help must name the v2.4.0 flow");

const publicClaims = [
  ["README.md", `prepared release candidate is \`workflow-bundle ${releaseLabel}\``],
  ["README.md", `remains unpublished until the human Release gate passes`],
  ["packages/workflow-bundle/README.md", `prepared for the \`${releaseLabel}\` release candidate`],
  ["packages/workflow-bundle/README.md", `## What \`${releaseLabel}\` Includes`],
  ["docs/publish-surface.md", `pins the planned public publish surface for \`workflow-bundle ${releaseLabel}\``],
  ["docs/publish-surface.md", `\`${releaseLabel}\` is a release candidate`],
  ["docs/publish-surface.md", `remains unpublished until the human Release gate passes`],
  ["docs/workflow-docs-map.md", `\`workflow-bundle ${releaseLabel}\``],
  ["docs/workflow-bundle-quickstart.md", `\`workflow-bundle ${releaseLabel}\``]
];
publicClaims.forEach(([file, claim]) => assert(read(file).includes(claim), `${file} missing current-release claim: ${claim}`));

const canonicalCount = countSkills(path.join(repoRoot, "skills"));
const codexCount = countSkills(path.join(repoRoot, "packages", "workflow-bundle", "runtime", "codex", "skills"));
const claudeCount = countSkills(path.join(repoRoot, "packages", "workflow-bundle", "runtime", "claude", "skills"));
assert(canonicalCount === expectedSkillCount, `canonical inventory must be ${expectedSkillCount}, got ${canonicalCount}`);
assert(codexCount === expectedSkillCount, `Codex runtime inventory must be ${expectedSkillCount}, got ${codexCount}`);
assert(claudeCount === expectedSkillCount, `Claude runtime inventory must be ${expectedSkillCount}, got ${claudeCount}`);
assert(read("packages/workflow-bundle/README.md").includes("41 managed skills"), "package README must publish the 41-skill inventory");
assert(read("docs/publish-surface.md").includes("41 managed skills"), "publish surface must publish the 41-skill inventory");

const releaseNotePath = "docs/releases/workflow-bundle-v2.4.0.md";
assert(fs.existsSync(path.join(repoRoot, releaseNotePath)), "v2.4.0 release note must exist");
if (fs.existsSync(path.join(repoRoot, releaseNotePath))) {
  const releaseNote = read(releaseNotePath);
  [
    "CHANGE-002",
    "architecture-modeling",
    "41 managed skills",
    "## Compatibility",
    "## Known Limitations",
    "## Verification",
    "## Rollback",
    "## Release Gates"
  ].forEach((claim) => assert(releaseNote.includes(claim), `${releaseNotePath} missing '${claim}'`));
  assert(!releaseNote.includes("Candidate branch: `release/v2.4.0`"), "release note must not claim a branch that does not exist");
  assert(!releaseNote.includes("T8 integrated Verify evidence"), "release note must not mark T8 passed and pending at the same time");
  assert(releaseNote.includes("Do not use the v2.3.2 `wfc update` command for this downgrade"), "release note must document the executable rollback command boundary");
  assert(!/(?:\(điền\)|\bTODO\b|\bTBD\b|là \.\.\.)/i.test(releaseNote), "v2.4.0 release note must be placeholder-free");
}

assert(!read("README.md").includes("current public release is `workflow-bundle v2.4.0`"), "root README must not call an unpublished candidate current");
assert(!read("packages/workflow-bundle/README.md").includes("`v2.4.0` public release"), "package README must not call an unpublished candidate public");
assert(!read("docs/publish-surface.md").includes("`v2.4.0` is the current public release"), "publish surface must not call an unpublished candidate current");
[
  "README.md",
  "docs/workflow-docs-map.md",
  "docs/workflow-bundle-quickstart.md",
  "docs/publish-surface.md",
  "packages/workflow-bundle/README.md"
].forEach((file) => {
  const text = read(file);
  [
    "`v2.4.0` public release",
    "`v2.4.0` is the current public release",
    "public release `workflow-bundle v2.4.0`",
    "current public release is `workflow-bundle v2.4.0`"
  ].forEach((claim) => assert(!text.includes(claim), `${file} must not contain unpublished-release claim '${claim}'`));
});

const guardrailsWorkflow = read(".github/workflows/workflow-guardrails.yml");
[
  "release-candidate:",
  '- "18"',
  '- "22"',
  "npm run validate:workflow:unit",
  "npm run validate:workflow:pack-audit",
  "npm run validate:workflow:bundle-smoke",
  "npm run validate:workflow:release-candidate",
  "fetch-depth: 0"
].forEach((claim) => assert(guardrailsWorkflow.includes(claim), `.github/workflows/workflow-guardrails.yml missing '${claim}'`));

const priorRelease = read("docs/releases/workflow-bundle-v2.3.2.md");
assert(
  priorRelease.includes("Superseded on `2026-08-17` by `v2.4.0`"),
  "v2.3.2 release note must contain the dated supersession pointer"
);
assert(priorRelease.includes("installed_version=2.3.2, managed_skills=40"), "v2.3.2 historical verification evidence must remain present");

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in release-surface.test.js`);
  process.exit(1);
}
console.log("OK: release-surface.test.js passed");
