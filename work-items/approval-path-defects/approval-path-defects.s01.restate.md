---
artifact_id: "approval-path-defects.s01.restate"
artifact_family: workflow-step
work_item_slug: "approval-path-defects"
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
  card: "product-specs/cards/approval-path-defects.md"
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
  - "artifact-governance"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "work-items/artifact-governance-model/artifact-governance-model.s01.restate.md"
  - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s07.implementation.md"
linked_artifacts:
  - "product-specs/cards/approval-path-defects.md"
tags:
  - "agent-ops"
  - "workflow/s01"
  - "approval-path"
---

# Step 1 - Clarify

> [!summary]
> Four defects on the `wfc` approval path, every one hit while using it rather than read
> out of the code. Three share one cause: the CLI does not carry work-item state forward
> into the artifacts it generates. The fourth is a documented order that cannot be followed.

## Step Contract
```yaml
step_goal: "Restate four observed defects with their symptom, their location and their unifying cause, and confirm this is a defect fix rather than a contract change."
input_summary:
  - "Three defects recorded during artifact-governance-model: TD-01, TD-02, tooling_gap_found_3"
  - "One further defect observed during artifact-governance-enforcement"
  - "Code locations verified 2026-08-17"
output_summary:
  - "Four defects with symptom, location, and observed error text"
  - "Unifying cause and the one that does not share it"
  - "Light eligibility verdict with each hard trigger checked"
done_when:
  - "Every defect has an observed symptom, not an inferred one"
  - "Every location is a verified file and line"
  - "The eligibility verdict names the triggers checked, not just the conclusion"
owner: "ba"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "TDD for behavior change"
  - "Prefer the smallest solution that is correct"
  - "Brownfield baseline and delta discipline"
  - "AI proposes, human approves"
required_reviews:
  - "Spec + DoR at s04"
  - "Approach + Task Plan at s06"
prohibited_actions:
  - "Weakening any gate control: the TTY requirement, the passphrase, the per-gate receipt, the digest binding, or the human-fills-gate_reviews rule"
  - "Touching packages/workflow-bundle before the Approach and Task Plan receipts"
  - "Writing in the main tree where it overlaps an active work item"
open_governance_questions:
  - "ODC-001: should persisting the bootstrap report respect protocolControl.legacyScaffoldPolicy, whose stated strict default is forbid, or work out of the box for the manual path the policy recommends?"
```

