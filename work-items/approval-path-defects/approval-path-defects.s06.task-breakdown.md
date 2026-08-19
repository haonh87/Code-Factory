---
artifact_id: "approval-path-defects.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "approval-path-defects"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
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
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-17T08:50:00.000Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-17T08:50:00.000Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "approval-path-defects.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> O-A chosen: four independent fixes at their causes, each behind a fixture observed red first.
> Both open decisions resolved here. Approach and Task Plan are human gates; neither is sealed.

## Step Contract
```yaml
step_goal: "Settle the two open decisions, choose the smallest approach, and order four independently revertable fixes each behind a red fixture."
input_summary:
  - "s04 acceptance AC-001 to AC-006 and the six invariants"
  - "ODC-001 policy posture, ODC-002 stricter sealing"
output_summary:
  - "Option analysis, resolutions, ordered task plan"
done_when:
  - "Each fix has a fixture that must be observed red"
  - "No fix touches a gate control"
owner: "developer"
```

## Option Analysis
```yaml
problem: "Remove four sources of accidental friction from the approval path without weakening any of the six controls that make a gate mean something."
options:
  - "O-A fix at the source, four independent changes: persist the bootstrap report where it is already built; document the missing order step and refuse to seal an unfinalized note; make both generators inherit work-item state from siblings. Each fix is small, in a different function, and independently revertable. Cost: touches four places and needs four fixtures."
  - "O-B documentation only: write the correct order and the workarounds into wfc help and the policy, change no code. Cheapest and zero regression risk. Cost: leaves the manual authoring path a dead end, leaves generated notes invalid on arrival, and converts four defects into four things every operator must memorise. Rejected."
  - "O-C wrap the CLI in a higher-level command that performs the whole correct sequence: one open-work-item and one close-work-item command. Hides all four defects behind a working facade. Cost: adds a new surface over a broken one, leaves the documented commands still broken for anyone not using the wrapper, and is a larger change than fixing the causes. Rejected."
recommended_option: "O-A"
trade_offs:
  - "O-A costs four small changes and four fixtures; O-B costs nothing now and taxes every future operator forever. The measured baseline - 4 failed commands and 6 hand-edited notes across two work items - is what that tax looks like."
  - "O-C would make the happy path work fastest, but a facade over a defect is how the docs and the tool drifted apart in the first place. Fixing causes keeps one truth."
  - "O-A's four fixes being independently revertable is the property that makes it safe to ship together; the enforcement work item does not have that property and is all-or-nothing."
rejected_reason_for_smaller: "O-B is genuinely smaller and was considered seriously. It fails AC-001, AC-003 and AC-004, all of which require a command to succeed rather than a document to explain why it does not."
resolutions:
  - decision: "ODC-001 policy posture for persisting the bootstrap report"
    answer: "Persist unconditionally, but keep the report marked request_source=legacy-scaffold with approval_status PENDING_REVIEW. The strict legacyScaffoldPolicy=forbid posture is about not treating a legacy scaffold as approved evidence, not about refusing to record that it exists. Persisting a PENDING_REVIEW report grants nothing."
    residual: "If the human reads the policy as forbidding persistence too, the fallback is to refuse with a message naming the policy - EDGE-004 rules out only the silent 'Missing work item report'."
  - decision: "ODC-002 fix TD-02 in tool, docs, or both"
    answer: "Both. Document the missing step, and refuse to seal a note whose status is draft or whose spec_status is not approved or frozen. The refusal message states the correct order, so the failure teaches the fix instead of requiring the operator to have read the docs."
    residual: "This is stricter than today for anyone who seals early and edits after. EDGE-003 keeps that behaviour correct - the receipt still goes stale - it just stops the documented order from making it inevitable."
validation_before_or_during:
  - "Reproduce all four symptoms in fixtures before writing any fix; a fixture that cannot be made red is a symptom that was misdiagnosed"
  - "Confirm the 15 receipt digests before and after every task"
```

