---
language: en
---

# Workflow Pack Audit Checklist

> Vietnamese: checklist.vi.md

## 1. Skill Folder And Frontmatter

- The skill folder name must match `name` in the frontmatter.
- `description` must state the trigger clearly, not just give a vague description.
- There must not be two skills with the same `name`, because the Codex runtime installs via a flat layout `~/.codex/skills/<skill-name>`.
- If a new skill is one a user is likely to call directly many times, it should have `agents/openai.yaml`.

## 2. Workflow-Chain Mapping

- If a skill affects step 5, 7, or 8, it must appear in the matching step table in `workflow-chain.md`.
- If the step table mentions a new block such as `## Review Findings` or `## Implementation Notes`, the matching step template must also have that block.
- If a template references a skill's schema, the `### \`<skill-name>\`` entry must also exist in the schema catalog section.

## 3. Governance Authority Sync

- Every `## Hard Rule: ...` heading in `policies/codex/AGENTS.global.md` must have a matching `## Hard Rule: ...` heading in `skills/orchestration/codex-workflow-chain/SKILL.md`, with the exact same wording (`grep -n "^## Hard Rule" <file>` on both and diff the heading lists).
- A hard rule that only makes sense at router/entry level (for example `Router Before Action`, `Generic Coding Defaults Do Not Open A Gate`) may live in `workflow-governance-router/SKILL.md` instead, but it must still exist verbatim in at least one skill file; it must not exist only in `AGENTS.global.md` with no skill-layer counterpart.
- If a rule's authority body (eligibility conditions, escalation triggers, gate host contract) is long, the skill copy may summarize it, but it must state which file is the full authority (for example `Full authority for this rule is policies/codex/AGENTS.global.md § Hard Rule: <name>`) instead of silently omitting the rule.
- This check is heading-text equality, not paraphrase equality: a rule present under a differently worded heading (e.g. `Prefer The Smallest Sufficient Solution` vs `Prefer The Smallest Solution That Is Correct`) still counts as drift and must be flagged.
- `references/workflow-chain.md` inside `codex-workflow-chain` restates the same Hard Rule set again for its own step-mapping purposes; its headings must also match `AGENTS.global.md` 1:1 for the same reason.

## 4. Template And Schema

- Step 5:
  - A specialized design/frontend skill must go into `## Architecture Details`.
- Step 7:
  - A specialized implement skill must not replace `## Main Artifact`; if needed, it goes into `## Implementation Notes`.
- Step 8:
  - A specialized review skill must use `## Review Findings` or an equivalent review block, not push into `## Scan Summary`.

## 5. Boundary Between Skills

- `frontend-experience-design` must be clearly a design-before-code skill.
- `frontend-architecture` must be clearly a source-code boundary and ownership skill.
- `react-web-implementation` must be clearly a step 7 guidance skill.
- `frontend-quality-review` must be clearly a screen-level UX/accessibility/responsive review.
- `react-best-practices-review` must be clearly a React render/data boundary review.
- If two skills are close in scope, at least one of the two must have an `Out Of Scope` section or a decision rule to separate the roles.

## 6. Cross-Reference And Runtime Layout

- Every cross-reference path between skills must be correct for the flat runtime layout after a global install.
- Do not use a path that is only correct in the repo's group structure if the real runtime no longer keeps that grouping.
- If a skill references `references/...` or `scripts/...`, the corresponding file must actually exist.

## 7. Script And Automatic Checks

- The audit script should catch at least:
  - valid frontmatter
  - folder name match
  - unique skill name
  - workflow-chain existence
  - core marker/template/schema existence
  - `## Hard Rule` heading-list equality between `policies/codex/AGENTS.global.md` and `skills/orchestration/codex-workflow-chain/SKILL.md` (and its `references/workflow-chain.md`)
- What the script cannot catch must live in this semantic checklist.

## 8. README And Repo Documentation

- If a new skill changes how the repo is maintained, consider adding it to the README or an operations note.
- It is not required to list every skill in the README, but the README must not contradict the current runtime model.

## 9. Audit Conclusion

- `PASS`: no blocking mismatch, no important template/schema drift remaining.
- `PARTIAL`: the repo runs but warnings or minor semantic gaps remain.
- `FAIL`: there is a runtime conflict, a mandatory schema/block is missing, or the trigger/boundary clearly contradicts.