---
artifact_id: "worktree-and-closure-integrity.s07.implementation"
artifact_family: workflow-step
work_item_slug: "worktree-and-closure-integrity"
step_id: "s07"
step_slug: "implementation"
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
  - "worktree-and-closure-integrity.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> `T0`–`T7` complete on branch `codex/worktree-and-closure-integrity` (7 commits, D-D last).
> Every approved defect is fixed behind a fixture observed failing first. `T6` re-run on
> 2026-08-28: **42/42 unit files pass, 52/52 receipts digest-match, 0 `workflow_root mismatch`
> lines, all validators green — verdict PASS.** Implementation is complete; `s08` DoD is a human
> gate and is not self-declarable. `REQ-004` remains **PARTIAL** — see `known_limitations` L-01.

## Artifact Chính
```yaml
recommended_design: "Four independent fixes at their causes, each behind a failing-first fixture, in a worktree, D-D committed last."
implementation_mode: BUGFIX
tasks_completed:
  - "T0 - worktree, activation and baseline"
  - "T1 - four fixtures, all observed failing first (10 assertions RED)"
  - "T2 - D-A workflow_root normalised at comparison"
  - "T3 - D-B tdd-enforce bin/ mapping rule"
  - "T4 - D-C verify-stage finalization documented"
  - "T5 - D-D refuse to seal dod over an uncommitted delivery (committed last)"
  - "T7 / D-E - decoupled the same-note resolver assertion from live repo state"
tasks_not_started: []
t7_closure:
  unblocked_by: "The four stale receipts were re-sealed on 2026-08-26 after gate_reviews timestamps were refreshed to the actual re-review moment. spec, dor, approach and task_plan all APPROVED with digest_match=true, so T7 was implementable under an approved plan rather than a stale one."
  observed_failing_first: "workflow-gate-evidence-utils.test.js failed on 'same-note resolver must read the live P2 protocol status' - the exact symptom recorded in open_scope_decisions F-01, reproduced before any edit."
  fix: "The assertion supplies its own note in a tmpdir with protocol_status VERIFIED - a value no work item in this repo carries - so it cannot pass by coincidence if the resolver ever returns a constant."
  not_a_tautology: "Verified by writing three different values (VERIFIED, BLOCKED, MATERIALIZED) and confirming the resolver returned each one. The review checkpoint warned that deleting the check would also turn the suite green and would be the wrong answer."
  commit: "79df212 test(workflow-bundle): decouple the same-note resolver assertion from live repo state"
  suite_result: "42 unit test files, 0 failing. T0 baseline was 1 pre-existing failure; T6's 0-failing-file criterion, which AC-006 made reachable, is now met."
  residual_out_of_scope:
    what: "Two references to the live artifact-governance-enforcement note remain, in the CROSS-FILE assertion at the same file."
    why_left: "T7 paths_in_scope covers this file, but its objective is scoped to the ACTIVE dependency: 'so the suite result stops depending on which work items happen to be ACTIVE'. The cross-file assertion reads work_item_slug, which does not change when a work item closes, so it is stable today and outside what T7 was approved to change."
    risk_if_left: "It breaks if that work item is ever renamed, archived or moved. Same defect class, different trigger. Worth folding into the F-03/F-05 test-hygiene work item rather than widening a sealed task plan here."

bug_repro_evidence:
  - defect: "D-A"
    command: "node packages/workflow-bundle/bin/wfc.js protocol --workflow-root work-items --project-root . (run from inside the worktree)"
    observed: "ERROR: workflow_root mismatch in .../worktrees/worktree-and-closure-integrity/work-items/approval-path-defects/approval-path-defects.work-item-report.json"
    confirms_s01: "Reproduced verbatim, including the aggravating detail: the message names approval-path-defects, a DIFFERENT work item than the one being worked on, so it reads as data corruption rather than path resolution."
  - defect: "D-B"
    command: "bash scripts/hooks/tdd-enforce.sh < payload{tool_name:Edit, file_path:packages/workflow-bundle/bin/wfc.js}"
    observed: "exit=2. 'No test file found for packages/workflow-bundle/bin/wfc.js. Expected test file: packages/workflow-bundle/bin/test/wfc.test.js'"
    confirms_s01: "Exactly the recorded symptom. packages/workflow-bundle/test/wfc.test.js EXISTS (2990 bytes); the hook-demanded packages/workflow-bundle/bin/test/wfc.test.js does not."
    also_reproduced_live: "A real Edit on bin/wfc.js through the harness was blocked by the PreToolUse hook and did not apply - worktree stayed at 0 dirty files and the original line was intact. This doubles as the live proof for S01-R04."
    controls_run:
      - "packages/workflow-bundle/scripts/workflow-gate-review.js (has matching test) -> exit=0. The /scripts/+/packages/ rule is intact; only bin/ is broken."
      - "packages/workflow-bundle/scripts/validate-work-item-protocol.js (no test today) -> exit=2, demanding packages/workflow-bundle/test/validate-work-item-protocol.test.js. Confirms T2's verification_hint."

hypothesis_log:
  - assumption: "ODC-001 - granted_write_paths is populated on every work item that reached ACTIVE, so it is a sound scope for D-D's dirty-tree check."
    status: CONFIRMED
    evidence: "Surveyed all 6 protocol-managed reports: approval-path-defects=2, artifact-governance-enforcement=2, artifact-governance-model=2, stabilize-architecture-skill-bundle=3, worktree-and-closure-integrity=8. The only empty one is integrate-design-checklists-into-sa-ta, which is MATERIALIZED and never activated. The empty-list fallback is therefore a guard no current work item trips."
  - assumption: "A dirty-tree check scoped to granted_write_paths produces no false positive on a legitimately clean work item."
    status: CONFIRMED
    evidence: "All 4 DONE work items report dirty_entries=0 over their own declared paths. The only dirty one is this work item (3 entries), all produced by activation itself. This was the pre-condition the s06 approach required before touching D-D."
  - assumption: "The 7 unit-test files failing at first baseline run are real pre-existing defects."
    status: REJECTED
    evidence: "6 of 7 failed only because packages/workflow-bundle/runtime/ is gitignored and generated, so a fresh worktree has no runtime/ tree. After sync-workflow-bundle-runtime.js, 6 recovered. Only 1 real failure remains."
  - assumption: "Fixing validate-work-item-protocol.js (T2's approved boundary) is sufficient to make wfc protocol pass from a worktree, as T6 requires."
    status: REJECTED
    evidence: "See finding F-02. The same run emits 5 further 'Missing trusted approval receipt' errors from a second, unrelated call site. T2 as scoped closes the first error line only."

debug_experiments:
  - goal: "Separate worktree-setup noise from real failures in the baseline unit suite."
    action: "Ran run-all.js in the fresh worktree; inspected each failure; generated the gitignored runtime/ tree; re-ran."
    result: "7 failing files -> 1. The 6 recovered were all ENOENT on packages/workflow-bundle/runtime/codex/**."
  - goal: "Determine whether the surviving unit failure is caused by the worktree or pre-exists on main."
    action: "Ran packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js in the MAIN tree."
    result: "Fails identically on main. Pre-existing, not worktree-induced."
  - goal: "Find the cause of that failure rather than patching the assertion."
    action: "Read the assertion at test line 43; read the live artifact it asserts against."
    result: "The test hardcodes protocol_status == 'ACTIVE' while reading the LIVE repo file work-items/artifact-governance-enforcement/...s01.restate.md, whose protocol_status is now DONE. The test is coupled to mutable live state and broke when that work item closed."
  - goal: "Explain the 5 'Missing trusted approval receipt' errors seen only from the worktree."
    action: "Recomputed buildProjectApprovalNamespace(projectRoot) for both roots and listed the namespaces present on disk."
    result: "main -> code-factory-916d1d6e915b (exists, 43 receipts). worktree -> worktree-and-closure-integrity-e9691c40f465 (does not exist). The receipt namespace is derived from projectRoot, so from any worktree every trusted receipt is invisible."

tdd_evidence:
  - behavior: "D-A - wfc protocol must tolerate a stored absolute workflow_root from an equivalent tree"
    failing_test: "worktree-and-closure-integrity.test.js D-A group: 'protocol-from-copy exit=1 ... workflow_root mismatch'; plus validate-work-item-protocol.test.js failing with 'isEquivalentWorkflowRoot is not a function'"
    passing_test: "Both green. 20/20 unit assertions incl. 5 EDGE-003 rejections; D-A fixture group green; 0 mismatch lines from a real worktree run."
  - behavior: "D-B - an edit under packages/X/bin with a matching test must be allowed"
    failing_test: "D-B group: 'bin/wfc.js exit=2; Expected test file: packages/workflow-bundle/bin/test/wfc.test.js'"
    passing_test: "D-B group 11/11 green. bin/ file WITHOUT a test still exit=2 (EDGE-004), existing mappings and all four exemption classes unchanged."
  - behavior: "D-C - the flow must document the verify-stage finalization requirement"
    failing_test: "wfc.test.js AC-003 groups: 5 assertions RED, 'flow lines mentioning verify: (none)'"
    passing_test: "wfc.test.js fully green; D-C fixture group green; flow now carries steps 9b/9c."
  - behavior: "D-D - sealing dod must be refused over an uncommitted delivery"
    failing_test: "D-D groups: 5 assertions RED, 'seal exit=0 ... status=APPROVED' over a dirty declared path; uncommitted-delivery-guard.test.js failing with 'evaluateUncommittedDelivery is not a function'"
    passing_test: "20/20 guard unit assertions; all four D-D fixture groups green; dirty seal now exit=1 naming the offending path."

code_changes:
  - "packages/workflow-bundle/scripts/validate-work-item-protocol.js - isEquivalentWorkflowRoot, compares relative location segment-wise; exported for test (D-A)"
  - "scripts/hooks/tdd-enforce.sh - packages/X/bin/ mapping rule beside the existing sibling rules, plus header convention (D-B)"
  - "packages/workflow-bundle/bin/wfc.js - flow steps 9b/9c for the verify-stage finalization requirement (D-C)"
  - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js - evaluateUncommittedDelivery (pure rule), inspectDeclaredScopeCleanliness (git shell), readGrantedWritePaths, getUncommittedDeliveryErrors (D-D)"
  - "packages/workflow-bundle/scripts/workflow-gate-review.js - guard wired into the dod approve path, waiver echoed on its own WAIVED line (D-D)"
  - "packages/workflow-bundle/test/worktree-and-closure-integrity.test.js - NEW, four defect fixture groups"
  - "packages/workflow-bundle/test/validate-work-item-protocol.test.js - NEW, workflow_root equivalence matrix"
  - "packages/workflow-bundle/test/uncommitted-delivery-guard.test.js - NEW, D-D decision matrix without a repository"
  - "packages/workflow-bundle/test/wfc.test.js - two AC-003 groups added, extending the TD-02 pattern"
doc_changes:
  - "This note"
config_changes: []

commits:
  - "550c815 test(workflow-bundle): add failing fixtures for D-A..D-D"
  - "9f37044 fix(hooks): map packages/X/bin to packages/X/test in tdd-enforce"
  - "120395e fix(workflow-bundle): compare workflow_root by relative location"
  - "b036519 docs(workflow-bundle): document the verify-stage finalization requirement"
  - "33d31f9 test(workflow-bundle): decouple a D-B control from mutable repo state"
  - "6277243 fix(workflow-bundle): refuse to seal dod over an uncommitted delivery"
commit_order_note: "D-D is last, as s06 required: it is the only fix that makes the tool stricter, so reverting it alone restores the previous DoD behaviour and leaves the three friction fixes in place."

outputs_actual:
  - "Work item transitioned MATERIALIZED -> ACTIVE, current_step=s07, protocol_owner=developer, 8 granted_write_paths recorded"
  - "s07 note created lazily by the Light transition hook"
  - "Worktree .claude/worktrees/worktree-and-closure-integrity on branch codex/worktree-and-closure-integrity at cdd68cc"
  - "T0 baseline recorded below"

known_limitations:
  - id: "L-01"
    scope: "REQ-004 is PARTIAL against its own wording"
    detail: "REQ-004 asks for the check 'at the dod seal AND the DONE transition'. It is implemented at the dod seal only. DONE is protected transitively - it already requires an APPROVED dod receipt digest-matched to the s08 note, so it cannot be reached without passing the seal guard. A residual seal-then-dirty window remains: seal dod on a clean tree, dirty the declared paths, then transition to DONE."
    why_not_closed: "Closing it needs a hatch at the DONE transition. The waiver would have to travel either in the receipt payload (workflow-trusted-approval-utils.js, listed in s06 explicitly_untouched as receipt format) or through work-item-protocol.js (not in granted_write_paths). Both are outside the approved boundary. An unhatched check at DONE was rejected because it would refuse a legitimately waived close, which is S01-R01."
    recommendation: "Fold into the same follow-up work item as F-02 - both are boundary-adjacent and both concern the same files."
  - id: "L-02"
    scope: "The guard is silent outside a git repository"
    detail: "A non-git project has no history a delivery could be missing from, so the guard returns no error and reports not_a_git_repo. Deliberate: the alternative would refuse every non-git project, and would have broken existing fixtures that seal gates in plain temp dirs."
  - id: "L-03"
    scope: "Fresh-worktree setup"
    detail: "packages/workflow-bundle/runtime/ is gitignored and generated, so a fresh worktree fails 6 unit files until sync-workflow-bundle-runtime.js is run. Not a defect. Worth a line in the worktree baseline of future work items."
  - id: "L-04"
    scope: "tdd-enforce block message is invisible to the operator"
    detail: "The hook writes its explanation to stdout, so the harness surfaces a block as 'No stderr output'. The block is correct; only the reason is lost. Cosmetic, out of scope, not fixed."

follow_up_items:
  - "F-02 - the trusted-receipt namespace is derived from projectRoot, so from any worktree all 43 receipts are invisible. Decided: own work item. NOT fixed here."
  - "L-01 - the seal-then-dirty window at the DONE transition. Recommend folding into the F-02 work item."
  - "D-E / F-01 - proposed as a 5th defect and accepted in principle; needs a task_plan amendment and re-seal before implementation."
  - "The orphan uncommitted change on main described below belongs to no work item and needs a human decision."

notes_for_testing: "Compare against the T0 numbers in this note, not against the s06 text. s06 says '22 receipt digests'; measured reality is 34 gate receipts / 43 total. Until D-E lands, the unit-suite baseline is 1 failing file (workflow-gate-evidence-utils.test.js, F-01), not 0. The four D-D fixtures need git available; they --no-verify their commits because the operator's global commit-msg hook enforces Conventional Commits."
```

