---
language: en
---

# AI Agent Ops

> Vietnamese: README.vi.md

This repository stores the policy, workflow, skills, and adapters for AI agent tasks. The current public release is `workflow-bundle v2.3.1`: an installable workflow bundle for Codex and Claude Code that lets the agent proactively propose `work-item` and `change`, while the human retains approval authority at the gates before delivery proceeds.

When sharing with new users, use the `v2.3.1` tag or the `release/v2.3.1` branch as the canonical public reference instead of the working tree.

> Looking for the community-facing English overview? See [`docs/release/community-pack-readme.md`](docs/release/community-pack-readme.md) (Vietnamese: [`docs/release/community-pack-readme.vi.md`](docs/release/community-pack-readme.vi.md)).

## Requirements

- `node >= 18`
- `npm >= 9`
- `~/.codex` or `~/.claude` writable when using `wfc install|update|skills`
- `git` if cloning the source repo instead of installing from the npm registry
- `bash` for the Linux/macOS adapter or `PowerShell` for the Windows adapter

## Start Here

If you are approaching the repo for the first time and want to follow the `v2.3.1` public release:

1. [`docs/publish-surface.md`](docs/publish-surface.md)
2. [`docs/workflow-docs-map.md`](docs/workflow-docs-map.md)
3. [`docs/workflow-bundle-quickstart.md`](docs/workflow-bundle-quickstart.md)
4. [`packages/workflow-bundle/README.md`](packages/workflow-bundle/README.md)
5. [`skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
6. [`skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](skills/orchestration/codex-workflow-chain/references/workflow-chain.md)

## Internal Context

The documents below are maintainer or historical context and should not be used as the public onboarding path:

- [`memory-bank/projectbrief.md`](memory-bank/projectbrief.md)
- [`memory-bank/activeContext.md`](memory-bank/activeContext.md)
- [`memory-bank/progress.md`](memory-bank/progress.md)
- [`skills/orchestration/codex-workflow-chain/references/workflow-overview.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview.md)
- [`skills/orchestration/codex-workflow-chain/references/workflow-versioning.md`](skills/orchestration/codex-workflow-chain/references/workflow-versioning.md)

## Quick Workflow Commands

The public command surface of `v2.3.1` uses `wfc`.

Install and manage the workflow bundle:

- install the workflow bundle into the Codex home: `wfc install --mode codex --scope global`
- install the workflow bundle into the Claude Code home: `wfc install --mode claude --scope global`
- install the workflow bundle into a specific project: `wfc install --mode codex --scope project --project-root <repo-root>`
- install both global and project: `wfc install --mode codex --scope both --project-root <repo-root>`
- overwrite an installed bundle according to the existing install state: `wfc update --mode codex|claude`
- view the status and version of the installed bundle: `wfc status --mode codex|claude`
- list, add, remove skills managed by the bundle: `wfc skills list|add|remove --mode codex|claude`

Recommended Usage:

- `interactive terminal`:
  - `wfc install`: run `wfc install` directly; the CLI will prompt for `mode` and `scope`
  - `wfc update`, `wfc status`, `wfc skills list|add|remove`: `--mode` can be omitted; the CLI will prompt to choose a `mode`
- `automation/CI/scripts`:
  - always pass `--mode` explicitly
  - for `wfc install`, always pass `--scope` explicitly

Authoring and validation:

- initialize a minimal baseline: `wfc init`
- scaffold the whole workflow: `wfc scaffold --work-item <work-item-slug> --planning-track <quick|full|enterprise>`
- scaffold a single step: `wfc scaffold-step --work-item <work-item-slug> --step <sNN>`
- scaffold a change package: `wfc scaffold-change --change-id <CHANGE-ID> --work-item <work-item-slug>`
- validate the standard workflow: `wfc`
- validate naming: `wfc naming`
- validate governance: `wfc governance`
- validate `SDD`: `wfc sdd`
- validate the change layer: `wfc change`
- validate the execution layer when the work item has execution metadata or artifacts: `wfc exec`
- validate the planning track: `wfc plan`
- validate the work-item protocol: `wfc protocol`
- smoke test `scaffold -> validate`: `wfc smoke`
- run the fixture suite: `wfc fixtures`
- if you are authoring from the source repo, you can use the `npm run validate:workflow:*` wrappers

Agentic proposal flow:

- materialize a raw request into a work item candidate: `wfc materialize --request "<raw-request>"`
- materialize and auto-scaffold when the request is clear enough: `wfc materialize --request "<raw-request>" --auto-scaffold`
- list work items before viewing details: `wfc work-item list`
- view the protocol or status of a work item: `wfc work-item status --work-item <work-item-slug>`
- approve or reject a change package proposed by the agent: `wfc change-item <approve|reject|status> --change-id <CHANGE-ID>`
- approve a work item before activation: `wfc work-item approve --work-item <work-item-slug> --reviewed-by <role>`
- seal a trusted human gate receipt before activation: `wfc gate approve --work-item <work-item-slug> --gate <spec|dor|approach|task_plan> --reviewed-by <role>`
- activate a work item only after approval + the `s04-s06` evidence gates: `wfc work-item activate --work-item <work-item-slug> --step s07 --write-root <path>`
- view or sync capability control: `wfc capability status` , `wfc capability sync` , `wfc capability check --path <path>`

Notes:

- `--work-item` is the short CLI name for `work_item_slug`.
- `work_item_slug` is the identifier carried across all 8 steps, e.g. `fix-login-timeout`, `checkout-recovery`.
- The strict default for a new repo is `protocolControl.legacyScaffoldPolicy=forbid`; only when project config enables explicit `allow_readonly` should `wfc work-item list|status` use a read-only bootstrap report from an old `s01` to observe legacy scaffold state.
- Mutating actions such as `approve|activate|verify|close` must not bootstrap themselves; they require an existing `.work-item-report.json`.
- `work-item approval`, `change approval`, and `gate approval` are only considered trusted when a signed receipt exists outside the project root; metadata in a note or report is no longer sufficient to open a gate on its own.
- The `approve` commands still go through the CLI but must be run by a human in an interactive TTY; normal mode will reject `--approval-passphrase` and `WORKFLOW_BUNDLE_APPROVAL_PASSPHRASE`.
- The first approval in a trusted approval root creates an approver keypair and requires the human to enter an approval passphrase directly in that TTY.
- The implementation path is locked at the filesystem level until the work item reaches `ACTIVE` at `s07` and is granted a `write-root`.
- `work-items/` is the canonical artifact root for the repo's workflow artifacts.
- The approval model of `v2.3.1` is `agent proposes, human approves`; `ACTIVE` opens only when the approval gate, trusted signed receipts, and the required step-gate evidence are present.

## Workflow Docs

### By Purpose

- Public docs for newcomers to the workflow: [`docs/workflow-docs-map.md`](docs/workflow-docs-map.md)
- Public publish surface for `v2.3.1`: [`docs/publish-surface.md`](docs/publish-surface.md)
- Quickstart for `wfc`: [`docs/workflow-bundle-quickstart.md`](docs/workflow-bundle-quickstart.md)
- Package README for installation or publishing: [`packages/workflow-bundle/README.md`](packages/workflow-bundle/README.md)

### Overview and Contract

- Official overview for delivery and onboarding: [`workflow-overview-author-edition.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview-author-edition.md)
- Technical or internal reference: [`workflow-overview.md`](skills/orchestration/codex-workflow-chain/references/workflow-overview.md)
- Contract, naming, frontmatter, block schema: [`workflow-chain.md`](skills/orchestration/codex-workflow-chain/references/workflow-chain.md)
- Naming whitelist by step: [`workflow-artifact-naming.md`](policies/codex/workflow-artifact-naming.md)

### Product, Role, and Spec

- Role-aware workflow, `BRD/SRS`, role outputs, NotebookLM usage: [`role-aware-workflow.md`](skills/orchestration/codex-workflow-chain/references/role-aware-workflow.md)
- `SDD` lifecycle, requirement IDs, spec freeze or change, coverage report: [`spec-driven-development.md`](skills/orchestration/codex-workflow-chain/references/spec-driven-development.md)
- Product spec root for `BRD` and `SRS`: [`product-specs/README.md`](product-specs/README.md)
- Canonical artifact root for workflow work items: [`work-items/README.md`](work-items/README.md)
- Change package root: [`changes/README.md`](changes/README.md)

### Governance, Runtime, and Planning

- Project-level Governance Pack: [`project-context/README.md`](project-context/README.md)
- Governance decision model: [`project-context/governance-decision-model.md`](project-context/governance-decision-model.md)
- Governance role model: [`project-context/governance-role-model.md`](project-context/governance-role-model.md)
- Execution runtime for `agentic|multi_agent`: [`execution-runtime.md`](skills/orchestration/codex-workflow-chain/references/execution-runtime.md)
- Adaptive planning for `quick|full|enterprise`: [`adaptive-planning.md`](skills/orchestration/codex-workflow-chain/references/adaptive-planning.md)
- CI enforcement for workflow tooling and artifacts: [`workflow-ci-enforcement.md`](skills/orchestration/codex-workflow-chain/references/workflow-ci-enforcement.md)
- Canonical fixture suite for the governance validator: [`packages/workflow-bundle/tests/fixtures/workflow-governance/README.md`](packages/workflow-bundle/tests/fixtures/workflow-governance/README.md)

### Agentic Proposal and Approval

- `Work Item Materialization`: [`work-item-materialization.md`](skills/orchestration/codex-workflow-chain/references/work-item-materialization.md)
- `Work Item Protocol`: [`work-item-protocol.md`](skills/orchestration/codex-workflow-chain/references/work-item-protocol.md)

### Architecture and Rollout

- Merge strategy with `spec-kit`, `OpenSpec`, `cc-sdd`, `BMAD-METHOD`: [`sdd-merge-strategy.md`](skills/orchestration/codex-workflow-chain/references/sdd-merge-strategy.md)
- Target architecture: [`target-architecture.md`](skills/orchestration/codex-workflow-chain/references/target-architecture.md)
- Implementation blueprint by phase, artifact, validator, CI: [`implementation-blueprint.md`](skills/orchestration/codex-workflow-chain/references/implementation-blueprint.md)

## Workflow Artifact File Naming

Workflow file names are not based on personal interpretations such as `requirements`, `architecture`, `assessment`, `threshold`, `glossary`.

- Standard formula: `<work_item_slug>.sNN.<step-slug>.<ext>`
- Standard file names by step: [`policies/codex/workflow-artifact-naming.md`](policies/codex/workflow-artifact-naming.md)
- For frontmatter and block schema details by step: [`skills/orchestration/codex-workflow-chain/references/workflow-chain.md`](skills/orchestration/codex-workflow-chain/references/workflow-chain.md)

## Repository Components

- `.github/workflows/workflow-guardrails.yml`: GitHub Actions for the public CI baseline, currently enforcing `workflow-tooling`, `workflow-artifacts`, `workflow-sdd`, `workflow-changes`, `workflow-execution`, `workflow-planning`, `workflow-authoring-smoke`.
- `changes/`: source of truth for change packages following `proposal -> design -> tasks -> spec-delta -> archive`; implemented in the public baseline.
- `product-specs/`: source of truth for `BRD/SRS` when a work item runs under SDD; implemented in the public baseline.
- `work-items/`: canonical artifact root for the repo's actual workflow artifacts.
- `policies/codex/AGENTS.global.md`: global workflow policy for Codex.
- `project-context/`: project-level Governance Pack, including `constitution`, `project-context`, checklist profiles, and the exception register.
- `skills/orchestration/`: authority entrypoint and workflow backbone; includes `workflow-governance-router` for routing step/gate before action and `codex-workflow-chain` for maintaining the `s01 -> s08` chain.
- `skills/analysis/`: skills for requirement analysis, product thinking, and technical approach.
- `skills/architecture/`: skills for domain architecture, frontend, and data design.
- `skills/delivery/`: skills for task breakdown, implementation, testing, DevOps packaging/deploy, and review of data or code changes.
- `skills/guardrails/`: skills for contract, readiness, audit, and DoR/DoD gates that lock in quality.
- `skills/obsidian/`: skills for authoring artifacts in the Obsidian ecosystem such as Markdown notes, Bases, and JSON Canvas.
- `skills/README.md`: taxonomy and grouping rules for the skill publish surface.
- `skills/notebooklm/`: top-level integration skill by design, used to integrate NotebookLM via CLI/MCP for research-heavy or large-corpus tasks.
- `mcp/github-push/`: Node MCP server to inspect a repository, create a GitHub repo, commit, configure the remote, and push the current branch.
- `mcp/notebooklm/`: MCP launcher for Codex to call the upstream `notebooklm-mcp` via `uvx` for NotebookLM tasks.
- `mcp/session-search/`: read-only Node MCP server to look up local coding-agent session history via `cass`.
- `mcp/github-push/codex-config.toml.template`: MCP template block rendered into `~/.codex/config.toml` when the installer runs.
- `mcp/notebooklm/codex-config.toml.template`: MCP template block rendered into `~/.codex/config.toml` when the installer runs for the NotebookLM MCP.
- `mcp/session-search/codex-config.toml.template`: MCP template block rendered into `~/.codex/config.toml` when the installer runs for the Session Search MCP.
- `adapters/codex/install-codex-workflow.ps1`: installation script for Windows.
- `adapters/codex/install-codex-global.cmd`: Windows launcher for quick global installation.
- `adapters/codex/install-codex-workflow.sh`: installation script for Linux/macOS.
- `adapters/mcp/install-github-push.ps1`: script to install dependencies and render the GitHub Push MCP template into `~/.codex/config.toml` on Windows.
- `adapters/mcp/configure-github-push-credentials.ps1`: script to configure `GITHUB_USERNAME` and `GITHUB_TOKEN` for the GitHub Push MCP on Windows without writing secrets into the repo.
- `adapters/mcp/configure-github-push-credentials.cmd`: Windows launcher to call the credential adapter quickly.
- `adapters/mcp/install-github-push.sh`: script to install dependencies and render the GitHub Push MCP template into `~/.codex/config.toml` on Linux/macOS.
- `adapters/mcp/install-notebooklm.ps1`: script to register the NotebookLM MCP into `~/.codex/config.toml` on Windows.
- `adapters/mcp/install-notebooklm.sh`: script to register the NotebookLM MCP into `~/.codex/config.toml` on Linux/macOS.
- `adapters/mcp/install-session-search.ps1`: script to install dependencies and render the Session Search MCP template into `~/.codex/config.toml` on Windows.
- `adapters/mcp/install-session-search.sh`: script to install dependencies and render the Session Search MCP template into `~/.codex/config.toml` on Linux/macOS.

