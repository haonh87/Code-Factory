---
artifact_id: "align-adaptive-sa-ta-applicability.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "align-adaptive-sa-ta-applicability"
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
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
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
  - "step-goal-contract"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "align-adaptive-sa-ta-applicability.s01.restate.md"
linked_artifacts:
  - "align-adaptive-sa-ta-applicability.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../changes/CR-008/proposal.md"
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Remove irrelevant SA/TA obligations without weakening architecture oversight. Success means the
> router remains authoritative, no-trigger work creates no SA/TA actions, every named hard trigger
> still selects the expected roles, and all distributed policy copies agree.

## Step Contract
```yaml
step: "s02 Business Goal"
goal: >-
  Lock the user problem, business value, measurable outcomes, priority, and non-goals for CF-019
  without choosing the policy wording, fixture location, or implementation mechanism.
value: >-
  Ensure the team optimizes for less irrelevant ceremony and preserved risk controls as separate,
  measurable outcomes instead of treating fewer roles as an unconditional objective.
scope_in:
  - "User and operator value of conditional SA/TA applicability"
  - "Outcome measures for no-trigger, hard-trigger, determinism, and runtime parity"
  - "Release-safety boundary inherited from parent CR-008"
  - "Explicit business non-goals that prevent governance weakening or scope expansion"
scope_out:
  - "Choose final policy language, reason-code representation, helper, or fixture file"
  - "Modify policies, runtimes, validators, tests, or skills"
  - "Approve Spec, Contract, DoR, Approach, Task Plan, DoD, or parent release gates"
  - "Merge, tag, publish, install, or close the CR-008 worktree"
inputs_required:
  - "Valid PO trusted receipt approving this work item"
  - "s01 clarified defect, requirement analysis, and SA/TA architecture drivers"
  - "OQ-CF-004 Option C approval by PO, BA, Developer, and QC"
  - "CR-008 parent release and compatibility boundaries"
outputs_required:
  - "Canonical Product Thinking artifact"
  - "Observable success outcomes and candidate metrics"
  - "Business invariants and bounded non-goals"
  - "Handoff to s03 for reason-code and fixture-ownership decisions"
done_when:
  - "The user problem describes the contradictory role experience concretely"
  - "Reduced ceremony and preserved oversight are measured independently"
  - "Every success outcome can become an acceptance criterion or test"
  - "No implementation approach is selected"
constraints:
  hard_constraints:
    - "Router-derived applicability remains authoritative"
    - "Named hard-risk triggers remain mandatory and cannot be downgraded"
    - "One canonical source and two packaged runtime policy surfaces remain semantically aligned"
    - "The child remains within CR-008 and cannot finalize the parent release itself"
  soft_constraints:
    - "Prefer the smallest policy and evidence delta that restores consistency"
    - "Use reason codes that explain why a role is required without adding user ceremony"
  prohibited_actions:
    - "Treat conditional applicability as removal of SA/TA"
    - "Optimize role count without measuring missed hard-trigger assignments"
    - "Turn this business artifact into a technical design"
  compliance_checks:
    - "KPI-AR-001 proves the router yields zero SA/TA obligations for no-trigger fixtures"
    - "KPI-AR-002 and KPI-AR-003 prove named hard triggers remain complete and non-downgradable"
    - "KPI-AR-006 proves canonical and packaged runtime policy semantics remain aligned"
    - "KPI-AR-008 binds the child result to the parent CR-008 candidate without granting release authority"
risks:
  - id: "R-S02-AR-001"
    description: "The team reduces visible roles but weakens architecture oversight."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Track no-trigger reduction and hard-trigger completeness as independent invariants."
    contingency: "Keep parent CR-008 on HOLD if any trigger fixture is downgraded."
    owner: "po/ba/qc"
    status: MONITORING
  - id: "R-S02-AR-002"
    description: "Policy copies appear aligned to readers but produce different client behavior."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Require semantic parity outcomes across canonical Codex, runtime Codex, and runtime Claude surfaces."
    contingency: "Block candidate handoff and restore the last verified parent baseline."
    owner: "developer/qc"
    status: MONITORING
  - id: "R-S02-AR-003"
    description: "The child expands into a redesign of SA/TA, routing, or trusted approvals."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Keep internal skill contracts, router redesign, and approval redesign as explicit non-goals."
    contingency: "Open a separate reviewed work item if evidence proves a broader boundary is necessary."
    owner: "po/ba"
    status: MONITORING
timebox:
  target_duration: "one focused authoring pass"
  deadline: ""
  escalation_rule: "Move unresolved terminology and fixture ownership to s03; do not select a technical answer here."
```

