---
language: en
---

# workflow-bundle

> Vietnamese: README.vi.md

`workflow-bundle` is the CLI package of the `v2.2.1` public release: it installs the workflow bundle for Codex or Claude Code, scaffolds or validates workflows, and supports the `agent proposes, human approves` flow for `work-item` and `change`.

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

## What `v2.2.1` Includes

- workflow bundle install surface via `wfc install|update|status|skills`
- core authoring CLI via `wfc init|scaffold|validate`
- agentic proposal flow via `wfc materialize|change-item|work-item|protocol`
- human approval gates for change packages and work items
- capability control to lock the implementation path until the work item reaches `ACTIVE` at `s07`
- multi-block runtime prompt with `AGENTS.global.md` as authority, `workflow-governance-router` as the entry router, and `codex-workflow-chain` as the workflow backbone

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
| Activate execution after gates pass | `wfc work-item activate --work-item <slug> --step s07 --write-root <path>` |
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
- mutating actions such as `approve|activate|verify|close` must not self-bootstrap; they require an existing `.work-item-report.json`.

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
```

Build a publishable tarball:

```bash
cd packages/workflow-bundle
npm pack
```

`prepack` will bundle the support policies and the full `runtime/codex/**`, `runtime/claude/**` trees before creating the tarball.