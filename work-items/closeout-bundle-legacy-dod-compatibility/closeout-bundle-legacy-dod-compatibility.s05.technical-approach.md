---
artifact_id: "closeout-bundle-legacy-dod-compatibility.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: BUG
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
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
  - "devops"
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
  dod: "required"
role_signoffs:
  spec:
    - "ba"
  contract: []
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
  spec_reviewed_at: "2026-09-03T08:06:40Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-09-03T08:06:40Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-09-04T04:24:12Z"
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
  - "system-design"
  - "brainstorming"
  - "ci-cd-release"
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.s04.acceptance-criteria.md"
linked_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> The Developer approved the recommended Approach at `2026-09-04T04:24:12Z`: reuse the existing
> finalized-gate resolver as the canonical source for legacy closeout, then pass the complete gate set
> through the unchanged transaction coordinator. Add true legacy fixtures that omit the DoD key; do
> not migrate artifacts, change global defaults, or redesign receipts. The finalized artifact must now
> receive a digest-matched trusted receipt before s06 Task Plan is authored.

## Step Contract
```yaml
step: "s05 Technical Approach"
goal: >-
  Lock the smallest technical correction that makes legacy closeout gate selection agree with the
  existing finalized-step authority model while preserving all public and transaction behavior.
value: >-
  Remove the missing-DoD defect at its source without adding a new abstraction or expanding into
  signer, protocol lifecycle, adaptive routing, or unrelated approval paths.
scope_in:
  - "Legacy closeout gate derivation in workflow-gate-review.js"
  - "Reuse of the canonical legacy finalized-gate resolver"
  - "True legacy maintenance and product-release integration fixtures"
  - "Regression and release-candidate verification through existing Guardrails"
scope_out:
  - "Changes to workflow-approval-transaction.js unless failing-first evidence proves a separate defect"
  - "Changes to receipt-v1, signer, passphrase, protocol lifecycle, or adaptive_v1 gate arrays"
  - "Artifact migration or editing the parent s08 to add a DoD key"
  - "OBS-CLD-001 work-item approval atomicity"
  - "Publishing, tagging, merging, or worktree finalization"
inputs_required:
  - "Spec and DoR trusted receipts with digest_match=true"
  - "AC-CLD-01..08 and EDGE-CLD-01..06"
  - "Legacy finalized-step resolver and gate snapshot behavior"
  - "Current closeout derivation branch and adaptive-only integration fixtures"
  - "Existing transaction failure/recovery matrix"
outputs_required:
  - "Option analysis with one recommended and two rejected directions"
  - "System-design record with component, flow, failure, compatibility, rollback, and observability boundaries"
  - "Brownfield impact analysis"
  - "CI/CD candidate and rollback controls"
  - "Reviewable Developer Approach proposal"
done_when:
  - "The recommendation identifies exact production and test touchpoints"
  - "The existing authority resolver and transaction coordinator have unambiguous ownership"
  - "Failure modes, compatibility, rollback, and observability are sufficient for s06 planning"
  - "The design introduces no public interface, new service, schema, or migration"
  - "No unresolved technical decision blocks a task plan"
constraints:
  hard_constraints:
    - "Legacy DoD authority comes from the canonical finalized-step model"
    - "Adaptive_v1 and readiness bundle behavior remain unchanged"
    - "All selected gates enter the existing atomic transaction as one complete set"
    - "Receipt-v1, reviewer authority, and artifact-digest binding remain unchanged"
    - "Only one exact v2.6.2 candidate may be promoted after verification"
  soft_constraints:
    - "Minimize production lines and prefer reuse of an exported pure resolver"
    - "Keep regression fixtures close to the existing closeout integration tests"
  prohibited_actions:
    - "Hard-code a workaround in the parent artifact"
    - "Change global gate defaults and broaden behavior across unrelated readers"
    - "Introduce another transaction coordinator"
    - "Call implementation before Approach and Task Plan receipts are valid"
  compliance_checks:
    - "Option comparison explains why the smallest local-looking patch is not the most reliable source of truth"
    - "Brownfield impact names all changed paths and unchanged contracts"
    - "CI/CD design promotes one immutable candidate and guards v2.6.1 rollback"
    - "No governance exception is required"
risks:
  - id: "R-S05-001"
    description: "Calling the finalized-gate resolver with the wrong artifact shape could affect adaptive semantics."
    likelihood: LOW
    impact: HIGH
    severity: MEDIUM
    mitigation: "Keep the adaptive_v1 early-return unchanged and invoke the resolver only in the legacy branch."
    contingency: "Revert the focused selector change and retain individual terminal approvals."
    owner: "developer"
    status: MONITORING
  - id: "R-S05-002"
    description: "A synthetic fixture could still accidentally contain adaptive report behavior."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Assert the report has no artifact_shape/gates and the s08 text has no approval_gates.dod key before invoking the CLI."
    contingency: "QC rejects Spec Compliance until the fixture proves the observed legacy shape."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S05-003"
    description: "The corrected selection could be tested without proving the existing coordinator receives the complete set."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Drive the real approve-closeout-bundle CLI and assert committed receipts plus reconciled report/s01 state."
    contingency: "Keep F-AG08-001 open and add a focused end-to-end fixture before verification."
    owner: "qc"
    status: MONITORING
  - id: "R-S05-004"
    description: "Rollback to v2.6.1 could re-enable the defective bundle."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Release evidence documents and exercises individual terminal gate commands after rollback."
    contingency: "Disable closeout finalization until each individual receipt is valid and digest-matched."
    owner: "devops/qc"
    status: MONITORING
timebox:
  target_duration: "One focused option and design pass"
  deadline: "Before s06 Task Plan"
  escalation_rule: "Return to s04 only if the design needs a public contract or expands beyond the approved closeout boundary."
```