## Available MCPs

- `github-push`: MCP server starter to support the `inspect -> commit -> create repo -> configure remote -> push` flow for GitHub using `git` and the GitHub REST API.
- `notebooklm`: MCP launcher to integrate the upstream `notebooklm-mcp-cli` into Codex via `uvx`, suited for research-heavy workflows that need to store a document corpus and query/search context for brainstorming or spec work.
- `session-search`: read-only MCP server to list, search, view, and stitch context from local coding-agent sessions using `cass`.
- The config template is committed at `mcp/github-push/codex-config.toml.template`; the installer only fills in the machine-local path and writes to `~/.codex/config.toml`.
- The config template is committed at `mcp/notebooklm/codex-config.toml.template`; the installer fills in the launcher path and the machine-local `uvx` binary, then writes to `~/.codex/config.toml`.
- The config template is committed at `mcp/session-search/codex-config.toml.template`; the installer fills in the machine-local allowed root and writes to `~/.codex/config.toml`.

See [`mcp/github-push/README.md`](mcp/github-push/README.md), [`mcp/notebooklm/README.md`](mcp/notebooklm/README.md), and [`mcp/session-search/README.md`](mcp/session-search/README.md) for details.

## Session Lookup with `cass`

If `cass` is installed on the machine, you can use this CLI to look up Codex session history by workspace.

Quick example on Linux/macOS:

```bash
cass health
cass sessions --current --limit 5 --json
cass search "status" --workspace "$(pwd)" --limit 5 --display lines
```

Notes:

- On macOS, `cass` defaults to the data dir at `~/Library/Application Support/com.coding-agent-search.coding-agent-search/`.
- When running inside a restricted sandbox, `cass` may report degraded or fail to open the database even though the local install is fine.
- If you hit such an error, verify with `cass health` or `cass search ...` in a non-sandbox environment before running `cass doctor --fix` or `cass index --full`.
- Verified on `2026-04-08` in this workspace: `cass search "status"` returned hits from local Codex sessions, while a `notebooklm` query returned no hits at the time of checking.
- If you want to expose this capability to the agent via a tool instead of calling the CLI directly, use the [`mcp/session-search`](mcp/session-search/README.md) MCP; this server only wraps read-only flows and does not expose `cass doctor` or `cass index`.

## DevOps Capability by Environment

- `local`: standard packaging with `Dockerfile` and `compose.yaml`.
- `dev`, `uat`, `prod`: the workflow can lock the runtime target to `docker`, `docker swarm`, or `k8s`.
- The same image contract should be promoted across environments; differences should live in config, secrets, and rollout strategy.
- `deployment-devops` is the umbrella skill to coordinate end-to-end DevOps from `local` to `prod`.
- `containerization-packaging` locks down `Dockerfile`, `.dockerignore`, `compose.yaml`, and packaging patterns by language or workload.
- `platform-runtime-deployment` and `ci-cd-release` lock down runtime deploy and pipeline, promotion, and approval for `dev`, `uat`, and `prod` respectively.

