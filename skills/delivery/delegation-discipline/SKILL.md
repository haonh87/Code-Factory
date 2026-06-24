---
language: en
name: delegation-discipline
description: Decide whether delegation or a subagent is allowed, then lock `owned_scope`, `owned_paths`, `merge path`, and `verify path` for independent tasks. Use after `s06 Task Plan` when you want to parallelize but must still keep ownership clear and not bypass review/verify.
---

# Delegation Discipline

> Vietnamese: SKILL.vi.md

Decide whether execution should stay `agentic`, move up to `subagent` or `multi_agent`, or fall back to `sequential_multi_role`, based on the true independence of the task.

<HARD-GATE>
Do not use this skill before `s06 Task Plan` is clear enough.

Do not enable delegation just because you want to parallelize.

If any of `owned_scope`, `owned_paths`, `merge_path`, or `verify_path` is unclear, the recommendation must not be `SUBAGENT` or `MULTI_AGENT`.
</HARD-GATE>

## When To Use

- When you want to split a worker or subagent for part of implementation or verify.
- When the scope touches many modules but ownership can be split clearly.
- When you need to decide `agentic`, `subagent`, `multi_agent`, or `sequential_multi_role` at `s07-s08`.
- When you suspect the task has ownership overlap or an unclear handoff path.

## Out Of Scope

- Does not replace `task-breakdown-planner`; this skill uses the task plan as input and does not create a new plan.
- Does not replace `review-discipline` or `testing`.
- Does not replace the runtime orchestrator's governance.
- Does not spawn workers or subagents on its own; this skill only locks the decision and guards.

## Minimum Input

- `delegation_target`
- `planning_track`
- `task_plan`
- `candidate_tasks`
- `repo_context`
- `constraints`

`candidate_tasks` should state at least:

- which task or batch can be split
- the expected `owned_scope`
- the expected `owned_paths`
- the expected merge path and verify path

## Required Output

Emit a YAML artifact using the following schema:

```yaml
delegation_target: ""
planning_track: quick|full|enterprise
execution_mode_recommendation: AGENTIC|SUBAGENT|MULTI_AGENT|SEQUENTIAL_MULTI_ROLE
independence_checks:
  owned_scope_clear: PASS|FAIL
  owned_paths_clear: PASS|FAIL
  merge_path_clear: PASS|FAIL
  verify_path_clear: PASS|FAIL
worker_assignments:
  - role: ""
    task: ""
    owned_scope: []
    owned_paths: []
    outputs_expected: []
merge_strategy: []
verify_strategy: []
blocked_reasons: []
coordination_guards: []
notes_for_execution: ""
```

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:

- Use the step 7 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Implementation Notes` block.
- If the note has a block or frontmatter about execution topology, you may cross-link from there instead of repeating the prose.

## Required Process

1. Read the `task_plan` and identify the `candidate_tasks` that can be split.
2. Run `independence_checks` for each delegation direction.
3. If any check fails, fall back to `AGENTIC` or `SEQUENTIAL_MULTI_ROLE`.
4. Only create `worker_assignments` when the task is truly independent.
5. Record `merge_strategy` and `verify_strategy` before closing the recommendation.
6. Record `coordination_guards` to prevent drift, conflict, or verify gaps.

## Quality Rules

- `quick` defaults toward `AGENTIC`.
- `SUBAGENT` and `MULTI_AGENT` must not be used when `owned_paths` overlap strongly.
- `worker_assignments` must not be vague like "handle the rest".
- `verify_strategy` must be enough to know who is responsible for concluding the final evidence.
- Default to writing and communicating in English.
- Text files must be stored as UTF-8.

## Decision Rule

- `AGENTIC` is the safe default when the task is small or tightly coupled.
- `SUBAGENT` fits when there is only one lane or one independent worker to split out, but the merge path and verify path are clear.
- `SEQUENTIAL_MULTI_ROLE` fits when you need multiple perspectives but do not yet meet the conditions for parallel workers.
- `MULTI_AGENT` only fits when there are two or more `independent task` lanes, with reasonably disjoint `owned_scope` or `owned_paths`, a clear `merge_path`, and a clear `verify_path`.
- If the verification owner is unclear, the recommendation must not be `SUBAGENT` or `MULTI_AGENT`.
- If the task just finished exploring context and the boundary is not stable, keep `AGENTIC`.

## Completion Conditions

- A clear `execution_mode_recommendation`.
- `independence_checks` with a readable verdict.
- `worker_assignments`, `merge_strategy`, `verify_strategy` when the recommendation is not `AGENTIC`.
- `blocked_reasons` or `coordination_guards` sufficient for the implementer to decide the next step.