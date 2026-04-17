---
artifact_id: "customer-search.s08.verification"
artifact_family: workflow-step
work_item_slug: "customer-search"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: FEATURE
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: light
spec_refs:
  brd: "product-specs/brd/customer-search.md"
  srs: "product-specs/srs/customer-search.md"
spec_status: verified
execution_mode: agentic
execution_roles:
  - qc
  - developer
role_signoffs:
  dor: []
  approach: []
  release: []
  business_acceptance:
    - po
  dod:
    - qc
content_skills:
  - codex-workflow-chain
artifact_skills:
  - obsidian-markdown
upstream_artifacts:
  - "customer-search.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s08
---

# Step 8 - Verify + DoD

## Step Contract
```yaml
step_goal: "Kiểm chứng customer search đáp ứng AC và đủ điều kiện đóng DoD."
exit_when:
  - "Evidence verify đủ rõ."
  - "Không còn gap governance mở."
```

## Artifact Chính
```yaml
verification_scope:
  - "UI search"
  - "API filtering"
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - id: GOV-CHK-201
    status: PASS
    evidence: "Không còn blocker governance"
blocking_items: []
owner: "qc"
next_action: "Đóng DoD"
```

## Spec Coverage
```yaml
coverage:
  - ref: "AC-001"
    status: PASS
  - ref: "AC-002"
    status: PASS
```

## Scan Summary
```yaml
status: PASS
notes:
  - "Không có issue blocker"
```

## Audit
```yaml
status: PASS
notes:
  - "Evidence trace được về AC"
```

## Definition of Done
```yaml
status: DONE
approved_by:
  - "qc"
residual_risks: []
```

## Traceability
```yaml
upstream:
  - "customer-search.s06.task-breakdown.md"
```

## Handoff
- Điều đã rõ: AC đều pass.
- Điều còn cần theo dõi: monitor usage sau release đầu.
- Điều kiện đóng work item: PO xác nhận business acceptance.
