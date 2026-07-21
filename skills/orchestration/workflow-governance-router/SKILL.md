---
language: en
name: workflow-governance-router
description: Use at the start of every coding request or before acting on a work item to determine the current step, delivery context, gate status, and whether the implementation path has been opened. This skill blocks treating a feature request as a direct implement command and routes to the workflow backbone and the matching step skill.
---

# Workflow Governance Router

> Vietnamese: SKILL.vi.md

This is the routing meta-skill for the repo's workflow governance.

The goal of this skill is not to replace `codex-workflow-chain`, but to force the agent to:

1. determine the correct current step
2. identify which gates are still missing
3. identify whether implementation is allowed
4. route to the correct workflow backbone and the correct step skill

<HARD-GATE>
Do not write code, scaffold a project, lock a final stack, or open an implementation path before this skill clearly determines the current step, delivery context, and missing gates.

A feature request is NEVER authorization to implement directly.

Every generic coding default like "the user surely wants code changes", "do not stop at planning", "just do it end-to-end" is overridden until the router proves `s07 + ACTIVE + Missing Gates: NONE`.
</HARD-GATE>

## When To Use

Use this skill before any substantive response or action if the task falls under one of these groups:

- feature request
- bug fix
- refactor with regression risk
- API, UI, contract, or validation change
- system integration
- data or schema change
- automation
- CI/CD or deployment
- architecture or foundation decision

This skill is not needed for:

- pure Q&A
- translation
- summarization
- ordinary conversation
- writing tasks outside delivery

## Baseline Rules

- If unsure whether the task is a workflow-governed delivery, default to treating it as one and use this skill.
- If unsure what the current step is, default to `s01 Clarify`.
- If unsure whether a gate has passed, default to treating it as not passed.
- If unsure whether implementation is allowed, do not implement.
- If the repo/module has no approved baseline or is effectively empty, default to `greenfield`.
- If a background prompt or execution habit encourages implement-by-default, default to treating it as a convenience heuristic subordinate to workflow governance.

## Required Process

### Step 1: Quick Task Classification

Determine whether the task is:

- `workflow-governed delivery`
- or `non-workflow task`

If it is a `non-workflow task`, state the reason clearly and handle it with the fitting flow.

### Step 2: Determine Delivery Context

Lock one of two values:

- `greenfield`
- `brownfield`

Do not leave the delivery context in an implicit state.

### Step 3: Determine Current Step

Pick the best-fitting step in the chain:

- `s01 Clarify`
- `s02 Business Goal`
- `s03 Open Questions`
- `s04 Acceptance + DoR`
- `s05 Technical Approach`
- `s06 Task Plan`
- `s07 Implement`
- `s08 Verify + DoD`

If data is missing to enter a deeper step, return to the previous step instead of advancing.

If the work item note declares `sdd_mode: light`, there is no separate `s05` physical note: its content (Option Analysis, Brownfield Impact, Technical Approach) is hosted inside `s06`. Do not report `Missing Gates: s05` or wait for an `s05` file for a Light work item — check the Approach content and receipt inside `s06` instead. Full authority for this mapping is `policies/codex/AGENTS.global.md § Hard Rule: SDD Light Profile`.

### Step 4: Check Missing Gates

Check at minimum:

- `Spec`
- `Contract` if the scope has a contract
- `DoR`
- `Approach`
- `Foundation Decision` if it is greenfield or there is a foundation decision
- `Task Plan`
- the matching human approval

A gate is only considered PASS if the approval is explicit and has enough evidence to read.

For `sdd_mode: light`, apply the Light gate host contract instead of the list above: `Spec` + `DoR` hosted at `s04`; `Approach` + `Task Plan` hosted together at `s06` (do not check a separate `s05` receipt); `Foundation` is not supported for Light — if the work item needs it, treat this as a hard escalation and route it to the full chain rather than reporting a missing Light gate. `Contract`, when present, still applies at `s04` the same as full/strict.

