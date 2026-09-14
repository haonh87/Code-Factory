---
artifact_id: "closeout-bundle-repeat-cycle-reconciliation.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-repeat-cycle-reconciliation"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: final
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "changes/CR-008/spec-delta/srs.delta.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["ba", "developer", "qc", "devops", "po"]
review_mode: independent
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
  spec: ["ba"]
  contract: ["developer"]
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-09-14T13:33:15Z"
  contract_reviewed_by: ["developer"]
  contract_reviewed_at: "2026-09-14T13:33:15Z"
  dor_reviewed_by: ["qc","ba"]
  dor_reviewed_at: "2026-09-14T13:33:15Z"
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-09-14T13:33:15Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-09-14T13:33:15Z"
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
  - "closeout-bundle-repeat-cycle-reconciliation.s04.acceptance-criteria.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s05.technical-approach.md"
linked_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.work-item-report.json"
  - "closeout-bundle-repeat-cycle-reconciliation.s07.implementation.md"
  - "closeout-bundle-repeat-cycle-reconciliation.s08.verification.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> The amended Approach receipt is APPROVED by Developer at 2026-09-11T14:38:00.519Z and matches s05
> SHA-256 d075290f151a9596d029a79fa1cf2eab72b08a179c196d35a046d2d7a8187001.
> This amendment replaces the patch-oriented remaining T7/T8 with TS0..TS8: typed-state boundary,
> writer/selector conversion, then direct event identity and full atomic/compatibility evidence.
> RCR-SB1, RCR-SB2, and RCR-SB3 each require Spec Compliance before Code Quality.
> Human Developer approved TS0..TS8 and all 16 proposed write roots at 2026-09-12T05:44:54Z.
> The roots are approved but not granted yet. A matching trusted receipt and explicit s07 resume
> remain separate requirements; production edits and partial T7 adoption stay closed.

## Step Contract

```yaml
step: "s06 Task Plan"
goal: "Turn the approved structural Approach into a path-owned, failing-first execution plan without redesign."
value: "End the prose-state defect class with complete compatibility and exact-candidate evidence."
scope_in:
  - "Approved typed entry vocabulary, opaque deterministic IDs, bounded legacy import, and exact selectors"
  - "All new report blocker/action producers and core state assertions"
  - "Direct identity on new readiness/closeout approval-transaction events"
  - "Structured report/s01 parity, 13-report no-migration compatibility, and failure/recovery"
  - "Three independent two-tier review checkpoints"
  - "One corrected v2.6.2 candidate and child-to-parent verification handoff"
scope_out:
  - "Public CLI, receipt-v1, signer, reviewer authority, runtime, or deployment changes"
  - "Unknown legacy semantic guessing or bulk/in-place migration"
  - "Validator parallelisation or architecture skill restructure"
  - "Node24 implementation inside an RCR structural commit"
  - "Publish, tag, merge, install, cleanup, or branch/worktree finalization"
inputs_required:
  - "Amended s04 SHA-256 26b85c2d4ff64f218486352e4e8e770fe7bfe71a538d8366a308b56d1e9aaf87 and three matching receipts"
  - "Amended s05 SHA-256 d075290f151a9596d029a79fa1cf2eab72b08a179c196d35a046d2d7a8187001 and matching Developer receipt"
  - "AC-RCR-01..10, EDGE-RCR-01..06, and approved B/A/B structural questions"
outputs_required:
  - "TS0..TS8 with exact paths, dependencies, RED/GREEN, review, and verify commands"
  - "Explicit 16-root scope amendment and WIP disposition"
done_when:
  - "Every AC/edge class maps to executable work and evidence"
  - "Every production behavior change is gated by its expected RED"
  - "No unknown legacy state or historical event is silently cleared or backfilled"
  - "Every risky batch stops for ordered human review"
  - "Source ownership and parent release ordering are explicit"
constraints:
  hard_constraints:
    - "Unknown input is preserved as {kind: legacy, text: exact_original}; never semantic-clear"
    - "Core transitions/assertions never inspect text or note"
    - "IDs are opaque; exact comparison is allowed, semantic parsing is prohibited"
    - "Cycle classification precedes event creation"
    - "New event.transaction_id equals journal/result identity"
    - "2026-09-18 is a stop-and-reassess checkpoint; AC-RCR-06/08 remain in scope until reassessed"
  prohibited_actions:
    - "Use old s06 receipts to resume implementation"
    - "Stage current partial T7 test before its TS7 replacement task opens"
    - "Grant proposed new roots before approved Task Plan and trusted receipt"
    - "Introduce another model module, schema version, dependency, or prose classifier"
```

## Input Readiness

```yaml
step: "s06 Task Plan"
status: READY
available_inputs:
  - "Developer Approach receipt APPROVED at 2026-09-11T14:38:00.519Z with digest_match=true"
  - "Current s04 Spec/Contract/DoR receipts already verified"
  - "Approved component, kind, adapter, identity, failure, compatibility, and rollback boundaries"
  - "Existing isolated CR-008 worktree and exact dirty-path inventory"
missing_inputs: []
invalid_inputs:
  - "Old s06 receipt binds pre-structural SHA-256 7fbb8b9d... and is historical only"
conflicts: []
next_action: "Developer reviews this amended Task Plan."
```

## Historical Plan Disposition

```yaml
prior_host_sha256: "7fbb8b9d55027293cd806f51edfdad6d339406718edff42b24e24eae7cb0d3d9"
prior_human_approval: "Developer 2026-09-10T08:56:19Z"
disposition:
  - "Old T0..T6 and T6a RED/GREEN/reviews remain historical evidence in git and s07."
  - "Old B1/B2 approvals apply only to their recorded sources, latest f9533c4de66fdb04e75008382b39b4fc413e3caa."
  - "Old remaining T7/T8 are superseded by TS0..TS8; their receipts do not authorize structural work."
partial_t7_wip:
  path: "packages/workflow-bundle/test/work-item-protocol.test.js"
  current_delta: "69 uncommitted lines for testTwentyCloseoutCyclesRemainDeterministic"
  rule: "Preserve untouched through planning and TS0; adopt/update only at TS7 after earlier review gates pass."
```

## Main Artifact

