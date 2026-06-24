---
language: en
name: definition-of-ready-gate
description: Pin the Definition of Ready at the work-item level before moving from discovery to design and implementation planning. Use when you need to confirm that requirements are clear enough, scope is sufficiently locked, acceptance criteria are testable, and the remaining ambiguity no longer blocks delivery.
---

# Definition of Ready Gate

> Vietnamese: SKILL.vi.md

Pin the readiness status of a work item before fully moving into the technical approach, task breakdown, and implementation.

## Goal

- Create a gate at the work-item level, not only at the level of each individual step.
- Confirm that the current discovery is sufficient for the developer to proceed without blind inference.
- Record blockers, accepted assumptions, and the action needed when it is not yet READY.

## When To Use

- At the end of step 4 of the current workflow chain.
- After the restatement, business goal, open-questions/readiness report, and acceptance criteria are available.
- Before moving into the technical approach or task breakdown.

## Out Of Scope

- Does not replace `input-readiness-assessor` at the step-input level.
- Does not replace `step-goal-auditor` at the level of auditing the step contract.
- Does not pin the technical approach in place of step 5.

## Minimum Input

- The step 1 artifact with the restatement and discovery framing.
- The step 2 artifact with the business goal.
- The step 3 artifact with readiness and open questions.
- The step 4 artifact with acceptance criteria.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
work_item_slug: ""
status: READY|BLOCKED
checks:
  restated_request_clear: PASS|FAIL
  business_goal_clear: PASS|FAIL
  scope_defined: PASS|FAIL
  open_questions_non_blocking: PASS|FAIL
  acceptance_criteria_testable: PASS|FAIL
  dependencies_known: PASS|FAIL
  verification_direction_present: PASS|FAIL
blocking_gaps: []
accepted_assumptions: []
residual_risks: []
next_action: ""
```

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 4 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Definition of Ready` block.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.

## Evaluation Flow

1. Re-read the artifacts from step 1 through step 4.
2. Check whether the work item has a `work_item_type` and a clear restatement.
3. Check whether the business goal and scope are clear enough to decide the technical direction.
4. Check whether the remaining open questions still block delivery.
5. Check whether the acceptance criteria are measurable and have a preliminary verification direction.
6. Conclude `READY` or `BLOCKED`, stating `blocking_gaps` and `next_action`.

## Decision Rule

- `READY` when every mandatory check passes and no blocker still blocks delivery.
- `BLOCKED` when core information about the goal, scope, dependencies, or acceptance criteria is missing.

## Completion Conditions

- A clear `READY|BLOCKED` conclusion.
- `blocking_gaps` when not READY.
- A `next_action` specific enough to move to the next step or go back to the previous step.