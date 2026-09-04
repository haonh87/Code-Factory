---
artifact_id: "adaptive-governance-human-approval-ux.s07.implementation"
artifact_family: workflow-step
work_item_slug: "adaptive-governance-human-approval-ux"
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "adaptive-governance-human-approval-ux.s06.task-breakdown.md"
linked_artifacts:
  - "changes/CR-008/design.md"
  - "changes/CR-008/tasks.md"
  - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> CR-008 is ACTIVE in a dedicated enterprise worktree. B0, B1a and B1b are approved. T3/T4 now render
> applicable-only adaptive artifacts, preserve legacy/receipt-v1 reads and fail closed on runtime
> skew. T5-T7 now provide recoverable journaled approval bundles, applicability-based closeout and
> privacy-bounded telemetry. Human Developer/QC approved B2 in the required order: Spec Compliance,
> then Code Quality. T8 policy/docs/runtime/pipeline parity is implemented and verified locally on
> Node 18/22 with one exact candidate artifact. Human Developer/DevOps approved B3 in the required
> order: Spec Compliance, then Code Quality. T9 integrated verification is green locally, including a
> TDD fix for safe telemetry purge and a 20-run interaction baseline. Human Developer approved T8a;
> the candidate now declares unique version `2.6.2`, and one exact SHA-256 candidate plus immutable
> `v2.6.1` rollback asset pass the Node 18/22 Codex/Claude x global/project matrices. Release readiness
> is `READY_WITH_GUARDS`: hosted GitHub Guardrails and human s08/release gates remain pending. Human
> QC approved B4 in the required order, Spec Compliance first and Code Quality second. The s07 review
> path is complete; formal s08 Technical Verification + DoD evidence is now prepared for human QC.

## Step Contract
```yaml
step: "s07 Implement"
goal: >-
  Deliver the approved adaptive-governance policy kernel, bounded adapters, recoverable approval
  transactions and privacy-safe telemetry with complete TDD and early review evidence.
value: >-
  Reduce irrelevant workflow and human-approval ceremony without weakening hard-risk escalation,
  human authority, trusted receipts, compatibility or release controls.
scope_in:
  - "T0-T9 in the approved s06 plan"
  - "Policy kernel, current-runtime adapters, approval transaction, telemetry and release parity"
  - "Implementation evidence in this s07 note"
scope_out:
  - "AI self-approval or inferred human approval"
  - "Signer-session or passphrase caching"
  - "Database, remote policy service or remote telemetry exporter"
  - "CHANGE-005, diagram-design adapter and immutable v2.6.1 artifacts"
inputs_required:
  - "Approved and digest-matched Spec, Contract, DoR, Approach and Task Plan receipts"
  - "AG-01..AG-13 and BR/REQ deltas in CR-008"
  - "Brownfield Node/CommonJS runtime at main commit b5086f4"
outputs_required:
  - "T0 RED baseline and subsequent RED->GREEN evidence by behavior-changing batch"
  - "Focused code, tests, docs and runtime parity changes from T1-T8"
  - "Independent SPEC_COMPLIANCE then CODE_QUALITY review evidence by batch"
  - "T9 implementation-to-verify handoff with known limitations and exact verify path"
done_when:
  - "Every T0-T8 task has actual output and verification evidence"
  - "Every behavior change records a failing test for the intended reason and a passing result"
  - "Independent review has no unresolved release blocker"
  - "No spec/governance drift or unapproved scope expansion exists"
constraints:
  hard_constraints:
    - "Work only in the dedicated CR-008 worktree and approved write roots"
    - "Preserve signed s04-s06 gate-host content and trusted-receipt compatibility"
    - "Hard triggers accept zero downgrade and failed transactions leave zero partial state"
    - "Telemetry is off by default, local-only and allowlist-only"
  soft_constraints:
    - "Prefer the smallest CommonJS delta on existing runtime surfaces"
    - "Keep each batch independently reviewable"
  prohibited_actions:
    - "Edit unrelated main-worktree WIP"
    - "Write production behavior before the matching RED test"
    - "Finalize or clean the branch/worktree before s08 DoD"
  compliance_checks:
    - "Gate status and protocol ACTIVE verification"
    - "Git worktree/common-dir identity and path isolation checks"
    - "TDD evidence, independent two-tier reviews and full Guardrails-equivalent verification"
risks:
  - id: "S07-R1"
    description: "A routing adapter diverges from the pure policy decision."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "One kernel, golden matrix and adapter-parity tests."
    contingency: "Stop the batch and return to the last reviewed kernel contract."
    owner: "developer"
    status: OPEN
  - id: "S07-R2"
    description: "Approval transaction exposes partial authority or stale state."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Failure injection, journaled recovery and cross-surface reconciliation fixtures."
    contingency: "Disable bundles and retain individual commands."
    owner: "developer/qc"
    status: OPEN
  - id: "S07-R3"
    description: "Broad scope collides with unrelated WIP or release state."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Dedicated in-repo worktree, scoped artifact transfer and batch reviews."
    contingency: "Keep the worktree open and block merge until the collision is resolved."
    owner: "developer"
    status: MONITORING
timebox:
  target_duration: "One reviewed implementation batch at a time; stop after any unexpected cross-boundary failure."
  deadline: ""
  escalation_rule: "Return to s05/s06 for design or scope drift; open a spec change before changing approved semantics."
```

