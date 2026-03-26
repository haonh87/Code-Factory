---
name: implementation
description: Triển khai thay đổi phần mềm theo thiết kế và task breakdown đã chốt. Dùng khi cần viết code, sửa lỗi, refactor, cập nhật config hoặc tài liệu liên quan, với mục tiêu tạo outputs thực tế đúng phạm vi, đúng convention và bám sát acceptance criteria.
---

# Implementation

Triển khai thay đổi thực tế trong codebase theo hướng đã chốt.

## Mục Tiêu

- Biến technical approach và task breakdown thành thay đổi thực tế trong hệ thống.
- Giữ phạm vi chỉnh sửa tập trung, đúng mục tiêu và đúng convention hiện có.
- Tạo ra output rõ ràng để bước verify có thể kiểm tra được.

## Khi Sử Dụng

- Khi yêu cầu đã có thiết kế kỹ thuật đủ rõ để bắt đầu sửa code.
- Khi cần thêm feature, sửa bug, refactor hoặc chỉnh config/doc đi kèm, gồm Dockerfile, compose hoặc manifest khi thuộc phạm vi.

## Không Thuộc Phạm Vi

- Không tự thay đổi mục tiêu business hoặc acceptance criteria đã chốt.
- Không tự đổi kiến trúc lớn nếu chưa phản hồi lại bước thiết kế.
- Không bỏ qua quality gates khi đã biết cần verify.

## Đầu Vào Tối Thiểu

- `recommended_design`
- `task_breakdown`
- `coding_conventions`
- `files_in_scope`
- `constraints`

Nếu chưa biết chính xác files hoặc modules bị ảnh hưởng, phải làm rõ trước khi sửa hàng loạt.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
recommended_design: ""
tasks_completed: []
code_changes: []
doc_changes: []
config_changes: []
outputs_actual: []
known_limitations: []
follow_up_items: []
notes_for_testing: ""
```

## Ý Nghĩa Từng Output

- `tasks_completed`: các task đã thực hiện xong.
- `code_changes`: thay đổi code chính.
- `doc_changes`: thay đổi tài liệu liên quan.
- `config_changes`: thay đổi cấu hình hoặc môi trường, gồm cả artifact deploy khi phù hợp.
- `outputs_actual`: danh sách artifact thực tế tạo ra hoặc chỉnh sửa.
- `known_limitations`: giới hạn còn lại sau implement.
- `follow_up_items`: việc nên làm tiếp nhưng chưa thuộc phạm vi hiện tại.
- `notes_for_testing`: thông tin cần bàn giao cho bước verify/testing.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 7 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Artifact Chính`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Step 7 chỉ tạo note khi thực sự có `doc_changes`, cần handoff riêng, hoặc người dùng yêu cầu artifact doc.

## Luồng Thực Thi

1. Đối chiếu thiết kế với task breakdown.
2. Chọn thứ tự triển khai ít rủi ro nhất.
3. Sửa code/tài liệu/config trong phạm vi cần thiết.
4. Ghi lại rõ `code_changes`, `doc_changes`, `config_changes`.
5. Tổng hợp `outputs_actual`, `known_limitations`, `follow_up_items`.
6. Chuẩn bị `notes_for_testing` cho bước verify.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt; code theo convention của project.
- Tài liệu văn bản phải lưu UTF-8 và giữ đúng dấu tiếng Việt.
- Chỉ chỉnh sửa ngoài phạm vi khi có lý do kỹ thuật bắt buộc và phải nêu rõ.
- Ưu tiên thay đổi nhỏ, tập trung, dễ review.
- Không tạo thêm complexity nếu không có giá trị rõ ràng.

## Luật Ra Quyết Định

- Nếu phát hiện design hiện tại không khả thi, dừng và phản hồi lại thay vì lách bằng workaround mơ hồ.
- Nếu phải đổi hành vi ngoài scope để giữ tính đúng đắn, phải ghi vào `follow_up_items` hoặc báo lại người dùng.
- Nếu có giới hạn chưa giải quyết được trong lượt này, phải ghi vào `known_limitations`.
- Nếu scope có deploy artifact, ghi rõ file nào là Dockerfile, compose, manifest hoặc pipeline config trong `config_changes` hoặc `outputs_actual`.

## Điều Kiện Hoàn Tất

- Có `outputs_actual` khớp với mục tiêu implementation.
- Có ghi nhận đầy đủ `code_changes`, `doc_changes`, `config_changes`.
- Có `notes_for_testing` đủ để bước verify thực thi ngay.