## Main Artifact
```yaml
restated_request: >-
  Resolve CF-019 under OQ-CF-004 Option C so the adaptive router decides when SA and TA apply,
  generic skill guidance cannot re-add non-applicable roles, and named architecture-risk triggers
  remain mandatory across source and packaged runtime policies.
user_problem: >-
  Users can still face SA/TA role requirements for ordinary maintenance or non-product work because
  a generic policy clause says those skills always run at s01-s04, even after the adaptive router has
  found no architecture trigger. The contradiction makes the new low-friction workflow unpredictable
  and forces users to understand internal policy precedence to know which instruction wins.
business_goal: >-
  Deliver one trustworthy applicability model: no-trigger work has no SA/TA role, action, or gate;
  every approved architecture or hard-risk trigger retains the expected role and explanation; and
  repository and installed runtime policies produce the same result without weakening human authority.
user_value: >-
  Users only interact with architecture roles when the request actually needs architecture judgment,
  while PO, BA, Developer, QC, and release owners can trust that higher-risk work still receives the
  required SA/TA scrutiny and remains auditable.
success_outcome:
  - "A no-trigger maintenance request produces zero SA/TA roles, pending actions, and gates."
  - "Every approved architecture hard-trigger fixture selects the expected SA and/or TA role."
  - "Every selected SA/TA role carries at least one stable, human-readable reason code."
  - "A generic skill-requirement clause cannot re-add any role the router marked not_applicable."
  - "Identical request and governance inputs produce identical normalized applicability output."
  - "Canonical Codex, packaged Codex, and packaged Claude policies have zero semantic parity findings."
  - "Existing SA/TA skill contracts, workflow gates, and trusted approval behavior remain compatible."
  - "The child provides exact candidate evidence to CR-008 without independently authorizing release."
non_goals:
  - "Do not remove SA or TA capabilities or weaken their existing driver contracts."
  - "Do not redesign adaptive admission, approval bundling, receipts, signer sessions, or passphrase handling."
  - "Do not change the approved hard-trigger taxonomy without a separately reviewed requirement."
  - "Do not rewrite historical workflow notes or force legacy artifacts into a new shape."
  - "Do not create a new change package outside CR-008."
  - "Do not merge, tag, publish, install, release, or close the parent worktree in s02."
priority_reason: >-
  CF-019 directly contradicts the main usability promise of CR-008 and can make an approved release
  enforce the same irrelevant-role friction it was intended to remove. The parent candidate should
  remain on HOLD until the contradiction has exact semantic evidence and a corrected candidate.
risks_business:
  - "Users may distrust adaptive routing if policy precedence produces inconsistent role requests."
  - "Over-correction may allow architecture-risk work to bypass SA/TA scrutiny."
  - "Installed Codex and Claude users may receive different governance behavior."
  - "Keyword-only validation may certify wording without proving applicability semantics."
  - "A broader redesign may delay CR-008 and introduce unrelated regression risk."
metrics_candidate:
  - id: "KPI-AR-001"
    name: "No-trigger SA/TA obligations"
    target: "0 roles, 0 pending actions, and 0 gates for every approved no-trigger fixture"
    status: "required invariant"
  - id: "KPI-AR-002"
    name: "Hard-trigger role completeness"
    target: "100% expected SA/TA role match across the approved trigger matrix"
    status: "required invariant"
  - id: "KPI-AR-003"
    name: "Unsafe applicability downgrade"
    target: "0 accepted downgrades across all hard-trigger negative fixtures"
    status: "required invariant"
  - id: "KPI-AR-004"
    name: "Role reason coverage"
    target: "100% selected SA/TA roles have at least one stable reason code"
    status: "required invariant"
  - id: "KPI-AR-005"
    name: "Routing determinism"
    target: "100% identical normalized outputs across repeated golden-fixture runs"
    status: "required invariant"
  - id: "KPI-AR-006"
    name: "Policy runtime parity"
    target: "0 semantic findings across source Codex, runtime Codex, and runtime Claude policies"
    status: "required invariant"
  - id: "KPI-AR-007"
    name: "Adjacent governance regression"
    target: "0 regressions in existing policy, routing, SA/TA, protocol, and pack-audit suites"
    status: "required release condition"
  - id: "KPI-AR-008"
    name: "Parent candidate evidence binding"
    target: "100% required local and hosted checks reference one exact corrected candidate SHA"
    status: "required parent handoff"
notes_for_next_step: >-
  s03 must resolve the normative reason-code vocabulary and canonical semantic-fixture owner. Any
  requirement to redesign the router, SA/TA output contracts, or approval subsystem must be treated
  as scope expansion and returned for human decision.
```