## Main Artifact
```yaml
recommended_design: "Pure adaptive-governance policy kernel plus existing-runtime adapters and a journaled approval transaction coordinator."
implementation_mode: FEATURE
tasks_completed:
  - "Implementation path activated with all authoring receipts valid"
  - "Dedicated CR-008 worktree created and isolated from unrelated WIP"
  - "T0 fail-first adaptive-governance baseline authored and executed RED"
  - "B0 SPEC_COMPLIANCE then CODE_QUALITY review approved by QC"
  - "T1 canonical lane, hard-trigger, role/gate and reason-code contract published in English and Vietnamese references"
  - "T2 pure policy kernel and materialize admission adapter implemented with non-delivery short-circuit"
  - "T3 applicability adapters and compact adaptive_v1 artifact/protocol shape implemented"
  - "T4 legacy/adaptive dual-read, receipt-v1 preservation and activation guards implemented"
  - "T5 journaled approval transaction implemented with preflight, lock, staging, atomic commit, rollback and crash recovery"
  - "T6 readiness/closeout bundle adapters implemented with independent receipt-v1 evidence and applicability-derived gates"
  - "T7 opt-in local telemetry implemented with absolute allowlist, per-install pseudonym, bucketed lead time and 30/90-day purge"
  - "T8 public EN/VI contract, synchronized Codex/Claude runtime, exact-candidate Guardrails flow and rollback guidance implemented"
  - "B3 SPEC_COMPLIANCE then CODE_QUALITY review approved by Developer/DevOps"
  - "T9 full unit, validators, pack audit, authoring/bundle smoke, Node 18/22 exact-candidate and exact-rollback verification executed"
  - "T9 telemetry purge ownership defect fixed RED-to-GREEN and 20 controlled adaptive interaction runs added"
  - "T8a unique-version rollover to 2.6.2 implemented with historical v2.6.1 release records preserved"
  - "T8a exact 2.6.2 candidate and immutable v2.6.1 rollback asset verified on Node 18/22 across Codex/Claude x global/project"
  - "B4 SPEC_COMPLIANCE then CODE_QUALITY review approved by QC"
  - "Formal s08 verification evidence handed off with Technical Verification and DoD decisions pending QC"
bug_repro_evidence: []
hypothesis_log:
  - assumption: "The approved adaptive policy kernel and approval transaction modules do not yet exist on the brownfield baseline."
    status: CONFIRMED
    evidence: "Both approved new module paths are absent at baseline commit b5086f4."
debug_experiments:
  - goal: "Confirm the worktree shares the canonical trusted-approval namespace."
    action: "Run Task Plan gate status and work-item status from the dedicated worktree."
    result: "Task Plan APPROVED with digest match; protocol ACTIVE."
  - goal: "Prove CR-008 behavior is absent before production edits."
    action: "Run node packages/workflow-bundle/test/workflow-adaptive-governance.test.js."
    result: "Expected RED exit 1 with 14 contract failures; syntax check passed."
  - goal: "Prove non-delivery admission stops before every delivery write."
    action: "Add materialize fixtures for short-circuit, structured hard triggers and audited human override; run before and after the adapter change."
    result: "RED with 14 assertions, then GREEN; report, scaffold and capability writes remain absent for the non-delivery fixture."
  - goal: "Remove keyword-driven false escalation."
    action: "Run a documentation request containing the word contract without a structured public_contract trigger."
    result: "RED with one false-escalation assertion, then GREEN after the adapter stopped deriving hard triggers from ambiguous raw keywords."
  - goal: "Fail closed on malformed routing input and override audit data."
    action: "Run malformed hard-trigger boolean and impossible UTC date fixtures before and after validation changes."
    result: "Each fixture failed first, then passed with explicit validation errors and zero artifact writes."
  - goal: "Remove irrelevant maintenance role/gate ceremony across adapters."
    action: "Run maintenance scaffold, report, protocol and governance fixtures before and after T3."
    result: "RED with fixed-shape roles/gates/actions, then GREEN with exactly developer/qc, task_plan/dod and no spec/dor/approach action."
  - goal: "Preserve legacy evidence and receipt v1 while enabling adaptive reads."
    action: "Run legacy/adaptive gate-host matrices plus signed/minimal v1 receipt fixtures."
    result: "Adaptive readers honor explicit applicability; legacy fixed-host requirements and receipt payloads remain unchanged; unknown receipt schema fails closed."
  - goal: "Block adaptive writes before side effects on runtime skew."
    action: "Inject matching and mismatched source/installed minor versions into scaffold and materialize adapters."
    result: "Matching 2.6.x plus parity writes adaptive_v1; 2.6/2.5 skew writes no report, workflow directory, capability state or telemetry."
  - goal: "Prove an approval bundle cannot expose partial receipt or protocol state."
    action: "Inject caught failures at every journal boundary, crash after the first visible commit and crash after verified commit; then run recovery twice."
    result: "Caught failures restore all targets and remove journal/lock; incomplete crash recovery rolls back; verified commit recovery completes; both recovery paths are idempotent."
  - goal: "Preserve human authority while reducing readiness and closeout interactions."
    action: "Run adaptive readiness, maintenance closeout and product-release closeout fixtures through the real gate CLI."
    result: "One interaction seals independent per-gate receipt-v1 files; maintenance closes with DoD only; product release retains DoD, Release and Business Acceptance reviewers."
  - goal: "Reject sensitive and free-form telemetry data at every lifecycle adapter."
    action: "Inject secret canaries through materialize request/slug, approval state and work-item blocker/note, then inspect local event files."
    result: "Only allowlisted scalar/count fields and per-install pseudonyms persist; disabled mode writes nothing; raw/aggregate expiry is 30/90 days."
  - goal: "Prevent telemetry retention cleanup from deleting unrelated JSON owned by another local tool."
    action: "Place expired valid telemetry beside an expired foreign JSON document, run purge before and after adding an ownership check."
    result: "RED deleted the foreign JSON; GREEN deletes only exact schema/event/retention allowlisted telemetry and retains the foreign file as invalid/unowned."
  - goal: "Prove the AG-12 interaction reduction threshold with the approved minimum sample size."
    action: "Run 20 controlled product-delivery fixtures through the real policy, terminal-gate and bundle-plan functions."
    result: "All 20 fail closed on hard triggers, preserve ten independent receipts and reduce median human interactions from 7 to 3 (57.14%) with 0.00% retry."
  - goal: "Confirm the candidate can be promoted under an immutable release version."
    action: "Compare the source package/candidate version with the local Git tag namespace."
    result: "BLOCKED: candidate version is 2.6.1, while tag v2.6.1 already exists at commit 23a30756fb2271b6f1604c91e5b31092fb2dec67. Publishing it would violate immutable-version promotion."
  - goal: "Resolve T9-RV-001 without mutating the published v2.6.1 release."
    action: "Verify v2.6.2 is unused locally/remotely, apply the approved structured bump, preserve historical v2.6.1 records, pack once and test the exact candidate plus downloaded rollback asset."
    result: "RESOLVED: one v2.6.2 candidate SHA-256 ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5 and the immutable v2.6.1 GitHub Release asset SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9 pass both Node 18/22 four-scenario matrices."
tdd_evidence:
  - behavior: "Adaptive lane/applicability, transaction, telemetry privacy and runtime-skew contract"
    failing_test: "workflow-adaptive-governance.test.js exits 1 with 14 expected missing-surface assertions"
    passing_test: "workflow-adaptive-governance.test.js exits 0; all policy, transaction, telemetry and runtime-skew contract assertions pass"
  - behavior: "Non-delivery short-circuit and audited materialization override"
    failing_test: "materialize-work-item.test.js exited 1 with 14 admission assertions before the adapter existed"
    passing_test: "materialize-work-item.test.js exits 0 with short-circuit, structured-trigger, override, legacy Light and telemetry fixtures passing"
  - behavior: "Ambiguous keyword does not invent a hard trigger"
    failing_test: "materialize-work-item.test.js exited 1 because plain documentation text escalated on the word contract"
    passing_test: "Plain documentation remains non-delivery; explicit public_contract=true escalates with HARD_PUBLIC_CONTRACT"
  - behavior: "Malformed trigger booleans and impossible override timestamps fail closed"
    failing_test: "Dedicated fixtures each exited 1 before strict validation"
    passing_test: "Both invalid inputs are rejected with named errors; valid true|false and UTC timestamp inputs pass"
  - behavior: "Applicable-only maintenance artifacts and actions"
    failing_test: "Scaffold/materialize fixtures failed because fixed-shape role/gate placeholders and spec/dor/approach actions remained"
    passing_test: "Maintenance adapters emit developer/qc, task_plan/dod, reason codes and only the task_plan readiness action"
  - behavior: "Trigger-based architecture roles"
    failing_test: "Public-contract scaffold omitted SA/TA and the Contract gate"
    passing_test: "Public-contract adaptive_v1 scaffold emits SA/TA, Contract and stable role/gate reasons"
  - behavior: "Legacy/adaptive dual-read and receipt-v1 preservation"
    failing_test: "Adaptive snapshot fields were dropped and the fixed finalized-gate map required irrelevant maintenance gates"
    passing_test: "Adaptive snapshots use explicit applicability; legacy snapshots retain fixed host rules; receipt v1 returns unchanged"
  - behavior: "Adaptive activation and rollback flag"
    failing_test: "Version skew did not block writes and there was no single flag restoring the legacy writer"
    passing_test: "--adaptive-writes true requires matching minor plus parity; false preserves the legacy report/writer shape"
  - behavior: "Journaled multi-receipt approval transaction"
    failing_test: "workflow-gate-review.test.js initially failed because the transaction module and atomic persistence surface were absent"
    passing_test: "Preflight, all injected failure points, two crash-recovery directions, idempotency and concurrent-lock fixtures pass"
  - behavior: "Readiness and closeout bundle applicability"
    failing_test: "work-item-protocol.test.js initially failed because bundle actions, reconciliation and terminal applicability were absent"
    passing_test: "Adaptive readiness, rejected readiness, maintenance DoD-only, product release authority and uncommitted-delivery guard fixtures pass"
  - behavior: "Privacy-bounded lifecycle telemetry"
    failing_test: "workflow-telemetry.test.js first failed with sanitizeAdaptiveTelemetryEvent missing; materialize, approval and transition adapters then failed before instrumentation"
    passing_test: "Allowlist/canary, pseudonym, disabled no-op, bucket, retention, materialize, approval, transition and wfc purge fixtures pass"
  - behavior: "Ownership-safe telemetry purge"
    failing_test: "workflow-telemetry.test.js deleted an expired foreign JSON file from the configured telemetry directory"
    passing_test: "Purge now removes only exact schema-v2 allowlisted telemetry events and preserves unsupported or foreign JSON; focused and full suites pass"
  - behavior: "AG-12 controlled interaction reduction"
    failing_test: "The prior fixture asserted a constant 7-to-3 target without exercising the approved minimum of 20 adaptive runs"
    passing_test: "Twenty real-kernel controlled runs produce median 7-to-3 interactions (57.14% reduction), zero retries and ten independent receipts per run"
safe_refactor_notes: []
code_changes:
  - "Added packages/workflow-bundle/scripts/workflow-adaptive-governance.js as the pure deterministic kernel."
  - "Integrated packages/workflow-bundle/scripts/materialize-work-item.js with request-lane admission before report, scaffold, telemetry or capability writes."
  - "Added T0 golden fixtures and T2 materialize RED/GREEN regression coverage."
  - "Added adaptive_v1 applicability rendering to scaffold, report and protocol adapters with reasoned roles/gates."
  - "Added adaptive-aware governance/gate readers while preserving legacy fixed-host semantics."
  - "Preserved trusted receipt schema v1 without rewriting and rejected unsupported receipt schemas."
  - "Added an explicit adaptive-writes activation flag and pre-write source/installed-minor plus parity guard."
  - "Added workflow-approval-transaction.js with complete preflight, per-work-item locking, same-directory staging, journaled commit, rollback and deterministic recovery."
  - "Added approve/reject ready and closeout bundle actions while preserving independent gate receipts and individual commands."
  - "Reconciled approval bundle outcomes into protocol report and s01 in the same transaction."
  - "Replaced telemetry schema v1 identifiers/free-form objects with schema v2 absolute allowlist, pseudonymization, count-only metrics and bucketed lead time."
  - "Instrumented materialize, approval bundle and work-item transitions only after the relevant primary operation succeeds."
  - "Added local retention purge through wfc telemetry purge; no remote exporter exists."
  - "Hardened telemetry purge so retention cleanup owns only exact schema/event/retention allowlisted telemetry and never deletes foreign JSON."
  - "Synchronized canonical policy, support policies and 42 skills into both Codex and Claude release runtimes with byte-level parity checks."
  - "Changed Guardrails to build one exact candidate, record its SHA-256 and reuse the same artifact across Node 18/22 jobs."
  - "Added a local self-pack exact-candidate mode with an isolated npm cache; CI uses the externally supplied candidate/digest path."
  - "Applied the approved T8a structured version rollover from the collided 2.6.1 candidate identity to unique candidate version 2.6.2."
doc_changes:
  - "Published the activation-gated adaptive contract in global policy, router, workflow backbone, adaptive-planning and role-aware references."
  - "Updated English source docs and Vietnamese supplements with natural applicability-first wording."
  - "Published the eight-lane, six-trigger, approval-bundle, telemetry and rollback contract in root/package/quickstart EN/VI docs."
  - "Removed six symmetric stale memory-bank links after local-link validation proved the targets no longer existed in baseline."
  - "Normalized this s07 implementation contract, execution controls and review evidence."
config_changes:
  - "Changed GitHub Workflow Guardrails to build one candidate artifact once, publish its SHA-256 and reuse that exact artifact across Node 18/22 verification jobs."
  - "Aligned root/package/runtime manifests, CLI help, current-candidate docs and release tests on 2.6.2 while retaining immutable v2.6.1 history and rollback metadata."
review_checkpoints:
  - "B0 T0 independent review passed in order: SPEC_COMPLIANCE then CODE_QUALITY (QC, 2026-08-29T04:03:55Z)."
  - "B1a T1/T2 independent review passed in order: SPEC_COMPLIANCE then CODE_QUALITY (Developer/QC, 2026-08-29T04:37:56Z)."
  - "B1b T3/T4 independent review passed in order: SPEC_COMPLIANCE then CODE_QUALITY (Developer/QC, 2026-08-31T10:25:45Z)."
  - "B2 T5-T7 independent review passed in order: SPEC_COMPLIANCE then CODE_QUALITY (Developer/QC, 2026-08-31T12:11:42Z)."
  - "B3 T8 independent review passed in order: SPEC_COMPLIANCE then CODE_QUALITY (Developer/DevOps, 2026-09-01T03:55:47Z)."
  - "B4 T9/T8a independent review passed in order: SPEC_COMPLIANCE then CODE_QUALITY (QC, 2026-09-02T05:58:24Z)."
outputs_actual:
  - "Dedicated worktree .claude/worktrees/cr-008-adaptive-governance"
  - "Eight-lane golden fixture and 20-repeat determinism contract"
  - "Six hard-trigger downgrade negatives plus mixed-intent fail-closed fixture"
  - "Applicable closeout, approval transaction, telemetry secret-canary, version-skew and controlled interaction fixtures"
  - "RED evidence: syntax PASS; focused test exit 1 with 14 expected failures"
  - "Eight-lane pure decision kernel with stable roles, gates, reasons, terminal-gate derivation and runtime-minor activation guard"
  - "Non-delivery materialize short-circuit with zero delivery writes and audited human override"
  - "Structured hard-trigger input; ambiguous keywords do not create false escalation; invalid booleans fail closed"
  - "Pack audit PASS after hard-rule synchronization across authority, workflow skill and backbone reference"
  - "Applicable-only adaptive_v1 scaffold/report/protocol shape with exact reason codes and zero N/A actions"
  - "Legacy/adaptive gate-host dual-read, receipt-v1 compatibility and unsupported-schema fail-closed behavior"
  - "One activation flag with matching-minor/parity guard and zero-write skew fixtures"
  - "Journaled approval transaction with complete failure matrix, crash recovery, idempotent retry and live-lock refusal"
  - "Applicability-derived readiness/closeout bundles with independent receipt v1 files and atomic protocol reconciliation"
  - "Maintenance DoD-only closeout and product DoD/Release/Business Acceptance authority preservation"
  - "Telemetry schema v2 with absolute allowlist, per-install HMAC pseudonym, role/gate/interaction/override/retry counts and lead-time buckets"
  - "Disabled-mode zero write, secret-canary rejection, local-only 30/90-day retention and wfc purge"
  - "Public EN/VI adaptive contract and rollback guidance with passing release-surface and local-link checks"
  - "Canonical/Codex/Claude policy, support-policy and 42-skill runtime parity"
  - "One exact v2.6.2 candidate digest ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5 reused successfully across Node 18.20.8 and Node 22.23.2; 44/44 unit files and Codex/Claude x global/project 4/4 on both"
  - "Twenty controlled real-kernel runs reduce median human interactions from 7 to 3 (57.14%) with 0.00% retry while preserving ten independent receipts"
  - "Exact rollback from the candidate to immutable v2.6.1 GitHub Release asset SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9 passes Node 18/22 across Codex/Claude x global/project"
  - "Guardrails build-once/upload/download/SHA-256 topology plus YAML, UTF-8 and whitespace evidence"
known_limitations:
  - "GitHub-hosted Guardrails remains a remote T9/release check even though the equivalent local Node 18/22 matrix passes."
  - "github-push MCP check has one pre-existing macOS failure caused by Windows-only D:\\workspace\\root fixtures; the mcp tree is unchanged and outside the candidate artifact."
  - "Semgrep and ESLint are unavailable in this repository/environment; node --check, full tests, secret/network surface scans and manual diff review are the recorded fallback."
follow_up_items:
  - "QC approved the prepared s08 Technical Verification and technical DoD recommendations at 2026-09-02T06:24:11Z."
notes_for_testing: "B4 independent review passed. T9 local technical evidence is green; hosted GitHub execution and the pre-existing github-push fixture gap remain recorded guards. Release readiness is READY_WITH_GUARDS, not a Release approval."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: PASS
tdd_phase: "S07_REVIEW_COMPLETE_S08_READY"
tdd_test_refs:
  - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js (GREEN)"
  - "packages/workflow-bundle/test/materialize-work-item.test.js (GREEN)"
  - "packages/workflow-bundle/test/scaffold-workflow.test.js (GREEN)"
  - "packages/workflow-bundle/test/validate-workflow-governance.test.js (GREEN)"
  - "packages/workflow-bundle/test/workflow-gate-evidence-light.test.js (GREEN)"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js (GREEN)"
  - "packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js (GREEN)"
  - "packages/workflow-bundle/test/work-item-protocol.test.js (GREEN)"
  - "packages/workflow-bundle/test/workflow-gate-review.test.js (GREEN)"
  - "packages/workflow-bundle/test/workflow-telemetry.test.js (GREEN)"
  - "packages/workflow-bundle/test/cr-aggregate-reconcile.test.js (GREEN)"
  - "packages/workflow-bundle/test/wfc.test.js (GREEN)"
  - "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js (GREEN)"
  - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js (GREEN Node 18/22 exact same digest)"
  - "packages/workflow-bundle/test/release-surface.test.js (GREEN)"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/cr-008-adaptive-governance"
  - "branch:codex/adaptive-governance-human-approval-ux"
worktree_reason: "planning_track=enterprise and the approved scope spans policy, runtime, validators, CLI, telemetry and release controls."
review_status: PASS
review_refs:
  - "adaptive-governance-human-approval-ux.s07.implementation.md#B0 Review Packet"
  - "adaptive-governance-human-approval-ux.s07.implementation.md#B1a Review Packet"
  - "adaptive-governance-human-approval-ux.s07.implementation.md#B1b Review Packet"
  - "adaptive-governance-human-approval-ux.s07.implementation.md#B2 Review Packet"
  - "adaptive-governance-human-approval-ux.s07.implementation.md#B3 Review Packet"
  - "adaptive-governance-human-approval-ux.s07.implementation.md#B4 Review Packet"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "codex/adaptive-governance-human-approval-ux -> reviewed merge to main only after s08 DoD and branch-finalization decision"
verify_path:
  - "Focused RED/GREEN tests by batch"
  - "Full workflow-bundle unit and validator suite"
  - "Pack audit, runtime parity, exact candidate smoke, security/static, UTF-8 and diff checks"
```

## Implementation Notes
```yaml
worktree_target: "CR-008 adaptive-governance implementation"
planning_track: enterprise
risk_signals:
  - "Multiple implementation sessions are expected."
  - "Policy, runtime, validation, CLI, telemetry and release boundaries are touched."
  - "Main contains unrelated untracked CHANGE-005 and diagram-adapter WIP."
  - "Merge and release risk are high."
worktree_decision: REQUIRED
decision_reason:
  - "Enterprise planning track is a mandatory worktree trigger."
  - "Isolation prevents CR-008 from absorbing unrelated main-worktree WIP."
isolation_strategy:
  branch_name: "codex/adaptive-governance-human-approval-ux"
  worktree_path: ".claude/worktrees/cr-008-adaptive-governance"
  owned_paths:
    - "policies/codex/AGENTS.global.md"
    - "skills/orchestration"
    - "packages/workflow-bundle/scripts"
    - "packages/workflow-bundle/test"
    - "packages/workflow-bundle/runtime"
    - "packages/workflow-bundle/bin/wfc.js"
    - ".github/workflows/workflow-guardrails.yml"
    - "approved CR-008 documentation paths"
  expected_duration: "T0-T9 across reviewed batches B0-B4"
execution_guards:
  - "Run every implementation/edit command from the dedicated worktree."
  - "Do not copy unrelated untracked roots from main."
  - "Keep signed s04-s06 artifacts byte-stable."
  - "Keep the branch/worktree open until s08 DoD and branch-finish decision."
skip_reason: ""
cleanup_preconditions:
  - "s08 Technical Verification and DoD passed by QC"
  - "Release and Business Acceptance passed when applicable"
  - "No open finding, stale receipt, uncommitted delivery or merge conflict"
notes_for_implementation: "Only CR-008 and its work-item artifacts were transferred from main; all other untracked WIP remains isolated."
review_target: "CR-008 implementation batches B0-B4"
review_mode: INDEPENDENT
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
review_batches:
  - batch: "B0"
    scope: ["T0 fail-first baseline"]
    trigger: "RED fixtures captured before production edits"
    reviewer_role: "qc"
  - batch: "B1a"
    scope: ["T1-T2 policy contract, pure kernel and admission adapter"]
    trigger: "Routing-owned assertions and non-delivery write-boundary tests are GREEN"
    reviewer_role: "independent developer/qc"
  - batch: "B1b"
    scope: ["T3-T4 applicability adapters and compatibility"]
    trigger: "Focused GREEN suite and cross-adapter parity evidence"
    reviewer_role: "independent developer/qc"
  - batch: "B2"
    scope: ["T5-T7 transaction, closeout and telemetry"]
    trigger: "Failure injection, recovery and privacy evidence"
    reviewer_role: "independent developer/qc"
  - batch: "B3"
    scope: ["T8 policy, docs, runtime and pipeline parity"]
    trigger: "Source/runtime/candidate parity evidence"
    reviewer_role: "independent developer/devops"
  - batch: "B4"
    scope: ["T9 integrated handoff"]
    trigger: "All acceptance evidence collected"
    reviewer_role: "qc"
required_checks:
  spec_compliance:
    - "Match AG-01..AG-13, approved scope and Option B boundaries."
    - "Reject unrecorded spec or governance drift."
  code_quality:
    - "Check deterministic APIs, failure cleanup, privacy, compatibility and maintainability."
    - "Check test readability and false-positive policy."
finding_policy:
  blocker_threshold: "Any spec drift, unsafe downgrade, partial approval state, sensitive telemetry, compatibility break or missing RED/GREEN evidence blocks the batch."
  reopen_conditions:
    - "A later batch changes an already reviewed contract or invalidates earlier evidence."
    - "Runtime parity or exact-candidate checks expose semantic drift."
handoff_to_verify:
  - "Batch review verdicts and finding closures"
  - "AG-01..AG-13 evidence map"
  - "Regression, compatibility, security/privacy and rollback evidence"
notes_for_implementation_or_verify: "Independent review must remain separate from implementation; no subagent is used unless explicitly authorized later."
```

