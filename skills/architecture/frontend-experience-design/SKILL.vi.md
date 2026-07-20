---
language: vi
name: frontend-experience-design
description: Thiết kế frontend experience ở mức screen, section, component, interaction pattern, UI state, responsive behavior, accessibility baseline, motion rule và visual direction trước khi code. Dùng khi cần chuyển business goal và acceptance criteria thành blueprint cho layout, information hierarchy, form behavior, loading/empty/error/success state, navigation pattern, design system constraint hoặc handoff cho `frontend-architecture`, `implementation` và `testing`.
---

# Frontend Experience Design

> English: SKILL.md

Thiết kế trải nghiệm frontend ở mức surface và interaction để chốt cách màn hình hoạt động trước khi triển khai.

## Mục Tiêu

- Chuyển business goal và acceptance criteria thành quyết định rõ ở mức screen, state và interaction.
- Chốt layout, information hierarchy, hành vi responsive và feedback rule cho từng surface quan trọng.
- Chốt loading, empty, error, success và blocked state thay vì chỉ mô tả happy path.
- Thiết lập accessibility baseline, motion rule và performance guard đủ rõ để implementation không đoán mò.
- Tạo handoff rõ cho `frontend-architecture`, `task-breakdown-planner`, `implementation`, `react-web-implementation` và `frontend-quality-review`.

## Khi Sử Dụng

- Khi có page, screen, route hoặc flow mới cần định hình cách UI hoạt động trước khi code.
- Khi acceptance criteria đủ cho chức năng nhưng chưa đủ rõ cho layout, state UI, feedback, form behavior hoặc navigation.
- Khi cùng một frontend surface phải chạy tốt trên nhiều breakpoint hoặc loại thiết bị.
- Khi cần chốt visual direction ở mức sử dụng được cho delivery, nhưng chưa cần hoặc chưa có full design file.
- Khi cần tránh việc implement xong mới phát hiện thiếu empty state, loading state, keyboard flow hoặc responsive rule.

## Không Thuộc Phạm Vi

- Không thay thế `frontend-architecture` cho module boundary, route ownership, state ownership hoặc import boundary.
- Không tự bịa brand guideline, palette hoặc visual identity nếu đầu vào chưa có.
- Không trực tiếp viết code production hoặc tạo pixel-perfect mockup.
- Không thay thế user research, usability test hoặc product decision ở mức business.

## Đầu Vào Tối Thiểu

- `business_goal`
- `acceptance_criteria`
- `frontend_surfaces`
- `primary_users`
- `current_ui_context`
- `design_constraints`

`design_constraints` nên nêu ít nhất:
- design system hoặc component library đang dùng
- brand/tone nếu đã có
- device mix hoặc breakpoint quan trọng
- accessibility hoặc performance constraint đáng chú ý

Nếu chưa có `frontend_surfaces` hoặc chưa xác định user outcome chính, dừng và yêu cầu làm rõ thêm.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
experience_target: ""
primary_user_outcomes: []
frontend_surfaces:
  - surface: ""
    purpose: ""
    priority: CORE|SUPPORTING|AUXILIARY
interaction_model:
  entry_points: []
  navigation_rules: []
  primary_actions: []
  secondary_actions: []
  feedback_rules: []
surface_states:
  - surface: ""
    loading: ""
    empty: ""
    error: ""
    success: ""
    blocked: ""
layout_rules:
  information_hierarchy: []
  responsive_rules: []
  density_rules: []
visual_rules:
  tone_keywords: []
  emphasis_rules: []
  color_constraints: []
  typography_constraints: []
  motion_rules: []
accessibility_baseline:
  keyboard_flow: []
  screen_reader_notes: []
  contrast_rules: []
  touch_target_rules: []
