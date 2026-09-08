---
artifact_id: "align-adaptive-sa-ta-applicability.s07.implementation"
artifact_family: workflow-step
work_item_slug: "align-adaptive-sa-ta-applicability"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: BUG
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
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "developer"
  - "qc"
review_mode: targeted
verification_owner: "qc"
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
  - "align-adaptive-sa-ta-applicability.s06.task-breakdown.md"
linked_artifacts:
  - "../../packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "../../policies/codex/AGENTS.global.md"
  - "../../packages/workflow-bundle/runtime/codex/AGENTS.global.md"
  - "../../packages/workflow-bundle/runtime/claude/AGENTS.global.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../changes/CR-008"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> CF-019 is ACTIVE in the existing CR-008 worktree. T1 produced one intentional RED assertion for
> the unconditional SA/TA rule while every router baseline remained green; T2 applied the smallest
> canonical policy correction and made the same suite green. AR-B1 Spec Compliance by QC is pending
> before Code Quality and the generated-runtime batch.

## Step Contract
```yaml
step: "s07 Implement"
goal: >-
  Correct the canonical SA/TA applicability precedence through a fail-first semantic contract,
  propagate it only through the approved generator, and collect reviewable evidence without
  changing router behavior or stable reason codes.
value: >-
  Remove irrelevant architecture-role ceremony while preserving every named hard-risk escalation
  and the child-to-parent CR-008 verification boundary.
scope_in:
  - "T1-T6 from the approved s06 Task Plan"
  - "Canonical semantic fixture, canonical policy, generated runtime parity, regressions, and evidence"
scope_out:
  - "Router implementation, reason-code vocabulary, schemas, or SA/TA output contracts"
  - "Release, Business Acceptance, merge, tag, publish, install, or worktree cleanup"
inputs_required:
  - "Digest-valid Spec, Contract, DoR, Approach, and Task Plan trusted receipts"
  - "Protocol ACTIVE with the approved write roots"
  - "Approved s05 Option A and s06 T1..T6 sequence"
outputs_required:
  - "Fail-first precedence and exact six-trigger semantic evidence"
  - "Small canonical policy delta and generated Codex/Claude parity"
  - "AR-B1 and AR-B2 reviews in Spec Compliance -> Code Quality order"
  - "Exact child candidate handoff to child s08 and parent CR-008 re-verification"
done_when:
  - "T1-T6 outputs and verification paths are complete"
  - "Both targeted review batches have no unresolved blocker"
  - "The implementation note is ready for QC verification at s08"
owner: "developer"
```

## Main Artifact
```yaml
recommended_design: "Canonical policy correction backed by the existing adaptive-governance semantic fixture and runtime generator."
implementation_mode: BUGFIX
tasks_completed:
  - "T1 added bounded Skill Requirement precedence evidence and the exact six-trigger role/reason/gate matrix."
  - "T1 RED was confirmed with exactly one failure caused by the unconditional canonical SA/TA rule."
  - "T2 replaced only the contradictory canonical Skill Requirement paragraph."
  - "T2 GREEN was confirmed with the complete adaptive-governance suite passing."
bug_repro_evidence:
  - "node packages/workflow-bundle/test/workflow-adaptive-governance.test.js exited 1 with exactly one failed assertion: canonical Skill Requirement must make router-derived SA/TA applicability authoritative and must not re-add omitted roles."
hypothesis_log:
  - assumption: "The executable router already implements OQ-CF-004 Option C; the defect is the unconditional canonical Skill Requirement sentence."
    status: CONFIRMED
    evidence: "All no-trigger and six-trigger router assertions passed during the intentional RED run; only the bounded policy assertion failed."
debug_experiments:
  - goal: "Localize the contradiction without accepting formatting noise as bug evidence."
    action: "Read only the canonical Skill Requirement section and run the expanded semantic fixture before editing policy."
    result: "One policy-precedence assertion failed; all existing and new executable routing assertions passed."
tdd_evidence:
  - behavior: "Generic SA/TA guidance defers to router applicability and never re-adds an omitted or not-applicable role."
    failing_test: "node packages/workflow-bundle/test/workflow-adaptive-governance.test.js -> exit 1, exactly one intended policy-precedence assertion."
    passing_test: "node packages/workflow-bundle/test/workflow-adaptive-governance.test.js -> exit 0 after the canonical policy-only correction."
safe_refactor_notes: []
code_changes:
  - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js: added the bounded policy contract and exact six-trigger positive/negative matrix."
doc_changes:
  - "policies/codex/AGENTS.global.md: made the entry router's role-applicability result authoritative and prohibited generic re-addition of omitted roles."
config_changes: []
review_checkpoints:
  - "AR-B1 Spec Compliance by QC is pending for the semantic fixture and canonical policy."
  - "AR-B1 Code Quality by Developer and QC must remain after Spec Compliance."
outputs_actual:
  - "T1 intentional RED evidence"
  - "T2 focused canonical policy correction"
  - "T2 GREEN evidence"
known_limitations:
  - "Generated runtime copies are intentionally unchanged until T3."
  - "AR-B1 human review is not yet recorded."
follow_up_items:
  - "After AR-B1, run T3 runtime synchronization and T4 regressions."
notes_for_testing: "Keep the canonical semantic fixture as the primary behavior proof; do not weaken router or reason-code assertions."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/cr-008-adaptive-governance"
  - "codex/adaptive-governance-human-approval-ux"
worktree_reason: "planning_track=full, multi-session CR-008 release risk, and parent/child candidate coupling require isolation."
review_status: PARTIAL
review_refs:
  - "AR-B1: semantic fixture plus canonical policy"
  - "AR-B2: generated runtime parity plus regression evidence"
spec_compliance_status: NOT_RUN
code_quality_status: NOT_RUN
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs:
  - "s06 records that test, policy, generator, and evidence paths share one tightly coupled sequence."
merge_path: "Child candidate -> QC s08 DoD -> exact candidate re-bound to parent CR-008 verification; no merge before DoD."
verify_path:
  - "node packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "npm run build:workflow:bundle-runtime"
  - "node packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
  - "Targeted adjacent regressions and workflow-pack audit from s06 T4"
```

## Implementation Notes
```yaml
framework_notes:
  - "Node.js CommonJS fixture; no framework or runtime architecture change."
known_limitations:
  - "T3-T6 and both human review checkpoints remain open."
```

## Traceability
```yaml
upstream:
  - "align-adaptive-sa-ta-applicability.s04.acceptance-criteria.md"
  - "align-adaptive-sa-ta-applicability.s05.technical-approach.md"
  - "align-adaptive-sa-ta-applicability.s06.task-breakdown.md"
next_step: "Human QC reviews AR-B1 Spec Compliance before Developer/QC Code Quality and T3."
```

## Handoff
- Outputs actual: T1 RED evidence, exact six-trigger matrix, focused T2 policy correction, and T2 GREEN evidence.
- Known limitations: generated runtime parity, adjacent regressions, AR-B1/AR-B2, and exact-candidate binding remain open.
- Notes for testing: review the locked acceptance behavior before style; the router module and stable reason values are unchanged.
- Notes for deployment: none; this child performs no release or installation action.
