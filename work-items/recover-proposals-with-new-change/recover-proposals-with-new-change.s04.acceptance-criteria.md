---
artifact_id: "recover-proposals-with-new-change.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "recover-proposals-with-new-change"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
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
  srs: "product-specs/srs/recover-proposals-with-new-change.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["developer", "qc"]
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
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-10-15T08:31:25Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba", "qc"]
  dor_reviewed_at: "2026-10-15T08:31:25Z"
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
  - "recover-proposals-with-new-change.s01.restate.md"
  - "recover-proposals-with-new-change.s02.business-goal.md"
  - "recover-proposals-with-new-change.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Tóm tắt acceptance criteria, edge case, DoR và governance checks cho readiness.

## Step Contract
```yaml
step_goal: "Prepare s04 for human review"
input_summary: ["Accepted scope", "main 54243b7", "product-specs/srs/recover-proposals-with-new-change.md"]
output_summary: ["Reviewable s04 proposal"]
done_when: ["Content reviewed; applicable human gates recorded separately"]
owner: "developer"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "product-specs/srs/recover-proposals-with-new-change.md"
approved_spec_digests:
  - "sha256:996d3dbc8daf097fd3658f0d17c861efe1c8bc65bb90f85d32589c0c9215e877"
decision_notes: ["Accepted in chat; trusted sealing pending"]
```

## Contract Baseline
NOT_APPLICABLE for separate API/event/UX artifacts. The additive CLI recovery contract is explicitly specified in the SRS and governed by Spec/Approach.

## Existing System Baseline
```yaml
current_behavior_refs: ["packages/workflow-bundle/scripts/materialize-work-item.js", "packages/workflow-bundle/scripts/scaffold-change-package.js"]
impacted_surfaces: ["Proposal recovery", "Pure change template preparation"]
compatibility_constraints: ["Retain signed history and no-change recovery", "No automatic approval"]
rollback_constraints: ["Revert to refusal; retain drafts and receipts"]
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: AC-RC-01
    criterion: "product-specs/srs/recover-proposals-with-new-change.md#AC-RC-01: accepted criterion by reference"
    verification: "Signed create_new fixture creates canonical drafts and retains pending approvals with empty grants"
  - id: AC-RC-02
    criterion: "product-specs/srs/recover-proposals-with-new-change.md#AC-RC-02: accepted criterion by reference"
    verification: "Tampering and stale snapshot fixtures assert zero target writes and preserved signed history"
  - id: AC-RC-03
    criterion: "product-specs/srs/recover-proposals-with-new-change.md#AC-RC-03: accepted criterion by reference"
    verification: "Invalid-ID, alias, unrelated-package and unsupported-state refusal fixtures compare tree snapshots"
  - id: AC-RC-04
    criterion: "product-specs/srs/recover-proposals-with-new-change.md#AC-RC-04: accepted criterion by reference"
    verification: "Fault injection at each write boundary verifies original report and byte-stable same-operation retry"
  - id: AC-RC-05
    criterion: "product-specs/srs/recover-proposals-with-new-change.md#AC-RC-05: accepted criterion by reference"
    verification: "Two subprocesses claim one change ID; exactly one owner succeeds and losing operation overwrites nothing"
  - id: AC-RC-06
    criterion: "product-specs/srs/recover-proposals-with-new-change.md#AC-RC-06: accepted criterion by reference"
    verification: "No-change recovery, ordinary scaffold, approval and activation regression suites"
  - id: AC-RC-07
    criterion: "product-specs/srs/recover-proposals-with-new-change.md#AC-RC-07: accepted criterion by reference"
    verification: "EN/VI reference review, full unit suite, workflow and pack validation, UTF-8 decoding"
edge_cases: ["Crash after claim, manifest, first change file, workflow file, report rename or projection", "Two work items claim one ID", "Tampered signed history", "Unrelated pre-existing draft"]
out_of_scope: ["Existing-change recovery", "Compact changes", "Release gate"]
done_when: ["SRS criteria have test evidence and human DoD"]
behavioral_invariants: ["No gate pass inferred", "No existing content overwritten", "Signed history retained"]
```

## Governance Checks
Strict checklist applies. Requirement trace and bounded authority are drafted; human Spec/DoR acceptance is recorded; trusted receipts are pending. No waiver requested.

## Definition of Ready
```yaml
status: READY
blockers: []
owners: ["ba", "qc"]
notes: ["User accepted the packet; trusted receipts still required before activation."]
```

## Traceability
```yaml
upstream: ["product-specs/srs/recover-proposals-with-new-change.md"]
next_step: "s05 after applicable approval"
```

## Handoff
User accepted this authoring packet in chat; recorded at 2026-10-15T08:31:25Z. Trusted receipt sealing and verification are required before activation. Release authorization remains separate.
