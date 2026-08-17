---
artifact_id: "artifact-governance-enforcement.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "artifact-governance-enforcement"
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
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: []
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
  spec:
    - "ba"
  contract:
    - "ba"
    - "developer"
  dor:
    - "po"
    - "ba"
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
  - "artifact-governance-enforcement.s01.restate.md"
  - "artifact-governance-enforcement.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Four questions carried in. Two are resolved here by a safe default that removes the blocker,
> two are genuine design decisions that belong to s05. Verdict READY.

## Step Contract
```yaml
step_goal: "Resolve or reclassify every open question so s04 can lock acceptance criteria, and separate what a safe default settles from what a human must decide."
input_summary:
  - "s01 open_questions_initial Q1 to Q4"
  - "s02 objectives OBJ-1 to OBJ-4"
output_summary:
  - "Resolution or reclassification per question"
  - "Readiness verdict with blocking items named"
done_when:
  - "No question is left in an ambiguous state"
  - "Every unresolved question is assigned to the step that owns it"
owner: "ba"
```

## Artifact Chính
```yaml
questions_ref: "artifact-governance-enforcement.s01.restate.md#Artifact Chính"

resolved_here:
  - id: "Q1"
    question: "Does enforcement bind an adopting project's repository, or only Code-Factory?"
    resolution: "Both, but the layer roots become configuration rather than hardcoded values. The check reads the declared roots from workflow-contracts.config.json with Code-Factory's six layers as the shipped default. An adopter with a different layout declares their own roots; one that declares none inherits the default."
    reason: "This removes the question rather than answering it politically. Hardcoding Code-Factory's roots would break every adopter with a different layout, and restricting the check to this repository would make the published bundle carry a rule it does not apply to its own users."
    consequence_for_s04: "Acceptance must include: an adopter-shaped fixture with custom roots passes, and a fixture declaring no roots inherits the default."
    status: RESOLVED
  - id: "Q4"
    question: "Should the approval-path defect work item be sequenced before this one?"
    resolution: "It should, and it is recorded as a recommendation in s01 Handoff. It does not block this work item's planning, and this work item does not depend on it technically - only on the human's patience."
    reason: "Sequencing is the human's call. Recording it as a recommendation is the correct disposition; treating it as a blocker here would stall planning that has no technical dependency."
    status: RESOLVED_AS_RECOMMENDATION

reclassified_to_s05:
  - id: "Q2"
    question: "Dual-shape support, migrate-on-read, or a one-off migration for the sixteen legacy work items and the multi-role sample?"
    why_not_here: "It is an approach decision with three viable options and a real cost difference. Answering it in s03 would prejudge the option analysis that s05 exists to perform."
    constraint_for_s05: "Whichever option is chosen must keep the 17 existing work items passing validation, because a governance tool that invalidates its own history is not adoptable."
    status: DEFERRED_TO_S05
  - id: "Q3"
    question: "Does the placement check need an escape hatch with a declared reason, and who may grant it?"
    why_not_here: "The need is already established - s02 names a check-that-blocks-everyone as the single most likely failure. The design of the hatch is an approach decision."
    constraint_for_s05: "An escape hatch must exist, must require a stated reason rather than a bare flag, and must be visible in validation output so a silently-widened exemption is detectable."
    status: DEFERRED_TO_S05

newly_surfaced:
  - id: "Q5"
    question: "Does the emitted-shape change require a major version bump, or is it additive enough for a minor?"
    finding: "If the generator emits sections while the readers accept both shapes, the change is additive for adopters and a minor bump suffices. If the readers require the new shape, it is breaking. The answer therefore falls out of Q2 rather than standing alone."
    status: DEPENDENT_ON_Q2
  - id: "Q6"
    question: "Does workflow-contracts.config.json already have a schema this configuration can extend, or does adding layer roots change that file's contract too?"
    finding: "The file already carries protocolControl.legacyScaffoldPolicy, so it is an established configuration surface. Extending it is lower risk than introducing a new config file. To be confirmed against the file's readers during s05."
    status: OPEN_LOW_RISK

missing_inputs: []
conflicts:
  - id: "C1"
    conflict: "s01 assumption A2 keeps P2 and P3 in one work item, but Q2's answer could make the shape change breaking, which would argue for shipping and observing the shape before hardening a check around it."
    resolution: "Not a blocker for s04. If s05 chooses a breaking shape, A2 is revisited there and the split becomes an approach output rather than a scoping guess."
assumptions:
  - id: "A5"
    assumption: "Layer roots are configuration with a shipped default, per Q1."
    reject_if: "The repository prefers enforcement to remain local to Code-Factory until the rules have run for several cycles."
  - id: "A6"
    assumption: "The 17 existing work items must keep passing validation under any option s05 selects."
    reject_if: "A one-off migration of all existing work items is acceptable as part of this change."
```

## Input Readiness
```yaml
status: READY
blocking_items: []
rationale: "Q1 is resolved by making roots configurable, which is what unblocks acceptance criteria. Q2 and Q3 are approach decisions with constraints stated for s05 to work within, which is the correct place for them. Q4 is a sequencing recommendation for the human. Q5 falls out of Q2. Q6 is low risk and confirmable during s05."
owner_actions:
  - "Human: accept or reject A5 and A6 at the DoR gate"
  - "Human: decide whether to sequence the approval-path work item first, per Q4"
non_blocking_carried_forward:
  - "Q2 and Q3 to s05 with their constraints"
  - "Q5 dependent on Q2"
  - "Q6 to confirm during s05"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "Two of four carried questions resolved, two reclassified with an explicit constraint rather than left vague."
  - "Q1 was resolved by changing the design so the question no longer needs a political answer. Recorded because it is the more useful move than picking a side."
  - "Two new questions surfaced during analysis, both traced to their dependency rather than left floating."
  - "No question was marked resolved without a stated reason."
```

## Traceability
```yaml
upstream:
  - "artifact-governance-enforcement.s01.restate.md#Artifact Chính"
  - "artifact-governance-enforcement.s02.business-goal.md#Artifact Chính"
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Readiness: **READY**. Nothing blocks acceptance criteria.
- Resolved here: `Q1` by making layer roots configuration with a shipped default; `Q4` as a sequencing recommendation for the human.
- Deferred to `s05` with binding constraints: `Q2` legacy shape, `Q3` escape-hatch design. Neither is left vague — each carries a constraint `s05` must satisfy.
- New for `s04` acceptance because of `Q1`: an adopter-shaped fixture with custom roots must pass, and one declaring no roots must inherit the default.
- Two new assumptions `A5` and `A6` for the human to accept or reject at `DoR`.
