---
artifact_id: "align-adaptive-sa-ta-applicability.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "align-adaptive-sa-ta-applicability"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
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
review_mode: targeted
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance: []
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-09-08T06:08:19Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-09-08T06:08:19Z"
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-09-08T06:08:19Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-09-08T06:41:51Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "align-adaptive-sa-ta-applicability.s04.acceptance-criteria.md"
  - "align-adaptive-sa-ta-applicability.s05.technical-approach.md"
linked_artifacts:
  - "../../packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "../../policies/codex/AGENTS.global.md"
  - "../../packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js"
  - "../../packages/workflow-bundle/runtime/codex/AGENTS.global.md"
  - "../../packages/workflow-bundle/runtime/claude/AGENTS.global.md"
  - "../../packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
  - "../../packages/workflow-bundle/test/scaffold-workflow.test.js"
  - "../../packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
  - "../../packages/workflow-bundle/scripts/audit-workflow-pack.js"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../changes/CR-008"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Execute CF-019 as one tightly coupled agentic sequence: add fail-first semantic evidence, apply the
> smallest canonical policy correction, regenerate both runtime copies, run targeted regressions,
> complete two-tier review, and bind the exact child candidate for CR-008 re-verification. This is a
> proposal; Developer Task Plan approval and a digest-valid receipt are still required before s07.

## Step Contract
```yaml
step: "s06 Task Plan"
goal: >-
  Produce an execution-ready, path-specific plan that implements approved s05 Option A without
  rediscovering design decisions or widening the CF-019 boundary.
value: >-
  Give Developer and QC an ordered TDD, review, regression, rollback, and parent-handoff path that
  can be executed and audited without adding irrelevant roles or unapproved architecture work.
scope_in:
  - "Map AC-AR-01..10 and EDGE-AR-01..07 to concrete tasks and checks"
  - "Lock the RED -> canonical policy edit -> runtime sync -> regression sequence"
  - "Lock targeted two-tier review and exact-candidate evidence"
  - "Lock brownfield compatibility and rollback checkpoints"
scope_out:
  - "Modify policy, tests, generated runtime files, router logic, or skill contracts"
  - "Approve the Task Plan or create its trusted receipt"
  - "Perform child or parent DoD, release, Business Acceptance, merge, tag, publish, or install"
inputs_required:
  - "Approved Spec, Contract, and DoR receipts with digest_match=true"
  - "Approved Approach receipt with digest_match=true for s05 SHA-256 0737fa2d04a1961044edc26a20f5ce655434b2641cb0aebc5f729b31cf9106e2"
  - "Approved Option A and the s05 validation plan"
  - "Current canonical policy, adaptive-governance fixture, runtime sync, and parity mechanisms"
outputs_required:
  - "BA and DEV lanes with complete acceptance and path coverage"
  - "Ordered tasks with dependencies, owned paths, outputs, review checkpoints, and verify hints"
  - "Brownfield delivery, governance, regression, and rollback plans"
  - "Developer-reviewable Task Plan handoff"
done_when:
  - "Every in-scope acceptance criterion has an owning task and verification route"
  - "Behavior change uses an explicit fail-for-the-right-reason TDD sequence"
  - "Every task names concrete paths, dependencies, outputs, and verification"
  - "Spec Compliance precedes Code Quality for each targeted review batch"
  - "Compatibility, rollback, workflow validation, UTF-8, and parent-candidate handoff are explicit"
  - "No implementation authority is inferred from drafting the plan"
constraints:
  hard_constraints:
    - "Do not edit receipt-bound s04 or s05 artifacts during implementation"
    - "Do not change workflow-adaptive-governance.js, stable reason codes, schemas, or SA/TA contracts unless implementation stops and returns to design"
    - "Edit only the canonical policy; generate runtime policy copies through the existing sync script"
    - "Use TDD for the policy behavior change and targeted review in Spec Compliance -> Code Quality order"
    - "Keep execution agentic because the tasks are tightly coupled and share one evidence chain"
    - "Keep the current CR-008 worktree open until child DoD and parent candidate re-verification"
  soft_constraints:
    - "Prefer one focused test delta and one focused canonical policy paragraph"
    - "Run narrow checks first and broader regressions after runtime synchronization"
  prohibited_actions:
    - "Manually edit generated runtime policies as independent sources"
    - "Weaken a failing assertion or router behavior to make the new contract pass"
    - "Use a subagent for tightly coupled test-policy-sync work"
    - "Treat review, test, or clean-worktree evidence as DoD"
  compliance_checks:
    - "Task path map matches approved s05 component ownership"
    - "TDD evidence captures RED and GREEN commands and outcomes"
    - "Two targeted review batches record Spec Compliance before Code Quality"
    - "Strict checklist covers compatibility, rollback, and parent-candidate evidence"
    - "Task Plan receipt is APPROVED with digest_match=true before s07 activation"
risks:
  - id: "R-S06-AR-001"
    description: "The RED fixture fails for formatting noise instead of the authority contradiction."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Read only the bounded Skill Requirement section and assert the complete precedence contract plus removal of the unconditional form."
    contingency: "Refine the fixture before any policy edit; do not count an unrelated failure as RED evidence."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S06-AR-002"
    description: "Runtime synchronization changes files outside the accepted generated policy surface."
    likelihood: LOW
    impact: HIGH
    severity: HIGH
    mitigation: "Inspect the post-sync diff allowlist and require byte parity before review."
    contingency: "Restore generated output from the canonical source and stop if unexpected files remain changed."
    owner: "developer"
    status: MONITORING
  - id: "R-S06-AR-003"
    description: "The child passes locally but the existing CR-008 candidate evidence becomes stale."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Record exact child commit/SHA and require parent candidate re-verification after child DoD."
    contingency: "Keep parent release blocked until refreshed exact-candidate evidence passes."
    owner: "qc"
    status: MONITORING
timebox:
  target_duration: "one focused implementation and targeted verification sequence"
  deadline: "before child s08 Verify + DoD"
  escalation_rule: "Stop and return to s03/s04/s05 if a new trigger, reason code, router behavior, schema, or architecture boundary is required."
```

## Main Artifact
```yaml
implementation_goal: >-
  Resolve CF-019 by proving the current policy contradiction, applying the smallest canonical policy
  correction, synchronizing generated runtime copies, and producing reviewable exact-candidate evidence.
ba_lane:
  acceptance_coverage:
    - "AC-AR-01 -> T1 RED precedence contract, T2 canonical wording, T3 runtime parity"
    - "AC-AR-02..06 and EDGE-AR-01..05,07 -> T1 exact lane/trigger/role/gate/reason matrix and T4 regressions"
    - "AC-AR-07 -> T1 keeps semantic ownership in workflow-adaptive-governance.test.js"
    - "AC-AR-08 and EDGE-AR-06 -> T2 canonical source plus T3 generated Codex/Claude parity"
    - "AC-AR-09 -> T4 adjacent scaffold, SA/TA contract, bundle smoke, and pack-audit checks"
    - "AC-AR-10 -> T6 exact child candidate handoff to CR-008 without child-owned release actions"
  scope_guards:
    - "No new lane, hard trigger, role, gate, reason code, schema, or SA/TA skill contract"
    - "No direct edit to workflow-adaptive-governance.js unless a new design cycle is approved"
    - "No release, Business Acceptance, merge, tag, publish, or install from this child"
    - "No modification of receipt-bound s04 or s05 artifacts"
  human_review_points:
    - "Developer approves this Task Plan and seals its trusted receipt before s07 activation"
    - "AR-B1: QC records Spec Compliance for the semantic fixture and canonical policy before Developer/QC Code Quality"
    - "AR-B2: QC records Spec Compliance for generated parity and regression evidence before Developer/QC Code Quality"
    - "QC owns Technical Verification and DoD at s08; parent CR-008 retains release authority"
dev_lane:
  path_map:
    - path: "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
      ownership: "Editable canonical semantic fixture; owns precedence and exact trigger-role/reason evidence"
    - path: "policies/codex/AGENTS.global.md"
      ownership: "Editable canonical policy; owns the generic Skill Requirement precedence wording"
    - path: "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js"
      ownership: "Execute only; existing generator owns runtime propagation"
    - path: "packages/workflow-bundle/runtime/codex/AGENTS.global.md"
      ownership: "Generated output; never edit independently"
    - path: "packages/workflow-bundle/runtime/claude/AGENTS.global.md"
      ownership: "Generated output; never edit independently"
    - path: "packages/workflow-bundle/scripts/workflow-adaptive-governance.js"
      ownership: "Read-only protected baseline; executable routing behavior is not in the approved delta"
    - path: "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
      ownership: "Run-only supporting parity evidence"
    - path: "packages/workflow-bundle/test/scaffold-workflow.test.js"
      ownership: "Run-only supporting integration evidence"
    - path: "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
      ownership: "Run-only supporting SA/TA contract evidence"
    - path: "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s07.implementation.md"
      ownership: "Child implementation and delivery-rule evidence"
    - path: "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s08.verification.md"
      ownership: "QC-owned child verification and DoD evidence"
  technical_sequence:
    - "T1 adds the contract fixture and records RED for the intended unconditional-policy reason"
    - "T2 changes only the canonical policy and makes the same fixture GREEN"
    - "T3 runs the existing sync and proves generated policy bytes match canonical"
    - "T4 runs focused adjacent regressions and workflow-pack audit"
    - "T5 records delivery-rule evidence and completes AR-B1 then AR-B2 two-tier review"
    - "T6 binds the exact child candidate for child verify and parent CR-008 re-verification"
  tdd_targets:
    - behavior: "Generic SA/TA guidance defers to router-derived applicability and cannot re-add omitted roles"
      failing_test: "node packages/workflow-bundle/test/workflow-adaptive-governance.test.js must fail specifically on the current unconditional Skill Requirement"
      passing_test: "The same command passes after only the canonical policy correction and runtime sync"
    - behavior: "Every named hard trigger retains the exact positive and negative role/reason contract"
      failing_test: "The new matrix runs in the same fail-first suite; its router assertions should remain green while the policy-precedence assertion supplies the intentional RED"
      passing_test: "The complete matrix remains green after the policy correction"
task_breakdown:
  - id: "T1"
    owner_role: "developer"
    name: "Add fail-first precedence and exact trigger matrix evidence"
    objective: "Make the current authority contradiction fail for the right reason while locking all accepted positive and negative role semantics."
    paths_in_scope:
      - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
    dependencies:
      - "Approved s05 receipt"
    outputs_expected:
      - "Bounded canonical-policy section reader/assertions"
      - "Exact per-trigger role/reason/gate assertions with negative-role coverage"
      - "Captured RED output naming the unconditional Skill Requirement contradiction"
    review_checkpoint: "Confirm the RED reason before T2; unrelated failures block the sequence."
    verification_hint: "Run node packages/workflow-bundle/test/workflow-adaptive-governance.test.js and require non-zero exit for the new precedence assertion only."
  - id: "T2"
    owner_role: "developer"
    name: "Apply the canonical policy precedence correction"
    objective: "Make SA and TA conditional on router applicability without changing executable routing or any stable contract value."
    paths_in_scope:
      - "policies/codex/AGENTS.global.md"
    dependencies:
      - "T1 intentional RED confirmed"
    outputs_expected:
      - "One focused Skill Requirement paragraph that defers to the router"
      - "Explicit prohibition on generic guidance re-adding omitted or not-applicable roles"
      - "GREEN result for the canonical adaptive-governance suite"
    review_checkpoint: "AR-B1 Spec Compliance by QC first; only then Code Quality by Developer and QC."
    verification_hint: "Re-run node packages/workflow-bundle/test/workflow-adaptive-governance.test.js and require zero exit."
  - id: "T3"
    owner_role: "developer"
    name: "Regenerate and prove runtime policy parity"
    objective: "Propagate the canonical correction to Codex and Claude through the existing generated-runtime boundary."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js (execute only)"
      - "packages/workflow-bundle/runtime/codex/AGENTS.global.md (generated)"
      - "packages/workflow-bundle/runtime/claude/AGENTS.global.md (generated)"
    dependencies:
      - "T2 GREEN"
    outputs_expected:
      - "Both generated policies contain the approved conditional precedence wording"
      - "Canonical/Codex/Claude byte equivalence"
      - "No unexpected generated-file changes"
    review_checkpoint: "Inspect the generated diff allowlist before T4."
    verification_hint: "Run npm run build:workflow:bundle-runtime, then node packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js."
  - id: "T4"
    owner_role: "developer"
    name: "Run targeted compatibility and pack regressions"
    objective: "Prove the focused policy repair does not regress scaffold integration, SA/TA contracts, runtime packaging, or workflow governance."
    paths_in_scope:
      - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
      - "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
      - "packages/workflow-bundle/test/scaffold-workflow.test.js"
      - "packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
      - "packages/workflow-bundle/test/run-workflow-bundle-smoke.test.js"
      - "packages/workflow-bundle/scripts/audit-workflow-pack.js"
    dependencies:
      - "T3 parity pass"
    outputs_expected:
      - "Targeted test logs with zero failures"
      - "Workflow-pack audit pass"
      - "Workflow validate, protocol, planning, diff, and UTF-8 evidence"
    review_checkpoint: "AR-B2 Spec Compliance by QC first; only then Code Quality by Developer and QC."
    verification_hint: "Run each named Node suite, wfc validate/protocol/plan, git diff --check, and UTF-8 plus U+FFFD checks."
  - id: "T5"
    owner_role: "developer"
    name: "Record implementation discipline and two-tier review"
    objective: "Create auditable evidence for TDD, worktree isolation, targeted review order, and the no-delegation decision."
    paths_in_scope:
      - "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s07.implementation.md"
    dependencies:
      - "T2 AR-B1 review outcome"
      - "T4 AR-B2 review outcome"
    outputs_expected:
      - "RED/GREEN TDD evidence"
      - "Existing CR-008 worktree evidence and hold-open guard"
      - "AR-B1 and AR-B2 Spec Compliance -> Code Quality evidence"
      - "Agentic/no-subagent rationale and exact verify path"
    review_checkpoint: "Do not hand off to s08 while any review finding is open."
    verification_hint: "Validate Delivery Rule Evidence and trace each recorded review to its batch paths and commands."
  - id: "T6"
    owner_role: "developer"
    name: "Bind the exact child candidate and hand off to verification"
    objective: "Identify the precise CF-019 result that QC must verify and that the parent CR-008 candidate must later include."
    paths_in_scope:
      - "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s07.implementation.md"
      - "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s08.verification.md (QC-owned next step)"
      - "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md (parent read-only until child DoD)"
    dependencies:
      - "T4 regressions pass"
      - "T5 review findings closed"
    outputs_expected:
      - "Exact child commit and artifact SHA-256 evidence"
      - "QC verification handoff with no open implementation finding"
      - "Parent CR-008 re-verification requirement against the new candidate"
    review_checkpoint: "QC owns child Technical Verification and DoD; parent release remains blocked until exact-candidate refresh."
    verification_hint: "Use git diff/status, SHA-256 binding, child s08 evidence, and refreshed parent candidate verification; perform no child release action."
dependencies_global:
  - "Developer-approved, digest-valid Task Plan receipt is required before any T1 edit"
  - "The existing CR-008 worktree and branch remain the isolated implementation workspace"
  - "Node.js and repository-local scripts are sufficient; no dependency installation is planned"
  - "Parent release rollback baseline remains v2.6.1"
risk_notes:
  - "A policy-only change is behaviorally significant because it controls which skills users must endure."
  - "Generated-runtime sync is safe only with an allowlisted diff and parity evidence."
  - "Receipt-bound s04/s05 artifacts must stay byte-stable."
  - "Any router or stable-reason change invalidates the approved approach and must reopen design."
verification_plan:
  - "RED: new policy-precedence assertion fails specifically against the current unconditional Skill Requirement."
  - "GREEN: adaptive-governance suite passes after the smallest canonical policy edit."
  - "PARITY: regenerate both runtime modes and prove byte identity with the canonical policy."
  - "REGRESSION: run scaffold, SA/TA contract, bundle smoke, and workflow-pack audit checks."
  - "GOVERNANCE: run wfc validate for the child plus protocol and planning validators for the workflow root."
  - "QUALITY: run git diff --check, UTF-8 decode, U+FFFD scan, and changed-path allowlist inspection."
  - "REVIEW: AR-B1 Spec Compliance -> Code Quality, then AR-B2 Spec Compliance -> Code Quality."
  - "VERIFY: QC binds the exact child candidate in s08 before parent CR-008 candidate refresh."
notes_for_implementation: >-
  Run sequentially in the existing worktree. Do not delegate the shared test-policy-sync chain. Stop
  on a wrong RED reason, an unexpected generated diff, a new contract need, or any receipt mismatch.
```

