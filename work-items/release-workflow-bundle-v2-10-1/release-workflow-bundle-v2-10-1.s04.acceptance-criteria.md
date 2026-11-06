---
artifact_id: "release-workflow-bundle-v2-10-1.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-10-1"
step_id: "s04"
step_slug: "acceptance-criteria"
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
  spec_reviewed_by: ["developer"]
  spec_reviewed_at: "2026-11-06T09:18:18.083093Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["qc"]
  dor_reviewed_at: "2026-11-06T09:18:18.083093Z"
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
  - "release-workflow-bundle-v2-10-1.s01.restate.md"
  - "release-workflow-bundle-v2-10-1.s02.business-goal.md"
  - "release-workflow-bundle-v2-10-1.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Release v2.10.1 — Acceptance + DoR

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs: ["product-specs/cards/fix-claude-sessionstart-context.md"]
approved_spec_digests:
  - "sha256:857dc96976b1bd3f41fe9405c8c2ccb95a2d5b6fb4d575af1b0db440e5089ed1 product-specs/cards/fix-claude-sessionstart-context.md"
decision_notes: ["User explicitly accepted and requested publication; no further behavior change."]
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
notes: ["Core install/CLI contract unchanged; source behavior accepted by the hotfix work item."]
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: AC-R1
    criterion: "Source equals approved SessionStart hotfix plus reviewed version/docs metadata; A3-A4 excluded."
    verification: "Review git diff and approved helper hash"
  - id: AC-R2
    criterion: "One workflow-bundle-2.10.1.tgz passes exact install/update checks on Node18/22, with 48 skills for Codex/Claude."
    verification: "Exact archive Node18/22 smoke"
  - id: AC-R3
    criterion: "Regression, pack audit, UTF-8 and GitHub required checks pass before publication."
    verification: "Unit logs, pack audit and green CI"
  - id: AC-R4
    criterion: "GitHub v2.10.1 immutable tag identifies integrated source and publishes the tested archive plus SHA256SUMS; downloads match."
    verification: "Release tag/asset download checksum checks"
  - id: AC-R5
    criterion: "Release record contains upgrade command, native/platform limits, rollback and unchanged companion link."
    verification: "Review versioned release record and quickstart"
edge_cases: ["Existing tag or conflicting main changes stop publication", "Checksum mismatch stops publication", "Stale receipts stop publication"]
out_of_scope: ["26-project rollout", "npm publish", "New companion artifact", "A3-A4"]
behavioral_invariants: ["Raw Codex/direct JSON stays unchanged", "PreCompact/SessionEnd remain quiet", "16KiB envelope budget"]
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners: ["developer", "qc", "devops"]
notes: ["Accepted fix and native proof exist; release channel, version, artifact, rollback and verification are bounded."]
```

## Session Handoff
Acceptance records the user's explicit publication instruction; trusted receipts remain required before active execution.

## Existing System Baseline
```yaml
current_behavior_refs:
  - "work-items/fix-claude-sessionstart-context/fix-claude-sessionstart-context.s08.verification.md"
impacted_surfaces:
  - "Versioned core package and current public installation docs"
compatibility_constraints:
  - "Node >=18 and 48 skills for each harness"
rollback_constraints:
  - "Retain 2.10.0 archive and restore managed context before downgrade; old defect returns"
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Explicit publication authorization", "Isolated release source", "Immutable artifact verification", "Trusted human receipts"]
blocking_items: []
owner: "developer"
next_action: "Seal readiness then execute the accepted release plan"
```
