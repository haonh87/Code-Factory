# workflow-bundle v2.0.2

Released: `2026-04-20`
Tag: `v2.0.2`
Branch: `release/v2.0.2`

## Changelog

`workflow-bundle v2.0.2` là patch release tiếp theo sau `v2.0.1`, tập trung vào capability control và trusted human approval enforcement để giảm khả năng bypass các gate bắt buộc human review/approve.

### Added

- Thêm `workflow-capability-control.js` để khóa implementation path ở mức filesystem cho tới khi protocol mở `ACTIVE + s07 + granted_write_paths`.
- Thêm `wfc capability status|sync|check` để inspect và sync capability control.
- Thêm `workflow-trusted-approval-utils.js` để tạo và verify trusted signed receipts ngoài project root.
- Thêm `workflow-gate-review.js` và command `wfc gate approve|reject|status` cho trusted human approval ở các gate workflow.
- Thêm smoke case `capability-control` để kiểm lock/unlock implementation path thật.

### Changed

- `wfc work-item activate|resume` giờ bắt buộc có `--write-root` hoặc `granted_write_paths` sẵn có.
- `work-item`, `change-item` và workflow gate approval không còn chỉ dựa vào metadata trong note/report; protocol sẽ cross-check trusted signed receipts trước khi mở `ACTIVE`, `VERIFIED`, `DONE`.
- `greenfield bootstrap` không còn nhận self-attested CLI metadata kiểu `--bootstrap-reviewed-by`; bootstrap approval phải đi qua trusted gate receipt.
- `materialize`, `init`, `scaffold`, `scaffold-change` và protocol transition sẽ sync capability control tự động để write policy nhất quán hơn.
- Public docs, quickstart, help text và protocol reference đã được cập nhật theo flow mới.

### Fixed

- Sửa gap giữa `human-controlled gates` và runtime enforcement khi agent không chỉ đi qua validator mà còn sửa implementation path trực tiếp.
- Sửa footgun bootstrap legacy và mutating action bootstrap report.
- Sửa gap “AI tự khai reviewed_by là đủ” bằng signed receipts gắn với artifact digest.

## Scope

- Workflow bundle install surface:
  - `wfc install --mode codex|claude --scope global|project|both`
  - `wfc update --mode codex|claude`
  - `wfc status --mode codex|claude`
  - `wfc skills list|add|remove --mode codex|claude`
- Core authoring CLI:
  - `wfc init`
  - `wfc scaffold`
  - `wfc scaffold-step`
  - `wfc scaffold-change`
  - `wfc`
  - `wfc naming|governance|sdd|change|exec|plan`
- Agentic governance flow:
  - `wfc materialize`
  - `wfc change-item`
  - `wfc work-item`
  - `wfc gate`
  - `wfc capability`
  - `wfc protocol`

## Verification

Các checks đã chạy cho release này:

- `npm run bundle:workflow-bundle-runtime`
- `git diff --check`
- `node packages/workflow-bundle/scripts/validate-workflow-governance.js --workflow-root work-items --project-root .`
- `node packages/workflow-bundle/scripts/validate-work-item-protocol.js --workflow-root work-items --project-root .`
- `node packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js`
- `node packages/workflow-bundle/scripts/run-workflow-bundle-smoke.js`
- `node packages/workflow-bundle/bin/wfc.js help`

Kết quả:

- governance validator pass
- protocol validator pass
- authoring smoke pass
- bundle smoke pass
- help surface pass

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.0.0` vẫn là first public release.
- `v2.0.1` là patch release hardening semantics/protocol.
- `v2.0.2` là patch release siết capability control và trusted human approval enforcement.
