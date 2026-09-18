---
artifact_id: "terminal-archive-legacy-state-reconciliation.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: verified
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CR-009"
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
  - "po"
  - "ba"
  - "sa"
  - "ta"
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
artifact_shape: adaptive_v1
request_lane: product_delivery
workflow_required: true
routing_reasons:
  - "LANE_PRODUCT_DELIVERY"
escalation_reasons:
  - "HARD_PUBLIC_CONTRACT"
role_reasons:
  po:
    - "ROLE_PO_PRODUCT_OUTCOME"
  ba:
    - "ROLE_BA_REQUIREMENTS"
  sa:
    - "ROLE_SA_PUBLIC_CONTRACT_BOUNDARY"
  ta:
    - "ROLE_TA_PUBLIC_CONTRACT_RISK"
  developer:
    - "ROLE_DEVELOPER_DELIVERY"
  qc:
    - "ROLE_QC_VERIFICATION"
gate_reasons:
  spec:
    - "GATE_SPEC_PRODUCT_DELIVERY"
  contract:
    - "GATE_CONTRACT_PUBLIC_CONTRACT"
  dor:
    - "GATE_DOR_PRODUCT_DELIVERY"
  approach:
    - "GATE_APPROACH_PRODUCT_DELIVERY"
  task_plan:
    - "GATE_TASK_PLAN_PRODUCT_DELIVERY"
  dod:
    - "GATE_DOD_PRODUCT_DELIVERY"
  business_acceptance:
    - "GATE_BUSINESS_ACCEPTANCE_PRODUCT_OUTCOME"
adaptive_activation:
  source_version: "2.6.2"
  installed_versions:
    - "2.6.2"
    - "2.6.2"
  parity_passed: true
approval_gates:
  spec: "required"
  contract: "required"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
  dod: "required"
