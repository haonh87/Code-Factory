import { spawn } from "node:child_process";
import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

export const DEFAULT_SESSION_LIMIT = 10;
export const MAX_SESSION_LIMIT = 20;
export const DEFAULT_SEARCH_LIMIT = 10;
export const MAX_SEARCH_LIMIT = 20;
export const DEFAULT_SEARCH_SNIPPET_LENGTH = 300;
export const MAX_SEARCH_SNIPPET_LENGTH = 2000;
export const DEFAULT_VIEW_CONTEXT_LINES = 3;
export const MAX_VIEW_CONTEXT_LINES = 10;
export const DEFAULT_VIEW_LINE_LENGTH = 2000;
export const MAX_VIEW_LINE_LENGTH = 4000;
export const DEFAULT_CONTEXT_LIMIT = 5;
export const MAX_CONTEXT_LIMIT = 10;
export const DEFAULT_SEARCH_PAGE_SIZE = 25;
export const MAX_SEARCH_PAGE_SIZE = 50;
export const MAX_SEARCH_PAGES = 10;
export const MAX_SESSION_SCAN_LINES = 20;

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const defaultAllowedRoot = path.resolve(moduleDir, "../../..");

function clampInteger(value, min, max, fallback) {
  if (!Number.isInteger(value)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, value));
}

export function getCassBinary() {
  return process.env.SESSION_SEARCH_CASS_BIN?.trim() || "cass";
}

export function getAllowedRoot() {
  return path.resolve(process.env.SESSION_SEARCH_ALLOWED_ROOT ?? defaultAllowedRoot);
}

export function getSessionsRoot() {
  return path.resolve(process.env.SESSION_SEARCH_SESSIONS_ROOT ?? path.join(os.homedir(), ".codex", "sessions"));
}

export function isPathInside(childPath, parentPath) {
  const relative = path.relative(parentPath, childPath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

export function resolveWorkspacePath(workspacePath, allowedRoot = getAllowedRoot()) {
  const root = path.resolve(allowedRoot);
  const candidate = path.resolve(workspacePath ?? root);

  if (!isPathInside(candidate, root)) {
    throw new Error(`Workspace path must stay inside allowed root: ${root}`);
  }

  return candidate;
}

export function resolveSessionPath(sessionPath, sessionsRoot = getSessionsRoot()) {
  if (!sessionPath) {
    throw new Error("Session path is required");
  }

  const root = path.resolve(sessionsRoot);
  const candidate = path.resolve(sessionPath);

  if (!isPathInside(candidate, root)) {
    throw new Error(`Session path must stay inside sessions root: ${root}`);
  }

  return candidate;
}

export function truncateText(value, maxLength) {
  if (typeof value !== "string") {
    return {
      text: value,
      truncated: false,
    };
  }

  if (value.length <= maxLength) {
    return {
      text: value,
      truncated: false,
    };
  }

  return {
    text: `${value.slice(0, Math.max(0, maxLength - 3))}...`,
    truncated: true,
  };
}

function getWorkspaceCandidateFromEntry(entry) {
  const payload = entry?.payload;

  if (!payload || typeof payload !== "object") {
    return null;
  }

  const directCwd = typeof payload.cwd === "string" ? payload.cwd : null;
  const directWorkspace = typeof payload.workspace === "string" ? payload.workspace : null;

  if (entry?.type === "session_meta" || entry?.type === "turn_context") {
    return directCwd ?? directWorkspace;
  }

  return directCwd ?? directWorkspace;
}

export function parseSessionWorkspaceFromLines(lines) {
  for (const line of lines) {
    if (!line || !line.trim()) {
      continue;
    }

    try {
      const entry = JSON.parse(line);
      const workspace = getWorkspaceCandidateFromEntry(entry);

      if (workspace) {
        return path.resolve(workspace);
      }
    } catch {
      continue;
    }
  }

  throw new Error("Could not determine workspace from session file");
}

async function readSessionWorkspace(sessionPath) {
  const lines = [];
  const stream = createReadStream(sessionPath, { encoding: "utf8" });
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  try {
    for await (const line of rl) {
      lines.push(line);

      try {
        const workspace = parseSessionWorkspaceFromLines(lines);
        return workspace;
      } catch {
        if (lines.length >= MAX_SESSION_SCAN_LINES) {
          break;
        }
      }
    }
  } finally {
    rl.close();
    stream.destroy();
  }

  return parseSessionWorkspaceFromLines(lines);
}

async function runCommand(command, args, options = {}) {
  const {
    allowedExitCodes = [0],
  } = options;

  return await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: {
        ...process.env,
        ...options.env,
      },
      shell: false,
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      if (error && "code" in error && error.code === "ENOENT") {
        reject(new Error(`cass CLI not found. Install 'cass' or set SESSION_SEARCH_CASS_BIN.`));
        return;
      }

      reject(error);
    });

    child.on("close", (code) => {
      const result = {
        code: code ?? -1,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
      };

      if (!allowedExitCodes.includes(result.code)) {
        const message = result.stderr || result.stdout || `Command failed with exit code ${result.code}`;
        reject(new Error(message));
        return;
      }

      resolve(result);
    });
  });
}

