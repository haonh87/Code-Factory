---
artifact_id: "worktree-and-closure-integrity.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
source_of_truth: true
linked_work_items:
  - "worktree-and-closure-integrity"
linked_crs: []
---

# Spec Card - Worktree And Closure Integrity

> Spec Card for `worktree-and-closure-integrity`, running `sdd_mode=light`.
> Status: **APPROVED at `v0.1`**, not frozen. Spec and DoR receipts pending a human seal;
> spec_status was advanced ahead of sealing deliberately, per the TD-02 lesson that
> finalizing after sealing guarantees a stale digest.
>
> Four defects carried out of two completed work items. Three were found by obeying the
> mandatory worktree rule; the fourth was found by noticing that a work item can reach
> `DONE` while the change it claims to have delivered exists nowhere in git history.
>
> Every one was observed as a failed command or a measured repository state, not inferred.

## Business Goal
```yaml
business_goal: "Make the governance machinery honest about two things it currently gets wrong: a tool must work in the tree it is operating on, and a work item must not be able to close while its delivery is absent from history."
in_scope:
  - "D-A: wfc protocol must pass inside a git worktree"
  - "D-B: the tdd-enforce test-path mapping must cover bin/, per the convention the hook documents for scripts/"
  - "D-C: every protocol transition that requires a finalized note must say so in the documented flow"
  - "D-D: DoD must not pass while the delivered change is uncommitted"
  - "One regression fixture per defect, each observed failing first"
out_scope:
  - "Any change to gate semantics, receipt format, signing, digest binding, or the TTY requirement"
  - "Re-opening any closed work item; the four defects are carried forward, not retro-fixed into sealed artifacts"
  - "Release or version bump"
```

