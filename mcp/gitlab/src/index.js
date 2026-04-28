import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  inspectRepository,
  pullCurrentBranch,
  pushCurrentBranch,
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
  name: "gitlab",
  version: "0.1.0",
});

server.tool(
  "inspect_repository",
  {
    repoPath: z.string().optional(),
  },
  withErrorBoundary(async ({ repoPath }) => {
    return await inspectRepository(repoPath);
  }),
);

server.tool(
  "pull_current_branch",
  {
    repoPath: z.string().optional(),
  },
  withErrorBoundary(async ({ repoPath }) => {
    return await pullCurrentBranch(repoPath);
  }),
);

server.tool(
  "push_current_branch",
  {
    repoPath: z.string().optional(),
    dryRun: z.boolean().optional(),
  },
  withErrorBoundary(async ({ repoPath, dryRun }) => {
    return await pushCurrentBranch(repoPath, {
      dryRun: dryRun ?? false,
    });
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
