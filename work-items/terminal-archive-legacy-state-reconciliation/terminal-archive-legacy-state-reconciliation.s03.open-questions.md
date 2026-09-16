---
artifact_id: "terminal-archive-legacy-state-reconciliation.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
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
change_id: "CR-009"
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
  - "developer"
  - "qc"
review_mode: self
verification_owner: ""
artifact_shape: adaptive_v1
request_lane: maintenance
workflow_required: true
routing_reasons:
  - "LANE_MAINTENANCE"
escalation_reasons: []
role_reasons:
  developer:
    - "ROLE_DEVELOPER_BOUNDED_CHANGE"
  qc:
    - "ROLE_QC_DOD_VERIFICATION"
gate_reasons:
  task_plan:
    - "GATE_TASK_PLAN_BOUNDED_CHANGE"
  dod:
    - "GATE_DOD_TECHNICAL_CLOSEOUT"
adaptive_activation:
  source_version: "2.6.2"
  installed_versions:
    - "2.6.2"
    - "2.6.2"
  parity_passed: true
approval_gates:
  spec: "not_applicable"
  contract: "not_applicable"
  dor: "not_applicable"
  approach: "not_applicable"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  task_plan: ["developer"]
  dod: ["qc"]
gate_reviews:
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
  - "artifact-governance"
  - "obsidian-markdown"
upstream_artifacts:
  - "terminal-archive-legacy-state-reconciliation.s01.restate.md"
  - "terminal-archive-legacy-state-reconciliation.s02.business-goal.md"
linked_artifacts:
  - "changes/CR-009/proposal.md"
  - "changes/CR-008/archive-metadata.md"
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> The defect boundary is approved, but six design/authority questions remain. Recommendations below are proposals, not human decisions; s04 readiness is blocked until the required owners resolve them.

## Step Contract
```yaml
step: s03
goal: "Give every unresolved terminal-state question a bounded choice, recommendation, decision owner, and verification consequence."
value: "s04 can lock testable criteria without inventing identity, authority, compatibility, or cleanup rules."
scope_in:
  - "Analyze OQ-TAR-001..006 from s01 against existing protocol and CR-008 evidence."
  - "Record recommendation bundle and named human decision owners."
  - "Assess whether s04 has sufficient inputs."
scope_out:
  - "Treat recommendations as approved decisions."
  - "Choose a final technical design or implement behavior."
  - "Modify CR-008 history, published v2.6.2, or trusted receipts."
inputs_required:
  - "Approved CR-009 change and work-item trusted receipts."
  - "s01 requirement analysis, SA drivers, and TA drivers."
  - "s02 business goal and non-goals."
  - "Current protocol state-entry contract and CR-008 archive metadata."
outputs_required:
  - "This s03 Open Questions note with options and recommended bundle."
  - "A readiness decision for entering s04."
done_when:
  - "Each open question has options, a recommendation, owner, and test consequence."
  - "Any conflicting or stale metadata is visible rather than silently normalized."
  - "No question is marked resolved without owner approval or an existing authoritative source."
  - "Readiness remains BLOCKED if a decision can change acceptance criteria."
constraints:
  hard_constraints:
    - "Do not infer legacy state from display text."
    - "Do not archive with active blockers."
    - "Do not silently erase exact historical text."
  soft_constraints:
    - "Minimize new approval interactions and unnecessary artifact files."
  prohibited_actions:
    - "Do not approve a gate or change on behalf of Maintainer, Developer, or QC."
    - "Do not clean up the CR-008 worktree from this note alone."
  compliance_checks:
    - "Review every recommendation for text-inference avoidance."
    - "Check each option against the archive and exact-preservation invariants."
    - "Check role owners match the user-approved Maintainer/Developer/QC boundary."
risks:
  - id: R-TAR-S03-01
    description: "A convenient legacy ID scheme selects a different entry after mutation or duplication."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Require exact preimage checks and fail closed on stale or ambiguous identity."
    contingency: "Keep s04 blocked and revisit identity options."
    owner: developer
    status: OPEN
  - id: R-TAR-S03-02
    description: "Resolving only blockers drops opaque required_actions at archive."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Include both state collections in the recommendation and test silent-loss paths."
    contingency: "Keep archive blocked for unresolved legacy actions until a separate approved disposition exists."
    owner: qc
    status: OPEN
timebox:
  target_duration: "one review cycle after this recommendation bundle"
  deadline: ""
  escalation_rule: "If owners reject the bundle or find a wider public contract impact, return to s01/s02 and amend CR-009 before s04."
```

