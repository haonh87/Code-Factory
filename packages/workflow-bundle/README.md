---
language: en
---

# workflow-bundle

> Vietnamese: README.vi.md

`workflow-bundle` is the CLI package for `v2.10.2`. It installs the workflow bundle for Codex or Claude Code, routes requests into an applicable governance lane, scaffolds or validates delivery workflows, supports journaled human approval bundles, and provides exact workflow-state disposition. Applicable gates still require their authorized human reviewers and independent trusted receipts. Publication status and exact artifacts are recorded in the v2.10.2 release record.

Detailed quickstart: [`docs/workflow-bundle-quickstart.md`](../../docs/workflow-bundle-quickstart.md)

## Source selection and update safety

Version 2.10.2 defaults to the bundle shipped with the running CLI,
regardless of the current directory. To use another source checkout, pass
`--repo-root /absolute/path/to/Code-Factory`. For source development, either build
the packaged runtime with `npm run build:workflow:bundle-runtime` from the repo
root, or select the repo explicitly. `wfc status --json` reports the source path,
source version and installed version.

`wfc update` checks the runtime and every selected project before writing. It checks
both the selected source version and the running CLI version that supplies lifecycle
helpers. A newer installed version, or unsupported nonempty version metadata, stops the update
without changing files or permissions. Stable `X.Y.Z` versions are compared
numerically; equal and forward updates remain supported. Existing installations
without version metadata keep their bootstrap path.

For a deliberate downgrade, review backups and use the chosen CLI/source with
`wfc install --repo-root /absolute/path/to/chosen-source --mode codex --scope both
--project-root /absolute/path/to/project` (or `--mode claude`), selecting the scope
and targets explicitly. `update --rollback-context` still restores only the
previous project integration. Keep canonical context, handoffs and signed receipts.

Install the v2.10.2 CLI before updating managed installations. When using an older
CLI, select its installed package explicitly with `--repo-root` and inspect source
and installed versions before updating from an old checkout.

## Requirements

- `node >= 18`
- `npm >= 9`
- a writable `~/.codex` or `~/.claude` when using `wfc install|update|skills`
- `git` if cloning the source repo instead of installing from the npm registry

## Install

Download `workflow-bundle-2.10.2.tgz` and `SHA256SUMS` from the GitHub Release, verify the SHA-256, then install the local artifact:

```bash
npm install -g /absolute/path/to/workflow-bundle-2.10.2.tgz
wfc help
wfc version
```

Upgrade from the legacy package:

```bash
npm uninstall -g workflow-contracts
npm install -g /absolute/path/to/workflow-bundle-2.10.2.tgz
wfc version
```

Use directly from the source repo:

```bash
cd packages/workflow-bundle
npm link
wfc version
```

### Rollback to v2.9.0

Before downgrading the CLI, restore the previous managed project integration with
`wfc update --mode codex --project-root <repo-root> --rollback-context` and repeat
for `--mode claude`. Restoration refuses intervening edits; review conflicts first.
Keep canonical project context, decisions, handoffs and signed receipts.

Install the retained `workflow-bundle-2.9.0.tgz` (SHA-256
`08ebdd2757f01ac69c10d3792e8c1758ade46aa97269194ee65721b554baa32b`).
Do not run the old overwrite-based installer over customized native instructions.
Record status and preserve managed backups before downgrade; package rollback and
project integration rollback are separate. Rehearse on a temporary project first.

## What `v2.10.2` Includes

