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
  release: []
  business_acceptance: []
  dod: []
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
> Tóm tắt câu hỏi mở, missing input, conflict và readiness verdict.

## Step Contract
```yaml
step_goal: ""
input_summary: []
output_summary: []
done_when: []
owner: ""
```

## Artifact Chính
```yaml
open_questions:
  - "có cần reject path không normalize được hay chỉ trả empty result"
missing_inputs: []
conflicts: []
assumptions:
  - "path invalid sẽ trả lỗi rõ nghĩa thay vì silent fallback"
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "ba cập nhật SRS-UX-001 cho lỗi path invalid"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "không còn blocker chặn DoR"
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
- Trạng thái readiness: READY.
- Điều cần làm để sang step 4: chốt AC, SRS và spec freeze.
