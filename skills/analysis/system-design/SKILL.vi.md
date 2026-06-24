---
name: system-design
description: Chốt technical approach theo hướng DEV-led, kế thừa option thinking, failure modeling, compatibility, rollback và observability discipline từ Superpowers nhưng vẫn giữ governance, traceability và architecture follow-up của repo. Dùng khi đã có business goal và acceptance criteria, cần khóa boundary, contract, data flow và validation plan trước implementation.
language: vi
---

# System Design

> English: SKILL.md

Chốt technical approach đủ rõ để chuyển sang task planning mà không phải tự đoán lại boundary trong lúc triển khai.

<HARD-GATE>
Không được viết code production, không được scaffold project, và không được dùng skill này để backfill design sau khi đã implement.

Nếu option analysis chưa đủ, hoặc yêu cầu còn thiếu context quan trọng, phải quay lại `brainstorming` hoặc step trước thay vì ép chốt approach.

Hotfix hoặc change gấp không phải lý do để bỏ qua `failure_modes`, `compatibility_impact`, `rollback_impact` hay `observability_hooks`; chỉ được rút gọn ở mức tối thiểu đủ an toàn.
</HARD-GATE>

## Khi Sử Dụng

- Khi đã có business goal và acceptance criteria ở mức dùng được.
- Khi cần chọn technical approach giữa nhiều hướng kỹ thuật.
- Khi thay đổi chạm API, dữ liệu, data flow, integration hoặc component boundary.
- Khi thay đổi có compatibility risk, rollback risk hoặc cần quan sát production behavior sau rollout.
- Khi cần quyết định có nên gọi thêm skill kiến trúc chuyên biệt hay không.

## Không Thuộc Phạm Vi

- Không thay requirement analysis hoặc product thinking.
- Không thay task planning.
- Không trực tiếp sửa code production.
- Không né specialized skill khi boundary chuyên biệt cần khóa sâu.

## Vai Trò Mặc Định

- `developer` là owner chính của skill này.
- `ba` là vai trò support để giữ business-rule trace, scope guard và contract expectation.
- Nếu scope chạm UX, data hoặc runtime sâu, kéo thêm skill chuyên biệt tương ứng thay vì cố nhồi tất cả vào một note chung.

## Đầu Vào Tối Thiểu

- `business_goal`
- `acceptance_criteria`
- `repo_context`
- `tech_constraints`
- `nfr_constraints`
- `delivery_context`
- `option_analysis` hoặc quyết định brainstorming trước đó nếu có

Nếu thiếu acceptance criteria hoặc chưa rõ constraint chính, phải phản ánh ra trước khi chốt thiết kế.

## Technical Lane Bắt Buộc

Ngoài boundary và contract, technical lane của repo này phải khóa thêm 4 góc nhìn sau:

- `failure_modes`: hỏng theo cách nào, tác động gì và guardrail nào chặn trước.
- `compatibility_impact`: API, schema, consumer, migration order hoặc behavior cũ có bị ảnh hưởng không.
- `rollback_impact`: rollback bằng cách nào, rollback bị chặn ở đâu, có cần roll-forward-only không.
- `observability_hooks`: log, metric, trace, alert hoặc smoke signal nào giúp biết change đang chạy đúng.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
design_problem: ""
business_rule_trace: []
design_options:
  - name: ""
    summary: ""
    pros: []
    cons: []
    risks: []
rejected_options:
  - name: ""
    reason: ""
recommended_design: ""
recommendation_reason: ""
component_changes: []
data_flow: []
interface_changes: []
failure_modes:
  - scenario: ""
    impact: ""
    guardrail: ""
compatibility_impact: []
rollback_impact: []
observability_hooks: []
constraints_applied: []
validation_plan: []
specialized_followups:
  - skill: ""
    reason: ""
notes_for_next_step: ""
```

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Dùng template step 5 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Artifact Chính`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Nếu có follow-up chuyên biệt, ghi ở `## Architecture Details` hoặc artifact phụ được link từ note chuẩn.

