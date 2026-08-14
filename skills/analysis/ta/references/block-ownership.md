---
language: en
---

# Block Ownership

> Vietnamese: block-ownership.vi.md
>
> **Canonical source: `skills/analysis/sa/references/block-ownership.md`.**
> `skills/analysis/ta/references/block-ownership.md` is a byte-identical copy. Edit the canonical
> file, then re-copy. A `diff` between the two copies runs in the verify path; drift fails.

`sa` and `ta` sit at the same point in the chain and emit the same schema. Without an ownership
rule they produce two overlapping documents and the reader has to reconcile them. This file is the
rule.

## The Rule

Every block has exactly one of three ownership modes:

| Mode | Meaning |
|---|---|
| `sa` | Only `sa` fills it. `ta` emits the block with `applicable: false, reason: "owned by /sa"` |
| `ta` | Only `ta` fills it. `sa` emits the block with `applicable: false, reason: "owned by /ta"` |
| `shared` | Both fill it, each contributing **only its own lens** |

A skill filling a block it does not own is an issue, not a nice-to-have extra. It is the failure
mode `REQ-002` exists to prevent.

## Ownership Table

| Block | Owner | `sa` contributes | `ta` contributes |
|---|---|---|---|
| `invocation` | `shared` | Its own parsed directives and profile | Its own parsed directives and profile |
| `objectives` | `sa` | Business objectives, value, measure, source | — |
| `drivers` | `shared` | `business_goal`, `constraint`, `regulatory`, `system_boundary`, `data_ownership` kinds | `quality_attribute`, `integration` kinds |
| `landscape` | `shared` | Whether a business-facing view is needed, domain grouping | Whether a system view is needed, integration edges |
| `input_issues` | `shared` | Input problems visible from the business lens | Input problems visible from the technical lens |
| `metrics` | `shared` | Metrics over blocks it filled | Metrics over blocks it filled |
| `handoff.to_ba` | `sa` | Acceptance criteria seeds with thresholds | — |
| `handoff.to_dev` | `shared` | Boundary constraints: which system owns what, which seams must not move | Technical constraints and contracts not to break |
| `handoff.to_qc` | `shared` | Objective-level success measures | Per-driver verification methods |
| `handoff.to_devops` | `ta` | — | Availability, scaling, rollback, environment drivers |
| `stop_condition` | `shared` | Whether its own lens is exhausted | Whether its own lens is exhausted |

## Running Both On One Work Item

The expected sequence is `sa` first, then `ta`, because technical drivers are easier to judge once
objectives exist. That is a convenience, not a dependency — `REQ-019` requires each skill to run
standalone from a raw request.

When `ta` runs after `sa`, it **reads** the `sa` output as optional supplementary input. It still
does not write `sa`-owned blocks. It may raise an issue against them: an objective it believes is
untestable belongs in `input_issues`, not in an edited `objectives` block.

## Two Boundaries That Are Easy To Get Wrong

**A quality attribute with a business threshold is still `ta`.** "Checkout must complete in under
two seconds because customers abandon carts" sounds like business language, but the driver is a
quality attribute. `sa` owns the objective it serves — cart abandonment — and `ta` owns the latency
driver. Both exist; they are different rows.

**A cost constraint is `sa` even when it is expressed in infrastructure terms.** "We cannot afford a
second database cluster" is a commercial constraint that happens to name technology. `sa` owns it.
`ta` owns what that constraint implies for the design.

## Self-Check Before Emitting

- Every block I filled appears with my name or `shared` in the table above.
- For blocks I do not own, I emitted `applicable: false` with a reason — I did not omit them.
- On `shared` blocks, nothing I wrote belongs to the other lens.
- Anything I disagreed with in the other skill's output went into `input_issues`, not into an edit.
