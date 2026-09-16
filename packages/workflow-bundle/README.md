---
language: en
---

# workflow-bundle

> Vietnamese: README.vi.md

`workflow-bundle` is the CLI package prepared for the `v2.6.2` release candidate. It installs the workflow bundle for Codex or Claude Code, routes requests into an applicable governance lane, scaffolds or validates delivery workflows, and supports journaled human approval bundles. Applicable gates still require their authorized human reviewers and independent trusted receipts. The package remains unpublished until the human Release gate passes.

Detailed quickstart: [`docs/workflow-bundle-quickstart.md`](../../docs/workflow-bundle-quickstart.md)

## Requirements

- `node >= 18`
- `npm >= 9`
- a writable `~/.codex` or `~/.claude` when using `wfc install|update|skills`
- `git` if cloning the source repo instead of installing from the npm registry

## Install

Install the published package:

```bash
npm install -g workflow-bundle
wfc help
wfc version
```

Upgrade from the legacy package:

```bash
npm uninstall -g workflow-contracts
npm install -g workflow-bundle
wfc version
```

Use directly from the source repo:

```bash
cd packages/workflow-bundle
npm link
wfc version
```

### Roll Back From v2.6.2 To v2.6.1

Capture the current mode, scope, project roots, and status before replacing the package. Stop adaptive
writes by omitting `--adaptive-writes true`, then complete or retry the originating bundle command so
its transaction recovery leaves no live journal. Individual `wfc gate approve` commands remain the
fallback. Then install the retained immutable v2.6.1 tarball and run `install` for every recorded target:

```bash
wfc status --mode codex
npm install -g /absolute/path/to/workflow-bundle-2.6.1.tgz
wfc install --mode codex --scope global
wfc install --mode codex --scope project --project-root <repo-root>
wfc status --mode codex
wfc skills list --mode codex
```

Use the same sequence with `--mode claude` for Claude Code. Use the retained immutable v2.6.1
artifact and `wfc install` for the downgrade so the fallback identity is explicit; do not rely on a
mutable registry alias. The supported path restores the v2.6.1 source behavior and preserves the
42-skill inventory plus unmanaged files. Legacy/adaptive dual-read compatibility and historical receipts
must remain intact; never rewrite or re-sign them as part of rollback. Rehearse against isolated homes
before operating on a live installation, and do not mutate a live global install before the human Release
gate authorizes it.

## What `v2.6.2` Includes

- workflow bundle install surface via `wfc install|update|status|skills`
- core authoring CLI via `wfc init|scaffold|validate`
- agentic proposal flow via `wfc materialize|change-item|work-item|protocol`
- eight request lanes, hard-escalation triggers, and applicable-only roles/gates
- human approval gates for change packages and work items, including readiness and closeout bundles
- capability control to lock the implementation path until the work item reaches `ACTIVE` at `s07`
- multi-block runtime prompt with `AGENTS.global.md` as authority, `workflow-governance-router` as the entry router, and `codex-workflow-chain` as the workflow backbone
- 42 managed skills in each generated runtime, including corrected `sa` and `ta` contracts
- `architecture-modeling` with one-model/two-audience views, explicit render ownership, and deterministic draw.io support for landscape and integration views
- `artifact-governance` with one-fact/one-owner placement rules, English/Vietnamese content, and canonical/runtime parity
- additive design-readiness guidance for the existing `sa` and `ta` skills, mapped into their existing fields without selecting an s05 solution
- corrected 13-case authoring smoke evidence for explicit legacy-scaffold approval bootstrap with `request_source`, `REPORT_BOOTSTRAPPED`, approval status, and reviewer provenance
- opt-in, local-only, allowlisted telemetry with pseudonymous identifiers, 30/90-day retention, and purge
- one Guardrails-built package candidate verified by SHA-256 on Node 18 and Node 22 without per-environment rebuild
- machine enforcement for artifact placement, ownership duplication, section-first execution reads, and registered role-indexed handoffs
- permission-safe repeat install/update behavior that preserves unmanaged content

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
| Materialize and auto-scaffold | `wfc materialize --request "<raw-request>" --auto-scaffold` |
| Human-approve an agent-proposed change package | `wfc change-item approve --change-id <CHANGE-ID> --reviewed-by <role>` |
| List or inspect work items | `wfc work-item list` , `wfc work-item status --work-item <slug>` |
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
