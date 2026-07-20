---
language: en
name: implementation
description: Implement changes in a DEV-led way, inheriting the strong discipline of Superpowers such as bug repro first, hypothesis-driven debugging, TDD, minimal-delta, safe refactor, review early and no-done-before-verify, while still following the repo's governance, task plan and traceability. Use it when s04-s06 are ready and the implementation path has been opened.
---

# Implementation

> Vietnamese: SKILL.vi.md

Implement actual changes in the codebase following the locked design and task plan, focused on the smallest sufficient change and clear evidence for the verify step.

<HARD-GATE>
Do not start implementing if `DoR`, `Approach`, `Task Plan` or the implementation gate is not ready.

If the change is a `behavior change`, do not write production code before a failing test, unless there is a clear reason and a fallback verification path has been recorded.

For a bug fix, do not "fix by intuition" without `bug_repro_evidence` or at least a `hypothesis_log` + `debug_experiments` that are readable enough.

Do not self-declare `done` in this skill; the completion verdict is only valid at the verify step.
</HARD-GATE>

## When To Use

- When s04-s06 are ready to move into implementation.
- When adding a feature, fixing a bug, refactoring or adjusting accompanying config/doc within the approved scope.
- When the stack is React web or Next.js and the change touches server/client split, data fetching, context or loading paths, combine with `react-web-implementation`.

## Out Of Scope

- Does not self-change the business goal or acceptance criteria.
- Does not self-change a major technical approach without reporting back to the design step.
- Does not skip TDD for a behavior change just to go faster.
- Does not fix a bug by "guess the cause then patch" without leaving debug evidence.
- Does not replace final testing or DoD.

## Default Roles

- `developer` is the primary owner of this skill.
- `ba` is not the main execution role; if a business rule is ambiguous, report back or return to the right step instead of self-interpreting.
- `qc`, `devops`, `designer` can join review/evidence hooks by scope, but this skill remains `DEV-led`.

## Minimum Input

- `recommended_design`
- `task_breakdown`
- `coding_conventions`
- `files_in_scope`
- `constraints`
- `delivery_context`
- `change_type`

If the main files or modules to touch are not yet known, clarify them before editing in bulk.

## Required Output

Emit a YAML artifact per the following schema:

```yaml
recommended_design: ""
implementation_mode: FEATURE|BUGFIX|REFACTOR|HARDENING
tasks_completed: []
bug_repro_evidence: []
hypothesis_log:
  - assumption: ""
    status: CONFIRMED|REJECTED|OPEN
    evidence: ""
debug_experiments:
  - goal: ""
    action: ""
    result: ""
tdd_evidence:
  - behavior: ""
    failing_test: ""
    passing_test: ""
safe_refactor_notes: []
code_changes: []
doc_changes: []
config_changes: []
review_checkpoints: []
outputs_actual: []
known_limitations: []
follow_up_items: []
notes_for_testing: ""
```

## Normalize Output In Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:

- Use the step 7 template at `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Main Artifact` block.
- Keep field names in the schema verbatim; do not rename fields when writing into the note.
- If there is an exception, deviation or special handoff, record it in a prose section but do not replace the YAML block.

## Mandatory Process

1. Reconcile the design with the task breakdown and the current gates.
2. Lock `implementation_mode` as `FEATURE`, `BUGFIX`, `REFACTOR` or `HARDENING`.
3. If it is a `BUGFIX`, reproduce the bug first or collect `bug_repro_evidence` equivalent that is readable enough.
4. Build a `hypothesis_log`; each hypothesis must have confirming, rejecting or open evidence.
5. Run the smallest `debug_experiments` enough to reduce uncertainty before fixing.
6. For a behavior change, follow the cycle `test fail -> minimal code -> test pass -> refactor`.
7. Keep the smallest sufficient delta; do not expand scope on a whim.
8. If a refactor is needed, record `safe_refactor_notes` and keep guard tests around the touched region.
9. Review early for risky logic/contract parts, do not push everything to the end.
10. Record `code_changes`, `doc_changes`, `config_changes` clearly.
11. Collect `bug_repro_evidence`, `hypothesis_log`, `debug_experiments`, `tdd_evidence`, `review_checkpoints`, `outputs_actual`.
12. Record `known_limitations`, `follow_up_items` and `notes_for_testing`.

## Quality Rules

- Prefer small, focused, reviewable changes.
- For a bug fix, prefer `repro -> hypothesis -> experiment -> patch` over fixing straight from a hunch.
- If strict TDD is blocked by legacy or harness, record the reason clearly in `notes_for_testing` or `known_limitations`.
- Do not change the design implicitly while coding; if the design is not feasible, return to the design step.
- Do not use "will verify later" to dodge evidence hooks during implementation.
- If the bug cannot be reproduced, record the lower confidence level instead of wording it as a certain fix.
- Default to writing and communicating in English; follow project conventions for code.
- Text files must be stored as UTF-8.

## Decision Rules

- If the design turns out to be infeasible, stop and report back instead of a vague workaround.
- If behavior outside scope must change to preserve correctness, record it in `follow_up_items` and report back.
- If the change is large or risky, prefer an isolated workspace or a suitable execution mode per the workflow.
- If a bug fix has no `bug_repro_evidence`, it must at least have a `hypothesis_log` and `debug_experiments` enough for others to review the reasoning.
- If a refactor touches behavior, it must have a guard test or `tdd_evidence` before it counts as a safe refactor.
- If scope touches deploy artifacts, record Dockerfile, compose, manifest or pipeline config in `config_changes` or `outputs_actual`.
- Do not treat local progress, code completion or local test passes as `done`.

## Completion Conditions

- `outputs_actual` matches the implementation scope.
- `code_changes`, `doc_changes`, `config_changes` are recorded clearly.
- `bug_repro_evidence` or `hypothesis_log` + `debug_experiments` exist when scope is a bug fix or hardening.
- `tdd_evidence` exists for a behavior change, or there is a clear reason if strict TDD was not applied.
- `safe_refactor_notes` exist if a refactor happened during implementation.
- `notes_for_testing` is enough for the verify step to execute immediately.