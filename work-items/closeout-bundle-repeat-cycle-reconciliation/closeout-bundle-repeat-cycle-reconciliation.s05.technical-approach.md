---
artifact_id: "closeout-bundle-repeat-cycle-reconciliation.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-repeat-cycle-reconciliation"
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
execution_roles: ["ba", "developer", "qc", "devops"]
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
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops", "qc"]
  business_acceptance: ["po"]
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-09-10T03:09:26Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba", "qc"]
  dor_reviewed_at: "2026-09-10T03:09:26Z"
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-09-10T08:12:02Z"
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
  - "brainstorming"
  - "system-design"
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.s04.acceptance-criteria.md"
linked_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s07.implementation.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../packages/workflow-bundle/scripts/work-item-protocol.js"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/scripts/workflow-approval-transaction.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
  - "../../packages/workflow-bundle/test/workflow-gate-review.test.js"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Spec and DoR trusted receipts are valid against the unchanged s04 SHA-256
> `b50db12a977a007b8785baff4153ad54d8049e0003d030deaf4329bebff9f60b`. The recommended
> design is a transaction-delta closeout projector: derive canonical mutable state before adding cycle
> evidence, classify a committed cycle from receipt or current-state operations, then append one event
> carrying the same transaction ID used by the existing journal. Unchanged retries remain true `NOOP`.
> No public CLI, receipt, event schema, runtime, or deployment boundary changes. Developer approved
> this Approach at `2026-09-10T08:12:02Z`; the finalized host now awaits its trusted receipt.