## B0 Review Packet
```yaml
batch: "B0 / T0 fail-first baseline"
status: APPROVED
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
reviewer_role: "qc"
changed_paths:
  - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "work-items/adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s07.implementation.md"
production_paths_changed: []
evidence:
  syntax_check: "PASS"
  focused_test: "EXPECTED_RED"
  focused_test_exit: 1
  expected_failure_count: 14
  failure_reason: "Approved kernel, transaction and telemetry privacy surfaces do not exist on the baseline."
spec_coverage:
  - { refs: ["AG-01", "AG-02", "AG-03"], fixture: "Eight lanes, non-delivery/maintenance applicability and 20-repeat deterministic serialization" }
  - { refs: ["AG-04"], fixture: "Six hard triggers plus mixed-intent fail-closed downgrade negatives" }
  - { refs: ["AG-05", "AG-08"], fixture: "Reasoned entries and applicable-only maintenance/release closeout gates" }
  - { refs: ["AG-06", "AG-07", "AG-11"], fixture: "Complete bundle summary and injectable transaction/crash boundary contract" }
  - { refs: ["AG-09", "AG-13"], fixture: "Matching-minor activation and version-skew rollback controls" }
  - { refs: ["AG-10"], fixture: "Allowlist telemetry secret canary and purge surface" }
  - { refs: ["AG-12"], fixture: "Controlled 7-to-3 intake-to-ACTIVE baseline with independent receipt count preserved" }
spec_compliance_questions:
  - "Do fixtures preserve every approved AG invariant without adding self-approval or weakening authority?"
  - "Are the stable lane/hard-trigger vocabulary and applicable closeout expectations consistent with CR-008?"
  - "Does the RED result fail because behavior is absent, rather than syntax, environment or a false assertion?"
code_quality_questions:
  - "Are fixtures deterministic, readable, isolated and explicit about false-positive policy?"
  - "Is the controlled interaction baseline composition clear and separate from future real-run telemetry?"
  - "Does T0 avoid all production edits and avoid unrelated WIP?"
blocker_rule: "Any incorrect requirement mapping, invented authority, ambiguous failure reason or brittle fixture blocks T1/T2."
next_on_pass: "Record the two-tier B0 verdict, then implement the smallest T1/T2 kernel slice to turn only routing-owned assertions GREEN."
review_decisions:
  - review_type: SPEC_COMPLIANCE
    status: PASS
    reviewed_by: ["qc"]
    reviewed_at: "2026-08-29T04:03:55Z"
    decision_source: "User accepted the requested B0 Spec Compliance review with role QC."
    evidence: "The packet maps every fixture to AG-01..AG-13, changes no production path and preserves the approved Option B boundary."
    findings: []
  - review_type: CODE_QUALITY
    status: PASS
    reviewed_by: ["qc"]
    reviewed_at: "2026-08-29T04:03:55Z"
    decision_source: "User accepted the requested B0 Code Quality review with role QC after Spec Compliance."
    evidence: "Syntax passes; fixtures are deterministic, isolated and fail only on the approved missing implementation surfaces."
    findings: []
```

## B1a Review Packet
```yaml
batch: "B1a / T1-T2 adaptive contract and admission kernel"
status: APPROVED
prepared_at: "2026-08-29T04:27:12Z"
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
reviewer_roles:
  - "developer"
  - "qc"
changed_paths:
  production:
    - "packages/workflow-bundle/scripts/workflow-adaptive-governance.js"
    - "packages/workflow-bundle/scripts/materialize-work-item.js"
  tests:
    - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
    - "packages/workflow-bundle/test/materialize-work-item.test.js"
  contract_docs:
    - "policies/codex/AGENTS.global.md"
    - "skills/orchestration/workflow-governance-router/"
    - "skills/orchestration/codex-workflow-chain/SKILL.md"
    - "skills/orchestration/codex-workflow-chain/references/adaptive-planning.md"
    - "skills/orchestration/codex-workflow-chain/references/role-aware-workflow.md"
    - "skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
    - "matching *.vi.md supplements"
evidence:
  syntax: "PASS"
  materialize_regression: "PASS"
  policy_scope: "PASS; eight lanes, 20x determinism, hard escalations, terminal applicability and version guard"
  composite_status: "EXPECTED_RED; exactly 7 assertions owned by unopened T5/T7 transaction and telemetry work"
  pack_audit: "PASS after exact hard-rule heading synchronization"
  workflow_validators: "PASS: naming/governance, protocol, planning, execution, SDD and change; legacy CHANGE warnings are pre-existing"
  encoding: "PASS: fatal UTF-8 decode for 16 changed implementation/doc/test files"
  whitespace: "PASS"
  isolation: "PASS: unrelated main-worktree WIP remains unchanged"
red_green_cycles:
  - "Admission adapter: 14 RED assertions -> GREEN"
  - "Ambiguous contract keyword: 1 RED assertion -> GREEN via structured triggers"
  - "Malformed boolean: 2 RED assertions -> GREEN via strict true|false validation"
  - "Impossible override timestamp: 2 RED assertions -> GREEN via UTC round-trip validation"
spec_coverage:
  - { refs: ["AG-01", "REQ-AG-002"], evidence: "Non-delivery returns before report/scaffold/telemetry/capability writes" }
  - { refs: ["AG-02", "REQ-AG-U01"], evidence: "Maintenance excludes PO/BA/SA/TA/DevOps; SA/TA are trigger-based" }
  - { refs: ["AG-03", "REQ-AG-001", "REQ-AG-003"], evidence: "Deterministic lane/role/gate decision with stable reasons and reviewer roles" }
  - { refs: ["AG-04", "REQ-AG-004"], evidence: "Six structured hard triggers plus mixed intent fail closed; malformed booleans reject" }
  - { refs: ["AG-05", "REQ-AG-U02"], evidence: "Non-applicable roles/gates are omitted and create no action" }
  - { refs: ["AG-08"], evidence: "Maintenance and release terminal gate sets are deterministic" }
  - { refs: ["AG-09", "AG-13", "REQ-AG-010", "REQ-AG-011"], evidence: "Stable serialization and matching-minor/parity activation guard" }
spec_compliance_questions:
  - "Does the slice implement only approved T1/T2 boundaries without opening transaction, telemetry or signer behavior?"
  - "Do hard triggers reject every downgrade while avoiding keyword-only false escalation?"
  - "Does an audited non-delivery override open materialization without implying gate approval?"
  - "Do the English and Vietnamese contracts match the executable lane/trigger/role/gate vocabulary?"
code_quality_questions:
  - "Is the kernel pure, deterministic, CommonJS-compatible and independent of filesystem/prompt/signing state?"
  - "Does the adapter return before every delivery write and preserve legacy behavior when request_lane is omitted?"
  - "Are invalid booleans and invalid UTC dates rejected clearly and without partial state?"
  - "Are reason ordering, role/gate ordering, stable serialization and runtime-minor checks maintainable?"
known_non_blockers:
  - "Remote GitHub Workflow Guardrails execution remains T9/release evidence; the equivalent local Node 18/22 matrix is green."
blocker_rule: "Any spec drift, unsafe downgrade, partial authority, privacy breach, runtime mismatch or environment-specific candidate rebuild blocks T9."
next_on_pass: "Human reviews B3 SPEC_COMPLIANCE first, then CODE_QUALITY; T9 opens only after both pass."
review_decisions:
  - review_type: SPEC_COMPLIANCE
    status: PASS
    reviewed_by: ["developer", "qc"]
    reviewed_at: "2026-08-29T04:37:56Z"
    decision_source: "User accepted the requested B1a Spec Compliance review with roles Developer and QC."
    evidence: "T1/T2 stay within the approved policy-kernel/admission boundary and satisfy the mapped AG/REQ invariants without opening T3-T8 behavior."
    findings: []
  - review_type: CODE_QUALITY
    status: PASS
    reviewed_by: ["developer", "qc"]
    reviewed_at: "2026-08-29T04:37:56Z"
    decision_source: "User accepted the requested B1a Code Quality review with roles Developer and QC after Spec Compliance."
    evidence: "The kernel is deterministic and pure; admission returns before writes; structured-input, validation, regression, pack-audit and UTF-8 evidence pass."
    findings: []
```

