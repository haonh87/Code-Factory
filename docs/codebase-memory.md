# codebase-memory MCP — Hướng Dẫn Team

Graph-based code intelligence cho agent session trong repo này (call graph, impact analysis, code search có ranking). Config MCP đã được commit sẵn tại `.mcp.json` root — bạn chỉ cần cài binary và index.

Nguồn: [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) (MIT, zero-dependency). Version pin cho team: `0.9.0`.

## Setup (3 lệnh)

Chạy từ repo root:

```bash
# 1. Cài binary (~273MB, KHÔNG đụng package.json/lockfile)
npm install --no-save codebase-memory-mcp@0.9.0

# 2. Index repo lần đầu (~1-2 phút)
node_modules/.bin/codebase-memory-mcp cli index_repository --repo-path .

# 3. Restart Claude Code session
```

Sau restart, Claude Code sẽ hiện **approval prompt** cho server `codebase-memory` (project-scope MCP cần per-user approval lần đầu) — chọn approve. Kiểm tra bằng `/mcp`: server phải hiện ✔ Connected và 14 tool `mcp__codebase-memory__*` available.

> [!note]
> `npm install --no-save` nghĩa là binary nằm trong `node_modules/` local nhưng không được ghi vào manifest — sau khi clone/clean install phải chạy lại lệnh 1. Graph index lưu tại `~/.cache/codebase-memory-mcp/` (ngoài repo).

## Không muốn dùng?

- **Decline approval prompt** — server không chạy, session bình thường.
- Hoặc tắt hẳn trong `.claude/settings.local.json`:
  ```json
  { "disabledMcpjsonServers": ["codebase-memory"] }
  ```
- Máy **chưa cài binary**: server chỉ hiện ✘ Failed trong `/mcp`, mọi thứ khác hoạt động bình thường — không cần làm gì.

## Giới hạn đã biết (đọc trước khi tin kết quả)

1. **`trace_path` depth > 1 KHÔNG tin được khi call chain đi qua import cross-file** (v0.9.0): traversal đứt tại ranh giới import — hàm import từ file khác được resolve thành node binding không có outgoing edges, nên hop-2 callees bị thiếu toàn bộ. **Workaround**: dùng depth 1, rồi re-trace từng hàm theo tên (name-based lookup resolve đúng node definition). Chi tiết đo: `docs/research/codebase-memory-depth2-measurement.md`.
2. **Markdown/skill `.md` không có LSP type-resolution** — chỉ index text, không có call chain (JS/TS mới có).
3. **Index gắn với thời điểm index** — code đổi nhiều thì chạy `detect_changes` (MCP tool) để xem staleness, hoặc re-index bằng lệnh 2 ở trên. Lưu ý output `detect_changes` có thể rất lớn — đọc qua `jq` hoặc re-index luôn.

## Khi nào dùng gì

- `trace_path` (depth 1): callers/callees của 1 hàm — thay cho grep call sites (1 tool call thay ~3).
- `search_code`: grep + graph ranking (definitions trước, tests sau).
- `detect_changes`: impact analysis theo git diff.
- `get_architecture`, `search_graph`, `query_graph`: khám phá cấu trúc.

## Rollback

- Team-wide: `git revert` commit rollout (khôi phục guard `.gitignore`, bỏ track `.mcp.json`).
- Cá nhân: `disabledMcpjsonServers` như trên — không cần revert chung.
