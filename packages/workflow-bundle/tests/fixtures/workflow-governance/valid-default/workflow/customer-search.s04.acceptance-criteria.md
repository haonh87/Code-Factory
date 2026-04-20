---
artifact_id: "customer-search.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "customer-search"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: FEATURE
delivery_context: brownfield
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
approval_gates:
  spec: required
  contract: required
  foundation: not_applicable
  uat: not_applicable
role_signoffs:
  spec:
    - ba
    - po
  contract:
    - developer
    - designer
  dor:
    - ba
    - qc
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by:
    - ba
    - po
  spec_reviewed_at: "2026-04-14T08:45:00Z"
  contract_reviewed_by:
    - developer
    - designer
  contract_reviewed_at: "2026-04-14T08:50:00Z"
  dor_reviewed_by:
    - ba
    - qc
  dor_reviewed_at: "2026-04-14T09:00:00Z"
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
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

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "product-specs/brd/customer-search.md"
  - "product-specs/srs/customer-search.md"
decision_notes:
  - "Search scope, KPI và non-goals đã được chốt ở baseline spec."
```

## Contract Baseline
```yaml
status: APPROVED
api_contract_refs:
  - "contracts/api/customer-search.yaml"
ux_contract_refs:
  - "contracts/ux/customer-search.md"
notes:
  - "Search input, debounce và empty state đã được human approve."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "screens/customer-list.md"
impacted_surfaces:
  - "customer search input"
  - "customer list API query"
compatibility_constraints:
  - "Không làm vỡ search by name hiện có"
rollback_constraints:
  - "Có thể rollback về query cũ nếu cần"
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