## Verification Plan

- Mandatory checks: targeted RED/GREEN adaptive suite; runtime sync and byte parity; scaffold and
  SA/TA contract regressions; bundle smoke; workflow-pack audit; child workflow/protocol/planning
  validators; diff and UTF-8 checks.
- Risk note: a green router suite is insufficient unless the canonical policy precedence assertion
  and the generated-runtime parity checks also pass.
- Rollout note: this child performs no rollout. After child DoD, CR-008 must rebuild and re-verify an
  exact hosted candidate; rollback remains v2.6.1.

## Governance Checks
```yaml
checklist_name: "strict"
status: PASS
checks:
  - item: "Approved baseline and design receipts are verified before planning"
    result: PASS
    evidence: "Spec, Contract, DoR, and Approach receipts are APPROVED with digest_match=true."
    owner: "developer"
    next_action: "Preserve receipt-bound artifacts byte-for-byte."
  - item: "Compatibility and generated-runtime work are explicit"
    result: PASS
    evidence: "T3 and T4 separate runtime generation, parity, adjacent contracts, and pack regression."
    owner: "developer/qc"
    next_action: "Run the tasks only after Task Plan approval."
  - item: "Review is separated from build and ordered correctly"
    result: PASS
    evidence: "AR-B1 and AR-B2 require Spec Compliance before Code Quality and T5 records both."
    owner: "developer/qc"
    next_action: "Block s08 while any review finding remains open."
  - item: "Rollback and parent candidate obligations are visible"
    result: PASS
    evidence: "T6 keeps child release out of scope, binds the exact result, and requires parent re-verification with v2.6.1 rollback."
    owner: "qc"
    next_action: "Refresh parent evidence only after child DoD."
  - item: "Governance deviations are absent"
    result: PASS
    evidence: "The plan follows approved Option A and opens no new boundary or waiver."
    owner: "developer"
    next_action: "Open a spec change or governance exception if implementation must drift."
blocking_items: []
notes: "Governance authoring checks pass; the separate human Task Plan gate remains pending."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "T1/T2: canonical adaptive-governance RED/GREEN behavior"
  - "T3: canonical/Codex/Claude runtime byte parity"
  - "T4: scaffold integration, SA/TA contracts, bundle smoke, and pack audit"
  - "T5: targeted two-tier review with all findings closed"
  - "T6/s08: exact child candidate and refreshed parent candidate evidence"
compatibility_checkpoints:
  - "LANE_*, HARD_*, ROLE_*, and GATE_* values and ordering remain unchanged"
  - "Router inputs, outputs, deterministic behavior, and six-trigger taxonomy remain unchanged"
  - "SA/TA skill schemas, trusted receipts, protocol state, and scaffold behavior do not regress"
  - "Both generated policy copies remain byte-equivalent to canonical"
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Revert the focused child implementation commit if verification fails"
  - "Run the existing runtime sync after a revert so both generated policies match canonical"
  - "Keep the parent candidate blocked until refreshed evidence passes"
  - "Use v2.6.1 as the parent release rollback baseline"
```