## T0 Baseline
```yaml
measured_at: "2026-08-19 (session after restart)"
worktree:
  path: ".claude/worktrees/worktree-and-closure-integrity"
  branch: "codex/worktree-and-closure-integrity"
  base_commit: "cdd68cc"
  base_ref_used: "local main (NOT origin/main, which is behind)"
  gitignored: "yes - .gitignore:29 .claude/worktrees/"
  dirty_at_creation: 0

validators_main_tree:
  validate: "exit=0 - naming 156 files, governance 152 notes"
  sdd: "exit=0 - 32 note files"
  change: "exit=0 - with a pre-existing WARNING: legacy change package CHANGE-003"
  exec: "exit=0 - 152 note files"
  plan: "exit=0 - 152 note files"
  protocol: "exit=0 - 6 protocol-managed work items, 16 legacy skipped"
  fixtures: "exit=0 - 10 governance fixture cases, incl. 1 EXPECTED_FAIL invalid-s07-rule-evidence"
  pack_audit: "exit=0"

unit_suite_worktree:
  before_runtime_build: "7 files failed"
  after_runtime_build: "1 file failed"
  baseline_failure: "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js - 'same-note resolver must read the live P2 protocol status'"
  baseline_failure_is_preexisting_on_main: true

receipts:
  total_on_disk: 43
  gate_receipts: 34
  change_receipts: 3
  work_item_receipts: 6
  digest_match_true: 34
  digest_match_false: 0
  note: "s06 says '22 receipt digests'. That number is stale - 8 more gate receipts were sealed since it was written. T6 compares against 34/43."

granted_write_paths_survey:
  approval-path-defects: "DONE, 2 paths, dirty=0"
  artifact-governance-enforcement: "DONE, 2 paths, dirty=0"
  artifact-governance-model: "DONE, 2 paths, dirty=0"
  stabilize-architecture-skill-bundle: "DONE, 3 paths, dirty=0"
  integrate-design-checklists-into-sa-ta: "MATERIALIZED, 0 paths, n/a"
  worktree-and-closure-integrity: "ACTIVE, 8 paths, dirty=3 (all from activation itself)"

expected_failure_recorded:
  what: "wfc protocol run from inside the worktree"
  status_at_T0: "FAIL"
  expected_status_at_T6: "PASS"
  why_recorded: "So its later disappearance is attributable to the D-A fix rather than mistaken for noise."
  caveat: "See F-02 - the run emits SIX error lines, only ONE of which T2's approved boundary addresses."

s01_R04_tdd_enforce_live:
  status: RESOLVED
  evidence: "CF_HOOK_PROFILE unset (-> strict), CF_DISABLED_HOOKS unset, hook registered PreToolUse Edit|Write in .claude/settings.json:23. Verified LIVE, not just configured: a real Edit on bin/wfc.js through the harness was blocked and did not apply."
  wrinkle: "The harness surfaced the block as 'No stderr output' because the hook writes its explanation to stdout. The block is correct; only the operator-facing reason is lost. Cosmetic, not in scope."

s01_R03_worktree_contention:
  status: RESOLVED
  evidence: "artifact-governance-enforcement worktree is now clean (0 files) and its branch is fully merged into main (rev-list --left-right --count main...HEAD = '2 0', merge 570cb90). The 51 uncommitted files measured in s01 no longer exist, so a fourth worktree adds no contention."
```

