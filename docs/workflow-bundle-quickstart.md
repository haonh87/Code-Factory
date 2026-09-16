---
language: en
---

# workflow-bundle Quickstart

> Vietnamese: workflow-bundle-quickstart.vi.md

This guide focuses on the `workflow-bundle v2.6.2` release candidate: install `wfc`, install the workflow bundle for Codex or Claude Code, route requests with adaptive governance, bootstrap a new repo, and run the `agent proposes, human approves` flow. Registry installation remains unavailable until the human Release gate passes. The candidate retains 42 managed skills and preserves independent human authority for every applicable gate.

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

The standard way once the package is published:

```bash
npm install -g workflow-bundle
wfc help
wfc version
```

If upgrading from the old `workflow-contracts` CLI:

```bash
npm uninstall -g workflow-contracts
npm install -g workflow-bundle
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
npm install -g workflow-bundle@latest
```

If you are using `npm link` from the source repo:

```bash
cd packages/workflow-bundle
npm link
```
