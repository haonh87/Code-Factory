---
artifact_id: "integrate-design-checklists-into-sa-ta.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "integrate-design-checklists-into-sa-ta"
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
change_id: "CHANGE-004"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-004/spec-delta/brd.delta.md"
  - "changes/CHANGE-004/spec-delta/srs.delta.md"
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
  - "workflow-governance-router"
  - "codex-workflow-chain"
  - "sa"
  - "ta"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "integrate-design-checklists-into-sa-ta.s01.restate.md"
  - "integrate-design-checklists-into-sa-ta.s02.business-goal.md"
linked_artifacts:
  - "changes/CHANGE-004/proposal.md"
  - "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Inputs are READY for drafting s04. Publication is limited to domain-neutral derived guidance, technical representation remains an s05 decision, and every downstream human gate remains pending.

## Step Contract
```yaml
step: "s03 Open Questions"
goal: "Every ambiguity is resolved, assigned to an owner and deadline, or safely deferred to the correct later step so measurable s04 criteria can be drafted without choosing a technical solution."
value: "Reviewers can assess the Spec, Contract, and DoR against known inputs instead of approving hidden assumptions about confidentiality, role ownership, compatibility, or release scope."
scope_in:
  - "Publication and confidentiality treatment of the internal source"
  - "Release/version timing and human gate authority"
  - "Checklist representation timing and existing-contract compatibility"
  - "Readiness of the 34-rule classification and SA/TA driver evidence for s04"
scope_out:
  - "Selecting the checklist schema, storage, generation, or synchronization design"
  - "Selecting a bundle version or publishing a release"
  - "Passing Spec, Contract, DoR, Approach, Task Plan, or later gates"
  - "Editing canonical skills, generated runtimes, tests, manifests, or release files"
inputs_required:
  - "Approved work-item and CHANGE-004 trusted receipts"
  - "s01 request boundary, 34-rule routing matrix, SA drivers, and TA drivers"
  - "s02 business goal, outcomes, non-goals, and metric candidates"
  - "Current SA/TA output, ownership, bilingual, runtime, and downstream-authority contracts"
outputs_required:
  - "An owned open-question register with explicit dispositions"
  - "An input-readiness report for s04 authoring"
  - "A step audit and governance disposition"
done_when:
  - "No unresolved question blocks authoring measurable acceptance criteria"
  - "Every deferred decision names its target step, owner, and latest resolution point"
  - "The internal draft is not treated as an approved universal architecture policy"
  - "Existing contract and role-boundary concerns are explicit"
  - "Human-controlled downstream gates remain visibly pending"
constraints:
  hard_constraints:
    - "Do not infer a gate approval from work-item/change approval or from this readiness assessment."
    - "Do not publish source-specific HCP content or treat the source draft as normative public policy."
    - "Do not choose a technical representation before s04 approval and s05 option analysis."
    - "Do not move solution selection or architecture modeling into SA/TA."
  soft_constraints:
    - "Allow non-blocking release and representation details to remain deferred when s04 can state observable outcomes without them."
  prohibited_actions:
    - "Editing skill or runtime files during discovery."
    - "Resolving a missing human decision by assumption."
  compliance_checks:
    - "Every open question has a disposition, owner, and blocking scope."
    - "Input Readiness follows the required READY/BLOCKED schema."
    - "The s04 handoff explicitly stops before s05 until Spec, Contract, and DoR receipts exist."
risks:
  - id: "S03-R01"
    description: "Deferring representation could be misread as permission to weaken the required observable contract."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Lock rule routing, evidence fields, negative role behavior, confidentiality, and parity outcomes in s04; defer only implementation shape."
    contingency: "Block Approach if no option satisfies the approved contract without role drift."
    owner: "developer"
    status: MONITORING
  - id: "S03-R02"
    description: "The approved change boundary could be misread as permission to republish confidential source prose."
    likelihood: LOW
    impact: HIGH
    severity: HIGH
    mitigation: "Record that only independently worded domain-neutral concepts may be public and require zero-leakage verification plus Spec/Contract/Release review."
    contingency: "Exclude the affected item and block Release."
    owner: "ba/qc"
    status: MONITORING
timebox:
  target_duration: "One focused s03 authoring and validation pass"
  deadline: ""
  escalation_rule: "Return to s01 if resolving a question changes the approved CHANGE-004 boundary; stop before s04 approval if a mandatory source or authority input becomes unavailable."
```

