const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const canonicalRoot = path.join(repoRoot, "skills");
const canonicalPolicyPath = path.join(repoRoot, "policies", "codex", "AGENTS.global.md");
const canonicalSupportPoliciesRoot = path.join(repoRoot, "policies", "codex");
const sourceManifest = JSON.parse(fs.readFileSync(path.join(repoRoot, "workflow-bundle.manifest.json"), "utf8"));
const packageManifest = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "packages", "workflow-bundle", "workflow-bundle.manifest.json"), "utf8")
);
const runtimeRoots = {
  codex: path.join(repoRoot, "packages", "workflow-bundle", "runtime", "codex", "skills"),
  claude: path.join(repoRoot, "packages", "workflow-bundle", "runtime", "claude", "skills")
};
const expectedSkillCount = 42;
const requiredArtifactGovernanceFiles = [
  "SKILL.md",
  "SKILL.vi.md",
  "references/ownership-table.md",
  "references/worked-example.md"
];
let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function collectSkillDirs(root, label) {
  const found = new Map();
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (!entry.isDirectory()) continue;
      const skillFile = path.join(target, "SKILL.md");
      if (fs.existsSync(skillFile)) {
        const content = fs.readFileSync(skillFile, "utf8");
        const match = content.match(/^name:\s*([a-z0-9-]+)\s*$/m);
        assert(match, `${label} skill missing parseable name: ${skillFile}`);
        if (match) {
          assert(!found.has(match[1]), `duplicate ${label} skill name '${match[1]}'`);
          found.set(match[1], target);
        }
      } else {
        walk(target);
      }
    }
  }
  walk(root);
  return found;
}

function collectRelativeFiles(root) {
  const files = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const target = path.join(current, entry.name);
      if (entry.isSymbolicLink()) {
        assert(false, `managed skill tree must not contain symbolic link: ${target}`);
      } else if (entry.isDirectory()) {
        walk(target);
      } else if (entry.isFile()) {
        files.push(path.relative(root, target).split(path.sep).join("/"));
      }
    }
  }
  walk(root);
  return files;
}

console.log("Running workflow-bundle canonical/runtime parity tests...\n");
assert(packageManifest.bundleName === sourceManifest.bundleName, "package runtime manifest bundleName must match canonical source");
assert(packageManifest.bundleVersion === sourceManifest.bundleVersion, "package runtime manifest bundleVersion must match canonical source");
assert(packageManifest.workflowSchemaVersion === sourceManifest.workflowSchemaVersion, "package runtime workflow schema must match canonical source");
assert(packageManifest.crSchemaVersion === sourceManifest.crSchemaVersion, "package runtime CR schema must match canonical source");
const canonical = collectSkillDirs(canonicalRoot, "canonical");
const canonicalNames = [...canonical.keys()].sort();
assert(canonicalNames.length === expectedSkillCount, `canonical inventory must contain ${expectedSkillCount} skills, got ${canonicalNames.length}`);
assert(canonicalNames.includes("architecture-modeling"), "canonical inventory must include architecture-modeling");
assert(canonicalNames.includes("artifact-governance"), "canonical inventory must include artifact-governance");
if (canonical.has("artifact-governance")) {
  const artifactGovernanceFiles = collectRelativeFiles(canonical.get("artifact-governance"));
  requiredArtifactGovernanceFiles.forEach((relativePath) => {
    assert(
      artifactGovernanceFiles.includes(relativePath),
      `canonical artifact-governance must include ${relativePath}`
    );
  });
}

for (const [mode, runtimeRoot] of Object.entries(runtimeRoots)) {
  const runtimeManifest = packageManifest[mode];
  assert(runtimeManifest, `${mode} must exist in the package runtime manifest`);
  const runtimeGlobalPolicy = path.join(repoRoot, "packages", "workflow-bundle", runtimeManifest.globalAgentsSource);
  assert(fs.existsSync(runtimeGlobalPolicy), `${mode} runtime global policy must exist`);
  if (fs.existsSync(runtimeGlobalPolicy)) {
    assert(
      fs.readFileSync(runtimeGlobalPolicy).equals(fs.readFileSync(canonicalPolicyPath)),
      `${mode} runtime global policy bytes must match canonical source`
    );
  }
  const runtimeSupportRoot = path.join(repoRoot, "packages", "workflow-bundle", runtimeManifest.supportPoliciesSourceRoot);
  assert(fs.existsSync(runtimeSupportRoot), `${mode} runtime support-policy root must exist`);
  if (fs.existsSync(runtimeSupportRoot)) {
    const canonicalSupportFiles = collectRelativeFiles(canonicalSupportPoliciesRoot).filter(
      (relativePath) => relativePath !== "AGENTS.global.md"
    );
    const runtimeSupportFiles = collectRelativeFiles(runtimeSupportRoot);
    assert(
      JSON.stringify(runtimeSupportFiles) === JSON.stringify(canonicalSupportFiles),
      `${mode} support-policy inventory must match canonical source without duplicating the global policy`
    );
    canonicalSupportFiles.forEach((relativePath) => {
      assert(
        fs.readFileSync(path.join(runtimeSupportRoot, relativePath)).equals(
          fs.readFileSync(path.join(canonicalSupportPoliciesRoot, relativePath))
        ),
        `${mode} support policy '${relativePath}' bytes must match canonical source`
      );
    });
  }
  const runtime = collectSkillDirs(runtimeRoot, `${mode} runtime`);
  const names = [...runtime.keys()].sort();
  assert(names.length === expectedSkillCount, `${mode} runtime must contain ${expectedSkillCount} managed skills, got ${names.length}`);
  assert(JSON.stringify(names) === JSON.stringify(canonicalNames), `${mode} runtime skill inventory differs from canonical`);

  for (const name of canonicalNames) {
    const sourceRoot = canonical.get(name);
    const targetRoot = runtime.get(name);
    if (!targetRoot) {
      assert(false, `${mode} runtime missing skill '${name}'`);
      continue;
    }
    const sourceFiles = collectRelativeFiles(sourceRoot);
    const targetFiles = collectRelativeFiles(targetRoot);
    assert(
      JSON.stringify(targetFiles) === JSON.stringify(sourceFiles),
      `${mode}/${name}: file inventory differs; source=${JSON.stringify(sourceFiles)} runtime=${JSON.stringify(targetFiles)}`
    );
    sourceFiles.forEach((relativePath) => {
      const source = fs.readFileSync(path.join(sourceRoot, relativePath));
      const target = fs.readFileSync(path.join(targetRoot, relativePath));
      assert(source.equals(target), `${mode}/${name}/${relativePath}: runtime bytes differ from canonical source`);
    });
  }
  console.log(`  ${mode}: checked ${names.length} skill directories against canonical source`);
}

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed in workflow-bundle-runtime-parity.test.js`);
  process.exit(1);
}
console.log("OK: workflow-bundle-runtime-parity.test.js passed");
