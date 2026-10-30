---
artifact_id: "sdd-scenario-task-contract.s07.implementation"
artifact_family: workflow-step
work_item_slug: "sdd-scenario-task-contract"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: "CR-011"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "product-specs/brd/sdd-scenario-task-contract.md"
  srs: "product-specs/srs/sdd-scenario-task-contract.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
    - "qc"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance: []
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-scenario-task-contract.s06.task-breakdown.md"
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

## Main Artifact
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

## Authoring Boundary

Generated future-step skeleton only. NOT STARTED. No implementation, tests, scan, TDD, technical verification or DoD is claimed. Complete this note only when the corresponding lifecycle step opens.
