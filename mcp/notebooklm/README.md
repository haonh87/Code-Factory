# NotebookLM MCP

This MCP is a thin launcher in the repo so Codex can call the upstream `notebooklm-mcp` via `uvx`, instead of the repo re-implementing the full NotebookLM tool surface.
In this repo, the main purpose of the integration is to use NotebookLM as a document corpus storage and context query/search layer when the workflow needs it, especially for brainstorming, requirement framing, spec, design exploration and research-heavy handoff.
In this repo's product development workflow, `BRD` and `SRS` are the rollout/source-of-truth output; NotebookLM only supports storing and retrieving documents during execution, and the conclusion must then be normalized back into the main artifact.

The upstream package bundles both the `nlm` CLI and the `notebooklm-mcp` MCP server in one package `notebooklm-mcp-cli`. Per the upstream README public on `2026-04-09`, this package provides an MCP server with 35 tools, and upstream recommends using `uvx --from notebooklm-mcp-cli notebooklm-mcp` for a flow that does not need a global install.

## Capability

- Register the NotebookLM MCP into Codex with a repo-managed config.
- Keep the server implementation in the repo as a thin launcher, while the full tool contract and behavior come from the upstream `notebooklm-mcp-cli`.
- Let Codex use NotebookLM for listing notebooks, creating notebooks, adding sources, querying notebooks, research and other upstream MCP capabilities.
- For this repo's workflow, the priority subset is `notebook_list`, `notebook_create`, `source_add`, `notebook_query`, `research_start` and the operations related to corpus retrieval.

## Guardrail

- This repo does not mirror the 35 upstream tools into a separate wrapper; the launcher only forwards stdio to the upstream `notebooklm-mcp`.
- The upstream MCP has a wide and side-effectful surface: it can create notebooks, add sources, start research, create studio artifacts and share notebooks. Only enable it when you really need NotebookLM, to avoid wasting context and unwanted tool side effects.
- For the current AI KIT workflow, prefer NotebookLM as an auxiliary document store and a knowledge retrieval layer; do not use it as the source of truth in place of the `.md` workflow note.
- Do not use a notebook or query result as the final rollout output for a requirement; if the content affects scope, rules or acceptance criteria, record it in `BRD`, `SRS` or the main workflow note.
- The upstream media/studio/share/download flows are not a default priority for this repo; only use them when the user clearly requests it.
- The upstream README also notes that this integration relies on NotebookLM internal APIs and auth via cookie/browser session. Treat it as a research/tooling integration, not a source of truth for workflow notes in the repo.

## Requirement

- Node.js `>=20`
- `uvx` available in PATH, or set `NOTEBOOKLM_MCP_UVX_BIN`
- NotebookLM auth prepared via the upstream CLI

This repo does not install `uv` or `uvx` for you. Check first:

```bash
uvx --version
```

## Authentication

Authenticate with the upstream CLI:

```bash
uvx --from notebooklm-mcp-cli nlm login
```

Check whether auth is still valid:

```bash
uvx --from notebooklm-mcp-cli nlm login --check
```

To keep multiple profiles or switch a saved account:

```bash
uvx --from notebooklm-mcp-cli nlm login --profile work
uvx --from notebooklm-mcp-cli nlm login switch work
uvx --from notebooklm-mcp-cli nlm login profile list
```

When you need diagnostics:

```bash
uvx --from notebooklm-mcp-cli nlm doctor
```

Notes:

- The upstream README describes an auth flow based on browser login and cookie extraction.
- Per the upstream CLI as of `2026-04-09`, auth lives under `nlm login ...`, no longer under `nlm auth ...`.
- In the normal flow, you only need to log in once and then reuse the saved profile; only log in again when the session expires or when you change account.
- If you only install the MCP without logging in, the server will start but the NotebookLM tools may fail at runtime.

## Install

No external `npm install` dependency is needed because the launcher only uses Node built-ins.

Register the MCP into the Codex config:

```bash
bash adapters/mcp/install-notebooklm.sh
```

On Windows:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/install-notebooklm.ps1
```

This adapter will:

- check `node` and `uvx`
- render the [`codex-config.toml.template`](codex-config.toml.template) into `~/.codex/config.toml`
- pin the `uvx` path into the `NOTEBOOKLM_MCP_UVX_BIN` env so the runtime does not depend on PATH changes

If `uvx` is at a path different from auto-detection, you can override it:

```bash
bash adapters/mcp/install-notebooklm.sh --uvx-bin /custom/path/uvx
```

## Run

```bash
cd mcp/notebooklm
node src/index.js
```

The launcher will spawn:

```bash
uvx --from notebooklm-mcp-cli notebooklm-mcp
```

## Codex Config Template

The template is committed at [`codex-config.toml.template`](codex-config.toml.template). The installer renders the machine-local placeholders and writes this block into `~/.codex/config.toml`.

```toml
[mcp_servers.{{SERVER_NAME}}]
command = "node"
args = ["{{ENTRY_POINT}}"]
cwd = "{{MCP_ROOT}}"
env = { NOTEBOOKLM_MCP_UVX_BIN = "{{UVX_BIN}}" }
```

## Tool Surface

This repo does not redefine the schema of each NotebookLM tool. The tool surface is kept as the upstream `notebooklm-mcp`.

The main capability groups upstream currently announces include:

- notebook list/create/query
- source add/sync from URL, text, Drive or file
- studio create, slides revise, artifact download
- research, batch, cross-notebook query, pipeline, tag
- notebook share and the setup or doctor flows via the CLI

In this repo, the tool groups should be prioritized in this order:

1. notebook create/list/query
2. source add or sync to materialize the corpus
3. research when you need to gather sources outside the codebase
4. other capabilities only when the task really requires them

## Suggested Flow

1. Install `uv`/`uvx` and make sure `uvx --version` runs.
2. Run `uvx --from notebooklm-mcp-cli nlm login`.
3. Run the installer `adapters/mcp/install-notebooklm.sh` or `.ps1`.
4. Use `uvx --from notebooklm-mcp-cli nlm login --check` to confirm auth before enabling the MCP in the workflow.
5. Open a new Codex session and only enable this MCP when you really need NotebookLM.