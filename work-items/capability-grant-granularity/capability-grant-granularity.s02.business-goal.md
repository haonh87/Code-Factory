---
artifact_id: "capability-grant-granularity.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "capability-grant-granularity"
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "capability-grant-granularity.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> The goal is throughput, not tidiness. One operator running two agent systems has exactly one lever
> on delivery rate without hiring: doing more than one thing at a time. Directory-level write grants
> remove that lever, and remove it invisibly - nothing reports that a work item is waiting on a
> grant nobody needed. Success is measured by concurrency actually achieved, not by how the grants
> look.

## Step Contract
```yaml
step_goal: "State why narrowing write grants is worth doing in delivery terms, and fix the measure so the work item cannot be declared successful by making declarations neater."
input_summary: ["capability-grant-granularity.s01.restate.md"]
output_summary: ["User problem", "Business goal", "Success metrics", "Non-goals"]
done_when:
  - "The measure is concurrency, and it has a recorded baseline"
  - "Tidiness is named as a non-goal so it cannot be substituted for the real one"
owner: "ba"
```

## Artifact Chính
```yaml
user_problem: >-
  Work stops for a reason that has nothing to do with the work. On 2026-09-11 three separate pieces
  of work - a CI change, a distribution migration, and a control-mechanism addition - were all
  blocked by one work item that had declared two whole directories as its write scope while
  modifying 12 files inside them. None of the three needed any of those 12 files. The blockage was
  created by a declaration, not by a collision, and nothing in the system reported it as such. It
  was found by a person reading a JSON field by hand.

business_goal: >-
  Make the declared write scope of a work item match its real footprint, so that two work items
  whose real footprints are disjoint can run at the same time. The lever being restored is
  parallelism; the operator is one person and cannot buy throughput any other way.

success_metrics:
  - id: M-01
    metric: "Concurrent ACTIVE work items whose granted paths intersect packages/workflow-bundle"
    baseline: "1 - measured 2026-09-11 to 2026-09-12. Any second work item is refused a footprint."
    target: "2 or more, whenever the real footprints are disjoint"
    why: "The outcome, but not one this work item delivers alone."
    revised_2026_09_12: >-
      This work item contributes to M-01; it does not achieve it. A narrow grant only enables
      concurrency once a grant is reconciled against what actually changed, which is
      capability-grant-reconciliation. Measuring this work item against M-01 alone would either
      credit it for another item's effect or fail it for that item's absence.
  - id: M-02
    metric: "Declared-to-touched ratio of a completed work item, counted in files"
    status: WITHDRAWN_2026_09_12
    why_withdrawn: >-
      Not computable. The measurement on 2026-09-12 showed one branch carries five work items, so a
      per-work-item ratio cannot be derived from a branch diff. The ratio becomes computable only
      after capability-grant-reconciliation establishes a branch-to-work-item association, at which
      point it belongs to that work item rather than this one.
  - id: M-05
    metric: "Share of source-directory grants that carry a stated reason"
    baseline: "Not applicable - no reason is required today, and 1 of 13 work items declares a source directory"
    target: "100 percent of source-directory grants carry a reason a reviewer can disagree with"
    why: "This is what this work item can be held to on its own, independent of whether reconciliation exists."
  - id: M-03
    metric: "Time between a work item being blocked by a grant and that fact being visible"
    baseline: "Unbounded. There is no report. The current instance was found by a human reading granted_write_paths in a JSON file."
    target: "Reported by a validator or status command, not discovered"
    why: "An invisible constraint cannot be managed, and it silently trains people to serialise by default."
  - id: M-04
    metric: "Amendments needed per work item when implementation finds a file the grant did not list"
    baseline: "Not applicable - a directory grant makes amendment unnecessary and therefore invisible"
    target: "Recorded and low. A high rate means the rule is punishing honest forecasting rather than blanket declarations."
    why: "This is the counter-metric. It is how the work item detects that it has made things worse."

non_goals:
  - "Tidiness. A repository full of narrow, well-formed grants that still serialise everything is a failure."
  - "Compliance. This is not about grants looking correct in an audit; it is about two things running at once."
  - "Filesystem enforcement. The grant is a declaration a human approves at activation, not a sandbox. Making it a sandbox is a different work item with a different risk profile."
  - "Changing which gates exist, what they mean, or who signs them."
  - "Retrofitting narrow grants onto work items that already hold directory grants."

constraints:
  - "The file that implements the rule sits inside the grant the rule exists to narrow. Nothing can be built until that grant releases. Carried from s01 C1."
  - "A grant is written at activation, before implementation, when the footprint is a forecast. The rule must tolerate a wrong forecast."

assumptions:
  - "Parallelism is worth the cost. If in practice the operator never has two ready work items at once, this work item buys nothing and should be closed rather than built."
  - "The measured case is representative rather than exceptional. One instance is a data point, not a pattern; s03 should confirm across the other completed work items before s04 locks acceptance."
```

## Traceability
```yaml
upstream: ["capability-grant-granularity.s01.restate.md"]
next_step: "s03 Open Questions"
```

## Handoff
- User problem settled: work is blocked by a declaration rather than a collision, and the blockage is invisible until a human reads a JSON field.
- Non-goals: tidiness and compliance are excluded by name, because they are the easy substitutes for the real measure and both would let this work item pass while changing nothing.
- Counter-metric recorded as M-04: if amendments rise, the rule is punishing honest forecasts and must be softened rather than tightened.
- Condition to enter s03: none. The assumption that one measured case is representative is the first thing s03 should test.
- Revised 2026-09-12 after s04: M-01 is a shared outcome, not this work item's own. M-02 is withdrawn as not computable and M-05 replaces it. This work item now depends on capability-grant-reconciliation.
