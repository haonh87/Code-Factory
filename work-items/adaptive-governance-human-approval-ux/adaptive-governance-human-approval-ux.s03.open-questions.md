---
artifact_id: "adaptive-governance-human-approval-ux.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "adaptive-governance-human-approval-ux"
step_id: "s03"
step_slug: "open-questions"
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
  - "developer"
  - "qc"
  - "devops"
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "adaptive-governance-human-approval-ux.s01.restate.md"
  - "adaptive-governance-human-approval-ux.s02.business-goal.md"
linked_artifacts:
  - "changes/CR-008/proposal.md"
  - "packages/workflow-bundle/scripts/workflow-telemetry.js"
  - "adaptive-governance-human-approval-ux.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> OQ-AG-001..003 đã được human phê duyệt theo recommendation bundle với đúng authority. Input
> readiness cho s04 hiện là **READY**; các gate Spec, Contract và DoR vẫn chờ artifact và receipt riêng.

## Step Contract
```yaml
step: "s03 Open Questions"
goal: >-
  Biến OQ-AG-001..003 thành một decision bundle có lựa chọn khuyến nghị, trade-off, owner và
  điều kiện kiểm chứng đủ rõ để human owner có thể accept hoặc amend trước s04.
value: >-
  Loại bỏ ba nguồn mơ hồ có thể làm sai acceptance criteria: mức giảm tương tác, nghĩa của
  compatibility và giới hạn privacy/retention của telemetry.
scope_in:
  - "Interaction-reduction target và cách đo"
  - "Legacy artifact/runtime compatibility window và exit criteria"
  - "Telemetry enablement, redaction, retention và transmission boundary"
  - "Các conflict giữa friction reduction, authority, compatibility và privacy"
scope_out:
  - "Chọn module owner, schema implementation hoặc transaction boundary"
  - "Nâng cấp installed runtime hoặc sửa production code"
  - "Phê duyệt Spec, Contract, DoR, Approach hoặc Task Plan"
inputs_required:
  - "s01 scope, AG-01..AG-11 và SA/TA drivers"
  - "s02 Business Goal, KPI-AG-001..010 và INV-AG-001..004"
  - "CR-008 BRD/SRS deltas"
  - "Current telemetry behavior and tests"
  - "Current source/installed runtime version evidence"
outputs_required:
  - "Decision-ready recommendations for OQ-AG-001..003"
  - "Explicit conflicts, assumptions and owner actions"
  - "Input readiness verdict for s04"
  - "Step-goal audit with evidence"
done_when:
  - "Mỗi open question có recommended decision, rejected alternative, rationale và owner"
  - "Compatibility phân biệt backward-read với unsupported forward-read"
  - "Telemetry policy có allowlist, denylist, retention và no-remote rule"
  - "Đúng human owner đã accept hoặc amend cả ba decision"
  - "Không còn unresolved conflict chặn việc viết measurable acceptance criteria"
constraints:
  hard_constraints:
    - "Human authority không thay đổi đối với applicable gates"
    - "Historical signed receipts không được tự động rewrite"
    - "Telemetry mặc định off và không chứa sensitive request content hoặc secret"
    - "Adaptive writer không được bật trên runtime không hiểu contract mới"
  soft_constraints:
    - "Target phải đủ tham vọng để người dùng cảm nhận được nhưng vẫn đo được từ T0"
    - "Compatibility có thời hạn và exit criteria để tránh dual-read vô hạn"
  prohibited_actions:
    - "Dùng runtime upgrade như một cách xóa hoặc viết lại receipt lịch sử"
    - "Thu raw prompt, path, username, passphrase, signature hoặc receipt body vào telemetry"
    - "Suy diễn owner approval từ một xác nhận chung không nêu quyết định"
  compliance_checks:
    - "AG-04/AG-07/AG-10/AG-11 remain zero-tolerance invariants"
    - "Every required gate still needs an independent trusted receipt"
    - "Release remains required for this public workflow-contract change"
risks:
  - id: "RISK-S03-001"
    description: "Target thấp không giải quyết frustration; target không có baseline không thể chứng minh."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Đo T0 trước thay đổi và khóa cả interaction count lẫn retry/lead-time evidence."
    contingency: "Nếu sample thực tế thấp, dùng golden matrix cộng dogfooding và ghi calibration rõ ràng."
    owner: "po"
    status: OPEN
  - id: "RISK-S03-002"
    description: "Runtime cũ ghi hoặc đọc artifact mới không tương thích."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Dual-read/canonical-write và runtime parity gate trước khi bật adaptive writer."
    contingency: "Giữ writer cũ, rollback feature flag và tiếp tục read-only legacy support."
    owner: "developer/devops"
    status: OPEN
  - id: "RISK-S03-003"
    description: "Telemetry identifier hoặc retention làm lộ business intent."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Allowlist-only schema, pseudonymous identifier, local-only storage và bounded retention."
    contingency: "Disable collection, purge raw events và dùng controlled fixture baseline."
    owner: "po/qc"
    status: OPEN
timebox:
  target_duration: "Một focused decision-authoring pass"
  deadline: "Before s04 Acceptance + DoR authoring"
  escalation_rule: "Nếu một owner không quyết định, giữ BLOCKED và không tự chọn thay."
```

