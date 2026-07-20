---
language: en
---

# Merge Strategy Across The Current Workflow, Spec Kit, OpenSpec, cc-sdd, And BMAD-METHOD

> Vietnamese: sdd-merge-strategy.vi.md

This document pins how to combine the repo's current workflow with four popular AI kit/workflow sets:

- `github/spec-kit`
- `Fission-AI/OpenSpec`
- `gotalab/cc-sdd`
- `bmad-code-org/BMAD-METHOD`

Cross-reference date: `2026-04-11`.

Foundational principles:

- The repo's current workflow remains the `host workflow`.
- Do not replace the entire current workflow with an external kit.
- Only borrow the strongest layer of each kit to reduce duplication and avoid philosophy conflicts.

## Reference Sources

| Kit | Repository | What to take |
|---|---|---|
| `spec-kit` | `https://github.com/github/spec-kit` | governance, constitution, clarify/analyze/checklist mindset, phase discipline |
| `OpenSpec` | `https://github.com/Fission-AI/OpenSpec` | change-centric model, `specs/` vs `changes/`, archive lifecycle, brownfield workflow |
| `cc-sdd` | `https://github.com/gotalab/cc-sdd` | agentic implementation loop, subagent orchestration, requirements -> design -> tasks execution pattern |
| `BMAD-METHOD` | `https://github.com/bmad-code-org/BMAD-METHOD` | scale-adaptive routing, phase language, role-aware agile lifecycle, story-centric implementation, project-context |

## Main Merge Strategy

| Layer | Keep from current workflow | Borrow from `spec-kit` | Borrow from `OpenSpec` | Borrow from `cc-sdd` | Borrow from `BMAD-METHOD` | Merge decision |
|---|---|---|---|---|---|---|
| Framework workflow | `Clarify -> Business Goal -> Open Questions -> Acceptance + DoR -> Technical Approach -> Task Plan -> Implement -> Verify + DoD` | clear phase thinking | do not replace the step framework | do not replace the step framework | the `Analysis -> Planning -> Solutioning -> Implementation` phase language is used only as a reading overlay | keep the eight-step workflow as-is |
| Governance | `DoR`, `DoD`, `release`, `business_acceptance`, role signoff | constitution, checklist, quality bar, principle-driven delivery | not a primary strength | light steering may be referenced | `project-context`, planning track rules, collaboration framing | use `spec-kit` as the main source of inspiration; BMAD supports the project-context layer |
| Product artifacts | `BRD`, `SRS`, role outputs, traceability by role | tighten the template/spec checklist | a delta/change folder for the changing part | do not replace product artifacts | `PRD`/story mindset only to enrich planning, not to replace `BRD/SRS` | `BRD/SRS` remains the rollout source-of-truth |
| Change management | step note + rollout artifact | not the strongest layer | `openspec/specs/` as current truth, `openspec/changes/` as proposed change, with `archive` | not the main layer | not the strongest layer | borrow heavily from `OpenSpec` |
| Discovery | `s01-s04` already clarify business/requirement/readiness | `clarify`, `analyze`, `checklist` mindset | proposal-first for large changes | Kiro-style discovery routing | analyst/PM/UX collaboration and scale-adaptive routing | keep `s01-s04`, add helpers/checklists/routing as needed |
| Design and tasking | `Technical Approach`, `Task Plan`, traceability to requirement/AC | the `specify -> plan -> tasks` cadence | a change folder holding `design.md`, `tasks.md` | the `requirements -> design -> tasks` contract | planning track: quick flow vs full flow vs enterprise; story breakdown | the current workflow leads; BMAD helps pick planning depth |
| Implementation | `s07` follows the frozen spec/spec-change | the `/implement` command mindset | the `/apply` command mindset | subagent, per-task review, auto-debug, long-running execution | story-centric dev cycle, just-in-time context, quick-dev for small changes | `cc-sdd` is the primary reference for the execution engine; BMAD is a secondary source for the story flow |
| Verify and acceptance | `QC`, `release`, `business_acceptance`, `spec-coverage-report` | `analyze/checklist` before implement or release | `archive` after verify completes | independent review loop | test-architect/test-strategy mindset for large scope | verify still leads in the current workflow |
| Brownfield vs greenfield | one workflow with gates for both | clear feature/planning | very strong for brownfield, multi-spec update | strong for implementation-heavy work | strong for scale-adaptive planning from small to enterprise | route by work-item type rather than forcing one kit for every case |
| Tooling UX | the current skill-based workflow | the `spec-kit` command set should be referenced only | the `OpenSpec` command set should be referenced only | the `cc-sdd` command/skill set should be referenced only | the workflow/agent menu should be referenced only, not copied wholesale | keep a single internal command surface for the repo |

