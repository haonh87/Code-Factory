---
language: vi
---

# Role-Aware Workflow Reference

> Tiếng Anh / English: role-aware-workflow.md

Tài liệu này mô tả cách overlay role nghiệp vụ lên workflow 8 bước mà không tách thành nhiều workflow riêng.

## Nguyên Tắc

- Workflow 8 bước vẫn là xương sống duy nhất cho một work item.
- Role chỉ bổ sung ownership, input/output theo chuyên môn và signoff.
- `BRD` và `SRS` là output rollout/source-of-truth của quy trình phát triển sản phẩm.
- `NotebookLM` là lớp lưu corpus và truy hồi tài liệu trong lúc thực thi, không phải output rollout.
- Kết luận lấy từ NotebookLM chỉ có giá trị điều hành khi đã được chuẩn hóa lại vào `BRD`, `SRS` hoặc note workflow chính.
- Note workflow `.md` của từng step vẫn là nơi trace contract, role output, handoff và evidence của step.
- `governance` là lớp mỏng dùng chung; role output phải phản ánh `governance context`, `governance checks` hoặc `governance-exception` ở đúng step liên quan, không để tách rời khỏi workflow note.
- Authority cho `waiver` hoặc `approved_by` không được suy ra chỉ từ `role_signoffs`; phải theo `project-context/governance-role-model.md`.
- Khi work item chạy theo SDD, dùng thêm `spec-driven-development.md` để quản lý lifecycle, requirement IDs, spec freeze, spec change và coverage report.

## Artifact Model

| Artifact | Vai trò | Owner | Ghi chú |
|---|---|---|---|
| `BRD` | Business rollout output | `po`, `ba` support | Lưu business context, stakeholder, problem, goal, KPI, scope, out-of-scope, business rule, assumption, decision log và `BRD-*` IDs khi chạy SDD. |
| `SRS` | Requirement rollout output | `ba`, các role delivery review | Lưu functional requirement, NFR, UX/system behavior, acceptance criteria, traceability, dependency, constraint và `SRS-*` IDs khi chạy SDD. |
| NotebookLM notebook | Corpus storage/retrieval | role đang research, thường là `ba` hoặc `po` | Lưu và truy vấn source phụ như meeting note, ticket, policy, research, requirement cũ. Không dùng làm source-of-truth cuối. |
| Workflow step note | Execution trace | role primary của step hoặc coordinator | Lưu contract, role outputs, topology, traceability và handoff cho step hiện tại. |

Nếu cần materialize file riêng cho work item, dùng tên rõ theo `work_item_slug`:

```text
<work_item_slug>.brd.md
<work_item_slug>.srs.md
```

Không tạo `BRD/SRS` nếu scope nhỏ và note workflow đã đủ; khi tạo, phải link từ step note bằng `linked_artifacts`.

## Role Cards

### `po`

Input thường dùng:

- vision, roadmap, stakeholder priority
- KPI, scope boundary, business constraint
- BRD draft hoặc historical decision
- NotebookLM query result khi cần đối chiếu tài liệu/stakeholder context

Output chính:

- business problem và success target
- business scope decision
- BRD section/update
- governance alignment hoặc decision về scope/non-goal khi có rule nền cần chốt
- business acceptance verdict

Skill đi kèm:

- `product-thinking`
- `requirement-analysis`
- `step-goal-contract`
- `notebooklm` khi cần truy hồi corpus phụ trợ

Signoff mặc định:

- `dor`
- `business_acceptance`

### `ba`

Input thường dùng:

- stakeholder notes, business rules, as-is flow
- glossary, existing docs, policy/compliance context
- NotebookLM/project search results
- BRD hoặc decision log upstream

Output chính:

- SRS section/update
- requirement brief
- open questions và missing inputs
- governance context cho requirement hoặc governance blocker cần owner/resolution
- clarified business rules
- acceptance criteria và traceability

Skill đi kèm:

- `requirement-analysis`
- `product-thinking`
- `step-goal-contract`
- `input-readiness-assessor`
- `notebooklm` khi cần truy hồi corpus phụ trợ

