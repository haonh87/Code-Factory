---
artifact_id: "approval-path-defects.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "approval-path-defects"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
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
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
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
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-17T08:50:00.000Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-08-17T08:50:00.000Z"
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
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "approval-path-defects.s01.restate.md"
  - "approval-path-defects.s02.business-goal.md"
  - "approval-path-defects.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Acceptance stated as observed symptoms disappearing, measured against a recorded baseline
> of 4 failed commands and 6 hand-edited notes. Six gate controls named as invariants.
> Spec and DoR are human gates; neither receipt is sealed.

## Step Contract
```yaml
step_goal: "Lock acceptance as observable symptoms disappearing, record the baseline the fix is measured against, and decide readiness."
input_summary:
  - "s01 four defects with observed error text and verified locations"
  - "Spec Card REQ-001 to REQ-006 and AC-001 to AC-006"
output_summary:
  - "Existing system baseline with the measured friction"
  - "Governance checks and DoR verdict"
  - "Freeze request"
done_when:
  - "Every criterion resolves against a command run and its output"
  - "The gate controls that must not change are named as invariants"
owner: "ba"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "product-specs/cards/approval-path-defects.md"
decision_notes:
  - "Requirements and acceptance live in the Spec Card and are referenced, not restated - ownership-table.md row 6."
  - "Every requirement traces to a defect observed as a failed command, not to a code reading."
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes:
  - "approval_gates.contract is not_applicable. No schema, event or data contract moves. The CLI is being made to match its own documented behaviour, and persisting a report already built in memory is additive."
  - "Contrast with artifact-governance-enforcement, where the emitted artifact shape is a contract and the gate is required. The difference is why that work item is full track and this one is Light."
```

## Existing System Baseline
```yaml
baseline_date: "2026-08-17"
measured_friction:
  commands_failed_opening_and_closing_two_work_items: 4
  recovery_rounds_spent: 2
  notes_needing_hand_edit_after_generation: 6
  workaround_applications_this_session:
    TD-01: 3
    TD-02: 2
    TD-04: 2
  note: "Counts are from this session, driving artifact-governance-model to DONE and artifact-governance-enforcement to s07. TD-01 fired a third time while opening this very work item, and TD-04 fired again on this work item's own s04 and s06."
current_behavior_refs: "artifact-governance-defects_ref: work-items/approval-path-defects/approval-path-defects.s01.restate.md#Artifact Chính"
impacted_surfaces:
  - "packages/workflow-bundle/scripts/work-item-protocol.js"
  - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
  - "packages/workflow-bundle/scripts/workflow-step-definitions.js"
  - "packages/workflow-bundle/scripts/workflow-execution-definitions.js"
  - "packages/workflow-bundle/bin/wfc.js - documented flow text"
  - "packages/workflow-bundle/test/** and tests/fixtures/**"
compatibility_constraints:
  - "The 15 existing trusted receipts must still report digest_match=true."
  - "Zero of the 26 unit test files and 10 governance fixtures may regress."
  - "All 20 work items must still pass wfc validate."
rollback_constraints:
  - "Each of the four fixes is independently revertable, because they touch different functions. The change set is not all-or-nothing, unlike the enforcement work item."
```

## Artifact Chính
```yaml
acceptance_ref: "product-specs/cards/approval-path-defects.md#Acceptance Criteria"
acceptance_ids:
  - "AC-001 scaffold-created work item reaches approve with no hand-built file"
  - "AC-002 documented order exists; sealing a draft note is refused with a message naming status and spec_status"
  - "AC-003 lazily created note inherits spec_refs, work_item_type, spec_status"
  - "AC-004 scaffolded note inherits planning_track, sdd_mode, work_item_type from siblings"
  - "AC-005 four fixtures, each observed red before the fix"
  - "AC-006 no gate control weakens; 15 receipts still match; no suite regresses"

edge_cases:
  - id: "EDGE-001"
    case: "A work item genuinely has no sibling note to inherit from - the very first scaffold."
    expected: "Fall back to the documented defaults, which is today's behaviour. Inheritance only applies where a sibling exists, so the first note is unaffected."
  - id: "EDGE-002"
    case: "Sibling notes disagree with each other on planning_track."
    expected: "Refuse rather than pick. Inheriting from an inconsistent set would launder an existing error into new notes. The existing 'Inconsistent planning_track' check already catches the state; the generator must not add to it."
  - id: "EDGE-003"
    case: "An operator seals a gate, then legitimately needs to edit the note - a real finding during review."
    expected: "The receipt goes stale and must be re-sealed. That is correct and stays. The fix is to stop the order from making it inevitable, not to make edits invisible."
  - id: "EDGE-004"
    case: "legacyScaffoldPolicy is forbid and a scaffolded work item asks to be approved."
    expected: "ODC-001. Either the report is persisted anyway, making the manual path work, or it is refused with a message naming the policy. Silently failing with 'Missing work item report' is the one outcome that must not remain."
  - id: "EDGE-005"
    case: "A fix makes wfc emit a file where adopters expected none."
    expected: "AC-001 requires the persisted report to carry approval_status PENDING_REVIEW and empty reviewed_by, so a new file never implies a new approval."

out_of_scope_ref: "product-specs/cards/approval-path-defects.md#Business Goal"

done_when:
  - "AC-001 to AC-006 each have evidence in s08"
  - "A fresh work item opens and closes with zero failed commands and zero hand edits"

behavioral_invariants:
  - "TTY refusal for non-interactive approval: unchanged"
  - "Passphrase requirement: unchanged"
  - "One independent receipt per gate: unchanged"
  - "Receipt bound to artifact sha256: unchanged"
  - "gate_reviews and role_signoffs filled by a human before sealing: unchanged"
  - "Gate host mapping for light and full: unchanged"
```

