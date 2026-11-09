const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");

const packageRoot = path.resolve(__dirname, "..");
// Pin fixture versions so the next release bump does not invalidate ordering cases.
const sourceVersion = "2.10.1";

function snapshot(root) {
  const entries = {};
  function walk(current) {
    if (!fs.existsSync(current)) return;
    const stat = fs.lstatSync(current);
    entries[path.relative(root, current)] = {
      mode: stat.mode & 0o777,
      hash: stat.isFile()
        ? crypto.createHash("sha256").update(fs.readFileSync(current)).digest("hex")
        : null,
    };
    if (stat.isDirectory())
      for (const name of fs.readdirSync(current)) walk(path.join(current, name));
  }
  walk(root);
  return entries;
}

function writeJson(file, value) {
  fs.chmodSync(file, 0o600);
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}

function editJson(file, patch) {
  writeJson(file, { ...JSON.parse(fs.readFileSync(file, "utf8")), ...patch });
}

function fixture(t, mode = "codex") {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "wfc-source-")));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const source = path.join(root, "package");
  fs.mkdirSync(source);
  for (const name of ["bin", "scripts", "runtime", "package.json", "workflow-bundle.manifest.json"])
    fs.cpSync(path.join(packageRoot, name), path.join(source, name), { recursive: true });
  editJson(path.join(source, "workflow-bundle.manifest.json"), { bundleVersion: sourceVersion });
  editJson(path.join(source, "package.json"), { version: sourceVersion });
  const older = path.join(root, "older-checkout");
  fs.cpSync(source, older, { recursive: true });
  editJson(path.join(older, "workflow-bundle.manifest.json"), { bundleVersion: "2.7.0" });
  editJson(path.join(older, "package.json"), { version: "2.7.0" });
  const nested = path.join(older, "nested", "directory");
  fs.mkdirSync(nested, { recursive: true });
  const home = path.join(root, "home");
  const project = path.join(root, "project");
  fs.mkdirSync(project);
  fs.writeFileSync(path.join(project, "README.md"), "User project; retain these bytes.\n", { mode: 0o444 });
  const state = path.join(home, `.${mode}-workflow-bundle.install-state.json`);
  const globalManifest = path.join(home, "code-factory", "install.json");
  const projectManifest = path.join(project, `.${mode}`, "code-factory", "install.json");
  function run(action, args = [], cwd = root, cliSource = source) {
    return spawnSync(process.execPath, [path.join(cliSource, "bin", "wfc.js"), action,
      "--mode", mode, "--runtime-home", home, ...args], { cwd, encoding: "utf8" });
  }
  function ok(action, args, cwd, cliSource) {
    const result = run(action, args, cwd, cliSource);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    return result;
  }
  function status(args = [], cwd = root) {
    const result = ok("status", ["--json", ...args], cwd);
    return JSON.parse(result.stdout.slice(result.stdout.indexOf("{")));
  }
  function install() {
    ok("install", ["--scope", "both", "--skill", "requirement-analysis", "--project-root", project]);
  }
  function rejectUpdate(args = [], version) {
    const before = { home: snapshot(home), project: snapshot(project) };
    const result = run("update", args);
    assert.notEqual(result.status, 0, "unsafe update must fail");
    assert.match(result.stderr, /version|downgrade/i);
    if (version) assert.ok(result.stderr.includes(version), result.stderr);
    assert.deepEqual({ home: snapshot(home), project: snapshot(project) }, before,
      "refusal must not change any file bytes or modes");
    return result;
  }
  return { root, source, older, nested, home, project, state, globalManifest, projectManifest,
    run, ok, status, install, rejectUpdate };
}

test("packaged source follows the running CLI from stale and nested checkout directories", (t) => {
  const f = fixture(t);
  for (const cwd of [f.older, f.nested]) {
    const status = f.status([], cwd);
    assert.equal(status.repo_root, f.source);
    assert.equal(status.source_bundle_version, sourceVersion);
  }
});

test("explicit source wins and an invalid explicit source never falls back", (t) => {
  const f = fixture(t);
  assert.equal(f.status(["--repo-root", f.older]).source_bundle_version, "2.7.0");
  const bad = f.run("status", ["--repo-root", f.project], f.nested);
  assert.notEqual(bad.status, 0);
  assert.match(bad.stderr, /Missing workflow bundle manifest/);
});

