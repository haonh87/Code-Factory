# Session Search MCP

MCP server này bọc `cass` thành một capability read-only để agent tra cứu local session history theo workspace.

## Capability

- Kiểm tra trạng thái `cass` và tình trạng index hoặc database ở mức an toàn cho automation.
- Liệt kê session gần đây trong phạm vi workspace root được cho phép.
- Search nội dung session theo query với filter workspace root, agent và time range.
- Xem lại một đoạn cụ thể trong session theo `sessionPath` và `lineNumber`.
- Tìm session liên quan cùng workspace, cùng ngày hoặc cùng agent.

## Guardrail

- Chỉ đọc dữ liệu; không expose `cass doctor`, `cass index`, `cass export`, `cass pages`, `cass sources` hoặc các lệnh side-effect khác.
- Chỉ trả về session có `workspace` nằm trong `SESSION_SEARCH_ALLOWED_ROOT`.
- Chỉ cho phép drill-down vào file nằm dưới `SESSION_SEARCH_SESSIONS_ROOT`, mặc định là `~/.codex/sessions`.
- `view_session` giới hạn `contextLines` và truncate line dài để tránh đổ quá nhiều transcript vào context.
- Session history là historical text không đáng tin tuyệt đối; dùng để truy hồi ngữ cảnh và trace, không thay thế source of truth trong repo.

## Requirement

- Node.js `>=20`
- `cass` đã được cài và gọi được từ shell, hoặc chỉ rõ bằng `SESSION_SEARCH_CASS_BIN`

Gợi ý kiểm tra nhanh trước khi cài MCP:

```bash
cass --version
cass status --json
```

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `SESSION_SEARCH_ALLOWED_ROOT` | Khuyến nghị | Root workspace được phép truy vấn |
| `SESSION_SEARCH_CASS_BIN` | Tùy chọn | Override đường dẫn hoặc tên binary `cass` |
| `SESSION_SEARCH_SESSIONS_ROOT` | Tùy chọn | Override nơi lưu raw session files, mặc định `~/.codex/sessions` |

Ghi chú:

- Trên macOS, `cass` thường đọc index và DB từ `~/Library/Application Support/com.coding-agent-search.coding-agent-search/`.
- Nếu `cass` degraded vì sandbox hoặc quyền Application Support, MCP này cũng sẽ thất bại ở runtime cho tới khi `cass` chạy ổn trong môi trường thực.

## Install

```bash
cd mcp/session-search
npm install
```

Hoặc dùng adapter:

```bash
bash adapters/mcp/install-session-search.sh
```

Adapter này sẽ:

- kiểm tra `cass` có sẵn trong PATH
- cài dependency cho `mcp/session-search`
- render template [`codex-config.toml.template`](codex-config.toml.template) vào `~/.codex/config.toml`
- đặt `SESSION_SEARCH_ALLOWED_ROOT` mặc định là repo root hiện tại

Có thể override allowed root:

```bash
bash adapters/mcp/install-session-search.sh --allowed-root "$HOME/Documents/workspaces/personal/projects"
```

Trên Windows:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/install-session-search.ps1
```

## Run

```bash
cd mcp/session-search
node src/index.js
```

## Codex Config Template

Template được commit sẵn tại [`codex-config.toml.template`](codex-config.toml.template). Installer sẽ render các placeholder máy-local rồi ghi block này vào `~/.codex/config.toml`.

```toml
[mcp_servers.{{SERVER_NAME}}]
command = "node"
args = ["{{ENTRY_POINT}}"]
cwd = "{{MCP_ROOT}}"
env = { SESSION_SEARCH_ALLOWED_ROOT = "{{ALLOWED_ROOT}}" }
```

## Tool List

### `session_search_status`

Không có input. Trả health summary đã sanitize của `cass`.

### `list_sessions`

Input:

```json
{
  "workspacePath": "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory",
  "limit": 10
}
```

### `search_sessions`

Input:

```json
{
  "query": "cass",
  "workspacePath": "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory",
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
  "sessionPath": "/Users/haonguyen87/.codex/sessions/2026/04/08/rollout-2026-04-08T15-14-57-019d6c28-a89a-7f32-84e8-754079bf7a46.jsonl",
  "lineNumber": 3,
  "contextLines": 2,
  "maxLineLength": 1200
}
```

### `get_related_sessions`

Input:

```json
{
  "sessionPath": "/Users/haonguyen87/.codex/sessions/2026/04/08/rollout-2026-04-08T15-14-57-019d6c28-a89a-7f32-84e8-754079bf7a46.jsonl",
  "limit": 5
}
```

## Suggested Flow

1. `session_search_status`
2. `list_sessions`
3. `search_sessions`
4. `view_session`
5. `get_related_sessions`