## Technical Approach
```yaml
approach: "Four independent fixes at their causes, each behind a fixture observed red first, in a worktree, ordered so the riskiest refusal lands last."
affected_boundary:
  modified:
    - "packages/workflow-bundle/scripts/work-item-protocol.js - persist the bootstrap report"
    - "packages/workflow-bundle/scripts/workflow-step-definitions.js - inherit from siblings"
    - "packages/workflow-bundle/scripts/workflow-execution-definitions.js - inherit into lazily created notes"
    - "packages/workflow-bundle/scripts/workflow-gate-review.js - refuse to seal an unfinalized note"
    - "packages/workflow-bundle/bin/wfc.js - document the missing order step"
  created:
    - "packages/workflow-bundle/test/** and tests/fixtures/** - one fixture per defect"
  explicitly_untouched:
    - "workflow-trusted-approval-utils.js - the TTY and passphrase controls, and the file already carries an uncommitted modification from before this session"
    - "Receipt format, signing, digest binding, gate host mapping"
    - "Anything the enforcement work item touches: validate-workflow-execution.js, validate-workflow-governance.js, workflow-gate-evidence-utils.js"
boundary_note: "The untouched list is deliberately disjoint from artifact-governance-enforcement's boundary. The two work items can proceed in parallel worktrees without overlapping a single file."
validation_plan:
  - "AC-001, AC-003, AC-004: run the real command on a fresh work item and assert success with no hand edit"
  - "AC-002: assert the refusal fires and its message names status and spec_status"
  - "AC-005: four fixtures, each recorded red then green"
  - "AC-006: 15 receipt digests, 26 unit files, 10 fixtures, 20 work items"
rollback: "Per fix. Four separate commits, each revertable alone."
```

## Brownfield Impact Analysis
```yaml
existing_behaviour_changed:
  - "wfc scaffold and scaffold-step now write .work-item-report.json where they previously wrote none. Additive; the report grants nothing."
  - "wfc gate approve now refuses an unfinalized note where it previously sealed one. Stricter, and the reason it is correct is that the seal was worthless the moment the note changed."
  - "Generated notes now inherit sibling state where they previously used fixed defaults. Only changes output that was already invalid."
compatibility_risks:
  - risk: "An adopter script depends on scaffold producing exactly N files."
    handling: "Additive file. Called out in the eventual release note; no version bump in this work item."
  - risk: "An adopter workflow seals early and edits after."
    handling: "They will now be refused with a message naming the correct order. This is the intended behaviour change and is ODC-002."
  - risk: "Parallel work with two other in-flight work items."
    handling: "Worktree, plus a boundary deliberately disjoint from the enforcement work item's file list."
regression_surface:
  - "26 unit test files"
  - "10 governance fixtures"
  - "20 work items under wfc validate"
  - "15 trusted receipts"
migration_notes:
  - "None. No note is edited, no data converted."
rollback_notes:
  - "Four independent commits. Any one fix can be reverted without the others."
```

