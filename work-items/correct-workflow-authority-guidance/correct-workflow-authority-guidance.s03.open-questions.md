---
artifact_id: "correct-workflow-authority-guidance.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "correct-workflow-authority-guidance"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - developer
  - qc
  - ba
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
  spec: [ba]
  contract: []
  dor: [qc]
  approach: [developer]
  foundation: []
  task_plan: [developer]
  uat: []
  release: []
  business_acceptance: []
  dod: [qc]
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-workflow-authority-guidance.s01.restate.md"
  - "correct-workflow-authority-guidance.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Review proposal only. Protocol remains MATERIALIZED at s01; work-item and authoring gate approvals are pending. No implementation grant is open.

## Step Contract

```yaml
step_goal: "Separate resolved admission concerns from remaining human decisions and implementation contingencies."
input_summary:
  - "correct-workflow-authority-guidance.s01.restate.md"
  - "correct-workflow-authority-guidance.s02.business-goal.md"
output_summary:
  - "No unresolved technical design input for this bounded proposal; gate decisions remain open."
done_when:
  - "Every remaining action has a role and a concrete review subject."
owner: "developer"
```

## Main Artifact

```yaml
open_questions:
  - id: "Q-AUTH-01"
    owner: "maintainer"
    question: "Approve the bounded work item described by s01/s04/s06?"
    status: "PENDING_REVIEW"
  - id: "Q-AUTH-02"
    owner: "ba / qc / developer"
    question: "Pass the independent Spec, DoR, Approach and Task Plan decisions for this packet, or identify required revisions?"
    status: "PENDING_REVIEW"
missing_inputs: []
conflicts:
  - subject: "Current source wording versus higher authority"
    disposition: "Fix only the eight proposed files; policies/codex/AGENTS.global.md and runtime remain authoritative."
assumptions:
  - "If an actual runtime defect or additional source boundary is discovered, stop that task and propose scoped authoring changes before writing outside grants."
  - "No child approval can substitute for master CF-MB2 or master DoD."
```

## Input Readiness

```yaml
status: "PARTIAL"
blocking_items:
  - "Human work-item and authoring gate approvals are absent; execution remains closed."
owner_actions:
  - "Agent: prepare and validate concrete draft packet."
  - "Maintainer/BA/QC/Developer: review the named decisions after packet preparation."
authoring_readiness: "READY for proposals only; no missing factual prerequisite for the bounded plan."
```

## Audit

```yaml
audit_status: "PARTIAL"
notes:
  - "Scope and evidence suffice for forward drafts."
  - "Admission is verified, but no human-controlled delivery gate is claimed passed."
```

## Traceability

```yaml
upstream:
  - "correct-workflow-authority-guidance.s01.restate.md"
  - "correct-workflow-authority-guidance.s02.business-goal.md"
next_step: "correct-workflow-authority-guidance.s04.acceptance-criteria.md"
```

## Handoff

Review s04 acceptance before locking the s05/s06 proposals. Do not treat the presence of these drafts as permission to start s07.
