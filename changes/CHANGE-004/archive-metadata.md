---
change_id: "CHANGE-004"
artifact_kind: "change-archive-metadata"
status: verified
linked_work_items:
  - "integrate-design-checklists-into-sa-ta"
---

# Archive Metadata - CHANGE-004

## Archive Status
```yaml
archive_status: not_ready
verified_by:
  - "qc"
  - "devops"
  - "po"
business_acceptance: DONE
release_status: DONE
notes:
  - "Protocol is DONE and branch finalization completed at merge commit af29ed3c89d8e45a8e84cb7b4c17458744c5d181."
  - "The exact approved v2.6.0 candidate is retained at packages/workflow-bundle/workflow-bundle-2.6.0.tgz with SHA-256 5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9."
  - "GitHub Release v2.6.0 was published at 2026-08-24T08:07:38Z: https://github.com/haonh87/Code-Factory/releases/tag/v2.6.0."
  - "Annotated tag object 717d3282c4a7f9d039a5a7534a2bb4c581304d6d resolves to approved commit 7c88f7d564f4c49daecc6eaec345002163f9e9ec."
  - "The uploaded GitHub asset was downloaded after publication and matched SHA-256 5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9 byte-for-byte."
  - "npm registry publication is explicitly outside this release execution because the local npm client is not authenticated; the immutable GitHub asset is the published artifact."
  - "Post-release Workflow Guardrails run 32704618485 has six passing jobs, one failing Workflow Authoring Smoke job, and a skipped Release Candidate matrix."
  - "REL-F01 reproduces from the immutable tag target: the stale mutating-action-requires-report smoke expectation does not provide the now-required --reviewed-by argument; artifact integrity is unaffected."
  - "Archive remains blocked until REL-F01 is resolved by a separately governed fix/patch release or explicitly accepted by authorized human reviewers."
```