## Human Decisions Taken
```yaml
decisions:
  - id: "F-02"
    decided: "Option A - narrow T6, file the namespace defect as its own work item."
    decided_by: "human (interactive, this session)"
    consequence: "T2 fixed only validate-work-item-protocol.js. T6's D-A criterion became 'the workflow_root mismatch line is gone' rather than 'wfc protocol exits 0'. Verified: 0 mismatch lines. No boundary breached, no gate amendment needed."
    still_open: "The namespace work item has NOT been created yet - it needs an s01 like any other."
  - id: "F-01"
    decided: "Option B - adopt as a 5th defect D-E, fixing the coupling by pointing the assertion at a fixture instead of a live artifact."
    decided_by: "human (interactive, this session)"
    consequence: "AMENDMENT-001 is now WRITTEN. Four receipts went stale as predicted - spec and dor (host s04), approach and task_plan (host s06). Verified scoped: exactly 4 stale, 30 other receipts still digest_match=true, 0 errors naming any other work item."
    amendment_written:
      - "product-specs/cards/...md - REQ-006 + AC-006 (provenance BASELINE; DISCOVERED is not a valid value and was rejected by `wfc sdd`, then corrected)"
      - "s04 - AC-006 in acceptance_ids, an `amendments:` block recording the alternatives and who decided, and a corrected `done_when` (22 -> 34 receipts; the D-A criterion narrowed per F-02; a 0-failing-file target that AC-006 makes reachable)"
      - "s06 - task T7 with its own review checkpoint and verify path, plus an `execution_order_correction` recording that T3 must precede T4"
    implementation_status: "D-E is NOT implemented. Implementing under a stale task_plan receipt would be implementing an unapproved plan item."
    next_human_action: "Refresh `gate_reviews.*_reviewed_at` in s04 and s06 to the actual re-review moment, then re-seal all four gates in an interactive TTY. Commands in the handoff. Only then is T7 implementable."
    integrity_note: "The existing gate_reviews timestamps predate AMENDMENT-001. Re-sealing without refreshing them would leave the notes attesting to a review that happened before the change it covers. Deliberately not edited here - filling in a human review time is not the agent's to do."
```