## Step Contract
```yaml
step: "s05 Technical Approach"
goal: >-
  Lock the smallest correction that gives every committed closeout cycle one attributable event and
  one canonical current-state projection while an unchanged retry remains byte-stable and inert.
value: >-
  Close F-AG11-001 at its source without weakening human authority, history immutability,
  transaction atomicity, compatibility, or parent release controls.
scope_in:
  - "Committed-cycle classification from planned receipt and current-state mutations"
  - "Canonical closeout projection for required_actions, blockers, and handoff_target"
  - "One protocol event attributable to the existing approval transaction ID"
  - "Atomic report and s01 synchronization through the existing coordinator"
  - "First/second cycle, semantic variant, retry, recovery, and concurrency test design"
  - "Corrected v2.6.2 candidate and parent CR-008 re-verification handoff"
scope_out:
  - "Public CLI, receipt-v1, protocol-event schema, signer, trusted root, or reviewer-authority changes"
  - "Generic natural-language classification outside closeout current-state fields"
  - "New lifecycle states or legacy terminal-gate selector redesign"
  - "New service, database, config, telemetry field, runtime, or deployment topology"
  - "Implementation, publication, tagging, merge, install, cleanup, or branch finalization"
inputs_required:
  - "Digest-matched BA Spec and QC DoR receipts for the finalized s04 host"
  - "AC-RCR-01..08, EDGE-RCR-01..06, and approved OQ-RCR-001=B/OQ-RCR-002=A/OQ-RCR-003=A"
  - "F-AG11-001 observed state and source-level root-cause evidence"
  - "Existing receipt planning, reconciliation, report/s01 rendering, and journal behavior"
  - "Existing closeout, retry, failure/recovery, and compatibility fixtures"
outputs_required:
  - "Option analysis with one recommended and two rejected directions"
  - "System design covering components, flow, interfaces, failures, compatibility, rollback, and observability"
  - "Brownfield impact analysis with exact touchpoints"
  - "Validation direction sufficient for s06 Task Plan"
  - "Reviewable Developer Approach proposal"
done_when:
  - "Receipt delta, current-state delta, and unchanged retry are distinct"
  - "One committed-cycle event is atomically bound to the existing transaction identity"
  - "Mutable current state and immutable history have explicit ownership"
  - "Exact production and test touchpoints are known without a new public boundary"
  - "Failure, compatibility, rollback, observability, and parent re-verification are plan-ready"
  - "No unresolved technical decision blocks s06 after Approach approval and receipt verification"
constraints:
  hard_constraints:
    - "One committed closeout cycle contributes exactly one attributable protocol event"
    - "An unchanged retry contributes zero persistent mutation or transaction residue"
    - "Successful state exposes the canonical work-item close action and protocol-close handoff"
    - "Historical receipts, notes, markers, and events remain immutable and ordered"
    - "All new receipt, event, report, and s01 writes use the existing atomic transaction"
    - "First-cycle, legacy, adaptive, readiness, receipt-v1, and reviewer behavior remain compatible"
    - "Parent authority requires one corrected exact candidate and repeated terminal gates"
  soft_constraints:
    - "Prefer pure projection and operation deltas over persisted cycle metadata"
    - "Keep the correction within existing modules and fixture conventions"
  prohibited_actions:
    - "Use global CLOSEOUT_BUNDLE_APPROVED presence as current-cycle identity"
    - "Append an event for every invocation or manufacture a cycle from the event itself"
    - "Use an unbounded prose classifier or rewrite historical artifacts"
    - "Introduce receipt-v2, event-v2, a cycle ledger, or another coordinator"
    - "Open implementation before Approach and Task Plan receipts pass"
  compliance_checks:
    - "Cycle classification happens before event append"
    - "Event and journal/summary share one transaction ID"
    - "Only report/s01 current-state surfaces are reconciled"
    - "Every compatibility lane remains in the regression plan"
    - "No governance exception or foundation decision is needed"
risks:
  - id: "R-S05-RC-001"
    description: "Counting the event itself as a state delta could turn every retry into a new cycle."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Compare receipt and pre-event state operations first; only those may open a cycle."
    contingency: "QC retains F-AG11-001 if an unchanged retry is not NOOP."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S05-RC-002"
    description: "Canonical cleanup could erase an unrelated blocker or immutable evidence."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Limit changes to mutable fields, use selected-gate semantics for blockers, and assert unrelated canaries plus historical digests."
    contingency: "Revert the projector and retain individual terminal approvals."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S05-RC-003"
    description: "The event identity could differ from the journal and CLI transaction result."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Preallocate one validated ID and pass it to event construction and the coordinator."
    contingency: "Fail AC-RCR-02 and keep release blocked."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S05-RC-004"
    description: "Concurrent retries may calculate from the same pre-commit state."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Retain lock, expected-digest guards, recovery, and prove at most one commit followed by NOOP."
    contingency: "Reject attempts while the work-item lock is live and rerun after recovery."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S05-RC-005"
    description: "A corrected child could be promoted using stale parent evidence."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Build one new v2.6.2 candidate, bind its full SHA-256, rerun AG-01..13, and repeat terminal approvals."
    contingency: "Keep F-AG11-001 open and v2.6.1 as guarded rollback only."
    owner: "devops/qc/po"
    status: MONITORING
timebox:
  target_duration: "One focused option and design pass"
  deadline: "Before s06 Task Plan"
  escalation_rule: "Return to s04 if a public contract, persisted cycle schema, or broader lifecycle semantic is required."
```

## Input Readiness
```yaml
step: "s05 Technical Approach"
status: READY
available_inputs:
  - "Spec receipt APPROVED by BA at 2026-09-10T04:55:23.729Z with digest_match=true"
  - "DoR receipt APPROVED by QC at 2026-09-10T04:55:36.637Z with digest_match=true"
  - "Both receipts bind s04 SHA-256 b50db12a977a007b8785baff4153ad54d8049e0003d030deaf4329bebff9f60b"
  - "Approved B/A/A decisions, AC-RCR-01..08, source evidence, and regression fixtures"
missing_inputs: []
invalid_inputs:
  - "Parent candidate 2a5ae701... and terminal receipts are historical pre-finding evidence only"
conflicts: []
assumptions:
  - "An optional internal transaction_id input is compatible because journal and COMMITTED output already expose it"
  - "Using the existing free-form event note for attribution does not change the event schema"
risk_level: HIGH
next_action: "Seal and verify the Developer-approved Approach receipt against this finalized host; implementation is not authorized."
```

## Option Analysis
```yaml
goal: "Make repeated closeout reconciliation cycle-aware, auditable, canonical, atomic, and retry-idempotent."
ba_lane:
  business_goal: "A successful terminal approval must stop appearing pending, and every real committed cycle must be auditable."
  user_scenarios:
    - "A first closeout seals current receipts and exposes only the close transition."
    - "A later cycle after authority or mutable-state change appends one attributable event."
    - "An unchanged retry returns NOOP with byte-identical state."
    - "A v2.6.1 rollback uses guarded bundle behavior and individual terminal approvals."
  business_rules:
    - "Committed authority/current-state transition defines a cycle; invocation does not."
    - "One committed cycle produces one event; one unchanged retry produces none."
    - "Report/s01 current state is mutable; historical evidence is preserved."
    - "Successful closeout exposes the canonical close action and protocol-close handoff."
  scope_notes:
    - "Resolve F-AG11-001 only; the prior missing-DoD child remains closed compatibility evidence."
    - "Reuse existing transaction and protocol-event shapes."
  open_questions: []
dev_lane:
  repo_constraints:
    - "workflow-gate-review.js builds receipt and protocol operations before one transaction call."
    - "workflow-approval-transaction.js owns lock, journal, transaction_id, staging, rollback, and recovery."
    - "work-item-protocol.js currently combines text cleanup with global-marker event suppression."
    - "s01 is rendered from the normalized protocol report."
    - "Node.js/CommonJS, filesystem artifacts, and receipt-v1 are the baseline."
  technical_risks:
    - "Event-first delta calculation creates non-idempotency."
    - "Broad text matching can delete unrelated evidence."
    - "A cycle ledger duplicates the journal and adds migration risk."
  integration_points:
    - "runGateBundle receipt operation planning"
    - "reconcileApprovalBundleReport current-state projection"
    - "executeApprovalTransaction identity and persistence"
    - "renderReconciledS01Content report-to-s01 projection"
    - "work-item-protocol.test.js and workflow-gate-review.test.js"
  nfr_notes:
    - "Twenty repeated executions with zero report/s01 mismatch"
    - "Two unchanged retries with zero file mutation"
    - "At most one committed event under concurrency/recovery"
    - "No partial state at every failure boundary"
  baseline_context: "Brownfield v2.6.2 candidate line inside the existing approval transaction path."
options:
  - "Option A - Transaction-delta projector with shared transaction identity"
  - "Option B - Persist a cycle fingerprint or ledger"
  - "Option C - Extend marker/regex heuristics or append per invocation"
option_details:
  - name: "Option A - Transaction-delta projector with shared transaction identity"
    summary: "Project state before event creation, classify from receipt/state operations, then append one event carrying the journal ID."
    pros: ["Requirement-aligned", "Natural NOOP", "Existing schema/coordinator reuse", "Exact attribution"]
    cons: ["Focused changes across three internal modules", "Strict operation ordering required"]
    risks: ["Wrong ordering could append on retry or mismatch identity"]
  - name: "Option B - Persist a cycle fingerprint or ledger"
    summary: "Add cycle metadata derived from host/gates/reviewer state plus a sequence or fingerprint."
    pros: ["Explicit queryable cycle state", "Possible future analytics"]
    cons: ["New schema and migration", "Duplicates journal/event evidence", "Larger rollback boundary"]
    risks: ["Ambiguous legacy backfill semantics"]
  - name: "Option C - Extend marker/regex heuristics or append per invocation"
    summary: "Keep global marker control, broaden string matching, or append whenever the command succeeds."
    pros: ["Fewest local lines", "No coordinator input change"]
    cons: ["History cannot identify a later cycle", "Invocation violates retry idempotency", "Regex may delete unrelated prose"]
    risks: ["Missing or duplicate events and accidental cleanup"]
recommended_option: "Option A - Transaction-delta projector with shared transaction identity"
recommendation_reason: >-
  The existing operation plan already knows whether authority/current state changes, and the journal
  already persists a transaction ID. Reuse satisfies identity and attribution without a new schema.
  Option B solves a larger future problem; Option C cannot satisfy later-cycle evidence and NOOP together.
validation_plan:
  - "RED: second valid cycle with historical marker/event currently suppresses its event."
  - "RED: prose/case/whitespace pending forms and old handoff currently survive."
  - "GREEN: summary/journal and appended event share one transaction ID."
  - "GREEN: canonical report/s01 state and historical digests remain exact."
  - "Run twenty repeats, two byte-identical retries, failure/recovery, concurrency, and compatibility cases."
notes_for_next_step: "READY for system design and s06 planning; no option blocker remains."
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: "Brownfield correction inside the existing approval-bundle reconciliation path"
selected_stack: ["Existing Node.js/CommonJS modules"]
selected_runtime: ["Existing wfc CLI and filesystem-backed trusted approval transaction"]
decision_notes:
  - "No stack, service, database, runtime, deployment, or public contract decision changes."
  - "The optional identity input reuses an existing journal/output field; it is not a new authority source."
```

