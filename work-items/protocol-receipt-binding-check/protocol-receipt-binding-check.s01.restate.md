---
artifact_id: "protocol-receipt-binding-check.s01.restate"
artifact_family: workflow-step
work_item_slug: "protocol-receipt-binding-check"
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
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
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
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "work-items/trusted-receipt-namespace-resolution/trusted-receipt-namespace-resolution.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> A gate is reported as approved from a signature-valid receipt without checking that the receipt is bound to the gate-host note being examined. The binding data is present in the receipt and the comparison already exists elsewhere in the codebase; it is simply not on this path.

## Step Contract
```yaml
step_goal: "Restate the receipt-binding defect with reproduction evidence, lock the classification, and record what must not break - without choosing a fix."
input_summary:
  - "Measured evidence from the 2026-09-16 audit of PR #5 (docs/publish-planning-work)"
  - "Four trusted receipts for code-factory-holistic-audit-remediation sealed 2026-09-11 and 2026-09-12"
  - "Approved decision in trusted-receipt-namespace-resolution: one repository, one receipt namespace"
output_summary:
  - "Restated defect with a reproduction that does not depend on this session"
  - "Classification: BUG, brownfield, full/strict"
  - "Invariants that any fix must preserve"
  - "Open questions that must be answered before an approach is chosen"
done_when:
  - "The defect is reproducible from this note alone"
  - "The non-negotiable invariants are written down"
  - "The spec and contract impact is classified, or recorded as an open question owned by a named role"
owner: "developer"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Prefer the smallest solution that is correct"
  - "TDD for behavior change"
  - "Do not self-declare done"
  - "AI proposes, human approves"
required_reviews:
  - "Spec at s04"
  - "Contract at s04 if the approved-gate verdict is judged a contract"
  - "DoR at s04"
  - "Approach at s05"
  - "Task Plan at s06"
prohibited_actions:
  - "Weakening any existing control: TTY, passphrase, per-gate receipt, signature verification, human-filled gate_reviews"
  - "Reverting the approved one-repository-one-namespace decision from trusted-receipt-namespace-resolution"
  - "Invalidating, relocating or rewriting receipts already on disk"
  - "Clearing blockers or required_actions to make a validator green"
open_governance_questions:
  - id: "GOV-Q1"
    question: "Is the approved-gate verdict a contract? Tightening it will make some currently green work items report errors, and the tightened rule is observable to every consumer of the published bundle. If yes, this needs the contract gate and a compatibility story rather than a plain defect fix."
    owner: "po"
  - id: "GOV-Q2"
    question: "Prospective-only or retrospective? trusted-receipt-namespace-resolution set a prospective-only precedent for an equivalent tightening. Reconfirm it here, or decide that existing receipts whose digests no longer match must be re-sealed."
    owner: "po"
```

