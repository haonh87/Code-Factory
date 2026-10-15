---
artifact_id: "recover-proposals-with-new-change.s07.implementation"
artifact_family: workflow-step
work_item_slug: "recover-proposals-with-new-change"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "recover-proposals-with-new-change.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Step Contract
Implement the accepted SRS AC-RC-01..07 inside the isolated worktree; gate receipts verified before activation.

## Main Artifact
```yaml
recommended_design: "Prepared full change templates with operation-owned writes"
implementation_mode: FEATURE
tasks_completed: ["T1", "T2", "T3", "T4"]
bug_repro_evidence: ["/tmp/change-recovery-red.log: valid create_new fixture rejected by original none-only guard"]
hypothesis_log:
  - assumption: "Existing candidate guard excludes valid create_new proposals"
    status: CONFIRMED
    evidence: "New test failed at validateRecoveryCandidate before source edits"
debug_experiments:
  - goal: "Explain EACCES creating changes in disposable fixture"
    action: "Repeated test outside sandbox and inspected capability control"
    result: "Project root was read-only by capability policy; bounded changes-directory bootstrap restores original mode"
tdd_evidence:
  - behavior: "Recover a new full change package"
    failing_test: "/tmp/change-recovery-red.log"
    passing_test: "/tmp/change-recovery-edges.log"
safe_refactor_notes: ["Pure helper reuses getFileTemplate; ordinary scaffold unchanged; parity test passes"]
code_changes: ["materialize-work-item.js", "scaffold-change-package.js", "materializer tests", "scaffolder parity tests"]
doc_changes: ["EN/VI materialization references"]
config_changes: []
review_checkpoints: ["B1 spec compliance then code quality", "B2 failure/concurrency and docs review"]
outputs_actual: ["6 changed delivery files; no version or release changes"]
known_limitations: ["Unowned directory after pre-manifest interruption requires inspection", "No hostile concurrent filesystem protection", "ESLint/Semgrep unavailable"]
follow_up_items: ["Human DoD then merge", "Resume original release only after approved integration"]
notes_for_testing: "47 unit files pass; syntax, pack audit, runtime sync, UTF-8 and whitespace checks pass."
```

## Delivery Rule Evidence
- TDD: added testResumeNewChange before production changes; original guard failed, implementation passed. Red log retained; initial path typo run was not counted as red evidence.
- Worktree: REQUIRED, full strict approval-sensitive change; branch fix/recover-proposals-with-new-change at .claude/worktrees/recover-proposals-with-new-change. Main source untouched.
- Review B1: spec compliance PASS for bounded create_new, pending approvals and preserved history; then code quality PASS for pure templates, exclusive writes and finalizers. This review preceded full verification.
- Review B2: spec compliance PASS for partial-write/NOOP/refusal and shared-ID behavior; then code quality PASS after fixing indentation and stale EN/VI none-only support wording. Remaining limits documented, no open source finding.
- Delegation: none; sequential agentic implementation. No independent-review claim.
- Execution authority: all five trusted signatures and four host hashes verified. Activation is rooted at the original project with explicit grants into the worktree. A copied-report activation was refused due to stale absolute artifact refs; no gate or signature was rewritten to bypass it.

## Implementation Notes
The root work-item directory is authoritative for workflow state and signed hosts. Worktree copies were initially copied for context only; delivery code resides in the worktree. Keep signed s04/s05/s06 and SRS bytes fixed. A scoped authoring bootstrap temporarily enables owner-write on the project root only to create missing changes/, then restores its exact mode; test verifies restoration. Recovery modifies no global install or user keys. Worktree cleanup/merge waits for human DoD.

## Traceability
SRS AC-RC-01..07 -> accepted s05/s06 -> six delivery files -> s08 evidence.

## Handoff
Technical implementation ready for s08; DoD and integration remain pending.
