---
artifact_id: "trusted-receipt-namespace-resolution.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "trusted-receipt-namespace-resolution"
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
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
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
  spec:
    - "ba"
  contract:
    - "developer"
  dor: []
  approach: []
  foundation: []
  task_plan:
    - "developer"
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
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-21T14:49:34Z"
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
  - "trusted-receipt-namespace-resolution.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Seven tasks. `T0`–`T3` and `T6` deliver `E-A` and depend on nothing outside this work item.
> `T4`–`T5` deliver `E-B` and are blocked on another work item's `s08` closure (`GOV-Q2` was
> answered prospective-only on 2026-08-21). Task order is not a preference here - the `tdd-enforce` hook physically refuses an
> edit to the target file until its test exists, which was verified by running the hook. `E-A`
> is shippable alone if `E-B` is deferred.

## Step Contract
```yaml
step_goal: "Turn the Opt-A approach into an ordered, verifiable plan where every task names the files it touches, the evidence that closes it, and its own review checkpoint - and where the two blocked tasks are isolated so the unblocked half can ship without them."
input_summary:
  - "s05 Opt-A: canonical project root from dirname(resolved git-common-dir), legacy fallback otherwise"
  - "s05 boundary: two production files in scope, five categories explicitly untouched"
  - "s05 validation_plan and S05-R01..R05"
  - "s04 AC-001..AC-006 and EDGE-001..EDGE-008"
  - "Live probes of the tdd-enforce hook and the existing test harness, run while writing this plan"
output_summary:
  - "T0..T6 with owner, paths, outputs, review checkpoint, verify path and dependencies"
  - "The hook-imposed ordering constraint, measured rather than assumed"
  - "A dependency graph that isolates E-B so E-A can ship alone"
  - "Brownfield regression, compatibility and rollback checkpoints"
done_when:
  - "Every task names its files and its verify command; no task says 'add tests' or 'handle edge cases'"
  - "Each acceptance criterion from s04 maps to at least one task"
  - "The blocked tasks are identifiable as blocked before implementation starts, not during it"
owner: "developer"
```

## Artifact Chính
```yaml
execution_constraint_measured: "tdd-enforce blocks the work before the plan does. Probed live on 2026-08-20: a payload naming packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js exits 2 - 'No test file found ... Expected test file: packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js'. The same probe for work-item-protocol.js exits 0, because that test file already exists. So T1 must precede T2 as a matter of tool behaviour, not just TDD discipline, and E-B needs no new test file to become editable."

fixture_harness_available: "Existing tests isolate the approval root with WORKFLOW_BUNDLE_APPROVAL_ROOT - see work-item-protocol.test.js:212 and approval-path-defects.test.js:158,264 - and sealing inside a fixture is unlocked by WORKFLOW_BUNDLE_ALLOW_NONINTERACTIVE_APPROVAL_FIXTURE=true (workflow-trusted-approval-utils.js:35). Both mechanisms already exist; no new test infrastructure is needed for either defect."

tasks:
  - id: T0
    owner_role: developer
    name: "Worktree and measured baseline"
    objective: "Isolate the change and record the exact numbers every later task compares against, so a later difference is attributable rather than argued about."
    paths_in_scope:
      - ".claude/worktrees/trusted-receipt-namespace-resolution"
    outputs_expected:
      - "Worktree on branch codex/trusted-receipt-namespace-resolution, branched from LOCAL main"
      - "Receipt inventory: every path under the approval root plus its sha256, written to a file - the before half of AC-002"
      - "Namespace measured from the main tree and from the new worktree, recording the mismatch as the expected T0 failure"
      - "Unit suite baseline AFTER running sync-workflow-bundle-runtime.js"
      - "Validator baseline: validate, sdd, change, exec, plan, protocol, fixtures, pack_audit"
    review_checkpoint: "Confirm the worktree is gitignored and inside the repo (this is EDGE-003's own case), and that the inventory records digests and not just a count - a count would pass even if contents changed."
    verification_hint: "git worktree list; git check-ignore .claude/worktrees/trusted-receipt-namespace-resolution; node packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js; node packages/workflow-bundle/test/run-all.js; the eight validators; find over the approval root emitting path+sha256."
    dependencies: []
    expected_baseline_notes:
      - "Base off LOCAL main. origin/main is behind, and branching from it silently drops committed work."
      - "runtime/ is gitignored and generated. Without sync-workflow-bundle-runtime.js a fresh worktree fails six unit files for reasons unrelated to this change - L-03 from the sibling work item."
      - "Expect TWO pre-existing failing unit files, measured on main 2026-08-20, not one. T6 must match 2, not 0 and not 1."
      - "  (a) workflow-gate-evidence-utils.test.js - asserts protocol_status=ACTIVE against a live artifact that is now DONE. F-01 in the sibling work item, still unfixed on main."
      - "  (b) release-rollback-smoke.test.js - asserts a retained v2.4.0 tarball at path.resolve(repoRoot, '..', 'stabilize-architecture-skill-bundle-v2.4.0', ...), a SIBLING of the repo that does not exist. This repo keeps worktrees at .claude/worktrees/. Pre-existing since bbc151a; see F-03."
      - "Both are the same defect class this work item exists to fix - a test asserting the shape of its environment instead of controlling it - so neither may be quietly repaired here to make the suite look green."
      - "Expect wfc protocol to emit the sibling work item's four stale-receipt errors. They belong to another work item and must still be exactly four at T6."
      - "Green at T0 and expected green at T6: wfc fixtures (10 cases, exit 0) and the pack audit (exit 0)."
      - "CONCURRENCY CAVEAT - validator FILE COUNTS are not a baseline metric. Observed live on 2026-08-21: wfc validate read 164 files / 160 notes, then 172 / 168 about an hour later, because a concurrent session scaffolded work-items/add-diagram-design-adapter/ (8 notes) mid-flight. Zero regression, pure noise. ListAgents confirmed a busy peer session on this repo."
      - "So T0 must scope its baseline to artefacts this work item owns or reads: the receipt inventory (path+sha256), the unit suite result, and the wfc protocol error set. Treat note and file counts as informational - record them, but never let T6 fail on them."
      - "Corollary: if the unit suite or the receipt inventory shifts without this work item touching anything, suspect the peer session before suspecting a regression - and check ListAgents before spending time on a diagnosis."
  - id: T1
    owner_role: developer
    name: "E-A identity matrix, observed failing first"
    objective: "Create the test file the hook demands and assert the identity contract before any implementation exists, so the RED state is a real failure in git history rather than a claim in prose."
    paths_in_scope:
      - "packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js"
    outputs_expected:
      - "AC-001 / SM-3: a temp repo and a worktree of it resolve to one identity"
      - "AC-003 / SM-4: two sibling repos resolve to different identities, and a cross-read resolves nothing"
      - "AC-006 / EDGE-002: a non-git directory resolves deterministically via the legacy path and does not throw"
      - "EDGE-003: a nested worktree, and a worktree whose path sits inside the main tree, both resolve to the main identity"
      - "S05-R01: a repo created with --separate-git-dir falls through to the legacy derivation - asserted, so the boundary is visible in a test name"
      - "AC-006 determinism: each shape derived twice, asserting equal output"
    review_checkpoint: "SPEC_COMPLIANCE: every assertion tests a recorded criterion, not a proxy for one. In particular AC-003 must assert a failed lookup, not merely two unequal strings - unequal identities are the mechanism, a refused read is the requirement."
    verification_hint: "node packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js must FAIL with 'resolveCanonicalProjectRoot is not a function'. Record that output. Any other failure means the fixture is wrong, not the code."
    dependencies: ["T0"]
    sequencing_reason: "First code task because tdd-enforce refuses to let T2 edit the production file until this file exists - measured, exit 2."
  - id: T2
    owner_role: developer
    name: "E-A implementation: canonical project root"
    objective: "Make T1 green with the smallest change the approach allows - one helper plus one changed argument."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"
    outputs_expected:
      - "resolveCanonicalProjectRoot(projectRoot): resolves git-common-dir to an absolute path, returns its parent when the basename is '.git', otherwise returns projectRoot unchanged. Never throws; git failure is caught and falls through."
      - "buildProjectApprovalNamespace fed the canonical root; its own body unchanged"
      - "Helper exported for test"
    review_checkpoint: "SPEC_COMPLIANCE: path.resolve(cwd, output) applied BEFORE hashing - the trap recorded in s05, and the whole fix fails silently without it. The basename guard is present. Nothing throws on a non-repo. CODE_QUALITY: one exported helper, not inline string surgery at the call site - the same standard the sibling work item's T2 was held to."
    verification_hint: "T1 goes green. Then from inside the worktree: wfc protocol emits 0 lines matching 'Missing trusted approval receipt'; and the computed namespace equals code-factory-916d1d6e915b, the address already on disk. Both numbers are already known from the s05 measurement, so a mismatch means the implementation diverged from the option that was approved."
    dependencies: ["T1"]
  - id: T3
    owner_role: developer
    name: "Compatibility and control non-regression"
    objective: "Prove AC-002 and AC-005 as evidence rather than as reasoning, in a task of their own so compatibility verification is not folded into the build task."
    paths_in_scope:
      - "packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js"
    outputs_expected:
      - "AC-002: the after-inventory compared to T0's before-inventory as SET EQUALITY over path+sha256 pairs. Not a count."
      - "AC-005, four standalone assertions: sealing refuses without a TTY; sealing requires the passphrase; one independent receipt per gate is still written; a receipt still binds to its host artifact sha256 and reads stale when that artifact changes."
    review_checkpoint: "SPEC_COMPLIANCE: the inventory check must fail if a file's content changed while its path stayed the same - verify that by deliberately perturbing one digest in a scratch copy and confirming the check goes red. A compatibility check that cannot fail is not a check."
    verification_hint: "Inventory diff exits clean against T0's file. The four control assertions pass, and each is a separately named test so a future regression names the control it broke."
    dependencies: ["T2"]
    sequencing_reason: "After T2 because it measures T2's effect. Separate from T2 because the strict checklist requires compatibility verification and review not to be absorbed into the build task."
  - id: T4
    owner_role: developer
    name: "E-B DONE-transition matrix, observed failing first"
    objective: "Assert the transition guard before it exists, reusing the helpers the sibling work item already wrote rather than reimplementing them."
    paths_in_scope:
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
    outputs_expected:
      - "AC-004: dod sealed clean, then a path inside granted_write_paths dirtied, then the DONE transition - must refuse and name the offending path"
      - "AC-004 hatch: the same transition with the hatch and a non-empty reason - passes, and the reason is echoed on its own line"
      - "AC-004 hatch guard: hatch with an empty reason - refused"
      - "EDGE-005: empty granted_write_paths - refuses rather than passing vacuously"
      - "EDGE-006: outside a git repository - silent, consistent with L-02"
    review_checkpoint: "SPEC_COMPLIANCE: the refusal must be asserted at the DONE transition specifically, not at the dod seal - the seal guard already exists and a test that hits it would pass while proving nothing about L-01."
    verification_hint: "node packages/workflow-bundle/test/work-item-protocol.test.js fails on the new groups only, with the pre-existing groups still green. No new test file, so the hook is not involved - measured exit 0 for this path."
    dependencies: ["T0", "sibling-merge"]
    blocked: true
    blocked_reason: "ONE blocker remaining, down from two. GOV-Q2 was answered prospective-only by po on 2026-08-21, so the governance axis is clear. What still blocks: getUncommittedDeliveryErrors, evaluateUncommittedDelivery, inspectDeclaredScopeCleanliness and readGrantedWritePaths exist only on codex/worktree-and-closure-integrity - verified absent from main's exports, present on the branch at lines 469, 357, 417 and 456. That branch cannot merge before its own s08 DoD is sealed."
  - id: T5
    owner_role: developer
    name: "E-B implementation: DONE-transition guard"
    objective: "Add a fourth member to the existing assert-gate family and thread the hatch through the close action, storing nothing."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
    outputs_expected:
      - "assertUncommittedDeliveryGate(report, toStatus, projectRoot, options), invoked only for toStatus === 'DONE', delegating to getUncommittedDeliveryErrors"
      - "Two flags threaded through the close action for the hatch and its mandatory reason"
      - "The reason echoed on its own line when the hatch is used"
    review_checkpoint: "SPEC_COMPLIANCE: OQ-4 is answered by re-evaluating at transition time, so NOTHING is persisted - no receipt field, no report field. If the implementation reaches for a stored waiver, CF-1 has reopened and the receipt-format non-goal is being breached; stop and escalate rather than narrowing the non-goal in passing. CODE_QUALITY: sits beside assertBootstrapGate and assertStepGateEvidence, matching their signature; the hatch requires a non-empty reason and is never silent."
    verification_hint: "T4 goes green. Then walk the sibling work item's own lesson: confirm the guard is on the path the close action actually calls, by driving it through the CLI fixture rather than trusting the unit test - that work item's T5 first placed an equivalent guard in a function the real path never called."
    dependencies: ["T4"]
    blocked: true
    blocked_reason: "Inherits T4's remaining blocker, SIBLING-MERGE."
    commit_order: "LAST. It is the only change in the set that makes the tool stricter, so reverting it alone must restore previous DoD behaviour while leaving E-A in place."
  - id: T6
    owner_role: developer
    name: "Regression against the T0 baseline"
    objective: "Show that nothing outside the intended change moved, by comparing to T0's recorded numbers rather than to expectations."
    paths_in_scope:
      - "work-items/trusted-receipt-namespace-resolution"
    outputs_expected:
      - "Eight validators compared against T0 on EXIT CODE and on error content. File and note counts are recorded, not gated - see the concurrency caveat in T0."
      - "Unit suite compared against T0: still exactly TWO pre-existing failures - workflow-gate-evidence-utils.test.js (F-01) and release-rollback-smoke.test.js (F-03) - unless someone else's fix landed meanwhile, in which case say so rather than absorbing it"
      - "Receipt inventory identical to T0 by path+sha256"
      - "wfc protocol from the worktree: 0 receipt-missing lines; the sibling work item's four stale-receipt errors still exactly four"
      - "A written statement of which acceptance criteria are closed and which are deferred with E-B"
    review_checkpoint: "SPEC_COMPLIANCE: compare against the numbers T0 recorded, never against the numbers this note predicts. The sibling work item found its own s06 text was stale by 12 receipts, and this note itself first recorded the wrong failure count - a plan is not evidence."
    verification_hint: "Diff the T0 and T6 outputs directly. Any delta in a GATED metric must be explained in the s07 note or investigated. Counts are exempt: check ListAgents for a peer session first, since a concurrent scaffold moves them without any regression."
    dependencies: ["T3"]
    scope_note: "Runs on the E-A set. If E-B is deferred, T6 still closes with AC-004 recorded as NOT DELIVERED rather than as passing."

dependencies:
  - "T0 -> T1 -> T2 -> T3 -> T6 is the E-A chain and has no external dependency"
  - "T1 before T2 is enforced by tdd-enforce, not merely by convention - the hook exits 2 until the test file exists"
  - "T4 -> T5 is the E-B chain. GOV-Q2 is answered (prospective-only, 2026-08-21); T4 now requires only that codex/worktree-and-closure-integrity is merged"
  - "codex/worktree-and-closure-integrity merging requires its own s08 DoD, which is a human gate on a different work item"
  - "T5 commits last regardless of when it becomes unblocked"
  - "No task depends on another task's uncommitted state; each is committable on its own"

handoff_points:
  - "After T0: baseline recorded. If the pre-existing failure count is not 1, stop and reconcile before writing any test - the baseline is the whole basis for T6."
  - "After T1: the RED output is captured. This is the TDD evidence for s07; an unrecorded RED cannot be reconstructed later."
  - "After T2: E-A is functionally complete. This is the natural point to check whether E-B is still blocked, and to decide whether to ship E-A alone."
  - "After T3: AC-001, AC-002, AC-003, AC-005 and AC-006 all have evidence. E-A is closeable."
  - "After T6: hand to s08. DoD is a human gate and is not self-declarable."
  - "GOV-Q2 is answered, so E-B no longer risks being deferred on governance grounds. If SIBLING-MERGE drags instead, the same split option applies: E-A ships alone and E-B moves to its own work item. s01 grouping_rationale permits it and s05 S05-R05 anticipated it."

delegation_decision:
  mode: agentic
  subagent: false
  reason: "T1 gates T2, T2 gates T3, and T4/T5 are blocked externally. There is no pair of tasks with disjoint ownership that could run in parallel - T1 and T3 touch the same test file, T2 and T5 are sequential within their own chains. Per the delegation rule, without disjoint owned_paths and a clear merge path this stays agentic."

worktree_decision:
  status: REQUIRED
  path: ".claude/worktrees/trusted-receipt-namespace-resolution"
  branch: "codex/trusted-receipt-namespace-resolution"
  reason: "planning_track=full and governance_profile=strict; the change edits a published package (workflow-bundle v2.5.0) at the file implementing every approval control; E-B narrows a gate four closed work items passed; three other worktrees already exist on this repo; and the work will span more than one session because E-B is externally blocked."
  guard: "Notes are authored in the MAIN tree - that is where wfc resolves work-items and where receipts are namespaced. Code lives in the worktree. Do not let the two drift."
```

## Verification Plan
- **Mandatory checks:** the eight validators (`validate`, `sdd`, `change`, `exec`, `plan`, `protocol`, `fixtures`, `pack_audit`) compared against `T0`; the unit suite compared against `T0`; the receipt inventory compared by `path+sha256` set equality; `wfc protocol` run from inside the worktree; and the four approval-control assertions from `AC-005`.
- **Evidence rule:** every check compares against a number recorded at `T0`, never against a number written in this plan. The sibling work item's `s06` claimed 22 receipt digests when reality was 34 — a plan is a prediction, and `T0` is the measurement.
- **Risk notes:** `S05-R01` the `--separate-git-dir` fallback is asserted rather than assumed, so its boundary is visible in a test name. `S05-R03` is the schedule risk, not a technical one — `E-B` waits on another work item's closure. `S05-R04` is covered by `AC-003` asserting a *refused read*, not just two unequal strings.
- **Negative-check-the-check:** `T3` deliberately perturbs one digest in a scratch copy to confirm the inventory comparison can go red. A compatibility check that cannot fail is decoration.
- **Rollout note:** none. No package version bump, no release, no deploy surface. `s08` still owes a Regression & Compatibility Summary because the work item is brownfield.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
  - "project-context/checklists/default.md (inherited)"
checks:
  - check: "the task plan covers build, verify and docs for the scope genuinely needed"
    profile: default
    status: PASS
    evidence: "Build: T2 and T5. Verify: T1, T3, T4, T6. Docs: the s07 note itself; no user-facing documentation changes because no documented behaviour changes - the namespace address is identical and the E-B hatch is new surface documented by its own CLI help."
  - check: "if scope touches release or rollout, a minimal packaging or release check exists"
    profile: default
    status: NOT_APPLICABLE
    evidence: "No version bump, no image, no deploy manifest, no promotion. The bundle version stays at v2.5.0 within this work item."
  - check: "the governance-exception route is determined in advance"
    profile: default
    status: PASS
    evidence: "Named in T5's review checkpoint: if the implementation needs a STORED waiver, CF-1 has reopened and the receipt-format non-goal is being breached. The instruction is to escalate for a po-signed scope amendment, not to narrow the non-goal while coding."
  - check: "dedicated tasks exist for migration, compatibility verify or rollout when scope requires it"
    profile: strict
    status: PASS
    evidence: "T3 is a dedicated compatibility-verify task and is deliberately not folded into T2. Migration has no task because Opt-A has no migration - that is the property it was chosen for, recorded in s05 migration_notes rather than left as an omission."
  - check: "review tasks are not implicitly merged into the build task when the boundary is large enough to split"
    profile: strict
    status: PASS
    evidence: "Every task carries its own review_checkpoint in spec-compliance-then-code-quality order, and T3 splits compatibility review out of T2 entirely. Two production files, two independent chains, so the boundary does warrant the split."
  - check: "reviewer coverage specified per main boundary"
    profile: strict
    status: PASS
    evidence: "review_mode=self, verification_owner=developer for both boundaries. Resolves the PARTIAL left at s04, where E-B's boundary was not yet fixed - s05 fixed it to work-item-protocol.js, so it can now be assigned."
blocking_items:
  - id: "SIBLING-MERGE"
    item: "codex/worktree-and-closure-integrity must merge before E-B can be built - it holds the four helpers T5 depends on."
    owner: "human, via that work item's s08 DoD"
    blocks: "T4 and T5 only."
owner: "developer"
next_action: "GOV-Q2 answered prospective-only by po on 2026-08-21. Remaining: seal the s04 gates (spec, contract, dor), s05's approach gate and this note's task_plan gate, so T0 can start the E-A chain without waiting on SIBLING-MERGE."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "T0 records the baseline; T6 compares against it. Both halves are required - a baseline nobody compares to is bookkeeping."
  - "T6 compares only the scoped metrics: receipt inventory, unit suite result, wfc protocol error set. Validator file and note counts are recorded but never gating - a concurrent session adding a work item moves them without any regression, which is exactly what happened on 2026-08-21. See T0 expected_baseline_notes."
  - "Unit suite must remain at exactly two pre-existing failures: workflow-gate-evidence-utils.test.js (F-01) and release-rollback-smoke.test.js (F-03). A third failure is a regression; fewer than two means someone else's fix landed meanwhile and must be noted rather than silently absorbed."
  - "The sibling work item's four stale-receipt errors from wfc protocol must still be exactly four at T6 - not fewer, which would mean this work item touched another work item's receipts."
  - "Every wfc command that reads a receipt inherits the T2 change without being edited: protocol, gate approve, work-item approve/activate/verify/close, change-item approve, materialize. T6 exercises protocol directly; the rest are covered by the receipt inventory being unchanged."
compatibility_checkpoints:
  - "AC-002 as set equality over path+sha256, before and after. Not a count, and not a spot check."
  - "The computed namespace must equal code-factory-916d1d6e915b - the address already on disk. This is the single number that proves no migration happened."
  - "AC-005: the four approval controls asserted individually, because this work item edits the file that implements all four."
  - "EDGE-007: both env-var hatches keep their current meaning, so an operator who already set WORKFLOW_BUNDLE_APPROVAL_ROOT as a worktree workaround is not broken by the fix that makes it unnecessary."
  - "S05-R01: the --separate-git-dir shape falls through to legacy behaviour - a non-regression, asserted rather than assumed."
migration_or_backfill_steps:
  - "None, by design. Opt-A computes the address the receipts already live at, so there is nothing to move, rewrite or run. Recorded explicitly because the absence is the chosen outcome - it is why Opt-A beat the semantically cleaner Opt-B."
  - "Adopters on other machines need no action for the same reason: their canonical root resolves to the path their own receipts were written under."
rollback_or_restore_steps:
  - "E-A: plain git revert of T2. No disk state diverged while it was in effect, so revert cannot orphan a receipt."
  - "E-B: T5 is the last commit, so reverting it alone restores previous DoD behaviour and leaves E-A in place."
  - "After any revert, re-run the receipt inventory and compare to T0. Revert is a change too, and it gets the same evidence standard."
  - "No release to roll back. The bundle version is untouched."
```

## Traceability
```yaml
upstream:
  - "trusted-receipt-namespace-resolution.s04.acceptance-criteria.md"
  - "trusted-receipt-namespace-resolution.s05.technical-approach.md"
criterion_to_task:
  - "AC-001 -> T1 (red), T2 (green), T6 (from the real worktree)"
  - "AC-002 -> T0 (before inventory), T3 (set equality), T6 (final compare)"
  - "AC-003 -> T1, asserting a refused read rather than two unequal strings"
  - "AC-004 -> T4 (red), T5 (green). BLOCKED on SIBLING-MERGE only; GOV-Q2 cleared 2026-08-21."
  - "AC-005 -> T3, four standalone assertions"
  - "AC-006 -> T1, determinism plus the non-git and separate-git-dir shapes"
edge_case_to_task:
  - "EDGE-001, EDGE-002, EDGE-003 -> T1"
  - "EDGE-005, EDGE-006 -> T4"
  - "EDGE-007 -> T3 compatibility checkpoints"
  - "EDGE-004, EDGE-008 -> no task. EDGE-004 is current behaviour that must not change and is covered by the inventory; EDGE-008 is a named limit of AC-004, not a requirement."
risk_to_task:
  - "S05-R01 -> T1 separate-git-dir assertion"
  - "S05-R02 -> T2 review checkpoint (must never throw); no memoisation without a measurement"
  - "S05-R03 -> T4/T5 blocked flags and the dependency list"
  - "S05-R04 -> T1 AC-003 negative case"
  - "S05-R05 -> T5 commit_order and the E-B split path in handoff_points"
next_step: "s07 Implement - only after the s04 gates, the s05 approach gate and this task_plan gate are sealed by a human. Nothing below T0 may start before that."
```

## Handoff
- **Start with `T0`.** Worktree off **local** `main`, run `sync-workflow-bundle-runtime.js` before trusting any test result, and record the receipt inventory as `path+sha256` pairs — a count would pass even if contents changed.
- **`T1` before `T2` is not a style choice.** `tdd-enforce` exits 2 on any edit to `workflow-trusted-approval-utils.js` until `packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js` exists — probed live. The hook enforces the TDD order the policy asks for, so working around it would mean defeating the guard this repo exists to strengthen.
- **Blocking dependencies:** `T4` and `T5` need **both** `GOV-Q2` answered by `po` **and** `codex/worktree-and-closure-integrity` merged — that branch holds the four helpers `T5` calls, and it cannot merge before its own `s08` `DoD`. So `E-B` is downstream of a different work item's closure. `T0`–`T3` and `T6` have no external dependency.
- **`E-A` ships alone if needed.** After `T3`, five of six acceptance criteria have evidence. `GOV-Q2` is answered, so the remaining risk to `E-B` is schedule: if `SIBLING-MERGE` drags, split `E-B` into its own work item rather than leaving two tasks open indefinitely.
- **Condition to enter step 7:** `spec`, `contract` and `dor` sealed at `s04`; `approach` sealed at `s05`; `task_plan` sealed here. All five are unsealed today, so `T0` may not start.
- **Next human action:** `GOV-Q2` is answered. For each gate host note — finalize *before* sealing, never after — then seal: `wfc gate approve --work-item trusted-receipt-namespace-resolution --gate task_plan --reviewed-by developer`, plus `approach` at `s05` and `spec`/`contract`/`dor` at `s04`.
- **`F-03`, found while measuring the baseline for this plan — NOT in scope here.** `packages/workflow-bundle/test/release-rollback-smoke.test.js:18` asserts a retained v2.4.0 tarball at `path.resolve(repoRoot, "..", "stabilize-architecture-skill-bundle-v2.4.0", ...)` — a **sibling of the repository**, which does not exist. The v2.4.0 worktree lives at `.claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0`, per this repo's convention. The test therefore fails on `main` today and has since `bbc151a`. It is the **same defect class** as `D-A`, `F-01` and `E-A`: code resolving against the wrong tree, or asserting the shape of its environment instead of controlling it. Deliberately not fixed here — repairing an unrelated test to make this work item's suite look green is exactly the shortcut that produced the defects this chain is closing. It needs its own work item, or folding into the `F-01` fix, since both are brittle-test defects in the same suite.
- **`F-04`, surfaced while assigning `GOV-Q2`'s owner — NOT in scope here.** The governance model has architecture **lenses** but no architecture **signoff authority**. `sa` and `ta` exist as skills and are mandated at `s01`–`s04` by the repo policy, yet `GOVERNANCE_ROLES` (`workflow-governance-definitions.js:15`) admits only `po, ba, designer, developer, qc, devops`, and `governance-role-model.md` defines the same six. Verified: `ta` in `role_signoffs.approach` fails with `Unknown governance role 'ta'`. Three fields enforce that list — `role_signoffs.<gate>`, `gate_reviews.<gate>_reviewed_by`, `Governance Exceptions.approved_by` — while the free-text `owner:` fields do not, so the vocabulary can drift silently in one direction. `GOV-Q2` is the first question observed to fall into that gap: it is architectural in nature but must be signed by `po` because no architect role exists to sign it. **Decision taken 2026-08-21 (option A): keep `po` as signer, record `sa`/`ta` as consulted.** Closing the gap properly means extending `GOVERNANCE_ROLES` in a published package plus the role model, the per-step role table and the checklists — a behaviour change to what the validator accepts, and arguably a contract change for adopters. It needs its own work item from `s01`, not a patch inside this one.
- **No code was written.** No file under `packages/` or `scripts/` was modified by this step.
