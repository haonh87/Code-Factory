---
artifact_id: "materialization-dedup-recovery.srs"
artifact_family: product-spec
spec_type: SRS
spec_status: draft
spec_version: "0.1"
owner: "ba"
reviewers: ["developer", "qc"]
source_of_truth: true
linked_work_items: ["materialization-dedup-recovery"]
linked_changes: []
---

# SRS - Materialization Dedup Recovery

Draft for review. This document owns the requirements, acceptance criteria and proposed public contract. No command below exists in 2.6.3 yet, and no human approval is implied.

## Requirement Spec

| ID | Requirement | Acceptance |
| --- | --- | --- |
| SRS-FR-001 | Continue an eligible persisted READY/no_conflict candidate without re-analysis or treating its own folder as a duplicate. | AC-DR-01 |
| SRS-FR-002 | Continue an eligible needs_review proposal only after explicit signed disposition of its admission concerns; unsigned deletion or prose approval is insufficient. | AC-DR-02/03 |
| SRS-FR-003 | Reach authoring MATERIALIZED with pending human approval and no implementation grants. | AC-DR-04 |
| SRS-FR-004 | Make continuation repeatable without overwriting authored notes, duplicating events or discarding original evidence. | AC-DR-05/06/07 |
| SRS-NFR-001 | Preserve current signature/identity controls and validate all duplicated signed fields. | AC-DR-02/03 |
| SRS-NFR-002 | Reject stale snapshots, collisions and unsupported states before target writes. | AC-DR-03/06 |
| SRS-NFR-003 | Document the command, limitations and recovery path; retain legacy/adaptive compatibility. | AC-DR-07/08 |

## Proposed CLI And Report Contract

Proposed mode: `wfc materialize --resume-proposal --work-item <slug> --expected-report-sha256 <64-hex> --operation-id <canonical-uuid>`.

- Resume uses the existing report as input. It rejects request/profile/slug overrides and does not execute embedded command strings. Project/workflow-root selection remains supported and must resolve inside the project with a consistent slug.
- First supported shape: one brownfield item, `split_decision=single`, `change_strategy=none`, no change ID, no grant, no human work-item approval, no finalized host notes. Unsupported greenfield/split/linked-change or already approved/active/terminal state is refused without writes.
- Eligible READY case: `protocol_status=READY_TO_MATERIALIZE`, `materialization_status=READY`, `dedup_result=no_conflict`, no blockers, and only exact materializer-owned scaffold/validation pending entries. Existing pending metadata cannot substitute for actual authoring validation.
- Eligible review case: `protocol_status=PROPOSED`, `dedup_result=needs_review`, no current blockers or required actions; signature-valid Maintainer history must include the exact original near-match blocker, scope clarification followup and review-existing followup from this proposal. Verify collection, state ID, work-item slug, operation ID, actor, original object/text, reason and time against the signed intent. Recognize the producer-owned concern using the signed original_entry.id (the se: ID generated for its known purpose); the di: disposition target ID is snapshot-derived and must not be confused with that producer ID. Reject unknown remaining concerns, unsigned clearing, tampered/mismatched history, or ambiguous provenance. This reuses existing `dispose-state`; it never signs or silently retires concerns itself.
- Scope of signed dispositions remains resolution of admission concerns. Recovery does not interpret the reason text as a command or gate pass. It does not grant work-item, spec, contract, DoR, approach, task-plan or terminal approval.
- Success preserves original request, candidate snapshot, decision/event history, resolved history and unknown raw fields. Current lifecycle becomes MATERIALIZED/s01, materialization_status READY, dedup_result no_conflict. Append dated materialize-ready/materialize events as applicable and regenerate only the applicable approval/activation followups. Keep PENDING_REVIEW and an empty grant.
- Optional `materialization_recovery` record: schema_version 1, canonical operation_id, source_report_sha256, resulting status MATERIALIZED, referenced disposition operation IDs (empty for the READY case), and completed_at UTC. Its fields are machine-readable and preserved by ordinary protocol normalization. An existing valid record and matching operation ID/source hash allow NOOP/projection repair while state remains MATERIALIZED; conflicting reuse or a later lifecycle state is rejected. No identity is inferred from event prose.
- Authoring writes are missing-only. Owned existing notes are preserved except the managed s01 protocol section. Wrong ownership, unsupported metadata or path escape refuses the operation. Do not use `--force`.
- Preflight refusal changes zero report, note, capability, telemetry or trusted-approval bytes. Mid-scaffold failure may leave newly created draft notes; original report remains unchanged and a retry validates/reuses those notes. After atomic report commit, projection failure reports that commit and its operation ID; matching retry repairs projection with no duplicate transition or signature.
- Ordinary new-request materialize refuses to replace an existing report, including unapproved PROPOSED and READY reports. It points to resume or manual investigation instead of destroying the original decision trail. Overwritten reuse_work_item proposals are not auto-reconstructed.
- Output identifies APPLIED or NOOP, operation ID, current protocol state and projection status; refusal exits nonzero with a specific reason. No success output implies ACTIVE, DONE, publish or cleanup.

