---
name: product-thinking
description: Identify the business goal and user value of a software development request before choosing a technical solution. Use when you need to clarify why a feature exists, what the user value is, what a successful outcome looks like, and which parts are out of scope.
language: en
---

# Product Thinking

> Vietnamese: SKILL.vi.md

Clarify the business value and user value of a request before diving into technical design.

## Objective

- Clearly state what problem this request solves for the user or the business.
- Define the desired outcome if the change is delivered successfully.
- Lock down what will not be done, to avoid expanding scope on intuition.
- Provide clear enough context for the system design and implementation planning steps.

## When to Use

- When the request has been restated but the business goal is still vague.
- When you need to define user value, the desired outcome, or the reason to prioritize.
- When there is a risk the team dives straight into a technical solution before the actual problem is clear.

## Out of Scope

- Does not design architecture or detailed APIs.
- Does not break down technical tasks or estimate effort.
- Does not modify code directly.
- Does not replace the requirement analysis step; this skill inherits that step's output.

## Minimum Inputs

- `restated_request`
- `business_context`
- `stakeholder_intent`
- `known_constraints`

If a minimum user problem or business context cannot be identified, state that explicitly instead of inferring it.

## Required Output

Produce a YAML artifact using the following schema:

```yaml
restated_request: ""
user_problem: ""
business_goal: ""
user_value: ""
success_outcome: []
non_goals: []
priority_reason: ""
risks_business: []
metrics_candidate: []
notes_for_next_step: ""
```

## Meaning of Each Output

- `user_problem`: the real problem users are facing.
- `business_goal`: the business objective to achieve by delivering the change.
- `user_value`: the concrete benefit users receive.
- `success_outcome`: the desired success state after release.
- `non_goals`: parts that will not be addressed in the current change.
- `priority_reason`: the reason to prioritize, or not yet prioritize, this work.
- `risks_business`: business- or adoption-level risks.
- `metrics_candidate`: suggested metrics to track success after release.
- `notes_for_next_step`: handoff notes for the technical design step.

## Normalizing Output in a Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 2 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Main Artifact` block.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.
- Put a short reader-facing summary in the `summary` callout; the YAML block remains the source of truth.

## Execution Flow

1. Read `restated_request` and the business context.
2. Identify the user problem in concrete terms; avoid generic statements.
3. Write `business_goal` and `user_value`.
4. List `success_outcome` as observable states.
5. Lock `non_goals` to bound the business scope.
6. Record `priority_reason`, `risks_business`, and `metrics_candidate`.
7. Hand off the output to the `system-design` step.

## Quality Rules

- Default to writing and discussing in Vietnamese.
- Documents must be saved as UTF-8 and preserve Vietnamese diacritics correctly.
- Do not use generic answers such as "improve user experience" without specifying exactly what is improved.
- `success_outcome` must describe outcomes, not actions.
- `non_goals` must be clear enough to prevent misunderstandings about scope.

## Decision Rules

- If a request has multiple distinct business goals, split them into separate outcomes.
- If no reasonable user value can be found, warn that the request may be solution-first.
- If a metric cannot be measured right away, still propose `metrics_candidate` at a reasonable level.

## Completion Criteria

- A clear `business_goal` and `user_value`.
- Enough `success_outcome` to judge whether the release is successful.
- `non_goals` to lock the business scope.
- `notes_for_next_step` sufficient to move on to `system-design`.