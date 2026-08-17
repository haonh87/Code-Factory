# Workflow Governance Fixtures

Bộ fixture này dùng để test workflow validators qua command chuẩn `npm`.

Đây là fixture root canonical cho governance validator trong package `workflow-bundle` và cũng là fixture root nên được dùng khi publish repo.

Mục tiêu:

- có case `pass` cho các profile `default`, `regulated`, `custom`
- có case `fail` tách lỗi theo từng rule chính
- cho phép chạy validator độc lập với repo gốc nhờ `project-context/` riêng của fixture suite

## Cấu Trúc

- `project-context/`: Governance Pack tối giản dùng chung cho toàn bộ fixture suite
- `valid-default/workflow/`: flow pass cơ bản với `governance_profile=default`
- `valid-regulated-waiver/workflow/`: flow pass với `regulated`, exception register và `WAIVER_APPROVED`
- `valid-custom/workflow/`: flow pass với `governance_profile=custom`
- `invalid-missing-block/workflow/`: fail vì thiếu block governance bắt buộc theo step
- `invalid-checklist-mismatch/workflow/`: fail vì `checklist_refs` không khớp `governance_profile`
- `invalid-waiver-missing-approval/workflow/`: fail vì `WAIVER_APPROVED` thiếu `approved_by` hoặc `review_date`
- `invalid-waiver-wrong-authority/workflow/`: fail vì `WAIVER_APPROVED` không đạt authority tối thiểu theo role model
- `invalid-reviewed-gate-pending/workflow/`: fail vì note đã qua `draft` nhưng vẫn giữ `governance_status=CHECKS_PENDING` ở gate `s04`
- `invalid-empty-required-evidence.s04.md`: fragment âm cho evidence list bắt buộc nhưng rỗng
- `invalid-placeholder-evidence.s04.md`: fragment âm cho criterion/DoR còn placeholder
- `invalid-coverage-total.s08.md`: fragment âm cho coverage rows, summary và verdict tự mâu thuẫn
- `stale-gate-receipt.json`: receipt có artifact digest cũ
- `contradictory-protocol-state.json`: blocker/required action nói gate còn pending sau trusted receipt `APPROVED`
- `valid-semantic-evidence.s04.md`: control fragment hợp lệ cho semantic evidence checks

## Cách Chạy

Từ root repo:

```bash
npm run validate:workflow -- \
  --workflow-root packages/workflow-bundle/tests/fixtures/workflow-governance/valid-default/workflow \
  --project-root packages/workflow-bundle/tests/fixtures/workflow-governance
```

```bash
npm run validate:workflow -- \
  --workflow-root packages/workflow-bundle/tests/fixtures/workflow-governance/valid-regulated-waiver/workflow \
  --project-root packages/workflow-bundle/tests/fixtures/workflow-governance
```

```bash
npm run validate:workflow -- \
  --workflow-root packages/workflow-bundle/tests/fixtures/workflow-governance/invalid-waiver-missing-approval/workflow \
  --project-root packages/workflow-bundle/tests/fixtures/workflow-governance
```

Hoặc chạy toàn bộ fixture suite:

```bash
npm run validate:workflow:fixtures
```

## Ghi Chú

- Fixture suite này ưu tiên test governance validator, không nhằm thay thế full end-to-end workflow examples.
- Semantic evidence checks được enforce tại transition/governance validation cho profile `strict|regulated`; fragment tests vẫn gọi trực tiếp rule set đầy đủ để khóa từng lỗi độc lập.
- Các file note vẫn giữ naming chuẩn `<work_item_slug>.sNN.<step-slug>.md` để có thể dùng chung cho naming validator nếu cần.
- Root `tests/fixtures/workflow-governance/` ở repo không còn là canonical source để tránh drift hai cây fixture giống nhau.
