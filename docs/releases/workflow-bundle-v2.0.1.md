# workflow-bundle v2.0.1

Released: `2026-04-20`  
Tag: `v2.0.1`  
Branch: `release/v2.0.1`

## Summary

`workflow-bundle v2.0.1` là patch release tiếp theo sau `v2.0.0`.

Bản này không đổi public CLI surface chính, nhưng siết mạnh hơn phần `agent proposes, human approves`, đặc biệt ở:

- hard-block protocol trước khi vào execution
- gate `s08` cho `release` và `business_acceptance`
- evidence có cấu trúc cho các rule thực thi ở `s07`
- cải thiện CLI/runtime cho `Codex` và `Claude Code`

## Highlights

- Siết `work-item protocol` để `ACTIVE` chỉ mở khi approval gate, bootstrap gate khi có, và evidence `s04-s06` đã đủ.
- Loại bỏ đường bypass bằng `decision_owner=human`, `review_required=false` hoặc `approval_status=NOT_REQUIRED` trên protocol-managed item/change.
- Thêm machine-enforced gate cho `release` và `business_acceptance` ở `s08`.
- Thêm `Delivery Rule Evidence` ở `s07` để trace `TDD`, `worktree`, review hai tầng và điều kiện delegation.
- Chuẩn hóa `greenfield|brownfield` rõ hơn trong authoring, protocol và docs.
- Bổ sung runtime mode `claude` cho `wfc install|update|status|skills`, đồng thời thêm interactive prompt cho `mode/scope`.
- Đổi default `wfc work-item activate` sang execution step `s07` để khớp semantics của gate mới.
- Đồng bộ docs, glossary, human review gates và tài liệu audit alignment để giảm drift giữa policy và runtime.

## Included In This Release

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
  - `wfc protocol`

## Upgrade Notes

Nếu máy đang ở `workflow-bundle@2.0.0`:

```bash
npm install -g workflow-bundle@2.0.1
wfc version
wfc update --mode codex
wfc update --mode claude
```

Nếu đang dùng source repo:

```bash
cd packages/workflow-bundle
npm run bundle:workflow-bundle-runtime
npm link
wfc version
```

## Verification

Các checks đã chạy cho release này:

- `git diff --check`
- `node packages/workflow-bundle/scripts/validate-workflow-governance.js --workflow-root work-items --project-root .`
- `node packages/workflow-bundle/scripts/validate-work-item-protocol.js --workflow-root work-items --project-root .`
- `node packages/workflow-bundle/scripts/validate-workflow-change.js --workflow-root work-items --project-root .`
- `cd packages/workflow-bundle && node scripts/run-workflow-governance-fixtures.js`
- `cd packages/workflow-bundle && node scripts/run-workflow-authoring-smoke.js`

Kết quả:

- governance validator pass
- protocol validator pass
- change validator pass
- governance fixtures pass
- authoring smoke pass

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Notes

- `v2.0.0` vẫn là first public release.
- `v2.0.1` là patch release tập trung vào hardening, clarity và CLI/runtime consistency.
