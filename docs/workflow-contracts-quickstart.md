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

```bash
wfc scaffold --work-item customer-search
```

Kiểm tra:

```bash
find work-items/customer-search -type f | sort
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

## Tạo Change Package

```bash
wfc scaffold-change --change-id CHANGE-001 --work-item customer-search
```

## Luồng Dùng Hằng Ngày

```bash
wfc init
wfc scaffold --work-item <work-item-slug>
wfc
wfc sdd | wfc change | wfc exec | wfc plan
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