## Artifact Chính
```yaml
raw_request: "Làm work item sửa đường approval, được chọn là ưu tiên 2 sau khi T0-F1 đóng."
restated_request: "Fix four defects that make the documented wfc approval path unfollowable: a scaffolded work item that cannot be approved, a documented order that guarantees stale receipts, and two generators that emit notes inconsistent with the work item they belong to."
request_type: BUG
defect_source: KNOWN
spec_impact: NONE
user_problem: "Opening and closing a work item costs several failed commands. In the two work items completed before this one, four commands failed and two rounds were spent recovering, every time for one of the four causes below. The manual authoring path that AGENTS.global.md recommends as the default cannot reach ACTIVE at all without a hand-built file."
business_context: "workflow-bundle v2.3.2 is published for adoption. An adopter following the documented flow hits the same four walls, and two of them look like configuration errors rather than tool defects, which is the worst kind of first impression for a governance product."

# The card holds the requirement and acceptance text. Not restated here.
spec_card_ref: "product-specs/cards/approval-path-defects.md"

defects:
  - id: "TD-01"
    symptom: "wfc work-item approve fails on a work item created with wfc scaffold-step."
    observed_error: "ERROR: Missing work item report: .../<slug>.work-item-report.json"
    locations:
      - "packages/workflow-bundle/scripts/work-item-protocol.js:691 - allowBootstrap is granted only for action=status"
      - "packages/workflow-bundle/scripts/work-item-protocol-utils.js:283 - buildBootstrapReport produces the correct report and is never persisted; its only caller is loadProtocolReport in the same file"
      - "packages/workflow-bundle/scripts/scaffold-workflow.js - contains no reference to work-item-report"
    times_hit_this_session: 2
    unifying_cause: "state not carried forward"
  - id: "TD-02"
    symptom: "Sealing gates in the documented order guarantees every receipt goes stale."
    observed_error: "ERROR: Cannot move work item to ACTIVE because step gates are not satisfied: Required workflow gate note must be reviewed or finalized ... spec_status must be approved|frozen"
    locations:
      - "packages/workflow-bundle/bin/wfc.js:320 - step 8 seal gates"
      - "packages/workflow-bundle/bin/wfc.js:322 - step 9 activate, with nothing between them"
      - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js:264 - rejects status draft at transition"
      - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js:282 - requires spec_status approved or frozen"
      - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js:312 - fails with 'stale after artifact changed' once the note hash moves"
    correct_order_missing_from_docs: "fill gate_reviews -> set status and spec_status -> seal -> activate"
    times_hit_this_session: 2
    unifying_cause: "documented order is wrong"
  - id: "TD-03"
    symptom: "The note wfc work-item activate creates lazily fails validation immediately."
    observed_error: "ERROR: Missing spec_refs.card for SDD note: .../<slug>.s07.implementation.md"
    detail: "The generated note carried spec_refs.card empty and work_item_type FEATURE while the work item was sdd_mode=light with a card and work_item_type=CHANGE."
    times_hit_this_session: 1
    unifying_cause: "state not carried forward"
  - id: "TD-04"
    symptom: "wfc scaffold-step emits a note inconsistent with its own work item."
    observed_error: "ERROR: Inconsistent planning_track within work item '<slug>': .../<slug>.s08.verification.md"
    detail: "Defaults to planning_track full, sdd_mode none and work_item_type FEATURE regardless of the sibling notes. On a quick-track work item this fails validation at once; on a full-track one it silently produced work_item_type FEATURE in five notes that had to be hand-corrected."
    times_hit_this_session: 2
    unifying_cause: "state not carried forward"

unifying_diagnosis: "Three of the four - TD-01, TD-03, TD-04 - are the same defect in three places: the CLI knows the work item's state and does not carry it into what it generates or persists. TD-02 is different in kind: the controls are correct and the documented order is not. Fixing the three together is cheaper than three separate fixes, and the fourth is mostly a documentation change plus one refusal."

sdd_light_eligibility:
  verdict: ELIGIBLE
  soft_conditions:
    delivery_context: "brownfield - PASS"
    planning_track: "quick - PASS"
    governance_profile: "default - PASS"
    execution_mode: "agentic - PASS"
    interaction_mode: "self - PASS"
    risk: "medium - PASS"
  hard_triggers_checked:
    - "greenfield or needs Foundation Decision: NO"
    - "touches a public API, event or data contract: NO. The CLI behaviour changes to match its own documentation; no schema, event or data contract moves. Persisting a report that is already built in memory is additive."
    - "database migration, backfill or cutover: NO"
    - "regulated or security-sensitive evidence: NO. Gate controls are explicitly out of scope and unchanged."
    - "multi-agent delegation: NO"
    - "defect_source UNKNOWN or spec impact unclassified: NO. Every defect has a verified file and line, and spec_impact is NONE."
    - "high blast radius or spans multiple systems: NO. Four files plus fixtures, one package."
    - "complex UAT or release gate: NO"
    - "compact CR exceeding requirement-only delta: NOT APPLICABLE, no CR"
  consequence: "Light: three physical notes for authoring, s07 and s08 created lazily. Contrast with artifact-governance-enforcement, which escalated to full on the public-contract trigger."

scope_draft:
  in_ref: "product-specs/cards/approval-path-defects.md#Business Goal"
  out_ref: "product-specs/cards/approval-path-defects.md#Business Goal"
  note: "in_scope and out_scope live in the card. Repeating them here would be the duplication this repository now forbids - ownership-table.md row 12."

constraints_initial:
  - "No gate control weakens. The TTY refusal, the passphrase, the per-gate receipt, the digest binding and the human-fills-gate_reviews rule stay exactly as they are."
  - "The 15 existing trusted receipts must still report digest_match=true afterwards."
  - "stabilize-architecture-skill-bundle is ACTIVE and holds write roots in the same package. A worktree is required."
  - "Behaviour change, so TDD applies: each defect gets a fixture that is observed red first."

assumptions_initial:
  - id: "A1"
    assumption: "This is a BUG work item, not a CHANGE. The tool is being made to match its own documented behaviour."
    reject_if: "Persisting the bootstrap report is considered a new capability rather than a defect fix, which would make it a CHANGE and re-open the escalation question."
  - id: "A2"
    assumption: "TD-02 is fixed by refusing to seal an unfinalized note, plus documenting the order - not by making receipts tolerate later edits."
    reject_if: "The repository would rather keep sealing permissive and document the order only."
  - id: "A3"
    assumption: "The three state-propagation defects are fixed together as one change."
    reject_if: "The human wants them split so each can be released and observed independently."

dependencies_initial:
  - "A worktree, because stabilize-architecture-skill-bundle holds overlapping write roots"
  - "packages/workflow-bundle test suite and governance fixtures"

risks_initial:
  - id: "S01-R01"
    description: "A fix that makes sealing stricter breaks anyone who currently seals early and edits afterwards."
    severity: MEDIUM
    mitigation: "ODC-002. The refusal message must state the correct order so the failure teaches the fix."
  - id: "S01-R02"
    description: "Persisting the bootstrap report under the strict legacyScaffoldPolicy=forbid default contradicts a stated policy posture."
    severity: MEDIUM
    mitigation: "ODC-001 is a human decision. Recorded rather than resolved by the implementer."
  - id: "S01-R03"
    description: "Changing generator defaults silently alters notes for adopters who relied on the old defaults."
    severity: LOW
    mitigation: "Inheriting from siblings only changes output where the old output was already invalid."
  - id: "S01-R04"
    description: "Concurrent work in packages/workflow-bundle with two other work items in flight."
    severity: HIGH
    mitigation: "Worktree, and s07 sequencing checked against both other work items before it opens."
```

