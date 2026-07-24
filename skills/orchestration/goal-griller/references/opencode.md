# Render for OpenCode (`opencode-goal-plugin`)

[`opencode-goal-plugin`](https://github.com/prevalentWare/opencode-goal-plugin) is a **third-party plugin**, not a built-in OpenCode feature — confirm it's installed before drafting a goal for it (see Requirements below). It adds a `/goal <objective>` command, persistent per-session goal state (survives compaction), and optional auto-continuation on session idle, until the goal is closed as `complete` (with evidence) or `unmet` (with a blocker).

Unlike Pi's fixed six-clause sentence or Codex's fixed multi-section block, `/goal` here takes **one free-form objective paragraph** — the plugin's own guidance is just "include the scope, non-goals, and verification path when they matter," not a strict template.

## Requirements (check first)

The plugin must be installed for this project or globally:

```bash
opencode plugin @prevalentware/opencode-goal-plugin
# or: opencode plugin -g @prevalentware/opencode-goal-plugin
```

Or added manually to **both** `opencode.json` and `tui.json`:

```json
{ "plugin": ["@prevalentware/opencode-goal-plugin"] }
```

If it's not installed and the user hasn't confirmed they will install it, say so and offer `generic.md`'s render instead of assuming `/goal` will work.

## Build the objective

Fold the Hard Gate fields from `../SKILL.md` into one paragraph, in this order, so nothing gets lost even though the plugin doesn't enforce a template:

```text
/goal <outcome>. Scope: <scope boundary — what may change>. Non-goals: <what must not change>. Context: <files/docs/logs to read first>. Verify by: <success condition / verification path>. Between steps: <validation loop — cheap checks to run repeatedly>. Report unmet with the concrete blocker if <stop/pause rules>.
```

Keep the "Report unmet with..." clause explicit — the plugin's `update_goal` tool can only close a goal as `complete` (requires `evidence`) or `unmet` (requires `blocker`); an agent that can't produce real evidence must say so via `unmet` rather than force a `complete`.

## Set it / manage it

1. Confirm the Hard Gate is satisfied and the plugin is installed.
2. Run `/goal <objective>` in a fresh (or current) OpenCode chat. Setting a new one is a fresh goal, not a silent replace — check `/goal` status first if one might already be active.
3. Lifecycle commands:
   - `/goal` (no argument) — current goal state.
   - `/goal history` — lifecycle history and recent checkpoints.
   - `/goal edit <objective>` — update the current objective without starting over.
   - `/goal pause` / `/goal resume` — stop or reactivate auto-continuation without clearing state.
   - `/goal clear` (aliases `stop`, `off`, `reset`, `none`, `cancel`) — remove the goal.
4. The agent can also be asked to write and set its own goal via the `set_goal` tool (e.g. "set your own goal to finish this refactor safely") — it still only creates a goal when explicitly requested, so this does not bypass "Do Not Silently Start" in `../SKILL.md`.

## Bound the run

Default auto-continuation caps exist (`max_auto_turns: 25`, no-progress pause after repeated low-output continuation turns) but token/time budgets are **unset by default** — call this out to the user and suggest project config if the goal is expensive or open-ended:

```json
{
  "plugin": [["@prevalentware/opencode-goal-plugin", {
    "default_token_budget": 200000,
    "max_goal_duration_seconds": 1800
  }]]
}
```

When a safety limit (`budgetLimited`, `usageLimited`, or repeated-no-progress `paused`) is hit, the plugin asks for one wrap-up handoff instead of continuing forever — mention this so the user isn't surprised by a pause that isn't a real completion.

## Plan-mode safety (do not fight this)

Goals created while the session is on the `plan` agent are recorded `paused` with reason `plan mode` and never auto-continue into implementation; resuming to `active` is refused from Plan mode by design, specifically so nothing (including injected instructions) can self-escalate a planning session into execution. If a goal is stuck `paused` for this reason, the right move is telling the user to switch to Build mode and `/goal resume` themselves — not treating it as a bug to route around.

## Stop / pause handling

The "Report unmet with..." clause maps directly to `update_goal({status:"unmet", blocker})`. If the agent is tempted to call `complete` without real `evidence`, that's the goal-wording signal to tighten "Verify by:" — the same principle as the other renders: fix the prompt, don't loosen the check.
