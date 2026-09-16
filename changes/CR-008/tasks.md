---
change_id: "CR-008"
artifact_kind: "change-tasks"
status: approved
reviewed_by: "developer"
reviewed_at: "2026-08-28T15:08:10Z"
linked_work_items:
  - "adaptive-governance-human-approval-ux"
---

# Change Tasks - CR-008

## Tasks
```yaml
tasks:
  - { id: "T0", name: "Baseline and golden routing fixtures", owner: "qc", depends_on: [] }
  - { id: "T1", name: "Request-lane and hard-escalation contract", owner: "developer", depends_on: ["T0"] }
  - { id: "T2", name: "Pure policy kernel and admission adapter", owner: "developer", depends_on: ["T1"] }
  - { id: "T3", name: "Applicability adapters and compact artifact shape", owner: "developer", depends_on: ["T2"] }
  - { id: "T4", name: "Legacy/adaptive dual-read and activation guards", owner: "developer", depends_on: ["T3"] }
  - { id: "T5", name: "Journaled readiness approval transaction", owner: "developer", depends_on: ["T4"] }
  - { id: "T6", name: "Applicable-only closeout and compatibility fallback", owner: "developer", depends_on: ["T5"] }
  - { id: "T7", name: "Privacy-bounded interaction telemetry", owner: "developer", depends_on: ["T2", "T5", "T6"] }
  - { id: "T8", name: "Policy, docs, Guardrails and runtime parity", owner: "developer", depends_on: ["T3", "T4", "T6", "T7"] }
  - { id: "T9", name: "Integrated verify and release readiness", owner: "qc", depends_on: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"] }
dependencies:
  - "CR-007 release-integrity baseline, if that package is materialized before this change"
  - "Existing trusted-receipt compatibility contract"
  - "Isolation from CHANGE-005 and add-diagram-design-adapter WIP"
verification_tasks:
  - "Golden matrix for eight request lanes"
  - "Negative unsafe-downgrade fixtures"
  - "Independent-receipt and atomic-bundle fixtures"
  - "Transaction write-boundary failure injection and crash-recovery fixtures"
  - "Approval-state reconciliation fixture with zero stale pending claims"
  - "Legacy/new artifact compatibility matrix"
  - "Telemetry pseudonym, allowlist, retention, purge and secret-canary fixtures"
  - "Full unit, validator, authoring-smoke, pack-audit, exact-candidate, parity, UTF-8, and diff checks"
release_tasks:
  - "Record compatibility and rollback evidence"
  - "Require QC Technical Verification and DoD"
  - "Require DevOps/QC Release approval only when publication is in scope"
  - "Require PO Business Acceptance only for the approved product-outcome scope"
```
