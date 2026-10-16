---
change_id: "CR-010"
artifact_kind: "change-proposal"
status: approved
decision_owner: "agent"
review_required: true
approval_status: APPROVED
reviewed_by: "maintainer"
reviewed_at: "2026-10-16T07:23:10.604Z"
materialization_ref: "work-items/release-workflow-bundle-v2-6-4-cr010/release-workflow-bundle-v2-6-4-cr010.work-item-report.json"
request_summary: "Prepare immutable workflow-bundle v2.6.4 from integrated main cbf6c09, preserving v2.6.3. Include P-INSTALL in the release tag and source archive, inventory all packaged delta, verify one candidate artifact, and publish only after candidate-specific Release approval. This replaces cancelled release-workflow-bundle-v2-6-4 because CHANGE-008 aliases existing CR-008; use unused canonical CR-010."
defect_source: "n/a"
spec_impact_classified: false
review_notes:
  - "User accepted CR-010 release preparation packet at 2026-10-16T06:59:48Z. Preserve v2.6.3; require P-INSTALL in v2.6.4 tag/source; no publication authorization."
linked_work_items:
  - "release-workflow-bundle-v2-6-4-cr010"
---

# Change Proposal - CR-010

## Summary
```yaml
problem: "Published v2.6.3 predates accepted P-INSTALL and integrated CLI fixes."
intent: "Prepare immutable v2.6.4 while preserving v2.6.3."
change_scope: "Release preparation, verified artifacts and separately approved publication"
impact_areas: ["Package identity", "Release documentation", "Verification and provenance"]
affected_specs: ["product-specs/srs/release-workflow-bundle-v2-6-4.md"]
```
## Decision
```yaml
status: approved
owner: maintainer
reviewers: ["developer", "qc", "devops"]
```
User explicitly accepted this CR-010 change package and the preparation packet at 2026-10-16T06:59:48Z. CLI-owned approval fields and trusted receipt remain pending until the human signs. This content approval does not authorize publication.
