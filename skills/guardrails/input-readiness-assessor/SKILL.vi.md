---
language: vi
name: input-readiness-assessor
description: Đánh giá mức độ sẵn sàng đầu vào trước khi thực thi một bước trong workflow coding. Dùng khi cần xác nhận dữ liệu đầu vào đủ, đúng, nhất quán và có thể kiểm chứng để quyết định READY hoặc BLOCKED, kèm báo cáo input-readiness-report.
---

# Input Readiness Assessor

> English: SKILL.md

Đánh giá mức độ sẵn sàng của đầu vào trước khi bắt đầu thực thi step.

## Mục Tiêu

- Ngăn triển khai khi thiếu hoặc sai dữ liệu đầu vào.
- Chuẩn hóa quyết định chuyển bước bằng trạng thái `READY` hoặc `BLOCKED`.
- Xuất báo cáo có thể truy vết để phục vụ kiểm định và bàn giao.

## Khi Sử Dụng

- Khi một step cần xác nhận đủ dữ liệu để bắt đầu an toàn.
- Khi còn câu hỏi mở, dependency chưa rõ hoặc nhiều nguồn context mâu thuẫn.
- Khi cần quyết định có được phép chuyển sang implementation hay không.

## Không Thuộc Phạm Vi

- Không tự bù input bắt buộc bằng suy đoán.
- Không thay thế bước requirement analysis hoặc product thinking.
- Không chấm PASS/FAIL cuối cùng cho toàn bộ step; đó là trách nhiệm của `step-goal-auditor`.

## Đầu Vào Tối Thiểu

- `inputs_required` từ Step Goal Contract.
- Dữ liệu đầu vào thực tế hiện có.
- Ràng buộc kỹ thuật, chất lượng liên quan đến step hiện tại.

Nếu không xác định được `inputs_required`, phải phản hồi rằng contract của step chưa đủ để đánh giá readiness.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
step: ""
status: READY|BLOCKED
available_inputs: []
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions: []
risk_level: LOW|MEDIUM|HIGH
next_action: ""
```

## Ý Nghĩa Từng Output

- `available_inputs`: đầu vào đang có và có thể dùng được.
- `missing_inputs`: đầu vào bắt buộc còn thiếu.
- `invalid_inputs`: đầu vào có nhưng không hợp lệ hoặc không đáng tin.
- `conflicts`: xung đột giữa các nguồn thông tin.
- `assumptions`: giả định tạm thời đang dùng.
- `risk_level`: mức rủi ro của trạng thái readiness hiện tại.
- `next_action`: hành động cụ thể để chuyển step tiếp theo.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 3 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Input Readiness`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Trạng thái `READY|BLOCKED` trong prose tóm tắt phải khớp với `status` trong block YAML.

## Luồng Đánh Giá

1. Liệt kê danh sách `inputs_required`.
2. Đối chiếu từng input với dữ liệu thực tế.
3. Kiểm tra tính hợp lệ: định dạng, phiên bản, độ tin cậy nguồn.
4. Kiểm tra mâu thuẫn giữa các input.
5. Ghi giả định nếu có thông tin chưa thể xác nhận ngay.
6. Xuất `status` và `next_action` rõ ràng.

## Quy Tắc Ra Quyết Định

- `READY` khi:
  - Không còn `missing_inputs` bắt buộc.
  - Không có `invalid_inputs` ở mức nghiêm trọng.
  - Không có xung đột chưa xử lý.

- `BLOCKED` khi:
  - Thiếu input bắt buộc.
  - Có input không hợp lệ ảnh hưởng trực tiếp đến thực thi.
  - Có xung đột dữ liệu chưa được làm rõ.

## Quy Tắc Chất Lượng

- Không phỏng đoán để lấp chỗ trống cho input bắt buộc.
- Mỗi kết luận phải có bằng chứng hoặc chỉ rõ giả định.
- Mặc định báo cáo bằng tiếng Việt và lưu UTF-8.
- Nếu có nhiều nguồn input, phải ưu tiên nguồn có độ tin cậy cao hơn và ghi rõ.

## Điều Kiện Hoàn Tất

- Có `input-readiness-report` đầy đủ theo schema.
- Trạng thái cuối cùng (`READY` hoặc `BLOCKED`) rõ ràng.
- `next_action` đủ cụ thể để bước tiếp theo thực thi ngay.