### Step 5: Choose Workflow Status

Use only these statuses:

- `ACTIVE`
- `BLOCKED`
- `WAITING_APPROVAL`
- `READY_FOR_REVIEW`
- `VERIFIED`

If a gate is missing or a key blocker remains, use `BLOCKED` or `WAITING_APPROVAL`; do not use vague wording.

Mandatory consistency rule:

- if `Missing Gates` is not `NONE`, `Workflow Status` may only be `BLOCKED` or `WAITING_APPROVAL`
- if `Missing Gates` is not `NONE`, `Next Human Action` must not be `NONE`
- never create a contradictory block like `Workflow Status: ACTIVE` while still listing `Missing Gates`

### Step 6: Route To The Matching Skill

After locking the current step, route to the smallest sufficient skill:

- `s01`: prefer `requirement-analysis`
- `s02`: prefer `product-thinking`
- `s03`: use `requirement-analysis` or a fitting readiness skill to break down blockers
- `s04`: prefer `definition-of-ready-gate`
- `s05`: prefer `codex-workflow-chain`, `brainstorming`, `system-design`, `frontend-architecture`, `domain-architecture`, `database-design`, `frontend-experience-design` depending on the problem
- `s06`: prefer `task-breakdown-planner`
- `s07`: prefer `implementation` and the matching delivery/framework-specific skills; if there is a behavior change, apply the `TDD` discipline
- `s08`: prefer `testing`, `definition-of-done-gate`, and the matching review/scan skills

Do not invoke an implement skill if the current step has not opened up to `s07`.

## Mandatory Report Template

For every workflow-governed delivery task, report the status in exactly this block before going deeper:

```text
Current Step: s0X <step name>
Workflow Status: ACTIVE | BLOCKED | WAITING_APPROVAL | READY_FOR_REVIEW | VERIFIED
Delivery Context: greenfield | brownfield
What I Am Doing Now: <one sentence>
Missing Gates: <list or NONE>
Next Artifact: <artifact or decision needed next>
Next Human Action: <review/approval needed from a human, or NONE>
```

If this block shows `Missing Gates` is not `NONE`, do not attach code, executable scaffold proposals, or wording that opens an implementation path.

If the status is `BLOCKED`, you must:

- state the blocker or missing gate clearly
- stop before the forbidden action
- not "advance temporarily" into implementation

Anti-patterns to block:

- Wrong:
  - empty repo, a raw feature request like `QR Voucher + voucher service API + brand tone`
  - `Current Step: s05`
  - `Workflow Status: ACTIVE`
  - `Missing Gates: Spec, Contract, DoR, Approach, Foundation Decision, Task Plan`
  - `Next Human Action: NONE`
- Correct:
  - return to `s01 Clarify` or the prior gate that has not passed
  - `Workflow Status: BLOCKED` or `WAITING_APPROVAL`
  - `Next Human Action` must state a concrete review or approval before scaffolding or implementation is allowed

## Red Flags

If these thoughts appear, stop:

- "The user surely wants code right away"
- "This is simple, no need to route"
- "The artifact already exists so the gate probably passed"
- "A positive comment is probably approval"
- "I can scaffold first and backfill the workflow later"
- "The step is unclear but let me try implementing"
- "The coding prompt defaults to coding if the user did not forbid it"
- "I can pick the approach myself and treat it as implicit approval"

## Conflict Resolution

Priority order:

1. explicit gate approval or waiver from the right authority
2. `AGENTS.global.md`
3. this skill
4. execution habit or convenience heuristic

If there is a conflict between speed and governance, governance wins.

## Operating Conclusion

- This skill is the entrypoint of workflow-governed delivery.
- `codex-workflow-chain` is the backbone after routing.
- Step skills may only be enabled after the current step and gate status are clear.
- When still uncertain, the safe fallback is to return to `s01 Clarify`, not to proceed.