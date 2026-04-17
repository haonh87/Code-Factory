# workflow-contracts Quickstart

Hướng dẫn này chỉ tập trung vào việc cài và dùng `wfc`.

## Mục Tiêu

Sau khi làm xong, bạn sẽ:

- có lệnh `wfc` trên máy Mac
- bootstrap được một repo dự án mới bằng `wfc init`
- scaffold được workflow đầu tiên
- validate được workflow bằng `wfc`

## Điều Kiện

- macOS
- `node >= 18`

Kiểm tra:

```bash
node -v
npm -v
```

## Cách 1: Dùng Trên Máy Này

Nếu bạn đang ở chính máy đang phát triển repo `Code-Factory` này:

```bash
cd /Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/packages/workflow-contracts
npm link
```

Kiểm tra:

```bash
wfc help
wfc version
```

## Cách 2: Dùng Trên Máy Mac Khác

1. Clone repo:

```bash
git clone git@github.com:haonh87/Code-Factory.git
cd Code-Factory/packages/workflow-contracts
```

2. Tạo lệnh `wfc` global:

```bash
npm link
```

3. Kiểm tra:

```bash
wfc help
wfc version
```

## Bootstrap Một Repo Dự Án Mới

1. Vào repo dự án:

```bash
cd /path/to/your-project
```

2. Khởi tạo baseline tối thiểu:

```bash
wfc init
```

Lệnh này sẽ tạo:

- `workflow-contracts.config.json`
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

## Tạo Workflow Đầu Tiên

Nếu bạn muốn bám đúng public baseline `v1.0.0`, flow mặc định là manual scaffold. Execution support theo `agentic|multi_agent` đã có ngay trong `v1.0.0`, nhưng chỉ cần validate lane `exec` khi work item thật sự dùng execution metadata/artifacts. `materialize` và `work-item protocol` là extension sau đó.

### Public Baseline `v1.0.0`

Scaffold workflow trực tiếp bằng slug do human chủ động chốt:

```bash
wfc scaffold --work-item customer-search
```

Kiểm tra:

```bash
wfc work-item list
wfc work-item status --work-item customer-search
```

Nếu work item dùng execution layer:

```bash
wfc exec
```

### Extension Sau `v1.0.0`

Nếu muốn đi từ raw request:

```bash
wfc materialize --request "fix timeout khi user login bang email/password tren web"
```

Nếu muốn để tool tự scaffold khi request đủ rõ:

```bash
wfc materialize --request "them dang nhap Google cho customer portal" --auto-scaffold
```

Nếu work item được agent materialize và có `change_id`, human cần approve cả change package lẫn work item trước khi chuyển vào delivery:

```bash
wfc change-item approve --change-id CHANGE-001 --reviewed-by po
wfc work-item list
wfc work-item status --work-item add-google-oauth-login
wfc work-item approve --work-item add-google-oauth-login --reviewed-by po
wfc work-item activate --work-item add-google-oauth-login
```

## Validate Workflow

Validate workflow chuẩn:

```bash
wfc
```

Các lane bổ sung khi cần:

```bash
wfc sdd
wfc change
wfc exec
wfc plan
```

Nếu dùng extension sau `v1.0.0`:

```bash
wfc protocol
```

## Tạo Change Package

```bash
wfc scaffold-change --change-id CHANGE-001 --work-item customer-search
```

## Luồng Dùng Hằng Ngày

```bash
wfc init
wfc scaffold --work-item <work-item-slug>
wfc
wfc sdd | wfc change | wfc plan
```

Flow mở rộng sau `v1.0.0`:

```bash
wfc materialize --request "<raw-request>"
wfc change-item approve --change-id <CHANGE-ID> --reviewed-by <role>
wfc work-item list
wfc work-item status --work-item <work-item-slug>
wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>
wfc work-item activate --work-item <work-item-slug>
wfc protocol
```

## Gắn Vào package.json Của Repo Dự Án

```json
{
  "scripts": {
    "wfc": "wfc",
    "validate:workflow": "wfc",
    "validate:workflow:sdd": "wfc sdd",
    "validate:workflow:change": "wfc change",
    "validate:workflow:execution": "wfc exec",
    "validate:workflow:planning": "wfc plan"
  }
}
```

Sau đó chạy:

```bash
npm run validate:workflow
```

## Khi Nào Cần Cập Nhật `wfc`

Nếu source repo đổi và bạn đang dùng `npm link`:

```bash
cd /Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/packages/workflow-contracts
npm link
```

Trên máy khác, làm tương tự trong repo `Code-Factory` đã pull bản mới nhất.
