"use strict";

// Destructive integration fixtures: dedicated disposable GitHub-hosted jobs only.
// Intentionally not named *.test.js: never discovered by the personal unit runner.
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const repo = path.resolve(__dirname, "../../..");
const args = process.argv.slice(2);
const option = (name) => args[args.indexOf(name) + 1];
const sha = (data) => crypto.createHash("sha256").update(data).digest("hex");
const exists = (p) => { try { return fs.lstatSync(p); } catch (e) { if (e.code === "ENOENT") return null; throw e; } };
function run(command, argv, extra = {}) {
  const result = spawnSync(command, argv, { encoding: "utf8", timeout: 30000, maxBuffer: 4 * 1024 * 1024, ...extra });
  if (result.error) throw result.error;
  return result;
}
function must(command, argv) {
  const result = run(command, argv);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout.trim();
}
const psQuote = (value) => "'" + value.replace(/'/g, "''") + "'";
function ordinaryDirectory(p) {
  const st = fs.lstatSync(p);
  assert(st.isDirectory() && !st.isSymbolicLink(), `Not an ordinary directory: ${p}`);
}
function physicalDirectory(p) {
  const real = fs.realpathSync(p);
  ordinaryDirectory(real);
  for (let current = real; ; current = path.dirname(current)) {
    ordinaryDirectory(current);
    if (path.dirname(current) === current) break;
  }
  return real;
}
function inventory(root) {
  const rows = [];
  function visit(p, relative) {
    const st = exists(p);
    if (!st) { rows.push({ path: relative, type: "absent" }); return; }
    const row = { path: relative, mode: st.mode, links: st.nlink };
    if (st.isSymbolicLink()) Object.assign(row, { type: "link", target: fs.readlinkSync(p) });
    else if (st.isDirectory()) row.type = "directory";
    else if (st.isFile()) Object.assign(row, { type: "file", sha256: sha(fs.readFileSync(p)) });
    else throw new Error(`Unsupported fixture node: ${p}`);
    rows.push(row);
    if (row.type === "directory") for (const name of fs.readdirSync(p).sort()) visit(path.join(p, name), path.join(relative, name));
  }
  visit(root, ".");
  return rows;
}

function main() {
  // These guards must precede every write, including evidence directories.
  assert(args.includes("--ci-disposable"), "Explicit --ci-disposable required");
  assert.equal(process.env.GITHUB_ACTIONS, "true", "GitHub Actions required");
  assert.equal(process.env.RUNNER_ENVIRONMENT, "github-hosted", "Disposable GitHub-hosted runner required");
  const engine = option("--engine");
  assert(["bash", "powershell51"].includes(engine), "Known engine required");
  assert.equal(engine === "powershell51", process.platform === "win32", "Engine/platform mismatch");
  assert(["win32", "linux", "darwin"].includes(process.platform));
  const shell = engine === "bash" ? "/bin/bash" : "powershell.exe";
  const home = physicalDirectory(os.homedir());
  const nativeHome = engine === "bash"
    ? must(shell, ["-c", 'printf "%s" "$HOME"'])
    : must(shell, ["-NoProfile", "-NonInteractive", "-Command", "[Console]::Write($HOME)"]);
  assert.equal(fs.realpathSync(nativeHome), home, "Native and Node home disagree");
  const version = engine === "bash" ? must(shell, ["--version"])
    : must(shell, ["-NoProfile", "-NonInteractive", "-Command", "if ($PSVersionTable.PSEdition -ne 'Desktop' -or $PSVersionTable.PSVersion.Major -ne 5 -or $PSVersionTable.PSVersion.Minor -ne 1) { throw 'Desktop 5.1 required' }; $PSVersionTable | Out-String"]);
  if (process.platform === "darwin") assert.match(version, /version 3\.2\./, "Stock Bash 3.2 required");
  assert(process.env.RUNNER_TEMP, "Runner temp required");
  const temp = physicalDirectory(process.env.RUNNER_TEMP);
  const target = path.join(home, ".codex");
  assert.equal(exists(target), null, "Pre-existing .codex: abort without modifying it");
  const evidence = path.resolve(option("--evidence-dir") || "");
  assert.equal(evidence, path.join(repo, ".artifacts", "installer-containment", process.platform === "win32" ? "windows" : process.platform === "darwin" ? "macos" : "linux"), "Unexpected evidence path");
  const source = path.join(repo, "adapters", "codex", engine === "bash" ? "install-codex-workflow.sh" : "install-codex-workflow.ps1");
  const sourceHash = sha(fs.readFileSync(source));
  const sourceSha = must("git", ["rev-parse", "HEAD"]);
  assert.equal(sourceSha, process.env.GITHUB_SHA, "Checkout must match event SHA");
  fs.mkdirSync(evidence, { recursive: true });
  const work = fs.mkdtempSync(path.join(temp, "installer-containment-"));
  const marker = path.join(work, ".fixture-owner");
  const token = crypto.randomUUID();
  fs.writeFileSync(marker, token);
  const outside = path.join(work, "outside");
  const synthetic = path.join(work, "repo");
  const skills = path.join(target, "skills");
  const current = path.join(target, ".codex-workflow-bundle.managed-skills.txt");
  const legacy = path.join(target, ".codex-workflow-pack.managed-skills.txt");
  const policy = path.join(target, "AGENTS.global.md");
  let targetOwned = false;
  const rows = [];
  const summary = { schema: 1, source_sha: sourceSha, event_sha: process.env.GITHUB_SHA, run_id: process.env.GITHUB_RUN_ID, attempt: process.env.GITHUB_RUN_ATTEMPT,
    workflow_sha256: sha(fs.readFileSync(path.join(repo, ".github/workflows/legacy-installer-containment.yml"))), script_sha256: sourceHash,
    platform: process.platform, os: os.release(), node: process.version, engine: version, image: process.env.ImageOS, image_version: process.env.ImageVersion,
    run_url: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`, cases: rows, status: "FAIL", unexecuted: [] };
  const within = (p, root) => p === root || p.startsWith(root + path.sep);
  function owned(p) { return within(path.resolve(p), target) || within(path.resolve(p), work); }
  function clean(p) {
    assert.equal(fs.readFileSync(marker, "utf8"), token, "Ownership marker changed");
    assert(owned(p) && p !== work && p !== marker, "Unknown cleanup root");
    const st = exists(p);
    if (!st) return;
    if (st.isSymbolicLink() || !st.isDirectory()) fs.unlinkSync(p);
    else { for (const name of fs.readdirSync(p)) clean(path.join(p, name)); fs.rmdirSync(p); }
  }
  function write(p, data) { assert(owned(p)); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, data); }
  function reset() {
    if (targetOwned) clean(target);
    else assert.equal(exists(target), null);
    clean(outside); clean(synthetic);
    fs.mkdirSync(target); targetOwned = true;
    write(path.join(outside, "sentinel.txt"), "outside-preserved\n");
    write(path.join(skills, "unmanaged", "keep.txt"), "unmanaged-preserved\n");
    write(policy, "old-policy\n");
    write(current, "old-skill\n");
    write(path.join(skills, "old-skill", "SKILL.md"), "stale-skill\n");
    write(path.join(synthetic, "policies", "codex", "AGENTS.global.md"), "new-policy\n");
    write(path.join(synthetic, "skills", "category", "alpha", "SKILL.md"), "alpha-source\n");
    write(path.join(synthetic, "skills", "category", "beta", "SKILL.md"), "beta-source\n");
    write(path.join(synthetic, "adapters", "codex", path.basename(source)), fs.readFileSync(source));
  }
  function link(p, destination, type = "dir") {
    assert(owned(p) && owned(destination));
    clean(p);
    fs.symlinkSync(destination, p, type);
  }
  function safety() {
    assert.equal(fs.readFileSync(marker, "utf8"), token);
    ordinaryDirectory(home); ordinaryDirectory(work);
    // All aliases reachable by a legacy candidate must terminate inside fixture ownership.
    for (const root of [target, outside]) for (const row of inventory(root)) if (row.type === "link") {
      const destination = path.resolve(path.dirname(path.join(root, row.path)), row.target);
      assert(owned(destination), `Unowned alias endpoint: ${destination}`);
      if (exists(destination)) assert(owned(fs.realpathSync(destination)), "Alias chain escapes fixture");
    }
    // A native child may delete any descendant of these roots, but nothing else.
    // Every malformed entry used for real execution below is lexically resolved here.
    const selected = exists(current) && !fs.lstatSync(current).isDirectory() ? current : legacy;
    if (exists(selected) && fs.statSync(selected).isFile()) {
      const raw = fs.readFileSync(selected, "utf8").replace(/^\uFEFF/, "");
      for (let name of raw.split(/\n/)) {
        name = name.replace(/\r$/, "");
        if (!name) continue;
        assert(!/^[A-Za-z]:|^[/\\]{2}/.test(name), "Drive/UNC input requires pure-validator fixture");
        assert(owned(path.resolve(skills, name)), `Unsafe legacy cleanup endpoint: ${name}`);
        // Windows normalizes backslashes and trailing dots; check that interpretation too.
        assert(owned(path.resolve(skills, name.replace(/\\/g, "/"))), "Windows-normalized path escapes fixture");
      }
    }
  }
  function invokeLexical(value) {
    // Extract only a pure validation function: never dot-source the installer.
    const text = fs.readFileSync(source, "utf8");
    if (engine === "bash") {
      const match = text.match(/(?:^|\n)(validate_skill_name\(\) \{[\s\S]*?\n\})/);
      if (!match) return { status: 0, signal: null, stdout: "", stderr: "Missing pure name validator" };
      return run(shell, ["-c", match[1] + '\nvalidate_skill_name "$1"', "fixture", value]);
    }
    const command = "$tokens=$null; $errors=$null; $ast=[System.Management.Automation.Language.Parser]::ParseFile(" + psQuote(source) + ", [ref]$tokens, [ref]$errors); if ($errors.Count) { throw 'Parser error' }; $fn=$ast.Find({param($n) $n -is [System.Management.Automation.Language.FunctionDefinitionAst] -and $n.Name -eq 'Assert-SkillName'}, $true); if (-not $fn) { exit 0 }; . ([scriptblock]::Create($fn.Extent.Text)); Assert-SkillName " + psQuote(value);
    return run(shell, ["-NoProfile", "-NonInteractive", "-Command", command]);
  }
  function invoke() {
    safety();
    const copied = path.join(synthetic, "adapters", "codex", path.basename(source));
    assert.equal(sha(fs.readFileSync(copied)), sourceHash);
    return engine === "bash" ? run(shell, [copied]) : run(shell, ["-NoProfile", "-NonInteractive", "-File", copied]);
  }
  const cases = [];
  for (const value of ["\\\\fixture.invalid\\share", "C:\\fixture-only", "C:fixture-only"]) cases.push({ id: "lexical-" + cases.length, expected: "reject", lexical: value, setup() {}, verify() {} });
  function add(id, expected, setup = () => {}, verify = () => {}) { cases.push({ id, expected, setup, verify }); }
  for (const [id, value] of Object.entries({ traversal: "../outside", dot: ".", parent: "..", slash: "alpha/beta", backslash: "alpha\\beta", wildcard: "bad*", colon: "bad:stream", control: "bad\tname", duplicate: "alpha\nalpha", late_invalid: "alpha\nbad name", reserved: "con", upper: "Alpha", trailing_dot: "alpha.", trailing_space: "alpha ", whitespace: " ", embedded_bom: "alpha\n\uFEFFbeta" })) {
    for (const manifest of ["current", "legacy"]) add(`${manifest}-${id}`, "reject", () => { if (manifest === "legacy") clean(current); write(manifest === "current" ? current : legacy, value + "\n"); });
  }
  add("absolute-local-path", "reject", () => write(current, path.join(outside, "sentinel.txt") + "\n"));
  // Absolute/drive/UNC inputs are pure lexical tests when an old native Join-Path
  // could resolve an unowned endpoint. No remote share is accessed.
  if (process.platform === "win32") cases.pop();
  add("duplicate-source", "reject", () => write(path.join(synthetic, "skills", "second", "alpha", "SKILL.md"), "duplicate\n"));
  for (const node of ["root", "skills", "policy", "current", "legacy", "skill", "nested", "dangling"]) add(`alias-${node}`, "reject", () => {
    const destination = ["policy", "current", "legacy"].includes(node) ? path.join(outside, "sentinel.txt") : outside;
    const nodes = { root: target, skills, policy, current, legacy, skill: path.join(skills, "alpha"), nested: path.join(skills, "old-skill", "nested"), dangling: path.join(skills, "alpha") };
    link(nodes[node], node === "dangling" ? path.join(work, "missing") : destination, ["policy", "current", "legacy"].includes(node) ? "file" : "dir");
  });
  if (process.platform === "win32") add("junction-nested", "reject", () => link(path.join(skills, "old-skill", "junction"), outside, "junction"));
  for (const node of ["policy", "current", "legacy"]) add(`hardlink-${node}`, "reject", () => { const p = { policy, current, legacy }[node]; clean(p); fs.linkSync(path.join(outside, "sentinel.txt"), p); });
  for (const node of ["skills", "policy", "current", "legacy", "skill"]) add(`wrong-type-${node}`, "reject", () => {
    const p = { skills, policy, current, legacy, skill: path.join(skills, "alpha") }[node]; clean(p);
    if (["skills", "skill"].includes(node)) write(p, "wrong-type\n"); else fs.mkdirSync(p);
  });
  add("first-install", "install", () => { clean(target); targetOwned = true; }, () => assert(exists(path.join(skills, "alpha", "SKILL.md"))));
  add("repeat-install", "install", () => {}, () => { const before = inventory(target); const second = invoke(); assert.equal(second.status, 0, second.stderr); assert.deepEqual(inventory(target), before); });
  add("current-precedence", "install", () => write(legacy, "unmanaged\n"));
  add("legacy-fallback", "install", () => { clean(current); write(legacy, "old-skill\n"); });
  for (const [id, value] of Object.entries({ lf: "old-skill\n", crlf: "old-skill\r\n", bom: "\uFEFFold-skill\r\n", no_final_newline: "old-skill", empty_records: "\nold-skill\n\n" })) add(`encoding-${id}`, "install", () => write(current, value));
  try {
    // Capability preflight: failures are setup failures, never regression RED.
    reset();
    link(path.join(skills, "link-probe"), outside);
    clean(path.join(skills, "link-probe"));
    if (process.platform === "win32") { link(path.join(skills, "junction-probe"), outside, "junction"); clean(path.join(skills, "junction-probe")); }
    fs.linkSync(path.join(outside, "sentinel.txt"), path.join(target, "hardlink-probe"));
    assert.equal(fs.statSync(path.join(target, "hardlink-probe")).nlink, 2);
    summary.capability_preflight = "PASS";
    // Exercise harness refusal paths without invoking any installer.
    const invocation = [__filename, ...args];
    const guardCases = [
      ["no-flag", [__filename, ...args.filter((a) => a !== "--ci-disposable")], process.env, /Explicit --ci-disposable/],
      ["not-actions", invocation, { ...process.env, GITHUB_ACTIONS: "false" }, /GitHub Actions required/],
      ["wrong-engine", invocation.map((a) => a === engine ? (engine === "bash" ? "powershell51" : "bash") : a), process.env, /Engine\/platform mismatch/],
      ["existing-root", invocation, process.env, /Pre-existing .codex/]
    ];
    summary.guard_checks = [];
    for (const [id, argv, env, message] of guardCases) {
      const before = inventory(target);
      const result = run(process.execPath, argv, { env });
      assert.notEqual(result.status, 0, id);
      assert.match(result.stderr, message, id);
      assert.deepEqual(inventory(target), before, id);
      summary.guard_checks.push({ id, status: "PASS" });
    }
    for (const test of cases) {
      reset(); test.setup();
      // Setup errors abort the suite; assertion differences below are behavior results.
      safety();
      const before = { target: inventory(target), outside: inventory(outside) };
      const result = test.lexical ? invokeLexical(test.lexical) : invoke();
      const after = { target: inventory(target), outside: inventory(outside) };
      let error = "";
      try {
        assert.equal(result.signal, null, "Installer timed out or crashed");
        if (test.expected === "reject") { assert.notEqual(result.status, 0, "Unsafe input accepted"); assert.deepEqual(after, before, "Rejected input mutated fixture"); assert(result.stderr.trim(), "Missing error context"); }
        else {
          assert.equal(result.status, 0, result.stderr);
          assert.equal(fs.readFileSync(policy, "utf8"), "new-policy\n");
          for (const name of ["alpha", "beta"]) assert.equal(fs.readFileSync(path.join(skills, name, "SKILL.md"), "utf8"), `${name}-source\n`);
          assert.equal(exists(path.join(skills, "old-skill")), null, "Stale managed directory retained");
          assert.equal(exists(legacy), null);
          assert.deepEqual(fs.readFileSync(current, "utf8").replace(/^\uFEFF/, "").trim().split(/\r?\n/).sort(), ["alpha", "beta"]);
          assert.deepEqual(after.outside, before.outside);
          if (test.id !== "first-install") assert.equal(fs.readFileSync(path.join(skills, "unmanaged", "keep.txt"), "utf8"), "unmanaged-preserved\n");
        }
        test.verify();
      } catch (e) { error = e.message; }
      fs.writeFileSync(path.join(evidence, `${test.id}.json`), JSON.stringify({ id: test.id, expected: test.expected, exit: result.status, before, after, stdout: result.stdout, stderr: result.stderr, error }, null, 2));
      rows.push({ id: test.id, expected: test.expected, status: error ? "FAIL" : "PASS", exit: result.status });
      console.log(`${error ? "FAIL" : "PASS"} ${test.id}${error ? ": " + error.split("\n")[0] : ""}`);
    }
    summary.status = rows.every((r) => r.status === "PASS") ? "PASS" : "FAIL";
  } catch (e) { summary.setup_error = e.stack; console.error(e.stack); }
  finally {
    summary.unexecuted = cases.map((c) => c.id).filter((id) => !rows.some((r) => r.id === id));
    summary.expected_cases = cases.map((c) => c.id);
    fs.writeFileSync(path.join(evidence, "summary.json"), JSON.stringify(summary, null, 2));
    // Never follow links during fixture cleanup; discard the VM on ambiguity.
    try { if (targetOwned) clean(target); } catch (e) { summary.cleanup_error = e.message; summary.status = "FAIL"; fs.writeFileSync(path.join(evidence, "summary.json"), JSON.stringify(summary, null, 2)); }
  }
  if (summary.status !== "PASS" || summary.unexecuted.length) process.exitCode = 1;
}
try { main(); } catch (e) { console.error(e.message); process.exitCode = 1; }
