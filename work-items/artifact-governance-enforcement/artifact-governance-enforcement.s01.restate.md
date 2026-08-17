---
artifact_id: "artifact-governance-enforcement.s01.restate"
artifact_family: workflow-step
work_item_slug: "artifact-governance-enforcement"
step_id: "s01"
step_slug: "restate"
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
execution_roles:
  - "ba"
  - "developer"
  - "qc"
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
  - "requirement-analysis"
  - "artifact-governance"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "work-items/artifact-governance-model/artifact-governance-model.s08.verification.md"
linked_artifacts:
  - "skills/guardrails/artifact-governance/SKILL.md"
  - "skills/guardrails/artifact-governance/references/ownership-table.md"
  - "skills/guardrails/artifact-governance/references/worked-example.md"
tags:
  - "agent-ops"
  - "workflow/s01"
  - "artifact-governance"
---

# Step 1 - Clarify

> [!summary]
> The artifact-governance rules exist and are validated but nothing enforces them. This work
> item makes the runtime obey them: role contributions become sections, the readers that
> depend on the old shape are migrated, and the validator starts failing on violations.

## Step Contract
```yaml
step_goal: "Restate the enforcement scope, lock the escalation and sequencing constraints, and record what must not start before the colliding work item closes."
input_summary:
  - "artifact-governance-model, DONE with 5 of 5 gates sealed"
  - "The rule set produced by that work item"
  - "The phase plan P2 to P4 it deferred"
output_summary:
  - "Restated request and scope for P2 and P3"
  - "Light-ineligibility verdict with the trigger named"
  - "The write-root collision with stabilize-architecture-skill-bundle"
  - "Numbered assumptions, rejectable at the gate"
done_when:
  - "The escalation trigger is named, not assumed"
  - "The collision is stated with the specific paths"
  - "Nothing in this note opens the implementation path"
owner: "ba"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Spec/design before code"
  - "TDD for behavior change"
  - "Worktree for large or risky changes"
  - "Brownfield baseline and delta discipline"
  - "AI proposes, human approves"
required_reviews:
  - "Spec at s04"
  - "Contract at s04 - the artifact shape is a contract for bundle adopters"
  - "DoR at s04"
  - "Approach at s05"
  - "Task Plan at s06"
prohibited_actions:
  - "Touching packages/workflow-bundle before the Approach and Task Plan receipts"
  - "Touching packages/workflow-bundle while stabilize-architecture-skill-bundle holds an overlapping write root - see collision below"
  - "Removing any field before its readers are migrated in the same change"
open_governance_questions:
  - "Does changing the generated artifact shape require a governance-exception for adopters already on v2.3.2, or is a major-version bump sufficient?"
  - "Should governance_profile escalate to strict once the change is packaged for release?"
```