## Main Artifact
```yaml
design_problem: >-
  Global marker history is currently used as cycle identity, cleanup only recognizes literal commands,
  and successful closeout retains the old handoff. A later valid receipt transaction can therefore
  commit while current state remains pending and no event is attributable to that transaction.
business_rule_trace:
  - "AC-RCR-01/OQ-RCR-001 -> receipt or pre-event state operations classify a cycle"
  - "AC-RCR-02/OQ-RCR-002 -> one event carries the transaction ID and ordered gate set"
  - "AC-RCR-03/OQ-RCR-003 -> canonical report/s01 close action and protocol-close handoff"
  - "AC-RCR-04 -> no receipt or pre-event state operation means NOOP and no event"
  - "AC-RCR-05 -> current fields mutate; prior evidence remains immutable"
  - "AC-RCR-06 -> receipts, event, report, and s01 use one atomic coordinator"
  - "AC-RCR-07 -> first-cycle, legacy, adaptive, readiness, receipt-v1, and authority compatibility"
  - "AC-RCR-08 -> one corrected candidate and repeated parent gates"
design_options:
  - name: "Transaction-delta projector"
    summary: "Use planned operations as cycle evidence and reuse the journal ID in the event."
    pros: ["No new schema", "Natural NOOP", "Atomic attribution"]
    cons: ["Three focused internal touchpoints"]
    risks: ["Ordering and identity need strong tests"]
  - name: "Persisted cycle ledger"
    summary: "Add explicit cycle metadata and migration semantics."
    pros: ["Queryable cycles"]
    cons: ["Larger state boundary"]
    risks: ["Legacy ambiguity"]
  - name: "Marker/regex heuristic"
    summary: "Extend the current surface logic."
    pros: ["Few lines"]
    cons: ["Cannot meet later-cycle and retry requirements together"]
    risks: ["Duplicate/missing events"]
rejected_options:
  - name: "Persisted cycle ledger"
    reason: "The existing journal/event pair already provides identity; a schema/backfill is unnecessary."
  - name: "Marker/regex heuristic"
    reason: "Global history cannot prove a current transaction, while invocation cannot distinguish retry from commit."
recommended_design: >-
  Keep gate derivation, authority preflight, receipt-v1, and the coordinator as owners. For approved
  closeout only, first build a canonical report without a per-cycle event: remove satisfied selected-
  terminal approval blockers, replace actions with the exact work-item close command, set handoff to
  protocol-close, and keep the coarse marker deduplicated. Compare that projection with report/s01 and
  combine it with planned receipt writes. If neither exists, return NOOP. Otherwise preallocate one
  transaction ID, append exactly one event containing that ID and ordered gates, render report/s01 from
  the same projection, and pass all operations plus that ID through executeApprovalTransaction.
recommendation_reason: >-
  The design maps acceptance semantics to mechanisms the architecture already has. It prevents circular
  event-driven commits, preserves atomicity and retry behavior, and avoids a ledger, schema, command,
  or lifecycle abstraction.
component_changes:
  - component: "work-item-protocol.js"
    change: "Canonical approved-closeout projection independent of global marker; append a cycle event only when instructed."
    ownership: "developer"
  - component: "workflow-gate-review.js"
    change: "Classify from receipt/pre-event state operations, allocate one ID for real mutation, and bind final report/s01 operations."
    ownership: "developer"
  - component: "workflow-approval-transaction.js"
    change: "Accept a validated optional transaction ID; preserve generated-ID behavior for other callers."
    ownership: "developer"
  - component: "work-item-protocol.test.js"
    change: "Add first/second/retry, semantic state, history, parity, repeated, recovery, and concurrency CLI fixtures."
    ownership: "developer/qc"
  - component: "workflow-gate-review.test.js"
    change: "Lock optional ID validation/reuse and unchanged coordinator behavior."
    ownership: "developer/qc"
data_flow:
  - "Gate contexts -> receipt match -> planned receipt operations"
  - "Loaded report -> canonical pre-event projection -> report/s01 state-operation diff"
  - "receipt operations OR pre-event state operations -> committed_cycle=true"
  - "committed_cycle=false -> no ID, event, or file operations -> NOOP"
  - "committed_cycle=true -> one ID -> one event -> final report/s01 operations"
  - "All operations -> existing lock/journal/stage/commit/verify/recovery coordinator"
interface_changes:
  - "No public CLI, output field, receipt field, event field, config, or artifact schema change."
  - "Internal executeApprovalTransaction accepts optional validated transaction_id; existing callers remain compatible."
  - "Existing event note records transaction_id and ordered gates; the event object shape is unchanged."
failure_modes:
  - scenario: "Event operation participates in classification."
    impact: "Every retry commits a duplicate event."
    guardrail: "Classify before event append and assert two byte-identical NOOP retries."
  - scenario: "Event and journal identities differ."
    impact: "Cycle evidence is not attributable."
    guardrail: "Pass one validated ID to both paths and assert exact equality."
  - scenario: "Projection removes unrelated blocker evidence."
    impact: "The work item appears closable despite another issue."
    guardrail: "Use selected-gate semantics for blockers and preserve unrelated canaries."
  - scenario: "Report and s01 are derived independently."
    impact: "Current-state surfaces diverge."
    guardrail: "Render s01 from one normalized report and stage both atomically."
  - scenario: "Failure or crash occurs during persistence."
    impact: "Partial authority/evidence becomes visible."
    guardrail: "Retain expected-digest guards and the full journal failure/recovery matrix."
  - scenario: "Two commands race from the same state."
    impact: "Two events or inconsistent receipts are attempted."
    guardrail: "Per-item lock and expected digests allow at most one commit; follow-up completes as NOOP."
  - scenario: "Readiness/rejection enters the new path."
    impact: "Activation or rework regresses."
    guardrail: "Branch on closeout+APPROVED and run existing bundle tests unchanged."
compatibility_impact:
  - "Adaptive and legacy gate selection remain unchanged."
  - "Readiness approval and readiness/closeout rejection remain unchanged."
  - "Receipt-v1 signatures, digest matching, reviewer roles, and paths remain unchanged."
  - "Existing transaction callers still receive generated IDs by default."
  - "Historical marker/event order remains unchanged; one event is appended only for a real cycle."
  - "Public CLI and error behavior remain backward compatible."
rollback_impact:
  - "Before publication, revert only the focused production/test delta if regression appears."
  - "After release, reinstall immutable v2.6.1 with bundle closeout disabled or guarded."
  - "Use individual terminal gate commands after rollback and verify each receipt digest."
  - "Never delete or rewrite historical receipts/events."
observability_hooks:
  - "transaction.status distinguishes COMMITTED from NOOP."
  - "transaction.transaction_id equals the ID in the new event note."
  - "sealed_gates exposes exact gate order, reviewer, host, and digest."
  - "Report/s01 actions, blockers, handoff, and marker expose canonical state."
  - "Focused test names expose later-cycle, retry, semantic, concurrency, and recovery outcomes."
  - "Hosted Guardrails binds corrected source, run ID, candidate SHA-256, and parent AG evidence."
constraints_applied:
  - "Smallest correct brownfield delta"
  - "TDD for behavior change"
  - "Targeted review in order Spec Compliance then Code Quality"
  - "Independent QC verification and human-controlled terminal gates"
validation_plan:
  - "Write failing second-cycle and semantic-state CLI fixtures first."
  - "Implement the minimum pre-event delta, shared ID, and projection changes."
  - "Run focused protocol/coordinator tests after each TDD cycle."
  - "Run all readiness, rejection, adaptive, legacy, receipt, recovery, and validator regressions."
  - "Run twenty repeats, two byte-identical retries, concurrent-at-most-one-commit, and UTF-8 checks."
  - "Run full workflow-bundle checks, static/security/performance heuristics, pack audit, and authoring smoke."
  - "Build one corrected v2.6.2 candidate, verify local/hosted/rollback, rerun parent AG-01..13, and repeat terminal gates."
specialized_followups: []
notes_for_next_step: "s06 must put failing fixtures before production changes and retain child-to-parent re-verification ordering."
```

## Architecture Details
```yaml
architecture_style: "Focused internal adapter correction in the existing approval transaction path"
authority_boundaries:
  gate_selection: "deriveBundleGates"
  receipt_authority: "trusted receipt-v1 plus configured gate reviewer"
  current_state: "work-item report, with s01 as synchronized projection"
  transaction_identity: "journal transaction_id"
  immutable_history: "finalized notes, prior receipts, markers, and events"
cycle_classifier:
  receipt_delta: "At least one current receipt operation is planned."
  state_delta: "The pre-event canonical report or s01 differs from loaded mutable state."
  committed_cycle: "receipt_delta OR state_delta"
  unchanged_retry: "NOT receipt_delta AND NOT state_delta"
  excluded_signal: "The new event operation itself."
canonical_closeout_projection:
  required_actions: ["wfc work-item close --work-item closeout-bundle-repeat-cycle-reconciliation"]
  handoff_target: "protocol-close"
  blockers: "Remove only selected-terminal approval or closeout-bundle blockers; preserve unrelated entries."
  audit_events: "Keep CLOSEOUT_BUNDLE_APPROVED deduplicated."
  protocol_events: "Append one approve-closeout-bundle event only for committed_cycle=true."
event_attribution:
  source: "Same validated transaction_id passed to executeApprovalTransaction"
  context: "Ordered gate names in the existing note field"
  timestamp: "Normalized reviewedAt"
  schema_change: false
atomic_boundary:
  operations: ["Changed gate receipts", "Reconciled report", "Synchronized s01 projection"]
  coordinator: "executeApprovalTransaction"
  guards: ["Host SHA-256", "Expected target SHA-256", "Live lock", "Journal rollback/recovery"]
review_boundaries:
  batch_b1: "Cycle classification, event attribution, transaction identity"
  batch_b2: "Canonical current-state projection and report/s01 parity"
  batch_b3: "Failure/recovery, compatibility, candidate, and parent re-verification"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - { path: "packages/workflow-bundle/scripts/work-item-protocol.js", impact: "Approved-closeout projection and event control only." }
  - { path: "packages/workflow-bundle/scripts/workflow-gate-review.js", impact: "Operation-delta classification, identity, and sequencing." }
  - { path: "packages/workflow-bundle/scripts/workflow-approval-transaction.js", impact: "Optional validated ID; generated-ID default retained." }
  - { path: "packages/workflow-bundle/test/work-item-protocol.test.js", impact: "Repeat-cycle, semantic, parity, history, recovery, and concurrency fixtures." }
  - { path: "packages/workflow-bundle/test/workflow-gate-review.test.js", impact: "Coordinator identity compatibility tests." }
  - { path: "work-items/closeout-bundle-repeat-cycle-reconciliation/*.md", impact: "Traceability and evidence only." }
compatibility_risks:
  - "Readiness/rejection could regress if the new branch is not isolated."
  - "An over-broad matcher could remove unrelated blockers."
  - "Existing coordinator callers could break if transaction_id becomes mandatory."
  - "Wrong delta ordering could turn retry into COMMITTED."
migration_notes:
  - "No report, receipt, event, config, database, or artifact migration."
  - "No backfill, re-signing, reordering, or deletion of history."
rollback_notes:
  - "Revert only the focused source/test delta before publication if needed."
  - "For v2.6.1 rollback, guard bundled closeout and use individual terminal approvals."
  - "Prior candidate 2a5ae701... remains historical pre-finding evidence only."
```

