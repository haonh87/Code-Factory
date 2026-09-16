---
artifact_id: "closeout-bundle-repeat-cycle-reconciliation.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-repeat-cycle-reconciliation"
step_id: "s02"
step_slug: "business-goal"
workflow_stage: discovery
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
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "not_applicable"
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
  contract: []
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
  contract_reviewed_by: []
  contract_reviewed_at: ""
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.s01.restate.md"
linked_artifacts:
  - "closeout-bundle-repeat-cycle-reconciliation.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../changes/CR-008/spec-delta/srs.delta.md"
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Restore trust in a completed closeout cycle. A successful reviewed interaction must leave no
> stale approval prompt or pre-closeout handoff, must append exactly one auditable event for that
> cycle, and must remain a no-op when the unchanged request is retried. The correction stays
> bounded to reconciliation and does not redesign human authority, receipts, or the lifecycle.

## Business Goal Review
```yaml
status: APPROVED
reviewed_by: "po"
reviewed_at: "2026-09-10T01:36:42Z"
decision_source: "User explicitly approved Business Goal and instructed continuation to s03 Open Questions."
effect: "s03 authoring is open; no Spec, DoR, Approach, Task Plan, implementation, or terminal gate is implied."
```

## Step Contract
```yaml
step: "s02 Business Goal"
goal: >-
  Lock the user value, business outcome, measurable success conditions, priority, and non-goals
  for F-AG11-001 without selecting a technical correction.
value: >-
  Ensure the defect is judged by whether a human can trust that one completed closeout is truly
  acknowledged everywhere, rather than by whether one command merely returned success.
scope_in:
  - "Operator-visible completion after a successful repeated closeout"
  - "Audit clarity for the current cycle while preserving historical evidence"
  - "Idempotent behavior for an unchanged retry"
  - "Consistent next-action and handoff state across persisted workflow surfaces"
  - "Parent CR-008 corrected-candidate re-verification before terminal reapproval"
scope_out:
  - "Selecting a cycle identifier, reconciliation algorithm, helper, or code boundary"
  - "Changing the trusted-receipt schema, signer, passphrase flow, or approval authority"
  - "Reopening the resolved legacy mandatory-DoD gate-selection defect"
  - "Redesigning the generic workflow lifecycle or adding a VERIFIED-to-s07 transition"
  - "Publishing, tagging, merging, installing, cleaning up, or finalizing the worktree"
inputs_required:
  - "Verified PO work-item receipt recorded at 2026-09-09T13:53:59.942Z"
  - "s01 clarification, RCR-01..06 draft criteria, and SA/TA driver handoff"
  - "Parent F-AG11-001 evidence from the repeated closeout cycle"
  - "CR-008 AG-11 and REQ-AG-009 completion-state requirements"
outputs_required:
  - "Product Thinking record using the canonical schema"
  - "Observable success outcomes and numeric KPI targets"
  - "Explicit business invariants and non-goals"
  - "A bounded handoff to s03 Open Questions"
done_when:
  - "The user problem distinguishes command success from trustworthy workflow completion"
  - "Stale prompts, current-cycle events, surface agreement, and retry idempotency have separate targets"
  - "Every success outcome is observable in persisted artifacts or runtime evidence"
  - "Non-goals protect authority, receipt, lifecycle, prior-defect, and release boundaries"
  - "No technical option or implementation path is selected"
constraints:
  hard_constraints:
    - "A committed closeout cycle leaves zero satisfied approvals represented as pending"
    - "Each committed cycle contributes exactly one current-cycle closeout event"
    - "An unchanged retry contributes zero receipts, events, or derived-state writes"
    - "Historical receipts and protocol events remain readable and unmodified"
    - "One interaction never collapses the independent authority or receipt of an applicable gate"
    - "Parent CR-008 remains blocked until a corrected exact candidate is re-verified and reapproved"
  soft_constraints:
    - "Keep the business scope small enough for the smallest correct brownfield delta"
    - "Prefer outcome language that an operator, reviewer, and release owner can verify"
  prohibited_actions:
    - "Choose an implementation or architecture in s02"
    - "Treat historical terminal receipts as current release authority"
    - "Infer approval for Spec, DoR, Approach, Task Plan, DoD, Release, or Business Acceptance"
    - "Authorize publication, tag movement, merge, install, cleanup, or branch finalization"
  compliance_checks:
    - "RCR-01 measures zero stale pending surfaces after success"
    - "RCR-02 measures one event for each committed current cycle"
    - "RCR-03 measures canonical next action and handoff agreement"
    - "RCR-04 measures a zero-write unchanged retry"
    - "RCR-05 preserves independent authority and existing regression behavior"
    - "RCR-06 requires parent exact-candidate re-verification"
risks:
  - id: "R-S02-RC-001"
    description: "The correction could remove visible prompts while leaving audit-cycle identity ambiguous."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Measure stale-state cleanup and current-cycle event creation as independent invariants."
    contingency: "Keep F-AG11-001 open if either invariant fails, even when receipts are valid."
    owner: "ba/qc"
    status: MONITORING
  - id: "R-S02-RC-002"
    description: "Adding a current-cycle event could create duplicates on an unchanged retry."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Require a two-cycle fixture followed by an unchanged retry with zero additional writes."
    contingency: "Reject the candidate and retain the parent release hold when idempotency is not exact."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S02-RC-003"
    description: "The defect could expand into approval-authority or lifecycle redesign."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Keep authority, receipt schema, signer, lifecycle transitions, and prior defect scope in non-goals."
    contingency: "Create a separate work item if evidence later requires one of those boundaries to move."
    owner: "po/ba"
    status: MONITORING
timebox:
  target_duration: "One focused authoring pass"
  deadline: ""
  escalation_rule: "Move unresolved choices to s03; do not invent a technical answer in s02."
```