## Recommendation Bundle
```yaml
open_questions:
  - id: "OQ-AG-001"
    topic: "Interaction-reduction target"
    owner: "po"
    status: "ACCEPTED"
    decision: "ACCEPT_RECOMMENDATION"
    decided_by: ["po"]
    decided_at: "2026-08-28T14:12:35Z"
    decision_source: "User explicitly approved OQ-AG-001..003 with the corresponding roles."
    recommended_decision:
      target: ">=50% reduction in median intake-to-ACTIVE human interactions against T0"
      readiness_interactions: "<=1 bundled interaction per delivery work item"
      closeout_interactions: "<=1 applicable-only bundled interaction per delivery work item"
      approval_retry_rate: "<=5% after the first 20 completed representative runs"
      safety_floor: "0 irrelevant pending action, unsafe downgrade, partial approval, or contradictory pending claim"
      measurement_rule: >-
        Record T0 before behavior changes; count a human review/bundle as one interaction, every retry
        separately, and receipt count separately from interaction count.
    rejected_alternatives:
      - option: "Only count generated artifacts"
        reason: "Artifact count does not capture repeated confirmations, retries or waiting time."
      - option: "Set no numeric target until production telemetry exists"
        reason: "It leaves the primary user problem unverifiable and allows friction to survive rollout."
    rationale: >-
      A 50% median reduction is large enough to be user-visible while one readiness and one closeout
      bundle preserve independent gate receipts. The first-20-run threshold prevents a single success
      from being presented as stable improvement.
    if_unresolved: "s04 cannot lock measurable success criteria or DoR."
  - id: "OQ-AG-002"
    topic: "Legacy compatibility window and removal criteria"
    owner: "developer/devops"
    status: "ACCEPTED"
    decision: "ACCEPT_RECOMMENDATION"
    decided_by: ["developer", "devops"]
    decided_at: "2026-08-28T14:12:35Z"
    decision_source: "User explicitly approved OQ-AG-001..003 with the corresponding roles."
    observed_baseline:
      source_bundle_version: "2.6.1"
      installed_codex_runtime_version: "2.3.2"
      implication: >-
        A new reader can be made backward-compatible with old artifacts, but runtime 2.3.2 cannot be
        assumed to forward-read a new adaptive 2.6.x artifact contract.
    recommended_decision:
      read_policy: "Dual-read legacy and adaptive artifacts; canonical-write the adaptive shape after activation."
      minimum_window: "3 minor releases or 180 calendar days after stable activation, whichever is longer"
      runtime_rule: "Upgrade every supported harness to the matching source minor before enabling adaptive writes."
      historical_receipts: "Never auto-rewrite; retain read and verification support."
      exit_criteria:
        - "100% pass across legacy/adaptive fixture and trusted-receipt matrices"
        - "No ACTIVE work item depends on a legacy-only writer"
        - "Migration/read-only fallback and rollback path are verified"
        - "Deprecation warning has shipped for at least one minor release"
        - "Developer and DevOps record release evidence; QC confirms compatibility"
    rejected_alternatives:
      - option: "Promise old runtimes can read every future adaptive artifact"
        reason: "That is forward compatibility and cannot be guaranteed by changing the new reader."
      - option: "Support every legacy writer indefinitely"
        reason: "It creates an unbounded dual-schema maintenance cost and prevents contract cleanup."
    rationale: >-
      Three minor releases covers the currently observed 2.3.2-to-2.6.1 lag for backward-read testing,
      while the runtime rule prevents writing a contract into a harness that cannot understand it.
    if_unresolved: "s04 cannot define compatibility AC or a safe rollout boundary."
  - id: "OQ-AG-003"
    topic: "Telemetry enablement, redaction and retention"
    owner: "po/qc"
    status: "ACCEPTED"
    decision: "ACCEPT_RECOMMENDATION"
    decided_by: ["po", "qc"]
    decided_at: "2026-08-28T14:12:35Z"
    decision_source: "User explicitly approved OQ-AG-001..003 with the corresponding roles."
    observed_baseline:
      enablement: "Opt-in through --telemetry or CF_TELEMETRY=on"
      storage: "Out-of-band local JSON; no remote exporter is present"
      gap: "No retention/purge policy; current schema stores raw work_item_slug."
    recommended_decision:
      default: "OFF"
      transport: "Local-only in CR-008; no automatic remote upload"
      raw_event_retention: "30 days maximum"
      aggregate_retention: "90 days maximum"
      identifier: "Omit work_item_slug by default or replace it with a per-install pseudonymous hash"
      allowed_fields:
        - "schema and runtime version"
        - "request lane and selected profile"
        - "categorical routing/escalation reason codes"
        - "role, gate, artifact, interaction, override and retry counts"
        - "bucketed ready/done duration"
        - "validation counts and categorical outcome"
      prohibited_fields:
        - "raw request, prompt or document content"
        - "username, repository name or absolute path"
        - "passphrase, secret, signature or receipt body"
        - "free-form review notes or command arguments"
      controls:
        - "Explicit enablement and visible output location"
        - "Allowlist schema validation plus secret-canary negative tests"
        - "User-invoked purge command or documented deletion procedure"
        - "Disabled mode writes zero files and zero events"
      baseline_fallback: "Use controlled golden fixtures when users do not opt in to real-run telemetry."
    rejected_alternatives:
      - option: "Enable telemetry by default to improve sample size"
        reason: "It conflicts with the approved privacy direction and changes user expectations silently."
      - option: "Store raw slug and request text for debugging"
        reason: "Names and request text may reveal confidential business intent and are unnecessary for KPI calculation."
    rationale: >-
      Allowlist-only local metrics are sufficient to evaluate routing and approval friction. Bounded raw
      retention and pseudonymous identity reduce privacy cost without making the core KPIs unmeasurable.
    if_unresolved: "s04 cannot make AG-10 testable or define evidence retention."
missing_inputs: []
conflicts:
  - id: "CONFLICT-AG-001"
    statement: "Fewer human interactions versus one independent receipt per applicable gate"
    resolution_direction: "Bundle the interaction, not gate semantics or receipts."
    status: "RESOLVED"
  - id: "CONFLICT-AG-002"
    statement: "Opt-in telemetry versus enough evidence to prove KPI improvement"
    resolution_direction: "Use opt-in real-run evidence plus mandatory controlled golden-fixture baseline."
    status: "RESOLVED"
  - id: "CONFLICT-AG-003"
    statement: "Backward-read support versus old-runtime forward-read expectations"
    resolution_direction: "Dual-read in the new runtime; upgrade old runtimes before adaptive writes."
    status: "RESOLVED"
  - id: "CONFLICT-AG-004"
    statement: "Source bundle 2.6.1 versus installed Codex runtime 2.3.2"
    resolution_direction: "Treat runtime parity as an activation/release blocker, not as evidence that old runtime supports the new contract."
    status: "MITIGATED_FOR_AUTHORING"
  - id: "CONFLICT-AG-005"
    statement: "The current strict process governs the change that will later make governance adaptive."
    resolution_direction: "Complete CR-008 under current gates; apply adaptive rules only after verified release."
    status: "RESOLVED_BY_TRANSITION_RULE"
assumptions:
  - "CR-008 does not add a remote telemetry exporter."
  - "The current trusted-receipt model supports independent receipts sealed from one reviewed bundle."
```