## Option Analysis
```yaml
goal: "Make legacy closeout use the same mandatory DoD authority already enforced by finalized-step validation."
ba_lane:
  business_goal: "Restore trustworthy one-interaction closeout without changing human authority or user-facing commands."
  user_scenarios:
    - "Legacy maintenance closeout seals DoD only."
    - "Legacy product closeout seals DoD, Release, and Business Acceptance."
    - "Adaptive closeout and readiness bundles behave exactly as before."
    - "A v2.6.1 rollback uses individual terminal approvals."
  business_rules:
    - "DoD is mandatory for every legacy technical closeout."
    - "Optional terminal gates remain driven by explicit applicability."
    - "One interaction does not merge or omit independent authority."
    - "Changed evidence invalidates prior terminal receipts."
  scope_notes:
    - "Restore AG-08; do not define a new product contract."
    - "OBS-CLD-001 remains a separate follow-up."
  open_questions: []
dev_lane:
  repo_constraints:
    - "Node.js/CommonJS and filesystem-backed artifacts remain the implementation baseline."
    - "getRequiredFinalizedGateKeys already exports the canonical legacy s08 DoD plus optional-gate model."
    - "workflow-approval-transaction already owns staging, commit, rollback, and crash recovery."
    - "The adaptive_v1 branch already uses the report gate array and must remain unchanged."
  technical_risks:
    - "Duplicating mandatory DoD locally could drift again from finalized-step validation."
    - "Changing getApprovalGateDefault could alter every snapshot consumer, including malformed adaptive notes."
    - "Editing legacy artifacts would hide rather than fix compatibility behavior."
  integration_points:
    - "workflow-gate-review.js -> workflow-gate-evidence-utils.js"
    - "deriveBundleGates -> buildApprovalBundlePlan -> executeApprovalTransaction"
    - "work-item-protocol.test.js real CLI fixtures"
    - "Workflow Guardrails exact candidate jobs"
  nfr_notes:
    - "Exact deterministic gate order and reviewer preservation."
    - "Zero partial visible state on transaction failure."
    - "No artifact or receipt schema migration."
  baseline_context: "Brownfield v2.6.2 branch; one selector branch conflicts with an existing canonical authority resolver."
options:
  - "Option A - Reuse finalized-gate resolver in the legacy closeout branch"
  - "Option B - Hard-code DoD into deriveBundleGates"
  - "Option C - Change upstream defaults or legacy artifacts"
option_details:
  - name: "Option A - Reuse finalized-gate resolver in the legacy closeout branch"
    summary: "Call getRequiredFinalizedGateKeys for legacy s08, filter to terminal gates, and keep adaptive/readiness branches unchanged."
    pros:
      - "One existing source of truth for mandatory DoD and optional terminal gates"
      - "Small production delta with no new abstraction"
      - "Automatically stays aligned with legacy Light/non-Light finalized-step rules"
    cons:
      - "Adds one cross-module import and requires exact artifact-shape tests"
    risks:
      - "Incorrect branch placement could affect adaptive behavior"
  - name: "Option B - Hard-code DoD into deriveBundleGates"
    summary: "Return DoD plus optional explicitly required terminal gates in the local legacy branch."
    pros:
      - "Fewest changed production lines"
      - "Easy to read locally"
    cons:
      - "Duplicates the finalized-step authority model"
      - "Can drift again when legacy host rules change"
    risks:
      - "Future validator/selector divergence"
  - name: "Option C - Change upstream defaults or legacy artifacts"
    summary: "Either make missing DoD required for every snapshot consumer or amend legacy notes so the current selector sees an explicit key."
    pros:
      - "Avoids a local closeout-selector correction"
    cons:
      - "A global default broadens behavior and could mask incomplete adaptive artifacts"
      - "Artifact amendments hide the compatibility defect and invalidate reviewed evidence"
    risks:
      - "Unexpected cross-consumer changes or a false fix that leaves other legacy items exposed"
recommended_option: "Option A - Reuse finalized-gate resolver in the legacy closeout branch"
recommendation_reason: >-
  Option A is the smallest correct change because it reuses an existing exported authority rule and
  changes only the conflicting legacy consumer. Option B is smaller only by line count but preserves
  two sources of truth; Option C either broadens behavior or substitutes an artifact workaround for a fix.
validation_plan:
  - "RED: true legacy maintenance fixture without artifact_shape, gates, or approval_gates.dod selects no gate today."
  - "RED: true legacy product fixture without DoD key seals only Release and Business Acceptance today."
  - "GREEN: the real closeout CLI returns exact canonical gate sets and receipts after the selector change."
  - "Run existing adaptive maintenance/product, readiness bundle, transaction failure/recovery, and uncommitted-delivery tests unchanged."
  - "Pack one v2.6.2 candidate and bind local/hosted evidence to its SHA-256."
notes_for_next_step: "READY for system design and s06 planning; no unresolved option decision remains."
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: "Brownfield correction inside the existing workflow-bundle"
selected_stack:
  - "Existing Node.js/CommonJS modules"
selected_runtime:
  - "Existing wfc CLI and filesystem-backed trusted approval transaction"
decision_notes:
  - "No framework, service, database, runtime, deployment topology, or public contract changes."
  - "The approach reuses two existing internal boundaries rather than creating another one."
```

