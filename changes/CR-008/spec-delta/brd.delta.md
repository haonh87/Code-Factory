---
change_id: "CR-008"
artifact_kind: "spec-delta-brd"
status: approved
linked_work_items:
  - "adaptive-governance-human-approval-ux"
---

# BRD Delta - CR-008

## Delta
```yaml
base_spec_ref: "skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md"
adds:
  - id: "BR-AG-001"
    requirement: "Classify request intent before applying the product-delivery workflow."
  - id: "BR-AG-002"
    requirement: "Require only roles and gates that have an applicable decision or authority."
  - id: "BR-AG-003"
    requirement: "Let a human approve a complete decision bundle instead of each artifact interaction."
  - id: "BR-AG-004"
    requirement: >-
      Measure routing accuracy, role count, gate count, approval interactions, retries, and lead time;
      after at least 20 representative adaptive runs, reduce median intake-to-ACTIVE human
      interactions by at least 50%, keep readiness and closeout to at most one bundled interaction
      each, and keep approval retry rate at or below 5%.
  - id: "BR-AG-005"
    requirement: >-
      Preserve legacy readability for at least three minor releases or 180 days after stable adaptive
      activation, whichever is longer, without rewriting historical signed receipts.
  - id: "BR-AG-006"
    requirement: >-
      Keep interaction telemetry opt-in, local-only and privacy-safe, with raw retention no longer
      than 30 days and aggregate retention no longer than 90 days.
updates:
  - id: "BR-AG-U01"
    requirement: >-
      AI proposes, human approves remains mandatory for applicable gates; the amendment reduces
      applicability and interaction count rather than allowing AI self-approval.
removes:
  - "The assumption that every coding-adjacent request originates in product development."
  - "The expectation that every work item needs the full PO/BA/SA/TA/Developer/QC/DevOps role set."
```
