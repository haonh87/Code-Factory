# AI Agent Ops

Repository này lưu trữ policy, workflow, skill và adapter cài đặt cho các tác vụ AI agent. Hiện tại repo ưu tiên Codex, nhưng cấu trúc đã được tách nhóm để sau này có thể mở rộng thêm tool hoặc agent khác.

Public baseline hiện tại là `v1.0.0`: manual authoring backbone, các lane validate chính, `SDD`, `change layer`, `adaptive planning` và execution support theo `agentic|multi_agent`. Repo cũng đang chứa một số extension sau `v1.0.0` như `Work Item Materialization` và `Work Item Protocol`. Nếu cần ranh giới version rõ, đọc thêm [`workflow-versioning.md`](skills/orchestration/codex-workflow-chain/references/workflow-versioning.md).

Public publish surface nên được hiểu theo tag `v1.0.0` hoặc branch `release/v1.0.0`. Working tree hiện tại có thể chứa thêm WIP sau `v1.0.0`, nên nếu share cho người mới dùng, ưu tiên trỏ vào tài liệu public ở dưới.

## Bắt Đầu Ở Đây

Nếu đang tiếp cận repo lần đầu và muốn dùng đúng bản public:

1. [`docs/publish-surface.md`](docs/publish-surface.md)
2. [`docs/workflow-docs-map.md`](docs/workflow-docs-map.md)
3. [`docs/workflow-contracts-quickstart.md`](docs/workflow-contracts-quickstart.md)
4. [`skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
5. [`skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](skills/orchestration/codex-workflow-chain/references/workflow-chain.md)

## Internal Context

Các tài liệu dưới đây là internal context hoặc maintainer context, không nên dùng làm public onboarding path:

