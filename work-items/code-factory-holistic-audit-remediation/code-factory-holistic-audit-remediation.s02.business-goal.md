---
artifact_id: "code-factory-holistic-audit-remediation.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "code-factory-holistic-audit-remediation"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: RESEARCH
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
review_mode: targeted
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "product-thinking"
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "code-factory-holistic-audit-remediation.s01.restate.md"
linked_artifacts:
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
  - "code-factory-holistic-audit-remediation.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Code-Factory cần một portfolio có thể tin được, không chỉ một danh sách issue: mọi finding phải
> có trạng thái, owner, gate và bằng chứng đóng; các blocker phát hành và sai lệch lifecycle phải
> được xử lý trước backlog cải tiến; approval của portfolio không được truyền xuống child item.

## Step Contract
```yaml
step: "s02 Business Goal"
goal: >-
  Khóa giá trị người dùng, kết quả portfolio, non-goals và thước đo thành công cho việc xử lý
  CF-001..018 và disposition CF-019/020 theo thứ tự P0 -> P4 trước khi giải quyết các quyết định
  còn mở ở s03.
value: >-
  Cho maintainer một chuẩn chung để phân biệt tiến độ thật với artifact tồn tại, validator xanh
  hoặc nhận xét tích cực; đồng thời ngăn portfolio rộng trở thành lý do bulk-fix hay kế thừa approval.
scope_in:
  - "Giá trị đối với maintainer, contributor, reviewer và người dùng workflow"
  - "Kết quả kinh doanh/vận hành của portfolio CF-001..020, với CF-019/020 giữ trạng thái proposed"
  - "Success outcomes, invariant và metric candidates cho pack-wide closure"
scope_out:
  - "Chọn technical approach hoặc file-level implementation"
  - "Phê duyệt Spec, DoR, Approach, Task Plan hoặc bất kỳ child gate nào"
  - "Thực hiện Release, merge, cleanup, global install hay security auto-fix"
inputs_required:
  - "s01 Requirement Analysis, SA/TA drivers và governance context"
  - "Master plan đã được PO phê duyệt cùng trusted work-item receipt"
  - "Finding register CF-001..020, approval boundary của CF-019/020 và sequence P0 -> P4"
outputs_required:
  - "Product Thinking record với user problem, business goal và user value"
  - "Observable outcomes, non-goals, risks và KPI-CF-001..012"
  - "Outcome guardrails và handoff cho OQ-CF-001..005"
done_when:
  - "User problem và priority cụ thể, không dùng câu chung chung như improve quality"
  - "Mỗi success outcome có ít nhất một metric hoặc evidence path"
  - "Metrics tách required invariant khỏi target cần human lock"
  - "Không chọn technical direction hoặc mở child implementation"
constraints:
  hard_constraints:
    - "AI proposes, human approves; portfolio approval không kế thừa xuống child item"
    - "P0 blocker và lifecycle truth được xử lý trước P1-P4 trừ approved exception"
    - "Mechanical PASS không được ghi đè semantic FAIL hoặc evidence gap"
    - "Source, installed runtime, Git/CI và release artifact là các evidence domain riêng"
  soft_constraints:
    - "Ưu tiên ít ceremony nhất vẫn giữ đúng authority và traceability"
    - "Mỗi finding chỉ có một canonical disposition trong portfolio"
  prohibited_actions:
    - "Bulk-fix CF-001..020 trong master research item"
    - "Đánh dấu finding closed chỉ vì file, test hoặc plan tồn tại"
    - "Xóa hoặc gom WIP không rõ ownership"
  compliance_checks:
    - "governance_profile=strict"
    - "Work-item receipt APPROVED và child approvals vẫn độc lập"
    - "Tất cả outcome trace được về finding hoặc acceptance draft"
risks:
  - id: "R-CF-S02-001"
    description: "Portfolio trở thành tài liệu stale không phản ánh child evidence."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Mọi disposition phải có evidence pointer và chỉ cập nhật từ child verification."
    contingency: "Đưa finding về OPEN/PARTIAL và chặn closure report."
    owner: "po/qc"
    status: MONITORING
  - id: "R-CF-S02-002"
    description: "Phạm vi rộng dẫn đến bulk change, conflict hoặc approval inheritance."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Giữ child boundary, owned paths, gate và verify path độc lập."
    contingency: "Tách thêm child item và quay lại s03/s04 khi ownership còn chồng lấn."
    owner: "ba/developer"
    status: MONITORING
  - id: "R-CF-S02-003"
    description: "KPI bị gaming bằng validator xanh nhưng bỏ sót semantic quality và human friction."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Duy trì cặp bằng chứng mechanical + semantic và metric authority + UX tách biệt."
    contingency: "Đánh dấu PARTIAL và yêu cầu independent review."
    owner: "qc"
    status: MONITORING
timebox:
  target_duration: "Một focused authoring pass"
  deadline: ""
  escalation_rule: "Đẩy mọi quyết định thiếu owner hoặc threshold sang s03 thay vì tự khóa."
```

