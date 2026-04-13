# AI Agent Ops

Repository này lưu trữ policy, workflow, skill và adapter cài đặt cho các tác vụ AI agent. Hiện tại repo ưu tiên Codex, nhưng cấu trúc đã được tách nhóm để sau này có thể mở rộng thêm tool hoặc agent khác.

## Tài Liệu Định Hướng

Nguồn sự thật để lưu và phục hồi ngữ cảnh dự án là `memory-bank/`.

Bắt đầu từ [`memory-bank/projectbrief.md`](memory-bank/projectbrief.md), sau đó đọc lần lượt các file core còn lại trong `memory-bank/`.

## Quy Ước Tên File Workflow Artifact

Tên file workflow không đặt theo cách hiểu cá nhân như `requirements`, `architecture`, `assessment`, `threshold`, `glossary`.

- Công thức chuẩn: `<work_item_slug>.sNN.<step-slug>.<ext>`
- Danh sách tên file chuẩn theo từng step: xem [`policies/codex/workflow-artifact-naming.md`](policies/codex/workflow-artifact-naming.md)
- Naming đầy đủ, frontmatter và block schema theo step: xem [`skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](skills/orchestration/codex-workflow-chain/references/workflow-chain.md)
- Role-aware workflow, BRD/SRS rollout artifacts và cách dùng NotebookLM làm corpus retrieval: xem [`skills/orchestration/codex-workflow-chain/references/role-aware-workflow.md`](skills/orchestration/codex-workflow-chain/references/role-aware-workflow.md)
- SDD lifecycle, requirement IDs, spec freeze/change và coverage report: xem [`skills/orchestration/codex-workflow-chain/references/spec-driven-development.md`](skills/orchestration/codex-workflow-chain/references/spec-driven-development.md)
- Merge strategy giữa workflow hiện tại với `spec-kit`, `OpenSpec`, `cc-sdd` và `BMAD-METHOD`: xem [`skills/orchestration/codex-workflow-chain/references/sdd-merge-strategy.md`](skills/orchestration/codex-workflow-chain/references/sdd-merge-strategy.md)
- Target architecture để hoàn thiện workflow backbone bằng các lớp governance/change/execution/planning: xem [`skills/orchestration/codex-workflow-chain/references/target-architecture.md`](skills/orchestration/codex-workflow-chain/references/target-architecture.md)
- Governance Pack mức project, gồm `constitution`, `project-context`, checklist profile và exception register: xem [`project-context/README.md`](project-context/README.md)
- Governance role model cho authority, exception và waiver: xem [`project-context/governance-role-model.md`](project-context/governance-role-model.md)
- Validator: `powershell -File scripts/validate-workflow-artifact-names.ps1 -WorkflowRoot <workflow-artifact-dir>`

## Thành Phần Trong Repository

- `policies/codex/AGENTS.global.md`: chính sách workflow toàn cục cho Codex.
- `project-context/`: Governance Pack mức project, gồm `constitution`, `project-context`, checklist profile và exception register.
- `skills/orchestration/`: skill điều phối workflow tổng.
- `skills/analysis/`: skill phân tích yêu cầu, product thinking và technical approach.
- `skills/architecture/`: skill kiến trúc domain, frontend và thiết kế dữ liệu.
- `skills/delivery/`: skill chia task, implement, testing, DevOps packaging/deploy và review thay đổi dữ liệu hoặc code.
- `skills/guardrails/`: skill contract, readiness, audit và gate DoR/DoD để khóa chất lượng.
- `skills/obsidian/`: skill soạn thảo artifact theo hệ Obsidian như note Markdown, Bases và JSON Canvas.
- `skills/notebooklm/`: skill tích hợp NotebookLM qua CLI/MCP cho các tác vụ research-heavy hoặc corpus lớn.
- `mcp/github-push/`: MCP server Node để inspect repository, tạo repo GitHub, commit, cấu hình remote và push branch hiện tại.
- `mcp/notebooklm/`: launcher MCP để Codex gọi upstream `notebooklm-mcp` qua `uvx` cho các tác vụ NotebookLM.
- `mcp/session-search/`: MCP server Node read-only để tra cứu local coding-agent session history qua `cass`.
- `mcp/github-push/codex-config.toml.template`: template block MCP được render vào `~/.codex/config.toml` khi chạy installer.
- `mcp/notebooklm/codex-config.toml.template`: template block MCP được render vào `~/.codex/config.toml` khi chạy installer cho NotebookLM MCP.
- `mcp/session-search/codex-config.toml.template`: template block MCP được render vào `~/.codex/config.toml` khi chạy installer cho Session Search MCP.
- `adapters/codex/install-codex-workflow.ps1`: script cài đặt cho Windows.
- `adapters/codex/install-codex-global.cmd`: launcher Windows để cài global nhanh.
- `adapters/codex/install-codex-workflow.sh`: script cài đặt cho Linux/macOS.
- `adapters/mcp/install-github-push.ps1`: script cài dependency và render template GitHub Push MCP vào `~/.codex/config.toml` trên Windows.
- `adapters/mcp/configure-github-push-credentials.ps1`: script cấu hình `GITHUB_USERNAME` và `GITHUB_TOKEN` cho MCP GitHub Push trên Windows mà không ghi secret vào repo.
- `adapters/mcp/configure-github-push-credentials.cmd`: launcher Windows để gọi nhanh credential adapter.
- `adapters/mcp/install-github-push.sh`: script cài dependency và render template GitHub Push MCP vào `~/.codex/config.toml` trên Linux/macOS.
- `adapters/mcp/install-notebooklm.ps1`: script đăng ký NotebookLM MCP vào `~/.codex/config.toml` trên Windows.
- `adapters/mcp/install-notebooklm.sh`: script đăng ký NotebookLM MCP vào `~/.codex/config.toml` trên Linux/macOS.
- `adapters/mcp/install-session-search.ps1`: script cài dependency và render template Session Search MCP vào `~/.codex/config.toml` trên Windows.
- `adapters/mcp/install-session-search.sh`: script cài dependency và render template Session Search MCP vào `~/.codex/config.toml` trên Linux/macOS.

## MCP Hiện Có

- `github-push`: MCP server starter để hỗ trợ luồng `inspect -> commit -> create repo -> configure remote -> push` cho GitHub bằng `git` và GitHub REST API.
- `notebooklm`: launcher MCP để tích hợp upstream `notebooklm-mcp-cli` vào Codex qua `uvx`, phù hợp cho workflow research-heavy khi cần lưu corpus tài liệu và query/search ngữ cảnh cho brainstorming hoặc spec.
- `session-search`: MCP server read-only để list, search, view và nối ngữ cảnh local coding-agent sessions bằng `cass`.
- Template cấu hình đã được commit tại `mcp/github-push/codex-config.toml.template`; installer chỉ điền path máy-local rồi ghi sang `~/.codex/config.toml`.
- Template cấu hình đã được commit tại `mcp/notebooklm/codex-config.toml.template`; installer điền path launcher và `uvx` binary máy-local rồi ghi sang `~/.codex/config.toml`.
- Template cấu hình đã được commit tại `mcp/session-search/codex-config.toml.template`; installer điền allowed root máy-local rồi ghi sang `~/.codex/config.toml`.

Xem chi tiết tại [`mcp/github-push/README.md`](mcp/github-push/README.md), [`mcp/notebooklm/README.md`](mcp/notebooklm/README.md) và [`mcp/session-search/README.md`](mcp/session-search/README.md).

## Tra Cứu Session Với `cass`

Nếu máy đã cài `cass`, có thể dùng CLI này để tra cứu lịch sử session Codex theo workspace.

Ví dụ nhanh trên Linux/macOS:

```bash
cass health
cass sessions --current --limit 5 --json
cass search "status" --workspace "$(pwd)" --limit 5 --display lines
```

Ghi chú:

- Trên macOS, `cass` mặc định dùng data dir tại `~/Library/Application Support/com.coding-agent-search.coding-agent-search/`.
- Khi chạy trong sandbox hạn chế, `cass` có thể báo degraded hoặc không mở được database dù cài đặt cục bộ vẫn tốt.
- Nếu gặp lỗi kiểu đó, hãy xác minh lại bằng `cass health` hoặc `cass search ...` ở môi trường ngoài sandbox trước khi chạy `cass doctor --fix` hoặc `cass index --full`.
- Đã kiểm chứng ngày `2026-04-08` trên workspace này: `cass search "status"` trả hit từ local Codex sessions, còn truy vấn `notebooklm` không có hit ở thời điểm kiểm tra.
- Nếu muốn expose capability này cho agent qua tool thay vì gọi CLI trực tiếp, dùng MCP [`mcp/session-search`](mcp/session-search/README.md); server này chỉ bọc các luồng read-only và không expose `cass doctor` hoặc `cass index`.

## Khả Năng DevOps Theo Môi Trường

- `local`: chuẩn đóng gói bằng `Dockerfile` và `compose.yaml`.
- `dev`, `uat`, `prod`: workflow hiện có thể khóa runtime target theo `docker`, `docker swarm` hoặc `k8s`.
- Cùng một image contract nên được promote giữa các môi trường; khác biệt nên nằm ở config, secrets và rollout strategy.
- `deployment-devops` là skill umbrella để điều phối DevOps tổng từ `local` tới `prod`.
- `containerization-packaging` khóa `Dockerfile`, `.dockerignore`, `compose.yaml` và packaging pattern theo ngôn ngữ hoặc workload.
- `platform-runtime-deployment` và `ci-cd-release` lần lượt khóa runtime deploy và pipeline hoặc promotion hoặc approval cho `dev`, `uat`, `prod`.

## Obsidian Skills Hiện Có

Bộ skill này được vendor từ `kepano/obsidian-skills`, hiện lấy vào repo 3 skill phục vụ authoring artifact:

- `obsidian-markdown`: tạo và chỉnh sửa Obsidian Flavored Markdown (`.md`).
- `obsidian-bases`: tạo và chỉnh sửa Obsidian Bases (`.base`).
- `json-canvas`: tạo và chỉnh sửa JSON Canvas (`.canvas`).

Ghi chú:

- Chưa bundle `obsidian-cli` trong vòng này.
- Script cài đặt hiện tại tự động đồng bộ toàn bộ thư mục `skills/` theo đệ quy vào `~/.codex/skills/<skill-name>`, nên không cần thêm bước cài đặt riêng cho nhóm skill này.

## Đưa Lên GitHub

1. Tạo repository mới trên GitHub.
2. Đẩy thư mục này lên repository:

```bash
git init
git add .
git commit -m "init ai agent ops"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Cài Đặt Trên Máy Windows

```powershell
git clone <your-github-repo-url> $env:USERPROFILE\codex-workflow-pack
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-pack\adapters\codex\install-codex-workflow.ps1"
```

Hoặc dùng launcher Windows:

```cmd
%USERPROFILE%\codex-workflow-pack\adapters\codex\install-codex-global.cmd
```

Launcher này là cách cài khuyến nghị nếu muốn toàn bộ project trên máy Windows đều nhận workflow pack:

- đồng bộ policy global vào `%USERPROFILE%\.codex`
- đồng bộ toàn bộ skill vào `%USERPROFILE%\.codex\skills`
- tạo `AGENTS.md` ở root các ổ đĩa filesystem để mọi project nằm dưới các ổ đó đều nhận workflow

Nếu muốn workflow áp dụng cho toàn bộ thư mục trên máy Windows, tạo `AGENTS.md` ở root tất cả ổ đĩa filesystem:

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-pack\adapters\codex\install-codex-workflow.ps1" -CreateDriveRootLinks
```

Nếu muốn cập nhật lại root `AGENTS.md` đã tồn tại trước đó bằng bản mới nhất từ workflow pack:

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-pack\adapters\codex\install-codex-workflow.ps1" -CreateDriveRootLinks -OverwriteExistingDriveRootFiles
```

Ghi chú:

- Skill trong `%USERPROFILE%\.codex\skills` là global cho mọi session Codex.
- Installer hiện ghi lại danh sách skill do workflow pack này quản lý trong `%USERPROFILE%\.codex\.codex-workflow-pack.managed-skills.txt` và chỉ prune những skill cũ do chính pack này từng cài; không đụng vào skill hệ thống như `.system` hoặc skill tùy biến ngoài pack.
- `AGENTS.md` chỉ dùng để áp policy workflow cho project; path tham chiếu bên trong skill phải khớp layout cài trong `%USERPROFILE%\.codex\skills`.
- `AGENTS.md` ở root mỗi ổ đĩa giúp policy workflow áp dụng cho mọi project nằm dưới ổ đó.
- Script sẽ tự quét các ổ đĩa filesystem thay vì cố định `C`, `D`, `E`.
- Nếu máy không cho tạo symlink, script sẽ thử copy `AGENTS.md` thay thế.
- Nếu một ổ đã có `AGENTS.md`, script sẽ giữ nguyên và bỏ qua ổ đó.
- Muốn ghi đè `AGENTS.md` đã tồn tại, truyền thêm `-OverwriteExistingDriveRootFiles`.

## Giải Nghĩa Nhanh Cho Cài Global

Mô hình cài global của gói này có 2 lớp khác nhau:

- Lớp policy: `AGENTS.md` ở root ổ đĩa hoặc thư mục project để Codex biết phải áp workflow nào khi làm việc trong vùng đó.
- Lớp skill: các thư mục skill được cài vào `%USERPROFILE%\.codex\skills\<skill-name>` để mọi session Codex đều có thể gọi.

Điểm quan trọng:

- `AGENTS.md` không chứa toàn bộ nội dung skill; nó chỉ là điểm kích hoạt policy workflow.
- Skill path được resolve từ thư mục skill đã cài trong `%USERPROFILE%\.codex\skills`, không resolve từ vị trí của `AGENTS.md`.
- Vì installer hiện cài theo dạng phẳng `~/.codex/skills/<skill-name>`, mọi tham chiếu chéo giữa skill phải khớp với layout phẳng này.

Ví dụ:

- `step-goal-auditor` sẽ được cài vào `%USERPROFILE%\.codex\skills\step-goal-auditor`
- `codex-workflow-chain` sẽ được cài vào `%USERPROFILE%\.codex\skills\codex-workflow-chain`
- Từ đó, path tham chiếu đúng từ `step-goal-auditor` sang tài liệu workflow chain là `../codex-workflow-chain/references/workflow-chain.md`

## Cài Đặt Trên Linux/macOS

```bash
git clone <your-github-repo-url> ~/codex-workflow-pack
bash ~/codex-workflow-pack/adapters/codex/install-codex-workflow.sh
```

## Cập Nhật Trên Máy Đã Cài

```bash
cd <repo-local-path>
git pull
```

Sau đó chạy lại script cài đặt để đồng bộ toàn bộ skill mới nhất vào `~/.codex/skills`.
Trên Windows, nếu muốn đồng bộ và cài global nhanh, chạy lại `adapters\codex\install-codex-global.cmd`.
Trên Linux/macOS, nếu chỉ muốn cập nhật policy và skill mới vào Codex global đã cài sẵn, chạy `bash adapters/codex/update-codex-workflow.sh`.

Ghi chú:

- Script update `.sh` đồng bộ `~/.codex/AGENTS.global.md` và `~/.codex/skills`.
- Script install/update hiện chỉ prune skill stale từng được workflow pack này cài trước đó; skill ngoài pack vẫn được giữ nguyên.
- Trên Windows, nếu máy đang dùng `AGENTS.md` root-level theo kiểu file copy thay vì symlink, chạy lại full install flow với `-CreateDriveRootLinks -OverwriteExistingDriveRootFiles` cho ổ cần refresh.

## Quy Ước Mở Rộng

- Thêm policy mới theo tool tại `policies/<tool>/`.
- Thêm adapter cài đặt hoặc bootstrap theo tool tại `adapters/<tool>/`.
- Thêm skill mới vào đúng nhóm trong `skills/` để tránh repo thành một thư mục phẳng khó quản lý.
- Chỉ tách thêm nhóm skill mới khi số lượng skill trong một nhóm hiện tại bắt đầu quá lớn hoặc khác hẳn về mục tiêu sử dụng.

Ghi chú vận hành:

- Cấu trúc nhóm trong repo chỉ phục vụ quản trị nguồn và đọc hiểu.
- Layout runtime sau khi cài global cho Codex hiện là flat theo `skill-name`.
- Khi thêm skill mới, nên kiểm tra tên skill là duy nhất ở mức toàn repo để tránh ghi đè lúc cài global.
