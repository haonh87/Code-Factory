---
language: en
---

# Project Context

This document describes the `governance context` currently in effect for the repo.

## Identity

- Project: `AI Agent Ops / Code-Factory`
- Current goal: standardize workflows, skills, MCP and orchestration toward a `Codex-first` direction
- Foundational governance sources:
  - `project-context/constitution.md`
  - `project-context/governance-decision-model.md`
  - `project-context/governance-role-model.md`
  - `memory-bank/`
  - `policies/codex/AGENTS.global.md`
  - `skills/orchestration/codex-workflow-chain/references/workflow-chain.md`

## Default Governance Setup

- Default `governance_ref`:
  - `project-context/project-context.md`
- Default `governance_profile`:
  - `default`
- Default `checklist_refs`:
  - `project-context/checklists/default.md`

## When To Raise The Profile

Move to `strict` when one or more of the following signals are present:

- the change touches many boundaries or many role sign-offs
- there is migration, compatibility risk or rollback risk
- there is packaging/runtime/release impact
- there is external integration or stateful data impact
- reviewer coverage tighter than usual is needed

Move to `regulated` when one or more of the following signals are present:

- a clear audit trail or approval chain is needed
- evidence or exceptions must be kept across many steps
- there are policy/compliance/control rules outside the usual delivery team

## Required Reviews By Scope

| Signal scope | Minimum review or owner to have |
|---|---|
| significant business-rule change | `po`, `ba` |
| UX/UI or accessibility outcome | `designer`, `qc` |
| technical approach or main code path | `developer` |
| data change, migration or compatibility | `developer`, `qc` |
| packaging, runtime, release, rollback | `devops`, `qc` |

## Forbidden Shortcuts

- Skipping `Clarify` or `Acceptance + DoR` just to go fast to code.
- Leaving an official conclusion only in NotebookLM, search results or a chat log without normalizing it into the source-of-truth artifact.
- Changing behavior outside the spec without recording a `spec-change` or `governance-exception` when needed.
- Closing `DoD` or `release` when evidence is still missing without stating the limitation.
- Creating a parallel workflow that bends the 8-step backbone.
- Silently renaming a step, slug or standard artifact naming without updating policy and references at the same time.

## How To Fill Metadata In A Workflow Note

- `governance_ref`:
  usually points to `project-context/project-context.md`; only point directly at `constitution.md` when the step needs to emphasize foundational principles over operational context.
- `governance_profile`:
  choose `default`, `strict`, `regulated` or `custom` per `governance-decision-model.md`.
- `checklist_refs`:
  point to the checklist profile being applied; you may add a work item's own checklist per the rules in `governance-decision-model.md`.
- `governance_status`:
  use the standard enum `ALIGNED|CHECKS_PENDING|EXCEPTION_RECORDED|WAIVER_APPROVED|BLOCKED|NOT_APPLICABLE` per the state model in `governance-decision-model.md`.

## Operational Notes

- If the scope is only a small change, still use the `default` profile instead of leaving it empty.
- If a `governance-exception` stays open into step 8, add it to `project-context/governance-exception-register.md`.
- `approved_by` for a waiver or exception must follow the authority in `project-context/governance-role-model.md`.
- The trigger to open a `governance-exception` and the conditions to update the register must follow `project-context/governance-decision-model.md`.