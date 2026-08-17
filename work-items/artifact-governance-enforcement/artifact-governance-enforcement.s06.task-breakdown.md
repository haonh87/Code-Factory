---
artifact_id: "artifact-governance-enforcement.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "artifact-governance-enforcement"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
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
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-17T07:02:47.000Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "artifact-governance-enforcement.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Step Contract
```yaml
step_goal: "Produce an ordered plan specific enough to execute without re-deriving the design, with a verify path per task and the reader migration isolated so it cannot fail silently."
input_summary:
  - "s05 recommended approach O-A write-new-read-both, and its resolutions for Q2 and Q3"
  - "s04 acceptance AC-001 to AC-010"
output_summary:
  - "Ordered tasks with paths, outputs, review checkpoint and verify method"
  - "Worktree and review plan"
  - "Regression checkpoints against the 17-work-item floor"
done_when:
  - "No task uses a placeholder without naming what it touches and how it is checked"
  - "Every removed field is in a task that also migrates its reader"
owner: "developer"
```

## Artifact Chính
```yaml
implementation_goal: "Make the runtime emit role contributions as sections, migrate every reader in the same change with a failing test first, and add duplication, placement and resolver checks driven by declared configuration - without editing any note that carries a sealed receipt."
# Paths are stated once per task. Not restated as a lane map: ownership-table.md row 2.

tasks:
  - id: T0
    owner_role: developer
    name: "Establish the worktree and the baseline"
    objective: "Isolate from stabilize-architecture-skill-bundle and record the exact pre-change numbers every later task compares against."
    paths_in_scope:
      - ".claude/worktrees/artifact-governance-enforcement"
    outputs_expected:
      - "Worktree created and gitignored, branched from local main"
      - "Baseline: validator counts, unit and fixture suite results, per-work-item validate status for all 17, and the digest_match state of all 9 sealed receipts"
    review_checkpoint: "Confirm the worktree is inside the repo and ignored, and that the baseline records receipt digests so any accidental note edit is detectable later."
    verification_hint: "git worktree list; git check-ignore; run the four validators and the two suites; loop wfc gate status over the 9 receipts."
    dependencies: []
  - id: T1
    owner_role: developer
    name: "Reference resolver, as a shared helper"
    objective: "Implement the resolver specified in ownership-table.md so the duplication check and future consumers share one implementation."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
      - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
    outputs_expected:
      - "resolveArtifactReference supporting same-note and cross-file targets"
      - "Loud failure on each of: missing file, missing heading, missing yaml block, missing path"
    review_checkpoint: "SPEC_COMPLIANCE: matches the five-step specification. CODE_QUALITY: failures are distinguishable, not a single generic throw."
    verification_hint: "AC-010. Four negative tests must fail before implementation and pass after; two positive tests resolve a real reference from this work item's own s01."
    dependencies: ["T0"]
    sequencing_reason: "First because the duplication check depends on it, and because it is the one piece with no legacy interaction."
  - id: T2
    owner_role: developer
    name: "Declared layer roots in configuration"
    objective: "Make the six layer roots configuration with Code-Factory's values as the shipped default, and confirm existing config readers tolerate the new key."
    paths_in_scope:
      - "workflow-contracts.config.json"
      - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
      - "packages/workflow-bundle/test/validate-workflow-governance.test.js"
    outputs_expected:
      - "artifactGovernance.layerRoots read from config with a default"
      - "Q6 confirmed: every existing reader of the config file tolerates an unknown top-level key, with the grep recorded"
    review_checkpoint: "SPEC_COMPLIANCE: the default reproduces the six roots from SKILL.md Rule 3 exactly. CODE_QUALITY: the default lives in one place."
    verification_hint: "AC-007. Fixture with custom roots passes on its own layout; fixture with no declaration inherits the default."
    dependencies: ["T0"]
  - id: T3
    owner_role: developer
    name: "Placement check and escape hatch"
    objective: "Reject a file in no declared layer, and accept one exempted with a stated reason."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
      - "packages/workflow-bundle/tests/fixtures/workflow-governance/**"
      - "packages/workflow-bundle/test/validate-workflow-governance.test.js"
    outputs_expected:
      - "Placement check over declared roots"
      - "Frontmatter exemption requiring a non-empty reason, echoed into validation output"
      - "Negative fixtures: unplaced file, exemption without reason"
    review_checkpoint: "SPEC_COMPLIANCE: exemption is per-artifact frontmatter, not a central registry, per the s05 resolution. CODE_QUALITY: the reason appears in output, so a widened exemption is visible."
    verification_hint: "AC-006, AC-008. Then AC-009: all 17 work items still pass. A false positive here means the roots are wrong, not that the check should be loosened."
    dependencies: ["T2"]
  - id: T4
    owner_role: developer
    name: "Duplication check driven by the ownership table"
    objective: "Reject a note that restates a fact owned by another block."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
      - "packages/workflow-bundle/tests/fixtures/workflow-governance/**"
      - "packages/workflow-bundle/test/validate-workflow-governance.test.js"
    outputs_expected:
      - "Check covering the fields the ownership table assigns an owner"
      - "Five negative fixtures, one per F9 duplication, each message naming the owning block"
      - "A false-positive sweep result across all 17 work items"
    review_checkpoint: "SPEC_COMPLIANCE: every rejection message names the owner, so the fix is obvious. CODE_QUALITY: the field-to-owner map is data, not branching logic."
    verification_hint: "AC-005. Five negatives rejected, deduplicated equivalents accepted, zero false positives across 17 work items. A false positive means ownership-table.md gains a row."
    dependencies: ["T1", "T2"]
  - id: T5
    owner_role: developer
    name: "Reader migration - the highest-risk task"
    objective: "Move each reader from the per-role artifact to the owning section, keeping the legacy path, with a failing test per field before the change."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-execution.js"
      - "packages/workflow-bundle/test/validate-workflow-execution.test.js"
    outputs_expected:
      - "A recorded grep listing every reader of assignment_id, role, owned_scope, done_when and status before any edit"
      - "Per field: a test that fails before migration and passes after"
      - "Legacy per-role file still accepted, covered by exactly one fixture"
    review_checkpoint: "SPEC_COMPLIANCE: no field lost a reader; the grep is the evidence, not a claim. CODE_QUALITY: the legacy branch is clearly marked and gets no new behaviour."
    verification_hint: "AC-004. The red state per field is the deliverable. A test that was never red proves nothing - see s05 R-1."
    dependencies: ["T1"]
    sequencing_reason: "Isolated in its own task, after the resolver exists and before the generator changes, so a silent-pass regression is attributable to one commit."
  - id: T6
    owner_role: developer
    name: "Generator emits sections with plural schemas"
    objective: "Emit role contributions into ## Role Outputs with assignments[] and handoffs[], and stop emitting per-role files."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-execution-definitions.js"
      - "packages/workflow-bundle/test/scaffold-workflow.test.js"
      - "skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
    outputs_expected:
      - "Sections replace execution-policy, worker-assignment, worker-handoff-report and merge-report files"
      - "Plural schemas; every id in merged_assignments resolves to a handoff entry"
      - "## Role Outputs and the role-indexed escape-hatch filename registered in the naming convention"
    review_checkpoint: "SPEC_COMPLIANCE: destinations match worked-example.md section 5 exactly. CODE_QUALITY: no orphaned assignment is representable."
    verification_hint: "AC-001, AC-002, AC-003. Generate the sample at 2, 4 and 8 roles; file counts identical; a fixture with an unmatched merged_assignments id is rejected."
    dependencies: ["T5"]
    sequencing_reason: "After T5. Readers must accept the new location before anything writes to it, otherwise the first generated artifact is unreadable."
  - id: T7
    owner_role: developer
    name: "Full regression and receipt integrity"
    objective: "Prove nothing existing broke, including the audit trail."
    paths_in_scope:
      - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s08.verification.md"
    outputs_expected:
      - "Four validators plus unit, fixtures and pack-audit, compared against the T0 baseline"
      - "All 17 work items still pass"
      - "All 9 sealed receipts still report digest_match=true"
      - "Encoding check on changed text files"
    review_checkpoint: "SPEC_COMPLIANCE: AC-009 satisfied and no receipt digest moved."
    verification_hint: "Compare against T0 numbers, not against expectation. Record output, not summaries."
    dependencies: ["T3", "T4", "T6"]

execution_order: "T0 -> {T1, T2} -> T3, T4, T5 -> T6 -> T7. T1 and T2 are independent of each other. T5 gates T6 strictly."
dependencies:
  - "T5 before T6: readers must accept the section before the generator writes it"
  - "T1 before T4: the duplication check uses the resolver"
  - "T2 before T3: the placement check needs declared roots"
  - "T7 after everything, compared against the T0 baseline"
handoff_points:
  - "After T0: baseline numbers exist; without them T7 has nothing to compare against"
  - "After T5: the riskiest change is isolated and reviewed before the generator moves"
  - "After T7: handoff to s08 for the DoD decision"
delegation: "None. T5 and T6 are strictly ordered and share files; the independence test for a subagent is not met."
```