## Open Scope Decisions
```yaml
open_scope_decisions:
  - id: "F-01"
    title: "Pre-existing unit failure in a file this work item must edit"
    where: "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js:43"
    what: "The assertion hardcodes protocol_status == 'ACTIVE' but reads the LIVE artifact work-items/artifact-governance-enforcement/...s01.restate.md, which is now DONE. A test coupled to mutable live repo state; it broke when that work item closed and will break again whenever any referenced work item advances."
    pre_existing: "Yes - fails identically on main. Not caused by this work item or by the worktree."
    why_it_matters_here: "It sits inside granted_write_paths (packages/workflow-bundle/test) and inside T5's declared paths, so T5 cannot leave the suite green without touching it. It also makes 'unit suite passes' an invalid T6 criterion unless the baseline is stated as 1 failure."
    options:
      - "A - leave it. Record 1 failing file as the T0 baseline and require T6 to match exactly 1, not 0. Zero scope drift; the suite stays red."
      - "B - bring it in as a 5th defect (D-E) under this work item, fixing the coupling by pointing the assertion at a fixture instead of a live artifact. Needs a task_plan amendment and a re-seal of the task_plan gate."
      - "C - split it into its own work item. Cleanest governance, slowest."
    recommendation: "B. It is the same class as D-A..D-C - a test assuming the shape of its environment instead of controlling it - and leaving a red suite makes T6's non-regression evidence weaker for the sake of avoiding one gate amendment."
    blocking: "Not blocking T1/T3/T4. Blocking a clean T6."

  - id: "F-02"
    title: "T2's approved boundary cannot satisfy T6's acceptance criterion"
    what: "T6 requires 'wfc protocol now passes from the worktree'. Running it from the worktree emits SIX errors: 1 workflow_root mismatch (which T2 fixes) and 5 'Missing trusted approval receipt'. The second cluster has a different cause: buildProjectApprovalNamespace() derives the receipt directory from projectRoot, so a worktree looks up a namespace that does not exist."
    evidence: "main -> code-factory-916d1d6e915b (exists, 43 receipts). worktree -> worktree-and-closure-integrity-e9691c40f465 (absent). Computed directly from the same algorithm, and confirmed against the namespaces present on disk."
    class: "Identical to the unifying diagnosis in s01 - a tool resolves against the wrong tree - but at a call site s06 never enumerated."
    boundary_conflict:
      - "The file is packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"
      - "It is NOT in granted_write_paths"
      - "s06 explicitly_untouched lists 'Receipt format, signing, digest binding, TTY and passphrase controls'. Namespace resolution is arguably none of those four, but it lives in that file, and the intent of the exclusion was to keep receipt trust machinery out of scope."
    options:
      - "A - narrow T6. Redefine its criterion as 'the workflow_root mismatch error is gone', accept that wfc protocol still fails from a worktree, and log the namespace defect as a new work item. Honest, no boundary breach, but the worktree rule stays half-broken and D-A's user-visible symptom is only half closed."
      - "B - extend scope to the namespace resolution, amend the s06 boundary and granted_write_paths, re-seal approach + task_plan. Closes the symptom D-A actually describes. Touches a file the approach fenced off."
      - "C - fix D-A only, and separately make the receipt root overridable per worktree via the existing WORKFLOW_BUNDLE_APPROVAL_ROOT env var as an operator workaround rather than a code change."
    recommendation: "A, with the namespace defect raised as its own work item. B breaches a fence the approach set deliberately around receipt trust machinery, and the whole point of this work item is that shortcuts around governance are what produced these four defects. C is a workaround that hides a real path-resolution bug behind operator discipline."
    blocking: "Blocking T1's D-A fixture design (the fixture's assertion differs per option), T2's definition of done, and T6."
```

