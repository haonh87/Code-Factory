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
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
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
> The user explicitly accepted the work item, Spec + DoR, Approach A and Task Plan at checkpoint `ef8bf47`. Acceptance was recorded at 2026-10-06T06:28:40Z; this is the recording time, not an inferred chat timestamp. Trusted receipt sealing and CLI activation are still required before source implementation.

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
  - "Human authoring approval is recorded; trusted sealing and activation remain required before execution."
owner: "developer"
constraints:
  - "English authoring; preserve Vietnamese source accents."
  - "No source or test edits before independent child activation."
  - "No parent approval or previous child receipt substitutes for this child."
risks:
  - "Content approval can be confused with runtime authority; retain the separate trusted receipt and activation requirements."
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
  - "Valid trusted work-item/authoring receipts and activation before implementation; the human content decisions are recorded in s06."
decisions_needed:
  - "The user selected option A and accepted the work-item/Spec/DoR/Approach/Task Plan packet; seal those decisions through the normal CLI."
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
  - "The user accepted the concrete authoring packet; normal trusted receipt sealing remains pending."
  - "Acceptance is owned by s04, the approach by s05, and executable scope/tasks by s06."
next_action: "Seal the accepted decisions against finalized hosts in a human-controlled terminal; verify signatures and host digests before activation."
```

## Traceability

```yaml
upstream:
  - "correct-light-router-vietnamese-guidance.s01.restate.md"
  - "correct-light-router-vietnamese-guidance.s02.business-goal.md"
next_step: "s04"
```

## Handoff

No unanswered technical question blocks the accepted plan. Human content decisions are recorded; independent trusted receipts and activation are still required before implementation.
