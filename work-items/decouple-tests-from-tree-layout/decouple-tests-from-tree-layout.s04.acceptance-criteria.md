---
artifact_id: "decouple-tests-from-tree-layout.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "decouple-tests-from-tree-layout"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "decouple-tests-from-tree-layout.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Acceptance for `REQ-001`..`REQ-003`, each checkable by running one command in two places.
> `DoR` is **PARTIAL** on a single question, `OQ-1`, which decides whether `G-A` is fixtured or
> relocated. No gate is sealed.

## Existing System Baseline
```yaml
current_behavior_refs:
  - "release-rollback-smoke.test.js:11 repoRoot = path.resolve(__dirname,'..','..','..'); :18 defaultRollbackTarball = path.resolve(repoRoot,'..','stabilize-architecture-skill-bundle-v2.4.0',...)"
  - "workflow-gate-evidence-utils.test.js - cross-file assertion resolving into work-items/artifact-governance-enforcement/...s01.restate.md"
  - "Its sibling same-note assertion in the same file was fixed as D-E under worktree-and-closure-integrity T7, commit 79df212"
impacted_surfaces:
  - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
  - "The aggregate result of packages/workflow-bundle/test/run-all.js"
compatibility_constraints:
  - "Coverage preserved: the rollback identity comparison and the cross-file resolver must still be proved, not deleted."
  - "The negative case survives: a genuinely absent rollback artifact must still fail the test."
  - "No production code. If a fix seems to need it, re-scope rather than widen."
  - "Neither target file is touched by the two open branches - verified by diffing both against main for these paths."
rollback_constraints:
  - "Test-only, so rollback is a plain git revert with no disk or receipt state involved."
  - "Each defect commits separately, so either fix reverts alone."
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: "AC-001"
    criterion: "release-rollback-smoke.test.js returns the same verdict from the main tree and from a worktree, and still fails when the rollback artifact is genuinely absent."
    verification: "Run the file from both trees; verdicts must match. Then remove or point away from the artifact in a scratch copy and confirm the test goes red - a check that cannot fail is not a check."
    baseline: "FAIL from the main tree, PASS from a worktree, measured 2026-08-26"
    traces_to: "REQ-001, SM-2"
  - id: "AC-002"
    criterion: "No assertion in workflow-gate-evidence-utils.test.js reads a file under work-items/ that belongs to a real work item, and the cross-file resolver is still proved to resolve."
    verification: "grep the file for live work-item paths returns 0 hits (baseline 2). A fixture pair proves cross-file resolution, mirroring what D-E did for the same-note case."
    baseline: "2 references to artifact-governance-enforcement"
    traces_to: "REQ-002, SM-3"
  - id: "AC-003"
    criterion: "run-all.js reports the same failing-file count from the main tree and from a worktree."
    verification: "Run it in both and compare the counts directly. Record both numbers rather than asserting they match."
    baseline: "Differs - this is why both preceding work items had to record per-tree baselines"
    traces_to: "REQ-003, SM-1"

edge_cases:
  - id: "EDGE-001"
    case: "The v2.4.0 rollback artifact is genuinely unavailable in some environment, for example a fresh clone with no prior release."
    required_outcome: "Fail loudly, or skip with a reason printed and recorded. A silent skip is the failure mode AC-001 exists to prevent, and it is the cheapest wrong answer available here."
  - id: "EDGE-002"
    case: "A future worktree is created that does NOT sit beside the v2.4.0 worktree."
    required_outcome: "Same verdict as everywhere else. Today that case fails, which shows the current pass is an accident of layout rather than a property of the test."
  - id: "EDGE-003"
    case: "The referenced work item artifact-governance-enforcement is renamed or archived."
    required_outcome: "No test breaks. This is the slow fuse on REQ-002 and the reason it is worth fixing while nothing is red."

out_of_scope:
  - "What any assertion checks - only where its input comes from"
  - "Production code under packages/workflow-bundle/scripts or bin"
  - "L-04, the tdd-enforce stdout issue"
  - "The work items these tests currently reference"

done_when:
  - "AC-001..AC-003 each have a recorded number from a real run, in both trees where the criterion says so"
  - "Each defect observed failing first from the tree where it currently fails"
  - "Two separate commits, each revertable alone"

behavioral_invariants:
  - "A test controls its own input."
  - "Fixing a test never means weakening what it asserts."
  - "A check that cannot fail is not a check."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - check: "acceptance criteria are measurable and verifiable"
    status: PASS
    evidence: "Each names the command, the two locations to run it in, and the baseline number it is compared against."
  - check: "the needed role sign-offs have been identified"
    status: PASS
    evidence: "role_signoffs spec=ba, dor=po/ba, approach and task_plan=developer. gate_reviews stay empty until a human reviews."
  - check: "requirements reflected into the workflow note"
    status: PASS
    evidence: "sdd_mode=light, so REQ-001..REQ-003 and AC-001..AC-003 live in the Spec Card and are referenced here rather than restated."
resolved_blocking_items:
  - id: "OQ-1"
    item: "Is G-A's retained-rollback check about a real released artifact, or only about the identity comparison?"
    status: ANSWERED
    answered_at: "2026-08-27"
    answer: "A real retained artifact - and BOTH options offered at s06 were wrong. Measured: retainedRollbackDigest 36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec matches a real workflow-bundle-2.5.0.tgz byte for byte, so a fixture tarball (Opt-A) would force changing the digest and destroy the check. But the artifact is NOT in the repository and cannot be put there (Opt-B): .gitignore:30 excludes packages/workflow-bundle/*.tgz, git tracks zero .tgz files, and the only copy on this machine sits inside .claude/worktrees/artifact-governance-enforcement/, which .gitignore:38 also excludes. It cannot be rebuilt either - the package is at 2.6.0 and the rollback target is 2.5.0."
    consequence: "The defect is worse than the Spec Card describes. This test is not merely tree-dependent, it is MACHINE-dependent: it can only pass where that one gitignored worktree happens to hold that one build."
blocking_items:
  - id: "OQ-2"
    item: "Should CI gate on a retained release binary at all? On a fresh runner the artifact cannot exist, so the check either fails or must be skipped deliberately."
    owner: "po, with devops"
    raised_by: "the evidence that answered OQ-1"
    blocks: "the G-A fix shape - AC-002 and AC-003 are unaffected"
    why_it_is_not_the_agent_s_call: "It trades release-gate strength against a green CI. Either answer is defensible and both have consequences for the release lane."
    ci_exposure: "workflow-guardrails.yml:210 runs npm run validate:workflow:unit, which runs run-all.js, which includes this file. On a GitHub runner .claude/worktrees/ does not exist and *.tgz is not in the repository, so fs.existsSync on the tarball is false and the assertion fails. STRONG INFERENCE from the mechanism, not an observed CI run - confirm against an actual run before acting on it."
owner: "developer"
next_action: "Answer OQ-1, then a human reviews this note, fills gate_reviews.spec/dor, sets Spec Freeze, and seals spec and dor."
```

## Definition of Ready
```yaml
status: PARTIAL
verdict_scope: "Readiness to enter s06. No gate has passed; spec, dor, approach and task_plan are all unsealed."
ready_for:
  - "G-B / REQ-002 - mechanism understood, the fix shape is already proved by D-E in the same file."
  - "REQ-003 - it is a measurement, not a design decision."
blockers:
  - id: "OQ-2"
    blocks: "G-A / REQ-001 approach only"
    owner: "po, with devops"
    unblocking_answer: "Either 'CI must gate on a retained binary' - then the artifact needs a declared, fetchable home and the test needs a loud failure when it is absent - or 'it must not' - then the check moves out of the unit suite into a release-lane check that runs where the artifact exists."
notes:
  - "Still PARTIAL after OQ-1 was answered, and the reason changed rather than went away. OQ-1 resolved the fixture-versus-relocate question by ruling out both, and in doing so uncovered OQ-2, which is a larger call: whether CI should gate on a retained release binary."
  - "Recorded as a worked example of why an option analysis is not evidence. s06 recommended Opt-A on reasoning; ten minutes of measurement showed Opt-A destroys the check and Opt-B is impossible. The recommendation was wrong and the artifact now says so."
  - "PARTIAL rather than BLOCKED because REQ-002 and REQ-003 are unaffected and independently deliverable."
```

## Spec Freeze
```yaml
requirement_ids:
  - "REQ-001"
  - "REQ-002"
  - "REQ-003"
spec_card_ref: "product-specs/cards/decouple-tests-from-tree-layout.md"
freeze_status: draft
freeze_authority: "ba"
notes:
  - "Not frozen. Freezing is a human act and OQ-1 is still open, so freezing now would freeze a spec whose G-A shape is undecided."
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
task_refs: []
test_refs:
  - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
```
