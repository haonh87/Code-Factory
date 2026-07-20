---
artifact_id: "claude-hooks-instincts-adoption.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "claude-hooks-instincts-adoption"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: FEATURE
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
execution_roles: []
review_mode: self
verification_owner: ""
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
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "claude-hooks-instincts-adoption.s01.restate.md"
  - "claude-hooks-instincts-adoption.s02.business-goal.md"
  - "claude-hooks-instincts-adoption.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Tóm tắt acceptance criteria, edge case, DoR và governance checks cho readiness.

## Step Contract
```yaml
step_goal: ""
input_summary: []
output_summary: []
done_when: []
owner: ""
```

## Requirement Baseline
```yaml
status: APPROVED|BLOCKED|PARTIAL
approved_spec_refs: []
decision_notes: []
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE|APPROVED|BLOCKED|PARTIAL
api_contract_refs: []
ux_contract_refs: []
notes: []
```

## Existing System Baseline
```yaml
current_behavior_refs: []
impacted_surfaces: []
compatibility_constraints: []
rollback_constraints: []
```

## Artifact Chính
```yaml
acceptance_criteria: []
edge_cases: []
out_of_scope: []
done_when: []
behavioral_invariants: []
```

## Governance Checks
```yaml
checklist_applied: []
checks: []
blocking_items: []
owner: ""
next_action: ""
```

## Definition of Ready
```yaml
status: READY|BLOCKED|PARTIAL
blockers: []
owners: []
notes: []
```

## Traceability
```yaml
upstream: []
next_step: ""
```

## Handoff
- Criteria bắt buộc:
- Edge case phải giữ:
- Điều kiện sang step 5:
