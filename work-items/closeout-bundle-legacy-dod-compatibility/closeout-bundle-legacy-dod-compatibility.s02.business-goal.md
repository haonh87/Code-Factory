---
artifact_id: "closeout-bundle-legacy-dod-compatibility.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
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
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "sa"
  - "ta"
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
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
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
  - "product-thinking"
  - "sa"
  - "ta"
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.s01.restate.md"
linked_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../changes/CR-008/spec-delta/srs.delta.md"
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Restore trust in CR-008 closeout by making the legacy path select every applicable terminal gate,
> including mandatory DoD, in one human interaction. Success means exact gate-set completeness,
> independent trusted receipts, zero partial state, and a newly verified v2.6.2 candidate.

## Step Contract
```yaml
step: "s02 Business Goal"
goal: >-
  Lock the user value, business outcome, measurable success conditions, and non-goals for the
  CR-008 linked defect without choosing a technical correction.
value: >-
  Prevent the team from treating a merely convenient one-click closeout as successful when it
  omits authority, and prevent the correction from expanding into unrelated workflow redesign.
scope_in:
  - "Value for operators, reviewers, maintainers, and release owners"
  - "Exact legacy closeout outcomes for maintenance and product-release contexts"
  - "Separate metrics for human interactions, trusted receipts, atomicity, and candidate evidence"
  - "Business constraints inherited from CR-008 AG-07, AG-08, AG-11, and AG-13"
scope_out:
  - "Choosing the code-level fallback, helper, abstraction, or transaction design"
  - "Adding a VERIFIED-to-ACTIVE reopen transition"
  - "Changing the signer, passphrase flow, receipt schema, telemetry, or routing model"
  - "Publishing, tagging, merging, installing globally, or finalizing the worktree"
inputs_required:
  - "Approved linked-defect work-item receipt"
  - "s01 requirement analysis and CLD-01..CLD-05 draft criteria"
  - "OBJ-CL-001..003 and DRV-SA-CL-001..004"
  - "DRV-TA-CL-001..004"
  - "Parent CR-008 finding F-AG08-001 and terminal-evidence hold"
outputs_required:
  - "Product Thinking record using the canonical schema"
  - "Observable success outcomes and metrics"
  - "Business invariants and explicit non-goals"
  - "Handoff to s03 with any unresolved business decisions"
done_when:
  - "The user problem and priority are specific to the observed missing-DoD failure"
  - "Interaction count and receipt completeness are measured independently"
  - "Every success outcome is observable or testable"
  - "Non-goals prevent reopen, signer, schema, release-execution, and unrelated CR-008 scope creep"
  - "No technical approach is selected"
constraints:
  hard_constraints:
    - "DoD remains mandatory for every supported legacy technical closeout"
    - "One bundled human interaction must still create one independent trusted receipt per applicable gate"
    - "A failed closeout must create zero partial authority or contradictory derived state"
    - "Historical receipts remain audit records but cannot authorize changed evidence"
  soft_constraints:
    - "Keep the correction small enough to preserve the approved CR-008 behavior and release plan"
    - "Use business language that distinguishes user friction from approval authority"
  prohibited_actions:
    - "Choose a technical implementation at s02"
    - "Treat the existing Release or Business Acceptance receipts as valid after their artifact digest changed"
    - "Broaden the defect into global CLI installation or lifecycle reopening"
  compliance_checks:
    - "CLD-01 and CLD-02 cover mandatory and optional terminal-gate applicability"
    - "CLD-03 measures independent receipts separately from the single interaction"
    - "CLD-04 measures zero partial writes and zero contradictory state"
    - "CLD-05 requires exact-candidate local and hosted evidence before reapproval"
risks:
  - id: "R-S02-001"
    description: "The team could optimize for one click while still omitting a mandatory receipt."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Measure human interactions and per-gate receipt completeness as separate invariants."
    contingency: "Hold CR-008 and reject any candidate whose exact selected gate set is incomplete."
    owner: "ba/qc"
    status: MONITORING
  - id: "R-S02-002"
    description: "The defect could expand into a general approval or lifecycle redesign."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Keep reopen, signer, schema, telemetry, and global installation in explicit non-goals."
    contingency: "Raise a separate work item if evidence proves one of those boundaries must change."
    owner: "po/ba"
    status: MONITORING
  - id: "R-S02-003"
    description: "Adaptive-only fixtures could produce false confidence while the legacy path remains broken."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Require paired legacy and adaptive evidence plus exact legacy gate-set equality."
    contingency: "Keep F-AG08-001 open and v2.6.2 on HOLD until the legacy fixture passes."
    owner: "qc"
    status: MONITORING
timebox:
  target_duration: "One focused authoring pass"
  deadline: ""
  escalation_rule: "Move unresolved business choices to s03; do not invent a technical answer in s02."
```

