---
change_id: "CHANGE-001"
artifact_kind: "change-proposal"
status: approved
decision_owner: "agent"
review_required: true
approval_status: APPROVED
reviewed_by: "po"
reviewed_at: "2026-04-19T10:10:00Z"
materialization_ref: ""
request_summary: ""
review_notes:
  - "Approved source-of-truth change package."
linked_work_items:
  - "sample-sdd-item"
---

# Change Proposal - CHANGE-001

## Summary
```yaml
problem: ""
intent: "Package the workspace-aware session search change as a change package to trace from spec to rollout."
change_scope: "Add an optional workspace filter and keep backward compatibility."
impact_areas:
  - "session-search query flow"
  - "BRD/SRS traceability"
affected_specs:
  - "product-specs/brd/sample-sdd-item.md"
  - "product-specs/srs/sample-sdd-item.md"
```

## Decision
```yaml
status: approved
owner: "po"
reviewers:
  - "ba"
  - "developer"
```