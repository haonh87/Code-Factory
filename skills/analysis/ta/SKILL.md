---
language: en
name: ta
description: Turn a product or change request into technical architecture drivers — quality attribute scenarios with numeric thresholds, technical constraints, integration realities and legacy limits — each driver anchored to a stakeholder concern or a named constraint, given a threshold or an explicit reason it has none, and mapped to a handoff block for DEV, QC and DevOps. Use at steps s01 to s04, before acceptance criteria are locked and before any technical approach is chosen. Runs standalone from a raw request; output of requirement-analysis, product-thinking or the sa skill is optional supplementary input. Does not choose a technical approach, a stack or a pattern, does not decide domain boundaries, does not design a schema, does not review code, and does not build architecture models or draw views.
---

# TA — Technical Architect Lens

> Vietnamese: SKILL.vi.md

Turn a request into the technical constraints a design will have to live inside, stated as numbers,
and hand each one to the role that has to satisfy it.

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

- Turn quality wishes into quality attribute scenarios with numeric thresholds.
- Name the technical constraints that bound any future design: existing contracts, runtime limits,
  data ownership, operational commitments.
- Surface integration reality — what already talks to what, over which mechanism, owned by whom.
- Surface legacy limits that will constrain the approach before anyone proposes one.
- Give every driver a threshold, or an explicit reason it has none.
- Report input_issues in the input rather than smoothing over them.
- Hand DEV, QC and DevOps a block each can act on without reading the rest.
- Measure the analysis with the metrics in `references/metric-table.md` and publish the numbers.

## Position In The Workflow

- Runs across `s01` to `s04`, ending before `s04` locks acceptance criteria.
- Feeds `s04`: quality attribute thresholds become testable criteria, `input_issues` feeds the `DoR`
  verdict.
- **Feeds `s05` but never replaces it.** `handoff.to_dev` is the constraint envelope
  `system-design` must design inside. Choosing what goes in that envelope is `s05`, not here.
- Pairs with `sa`, which covers the business lens of the same request. Ownership of each output
  block is fixed in `references/block-ownership.md`.
- Independent of the BA lane and of `sa`. It reads their output when present, runs without it when
  not.

## When To Use

- Quality expectations exist only as prose — "fast", "highly available", "must scale".
- A change touches an integration and nobody can name the contract owner or the failure behaviour.
- Legacy constraints are known in people's heads but written nowhere.
- A design decision is about to be made and the technical envelope has never been stated.
- DEV, QC or DevOps keep discovering constraints late, during implementation or rollout.

## Out Of Scope

- **Does not choose a technical approach, stack, pattern or technology**; that is `system-design` at
  `s05`. This is the closest boundary and the easiest to cross — naming a solution in the output is
  a issue in this skill.
- Does not decide domain modules or bounded contexts; that is `domain-architecture`.
- Does not design schemas, tables or indexes; that is `database-design`.
- Does not review code or diffs; that is `code-scan-review` and `review-discipline`.
- Does not restate or normalise requirements; that is `requirement-analysis`.
- Does not run product discovery; that is `product-thinking`.
- Does not build architecture models and does not draw views; that is `architecture-modeling`. This
  skill decides whether a landscape is needed and accepts or rejects it against
  `references/landscape-quality-bar.md`.
  **`architecture-modeling` is an optional dependency and is not shipped with this pack.** When it
  is not installed, do not draw anything yourself and do not skip the question: still decide whether
  a landscape is needed, record that decision in `landscape`, and report the missing capability in
  `input_issues`. See `references/landscape-quality-bar.md` for the exact fallback.
- Does not fill blocks owned by `sa` — `objectives` and `handoff.to_ba`. `handoff.to_dev` is shared:
  fill the technical constraints, leave the boundary constraints to `sa`. See
  `references/block-ownership.md`.
- Does not measure people. Every metric here is about the artifact.

## Minimum Input

- `request`: the raw ask, in whatever form it arrived. This alone is enough to start.

Everything below is optional and improves the result when present. None of it is a blocker; a
missing item is recorded, not waited for.

- `sa_output`: the `sa` artifact for the same request, when it exists.
- `ba_artifacts`: output of `requirement-analysis` or `product-thinking`.
- `existing_baseline`: systems, owners, runtimes and contracts already in place.
- `current_measurements`: today's latency, throughput, error rates, data volumes.
- `operational_commitments`: SLOs, maintenance windows, regulatory retention.
- `landscape_model`: an existing model from `architecture-modeling`.
- `directives`: optional natural-language instructions in the call itself.

## Required Output

One YAML artifact following `references/output-schema.md`, with these blocks always present:
`invocation`, `objectives`, `drivers`, `landscape`, `input_issues`, `metrics`, `handoff`,
`stop_condition`.

`objectives` and `handoff.to_ba` are owned by `sa`; emit them with `applicable: false` and
`reason: "owned by /sa"`. Blocks that do not apply are emitted with `applicable: false` and a
reason. `input_issues` is never `applicable: false`.

## Meaning Of Each Output

| Block | What it answers |
|---|---|
| `invocation` | What the skill understood from the call, and at what depth it ran |
| `objectives` | Not filled here — owned by `sa` |
| `drivers` | The quality attributes, technical constraints and integration realities a design must satisfy |
| `landscape` | Whether the change needs a picture, and whether the picture is good enough |
| `input_issues` | What is wrong or missing in the technical input — stated, not smoothed over |
| `metrics` | How complete this analysis is, by its own numbers |
| `handoff` | What DEV, QC and DevOps do with this |
| `stop_condition` | Whether analysis is finished, and what was handed to `s03` unresolved |

## Normalizing Output In A Workflow Note

