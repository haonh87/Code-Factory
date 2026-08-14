---
language: en
---

# Invocation Rules

> Vietnamese: invocation-rules.vi.md
>
> **Canonical source: `skills/analysis/sa/references/invocation-rules.md`.**
> `skills/analysis/ta/references/invocation-rules.md` is a byte-identical copy. Edit the canonical
> file, then re-copy. A `diff` between the two copies runs in the verify path; drift fails.

How the call is read, how the depth is fixed, and what the skill is allowed to decide on the
caller's behalf.

## Call Grammar

```
/sa <request> [directives]
/ta <request> [directives]
```

Directives are optional and written in ordinary language, in whatever language the caller uses.
**With no directives the skill runs at its default profile.** Directives never have to be present
for the skill to work.

## The Four Directive Groups

| Group (`interpreted_as` token) | Recognises | Effect |
|---|---|---|
| Extra output (`extra_output`) | "draw the system landscape", "vẽ system landscape" | Sets `landscape.applicable: true` even at `driver-only` |
| Render format (`render_format`) | "drawio", "mermaid", "structurizr" | Sets `landscape.render_format`, subject to the format rule below |
| Profile (`profile`) | "full", "just the drivers", "chỉ driver thôi" | Sets `selected_profile`, subject to the floor rule below |
| Audience (`audience`) | "for the business owner", "cho dev" | Sets `landscape.view_axis` to `domain` or `system` |

A directive naming an unsupported format is still a **valid** directive. Resolve it as a format
request, then follow the unsupported-format path. It is not an unresolved directive.

## Parsing Procedure

1. Split the call into the request and anything that reads as an instruction about *how to run*.
2. For each candidate, decide which of the four groups it belongs to.
3. Record every resolved directive in `invocation.directives_parsed` with its `raw` text, the group
   it was read as, and its effect.
4. Anything that fits no group goes in `invocation.directives_unresolved` with a reason.
5. **Ask once about unresolved directives — never guess.** If no answer is available, continue at
   the default profile and leave the entry in `directives_unresolved`.

Recording what was understood is not bookkeeping. A misread directive changes the whole run, and
the caller can only catch it if the skill says out loud what it thought it heard.

## Profile

| Profile | Use when |
|---|---|
| `driver-only` | One system, no contract change, no new landscape question |
| `driver+landscape` | More than one system or owning team, or an integration boundary moves |
| `full` | Greenfield, a foundation decision, or a migration, backfill or cutover |

There is no `none` profile. Whether to call the skill at all is decided outside it. When the skill
is called for a change with no architectural content, it runs, concludes that there are no
architecture drivers, and says why — it does not refuse and does not return an empty artifact.

## Hard Escalation

These raise the profile regardless of what the caller asked for. Record every one that fired in
`escalation_reasons`, then continue.

| Trigger | Floor |
|---|---|
| Greenfield, or a foundation decision is needed | `driver+landscape` |
| A public API, event or data contract changes | landscape required |
| A migration, backfill or cutover is involved | `full` |
| More than one system, or more than one owning team, is touched | landscape required |

`profile_source` records where the final profile came from: `default`, `caller`, or `escalated`.
When it is `escalated`, `escalation_reasons` must be non-empty.

## Directives Raise, Never Lower

| Case | Caller says | Result |
|---|---|---|
| Raise | `driver-only` context, "draw the landscape" | Applied. `landscape.applicable: true` |
| Lower, refused | Data contract changes, "just the drivers" | Refused. Runs at the escalated floor, reason recorded in both `escalation_reasons` and the directive's `effect` |
| Unresolved | "make it pop" | Asked once. Recorded in `directives_unresolved`. Run continues at default |

Refusing to lower is not obstruction. The triggers exist because those changes have consequences the
caller may not have in view when they ask for a shallow run — a contract change that skips the
landscape is exactly the case that surfaces late and expensively.

## Format Follows Diagram Type

| Diagram | Format |
|---|---|
| System landscape, integration architecture | `drawio` |
| Flow, sequence | `mermaid` |
| Model-as-code, many views from one source | `structurizr-dsl` |

**A landscape or integration architecture requested in `mermaid` is refused.** State the reason —
`mermaid` lays out in `dagre` tiers and cannot express domain containment — and propose `drawio`.
Produce nothing until the caller decides.

For any format outside the supported set, resolve the directive, state that the format is not
supported, name the supported alternative for that diagram type, and hand over the model with the
handoff table instead of a low-quality drawing.

## What Lands In `invocation`

```yaml
invocation:
  skill: sa|ta
  directives_parsed:
    - raw: "vẽ system landscape"
      interpreted_as: extra_output
      effect: "landscape.applicable = true"
    - raw: "drawio"
      interpreted_as: render_format
      effect: "landscape.render_format = drawio"
  directives_unresolved: []
  selected_profile: driver+landscape
  profile_source: escalated
  escalation_reasons:
    - "Order contract changes — public data contract triggers landscape"
```
