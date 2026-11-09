---
artifact_id: "fix-update-source-resolution.s07.implementation"
artifact_family: workflow-step
work_item_slug: "fix-update-source-resolution"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "fix-update-source-resolution.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Implementation — Source selection and downgrade guard

## Main Artifact

```yaml
implementation_status: COMPLETE
completed_tasks: [T1, T2, T3]
remaining_tasks: []
source_commit: "676e8f25f6a3eb97037a2f0198af86bfbaaf1c14"
code_changes: ["CLI-owned default source", "Pre-write version checks for runtime and selected projects", "Check selected source and actual lifecycle-helper version"]
doc_changes: ["English/Vietnamese package instructions and quickstart; explicitly unreleased"]
config_changes: []
outputs_actual: ["7-file scoped commit", "12 focused cases on Node18/22", "53-file core regression", "4 exact-artifact smoke combinations"]
known_limitations: ["Not published or rolled out", "Native Windows/Linux not tested", "Stable X.Y.Z only"]
```

## Delivery Rule Evidence

```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/bundle-source-resolution.test.js"
  - "evidence/red.log"
  - "evidence/review-red.log"
  - "evidence/node18.log"
  - "evidence/node22.log"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: STANDARD
worktree_status: USED
worktree_refs:
  - ".worktrees/fix-update-source-resolution"
worktree_reason: "Root source is 2.7.0 and has unrelated edits; isolate on origin/main 8e4fae4"
review_status: COMPLETED
review_refs:
  - "#Implementation Notes"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Retain branch for review/integration; no publication authorized by this work item"
verify_path: ["fix-update-source-resolution.s08.verification.md"]
```

## Implementation Notes

Review mode: SELF, in spec-compliance then code-quality order. The initial tests
reproduced 9 failures on published behavior. Review found one further in-scope
case: an explicit newer policy/skill source could hide an older CLI-owned helper.
Both harness regressions failed before the additional check and now pass. Source
selection, explicit override, no-write refusal, global/project version divergence,
unselected projects, numeric boundaries, malformed versions, fresh/same/forward
updates and deliberate install/context rollback are covered.

The guard runs before skill sync, policy sync, integration writes and state writes.
It reuses the integration path-safe reader and performs one bounded metadata read
per affected target. It adds no dependencies, network access or shell execution.
Versions use integer components rather than lexical ordering. Fixture versions are
pinned so a future package version bump does not break the ordering cases.

Syntax, strict UTF-8 and diff checks passed. Gitleaks scanned the seven changed
files with default rules and found no leaks. ESLint has no configured project
runner; Semgrep was unavailable, so no static/SAST pass is claimed. Review found
no remaining issue within this work item's scope.

## Session Handoff

- User request: `làm 1 và 2`. Trusted work-item and readiness receipts opened s07.
- Source commit: `676e8f25f6a3eb97037a2f0198af86bfbaaf1c14` on `fix/update-source-resolution`.
- T1-T3 complete; 53 core test files PASS, focused Node18/22 12/12 each, exact
  artifact smoke 4/4 with 48 skills each. See `evidence/verification-result.json`.
- Local test artifact SHA256: `61d9dd0c504fff3f9e507cf6e29af1fac8c9d94e8cce1186e3a916b80bd0378b`. Its 2.10.1 metadata is unchanged;
  this is an unpublished patch archive, not the immutable published 2.10.1 asset.
- Both global states and all eight real project integrations still report 2.10.1.
- Priority 1 evidence remains in release v2.10.1 machine-rollout evidence: 3 complete
  native deliveries and 1 partial due to the separate 10,000-character payload cap.
- Human DoD receipt verified and protocol closed DONE at 2026-11-07T14:56:11.042Z. All readiness
  and completion gate checks are valid; the signed s08 note remains unchanged.
- Next: retain branch and artifact for separately authorized integration/release.
  The large SessionStart payload finding should be addressed before claiming full
  native rollout acceptance. No helper-size fix, A3/A4 integration, publication or
  real installation rollout was performed.
