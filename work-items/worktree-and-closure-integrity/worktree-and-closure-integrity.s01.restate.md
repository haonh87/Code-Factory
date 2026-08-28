---
artifact_id: "worktree-and-closure-integrity.s01.restate"
artifact_family: workflow-step
work_item_slug: "worktree-and-closure-integrity"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/worktree-and-closure-integrity.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec:
    - "ba"
  dor:
    - "po"
    - "ba"
  approach:
    - "developer"
  task_plan:
    - "developer"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> Four defects carried out of two completed work items. Three appear only when the
> mandatory worktree rule is obeyed. The fourth is structural: a work item can reach
> `DONE` with every gate sealed while the change it claims to have delivered exists
> nowhere in git history.

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "TDD for behavior change"
  - "Prefer the smallest solution that is correct"
  - "Worktree for large or risky changes"
  - "Do not self-declare done"
  - "AI proposes, human approves"
required_reviews:
  - "Spec + DoR at s04"
  - "Approach + Task Plan at s06"
prohibited_actions:
  - "Weakening any gate control: TTY, passphrase, per-gate receipt, digest binding, human-filled gate_reviews"
  - "Rewriting any existing .work-item-report.json - four work items' reports are referenced by sealed receipts"
  - "Re-opening a closed work item to retro-fix these defects"
  - "Touching packages/workflow-bundle before the Approach and Task Plan receipts"
open_governance_questions:
  - "REQ-004 makes DoD stricter. Does tightening a gate that has already passed on four work items need a governance decision about those four, or does it apply prospectively only?"
```

## Artifact Chính
```yaml
raw_request: "1,3 - close artifact-governance-enforcement first, then open the work item for the carried-forward defects."
restated_request: "Fix four defects that let governance pass while reality does not: three where a tool resolves paths against the wrong tree or leaves a finalization requirement undocumented, and one where DoD closes over an uncommitted delivery."
request_type: BUG
defect_source: KNOWN
spec_impact: NONE
user_problem: "Two work items closed DONE this session. Both were correct at the governance layer and both left something untrue. Three tools misbehave under the worktree rule that policy makes mandatory. And the DoD gate, whose whole purpose is to decide whether a work item is finished, does not check whether the change is in the repository."
business_context: "workflow-bundle v2.4.0 is published. An adopter following the mandatory worktree rule hits three of these on their first large change, and the fourth means their audit trail can certify a delivery that is not there."

spec_card_ref: "product-specs/cards/worktree-and-closure-integrity.md"

defects:
  - id: "D-A"
    requirement: REQ-001
    symptom: "wfc protocol fails inside any worktree."
    observed_error: "ERROR: workflow_root mismatch in .../worktrees/<name>/work-items/<other-item>/<other-item>.work-item-report.json"
    locations:
      - "All .work-item-report.json files store an absolute workflow_root"
      - "packages/workflow-bundle/scripts/validate-work-item-protocol.js:121 compares it to the currently resolved path"
    aggravating: "The message names a DIFFERENT work item's file, so it reads as data corruption rather than path resolution."
    carried_from: "approval-path-defects REQ-007 / T0-F2"
  - id: "D-B"
    requirement: REQ-002
    symptom: "An edit to any file under a bin/ directory is blocked even when its test exists."
    observed: "packages/workflow-bundle/bin/wfc.js was blocked while packages/workflow-bundle/test/wfc.test.js existed. The hook asked for packages/workflow-bundle/bin/test/wfc.test.js."
    cause: "The mapping has rules for /scripts/+/packages/, /src/+/mcp/ and a leading scripts/; bin/ falls to the generic sibling-test rule, and the two fallbacks only rewrite /scripts/ and /src/."
    carried_from: "approval-path-defects T4-F1"
  - id: "D-C"
    requirement: REQ-003
    symptom: "wfc work-item verify refuses on an undocumented requirement."
    observed_error: "ERROR: ... s07 implementation note must be reviewed or finalized before verification"
    locations:
      - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js:340"
    why_still_open: "approval-path-defects TD-02 fixed the seal-then-activate instance and documented it as steps 7b/7c. The verify transition is a different call site and was left undocumented."
    carried_from: "approval-path-defects RR-5"
  - id: "D-D"
    requirement: REQ-004
    symptom: "A work item reaches DONE while its delivery is absent from git history."
    measured_2026_08_19:
      work_item: "artifact-governance-enforcement"
      governance_state: "protocol_status=DONE, 6 of 6 gates APPROVED with digest_match=true, s08 approved, full audit trail"
      repository_state: "main contains none of artifactGovernance, layerRoots or the Role Outputs emission; its branch is 0 commits ahead of main; its worktree holds 51 uncommitted files"
    second_instance: "approval-path-defects reached DONE in the same state. Its four fixes were committed and merged only after a human asked, and the s08 note had recorded RR-4 stating plainly that main still had the defects - so the note was honest while the gate was not."
    why_it_is_the_worst_of_the_four: "The other three are friction: a command fails and the operator sees it. This one is silent. A sealed receipt certifies a verdict about work that is one `git clean` from disappearing, and nothing in the chain notices."
    not_a_criticism_of_either_work_item: "Both recorded the state truthfully in their own notes. The gap is that DoD does not read what the notes already say."

unifying_diagnosis: "D-A, D-B and D-C are one class: a tool assumes the shape of the environment rather than checking it - which tree it is in, which directory layout it is looking at, which transition it is documenting. D-D is a different class: a gate that decides completion does not look at the artifact of completion. Grouping them is justified by cost, not by cause: all four are small, all four live in the same package, and all four were paid for in this session."

sdd_light_eligibility:
  verdict: ELIGIBLE
  soft_conditions: "brownfield, quick, default profile, agentic, self, risk medium - all PASS"
  hard_triggers_checked:
    - "greenfield or Foundation Decision: NO"
    - "public API/event/data contract: NO. Three are defect fixes making tools match their own documentation. REQ-004 tightens a gate, which changes behaviour for adopters - see the escape hatch in AC-004 and the open governance question above. Judged not a contract change because the gate's stated purpose is unchanged."
    - "database migration, backfill, cutover: NO"
    - "regulated or security-sensitive evidence: NO. Gate controls are out of scope and unchanged."
    - "multi-agent delegation: NO"
    - "defect_source UNKNOWN or spec impact unclassified: NO. All four have a verified location or a measured repository state."
    - "high blast radius or multiple systems: NO. Four files plus fixtures, one package."
    - "complex UAT or release gate: NO"
  consequence: "Light: three authoring notes, s07 and s08 created lazily."

scope_ref: "product-specs/cards/worktree-and-closure-integrity.md#Business Goal"

constraints_initial:
  - "No gate control weakens. REQ-004 adds a check; it removes none."
  - "No existing .work-item-report.json may be rewritten. Four work items' reports are referenced by sealed receipts, and D-A's fix must therefore work without touching them."
  - "The 21 existing trusted receipts must still report digest_match=true afterwards."
  - "Behaviour change in all four cases, so TDD applies: each defect gets a fixture observed failing first."

assumptions_initial:
  - id: "A1"
    assumption: "This is a BUG work item. Three fixes make tools match their own documentation; the fourth makes a gate read evidence it already has access to."
    reject_if: "REQ-004 is considered a new capability rather than a defect, which would make it a CHANGE and reopen the escalation question."
  - id: "A2"
    assumption: "All four are fixed in one work item."
    taken_because: "Same package, same test suite, all four small, and all four already cost real time this session."
    reject_if: "REQ-004 deserves its own work item because it changes what DONE means, which is a governance question rather than a defect."
  - id: "A3"
    assumption: "REQ-004 needs an escape hatch with a stated reason, because a docs-only or research work item may legitimately have nothing to commit."
    reject_if: "Every work item is expected to produce a committed artifact, in which case the hatch is unnecessary."

dependencies_initial:
  - "A worktree - which is itself affected by D-A, so the worktree baseline must record that wfc protocol is expected to fail there until D-A lands"
  - "packages/workflow-bundle test suite and governance fixtures"

risks_initial:
  - id: "S01-R01"
    description: "REQ-004 could block a legitimate close - for example a work item whose only output is a decision, or one deliberately parked on a branch."
    severity: HIGH
    mitigation: "AC-004 requires an escape hatch with a stated reason visible in output. Without it the check gets disabled wholesale, which is the failure mode already recorded once in this repository's history."
  - id: "S01-R02"
    description: "Fixing D-A by rewriting stored reports would invalidate receipts."
    severity: HIGH
    mitigation: "ASM-001 forbids rewriting. Normalise at comparison time, or write relative for new reports while tolerating absolute in old ones."
  - id: "S01-R03"
    description: "Three worktrees currently exist and two hold uncommitted work belonging to other work items. A fourth worktree adds contention."
    severity: MEDIUM
    mitigation: "artifact-governance-enforcement is DONE but its 51 uncommitted files are unresolved. Confirm with the owner before creating another worktree over the same package."
  - id: "S01-R04"
    description: "The tdd-enforce hook is disabled in this session's environment, so TDD is unguarded until the session restarts."
    severity: MEDIUM
    mitigation: "settings.local.json is already clean; the live env still carries CF_DISABLED_HOOKS. s07 must not start in this session unless the guard is verified live."
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: coordinator
request_source: "legacy-scaffold"
raw_request_summary: "Fix four carried-forward defects in worktree handling and closure integrity."
split_decision: single
dedup_result: no_conflict
delivery_context: brownfield
work_item_slug: "worktree-and-closure-integrity"
work_item_type: BUG
change_strategy: none
change_id: ""
decision_reason:
  - "No change package. spec_impact NONE, and a CHANGE package would add seven files carrying layers work-items/ already owns."
existing_refs:
  - "work-items/approval-path-defects"
  - "work-items/artifact-governance-enforcement"
blockers:
  - "s07 must not start until the tdd-enforce guard is verified live - see S01-R04"
  - "Worktree contention with artifact-governance-enforcement's 51 uncommitted files - see S01-R03"
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
report_provenance: "Persisted via the bundle's own loadProtocolReport with allowBootstrap. Note that TD-01 - which made this workaround necessary three times earlier in the session - is now fixed and merged, so `wfc work-item approve` would have persisted the report on its own. The workaround was used here only because the report was wanted before the approval step."
```

## Work Item Protocol
```yaml
protocol_status: VERIFIED
approval_status: APPROVED
review_required: true
work_item_slug: "worktree-and-closure-integrity"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/worktree-and-closure-integrity"
current_step: "s08"
granted_write_paths:
  - "packages/workflow-bundle/scripts/validate-work-item-protocol.js"
  - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
  - "packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "packages/workflow-bundle/bin/wfc.js"
  - "packages/workflow-bundle/test"
  - "packages/workflow-bundle/tests/fixtures"
  - "scripts/hooks/tdd-enforce.sh"
  - "work-items/worktree-and-closure-integrity"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "coordinator"
protocol_owner: "developer"
reviewed_by: "ba"
reviewed_at: "2026-08-19T07:21:45.142Z"
handoff_target: "definition-of-done"
last_transition_action: "verify"
last_transition_at: "2026-08-28T04:35:43.909Z"
required_actions:
  - "Collect DoD evidence and close the work item when ready."
blockers: []
review_notes:
  - "Human review approved."
refs:
  - "work-items/worktree-and-closure-integrity"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
```

## Business Goal
```yaml
business_goal_ref: "product-specs/cards/worktree-and-closure-integrity.md#Business Goal"
user_value: "A tool behaves the same wherever it runs, and DONE means the work exists."
success_outcome:
  - "wfc protocol passes inside a worktree, and still rejects a genuinely wrong workflow_root"
  - "An edit under bin/ is allowed when its test exists and blocked when it does not"
  - "The verify transition's finalization requirement is documented as the activate one now is"
  - "DoD refuses while the declared change paths are dirty, unless a reason is stated and visible"
non_goals:
  - "Weakening any gate control"
  - "Rewriting stored reports or re-opening closed work items"
  - "Requiring merge rather than commit - ODC-002"
metrics_candidate:
  - "wfc protocol: passes from a worktree; still fails on a genuinely wrong root"
  - "bin/ mapping: 1 allow case, 1 block case, existing exemptions unchanged"
  - "Four fixtures, each observed failing first"
  - "21 of 21 existing receipts still digest_match=true"
```

## Open Questions
```yaml
blocking_s04: []
carried_to_card:
  - "ODC-001 what counts as the declared change paths for REQ-004"
  - "ODC-002 committed, or committed and merged"
carried_to_governance:
  - "Does tightening DoD apply to the four work items that already closed under the looser rule, or prospectively only? Recorded in Governance Context; it is a governance decision, not an implementation one."
readiness_verdict: "READY for s04. Both open decisions shape the approach; acceptance is stated as observable behaviour and holds under either resolution."
evidence_note: "D-A, D-B and D-C each have a recorded error string and a file and line. D-D has a measured repository state on a named date. None was inferred from reading code - which matters, because the one finding this session that WAS inferred from reading code turned out to be wrong and had to be withdrawn."
```

## SDD Traceability
```yaml
requirement_refs: []
acceptance_refs: []
task_refs: []
test_refs: []
```