## Artifact Chính
```yaml
implementation_goal: "Four fixes, four fixtures, zero gate controls touched, in a worktree disjoint from the other two in-flight work items."
tasks:
  - id: T0
    owner_role: developer
    name: "Worktree and baseline"
    objective: "Isolate, and record the numbers every later task compares against."
    paths_in_scope: [".claude/worktrees/approval-path-defects"]
    outputs_expected:
      - "Worktree at local main HEAD, gitignored, branch codex/approval-path-defects"
      - "Baseline: 26 unit files, 10 fixtures, 20 work items, 15 receipt digests"
    review_checkpoint: "Confirm the worktree is ignored and the baseline includes receipt digests."
    verification_hint: "git worktree list; git check-ignore; run both suites and the four validators; loop wfc gate status over 15 receipts."
    dependencies: []
  - id: T1
    owner_role: developer
    name: "Four red fixtures, before any fix"
    objective: "Reproduce all four symptoms with their recorded error text."
    paths_in_scope:
      - "packages/workflow-bundle/test/**"
      - "packages/workflow-bundle/tests/fixtures/**"
    outputs_expected:
      - "TD-01: approve on a scaffold-created work item fails with 'Missing work item report'"
      - "TD-02: seal on a draft note succeeds today, then activate reports stale - the fixture asserts today's wrong behaviour so the fix flips it"
      - "TD-03: activate-created note fails wfc sdd on spec_refs.card"
      - "TD-04: scaffold-step on a quick work item produces 'Inconsistent planning_track'"
    review_checkpoint: "SPEC_COMPLIANCE: each fixture asserts the recorded symptom, not a proxy. A symptom that cannot be reproduced was misdiagnosed and its requirement is withdrawn."
    verification_hint: "All four must be observed red. AC-005."
    dependencies: ["T0"]
    sequencing_reason: "First and non-negotiable. The four error strings in s01 are the specification; a fixture that cannot go red means the diagnosis was wrong."
  - id: T2
    owner_role: developer
    name: "TD-01 persist the bootstrap report"
    objective: "Make a scaffold-created work item approvable."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
    outputs_expected:
      - "Report persisted with request_source legacy-scaffold, approval_status PENDING_REVIEW, reviewed_by empty"
      - "Fixture TD-01 green"
    review_checkpoint: "SPEC_COMPLIANCE: persistence grants no approval - assert approval_status and reviewed_by explicitly. CODE_QUALITY: reuses buildBootstrapReport rather than duplicating it."
    verification_hint: "AC-001. Then the full suite: no unit or fixture regression."
    dependencies: ["T1"]
  - id: T3
    owner_role: developer
    name: "TD-03 and TD-04 inherit work-item state"
    objective: "Generated notes arrive consistent with the work item they belong to."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-step-definitions.js"
      - "packages/workflow-bundle/scripts/workflow-execution-definitions.js"
    outputs_expected:
      - "planning_track, sdd_mode, work_item_type, spec_refs and spec_status inherited from sibling notes when any exist"
      - "Documented defaults retained when no sibling exists - EDGE-001"
      - "Refusal rather than a guess when siblings disagree - EDGE-002"
      - "Fixtures TD-03 and TD-04 green"
    review_checkpoint: "SPEC_COMPLIANCE: EDGE-001 and EDGE-002 both covered. CODE_QUALITY: one inheritance helper shared by both generators, not two copies - the repository's own ownership rule applies to code as well."
    verification_hint: "AC-003, AC-004. Scaffold a note into each of a light and a full work item and assert wfc validate passes untouched."
    dependencies: ["T1"]
  - id: T4
    owner_role: developer
    name: "TD-02 document the order and refuse an unfinalized seal"
    objective: "Stop the documented order from guaranteeing a stale receipt."
    paths_in_scope:
      - "packages/workflow-bundle/bin/wfc.js"
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
    outputs_expected:
      - "The flow text gains the missing step between seal and activate"
      - "Sealing refuses when status is draft or spec_status is not approved or frozen, with a message stating the correct order"
      - "Fixture TD-02 flipped green"
    review_checkpoint: "SPEC_COMPLIANCE: no gate control weakened - walk the six invariants from s04. CODE_QUALITY: the refusal message is actionable on its own, without the docs."
    verification_hint: "AC-002. Confirm the TTY refusal and the passphrase requirement still fire unchanged."
    dependencies: ["T1"]
    sequencing_reason: "Last of the four fixes. It is the only one that makes the tool stricter, so it lands after the three that only remove friction."
  - id: T5
    owner_role: developer
    name: "Full regression and receipt integrity"
    objective: "Prove nothing existing broke."
    paths_in_scope:
      - "work-items/approval-path-defects/approval-path-defects.s08.verification.md"
    outputs_expected:
      - "Four validators, unit, fixtures, pack-audit, compared against T0"
      - "20 work items pass; 15 receipt digests unchanged"
      - "A fresh work item opened and closed end to end with zero failed commands and zero hand edits - the acceptance measure that matters most"
    review_checkpoint: "SPEC_COMPLIANCE: AC-006 satisfied and the end-to-end count is 0, against a baseline of 4."
    verification_hint: "Compare against T0 numbers, not expectation."
    dependencies: ["T2", "T3", "T4"]
execution_order: "T0 -> T1 -> {T2, T3, T4} -> T5. T2, T3 and T4 are independent of each other and touch disjoint files; each may be committed alone."
dependencies:
  - "T1 gates every fix: no fix ships without its fixture observed red first"
  - "T5 after all three fixes, compared against T0"
handoff_points:
  - "After T1: if any symptom cannot be reproduced, its requirement is withdrawn and the card is revised rather than the fixture weakened"
  - "After T5: handoff to s08 for the DoD decision"
delegation: "None. Five tasks, one small package, T1 gates everything."
```

