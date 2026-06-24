---
language: en
---

# Skills Taxonomy

> Vietnamese: README.vi.md

This document explains the `skills/` directory structure so the repo is clearer to publish.

## Main Groups

- `skills/orchestration/`: hosts the authority entrypoint, the workflow backbone and the main coordination flow.
- `skills/analysis/`: skills that clarify requirements, business intent and technical options.
- `skills/architecture/`: skills that lock boundaries, schema, domain and frontend structure.
- `skills/delivery/`: skills for planning, implementation, testing, review and DevOps delivery.
- `skills/guardrails/`: skills for contract, readiness, audit, quality gates and behavioral guardrails for a coding agent.
- `skills/obsidian/`: skills that materialize artifacts as Obsidian Markdown, Bases and Canvas.

## Top-Level Integration Skills

- `skills/notebooklm/`: an integration skill by design, top-level because it is an external tool capability used across many phases, not belonging solely to `analysis`, `delivery` or `guardrails`.

Rules:

- top-level is only for integration skills or tool-facing skills used across multiple groups
- ordinary business skills must live inside a clear taxonomy group
- the final folder of a skill must match the `name` in the `SKILL.md` frontmatter

## Conventions For Orchestration Skills

- `orchestration` can hold multiple blocks, not just a single workflow backbone.
- a meta-skill entrypoint such as `workflow-governance-router` is used to lock the step, gates and action rights first.
- a workflow backbone such as `codex-workflow-chain` keeps the `s01 -> s08` chain and detailed governance rules.
- an orchestration skill does not replace step skills; it only routes and locks the right boundary before step skills run.

## Publish Rules

- use `orchestration/codex-workflow-chain/SKILL.md` as the standard shape for skill docs
- do not create two skills with the same `name`
- if a skill is an external integration, state that clearly in its `description` or the group README