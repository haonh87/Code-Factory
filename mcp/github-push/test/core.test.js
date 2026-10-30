import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  parseGitRemotes,
  parseGitStatusPorcelain,
  resolveRepoPath,
} from "../src/core.js";

test("resolveRepoPath uses an existing portable root", (t) => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "github-path-")));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, "repo"));
  assert.equal(resolveRepoPath(path.join(root, "repo"), root), path.join(root, "repo"));
  assert.throws(() => resolveRepoPath(root + "-other", root), /allowed root/i);
});

test("parseGitStatusPorcelain extracts staged, unstaged, and untracked files", () => {
  const output = [
    "## main...origin/main [ahead 1]",
    "M  README.md",
    " M docs/spec.md",
    "?? mcp/github-push/src/index.js",
  ].join("\n");

  const parsed = parseGitStatusPorcelain(output);

  assert.equal(parsed.branch, "main");
  assert.deepEqual(parsed.staged, ["README.md"]);
  assert.deepEqual(parsed.unstaged, ["docs/spec.md"]);
  assert.deepEqual(parsed.untracked, ["mcp/github-push/src/index.js"]);
  assert.equal(parsed.clean, false);
});

test("parseGitRemotes groups fetch and push URLs per remote", () => {
  const output = [
    "origin https://github.com/example/demo.git (fetch)",
    "origin https://github.com/example/demo.git (push)",
  ].join("\n");

  const parsed = parseGitRemotes(output);

  assert.deepEqual(parsed, {
    origin: {
      fetch: "https://github.com/example/demo.git",
      push: "https://github.com/example/demo.git",
    },
  });
});
