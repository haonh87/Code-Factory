---
artifact_id: "capability-grant-reconciliation.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "capability-grant-reconciliation"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
execution_roles:
  - "ba"
  - "developer"
  - "qc"
review_mode: independent
verification_owner: "qc"
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "capability-grant-reconciliation.s01.restate.md"
  - "capability-grant-reconciliation.s02.business-goal.md"
  - "capability-grant-reconciliation.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> OQ-06 is closed: the two work items stay separate and the dependency reverses.
> `capability-grant-granularity` goes first. The reason is that reconciliation alone can be
> satisfied by widening the very scope it checks - a work item that declares
> `packages/workflow-bundle` wholesale reports zero uncovered files and passes vacuously - while
> granularity is enforceable at declaration time by a validator that only has to look at the shape
> of a path. A control that can be satisfied by enlarging its own scope is not a control.

## Step Contract
```yaml
step_goal: "Close OQ-06 and CONF-01, decide the two questions that shape acceptance, and lock criteria for a work item that now runs second rather than first."
input_summary:
  - "s03 bimodal measurement over five work items"
  - "s03 CONF-01 and OQ-06"
output_summary: ["Resolutions", "Acceptance criteria", "DoR verdict"]
done_when: ["The dependency direction is decided with a stated reason", "No question that shapes acceptance is left open"]
owner: "ba"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs: []
decision_notes:
  - "No Spec Card yet. Requirements are carried from s01 and s02 and are unchanged by the reversal; only the order of delivery changed, not what this work item must do."
```

## Contract Baseline
```yaml
status: PROPOSED
api_contract_refs: []
data_contract_refs:
  - "granted_write_paths in .work-item-report.json - meaning changes from intention to reconciled constraint"
  - "branch-to-work-item association - a new persisted relation, shape decided at s05"
  - "reconciliation outcome per uncovered file - a new persisted record"
notes:
  - "The outcome record is the part that must not be weak. An outcome of disowned with no reason recreates the field's current meaninglessness by a different route."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "Five work items measured 2026-09-12 via merge-commit reconstruction"
measurements:
  covered_fully: ["trusted-receipt-namespace-resolution 4/4", "worktree-and-closure-integrity 10/10"]
  uncovered: ["adaptive-governance-human-approval-ux 45 of 111", "artifact-governance-enforcement 52 of 57", "approval-path-defects 7 of 7"]
  distribution: "Bimodal. Both fully covered work items enumerated files; both worst declared directories only."
compatibility_constraints:
  - "Every open branch violates any enforcement written today. Grandfathering is required, shape decided at s05."
  - "Reconciliation must run before merge. A merged branch has no diff against main regardless of whether its ref survives."
rollback_constraints:
  - "Reverting the code restores the previous meaning of the field. Outcome records already written become orphaned but harmless."
```

## Artifact Chính
```yaml
resolutions:
  - id: OQ-06
    question: "Merge granularity back in, or keep separate with a bidirectional dependency?"
    decision: "Keep separate. Reverse the dependency: capability-grant-granularity runs first and this work item depends on it."
    reason: >-
      Reconciliation alone is defeatable. A grant naming a whole package makes every file covered
      and the check passes vacuously, so the cheapest response to a failing reconciliation is a
      wider grant. Granularity alone is harmless rather than counterproductive - narrower grants
      that nothing checks change no behaviour - and it is enforceable at declaration time, because
      a validator can see the shape of a path without any diff. Sequencing therefore runs
      granularity first. Merging them was rejected because the acute problem in this repository is
      one work item large enough to block everything, and creating a second one repeats it.
    supersedes: "s02 of both work items, which state the dependency in the opposite direction"
  - id: CONF-01
    conflict: "s02 states granularity depends on this work item; the bimodal finding suggested the reverse."
    resolution: "Confirmed reversed. Both s02 notes are amended rather than left contradicting this step."
  - id: OQ-02
    question: "Is an uncovered file a failure or a finding?"
    decision: "Neither. It is a finding that does not block the build, and an undispositioned finding blocks DoD."
    reason: >-
      A build failure applied to artifact-governance-enforcement would have blocked a work item over
      52 files on the day the rule shipped, which guarantees the rule is switched off. A finding with
      no consequence is R2 from s02 - noise nobody reads. Binding it to DoD uses a gate that already
      exists, keeps the work moving, and makes the disposition a condition of closing rather than of
      committing.
  - id: OQ-03
    question: "What covers a genuinely shared file such as package.json?"
    decision: "Nothing special. Every work item that touches it declares it."
    reason: >-
      package.json is one line in a grant. An exemption list would create a hole precisely where
      cross-work-item collision is most likely, and the measurement found package.json modified with
      no covering grant - exactly the case worth catching. If the same file appears in two grants on
      one branch, that is information, not an error.
  - id: OQ-04
    question: "Where does reconciliation run?"
    decision: "Before merge. Merge-time is removed as an option."
    reason: "Carried from s03. A merged branch has no diff against main. The remaining candidates - close, continuous, CI on the open branch - are an s05 choice."
  - id: OQ-05
    question: "How are grandfathered branches marked and does the marking expire?"
    decision: DEFERRED_TO_S05
    reason: "An implementation choice that does not change what the work item must achieve."

acceptance_criteria:
  - id: AC-01
    description: "For a work item on an open branch, the system reports every file the branch changed that the union of the branch's work-item grants does not cover, naming the files."
    measurable: true
    baseline: "No such report. The 13 uncovered files on the current parent branch were found by an outside reviewer running a script by hand."
  - id: AC-02
    description: "Every uncovered file carries a recorded disposition - grant amended, exception raised, or explicitly disowned with a reason. An undispositioned uncovered file blocks DoD and does not block anything earlier."
    measurable: true
  - id: AC-03
    description: "Reconciliation resolves against the union of grants of every work item the branch carries. A branch carrying five work items is checked against five grants."
    measurable: true
    note: "Requires the branch-to-work-item association. This is the substantive engineering."
  - id: AC-04
    description: "Reconciliation runs while the branch is unmerged, and a work item cannot reach DoD without a reconciliation recorded against an unmerged state."
    measurable: true
  - id: AC-05
    description: "Reproduced against history: running reconciliation over the five measured work items reproduces the recorded counts - 0, 0, 45, 52 and 7 uncovered."
    measurable: true
    note: "This is the regression fixture. It also proves the tool sees what the manual analysis saw, rather than a different thing that happens to produce a number."
  - id: AC-06
    description: "The share of uncovered files disposed as disowned is reported alongside the count, so M-04 from s02 is observable rather than reconstructed."
    measurable: true

edge_cases:
  - "A file in two grants on one branch. Information, not an error, per OQ-03."
  - "A branch carrying a work item plus unrelated drive-by edits, which is the current state of main."
  - "A work item whose branch back-merged main, where the naive diff undercounts. AC-05 includes two such branches."
  - "A branch with no work item at all."

out_of_scope:
  - "Grant granularity, which now runs first"
  - "Filesystem enforcement"
  - "Forcing one work item per branch"
  - "Retroactive disposition of already-merged work items"

behavioral_invariants:
  - "Reconciliation never blocks a commit or a gate earlier than DoD"
  - "Widening a grant to silence reconciliation remains possible; granularity is what makes it visible, which is why it runs first"
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "Brownfield baseline recorded with five measurements - PASS"
  - "Smallest correct option - DEFERRED to s05"
  - "Dependency direction decided with a stated reason rather than by preference - PASS"
  - "Both superseded s02 notes amended in the same change - PASS"
blocking_items: []
owner: "ba"
next_action: "Write a Spec Card, then seal Spec, Contract and DoR"
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners: ["ba", "qc"]
notes:
  - "Runs second. capability-grant-granularity AC-04 and AC-07 land first; both are enforceable at declaration time and need nothing from this work item."
  - "OQ-05 deferred to s05 as an implementation choice."
  - "The size confound from s03 is unresolved and unresolvable from history. No acceptance criterion above depends on the correlation being causal."
  - "READY is an authoring verdict, not a human gate pass."
```

## Spec Freeze
```yaml
work_item_slug: "capability-grant-reconciliation"
status: APPROVED_WITH_ASSUMPTIONS
checks:
  spec_card_owner_present: PENDING
  requirement_ids_present: PASS
  acceptance_criteria_mapped: PASS
  blocking_questions_resolved: PASS
  role_reviewers_recorded: PENDING
accepted_assumptions:
  - "Four controls already depend on owned_paths being true. If none of them matters in practice, this work item buys a report - carried from s02 and unresolved by design."
  - "n=5 with an unresolved size confound. AC-05 uses the five as a fixture, not as a population."
blocking_gaps: []
next_action: "Spec Card, then seal Spec with BA, Contract with Developer, DoR with QC."
```

## SDD Traceability
```yaml
requirement_refs: ["s01 two_layers L1 and L2", "s02 controls_already_depending_on_this_field"]
acceptance_refs: ["AC-01 through AC-06"]
task_refs: []
test_refs: ["AC-05 is the regression fixture over five historical work items"]
```

## Traceability
```yaml
upstream:
  - "capability-grant-reconciliation.s01.restate.md"
  - "capability-grant-reconciliation.s02.business-goal.md"
  - "capability-grant-reconciliation.s03.open-questions.md"
next_step: "s05 Technical Approach, after a Spec Card and after capability-grant-granularity lands AC-04 and AC-07."
```

## Handoff
- OQ-06 closed: separate, dependency reversed, granularity first. The reason is asymmetric defeatability, not preference.
- OQ-02 closed: a finding that blocks DoD and nothing earlier.
- OQ-03 closed: shared files are declared like any other; no exemption list.
- AC-05 is the fixture that matters. Reproducing 0, 0, 45, 52 and 7 proves the tool sees what the manual analysis saw.
- Condition to enter s05: Spec Card, and granularity landing first.
