---
artifact_id: "decouple-tests-from-tree-layout.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "decouple-tests-from-tree-layout"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: FEATURE
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
  card: "product-specs/cards/decouple-tests-from-tree-layout.md"
spec_status: draft
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
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "decouple-tests-from-tree-layout.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Light hosts Option Analysis, Approach, Brownfield Impact and Task Plan here. Three tasks,
> `T1` gated on `OQ-1`. Test-only, no worktree - the change is two files finished in one
> session with no conflict risk against either open branch.

## Artifact Chính
```yaml
tasks:
  - id: T0
    owner_role: developer
    name: "Two-tree baseline"
    objective: "Record the failing-file count and both target files' verdicts from the main tree AND from a worktree, because the whole defect is that these two numbers differ."
    paths_in_scope:
      - "work-items/decouple-tests-from-tree-layout"
    outputs_expected:
      - "run-all.js failing-file count from each tree"
      - "release-rollback-smoke.test.js verdict from each tree"
      - "grep count of live work-item references in workflow-gate-evidence-utils.test.js"
    review_checkpoint: "Confirm the baseline is recorded per tree, not as one number. Recording a single number is the mistake that made both preceding work items re-measure."
    verification_hint: "node packages/workflow-bundle/test/run-all.js in each tree; node packages/workflow-bundle/test/release-rollback-smoke.test.js in each tree; grep -c for work-items/ paths."
    dependencies: []
  - id: T1
    owner_role: developer
    name: "G-A - locate the rollback artifact without depending on what sits beside the repo"
    objective: "Make release-rollback-smoke.test.js give one verdict everywhere, keeping the identity comparison and the negative case."
    paths_in_scope:
      - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
    outputs_expected:
      - "Observed failing first FROM THE MAIN TREE, which is where it is currently red"
      - "The rollback artifact resolved by a means that does not read repoRoot/.."
      - "A negative case proving the test still fails when the artifact is genuinely absent"
    review_checkpoint: "SPEC_COMPLIANCE: AC-001. The fix must not be a skip-if-missing, and must not assert something trivially true. CODE_QUALITY: if a fixture tarball is built, build and clean it up in the test, matching the tmpdir pattern already used in this package."
    verification_hint: "Run the file from both trees and compare verdicts. Then perturb the artifact location in a scratch copy and confirm red."
    dependencies: ["T0"]
    blocked: false
    status: SUPERSEDED
    superseded_2026_08_28:
      by: "a9888a9 fix(release): separate rollback source preflight - a peer session's release work, not this work item"
      what_changed: "release-rollback-smoke.test.js no longer depends on what sits beside the repo. It now branches on WORKFLOW_BUNDLE_CANDIDATE_TARBALL: set -> runExactRollback against a supplied artifact; unset -> runSourcePreflight, which needs no retained tarball at all. CI supplies the artifact by packing it IN-JOB, via the separate `Pack, install, and smoke the exact candidate artifact` step."
      measured:
        repo_root_traversal: "GONE. repoRoot is path.resolve(__dirname, '..', '..', '..') - the repo root itself. No repoRoot/.. lookup remains; grep for '..' traversal returns only that one line."
        verdict_from_main_tree: "exit 0"
        verdict_from_a_second_tree: "exit 0"
        method: "Created a throwaway detached worktree at the same commit, ran the file in both, compared. Equal verdicts - which is AC-003's criterion for this file."
      consequence_for_this_work_item: "REQ-001 / AC-001 / G-A is satisfied, by someone else. T1 has nothing left to do. Kept visible as SUPERSEDED rather than deleted, matching how this note kept its own wrong OQ-1 recommendation visible - the reversal is the useful part."
      consequence_for_OQ_2: "MOOT. OQ-2 asked whether CI should gate on a retained release binary. Answered in practice: it gates on an artifact PACKED IN-JOB, so nothing is retained beside the repo and no fetchable home is needed. The po/devops call the DoR was blocked on has been resolved by implementation rather than by decision."
      not_claimed_by_this_work_item: "This is not a delivery by this work item. It is a defect that stopped existing while the plan waited on a human answer."
  - id: T2
    owner_role: developer
    name: "G-B - fixture the cross-file resolver assertion"
    objective: "Remove the last two reads of a live work item note, keeping cross-file resolver coverage."
    paths_in_scope:
      - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
    outputs_expected:
      - "A fixture pair - a current file and a target file - written by the test itself"
      - "Cross-file resolution still asserted, against a value the fixture chooses"
      - "grep for live work-item paths in this file returns 0"
    review_checkpoint: "SPEC_COMPLIANCE: AC-002. Mirror what D-E did for the same-note case in this same file, including its lesson - prove the resolver actually reads by writing more than one value, so the assertion cannot pass against a constant."
    verification_hint: "Run the file; grep -c live work-item paths must be 0, baseline 2. Then re-run the whole suite."
    dependencies: ["T0"]
  - id: T3
    owner_role: developer
    name: "Two-tree regression"
    objective: "Show AC-003 directly: the same failing-file count from both trees."
    paths_in_scope:
      - "work-items/decouple-tests-from-tree-layout"
    outputs_expected:
      - "run-all.js count from both trees, recorded side by side"
      - "A statement of which criteria closed and which deferred"
    review_checkpoint: "SPEC_COMPLIANCE: compare against T0's recorded numbers, never against what this note predicts."
    verification_hint: "run-all.js in both trees; the two counts must be equal. If they are equal but non-zero, say what still fails and why - equality is the criterion, not zero."
    dependencies: ["T2"]

dependencies:
  - "T0 -> T2 -> T3 runs with nothing outstanding"
  - "T1 is SUPERSEDED as of 2026-08-28 - see T1.superseded_2026_08_28. It needs no answer to OQ-2 because OQ-2 is moot."
  - "History of this line, kept because it shows the plan drifting twice: it first said 'T1 additionally needs OQ-1 answered'; the reversal commit answered OQ-1 and raised OQ-2 but updated only T1.dependencies, leaving this summary stale; then the underlying defect was fixed elsewhere, retiring both questions."
  - "Live work remaining: T0 -> T2 -> T3, none blocked."
  - "T2 and T1 touch different files and may commit in either order"

delegation_decision:
  mode: agentic
  subagent: false
  reason: "Two files, three sequential-ish tasks, one of them externally blocked. No pair has disjoint ownership worth splitting."

worktree_decision:
  status: NOT_REQUIRED
  reason: "Two test files, no production code, finishable in one session, no conflict risk - neither open branch touches these paths. Per the worktree rule this is the small-and-quick case where a worktree may be skipped, and the reason is recorded rather than assumed."
  caveat: "T0 and T3 still need A SECOND TREE to run in, because the criterion is a two-tree comparison - the whole defect is that one suite gives two different answers depending on which tree runs it."
  caveat_invalidated_2026_08_28:
    was: "Any existing worktree serves; none needs to be created for this work item."
    now: "FALSE. All four worktrees were removed today under branch-finish-discipline after worktree-and-closure-integrity and trusted-receipt-namespace-resolution closed DONE. `git worktree list` shows main only."
    consequence: "T0 and T3 must now CREATE a throwaway second tree rather than borrow one. That does not change worktree_decision - this work item still needs no worktree of its own for isolation - but the plan can no longer assume a tree is lying around."
    concrete: "git worktree add --detach .claude/worktrees/tmp-two-tree-check HEAD -> run the comparison -> git worktree remove <path> --force. It exists only to be a second path for the same commit, so it takes no branch of its own."
    command_was_wrong_first_time: "The obvious form, `git worktree add <path> main`, FAILS: 'fatal: main is already used by worktree at <repo>' - the primary worktree already has main checked out. --detach HEAD is the form that works. Verified by running both, because an untested command in a plan is exactly the kind of thing the implementer pays for."
    disclosure: "This was invalidated by the same agent that wrote it, one hour later, by cleaning up the worktrees. Recorded rather than silently repaired, because a plan that quietly stops matching the machine is how both preceding work items got their defects."
```

## Option Analysis
```yaml
goal: "OQ-1 - how should release-rollback-smoke.test.js obtain the v2.5.0 rollback artifact?"
status: "ANSWERED 2026-08-27 by measurement, which rejected the recommendation this block originally carried."
measurement_that_decided_it:
  digest_is_real: "retainedRollbackDigest 36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec matches workflow-bundle-2.5.0.tgz byte for byte."
  where_the_artifact_lives: ".claude/worktrees/artifact-governance-enforcement/packages/workflow-bundle/ - inside a gitignored worktree."
  tracked_in_git: "No. .gitignore:30 excludes packages/workflow-bundle/*.tgz and git tracks zero .tgz files."
  rebuildable: "No. The package is at 2.6.0; the rollback target is 2.5.0."
  ci_runs_it: "workflow-guardrails.yml:210 runs the unit suite, which includes this file."
options:
  - "Opt-A: build a fixture tarball in a tmpdir and point the test at it - REJECTED BY EVIDENCE"
  - "Opt-B: resolve the artifact from a known path inside the repo - REJECTED BY EVIDENCE"
  - "Opt-C: declare the artifact location explicitly and handle its absence deliberately"
recommended_option: "Opt-C"
correction_notice: "This block first recommended Opt-A on reasoning alone, and called Opt-C the weakest of the three. Measurement reversed that. The original recommendation is left visible above rather than quietly swapped, because the reversal is the useful part."
trade_offs:
  - "Opt-A is not merely worse, it is impossible without gutting the check: a fixture tarball has a different digest, so adopting it means editing retainedRollbackDigest, and a digest you rewrite to match whatever you built asserts nothing."
  - "Opt-B has nothing to relocate. The artifact is not in the repository and .gitignore:30 says that is deliberate, not an oversight."
  - "Opt-C keeps the environmental dependency, which is exactly why this block rejected it first. The difference measurement makes: the dependency is real and unavoidable, so the honest move is to DECLARE it rather than to hide it behind a relative path that happens to resolve on one machine."
  - "Opt-C splits into two shapes and choosing between them is OQ-2, a po/devops call: declare a fetchable home for the retained artifact and fail loudly when it is missing, or move the check out of the unit suite into a release lane that runs where the artifact exists."
what_the_current_code_does_wrong_under_any_option:
  - "path.resolve(repoRoot, '..', <a worktree name>, ...) encodes one developer's directory layout as a test dependency."
  - "The worktree name in that path has ALREADY been hand-edited once - it was stabilize-architecture-skill-bundle-v2.4.0 and is now artifact-governance-enforcement, changed in 26591a2 when the rollback target moved. It will need editing again at the next release. That maintenance cost is the defect, independent of OQ-2."
```

## Technical Approach
```yaml
recommended_approach: "Each test builds or points at input it controls. G-B follows the shape D-E already proved in the same file: write a fixture pair in a tmpdir, assert against a value the fixture chose, clean up in a finally. G-A follows the same idea once OQ-1 fixes whether the artifact is fixtured (Opt-A) or relocated inside the repo (Opt-B)."
why: "The defect is not in what these tests assert but in where they read from. The smallest correct change is therefore to move the input under the test's control and leave every assertion intact."
boundaries:
  in_scope_files:
    - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
    - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
  explicitly_untouched:
    - "All production code under packages/workflow-bundle/scripts and bin"
    - "What any assertion checks"
    - "scripts/hooks/tdd-enforce.sh - L-04 is a different concern in a different file"
    - "The work items these tests reference; none is re-run, re-verified or renamed"
validation_plan:
  - "Each defect observed failing first from the tree where it is currently red - for G-A that is the MAIN tree, which is the opposite of where it was authored."
  - "Negative-check the check: perturb the input and confirm red, for both G-A and G-B."
  - "Two-tree comparison for AC-003, recording both numbers rather than asserting equality."
risk_notes:
  - id: "R-01"
    risk: "Fixing G-A by weakening it - skip-if-missing or a trivially true assertion."
    severity: MEDIUM
    mitigation: "AC-001 requires the negative case to survive, and T1's review checkpoint names this failure mode explicitly."
  - id: "R-02"
    risk: "Opt-A silently drops coverage of a real released artifact."
    severity: MEDIUM
    mitigation: "That trade-off is OQ-1 itself, and it is a decision rather than an oversight. If OQ-1 answers 'a real artifact matters', Opt-B is taken instead."
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "packages/workflow-bundle/test - two files"
  - "The aggregate result of run-all.js, which is what CI and every future baseline read"
compatibility_risks:
  - risk: "A future release check silently stops verifying a real artifact."
    assessment: "Open until OQ-1 is answered. Recorded as R-02 rather than assumed away."
  - risk: "Merge conflict with either open branch."
    assessment: "Eliminated by measurement: neither codex/worktree-and-closure-integrity nor codex/trusted-receipt-namespace-resolution touches these two files."
migration_notes:
  - "None. Test-only, no disk state, no receipts, no config."
rollback_notes:
  - "Two independent commits, each a plain git revert."
```

## Verification Plan
- **Mandatory:** `run-all.js` from both trees with the counts recorded; each target file run from both trees; the negative check for each fix; `grep` count for live work-item paths.
- **Evidence rule:** compare against `T0`'s recorded numbers, never against this note. Both preceding work items found their own plan text stale at verify time.
- **Not gating:** which work items happen to be `ACTIVE` or `DONE` while the suite runs — that independence is the point of the change.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - check: "the task plan covers build, verify and docs for the scope needed"
    status: PASS
    evidence: "Build T1/T2, verify T0/T3, docs are the s07 note. No user-facing documentation changes because no documented behaviour changes."
  - check: "packaging or release check if scope touches release"
    status: NOT_APPLICABLE
    evidence: "Test-only. No version bump, no artifact published. Note that G-A touches a release SMOKE test, which is a test of release, not a release step."
  - check: "governance-exception route determined in advance"
    status: PASS
    evidence: "Named in T1's review checkpoint: if the fix cannot avoid production code, stop and re-scope rather than widening quietly."
blocking_items:
  - id: "OQ-1"
    item: "Fixture the rollback artifact, or relocate the lookup inside the repo?"
    owner: "developer"
    blocks: "T1 only"
owner: "developer"
next_action: "Answer OQ-1. Then a human reviews s04 and this note, fills gate_reviews, and seals spec, dor, approach and task_plan - Light allows sealing them in one interaction, but each still gets its own receipt."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "T0 records both trees; T3 compares against it. Both halves required."
  - "Full suite must not gain a failing file. It may LOSE one - that is the point of G-A."
compatibility_checkpoints:
  - "Coverage preserved: rollback identity comparison and cross-file resolution both still asserted."
  - "Negative cases survive for both fixes."
migration_or_backfill_steps:
  - "None."
rollback_or_restore_steps:
  - "git revert per commit; no state outside git is touched."
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-001"
  - "REQ-002"
  - "REQ-003"
acceptance_refs:
  - "AC-001"
  - "AC-002"
  - "AC-003"
task_refs:
  - "T0"
  - "T1"
  - "T2"
  - "T3"
test_refs:
  - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
```
