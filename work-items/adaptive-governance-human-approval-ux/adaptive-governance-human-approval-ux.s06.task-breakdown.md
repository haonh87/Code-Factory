---
artifact_id: "adaptive-governance-human-approval-ux.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "adaptive-governance-human-approval-ux"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
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
change_id: "CR-008"
change_status: approved
spec_delta_refs:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CR-008/spec-delta/brd.delta.md"
  srs: "changes/CR-008/spec-delta/srs.delta.md"
spec_status: approved
planning_track: enterprise
execution_mode: agentic
execution_roles:
  - "developer"
  - "qc"
  - "devops"
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
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
  release:
    - "devops"
    - "qc"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-28T14:23:15Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-08-28T14:23:15Z"
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-08-28T14:23:15Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-28T14:50:08Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-28T15:08:10Z"
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
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "adaptive-governance-human-approval-ux.s05.technical-approach.md"
linked_artifacts:
  - "changes/CR-008/design.md"
  - "changes/CR-008/tasks.md"
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
  - "adaptive-governance-human-approval-ux.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Approach receipt đã APPROVED và digest-matched. Draft enterprise plan T0-T9 khóa pure policy
> kernel, adapter, approval transaction, telemetry và release parity. Developer đã phê duyệt
> Task Plan; trusted receipt vẫn cần được seal và verify trước khi mở s07.

## Step Contract
```yaml
step_goal: >-
  Produce an execution-ready, independently reviewable plan for the approved policy-kernel-plus-adapters
  design without forcing s07 to reinvent boundaries, dependencies, TDD or verification.
input_summary:
  - "Spec, Contract, DoR and Approach trusted receipts are APPROVED and digest-matched"
  - "AG-01..AG-13 approved acceptance baseline"
  - "Approved Option B: pure policy kernel, existing-runtime adapters and approval transaction coordinator"
  - "Brownfield Node/CommonJS runtime and current Guardrails/release candidate pipeline"
output_summary:
  - "T0-T9 with exact owned paths, dependencies, TDD targets, reviews and verify paths"
  - "Dedicated worktree and independent two-tier review checkpoints"
  - "Compatibility, recovery, telemetry privacy and release-parity checkpoints"
done_when:
  - "Every AG criterion maps to one or more tasks and verification evidence"
  - "Every behavior-changing task has a fail-first TDD target"
  - "Unsafe downgrade, compatibility, atomicity, privacy, and rollback risks have owners"
  - "No task contains placeholder paths or verification"
  - "Human Developer reviews and approves the plan, then a matching trusted receipt is sealed"
owner: "developer"
```

