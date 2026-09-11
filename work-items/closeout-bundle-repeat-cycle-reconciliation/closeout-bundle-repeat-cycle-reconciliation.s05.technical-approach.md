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
  contract: "required"
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
  contract: ["developer"]
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
  spec_reviewed_at: "2026-09-11T11:40:59Z"
  contract_reviewed_by: ["developer"]
  contract_reviewed_at: "2026-09-11T11:40:59Z"
  dor_reviewed_by: ["ba", "qc"]
  dor_reviewed_at: "2026-09-11T11:40:59Z"
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-09-11T14:34:14Z"
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
  - "../../packages/workflow-bundle/scripts/work-item-protocol-utils.js"
  - "../../packages/workflow-bundle/scripts/work-item-protocol.js"
  - "../../packages/workflow-bundle/scripts/materialize-work-item.js"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
  - "../../packages/workflow-bundle/scripts/validate-work-item-protocol.js"
  - "../../packages/workflow-bundle/scripts/workflow-approval-transaction.js"
  - "../../packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> The amended s04 Spec, Data/Event Contract, and DoR have three verified trusted receipts bound to
> SHA-256 26b85c2d4ff64f218486352e4e8e770fe7bfe71a538d8366a308b56d1e9aaf87.
> The proposed design puts one typed-state compatibility adapter in the existing shared protocol
> utility boundary, converts every new blocker/action writer to structured entries, and limits core
> transitions to exact id or kind+gate selectors. Human text is render-only. Approval-bundle events
> carry the coordinator transaction_id as a field; note is never parsed. Human Developer approved
> this amended Approach at 2026-09-11T14:34:14Z; the matching trusted receipt remains separate.

## Step Contract

```yaml
step: "s05 Technical Approach"
goal: "Remove prose parsing from protocol state transitions while preserving legacy reports, atomic closeout cycles, and exact transaction attribution."
value: "End the recurring closeout defect class without migrating historical artifacts or weakening human authority."
scope_in:
  - "Typed blockers[] and required_actions[] normalization, validation, writing, selection, and rendering"
  - "One bounded adapter for known protocol-owned legacy strings"
  - "Direct transaction_id on newly emitted approval-transaction events"
  - "Existing transaction-delta cycle classification and atomic report/s01 synchronization"
  - "13-report compatibility, full regression, package, hosted, and parent evidence"
scope_out:
  - "Public CLI, receipt-v1, signer, approval root, or reviewer authority changes"
  - "Bulk or in-place migration of existing reports"
  - "Semantic interpretation or clearing of unknown legacy prose"
  - "New service, database, runtime, deployment topology, or public schema"
  - "Validator parallelisation, publication, tagging, merge, install, cleanup, or branch finalization"
done_when:
  - "No core transition or state assertion reads state-entry text"
  - "Unknown legacy strings remain exact legacy entries and cannot be semantically cleared"
  - "Every new state writer emits a valid typed entry"
  - "Every new approval-transaction event has direct coordinator identity"
  - "Historical reports and events remain readable without rewrite or inferred identity"
  - "s06 can order TDD, review, and verification without redesign"
constraints:
  hard:
    - "text and note are human-only"
    - "Core selectors use exact id or exact kind+gate only"
    - "Legacy interpretation occurs once at the load/normalization boundary"
    - "All newly generated entries have unique deterministic ids"
    - "Committed approval events equal journal/result transaction_id"
    - "An unchanged retry is a byte-stable NOOP"
    - "2026-09-18 is a stop-and-reassess checkpoint, not a delivery promise"
  prohibited:
    - "Regex, substring, fuzzy alias, or Unicode-boundary inference over text in core logic"
    - "Recover transaction identity from note"
    - "Backfill IDs or transaction IDs into historical evidence"
    - "Continue partial T7 before fresh s05/s06 receipts and activation"
risks:
  - { id: "R-S05-001", risk: "An unconverted writer continues emitting strings.", mitigation: "Inventory every assignment/push/unshift and enforce typed output." }
  - { id: "R-S05-002", risk: "The adapter becomes another fuzzy state machine.", mitigation: "Exact values or full-string anchored command grammar only." }
  - { id: "R-S05-003", risk: "Structured rendering breaks s01 parity.", mitigation: "Stable YAML mappings and parsed equality tests." }
  - { id: "R-S05-004", risk: "Historical events lack truthful transaction IDs.", mitigation: "Preserve as readable pre-contract history; enforce identity for all new writes." }
  - { id: "R-S05-005", risk: "Expanded paths collide with adjacent work.", mitigation: "Amend owned paths in s06 and keep unrelated changes isolated." }
```

