---
artifact_id: "worktree-and-closure-integrity.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "worktree-and-closure-integrity"
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
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-19T06:57:49.000Z"
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-08-19T06:57:49.000Z"
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
  - "worktree-and-closure-integrity.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Acceptance lives in the Spec Card and is referenced, not restated. Two decisions the
> owner accepted are recorded here: all four defects stay in one work item, and the
> tightened `DoD` applies prospectively only.

## Existing System Baseline
```yaml
baseline_date: "2026-08-19"
current_behavior_refs: "See s01 defects D-A to D-D. Each carries its own observed error string or measured repository state; not restated here."
measured_state:
  work_items: 6 protocol-managed, 16 legacy
  trusted_receipts: "22 report digest_match=true"
  main_head: "58fd709, which already contains the four approval-path fixes"
  worktrees_open: 2
  uncommitted_delivery: "artifact-governance-enforcement holds 51 uncommitted files while reporting DONE. This is D-D's evidence and is deliberately left as-is; fixing it is the owner's call, not this work item's."
impacted_surfaces:
  - "packages/workflow-bundle/scripts/validate-work-item-protocol.js - D-A"
  - "packages/workflow-bundle/scripts/work-item-protocol-utils.js - D-A, if the write side changes"
  - "scripts/hooks/tdd-enforce.sh - D-B"
  - "packages/workflow-bundle/bin/wfc.js - D-C flow text"
  - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js - D-D"
  - "packages/workflow-bundle/scripts/workflow-gate-review.js - D-D, dod seal path"
  - "packages/workflow-bundle/test/** and tests/fixtures/**"
compatibility_constraints:
  - "No stored .work-item-report.json may be rewritten. Six work items' reports exist and four are referenced by sealed receipts, so D-A must be fixed at comparison time or by writing relative only for NEW reports while tolerating absolute in old ones."
  - "The 22 existing receipts must still report digest_match=true afterwards."
  - "The four work items already closed under the looser DoD are NOT reopened. The tightened check applies prospectively."
  - "Existing exemptions in tdd-enforce - scripts/hooks/, tests, docs, config - and the scripts/ and mcp/src/ mappings stay exactly as they are."
rollback_constraints:
  - "Four independent fixes in four different functions; any one is revertable alone. D-D is the only one whose revert restores a weaker gate, so it should be the last committed."
```

## Artifact Chính
```yaml
acceptance_ref: "product-specs/cards/worktree-and-closure-integrity.md#Acceptance Criteria"
acceptance_ids:
  - "AC-001 wfc protocol passes from a worktree, still rejects a genuinely wrong workflow_root"
  - "AC-002 bin/ mapping: allow when the test exists, block when it does not, exemptions unchanged"
  - "AC-003 the verify transition's finalization requirement is documented and precedes the verify step"
  - "AC-004 dod seal and DONE transition refuse a dirty declared path, with a reason-bearing hatch visible in output"
  - "AC-005 four fixtures, each observed failing first"

decisions_accepted_by_owner:
  - id: "A2"
    question: "Four defects in one work item, or split D-D because it changes what DONE means?"
    decision: "One work item. Same package, same suite, all four small, and all four already cost time this session."
    accepted_at: "2026-08-19, in session"
  - id: "GOV-Q1"
    question: "Does the tightened DoD apply to the four work items that already closed under the looser rule?"
    decision: "Prospectively only. No closed work item is reopened."
    reason: "Reopening would invalidate sealed receipts to enforce a rule that did not exist when they were sealed. The looser closures are recorded truthfully in their own notes - approval-path-defects s08 RR-4 states plainly that main still held the defects - so the history is honest even though the gate was weak."
    consequence_for_acceptance: "AC-004 is tested on new fixtures only. No acceptance criterion asserts anything about the six existing work items beyond their receipts staying valid."
    accepted_at: "2026-08-19, in session"

edge_cases:
  - id: "EDGE-001"
    case: "A work item whose only output is a decision, or documentation with nothing to commit."
    expected: "AC-004's hatch applies: a stated reason, visible in output. Without the hatch this check gets disabled wholesale, which is the failure mode already recorded once in this repository."
  - id: "EDGE-002"
    case: "A work item deliberately parked on a branch, committed but not merged."
    expected: "Passes. ODC-002 resolves to committed, not merged - merging is a release concern and blocking it would punish legitimate branch work."
  - id: "EDGE-003"
    case: "An old report holds an absolute workflow_root that is genuinely wrong, not merely absolute."
    expected: "Still rejected. AC-001 requires the check to keep its teeth; tolerating absolute paths must not become tolerating any path."
  - id: "EDGE-004"
    case: "A file under bin/ has no test and genuinely should not have one."
    expected: "Blocked, then exempted by the same route any other file uses. D-B fixes the mapping, not the policy."
  - id: "EDGE-005"
    case: "The declared change paths are dirty because of files another work item owns."
    expected: "ODC-001. Scoping to granted_write_paths makes this precise, because that is already the authoritative list for the capability guard. A file outside the declared paths is not this work item's dirt."

out_of_scope_ref: "product-specs/cards/worktree-and-closure-integrity.md#Business Goal"

done_when:
  - "AC-001 to AC-005 each have evidence in s08"
  - "22 of 22 existing receipts still digest_match=true"
  - "wfc protocol passes from inside a worktree"

behavioral_invariants:
  - "TTY refusal for non-interactive approval: unchanged"
  - "Passphrase requirement: unchanged"
  - "One independent receipt per gate: unchanged"
  - "Receipt bound to artifact sha256: unchanged"
  - "gate_reviews and role_signoffs filled by a human before sealing: unchanged"
  - "No stored report rewritten"
```

