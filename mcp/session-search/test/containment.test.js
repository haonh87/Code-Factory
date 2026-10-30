import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import cp from "node:child_process";
import { syncBuiltinESMExports } from "node:module";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import { resolveSessionPath, resolveWorkspacePath, viewSession, getRelatedSessions, listSessions, searchSessions } from "../src/core.js";

function fixture(t) {
  const base = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "session-containment-")));
  const root = path.join(base, "workspace");
  const sessions = path.join(base, "sessions");
  const outside = path.join(base, "workspace-other");
  for (const dir of [root, sessions, outside, path.join(root, "project"), path.join(root, "other")]) fs.mkdirSync(dir);
  const previous = { ...process.env };
  process.env.SESSION_SEARCH_ALLOWED_ROOT = root;
  process.env.SESSION_SEARCH_SESSIONS_ROOT = sessions;
  process.env.SESSION_SEARCH_CASS_BIN = "test-cass-never-launched";
  t.after(() => {
    for (const key of ["SESSION_SEARCH_ALLOWED_ROOT", "SESSION_SEARCH_SESSIONS_ROOT", "SESSION_SEARCH_CASS_BIN"]) {
      if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key];
    }
    t.mock.restoreAll(); syncBuiltinESMExports();
    fs.rmSync(base, { recursive: true, force: true });
  });
  const transcript = (name, workspace = path.join(root, "project"), directory = sessions) => {
    const file = path.join(directory, name);
    fs.writeFileSync(file, JSON.stringify({ type: "session_meta", payload: { cwd: workspace } }) + "\n");
    return file;
  };
  const link = (target, dest, directory = true) => {
    fs.symlinkSync(target, dest, directory ? (process.platform === "win32" ? "junction" : "dir") : "file");
    return dest;
  };
  return { base, root, sessions, outside, transcript, link, project: path.join(root, "project") };
}

function stubCass(t, response = {}) {
  const calls = [];
  t.mock.method(cp, "spawn", (command, args) => {
    calls.push({ command, args });
    const child = new EventEmitter();
    child.stdout = new PassThrough(); child.stderr = new PassThrough();
    process.nextTick(() => {
      child.stdout.end(JSON.stringify(typeof response === "function" ? response(args, calls.length) : response));
      child.stderr.end(); child.emit("close", 0);
    });
    return child;
  });
  syncBuiltinESMExports();
  return calls;
}

for (const kind of ["directory-escape", "file-escape", "chain", "cycle", "dangling", "missing", "directory", "nul", "object"]) {
  test(`view/context reject ${kind} before transcript open or cass`, async (t) => {
    const f = fixture(t);
    const outsideFile = f.transcript("outside.jsonl", f.project, f.outside);
    let candidate;
    switch (kind) {
      case "directory-escape": candidate = path.join(f.link(f.outside, path.join(f.sessions, "escape")), "outside.jsonl"); break;
      case "file-escape": candidate = f.link(outsideFile, path.join(f.sessions, "escape.jsonl"), false); break;
      case "chain": candidate = f.link(f.link(outsideFile, path.join(f.sessions, "first"), false), path.join(f.sessions, "second"), false); break;
      case "cycle": candidate = f.link(path.join(f.sessions, "cycle"), path.join(f.sessions, "cycle"), false); break;
      case "dangling": candidate = f.link(path.join(f.outside, "absent"), path.join(f.sessions, "dangling"), false); break;
      case "missing": candidate = path.join(f.sessions, "absent"); break;
      case "directory": candidate = f.sessions; break;
      case "nul": candidate = f.sessions + "\0PRIVATE"; break;
      default: candidate = {};
    }
    const calls = stubCass(t);
    let opens = 0;
    const originalRead = fs.createReadStream;
    t.mock.method(fs, "createReadStream", (...args) => { opens++; return originalRead(...args); });
    syncBuiltinESMExports();
    await assert.rejects(() => viewSession({ sessionPath: candidate }));
    await assert.rejects(() => getRelatedSessions({ sessionPath: candidate }));
    assert.equal(opens, 0);
    assert.equal(calls.length, 0);
  });
}

