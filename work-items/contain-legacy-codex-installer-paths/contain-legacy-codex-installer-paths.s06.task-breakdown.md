---
artifact_id: "contain-legacy-codex-installer-paths.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "contain-legacy-codex-installer-paths"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
  card: "product-specs/cards/contain-legacy-codex-installer-paths.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
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
  task_plan_reviewed_by: [developer]
  task_plan_reviewed_at: "2026-10-13T13:22:58Z"
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
  - "contain-legacy-codex-installer-paths.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 — Task Plan

> [!summary]
> Reviewable T0–T4 plan with dedicated CI and standalone integration fixtures; normal activation still requires all human authoring receipts.

## Step Contract

```yaml
step: "s06"
step_goal: "Provide owned paths, ordering and verification checkpoints for the accepted boundary."
input_summary:
  - "Accepted parent containment scope and three verified Maintainer admission dispositions."
  - "Existing scripts at main 5a81126; user-selected Windows CI and the proposed source-bound fixture contract."
output_summary:
  - "Concrete draft artifact with owner, evidence and remaining gates."
done_when:
  - "The draft is reviewable and its missing inputs are explicit; this does not mean the human gate passed."
owner: "developer"
constraints:
  - "No production/test implementation, installer execution or signing by the agent."
timebox: "One authoring pass; unresolved external verification input remains explicit."
```

## Main Artifact

```yaml
implementation_goal: "Deliver the spec through four bounded delivery paths with isolated CI evidence."
scope_guards:
  - "Only the four delivery paths named in tasks; no existing workflow/runner edit, install parameter or release change."
  - "Sequential agentic execution; no delegation or concurrent writes."
task_breakdown:
  - id: "T0"
    owner_role: "developer"
    name: "Seal the revised authoring packet"
    objective: "Obtain the five independent approvals and activate only the revised owned paths."
    paths_in_scope:
      - "work-items/contain-legacy-codex-installer-paths"
      - "product-specs/cards/contain-legacy-codex-installer-paths.md"
    dependencies: []
    outputs_expected:
      - "Exact signed host/spec bindings and CLI activation with four delivery paths plus owned authoring/evidence paths"
    review_checkpoint: "BA/QC DoR, Developer approach/plan and independent security perspective; no gate is inferred from admission."
    verification_hint: "Verify current work-item and spec/dor/approach/task_plan receipts; preserve three signed admission dispositions and no unrelated grants."
  - id: "T1"
    owner_role: "developer"
    name: "Capture regression RED safely"
    objective: "Implement the dedicated CI matrix and standalone fixture harness, verify isolation, then capture meaningful RED against unchanged installers."
    paths_in_scope:
      - "packages/workflow-bundle/test/legacy-installer-containment.integration.js"
      - ".github/workflows/legacy-installer-containment.yml"
    dependencies:
      - "T0"
    outputs_expected:
      - "Pinned CI action identities and exact runner/engine preflight logs"
      - "Fixture safety negatives: local/no-flag/pre-existing-root/platform mismatch rejected before any target write"
      - "Hosted Windows/Linux/macOS RED with unchanged production scripts and positive controls"
    review_checkpoint: "Review fixture isolation before first invocation; run Spec Compliance before test quality."
    verification_hint: "Run the three exact s05 job commands after fixture preflight. Push the test/workflow-only commit on the named branch; retain failing case evidence before T2. Never count setup/engine failure as RED."
  - id: "T2"
    owner_role: "developer"
    name: "Implement Bash preflight"
    objective: "Move every target write after the complete validated operation plan and satisfy the matrix for Bash."
    paths_in_scope:
      - "adapters/codex/install-codex-workflow.sh"
      - "packages/workflow-bundle/test/legacy-installer-containment.integration.js"
    dependencies:
      - "T1"
    outputs_expected:
      - "Minimal Bash change and corresponding GREEN cases"
    review_checkpoint: "AC compliance first, then shell quoting/literal-path and no-follow review."
    verification_hint: "Run bash -n and the s05 Linux/macOS commands through CI; confirm focused rejection GREEN and valid-install regressions for both /bin/bash versions."
  - id: "T3"
    owner_role: "developer"
    name: "Implement PowerShell preflight"
    objective: "Apply the same contract before deduplication, mutation and optional drive-root actions."
    paths_in_scope:
      - "adapters/codex/install-codex-workflow.ps1"
      - "packages/workflow-bundle/test/legacy-installer-containment.integration.js"
    dependencies:
      - "T2"
    outputs_expected:
      - "Minimal PowerShell change and Windows-specific GREEN evidence"
    review_checkpoint: "AC compliance first, then literal-path/reparse/encoding/error handling review."
    verification_hint: "Run the s05 Windows command using Desktop 5.1 with full name/reparse/BOM/CRLF matrix; no missing mandatory case may PASS."
  - id: "T4"
    owner_role: "qc"
    name: "Verify compatibility and parent contribution"
    objective: "Compare direct evidence against every AC, record residual limits and request independent final human decisions."
    paths_in_scope:
      - "work-items/contain-legacy-codex-installer-paths"
    dependencies:
      - "T3"
    outputs_expected:
      - "s08 AC/evidence table and source-bound regression summary"
      - "Human DoD and Business Acceptance requests; no release claim"
    review_checkpoint: "Separate human DoD/Business Acceptance; no parent closure from child code completion."
    verification_hint: "Require all three hosted jobs/artifacts on one final SHA with complete case inventory; reconcile earlier RED commits and unchanged input spec. Run unit/regression validators and UTF-8 checks. Record source/CI risks before human DoD/Business Acceptance."
dependencies_global:
  - "Human work-item, Spec, DoR, Approach and Task Plan approvals; normal CLI activation."
risk_notes:
  - "Real entry-point fixtures invoke destructive operations and require verified OS-level disposable isolation."
  - "No full Windows PASS from parser-only or Bash evidence."
notes_for_implementation: "Follow the s05 CI Verification Contract exactly; stop on failed isolation/engine setup, missing evidence or an additional required write path."
```