```yaml
implementation_goal: "Replace prose-derived state with typed entries, exact selectors, and truthful transaction identity; then re-establish child/parent evidence."
ba_lane:
  acceptance_coverage:
    - "AC-RCR-09 -> TS1/TS2 boundary; TS3/TS4 producers/selectors; TS7 13-report compatibility"
    - "AC-RCR-03/05 and EDGE-RCR-03/04 -> TS3/TS4 known legacy approval cleanup and structured parity"
    - "AC-RCR-01/02/04/10 and EDGE-RCR-01/02/05 -> TS5/TS6 cycle and direct identity"
    - "AC-RCR-06/07 and EDGE-RCR-06 -> TS7 atomicity, concurrency, legacy/adaptive/readiness/receipt regression"
    - "AC-RCR-08 -> TS8 candidate and child/parent evidence sequence"
  scope_guards:
    - "Known protocol-owned pending entries can clear; unknown/unrelated legacy entries never clear by prose resemblance."
    - "The canonical-only close fixture contains only satisfied protocol-owned actions; canary fixtures separately prove unknown entries survive."
    - "No historical event identity backfill and no load-only report rewrite."
    - "No public CLI or trusted receipt authority changes."
    - "Node24 remains a separate linked work item and token-only commit."
  human_review_points:
    - "Developer approves and seals Task Plan before explicit s07 resume."
    - "Each RCR-SB1/2/3: QC Spec Compliance, then Developer/QC Code Quality."
    - "QC controls child Technical Verification/DoD and parent exact-candidate re-verification."
    - "DevOps/QC control Release; PO controls Business Acceptance separately."
dev_lane:
  path_map:
    - { owner: "typed contract boundary", paths: ["scripts/work-item-protocol-utils.js", "scripts/validate-work-item-protocol.js", "test/work-item-protocol-state.test.js", "test/validate-work-item-protocol.test.js"] }
    - { owner: "writers and exact semantic consumers", paths: ["scripts/work-item-protocol.js", "scripts/materialize-work-item.js", "scripts/workflow-gate-evidence-utils.js", "scripts/run-workflow-authoring-smoke.js", "test/work-item-protocol.test.js", "test/materialize-work-item.test.js", "test/workflow-gate-evidence-utils.test.js"] }
    - { owner: "transaction event identity", paths: ["scripts/workflow-gate-review.js", "scripts/workflow-approval-transaction.js", "scripts/work-item-protocol-utils.js", "test/workflow-gate-review.test.js", "test/work-item-protocol.test.js"] }
    - { owner: "traceability", paths: ["work-items/closeout-bundle-repeat-cycle-reconciliation", "work-items/adaptive-governance-human-approval-ux"] }
  technical_sequence:
    - "TS0 -> TS1 RED -> TS2 GREEN -> RCR-SB1 reviews -> TS3 RED -> TS4 GREEN -> RCR-SB2 reviews -> TS5 RED -> TS6 GREEN -> TS7 matrix -> RCR-SB3 reviews -> TS8"
  tdd_targets:
    - "TS1: object collapse, invalid shape, duplicate ID, conditional gate, exact known/unknown adapter, structured rendering"
    - "TS3: raw new writer output, latent unknown-state deletion, text invariance, exact gate/work-item/change assertions"
    - "TS5: missing direct transaction identity, note invariance, historical event preservation, NOOP"
task_breakdown:
  - id: "TS0"
    owner_role: "developer"
    name: "Freeze structural baseline and reconcile approved ownership"
    objective: "Verify all current receipts, preserve WIP, and freeze report/event/source digests before any production edit."
    paths_in_scope:
      - "work-items/closeout-bundle-repeat-cycle-reconciliation"
      - "work-items/adaptive-governance-human-approval-ux"
      - "packages/workflow-bundle/test/work-item-protocol.test.js (read-only WIP inventory)"
    dependencies: ["Human Task Plan approval", "matching trusted receipt", "explicit resume with the 16 roots below"]
    outputs_expected:
      - "Current work-item and Spec/Contract/DoR/Approach/Task Plan receipt status and full digests"
      - "13 tracked report raw digests and ordered historical event snapshots"
      - "WIP diff digest preserved unchanged; no test lines staged"
      - "Focused pre-structural suites and source SHA recorded in s07"
    review_checkpoint: "Stop if another owner modified any proposed root or a current receipt digest mismatches."
    verification_hint: "wfc work-item/gate status; git status/diff; node test/work-item-protocol.test.js and test/workflow-gate-review.test.js."
  - id: "TS1"
    owner_role: "developer"
    name: "Write failing typed-boundary contract tests"
    objective: "Reproduce destructive object normalization and pin all valid/invalid state-entry and bounded-import rules."
    paths_in_scope:
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation"
    dependencies: ["TS0"]
    outputs_expected:
      - "Expected RED for typed object preservation and required id/kind/text validation"
      - "Duplicate ID and conditional gate rejection cases"
      - "Deterministic full SHA-256 IDs from a canonical JSON tuple; display wording is not a semantic source"
      - "Exact-value/anchored-command import matrix plus unknown strings preserving accents, Unicode, case, and whitespace exactly"
      - "Stable YAML mappings and report/s01 collection equality expectations"
    review_checkpoint: "RCR-SB1 seed: no fuzzy grammar and no automatic historical migration."
    verification_hint: "Run the new isolated state test and protocol-validator test; retain expected assertion failures, not syntax/setup failures."
  - id: "TS2"
    owner_role: "developer"
    name: "Implement the shared typed contract boundary"
    objective: "Add the approved enum, constructor, adapter, exact selectors, validation, and mapping renderer in existing utilities."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
      - "packages/workflow-bundle/scripts/validate-work-item-protocol.js"
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation"
    dependencies: ["TS1 expected RED"]
    outputs_expected:
      - "Generated entries validate and unique IDs are enforced per collection"
      - "Unknown legacy maps only to {kind: legacy, text: exact_original}"
      - "Known legacy interpretation exists only in the normalizer adapter"
      - "Renderer preserves structured state instead of [object Object]"
      - "Load-only checks do not persist adapted reports"
    review_checkpoint: "RCR-SB1 Spec Compliance must PASS before Developer/QC Code Quality; both gate TS3."
    verification_hint: "Rerun isolated state/validator tests to GREEN; node --check both scripts; git diff --check; review adapter rule table."
  - id: "TS3"
    owner_role: "developer"
    name: "Write failing producer and exact-selector tests"
    objective: "Pin typed output for every writer and prove arbitrary human wording cannot change transitions or assertions."
    paths_in_scope:
      - "packages/workflow-bundle/test/work-item-protocol.test.js (do not stage/adopt partial T7 function)"
      - "packages/workflow-bundle/test/materialize-work-item.test.js"
      - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation"
    dependencies: ["RCR-SB1 Spec Compliance PASS", "RCR-SB1 Code Quality PASS"]
    outputs_expected:
      - "Expected RED for raw new materialize/approve/reject/block/resume/cancel/bundle state entries"
      - "Latent counterexample: Peer review of the migration script is outstanding remains preserved"
      - "Unknown blocker and required-action canaries survive selected-gate closeout"
      - "At least 20 wording/Unicode/alias mutations with id/kind/gate fixed yield identical core outcomes"
      - "Gate, work-item, and change approval contradictions are tested using exact typed identity, never text"
    review_checkpoint: "RCR-SB2 seed: distinguish known imported pending state from opaque legacy canaries."
    verification_hint: "Run producer/gate-evidence suites; record assertions identifying string output or prose-dependent outcome."
  - id: "TS4"
    owner_role: "developer"
    name: "Convert all writers and semantic consumers"
    objective: "Replace new string emission and text predicates with constructors plus exact id or kind+gate selectors."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/scripts/materialize-work-item.js"
      - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
      - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/materialize-work-item.test.js"
      - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation"
    dependencies: ["TS3 expected RED"]
    outputs_expected:
      - "Every new report blocker/action uses the shared constructor"
      - "Core closeout/readiness/rejection and approval-state assertions use exact selectors"
      - "Non-gate work-item/change followups use approved non-gate kinds with deterministic purpose IDs compared exactly, not parsed"
      - "Unknown legacy and unrelated delivery blockers/actions remain intact"
      - "Canonical close command and protocol-close handoff are structured and report/s01 agree"
      - "Existing display assertions are updated to typed fields without dropping behavioral checks"
    review_checkpoint: "RCR-SB2 Spec Compliance first, then Developer/QC Code Quality; both gate TS5."
    verification_hint: "Producer/evidence suites and authoring smoke GREEN; inventory all assignments/push/unshift; static review proves no core entry.text or note semantic reads."
  - id: "TS5"
    owner_role: "developer"
    name: "Write failing direct event-identity tests"
    objective: "Require truthful fields for newly emitted readiness/closeout approval/rejection events and preserve historical event prefixes."
    paths_in_scope:
      - "packages/workflow-bundle/test/workflow-gate-review.test.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation"
    dependencies: ["RCR-SB2 Spec Compliance PASS", "RCR-SB2 Code Quality PASS"]
    outputs_expected:
      - "Expected RED: new transaction event without direct transaction_id is rejected"
      - "Direct event/journal/result equality across readiness, closeout, approve, and reject"
      - "Note mutation does not change identity, deduplication, or state"
      - "Non-transaction lifecycle events omit identity and NOOP appends no event"
      - "Two historical unbound bundle events remain exact immutable prefixes"
    review_checkpoint: "RCR-SB3 seed: legacy readability is not permission for a new unbound event."
    verification_hint: "Run event/gate-review suites; direct field assertions replace note.includes identity recovery."
  - id: "TS6"
    owner_role: "developer"
    name: "Implement first-class event identity"
    objective: "Pass one coordinator identity to every new transaction-backed protocol event and remove note/history inference."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
      - "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
      - "packages/workflow-bundle/test/workflow-gate-review.test.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation"
    dependencies: ["TS5 expected RED"]
    outputs_expected:
      - "New transaction event constructor requires validated transaction_id"
      - "Normalizer preserves direct identity; human note remains display-only"
      - "Receipt/pre-event state deltas classify cycles before ID/event allocation"
      - "Readiness/closeout approval/rejection all use the same transaction boundary"
      - "Omitted coordinator ID still preserves existing generated-ID behavior for other callers"
    review_checkpoint: "No RCR-SB3 verdict until TS7 regression and failure matrix is complete."
    verification_hint: "All focused suites GREEN; direct identity equality; two unchanged byte-digest NOOP retries; node --check changed scripts."
  - id: "TS7"
    owner_role: "developer"
    name: "Complete atomicity and no-migration regression"
    objective: "Prove the whole structural delta across all report shapes and transaction boundaries before candidate build."
    paths_in_scope:
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/workflow-gate-review.test.js"
      - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
      - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
      - "work-items/closeout-bundle-repeat-cycle-reconciliation"
    dependencies: ["TS6 GREEN"]
    outputs_expected:
      - "Partial T7 WIP adopted only now and updated to structured assertions after diff review"
      - "20 controlled repeated cycles, zero report/s01 mismatches, one event per real cycle"
      - "13/13 frozen reports load with zero raw digest changes"
      - "Every supported fail/crash/recovery point has zero partial authority/state or residue"
      - "Concurrency permits at most one commit and completed retries are NOOP"
      - "Legacy mandatory DoD, adaptive gates, readiness/rejection, signer, receipt-v1, and public CLI remain green"
    review_checkpoint: "RCR-SB3 QC Spec Compliance, then Developer/QC Code Quality; any behavior defect gets a new RED before code correction."
    verification_hint: "Focused suites, full run-all.js, authoring smoke, workflow validators, static/security/performance review, UTF-8 and diff checks."
  - id: "TS8"
    owner_role: "qc"
    name: "Bind one candidate and route child then parent verification"
    objective: "Establish exact local/hosted v2.6.2 evidence without publishing or inferring terminal gates."
    paths_in_scope:
      - "work-items/closeout-bundle-repeat-cycle-reconciliation"
      - "work-items/adaptive-governance-human-approval-ux"
      - "packages/workflow-bundle (read-only package/build input)"
      - ".github/workflows/workflow-guardrails.yml (read-only for RCR)"
    dependencies: ["TS7 PASS", "RCR-SB3 Spec Compliance PASS", "RCR-SB3 Code Quality PASS", "QC explicit s08 opening"]
    outputs_expected:
      - "One candidate built from reviewed source and full SHA-256 reused for all candidate tests"
      - "Pack, extracted-payload, local and hosted Node 18/22 results with no failed/skipped required job"
      - "Child AC-RCR-01..10 evidence with parent-bound AC-RCR-08 tracked as mandatory downstream contribution, not self-declared complete"
      - "QC child Technical Verification/DoD, then exact-candidate parent AG-01..13 at 13/13"
      - "Separate parent QC Technical Verification/DoD, DevOps/QC Release, and PO Business Acceptance"
      - "Rollback v2.6.1 SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
    review_checkpoint: "F-AG11-001 stays open until parent contribution and terminal evidence conclude; digest drift triggers rebind review."
    verification_hint: "Build once after review; validate supplied candidate checksum/payload; inspect hosted job outcomes; bind source/run/digest and gate receipts in child/parent s08."
dependencies_global:
  - "Task Plan human decision + matching receipt + explicit resume precede TS0."
  - "TS1 RED gates TS2; TS3 RED gates TS4; TS5 RED gates TS6."
  - "Each RCR-SB1/2 review pair gates the next batch; RCR-SB3 gates TS8."
  - "Child verification precedes parent exact-candidate re-verification and repeated terminal gates."
risk_notes:
  - "Unknown legacy required actions must survive too; do not replace an entire collection to erase them."
  - "Historical unbound events stay readable; newly emitted unbound events are invalid."
  - "No delegation: state boundary, writers, coordinator, and fixtures are tightly coupled."
  - "Keep node24 a standalone 18-token commit for cheap contingency cherry-pick; no parallelisation."
verification_plan:
  - "Three explicit RED/GREEN pairs and three ordered two-tier review pairs"
  - "Typed shape, producer inventory, bounded adapter, latent canary, 20 wording mutations"
  - "13-report no-migration and historical prefix checks"
  - "20 cycles, two retries, concurrency, every supported fail/crash/recovery boundary"
  - "Full affected tests, workflow validators, smoke, pack audit, package, UTF-8, static/security/performance"
  - "One candidate, child/parent hosted evidence, rollback, and independent terminal decisions"
notes_for_implementation: "Execute sequentially in the existing CR-008 worktree. Do not edit finalized s04/s05, silently expand roots, or stage partial T7 before TS7."
```

## Owned Scope Amendment

```yaml
status: HUMAN_APPROVED_NOT_GRANTED
approved_by: "developer"
approved_at: "2026-09-12T05:44:54Z"
grant_condition: "Matching Task Plan receipt and explicit s07 resume; human scope approval is recorded below"
proposed_write_roots:
  - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
  - "packages/workflow-bundle/scripts/work-item-protocol.js"
  - "packages/workflow-bundle/scripts/materialize-work-item.js"
  - "packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
  - "packages/workflow-bundle/scripts/validate-work-item-protocol.js"
  - "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
  - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
  - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
  - "packages/workflow-bundle/test/work-item-protocol.test.js"
  - "packages/workflow-bundle/test/workflow-gate-review.test.js"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
  - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
  - "packages/workflow-bundle/test/materialize-work-item.test.js"
  - "work-items/closeout-bundle-repeat-cycle-reconciliation"
  - "work-items/adaptive-governance-human-approval-ux"
new_test_registration: "run-all.js auto-discovers every test/*.test.js; no runner edit."
excluded_write_roots: [".github/workflows", "skills", "packages/workflow-bundle/runtime", "changes/CR-008"]
generated_drift_rule: "Inspect sync/prepack output; do not commit generated drift outside approved roots."
```

## Verification Plan

- Focused: run each named file with node from packages/workflow-bundle/test; all new tests are auto-discovered by run-all.js.
- Workflow: wfc validate, protocol, plan, sdd, change, exec, and fixtures with workflow-root work-items and project-root as supported.
- Complete regression: npm run validate:workflow:unit; inspect any runtime sync drift before staging.
- Pack/smoke: npm run validate:workflow:pack-audit; validate:workflow:authoring-smoke; validate:workflow:bundle-smoke.
- Candidate: release-candidate-artifact-smoke.test.js against one supplied built tarball/checksum for final identity evidence; self-pack is smoke-only, not the final candidate identity.
- Static/security/performance: node --check for changed JS, git diff --check, exact-selector/adapter review, path/lock/signing/failure-injection/secret-logging review, and repeated I/O bounds.
- Encoding: fatal UTF-8 decode of every changed text file; reject malformed bytes, not only replacement characters.

## Brownfield Delivery Plan

```yaml
regression_checkpoints: ["TS0 baseline", "TS1/2 boundary", "TS3/4 writers/selectors", "TS5/6 event identity", "TS7 full matrix", "TS8 exact candidate"]
compatibility_checkpoints:
  - "13 original report digests unchanged on load"
  - "Known legacy translated only at import; unknown legacy never cleared"
  - "Existing historical events/receipts/notes remain byte/order stable"
  - "First-cycle, adaptive/legacy gate selection, readiness/rejection, receipt-v1, reviewer and CLI exact"
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Before release, revert isolated structural implementation commits if necessary."
  - "After release, restore immutable v2.6.1 with bundled closeout guarded; use individual terminal gates."
  - "Never rewrite historical reports/events/receipts."
timebox_checkpoint: "2026-09-18 stop-and-reassess"
release_contingency: "Node24 owner contingency near 2026-09-20 remains independent of CR-008; no automatic main write."
```