- workflow bundle install surface via `wfc install|update|status|skills`
- core authoring CLI via `wfc init|scaffold|validate`
- agentic proposal flow via `wfc materialize|change-item|work-item|protocol`
- eight request lanes, hard-escalation triggers, and applicable-only roles/gates
- human approval gates for change packages and work items, including readiness and closeout bundles
- capability control to lock the implementation path until the work item reaches `ACTIVE` at `s07`
- multi-block runtime prompt with `AGENTS.global.md` as authority, `workflow-governance-router` as the entry router, and `codex-workflow-chain` as the workflow backbone
- 48 managed skills in each generated runtime, including corrected `sa` and `ta` contracts
- `architecture-modeling` with one-model/two-audience views, explicit render ownership, and deterministic draw.io support for landscape and integration views
- `artifact-governance` with one-fact/one-owner placement rules, English/Vietnamese content, and canonical/runtime parity
- additive design-readiness guidance for the existing `sa` and `ta` skills, mapped into their existing fields without selecting an s05 solution
- corrected 13-case authoring smoke evidence for explicit legacy-scaffold approval bootstrap with `request_source`, `REPORT_BOOTSTRAPPED`, approval status, and reviewer provenance
- opt-in, local-only, allowlisted telemetry with pseudonymous identifiers, 30/90-day retention, and purge
- one Guardrails-built package candidate verified by SHA-256 on Node 18 and Node 22 without per-environment rebuild
- machine enforcement for artifact placement, ownership duplication, section-first execution reads, and registered role-indexed handoffs
- permission-safe repeat install/update behavior that preserves unmanaged content

## Exact State Disposition And Archive Guards

- `wfc work-item status --json` exposes snapshot-bound `disposition_targets[]` for active blockers and required actions.
- `wfc work-item dispose-state` selects exactly one `state_id`, requires an authorized Maintainer signature, and writes the unmodified source entry to append-only `resolved_state_history[]`.
- Identical `operation_id` retries are idempotent; conflicting reuse, stale IDs, and semantic clearing of unknown legacy text are rejected.
- Archive and resume transitions do not parse prose. Archive refuses active blockers or required actions, and terminal reports cannot be silently overwritten by materialization.

## Runtime Model

After installing the bundle, a coding task must not jump straight into implementation just because the user says “build”, “fix”, or “add”.

The current runtime is understood as follows:

- `authority layer`: `AGENTS.global.md`
- `entry router`: the `workflow-governance-router` skill
- `workflow backbone`: the `codex-workflow-chain` skill
- `step skills`: one skill per workflow step

For any workflow-governed delivery task, the agent must route before acting. The minimal status block that should appear is:

```text
Current Step: s0X <step name>
Workflow Status: ACTIVE | BLOCKED | WAITING_APPROVAL | READY_FOR_REVIEW | VERIFIED
Delivery Context: greenfield | brownfield
What I Am Doing Now: <one sentence>
Missing Gates: <list or NONE>
Next Artifact: <next artifact or decision>
Next Human Action: <review/approval required from a human, or NONE>
```

Rules for reading this block:

- if `Missing Gates` is not `NONE`, `Workflow Status` must not be `ACTIVE`, `READY_FOR_REVIEW`, or `VERIFIED`; only `BLOCKED` or `WAITING_APPROVAL` are valid
- if `Missing Gates` is not `NONE`, `Next Human Action` must not be `NONE`
- a raw greenfield feature request such as `QR Voucher + voucher service API + tone brand` in an empty repo must stop at the `proposal stage`; it must not self-scaffold or code

## Adaptive Governance Contract

- Lanes: `qa`, `translation`, `summarization`, `research`, `documentation`, `read_only_analysis`, `maintenance`, and `product_delivery`.
- The first six lanes write no delivery artifacts by default. Explicit materialization requires an audited human override. Maintenance uses only a bounded Developer/QC path unless a hard trigger escalates it.
- Hard triggers are `public_contract`, `migration`, `security_sensitive`, `regulated`, `greenfield_foundation`, and `release`. Mixed or unknown intent fails closed to `product_delivery`.
- SA, TA, DevOps and the Contract, Foundation, Release, and Business Acceptance gates are trigger-based. Not-applicable work creates no pending human action; applicable authority never changes.
- Adaptive artifacts are written only when source and installed runtimes share the same minor version and parity has passed. A failed guard writes no adaptive delivery state; legacy readers and individual approvals remain available.
- `approve-ready-bundle`, `reject-ready-bundle`, and `approve-closeout-bundle` perform one human interaction while keeping an independent signed receipt for every gate. The transaction is preflighted, locked, journaled, recoverable, and reconciled with protocol state.
- Telemetry remains off unless `--telemetry true` or `CF_TELEMETRY=on` is supplied. Records are local-only and allowlisted; raw data expires after 30 days, aggregate data after 90 days, and `wfc telemetry purge` removes expired records.

