---
artifact_id: "code-factory-holistic-audit-remediation.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "code-factory-holistic-audit-remediation"
step_id: "s03"
step_slug: "open-questions"
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
  - "developer"
  - "qc"
  - "devops"
review_mode: independent
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "code-factory-holistic-audit-remediation.s01.restate.md"
  - "code-factory-holistic-audit-remediation.s02.business-goal.md"
linked_artifacts:
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
  - "code-factory-holistic-audit-remediation.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> OQ-CF-001..005 đã được chuyển thành recommendation bundle có option, trade-off, owner và verify
> path. OQ-CF-004/005 đóng khoảng trống decision của hai finding mới CF-019/020. Chưa có quyết định
> human cho năm OQ, vì vậy readiness để viết s04 hiện là **BLOCKED**.

## Step Contract
```yaml
step: "s03 Open Questions"
goal: >-
  Biến OQ-CF-001..005 thành các lựa chọn có thể quyết định về document authority, legacy lifecycle
  truth, public-language ownership, role applicability authority và current-facing documentation
  mà không mở implementation hay tự gán approval.
value: >-
  Loại bỏ năm vùng mơ hồ có thể khiến s04 khóa acceptance sai: tài liệu nào là canonical, lịch sử
  legacy được chuyển đổi thế nào mà không giả receipt, ai chịu trách nhiệm cho ngôn ngữ tự nhiên,
  rule nào điều khiển SA/TA applicability, và tài liệu version/inventory nào là current hay historical.
scope_in:
  - "Authority và trạng thái của docs/plans, docs/research và docs/audits"
  - "Policy classify/migrate/retire cho 17 legacy items và empty wfc-demo"
  - "Owner, rubric, coverage và gate applicability cho public EN/VI language quality"
  - "Authority reconciliation giữa adaptive applicability và generic SA/TA Skill Requirement"
  - "Current-versus-historical policy cho public version và managed-skill inventory claims"
scope_out:
  - "Di chuyển/xóa file, sửa validator hoặc migrate legacy item"
  - "Sửa prompt/README/skill language"
  - "Phê duyệt child work item, Spec, DoR, Approach hoặc Task Plan"
inputs_required:
  - "s01 scope, governance context và SA/TA drivers"
  - "s02 goal, KPI-CF-001..012 và INV-CF-001..005"
  - "Master plan CF-001..020, AC-CF-001..011 và prior-artifact coverage"
  - "Current .gitignore, protocol output, role authority model và public version/inventory surfaces"
outputs_required:
  - "Recommendation bundle cho OQ-CF-001..005"
  - "Rejected alternatives, risks, owner và verify path cho từng quyết định"
  - "Input readiness verdict cho s04"
done_when:
  - "Mỗi OQ có ít nhất hai option và một recommendation có rationale"
  - "Mỗi recommendation có authority, affected metrics và verify path"
  - "Không option nào backfill giả trusted receipt hoặc truyền approval xuống child"
  - "Human owner đã accept hoặc amend từng recommendation"
  - "Không còn decision conflict chặn acceptance criteria"
constraints:
  hard_constraints:
    - "Canonical authority phải repo-visible và không phụ thuộc file bị ignore"
    - "Legacy history không được biến thành protocol approval giả"
    - "Meaning, authority và next action chính xác quan trọng hơn văn phong trơn tru"
    - "Chỉ role có quyết định thực mới tham gia language review"
  soft_constraints:
    - "Ưu tiên selective migration thay vì unignore/bulk migration toàn bộ"
    - "Gom language review theo surface/risk để giảm ceremony"
  prohibited_actions:
    - "Tự chọn quyết định thay cho human owner"
    - "Xóa ignored/legacy artifact trước attribution"
    - "Dùng average language score để che một lỗi authority nghiêm trọng"
  compliance_checks:
    - "project-context/governance-role-model.md"
    - "protocolControl.legacyScaffoldPolicy=forbid remains the new-item default"
    - "Portfolio approval and child approval remain independent"
risks:
  - id: "R-CF-S03-001"
    description: "Track quá nhiều draft làm repo nhiễu và tạo nhiều nguồn authority."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Chỉ promote artifact còn sống; mọi bản khác nhận explicit disposition."
    contingency: "Giữ master plan làm index duy nhất và retire bản trùng."
    owner: "po/maintainer"
    status: OPEN
  - id: "R-CF-S03-002"
    description: "Mass-migrate legacy tạo lịch sử approval không có thật."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Classify first; rematerialize actionable items, preserve completed history as read-only evidence."
    contingency: "Quarantine ambiguous items và chặn lifecycle claim."
    owner: "developer/qc"
    status: OPEN
  - id: "R-CF-S03-003"
    description: "Language gate biến thành subjective ceremony hoặc làm sai technical meaning."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Dùng rubric có binary authority check, measurable coverage và role applicability."
    contingency: "Fail riêng critical surface; không bắt review lại toàn pack khi scope không liên quan."
    owner: "ba/qc"
    status: OPEN
  - id: "R-CF-S03-004"
    description: "Hai authority rule trái nhau khiến maintenance vẫn bị kéo vào SA/TA ceremony dù router đã loại role."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Chọn một conditional authority rule, giữ hard triggers và khóa bằng semantic fixture."
    contingency: "Giữ CF-019 mở và không cho parent Business Acceptance đi qua nếu conflict chưa có disposition."
    owner: "po/ba/developer/qc"
    status: OPEN
  - id: "R-CF-S03-005"
    description: "Cập nhật đồng loạt version có thể biến historical release material thành tuyên bố hiện tại sai sự thật."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Phân loại current/historical trước; chỉ current surface theo released state thực tế."
    contingency: "Giữ tài liệu mơ hồ khỏi current onboarding và ghi explicit historical label."
    owner: "po/ba/devops"
    status: OPEN
timebox:
  target_duration: "Một focused recommendation pass và một human decision interaction"
  deadline: "Before s04 Acceptance + DoR authoring"
  escalation_rule: "Nếu một owner không quyết định hoặc roles bất đồng, giữ BLOCKED tại s03."
```

