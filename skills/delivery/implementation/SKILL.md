---
name: implementation
description: Triển khai thay đổi theo hướng DEV-led, kế thừa discipline mạnh của Superpowers như bug repro first, hypothesis-driven debugging, TDD, minimal-delta, safe refactor, review sớm và no-done-before-verify, nhưng vẫn bám governance, task plan và traceability của repo. Dùng khi s04-s06 đã đủ điều kiện và implementation path đã được mở.
---

# Implementation

Triển khai thay đổi thực tế trong codebase theo design và task plan đã chốt, với trọng tâm là thay đổi nhỏ nhất đủ đúng và evidence rõ cho bước verify.

<HARD-GATE>
Không được bắt đầu implement nếu `DoR`, `Approach`, `Task Plan` hoặc implementation gate chưa đủ điều kiện.

Nếu thay đổi là `behavior change`, không được viết production code trước failing test, trừ khi có lý do rõ và fallback verification path đã được ghi nhận.

Nếu là bug fix, không được “fix theo trực giác” khi chưa có `bug_repro_evidence` hoặc ít nhất một `hypothesis_log` + `debug_experiments` đủ đọc.

Không được tự tuyên bố `done` trong skill này; verdict hoàn tất chỉ hợp lệ ở bước verify.
</HARD-GATE>

## Khi Sử Dụng

- Khi s04-s06 đã đủ điều kiện để đi vào triển khai.
- Khi cần thêm feature, sửa bug, refactor hoặc chỉnh config/doc đi kèm trong phạm vi đã approve.
- Khi stack là React web hoặc Next.js và thay đổi chạm server/client split, data fetching, context hoặc loading path, phối hợp thêm `react-web-implementation`.

## Không Thuộc Phạm Vi

- Không tự đổi business goal hoặc acceptance criteria.
- Không tự đổi technical approach lớn mà không phản hồi lại bước design.
- Không bỏ qua TDD cho behavior change chỉ vì muốn đi nhanh.
- Không sửa bug kiểu “đoán nguyên nhân rồi patch luôn” mà không để lại evidence debug.
- Không thay testing hoặc DoD cuối cùng.

## Vai Trò Mặc Định

- `developer` là owner chính của skill này.
- `ba` không phải role thi công chính; nếu business rule đang mơ hồ, phải phản hồi hoặc quay lại step phù hợp thay vì tự diễn giải.
- `qc`, `devops`, `designer` có thể tham gia review/evidence hook theo scope, nhưng skill này vẫn là `DEV-led`.

## Đầu Vào Tối Thiểu

- `recommended_design`
- `task_breakdown`
- `coding_conventions`
- `files_in_scope`
- `constraints`
- `delivery_context`
- `change_type`

Nếu chưa biết file hoặc module chạm chính, phải làm rõ trước khi sửa hàng loạt.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
recommended_design: ""
implementation_mode: FEATURE|BUGFIX|REFACTOR|HARDENING
tasks_completed: []
bug_repro_evidence: []
hypothesis_log:
  - assumption: ""
    status: CONFIRMED|REJECTED|OPEN
    evidence: ""
debug_experiments:
  - goal: ""
    action: ""
    result: ""
tdd_evidence:
  - behavior: ""
    failing_test: ""
    passing_test: ""
safe_refactor_notes: []
code_changes: []
doc_changes: []
config_changes: []
review_checkpoints: []
outputs_actual: []
known_limitations: []
follow_up_items: []
notes_for_testing: ""
```

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Dùng template step 7 tại `../../orchestration/codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Artifact Chính`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Nếu có exception, deviation hoặc handoff đặc biệt, ghi thêm ở prose section nhưng không thay block YAML.

## Quy Trình Bắt Buộc

1. Đối chiếu design với task breakdown và gate hiện có.
2. Chốt `implementation_mode` là `FEATURE`, `BUGFIX`, `REFACTOR` hoặc `HARDENING`.
3. Nếu là `BUGFIX`, tái hiện lỗi trước hoặc thu thập `bug_repro_evidence` tương đương đủ đọc.
4. Tạo `hypothesis_log`; mỗi giả thuyết phải có bằng chứng xác nhận, bác bỏ hoặc để mở.
5. Chạy `debug_experiments` nhỏ nhất đủ để giảm bất định trước khi sửa.
6. Với behavior change, đi theo chu kỳ `test fail -> code tối thiểu -> test pass -> refactor`.
7. Giữ delta nhỏ nhất đủ đúng; không mở rộng scope tùy hứng.
8. Nếu cần refactor, ghi `safe_refactor_notes` và giữ guard test quanh vùng chạm.
9. Review sớm cho phần logic/contract rủi ro, không dồn hết sang cuối.
10. Ghi rõ `code_changes`, `doc_changes`, `config_changes`.
11. Thu thập `bug_repro_evidence`, `hypothesis_log`, `debug_experiments`, `tdd_evidence`, `review_checkpoints`, `outputs_actual`.
12. Ghi `known_limitations`, `follow_up_items` và `notes_for_testing`.

## Quy Tắc Chất Lượng

- Ưu tiên thay đổi nhỏ, tập trung, dễ review.
- Với bug fix, ưu tiên `repro -> hypothesis -> experiment -> patch` thay vì sửa thẳng theo linh cảm.
- Nếu strict TDD bị chặn bởi legacy hoặc harness, phải ghi rõ lý do trong `notes_for_testing` hoặc `known_limitations`.
- Không đổi thiết kế ngầm trong lúc code; nếu design không khả thi, quay lại bước design.
- Không dùng “sẽ verify sau” để né evidence hook trong implementation.
- Nếu không tái hiện được bug, phải ghi rõ mức tin cậy thấp hơn thay vì diễn đạt như fix chắc chắn.
- Mặc định viết và trao đổi bằng tiếng Việt có dấu; code theo convention của project.
- File văn bản phải lưu UTF-8.

## Luật Ra Quyết Định

- Nếu phát hiện design không khả thi, dừng và phản hồi lại thay vì workaround mơ hồ.
- Nếu phải đổi hành vi ngoài scope để giữ tính đúng đắn, ghi rõ vào `follow_up_items` và báo lại.
- Nếu change lớn hoặc rủi ro, ưu tiên workspace cô lập hoặc execution mode phù hợp theo workflow.
- Nếu bug fix không có `bug_repro_evidence`, ít nhất phải có `hypothesis_log` và `debug_experiments` đủ để người khác review đường suy luận.
- Nếu refactor chạm behavior, phải có guard test hoặc `tdd_evidence` trước khi coi đó là safe refactor.
- Nếu scope chạm deploy artifact, ghi rõ Dockerfile, compose, manifest hoặc pipeline config trong `config_changes` hoặc `outputs_actual`.
- Không coi local progress, code xong hoặc test cục bộ là `done`.

## Điều Kiện Hoàn Tất

- Có `outputs_actual` khớp với scope implement.
- Có `code_changes`, `doc_changes`, `config_changes` được ghi nhận rõ.
- Có `bug_repro_evidence` hoặc `hypothesis_log` + `debug_experiments` khi scope là bug fix hoặc hardening.
- Có `tdd_evidence` cho behavior change hoặc có lý do rõ nếu không áp dụng strict TDD.
- Có `safe_refactor_notes` nếu đã refactor trong lúc triển khai.
- Có `notes_for_testing` đủ để bước verify thực thi ngay.
