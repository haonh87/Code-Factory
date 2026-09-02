---
change_id: "CR-008"
artifact_kind: "spec-delta-srs"
status: approved
linked_work_items:
  - "adaptive-governance-human-approval-ux"
---

# SRS Delta - CR-008

## Delta
```yaml
base_spec_ref: "policies/codex/AGENTS.global.md"
adds:
  - id: "REQ-AG-001"
    requirement: >-
      Routing deterministically emits request_lane, workflow_required, routing_reasons, and
      escalation_reasons; request_lane is one of qa, translation, summarization, research,
      documentation, read_only_analysis, maintenance, or product_delivery.
  - id: "REQ-AG-002"
    requirement: "Non-delivery routing produces no workflow artifacts unless a human explicitly requests materialization."
  - id: "REQ-AG-003"
    requirement: "Role and gate derivation is deterministic and every required entry has a reason."
  - id: "REQ-AG-004"
    requirement: "Hard triggers cannot be downgraded by agent inference or a normal preset."
  - id: "REQ-AG-005"
    requirement: "Delivery-ready and closeout bundles produce one independent trusted receipt per applicable gate."
  - id: "REQ-AG-006"
    requirement: "Bundle writes are atomic; partial success is rejected or rolled back."
  - id: "REQ-AG-007"
    requirement: >-
      New readers dual-read legacy and adaptive notes for at least three minor releases or 180 days
      after stable activation, whichever is longer; historical signed receipts are never auto-rewritten.
  - id: "REQ-AG-008"
    requirement: >-
      Telemetry is off by default and local-only in CR-008, uses an allowlist schema, omits or
      pseudonymizes work-item identity, stores no passphrase, signature, receipt body, path, username
      or sensitive request content, retains raw data for at most 30 days and aggregates for at most
      90 days, and provides a purge path.
  - id: "REQ-AG-009"
    requirement: >-
      A successful approval must reconcile report, protocol, blockers, required actions, and trusted
      receipt state so no approved item continues to claim that the same approval is pending.
  - id: "REQ-AG-010"
    requirement: >-
      Adaptive writes and Release are blocked until every supported installed harness matches the
      source bundle minor and canonical/runtime parity checks pass; legacy canonical-write remains
      available as the rollback path during the compatibility window.
  - id: "REQ-AG-011"
    requirement: >-
      Equivalent normalized routing inputs produce identical normalized lane, workflow-required,
      role, gate, routing-reason, and escalation-reason outputs across repeated runs.
updates:
  - id: "REQ-AG-U01"
    requirement: "SA and TA become trigger-based architecture lenses rather than unconditional participants in every coding task."
  - id: "REQ-AG-U02"
    requirement: "not_applicable roles and gates do not generate pending human actions."
removes:
  - "Unconditional empty role_signoffs and gate_reviews as a user-facing obligation."
```
