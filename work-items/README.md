# Work Items

Thư mục này là `canonical artifact root` cho workflow artifacts thật của repo.

## Mục Đích

- chứa các work item đã được materialize thành note workflow
- làm target chuẩn cho `scaffold`, `validate` và CI phase 2
- giữ execution trace theo backbone `s01 -> s08`

## Cấu Trúc Chuẩn

```text
work-items/
  <work_item_slug>/
    <work_item_slug>.s01.restate.md
    <work_item_slug>.s02.business-goal.md
    <work_item_slug>.s03.open-questions.md
    <work_item_slug>.s04.acceptance-criteria.md
    <work_item_slug>.s05.technical-approach.md
    <work_item_slug>.s06.task-breakdown.md
    <work_item_slug>.s07.implementation.md
    <work_item_slug>.s08.verification.md
```

## Quy Ước

- tên thư mục con phải đúng bằng `work_item_slug`
- mọi note trong cùng thư mục phải dùng cùng `work_item_slug`
- step file phải bám naming chuẩn `<work_item_slug>.sNN.<step-slug>.md`
- không dùng thư mục này cho note rời không thuộc workflow backbone
- `sample-workflow-item/` hiện là sample canonical đầu tiên để CI phase 2 có artifact thật để validate
- `sample-sdd-item/` là sample canonical cho `SDD phase 1`, trỏ tới `product-specs/brd/sample-sdd-item.md` và `product-specs/srs/sample-sdd-item.md`
- `sample-sdd-item/` hiện cũng được nối với `changes/CHANGE-001/` để làm sample canonical đầu tiên cho `Phase 2: Change Layer`
- `sample-execution-item/` là sample canonical cho `Phase 3: Execution Layer`, minh họa `multi_agent`, runtime artifacts và `review_mode=independent`
- `sample-quick-item/` là sample canonical cho `planning_track=quick`
- `sample-enterprise-item/` là sample canonical cho `planning_track=enterprise`

## Command Chuẩn

Scaffold cả workflow:

```bash
npm run scaffold:workflow -- --work-item <work-item-slug>
```

Validate toàn bộ artifact root:

```bash
npm run validate:workflow -- --workflow-root work-items --project-root .
```

Validate riêng phần SDD:

```bash
npm run validate:workflow:sdd -- --workflow-root work-items --project-root .
```

Validate riêng phần change layer:

```bash
npm run validate:workflow:change -- --workflow-root work-items --project-root .
```

Validate riêng phần execution layer:

```bash
npm run validate:workflow:execution -- --workflow-root work-items
```

Validate riêng phần adaptive planning:

```bash
npm run validate:workflow:planning -- --workflow-root work-items
```