## Main Artifact
```yaml
implementation_goal: >-
  Deliver the approved adaptive-governance contract through one deterministic policy kernel,
  bounded adapters and a recoverable approval transaction while preserving current authority,
  receipt compatibility, rollback and privacy guarantees.
ba_lane:
  acceptance_coverage:
    - "AG-01..AG-04 -> T0, T1, T2"
    - "AG-05 -> T0, T3, T4"
    - "AG-06..AG-07 -> T0, T5"
    - "AG-08 -> T0, T6"
    - "AG-09 -> T0, T4, T8, T9"
    - "AG-10 -> T0, T7, T9"
    - "AG-11 -> T0, T5, T6, T9"
    - "AG-12 -> T0, T7, T9"
    - "AG-13 -> T0, T4, T8, T9"
  scope_guards:
    - "No AI self-approval or implicit gate pass"
    - "No downgrade of public-contract, migration, security, regulated, or release triggers"
    - "No signer-session/passphrase caching in this change"
    - "No database, remote policy service or remote telemetry exporter"
    - "No rewrite or re-signing of historical artifacts and receipts"
    - "No edits to CHANGE-005 or add-diagram-design-adapter WIP"
  human_review_points:
    - "Developer approves this Task Plan before s07 activation"
    - "Independent s07 review checks spec compliance before code quality for each risky batch"
    - "QC reviews unsafe downgrade, transaction failure and compatibility evidence"
    - "DevOps/QC review exact candidate, runtime parity and rollback evidence"
    - "PO Business Acceptance remains a closeout gate for the approved product outcome"
dev_lane:
  path_map:
    - area: "policy-and-contract"
      paths: ["policies/codex/AGENTS.global.md", "skills/orchestration/workflow-governance-router", "skills/orchestration/codex-workflow-chain/references/adaptive-planning.md", "skills/orchestration/codex-workflow-chain/references/role-aware-workflow.md"]
    - area: "decision-kernel-and-admission"
      paths: ["packages/workflow-bundle/scripts/workflow-adaptive-governance.js", "packages/workflow-bundle/scripts/materialize-work-item.js", "packages/workflow-bundle/test/workflow-adaptive-governance.test.js", "packages/workflow-bundle/test/materialize-work-item.test.js"]
    - area: "applicability-adapters"
      paths: ["packages/workflow-bundle/scripts/scaffold-workflow.js", "packages/workflow-bundle/scripts/workflow-step-definitions.js", "packages/workflow-bundle/scripts/work-item-protocol-utils.js", "packages/workflow-bundle/scripts/validate-workflow-governance.js"]
    - area: "compatibility-readers"
      paths: ["packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js", "packages/workflow-bundle/scripts/validate-work-item-protocol.js", "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"]
    - area: "approval-transaction"
      paths: ["packages/workflow-bundle/scripts/workflow-approval-transaction.js", "packages/workflow-bundle/scripts/workflow-gate-review.js", "packages/workflow-bundle/scripts/work-item-protocol.js", "packages/workflow-bundle/bin/wfc.js"]
    - area: "telemetry"
      paths: ["packages/workflow-bundle/scripts/workflow-telemetry.js", "packages/workflow-bundle/scripts/materialize-work-item.js", "packages/workflow-bundle/scripts/workflow-gate-review.js", "packages/workflow-bundle/scripts/work-item-protocol.js", "packages/workflow-bundle/test/workflow-telemetry.test.js"]
    - area: "release-and-runtime-parity"
      paths: ["packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js", "packages/workflow-bundle/runtime", ".github/workflows/workflow-guardrails.yml", "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js", "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"]
  technical_sequence: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"]
  implementation_batches:
    - { id: "B0", tasks: ["T0"], purpose: "Fail-first baseline" }
    - { id: "B1", tasks: ["T1", "T2", "T3", "T4"], purpose: "Policy kernel and compatibility adapters" }
    - { id: "B2", tasks: ["T5", "T6", "T7"], purpose: "Approval transaction, closeout and telemetry" }
    - { id: "B3", tasks: ["T8"], purpose: "Policy/docs/runtime/pipeline parity" }
    - { id: "B4", tasks: ["T9"], purpose: "Integrated verification evidence" }
  tdd_targets:
    - "T2: non-delivery request writes any delivery artifact; repeated decisions differ; hard trigger downgrades"
    - "T3: maintenance receives irrelevant roles/gates; not_applicable creates an action"
    - "T4: legacy fixture becomes unreadable or missing required evidence is accepted"
    - "T5: any injected write boundary leaves a partial receipt/state or crash recovery is non-idempotent"
    - "T6: maintenance requests Release/Business Acceptance or successful closeout leaves stale pending state"
    - "T7: disabled telemetry writes data or enabled telemetry accepts prohibited fields/expired records"
task_breakdown:
  - id: "T0"
    owner_role: "qc"
    name: "Fail-first baseline and golden matrix"
    objective: "Lock current friction plus expected routing, applicability, atomicity, privacy and parity outcomes before production edits."
    paths_in_scope: ["packages/workflow-bundle/test/workflow-adaptive-governance.test.js", "packages/workflow-bundle/test/workflow-gate-review.test.js", "packages/workflow-bundle/test/workflow-telemetry.test.js", "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"]
    dependencies: []
    outputs_expected: ["Eight lane fixtures", "Current interaction baseline", "Hard-trigger negatives", "Bundle failure/crash fixtures", "Telemetry secret canary", "Version-skew fixture"]
    review_checkpoint: "QC independently confirms fixtures reflect AG-01..AG-13 and fail for the expected baseline reason."
    verification_hint: "Run the new focused tests before code and record RED evidence mapped to AG IDs."
  - id: "T1"
    owner_role: "developer"
    name: "Request-lane and hard-escalation contract"
    objective: "Publish the canonical lane, trigger, applicability and reason-code vocabulary consumed by code and docs."
    paths_in_scope: ["policies/codex/AGENTS.global.md", "skills/orchestration/workflow-governance-router", "skills/orchestration/codex-workflow-chain/references/adaptive-planning.md", "skills/orchestration/codex-workflow-chain/references/role-aware-workflow.md"]
    dependencies: ["T0"]
    outputs_expected: ["Eight request lanes", "Hard-escalation precedence", "Role/gate trigger matrix", "Stable reason-code catalog"]
    review_checkpoint: "Independent review: spec compliance first, then terminology/maintainability."
    verification_hint: "Map every contract row to one golden fixture; run local-link and UTF-8 checks for changed docs."
  - id: "T2"
    owner_role: "developer"
    name: "Pure policy kernel and admission adapter"
    objective: "Produce one normalized deterministic decision and short-circuit non-delivery before any delivery write."
    paths_in_scope: ["packages/workflow-bundle/scripts/workflow-adaptive-governance.js", "packages/workflow-bundle/scripts/materialize-work-item.js", "packages/workflow-bundle/test/workflow-adaptive-governance.test.js", "packages/workflow-bundle/test/materialize-work-item.test.js"]
    dependencies: ["T1"]
    outputs_expected: ["request_lane", "workflow_required", "routing_reasons", "escalation_reasons", "audited human override path", "stable normalized serialization"]
    review_checkpoint: "Independent review: AG-01/AG-03/AG-04 compliance, then pure-function/code-quality review."
    verification_hint: "TDD RED->GREEN; evaluate every normalized input at least 20 times and assert byte-equivalent decisions plus zero non-delivery writes."
  - id: "T3"
    owner_role: "developer"
    name: "Applicability adapters and compact artifact shape"
    objective: "Render the kernel decision consistently in scaffold, protocol and governance surfaces without empty role ceremony."
    paths_in_scope: ["packages/workflow-bundle/scripts/scaffold-workflow.js", "packages/workflow-bundle/scripts/workflow-step-definitions.js", "packages/workflow-bundle/scripts/work-item-protocol-utils.js", "packages/workflow-bundle/scripts/validate-workflow-governance.js", "packages/workflow-bundle/test/scaffold-workflow.test.js", "packages/workflow-bundle/test/validate-workflow-governance.test.js"]
    dependencies: ["T2"]
    outputs_expected: ["Trigger-based execution_roles", "Reasoned required gates", "Zero-action not_applicable", "Trigger-based SA/TA invocation", "Adapter parity"]
    review_checkpoint: "Independent review: AG-02/AG-05 authority semantics first, then adapter quality."
    verification_hint: "TDD RED->GREEN; compare exact roles, gates, reasons, blockers and actions for every lane fixture."
  - id: "T4"
    owner_role: "developer"
    name: "Legacy/adaptive dual-read and activation guards"
    objective: "Preserve legacy evidence/receipts and block adaptive writes on unsupported runtime parity."
    paths_in_scope: ["packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js", "packages/workflow-bundle/scripts/validate-work-item-protocol.js", "packages/workflow-bundle/scripts/validate-workflow-governance.js", "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js", "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js", "packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js"]
    dependencies: ["T3"]
    outputs_expected: ["Legacy/adaptive reader", "Receipt v1 preservation", "Matching-minor activation guard", "Deprecation-compatible fallback"]
    review_checkpoint: "Independent review: compatibility/security first, then reader maintainability."
    verification_hint: "Run legacy/adaptive artifact and receipt matrices; assert missing evidence and source/runtime skew fail closed."
  - id: "T5"
    owner_role: "developer"
    name: "Journaled readiness approval transaction"
    objective: >-
      Preflight, summarize, stage, commit/recover and reconcile all applicable readiness decisions
      while retaining independent receipt v1 files and one human interaction.
    paths_in_scope: ["packages/workflow-bundle/scripts/workflow-approval-transaction.js", "packages/workflow-bundle/scripts/workflow-gate-review.js", "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js", "packages/workflow-bundle/scripts/work-item-protocol.js", "packages/workflow-bundle/bin/wfc.js", "packages/workflow-bundle/test/workflow-gate-review.test.js", "packages/workflow-bundle/test/approval-path-defects.test.js"]
    dependencies: ["T4"]
    outputs_expected: ["Complete bundle preview", "Per-work-item lock", "Transaction journal", "Independent receipts", "Rollback/recovery", "Zero stale pending state"]
    review_checkpoint: "Independent review: authority/atomicity/spec compliance first, then transaction code quality."
    verification_hint: "TDD RED->GREEN for success, reject, stale digest, wrong reviewer, each injected write failure, crash recovery, duplicate retry and state reconciliation."
  - id: "T6"
    owner_role: "developer"
    name: "Applicable-only closeout and compatibility fallback"
    objective: "Reuse the transaction coordinator for terminal gates while preserving individual commands and ready-bundle compatibility."
    paths_in_scope: ["packages/workflow-bundle/scripts/workflow-approval-transaction.js", "packages/workflow-bundle/scripts/workflow-gate-review.js", "packages/workflow-bundle/scripts/work-item-protocol.js", "packages/workflow-bundle/bin/wfc.js", "packages/workflow-bundle/test/work-item-protocol.test.js", "packages/workflow-bundle/test/workflow-gate-review.test.js"]
    dependencies: ["T5"]
    outputs_expected: ["DoD-only maintenance closeout", "Conditional Release/Business Acceptance", "Atomic receipts", "Individual-command fallback", "Compatible ready-bundle alias"]
    review_checkpoint: "Independent review: AG-08/AG-11 authority semantics first, then CLI/protocol quality."
    verification_hint: "TDD RED->GREEN; maintenance omits Release/BA, product release retains them, and success leaves no stale pending claim."
  - id: "T7"
    owner_role: "developer"
    name: "Privacy-bounded interaction telemetry"
    objective: "Measure lane, friction and lead time using only opt-in, local, allowlisted and expiring data."
    paths_in_scope: ["packages/workflow-bundle/scripts/workflow-telemetry.js", "packages/workflow-bundle/scripts/materialize-work-item.js", "packages/workflow-bundle/scripts/workflow-gate-review.js", "packages/workflow-bundle/scripts/work-item-protocol.js", "packages/workflow-bundle/bin/wfc.js", "packages/workflow-bundle/test/workflow-telemetry.test.js"]
    dependencies: ["T2", "T5", "T6"]
    outputs_expected: ["Allowlist mapper", "Per-install pseudonym", "Role/gate/interaction/override/retry counts", "Bucketed lead time", "30/90-day retention", "Purge command"]
    review_checkpoint: "Independent review: privacy/AG-10 first, then integration and performance quality."
    verification_hint: "TDD RED->GREEN; disabled mode writes zero data, secret canary is rejected, expired records purge, and lifecycle adapters emit only allowed fields."
  - id: "T8"
    owner_role: "developer"
    name: "Policy, docs, Guardrails and runtime parity"
    objective: "Publish one contract and promote the exact verified package candidate without environment-specific rebuild."
    paths_in_scope: ["policies/codex/AGENTS.global.md", "skills/orchestration", "packages/workflow-bundle/runtime", "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js", ".github/workflows/workflow-guardrails.yml", "README.md", "README.vi.md", "packages/workflow-bundle/README.md", "docs/workflow-bundle-quickstart.md", "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js", "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"]
    dependencies: ["T3", "T4", "T6", "T7"]
    outputs_expected: ["Lane/trigger/bundle docs", "EN/VI parity", "Codex/Claude runtime parity", "Guardrails coverage", "Exact candidate digest smoke", "Rollback documentation"]
    review_checkpoint: "Independent review: contract/release compliance first, then editorial/pipeline quality."
    verification_hint: "Run runtime sync, pack audit, Guardrails-equivalent suite, Node 18/22, exact npm candidate install matrix, local-link and UTF-8 checks."
  - id: "T9"
    owner_role: "qc"
    name: "Integrated verification and release readiness"
    objective: "Conclude AG-01..AG-13 coverage, security, compatibility, interaction reduction, and rollback readiness."
    paths_in_scope: ["All T0-T8 changed paths"]
    dependencies: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"]
    outputs_expected: ["AG-01..AG-13 coverage", "Regression/compatibility summary", "Security/privacy review", "Interaction comparison", "Runtime parity", "Release/rollback recommendation"]
    review_checkpoint: "Spec compliance, code quality, Technical Verification, then DoD."
    verification_hint: "Run full unit, all validators, pack audit, authoring/bundle/exact-candidate smoke, runtime parity, MCP, security/static scan, UTF-8, diff and rollback rehearsal."
dependencies_global:
  - "Existing trusted-receipt compatibility contract"
  - "Existing Workflow Guardrails and exact-candidate release baseline"
  - "Dedicated worktree required at s07 because planning_track=enterprise"
  - "Isolation from CHANGE-005 and add-diagram-design-adapter WIP"
risk_notes:
  - { id: "R1", risk: "Unsafe routing downgrade", mitigation: "Deterministic hard triggers; AI cannot lower them" }
  - { id: "R2", risk: "Bundle hides individual decisions", mitigation: "Summary lists every gate, reviewer, digest, and consequence" }
  - { id: "R3", risk: "Transaction leaves partial state", mitigation: "Preflight, lock, journal, rollback/recovery and failure injection" }
  - { id: "R4", risk: "Compact shape weakens validation", mitigation: "Explicit not_applicable; required evidence still fails when missing" }
  - { id: "R5", risk: "Legacy artifact/runtime incompatibility", mitigation: "Dual-read, receipt v1, parity guard and exact candidate smoke" }
  - { id: "R6", risk: "Telemetry leaks or persists data", mitigation: "Opt-in allowlist, pseudonym, secret canary, retention and purge" }
  - { id: "R7", risk: "Scope expands into signer or policy-platform redesign", mitigation: "Both boundaries explicitly prohibited" }
verification_plan:
  - "Fail-first golden routing/applicability matrix with 20 deterministic repeats"
  - "Negative unsafe-downgrade and audited human-override fixtures"
  - "Legacy/adaptive artifact, receipt and runtime-skew matrix"
  - "Receipt transaction failure injection, crash recovery and state reconciliation"
  - "Telemetry disabled no-op, allowlist, pseudonym, retention, purge and secret canary"
  - "Full unit, workflow validators, authoring/bundle smoke, pack audit, runtime parity, MCP, security/static, UTF-8, link and diff checks"
  - "Exact candidate install matrix and rollback rehearsal before Release"
notes_for_implementation: >-
  Spec, Contract, DoR and Approach receipts are valid. Do not start s07 until this Task Plan has a
  valid Developer receipt and the work item is explicitly activated. Use a dedicated worktree,
  keep execution agentic, preserve unrelated WIP, follow TDD per behavioral task, and perform
  independent two-tier review by batch. Any signer-session, database, remote policy or remote
  telemetry change requires an approved spec change.
```

