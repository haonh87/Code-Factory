---
name: frontend-quality-review
description: Rà soát thay đổi frontend ở mức accessibility, responsive layout, interaction feedback, form behavior, navigation clarity, motion và performance heuristic trước khi bàn giao. Dùng khi review PR frontend, verify UI flow sau implement, hoặc khi `testing` và `code-scan-review` chưa đủ để kết luận chất lượng screen-level của một thay đổi.
---

# Frontend Quality Review

Rà soát chất lượng frontend ở mức trải nghiệm người dùng và heuristic kỹ thuật trước khi bàn giao.

## Mục Tiêu

- Đánh giá chất lượng frontend ngoài phạm vi test behavior thuần và static scan thuần.
- Phát hiện vấn đề ở accessibility, responsive layout, interaction feedback, form behavior, navigation và performance heuristic.
- Ghi rõ finding theo mức độ nghiêm trọng, surface bị ảnh hưởng và hướng xử lý.
- Kết luận mức sẵn sàng bàn giao của thay đổi frontend với evidence đủ rõ.

## Khi Sử Dụng

- Sau khi implementation frontend đã xong một phạm vi đủ để review screen-level quality.
- Khi PR thay đổi page, screen, form, component interaction, navigation, modal, drawer, chart hoặc responsive layout.
- Khi `testing` đã cover behavior nhưng vẫn cần kết luận thêm về accessibility, clarity, usability hoặc frontend performance heuristic.
- Khi `code-scan-review` đã xong nhưng chưa đủ để nói UI thực sự ổn ở mức người dùng.
- Khi stack là React hoặc Next.js và cần tách riêng review screen-level quality với review React render/data boundary, phối hợp thêm `react-best-practices-review`.

## Không Thuộc Phạm Vi

- Không thay thế `testing` cho behavior correctness hoặc acceptance criteria ở mức hệ thống.
- Không thay thế `code-scan-review` cho syntax, static analysis hoặc security scan.
- Không thay thế benchmark, profiling runtime sâu hoặc performance lab có số đo chuẩn hóa.
- Không thay thế review React-specific ở mức server/client split, effect hygiene, state placement hoặc render stability; dùng `react-best-practices-review` khi stack là React web hoặc Next.js.
- Không tự kết luận visual identity đúng brand nếu không có brand input rõ ràng.

## Đầu Vào Tối Thiểu

- `acceptance_criteria`
- `review_scope`
- `changed_surfaces`
- `device_targets`
- `available_checks`
- `constraints`

`available_checks` nên nêu ít nhất:
- browser hoặc môi trường review có chạy được hay không
- có Storybook, Playwright, screenshot diff, Lighthouse hoặc manual QA hay không
- có giới hạn gì về thiết bị, viewport hoặc dữ liệu seed hay không

Nếu không xác định được `changed_surfaces`, phải suy ra từ thay đổi hoặc nêu rõ phạm vi review còn thiếu.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
review_target: ""
review_scope:
  surfaces: []
  devices: []
  critical_flows: []
quality_gates:
  accessibility: REQUIRED|OPTIONAL
  responsive_layout: REQUIRED|OPTIONAL
  interaction_feedback: REQUIRED|OPTIONAL
  form_and_validation: REQUIRED|OPTIONAL
  navigation_clarity: REQUIRED|OPTIONAL
  performance_heuristic: REQUIRED|OPTIONAL
  visual_consistency: REQUIRED|OPTIONAL
findings:
  - severity: HIGH|MEDIUM|LOW
    area: ACCESSIBILITY|RESPONSIVE|INTERACTION|FORM|NAVIGATION|PERFORMANCE|VISUAL
    surface: ""
    issue: ""
    evidence: ""
    recommendation: ""
criteria_results:
  - criterion: ""
    result: PASS|FAIL|PARTIAL
    evidence: ""
