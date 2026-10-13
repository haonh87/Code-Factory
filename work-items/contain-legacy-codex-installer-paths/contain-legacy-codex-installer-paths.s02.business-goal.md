---
artifact_id: "contain-legacy-codex-installer-paths.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "contain-legacy-codex-installer-paths"
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
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
  card: "product-specs/cards/contain-legacy-codex-installer-paths.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance:
    - "po"
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
  - "contain-legacy-codex-installer-paths.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 — Business Goal

> [!summary]
> Prevent unintended installer data loss while preserving ordinary direct installation.

## Step Contract

```yaml
step: "s02"
step_goal: "Make the preservation outcome measurable."
input_summary:
  - "Accepted parent containment scope and three verified Maintainer admission dispositions."
  - "Existing scripts at main 5a81126; spec card and named environment gaps."
output_summary:
  - "Concrete draft artifact with owner, evidence and remaining gates."
done_when:
  - "The draft is reviewable and its missing inputs are explicit; this does not mean the human gate passed."
owner: "po"
constraints:
  - "No production/test implementation, installer execution or signing by the agent."
timebox: "One authoring pass; unresolved external verification input remains explicit."
```

## Main Artifact

```yaml
restated_request: "Bound direct installer mutation to validated managed destinations."
user_problem: "An installer cleanup can act on a path derived from malformed previous state."
business_goal: "Users can update managed skills without losing unrelated data."
user_value: "Invalid input is rejected before installation changes the target."
success_outcome:
  - "Zero changed outside/unmanaged sentinel bytes for all rejection cases."
  - "Valid supported install and stale cleanup cases pass on both platform families."
non_goals:
  - "product-specs/cards/contain-legacy-codex-installer-paths.md#Scope"
priority_reason: "P-INSTALL is the parent P0 corrective intake because cleanup can delete local data."
risks_business:
  - "Fail-closed alias/name policy can reject unusual existing setups; report a clear failure rather than silently altering their state."
metrics_candidate:
  - "100% enumerated rejection cases preserve full destination snapshots."
  - "100% required positive cases pass on supported engines; zero hidden platform skips."
notes_for_next_step: "Resolve environment/isolation dependencies without widening into release or central installer redesign."
```

## Traceability

```yaml
spec_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md"
next_step: "s03"
```

## Handoff

Draft authoring only. The work item remains MATERIALIZED/s01 with no implementation grants. Close the named readiness gaps and request the applicable human review; no gate is self-approved.
