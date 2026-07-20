---
artifact_id: "sample-sdd-item.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "sample-sdd-item"
step_id: "s03"
step_slug: "open-questions"
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
spec_status: reviewed
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
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "sample-sdd-item.s01.restate.md"
  - "sample-sdd-item.s02.business-goal.md"
linked_artifacts:
  - "product-specs/brd/sample-sdd-item.md"
  - "product-specs/srs/sample-sdd-item.md"
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Summarize the open questions, missing input, conflicts and the readiness verdict.

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
open_questions:
  - "should a path that cannot be normalized be rejected, or should it return an empty result"
missing_inputs: []
conflicts: []
assumptions:
  - "an invalid path returns a clear error instead of a silent fallback"
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "ba updates SRS-UX-001 for the invalid path error"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "no blocker left for DoR"
```

## SDD Traceability
```yaml
requirement_refs: [BRD-001, BRD-002, SRS-FR-001, SRS-FR-002, SRS-UX-001]
acceptance_refs: [AC-001, AC-002, AC-004]
task_refs: []
test_refs: []
```

## Traceability
```yaml
upstream:
  - "sample-sdd-item.s01.restate.md"
  - "sample-sdd-item.s02.business-goal.md"
next_step: "sample-sdd-item.s04.acceptance-criteria.md"
```

## Handoff
- Readiness status: READY.
- What to do to move to step 4: lock the AC, the SRS and the spec freeze.