---
artifact_id: "decouple-tests-from-tree-layout.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: draft
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
source_of_truth: true
linked_work_items:
  - "decouple-tests-from-tree-layout"
linked_crs: []
---

# Spec Card - Decouple Tests From Tree Layout

> Spec Card for `decouple-tests-from-tree-layout`, running `sdd_mode=light`.
> Status: **DRAFT**. No gate is sealed and nothing here authorises implementation.
>
> Two unit tests resolve against the wrong tree instead of controlling their own input.
> Both are the defect class this repository has now closed three times - `D-A`
> (`workflow_root` compared by spelling), `E-A` (receipt namespace derived from the current
> checkout) and `D-E` (a resolver assertion reading a live work item). These two are what
> is left of the pattern.

## Problem

A test that reads the environment instead of controlling it does not test the code; it tests
where you happened to run it. Both defects below are green in one location and red in another,
which means the suite result carries no information about correctness until you also know which
directory produced it.

This is not hypothetical tidiness. `release-rollback-smoke.test.js` is why the main-tree unit
baseline read **2 failures** while the worktree baseline read **1** during
`trusted-receipt-namespace-resolution` `T0`, and that discrepancy had to be measured and
explained before any regression comparison could be trusted.

## Requirements

```yaml
requirements:
  - id: "REQ-001"
    statement: "release-rollback-smoke.test.js must produce the same verdict from the main tree and from a worktree."
    defect_ref: "F-03 / F-05"
    location: "packages/workflow-bundle/test/release-rollback-smoke.test.js:18"
    mechanism: "defaultRollbackTarball resolves path.resolve(repoRoot, '..', 'stabilize-architecture-skill-bundle-v2.4.0', 'packages', 'workflow-bundle', 'workflow-bundle-2.4.0.tgz'). From the main tree repoRoot/.. is the parent of the repository, where that directory does not exist. From a worktree repoRoot/.. is .claude/worktrees/, where it does - measured at 886190 bytes."
    measured_2026_08_26:
      from_main_tree: "FAIL - retained v2.4.0 rollback tarball missing"
      from_worktree: "PASS"
    why_it_went_unnoticed: "It was authored from inside a worktree, where the sibling-relative path happens to resolve. The repo's own worktree convention rescues it."
    provenance: BASELINE
  - id: "REQ-002"
    statement: "workflow-gate-evidence-utils.test.js must not read a live work item note."
    defect_ref: "residual from worktree-and-closure-integrity T7"
    location: "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js - the cross-file assertion"
    mechanism: "It resolves a reference into work-items/artifact-governance-enforcement/...s01.restate.md and asserts work_item_slug. Stable today only because a slug does not change when a work item closes; it breaks if that work item is renamed, archived or moved."
    why_not_fixed_earlier: "T7 in worktree-and-closure-integrity fixed the SAME-NOTE assertion in this file. Its objective was scoped to the ACTIVE dependency, and the cross-file assertion does not depend on ACTIVE, so extending T7 would have widened a sealed task plan. Recorded there as residual_out_of_scope with this work item as the recommended home."
    provenance: BASELINE
  - id: "REQ-003"
    statement: "The unit suite must report the same failing-file count from the main tree and from a worktree."
    defect_ref: "the outcome property REQ-001 and REQ-002 exist to restore"
    location: "packages/workflow-bundle/test/run-all.js - the aggregate, not a single file"
    mechanism: "Stated separately because it is not a third defect but the property whose absence forced both preceding work items to record per-tree baselines. Closing REQ-001 and REQ-002 should satisfy it; if it does not, a third location is still coupled and must be found."
    provenance: BASELINE
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "release-rollback-smoke.test.js returns the same verdict from the main tree and from a worktree. The rollback artifact is located without depending on what sits beside the repository. The negative case survives: if the artifact is genuinely absent the test still fails, rather than skipping."
  - id: AC-002
    requirement: REQ-002
    description: "No assertion in workflow-gate-evidence-utils.test.js reads a file under work-items/ belonging to a real work item. A grep for live work-item paths returns zero hits, and the cross-file resolver is still proved to resolve against a fixture pair - coverage preserved, not deleted."
  - id: AC-003
    requirement: REQ-003
    description: "The full unit suite reports the same number of failing files from the main tree and from a worktree. This is the criterion that makes a baseline comparable without a per-tree caveat, which the two preceding work items both had to write."
```

## Non-Goals

```yaml
non_goals:
  - "Changing what any of these tests assert. Coverage is preserved; only where the input comes from changes."
  - "Deleting an assertion to make the suite green. That would also turn it green and would be the wrong answer - the same warning T7 carried."
  - "The tdd-enforce stdout/stderr issue (L-04). It is an operator-output defect, not test hygiene, and it belongs in its own item."
  - "Any production code under packages/workflow-bundle/scripts or bin. This work item touches test files only."
  - "Re-running or re-verifying the work items these tests happen to reference."
```

## Constraints

```yaml
constraints:
  - "Test-only change. If a fix appears to need production code, stop and re-scope rather than widening quietly."
  - "Behaviour change in a test is still a behaviour change: each defect gets its failing state observed first, from the tree where it currently fails."
  - "REQ-001 must not be 'fixed' by making the test skip when the artifact is missing. A check that cannot fail is not a check."
```

## Spec Freeze
```yaml
status: draft
authority: "ba"
decided_at: ""
frozen_by_person: ""
freeze_requested_at: "2026-08-27"
spec_version_requested: "0.1"
```
