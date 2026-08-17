---
artifact_id: "stabilize-architecture-skill-bundle.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "stabilize-architecture-skill-bundle"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: CHANGE
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
change_id: "CHANGE-002"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
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
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "ba"
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
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "stabilize-architecture-skill-bundle.s01.restate.md"
  - "stabilize-architecture-skill-bundle.s02.business-goal.md"
linked_artifacts:
  - "changes/CHANGE-002/proposal.md"
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Inputs are ready for drafting `s04`. Audit correction will use new CHANGE-002 evidence,
> renderer internals remain an `s05` decision, and downstream human approvals remain pending.

## Step Contract
```yaml
step: "s03 Open Questions"
goal: "Every ambiguity is either resolved for the s04 draft, assigned to a named owner, or deliberately deferred to the correct later step without weakening acceptance."
value: "The acceptance and readiness draft can be reviewed without forcing technical design choices or hiding governance conflicts."
scope_in:
  - "Historical evidence correction policy"
  - "Required gate roles and review timing"
  - "architecture-modeling versus drawio ownership conflict"
  - "Release, rollback, first-open visual verification, and protocol-state questions"
scope_out:
  - "Selecting the renderer/helper implementation"
  - "Passing Spec, Contract, DoR, Approach, or Task Plan"
  - "Editing production or bundle source"
inputs_required:
  - "Approved work-item and CHANGE-002 trusted receipts"
  - "s01 normalized findings and SA/TA drivers"
  - "s02 business goal and success outcomes"
  - "Frozen architecture-role-skills and arch-role-skills-release specs"
outputs_required:
  - "Owned open-question register"
  - "Input-readiness report for s04"
  - "Step audit and governance disposition"
done_when:
  - "No unresolved question blocks authoring measurable acceptance criteria"
  - "Every deferred decision names the later step and owner"
  - "Conflicts between current artifacts and frozen contracts are explicit"
  - "Human-controlled downstream gates remain visibly pending"
constraints:
  hard_constraints:
    - "Do not infer a human gate approval"
    - "Do not choose a technical approach before s04 approval"
    - "Do not fabricate or backdate historical evidence"
  soft_constraints:
    - "Prefer the audit treatment that leaves an explicit correction trail"
  prohibited_actions:
    - "Editing frozen artifacts without CHANGE-002 traceability"
    - "Copying the local architecture-modeling candidate unchanged into the bundle"
  compliance_checks:
    - "All open items have an owner and disposition"
    - "The s04 input-readiness verdict is evidence-backed"
risks:
  - id: "S03-R01"
    description: "A deferred renderer decision could be mistaken for permission to weaken the drawio outcome."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Lock drawio output and geometry thresholds in s04 while deferring only the internal implementation boundary to s05."
    contingency: "Block Approach if no option satisfies the locked contract."
    owner: "developer"
    status: MONITORING
  - id: "S03-R02"
    description: "Correcting approved notes without new receipts could erase the audit distinction between original and corrective evidence."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Trace corrections to CHANGE-002, invalidate stale digests, and require re-review."
    contingency: "Preserve an explicit errata record and block Release."
    owner: "ba"
    status: MONITORING
timebox:
  target_duration: "30 minutes"
  deadline: ""
  escalation_rule: "Return to s01 if a question changes the approved work-item or release boundary."
```

## Main Artifact
```yaml
open_questions:
  - id: "OQ-001"
    question: "How should misleading or placeholder-bearing v2.3.2 approval artifacts be corrected?"
    disposition: "RESOLVED_FOR_SPEC_REVIEW"
    resolution: "Correct factual content under CHANGE-002, explicitly mark prior evidence as superseded or stale, and obtain new human receipts; never preserve misleading approval as current and never backdate the correction."
    owner: "ba/qc"
    blocks_s04_authoring: false
    blocks_s07: true
  - id: "OQ-002"
    question: "Who has authority to sign the remaining gates?"
    disposition: "ROLE_AUTHORITY_LOCKED"
    resolution: "Spec: ba; Contract: ba or developer; DoR: ba or qc; Approach: developer; Task Plan: developer; Release: devops or qc; Business Acceptance: po; DoD: qc. The actual human reviewer and timestamp must be recorded before each receipt is sealed."
    owner: "po"
    blocks_s04_authoring: false
    blocks_s07: true
  - id: "OQ-003"
    question: "Should drawio generation live directly in architecture-modeling or in a bundled deterministic helper?"
    disposition: "DEFERRED_TO_S05"
    resolution: "s04 locks the observable drawio and quality contract; s05 compares implementation options and chooses the smallest sufficient boundary."
    owner: "developer"
    blocks_s04_authoring: false
    blocks_s07: true
  - id: "OQ-004"
    question: "Who verifies the first-open visual behavior that the existing geometry spike did not prove?"
    disposition: "RESOLVED"
    resolution: "QC owns first-open visual confirmation in s08; static XML and geometry checks remain automated."
    owner: "qc"
    blocks_s04_authoring: false
    blocks_s07: false
  - id: "OQ-005"
    question: "How should the protocol report behave after trusted work-item and change approvals exist?"
    disposition: "RESOLVED_FOR_SPEC_REVIEW"
    resolution: "Status output and synchronized protocol blocks must not continue to claim those approvals are pending; stale derived blockers are a validator/protocol consistency defect."
    owner: "developer/qc"
    blocks_s04_authoring: false
    blocks_s07: true
missing_inputs: []
conflicts:
  - id: "CF-001"
    sources:
      - ".claude/skills/architecture-modeling/SKILL.md"
      - "product-specs/cards/architecture-role-skills.md REQ-020/023/024"
    conflict: "The candidate hands diagram-tool output to a presentation lane, while the frozen contract requires drawio and the clean bundle has no guaranteed house presentation skill."
    disposition: "Lock conditional ownership in s04; select implementation in s05."
  - id: "CF-002"
    sources:
      - "trusted work-item/change receipts"
      - "stabilize-architecture-skill-bundle.work-item-report.json required_actions/blockers"
    conflict: "Receipts are APPROVED but generated blocker text still says both approvals are pending."
    disposition: "Add a protocol-state consistency criterion and a negative regression fixture."
  - id: "CF-003"
    sources:
      - "approved/frozen v2.3.2 workflow notes"
      - "planned stronger evidence validator"
    conflict: "Correct validation should reject the current placeholder evidence, so the affected notes cannot remain both unchanged and valid."
    disposition: "Correct with CHANGE-002 traceability and require new review evidence."
assumptions:
  - "The source skill count is 40 before this change and must become 41 after architecture-modeling is canonicalized."
  - "The user's untracked .claude architecture-modeling directory is reference input and remains untouched."
  - "No external registry publication or live global install is needed to verify the candidate."
  - "The same human may act under multiple roles only when they explicitly declare the role for that gate."
```

