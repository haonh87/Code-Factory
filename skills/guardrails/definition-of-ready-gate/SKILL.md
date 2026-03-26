---
name: definition-of-ready-gate
description: Chốt Definition of Ready ở mức work item trước khi chuyển từ discovery sang design và implementation planning. Dùng khi cần xác nhận yêu cầu đã đủ rõ, scope đã đủ khóa, acceptance criteria đã testable và phần còn mơ hồ không còn chặn delivery.
---

# Definition of Ready Gate

Chốt trạng thái sẵn sàng của work item trước khi chuyển hẳn sang technical approach, chia task và implementation.

## Mục Tiêu

- Tạo gate ở mức work item, không chỉ ở mức từng step riêng lẻ.
- Xác nhận discovery hiện tại đã đủ cho developer đi tiếp mà không suy diễn mù.
- Ghi rõ blocker, assumption được chấp nhận và hành động cần làm nếu chưa READY.

## Khi Sử Dụng

- Ở cuối step 4 của workflow chain hiện tại.
- Sau khi đã có restatement, business goal, open questions/readiness report và acceptance criteria.
- Trước khi chuyển sang technical approach hoặc task breakdown.

## Không Thuộc Phạm Vi

- Không thay thế `input-readiness-assessor` ở mức step input.
- Không thay thế `step-goal-auditor` ở mức audit contract của step.
- Không chốt technical approach thay cho step 5.

## Đầu Vào Tối Thiểu

- Artifact step 1 với restatement và discovery framing.
- Artifact step 2 với business goal.
- Artifact step 3 với readiness và open questions.
- Artifact step 4 với acceptance criteria.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
work_item_slug: ""
status: READY|BLOCKED
checks:
  restated_request_clear: PASS|FAIL
  business_goal_clear: PASS|FAIL
  scope_defined: PASS|FAIL
  open_questions_non_blocking: PASS|FAIL
  acceptance_criteria_testable: PASS|FAIL
  dependencies_known: PASS|FAIL
  verification_direction_present: PASS|FAIL
blocking_gaps: []
accepted_assumptions: []
residual_risks: []
next_action: ""
```

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 4 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Definition of Ready`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.

## Luồng Đánh Giá

1. Đọc lại artifact từ step 1 đến step 4.
2. Kiểm tra work item đã có `work_item_type` và restatement rõ chưa.
3. Kiểm tra business goal và scope đã đủ rõ để quyết định hướng kỹ thuật hay chưa.
4. Kiểm tra open questions còn lại có còn chặn delivery hay không.
5. Kiểm tra acceptance criteria đã đo được và có định hướng verify sơ bộ hay chưa.
6. Kết luận `READY` hoặc `BLOCKED`, nêu `blocking_gaps` và `next_action`.

## Quy Tắc Ra Quyết Định

- `READY` khi mọi check bắt buộc đều đạt và không còn blocker chặn delivery.
- `BLOCKED` khi thiếu thông tin cốt lõi về mục tiêu, scope, dependency hoặc acceptance criteria.

## Điều Kiện Hoàn Tất

- Có kết luận `READY|BLOCKED` rõ ràng.
- Có `blocking_gaps` khi chưa READY.
- Có `next_action` đủ cụ thể để chuyển sang step tiếp theo hoặc quay lại step trước.
