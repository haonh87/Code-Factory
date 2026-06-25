# Session Search MCP

This MCP server wraps `cass` into a read-only capability so an agent can look up local session history by workspace.

## Capability

- Check the `cass` status and the index or database health at a level that is safe for automation.
- List recent sessions within the allowed workspace root.
- Search session content by query with a workspace-root, agent and time-range filter.
- Review a specific segment of a session by `sessionPath` and `lineNumber`.
- Find related sessions by the same workspace, the same day or the same agent.

## Guardrail

- Read-only; it does not expose `cass doctor`, `cass index`, `cass export`, `cass pages`, `cass sources` or other side-effectful commands.
- It only returns sessions whose `workspace` is inside `SESSION_SEARCH_ALLOWED_ROOT`.
- It only allows drill-down into a file under `SESSION_SEARCH_SESSIONS_ROOT`, defaulting to `~/.codex/sessions`.
- `view_session` limits `contextLines` and truncates long lines to avoid dumping too much transcript into context.
- Session history is historical text and not absolutely trustworthy; use it to recover context and trace, not to replace the source of truth in the repo.

## Requirement

- Node.js `>=20`
- `cass` installed and callable from the shell, or specified via `SESSION_SEARCH_CASS_BIN`

Quick check before installing the MCP:

```bash
cass --version
cass status --json
```

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `SESSION_SEARCH_ALLOWED_ROOT` | Recommended | The workspace root allowed to be queried |
| `SESSION_SEARCH_CASS_BIN` | Optional | Override the `cass` binary path or name |
| `SESSION_SEARCH_SESSIONS_ROOT` | Optional | Override where raw session files are stored, default `~/.codex/sessions` |

Notes:

- On macOS, `cass` usually reads the index and DB from `~/Library/Application Support/com.coding-agent-search.coding-agent-search/`.
- If `cass` is degraded due to sandbox or Application Support permissions, this MCP will also fail at runtime until `cass` runs stably in the real environment.

## Install

```bash
cd mcp/session-search
npm install
```

Or use the adapter:

```bash
bash adapters/mcp/install-session-search.sh
```

This adapter will:

- check that `cass` is available in PATH
- install dependencies for `mcp/session-search`
- render the [`codex-config.toml.template`](codex-config.toml.template) into `~/.codex/config.toml`
- set `SESSION_SEARCH_ALLOWED_ROOT` to the current repo root by default

You can override the allowed root:

```bash
bash adapters/mcp/install-session-search.sh --allowed-root "$HOME/Documents/workspaces/personal/projects"
```

On Windows:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/install-session-search.ps1
```

## Run

```bash
cd mcp/session-search
node src/index.js
```

## Codex Config Template

The template is committed at [`codex-config.toml.template`](codex-config.toml.template). The installer renders the machine-local placeholders and writes this block into `~/.codex/config.toml`.

```toml
[mcp_servers.{{SERVER_NAME}}]
command = "node"
args = ["{{ENTRY_POINT}}"]
cwd = "{{MCP_ROOT}}"
env = { SESSION_SEARCH_ALLOWED_ROOT = "{{ALLOWED_ROOT}}" }
```

## Tool List

### `session_search_status`

No input. Returns a sanitized health summary of `cass`.

### `list_sessions`

Input:

```json
{
  "workspacePath": "~/workspaces/Code-Factory",
  "limit": 10
}
```

### `search_sessions`

Input:

```json
{
  "query": "cass",
  "workspacePath": "~/workspaces/Code-Factory",
  "limit": 5,
  "mode": "lexical",
  "maxContentLength": 300,
  "days": 30
}
```

### `view_session`

Input:

```json
{
  "sessionPath": "~/.codex/sessions/2026/04/08/rollout-<session-id>.jsonl",
  "lineNumber": 3,
  "contextLines": 2,
  "maxLineLength": 1200
}
```

### `get_related_sessions`

Input:

```json
{
  "sessionPath": "~/.codex/sessions/2026/04/08/rollout-<session-id>.jsonl",
  "limit": 5
}
```

## Suggested Flow

1. `session_search_status`
2. `list_sessions`
3. `search_sessions`
4. `view_session`
5. `get_related_sessions`