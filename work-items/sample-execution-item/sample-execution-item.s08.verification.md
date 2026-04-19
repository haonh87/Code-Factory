---
artifact_id: "sample-execution-item.s08.verification"
artifact_family: workflow-step
work_item_slug: "sample-execution-item"
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
execution_mode: multi_agent
execution_roles:
  - "coordinator"
  - "tester"
  - "auditor"
review_mode: independent
verification_owner: "auditor"
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-execution-item.s07.implementation.md"
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
step_goal: "Kiểm execution output, evidence và residual risk bằng review owner độc lập."
input_summary:
  - "implementation note đã merge"
  - "worker handoff report"
  - "merge report"
output_summary:
  - "verification verdict"
  - "DoD recommendation"
done_when:
  - "review_mode independent có evidence rõ"
  - "DoD verdict kết luận được"
owner: "auditor"
```

## Artifact Chính
```yaml
verification_scope:
  - "callback boundary"
  - "frontend login state"
  - "merge readiness"
evidence_refs:
  - "sample-execution-item.s07.worker-handoff-report.md"
  - "sample-execution-item.s07.merge-report.md"
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "review owner độc lập với builder chính"
  - "source of truth vẫn nằm ở primary step note"
blocking_items: []
owner: "auditor"
next_action: "kết luận DoD cho sample execution runtime"
```

## Review Mode
```yaml
review_mode: independent
verification_owner: "auditor"
expected_outputs:
  - "verification verdict"
  - "audit note"
fallback_mode: auto_fix_loop
```

## Scan Summary
```yaml
status: PASS
notes:
  - "sample này không có code scan thật; review tập trung vào runtime contract"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "execution artifacts đủ để trace coordinator, worker và merge path"
```

## Definition of Done
```yaml
status: DONE
residual_risks:
  - "sample chưa có runner orchestration thật"
owners:
  - "coordinator"
  - "auditor"
```

## Traceability
```yaml
upstream:
  - "sample-execution-item.s07.implementation.md"
  - "sample-execution-item.s07.worker-handoff-report.md"
  - "sample-execution-item.s07.merge-report.md"
next_step: ""
```

## Handoff
- Overall status: PASS, execution runtime baseline đủ để làm canonical sample cho phase 3.
- Residual risks: chưa có runner orchestration end-to-end.
- Recommendation: dùng sample này làm chuẩn cho multi_agent artifact contract.
- Release recommendation khi có: không áp dụng.
- Next action: rollout phase 4 sau khi phase 3 được review.
