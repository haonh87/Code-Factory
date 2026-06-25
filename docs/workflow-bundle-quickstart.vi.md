---
language: vi
---

# workflow-bundle Quickstart

> Tiếng Anh / English: workflow-bundle-quickstart.md

Hướng dẫn này tập trung vào public release `workflow-bundle v2.1.1`: cài `wfc`, cài workflow bundle cho Codex hoặc Claude Code, bootstrap một repo mới, và chạy flow `agent proposes, human approves`.

## Mục Tiêu

Sau khi làm xong, bạn sẽ:

- có lệnh `wfc` trên máy
- cài được workflow bundle vào `~/.codex`, `~/.claude` hoặc project folder bằng `wfc install`
- bootstrap được một repo dự án mới bằng `wfc init`
- scaffold hoặc materialize được workflow đầu tiên
- validate được workflow bằng `wfc`

## Requirements

- macOS, Linux hoặc Windows
- `node >= 18`
- `npm >= 9`
- `~/.codex` hoặc `~/.claude` writable, hoặc đường dẫn tương đương trên Windows
- `git` nếu clone source repo thay vì cài từ npm registry

Kiểm tra:

```bash
node -v
npm -v
```

## Cài CLI `wfc`

Cách chuẩn sau khi package đã publish:

```bash
npm install -g workflow-bundle
wfc help
wfc version
```

Nếu đang nâng từ CLI cũ `workflow-contracts`:

```bash
npm uninstall -g workflow-contracts
npm install -g workflow-bundle
wfc version
```

Nếu đang phát triển trực tiếp từ source repo này:

```bash
cd packages/workflow-bundle
npm link
wfc version
```

## Cài Workflow Bundle

Cài global policy và skills cho Codex:

```bash
wfc install --mode codex --scope global
```

Nếu không muốn nhớ cờ ngay từ đầu, có thể chạy:

```bash
wfc install
```

### Recommended Usage

- `interactive terminal`:
  - `wfc install`: chạy trực tiếp `wfc install`; CLI sẽ hỏi `mode` và `scope`
  - nếu chọn `project|both` mà chưa truyền `--project-root`, CLI sẽ hỏi tiếp project root
  - `wfc update`, `wfc status`, `wfc skills list|add|remove`: có thể bỏ `--mode`; CLI sẽ hỏi chọn `mode`
- `automation/CI/scripts`:
  - luôn truyền `--mode` tường minh
  - với `wfc install`, luôn truyền thêm `--scope` tường minh

Cài global memory/policy và skill references cho Claude Code:

```bash
wfc install --mode claude --scope global
```

Cài vào một project cụ thể:

```bash
wfc install --mode codex --scope project --project-root /path/to/your-project
```

Cài cả global lẫn project policy:

```bash
wfc install --mode codex --scope both --project-root /path/to/your-project
```

Kiểm tra trạng thái:

```bash
wfc status --mode codex
wfc status --mode claude
wfc skills list --mode codex
```

Khi có bản bundle mới, overwrite bundle đã cài theo install state hiện có:

```bash
wfc update --mode codex
```

`wfc update` cũng sẽ migrate state legacy `.codex-workflow-pack.*` sang `.codex-workflow-bundle.*` nếu máy đã từng cài flow cũ trong Codex mode.

## Cách Hiểu Runtime Sau Khi Cài

Sau khi cài bundle, agent không được coi feature request là lệnh implement trực tiếp.

Runtime hiện tại vận hành theo mô hình:

- `authority layer`: `AGENTS.global.md`
- `entry router`: skill `workflow-governance-router`
- `workflow backbone`: skill `codex-workflow-chain`
- `step skills`: skill theo từng step phân tích, thiết kế, planning, implement, verify

Với mọi task thuộc delivery workflow, agent phải route trước rồi mới hành động. Tối thiểu phải báo block trạng thái sau:

```text
Current Step: s0X <tên step>
Workflow Status: ACTIVE | BLOCKED | WAITING_APPROVAL | READY_FOR_REVIEW | VERIFIED
Delivery Context: greenfield | brownfield
What I Am Doing Now: <một câu>
Missing Gates: <danh sách hoặc NONE>
Next Artifact: <artifact hoặc decision cần tiếp theo>
Next Human Action: <review/approval cần từ người, hoặc NONE>
```

Nếu còn thiếu gate hoặc còn blocker trọng yếu, agent phải dừng ở `BLOCKED` hoặc `WAITING_APPROVAL`, không được tự đi tiếp sang implement.

Consistency rule:

- nếu `Missing Gates` khác `NONE`, `Workflow Status` không được là `ACTIVE`, `READY_FOR_REVIEW` hoặc `VERIFIED`
- nếu `Missing Gates` khác `NONE`, `Next Human Action` không được là `NONE`
- request greenfield kiểu `QR Voucher + voucher service API + tone brand` trong repo trống phải dừng ở `proposal stage`, không được auto-scaffold

## Bootstrap Một Repo Dự Án Mới

```bash
cd /path/to/your-project
wfc init
```

Lệnh này sẽ tạo:

- `workflow-bundle.config.json`
  mặc định có `protocolControl.legacyScaffoldPolicy=forbid` để không coi legacy scaffold là execution path hợp lệ
  và sẽ bị capability control khóa ghi theo strict default sau khi sync
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

