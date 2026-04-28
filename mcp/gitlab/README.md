# GitLab MCP

This MCP server covers the phase 1 local workflow for an existing GitLab repository:

1. `inspect_repository`
2. `pull_current_branch`
3. `push_current_branch`

It is intentionally small. It does not create repositories, open merge requests, manage CI/CD, or replace a full GitLab platform MCP.

## Scope

- Existing repository only
- GitLab lane only
- Self-hosted host default: `gitlab.ggg.com.vn`
- SSH-first workflow
- Pull is always `--ff-only`

## Guardrails

- Only works inside `GITLAB_ALLOWED_ROOT`
- Fails fast if the current branch has no upstream
- Fails fast if `pull_current_branch` sees a dirty working tree
- Fails fast if the tracked remote does not match the expected GitLab host
- Does not force push, rewrite history, merge, or rebase
- Does not change the existing `github-push` lane

## Standard Runtime Note

The workflow lane treats `zereight/gitlab-mcp` as the GitLab standard reference. This package is the thin local wrapper for the approved phase 1 repo workflow in this repository.

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `GITLAB_ALLOWED_ROOT` | Recommended | Limits which repositories can be touched |
| `GITLAB_HOST` | Optional | Expected GitLab host, default `gitlab.ggg.com.vn` |

## Install

```bash
cd mcp/gitlab
npm install
```

Or use the installer:

```bash
bash adapters/mcp/install-gitlab.sh
```

The installer:

- installs dependencies for `mcp/gitlab`
- renders `codex-config.toml.template` into `~/.codex/config.toml`
- sets `GITLAB_ALLOWED_ROOT` to the parent of the current repository by default
- keeps the managed block separate from the existing `github-push` MCP

Override the defaults if needed:

```bash
bash adapters/mcp/install-gitlab.sh --allowed-root "$HOME/Documents/workspaces" --gitlab-host "gitlab.ggg.com.vn"
```

PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/install-gitlab.ps1
```

## Run

```bash
cd mcp/gitlab
node src/index.js
```

## Codex Config Template

The committed template is `codex-config.toml.template`. The installer renders machine-local values into `~/.codex/config.toml`.

```toml
[mcp_servers.{{SERVER_NAME}}]
command = "node"
args = ["{{ENTRY_POINT}}"]
cwd = "{{MCP_ROOT}}"
env = { GITLAB_ALLOWED_ROOT = "{{ALLOWED_ROOT}}", GITLAB_HOST = "{{GITLAB_HOST}}" }
```

## Tool List

### `inspect_repository`

Input:

```json
{
  "repoPath": "/workspace/demo"
}
```

Returns repository status, current branch, tracked upstream, remotes, and the selected GitLab remote metadata.

### `pull_current_branch`

Input:

```json
{
  "repoPath": "/workspace/demo"
}
```

Behavior:

- requires a clean working tree
- requires an upstream on the current branch
- runs `git pull --ff-only`

### `push_current_branch`

Input:

```json
{
  "repoPath": "/workspace/demo",
  "dryRun": false
}
```

Behavior:

- requires an upstream on the current branch
- pushes `HEAD` to the tracked upstream branch
- supports `dryRun`

## Suggested Flow

1. `inspect_repository`
2. `pull_current_branch`
3. `push_current_branch`