## B1b Review Packet
```yaml
batch: "B1b / T3-T4 applicability adapters and compatibility"
status: APPROVED
prepared_at: "2026-08-29T04:55:47Z"
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
reviewer_roles:
  - "developer"
  - "qc"
changed_paths:
  production:
    - "packages/workflow-bundle/scripts/materialize-work-item.js"
    - "packages/workflow-bundle/scripts/scaffold-workflow.js"
    - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
    - "packages/workflow-bundle/scripts/validate-work-item-protocol.js"
    - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
    - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
    - "packages/workflow-bundle/scripts/workflow-governance-definitions.js"
    - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"
  tests:
    - "packages/workflow-bundle/test/materialize-work-item.test.js"
    - "packages/workflow-bundle/test/scaffold-workflow.test.js"
    - "packages/workflow-bundle/test/validate-workflow-governance.test.js"
    - "packages/workflow-bundle/test/work-item-protocol.test.js"
    - "packages/workflow-bundle/test/workflow-gate-evidence-light.test.js"
    - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
    - "packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js"
evidence:
  syntax: "PASS: node -c on all eight changed runtime scripts"
  focused_regression: "PASS: seven T3/T4 adapter, governance, gate-evidence, receipt and protocol test files"
  adapter_parity: "PASS: adaptive maintenance report/scaffold/protocol all preserve developer/qc and task_plan/dod"
  zero_action: "PASS: maintenance required_actions contains task_plan only; spec/dor/approach produce no action"
  compatibility: "PASS: legacy finalized-host behavior and pre-schema/v1 receipt reads remain valid; signed v1 payload is returned unchanged"
  activation: "PASS: explicit --adaptive-writes flag; matching 2.6.x+parity writes, 2.6/2.5 skew writes nothing, flag off keeps legacy shape"
  workflow_validation: "PASS: canonical workflow validator"
  pack_audit_mechanical: "PASS"
  utf8: "PASS: fatal iconv decode for changed T3/T4 scripts/tests"
  whitespace: "PASS: git diff --check"
red_green_cycles:
  - "Maintenance compact shape: 12 RED assertions -> GREEN"
  - "Public-contract SA/TA + Contract: 5 RED assertions -> GREEN"
  - "Adaptive gate snapshot/host selection: 4 RED assertions -> GREEN"
  - "Receipt/protocol dual-read: missing reader RED -> GREEN; legacy minimal receipt regression fixed and re-run GREEN"
  - "Version skew zero-write and legacy-writer rollback flag: RED -> GREEN"
spec_coverage:
  - { refs: ["AG-02", "AG-05", "REQ-AG-003"], evidence: "Only applicable roles/gates/reasons/signoff placeholders and readiness actions are emitted" }
  - { refs: ["AG-03", "AG-09"], evidence: "One kernel decision survives materialize, scaffold, protocol and governance adapters" }
  - { refs: ["AG-04"], evidence: "Structured public-contract escalation invokes SA/TA and Contract; invalid booleans still fail closed" }
  - { refs: ["AG-07", "REQ-AG-007"], evidence: "Legacy fixed-shape gate hosts and trusted receipt schema v1 remain readable without rewrite" }
  - { refs: ["AG-08"], evidence: "Maintenance exposes DoD as its only terminal gate and no unrelated closeout placeholder" }
  - { refs: ["AG-13", "REQ-AG-010", "REQ-AG-011"], evidence: "Adaptive writes require explicit activation, matching minor and parity; rollback retains legacy writer + dual-read" }
spec_compliance_questions:
  - "Does adaptive_v1 remove only non-applicable ceremony while preserving every applicable human authority and independent receipt boundary?"
  - "Do legacy notes and receipt v1 retain their prior meaning without automatic migration or rewrite?"
  - "Does any runtime skew or parity failure stop before report, scaffold, capability and telemetry writes?"
  - "Does this batch stay inside T3/T4 without opening T5 transaction or T7 telemetry behavior?"
code_quality_questions:
  - "Are the adaptive/legacy branches explicit, deterministic and maintainable without duplicating policy decisions?"
  - "Are compact frontmatter, protocol serialization and validator errors precise enough to diagnose drift?"
  - "Does the activation flag give one clear rollback path while preventing silent adaptive downgrade?"
  - "Are receipt readers backward-compatible while unsupported schemas fail closed?"
known_non_blockers:
  - "The composite test retains exactly 7 expected failures owned by unopened T5/T7."
  - "T8 owns public schema/CLI docs, runtime sync and exact installed/candidate parity; semantic pack audit remains PARTIAL until that batch."
  - "Release-runtime tests require the runtime payload that T8 has not yet synchronized."
blocker_rule: "Any irrelevant human action, missing applicable authority, adapter divergence, legacy receipt break, unsupported-schema acceptance or partial write on skew blocks T5."
next_on_pass: "Record B1b SPEC_COMPLIANCE then CODE_QUALITY decisions; open T5 transaction work only after both pass."
review_decisions:
  - review_type: SPEC_COMPLIANCE
    status: PASS
    reviewed_by: ["developer", "qc"]
    reviewed_at: "2026-08-31T10:25:45Z"
    decision_source: "User accepted the requested B1b Spec Compliance review with roles Developer and QC."
    evidence: "Applicable-only adaptive artifacts preserve all applicable authorities and independent receipt-v1 boundaries; legacy reads, explicit activation and version-skew zero-write evidence pass without opening T5/T7 behavior."
    findings: []
  - review_type: CODE_QUALITY
    status: PASS
    reviewed_by: ["developer", "qc"]
    reviewed_at: "2026-08-31T10:25:45Z"
    decision_source: "User accepted the requested B1b Code Quality review with roles Developer and QC after Spec Compliance."
    evidence: "Adaptive and legacy branches are explicit and deterministic; focused regression, compatibility, syntax, UTF-8 and whitespace checks pass."
    findings: []
```

