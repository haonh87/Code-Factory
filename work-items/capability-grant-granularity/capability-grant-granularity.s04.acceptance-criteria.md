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
  - id: AC-01
    layer: 1
    description: "Closing a work item reports every file its branch changed that no grant covers, and the report names the files rather than counting them."
    measurable: true
    baseline: "No such report exists. The 13 uncovered files were found by an ad-hoc script during review, not by the system."
  - id: AC-02
    layer: 1
    description: "A reconciliation that finds uncovered files produces a recorded outcome: grant amended, exception raised, or files disowned. Silence is not an outcome."
    measurable: true
  - id: AC-03
    layer: 2
    description: "Reconciliation resolves against the union of grants of every work item the branch carries, not against one grant. A branch carrying five work items is checked against five grants."
    measurable: true
    note: "Requires a branch-to-work-item mapping that does not exist today. This is the substantive engineering in the work item."
  - id: AC-04
    layer: 3
    description: "A source-directory grant is accepted only with a stated reason; the four legitimate directory classes from s03 are unaffected."
    measurable: true
  - id: AC-05
    description: "Two work items with disjoint real footprints can both be ACTIVE. This is M-01 from s02 and remains the outcome measure."
    measurable: true
    note: "AC-04 alone does not achieve this. AC-01 through AC-03 are what make a narrow grant mean anything."

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
blocking_items:
  - "The work item was opened on layer 3 and the measurements make layer 1 primary. A human must decide whether this stays one work item or splits."
owner: "ba"
next_action: "Human decides re-scope, then a Spec Card is written against the chosen scope"
```

## Definition of Ready
```yaml
status: BLOCKED
blockers:
  - id: B-01
    blocker: "The problem statement changed between s01 and s04. Acceptance above describes layers 1 and 2, which s01 does not mention. Sealing Spec against s01 would freeze a problem the data has already demoted."
    owner: "ba"
    options:
      - "Re-scope this work item to layers 1 and 2, and open layer 3 separately once a grant means something."
      - "Keep this work item on layer 3 only, and open layers 1 and 2 as a separate, higher-priority item."
      - "Rewrite s01 and s02 against the reframed problem and re-run this step."
    recommendation: >-
      The second option. Layer 3 is small, well understood, and already has a taxonomy. Layers 1 and
      2 are the substantive engineering and deserve their own business goal, which is not the one
      written in s02 - s02 measures concurrency, while layers 1 and 2 measure whether a declaration
      corresponds to reality. Two different goals should not share one work item.
  - id: B-02
    blocker: "M-02 in s02 sets a declared-to-touched ratio target. The measurement shows that ratio is not computable per work item while branches carry several. M-02 needs replacing or deferring."
    owner: "ba"
notes:
  - "Everything else is ready. The blockers are about scope, not about missing information."
  - "This is the third correction to this work item's framing in three steps. Each step measured and corrected the one before it, which is the process working rather than failing."
```

## Traceability
```yaml
upstream:
  - "capability-grant-granularity.s01.restate.md"
  - "capability-grant-granularity.s02.business-goal.md"
  - "capability-grant-granularity.s03.open-questions.md"
next_step: "Blocked. Human decides re-scope before s05."
```

## Handoff
- Measured: 111 files changed on the parent branch, 66 covered by its grant, 45 not. Of those 45, 32 belong to four other work items and 13 have no covering grant at all.
- Reframed: the control is advisory, and its unit does not match the unit of change. Granularity is real but third.
- DoR is BLOCKED on a scope decision, not on missing information. Recommendation is to split, keeping this work item on layer 3 and opening layers 1 and 2 with their own business goal.
- Condition to enter s05: the scope decision, then a Spec Card written against whichever scope is chosen.
