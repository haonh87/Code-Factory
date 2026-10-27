---
artifact_id: "protocol-receipt-binding-check.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "protocol-receipt-binding-check"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
  card: "product-specs/cards/protocol-receipt-binding-check.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
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
  - "codex-workflow-chain"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "protocol-receipt-binding-check.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 — Business Goal

> [!summary]
> Make protocol diagnostics safe to act on: pending review must remain pending when the available
> receipt approves different evidence. This is a draft goal, not a passed delivery gate.

## Step Contract

```yaml
step_goal: "State value and measurable outcome for the bounded validator correction."
input_summary: ["s01 reproduced false contradiction and accepted scope"]
output_summary: ["User value", "Success measures", "Non-goals"]
done_when: ["Outcome traces directly to the Spec Card's nine criteria."]
owner: ba
```

## Main Artifact

```yaml
business_goal: "Remove false already-approved conclusions without weakening real approval controls."
user_value: "Maintainers can retain accurate pending-review entries and respond to the correct evidence problem."
success_metrics:
  - "Zero false approved-gate contradictions across the stale-ref/hash/absent-host fixture matrix."
  - "All matching-receipt contradiction controls still reject genuinely inconsistent pending state."
  - "Zero writes to reports, notes, keys or receipts from validation."
  - "All existing lifecycle refusal and shared-namespace regressions remain green."
non_goals_ref: "product-specs/cards/protocol-receipt-binding-check.md#Scope.out_of_scope"
value_boundary: "Diagnostic correctness; no claimed incident prevention, performance benefit or bypass closure."
```

## Traceability

```yaml
upstream: ["protocol-receipt-binding-check.s01.restate.md"]
next_step: "Resolve admission/signing and review the bounded compatibility choices in s03."
```