## Outcome Guardrails
```yaml
business_invariants:
  - id: "INV-AR-001"
    rule: "Conditional applicability reduces irrelevant participation; it never removes a role required by a named risk trigger."
    traces_to: ["OBJ-AR-001", "OBJ-AR-002", "KPI-AR-001", "KPI-AR-002", "KPI-AR-003"]
  - id: "INV-AR-002"
    rule: "The router owns applicability, and downstream guidance cannot silently override its not_applicable result."
    traces_to: ["SA-DRV-AR-001", "KPI-AR-001", "KPI-AR-005"]
  - id: "INV-AR-003"
    rule: "Every required architecture role must explain its inclusion with stable reason evidence."
    traces_to: ["SA-DRV-AR-002", "TA-DRV-AR-001", "KPI-AR-004"]
  - id: "INV-AR-004"
    rule: "Only evidence bound to the exact corrected child candidate may support parent CR-008 re-verification."
    traces_to: ["SA-DRV-AR-004", "TA-DRV-AR-003", "KPI-AR-008"]
measurement_rules:
  - "Count roles, pending actions, and gates separately; zero in one category does not prove zero in the others."
  - "Compare trigger outcomes as exact role sets with reason codes, not as a minimum role count."
  - "Repeat golden fixtures to distinguish deterministic policy behavior from a one-run match."
  - "Evaluate canonical and runtime policy semantics, not keyword presence alone."
  - "Bind local, packaged, and hosted evidence to the same full candidate SHA-256."
```

## Audit
```yaml
step: "s02 Business Goal"
status: PASS
checks:
  - criterion: "The user problem and priority are concrete"
    result: PASS
    evidence: "The artifact names the unconditional clause, router conflict, resulting role friction, and CR-008 release impact."
  - criterion: "Reduced ceremony and preserved oversight are measured independently"
    result: PASS
    evidence: "KPI-AR-001 measures zero no-trigger obligations; KPI-AR-002/003 separately measure trigger completeness and downgrade prevention."
  - criterion: "Every success outcome is observable or testable"
    result: PASS
    evidence: "Outcomes cover exact role/action/gate sets, reason codes, determinism, parity, regression, and candidate binding."
  - criterion: "Non-goals prevent scope expansion"
    result: PASS
    evidence: "SA/TA contract changes, router redesign, approval redesign, historical rewrites, a new change package, and release actions are excluded."
  - criterion: "No technical approach is selected"
    result: PASS
    evidence: "The artifact defines outcomes without selecting policy wording, code structure, or fixture location."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one bounded Business Goal authoring pass."
gaps:
  - "OQ-AR-001 reason-code vocabulary remains owned by BA/Developer/QC."
  - "OQ-AR-002 canonical semantic-fixture ownership remains owned by Developer/QC."
risk_level: HIGH
next_action: "Proceed to s03 Open Questions; do not open s04 until the two owned decisions are resolved."
```

## Traceability
```yaml
upstream:
  - "align-adaptive-sa-ta-applicability.s01.restate.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../changes/CR-008/proposal.md"
outputs:
  - "Business goal and user value"
  - "KPI-AR-001..008"
  - "INV-AR-001..004"
next_step: "s03 Open Questions"
```

## Handoff
- Pinned user problem: a generic policy clause can reintroduce SA/TA after the router marks them not applicable.
- Non-goals: no SA/TA contract, router, approval-system, historical-artifact, or release-finalization redesign.
- Condition for step 3: met; resolve reason-code vocabulary and canonical semantic-fixture ownership.
