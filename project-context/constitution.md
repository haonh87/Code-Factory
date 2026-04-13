# Constitution

Tài liệu này định nghĩa các nguyên tắc nền của workflow cho repo `AI Agent Ops / Code-Factory`.

## Phạm Vi

- Áp dụng cho workflow coding 8 bước.
- Áp dụng cho policy, skill, MCP, adapter và tài liệu vận hành trong repo này.
- Áp dụng cho mọi `governance_profile`, trừ khi có `waiver` hợp lệ được ghi nhận rõ.

## Các Nguyên Tắc Nền

### `GOV-01` Backbone First

- Mọi work item phải đi qua backbone `Clarify -> Business Goal -> Open Questions -> Acceptance + DoR -> Technical Approach -> Task Plan -> Implement -> Verify + DoD`.
- Không tạo workflow song song để né gate chính.

### `GOV-02` Source Of Truth Rõ Ràng

- Note step `.md` là source-of-truth của execution trace.
- `BRD/SRS` là source-of-truth của rollout spec khi work item chạy theo SDD.
- `project-context/` là source-of-truth cho lớp governance ở mức project.

### `GOV-03` Clarify Trước Khi Commit Giải Pháp

- Không đẩy nhanh sang `Technical Approach` khi chưa rõ intent, scope, assumption và blocker trọng yếu.
- `governance context` phải được ghi nhận trước khi solution đi sâu.

### `GOV-04` Traceability Xuyên Delivery

- Requirement, acceptance, task, implementation và verify phải trace được xuyên step khi scope đủ lớn.
- Nếu dùng NotebookLM, project search hoặc corpus ngoài repo, kết luận phải được chuẩn hóa lại vào artifact chính.

### `GOV-05` Exception Và Waiver Phải Explicit

- Không được âm thầm đi lệch nguyên tắc nền.
- Mọi `governance-exception` hoặc `waiver` phải có lý do, impact, mitigation, owner và trạng thái rõ.

### `GOV-06` Evidence Trước Khi Kết Luận Done

- `DoD`, `release` và `business_acceptance` chỉ được chốt khi evidence đủ rõ hoặc limitation đã được nêu minh bạch.
- Nếu không chạy được kiểm tra cần thiết, phải nêu rõ phần bỏ qua và lý do.

### `GOV-07` Đồng Bộ Docs, Policy Và Runtime Reality

- Không để workflow docs, policy và template note drift quá xa nhau.
- Khi contract hoặc metadata thay đổi, phải cập nhật các entrypoint chính cùng lúc.

### `GOV-08` Kiểm Soát Secrets, Environment Và Side Effect

- Không commit secrets hoặc ghi secret vào docs/template.
- Với change có side effect runtime hoặc release, phải làm rõ boundary môi trường, rollback path và owner.

## Rule Cho Waiver

Một `waiver` chỉ được xem là hợp lệ khi có đủ:

- `principle_ref`
- `reason`
- `impact`
- `mitigation`
- `approved_by`
- `review_date` hoặc điều kiện hết hiệu lực

Nếu thiếu một trong các trường trên, coi như exception chưa được approve.

Authority để xác định `approved_by` phải theo `project-context/governance-role-model.md`, không được tự suy diễn chỉ từ role đang edit note hoặc role signoff của step.