## Governance Exceptions
```yaml
status: NOT_REQUIRED
reason: "The design restores AC-RCR-01..08 inside the approved strict brownfield boundary."
exceptions: []
```

## Spec Change
```yaml
status: NOT_REQUIRED
detected_in_step: "s05"
current_spec_refs:
  - "closeout-bundle-repeat-cycle-reconciliation.s04.acceptance-criteria.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
reason: "The design implements the approved B/A/A semantics without changing scope or contract."
updated_artifacts: []
required_followups: []
```

## Audit
```yaml
step: "s05 Technical Approach"
status: PASS
checks:
  - { criterion: "Cycle states are distinct", result: PASS, evidence: "Architecture Details defines receipt_delta, state_delta, committed_cycle, retry, and event exclusion." }
  - { criterion: "Event is transaction-attributable", result: PASS, evidence: "One ID is shared by the event note and coordinator journal/summary." }
  - { criterion: "Mutable and immutable ownership is explicit", result: PASS, evidence: "Only report/s01 current state changes; historical evidence is preserved." }
  - { criterion: "Exact touchpoints and verification are plan-ready", result: PASS, evidence: "Five exact source/test paths and three review batches are named." }
  - { criterion: "Failures, compatibility, rollback, and observability are covered", result: PASS, evidence: "Main Artifact covers retry, identity, blockers, parity, atomicity, concurrency, and candidate evidence." }
  - { criterion: "No unnecessary boundary is introduced", result: PASS, evidence: "No public schema, command, service, runtime, or migration is proposed." }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one focused option and design pass."
gaps:
  - "The digest-matched trusted Approach receipt is pending."
risk_level: HIGH
next_action: "Developer seals the trusted Approach receipt against this unchanged finalized host before s06."
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-AG-009", "RCR-01", "RCR-02", "RCR-03", "RCR-04", "RCR-05", "RCR-06"]
acceptance_refs: ["AC-RCR-01", "AC-RCR-02", "AC-RCR-03", "AC-RCR-04", "AC-RCR-05", "AC-RCR-06", "AC-RCR-07", "AC-RCR-08"]
task_refs: []
test_refs:
  - "repeat-closeout-first-second-retry"
  - "closeout-semantic-current-state-matrix"
  - "closeout-immutable-history-and-s01-parity"
  - "closeout-failure-recovery-concurrency-matrix"
  - "existing-readiness-adaptive-legacy-receipt-regression"
  - "corrected-v2.6.2-candidate-and-parent-ag01-ag13"
```

