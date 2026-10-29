---
artifact_id: "mcp-root-containment.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "mcp-root-containment"
step_id: "s03"
step_slug: "open-questions"
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
  card: "product-specs/cards/mcp-root-containment.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "ta"
  - "developer"
  - "qc"
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
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
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
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-root-containment.s01.restate.md"
  - "mcp-root-containment.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 — Open Questions

## Main Artifact

```yaml
open_questions:
  - id: Q1
    owner: ba
    question: "Accept the Spec Card decisions for creation, historical workspaces, stale result filtering and threat model?"
    proposed_answer: "Approve the bounded policy together with Spec/DoR; otherwise revise before implementation."
    blocking: false
    resolution: "Human accepts the stated policy and platform limit at 2026-10-29T02:32:08.173Z."
  - id: Q2
    owner: qc
    question: "What evidence may be claimed on this host?"
    proposed_answer: "macOS only; author portable directory-link/junction tests but record Windows as not run until a native run. No Windows rollout in this item."
    blocking: false
    resolution: "Human accepts the stated policy and platform limit at 2026-10-29T02:32:08.173Z."
clarifications_resolved: ["Single coupled security outcome", "Three MCPs own the affected paths", "No new public schema", "No live or remote execution during tests"]
assumptions_to_validate: ["Filesystem error handling preserves strict denial", "Canonical/alias input paths remain usable across repeated validation", "Missing-parent walk distinguishes ENOENT from dangling links and permission errors"]
```

## Technical Drivers

```yaml
drivers:
  - id: TA-MR-001
    concern: "Boundary bypass"
    threshold: "0 outside filesystem effects or Git/cass launches for denied fixture paths"
    handoff: "DEV containment helpers; QC denial-before-use probes"
  - id: TA-MR-002
    concern: "Unbounded test effects"
    threshold: "Each child fixture has an explicit timeout; no remote transport or actual cass index"
    handoff: "DEV isolated process wrappers; QC sentinel snapshots"
  - id: TA-MR-003
    concern: "Race window"
    threshold: "No atomicity claim; explicit trusted-filesystem assumption because current path-based Node/child-process integration is not an OS sandbox"
    handoff: "DEV revalidation and canonical paths; QC deterministic between-call retarget probe"
```

## Traceability

```yaml
upstream: ["mcp-root-containment.s02.business-goal.md"]
next_step: "s04 acceptance review"
```