## B2 Review Packet
```yaml
batch: "B2 / T5-T7 approval transaction, closeout applicability and privacy telemetry"
status: APPROVED
prepared_at: "2026-08-31T11:23:19Z"
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
reviewer_roles:
  - "developer"
  - "qc"
changed_paths:
  production:
    - "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
    - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"
    - "packages/workflow-bundle/scripts/workflow-gate-review.js"
    - "packages/workflow-bundle/scripts/work-item-protocol.js"
    - "packages/workflow-bundle/scripts/materialize-work-item.js"
    - "packages/workflow-bundle/scripts/workflow-telemetry.js"
    - "packages/workflow-bundle/bin/wfc.js"
  tests:
    - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
    - "packages/workflow-bundle/test/workflow-gate-review.test.js"
    - "packages/workflow-bundle/test/work-item-protocol.test.js"
    - "packages/workflow-bundle/test/workflow-telemetry.test.js"
    - "packages/workflow-bundle/test/materialize-work-item.test.js"
    - "packages/workflow-bundle/test/cr-aggregate-reconcile.test.js"
    - "packages/workflow-bundle/test/wfc.test.js"
evidence:
  syntax: "PASS: node --check on transaction, telemetry and all changed lifecycle adapters/CLI"
  transaction_preflight: "PASS: stale digest and missing reviewer write zero receipts, state, journal or lock"
  transaction_failure_matrix: "PASS: every caught failure point restores all targets and removes transaction residue"
  crash_recovery: "PASS: incomplete first-commit crash rolls back; verified-commit crash completes; repeated recovery is NOOP"
  concurrency: "PASS: live per-work-item lock refuses a competing transaction without writes"
  receipt_authority: "PASS: every applicable gate retains its own signed receipt schema v1, reviewer and host digest"
  readiness_reconciliation: "PASS: receipts, protocol report and s01 commit together; exact retry is NOOP and does not duplicate events"
  closeout_applicability: "PASS: maintenance seals DoD only; product release seals DoD, Release and Business Acceptance with QC/DevOps/PO"
  delivery_guard: "PASS: dirty declared delivery blocks closeout bundle before transaction writes"
  telemetry_privacy: "PASS: absolute allowlist; request/slug/blocker/note/CR-id/receipt/path/credential canaries absent"
  telemetry_identity: "PASS: stable HMAC pseudonym within one install and unlinkable pseudonym across salts"
  telemetry_opt_in: "PASS: disabled emitter creates no directory, salt or event"
  telemetry_retention: "PASS: raw >30d and aggregate >90d purge; invalid JSON and salt are retained safely"
  lifecycle_adapters: "PASS: materialize, approval bundle and work-item transition events contain only allowlisted fields"
  cli: "PASS: wfc help states opt-in/local-only/30-90 retention and wfc telemetry purge executes"
  composite: "PASS: workflow-adaptive-governance.test.js has zero remaining failures"
  focused_regression: "PASS: telemetry, materialize, protocol, gate-review, trusted-receipt, CR aggregate, approval-path and wfc tests"
  whitespace: "PASS: git diff --check"
red_green_cycles:
  - "Approval coordinator absent -> RED; transaction surface and complete summary -> GREEN"
  - "Stale preflight/partial commit/failure/crash/lock fixtures RED -> GREEN with journaled coordinator"
  - "Ready/closeout bundle actions and reconciliation absent -> RED -> GREEN"
  - "Telemetry sanitizer/purge absent -> RED -> GREEN"
  - "Materialize lifecycle fields missing -> RED -> GREEN"
  - "Approval bundle telemetry missing -> RED -> GREEN"
  - "Work-item transition telemetry missing -> RED -> GREEN"
  - "wfc telemetry purge surface missing -> RED -> GREEN"
spec_coverage:
  - { refs: ["AG-06", "REQ-AG-005", "REQ-AG-006"], evidence: "One human interaction yields independent gate receipts and atomic derived-state reconciliation; preflight/failure/crash/concurrency paths expose no partial authority" }
  - { refs: ["AG-07", "REQ-AG-007"], evidence: "Individual approval commands and signed receipt schema v1 remain compatible and unchanged" }
  - { refs: ["AG-08", "REQ-AG-008", "REQ-AG-009"], evidence: "Closeout derives only applicable terminal gates while preserving configured release/business authority" }
  - { refs: ["AG-10"], evidence: "Telemetry is opt-in, local-only, allowlist-only, pseudonymous, bucketed and purgeable at 30/90 days with no remote exporter" }
  - { refs: ["AG-11"], evidence: "Disabled path writes zero telemetry; successful controlled path retains lane/role/gate/interaction/retry evidence without sensitive content" }
  - { refs: ["AG-12"], evidence: "Approval plan summary shows every gate, reviewer role, artifact digest and consequence before signing" }
  - { refs: ["AG-13", "REQ-AG-010", "REQ-AG-011"], evidence: "Adapters remain behind the already reviewed activation/parity boundary; T8 still owns synchronized runtime rollout" }
spec_compliance_questions:
  - "Does the journaled transaction preserve independent human authority and expose no partial trusted state across every failure/crash boundary?"
  - "Do readiness and closeout bundles reduce interactions without removing any applicable gate, reviewer or receipt?"
  - "Does maintenance closeout omit only non-applicable ceremony while product release retains QC, DevOps and PO authority?"
  - "Does telemetry satisfy complete opt-in, local-only allowlist, pseudonym, bucket and 30/90-day retention requirements with no remote export path?"
  - "Does B2 stay within T5-T7 and leave runtime synchronization/release activation to T8?"
code_quality_questions:
  - "Are preflight, lock, journal, same-directory staging, commit verification, rollback and recovery deterministic and maintainable?"
  - "Are duplicate retries and recovery idempotent without rewriting receipt v1 or duplicating protocol events?"
  - "Does every lifecycle adapter emit telemetry only after the primary operation succeeds, and never persist free-form or sensitive fields?"
  - "Are allowlist values bounded enough to reject canaries, and are purge failures conservative rather than deleting unreadable data?"
  - "Do optional telemetry failures avoid invalidating a durable governance transaction or protocol transition?"
known_non_blockers:
  - "T8 has not synchronized the generated release runtime or executed exact candidate/installed parity; this remains a planned Release blocker."
  - "Full all-unit and Guardrails-equivalent verification is assigned to T8/T9 and s08; B2 uses the approved focused early-review path."
blocker_rule: "Any partial receipt/protocol state, lost applicable authority, non-idempotent retry/recovery, sensitive telemetry field, disabled-mode write, remote exporter, raw duration/identifier persistence or receipt-v1 regression blocks T8."
next_on_pass: "Completed: B2 decisions recorded in order; T8 is open."
review_decisions:
  - review_type: SPEC_COMPLIANCE
    status: PASS
    reviewed_by: ["developer", "qc"]
    reviewed_at: "2026-08-31T12:11:42Z"
    decision_source: "User explicitly approved B2 Spec Compliance first with roles Developer and QC."
    evidence: "T5-T7 remain within the approved transaction, closeout-applicability and privacy-telemetry boundaries; independent authority, receipt-v1 compatibility, hard release controls and mapped AG/REQ evidence are preserved."
    findings: []
  - review_type: CODE_QUALITY
    status: PASS
    reviewed_by: ["developer", "qc"]
    reviewed_at: "2026-08-31T12:11:42Z"
    decision_source: "User explicitly approved B2 Code Quality after Spec Compliance with roles Developer and QC."
    evidence: "Failure injection, recovery, idempotency, concurrency, lifecycle integration, privacy canaries, retention, focused regression, syntax, UTF-8 and whitespace evidence pass."
    findings: []
```

## B3 Review Packet
```yaml
batch: "B3 / T8 policy, docs, runtime and pipeline parity"
status: APPROVED
prepared_at: "2026-09-01T03:45:11Z"
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
reviewer_roles:
  - "developer"
  - "devops"
verification_handoff_role: "qc"
changed_paths:
  release_pipeline:
    - ".github/workflows/workflow-guardrails.yml"
    - "package.json"
  runtime_sync:
    - "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js"
    - "packages/workflow-bundle/runtime"
  public_docs:
    - "README.md"
    - "README.vi.md"
    - "packages/workflow-bundle/README.md"
    - "packages/workflow-bundle/README.vi.md"
    - "docs/workflow-bundle-quickstart.md"
    - "docs/workflow-bundle-quickstart.vi.md"
  tests:
    - "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
    - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
    - "packages/workflow-bundle/test/release-surface.test.js"
evidence:
  tdd_guardrails_red: "PASS: exact-candidate contract failed before release-candidate-build/upload/download/digest wiring existed"
  tdd_runtime_red: "PASS: runtime parity failed before generated Codex/Claude policy, support-policy and skill payloads were synchronized"
  runtime_sync: "PASS: 42 canonical skills copied to each Codex/Claude runtime; package/source manifests and policy/support-policy bytes match"
  duplicate_authority_fix: "PASS: Claude support policies exclude canonical AGENTS.global.md by source basename instead of installed CLAUDE.md name"
  guardrails_topology: "PASS: one Node 22 build job packs once, records SHA-256, uploads one artifact, and Node 18/22 jobs download that artifact"
  exact_candidate: "PASS: one workflow-bundle-2.6.1.tgz, sha256=63a95b16f484208b6b6e6c9e0bd2e999f44574ed35b00c63b53a7db4f0513866"
  node_18: "PASS: Node 18.20.8; 44/44 unit files plus exact candidate Codex/Claude x global/project 4/4"
  node_22: "PASS: Node 22.23.2; 44/44 unit files plus the same exact candidate/digest and install matrix 4/4"
  current_runtime: "PASS: Node 26.5.0; 44/44 unit files"
  authoring_smoke: "PASS: 13/13 cases"
  bundle_smoke: "PASS: Codex/Claude source bundle smoke"
  workflow_validators: "PASS: standard, SDD, change, execution, planning and protocol validators"
  pack_audit: "PASS: 42 skill names/frontmatter, 170 flat-runtime skill references and hard-rule sync"
  docs_contract: "PASS: eight lanes, six hard triggers, trigger-based SA/TA/DevOps, applicable-only gates, bundles, telemetry and rollback in EN/VI"
  docs_quality: "PASS: all local links resolve in six public docs; stale memory-bank links removed symmetrically"
  yaml: "PASS: Guardrails workflow parses as YAML"
  syntax: "PASS: node --check on every changed JavaScript file"
  encoding: "PASS: valid UTF-8 for 46 changed text files"
  whitespace: "PASS: git diff --check"
red_green_cycles:
  - "Guardrails built no shared candidate -> RED; one build/upload/download/digest flow -> GREEN"
  - "Generated runtime missing from source checkout -> RED; canonical sync plus policy/support/skill byte parity -> GREEN"
  - "Local exact-candidate self-pack used an unhealthy global npm cache -> RED; isolated temporary cache -> GREEN"
spec_coverage:
  - { refs: ["AG-09", "REQ-AG-010"], evidence: "Legacy/adaptive readers remain compatible and the synchronized Codex/Claude payload matches the canonical source" }
  - { refs: ["AG-13", "REQ-AG-011"], evidence: "Adaptive writes remain parity-guarded; one immutable candidate passes Node 18/22 without per-environment rebuild" }
  - { refs: ["AG-01", "AG-02", "AG-04", "AG-06", "AG-08", "AG-10", "AG-12"], evidence: "Public EN/VI docs expose the implemented lane, trigger, applicable authority, bundle summary, telemetry and rollback contract" }
spec_compliance_questions:
  - "Does the public EN/VI contract match the executable eight-lane, six-trigger and applicable-authority vocabulary without weakening any human-controlled gate?"
  - "Does Guardrails promote one exact candidate and verify that same digest across Node 18/22 without an environment-specific npm pack?"
  - "Do canonical, Codex, Claude and installed-candidate policy/skill payloads remain byte/inventory compatible before adaptive writes open?"
  - "Does rollback keep dual-read, individual approvals and historical receipts while disabling only adaptive writes?"
code_quality_questions:
  - "Is candidate build/download/digest wiring deterministic, bounded and diagnosable on a clean GitHub runner?"
  - "Does runtime sync exclude the canonical authority file correctly for both AGENTS.global.md and CLAUDE.md install naming?"
  - "Do parity and release-surface tests fail clearly on missing files, version/schema drift, duplicate policy or candidate rebuild?"
  - "Are EN/VI docs natural, internally linked, UTF-8 valid and free of stale release claims?"
known_non_blockers:
  - "The GitHub-hosted Guardrails run has not executed on this unpushed worktree; its exact topology has local Node 18/22 equivalent evidence and remains a T9/release check."
  - "The exact candidate is retained only in /private/tmp for T9; no release artifact, tag or registry publication has been created."
blocker_rule: "Any contract mismatch, duplicated authority payload, runtime parity failure, Node 18/22 failure, digest mismatch, second npm pack in Guardrails or broken rollback path blocks B3 approval."
next_on_pass: "Completed: B3 decisions recorded in order; T9 integrated verification is open."
review_decisions:
  - review_type: SPEC_COMPLIANCE
    status: PASS
    reviewed_by: ["developer", "devops"]
    reviewed_at: "2026-09-01T03:55:47Z"
    decision_source: "User explicitly approved B3 Spec Compliance first with roles Developer and DevOps."
    evidence: "T8 stays within the approved policy/docs/runtime/release-pipeline boundary; public EN/VI contracts, applicable authority, rollback semantics, byte parity and one-candidate promotion evidence match AG-01..AG-13 without weakening a human-controlled gate."
    findings: []
  - review_type: CODE_QUALITY
    status: PASS
    reviewed_by: ["developer", "devops"]
    reviewed_at: "2026-09-01T03:55:47Z"
    decision_source: "User explicitly approved B3 Code Quality with roles Developer and DevOps after Spec Compliance."
    evidence: "Build-once artifact wiring, SHA-256 verification, runtime synchronization, duplicate-authority prevention, parity/release-surface tests, Node 18/22 candidate smoke, YAML, link, UTF-8 and whitespace evidence pass."
    findings: []
```

