---
artifact_id: "adaptive-governance-human-approval-ux.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "adaptive-governance-human-approval-ux"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: CHANGE
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
change_id: "CR-008"
change_status: approved
spec_delta_refs:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CR-008/spec-delta/brd.delta.md"
  srs: "changes/CR-008/spec-delta/srs.delta.md"
spec_status: draft
planning_track: enterprise
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
review_mode: independent
verification_owner: "auditor"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release:
    - "devops"
    - "qc"
  business_acceptance:
    - "po"
  dod:
    - "qc"
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
  - "adaptive-governance-human-approval-ux.s01.restate.md"
linked_artifacts:
  - "changes/CR-008/proposal.md"
  - "adaptive-governance-human-approval-ux.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Mục tiêu là làm governance thích ứng với loại yêu cầu và mức rủi ro: bỏ ceremony không tạo
> giá trị, giảm ít nhất một nửa số tương tác trước khi active, nhưng giữ nguyên thẩm quyền con
> người và không chấp nhận bất kỳ unsafe downgrade nào.

## Step Contract
```yaml
step: "s02 Business Goal"
goal: >-
  Khóa vấn đề người dùng, giá trị mong đợi, kết quả quan sát được, non-goals và bộ chỉ số đề xuất
  cho adaptive governance trước khi xử lý các quyết định còn mở ở s03.
value: >-
  Tạo một chuẩn thành công đủ rõ để nhóm không tối ưu đơn thuần cho ít bước hơn rồi vô tình làm
  yếu human authority, compatibility hoặc khả năng kiểm chứng.
scope_in:
  - "Giá trị đối với người gửi yêu cầu, reviewer và maintainer"
  - "Kết quả kinh doanh cho request admission, role/gate applicability và approval UX"
  - "Invariant an toàn và KPI cải thiện có thể đo"
scope_out:
  - "Chọn kiến trúc, stack, schema hoặc transaction design"
  - "Phê duyệt Spec, Contract, DoR, Approach hoặc Task Plan"
  - "Triển khai runtime, policy, validator hoặc adapter"
inputs_required:
  - "s01 Requirement Analysis Spec"
  - "OBJ-001..OBJ-003 và DRV-SA-001..005"
  - "DRV-TA-001..007"
  - "BR-AG-001..004, REQ-AG-001..009 và AG-01..AG-11"
outputs_required:
  - "Product Thinking record với business goal, user value và non-goals"
  - "Business invariants và KPI candidates"
  - "Business risks và handoff rõ ràng cho s03"
done_when:
  - "Vấn đề người dùng và giá trị không còn được mô tả chung chung"
  - "Mỗi outcome chính có cách quan sát hoặc đo"
  - "Các target chưa được human lock được đánh dấu proposed thay vì giả định đã duyệt"
  - "Không có technical approach nào được chọn"
constraints:
  hard:
    - "AI proposes, human approves vẫn áp dụng cho mọi gate có applicability=required"
    - "Public contract, migration, security, regulated và release trigger không được downgrade"
    - "Tất cả runtime và artifact thuộc compatibility window phải giữ semantic parity"
  soft:
    - "Ưu tiên ít tương tác và ít role nhất vẫn đáp ứng rủi ro thực tế"
    - "Ngôn ngữ hiển thị phải giải thích vì sao một role hoặc gate được yêu cầu"
  prohibited:
    - "AI self-approval hoặc suy diễn human approval từ từ khóa accept chung chung"
    - "Tối ưu KPI bằng cách bỏ evidence, receipt hoặc gate còn applicable"
  compliance:
    - "governance_profile=strict"
    - "CR-008 là public workflow-contract change và cần Release cùng Business Acceptance"
risks:
  - "Routing sai làm người dùng mất niềm tin hoặc bỏ qua workflow"
  - "Mục tiêu giảm ceremony bị dùng để hợp thức hóa weaker control"
  - "KPI bị gaming bằng cách gộp thao tác nhưng không giảm thời gian hoặc retry"
  - "Telemetry gây lo ngại privacy hoặc không đủ adoption để tạo baseline đáng tin"
  - "Compatibility kéo dài làm tăng chi phí duy trì hai artifact shape"
timebox:
  target: "Một focused authoring pass"
  exceeded: false
  evidence: "Business Goal được khóa mà không mở technical design hoặc implementation."
```