## Verification Plan

```yaml
levels:
  - "Fixture-isolation review before execution"
  - "Focused entry-point behavioral RED/GREEN"
  - "Package unit regression and workflow artifact checks"
  - "Independent spec compliance then code quality and human terminal gates"
required_commands:
  - "bash -n adapters/codex/install-codex-workflow.sh"
  - "node packages/workflow-bundle/test/legacy-installer-containment.integration.js --engine powershell51 --ci-disposable --evidence-dir .artifacts/installer-containment/windows (dedicated hosted job only)"
  - "node packages/workflow-bundle/test/legacy-installer-containment.integration.js --engine bash --ci-disposable --evidence-dir .artifacts/installer-containment/linux (dedicated hosted job only)"
  - "node packages/workflow-bundle/test/legacy-installer-containment.integration.js --engine bash --ci-disposable --evidence-dir .artifacts/installer-containment/macos (dedicated hosted job only)"
  - "node packages/workflow-bundle/test/run-all.js (does not discover the standalone integration file)"
  - "wfc naming/governance/exec/plan/protocol with explicit child project/workflow roots"
not_applicable:
  - "Database, app build/typecheck, browser UI, live install, tag/publication and deployment."
security_review: "Focused malformed-state and filesystem-boundary review; not a whole-pack security scan."
execution_guard: "No generic unit run executes installer fixtures; no silent skip branch exists in the standalone integration command. CI/engine/isolation prerequisites fail nonzero."
evidence_gate: "The source branch may capture intentional RED before T2; child final verification requires three GREEN jobs for the exact final SHA."
```

## Governance Checks

```yaml
checklist_applied:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
checks:
  - check: "Every task has concrete ownership and verify intent"
    status: "PASS"
  - check: "Exact hosted jobs, engine assertions, profile isolation, evidence and commands specified"
    status: "PASS"
blocking_items: []
owner: "developer/qc"
next_action: "Request human Task Plan approval on the four-path boundary and CI Verification Contract."
```

## Brownfield Delivery Plan

```yaml
regression_checkpoints:
  - "Capture unsafe baseline in controlled fixtures; compare both scripts to the same contract."
  - "Retain 42 canonical skills, current/legacy precedence and unmanaged preservation evidence."
compatibility_checkpoints:
  - "product-specs/cards/contain-legacy-codex-installer-paths.md#Input and Compatibility Contract"
migration_or_backfill_steps:
  - "None."
rollback_or_restore_steps:
  - "Review a source revert if required; retain evidence and installed state."
```

## Traceability Matrix

```yaml
task_refs:
  - acceptance: "AC-PI-001"
    tasks:
      - "T0"
      - "T1"
      - "T2"
      - "T3"
      - "T4"
  - acceptance: "AC-PI-002"
    tasks:
      - "T0"
      - "T1"
      - "T2"
      - "T3"
      - "T4"
  - acceptance: "AC-PI-003"
    tasks:
      - "T0"
      - "T1"
      - "T2"
      - "T3"
      - "T4"
  - acceptance: "AC-PI-004"
    tasks:
      - "T0"
      - "T1"
      - "T2"
      - "T3"
      - "T4"
  - acceptance: "AC-PI-005"
    tasks:
      - "T0"
      - "T1"
      - "T2"
      - "T3"
      - "T4"
  - acceptance: "AC-PI-006"
    tasks:
      - "T0"
      - "T1"
      - "T2"
      - "T3"
      - "T4"
test_refs:
  - "packages/workflow-bundle/test/legacy-installer-containment.integration.js"
```

## Workspace Isolation

