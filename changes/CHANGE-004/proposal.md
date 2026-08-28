---
change_id: "CHANGE-004"
artifact_kind: "change-proposal"
status: approved
decision_owner: "agent"
review_required: true
approval_status: APPROVED
reviewed_by: "po"
reviewed_at: "2026-08-20T08:52:37.259Z"
materialization_ref: "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.work-item-report.json"
request_summary: "Derive domain-neutral, confidentiality-safe design-readiness rules and checklists from human-capability-documents/docs/design.md for SA and TA while preserving their s01-s04 authority boundary and bundle parity."
defect_source: "n/a"
spec_impact_classified: true
review_notes:
  - "Human review approved this change package."
linked_work_items:
  - "integrate-design-checklists-into-sa-ta"
---

# Change Proposal - CHANGE-004

## Summary
```yaml
problem: "SA and TA identify architecture drivers but lack a reviewed reusable checklist for several pre-design concerns demonstrated by the internal source; importing that source directly would leak contextual decisions, duplicate existing contracts, and risk moving technical design into s01-s04."
intent: "Improve SA/TA pre-design completeness by adding portable, conditional architecture-readiness guidance without publishing HCP-specific content or moving s05 decisions upstream."
change_scope: "Classify R-01 through R-34, derive role-owned guidance and handoffs, preserve the existing SA/TA output and ownership contracts, update EN/VI canonical sources and both generated runtimes after approval, and verify confidentiality, behavior, parity, packaging, and compatibility."
impact_areas:
  - "skills/analysis/sa"
  - "skills/analysis/ta"
  - "packages/workflow-bundle/runtime/codex/skills/sa"
  - "packages/workflow-bundle/runtime/codex/skills/ta"
  - "packages/workflow-bundle/runtime/claude/skills/sa"
  - "packages/workflow-bundle/runtime/claude/skills/ta"
  - "architecture role contract tests, workflow pack audit, bundle inventory, and release surfaces when applicable"
affected_specs:
  - "SA/TA public skill behavior and shared reference contract"
  - "architecture role workflow integration contract"
```

## Decision
```yaml
status: approved
owner: "agent"
reviewers:
  - "po"
  - "ba"
  - "developer"
  - "qc"
```