## Artifact Chính
```yaml
raw_request: "làm tiếp"
restated_request: "Make the runtime enforce the artifact-governance rules that artifact-governance-model produced: a role's contribution becomes a section in the step's primary note rather than its own file, the readers that parse the old per-role artifacts are migrated to the new location, and wfc validate begins failing on duplication and placement violations."
request_type: CHANGE
user_problem_initial: "P1 produced rules that are correct and validated but unenforced. A rule nobody checks is the state docs/ was already in, and the file multiplication it describes continues to happen on every multi-role run."
business_context_initial: "Continuation of artifact-governance-model, which closed DONE with all five gates sealed. That work item deliberately deferred enforcement so the rules could be tested against a real work item first; the test passed without revision, so enforcement is now the next correct step."

# Applying the rule this programme exists to establish: the measured findings are NOT
# restated here. They are referenced. See ownership-table.md Rule 0.
upstream_findings_ref: "work-items/artifact-governance-model/artifact-governance-model.s01.restate.md#Artifact Chính"
rule_set_ref: "skills/guardrails/artifact-governance/SKILL.md"
ownership_table_ref: "skills/guardrails/artifact-governance/references/ownership-table.md"
worked_example_ref: "skills/guardrails/artifact-governance/references/worked-example.md"
phase_plan_ref: "work-items/artifact-governance-model/artifact-governance-model.s01.restate.md#Artifact Chính"

sdd_light_eligibility:
  requested: "light, to match the preceding work item"
  verdict: NOT_ELIGIBLE
  escalation_trigger: "Touches a public contract. workflow-bundle v2.3.2 is published for adoption, and changing what workflow-execution-definitions.js emits changes the artifact shape that adopters' repositories and validators depend on."
  consequence: "planning_track=full, sdd_mode=none, eight physical notes, approval_gates.contract=required."
  note: "A hard escalation trigger overrides a preset request. Recorded rather than silently downgraded, and noted as an irony worth stating plainly: the work item that reduces file count runs on eight notes because the escalation rules say so."

scope_draft:
  in:
    p2_runtime:
      - "Make '## Role Outputs' a required block where role contributions land, per the shard-axis rule"
      - "Change workflow-execution-definitions.js so execution-policy, worker-assignment, worker-handoff-report and merge-report content is emitted as sections, with plural schemas assignments[] and handoffs[]"
      - "Migrate the readers in validate-workflow-execution.js from the per-role artifact to the owning section, test failing first"
      - "Register the role-indexed filename form as the declared escape hatch for a genuinely concurrent topology"
    p3_validator:
      - "Add a duplication check for the fields the ownership table assigns an owner"
      - "Add a placement check so a file in no declared layer fails validation"
      - "Add a reference resolver per the specification in ownership-table.md"
    carried_from_p1:
      - "Register skills/guardrails/artifact-governance into the bundle inventory"
      - "Add the SKILL.vi.md sibling, house convention in 7 of 8 guardrail skills"
      - "Remove affected_boundary.created from artifact-governance-model s06, which the ownership table marks derivable"
  out:
    - "P4 placement migration of docs/, the repository root and changes/ - separate work item, and it overlaps stabilize-architecture-skill-bundle write roots"
    - "The three approval-path defects TD-01, TD-02 and tooling_gap_found_3 - separate work item, see recommendation below"
    - "Migrating existing work items to the new artifact shape - backward compatibility is a design question for s05, not an assumed deliverable"
    - "Any release or version bump"

collision:
  work_item: "stabilize-architecture-skill-bundle"
  state: "ACTIVE at s07, four authoring gates sealed, dod MISSING"
  granted_write_paths:
    - ".claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0"
    - "work-items/stabilize-architecture-skill-bundle"
    - "changes/CHANGE-002"
  overlapping_scope: "Its declared lanes include the permission lane, the evidence lane which contains workflow-gate-evidence-utils.js, the generated runtime under packages/workflow-bundle/runtime, and the release lane covering manifests and public docs. P2 and P3 write to packages/workflow-bundle and regenerate runtime, so the two overlap on the same package and the same test suite."
  consequence: "s07 of this work item must not open until stabilize-architecture-skill-bundle closes DoD, OR this work item runs in its own worktree with an explicit merge plan."
  resolution_owner: "human"
  note: "Planning through s06 has zero overlap - it writes only to this work item's own directory. That is why this note exists now rather than waiting."

assumptions_initial:
  - id: "A1"
    assumption: "No CHANGE package is opened."
    taken_because: "There is no frozen spec to delta, and a CHANGE package adds seven files carrying layers work-items/ already owns - the exact duplication the new ownership table names as F6. Opening one would contradict the rule this work item enforces."
    reject_if: "The repository requires a CHANGE package for any published-contract change regardless of spec state."
  - id: "A2"
    assumption: "P2 and P3 belong in one work item."
    taken_because: "They touch the same files and the same test suite, and a validator check written apart from the shape it checks would be authored against a moving target."
    reject_if: "The human wants the shape change released and observed before any check hardens around it."
  - id: "A3"
    assumption: "A worktree will be required."
    taken_because: "planning_track=full, more than one boundary, an overlapping active work item, and a reader migration with silent-failure risk. The worktree rule fires on every one of those."
    reject_if: "stabilize-architecture-skill-bundle closes DoD before s07 opens, which removes the conflict reason but not the multi-boundary one."
  - id: "A4"
    assumption: "Backward compatibility for work items already written in the old shape is in scope for s05 to decide, not assumed either way."
    taken_because: "Sixteen legacy work items and one multi-role sample exist. Whether the new readers accept both shapes, migrate on read, or require a one-off migration is a design decision with real cost, and guessing it here would prejudge s05."
    reject_if: "The human wants a clean break with an explicit migration step and no dual-shape support."

open_questions_initial:
  - id: "Q1"
    question: "Does the enforcement apply to an adopting project's repository, or only to Code-Factory? Carried over unresolved from P1 as ODC-001."
    blocks: "s04 acceptance criteria and the scope of the placement check"
  - id: "Q2"
    question: "Dual-shape support, migrate-on-read, or a one-off migration for the sixteen legacy work items?"
    blocks: "s05 approach"
  - id: "Q3"
    question: "Does the placement check need an escape hatch with a declared reason, and who may grant it?"
    blocks: "s05, and it is the mitigation for the risk that a strict check gets disabled wholesale"
  - id: "Q4"
    question: "Should the approval-path defect work item be sequenced before this one?"
    blocks: "nothing here, but see the recommendation in Handoff"

dependencies_initial:
  - "stabilize-architecture-skill-bundle closing DoD, for s07 onward"
  - "The rule set under skills/guardrails/artifact-governance/, which is authored but unregistered"
  - "validate-workflow-execution.js and its test suite"

risks_initial:
  - id: "S01-R01"
    description: "Removing a field whose only reader is a validator produces a check that silently passes on everything rather than a loud failure."
    severity: HIGH
    mitigation: "The constraint is already written in ownership-table.md: grep every reader before removal, migrate in the same change, test failing first. This work item inherits it rather than rediscovering it."
  - id: "S01-R02"
    description: "A placement or duplication check strict enough to stop drift also blocks legitimate one-off artifacts, and users disable it wholesale."
    severity: HIGH
    mitigation: "Q3. Design an escape hatch with a declared reason, not an all-or-nothing rule."
  - id: "S01-R03"
    description: "Changing the emitted artifact shape breaks adopters on v2.3.2."
    severity: MEDIUM
    mitigation: "approval_gates.contract=required. s05 must state the compatibility position and the version implication."
  - id: "S01-R04"
    description: "Concurrent work in packages/workflow-bundle with an active work item causes merge loss or a broken test suite for both."
    severity: HIGH
    mitigation: "Do not open s07 until the collision is resolved, by DoD closure or by worktree with a merge plan."
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: coordinator
request_source: "legacy-scaffold"
raw_request_summary: "Enforce the artifact-governance rules in the runtime and the validator."
split_decision: single
dedup_result: no_conflict
delivery_context: brownfield
work_item_slug: "artifact-governance-enforcement"
work_item_type: CHANGE
change_strategy: none
change_id: ""
decision_reason:
  - "No change package, per assumption A1: there is no frozen spec to delta, and a CHANGE package would add seven files carrying layers work-items/ already owns."
existing_refs:
  - "work-items/artifact-governance-model"
  - "work-items/stabilize-architecture-skill-bundle"
blockers:
  - "s07 blocked by the write-root collision recorded in Artifact Chính"
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
```

