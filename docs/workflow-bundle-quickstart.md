# workflow-bundle Quickstart

Hướng dẫn này tập trung vào public release `workflow-bundle v2.0.0`: cài `wfc`, cài workflow bundle cho Codex, bootstrap một repo mới, và chạy flow `agent proposes, human approves`.

## Mục Tiêu

Sau khi làm xong, bạn sẽ:

- có lệnh `wfc` trên máy
- cài được workflow bundle vào `~/.codex` hoặc project folder bằng `wfc install`
- bootstrap được một repo dự án mới bằng `wfc init`
- scaffold hoặc materialize được workflow đầu tiên
- validate được workflow bằng `wfc`

## Requirements

- macOS, Linux hoặc Windows
- `node >= 18`
- `npm >= 9`
- `~/.codex` writable hoặc `%USERPROFILE%\.codex` writable
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
cd /Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/packages/workflow-bundle
npm link
wfc version
```

## Cài Workflow Bundle Cho Codex

Cài global policy và skills:

```bash
wfc install --scope global
```

Cài vào một project cụ thể:

```bash
wfc install --scope project --project-root /path/to/your-project
```

Cài cả global lẫn project policy:

```bash
wfc install --scope both --project-root /path/to/your-project
```

Kiểm tra trạng thái:

```bash
wfc status
wfc skills list
```

Khi có bản bundle mới, overwrite bundle đã cài theo install state hiện có:

```bash
wfc update
```

`wfc update` cũng sẽ migrate state legacy `.codex-workflow-pack.*` sang `.codex-workflow-bundle.*` nếu máy đã từng cài flow cũ.

## Bootstrap Một Repo Dự Án Mới

```bash
cd /path/to/your-project
wfc init
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
wfc work-item activate --work-item add-google-oauth-login
wfc protocol
```

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
wfc work-item activate --work-item <work-item-slug>
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
cd /Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/packages/workflow-bundle
npm link
```