## Artifact Chính
```yaml
open_questions:
  - id: OQ-TAR-001
    topic: "Identity for pre-contract legacy entries"
    options:
      A: "Persist an id directly on each legacy object before disposition."
      B: "Expose an opaque, snapshot-bound entry ID for each exact collection position; compare the original bytes and report snapshot at disposition, then fail closed if stale."
    recommendation: B
    reason: "B preserves the current {kind: legacy, text: exact original} input shape and requires no eager rewrite; the ID is an exact selector, never a semantic reading of text."
    owner: [developer, qc]
    status: PROPOSED
    verification_consequence: "Duplicate-text entries must receive distinct selectable IDs; stale or ambiguous IDs must reject without mutation."
  - id: OQ-TAR-002
    topic: "Disposition operation boundary"
    options:
      A: "A separate, atomic disposition operation moves one selected entry to resolved history; archive is a later guard-only operation."
      B: "An archive command also accepts IDs and disposes entries in the same operation."
    recommendation: A
    reason: "Separates the auditable human decision from terminal state change and keeps the archive invariant simple."
    owner: [developer, qc]
    status: PROPOSED
    verification_consequence: "Test atomic move, retry, failure injection, and archive rejection before all active blockers are resolved."
  - id: OQ-TAR-003
    topic: "Who may authorize a historical disposition"
    options:
      A: "Maintainer authorizes or executes each explicit disposition; Developer owns the implementation; QC independently checks evidence before terminal acceptance."
      B: "Developer executes dispositions under a standing Maintainer approval; QC checks afterward."
    recommendation: A
    reason: "The action removes an active historical blocker, so its authority must be explicit and attributable without guessing from prose."
    owner: [maintainer, developer, qc]
    status: PROPOSED
    verification_consequence: "Audit record identifies actor, decision reason, selected ID, source collection, time, and independent QC review."
  - id: OQ-TAR-004
    topic: "Which active state collections require preservation"
    options:
      A: "Only blockers receive explicit disposition; required_actions keep current terminal clearing behavior."
      B: "Both blockers and required_actions receive ID-based disposition and exact-text history; archive still rejects active blockers and may not silently discard opaque actions."
    recommendation: B
    reason: "The current terminal transition clears required_actions; limiting preservation to blockers could repeat the same silent-loss failure for legacy actions."
    owner: [developer, qc]
    status: PROPOSED
    verification_consequence: "Test duplicate and opaque legacy text in both collections, including a terminal transition with an unresolved action."
  - id: OQ-TAR-005
    topic: "Backward compatibility and classification"
    options:
      A: "Dual-read existing reports with optional resolved history; write the new shape only when a report is dispositioned, without bulk migration."
      B: "Eagerly rewrite all historical reports to assign IDs and history before allowing the new archive rule."
    recommendation: A
    reason: "A satisfies the reader compatibility obligation and avoids modifying historical reports unrelated to this defect."
    owner: [developer, qc]
    status: PROPOSED
    verification_consequence: "Recount and load all tracked reports at verify time; compare opaque text exactly; classify the actual spec impact before s04."
  - id: OQ-TAR-006
    topic: "CR-008 branch/worktree cleanup timing"
    options:
      A: "After Maintainer confirms the approved linked handoff, exact-text preservation, independent branch-finish checks, and no remaining dependency on the old worktree."
      B: "After this defect reaches DoD."
    recommendation: A
    reason: "A follows the existing CR-008 archive-metadata cleanup sequence; it does not itself authorize cleanup."
    owner: [maintainer]
    status: PROPOSED
    verification_consequence: "Separate read-only branch-finish audit before any merge, removal, or deletion."
missing_inputs:
  - "Human disposition of OQ-TAR-001..006 with the listed roles."
  - "Explicit classification of defect_source and spec_impact_classified in CR-009 before s04; the approved CLI proposal currently shows n/a and false defaults."
conflicts:
  - id: C-TAR-001
    evidence: "CR-009 approval wrote defect_source=n/a and spec_impact_classified=false, while the s01 baseline identifies a code-path defect with protocol-spec impact."
    resolution_owner: [developer, qc, maintainer]
    action: "Classify the metadata and determine whether the approved proposal needs a reviewed amendment; do not silently edit the trusted decision."
  - id: C-TAR-002
    evidence: "The new report still lists a change-approval required_action although the trusted CR-009 receipt is APPROVED."
    resolution_owner: [developer, qc]
    action: "Treat the receipt as authority; inspect whether the stale action is an existing projection issue before deciding if it belongs in this defect."
assumptions:
  - "Only the recommendation bundle is proposed here; no OQ has a new human approval yet."
  - "The current 14-report count includes this newly materialized work item; verification must recalculate the corpus."
  - "CR-008 archive history and v2.6.2 artifacts are immutable inputs."
recommendation_bundle: ["OQ-TAR-001:B", "OQ-TAR-002:A", "OQ-TAR-003:A", "OQ-TAR-004:B", "OQ-TAR-005:A", "OQ-TAR-006:A"]
```

