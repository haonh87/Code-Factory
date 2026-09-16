---
artifact_id: "worktree-and-closure-integrity.s08.verification"
artifact_family: workflow-step
work_item_slug: "worktree-and-closure-integrity"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: BUG
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
sdd_mode: light
spec_refs:
  card: "product-specs/cards/worktree-and-closure-integrity.md"
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
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by:
    - "qc"
  dod_reviewed_at: "2026-08-28T04:26:48.000Z"
content_skills:
  - "codex-workflow-chain"
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "worktree-and-closure-integrity.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Verify evidence gathered for `AC-001`..`AC-006`. Unit suite **42 files, 0 failing** — the
> `T0` baseline was 1. All four original defects re-checked against their recorded symptoms,
> plus `D-E` from `AMENDMENT-001`. `DoD` is **deliberately left unset**: an agent may collect
> evidence but may not pass this gate.

## Artifact Chính
```yaml
verification_scope:
  - "AC-001 D-A workflow_root compared by relative location"
  - "AC-002 D-B tdd-enforce maps packages/X/bin to packages/X/test"
  - "AC-003 D-C the verify-stage finalization requirement is documented"
  - "AC-004 D-D sealing dod is refused over an uncommitted delivery"
  - "AC-005 every fixture observed failing first"
  - "AC-006 D-E the resolver test is decoupled from live repo state (AMENDMENT-001)"

evidence_refs:
  - criterion: "AC-001"
    evidence: "wfc protocol run from the worktree with the branch code: workflow_root mismatch lines = 0. Control: the same command from the main tree exits 0. EDGE-003 covered by 5 explicit rejection cases in validate-work-item-protocol.test.js, all green."
    verdict: PASS
    narrowed_by: "F-02, recorded in s07. The criterion is 'the mismatch line is gone', not 'wfc protocol exits 0'. The run still reports Missing-receipt errors, which are the namespace defect - a different work item, delivered separately on codex/trusted-receipt-namespace-resolution. Count corrected 2026-08-28: it was recorded as 26, measured 31 before the main merge and 58 after it. The number tracks how many work items exist with sealed receipts, not how well this work item performed - which is exactly why the AC-001 criterion is the mismatch line, not the exit code."
  - criterion: "AC-002"
    evidence: "Probed the hook live. packages/workflow-bundle/bin/wfc.js, which has a matching test, exits 0. packages/workflow-bundle/bin/nonexistent.js, which does not, exits 2 - EDGE-004 holds, so the mapping was fixed and not the policy."
    verdict: PASS
  - criterion: "AC-003"
    evidence: "wfc help carries 2 flow lines at 9b/9c naming the verify-stage finalization requirement. wfc.test.js AC-003 groups green."
    verdict: PASS
  - criterion: "AC-004"
    evidence: "uncommitted-delivery-guard.test.js all green; getUncommittedDeliveryErrors wired into workflow-gate-review.js at 3 call sites. The guard was verified against the behavioural fixture rather than the unit test alone, after it was first placed in a function the dod approve path never calls."
    verdict: PASS
    known_limit: "L-01 - implemented at the dod seal only. The DONE transition is protected transitively because it requires an APPROVED dod receipt digest-matched to the s08 note. The residual seal-then-dirty window is out of scope here and is E-B in the namespace work item."
  - criterion: "AC-005"
    evidence: "Commit 550c815 carries all four fixtures RED, ahead of every fix. D-E likewise: workflow-gate-evidence-utils.test.js was observed failing on 'same-note resolver must read the live P2 protocol status' before the T7 edit."
    verdict: PASS
  - criterion: "AC-006"
    evidence: "The assertion now supplies its own note in a tmpdir with protocol_status VERIFIED - a value no work item in this repo carries. Proved non-tautological by writing three different values (VERIFIED, BLOCKED, MATERIALIZED) and confirming the resolver returned each. Commit 79df212."
    verdict: PASS

suite_results:
  unit_suite: "42 files, 0 failing"
  t0_baseline: "1 failing file - workflow-gate-evidence-utils.test.js"
  delta_explained: "The one baseline failure was D-E itself. T7 closed it, which is what makes T6's 0-failing-file criterion reachable - the reason AMENDMENT-001 existed."
  validators_worktree: "validate, sdd, change, exec, plan, fixtures - all exit 0"
  defect_fixtures: "worktree-and-closure-integrity.test.js, validate-work-item-protocol.test.js, uncommitted-delivery-guard.test.js - all green"

summary_verdict: PASS
summary_verdict_scope: "This is the TECHNICAL verification verdict over AC-001..AC-006. It is not a DoD verdict and does not attempt to be one."
```