```yaml
worktree_target: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/legacy-codex-installer-containment"
planning_track: "full"
risk_signals:
  - "Destructive filesystem boundary"
  - "Multiple authoring/review sessions"
worktree_decision: "REQUIRED"
decision_reason:
  - "Keep source-fix ownership isolated from main and parent audit."
isolation_strategy:
  branch_name: "fix/legacy-codex-installer-containment"
  worktree_path: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/legacy-codex-installer-containment"
  base_commit: "5a81126c69a0c6e193b416c7c93c5b8bb5277ec7"
execution_guards:
  - "Allowlist is derived from task_breakdown; all source/test grants remain unopened."
  - "No global home writes, environment override shortcut, live installer, or production delegation."
cleanup_preconditions:
  - "Child Verify and explicit DoD verdict; no open findings or unsafe dirty paths; separate integration/finish decision."
skip_reason: ""
```

## Traceability

```yaml
spec_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md"
next_step: "s07 only after all receipts and activation"
```

## Handoff

The user explicitly accepted packet `89131d9`. Content approval is recorded; trusted receipt sealing and CLI activation remain pending. The CLI lifecycle remains MATERIALIZED/s01 with no implementation grants.

## Authoring Verification

On 2026-10-13, naming/governance/execution/planning each pass for eight child notes. Full child-root protocol passes for 23 managed items with 21 legacy skips; the earlier missing-s01 failure is resolved by signed recovery. Full-root SDD passes for 57 existing SDD notes; this child retains `sdd_mode=none`, so that result is not claimed as automated validation of its spec card. A separate direct check validates the card's four requirements, six unique AC mappings and exact SHA-256 reference in s04. All nine Markdown artifacts parse as YAML/UTF-8 with no BOM/replacement character; whitespace checks pass.

The recovered raw report, s01 protocol projection and generated s07/s08 templates remain byte-preserved. All 934 baseline source files outside the child report are unchanged; all pre-existing main/audit files and 19 root untracked files are retained. No installer, source regression, platform runtime, signing command, release or global installation ran during authoring. These are draft-quality checks, not DoR/Approach/Task Plan approvals or behavioral PASS evidence. Review checked scope/AC fidelity before artifact quality; OQ-PI-ENV and OQ-PI-ISOLATION remain explicit blockers.

Follow-up correction on 2026-10-13: the final s03 wording edit after the initial YAML check introduced an over-indented `question` key in OQ-PI-ENV. The prior blanket YAML PASS did not cover that last edit. Its indentation is now corrected, and all nine Markdown files' frontmatter/fenced YAML, UTF-8 and the s04 spec digest have been rechecked successfully. No question meaning, approval, protocol state or readiness verdict changes. The user's subsequent `accept` does not identify whether Windows verification will use an existing host or a new CI runner; that selection is being clarified before revising the execution plan.

## CI Authoring Review Request

The user selected option 1, Windows GitHub Actions. The updated packet proposes four delivery paths: two existing installer scripts, `packages/workflow-bundle/test/legacy-installer-containment.integration.js`, and `.github/workflows/legacy-installer-containment.yml`. The former `.test.js` destination was never created and is superseded before implementation so the normal unit runner cannot execute destructive fixtures on a personal profile. The dedicated integration command refuses missing hosted/engine/isolation prerequisites rather than silently skipping. Linux and macOS jobs preserve the Bash script's existing supported surfaces under the same ephemeral-runner model.

The earlier environment/DoR BLOCKED observations and validation correction above are historical. Current discovery inputs are resolved, the AI readiness recommendation is READY, and all human gates remain pending. Request one human interaction covering work-item approval, Spec, DoR, Approach A and Task Plan; each gate still requires its own receipt. No live CI or runtime result is claimed.

Current CI packet verification: naming, governance, execution and planning PASS for eight notes; protocol PASS for 23 managed items (21 legacy skips); full-root SDD PASS for 57 existing notes, without claiming SDD validation for this non-SDD child. All nine Markdown files and 71 YAML blocks parse, UTF-8 and whitespace checks pass, and the current spec digest matches s04. Baseline comparison confirms only the seven intended authoring files changed; root, parent audit, protocol report and generated s07/s08 remain preserved. Review order was scope/spec compliance, then artifact quality. Platform behavior remains untested pending implementation approval.

## Human Approval Record

The repository owner replied **accept** to the explicit request covering Work-item, Spec/DoR, Approach A and Task Plan at checkpoint `89131d9`. Recorded at `2026-10-13T13:22:58Z` (recording time, not a claimed chat timestamp). This records the human decision, not an agent approval or a trusted signature. Scope, requirements, ACs, approach and task order are unchanged. Normal CLI sealing and verification must precede activation.

The reviewed authority assignments are Maintainer for work-item approval, BA for Spec, BA/QC for DoR, and Developer for Approach and Task Plan. One human ready-bundle interaction produces separate authoring receipts. No DoD, Business Acceptance, Release, merge or cleanup approval is included. Freeze s04/s05/s06 after this finalization; further handoff progress belongs to the parent s07.