## Governance Checks

```yaml
checks:
  - { id: "GOV-TS-01", result: PASS, evidence: "All ten ACs and six edge classes are mapped." }
  - { id: "GOV-TS-02", result: PASS, evidence: "Three RED/GREEN pairs precede production changes." }
  - { id: "GOV-TS-03", result: PASS, evidence: "RCR-SB1/2/3 each enforce Spec Compliance before Code Quality." }
  - { id: "GOV-TS-04", result: PASS, evidence: "Human Developer approved 16 exact roots; grant awaits matching receipt and explicit resume. WIP and adjacent ownership preserved." }
  - { id: "GOV-TS-05", result: PASS, evidence: "Unknown legacy, historical identity, rollback and parent evidence remain safe." }
blocking_items: ["matching trusted receipt", "explicit s07 resume"]
```

## Spec Change

```yaml
status: NOT_REQUIRED
reason: "The plan executes the approved structural contract and s05, with no new model module, kind vocabulary, public interface, migration, or weakened invariant."
updated_artifacts: []
required_followups: []
```

## Human Decision Record

```yaml
decision: APPROVED
gate: "task_plan"
reviewed_by: "developer"
reviewed_at: "2026-09-12T05:44:54Z"
decision_source: "User explicitly approved the amended Task Plan for closeout-bundle-repeat-cycle-reconciliation, including all 16 proposed write roots."
decision_scope: ["TS0..TS8", "RCR-SB1/2/3 ordered reviews", "16 write roots listed in Owned Scope Amendment"]
trusted_receipt_status: "NOT_YET_MATCHING_CURRENT_HOST"
execution_grant_status: "NOT_RESUMED"
not_approved: ["Implementation review verdicts", "s08 opening or terminal gates", "publish/tag/merge/install/cleanup", "adjacent work-item scope"]
next_action: "Human Developer seals the finalized Task Plan host in an interactive TTY; explicit resume remains separate."
```

## Audit

```yaml
step: "s06 Task Plan"
status: PASS
checks:
  - { criterion: "Executable plan", result: PASS, evidence: "TS0..TS8 specify paths, dependency, objective, outputs, review and verification." }
  - { criterion: "Acceptance coverage", result: PASS, evidence: "AC-RCR-01..10 and EDGE-RCR-01..06 mapped to tests and evidence." }
  - { criterion: "No hidden redesign", result: PASS, evidence: "Existing utility boundary and approved kind vocabulary retained." }
  - { criterion: "WIP and scope safety", result: PASS, evidence: "Partial T7 preserved until TS7; the 16 human-approved roots are not granted yet." }
  - { criterion: "Release integrity", result: PASS, evidence: "One candidate and child/parent/rollback/terminal ordering explicit." }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
gaps: ["Fresh digest-matching Task Plan receipt and explicit s07 resume are still required."]
risk_level: HIGH
next_action: "Seal the finalized Task Plan host as Developer, then explicitly resume the approved scope; implementation remains closed."
```

## SDD Traceability

```yaml
requirement_refs: ["RCR-01", "RCR-02", "RCR-03", "RCR-04", "RCR-05", "RCR-06", "RCR-07", "RCR-08", "RCR-09", "RCR-10"]
acceptance_refs: ["AC-RCR-01", "AC-RCR-02", "AC-RCR-03", "AC-RCR-04", "AC-RCR-05", "AC-RCR-06", "AC-RCR-07", "AC-RCR-08", "AC-RCR-09", "AC-RCR-10"]
task_refs: ["TS0", "TS1", "TS2", "TS3", "TS4", "TS5", "TS6", "TS7", "TS8"]
test_refs: ["typed-contract", "bounded-legacy-import", "writer-inventory", "latent-canary", "text-note-invariance", "direct-event-identity", "13-report-no-migration", "repeat-cycle-atomicity", "exact-candidate-parent"]
```

## Traceability

```yaml
upstream:
  - "Amended s04 SHA-256 26b85c2d4ff64f218486352e4e8e770fe7bfe71a538d8366a308b56d1e9aaf87"
  - "Amended s05 SHA-256 d075290f151a9596d029a79fa1cf2eab72b08a179c196d35a046d2d7a8187001"
  - "Approach receipt Developer 2026-09-11T14:38:00.519Z, digest_match=true"
outputs: ["TS0..TS8", "RCR-SB1/2/3", "16-root human-approved amendment, not granted", "legacy/WIP/parent release safety"]
next_step: "Fresh matching Task Plan receipt, then explicit s07 resume"
```

## Handoff

- Current step: s06; human Developer approved the amended Task Plan and its 16 roots at 2026-09-12T05:44:54Z.
- Implementation stays closed until a matching receipt and explicit resume grant the proposed 16 roots.
- Unknown legacy text is never semantic-cleared; core transitions/assertions do not read text or note.
- Old patch B1/B2 evidence remains historical; the structural batches have distinct RCR-SB1/2/3 review identities.
- Partial T7 WIP is preserved and may only be adopted at TS7.
- Node24 remains a separate token-only commit; validator parallelisation and architecture restructure remain excluded.
- Worktree stays HOLD_OPEN until child and parent verification plus applicable human closeout gates conclude.


## Checkpoint Scope Amendment — RCR-TS8-CP-001