## Post-Merge Verification
```yaml
why_this_exists: "The s08 evidence above was first measured on a branch 13 commits behind main. Certifying numbers from a stale base would mean certifying something other than what lands, so main was merged in and the suite re-run before the DoD verdict."
merged_at: "2026-08-28"
merge_commit: "6a6435b - merge: bring main into codex/worktree-and-closure-integrity"
branch_behind_main_after: 0

conflict_resolved:
  file: "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
  nature: "Semantic, not textual. Both sides had fixed the same original brittleness by different routes."
  ours: "T7/D-E - a controlled tmpdir fixture asserting protocol_status VERIFIED, a value no work item in this repo carries."
  theirs: "main 26591a2 - kept the live read but compared against the live report, so a status change no longer breaks it."
  resolution: "Kept BOTH."
  reasoning: "AC-006 requires the controlled fixture, so taking main's version alone would have violated the approved acceptance criterion. Discarding main's would have thrown away a real improvement made by another work item. Keeping both loses nothing."
  residual: "main's assertion is still coupled to that work item continuing to EXIST - not to its status. That is the residual-cross-file risk already recorded in s07, owned by the test-hygiene work item."

post_merge_results:
  unit_suite: "42 files, 0 failing, exit 0"
  validators: "validate, sdd, change, exec, plan - all exit 0 (173 files / 169 notes)"
  fixtures: "exit 0 - 10 governance fixture cases"
  pack_audit: "exit 0"
  workflow_root_mismatch_lines: 0
  gate_receipts: "52 of 52 digest_match=true, 0 stale"
  runtime_rebuilt: "sync-workflow-bundle-runtime.js re-run after the merge; bundle_version now reports 2.6.1, 84 skills"
  verdict: "PASS - identical to the pre-merge result. The merge changed the base without changing any outcome."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - check: "pass/not-pass evidence recorded clearly"
    status: PASS
    evidence: "Every criterion above names the command run and the number it produced, with a control where one exists."
  - check: "related docs/spec synced when behaviour changed"
    status: PASS
    evidence: "AMENDMENT-001 added REQ-006/AC-006 to the spec card and AC-006 to s04, before D-E was implemented rather than after."
  - check: "remaining gaps have an owner and a next action"
    status: PASS
    evidence: "L-01 and F-02 are both owned by the namespace work item, which has its own sealed gates. The cross-file residual from T7 is recorded in s07 residual_out_of_scope with a recommended home."
blocking_items: []
owner: "developer"
next_action: "Human reviews this note, fills gate_reviews.dod_reviewed_by/_at, sets Definition of Done.status, then seals the dod gate. The agent stops here."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
regression_evidence:
  - "Unit suite improved from the T0 baseline of 1 failing file to 0, with no file regressing."
  - "Six validators exit 0 in the worktree, matching T0."
  - "All 10 governance fixture cases pass, including the EXPECTED_FAIL invalid-s07-rule-evidence case."
  - "52 of 52 gate receipts across the whole repository still digest-match after this work item's note edits."
compatibility_status: PASS
compatibility_evidence:
  - "D-A widened workflow_root tolerance without widening trust: 5 explicit rejection cases keep a genuinely wrong root refused."
  - "D-B fixed the bin/ mapping, not the policy: a bin/ file with no test is still blocked (exit 2)."
  - "D-D narrows a gate that four already-closed work items passed under. GOV-Q1 resolved this prospective-only: no closed work item is reopened, no stored report rewritten."
  - "The four DONE work items keep valid receipts - verified as part of the 52/52 check."
breaking_changes:
  - "D-D makes `wfc gate approve --gate dod` stricter: it now refuses when a path inside granted_write_paths is uncommitted. Mitigated by a reason-bearing hatch echoed on its own WAIVED line. Prospective only."
rollback_readiness: READY
rollback_notes:
  - "D-D is the last of the original four commits, so reverting it alone restores previous DoD behaviour and leaves the three friction fixes in place."
  - "T7 (79df212) is test-only and reverts independently."
  - "No package version bump and no release inside this work item, so rollback is a git revert plus a re-run of the suite."
```

## Spec Coverage
```yaml
coverage:
  - requirement: "REQ-001 / AC-001 - D-A"
    covered_by: "validate-work-item-protocol.test.js, worktree-and-closure-integrity.test.js D-A group"
    status: PASS
  - requirement: "REQ-002 / AC-002 - D-B"
    covered_by: "worktree-and-closure-integrity.test.js D-B group, plus a live hook probe"
    status: PASS
  - requirement: "REQ-003 / AC-003 - D-C"
    covered_by: "wfc.test.js AC-003 groups, D-C fixture group"
    status: PASS
  - requirement: "REQ-004 / AC-004 - D-D"
    covered_by: "uncommitted-delivery-guard.test.js, D-D fixture groups"
    status: PARTIAL
    partial_reason: "Implemented at the dod seal only; the DONE transition clause is L-01 and is carried by the namespace work item as E-B."
  - requirement: "REQ-005 / AC-005 - fixtures failing first"
    covered_by: "Commit 550c815 (four fixtures RED) and the recorded D-E RED observation"
    status: PASS
  - requirement: "REQ-006 / AC-006 - D-E"
    covered_by: "workflow-gate-evidence-utils.test.js same-note fixture, commit 79df212"
    status: PASS
status: PARTIAL
status_reason: "Five of six requirements fully covered. REQ-004 is PARTIAL against its own 'and the DONE transition' clause - a known, recorded, owned limitation rather than a gap discovered at verify."
```