## Input Readiness
```yaml
step: s04
status: BLOCKED
available_inputs:
  - "Maintainer-approved CR-009 and work-item trusted receipts."
  - "s01 request, SA/TA drivers, and draft acceptance criteria."
  - "s02 business goal and non-goals."
  - "CR-008 finding and archive evidence."
missing_inputs:
  - "OQ-TAR-001..006 decisions by listed owners."
  - "CR-009 defect/spec-impact metadata classification."
invalid_inputs: []
conflicts:
  - "C-TAR-001: approved change metadata still has default classification."
  - "C-TAR-002: stale change approval action appears in the new work-item report."
assumptions:
  - "s04 can be drafted but cannot be called ready or used to open implementation until the above decisions are resolved."
risk_level: HIGH
next_action: "Human owners review the recommendation bundle; then classify metadata and refresh readiness."
```

## Audit
```yaml
step: s03
status: PASS
audit_status: PASS
checks:
  - { criterion: "Each open question has options, recommendation, owner, and verification consequence", result: PASS, evidence: "OQ-TAR-001..006 in Artifact Chính" }
  - { criterion: "Conflicting metadata is visible", result: PASS, evidence: "C-TAR-001 and C-TAR-002" }
  - { criterion: "No question is marked resolved without owner approval", result: PASS, evidence: "All OQ-TAR-001..006 have status PROPOSED" }
  - { criterion: "s04 readiness remains blocked while decisions can change criteria", result: PASS, evidence: "Input Readiness status BLOCKED" }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Authoring completed in the current session; owner review is not yet timed."
gaps: []
risk_level: HIGH
next_action: "Obtain explicit owner decisions; then rerun the s04 input-readiness assessment."
notes:
  - "s03 authoring passes; the separate s04 input-readiness gate remains blocked."
```

## Traceability
```yaml
upstream:
  - "terminal-archive-legacy-state-reconciliation.s01.restate.md"
  - "terminal-archive-legacy-state-reconciliation.s02.business-goal.md"
  - "changes/CR-009/proposal.md"
question_ids: [OQ-TAR-001, OQ-TAR-002, OQ-TAR-003, OQ-TAR-004, OQ-TAR-005, OQ-TAR-006]
next_step: "s04 Acceptance + DoR only after owner decisions and metadata classification"
```

## Handoff
- Readiness: BLOCKED for s04; the options above are not approved decisions.
- Human action: Maintainer, Developer, and QC review the recommendation bundle within their listed authority. No production implementation is opened.