## Main Artifact
```yaml
design_problem: >-
  The legacy closeout selector treats a missing approval_gates.dod key as not applicable, while the
  legacy finalized-step authority model requires DoD at s08. The incomplete selected set is then
  atomically committed, creating trustworthy receipts for an untrustworthy subset.
business_rule_trace:
  - "AC-CLD-01/CLD-01/AG-08 -> legacy maintenance selects exactly DoD"
  - "AC-CLD-02/CLD-02/AG-08 -> legacy product release selects DoD, Release, and Business Acceptance"
  - "AC-CLD-03/CLD-03/AG-11 -> complete selected set reaches receipts and every derived state"
  - "AC-CLD-04/CLD-04/AG-07 -> existing transaction failure boundaries remain atomic"
  - "AC-CLD-05/AG-09 -> adaptive, readiness, and receipt-v1 compatibility remains unchanged"
  - "AC-CLD-06/AG-11 -> retry produces no duplicate or contradictory state"
  - "AC-CLD-07/AG-13 -> one exact v2.6.2 candidate and guarded v2.6.1 rollback"
  - "AC-CLD-08/F-AG08-001 -> parent terminal evidence is repeated only after child verification"
design_options:
  - name: "Canonical finalized-gate resolver"
    summary: "Reuse the existing legacy s08 authority model in closeout derivation."
    pros: ["Single authority source", "Small delta", "No public contract change"]
    cons: ["One new import and legacy fixtures"]
    risks: ["Must stay inside the legacy branch"]
  - name: "Local DoD overlay"
    summary: "Hard-code mandatory DoD in the closeout selector."
    pros: ["Minimal line count"]
    cons: ["Duplicates authority semantics"]
    risks: ["Future drift"]
  - name: "Upstream default or artifact workaround"
    summary: "Change global missing-DoD behavior or add explicit DoD keys to current legacy notes."
    pros: ["Avoids a local selector correction"]
    cons: ["Either broadens consumer impact or ceases to be a compatibility fix"]
    risks: ["Masks invalid adaptive input or leaves other legacy items exposed"]
rejected_options:
  - name: "Local DoD overlay"
    reason: "Duplicates a canonical resolver that already expresses the correct legacy host contract."
  - name: "Upstream default or artifact workaround"
    reason: "A global default changes unrelated consumers, while artifact migration masks the reader defect and invalidates reviewed evidence."
recommended_design: >-
  In the legacy closeout branch of deriveBundleGates, call getRequiredFinalizedGateKeys for s08 using
  the loaded snapshot, sddMode, and legacy artifact shape; filter the result to CLOSEOUT_GATES and
  pass the exact ordered set to the existing preflight, bundle plan, receipt builder, and transaction
  reconciliation path without changing those components.
recommendation_reason: >-
  The resolver already owns mandatory legacy DoD and optional terminal applicability. Reusing it
  removes the conflicting interpretation with a focused import/call change, while true legacy CLI
  fixtures prove the entire selected set reaches the unchanged atomic coordinator.
component_changes:
  - component: "workflow-gate-review.js"
    change: "Import getRequiredFinalizedGateKeys and replace the legacy explicit-key filter with the canonical resolved terminal set."
    ownership: "developer"
  - component: "work-item-protocol.test.js"
    change: "Add true legacy maintenance/product helpers and real CLI regression assertions for missing DoD keys."
    ownership: "developer/qc"
  - component: "workflow-approval-transaction.js"
    change: "No production change planned; retain existing coordinator and failure/recovery suite."
    ownership: "unchanged"
  - component: "Workflow Guardrails"
    change: "No pipeline definition change planned; rerun existing exact candidate and Node 18/22 matrix."
    ownership: "devops/qc"
data_flow:
  - "Legacy report -> s08 gate snapshot -> canonical finalized-gate resolver -> terminal-gate filter"
  - "Complete ordered gate set -> existing authority/digest preflight -> one bundle summary"
  - "Approved summary -> existing receipt builds + report/s01 reconciliation operations -> existing atomic coordinator"
  - "Committed transaction -> exact gate receipts and consistent derived state"
  - "Source commit -> pack once -> candidate SHA-256 -> Node 18/22 and install/update smoke -> hosted evidence"
interface_changes:
  - "No new CLI action, option, output schema, artifact field, or receipt field."
  - "Behavioral correction: existing approve-closeout-bundle includes mandatory DoD for supported legacy hosts even when the key is absent."
failure_modes:
  - scenario: "The canonical resolver is invoked for adaptive_v1."
    impact: "Adaptive explicit applicability could be overridden."
    guardrail: "Keep the adaptive early-return unchanged and assert adaptive fixtures remain byte/behavior compatible."
  - scenario: "A legacy fixture accidentally contains artifact_shape or gates."
    impact: "The regression does not execute the defective branch."
    guardrail: "Assert those properties and the DoD host key are absent before running the CLI."
  - scenario: "The complete legacy gate set has missing reviewer or stale artifact evidence."
    impact: "Invalid authority could be sealed."
    guardrail: "Existing all-gate preflight fails before passphrase, staging, receipt, or state writes."
  - scenario: "Persistence fails or crashes after the complete set is planned."
    impact: "Partial receipts or state could become visible."
    guardrail: "Existing transaction failure matrix rolls back caught failures and recovers crashes idempotently."
  - scenario: "The same closeout is retried."
    impact: "Duplicate or stale actions could reappear."
    guardrail: "Existing receipt-match NOOP behavior plus reconciliation assertions compare normalized final state."
  - scenario: "v2.6.1 rollback restores the defective bundle."
    impact: "Mandatory DoD may again be omitted."
    guardrail: "Disable bundled closeout and require individual terminal gate receipts after rollback."
compatibility_impact:
  - "Adaptive_v1 continues to derive gates exclusively from protocolReport.report.gates."
  - "Readiness bundle keeps the historical READY_BUNDLE_GATES behavior."
  - "Legacy s08 continues to use existing role_signoffs, gate_reviews, and optional terminal applicability."
  - "Receipt schema v1, signatures, paths, and digest checks remain unchanged."
  - "No note/report migration or historical receipt rewrite is introduced."
rollback_impact:
  - "Before release, revert the focused selector and fixture changes if compatibility regression appears."
  - "After release, reinstall immutable v2.6.1 only with bundled closeout disabled."
  - "Use individual DoD, Release, and Business Acceptance commands as applicable after rollback."
  - "Retain all historical receipts; do not rewrite or delete audit evidence."
observability_hooks:
  - "CLI JSON sealed_gates exposes the exact ordered legacy gate set."
  - "Receipt status and digest_match verify one current receipt per applicable gate."
  - "Protocol report and s01 audit event/required_actions expose reconciliation outcome."
  - "Unit output names legacy maintenance/product regression cases and transaction boundaries."
  - "Hosted Guardrails identifies source commit, one candidate artifact, SHA-256, and Node 18/22 results."
constraints_applied:
  - "Smallest correct brownfield delta"
  - "TDD for the behavior correction"
  - "Spec compliance before code quality review"
  - "No human-controlled gate self-approval"
  - "No release, merge, tag, or cleanup before Technical Verification and DoD"
validation_plan:
  - "Add failing legacy maintenance and product closeout fixtures first and prove the current omission."
  - "Make the minimum selector change using the canonical resolver and rerun the focused tests."
  - "Run existing workflow-gate-review transaction failure/recovery tests unchanged."
  - "Run the full workflow-bundle unit/regression, validators, pack audit, and authoring smoke suites."
  - "Build one v2.6.2 tarball; run source and exact-candidate install/update/rollback smoke on Node 18/22."
  - "Require hosted Workflow Guardrails success and record the full candidate SHA-256 before terminal approval."
specialized_followups:
  - skill: "ci-cd-release"
    reason: "Exact candidate promotion and guarded rollback are release-critical."
notes_for_next_step: >-
  s06 should create a failing-first legacy fixture task, a minimal selector task, focused/full verify
  tasks, two-tier review, exact-candidate evidence, and parent CR-008 re-verification sequencing.
```

