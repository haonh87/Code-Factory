# Render for Claude Code

Claude Code's native `/goal` (v2.1.139+) takes **one condition string**, not a multi-section prompt. After every turn, a small fast model (default Haiku) reads the condition against the conversation and returns yes/no + a short reason. It does not run commands or read files itself — only what already landed in the transcript.

## Build the condition string

Collapse the Hard Gate fields from `../SKILL.md` into one sentence:

```text
/goal <outcome>, proven by <success condition>. Only touch <scope boundary>. Stop and report instead of continuing if <stop/pause rules>. Or stop after <turn/time bound>.
```

Rules for a condition that survives many turns:

- **One measurable end state** (a test result, a build exit code, a file count, an empty queue) — not a vague adjective like "better" or "clean".
- **A stated check**: name the exact command/output the agent must produce so it lands in the transcript, e.g. "`npm test` exits 0" or "`git status` is clean".
- **Constraints that matter**: anything that must not change on the way, from the Scope boundary field.
- **A turn/time bound** (e.g. "or stop after 20 turns") so an ambiguous condition cannot run forever.
- **Self-contained**: don't lean on anything said earlier in the conversation that isn't restated in the condition itself — auto-compaction can summarize away exactly the detail the evaluator needs (see "Context compaction" below).
- Stay under 4,000 characters.

## Set it

1. Confirm the Hard Gate is satisfied and, if this touches real work, that the user actually wants it set now (see "Do Not Silently Start" in `../SKILL.md`).
2. Run `/goal <condition>`. This starts a turn immediately using the condition as the directive — no separate prompt needed.
3. `/goal` does not change tool-call permissions. If unattended execution is the point, pair it with auto mode so tool-call prompts don't interrupt turns; otherwise Claude still asks before disallowed tool calls.
4. Run `/goal` with no argument any time to see turns spent, tokens spent, and the evaluator's latest reason.

## Requirements / failure modes

- Needs a trusted workspace (hooks enabled). Unavailable when `disableAllHooks` is set at any settings level, or when `allowManagedHooksOnly` is set in managed settings — in both cases Claude Code reports why instead of silently doing nothing. If you hit either, fall back to `generic.md`.
- One goal can be active per session; setting a new one replaces the old one.

## Context compaction does not stop the goal

Running low on context does not clear or pause a goal — Claude Code auto-compacts (summarizes) the transcript and keeps going, and the docs list only two ways a goal ends: the evaluator confirms the condition, or `/goal clear`. There is no third "context exceeded" stop condition.

The real risk is drift, not a clean stop:

- The evaluator judges the condition against **whatever survived compaction**, not the full history. If the specific evidence it needs (a command's exact output, a file count) gets summarized away, it may keep returning "no" indefinitely instead of recognizing real progress — this looks like a stall, not a stop.
- There is a reported edge case where auto-compact does not reliably trigger right at the context ceiling, which can surface as a hard error mid-turn rather than a graceful pause.

Mitigate this in the condition itself, not by relying on Claude to remember: keep the condition self-contained (see above) so each evaluation only needs what the current turn's own output shows, and keep the turn/time bound tight enough that a stalled goal gets surfaced for review before it burns an unreasonable amount of turns silently retrying.

## Stop / pause handling

- If a Pause condition from the Hard Gate fires mid-run, do not let the evaluator keep the goal alive by rephrasing progress around it. Report the blocker, then run `/goal clear` yourself (aliases: `stop`, `off`, `reset`, `none`, `cancel`) so the goal doesn't linger against a state the user needs to resolve.
- If the session ends with the goal still active, `--resume`/`--continue` restores the same condition; turn count, timer, and token baseline reset on resume. Re-check that nothing changed underneath before letting it continue.
- Non-interactive: `claude -p "/goal <condition>"` runs the loop to completion in one invocation. Nothing prints with default text output until the condition is met — add `--output-format stream-json --verbose` to see per-turn progress instead of apparent silence. Ctrl+C interrupts before completion.
