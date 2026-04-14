# Spec Driven Development Reference

Tài liệu này mô tả lớp `SDD` cho workflow 8 bước. Mục tiêu là làm cho `BRD/SRS` thật sự điều khiển design, task, implementation, verification và rollout.

## Nguyên Tắc

- Workflow vẫn giữ 8 bước; SDD là lớp ràng buộc artifact, gate và traceability.
- `BRD` và `SRS` là source-of-truth cho business và requirement khi work item cần spec chính thức.
- `product-specs/` là root mặc định để materialize `BRD/SRS` thật trong repo.
- NotebookLM chỉ là lớp lưu corpus và truy hồi tài liệu trong lúc thực thi; kết luận từ NotebookLM phải được chuẩn hóa vào `BRD`, `SRS` hoặc note workflow trước khi dùng làm quyết định.
- Technical approach, task, implementation và test evidence phải trace được về requirement ID khi work item chạy theo SDD.
- Sau khi spec đã `frozen`, mọi lệch behavior phải đi qua `spec-change`, không để code trở thành source-of-truth thay spec.

## SDD Artifact Stack

| Layer | Artifact | Owner chính | Mục đích |
|---|---|---|---|
| Business | `BRD` | `po`, `ba` support | Khóa problem, goal, KPI, scope, out-of-scope, business rule và decision log. |
| Requirement | `SRS` | `ba`, role delivery review | Khóa functional requirement, NFR, UX/system behavior, acceptance criteria và constraints. |
| Acceptance | `AC` | `ba`, `qc` | Biến requirement thành tiêu chí đo được. |
| Technical | `technical-approach-spec` | `developer`, `designer/devops` support | Chọn hướng kỹ thuật dựa trên frozen spec. |
| Planning | `task-breakdown-spec` | `developer`, `qc/devops` support | Lập task plan trace về requirement/AC. |
| Implementation | code/config/doc changes | `developer`, `devops` support | Implement theo frozen spec hoặc spec change đã được approve. |
| Verification | `spec-coverage-report` | `qc` | Chứng minh requirement nào pass, fail, partial hoặc untested. |
| Rollout | release/business acceptance | `qc`, `devops`, `po` | Chốt `dod`, `release` và `business_acceptance`. |

## Product Spec Root

Root mặc định cho product spec thật trong repo:

```text
product-specs/
  brd/
  srs/
  templates/
```

Command validator hiện có:

```bash
npm run validate:workflow:sdd -- --workflow-root work-items --project-root .
```

## Spec Lifecycle

Trạng thái chuẩn:

```text
draft -> reviewed -> approved -> frozen -> implemented -> verified -> accepted
```

Trạng thái ngoại lệ:

```text
change_requested
deprecated
blocked
```

Quy tắc:

- `draft`: đang viết, chưa dùng làm source-of-truth cho implementation.
- `reviewed`: đã được role reviewer đọc, còn có thể chỉnh.
- `approved`: business/requirement owner đã đồng ý nội dung.
- `frozen`: đủ ổn định để bước 5, 6, 7 bám vào; mọi thay đổi sau đó phải qua `spec-change`.
- `implemented`: đã có code/config/doc thay đổi theo spec.
- `verified`: QC đã có evidence theo spec coverage.
- `accepted`: PO hoặc business owner đã chốt `business_acceptance` khi scope yêu cầu.

## ID Vocabulary

| Prefix | Ý nghĩa | Owner |
|---|---|---|
| `BRD-###` | business goal, rule, scope decision | `po`, `ba` |
| `SRS-FR-###` | functional requirement | `ba` |
| `SRS-NFR-###` | non-functional requirement | `ba`, `developer`, `devops`, `qc` review |
| `SRS-UX-###` | UX/system behavior requirement | `ba`, `designer` |
| `AC-###` | acceptance criterion | `ba`, `qc` |
| `TASK-###` | implementation/verification/release task | `developer`, `qc`, `devops` |
| `TEST-###` | test scenario hoặc verification evidence | `qc` |
| `CHANGE-###` | spec change request | role phát hiện gap, `po/ba` approve tùy scope |

Không cần ép ID cho mọi dòng note nhỏ. Nhưng nếu work item được đánh dấu SDD, mọi requirement quan trọng phải có ID và trace tối thiểu tới AC hoặc accepted assumption.

## Step Mapping

