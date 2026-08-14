---
language: en
---

# Landscape Quality Bar

> Vietnamese: landscape-quality-bar.vi.md
>
> **Canonical source: `skills/analysis/sa/references/landscape-quality-bar.md`.**
> `skills/analysis/ta/references/landscape-quality-bar.md` is a byte-identical copy. Edit the
> canonical file, then re-copy. A `diff` between the two copies runs in the verify path.

Read this only when the `landscape` block is `applicable: true`. It defines what makes a landscape
acceptable to ship — not how to draw one.

**This skill does not build models and does not draw views.** That is `architecture-modeling`. This
skill decides whether a landscape is needed and refuses to accept one that fails the bar below.

## Format Is Chosen By Diagram Type

| Diagram | Format | Why |
|---|---|---|
| System landscape, integration architecture | `drawio` | Needs domain containment and orthogonal edge routing |
| Flow, sequence | `mermaid` | Layered `dagre` layout suits sequential flow |
| Model-as-code, many views from one source | `structurizr-dsl` | Has a layout engine and derives multiple views |

`mermaid` is **not accepted** for a system landscape or an integration architecture. When a caller
asks for one of those in `mermaid`, refuse, state the reason, and propose `drawio`. Producing a
sub-standard diagram because the caller named the wrong format is worse than producing none.

## The Bar — Countable, Not Impressionistic

Every check below is a count. "Looks fine" is not a verdict.

| # | Check | Passing value |
|---|---|---|
| 1 | Elements with a named owner | 100% |
| 2 | Overlapping element boxes | 0 |
| 3 | Edges crossing through a box that is not an endpoint | 0 |
| 4 | Two-way arrows left unanalysed | 0 |
| 5 | Vague aggregate boxes — `middleware`, `integration layer`, `backend` | 0 |
| 6 | Elements exceeding the readable limit | ≤ 12 business view · ≤ 25 engineering view |
| 7 | Elements failing the delete test | 0 |
| 8 | Manual steps needed after opening the file | ≤ 1, and stated in the output |

Checks 2, 3 and 8 come from `REQ-024`; the rest from `REQ-020`. Element limits in check 6 are
**reasoned proposals, not measured standards** — treat them as calibration targets, not law.

## The Three Checks That Need Explaining

**Check 4 — two-way arrows.** Dependency direction is the most valuable information on a landscape.
A two-way arrow almost always means the direction has not been analysed, not that both systems
genuinely call each other. When both directions are real, draw two arrows and label each.

**Check 5 — vague aggregate boxes.** A box named `Integration Layer` is a sign that ownership was
never determined, so everything unclear got swept into one shape. It hides exactly the boundary the
landscape exists to show. Split it into elements with real owners, or record the gap explicitly.

**Check 7 — the delete test.** For each element ask: *if I remove this box, does anyone make a wrong
decision?* If not, the element is decoration. A 15-element landscape people actually use beats a
60-element one nobody opens.

## How The `drawio` File Is Produced

Decided by spike on 2026-08-14. `drawio` has no built-in layout engine — the file carries absolute
coordinates — so the coordinates are computed rather than left to the tool.

**The generated file must satisfy checks 2, 3 and 8 with no manual rearrangement.** The layout is
computable because a landscape has a constrained shape: domain containers holding system boxes, with
edges between the boxes. This is not general graph layout.

| Step | Rule |
|---|---|
| 1 | Each domain becomes a `swimlane` container; systems are child cells with geometry relative to it |
| 2 | Systems fill a grid inside their domain — fixed box size, fixed gaps, fixed padding |
| 3 | Domain containers stack along one axis with a fixed gap |
| 4 | Edges use `orthogonalEdgeStyle`, anchored to box edges, routed via the midline between endpoints |
| 5 | Before emitting, compute the checks: box-vs-box overlap, container overlap, containment, and segment-vs-box intersection for every edge against every non-endpoint box |

Step 5 is the point. Because every coordinate is known before the file is written, the eight checks
can be **counted programmatically** rather than judged by eye. A layout that fails any check is
fixed before emission, not shipped for a human to notice.

Record the counted results in `metrics`. `manual_steps` stays empty unless a single stated step is
genuinely required.

**Known limit.** The spike verified geometry by computation, not by opening the file in draw.io.
Structural correctness is established; visual confirmation on first open is not. Treat the first
real run as the confirmation, and record any surprise as a issue against this reference.

## When `architecture-modeling` Is Not Installed

`architecture-modeling` is an **optional dependency**. It is not shipped with this pack, so on a
fresh install it will usually be absent.

Its absence changes what you can produce. It does not change what you must decide.

| Step | With it | Without it |
|---|---|---|
| Decide whether a landscape is needed | Yes | **Yes — unchanged** |
| State `question_answered` | Yes | **Yes — unchanged** |
| Produce the drawing | Commission it | Not produced |
| Report the gap | n/a | Required |

Emit the block like this:

```yaml
landscape:
  applicable: true                    # the profile called for one
  reason: ""
  question_answered: "Which systems does the order contract change pull in?"
  render_format: drawio               # the format that would be correct
  produced_by: ""                     # nothing produced it
  quality_checks: []
input_issues:
  missing_capability:
    - "architecture-modeling is not installed. The profile requires a landscape and the question it
       must answer is stated, but no drawing was produced. Install architecture-modeling, or hand
       the question to whoever owns diagrams."
```

**Do not draw it yourself.** A diagram made by a skill that declares it does not draw is worse than
no diagram: it carries no ownership, no model behind it, and nothing to check it against.

**Do not silently set `applicable: false`.** That reports "no landscape needed", which is a
different and false statement. The profile said one was needed; only the drawing is missing.

This is the general rule of `REQ-012` applied to one specific case: when something genuinely is not
available, declare it and keep going — never stop hard, never fake the output.

## Gaps Are Recorded, Not Guessed

An element whose owner is unknown fails check 1. The fix is **never** to invent an owner. Record it
as `owner_kind: unknown` and raise it in `input_issues`. An unresolved gap that is visible is a working
result; a gap that was filled with a guess is a false result that will be trusted.

## Before Accepting A Landscape

- All eight checks counted, with numbers recorded in `metrics`.
- Any check that failed appears in `input_issues` with an owner.
- `question_answered` is filled in before the drawing was commissioned, not after. It names the
  decision the picture has to support. If no one can state it, the drawing should not exist.
- The format matches the diagram type in the table above.
