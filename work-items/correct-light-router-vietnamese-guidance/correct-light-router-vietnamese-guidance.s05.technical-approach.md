---
artifact_id: "correct-light-router-vietnamese-guidance.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "correct-light-router-vietnamese-guidance"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Draft authoring packet. Human gates are pending; source implementation has not started.

## Step Contract

```yaml
step: "s05"
step_goal: "Recommend the smallest correction that meets the acceptance contract."
value: "Remove incorrect Light next-action guidance without changing approval authority."
input_summary:
  - "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md"
output_summary:
  - "Option comparison, boundary, failure handling and validation approach."
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

## Option Analysis

```yaml
goal: "Satisfy AC-LR-001..005 without expanding the source boundary."
options:
  - id: "A"
    description: "Insert the two missing VI Light instructions using EN as read-only authority; add a section-scoped Node regression and bounded human language review."
    tradeoff: "Small reviewable delta; static wording guards need human meaning review."
  - id: "B"
    description: "Repair the router, all Light examples/references and missing VI translations together."
    tradeoff: "Broader remediation may help later but exceeds this admitted outcome and needs separate owner approvals."
  - id: "C"
    description: "Only link the VI reader to canonical EN."
    tradeoff: "Smallest byte change, but leaves the local next-action and gate-host instructions incomplete."
recommended_option: "A"
recommendation_reason: "It directly repairs both observed omissions while preserving existing authority and other owners. C fails local VI actionability; B adds unrelated work."
validation_needed:
  - "Actual two-defect RED; corrected positive controls; targeted mutation rejection; human EN/VI meaning check."
decision_status: "PROPOSED_PENDING_HUMAN_APPROACH"
```

## Foundation Decision

```yaml
status: "NOT_APPLICABLE"
reason: "Existing stack, runtime and ownership boundaries stay unchanged. Light Foundation escalation is content to preserve, not a new foundation decision for this child."
```

## Main Artifact

```yaml
recommended_design: "Option A, pending human Approach decision. Add the Step 3 paragraph and Step 4 Light-host list at their matching VI locations. Preserve existing content byte-for-byte elsewhere."
affected_boundary:
  - "VI router steps 3 and 4; one new Node test; own evidence. Exact writable and derived-only paths are in s06."
data_flow:
  - "Read canonical EN/policy -> author two VI inserts -> run local static checks -> record bounded BA/QC reading evidence. No network or data-path change."
contracts:
  - "Canonical Light host/approval semantics are preserved; no executable contract changes."
failure_modes:
  - failure: "Wrong host creates a false missing-s05 blocker."
    control: "Separate Step 3 and Step 4 host checks and wrong-host fixtures."
  - failure: "Shared host wording drops a required gate or permits Foundation in Light."
    control: "Check each named approval independently plus Foundation escalation and conditional Contract."
  - failure: "Lexical checks pass semantically poor prose."
    control: "Human BA reading and QC thresholds remain required; tests are bounded guards, not a semantic proof."
  - failure: "Generation changes unrelated tracked content."
    control: "Compare manifest/source hashes; stop and attribute drift before continuing."
validation_plan:
  - "s06 owns exact test fixtures, task sequence and reproducible commands."
observability:
  - "s07 records commands/results, source digests and review order; s08 owns AC coverage and bounded language scores. No new telemetry."
rollback_plan:
  - "Revert only the owned correction/test commit if it fails later verification; preserve evidence and reopen the child through normal CLI as required."
```

## Architecture Details

No new architecture, dependency, abstraction, test runner or CI wiring is proposed. The existing test runner discovers `test/*.test.js`. Use Node built-ins (`assert`, `fs`, `path`) and section-scoped checks with in-memory mutations; do not build a general natural-language parser.

## Brownfield Impact Analysis

```yaml
baseline_ref: "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md#existing-system-baseline"
changed_behavior:
  - "VI guidance selects the existing canonical Light host."
unchanged_contracts:
  - "CLI, runtime gate decisions, report schema, policy, EN router and full-track prerequisites."
migration_or_backfill: "NOT_APPLICABLE"
compatibility_risks:
  - "Brittle test matching must distinguish wrong mapping from harmless whitespace; fixtures must exercise the intended rule."
regression_strategy:
  - "Known-scope positive/negative checks plus existing full suite and pack audit."
rollback_strategy:
  - "Owned correction revert; no cleanup or receipt rewrite."
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
  - "correct-light-router-vietnamese-guidance.s04.acceptance-criteria.md"
next_step: "s06"
```

## Handoff

Human Developer review must explicitly select/approve the approach. Draft T1–T6 uses option A conditionally and must be revised if another option is selected.