## Available Obsidian Skills

This skill set is vendored from `kepano/obsidian-skills`; three skills are currently pulled into the repo to serve artifact authoring:

- `obsidian-markdown`: create and edit Obsidian Flavored Markdown (`.md`).
- `obsidian-bases`: create and edit Obsidian Bases (`.base`).
- `json-canvas`: create and edit JSON Canvas (`.canvas`).

Notes:

- `obsidian-cli` is not bundled in this round.
- The current install script recursively syncs the entire `skills/` tree into `~/.codex/skills/<skill-name>`, so no separate install step is needed for this skill group.

## Pushing to GitHub

1. Create a new repository on GitHub.
2. Push this directory to the repository:

```bash
git init
git add .
git commit -m "init ai agent ops"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Workflow Bundle CLI

Default CLI for publishing/installing the workflow bundle:

```bash
wfc status
wfc install --mode codex --scope global
wfc install --mode claude --scope global
wfc install --mode codex --scope project --project-root /path/to/project
wfc install --mode codex --scope both --project-root /path/to/project --skill codex-workflow-chain --skill step-goal-contract
wfc update --mode codex
wfc update --mode claude
wfc skills list
wfc skills add --skill notebooklm
wfc skills remove --skill notebooklm
```

Meanings:

- `--mode codex`: installs the global policy into `~/.codex/AGENTS.global.md` and syncs skills into `~/.codex/skills`
- `--mode claude`: installs memory/policy into `~/.claude/CLAUDE.md` and syncs skill references into `~/.claude/skills`
- `project` for `codex`: installs `AGENTS.md` into the specified project directory but still uses the skill runtime in `~/.codex/skills`
- `project` for `claude`: installs `CLAUDE.md` into the specified project directory
- `both`: installs both global and project policy
- `update`: overwrites the installed bundle according to the install state of the corresponding mode recorded in the runtime home
- `skills add/remove`: adds or removes managed skills without a full reinstall
- supporting policy is synced into `~/.codex/policies/codex/` or `~/.claude/policies/codex/` so that the main references inside the skill have a more stable runtime path

Notes:

- The bundle version is managed in [`workflow-bundle.manifest.json`](workflow-bundle.manifest.json)
- `wfc status` shows both `source_bundle_version` and `installed_bundle_version`
- `wfc version` is the CLI package version
- The install state of the workflow bundle is recorded per mode in the runtime home, e.g. `~/.codex/.codex-workflow-bundle.install-state.json` or `~/.claude/.claude-workflow-bundle.install-state.json`
- The managed skill manifest is recorded per mode in the corresponding runtime home
- If the machine still has legacy `.codex-workflow-pack.*` state, `wfc update` will read that state, rewrite it to the new `bundle` file, and delete the legacy file
- The current CLI supports `Codex` and `Claude Code`; the legacy Windows adapter still only covers the Codex installer flow

## Installing on Linux/macOS or Windows via the CLI

Once the package is published, install directly:

```bash
npm install -g workflow-bundle
wfc install --mode codex --scope global
```

If you are running from the source repo and have `node >= 18`, you can use it directly:

```bash
cd <repo-local-path>
node packages/workflow-bundle/bin/wfc.js install --mode codex --scope global
```

Or if you have `npm link`ed `wfc`:

```bash
wfc install --mode codex --scope global
```

## Build / Publish the Workflow Bundle

A maintainer can bundle the runtime assets and then pack a publishable package with:

```bash
npm run build:workflow:bundle-runtime
cd packages/workflow-bundle
npm pack
```

Notes:

- `prepack` of `packages/workflow-bundle` automatically bundles the runtime for `codex` and `claude`, the supporting policy, and the entire `skills/` tree into the package before creating the tarball.
- The published tarball already contains `workflow-bundle.manifest.json`, `runtime/codex/**`, and `runtime/claude/**`, so `wfc install|update|skills` works without the original source repo.

If you need to call it quickly from the source repo instead of installing the global CLI:

```bash
npm run workflow:install -- --scope global
npm run workflow:update
npm run workflow:status -- --json
npm run workflow:skills -- list
```

## Installing on Windows

```powershell
git clone <your-github-repo-url> $env:USERPROFILE\codex-workflow-bundle
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-bundle\adapters\codex\install-codex-workflow.ps1"
```

Or use the Windows launcher:

```cmd
%USERPROFILE%\codex-workflow-bundle\adapters\codex\install-codex-global.cmd
```

This launcher is the recommended install method if you want every project on the Windows machine to receive the workflow bundle:

- syncs global policy into `%USERPROFILE%\.codex`
- syncs all skills into `%USERPROFILE%\.codex\skills`
- creates `AGENTS.md` at the root of filesystem drives so that every project under those drives receives the workflow

If you want the workflow to apply to every directory on the Windows machine, create `AGENTS.md` at the root of all filesystem drives:

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-bundle\adapters\codex\install-codex-workflow.ps1" -CreateDriveRootLinks
```

If you want to refresh an existing root `AGENTS.md` with the latest version from the workflow bundle:

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\codex-workflow-bundle\adapters\codex\install-codex-workflow.ps1" -CreateDriveRootLinks -OverwriteExistingDriveRootFiles
```

Notes:

- Skills in `%USERPROFILE%\.codex\skills` are global for every Codex session.
- The installer now records the list of skills managed by this workflow bundle in `%USERPROFILE%\.codex\.codex-workflow-bundle.managed-skills.txt` and only prunes stale skills previously installed by this bundle; it does not touch system skills like `.system` or custom skills outside the bundle.
- `AGENTS.md` only applies the workflow policy to a project; the reference paths inside a skill must match the install layout in `%USERPROFILE%\.codex\skills`.
- `AGENTS.md` at the root of each drive lets the workflow policy apply to every project under that drive.
- The script scans filesystem drives automatically instead of hardcoding `C`, `D`, `E`.
- If the machine does not allow symlinks, the script will try to copy `AGENTS.md` instead.
- If a drive already has an `AGENTS.md`, the script leaves it and skips that drive.
- To overwrite an existing `AGENTS.md`, pass `-OverwriteExistingDriveRootFiles`.

## Quick Explanation for Global Install

The global install model of this package has two distinct layers:

- Policy layer: `AGENTS.md` at the drive root or project directory tells Codex which workflow to apply when working in that area.
- Skill layer: skill directories installed in `%USERPROFILE%\.codex\skills\<skill-name>` so that every Codex session can invoke them.

Key points:

- `AGENTS.md` does not contain the full skill content; it is only the workflow policy activation point.
- The skill path is resolved from the installed skill directory in `%USERPROFILE%\.codex\skills`, not from the location of `AGENTS.md`.
- Because the installer installs in a flat `~/.codex/skills/<skill-name>` layout, every cross-reference between skills must match this flat layout.

Examples:

- `step-goal-auditor` is installed into `%USERPROFILE%\.codex\skills\step-goal-auditor`
- `codex-workflow-chain` is installed into `%USERPROFILE%\.codex\skills\codex-workflow-chain`
- From there, the correct reference path from `step-goal-auditor` to the workflow chain docs is `../codex-workflow-chain/references/workflow-chain.md`

## Installing on Linux/macOS

```bash
git clone <your-github-repo-url> ~/codex-workflow-bundle
bash ~/codex-workflow-bundle/adapters/codex/install-codex-workflow.sh
```

## Updating on an Installed Machine

```bash
cd <repo-local-path>
git pull
wfc update
```

If you are still on the old flow, you can rerun the adapter script to sync all the latest skills into `~/.codex/skills`.
On Windows, to sync and install globally in one go, rerun `adapters\codex\install-codex-global.cmd`.
On Linux/macOS, if you only want to update policy and new skills into an existing Codex global install, run `bash adapters/codex/update-codex-workflow.sh`.

Notes:

- The `.sh` update script syncs `~/.codex/AGENTS.global.md` and `~/.codex/skills`.
- The install/update scripts only prune stale skills previously installed by this workflow bundle; skills outside the bundle are left untouched.
- On Windows, if the machine uses root-level `AGENTS.md` files via copy rather than symlinks, rerun the full install flow with `-CreateDriveRootLinks -OverwriteExistingDriveRootFiles` for the drives that need refreshing.

## Extension Conventions

- Add new policies per tool under `policies/<tool>/`.
- Add install or bootstrap adapters per tool under `adapters/<tool>/`.
- Add new skills to the correct group in `skills/` to avoid turning the repo into a hard-to-manage flat directory.
- Only split off a new skill group when the number of skills in a current group becomes too large or the usage differs significantly.

Operational notes:

- The group structure in the repo only serves source management and readability.
- The runtime layout after a global install for Codex is currently flat by `skill-name`.
- When adding a new skill, check that the skill name is unique across the repo to avoid overwrites during a global install.