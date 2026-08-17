---
language: en
---

# Unified Metric Table

> Vietnamese: metric-table.vi.md
>
> **Canonical source: `skills/analysis/sa/references/metric-table.md`.**
> `skills/analysis/ta/references/metric-table.md` is a byte-identical copy. Edit the canonical
> file, then re-copy. A `diff` between the two copies runs in the verify path; drift fails.

Every metric this skill emits is an **artifact-quality** metric. It measures the analysis output,
never the person who ran it.

## What Each Metric Row Must Carry

A metric is only complete when all five parts are present. A metric missing any part fails the
skill's own gate — this is the contract from `REQ-006`.

| Part | Meaning | Failure if missing |
|---|---|---|
| `formula` | How the number is computed, as a ratio or count | Reader cannot reproduce the number |
| `value` | The computed result on this run | Metric is decorative |
| `evidence` | Pointer to the exact rows in the output the number came from | Number cannot be audited |
| `threshold` | The declared pass target or comparison boundary | A result cannot be interpreted |
| `calibration` | Whether the threshold is calibrated against delivery data | Proposal can be mistaken for an observed standard |

## The Metrics

`calibration: uncalibrated` is mandatory on every row until thresholds are measured against real
delivery data. The thresholds below are **reasoned proposals, not industry-measured standards.**

| ID | Name | Formula | Threshold | Source |
|---|---|---|---|---|
| `M-01` | Objective traceability | drivers tracing to ≥1 objective / total drivers | 100% | competency-map A2 |
| `M-02` | Objective support | objectives supported by ≥1 driver / total objectives | 100% | competency-map A2 |
| `M-03` | Driver provenance | drivers with a stakeholder concern or a named constraint / total drivers | 100% | competency-map C1 |
| `M-04` | NFR quantification | drivers with `status: quantified` / drivers where a number is meaningful | 100% | competency-map E1 |
| `M-05` | Verification coverage | drivers with a stated measurement method / total drivers | 100% | competency-map D4, E1 |
| `M-06` | Handoff coverage | drivers mapped to ≥1 downstream block / total drivers | 100% | `REQ-017` |
| `M-07` | Open-item ownership | items pushed to `s03` carrying a named owner / total items pushed | 100% | competency-map E2 |
| `M-08` | Option discipline | direction choices with ≥1 rejected alternative and reason / total direction choices | 100% | competency-map A3 |
| `M-09` | Landscape element ownership | landscape elements with a named owner / total elements | 100% | competency-map C1 |
| `M-10` | Capability ownership clarity | capabilities in scope with exactly one owning system / total capabilities in scope | 100% | competency-map B3 |

`M-10` applies to the system lens. A capability claimed by two systems, or by none, is not a
rounding error — it is the defect that produces duplicated logic and data nobody trusts. Record it
in `input_issues.contested_ownership`; never resolve it by picking a side.

`M-04` counts only drivers where a number would mean something. A `binary` driver — a regulatory
duty, a contract that must not break — is excluded from the denominator, not counted as a failure.
Forcing binary drivers into `not_quantified` makes `M-04` unreachable forever, and a metric that can
never be met stops being read.

`M-09` applies only when the `landscape` block is `applicable: true`. When it is not, emit the row
with `applicable: false` and a reason — do not drop it. Shape stays constant; see `REQ-015`.

## Not Reaching 100% Is Allowed. Hiding It Is Not.

Several thresholds are 100%, which sounds absolute. It is not a demand that every run be perfect.
It is a demand that **every shortfall be visible**.

A driver with no numeric threshold is acceptable when the reason is stated — no baseline exists
yet, the measurement needs production data, the stakeholder has not decided. What is never
acceptable is a driver that silently lacks a threshold and is not counted against `M-04`.

The escape hatch is declaring the gap, not omitting the row. This is `REQ-012`.

## Reading Metrics In Pairs

A single metric driven to its target proves very little, and optimising one in isolation is the
fastest way to produce good numbers and bad analysis. Read each of these together:

| Metric | Read against | Why the pair matters |
|---|---|---|
| `M-01` traceability | count of drivers | Dropping inconvenient drivers raises traceability and shrinks the analysis |
| `M-04` NFR quantification | number of declared reasons | Inventing thresholds to hit 100% shows up as suspiciously few declared gaps |
| `M-06` handoff coverage | `M-08` option discipline | Forcing every driver into a handoff block hides that some were never really analysed |

## Source Conflict Rule

When `sa-ta-competency-map` and `sa-ta-skill-metrics-deep-dive` state different thresholds for the
same metric, **`sa-ta-competency-map` wins**; it is the repo's master document. The deep-dive
contributes metrics the map does not carry.

Both source documents live under `docs/`, which is git-ignored. That is precisely why this table is
copied here in full rather than referenced: a user installing this pack has the skill but not the
`docs/` tree. This file must stay self-contained — never replace a row with a pointer to `docs/`.