checks_run: []
checks_skipped: []
overall_status: PASS|FAIL|PARTIAL
residual_risks: []
handoff_recommendation: ""
notes_for_review: ""
```

## Ý Nghĩa Từng Output

- `review_target`: mô tả thay đổi frontend đang được review.
- `review_scope`: surface, device và flow quan trọng phải được rà.
- `quality_gates`: nhóm chất lượng nào là bắt buộc trong review hiện tại.
- `findings`: vấn đề cụ thể kèm mức độ, surface bị ảnh hưởng, bằng chứng và hướng sửa.
- `criteria_results`: đối chiếu acceptance criteria với bằng chứng ở mức screen-level.
- `checks_run`: các check thủ công hoặc tự động đã chạy.
- `checks_skipped`: check chưa chạy và lý do.
- `overall_status`: kết luận tổng thể của review frontend.
- `residual_risks`: rủi ro còn lại dù đã review.
- `handoff_recommendation`: khuyến nghị trước khi merge, demo hoặc bàn giao.
- `notes_for_review`: ghi chú bàn giao sang review cuối, `testing` hoặc `step-goal-auditor`.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 8 tại `../../orchestration/codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Artifact Chính` hoặc `## Review Findings` nếu note đã có block verify khác.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Nếu đã có note từ `testing` hoặc `code-scan-review`, liên kết chéo thay vì lặp lại evidence.

## Luồng Thực Thi

1. Xác định `review_target`, `review_scope` và `quality_gates` bắt buộc.
2. Liệt kê `changed_surfaces`, viewport và device cần rà.
3. Rà accessibility ở mức semantics, keyboard flow, focus handling, label, contrast và touch target nếu thuộc phạm vi.
4. Rà responsive layout ở mức overflow, wrapping, sticky area, spacing, density và readability theo viewport chính.
5. Rà interaction feedback ở mức loading, empty, error, success, disabled, validation và recovery path.
6. Rà navigation clarity cho route change, breadcrumb, modal/drawer transition, back path hoặc step progression nếu có.
7. Rà performance heuristic cho list lớn, chart, media, rerender nóng, hydration cost hoặc network-heavy surface nếu có dấu hiệu rủi ro.
8. Ghi `findings` với severity, evidence và recommendation cụ thể.
9. Đối chiếu lại acceptance criteria trong `criteria_results`.
10. Kết luận `overall_status`, `residual_risks` và `handoff_recommendation`.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Không đánh dấu `PASS` nếu chưa có evidence cho surface hoặc flow chính.
- Không coi static analysis pass là bằng chứng đủ cho chất lượng frontend.
- Nếu không chạy được browser/manual check, phải ghi rõ giới hạn vào `checks_skipped`.
- Modal, drawer, popover và flow đổi route phải có focus handling hoặc navigation rule rõ ràng; nếu không, mặc định là review risk.
- Form không chỉ cần validate đúng; còn phải có feedback, recovery path và thông điệp đủ rõ để người dùng sửa.
- Tài liệu phải lưu UTF-8 và giữ nguyên tiếng Việt có dấu.

## Luật Ra Quyết Định

- `HIGH` khi vấn đề chặn task chính, làm hỏng keyboard/screen-reader flow, gây collapse layout ở viewport chính, làm mất dữ liệu nhập hoặc gây hiểu sai hành động quan trọng.
- `MEDIUM` khi vấn đề chưa chặn task chính nhưng làm giảm clarity, tăng friction hoặc tăng nguy cơ thao tác sai.
- `LOW` khi vấn đề chủ yếu là polish, consistency hoặc readability nhẹ.
- `PASS` khi các quality gate bắt buộc đều đạt và không còn finding `HIGH`.
- `PARTIAL` khi functionality đạt nhưng còn finding `MEDIUM` hoặc còn check quan trọng chưa chạy.
- `FAIL` khi còn finding `HIGH` hoặc thiếu evidence cho flow/surface cốt lõi.
- Nếu thay đổi nặng về logic hoặc data correctness, dùng thêm `testing`; nếu thay đổi nặng về static quality/security, dùng thêm `code-scan-review`; nếu thay đổi nặng về render/data boundary của React, dùng thêm `react-best-practices-review`.

## Điều Kiện Hoàn Tất

- Có `quality_gates` và `findings` đủ rõ cho phạm vi review.
- Có `criteria_results`, `checks_run` và `checks_skipped` với evidence cụ thể.
- Có `overall_status` và `handoff_recommendation` đủ để quyết định merge hoặc bàn giao.
- Có `residual_risks` cho mọi điểm chưa đóng hoàn toàn.
