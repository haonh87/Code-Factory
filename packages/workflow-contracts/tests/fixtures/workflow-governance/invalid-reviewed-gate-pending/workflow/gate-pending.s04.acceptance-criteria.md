---
artifact_id: "gate-pending.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "gate-pending"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: FEATURE
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
sdd_mode: light
spec_refs:
  brd: "product-specs/brd/customer-search.md"
  srs: "product-specs/srs/customer-search.md"
spec_status: approved
execution_mode: agentic
execution_roles:
  - ba
  - qc
role_signoffs:
  dor:
    - ba
    - qc
  approach: []
  release: []
  business_acceptance: []
  dod: []
content_skills:
  - codex-workflow-chain
artifact_skills:
  - obsidian-markdown
upstream_artifacts:
  - "gate-pending.s01.restate.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s04
---

# Step 4 - Acceptance + DoR

## Step Contract
```yaml
step_goal: "Case fail vì gate vẫn pending dù note đã reviewed."
exit_when:
  - "Validator phải bắt status gate sai."
```

## Artifact Chính
```yaml
acceptance_criteria:
  - "Người dùng tìm được khách hàng theo tên"
edge_cases:
  - "Không có kết quả"
out_of_scope: []
done_when:
  - "AC đo được"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - id: GOV-CHK-402
    status: PASS
    evidence: "AC đã rõ"
blocking_items: []
owner: "ba"
next_action: "Đi tiếp"
```

## Definition of Ready
```yaml
status: READY
owners:
  - "ba"
  - "qc"
notes:
  - "Nhưng governance_status cố ý vẫn để pending"
```
