---
artifact_id: "capability-grant-granularity.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "capability-grant-granularity"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
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
  spec:
    - "ba"
  contract:
    - "ba"
    - "devops"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release:
    - "devops"
    - "qc"
  business_acceptance: []
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-09-12T07:57:37.000Z"
  contract_reviewed_by:
    - "ba"
    - "devops"
  contract_reviewed_at: "2026-09-12T07:57:37.000Z"
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-09-12T07:57:37.000Z"
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
  - "capability-grant-granularity.s01.restate.md"
  - "capability-grant-granularity.s02.business-goal.md"
  - "capability-grant-granularity.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> The declared-versus-touched measurement invalidated the problem this work item was opened on.
> Grants are not too broad first; they are **not checked at all**. The parent branch modifies 13
> files that no grant of its own covers, and nothing objected. It also carries four other work
> items, so the unit a grant describes is not the unit that changes. Narrowing a declaration nobody
> reconciles against a diff changes nothing. DoR is **BLOCKED** pending a human decision on
> re-scope, because the acceptance criteria that follow describe a different work item from the one
> that was opened.

## Step Contract
```yaml
step_goal: "Lock acceptance for the problem the measurements actually found, and state honestly that it is not the problem the work item was opened on."
input_summary:
  - "s03 taxonomy of five directory classes"
  - "git diff --name-only main...codex/adaptive-governance-human-approval-ux, 2026-09-12: 111 files touched, 66 inside the grant, 45 outside"
output_summary: ["Reframed problem in three layers", "Acceptance criteria", "DoR verdict"]
done_when: ["The priority inversion is recorded", "DoR states plainly whether this is still one work item"]
owner: "ba"
```

## Requirement Baseline
```yaml
status: PARTIAL
approved_spec_refs: []
decision_notes:
  - "No Spec Card exists yet. The requirements below supersede the s01 problem statement and need human confirmation before a card is written, because writing a card against the original framing would freeze the wrong problem."
```

## Contract Baseline
```yaml
status: PROPOSED
api_contract_refs: []
data_contract_refs:
  - "granted_write_paths in .work-item-report.json"
notes:
  - "The contract question changed. It is no longer only what shape a path may take, but what the field means: an intention recorded at activation, or a constraint reconciled against the diff at close."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "13 work items measured 2026-09-12; all 13 declare at least one directory"
  - "codex/adaptive-governance-human-approval-ux: 111 files touched, 66 covered by its grant, 45 not"
measured_outside_grant:
  other_work_item_directories: 32
  shared_repo_files_with_no_covering_grant: 13
  examples: ["package.json", "workflow-bundle.manifest.json", ".claude/CLAUDE.md", "docs/publish-surface.md", "docs/workflow-docs-map.md", "product-specs/cards"]
compatibility_constraints:
  - "Any enforcement is retroactively violated by every branch currently open. Enforcement cannot be switched on against existing state."
rollback_constraints:
  - "The field already exists and is written by activation. Changing its meaning is not reversible by revert alone once work items rely on the new meaning."
```

