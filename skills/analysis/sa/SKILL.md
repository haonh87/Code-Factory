---
language: en
name: sa
description: Turn a product or change request into solution-level and system-level architecture drivers — objectives with measures, business and regulatory constraints, which system should own which capability, where the seams between systems sit, which data has a single source of truth, and the criteria that will later decide direction — each driver traced to an objective, given a numeric threshold or an explicit reason it has none, and mapped to a handoff block for BA, DEV and QC. Use at steps s01 to s04, before acceptance criteria are locked and before any technical approach is chosen. Runs standalone from a raw request; output of requirement-analysis or product-thinking is optional supplementary input. Does not restate or normalise requirements, does not run product discovery, does not explore or choose a solution direction, does not design a technical approach, and does not build architecture models or draw views.
---

# SA — Solution And System Architect Lens

> Vietnamese: SKILL.vi.md

Turn a request into the small set of drivers that actually shape the solution and the system
landscape, and hand each one to the role that needs it next.

This skill carries both the Solution and the System lens. In digital-transformation work the two
roles are rarely staffed separately, and splitting them here would draw a line that most
organisations do not actually have.

## What A Driver Is

An **architecture driver** is the part of a request that a design decision has to answer to. It is
not every requirement — most requirements are not drivers.

The test is one question: **if this changed, would the design change?**

| Statement | Design changes? | What it is |
|---|---|---|
| "The order button uses the brand green" | No | A requirement. Still has to be built, but it shapes nothing |
| "Payment completes under 3 seconds at p95" | Yes — rules out chatty synchronous chains | A driver |
| "Personal data must stay inside the country" | Yes — rules out offshore hosting | A driver |
| "Pre-orders appear on the kitchen screen 30 minutes ahead" | Yes — rules out session-bound sync | A driver |

A work item can carry fifty requirements and five drivers. Separating those five is the whole value
of this skill; the rest travels on to `s04` untouched.

## Goal

- State the objectives the request serves, each with a measure and a named source.
- Extract the business, commercial and regulatory drivers that shape architecture — not every
  requirement, only the ones a design decision must answer to.
- Extract the system-level drivers: which system should own which capability, where the seams
  between systems sit, which data needs a single source of truth, and which systems or teams the
  change pulls in.
- State every system-level driver as a **constraint**, never as an allocation. "Order data needs
  exactly one source of truth" is in scope; naming that system is `s05`.
- Give every driver a numeric threshold, or an explicit reason it has none.
- Trace both directions: every driver reaches an objective, every objective is supported.
- Report the input_issues in the input rather than smoothing over them.
- Hand BA, DEV and QC a block each can act on without reading the rest; emit the TA-owned DevOps
  block as non-applicable.
- Measure the analysis with the metrics in `references/metric-table.md` and publish the numbers.

## Position In The Workflow

- Runs across `s01` to `s04`, ending before `s04` locks acceptance criteria.
- Feeds `s04`: `handoff.to_ba` is the seed for acceptance criteria, `input_issues` is input to the `DoR`
  verdict.
- Feeds `s05`: `handoff.to_dev` is the constraint set `system-design` must respect. This skill
  stops there — it never chooses the approach.
- Pairs with `ta`, which covers the technical lens of the same request. Ownership of each output
  block is fixed in `references/block-ownership.md`.
- Independent of the BA lane. It reads `requirement-analysis` or `product-thinking` output when it
  exists, and runs without it when it does not.

## When To Use

- A request has arrived and no one has yet separated what shapes the architecture from what does
  not.
- Non-functional wishes are written in prose — "fast", "reliable", "scalable" — with no numbers.
- You suspect the requirement set and the stated goal have drifted apart.
- A change touches more than one system and the blast radius has not been named.
- Downstream roles keep asking the same clarifying questions because nobody wrote the constraints
  down in a form they can use.

## Out Of Scope

- Does not restate, normalise or scope requirements; that is `requirement-analysis`.
- Does not run product discovery or argue user value; that is `product-thinking`.
- Does not open or compare solution options; that is `brainstorming`.
- **Does not choose a technical approach, a stack, a pattern or a technology**; that is
  `system-design` at `s05`. Naming a technology in the output is an error in this skill.
