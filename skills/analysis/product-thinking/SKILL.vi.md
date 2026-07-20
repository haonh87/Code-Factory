---
name: product-thinking
description: Xác định mục tiêu business và giá trị người dùng cho yêu cầu phát triển phần mềm trước khi chọn giải pháp kỹ thuật. Dùng khi cần làm rõ vì sao tính năng này tồn tại, user value là gì, kết quả thành công trông như thế nào và phần nào không thuộc phạm vi xử lý.
language: vi
---

# Product Thinking

> English: SKILL.md

Làm rõ giá trị business và giá trị người dùng của yêu cầu trước khi đi sâu vào thiết kế kỹ thuật.

## Mục Tiêu

- Trả lời rõ yêu cầu này giải quyết vấn đề gì cho người dùng hoặc business.
- Xác định kết quả mong muốn nếu thay đổi được triển khai thành công.
- Chốt phần không làm để tránh mở rộng mục tiêu một cách cảm tính.
- Cung cấp bối cảnh đủ rõ cho bước system design và implementation planning.

## Khi Sử Dụng

- Khi yêu cầu đã được restate nhưng mục tiêu business vẫn còn chung chung.
- Khi cần xác định giá trị người dùng, outcome mong muốn hoặc lý do ưu tiên.
- Khi có nguy cơ đội ngũ đi thẳng vào giải pháp kỹ thuật mà chưa rõ bài toán cần giải.

## Không Thuộc Phạm Vi

- Không thiết kế kiến trúc hoặc API chi tiết.
- Không chia task kỹ thuật hoặc estimate effort.
- Không trực tiếp sửa code.
- Không thay thế bước requirement analysis; skill này kế thừa đầu ra từ bước đó.

## Đầu Vào Tối Thiểu

- `restated_request`
- `business_context`
- `stakeholder_intent`
- `known_constraints`

Nếu không xác định được user problem hoặc business context tối thiểu, phải nêu rõ thay vì tự suy diễn.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
restated_request: ""
user_problem: ""
business_goal: ""
user_value: ""
success_outcome: []
non_goals: []
priority_reason: ""
risks_business: []
metrics_candidate: []
notes_for_next_step: ""
```

## Ý Nghĩa Từng Output

- `user_problem`: vấn đề thật sự người dùng đang gặp.
- `business_goal`: mục tiêu nghiệp vụ cần đạt nếu triển khai thay đổi.
- `user_value`: lợi ích cụ thể người dùng nhận được.
- `success_outcome`: trạng thái thành công mong muốn sau khi release.
- `non_goals`: phần không giải quyết trong thay đổi hiện tại.
- `priority_reason`: lý do vì sao nên ưu tiên hoặc chưa nên ưu tiên.
- `risks_business`: rủi ro ở mức business hoặc adoption.
- `metrics_candidate`: chỉ số gợi ý để theo dõi thành công sau release.
- `notes_for_next_step`: ghi chú bàn giao sang bước thiết kế kỹ thuật.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 2 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Artifact Chính`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Phần kết luận ngắn gọn cho người đọc đặt ở callout `summary`; source of truth vẫn là block YAML.

## Luồng Thực Thi

1. Đọc `restated_request` và context business.
2. Xác định user problem ở dạng cụ thể, tránh phát biểu chung chung.
3. Viết `business_goal` và `user_value`.
4. Liệt kê `success_outcome` theo trạng thái quan sát được.
5. Chốt `non_goals` để khóa phạm vi business.
6. Ghi `priority_reason`, `risks_business` và `metrics_candidate`.
7. Bàn giao output cho bước `system-design`.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Tài liệu phải lưu UTF-8 và giữ đúng dấu tiếng Việt.
- Không dùng câu trả lời chung chung như “tăng trải nghiệm người dùng” nếu không chỉ ra cụ thể cái gì được cải thiện.
- `success_outcome` phải mô tả kết quả chứ không phải hành động.
- `non_goals` phải rõ đủ để chặn việc hiểu nhầm phạm vi.

## Luật Ra Quyết Định

- Nếu một yêu cầu có nhiều mục tiêu business khác nhau, tách chúng thành các outcome riêng.
- Nếu không tìm thấy user value hợp lý, phải cảnh báo rằng yêu cầu có thể là solution-first.
- Nếu metric chưa thể đo ngay, vẫn phải đề xuất `metrics_candidate` ở mức hợp lý.

## Điều Kiện Hoàn Tất

- Có `business_goal` và `user_value` rõ ràng.
- Có `success_outcome` đủ để đánh giá release thành công hay không.
- Có `non_goals` để khóa phạm vi business.
- Có `notes_for_next_step` đủ để chuyển sang `system-design`.
