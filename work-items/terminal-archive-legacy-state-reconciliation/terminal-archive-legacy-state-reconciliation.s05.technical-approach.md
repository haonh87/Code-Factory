---
artifact_id: "terminal-archive-legacy-state-reconciliation.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
step_id: "s05"
step_slug: "technical-approach"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "terminal-archive-legacy-state-reconciliation.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.

## Step Contract
```yaml
step_goal: ""
input_summary: []
output_summary: []
done_when: []
owner: ""
```

## Option Analysis
```yaml
options: []
recommended_option: ""
trade_offs: []
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE|APPROVED|BLOCKED|PARTIAL
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes: []
```

## Artifact Chính
```yaml
recommended_approach: ""
why: ""
boundaries: []
risk_notes: []
```

## Architecture Details
```yaml
domain_boundaries: []
integration_points: []
data_or_runtime_notes: []
```

## Brownfield Impact Analysis
```yaml
impacted_modules: []
compatibility_risks: []
migration_notes: []
rollback_notes: []
```

## Traceability
```yaml
upstream: []
next_step: ""
```

## Handoff
- Recommended option:
- Trade-off chấp nhận:
- Điều kiện sang step 6:
- Deployment note khi có:
