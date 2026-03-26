---
name: brainstorming
description: Tạo và so sánh các phương án giải pháp cho bài toán coding trước khi chốt hướng triển khai. Dùng khi yêu cầu còn mơ hồ, có nhiều hướng xử lý, hoặc cần đánh giá trade-off để chọn phương án tối ưu trước khi lập kế hoạch chi tiết.
---

# Brainstorming

Tạo phương án, phân tích trade-off và chốt hướng khuyến nghị trước khi triển khai.

## Mục Tiêu

- Đề xuất nhiều phương án khả thi cho cùng một bài toán.
- So sánh ưu, nhược điểm và rủi ro của từng phương án.
- Chọn một phương án khuyến nghị có lý do rõ ràng.
- Xác định các điểm cần kiểm chứng trước khi code.

## Khi Sử Dụng

- Khi đã hiểu yêu cầu ở mức cơ bản nhưng chưa nên chốt technical approach ngay.
- Khi có từ hai hướng xử lý kỹ thuật trở lên.
- Khi cần so sánh trade-off giữa tốc độ triển khai, độ an toàn, độ phức tạp và khả năng mở rộng.

## Không Thuộc Phạm Vi

- Không trực tiếp viết code production.
- Không thay thế bước system design chi tiết.
- Không tự quyết định bỏ qua phương án mà không nêu lý do.

## Đầu Vào Tối Thiểu

- `goal`
- `acceptance_criteria` hoặc yêu cầu đầu bài đã được restate
- `known_constraints`
- `repo_context` nếu có liên quan kỹ thuật

Nếu chưa rõ bài toán hoặc chưa có ràng buộc chính, phải nêu rõ trước khi brainstorm.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
goal: ""
options:
  - name: "Phương án A"
    summary: ""
    pros: []
    cons: []
    risks: []
  - name: "Phương án B"
    summary: ""
    pros: []
    cons: []
    risks: []
recommended_option: ""
recommendation_reason: ""
validation_plan: []
notes_for_next_step: ""
```

## Ý Nghĩa Từng Output

- `options`: các phương án khả thi ở mức đủ để so sánh.
- `recommended_option`: phương án nên chọn.
- `recommendation_reason`: lý do chọn phương án đó.
- `validation_plan`: điều cần kiểm chứng trước hoặc trong lúc implement.
- `notes_for_next_step`: ghi chú bàn giao sang `system-design` hoặc `task breakdown`.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 5 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Option Analysis`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Phần tóm tắt cho người đọc đặt ở callout `summary`; quyết định chuẩn vẫn phải nằm trong block YAML.

## Spec Phát Sinh Và Contract

- Spec chuẩn do skill này sinh ra là `option-analysis-spec`.
- Nếu lưu trong workflow note, spec này nằm ở block `## Option Analysis`.
- Contract tối thiểu của `option-analysis-spec` là:
  - có `goal`
  - có ít nhất 2 mục trong `options`
  - có đúng 1 `recommended_option`
  - có `recommendation_reason`
  - có `validation_plan`
- `option-analysis-spec` không thay thế `technical-approach-spec`; nó là đầu vào để `system-design` chốt phương án cuối.

## Luồng Thực Thi

1. Tóm tắt lại mục tiêu cần giải quyết.
2. Đề xuất ít nhất hai phương án khả thi.
3. So sánh trade-off theo các tiêu chí quan trọng.
4. Chọn phương án khuyến nghị và nêu rõ lý do.
5. Lập danh sách điều cần kiểm chứng trước khi triển khai.

## Quy Tắc Chất Lượng

- Không chốt phương án khi chưa có so sánh trade-off.
- Không chọn phương án chỉ theo cảm tính; phải có luận cứ.
- Mặc định trao đổi và báo cáo bằng tiếng Việt.
- Nội dung tài liệu lưu UTF-8.

## Luật Ra Quyết Định

- Nếu bài toán có một hướng làm hiển nhiên, vẫn phải nêu ít nhất một phương án thay thế để chứng minh đã so sánh.
- Nếu một phương án rẻ hơn về effort nhưng tăng rủi ro hệ thống, phải nêu rõ.
- Nếu chưa đủ dữ liệu để khuyến nghị, kết luận phải phản ánh điều đó thay vì ép chọn.

## Điều Kiện Hoàn Tất

- Có ít nhất hai phương án.
- Có phương án khuyến nghị và lý do chọn.
- Có `validation_plan` rõ ràng để chuyển sang bước thiết kế hoặc lập kế hoạch.