## Acceptance Criteria

| ID | Measurable evidence |
| --- | --- |
| AC-DR-01 | A persisted no-conflict READY candidate with no existing notes reaches MATERIALIZED through resume; all expected authoring notes validate. Existing valid drafts are preserved in a second fixture. |
| AC-DR-02 | A copied near-match proposal, with all three exact admission entries resolved through valid test-owned signatures, reaches MATERIALIZED. Original objects, text, signatures, unrelated raw fields and prior events remain intact. |
| AC-DR-03 | Missing/fake/tampered signature, wrong work item/collection/state/actor, conflicting mirrors, unsigned deletion, unresolved entry, unsupported state/shape, stale source hash, invalid operation ID, conflicting candidate metadata or request/profile override is rejected with zero target writes. |
| AC-DR-04 | Success has PENDING_REVIEW, no reviewer impersonation or trusted receipt writes, empty grants and applicable authoring actions. Activate still fails until the ordinary trusted gates pass. |
| AC-DR-05 | The same operation and original source hash produce NOOP or projection repair after success, with exactly one recovery record and no duplicate lifecycle transition. Conflicting reuse and retry after a later lifecycle transition are refused. |
| AC-DR-06 | Failure before report commit leaves original report bytes unchanged; retry safely reuses only correctly owned drafts. Failure after report commit is explicit and repairable. A lock/snapshot race, wrong-slug note or symlink escape cannot overwrite any user artifact. |
| AC-DR-07 | Default rerun on existing PROPOSED/READY/materialized/terminal reports preserves all bytes and returns a useful refusal. Legacy/adaptive fresh materialization, signed disposition, approval, gate and protocol round-trip tests remain green. |
| AC-DR-08 | English/Vietnamese documentation and CLI examples match the verified mode, prerequisites and limitations; runtime parity, applicable workflow validators and UTF-8 checks pass. |

## Authority And Compatibility

Signature bytes and receipt schemas remain unchanged. Existing disposition signatures bind the selected state entries; they do not sign the whole request or approve its implementation scope. The caller-supplied report hash is a concurrency check, not a human approval. Conflicting duplicate metadata and request/profile overrides are rejected, while the ordinary subsequent authoring gates remain responsible for approving scope. A new optional report field must survive current runtime reads/writes and be absent from untouched legacy reports. Do not run an older writer against a resumed report: older normalization may drop unknown optional fields. No migration, global install or publication is included; live CR-008 use needs its own ACTIVE maintenance owner after this repair is verified.

## Open Decisions

OQ-DR-01..05 in the work item's s03 are pending human review. In particular, reviewers must accept the bounded support matrix, existing per-entry disposition interactions and explicit default-overwrite refusal. These choices are proposed, not frozen.
