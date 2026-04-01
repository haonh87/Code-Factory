---
name: testing
description: Xác minh thay đổi phần mềm so với acceptance criteria và quality gates trước khi bàn giao. Dùng khi cần thiết kế hoặc chạy chiến lược test theo nhiều mức như unit test, integration test, database test và feature test; đối chiếu criteria với output thực tế, ghi bằng chứng pass hoặc fail, và chốt residual risks cho review hoặc handoff cuối.
---

# Testing

Kiểm chứng thay đổi thực tế so với tiêu chí đã chốt trước khi bàn giao, với ranh giới rõ giữa unit test, integration/database test và feature test.

## Mục Tiêu

- Chứng minh thay đổi thực tế đạt acceptance criteria và quality gates.
- Chọn đúng mức test cho đúng loại thay đổi thay vì dồn mọi thứ vào một loại test.
- Ưu tiên unit test cho business logic thuần, chạy nhanh và không phụ thuộc database.
- Chỉ ra khoảng trống, rủi ro còn lại và hành động tiếp theo nếu bằng chứng chưa đủ.

## Khi Sử Dụng

- Sau khi implementation đã hoàn thành một phạm vi thay đổi đủ để verify.
- Khi cần quyết định nên viết hoặc chạy unit test, integration test, database test hay feature test.
- Khi cần tổng hợp evidence trước bước review hoặc handoff cuối.
- Khi thay đổi chạm vào domain logic, persistence, transaction, query, relation hoặc acceptance criteria.
- Khi scope có deploy, dùng skill này cho test behavior ứng dụng và dùng `deployment-devops` cho review packaging hoặc rollout readiness.
- Khi scope chạm screen, form, navigation, responsive layout, accessibility hoặc motion, phối hợp thêm `frontend-quality-review` để review screen-level quality.
- Khi stack là React hoặc Next.js và thay đổi chạm hook, context, server/client split, data fetching hoặc render path, phối hợp thêm `react-best-practices-review`.

## Không Thuộc Phạm Vi

- Không redefine acceptance criteria.
- Không thay đổi mục tiêu business hoặc technical approach.
- Không che giấu check bị skip; mọi check bỏ qua phải nêu rõ.
- Không dùng unit test để thay thế kiểm chứng cho behavior phụ thuộc persistence thật.
- Không thay thế deployment readiness review; nếu scope chạm packaging hoặc rollout, phối hợp thêm `deployment-devops`.
- Không thay thế review frontend ở mức accessibility, responsive layout, interaction feedback hoặc visual consistency; dùng `frontend-quality-review` khi scope chạm surface UI.
- Không thay thế review React-specific ở mức render boundary, effect hygiene hoặc client/server split; dùng `react-best-practices-review` khi scope chạm React web hoặc Next.js.

## Nguyên Tắc Phân Tầng Test

- `unit_test`:
  - Dùng để cover business logic nhỏ nhất có thể kiểm thử độc lập.
  - Ưu tiên test ở domain object, service thuần logic, policy, validator, calculator.
  - Không yêu cầu tạo database, migration hay seed dữ liệu.
  - Dữ liệu test chỉ cần object, value object, fake input hoặc mock/fake dependency.
- `integration_test`:
  - Dùng khi logic phụ thuộc repository, database access, query, transaction, relation hoặc external adapter.
  - Có thể dùng database test double hoặc database thật tùy khả năng của stack.
  - Dùng để chứng minh persistence behavior đúng.
- `database_test`:
  - Dùng khi thay đổi chạm schema, migration, foreign key, unique constraint, index, query plan hoặc transaction boundary.
  - Không thay thế cho `database-change-review`, nhưng cung cấp evidence cho bước review đó.
- `feature_test`:
  - Dùng khi cần chứng minh luồng end-to-end hoặc acceptance criteria ở mức hành vi hệ thống.
  - Thường chạm HTTP/API/command bus/app service hoặc toàn bộ use case.

## Đầu Vào Tối Thiểu

- `acceptance_criteria`
- `outputs_actual`
- `available_test_commands`
- `quality_gates`
- `change_characteristics`
- `constraints`

`change_characteristics` phải mô tả ít nhất:
- có thay đổi business logic thuần hay không
- có thay đổi database/query/relation/transaction hay không
- có cần chứng minh end-to-end behavior hay không

