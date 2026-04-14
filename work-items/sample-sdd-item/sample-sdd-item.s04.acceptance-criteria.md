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
  release: []
  business_acceptance: []
  dod: []
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
> Tóm tắt acceptance criteria, edge case, DoR và governance checks cho readiness.

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
acceptance_criteria:
  - "AC-001: request nhận workspace filter hợp lệ"
  - "AC-002: chỉ trả session thuộc workspace được yêu cầu"
  - "AC-003: không truyền workspace filter thì output shape không đổi"
  - "AC-004: workspace path không hợp lệ trả lỗi rõ nghĩa"
edge_cases:
  - "workspace path normalize về empty string"
  - "workspace không có session nào"
out_of_scope:
  - "repair hoặc reindex cass"
done_when:
  - "AC-001 tới AC-004 có owner verify rõ"
behavioral_invariants:
  - "read-only contract giữ nguyên"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "governance context đã được phản ánh vào AC và SRS"
  - "backward compatibility được materialize thành SRS-NFR-001"
blocking_items: []
owner: "ba"
next_action: "đóng DoR và freeze spec"
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
  - "SRS đã frozen cho sample này"
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
  - "workspace filter là optional input"
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
- Criteria bắt buộc: AC-001 tới AC-004.
- Edge case phải giữ: workspace invalid và workspace empty result.
- Điều kiện sang step 5: spec frozen, DoR READY, traceability đã có ID.