test("contained file alias is canonical downstream and retargeting is rejected", async (t) => {
  const f = fixture(t);
  const file = f.transcript("good.jsonl");
  const alias = f.link(file, path.join(f.sessions, "alias.jsonl"), false);
  const calls = stubCass(t, { path: alias, lines: [] });
  assert.equal(resolveSessionPath(alias), file);
  const result = await viewSession({ sessionPath: alias });
  assert.equal(result.path, file);
  assert.ok(calls[0].args.includes(file));
  fs.unlinkSync(alias);
  f.link(f.transcript("outside.jsonl", f.project, f.outside), alias, false);
  await assert.rejects(() => viewSession({ sessionPath: alias }));
  assert.equal(calls.length, 1);
});

test("historical workspace suffixes and configured root aliases are canonical", (t) => {
  const f = fixture(t);
  const alias = f.link(f.root, path.join(f.base, "root-alias"));
  const parent = f.link(f.project, path.join(f.root, "parent"));
  assert.equal(resolveWorkspacePath(path.join(parent, "missing", "nested")), path.join(f.project, "missing", "nested"));
  assert.equal(resolveWorkspacePath(path.join(alias, "project"), alias), f.project);
  assert.equal(resolveWorkspacePath(f.project, alias), f.project);
  fs.mkdirSync(path.join(f.root, "..notes"));
  assert.equal(resolveWorkspacePath(path.join(f.root, "..notes")), path.join(f.root, "..notes"));
});

for (const kind of ["escape", "dangling", "cycle", "file-parent", "missing-root", "nul", "null", "object", "sibling", "traversal"]) {
  test(`workspace rejects ${kind}`, (t) => {
    const f = fixture(t);
    let candidate;
    switch (kind) {
      case "escape": candidate = path.join(f.link(f.outside, path.join(f.root, "escape")), "history"); break;
      case "dangling": candidate = path.join(f.link(path.join(f.outside, "absent"), path.join(f.root, "link")), "history"); break;
      case "cycle": candidate = f.link(path.join(f.root, "cycle"), path.join(f.root, "cycle")); break;
      case "file-parent": candidate = path.join(f.transcript("file", f.project, f.root), "history"); break;
      case "missing-root": process.env.SESSION_SEARCH_ALLOWED_ROOT = path.join(f.base, "absent"); candidate = path.join(f.base, "absent", "history"); break;
      case "nul": candidate = f.root + "\0PRIVATE"; break;
      case "null": candidate = null; break;
      case "object": candidate = {}; break;
      case "sibling": candidate = f.outside; break;
      default: candidate = path.join(f.root, "..", "workspace-other");
    }
    assert.throws(() => resolveWorkspacePath(candidate));
  });
}

test("canonicalization permission failures are bounded and fail closed", async (t) => {
  const f = fixture(t);
  const file = f.transcript("good.jsonl");
  const calls = stubCass(t);
  t.mock.method(fs, "realpathSync", () => { throw Object.assign(new Error("PRIVATE_SENTINEL"), { code: "EACCES" }); });
  syncBuiltinESMExports();
  for (const resolve of [() => resolveSessionPath(file), () => resolveWorkspacePath(f.project)]) {
    assert.throws(resolve, (error) => error.message.length < 200 && !error.message.includes("PRIVATE_SENTINEL"));
  }
  await assert.rejects(() => viewSession({ sessionPath: file }));
  assert.equal(calls.length, 0);
});

function mixedRecords(f) {
  const good = f.transcript("good.jsonl");
  const historical = f.transcript("history.jsonl", path.join(f.project, "deleted"));
  const badWorkspace = f.transcript("outside-workspace.jsonl", f.outside);
  const otherWorkspace = f.transcript("other-workspace.jsonl", path.join(f.root, "other"));
  const outsideFile = f.transcript("outside-file.jsonl", f.project, f.outside);
  const alias = f.link(good, path.join(f.sessions, "alias.jsonl"), false);
  const records = [
    { path: outsideFile, workspace: f.project, title: "OUTSIDE" },
    { path: badWorkspace, workspace: f.project, title: "LIE" },
    { path: otherWorkspace, workspace: path.join(f.root, "other"), title: "OTHER" },
    { path: good, workspace: path.join(f.project, "wrong"), title: "CONTRADICTORY" },
    { path: path.join(f.sessions, "missing"), workspace: f.project, title: "STALE" },
    { path: good, workspace: {}, title: "INVALID" },
    { path: alias, workspace: f.project, title: "GOOD" },
    { path: historical, workspace: path.join(f.project, "deleted"), title: "HISTORY" },
  ];
  return { records, good, historical };
}

