---
artifact_id: "terminal-archive-legacy-state-reconciliation.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "terminal-archive-legacy-state-reconciliation.s01.restate.md"
  - "terminal-archive-legacy-state-reconciliation.s02.business-goal.md"
  - "terminal-archive-legacy-state-reconciliation.s03.open-questions.md"
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