## T9 Integrated Verification
```yaml
task: "T9 / Integrated verification and release readiness"
status: READY_FOR_REVIEW
prepared_at: "2026-09-01T10:16:31Z"
owner_role: "qc"
blocker_scope: "NONE; hosted GitHub execution and human approval gates remain explicit guards, not local evidence failures."
verification:
  unit_current: "PASS: Node 26.5.0, 44/44 workflow-bundle test files"
  unit_node_18: "PASS: Node 18.20.8, 44/44 workflow-bundle test files"
  unit_node_22: "PASS: Node 22.23.2, 44/44 workflow-bundle test files"
  controlled_interactions: "PASS: 20 real-kernel runs, median 7->3 interactions (57.14% reduction), retry 0.00%, ten independent receipts preserved"
  telemetry_purge: "PASS after RED->GREEN: expired foreign JSON is retained; only exact owned schema-v2 telemetry is purgeable"
  workflow_validators: "PASS: naming 181 files; governance/planning/execution 177 notes; SDD 41; change 42; protocol 9 managed with 16 legacy skipped"
  pack_audit: "PASS: 42 skills, 170 flat-runtime references and hard-rule synchronization"
  authoring_smoke: "PASS: 13/13 cases"
  bundle_smoke: "PASS: Codex/Claude source bundle smoke"
  runtime_parity: "PASS: 42 managed skills for both Codex and Claude"
  exact_candidate: "PASS: workflow-bundle-2.6.2.tgz SHA-256 ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5; same bytes pass Node 18/22 and Codex/Claude x global/project 4/4"
  exact_rollback: "PASS: candidate -> immutable GitHub Release v2.6.1 asset SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9 on Node 18/22; adaptive runtime is removed and unmanaged markers are preserved"
  mcp_gitlab: "PASS: 6/6"
  mcp_notebooklm: "PASS: 5/5"
  mcp_session_search: "PASS: 9/9"
  mcp_github_push: "BASELINE_GAP: 1/4 fails on macOS because the unchanged test uses Windows-only D:\\workspace\\root paths; mcp diff is clean and MCP content is outside the candidate"
  syntax: "PASS: node --check for every changed or untracked JavaScript file"
  static_security: "PARTIAL: Semgrep and ESLint unavailable; secret-pattern scan, network-surface scan, full tests and manual diff review pass"
  dependencies: "NOT_APPLICABLE: workflow-bundle has zero dependencies and CR-008 changes none"
  yaml: "PASS: Guardrails workflow parses"
  local_links: "PASS: 11 public/release docs; six stale baseline memory-bank links removed symmetrically from EN/VI docs maps"
  utf8: "PASS: 76 changed/untracked text files inspected"
  whitespace: "PASS: git diff --check"
  github_hosted_guardrails: "PENDING_REMOTE: branch is not pushed; equivalent build-once Node 18/22 local matrix passes"
regression_compatibility_summary:
  verdict: PASS_WITH_KNOWN_BASELINE_GAP
  evidence:
    - "Legacy fixed-shape readers and receipt-v1 data remain readable without rewrite."
    - "Adaptive writes fail closed on source/installed minor skew and preserve zero-write behavior."
    - "Exact rollback restores published v2.6.1 across all four harness/scope combinations."
    - "The unchanged github-push MCP fixture is the only executed repository test failure."
security_privacy_summary:
  verdict: PASS_WITH_TOOLING_LIMITATION
  evidence:
    - "Telemetry remains disabled by default, local-only, allowlist-only and pseudonymous."
    - "Purge ownership validation closes the unsafe foreign-JSON deletion found during T9."
    - "No secret pattern or network-export surface was found in the changed security-sensitive modules."
release_readiness:
  verdict: READY_WITH_GUARDS
  blocker_id: "T9-RV-001"
  blocker_status: RESOLVED
  evidence: "Human-approved T8a moved the candidate to unused version 2.6.2; the exact candidate and immutable v2.6.1 rollback asset pass Node 18/22 without mutating historical release state."
  guards:
    - "B4 QC review must pass Spec Compliance before Code Quality."
    - "GitHub-hosted Guardrails must run after the branch is pushed through the authorized release path."
    - "Technical Verification, DoD and Release remain human-controlled gates; no tag, publication or global install is authorized here."
```

## T8a Task Plan Amendment
```yaml
status: APPROVED
implementation_status: COMPLETE
reason: "T9-RV-001 was discovered after B3: the reviewed candidate reuses an immutable released tag/version."
owner_role: "developer"
approved_version: "2.6.2"
reviewed_by: ["developer"]
reviewed_at: "2026-09-01T06:36:44Z"
decision_source: "User explicitly approved Task Plan amendment T8a with role Developer and selected version 2.6.2."
owned_scope:
  - "Structured package and bundle version metadata"
  - "Current-candidate EN/VI public documentation and new release note; historical v2.6.1 records stay immutable"
  - "Exact-candidate and rollback smoke expectations"
  - "Regenerated Codex/Claude runtime manifest identity"
execution_order:
  - "Verify the chosen version is unused locally and remotely before editing."
  - "Use the existing structured bump command for 2.6.2 and inspect its bounded diff."
  - "Update only current-candidate v2.6.1 claims that describe CR-008; preserve historical v2.6.1 release records."
  - "Regenerate runtime identity, build one exact 2.6.2 candidate and record its SHA-256."
  - "Rerun current/Node18/Node22 unit, exact install matrix, rollback to v2.6.1 or the approved rollback baseline, validators, pack audit, links, YAML, UTF-8 and diff checks."
review_path:
  - "Developer reviews amended Task Plan before implementation."
  - "After GREEN evidence, B4 QC reviews Spec Compliance first, then Code Quality."
verify_path:
  - "No v2.6.1 tag/artifact mutation"
  - "Exactly one 2.6.2 candidate digest across Node 18/22"
  - "Release docs and package/runtime identity agree"
  - "Rollback artifact and target are explicit, retained and digest-verified"
prohibited_actions:
  - "Delete, move or retarget v2.6.1"
  - "Publish, tag or install globally before s08 DoD and human Release approval"
implementation_evidence:
  unused_version_check: "PASS: no local or remote v2.6.2 tag/release reference existed before the bump"
  structured_bump: "PASS: root/package manifests and public CLI identity now declare 2.6.2"
  history_preservation: "PASS: published v2.6.1 tag, release note and asset were not edited or retargeted"
  runtime_sync: "PASS: Codex/Claude runtime version 2.6.2 with 42 managed skills each"
  exact_candidate: "PASS: /private/tmp/code-factory-cr008-v262-candidate.uQSlLT/workflow-bundle-2.6.2.tgz; SHA-256 ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5"
  exact_rollback: "PASS: immutable v2.6.1 GitHub Release asset; SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
  node_matrix: "PASS: Node 18.20.8 and 22.23.2 each pass 44/44 unit files, candidate 4/4 and rollback 4/4"
  current_runtime: "PASS: Node 26.5.0 passes 44/44 unit files after release metadata alignment"
  docs_and_static: "PASS: release surface, 11-doc local links, Guardrails YAML, JavaScript syntax, 76-file UTF-8 and whitespace"
next_human_action: "QC reviews B4 Spec Compliance first, then Code Quality."
```