## Working-Tree State On Main
```yaml
deliberate_change_mirrored_to_main:
  file: "scripts/hooks/tdd-enforce.sh"
  what: "The D-B fix, byte-identical to the version committed on the branch (9f37044)."
  why: "The live harness runs ${CLAUDE_PROJECT_DIR}/scripts/hooks/tdd-enforce.sh - the MAIN tree copy - so with the fix only on the branch, every Edit to bin/wfc.js stayed blocked and T4 could not be done through the normal tool path. Verified before and after: main hook exit=2 -> exit=0 on the same payload."
  why_not_worked_around: "The alternatives were worse: writing the file through Bash to dodge a PreToolUse guard, or disabling tdd-enforce wholesale for the session. Both defeat the guard this work item exists to strengthen."
  in_declared_scope: "Yes - scripts/hooks/tdd-enforce.sh is in granted_write_paths."
  merge_note: "It will be superseded by the branch merge. Because the content is identical there is no semantic conflict, but git may refuse to merge over a locally modified file - run `git checkout -- scripts/hooks/tdd-enforce.sh` on main first if it complains."
  merge_note_measured_2026_08_26: "It does refuse, and the reason is narrower than the note assumed. Content is byte-identical to the branch copy; the ONLY difference is the file mode - 100644 on the branch, 100755 in the main working tree, because the mirrored copy was made executable. That is still a tracked change, so `git merge codex/worktree-and-closure-integrity` aborts with \"Your local changes to the following files would be overwritten by merge\". Run `git checkout -- scripts/hooks/tdd-enforce.sh` immediately before the merge, not earlier: main HEAD does not carry the D-B fix, so discarding the working copy ahead of time re-breaks the live hook until the merge lands."

orphan_change_found_on_main:
  file: "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"
diff: "+26/-1 - retries fs.readSync on EAGAIN in the hidden-passphrase prompt, with a sleepMs helper using Atomics.wait"
belongs_to: "No work item. It appears in no work item's granted_write_paths."
why_it_exists: "Almost certainly written to unblock the interactive `wfc gate approve` prompt on this machine - EAGAIN on a raw-mode stdin read on macOS."
assessment: "Functionally plausible and currently load-bearing: reverting it may break gate approval in this environment. But it is production code with no work item, no test and no gate - the exact pattern this work item exists to make visible."
recommendation: "Do not silently absorb it into this work item's commits. Either commit it as its own small tooling fix with a test, or park it. Decision belongs to a human."
interaction_with_D_D: "It is NOT inside any granted_write_paths, so the D-D dirty-tree check as designed would not flag it. Worth noting as a genuine gap in D-D's coverage model: an orphan change belongs to no declared scope and is therefore invisible to a scope-based check."
```