## Command Overview

| Task | Command |
|---|---|
| Install the workflow bundle into a Codex or Claude Code home / project | `wfc install --mode codex|claude --scope global|project|both [--project-root <path>]` |
| Overwrite the workflow bundle per the saved install state | `wfc update --mode codex|claude` |
| Show installed bundle status and version | `wfc status --mode codex|claude` |
| List, add, remove managed skills of the workflow bundle | `wfc skills list|add|remove --mode codex|claude` |
| Initialize a project repo | `wfc init` |
| Create a new workflow manually | `wfc scaffold --work-item <slug>` |
| Create one workflow step | `wfc scaffold-step --work-item <slug> --step <sNN>` |
| Create a change package | `wfc scaffold-change --change-id <CHANGE-ID> --work-item <slug>` |
| Standard workflow validation | `wfc` |
| Validate naming or governance | `wfc naming` , `wfc governance` |
| Validate SDD, change, execution, planning | `wfc sdd` , `wfc change` , `wfc exec` , `wfc plan` |
| Run smoke or fixtures | `wfc smoke` , `wfc fixtures` |
| Analyze a raw request into a work-item candidate | `wfc materialize --request "<raw-request>"` |
| Resume an eligible persisted proposal | `wfc materialize --resume-proposal --work-item <slug> --expected-report-sha256 <64-hex> --operation-id <canonical-uuid>` |
| Materialize and auto-scaffold | `wfc materialize --request "<raw-request>" --auto-scaffold` |
| Human-approve an agent-proposed change package | `wfc change-item approve --change-id <CHANGE-ID> --reviewed-by <role>` |
| List or inspect work items | `wfc work-item list` , `wfc work-item status --work-item <slug>` |
| Resolve one active state entry by exact ID | `wfc work-item dispose-state --work-item <slug> --state-id <opaque-id> --operation-id <id> --reviewed-by maintainer --reason "<reason>"` |
| Human-approve a work item or seal a workflow gate | `wfc work-item approve --work-item <slug> --reviewed-by <role>` , `wfc gate approve --work-item <slug> --gate <spec|dor|approach|task_plan> --reviewed-by <role>` |
| Approve or reject all applicable readiness gates in one interaction | `wfc gate approve-ready-bundle --work-item <slug>` , `wfc gate reject-ready-bundle --work-item <slug>` |
| Approve all applicable terminal gates in one interaction | `wfc gate approve-closeout-bundle --work-item <slug>` |
| Activate execution after gates pass | `wfc work-item activate --work-item <slug> --step s07 --write-root <path>` |
| Purge expired opt-in local telemetry | `wfc telemetry purge [--telemetry-out <local-dir>]` |
| View or sync capability control | `wfc capability status` , `wfc capability sync` , `wfc capability check --path <path>` |
| Validate the work-item protocol | `wfc protocol` |

### Recommended Usage

- `interactive terminal`:
  - `wfc install`: run `wfc install` directly; the CLI will ask for `mode` and `scope`
  - if you choose `project|both` without passing `--project-root`, the CLI will also ask for the project root
  - `wfc update`, `wfc status`, `wfc skills list|add|remove`: you may omit `--mode`; the CLI will ask you to pick a `mode`
- `automation/CI/scripts`:
  - always pass `--mode` explicitly
  - for `wfc install`, always also pass `--scope` explicitly

## First Flow

Manual flow:

```bash
wfc init
wfc scaffold --work-item customer-search
wfc
wfc sdd
wfc change
wfc plan
```

Agentic flow:

```bash
wfc materialize --request "them dang nhap Google cho customer portal" --auto-scaffold
wfc change-item approve --change-id CHANGE-001 --reviewed-by po
wfc work-item approve --work-item add-google-oauth-login --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate spec --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate dor --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate approach --reviewed-by developer
wfc gate approve --work-item add-google-oauth-login --gate task_plan --reviewed-by developer
wfc work-item list
wfc governance
wfc plan
wfc work-item activate --work-item add-google-oauth-login --step s07 --write-root src --write-root public
wfc protocol
```

Notes:

- `wfc work-item activate` is no longer just “if scaffolded, then activate”.
- Before `ACTIVE`, the work item must have its approval gates passed; if it has a `change_id`, the change package must also be approved.
- `ACTIVE` opens only when evidence for `s04`, `s05`, `s06` is sufficient for the runtime to allow execution.
- `change-item approve`, `work-item approve`, and `gate approve` write a signed receipt into a trusted approval root outside the project root; without a valid receipt, the protocol will not open the gate.
- the `approve` commands still go through the CLI, but a human must run them in an interactive TTY; normal mode will reject `--approval-passphrase` and `WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE`.
- the first approval in a trusted approval root creates an approver keypair and asks the human to enter an approval passphrase directly in that TTY.
- non-interactive approval is for smoke/test fixtures only, not an operational path.
- the implementation path is locked at the filesystem level until `ACTIVE + s07 + granted write roots` exist.
- the strict default for a new repo is `protocolControl.legacyScaffoldPolicy=forbid`; only if project config explicitly enables `allow_readonly` should `wfc work-item list|status` use a read-only bootstrap report from an old `s01` to observe legacy-scaffold state.
- read-only `list|status` never persists a report; explicit `approve` may bootstrap a scaffold-only item with auditable provenance, while `activate|verify|close` require an existing `.work-item-report.json`.
- `work-item status` includes read-only `disposition_targets[]` for each active blocker or required action. A `state_id` is bound to the exact report snapshot, collection, and position; refresh status after any report change. Equal display text does not identify an entry.
- `work-item dispose-state` moves only the selected raw entry into signed, append-only `resolved_state_history[]`. The Maintainer must unlock the existing approver key in a human-controlled TTY; `--reviewed-by maintainer` alone is not authorization. An identical `operation_id` retry is a no-op, while conflicting reuse or a stale ID is rejected.
- `work-item archive` refuses any active blocker and does not clear state. Other lifecycle transitions preserve unrelated typed state or refuse unresolved opaque legacy state; use an exact `state_id` and a separate authorized disposition instead of editing report text.

## Config

The CLI finds the project root by walking upward from `cwd`, but the canonical config file must live at the project root as `workflow-bundle.config.json`. The legacy config `workflow-contracts.config.json` is still accepted for a smoother migration.

Example:

```json
{
  "projectRoot": ".",
  "workflowRoot": "work-items",
  "protocolControl": {
    "legacyScaffoldPolicy": "forbid"
  },
  "capabilityControl": {
    "enabled": true,
    "authoringRoots": ["work-items", "changes", "product-specs", "project-context", "docs"],
    "alwaysWritablePaths": [],
    "ignoredRoots": [".git", ".codex", ".claude", "node_modules", ".obsidian", ".idea", ".vscode"],
    "protectedRoots": []
  }
}
```

Quick meaning:

- `protocolControl.legacyScaffoldPolicy`: the strict default is `forbid`; legacy scaffolds are not treated as a valid delivery path unless the project explicitly enables `allow_readonly`
- `authoringRoots`: workflow/artifact paths that are always writable
- `alwaysWritablePaths`: exception paths that remain writable; the strict default is empty, so workflow config is no longer a default writable bypass
- `protectedRoots`: if empty, capability control infers them from top-level repo roots that are not in `authoringRoots`
- the implementation path is opened for writing only temporarily when `wfc work-item activate|resume --step s07 --write-root <path>` grants permission via `granted_write_paths`

## Init

Initialize the minimal baseline for a project repo:

```bash
wfc init
```

Or target a different directory:

```bash
wfc init --project-root /path/to/project
```

This creates:

- `workflow-bundle.config.json`
- `work-items/`
- `changes/`
- `product-specs/brd/`
- `product-specs/srs/`
- `project-context/project-context.md`
- `project-context/constitution.md`
- `project-context/governance-exception-register.md`
- `project-context/checklists/default.md`
- `project-context/checklists/strict.md`
- `project-context/checklists/regulated.md`
- `project-context/custom/design-review.md`

## Maintainer Commands

If you are authoring the package from the source repo:

```bash
npm run build:workflow:bundle-runtime
npm run validate:workflow
npm run validate:workflow:sdd
npm run validate:workflow:change
npm run validate:workflow:execution
npm run validate:workflow:planning
npm run validate:workflow:protocol
npm run validate:workflow:fixtures
npm run validate:workflow:authoring-smoke
npm run validate:workflow:bundle-smoke
npm run validate:workflow:release-candidate
```

Build a publishable tarball:

```bash
cd packages/workflow-bundle
npm pack
```

`prepack` will bundle the support policies and the full `runtime/codex/**`, `runtime/claude/**` trees before creating the tarball.

## Persisted Proposal Recovery

The v2.10.2 candidate retains explicit `materialize --resume-proposal` from v2.6.4 for eligible unapproved single brownfield proposals, with `change_strategy=none` or `create_new` (full template profile only for `create_new`). Ordinary materialization refuses to overwrite existing reports. Recovery requires either READY/no_conflict with original scaffold actions, or valid Maintainer-signed disposition of all admission concerns. It never signs or approves on the user's behalf.

Read `wfc work-item status`, resolve applicable concerns in their owning lane, then hash the current report with `shasum -a 256 work-items/<slug>/<slug>.work-item-report.json`. Pass that hash and a new canonical UUID:

```bash
wfc materialize --resume-proposal --work-item <slug> --expected-report-sha256 <64-hex> --operation-id <canonical-uuid>
```

Success is MATERIALIZED/PENDING_REVIEW with no grants. Draft content, raw history and candidate snapshots remain intact. A new change package uses canonical templates, a per-change lock and a recovery manifest; matching retries are idempotent or repair an interrupted projection. Stale hashes, unsupported states, altered owned files, conflicting identities and symlinks are rejected. Do not retry after authoring or approval, and do not use an older writer on a recovered report: it can drop `materialization_recovery`. See the work-item-materialization reference for the full support and failure contract.

The CHANGE/CR numeric alias collision remains a known limitation: verify both spellings before selecting a new change ID. Recovery does not infer that an existing directory is safe to reuse.


## Version 2.9.0 Release Scope

Version 2.9.0 adds optional scenario guidance (A1) and opt-in integer
`task_contract_version: 1` (A2). The JSON task contract validates task IDs,
dependencies, bounded file paths, structured verification commands and exact
acceptance-criteria coverage. Validation never executes the recorded commands.
Legacy YAML authoring and default scaffolds remain supported; human gates are unchanged.
Codex and Claude retain 48 skills, including the five maintenance skills and
`diagram-design-presentation-adapter` from earlier releases, plus CF-023 validation.
SEC-01 and SEC-02 remain in tagged source; direct installers and MCP servers are
outside the workflow tarball. Optional PNG dependencies are provisioned separately.
See the v2.10.2 release record for checksum, verification, limits and rollback.
npm registry publication is separate.

## Project lifecycle repair in 2.10.0

The candidate delivers native project instructions, a portable context reader, checkpoint references and safe project upgrades. Configuration presence is not proof that an agent loaded it: finish the fresh-session scenario below before calling a project operational. Core requires Node 18 or newer. Optional history requires Node 20 or newer and cass; the verification record names tested versions.

After downloading the **published** artifacts and checking SHA256SUMS, install the core tarball, then run from the target project's root:

```bash
npm install -g ./workflow-bundle-2.10.2.tgz
wfc install --mode codex --scope both --project-root "$PWD"
wfc install --mode claude --scope both --project-root "$PWD"
wfc status --mode codex --project-root "$PWD" --json
wfc status --mode claude --project-root "$PWD" --json
```

Use `wfc update --mode codex --scope project --project-root "$PWD"` (and the Claude equivalent) for later updates. An explicit project root restricts updates to that project. Omitting project roots updates previously registered targets according to the chosen scope. `wfc init --mode codex|claude|both` bootstraps project lifecycle files; the default is both. Existing project context is preserved. Init does not choose an application stack or authorize implementation.

Review `project-context/project-context.md`: source inventory can identify files and commands, but the project owner must verify purpose, architecture constraints and durable decisions. Codex receives a native AGENTS.md bridge; an existing AGENTS.override.md can shadow it and is reported rather than overwritten. Claude receives CLAUDE.md plus SessionStart/PreCompact/SessionEnd integration. Codex uses instruction-driven startup/checkpoint fallback. Their runtime capabilities are deliberately reported separately.

