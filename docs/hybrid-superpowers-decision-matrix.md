---
language: en
---

# Hybrid Superpowers Decision Matrix

> Vietnamese: hybrid-superpowers-decision-matrix.vi.md

This document is a quick decision aid for the hybrid policy between `codex-workflow-chain` and `Superpowers`.

For the full rules, see:
- `docs/hybrid-superpowers-policy.md`

For the original workflow contract, see:
- `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`

## Objectives

- Decide quickly whether to enable `TDD`, `worktree`, `subagent`, or `review mode`.
- Keep a single `s01 -> s08` backbone.
- Avoid re-litigating policy every time a new work item opens.

## How To Use

1. Determine the `planning_track`.
2. Determine the `work_item_type`.
3. Determine whether the change produces `production behavior`.
4. Determine whether the scope allows clearly separated ownership.
5. Use the tables below to enable or disable a capability.

## Matrix A: Gate Before Locking The Approach

| Condition | Decision |
|---|---|
| the goal or main constraint is unclear | `BLOCK approach` |
| no `option analysis` at an appropriate level | `BLOCK approach` |
| a smaller option is already the `smallest sufficient solution` but a larger option is chosen without a specific reason | `BLOCK approach` |
| multiple reasonable directions exist but trade-offs are not stated | `BLOCK approach` |
| the recommended direction is the smallest sufficient solution within the current scope | `ALLOW approach` |
| `quick` and there is 1 main direction + 1 briefly discarded direction | `ALLOW approach` |
| `full/enterprise` and there is `option analysis` + a clear recommendation | `ALLOW approach` |

Closing rules:

- do not jump straight into a technical approach based on feeling
- if there is not enough data to brainstorm, return to `s03`
- short brainstorming is allowed; skipping brainstorming entirely is not
- if a smaller option is already the `smallest sufficient solution`, do not expand the design solely for hypothetical needs

## Matrix B: Gate Before Code

| Condition | Decision |
|---|---|
| `s04` has no acceptance criteria or `DoR` is unclear | `BLOCK code` |
| `s05` has no minimum technical approach | `BLOCK code` |
| `s06` has no minimum task plan | `BLOCK code` |
| `s06` does not state the main touchpoints or `owned_scope` | `BLOCK code` |
| `s06` does not state execution order or dependencies | `BLOCK code` |
| `s06` still has placeholders or no sufficient verify path | `BLOCK code` |
| `quick` but `s04-s06` exist in short form | `ALLOW code` |
| under `SDD` and spec is not `approved|frozen` | `BLOCK code` |
| a valid `spec-change` or `governance-exception` exists for an emergency | `ALLOW code with exception path` |

Closing rules:

- do not jump straight from clarify to implementation
- `s04 -> s05 -> s06 -> s07` is the standard path into code
- a small change may only shorten artifacts, not drop design or task plan entirely
- a task plan missing main touchpoints, order/dependency, with placeholders, or missing a verify path is treated as not ready

## Matrix 1: Choose Baseline By Track

| Signal | Track |
|---|---|
| one main boundary, small scope, light review | `quick` |
| a normal feature or change, a few tasks, clear verify needed | `full` |
| many boundaries, many roles, release risk, independent verify | `enterprise` |

## Matrix 2: Capability Baseline By Track

| Track | Brainstorming | Writing plans | Worktree | TDD | Review | Subagent |
|---|---|---|---|---|---|---|
| `quick` | `light` | `light` | `optional` | `required` if behavior changes | `self` + final review when needed | `off` by default |
| `full` | `standard` | `standard` | `recommended` | `required` if behavior changes | `targeted` by batch or risky task | `optional` |
| `enterprise` | `standard` | `strict` | `mandatory` | `required` if behavior changes | `independent` | `conditional` |

## Matrix 3: TDD Decision

| Condition | Decision |
|---|---|
| fixing a behavior bug | `MUST use TDD` |
| adding production feature behavior | `MUST use TDD` |
| changing a validation rule or contract | `MUST use TDD` |
| refactoring with material regression risk | `MUST use TDD` |
| docs-only edits | `DO NOT require TDD` |
| rename, format, or metadata only | `DO NOT require TDD` |
| workflow artifact change only | `DO NOT require TDD` |

Closing rules:

- if strict `TDD` is blocked, record the reason and an alternative `verify path` in the implementation note
- `TDD` means a failing test exists first, then code is written to pass

## Matrix 4: Worktree Decision

| Signal | Decision |
|---|---|
| `enterprise` track | `MUST use worktree` |
| large or risky change | `SHOULD use worktree` |
| small bug, quick fix, few files, done in one session | `MAY skip worktree` |

Closing rules:

- `large or risky change` includes at minimum: longer than one session, touching many boundaries or many files with material conflict risk, or high merge/branch/release risk
- if a change falls into the should-or-must `worktree` category and `worktree` is still skipped, there must be a clear reason
- `worktree` does not replace review or verify
- once a `branch/worktree` is in use, `cleanup`, `close`, `remove`, or `merge` is only valid after `s08` has a clear `DoD` verdict

## Matrix 5: Review Mode Decision

| Signal | Review mode |
|---|---|
| `quick` and low risk | `self review` + at least 1 review before leaving `s07` |
| `full` and medium risk | `targeted review` by batch |
| important logic, important contract, hard-to-read diff | `targeted review` mandatory |
| main parts in `enterprise` | `independent review` in two tiers |
| `enterprise` or high release risk | `independent review` |
| verification owner is separate | `independent review` preferred |

Default review order:

1. `spec compliance`
2. `code quality`

Closing rules:

- do not push all review to `s08`
- `full` and `enterprise` must review early for risky batches/tasks or important parts within `s07`
- every review within `s07` must follow the order `spec compliance -> code quality`
- review does not replace `testing` or `verify`

## Matrix 5B: Is The Task Plan Execution-Oriented Yet

| Condition | Decision |
|---|---|
| main touchpoints or `owned_scope` unclear | `NOT READY` |
| no clear execution order or dependency | `NOT READY` |
| no sufficient `verify path` | `NOT READY` |
| placeholders like `handle edge cases`, `add validation`, `write tests` without specifics | `NOT READY` |
| `quick` but has main touchpoints or `owned_scope` + short order + main verify | `READY` |
| `full/enterprise` and has main files/paths or `owned_scope` + order/dependency + verify path + checkpoint when needed | `READY` |

Closing rules:

- the plan must be enough that the implementer does not need to reinvent the design
- if the scope requires a review/governance checkpoint and the plan does not mention it, it is still `NOT READY`
- `writing-plans` in this hybrid prioritizes executability; it does not require full code inside the plan

## Matrix 6: Subagent Decision

| Condition | Decision |
|---|---|
| task plan is unclear | `DO NOT use subagent` |
| `owned_paths` or `owned_scope` strongly overlap | `DO NOT use subagent` |
| verification owner is unclear | `DO NOT use subagent` |
| `merge path` or handoff path is unclear | `DO NOT use subagent` |
| task is small and tightly coupled | `DO NOT use subagent` |
| task is an `independent task` | `MAY use subagent` |
| `enterprise` and multi-boundary but `independent tasks` can still be separated | `MAY use subagent` |

Closing rules:

- `agentic` is still the default mode
- only enable subagents after `s06`
- only enable subagents for `independent tasks`
- subagents must not bypass `review` or `verify`

## Matrix 7: Decision By Work Item Type

| `work_item_type` | TDD | Worktree | Review | Subagent |
|---|---|---|---|---|
| `BUG` | `MUST` if fixing behavior | `optional` to `mandatory` by track | `required` | `optional` |
| `FEATURE` | `MUST` if there is behavior | `recommended` | `required` | `optional` or `conditional` |
| `CHANGE` | `MUST` if changing contract or behavior | `recommended` | `required` | `optional` |
| `REFACTOR` | `MUST` if material regression risk | `optional` or `recommended` | `required` | `optional` |
| `RESEARCH` | `not required` | `not required` unless a separate prototype exists | `optional` | `off` by default |

## Matrix 8: Decision By Step

| Step | Superpowers capability enabled | Default level |
|---|---|---|
| `s01` | `brainstorming`-style question forcing | `ON` |
| `s02` | concise, easy-to-approve business intent | `ON` |
| `s03` | question forcing for blockers and assumptions | `ON`; if data is missing, block `s05` |
| `s04` | `spec approved before code` mindset | `ON`, but the real gate is `DoR` |
| `s05` | option thinking, `YAGNI/DRY`, smallest sufficient solution, disciplined brainstorming | `ON` and is the quality gate |
| `s06` | `writing-plans` style | `ON` from `full`, `light` at `quick` |
| `s07` | `worktree`, `TDD`, `subagent`, `requesting-code-review` | `ON` by signal |
| `s08` | `finishing-a-development-branch` mindset | `ON`, but the real verdict is `DoD` |

## Quick Formula

| If | Then |
|---|---|
| no sufficient `option analysis` | do not lock `s05` |
| a smaller option is already the `smallest sufficient solution` | pick the smaller option |
| task plan is not execution-oriented | do not enter `s07` |
| no `s04-s06` yet | do not enter `s07` |
| there is a behavior change | enable `TDD` |
| there is a `large or risky change` | enable `worktree` |
| the task is an `independent task` | consider `subagent` |
| there is a risky batch/task or an important diff | review early within `s07` |
| starting review in `s07` | check `spec compliance` first, then `code quality` |
| important diff or high release risk | raise `review mode` |
| not past `s08` | do not declare `done` |
| using `branch/worktree` and `s08` has no clear `DoD` verdict | do not cleanup/close/merge |

## Safe Default

| Case | Safe default |
|---|---|
| unsure whether a gate has passed | treat it as not passed and return to the corresponding step |
| unsure whether a subagent is needed | `do not use one` |
| unsure whether to open a new boundary or abstraction | `do not open one if the existing path still meets the need` |
| unsure whether a worktree is needed | `use one if the change shows signs of a large or risky change` |
| unsure whether TDD is needed | `use it if production behavior is affected` |
| unsure which review level | start with `targeted review` |
| unsure which track | choose `full` |

## Anti-Patterns

- using `review pass` in place of `DoD`
- locking a technical approach by feeling without `option analysis`
- opening a new abstraction, service, or boundary merely to anticipate hypothetical needs
- jumping from `s01-s03` to code without `s04-s06`
- using a placeholder task plan and still entering implementation
- pushing all review to `s08`
- reviewing `code quality` before locking `spec compliance`
- writing code first and adding tests later while still calling it `TDD`
- enabling subagents for non-independent tasks or overlapping ownership
- self-declaring `done` before `s08` has a `DoD` verdict
- cleanup, close, or merge of `branch/worktree` before `s08` has a clear `DoD` verdict
- using `quick` for changes with many boundaries or release risk
- skipping `worktree` in `enterprise` without a reason

## Operational Conclusion

Pragmatic defaults:

- start with `full`
- if unsure whether a gate has passed, treat it as not passed
- enable `TDD` if behavior is affected
- enable `worktree` if the change is a `large or risky change`
- only enable `subagent` once `s06` is good enough
- keep `DoR` at `s04` and `DoD` at `s08` as the real gates