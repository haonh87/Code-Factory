---
language: en
name: step-goal-auditor
description: Audit the actual output of each coding-workflow step against the Step Goal Contract. Use at the end of each step to assess PASS, FAIL, or PARTIAL, record evidence, point out gaps, and decide whether the next step is allowed to proceed.
---

# Step Goal Auditor

> Vietnamese: SKILL.vi.md

Assess how well a step met its goal based on the pinned contract.

## Goal

- Check whether the actual output matches the step's contract.
- Produce an evidence-based conclusion instead of a subjective judgment.
- Point out gaps, constraint violations, and open risks before moving to the next step.

## When To Use

- At the end of each step that has a clear contract.
- When deciding whether the next step is allowed to proceed.
- When consolidating evidence before a review or handoff.

## Out Of Scope

- Does not redefine the step's goal.
- Does not replace detailed testing; the audit uses verification results as evidence.
- Does not hide gaps or self-legitimize a step that did not pass.

## Minimum Input

- The Step Goal Contract of the current step.
- The actual artifact produced in the step.
- Check logs (test, lint, build, encoding) if any.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
step: ""
status: PASS|FAIL|PARTIAL
checks:
  - criterion: ""
    result: PASS|FAIL
    evidence: ""
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: true|false
timebox_evidence: ""
gaps: []
risk_level: LOW|MEDIUM|HIGH
next_action: ""
```

## Meaning Of Each Output

- `checks`: results per `done_when` criterion.
- `constraint_violations`: hard-constraint violations if any.
- `unmitigated_high_risks`: HIGH risks without a valid handling plan.
- `timebox_breach`: whether the step exceeded its timebox.
- `gaps`: parts not met or without evidence.
- `risk_level`: the overall risk level after the audit.
- `next_action`: the action needed before moving to the next step.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Place this skill's YAML schema in the `## Audit` block.
- This block usually appears in step 3 and step 8 per the template in `../codex-workflow-chain/references/workflow-chain.md`.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.
- The `PASS|FAIL|PARTIAL` prose conclusion must match the `status` in the YAML block.

## Evaluation Flow

1. Load the contract and extract the `done_when` list.
2. Map each criterion to the actual evidence.
3. Record `PASS/FAIL` for each criterion.
4. Compare `hard_constraints` against the evidence to detect violations.
5. Review `severity=HIGH` risks to see whether they have a `mitigation` and an executing `owner`.
6. Check `timebox` breaches and record evidence.
7. Consolidate `gaps`, the risk level, and the remediation action.
8. Conclude the overall status.

## Status Rule

- `PASS` when:
  - All mandatory `done_when` criteria are met with evidence.
  - There are no `constraint_violations`.
  - No `unmitigated_high_risks` remain.

- `PARTIAL` when:
  - Part is met but a non-critical criterion is still missing.
  - Or there is a `timebox_breach` that is explained and accepted.

- `FAIL` when:
  - A mandatory criterion is missing.
  - There are `hard_constraints` violations.
  - A `HIGH` risk still has no valid handling plan.

## Quality Rules

- Default to writing and communicating in English.
- Every conclusion must have evidence; do not use subjective impressions.
- Do not mark `PASS` when there is not enough data to prove it.
- If a check was skipped, reflect it in `gaps` or `next_action`.

## Completion Conditions

- A complete audit report following the schema.
- A clear status and evidence, traceable.
- A clear conclusion on whether the next step is allowed to proceed.