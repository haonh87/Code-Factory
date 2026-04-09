import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  getRelatedSessions,
  getSessionSearchStatus,
  listSessions,
  searchSessions,
  viewSession,
} from "./core.js";

function toToolResult(payload) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(payload, null, 2),
      },
    ],
  };
}

function withErrorBoundary(handler) {
  return async (args) => {
    try {
      const payload = await handler(args);
      return toToolResult(payload);
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: error instanceof Error ? error.message : String(error),
          },
        ],
      };
    }
  };
}

const server = new McpServer({
  name: "session-search",
  version: "0.1.0",
});

server.tool(
  "session_search_status",
  {},
  withErrorBoundary(async () => {
    return await getSessionSearchStatus();
  }),
);

server.tool(
  "list_sessions",
  {
    workspacePath: z.string().optional(),
    limit: z.number().int().optional(),
  },
  withErrorBoundary(async ({ workspacePath, limit }) => {
    return await listSessions({
      workspacePath,
      limit,
    });
  }),
);

server.tool(
  "search_sessions",
  {
    query: z.string(),
    workspacePath: z.string().optional(),
    limit: z.number().int().optional(),
    maxContentLength: z.number().int().optional(),
    mode: z.enum(["lexical", "semantic", "hybrid"]).optional(),
    agents: z.array(z.string()).optional(),
    days: z.number().int().optional(),
    since: z.string().optional(),
    until: z.string().optional(),
  },
  withErrorBoundary(async ({ query, workspacePath, limit, maxContentLength, mode, agents, days, since, until }) => {
    return await searchSessions({
      query,
      workspacePath,
      limit,
      maxContentLength,
      mode,
      agents,
      days,
      since,
      until,
    });
  }),
);

server.tool(
  "view_session",
  {
    sessionPath: z.string(),
    lineNumber: z.number().int(),
    contextLines: z.number().int().optional(),
    maxLineLength: z.number().int().optional(),
  },
  withErrorBoundary(async ({ sessionPath, lineNumber, contextLines, maxLineLength }) => {
    return await viewSession({
      sessionPath,
      lineNumber,
      contextLines,
      maxLineLength,
    });
  }),
);

server.tool(
  "get_related_sessions",
  {
    sessionPath: z.string(),
    limit: z.number().int().optional(),
  },
  withErrorBoundary(async ({ sessionPath, limit }) => {
    return await getRelatedSessions({
      sessionPath,
      limit,
    });
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
