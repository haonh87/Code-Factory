#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const releaseVersion = "2.5.0";
const releaseLabel = `v${releaseVersion}`;
const expectedSkillCount = 42;
const frozenReleaseDigests = {
  "docs/releases/workflow-bundle-v2.4.0.md": "2b84621cccae1e0126287d9de48fa425dada7fd833b92d722fac33e2c15755a5",
  "docs/releases/workflow-bundle-v2.3.2.md": "476b3804e3fb901feb0ede4f817c31475072b1c578de4bdeab8c2d2a10fed98d"
};
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

function sha256(relativePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(path.join(repoRoot, relativePath))).digest("hex");
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

console.log(`Running ${releaseLabel} release-surface tests...\n`);

const rootManifest = readJson("workflow-bundle.manifest.json");
const packageManifest = readJson("packages/workflow-bundle/workflow-bundle.manifest.json");
const packageJson = readJson("packages/workflow-bundle/package.json");
assert(rootManifest.bundleVersion === releaseVersion, `root bundleVersion must be ${releaseVersion}`);
assert(packageManifest.bundleVersion === releaseVersion, `package bundleVersion must be ${releaseVersion}`);
assert(packageJson.version === releaseVersion, `package version must be ${releaseVersion}`);
assert(read("packages/workflow-bundle/bin/wfc.js").includes(`Public ${releaseLabel} Flow:`), `wfc help must name the ${releaseLabel} flow`);

const publicClaims = [
  ["README.md", `prepared release candidate is \`workflow-bundle ${releaseLabel}\``],
  ["README.md", `remains unpublished until the human Release gate passes`],
  ["README.vi.md", `ứng viên phát hành đã chuẩn bị là \`workflow-bundle ${releaseLabel}\``],
  ["README.vi.md", `vẫn chưa được phát hành cho đến khi human Release gate phê duyệt`],
  ["packages/workflow-bundle/README.md", `prepared for the \`${releaseLabel}\` release candidate`],
  ["packages/workflow-bundle/README.md", `## What \`${releaseLabel}\` Includes`],
  ["packages/workflow-bundle/README.vi.md", `được chuẩn bị cho ứng viên phát hành \`${releaseLabel}\``],
  ["packages/workflow-bundle/README.vi.md", `vẫn chưa được phát hành cho đến khi human Release gate phê duyệt`],
  ["docs/publish-surface.md", `pins the planned public publish surface for \`workflow-bundle ${releaseLabel}\``],
  ["docs/publish-surface.md", `\`${releaseLabel}\` is a release candidate`],
  ["docs/publish-surface.md", `remains unpublished until the human Release gate passes`],
  ["docs/publish-surface.vi.md", `ghim bề mặt phát hành công khai dự kiến cho \`workflow-bundle ${releaseLabel}\``],
  ["docs/publish-surface.vi.md", `\`${releaseLabel}\` là một ứng viên phát hành`],
  ["docs/publish-surface.vi.md", `vẫn chưa được phát hành cho đến khi human Release gate phê duyệt`],
  ["docs/workflow-docs-map.md", `\`workflow-bundle ${releaseLabel}\``],
  ["docs/workflow-docs-map.vi.md", `\`workflow-bundle ${releaseLabel}\``],
  ["docs/workflow-bundle-quickstart.md", `\`workflow-bundle ${releaseLabel}\``],
  ["docs/workflow-bundle-quickstart.vi.md", `\`workflow-bundle ${releaseLabel}\``],
  ["docs/workflow-bundle-quickstart.vi.md", `ứng viên phát hành`]
];
publicClaims.forEach(([file, claim]) => assert(read(file).includes(claim), `${file} missing current-release claim: ${claim}`));

const canonicalCount = countSkills(path.join(repoRoot, "skills"));
const codexCount = countSkills(path.join(repoRoot, "packages", "workflow-bundle", "runtime", "codex", "skills"));
const claudeCount = countSkills(path.join(repoRoot, "packages", "workflow-bundle", "runtime", "claude", "skills"));
assert(canonicalCount === expectedSkillCount, `canonical inventory must be ${expectedSkillCount}, got ${canonicalCount}`);
assert(codexCount === expectedSkillCount, `Codex runtime inventory must be ${expectedSkillCount}, got ${codexCount}`);
assert(claudeCount === expectedSkillCount, `Claude runtime inventory must be ${expectedSkillCount}, got ${claudeCount}`);
assert(read("packages/workflow-bundle/README.md").includes("42 managed skills"), "package README must publish the 42-skill inventory");
assert(read("packages/workflow-bundle/README.vi.md").includes("42 skill được quản lý"), "Vietnamese package README must publish the 42-skill inventory");
assert(read("docs/publish-surface.md").includes("42 managed skills"), "publish surface must publish the 42-skill inventory");
assert(read("docs/publish-surface.vi.md").includes("42 skill được quản lý"), "Vietnamese publish surface must publish the 42-skill inventory");

const releaseNotePath = `docs/releases/workflow-bundle-${releaseLabel}.md`;
assert(fs.existsSync(path.join(repoRoot, releaseNotePath)), `${releaseLabel} release note must exist`);
if (fs.existsSync(path.join(repoRoot, releaseNotePath))) {
  const releaseNote = read(releaseNotePath);
  [
    "CHANGE-003",
    "artifact-governance",
    "42 managed skills",
    "## Compatibility",
    "## Known Limitations",
    "## Verification",
    "## Rollback",
    "## Release Gates"
  ].forEach((claim) => assert(releaseNote.includes(claim), `${releaseNotePath} missing '${claim}'`));
  assert(!releaseNote.includes(`Candidate branch: \`release/${releaseLabel}\``), "release note must not claim a branch that does not exist");
  assert(releaseNote.includes("Do not use the v2.4.0 `wfc update` command for this downgrade"), "release note must document the executable rollback command boundary");
  assert(!/(?:\(điền\)|\bTODO\b|\bTBD\b|là \.\.\.)/i.test(releaseNote), `${releaseLabel} release note must be placeholder-free`);
}

[
  "README.md",
  "README.vi.md",
  "docs/workflow-docs-map.md",
  "docs/workflow-docs-map.vi.md",
  "docs/workflow-bundle-quickstart.md",
  "docs/workflow-bundle-quickstart.vi.md",
  "docs/publish-surface.md",
  "docs/publish-surface.vi.md",
  "packages/workflow-bundle/README.md",
  "packages/workflow-bundle/README.vi.md"
].forEach((file) => {
  const text = read(file);
  [
    `\`${releaseLabel}\` public release`,
    `\`${releaseLabel}\` is the current public release`,
    `public release \`workflow-bundle ${releaseLabel}\``,
    `current public release is \`workflow-bundle ${releaseLabel}\``,
    `public release hiện tại là \`workflow-bundle ${releaseLabel}\``
  ].forEach((claim) => assert(!text.includes(claim), `${file} must not contain unpublished-release claim '${claim}'`));
  assert(!text.includes("v2.1.1"), `${file} must not retain stale v2.1.1 current-surface claims`);
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

Object.entries(frozenReleaseDigests).forEach(([relativePath, expectedDigest]) => {
  assert(sha256(relativePath) === expectedDigest, `${relativePath} historical digest changed`);
});
const v240Release = read("docs/releases/workflow-bundle-v2.4.0.md");
assert(v240Release.includes("41 managed skills"), "v2.4.0 historical inventory must remain 41");
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
