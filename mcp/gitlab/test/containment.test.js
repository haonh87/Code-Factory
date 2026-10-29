import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import cp from "node:child_process";
import { syncBuiltinESMExports } from "node:module";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import { resolveRepoPath, inspectRepository } from "../src/core.js";

function fixture(t) {
  const base = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "containment-")));
  const root = path.join(base, "root");
  const outside = path.join(base, "root-other");
  fs.mkdirSync(root); fs.mkdirSync(outside);
  fs.mkdirSync(path.join(root, "repo"));
  const previous = process.env.GITLAB_ALLOWED_ROOT;
  process.env.GITLAB_ALLOWED_ROOT = root;
  t.after(() => {
    if (previous === undefined) delete process.env.GITLAB_ALLOWED_ROOT;
    else process.env.GITLAB_ALLOWED_ROOT = previous;
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
