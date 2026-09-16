---
artifact_id: "closeout-bundle-legacy-dod-compatibility.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
step_id: "s03"
step_slug: "open-questions"
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
  - "ba"
  - "sa"
  - "ta"
  - "developer"
  - "qc"
  - "devops"
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
  - "requirement-analysis"
  - "sa"
  - "ta"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.s01.restate.md"
  - "closeout-bundle-legacy-dod-compatibility.s02.business-goal.md"
linked_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/scripts/work-item-protocol.js"
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Input readiness for `s04 Acceptance + DoR` is **READY**. The legacy DoD default, candidate policy,
> and parent-release hold are already determined by existing CR-008 authority. A newly observed
> non-interactive work-item approval mutation is recorded as a separate, non-blocking follow-up.

## Step Contract
```yaml
step: "s03 Open Questions"
goal: >-
  Resolve or explicitly disposition every ambiguity that could prevent measurable acceptance
  criteria and a trustworthy DoR decision for the legacy closeout defect.
value: >-
  Ensure s04 tests the real compatibility failure and exact authority boundary, without using
  stale receipts, the wrong CLI version, or an unapproved expansion into another approval path.
scope_in:
  - "Legacy missing-key DoD semantics"
  - "Required maintenance and product-release terminal gate sets"
  - "Exact corrected candidate and rollback evidence policy"
  - "Parent CR-008 state and stale receipt treatment"
  - "Disposition of newly observed adjacent approval-path behavior"
scope_out:
  - "Technical solution selection"
  - "Production code or test implementation"
  - "A general protocol reopen transition"
  - "Correction of non-interactive work-item approval atomicity"
inputs_required:
  - "Approved work-item trusted receipt"
  - "s01 CLD-01..CLD-05 and SA/TA drivers"
  - "s02 KPI-CLD-001..007 and INV-CLD-001..004"
  - "The observed CR-008 closeout result and current terminal receipt status"
  - "Legacy gate-default and finalized-step source evidence"
  - "Current closeout integration fixture shape"
outputs_required:
  - "Resolved-question and conflict disposition record"
  - "Input Readiness report using the canonical schema"
  - "Non-blocking follow-up observations kept outside current scope"
  - "Evidence-based step audit and handoff to s04"
done_when:
  - "No unresolved question changes the expected terminal gate sets"
  - "Stale and mismatched evidence is explicitly excluded from s04 inputs"
  - "Every conflict has a disposition and owner"
  - "Adjacent defects are recorded without silently expanding scope"
  - "The readiness verdict names a concrete next action"
constraints:
  hard_constraints:
    - "Missing approval_gates.dod in a supported legacy s08 cannot make DoD not applicable"
    - "Historical receipts with digest_match=false cannot satisfy current gate evidence"
    - "Only the exact corrected v2.6.2 candidate may be used for new verification"
    - "Scope expansion requires a separate human-approved work item or amendment"
  soft_constraints:
    - "Prefer existing CR-008 decisions over asking the user to repeat them"
    - "Keep operational version mismatch distinct from the product defect"
  prohibited_actions:
    - "Infer a new implementation direction"
    - "Use the installed global v2.6.1 CLI as corrected-candidate evidence"
    - "Mutate the parent protocol through an unsupported reverse transition"
    - "Absorb the work-item approval atomicity issue without review"
  compliance_checks:
    - "Legacy finalized-step map requires DoD at s08"
    - "CR-008 Release and Business Acceptance receipts now have digest_match=false"
    - "The current product-closeout fixture uses artifact_shape=adaptive_v1"
    - "Parent s08 remains REWORK/HOLD with F-AG08-001 open"
risks:
  - id: "R-S03-001"
    description: "A missing DoD key could still be interpreted inconsistently by different readers."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Lock mandatory legacy DoD as the acceptance baseline and require paired reader evidence."
    contingency: "Block s07 if s04 cannot express exact missing-key behavior as a testable criterion."
    owner: "ba/qc"
    status: MONITORING
  - id: "R-S03-002"
    description: "Stale terminal receipts could be mistaken for valid approval of the corrected candidate."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Exclude digest-mismatched receipts and require a new full candidate hash before reapproval."
    contingency: "Keep CR-008 on HOLD and refuse protocol close or release finalization."
    owner: "qc/devops"
    status: MONITORING
  - id: "R-S03-003"
    description: "The adjacent work-item approval mutation could broaden this defect and delay the closeout correction."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Record OBS-CLD-001 as a separate follow-up and keep CLD-04 scoped to closeout transactions."
    contingency: "Create a separate linked BUG if the human owner prioritizes that approval path."
    owner: "developer/qc"
    status: MONITORING
timebox:
  target_duration: "One evidence and readiness pass"
  deadline: "Before s04 Acceptance + DoR authoring"
  escalation_rule: "Return BLOCKED only if an unresolved conflict changes gate authority, scope, or candidate identity."
```

## Main Artifact
```yaml
open_questions:
  - id: "OQ-CLD-001"
    question: "What does a missing approval_gates.dod key mean for a supported legacy s08 artifact?"
    owner: "ba/qc"
    status: "RESOLVED_BY_EXISTING_AUTHORITY"
    decision: "DoD remains mandatory; a missing legacy key inherits the finalized-step DoD requirement."
    evidence:
      - "REQUIRED_FINALIZED_SIGNOFF_BY_STEP.s08 contains dod"
      - "CR-008 AG-08 requires technical DoD in closeout"
    rejected_interpretation: "Treat the missing key as not_applicable because the generic default is not_applicable."
  - id: "OQ-CLD-002"
    question: "Which release candidate and rollback identity may support reapproval?"
    owner: "qc/devops"
    status: "RESOLVED_BY_PRIOR_HUMAN_DECISION"
    decision: "Produce a new exact v2.6.2 candidate SHA and retain v2.6.1 as rollback."
    evidence:
      - "Human-approved CR-008 version remains v2.6.2"
      - "Parent s08 invalidates terminal evidence after F-AG08-001"
    rejected_interpretation: "Reuse 8ddcb719... or its prior terminal approvals after the host artifact changed."
  - id: "OQ-CLD-003"
    question: "Should the newly observed non-interactive work-item approval mutation be fixed here?"
    owner: "po/developer/qc"
    status: "RESOLVED_BY_SCOPE_BOUNDARY"
    decision: "No. Preserve it as OBS-CLD-001 and require separate approval before implementation."
    evidence:
      - "The approved work item targets legacy closeout gate selection and closeout atomicity"
      - "work-item approve is a separate command and persistence path"
    rejected_interpretation: "Silently broaden CLD-04 to every approval command."
  - id: "OQ-CLD-004"
    question: "How can v2.6.1 remain the rollback when it contains the legacy closeout defect?"
    owner: "devops/qc"
    status: "RESOLVED_BY_SAFETY_INVARIANT"
    decision: "v2.6.1 remains the runtime rollback only with bundled closeout disabled; terminal gates must be sealed individually."
    evidence:
      - "v2.6.1 is the previously approved immutable rollback artifact"
      - "F-AG08-001 proves its bundled legacy closeout path is not safe evidence"
    rejected_interpretation: "Use the v2.6.1 closeout bundle unchanged after rollback."
missing_inputs: []
conflicts:
  - id: "CONFLICT-CLD-001"
    sources:
      - "workflow-gate-evidence-utils legacy finalized-step map"
      - "workflow-gate-review legacy explicit-key filter"
    conflict: "The first requires DoD while the second turns a missing DoD key into an omitted closeout gate."
    disposition: "Mandatory finalized-step authority wins; encode exact missing-key behavior at s04."
    owner: "developer/qc"
    blocking: false
  - id: "CONFLICT-CLD-002"
    sources:
      - "Parent protocol_status=VERIFIED"
      - "Parent s08 status=REWORK with F-AG08-001"
    conflict: "The state machine has no legal reverse transition, but current evidence invalidates terminal readiness."
    disposition: "Keep the protocol state historical, enforce blockers and stale receipts, and repeat verification after correction."
    owner: "qc"
    blocking: false
  - id: "CONFLICT-CLD-003"
    sources:
      - "work-item-protocol sync at lines 838-843"
      - "trusted receipt write at lines 844-855"
    conflict: "A non-interactive approval failure can occur after report and s01 mutation."
    disposition: "Recovered locally; track as OBS-CLD-001 outside this closeout defect."
    owner: "developer/qc"
    blocking: false
assumptions:
  - "The s08 artifact without approval_gates.dod is a supported legacy compatibility case, not malformed input."
  - "The current CR-008 worktree remains the delivery isolation boundary."
  - "The source CLI, packaged candidate, and hosted candidate must agree before terminal review."
  - "No new public contract is required beyond correcting behavior already specified by AG-08."
  - "Rollback to v2.6.1 disables bundled closeout and uses individual terminal gate commands."
follow_up_observations:
  - id: "OBS-CLD-001"
    title: "Work-item approval writes derived state before interactive receipt preflight"
    evidence: "A rejected non-TTY command changed approval_status before trusted receipt creation; local state was restored before handoff."
    current_scope: "OUT_OF_SCOPE"
    recommended_action: "Create a separate linked BUG after human prioritization; test zero source-of-truth mutation on prompt/preflight failure."
```

