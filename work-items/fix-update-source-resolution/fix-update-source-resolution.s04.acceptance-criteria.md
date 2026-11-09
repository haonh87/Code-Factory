---
artifact_id: "fix-update-source-resolution.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "fix-update-source-resolution"
step_id: "s04"
step_slug: "acceptance-criteria"
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
  spec_reviewed_by: ["developer"]
  spec_reviewed_at: "2026-11-07T06:28:17.933695+00:00"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["qc"]
  dor_reviewed_at: "2026-11-07T06:28:17.933695+00:00"
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
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "fix-update-source-resolution.s01.restate.md"
  - "fix-update-source-resolution.s02.business-goal.md"
  - "fix-update-source-resolution.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Acceptance + DoR — Update source safety

## Requirement Baseline

```yaml
status: APPROVED
approved_spec_refs: ["product-specs/cards/fix-update-source-resolution.md"]
approved_spec_digests:
  - "sha256:079e709dfdd1367a37cdcb46473cf9bd00b607bc3a1eaf6aa1fbdeedbca78868 product-specs/cards/fix-update-source-resolution.md"
decision_notes: ["User explicitly selected the proposed priorities; this exact snapshot still requires a trusted readiness receipt"]
```

## Contract Baseline

```yaml
status: NOT_APPLICABLE
notes: ["No new API/event/data schema or CLI flag; existing update safety and source selection are corrected"]
```

## Main Artifact

```yaml
acceptance_criteria:
  - id: AC-001
    criterion: "Implicit source belongs to the running CLI independently of cwd"
    verification: "Packaged CLI in older checkout and nested cwd"
  - id: AC-002
    criterion: "Explicit --repo-root wins or fails explicitly"
    verification: "Valid and invalid explicit-source tests"
  - id: AC-003
    criterion: "Runtime/selected-project downgrade fails before bytes or modes change"
    verification: "Before/after managed-tree snapshots on both harnesses"
  - id: AC-004
    criterion: "Numeric stable-version ordering and conservative unsupported-version handling"
    verification: "Boundary and malformed-version regressions"
  - id: AC-005
    criterion: "Fresh/same/forward and deliberate reinstall/context rollback paths remain usable"
    verification: "Isolated integration regressions for Codex and Claude"
  - id: AC-006
    criterion: "Packed smoke, core checks and source-selection docs pass"
    verification: "Exact local archive smoke, audit, unit suite, doc review"
edge_cases: ["Stale cwd", "Nested cwd", "Invalid explicit source", "Newer selected project with older home", "Unknown nonempty version", "Legacy empty version"]
```

## Definition of Ready

```yaml
status: READY
blockers: []
owners: ["developer", "qc", "devops"]
notes: ["Exact unsafe update reproduced in disposable paths", "Readiness is not authorization until trusted signatures exist"]
```

## Existing System Baseline

```yaml
current_behavior_refs: ["evidence/repro.json", "packages/workflow-bundle/scripts/workflow-bundle-utils.js", "packages/workflow-bundle/scripts/workflow-bundle-cli.js"]
impacted_surfaces: ["Bundle source resolution", "update preflight for runtime and selected projects"]
compatibility_constraints: ["Node >=18", "Codex and Claude", "Explicit source selection", "Fresh/legacy installs", "Preserve user files and modes"]
rollback_constraints: ["Explicit install remains deliberate reinstall path", "Do not modify immutable release artifacts"]
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Repro uses isolated homes/projects", "Source and rollback behavior bounded", "No publication or real-installation mutation", "Trusted readiness signatures required"]
blocking_items: []
owner: "developer"
next_action: "Seal the user-requested readiness scope before source implementation"
```