## Input Readiness
```yaml
step: "s03 -> s04"
status: READY
available_inputs:
  - "Approved CR-008 and work-item trusted receipts"
  - "s01 requirement, SA and TA driver outputs"
  - "s02 business goal, invariants and KPI candidates"
  - "Current opt-in telemetry implementation and tests"
  - "wfc status evidence: source 2.6.1, installed Codex runtime 2.3.2"
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions:
  - "The 2.6.1/2.3.2 runtime mismatch remains a rollout risk and does not block s04 authoring."
risk_level: MEDIUM
next_action: "Author s04 Acceptance + DoR from the accepted decisions; keep runtime parity as an activation/release constraint."
```

## Audit
```yaml
step: "s03 Open Questions"
status: PASS
checks:
  - criterion: "Every open question has a recommendation, rejected alternative, rationale and owner"
    result: PASS
    evidence: "OQ-AG-001..003 each contain all required decision fields."
  - criterion: "Compatibility distinguishes backward-read from unsupported forward-read"
    result: PASS
    evidence: "OQ-AG-002 records the 2.6.1/2.3.2 baseline and separate read/runtime rules."
  - criterion: "Telemetry policy defines allowlist, denylist, retention and transmission"
    result: PASS
    evidence: "OQ-AG-003 defines local-only opt-in collection, 30/90-day retention and prohibited fields."
  - criterion: "Correct human owners accepted or amended all three decisions"
    result: PASS
    evidence: "Human accepted OQ-AG-001 as PO, OQ-AG-002 as Developer/DevOps and OQ-AG-003 as PO/QC at 2026-08-28T14:12:35Z."
  - criterion: "No unresolved conflict blocks measurable acceptance criteria"
    result: PASS
    evidence: "CONFLICT-AG-001..003 are resolved; CONFLICT-AG-004 is an explicit rollout constraint for s04/s08."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Recommendation authoring completed in one focused pass."
gaps: []
risk_level: MEDIUM
next_action: "Proceed to s04 Acceptance + DoR; do not infer any s04 gate approval from the OQ decisions."
```