## Traceability
```yaml
upstream:
  - "closeout-bundle-repeat-cycle-reconciliation.s04.acceptance-criteria.md"
  - "Spec receipt BA 2026-09-10T04:55:23.729Z / SHA-256 b50db12a977a007b8785baff4153ad54d8049e0003d030deaf4329bebff9f60b"
  - "DoR receipt QC 2026-09-10T04:55:36.637Z / SHA-256 b50db12a977a007b8785baff4153ad54d8049e0003d030deaf4329bebff9f60b"
  - "F-AG11-001 in parent s07 and s08"
  - "packages/workflow-bundle/scripts/work-item-protocol.js"
  - "packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
outputs:
  - "Recommended Option A transaction-delta projector"
  - "Shared journal/event identity"
  - "Canonical closeout current-state projection"
  - "Brownfield failure, compatibility, rollback, observability, and validation design"
next_step: "s06 Task Plan after the Developer-approved Approach receives a digest-matched receipt"
```

## Handoff
- Recommended option: transaction-delta closeout projector with one shared journal/event transaction ID.
- Accepted trade-off: a small optional coordinator input and focused three-module delta are preferable to a new cycle ledger.
- Current human review: Developer approved the Approach at `2026-09-10T08:12:02Z`.
- Condition for step 6: seal and verify the Developer trusted Approach receipt against this unchanged finalized host.
- Release note: keep `F-AG11-001` and publication/finalization blocked until the corrected child and one exact parent candidate pass re-verification.
