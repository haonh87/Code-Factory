---
artifact_id: "correct-light-router-vietnamese-guidance.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "correct-light-router-vietnamese-guidance"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
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
spec_status: draft
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-light-router-vietnamese-guidance.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Draft authoring packet. Human gates are pending; source implementation has not started.

## Step Contract

```yaml
step: "s02"
step_goal: "Define the value and success boundary of the VI mapping correction."
value: "Remove incorrect Light next-action guidance without changing approval authority."
input_summary:
  - "correct-light-router-vietnamese-guidance.s01.restate.md"
output_summary:
  - "Bounded user value and measurable outcomes."
done_when:
  - "Outputs are concrete and reviewable; required human gates remain pending until explicit review and trusted sealing."
owner: "ba"
constraints:
  - "English authoring; preserve Vietnamese source accents."
  - "No source or test edits before independent child activation."
  - "No parent approval or previous child receipt substitutes for this child."
risks:
  - "Draft completeness can be confused with gate approval; retain separate status and empty review metadata."
timebox:
  target_duration: "One authoring pass, then one bounded implementation/review pass after gates."
  deadline: "No external deadline."
  escalation_rule: "Stop and refresh scope/approval if the two source sections cannot satisfy the criteria."
```

## Main Artifact

```yaml
business_goal: "A reader using the VI router can choose the correct Light host and next human action without an invented s05 blocker or lost required approval."
primary_users:
  - "Maintainer and agent reading Vietnamese workflow guidance."
expected_value:
  - "Reduce false waiting for a nonexistent Light physical note while retaining all required approvals."
success_metrics:
  - "AC-LR-001..005 in s04 are satisfied."
  - "Two EN/VI reading scopes meet the inherited five-dimension thresholds with no critical authority/action error."
non_goals:
  - "No measured latency/productivity claim."
  - "No whole-M7 acceptance or release/global bundle update."
business_rules:
  - "All eight logical steps remain."
  - "Shared physical hosting never combines approval authority or makes a draft a pass."
assumptions:
  - "A bounded static test guards known wording; human reading remains necessary for semantic quality."
```

## Traceability

```yaml
upstream:
  - "correct-light-router-vietnamese-guidance.s01.restate.md"
next_step: "s03"
```

## Handoff

s04 owns the measurable acceptance criteria; this note does not duplicate their contract. No business acceptance gate is required for this maintenance change.
