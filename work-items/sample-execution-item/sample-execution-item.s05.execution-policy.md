---
artifact_id: "sample-execution-item.s05.execution-policy"
artifact_family: workflow-runtime-artifact
work_item_slug: "sample-execution-item"
step_id: "s05"
step_slug: "execution-policy"
workflow_stage: "delivery"
artifact_role: secondary
artifact_kind: "execution-policy"
source_of_truth: false
status: draft
execution_mode: "multi_agent"
review_mode: "independent"
verification_owner: "auditor"
---

# Step 5 - Execution Policy

> [!summary]
> Ghi lại lý do chọn execution mode, coordinator, verification owner và fallback cho step.

## Artifact Chính
```yaml
execution_mode: multi_agent
selection_reason:
  - "Feature có nhiều boundary auth/frontend"
  - "Cần tách research với design và review"
complexity_signals:
  - multi_boundary
  - large_context
  - separate_verification
shared_contract_ref: "sample-execution-item.s05.technical-approach.md#step-contract"
parallel_budget: 3
coordinator_role: "coordinator"
verification_owner: "auditor"
fallback_mode: sequential_multi_role
external_research:
  notebooklm: OPTIONAL
  expected_outputs:
    - "provider constraint summary"
notes: "Chỉ bật multi_agent từ step 5; nếu owned_paths không đủ rõ ở step 7 thì giảm về fallback mode."
```

## Links
- Parent note: sample-execution-item.s05.technical-approach.md
- Shared contract ref: sample-execution-item.s05.technical-approach.md#step-contract
