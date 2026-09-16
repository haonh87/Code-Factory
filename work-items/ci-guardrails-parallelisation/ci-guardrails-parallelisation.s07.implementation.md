---
artifact_id: "ci-guardrails-parallelisation.s07.implementation"
artifact_family: workflow-step
work_item_slug: "ci-guardrails-parallelisation"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
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
sdd_mode: light
spec_refs:
  card: "product-specs/cards/ci-guardrails-parallelisation.md"
spec_status: draft
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: []
  dor: []
  approach: []
  task_plan: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
  - "ci-guardrails-parallelisation.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> T1 is complete: the pre-change baseline is recorded from run `32825477258` on `main`.
> T3 is **BLOCKED** by a file-ownership collision found at implementation time, not at planning
> time: branch `codex/adaptive-governance-human-approval-ux` already modifies
> `.github/workflows/workflow-guardrails.yml` with 60 insertions, adding a
> `release-candidate-build` job that packs the candidate once and passes it downstream as an
> artifact. Rewriting the same file on `main` would produce a near-unmergeable conflict.
> REQ-002, the action upgrade, is transferred out of this work item to that branch because it is
> deadline-bound. `GOV-EX-002` is proposed to cover the transfer. Nothing has been written to the
> workflow file.

## Artifact Chính
```yaml
implemented_changes: []
doc_changes:
  - "This s07 note: T1 evidence, collision finding, GOV-EX-002 proposal"
operational_notes:
  - "T1 DONE. Baseline from run 32825477258, main, 2026-08-25, green: 105s wall-clock over 9 jobs. Per-job: Tooling 13s, Artifacts 9s, SDD 5s, Changes 8s, Execution 8s, Planning 5s, Authoring Smoke 9s, Release Candidate Node18 21s, Node22 13s."
  - "Baseline correction: an earlier reading of run 34322150024 was discarded. That run is on the Codex branch, whose workflow has 10 jobs, so it is not a baseline for main's 8-job file."
  - "Estimate correction: the six validators total 48s serial and about 13s parallel, so the projected wall-clock is roughly 55-60s, a 40-45% reduction. The 60% figure stated during authoring was overstated and is withdrawn."
  - "AC-001 premise confirmed by evidence rather than argument: run 34216520563 failed at Workflow Execution and skipped four downstream jobs - Authoring Smoke, Planning, Build Exact Release Candidate, Release Candidate. One failure, four checks never run."
  - "T2 not started. It stays in scope for the deferred parallelisation, and its finding will apply to whoever performs the action upgrade."
  - "T3 BLOCKED - see GOV-EX-002."
  - "T4 BLOCKED - depends on T3."
```

## Governance Exception
```yaml
exception_id: GOV-EX-002
work_item_ref: "ci-guardrails-parallelisation"
step_ref: "s07"
principle_ref: "Hard Rule: Spec/Design Before Code - the sealed Task Plan T3 cannot execute as written"
reason: >-
  The approved Task Plan assumed .github/workflows/workflow-guardrails.yml was uncontested. It is
  not. Branch codex/adaptive-governance-human-approval-ux, 62 commits ahead of main, modifies the
  same file with 60 insertions and 2 deletions, adding a release-candidate-build job whose output
  later jobs consume as an artifact. A full restructure on main would collide with that work. The
  ownership analysis performed during authoring checked the working tree rather than the branch
  diff, and missed it.
impact: >-
  REQ-002, the checkout and setup-node upgrade from v4 to v7, is deadline-bound: GitHub removes
  Node 20 from runners on 2026-09-23, twelve days from this note. Holding it inside this work item
  until the Codex branch merges risks missing that date and breaking CI. REQ-001, REQ-003 and
  REQ-004 - the parallelisation - are not deadline-bound and can wait.
mitigation:
  - "REQ-002 is transferred to branch codex/adaptive-governance-human-approval-ux, which owns the file and will land first. A boundary notice carrying the exact version numbers is handed to that agent."
  - "REQ-001, REQ-003 and REQ-004 stay in this work item and resume once the branch merges."
  - "T3 will be redesigned at that point around the release-candidate-build job and its artifact dependency, which did not exist when the Task Plan was sealed."
  - "AC-002's baseline is already captured, so the deferral does not lose it."
owner: "devops"
approved_by: ""
status: PROPOSED
review_date: ""
notes: >-
  This exception stays open past s07 and blocks DoD for this work item, so it meets the register
  criteria in project-context/governance-exception-register.md and needs a row there. The
  implementing agent's granted_write_paths do not include project-context/, so the register entry
  must be added by a human or under a widened write scope. Next free id is GOV-EX-002; GOV-EX-001
  is RESOLVED.
```

## Delivery Rule Evidence
```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: "CI pipeline configuration. No production behaviour changes, so there is no unit-level behaviour to drive out. The equivalent observe-failure-first discipline is T4, which proves AC-001 with a deliberate double failure before the change is trusted."
tdd_alternative_verify_path:
  - "Command-set comparison before and after - AC-006"
  - "Hosted green run with zero Node deprecation annotations - AC-003"
  - "Deliberate double-failure run - AC-001"
change_risk_profile: QUICK_FIX
worktree_status: NOT_REQUIRED
worktree_refs: []
worktree_reason: "One file, one session, low conflict risk against the main tree. Recorded at s04 and unchanged. Note that the conflict discovered here is a cross-branch collision, which a worktree would not have prevented or revealed."
review_status: BLOCKED
review_refs: []
spec_compliance_status: NOT_RUN
code_quality_status: NOT_RUN
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Not opened. No commit touches the workflow file from this work item."
verify_path:
  - "Blocked until the Codex branch merges and T3 is redesigned"
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-001 -> T3, T4 - DEFERRED"
  - "REQ-002 -> transferred out under GOV-EX-002"
  - "REQ-003 -> T3 - DEFERRED"
  - "REQ-004 -> T3 - DEFERRED"
acceptance_refs:
  - "AC-002 baseline captured at T1; the comparison half is deferred"
  - "AC-001, AC-003, AC-004, AC-005, AC-006 - not yet exercised"
task_refs:
  - "T1 DONE"
  - "T2 NOT_STARTED"
  - "T3 BLOCKED"
  - "T4 BLOCKED"
test_refs: []
```

## Traceability
```yaml
upstream:
  - "ci-guardrails-parallelisation.s06.task-breakdown.md"
next_step: "Blocked. Resume at s07 once codex/adaptive-governance-human-approval-ux merges."
```

## Handoff
- Done: T1. Baseline is `105s` over 9 jobs, run `32825477258`, main, 2026-08-25.
- Blocked: T3 and T4, by `GOV-EX-002`. Nothing was written to the workflow file.
- Human action needed: approve or reject `GOV-EX-002`, and add its row to `project-context/governance-exception-register.md` - outside this work item's write scope.
- Condition to resume: `codex/adaptive-governance-human-approval-ux` merged, then T3 redesigned around `release-candidate-build` and its artifact dependency.
