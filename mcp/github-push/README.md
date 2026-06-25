# GitHub Push MCP

This MCP server helps an agent handle the `inspect -> commit -> create repo -> configure remote -> push` flow for GitHub without needing `gh`.

## Capability

- Check the Git repository status inside an allowed workspace.
- Create a new repository on GitHub via the REST API.
- Attach or update `origin` to a GitHub remote.
- Commit all current changes with `git add -A`.
- Push the current branch to GitHub, with `dryRun` support.
- Run a single composite `publish_repository_to_github` command when you want the full publish flow.

## Guardrail

- It only operates inside `GITHUB_PUSH_ALLOWED_ROOT` or the `cwd` of the MCP server.
- It does not support `--force`, branch deletion, history rewrite, or batch tag push.
- For HTTPS GitHub push, if `GITHUB_TOKEN` is present, the server uses a temporary `GIT_ASKPASS` instead of writing the token into the remote URL.
- If you want to use SSH or an existing credential helper, `GITHUB_TOKEN` is not needed for the `git push` step.

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_PUSH_ALLOWED_ROOT` | Recommended | Constrain the repo directory that may be touched |
| `GITHUB_TOKEN` | Required for `create_github_repository`; optional for `git push` | Call the GitHub REST API and support HTTPS push |
| `GITHUB_USERNAME` | Required if `GITHUB_TOKEN` is used for HTTPS push | Answer the Git username prompt |

Notes:

- If you use a PAT for HTTPS Git operations, GitHub requires a `username` and uses the token instead of a password.
- If you create a private repo with a classic PAT, the token needs enough `repo` scope. For a public repo, `public_repo` is the minimum.
- With a fine-grained token, you need the permission to create a repository or the appropriate write permission on the target repository.

## Install

```powershell
cd mcp/github-push
npm install
```

Or use the adapter:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/install-github-push.ps1
```

This adapter will:
- install dependencies for `mcp/github-push`
- render the [`codex-config.toml.template`](codex-config.toml.template) into `~/.codex/config.toml`
- set `GITHUB_PUSH_ALLOWED_ROOT` to the parent directory of the current repo by default
- forward `GITHUB_TOKEN` and `GITHUB_USERNAME` from the shell environment instead of writing the secret directly into the config

You can override the allowed root:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/install-github-push.ps1 -AllowedRoot "D:/workspaces/RnD/AI"
```

### Configure Credentials On Windows

To use `create_github_repository` or HTTPS push without writing a secret into the repo or `~/.codex/config.toml`, use the credential adapter:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/configure-github-push-credentials.ps1 -GitHubUsername "your-github-username"
```

The script will prompt for the token with `Read-Host -AsSecureString`, store it in the Windows `User` environment variables, and load it into the current PowerShell session.

Some useful commands:

```powershell
# Only save for the current session
powershell -ExecutionPolicy Bypass -File adapters/mcp/configure-github-push-credentials.ps1 -GitHubUsername "your-github-username" -Scope Process

# Check whether the environment variables already exist
powershell -ExecutionPolicy Bypass -File adapters/mcp/configure-github-push-credentials.ps1 -ShowStatus

# Clear the saved credential at User scope
powershell -ExecutionPolicy Bypass -File adapters/mcp/configure-github-push-credentials.ps1 -Clear -Scope User
```

Notes:
- Avoid passing the token directly on the command line unless needed, because the shell history may keep it.
- If you use an SSH remote or an existing credential helper, you may not need `GITHUB_TOKEN` for the `git push` step.

## Run

```powershell
cd mcp/github-push
node src/index.js
```

## Codex Config Template

The template is committed at [`codex-config.toml.template`](codex-config.toml.template). The installer replaces the machine-local placeholders and writes this block into `~/.codex/config.toml`.

```toml
[mcp_servers.{{SERVER_NAME}}]
command = "node"
args = ["{{ENTRY_POINT}}"]
cwd = "{{MCP_ROOT}}"
env = { GITHUB_PUSH_ALLOWED_ROOT = "{{ALLOWED_ROOT}}" }
env_vars = ["GITHUB_TOKEN", "GITHUB_USERNAME"]
```

Notes:
- `SERVER_NAME`, `ENTRY_POINT`, `MCP_ROOT` and `ALLOWED_ROOT` are rendered by the installer for the current machine.
- `GITHUB_TOKEN` is only required when calling the GitHub API or HTTPS push.
- `GITHUB_USERNAME` is only needed when using `GITHUB_TOKEN` for HTTPS push.
- If you use SSH or an existing credential helper, you do not need to store the token in the config.
- The secret is not replaced into the template file; the runtime only forwards it via `env_vars`.

## Tool List

### `inspect_repository`

Input:

```json
{
  "repoPath": "D:/workspaces/RnD/AI/Code-Factory",
  "initializeIfMissing": false,
  "initialBranch": "main"
}
```

### `create_github_repository`

Input:

```json
{
  "name": "code-factory",
  "description": "AI KIT foundation",
  "privateRepo": true,
  "ownerType": "user"
}
```

### `configure_remote`

Input:

```json
{
  "repoPath": "D:/workspaces/RnD/AI/Code-Factory",
  "remoteName": "origin",
  "remoteUrl": "https://github.com/you/code-factory.git"
}
```

### `commit_all_changes`

Input:

```json
{
  "repoPath": "D:/workspaces/RnD/AI/Code-Factory",
  "message": "feat: add github push mcp"
}
```

### `push_current_branch`

Input:

```json
{
  "repoPath": "D:/workspaces/RnD/AI/Code-Factory",
  "remoteName": "origin",
  "setUpstream": true,
  "dryRun": false
}
```

### `publish_repository_to_github`

Input:

```json
{
  "repoPath": "D:/workspaces/RnD/AI/Code-Factory",
  "repoName": "code-factory",
  "description": "AI KIT foundation",
  "privateRepo": true,
  "ownerType": "user",
  "remoteProtocol": "https",
  "commitMessage": "feat: add github push mcp"
}
```

## Suggested Flow

1. `inspect_repository`
2. `commit_all_changes`
3. `create_github_repository`
4. `configure_remote`
5. `push_current_branch`

Or run `publish_repository_to_github` once if you want the server to do the full flow.