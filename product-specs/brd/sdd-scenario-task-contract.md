---
artifact_id: "sdd-scenario-task-contract.brd"
artifact_family: "product-spec"
spec_type: "BRD"
spec_status: "approved"
spec_version: "0.1"
owner: "po"
reviewers:
  - "developer"
  - "qc"
source_of_truth: true
linked_work_items:
  - "sdd-scenario-task-contract"
linked_changes:
  - "CR-011"
---

# BRD — Scenario and task contract

The maintainer accepted this bounded A1-A2 specification in chat. The decision was recorded at `2026-10-30T07:15:09Z`; trusted authoring receipts and protocol activation remain pending.

## Business Context

```yaml
problem_statement: "Task prose and trace IDs do not currently prove an executable bounded task graph; A0 found concrete structural gaps and excessive proposal burden."
business_goals:
  - id: "BRD-001"
    description: "Make small AI-assisted changes reviewable through explicit scenarios and a bounded executable task contract without rewriting legacy history."
scope:
  in:
    - "A1 scenario guidance in existing skills/templates"
    - "A2 opt-in task/trace validation and focused regression fixtures"
  out:
    - "A3 execution freshness and RED/GREEN attestation"
    - "A4 review redesign"
    - "B baseline-recovery skill"
    - "C delegation"
    - "pilot fixture rule decisions"
    - "release/global install"
    - "approval routing or materializer repairs"
business_rules:
  - id: "BRD-002"
    rule: "One owner per fact; no command is executed by a validator; no technical check creates human approval."
source_inputs:
  - "docs/audits/code-factory-sdd-kit-adoption-plan.md#11-a0-baseline-assessment--2026-10-29"
```

