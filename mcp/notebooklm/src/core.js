export const DEFAULT_UVX_BIN = "uvx";

export function resolveUvxBin(env = process.env) {
  return env.NOTEBOOKLM_MCP_UVX_BIN?.trim() || DEFAULT_UVX_BIN;
}

export function buildNotebookLmArgs(passthroughArgs = []) {
  return [
    "--from",
    "notebooklm-mcp-cli",
    "notebooklm-mcp",
    ...passthroughArgs,
  ];
}

export function buildLaunchSpec(env = process.env, passthroughArgs = []) {
  return {
    command: resolveUvxBin(env),
    args: buildNotebookLmArgs(passthroughArgs),
  };
}

export function buildMissingUvxMessage(command) {
  return [
    `NotebookLM MCP launcher could not find '${command}'.`,
    "Install uv/uvx first, then rerun the NotebookLM MCP.",
    "Recommended upstream path: uv tool install notebooklm-mcp-cli",
    "Or set NOTEBOOKLM_MCP_UVX_BIN to the full path of your uvx executable.",
  ].join("\n");
}