## Governance Checks
```yaml
checklist_applied: "project-context/checklists/default.md"
checks:
  - id: "GOV-01"
    check: "Spec/design before code"
    result: PASS
    evidence: "No file under packages/ or scripts/ touched. s06 is authored but carries no implementation."
  - id: "GOV-02"
    check: "TDD for behaviour change"
    result: REQUIRED
    evidence: "All four are behaviour changes. AC-005 makes a failing-first fixture mandatory per defect."
  - id: "GOV-03"
    check: "Worktree for large or risky change"
    result: REQUIRED
    evidence: "Four boundaries plus a hook outside the package. Note the irony recorded in s01 dependencies: the worktree this work item needs is itself affected by D-A, so its baseline must record that wfc protocol is expected to fail there until D-A lands."
  - id: "GOV-04"
    check: "Gate controls not weakened"
    result: PASS
    evidence: "Six invariants above. D-D adds a check and removes none."
  - id: "GOV-05"
    check: "No retroactive invalidation"
    result: PASS
    evidence: "GOV-Q1 resolved prospective-only. No closed work item is reopened and no stored report is rewritten."
  - id: "GOV-06"
    check: "Option analysis before approach"
    result: PENDING
    evidence: "Hosted at s06 under the Light gate contract."
  - id: "GOV-07"
    check: "No self-declared gate passage"
    result: PASS
    evidence: "spec_status draft; all gate_reviews empty; the work item itself is still PENDING_REVIEW."
blocking_items:
  - "Work item approval not granted"
  - "s07 must not start until the tdd-enforce guard is verified live - S01-R04"
owner: "ba"
next_action: "Human work-item approval, then Spec and DoR review."
```

## Definition of Ready
```yaml
status: READY
blockers: []
rationale: "Five criteria, each resolving against a command result or a fixture. Both open decisions were accepted by the owner and are recorded above with their reasons. The two remaining ODCs shape the approach, not the criteria."
checks:
  - item: "Defects understood"
    result: PASS
    evidence: "Four, each with an observed error string or a measured repository state on a named date. None inferred - which matters, because the one finding this session that was inferred from reading code was wrong and had to be withdrawn."
  - item: "Acceptance testable"
    result: PASS
    evidence: "AC-001 to AC-004 are single commands or fixtures producing pass or fail; AC-005 is a failing-first count."
  - item: "Compatibility floor stated"
    result: PASS
    evidence: "No report rewritten, 22 receipts intact, four closed work items untouched."
  - item: "Scope boundary explicit"
    result: PASS
    evidence: "Card out_scope plus the prospective-only decision."
  - item: "Open decisions do not block"
    result: PASS
    evidence: "ODC-001 and ODC-002 are approach choices with the EDGE cases stating what must hold either way."
owners:
  spec: "ba"
  dor: "po, ba"
notes:
  - "A1 and A3 from s01 remain rejectable at this gate. A2 and GOV-Q1 were accepted and are recorded, not left open."
```

## Spec Freeze
```yaml
status: draft
authority: "ba"
decided_at: ""
frozen_by_person: ""
freeze_requested_at: "2026-08-19"
spec_version_requested: "0.1"
requirement_ids:
  - "REQ-001 to REQ-005"
accepted_assumptions:
  - "A2 - four defects, one work item"
  - "GOV-Q1 - tightened DoD applies prospectively only"
blockers: []
```

## SDD Traceability
```yaml
requirement_refs: []
acceptance_refs: []
task_refs: []
test_refs: []
```
