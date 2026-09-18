---
artifact_id: "terminal-archive-legacy-state-reconciliation.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
step_id: "s05"
step_slug: "technical-approach"
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
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-09-16T13:43:56Z"
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "terminal-archive-legacy-state-reconciliation.s04.acceptance-criteria.md"
linked_artifacts:
  - "product-specs/cards/terminal-archive-legacy-state-reconciliation.md"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Developer accepted Option A on 2026-09-16: keep active state and its signed resolution history in one report, and make report replacement atomic. The separate trusted Approach receipt remains pending; this review does not authorize implementation.

## Step Contract
```yaml
step: s05
goal: "Choose the smallest brownfield design that enforces the approved disposition, history, and archive contract without changing published v2.6.2 evidence."
value: "A Maintainer can resolve a specific legacy entry without silent deletion, and QC can verify what moved and who authorized it."
scope_in:
  - "Design the additive status/dispose-state CLI, report history, archive guard, and state-writer safety boundary."
  - "Define authorization, identity, retry, failure, compatibility, rollback, and validation behavior."
scope_out:
  - "Implement code or mutate live CR-008 state before s06 Task Plan and its human gate."
  - "Publish a release, change v2.6.2 evidence, or finalize either worktree."
inputs_required:
  - "Approved Spec Card REQ-TAR-01..06 and AC-TAR-01..10."
  - "Digest-bound BA Spec, Developer Contract, and QC DoR receipts for s04."
  - "Current protocol report writers, trusted approval key path, and CR-008 HOLD_OPEN fixture."
outputs_required:
  - "Compared options with one recommended design and explicit rejected alternatives."
  - "Boundary, failure, compatibility, and verification decisions ready for an execution-oriented s06 plan."
done_when:
  - "The design maps AC-TAR-01..10 to concrete code boundaries and tests."
  - "No implicit state clearing, unsigned disposition, lost update, or partial active/history move remains an accepted path."
  - "Developer reviews this exact s05 artifact and a digest-bound Approach receipt is valid."
constraints:
  hard_constraints:
    - "Never use display text to select or clear active state."
    - "Never enter ARCHIVED with active blockers or remove an active entry without its exact resolved record."
    - "Never treat --reviewed-by alone as human authorization."
  soft_constraints:
    - "Extend the existing CLI/report/key boundaries before adding a separate receipt type or datastore."
  prohibited_actions:
    - "Do not rewrite historical reports or published v2.6.2 artifacts."
    - "Do not self-pass the Approach gate."
risks:
  - id: R-TAR-S05-01
    description: "A concurrent writer overwrites newly appended history after an otherwise atomic disposition."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "All report mutation paths use one per-work-item lock; reads and writes are checked against the same snapshot under that lock."
    contingency: "Reject conflicting writes; do not ship disposition until concurrency tests prove no lost update."
    owner: developer
    status: OPEN
  - id: R-TAR-S05-02
    description: "The s01 display projection lags a committed report after a process crash."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Report remains authoritative; regenerate s01 idempotently from the report and surface a projection-repair warning."
    contingency: "Keep CR-008 HOLD_OPEN until QC confirms report and projection agree."
    owner: developer
    status: OPEN
timebox:
  target_duration: "one design and human review cycle"
  deadline: ""
  escalation_rule: "Any public contract change returns to s04 and re-seals affected gates before implementation."
```