## Main Artifact
```yaml
open_questions:
  - id: "OQ-001"
    question: "May the internal draft be reused in a distributable skill bundle?"
    disposition: "RESOLVED_FOR_SPEC_REVIEW"
    resolution: "Use the document only as a private analysis corpus. Publish independently worded, domain-neutral concerns; retain source path and R-IDs only in private workflow evidence; exclude source-specific names, thresholds, decisions, and confidential prose. CHANGE-004 approval permits this bounded drafting, while Spec, Contract, Release, and Business Acceptance still require separate human approval."
    owner: "ba/qc"
    target_step: "s04 and s08"
    latest_resolution_point: "Release gate"
    blocks_s04_authoring: false
    blocks_s07: true
  - id: "OQ-002"
    question: "Which bundle version or release vehicle will carry the public skill-contract change?"
    disposition: "DEFERRED_WITH_GUARD"
    resolution: "s04 specifies version-independent observable outcomes. s05 recommends semantic release impact and s06 names the release touch paths; the approved target must be locked before Release evidence is finalized."
    owner: "developer/devops/po"
    target_step: "s05-s06"
    latest_resolution_point: "Task Plan approval"
    blocks_s04_authoring: false
    blocks_s07: true
  - id: "OQ-003"
    question: "Should checklist evidence use the existing blocks, an additive field, or a reusable reference-only contract?"
    disposition: "DEFERRED_TO_S05"
    resolution: "s04 locks required behavior and compatibility. s05 compares the smallest compatible representation options and rejects any option that changes block ownership or moves design authority upstream."
    owner: "developer"
    target_step: "s05"
    latest_resolution_point: "Approach approval"
    blocks_s04_authoring: false
    blocks_s07: true
  - id: "OQ-004"
    question: "How should source rules that duplicate or conflict with current SA/TA references be handled?"
    disposition: "RESOLVED_FOR_CONTRACT"
    resolution: "The existing canonical contract wins unless the Contract gate approves an explicit additive change. Duplicate rules reference the existing obligation; conflicting or solution-prescriptive rules are converted to questions/handoffs, deferred, or excluded."
    owner: "developer"
    target_step: "s04-s05"
    latest_resolution_point: "Approach approval"
    blocks_s04_authoring: false
    blocks_s07: true
  - id: "OQ-005"
    question: "Who may seal each human-controlled gate?"
    disposition: "ROLE_AUTHORITY_LOCKED"
    resolution: "Spec: ba; Contract: developer; DoR: ba or qc; Approach: developer; Task Plan: developer; Release: devops or qc; Business Acceptance: po; DoD: qc. The actual reviewer and timestamp must be recorded in the trusted receipt and artifact before each gate is treated as passed."
    owner: "po"
    target_step: "s04-s08"
    latest_resolution_point: "Each applicable gate"
    blocks_s04_authoring: false
    blocks_s07: true
missing_inputs: []
conflicts:
  - id: "CF-001"
    sources:
      - "The internal source is draft, not architecture-reviewed, and for internal circulation."
      - "CHANGE-004 requests reusable public SA/TA guidance."
    conflict: "The source is useful evidence but is not approved as universal public policy."
    disposition: "Use private rule provenance and independently worded domain-neutral outputs; enforce zero source-specific leakage."
  - id: "CF-002"
    sources:
      - "Some source rules prescribe concrete downstream design choices."
      - "SA/TA may only surface drivers and handoffs in s01-s04."
    conflict: "Verbatim adoption would move s05 design authority upstream."
    disposition: "Convert prescriptive content to questions/handoffs, defer it to s05+, or exclude it."
  - id: "CF-003"
    sources:
      - "The current SA/TA output blocks and ownership meanings are fixed."
      - "New checklist evidence may need a discoverable public contract."
    conflict: "An additive surface may improve usability but may also break consumers or duplicate existing fields."
    disposition: "Lock observable behavior and compatibility in s04; compare representation options in s05 under Contract approval."
assumptions:
  - "The 34-rule routing matrix in s01 is private trace evidence and will remain complete even if fewer rules produce public text."
  - "Actual human names are not mandatory for s04 authoring; declared role plus reviewer identity and time become mandatory when each gate is sealed."
  - "A release version is not required to state measurable, version-independent acceptance criteria, but it must be locked before s07 release-file edits begin."
```