## Audit
```yaml
step: "s06 Task Plan authoring"
status: PASS
checks:
  - criterion: "Every in-scope acceptance criterion has an owning task and verification route"
    result: PASS
    evidence: "BA acceptance_coverage maps AC-AR-01..10 and edge behavior to T1..T6."
  - criterion: "Behavior change uses an explicit fail-for-the-right-reason TDD sequence"
    result: PASS
    evidence: "T1 requires the policy contradiction RED before T2 and names the accepted failing condition."
  - criterion: "Every task names concrete paths, dependencies, outputs, and verification"
    result: PASS
    evidence: "All six task records fill paths_in_scope, dependencies, outputs_expected, review_checkpoint, and verification_hint."
  - criterion: "Spec Compliance precedes Code Quality for each targeted review batch"
    result: PASS
    evidence: "AR-B1 and AR-B2 explicitly enforce the two-tier order and named reviewer roles."
  - criterion: "Compatibility, rollback, workflow validation, UTF-8, and parent handoff are explicit"
    result: PASS
    evidence: "Verification Plan and Brownfield Delivery Plan contain each required lane."
  - criterion: "No implementation authority is inferred from drafting the plan"
    result: PASS
    evidence: "The note remains draft and T1 depends on a Developer-approved digest-valid Task Plan receipt."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one bounded planning pass after the Approach receipt was verified."
gaps:
  - "Developer Task Plan approval and its trusted receipt remain pending."
risk_level: MEDIUM
next_action: "Developer reviews and approves or amends this Task Plan before s07 activation."
```