## SDD Traceability
```yaml
requirement_refs:
  - "BR-AG-003"
  - "BR-AG-004"
  - "REQ-AG-004"
  - "REQ-AG-005"
  - "REQ-AG-006"
  - "REQ-AG-007"
  - "REQ-AG-008"
  - "REQ-AG-009"
acceptance_refs: ["AG-04", "AG-05", "AG-06", "AG-07", "AG-08", "AG-09", "AG-10", "AG-11"]
task_refs: ["T0", "T2", "T4", "T5", "T6", "T7", "T8", "T9"]
test_refs:
  - "interaction-baseline"
  - "legacy-adaptive-compatibility"
  - "runtime-parity"
  - "telemetry-allowlist"
  - "telemetry-retention"
  - "secret-canary"
```

## Traceability
```yaml
upstream:
  - "adaptive-governance-human-approval-ux.s01.restate.md"
  - "adaptive-governance-human-approval-ux.s02.business-goal.md"
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
evidence:
  - "packages/workflow-bundle/scripts/workflow-telemetry.js"
  - "packages/workflow-bundle/test/workflow-telemetry.test.js"
  - "wfc status --mode codex"
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Trạng thái readiness: **READY**; ba recommendation đã được đúng human authority chấp nhận.
- Điều cần làm để sang step 4: soạn measurable Acceptance, Existing System Baseline, Governance Checks và DoR; sau đó BA/Developer/QC review các gate tương ứng.
