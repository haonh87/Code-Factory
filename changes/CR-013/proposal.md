---
change_id: "CR-013"
artifact_kind: "change-proposal"
status: approved
decision_owner: "agent"
review_required: true
approval_status: APPROVED
reviewed_by: "maintainer"
reviewed_at: "2026-11-04T02:07:36.386Z"
materialization_ref: "work-items/project-context-session-continuity/project-context-session-continuity.work-item-report.json"
request_summary: "Package reusable project instructions, memory and harness integration into a Code Factory release for upgrading existing Codex and Claude projects. Include non-destructive native instruction onboarding, canonical project context and session handoff, bounded historical retrieval, installed-versus-operational diagnostics, exact release artifact upgrade and rollback. Pilot ai-maintainer. Preserve user files and receipt authority. Release proposal requested by maintainer on 2026-11-03; production gates remain pending."
defect_source: "n/a"
spec_impact_classified: false
review_notes:
  - "Maintainer accepted Spec/Contract/DoR/Approach/Task Plan and separate CR-013 in chat on 2026-11-04; one bounded release, historical work retained."
linked_work_items:
  - "project-context-session-continuity"
---

# Change Proposal — CR-013

<!-- CR013 accepted scope -->

## Summary

```yaml
problem: "Existing projects lack reliable instruction discovery and session continuity."
intent: "Ship the accepted project lifecycle repair as the next Code Factory release."
change_scope: "CTX-01 through CTX-12; core plus project-scoped optional history companion; ai-maintainer pilot."
impact_areas:
  - "Installer, native instructions, context/handoff, harness hooks, history companion, diagnostics and release packaging"
affected_specs:
  - "product-specs/srs/project-context-session-continuity.md"
```

## Decision

Maintainer accepted this bounded CR-013 packet in chat on 2026-11-04. Trusted approval is being sealed by the human-terminal CLI. Separate historical work items retain their own approval state.

## Design And Execution Owners

Design: ../../work-items/project-context-session-continuity/project-context-session-continuity.s05.technical-approach.md

Tasks T1–T8: ../../work-items/project-context-session-continuity/project-context-session-continuity.s06.task-breakdown.md

No implementation or terminal release gate is approved by this proposal alone.
