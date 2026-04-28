---
name: definition-of-done-gate
description: Chốt Definition of Done ở mức work item sau khi verify kỹ thuật. Dùng khi cần xác nhận acceptance criteria đã có evidence, implementation đã được ghi nhận, verify đã đủ và truy vết business -> design -> code -> verify đã hoàn chỉnh trước khi đóng technical work.
---

# Definition of Done Gate

Chốt trạng thái hoàn tất của technical work item sau khi implementation và verify đã chạy xong.

## Mục Tiêu

- Tạo gate ở mức work item thay vì chỉ dừng ở test result của step verify.
- Xác nhận thay đổi đã đủ bằng chứng để xem là xong về mặt technical workflow.
- Ghi rõ gap, residual risk và follow-up item nếu chưa thể xem là DONE.

## Khi Sử Dụng

- Ở cuối step 8 của workflow chain hiện tại.
- Sau khi đã có verification report, scan summary, audit và bằng chứng implementation.

## Không Thuộc Phạm Vi

- Không thay thế `testing` ở mức chiến lược test và evidence verify.
- Không thay thế `step-goal-auditor` ở mức audit step contract.
- Không thay thế việc thực thi rollout hoặc release thật trên môi trường đích; gate này chỉ khóa mức sẵn sàng và bằng chứng.

## Đầu Vào Tối Thiểu

- Acceptance criteria đã chốt.
- Artifact implementation hoặc outputs actual.
- Verification report, scan summary và audit step 8.
- Traceability từ business -> design -> code -> verify.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
work_item_slug: ""
status: DONE|PARTIAL|BLOCKED
checks:
  acceptance_criteria_evidenced: PASS|FAIL
  implementation_recorded: PASS|FAIL
  required_verification_completed: PASS|FAIL
  code_scan_completed_or_justified: PASS|FAIL
  traceability_complete: PASS|FAIL
  residual_risks_documented: PASS|FAIL
gaps: []
residual_risks: []
follow_up_items: []
next_action: ""
```

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 8 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Definition of Done`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.

## Luồng Đánh Giá

1. Đối chiếu acceptance criteria với verification evidence.
2. Kiểm tra implementation đã được ghi nhận đủ để truy vết.
3. Kiểm tra các verify bắt buộc đã chạy hoặc đã có lý do skip hợp lệ, bao gồm deployment review nếu work item có scope packaging hoặc rollout.
4. Kiểm tra scan code quality đã hoàn tất hoặc có biện minh rõ.
5. Kiểm tra traceability đã nối đủ business -> design -> code -> verify hay chưa.
6. Kiểm tra residual risk và follow-up item đã được ghi rõ hay chưa.
7. Kết luận `DONE`, `PARTIAL` hoặc `BLOCKED`.

## Quy Tắc Ra Quyết Định

- `DONE` khi mọi check bắt buộc đạt và không còn gap blocker.
- `PARTIAL` khi xong phần lớn nhưng còn gap không chặn việc đóng technical work ngay.
- `BLOCKED` khi thiếu evidence quan trọng, thiếu traceability hoặc verify chưa đủ.

## Điều Kiện Hoàn Tất

- Có kết luận `DONE|PARTIAL|BLOCKED` rõ ràng.
- Có `gaps` và `next_action` nếu chưa DONE.
- Có `follow_up_items` khi còn việc ngoài phạm vi hiện tại.
