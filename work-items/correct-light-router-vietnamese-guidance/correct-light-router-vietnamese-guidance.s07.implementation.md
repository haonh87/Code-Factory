---
artifact_id: "correct-light-router-vietnamese-guidance.s07.implementation"
artifact_family: workflow-step
work_item_slug: "correct-light-router-vietnamese-guidance"
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-light-router-vietnamese-guidance.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Implementation and verification are NOT_STARTED. The user accepted the authoring packet; trusted receipts and CLI activation are still required. This draft host records no delivery approval.

## Step Contract

```yaml
step: "s07"
step_goal: "Implement the approved plan and record evidence after activation."
value: "Remove incorrect Light next-action guidance without changing approval authority."
input_summary:
  - "correct-light-router-vietnamese-guidance.s06.task-breakdown.md"
output_summary:
  - "Actual changes, RED/GREEN evidence and ordered review."
done_when:
  - "Human authoring approval is recorded; trusted sealing and activation remain required before execution."
owner: "developer"
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
execution_status: "NOT_STARTED"
implemented_changes: []
doc_changes:
  - "Only the child authoring packet has been prepared; source/test edits have not begun."
operational_notes:
  - "Protocol remains MATERIALIZED/s01 and grants are empty."
```

## Delivery Rule Evidence

Implementation evidence is not yet available. T2 requires the fail-first cycle before source corrections; no TDD completion or exception is claimed. The existing isolated worktree is `.claude/worktrees/correct-light-router-vietnamese-guidance` on `fix/light-router-vietnamese-guidance`. Review is NOT_RUN, delegation is not enabled, and the child must remain open. Populate the finalized delivery evidence schema with actual results only after T1 activation.

## Implementation Notes

```yaml
framework_notes:
  - "No framework change."
known_limitations:
  - "s07 is an eagerly generated full-profile draft host; its existence does not indicate execution."
```

## Traceability

```yaml
upstream:
  - "correct-light-router-vietnamese-guidance.s06.task-breakdown.md"
next_step: "s08"
```

## Handoff

The human accepted the authoring packet. Implementation is NOT_STARTED pending trusted signing and activation. No implementation review, verification result or DoD is claimed.