## B4 Review Packet
```yaml
batch: "B4 / T9 integrated evidence plus T8a unique-version release candidate"
status: APPROVED
prepared_at: "2026-09-01T10:16:31Z"
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
reviewer_roles:
  - "qc"
changed_paths:
  implementation:
    - "packages/workflow-bundle/scripts"
    - "packages/workflow-bundle/bin/wfc.js"
  tests:
    - "packages/workflow-bundle/test"
  policy_and_runtime:
    - "policies/codex/AGENTS.global.md"
    - "skills/orchestration"
    - "packages/workflow-bundle/runtime"
  release_and_docs:
    - ".github/workflows/workflow-guardrails.yml"
    - "workflow-bundle.manifest.json"
    - "packages/workflow-bundle/workflow-bundle.manifest.json"
    - "packages/workflow-bundle/package.json"
    - "README.md"
    - "README.vi.md"
    - "docs"
evidence:
  acceptance_coverage: "PASS: AG-01..AG-13 map to deterministic lane/trigger/applicability, transaction, telemetry, compatibility and runtime evidence"
  controlled_interactions: "PASS: 20 real-kernel runs, median 7->3 interactions (57.14%), zero retry and ten independent receipts per run"
  tests_current: "PASS: Node 26.5.0, 44/44 workflow-bundle test files"
  tests_node_18: "PASS: Node 18.20.8, 44/44 plus exact candidate 4/4 and rollback 4/4"
  tests_node_22: "PASS: Node 22.23.2, 44/44 plus the same candidate bytes 4/4 and rollback 4/4"
  exact_candidate: "PASS: workflow-bundle-2.6.2.tgz SHA-256 ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5"
  exact_rollback: "PASS: immutable workflow-bundle-2.6.1.tgz SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
  runtime_parity: "PASS: canonical/Codex/Claude version 2.6.2 and 42-skill inventories agree"
  validators: "PASS: standard, naming, governance, SDD, change, execution, planning and protocol"
  smoke_and_audit: "PASS: authoring 13/13, source bundle smoke and workflow-pack audit"
  static_and_docs: "PASS: JavaScript syntax, Guardrails YAML, release surface, 11-doc local links, UTF-8 and whitespace"
  security_privacy: "PASS_WITH_TOOLING_LIMITATION: privacy/secret canaries, no network exporter, bounded ownership purge and manual surface scans pass; Semgrep/ESLint unavailable"
  compatibility: "PASS_WITH_KNOWN_BASELINE_GAP: legacy and receipt-v1 matrices pass; unchanged github-push MCP has one Windows-path fixture failure on macOS"
spec_compliance_questions:
  - "Does the implementation satisfy AG-01..AG-13 without adding a role, gate or human action outside applicability and hard-trigger rules?"
  - "Do approval bundles preserve one independent receipt, reviewer, digest and timestamp per applicable gate with atomic rollback/recovery?"
  - "Does telemetry remain opt-in, local-only, allowlist-only, pseudonymous and ownership-safe under purge?"
  - "Does T8a change only the release identity/current-candidate surface while preserving immutable v2.6.1 history and approved BR/REQ/AG semantics?"
  - "Does the exact v2.6.2 candidate plus v2.6.1 rollback evidence satisfy the approved single-artifact Node 18/22 path?"
code_quality_questions:
  - "Are policy decisions pure/deterministic and adapter writes fail-closed before side effects on invalid input or version skew?"
  - "Are transaction locking, staging, recovery, idempotency and telemetry ownership checks conservative under failure?"
  - "Do tests cover negative, crash, compatibility, privacy, release-version and rollback paths with clear diagnostics?"
  - "Are runtime sync and Guardrails build-once/digest handoff maintainable without a hidden per-environment rebuild?"
  - "Are public EN/VI docs natural, internally consistent, UTF-8 valid and free of stale current-candidate or broken-link claims?"
known_non_blockers:
  - "GitHub-hosted Guardrails cannot run until the worktree branch enters an authorized push path; its exact local Node 18/22 topology is green."
  - "The unchanged github-push MCP fixture has one macOS failure from a Windows-only D:\\ path; MCP content is outside the candidate."
  - "Semgrep and ESLint are unavailable; full tests, syntax, privacy canaries, secret/network scans and manual diff review are the fallback evidence."
blocker_rule: "Any spec/governance drift, lost human authority, partial transaction state, privacy leak, version/digest mismatch, environment-specific candidate rebuild or unsafe rollback blocks B4."
next_on_pass: "After both B4 decisions pass in order, open s08 authoring and propose Technical Verification plus DoD evidence for QC; do not self-approve either gate."
review_decisions:
  - review_type: SPEC_COMPLIANCE
    status: PASS
    reviewed_by: ["qc"]
    reviewed_at: "2026-09-02T05:58:24Z"
    decision_source: "User explicitly approved B4 Spec Compliance first with role QC."
    evidence: "The implementation and T8a release-identity delta match AG-01..AG-13, the approved CR-008 boundaries and human-authority invariants; no unrecorded spec or governance drift was found."
    findings: []
  - review_type: CODE_QUALITY
    status: PASS
    reviewed_by: ["qc"]
    reviewed_at: "2026-09-02T05:58:24Z"
    decision_source: "User explicitly approved B4 Code Quality with role QC after Spec Compliance."
    evidence: "Deterministic routing, fail-closed adapters, recoverable transactions, privacy-safe telemetry, exact-candidate promotion, compatibility, rollback and full local validation evidence pass with only the documented environment/tooling limitations."
    findings: []
```

## Workflow Pack Audit
```yaml
audit_scope: "CR-008 T1-T9 policy, adapters, approval transaction, telemetry, public docs, runtime payload, Guardrails and integrated verification"
checks:
  - id: "mechanical_pack_audit"
    status: PASS
    evidence: "npm run validate:workflow:pack-audit; frontmatter, unique names, hard-rule sync, flat runtime references and workflow markers pass"
  - id: "adapter_schema_consistency"
    status: PASS
    evidence: "adaptive_v1 scaffold/report/protocol are covered by cross-adapter parity and governance validation fixtures"
  - id: "legacy_runtime_compatibility"
    status: PASS
    evidence: "Legacy fixed-host and receipt v1 fixtures pass without rewrite; adaptive flag off retains the legacy writer shape"
  - id: "public_schema_and_runtime_docs"
    status: PASS
    evidence: "EN/VI public docs and runtime payload are synchronized; release-surface, local-link, UTF-8 and Node 18/22 exact-candidate checks pass"
findings: []
overall_status: PASS
follow_up_actions:
  - "Open s08 authoring and carry B4 evidence into Technical Verification and DoD assessment."
notes: "Mechanical and semantic pack checks plus T8a exact-candidate/rollback evidence are green and B4 is human-approved. The audit does not self-approve Technical Verification, DoD or Release."
```

## Spec Change
```yaml
status: NOT_REQUIRED
detected_in_step: "s07"
current_spec_refs:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
reason: "Current T0-T9 implementation and T8a release-identity rollover follow the approved behavior without changing BR, REQ or AG semantics."
updated_artifacts: []
required_followups:
  - "None; the Developer-approved T8a amendment and QC-approved B4 review introduce no Spec delta."
```

## SDD Traceability
```yaml
requirement_refs: ["BR-AG-001", "BR-AG-002", "BR-AG-003", "BR-AG-004", "BR-AG-005", "BR-AG-006", "REQ-AG-001", "REQ-AG-002", "REQ-AG-003", "REQ-AG-004", "REQ-AG-005", "REQ-AG-006", "REQ-AG-007", "REQ-AG-008", "REQ-AG-009", "REQ-AG-010", "REQ-AG-011"]
acceptance_refs: ["AG-01", "AG-02", "AG-03", "AG-04", "AG-05", "AG-06", "AG-07", "AG-08", "AG-09", "AG-10", "AG-11", "AG-12", "AG-13"]
task_refs: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"]
test_refs: ["workflow-adaptive-governance", "golden-routing-matrix", "unsafe-downgrade", "atomic-bundle", "telemetry-privacy", "runtime-version-skew"]
```

## Traceability
```yaml
upstream:
  - "adaptive-governance-human-approval-ux.s06.task-breakdown.md"
  - "changes/CR-008/design.md"
next_step: "Commit the VERIFIED snapshot and run hosted Guardrails before Release review."
```

## Handoff
- Actual outputs: B0/B1a/B1b/B2/B3/B4 approvals; T1-T8 implementation; Developer-approved T8a rollover to unique version 2.6.2; T9 integrated evidence; TDD closure of unsafe telemetry purge; 20-run AG-12 evidence; exact candidate and rollback matrices.
- Known limitations: Release and Business Acceptance are not approved; GitHub-hosted Guardrails is pending; one unchanged github-push MCP fixture is Windows-path-specific.
- Notes for testing: Node 18.20.8, Node 22.23.2 and current Node 26.5.0 each pass 44/44 unit files; exact candidate digest `ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5` and immutable rollback digest `7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9` pass Node 18/22 four-scenario matrices.
- Notes for deployment: do not publish, tag or install globally before s08 DoD and human Release approval. Never retarget `v2.6.1`; candidate `v2.6.2` remains local. The branch/worktree stays open.
