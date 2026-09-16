---
change_id: "CR-009"
artifact_kind: "change-proposal"
status: approved
decision_owner: "agent"
review_required: true
approval_status: APPROVED
reviewed_by: "maintainer"
reviewed_at: "2026-09-16T07:37:51.520Z"
materialization_ref: "work-items/terminal-archive-legacy-state-reconciliation/terminal-archive-legacy-state-reconciliation.work-item-report.json"
request_summary: "Prevent terminal completion while unresolved state entries exist; require explicit opaque identifier disposition; preserve exact original text in append-only resolved-state history; prohibit semantic inference."
defect_source: "n/a"
spec_impact_classified: false
review_notes:
  - "Maintainer approved CR-009 linked defect boundary."
linked_work_items:
  - "terminal-archive-legacy-state-reconciliation"
---

# Change Proposal - CR-009

## Summary
```yaml
problem: "F-CR008-ARCH-001: a work item may be ARCHIVED while opaque legacy entries remain in blockers[], making the terminal projection misleading and branch finalization unsafe."
intent: "Restore a truthful terminal-state invariant through explicit identity-based disposition while preserving exact historical evidence."
change_scope: "Forward-only protocol behavior and persisted-state compatibility for work-item archive and legacy-state disposition."
impact_areas:
  - "work-item protocol transitions"
  - "state-entry identity and validation"
  - "resolved-state audit history"
  - "legacy report compatibility"
  - "CLI and regression fixtures"
affected_specs:
  - "skills/orchestration/codex-workflow-chain/references/work-item-protocol.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
  - "work-items/terminal-archive-legacy-state-reconciliation/terminal-archive-legacy-state-reconciliation.s01.restate.md"
```

## Decision
```yaml
status: draft
owner: "maintainer"
reviewers:
  - "developer"
  - "qc"
approval_boundary: "This proposal authorizes a separate linked defect only; Spec, DoR, Approach, Task Plan, implementation, release, and cleanup remain independently controlled."
```
