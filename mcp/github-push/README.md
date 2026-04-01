# GitHub Push MCP

MCP server này giúp agent xử lý luồng `inspect -> commit -> create repo -> configure remote -> push` cho GitHub mà không cần `gh`.

## Capability

- Kiểm tra trạng thái Git repository trong workspace được cho phép.
- Tạo repository mới trên GitHub qua REST API.
- Gắn hoặc cập nhật `origin` sang remote GitHub.
- Commit toàn bộ thay đổi hiện tại bằng `git add -A`.
- Push branch hiện tại lên GitHub, có hỗ trợ `dryRun`.
- Chạy một lệnh tổng hợp `publish_repository_to_github` khi muốn đi trọn luồng publish.

## Guardrail

- Chỉ thao tác trong `GITHUB_PUSH_ALLOWED_ROOT` hoặc `cwd` của MCP server.
- Không hỗ trợ `--force`, xóa branch, rewrite history, hoặc push tag hàng loạt.
- Với HTTPS GitHub push, nếu có `GITHUB_TOKEN` thì server sẽ dùng `GIT_ASKPASS` tạm thời thay vì ghi token vào remote URL.
- Nếu muốn dùng SSH hoặc credential helper có sẵn, không cần `GITHUB_TOKEN` cho bước `git push`.

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_PUSH_ALLOWED_ROOT` | Khuyến nghị | Giới hạn thư mục repo được phép thao tác |
| `GITHUB_TOKEN` | Bắt buộc cho `create_github_repository`; tùy chọn cho `git push` | Gọi GitHub REST API và hỗ trợ HTTPS push |
| `GITHUB_USERNAME` | Bắt buộc nếu dùng `GITHUB_TOKEN` để HTTPS push | Trả lời prompt username cho Git |

Ghi chú:

- Nếu dùng PAT cho HTTPS Git operations, GitHub yêu cầu nhập `username` và dùng token thay cho password.
- Nếu tạo private repo bằng PAT classic, token cần đủ quyền `repo`. Với public repo, `public_repo` là mức tối thiểu.
- Với fine-grained token, cần quyền tạo repository hoặc quyền ghi phù hợp trên repository đích.

## Install

```powershell
cd mcp/github-push
npm install
```

Hoặc dùng adapter:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/install-github-push.ps1
```

Adapter này sẽ:
- cài dependency cho `mcp/github-push`
- upsert MCP server `github-push` vào `~/.codex/config.toml`
- đặt `GITHUB_PUSH_ALLOWED_ROOT` mặc định là thư mục cha của repo hiện tại
- forward `GITHUB_TOKEN` và `GITHUB_USERNAME` từ shell environment thay vì ghi secret thẳng vào config

Có thể override allowed root:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/install-github-push.ps1 -AllowedRoot "D:/workspaces/RnD/AI"
```

### Configure Credentials Trên Windows

Để dùng `create_github_repository` hoặc HTTPS push mà không ghi secret vào repo hay `~/.codex/config.toml`, dùng credential adapter:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/configure-github-push-credentials.ps1 -GitHubUsername "your-github-username"
```

Script sẽ prompt token bằng `Read-Host -AsSecureString`, lưu vào Windows `User` environment variables và nạp luôn cho session PowerShell hiện tại.

Một số lệnh hữu ích:

```powershell
# Chỉ lưu cho session hiện tại
powershell -ExecutionPolicy Bypass -File adapters/mcp/configure-github-push-credentials.ps1 -GitHubUsername "your-github-username" -Scope Process

# Kiểm tra đã có biến môi trường hay chưa
powershell -ExecutionPolicy Bypass -File adapters/mcp/configure-github-push-credentials.ps1 -ShowStatus

# Xóa credential đã lưu ở User scope
powershell -ExecutionPolicy Bypass -File adapters/mcp/configure-github-push-credentials.ps1 -Clear -Scope User
```

Ghi chú:
- Tránh truyền token trực tiếp trên command line nếu không cần, vì shell history có thể lưu lại.
- Nếu dùng SSH remote hoặc credential helper có sẵn, bạn có thể không cần `GITHUB_TOKEN` cho bước `git push`.

## Run

```powershell
cd mcp/github-push
node src/index.js
```

## Example Codex Config

Codex dùng `~/.codex/config.toml`. Block MCP tương đương:

```toml
[mcp_servers.github-push]
command = "node"
args = ["D:/workspaces/RnD/AI/Code-Factory/mcp/github-push/src/index.js"]
cwd = "D:/workspaces/RnD/AI/Code-Factory/mcp/github-push"
env = { GITHUB_PUSH_ALLOWED_ROOT = "D:/workspaces/RnD/AI" }
env_vars = ["GITHUB_TOKEN", "GITHUB_USERNAME"]
```

Ghi chú:
- `GITHUB_TOKEN` chỉ bắt buộc khi gọi GitHub API hoặc HTTPS push.
- `GITHUB_USERNAME` chỉ cần khi dùng `GITHUB_TOKEN` để HTTPS push.
- Nếu dùng SSH hoặc credential helper sẵn có, không cần lưu token trong config.

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

Hoặc dùng một lần `publish_repository_to_github` nếu muốn server làm trọn luồng.
