---
language: en
name: goal-griller
description: Turn a vague ask into a precise, verifiable /goal prompt an autonomous agent can run to completion without a re-prompt per step. Use when the user mentions goal mode, /goal, create_goal, autopilot, autonomous work, or asks for an interview before setting a long-running goal.
---

# Goal Griller

Interrogate fuzzy intent until it becomes a goal an agent can autonomously pursue, verify, and stop on — then emit it as a `/goal` prompt. This skill is standalone: it has no dependency on any particular repo's docs, task format, or workflow. It only needs whatever files/logs/tests are already in front of it.

## Hard Gate

Do not produce a final `/goal` prompt until these six fields are clear enough:

1. **Outcome** — the single truth the user wants made real.
2. **Success condition** — measurable or objectively inspectable proof that the outcome is true.
3. **Scope boundary** — what may change and what must not change.
4. **Context** — files, docs, logs, issues, screenshots, services, or commands the agent should read first.
5. **Validation loop** — cheap checks during work, and final checks before claiming done.
6. **Stop and pause rules** — when to stop as done, and when to pause for human input.

If any field is missing, ask the next highest-leverage question instead of drafting the final goal.

## Interview Loop

1. Restate the apparent intent in one sentence.
2. Identify the weakest missing field from the hard gate.
3. If the answer can be discovered from local files, existing docs, logs, tests, or repo conventions, inspect those instead of asking.
4. Ask exactly one question at a time.
5. For each question, include your recommended answer and why it is probably right.
6. After the user answers, update the working goal shape and repeat.

Prefer three sharp questions over ten generic ones. Stop interviewing as soon as the goal is safely draftable.

## Question Priority

Ask in this order unless local context shows a different blocker:

1. What should be true at the end?
2. How will we prove it is true?
3. What is explicitly out of scope?
4. What should the agent read or preserve before acting?
5. What checks should run repeatedly versus only at the end?
6. What should make the agent pause instead of improvising?
7. What proof should the agent leave behind for review?

## Anti-Vague Rewrites

Reject goals shaped like these:

- "Improve the app."
- "Fix all bugs."
- "Make it production ready."
- "Refactor this codebase."
- "Research this and do the best thing."

Convert them into a single outcome plus proof, for example:

- Instead of "Improve the app": "Reduce dashboard initial load time by at least 25% with no visible behavior regressions, proven by benchmark output and browser screenshots."
- Instead of "Fix all bugs": "Make the checkout flow pass the failing test suite and preserve existing successful payment behavior."
- Instead of "Refactor this codebase": "Extract the duplicated auth/session logic into one shared module while preserving all current tests and public API behavior."

## Output: route to the target agent's native format

Once the hard gate is satisfied, work out which agent will actually run this goal, then read exactly one reference for the render + activation details — do not guess a syntax from memory, the two native `/goal` implementations are not interchangeable:

- **Claude Code** (`/goal` takes one condition string, evaluated by a small model after every turn) → read [`references/claude-code.md`](references/claude-code.md).
- **Codex CLI** (`/goal` takes one multi-section mission prompt, gated behind a feature flag) → read [`references/codex.md`](references/codex.md).
- **Pi** (`pi-goal` extension's `/goal` takes one pasteable sentence with six clauses, plus lifecycle subcommands) → read [`references/pi.md`](references/pi.md).
- **OpenCode** (`opencode-goal-plugin`'s `/goal` takes one free-form objective paragraph, closed via evidence/blocker) → read [`references/opencode.md`](references/opencode.md).
- **Anything else, or unclear which native mechanism (if any) is available** → read [`references/generic.md`](references/generic.md).

If it is genuinely unclear which agent will run the goal, render the closest matching forms and let the user pick — do not silently assume one.

## Do Not Silently Start

If the user asked only to draft the goal prompt, present the draft and stop. Do not invoke `/goal`, `create_goal`, or any equivalent goal-setting mechanism yourself unless the user explicitly asked you to also run it.

If the user asked to set the goal too, show the final draft first whenever there was any interview or inference, and set it only after the user confirms the draft matches their intent.

## Stop / pause rules stay authoritative

Whatever the target agent's native loop mechanism is, the "Pause if" / "Stop and report" clause in the rendered prompt is the actual safety boundary — not a suggestion. If the agent's evaluator or loop tries to keep going past a condition the user marked as a pause trigger, that is a bug in the rendered prompt, not something to work around at runtime: tighten the prompt and re-render instead of letting the run continue.
