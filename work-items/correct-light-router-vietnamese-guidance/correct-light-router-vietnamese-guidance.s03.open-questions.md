---
artifact_id: "correct-light-router-vietnamese-guidance.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "correct-light-router-vietnamese-guidance"
step_id: "s03"
step_slug: "open-questions"
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
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-light-router-vietnamese-guidance.s01.restate.md"
  - "correct-light-router-vietnamese-guidance.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Draft authoring packet. Human gates are pending; source implementation has not started.

## Step Contract

```yaml
step: "s03"
step_goal: "Resolve scope uncertainty and distinguish pending authority from missing technical inputs."
value: "Remove incorrect Light next-action guidance without changing approval authority."
input_summary:
  - "correct-light-router-vietnamese-guidance.s01.restate.md"
  - "correct-light-router-vietnamese-guidance.s02.business-goal.md"
output_summary:
  - "Explicit decisions, dependencies and input-readiness assessment."
done_when:
  - "Outputs are concrete and reviewable; required human gates remain pending until explicit review and trusted sealing."
owner: "developer"
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

## Main Artifact

```yaml
open_questions: []
resolved_questions:
  - question: "Reuse the prior completed child?"
    answer: "No. Its eight-source grant excludes router files; preserve DONE and merged PR #14."
  - question: "Why full authoring for a Light wording fix?"
    answer: "Full/default/agentic is the signed intake choice. The subject is Light guidance; the child itself retains s04, s05 and s06 hosts."
  - question: "Does this change runtime policy or publication?"
    answer: "No. Canonical EN/policy are read-only; no public contract, security control or release trigger applies."
  - question: "Are derived outputs needed?"
    answer: "Yes, local runtime generation is prerequisite to the existing standard test path. s06 proposes two explicit derived-only grants; manifest must remain unchanged."
blocking_dependencies:
  - "Human work-item and authoring decisions, valid trusted receipts and activation before implementation."
decisions_needed:
  - "Review the s04/s05/s06 packet; select option A or identify required changes."
```

## Input Readiness

```yaml
status: "READY"
scope: "Draft authoring only"
evidence:
  - "correct-light-router-vietnamese-guidance.s01.restate.md"
  - "Canonical EN has the Light paragraphs; VI lacks both at the captured baseline."
not_authorized:
  - "Implementation, gate approval, source/test modification."
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
next_step: "s04"
```

## Handoff

No unanswered technical question blocks drafting. Human gates remain pending and must be satisfied independently before implementation.
