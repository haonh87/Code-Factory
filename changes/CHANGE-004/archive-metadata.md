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
archive_status: ready
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
  - "CHANGE-006 resolves REL-F01 at target 23a30756fb2271b6f1604c91e5b31092fb2dec67; Workflow Guardrails run 32825477258 passed 9/9 required jobs."
  - "Annotated v2.6.1 tag object feb5b3ee4be7109a0eccab9835dee513fbf275cc resolves to the approved target, and release asset 528978943 matches SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9."
  - "The post-v2.6.1 check reconfirmed immutable v2.6.0 target 7c88f7d564f4c49daecc6eaec345002163f9e9ec and asset SHA-256 5da823c9e64ca464630aea29dcf59ae4098bd6ea544cfdb36cdf5ccec79f3af9."
  - "Archive readiness is now READY; this reassessment does not itself execute archive or alter the frozen CHANGE-004 s08 artifact."
```
