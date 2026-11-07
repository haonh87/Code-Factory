---
artifact_id: "release-workflow-bundle-v2-10-2.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-10-2"
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
execution_roles: ["developer", "qc", "devops"]
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
  spec_reviewed_at: "2026-11-07T15:08:28.455715+00:00"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["qc"]
  dor_reviewed_at: "2026-11-07T15:08:28.455715+00:00"
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
  - "release-workflow-bundle-v2-10-2.s01.restate.md"
  - "release-workflow-bundle-v2-10-2.s02.business-goal.md"
  - "release-workflow-bundle-v2-10-2.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Acceptance + DoR — Immutable patch release

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs: ["product-specs/cards/fix-update-source-resolution.md"]
approved_spec_digests:
  - "sha256:079e709dfdd1367a37cdcb46473cf9bd00b607bc3a1eaf6aa1fbdeedbca78868 product-specs/cards/fix-update-source-resolution.md"
decision_notes: ["User explicitly requested merge and publication of the signed CLI fix"]
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
notes: ["No new behavior beyond approved fix 676e8f2; release metadata and verification only"]
```

## Existing System Baseline
```yaml
current_behavior_refs: ["work-items/fix-update-source-resolution/fix-update-source-resolution.s08.verification.md", "docs/releases/workflow-bundle-v2.10.1.md"]
impacted_surfaces: ["Published CLI archive", "Public source/version/docs", "GitHub main/tag/release"]
compatibility_constraints: ["Node >=18", "Codex/Claude 48 skills", "Direct context JSON and checkpoint hooks unchanged", "Stable X.Y.Z update versions"]
rollback_constraints: ["Retain exact published 2.10.1 archive", "Explicit reinstall for intentional downgrade", "Never rewrite historical tags or receipts"]
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: AC-R1
    criterion: "Merged source contains approved fix676e8f2 plus bounded version/docs/test-expectation changes only"
    verification: "Ancestry, diff and production-file digest review"
  - id: AC-R2
    criterion: "One 2.10.2 archive passes Node18/22 Codex/Claude install/update, old-cwd and downgrade safety checks with48 skills"
    verification: "Exact archive checksum and four-combination smoke"
  - id: AC-R3
    criterion: "Core regression, audit, authoring, validators and required GitHub checks pass"
    verification: "Local evidence, exact-head PR CI and main CI"
  - id: AC-R4
    criterion: "Immutable v2.10.2 tag identifies the merged source and publishes the tested archive/checksum; public downloads match"
    verification: "Tag identity, downloaded SHA256 and package smoke"
  - id: AC-R5
    criterion: "Release notes explain source selection, downgrade recovery, explicit project update, known hook-size limit and unchanged companion"
    verification: "English/Vietnamese public docs and versioned release record review"
edge_cases: ["Existing tag or asset stops publication", "Main drift requires reconciliation and revalidation", "Checksum mismatch stops publication"]
out_of_scope: ["New production behavior", "Fleet rollout", "npm publish", "Hook-size remediation"]
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners: ["developer", "qc", "devops"]
notes: ["Source fix has signed DoD; release channel/version/artifact/rollback and verification are concrete", "Trusted release readiness still required"]
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["User explicitly authorized merge and publication", "Approved fix 676e8f2 and trusted DoD", "Exact artifact promotion", "Known hook size limit disclosed", "No npm publication or machine rollout"]
blocking_items: []
owner: "devops"
next_action: "Seal readiness, then prepare and verify the exact release"
```

