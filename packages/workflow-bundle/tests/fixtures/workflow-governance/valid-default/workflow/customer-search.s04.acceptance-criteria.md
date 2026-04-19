---
artifact_id: "customer-search.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "customer-search"
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
governance_status: ALIGNED
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
  - po
  - qc
role_signoffs:
  dor:
    - ba
    - qc
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by:
    - ba
    - qc
  dor_reviewed_at: "2026-04-14T09:00:00Z"
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - codex-workflow-chain
artifact_skills:
  - obsidian-markdown
upstream_artifacts:
  - "customer-search.s01.restate.md"
linked_artifacts: []
tags:
  - agent-ops
  - workflow/s04
---

# Step 4 - Acceptance + DoR

## Step Contract
```yaml
step_goal: "Khóa acceptance criteria và DoR cho customer search."
exit_when:
  - "Acceptance criteria đo được."
  - "DoR đủ để vào Technical Approach."
```

## Artifact Chính
```yaml
acceptance_criteria:
  - "Người dùng tìm được khách hàng theo tên."
  - "Người dùng tìm được khách hàng theo email."
  - "Danh sách cập nhật trong vòng 1 giây sau khi nhập xong."
edge_cases:
  - "Không có kết quả"
  - "Email nhập hoa thường"
out_of_scope:
  - "Tìm kiếm nâng cao nhiều field"
done_when:
  - "AC đều có test path rõ"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - id: GOV-CHK-001
    status: PASS
    evidence: "Requirement và AC đã rõ"
  - id: GOV-CHK-002
    status: PASS
    evidence: "Không có boundary risk đặc biệt"
blocking_items: []
owner: "ba"
next_action: "Sang step 5"
```

## Definition of Ready
```yaml
status: READY
owners:
  - "ba"
  - "qc"
notes:
  - "AC đủ rõ để design và implement"
```

## Traceability
```yaml
upstream:
  - "customer-search.s01.restate.md"
next_step: "customer-search.s05.technical-approach.md"
```

## Handoff
- Điều đã rõ: AC, edge cases và DoR đã chốt.
- Điều còn cần theo dõi: debounce strategy.
- Điều kiện sang step 5: chọn Technical Approach bám AC hiện tại.
