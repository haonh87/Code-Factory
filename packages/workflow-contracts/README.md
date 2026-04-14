# workflow-contracts

`workflow-contracts` là package CLI để scaffold và enforce workflow contracts trong local hoặc CI.

## CLI

```bash
wfc init
wfc
wfc naming
wfc governance
wfc sdd
wfc change
wfc exec
wfc plan
wfc fixtures
wfc smoke
```

## Cheat Sheet

Luồng ngắn nhất để bắt đầu trong một repo dự án mới:

```bash
wfc init
wfc scaffold --work-item customer-search
wfc
```

Nếu work item có lane bổ sung:

```bash
wfc sdd
wfc change
wfc exec
wfc plan
```

Cheat sheet theo tình huống:

| Việc cần làm | Lệnh |
|---|---|
| Khởi tạo repo dự án | `wfc init` |
| Tạo workflow mới | `wfc scaffold --work-item <slug>` |
| Validate workflow chuẩn | `wfc` |
| Validate SDD | `wfc sdd` |
| Validate change layer | `wfc change` |
| Validate execution layer | `wfc exec` |
| Validate planning layer | `wfc plan` |
| Tạo change package | `wfc scaffold-change --change-id <CHANGE-ID> --work-item <slug>` |

## Config

CLI sẽ tự tìm `workflow-contracts.config.json` từ thư mục hiện tại đi ngược lên các thư mục cha.

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

## Root Scripts

Repo authoring có thể tự dùng package này qua các lệnh:

```bash
npm run validate:workflow
npm run validate:workflow:sdd
npm run validate:workflow:change
npm run validate:workflow:execution
npm run validate:workflow:planning
npm run validate:workflow:fixtures
npm run validate:workflow:authoring-smoke
```
