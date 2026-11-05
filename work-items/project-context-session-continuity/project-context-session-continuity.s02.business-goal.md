---
artifact_id: "project-context-session-continuity.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "project-context-session-continuity"
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
change_id: "CR-013"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/project-context-session-continuity.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "required"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
    - "qc"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat:
    - "qc"
  release:
    - "devops"
  business_acceptance:
    - "po"
  dod:
    - "qc"
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
  - "project-context-session-continuity.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

> Maintainer accepted this packet in chat on 2026-11-04 (Asia/Ho_Chi_Minh): “accpet, hãy tiếp tục”. Content approval is recorded; trusted terminal signatures are still pending. Draft frontmatter is retained for proposal recovery; no ACTIVE state or receipt is inferred.

# Step 2 — Business Goal

## Step Contract

Translate the maintainer's deployment problem into a verifiable outcome. Owner: PO/maintainer; status: proposed.

## Main Artifact

A maintainer upgrading an existing project should be able to open either supported agent and continue useful authorized work without retelling project purpose, structure, decisions and the current task. Installation must make missing operational dependencies visible rather than reporting success from copied files alone.

Success measures are the SRS acceptance criteria: complete lifecycle on two harnesses; fresh and upgrade installations; exact artifact verification; retained user content; explicit stale/missing state; no cross-project leakage. Priority is HIGH because all downstream projects can be affected by the same packaging gap.

## Non-goals

No new orchestration platform, autonomous approval, blanket transcript indexing, or deployment of ai-maintainer's application services. No requirement that both vendors expose identical hook APIs.

## Traceability

Input: s01 maintainer request. Requirements: ../../product-specs/srs/project-context-session-continuity.md. Output: s04 acceptance mapping and s05 options.