## Quy Trình Bắt Buộc

1. Restate `design_problem` từ goal, AC và baseline repo.
2. Đọc lại `option analysis`; nếu còn yếu, quay lại `brainstorming`.
3. Đề xuất ít nhất 2 phương án nếu bài toán có nhiều hướng hợp lý.
4. Nếu hướng làm gần như hiển nhiên, vẫn phải nêu ít nhất 1 hướng thay thế hoặc hướng bị loại.
5. Áp dụng rule `giải pháp nhỏ nhất đủ đúng`.
6. Chọn `recommended_design` và nêu `recommendation_reason`.
7. Ghi `rejected_options` để làm rõ vì sao không chọn hướng còn lại.
8. Liệt kê `component_changes`, `data_flow`, `interface_changes`.
9. Mô hình hóa `failure_modes`, `compatibility_impact`, `rollback_impact`, `observability_hooks`.
10. Ghi `business_rule_trace` để đảm bảo design không đi lệch requirement gốc.
11. Nếu chạm boundary sâu, mở `specialized_followups` tương ứng.
12. Ghi `validation_plan` và `notes_for_next_step` để bàn giao sang `task-breakdown-planner`.

## Quy Tắc Chất Lượng

- Không chốt approach chỉ vì quen tay.
- Không mở thêm abstraction, service, framework hoặc boundary mới chỉ để "phòng khi sau này cần".
- Nếu chọn phương án lớn hơn, phải nêu rõ vì sao phương án nhỏ hơn không đủ.
- `business_rule_trace` không được bỏ trống khi scope có rule business, contract hoặc acceptance quan trọng.
- Nếu scope chạm contract công khai, `compatibility_impact` không được để trống.
- Nếu scope có rollout thật, `rollback_impact` và `observability_hooks` không được để trống.
- Mặc định viết và trao đổi bằng tiếng Việt có dấu.
- File văn bản phải lưu UTF-8.

## Luật Ra Quyết Định

- Ưu tiên phương án đạt acceptance criteria với độ phức tạp phù hợp.
- Nếu có phương án nhanh hơn nhưng tăng rủi ro vận hành hoặc compatibility, phải nêu rõ.
- Nếu thay đổi liên quan interface công khai, phải đưa vào `interface_changes`.
- Nếu thay đổi chạm dữ liệu, schema hoặc consumer cũ, phải mô tả explicit `compatibility_impact`.
- Nếu rollout không rollback sạch được, phải ghi rõ `rollback_impact` theo hướng roll-forward-only thay vì giả có rollback.
- Nếu production behavior không có tín hiệu quan sát đủ nhanh, phải thêm `observability_hooks` trước khi coi design là sẵn sàng.
- Nếu trọng tâm là backend domain boundary, dùng `domain-architecture`.
- Nếu trọng tâm là frontend module, route ownership, state ownership hoặc import boundary, dùng `frontend-architecture`.
- Nếu trọng tâm là screen behavior, interaction, responsive rule hoặc visual constraint, dùng `frontend-experience-design`.
- Nếu trọng tâm là schema, query pattern hoặc migration safety, dùng `database-design`.
- Nếu trọng tâm là packaging, runtime deploy hoặc release flow, dùng `deployment-devops`, `containerization-packaging`, `platform-runtime-deployment` hoặc `ci-cd-release` theo nhu cầu.

## Điều Kiện Hoàn Tất

- Có `recommended_design` và `recommendation_reason` rõ ràng.
- Có `component_changes`, `data_flow` và `interface_changes` đủ dùng cho planning.
- Có `failure_modes`, `compatibility_impact`, `rollback_impact`, `observability_hooks` ở mức phù hợp với scope.
- Có `business_rule_trace`.
- Có `validation_plan`.
- Có `specialized_followups` khi boundary cần khóa sâu hơn.
