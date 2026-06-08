# Code-Factory - Project Context

Repository: AI Agent Ops - policy, workflow, skill và adapter cho AI agent.
Public release: `workflow-bundle v2.1.1`.

## Commands

- Validate workflow: `npm run validate:workflow -- --workflow-root work-items`
- Scaffold work item: `npm run scaffold:workflow -- --work-item <slug>`
- Scaffold step: `npm run scaffold:workflow-step -- --work-item <slug> --step <sNN>`
- Status: `npm run workflow:status` hoặc `npx wfc status --mode claude`
- Install/update: `npx wfc install --mode claude --scope global`

## Structure

- `skills/` - skill definitions (analysis, architecture, delivery, guardrails, orchestration, obsidian)
- `mcp/` - MCP servers (github-push, gitlab, notebooklm, session-search)
- `packages/workflow-bundle/` - wfc CLI và runtime
- `project-context/` - governance, constitution, checklists
- `work-items/` - canonical artifact root
- `scripts/` - utility scripts
- `changes/` - change packages
- `docs/` - documentation

## Conventions

- Workflow chain: s01 Clarify -> s08 Verify + DoD
- Artifact root: `work-items/<work_item_slug>/`
- Workflow notes: `.md` với Obsidian flavor
- Language: tiếng Việt mặc định, trừ khi yêu cầu khác
- Encoding: UTF-8 bắt buộc cho text files
- TDD cho behavior change, worktree cho change lớn
- `AI proposes, human approves` ở mọi gate
- Instincts: behavioral patterns tự rút từ session, 2 layer (project + global)

## Instincts

- Project instincts: `.claude/instincts.yaml` — trigger-action patterns loaded by SessionStart hook, scoped to this project
- Global instincts: `~/.claude/projects/.../memory/global-instincts.md` — cross-project patterns auto-loaded by Claude memory system every session
- Stop hook recommends new instincts based on session patterns (TDD violations, hook changes, manifest changes)
- Để thêm instinct project: nói "save that instinct" hoặc manually thêm vào `.claude/instincts.yaml`
- Để thêm instinct global: nói "remember this as a global instinct" — sẽ lưu vào Claude memory
- Format: id, trigger, action, domain, source, added

## Hook Runtime Controls

- `CF_HOOK_PROFILE=minimal` — tắt tất cả TDD hooks (docs-only sessions)
- `CF_HOOK_PROFILE=standard` — TDD tracking only, không block (default cho docs/refactor sessions)
- `CF_HOOK_PROFILE=strict` — TDD enforce + track (default, full enforcement)
- `CF_DISABLED_HOOKS=tdd-enforce,tdd-track-write` — disable từng hook cụ thể
- Hook IDs: `tdd-enforce` (PreToolUse), `tdd-track-write` (PostToolUse), `tdd-track` (Stop)

## MCP Servers

- `notebooklm`: research/query corpus lớn (cần `uvx` và auth NotebookLM)
- `github-push`: push repository lên GitHub
- `gitlab`: inspect/pull/push GitLab repository
- `session-search`: search local session history qua `cass`