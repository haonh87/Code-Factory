---
artifact_id: "worktree-and-closure-integrity.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "worktree-and-closure-integrity"
step_id: "s06"
step_slug: "task-breakdown"
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
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec:
    - "ba"
  dor:
    - "po"
    - "ba"
  approach:
    - "developer"
  task_plan:
    - "developer"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-19T06:57:49.000Z"
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-19T06:57:49.000Z"
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "worktree-and-closure-integrity.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Option Analysis
```yaml
problem: "Make three tools work under the mandatory worktree rule, and make DoD read the evidence of delivery it already has access to - without rewriting a stored report or reopening a closed work item."
options:
  - "O-A fix each at its cause, four independent changes: normalise workflow_root at comparison time; add a bin/ rule to the tdd-enforce mapping; document the verify-stage finalization requirement; add a dirty-tree check at the dod seal and the DONE transition with a reason-bearing hatch. Each is small, each lives in a different function, each is revertable alone. Cost: four fixtures, and D-D changes what DONE means so it needs the hatch designed carefully."
  - "O-B fix only the three friction defects and defer D-D: cheapest, zero risk of blocking a legitimate close. Cost: leaves the one defect that is silent. A sealed receipt can still certify a delivery that is one git clean from vanishing, which is the failure this work item exists to close."
  - "O-C make workflow_root relative in stored reports and migrate the six existing ones: gets to a single representation with no comparison-time normalisation. Cost: rewriting six reports of which four are hashed into sealed receipts. A change whose side effect is invalidating audit evidence cannot be the way to improve audit evidence. Rejected on the same ground as O-B/O-C in approval-path-defects."
recommended_option: "O-A"
trade_offs:
  - "O-A carries the only real design risk in the set - D-D's hatch. Without a hatch the check gets disabled wholesale; with too loose a hatch it is decorative. AC-004 pins it to a stated reason visible in output."
  - "O-B is genuinely smaller and was considered seriously. It fails REQ-004 and AC-004, and it leaves the only silent defect of the four in place. Rejected."
  - "O-C would be cleaner in the abstract and is rejected on evidence integrity, not on effort. Normalising at read time costs a few lines and touches nothing sealed."
rejected_reason_for_smaller: "O-B is the smaller option and is named above with the criterion it fails. No option smaller than O-B was found that closes any defect at all."
validation_before_or_during:
  - "Before touching D-D: confirm on the six existing work items that a dirty-tree check scoped to granted_write_paths produces no false positive on a legitimately clean one"
  - "Before D-A: confirm the fix leaves EDGE-003 intact - a genuinely wrong workflow_root must still be rejected"
  - "Confirm ODC-001 empirically: is granted_write_paths populated on every work item that reached ACTIVE? If not, the scope needs a fallback."
```