## Main Artifact
```yaml
restated_request: >-
  Correct the CR-008 legacy closeout behavior so the bundle preserves one human decision while
  including mandatory DoD and every configured terminal gate, with atomic state and new candidate
  evidence before the parent release can close.
user_problem: >-
  Operators were shown a successful closeout even though the legacy path omitted mandatory DoD
  and sealed only Release and Business Acceptance. That makes the friction-reduction feature
  untrustworthy: users must manually inspect receipts and repeat release decisions to know whether
  the workflow actually preserved human authority.
business_goal: >-
  Restore trustworthy one-interaction closeout for supported legacy artifacts: maintenance must
  select exactly DoD; product release must select exactly DoD, Release, and Business Acceptance;
  success and failure must leave one consistent authority state; and only a newly verified exact
  v2.6.2 candidate may return CR-008 to terminal review.
user_value: >-
  A user can approve closeout once and trust that no mandatory decision was hidden or omitted,
  while reviewers and maintainers retain an independently signed, auditable receipt for every
  applicable gate and do not need a manual workaround.
success_outcome:
  - "Legacy maintenance closeout selects exactly one gate: DoD."
  - "Legacy product-release closeout selects exactly three gates: DoD, Release, and Business Acceptance."
  - "One successful human interaction produces one independently verifiable receipt for every selected gate."
  - "Receipt, report, protocol block, blockers, and required actions describe the same complete decision."
  - "Every injected failure leaves zero new partial receipts and zero derived-state writes."
  - "Supported legacy and adaptive artifact shapes both enforce mandatory DoD."
  - "The exact corrected v2.6.2 candidate passes local and hosted verification before terminal reapproval."
  - "CR-008 remains on HOLD until F-AG08-001 is closed by new evidence."
non_goals:
  - "Do not add or simulate a general workflow reopen capability."
  - "Do not change trusted-receipt schema, signing authority, passphrase handling, or secret storage."
  - "Do not redesign adaptive_v1 applicability or unrelated request routing."
  - "Do not use global CLI installation as the source of truth for candidate verification."
  - "Do not publish, tag, merge, release, or clean up the worktree in this authoring step."
  - "Do not treat historical CR-008 terminal receipts as current authorization."
priority_reason: >-
  The defect invalidates a mandatory human-controlled gate after CR-008 appeared release-ready.
  Until corrected, every legacy bundled closeout can create false completion evidence and the
  v2.6.2 release must remain blocked.
risks_business:
  - "Users may stop trusting bundled approvals and return to repetitive manual gate commands."
  - "A false DONE state could authorize release or cleanup without technical completion authority."
  - "A broad correction could delay the release and destabilize otherwise approved CR-008 behavior."
  - "Testing only the adaptive shape could leave the production compatibility path defective."
  - "Reusing historical terminal receipts could approve a different artifact or candidate."
metrics_candidate:
  - id: "KPI-CLD-001"
    name: "Legacy mandatory-gate completeness"
    target: "100% exact gate-set equality for maintenance and product-release fixtures"
    status: "required invariant"
  - id: "KPI-CLD-002"
    name: "Closeout human interactions"
    target: "Exactly 1 successful reviewed interaction per closeout bundle"
    status: "required invariant"
  - id: "KPI-CLD-003"
    name: "Trusted receipt completeness"
    target: "Exactly 1 valid independent receipt per selected gate; 0 omitted or extra receipts"
    status: "required invariant"
  - id: "KPI-CLD-004"
    name: "Partial authority visibility"
    target: "0 new partial receipts or derived-state writes at every failure boundary"
    status: "required invariant"
  - id: "KPI-CLD-005"
    name: "Legacy/adaptive DoD parity"
    target: "100% of supported artifact shapes enforce mandatory DoD"
    status: "required invariant"
  - id: "KPI-CLD-006"
    name: "Exact-candidate evidence coverage"
    target: "100% required local and hosted checks bound to one corrected v2.6.2 SHA"
    status: "required release condition"
  - id: "KPI-CLD-007"
    name: "Contradictory terminal state"
    target: "0 mismatches across receipt, report, protocol block, blockers, and required actions"
    status: "required invariant"
notes_for_next_step: >-
  No product decision is currently unresolved. s03 should verify that the exact legacy default,
  failure atomicity boundary, and candidate identity inputs are available; any newly discovered
  need for reopen, signer, or schema changes must become a separate decision rather than implicit scope.
```

