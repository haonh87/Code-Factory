---
name: brainstorming
language: en
description: Explore and lock down a solution direction before technical approach using a disciplined, Superpowers-style dialogue with clear BA lane and DEV lane. Use when the request is ambiguous, there are multiple viable approaches, or you need to lock goals, business rules, constraints and option analysis before moving to system-design.
---

# Brainstorming

> Vietnamese: SKILL.vi.md

Turn an ambiguous request into a clearly presented `option analysis` with a recommendation, ready to move to `system-design`.

<HARD-GATE>
Must not invoke the implement skill, must not write production code, must not scaffold a project, and must not treat a feature request as authorization to code directly.

The output of this skill is a presented `option analysis` confirmed by the user, not the final technical approach.
</HARD-GATE>

## When to Use

- When the request is still ambiguous or only at the idea stage.
- When you need to clarify goals, business rules, constraints or success criteria before technical design.
- When there are two or more viable directions, or a risk of locking the approach on intuition alone.
- When you need to force the agent to pause, ask questions, and compare options before entering `system-design`.

## Out of Scope

- Does not replace `system-design` for locking the final technical boundary.
- Does not replace `task-breakdown-planner` for execution planning.
- Does not replace `implementation` for writing code.
- Does not legitimize "code first, analyze later".

## Minimum Input

- A restated request or raw request sufficient to understand the problem
- Relevant repo or existing-product context, if applicable
- Known constraints
- Initial signal of user value or business goal

If the problem is not clear at a minimum level, ask clarifying questions instead of brainstorming on assumptions.

## BA Lane and DEV Lane

### BA lane

Focus on:

- business goal
- primary actor or user scenario
- business rule
- scope and non-goal
- acceptance direction at the business level
- open questions blocking the choice of direction

### DEV lane

Focus on:

- repo context and existing baseline
- technical constraint, NFR, dependency
- integration point, data touchpoint, contract risk
- implementation risk and validation direction
- `greenfield|brownfield` signal

Rules:

- Default to starting with the `BA lane` when the goal or user value is unclear.
- If the first blocker is technical feasibility or the repo baseline, you may start with the `DEV lane`.
- Whichever lane leads, you must lock both the business and technical perspectives before recommending an option.

## Required Output

Produce a YAML artifact using the following schema:

```yaml
goal: ""
ba_lane:
  business_goal: ""
  user_scenarios: []
  business_rules: []
  scope_notes: []
  open_questions: []
dev_lane:
  repo_constraints: []
  technical_risks: []
  integration_points: []
  nfr_notes: []
  baseline_context: ""
options:
  - name: "Option A"
    summary: ""
    pros: []
    cons: []
    risks: []
recommended_option: ""
recommendation_reason: ""
validation_plan: []
notes_for_next_step: ""
```

## Normalize Output in the Workflow Note

If the output of this skill is saved as a `.md` note in the workflow chain:

- Use the step 5 template at `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema inside the `## Option Analysis` block.
- Keep the field names in the schema; do not rename fields when writing them into the note.
- `notes_for_next_step` must state clearly whether it is ready to move to `system-design` or whether any blocker requires going back to `s03`.

## Required Process

1. Read the repo's existing context and related artifacts.
2. Determine which lane should lead: `BA lane` or `DEV lane`.
3. Ask one question at a time; do not batch multiple questions in a single turn.
4. Clarify enough of the goals, rules and constraints to compare options seriously.
5. Propose at least 2 options when the problem has multiple reasonable directions.
6. If the problem is nearly obvious, still state at least 1 alternative or ruled-out direction.
7. Recommend the `smallest sufficient solution` rather than a larger option purely for future-proofing.
8. Present `recommended_option`, `recommendation_reason` and `validation_plan`.
9. Lock `notes_for_next_step` to hand off to `system-design`.

## Quality Rules

- Must not treat "this is simple" as a reason to skip comparing options.
- Must not pick an option just because it is familiar or easier to code.
- Must not let the `DEV lane` swallow the business intent of the `BA lane`.
- Must not let the `BA lane` dodge known technical constraints.
- Default to Vietnamese (with diacritics) for conversation and documentation.
- Text files must be saved as UTF-8.

## Decision Rules

- If the request touches multiple independent subsystems, propose splitting into multiple work items before deep brainstorming.
- If there is not enough data for a serious recommendation, reflect this clearly in `open_questions` or `validation_plan`.
- If the repo is `greenfield`, state clearly which decisions are `foundation-sensitive` for `system-design` to lock.
- If the repo is `brownfield`, prefer the smallest delta on the existing path.

## Completion Criteria

- Enough of both `BA lane` and `DEV lane` to support locking the direction.
- At least 2 options, or 1 primary option plus 1 ruled-out direction.
- A clear `recommended_option` and `recommendation_reason`.
- A `validation_plan`.
- `notes_for_next_step` sufficient to move to `system-design`.