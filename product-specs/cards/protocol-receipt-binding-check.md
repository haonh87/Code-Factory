---
artifact_id: "protocol-receipt-binding-check.card"
artifact_family: "product-spec"
spec_type: "SPEC_CARD"
spec_status: "approved"
spec_version: "0.1"
owner: "ba"
reviewers: ["developer", "qc"]
source_of_truth: true
linked_work_items: ["protocol-receipt-binding-check"]
linked_crs: []
---

# Spec Card — CF-023 Receipt Binding

Human content approval is recorded in s04 and sealed by its Spec receipt. Full planning, strict
governance and persisted `sdd_mode=none` remain unchanged.
The historical report's FEATURE enum is retained for supported recovery; the semantic change is
a bug fix, with no new feature or receipt format. This card is the single requirements owner.

## Scope

```yaml
in_scope:
  - "Correct the approvedGates collector used by protocol contradiction validation."
  - "Use existing receipt signature/status, host resolution and artifact-ref/hash comparison contracts."
  - "Regression coverage through the actual validator, with isolated synthetic fixtures."
out_of_scope:
  - "Signing, key handling, TTY/passphrase, receipt namespace/schema and trust-root changes."
  - "Receipt/report migration, resealing, clearing pending state, gate applicability redesign or approval bypass."
  - "New approval states, work-item/change-receipt semantics, product integrations or registry/public release."
  - "Parent audit closure, live harness installation and unrelated security/language/workspace findings."
classification: "BUG behavior; historical runtime work_item_type remains FEATURE until a separately supported reclassification exists."
```

## Requirements

```yaml
requirements:
  - id: REQ-RB-001
    statement: "An approved gate in contradiction analysis must have a signature-valid APPROVED receipt bound to the current gate-host reference and bytes."
    provenance: BASELINE
    source: "CF-023 current-main reproduction and existing getTrustedReceiptArtifactErrors contract"
  - id: REQ-RB-002
    statement: "Accurate pending-review state for different or absent evidence must not be reported as contradicting an approval of that evidence."
    provenance: BASELINE
    source: "CF-023 MATERIALIZED/stale-host reproduction"
  - id: REQ-RB-003
    statement: "Existing strict lifecycle rejection, one-repository receipt namespace, full/Light mapping and opaque legacy-state interpretation must remain intact."
    provenance: BASELINE
    source: "Current lifecycle guard and completed namespace-resolution work item"
  - id: REQ-RB-004
    statement: "Diagnostics must be read-only; unexpected I/O/corrupt receipt failures must remain visible rather than silently converted to approval or successful validation."
    provenance: BASELINE
    source: "Current read-only validator boundary and fail-closed governance"
```

## Acceptance Criteria

```yaml
acceptance_criteria:
  - id: AC-RB-001
    requirement: REQ-RB-001
    description: "Actual validator retains the existing contradiction error for a signature-valid APPROVED receipt with matching ref/hash plus a typed pending entry for that gate; matching evidence without pending state introduces no new error."
  - id: AC-RB-002
    requirement: REQ-RB-002
    description: "Changed host bytes with a still-valid receipt signature produce zero approved-gate contradiction errors at MATERIALIZED; the same stale evidence still causes ACTIVE guard rejection."
  - id: AC-RB-003
    requirement: REQ-RB-002
    description: "Wrong artifact_ref with matching content hash produces zero approved-gate contradiction errors; ACTIVE still rejects the ref mismatch."
  - id: AC-RB-004
    requirement: REQ-RB-002
    description: "Missing gate host produces no approved-gate contradiction or uncaught ENOENT in pre-activation validation; ACTIVE retains the missing-evidence rejection."
  - id: AC-RB-005
    requirement: REQ-RB-001
    description: "Missing receipt, rejected receipt, invalid signature and wrong public key do not enter approvedGates; existing required-evidence guard failures are preserved. Corrupt receipt JSON remains an explicit validation failure."
  - id: AC-RB-006
    requirement: REQ-RB-003
    description: "Full profile approach resolves s05; Light approach resolves s06. Both profiles run matching and stale controls through the collector. Shared-repository namespace tests remain green."
  - id: AC-RB-007
    requirement: REQ-RB-004
    description: "Read-only validation leaves all fixture reports, notes, receipts and key bytes unchanged. Injected EACCES/unexpected I/O remains visible; no catch-all turns it into PASS."
  - id: AC-RB-008
    requirement: REQ-RB-003
    description: "Opaque legacy prose is not inferred as a pending approval; existing typed-state and ACTIVE/VERIFIED/DONE gate regressions remain green."
  - id: AC-RB-009
    requirement: REQ-RB-004
    description: "Record fail-first actual-validator regressions for stale hash/ref, then GREEN after the bounded correction, focused suites and registered full suite. No live work item or installed signing material is required by permanent tests."
```

## Compatibility and Error Contract

Apply the corrected read on every validation of current notes, regardless of receipt creation
date. This is not a retrospective write or revocation: no stored approval or historical decision
is modified. Valid matching approvals remain valid here; stale approvals remain approvals of
their original bytes only. No grandfather exception, report clearing or bulk resealing is proposed.
Existing message text for real contradictions and lifecycle binding failures remains stable.
A missing host is absence of evidence; unexpected I/O/corrupt JSON is a diagnostic failure.

Reviewer compatibility remains enforced by the lifecycle guard. This fix does not redefine
`hasApprovedReceipt` or expand the semantics of work-item/change receipts. If implementation
exposes a distinct reviewer or signing defect, report it independently rather than widening this fix.

## Verification and Freeze

All nine criteria require source-bound evidence. The October 26 diagnostic establishes the bug
but is not the implementation's TDD cycle. A temporary synthetic project exercises the public
validator entrypoint and standard test runner; all mutation is confined to test-owned temporary
roots. The approved card digest is pinned in s04. Any later content change requires renewed review;
human gate receipt, finalized note and matching current hash remain separate controls.
