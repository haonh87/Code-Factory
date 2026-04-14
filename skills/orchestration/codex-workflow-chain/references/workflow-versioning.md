# Workflow Versioning

Tài liệu này chốt phạm vi public baseline `v1.0.0`.

Thời điểm đối chiếu: `2026-04-14`.

## Public Baseline `v1.0.0`

Public baseline `v1.0.0` gồm:

- workflow backbone `s01 -> s08`
- `work-items/` là canonical artifact root
- scaffold workflow bằng `work_item_slug` do human hoặc coordinator chốt trước
- scaffold change package bằng `change_id` do human hoặc coordinator chốt trước
- governance layer
- `SDD` layer
- change layer
- execution support theo `agentic|multi_agent`
- adaptive planning theo `quick|full|enterprise`
- validator cho naming, governance, `SDD`, change, execution và planning
- authoring smoke cho luồng `scaffold -> validate`

## Không Thuộc `v1.0.0`

Các phần dưới đây không thuộc public baseline này:

- `Work Item Materialization`
- `Work Item Protocol`
- approval gate và lifecycle command ở cấp work item

## Command Surface Khuyến Nghị

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

## Quy Tắc Giao Tiếp

- nếu nói `v1.0.0`, mặc định kể flow manual `scaffold -> validate`
- có thể nhắc `agentic|multi_agent` như execution support thuộc baseline
- không dùng `memory-bank/` làm public onboarding path