## Product Thinking Record
```yaml
restated_request: >-
  Thiết kế lại trải nghiệm governance để yêu cầu không thuộc product delivery không bị ép đi qua
  chuỗi role/gate đầy đủ, còn yêu cầu delivery chỉ gọi đúng role và human decision thực sự cần thiết.
user_problem: >-
  Người dùng hiện phải ghi nhận PO, BA, SA, TA, Developer, QC và DevOps hoặc xác nhận nhiều lần kể
  cả khi các role đó không có quyết định cần đưa ra. Ceremony cố định làm tăng lead time, gây khó
  chịu, che khuất gate quan trọng và có thể tiếp tục báo pending sau khi approval đã thành công.
business_goal: >-
  Trong phạm vi CR-008, đưa governance về mô hình risk- and applicability-based: non-delivery mặc
  định không tạo delivery artifact; delivery request giảm ít nhất 50% median human interactions từ
  intake đến ACTIVE so với baseline T0; readiness và closeout mỗi loại có thể hoàn tất trong một
  bundled interaction; đồng thời duy trì 0 unsafe downgrade, 0 partial approval write và 0 trạng
  thái approval mâu thuẫn.
user_value: >-
  Người gửi yêu cầu chỉ được hỏi điều có ý nghĩa với request của họ; reviewer nhìn thấy một decision
  summary đầy đủ thay vì lặp xác nhận; maintainer vẫn có receipt độc lập, reason code và evidence để
  audit, rollback và hỗ trợ artifact cũ.
success_outcome:
  - "Non-delivery request tạo 0 workflow artifact theo mặc định, trừ explicit human override."
  - "Role hoặc gate not_applicable tạo 0 pending human action."
  - "Mọi role/gate required có deterministic reason code giải thích applicability."
  - "Median human interactions từ intake đến ACTIVE giảm >=50% so với baseline T0."
  - "Readiness có tối đa 1 bundled interaction và vẫn sinh receipt độc lập cho từng applicable gate."
  - "Closeout có tối đa 1 bundled interaction chỉ gồm các terminal gate applicable."
  - "Unsafe downgrade, partial approval write và contradictory pending state đều bằng 0."
  - "Legacy/adaptive compatibility và supported-runtime semantic parity đạt 100% trong compatibility window."
non_goals:
  - "Không loại bỏ human-controlled gates khi gate vẫn applicable."
  - "Không bắt mọi loại yêu cầu phải materialize thành work item."
  - "Không thiết kế signer session hoặc cache passphrase trong CR-008."
  - "Không thay đổi CHANGE-005, diagram-design adapter hoặc tag phát hành bất biến trước đó."
  - "Không chọn technical approach, module ownership hoặc transaction boundary tại s02."
priority_reason: >-
  Friction đã ảnh hưởng trực tiếp đến khả năng sử dụng workflow và lỗi approval-state thực tế cho
  thấy ceremony không chỉ dài mà còn có thể buộc người dùng lặp một quyết định đã hoàn tất.
risks_business:
  - "False non-delivery classification có thể bỏ sót kiểm soát cần thiết."
  - "False escalation vẫn giữ nguyên sự khó chịu mà CR-008 cần giải quyết."
  - "Bundle thiếu decision context có thể biến một click thành approval mù."
  - "Thiếu baseline hoặc event adoption làm target giảm tương tác không thể chứng minh."
  - "Compatibility window không có exit criteria làm chi phí duy trì kéo dài vô hạn."
metrics_candidate:
  - id: "KPI-AG-001"
    name: "Non-delivery delivery-write count"
    target: "0 per request unless explicitly overridden"
    status: "required invariant"
  - id: "KPI-AG-002"
    name: "Irrelevant pending human actions"
    target: "0 for every not_applicable role or gate"
    status: "required invariant"
  - id: "KPI-AG-003"
    name: "Median intake-to-ACTIVE human interactions"
    target: ">=50% reduction against the T0 baseline"
    status: "proposed; OQ-AG-001 requires PO lock before s04"
  - id: "KPI-AG-004"
    name: "Readiness interactions"
    target: "<=1 bundled human interaction per work item"
    status: "proposed; independent receipts remain mandatory"
  - id: "KPI-AG-005"
    name: "Closeout interactions"
    target: "<=1 applicable-only bundled human interaction per work item"
    status: "proposed"
  - id: "KPI-AG-006"
    name: "Approval retry rate"
    target: "<=5% after rollout stabilization"
    status: "proposed; baseline required"
  - id: "KPI-AG-007"
    name: "Unsafe downgrade and partial approval count"
    target: "0"
    status: "required invariant"
  - id: "KPI-AG-008"
    name: "Post-approval contradictory pending claims"
    target: "0"
    status: "required invariant"
  - id: "KPI-AG-009"
    name: "Legacy/adaptive and runtime parity"
    target: "100% across the supported compatibility matrix"
    status: "required invariant during the compatibility window"
  - id: "KPI-AG-010"
    name: "Routing override rate"
    target: "Observe and segment by false escalation versus false non-delivery"
    status: "monitor first; threshold waits for baseline"
notes_for_next_step: >-
  s03 must lock or reject the proposed interaction targets, define the legacy compatibility window
  and exit criteria, and define telemetry enablement, retention and redaction before s04 DoR.
```

