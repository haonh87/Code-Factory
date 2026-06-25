---
title: Code-Factory — Community Release Overview
date: 2026-06-23
status: proposal
language: en
audience: community / public onboarding
parent_positioning: docs/release/community-pack-positioning.md
canonical_release: workflow-bundle v2.1.1
---

# Code-Factory

> Vietnamese: community-pack-readme.vi.md

> **The Charter for Governed AI Delivery.**
>
> *AI proposes. Human approves. Code ships.*

Code-Factory is a **governed delivery workflow** for AI coding agents. It keeps an eight-step chain — from `Clarify` to `Verify + Definition of Done` — where every gate that touches production is **human-controlled**, and where compliance is **enforced by a runtime** (`wfc` CLI, hooks, and a validator state machine) rather than left to the agent's own discipline.

It is not a skill pack that *recommends* good behavior. It is the runtime that *requires* it before the agent is allowed to write production code.

---

## Why

Modern AI coding agents optimize for the shortest path. That is great for velocity and dangerous for delivery. In practice this produces three recurring failures:

- **Premature "done".** The agent declares a task complete after a local test pass, with no evidence that acceptance criteria, regression risk, or governance constraints were satisfied.
- **Skipped specification and design.** A feature request is treated as authorization to implement immediately, bypassing acceptance criteria, technical approach, and task planning.
- **No audit trail.** There is no record of *who approved what*, *when*, or *against which criteria* — so a human reviewer cannot reconstruct how production code came to be.

Code-Factory exists to make these failures structurally impossible, not merely discouraged.

---

## What it is

| Layer | Responsibility |
|-------|----------------|
| **Authority layer** | Hard rules, hard gates, conflict resolution, safe defaults (`AGENTS.global.md`, project `CLAUDE.md`). |
| **Entry router** | A meta-skill that classifies the task, determines the current step, and blocks the implementation path until gates are open. |
| **Workflow backbone** | The eight-step chain `s01 → s08` with a state machine and detailed governance rules (`codex-workflow-chain`). |
| **Step skills** | Domain skills for analysis, architecture, delivery, guardrails, and Obsidian artifacts — invoked only after the router pins the step. |
| **Runtime + validator** | The `workflow-bundle` (`wfc` CLI), support policy, validator, and capability control that materialize, validate, and enforce workflow state. |

The agent may analyze, draft artifacts, propose options, propose approaches, propose task plans, implement, run tests, and synthesize evidence. It may **not** approve a work item, pass a gate, or declare `DONE`. Those are human-controlled, by construction.

---

## How it differs

| Aspect | Skill packs (e.g. *superpowers*) | Spec-driven (e.g. *spec-kit*) | **Code-Factory** |
|--------|----------------------------------|-------------------------------|------------------|
| Essence | Skills that raise agent capability | A spec → plan → tasks → code structure | A governed delivery chain **plus a validator runtime** |
| Enforcement | Suggested; the agent follows voluntarily | Structural; the spec is the source of truth | **Enforced** via `wfc` CLI, hooks, and a state machine |
| Human role | Advisory; the agent decides | The spec encodes intent | **Explicit human-controlled gates** with signed receipts |
| Weight | Light | Medium | Heavy — governance, role sign-off, SDD overlay, DevOps lanes |
| Best for | Individuals wanting a more capable agent | Teams wanting disciplined specs | Teams wanting AI-produced code that is **controlled and auditable** |

> *Superpowers give the agent **capability**. Spec-driven gives it **structure**. Code-Factory gives it **discipline** — and discipline is the one thing an agent will not produce on its own.*

---

## Core concepts

### The eight-step chain

| Step | Name | Purpose |
|------|------|---------|
| `s01` | Clarify | Turn a raw request into a shared understanding, draft scope, and governance context. |
| `s02` | Business Goal | Define business objective, expected value, and non-goals. |
| `s03` | Open Questions | Surface missing input, conflicts, governance blockers, and decision owners. |
| `s04` | Acceptance + DoR | Pin measurable acceptance criteria and a Definition of Ready verdict. |
| `s05` | Technical Approach | Choose the smallest sufficient approach, impacted boundaries, and a validation plan. |
| `s06` | Task Plan | Produce an execution-oriented, ordered, verifiable task plan. |
| `s07` | Implement | Make the change, with TDD for behavior changes, worktrees for large/risky change, early review, and delegation only for independent tasks. |
| `s08` | Verify + DoD | Conclude with evidence, coverage, governance compliance, and a Definition of Done verdict. |

### Human-controlled gates

A gate is considered passed **only when** all three hold: the source-of-truth artifact for that step is updated, evidence is sufficient for a reviewer, and the approver with the correct authority has signed off. The gates include `Spec`, `Contract`, `DoR`, `Approach`, `Foundation Decision`, `Task Plan`, `UAT`, `DoD`, `Release`, and `Business Acceptance`.

Approval is **explicit**. It is never inferred from a positive comment, a technical review pass, a local test pass, or the mere existence of a draft artifact.

### Enforcement, not suggestion

