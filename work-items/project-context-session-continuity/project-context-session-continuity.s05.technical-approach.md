---
artifact_id: "project-context-session-continuity.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "project-context-session-continuity"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CR-013"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/project-context-session-continuity.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "required"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
    - "qc"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat:
    - "qc"
  release:
    - "devops"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "project-context-session-continuity.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

> Maintainer accepted this packet in chat on 2026-11-04 (Asia/Ho_Chi_Minh): “accpet, hãy tiếp tục”. Content approval is recorded; trusted terminal signatures are still pending. Draft frontmatter is retained for proposal recovery; no ACTIVE state or receipt is inferred.

# Step 5 — Technical Approach

## Step Contract

Propose the smallest reusable installation/recovery design that satisfies CTX-01..CTX-12. Owner: developer. Status: draft, pending Approach and Contract review.

## Option Analysis

```yaml
options:
  - id: option-1
    direction: "Patch AGENTS.md/CLAUDE.md only in ai-maintainer"
    value: "Fast local instruction correction"
    limitation: "Does not fix downstream upgrades, stale history or session persistence; insufficient"
  - id: option-2
    direction: "Extend existing Code Factory installer, context readers and harness adapters"
    value: "Reuses release path and source ownership; portable upgrades"
    limitation: "Needs merge-safe installation and lifecycle tests"
  - id: option-3
    direction: "Add a new agent framework/vector memory platform"
    value: "Broad future automation"
    limitation: "Unnecessary dependency and migration surface; rejected"
recommended_option: "option-2"
```

## Foundation Decision

NOT_APPLICABLE. Retain current Node CLI, adapters, canonical workflow state and GitHub artifact channel.

## Main Artifact

1. **Instruction entrypoints.** Fix native Codex discovery and retain legacy AGENTS.global.md compatibility only as needed. Install a concise managed project block that directs the agent to the project's own context and workflow state. Preserve all unmanaged bytes. Detect override precedence and newer Claude AGENTS support to avoid duplicate policy loading; do not overwrite an override to force precedence.
2. **Shared project context.** Use `project-context/project-context.md` for purpose, scope, module map, exact build/test commands and important constraints. Decisions retain their source references and authority. Generate from inspected sources only; unresolved facts remain marked unknown. No generic framework architecture is imposed on projects.
3. **Session continuity.** Add a shared read-only context renderer under `packages/workflow-bundle/scripts/`, consuming canonical reports/notes. Select an explicitly requested work item; with multiple active items present choices rather than guessing. Render bounded context (default proposed 16 KiB), preserving source links and all blocker/next-action indicators or reporting truncation. Save handoff in the owning work-item note through existing authoring permissions; a disposable local cache stores only references/hashes/session identity. No work item is created just because a session opens.
4. **Harness adapters.** Reuse and harden the existing hook paths; package portable assets, not checkout-specific absolute paths. Supported Claude startup/compaction/end events invoke the shared helper. Codex uses documented supported capabilities where present and instruction-driven startup/handoff otherwise, reported as such. Neither mode may claim deterministic native hooks when only prompting is available. Caches are hints; report and receipt validity always win. Session end may be abrupt, so durable checkpoints occur after meaningful work and before compaction, not only on exit.
5. **History companion.** Package the existing read-only Session Search MCP separately in the same release, with pinned dependencies/lockfile and no source-checkout dependency. Scope an instance to one explicitly selected canonical project root. Prove supported Codex/Claude transcript adapters on the pinned cass version; unsupported sources must be reported. Keep transport/dependency failures visible. No global index build, automatic root widening or secret collection at startup. Curated memory works without the companion; full history mode has its own health state.
6. **Upgrade and status.** Extend existing install/update/init/status surfaces. Managed-block merge is idempotent, with preflight, per-target backups and ownership hashes. Malformed/duplicate markers, conflicts, symlink escape and externally changed backups stop that target before mutation. Failed writes restore only owned changes; multi-project operations report each target independently. Status is read-only and reports installed, discoverable, configured, stale/degraded/unsupported/conflict, and separately the last verified lifecycle evidence with version/hash/time. It never equates copied files with working recovery.