## Artifact Chính
```yaml
restated_request: >-
  Xử lý các vấn đề đã review theo thứ tự được phê duyệt và duy trì một master plan hiện hữu,
  kiểm chứng được cho toàn bộ workflow, 42 source skills và các runtime/delivery boundary của
  Code-Factory.
user_problem: >-
  Maintainer hiện phải ghép nhiều plan, work item, change package, runtime status và CI result để
  hiểu Code-Factory đang thực sự ở đâu. Một số artifact đã xong nhưng trông như pending, một số
  validator xanh nhưng che semantic conflict, runtime cài đặt lệch source, và approval ceremony
  có thể tạo thêm ma sát thay vì làm rõ rủi ro.
business_goal: >-
  Đưa CF-001..018 về các trạng thái có căn cứ và buộc CF-019/020 nhận explicit human disposition
  theo sequence P0 -> P4: xử lý release/lifecycle blocker trước, sau đó security và governance blind
  spot, rồi language/human usability, optional capability backlog và cuối cùng pack-wide closure;
  đạt 100% finding accountability, 0 finding critical/high không có owner hoặc next gate,
  0 unexplained lifecycle contradiction và một closure report được QC kiểm chứng mà không kế thừa
  approval giữa các work item.
user_value: >-
  Người dùng nhìn thấy đúng việc gì đang chặn họ và chỉ được hỏi bởi role/gate có quyết định thực;
  maintainer có một portfolio duy nhất để ưu tiên và truy evidence; contributor có child scope rõ
  để sửa nhỏ, review sớm và không phải đoán lại mục tiêu; reviewer có tiêu chí đủ để bác bỏ một
  mechanical PASS khi semantic hoặc release identity vẫn sai.
success_outcome:
  - "CF-001..020 đều có đúng một disposition, owner, dependency, next gate và verify evidence; proposed finding phải được accept, amend hoặc reject rõ."
  - "P0.1-P0.3 kết thúc trước khi portfolio cho phép bắt đầu P1, trừ exception được đúng authority phê duyệt."
  - "Source, installed Codex/Claude runtimes, origin, hosted CI và release candidate được đối soát bằng identity rõ ràng."
  - "Không còn known semantic conflict bị che bởi workflow-pack audit xanh."
  - "Security, protocol truth, language quality và optional capability backlog đều có verified closure hoặc explicit human disposition."
  - "Không còn not_applicable role/gate sinh pending human action trong các lane đã rollout adaptive governance."
  - "Final pack-wide report kết luận từng finding bằng PASS, PARTIAL, FAIL hoặc NOT_APPLICABLE với direct evidence."
non_goals:
  - "Không coi master plan approval là approval của CR-008, CHANGE-005 hoặc child work item khác."
  - "Không sửa toàn bộ finding trong master research item."
  - "Không rewrite lịch sử, retarget immutable tag hoặc backfill evidence như thể drift chưa từng xảy ra."
  - "Không auto-fix security finding trước triage và child approval."
  - "Không ép productize memory, SA/TA scoring hay Rationalizations nếu owner chọn retire/supersede."
  - "Không hướng tới ngôn ngữ hoàn hảo tuyệt đối; chỉ khóa rubric, coverage và actionable defects có evidence."
priority_reason: >-
  CR-008 đang ở release boundary, CHANGE-005 có state không trung thực, runtime/source và artifact
  digest đang lệch, trong khi semantic schema conflict vẫn lọt qua audit. Nếu không xử lý P0 trước,
  mọi cải tiến mới sẽ dựa trên baseline không đáng tin và tiếp tục tăng chi phí xác minh thủ công.
risks_business:
  - "Portfolio rộng làm lead time dài và tạo cảm giác ceremony quay lại."
  - "Legacy item bị migrate máy móc có thể làm sai lịch sử approval hoặc completion."
  - "Natural-language score thiếu owner có thể biến preference thành hard gate tùy tiện."
  - "Release identity không ổn định làm reviewer phê duyệt artifact khác artifact được publish."
  - "Installed runtime update có thể ghi đè unmanaged customization nếu attribution không đầy đủ."
metrics_candidate:
  - id: "KPI-CF-001"
    name: "Finding accountability coverage"
    target: "20/20 = 100% findings có owner, dependency, next gate và verify path"
    status: "required invariant"
  - id: "KPI-CF-002"
    name: "Prior-artifact disposition coverage"
    target: "100% prior plans/research/work items có exactly one portfolio verdict"
    status: "required invariant"
  - id: "KPI-CF-003"
    name: "Unexplained lifecycle contradictions"
    target: "0"
    status: "required invariant"
  - id: "KPI-CF-004"
    name: "Source/runtime semantic parity"
    target: "100% source skills và supported runtime surfaces"
    status: "required invariant before final publication"
  - id: "KPI-CF-005"
    name: "Known semantic conflicts hidden by green audit"
    target: "0"
    status: "required invariant"
  - id: "KPI-CF-006"
    name: "Hosted required-check pass rate"
    target: "100% on the exact release source/candidate identity"
    status: "required invariant for release-bound children"
  - id: "KPI-CF-007"
    name: "Security triage coverage"
    target: "0 untriaged CRITICAL; 100% HIGH findings có owner và disposition"
    status: "required invariant after security baseline"
  - id: "KPI-CF-008"
    name: "Irrelevant pending human actions"
    target: "0 cho mọi role/gate được derive là not_applicable"
    status: "required invariant for adaptive-governance lanes"
  - id: "KPI-CF-009"
    name: "Public-language review coverage"
    target: "100% public entry paths và representative sample của mọi skill group"
    status: "coverage required; quality threshold waits for OQ-CF-003"
  - id: "KPI-CF-010"
    name: "Unexplained legacy/skipped inventory"
    target: "0"
    status: "target requires OQ-CF-002 policy"
  - id: "KPI-CF-011"
    name: "Release artifact identity consistency"
    target: "100% reviewed/tested/published identity match or one approved canonical content rule"
    status: "required invariant"
  - id: "KPI-CF-012"
    name: "Portfolio terminal disposition"
    target: "20/20 findings VERIFIED_CLOSED, ACCEPTED_RESIDUAL, RETIRED, REJECTED_BY_AUTHORITY or covered by approved exception"
    status: "required for final portfolio DoD"
notes_for_next_step: >-
  s03 must decide document authority for ignored plans, legacy migration/retirement policy and
  public-language quality ownership/rubric, plus role-applicability authority and current/historical
  public documentation. It must not turn these choices into implementation or infer approval for any
  child item.
```