Compliance is checked by a runtime, not by goodwill:

- `wfc validate` — validates workflow artifacts and gate state before handoff.
- `wfc scaffold` / `wfc scaffold-step` — materializes work items and step notes with consistent naming, frontmatter, and governance blocks.
- `wfc status` — reports current step, gate status, and missing gates.
- Hooks — `PreToolUse` / `PostToolUse` / `Stop` hooks track TDD discipline, persist context, and recommend behavioral instincts.

### Overlays

- **Governance overlay** — constitution, project context, checklists, and an exception/waiver model with explicit authority.
- **SDD overlay** — spec-driven development with `BRD/SRS`, requirement IDs, spec freeze, spec change, and spec coverage when the scope demands it.
- **DevOps lanes** — `containerization-packaging`, `platform-runtime-deployment`, and `ci-cd-release` for scope that touches images, runtime deploy, promotion, and rollback.
- **Brownfield discipline** — existing systems are treated as a running baseline; the default is the *smallest sufficient delta*, and `Foundation Decision` is opened only when the change truly rewrites an architectural boundary.

---

## Quick start

Requirements: `node >= 18`, `npm >= 9`, a writable `~/.codex` or `~/.claude`.

```bash
# Install into Claude Code (global scope)
npx wfc install --mode claude --scope global

# Initialize a work items root in your project
wfc init

# Scaffold your first work item and its first step
wfc scaffold --work-item my-first-feature
wfc scaffold-step --work-item my-first-feature --step s01
```

From there, the entry router classifies any incoming coding request, pins the current step, and blocks the implementation path until the required gates are open.

---

## Packs and profiles

Three tiers let teams adopt progressively without being overwhelmed by governance on day one.

| Tier | Contents | For |
|------|----------|-----|
| **Starter** | `wfc` + the 8-step chain + three core skills (clarify, approach, DoD) | Individuals and greenfield projects |
| **Standard** | + governance overlay + TDD/review discipline + the instincts system | Small teams |
| **Full** | + SDD overlay + DevOps lanes + role sign-off + strict profile | Enterprise / regulated teams |

Hook enforcement is controlled by profile so onboarding stays calm:

| Env var | Behavior |
|---------|----------|
| `CF_HOOK_PROFILE=minimal` | All TDD hooks off — for docs-only sessions |
| `CF_HOOK_PROFILE=standard` | TDD tracking only, no blocking — for docs/refactor sessions |
| `CF_HOOK_PROFILE=strict` | TDD enforcement + tracking — default, full enforcement |

Individual hooks can be disabled with `CF_DISABLED_HOOKS=tdd-enforce,tdd-track-write`.

---

## Architecture at a glance

```
Request ─▶ workflow-governance-router ─▶ current step + missing gates
                │
                ▼
        codex-workflow-chain (s01 → s08 state machine)
                │
        ┌───────┼───────┐
        ▼       ▼       ▼
   step skills  overlays  artifacts (.md / .canvas / .base)
                │
                ▼
        wfc CLI + hooks (enforce + validate + materialize)
                │
                ▼
        Human-controlled gates ─▶ signed receipts ─▶ ship
```

The agent proposes at every layer; a human approves at every gate; the runtime refuses to let the chain advance otherwise.

---

## Public surface (v2.1.1)

- **Installable bundle** for Codex and Claude Code via `wfc install | update | status | skills`.
- **Authoring CLI** via `wfc init`, `wfc scaffold`, `wfc sdd | change | exec | plan`.
- **Agentic proposal flow** via `wfc materialize`, `wfc change-item`, `wfc work-item`, `wfc protocol`.
- **Human approval gates** for changes, work items, and workflow gate receipts, with **trusted signed receipts** outside the project root for gates that require a human.
- **Migration** from legacy state `.codex-workflow-pack.*` to `.codex-workflow-bundle.*`.

Canonical references for onboarding: tag `v2.1.1`, branch `release/v2.1.1`.

---

## What it is not

- It is **not** autonomous delivery without human approval — that is explicitly excluded from the public promise.
- It is **not** a runtime outside Codex and Claude Code in this release.
- It is **not** a backward-compatibility contract wider than the `v2.1.1` surface (legacy `workflow-contracts.config.json` and `.codex-workflow-pack.*` are kept only for smooth migration).

---

## Status and roadmap

- **Current public release:** `workflow-bundle v2.1.1`.
- **Managed skills:** 36, across analysis, architecture, delivery, guardrails, orchestration, and Obsidian.
- **Roadmap themes:** broader adapter support, hardened security scanning for skills, and a leaner Starter onboarding path.

---

## Contributing and license

Contributions are welcome. Skills should be **specific** (actionable steps, not vague advice), **verifiable** (clear exit criteria with evidence requirements), **battle-tested** (based on real workflows), and **minimal** (only what is needed to guide the agent).

See the repository for `LICENSE`, `CONTRIBUTING`, and the governance role model for sign-off authority.

---

*Code-Factory — governed delivery for AI coding agents. The agent proposes; the human approves; the runtime enforces.*