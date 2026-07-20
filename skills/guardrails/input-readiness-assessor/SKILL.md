---
language: en
name: input-readiness-assessor
description: Assess input readiness before executing a step in the coding workflow. Use when you need to confirm that the input data is sufficient, correct, consistent, and verifiable, in order to decide READY or BLOCKED, with an input-readiness-report.
---

# Input Readiness Assessor

> Vietnamese: SKILL.vi.md

Assess the readiness of the inputs before starting to execute a step.

## Goal

- Prevent execution when input data is missing or wrong.
- Standardize the step-transition decision with a `READY` or `BLOCKED` status.
- Produce a traceable report to support auditing and handoff.

## When To Use

- When a step needs to confirm it has enough data to start safely.
- When open questions remain, dependencies are unclear, or multiple context sources conflict.
- When deciding whether implementation is allowed to proceed.

## Out Of Scope

- Does not fill in mandatory inputs by guessing.
- Does not replace the requirement-analysis or product-thinking step.
- Does not give the final PASS/FAIL for the whole step; that is the responsibility of `step-goal-auditor`.

## Minimum Input

- `inputs_required` from the Step Goal Contract.
- The actual input data currently available.
- The technical and quality constraints relevant to the current step.

If `inputs_required` cannot be determined, respond that the step contract is insufficient to assess readiness.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
step: ""
status: READY|BLOCKED
available_inputs: []
missing_inputs: []
invalid_inputs: []
conflicts: []
assumptions: []
risk_level: LOW|MEDIUM|HIGH
next_action: ""
```

## Meaning Of Each Output

- `available_inputs`: inputs that are present and usable.
- `missing_inputs`: mandatory inputs that are still missing.
- `invalid_inputs`: inputs that are present but not valid or not trustworthy.
- `conflicts`: contradictions between information sources.
- `assumptions`: temporary assumptions currently in use.
- `risk_level`: the risk level of the current readiness state.
- `next_action`: the concrete action to move to the next step.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 3 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Input Readiness` block.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.
- The `READY|BLOCKED` status in the prose summary must match the `status` in the YAML block.

## Evaluation Flow

1. List the `inputs_required`.
2. Compare each input against the actual data.
3. Check validity: format, version, source reliability.
4. Check for contradictions between inputs.
5. Record assumptions when information cannot be confirmed immediately.
6. Emit a clear `status` and `next_action`.

## Decision Rule

- `READY` when:
  - No mandatory `missing_inputs` remain.
  - No severe `invalid_inputs`.
  - No unresolved conflicts.

- `BLOCKED` when:
  - A mandatory input is missing.
  - An invalid input directly affects execution.
  - A data conflict has not been clarified.

## Quality Rules

- Do not guess to fill gaps for mandatory inputs.
- Every conclusion must have evidence or state the assumption explicitly.
- Default to writing and communicating in English; store as UTF-8.
- When there are multiple input sources, prefer the more reliable source and state this clearly.

## Completion Conditions

- A complete `input-readiness-report` following the schema.
- A clear final status (`READY` or `BLOCKED`).
- A `next_action` specific enough for the next step to execute immediately.