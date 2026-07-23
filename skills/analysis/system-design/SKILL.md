---
name: system-design
description: Locks the technical approach in a DEV-led direction, inheriting option thinking, failure modeling, compatibility, rollback, and observability discipline from Superpowers while preserving the repo's governance, traceability, and architecture follow-up. Use when a business goal and acceptance criteria already exist and you need to lock boundary, contract, data flow, and validation plan before implementation.
language: en
---

# System Design

> Vietnamese: SKILL.vi.md

Lock in a technical approach clear enough to move on to task planning without having to re-infer the boundary during implementation.

<HARD-GATE>
Must not write production code, must not scaffold a project, and must not use this skill to backfill design after implementation has already happened.

If the option analysis is insufficient, or the request lacks important context, return to `brainstorming` or the previous step instead of forcing the approach to close.

A hotfix or urgent change is not a reason to skip `failure_modes`, `compatibility_impact`, `rollback_impact`, or `observability_hooks`; they may only be trimmed to the minimum safe level.
</HARD-GATE>

## When to Use

- When a usable business goal and acceptance criteria already exist.
- When you need to choose a technical approach among several technical directions.
- When the change touches API, data, data flow, integration, or component boundary.
- When the change carries compatibility risk, rollback risk, or requires observing production behavior after rollout.
- When you need to decide whether to bring in a specialized architecture skill.

## Out of Scope

- Does not replace requirement analysis or product thinking.
- Does not replace task planning.
- Does not directly edit production code.
- Does not avoid specialized skills when a specialized boundary needs deeper locking.

## Default Roles

- `developer` is the primary owner of this skill.
- `ba` is the supporting role, keeping business-rule trace, scope guard, and contract expectation.
- If the scope touches UX, data, or deep runtime, pull in the corresponding specialized skill instead of cramming everything into one shared note.

## Minimum Inputs

- `business_goal`
- `acceptance_criteria`
- `repo_context`
- `tech_constraints`
- `nfr_constraints`
- `delivery_context`
- `option_analysis` or prior brainstorming decisions, if any

If acceptance criteria are missing or the main constraints are unclear, surface that before locking the design.

## Mandatory Technical Lane

Beyond boundary and contract, this repo's technical lane must also lock the following four perspectives:

- `failure_modes`: how it fails, what the impact is, and which guardrail blocks it ahead of time.
- `compatibility_impact`: whether API, schema, consumer, migration order, or legacy behavior are affected.
- `rollback_impact`: how to roll back, where rollback is blocked, and whether roll-forward-only is required.
- `observability_hooks`: which log, metric, trace, alert, or smoke signal confirms the change is running correctly.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
design_problem: ""
business_rule_trace: []
design_options:
  - name: ""
    summary: ""
    pros: []
    cons: []
    risks: []
rejected_options:
  - name: ""
    reason: ""
recommended_design: ""
recommendation_reason: ""
component_changes: []
data_flow: []
interface_changes: []
failure_modes:
  - scenario: ""
    impact: ""
    guardrail: ""
compatibility_impact: []
rollback_impact: []
observability_hooks: []
constraints_applied: []
validation_plan: []
specialized_followups:
  - skill: ""
    reason: ""
notes_for_next_step: ""
```

## Normalizing Output in the Workflow Note

If this skill's output is persisted as a `.md` note in the workflow chain:

- Use the step 5 template at `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema inside the `## Main Artifact` block.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.
- If there are specialized follow-ups, record them under `## Architecture Details` or in a subsidiary artifact linked from the canonical note.

## Mandatory Process

1. Restate `design_problem` from the goal, AC, and repo baseline.
2. Check the incoming `option_analysis`: if `brainstorming` already produced a `recommended_option` with a clear reason and it still fits current constraints, consume it directly into `design_options`/`recommended_design`/`recommendation_reason` — do not re-run the comparison ritual here. Only fall back to generating the comparison yourself (propose at least 2 options if the problem has multiple reasonable directions, or state at least 1 alternative/rejected direction if the direction is nearly obvious) when `option_analysis` is missing, weak, or no longer fits; in that case, prefer returning to `brainstorming` unless the gap is small enough to close inline.
3. Apply the `smallest sufficient solution` rule.
4. Choose the `recommended_design` and state the `recommendation_reason`.
5. Record `rejected_options` to clarify why the remaining directions were not chosen.
6. Enumerate `component_changes`, `data_flow`, and `interface_changes`.
7. Model `failure_modes`, `compatibility_impact`, `rollback_impact`, and `observability_hooks`.
8. Record `business_rule_trace` to ensure the design does not drift from the original requirement.
9. If it touches a deep boundary, open the corresponding `specialized_followups`.
10. Record `validation_plan` and `notes_for_next_step` to hand off to `task-breakdown-planner`.

## Quality Rules

- Do not lock an approach just because it is familiar.
- Do not introduce new abstraction, service, framework, or boundary "in case it is needed later."
- If a larger option is chosen, state clearly why the smaller option is insufficient.
- `business_rule_trace` must not be empty when the scope involves important business rules, contracts, or acceptance.
- If the scope touches a public contract, `compatibility_impact` must not be left empty.
- If the scope involves a real rollout, `rollback_impact` and `observability_hooks` must not be left empty.
- Default writing and exchange in Vietnamese with diacritics.
- Text files must be saved as UTF-8.

## Decision Rules

- Prefer the option that meets acceptance criteria with appropriate complexity.
- If a faster option increases operational or compatibility risk, state it clearly.
- If a change concerns a public interface, it must go into `interface_changes`.
- If a change touches legacy data, schema, or consumers, describe an explicit `compatibility_impact`.
- If the rollout cannot be cleanly rolled back, record `rollback_impact` as roll-forward-only instead of assuming a rollback exists.
- If production behavior has no observable signal fast enough, add `observability_hooks` before considering the design ready.
- If the focus is a backend domain boundary, use `domain-architecture`.
- If the focus is a frontend module, route ownership, state ownership, or import boundary, use `frontend-architecture`.
- If the focus is screen behavior, interaction, responsive rules, or visual constraints, use `frontend-experience-design`.
- If the focus is schema, query patterns, or migration safety, use `database-design`.
- If the focus is packaging, runtime deploy, or release flow, use `deployment-devops`, `containerization-packaging`, `platform-runtime-deployment`, or `ci-cd-release` as needed.

## Completion Criteria

- A clear `recommended_design` and `recommendation_reason`.
- `component_changes`, `data_flow`, and `interface_changes` sufficient for planning.
- `failure_modes`, `compatibility_impact`, `rollback_impact`, and `observability_hooks` at a level appropriate to the scope.
- A `business_rule_trace`.
- A `validation_plan`.
- `specialized_followups` when the boundary needs deeper locking.