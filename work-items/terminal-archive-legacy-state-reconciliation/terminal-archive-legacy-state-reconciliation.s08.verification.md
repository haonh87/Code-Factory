---
artifact_id: "terminal-archive-legacy-state-reconciliation.s08.verification"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
step_id: "s08"
step_slug: "verification"
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "terminal-archive-legacy-state-reconciliation.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Tóm tắt kết quả verify, governance compliance, residual risk và kết luận DoD.

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
verification_scope: []
evidence_refs: []
summary_verdict: PASS|FAIL|PARTIAL
```

## Governance Checks
```yaml
checklist_applied: []
checks: []
blocking_items: []
owner: ""
next_action: ""
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS|FAIL|PARTIAL
compatibility_status: PASS|FAIL|PARTIAL
breaking_changes: []
rollback_readiness: READY|BLOCKED|PARTIAL
```

## Scan Summary
```yaml
status: PASS|FAIL|PARTIAL
notes: []
```

## UAT Summary
```yaml
status: NOT_APPLICABLE|PASS|FAIL|PARTIAL
reviewers: []
notes: []
```

## Release Summary
```yaml
status: NOT_APPLICABLE|PASS|FAIL|PARTIAL
reviewers: []
notes: []
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE|PASS|FAIL|PARTIAL
reviewers: []
notes: []
```

## Audit
```yaml
audit_status: PASS|FAIL|PARTIAL
notes: []
```

## Definition of Done
```yaml
status: DONE|BLOCKED|PARTIAL
residual_risks: []
owners: []
```

## Traceability
```yaml
upstream: []
next_step: ""
```

## Handoff
- Overall status:
- Residual risks:
- Recommendation:
- Release recommendation khi có:
- Next action:
