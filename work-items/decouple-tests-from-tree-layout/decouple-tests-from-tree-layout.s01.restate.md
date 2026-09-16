---
artifact_id: "decouple-tests-from-tree-layout.s01.restate"
artifact_family: workflow-step
work_item_slug: "decouple-tests-from-tree-layout"
step_id: "s01"
step_slug: "restate"
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Two unit tests resolve against the wrong tree instead of controlling their own input.
> Both were found by other work items and deliberately left rather than fixed there, because
> fixing them would have widened a sealed plan. This is their home. Test-only, `SDD Light`.

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "TDD for behavior change - a test is behaviour too, so each defect is observed failing first"
  - "Prefer the smallest solution that is correct"
  - "Do not self-declare done"
  - "AI proposes, human approves"
required_reviews:
  - "Spec + DoR at s04"
  - "Approach + Task Plan at s06"
prohibited_actions:
  - "Deleting an assertion to turn the suite green"
  - "Touching production code under packages/workflow-bundle/scripts or bin"
  - "Making a check skip when its artifact is missing - a check that cannot fail is not a check"
open_governance_questions: []
```

## Artifact Chính
```yaml
raw_request: "Fix the remaining test-hygiene defects carried out of trusted-receipt-namespace-resolution and worktree-and-closure-integrity."
restated_request: "Make two unit tests produce the same verdict regardless of which checkout runs them, by having each control its own input instead of resolving against whatever happens to sit beside the repository or inside work-items/."
request_type: BUG
defect_source: code
spec_impact: NONE

user_problem_initial: "The unit suite currently reports a different number of failures from the main tree than from a worktree. That makes the suite result uninformative on its own - you also have to know where it ran. Two preceding work items both had to measure and explain the discrepancy before any regression comparison could be trusted, and both had to record per-tree baselines to work around it."
business_context_initial: "workflow-bundle v2.5.0 is published and a v2.6.x candidate is in preparation. A suite whose result depends on the operator's working directory is a weak release signal. The repo also mandates worktrees for large changes, so the divergent case is the normal case."

defects:
  - id: "G-A"
    requirement_hint: "REQ-001"
    symptom: "release-rollback-smoke.test.js FAILS from the main tree and PASSES from a worktree."
    location: "packages/workflow-bundle/test/release-rollback-smoke.test.js:18"
    mechanism: "path.resolve(repoRoot, '..', 'stabilize-architecture-skill-bundle-v2.4.0', ...). repoRoot/.. is the repository's parent from the main tree, and .claude/worktrees/ from a worktree - where that directory really exists."
    measured_2026_08_26:
      from_main_tree: "FAIL - retained v2.4.0 rollback tarball missing"
      from_worktree: "PASS - tarball found at 886190 bytes"
      method: "Ran the file from both trees in the same session."
    aggravating_detail: "It was authored from inside a worktree, so it has never been red for the person who wrote it."
  - id: "G-B"
    requirement_hint: "REQ-002"
    symptom: "No visible symptom today. The cross-file assertion in workflow-gate-evidence-utils.test.js reads a live work item note."
    location: "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js - cross-file assertion"
    mechanism: "Resolves into work-items/artifact-governance-enforcement/...s01.restate.md and asserts work_item_slug."
    why_it_is_still_a_defect: "It is stable only because a slug does not change when a work item closes. Its sibling assertion in the same file - which read protocol_status - broke for exactly this reason and had to be fixed as D-E. This is the same coupling with a slower fuse."

grouping_rationale: "Both are the same defect class and both live in the unit suite, so one fix, one review and one verify pass covers them. If G-B turns out to need a different approach it can be split at s06 without disturbing G-A."

scope_draft:
  in:
    - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
    - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
    - "Fixtures those two tests need to control their own input"
  out:
    - "Any production code under packages/workflow-bundle/scripts or bin"
    - "What the assertions check - only where their input comes from changes"
    - "The tdd-enforce stdout issue (L-04) - operator output, not test hygiene, and it touches a shell hook rather than a test"
    - "The work items these tests currently reference; none is re-run or re-verified"

constraints_initial:
  - "Test-only. If a fix seems to need production code, stop and re-scope rather than widen quietly."
  - "Each defect observed failing first, from the tree where it currently fails - for G-A that means the main tree."
  - "G-A must not be fixed by skipping when the artifact is absent."
  - "Coverage preserved: the rollback identity check and the cross-file resolver must still be proved, not deleted."

assumptions_initial:
  - id: "A1"
    assumption: "The v2.4.0 rollback tarball can be produced or fixtured on demand rather than located on disk."
    reject_if: "It can only come from a real prior release artifact, in which case the test needs a different strategy - possibly skipping with a loud, recorded reason rather than a silent one."
  - id: "A2"
    assumption: "The cross-file resolver can be proved against a fixture pair the test writes itself, exactly as the same-note assertion now is after D-E."
    reject_if: "The cross-file path resolution depends on real workflow-root layout in a way a tmpdir cannot reproduce."

open_questions_initial:
  - id: "OQ-1"
    question: "For G-A, is the retained-rollback check meant to verify a real released artifact, or only that the identity comparison works? The answer decides between fixturing a tarball and relocating the lookup."
    owner: "developer"
    blocking: "s06"

dependencies_initial:
  - "None on other work items. Both target files are already on main; neither is touched by the two open branches."

risks_initial:
  - id: "R-01"
    description: "Fixing G-A by weakening it - skip-if-missing, or asserting something trivially true."
    severity: MEDIUM
    mitigation: "AC-001 requires the negative case to survive: a genuinely absent artifact must still fail the test."
  - id: "R-02"
    description: "The two open branches also touch packages/workflow-bundle/test, so a merge conflict is possible."
    severity: LOW
    mitigation: "Neither branch touches these two files. Verified by diffing both branches against main for these paths before starting."

notes_for_step_2: "The value is not two green tests. It is that the suite result stops depending on the operator's working directory, which is what makes any future baseline comparable without a per-tree caveat."
```

## Business Goal
```yaml
business_goal: "Make the unit suite give the same answer wherever it runs, so a baseline comparison needs no caveat about which checkout produced it."
success_metrics:
  - id: "SM-1"
    metric: "Failing-file count from the main tree versus from a worktree"
    baseline: "Differs - measured 2026-08-26"
    target: "Identical"
  - id: "SM-2"
    metric: "release-rollback-smoke.test.js verdict from the main tree"
    baseline: "FAIL"
    target: "PASS, with the negative case still able to fail"
  - id: "SM-3"
    metric: "Assertions reading a live work item file"
    baseline: "2, in workflow-gate-evidence-utils.test.js"
    target: "0, with cross-file resolver coverage preserved"
non_goals:
  - "Changing what any assertion checks"
  - "Touching production code"
  - "Fixing L-04, the tdd-enforce stdout issue"
```

## Open Questions
```yaml
open_questions:
  - id: "OQ-1"
    question: "Is G-A's retained-rollback check about a real released artifact, or only about the identity comparison?"
    owner: "developer"
    blocks: "s06"
    what_a_usable_answer_looks_like: "Either 'it must verify a real artifact' - then the test needs a documented, loud skip path - or 'the identity comparison is the point' - then a fixture tarball is enough and is preferable."
    agent_recommendation: "The latter. The assertion is named artifact identity, and the surrounding suite already builds what it needs in tmpdirs."
missing_inputs: []
conflicts: []
```

## SDD Traceability
```yaml
requirement_refs:
  - "product-specs/cards/decouple-tests-from-tree-layout.md REQ-001, REQ-002"
acceptance_refs:
  - "AC-001, AC-002, AC-003 - see the Spec Card"
task_refs: []
test_refs:
  - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
```