## Technical Approach
```yaml
recommended_approach: "Four independent fixes at their causes, each behind a failing-first fixture, in a worktree, with D-D committed last because it is the only one whose revert restores a weaker gate."
why: "It is the only option that closes all four without rewriting a stored report or reopening a closed work item, both of which are forbidden by the s04 compatibility constraints."
resolutions:
  - decision: "ODC-001 - what counts as the declared change paths for D-D"
    answer: "granted_write_paths. It is already the authoritative list for the capability guard, it is machine-readable, and it is populated at activation, which is exactly when a work item starts producing a delivery."
    fallback: "If a work item reached ACTIVE with an empty granted_write_paths, the check reports that as its own refusal rather than passing vacuously - an empty declared scope is not evidence of a clean tree."
  - decision: "ODC-002 - committed, or committed and merged"
    answer: "Committed. Merging is a release concern and blocking it would punish legitimate branch-parked work, per EDGE-002."
boundaries:
  modified:
    - "packages/workflow-bundle/scripts/validate-work-item-protocol.js - normalise workflow_root before comparing (D-A)"
    - "scripts/hooks/tdd-enforce.sh - add the bin/ mapping rule (D-B)"
    - "packages/workflow-bundle/bin/wfc.js - document the verify-stage finalization requirement (D-C)"
    - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js - dirty-tree check (D-D)"
    - "packages/workflow-bundle/scripts/workflow-gate-review.js - apply it at the dod seal (D-D)"
  created:
    - "packages/workflow-bundle/test/** and tests/fixtures/** - one fixture per defect"
  explicitly_untouched:
    - "Any stored .work-item-report.json"
    - "Receipt format, signing, digest binding, TTY and passphrase controls"
    - "The scripts/ and mcp/src/ mappings and all existing tdd-enforce exemptions"
    - "The six existing work items' artifacts"
validation_plan:
  - "AC-001: run wfc protocol from inside a worktree; plus a negative fixture with a genuinely wrong root"
  - "AC-002: two hook invocations under bin/, one with a test and one without; plus the existing exemption cases"
  - "AC-003: assert the flow text names the verify-stage requirement and precedes the verify step, mirroring the wfc.test.js pattern already in place"
  - "AC-004: clean-tree fixture passes; dirty-declared-path fixture refused; hatch-with-reason passes and the reason appears in output; hatch-without-reason refused"
  - "AC-005: four fixtures, each recorded failing first"
  - "Non-regression: 22 receipts, full unit and fixture suites, all six work items through the four validators"
```

## Brownfield Impact Analysis
```yaml
existing_behaviour_changed:
  - "wfc protocol stops failing inside a worktree. Strictly a widening of what passes, and EDGE-003 keeps the genuine-mismatch rejection."
  - "An edit under bin/ with a matching test is no longer blocked. Widening."
  - "Sealing dod or moving to DONE is refused while the declared paths are dirty. Narrowing - the only one in the set, and the reason D-D is committed last."
impacted_modules: "See Technical Approach boundaries; not restated here."
compatibility_risks:
  - risk: "D-D blocks a legitimate close."
    handling: "The reason-bearing hatch in AC-004, plus the empty-granted_write_paths refusal rather than vacuous pass."
  - risk: "D-A's normalisation is too permissive and swallows a real mismatch."
    handling: "EDGE-003 negative fixture."
  - risk: "The six existing work items behave differently under the new checks."
    handling: "GOV-Q1 resolved prospective-only. Verification asserts only that their 22 receipts stay valid."
migration_notes:
  - "None. No report rewritten, no note edited, no work item reopened."
rollback_notes:
  - "Four independent commits. D-D last, so reverting it alone restores the previous DoD behaviour without touching the three friction fixes."
```

