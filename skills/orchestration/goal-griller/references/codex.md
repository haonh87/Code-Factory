# Render for Codex CLI

Codex CLI's native `/goal` (shipped 0.128.0+) takes **one multi-section mission prompt**, not a single condition string. Once set, Codex persists the objective and keeps cycling plan → act → verify → correct across many turns/hours until it decides the mission is done or it is stopped.

## Enable it (one-time per environment)

```bash
codex features enable goals
```

Restart Codex. If `/goal` still doesn't show up in the slash-command list, update to Codex CLI 0.128.0 or later.

## Build the mission prompt

Fill every section straight from the Hard Gate fields in `../SKILL.md` — do not invent fields, and do not skip a section just because it feels obvious:

```text
/goal [single objective]

Context to read first:
- [files / docs / logs / issues / commands the agent should read before acting]

Constraints:
- [scope boundary: what may change, what must not]

Operating rules:
- Prefer small verified iterations over large unverified edits.
- Do not expand scope without pausing.
- [any other operating constraint from the interview]

Validation loop:
- During work: [cheap checks run repeatedly]
- Final proof: [checks run once, right before claiming done]

Done when:
- [the exact success condition]

Pause if:
- [every stop/pause trigger from the interview]
```

Also include a short **"Why this goal is safe to run"** note underneath: the success condition, the main risk, and the proof artifact Codex will leave behind — this is what the user approves before you paste it in.

Keep every section self-contained (restate what the section needs rather than assuming it survives from earlier in the conversation) — see "Context compaction" below for why.

## Set it

1. Confirm the Hard Gate is satisfied. If the user asked only for the draft, stop after presenting it (see "Do Not Silently Start" in `../SKILL.md`); do not type it into Codex yourself.
2. Once approved, paste the full mission prompt (including the leading `/goal `) into the Codex CLI in one message and let it run.
3. Because Codex commits to this mission for a long horizon, under-specifying any section compounds — a vague "Context" or "Constraints" section means Codex fills the gap itself, and that gap grows across turns. Prefer re-running the interview loop over shipping a thin draft.

## Context compaction does not stop the goal

Codex's `/goal` is explicitly built to persist across multi-hour, multi-turn runs, so context filling up is an expected, handled condition, not a failure: Codex compacts/summarizes the transcript automatically and keeps cycling plan → act → verify → correct through it. The mission objective, budget, and turn state persist independent of the raw context, so "context ran out" is not one of the mission's real stop triggers — only "Done when" being satisfied, an explicit stop/clear, or a turn/token/time budget you set counts as a real end.

The practical risk is the same as anywhere else compaction happens: a summarization pass can drop the specific evidence a later turn needed (an exact file path, a command's exact output), and Codex fills that gap itself — silently, and the gap compounds the longer the mission runs. This is exactly why every section of the mission prompt should be self-contained rather than relying on something established earlier and possibly summarized away.

## Guard interaction

Some Codex setups add a review hook in front of goal-setting calls (a `PreToolUse`-style guard that can block `create_goal`/`set_goal`/`/goal`). If a goal-setting call is blocked this way, do not try to bypass it — treat the block as a signal that the draft is still too loose, tighten the "Constraints" / "Pause if" sections, and offer the revised draft for approval again.

## Stop / pause handling

The "Pause if" section is Codex's actual stop boundary here — there is no separate evaluator like Claude Code's. If a pause condition fires mid-run, expect Codex to stop and surface it rather than silently continuing; if it does continue past a condition the user flagged as a hard stop, that means the condition wasn't phrased as something Codex's own output could detect — tighten it and re-issue rather than trying to interrupt mid-mission.