## T6 Verification Against The T0 Baseline
```yaml
run_at: "2026-08-28, after T7/D-E landed and the four gates were re-sealed"
run_from: "branch codex/worktree-and-closure-integrity @ 79df212, worktree clean (0 dirty files)"

unit_suite:
  at_T0: "1 file failed - workflow-gate-evidence-utils.test.js (pre-existing, F-01)"
  after_T5: "1 file failed - the same one"
  now: "42 unit test files, 0 failing, exit 0"
  verdict: "PASS. The T0 baseline of 1 failure is closed by T7/D-E, so AC-006's 0-failing-file target is met - the criterion AMENDMENT-001 added precisely to make this reachable."

validators_branch_tree:
  validate: "exit=0 - naming 147 files, governance 143 notes"
  sdd: "exit=0 - 31 note files"
  change: "exit=0 - same pre-existing CHANGE-003 legacy WARNING as T0, unchanged"
  exec: "exit=0 - 143 note files"
  plan: "exit=0 - 143 note files"
  fixtures: "exit=0 - 10 governance fixture cases"
  pack_audit: "exit=0"
  verdict: "PASS. Counts are lower than main because main carries newer work items the branch has not merged; not a regression."

receipts:
  at_T0: "34 gate receipts, 34 digest_match=true, 43 total on disk"
  now: "52 gate receipts, 52 digest_match=true, 0 stale. 9 work-item + 5 change = 66 total on disk."
  growth_explained: "Other work items sealed gates between T0 and now. The count moving is expected; what matters is that nothing already sealed lost validity."
  verdict: "PASS. 0 stale. ASM-001 held - no stored report was rewritten and no receipt moved."

expected_failure_resolved:
  what: "wfc protocol run from inside the worktree"
  at_T0: "FAIL - workflow_root mismatch was the FIRST error, and it named a different work item"
  now: "workflow_root mismatch lines: 0"
  verdict: "PASS against the criterion as narrowed by decision F-02."
  still_failing: "exit=1 with 31 errors, all of them the trusted-receipt namespace cluster."
  why_that_is_correct_here: "The namespace defect is out of this work item's approved boundary by decision F-02 and is owned by trusted-receipt-namespace-resolution, whose fix is committed on its own branch and not merged into this one. Measuring it here would be measuring another work item's delivery."

t6_verdict: PASS
t6_verdict_scope: "T6 only - regression and receipt integrity. It is not a DoD verdict and does not close the work item."

not_run:
  - "The release/install smoke set. It was not in the T0 baseline either, so there is no baseline to compare against."
  - "s08 DoD - a human gate, not self-declarable."

merge_readiness_risk:
  observed: "The branch is 13 commits behind main (7 branch-only commits ahead)."
  why_it_matters: "T6 proves the branch does not regress against its own baseline. It does not prove the branch merges cleanly onto today's main, which has moved since cdd68cc."
  recommendation: "Belongs to s08 / branch-finish-discipline, not to T6. Merge main into the branch and re-run this suite before the DoD verdict, so the numbers being certified are the ones that will actually land."
  known_touchpoint: "scripts/hooks/tdd-enforce.sh is modified in main's working tree with byte-identical content to the branch commit 9f37044. Content is the same, so there is no semantic conflict, but git may refuse to merge over a locally modified file - run `git checkout -- scripts/hooks/tdd-enforce.sh` on main first if it complains."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/worktree-and-closure-integrity.test.js"
  - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
  - "packages/workflow-bundle/test/uncommitted-delivery-guard.test.js"
  - "packages/workflow-bundle/test/wfc.test.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
tdd_cycle_evidence: "Every one of the four defects was observed failing first with real printed command output, before any fix. T1 was committed as its own commit (550c815) ahead of all four fixes, so the RED state is in git history rather than asserted in prose."
tdd_guard_verified_live: "YES - a real Edit on bin/wfc.js was blocked by the PreToolUse hook and did not apply (worktree stayed at 0 dirty files). S01-R04 closed with live evidence, not configuration reading."
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/worktree-and-closure-integrity @ codex/worktree-and-closure-integrity (base cdd68cc, 6 commits)"
worktree_reason: "Required by the approved T0. Touches 5 files across a published package plus a live governance hook; D-D narrows a gate that 4 closed work items already passed."
review_status: COMPLETED
review_refs:
  - "T0: baseline records the EXPECTED wfc protocol failure. Satisfied, and extended - the run revealed the failure has two independent causes (F-02)."
  - "T1 SPEC_COMPLIANCE: each fixture asserts the recorded symptom, not a proxy. All four reproduced verbatim from s01, including D-A's aggravating detail that the error names a different work item."
  - "T2 SPEC_COMPLIANCE: EDGE-003 covered by 5 explicit rejection cases. CODE_QUALITY: one exported helper, not inline string surgery at the call site - as s06 required."
  - "T3 SPEC_COMPLIANCE: EDGE-004 holds - a bin/ file with no test is still blocked, so the mapping was fixed and not the policy. CODE_QUALITY: the new rule sits beside the existing sibling rules, not in the generic fallback."
  - "T4 SPEC_COMPLIANCE: the flow text names s07 and the transition, not merely the word finalize."
  - "T5 SPEC_COMPLIANCE: EDGE-001, EDGE-002 and EDGE-005 walked; the ODC-001 empty-scope fallback refuses rather than passing vacuously. CODE_QUALITY: the hatch requires a non-empty reason and is echoed on its own WAIVED line - an invisible exemption is worse than no check."
  - "Self-caught during T5 wiring: the guard was first placed in sealGateReceipt, which the dod approve path never calls, so it would have been dead code. Moved to the runCli approve path and re-verified against the behavioural fixture rather than trusting the unit test."
  - "Self-caught after T2: a D-B control asserted that a real script had no test, and T2 then gave that script a test. Repointed to a controlled input and called out as the same brittleness class as F-01."
spec_compliance_status: PARTIAL
spec_compliance_note: "REQ-001, REQ-002, REQ-003 fully met. REQ-004 met at the dod seal; PARTIAL against its 'and the DONE transition' clause - see known_limitations L-01. T6's D-A criterion was narrowed by decision F-02."
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs:
  - "s06 declined delegation: T1 gates all four fixes. Unchanged - no subagent used."
merge_path: "codex/worktree-and-closure-integrity -> main, only after s08 DoD per branch-finish-discipline. NOT finalized in this session."
verify_path:
  - "Per-task verification_hint in s06 - all executed"
  - "T6 comparison against the T0 numbers - recorded above"
  - "Remaining: s08 DoD (human gate)"
```