- [`memory-bank/projectbrief.md`](memory-bank/projectbrief.md)
- [`memory-bank/activeContext.md`](memory-bank/activeContext.md)
- [`memory-bank/progress.md`](memory-bank/progress.md)
- [`skills/orchestration/codex-workflow-chain/references/workflow-overview.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview.md)

## Workflow Commands Nhanh

Workflow authoring chuẩn dùng cùng một command surface qua `npm`:

Baseline public `v1.0.0`:

- scaffold change package: `npm run scaffold:change -- --change-id <CHANGE-ID> --work-item <work-item-slug>`
- scaffold cả workflow: `npm run scaffold:workflow -- --work-item <work-item-slug> --planning-track <quick|full|enterprise>`
- scaffold một step: `npm run scaffold:workflow-step -- --work-item <work-item-slug> --step <sNN>`
- validate workflow chuẩn: `npm run validate:workflow -- --workflow-root work-items --project-root <repo-root>`
- validate `SDD`: `npm run validate:workflow:sdd -- --workflow-root work-items --project-root <repo-root>`
- validate change layer: `npm run validate:workflow:change -- --workflow-root work-items --project-root <repo-root>`
- validate execution layer khi work item có execution metadata/artifacts: `npm run validate:workflow:execution -- --workflow-root work-items`
- validate adaptive planning: `npm run validate:workflow:planning -- --workflow-root work-items`
- smoke test `scaffold -> validate`: `npm run validate:workflow:authoring-smoke`
- chạy fixture suite: `npm run validate:workflow:fixtures`

Extension sau `v1.0.0`:

- materialize raw request thành work item candidate: `npm run materialize:work-item -- --request "<raw-request>"`
- validate work-item protocol: `npm run validate:workflow:protocol`
- liệt kê work item trước khi xem detail: `npm run work-item -- list`
- approve/reject change package do agent materialize: `npm run change-item -- <approve|reject|status> --change-id <CHANGE-ID>`
- approve/activate work item lifecycle: `npm run work-item -- <action> --work-item <work-item-slug>`

Ghi chú:

- `--work-item` hiện là tên CLI ngắn cho `work_item_slug`.
- `work_item_slug` là định danh của toàn bộ work item chạy xuyên 8 bước, ví dụ `fix-login-timeout`, `checkout-recovery`.
- `work-items/` là canonical artifact root cho workflow artifacts thật của repo.

## Workflow Docs

### Theo Mục Đích

- Public docs cho người mới dùng workflow: [`docs/workflow-docs-map.md`](docs/workflow-docs-map.md)
- Public publish surface cho `v1.0.0`: [`docs/publish-surface.md`](docs/publish-surface.md)
- Quickstart cho `wfc`: [`docs/workflow-contracts-quickstart.md`](docs/workflow-contracts-quickstart.md)
- Source-of-truth về phạm vi version: [`workflow-versioning.md`](skills/orchestration/codex-workflow-chain/references/workflow-versioning.md)

### Overview Và Contract

- Overview chính thức cho delivery/onboarding: [`workflow-overview-author-edition.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
- Technical/internal reference: [`workflow-overview.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview.md)
- Contract, naming, frontmatter, block schema: [`workflow-chain.md`](skills/orchestration/codex-workflow-chain/references/workflow-chain.md)
- Naming whitelist theo step: [`workflow-artifact-naming.md`](policies/codex/workflow-artifact-naming.md)

### Product, Role Và Spec

- Role-aware workflow, `BRD/SRS`, role outputs, NotebookLM usage: [`role-aware-workflow.md`](skills/orchestration/codex-workflow-chain/references/role-aware-workflow.md)
- `SDD` lifecycle, requirement IDs, spec freeze/change, coverage report: [`spec-driven-development.md`](skills/orchestration/codex-workflow-chain/references/spec-driven-development.md)
- Product spec root cho `BRD/SRS`: [`product-specs/README.md`](product-specs/README.md)
- Canonical artifact root cho workflow work items: [`work-items/README.md`](work-items/README.md)
- Change package root: [`changes/README.md`](changes/README.md)

### Governance, Runtime Và Planning

- Governance Pack mức project: [`project-context/README.md`](project-context/README.md)
- Governance decision model: [`project-context/governance-decision-model.md`](project-context/governance-decision-model.md)
- Governance role model: [`project-context/governance-role-model.md`](project-context/governance-role-model.md)
- Versioning và ranh giới `v1.0.0` vs extension sau đó: [`workflow-versioning.md`](skills/orchestration/codex-workflow-chain/references/workflow-versioning.md)
- Execution runtime cho `agentic|multi_agent`, thuộc baseline public nhưng chỉ cần khi work item dùng execution layer: [`execution-runtime.md`](skills/orchestration/codex-workflow-chain/references/execution-runtime.md)
- Adaptive planning cho `quick|full|enterprise`: [`adaptive-planning.md`](skills/orchestration/codex-workflow-chain/references/adaptive-planning.md)
- CI enforcement cho workflow tooling và artifacts: [`workflow-ci-enforcement.md`](skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.md)
- Fixture suite canonical cho governance validator: [`packages/workflow-contracts/tests/fixtures/workflow-governance/README.md`](packages/workflow-contracts/tests/fixtures/workflow-governance/README.md)

### Extension Sau `v1.0.0`

- `Work Item Materialization`: [`work-item-materialization.md`](skills/orchestration/codex-workflow-chain/references/work-item-materialization.md)
- `Work Item Protocol`: [`work-item-protocol.md`](skills/orchestration/codex-workflow-chain/references/work-item-protocol.md)

### Architecture Và Rollout

- Merge strategy với `spec-kit`, `OpenSpec`, `cc-sdd`, `BMAD-METHOD`: [`sdd-merge-strategy.md`](skills/orchestration/codex-workflow-chain/references/sdd-merge-strategy.md)
- Target architecture: [`target-architecture.md`](skills/orchestration/codex-workflow-chain/references/target-architecture.md)
- Implementation blueprint theo phase, artifact, validator, CI: [`implementation-blueprint.md`](skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md)

## Quy Ước Tên File Workflow Artifact

Tên file workflow không đặt theo cách hiểu cá nhân như `requirements`, `architecture`, `assessment`, `threshold`, `glossary`.

- Công thức chuẩn: `<work_item_slug>.sNN.<step-slug>.<ext>`
- Danh sách tên file chuẩn theo từng step: [`policies/codex/workflow-artifact-naming.md`](policies/codex/workflow-artifact-naming.md)
- Nếu cần chi tiết frontmatter và block schema theo step: [`skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](skills/orchestration/codex-workflow-chain/references/workflow-chain.md)

## Thành Phần Trong Repository

- `.github/workflows/workflow-guardrails.yml`: GitHub Actions cho CI baseline public, hiện enforce `workflow-tooling`, `workflow-artifacts`, `workflow-sdd`, `workflow-changes`, `workflow-execution`, `workflow-planning`, `workflow-authoring-smoke`.
- `changes/`: source-of-truth cho change package theo `proposal -> design -> tasks -> spec-delta -> archive`; đã được triển khai trong baseline public.
- `product-specs/`: source-of-truth cho `BRD/SRS` khi work item chạy theo SDD; đã được triển khai trong baseline public.
- `work-items/`: canonical artifact root cho workflow artifacts thật của repo.
- `policies/codex/AGENTS.global.md`: chính sách workflow toàn cục cho Codex.
- `project-context/`: Governance Pack mức project, gồm `constitution`, `project-context`, checklist profile và exception register.
- `skills/orchestration/`: skill điều phối workflow tổng.
- `skills/analysis/`: skill phân tích yêu cầu, product thinking và technical approach.
- `skills/architecture/`: skill kiến trúc domain, frontend và thiết kế dữ liệu.
- `skills/delivery/`: skill chia task, implement, testing, DevOps packaging/deploy và review thay đổi dữ liệu hoặc code.
- `skills/guardrails/`: skill contract, readiness, audit và gate DoR/DoD để khóa chất lượng.
- `skills/obsidian/`: skill soạn thảo artifact theo hệ Obsidian như note Markdown, Bases và JSON Canvas.
- `skills/README.md`: taxonomy và quy tắc đặt nhóm skill cho publish surface.
- `skills/notebooklm/`: top-level integration skill theo thiết kế, dùng để tích hợp NotebookLM qua CLI/MCP cho các tác vụ research-heavy hoặc corpus lớn.
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
