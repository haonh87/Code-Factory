---
title: Community Pack Positioning — Code-Factory public release
date: 2026-06-23
language: en
status: proposal
decision_owner: human (brand gate)
current_release: workflow-bundle v2.1.1
---

# Community Pack Positioning — Proposal

> Vietnamese: community-pack-positioning.vi.md

> This is a **proposal** (AI proposes, human approves). Locking the name / tagline / positioning for the public release is a **human-controlled brand gate** — I only propose, I do not lock it unilaterally.
> After the human locks it, the `public-release` work item is opened and the chain runs `s04→s05→s06→s07`.

## 1. Product soul

Code-Factory is not a **skill pack** or a **spec template** — it is a **governed delivery runtime**:

- An eight-step chain `s01 Clarify → s08 Verify + DoD` with a state machine.
- `AI proposes, human approves` at **every gate** (Spec, Contract, DoR, Approach, Foundation, Task Plan, UAT, DoD, Release, Business Acceptance).
- **Enforced** by the `wfc` CLI + hooks + a validator — not a recommendation the agent follows voluntarily.
- Overlays: governance, SDD, role sign-off, DevOps lanes (container → platform → CI/CD), brownfield/greenfield discipline.

→ **The moat is the governance runtime.** Skills can be copied; a validator plus human-controlled gates cannot.

## 2. Positioning comparison (public-facing)

| Aspect | superpowers | spec-driven (spec-kit) | **Code-Factory** |
|--------|-------------|------------------------|------------------|
| Essence | skill pack that raises capability | workflow spec→plan→tasks→code | governed delivery chain + validator runtime |
| Enforcement | suggested (agent self-complies) | structural (spec is the SOT) | **enforced** (`wfc` + hooks + state machine) |
| Human role | advisory; the agent decides | the spec | **explicit human-controlled gates** |
| Weight | light | medium | heavy (governance, role sign-off, SDD, DevOps lanes) |
| Best for | individuals wanting a more capable agent | teams wanting disciplined specs | teams wanting AI-produced code that is **controlled and auditable** |

## 3. Name + tagline proposals (3 combos, pick one)

### Combo A — Keep Code-Factory, add Charter as tagline (recommended)
- **Repo:** `Code-Factory`
- **Public pack:** `code-factory` (npm), CLI `wfc`
- **Tagline:** *"Code-Factory — The Charter for Governed AI Delivery"*
- **One-liner:** *"AI proposes. Human approves. Code ships."*
- ✅ Keeps the internal brand, reuses the familiar `wfc`.
- ⚠️ "code-factory" is common on GitHub/npm → SEO is harder; disambiguate with the "Charter" tagline.

### Combo B — Spin out the proper name "Charter" for the public pack
- **Source repo:** `Code-Factory` (internal)
- **Public pack:** `charter` / `charter-cli` (npm), CLI `wfc`
- **Tagline:** *"Charter — governed delivery for AI coding agents"*
- ✅ More ownable than "code-factory"; "charter" continues the existing `constitution` + `project-context` concepts.
- ⚠️ "charter" also collides — check npm/USPTO; may need `charter-cli` or `charterflow`.

### Combo C — Craft/workshop name (Forge family)
- **Public pack:** `forge` / `agentforge` / `smithy`
- **Tagline:** *"Forge — ship AI code with discipline"*
- ✅ Short, evokes "a mold-casting workshop", memorable.
- ⚠️ Many collisions: Atlassian Forge, GitForge, Google Anvil → highest risk of the three combos.

**Recommendation:** **Combo A** for the early stage (lowest risk, reuses assets), switch to **Combo B** when you want to own a distinct brand after a trademark check.

## 4. Elevator pitch (use everywhere)

> Code-Factory is a **governed delivery workflow** for AI coding agents: an eight-step chain from Clarify → Verify + DoD, where every gate is **human-controlled** and **enforced by the `wfc` CLI + hooks** — not a skill pack that recommends, but a runtime that forces the agent to follow discipline before it touches production code.

## 5. Narrative arc

> "Superpowers give the agent **capability**. Spec-driven gives it **structure**. Code-Factory gives it **discipline** — and discipline is the one thing an agent will not produce on its own."

## 6. README hero structure (public repo)

1. **One-line hook:** *"Stop your AI agent from shipping unreviewed code."*
2. **The problem (three bullets):**
   - The agent takes the shortest path and self-declares `done`.
   - It skips tests/spec/review → production risk.
   - There is no audit trail of who approved what.
3. **The difference:** the comparison table in section 2.
4. **Quick start (three commands):**
   ```bash
   npx wfc install --mode claude --scope global
   wfc init
   wfc scaffold --work-item my-first-feature
   ```
5. **Proof:** gate-flow screenshot, a materialized work-item example, the `v2.1.1` badge, "36 managed skills, 8-step chain, human-controlled gates".
6. **Starter vs Full pack:** (see section 7).

## 7. Community pack tiers

| Tier | Contents | For |
|------|----------|-----|
| **Starter** | `wfc` + the 8-step chain + three core skills (clarify, approach, DoD) | individuals / greenfield projects |
| **Standard** | + governance overlay + TDD/review discipline + instincts | small teams |
| **Full** | + SDD overlay + DevOps lanes + role sign-off + strict profile | enterprise / regulated teams |

- Clearly separate **prescriptive vs optional** — newcomers enable Starter, mature teams enable the `strict` profile (`CF_HOOK_PROFILE=strict`).
- Document `CF_HOOK_PROFILE=minimal|standard|strict` so onboarding is not overwhelmed by heavy governance.

## 8. Launch channels

- **GitHub:** repo + topic tags `ai-agent`, `agent-ops`, `llm-workflow`, `claude-code`, `codex`, `spec-driven`, `governance`, `ai-coding`.
- **Anchor blog post:** *"Why superpowers isn't enough: the case for governed AI delivery"* — compare philosophies, do not disparage.
- **Three-minute demo video:** one feature request → the agent tries to implement → the gate blocks → the human approves → ship.
- **Listings:** Awesome Claude Code, Awesome Codex, Trendshift, Product Hunt.
- **MCP/skill marketplace:** publish as a plugin (the plugin marketplace pattern used by `addyosmani/agent-skills`).

## 9. Legal / trademark notes (check before locking)

- [ ] Check `github.com/topics/<name>` + a full GitHub text search.
- [ ] Check the npm registry for `<name>` and `<name>-cli`.
- [ ] Check the USPTO / EUIPO trademark databases.
- [ ] Google `"<name>" ai workflow` / `"<name>" agent`.
- [ ] Rate collision risk: "code-factory" (high), "charter" (medium), "forge" (very high).
- [ ] Command names must be accent-free and internationally pronounceable (`wfc`, `charter` are fine).
- [ ] Distinguish **repo name** (Code-Factory) vs **pack name** (charter/code-factory) vs **CLI** (`wfc`) — they need not match.

## 10. Next human action

1. The human reviews this proposal and **locks one name + tagline combo** (A / B / C).
2. Run the trademark checklist in section 9.
3. Open the `community-pack-release` work item via `wfc scaffold --work-item community-pack-release`.
4. Run `s04 Acceptance + DoR` → `s05 Technical Approach` (packaging, npm publish surface, README hero) → `s06 Task Plan` → `s07 Implement` → `s08 Verify + DoD`.
5. `s08` must cover release readiness + handoff to the deploy lane (npm publish + GitHub release).

## Traceability
- soul (governance runtime) ← moat (enforce vs suggest) ← positioning table ← naming combo → README hero → launch.
- governance: the brand gate is human-controlled; this proposal does not open an implementation path.