## Routing Rule By Work-Item Type

| Work-item type | Recommended merge strategy |
|---|---|
| new `FEATURE`, clear scope | current workflow + strong `spec-kit` + medium `BMAD`; `OpenSpec` and `cc-sdd` as needed |
| `CHANGE` on a running system | current workflow + strong `OpenSpec`, medium `cc-sdd`, light `spec-kit`, light `BMAD` |
| `REFACTOR` or complex migration | current workflow + strong `OpenSpec` + strong `cc-sdd` + medium `BMAD` |
| small `BUG`, narrow scope | condensed current workflow + `BMAD Quick Flow` mindset; no need for the full ceremony of all four kits |
| `RESEARCH` | current workflow + light `spec-kit` checklist; use `BMAD` for analyst-style exploration; use `OpenSpec` only if the research produces a clear proposed change |
| enterprise/compliance-heavy | current workflow + strong `spec-kit` + strong `BMAD Enterprise track`; `OpenSpec` for change trace; `cc-sdd` for execution |

## Applied To This Repo

| Repo component | Application decision |
|---|---|
| `BRD` and `SRS` | keep as the rollout source-of-truth artifact |
| `s01` to `s08` notes | keep as execution trace, handoff trace, and per-role evidence |
| policy/constitution | add a `spec-kit`-style principle/checklist layer; optionally add a `BMAD`-style `project-context` to hold conventions, skill level, and collaboration preferences |
| change folder | optionally add an `OpenSpec`-style `changes/<change-id>/` layer to manage proposal, design, tasks, and spec delta |
| planning depth | optionally route `Quick Flow`, `Full Flow`, `Enterprise Flow` in the `BMAD` style, but map back to the same eight steps |
| `s07-s08` execution | to increase autonomy, borrow the implementer/reviewer/auto-debug model from `cc-sdd`, plus the story-centric/quick-dev mindset from `BMAD` |
| archive | archive a change only when `DoD`, `release`, and `business_acceptance` are clear |

## What Not To Do

| Avoid | Reason |
|---|---|
| replacing the entire current workflow with `OpenSpec` | loses the strong role/signoff/product governance layer |
| replacing the entire current workflow with `BMAD` | creates two role systems, two artifact systems, and two overlapping phase layers |
| replacing `BRD/SRS` with change deltas | deltas should be the change layer, not the source of truth |
| mechanically replacing `BRD/SRS` with BMAD `PRD/story` | BMAD planning artifacts should support, not replace, the current rollout artifacts |
| copying the command surfaces of all four kits wholesale | the UX becomes confusing and semantically duplicated |
| letting an execution kit decide in place of a business gate | the implementation loop cannot replace `DoR`, `DoD`, `release`, or `business_acceptance` |

## Conclusion

The recommended model for this repo is:

- the current workflow as the `backbone`
- `OpenSpec` as the `change layer`
- `cc-sdd` as the `execution layer`
- `spec-kit` as the `governance/checklist layer`
- `BMAD-METHOD` as the `scale-adaptive routing + role-aware agile planning layer`

If you want to materialize this further, the sensible next step is to separate clearly:

- the `source-of-truth artifact`
- the `change artifact`
- the `execution trace artifact`
- the `archive protocol`

The overall target architecture to review before materialization lives at `references/target-architecture.md`.