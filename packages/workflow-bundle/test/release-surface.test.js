#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const releaseVersion = "2.6.3";
const releaseLabel = `v${releaseVersion}`;
const expectedSkillCount = 42;
const frozenReleaseDigests = {
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
  [".claude/CLAUDE.md", `Prepared candidate: \`workflow-bundle ${releaseLabel}\` (\`UNPUBLISHED\`; human Release gate pending).`],
  ["README.md", `prepared release candidate is \`workflow-bundle ${releaseLabel}\``],
  ["README.md", `remains unpublished until the human Release gate passes`],
  ["README.md", "exact ID-based state disposition and terminal archive guards"],
  ["README.md", "Guardrails packs once and verifies that same artifact on Node 18 and Node 22"],
  ["README.vi.md", `Ứng viên phát hành hiện tại là \`workflow-bundle ${releaseLabel}\``],
  ["README.vi.md", `chưa được phát hành cho tới khi human Release gate phê duyệt`],
  ["README.vi.md", "state disposition theo ID chính xác và terminal archive guard"],
  ["packages/workflow-bundle/README.md", `prepared for the \`${releaseLabel}\` release candidate`],
  ["packages/workflow-bundle/README.md", `## What \`${releaseLabel}\` Includes`],
  ["packages/workflow-bundle/README.md", "## Exact State Disposition And Archive Guards"],
  ["packages/workflow-bundle/README.md", "### Roll Back From v2.6.3 To v2.6.2"],
  ["packages/workflow-bundle/README.vi.md", `được chuẩn bị cho ứng viên phát hành \`${releaseLabel}\``],
  ["packages/workflow-bundle/README.vi.md", `chưa được phát hành cho tới khi human Release gate phê duyệt`],
  ["packages/workflow-bundle/README.vi.md", "## State Disposition Chính Xác Và Archive Guard"],
  ["packages/workflow-bundle/README.vi.md", "### Roll Back Từ v2.6.3 Về v2.6.2"],
  ["docs/publish-surface.md", `pins the planned public publish surface for \`workflow-bundle ${releaseLabel}\``],
  ["docs/publish-surface.md", `\`${releaseLabel}\` is a release candidate`],
  ["docs/publish-surface.md", `remains unpublished until the human Release gate passes`],
  ["docs/publish-surface.md", "adds exact ID-based state disposition, signed resolved-state history, and terminal archive guards"],
  ["docs/publish-surface.vi.md", `ghim bề mặt phát hành công khai dự kiến cho \`workflow-bundle ${releaseLabel}\``],
  ["docs/publish-surface.vi.md", `\`${releaseLabel}\` là một ứng viên phát hành`],
  ["docs/publish-surface.vi.md", `vẫn chưa được phát hành cho đến khi human Release gate phê duyệt`],
  ["docs/publish-surface.vi.md", "thêm state disposition theo ID chính xác, lịch sử resolved-state có chữ ký và terminal archive guard"],
  ["docs/workflow-docs-map.md", `\`workflow-bundle ${releaseLabel}\``],
  ["docs/workflow-docs-map.vi.md", `\`workflow-bundle ${releaseLabel}\``],
  ["docs/workflow-bundle-quickstart.md", `\`workflow-bundle ${releaseLabel}\``],
  ["docs/workflow-bundle-quickstart.md", "## Resolve State By Exact ID"],
  ["docs/workflow-bundle-quickstart.md", "wfc work-item dispose-state"],
  ["docs/workflow-bundle-quickstart.md", "wfc gate approve-closeout-bundle"],
  ["docs/workflow-bundle-quickstart.md", "wfc telemetry purge"],
  ["docs/workflow-bundle-quickstart.vi.md", `\`workflow-bundle ${releaseLabel}\``],
  ["docs/workflow-bundle-quickstart.vi.md", `ứng viên phát hành`],
  ["docs/workflow-bundle-quickstart.vi.md", "## Xử Lý State Theo ID Chính Xác"],
  ["docs/workflow-bundle-quickstart.vi.md", "wfc work-item dispose-state"],
  ["docs/workflow-bundle-quickstart.vi.md", "wfc gate approve-closeout-bundle"],
  ["docs/workflow-bundle-quickstart.vi.md", "wfc telemetry purge"]
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
    "CR-009",
    "exact ID-based disposition",
    "resolved_state_history",
    "terminal archive guard",
    "42 managed skills",
    "## Complete Packaged Delta",
    "## Non-Packaged Repository Changes",
    "## Compatibility",
    "## Known Limitations",
    "## Verification",
    "## Rollback",
    "## Release Gates"
  ].forEach((claim) => assert(releaseNote.includes(claim), `${releaseNotePath} missing '${claim}'`));
  assert(!releaseNote.includes(`Branch: \`release/${releaseLabel}\``), "release note must not claim a branch that does not exist");
  assert(
    releaseNote.includes("workflow-bundle-2.6.2.tgz") &&
      releaseNote.includes("af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f"),
    "release note must document the immutable rollback command boundary"
  );
  assert(
    releaseNote.includes("Node 24 action-runtime readiness") &&
      releaseNote.includes("does not add files to the npm tarball"),
    "release note must separate non-packaged repository history from the packaged delta"
  );
  assert(
    releaseNote.includes("Legacy string state entries remain readable") &&
      releaseNote.includes("preserved byte-for-byte in signed resolved-state history"),
    "release note must record legacy state compatibility and exact preservation"
  );
  assert(
    releaseNote.includes("GitHub-hosted Workflow Guardrails has not run for the v2.6.3 release branch") &&
      releaseNote.includes("B1/B2/B3 review, s08 Technical Verification, DoD, Release, and Business Acceptance remain pending"),
    "release note must keep remote and human gates explicitly pending"
  );
  assert(!/(?:\(điền\)|\bTODO\b|\bTBD\b|là \.\.\.)/i.test(releaseNote), `${releaseLabel} release note must be placeholder-free`);
}

