# AI Agent Ops

Repository này lưu trữ policy, workflow, skill và adapter cho các tác vụ AI agent. Public release hiện tại là `workflow-bundle v2.2.0`: một workflow bundle cài được cho Codex và Claude Code, cho phép agent chủ động đề xuất `work-item` và `change`, còn human giữ quyền approve ở các gate trước khi delivery tiếp tục.

Khi chia sẻ cho người dùng mới, dùng tag `v2.2.0` hoặc branch `release/v2.2.0` làm canonical public reference thay vì working tree hiện tại.

## Requirements

- `node >= 18`
- `npm >= 9`
- `~/.codex` hoặc `~/.claude` writable nếu dùng `wfc install|update|skills`
- `git` nếu clone source repo thay vì cài từ npm registry
- `bash` cho adapter Linux/macOS hoặc `PowerShell` cho adapter Windows

## Bắt Đầu Ở Đây

Nếu đang tiếp cận repo lần đầu và muốn đi đúng public release `v2.2.0`:

1. [`docs/publish-surface.md`](docs/publish-surface.md)
2. [`docs/workflow-docs-map.md`](docs/workflow-docs-map.md)
3. [`docs/workflow-bundle-quickstart.md`](docs/workflow-bundle-quickstart.md)
4. [`packages/workflow-bundle/README.md`](packages/workflow-bundle/README.md)
5. [`skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
6. [`skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](skills/orchestration/codex-workflow-chain/references/workflow-chain.md)

## Internal Context

Các tài liệu dưới đây là maintainer hoặc historical context, không nên dùng làm public onboarding path:

- [`memory-bank/projectbrief.md`](memory-bank/projectbrief.md)
- [`memory-bank/activeContext.md`](memory-bank/activeContext.md)
- [`memory-bank/progress.md`](memory-bank/progress.md)
- [`skills/orchestration/codex-workflow-chain/references/workflow-overview.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview.md)
- [`skills/orchestration/codex-workflow-chain/references/workflow-versioning.md`](skills/orchestration/codex-workflow-chain/references/workflow-versioning.md)

## Workflow Commands Nhanh

Command surface public của `v2.2.0` dùng `wfc`.

Install và quản lý workflow bundle:

- cài workflow bundle vào Codex home: `wfc install --mode codex --scope global`
- cài workflow bundle vào Claude Code home: `wfc install --mode claude --scope global`
- cài workflow bundle vào project cụ thể: `wfc install --mode codex --scope project --project-root <repo-root>`
- cài cả global lẫn project: `wfc install --mode codex --scope both --project-root <repo-root>`
- overwrite bundle đã cài theo install state hiện có: `wfc update --mode codex|claude`
- xem trạng thái và version bundle đã cài: `wfc status --mode codex|claude`
- list, add, remove skill do bundle quản lý: `wfc skills list|add|remove --mode codex|claude`

Recommended Usage:

- `interactive terminal`:
  - `wfc install`: chạy trực tiếp `wfc install`; CLI sẽ hỏi `mode` và `scope`
  - `wfc update`, `wfc status`, `wfc skills list|add|remove`: có thể bỏ `--mode`; CLI sẽ hỏi chọn `mode`
- `automation/CI/scripts`:
  - luôn truyền `--mode` tường minh
  - với `wfc install`, luôn truyền thêm `--scope` tường minh

Authoring và validate:

- khởi tạo baseline tối thiểu: `wfc init`
- scaffold cả workflow: `wfc scaffold --work-item <work-item-slug> --planning-track <quick|full|enterprise>`
- scaffold một step: `wfc scaffold-step --work-item <work-item-slug> --step <sNN>`
- scaffold change package: `wfc scaffold-change --change-id <CHANGE-ID> --work-item <work-item-slug>`
- validate workflow chuẩn: `wfc`
- validate naming: `wfc naming`
- validate governance: `wfc governance`
- validate `SDD`: `wfc sdd`
- validate change layer: `wfc change`
- validate execution layer khi work item có execution metadata hoặc artifacts: `wfc exec`
- validate planning track: `wfc plan`
- validate work-item protocol: `wfc protocol`
- smoke test `scaffold -> validate`: `wfc smoke`
- chạy fixture suite: `wfc fixtures`
- nếu đang author từ source repo, có thể dùng các wrapper `npm run validate:workflow:*`

Agentic proposal flow:

- materialize raw request thành work item candidate: `wfc materialize --request "<raw-request>"`
- materialize và auto-scaffold khi request đủ rõ: `wfc materialize --request "<raw-request>" --auto-scaffold`
- liệt kê work item trước khi xem detail: `wfc work-item list`
- xem protocol hoặc status của một work item: `wfc work-item status --work-item <work-item-slug>`
- approve hoặc reject change package do agent đề xuất: `wfc change-item <approve|reject|status> --change-id <CHANGE-ID>`
- approve work item trước khi activate: `wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>`
- seal trusted human gate receipt trước khi activate: `wfc gate approve --work-item <work-item-slug> --gate <spec|dor|approach|task_plan> --reviewed-by <role>`
- activate work item chỉ sau approval + evidence gate `s04-s06`: `wfc work-item activate --work-item <work-item-slug> --step s07 --write-root <path>`
- xem hoặc sync capability control: `wfc capability status` , `wfc capability sync` , `wfc capability check --path <path>`

Ghi chú:

- `--work-item` là tên CLI ngắn cho `work_item_slug`.
- `work_item_slug` là định danh xuyên suốt 8 bước, ví dụ `fix-login-timeout`, `checkout-recovery`.
- strict default của repo mới là `protocolControl.legacyScaffoldPolicy=forbid`; chỉ khi project config bật explicit `allow_readonly` thì `wfc work-item list|status` mới nên dùng bootstrap report read-only từ `s01` cũ để quan sát legacy scaffold.
- các action mutating như `approve|activate|verify|close` không được tự bootstrap; chúng yêu cầu `.work-item-report.json` đã tồn tại.
- `work-item approval`, `change approval` và `gate approval` chỉ được coi là trusted khi có signed receipt ngoài project root; metadata trong note hoặc report không còn đủ để mở gate một mình.
- các lệnh `approve` vẫn dùng CLI nhưng phải do human tự chạy trong interactive TTY; normal mode sẽ reject `--approval-passphrase` và `WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE`.
- lần approve đầu tiên trong một trusted approval root sẽ tạo keypair approver và yêu cầu human nhập approval passphrase trực tiếp trên TTY đó.
- implementation path bị khóa ở mức filesystem cho tới khi work item vào `ACTIVE` ở `s07` và được cấp `write-root`.
- `work-items/` là canonical artifact root cho workflow artifacts của repo.
- Approval model của `v2.2.0` là `agent proposes, human approves`; `ACTIVE` chỉ mở khi approval gate, trusted signed receipts và step-gate evidence bắt buộc đã có.

## Workflow Docs

### Theo Mục Đích

- Public docs cho người mới dùng workflow: [`docs/workflow-docs-map.md`](docs/workflow-docs-map.md)
- Public publish surface cho `v2.2.0`: [`docs/publish-surface.md`](docs/publish-surface.md)
- Quickstart cho `wfc`: [`docs/workflow-bundle-quickstart.md`](docs/workflow-bundle-quickstart.md)
- Package README cho cài đặt hoặc publish: [`packages/workflow-bundle/README.md`](packages/workflow-bundle/README.md)

### Overview Và Contract

- Overview chính thức cho delivery và onboarding: [`workflow-overview-author-edition.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
- Technical hoặc internal reference: [`workflow-overview.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview.md)
- Contract, naming, frontmatter, block schema: [`workflow-chain.md`](skills/orchestration/codex-workflow-chain/references/workflow-chain.md)
- Naming whitelist theo step: [`workflow-artifact-naming.md`](policies/codex/workflow-artifact-naming.md)

### Product, Role Và Spec

- Role-aware workflow, `BRD/SRS`, role outputs, NotebookLM usage: [`role-aware-workflow.md`](skills/orchestration/codex-workflow-chain/references/role-aware-workflow.md)
- `SDD` lifecycle, requirement IDs, spec freeze or change, coverage report: [`spec-driven-development.md`](skills/orchestration/codex-workflow-chain/references/spec-driven-development.md)
- Product spec root cho `BRD` và `SRS`: [`product-specs/README.md`](product-specs/README.md)
- Canonical artifact root cho workflow work items: [`work-items/README.md`](work-items/README.md)
- Change package root: [`changes/README.md`](changes/README.md)

### Governance, Runtime Và Planning

- Governance Pack mức project: [`project-context/README.md`](project-context/README.md)
- Governance decision model: [`project-context/governance-decision-model.md`](project-context/governance-decision-model.md)
- Governance role model: [`project-context/governance-role-model.md`](project-context/governance-role-model.md)
- Execution runtime cho `agentic|multi_agent`: [`execution-runtime.md`](skills/orchestration/codex-workflow-chain/references/execution-runtime.md)
- Adaptive planning cho `quick|full|enterprise`: [`adaptive-planning.md`](skills/orchestration/codex-workflow-chain/references/adaptive-planning.md)
- CI enforcement cho workflow tooling và artifacts: [`workflow-ci-enforcement.md`](skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.md)
- Fixture suite canonical cho governance validator: [`packages/workflow-bundle/tests/fixtures/workflow-governance/README.md`](packages/workflow-bundle/tests/fixtures/workflow-governance/README.md)

### Agentic Proposal And Approval

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
- `skills/orchestration/`: authority entrypoint và workflow backbone; gồm `workflow-governance-router` để route step/gate trước action và `codex-workflow-chain` để giữ chain `s01 -> s08`.
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

## Workflow Bundle CLI

CLI publish/install mặc định cho workflow bundle:

```bash
wfc status
wfc install --mode codex --scope global
wfc install --mode claude --scope global
wfc install --mode codex --scope project --project-root /path/to/project
wfc install --mode codex --scope both --project-root /path/to/project --skill codex-workflow-chain --skill step-goal-contract
wfc update --mode codex
wfc update --mode claude
wfc skills list
wfc skills add --skill notebooklm
wfc skills remove --skill notebooklm
```

Ý nghĩa:

- `--mode codex`: cài policy toàn cục vào `~/.codex/AGENTS.global.md` và đồng bộ skill vào `~/.codex/skills`
- `--mode claude`: cài memory/policy vào `~/.claude/CLAUDE.md` và đồng bộ skill reference vào `~/.claude/skills`
- `project` ở `codex`: cài `AGENTS.md` vào thư mục project chỉ định, nhưng vẫn dùng skill runtime trong `~/.codex/skills`
- `project` ở `claude`: cài `CLAUDE.md` vào thư mục project chỉ định
- `both`: cài cả global policy lẫn project policy
- `update`: overwrite bundle đang cài theo install state của mode tương ứng đã ghi trong runtime home
- `skills add/remove`: bổ sung hoặc gỡ bớt skill managed mà không cần full reinstall
- support policy phụ trợ được đồng bộ vào `~/.codex/policies/codex/` hoặc `~/.claude/policies/codex/` để giữ các reference chính trong skill có runtime path ổn định hơn

Ghi chú:

- bundle version hiện được quản lý trong [`workflow-bundle.manifest.json`](workflow-bundle.manifest.json)
- `wfc status` hiển thị cả `source_bundle_version` và `installed_bundle_version`
- `wfc version` là version của CLI package
- install state của workflow bundle được ghi theo mode trong runtime home, ví dụ `~/.codex/.codex-workflow-bundle.install-state.json` hoặc `~/.claude/.claude-workflow-bundle.install-state.json`
- manifest skill managed được ghi theo mode trong runtime home tương ứng
- nếu máy còn state cũ `.codex-workflow-pack.*`, `wfc update` sẽ đọc state đó, rewrite sang file `bundle` mới và xóa file legacy
- current CLI hỗ trợ `Codex` và `Claude Code`; Windows adapter cũ vẫn chỉ phủ flow installer cho Codex

## Cài Đặt Trên Máy Linux/macOS Hoặc Windows Qua CLI

Khi package đã được publish, cài trực tiếp:

```bash
npm install -g workflow-bundle
wfc install --mode codex --scope global
```

Nếu đang chạy từ source repo và có `node >= 18`, có thể dùng trực tiếp:

```bash
cd <repo-local-path>
node packages/workflow-bundle/bin/wfc.js install --mode codex --scope global
```

Hoặc nếu đã `npm link` `wfc`:

```bash
wfc install --mode codex --scope global
```

## Build / Publish Workflow Bundle

Maintainer có thể bundle runtime assets rồi pack package publishable bằng:

```bash
npm run build:workflow:bundle-runtime
cd packages/workflow-bundle
npm pack
```

Ghi chú:

- `prepack` của `packages/workflow-bundle` sẽ tự bundle runtime cho `codex` và `claude`, support policy và toàn bộ `skills/` vào package trước khi tạo tarball.
- tarball publish hiện đã chứa `workflow-bundle.manifest.json`, `runtime/codex/**` và `runtime/claude/**`, nên `wfc install|update|skills` chạy được mà không cần source repo gốc.

Nếu cần gọi nhanh từ source repo thay vì cài global CLI:

```bash
npm run workflow:install -- --scope global
npm run workflow:update
npm run workflow:status -- --json
npm run workflow:skills -- list
```

## Cài Đặt Trên Máy Windows

```powershell
git clone <your-github-repo-url> $env:USERPROFILE\codex-workflow-bundle
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-bundle\adapters\codex\install-codex-workflow.ps1"
```

Hoặc dùng launcher Windows:

```cmd
%USERPROFILE%\codex-workflow-bundle\adapters\codex\install-codex-global.cmd
```

Launcher này là cách cài khuyến nghị nếu muốn toàn bộ project trên máy Windows đều nhận workflow bundle:

- đồng bộ policy global vào `%USERPROFILE%\.codex`
- đồng bộ toàn bộ skill vào `%USERPROFILE%\.codex\skills`
- tạo `AGENTS.md` ở root các ổ đĩa filesystem để mọi project nằm dưới các ổ đó đều nhận workflow

Nếu muốn workflow áp dụng cho toàn bộ thư mục trên máy Windows, tạo `AGENTS.md` ở root tất cả ổ đĩa filesystem:

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-bundle\adapters\codex\install-codex-workflow.ps1" -CreateDriveRootLinks
```

Nếu muốn cập nhật lại root `AGENTS.md` đã tồn tại trước đó bằng bản mới nhất từ workflow bundle:

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-bundle\adapters\codex\install-codex-workflow.ps1" -CreateDriveRootLinks -OverwriteExistingDriveRootFiles
```

Ghi chú:

- Skill trong `%USERPROFILE%\.codex\skills` là global cho mọi session Codex.
- Installer hiện ghi lại danh sách skill do workflow bundle này quản lý trong `%USERPROFILE%\.codex\.codex-workflow-bundle.managed-skills.txt` và chỉ prune những skill cũ do chính bundle này từng cài; không đụng vào skill hệ thống như `.system` hoặc skill tùy biến ngoài bundle.
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
git clone <your-github-repo-url> ~/codex-workflow-bundle
bash ~/codex-workflow-bundle/adapters/codex/install-codex-workflow.sh
```

## Cập Nhật Trên Máy Đã Cài

```bash
cd <repo-local-path>
git pull
wfc update
```

Nếu vẫn dùng flow cũ, có thể chạy lại script adapter để đồng bộ toàn bộ skill mới nhất vào `~/.codex/skills`.
Trên Windows, nếu muốn đồng bộ và cài global nhanh, chạy lại `adapters\codex\install-codex-global.cmd`.
Trên Linux/macOS, nếu chỉ muốn cập nhật policy và skill mới vào Codex global đã cài sẵn, chạy `bash adapters/codex/update-codex-workflow.sh`.

Ghi chú:

- Script update `.sh` đồng bộ `~/.codex/AGENTS.global.md` và `~/.codex/skills`.
- Script install/update hiện chỉ prune skill stale từng được workflow bundle này cài trước đó; skill ngoài bundle vẫn được giữ nguyên.
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
