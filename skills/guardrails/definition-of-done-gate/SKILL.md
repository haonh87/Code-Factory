---
language: en
name: definition-of-done-gate
description: Prepare an advisory Definition of Done assessment for human QC approval after technical verification. Check acceptance evidence, implementation, verification and business -> design -> code -> verify traceability; this skill does not approve the gate or close the work item.
---

# Definition of Done Gate

> Vietnamese: SKILL.vi.md

Assess whether a technical work item is ready for human DoD approval after implementation and verification.

AI prepares an advisory assessment. Only an authorized human QC reviewer can approve DoD at `s08`; protocol-managed completion also requires the applicable trusted receipt and valid protocol transitions. Passing tests or an AI `DONE` recommendation alone never closes the work item.

## Goal

- Prepare the evidence for the work-item DoD gate beyond the verify step's test result.
- Assess whether the evidence supports requesting human approval of technical completion.
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

The `status` field records the AI recommendation, not the human gate decision or protocol status. Keep the human review and trusted receipt separate from this assessment.

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
7. Recommend `DONE`, `PARTIAL`, or `BLOCKED` and hand the assessment to the authorized human QC reviewer; do not pass the gate or close the work item yourself.

## Decision Rule

- Recommend `DONE` when every mandatory check passes and no blocking gap remains; request the human DoD decision and applicable trusted receipt before protocol completion.
- Recommend `PARTIAL` when evidence or work remains; identify the owner and next action. This assessment does not authorize closure.
- Recommend `BLOCKED` when important evidence is missing, traceability is incomplete, or verification is insufficient.

## Completion Conditions

- A clear advisory `DONE|PARTIAL|BLOCKED` assessment and handoff for the human decision. Finishing this assessment does not finish the work item.
- `gaps` and `next_action` when not DONE.
- `follow_up_items` when there is work outside the current scope.