## Work Item Materialization
```yaml
materialization_status: READY
decision_owner: coordinator
request_source: "legacy-scaffold"
raw_request_summary: "Fix four defects on the wfc approval path."
split_decision: single
dedup_result: no_conflict
delivery_context: brownfield
work_item_slug: "approval-path-defects"
work_item_type: BUG
change_strategy: none
change_id: ""
decision_reason:
  - "No change package. Defect fix with spec_impact NONE, and a CHANGE package would add seven files carrying layers work-items/ already owns."
existing_refs:
  - "work-items/artifact-governance-model"
  - "work-items/artifact-governance-enforcement"
  - "work-items/stabilize-architecture-skill-bundle"
blockers:
  - "s07 requires a worktree; two other work items hold write roots in the same package"
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
report_provenance: "Persisted by calling the bundle's own loadProtocolReport with allowBootstrap, because TD-01 - the defect this work item exists to fix - blocks wfc work-item approve otherwise. Third application of the workaround in this session, which is itself the strongest argument for the fix."
```

## Work Item Protocol
```yaml
protocol_status: DONE
approval_status: APPROVED
review_required: true
work_item_slug: "approval-path-defects"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/approval-path-defects"
current_step: "s08"
granted_write_paths:
  - ".claude/worktrees/approval-path-defects"
  - "work-items/approval-path-defects"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "coordinator"
protocol_owner: "ba"
reviewed_by: "ba"
reviewed_at: "2026-08-17T09:07:52.849Z"
handoff_target: "archive-lifecycle"
last_transition_action: "close"
last_transition_at: "2026-08-19T02:12:31.524Z"
required_actions:
  - "Archive the work item when all downstream lifecycle actions are complete."
blockers: []
review_notes:
  - "Human review approved."
refs:
  - "work-items/approval-path-defects"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
  - "DONE_CONFIRMED"
```

## Business Goal
```yaml
# Light hosts s02 here.
business_goal_ref: "product-specs/cards/approval-path-defects.md#Business Goal"
user_value: "One attempt per command. A work item opens and closes without the operator learning four undocumented workarounds first."
success_outcome:
  - "A scaffold-created work item reaches ACTIVE with no hand-built file"
  - "The documented order, followed literally, produces receipts that stay valid"
  - "A generated note passes validation with no hand editing"
  - "15 of 15 existing receipts still match; zero of 26 unit files and 10 fixtures regress"
non_goals:
  - "Weakening any gate control - the friction being removed is accidental, the authority is not"
  - "Redesigning the approval model"
  - "The artifact-governance enforcement work, or P4 placement"
metrics_candidate:
  - "Commands failed while opening and closing a fresh work item: target 0, baseline 4 observed"
  - "Notes needing hand edits after generation: target 0, baseline 6 observed"
  - "Existing receipts still matching: 15 of 15"
```

## Open Questions
```yaml
# Light hosts s03 here.
blocking_s04: []
carried_to_card:
  - "ODC-001 gate the report persistence on legacyScaffoldPolicy, or unconditional"
  - "ODC-002 fix TD-02 in the tool, the documentation, or both"
readiness_verdict: "READY for s04. Both open decisions shape the approach, not the acceptance criteria: acceptance is stated as observable symptoms disappearing, which holds under either resolution."
evidence_quality_note: "Every defect here was observed as a failed command with its error text recorded, in two work items driven end to end. None was inferred from reading code, which is why the acceptance criteria can be written against symptoms."
```

## Traceability
```yaml
source_inputs:
  - "work-items/artifact-governance-model/artifact-governance-model.s01.restate.md#Artifact Chính"
  - "work-items/artifact-governance-model/artifact-governance-model.s07.implementation.md#Artifact Chính"
  - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s07.implementation.md#Artifact Chính"
  - "Code locations verified against the working tree on 2026-08-17"
next_step: "s04 Acceptance + DoR"
sdd_light_note: "No s02 or s03 physical note; their content is hosted above. No s05 note; Approach is hosted in s06."
```

## Handoff
- Four defects, each with an observed error string and a verified file and line. None inferred.
- Three share one cause: the CLI does not carry work-item state into what it generates. `TD-02` is a documented order that cannot be followed.
- Light is eligible and every hard trigger was checked individually, not assumed. This is the contrast case to `artifact-governance-enforcement`, which escalated to full on the public-contract trigger.
- Two open decisions belong to a human: `ODC-001` policy posture for report persistence, `ODC-002` whether stricter sealing is acceptable.
- Condition to move to `s04`: none outstanding.