## Governance Checks
```yaml
checklist_applied: "project-context/checklists/default.md"
checks:
  - id: "GOV-01"
    check: "Smallest solution that is correct"
    result: PASS
    evidence: "Three of four defects share one cause and are fixed as one change. The fourth is documentation plus one refusal. No new abstraction, no redesign of the approval model."
  - id: "GOV-02"
    check: "TDD for behaviour change"
    result: REQUIRED
    evidence: "AC-005 requires four fixtures each observed red. This is a behaviour change in every case."
  - id: "GOV-03"
    check: "Worktree for large or risky change"
    result: REQUIRED
    evidence: "Two other work items hold write roots in packages/workflow-bundle. s01 S01-R04."
  - id: "GOV-04"
    check: "Gate controls not weakened"
    result: PASS
    evidence: "Six invariants listed above, each naming a control that stays exactly as it is."
  - id: "GOV-05"
    check: "SDD Light eligibility checked rather than assumed"
    result: PASS
    evidence: "s01 sdd_light_eligibility lists all nine hard triggers individually with a verdict each."
  - id: "GOV-06"
    check: "No self-declared gate passage"
    result: PASS
    evidence: "spec_status draft, all gate_reviews empty."
blocking_items: []
owner: "ba"
next_action: "Human Spec and DoR review."
```

## Definition of Ready
```yaml
status: READY
blockers: []
rationale: "Acceptance is written as observable symptoms disappearing, with the baseline counts recorded. Both open decisions shape the approach rather than the criteria, so acceptance holds under either resolution."
checks:
  - item: "Defects understood"
    result: PASS
    evidence: "Four, each with observed error text and a verified file and line. None inferred."
  - item: "Acceptance testable"
    result: PASS
    evidence: "AC-001, AC-003, AC-004 are single commands producing pass or fail. AC-005 is a red-then-green count. AC-006 is 15 receipts plus two suites."
  - item: "Baseline recorded"
    result: PASS
    evidence: "4 failed commands, 2 recovery rounds, 6 hand-edited notes, and per-defect workaround counts."
  - item: "Invariants named"
    result: PASS
    evidence: "Six gate controls listed as unchanged."
  - item: "Open decisions do not block"
    result: PASS
    evidence: "ODC-001 and ODC-002 are approach choices; EDGE-004 states the one outcome that is unacceptable under either."
owners:
  spec: "ba"
  dor: "po, ba"
notes:
  - "A1, A2 and A3 from s01 are the assumptions to accept or reject at this gate."
```

## Spec Freeze
```yaml
# Freeze is a human gate. This block requests it.
status: draft
authority: "ba"
decided_at: ""
frozen_by_person: ""
freeze_requested_at: "2026-08-17"
spec_version_requested: "0.1"
requirements_in_freeze:
  - "REQ-001 to REQ-006"
acceptance_in_freeze:
  - "AC-001 to AC-006"
blocking_before_freeze: []
```

## SDD Traceability
```yaml
card: "product-specs/cards/approval-path-defects.md"
requirement_to_acceptance:
  - "REQ-001 -> AC-001"
  - "REQ-002 -> AC-002"
  - "REQ-003 -> AC-003"
  - "REQ-004 -> AC-004"
  - "REQ-005 -> AC-005"
  - "REQ-006 -> AC-006"
defect_to_requirement:
  - "TD-01 -> REQ-001"
  - "TD-02 -> REQ-002"
  - "TD-03 -> REQ-003"
  - "TD-04 -> REQ-004"
coverage: "6 of 6 requirements have an acceptance criterion; 4 of 4 defects have a requirement"
```

## Traceability
```yaml
upstream:
  - "approval-path-defects.s01.restate.md#Artifact Chính"
  - "product-specs/cards/approval-path-defects.md"
next_step: "s06 Approach + Task Plan"
sdd_light_note: "Light hosts Spec + DoR here. Approach and Task Plan are hosted together at s06; there is no s05 note."
```

## Handoff
- Acceptance is stated as **symptoms disappearing**, measured against a recorded baseline: 4 failed commands, 2 recovery rounds, 6 hand-edited notes.
- Six gate controls are named as invariants. This work item removes accidental friction, not authority.
- `Contract` gate is `not_applicable`, and the note says why — the contrast with `artifact-governance-enforcement` is what keeps this work item on Light.
- Requested and not granted: Spec freeze at `v0.1`, and `DoR`.
- Carried to `s06`: `ODC-001` policy posture, `ODC-002` whether stricter sealing is acceptable, and `EDGE-002` refuse-rather-than-pick on inconsistent siblings.