## Recommendation Bundle
```yaml
open_questions:
  - id: "OQ-CF-001"
    topic: "Canonical authority for ignored planning and research documents"
    owner: "po/maintainer"
    status: PENDING_HUMAN_DECISION
    affects: ["CF-001", "CF-011", "KPI-CF-002"]
    observed_baseline:
      canonical_work_item_root: "work-items/"
      visible_master_plan: "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
      ignored_roots: ["docs/plans/", "docs/research/"]
      live_ignored_inputs:
        - "docs/plans/apply-trending-ai-research-2026-06.md"
        - "docs/plans/memory-standardization-plan.md"
        - "docs/plans/sa-ta-skill-metrics-deep-dive.md"
    options:
      - id: A
        direction: "Unignore and track every file under docs/plans and docs/research"
        tradeoff: "Maximum visibility but promotes drafts, duplicates and stale notes into shared authority."
        recommendation: REJECT
      - id: B
        direction: "Leave all ignored documents as permanent source material"
        tradeoff: "No repository noise, but collaborators and CI cannot inspect the evidence."
        recommendation: REJECT
      - id: C
        direction: "Selective promotion with explicit disposition"
        tradeoff: "Requires one-time classification, but preserves one shared authority without bulk tracking."
        recommendation: RECOMMENDED
    recommended_decision:
      canonical_shared_roots: ["work-items/", "docs/audits/"]
      policy:
        - "Master portfolio and audit/decision reports are tracked under docs/audits/."
        - "A still-actionable ignored plan is promoted into a governed work item or tracked audit input before use."
        - "A superseded or retired ignored plan receives one disposition and replacement pointer in the master portfolio; it is not a second authority."
        - "Do not remove the broad ignore rule or force-track whole directories."
      verify_path:
        - "Every prior artifact has exactly one CURRENT, SUPERSEDED, RETIRED or HISTORICAL_INPUT verdict."
        - "Every CURRENT authority is not ignored and resolves from the repository."
        - "No two artifacts claim source_of_truth for the same decision."
    rationale: >-
      Option C is the smallest policy that makes active evidence shareable while preventing a flood of
      draft documents and duplicate authority.
    requested_decision: "Accept, amend or reject Option C as PO/maintainer."
  - id: "OQ-CF-002"
    topic: "Truthful policy for 17 legacy work items and the empty wfc-demo entry"
    owner: "developer/qc"
    status: PENDING_HUMAN_DECISION
    affects: ["CF-007", "CF-008", "KPI-CF-003", "KPI-CF-010"]
    observed_baseline:
      protocol_managed: 11
      legacy_skipped: 17
      invalid_empty_entries: ["work-items/wfc-demo/"]
      new_item_policy: "legacyScaffoldPolicy=forbid"
    options:
      - id: A
        direction: "Mass-convert every legacy note into protocol-managed state and create receipts"
        tradeoff: "Produces uniform status but fabricates approval provenance that never existed."
        recommendation: REJECT
      - id: B
        direction: "Keep all legacy items permanently skipped"
        tradeoff: "Preserves files but leaves misleading pending/unknown lifecycle indefinitely."
        recommendation: REJECT
      - id: C
        direction: "Classify first, then migrate, register, quarantine or remove by evidence"
        tradeoff: "More deliberate than mass migration, but preserves historical truth and isolates actionable work."
        recommendation: RECOMMENDED
    recommended_decision:
      classes:
        evidence_backed_closed: "Register read-only as LEGACY_CLOSED with evidence; never mint retrospective approval receipts."
        actionable: "Rematerialize as a new protocol-managed work item with current human approvals."
        ambiguous: "Mark LEGACY_REVIEW_REQUIRED; make no completion or approval claim."
        empty_invalid: "Remove recoverably after target verification and maintainer approval."
      rules:
        - "New protocol-managed items remain forbidden from using legacy scaffold bypass."
        - "Migration preserves original paths/commit references and records the transformation event."
        - "Portfolio/list output distinguishes historical closed evidence from pending protocol work."
      verify_path:
        - "17/17 legacy entries have one class and evidence pointer."
        - "0 retrospective trusted receipts are created."
        - "0 unexplained skipped or misleading pending entries remain."
        - "wfc-demo is attributed and either repaired or recoverably removed."
    rationale: >-
      Option C reconciles truthful history with operational clarity. It avoids both false provenance
      and permanent ambiguity.
    requested_decision: "Accept, amend or reject Option C jointly as Developer and QC."
  - id: "OQ-CF-003"
    topic: "Ownership and measurable quality bar for public English/Vietnamese language"
    owner: "ba/po/qc"
    status: PENDING_HUMAN_DECISION
    affects: ["CF-012", "KPI-CF-008", "KPI-CF-009"]
    options:
      - id: A
        direction: "PO reviews every public string and skill"
        tradeoff: "Business tone is covered but technical/action accuracy and review load are poor."
        recommendation: REJECT
      - id: B
        direction: "Every role signs every language change"
        tradeoff: "Broad review but recreates the role ceremony the portfolio is meant to reduce."
        recommendation: REJECT
      - id: C
        direction: "BA-owned rubric with applicable domain review and QC verification"
        tradeoff: "Needs a clear rubric, but assigns one primary owner and adds roles only when their decision is relevant."
        recommendation: RECOMMENDED
    recommended_decision:
      primary_owner: "ba"
      supporting_authority:
        po: "Business promise, public tone and product intent only."
        developer_or_devops: "Technical command/behavior accuracy only when the changed surface touches that domain."
        qc: "Coverage, rubric evidence and regression verification."
      interaction_model: "One batched review per changed public surface; no mandatory role-per-skill ceremony."
      rubric:
        dimensions:
          - "clarity"
          - "naturalness in the target language"
          - "actionable next step"
          - "terminology consistency"
          - "role/gate relevance"
        scoring: "1..5 per dimension"
        critical_binary_check: "Authority, safety meaning, command and next action are correct and unambiguous."
        pass_threshold: "0 critical failures, average >=4.0/5 and no dimension <3.0/5."
      coverage:
        mandatory: ["README/quickstart entry paths", "approval prompts", "errors/blockers", "release/install instructions"]
        skill_sample: "At least one EN/VI public artifact from every skill group plus every skill changed by a child item."
      verify_path:
        - "100% mandatory surfaces reviewed with issue/evidence references."
        - "Every sampled item records rubric scores and reviewer applicability."
        - "0 critical authority/action errors remain."
        - "User-facing approval telemetry is reviewed separately from authority compliance."
    rationale: >-
      Option C improves naturalness without turning subjective preference into an all-role gate. BA
      owns clarity, domain owners join only when meaning is theirs, and QC verifies evidence.
    requested_decision: "Accept, amend or reject Option C as BA, with PO/QC agreement on their scoped responsibilities."
  - id: "OQ-CF-004"
    topic: "Authoritative relationship between adaptive role applicability and the generic SA/TA skill rule"
    owner: "po/ba/developer/qc"
    status: PENDING_HUMAN_DECISION
    affects: ["CF-019", "AC-CF-010", "KPI-CF-005", "KPI-CF-006"]
    observed_baseline:
      adaptive_rule: "Maintenance does not add SA/TA without a named trigger."
      generic_skill_rule: "Use SA and TA at steps s01 to s04."
      executable_router: "Omits irrelevant SA/TA roles for maintenance."
    options:
      - id: A
        direction: "Make SA and TA mandatory for every s01-s04 request regardless of applicability"
        tradeoff: "One simple rule, but contradicts adaptive admission and recreates the role friction the release is meant to remove."
        recommendation: REJECT
      - id: B
        direction: "Let the adaptive router win operationally but leave the generic Skill Requirement unchanged"
        tradeoff: "Avoids an immediate edit, but keeps two operative instructions with opposite meanings across source and runtime copies."
        recommendation: REJECT
      - id: C
        direction: "Make the generic SA/TA rule conditional on router applicability and stable reason codes"
        tradeoff: "Requires policy/runtime synchronization and a semantic fixture, but preserves both low-friction maintenance and mandatory high-risk triggers."
        recommendation: RECOMMENDED
    recommended_decision:
      authority_rule:
        - "The router's applicable_roles and reason_codes decide whether SA and/or TA run for a work item."
        - "SA/TA remain mandatory for the named public-contract, regulated, cross-system, and greenfield-foundation triggers."
        - "A generic skill instruction may not re-add a role omitted by the authoritative applicability decision."
      verify_path:
        - "Maintenance fixtures produce zero irrelevant SA/TA actions when no trigger exists."
        - "Public-contract, regulated and greenfield-foundation fixtures still require the correct architecture roles."
        - "Source policy, Codex runtime and Claude runtime carry semantically identical conditional wording."
        - "A semantic regression fails when the two operative rules contradict each other."
    rationale: >-
      Option C removes the authority conflict without weakening the cases where architecture review is
      genuinely required. It also turns the intended adaptive behavior into a testable invariant.
    requested_decision: "Accept, amend or reject Option C jointly as PO, BA, Developer and QC."
  - id: "OQ-CF-005"
    topic: "Current-versus-historical policy for public version and managed-skill inventory claims"
    owner: "po/ba/devops"
    status: PENDING_HUMAN_DECISION
    affects: ["CF-020", "AC-CF-011", "KPI-CF-002", "KPI-CF-007"]
    observed_baseline:
      current_candidate: "v2.6.2 with 42 source skills; not yet released or installed"
      installed_runtime: "v2.3.2 with 40 managed skills"
      stale_claims: "Some current-facing docs still say v2.1.1 and 36 skills"
    options:
      - id: A
        direction: "Replace every version and skill count with v2.6.2 and 42"
        tradeoff: "Fast consistency, but falsifies historical release material and claims an unreleased candidate as current."
        recommendation: REJECT
      - id: B
        direction: "Leave all existing claims unchanged"
        tradeoff: "Preserves history, but current onboarding continues to contradict source and runtime state."
        recommendation: REJECT
      - id: C
        direction: "Classify every affected surface as current or historical before updating claims"
        tradeoff: "Requires an explicit inventory and allowlist, but keeps history truthful and current onboarding accurate."
        recommendation: RECOMMENDED
    recommended_decision:
      policy:
        - "Current onboarding identifies the actually released version and its managed-skill count, never a candidate-only state."
        - "Historical release material keeps its original version/count with an explicit historical label and is excluded from current navigation."
        - "Release promotion updates current surfaces atomically with the released artifact and runtime inventory."
      verify_path:
        - "100% affected documents have a CURRENT or HISTORICAL classification."
        - "Current-facing scans return one released version and one managed-skill count."
        - "Historical claims are allowlisted and visibly labeled, not silently rewritten."
        - "Source, release artifact, installed runtimes and public current docs are reconciled after promotion."
    rationale: >-
      Option C prevents both stale onboarding and revisionist history. It also makes version/count
      consistency a release invariant instead of an ad-hoc documentation cleanup.
    requested_decision: "Accept, amend or reject Option C jointly as PO, BA and DevOps."
missing_inputs:
  - "Explicit human decisions for OQ-CF-001..005."
conflicts:
  - id: "CONFLICT-CF-001"
    tension: "Repository visibility versus draft/noise and duplicate authority."
    resolution_owner: "po/maintainer"
  - id: "CONFLICT-CF-002"
    tension: "Uniform protocol status versus truthful historical provenance."
    resolution_owner: "developer/qc"
  - id: "CONFLICT-CF-003"
    tension: "Natural language versus exact authority/technical meaning and low ceremony."
    resolution_owner: "ba/po/qc"
  - id: "CONFLICT-CF-004"
    tension: "Generic mandatory SA/TA wording versus router-controlled role applicability."
    resolution_owner: "po/ba/developer/qc"
  - id: "CONFLICT-CF-005"
    tension: "Accurate current onboarding versus preservation of historical release claims."
    resolution_owner: "po/ba/devops"
assumptions:
  - "The approved master plan remains the only portfolio-level authority."
  - "Ignored plan files are inputs, not shared source-of-truth artifacts."
  - "No trusted receipt may be reconstructed from prose or Git history alone."
  - "English remains the default base documentation and Vietnamese supplements preserve natural target-language phrasing."
  - "v2.6.2 remains a candidate until the governed release lifecycle is complete."
```

