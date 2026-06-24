---
language: vi
---

# Workflow Versioning

> Tiếng Anh / English: workflow-versioning.md

Tài liệu này chốt ranh giới giữa public baseline `v1.0.0` và các extension sau đó.

Thời điểm đối chiếu: `2026-04-14`.

## Câu Chốt

- `v1.0.0` = manual scaffold backbone + validator lanes + execution support có sẵn
- extension sau `v1.0.0` = `Work Item Materialization`, `Work Item Protocol` và lifecycle/approval ở cấp work item

## Public Baseline `v1.0.0`

Đây là release public đầu tiên và là câu chuyện mặc định khi onboarding người dùng mới.

### Bao Gồm

- workflow backbone `s01 -> s08`
- `work-items/` là canonical artifact root
- scaffold workflow bằng `work_item_slug` do human hoặc coordinator chốt trước
- scaffold change package bằng `change_id` do human hoặc coordinator chốt trước
- governance layer
- `SDD` layer
- change layer
- execution support theo `agentic|multi_agent`
- adaptive planning theo `quick|full|enterprise`
- validator cho naming, governance, `SDD`, change, execution, planning
- authoring smoke cho luồng `scaffold -> validate`

### Không Bao Gồm

- `Work Item Materialization`
- `Work Item Protocol`
- auto-derive `work_item_slug` từ raw request
- approval gate ở cấp work item
- lifecycle command như `work-item approve|activate|close`

### Quan Trọng

- execution support thuộc phạm vi `v1.0.0`
- execution support không có nghĩa mọi work item đều phải bật `agentic` hoặc `multi_agent`
- baseline mặc định vẫn là flow manual scaffold

### Command Surface Khuyến Nghị

```bash
wfc init
wfc scaffold --work-item <work-item-slug>
wfc scaffold-change --change-id <CHANGE-ID> --work-item <work-item-slug>
wfc
wfc sdd
wfc change
wfc exec
wfc plan
```

### Cách Vận Hành

- human nhận raw request
- human hoặc coordinator chốt `work_item_slug`
- nếu cần change package thì scaffold change trước
- scaffold workflow
- điền nội dung `s01 -> s08`
- chạy validator phù hợp với layer đang bật

## Extension Sau `v1.0.0`

Các lớp sau không thuộc public baseline.

- `Work Item Materialization`
- `Work Item Protocol`
- approval gate và lifecycle command ở cấp work item

### Mục Đích

- giảm thao tác manual trước `scaffold`
- cho phép agent đề xuất hoặc tạo work item có kiểm soát
- tăng khả năng audit ở cấp work item lifecycle

### Command Surface Mở Rộng

```bash
wfc materialize --request "<raw-request>"
wfc materialize --request "<raw-request>" --auto-scaffold
wfc work-item status --work-item <work-item-slug>
wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>
wfc work-item activate --work-item <work-item-slug>
wfc protocol
```

## Trạng Thái Repo

Repo hiện tại có thể chứa cả baseline `v1.0.0` và code/docs của extension sau đó.

Điều đó không có nghĩa:

- mọi team phải dùng extension ngay
- onboarding nên bắt đầu từ extension
- `agentic` bị xem là post-`v1.0.0`

## Quy Tắc Giao Tiếp

Khi viết doc, quickstart hoặc help:

- nếu nói `v1.0.0`, mặc định kể flow manual `scaffold -> validate`
- có thể nhắc `agentic|multi_agent` như execution support thuộc baseline
- nếu nhắc `materialize`, `work-item protocol` hoặc approval lifecycle, phải ghi rõ đó là extension sau `v1.0.0`

## Quy Tắc Vocabulary

- dùng `scaffold` cho việc sinh note hoặc package
- dùng `implemented` hoặc `available` cho capability đã có trong repo
- chỉ dùng `materialize` cho extension `Work Item Materialization`