## Input Readiness

```yaml
step: "s05 Technical Approach"
status: READY
available_inputs:
  - "Spec receipt BA at 2026-09-11T13:50:51.020Z, digest_match=true"
  - "Contract receipt Developer at 2026-09-11T13:51:06.341Z, digest_match=true"
  - "DoR receipt QC at 2026-09-11T13:51:18.535Z, digest_match=true"
  - "All three bind s04 SHA-256 26b85c2d4ff64f218486352e4e8e770fe7bfe71a538d8366a308b56d1e9aaf87"
  - "Live inventory: 13 report files and two historical approval-bundle events without direct transaction_id"
missing_inputs: []
invalid_inputs:
  - "Prior s05/s06 receipts and implementation reviews are historical pre-contract evidence"
conflicts: []
assumptions:
  - "The validation-failure rule governs newly generated/written events; historical unbound events remain readable but never count as compliant new output."
risk_level: HIGH
next_action: "Developer reviews this amended Approach; implementation remains closed."
```

## Option Analysis

```yaml
goal: "Replace prose-derived protocol state with one typed compatibility boundary and direct event identity."
ba_lane:
  business_goal: "Completed approvals stay completed, unrelated blockers are not lost, and audit evidence stays trustworthy."
  user_scenarios:
    - "A typed pending approval clears by exact gate semantics."
    - "An unknown legacy sentence containing review, pending, receipt, or a gate alias is preserved."
    - "A later closeout cycle adds one directly attributable event; an unchanged retry adds nothing."
  business_rules:
    - "Human wording is display content, not machine state."
    - "Historical evidence is immutable."
    - "Compatibility means read without migration, not guess semantics."
  scope_notes: ["The internal persisted contract changes; public approval behavior does not."]
  open_questions: []
dev_lane:
  repo_constraints:
    - "normalizeProtocolReport is the existing shared load boundary."
    - "work-item-protocol-utils currently stringifies objects and renders scalar lists."
    - "Writers exist in protocol transition and materialization paths."
    - "workflow-gate-evidence-utils currently asserts state from text."
  technical_risks:
    - "Closeout-only conversion leaves mixed state elsewhere."
    - "A standalone model module adds a boundary without reducing migration risk."
    - "Broad legacy matching recreates the root cause."
  integration_points: ["normalizer/renderer", "writers/selectors", "gate evidence/validator", "bundle transaction", "tests/package/hosted verification"]
  nfr_notes:
    - "13/13 reports load unchanged"
    - "0 text/note reads in core behavior"
    - "20 wording mutations produce 0 semantic changes"
    - "100% direct identity equality for new approval events"
  baseline_context: "Brownfield CommonJS workflow bundle with filesystem-backed reports and receipts."
options:
  - { name: "Option A - Extend the shared protocol utility boundary", summary: "Put typed construction, legacy import, validation, selectors, and rendering helpers in work-item-protocol-utils.", pros: ["Existing load seam", "One compatibility boundary", "No new module", "Smallest complete change"], cons: ["Utility gains a cohesive state-contract responsibility", "Several writers and tests change"], risks: ["Incomplete producer inventory"] }
  - { name: "Option B - Add a dedicated protocol-state module", summary: "Route utilities, writers, validators, and renderers through a new module.", pros: ["Conceptual isolation"], cons: ["New abstraction, import surface, packaging, and ownership churn"], risks: ["Two normalization boundaries drift"] }
  - { name: "Option C - Convert closeout only and retain text matching elsewhere", summary: "Patch the currently failing selectors.", pros: ["Smaller immediate diff"], cons: ["Violates AC-RCR-09", "Preserves the hidden prose schema"], risks: ["Silent deletion and stale-state recurrence"] }
recommended_option: "Option A - Extend the shared protocol utility boundary"
recommendation_reason: "The existing universal load seam is smaller than a new module and complete where a closeout-only patch is not."
validation_plan:
  - "Fail first on object collapse, unknown legacy deletion, and missing direct event identity."
  - "Run 13-report, text mutation, writer inventory, repeat-cycle, recovery, and package matrices."
notes_for_next_step: "READY for system design and s06 after human Approach approval."
```

## Foundation Decision

```yaml
status: NOT_APPLICABLE
reason: "No stack, runtime, service, deployment model, public API, or authority boundary changes."
```

