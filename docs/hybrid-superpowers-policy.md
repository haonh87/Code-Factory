---
language: en
---

# Hybrid Policy: Codex Workflow Chain + Superpowers

> Vietnamese: hybrid-superpowers-policy.vi.md

This document defines the hybrid policy between the repo's workflow backbone and the execution discipline of `obra/superpowers`.

Reference date: `2026-04-18`.

For a quick decision on whether to enable `TDD`, `worktree`, `subagent`, and `review mode`, see:
- `docs/hybrid-superpowers-decision-matrix.md`

## Objectives

- Keep `codex-workflow-chain` as the source of truth for delivery.
- Borrow the strongest parts of Superpowers at the execution layer.
- Avoid mixing the two workflows as peer systems.
- Raise implementation quality without losing `governance`, `DoR`, `DoD`, `SDD`, and the `work-item protocol`.

## Multi-Block Prompt Model

The current hybrid model should be deployed as multiple prompt blocks, not by cramming every rule into a single file.

- `Authority layer`: `AGENTS.global.md`
- `Entry router`: skill `workflow-governance-router`
- `Workflow backbone`: skill `codex-workflow-chain`
- `Step skills`: skills in `analysis`, `architecture`, `delivery`, `guardrails`, `obsidian`
- `Runtime enforcement`: `workflow-bundle`, validator, capability control, and support policies

Reading rules:

- `Authority layer` fixes hard rules, conflict resolution, and safe defaults.
- `Entry router` is the block that must run first to decide the current step, delivery context, missing gates, and implementation permission.
- `Workflow backbone` holds the `s01 -> s08` state machine; the entry router and step skills are not allowed to create their own workflows.
- `Step skills` may only be activated after the entry router has routed to the correct step.
- `Runtime enforcement` carries the evidence and capability-control role; it does not replace the governance prompt but is the enforcement layer.

## Position Of This Document

This document is `supplemental policy`.

- It does not replace `policies/codex/AGENTS.global.md`.
- It does not replace `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`.
- It does not replace `project-context/` or the `work-item protocol`.
- It answers one question only: when using the repo's workflow, which parts of Superpowers may be enabled, at which step, and at what level.

## Foundational Rules

1. The primary workflow is always:
   `s01 Clarify -> s02 Business Goal -> s03 Open Questions -> s04 Acceptance + DoR -> s05 Technical Approach -> s06 Task Plan -> s07 Implement -> s08 Verify + DoD`
2. `Superpowers` may only be used as an `execution pack`; it must not replace the eight-step backbone.
3. `Superpowers` must not be used to bypass `s04` or `s08`.
4. `Spec/Design Before Code` is a hard gate:
   you must not enter `s07` before `s04`, `s05`, and `s06` are sufficiently qualified.
5. `Disciplined Brainstorming` is the quality gate of `s05`:
   you must not lock an approach without `option analysis` at an appropriate level.
6. `Prefer the Smallest Sufficient Solution` is the approach-selection rule of `s05`:
   if a smaller option is already the `smallest sufficient solution`, do not pick a larger option solely for hypothetical needs.
7. `Execution-Oriented Planning` is the quality gate of `s06`:
   you must not enter implementation with a task plan that is still vague or full of placeholders.
8. `TDD for Behavior Change` is the execution rule of `s07`:
   bug fixes, feature behavior, validation rules, contract changes, and refactors with material regression risk must prioritize tests before code.
9. `Worktree for Large or Risky Changes` is the workspace-isolation rule of `s07`:
   `enterprise`, long-running changes, many boundaries/files, or high risk must prefer a separated workspace.
10. `Review Early, Don't Wait Until the End` is the review rule of `s07`:
   review for risky batches/tasks or important parts must happen during implementation, not be pushed entirely to `s08`.
11. `Two-Tier Review` is the review-order rule of `s07`:
   review must check `spec compliance` first, then `code quality`.
12. `Subagents Only for Independent Tasks` is the delegation rule of `s07`:
   only spin up a worker when the task plan, ownership, merge path, and verify path are clear enough.
13. `Do Not Self-Declare Done` is the conclusion rule of `s08`:
   without a `DoD` verdict, the work is not complete, even if implementation or review is finished.
14. `Branch/Worktree Finalized Only After Verify` is the execution-closure rule of `s08`:
   cleanup, close, remove, or merge is only valid after a clear `DoD` verdict in `s08`.
