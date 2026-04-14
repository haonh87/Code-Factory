---
artifact_id: "sample-execution-item.s06.worker-assignment"
artifact_family: workflow-runtime-artifact
work_item_slug: "sample-execution-item"
step_id: "s06"
step_slug: "worker-assignment"
workflow_stage: "delivery"
artifact_role: secondary
artifact_kind: "worker-assignment"
source_of_truth: false
status: draft
execution_mode: "multi_agent"
review_mode: "independent"
verification_owner: "auditor"
---

# Step 6 - Worker Assignment

> [!summary]
> Ghi lại phân công worker, owned scope và done_when cho execution runtime.

## Artifact Chính
```yaml
assignment_id: "S06-ASSIGN-001"
step_id: s06
shared_contract_ref: "sample-execution-item.s06.task-breakdown.md#step-contract"
role: "planner"
owned_scope:
  - "chia task frontend/backend/review"
  - "khóa dependency và handoff point"
owned_paths:
  - "docs/workflow runtime artifacts"
skills:
  - "task-breakdown-planner"
  - "codex-workflow-chain"
inputs:
  - "sample-execution-item.s05.technical-approach.md"
  - "sample-execution-item.s05.execution-policy.md"
done_when:
  - "có task split rõ boundary"
  - "có verify checkpoint cho step 8"
depends_on: []
status: READY
handoff_format: worker-handoff-report
```

## Links
- Parent note: sample-execution-item.s06.task-breakdown.md
- Shared contract ref: sample-execution-item.s06.task-breakdown.md#step-contract
