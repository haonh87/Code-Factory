---
artifact_id: "terminal-archive-legacy-state-reconciliation.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
  - "qc"
source_of_truth: true
linked_work_items:
  - "terminal-archive-legacy-state-reconciliation"
linked_crs:
  - "CR-009"
---

# Spec Card - Terminal Archive Legacy State Reconciliation

> [!warning]
> BA approved Spec, Developer approved Contract, and BA/QC approved DoR by accepting the exact review request on 2026-09-16. Trusted gate receipts are still separate and pending. This card does not authorize implementation or disposition of the live CR-008 entries.

## Business Goal
```yaml
business_goal: "An archived work item has no active blockers, and every formerly active legacy entry removed by an explicit Maintainer disposition remains auditable with its exact original text."
in_scope:
  - "A supported wfc command to dispose exactly one selected active state entry by opaque snapshot-bound ID."
  - "Read-only ID exposure for active blockers and required_actions."
  - "Append-only resolved-state history and fail-closed archive guard."
  - "Dual-read compatibility for existing reports without bulk migration."
  - "Regression coverage including the real CR-008 parent fixture."
out_scope:
  - "Changing already published v2.6.2, its tag, package, release evidence, or trusted receipts."
  - "Bulk rewriting historical reports or silently clearing active entries."
  - "Using display text, aliases, regex, Unicode word boundaries, or other semantic inference to choose a state transition."
  - "Publishing a new release or cleaning up the CR-008 worktree as part of authoring this specification."
```

## Requirements
```yaml
requirements:
  - id: REQ-TAR-01
    description: "Archive rejects every report with at least one active blocker, regardless of entry kind or text."
    provenance: "F-CR008-ARCH-001 and OQ-TAR-004:B"
  - id: REQ-TAR-02
    description: "The supported CLI exposes opaque, snapshot-bound IDs for each active blocker and required action and disposes only the explicitly selected entry."
    provenance: "OQ-TAR-001:B, OQ-TAR-002:A, OQ-TAR-007:A"
  - id: REQ-TAR-03
    description: "Each successful disposition is attributable to an authorized Maintainer decision and moves exact original state into append-only resolved history."
    provenance: "OQ-TAR-003:A and OQ-TAR-004:B"
  - id: REQ-TAR-04
    description: "The operation is atomic and idempotent under retry, failure, stale identity, and duplicate text."
    provenance: "OQ-TAR-001:B and CR-009 defect boundary"
  - id: REQ-TAR-05
    description: "Existing report readers continue to load historical reports without migration, preserving opaque legacy text exactly."
    provenance: "OQ-TAR-005:A"
  - id: REQ-TAR-06
    description: "The CR-008 parent remains HOLD_OPEN until its two active entries are explicitly dispositioned and independently verified; branch cleanup is a separate decision."
    provenance: "OQ-TAR-006:A and CR-008 archive metadata"
```

## Public Contract
```yaml
contract_status: APPROVED
cli_read: "wfc work-item status --work-item <slug> exposes read-only disposition_targets[] for active blockers and required_actions; each target has state_id, collection, kind, and exact text. Existing report fields remain present."
cli_write: "wfc work-item dispose-state --work-item <slug> --state-id <opaque-id> --operation-id <id> --reviewed-by maintainer --reason <non-empty-reason>"
identity: "state_id is derived from the exact report snapshot, collection, and position; duplicate text has different IDs. An ID from a changed snapshot is stale and cannot select a replacement entry."
authorization: "Maintainer must explicitly authorize or execute each disposition under the existing human-confirmation trust boundary; supplying --reviewed-by alone is not approval. The operation records actor, reason, UTC time, source collection, selected state_id, and operation_id. QC independently checks the resulting evidence before terminal acceptance."
persistence: "resolved_state_history[] is optional on legacy input and append-only on new writes. Every record contains operation_id, source_collection, source_entry_id, original_entry, original_text, actor, reason, resolved_at. original_entry retains the selected raw string or object; original_text equals its text value exactly."
retry: "The same operation_id and identical request returns the existing result without a second move or history append; reuse with different intent is rejected."
archive: "wfc work-item archive is guard-only: any active blocker rejects before mutation. It never disposes an entry from blockers or required_actions. Opaque required_actions are not silently discarded by terminal transitions."
compatibility: "Existing report JSON remains readable without migration; old consumers may ignore the optional history and additive status field. No existing fields are removed or reinterpreted."
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-TAR-01
    requirement: REQ-TAR-01
    description: "With any non-empty blockers[] (typed, legacy object, or raw legacy string), archive rejects and leaves the normalized report unchanged."
  - id: AC-TAR-02
    requirement: REQ-TAR-02
    description: "Status exposes a distinct state_id for every active entry, including equal-text entries in either collection; absent, unknown, stale, or ambiguous IDs reject without text fallback or mutation."
  - id: AC-TAR-03
    requirement: REQ-TAR-03
    description: "A successful Maintainer-authorized disposition removes exactly one selected active entry and appends exactly one history record containing its exact original_entry and original_text, source collection, actor, non-empty reason, UTC time, state_id, and operation_id. A claimed --reviewed-by value without trusted human confirmation fails."
  - id: AC-TAR-04
    requirement: REQ-TAR-02
    description: "No core transition or state assertion selects, clears, or interprets an entry by regex, substring, fuzzy alias, Unicode word boundary, normalization, or semantic inference over text."
  - id: AC-TAR-05
    requirement: REQ-TAR-03
    description: "Unknown or adversarial legacy text containing review, pending, outstanding, approve, and Unicode variants stays active and byte-identical until its own ID is explicitly dispositioned."
  - id: AC-TAR-06
    requirement: REQ-TAR-04
    description: "Repeating an identical operation_id is idempotent; reusing it with different state_id, actor, or reason fails without changing another entry or appending history."
  - id: AC-TAR-07
    requirement: REQ-TAR-04
    description: "Failure injection before and during persistence yields either the complete pre-state or the complete post-state, never removal without matching history."
  - id: AC-TAR-08
    requirement: REQ-TAR-05
    description: "All tracked protocol reports load with no pre-migration; recount the corpus at verification, and compare every original legacy text value byte-for-byte."
  - id: AC-TAR-09
    requirement: REQ-TAR-06
    description: "The CR-008 parent fixture cannot newly archive with either active blocker; after two separately authorized dispositions, blockers[] is empty and two exact originals are in history before archive may pass."
  - id: AC-TAR-10
    requirement: REQ-TAR-06
    description: "The implementation changes no existing v2.6.2 release artifact, tag, package, trusted receipt, or CR-008 historical evidence; worktree cleanup requires its own branch-finish audit."
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - "The initial corpus count was 14 including this work item; AC-TAR-08 deliberately requires a fresh count at verification."
  - "No release trigger is in CR-009 scope; publishing a package later requires a separately routed release decision."
open_decisions: []
gate_boundary: "The human approved BA Spec, Developer Contract, and BA/QC DoR on 2026-09-16; the workflow remains WAITING_APPROVAL until each digest-bound trusted receipt exists."
```
