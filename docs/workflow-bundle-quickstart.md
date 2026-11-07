---
language: en
---

# workflow-bundle Quickstart

> Vietnamese: workflow-bundle-quickstart.vi.md

This guide focuses on the `workflow-bundle v2.10.1` release: install `wfc`, install the workflow bundle for Codex or Claude Code, route requests with adaptive governance, resolve legacy workflow state by exact ID, bootstrap a new repo, and run the `agent proposes, human approves` flow. Install the GitHub Release asset; this operation does not publish to the npm registry. The release contains 48 managed skills and preserves independent human authority for every applicable gate.

## Source selection and update safety (unreleased)

The fix after v2.10.1 uses the running CLI's bundle regardless of cwd. Explicit
`--repo-root` selects another source. Update refuses an older source or lifecycle
helper before changing runtime/project bytes or permissions; deliberate downgrade
uses `install` with a chosen source and explicit scope/targets.

See [source selection and update safety](../packages/workflow-bundle/README.md#source-selection-and-update-safety-unreleased)
for source authoring, version compatibility and rollback details. The published
v2.10.1 artifact does not contain this fix: when using it from an old checkout,
select the installed package explicitly with `--repo-root` and inspect status first.

## Objectives

When you are done, you will:

- have the `wfc` command on your machine
- be able to install the workflow bundle into `~/.codex`, `~/.claude`, or a project folder with `wfc install`
- be able to bootstrap a new project repo with `wfc init`
- be able to scaffold or materialize your first workflow
- understand which requests need no delivery workflow and which triggers force full product-delivery controls
- be able to approve applicable readiness or closeout gates in one journaled interaction
- be able to validate a workflow with `wfc`

## Requirements

- macOS, Linux, or Windows
- `node >= 18`
- `npm >= 9`
- `~/.codex` or `~/.claude` writable, or the equivalent path on Windows
- `git` when cloning the source repo instead of installing from the npm registry

Check:

```bash
node -v
npm -v
```

## Install The `wfc` CLI

Download the tarball and SHA256SUMS from the v2.10.1 GitHub Release, verify the checksum, then install:

```bash
npm install -g /absolute/path/to/workflow-bundle-2.10.1.tgz
wfc help
wfc version
```

If upgrading from the old `workflow-contracts` CLI:

```bash
npm uninstall -g workflow-contracts
npm install -g /absolute/path/to/workflow-bundle-2.10.1.tgz
wfc version
```

If developing directly from this source repo:

```bash
cd packages/workflow-bundle
npm link
wfc version
```

## Install The Workflow Bundle

Install global policy and skills for Codex:

```bash
wfc install --mode codex --scope global
```

If you do not want to remember flags up front, you can run:

```bash
wfc install
```

### Recommended Usage

- `interactive terminal`:
  - `wfc install`: run `wfc install` directly; the CLI will ask for `mode` and `scope`
  - if you pick `project|both` without passing `--project-root`, the CLI will ask for the project root
  - `wfc update`, `wfc status`, `wfc skills list|add|remove`: you can omit `--mode`; the CLI will ask you to choose a `mode`
- `automation/CI/scripts`:
  - always pass `--mode` explicitly
  - with `wfc install`, always pass `--scope` explicitly

Install global memory/policy and skill references for Claude Code:

```bash
wfc install --mode claude --scope global
```

Install into a specific project:

```bash
wfc install --mode codex --scope project --project-root /path/to/your-project
```

Install both global and project policy:

```bash
wfc install --mode codex --scope both --project-root /path/to/your-project
```

Check status:

```bash
wfc status --mode codex
wfc status --mode claude
wfc skills list --mode codex
```

When a new bundle version is out, overwrite the installed bundle according to the current install state:

```bash
wfc update --mode codex
```

`wfc update` will also migrate legacy state `.codex-workflow-pack.*` to `.codex-workflow-bundle.*` if the machine previously had the old flow installed in Codex mode.

## Understanding The Runtime After Install

After the bundle is installed, the agent must not treat a feature request as a direct implement command.

The current runtime operates on the following model:

- `authority layer`: `AGENTS.global.md`
- `entry router`: skill `workflow-governance-router`
- `workflow backbone`: skill `codex-workflow-chain`
- `step skills`: per-step skills for analysis, design, planning, implement, and verify

For any task in the delivery workflow, the agent must route first, then act. At minimum it must report the following status block:

```text
Current Step: s0X <step name>
Workflow Status: ACTIVE | BLOCKED | WAITING_APPROVAL | READY_FOR_REVIEW | VERIFIED
Delivery Context: greenfield | brownfield
What I Am Doing Now: <one sentence>
Missing Gates: <list or NONE>
Next Artifact: <next artifact or decision needed>
Next Human Action: <review/approval needed from a human, or NONE>
```

If a gate is still missing or a material blocker remains, the agent must stop at `BLOCKED` or `WAITING_APPROVAL` and must not proceed to implement on its own.

Consistency rule:

- if `Missing Gates` is not `NONE`, `Workflow Status` must not be `ACTIVE`, `READY_FOR_REVIEW`, or `VERIFIED`
- if `Missing Gates` is not `NONE`, `Next Human Action` must not be `NONE`
- a greenfield request like `QR Voucher + voucher service API + tone brand` in an empty repo must stop at `proposal stage` and must not auto-scaffold

## Resolve State By Exact ID

First refresh the report snapshot and inspect the read-only disposition targets:

```bash
wfc work-item status --work-item <work-item-slug> --json
```

Select the exact `state_id` from `disposition_targets[]`, then have an authorized Maintainer run the disposition in an interactive terminal:

```bash
wfc work-item dispose-state \
  --work-item <work-item-slug> \
  --state-id <snapshot-bound-state-id> \
  --operation-id <unique-operation-id> \
  --reason "<explicit disposition reason>" \
  --reviewed-by maintainer
```

The command moves only the selected raw entry into signed, append-only `resolved_state_history[]`; legacy text is preserved exactly and is never interpreted by regex or fuzzy matching. Refresh status after any report change because stale IDs are rejected. `wfc work-item archive` also rejects active blockers or required actions, so disposition and archive remain separate authorized actions.

## Adaptive Request Routing

The public lane vocabulary is:

- non-delivery: `qa`, `translation`, `summarization`, `research`, `documentation`, `read_only_analysis`
- bounded delivery: `maintenance`
- product delivery: `product_delivery`

Non-delivery lanes short-circuit before a report, scaffold, capability grant, or telemetry record is written. A human may explicitly materialize one only with an audited override. Maintenance selects only the Developer/QC roles and Task Plan/DoD gates needed for a bounded change.

The following hard triggers always route to `product_delivery`: `public_contract`, `migration`, `security_sensitive`, `regulated`, `greenfield_foundation`, and `release`. Mixed or unknown intent also fails closed. SA and TA are therefore trigger-based rather than mandatory on unrelated work; DevOps and Release appear only for release scope. Applicable gate authority is unchanged.

Adaptive artifact writing is compatibility-guarded. It requires `--adaptive-writes true`, an explicit `--request-lane`, matching source/installed minor versions, and `--adaptive-parity-passed true`. If any guard fails, no adaptive report, scaffold, capability state, or telemetry record is written. Keep the flag off until canonical, Codex, Claude, and installed-candidate parity has actually passed.

Approval bundles reduce interactions without merging decisions:

```bash
# First finalize the host notes and fill gate_reviews for each applicable gate.
wfc gate approve-ready-bundle --work-item <work-item-slug>
# Or reject the readiness batch atomically.
wfc gate reject-ready-bundle --work-item <work-item-slug>

# After verification, approve only the applicable terminal gates.
wfc gate approve-closeout-bundle --work-item <work-item-slug>
```

Each gate retains its own reviewer, timestamp, artifact digest, and signed receipt. The CLI preflights the whole batch before signing, uses a per-work-item lock and transaction journal, and recovers or rolls back interrupted writes before accepting a retry. Individual `wfc gate approve` commands remain the compatibility fallback.

Telemetry is off by default. Enable it explicitly with `--telemetry true` on a supported lifecycle command or `CF_TELEMETRY=on`. Data is local-only, allowlisted, and pseudonymous; raw records expire after 30 days and aggregate records after 90 days. Purge expired records with:

```bash
wfc telemetry purge
wfc telemetry purge --telemetry-out /path/to/local-telemetry
```

There is no remote telemetry exporter.

## Bootstrap A New Project Repo

```bash
cd /path/to/your-project
wfc init
```

This command creates:

- `workflow-bundle.config.json`
  with `protocolControl.legacyScaffoldPolicy=forbid` by default so legacy scaffold is not treated as a valid execution path
  and will be write-locked by capability control under the strict default after sync
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

## Flow 1: Manual Scaffold

The shortest flow to start a work item that the human proactively pins:

```bash
wfc scaffold --work-item customer-search
wfc work-item list
wfc work-item status --work-item customer-search
wfc
wfc sdd
wfc change
wfc plan
```

If the work item uses execution metadata or artifacts:

```bash
wfc exec
```

## Flow 2: Agentic Proposal With Human Approval

If you want to start from a raw request:

```bash
wfc materialize --request "fix timeout when a user logs in with email/password on the web"
```

If you want the tool to scaffold automatically when the request is clear enough:

```bash
wfc materialize --request "them dang nhap Google cho customer portal" --auto-scaffold
```

If the work item was materialized by the agent and has a `change_id`, the human must approve both the change package and the work item before delivery continues:

```bash
wfc change-item approve --change-id CHANGE-001 --reviewed-by po
wfc work-item list
wfc work-item status --work-item add-google-oauth-login
wfc work-item approve --work-item add-google-oauth-login --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate spec --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate dor --reviewed-by po
wfc gate approve --work-item add-google-oauth-login --gate approach --reviewed-by developer
wfc gate approve --work-item add-google-oauth-login --gate task_plan --reviewed-by developer
```

After the same per-gate reviews are recorded in their finalized host notes, the readiness bundle is the shorter equivalent for the applicable gates:

```bash
wfc gate approve-ready-bundle --work-item add-google-oauth-login
```

Then complete authoring and human review for `s04`, `s05`, and `s06` before opening execution:

```bash
wfc governance
wfc plan
wfc work-item activate --work-item add-google-oauth-login --step s07 --write-root src --write-root public
wfc protocol
```

`wfc work-item activate` is the execution gate. It only passes when:

- `work item approval` is `APPROVED`
- if there is a `change_id`, `change package approval` is `APPROVED`
- if `delivery_context=greenfield`, the `bootstrap gate` is `APPROVED`
- evidence for `s04`, `s05`, `s06` is sufficient per the validator
- trusted signed receipts for the `work item`, `change`, and the mandatory gates exist
- at least one `--write-root` is provided so capability control knows which implementation path is open for writing

Protocol notes:

- the strict default for a new repo is `protocolControl.legacyScaffoldPolicy=forbid`; only when the project config explicitly enables `allow_readonly` should `wfc work-item list|status` use a read-only bootstrap report from the old `s01` to observe legacy scaffold.
- read-only `list|status` never persists a report; explicit `approve` may bootstrap a scaffold-only item with auditable provenance, while `activate|verify|close` require `.work-item-report.json` to already exist.
- `change-item approve`, `work-item approve`, and `gate approve` sign a receipt into the trusted approval root; if the receipt is invalid or an artifact changes after approval, `activate` will fail.
- the `approve` commands still go through the CLI, but must be run by a human in an interactive TTY; normal mode will reject `--approval-passphrase` and `WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE`.
- the first approval in a trusted approval root will create an approver keypair and require the human to enter the approval passphrase directly in that TTY.
- non-interactive approval is only for smoke/test fixtures, not the operational path.
- the implementation path is locked at the filesystem level until the work item reaches `ACTIVE` at `s07` and is granted a `write-root`.

## Validate Workflow

Standard workflow validation:

```bash
wfc
```

Additional lanes when needed:

```bash
wfc naming
wfc governance
wfc sdd
wfc change
wfc exec
wfc plan
wfc protocol
```

## Create A Change Package Manually

```bash
wfc scaffold-change --change-id CHANGE-001 --work-item customer-search
```

## Everyday Flow

Manual flow:

```bash
wfc init
wfc scaffold --work-item <work-item-slug>
wfc
wfc sdd
wfc change
wfc plan
```

Agentic flow:

```bash
wfc materialize --request "<raw-request>" --auto-scaffold
wfc change-item approve --change-id <CHANGE-ID> --reviewed-by <role>
wfc work-item list
wfc work-item status --work-item <work-item-slug>
wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>
wfc gate approve --work-item <work-item-slug> --gate <spec|dor|approach|task_plan> --reviewed-by <role>
# Or, after finalizing all applicable host notes and gate_reviews:
wfc gate approve-ready-bundle --work-item <work-item-slug>
wfc work-item activate --work-item <work-item-slug> --step s07 --write-root <path>
wfc work-item verify --work-item <work-item-slug>
wfc gate approve-closeout-bundle --work-item <work-item-slug>
wfc capability status
wfc protocol
```

## Wire Into The Project `package.json`

```json
{
  "scripts": {
    "wfc": "wfc",
    "validate:workflow": "wfc",
    "validate:workflow:naming": "wfc naming",
    "validate:workflow:governance": "wfc governance",
    "validate:workflow:sdd": "wfc sdd",
    "validate:workflow:change": "wfc change",
    "validate:workflow:execution": "wfc exec",
    "validate:workflow:planning": "wfc plan",
    "validate:workflow:protocol": "wfc protocol"
  }
}
```

Then run:

```bash
npm run validate:workflow
```

## When To Update `wfc`

If you installed the published package:

```bash
npm install -g /absolute/path/to/workflow-bundle-2.10.1.tgz
```

If you are using `npm link` from the source repo:

```bash
cd packages/workflow-bundle
npm link
```

### v2.10.1 Source And Package Boundary

Version 2.9.0 adds optional scenario guidance (A1) and opt-in integer
`task_contract_version: 1` (A2). The JSON task contract validates task IDs,
dependencies, bounded file paths, structured verification commands and exact
acceptance-criteria coverage. Validation never executes the recorded commands.
Legacy YAML authoring and default scaffolds remain supported; human gates are unchanged.
Codex and Claude retain 48 skills, including the five maintenance skills and
`diagram-design-presentation-adapter` from earlier releases, plus CF-023 validation.
SEC-01 and SEC-02 remain in tagged source; direct installers and MCP servers are
outside the workflow tarball. Optional PNG dependencies are provisioned separately.
See the v2.10.1 release record for checksum, verification, limits and rollback.
npm registry publication is separate.

## Project lifecycle repair in 2.10.0

This release delivers native project instructions, a portable context reader, checkpoint references and safe project upgrades. Configuration presence is not proof that an agent loaded it: finish the fresh-session scenario below before calling a project operational. Core requires Node 18 or newer. Optional history requires Node 20 or newer and cass; the verification record names tested versions.

After downloading the **published** artifacts and checking SHA256SUMS, install the core tarball, then run from the target project's root:

```bash
npm install -g ./workflow-bundle-2.10.1.tgz
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

### Recording an observed lifecycle check

After a reviewer actually observes fresh startup and cross-harness recovery, retain a
bounded evidence note inside the project. Store its observation metadata in
`project-context/lifecycle-verification.codex.json` (or `.claude.json`). The schema is:
`schema_version: 1`, `mode`, `bundle_version`, `harness_version`, `observed_at` (UTC),
`observed_by`, `configuration_sha256`, `source_fingerprint`, and
`evidence: {path, sha256}`. Use the installed version, configuration digest and context
fingerprint from `wfc status --mode <mode> --project-root <root> --json`; hash the evidence
file independently. The evidence path must remain inside the project.

`status` reports `recorded_current`, `recorded_stale`, `invalid`, or `not_verified`.
This record is an observation, never a signed workflow approval. Installation never
creates successful observation evidence. Changed files, sources, versions or evidence
invalidate the result. Native instruction overrides and modified policy/helper files
are reported independently.