## Input Readiness
```yaml
step: "s04 Acceptance + DoR"
status: READY
available_inputs:
  - "Approved CHANGE-004 receipt reviewed by po at 2026-08-19T02:11:17.613Z"
  - "Approved work-item receipt reviewed by po at 2026-08-19T02:11:31.392Z"
  - "s01 contains a 34/34 primary routing matrix, three objectives, five SA drivers, and five TA drivers with explicit handoffs"
  - "s02 contains measurable outcomes for routing, evidence completeness, confidentiality, role boundaries, contract compatibility, and distribution parity"
  - "Current canonical SA/TA output, block-ownership, metric, invocation, and landscape contracts"
missing_inputs: []
invalid_inputs:
  - "The internal design document is draft and internal-only, so it is valid as a private analysis corpus but invalid as direct normative public text."
conflicts:
  - "The source contains prescriptive downstream decisions; s01 routing and OQ-004 provide a non-prescriptive disposition for every such rule."
  - "Potential additive checklist evidence may conflict with current fixed blocks; s04 can lock compatibility before s05 chooses a representation."
assumptions:
  - "Trusted receipts are authoritative for work-item and change approval."
  - "Version-independent criteria are sufficient for s04; release/version selection remains guarded before implementation."
risk_level: MEDIUM
next_action: "Draft s04 measurable acceptance criteria and a DoR recommendation, then stop before s05 until human Spec, Contract, and DoR receipts are sealed."
```

## Audit
```yaml
step: "s03 Open Questions"
status: PASS
checks:
  - criterion: "No unresolved question blocks authoring measurable acceptance criteria"
    result: PASS
    evidence: "OQ-001 through OQ-005 each have a resolution or guarded deferral, an owner, a target step, and a blocking scope."
  - criterion: "Every deferred decision names its target step, owner, and latest resolution point"
    result: PASS
    evidence: "OQ-002 and OQ-003 identify s05-s06 owners and deadlines before Task Plan or Approach approval."
  - criterion: "The internal draft is not treated as an approved universal architecture policy"
    result: PASS
    evidence: "OQ-001 and CF-001 limit the source to private analysis and independently worded domain-neutral outputs."
  - criterion: "Existing contract and role-boundary concerns are explicit"
    result: PASS
    evidence: "CF-002 and CF-003 describe s05 authority and fixed-block compatibility conflicts with clear dispositions."
  - criterion: "Human-controlled downstream gates remain visibly pending"
    result: PASS
    evidence: "OQ-005 names each approving role, while Input Readiness authorizes only s04 drafting and explicitly stops before s05."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Completed in one focused authoring and validation pass."
gaps: []
risk_level: MEDIUM
next_action: "Proceed to draft s04; do not enter s05 until Spec, Contract, and DoR receipts are sealed."
```

## Governance Context
```yaml
governance_profile: strict
status: ALIGNED
decisions:
  - "Use the internal document only as private evidence for independently worded domain-neutral guidance."
  - "Keep observable behavior and compatibility in s04 while deferring representation and release mechanics to s05-s06."
  - "Retain separate Spec, Contract, DoR, Approach, Task Plan, Release, Business Acceptance, and DoD human gates."
exceptions_required: []
blocking_items: []
```

## Traceability
```yaml
upstream:
  - "integrate-design-checklists-into-sa-ta.s01.restate.md"
  - "integrate-design-checklists-into-sa-ta.s02.business-goal.md"
  - "changes/CHANGE-004/proposal.md"
downstream_links:
  - "OQ-001 and CF-001 -> confidentiality and publication acceptance criteria"
  - "OQ-002 -> release consistency criterion and s05-s06 decision"
  - "OQ-003 and CF-003 -> compatibility criterion and s05 option analysis"
  - "OQ-004 and CF-002 -> role-boundary negative cases and rule-to-contract matrix"
  - "OQ-005 -> gate reviewer requirements"
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Readiness status: READY for s04 authoring only; not READY for design or implementation.
- Remaining decisions are safely deferred with owners and latest resolution points.
- Required action after the s04 draft: human Spec review by BA, Contract review by Developer, and DoR review by BA or QC.
