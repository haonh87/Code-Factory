---
name: notebooklm
description: Use Google NotebookLM through notebooklm-mcp-cli.
language: en
---

# NotebookLM Tools

Use this skill when the task is "use NotebookLM from the terminal or through its MCP tools". Default to running the upstream package with `uvx` instead of installing it globally.

## Default Command

Run NotebookLM commands through `uvx`:

```bash
uvx --from notebooklm-mcp-cli nlm --help
```

This avoids a separate install step. If you need the MCP entrypoint directly, use:

```bash
uvx --from notebooklm-mcp-cli notebooklm-mcp --help
```

## Auth And Health

Check auth first:

```bash
uvx --from notebooklm-mcp-cli nlm login --check
```

If needed:

```bash
uvx --from notebooklm-mcp-cli nlm login
```

If you want to keep multiple saved accounts or switch reusable auth contexts:

```bash
uvx --from notebooklm-mcp-cli nlm login --profile work
uvx --from notebooklm-mcp-cli nlm login --profile personal
uvx --from notebooklm-mcp-cli nlm login switch work
uvx --from notebooklm-mcp-cli nlm login profile list
```

If the default flow is blocked, use OAuth variables documented by the upstream tool:

```bash
export NOTEBOOKLM_USE_OAUTH=1
export NOTEBOOKLM_OAUTH_CLIENT_ID="..."
export NOTEBOOKLM_OAUTH_CLIENT_SECRET="..."
uvx --from notebooklm-mcp-cli nlm login
```

Run diagnostics when the CLI behaves unexpectedly:

```bash
uvx --from notebooklm-mcp-cli nlm doctor
```

## Fallback When Unavailable

If `uvx` is not installed, the network is unreachable, or the MCP server does not respond (not an auth error — see `Auth And Health` for that case):

- Do not retry the same command in a loop; try `nlm doctor` once for a network/env diagnosis, then stop.
- Fall back to manual research (reading the source docs, repo files, or web pages directly) or another available research tool for the current step.
- State the limitation clearly in the step's output (for example in `s01`, `s03`, or `s05` notes): what NotebookLM was expected to provide and why it could not run this time.
- Do not treat a skipped NotebookLM step as a silent pass; a missing corpus lookup is a noted gap, not a completed one.

## What Tools Exist

These are the core capabilities from the upstream features table:

- List notebooks: `nlm notebook list` or MCP tool `notebook_list`
- Create notebook: `nlm notebook create` or MCP tool `notebook_create`
- Add sources from URL, text, Drive, or file: `nlm source add` or MCP tool `source_add`
- Query a notebook: `nlm notebook query` or MCP tool `notebook_query`
- Create studio content such as audio or video: `nlm studio create` or MCP tool `studio_create`
- Revise slide decks: `nlm slides revise` or MCP tool `studio_revise`
- Download generated artifacts: `nlm download <type>` or MCP tool `download_artifact`
- Start web or Drive research: `nlm research start` or MCP tool `research_start`
- Share notebooks: `nlm share public` or `nlm share invite`, with MCP `notebook_share_*`
- Sync Drive sources: `nlm source sync` or MCP tool `source_sync_drive`

Use the CLI when you want direct scripted operations. Use MCP tools when an agent needs structured tool calls.

## Common CLI Commands

```bash
uvx --from notebooklm-mcp-cli nlm notebook list
uvx --from notebooklm-mcp-cli nlm notebook create "Research Project"
uvx --from notebooklm-mcp-cli nlm source add <notebook> --url "https://example.com"
uvx --from notebooklm-mcp-cli nlm notebook query <notebook> "Summarize the key claims"
uvx --from notebooklm-mcp-cli nlm studio create <notebook> --type audio --confirm
uvx --from notebooklm-mcp-cli nlm download audio <notebook> <artifact-id>
```

Run `uvx --from notebooklm-mcp-cli nlm --ai` for assistant-oriented documentation from the package itself.

## Working Rules

- Prefer `uvx --from notebooklm-mcp-cli nlm ...` over installing the package globally.
- Check auth first with `nlm login --check` before debugging NotebookLM behavior.
- Treat `nlm login` as a one-time setup in normal cases; rerun only when NotebookLM session expires, account changes, or auth becomes invalid.
- Keep notebook operations minimal and task-focused: only create notebooks, add sources, or generate artifacts needed for the current task.
- In this repo, prefer NotebookLM as a corpus storage and retrieval layer for brainstorming, requirement framing, spec, design exploration, and other research-heavy workflow steps.
- Treat BRD/SRS as rollout outputs of the product-development workflow; NotebookLM stores and retrieves supporting corpus during execution, but any decision-worthy conclusion must be written back into BRD, SRS, or the workflow note.
- Prefer notebook list/create, source add, notebook query, and research start before broader media/share flows unless the user explicitly asks for those outputs.
- If you are unsure which CLI or MCP arguments are required, check the upstream help or feature docs first.

## References

- Features: `https://github.com/jacob-bd/notebooklm-mcp-cli?tab=readme-ov-file#features`
- Repository: `https://github.com/jacob-bd/notebooklm-mcp-cli`
