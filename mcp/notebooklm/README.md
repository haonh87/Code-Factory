# NotebookLM MCP

MCP này là launcher mỏng trong repo để Codex gọi upstream `notebooklm-mcp` qua `uvx`, thay vì repo tự re-implement toàn bộ tool surface của NotebookLM.
Trong repo này, mục đích chính của integration là dùng NotebookLM như lớp lưu corpus tài liệu và query/search ngữ cảnh khi workflow cần, đặc biệt cho các bước brainstorming, requirement framing, spec, design exploration và research-heavy handoff.
Trong workflow phát triển sản phẩm của repo này, `BRD` và `SRS` mới là output rollout/source-of-truth; NotebookLM chỉ hỗ trợ lưu trữ và truy hồi tài liệu trong lúc thực thi, sau đó kết luận phải được chuẩn hóa lại vào artifact chính.

Upstream package hiện gộp cả CLI `nlm` và MCP server `notebooklm-mcp` trong cùng một gói `notebooklm-mcp-cli`. Theo README upstream đang public ngày `2026-04-09`, package này cung cấp MCP server với 35 tools và chính upstream khuyến nghị dùng `uvx --from notebooklm-mcp-cli notebooklm-mcp` cho flow không cần cài global.

## Capability

- Đăng ký NotebookLM MCP vào Codex theo config được repo quản lý.
- Giữ server implementation trong repo ở mức launcher mỏng, còn toàn bộ tool contract và behavior do upstream `notebooklm-mcp-cli` cung cấp.
- Cho phép Codex dùng NotebookLM cho list notebook, create notebook, add source, query notebook, research và các capability khác của upstream MCP.
- Với workflow của repo này, subset ưu tiên là `notebook_list`, `notebook_create`, `source_add`, `notebook_query`, `research_start` và các thao tác liên quan đến corpus retrieval.

## Guardrail

- Repo này không mirror lại 35 tools của upstream thành wrapper riêng; launcher chỉ chuyển stdio sang upstream `notebooklm-mcp`.
- Upstream MCP có surface khá rộng và side-effectful: nó có thể tạo notebook, thêm nguồn, khởi chạy research, tạo artifact studio và share notebook. Chỉ bật khi thực sự cần dùng NotebookLM để tránh tốn context và tránh tool side effect ngoài ý muốn.
- Với AI KIT workflow hiện tại, hãy ưu tiên NotebookLM như kho tài liệu phụ trợ và lớp truy hồi tri thức; không dùng nó làm source of truth thay cho note workflow `.md`.
- Không dùng notebook hoặc kết quả query làm output rollout cuối cho requirement; nếu nội dung ảnh hưởng scope, rule hoặc acceptance criteria, ghi lại vào `BRD`, `SRS` hoặc note workflow chính.
- Các luồng media/studio/share/download của upstream không phải ưu tiên mặc định cho repo này; chỉ dùng khi người dùng yêu cầu rõ.
- Upstream README cũng lưu ý integration này dựa trên internal APIs của NotebookLM và auth dùng cookie/browser session. Xem nó như integration research/tooling, không phải source of truth cho workflow notes trong repo.

## Requirement

- Node.js `>=20`
- `uvx` có sẵn trong PATH, hoặc đặt `NOTEBOOKLM_MCP_UVX_BIN`
- Auth NotebookLM đã được chuẩn bị qua upstream CLI

Repo này không tự cài `uv` hoặc `uvx` cho bạn. Hãy kiểm tra trước:

```bash
uvx --version
```

## Authentication

Làm auth bằng upstream CLI:

```bash
uvx --from notebooklm-mcp-cli nlm login
```

Kiểm tra auth đã còn hợp lệ chưa:

```bash
uvx --from notebooklm-mcp-cli nlm login --check
```

Nếu muốn giữ nhiều profile hoặc đổi account đã lưu:

```bash
uvx --from notebooklm-mcp-cli nlm login --profile work
uvx --from notebooklm-mcp-cli nlm login switch work
uvx --from notebooklm-mcp-cli nlm login profile list
```

Khi cần chẩn đoán:

```bash
uvx --from notebooklm-mcp-cli nlm doctor
```

Ghi chú:

- Upstream README mô tả auth flow dựa trên browser login và cookie extraction.
- Theo CLI upstream hiện tại ngày `2026-04-09`, auth nằm dưới `nlm login ...`, không còn ở `nlm auth ...`.
- Trong flow bình thường, bạn chỉ cần login một lần rồi tái dùng profile đã lưu; chỉ cần login lại khi session hết hạn hoặc khi đổi account.
- Nếu bạn chỉ cài MCP mà chưa login, server sẽ khởi chạy nhưng các tool NotebookLM có thể fail ở runtime.

## Install

Không cần `npm install` dependency ngoài vì launcher chỉ dùng Node built-in.

Đăng ký MCP vào Codex config:

```bash
bash adapters/mcp/install-notebooklm.sh
```

Trên Windows:

```powershell
powershell -ExecutionPolicy Bypass -File adapters/mcp/install-notebooklm.ps1
```

Adapter này sẽ:

- kiểm tra `node` và `uvx`
- render template [`codex-config.toml.template`](codex-config.toml.template) vào `~/.codex/config.toml`
- ghim path `uvx` vào env `NOTEBOOKLM_MCP_UVX_BIN` để runtime không phụ thuộc vào PATH thay đổi

Nếu `uvx` ở path khác với auto-detection, có thể override:

```bash
bash adapters/mcp/install-notebooklm.sh --uvx-bin /custom/path/uvx
```

## Run

```bash
cd mcp/notebooklm
node src/index.js
```

Launcher sẽ spawn:

```bash
uvx --from notebooklm-mcp-cli notebooklm-mcp
```

## Codex Config Template

Template được commit sẵn tại [`codex-config.toml.template`](codex-config.toml.template). Installer sẽ render các placeholder máy-local rồi ghi block này vào `~/.codex/config.toml`.

```toml
[mcp_servers.{{SERVER_NAME}}]
command = "node"
args = ["{{ENTRY_POINT}}"]
cwd = "{{MCP_ROOT}}"
env = { NOTEBOOKLM_MCP_UVX_BIN = "{{UVX_BIN}}" }
```

## Tool Surface

Repo này không định nghĩa lại schema từng tool NotebookLM. Tool surface được giữ theo upstream `notebooklm-mcp`.

Các nhóm capability chính upstream đang công bố gồm:

- notebook list/create/query
- source add/sync từ URL, text, Drive hoặc file
- studio create, slides revise, artifact download
- research, batch, cross-notebook query, pipeline, tag
- notebook share và các luồng setup hoặc doctor qua CLI

Trong repo này, nhóm tool nên được ưu tiên theo thứ tự:

1. notebook create/list/query
2. source add hoặc sync để materialize corpus
3. research khi cần gom nguồn ngoài codebase
4. Các capability khác chỉ khi task thật sự đòi hỏi

## Suggested Flow

1. Cài `uv`/`uvx` và bảo đảm `uvx --version` chạy được.
2. Chạy `uvx --from notebooklm-mcp-cli nlm login`.
3. Chạy installer `adapters/mcp/install-notebooklm.sh` hoặc `.ps1`.
4. Dùng `uvx --from notebooklm-mcp-cli nlm login --check` để xác nhận auth trước khi bật MCP trong workflow.
5. Mở session Codex mới rồi chỉ bật MCP này khi thực sự cần NotebookLM.
