# Render for Pi (`pi-goal` extension)

[`pi-goal`](https://github.com/Michaelliv/pi-goal) adds a `/goal` command and `create_goal`/`get_goal`/`update_goal` tools so Pi keeps taking turns toward a thread-scoped objective until the model calls `update_goal({ status: "complete" })`, the user pauses/clears it, or a token budget is hit. State is stored as custom session entries — it survives reloads (paused, not silently resumed) and needs no external log file.

`/goal` here takes **one pasteable sentence with six clauses**, not a multi-section block and not a bare condition string.

## Build the goal sentence

Map the Hard Gate fields from `../SKILL.md` onto pi-goal's six required parts and its exact template:

| Hard Gate field | pi-goal part |
| --- | --- |
| Outcome | Outcome |
| Success condition | Verification surface (tests, commands, benchmark output, report, diff audit, screenshots, logs — concrete evidence, not just "tests pass" unless the tests truly cover every requirement) |
| Stop/pause rules (the "must hold" half) | Constraints (what must not regress or change) |
| Scope boundary | Boundaries (files/dirs/tools/systems/permissions allowed or forbidden) |
| Validation loop | Iteration policy (what to inspect after each attempt before choosing the next action) |
| Stop/pause rules (the "give up honestly" half) | Blocked stop condition (stop with the exact blocker + evidence + next needed input) |

```text
/goal <outcome>, verified by <verification surface>, while preserving <constraints>. Use <boundaries> and avoid <what to avoid>. Between iterations, <iteration policy>. If blocked or no defensible path remains, stop with <blocked stop condition>.
```

Add a token budget when the user wants one bounded:

```text
/goal --tokens 50k <same sentence>
```

## Writing standards (carry over from the source skill)

- Make it self-contained — it must survive context compaction and continuation turns; do not rely on anything said earlier in the conversation.
- Use exact command names when known; when unknown, say "run the relevant project checks identified in AGENTS.md/package scripts" rather than inventing a command.
- Require real evidence before completion (files changed, tests passed, benchmark numbers, screenshots, logs, PR checks, a written audit) — never let "tests pass" be the only bar unless the tests actually cover every requirement.
- Name excluded directories/behaviors explicitly when it matters ("do not rewrite CLI user-facing output", "do not touch generated files except via the generator").
- Prefer concrete stop language ("stop with the exact blocker and what would unlock progress") over "do your best".
- For high-stakes or ambiguous work, offer two options — a narrower, safer goal and a broader one that delegates more discovery — and recommend one, instead of shipping only the broad version.

## Set it / manage it

1. Confirm the Hard Gate is satisfied and the user wants it set now (see "Do Not Silently Start" in `../SKILL.md`).
2. Paste the full `/goal <sentence>` (with `--tokens` if used) as one message. Setting it replaces any existing goal in this thread.
3. Lifecycle commands the user (or you, once explicitly asked) may need:
   - `/goal` or `/goal status` — show the current goal and usage.
   - `/goal pause` — stop autonomous continuation without deleting the goal.
   - `/goal resume` — reactivate a paused goal (also required after any Pi reload, since reload pauses rather than silently resuming).
   - `/goal clear` — remove the goal entirely.
   - `/goal statusbar on|off` — toggle the footer status line.

## Stop / pause handling

The model can only call `update_goal` with `status: "complete"` — it cannot pause, resume, clear, or budget-limit itself; those stay under user/runtime control. So the "Blocked stop condition" clause in the sentence is what the model itself checks each turn: if it decides no defensible path remains, it should say so and stop working rather than calling `update_goal` dishonestly or drifting. If the model marks complete without the verification surface actually being satisfied, that is a goal-wording bug (verification surface too weak or unauditable) — tighten that clause and re-issue, don't just tell it to try harder.
