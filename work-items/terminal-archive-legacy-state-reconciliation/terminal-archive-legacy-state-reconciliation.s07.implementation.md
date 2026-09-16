---
artifact_id: "terminal-archive-legacy-state-reconciliation.s07.implementation"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: BUG
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
change_id: "CR-009"
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
  - "developer"
  - "qc"
review_mode: self
verification_owner: ""
artifact_shape: adaptive_v1
request_lane: maintenance
workflow_required: true
routing_reasons:
  - "LANE_MAINTENANCE"
escalation_reasons: []
role_reasons:
  developer:
    - "ROLE_DEVELOPER_BOUNDED_CHANGE"
  qc:
    - "ROLE_QC_DOD_VERIFICATION"
gate_reasons:
  task_plan:
    - "GATE_TASK_PLAN_BOUNDED_CHANGE"
  dod:
    - "GATE_DOD_TECHNICAL_CLOSEOUT"
adaptive_activation:
  source_version: "2.6.2"
  installed_versions:
    - "2.6.2"
    - "2.6.2"
  parity_passed: true
approval_gates:
  spec: "not_applicable"
  contract: "not_applicable"
  dor: "not_applicable"
  approach: "not_applicable"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  task_plan: ["developer"]
  dod: ["qc"]
gate_reviews:
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "terminal-archive-legacy-state-reconciliation.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Step Contract
```yaml
step_goal: ""
input_summary: []
output_summary: []
done_when: []
owner: ""
```

## Artifact Chính
```yaml
implemented_changes: []
doc_changes: []
operational_notes: []
```

## Delivery Rule Evidence
```yaml
behavior_change: YES|NO
tdd_status: DONE|NOT_REQUIRED|EXCEPTION
tdd_test_refs: []
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: QUICK_FIX|STANDARD|LARGE_OR_RISKY
worktree_status: USED|NOT_REQUIRED|SKIPPED_WITH_REASON
worktree_refs: []
worktree_reason: ""
review_status: COMPLETED|PARTIAL|BLOCKED
review_refs: []
spec_compliance_status: PASS|FAIL|PARTIAL|NOT_RUN
code_quality_status: PASS|FAIL|PARTIAL|NOT_RUN
delegation_mode: agentic|multi_agent|subagent|sequential_multi_role
independence_status: PASS|FAIL|NOT_APPLICABLE
independence_refs: []
merge_path: ""
verify_path: []
```

## Implementation Notes
```yaml
framework_notes: []
known_limitations: []
```

## Traceability
```yaml
upstream: []
next_step: ""
```

## Handoff
- Outputs actual:
- Known limitations:
- Notes for testing:
- Notes for deployment khi có:
