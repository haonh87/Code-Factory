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
status: verified
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
> The human accepted OQ-TAR-001..006 and the CR-009 code/true classification. Runtime inspection then exposed a separate public-contract routing conflict (OQ-TAR-007); s04 readiness remains blocked until that scope decision and routing amendment are reviewed. No implementation or cleanup is opened.

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
  - "Treat recommendations as approved without an explicit human decision."
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
    selected_option: B
    status: RESOLVED
    verification_consequence: "Duplicate-text entries must receive distinct selectable IDs; stale or ambiguous IDs must reject without mutation."
  - id: OQ-TAR-002
    topic: "Disposition operation boundary"
    options:
      A: "A separate, atomic disposition operation moves one selected entry to resolved history; archive is a later guard-only operation."
      B: "An archive command also accepts IDs and disposes entries in the same operation."
    recommendation: A
    reason: "Separates the auditable human decision from terminal state change and keeps the archive invariant simple."
    owner: [developer, qc]
    selected_option: A
    status: RESOLVED
    verification_consequence: "Test atomic move, retry, failure injection, and archive rejection before all active blockers are resolved."
  - id: OQ-TAR-003
    topic: "Who may authorize a historical disposition"
    options:
      A: "Maintainer authorizes or executes each explicit disposition; Developer owns the implementation; QC independently checks evidence before terminal acceptance."
      B: "Developer executes dispositions under a standing Maintainer approval; QC checks afterward."
    recommendation: A
    reason: "The action removes an active historical blocker, so its authority must be explicit and attributable without guessing from prose."
    owner: [maintainer, developer, qc]
    selected_option: A
    status: RESOLVED
    verification_consequence: "Audit record identifies actor, decision reason, selected ID, source collection, time, and independent QC review."
  - id: OQ-TAR-004
    topic: "Which active state collections require preservation"
    options:
      A: "Only blockers receive explicit disposition; required_actions keep current terminal clearing behavior."
      B: "Both blockers and required_actions receive ID-based disposition and exact-text history; archive still rejects active blockers and may not silently discard opaque actions."
    recommendation: B
    reason: "The current terminal transition clears required_actions; limiting preservation to blockers could repeat the same silent-loss failure for legacy actions."
    owner: [developer, qc]
    selected_option: B
    status: RESOLVED
    verification_consequence: "Test duplicate and opaque legacy text in both collections, including a terminal transition with an unresolved action."
  - id: OQ-TAR-005
    topic: "Backward compatibility and classification"
    options:
      A: "Dual-read existing reports with optional resolved history; write the new shape only when a report is dispositioned, without bulk migration."
      B: "Eagerly rewrite all historical reports to assign IDs and history before allowing the new archive rule."
    recommendation: A
    reason: "A satisfies the reader compatibility obligation and avoids modifying historical reports unrelated to this defect."
    owner: [developer, qc]
    selected_option: A
    status: RESOLVED
    verification_consequence: "Recount and load all tracked reports at verify time; compare opaque text exactly; classify the actual spec impact before s04."
  - id: OQ-TAR-006
    topic: "CR-008 branch/worktree cleanup timing"
    options:
      A: "After Maintainer confirms the approved linked handoff, exact-text preservation, independent branch-finish checks, and no remaining dependency on the old worktree."
      B: "After this defect reaches DoD."
    recommendation: A
    reason: "A follows the existing CR-008 archive-metadata cleanup sequence; it does not itself authorize cleanup."
    owner: [maintainer]
    selected_option: A
    status: RESOLVED
    verification_consequence: "Separate read-only branch-finish audit before any merge, removal, or deletion."
  - id: OQ-TAR-007
    topic: "Public CLI/data-contract applicability after selecting a separate disposition operation"
    options:
      A: "Keep the supported wfc disposition operation and persisted resolved-state contract; reroute CR-009 as product_delivery with public_contract=true and obtain the resulting applicable gate receipts."
      B: "Constrain the repair to a private, repository-only maintenance operation with no supported wfc command or public data-contract change; amend the approved defect boundary and acceptance criteria accordingly."
    recommendation: A
    reason: "CR-009 already lists CLI and persisted-state compatibility among impacted areas, and workflow-bundle publishes wfc as its package bin. A preserves the accepted reusable structural fix without hiding a public contract change under maintenance routing."
    owner: [maintainer, developer, qc]
    status: PROPOSED
    verification_consequence: "If A, update routing/applicability before s04 and test CLI/data compatibility; if B, prove the public CLI and package data contract are untouched."
decision_record:
  selected_bundle: ["OQ-TAR-001:B", "OQ-TAR-002:A", "OQ-TAR-003:A", "OQ-TAR-004:B", "OQ-TAR-005:A", "OQ-TAR-006:A"]
  authority: "Human user accepted the immediately preceding proposal naming Maintainer, Developer, and QC for their listed decisions."
  recorded_at: "2026-09-16T07:59:30Z"
  source: "User message: accept theo đề xuất của bạn"
  scope: "Open-question choices and CR-009 classification only; no Spec, DoR, Approach, Task Plan, implementation, DoD, or cleanup approval."
missing_inputs:
  - "Owner decision on OQ-TAR-007 and a reviewed routing/amendment path before s04."
conflicts:
  - id: C-TAR-001
    status: RESOLVED
    evidence: "Human-approved classification is now materialized as defect_source=code and spec_impact_classified=true in CR-009 proposal frontmatter; the original trusted approval receipt remains unchanged."
  - id: C-TAR-002
    status: BASELINE_SYMPTOM
    evidence: "The new report still lists a change-approval required_action although the trusted CR-009 receipt is APPROVED; OQ-TAR-004:B places opaque required_actions preservation and disposition inside this defect."
    action: "Use the trusted receipt for current approval authority; cover stale required_actions projection in s04 criteria and s08 tests without clearing by prose."
  - id: C-TAR-003
    status: OPEN
    evidence: "The approved proposal lists CLI and persisted-state compatibility, and workflow-bundle/package.json publishes bin.wfc, but the materialized report is request_lane=maintenance with only task_plan/dod gates. The adaptive hard trigger for a public API/event/data contract requires product_delivery plus contract applicability."
    resolution_owner: [maintainer, developer, qc]
    action: "Decide OQ-TAR-007, then amend the route and applicable approvals or narrow the scope explicitly; do not hand-edit CLI-owned protocol state."
assumptions:
  - "The approval applies to the exact recommendation bundle previously presented to the human; it does not approve later gates."
  - "The current 14-report count includes this newly materialized work item; verification must recalculate the corpus."
  - "CR-008 archive history and v2.6.2 artifacts are immutable inputs."
recommendation_bundle: ["OQ-TAR-001:B", "OQ-TAR-002:A", "OQ-TAR-003:A", "OQ-TAR-004:B", "OQ-TAR-005:A", "OQ-TAR-006:A"]
pending_recommendation: "OQ-TAR-007:A"
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
  - "OQ-TAR-007 scope decision and reviewed routing amendment."
invalid_inputs: []
conflicts:
  - "C-TAR-003: public CLI/data-contract impact conflicts with maintenance-only materialization."
assumptions:
  - "C-TAR-002 remains a baseline symptom to specify and test, not evidence that the already-approved change receipt is invalid."
risk_level: HIGH
next_action: "Obtain OQ-TAR-007 decision and update routing/applicability without hand-editing protocol state; then reassess s04 readiness."
```

## Audit
```yaml
step: s03
status: PASS
audit_status: PASS
checks:
  - { criterion: "Each open question has options, recommendation, owner, and verification consequence", result: PASS, evidence: "OQ-TAR-001..007 in Artifact Chính" }
  - { criterion: "Conflicting metadata and routing are visible", result: PASS, evidence: "C-TAR-001..003" }
  - { criterion: "No question is marked resolved without owner approval", result: PASS, evidence: "Human accepted the exact recommendation bundle; see decision_record" }
  - { criterion: "s04 readiness reflects unresolved routing conflict", result: PASS, evidence: "Input Readiness status BLOCKED for OQ-TAR-007 and C-TAR-003; CR-009 classification is code/true" }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Human accepted the recommendation bundle in the current review cycle; the decision was recorded at 2026-09-16T07:59:30Z."
gaps:
  - "OQ-TAR-007 and the routing amendment remain open before s04."
risk_level: HIGH
next_action: "Obtain OQ-TAR-007 decision and reviewed routing amendment."
notes:
  - "The six approved questions remain resolved; public-contract routing is a newly discovered and separately owned question."
```

## Traceability
```yaml
upstream:
  - "terminal-archive-legacy-state-reconciliation.s01.restate.md"
  - "terminal-archive-legacy-state-reconciliation.s02.business-goal.md"
  - "changes/CR-009/proposal.md"
question_ids: [OQ-TAR-001, OQ-TAR-002, OQ-TAR-003, OQ-TAR-004, OQ-TAR-005, OQ-TAR-006, OQ-TAR-007]
next_step: "Resolve OQ-TAR-007 and routing before s04 Acceptance + DoR"
```

## Handoff
- Readiness: BLOCKED for s04 by the newly identified public-contract routing conflict; OQ-TAR-001..006 and metadata remain approved.
- No production implementation, DoD, or CR-008 worktree cleanup is opened by this s03 decision.
