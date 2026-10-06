---
artifact_id: "correct-light-router-vietnamese-guidance.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "correct-light-router-vietnamese-guidance"
step_id: "s04"
step_slug: "acceptance-criteria"
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
  - "ba"
review_mode: self
verification_owner: "qc"
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
  contract: []
  dor:
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance: []
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
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-light-router-vietnamese-guidance.s01.restate.md"
  - "correct-light-router-vietnamese-guidance.s02.business-goal.md"
  - "correct-light-router-vietnamese-guidance.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Draft authoring packet. Human gates are pending; source implementation has not started.

## Step Contract

```yaml
step: "s04"
step_goal: "Offer measurable acceptance and a reviewable DoR assessment for the bounded correction."
value: "Remove incorrect Light next-action guidance without changing approval authority."
input_summary:
  - "correct-light-router-vietnamese-guidance.s01.restate.md"
  - "correct-light-router-vietnamese-guidance.s02.business-goal.md"
  - "correct-light-router-vietnamese-guidance.s03.open-questions.md"
output_summary:
  - "AC-LR-001..005 and explicit baseline/authority conditions."
done_when:
  - "Outputs are concrete and reviewable; required human gates remain pending until explicit review and trusted sealing."
owner: "ba"
constraints:
  - "English authoring; preserve Vietnamese source accents."
  - "No source or test edits before independent child activation."
  - "No parent approval or previous child receipt substitutes for this child."
risks:
  - "Draft completeness can be confused with gate approval; retain separate status and empty review metadata."
timebox:
  target_duration: "One authoring pass, then one bounded implementation/review pass after gates."
  deadline: "No external deadline."
  escalation_rule: "Stop and refresh scope/approval if the two source sections cannot satisfy the criteria."
```

## Requirement Baseline

```yaml
status: "PARTIAL"
approved_spec_refs: []
decision_notes:
  - "This is the proposed authoritative acceptance note for sdd_mode=none. Human Spec and DoR remain pending. Admission is complete; it does not supply these approvals."
```

## Contract Baseline

```yaml
status: "NOT_APPLICABLE"
api_contract_refs: []
ux_contract_refs: []
notes:
  - "No API, event, data or UX contract is changed. The source text must preserve the canonical conditional Contract rule for other Light work items."
```

## Existing System Baseline

```yaml
source_commit: "f27093d06ecab43f40d481542e1be5f49bf279cc"
current_behavior_refs:
  - path: "skills/orchestration/workflow-governance-router/SKILL.md"
    sha256: "400661cac92f7cbc76f3293ca550f77849a689b342f7912246ebc75d690cc625"
    behavior: "EN Step 3 gives the s06 content/receipt host; Step 4 gives four gate hosts and Foundation/Contract conditions."
  - path: "skills/orchestration/workflow-governance-router/SKILL.vi.md"
    sha256: "b55ba5cd9682e0d1091ff893a0e638bcab4638f57649824c7c62bbd4fd21236c"
    behavior: "The corresponding VI Step 3/4 paragraphs are absent; the generic full-track list remains."
impacted_surfaces:
  - "VI reader next-action guidance and one new static regression."
compatibility_constraints:
  - "No runtime/CLI/protocol/schema change; preserve all other source bytes."
rollback_constraints:
  - "Revert only the future child correction through an owned change; do not reset signed evidence or prior child work."
```

## Main Artifact

```yaml
acceptance_criteria:
  - id: "AC-LR-001"
    criterion: "VI Step 3 explains that Light has no separate s05 physical note; Option Analysis, Brownfield Impact and Technical Approach live in s06. It checks Approach content/receipt there instead of reporting a missing s05 file/gate. All eight logical steps remain."
    verify: "Section-scoped source checks plus BA reading of exact EN/VI Step 3 scopes."
  - id: "AC-LR-002"
    criterion: "VI Step 4 maps Spec and DoR to s04, Approach and Task Plan to s06 with independent required approvals and no separate s05 receipt. Foundation Decision triggers escalation out of Light to full. Contract, when present, applies at s04."
    verify: "Four-gate host controls, Foundation/Contract controls and targeted wrong-host/omission mutations; BA comparison to EN/policy."
  - id: "AC-LR-003"
    criterion: "The existing full-track list, eight-step list, explicit evidence requirement, fail-closed status consistency and language preference behavior remain unchanged. EN, policy and runtime/CLI implementation remain byte-identical; VI changes are confined to the two insertions."
    verify: "Compare source hashes and a diff limited to Step 3/4 insertions; review all other VI sections byte-for-byte and require unchanged tracked package manifest."
  - id: "AC-LR-004"
    criterion: "The new standard-discovered Node regression reports both original VI omissions as RED for the correct reasons, passes on the corrected source and rejects every specified negative fixture. Focused syntax, full unit suite, pack audit, workflow validators, UTF-8 and whitespace checks pass."
    verify: "s06 T2/T4 command evidence records each original failure and each mutation result; a missing file or syntax error is not a valid RED."
  - id: "AC-LR-005"
    criterion: "BA reviews two reading units: EN Steps 3–4 and VI Steps 3–4, including the immediate Step 5 authority context. QC checks hashes, line ranges, excerpts and scores. Across these two units, critical flags are zero, mean is at least 4/5 and each dimension is at least 3/5."
    verify: "Child s08 records clarity, naturalness, next action, terminology and role/gate relevance, plus explicit human BA/QC decisions. No score or decision is inferred for other M7 units."
edge_cases:
  - "Light has s04/s06 evidence but no physical s05: do not demand it."
  - "Missing Approach or Task Plan evidence at the shared s06 host still blocks."
  - "Full/strict retains its applicable s04/s05/s06 model."
  - "A Foundation need escalates out of Light; an applicable Contract is never silently dropped."
out_of_scope:
  - "Other M7 repairs, prior child hosts, runtime implementation, release/install and cleanup."
done_when:
  - "All five ACs have evidence and human QC DoD has a valid trusted receipt."
behavioral_invariants:
  - "Draft is not approval; materialization is not activation; shared host is not shared approval."
```

## Governance Checks

```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Source identity, maintenance routing, human-authority separation and exact scope are documented."
blocking_items:
  - "Human Spec/DoR review and all remaining implementation-entry gates."
owner: "qc"
next_action: "Human BA decides Spec and QC decides DoR against this draft, before trusted sealing."
```

## Definition of Ready

```yaml
status: "PARTIAL"
blockers:
  - "Spec and DoR have not been human-passed."
owners:
  - "ba"
  - "qc"
notes:
  - "AI authoring assessment: technical inputs are sufficient; criteria, baseline and scope are reviewable. This is not a human READY verdict."
```

## Audit

```yaml
audit_status: "PARTIAL"
assessment_mode: "AI_AUTHORING_REVIEW"
notes:
  - "Draft is offered for review; no human gate has passed."
  - "Acceptance is owned by s04, the approach by s05, and executable scope/tasks by s06."
next_action: "Human reviews the concrete authoring packet; trusted receipts and activation follow only after explicit approval."
```

## Traceability

```yaml
upstream:
  - "correct-light-router-vietnamese-guidance.s01.restate.md"
  - "correct-light-router-vietnamese-guidance.s02.business-goal.md"
  - "correct-light-router-vietnamese-guidance.s03.open-questions.md"
next_step: "s05"
```

## Handoff

Review Spec and DoR independently. The draft approach/plan can be read in the same packet; no deeper gate is inferred from their existence.
