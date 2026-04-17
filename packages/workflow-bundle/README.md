# workflow-bundle

`workflow-bundle` là package CLI của public release `v2.0.0`: cài workflow bundle cho Codex, scaffold hoặc validate workflow, và hỗ trợ flow `agent proposes, human approves` cho `work-item` và `change`.

Quickstart chi tiết: [`docs/workflow-bundle-quickstart.md`](../../docs/workflow-bundle-quickstart.md)

## Requirements

- `node >= 18`
- `npm >= 9`
- `~/.codex` writable khi dùng `wfc install|update|skills`
- `git` nếu clone source repo thay vì cài từ npm registry

## Install

Cài package publish:

```bash
npm install -g workflow-bundle
wfc help
wfc version
```

Nâng từ package legacy:

```bash
npm uninstall -g workflow-contracts
npm install -g workflow-bundle
wfc version
```

Dùng trực tiếp từ source repo:

```bash
cd packages/workflow-bundle
npm link
wfc version
```

## What `v2.0.0` Includes

- workflow bundle install surface qua `wfc install|update|status|skills`
- core authoring CLI qua `wfc init|scaffold|validate`
- agentic proposal flow qua `wfc materialize|change-item|work-item|protocol`
- human approval gates cho change package và work item

## Command Overview

| Việc cần làm | Lệnh |
|---|---|
| Cài workflow bundle vào Codex home hoặc project | `wfc install --scope global|project|both [--project-root <path>]` |
| Overwrite workflow bundle theo install state đã lưu | `wfc update` |
| Xem trạng thái và version bundle đã cài | `wfc status` |
| List, add, remove skill managed của workflow bundle | `wfc skills list|add|remove` |
| Khởi tạo repo dự án | `wfc init` |
| Tạo workflow mới thủ công | `wfc scaffold --work-item <slug>` |
| Tạo một step workflow | `wfc scaffold-step --work-item <slug> --step <sNN>` |
| Tạo change package | `wfc scaffold-change --change-id <CHANGE-ID> --work-item <slug>` |
| Validate workflow chuẩn | `wfc` |
| Validate naming hoặc governance | `wfc naming` , `wfc governance` |
| Validate SDD, change, execution, planning | `wfc sdd` , `wfc change` , `wfc exec` , `wfc plan` |
| Chạy smoke hoặc fixtures | `wfc smoke` , `wfc fixtures` |
| Phân tích raw request thành work item candidate | `wfc materialize --request "<raw-request>"` |
| Materialize và auto-scaffold | `wfc materialize --request "<raw-request>" --auto-scaffold` |
| Human approve change package do agent đề xuất | `wfc change-item approve --change-id <CHANGE-ID> --reviewed-by <role>` |
| Liệt kê hoặc xem detail work item | `wfc work-item list` , `wfc work-item status --work-item <slug>` |
| Human approve hoặc activate work item | `wfc work-item approve --work-item <slug> --reviewed-by <role>` , `wfc work-item activate --work-item <slug>` |
| Validate work-item protocol | `wfc protocol` |

## First Flow

Flow manual:

```bash
wfc init
wfc scaffold --work-item customer-search
wfc
wfc sdd
wfc change
wfc plan
```

Flow agentic:

```bash
wfc materialize --request "them dang nhap Google cho customer portal" --auto-scaffold
wfc change-item approve --change-id CHANGE-001 --reviewed-by po
wfc work-item list
wfc work-item approve --work-item add-google-oauth-login --reviewed-by po
wfc work-item activate --work-item add-google-oauth-login
wfc protocol
```

## Config

CLI sẽ tự tìm `workflow-bundle.config.json` từ thư mục hiện tại đi ngược lên các thư mục cha. Legacy config `workflow-contracts.config.json` vẫn được chấp nhận để migration êm hơn.

Ví dụ:

```json
{
  "projectRoot": ".",
  "workflowRoot": "work-items"
}
```

## Init

Khởi tạo baseline tối thiểu cho một repo dự án:

```bash
wfc init
```

Hoặc nhắm vào một thư mục khác:

```bash
wfc init --project-root /path/to/project
```

Lệnh này sẽ tạo:

- `workflow-bundle.config.json`
- `work-items/`
- `changes/`
- `product-specs/brd/`
- `product-specs/srs/`
- `project-context/project-context.md`
- `project-context/constitution.md`
- `project-context/governance-exception-register.md`
- `project-context/checklists/default.md`
- `project-context/checklists/strict.md`
- `project-context/checklists/regulated.md`
- `project-context/custom/design-review.md`

## Maintainer Commands

Nếu đang author package từ source repo:

```bash
npm run build:workflow:bundle-runtime
npm run validate:workflow
npm run validate:workflow:sdd
npm run validate:workflow:change
npm run validate:workflow:execution
npm run validate:workflow:planning
npm run validate:workflow:protocol
npm run validate:workflow:fixtures
npm run validate:workflow:authoring-smoke
npm run validate:workflow:bundle-smoke
```

Pack tarball publishable:

```bash
cd packages/workflow-bundle
npm pack
```

`prepack` sẽ tự bundle `AGENTS.global.md`, support policy và toàn bộ `runtime/codex/**` trước khi tạo tarball.