role_signoffs:
  spec: ["ba"]
  contract: ["developer"]
  dor: ["ba","qc"]
  approach: ["developer"]
  task_plan: ["developer"]
  dod: ["qc"]
  business_acceptance: ["po"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-09-17T13:55:42Z"
  dod_reviewed_by: []
  dod_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "terminal-archive-legacy-state-reconciliation.s05.technical-approach.md"
linked_artifacts:
  - "product-specs/cards/terminal-archive-legacy-state-reconciliation.md"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Developer accepted Task Plan T1-T8 and its five activation write roots on 2026-09-16. After F-TAR-S08-001, QC approved s07 re-entry and Developer approved the bounded T8a amendment. Developer then approved Option A, recorded 2026-09-17T13:55:42Z: preserve the smoke fixture's blocker, prove premature resume refuses, explicitly dispose its exact state ID with the existing fixture signer, then resume. A new trusted Task Plan receipt must match this note before T8a execution; no new write root or release authority is granted.

## Step Contract
```yaml
step: s06
goal: "Provide an ordered, testable implementation plan for AC-TAR-01..10 without reopening the approved public contract or touching live CR-008 state."
value: "Developer and QC can execute and review the defect repair by bounded batches without rediscovering write paths or safety checks."
scope_in:
  - "Plan the in-process CLI/report/authentication changes in approved Approach Option A."
  - "Plan TDD, compatibility, concurrent-writer, failure-injection, and CR-008 fixture verification."
  - "T8a amendment: align the generic authoring smoke fixture with the approved active-blocker preservation contract after F-TAR-S08-001."
scope_out:
  - "Production implementation, live Maintainer dispositions, publish/tag, or worktree cleanup."
  - "A new receipt kind, datastore, framework, or multi-agent topology."
inputs_required:
  - "Spec Card REQ-TAR-01..06 and AC-TAR-01..10."
  - "s05 Option A and Developer Approach receipt with digest_match=true."
  - "Existing work-item CLI, report writer, gate-bundle writer, materializer, validators, tests, and CR-008 parent fixture."
outputs_required:
  - "One s06 task plan with exact touch paths, dependency order, TDD checkpoints, and per-task verification."
  - "Brownfield compatibility and rollback plan, review path, and activation write roots."
done_when:
  - "Every AC maps to at least one task and a measurable check."
  - "All report writers, terminal transitions, and signature boundaries have a named task and review checkpoint."
  - "Developer has reviewed this exact note and a matching Task Plan receipt is valid."
constraints:
  hard_constraints:
    - "No active state entry may be removed by text inference or blanket array replacement."
    - "Disposition removal and history append must be one atomic report commit."
    - "Human authorization cannot be inferred from --reviewed-by alone."
    - "Published v2.6.2 artifacts and live CR-008 evidence remain untouched during CR-009 implementation."
  soft_constraints:
    - "Reuse existing Node.js CLI, report format, keypair, and test harness."
  prohibited_actions:
    - "Do not start T1 before Task Plan receipt and work-item activation open s07."
    - "Do not self-pass Spec Compliance, Code Quality, DoD, or Business Acceptance."
  compliance_checks:
    - "T1/T5/T6/T7 test ID-only selection, exact history, terminal guard, and absence of text inference."
    - "T3/T5 test signed Maintainer confirmation and atomic failure boundaries."
    - "T7/T8 compare published v2.6.2 and CR-008 evidence with the pre-change baseline."
    - "T8a changes only the smoke fixture and s07 evidence after a matching amended Task Plan receipt; it must not weaken the production blocker guard."
risks:
  - id: R-TAR-S06-01
    description: "The new disposition lock is bypassed by an existing report writer, causing lost history."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "T4 enumerates and guards the CLI, gate bundle, and materializer paths; race tests cover competing writes."
    contingency: "Do not leave s07 until each direct report writer is guarded or proven unable to overwrite an existing report."
    owner: developer
    status: OPEN
  - id: R-TAR-S06-02
    description: "A passing local fixture masks a broken original-entry or authorization contract on the CR-008 parent."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "T7 uses a copied parent fixture plus full-corpus byte comparisons; QC independently checks exact entries in s08."
    contingency: "Keep parent HOLD_OPEN and record a finding if any exact-candidate check fails."
    owner: qc
    status: OPEN
timebox:
  target_duration: "one planning and Developer review cycle; implementation batches are separately timeboxed at s07"
  deadline: ""
  escalation_rule: "Any public contract change or required path outside the approved roots returns to s04/s05 or a Task Plan amendment before code."
```

## Main Artifact
```yaml
implementation_goal: "Make archive truthful and enable one-by-one, Maintainer-authorized, atomic legacy-state disposition with exact audit history."
ba_lane:
  scope_guards:
    - "Use Spec Card AC IDs as the only requirement text; do not alter its signed s04 host."
    - "Use a copied CR-008 parent report as a fixture; live parent disposition requires a later explicit Maintainer action."
    - "No release, tag, package publication, historical evidence rewrite, or worktree cleanup is implied by a test pass."
dev_lane:
  execution_rule: "Single-agent batches in dependency order; behavior changes use red test -> minimum code -> green test."
  review_rule: "At each risky batch, record Spec Compliance first and Code Quality second in the s07 note before starting the next batch."
task_breakdown:
  - id: T1
    owner_role: developer
    name: "Fail-first contract fixtures"
    objective: "Reproduce archive-with-blockers and make the approved ID, signature, retry, and legacy-text behaviors fail before implementation."
    paths_in_scope:
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
    dependencies: []
    outputs_expected:
      - "Failing tests for AC-TAR-01..07 and a copied two-blocker CR-008 fixture; each fails for missing behavior, not harness setup."
    review_checkpoint: "Targeted Spec Compliance of the red-case matrix before production edits."
    verification_hint: "Run the three test files directly; record failing test names and errors in s07."
  - id: T2
    owner_role: developer
    name: "Read-only snapshot IDs and history schema"
    objective: "Preserve raw report entries, derive one opaque ID per collection/position/report snapshot, expose status targets, and dual-read optional history."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
    dependencies: [T1]
    outputs_expected:
      - "Status inventory for blockers and required_actions without a report write; duplicate text has distinct IDs and any report-byte change invalidates old IDs."
      - "Optional resolved_state_history[] survives normalize/load/write; raw original_entry remains available to disposition."
    review_checkpoint: "Spec Compliance on public status shape and no-text-selection boundary, then Code Quality on normalization."
    verification_hint: "Run state and CLI tests with equal-text, Unicode, changed-snapshot, and 14-report read-only fixtures."
  - id: T3
    owner_role: developer
    name: "Trusted disposition intent"
    objective: "Require a human TTY passphrase to sign structured Maintainer intent with the existing keypair; reject a role label alone or a newly generated key."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
    dependencies: [T2]
    outputs_expected:
      - "Verifiable structured signature bound to work item, operation_id, state_id, actor, reason, and original entry."
      - "Normal-mode --reviewed-by spoof and non-interactive credential attempts fail before report mutation."
    review_checkpoint: "Spec Compliance on OQ-TAR-003 authorization, then Code Quality/security review of signer and fixture boundaries."
    verification_hint: "Run trusted-approval and CLI tests for valid TTY fixture, missing key, wrong passphrase, fake reviewer, and altered signed fields."
  - id: T4
    owner_role: developer
    name: "One report mutation lock across writers"
    objective: "Protect read-modify-write on the CLI, gate-bundle, and materializer paths so none can overwrite disposition history; establish report-lock-before-bundle-lock order."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
      - "packages/workflow-bundle/scripts/materialize-work-item.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/workflow-gate-review.test.js"
      - "packages/workflow-bundle/test/materialize-work-item.test.js"
    dependencies: [T2]
    outputs_expected:
      - "Shared per-work-item lock spans snapshot read through commit; live-lock collision rejects without mutation."
      - "Materializer cannot replace an already governed report containing live/history state."
    review_checkpoint: "Spec Compliance on all writer inventory, then Code Quality review of lock lifecycle/deadlock and race evidence."
    verification_hint: "Run three writer-path test files with parallel attempts, stale/live lock cases, and a history-preservation assertion."
  - id: T5
    owner_role: developer
    name: "Atomic one-entry disposition"
    objective: "Add dispose-state to the CLI: operation-id lookup precedes stale-ID checking, one selected raw entry moves to signed history, and one staged report rename commits both changes."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
    dependencies: [T2, T3, T4]
    outputs_expected:
      - "Exactly one active removal and one exact original_entry/original_text history append with operation_id, actor, reason, UTC time, and signature."
      - "Identical retry is a no-op; conflicting reuse, stale ID, missing reason, and persistence failure leave valid pre-state or post-state."
    review_checkpoint: "Separate targeted Spec Compliance and Code Quality verdicts before terminal-transition work."
    verification_hint: "Run state/CLI tests with duplicate text, retry conflict, and injected failures before/after stage, rename, and projection refresh."
  - id: T6
    owner_role: developer
    name: "Archive guard and structured transition cleanup"
    objective: "Reject archive whenever blockers[] is non-empty and replace blanket state-array clearing with purpose/ID-aware removal or explicit refusal."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
    dependencies: [T2, T4]
    outputs_expected:
      - "Archive is guard-only; raw/typed/legacy blockers reject pre-write, and terminal transitions do not discard opaque required_actions."
      - "Resume/activate/block/verify/close/cancel preserve unrelated state or reject while it is active."
    review_checkpoint: "Separate targeted Spec Compliance and Code Quality verdicts on the state-machine diff."
    verification_hint: "Run state/CLI tests with trap words, Unicode, every affected transition, and byte-equivalent failed archive reports."
  - id: T7
    owner_role: developer
    name: "Validator, documentation, and compatibility sweep"
    objective: "Validate signed history and terminal invariant, document the additive CLI contract, and prove all tracked reports load without migration."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-work-item-protocol.js"
      - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
      - "packages/workflow-bundle/README.md"
      - "skills/orchestration/codex-workflow-chain/references/work-item-protocol.md"
      - "work-items/terminal-archive-legacy-state-reconciliation/terminal-archive-legacy-state-reconciliation.s07.implementation.md"
    dependencies: [T5, T6]
    outputs_expected:
      - "Validator rejects malformed/signature-invalid history; archive-transition tests enforce the forward guard while historically archived reports remain readable as compatibility evidence."
      - "Public CLI and history rules documented without revising signed s04/s05 or published v2.6.2 artifacts."
      - "Fresh report-corpus count and exact legacy-text comparison recorded in s07."
    review_checkpoint: "Spec Compliance on AC-TAR-01..10 and docs contract, then Code Quality on validator/no-inference logic."
    verification_hint: "Run protocol validator, validator tests, copied CR-008 parent fixture, and workflow pack audit after the reference edit."
  - id: T8
    owner_role: developer
    name: "Integration evidence and s08 handoff"
    objective: "Collect full-suite, static, compatibility, and diff-scope evidence after all batch reviews; present unresolved scan gaps to QC instead of self-declaring DoD."
    paths_in_scope:
      - "work-items/terminal-archive-legacy-state-reconciliation/terminal-archive-legacy-state-reconciliation.s07.implementation.md"
    dependencies: [T7]
    outputs_expected:
      - "s07 records red/green cycles, batch Spec Compliance then Code Quality, exact touched paths, skipped checks, and residual risk owners."
      - "The s07 handoff offers a verifiable AC-TAR-01..10 matrix; QC opens s08 separately and owns its DoD decision."
    review_checkpoint: "QC checks handoff completeness before s08; this is not DoD approval."
    verification_hint: "Run targeted and full Node tests, node --check on changed JS, wfc validate/plan/protocol, pack audit, diff/encoding checks, and no-release-artifact scope check."
  - id: T8a
    owner_role: developer
    name: "Reconcile authoring smoke after F-TAR-S08-001"
    objective: "Preserve the authoring smoke fixture's active blocker and demonstrate its safe recovery path: refusal before disposition, signed exact-ID disposition, then successful resume."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
      - "work-items/terminal-archive-legacy-state-reconciliation/terminal-archive-legacy-state-reconciliation.s07.implementation.md"
    dependencies: [T8]
    outputs_expected:
      - "Keep block --blocker and assert a premature resume fails with the active blocker and leaves the fixture report unchanged."
      - "Call status to obtain that blocker’s exact state_id; use the smoke harness's existing temporary approval root/key and fixture passphrase to sign one dispose-state with Maintainer actor, unique operation_id, and explicit reason. Do not create a live approval key or touch CR-008 state."
      - "Assert disposition leaves zero active blockers, appends exactly one resolved_state_history entry with the original blocker text and signed identity, then resume and complete the existing lifecycle."
      - "Existing exact-state disposition and active-blocker refusal tests stay passing; production transition logic is not weakened. s07 records red/green evidence and the refreshed implementation diff hash."
    review_checkpoint: "QC refreshed Spec Compliance first; Developer and QC refreshed Code Quality second on the T8a diff before s08 handoff resumes."
    verification_hint: "Confirm the existing authoring smoke red case, failed premature resume with unchanged report, signed exact-ID disposition and one-entry history, then green authoring smoke; run the 45-file unit suite, execution/planning/protocol validators, bundle/release-candidate smoke, syntax, UTF-8, pack audit, and diff-scope checks."
dependencies_global:
  - "No task starts until Task Plan trusted receipt is APPROVED/digest_match=true and work-item activate grants the listed write roots."
  - "T2 and T4 can be reviewed separately but share work-item-protocol-utils.js; execute sequentially in this agentic worktree."
  - "T5 waits for both signer and writer-lock evidence; T7 waits for atomic disposition and terminal guard reviews."
  - "T8a Option A is paused until this revised s06 note has a new Developer-sealed task_plan receipt with digest_match=true; QC's s07 re-entry approval and the earlier T8a receipt do not seal these bytes."
risk_notes:
  - "A stale s01 projection after report commit is repaired from authoritative report; QC verifies both before terminal acceptance."
  - "A new directly writing component found during T4 requires a Task Plan amendment before touching an unapproved path."
  - "The fixture's temporary approval root/key and non-interactive passphrase are test-only; no normal-mode or live Maintainer authorization is inferred from this smoke run."
verification_plan:
  - "Per-task focused tests and negative cases are owned by each task's verification_hint."
  - "Final s08 checks compare exact active/history state, authorization proof, corpus compatibility, and scope against AC-TAR-01..10."
  - "T8a proves red refusal, exact signed disposition, one-entry history, and green lifecycle in the authoring smoke, then reruns the full CI-equivalent local suite before candidate commit."
notes_for_implementation: "Keep CR-008 parent report read-only until a later explicit Maintainer disposition; use copied fixtures and preserve independent QC/PO terminal gates."
```

## Verification Plan
```yaml
levels:
  - "Unit: raw/typed state, ID derivation, signature verification, and retry conflicts."
  - "Integration: CLI status/dispose/archive, gate-bundle writer race, materializer overwrite guard, and projection repair."
  - "Corpus: every tracked protocol report loads; exact legacy text is compared before/after; CR-008 parent is exercised as a copy."
  - "Static/security: node --check, no prose-based state selection, normal-mode signer boundary, and diff-scope scan."
  - "Workflow: wfc validate/plan/protocol plus pack audit after changing the protocol reference."
skip_or_defer:
  - "No publish, tag, npm install/update, live CR-008 disposition, or branch cleanup in CR-009 s07."
  - "No container or deployment check; no deployment manifest changes are planned."
release_note: "A later release decision is separate; this plan does not authorize publication."
rollback_note: "On any failed compatibility or atomicity check, keep CR-008 HOLD_OPEN and do not run a live disposition."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - "Compatibility has dedicated T2/T7 work and a fresh corpus recount; no bulk migration is planned."
  - "T3 and T4/T5 isolate signing, lock, and atomicity risks; batch review order is Spec Compliance then Code Quality."
  - "The plan excludes release/rollout, retains a separate QC s08 decision, and assigns all HIGH risks."
  - "T8a Option A adds only the existing authoring-smoke script within the granted scripts root; the active-blocker guard remains tested in the smoke, and the public contract is unchanged."
blocking_items:
  - "The prior Task Plan receipt is bound to the infeasible pre-Option-A T8a note; Developer must seal a new receipt against these revised bytes before editing the smoke script."
owner: developer
next_action: "Developer seals the amended Task Plan receipt against this finalized s06 note in a human-controlled TTY, then confirm digest_match=true."
```

## Brownfield Delivery Plan
```yaml
activation_write_roots:
  - "packages/workflow-bundle/scripts"
  - "packages/workflow-bundle/test"
  - "packages/workflow-bundle/README.md"
  - "skills/orchestration/codex-workflow-chain/references/work-item-protocol.md"
  - "work-items/terminal-archive-legacy-state-reconciliation"
regression_checkpoints:
  - "T1 red reproduction before code; T2..T7 focused green after each behavior batch; T8 full suite."
  - "Re-run approval-bundle and materializer tests after changing the common lock."
  - "T8a Option A: authoring smoke red refusal before exact-ID signed disposition, then green resume and full local regression, followed by refreshed two-tier review."
compatibility_checkpoints:
  - "Current protocol corpus baseline is 14 reports; T7/s08 recount rather than assuming this remains 14."
  - "v2.6.2 package/tag/receipt and CR-008 evidence paths remain unchanged; compare git diff and local signatures."
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Do not migrate old reports; if an implementation check fails, retain existing runtime behavior and parent HOLD_OPEN."
  - "After a committed disposition, repair only s01 from authoritative report, never reconstruct history from prose."
```

## Traceability
```yaml
upstream:
  - "product-specs/cards/terminal-archive-legacy-state-reconciliation.md"
  - "terminal-archive-legacy-state-reconciliation.s05.technical-approach.md"
acceptance_to_tasks:
  AC-TAR-01: [T1, T6, T7, T8]
  AC-TAR-02: [T1, T2, T5, T8]
  AC-TAR-03: [T1, T3, T5, T8]
  AC-TAR-04: [T1, T2, T6, T7, T8]
  AC-TAR-05: [T1, T2, T5, T6, T7, T8]
  AC-TAR-06: [T1, T5, T8]
  AC-TAR-07: [T1, T4, T5, T8]
  AC-TAR-08: [T2, T7, T8]
  AC-TAR-09: [T1, T5, T6, T7, T8]
  AC-TAR-10: [T7, T8, T8a]
next_step: "Resume active s07 T8a only after Developer seals a new Task Plan receipt with digest_match=true; original activation and write roots remain in force."
```

## Handoff
- Current task: T8a Option A smoke-fixture reconciliation for F-TAR-S08-001; T1-T8 remain historical completed batches.
- Blocking dependency: Developer reseals this amended Task Plan in a human-controlled TTY; the existing `ACTIVE/s07` activation and five write roots remain unchanged.
- T8a approval does not approve refreshed Spec Compliance, Code Quality, QC Technical Verification/DoD, or PO Business Acceptance.