15. `Safe Default` is the fallback rule of the workflow:
   when not sufficiently confident, choose `full`, do not enable `subagent` carelessly, do not open new boundaries carelessly, and do not treat a gate as already passed.
16. `governance`, `SDD`, `work-item protocol`, `planning_track`, and `verification_owner` still follow this repo's rules.
17. If there is a conflict between this policy and the repo's foundational policy, the repo's foundational policy wins.

## Components Imported From Superpowers

The following parts may be used in the hybrid model:

- `brainstorming`
- `writing-plans`
- `using-git-worktrees`
- `test-driven-development`
- `subagent-driven-development`
- `requesting-code-review`
- `finishing-a-development-branch`

These parts are understood as follows:

- `brainstorming`: a pattern of asking questions and forcing clarity on the solution before coding
- `writing-plans`: a pattern for writing an execution-oriented task plan
- `using-git-worktrees`: a pattern for isolating the workspace for risky or long-running changes
- `test-driven-development`: the `Red -> Green -> Refactor` pattern
- `subagent-driven-development`: a pattern for delegating workers by independent task
- `requesting-code-review`: a pattern for early, multi-round review
- `finishing-a-development-branch`: a pattern for closing a branch after verify

## Parts Not Imported Verbatim

The following rules must not be imported verbatim from Superpowers:

- Do not turn `brainstorming` into a workflow that replaces `s01-s05`.
- Do not require every work item to use a `worktree`.
- Do not require every task to have its own subagent.
- Do not apply `TDD` as an absolute rule for `docs-only`, `config-only`, or changes that produce no production behavior.
- Do not replace `DoD` with a review pass.

## Hybrid Matrix By Planning Track

| Track | Brainstorming style | Writing-plans style | Worktree | TDD | Subagent per task | Review mode |
|---|---|---|---|---|---|---|
| `quick` | `lightweight` | `lightweight` | `optional` | `required` for behavior change | `off` by default | `self` + at least 1 review before leaving `s07` |
| `full` | `standard` | `standard` | `recommended` | `required` for behavior change | `optional` when task is independent | review by batch or risky task |
| `enterprise` | `standard` | `strict` | `mandatory` | `required` for behavior change | `conditional` but with clear ownership | `independent` and a clear verify owner |

How to read the table:

- `lightweight`: apply the spirit; do not open a separate phase or artifact unless needed
- `standard`: apply clearly at the corresponding step and reflect it in the step's artifact
- `strict`: apply as a mandatory gate before moving to the next step
- `conditional`: enable only when the execution-runtime entry condition is met

## Gate Into Code

To begin `s07 Implement`, at minimum all three conditions must hold:

- `s04` has measurable acceptance criteria and a clear `DoR`
- `s05` has a technical approach sufficient to lock boundaries and a validation plan
- `s06` has a task plan sufficient to know the execution order and verify path

Rule by track:

- `quick`: shorter artifacts are allowed, but `s05` or `s06` must not be skipped
- `full`: the design and task plan must be written clearly in the corresponding step artifacts
- `enterprise`: treat this as a hard gate; if any of the three is missing, execution must be blocked

Rule under SDD:

- if the work item runs under `SDD`, code may only start when `spec` is in `approved|frozen` state
- if the behavior must deviate from spec, open a `spec-change` or `governance-exception` before implementing

Exception path:

- use only when there is a genuine emergency
- record the exception or waiver per the repo's rules
- do not silently skip and then backfill documentation as if there had been no deviation

## Brainstorming Gate

To lock `s05 Technical Approach`, at minimum:

- the objective to solve is clear
- `option analysis` at an appropriate level exists
- one recommended direction exists, and it is the smallest sufficient solution within the current scope
- what needs to be verified before or during implementation is stated

Rule by track:

- `quick`: short brainstorming is allowed, but at least one alternative or discarded direction must be stated
- `full`: there should be at least two clear options if the problem is not trivial
- `enterprise`: treat brainstorming as a hard gate of `s05`; without `option analysis`, do not lock the approach

If data is insufficient:

- return to `s03 Open Questions`
- do not force an approach just to keep moving
- do not expand the design solely for hypothetical future needs

## Task Plan Gate

To begin `s07 Implement`, `s06 Task Plan` must at minimum:

- state the main touchpoints or `owned_scope`
- have a clear execution order or dependency
- have a `verify path` sufficient for each task or batch
- have a review or governance checkpoint when the scope requires it

Rule by track:

- `quick`: the task plan may be short, but it must still state the main touchpoints or `owned_scope`, a short order, and the main verify method; add a review/governance checkpoint if the scope requires it
- `full`: there should be main files/paths or `owned_scope`, small tasks, clear order/dependency, and a clear `verify path`
- `enterprise`: treat the execution-oriented task plan as a hard gate; missing main touchpoints, order/dependency, `verify path`, or a required checkpoint means implementation is blocked

Placeholders such as the following are not accepted:

- `handle edge cases`
- `add appropriate validation`
- `write tests`
- `fix the related part`

unless they state exactly what will be touched and how it will be verified

## Hybrid Matrix By Work Item Type

| `work_item_type` | TDD | Worktree | Early review | Subagent |
|---|---|---|---|---|
| `BUG` | `required` if fixing behavior | `optional` for quick, `recommended` for full, `mandatory` for enterprise | `required` | `optional` |
| `FEATURE` | `required` if adding production behavior | `recommended` | `required` | `optional` or `conditional` |
| `CHANGE` | `required` if changing contract or behavior | `recommended` | `required` | `optional` |
| `REFACTOR` | `required` if material regression risk | `optional` or `recommended` depending on scope | `required` | `optional` |
| `RESEARCH` | `not_required` | `not_required` unless a separate prototype exists | `optional` | `off` by default |

## Policy By Step

### `s01 Clarify`

Hybrid objective:

- use `brainstorming`-style questioning to force clarity on requirements, scope, and constraints
- do not open a long design if the request is very small

Rules:

- `MUST`: clarify requirements in the probing-question style of `brainstorming`
- `MUST NOT`: write code or open an implementation path at this step
- `SHOULD`: record which boundaries are still unclear and should move to `s03`

### `s02 Business Goal`

Hybrid objective:

- keep the business intent short and easy to approve
- prevent technical discussion from swallowing the business objective

Rules:

- `MUST`: lock user value, success metrics, and non-goals
- `SHOULD`: present it short, quick to read, easy to approve
- `MUST NOT`: turn this step into a technical approach

### `s03 Open Questions`

Hybrid objective:

- use the spirit of `brainstorming` to surface real blockers
- do not allow the agent to guess unclear parts

Rules:

- `MUST`: every material open question must have an owner or a path to resolution
- `MUST`: policy gaps or governance blockers must be stated clearly
- `MUST NOT`: proceed to `s05` if a material blocker has no owner or if an assumption has been accepted

### `s04 Acceptance + DoR`

This is the most important gate in the hybrid model.

Rules:

- `MUST`: lock measurable acceptance criteria
- `MUST`: lock `DoR`
- `MUST`: reflect `governance checks` and `spec-freeze` when `SDD` applies
- `MUST NOT`: enter `s07` before `s04` has produced a clear `DoR` verdict
- `MUST NOT`: treat `s04` as sufficient to code if `s05` and `s06` do not have minimum artifacts

Hybrid import:

- use the Superpowers spirit that `spec/design must be approved before code`
- but the formal gate is the `DoR` of this workflow, not merely a single user "go"

### `s05 Technical Approach`

Hybrid objective:

- borrow `brainstorming` to compare options and uphold `YAGNI/DRY`
- do not over-engineer before `s06`

Rules:

- `MUST`: state options and trade-offs when more than one reasonable direction exists
- `MUST`: lock impacted boundaries and a validation plan
- `MUST`: prefer the smallest sufficient solution within the current scope; if a larger option is chosen, state clearly why the smaller one is insufficient
- `MUST NOT`: jump into detailed production code at this step
- `MUST`: leave the design clear enough that `s06` can split tasks and `s07` can implement without guessing
- `MUST NOT`: lock an approach based on feeling or "muscle memory"
- `MUST NOT`: open a new abstraction or boundary merely to anticipate hypothetical needs
- `MUST`: even when the direction is nearly obvious, state at least one alternative or discarded direction briefly

### `s06 Task Plan`

This is the step with the strongest import from `writing-plans`.

Foundational rules:

- `MUST`: tasks are traceable to a requirement or AC
- `MUST`: state the main touchpoints or `owned_scope` when determinable
- `MUST`: have a clear execution order or dependency
- `MUST`: have a verify path
- `MUST`: have a review checkpoint when the scope requires it
- `MUST`: be clear enough that `s07` does not need to reinvent the design
- `MUST NOT`: use placeholders that force the implementer to guess concrete actions

Hybrid rules:

- `quick`:
  the plan may be short but must still state the main touchpoints or `owned_scope`, a short order, and the main verify method
- `full`:
  tasks should be small, with main files/paths or `owned_scope`, clear order/dependency, and a clear verify path
- `enterprise`:
  the task plan must be execution-oriented, with clear ownership, clear order/dependency, a clear verify owner, and clear review checkpoints

When using the `writing-plans` style:

- `SHOULD`: state new files and modified files
- `SHOULD`: state the main verify commands
- `SHOULD`: split tasks into units small enough to review
- `MUST NOT`: write placeholder plans such as `add appropriate validation`, `handle edge cases`, `write tests`

### `s07 Implement`

This is the step with the strongest import from the Superpowers execution pack.

Entry gate of `s07`:

- `MUST`: only begin once `s04`, `s05`, `s06` have the minimum outputs per the rules above
- `MUST NOT`: use "small change" as a reason to skip design or task plan entirely
- `MAY`: keep design and task plan very short for `quick`, but they must be present and sufficient

Capabilities that may be enabled:

- `using-git-worktrees`
- `test-driven-development`
- `subagent-driven-development`
- `requesting-code-review`

#### Worktree Rule

- `enterprise`: `MUST` use a `worktree`
- `full`: `SHOULD` use a `worktree` for `large or risky changes`
- `quick`: `MAY` skip `worktree` if the change is small, few files, done in one session, and low conflict risk
- if a change falls into the should-or-must `worktree` category and a `worktree` is still not used, the implementation note must state the reason
- `worktree` does not replace review, verify, or `DoD`

#### TDD Rule

`TDD` is mandatory when:

- adding production feature behavior
- fixing a behavior bug
- changing a contract or validation rule
- refactoring with material regression risk

`TDD` is not required when:

- only editing docs
- only renaming or reformatting without behavior change
- only changing metadata or workflow artifacts

If strict `TDD` is blocked by legacy, harness, or the test environment, the implementation note must state the reason and an alternative `verify path`.

#### Subagent Rule

- only enable `subagent-driven-development` after `s06` is sufficiently clear
- only enable for `independent tasks`
- an `independent task` must at minimum have a relatively separate `owned_scope` or `owned_paths`, a clear `merge path`, and a clear `verify path` or `verification_owner`
- do not enable for small, tightly coupled tasks, tasks that just finished exploring context, or tasks with strongly overlapping ownership

#### Review Rule Within `s07`

- `quick`: at least one review pass of the implementation before leaving `s07`
- `full`: early review after each logic batch or risky task, do not push it all to `s08`
- `enterprise`: early two-tier review for the main parts within `s07`

Mandatory review order:

1. `spec compliance`
2. `code quality`

`review` must not be treated as a substitute for `testing`.

### `s08 Verify + DoD`

Hybrid objective:

- keep the repo's `DoD` and `governance compliance`
- borrow the spirit of `finishing-a-development-branch` to close only when evidence is sufficient

Rules:

- `MUST`: compare the implementation against AC, spec, checklist, and review findings
- `MUST`: state which tests ran, which scans ran, which reviews passed
- `MUST`: conclude `DoD` clearly
- `MUST`: declare `done` only after `DoD` has been concluded
- `MUST`: if using a `branch` or `worktree`, only finalize `cleanup`, `close`, `remove`, or `merge` after `s08` has a clear `DoD` verdict
- `MUST NOT`: self-declare `done` merely because of `review pass`, local `test pass`, `code done`, `merge done`, or a clean `worktree`
- `MUST NOT`: treat a clean `branch`, clean `worktree`, or reviewed diff as sufficient signal to finalize early
- `enterprise`: requires an independent verify owner or audit path

## Safe Default