## Verification Plan
- Per task: the `verification_hint` above is the verify path.
- Before leaving `s07`: four validators, unit, fixtures, pack-audit, 20 work items, 15 receipt digests.
- The measure that matters: open and close a fresh work item end to end. Baseline **4 failed commands and 6 hand-edited notes**; target **0 and 0**.
- Risk note: `T4` is the only fix that makes the tool stricter. Its refusal message must be actionable without the docs, or it becomes the fifth defect.
- Rollout note: none. No release, no version bump.

## Governance Checks
```yaml
checklist_applied: "project-context/checklists/default.md"
checks:
  - id: "GOV-07"
    check: "Disciplined brainstorming"
    result: PASS
    evidence: "Three options; O-B is genuinely smaller and was rejected against named acceptance criteria rather than dismissed."
  - id: "GOV-08"
    check: "Execution-oriented planning, no placeholders"
    result: PASS
    evidence: "T0 to T5 each name paths, outputs, a review checkpoint and a verify method."
  - id: "GOV-09"
    check: "TDD for behaviour change"
    result: PASS
    evidence: "T1 is a separate task that gates all three fixes, and its deliverable is four red fixtures."
  - id: "GOV-10"
    check: "Worktree"
    result: PASS
    evidence: "T0. Boundary deliberately disjoint from the enforcement work item's file list."
  - id: "GOV-11"
    check: "Gate controls untouched"
    result: PASS
    evidence: "explicitly_untouched names the receipt format, signing, digest binding, gate host mapping and workflow-trusted-approval-utils.js."
  - id: "GOV-12"
    check: "Approach and Task Plan are human gates"
    result: PENDING
    evidence: "Both receipts empty."
blocking_items:
  - "Approach receipt not granted"
  - "Task Plan receipt not granted"
owner: "developer"
next_action: "Human Approach and Task Plan review."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "After each of T2, T3, T4: full unit and fixture suite, because each is independently shippable"
  - "T5: everything against the T0 baseline"
compatibility_checkpoints:
  - "After T3: a work item with no sibling note still gets the documented defaults - EDGE-001"
  - "After T4: TTY refusal and passphrase requirement still fire"
  - "T5: 15 receipt digests unchanged"
migration_or_backfill_steps:
  - "None."
rollback_or_restore_steps:
  - "Four independent commits; revert any one alone."
```

## SDD Traceability
```yaml
card: "product-specs/cards/approval-path-defects.md"
requirement_to_task:
  - "REQ-001 -> T2"
  - "REQ-002 -> T4"
  - "REQ-003 -> T3"
  - "REQ-004 -> T3"
  - "REQ-005 -> T1"
  - "REQ-006 -> T5"
coverage: "6 of 6 requirements map to a task; 6 of 6 tasks carry a requirement or a baseline obligation"
```

## Traceability
```yaml
upstream:
  - "approval-path-defects.s04.acceptance-criteria.md#Artifact Chính"
  - "product-specs/cards/approval-path-defects.md"
next_step: "s07 Implement, blocked pending the Approach and Task Plan receipts"
sdd_light_note: "Light hosts Option Analysis, Approach and Task Plan here. Approach and Task Plan each still need their own independent receipt."
```

## Handoff
- Chosen `O-A`: four fixes at their causes, each independently revertable. `O-B` documentation-only was seriously considered and fails three acceptance criteria; `O-C` a wrapper would put a facade over the defect that made docs and tool drift apart.
- Both open decisions resolved: `ODC-001` persist unconditionally but `PENDING_REVIEW`, since recording that a scaffold exists grants nothing; `ODC-002` both docs and a refusal, with the message stating the correct order so the failure teaches the fix.
- `T1` gates everything. Four fixtures must be observed **red**, and a symptom that cannot be reproduced gets its requirement withdrawn rather than its fixture weakened.
- Boundary is deliberately **disjoint** from `artifact-governance-enforcement`, so both can run in parallel worktrees without sharing a file.
- Blocked: `s07`. Approach and Task Plan receipts are both empty.
