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
  dod_reviewed_by: []
  dod_reviewed_at: ""
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
    narrowed_by: "F-02, recorded in s07. The criterion is 'the mismatch line is gone', not 'wfc protocol exits 0'. The run still reports 26 Missing-receipt errors, which are the namespace defect - a different work item, delivered separately on codex/trusted-receipt-namespace-resolution."
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
status: ""
status_note: "DELIBERATELY UNSET. An agent may gather evidence and give a technical verdict; it may not pass DoD. A human sets this field, fills gate_reviews.dod_reviewed_by and _reviewed_at, then seals the dod gate - in that order, because sealing first and editing after invalidates the receipt."
evidence_is_complete: true
what_a_human_still_decides:
  - "Whether REQ-004 being PARTIAL is acceptable to close this work item, given L-01 is owned by another work item that has its own sealed gates."
  - "Whether the branch may merge, which per branch-finish-discipline only happens after this verdict."
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
    risk: "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js has an uncommitted +26/-1 change on main belonging to no work item. The namespace branch modifies the same file, so this is a merge conflict waiting to happen."
    owner: "human"
    status: "Open, and now on the critical path for the merge order"
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