- if unsure which `planning_track`: choose `full`
- if unsure whether a gate has passed: treat it as not passed
- if unsure whether a `subagent` is needed: do not use one
- if unsure whether to open a new boundary, abstraction, or service: do not open one if the existing path still meets the need
- if unsure whether a `worktree` is needed: use one if the change shows signs of being a `large or risky change`
- if unsure whether `TDD` is needed: use it if production behavior is affected
- if unsure which review level: start with `targeted review`
- `safe default` is a fallback rule, not a reason to skip `DoR`, `DoD`, `review`, `verify`, or `governance`

## Detailed TDD Rule

Standard cycle:

1. write the test for the desired behavior
2. run it to see the test fail for the right reason
3. write the minimum code to pass
4. run the test again to see it pass
5. refactor as needed

Application rules:

- `MUST`: for a bug fix, the test must reproduce the bug before the fix
- `MUST`: for feature behavior, the test must describe the desired behavior before implementation
- `MUST`: for a validation rule or contract change, the test must lock the desired behavior or contract before implementation
- `MUST`: for a refactor with material regression risk, the test must lock the behavior to preserve before changing structure
- `MUST`: if strict `TDD` is blocked, the implementation note must state the reason and an alternative `verify path`
- `SHOULD`: use tests close to real behavior; avoid over-mocking
- `MUST NOT`: write production code first and add tests later while still calling it `TDD`

## Detailed Review Rule

Review is split into three levels:

- `self review`: the implementer checks their own work before handoff
- `targeted review`: review for a specific task or batch
- `independent review`: review by a different owner or the verification owner

Mapping by track:

- `quick`: `self review` + final targeted review when needed
- `full`: `self review` + targeted review by batch or risky task
- `enterprise`: `self review` + independent review for the main parts

Closing rules:

- do not push all review to `s08`
- early review prioritizes batches, risky tasks, and important logic/contract parts
- every review within `s07` must follow the order `spec compliance -> code quality`
- `s08` is still the final verify-conclusion step, not a place to replace all review skipped in `s07`

Severity levels:

- `critical`: must fix before continuing
- `important`: must fix or have explicit approval before continuing
- `minor`: may be noted but must not be hidden

## Subagent And Execution Topology Rule

`Superpowers` leans toward `fresh subagent per task`.
This hybrid policy does not default to that.

Rules:

- `agentic` is still the default mode
- only escalate to `multi_agent` or a per-task subagent pattern when the task is an `independent task`
- if the conditions above are not met, fall back to `agentic` or `sequential_multi_role`

## Command And Artifact Rule

This policy creates no new commands.

The source-of-truth artifacts remain:

- `work-items/`
- `changes/`
- `product-specs/`
- `project-context/`

When using patterns from Superpowers:

- every formal conclusion must still return to the current workflow's standard artifacts
- `docs/superpowers/...` must not be used as the primary source of truth in this repo

## Prohibited Rules

- do not bypass `s04` to enter implementation
- do not bypass `s08` to self-declare done
- do not use `review passed` in place of `DoD`
- do not use `TDD` as a slogan when there is no failing test first
- do not enable subagents merely to parallelize
- do not let Superpowers rules override `governance`, `work-item protocol`, or `planning_track`

## Recommended Presets

### Preset `quick`

- keep the repo backbone
- borrow light `brainstorming` at `s01-s05`
- borrow `TDD` at `s07` if the change has behavior
- at least one review pass within `s07`
- do not default to worktree or subagent

### Preset `full`

- keep the repo backbone
- use `writing-plans` more explicitly at `s06`
- use `TDD` at `s07` for behavior change
- review by batch or risky task
- use `worktree` when the change is large or risky

### Preset `enterprise`

- keep the repo's governance/protocol/sign-off intact
- use `writing-plans` strict at `s06`
- worktree is the default
- independent review at `s07-s08`
- only enable subagents when the task is an `independent task`

## Quick Mnemonics

- this repo keeps `backbone + governance + source-of-truth`
- Superpowers adds power at `planning + implementation + review discipline`
- `DoR` decides when code is allowed
- `DoD` decides when the work can close

## Related Documents

- `policies/codex/AGENTS.global.md`
- `docs/hybrid-superpowers-decision-matrix.md`
- `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`
- `skills/orchestration/codex-workflow-chain/references/execution-runtime.md`
- `skills/orchestration/codex-workflow-chain/references/adaptive-planning.md`
- `skills/orchestration/codex-workflow-chain/references/work-item-protocol.md`