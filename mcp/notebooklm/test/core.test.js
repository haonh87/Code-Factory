import test from "node:test";
import assert from "node:assert/strict";

import {
  buildLaunchSpec,
  buildMissingUvxMessage,
  buildNotebookLmArgs,
  resolveUvxBin,
} from "../src/core.js";

test("resolveUvxBin prefers env override", () => {
  assert.equal(resolveUvxBin({ NOTEBOOKLM_MCP_UVX_BIN: "/opt/homebrew/bin/uvx" }), "/opt/homebrew/bin/uvx");
});

test("resolveUvxBin falls back to uvx", () => {
  assert.equal(resolveUvxBin({}), "uvx");
});

test("buildNotebookLmArgs keeps upstream command stable and appends passthrough args", () => {
  assert.deepEqual(buildNotebookLmArgs(["--help"]), [
    "--from",
    "notebooklm-mcp-cli",
    "notebooklm-mcp",
    "--help",
  ]);
});

test("buildLaunchSpec combines command and args", () => {
  assert.deepEqual(buildLaunchSpec({ NOTEBOOKLM_MCP_UVX_BIN: "/usr/local/bin/uvx" }, ["--help"]), {
    command: "/usr/local/bin/uvx",
    args: [
      "--from",
      "notebooklm-mcp-cli",
      "notebooklm-mcp",
      "--help",
    ],
  });
});

test("buildMissingUvxMessage gives a concrete recovery path", () => {
  const message = buildMissingUvxMessage("uvx");

  assert.match(message, /Install uv\/uvx first/i);
  assert.match(message, /NOTEBOOKLM_MCP_UVX_BIN/);
  assert.match(message, /notebooklm-mcp-cli/);
});
