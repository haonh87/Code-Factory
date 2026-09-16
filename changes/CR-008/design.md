---
change_id: "CR-008"
artifact_kind: "change-design"
status: approved
linked_work_items:
  - "adaptive-governance-human-approval-ux"
---

# Change Design - CR-008

## Design
```yaml
summary: >-
  Use a pure adaptive-governance policy kernel with existing-runtime adapters. Non-delivery lanes
  return before delivery writes; delivery lanes derive the smallest applicable role/gate set.
  A focused filesystem transaction coordinator presents one human decision summary while retaining
  one independently verifiable signed receipt per applicable gate.
approach_status: APPROVED_PENDING_RECEIPT
reviewed_by: "developer"
reviewed_at: "2026-08-28T14:50:08Z"
recommended_option: "Pure policy kernel plus existing-runtime adapters"
recommendation_reason: >-
  Admission, scaffold, validator and protocol all need the same deterministic decision, while
  approval bundles need one owner for staging, commit, recovery and state reconciliation. Keeping
  these as two focused internal modules is smaller and safer than either duplicated inline rules or
  a new external policy engine.
technical_changes:
  - "Add a pure kernel for request_lane, workflow_required, routing_reasons and escalation_reasons."
  - "Make materialize, scaffold, validator and protocol consume one normalized decision contract."
  - "Derive execution_roles, approval_gates and stable reason codes from applicability triggers."
  - "Keep backward-compatible readers for legacy notes with the full fixed signoff shape."
  - "Add journaled readiness/closeout transaction orchestration over the existing trusted signer."
  - "Reconcile report, protocol, blockers and actions without modifying signed gate-host content."
  - "Harden telemetry with an allowlist, pseudonymous identifier, 30/90-day retention and purge."
  - "Block adaptive writes and Release until source/candidate/installed runtime parity passes."
ux_or_runtime_changes:
  - "Q&A, research, translation, and read-only analysis do not enter delivery by default."
  - "Maintenance work no longer requests product or architecture roles without a named trigger."
  - "A required role or gate always carries a reason; not_applicable creates no pending action."
  - "Humans review one bundle summary while the runtime preserves independent receipts."
routing_boundary:
  owns: ["normalization", "lane classification", "hard escalation", "role/gate applicability", "reason codes"]
  excludes: ["filesystem writes", "receipt signing", "interactive approval"]
approval_transaction_boundary:
  owns: ["preflight", "summary", "staging", "journal", "commit/recovery", "state reconciliation"]
  excludes: ["human authority policy", "signer-session caching", "receipt schema redesign"]
compatibility_and_rollback:
  - "Dual-read legacy and adaptive artifacts for 3 minor releases or 180 days, whichever is longer."
  - "Preserve receipt schema v1 and historical signatures without rewrite."
  - "Retain individual gate commands and fixed-shape writer during the rollback window."
  - "Disable adaptive writes on runtime version skew or parity failure."
risk_notes:
  - "Unsafe downgrade is blocked by deterministic public-contract, migration, security, regulated, and release triggers."
  - "Bundle preflight must finish before staging; caught failures roll back and crash recovery is idempotent."
  - "Signed gate-host notes must be receipt-neutral and never be edited by post-seal reconciliation."
  - "Telemetry remains opt-in, local-only and free of raw request, path, slug, signature or review-note data."
  - "Bounded signer-session/passphrase caching is explicitly outside this change."
validation_direction:
  - "Golden lane/hard-trigger matrix and adapter parity"
  - "Failure injection and crash recovery for every bundle boundary"
  - "Legacy/adaptive artifact plus trusted-receipt matrix"
  - "Telemetry no-op, allowlist, retention, purge and secret canary"
  - "Node 18/22 full suite, pack audit, exact candidate smoke and runtime parity"
```
