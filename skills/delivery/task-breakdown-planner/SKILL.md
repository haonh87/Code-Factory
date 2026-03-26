---
name: task-breakdown-planner
description: Chia technical approach thành các task nhỏ có thứ tự, dependency và tiêu chí verify rõ ràng trước khi triển khai. Dùng khi đã có hướng kỹ thuật được chọn và cần chuyển sang kế hoạch implementation đủ chi tiết để thực thi an toàn.
---

# Task Breakdown Planner

Chia implementation thành các việc nhỏ có thể thực thi, kiểm chứng và review.

## Mục Tiêu

- Biến technical approach thành danh sách task rõ ràng, có thứ tự.
- Giảm rủi ro bằng cách tách thay đổi lớn thành các phần nhỏ.
- Xác định dependency, điểm verify và rủi ro chính của từng task.

## Khi Sử Dụng

- Sau khi đã có `recommended_design`.
- Trước khi bước vào implementation.
- Khi thay đổi đủ lớn để không nên đi thẳng từ design sang code.

## Không Thuộc Phạm Vi

- Không redesign lại solution ở mức kiến trúc.
- Không trực tiếp sửa code production.
- Không thay thế testing cuối cùng.

## Đầu Vào Tối Thiểu

- `recommended_design`
- `acceptance_criteria`
- `constraints`
- `repo_context`

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
implementation_goal: ""
task_breakdown:
  - id: T1
    name: ""
    objective: ""
    dependencies: []
    outputs_expected: []
    verification_hint: ""
dependencies_global: []
risk_notes: []
verification_plan: []
notes_for_implementation: ""
```

## Ý Nghĩa Từng Output

- `task_breakdown`: danh sách task đủ nhỏ để thực thi độc lập hoặc tuần tự.
- `dependencies_global`: phụ thuộc chung ảnh hưởng nhiều task.
- `risk_notes`: rủi ro cần lưu ý trong lúc implement.
- `verification_plan`: điểm kiểm chứng chính cho từng nhóm task.
- `notes_for_implementation`: ghi chú bàn giao sang skill `implementation`, gồm deployment artifact hoặc rollout note khi có.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 6 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Artifact Chính`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Các bullet kiểm tra nhanh hoặc rollout note đặt ở `## Verification Plan`, không thay thế block YAML.

## Luồng Thực Thi

1. Đọc `recommended_design` và acceptance criteria.
2. Tách thay đổi thành các nhóm việc hợp lý.
3. Sắp thứ tự task theo dependency và rủi ro.
4. Gắn output kỳ vọng và gợi ý verify cho từng task.
5. Tổng hợp risk note và verification plan.
6. Bàn giao sang implementation.

## Quy Tắc Chất Lượng

- Task phải đủ nhỏ để review được.
- Task phải có output kỳ vọng rõ ràng.
- Mặc định trao đổi và tài liệu bằng tiếng Việt.
- File văn bản phải lưu UTF-8.

## Luật Ra Quyết Định

- Nếu một task quá lớn để verify riêng, tách tiếp.
- Nếu có dependency chặn toàn bộ implementation, đẩy nó lên sớm.
- Nếu có task “nice to have” không bắt buộc cho AC, đưa ra ngoài phạm vi chính.
- Nếu scope có deployment artifact, tách riêng task build image, compose hoặc manifest, smoke check và rollback guard; không gộp mơ hồ vào một task “deploy”.

## Điều Kiện Hoàn Tất

- Có `task_breakdown` đủ rõ để implementation bắt đầu ngay.
- Có `verification_plan` và `risk_notes`.
- Có `notes_for_implementation` để bàn giao sang bước implement.
