# Changes

Thư mục này là source-of-truth cho `change layer` của repo.

## Mục Đích

- đóng gói từng thay đổi theo kiểu `proposal -> design -> tasks -> spec-delta -> archive`
- nối `work-items/` với `BRD/SRS` mà không thay chúng
- làm artifact root cho validator và CI của `Phase 2`

## Cấu Trúc Chuẩn

```text
changes/
  <change-id>/
    proposal.md
    design.md
    tasks.md
    spec-delta/
      brd.delta.md
      srs.delta.md
    execution/
      task-status.md
    archive-metadata.md
```

## Command Chuẩn

Scaffold một change package:

```bash
npm run scaffold:change -- --change-id CHANGE-001 --work-item <work-item-slug>
```

Approve change package do agent materialize:

```bash
npm run change-item -- approve --change-id CHANGE-001 --reviewed-by <role>
```

Validate change layer:

```bash
npm run validate:workflow:change -- --workflow-root work-items --project-root .
```

## Sample

- `CHANGE-001` hiện là sample canonical đầu tiên cho phase 2 và được nối với `work-items/sample-sdd-item/`.
