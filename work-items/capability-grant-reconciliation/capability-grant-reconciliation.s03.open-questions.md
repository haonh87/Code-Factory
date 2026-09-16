---
artifact_id: "capability-grant-reconciliation.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "capability-grant-reconciliation"
step_id: "s03"
step_slug: "open-questions"
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
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "capability-grant-reconciliation.s01.restate.md"
  - "capability-grant-reconciliation.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> The sample widened from one branch to five by reading merge commits rather than surviving refs.
> The result is not a rate; it is two groups. Two work items have zero uncovered files. Three have
> 41, 91 and 100 percent uncovered. What separates them is whether the grant named files at all -
> which means granularity and reconciliation are not independent after s02 assumed they were. That
> is the finding of this step, and it feeds back into a work item already split off.

## Step Contract
```yaml
step_goal: "Widen the s02 sample beyond one branch, and record what the wider sample changes."
input_summary:
  - "git log --merges on main; branch contribution read as <merge>^1...<merge>^2"
  - "granted_write_paths of each corresponding work item"
output_summary: ["Widened measurement", "Bimodal finding", "Refined questions"]
done_when: ["The sample is as wide as the evidence allows, and its permanent limit is stated"]
owner: "ba"
```

## Artifact Chính
```yaml
measurement:
  method: >-
    Merged branches show no diff against main, so the s02 approach could not widen the sample.
    Branch contribution was reconstructed instead from merge commits as <merge>^1...<merge>^2.
  measured_at: "2026-09-12"
  sample: 5
  results:
    - work_item: "trusted-receipt-namespace-resolution"
      grant: "4 directories, 2 files"
      touched: 4
      uncovered: 0
    - work_item: "worktree-and-closure-integrity"
      grant: "3 directories, 5 files"
      touched: 10
      uncovered: 0
    - work_item: "adaptive-governance-human-approval-ux"
      grant: "6 directories, 7 files"
      touched: 111
      uncovered: 45
      note: "Carries five work items on one branch, so 32 of the 45 belong to children."
    - work_item: "artifact-governance-enforcement"
      grant: "2 directories, 0 files"
      touched: 57
      uncovered: 52
    - work_item: "approval-path-defects"
      grant: "2 directories, 0 files"
      touched: 7
      uncovered: 7
  totals: "189 files touched across five work items, 104 uncovered"

bimodal_finding:
  observation: >-
    The distribution has two modes, not a central tendency. Two work items are fully covered. Three
    are 41, 91 and 100 percent uncovered. Reporting 55 percent as a rate would describe none of
    them.
  correlate: >-
    The two fully covered work items both enumerated files in their grant - two files and five
    files respectively. The two worst both declared directories only, no files at all. One of them,
    approval-path-defects, declared two directories and then wrote seven files none of which fall
    inside either, so its grant was not merely broad; it pointed somewhere else entirely.
  consequence: >-
    Granularity and reconciliation are not independent. s02 treated them as separable and made
    capability-grant-granularity depend on this work item. The data suggests the dependency also
    runs the other way: naming files appears to be what makes an author think about footprint at
    all, and a directory-only grant may be a symptom of not having thought about it rather than a
    cause of it going unchecked.
  competing_explanation: >-
    Size confound. The covered work items touched 4 and 10 files; the uncovered ones touched 57 and
    7. One of those is small, which weakens but does not remove the confound. With n=5 this cannot
    be settled by more of the same measurement.

permanent_evidence_limit:
  finding: >-
    A merged branch has no diff against main, whether or not its ref survives. This is stronger than
    the s01 C3 constraint, which only anticipated deleted refs.
  consequence_for_design: >-
    Reconciliation must run before merge. After merge the evidence exists only inside a merge commit,
    is recoverable only while the merge is not squashed, and is undercounted whenever the branch
    back-merged main first - which two of these branches did.
  consequence_for_this_step: >-
    Five is the largest sample history can produce. Widening further requires new work items, not
    better archaeology.

open_questions:
  - id: OQ-02
    question: "Is an uncovered file a failure or a finding?"
    status: OPEN
    note: "Sharpened by the data. A failure rule applied to artifact-governance-enforcement would have blocked a work item over 52 files. Whether that is correct or absurd depends on OQ-03."
  - id: OQ-03
    question: "What covers a genuinely shared file such as package.json?"
    status: OPEN
  - id: OQ-04
    question: "Does reconciliation run per work item at close, or once per branch at merge?"
    status: NARROWED
    note: "Must be before merge, per the permanent evidence limit. That removes merge-time as an option and leaves close-time, activation-to-close continuous, or CI on the open branch."
  - id: OQ-05
    question: "How are grandfathered branches marked, and does that marking expire?"
    status: OPEN
  - id: OQ-06
    question: "Does the bimodal finding mean granularity should be merged back into this work item, or does it mean the dependency between them is bidirectional and both stay separate?"
    status: OPEN
    note: "New, and it revisits a decision taken two steps ago. Merging them back would recreate the work item this one was split out of; leaving them separate requires recording that each enables the other, which is unusual and needs a human to accept it."

missing_inputs: []

conflicts:
  - id: CONF-01
    conflict: >-
      s02 states that granularity depends on this work item and not the reverse. The bimodal finding
      suggests the relationship is bidirectional. s02 is not wrong yet, but it is no longer supported
      by the only evidence available.
    resolution_owner: "ba"
    resolution_point: "s04, via OQ-06"

assumptions:
  - "The correlation between naming files and being covered is causal rather than incidental. n=5 cannot establish this, and the size confound is unresolved. s04 must not build acceptance criteria that depend on it being causal."
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "OQ-06 needs a human answer before s04 locks acceptance, because it decides whether this work item's boundary is still correct."
```

## Audit
```yaml
step_goal_met: true
evidence:
  - "Sample widened 1 to 5 by a method the earlier step did not consider"
  - "The permanent limit of historical evidence is stated rather than left as unfinished work"
  - "A competing explanation is recorded alongside the finding rather than after it"
gaps:
  - "n=5, and the size confound is unresolved and unresolvable from history"
verdict: PASS
```

## Traceability
```yaml
upstream:
  - "capability-grant-reconciliation.s01.restate.md"
  - "capability-grant-reconciliation.s02.business-goal.md"
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Sample widened to five, which is all history can produce. Merged branches have no diff; the evidence lives in merge commits and is undercounted where a branch back-merged main.
- The distribution is bimodal. Two work items are perfectly covered and both named files; the two worst named none. `approval-path-defects` declared two directories and wrote seven files inside neither.
- OQ-06 is new and revisits the s02 split. It needs a human answer before s04.
- Design constraint hardened: reconciliation must run before merge.
