---
artifact_id: "fix-update-source-resolution.s01.restate"
artifact_family: workflow-step
work_item_slug: "fix-update-source-resolution"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
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
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["developer", "qc", "devops"]
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
  spec: ["developer"]
  contract: []
  dor: ["qc"]
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
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Clarify — Prevent stale-checkout updates

## Main Artifact

```yaml
raw_request: "làm 1 và 2"
restated_request: "Complete native rollout observation, then fix accidental source selection/downgrade in wfc update"
request_type: BUG
request_lane: maintenance
delivery_context: brownfield
defect_source: IMPLEMENTATION
spec_impact: "Source selection and update safety; no API/event/data schema change"
constraints_initial: ["Isolated source worktree based on 8e4fae4", "Published 2.10.1 remains immutable", "No unrelated checkout changes"]
open_questions_initial: []
```

## Scope And Ownership

The separate native observation is recorded under the existing release work item's
machine-rollout evidence. This work item owns only priority 2, per the linked spec.
Risk is medium; full/strict is chosen because the installer can replace runtime
and registered project files. Execution is single-agent, with sequential developer,
QC and DevOps review. No public_contract/migration/security-sensitive/release trigger
is inferred from the CLI bug; no publication is requested for this patch.

## Reproduction

Installed 2.10.1 CLI + cwd source 2.7.0 + isolated 2.10.1 home/project produced a
successful update to 2.7.0 and changed 40 files. See `evidence/repro.json`.

## Session Handoff

Readiness artifacts are prepared from the user's selected priorities. Trusted
work-item and readiness signatures are still required before source edits.


## Governance Context

```yaml
governance_ref: "project-context/project-context.md"
applicable_principles: ["Isolated reproducible maintenance", "Strict installer change review", "Trusted human gates", "TDD before source edits"]
required_reviews: ["developer", "qc", "devops"]
prohibited_actions: ["Publish or mutate real installs within this fix", "Overwrite unrelated dirty paths", "Treat unsigned readiness as ACTIVE"]
open_governance_questions: []
```

## Work Item Protocol
```yaml
protocol_status: DONE
approval_status: APPROVED
review_required: true
work_item_slug: "fix-update-source-resolution"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/fix-update-source-resolution"
current_step: "s08"
granted_write_paths:
  - ".worktrees/fix-update-source-resolution"
  - "work-items/fix-update-source-resolution/fix-update-source-resolution.s07.implementation.md"
  - "work-items/fix-update-source-resolution/fix-update-source-resolution.s08.verification.md"
  - "work-items/fix-update-source-resolution/evidence"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "coordinator"
protocol_owner: "developer"
reviewed_by: "maintainer"
reviewed_at: "2026-11-07T06:29:10.250Z"
handoff_target: "archive-lifecycle"
last_transition_action: "close"
last_transition_at: "2026-11-07T14:56:11.042Z"
required_actions:
  - {"id":"se:59c625c9768efc1c74009edec61fad2b0b44dcef89d4e849bad61d9efcc03194","kind":"workflow_followup","text":"Review and continue workflow backbone s01 -> s08."}
  - {"id":"se:450c710d89866b4fe9aadd3ba0fab203d3a14e6d364a1649ba2aebf8fb2c7718","kind":"workflow_followup","text":"Archive the work item when all downstream lifecycle actions are complete."}
blockers: []
review_notes:
  - "User requested priorities 1 and 2; approve the bounded source-selection/downgrade maintenance work."
refs:
  - "work-items/fix-update-source-resolution"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "READINESS_BUNDLE_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
  - "DONE_CONFIRMED"
```

