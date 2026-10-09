---
artifact_id: "correct-light-router-vietnamese-guidance.s08.verification"
artifact_family: workflow-step
work_item_slug: "correct-light-router-vietnamese-guidance"
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
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "developer"
  - "qc"
  - "ba"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-light-router-vietnamese-guidance.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Implementation and verification are NOT_STARTED. The user accepted the authoring packet; trusted receipts and CLI activation are still required. This draft host records no delivery approval.

## Step Contract

```yaml
step: "s08"
step_goal: "Verify every criterion and obtain an independent human DoD."
value: "Remove incorrect Light next-action guidance without changing approval authority."
input_summary:
  - "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md"
  - "correct-light-router-vietnamese-guidance.s07.implementation.md"
output_summary:
  - "Actual AC coverage, bounded language review, compatibility and human verdict."
done_when:
  - "Human authoring approval is recorded; trusted sealing and activation remain required before execution."
owner: "qc"
constraints:
  - "English authoring; preserve Vietnamese source accents."
  - "No source or test edits before independent child activation."
  - "No parent approval or previous child receipt substitutes for this child."
risks:
  - "Content approval can be confused with runtime authority; retain the separate trusted receipt and activation requirements."
timebox:
  target_duration: "One authoring pass, then one bounded implementation/review pass after gates."
  deadline: "No external deadline."
  escalation_rule: "Stop and refresh scope/approval if the two source sections cannot satisfy the criteria."
```

## Main Artifact

```yaml
verification_scope:
  - "AC-LR-001..005 after implementation."
evidence_refs: []
summary_verdict: "PARTIAL"
execution_status: "NOT_STARTED"
```

## Governance Checks

```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks: []
blocking_items:
  - "No implementation/technical evidence, human BA language assessment or human QC DoD yet."
owner: "qc"
next_action: "Wait for trusted sealing/activation of the accepted plan and actual s07 evidence."
```

## Regression & Compatibility Summary

```yaml
regression_status: "PARTIAL"
compatibility_status: "PARTIAL"
breaking_changes: []
rollback_readiness: "PARTIAL"
notes:
  - "NOT_RUN; no delivery delta exists yet. Proposed rollback is in s05/s06."
```

## Scan Summary

```yaml
status: "PARTIAL"
notes:
  - "NOT_RUN. Disclose actual tools and limitations when implementation is verified."
```

## UAT Summary

```yaml
status: "NOT_APPLICABLE"
reviewers: []
notes:
  - "No user-facing application flow changes."
```

## Release Summary

```yaml
status: "NOT_APPLICABLE"
reviewers: []
notes:
  - "No publication, installation or version change."
```

## Business Acceptance Summary

```yaml
status: "NOT_APPLICABLE"
reviewers: []
notes:
  - "Bounded maintenance; BA language review is required by AC-LR-005, not a business acceptance gate."
```

## Audit

```yaml
audit_status: "PARTIAL"
notes:
  - "NOT_RUN: draft host only. No AC or M7 score is passed."
```

## Definition of Done

```yaml
status: "BLOCKED"
residual_risks:
  - "All source corrections and verification remain pending."
owners:
  - "qc"
```

## Traceability

```yaml
upstream:
  - "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md"
  - "correct-light-router-vietnamese-guidance.s07.implementation.md"
next_step: "Human QC DoD and normal CLI close"
```

## Handoff

The child is not DONE. No branch/worktree finish decision is open; parent M7 remains FAIL and release 2.6.3 remains settled.
