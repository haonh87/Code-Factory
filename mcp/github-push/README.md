# GitHub Push MCP

MCP server này giúp agent xử lý luồng `inspect -> commit -> create repo -> configure remote -> push` cho GitHub mà không cần `gh`.

## Capability

- Kiểm tra trạng thái Git repository trong workspace được cho phép.
- Tạo repository mới trên GitHub qua REST API.
- Gán hoặc cập nhật `origin` sang remote GitHub.
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

## Run

```powershell
cd mcp/github-push
node src/index.js
```

## Example MCP Config

Điều chỉnh path theo máy của anh:

```json
{
  "mcpServers": {
    "github-push": {
      "command": "node",
      "args": [
        "D:/workspaces/RnD/AI/Code-Factory/mcp/github-push/src/index.js"
      ],
      "cwd": "D:/workspaces/RnD/AI/Code-Factory/mcp/github-push",
      "env": {
        "GITHUB_PUSH_ALLOWED_ROOT": "D:/workspaces/RnD/AI",
        "GITHUB_TOKEN": "<your-token>",
        "GITHUB_USERNAME": "<your-github-username>"
      }
    }
  }
}
```

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
