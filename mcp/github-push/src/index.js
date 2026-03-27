import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  commitAllChanges,
  configureRemote,
  createGitHubRepository,
  inspectRepository,
  publishRepositoryToGitHub,
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
  name: "github-push",
  version: "0.1.0",
});

server.tool(
  "inspect_repository",
  {
    repoPath: z.string().optional(),
    initializeIfMissing: z.boolean().optional(),
    initialBranch: z.string().optional(),
  },
  withErrorBoundary(async ({ repoPath, initializeIfMissing, initialBranch }) => {
    return await inspectRepository(repoPath, {
      initializeIfMissing: initializeIfMissing ?? false,
      initialBranch: initialBranch ?? "main",
    });
  }),
);

server.tool(
  "create_github_repository",
  {
    name: z.string(),
    description: z.string().optional(),
    privateRepo: z.boolean().optional(),
    ownerType: z.enum(["user", "org"]).optional(),
    owner: z.string().optional(),
    homepage: z.string().optional(),
  },
  withErrorBoundary(async ({ name, description, privateRepo, ownerType, owner, homepage }) => {
    return await createGitHubRepository({
      name,
      description,
      privateRepo: privateRepo ?? true,
      ownerType: ownerType ?? "user",
      owner,
      homepage,
    });
  }),
);

server.tool(
  "configure_remote",
  {
    repoPath: z.string().optional(),
    remoteName: z.string().optional(),
    remoteUrl: z.string(),
  },
  withErrorBoundary(async ({ repoPath, remoteName, remoteUrl }) => {
    return await configureRemote(repoPath, remoteUrl, remoteName ?? "origin");
  }),
);

server.tool(
  "commit_all_changes",
  {
    repoPath: z.string().optional(),
    message: z.string(),
    authorName: z.string().optional(),
    authorEmail: z.string().optional(),
  },
  withErrorBoundary(async ({ repoPath, message, authorName, authorEmail }) => {
    return await commitAllChanges(repoPath, message, {
      authorName,
      authorEmail,
    });
  }),
);

server.tool(
  "push_current_branch",
  {
    repoPath: z.string().optional(),
    remoteName: z.string().optional(),
    branch: z.string().optional(),
    setUpstream: z.boolean().optional(),
    dryRun: z.boolean().optional(),
  },
  withErrorBoundary(async ({ repoPath, remoteName, branch, setUpstream, dryRun }) => {
    return await pushCurrentBranch(repoPath, {
      remoteName: remoteName ?? "origin",
      branch,
      setUpstream: setUpstream ?? true,
      dryRun: dryRun ?? false,
    });
  }),
);

server.tool(
  "publish_repository_to_github",
  {
    repoPath: z.string().optional(),
    initialBranch: z.string().optional(),
    repoName: z.string(),
    description: z.string().optional(),
    privateRepo: z.boolean().optional(),
    ownerType: z.enum(["user", "org"]).optional(),
    owner: z.string().optional(),
    remoteName: z.string().optional(),
    branch: z.string().optional(),
    remoteProtocol: z.enum(["https", "ssh"]).optional(),
    commitMessage: z.string().optional(),
    authorName: z.string().optional(),
    authorEmail: z.string().optional(),
    setUpstream: z.boolean().optional(),
    dryRun: z.boolean().optional(),
  },
  withErrorBoundary(async (args) => {
    return await publishRepositoryToGitHub({
      repoPath: args.repoPath,
      initialBranch: args.initialBranch ?? "main",
      repoName: args.repoName,
      description: args.description,
      privateRepo: args.privateRepo ?? true,
      ownerType: args.ownerType ?? "user",
      owner: args.owner,
      remoteName: args.remoteName ?? "origin",
      branch: args.branch,
      remoteProtocol: args.remoteProtocol ?? "https",
      commitMessage: args.commitMessage,
      authorName: args.authorName,
      authorEmail: args.authorEmail,
      setUpstream: args.setUpstream ?? true,
      dryRun: args.dryRun ?? false,
    });
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
