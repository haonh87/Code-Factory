import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import cp from "node:child_process";
import { syncBuiltinESMExports } from "node:module";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import { resolveRepoPath, inspectRepository, ensureRepository } from "../src/core.js";

function fixture(t) {
  const base = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "containment-")));
  const root = path.join(base, "root");
  const outside = path.join(base, "root-other");
  fs.mkdirSync(root); fs.mkdirSync(outside);
  fs.mkdirSync(path.join(root, "repo"));
  const previous = process.env.GITHUB_PUSH_ALLOWED_ROOT;
  process.env.GITHUB_PUSH_ALLOWED_ROOT = root;
  t.after(() => {
    if (previous === undefined) delete process.env.GITHUB_PUSH_ALLOWED_ROOT;
    else process.env.GITHUB_PUSH_ALLOWED_ROOT = previous;
    t.mock.restoreAll(); syncBuiltinESMExports();
    fs.rmSync(base, { recursive: true, force: true });
  });
  const link = (target, name) => {
    const dest = path.join(root, name);
    fs.symlinkSync(target, dest, process.platform === "win32" ? "junction" : "dir");
    return dest;
  };
  return { base, root, outside, link };
}

function stubGit(t) {
  const calls = [];
  t.mock.method(cp, "spawn", (command, args) => {
    calls.push({ command, args });
    const child = new EventEmitter();
    child.stdout = new PassThrough(); child.stderr = new PassThrough();
    process.nextTick(() => {
      child.stdout.end(args.includes("--is-inside-work-tree") ? "true" : args.includes("status") ? "## main" : "");
      child.stderr.end(); child.emit("close", 0);
    });
    return child;
  });
  syncBuiltinESMExports();
  return calls;
}

for (const kind of ["sibling", "traversal", "escape", "chain", "cycle", "dangling", "file", "missing", "null", "nul", "object"]) {
  test(`repository rejects ${kind} before Git launch`, async (t) => {
    const f = fixture(t);
    let candidate;
    switch (kind) {
      case "sibling": candidate = f.outside; break;
      case "traversal": candidate = path.join(f.root, "..", "root-other"); break;
      case "escape": candidate = f.link(f.outside, "escape"); break;
      case "chain": candidate = f.link(f.link(f.outside, "escape"), "chain"); break;
      case "cycle": candidate = f.link(path.join(f.root, "cycle"), "cycle"); break;
      case "dangling": candidate = f.link(path.join(f.outside, "absent"), "dangling"); break;
      case "file": candidate = path.join(f.root, "file"); fs.writeFileSync(candidate, "sentinel"); break;
      case "missing": candidate = path.join(f.root, "absent"); break;
      case "null": candidate = null; break;
      case "nul": candidate = f.root + "\0secret"; break;
      default: candidate = {};
    }
    const calls = stubGit(t);
    await assert.rejects(() => inspectRepository(candidate));
    assert.equal(calls.length, 0);
  });
}

test("canonical root aliases, contained directory links and ..notes are accepted", async (t) => {
  const f = fixture(t);
  const repo = path.join(f.root, "repo");
  const alias = path.join(f.base, "root-alias");
  fs.symlinkSync(f.root, alias, process.platform === "win32" ? "junction" : "dir");
  fs.mkdirSync(path.join(f.root, "..notes"));
  assert.equal(resolveRepoPath(path.join(alias, "repo"), alias), repo);
  assert.equal(resolveRepoPath(repo, alias), repo);
  assert.equal(resolveRepoPath(f.link(repo, "contained"), f.root), repo);
  assert.equal(resolveRepoPath(path.join(f.root, "..notes"), f.root), path.join(f.root, "..notes"));
  const calls = stubGit(t);
  await inspectRepository(path.join(f.root, "contained"));
  assert.ok(calls.length > 0);
  assert.ok(calls.every(({ args }) => args[1] === repo));
});

test("missing root and non-directory ancestor fail closed", (t) => {
  const f = fixture(t);
  const absent = path.join(f.base, "absent");
  assert.throws(() => resolveRepoPath(path.join(absent, "new"), absent));
  fs.writeFileSync(path.join(f.root, "file"), "sentinel");
  assert.throws(() => resolveRepoPath(path.join(f.root, "file", "new"), f.root));
});

