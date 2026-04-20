# workflow-bundle

`workflow-bundle` là package CLI của public release `v2.0.2`: cài workflow bundle cho Codex hoặc Claude Code, scaffold hoặc validate workflow, và hỗ trợ flow `agent proposes, human approves` cho `work-item` và `change`.

Quickstart chi tiết: [`docs/workflow-bundle-quickstart.md`](../../docs/workflow-bundle-quickstart.md)

## Requirements

- `node >= 18`
- `npm >= 9`
- `~/.codex` hoặc `~/.claude` writable khi dùng `wfc install|update|skills`
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

## What `v2.0.2` Includes

- workflow bundle install surface qua `wfc install|update|status|skills`
- core authoring CLI qua `wfc init|scaffold|validate`
- agentic proposal flow qua `wfc materialize|change-item|work-item|protocol`
- human approval gates cho change package và work item
- capability control để khóa implementation path cho tới khi work item vào `ACTIVE` ở `s07`

## Command Overview

| Việc cần làm | Lệnh |
|---|---|
| Cài workflow bundle vào Codex hoặc Claude Code home / project | `wfc install --mode codex|claude --scope global|project|both [--project-root <path>]` |
| Overwrite workflow bundle theo install state đã lưu | `wfc update --mode codex|claude` |
| Xem trạng thái và version bundle đã cài | `wfc status --mode codex|claude` |
| List, add, remove skill managed của workflow bundle | `wfc skills list|add|remove --mode codex|claude` |
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
| Human approve work item hoặc seal workflow gate | `wfc work-item approve --work-item <slug> --reviewed-by <role>` , `wfc gate approve --work-item <slug> --gate <spec|dor|approach|task_plan> --reviewed-by <role>` |
| Activate execution sau gate pass | `wfc work-item activate --work-item <slug> --step s07 --write-root <path>` |
| Xem hoặc sync capability control | `wfc capability status` , `wfc capability sync` , `wfc capability check --path <path>` |
| Validate work-item protocol | `wfc protocol` |

### Recommended Usage

- `interactive terminal`:
  - `wfc install`: chạy trực tiếp `wfc install`; CLI sẽ hỏi `mode` và `scope`
  - nếu chọn `project|both` mà chưa truyền `--project-root`, CLI sẽ hỏi thêm project root
  - `wfc update`, `wfc status`, `wfc skills list|add|remove`: có thể bỏ `--mode`; CLI sẽ hỏi chọn `mode`
- `automation/CI/scripts`:
  - luôn truyền `--mode` tường minh
  - với `wfc install`, luôn truyền thêm `--scope` tường minh

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
wfc work-item approve --work-item add-google-oauth-login --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate spec --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate dor --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate approach --reviewed-by developer
wfc gate approve --work-item add-google-oauth-login --gate task_plan --reviewed-by developer
wfc work-item list
wfc governance
wfc plan
wfc work-item activate --work-item add-google-oauth-login --step s07 --write-root src --write-root public
wfc protocol
```

Ghi chú:

- `wfc work-item activate` không còn chỉ là “đã scaffold thì activate”.
- Trước `ACTIVE`, work item phải có approval gate đã pass; nếu có `change_id` thì change package cũng phải được approve.
- `ACTIVE` chỉ mở khi evidence `s04`, `s05`, `s06` đã đủ để runtime cho phép vào execution.
- `change-item approve`, `work-item approve` và `gate approve` sẽ ghi signed receipt vào trusted approval root ngoài project root; không có receipt hợp lệ thì protocol không mở gate.
- lần approve đầu tiên trong một trusted approval root sẽ tạo keypair approver và yêu cầu human nhập approval passphrase.
- implementation path bị khóa ở mức filesystem cho tới khi có `ACTIVE + s07 + granted write roots`.
- `wfc work-item list|status` có thể bootstrap report read-only từ `s01` cũ để quan sát trạng thái legacy scaffold.
- các action mutating như `approve|activate|verify|close` không được tự bootstrap; chúng yêu cầu `.work-item-report.json` đã tồn tại.

## Config

CLI sẽ tự tìm `workflow-bundle.config.json` từ thư mục hiện tại đi ngược lên các thư mục cha. Legacy config `workflow-contracts.config.json` vẫn được chấp nhận để migration êm hơn.

Ví dụ:

```json
{
  "projectRoot": ".",
  "workflowRoot": "work-items",
  "capabilityControl": {
    "enabled": true,
    "authoringRoots": ["work-items", "changes", "product-specs", "project-context", "docs"],
    "alwaysWritablePaths": ["workflow-bundle.config.json", "workflow-contracts.config.json"],
    "ignoredRoots": [".git", ".codex", ".claude", "node_modules", ".obsidian", ".idea", ".vscode"],
    "protectedRoots": []
  }
}
```

Ý nghĩa nhanh:

- `authoringRoots`: path workflow/artifact luôn được phép ghi
- `alwaysWritablePaths`: file config bundle luôn được phép cập nhật
- `protectedRoots`: nếu để trống, capability control sẽ suy ra từ top-level repo root không thuộc `authoringRoots`
- implementation path chỉ được mở ghi tạm thời khi `wfc work-item activate|resume --step s07 --write-root <path>` cấp quyền qua `granted_write_paths`

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

`prepack` sẽ tự bundle support policy và toàn bộ `runtime/codex/**`, `runtime/claude/**` trước khi tạo tarball.