## Traceability
```yaml
business_refs:
  - "align-adaptive-sa-ta-applicability.s02.business-goal.md"
spec_refs:
  - "align-adaptive-sa-ta-applicability.s04.acceptance-criteria.md"
requirement_refs:
  - "OQ-AR-001 Option B"
  - "OQ-AR-002 Option A"
readiness_refs:
  - "Spec/Contract/DoR receipts: APPROVED, digest_match=true"
  - "Approach receipt: APPROVED, reviewed_by=developer, reviewed_at=2026-09-08T06:57:11.904Z, digest_match=true"
acceptance_refs:
  - "AC-AR-01..10"
  - "EDGE-AR-01..07"
design_refs:
  - "s05 Option A"
  - "PATH-CORRECTION-AR-001"
task_refs:
  - "T1..T6"
implementation_refs: []
verification_refs:
  - "AR-B1"
  - "AR-B2"
  - "child s08 exact-candidate verification"
  - "parent CR-008 candidate re-verification"
```

## Handoff

- First task after activation: T1 adds fail-first precedence and exact trigger evidence; no policy
  edit is allowed until the intended RED is confirmed.
- Blocking dependency: Developer must approve this Task Plan and seal a digest-valid receipt.
- Execution topology: agentic in the existing CR-008 worktree; no subagent because T1-T4 share one
  tightly coupled evidence chain.
- Condition for s07: Task Plan artifact is final, Developer review provenance is recorded, the
  trusted receipt is `APPROVED` with `digest_match=true`, and protocol activation succeeds.
