# workflow-contracts

`workflow-contracts` là package CLI để scaffold và enforce workflow contracts trong local hoặc CI.

Quickstart chi tiết: [`docs/workflow-contracts-quickstart.md`](../../docs/workflow-contracts-quickstart.md)

## CLI

`workflow-contracts` hiện chứa cả:

- public baseline `v1.0.0`: manual scaffold + validate, cùng execution support khi work item cần
- extension sau `v1.0.0`: materialization, protocol, approval gate và lifecycle ở cấp work item, kèm human approval cho change package do agent tạo

Nếu muốn đi đúng public baseline `v1.0.0`, ưu tiên flow manual ở phần dưới. `materialize`, `change-item`, `work-item` và `protocol` là extension sau đó.

```bash
wfc init
wfc scaffold --work-item customer-search
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

Extension sau `v1.0.0`:

```bash
wfc materialize --request "fix timeout khi user login bang email/password tren web"
wfc work-item list
wfc work-item status --work-item fix-login-timeout
wfc work-item approve --work-item fix-login-timeout --reviewed-by po
wfc work-item activate --work-item fix-login-timeout
wfc protocol
```

## Cheat Sheet

Luồng ngắn nhất để bắt đầu trong một repo dự án mới:

### Public Baseline `v1.0.0`

```bash
wfc init
wfc scaffold --work-item customer-search
wfc
wfc sdd
wfc change
wfc exec
wfc plan
```

### Extension Sau `v1.0.0`

```bash
wfc materialize --request "them dang nhap Google cho customer portal" --auto-scaffold
wfc change-item approve --change-id CHANGE-001 --reviewed-by po
wfc work-item list
wfc work-item approve --work-item add-google-oauth-login --reviewed-by po
wfc work-item activate --work-item add-google-oauth-login
wfc protocol
```

Cheat sheet theo tình huống:

| Việc cần làm | Lệnh |
|---|---|
| Khởi tạo repo dự án | `wfc init` |
| Public baseline `v1.0.0`: tạo workflow mới | `wfc scaffold --work-item <slug>` |
| Public baseline `v1.0.0`: validate workflow chuẩn | `wfc` |
| Public baseline `v1.0.0`: validate SDD | `wfc sdd` |
| Public baseline `v1.0.0`: validate change layer | `wfc change` |
| Public baseline `v1.0.0`: validate execution layer khi work item có execution metadata/artifacts | `wfc exec` |
| Public baseline `v1.0.0`: validate planning | `wfc plan` |
| Extension sau `v1.0.0`: phân tích raw request thành work item candidate | `wfc materialize --request "<raw-request>"` |
| Extension sau `v1.0.0`: phân tích và auto-scaffold khi đủ điều kiện | `wfc materialize --request "<raw-request>" --auto-scaffold` |
| Extension sau `v1.0.0`: human approve change package do agent materialize | `wfc change-item approve --change-id <CHANGE-ID> --reviewed-by <role>` |
| Extension sau `v1.0.0`: liệt kê work item hiện có | `wfc work-item list` |
| Extension sau `v1.0.0`: xem protocol/status của work item | `wfc work-item status --work-item <slug>` |
| Extension sau `v1.0.0`: human approve work item do agent materialize | `wfc work-item approve --work-item <slug> --reviewed-by <role>` |
| Extension sau `v1.0.0`: chuyển work item vào delivery backbone | `wfc work-item activate --work-item <slug>` |
| Extension sau `v1.0.0`: validate work-item protocol + approval gate | `wfc protocol` |
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

Public baseline `v1.0.0`:

```bash
npm run validate:workflow
npm run validate:workflow:sdd
npm run validate:workflow:change
npm run validate:workflow:execution
npm run validate:workflow:planning
npm run validate:workflow:fixtures
npm run validate:workflow:authoring-smoke
```

Extension sau `v1.0.0`:

```bash
npm run materialize:work-item -- --request "fix timeout khi user login bang email/password tren web"
npm run change-item -- approve --change-id CHANGE-001 --reviewed-by po
npm run work-item -- approve --work-item fix-login-timeout --reviewed-by po
npm run validate:workflow:protocol
```