## Main Artifact
```yaml
restated_request: >-
  Correct repeated closeout reconciliation so a successful current cycle removes stale approval
  instructions and pre-closeout handoffs, records one auditable event for that cycle despite
  historical evidence, remains a no-op on unchanged retry, and returns CR-008 to verification only
  after the corrected behavior is proven.
user_problem: >-
  An operator can complete a valid closeout and receive signed receipts, yet the persisted workflow
  still asks for the same approval and the audit trail contains no event that identifies the current
  cycle. The operator must manually inspect several surfaces to decide whether the action really
  completed and may repeat an action that has already succeeded.
business_goal: >-
  Make every successful closeout semantically final for its cycle: all workflow surfaces agree that
  the sealed decisions are complete, the current cycle has exactly one audit event, and an unchanged
  retry performs no additional write. Use a newly verified exact candidate before CR-008 receives
  new terminal approvals.
user_value: >-
  A user approves the closeout once and immediately sees the correct next action, without repeated
  confirmation friction or manual receipt inspection, while reviewers retain immutable history and
  independently attributable evidence for every gate.
success_outcome:
  - "After a successful repeated closeout, zero report, protocol, blocker, action, or handoff surfaces describe a sealed gate as pending."
  - "The successful repeated cycle appends exactly one closeout event attributable to that cycle even when historical events exist."
  - "The post-closeout handoff and required actions identify only the next valid lifecycle action."
  - "One unchanged retry produces zero new receipts, zero new events, and zero derived-state writes."
  - "Historical receipts and events remain byte-preserved and independently readable."
  - "Legacy gate-set, first-cycle, atomicity, authority, and receipt-attribution regressions remain green."
  - "The corrected child first receives a valid QC technical-checkpoint DoD binding; one exact hosted candidate then passes parent AG-01..AG-13 before new parent DoD, Release, or Business Acceptance decisions. Child and parent final closure still require the complete contribution."
  - "F-AG11-001, release hold, and branch hold remain visible until the corrected evidence chain is complete."
non_goals:
  - "Do not redesign human-controlled gate runtime or reduce independent parent decisions. The explicitly accepted RCR-TS8-CP-001 scope amendment makes only this correction child's Release/Business Acceptance not_applicable; every required parent verification and terminal decision remains independent."
  - "Do not change receipt-v1, signer identity, passphrase handling, trusted roots, or secret storage."
  - "Do not revisit the resolved missing-DoD gate selector except through regression checks."
  - "Do not add a generic reopen transition or redesign protocol lifecycle states."
  - "Do not change unrelated adaptive routing, SA/TA applicability, telemetry, or capability control."
  - "Do not publish, tag, merge, install, clean up, or finalize the branch/worktree in discovery."
  - "Do not reuse the historical CR-008 terminal approvals for a corrected candidate."
priority_reason: >-
  F-AG11-001 is HIGH because it reproduces the exact approval friction AG-11 was intended to remove
  and makes current-cycle audit evidence ambiguous after apparent success. It invalidates the parent
  release candidate and blocks release and branch finalization until corrected.
risks_business:
  - "Users may repeat already completed approvals because the workflow still presents them as required."
  - "Reviewers may confuse historical success evidence with evidence for the current cycle."
  - "A surface-only fix may restore the appearance of completion without restoring audit correctness."
  - "A non-idempotent fix may trade a missing event for duplicate events or receipts."
  - "A broad redesign may delay the release and destabilize already verified CR-008 behavior."
metrics_candidate:
  - id: "KPI-RCR-001"
    name: "Stale approval surfaces after success"
    target: "0 across report, s01 protocol block, blockers, required actions, and handoff"
    status: "required invariant"
  - id: "KPI-RCR-002"
    name: "Current-cycle closeout events"
    target: "Exactly 1 per committed closeout cycle"
    status: "required invariant"
  - id: "KPI-RCR-003"
    name: "Unchanged-retry mutations"
    target: "0 receipts, 0 events, and 0 derived-state writes"
    status: "required invariant"
  - id: "KPI-RCR-004"
    name: "Post-closeout surface agreement"
    target: "100% agreement across receipts, report, protocol block, blockers, actions, and handoff"
    status: "required invariant"
  - id: "KPI-RCR-005"
    name: "Historical evidence mutations"
    target: "0"
    status: "required invariant"
  - id: "KPI-RCR-006"
    name: "Parent corrected-candidate coverage"
    target: "AG-01..AG-13 at 13/13 PASS for one exact local and hosted candidate"
    status: "release hold invariant"
notes_for_next_step: >-
  At s03, confirm whether any unresolved decision remains around current-cycle identity, semantic
  satisfied-action cleanup, the canonical post-closeout handoff, and unchanged-retry idempotency.
  Keep those as questions or constraints; technical option selection belongs to s05.
```

