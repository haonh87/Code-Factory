---
language: en
name: step-goal-contract
description: Standardize the goal of each coding-workflow step into a verifiable contract. Use at the start of any step in the development chain to define the goal, value, scope, input, output, done criteria, constraints, risks, and timebox before execution.
---

# Step Goal Contract

> Vietnamese: SKILL.vi.md

Create a goal contract for each step before executing it.

## Goal

- Lock the goal of each step clearly before doing the work.
- Turn an ambiguous step into one with concrete input, output, and completion conditions.
- Provide a standard contract for `input-readiness-assessor`, `implementation`, and `step-goal-auditor`.

## When To Use

- At the start of every step in the delivery workflow.
- When you need to pin the goal, scope, constraints, or done criteria before moving into real work.
- When a step has drifted in scope and needs to be re-contracted.

## Out Of Scope

- Does not replace the step's business skill.
- Does not directly assess PASS/FAIL after the step has run.
- Does not decide detailed technical choices if a specialized skill has not been used.

## Minimum Input

- The user's current request.
- The context and output of the previous step.
- The technical, quality, and time constraints.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
step: ""
goal: ""
value: ""
scope_in: []
scope_out: []
inputs_required: []
outputs_required: []
done_when: []
constraints:
  hard_constraints: []
  soft_constraints: []
  prohibited_actions: []
  compliance_checks: []
risks:
  - id: ""
    description: ""
    likelihood: LOW|MEDIUM|HIGH
    impact: LOW|MEDIUM|HIGH
    severity: LOW|MEDIUM|HIGH
    mitigation: ""
    contingency: ""
    owner: ""
    status: OPEN|MONITORING|CLOSED
timebox:
  target_duration: ""
  deadline: ""
  escalation_rule: ""
```

## Meaning Of Each Output

- `goal`: the result state to reach, not an activity.
- `value`: the value this step creates for the workflow.
- `scope_in` and `scope_out`: clear limits on what is done and what is not.
- `inputs_required`: the mandatory inputs for the step to run safely.
- `outputs_required`: the artifact the step must produce.
- `done_when`: verifiable completion conditions.
- `constraints`: limits that must not be violated.
- `risks`: risks to monitor and handle.
- `timebox`: the time limit or deadline of the step.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the `## Step Contract` block in the matching step template in `../codex-workflow-chain/references/workflow-chain.md`.
- This block appears in all 8 steps of the standard workflow chain.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.
- Do not move the contract into prose and drop the YAML block; the standard contract must live in this block.

## Execution Flow

1. Extract the business or technical goal of the step.
2. Separate clearly what is in scope and out of scope.
3. Standardize the mandatory inputs and outputs.
4. Write `done_when` as verifiable criteria.
5. Record `constraints`, `risks`, and `timebox` per the schema.
6. Emit the contract before moving into execution.

## Valid Contract Criteria

- `goal` describes a result state, not an activity.
- `outputs_required` are concrete artifacts, not vague.
- Each `done_when` item must have collectible evidence.
- `scope_out` must be clear enough to prevent scope creep.
- Each `hard_constraint` must have at least one matching `compliance_check`.
- Every `severity=HIGH` risk must have a `mitigation` and an `owner`.
- `timebox` must have at minimum a `target_duration` or a `deadline`.

## Quality Rules

- Default to communicating and documenting in English.
- Text files must be stored as UTF-8.
- Do not start execution before the contract is meaningful enough.
- Do not use vague contracts such as "just get it done" or "optimize."

## Completion Conditions

- A complete contract following the schema.
- No serious blocker at the contract level.
- Ready to move to the step's business skill or the next gate.