## Artifact Chính
```yaml
raw_request: >-
  Found during the 2026-09-16 audit of PR #5: wfc protocol reported four errors saying the
  report claims gates are pending after a trusted receipt is APPROVED. The report was correct
  and the validator was wrong.
restated_request: >-
  getProtocolStateContradictionErrors decides that a gate is approved by calling
  hasApprovedReceipt, which checks only approval_status and signature validity. It never
  compares the receipt's artifact_ref and artifact_sha256 against the gate-host note present in
  the checkout being validated. Because the receipt namespace is deliberately shared across the
  whole repository, a gate approved against one version of a note is read as approved against
  any other version of that same note, and accurate required_actions are then reported as
  contradictions.
request_type: BUG
user_problem_initial: >-
  A human reading the validator is told that work already approved is being falsely claimed as
  pending. Acting on that message means deleting accurate required actions. The cheapest
  response to the error is the one that destroys correct state.
business_context_initial: >-
  This sits in the authority chain. The receipt is the artifact that proves a human approved a
  specific document; a receipt that is accepted without its binding proves only that some
  document was once signed. REQ-AG-009 enforcement depends on this verdict being right.
scope_draft:
  in:
    - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js - getProtocolStateContradictionErrors"
    - "packages/workflow-bundle/scripts/validate-work-item-protocol.js - approvedGates construction"
    - "Regression fixtures covering matched digest, mismatched digest and missing artifact"
  out:
    - "Receipt schema redesign, including the block-level binding discussed as R-07"
    - "The receipt namespace layout, which is an approved decision and not in question here"
    - "Re-sealing or migrating existing receipts"
    - "Any change to signing, passphrase or TTY controls"
constraints_initial:
  - "Receipts already on disk must stay readable and valid; schema v1 is unchanged"
  - "One repository addresses one receipt namespace, per the approved decision in trusted-receipt-namespace-resolution"
  - "The comparison to be used already exists as getTrustedReceiptArtifactErrors and needs no new crypto"
  - "Behavior change - TDD applies: a failing fixture must reproduce the false verdict before any fix"
assumptions_initial:
  - "artifact_ref plus artifact_sha256 in a schema v1 receipt is sufficient to decide whether a receipt binds to the note in this checkout"
  - "A receipt whose bound artifact is absent from the checkout should not count as an approval for that checkout"
open_questions_initial:
  - id: "OQ-01"
    question: "When a receipt is signature-valid but its digest does not match the local note, what is the correct verdict: not-approved, or a distinct third state such as approved-elsewhere? The second preserves the information that a human did approve something."
    owner: "developer"
  - id: "OQ-02"
    question: "How many currently green work items turn red once this check is added? Measure before choosing prospective-only or retrospective."
    owner: "qc"
  - id: "OQ-03"
    question: "Does the same unbound-receipt assumption appear on other paths that call hasApprovedReceipt, in particular work-item approval and change approval?"
    owner: "developer"
dependencies_initial:
  - "trusted-receipt-namespace-resolution (ARCHIVED) - its one-namespace decision is an input, not a target"
  - "CR-008 REQ-AG-009, whose enforcement produces the false message"
risks_initial:
  - "Tightening the check turns currently green work items red; without OQ-02 measured first, the size of that blast radius is unknown"
  - "A wrong third-state design could let approved-elsewhere be read as approved-here, reintroducing the same defect under a new name"
  - "Fixing only the protocol path leaves the same assumption live on the other callers named in OQ-03"
notes_for_step_2: >-
  The business goal step should state the value in terms of what the verdict is for: a human
  must be able to act on a validator message without destroying correct state. Speed of the
  validator is not the point.
```

## Evidence
```yaml
code_path:
  - ref: "packages/workflow-bundle/scripts/validate-work-item-protocol.js:401-419"
    note: "Builds approvedGates by loading each gate receipt and calling hasApprovedReceipt."
  - ref: "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js:546-553"
    note: "hasApprovedReceipt checks approval_status and signature only."
  - ref: "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js:827-836"
    note: "getTrustedReceiptArtifactErrors compares artifact_ref and artifact_sha256; it is not called on the protocol path."
  - ref: "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js:838-864"
    note: "getProtocolStateContradictionErrors raises the contradiction from approvedGates alone."
reproduction:
  work_item: "code-factory-holistic-audit-remediation"
  receipts_sealed:
    - "spec - ba - 2026-09-11T14:33:43.972Z"
    - "dor - qc - 2026-09-11T14:33:56.365Z"
    - "approach - developer - 2026-09-12T05:51:55.282Z"
    - "task_plan - developer - 2026-09-12T06:23:55.010Z"
  digest_comparison:
    - gate_host: "s04.acceptance-criteria.md"
      receipt: "41078181e9b0e8186c900b8d1908ca9f52820d6b763b37467681325edc389f29"
      branch_codex_holistic_audit: "41078181e9b0e8186c900b8d1908ca9f52820d6b763b37467681325edc389f29"
      branch_docs_publish_planning_work: "979785f8f9755580d1936373f761755fc2a96df9ffabeb29274456b2e9007e87"
    - gate_host: "s05.technical-approach.md"
      receipt: "10b4015018013eebc9a623c5651148f3b4e648c46717f83b1c401b1df2048f8b"
      branch_codex_holistic_audit: "10b4015018013eebc9a623c5651148f3b4e648c46717f83b1c401b1df2048f8b"
      branch_docs_publish_planning_work: "8e72e89280e1c2c795676ff48ab075217e2d22e11c0189feb9f30796eca4da08"
    - gate_host: "s06.task-breakdown.md"
      receipt: "5e27d9630ad5d502709069103f5deb22952604b30ab52115c5a03917ad9b4bb5"
      branch_codex_holistic_audit: "5e27d9630ad5d502709069103f5deb22952604b30ab52115c5a03917ad9b4bb5"
      branch_docs_publish_planning_work: "e165fd8aca4e673b145fa83317777d5a9ac975363d1883b55a4fbe07af68d665"
  observed: >-
    On docs/publish-planning-work, wfc protocol emits four errors claiming gates spec, dor,
    approach and task_plan are pending after an APPROVED receipt. None of those four gates was
    approved against the notes present on that branch.
  expected: >-
    A receipt whose artifact_sha256 does not match the gate-host note in this checkout does not
    make that gate approved here, and produces no contradiction error.
pattern_reference: >-
  This is the CF-022 shape in the authority chain: a mechanism issues a confident verdict while
  the input that disproves it - artifact_sha256, inside the receipt it has just loaded - is
  available and unread. Proposed portfolio id CF-023.
```

