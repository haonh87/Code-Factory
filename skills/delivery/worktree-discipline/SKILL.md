---
language: en
name: worktree-discipline
description: Lock when to use a worktree, how to isolate the workspace and the cleanup guards for a large or risky change. Use it at `s07 Implement` when scope touches many boundaries/files, spans more than one session, has conflict risk, merge/branch/release risk, or `planning_track=full|enterprise`.
---

# Worktree Discipline

> Vietnamese: SKILL.vi.md

Lock the decision to use or not use a `worktree` before or during `s07 Implement`, so the implementation path is isolated at the right level instead of by habit.

<HARD-GATE>
Do not use this skill to bypass `s04-s06`.

`worktree` is a workspace isolation layer, not evidence of `done`, and does not replace review, verify or `DoD`.

If a change falls into the group that should or must use a `worktree` but it is skipped, record a clear `skip_reason` and reflect it in the implementation note.
</HARD-GATE>

## When To Use

- When `planning_track=enterprise`.
- When the change spans more than one session or multiple people may touch the same code region.
- When scope touches many boundaries/modules/files with meaningful conflict risk.
- When there is high `merge risk`, `branch risk` or `release risk`.
- When deciding whether a `worktree` can be skipped for a quick fix.

## Out Of Scope

- Does not replace `implementation` for writing code.
- Does not replace `branch-finish-discipline` for cleanup/merge after verify.
- Does not run `git worktree` commands on the user's behalf unless asked.
- Does not replace review or testing.

## Minimum Input

- `worktree_target`
- `planning_track`
- `change_scope`
- `risk_signals`
- `repo_context`
- `constraints`

`risk_signals` should state at least:

- whether it spans more than one session
- whether many boundaries or many main files are touched
- whether there is merge/conflict/release risk
- whether multiple implementers or workers could touch the same paths

## Required Output

Emit a YAML artifact per the following schema:

```yaml
worktree_target: ""
planning_track: quick|full|enterprise
risk_signals: []
worktree_decision: REQUIRED|RECOMMENDED|OPTIONAL|NOT_NEEDED
decision_reason: []
isolation_strategy:
  branch_name: ""
  worktree_path: ""
  owned_paths: []
  expected_duration: ""
execution_guards: []
skip_reason: ""
cleanup_preconditions: []
notes_for_implementation: ""
```

## Normalize Output In Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:

- Use the step 7 template at `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Implementation Notes` block.
- Do not replace the `## Main Artifact` block; that block still uses the `implementation` schema.

## Mandatory Process

1. Read `planning_track`, `change_scope` and `risk_signals`.
2. Determine whether the change falls into the `large or risky change` group.
3. Conclude `worktree_decision` as `REQUIRED`, `RECOMMENDED`, `OPTIONAL` or `NOT_NEEDED`.
4. If using a `worktree`, lock `isolation_strategy` enough that the implementer does not have to guess.
5. Record `execution_guards` to avoid drift between the main workspace and the isolated workspace.
6. If skipping the `worktree`, record `skip_reason` explicitly.
7. Record `cleanup_preconditions` to hand off to `branch-finish-discipline`.

## Quality Rules

- `enterprise` must not conclude below `REQUIRED` without a clear waiver.
- If `worktree_decision != NOT_NEEDED`, `isolation_strategy` must not be empty.
- If `worktree_decision=OPTIONAL|NOT_NEEDED`, explain why the main workspace is still safe.
- If `worktree_path` escapes the repo working tree without a recorded reason in `decision_reason`, treat `isolation_strategy` as incomplete.
- Default to writing and communicating in English.
- Text files must be stored as UTF-8.

## Location Constraint

- Default and required: `worktree_path` must resolve to a location inside the repo's own working tree, e.g. `.claude/worktrees/<name>`, the same convention the `EnterWorktree` tool already uses. Never build `worktree_path` from `..` segments that walk out past the repo root.
- Before locking `isolation_strategy`, resolve `worktree_path` to an absolute path and confirm it stays inside the repo boundary. An unresolved or unchecked relative path is not acceptable.
- A location outside the repo working tree is only valid as an explicit, justified exception (for example a runtime with no in-repo worktree convention). Record the reason in `decision_reason`, and even then keep it to one direct sibling of the repo root — not an open-ended relative path.
- This constraint applies regardless of which runtime or agent performs the implementation; the rule is about where the worktree ends up, not which tool creates it.

## Decision Rules

- Eligibility for `REQUIRED` vs `RECOMMENDED` follows `codex-workflow-chain § Hard Rule: Worktree For Large Or Risky Changes` directly — consume `planning_track` and `risk_signals` against that rule instead of re-deriving the trigger list here.
- `OPTIONAL` when the change is medium but ownership is clear and conflict risk is low — a step below `RECOMMENDED`, not a synonym for it.
- `NOT_NEEDED` only fits a small bug or quick fix, few files, done in one session and low conflict risk.
- If multiple workers or people touch nearby paths, lean toward `REQUIRED` or `RECOMMENDED` even if no single trigger from the Hard Rule fires on its own.

## Completion Conditions

- A clear `worktree_decision` and `decision_reason`.
- `isolation_strategy` when a `worktree` is needed.
- `skip_reason` if not used despite risk signals in the change.
- `cleanup_preconditions` enough to hand off to closeout at `s08`.