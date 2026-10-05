---
language: vi
name: definition-of-done-gate
description: Chuẩn bị đánh giá đề xuất Definition of Done để human QC phê duyệt sau verify kỹ thuật. Kiểm tra acceptance evidence, implementation, verification và truy vết business -> design -> code -> verify; skill không tự approve gate hoặc đóng work item.
---

# Definition of Done Gate

> English: SKILL.md

Đánh giá technical work item đã sẵn sàng để human phê duyệt DoD hay chưa, sau khi implementation và verify hoàn tất.

AI lập đánh giá đề xuất. Chỉ human reviewer có thẩm quyền QC mới được approve DoD tại `s08`; việc hoàn tất work item do protocol quản lý còn cần trusted receipt tương ứng và các transition protocol hợp lệ. Test pass hoặc đề xuất `DONE` của AI không tự đóng work item.

## Mục Tiêu

- Chuẩn bị bằng chứng cho gate DoD ở mức work item, ngoài test result của step verify.
- Đánh giá bằng chứng đã đủ để đề nghị human phê duyệt hoàn tất technical work hay chưa.
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

Field `status` ghi đề xuất của AI, không phải quyết định human gate hoặc trạng thái protocol. Giữ human review và trusted receipt riêng với đánh giá này.

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
7. Đề xuất `DONE`, `PARTIAL` hoặc `BLOCKED` và chuyển đánh giá cho human reviewer có thẩm quyền QC; không tự pass gate hoặc đóng work item.

## Quy Tắc Ra Quyết Định

- Đề xuất `DONE` khi mọi check bắt buộc đạt và không còn gap blocker; cần quyết định DoD của human và trusted receipt tương ứng trước khi protocol hoàn tất.
- Đề xuất `PARTIAL` khi còn thiếu bằng chứng hoặc còn việc phải làm; ghi owner và bước tiếp theo. Đánh giá này không cấp quyền đóng work item.
- Đề xuất `BLOCKED` khi thiếu evidence quan trọng, thiếu traceability hoặc verify chưa đủ.

## Điều Kiện Hoàn Tất

- Có đánh giá đề xuất `DONE|PARTIAL|BLOCKED` rõ ràng và handoff để human quyết định. Hoàn tất đánh giá không có nghĩa work item đã hoàn tất.
- Có `gaps` và `next_action` nếu chưa DONE.
- Có `follow_up_items` khi còn việc ngoài phạm vi hiện tại.
