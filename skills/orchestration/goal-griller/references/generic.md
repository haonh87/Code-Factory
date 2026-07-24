# Render for an agent without a confirmed native goal mode

Use this when the target agent's long-horizon mechanism is unknown, or confirmed absent. There is no native evaluator or persisted mission state to lean on here, so the rendered prompt has to carry the whole loop by itself.

## Build the mission brief

Same sections as Codex's mission prompt (`codex.md`), since most agents can at least follow a structured task brief as plain instructions, but drop the `/goal` command prefix — this is a normal prompt, not a native slash command:

```text
Objective: [single objective]

Context to read first:
- [...]

Constraints:
- [scope boundary]

Operating rules:
- Prefer small verified iterations over large unverified edits.
- Do not expand scope without pausing.
- Keep working through the objective across turns without stopping to ask
  permission for each step, unless a "Pause if" condition below fires.

Validation loop:
- During work: [cheap checks run repeatedly]
- Final proof: [checks run once, right before claiming done]

Done when:
- [the exact success condition]

Pause if:
- [every stop/pause trigger from the interview]
```

## Tracking state across turns

Without a native evaluator, whether the loop actually continues across turns depends entirely on that agent's own runtime behavior (does it keep working after one turn, or does it always return control?). Two honest options — pick based on what you already know about the target agent, and say which one you picked:

- **Single long session**: if the agent can keep working within one open session/turn budget, the "Operating rules" clause above ("keep working... without stopping to ask permission") is the whole mechanism. No extra file needed.
- **Across separate invocations** (e.g. a cron/script re-invokes the agent repeatedly): the agent needs some way to know what's already done. Only then add a minimal, explicit checkpoint instruction to the brief, e.g. "before starting, check `<file/log/checklist>` for what's already done; before stopping, update it" — point it at whatever the target project already uses for that (a task list, a checklist, test status), not a new bespoke log format invented here.

## Stop / pause handling

Same principle as the other renders: "Pause if" is the real safety boundary. Since there's no native evaluator forcing a stop, the agent itself must self-check against those conditions after meaningful steps — say so explicitly in "Operating rules" if the target agent doesn't already have a habit of doing that.
