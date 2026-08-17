---
artifact_id: "artifact-governance-enforcement.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "artifact-governance-enforcement"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: CHANGE
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
execution_roles: []
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "ba"
    - "developer"
  dor:
    - "po"
    - "ba"
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
  - "artifact-governance-enforcement.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> The rules are written and validated. Nothing checks them. This step states what business
> outcome enforcement buys, and what would count as buying it.

## Step Contract
```yaml
step_goal: "State the business outcome of enforcement in terms that can be measured after the fact, and name what enforcement must not cost."
input_summary:
  - "s01 restatement and its referenced rule set"
output_summary:
  - "User problem, business goal, measurable outcomes, non-goals"
done_when:
  - "Every objective has at least one outcome observable without reading the implementer's intent"
  - "Non-goals prevent the two ways enforcement usually fails: a check that blocks everyone, and a check that silently passes"
owner: "po"
```

## Artifact Chính
```yaml
# Findings and rules are referenced from s01, not restated. ownership-table.md Rule 0.
context_ref: "artifact-governance-enforcement.s01.restate.md#Artifact Chính"

user_problem: "The artifact-governance rules were validated against a real multi-role work item and needed no revision, but nothing in the runtime or the validator obeys them. Every multi-role run still emits a role contribution as its own file with a name that has no slot for the role, so file count still grows with the team and orphaned assignments are still possible. A rule nobody checks is the state docs/ was already in when this programme started."
business_goal: "Move artifact governance from a written rule to a property of the system, so that documentation volume stays a function of the work without anyone having to remember why."
user_value: "A contributor cannot accidentally produce the sprawl. The correct placement is the path of least resistance, and the incorrect one fails at validation time rather than at review time or never."

objectives:
  - id: "OBJ-1"
    objective: "A role contribution costs zero files."
    measure: "Running the multi-role sample through the changed generator produces the same file count for 2 roles as for 8."
  - id: "OBJ-2"
    objective: "A fact owned by one block cannot be restated in another without failing validation."
    measure: "The five duplications measured as F9 are rejected by wfc validate; a note with none of them passes."
  - id: "OBJ-3"
    objective: "A file in no declared layer fails validation."
    measure: "A fixture file placed outside the six declared roots is rejected; every currently valid artifact still passes."
  - id: "OBJ-4"
    objective: "No check weakens silently."
    measure: "Every field removed has a migrated reader and a test that failed before the migration and passes after."

success_outcome:
  - "File count for a multi-role work item is invariant under added roles, demonstrated by regenerating the sample"
  - "wfc validate rejects the F9 duplication set and accepts a deduplicated note"
  - "wfc validate rejects an unplaced file and accepts all 17 existing work items"
  - "Zero validator checks pass vacuously after the reader migration, evidenced by a red-then-green test per removed field"
  - "An escape hatch exists with a declared reason, so no team disables the check wholesale"

non_goals:
  - "Reducing the number of roles, skills, or perspectives that contribute"
  - "Reducing governance evidence, receipts, or gate coverage; deduplication moves a statement, never deletes the only copy"
  - "Making notes shorter as an end in itself - line count is not the measure, and cutting evidence would satisfy it dishonestly"
  - "Migrating docs/, the repository root, or changes/ - that is P4 and a separate work item"
  - "Fixing the three approval-path defects - separate work item, see s01 Handoff"
  - "Releasing or bumping a version"

priority_reason: "The rules were deliberately shipped unenforced so they could be tested against a real work item first. That test passed without revision, so the reason for deferring enforcement has expired. Meanwhile every multi-role run continues to produce the defect."

risks_business:
  - "A check strict enough to stop drift can block legitimate one-off artifacts, and a blocked team disables the check rather than arguing with it. This is the single most likely way this work item fails."
  - "A reader migrated incorrectly turns a governance check into a check that passes on everything, which is worse than the duplication it replaced because it looks green."
  - "Changing the emitted artifact shape breaks adopters already on v2.3.2, turning a housekeeping improvement into a compatibility incident."

metrics_candidate:
  - "Sample regeneration: file count identical at 2, 4 and 8 roles"
  - "F9 duplication set: 5 of 5 rejected"
  - "Existing artifacts: 17 of 17 work items still pass"
  - "Removed fields: 100 percent have a red-then-green test"
  - "Escape hatch: exists and requires a stated reason"

notes_for_next_step: "s03 must resolve whether enforcement binds adopter repositories, and whether legacy work items get dual-shape support or a migration. Both change the acceptance criteria materially."
```

## Traceability
```yaml
upstream:
  - "artifact-governance-enforcement.s01.restate.md#Artifact Chính"
  - "work-items/artifact-governance-model/artifact-governance-model.s08.verification.md#Definition of Done"
objective_links:
  - "OBJ-1 -> shard-axis rule, SKILL.md Rule 1"
  - "OBJ-2 -> ownership table, ownership-table.md"
  - "OBJ-3 -> placement contract, SKILL.md Rule 3"
  - "OBJ-4 -> reader-migration constraint, ownership-table.md"
next_step: "s03 Open Questions"
```

## Handoff
- Pinned problem: the rules hold but nothing enforces them, so the defect they describe keeps occurring.
- Four objectives, each with a measure that does not depend on reading intent.
- Non-goals name the two classic enforcement failures: a check that blocks everyone, and a check that passes vacuously.
- Condition to move to step 3: resolve the adopter-scope question and the legacy-shape question, both of which change acceptance criteria.
