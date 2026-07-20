---
artifact_id: "sdd-light-authority-cutover.s08.verification"
artifact_family: workflow-step
work_item_slug: "sdd-light-authority-cutover"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sdd-light-authority-cutover.s07.implementation.md"
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