## Flow 1: Manual Scaffold

Flow ngắn nhất để bắt đầu một work item do human chủ động chốt:

```bash
wfc scaffold --work-item customer-search
wfc work-item list
wfc work-item status --work-item customer-search
wfc
wfc sdd
wfc change
wfc plan
```

Nếu work item dùng execution metadata hoặc artifacts:

```bash
wfc exec
```

## Flow 2: Agentic Proposal Với Human Approval

Nếu muốn đi từ raw request:

```bash
wfc materialize --request "fix timeout khi user login bang email/password tren web"
```

Nếu muốn để tool tự scaffold khi request đủ rõ:

```bash
wfc materialize --request "them dang nhap Google cho customer portal" --auto-scaffold
```

Nếu work item được agent materialize và có `change_id`, human cần approve cả change package lẫn work item trước khi delivery tiếp tục:

```bash
wfc change-item approve --change-id CHANGE-001 --reviewed-by po
wfc work-item list
wfc work-item status --work-item add-google-oauth-login
wfc work-item approve --work-item add-google-oauth-login --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate spec --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate dor --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate approach --reviewed-by developer
wfc gate approve --work-item add-google-oauth-login --gate task_plan --reviewed-by developer
```

Sau đó hoàn tất authoring và human review cho `s04`, `s05`, `s06`, rồi mới mở execution:

```bash
wfc governance
wfc plan
wfc work-item activate --work-item add-google-oauth-login --step s07 --write-root src --write-root public
wfc protocol
```

`wfc work-item activate` hiện là execution gate. Nó chỉ pass khi:

- `work item approval` đã `APPROVED`
- nếu có `change_id`, `change package approval` đã `APPROVED`
- nếu `delivery_context=greenfield`, `bootstrap gate` đã `APPROVED`
- evidence `s04`, `s05`, `s06` đã đủ theo validator
- trusted signed receipts cho `work item`, `change` và các gate bắt buộc đã tồn tại
- có ít nhất một `--write-root` để capability control biết implementation path nào được mở ghi

Ghi chú protocol:

- strict default của repo mới là `protocolControl.legacyScaffoldPolicy=forbid`; chỉ khi project config bật explicit `allow_readonly` thì `wfc work-item list|status` mới nên dùng bootstrap report read-only từ `s01` cũ để quan sát legacy scaffold.
- các action mutating như `approve`, `activate`, `verify`, `close` không được tự bootstrap; chúng yêu cầu `.work-item-report.json` đã tồn tại.
- `change-item approve`, `work-item approve` và `gate approve` sẽ ký receipt vào trusted approval root; nếu receipt không hợp lệ hoặc artifact đổi sau khi approve, `activate` sẽ fail.
- các lệnh `approve` vẫn đi qua CLI, nhưng phải do human tự chạy trong interactive TTY; normal mode sẽ reject `--approval-passphrase` và `WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE`.
- lần approve đầu tiên trong một trusted approval root sẽ tạo keypair approver và yêu cầu human nhập approval passphrase trực tiếp trên TTY đó.
- non-interactive approval chỉ dành cho smoke/test fixture, không phải operational path.
- implementation path bị khóa ở mức filesystem cho tới khi work item vào `ACTIVE` ở `s07` và được cấp `write-root`.

## Validate Workflow

Validate workflow chuẩn:

```bash
wfc
```

Các lane bổ sung khi cần:

```bash
wfc naming
wfc governance
wfc sdd
wfc change
wfc exec
wfc plan
wfc protocol
```

## Tạo Change Package Thủ Công

```bash
wfc scaffold-change --change-id CHANGE-001 --work-item customer-search
```

## Luồng Dùng Hằng Ngày

Flow manual:

```bash
wfc init
wfc scaffold --work-item <work-item-slug>
wfc
wfc sdd
wfc change
wfc plan
```

Flow agentic:

```bash
wfc materialize --request "<raw-request>" --auto-scaffold
wfc change-item approve --change-id <CHANGE-ID> --reviewed-by <role>
wfc work-item list
wfc work-item status --work-item <work-item-slug>
wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>
wfc gate approve --work-item <work-item-slug> --gate <spec|dor|approach|task_plan> --reviewed-by <role>
wfc work-item activate --work-item <work-item-slug> --step s07 --write-root <path>
wfc capability status
wfc protocol
```

## Gắn Vào `package.json` Của Repo Dự Án

```json
{
  "scripts": {
    "wfc": "wfc",
    "validate:workflow": "wfc",
    "validate:workflow:naming": "wfc naming",
    "validate:workflow:governance": "wfc governance",
    "validate:workflow:sdd": "wfc sdd",
    "validate:workflow:change": "wfc change",
    "validate:workflow:execution": "wfc exec",
    "validate:workflow:planning": "wfc plan",
    "validate:workflow:protocol": "wfc protocol"
  }
}
```

Sau đó chạy:

```bash
npm run validate:workflow
```

## Khi Nào Cần Cập Nhật `wfc`

Nếu đã cài package publish:

```bash
npm install -g workflow-bundle@latest
```

Nếu đang dùng `npm link` từ source repo:

```bash
cd packages/workflow-bundle
npm link
```