test("permission/canonicalization failure has a bounded diagnostic", (t) => {
  const f = fixture(t);
  t.mock.method(fs, "realpathSync", () => { throw Object.assign(new Error("PRIVATE_SENTINEL"), { code: "EACCES" }); });
  syncBuiltinESMExports();
  assert.throws(() => resolveRepoPath(path.join(f.root, "repo"), f.root), (error) => {
    assert.ok(error.message.length < 200);
    assert.ok(!error.message.includes("PRIVATE_SENTINEL"));
    return true;
  });
});

test("retargeted link is checked again on the next operation", async (t) => {
  const f = fixture(t);
  const link = f.link(path.join(f.root, "repo"), "move");
  const calls = stubGit(t);
  await inspectRepository(link);
  calls.length = 0;
  fs.unlinkSync(link);
  fs.symlinkSync(f.outside, link, process.platform === "win32" ? "junction" : "dir");
  await assert.rejects(() => inspectRepository(link));
  assert.equal(calls.length, 0);
});

test("creation follows a contained parent and initializes a local repository", async (t) => {
  const f = fixture(t);
  const parent = f.link(path.join(f.root, "repo"), "parent");
  const originalSpawn = cp.spawn;
  t.mock.method(cp, "spawn", (command, args, options) => originalSpawn(command, args, {
    ...options, timeout: 10000,
    env: { PATH: process.env.PATH, SystemRoot: process.env.SystemRoot,
      GITHUB_PUSH_ALLOWED_ROOT: f.root, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: os.devNull,
      GIT_ALLOW_PROTOCOL: "file", GIT_TERMINAL_PROMPT: "0", GIT_CONFIG_COUNT: "2",
      GIT_CONFIG_KEY_0: "core.hooksPath", GIT_CONFIG_VALUE_0: path.join(f.base, "no-hooks"),
      GIT_CONFIG_KEY_1: "credential.helper", GIT_CONFIG_VALUE_1: "" },
  }));
  syncBuiltinESMExports();
  const result = await ensureRepository(path.join(parent, "new", "nested"), { initializeIfMissing: true });
  assert.equal(result.repoPath, path.join(f.root, "repo", "new", "nested"));
  assert.equal(result.initializedRepository, true);
  assert.ok(fs.statSync(path.join(result.repoPath, ".git")).isDirectory());
  assert.deepEqual(fs.readdirSync(f.outside), []);
});

for (const kind of ["escaped-parent", "dangling-parent", "file-parent", "missing-root"]) {
  test(`creation rejects ${kind} without writes or Git`, async (t) => {
    const f = fixture(t);
    let parent;
    if (kind === "escaped-parent") parent = f.link(f.outside, "parent");
    if (kind === "dangling-parent") parent = f.link(path.join(f.outside, "absent"), "parent");
    if (kind === "file-parent") { parent = path.join(f.root, "file"); fs.writeFileSync(parent, "sentinel"); }
    if (kind === "missing-root") { parent = path.join(f.base, "absent"); process.env.GITHUB_PUSH_ALLOWED_ROOT = parent; }
    const calls = stubGit(t);
    await assert.rejects(() => ensureRepository(path.join(parent, "new"), { initializeIfMissing: true }));
    assert.equal(calls.length, 0);
    assert.deepEqual(fs.readdirSync(f.outside), []);
  });
}

test("creation revalidates after mkdir before init", async (t) => {
  const f = fixture(t);
  const candidate = path.join(f.root, "new");
  const calls = stubGit(t);
  t.mock.method(fs.promises, "mkdir", async () => {
    fs.symlinkSync(f.outside, candidate, process.platform === "win32" ? "junction" : "dir");
  });
  await assert.rejects(() => ensureRepository(candidate, { initializeIfMissing: true }));
  assert.equal(calls.length, 0);
  assert.deepEqual(fs.readdirSync(f.outside), []);
});

test("file symlink outside cannot be used as a repository", async (t) => {
  const f = fixture(t);
  const file = path.join(f.outside, "file");
  fs.writeFileSync(file, "sentinel");
  const alias = path.join(f.root, "file-alias");
  fs.symlinkSync(file, alias, "file");
  const calls = stubGit(t);
  await assert.rejects(() => inspectRepository(alias));
  assert.equal(calls.length, 0);
});
