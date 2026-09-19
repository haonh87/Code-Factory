---
change_id: "CHANGE-007"
artifact_kind: "change-proposal"
status: approved
decision_owner: "agent"
review_required: true
approval_status: APPROVED
reviewed_by: "po"
reviewed_at: "2026-09-19T08:48:13.652Z"
materialization_ref: "work-items/release-workflow-bundle-v2-6-3/release-workflow-bundle-v2-6-3.work-item-report.json"
request_summary: "Prepare workflow-bundle v2.6.3 from main baseline 3204749e with immutable v2.6.2 rollback and an independent DevOps/QC Release gate."
defect_source: "n/a"
spec_impact_classified: false
review_notes:
  - "PO approved CHANGE-007 for the governed workflow-bundle v2.6.3 release."
linked_work_items:
  - "release-workflow-bundle-v2-6-3"
---

# Change Proposal - CHANGE-007

## Summary
```yaml
problem: "The public v2.6.2 package predates the fixes now merged on main, and its immutable version identity cannot represent those later changes."
intent: "Prepare and release one traceable workflow-bundle v2.6.3 patch from baseline 3204749e, preserving v2.6.2 as rollback and keeping publication behind independent DevOps/QC approval."
change_scope: "Release identity, current release surfaces, exact candidate build/verification, GitHub and npm publication decision, post-publication evidence, and rollback verification."
impact_areas:
  - "workflow-bundle package metadata and release tests"
  - "current English and Vietnamese release documentation"
  - "GitHub tag, Release, and immutable release asset"
  - "npm workflow-bundle publication and dist-tag"
  - "Codex and Claude installation/update/rollback evidence"
affected_specs:
  - "work-items/release-workflow-bundle-v2-6-3/release-workflow-bundle-v2-6-3.s01.restate.md"
```

## Decision
```yaml
status: draft
owner: "maintainer"
reviewers: ["po"]
```
