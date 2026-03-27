import test from "node:test";
import assert from "node:assert/strict";

import {
  parseGitRemotes,
  parseGitStatusPorcelain,
  resolveRepoPath,
} from "../src/core.js";

test("resolveRepoPath keeps repository inside allowed root", () => {
  const allowedRoot = "D:\\workspace\\root";
  const resolved = resolveRepoPath("D:\\workspace\\root\\repo", allowedRoot);

  assert.equal(resolved, "D:\\workspace\\root\\repo");
});

test("resolveRepoPath rejects repository outside allowed root", () => {
  const allowedRoot = "D:\\workspace\\root";

  assert.throws(
    () => resolveRepoPath("D:\\workspace\\other\\repo", allowedRoot),
    /allowed root/i,
  );
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
