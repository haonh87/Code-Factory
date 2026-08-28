---
change_id: "CHANGE-006"
artifact_kind: "change-proposal"
status: approved
decision_owner: "agent"
review_required: true
approval_status: APPROVED
reviewed_by: "po"
reviewed_at: "2026-08-24T09:42:55.704Z"
materialization_ref: "work-items/fix-authoring-smoke-bootstrap/fix-authoring-smoke-bootstrap.work-item-report.json"
request_summary: "Resolve REL-F01 by aligning the stale mutating-action-requires-report smoke fixture with approved TD-01 bootstrap behavior; rerun guardrail CI and publish patch v2.6.1 without moving v2.6.0."
defect_source: "code"
spec_impact_classified: true
review_notes:
  - "Approved amended classification: defect_source=code; spec impact is test-and-release only; SDD Light remains eligible."
linked_work_items:
  - "fix-authoring-smoke-bootstrap"
---

# Change Proposal - CHANGE-006

## Summary
```yaml
problem: "The public v2.6.0 release has a deterministic required Workflow Guardrails failure because the legacy mutating-action-requires-report smoke case expects approve to reject a missing report, while approved TD-01 requires approve to bootstrap and persist that report with auditable provenance."
intent: "Restore an honest green release signal with the smallest test-harness delta that preserves TD-01, then publish a separately approved v2.6.1 patch without altering v2.6.0 history."
change_scope: "Align the stale authoring-smoke expectation with approved bootstrap behavior; verify the complete local and GitHub guardrail chain; publish an exact v2.6.1 GitHub artifact after Release approval; record the REL-F01 disposition in CHANGE-004."
impact_areas:
  - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
  - "workflow-bundle regression and release-candidate evidence"
  - "GitHub release v2.6.1 and CHANGE-004 REL-F01 disposition"
affected_specs:
  - "product-specs/cards/approval-path-defects.md#REQ-001"
  - "product-specs/cards/approval-path-defects.md#AC-001"
  - "changes/CHANGE-004/tasks.md#REL-F01"
classification:
  defect_source: "code"
  spec_impact: "test_and_release_only"
  public_api_event_data_contract_change: false
  production_behavior_change: false
  rationale: "The failing assertion is located in the authoring-smoke harness. Approved TD-01 production behavior remains authoritative; the delta changes verification and patch-release evidence only."
```

## Decision
```yaml
status: approved
owner: "po"
reviewers:
  - "po"
  - "ba"
  - "developer"
  - "qc"
  - "devops"
```
