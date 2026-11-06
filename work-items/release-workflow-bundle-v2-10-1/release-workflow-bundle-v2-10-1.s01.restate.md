---
artifact_id: "release-workflow-bundle-v2-10-1.s01.restate"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-10-1"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: CHANGE
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
execution_roles:
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["developer"]
  contract: []
  dor: ["qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops"]
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

# Release v2.10.1 — Clarify

## Main Artifact
```yaml
raw_request: "accept, hãy phát hành"
restated_request: "Publish the accepted SessionStart hotfix as workflow-bundle v2.10.1 on GitHub Releases."
request_type: CHANGE
request_lane: product_delivery
routing_reasons: ["HARD_RELEASE"]
scope_draft:
  in: ["Integrate signed hotfix f8a51bf", "Version metadata and public docs", "Exact package verification", "GitHub PR, merge, immutable tag and assets", "Public download verification"]
  out: ["A3-A4", "npm registry publication", "Mass update of downstream projects", "Session Search companion rebuild"]
constraints_initial: ["Retain 2.10.0 immutable assets", "Node >=18", "48 skills per harness", "Preserve signed hotfix notes"]
assumptions_initial: ["Patch version 2.10.1 is free on GitHub, checked 2026-11-06", "Reuse the existing GitHub release channel"]
open_questions_initial: []
dependencies_initial: ["fix-claude-sessionstart-context is DONE with valid trusted DoD", "Human receipt signing"]
risks_initial: ["Published archive must be the tested bytes", "Already installed projects need an explicit update"]
```

## Governance Context
Release uses strict/full planning. The maintainer explicitly authorized publication in this conversation. Required roles: developer (release metadata), qc (artifact verification), devops (publication). Required gates: Spec, DoR, Approach, Task Plan, DoD, Release. No new business behavior, API design, foundation, database or UAT scope is opened; native Claude evidence is inherited from the signed hotfix. Legacy writer remains authoritative; no adaptive activation is asserted.

## Session Handoff
Readiness is prepared from the explicit publish request. Source is isolated in `.worktrees/release-v2.10.1`, based on approved fix f8a51bf plus origin/main e330919. Next: trusted readiness seal, then version and verify.

## Work Item Protocol
```yaml
protocol_status: VERIFIED
approval_status: APPROVED
review_required: true
work_item_slug: "release-workflow-bundle-v2-10-1"
work_item_type: CHANGE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/release-workflow-bundle-v2-10-1"
current_step: "s08"
granted_write_paths:
  - ".worktrees/release-v2.10.1"
  - "work-items/release-workflow-bundle-v2-10-1/release-workflow-bundle-v2-10-1.s07.implementation.md"
  - "work-items/release-workflow-bundle-v2-10-1/release-workflow-bundle-v2-10-1.s08.verification.md"
  - "work-items/release-workflow-bundle-v2-10-1/evidence"
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
reviewed_at: "2026-11-06T13:29:20.920Z"
handoff_target: "protocol-close"
last_transition_action: "approve-closeout-bundle"
last_transition_at: "2026-11-06T13:48:20.682Z"
required_actions:
  - {"id":"se:59c625c9768efc1c74009edec61fad2b0b44dcef89d4e849bad61d9efcc03194","kind":"workflow_followup","text":"Review and continue workflow backbone s01 -> s08."}
  - {"id":"se:888b01eff27b4e78cfe7963ae23755f5176e30ed97f5c35a16c97af5b0e49a79","kind":"workflow_followup","text":"Collect DoD evidence and close the work item when ready."}
  - {"id":"se:7ea10cfed388f241ab473390e6aec5fbe340cbe5f21534d981eceafb710935c9","kind":"work_item_close","text":"wfc work-item close --work-item release-workflow-bundle-v2-10-1"}
blockers: []
review_notes:
  - "User explicitly accepted and requested publication of the signed SessionStart fix as a patch release."
refs:
  - "work-items/release-workflow-bundle-v2-10-1"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "READINESS_BUNDLE_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
  - "CLOSEOUT_BUNDLE_APPROVED"
```