## Traceability
```yaml
source_inputs:
  - "closeout-bundle-repeat-cycle-reconciliation.s01.restate.md"
  - "PO trusted work-item receipt SHA-256 4ae668c9dc20dfaa1ff8979da9ce43485511c2d19e59e98e18c08427e7485b0d"
  - "F-AG11-001 repeated-closeout evidence in the parent s07 and s08 notes"
  - "CR-008 AG-11 and REQ-AG-009"
objective_mapping:
  - { objective: "OBJ-RC-001", outcome: "Zero stale approval surfaces and one valid next action", metrics: ["KPI-RCR-001", "KPI-RCR-004"] }
  - { objective: "OBJ-RC-002", outcome: "Unambiguous immutable audit history across cycles", metrics: ["KPI-RCR-002", "KPI-RCR-003", "KPI-RCR-005"] }
  - { objective: "OBJ-RC-003", outcome: "Corrected CR-008 candidate returns to governed verification", metrics: ["KPI-RCR-006"] }
acceptance_draft_mapping:
  - { criteria: ["RCR-01", "RCR-03"], metrics: ["KPI-RCR-001", "KPI-RCR-004"] }
  - { criteria: ["RCR-02"], metrics: ["KPI-RCR-002", "KPI-RCR-005"] }
  - { criteria: ["RCR-04"], metrics: ["KPI-RCR-003"] }
  - { criteria: ["RCR-05", "RCR-06"], metrics: ["KPI-RCR-005", "KPI-RCR-006"] }
next_step: "s03 Open Questions; Business Goal approved by PO at 2026-09-10T01:36:42Z"
```

## Handoff
- Pinned user problem: successful closeout receipts do not currently guarantee visible completion or current-cycle audit evidence.
- Business outcome: zero stale completion prompts, exactly one event per committed cycle, and a zero-write unchanged retry.
- Non-goals: authority, receipt schema, lifecycle redesign, prior-defect reopening, unrelated CR-008 scope, and external release actions.
- Condition for s03: satisfied by explicit PO approval at `2026-09-10T01:36:42Z`; no implementation path is open.


## Checkpoint Scope Amendment — RCR-TS8-CP-001

The human explicitly accepted Option B in response to the immediately preceding PO/BA/Developer/QC proposal, recorded at 2026-09-14T08:20:49Z. This approval authorizes only the checkpoint-scope and authoring-applicability amendment: this correction child's Release/Business Acceptance are not_applicable; all parent AC-RCR-08, AG-01..AG-13 and independent terminal gates remain mandatory. It does not approve any gate on the amended bytes, sign a receipt, complete AC-RCR-08, close F-AG11-001 or authorize protocol DONE, production edits, publication/tag/merge/install/cleanup.

Original source reviews, QC Technical Verification and qualified child DoD decision remain historical evidence for unchanged candidate af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f. The later human accept approved all five amended authoring gates, recorded at 2026-09-14T13:33:15Z. Fresh trusted authoring receipts and QC amended DoD artifact binding remain pending; old whole-host receipts cannot be reused. See `rcr-ts8-checkpoint-amendment.json` for exact hashes, receipt impact and the full child-to-parent closure sequence.

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
