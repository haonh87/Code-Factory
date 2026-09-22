---
artifact_id: "materialization-dedup-recovery.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "materialization-dedup-recovery"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: BUG
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/materialization-dedup-recovery.md"
spec_status: draft
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
  - "HARD_SECURITY_SENSITIVE"
role_reasons:
  po:
    - "ROLE_PO_PRODUCT_OUTCOME"
  ba:
    - "ROLE_BA_REQUIREMENTS"
  sa:
    - "ROLE_SA_PUBLIC_CONTRACT_BOUNDARY"
  ta:
    - "ROLE_TA_PUBLIC_CONTRACT_RISK"
    - "ROLE_TA_SECURITY_RISK"
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
  source_version: "2.6.3"
  installed_versions:
    - "2.6.3"
    - "2.6.3"
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
  - "materialization-dedup-recovery.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Proposed explicit resume mode on the existing materializer, with preserved report identity and retry evidence. Approach review remains pending.

## Step Contract

```yaml
step_goal: "Propose the smallest recoverable continuation without weakening approval."
input_summary: ["Draft SRS AC-DR-01..08", "Current materializer/scaffolder/report helpers"]
output_summary: ["Option comparison", "Boundaries and failure handling", "Verify path"]
done_when: ["A reviewer can assess data mutation, retry, rollback and authority boundaries"]
owner: developer
```

## Option Analysis

```yaml
options:
  - name: explicit_resume
    summary: "Add a separate resume branch within materializeWorkItem, operating on an existing report without re-analysis."
    pros: ["Preserves approve semantics", "Reuses scaffold/state helpers", "Makes recovery deliberate"]
    cons: ["Requires one public CLI mode and optional recovery metadata"]
  - name: approve_also_materializes
    summary: "Promote and scaffold while approving a work item."
    pros: ["One fewer command"]
    cons: ["Mixes signing and filesystem mutation", "Expands approval failure/rollback semantics", "Does not solve unsigned READY continuation cleanly"]
  - name: manual_report_rewrite
    summary: "Edit statuses or recreate a blocked proposal."
    pros: []
    cons: ["Loses provenance or bypasses control ownership; rejected"]
recommended_option: explicit_resume
trade_offs: ["Existing per-entry Maintainer disposition interactions are retained; batching is outside scope."]
```

## Foundation Decision

```yaml
status: NOT_APPLICABLE
solution_class: "Existing local CLI"
selected_stack: []
selected_runtime: []
decision_notes: ["No foundation change is proposed."]
```

## Main Artifact

```yaml
design_problem: "Persisted candidates cannot resume authoring; re-analysis treats the same folder as a collision."
business_rule_trace: ["SRS-FR-001..004", "SRS-NFR-001..003"]
recommended_design: "Preflight an existing raw report, scaffold missing owned notes, atomically commit the bounded lifecycle change, then refresh the managed projection."
recommendation_reason: "Uses existing locks, compare-before-write, signature verification and scaffold validation; no new signing authority or workflow state."
component_changes: ["materialize-work-item.js resume dispatch and preflight", "work-item-protocol-utils.js recovery metadata preservation/validation", "scaffold-workflow.js internal missing-only authoring", "Shared verification of recorded state dispositions"]
data_flow: ["Read original report bytes under work-item lock", "Validate exact input hash, supported shape, identity, history and paths", "Create only missing notes and validate owned existing notes", "Commit raw report with preserved originals and one recovery record", "Refresh s01 projection and synchronize capability state"]
interface_changes: ["SRS proposed CLI/report contract"]
failure_modes:
  - scenario: "Invalid eligibility, signature, snapshot or conflicting note"
    impact: "Unsafe or ambiguous recovery"
    guardrail: "Reject before any scaffold/report/projection/capability/telemetry mutation"
  - scenario: "Failure while creating missing notes"
    impact: "Some new authoring drafts exist, report still at original state"
    guardrail: "Keep original report unchanged and preserve all existing notes; retry validates identity and creates only the remainder"
  - scenario: "Report commit succeeds but projection refresh fails"
    impact: "Source state committed, projection stale"
    guardrail: "Report explicit committed operation ID; identical retry repairs projection without duplicate history/events"
  - scenario: "Concurrent writer changes source"
    impact: "Lost update"
    guardrail: "Existing per-item lock plus byte comparison immediately before atomic rename"
compatibility_impact: ["Keep legacy and adaptive fields and all unknown raw fields", "Preserve optional recovery metadata across normal protocol transitions", "Default materialize refuses to overwrite any existing report and points to explicit resume"]
rollback_impact: ["Before report commit, retain original report and partial drafts for retry", "After commit, prefer projection repair; never reset signed history or a materialized state silently", "Installed 2.6.3 stays unchanged in this item"]
observability_hooks: ["Explicit APPLIED/NOOP/refusal result with operation ID and projection status", "Local test evidence only; no telemetry unless already opted in"]
constraints_applied: ["No force overwrite", "No new receipt format or passphrase path", "Materialized result stays pending approval with no write grants"]
validation_plan: ["s06 task verification matrix"]
specialized_followups: []
notes_for_next_step: "All choices remain proposed; require the actual Approach receipt before s07."
```

## Architecture Details

Resume is dispatched before new-request analysis. It never tokenizes a new request or executes `scaffold_actions` shell strings from the report. Validate identity and in-project paths; derive scaffold arguments from validated canonical fields and compare any duplicate candidate/top-level fields. An existing note must match the slug/step metadata and remain byte-identical outside the CLI-owned s01 projection. Reject symlink/path escapes and collisions before writes.

For near-match proposals, verify every referenced signed disposition and its mirror fields using the same checks as `dispose-state` retry; require the exact materializer-owned near-match blocker and clarification/review followups to be resolved. Zero current blockers/actions is necessary but not sufficient: unsigned deletion is rejected. Signed disposition establishes that admission concerns were resolved; it is not a work-item or gate approval. READY/no_conflict candidates require no extra disposition; only their known scaffold/validation actions can be consumed by ownership ID.

Under the same report lock, compare the caller's expected SHA-256 before work and raw bytes again before commit. Never rewrite the raw report through a normalizer that drops unknown fields. Append lifecycle evidence and recovery metadata only after authoring validation. Preserve the original candidate snapshot and decision history; distinguish historical `work_items[].blockers` from current top-level blockers in documentation.

## Brownfield Impact Analysis

```yaml
impacted_modules: ["Materializer", "Scaffold helper", "Report normalization/validation", "Read-only recorded-disposition verifier"]
compatibility_risks: ["Older clients may not preserve newly added optional recovery metadata; do not use an old writer for resumed proposals."]
migration_notes: ["No bulk migration; unsupported reports are rejected without change."]
rollback_notes: ["Recovery does not alter installed global/harness packages or released artifacts."]
```

## Traceability

```yaml
upstream: ["materialization-dedup-recovery.s04.acceptance-criteria.md"]
next_step: "s06 draft task plan"
```

## Handoff

Recommended option is explicit_resume. Review particularly the three existing signed admission dispositions and the preflight zero-write guarantee. No implementation is authorized yet.
