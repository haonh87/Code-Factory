---
artifact_id: "project-context-session-continuity.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "project-context-session-continuity"
step_id: "s03"
step_slug: "open-questions"
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "project-context-session-continuity.s01.restate.md"
  - "project-context-session-continuity.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

> Maintainer accepted this packet in chat on 2026-11-04 (Asia/Ho_Chi_Minh): “accpet, hãy tiếp tục”. Content approval is recorded; trusted terminal signatures are still pending. Draft frontmatter is retained for proposal recovery; no ACTIVE state or receipt is inferred.

# Step 3 — Open Questions

## Step Contract

Resolve what can be established from source; isolate only decisions that block admission or release. Owner: developer.

## Main Artifact

| Item | Proposed resolution | Owner / timing |
|---|---|---|
| New work or duplicate historical plan? | One bounded release work item; link holistic audit and memory proposal; preserve other work-item closures. CLI dedup disposition still pending. | Maintainer, admission |
| Which release? | Next available minor, proposed 2.10.0. Check tags/remote and source HEAD before freezing, never overwrite an existing tag. | Maintainer + DevOps, release freeze |
| Do Codex and Claude support the same startup hooks? | Capability-detect exact installed versions. Claude uses supported lifecycle hooks; Codex must have a tested instruction-driven start/handoff fallback when no supported hook is available. | Developer, T1/T4 |
| How to retain Node 18 core compatibility? | Core context/handoff works on Node 18/22. Companion history requires Node >=20 plus pinned/tested cass; diagnose missing dependencies explicitly. | Developer, T5/T6 |
| Where does memory belong? | Existing project-context for durable facts; canonical workflow notes/reports for work state; local disposable session cache for hints. No second authority. | Spec/Contract review |
| Is raw history mandatory to run core? | No; curated memory and handoff are core. Companion retrieval is separately enabled per exact project root. Test full mode on the pilot; never call unavailable retrieval healthy. | Spec/Contract review |
| Pilot write access | ai-maintainer is outside this workspace's writable roots. Prepare and validate on temporary fixtures first; request filesystem escalation only for the concrete approved pilot install. | Developer, T7 |
| A3–A4 inclusion | Separate pending QC; do not silently bundle unapproved code. Release can proceed independently if its dependency review confirms separation. | Maintainer, freeze |

## Resolved By Inspection

Existing installer, project context and hooks can be extended; a new agent framework is unnecessary. Packaging a session-search source path pointing into the developer's checkout is not portable. Claude native auto memory remains vendor-managed and is not a replacement for shared canonical state.

## Handoff

Admission still needs human review of the concrete packet. Technical uncertainties have explicit tasks/tests and must be resolved before claiming supported versions or full operational health.