## Requirements
```yaml
requirements:
  - id: REQ-001
    description: "wfc protocol passes inside a git worktree. Every .work-item-report.json stores workflow_root as an absolute path, and validate-work-item-protocol.js:121 compares it to the currently resolved path, so the check fails in any worktree - and the message names a different work item's file, which reads as data corruption rather than path resolution. CLAUDE.md 'Hard Rule: Worktree For Large Or Risky Changes' mandates a worktree for large or risky changes, so the policy requires the condition the validator mishandles. Carried from approval-path-defects REQ-007 / T0-F2."
    provenance: BASELINE
    cr_required: false
  - id: REQ-002
    description: "The tdd-enforce test-path mapping covers bin/. packages/X/bin/foo.js currently matches none of the three rules and falls to the generic rule, which asks for packages/X/bin/test/foo.test.js; the two fallbacks only rewrite /scripts/ and /src/. The hook's own header documents packages/X/scripts/foo.js mapping to packages/X/test/foo.test.js, and bin/ was never given the equivalent. Carried from approval-path-defects T4-F1."
    provenance: BASELINE
    cr_required: false
  - id: REQ-003
    description: "Every protocol transition that requires a finalized note documents that requirement. wfc work-item verify refuses with 's07 implementation note must be reviewed or finalized before verification' from workflow-gate-evidence-utils.js:340, and the published flow says nothing about it. The seal-then-activate instance of this was fixed in approval-path-defects TD-02; the verify instance is a different call site and remains undocumented. Carried from approval-path-defects RR-5."
    provenance: BASELINE
    cr_required: false
  - id: REQ-004
    description: "DoD cannot pass while the change a work item claims to have delivered is uncommitted. Measured on 2026-08-19: artifact-governance-enforcement reports protocol_status=DONE with six of six gates APPROVED and digest_match=true, while main contains none of artifactGovernance, layerRoots or the Role Outputs emission, its branch is zero commits ahead of main, and its worktree holds 51 uncommitted files. approval-path-defects reached the same state and only committed because a human asked. Governance closes; delivery does not land; nothing detects the gap."
    provenance: BASELINE
    cr_required: false
  - id: REQ-005
    description: "Each of the four defects has a regression fixture that reproduces the observed symptom before its fix and passes after, so what is verified is the symptom rather than the implementation."
    provenance: BASELINE
    cr_required: false
  - id: REQ-006
    description: "A test must not assert against mutable live repository state. Found during this work item's T0 baseline, 2026-08-19: packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js:43 asserts resolveArtifactReference returns protocol_status == 'ACTIVE' while reading the LIVE note work-items/artifact-governance-enforcement/artifact-governance-enforcement.s01.restate.md, whose protocol_status is now DONE. The assertion passed only while that work item happened to be ACTIVE and broke the moment it closed - so the suite reports a failure that says nothing about the resolver it is meant to cover, and will break again whenever any referenced work item advances. Same class as REQ-001 to REQ-003: a check that assumes the shape of its environment instead of controlling it."
    provenance: BASELINE
    discovered_during: "worktree-and-closure-integrity T0 baseline, 2026-08-19 (AMENDMENT-001)"
    cr_required: false
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "wfc protocol passes when run from inside a worktree over a work item whose report was written from the main tree. A fixture asserts it, and a fixture where workflow_root genuinely points elsewhere is still rejected - the check keeps its teeth."
  - id: AC-002
    requirement: REQ-002
    description: "An edit to packages/X/bin/foo.js is allowed when packages/X/test/foo.test.js exists and blocked when it does not, with a non-empty message. The existing exemptions - scripts/hooks/, tests, docs, config - still exit 0, and the scripts/ and mcp/src/ mappings are unchanged."
  - id: AC-003
    requirement: REQ-003
    description: "The documented flow names the finalization requirement for the verify transition as it now does for activate. A fixture asserts the text exists and appears before the verify step, mirroring the wfc.test.js assertions already in place for seal-then-activate."
  - id: AC-004
    requirement: REQ-004
    description: "Sealing dod, or transitioning to DONE, is refused while the work item's declared change paths hold uncommitted or untracked files - with a message naming them. A fixture with a clean tree passes; a fixture with a dirty declared path is refused. The refusal is overridable only with a stated reason that appears in validation output, because a docs-only work item may legitimately have nothing to commit."
  - id: AC-005
    requirement: REQ-005
    description: "Four fixtures exist, one per defect, each observed failing before its fix and passing after."
  - id: AC-006
    requirement: REQ-006
    description: "The artifact-reference resolver is covered against a controlled fixture rather than a live work item's note: the assertion supplies its own note with a known protocol_status, so the suite result does not depend on the protocol_status of any real work item. Resolver coverage is preserved, not deleted - a same-note reference is still proved to resolve. Verified by running the full unit suite with every work item left untouched and observing 0 failing files, where the T0 baseline was 1."
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - id: ASM-001
    assumption: "REQ-001 is fixed by storing workflow_root project-relative, or by normalising before comparison - whichever keeps existing reports valid without rewriting them. Existing reports must not be rewritten, because four work items' reports are referenced by sealed receipts."
    owner: "developer"
  - id: ASM-002
    assumption: "REQ-004 is enforced at the dod seal and the DONE transition, not at every gate. Earlier gates legitimately precede any code."
    owner: "developer"
open_decisions:
  - id: ODC-001
    description: "For REQ-004, what counts as the work item's declared change paths - granted_write_paths, the s05/s06 affected_boundary, or the union? granted_write_paths is machine-readable and already authoritative for the capability guard, which argues for it."
    owner: "developer"
  - id: ODC-002
    description: "Should REQ-004 require committed, or committed and merged to the default branch? Committed is enough to make the delivery durable and auditable; merged is a release concern and would block legitimate branch-parked work."
    owner: "po"
```

## Spec Freeze
```yaml
status: draft
authority: "ba"
decided_at: ""
frozen_by_person: ""
freeze_requested_at: "2026-08-19"
spec_version_requested: "0.1"
```