## Verification Plan
- Mandatory: execute every `verification_hint`, then the complete validation matrix in T9.
- Risk: unsafe downgrade and partial approval writes are release blockers.
- Rollout: ship behind the existing compatibility readers; retain a revert path to fixed-shape routing.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - check: "Task plan covers public contract, security, compatibility, telemetry, docs, and release verification"
    status: PASS
    evidence: "T0-T9 each owns paths, dependencies, outputs, review, and verification."
  - check: "Human-controlled gates remain explicit"
    status: PASS
    evidence: "Plan reduces applicability and interactions but preserves independent receipts and authority."
  - check: "Implementation path is closed"
    status: PASS
    evidence: "CR/work-item plus Spec, Contract, DoR and Approach receipts are approved; Task Plan human review is complete but its trusted receipt remains pending."
blocking_items:
  - "Developer Task Plan trusted receipt"
owner: "developer"
next_action: "Seal and verify the Developer-approved Task Plan receipt; do not activate s07 before it passes."
```

## Human Gate Decision
```yaml
gate: "task_plan"
status: "APPROVED_PENDING_RECEIPT"
reviewed_by: ["developer"]
reviewed_at: "2026-08-28T15:08:10Z"
decision_source: "User explicitly approved Task Plan with role Developer."
decision_scope: "T0-T9, B0-B4, owned paths, dependencies, TDD targets, review checkpoints and verify paths recorded in this finalized s06 artifact."
```

## Audit
```yaml
step: "s06 Task Plan authoring"
status: PASS
checks:
  - criterion: "Plan is execution-oriented"
    result: PASS
    evidence: "T0-T9 define owners, exact paths, dependencies, expected outputs, independent review checkpoints and verification hints."
  - criterion: "Enterprise delivery controls are explicit"
    result: PASS
    evidence: "A dedicated worktree, fail-first TDD, independent two-tier review, compatibility, recovery and release-parity checks are mandatory."
  - criterion: "Approved scope and approach remain traceable"
    result: PASS
    evidence: "AG-01..AG-13 and the approved policy-kernel-plus-adapters boundaries map to batches and verification evidence."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