Signoff mặc định:

- support `dor`

### `designer`

Input thường dùng:

- user journey, screen context, interaction need
- brand/UI constraint, content constraint
- accessibility baseline, device/platform constraint
- BRD/SRS rule liên quan đến UX outcome

Output chính:

- user flow hoặc screen behavior
- interaction/visual constraint
- UX/accessibility rule cần được phản ánh vào governance checks khi scope chạm UI
- UX acceptance note
- SRS UX behavior update khi cần

Skill đi kèm:

- `frontend-experience-design`
- `product-thinking`
- `requirement-analysis`
- `brainstorming`

Signoff mặc định:

- `approach` khi scope có UX surface
- support `business_acceptance`

### `developer`

Input thường dùng:

- DoR, acceptance criteria, SRS
- codebase context, conventions, technical constraints
- NFR, architecture boundary, deployment constraint khi có

Output chính:

- technical approach
- architecture boundary hoặc design decision
- task breakdown
- governance-exception khi approach hoặc implementation cần lệch nguyên tắc chuẩn
- code/config/doc changes
- implementation note hoặc SRS exception khi behavior đổi

Skill đi kèm:

- `system-design`
- `domain-architecture`
- `frontend-architecture`
- `database-design`
- `task-breakdown-planner`
- `implementation`
- `react-web-implementation` khi stack là React web hoặc Next.js

Signoff mặc định:

- `approach`

### `qc`

Input thường dùng:

- SRS, acceptance criteria, business rules
- changed scope, changed files, environment matrix
- known risks, testability constraints

Output chính:

- test strategy hoặc scenario matrix
- verification evidence
- governance checklist evidence và compliance verdict ở step verify
- defect list hoặc review findings
- DoD verdict
- release recommendation khi cần

Skill đi kèm:

- `testing`
- `code-scan-review`
- `frontend-quality-review`
- `react-best-practices-review`
- `database-change-review`
- `definition-of-done-gate`

Signoff mặc định:

- `dod`
- `release`

### `devops`

Input thường dùng:

- runtime target, environment matrix
- secrets/network/storage constraints
- packaging requirement
- promotion and rollback requirement

Output chính:

- deployment plan
- packaging/runtime contract
- pipeline/release plan
- runtime hoặc release governance checks khi scope chạm rollout
- rollout note và rollback note
- deployment review

Skill đi kèm:

- `deployment-devops`
- `containerization-packaging`
- `platform-runtime-deployment`
- `ci-cd-release`

Signoff mặc định:

- `release`

## Step Mapping

