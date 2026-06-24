---
artifact_id: "sample-sdd-item.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "sample-sdd-item"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: FEATURE
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: "CHANGE-001"
change_status: verified
spec_delta_refs:
  - "changes/CHANGE-001/spec-delta/brd.delta.md"
  - "changes/CHANGE-001/spec-delta/srs.delta.md"
archive_status: ready_to_archive
sdd_mode: strict
spec_refs:
  brd: "product-specs/brd/sample-sdd-item.md"
  srs: "product-specs/srs/sample-sdd-item.md"
spec_status: frozen
execution_mode: agentic
execution_roles: []
role_signoffs:
  dor: []
  approach: []
  task_plan: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  dor_reviewed_by: []
  dor_reviewed_at: ""
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
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-sdd-item.s01.restate.md"
  - "sample-sdd-item.s02.business-goal.md"
  - "sample-sdd-item.s03.open-questions.md"
linked_artifacts:
  - "product-specs/brd/sample-sdd-item.md"
  - "product-specs/srs/sample-sdd-item.md"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Summarize the acceptance criteria, edge cases, DoR and governance checks for readiness.

## Step Contract
```yaml
step_goal: ""
input_summary: []
output_summary: []
done_when: []
owner: ""
```

## Main Artifact
```yaml
acceptance_criteria:
  - "AC-001: the request accepts a valid workspace filter"
  - "AC-002: only sessions that belong to the requested workspace are returned"
  - "AC-003: when no workspace filter is passed, the output shape does not change"
  - "AC-004: an invalid workspace path returns a clear error"
edge_cases:
  - "the workspace path normalizes to an empty string"
  - "the workspace has no sessions"
out_of_scope:
  - "repair or reindex cass"
done_when:
  - "AC-001 through AC-004 have a clear owner for verify"
behavioral_invariants:
  - "the read-only contract is preserved"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "the governance context has been reflected into the AC and SRS"
  - "backward compatibility is materialized as SRS-NFR-001"
blocking_items: []
owner: "ba"
next_action: "close DoR and freeze the spec"
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners:
  - "po"
  - "ba"
  - "qc"
notes:
  - "the SRS is frozen for this sample"
```

## Spec Freeze
```yaml
status: READY
requirement_ids:
  - BRD-001
  - BRD-002
  - SRS-FR-001
  - SRS-FR-002
  - SRS-NFR-001
  - SRS-UX-001
accepted_assumptions:
  - "the workspace filter is an optional input"
blockers: []
```

## SDD Traceability
```yaml
requirement_refs: [SRS-FR-001, SRS-FR-002, SRS-NFR-001, SRS-UX-001]
acceptance_refs: [AC-001, AC-002, AC-003, AC-004]
task_refs: [TASK-001, TASK-002, TASK-003]
test_refs: [TEST-001, TEST-002, TEST-003, TEST-004]
```

## Traceability
```yaml
upstream:
  - "sample-sdd-item.s03.open-questions.md"
  - "product-specs/srs/sample-sdd-item.md"
next_step: "sample-sdd-item.s05.technical-approach.md"
```

## Handoff
- Mandatory criteria: AC-001 through AC-004.
- Edge case to preserve: invalid workspace and empty workspace result.
- Conditions to move to step 5: spec frozen, DoR READY, traceability has IDs.