The human explicitly accepted Option B in response to the immediately preceding PO/BA/Developer/QC proposal, recorded at 2026-09-14T08:20:49Z. This approval authorizes only the checkpoint-scope and authoring-applicability amendment: this correction child's Release/Business Acceptance are not_applicable; all parent AC-RCR-08, AG-01..AG-13 and independent terminal gates remain mandatory. It does not approve any gate on the amended bytes, sign a receipt, complete AC-RCR-08, close F-AG11-001 or authorize protocol DONE, production edits, publication/tag/merge/install/cleanup.

Original source reviews, QC Technical Verification and qualified child DoD decision remain historical evidence for unchanged candidate af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f. The later human accept approved all five amended authoring gates, recorded at 2026-09-14T13:33:15Z. Fresh trusted authoring receipts and QC amended DoD artifact binding remain pending; old whole-host receipts cannot be reused. See `rcr-ts8-checkpoint-amendment.json` for exact hashes, receipt impact and the full child-to-parent closure sequence.

```yaml
amendment_id: RCR-TS8-CP-001
current_gate: task_plan
gate_decision: HUMAN_APPROVED_PENDING_RECEIPT
decided_by: [developer]
decided_at: "2026-09-14T13:33:15Z"
reviewer_roles: [developer]
production_design_and_implementation: UNCHANGED
candidate_rebuild: NOT_REQUIRED
```

## Human Approval Record — RCR-TS8-CP-001

The later human reply `accept` explicitly answered the immediately preceding five-gate amended-authoring proposal, separate from the earlier Option B scope-only approval. Role labels are approved reviewer capacities; time below is the decision-recording time, not an inferred message-send time.

```yaml
amendment_id: RCR-TS8-CP-001
recorded_at: "2026-09-14T13:33:15Z"
approval_source: "Human accept to the immediately preceding five-gate proposal"
authoring_gates:
  spec: {status: HUMAN_APPROVED_PENDING_RECEIPT, reviewed_by: ["ba"]}
  contract: {status: HUMAN_APPROVED_PENDING_RECEIPT, reviewed_by: ["developer"]}
  dor: {status: HUMAN_APPROVED_PENDING_RECEIPT, reviewed_by: ["qc","ba"]}
  approach: {status: HUMAN_APPROVED_PENDING_RECEIPT, reviewed_by: ["developer"]}
  task_plan: {status: HUMAN_APPROVED_PENDING_RECEIPT, reviewed_by: ["developer"]}
canonical_gate_hosts: {spec: s04, contract: s04, dor: s04, approach: s05, task_plan: s06}
trusted_receipts: PENDING_FIVE_FRESH_WHOLE_HOST_RECEIPTS
amended_dod_artifact_binding: PENDING_SEPARATE_QC_REVIEW
original_qc_technical_checkpoint_decision: PRESERVED
parent_AC_RCR_08: MANDATORY_PENDING
protocol_DONE: false
```

All nine other AC, persisted Contract content, runtime source, candidate and rollback remain unchanged. Current gate authority still requires fresh trusted receipts; full same-candidate parent AG-01..AG-13 and new independent parent terminal gates remain mandatory before final closure.

## Human TTY Receipt Sealing — RCR-TS8-CP-001

Run from the CR-008 worktree using supported Node 22. Contract is sealed independently first; this legacy report's ready-bundle seals Spec, DoR, Approach and Task Plan. The DoR reviewers are ordered QC then BA so the bundle selects QC as sealer while preserving the joint review. Do not share a passphrase or enable non-interactive fixtures. These commands do not seal DoD or authorize parent closure.

```sh
cd "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/cr-008-adaptive-governance"
/Users/haonguyen87/.nvm/versions/node/v22.23.2/bin/node packages/workflow-bundle/bin/wfc.js gate approve --work-item closeout-bundle-repeat-cycle-reconciliation --gate contract --workflow-root work-items --project-root . --reviewed-by developer --note "Human approved RCR-TS8-CP-001 amended Contract; unchanged Contract body, new finalized host binding."
/Users/haonguyen87/.nvm/versions/node/v22.23.2/bin/node packages/workflow-bundle/bin/wfc.js gate approve-ready-bundle --work-item closeout-bundle-repeat-cycle-reconciliation --workflow-root work-items --project-root . --note "Human approved RCR-TS8-CP-001 Spec BA, DoR BA/QC, Approach and Task Plan Developer; separate receipts, no DoD or parent approval."
```