## Worktree Decision
```yaml
worktree_target: "worktree-and-closure-integrity - D-A..D-D"
planning_track: quick
risk_signals:
  - "Touches a published package (workflow-bundle v2.5.0) and a live governance hook"
  - "D-D narrows a gate that 4 already-closed work items passed under the looser rule"
  - "3 other worktrees exist on the same repo"
  - "The work spans a session restart already"
worktree_decision: REQUIRED
decision_reason:
  - "Mandated by the approved s06 T0 and GOV-11; not re-derived here"
  - "D-D is the only narrowing change in the set, so its blast radius must be revertable in isolation"
isolation_strategy:
  branch_name: "codex/worktree-and-closure-integrity"
  worktree_path: ".claude/worktrees/worktree-and-closure-integrity"
  worktree_path_inside_repo: true
  owned_paths:
    - "packages/workflow-bundle/scripts/validate-work-item-protocol.js"
    - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
    - "packages/workflow-bundle/scripts/workflow-gate-review.js"
    - "packages/workflow-bundle/bin/wfc.js"
    - "packages/workflow-bundle/test"
    - "packages/workflow-bundle/tests/fixtures"
    - "scripts/hooks/tdd-enforce.sh"
    - "work-items/worktree-and-closure-integrity"
  expected_duration: "one to two sessions"
execution_guards:
  - "Base off LOCAL main, not origin/main - origin/main is behind"
  - "Run sync-workflow-bundle-runtime.js in the worktree before trusting the unit suite; runtime/ is gitignored"
  - "Workflow notes are authored in the MAIN tree (work-items/ is where wfc resolves and where receipts are namespaced); code changes live in the worktree. Do not let the two drift."
  - "Four independent commits, D-D last"
skip_reason: ""
cleanup_preconditions:
  - "s08 DoD verdict recorded"
  - "F-01 and F-02 resolved or explicitly deferred by a human"
  - "Receipt digests still matching after all fixes"
  - "Per branch-finish-discipline: no cleanup, merge or removal before the DoD verdict"
notes_for_implementation: "T1 cannot be written until F-02 is decided - the D-A fixture asserts a different thing under each option."
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-001 (D-A) -> T2"
  - "REQ-002 (D-B) -> T3"
  - "REQ-003 (D-C) -> T4"
  - "REQ-004 (D-D) -> T5 - PARTIAL, see known_limitations L-01"
  - "REQ-005 (failing-first fixtures) -> T1"
  - "REQ-006 (D-E, added by AMENDMENT-001) -> T7"
acceptance_refs:
  - "AC-001 -> D-A fixture group + validate-work-item-protocol.test.js (20/20, incl. 5 EDGE-003 rejections)"
  - "AC-002 -> D-B fixture group (11/11, incl. EDGE-004 and all four exemption classes)"
  - "AC-003 -> wfc.test.js AC-003 groups + D-C fixture group"
  - "AC-004 -> D-D fixture groups + uncommitted-delivery-guard.test.js (20/20)"
  - "AC-005 -> all four symptoms observed failing first; T1 committed as 550c815 ahead of every fix"
  - "AC-006 -> 42 unit files, 0 failing (T0 baseline was 1)"
task_refs:
  - "T0 550c815-precursor (worktree + baseline) | T1 550c815 | T3 9f37044 | T2 120395e | T4 b036519 | T5 6277243 | T7 79df212"
  - "33d31f9 - test hygiene, decoupled a D-B control from mutable repo state"
test_refs:
  - "packages/workflow-bundle/test/worktree-and-closure-integrity.test.js"
  - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
  - "packages/workflow-bundle/test/uncommitted-delivery-guard.test.js"
  - "packages/workflow-bundle/test/wfc.test.js"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
coverage_gap:
  - "REQ-004's 'and the DONE transition' clause has no test here, because it is not implemented here. L-01 records why and hands it to trusted-receipt-namespace-resolution as E-B."
```
