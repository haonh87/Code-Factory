---
artifact_id: "recover-proposals-with-new-change.srs"
artifact_family: product-spec
spec_type: SRS
spec_status: approved
spec_version: "0.1"
owner: "ba"
reviewers: ["developer", "qc"]
source_of_truth: true
linked_work_items: ["recover-proposals-with-new-change"]
linked_changes: []
---

# SRS — Recovery with a new change package

## Objective
Resume reviewed create_new intake without discarding signed history. The consumer is release-workflow-bundle-v2-6-4 / CHANGE-008; that release remains independently governed. The archived materialization-dedup-recovery scope is preserved.

## Scope
Only a single unapproved brownfield proposal creating a new full change package is added. Existing no-change recovery remains supported. Reuse, linking existing changes, compact changes, greenfield, split and later lifecycle states remain excluded. No CLI flags, automatic approvals, production publication or tag changes are introduced.

## Acceptance Criteria

| AC-RC-01 | Eligible single unapproved brownfield create_new proposals create canonical full change and workflow drafts with consistent IDs and links; work-item and change approvals remain pending and write grants remain empty. |
| AC-RC-02 | Validate signatures and report snapshot before target writes; preserve candidate snapshot, resolved_state_history and unknown report fields. Tampering, unresolved concerns and metadata mismatch fail with zero target writes. |
| AC-RC-03 | Reject invalid IDs, path aliases, symlinks, unrelated existing packages, reuse/link-existing strategies and active/approved/terminal proposals. Never execute stored scaffold_actions or enable force overwrite. |
| AC-RC-04 | Retry after partial creation uses the same operation UUID and original report hash and only matching operation-owned files. Preserve original report until atomic commit; successful same-operation retry is byte-stable, without duplicate events. |
| AC-RC-05 | Two recovery operations claiming one change ID cannot both succeed. Conflicting claim or ownership refuses without overwriting the winning package. |
| AC-RC-06 | Existing no-change recovery, fresh scaffold, approval and activation guards remain compatible. Recovery does not approve, activate, publish, or clean up. |
| AC-RC-07 | English and Vietnamese documentation states exact support and limitations; targeted tests, full unit checks, workflow validators, runtime parity and UTF-8 checks pass. |

## Authority
User explicitly accepted the Spec/DoR, Approach and Task Plan packet in chat, recorded at 2026-10-15T08:31:25Z. Trusted sealing remains pending; no implementation authority is inferred before receipt verification. Standalone implementation work item has no enclosing change; recovered release retains its change association and approval requirements.