Managed blocks preserve project instruction text. Settings merges preserve unrelated keys and hooks. Conflicting markers, modified managed assets, symlink escape or an in-progress installation stop mutation. Install backups and session references live under `.codex/code-factory` or `.claude/code-factory`; their local ignore file excludes backups/caches from Git. No transcript is added to canonical memory automatically.

### Verify the actual lifecycle

1. Open a genuinely new Codex session in the project. Ask it to identify purpose, module boundaries, exact test commands, important constraints, active work and next action with source links.
2. During authorized work, record a distinctive decision and pending action in the owning note's `## Session Handoff`. Keep decision authority in its original source. For Q&A, do not create a workflow item just to store memory.
3. Run `node .codex/code-factory/context.cjs --project-root . --event checkpoint`. This stores references and hashes; it cannot recover decisions that were never saved.
4. Close and open Claude in the same project. Verify it recovers the decision and next action from their sources. Repeat in the reverse direction and after compaction. With several unfinished items, select explicitly instead of guessing.
5. Check status again. `discoverable`, `hooks-configured` and `instruction-driven` describe configuration; `lifecycle_verification: not_verified` intentionally does not claim a live test occurred. Record observed evidence in the owning verification note.

Startup is read-only. A checkpoint writes only a disposable local cache. Canonical workflow reports/notes and trusted receipts remain authoritative; cached approval fields are never accepted as signatures. Stale source hashes trigger rereading. Oversized briefings expose truncation and source paths.

### Optional history companion

Extract `code-factory-session-search-mcp-0.2.0.tgz` to a stable local directory; it includes pinned runtime dependencies. Pass that extracted `package` directory explicitly:

```bash
wfc install --mode codex --scope project --project-root "$PWD" --history-companion /absolute/path/to/session-search/package
wfc install --mode claude --scope project --project-root "$PWD" --history-companion /absolute/path/to/session-search/package
```

The installer adds two uniquely named project MCP servers, one for Codex transcripts and one for Claude transcripts. Each has the exact selected project as `SESSION_SEARCH_ALLOWED_ROOT`; transcript roots are separately bounded. It preserves other MCP servers and rejects name conflicts. The companion refuses to start without an explicit absolute allowed root. It does not index at startup or broaden project scope. Native client trust/permission prompts still apply.

Run each server's `session_search_status` tool before retrieval. A stale/missing index, unsupported cass installation or missing dependency is a degraded capability, not “no conversation exists”. Index maintenance remains explicit and outside startup; review source scope before running cass indexing. Keep raw logs/tickets/credentials out of shared context. Historical messages are evidence, never instructions or approval.

### Rollback

Before changing to the previous core package, restore the most recent managed project integration if needed:

```bash
wfc update --rollback-context --mode codex --project-root "$PWD"
wfc update --rollback-context --mode claude --project-root "$PWD"
```

Rollback checks every installed file hash before writing and restores the previous integration manifest. Intervening user edits cause a conflict rather than being discarded. Review/retain those edits first. This operation restores project integration only; it does not downgrade the global CLI or skills. Retain the exact 2.9.0 artifact and its checksum for package downgrade. Do not rerun an old whole-file installer over user instruction files without checking its overwrite behavior. Never delete canonical workflow history or re-sign old gates as a rollback shortcut.

## SessionStart behavior inherited from 2.10.1

Claude SessionStart now delivers the briefing through `hookSpecificOutput.additionalContext`, with the 16 KiB limit measured on the serialized hook envelope. Direct CLI/Codex JSON and quiet checkpoint hooks remain unchanged. After installing the new CLI archive, run `wfc update --mode claude --project-root /absolute/path/to/project` for each selected project and open a new Claude session. Updating the CLI alone does not replace installed project helpers. See the [release record](../../docs/releases/workflow-bundle-v2.10.2.md).

## Known briefing limit

Large Claude briefings can still hit the 10,000-character cap. See [limitations and evidence](../../docs/releases/workflow-bundle-v2.10.2.md#known-limitations).