## Architecture Details

```yaml
pipeline_scope: "Core context/instructions/harness plus history companion; urgent existing-project upgrade"
source_strategy:
  branch_model: "Isolated worktree from reviewed stable main; no direct edits to older root runtime"
  triggers: ["PR checks", "approved immutable release tag"]
build_and_verify:
  stages: ["TDD and targeted review", "runtime parity", "pack", "exact artifact matrix", "pilot", "release review"]
  cache_strategy: ["Dependency-lock-keyed isolated caches; no live project cache mutation"]
  required_checks: ["unit/regression", "containment", "six workflow validators", "pack audit", "authoring/bundle smoke", "UTF-8", "exact tarball upgrade/rollback"]
artifact_flow:
  registry: "Existing GitHub Releases; npm registry publication is not implied"
  artifact_types: ["workflow-bundle tarball", "session-search companion tarball", "SHA-256 manifest", "upgrade and rollback guide"]
  tagging_strategy: ["Proposed v2.10.0; check availability before freeze", "immutable source commit and asset digests"]
  provenance_controls: ["Pin companion dependencies and tested cass version", "Publish exact tested artifact bytes", "No developer-home paths or transcripts in package"]
promotion_flow:
  - from: local
    to: dev
    conditions: ["temporary fresh/upgrade fixtures pass"]
    automation_level: "automated"
  - from: dev
    to: uat
    conditions: ["same candidate passes ai-maintainer lifecycle pilot"]
    automation_level: "human-observed agent sessions"
  - from: uat
    to: prod
    conditions: ["DoD/UAT/Release/Business Acceptance receipts and release authorization"]
    automation_level: "publish same immutable artifacts; project rollout is target-scoped"
approval_controls: ["Readiness gates before production changes", "Terminal gates before publication"]
release_controls:
  pre_release: ["Source/installed parity", "exact asset manifest", "document actual supported harness/platform versions"]
  post_release: ["Download and verify digest", "install/status smoke", "publish known degraded modes"]
rollback_controls: ["Keep prior package and per-project owned-file backup", "Restore only if hashes still match", "preserve user edits and all canonical history/receipts"]
pipeline_risks: ["Different native hook capabilities", "Node 18 versus companion Node 20", "legacy overwrite semantics", "stale or malicious history", "abrupt exit"]
pipeline_recommendation: BLOCKED
notes_for_implementation_or_ops: "Design is proposed; no implementation, UAT or release approval has been issued."
```

## Brownfield Impact Analysis

Existing user instruction files/settings/hook arrays require merge-aware migration. Legacy whole-file installs need ownership identification from known managed hashes; unknown content is user-owned and must be preserved. Existing policies and trusted gate receipts are never re-signed by migration. Hooks must not execute retrieved transcript text or paths outside the selected root. Handle spaces, Unicode, malformed JSON, stale cache, two concurrent sessions, branch/worktree switches and an inaccessible canonical report.

A failed/stale context read gives an explicit degraded result and source pointers, never an invented current task. Governance mutation remains fail-closed under existing gates; routine Q&A is not blocked by absent memory. Interrupted handoff is atomic, preserves prior state and makes recovery gaps visible.

## Validation And Rollback

Test the entire lifecycle from extracted artifacts with the source checkout unavailable. Test a clean install and an upgrade from 2.9.0, and detect older owned-file formats. Rehearse rollback to exact prior package plus backups while preserving later user edits; downgrade does not delete canonical decisions or restore stale gate state. Detailed ordering and owned paths: s06.

## Review Snapshot Notice

This draft changes only Option Analysis representation. Canonical s05 remains signed at the original root until the maintainer applies the prepared correction and renews the Approach receipt.