## Artifact Chính
```yaml
implementation_goal: "Close four carried-forward defects: three where a tool assumes its environment, one where a gate does not read the evidence of what it is certifying."
tasks:
  - id: T0
    owner_role: developer
    name: "Worktree and baseline"
    objective: "Isolate, and record the pre-change numbers - including that wfc protocol is EXPECTED to fail in the worktree until D-A lands."
    paths_in_scope: [".claude/worktrees/worktree-and-closure-integrity"]
    outputs_expected:
      - "Worktree at main HEAD, gitignored, on its own branch"
      - "Baseline: unit and fixture suites, four validators, 22 receipt digests, and the git cleanliness of every work item's granted_write_paths"
    review_checkpoint: "Confirm the baseline records the expected wfc protocol failure, so its later disappearance is attributable to D-A rather than mistaken for noise."
    verification_hint: "git worktree list; git check-ignore; run the suites; loop wfc gate status over 22 receipts."
    dependencies: []
  - id: T1
    owner_role: developer
    name: "Four failing fixtures, before any fix"
    objective: "Reproduce all four symptoms."
    paths_in_scope: ["packages/workflow-bundle/test/**", "packages/workflow-bundle/tests/fixtures/**"]
    outputs_expected:
      - "D-A: wfc protocol from a worktree reports workflow_root mismatch"
      - "D-B: a bin/ file with a matching test is blocked"
      - "D-C: the flow text does not mention the verify-stage requirement"
      - "D-D: a work item with a dirty declared path can still seal dod"
    review_checkpoint: "SPEC_COMPLIANCE: each fixture asserts the recorded symptom, not a proxy. A symptom that cannot be reproduced withdraws its requirement."
    verification_hint: "AC-005. All four observed failing. Print the actual command output in each, because three false greens happened in the last work item by trusting assertions."
    dependencies: ["T0"]
    sequencing_reason: "Gates T2 to T5. Non-negotiable."
  - id: T2
    owner_role: developer
    name: "D-A normalise workflow_root at comparison"
    paths_in_scope: ["packages/workflow-bundle/scripts/validate-work-item-protocol.js", "packages/workflow-bundle/test/validate-work-item-protocol.test.js"]
    outputs_expected: ["wfc protocol passes from a worktree", "a genuinely wrong root is still rejected", "no stored report modified"]
    review_checkpoint: "SPEC_COMPLIANCE: EDGE-003 covered. CODE_QUALITY: normalisation is one helper, not inline string surgery at the call site."
    verification_hint: "AC-001. Note this file has no matching test today - the test must be created, which the tdd-enforce hook will require anyway."
    dependencies: ["T1"]
  - id: T3
    owner_role: developer
    name: "D-B add the bin/ mapping rule"
    paths_in_scope: ["scripts/hooks/tdd-enforce.sh"]
    outputs_expected: ["packages/X/bin/foo.js maps to packages/X/test/foo.test.js", "existing mappings and exemptions unchanged", "the hook header convention updated to match"]
    review_checkpoint: "SPEC_COMPLIANCE: EDGE-004 - the mapping is fixed, not the policy. CODE_QUALITY: the new rule sits beside the existing three rather than in the generic fallback."
    verification_hint: "AC-002. Test both directions plus the four exemption classes. scripts/hooks/ is exempt from tdd-enforce, so this edit is not itself blocked."
    dependencies: ["T1"]
  - id: T4
    owner_role: developer
    name: "D-C document the verify-stage finalization requirement"
    paths_in_scope: ["packages/workflow-bundle/bin/wfc.js", "packages/workflow-bundle/test/wfc.test.js"]
    outputs_expected: ["the flow names the requirement and where it applies", "assertions in the existing wfc.test.js, extending the pattern added for the activate stage"]
    review_checkpoint: "SPEC_COMPLIANCE: the text names s07 and the transition, not just the word finalize."
    verification_hint: "AC-003."
    dependencies: ["T1"]
  - id: T5
    owner_role: developer
    name: "D-D refuse to close over an uncommitted delivery"
    paths_in_scope: ["packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js", "packages/workflow-bundle/scripts/workflow-gate-review.js", "packages/workflow-bundle/test/**"]
    outputs_expected:
      - "dirty-tree check over granted_write_paths at the dod seal and the DONE transition"
      - "reason-bearing hatch, with the reason echoed into output"
      - "empty granted_write_paths refuses rather than passes vacuously"
      - "the refusal names the offending paths"
    review_checkpoint: "SPEC_COMPLIANCE: walk EDGE-001, EDGE-002 and EDGE-005. CODE_QUALITY: the hatch requires a non-empty reason and is visible - an invisible exemption is worse than no check."
    verification_hint: "AC-004. Then confirm on all six existing work items that a clean one is not falsely refused."
    dependencies: ["T1"]
    sequencing_reason: "Last, and committed last. It is the only fix that makes the tool stricter, and the only one whose revert restores a weaker gate."
  - id: T6
    owner_role: developer
    name: "Full regression and receipt integrity"
    paths_in_scope: ["work-items/worktree-and-closure-integrity/worktree-and-closure-integrity.s08.verification.md"]
    outputs_expected: ["four validators, unit, fixtures, pack-audit against T0", "22 receipt digests unchanged", "six work items still pass", "wfc protocol now passes from the worktree - the T0 expected failure is gone"]
    review_checkpoint: "SPEC_COMPLIANCE: AC-005 complete and no receipt moved."
    verification_hint: "Compare against T0 numbers, not against expectation."
    dependencies: ["T2", "T3", "T4", "T5"]
execution_order: "T0 -> T1 -> {T2, T3, T4, T5} -> T6. T2 to T5 touch disjoint files and may be committed independently; D-D last."
dependencies:
  - "T1 gates every fix"
  - "T6 compares against the T0 baseline"
handoff_points:
  - "After T1: a symptom that cannot be reproduced withdraws its requirement rather than weakening its fixture"
  - "After T5: review before T6, because it is the only narrowing change"
  - "After T6: handoff to s08 for the DoD decision - which, if D-D works, will now refuse until this work item's own delivery is committed"
delegation: "None. Six tasks, one package plus one hook, T1 gates everything."
irony_recorded: "If D-D lands correctly, this work item cannot close until its own fixes are committed. That is the intended behaviour and it is the cleanest possible acceptance test for AC-004."
```