Nếu không có acceptance criteria hoặc không xác định được quality gates chính, phải nêu rõ trước khi kết luận.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
verification_target: ""
test_strategy:
  unit_test:
    required: true|false
    rationale: ""
  integration_test:
    required: true|false
    rationale: ""
  database_test:
    required: true|false
    rationale: ""
  feature_test:
    required: true|false
    rationale: ""
criteria_results:
  - criterion: ""
    result: PASS|FAIL|PARTIAL
    evidence: ""
test_evidence:
  unit_test: []
  integration_test: []
  database_test: []
  feature_test: []
commands_run: []
skipped_checks: []
status: PASS|FAIL|PARTIAL
gaps: []
residual_risks: []
recommendation: ""
notes_for_review: ""
```

## Ý Nghĩa Từng Output

- `verification_target`: mô tả phần thay đổi đang được verify.
- `test_strategy`: quyết định mức test nào bắt buộc và vì sao.
- `criteria_results`: kết quả đối chiếu từng acceptance criterion.
- `test_evidence`: bằng chứng tách theo từng mức test.
- `commands_run`: danh sách lệnh kiểm tra đã chạy.
- `skipped_checks`: kiểm tra chưa chạy và lý do.
- `status`: kết luận tổng thể.
- `gaps`: phần chưa đạt hoặc chưa được chứng minh.
- `residual_risks`: rủi ro còn lại sau verify.
- `recommendation`: hành động khuyến nghị tiếp theo.
- `notes_for_review`: ghi chú cho bước review hoặc handoff.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 8 tại `../codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Artifact Chính`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Kết luận `PASS|FAIL|PARTIAL` trong callout `summary` phải khớp với `status` trong block YAML.

## Luồng Thực Thi

1. Liệt kê acceptance criteria cần verify.
2. Phân loại `change_characteristics` để chọn đúng `test_strategy`.
3. Nếu thay đổi là business logic thuần, ưu tiên viết hoặc chạy `unit_test` trước.
4. Nếu thay đổi chạm persistence, query, relation, transaction hoặc schema, bổ sung `integration_test` hoặc `database_test`.
5. Nếu cần chứng minh hành vi hệ thống ở mức use case, bổ sung `feature_test`.
6. Chạy các lệnh test/lint/build/check liên quan.
7. Ghi `criteria_results` và `test_evidence` với bằng chứng cụ thể.
8. Ghi rõ `commands_run` và `skipped_checks`.
9. Tổng hợp `gaps`, `residual_risks`, `recommendation`.
10. Kết luận `status` tổng thể và bàn giao sang review/handoff.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Tài liệu văn bản phải lưu UTF-8 và kiểm tra lỗi mã hóa khi có thay đổi file text.
- Không đánh dấu `PASS` nếu thiếu bằng chứng.
- Không bỏ qua check quan trọng mà không ghi lý do vào `skipped_checks`.
- Nếu test không chạy được vì môi trường, phải nêu rõ đó là giới hạn của verify hiện tại.
- Không tạo database thật chỉ để unit test business logic thuần.
- Không dùng mock để chứng minh behavior của database thật, relation thật hay migration thật.

## Luật Ra Quyết Định

- Chọn `unit_test` khi cần chứng minh rule nghiệp vụ, state transition, calculation, validation hoặc policy ở mức object/service thuần.
- Chọn `integration_test` khi logic phụ thuộc repository, ORM mapping, query, adapter hoặc transaction.
- Chọn `database_test` khi thay đổi chạm schema, migration, FK, unique, index hoặc query behavior phụ thuộc persistence.
- Chọn `feature_test` khi acceptance criteria cần chứng minh qua luồng hoàn chỉnh từ entrypoint đến output.
- `PASS` khi tất cả acceptance criteria bắt buộc đều có bằng chứng đạt, và các mức test bắt buộc trong `test_strategy` đã được cover.
- `PARTIAL` khi có bằng chứng đạt một phần nhưng còn khoảng trống không nghiêm trọng.
- `FAIL` khi có tiêu chí bắt buộc không đạt hoặc thiếu bằng chứng đủ mạnh.
- Nếu output kỹ thuật đạt nhưng database-related check quan trọng bị thiếu trong thay đổi có chạm persistence, kết luận không được là `PASS`.

## Điều Kiện Hoàn Tất

- Có `test_strategy` rõ ràng cho thay đổi hiện tại.
- Có `criteria_results` đầy đủ cho phần cần verify.
- Có `test_evidence`, `commands_run` và `skipped_checks` rõ ràng.
- Có `status` tổng thể và `recommendation` cụ thể cho bước tiếp theo.
