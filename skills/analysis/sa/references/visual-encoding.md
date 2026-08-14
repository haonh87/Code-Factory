---
language: en
---

# Visual Encoding

> Vietnamese: visual-encoding.vi.md
>
> **Canonical source: `skills/analysis/sa/references/visual-encoding.md`.**
> `skills/analysis/ta/references/visual-encoding.md` is a byte-identical copy. Edit the canonical
> file, then re-copy. A `diff` between the two copies runs in the verify path; drift fails.

How visual channels are allocated **before** a landscape is drawn.

This is not the acceptance gate — that is `landscape-quality-bar.md`, which judges a finished
drawing. This file decides what each channel is allowed to mean in the first place.

> **House convention wins.** If the organisation already has a modeling or visual standard, that
> standard applies and this file is a fallback for the rules it does not cover. Never apply a
> default to a rule the house has already decided.

## The Governing Principle

Every visual channel **either carries one attribute or is held uniform**. Decorative colour is worse
than no colour: the reader spends attention decoding it before discovering there was nothing to
decode.

## Channel Ranking

The eye does not read all channels equally. This ordering decides which attribute gets which
channel.

| Rank | Channel | How it reads |
|---|---|---|
| 1 | **Position / grouping** | Immediate, no decoding |
| 2 | **Size** | Immediate, comparable |
| 3 | **Colour lightness** | Fast, and orderable |
| 4 | **Colour hue** | Fast, but **not** orderable |
| 5 | **Shape** | Needs decoding, needs a legend |
| 6 | **Line style** | Needs decoding, needs a legend |
| 7 | **Line weight** | Weak, easily confused with importance |

**Allocation law:** the question asked most often takes the highest-ranked free channel.

## The Nine Rules

### R1 — One channel, one attribute
A channel encodes exactly one attribute, consistently across every view.
- **Check:** build the `channel → attribute` table. Any channel with two rows **FAILS**.
- **Prevents:** the reader learns an encoding once and misapplies it on the next diagram.

### R2 — One attribute, one channel
No attribute occupies two channels.
- **Check:** any attribute appearing twice in the table **FAILS**.
- **Prevents:** burning a strong channel to repeat something already said — grouping by domain *and*
  colouring by domain.

### R3 — An unassigned channel is held uniform
A channel carrying no attribute must be uniform. Not "whatever the tool did".
- **Check:** for each free channel, count distinct values on the drawing. More than one **FAILS**.
- **Prevents:** decorative colour.

### R4 — Data type decides channel type

| Data | Correct channel | Wrong channel |
|---|---|---|
| **Ordinal** (lifecycle) | Lightness, one hue | Multiple hues — the eye cannot rank hues |
| **Categorical** (domain, element kind) | Position, shape, hue | Lightness — invents a rank that is not there |
| **Binary** (internal / vendor) | Border, shape | Hue — wasteful |
| **Quantitative** | Size, lightness | Hue |

- **Prevents:** multiple hues for an ordinal attribute leave the reader unable to tell which value is
  "more"; lightness for a categorical attribute makes the reader see a hierarchy that does not exist.

### R5 — Size never follows layout
Size either encodes an attribute deliberately or is absolutely uniform.
- **Check:** measure the boxes. Differing sizes with no attribute to explain them **FAIL**.
- **Prevents:** a long name makes a bigger box, and the reader reads "more important".
- **Correct fix:** wrap the text. Never grow the box.

### R6 — No channel carries decision-critical information alone
Anything that changes a decision needs a text fallback.
- **Check:** convert to greyscale and simulate colour-vision deficiency. Can the decision still be
  made?
- **Prevents:** information lost in print; 8% of men cannot separate common hue pairs.
- **Note:** a single-hue lightness ramp already satisfies this — the label is still required.

### R7 — Legend budget: 5 rows
- **Check:** count legend rows. More than five **FAILS**.
- **Prevents:** over-encoding. A reader who looks up at the legend more than twice abandons the
  drawing.

### R8 — Running out of channels means the wrong view, not the wrong palette
This is the most important rule and the one most often skipped.

When another attribute needs encoding and no channel is free, **do not look for an eighth channel**.
It means one drawing is being asked to answer two questions.
- **Check:** count the decisions this drawing serves. More than one **FAILS**.
- **Fix:** split into two views derived from the same model.
- **Prevents:** exactly the mechanism that produces the eighty-box diagram nobody opens.

> Channel scarcity is a **signal**, not a problem to engineer around.

### R9 — Precedence when rules conflict

```
1. The organisation's existing convention   ← beats everything
2. Accessibility requirements (R6)          ← never traded away
3. This rule set
4. Tool defaults                            ← loses to everything
```

## The Lifecycle Ramp

`lifecycle` is ordinal — how much future a system has — so by R4 it takes lightness on a single hue.

| Value | Light surface | Text | Dark surface |
|---|---|---|---|
| `invest` | `#0d366b` | white | `#184f95` |
| `tolerate` | `#1c5cab` | white | `#2a78d6` |
| `migrate` | `#3987e5` | black | `#5598e7` |
| `eliminate` | `#86b6ef` | black | `#9ec5f4` |

Both directions were run through a palette validator: lightness monotone, adjacent gaps ≥ 0.06,
lightest step clears the surface at 2.06:1 (light) and 2.15:1 (dark), hue spread ≤ 4°.

**Why one hue beats four colours here.** Greyscale printing is free — a monotone lightness ramp *is*
a grey ramp. Colour-vision deficiency is free — with one hue there is no hue pair to confuse, and the
information lives in lightness, which every form of CVD preserves.

## Current Allocation

| Channel | View A — Business Owner | View B — team |
|---|---|---|
| Position / grouping | **domain** | **tags** |
| Size | *uniform* | *uniform* |
| Lightness | **lifecycle** | *uniform* |
| Hue | *uniform — one blue* | *uniform* |
| Shape | *uniform — one shape* | **element kind**, max 3 |
| Line style | *technical relations not drawn* | **sync / async / optional** |
| Border | *uniform* | **internal / vendor** |
| Line weight | *uniform* | *uniform* |

View B deliberately does **not** put `lifecycle` on lightness. The team asks "if I change this, what
breaks", not "which system is being retired". Encoding lifecycle there would be R8 in reverse:
smuggling another question's information into this view.

## Compliance Check

```
1. Build the channel → attribute table
2. R1: any channel with two rows?        → FAIL
3. R2: any attribute on two channels?    → FAIL
4. R3: every free channel uniform?       → FAIL if not
5. R4: data type matches channel type?   → FAIL if not
6. R5: is every size difference explained? → FAIL if not
7. R6: greyscale + CVD simulation        → can the decision still be made?
8. R7: count legend rows                 → more than 5 FAILS
9. R8: how many decisions does it serve? → more than 1 FAILS, split the view
```

Steps 1–6 and 8 are mechanical when the drawing is generated from a model. **Steps 7 and 9 need a
person.**

## Not Verified

- The **channel ranking** draws on perception research into visual variables, but the exact order
  differs between sources and depends on the task. Treat it as strong guidance, not a constant.
- **The nine rules are a set assembled here**, not quoted from a published standard. R6 follows
  accessibility requirements and R9 follows `diagram-quality.md`; the other seven are derived from
  the governing principle.
- **The 5-row legend budget is a proposed threshold**, not a measured one.
- The lifecycle **ordering** — `invest` highest, `eliminate` lowest — is one reading. An organisation
  that treats `migrate` as more urgent than `tolerate` must reorder the ramp.