| Step | SDD responsibility | Gate bổ sung |
|---|---|---|
| `s01` Clarify | Tạo `BRD` draft hoặc business context section; ghi source evidence từ NotebookLM/project docs nếu dùng. | Có `BRD-*` hoặc context decision rõ nếu work item cần BRD. |
| `s02` Business Goal | Chốt goal, KPI, scope, out-of-scope và business rules trong `BRD`. | `BRD` đạt tối thiểu `reviewed` hoặc có accepted assumptions. |
| `s03` Open Questions | Tìm gap, conflict, missing input; dùng NotebookLM/project search làm evidence; cập nhật `BRD/SRS` decision log. | Không còn blocker chưa có owner hoặc resolution path. |
| `s04` Acceptance + DoR | Tạo/cập nhật `SRS`, gán requirement IDs, map AC, chạy spec review và `spec-freeze-gate` khi đủ. | `SRS` đạt `approved|frozen`; AC map được về requirement ID; DoR `READY` hoặc có accepted assumptions. |
| `s05` Technical Approach | Technical approach phải reference `SRS-*`, `AC-*` liên quan. | Không chọn approach nếu requirement chính chưa có ID hoặc spec gap chưa được xử lý. |
| `s06` Task Plan | Task phải map về `SRS-*` và `AC-*`; test/release task cũng phải trace. | Mỗi requirement in-scope có task hoặc quyết định deferred rõ. |
| `s07` Implement | Implement theo frozen spec; nếu behavior lệch, tạo `spec-change`. | Không merge/handoff nếu code lệch spec mà chưa có approved change hoặc documented exception. |
| `s08` Verify + DoD | Tạo `spec-coverage-report`; chốt DoD/release/business acceptance dựa trên `BRD/SRS`. | Requirement coverage rõ `PASS|FAIL|PARTIAL|UNTESTED`; gap còn lại có owner/next action. |

## Spec Freeze Gate

`spec-freeze-gate` là gate ở cuối step 4 hoặc trước khi bước 5 đi sâu vào design.

Điều kiện tối thiểu:

- `BRD` có owner và business scope rõ.
- `SRS` có owner và reviewer chính.
- Requirement chính có ID.
- Acceptance criteria map được về requirement ID.
- Open questions blocking đã được resolve, deferred hoặc accepted as assumption.
- Role signoff cho `dor` đã có owner.
- Nếu scope có UX, runtime, data hoặc release risk, reviewer tương ứng đã được ghi nhận.

## Spec Change Protocol

Kích hoạt khi step 5, 6, 7 hoặc 8 phát hiện spec thiếu, sai hoặc không thể implement/verify an toàn.

Luồng chuẩn:

```text
detect spec gap
-> create CHANGE-###
-> classify impact: business|requirement|ux|technical|test|release
-> propose change
-> PO/BA and affected role review
-> update BRD/SRS/AC/task/test trace
-> continue or block
```

Không được âm thầm sửa code để hợp với hiểu biết mới nếu `SRS` vẫn nói ngược lại.

## Traceability Matrix

Tối thiểu nên trace được chuỗi:

```text
BRD-###
-> SRS-FR-### | SRS-NFR-### | SRS-UX-###
-> AC-###
-> TASK-###
-> TEST-###
-> PASS|FAIL|PARTIAL|UNTESTED
```

Nếu work item nhỏ không tạo `BRD/SRS` riêng, note workflow vẫn nên có trace tương đương trong block `## Traceability`.

## Schema Gợi Ý

### `spec-metadata`

```yaml
spec_id: ""
spec_type: BRD|SRS|AC|TECHNICAL|TASK|TEST|CHANGE|COVERAGE
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
spec_version: "0.1"
owner: ""
reviewers: []
source_refs: []
linked_workflow_steps: []
change_log: []
```

### `brd-spec`

```yaml
business_context: ""
stakeholders: []
problem_statement: ""
business_goals:
  - id: BRD-001
    description: ""
    kpi_refs: []
scope:
  in: []
  out: []
business_rules:
  - id: BRD-002
    rule: ""
assumptions: []
decision_log: []
acceptance_notes: []
```

### `srs-spec`

```yaml
functional_requirements:
  - id: SRS-FR-001
    description: ""
    source_refs: []
    acceptance_refs: []
non_functional_requirements:
  - id: SRS-NFR-001
    category: performance|security|reliability|compatibility|compliance|observability|other
    description: ""
    acceptance_refs: []
ux_system_behavior:
  - id: SRS-UX-001
    description: ""
    acceptance_refs: []
constraints: []
dependencies: []
open_questions: []
```

### `spec-freeze-gate`

```yaml
work_item_slug: ""
status: FROZEN|APPROVED_WITH_ASSUMPTIONS|BLOCKED
checks:
  brd_owner_present: PASS|FAIL
  srs_owner_present: PASS|FAIL
  requirement_ids_present: PASS|FAIL
  acceptance_criteria_mapped: PASS|FAIL
  blocking_questions_resolved: PASS|FAIL
  role_reviewers_recorded: PASS|FAIL
accepted_assumptions: []
blocking_gaps: []
next_action: ""
```

### `spec-change`

```yaml
change_id: CHANGE-001
detected_in_step: s05|s06|s07|s08
impact_area: business|requirement|ux|technical|test|release
current_spec_refs: []
problem: ""
proposed_change: ""
decision: APPROVED|REJECTED|DEFERRED|BLOCKED
decision_owner: ""
updated_artifacts: []
required_followups: []
```

### `spec-coverage-report`

```yaml
coverage_items:
  - requirement_id: SRS-FR-001
    acceptance_refs: [AC-001]
    task_refs: [TASK-001]
    test_refs: [TEST-001]
    status: PASS|FAIL|PARTIAL|UNTESTED
    evidence: ""
    gaps: []
overall_status: PASS|FAIL|PARTIAL|BLOCKED
untested_requirements: []
residual_risks: []
business_acceptance_readiness: READY|READY_WITH_GUARDS|BLOCKED
release_readiness: READY|READY_WITH_GUARDS|BLOCKED|NOT_APPLICABLE
```
