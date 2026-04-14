# workflow-contracts

`workflow-contracts` là package CLI để scaffold và enforce workflow contracts trong local hoặc CI.

## CLI

```bash
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

## Config

CLI sẽ tự tìm `workflow-contracts.config.json` từ thư mục hiện tại đi ngược lên các thư mục cha.

Ví dụ:

```json
{
  "projectRoot": ".",
  "workflowRoot": "work-items"
}
```

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