| Step | BRD/SRS output | Role outputs bắt buộc khi có role | Governance theo role | NotebookLM usage |
|---|---|---|---|---|
| `s01` Clarify | tạo khung `BRD` ban đầu | `po`: problem/scope draft; `ba`: restatement và context; `designer`: UX context nếu có | `po` và `ba` ghi `governance context` ban đầu; `designer` bổ sung UX/accessibility rule nếu có | query nguồn yêu cầu, meeting note, ticket hoặc corpus dự án để tránh restate sai |
| `s02` Business Goal | cập nhật `BRD` với goal, KPI, out-of-scope | `po`: business goal và priority; `ba`: rule/context support; `designer`: UX objective nếu có | `po` chốt goal và non-goal không vi phạm nguyên tắc nền hoặc ghi rõ trade-off | query benchmark, user context hoặc decision cũ nếu business goal phụ thuộc tài liệu |
| `s03` Open Questions | cập nhật decision log hoặc open questions cho `BRD/SRS` | `ba`: missing inputs/conflicts; role khác: câu hỏi theo boundary của mình | `ba` gom `governance blocker` hoặc policy gap; role khác nêu blocker theo boundary chuyên môn | search NotebookLM/project docs để gom evidence, nhưng không đóng câu hỏi nếu chưa ghi kết luận vào note/BRD/SRS |
| `s04` Acceptance + DoR | tạo/cập nhật `SRS` với requirement, rule, AC, DoR | `ba`: requirement/AC; `qc`: testability; `po`: DoR/scope; `designer`: UX AC; `developer`: implementability | `ba`, `qc`, `po` chốt `governance checks` cho readiness; `designer` và `developer` bổ sung UX/implementability constraints cần được kiểm | query policy, requirement cũ, scenario cũ để tăng coverage AC |
| `s05` Technical Approach | dùng `SRS` làm input; cập nhật nếu requirement/constraint đổi | `developer`: approach; `designer`: UX interaction contract; `devops`: runtime/release contract; `ba`: business-rule trace | `developer` ghi `governance-exception` nếu approach lệch chuẩn; `designer` và `devops` bổ sung boundary rule cho UX/runtime/release | query technical notes hoặc design rationale cũ nếu có corpus liên quan |
| `s06` Task Plan | trace task về requirement/AC trong `SRS` | `developer`: build tasks; `qc`: verify tasks; `devops`: release tasks; `designer`: UX refinement tasks | `developer`, `qc`, `devops` bảo đảm task plan có coverage cho review, verify, release và `governance checks` | thường không cần, trừ khi task phụ thuộc tài liệu dự án lớn |
| `s07` Implement | ghi `SRS` exception/update nếu behavior đổi | `developer`: implementation note; `devops`: deployment artifact; `designer`: interaction polish; `qc`: evidence hook | `developer` hoặc `devops` phải ghi `governance-exception` nếu implementation lệch chuẩn; `qc` bảo đảm evidence hook đủ cho verify | thường không dùng, trừ khi cần tra cứu quyết định cũ trong lúc implement |
| `s08` Verify + DoD | verify theo `SRS`, business acceptance dựa trên `BRD/SRS` | `qc`: evidence/DoD; `devops`: release readiness; `developer`: remediation; `po`: business acceptance; `designer`: UX outcome review | `qc` tổng hợp `governance checks`; `devops` chốt release governance; `po` nhìn `business_acceptance` khi còn waiver hoặc risk mở | query corpus khi cần đối chiếu requirement cũ hoặc evidence ngoài repo |

## Role Outputs Block

Dùng block này trong note step khi có nhiều role cùng tham gia hoặc cần trace signoff theo role:

````md
## Role Outputs
```yaml
roles:
  - role: po
    involvement: approve
    inputs:
      - "<BRD section hoặc stakeholder input đã dùng>"
    outputs:
      - "<scope/business decision đã chốt>"
    skills:
      - product-thinking
    signoffs:
      - dor
    upstream_artifacts:
      - "<work_item_slug>.brd.md"
    downstream_artifacts:
      - "<work_item_slug>.srs.md"
    notes: ""
```
````

Quy tắc:

- `role` phải nằm trong `execution_roles` của note.
- `signoffs` chỉ dùng `dor`, `approach`, `release`, `business_acceptance`, `dod`.
- `signoffs` không tự động đồng nghĩa với waiver authority; nếu có `approved_by`, authority phải theo `project-context/governance-role-model.md`.
- Nếu output đến từ NotebookLM query, ghi nó là `input` hoặc `evidence`, rồi link kết luận đã chuẩn hóa trong `BRD/SRS`.
- Không dùng block này để copy lại toàn bộ output chung của step.

## Governance Authority

Khi cần xác định ai được approve exception hoặc waiver:

- xem `project-context/governance-role-model.md`
- không tự suy diễn từ việc role đó là primary owner của step
- không tự suy diễn từ việc role đó đang giữ `dor|approach|release|business_acceptance|dod`

## Traceability Tối Thiểu

Một work item có `BRD/SRS` nên trace được chuỗi sau:

```text
NotebookLM/project docs evidence
-> BRD decision hoặc SRS requirement
-> acceptance criteria
-> technical approach
-> task
-> implementation evidence
-> verification evidence
-> business_acceptance/release decision
```

Nếu một quyết định chỉ tồn tại trong NotebookLM query result và không xuất hiện trong `BRD`, `SRS` hoặc note workflow, quyết định đó chưa được xem là part of record.