## Verification Plan
- Per task: the `verification_hint` above is the verify path.
- Before leaving `s07`: four validators, unit, fixtures, pack-audit, six work items, 22 receipt digests.
- **`wfc protocol` from inside the worktree is expected to FAIL at `T0` and PASS at `T6`.** Recording the expected failure is what makes its disappearance evidence rather than noise.
- Risk note: `T5` is the only narrowing change and the only one that can block a legitimate close. Its hatch must require a stated reason and echo it, or the check will be disabled wholesale.
- Rollout note: none. No release, no version bump.

## Governance Checks
```yaml
checklist_applied: "project-context/checklists/default.md"
checks:
  - id: "GOV-08"
    check: "Disciplined brainstorming"
    result: PASS
    evidence: "Three options; O-B is genuinely smaller and rejected against a named criterion; O-C rejected on evidence integrity rather than effort."
  - id: "GOV-09"
    check: "Execution-oriented planning, no placeholders"
    result: PASS
    evidence: "T0 to T6 each name paths, outputs, a review checkpoint and a verify method tied to an acceptance criterion."
  - id: "GOV-10"
    check: "TDD for behaviour change"
    result: PASS
    evidence: "T1 is a separate gating task producing four failing fixtures."
  - id: "GOV-11"
    check: "Worktree"
    result: PASS
    evidence: "T0. Baseline explicitly records the expected wfc protocol failure caused by D-A."
  - id: "GOV-12"
    check: "Review early, two-tier"
    result: PASS
    evidence: "Every task carries SPEC_COMPLIANCE then CODE_QUALITY; T5 is reviewed before T6."
  - id: "GOV-13"
    check: "Subagent only for independent tasks"
    result: PASS
    evidence: "Declined. T1 gates all four fixes."
  - id: "GOV-14"
    check: "Approach and Task Plan are human gates"
    result: PENDING
    evidence: "Both receipts empty."
blocking_items:
  - "Work item approval not granted"
  - "Approach and Task Plan receipts not granted"
  - "s07 must not start until the tdd-enforce guard is verified live - S01-R04"
owner: "developer"
next_action: "Human work-item approval, then Approach and Task Plan review."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "After each of T2 to T5: full unit and fixture suite, because each is independently shippable"
  - "After T5 specifically: all six existing work items, because it is the only narrowing change"
  - "T6: everything against the T0 baseline"
compatibility_checkpoints:
  - "After T2: a genuinely wrong workflow_root is still rejected, and no stored report changed"
  - "After T3: all four tdd-enforce exemption classes still exit 0"
  - "After T5: a clean existing work item is not falsely refused"
  - "T6: 22 receipt digests unchanged"
migration_or_backfill_steps:
  - "None."
rollback_or_restore_steps:
  - "Four independent commits, D-D last. Reverting D-D alone restores the previous DoD behaviour and leaves the three friction fixes in place."
```

## SDD Traceability
```yaml
requirement_refs: []
acceptance_refs: []
task_refs: []
test_refs: []
```