## Outcome Guardrails
```yaml
business_invariants:
  - id: "INV-CLD-001"
    rule: "One human interaction never means fewer applicable human authorities or receipts."
    traces_to: ["OBJ-CL-001", "OBJ-CL-002", "CLD-01", "CLD-02", "CLD-03"]
  - id: "INV-CLD-002"
    rule: "A closeout result is successful only when the complete selected gate set and all derived state agree."
    traces_to: ["DRV-SA-CL-002", "DRV-TA-CL-002", "CLD-03", "CLD-04"]
  - id: "INV-CLD-003"
    rule: "Legacy missing-key compatibility preserves mandatory DoD rather than interpreting it as not applicable."
    traces_to: ["DRV-SA-CL-001", "DRV-TA-CL-004", "CLD-01", "CLD-02"]
  - id: "INV-CLD-004"
    rule: "Only evidence bound to the exact corrected candidate may support new terminal approval."
    traces_to: ["OBJ-CL-003", "DRV-TA-CL-003", "CLD-05"]
measurement_rules:
  - "Count the bundle review as one interaction and each retry as another interaction."
  - "Count receipts separately; interaction reduction must not reduce required receipts."
  - "Compare selected gates as exact sets, not as a minimum count."
  - "Inspect both successful and injected-failure state across every persisted authority surface."
  - "Bind local, packaged, and hosted results to the same full candidate SHA-256."
```

## Audit
```yaml
step: "s02 Business Goal"
status: PASS
checks:
  - criterion: "The user problem and priority are specific to the observed missing-DoD failure"
    result: PASS
    evidence: "The Product Thinking record names the Release+Business Acceptance partial success and its authority impact."
  - criterion: "Interaction count and receipt completeness are measured independently"
    result: PASS
    evidence: "KPI-CLD-002 measures one interaction while KPI-CLD-003 measures one receipt per selected gate."
  - criterion: "Every success outcome is observable or testable"
    result: PASS
    evidence: "The outcomes define exact gate sets, state equality, failure atomicity, shape parity, and exact-candidate checks."
  - criterion: "Non-goals prevent unrelated scope expansion"
    result: PASS
    evidence: "Reopen, signer, schema, routing, global install, publishing, and historical receipt reuse are excluded."
  - criterion: "No technical approach is selected"
    result: PASS
    evidence: "The artifact defines outcomes and constraints without choosing a helper, fallback algorithm, or transaction design."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one bounded Business Goal authoring pass."
gaps: []
risk_level: HIGH
next_action: "Proceed to s03 and validate input readiness; do not open s07 until Spec, DoR, Approach, and Task Plan receipts exist."
```

## SDD Traceability
```yaml
requirement_refs:
  - "REQ-AG-007"
  - "REQ-AG-008"
  - "REQ-AG-009"
acceptance_refs:
  - "AG-07"
  - "AG-08"
  - "AG-11"
  - "AG-13"
  - "CLD-01"
  - "CLD-02"
  - "CLD-03"
  - "CLD-04"
  - "CLD-05"
task_refs:
  - "CR-008/T8b"
test_refs:
  - "legacy-maintenance-closeout"
  - "legacy-product-release-closeout"
  - "atomic-closeout-failure-matrix"
  - "legacy-adaptive-dod-parity"
  - "exact-candidate-local-hosted"
```

## Traceability
```yaml
upstream:
  - "closeout-bundle-legacy-dod-compatibility.s01.restate.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../changes/CR-008/spec-delta/srs.delta.md"
outputs:
  - "Business goal and user value"
  - "KPI-CLD-001..007"
  - "INV-CLD-001..004"
next_step: "s03 Open Questions"
```

## Handoff
- Pinned user problem: legacy bundled closeout can report success while omitting mandatory DoD.
- Non-goals: no lifecycle reopen, signer/schema change, unrelated routing, publication, or terminal approval.
- Condition for step 3: met; validate the evidence inputs and expose any decision that would force scope expansion.