## Main Artifact

```yaml
design_problem: "English state strings are recovered with heuristics, object normalization destroys shape, assertions scan prose, and event identity lives in note."
business_rule_trace:
  - "AC-RCR-01..04 -> classify commit versus NOOP before event append"
  - "AC-RCR-03/05/09 -> typed current state and exact selectors only"
  - "AC-RCR-06 -> receipts, event, report, and s01 remain atomic"
  - "AC-RCR-07/09 -> 13 reports load through one adapter without rewrite"
  - "AC-RCR-10 -> new approval events carry journal/result transaction_id"
design_options:
  - { name: "Shared utility boundary", summary: "Recommended smallest complete structural fix." }
  - { name: "Dedicated model module", summary: "Valid but larger." }
  - { name: "Closeout text patch", summary: "Rejected root-cause preservation." }
rejected_options:
  - { name: "Dedicated model module", reason: "No separate lifecycle boundary requires it." }
  - { name: "Closeout text patch", reason: "Cannot satisfy the approved contract or predicted data-loss case." }
recommended_design: >-
  Extend work-item-protocol-utils as the single persisted-state boundary. It accepts typed entries and
  translates only known legacy strings by enumerated exact values or anchored command grammar. Unknown
  strings become {kind: legacy, text: exact_original}. All writers use one constructor. Core behavior
  receives normalized entries and clears only by exact id or kind+gate; text is never read. Rendering
  emits stable YAML mappings. Newly emitted approval-transaction events carry direct transaction_id,
  while cycle classification remains before event creation.
recommendation_reason: "This removes the root cause across consumers with no new public boundary or historical migration."
component_changes:
  - { component: "work-item-protocol-utils.js", change: "Enums, deterministic constructor, bounded adapter, shape validation, exact selectors, event normalization, structured renderer." }
  - { component: "work-item-protocol.js", change: "Typed writers and exact transition selectors; remove prose semantics." }
  - { component: "materialize-work-item.js", change: "Typed initial report blockers/actions and structure-preserving rendering." }
  - { component: "workflow-gate-review.js", change: "Pre-event cycle classification and direct transaction_id event." }
  - { component: "workflow-gate-evidence-utils.js", change: "Typed kind/gate assertions instead of text claims." }
  - { component: "validate-work-item-protocol.js", change: "Shape, unique ID, conditional gate, and new event identity checks." }
  - { component: "workflow-approval-transaction.js", change: "Retain validated supplied ID and generated default." }
  - { component: "smoke and focused tests", change: "Structured state, legacy, mutations, identity, atomicity, and parity." }
data_flow:
  - "Raw report -> normalizeProtocolReport -> typed plus preserved legacy entries"
  - "Typed entries -> validator/core exact selectors; text is not a semantic input"
  - "Typed entries -> renderer -> stable YAML mappings in s01"
  - "Receipt or pre-event state delta -> committed cycle -> one ID -> journal/result/event"
  - "All changed receipts/report/s01 -> existing atomic coordinator"
interface_changes:
  - "New blockers[] and required_actions[] writes change from strings to state-entry objects."
  - "New approval-transaction events add required transaction_id."
  - "Public CLI, receipt-v1, reviewer authority, and transaction output remain unchanged."
failure_modes:
  - { scenario: "Unknown legacy text is interpreted by similarity.", impact: "Silent blocker loss.", guardrail: "kind=legacy and selectors never target legacy." }
  - { scenario: "Adapter grammar is unanchored.", impact: "Substring becomes state.", guardrail: "Exact table or full-string command grammar." }
  - { scenario: "A producer still writes a string.", impact: "New output bypasses contract.", guardrail: "Writer inventory and raw output validation." }
  - { scenario: "Renderer flattens objects.", impact: "s01 loses parity.", guardrail: "Mapping render and parsed equality." }
  - { scenario: "Note supplies identity.", impact: "Ambiguous attribution.", guardrail: "Direct equality tests and zero note reads." }
  - { scenario: "Historical identity is backfilled.", impact: "Evidence corruption.", guardrail: "Preserve immutable pre-contract events." }
  - { scenario: "Event participates in classification.", impact: "Retry commits.", guardrail: "Receipt/pre-event state deltas only." }
compatibility_impact:
  - "13 reports stay byte-unchanged during load-only validation."
  - "Known strings normalize in memory; unknown strings preserve exact text."
  - "Historical event order/bytes stay unchanged; no identity is inferred."
  - "New writes are structured; this bundle reads both shapes."
  - "First-cycle, readiness/rejection, gate selection, receipt-v1, recovery, and authority remain compatible."
rollback_impact:
  - "Before publication, revert the isolated structural implementation commits."
  - "After publication, restore immutable v2.6.1 and guard bundled closeout."
  - "Use individual terminal gates after rollback; never rewrite historical evidence."
observability_hooks:
  - "Validator names collection/index/id/kind/gate without parsing text."
  - "Transaction output/journal/event expose exact transaction_id equality."
  - "COMMITTED versus NOOP plus parsed report/s01 parity expose cycle correctness."
  - "Compatibility reports 13/13 load and zero digest changes."
  - "Hosted evidence binds source SHA, run ID, artifact SHA-256, and parent AG-01..13."
constraints_applied: ["Strict brownfield smallest-correct delta", "TDD", "Independent two-tier review", "No migration", "No text-derived semantics"]
validation_plan:
  - "RED then GREEN for typed boundary, unknown legacy canary, and direct event identity."
  - "Exercise every producer and reject invalid generated shapes."
  - "Run at least 20 text/note mutations with identical semantic outcomes."
  - "Load 13 reports without mutation; preserve historical event prefixes."
  - "Run repeat cycle, two retries, concurrency, all failure/recovery boundaries, and report/s01 parity."
  - "Run full tests, syntax/static/security/performance review, validators, smoke, pack audit, UTF-8, and package smoke."
  - "Build one exact candidate; repeat child and parent hosted verification and terminal gates."
specialized_followups: []
notes_for_next_step: "s06 must amend owned paths, use failing-first review batches, quarantine partial T7 WIP, and keep node24 separate."
```

## Architecture Details

```yaml
state_entry:
  generated_shape: "{id, kind, text, gate?}"
  legacy_shape: "{kind: legacy, text: exact_original}"
  id_rule: "se:<full SHA-256 of collection + kind + gate-or-empty + exact source key>; opaque and never parsed"
  unique_rule: "Reject duplicate non-legacy ids in each collection."
  text_rule: "Required display content; renderer-only."
kind_vocabulary:
  gate_scoped: ["approval_pending", "gate_approval"]
  non_gate_scoped:
    - "readiness_bundle_approval"
    - "closeout_bundle_approval"
    - "readiness_bundle_rejected"
    - "closeout_bundle_rejected"
    - "resolve_readiness_rejection"
    - "resolve_closeout_rejection"
    - "work_item_activation"
    - "work_item_close"
    - "work_item_resume"
    - "blocker_resolution"
    - "workflow_followup"
    - "delivery_blocker"
    - "legacy"
legacy_adapter:
  location: "normalizeProtocolReport in work-item-protocol-utils.js"
  known: "Enumerated exact protocol phrases or full-string anchored wfc command grammar."
  unknown: "Preserve exact original as kind=legacy; never semantic-clear."
  forbidden: "Substring, fuzzy alias, Unicode boundary, or normalized-sentence inference."
selectors:
  specific: "exact id"
  gate_class: "exact kind plus exact gate"
  set_class: "explicit finite set of exact kinds"
  forbidden_input: ["text", "note"]
event_identity:
  new_transaction_event: "transaction_id required and equals coordinator journal/result"
  historical_unbound_event: "readable immutable pre-contract evidence; no inferred identity"
  noop: "no event and no transaction_id"
atomic_boundary:
  operations: ["new receipts", "typed report", "structured s01 mirror"]
  coordinator: "executeApprovalTransaction"
  classification: "receipt delta OR pre-event typed-state delta"
review_batches:
  b1: "typed normalizer, constructor, adapter, validator, renderer"
  b2: "writer conversion, exact transition selectors, gate assertions"
  b3: "event identity, repeat-cycle atomicity, compatibility, package/hosted evidence"
```

## Brownfield Impact Analysis

```yaml
owned_path_amendment_required: true
proposed_main_touch_paths:
  - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
  - "packages/workflow-bundle/scripts/work-item-protocol.js"
  - "packages/workflow-bundle/scripts/materialize-work-item.js"
  - "packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
  - "packages/workflow-bundle/scripts/validate-work-item-protocol.js"
  - "packages/workflow-bundle/scripts/workflow-approval-transaction.js"
  - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
  - "packages/workflow-bundle/test/work-item-protocol.test.js"
  - "packages/workflow-bundle/test/workflow-gate-review.test.js"
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
  - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
  - "packages/workflow-bundle/test/materialize-work-item.test.js"
existing_wip_rule: "Do not stage the current partial T7 test until s06 replaces or explicitly adopts it."
adjacent_scope_guards:
  - "Node24 bump remains one separate 18-token-only commit."
  - "Validator matrix parallelisation remains with ci-guardrails-parallelisation."
  - "No architecture-modeling restructure in this branch."
migration_notes: ["No bulk or in-place migration.", "Load-only checks preserve all 13 original digests."]
rollback_notes: ["Revert isolated structural commits before release, or restore v2.6.1 after release."]
```

## Governance Exceptions

```yaml
status: NOT_REQUIRED
reason: "The design follows the approved strict contract and keeps all human gates independent."
exceptions: []
```

## Spec Change

```yaml
status: NOT_REQUIRED
detected_in_step: "s05"
reason: "Historical unbound events remain readable, while every newly constructed transaction-backed event requires direct identity; no approved criterion is removed."
updated_artifacts: []
required_followups: []
```

## Audit

```yaml
step: "s05 Technical Approach"
status: PASS
checks:
  - { criterion: "Contract preserved", result: PASS, evidence: "text/note are render-only; unknown legacy is preserved; core selectors are exact." }
  - { criterion: "Smallest sufficient design", result: PASS, evidence: "Existing shared boundary is extended; no new module or public interface." }
  - { criterion: "All consumers covered", result: PASS, evidence: "Normalizer, writers, transitions, assertions, validator, renderer, transaction, tests, and packaging are named." }
  - { criterion: "Compatibility is honest", result: PASS, evidence: "13 reports and historical events remain unchanged; no backfill." }
  - { criterion: "Failure and release concerns covered", result: PASS, evidence: "Retry, recovery, rollback, observability, package, and hosted evidence are explicit." }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
gaps: ["Fresh digest-bound Approach receipt is pending."]
risk_level: HIGH
next_action: "Seal and verify the Developer trusted receipt against this unchanged s05 host."
```

## SDD Traceability

```yaml
requirement_refs: ["RCR-01", "RCR-02", "RCR-03", "RCR-04", "RCR-05", "RCR-06", "RCR-07", "RCR-08", "RCR-09", "RCR-10"]
acceptance_refs: ["AC-RCR-01", "AC-RCR-02", "AC-RCR-03", "AC-RCR-04", "AC-RCR-05", "AC-RCR-06", "AC-RCR-07", "AC-RCR-08", "AC-RCR-09", "AC-RCR-10"]
task_refs: []
test_refs:
  - "typed-state-contract-red-green"
  - "legacy-known-unknown-adapter-matrix"
  - "writer-inventory-and-invalid-shapes"
  - "text-note-invariance-20"
  - "direct-transaction-event-identity"
  - "repeat-cycle-retry-recovery-concurrency"
  - "13-report-no-migration-compatibility"
  - "exact-candidate-parent-ag01-ag13"
```

## Traceability

```yaml
upstream:
  - "Amended s04 SHA-256 26b85c2d4ff64f218486352e4e8e770fe7bfe71a538d8366a308b56d1e9aaf87"
  - "Spec receipt BA 2026-09-11T13:50:51.020Z"
  - "Contract receipt Developer 2026-09-11T13:51:06.341Z"
  - "DoR receipt QC 2026-09-11T13:51:18.535Z"
  - "F-AG11-001 and structural root-cause review"
outputs:
  - "Recommended shared protocol utility boundary"
  - "Exact state-entry vocabulary and deterministic identity"
  - "Bounded legacy adapter and exact selectors"
  - "Direct approval-event transaction identity"
  - "Expanded owned-path and validation proposal"
next_step: "Developer Approach review, trusted receipt, then amended s06 Task Plan"
```

## Handoff

- Recommended option: extend the existing shared protocol utility boundary; do not add another model layer.
- Non-negotiable: unknown legacy text is preserved exactly and cannot be semantically cleared.
- New approval-transaction events carry direct transaction_id; historical unbound events remain immutable pre-contract evidence.
- s06 must authorize every producer, consumer, validator, renderer, smoke, and focused-test path listed above.
- Human Developer approved the amended Approach at 2026-09-11T14:34:14Z.
- A fresh trusted receipt must match this unchanged s05 host before drafting s06.
- Implementation remains closed; the partial uncommitted T7 test is quarantined as pre-plan WIP.
