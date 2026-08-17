---
name: artifact-governance
description: Decide where a piece of content belongs before writing it, so documentation volume stays a function of the work rather than of how many roles and skills contribute. Use before creating or editing any workflow artifact, and whenever several roles contribute to the same step. Answers three questions - does this fact already have an owner, does this contribution earn its own file, and which root owns this content layer. Does not format content, does not choose filenames, and does not enforce.
language: en
---

# Artifact Governance

> Vietnamese: SKILL.vi.md

Adding a role should add a perspective, not a file. Adding a skill to a step should add a
section, not another copy of the context that step already holds.

This skill runs before any artifact is written. It is a placement decision, not a writing style.

## When To Use

- Before creating any file under `work-items/`, `product-specs/`, `changes/`, or `docs/`.
- Before adding a block to a step note.
- Whenever more than one role or skill contributes to the same step.
- When a recurring report, audit, or review is produced a second time.

Skip it for source code, tests, and configuration. Those have their own structure.

## Rule 1 — Shard by unit of work, never by contributor

A role's contribution to a step is a **section inside that step's primary note**. It is not a
file named after the role.

Precedent: BMAD-METHOD runs **nine** roles — Analyst, PM, Architect, PO, Scrum Master, Dev, QA,
UX, Orchestrator — and produces **zero** per-role files. Its sharding axis is the story, a unit
of work. Kiro fixes three files per feature, Spec Kit three, OpenSpec three to four, all
independent of how many contributors touch them.

What goes wrong without this rule is measured in `references/worked-example.md`: a schema that
carries one `role` plus a filename with no slot for a role means two workers cannot both be
represented. In this repository's own reference sample, `merge-report` claims to merge
`S07-FRONTEND-001`, an assignment whose handoff artifact does not exist and cannot exist.

## Rule 2 — One fact, one owner

Every fact has exactly one owning block. Everyone else derives it, references it, or does
without it.

Before referencing, try deleting: if a copy is derivable from its owner, it is not a candidate
for a pointer, it is a candidate for removal. Replacing stale copies with stale pointers is not
progress.

The contested fields, their owners, the reference syntax, and the reader-migration constraint
that any later deletion must satisfy: **`references/ownership-table.md`**.

## Rule 3 — Every content layer has exactly one root

| Layer | Owning root | Notes |
|---|---|---|
| Spec | `product-specs/` | Cards, BRD, SRS. Step notes reference requirement and AC ids; they never restate the text. |
| Design | `work-items/<slug>/*.s06.*` under Light, `*.s05.*` under full | |
| Plan | the same note as Design under Light | |
| Progress | `work-items/<slug>/*.s07.*` | Protocol state lives in `<slug>.work-item-report.json`, owned by the CLI. |
| Verify | `work-items/<slug>/*.s08.*` | |
| Decision | the owning step note's `## Option Analysis` / `design_decisions`; governance exceptions in `project-context/governance-exception-register.md` | |

Anything that is not one of these six layers is not a workflow artifact. It is either published
documentation, or it is scratch. Scratch is gitignored, never committed to a governed root.

### Supersede, do not accumulate

A recurring artifact — audit, review, report — has **one stable path** and is overwritten in
place. History lives in git. If a dated snapshot is genuinely needed, it goes under an
`archive/` subdirectory of its own root, never beside the canonical file.

### Verdicts on the measured collisions

Applying Rule 3 to the census findings `F1` to `F8`:

- **`docs/release/` and `docs/releases/`** conflate two layers. `docs/releases/` owns the release
  record, one file per version, historical, never superseded. The positioning and readme files
  in `docs/release/` are published documentation, not a release record; they move and the
  duplicate directory is removed.
- **Four accumulating skill-pack audit reports** violate supersede. One canonical path owns the
  audit; the dated post-fix and review files move to `archive/`.
- **Six loose repository-root files.** `AGENTS.md` and `CLAUDE.md` are install outputs of
  `wfc install`, not authored artifacts — gitignore them. `Meeting.md`, `Booking.md`, `Daily.md`,
  `Untitled.base` belong to no layer — they are scratch and leave the governed root.
- **`tmp-codex-home/`, `tmp-wfc-init-check/`** are test scratch — gitignored.

## The decision procedure

Run this before writing. Every path ends in an owning section, a registered filename, or a
refusal. **No branch returns a path you invented.**

```
You are about to write a piece of content.

1. Which of the six layers is it?
   └─ none of them
      └─ STOP. Not a workflow artifact. Scratch or published docs. Do not
         place it in a governed root.

2. Does this fact already have an owner in references/ownership-table.md?
   └─ yes
      └─ TERMINAL: write into the owning block. Do not create anything.

3. Threshold test — is any answer yes?
   a. Concurrent writers: will two actors write this at the same time, in
      separate processes or worktrees, such that one file would conflict?
   b. Independent addressability: must an external mechanism hash, sign, or
      resolve it by its own path?
   c. Independent lifecycle: created, superseded, or archived at a different
      time by a different actor than the host note?
   └─ all no
      └─ TERMINAL: a section in the step's primary note.

4. Is there a filename for it in the registered naming convention?
   └─ yes
      └─ TERMINAL: use that name, and link it from the primary note.
   └─ no
      └─ STOP. Do not invent a name. Either register the name first — a human
         decision — or fall back to a section.
```

Worked verdicts for the four runtime artifact kinds, with reasoning, are in
`references/worked-example.md` §3. All four are sections. A **step note** is the contrasting
case that answers yes to 3b, because `wfc gate approve` hashes it by path into a trusted receipt.

## What this skill does not own

Stating this matters: a governance skill with unclear edges becomes the next source of overlap.

| Concern | Owner |
|---|---|
| How content is formatted — wikilinks, callouts, frontmatter syntax | `obsidian-markdown` |
| Which filenames exist, and note templates | `wfc scaffold` and `workflow-step-definitions.js` |
| Enforcing any rule here | `wfc validate` — not yet built, see below |
| Which blocks a step requires | `codex-workflow-chain` |
| `## Work Item Protocol`, protocol state, audit events | the `wfc` CLI, generated from `<slug>.work-item-report.json`. **Never hand-write it** — the next protocol transition overwrites it. |

This skill decides only **where content goes**.

## Enforcement status

These rules are **not machine-checked yet**. They were validated by hand against a real
multi-role work item before being written down, and the enforcement checks are a later phase.

Until then a violation is invisible, which is exactly how `docs/` drifted. If you are unsure
whether a rule applies, apply it — the cost of a section that could have been a file is far
lower than a file no rule accounts for.

## Red flags

Stop if you catch any of these:

- "I'll put this in a new file and link it later."
- "This role needs its own document."
- "I'll copy the paths here so the reader doesn't have to scroll."
- "There's no rule for this, so I'll pick something sensible."
- "I'll write the summary here and keep the detail in sync manually."
- "The report already exists, so I'll add a `-v2` / dated one."