## Input Readiness
```yaml
step: "s04 Acceptance + DoR"
status: READY
available_inputs:
  - "Approved work-item receipt dated 2026-08-14T14:04:13.699Z"
  - "Approved CHANGE-002 receipt dated 2026-08-14T14:03:53.754Z"
  - "Nine draft acceptance criteria from s01"
  - "Three business objectives, five SA drivers, and six TA drivers"
  - "Frozen architecture-role-skills v0.6 and arch-role-skills-release v0.1 baselines"
  - "Read-only architecture-modeling candidate and drawio landscape quality bar"
missing_inputs: []
invalid_inputs:
  - "The protocol report's pending-approval blocker strings are stale and must not be used as the receipt truth source."
conflicts:
  - "Candidate render ownership conflicts with the frozen drawio contract; the output contract can be specified before s05 selects an implementation."
assumptions:
  - "Trusted receipts, not stale derived blocker prose, are authoritative for work-item/change approval."
  - "Historical note correction requires new receipts after the corrected artifact hash is final."
risk_level: HIGH
next_action: "Draft s04 with measurable criteria and a BLOCKED DoR verdict pending explicit Spec, Contract, and DoR approvals."
```

## Audit
```yaml
step: "s03 Open Questions"
status: PASS
checks:
  - criterion: "No unresolved question blocks authoring measurable acceptance criteria"
    result: PASS
    evidence: "OQ-001 through OQ-005 each have a disposition, owner, and block scope."
  - criterion: "Every deferred decision names the later step and owner"
    result: PASS
    evidence: "OQ-003 is assigned to developer at s05; OQ-004 is assigned to qc at s08."
  - criterion: "Conflicts between current artifacts and frozen contracts are explicit"
    result: PASS
    evidence: "CF-001 through CF-003 name both sources and the required disposition."
  - criterion: "Human-controlled downstream gates remain visibly pending"
    result: PASS
    evidence: "OQ-002 states that Spec, Contract, DoR, Approach, Task Plan, Release, Business Acceptance, and DoD require explicit role-bound review."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed within the declared authoring session."
gaps: []
risk_level: HIGH
next_action: "Proceed to the s04 draft; stop before s05 until Spec, Contract, and DoR receipts are sealed."
```

## Governance Context
```yaml
governance_profile: strict
status: ALIGNED
decisions:
  - "Use CHANGE-002 plus new receipts for corrected evidence."
  - "Treat renderer internals as s05 scope while retaining drawio as an s04 contract."
  - "Treat trusted receipts as authoritative over stale generated blocker prose."
exceptions_required: []
blocking_items: []
```

## Traceability
```yaml
upstream:
  - "stabilize-architecture-skill-bundle.s01.restate.md"
  - "stabilize-architecture-skill-bundle.s02.business-goal.md"
  - "changes/CHANGE-002/proposal.md"
downstream_links:
  - "OQ-001 and CF-003 -> AC-004 and AC-010 historical evidence/protocol acceptance"
  - "OQ-003 and CF-001 -> AC-007 architecture-modeling drawio contract"
  - "OQ-004 -> s08 manual first-open visual verification"
  - "OQ-005 and CF-002 -> protocol-state consistency acceptance"
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Readiness status: READY for s04 authoring, not READY for implementation.
- Needed to move past step 4: human review and trusted receipts for Spec, Contract, and DoR.
