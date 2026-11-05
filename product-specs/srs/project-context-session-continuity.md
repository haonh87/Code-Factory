---
artifact_family: product-spec
work_item_slug: project-context-session-continuity
status: approved
approval: accepted-in-chat-pending-trusted-receipt
priority: high
delivery_context: brownfield
---

# Project Context, Instructions, Memory And Harness — Release Contract

Draft requirement owner for the urgent release. All CTX criteria below were accepted by the maintainer in chat and remain unverified. The implementation plan is in `work-items/project-context-session-continuity/`; no native memory capability is assumed solely from an installed file.

## User Outcome

Upgrading an existing project enables Codex and Claude to establish the right project context, follow its instructions and continue prior work across sessions. The release must include the operational lifecycle, not only skills or sample configuration.

## Authority And Persistence Contract

| Layer | Owner / content | Persistence and authority |
|---|---|---|
| Instructions | Native harness entrypoint plus project rules | Govern behavior subject to higher-priority controls; prompts alone do not prove enforcement |
| Project context | Existing `project-context/project-context.md` | Purpose, boundaries, module map, exact build/test commands, constraints; reviewed source references, no invented facts |
| Durable decisions | Owning spec/design/governance artifacts, referenced by project context | Explicit decision source/owner/date/status; never derive approval from transcript or model memory |
| Work state and handoff | Canonical work-item report plus owning current-step note | Task, progress, evidence, blockers, pending human action and next step; workflow protocol remains sole lifecycle authority |
| Session cache | Harness-local disposable state | Session/project/worktree identity, timestamps and source hashes; revalidate before use; corruption/loss cannot change authority |
| History retrieval | Project-scoped optional Session Search companion | Read-only evidence with source/time; can be stale or unavailable; not instructions or policy |
| Native vendor memory | Agent-managed local capability | May supplement context; not the shared Code Factory source of truth and not a gate approval mechanism |

Opening a session is read-only by default. At meaningful checkpoints the agent saves a bounded handoff through authorized workflow authoring. No active work item means no fabricated task; ordinary questions do not create workflow artifacts. On recovery, changed hashes or invalid receipts require rereading canonical state. Multiple active tasks require explicit selection. Missing/corrupt cache triggers reconstruction, not silent success.

## Installation And Diagnostic Contract

Use existing install/update/init/status commands, with explicit selected project roots and harness mode. Preserve all unmanaged instructions, settings, hooks and local edits. Update only managed blocks with provenance, conflict detection and backups. Do not overwrite AGENTS.override.md to make installation appear successful. An installer may add candidate project facts only from inspected evidence, marking unknowns for review.

Diagnostic output distinguishes asset presence, instruction discovery, hook capability/configuration, canonical-context validity, history dependency/freshness, and the last observed lifecycle verification. Provide a specific recovery action for degraded states. Read-only status must not repair files, index conversations or broaden allowed roots. A previous successful smoke result is stale when its installed version/configuration/source hashes change.

## Compatibility Contract

Core context, instructions and curated handoff retain Node >=18 support. The optional history companion requires Node >=20 and a pinned/tested cass version. It ships as a versioned companion asset in the same release, with pinned dependency resolution and setup guidance. Offline/missing dependencies yield an explicit degraded history capability while core continuity still works. Exact supported harness/platform versions are determined and recorded during verification; unsupported native hooks use a clearly identified instruction-driven fallback.

Do not migrate transcript contents, raw production logs, tickets, credentials or personal information into project memory by default. Do not index unrelated projects. `ai-maintainer` retains its masking, allowlist and local-only constraints.

## Acceptance Criteria

| ID | Pass condition |
|---|---|
| CTX-01 | A genuinely fresh supported Codex session and Claude session discover the correct native project instructions. Tests cover global/project precedence and overrides; no duplicated conflicting policy. Installed-file existence alone does not pass. |
| CTX-02 | Each harness identifies the pilot's purpose, actual source/module paths, test/lint commands and critical constraints with links to inspected project sources; no architecture invented from generic templates. |
| CTX-03 | Resume recovers the correct item, step, gate state, blocker, evidence and next action from canonical sources. Tests pass for zero, one and multiple active items, a different branch/worktree and stale source hashes. |
| CTX-04 | Save/checkpoint then reopen in the other harness restores a distinctive reviewed decision and unfinished action with source references. Reverse direction, compaction and abrupt-exit recovery are tested. Unknown unsaved work is reported rather than fabricated. |
| CTX-05 | Retrieved malicious transcript text cannot approve gates, modify instructions or execute commands. Requests for another project and symlink/path escapes are denied. No raw sensitive fixture contents enter shared memory or release assets. |
| CTX-06 | Full history mode on the pilot retrieves a known synthetic historical exchange for both supported transcript sources, with source/time. Missing/stale index or dependency failure is distinguishable from “no matching history”; retrieval does not silently reindex. |
| CTX-07 | Upgrade from exact 2.9.0 and legacy managed-file fixtures preserves unrelated bytes/settings/hooks, survives partial failure, detects conflicts and is byte-idempotent on a second run. Unknown content is preserved. |
| CTX-08 | Read-only status reports each layer independently, actionable degraded states and version/hash/time of lifecycle proof; tests establish that status performs no write or indexing. |
| CTX-09 | Exact release assets install and operate in clean temporary homes/projects with the Code-Factory checkout unavailable. No developer absolute paths, private transcripts or unintended files. SHA-256 manifest identifies the tested assets. |
| CTX-10 | Core matrix passes Node18/22; companion passes Node20/22 with declared cass prerequisites. Supported harness/platform versions and fallback differences are explicit. Missing optional history never masquerades as full health. |
| CTX-11 | Maintainer/QC observes fresh-session, checkpoint, reopen and cross-harness continuation on ai-maintainer using the candidate artifacts, including preserved dirty-file hashes and its PII constraints. Live pilot writes require approved scope and filesystem access. |
| CTX-12 | Exact previous-package rollback plus owned-file restoration is rehearsed. User edits made after installation survive or cause an explicit conflict; canonical history/receipts remain unchanged. Release includes concrete upgrade, verify, repair and rollback instructions. |

## Release Decision

Priority HIGH. Proposed minor 2.10.0, not reserved or published. Core and companion are tested together but their runtime dependency requirements remain explicit. Publish through the existing GitHub release channel only after readiness, implementation, exact-artifact verification and applicable terminal approvals. A3–A4 requires independent QC if included. No mass rollout to undisclosed projects.

## Native Capability References

Validate against installed versions during implementation:

- [OpenAI native instruction discovery](https://developers.openai.com/codex/guides/agents-md).
- [Claude project instructions and native memory](https://code.claude.com/docs/en/memory).
- [Claude supported lifecycle hooks](https://code.claude.com/docs/en/hooks).

These sources inform adapter behavior. The release's operational claims require recorded tests on the actual supported versions.
