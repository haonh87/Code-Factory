---
change_id: "CR-008"
artifact_kind: "change-proposal"
status: approved
decision_owner: "agent"
review_required: true
approval_status: APPROVED
reviewed_by: "po"
reviewed_at: "2026-08-28T13:15:30.575Z"
materialization_ref: "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.work-item-report.json"
request_summary: "Introduce adaptive request-lane admission, context-based role and gate routing, bundled human approvals, and interaction telemetry without weakening mandatory high-risk controls."
defect_source: "n/a"
spec_impact_classified: true
review_notes:
  - "Human review approved this change package."
linked_work_items:
  - "adaptive-governance-human-approval-ux"
---

# Change Proposal - CR-008

## Summary
```yaml
problem: >-
  Code-Factory currently routes too many requests through the product-delivery workflow, emits a
  broad fixed role/signoff surface, and fragments human approval across multiple interactions. This
  creates unnecessary PO, BA, SA, TA, QC, and DevOps ceremony for research, documentation, and
  engineering-maintenance requests, while making the human-controlled model feel obstructive.
intent: >-
  Route requests by lane and risk, derive only the roles and gates that are actually applicable,
  and let one human decision seal multiple independent receipts without weakening hard escalation
  for public contracts, migrations, security-sensitive work, regulated evidence, or releases.
change_scope: >-
  Add deterministic request-lane admission, adaptive role/gate routing, compact not-applicable
  representation, delivery-ready and closeout approval bundles, and interaction telemetry. Defer
  passphrase-session caching until telemetry proves it remains necessary.
impact_areas:
  - "Workflow governance policy and router contract"
  - "Materialization, scaffolding, protocol, and gate-review runtime"
  - "Workflow validators and authoring smoke fixtures"
  - "Telemetry, public documentation, and Codex/Claude runtime parity"
affected_specs:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
```

## Decision
```yaml
status: approved
owner: "developer"
reviewers:
  - "ba"
  - "qc"
  - "devops"
decision_note: >-
  PO approved CR-008 and the linked work item through trusted receipts on 2026-08-28. Spec,
  Contract, DoR, Approach, Task Plan, and delivery closeout gates remain independently controlled.
```
