# Contributing to Code-Factory

Thank you for considering a contribution to **Code-Factory** — *The Charter for Governed AI Delivery*.

Code-Factory is an **AI Agent Ops** kit: policy, workflow, skills, and adapters that keep AI coding agents governed. The core operating model is **the agent proposes, the human approves, the runtime enforces**. Contributions must respect that model.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](./LICENSE) that covers this project.

## What makes a good contribution

Code-Factory ships **skills** as first-class artifacts. A good skill is:

- **Specific** — actionable steps the agent can follow, not vague advice.
- **Verifiable** — a clear exit criteria with evidence requirements, so "done" is not a feeling.
- **Battle-tested** — based on a real workflow that has been run, not a theoretical one.
- **Minimal** — only what is needed to guide the agent; no speculative abstraction.

A good workflow or governance change is:

- **Gated** — proposed through the 8-step workflow chain (`s01` Clarify → `s08` Verify + DoD), not dropped straight into production text.
- **Smallest-correct** — if a smaller change meets the acceptance criteria, prefer it over opening a new boundary, layer, service, framework, schema split, queue, cache, or config surface.
- **Preserved in semantics** — governance hard rules carry exact wording. A translation or rewording of a hard rule is a governance change, not a wording tweak; flag it for independent review.

## Sign-off authority

This project follows a **role-aware governance model**. Not every gate can be self-approved by the contributor or the agent.

- For which role can pass which gate (`spec`, `contract`, `DoR`, `approach`, `foundation`, `task plan`, `UAT`, `DoD`, `release`, `business acceptance`), see the governance role model: [`project-context/governance-role-model.md`](./project-context/governance-role-model.md).
- For when a governance exception or waiver is allowed and who can approve it, see [`project-context/governance-decision-model.md`](./project-context/governance-decision-model.md).

If you are contributing as the repo owner acting in a role (for example `developer`), record the role code in `role_signoffs` / `gate_reviews` — the validator only accepts the role codes `po`, `ba`, `designer`, `developer`, `qc`, `devops`. Record the real human identity in the note prose, not in the role-code field.

## How to propose a change

1. **Clarify first.** Open an issue or a work-item restating the request, the scope draft, and the open questions. Do not start from an implementation.
2. **Route through the workflow.** Use `wfc scaffold --work-item <slug>` to materialize the work item, then walk `s01` → `s08`. The runtime enforces `spec/design before code`.
3. **Keep the validator green.** Run `npm run validate:workflow -- --workflow-root work-items` before you hand off. Naming, governance, and the change layer are all checked.
4. **Text files are UTF-8.** No BOM, no mojibake. English is the default and the operative source of truth; Vietnamese is retained as a supplementary reference (`.vi.md` siblings and `docs/vi/`).
5. **Open a pull request** against `main` with the work-item notes and the verification evidence. Do not self-merge; a human reviews and approves.

## Quick commands

```bash
npm run validate:workflow -- --workflow-root work-items          # naming + governance
npm run validate:workflow:change -- --workflow-root work-items --project-root .
npm run scaffold:workflow -- --work-item <slug>                  # scaffold a work item
npm run scaffold:workflow-step -- --work-item <slug> --step sNN  # scaffold a step note
npm run workflow:status                                          # current status
```

## Code of conduct

Be precise, be honest about evidence, and do not declare `done` before the Definition of Done gate has a verdict. The same rule applies to agents and to humans.

— *The agent proposes; the human approves; the runtime enforces.*