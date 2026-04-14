# Product Specs

Thư mục này là source-of-truth cho `BRD/SRS` khi work item chạy theo `SDD`.

## Cấu Trúc

```text
product-specs/
  brd/
    <scope>.md
  srs/
    <scope>.md
  templates/
    brd.template.md
    srs.template.md
```

## Quy Ước

- `brd/` giữ business truth ở mức rollout.
- `srs/` giữ requirement truth ở mức rollout.
- `work-items/` chỉ giữ execution trace; không thay `BRD/SRS`.
- nếu work item có `sdd_mode=light|strict`, `spec_refs.brd` và `spec_refs.srs` nên trỏ về artifact thật trong thư mục này.

## Sample

- `brd/sample-sdd-item.md`
- `srs/sample-sdd-item.md`

Hai file này là sample `SDD` đầu tiên để validator và CI phase 1 có artifact thật để kiểm.
