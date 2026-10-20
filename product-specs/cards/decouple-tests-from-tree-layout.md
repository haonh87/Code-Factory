---
artifact_id: "decouple-tests-from-tree-layout.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "0.2"
owner: "ba"
reviewers:
  - "developer"
source_of_truth: true
linked_work_items:
  - "decouple-tests-from-tree-layout"
linked_crs: []
---

# Spec Card - Decouple Tests From Tree Layout

Human content decision: accepted 2026-10-19; s06 owns the decision and exact upstream packet binding. Trusted receipts are independently required before implementation.

## Scope
```yaml
in_scope:
  - "Replace the live-input block in packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js with temporary note/report fixtures."
  - "Retain same-note protocol/report and cross-file materialization checks; add changed-value and missing-target controls."
  - "Focused isolation probes, same-source two-tree suite comparison and child evidence."
out_scope:
  - "Production scripts/bin, public contracts, CI/release changes, runtime or global installation."
  - "Editing release-rollback-smoke.test.js or the real work items previously used as test inputs."
  - "Deleting assertions or allowing a missing real work item to skip checks."
```

## Requirements
```yaml
requirements:
  - id: REQ-001
    statement: "Preserve the predecessor's rollback-test independence from sibling worktree layout."
    provenance: BASELINE
    disposition: "Satisfied by a9888a9; T1 remains SUPERSEDED, no new rollback implementation."
  - id: REQ-002
    statement: "The target resolver test controls its own note/report inputs and reads no real work item."
    provenance: BASELINE
  - id: REQ-003
    statement: "The same post-change source yields equal full-suite failing-file counts in two independent trees under equivalent runtime prerequisites."
    provenance: BASELINE
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "Retain predecessor evidence and run the unchanged rollback source check in both verification trees. Source/exact-artifact separation and missing-artifact behavior remain unchanged; do not claim a new exact-artifact rehearsal."
  - id: AC-002
    requirement: REQ-002
    description: "Zero real-work-item dependencies in the target test. Both protocol/report and cross-file assertions use synthetic fixtures. Changing a fixture value changes the resolved result; removing the target produces ARTIFACT_REFERENCE_FILE_MISSING. The test passes with real-work-item data absent, present and independently changed."
  - id: AC-003
    requirement: REQ-003
    description: "run-all.js produces equal failing-file counts in two trees with identical post-change source and equivalent generated runtime prerequisites. Record counts and failure identities; no newly introduced failure is accepted, and equal nonzero counts are not a whole-suite PASS."
```

## Constraints
```yaml
constraints:
  - "Reproduce the no-live-data failure before T2; do not call the earlier diagnostic a completed TDD cycle."
  - "Preserve assertions and error semantics; use try/finally for test-owned scratch."
  - "No production fix without separate scope review."
  - "DoD, merge and cleanup remain independently controlled."
```

## Spec Freeze
```yaml
status: FROZEN
authority: ba
decided_at: "2026-10-19T03:09:32Z"
frozen_by_person: "Hao, Nguyen Huu (user acceptance)"
spec_version: "0.2"
notes: "Content decision recorded at this UTC time, not a claimed chat timestamp or trusted signature."
```