for (const mode of ["codex", "claude"]) {
  test(`${mode}: update from stale cwd retains the running CLI release`, (t) => {
    const f = fixture(t, mode);
    f.install();
    f.ok("update", [], f.nested);
    assert.equal(f.status().installed_bundle_version, sourceVersion);
    assert.equal(fs.readFileSync(path.join(f.project, "README.md"), "utf8"), "User project; retain these bytes.\n");
    assert.equal(fs.statSync(path.join(f.project, "README.md")).mode & 0o777, 0o444);
  });

  test(`${mode}: explicitly selected older source is refused before any write`, (t) => {
    const f = fixture(t, mode);
    f.install();
    const result = f.rejectUpdate(["--repo-root", f.older], "2.7.0");
    assert.ok(result.stderr.includes(sourceVersion), result.stderr);
    assert.ok(result.stderr.includes(f.home), result.stderr);
  });

  test(`${mode}: newer integration metadata protects runtime and selected projects`, (t) => {
    const f = fixture(t, mode);
    f.install();
    editJson(f.globalManifest, { bundle_version: "99.0.0" });
    f.rejectUpdate(["--scope", "project", "--project-root", f.project], "99.0.0");
    editJson(f.globalManifest, { bundle_version: sourceVersion });
    editJson(f.projectManifest, { bundle_version: "99.0.0" });
    const result = f.rejectUpdate([], "99.0.0");
    assert.ok(result.stderr.includes(f.project), result.stderr);
    // A global-only update must not inspect or alter an unselected newer project.
    const before = snapshot(f.project);
    f.ok("update", ["--scope", "global"]);
    assert.deepEqual(snapshot(f.project), before);
    const other = path.join(f.root, "other-project");
    fs.cpSync(f.project, other, { recursive: true });
    editJson(path.join(other, `.${mode}`, "code-factory", "install.json"), { bundle_version: sourceVersion });
    f.ok("update", ["--scope", "project", "--project-root", other]);
    assert.deepEqual(snapshot(f.project), before);
    // --repo-root can change policies/skills, but lifecycle helpers still ship
    // with the running CLI. A newer alternate source must not hide older helpers.
    editJson(f.projectManifest, { bundle_version: "2.11.0" });
    editJson(path.join(f.older, "workflow-bundle.manifest.json"), { bundleVersion: "2.12.0" });
    f.rejectUpdate(["--scope", "both", "--project-root", f.project, "--repo-root", f.older], "2.11.0");
  });

  test(`${mode}: fresh, equal, forward, deliberate reinstall and context rollback remain usable`, (t) => {
    const f = fixture(t, mode);
    f.ok("install", ["--scope", "both", "--skill", "requirement-analysis", "--project-root", f.project], f.root, f.older);
    assert.equal(f.status().installed_bundle_version, "2.7.0");
    f.ok("update");
    f.ok("update");
    assert.equal(f.status().installed_bundle_version, sourceVersion);
    f.ok("install", ["--repo-root", f.older, "--scope", "both", "--skill", "requirement-analysis", "--project-root", f.project], f.root, f.older);
    assert.equal(f.status().installed_bundle_version, "2.7.0");
    const before = snapshot(f.home);
    f.ok("update", ["--rollback-context", "--project-root", f.project], f.root, f.older);
    assert.deepEqual(snapshot(f.home), before);
  });
}

test("installed versions compare numeric major/minor/patch boundaries; unsupported versions fail closed", (t) => {
  const f = fixture(t);
  f.install();
  for (const installed of ["2.7.0", "2.9.99", sourceVersion, ""]) {
    editJson(f.state, { installed_bundle_version: installed });
    f.ok("update");
  }
  for (const installed of ["2.10.2", "2.11.0", "10.0.0", "unknown", "2.10", "2.10.1-beta.1"]) {
    editJson(f.state, { installed_bundle_version: installed });
    f.rejectUpdate([], installed);
  }
});

test("unsupported source version is rejected and a new home can bootstrap with update", (t) => {
  const f = fixture(t);
  f.ok("update", ["--scope", "global", "--skill", "requirement-analysis"]);
  editJson(path.join(f.source, "workflow-bundle.manifest.json"), { bundleVersion: "unknown" });
  f.rejectUpdate([], "unknown");
});