gaps:
  - "Developer review is complete; the trusted Task Plan receipt is not sealed yet."
risk_level: HIGH
next_action: "Seal and verify the trusted Task Plan receipt, then activate the work item before creating the dedicated s07 worktree."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "Existing high-risk fixtures continue to require the same or stronger gates."
  - "Legacy fixed-shape notes remain readable."
  - "Existing individual approval commands and receipt v1 verification remain valid."
compatibility_checkpoints:
  - "Codex and Claude installed runtimes remain byte-equivalent to canonical source."
  - "Existing trusted receipts remain readable and verifiable."
  - "Adaptive writer is blocked on source/installed minor mismatch."
migration_or_backfill_steps:
  - "No mandatory rewrite of historical notes; new writer emits the adaptive shape."
rollback_or_restore_steps:
  - "Recover or roll back any open approval transaction journal before downgrade."
  - "Disable adaptive writer and restore fixed-shape routing/individual approvals."
  - "Reinstall the previous immutable package while retaining dual-read and all historical receipts."
```

## SDD Traceability
```yaml
requirement_refs: ["BR-AG-001", "BR-AG-002", "BR-AG-003", "BR-AG-004", "BR-AG-005", "BR-AG-006", "REQ-AG-001", "REQ-AG-002", "REQ-AG-003", "REQ-AG-004", "REQ-AG-005", "REQ-AG-006", "REQ-AG-007", "REQ-AG-008", "REQ-AG-009", "REQ-AG-010", "REQ-AG-011"]
acceptance_refs: ["AG-01", "AG-02", "AG-03", "AG-04", "AG-05", "AG-06", "AG-07", "AG-08", "AG-09", "AG-10", "AG-11", "AG-12", "AG-13"]
task_refs: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"]
test_refs: ["golden-routing-matrix", "unsafe-downgrade", "legacy-dual-read", "atomic-bundles", "telemetry-integration", "interaction-baseline-comparison", "runtime-parity-rollback", "full-regression"]
```

## Traceability
```yaml
upstream:
  - "adaptive-governance-human-approval-ux.s05.technical-approach.md"
  - "changes/CR-008/design.md"
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
next_step: "Seal and verify the Task Plan trusted receipt; then activate and open s07 only after every required gate passes."
```

## Handoff
- First task: T0 baseline and golden fixtures.
- Blocking dependency: Developer Task Plan trusted receipt.
- Condition for step 7: `ACTIVE`, `Missing Gates: NONE`, dedicated worktree, and approved write roots.