## Outcome Guardrails
```yaml
business_invariants:
  - id: "INV-AG-001"
    rule: "Friction reduction changes applicability and interaction shape, never approval authority."
    traces_to: ["OBJ-001", "OBJ-002", "AG-03", "AG-04", "AG-06"]
  - id: "INV-AG-002"
    rule: "A successful approval has one consistent state across receipt, report, protocol, blockers and actions."
    traces_to: ["AG-11", "DRV-TA-006"]
  - id: "INV-AG-003"
    rule: "A failed bundle creates no partial authority or derived-state change."
    traces_to: ["AG-07", "DRV-TA-003"]
  - id: "INV-AG-004"
    rule: "Measurement never stores secrets or sensitive request content."
    traces_to: ["AG-10", "DRV-TA-005"]
measurement_rules:
  - "Count a bundled review as one human interaction, but count every retry separately."
  - "Keep receipt count separate from human interaction count; fewer clicks must not mean fewer receipts."
  - "Segment non-delivery, maintenance, quick, full and enterprise lanes before comparing results."
  - "Record T0 baseline before declaring KPI-AG-003 or KPI-AG-006 achieved."
  - "Report safety invariants independently from experience KPIs."
```

## Audit
```yaml
step: "s02 Business Goal"
status: PASS
checks:
  - criterion: "User problem, value and priority are specific"
    result: PASS
    evidence: "Product Thinking Record identifies irrelevant role/gate ceremony and stale approval state."
  - criterion: "Business outcomes are observable"
    result: PASS
    evidence: "KPI-AG-001..010 separate required invariants, proposed targets and baseline-only measures."
  - criterion: "Friction reduction does not weaken human authority"
    result: PASS
    evidence: "INV-AG-001 and KPI-AG-007 preserve applicable gates and zero unsafe downgrade."
  - criterion: "Non-goals and next decisions are explicit"
    result: PASS
    evidence: "Non-goals exclude self-approval, forced materialization, signer-session design and technical approach."
  - criterion: "No technical direction is selected"
    result: PASS
    evidence: "The note defines outcomes and measurement only; ownership and design remain for s05."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one focused authoring pass."
gaps:
  - "KPI-AG-003, KPI-AG-004, KPI-AG-005 and KPI-AG-006 remain proposed pending OQ-AG-001."
  - "Compatibility duration/exit criteria remain OQ-AG-002."
  - "Telemetry enablement, retention and redaction remain OQ-AG-003."
risk_level: MEDIUM
next_action: "Proceed to s03 and resolve OQ-AG-001..003 before s04 Acceptance + DoR."
```

## SDD Traceability
```yaml
requirement_refs:
  - "BR-AG-001"
  - "BR-AG-002"
  - "BR-AG-003"
  - "BR-AG-004"
  - "REQ-AG-001"
  - "REQ-AG-002"
  - "REQ-AG-003"
  - "REQ-AG-004"
  - "REQ-AG-005"
  - "REQ-AG-006"
  - "REQ-AG-007"
  - "REQ-AG-008"
  - "REQ-AG-009"
acceptance_refs: ["AG-01", "AG-02", "AG-03", "AG-04", "AG-05", "AG-06", "AG-07", "AG-08", "AG-09", "AG-10", "AG-11"]
task_refs: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"]
test_refs:
  - "golden-routing-matrix"
  - "unsafe-downgrade"
  - "atomic-bundle"
  - "approval-state-reconciliation"
  - "legacy-adaptive-compatibility"
  - "telemetry-privacy"
```

## Traceability
```yaml
upstream:
  - "adaptive-governance-human-approval-ux.s01.restate.md"
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
outputs:
  - "Business goal and user value"
  - "KPI-AG-001..010"
  - "INV-AG-001..004"
next_step: "s03 Open Questions"
```

## Handoff
- User problem đã chốt: ceremony cố định và approval-state không nhất quán gây lặp thao tác, tăng lead time và che khuất kiểm soát quan trọng.
- Non-goals: không self-approve, không bỏ applicable gate, không thiết kế signer session, không chọn technical approach.
- Điều kiện sang step 3: đạt; s03 cần khóa interaction target, compatibility window và telemetry policy.
