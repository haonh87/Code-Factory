---
artifact_id: "decouple-tests-from-tree-layout.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "decouple-tests-from-tree-layout"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/decouple-tests-from-tree-layout.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec:
    - "ba"
  dor:
    - "po"
    - "ba"
  approach:
    - "developer"
  task_plan:
    - "developer"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-10-19T03:09:32Z"
  dor_reviewed_by: ["ba"]
  dor_reviewed_at: "2026-10-19T03:09:32Z"
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "decouple-tests-from-tree-layout.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> The accepted fixture packet is ready for signed readiness. G-A/T1 is superseded; OQ-1/OQ-2 are no longer blockers. READY describes content readiness, not an existing receipt or ACTIVE protocol state.

## Step Contract
```yaml
step_goal: "Finalize measurable acceptance for the accepted test-only residual."
input_summary: ["s01 current reproduction", "Spec Card 0.2", "Human acceptance of T0/T2/T3"]
output_summary: ["Acceptance trace", "READY assessment", "Spec freeze"]
done_when: ["Each criterion has a concrete verification path", "No stale question blocks the residual"]
owner: ba
```

## Existing System Baseline
```yaml
current_behavior_refs: ["s01 Existing System Baseline", "Main e5dc98aac70196f9d3a391153325049c0402eb17"]
impacted_surfaces: ["packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"]
compatibility_constraints: ["Production resolver unchanged", "Existing protocol/report and cross-file assertions preserved"]
rollback_constraints: ["Revert the isolated test change; no persisted data migration"]
```

## Artifact Chính
```yaml
acceptance_criteria_ref: "product-specs/cards/decouple-tests-from-tree-layout.md#Acceptance Criteria"
edge_cases:
  - {id: EDGE-001, case: "Real work-item data is absent, renamed or changed", required_outcome: "The fixture-based target test still passes."}
  - {id: EDGE-002, case: "Fixture value changes between resolutions", required_outcome: "The second result reflects the changed value, ruling out a constant assertion."}
  - {id: EDGE-003, case: "Fixture target is removed", required_outcome: "The resolver reports ARTIFACT_REFERENCE_FILE_MISSING."}
  - {id: EDGE-004, case: "Unrelated full-suite failure exists in both trees", required_outcome: "Record both failure counts and identities; do not call the full suite green."}
behavioral_invariants: ["No skip-if-missing", "No production resolver change", "No real work-item mutation"]
done_when: ["AC-001 predecessor/unchanged-test evidence retained", "AC-002 fixture and negative controls pass", "AC-003 equal-source comparison recorded", "Separate human QC DoD"]
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - {check: "Measurable acceptance and ownership", status: PASS, evidence: "Spec Card AC-001..003 and s06 T0/T2/T3 map each behavior to an executable check."}
  - {check: "Scope and questions reconciled", status: PASS, evidence: "One test-source file; T1 superseded by a9888a9; no unresolved OQ-1/OQ-2."}
blocking_items: []
owner: ba
next_action: "Sign the already accepted Spec/DoR hosts through the normal human-controlled CLI."
```

## Definition of Ready
```yaml
work_item_slug: decouple-tests-from-tree-layout
status: READY
checks:
  restated_request_clear: PASS
  business_goal_clear: PASS
  scope_defined: PASS
  open_questions_non_blocking: PASS
  acceptance_criteria_testable: PASS
  dependencies_known: PASS
  verification_direction_present: PASS
blocking_gaps: []
accepted_assumptions: ["Existing temporary fixture helpers can exercise this residual without production changes."]
residual_risks: ["Full-suite prerequisites and unrelated failures must be measured in both trees."]
next_action: "Trusted authoring receipts plus work-item admission are required before activation."
```

## Spec Freeze
```yaml
requirement_ids: ["REQ-001", "REQ-002", "REQ-003"]
spec_card_ref: "product-specs/cards/decouple-tests-from-tree-layout.md"
freeze_status: FROZEN
freeze_authority: ba
decided_at: "2026-10-19T03:09:32Z"
notes: ["Human content acceptance is recorded in s06; no receipt is fabricated."]
```

## Traceability
```yaml
upstream: ["s01", "Spec Card 0.2"]
next_step: "Light Approach and Task Plan at s06"
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-001", "REQ-002", "REQ-003"]
acceptance_refs: ["AC-001", "AC-002", "AC-003"]
task_refs: ["T0", "T1 SUPERSEDED", "T2", "T3"]
test_refs: ["workflow-gate-evidence-utils.test.js", "release-rollback-smoke.test.js", "run-all.js"]
```
