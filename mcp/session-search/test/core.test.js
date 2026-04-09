import test from "node:test";
import assert from "node:assert/strict";

import {
  isPathInside,
  parseSessionWorkspaceFromLines,
  resolveSessionPath,
  resolveWorkspacePath,
  sanitizeStatus,
  truncateText,
} from "../src/core.js";

test("isPathInside accepts nested paths", () => {
  assert.equal(
    isPathInside("/Users/example/work/root/project", "/Users/example/work/root"),
    true,
  );
});

test("resolveWorkspacePath keeps workspace inside allowed root", () => {
  const resolved = resolveWorkspacePath("/workspace/root/project", "/workspace/root");
  assert.equal(resolved, "/workspace/root/project");
});

test("resolveWorkspacePath rejects workspace outside allowed root", () => {
  assert.throws(
    () => resolveWorkspacePath("/workspace/other/project", "/workspace/root"),
    /allowed root/i,
  );
});

test("resolveSessionPath keeps session inside sessions root", () => {
  const resolved = resolveSessionPath(
    "/Users/example/.codex/sessions/2026/04/09/session.jsonl",
    "/Users/example/.codex/sessions",
  );

  assert.equal(resolved, "/Users/example/.codex/sessions/2026/04/09/session.jsonl");
});

test("resolveSessionPath rejects session outside sessions root", () => {
  assert.throws(
    () => resolveSessionPath(
      "/Users/example/Documents/private.txt",
      "/Users/example/.codex/sessions",
    ),
    /sessions root/i,
  );
});

test("parseSessionWorkspaceFromLines extracts cwd from session_meta", () => {
  const workspace = parseSessionWorkspaceFromLines([
    JSON.stringify({
      type: "session_meta",
      payload: {
        cwd: "/Users/example/workspaces/repo",
      },
    }),
  ]);

  assert.equal(workspace, "/Users/example/workspaces/repo");
});

test("parseSessionWorkspaceFromLines falls back to turn_context", () => {
  const workspace = parseSessionWorkspaceFromLines([
    "{\"type\":\"ignored\",\"payload\":{}}",
    JSON.stringify({
      type: "turn_context",
      payload: {
        cwd: "/Users/example/workspaces/repo-2",
      },
    }),
  ]);

  assert.equal(workspace, "/Users/example/workspaces/repo-2");
});

test("truncateText preserves short strings and truncates long strings", () => {
  assert.deepEqual(truncateText("short", 10), {
    text: "short",
    truncated: false,
  });

  assert.deepEqual(truncateText("abcdefghijklmnopqrstuvwxyz", 10), {
    text: "abcdefg...",
    truncated: true,
  });
});

test("sanitizeStatus removes sensitive cass paths while keeping health summary", () => {
  const sanitized = sanitizeStatus({
    status: "healthy",
    healthy: true,
    recommended_action: null,
    index: {
      exists: true,
      status: "fresh",
      reason: null,
      fresh: true,
      last_indexed_at: "2026-04-09T00:00:00Z",
      age_seconds: 30,
      stale: false,
      stale_threshold_seconds: 1800,
      rebuilding: false,
    },
    database: {
      exists: true,
      opened: true,
      conversations: 5,
      messages: 99,
      path: "/Users/example/Library/Application Support/cass/db.sqlite",
      open_error: null,
      open_retryable: false,
    },
    semantic: {
      status: "ready",
      availability: "ready",
      summary: "semantic ready",
      available: true,
      can_search: true,
      preferred_backend: "fastembed",
      embedder_id: "minilm-384",
      hnsw_ready: true,
      progressive_ready: false,
      hint: null,
      vector_index_path: "/Users/example/vector",
    },
    pending: {
      sessions: 0,
      watch_active: false,
      orphaned: false,
    },
    rebuild: {
      active: false,
      orphaned: false,
      mode: null,
      phase: null,
      processed_conversations: null,
      total_conversations: null,
      indexed_docs: null,
    },
    _meta: {
      timestamp: "2026-04-09T00:00:00Z",
      data_dir: "/Users/example/.cass",
      db_path: "/Users/example/.cass/db.sqlite",
    },
  });

  assert.equal(sanitized.healthy, true);
  assert.equal("path" in sanitized.database, false);
  assert.equal("vectorIndexPath" in sanitized.semantic, false);
});
