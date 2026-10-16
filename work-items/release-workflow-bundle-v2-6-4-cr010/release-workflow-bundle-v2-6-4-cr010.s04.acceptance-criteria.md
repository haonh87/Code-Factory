---
artifact_id: "release-workflow-bundle-v2-6-4-cr010.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-4-cr010"
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
change_id: "CR-010"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/release-workflow-bundle-v2-6-4.md"
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
  business_acceptance: "required"
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
  spec_reviewed_at: "2026-10-16T06:59:48Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba", "qc"]
  dor_reviewed_at: "2026-10-16T06:59:48Z"
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
  - "release-workflow-bundle-v2-6-4-cr010.s01.restate.md"
  - "release-workflow-bundle-v2-6-4-cr010.s02.business-goal.md"
  - "release-workflow-bundle-v2-6-4-cr010.s03.open-questions.md"
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
step_goal: "Prepare s04 for release review"
input_summary: ["Accepted release direction", "Integrated baseline cbf6c095b303f6979ac135b08c063bfdf2ad9fb2"]
output_summary: ["Bounded reviewable release packet"]
done_when: ["Applicable content reviewed and receipts recorded separately"]
owner: "developer"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "product-specs/srs/release-workflow-bundle-v2-6-4.md"
approved_spec_digests:
  - "sha256:7836a0521e294e4d093016f308562e5ab3ec4de8bfd2b24796d2de75407b2dcb"
decision_notes: ["User acceptance recorded at 2026-10-16T06:59:48Z; trusted Spec receipt pending"]
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes: ["No new API/event/UX contract; package/version and distribution constraints are in SRS"]
```

## Existing System Baseline
```yaml
current_behavior_refs: ["v2.6.3", "main cbf6c09", "docs/publish-surface.md", "packages/workflow-bundle/package.json"]
impacted_surfaces: ["Version metadata", "Release test contracts", "Active release documentation", "New release assets"]
compatibility_constraints: ["42 skills", "Five modes", "Node >=18/npm >=9", "Existing package allowlist"]
rollback_constraints: ["Retain exact v2.6.3 bytes", "Preserve unmanaged files and signed history"]
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: AC-REL-01
    criterion: "product-specs/srs/release-workflow-bundle-v2-6-4.md#AC-REL-01: requirement by reference"
    verification: "Immutable fallback evidence at s08"
  - id: AC-REL-02
    criterion: "product-specs/srs/release-workflow-bundle-v2-6-4.md#AC-REL-02: requirement by reference"
    verification: "Complete source tag evidence at s08"
  - id: AC-REL-03
    criterion: "product-specs/srs/release-workflow-bundle-v2-6-4.md#AC-REL-03: requirement by reference"
    verification: "Truthful release inventory evidence at s08"
  - id: AC-REL-04
    criterion: "product-specs/srs/release-workflow-bundle-v2-6-4.md#AC-REL-04: requirement by reference"
    verification: "Candidate identity evidence at s08"
  - id: AC-REL-05
    criterion: "product-specs/srs/release-workflow-bundle-v2-6-4.md#AC-REL-05: requirement by reference"
    verification: "Build once evidence at s08"
  - id: AC-REL-06
    criterion: "product-specs/srs/release-workflow-bundle-v2-6-4.md#AC-REL-06: requirement by reference"
    verification: "Compatibility and rollback evidence at s08"
  - id: AC-REL-07
    criterion: "product-specs/srs/release-workflow-bundle-v2-6-4.md#AC-REL-07: requirement by reference"
    verification: "Verification evidence at s08"
  - id: AC-REL-08
    criterion: "product-specs/srs/release-workflow-bundle-v2-6-4.md#AC-REL-08: requirement by reference"
    verification: "Release authority evidence at s08"
  - id: AC-REL-09
    criterion: "product-specs/srs/release-workflow-bundle-v2-6-4.md#AC-REL-09: requirement by reference"
    verification: "Public verification evidence at s08"
edge_cases: ["Tag/version collision", "Wrong source SHA", "Asset digest mismatch", "Interrupted publication", "Source adapter absent from npm tarball"]
out_of_scope: ["Retarget existing tags", "New package allowlist", "Live global install"]
done_when: ["All AC evidence and required human gates complete"]
behavioral_invariants: ["No approval bypass", "Same verified artifact published", "Historical signed records immutable"]
```

## Governance Checks
Strict release controls apply. User accepted technical readiness; CR-010/work-item and authoring receipts still required. Candidate-specific DoD/Release and post-publication Business Acceptance remain separate.

## Definition of Ready
```yaml
status: READY
blockers: []
owners: ["ba", "qc"]
notes: ["User accepted Spec and DoR; preparation receipts still required before activation"]
```

## Traceability
SRS product-specs/srs/release-workflow-bundle-v2-6-4.md owns AC-REL-01..09. CR-010 and this work item own execution; candidate evidence belongs in s08.

## Handoff
User accepted this preparation packet in chat at 2026-10-16T06:59:48Z. Seal and verify the preparation receipts before activation. Candidate-specific Release approval remains separate.