## Option Analysis
```yaml
business_goal: "Restore truthful terminal state while retaining exact, attributable history."
ba_lane:
  locked_rules: ["REQ-TAR-01", "REQ-TAR-02", "REQ-TAR-03", "REQ-TAR-04", "REQ-TAR-05", "REQ-TAR-06"]
  validation_focus: "CR-008 remains HOLD_OPEN until two individually authorized dispositions and independent QC evidence exist."
dev_lane:
  comparison_owner: developer
  decision_boundary: "Report ownership, authorization proof, and atomic persistence; not a new stack choice."
options:
  - "A: signed single-report commit with common mutation lock"
  - "B: separate disposition receipt plus multi-file journal"
  - "C: auto-clear or prose/manual repair"
option_details:
  - id: A
    design: "One authoritative report: snapshot-bound IDs, a signed resolved_state_history record, atomic report replacement, and a common mutation lock."
    advantages: ["Active removal and history append share one atomic file image.", "Reuses the existing report and human approval key; no new receipt kind or migration."]
    costs: ["Existing report writers must join the lock.", "s01 becomes an explicitly repairable display projection after a crash."]
  - id: B
    design: "Separate trusted disposition receipt and report update committed through a generalized multi-file approval journal."
    advantages: ["Separate attestation artifact.", "Potentially atomic report and s01 projection at recovery boundaries."]
    costs: ["Adds a receipt kind, journal rules, recovery states, and more public verification surface for one bounded defect."]
  - id: C
    design: "Archive-time auto-clear or manually edit blockers using prose or entry text."
    advantages: ["Small initial code diff."]
    costs: ["Violates explicit ID and human authorization rules; preserves the root cause of silent data loss."]
recommended_option: A
recommendation_reason: "A is the smallest design satisfying AC-TAR-01..10 if the common lock and atomic report write are verified; B adds a second authority store, and C is contract-incompatible."
rejected_options: ["B: unnecessary multi-artifact transaction scope", "C: violates approved contract"]
trade_offs:
  - "Accept a derived s01 projection that may require repair; never make its write a precondition for preserving authoritative report history."
  - "Touch all competing report writers to close lost-update risk, even though the visible user feature is one command."
validate_before_implementation:
  - "Prove the existing approval key can sign a disposition without creating a new key or accepting an untrusted --reviewed-by label."
  - "Enumerate every existing report write path and establish lock order with the approval bundle transaction lock."
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes:
  - "The existing Node.js CLI, JSON report, and approval key remain the architecture baseline."
```

## Main Artifact
```yaml
design_problem: "The current archive transition accepts active blockers, and several lifecycle transitions replace entire state arrays; plain write-after-read can also lose a concurrent disposition."
business_rule_trace:
  - { rule: "Archive rejects active blockers", acceptance: [AC-TAR-01, AC-TAR-09] }
  - { rule: "Only an explicit ID and trusted Maintainer decision move active state to exact history", acceptance: [AC-TAR-02, AC-TAR-03, AC-TAR-04, AC-TAR-05] }
  - { rule: "Retries and failures cannot move or duplicate the wrong entry", acceptance: [AC-TAR-06, AC-TAR-07] }
  - { rule: "Legacy corpus and v2.6.2 evidence remain unchanged", acceptance: [AC-TAR-08, AC-TAR-10] }
design_options: ["A: signed single-report commit", "B: receipt-plus-report journal", "C: auto-clear/manual prose repair"]
rejected_options: ["B: extra two-artifact transaction surface", "C: violates explicit identity and no-inference contract"]
recommended_design: "Option A: signed, ID-selected active-to-resolved move in one atomic report replacement."
recommendation_reason: "One authoritative file already owns active state; preserving history there avoids a new receipt schema and makes removal plus append inseparable."
component_changes:
  - "work-item-protocol-utils.js: preserve and validate optional resolved_state_history[]; expose raw snapshot support, opaque target IDs, and an atomic report writer."
  - "work-item-protocol.js: add read-only disposition_targets[] to status, add dispose-state, and enforce archive plus implicit-clear guards."
  - "workflow-trusted-approval-utils.js: reuse the existing human TTY passphrase and existing keypair to sign and verify structured disposition intent without generating a new key for this operation."
  - "workflow-gate-review.js and the materializer/report writer: participate in the same per-item report mutation guard or reject replacement of an existing report."
  - "Protocol validators/tests: verify history shape and signature, terminal invariant, dual-read compatibility, and failure behavior."
data_flow:
  - "Status reads the exact report bytes, parses without writing, and derives each target ID from report SHA-256, collection, array position, and raw entry; equal text at distinct positions remains distinct."
  - "dispose-state validates operation_id/actor/reason, acquires the per-item lock, and reloads raw bytes. It checks signed history for that operation_id first: identical intent returns the prior result, while conflicting reuse rejects. Only a new operation checks an exact target ID from the locked snapshot; stale, absent, or ambiguous IDs reject."
  - "A normal-mode human TTY prompt unlocks the existing approval key; a signature covers operation_id, work item, snapshot/target identity, actor, reason, and exact original entry. A claimed reviewer name without successful signature is rejected."
  - "The selected raw entry moves once from its source array to one structured resolved_state_history record; the writer stages, flushes, and atomically renames the complete report."
  - "The s01 protocol block is a derived display projection; refresh it after commit, and provide deterministic repair if refresh fails."
interface_changes:
  - "Add status.disposition_targets[] with state_id, collection, kind, exact text; retain all existing fields."
  - "Add the approved wfc work-item dispose-state arguments and return the operation result; no --reviewed-by-only fast path."
  - "Add optional resolved_state_history[] with approved fields plus a verifiable structured authorization signature; old report readers may ignore it."
failure_modes:
  - "Active blocker at archive: reject before any report or projection write."
  - "Unknown/stale/ambiguous ID or invalid actor/reason: reject before authorization or write; never search text."
  - "Existing operation_id and identical request: return recorded result; different target/actor/reason: reject without mutation."
  - "Failure before report rename leaves pre-state; failure after rename leaves complete post-state and a repairable s01 projection."
  - "Concurrent report writer: shared lock plus snapshot check rejects a lost-update attempt; lock order is report lock before approval transaction lock."
  - "Implicit array replacement in resume/activate/block/verify/close/cancel/archive: preserve unrelated entries by structured ID or reject; no blanket clearing of opaque legacy state."
compatibility_impact:
  - "Dual-read existing raw strings and legacy objects; original_entry is taken from parsed raw report rather than a normalized copy."
  - "No bulk migration and no rewrite of v2.6.2 release artifacts or trusted receipts."
rollback_impact:
  - "Until this new runtime is verified, keep the current runtime and CR-008 HOLD_OPEN; never manually erase the parent blockers."
  - "If the new command fails after a report commit, inspect operation_id/history and repair only the derived projection; never retry against text."
observability_hooks:
  - "Expose operation_id, selected state_id, signature verification verdict, and projection-sync verdict without logging the passphrase."
  - "QC compares exact original text and history and checks independent authorization evidence before terminal acceptance."
constraints_applied:
  - "Option A must remain within the approved Spec Card public contract and strict governance profile."
  - "Normal-mode disposition cannot create a fresh approver identity or accept fixture-mode credentials as production evidence."
validation_plan:
  - "TDD first: red tests for active-blocker archive rejection, trap-word preservation, duplicate-text IDs, stale IDs, and authorization failure."
  - "Test exact raw-entry preservation, signature verification, idempotent retry/conflict, implicit-clear paths, and concurrent writers."
  - "Inject failures around staging, rename, and projection refresh; assert complete report pre-state or post-state."
  - "Recount tracked reports at s08, load every report without migration, compare every legacy text value, and exercise CR-008 parent fixture."
  - "Run protocol/pack validators, focused and full tests, static/security checks where available, and UTF-8 checks on changed text files."
specialized_followups:
  - "No architecture model or deployment manifest is needed for an in-process CLI/report boundary."
  - "After child DoD, separately route CR-008 live dispositions, QC check, terminal archive decision, and branch-finish audit."
notes_for_next_step: "s06 must assign concrete ownership for each report writer and a per-batch verify path; Approach approval alone does not open s07."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - "Option A retains the current CLI/report/key boundary and is the smallest option meeting the signed-history and atomicity criteria."
  - "The s01 projection repair trade-off and all-report-writer lock obligation are explicit and assigned to Developer validation."
  - "No stack change, historical rewrite, release action, waiver, or governance exception is proposed."
blocking_items: []
owner: developer
next_action: "Seal the human-controlled Approach receipt against this finalized s05 note."
```

## Architecture Details
```yaml
domain_boundaries:
  - "One report owns active and resolved state; status is read-only, disposition is the only explicit legacy-resolution write, and archive is guard-only."
integration_points:
  - "Existing wfc CLI dispatcher and work-item protocol runtime."
  - "Existing approval key and gate-bundle report writer; no new external service."
data_or_runtime_notes:
  - "The state_id is a snapshot token, not a durable entry ID; it expires on any report-byte change."
  - "The signed record is structured audit evidence, not a new human-controlled gate or a substitute for QC review."
  - "The report mutation lock must cover read-modify-write from all live writers, not just the final rename; a second bundle lock is acquired only inside it."
  - "s04 and the Spec Card contain historical 'receipt pending' prose, but the three external trusted receipts now show APPROVED with digest_match=true; do not edit those hashed artifacts merely to rewrite that prose."
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "packages/workflow-bundle/scripts/work-item-protocol.js"
  - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
  - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"
  - "packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "packages/workflow-bundle/scripts/materialize-work-item.js, only to close existing-report overwrite risk"
  - "Focused protocol/approval tests and validators"
compatibility_risks:
  - "Normalizing the selected raw string before archiving it would change original_entry."
  - "A direct writer outside the common lock could erase signed history."
  - "Old consumers may ignore optional history, so verification must inspect the new field explicitly."
migration_notes:
  - "None; new field is optional on load and only appended for explicit dispositions."
rollback_notes:
  - "No existing release/tag rollback or mutation is part of CR-009; keep v2.6.2 evidence immutable."
  - "Preserve the CR-008 worktree and HOLD_OPEN state until independent child and parent checks pass."
```

## Traceability
```yaml
upstream:
  - "product-specs/cards/terminal-archive-legacy-state-reconciliation.md"
  - "terminal-archive-legacy-state-reconciliation.s04.acceptance-criteria.md"
  - "changes/CR-009/proposal.md"
acceptance_criteria_ids: [AC-TAR-01, AC-TAR-02, AC-TAR-03, AC-TAR-04, AC-TAR-05, AC-TAR-06, AC-TAR-07, AC-TAR-08, AC-TAR-09, AC-TAR-10]
next_step: "s06 Task Plan only after Developer Approach approval and a matching trusted receipt"
```

## Audit
```yaml
step: s05
status: PARTIAL
checks:
  - { criterion: "Options compared and a contract-compatible design recommended", result: PASS, evidence: "Option Analysis A/B/C and approved Spec Card" }
  - { criterion: "Every AC has a boundary and verification direction", result: PASS, evidence: "Main Artifact business_rule_trace and validation_plan" }
  - { criterion: "Implicit clears, concurrency, and partial writes have a handling plan", result: PASS, evidence: "failure_modes, shared-lock strategy, and atomic single-report commit" }
  - { criterion: "Developer Approach review is recorded", result: PASS, evidence: "User accepted Option A; gate_reviews.approach_reviewed_by=developer, approach_reviewed_at=2026-09-16T13:43:56Z" }
  - { criterion: "Digest-bound Approach trusted receipt exists", result: FAIL, evidence: "No trusted receipt has been sealed yet" }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Draft prepared during the current s05 authoring cycle."
gaps:
  - "Developer must seal the digest-bound trusted Approach receipt before s06 is finalized."
risk_level: MEDIUM
next_action: "Developer runs the interactive wfc gate approve command for Approach; verify APPROVED with digest_match=true."
```

## Handoff
- Recommended option: A, a signed, atomic active-to-resolved move inside the existing report.
- Accepted trade-off: the s01 protocol block is a repairable projection; all report writers must honor one lock.
- Condition for s06: Developer review is recorded; a matching trusted Approach receipt must still be sealed.
- No deployment or release action is authorized by this design proposal.