## Artifact Chính
```yaml
reframed_problem:
  - layer: 1
    finding: "granted_write_paths is never reconciled against the actual diff."
    evidence: "13 files modified on the parent branch with no covering grant from that work item. No validator, gate, or CI job objected at any point."
    consequence: "The control is advisory. It records an intention and is never consulted again."
    priority: FIRST
  - layer: 2
    finding: "The unit a grant describes is the work item; the unit that changes is the branch."
    evidence: "One branch carries five work items. 32 of the 45 uncovered files belong to four other work items, each with its own grant. Nothing joins the five grants to check the branch as a whole."
    consequence: "Even if layer 1 were fixed, there is no correct object to reconcile against. A per-work-item grant cannot be checked against a shared branch diff."
    priority: SECOND
  - layer: 3
    finding: "Grants are declared at directory level where file level is possible."
    evidence: "13 of 13 work items declare a directory; only source directories among five classes are enumerable; one completed work item enumerated 25 files, so it is practical."
    consequence: "Grants are broader than the work requires, which serialises disjoint work items."
    priority: THIRD
    note: "This is the problem the work item was opened on. The measurements demote it. Narrowing a declaration that nothing checks produces a tidier field and no behavioural change."

acceptance_criteria:
  - id: AC-04
    layer: 3
    description: "A source-directory grant is accepted only with a stated reason. The four legitimate directory classes from s03 - own artifact directory, own worktree, generated output, test and fixture directories - are unaffected."
    measurable: true
    baseline: "1 of 13 work items declares a source directory, and no reason is required or recorded."
  - id: AC-06
    layer: 3
    description: "The reason on a source-directory grant is one a reviewer can disagree with: it names why the file set is not knowable at activation, rather than restating that a directory was convenient."
    measurable: true
    note: "Judgement criterion, checked by the human sealing the activation, not by a validator."
  - id: AC-07
    layer: 3
    description: "s06 owned_paths and the activation grant are compared, and a divergence is reported. The information already exists one step earlier and is currently discarded."
    measurable: true
    note: "This is the cheapest thing in the work item and does not depend on reconciliation, because it compares two declarations rather than a declaration against a diff."

edge_cases:
  - "A file legitimately shared by two work items on one branch, for example package.json touched by both a version bump and a script addition."
  - "A branch that carries a work item plus unrelated drive-by edits, which is the current state of main."
  - "A work item whose branch was deleted after merge, so reconciliation has no diff to read."

out_of_scope:
  - "Filesystem enforcement or sandboxing. This remains a declaration reconciled after the fact."
  - "Changing which gates exist or who signs them."
  - "Forcing one work item per branch. That is a working-agreement change, not a tooling change, and it belongs in its own item."
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "Brownfield baseline recorded with measurements - PASS"
  - "Smallest correct option - DEFERRED to s05; the three layers may be three work items"
  - "Scope changed materially after s01 - recorded, and it is why DoR is BLOCKED"
blocking_items: []
owner: "ba"
next_action: "Seal Spec, Contract and DoR against this s04 note. sdd_mode is none, so there is no separate Spec Card; the spec artifact is this note."
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners: ["ba"]
resolved_2026_09_12:
  - id: B-01
    resolution: >-
      Split, per the recommendation. Layers 1 and 2 move to capability-grant-reconciliation, which
      has its own business goal - that a declaration corresponds to reality. This work item keeps
      layer 3 only: grants declare what they need.
  - id: B-02
    resolution: "M-02 withdrawn as not computable while a branch carries several work items. M-05 replaces it and is measurable by this work item alone."
notes:
  - "Runs FIRST, ahead of capability-grant-reconciliation. Corrected 2026-09-12 at that work item's s04. AC-04 and AC-07 are both enforceable at declaration time - one checks the shape of a path, the other compares s06 owned_paths against the activation grant - so neither needs a diff or a branch association."
  - "The earlier note said this work item ran second. That was wrong. Reconciliation shipped alone is defeatable by widening a grant until it passes, so granularity has to exist before reconciliation has teeth."
  - "Neither work item may claim M-01, concurrency, alone. It is a joint DoD condition."
  - "READY is an authoring verdict, not a human gate pass."
```

## Traceability
```yaml
upstream:
  - "capability-grant-granularity.s01.restate.md"
  - "capability-grant-granularity.s02.business-goal.md"
  - "capability-grant-granularity.s03.open-questions.md"
next_step: "s05 Technical Approach, after a Spec Card and after capability-grant-reconciliation settles its approach."
```

## Handoff
- Measured: 111 files changed on the parent branch, 66 covered by its grant, 45 not. Of those 45, 32 belong to four other work items and 13 have no covering grant at all.
- Reframed: the control is advisory, and its unit does not match the unit of change. Granularity is real but third.
- Split taken. Layers 1 and 2 are now capability-grant-reconciliation. This work item is layer 3 only, and depends on that one.
- Condition to enter s05: the scope decision, then a Spec Card written against whichever scope is chosen.