test("list filters source files and actual/declared workspace before applying limit", async (t) => {
  const f = fixture(t);
  const { records, good, historical } = mixedRecords(f);
  stubCass(t, { sessions: records });
  const result = await listSessions({ workspacePath: f.project, limit: 2 });
  assert.deepEqual(result.sessions.map((s) => s.title), ["GOOD", "HISTORY"]);
  assert.deepEqual(result.sessions.map((s) => s.path), [good, historical]);
  assert.equal(result.returned, 2);
});

test("search filters across pages and preserves bounded pagination", async (t) => {
  const f = fixture(t);
  const { records, good } = mixedRecords(f);
  const hits = records.map((r) => ({ ...r, source_path: r.path, content: r.title }));
  const calls = stubCass(t, (args, count) => count === 1
    ? { hits: hits.slice(0, 6), cursor: "page-2", total_matches: 8 }
    : { hits: hits.slice(6), cursor: null, total_matches: 8 });
  const result = await searchSessions({ query: "test", workspacePath: f.project, limit: 1 });
  assert.deepEqual(result.hits.map((h) => h.content), ["GOOD"]);
  assert.equal(result.hits[0].sessionPath, good);
  assert.equal(result.pagesScanned, 2);
  assert.equal(result.rawHitsScanned, 8);
  assert.ok(calls[1].args.includes("page-2"));
});

test("search stops after the existing ten-page cap when all results are invalid", async (t) => {
  const f = fixture(t);
  const calls = stubCass(t, { hits: [{ source_path: path.join(f.sessions, "missing"), workspace: f.project }], cursor: "next" });
  const result = await searchSessions({ query: "test", workspacePath: f.project });
  assert.equal(calls.length, 10);
  assert.equal(result.pagesScanned, 10);
  assert.equal(result.partial, true);
  assert.deepEqual(result.hits, []);
});

test("related groups are restricted to the source workspace and validated source paths", async (t) => {
  const f = fixture(t);
  const { records, good } = mixedRecords(f);
  stubCass(t, { source: { path: "incorrect", workspace: "incorrect" }, related: {
    same_workspace: records, same_day: records, same_agent: records,
  } });
  const result = await getRelatedSessions({ sessionPath: good, limit: 1 });
  assert.equal(result.source.path, good);
  assert.equal(result.source.workspace, f.project);
  for (const group of Object.values(result.related)) {
    assert.deepEqual(group.map((s) => s.title), ["GOOD"]);
    assert.equal(group[0].path, good);
  }
});

test("transcript read failures have bounded diagnostics and never invoke cass", async (t) => {
  const f = fixture(t);
  const file = f.transcript("good.jsonl");
  const calls = stubCass(t);
  t.mock.method(fs, "createReadStream", () => {
    const stream = new PassThrough();
    process.nextTick(() => stream.destroy(Object.assign(new Error("PRIVATE_SENTINEL"), { code: "EACCES" })));
    return stream;
  });
  syncBuiltinESMExports();
  await assert.rejects(() => viewSession({ sessionPath: file }), (error) => error.message.length < 200 && !error.message.includes("PRIVATE_SENTINEL"));
  assert.equal(calls.length, 0);
});

test("an escaped actual workspace is rejected before cass despite an in-root file", async (t) => {
  const f = fixture(t);
  const workspace = f.link(f.outside, path.join(f.root, "escaped"));
  const file = f.transcript("bad.jsonl", path.join(workspace, "deleted"));
  const calls = stubCass(t);
  await assert.rejects(() => viewSession({ sessionPath: file }));
  await assert.rejects(() => getRelatedSessions({ sessionPath: file }));
  assert.equal(calls.length, 0);
});

test("missing sessions root and non-directory file ancestor reject before cass", async (t) => {
  const f = fixture(t);
  const file = f.transcript("good.jsonl");
  const calls = stubCass(t);
  await assert.rejects(() => viewSession({ sessionPath: path.join(file, "child") }));
  process.env.SESSION_SEARCH_SESSIONS_ROOT = path.join(f.base, "absent");
  await assert.rejects(() => viewSession({ sessionPath: path.join(f.base, "absent", "file") }));
  assert.equal(calls.length, 0);
});
