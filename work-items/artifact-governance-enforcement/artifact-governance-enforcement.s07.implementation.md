---
artifact_id: "artifact-governance-enforcement.s07.implementation"
artifact_family: workflow-step
work_item_slug: "artifact-governance-enforcement"
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
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "required"
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "artifact-governance-enforcement.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Step Contract
```yaml
step_goal: "Execute T0 to T7 from the approved task plan, in order, with the reader migration isolated so a silent-pass regression is attributable to one commit."
input_summary:
  - "s06 task plan T0 to T7, receipt sealed"
  - "s05 approach O-A write-new-read-both, receipt sealed"
output_summary:
  - "Per-task record with evidence"
  - "Delivery rule evidence for TDD, worktree, review and delegation"
done_when:
  - "T0 to T7 each have a recorded outcome"
  - "No claim of DoD; s08 owns the verdict"
owner: "developer"
```

## Artifact Chính
```yaml
task_plan_ref: "artifact-governance-enforcement.s06.task-breakdown.md#Artifact Chính"

progress:
  - id: T0
    status: DONE
    outcome: "Worktree created and baseline recorded. One blocking finding surfaced, see T0-F1."
    evidence:
      worktree: ".claude/worktrees/artifact-governance-enforcement on branch codex/artifact-governance-enforcement at b6424dd, branched from local main HEAD rather than origin/main"
      gitignored: "confirmed via git check-ignore, .gitignore:29 .claude/worktrees/"
      isolation: "separate from .claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0, which is on its own branch at the same base"
      baseline_in_worktree:
        validate_workflow: "118 files, 114 notes"
        validate_sdd: "18 notes"
        validate_planning: "114 notes"
        validate_protocol: "0 protocol-managed, 15 legacy skipped"
        unit: "26 test files pass"
        fixtures: "10 cases pass"
        pack_audit: "pass"
        node: "v26.5.0"
        npm: "11.17.0"
        work_items_visible: 15
      baseline_in_main_tree:
        validate_workflow: "137 files, 133 notes"
        work_items_visible: 17
        note: "The main tree sees two more work items than the worktree. Both are untracked. This is the finding below."
  - id: T1
    status: NOT_STARTED
  - id: T2
    status: NOT_STARTED
  - id: T3
    status: NOT_STARTED
  - id: T4
    status: NOT_STARTED
  - id: T5
    status: NOT_STARTED
  - id: T6
    status: NOT_STARTED
  - id: T7
    status: NOT_STARTED

findings:
  - id: "T0-F1"
    severity: HIGH
    finding: "Fifteen trusted approval receipts are sealed against files that git has never tracked."
    measurement:
      - "artifact-governance-model: 0 tracked, 6 untracked, 5 receipts APPROVED"
      - "artifact-governance-enforcement: 0 tracked, 7 untracked, 5 receipts APPROVED"
      - "stabilize-architecture-skill-bundle: 0 tracked, 9 untracked, 5 receipts APPROVED"
    why_it_matters: "A receipt proves that a specific human approved a specific artifact, identified by a sha256 of its content. If the artifact is untracked, git clean -fd or a discarded working tree destroys every subject those receipts refer to. The receipts survive in ~/.workflow-bundle/trusted-approvals/ and would then point at nothing. The audit trail becomes unverifiable rather than merely incomplete."
    consequence_for_this_work_item: "AC-009 requires 17 work items to keep passing validation. The worktree can only see 15, because 2 are untracked. AC-009 therefore cannot be fully verified inside the worktree; T7 must run its 17-item sweep in the main tree, or the artifacts must be committed first."
    disposition: "Not fixable inside this work item's granted write roots, and committing is the repository owner's decision. Escalated in Handoff. T7 will verify AC-009 in the main tree and record the split explicitly."
    surfaced_by: "T0 baseline comparison between worktree and main tree, which is the reason the plan required a baseline before any other task."

implemented_changes: []   # nothing under packages/ yet; T1 is the first
doc_changes: []
operational_notes:
  - "The shell working directory must be returned to the repository root after any cd into the worktree. One command in this session ran against the worktree by accident because the directory persisted; the output was recognised as wrong and rerun. Recorded because it is a repeatable trap when two worktrees exist."
  - "granted_write_paths is deliberately scoped to the worktree and this work item's own directory, not to packages/workflow-bundle in the main tree. All package edits happen inside the worktree, which is the collision mitigation the approved plan specified as T0."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: PENDING
tdd_test_refs: []
tdd_exception_reason: ""
tdd_alternative_verify_path: []
tdd_plan: "T1 and T5 require the failing state as a deliverable. T5 is the reader migration and the only task that can fail silently; its red state per field is the evidence, not the green one. T3, T4 and T6 carry negative fixtures."
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/artifact-governance-enforcement"
  - "branch codex/artifact-governance-enforcement at b6424dd"
worktree_reason: "planning_track=full, several boundaries under packages/workflow-bundle, and an overlapping active work item holding write roots in the same package. Required by s04 GOV-04 and executed as T0."
review_status: PARTIAL
review_refs:
  - "T0 reviewed: worktree inside the repo and gitignored, baseline captured, isolation from the other worktree confirmed"
spec_compliance_status: PASS
code_quality_status: NOT_RUN
review_note: "PARTIAL is correct at this point: only T0 is complete and it produced no code. Each of T1 to T7 carries its own SPEC_COMPLIANCE then CODE_QUALITY checkpoint, and T5 is reviewed before T6 opens."
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Merge branch codex/artifact-governance-enforcement into main after s08 DoD, not before. Branch finalisation is gated on the DoD verdict per the branch-finish rule."
verify_path:
  - "Per task: the verification_hint on each of T0 to T7 in s06"
  - "Before leaving s07: four validators, unit, fixtures, pack-audit"
  - "AC-009 17-work-item sweep must run in the main tree, per finding T0-F1"
  - "All 15 receipt digests unchanged"
```

## Implementation Notes
```yaml
framework_notes:
  - "Two worktrees now exist at the same base commit b6424dd, one per active work item. Both are gitignored. Neither can see the other's untracked artifacts."
known_limitations:
  - "AC-009 cannot be fully verified inside the worktree because 2 of the 17 work items are untracked. T7 splits the sweep: worktree for the code change, main tree for the 17-item floor."
  - "T0-F1 is unresolved and outside this work item's write roots. It is an integrity gap in the repository, not a defect in this change."
```

## Traceability
```yaml
upstream:
  - "artifact-governance-enforcement.s06.task-breakdown.md#Artifact Chính"
  - "artifact-governance-enforcement.s05.technical-approach.md#Artifact Chính"
task_to_acceptance:
  - "T0 -> baseline obligation for AC-009"
next_step: "T1 reference resolver, then T2"
```

## Handoff
- Done: **T0 only.** Worktree created at `b6424dd` on its own branch, gitignored, isolated from the other active worktree. Baseline captured in both trees.
- Blocking finding **T0-F1**: fifteen trusted receipts across three work items are sealed against files git has never tracked. `git clean -fd` would destroy every artifact those receipts refer to, leaving the receipts pointing at nothing. This is outside this work item's write roots and committing is the owner's decision.
- Consequence already absorbed: `AC-009` needs the 17-work-item sweep in the main tree, because the worktree can only see 15.
- Next: `T1` reference resolver, then `T2` declared layer roots. `T5` reader migration stays isolated and gets reviewed before `T6` touches the generator.
- Not claimed: `DoD`, and no branch finalisation. Both wait on `s08`.
