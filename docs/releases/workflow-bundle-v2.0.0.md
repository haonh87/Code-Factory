# workflow-bundle v2.0.0

Released: `2026-04-17`  
Tag: `v2.0.0`  
Commit: `05c4cda80ac736166a551e8d231d62fc546d68ad`

## Summary

`workflow-bundle v2.0.0` là first public release của một workflow bundle cài được cho Codex. Bản này gom authoring, validation, agentic work-item proposal và human approval gates vào cùng một CLI ngắn là `wfc`.

Approval model của bản này là: `agent proposes, human approves`.

## Highlights

- Đổi public package identity từ `workflow-contracts` sang `workflow-bundle@2.0.0`.
- Chuẩn hóa command surface ngắn qua `wfc install`, `wfc update`, `wfc status`, `wfc skills`.
- Đóng gói workflow bundle runtime để package publish có thể tự cài `AGENTS.global.md`, skills và support policies mà không cần source repo gốc.
- Mở public agentic flow qua `wfc materialize`, `wfc change-item`, `wfc work-item`, `wfc protocol`.
- Bắt human approval cho change package và work item do agent đề xuất trước khi activation hoặc delivery tiếp tục.
- Thêm `wfc work-item list` để list trước rồi mới xem detail thay vì phải dò trực tiếp trong `work-items/`.
- Đồng bộ docs và help sang story `workflow-bundle v2.0.0` với system requirements rõ ràng.

## Included In This Release

- Workflow bundle install surface:
  - `wfc install --scope global|project|both`
  - `wfc update`
  - `wfc status`
  - `wfc skills list|add|remove`
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
  - `wfc protocol`
- Publishable package runtime:
  - `workflow-bundle.manifest.json`
  - bundled `runtime/codex/**`
  - package tarball `workflow-bundle-2.0.0.tgz`

## Breaking Changes And Renames

- Package rename:
  - từ `workflow-contracts`
  - sang `workflow-bundle`
- Package source tree rename:
  - từ `packages/workflow-contracts/`
  - sang `packages/workflow-bundle/`
- Config naming giờ ưu tiên `workflow-bundle.config.json`.
- Public CLI không còn dùng alias cũ kiểu `wfc pack ...`.
- Governance fixture root được dời về `packages/workflow-bundle/tests/fixtures/workflow-governance/`.

## Upgrade Notes

Nếu đang ở máy đã từng dùng package cũ:

```bash
npm uninstall -g workflow-contracts
npm install -g workflow-bundle
wfc version
wfc update
```

`wfc update` sẽ overwrite bundle theo install state hiện có và migrate state legacy nếu gặp:

- legacy config: `workflow-contracts.config.json`
- legacy install state: `.codex-workflow-pack.*`
- current install state: `.codex-workflow-bundle.*`

## System Requirements

- `node >= 18`
- `npm >= 9`
- `~/.codex` writable nếu dùng `wfc install|update|skills`
- `git` nếu clone source repo thay vì cài trực tiếp từ npm registry
- `bash` cho adapter Linux/macOS hoặc `PowerShell` cho adapter Windows

## Verification

Các checks đã chạy cho release này:

- `npm run build:workflow:bundle-runtime`
- `npm run validate:workflow:authoring-smoke`
- `npm run validate:workflow:bundle-smoke`
- `npm run validate:workflow:fixtures`
- `npm pack --json --pack-destination /tmp --cache /tmp/npm-cache-workflow-bundle-release`

Kết quả:

- runtime bundle build thành công
- authoring smoke pass
- bundle smoke pass
- fixture suite pass
- tarball publish `workflow-bundle-2.0.0.tgz` build thành công

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Known Boundaries

- Đây là public release đầu tiên, tập trung vào Codex.
- Không định vị như một release delivery hoàn toàn autonomous.
- Human vẫn là approval authority cho change package và work item.
- Legacy compatibility được giữ để migration êm hơn, không phải core product promise dài hạn.