## Verification Plan
- Mandatory per task: the `verification_hint` on each task above is the verify path; no task ships without it.
- Mandatory before leaving `s07`: four validators, unit, fixtures, pack-audit, all 17 work items, all 9 receipt digests, encoding.
- Risk note: `T5` is the only task that can fail silently. Its deliverable is the **red** state per field, not the green one. A test that was never red is not evidence.
- Rollout note: none. This work item ships no release and bumps no version. `Q5` resolved as minor-when-released, in `s05`.

## Governance Checks
```yaml
checklist_applied: "project-context/checklists/default.md"
checks:
  - id: "GOV-08"
    check: "Execution-oriented planning, no placeholders"
    result: PASS
    evidence: "Each of T0 to T7 names paths, outputs, a review checkpoint and a verify method tied to an acceptance criterion."
  - id: "GOV-09"
    check: "TDD for behaviour change"
    result: PASS
    evidence: "T1 and T5 require the failing state as a deliverable. T3, T4 and T6 carry negative fixtures."
  - id: "GOV-10"
    check: "Worktree for large or risky change"
    result: PASS
    evidence: "T0 creates it. Required by planning_track=full, multiple boundaries, and the overlapping active work item."
  - id: "GOV-11"
    check: "Review early, two-tier"
    result: PASS
    evidence: "Every task carries a SPEC_COMPLIANCE then CODE_QUALITY checkpoint; T5 is reviewed before T6 opens."
  - id: "GOV-12"
    check: "Subagent only for independent tasks"
    result: PASS
    evidence: "Delegation declined; T5 and T6 are strictly ordered and share files."
  - id: "GOV-13"
    check: "Approach and Task Plan are human gates"
    result: PENDING
    evidence: "Both receipts empty."
blocking_items:
  - "Approach receipt not granted"
  - "Task Plan receipt not granted"
  - "Write-root collision with stabilize-architecture-skill-bundle unresolved"
owner: "developer"
next_action: "Human Approach and Task Plan review, then resolve the collision before s07 opens."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "After T3 and after T4: all 17 work items still pass, because a new check is the most likely source of a false positive"
  - "After T6: regenerate the sample and confirm no existing artifact changed shape unexpectedly"
  - "T7: full sweep against the T0 baseline"
compatibility_checkpoints:
  - "After T2: a fixture with no declared roots inherits the default, so an adopter who upgrades without touching config is unaffected"
  - "After T5: the legacy per-role fixture still passes, which is the whole point of write-new-read-both"
  - "T7: all 9 sealed receipt digests unchanged - the constraint that eliminated options O-B and O-C"
migration_or_backfill_steps:
  - "None by design. No note is edited, no data is converted. This is why O-A was chosen."
rollback_or_restore_steps:
  - "git revert the whole change set from the worktree branch. Partial rollback is forbidden: a generator emitting sections against readers expecting files is worse than either end state."
  - "Because no existing note is edited, rollback cannot damage the audit trail."
```

## Traceability
```yaml
upstream:
  - "artifact-governance-enforcement.s05.technical-approach.md#Artifact Chính"
  - "artifact-governance-enforcement.s04.acceptance-criteria.md#Artifact Chính"
acceptance_to_task:
  - "AC-001, AC-002, AC-003 -> T6"
  - "AC-004 -> T5"
  - "AC-005 -> T4"
  - "AC-006, AC-008 -> T3"
  - "AC-007 -> T2"
  - "AC-009 -> T3, T4, T7"
  - "AC-010 -> T1"
coverage: "10 of 10 acceptance criteria map to a task; 8 of 8 tasks carry at least one criterion or a baseline obligation"
next_step: "s07 Implement, blocked pending the Approach and Task Plan receipts and the collision resolution"
```

## Handoff
- Task thực hiện trước:
- Phụ thuộc chặn:
- Điều kiện sang step 7:
