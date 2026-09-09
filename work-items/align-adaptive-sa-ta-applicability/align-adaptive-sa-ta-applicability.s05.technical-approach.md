---
artifact_id: "align-adaptive-sa-ta-applicability.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "align-adaptive-sa-ta-applicability"
step_id: "s05"
step_slug: "technical-approach"
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
  spec_reviewed_at: "2026-09-08T10:55:26Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-09-08T10:55:26Z"
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-09-08T10:55:26Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-09-08T10:55:26Z"
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
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "align-adaptive-sa-ta-applicability.s04.acceptance-criteria.md"
linked_artifacts:
  - "align-adaptive-sa-ta-applicability.work-item-report.json"
  - "../../packages/workflow-bundle/scripts/workflow-adaptive-governance.js"
  - "../../packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "../../packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
  - "../../packages/workflow-bundle/test/scaffold-workflow.test.js"
  - "../../packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
  - "../../packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js"
  - "../../policies/codex/AGENTS.global.md"
  - "../../packages/workflow-bundle/runtime/codex/AGENTS.global.md"
  - "../../packages/workflow-bundle/runtime/claude/AGENTS.global.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../changes/CR-008"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Developer re-approved Option A for the metadata-only `review_mode=independent` rebind at
> `2026-09-08T10:55:26Z`. The technical direction, behavior boundary, and validation plan are
> unchanged; a refreshed Approach receipt must still be human-sealed before resumed candidate
> creation.

## Step Contract
```yaml
step: "s05 Technical Approach"
goal: >-
  Produce a Developer-reviewable design that resolves CF-019 through the smallest policy and test
  delta while preserving exact adaptive-router behavior and CR-008 candidate traceability.
value: >-
  Remove the authority contradiction without creating a second source of truth, widening the
  runtime surface, or forcing implementation to rediscover boundaries and verification order.
scope_in:
  - "Compare policy-precedence repair options"
  - "Lock canonical source and generated runtime ownership"
  - "Lock fail-first semantic and exact trigger-role verification"
  - "Model compatibility, failure, rollback, and observability"
  - "Correct the non-semantic Claude runtime path reference for downstream execution"
scope_out:
  - "Edit production policy or tests"
  - "Change workflow-adaptive-governance.js behavior"
  - "Add or rename reasons, triggers, roles, gates, or schemas"
  - "Modify SA/TA skill contracts"
  - "Approve Approach or Task Plan"
  - "Release, merge, tag, publish, or install CR-008"
inputs_required:
  - "Spec, Contract, and DoR trusted receipts with digest_match=true"
  - "AC-AR-01..10 and EDGE-AR-01..07"
  - "Approved OQ-AR-001 Option B and OQ-AR-002 Option A"
  - "Current canonical policy, router module, semantic fixtures, sync script, and parity suite"
outputs_required:
  - "Two-to-three option comparison with one recommendation"
  - "System-design artifact with exact component and interface boundaries"
  - "Brownfield impact and rollback analysis"
  - "Fail-first and regression validation plan"
  - "Developer approval handoff"
done_when:
  - "At least two materially different options are compared"
  - "The smallest correct option is recommended with explicit trade-offs"
  - "Component, data-flow, interface, and test ownership are unambiguous"
  - "Failure, compatibility, rollback, and observability lanes are complete"
  - "No implementation authority is inferred from authoring the approach"
constraints:
  hard_constraints:
    - "The router remains the sole executable authority for role applicability"
    - "The existing six-trigger role/reason matrix is unchanged"
    - "The canonical policy remains the source for both runtime policy copies"
    - "The existing reason-code allowlists and output shapes remain unchanged"
    - "TDD must demonstrate the current policy contradiction before the policy edit"
    - "The approved s04 artifact must not be edited because all three receipts bind its current hash"
  soft_constraints:
    - "Prefer one focused policy paragraph and one existing canonical semantic fixture"
    - "Use existing sync and parity mechanisms rather than manual runtime duplication"
  prohibited_actions:
    - "Add a self-decline mechanism to SA/TA skills"
    - "Create a new policy-generation subsystem for one contradiction"
    - "Weaken assertions or change router behavior to make the policy text pass"
    - "Edit packaged runtime policies manually as independent sources"
    - "Treat a green test as Approach approval"
  compliance_checks:
    - "Option Analysis has 2-3 options and one recommended option"
    - "Brownfield Impact Analysis names every expected touch surface"
    - "Validation starts with a RED test and includes parity plus pack audit"
    - "No foundation or child release gate is opened"
risks:
  - id: "R-S05-AR-001"
    description: "A brittle phrase assertion passes or fails for formatting instead of semantics."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Extract the Skill Requirement section and assert the complete precedence contract plus removal of the unconditional form."
    contingency: "Refine the semantic helper without weakening the accepted behavior."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S05-AR-002"
    description: "Manual runtime edits create copy drift or write to the wrong Claude path."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Edit only the canonical policy and regenerate runtime copies with the existing sync script."
    contingency: "Restore generated copies from canonical source and rerun byte-parity checks."
    owner: "developer"
    status: MONITORING
timebox:
  target_duration: "one bounded option and design pass"
  deadline: "before s06 Task Plan"
  escalation_rule: "Return to s03/s04 if implementation requires a new trigger, reason code, or public contract behavior."
```

## Option Analysis
```yaml
goal: "Resolve the unconditional SA/TA policy contradiction without changing correct router behavior."
ba_lane:
  business_goal: "Eliminate irrelevant architecture-role ceremony while retaining architecture review for named risk triggers."
  user_scenarios:
    - "A no-trigger maintenance request proceeds with Developer and QC only."
    - "A public-contract or other named trigger still receives its exact architecture roles."
  business_rules:
    - "Router-derived applicability precedes generic skill-selection guidance."
    - "Applicable does not mean human-approved."
    - "Hard-risk escalation cannot be weakened by a low-ceremony preference."
  scope_notes:
    - "This is a policy-authority defect, not a router-algorithm redesign."
    - "The child remains a focused CR-008 candidate contribution."
  open_questions: []
dev_lane:
  repo_constraints:
    - "policies/codex/AGENTS.global.md is the canonical global policy."
    - "Runtime Codex and Claude policies are generated copies and must remain byte-equivalent to canonical."
    - "workflow-adaptive-governance.test.js is the approved semantic fixture owner."
    - "Existing trigger, role, gate, and reason constants are compatibility surfaces."
  technical_risks:
    - "A text-only keyword assertion misses the authority relationship."
    - "An overbroad repair suppresses SA/TA for hard-trigger cases."
    - "Editing generated runtime files independently creates parity drift."
  integration_points:
    - "Canonical policy -> sync-workflow-bundle-runtime.js -> Codex/Claude runtime policies"
    - "Router decisions -> policy skill-selection behavior"
    - "Canonical semantic fixture -> runtime byte-parity and pack-audit evidence"
  nfr_notes:
    - "20 repeated evaluations remain deeply deterministic."
    - "All six hard triggers retain exact positive and negative role evidence."
    - "No new runtime dependency, startup cost, telemetry field, or data migration is introduced."
  baseline_context: >-
    Brownfield router behavior is already correct; the defect is the unconditional sentence in all
    three aligned policy surfaces. The generated Claude source path is runtime/claude/AGENTS.global.md.
options:
  - "Option A - Canonical policy precedence plus existing semantic fixture"
  - "Option B - Introduce a generated shared policy fragment"
  - "Option C - Make SA/TA skills self-decline or alter router derivation"
recommended_option: "Option A - Canonical policy precedence plus existing semantic fixture"
recommendation_reason: >-
  Option A is the smallest solution that meets AC-AR-01..10: it corrects the policy authority seam,
  uses approved existing owners, and preserves every executable compatibility surface. Options B
  and C add boundaries without solving a current requirement better.
option_details:
  - name: "Option A - Canonical policy precedence plus existing semantic fixture"
    summary: >-
      Add an explicit router-authority clause to the canonical Skill Requirement, add fail-first
      semantic and exact trigger-role assertions to workflow-adaptive-governance.test.js, then run
      the existing runtime sync and parity checks.
    pros:
      - "Smallest delta at the actual authority seam."
      - "Keeps one canonical policy source and one canonical semantic test owner."
      - "Preserves router, schemas, reason codes, and SA/TA contracts."
    cons:
      - "The semantic fixture must inspect policy content as well as executable router output."
    risks:
      - "Poorly chosen text assertions could be brittle; section-level contract checks are required."
  - name: "Option B - Introduce a generated shared policy fragment"
    summary: >-
      Move adaptive applicability prose into a new reusable fragment or generator consumed by the
      canonical and runtime policies.
    pros:
      - "Could centralize future wording changes."
    cons:
      - "Adds a new generation boundary and test surface for one focused contradiction."
      - "Duplicates capabilities already supplied by canonical-source runtime sync."
    risks:
      - "More files and transformation logic increase release and maintenance risk."
  - name: "Option C - Make SA/TA skills self-decline or alter router derivation"
    summary: "Add defensive applicability logic inside the role skills or change the correct router algorithm."
    pros:
      - "Could mask unconditional caller behavior."
    cons:
      - "Invokes irrelevant roles before declining and leaves the authority contradiction intact."
      - "Moves admission ownership into the wrong boundary and expands compatibility scope."
    risks:
      - "Multiple sources of truth can disagree and miss hard-trigger coverage."
validation_plan:
  - "Add the semantic precedence and exact trigger-role assertions first; run them RED against the current policy."
  - "Change only the canonical policy and run the runtime sync script."
  - "Run adaptive-governance semantic tests, runtime parity, scaffold integration, SA/TA contract regression, and workflow-pack audit."
  - "Verify the changed text files as UTF-8 and bind the exact child candidate to parent CR-008 verification."
notes_for_next_step: "Developer re-approved unchanged Option A for the metadata-only rebind; seal a refreshed digest-valid Approach receipt before resumed candidate creation."
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes:
  - "No stack, runtime, deployment model, or architectural foundation changes."
  - "The existing canonical-policy and runtime-sync architecture remains authoritative."
```

## Main Artifact
```yaml
design_problem: >-
  The executable router conditionally derives SA/TA correctly, but generic Skill Requirement prose
  can re-add both roles unconditionally at s01-s04; resolve that conflict without changing router behavior.
business_rule_trace:
  - "AC-AR-01 -> generic skill guidance defers to router applicability."
  - "AC-AR-02/03 -> non-delivery and no-trigger maintenance keep zero SA/TA obligations."
  - "AC-AR-04/05/06 -> exact trigger-role-reason behavior and determinism stay unchanged."
  - "AC-AR-07/08/09 -> semantic fixture ownership, generated runtime parity, and regression boundaries remain explicit."
  - "AC-AR-10 -> exact candidate hands back to CR-008 without child release actions."
design_options:
  - name: "Option A"
    summary: "Canonical policy precedence clause, existing semantic fixture extension, then generated runtime sync."
    pros:
      - "Smallest correct delta"
      - "No new source of truth"
      - "Direct fail-first evidence"
    cons:
      - "One semantic test now reads policy sections as well as router output"
    risks:
      - "Text-contract checks must avoid irrelevant formatting sensitivity"
  - name: "Option B"
    summary: "New reusable policy fragment or generation subsystem."
    pros:
      - "Centralized prose fragment"
    cons:
      - "Unnecessary abstraction and expanded release surface"
    risks:
      - "Transformation and packaging drift"
  - name: "Option C"
    summary: "Self-declining role skills or router behavior changes."
    pros:
      - "Defensive behavior at downstream boundaries"
    cons:
      - "Wrong ownership and irrelevant invocation remains"
    risks:
      - "Conflicting applicability authorities"
rejected_options:
  - name: "Option B"
    reason: "Canonical-source runtime sync already provides one-source propagation; a new generator adds no required value."
  - name: "Option C"
    reason: "The router is already correct and SA/TA skills must not own workflow admission."
recommended_design: >-
  Extend workflow-adaptive-governance.test.js with a fail-first policy-precedence contract and exact
  six-trigger role/reason expectations. After RED is captured, replace the unconditional generic
  SA/TA sentence in policies/codex/AGENTS.global.md with wording that applies each role only when the
  router marks it applicable and forbids generic guidance from re-adding omitted/not-applicable roles.
  Generate both runtime copies through sync-workflow-bundle-runtime.js and validate byte parity.
recommendation_reason: >-
  This changes only the contradictory authority statement and its canonical evidence. It reuses the
  existing router, reason vocabulary, test owner, sync mechanism, and parity suite, so it meets the
  accepted contract with the lowest compatibility and rollback risk.
component_changes:
  - component: "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
    change: "Add fail-first section-level policy precedence checks and exact per-trigger role/reason positive and negative assertions."
  - component: "policies/codex/AGENTS.global.md"
    change: "Replace the unconditional SA/TA mandate with explicit router-authoritative conditional selection."
  - component: "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js"
    change: "No code change expected; execute the existing generator to refresh managed runtime copies."
  - component: "packages/workflow-bundle/runtime/codex/AGENTS.global.md"
    change: "Generated output only; must byte-match canonical policy."
  - component: "packages/workflow-bundle/runtime/claude/AGENTS.global.md"
    change: "Generated output only; must byte-match canonical policy."
  - component: "packages/workflow-bundle/scripts/workflow-adaptive-governance.js"
    change: "No change expected; current executable role mapping remains the protected baseline."
data_flow:
  - "Normalized request -> adaptive router -> reasoned applicable roles/gates -> generic skill selection defers to that decision."
  - "Canonical policy edit -> runtime sync -> Codex and Claude generated policy copies -> byte-parity verification."
  - "Fail-first semantic matrix -> policy correction -> targeted regressions -> parent candidate verification."
interface_changes:
  - interface: "Global workflow policy"
    change: "Clarify precedence: SA/TA apply only when the router's reasoned output selects them."
    compatibility: "Clarification removes contradictory obligations; it does not change router inputs, outputs, schemas, or reason codes."
  - interface: "Adaptive governance evidence"
    change: "Add exact trigger-role/reason and policy-precedence expectations to the canonical fixture."
    compatibility: "Existing fixtures and public reason values remain intact."
failure_modes:
  - scenario: "The new wording is present but still permits generic guidance to re-add an omitted role."
    impact: "No-trigger users continue to face irrelevant SA/TA ceremony."
    guardrail: "Section-level semantic assertion requires router authority, applicable-only selection, and explicit no-re-add behavior."
  - scenario: "The repair suppresses SA or TA for a named hard trigger."
    impact: "Architecture risk can bypass required analysis."
    guardrail: "Exact six-trigger positive/negative role and reason matrix must pass."
  - scenario: "Only one policy copy changes or Claude uses the wrong target path."
    impact: "Installed clients behave differently from repository source."
    guardrail: "Canonical-only edit, existing sync, and byte-parity test across runtime/codex and runtime/claude AGENTS.global.md."
  - scenario: "Implementation discovers a missing reason or router defect."
    impact: "The approved contract and scope are no longer sufficient."
    guardrail: "Stop implementation and return to s03/s04; do not silently expand the delta."
compatibility_impact:
  - "No API, CLI flag, JSON/YAML schema, receipt, workflow-state, or data-format change."
  - "No change to LANE_*, HARD_*, ROLE_*, or GATE_* values or ordering."
  - "No change to SA/TA skill input/output contracts."
  - "Generated runtime policy bytes change together and remain mutually identical."
rollback_impact:
  - "Revert the focused canonical policy and test commit, then rerun runtime sync to restore both generated copies."
  - "No data rollback, migration, key rotation, or receipt rewrite is required."
  - "Parent release rollback remains v2.6.1; parent candidate verification must be refreshed after either apply or revert."
observability_hooks:
  - "RED/GREEN output from workflow-adaptive-governance.test.js for precedence and trigger-role semantics."
  - "workflow-bundle-runtime-parity.test.js byte-equivalence result for both runtimes."
  - "workflow-pack audit hard-rule and cross-reference results."
  - "No new production telemetry: this policy-only behavior is observed through deterministic tests and parent candidate evidence."
constraints_applied:
  - "OQ-AR-001 Option B: existing reason allowlists are normative."
  - "OQ-AR-002 Option A: adaptive-governance test owns the semantic matrix."
  - "Brownfield smallest-correct-delta discipline."
  - "Source policy is canonical; runtime copies are generated artifacts."
  - "TDD and two-tier review remain mandatory at s07."
validation_plan:
  - "RED: add policy precedence plus exact trigger-role/reason assertions and prove current policy fails for the intended reason."
  - "GREEN: edit only canonical policy, run runtime sync, and rerun the canonical semantic suite."
  - "REGRESSION: run runtime parity, scaffold integration, SA/TA contract, policy smoke, and workflow-pack audit suites."
  - "QUALITY: run workflow validators, diff check, and UTF-8 checks for all changed text files."
  - "HANDOFF: bind the exact child commit/SHA to refreshed CR-008 parent verification."
specialized_followups:
  - skill: "none"
    reason: "No frontend, domain, database, packaging, deployment, or new system-boundary design is introduced."
notes_for_next_step: >-
  s06 should split fail-first fixture work, canonical policy edit, runtime generation, targeted regressions,
  two-tier review, and exact-candidate handoff into ordered tasks with explicit owned paths.
```

## Architecture Details
```yaml
domain_boundaries:
  - "Applicability authority: workflow-adaptive-governance.js remains executable source of role/gate derivation."
  - "Human-readable authority: policies/codex/AGENTS.global.md must defer to the router."
  - "Runtime distribution: sync-workflow-bundle-runtime.js owns generated Codex and Claude copies."
  - "Semantic evidence: workflow-adaptive-governance.test.js owns applicability behavior."
integration_points:
  - "workflow-bundle-runtime-parity.test.js proves canonical/generated byte equivalence."
  - "scaffold-workflow.test.js proves reasoned role integration remains intact."
  - "architecture-role-skills-contract.test.js proves SA/TA output contracts do not regress."
  - "audit-workflow-pack.js provides hard-rule and cross-reference guardrails."
data_or_runtime_notes:
  - "No persistent data or runtime service changes."
  - "Correct generated Claude source path is packages/workflow-bundle/runtime/claude/AGENTS.global.md."
  - "PATH-CORRECTION-AR-001 corrects an s04 linked-artifact filename only; accepted behavior and receipt-bound s04 content remain unchanged."
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "policies/codex/AGENTS.global.md"
  - "packages/workflow-bundle/runtime/codex/AGENTS.global.md (generated)"
  - "packages/workflow-bundle/runtime/claude/AGENTS.global.md (generated)"
compatibility_risks:
  - "Policy readers may previously have interpreted the unconditional sentence as stronger than router output."
  - "Overbroad wording can accidentally suppress named-trigger architecture roles."
  - "Generated copies can drift if the sync step is skipped or manual edits are introduced."
migration_notes:
  - "No data, schema, configuration, receipt, or runtime migration."
  - "Runtime copies are regenerated in place from the canonical source."
rollback_notes:
  - "Revert the focused child change and regenerate runtime copies."
  - "Retain the CR-008 worktree until child DoD and parent exact-candidate verification complete."
  - "Use v2.6.1 as the parent release rollback baseline."
```

## Audit
```yaml
step: "s05 Technical Approach authoring"
status: PASS
checks:
  - criterion: "At least two materially different options are compared"
    result: PASS
    evidence: "Option Analysis compares three ownership and implementation directions."
  - criterion: "The smallest correct option is recommended with explicit trade-offs"
    result: PASS
    evidence: "Option A changes one canonical policy seam and one existing semantic owner; Options B/C are rejected with reasons."
  - criterion: "Component, data-flow, interface, and test ownership are unambiguous"
    result: PASS
    evidence: "Main Artifact and Architecture Details identify canonical, generated, executable, and evidence boundaries."
  - criterion: "Failure, compatibility, rollback, and observability lanes are complete"
    result: PASS
    evidence: "All four mandatory system-design perspectives contain concrete evidence and guardrails."
  - criterion: "No implementation authority is inferred from authoring the approach"
    result: PASS
    evidence: "Artifact is finalized with renewed Developer review provenance; the refreshed trusted receipt still blocks resumed candidate creation."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one bounded option and design pass after all s04 receipts passed."
gaps:
  - "The refreshed trusted Approach receipt remains pending against the amended artifact digest."
risk_level: MEDIUM
next_action: "Human re-seals the Approach receipt as Developer and validates digest_match before resumed candidate creation."
```

## Human Gate Decision
```yaml
gate: "approach"
status: "APPROVED_PENDING_RECEIPT"
reviewed_by: ["developer"]
reviewed_at: "2026-09-08T10:55:26Z"
decision_source: "User explicitly re-approved the unchanged Approach with role Developer for the metadata-only review_mode=independent rebind."
selected_option: "Option A - Canonical policy precedence plus existing semantic fixture"
```

## Traceability
```yaml
upstream:
  - "align-adaptive-sa-ta-applicability.s04.acceptance-criteria.md"
  - "Spec receipt: APPROVED, digest_match=true, reviewed_by=ba"
  - "Contract receipt: APPROVED, digest_match=true, reviewed_by=developer"
  - "DoR receipt: APPROVED, digest_match=true, reviewed_by=qc with BA/QC note provenance"
acceptance_refs:
  - "AC-AR-01..10"
  - "EDGE-AR-01..07"
design_refs:
  - "Option A"
  - "PATH-CORRECTION-AR-001"
next_step: "Seal the refreshed Approach trusted receipt; resume candidate creation only after digest_match=true"
```

## Handoff
- Recommended option: Option A — canonical policy precedence plus existing semantic fixture.
- Accepted trade-off: the canonical semantic test reads a bounded policy section in addition to executable router output.
- Human review: Developer re-approved unchanged Option A at 2026-09-08T10:55:26Z for the metadata-only rebind.
- Resume condition: human re-seals the Approach receipt as Developer and verifies digest_match=true.
- Deployment note: no deployment design; parent CR-008 retains release and rollback ownership.
