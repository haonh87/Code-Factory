# Code-Factory - Project Context

Repository: AI Agent Ops - policy, workflow, skill and adapter for AI agent tasks.
Public release: `workflow-bundle v2.3.1`.

## Commands

- Validate workflow: `npm run validate:workflow -- --workflow-root work-items`
- Scaffold work item: `npm run scaffold:workflow -- --work-item <slug>`
- Scaffold step: `npm run scaffold:workflow-step -- --work-item <slug> --step <sNN>`
- Status: `npm run workflow:status` or `npx wfc status --mode claude`
- Install/update: `npx wfc install --mode claude --scope global`

## Structure

- `skills/` - skill definitions (analysis, architecture, delivery, guardrails, orchestration, obsidian)
- `mcp/` - MCP servers (github-push, gitlab, notebooklm, session-search)
- `packages/workflow-bundle/` - wfc CLI and runtime
- `project-context/` - governance, constitution, checklists
- `work-items/` - canonical artifact root
- `scripts/` - utility scripts
- `changes/` - change packages
- `docs/` - documentation

## Conventions

- Workflow chain: s01 Clarify -> s08 Verify + DoD
- Artifact root: `work-items/<work_item_slug>/`
- Workflow notes: `.md` with Obsidian flavor
- Language: English by default; Vietnamese retained as supplementary reference (`*.vi.md` siblings and `docs/vi/`) for the Vietnamese community. Runtime skills are EN-first.
- Encoding: UTF-8 required for text files
- TDD for behavior change, worktree for large changes
- `AI proposes, human approves` at every gate
- Instincts: behavioral patterns drawn from sessions, 2 layers (project + global)

## Instincts

- Project instincts: `.claude/instincts.yaml` — trigger-action patterns loaded by SessionStart hook, scoped to this project
- Global instincts: `~/.claude/projects/.../memory/global-instincts.md` — cross-project patterns auto-loaded by Claude memory system every session
- Stop hook recommends new instincts based on session patterns (TDD violations, hook changes, manifest changes)
- To add a project instinct: say "save that instinct" or add it manually to `.claude/instincts.yaml`
- To add a global instinct: say "remember this as a global instinct" — it will be saved to Claude memory
- Format: id, trigger, action, domain, source, added

## Hook Runtime Controls

- `CF_HOOK_PROFILE=minimal` — disable all TDD hooks (docs-only sessions)
- `CF_HOOK_PROFILE=standard` — TDD tracking only, no blocking (default for docs/refactor sessions)
- `CF_HOOK_PROFILE=strict` — TDD enforce + track (default, full enforcement)
- `CF_DISABLED_HOOKS=tdd-enforce,tdd-track-write` — disable specific hooks
- Hook IDs: `tdd-enforce` (PreToolUse), `tdd-track-write` (PostToolUse), `tdd-track` (Stop)

## MCP Servers

- `notebooklm`: research/query large corpora (needs `uvx` and NotebookLM auth)
- `github-push`: push repository to GitHub
- `gitlab`: inspect/pull/push GitLab repository
- `session-search`: search local session history via `cass`
- `codebase-memory`: graph-based code intelligence (call graph, impact analysis) — setup + limitations: `docs/codebase-memory.md`
