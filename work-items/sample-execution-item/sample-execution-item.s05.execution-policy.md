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
> Record the reason for choosing the execution mode, coordinator, verification owner and fallback for the step.

## Main Artifact
```yaml
execution_mode: multi_agent
selection_reason:
  - "the feature has several auth/frontend boundaries"
  - "research needs to be separated from design and review"
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
notes: "Only enable multi_agent from step 5; if owned_paths are not clear enough in step 7, drop to the fallback mode."
```

## Links
- Parent note: sample-execution-item.s05.technical-approach.md
- Shared contract ref: sample-execution-item.s05.technical-approach.md#step-contract