[
  ".claude/CLAUDE.md",
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

const staleV250CurrentClaims = [
  ["README.md", "prepared release candidate is `workflow-bundle v2.5.0`"],
  ["README.vi.md", "ứng viên phát hành đã chuẩn bị là `workflow-bundle v2.5.0`"],
  ["packages/workflow-bundle/README.md", "prepared for the `v2.5.0` release candidate"],
  ["packages/workflow-bundle/README.vi.md", "được chuẩn bị cho ứng viên phát hành `v2.5.0`"],
  ["docs/publish-surface.md", "planned public publish surface for `workflow-bundle v2.5.0`"],
  ["docs/publish-surface.vi.md", "bề mặt phát hành công khai dự kiến cho `workflow-bundle v2.5.0`"],
  ["docs/workflow-docs-map.md", "public onboarding path of `workflow-bundle v2.5.0`"],
  ["docs/workflow-docs-map.vi.md", "public onboarding path của `workflow-bundle v2.5.0`"],
  ["docs/workflow-bundle-quickstart.md", "release candidate `workflow-bundle v2.5.0`"],
  ["docs/workflow-bundle-quickstart.vi.md", "ứng viên phát hành `workflow-bundle v2.5.0`"]
];
staleV250CurrentClaims.forEach(([file, claim]) => {
  assert(!read(file).includes(claim), `${file} must not retain stale current-candidate claim: ${claim}`);
});

const staleV260CurrentClaims = [
  ["README.md", "prepared release candidate is `workflow-bundle v2.6.0`"],
  ["README.vi.md", "ứng viên phát hành đã chuẩn bị là `workflow-bundle v2.6.0`"],
  ["packages/workflow-bundle/README.md", "prepared for the `v2.6.0` release candidate"],
  ["packages/workflow-bundle/README.vi.md", "được chuẩn bị cho ứng viên phát hành `v2.6.0`"],
  ["docs/publish-surface.md", "planned public publish surface for `workflow-bundle v2.6.0`"],
  ["docs/publish-surface.vi.md", "bề mặt phát hành công khai dự kiến cho `workflow-bundle v2.6.0`"],
  ["docs/workflow-docs-map.md", "public onboarding path of `workflow-bundle v2.6.0`"],
  ["docs/workflow-docs-map.vi.md", "public onboarding path của `workflow-bundle v2.6.0`"],
  ["docs/workflow-bundle-quickstart.md", "release candidate `workflow-bundle v2.6.0`"],
  ["docs/workflow-bundle-quickstart.vi.md", "ứng viên phát hành `workflow-bundle v2.6.0`"]
];
staleV260CurrentClaims.forEach(([file, claim]) => {
  assert(!read(file).includes(claim), `${file} must not retain stale current-candidate claim: ${claim}`);
});

const staleV261CurrentClaims = [
  ["README.md", "prepared release candidate is `workflow-bundle v2.6.1`"],
  ["README.vi.md", "Ứng viên phát hành hiện tại là `workflow-bundle v2.6.1`"],
  ["packages/workflow-bundle/README.md", "prepared for the `v2.6.1` release candidate"],
  ["packages/workflow-bundle/README.vi.md", "được chuẩn bị cho ứng viên phát hành `v2.6.1`"],
  ["docs/publish-surface.md", "planned public publish surface for `workflow-bundle v2.6.1`"],
  ["docs/publish-surface.vi.md", "bề mặt phát hành công khai dự kiến cho `workflow-bundle v2.6.1`"],
  ["docs/workflow-docs-map.md", "public onboarding path of `workflow-bundle v2.6.1`"],
  ["docs/workflow-docs-map.vi.md", "public onboarding path của `workflow-bundle v2.6.1`"],
  ["docs/workflow-bundle-quickstart.md", "`workflow-bundle v2.6.1` release candidate"],
  ["docs/workflow-bundle-quickstart.vi.md", "ứng viên phát hành `workflow-bundle v2.6.1`"]
];
staleV261CurrentClaims.forEach(([file, claim]) => {
  assert(!read(file).includes(claim), `${file} must not retain stale current-candidate claim: ${claim}`);
});

const staleV262CurrentClaims = [
  ["README.md", "prepared release candidate is `workflow-bundle v2.6.2`"],
  ["README.vi.md", "Ứng viên phát hành hiện tại là `workflow-bundle v2.6.2`"],
  ["packages/workflow-bundle/README.md", "prepared for the `v2.6.2` release candidate"],
  ["packages/workflow-bundle/README.vi.md", "được chuẩn bị cho ứng viên phát hành `v2.6.2`"],
  ["docs/publish-surface.md", "planned public publish surface for `workflow-bundle v2.6.2`"],
  ["docs/publish-surface.vi.md", "bề mặt phát hành công khai dự kiến cho `workflow-bundle v2.6.2`"],
  ["docs/workflow-docs-map.md", "public onboarding path of `workflow-bundle v2.6.2`"],
  ["docs/workflow-docs-map.vi.md", "public onboarding path của `workflow-bundle v2.6.2`"],
  ["docs/workflow-bundle-quickstart.md", "`workflow-bundle v2.6.2` release candidate"],
  ["docs/workflow-bundle-quickstart.vi.md", "ứng viên phát hành `workflow-bundle v2.6.2`"]
];
staleV262CurrentClaims.forEach(([file, claim]) => {
  assert(!read(file).includes(claim), `${file} must not retain stale current-candidate claim: ${claim}`);
});

const guardrailsWorkflow = read(".github/workflows/workflow-guardrails.yml");
[
  "release-candidate-build:",
  "release-candidate:",
  '- "18"',
  '- "22"',
  "actions/upload-artifact@v6",
  "actions/download-artifact@v7",
  "WORKFLOW_BUNDLE_CANDIDATE_TARBALL",
  "WORKFLOW_BUNDLE_CANDIDATE_SHA256",
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
const v250Release = read("docs/releases/workflow-bundle-v2.5.0.md");
assert(v250Release.includes("42 managed skills"), "v2.5.0 historical inventory must remain 42");
const v260Release = read("docs/releases/workflow-bundle-v2.6.0.md");
assert(v260Release.includes("42 managed skills"), "v2.6.0 historical inventory must remain 42");
const v261Release = read("docs/releases/workflow-bundle-v2.6.1.md");
assert(v261Release.includes("42 managed skills"), "v2.6.1 historical inventory must remain 42");
const v262Release = read("docs/releases/workflow-bundle-v2.6.2.md");
assert(v262Release.includes("42 managed skills"), "v2.6.2 historical inventory must remain 42");
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