## Work Item Protocol
```yaml
protocol_status: ACTIVE
approval_status: APPROVED
review_required: true
work_item_slug: "artifact-governance-enforcement"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/artifact-governance-enforcement"
current_step: "s07"
granted_write_paths:
  - ".claude/worktrees/artifact-governance-enforcement"
  - "work-items/artifact-governance-enforcement"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "coordinator"
protocol_owner: "ba"
reviewed_by: "ba"
reviewed_at: "2026-08-17T06:19:40.081Z"
handoff_target: "step-s07-owner"
last_transition_action: "activate"
last_transition_at: "2026-08-17T07:17:31.324Z"
required_actions:
  - "Continue active execution from step 7 onward."
blockers: []
review_notes:
  - "Human review approved."
refs:
  - "work-items/artifact-governance-enforcement"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "WORK_ITEM_ACTIVATED"
```

## Requirement Analysis Spec
```yaml
request_type: CHANGE
functional_intent:
  - id: "FI-1"
    intent: "A role contributing to a step adds a section, and the number of files does not change."
    current_behaviour: "A role contribution is emitted as its own file with a fixed name that has no slot for the role, so more than one role is unrepresentable."
    evidence_ref: "skills/guardrails/artifact-governance/references/worked-example.md#2"
  - id: "FI-2"
    intent: "A validator rejects a note that restates a fact owned by another block."
    current_behaviour: "No check exists. The measured duplication survives validation today."
  - id: "FI-3"
    intent: "A validator rejects a file placed in no declared layer."
    current_behaviour: "No check exists."
  - id: "FI-4"
    intent: "Readers resolve a reference to its owning block."
    current_behaviour: "No resolver exists; the syntax is specified but unimplemented."
non_functional_intent:
  - "No silent validator weakening: every field removal is accompanied by a migrated reader and a test that failed first"
  - "An escape hatch exists so the check is not disabled wholesale"
out_of_intent:
  - "Reducing governance evidence or gate coverage"
  - "Changing what any role analyses; only where its output lands"
traceability_note: "Findings F1 to F13 and the phase plan are referenced above, not restated. This note is the first artifact authored under the new rules, and applying them to itself is the cheapest available test of whether they are livable."
```

## Traceability
```yaml
source_inputs:
  - "work-items/artifact-governance-model/artifact-governance-model.s08.verification.md#Definition of Done"
  - "skills/guardrails/artifact-governance/SKILL.md"
  - "skills/guardrails/artifact-governance/references/ownership-table.md#Constraint inherited by P2"
next_step: "s02 Business Goal"
```

## Handoff
- Established: the rule set exists, was validated against a real work item without revision, and is unenforced. Enforcement is the next correct step.
- Established: Light is **not** eligible. The trigger is a public-contract change, named rather than inferred. Eight notes, `approval_gates.contract=required`.
- Established: `s07` is blocked by a write-root collision with `stabilize-architecture-skill-bundle`, which is `ACTIVE` at `s07` with `dod` still `MISSING`. Planning through `s06` has zero overlap, which is why it proceeds now.
- Recommendation, and it changes sequencing: **fix the approval path first.** `TD-01`, `TD-02` and `tooling_gap_found_3` cost six failed command rounds on the preceding work item, and every future work item pays the same toll — including this one. That work item is small, touches a different area of the package, and pays for itself immediately.
- Condition to move to `s02`: the human confirms the P2 plus P3 scope boundary and either accepts or rejects `A2` and `A4`.
