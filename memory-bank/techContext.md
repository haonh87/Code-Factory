# Tech Context

## Công Nghệ Và Định Dạng Đang Dùng

Repository hiện chủ yếu dùng:

- Markdown cho policy, skill, memory bank và tài liệu tổng quan.
- YAML trong frontmatter, schema và file cấu hình agent.
- JavaScript ESM và `package.json` cho MCP server Node khi cần materialize capability runtime.
- Dockerfile, compose.yaml, manifest deploy và pipeline config là các artifact mục tiêu khi scope chạm DevOps.
- PowerShell cho installer Windows.
- CMD cho launcher Windows.
- Bash cho installer và updater trên Linux/macOS.

Đây không phải một codebase application truyền thống và hiện không có manifest như `package.json`, `pyproject.toml` hay `go.mod`.
Hiện ngoại lệ đầu tiên là `mcp/github-push/package.json`, dùng để chạy MCP server cho GitHub publish flow.

## Thiết Lập Phát Triển Và Vận Hành

- Windows là nền tảng được hỗ trợ rõ ràng với installer PowerShell và launcher `.cmd`.
- Linux/macOS có script cài đặt và cập nhật riêng bằng Bash.
- Codex home mặc định là `~/.codex`.
- Policy toàn cục được đồng bộ vào `~/.codex/AGENTS.global.md`.
- Skill được đồng bộ vào `~/.codex/skills/<skill-name>`.
- MCP `github-push` chạy bằng Node.js và `npm`, không phụ thuộc `gh`.

## Ràng Buộc Kỹ Thuật

- File văn bản phải lưu UTF-8.
- Nội dung tiếng Việt phải được kiểm tra để tránh lỗi mã hóa.
- Layout runtime là flat, nên tên skill phải duy nhất toàn repo.
- Với scope container hóa, local baseline phải materialize được Dockerfile và compose.yaml.
- Với dev, uat, prod, runtime target phải được chốt rõ là docker, docker swarm hoặc k8s.
- `AGENTS.md` là điểm kích hoạt policy, không phải nơi chứa toàn bộ logic skill.
- `obsidian-cli` hiện chưa nằm trong scope tích hợp.
- `agentic` và `multi-agent` hiện đã có orchestration spec và runtime reference theo hướng `Codex-first`; vẫn chưa có runtime framework riêng trong repo.
- MCP GitHub Push dựa trên `git` CLI cục bộ và GitHub REST API; auth dùng `GITHUB_TOKEN`, còn HTTPS push có thể dùng `GIT_ASKPASS` tạm thời.
- Trên macOS, `cass` mặc định đọc index và database từ `~/Library/Application Support/com.coding-agent-search.coding-agent-search/`; sandbox hạn chế có thể chặn mở DB dù môi trường local bên ngoài vẫn healthy.
- MCP Session Search dựa trên `cass` CLI cục bộ, Node.js, `@modelcontextprotocol/sdk` và `zod`; server chỉ expose read-only retrieval trên session history.

## Pattern Sử Dụng Tool

- Dùng `install-codex-workflow.ps1` cho cài đặt Windows cơ bản.
- Dùng `install-codex-global.cmd` khi muốn cài nhanh và áp root-level `AGENTS.md` trên Windows.
- Dùng `install-codex-workflow.sh` cho Linux/macOS.
- Dùng `update-codex-workflow.sh` để cập nhật policy và skill vào môi trường Codex đã cài sẵn trên Linux/macOS.
- Dùng `notebooklm` qua `uvx --from notebooklm-mcp-cli ...` khi cần research/query corpus lớn; flow này có thể cần auth và network.
- Dùng `adapters/mcp/install-github-push.ps1` hoặc `.sh` để cài dependency cho MCP GitHub Push.
- Dùng `adapters/mcp/install-session-search.ps1` hoặc `.sh` để cài dependency và đăng ký MCP Session Search vào Codex config.
- Dùng `cass health`, `cass sessions --current` và `cass search "<query>" --workspace "<path>"` khi cần tra cứu lại local Codex session history theo workspace.
- Nếu `cass` báo degraded trong sandbox nhưng máy local vẫn có CLI, ưu tiên verify lại ngoài sandbox trước khi chạy flow repair như `cass doctor --fix` hoặc `cass index --full`.
- Khi người dùng nói "formatter obsidian", map sang skill `obsidian-markdown` vì repo không có skill tên đó theo nguyên văn.

## Điều Cần Nhớ Khi Chỉnh Sửa Repo

- Khi đổi workflow chain hoặc schema output, phải kiểm tra cả policy, skill orchestration và tài liệu tham chiếu.
- Khi materialize workflow note có trace execution, có thể dùng metadata `execution_mode` và `execution_roles`.
- Khi thêm skill mới, phải kiểm tra nguy cơ trùng tên với skill hiện có vì runtime install dùng tên thư mục cuối cùng; điều này đặc biệt quan trọng sau khi tách DevOps thành nhiều skill nhỏ.
- Khi thêm MCP server mới, cần khóa rõ `allowed root`, env vars bắt buộc và tool nào được phép gây side effect.
- Khi sửa tài liệu `.md`, cần kiểm tra lại hiển thị tiếng Việt sau khi lưu.
- Vì repo thiên về docs và script, verify chủ yếu là kiểm tra tính nhất quán nội dung, logic installer và encoding.

## Phụ Thuộc Đáng Chú Ý

- Bộ skill Obsidian hiện được vendor từ `kepano/obsidian-skills`.
- `frontend-architecture` có khai báo `openai.yaml` phục vụ implicit invocation.
- `notebooklm` phụ thuộc vào `notebooklm-mcp-cli` và luồng xác thực của NotebookLM khi dùng CLI/MCP thực tế.
- `github-push` MCP phụ thuộc `@modelcontextprotocol/sdk`, `zod`, `git`, Node.js và GitHub token khi dùng API hoặc HTTPS push.
- `session-search` MCP phụ thuộc `@modelcontextprotocol/sdk`, `zod`, Node.js và `cass` CLI cục bộ có thể đọc được local session index/database.






