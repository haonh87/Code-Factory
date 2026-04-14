---
artifact_id: "sample-workflow-item.s08.verification"
artifact_family: workflow-step
work_item_slug: "sample-workflow-item"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: FEATURE
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
execution_mode: agentic
execution_roles: []
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance: []
  dod: []
content_skills:
  - "codex-workflow-chain"
  - "testing"
  - "code-scan-review"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-workflow-item.s07.implementation.md"
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

## Scan Summary
```yaml
status: PASS|FAIL|PARTIAL
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
