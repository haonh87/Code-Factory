---
artifact_id: "release-workflow-bundle-v2-6-4-cr010.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-4-cr010"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: CHANGE
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
change_id: "CR-010"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/release-workflow-bundle-v2-6-4.md"
spec_status: draft
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
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
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
  - "release-workflow-bundle-v2-6-4-cr010.s01.restate.md"
  - "release-workflow-bundle-v2-6-4-cr010.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Tóm tắt câu hỏi mở, missing input, conflict và readiness verdict.

## Step Contract
```yaml
step_goal: "Prepare s03 for release review"
input_summary: ["Accepted release direction", "Integrated baseline cbf6c095b303f6979ac135b08c063bfdf2ad9fb2"]
output_summary: ["Bounded reviewable release packet"]
done_when: ["Applicable content reviewed and receipts recorded separately"]
owner: "developer"
```

## Main Artifact
```yaml
open_questions: []
resolved_questions:
  - "The user approved replacing the cancelled proposal with unused canonical CR-010."
  - "New intake signatures were independently verified by normal CLI recovery."
  - "Keep v2.6.3 immutable; v2.6.4 tag/source includes P-INSTALL and all integrated fixes."
  - "Direct adapters remain in source archives; existing npm package allowlist is retained."
blockers: ["Change/work-item and authoring receipts pending before implementation", "Exact candidate evidence required for Release"]
owners: ["maintainer", "developer", "qc", "devops"]
assumptions: ["GitHub Release assets remain the distribution surface; registry publication requires explicit scope"]
```

## Input Readiness
READY for authoring review. CR-010 was absent under both aliases before recovery and now belongs to this work item. No candidate build/publication is inferred.

## Audit
```yaml
audit_status: PASS|FAIL|PARTIAL
notes: []
```

## Traceability
SRS product-specs/srs/release-workflow-bundle-v2-6-4.md owns AC-REL-01..09. CR-010 and this work item own execution; candidate evidence belongs in s08.

## Handoff
Draft for human review. Intake approval does not approve implementation or publication.


## Intake lineage
Predecessor release-workflow-bundle-v2-6-4 is CANCELLED through normal CLI after human authorization. Its three signatures and CHANGE-008 drafts are retained. CR-008 is untouched. Current CR-010 has its own three signed dispositions; no earlier gate receipt is reused. The allocator cross-vocabulary issue remains a recorded defect; explicit unused canonical CR-010 avoids it for this release.
