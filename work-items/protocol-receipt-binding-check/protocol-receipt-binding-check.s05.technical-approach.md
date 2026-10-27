---
artifact_id: "protocol-receipt-binding-check.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "protocol-receipt-binding-check"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
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
spec_status: approved
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
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-10-27T02:46:56.257Z"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "protocol-receipt-binding-check.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 — Technical Approach

> [!summary]
> Human-approved option A binds the collector's receipt to the current host using existing
> helpers. Implementation remains subject to matching gate receipts and s07 activation.

## Step Contract

```yaml
step_goal: "Provide a bounded option comparison, failure model and validation contract for review."
input_summary: ["Approved AC-RB-001..009", "Reproduced collector defect", "Existing artifact-binding helper"]
output_summary: ["Recommended option", "Error/compatibility/rollback model", "Verify strategy"]
done_when: ["The future implementer need not invent the boundary; upstream gate dependency stays explicit."]
owner: developer
```

## Option Analysis

```yaml
options:
  - "A: Keep signature/status verification and add current-host resolution plus existing ref/hash comparison before approvedGates.add."
  - "B: Extract a general receipt-approval abstraction and migrate all receipt consumers."
  - "C: Remove contradiction checks or keep accepting stale receipts."
recommended_option: A
trade_offs:
  - "A corrects the one reproduced collector with a two-file source/test boundary; no new state/schema."
  - "B increases scope across working signers and lifecycle readers without current evidence."
  - "C loses real contradiction detection or preserves the bug."
```

## Foundation Decision

```yaml
status: NOT_APPLICABLE
solution_class: "Existing Node.js CLI validator"
selected_stack: []
selected_runtime: []
decision_notes: ["No new foundation or runtime decision."]
```

## Main Artifact

```yaml
design_problem: "Collector uses valid-signature status as if it proved approval of current artifact bytes."
business_rule_trace: [REQ-RB-001, REQ-RB-002, REQ-RB-003, REQ-RB-004]
recommended_design: "After signature/status verification, resolve the gate host with the item's sdd_mode; add the gate only when current artifact_ref and artifact_sha256 match via getTrustedReceiptArtifactErrors."
recommendation_reason: "Reuses the exact binding check already used by lifecycle guards and changes only the erroneous read."
component_changes: ["Collector and its actual-validator integration regressions; task paths are owned by s06."]
data_flow: ["report/profile -> receipt signature/status -> current gate host -> ref/hash comparison -> approvedGates -> existing contradiction evaluator"]
interface_changes: ["No exported receipt/signing/schema change; valid contradiction message text remains unchanged."]
failure_modes:
  - scenario: "Host missing or stale"
    impact: "An old approval could be misattributed."
    guardrail: "Do not include gate; retain independent lifecycle evidence failure where required."
  - scenario: "Unexpected I/O or corrupt receipt JSON"
    impact: "A broad catch could hide failure."
    guardrail: "Handle only expected missing-host absence; propagate/report other failure explicitly."
  - scenario: "Light approach resolved to s05"
    impact: "Valid s06 approval is lost or wrong host accepted."
    guardrail: "Read existing s01 profile; exercise full and Light controls."
  - scenario: "Signature-only regression or namespace rewrite"
    impact: "Approval attribution weakens across worktrees."
    guardrail: "Do not modify trust utility; preserve signature-first and shared-namespace tests."
compatibility_impact: ["Current reads become evidence-correct without rewriting historical artifacts.", "Matching approvals and opaque legacy-state behavior remain unchanged."]
rollback_impact: ["Revert the isolated correction/test commits; disclose that the false diagnostic returns."]
observability_hooks: ["Existing validator diagnostics and exit codes", "Focused regression names distinguish hash/ref/missing-host controls; no new telemetry."]
constraints_applied: ["No catch-all success", "No approval-store mutation", "No unapproved larger helper refactor"]
validation_plan: ["Actual public validator on synthetic fixtures", "Focused trust/protocol regressions", "Registered full suite in disposable copy if runtime sync is required"]
notes_for_next_step: "Review s04 and this option before approving s06; helper refactor needs renewed scope review if two-file correction proves insufficient."
```

## Architecture Details

```yaml
domain_boundaries: ["Local protocol validator only"]
integration_points: ["Existing receipt loader/verifier", "Existing gate host resolver and binding comparator"]
data_or_runtime_notes: ["No network, persistent data change or new service."]
```

## Brownfield Impact Analysis

```yaml
impacted_modules: ["validate-work-item-protocol approvedGates collection"]
compatibility_risks: ["Corrected diagnostic membership; all other error sets must remain unchanged."]
migration_notes: ["None; stored receipt/report shapes remain unchanged."]
rollback_notes: ["Bounded source revert with regression evidence; no receipt rollback."]
```

## Traceability

```yaml
upstream: ["protocol-receipt-binding-check.s04.acceptance-criteria.md"]
next_step: "Human Approach review recorded; s06 defines the approved execution order and verification boundary."
```