- Write the artifact into the `s01` note under a dedicated block. Do not create a separate file.
- When `sa` has already written its block, add yours alongside it; do not merge or edit theirs.
- `input_issues` and `stop_condition.pushed_to_s03` become entries in the note's `open_questions`, each
  keeping its owner.
- `handoff.to_dev` carries forward into `s05` as the constraint envelope for the approach.
- `handoff.to_qc` carries forward into `s04` acceptance criteria and into the `s08` test strategy.
- `handoff.to_devops` carries forward into runtime and rollout planning.

## Execution Flow

1. **Read the call.** Parse any directives; record them in `invocation`. Anything you cannot
   resolve goes in `directives_unresolved` — ask once, never guess.
2. **Fix the depth.** Select the profile and record `escalation_reasons` when a hard trigger raised
   it. See Decision Rule.
3. **Read `sa` output if it exists.** Use it as context. Do not edit it. Disagreement becomes a
   issue, not an edit.
4. **Write quality attribute scenarios.** For each quality wish, state the stimulus, the condition
   and the measurable response. "Reliable" is not a scenario; "no more than 5 failed orders per
   10,000 during a node restart" is.
5. **Name technical constraints.** Existing contracts that cannot break, runtime limits, data
   ownership, operational commitments. Each with a source.
6. **Map integration reality.** What talks to what, over which mechanism, owned by whom, and what
   happens when it fails. An integration with no named failure behaviour is an issue.
7. **Anchor every driver** to a stakeholder concern or a named constraint. Neither means it is a
   preference, not a driver: leave it out of `drivers` and record it in
   `input_issues.unanchored_drivers` with the reason. Never silently discard it. This is a different
   failure from step 9 — no one asked for it, versus it serves no objective.
8. **Set the threshold status.** `quantified` when a number exists. `binary` when the driver is
   satisfied or not and no number would mean anything — a regulatory duty, a contract that must not
   break. `not_quantified` when a number *should* exist but does not yet; where a baseline does not
   exist, say so — that is a finding worth having.
   Every driver also carries a `verification`, whatever its threshold status. For a `binary` driver
   that is the only proof there will ever be.
9. **Trace.** Every driver must reach an objective. A driver that reaches none — `traces_to` is
   empty — goes to `input_issues.untraceable_drivers`. When `sa` has not run, objectives may be inferred from
   the request; mark them `inferred` and still leave the `objectives` block to `sa`.
10. **Decide on a landscape.** If the profile calls for one, first write `question_answered` — the
    decision the picture has to support. If you cannot state it, do not commission a drawing.
    Otherwise commission it from `architecture-modeling` and accept it only against
    `references/landscape-quality-bar.md`.
11. **Fill the handoff blocks** you own. Every driver must land in at least one. Any that lands in
    none goes to `input_issues.surplus_drivers`, labelled either surplus or unfinished.
12. **Compute metrics** from `references/metric-table.md` and record `evidence` for each.
13. **Check the stop condition.** Push what is unresolved to `s03` with owners.

## Quality Rules

- A quality attribute without a number is not a driver; it is a wish. Quantify it or record why you
  cannot.
- Never name a technology, product or pattern as the answer. State the constraint and stop.
- An integration with no stated failure behaviour is incomplete — timeouts, retries and fallbacks
  are part of the constraint, not part of the design.
- Never invent a measurement. If today's latency is unknown, `unknown` is the finding.
- Never invent an owner. `unknown` is a finding; a guess is a false result someone will act on.
- Do not fill `objectives` or `handoff.to_ba`. Disagreement with `sa` goes in `input_issues`.
- Every metric carries `formula`, `value` and `evidence`. Two out of three fails the gate.
- Read metrics in pairs — see the pairing table in `references/metric-table.md`.

## Decision Rule

**Profile, hard escalation, directive handling and format selection are defined once in
`references/invocation-rules.md`.** They are identical for `sa` and `ta`; do not restate them here,
and do not apply a local variant.

Rules specific to this skill:

**The `s05` line.** When you find yourself writing *how* something should be built, stop. Convert it
into the constraint that made you think so, and let `system-design` choose.

**A quality wish is not a driver until it has a number.** Either quantify it, or record why it
cannot be quantified yet. Both are results; silence is not.

**An integration is incomplete without its failure behaviour.** Timeouts, retries and fallbacks are
part of the constraint you are stating, not part of the design someone else will choose.

## Completion Conditions

- Every block in the schema is present; `sa`-owned blocks carry `reason: "owned by /sa"`.
- Every quality attribute is a scenario with a measurable response, or carries a stated reason.
- Every integration names its mechanism, its contract owner and its failure behaviour.
- Every driver has an anchor, a threshold status that fits what it is, and a `verification`.
- Every driver appears in at least one handoff block, or in `input_issues.surplus_drivers`.
- Every metric has `formula`, `value` and `evidence`, and carries `calibration: uncalibrated`.
- If a landscape was produced, `question_answered` is stated and all eight quality checks are counted.
- `stop_condition` is decided, and every item pushed to `s03` has an owner.
- No technology, product or pattern is named as the answer anywhere in the output.

## References

- `references/output-schema.md` — the full artifact schema and the rules binding it together.
- `references/metric-table.md` — the nine metrics, their formulas and the pairing rules.
- `references/block-ownership.md` — which blocks belong to `ta`, to `sa`, or to both.
- `references/landscape-quality-bar.md` — the eight checks a landscape must pass to be accepted.
- `references/visual-encoding.md` — which visual channel may carry which attribute, decided before drawing.
- `references/example.md` — one complete filled artifact, showing quantified, binary and not_quantified drivers side by side.
- `references/invocation-rules.md` — directive grammar, profile selection, hard escalation and format rules.
