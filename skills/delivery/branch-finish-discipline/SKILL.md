---
language: en
name: branch-finish-discipline
description: Decide whether a branch/worktree may be cleaned up, closed, removed, or merged, based on verify, `DoD`, and open findings. Use at `s08 Verify + DoD` or after verify when a work item has a branch/worktree that needs safe closure.
---

# Branch Finish Discipline

> Vietnamese: SKILL.vi.md

Lock the closeout rule for a branch or worktree after verify, so you do not clean up or merge early just because the workspace is clean.

<HARD-GATE>
Do not clean up, close, remove, or merge a branch/worktree before `s08 Verify + DoD` has a clear enough verdict.

Local `review pass`, `test pass`, a clean diff, or a clean worktree is not sufficient evidence to close out.

If findings are still open, exceptions are still open, or evidence is insufficient, the recommendation must keep a `HOLD_OPEN` state.
</HARD-GATE>

## When To Use

- When a work item uses a dedicated branch or worktree.
- When verify is nearly done and you need to decide cleanup or merge.
- When there are multiple worktrees or branches to close in a safe order.
- When you need to lock closeout preconditions for a release-sensitive change.

## Out Of Scope

- Does not replace `testing` or `definition-of-done-gate`.
- Does not replace the repo's branch strategy.
- Does not run `git merge`, `git worktree remove`, or destructive cleanup on its own unless requested.
- Is not used to legitimize early closeout.

## Minimum Input

- `finish_target`
- `workspace_context`
- `verify_status`
- `dod_status`
- `open_findings`
- `constraints`

`workspace_context` should state at least:

- whether `branch`, `worktree`, or both are in use
- the related path or branch name
- whether there are multiple workspaces to clean up in order

## Required Output

Emit a YAML artifact using the following schema:

```yaml
finish_target: ""
workspace_kind: BRANCH|WORKTREE|BOTH
verify_inputs: []
finish_gate_checks:
  verify_complete: PASS|FAIL|PENDING
  dod_complete: PASS|FAIL|PENDING
  findings_closed: PASS|FAIL|PENDING
  exceptions_resolved: PASS|FAIL|PENDING
allowed_actions: []
blocked_actions: []
cleanup_sequence: []
merge_conditions: []
residual_risks: []
final_recommendation: CLEANUP_ALLOWED|MERGE_ALLOWED|HOLD_OPEN
notes_for_closeout: ""
```

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:

- Use the step 8 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Audit` block.
- If closeout affects the final verdict, also link to `## Definition of Done`.

## Required Process

1. Read `verify_status`, `dod_status`, `open_findings`, and `workspace_context`.
2. Evaluate `finish_gate_checks`.
3. Separate `allowed_actions` and `blocked_actions` clearly.
4. If cleanup or merge is allowed, record `cleanup_sequence` and `merge_conditions`.
5. If not allowed yet, record `residual_risks` and `notes_for_closeout` clearly enough to keep the workspace open for the right reason.

## Quality Rules

- `final_recommendation` must not be `MERGE_ALLOWED` when `dod_complete != PASS`.
- `blocked_actions` must not be empty when the recommendation is `HOLD_OPEN`.
- If there are multiple workspaces, `cleanup_sequence` must state the order.
- If verify is incomplete or findings are still open, do not use vague wording like "merge can be considered".
- Default to writing and communicating in English.
- Text files must be stored as UTF-8.

## Decision Rule

- `HOLD_OPEN` is the default when `verify_complete`, `dod_complete`, `findings_closed`, or `exceptions_resolved` has not passed.
- `CLEANUP_ALLOWED` fits when the workspace can be cleaned up but the final merge or close still depends on other repo conditions.
- `MERGE_ALLOWED` only fits when verify and `DoD` are sufficient, findings are closed, and no exceptions are open.
- If using multiple worktrees or multi-agent handoff, closeout is only valid after the `verify path` and `handoff path` have clearly ended.

## Completion Conditions

- `finish_gate_checks` with a readable verdict.
- Clear `allowed_actions`, `blocked_actions`, and `final_recommendation`.
- `cleanup_sequence` or `merge_conditions` when closeout is allowed.
- `residual_risks` and `notes_for_closeout` when the workspace must stay open.