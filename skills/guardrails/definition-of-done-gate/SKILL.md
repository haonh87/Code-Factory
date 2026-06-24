---
language: en
name: definition-of-done-gate
description: Pin the Definition of Done at the work-item level after technical verification. Use when you need to confirm that acceptance criteria have evidence, implementation is recorded, verification is sufficient, and the traceability chain business -> design -> code -> verify is complete before closing out the technical work.
---

# Definition of Done Gate

> Vietnamese: SKILL.vi.md

Pin the completion status of a technical work item after implementation and verification have run.

## Goal

- Create a gate at the work-item level instead of stopping only at the test result of the verify step.
- Confirm the change has enough evidence to be considered done from the technical-workflow perspective.
- Record gaps, residual risks, and follow-up items when it cannot yet be considered DONE.

## When To Use

- At the end of step 8 of the current workflow chain.
- After the verification report, scan summary, audit, and implementation evidence are available.

## Out Of Scope

- Does not replace `testing` at the level of test strategy and verification evidence.
- Does not replace `step-goal-auditor` at the level of auditing the step contract.
- Does not replace the actual rollout or release execution on the target environment; this gate only locks readiness and evidence.

## Minimum Input

- Pinned acceptance criteria.
- The implementation artifact or actual outputs.
- The verification report, scan summary, and step 8 audit.
- Traceability from business -> design -> code -> verify.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
work_item_slug: ""
status: DONE|PARTIAL|BLOCKED
checks:
  acceptance_criteria_evidenced: PASS|FAIL
  implementation_recorded: PASS|FAIL
  required_verification_completed: PASS|FAIL
  code_scan_completed_or_justified: PASS|FAIL
  traceability_complete: PASS|FAIL
  residual_risks_documented: PASS|FAIL
gaps: []
residual_risks: []
follow_up_items: []
next_action: ""
```

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 8 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Definition of Done` block.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.

## Evaluation Flow

1. Compare acceptance criteria against the verification evidence.
2. Check that the implementation is recorded well enough to be traceable.
3. Check that the mandatory verifications have run or have a valid skip reason, including the deployment review when the work item has packaging or rollout scope.
4. Check that the code-quality scan is complete or has a clear justification.
5. Check whether the traceability chain business -> design -> code -> verify is fully connected.
6. Check whether residual risks and follow-up items are clearly recorded.
7. Conclude `DONE`, `PARTIAL`, or `BLOCKED`.

## Decision Rule

- `DONE` when every mandatory check passes and no blocking gap remains.
- `PARTIAL` when most of the work is done but a non-blocking gap remains that does not prevent closing the technical work now.
- `BLOCKED` when important evidence is missing, traceability is incomplete, or verification is insufficient.

## Completion Conditions

- A clear `DONE|PARTIAL|BLOCKED` conclusion.
- `gaps` and `next_action` when not DONE.
- `follow_up_items` when there is work outside the current scope.