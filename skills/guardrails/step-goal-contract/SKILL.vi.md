---
language: vi
name: step-goal-contract
description: Chuẩn hóa mục tiêu của từng bước workflow coding thành hợp đồng có thể kiểm chứng. Dùng khi bắt đầu bất kỳ step nào trong chuỗi phát triển để định nghĩa goal, value, scope, input, output, done criteria, constraints, risk và timebox trước khi thực thi.
---

# Step Goal Contract

> English: SKILL.md

Tạo hợp đồng mục tiêu cho từng step trước khi thực thi.

## Mục Tiêu

- Khóa rõ mục tiêu của từng step trước khi làm.
- Biến một step mơ hồ thành step có input, output và điều kiện hoàn tất cụ thể.
- Cung cấp contract chuẩn cho `input-readiness-assessor`, `implementation` và `step-goal-auditor`.

## Khi Sử Dụng

- Ở đầu mọi step trong workflow delivery.
- Khi cần chốt lại goal, scope, constraints hoặc done criteria trước khi chuyển sang làm thật.
- Khi một step bị kéo lệch phạm vi và cần re-contract.

## Không Thuộc Phạm Vi

- Không thay thế skill nghiệp vụ của step.
- Không trực tiếp đánh giá PASS/FAIL sau khi step đã chạy.
- Không dùng để quyết định kỹ thuật chi tiết nếu chưa qua skill chuyên trách.

## Đầu Vào Tối Thiểu

- Yêu cầu hiện tại của người dùng.
- Bối cảnh và output của step trước.
- Ràng buộc kỹ thuật, chất lượng và thời gian.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
step: ""
goal: ""
value: ""
scope_in: []
scope_out: []
inputs_required: []
outputs_required: []
done_when: []
constraints:
  hard_constraints: []
  soft_constraints: []
  prohibited_actions: []
  compliance_checks: []
risks:
  - id: ""
    description: ""
    likelihood: LOW|MEDIUM|HIGH
    impact: LOW|MEDIUM|HIGH
    severity: LOW|MEDIUM|HIGH
    mitigation: ""
    contingency: ""
    owner: ""
    status: OPEN|MONITORING|CLOSED
timebox:
  target_duration: ""
  deadline: ""
  escalation_rule: ""
```

## Ý Nghĩa Từng Output

- `goal`: trạng thái kết quả cần đạt, không phải hành động.
- `value`: giá trị mà step này tạo ra cho workflow.
- `scope_in` và `scope_out`: giới hạn rõ phần làm và không làm.
- `inputs_required`: đầu vào bắt buộc để step chạy an toàn.
- `outputs_required`: artifact step phải tạo ra.
- `done_when`: điều kiện hoàn tất có thể kiểm chứng.
- `constraints`: các giới hạn không được vi phạm.
- `risks`: rủi ro cần theo dõi và xử lý.
- `timebox`: giới hạn thời gian hoặc deadline của step.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng block `## Step Contract` trong template step tương ứng tại `../codex-workflow-chain/references/workflow-chain.md`.
- Block này xuất hiện ở cả 8 step trong workflow chain chuẩn.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Không chuyển contract sang prose rồi bỏ block YAML; contract chuẩn phải nằm trong block này.

## Luồng Thực Thi

1. Trích xuất mục tiêu nghiệp vụ hoặc kỹ thuật của step.
2. Tách rõ phạm vi làm và không làm.
3. Chuẩn hóa đầu vào và đầu ra bắt buộc.
4. Viết `done_when` theo tiêu chí kiểm chứng được.
5. Ghi `constraints`, `risks` và `timebox` theo schema.
6. Xuất contract trước khi chuyển sang thực thi.

## Tiêu Chuẩn Contract Hợp Lệ

- `goal` mô tả trạng thái kết quả, không mô tả hoạt động.
- `outputs_required` là artifact cụ thể, không mơ hồ.
- Mỗi mục trong `done_when` phải có bằng chứng có thể thu thập.
- `scope_out` phải đủ rõ để tránh trượt phạm vi.
- Mỗi `hard_constraint` phải có ít nhất một `compliance_check` tương ứng.
- Mọi rủi ro `severity=HIGH` phải có `mitigation` và `owner`.
- `timebox` phải có tối thiểu `target_duration` hoặc `deadline`.

## Quy Tắc Chất Lượng

- Mặc định trao đổi và tài liệu bằng tiếng Việt.
- File văn bản phải lưu UTF-8.
- Không bắt đầu thực thi khi chưa có contract đủ nghĩa.
- Không dùng contract chung chung kiểu “làm cho xong” hoặc “tối ưu”.

## Điều Kiện Hoàn Tất

- Contract đầy đủ theo schema.
- Không còn blocker nghiêm trọng ở mức contract.
- Sẵn sàng chuyển sang skill nghiệp vụ hoặc gate tiếp theo của step.