## Definition of Done
```yaml
status: PARTIAL
status_set_by: "human (interactive, 2026-08-28) - recorded by the agent as scribe, not decided by it"
status_note: "PARTIAL, not DONE, and deliberately so. Five of six requirements are fully covered; REQ-004 is PARTIAL against its own 'and the DONE transition' clause. The human accepted that limitation (DEC-REQ004-PARTIAL), which permits closure - it does not convert the coverage into DONE. Recording DONE here would erase an accepted, owned limitation from the closure record, which is the precise failure mode this work item exists to prevent. Precedent: approval-path-defects closed PARTIAL on the same reasoning."
finalization_state: "Finalized 2026-08-28 together with the dod attestation, because the validator couples them: a finalized s08 note must carry non-empty gate_reviews.dod_reviewed_by and _reviewed_at."
attestation_provenance: "gate_reviews.dod recorded as qc on the human's own action - they invoked `wfc gate approve --gate dod --reviewed-by qc` directly, which is the review event this field records. The agent transcribed it; it did not originate it, and it did not seal the receipt."
evidence_is_complete: true
human_decisions_recorded:
  - id: "DEC-REQ004-PARTIAL"
    question: "Is REQ-004 being PARTIAL acceptable to close this work item?"
    decision: "ACCEPTED"
    decided_by: "human (interactive)"
    decided_at: "2026-08-28"
    what_was_accepted: "REQ-004 is implemented at the dod seal only. Its 'and the DONE transition' clause is NOT implemented here. The residual seal-then-dirty window is formally carried by trusted-receipt-namespace-resolution as E-B, rather than left as an unowned gap."
    why_it_was_a_real_choice: "The alternative was to widen this work item's boundary to reach the receipt payload or work-item-protocol.js, both outside its approved scope, or to add an unhatched check at DONE that would refuse a legitimately waived close (S01-R01)."
    consequence: "Spec Coverage stays PARTIAL by design. A reviewer reading this note later sees an accepted, owned limitation - not a criterion that was quietly downgraded to make the gate pass."
what_a_human_still_decides:
  - "The DoD verdict itself: set Definition of Done.status, fill gate_reviews.dod_*, then seal the dod gate."
  - "Whether the branch may merge to main, which per branch-finish-discipline only happens after that verdict."
residual_risks:
  - id: "L-01"
    risk: "Seal-then-dirty window at the DONE transition."
    owner: "namespace work item, as E-B"
    status: "Open, blocked on this work item merging - the helpers E-B calls live on this branch."
  - id: "L-04"
    risk: "tdd-enforce writes its block reason to stdout, so the harness surfaces a block as 'No stderr output'. The block is correct; only the operator-facing reason is lost."
    owner: "unassigned - cosmetic"
    status: "Open, out of scope"
  - id: "residual-cross-file"
    risk: "workflow-gate-evidence-utils.test.js still has 2 references to a live work item in its CROSS-FILE assertion. Stable today because it reads work_item_slug, which does not change when a work item closes; breaks if that work item is renamed or archived."
    owner: "recommend folding into the F-03/F-05 test-hygiene work item"
    status: "Open, out of T7 scope by design"
  - id: "orphan-change"
    risk: "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js had an uncommitted +26/-1 change on main belonging to no work item."
    owner: "human"
    status: "CLOSED 2026-08-28. Committed on main as 626fc35 'fix(workflow-bundle): retry the approval passphrase read on EAGAIN'. Verified: git status for that path is clean. It is no longer a merge hazard for the namespace branch."
owners:
  - "qc or developer - dod verdict"
  - "po - if REQ-004 PARTIAL needs a business call"
```

## SDD Traceability
```yaml
requirement_refs:
  - "product-specs/cards/worktree-and-closure-integrity.md REQ-001..REQ-006"
acceptance_refs:
  - "worktree-and-closure-integrity.s04.acceptance-criteria.md AC-001..AC-006"
task_refs:
  - "worktree-and-closure-integrity.s06.task-breakdown.md T0..T7"
test_refs:
  - "packages/workflow-bundle/test/worktree-and-closure-integrity.test.js"
  - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
  - "packages/workflow-bundle/test/uncommitted-delivery-guard.test.js"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
  - "packages/workflow-bundle/test/wfc.test.js"
```