performance_guards: []
design_system_hooks: []
validation_checks: []
notes_for_next_step: ""
```

## Ý Nghĩa Từng Output

- `experience_target`: mô tả surface hoặc flow đang được thiết kế trải nghiệm.
- `primary_user_outcomes`: kết quả người dùng phải đạt được khi tương tác với surface này.
- `frontend_surfaces`: danh sách surface quan trọng và mức độ ưu tiên.
- `interaction_model`: quy tắc điều hướng, hành động chính/phụ và feedback rule của trải nghiệm.
- `surface_states`: cách từng surface xử lý loading, empty, error, success và blocked state.
- `layout_rules`: nguyên tắc hierarchy, responsive và mật độ thông tin.
- `visual_rules`: tone, emphasis, màu, typography và motion ở mức đủ để handoff.
- `accessibility_baseline`: chuẩn tối thiểu về keyboard, screen reader, contrast và touch target.
- `performance_guards`: các guard cần giữ ngay từ thiết kế để tránh UI chậm hoặc giật.
- `design_system_hooks`: token, component, pattern hoặc constraint cần reuse từ design system hiện có.
- `validation_checks`: checklist để `implementation`, `react-web-implementation` và `frontend-quality-review` verify về sau.
- `notes_for_next_step`: ghi chú bàn giao sang `frontend-architecture`, `implementation`, `react-web-implementation` hoặc `testing`.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 5 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Architecture Details`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Dùng skill này song song hoặc ngay trước `frontend-architecture` khi bài toán vừa cần screen behavior vừa cần source-code boundary.

## Luồng Thực Thi

1. Xác định `experience_target`, `primary_user_outcomes` và danh sách `frontend_surfaces`.
2. Gắn từng surface với hành động chính, hành động phụ và điểm feedback quan trọng.
3. Viết `interaction_model` đủ rõ để implementation biết luồng vào, luồng ra và quy tắc điều hướng.
4. Chốt `surface_states` cho mọi surface ưu tiên `CORE`; không bỏ qua loading, empty hoặc error state.
5. Viết `layout_rules` cho hierarchy, responsive behavior và density rule theo ngữ cảnh sử dụng.
6. Viết `visual_rules` ở mức constraint có thể thực thi, không mô tả mơ hồ kiểu "trông hiện đại hơn".
7. Ghi `accessibility_baseline` và `performance_guards` như quality floor bắt buộc.
8. Liệt kê `design_system_hooks` để tái sử dụng component, token hoặc pattern có sẵn.
9. Chốt `validation_checks` và `notes_for_next_step` cho bước implement và review.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Mỗi surface ưu tiên `CORE` phải có loading, empty, error và blocked handling rõ ràng, trừ khi có lý do chính đáng.
- Không dùng mô tả mơ hồ như "responsive tốt" hoặc "UX mượt hơn"; phải nêu rule cụ thể theo breakpoint, density hoặc interaction.
- Motion chỉ dùng để định hướng, phản hồi hoặc chuyển ngữ cảnh; không thêm motion chỉ để trang trí.
- Không hy sinh task clarity chỉ để đạt visual effect.
- Nếu chưa có brand/tone rõ ràng, ưu tiên neutral, readable và task-first thay vì bịa phong cách.
- Tài liệu phải lưu UTF-8 và giữ nguyên tiếng Việt có dấu.

## Luật Ra Quyết Định

- Ưu tiên một `primary_action` rõ ràng cho mỗi viewport hoặc surface chính.
- Dùng progressive disclosure cho hành động phụ thay vì nhồi nhiều CTA cùng cấp.
- Nếu surface là data-heavy và tần suất dùng cao, có thể tăng density; nếu flow hiếm hoặc nhiều rủi ro, ưu tiên clarity hơn density.
- Nếu có list lớn, chart nặng hoặc media lớn, ghi `performance_guards` ngay từ đầu thay vì chờ đến lúc optimize.
- Nếu form có khả năng fail hoặc cần xác nhận, phải ghi rõ feedback rule và recovery path.
- Nếu layout khác nhau đáng kể giữa mobile và desktop, phải mô tả rõ quy tắc chuyển cấu trúc chứ không chỉ nêu breakpoint.
- Nếu bài toán đòi hỏi module ownership, import boundary hoặc state ownership, chuyển tiếp sang `frontend-architecture`.
- Nếu stack là React web hoặc Next.js và trải nghiệm phụ thuộc rõ vào server/client split, loading path hoặc data-fetching placement, bàn giao tiếp sang `react-web-implementation`.

## Điều Kiện Hoàn Tất

- Có `interaction_model` và `surface_states` đủ rõ để implement không đoán.
- Có `layout_rules`, `visual_rules` và `accessibility_baseline` đủ để team review chung một chuẩn.
- Có `performance_guards` cho những surface có nguy cơ nặng.
- Có `validation_checks` và `notes_for_next_step` đủ để bàn giao sang delivery.