## Outcome Guardrails

```yaml
business_invariants:
  - id: "INV-CF-001"
    rule: "Portfolio approval authorizes prioritization/authoring only; child approvals remain independent."
    traces_to: ["AC-CF-004", "KPI-CF-001"]
  - id: "INV-CF-002"
    rule: "A finding closes only from direct evidence or an explicit disposition by the right authority."
    traces_to: ["AC-CF-002", "KPI-CF-012"]
  - id: "INV-CF-003"
    rule: "Mechanical PASS never overrides semantic FAIL, runtime drift or release-identity mismatch."
    traces_to: ["AC-CF-005", "AC-CF-006", "KPI-CF-003", "KPI-CF-005"]
  - id: "INV-CF-004"
    rule: "Source, installed runtime, Git/CI and release artifact retain separate evidence identities until reconciled."
    traces_to: ["KPI-CF-004", "KPI-CF-006", "KPI-CF-011"]
  - id: "INV-CF-005"
    rule: "Unattributed WIP is preserved; cleanup or movement requires an owned child decision."
    traces_to: ["CF-016"]
measurement_rules:
  - "Report numerator, denominator and evidence pointer for every coverage percentage."
  - "Count a finding as closed only after its child verify/decision evidence exists."
  - "Keep workflow authority metrics separate from usability and language-quality metrics."
  - "Treat missing or indirect evidence as incomplete, not as pass."
```

## Audit

```yaml
step: "s02 Business Goal"
status: PASS
checks:
  - criterion: "User problem, value and priority are specific"
    result: PASS
    evidence: "Product Thinking Record names fragmented authority, lifecycle contradiction, runtime drift and approval friction."
  - criterion: "Success outcomes are observable"
    result: PASS
    evidence: "KPI-CF-001..012 define coverage, contradiction, parity, security, language, identity and closure measures."
  - criterion: "Portfolio approval cannot leak into child authority"
    result: PASS
    evidence: "INV-CF-001 and non-goals preserve independent child receipts."
  - criterion: "Outcome evidence is broader than mechanical validation"
    result: PASS
    evidence: "INV-CF-003 and KPI-CF-005 require semantic evidence in addition to validators."
  - criterion: "No technical direction or implementation was selected"
    result: PASS
    evidence: "The note locks outcomes and metrics only; s03 decisions and s05 option analysis remain open."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one focused authoring pass after trusted work-item approval."
gaps:
  - "Document authority remains OQ-CF-001."
  - "Legacy migration/retirement policy remains OQ-CF-002."
  - "Public-language owner and quality threshold remain OQ-CF-003."
  - "Adaptive SA/TA applicability authority and CF-019 disposition remain OQ-CF-004."
  - "Public version/inventory classification and CF-020 disposition remain OQ-CF-005."
risk_level: MEDIUM
next_action: "Proceed to s03 and resolve OQ-CF-001..005 before drafting s04 Acceptance + DoR."
```

## Traceability
```yaml
upstream:
  - "code-factory-holistic-audit-remediation.s01.restate.md"
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
outputs:
  - "Business goal and user value"
  - "KPI-CF-001..012"
  - "INV-CF-001..005"
next_step: "s03 Open Questions"
```

## Handoff
- User problem đã chốt: Code-Factory thiếu một portfolio authority có thể đối soát semantic,
  lifecycle, runtime và release evidence mà không ép maintainer ghép thủ công nhiều nguồn.
- Non-goals: không bulk-fix, không kế thừa child approval, không tự release/cleanup và không ép
  productize optional capability.
- Điều kiện sang step 3: đạt; OQ-CF-001..005 có owner, decision boundary và metric bị ảnh hưởng rõ.
