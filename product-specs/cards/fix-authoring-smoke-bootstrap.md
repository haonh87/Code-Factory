---
artifact_id: "fix-authoring-smoke-bootstrap.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
  - "qc"
  - "devops"
  - "po"
source_of_truth: true
linked_work_items:
  - "fix-authoring-smoke-bootstrap"
linked_crs:
  - "CR-006"
source_refs:
  - "product-specs/cards/approval-path-defects.md#REQ-001"
  - "work-items/approval-path-defects/approval-path-defects.s08.verification.md"
  - "changes/CHANGE-004/tasks.md#REL-F01"
  - "https://github.com/haonh87/Code-Factory/actions/runs/32704618485"
---

# Spec Card - Fix Authoring Smoke Bootstrap

> [!summary]
> Patch specification for REL-F01. The approved TD-01 behavior remains authoritative;
> this card governs the stale smoke expectation, complete release-gate evidence, and
> the separate v2.6.1 release. It does not authorize implementation or release.

## Business Goal
```yaml
business_goal: "Restore a trustworthy release signal by making the authoring smoke verify approved TD-01 behavior, then publish v2.6.1 only from an exact candidate whose complete local and remote guardrail chain is green."
in_scope:
  - "Align the stale mutating-action-requires-report smoke scenario with approved TD-01 bootstrap behavior."
  - "Prove the 13-case authoring smoke, dedicated TD-01 regression, full unit suite, pack audit, bundle smoke, exact candidate smoke, and exact rollback smoke."
  - "Require all seven sequential Workflow Guardrails jobs and both Node 18/22 Release Candidate jobs to pass before Release approval."
  - "Publish an immutable v2.6.1 GitHub tag and asset only after QC and DevOps approval, then disposition REL-F01 in CHANGE-004."
out_scope:
  - "Changing production approval semantics, trusted receipt format, signing, digest binding, TTY enforcement, or reviewed-by authority."
  - "Moving, deleting, recreating, or overwriting v2.6.0 or its uploaded artifact."
  - "Changing a public API, event contract, data contract, schema, runtime, or deployment topology."
  - "Publishing v2.6.1 to npm without a separately approved scope and valid credentials."
  - "Including unrelated dirty-worktree changes in the patch candidate."
```

## Requirements
```yaml
requirements:
  - id: REQ-001
    description: "The authoring-smoke contract must agree with the already-approved TD-01 behavior: approval of a scaffold-created work item may bootstrap and persist the missing protocol report, and persistence alone must not imply prior human approval."
    provenance: BASELINE
    cr_required: false
    baseline_ref: "product-specs/cards/approval-path-defects.md#REQ-001"
  - id: REQ-002
    description: "The patch must prove successful bootstrap provenance and the final approval transition without weakening reviewed-by, interactive-human, passphrase, receipt, or digest controls, and without changing production approval-path files."
    provenance: CR-006
    cr_required: true
  - id: REQ-003
    description: "All local verification tiers relevant to the release candidate must pass, including the complete 13-case authoring smoke and the dedicated TD-01 regression."
    provenance: CR-006
    cr_required: true
  - id: REQ-004
    description: "The required GitHub Workflow Guardrails run for the approved patch commit must complete through all seven sequential jobs and both supported Release Candidate runtimes before Release approval."
    provenance: CR-006
    cr_required: true
  - id: REQ-005
    description: "The v2.6.1 release must promote the same artifact that QC and DevOps verified, with reproducible candidate and rollback evidence and an independently checked remote digest."
    provenance: CR-006
    cr_required: true
  - id: REQ-006
    description: "Published v2.6.0 history is immutable: its annotated tag target, release asset, and recorded failure evidence must remain unchanged while v2.6.1 carries the remediation."
    provenance: CR-006
    cr_required: true
  - id: REQ-007
    description: "CHANGE-004 must record REL-F01 as resolved only after the approved v2.6.1 evidence exists, then be reassessed for archive readiness without rewriting its frozen s08 verification artifact."
    provenance: CR-006
    cr_required: true
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "In a controlled scaffold-only fixture with no protocol report, work-item approval succeeds and persists a report whose request_source is legacy-scaffold, whose audit trail includes REPORT_BOOTSTRAPPED, and whose approval fields change only as part of the explicit approve action."
  - id: AC-002
    requirement: REQ-002
    description: "The scoped implementation changes zero production approval-path files; fixtures still prove missing reviewed-by and non-interactive approval are refused, while trusted receipt and digest controls remain green."
  - id: AC-003
    requirement: REQ-003
    description: "The authoring smoke reports 13/13 cases PASS, the approval-path-defects TD-01 regression passes, all 39 baseline unit-test files pass, and workflow pack audit plus source bundle smoke complete successfully."
  - id: AC-004
    requirement: REQ-004
    description: "GitHub Workflow Guardrails for the approved patch commit concludes SUCCESS with 7/7 sequential jobs plus Node 18 and Node 22 Release Candidate jobs passing; zero required jobs fail or are skipped."
  - id: AC-005
    requirement: REQ-005
    description: "The frozen v2.6.1 candidate passes exact candidate smoke and rollback smoke 4/4; the SHA-256 measured before publication equals the digest of the asset downloaded from the final GitHub Release."
  - id: AC-006
    requirement: REQ-006
    description: "After v2.6.1 publication, the dereferenced v2.6.0 tag still equals 7c88f7d564f4c49daecc6eaec345002163f9e9ec and its retained asset SHA-256 still equals 5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9."
  - id: AC-007
    requirement: REQ-007
    description: "CHANGE-004 links the v2.6.1 commit, successful Workflow Guardrails run, release URL, tag target, and asset digest to REL-F01, and archive metadata is reassessed without editing its sealed s08 note."
  - id: AC-008
    requirement: REQ-005
    description: "The release boundary is GitHub-only: no npm publication occurs unless a later human-approved scope explicitly supplies credentials and adds npm evidence."
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - id: ASM-001
    description: "approval-path-defects REQ-001/AC-001 and its verified TD-01 behavior are the authoritative production baseline; the stale smoke assertion is not a competing specification."
    owner: "ba"
  - id: ASM-002
    description: "The existing GitHub release workflow, artifact format, and rollback smoke are reused unchanged; this patch introduces no significant packaging, runtime, or deployment architecture impact."
    owner: "devops"
  - id: ASM-003
    description: "v2.6.1 remains GitHub-only because npm credentials are unavailable and npm was not part of the approved remediation boundary."
    owner: "po"
open_decisions:
  - id: ODC-001
    description: "At s06, select whether to rewrite the obsolete mutating-action-requires-report case in place or replace it with a narrower controlled scenario; either choice must satisfy AC-001 and AC-002."
    owner: "developer"
```

## Spec Freeze
```yaml
status: draft
authority: "ba"
decided_at: ""
approved_by: "ba"
approval_recorded_at: "2026-08-24T10:42:16.000Z"
frozen_by_person: ""
freeze_requested_at: "2026-08-24"
spec_version_requested: "0.1"
```
