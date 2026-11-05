---
artifact_id: "project-context-session-continuity.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "project-context-session-continuity"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
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
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-11-04T02:07:36.349Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "project-context-session-continuity.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

> Maintainer accepted this packet in chat on 2026-11-04 (Asia/Ho_Chi_Minh): “accpet, hãy tiếp tục”. Content approval is recorded; trusted terminal signatures are still pending. Draft frontmatter is retained for proposal recovery; no ACTIVE state or receipt is inferred.

# Step 6 — Task Plan

## Step Contract

Prepare executable tasks for one developer in an isolated worktree. All tasks are PROPOSED/NOT STARTED. Review spec compliance before code quality after each behavior batch. Implementation begins only after readiness receipts; no delegation is proposed.

## Main Artifact

```yaml
tasks:
  - id: Task
    title: "Task"
    owned_scope: "Owned scope and paths"
    depends_on: "Dependency"
    verification_hint: "Verify path / checkpoint"
  - id: T1
    title: "T1 — Reproduce and pin baseline"
    owned_scope: "`packages/workflow-bundle/test/workflow-bundle-utils.test.js`, new `project-context-lifecycle.test.js`; baseline and supported-version evidence in s07"
    depends_on: "Readiness gates"
    verification_hint: "RED cases for native discovery, unsafe overwrite, missing project context, wrong-project/stale recovery. Record exact harness versions and stable main commit; do not count a missing import as a behavior repro."
  - id: T2
    title: "T2 — Safe native instruction install"
    owned_scope: "`adapters/codex/adapter.json`, Claude adapter if needed, `workflow-bundle-utils.js`, `workflow-bundle-cli.js`, installer tests"
    depends_on: "T1"
    verification_hint: "Codex/Claude x global/project/both; pre-existing override; legacy full-file managed hashes; unmanaged content unchanged; duplicate markers/conflict; interrupted write; twice-run byte idempotence."
  - id: T3
    title: "T3 — Canonical context and handoff"
    owned_scope: "`init-workflow-bundle.js`, new `workflow-session-context.js`, related tests; context template owner discovered by init; existing workflow authoring integration"
    depends_on: "T1"
    verification_hint: "Correct purpose/code map/commands; zero/one/multiple active items; pending gate; stale source hash; branch/worktree switch; malformed state; no work-item creation during read. Bound output and preserve source links."
  - id: T4
    title: "T4 — Harness integration"
    owned_scope: "`scripts/hooks/load-workflow-context.sh`, `persist-context.sh`, shared helper/adapter integration, `sync-workflow-bundle-runtime.js`, hook tests"
    depends_on: "T2,T3"
    verification_hint: "Supported Claude startup/compact/end events and merge preservation; tested Codex startup/handoff fallback; timeout, abrupt exit and concurrent-session isolation. No absolute checkout paths."
  - id: T5
    title: "T5 — Portable history companion"
    owned_scope: "`mcp/session-search/package.json`, lockfile, `src/core.js`, `src/index.js`, `test/core.test.js`, `test/containment.test.js`; installer config integration"
    depends_on: "T1"
    verification_hint: "Pin SDK/cass compatibility; fresh/stale/missing index; Codex and Claude history fixtures; deny other project roots/symlinks/traversal; poisoning remains data; Node/dependency errors visible; no background indexing by default."
  - id: T6
    title: "T6 — Package and diagnose"
    owned_scope: "`workflow-bundle-cli.js`, manifests, package allowlists, runtime sync, release-candidate smoke tests, `packages/workflow-bundle/README.md`"
    depends_on: "T2–T5"
    verification_hint: "status read-only and per-capability; package core + companion in temp; hide checkout; clean/2.9-upgrade/idempotence/conflict/rollback on core Node18/22 and companion Node20/22. Existing test suite, validators and runtime parity pass."
  - id: T7
    title: "T7 — Pilot full lifecycle"
    owned_scope: "Temporary ai-maintainer fixture first; approved target's AGENTS.md, CLAUDE.md or version-appropriate bridge, project-context and owned local settings/hooks only"
    depends_on: "T6"
    verification_hint: "Start Codex fresh, establish verified facts, checkpoint a distinctive test decision, close/reopen in Claude, recover correct next action with sources; reverse direction; compaction; no cross-project leak. Preserve initial dirty-file hashes. Record observed sessions, not simulated claims. Request external-root write access for actual pilot."
  - id: T8
    title: "T8 — Release and upgrade handoff"
    owned_scope: "Version metadata via existing bump tool; `docs/releases/workflow-bundle-v2.10.0.md` if version available; EN/VI installation docs; immutable assets; s08"
    depends_on: "T7 + terminal approvals"
    verification_hint: "QC evidence CTX-01..12; UAT and rollback pass; exact SHA-256 manifest; tagged-source CI green; authorized publish; downloaded artifact verification; actionable project-root-specific update commands and diagnostic output examples."
```

All tasks remain NOT STARTED. Maintainer accepted the scope and sequence; trusted readiness receipts are pending.

## Verification Plan

Mandatory negative cases: missing instruction entrypoint; override shadowing; instruction conflict; denied write; absent/unsupported hook; stale/missing history; malicious transcript instruction; wrong repo; two active work items; truncated briefing; malformed cache; abrupt termination; concurrent handoffs; dependency missing; repeated update; rollback with intervening user edits. No critical behavior can be waived as “skills installed”.

Run targeted RED/GREEN first. After batches pass, run `npm run validate:workflow:unit`, pack audit, authoring/bundle smoke and the scoped validate/governance/sdd/change/exec/plan lanes from the implementation worktree. Run companion tests in its directory, static/syntax checks, packaging secret/path inspection and UTF-8 checks. Test the exact packed artifacts, not source-only behavior. Do not claim native Windows coverage unless actually executed; publish an accurate platform matrix.

## Brownfield Delivery Plan

Create an isolated worktree from reviewed stable main after approval. Preserve all dirty files in root and ai-maintainer. Keep approved earlier work-item hosts unchanged. Install to temporary homes/project fixtures before touching a live target. Keep migration backups and old tarballs; restore only owned bytes with matching hashes. Publish upgrade instructions for explicit project roots; never recursively discover and mutate arbitrary projects.

## Governance Checks

Every task is pending. Admission/dedup and readiness receipts are outstanding. A3–A4 is independent and its code must not be absorbed before its own closeout. s07 and s08 are created when implementation/verification starts. Do not mark release ready on unit-test results alone.

## Traceability

T1/T2 → CTX-01/07. T3 → CTX-02/03/04. T4 → CTX-01/04/10. T5 → CTX-05/06/09/10. T6 → CTX-07/08/09/10/12. T7 → CTX-11 and cross-session scenarios. T8 → CTX-09/11/12 and release evidence.

## Handoff

Review SRS+s04+s05+s06 together with admission/change scope. After trusted readiness approval, execute T1–T8 sequentially without re-asking for routine reversible work inside the approved paths. Human terminal gates remain evidence-based.
