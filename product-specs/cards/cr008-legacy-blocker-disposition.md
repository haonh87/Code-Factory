---
artifact_id: "cr008-legacy-blocker-disposition.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: draft
spec_version: "0.1"
owner: "developer"
reviewers:
  - "qc"
source_of_truth: true
linked_work_items:
  - "cr008-legacy-blocker-disposition"
linked_crs: []
---

# Spec Card - CR-008 Legacy Blocker Disposition

Draft application of the shipped CR-009 disposition contract and existing branch-finish rules. BASELINE means an existing control, not new product behavior or an assertion of approval. The adaptive maintenance lane requires task_plan and dod; this card adds no Spec, business, or release gate.

## Business Goal

```yaml
business_goal: "Reconcile two historical CR-008 blocker entries with valid archived evidence while preserving originals and disposition authority."
in_scope:
  - "Exactly two Maintainer-signed live dispositions and their CLI-managed projection"
  - "Dated CR-008 finding/finish reconciliation and conditional worktree cleanup"
out_scope:
  - "Source-code, signer, receipt-format, release, or publication changes"
  - "Protected master audit register, unrelated dirty paths, other worktrees, remote branch deletion"
```

## Requirements

```yaml
requirements:
  - id: REQ-001
    description: "Use exact-ID, human-authenticated disposition and retain each original opaque entry in append-only signed history."
    provenance: BASELINE
    cr_required: false
  - id: REQ-002
    description: "Reconcile current blockers without changing archived lifecycle or fabricating transitions."
    provenance: BASELINE
    cr_required: false
  - id: REQ-003
    description: "Preserve historical gate hosts, trusted receipts and release evidence."
    provenance: BASELINE
    cr_required: false
  - id: REQ-004
    description: "Close the recorded cleanup finding only with explicit verified disposition and an approved handoff."
    provenance: BASELINE
    cr_required: false
  - id: REQ-005
    description: "Limit writes to the owning maintenance grant; remove only a fully attributed, verified and durably handed-off workspace."
    provenance: BASELINE
    cr_required: false
```

## Acceptance Criteria

```yaml
acceptance_criteria:
  - id: AC-01
    requirement: REQ-001
    description: "Exactly two new signature-verified history records preserve the original raw objects, with distinct operation IDs and no duplicate disposition."
  - id: AC-02
    requirement: REQ-002
    description: "Parent remains ARCHIVED with zero blockers and required_actions; no reopen or archive event is invented."
  - id: AC-03
    requirement: REQ-003
    description: "Existing s04-s08 host hashes are unchanged; parent DoD, Release and Business Acceptance remain APPROVED with digest_match=true."
  - id: AC-04
    requirement: REQ-004
    description: "Dated F-CR008-ARCH-001 and branch-finish decisions link both signed dispositions and maintenance verification while retaining earlier release evidence."
  - id: AC-05
    requirement: REQ-005
    description: "Diff is within granted paths and passes UTF-8 and applicable workflow checks; cleanup requires QC DoD, durable integration, zero unique commits, clean worktree, and zero unattributed or unique ignored files."
```

## Assumptions And Open Decisions

```yaml
assumptions:
  - id: ASM-001
    description: "Evidence and exact IDs must be refreshed if target bytes change, including after the first disposition."
    owner: "developer"
open_decisions: []
resolved_decisions:
  - "ODC-001: PR #10 recovery executed after three verified admission signatures on 2026-09-22; work-item and Task Plan approval remain separate implementation prerequisites."
```

## Spec Freeze

```yaml
status: draft
authority: "developer"
decided_at: ""
```