## Input Readiness
```yaml
step: "s04 Acceptance + DoR"
status: BLOCKED
available_inputs:
  - "PO-approved master plan and trusted work-item receipt"
  - "s01 Requirement Analysis and SA/TA drivers"
  - "s02 Business Goal, KPI-CF-001..012 and INV-CF-001..005"
  - "Current ignore, protocol, work-item inventory and role-authority evidence"
missing_inputs:
  - "Human decision for OQ-CF-001"
  - "Human decision for OQ-CF-002"
  - "Human decision for OQ-CF-003"
  - "Human decision for OQ-CF-004"
  - "Human decision for OQ-CF-005"
invalid_inputs: []
conflicts:
  - "The five option tensions are documented but not yet resolved by their owners."
assumptions:
  - "Recommendations remain proposals until explicit role decisions are recorded."
risk_level: MEDIUM
next_action: "Human owners accept or amend OQ-CF-001..005; then re-assess readiness before s04."
```

## Audit
```yaml
step: "s03 Open Questions"
status: PARTIAL
checks:
  - criterion: "Each OQ has options, recommendation and rationale"
    result: PASS
    evidence: "OQ-CF-001..005 each compare A/B/C and recommend C."
  - criterion: "Each OQ has authority and verify path"
    result: PASS
    evidence: "Owners, affected metrics and closure evidence are explicit per recommendation."
  - criterion: "Historical provenance and child authority are preserved"
    result: PASS
    evidence: "OQ-CF-002 forbids retrospective receipts; every recommendation preserves independent child gates."
  - criterion: "Human owners have decided"
    result: FAIL
    evidence: "All five OQs remain PENDING_HUMAN_DECISION."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Recommendation authoring completed in one focused pass; human decision is pending."
gaps:
  - "OQ-CF-001..005 lack explicit human decisions."
risk_level: MEDIUM
next_action: "Request one bundled human decision with the corresponding scoped roles."
```

## Traceability
```yaml
upstream:
  - "code-factory-holistic-audit-remediation.s01.restate.md"
  - "code-factory-holistic-audit-remediation.s02.business-goal.md"
  - "docs/audits/code-factory-holistic-workflow-skill-remediation-plan.md"
outputs:
  - "OQ-CF-001..005 recommendation bundle"
  - "s04 input-readiness report"
next_step: "Human decision, then s04 Acceptance + DoR"
```

## Handoff
- Trạng thái readiness: `BLOCKED` chỉ vì năm human decisions chưa được ghi; không có missing technical input.
- Recommendation: chọn Option C cho OQ-CF-001..005 với authority tương ứng.
- Điều cần làm để sang step 4: PO/maintainer quyết OQ-CF-001; Developer/QC quyết OQ-CF-002;
  BA quyết OQ-CF-003 với PO/QC đồng ý phạm vi trách nhiệm; PO/BA/Developer/QC quyết OQ-CF-004;
  PO/BA/DevOps quyết OQ-CF-005.