- Does not design the inside of a system — modules, bounded contexts, layer rules; that is
  `domain-architecture` at `s05`. The system lens here works **between** systems, at `s01`–`s04`,
  and produces **constraints**, not designs.
- Does not build architecture models and does not draw views; that is `architecture-modeling`. This
  skill decides whether a landscape is needed and accepts or rejects it against
  `references/landscape-quality-bar.md`.
  **`architecture-modeling` is an optional dependency and is not shipped with this pack.** When it
  is not installed, do not draw anything yourself and do not skip the question: still decide whether
  a landscape is needed, record that decision in `landscape`, and report the missing capability in
  `input_issues`. See `references/landscape-quality-bar.md` for the exact fallback.
- Does not fill blocks owned by `ta`; see `references/block-ownership.md`.
- Does not measure people. Every metric here is about the artifact.

## Minimum Input

- `request`: the raw ask, in whatever form it arrived. This alone is enough to start.

Everything below is optional and improves the result when present. None of it is a blocker; a
missing item is recorded, not waited for.

- `ba_artifacts`: output of `requirement-analysis` or `product-thinking`.
- `stakeholders`: who cares about this and what each one is worried about.
- `constraints`: budget, deadline, regulation, contractual commitment.
- `existing_baseline`: for brownfield, the systems and owners already in place.
- `landscape_model`: an existing model from `architecture-modeling`, when a landscape is in scope.
- `directives`: optional natural-language instructions in the call itself.

## Required Output

One YAML artifact following `references/output-schema.md`, with these blocks always present:
`invocation`, `objectives`, `drivers`, `landscape`, `input_issues`, `metrics`, `handoff`,
`stop_condition`.

Blocks that do not apply are emitted with `applicable: false` and a `reason`. `input_issues` is never
`applicable: false`.

## Meaning Of Each Output

| Block | What it answers |
|---|---|
| `invocation` | What the skill understood from the call, and at what depth it ran |
| `objectives` | What this request is for, and how anyone would know it worked |
| `drivers` | The few things a design decision must answer to |
| `landscape` | Whether the change needs a picture, and whether the picture is good enough |
| `input_issues` | What is wrong with the input — stated, not smoothed over |
| `metrics` | How complete this analysis is, by its own numbers |
| `handoff` | What each downstream role does with this |
| `stop_condition` | Whether analysis is finished, and what was handed to `s03` unresolved |

## Normalizing Output In A Workflow Note

- Write the artifact into the `s01` note under a dedicated block. Do not create a separate file.
- Under `sdd_mode: light`, `s01` already hosts Clarify, Business Goal and Open Questions; this
  artifact sits alongside them.
- `input_issues` and `stop_condition.pushed_to_s03` become entries in the note's `open_questions`, each
  keeping its owner.
- `handoff.to_ba` carries forward into `s04` acceptance criteria.
- `handoff.to_dev` carries forward into `s05` as constraints on the approach.

## Execution Flow

1. **Read the call.** Parse any directives; record them in `invocation`. Anything you cannot
   resolve goes in `directives_unresolved` — ask once, never guess.
2. **Fix the depth.** Select the profile and record `escalation_reasons` when a hard trigger raised
   it. See Decision Rule.
3. **State objectives.** Each with a measure and a source. If an objective is your inference rather
   than someone's statement, mark `confidence: inferred` — do not present it as given.
4. **Extract drivers.** For each candidate ask: *does a design decision have to answer to this?* If
   not, it is a requirement, not a driver — leave it out.
5. **Anchor every driver.** Attach a stakeholder concern or a named constraint. A driver with
   neither is an opinion, not a driver: leave it out of `drivers` and record it in
   `input_issues.unanchored_drivers` with the reason. Never silently discard it.
   This is a different failure from step 8 — no one asked for it, versus it serves no objective.
6. **Set the threshold status.** `quantified` when a number exists. `binary` when the driver is
   satisfied or not and no number would mean anything — a regulatory duty, a contract that must not
   break. `not_quantified` when a number *should* exist but does not yet; write why — no baseline,
   needs production data, nobody has decided.
7. **State how each driver will be verified.** Every driver carries a `verification`, whatever its
   threshold status. For a `binary` driver this is the only proof there will ever be, so an empty
   `verification` there is not a gap — it is an unverifiable driver.
8. **Trace both ways.** Two breaks can happen and both go straight into `input_issues`:
   a driver that reaches no objective (`traces_to` is empty) goes to `input_issues.untraceable_drivers`;
   an objective that no driver supports goes to `input_issues.unsupported_objectives`.
9. **Work the system lens.** For each capability in scope ask which system should own it, and which
   data needs a single source of truth. Where two systems claim the same capability, or none does,
   record it in `input_issues.contested_ownership` — never settle it by picking a side yourself.
10. **Decide on a landscape.** If the profile calls for one, first write `question_answered` — the
   decision the picture has to support. If you cannot state it, do not commission a drawing.
   Otherwise commission it from `architecture-modeling` and accept it only against
   `references/landscape-quality-bar.md`.
11. **Fill the handoff blocks.** Every driver must land in at least one. Any that lands in none goes
    to `input_issues.surplus_drivers`, labelled either surplus or unfinished — say which.
12. **Compute metrics** from `references/metric-table.md` and record `evidence` for each.
13. **Check the stop condition.** Finished or not, push what is unresolved to `s03` with owners.

## Quality Rules

- A driver with no stakeholder concern and no named constraint is not a driver.
- A threshold you invented to reach 100% is worse than a declared gap. State the gap.
- `inferred` objectives must be marked. An inference presented as a statement will be trusted.
- Never name a technology, product or pattern as the answer. Constraints yes, solutions no.
- Never invent an owner. `unknown` is a finding; a guess is a false result someone will act on.
- Do not fill blocks owned by `ta`. Disagreement with its output goes in `input_issues`.
- Every metric carries `formula`, `value`, `evidence`, `threshold` and `calibration`. Missing any one
  fails the gate.
- Read metrics in pairs — see the pairing table in `references/metric-table.md`.

## Decision Rule

**Profile, hard escalation, directive handling and format selection are defined once in
`references/invocation-rules.md`.** They are identical for `sa` and `ta`; do not restate them here,
and do not apply a local variant.

Rules specific to this skill:

**A requirement is not a driver.** For every candidate ask whether a design decision has to answer
to it. If nothing about the design would change, it is a requirement — leave it out and let `s04`
carry it.

**An inferred objective is marked, never presented as given.** When nobody stated the objective and
you derived it, set `confidence: inferred`. An inference read as a statement gets trusted.

**Constraints yes, solutions no.** When you find yourself naming a technology, a product or a
pattern, convert it back into the constraint that made you think of it and stop there. The same rule
binds the system lens: state that a capability needs one owner, not which system should be it.

## Completion Conditions

- Every block in the schema is present; non-applicable ones carry a reason.
- Every driver has an anchor, a threshold status that fits what it is, and a `verification`.
- Traceability runs both ways, with every break recorded in `input_issues`.
- Every driver appears in at least one handoff block, or in `input_issues.surplus_drivers`.
- Every metric has `formula`, `value`, `evidence`, `threshold` and `calibration`; calibration remains
  `uncalibrated` until measured against delivery data.
- If a landscape was produced, `question_answered` is stated and all eight quality checks are counted.
- `stop_condition` is decided, and every item pushed to `s03` has an owner.
- No technology, product or pattern is named as the answer anywhere in the output.

## References

- `references/output-schema.md` — the full artifact schema and the rules binding it together.
- `references/metric-table.md` — the ten metrics, their formulas and the pairing rules.
- `references/block-ownership.md` — which blocks belong to `sa`, to `ta`, or to both.
- `references/landscape-quality-bar.md` — the eight checks a landscape must pass to be accepted.
- `references/visual-encoding.md` — which visual channel may carry which attribute, decided before drawing.
- `references/example.md` — one complete filled artifact, showing quantified, binary and not_quantified drivers side by side.
- `references/invocation-rules.md` — directive grammar, profile selection, hard escalation and format rules.