## Existing System Baseline
```yaml
current_behavior: >-
  validate-work-item-protocol builds the set of approved gates by loading one trusted receipt per
  gate and accepting it when approval_status is APPROVED and the signature verifies. That set is
  then used to decide whether the report's blockers and required_actions contradict reality.
what_already_works:
  - "Receipt signing, passphrase and TTY controls"
  - "Signature verification, which correctly rejects a forged or altered receipt"
  - "getTrustedReceiptArtifactErrors, which already performs the missing comparison on other paths"
  - "The one-repository-one-namespace address, approved in trusted-receipt-namespace-resolution"
what_must_not_regress:
  - "Every receipt currently on disk stays readable and valid under schema v1"
  - "No gate becomes easier to pass than it is today"
  - "Work items whose receipts do match their gate-host notes keep reporting exactly as they do now"
blast_radius: "packages/workflow-bundle validator paths only; no artifact, note or receipt is rewritten."
```

## Work Item Protocol
```yaml
protocol_status: PROPOSED
approval_status: PENDING_REVIEW
review_required: true
work_item_slug: "protocol-receipt-binding-check"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/protocol-receipt-binding-check"
current_step: ""
granted_write_paths: []
materialization_status: PROPOSED
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "agent"
protocol_owner: ""
reviewed_by: ""
reviewed_at: ""
handoff_target: "human-clarify"
dedup_result: needs_review
required_actions:
  - {"id":"se:b967516478eb716faf4acecf2c1bc793df1ee73a625fcf275c54d4811f275bde","kind":"workflow_followup","text":"Làm rõ scope để chốt single hay split."}
  - {"id":"se:198b45f070c91dc20c943b1592896ae0c5b21f18e09679c4306aa6d7a95e9876","kind":"workflow_followup","text":"Review existing work-items/changes trước khi scaffold."}
blockers:
  - {"id":"se:5d63f0e5eab3755098c7f439497813754ef25cc3621cdb58b82d86ce754f675f","kind":"delivery_blocker","text":"Có work item gần nghĩa cần review: trusted-receipt-namespace-resolution, artifact-governance-enforcement, artifact-governance-model"}
refs:
  - "work-items/trusted-receipt-namespace-resolution"
  - "work-items/artifact-governance-enforcement"
  - "work-items/artifact-governance-model"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
```

## Traceability
```yaml
source_inputs:
  - "2026-09-16 audit of PR #5 docs/publish-planning-work"
  - "work-items/trusted-receipt-namespace-resolution"
  - "changes/CR-008/spec-delta/srs.delta.md REQ-AG-009"
next_step: "s02 Business Goal"
```

## Handoff
- Settled: the defect is one missing comparison on one path; the receipt namespace layout is an approved decision and stays out of scope.
- Still open: OQ-01 verdict shape, OQ-02 blast radius, OQ-03 other callers, and GOV-Q1 whether this is a contract change.
- Condition to enter step 2: a human approves this work item; the three open questions do not block s02 but must be closed before s05.
- Proposed write scope for the approval to grant, narrower than a directory grant: `packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js`, `packages/workflow-bundle/scripts/validate-work-item-protocol.js`, `packages/workflow-bundle/test`, `.claude/worktrees/cf-023-receipt-binding`, `work-items/protocol-receipt-binding-check`.
