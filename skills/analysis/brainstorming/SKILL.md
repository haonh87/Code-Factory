---
name: brainstorming
description: Khám phá và chốt hướng giải pháp trước technical approach bằng style đối thoại có kỷ luật kiểu Superpowers, với BA lane và DEV lane rõ ràng. Dùng khi yêu cầu còn mơ hồ, có nhiều hướng xử lý, hoặc cần khóa mục tiêu, business rule, constraint và option analysis trước khi sang system-design.
---

# Brainstorming

Biến một yêu cầu còn mơ hồ thành `option analysis` đã được trình bày rõ, có khuyến nghị và sẵn sàng chuyển sang `system-design`.

<HARD-GATE>
Không được invoke skill implement, không được viết code production, không được scaffold project, và không được coi feature request là authorization để code trực tiếp.

Đầu ra của skill này là `option analysis` đã được trình bày và được người dùng chốt, không phải technical approach cuối cùng.
</HARD-GATE>

## Khi Sử Dụng

- Khi yêu cầu còn mơ hồ hoặc mới ở mức ý tưởng.
- Khi cần làm rõ mục tiêu, business rule, constraint hoặc success criteria trước khi thiết kế kỹ thuật.
- Khi có từ hai hướng giải quyết trở lên hoặc có nguy cơ chốt approach theo cảm tính.
- Khi cần ép agent dừng lại để hỏi và so sánh phương án trước khi vào `system-design`.

## Không Thuộc Phạm Vi

- Không thay `system-design` để khóa boundary kỹ thuật cuối cùng.
- Không thay `task-breakdown-planner` để lập kế hoạch thực thi.
- Không thay `implementation` để viết code.
- Không dùng để hợp thức hóa việc “code trước, phân tích sau”.

## Đầu Vào Tối Thiểu

- restated request hoặc raw request đủ để hiểu bài toán
- context repo hoặc sản phẩm hiện có nếu liên quan
- constraint đã biết
- tín hiệu ban đầu về user value hoặc business goal

Nếu chưa rõ bài toán ở mức tối thiểu, phải hỏi để làm rõ thay vì brainstorm giả định.

## BA Lane Và DEV Lane

### BA lane

Tập trung vào:

- business goal
- actor hoặc user scenario chính
- business rule
- scope và non-goal
- acceptance direction ở mức business
- open question đang chặn việc chốt hướng

### DEV lane

Tập trung vào:

- repo context và baseline hiện có
- technical constraint, NFR, dependency
- integration point, data touchpoint, contract risk
- implementation risk và validation direction
- dấu hiệu `greenfield|brownfield`

Rule:

- Mặc định bắt đầu bằng `BA lane` nếu bài toán chưa rõ mục tiêu hoặc user value.
- Nếu blocker đầu tiên là technical feasibility hoặc baseline repo, được phép bắt đầu bằng `DEV lane`.
- Dù lane nào dẫn trước, phải khóa đủ cả góc nhìn business lẫn technical trước khi khuyến nghị phương án.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
goal: ""
ba_lane:
  business_goal: ""
  user_scenarios: []
  business_rules: []
  scope_notes: []
  open_questions: []
dev_lane:
  repo_constraints: []
  technical_risks: []
  integration_points: []
  nfr_notes: []
  baseline_context: ""
options:
  - name: "Phương án A"
    summary: ""
    pros: []
    cons: []
    risks: []
recommended_option: ""
recommendation_reason: ""
validation_plan: []
notes_for_next_step: ""
```

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Dùng template step 5 tại `../../orchestration/codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Option Analysis`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- `notes_for_next_step` phải nêu rõ đã đủ để sang `system-design` hay còn blocker nào phải quay lại `s03`.

## Quy Trình Bắt Buộc

1. Đọc context hiện có của repo và artifact liên quan.
2. Xác định lane nào cần dẫn trước: `BA lane` hay `DEV lane`.
3. Hỏi một câu một lần; không dồn nhiều câu hỏi trong cùng một lượt.
4. Làm rõ đủ mục tiêu, rule và constraint để có thể so sánh phương án nghiêm túc.
5. Đề xuất ít nhất 2 phương án nếu bài toán có nhiều hướng hợp lý.
6. Nếu bài toán gần như hiển nhiên, vẫn phải nêu ít nhất 1 hướng thay thế hoặc hướng bị loại.
7. Khuyến nghị `giải pháp nhỏ nhất đủ đúng` thay vì phương án lớn chỉ vì dự phòng tương lai.
8. Trình bày `recommended_option`, `recommendation_reason` và `validation_plan`.
9. Chốt `notes_for_next_step` để bàn giao sang `system-design`.

## Quy Tắc Chất Lượng

- Không được coi “việc này đơn giản” là lý do bỏ qua so sánh phương án.
- Không được chọn phương án chỉ vì quen tay hoặc tiện code hơn.
- Không được để `DEV lane` nuốt mất business intent của `BA lane`.
- Không được để `BA lane` né technical constraint đã biết.
- Mặc định trao đổi và tài liệu bằng tiếng Việt có dấu.
- File văn bản phải lưu UTF-8.

## Luật Ra Quyết Định

- Nếu request chạm nhiều subsystem độc lập, phải đề xuất tách thành nhiều work item trước khi brainstorm sâu.
- Nếu chưa đủ dữ liệu để khuyến nghị nghiêm túc, phải phản ánh rõ trong `open_questions` hoặc `validation_plan`.
- Nếu repo đang `greenfield`, phải nêu rõ decision nào là `foundation-sensitive` để bước `system-design` chốt.
- Nếu repo là `brownfield`, phải ưu tiên delta nhỏ nhất trên đường đi hiện có.

## Điều Kiện Hoàn Tất

- Có đủ `BA lane` và `DEV lane` ở mức phục vụ chốt hướng.
- Có ít nhất 2 phương án hoặc 1 phương án chính + 1 hướng bị loại.
- Có `recommended_option` và `recommendation_reason` rõ ràng.
- Có `validation_plan`.
- Có `notes_for_next_step` đủ để sang `system-design`.