## Input Readiness
```yaml
step: "s04 Acceptance + DoR"
status: READY
available_inputs:
  - "Trusted work-item approval is APPROVED and signed"
  - "Observed partial closeout and F-AG08-001 are recorded in parent s08"
  - "CLD-01..CLD-05 define exact draft behavior and release evidence"
  - "KPI-CLD-001..007 and INV-CLD-001..004 define measurable outcomes"
  - "Code evidence identifies the legacy explicit-key filter in deriveBundleGates"
  - "Legacy finalized-step evidence identifies mandatory DoD at s08"
  - "Existing tests show only adaptive_v1 product and maintenance closeout fixtures"
missing_inputs: []
invalid_inputs:
  - "Historical CR-008 Release and Business Acceptance receipts have digest_match=false and are excluded."
  - "The global v2.6.1 CLI does not expose the corrected v2.6.2 action surface and is excluded from candidate evidence."
conflicts:
  - "CONFLICT-CLD-001 is resolved by the legacy finalized-step authority rule."
  - "CONFLICT-CLD-002 is operationally contained by HOLD, blockers, and stale receipts."
  - "CONFLICT-CLD-003 is separated as OBS-CLD-001 and does not alter current acceptance scope."
assumptions:
  - "The correction can remain within existing workflow-bundle command and test boundaries."
  - "A new candidate SHA will be generated only after implementation and verification."
risk_level: HIGH
next_action: "Draft s04 acceptance criteria and DoR with exact legacy gate sets, failure atomicity, compatibility, and candidate-binding evidence."
```

## Audit
```yaml
step: "s03 Open Questions"
status: PASS
checks:
  - criterion: "No unresolved question changes the expected terminal gate sets"
    result: PASS
    evidence: "OQ-CLD-001 locks mandatory DoD; OQ-CLD-002 locks candidate policy; OQ-CLD-004 locks rollback safety."
  - criterion: "Stale and mismatched evidence is excluded"
    result: PASS
    evidence: "Input Readiness lists digest-mismatched receipts and the global v2.6.1 CLI as invalid inputs."
  - criterion: "Every conflict has a disposition and owner"
    result: PASS
    evidence: "CONFLICT-CLD-001..003 each name an owner, blocking state, and disposition."
  - criterion: "Adjacent defects are recorded without expanding scope"
    result: PASS
    evidence: "OBS-CLD-001 is OUT_OF_SCOPE with a separate-work-item recommendation."
  - criterion: "The readiness verdict has a concrete next action"
    result: PASS
    evidence: "READY points directly to exact acceptance and DoR authoring at s04."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one evidence and readiness pass."
gaps: []
risk_level: HIGH
next_action: "Proceed to s04 authoring; wait for BA/QC human gate approval before s05."
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-AG-007", "REQ-AG-008", "REQ-AG-009"]
acceptance_refs: ["AG-07", "AG-08", "AG-11", "AG-13", "CLD-01", "CLD-02", "CLD-03", "CLD-04", "CLD-05"]
task_refs: ["CR-008/T8b"]
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
  - "closeout-bundle-legacy-dod-compatibility.s02.business-goal.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
evidence:
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js:265"
  - "../../packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js:332"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js:635"
outputs:
  - "OQ-CLD-001..004 dispositions"
  - "CONFLICT-CLD-001..003 dispositions"
  - "OBS-CLD-001 follow-up"
  - "s04 Input Readiness READY"
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Readiness: READY; no unresolved authority, scope, or candidate-policy decision blocks s04.
- Next: draft measurable acceptance criteria and DoR, then obtain independent Spec approval from BA and DoR approval from BA/QC.