## Architecture Details
```yaml
pipeline_scope: "Existing Workflow Guardrails and exact workflow-bundle v2.6.2 candidate promotion; no pipeline code change planned."
source_strategy:
  branch_model: "Current isolated CR-008 worktree/branch -> pull request -> main -> immutable v2.6.2 tag after all gates"
  triggers:
    - "Focused local TDD during s07"
    - "Pull-request Workflow Guardrails"
    - "Exact candidate build and matrix smoke"
build_and_verify:
  stages:
    - "Focused legacy closeout RED/GREEN tests"
    - "Workflow-bundle unit and regression suite"
    - "Workflow naming/governance/planning/protocol validators and pack audit"
    - "Authoring and bundle smoke"
    - "Pack one v2.6.2 tarball and calculate SHA-256"
    - "Exact candidate install/update smoke on Node 18 and 22"
  cache_strategy:
    - "Use standard npm cache only; never cache trusted approval material."
  required_checks:
    - "All Workflow Guardrails jobs pass with no skipped required job"
    - "UTF-8 and diff checks"
    - "Security/static/performance heuristic scan"
    - "Guarded v2.6.1 rollback smoke"
artifact_flow:
  registry: "GitHub Actions artifact followed by the existing GitHub release path"
  artifact_types:
    - "workflow-bundle-2.6.2.tgz"
    - "SHA-256 digest"
    - "source commit and hosted run identity"
    - "verification and rollback evidence"
  tagging_strategy:
    - "Use immutable semantic tag v2.6.2 only after terminal approvals"
    - "Never use latest or a shortened SHA as the authority source"
  provenance_controls:
    - "Build the candidate once and promote the same tarball"
    - "Bind every local, matrix, and hosted result to the full candidate SHA-256"
    - "Reject any rebuild or digest mismatch after review"
promotion_flow:
  - from: local
    to: dev
    conditions:
      - "Focused and full source checks pass"
      - "s07 Spec Compliance then Code Quality review passes"
    automation_level: "Automatic on pull request"
  - from: dev
    to: uat
    conditions:
      - "All Guardrails pre-candidate jobs pass"
      - "One candidate tarball and digest are produced"
    automation_level: "Automated artifact build and controlled verification"
  - from: uat
    to: prod
    conditions:
      - "Exact artifact Node 18/22 smoke passes"
      - "QC Technical Verification and DoD pass"
      - "DevOps/QC Release and PO Business Acceptance pass"
      - "Parent F-AG08-001 is closed by corrected-candidate evidence"
    automation_level: "Human-controlled promotion"
approval_controls:
  - "Developer approves Approach and Task Plan before activation."
  - "QC approves Technical Verification and DoD."
  - "DevOps and QC approve Release; PO approves Business Acceptance."
  - "Every trusted receipt must digest-match its unchanged host artifact."
release_controls:
  pre_release:
    - "No open Spec/Approach/Task Plan drift or governance exception"
    - "No stale terminal receipt accepted"
    - "Full candidate SHA-256 and hosted run identity recorded"
    - "v2.6.1 rollback guard verified"
  post_release:
    - "Install/update smoke from the published immutable asset"
    - "Legacy maintenance and product closeout canary"
    - "No contradictory pending action or missing DoD receipt"
rollback_controls:
  - "Use only immutable v2.6.1 as the known-good runtime artifact."
  - "Disable approve-closeout-bundle after rollback."
  - "Use individual applicable terminal gate commands and verify every digest."
  - "Stop rollback finalization if DoD evidence is missing or stale."
pipeline_risks:
  - "A rebuilt candidate after UAT breaks provenance."
  - "A v2.6.1 rollback without the bundle-disable guard reintroduces F-AG08-001."
  - "A green adaptive fixture can conceal missing legacy coverage."
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: >-
  Reuse the current workflow unchanged; promotion remains blocked until the exact candidate,
  guarded rollback, QC DoD, Release, Business Acceptance, and parent finding evidence are complete.
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - path: "packages/workflow-bundle/scripts/workflow-gate-review.js"
    impact: "One legacy closeout gate-derivation branch; adaptive and readiness branches remain unchanged."
  - path: "packages/workflow-bundle/test/work-item-protocol.test.js"
    impact: "Add true legacy missing-DoD integration fixtures and exact receipt/state assertions."
  - path: "work-items/closeout-bundle-legacy-dod-compatibility/*.md"
    impact: "Traceability and verification evidence only."
compatibility_risks:
  - "The wrong artifact-shape branch could change adaptive explicit applicability."
  - "Changing gate order could alter summaries or reconciliation assertions."
  - "A legacy helper that still carries adaptive fields would produce false green evidence."
migration_notes:
  - "No artifact, receipt, config, database, or state migration."
  - "No bulk rewrite or re-signing of historical data."
rollback_notes:
  - "Revert the focused selector/test delta before publication if regression appears."
  - "If runtime rollback uses v2.6.1, disable bundle closeout and use individual terminal approvals."
  - "Historical receipt files remain immutable audit records."
```