async function runCassJson(args, options = {}) {
  const result = await runCommand(
    getCassBinary(),
    [
      "-q",
      "--color",
      "never",
      "--progress",
      "none",
      ...args,
    ],
    options,
  );

  if (!result.stdout) {
    throw new Error(result.stderr || "cass returned no JSON output");
  }

  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse cass JSON output: ${message}`);
  }
}

function isWorkspaceAllowed(candidateWorkspace, workspaceRoot) {
  if (typeof candidateWorkspace !== "string" || !candidateWorkspace) {
    return false;
  }

  return isPathInside(path.resolve(candidateWorkspace), workspaceRoot);
}

function sanitizeSession(session) {
  return {
    path: session.path,
    workspace: session.workspace ?? null,
    agent: session.agent ?? null,
    title: session.title ?? null,
    sourceId: session.source_id ?? null,
    originHost: session.origin_host ?? null,
    modified: session.modified ?? null,
    sizeBytes: session.size_bytes ?? null,
    messageCount: session.message_count ?? null,
    humanTurns: session.human_turns ?? null,
  };
}

function sanitizeSearchHit(hit) {
  return {
    title: hit.title ?? null,
    snippet: hit.snippet ?? null,
    content: hit.content ?? null,
    score: hit.score ?? null,
    sessionPath: hit.source_path,
    agent: hit.agent ?? null,
    workspace: hit.workspace ?? null,
    createdAt: hit.created_at ?? null,
    lineNumber: hit.line_number ?? null,
    matchType: hit.match_type ?? null,
    sourceId: hit.source_id ?? null,
    originKind: hit.origin_kind ?? null,
    originHost: hit.origin_host ?? null,
  };
}

function sanitizeRelatedSession(entry) {
  return {
    path: entry.path,
    title: entry.title ?? null,
    agent: entry.agent ?? null,
    sourceId: entry.source_id ?? null,
    startedAt: entry.started_at ?? null,
  };
}

export function sanitizeStatus(status) {
  return {
    cassBinary: getCassBinary(),
    allowedRoot: getAllowedRoot(),
    sessionsRoot: getSessionsRoot(),
    status: status.status ?? null,
    healthy: status.healthy ?? false,
    recommendedAction: status.recommended_action ?? null,
    index: {
      exists: status.index?.exists ?? false,
      status: status.index?.status ?? null,
      reason: status.index?.reason ?? null,
      fresh: status.index?.fresh ?? false,
      lastIndexedAt: status.index?.last_indexed_at ?? null,
      ageSeconds: status.index?.age_seconds ?? null,
      stale: status.index?.stale ?? null,
      staleThresholdSeconds: status.index?.stale_threshold_seconds ?? null,
      rebuilding: status.index?.rebuilding ?? false,
    },
    database: {
      exists: status.database?.exists ?? false,
      opened: status.database?.opened ?? false,
      conversations: status.database?.conversations ?? null,
      messages: status.database?.messages ?? null,
      openError: status.database?.open_error ?? null,
      openRetryable: status.database?.open_retryable ?? null,
    },
    pending: {
      sessions: status.pending?.sessions ?? 0,
      watchActive: status.pending?.watch_active ?? false,
      orphaned: status.pending?.orphaned ?? false,
    },
    rebuild: {
      active: status.rebuild?.active ?? false,
      orphaned: status.rebuild?.orphaned ?? false,
      mode: status.rebuild?.mode ?? null,
      phase: status.rebuild?.phase ?? null,
      processedConversations: status.rebuild?.processed_conversations ?? null,
      totalConversations: status.rebuild?.total_conversations ?? null,
      indexedDocs: status.rebuild?.indexed_docs ?? null,
    },
    semantic: {
      status: status.semantic?.status ?? null,
      availability: status.semantic?.availability ?? null,
      summary: status.semantic?.summary ?? null,
      available: status.semantic?.available ?? false,
      canSearch: status.semantic?.can_search ?? false,
      fallbackMode: status.semantic?.fallback_mode ?? null,
      preferredBackend: status.semantic?.preferred_backend ?? null,
      embedderId: status.semantic?.embedder_id ?? null,
      hnswReady: status.semantic?.hnsw_ready ?? false,
      progressiveReady: status.semantic?.progressive_ready ?? false,
      hint: status.semantic?.hint ?? null,
    },
    meta: {
      timestamp: status._meta?.timestamp ?? null,
    },
  };
}

async function ensureReadableSessionPath(sessionPath) {
  const resolvedSessionPath = resolveSessionPath(sessionPath);
  await access(resolvedSessionPath);

  const workspacePath = await readSessionWorkspace(resolvedSessionPath);
  const allowedRoot = getAllowedRoot();

  if (!isPathInside(workspacePath, allowedRoot)) {
    throw new Error(`Session workspace must stay inside allowed root: ${allowedRoot}`);
  }

  return {
    sessionPath: resolvedSessionPath,
    workspacePath,
    allowedRoot,
  };
}

function buildSearchArguments({
  query,
  pageSize,
  maxContentLength,
  mode,
  agents,
  days,
  since,
  until,
}) {
  const args = [
    "search",
    query,
    "--json",
    "--limit",
    String(pageSize),
    "--max-content-length",
    String(maxContentLength),
    "--mode",
    mode,
  ];

  for (const agent of agents ?? []) {
    args.push("--agent", agent);
  }

  if (Number.isInteger(days)) {
    args.push("--days", String(days));
  }

  if (since) {
    args.push("--since", since);
  }

  if (until) {
    args.push("--until", until);
  }

  return args;
}

export async function getSessionSearchStatus() {
  const payload = await runCassJson(["status", "--json"]);
  return sanitizeStatus(payload);
}

export async function listSessions(options = {}) {
  const allowedRoot = getAllowedRoot();
  const workspaceRoot = resolveWorkspacePath(options.workspacePath, allowedRoot);
  const limit = clampInteger(options.limit, 1, MAX_SESSION_LIMIT, DEFAULT_SESSION_LIMIT);
  const fetchLimit = Math.max(100, limit * 10);
  const payload = await runCassJson([
    "sessions",
    "--json",
    "--limit",
    String(fetchLimit),
  ]);

  const filteredSessions = (payload.sessions ?? [])
    .filter((session) => isWorkspaceAllowed(session.workspace, workspaceRoot))
    .slice(0, limit)
    .map(sanitizeSession);

  return {
    allowedRoot,
    workspaceRoot,
    limit,
    returned: filteredSessions.length,
    sessions: filteredSessions,
  };
}

export async function searchSessions(options = {}) {
  const query = typeof options.query === "string" ? options.query.trim() : "";

  if (!query) {
    throw new Error("Query is required");
  }

  const allowedRoot = getAllowedRoot();
  const workspaceRoot = resolveWorkspacePath(options.workspacePath, allowedRoot);
  const limit = clampInteger(options.limit, 1, MAX_SEARCH_LIMIT, DEFAULT_SEARCH_LIMIT);
  const pageSize = clampInteger(
    options.pageSize,
    1,
    MAX_SEARCH_PAGE_SIZE,
    Math.min(MAX_SEARCH_PAGE_SIZE, Math.max(DEFAULT_SEARCH_PAGE_SIZE, limit * 2)),
  );
  const maxContentLength = clampInteger(
    options.maxContentLength,
    50,
    MAX_SEARCH_SNIPPET_LENGTH,
    DEFAULT_SEARCH_SNIPPET_LENGTH,
  );
  const days = Number.isInteger(options.days) ? clampInteger(options.days, 1, 365, options.days) : undefined;
  const mode = options.mode ?? "lexical";
  const baseArgs = buildSearchArguments({
    query,
    pageSize,
    maxContentLength,
    mode,
    agents: options.agents,
    days,
    since: options.since,
    until: options.until,
  });

  const collectedHits = [];
  let cursor = null;
  let pagesScanned = 0;
  let rawTotalMatches = null;
  let rawHitsScanned = 0;

  do {
    const args = [...baseArgs];

    if (cursor) {
      args.push("--cursor", cursor);
    }

    const payload = await runCassJson(args);
    const hits = Array.isArray(payload.hits) ? payload.hits : [];
    rawTotalMatches = typeof payload.total_matches === "number" ? payload.total_matches : rawTotalMatches;
    rawHitsScanned += hits.length;

    for (const hit of hits) {
      if (!isWorkspaceAllowed(hit.workspace, workspaceRoot)) {
        continue;
      }

      collectedHits.push(sanitizeSearchHit(hit));

      if (collectedHits.length >= limit) {
        break;
      }
    }

    pagesScanned += 1;
    cursor = typeof payload.cursor === "string" && payload.cursor ? payload.cursor : null;
  } while (collectedHits.length < limit && cursor && pagesScanned < MAX_SEARCH_PAGES);

  return {
    allowedRoot,
    workspaceRoot,
    query,
    mode,
    limit,
    maxContentLength,
    pagesScanned,
    rawHitsScanned,
    rawTotalMatches,
    partial: Boolean(cursor),
    hits: collectedHits,
  };
}

export function sanitizeViewPayload(payload, maxLineLength = DEFAULT_VIEW_LINE_LENGTH) {
  return {
    path: payload.path,
    targetLine: payload.target_line ?? null,
    context: payload.context ?? null,
    totalLines: payload.total_lines ?? null,
    lines: (payload.lines ?? []).map((line) => {
      const truncated = truncateText(line.content ?? "", maxLineLength);

      return {
        line: line.line ?? null,
        content: truncated.text,
        highlighted: line.highlighted ?? false,
        truncated: truncated.truncated,
      };
    }),
  };
}

export async function viewSession(options = {}) {
  const lineNumber = clampInteger(options.lineNumber, 1, Number.MAX_SAFE_INTEGER, 1);
  const contextLines = clampInteger(
    options.contextLines,
    0,
    MAX_VIEW_CONTEXT_LINES,
    DEFAULT_VIEW_CONTEXT_LINES,
  );
  const maxLineLength = clampInteger(
    options.maxLineLength,
    80,
    MAX_VIEW_LINE_LENGTH,
    DEFAULT_VIEW_LINE_LENGTH,
  );
  const session = await ensureReadableSessionPath(options.sessionPath);
  const payload = await runCassJson([
    "view",
    session.sessionPath,
    "-n",
    String(lineNumber),
    "-C",
    String(contextLines),
    "--json",
  ]);

  return {
    allowedRoot: session.allowedRoot,
    workspacePath: session.workspacePath,
    ...sanitizeViewPayload(payload, maxLineLength),
  };
}

async function filterRelatedSessions(entries) {
  const filtered = [];

  for (const entry of entries ?? []) {
    try {
      await ensureReadableSessionPath(entry.path);
      filtered.push(sanitizeRelatedSession(entry));
    } catch {
      continue;
    }
  }

  return filtered;
}

export async function getRelatedSessions(options = {}) {
  const limit = clampInteger(options.limit, 1, MAX_CONTEXT_LIMIT, DEFAULT_CONTEXT_LIMIT);
  const session = await ensureReadableSessionPath(options.sessionPath);
  const payload = await runCassJson([
    "context",
    session.sessionPath,
    "--limit",
    String(limit),
    "--json",
  ]);

  const sameWorkspace = await filterRelatedSessions(payload.related?.same_workspace);
  const sameDay = await filterRelatedSessions(payload.related?.same_day);
  const sameAgent = await filterRelatedSessions(payload.related?.same_agent);

  return {
    allowedRoot: session.allowedRoot,
    source: {
      path: payload.source?.path ?? session.sessionPath,
      title: payload.source?.title ?? null,
      agent: payload.source?.agent ?? null,
      workspace: payload.source?.workspace ?? session.workspacePath,
      sourceId: payload.source?.source_id ?? null,
      startedAt: payload.source?.started_at ?? null,
    },
    related: {
      sameWorkspace,
      sameDay,
      sameAgent,
    },
    counts: {
      sameWorkspace: sameWorkspace.length,
      sameDay: sameDay.length,
      sameAgent: sameAgent.length,
    },
  };
}
