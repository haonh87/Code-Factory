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
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
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
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
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
> Draft T0–T4 sequence; T0 blocks execution until platform/isolation inputs and all authoring gates are resolved.

## Step Contract

```yaml
step: "s06"
step_goal: "Provide owned paths, ordering and verification checkpoints for the accepted boundary."
input_summary:
  - "Accepted parent containment scope and three verified Maintainer admission dispositions."
  - "Existing scripts at main 5a81126; spec card and named environment gaps."
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
implementation_goal: "Deliver the spec-card containment contract through the smallest local three-file change."
scope_guards:
  - "No production/test edit before T0. No CI/runner file, install parameter or release change without scope review."
  - "Sequential agentic execution; no delegation or concurrent writes."
task_breakdown:
  - id: "T0"
    owner_role: "developer"
    name: "Resolve fixture environment and seal authoring"
    objective: "Resolve both input gaps and obtain work-item/authoring receipts before any test or source implementation."
    paths_in_scope:
      - "work-items/contain-legacy-codex-installer-paths"
      - "product-specs/cards/contain-legacy-codex-installer-paths.md"
    dependencies: []
    outputs_expected:
      - "Named disposable host/engines and exact safe entry-point invocation"
      - "Final approved AC/design/plan bindings and normal CLI activation"
    review_checkpoint: "BA/QC DoR, Developer approach/plan and independent security perspective; no gate is inferred from admission."
    verification_hint: "Confirm receipts/current hashes and fixture boundary design; if Windows/CI or input contract expands, stop for scope amendment."
  - id: "T1"
    owner_role: "developer"
    name: "Capture regression RED safely"
    objective: "Create the single focused test with controlled source inputs and before/after sentinel snapshots in the approved disposable environment."
    paths_in_scope:
      - "packages/workflow-bundle/test/legacy-installer-containment.test.js"
    dependencies:
      - "T0"
    outputs_expected:
      - "Observed rejection regression failures for Bash and PowerShell at the unsafe baseline"
      - "Positive controls proving the fixture reaches actual entry points"
    review_checkpoint: "Review fixture isolation before first invocation; run Spec Compliance before test quality."
    verification_hint: "Run node packages/workflow-bundle/test/legacy-installer-containment.test.js only inside T0-approved environments; record case/engine RED outcomes. Never point scripts at the real user profile."
  - id: "T2"
    owner_role: "developer"
    name: "Implement Bash preflight"
    objective: "Move every target write after the complete validated operation plan and satisfy the matrix for Bash."
    paths_in_scope:
      - "adapters/codex/install-codex-workflow.sh"
      - "packages/workflow-bundle/test/legacy-installer-containment.test.js"
    dependencies:
      - "T1"
    outputs_expected:
      - "Minimal Bash change and corresponding GREEN cases"
    review_checkpoint: "AC compliance first, then shell quoting/literal-path and no-follow review."
    verification_hint: "Bash syntax check and real-entry-point malformed-state/alias/name matrix with unchanged negative snapshots; supported valid cases pass."
  - id: "T3"
    owner_role: "developer"
    name: "Implement PowerShell preflight"
    objective: "Apply the same contract before deduplication, mutation and optional drive-root actions."
    paths_in_scope:
      - "adapters/codex/install-codex-workflow.ps1"
      - "packages/workflow-bundle/test/legacy-installer-containment.test.js"
    dependencies:
      - "T2"
    outputs_expected:
      - "Minimal PowerShell change and Windows-specific GREEN evidence"
    review_checkpoint: "AC compliance first, then literal-path/reparse/encoding/error handling review."
    verification_hint: "PowerShell parser and focused runtime matrix on the agreed Windows engines; reparse/reserved-name and UTF-8 BOM/CRLF cases must execute or remain blocking."
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
    verification_hint: "Focused test plus package unit runner and applicable validators; record baseline failures separately. Strict UTF-8, source-only allowlist and unmanaged sentinel comparisons. Missing required platform evidence blocks completion."
dependencies_global:
  - "OQ-PI-ENV"
  - "OQ-PI-ISOLATION"
  - "Human work-item, Spec, DoR, Approach and Task Plan approvals."
risk_notes:
  - "Real entry-point fixtures invoke destructive operations and require verified OS-level disposable isolation."
  - "No full Windows PASS from parser-only or Bash evidence."
notes_for_implementation: "This is a draft, not an opened implementation path. Do not improvise the T0 invocation when environment input is missing."
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
  - "node packages/workflow-bundle/test/legacy-installer-containment.test.js (inside approved disposable environment)"
  - "node packages/workflow-bundle/test/run-all.js (after baseline attribution)"
  - "wfc naming/governance/exec/plan/protocol with explicit child project/workflow roots"
blocked_detail: "Exact Windows invocation, engine versions and disposable-account provision remain OQ-PI-ENV/ISOLATION; this missing detail blocks final Task Plan readiness."
not_applicable:
  - "Database, app build/typecheck, browser UI, live install, tag/publication and deployment."
security_review: "Focused malformed-state and filesystem-boundary review; not a whole-pack security scan."
```

## Governance Checks

```yaml
checklist_applied:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
checks:
  - check: "Every task has concrete ownership and verify intent"
    status: "PASS"
  - check: "Final safe fixture invocation and Windows host known"
    status: "FAIL"
blocking_items:
  - "OQ-PI-ENV"
  - "OQ-PI-ISOLATION"
owner: "developer/qc"
next_action: "Resolve T0 input before approval and activation."
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
  - "packages/workflow-bundle/test/legacy-installer-containment.test.js"
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

Draft authoring only. The work item remains MATERIALIZED/s01 with no implementation grants. Close the named readiness gaps and request the applicable human review; no gate is self-approved.

## Authoring Verification

On 2026-10-13, naming/governance/execution/planning each pass for eight child notes. Full child-root protocol passes for 23 managed items with 21 legacy skips; the earlier missing-s01 failure is resolved by signed recovery. Full-root SDD passes for 57 existing SDD notes; this child retains `sdd_mode=none`, so that result is not claimed as automated validation of its spec card. A separate direct check validates the card's four requirements, six unique AC mappings and exact SHA-256 reference in s04. All nine Markdown artifacts parse as YAML/UTF-8 with no BOM/replacement character; whitespace checks pass.

The recovered raw report, s01 protocol projection and generated s07/s08 templates remain byte-preserved. All 934 baseline source files outside the child report are unchanged; all pre-existing main/audit files and 19 root untracked files are retained. No installer, source regression, platform runtime, signing command, release or global installation ran during authoring. These are draft-quality checks, not DoR/Approach/Task Plan approvals or behavioral PASS evidence. Review checked scope/AC fidelity before artifact quality; OQ-PI-ENV and OQ-PI-ISOLATION remain explicit blockers.

Follow-up correction on 2026-10-13: the final s03 wording edit after the initial YAML check introduced an over-indented `question` key in OQ-PI-ENV. The prior blanket YAML PASS did not cover that last edit. Its indentation is now corrected, and all nine Markdown files' frontmatter/fenced YAML, UTF-8 and the s04 spec digest have been rechecked successfully. No question meaning, approval, protocol state or readiness verdict changes. The user's subsequent `accept` does not identify whether Windows verification will use an existing host or a new CI runner; that selection is being clarified before revising the execution plan.