## Governance Exceptions
```yaml
status: NOT_REQUIRED
reason: "The recommended design restores the approved contract and does not weaken any strict-profile guard."
exceptions: []
```

## Spec Change
```yaml
status: NOT_REQUIRED
detected_in_step: "s05"
current_spec_refs:
  - "closeout-bundle-legacy-dod-compatibility.s04.acceptance-criteria.md"
reason: "The approach implements AC-CLD-01..08 without changing their semantics or scope."
updated_artifacts: []
required_followups: []
```

## Audit
```yaml
step: "s05 Technical Approach"
status: PASS
checks:
  - criterion: "The recommendation identifies exact production and test touchpoints"
    result: PASS
    evidence: "Component changes and Brownfield Impact name workflow-gate-review.js and work-item-protocol.test.js."
  - criterion: "Authority and transaction ownership are unambiguous"
    result: PASS
    evidence: "The finalized-gate resolver owns legacy authority; the existing transaction coordinator owns persistence."
  - criterion: "Failure, compatibility, rollback, and observability are plan-ready"
    result: PASS
    evidence: "Main Artifact and CI/CD sections cover branch isolation, failure guards, candidate provenance, and rollback."
  - criterion: "No unnecessary boundary is introduced"
    result: PASS
    evidence: "No new module, interface, schema, service, migration, signer, or coordinator is proposed."
  - criterion: "No unresolved decision blocks s06"
    result: PASS
    evidence: "Option A is recommended with two rejected alternatives and a complete validation plan."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one focused option and design pass."
gaps:
  - "The digest-matched trusted Approach receipt is pending."
risk_level: HIGH
next_action: "Seal and verify the Developer-approved Approach receipt before authoring the final s06 Task Plan."
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-AG-007", "REQ-AG-008", "REQ-AG-009"]
acceptance_refs: ["AC-CLD-01", "AC-CLD-02", "AC-CLD-03", "AC-CLD-04", "AC-CLD-05", "AC-CLD-06", "AC-CLD-07", "AC-CLD-08"]
task_refs: []
test_refs:
  - "legacy-maintenance-closeout"
  - "legacy-product-release-closeout"
  - "workflow-gate-review-transaction-matrix"
  - "adaptive-readiness-regression"
  - "exact-candidate-node-18-22"
```

## Traceability
```yaml
upstream:
  - "closeout-bundle-legacy-dod-compatibility.s04.acceptance-criteria.md"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
outputs:
  - "Recommended Option A"
  - "Focused component/data/failure/compatibility/rollback design"
  - "CI/CD release design READY_WITH_GUARDS"
  - "Brownfield impact analysis"
next_step: "s06 Task Plan after the Developer-approved Approach receives a digest-matched trusted receipt"
```

## Handoff
- Recommended option: reuse the canonical finalized-gate resolver only in the legacy closeout branch.
- Accepted trade-off: one cross-module import is preferable to another duplicated mandatory-DoD rule.
- Current human review: Developer approved Approach at `2026-09-04T04:24:12Z`.
- Condition for step 6: seal and verify the digest-matched Approach receipt; implementation remains closed.
- Release note: reuse existing Guardrails, build one immutable v2.6.2 candidate, and guard v2.6.1 rollback by disabling bundled closeout.
