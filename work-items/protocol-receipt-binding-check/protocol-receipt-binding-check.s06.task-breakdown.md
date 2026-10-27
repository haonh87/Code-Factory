---
artifact_id: "protocol-receipt-binding-check.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "protocol-receipt-binding-check"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: FEATURE
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
  card: "product-specs/cards/protocol-receipt-binding-check.md"
spec_status: approved
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
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
  dod: ["qc"]
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
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-10-27T02:46:56.257Z"
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
  - "protocol-receipt-binding-check.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 — Task Plan

> [!summary]
> Four human-reviewed tasks cover AC-RB-001..009. No implementation has run. Execute only
> after validating the signed readiness receipts, isolation and explicit s07 activation grants.

## Step Contract

```yaml
step_goal: "Define an executable, minimal correction with fail-first evidence and explicit human boundaries."
input_summary: ["Approved Spec Card and Approach A"]
output_summary: ["Owned paths", "Dependency order", "Verify/review checkpoints"]
done_when: ["Each task has concrete output and verification; no placeholder implementation instruction remains."]
owner: developer
```

## Main Artifact

```yaml
implementation_goal: "Correct collector receipt binding while preserving all existing approval guards."
scope_guards:
  - "Two production/test paths only; do not widen into signing, schema, namespace or lifecycle redesign."
  - "Drafts and admission are not a production write grant."
task_breakdown:
  - id: T0
    owner_role: developer
    name: "Validate readiness and isolate current source"
    objective: "Require MATERIALIZED/approved admission, matching readiness receipts, then use a current-main isolated worktree with supported anchor handling."
    paths_in_scope: ["work-items/protocol-receipt-binding-check"]
    dependencies: []
    outputs_expected: ["Readiness/receipt digest matrix", "Current source and test baseline", "Worktree owner and exact activation grants"]
    review_checkpoint: "No implementation until s07 ACTIVE with applicable gates satisfied. Preserve the old detached worktree; never hand-edit its report anchor."
    verification_hint: "Source CLI status/gate-status; read-only protocol validation; compare host hashes and declared paths before activation. If no supported worktree-anchor relocation exists, surface the exact blocker rather than editing CLI-owned state."
  - id: T1
    owner_role: developer
    name: "Reproduce collector behavior through controlled validator fixtures"
    objective: "Add synthetic full/Light projects that exercise the real validator and retain valid controls."
    paths_in_scope: ["packages/workflow-bundle/test/work-item-protocol.test.js"]
    dependencies: [T0]
    outputs_expected: ["RED for stale hash/ref at MATERIALIZED", "Named matching/missing/invalid/I-O and opaque-state controls", "No live work-item/receipt dependency"]
    review_checkpoint: "Spec Compliance against ACs before fixture Code Quality; confirm RED comes from false contradiction, not malformed setup."
    verification_hint: "Run the focused protocol test; assert exact false-error presence/absence and lifecycle stale rejection; snapshot temporary files to prove read-only validation. Fixture signing only uses isolated test trust roots, never the real identity."
  - id: T2
    owner_role: developer
    name: "Apply the bounded collector correction"
    objective: "Gate approvedGates membership on current-host ref/hash binding using existing helpers."
    paths_in_scope: ["packages/workflow-bundle/scripts/validate-work-item-protocol.js"]
    dependencies: [T1]
    outputs_expected: ["Minimal correction", "GREEN for every T1 negative/control", "No stored-state or message-format migration"]
    review_checkpoint: "Spec Compliance then Code Quality: profile mapping, narrow missing-host handling, signature-first logic and zero trust-store writes."
    verification_hint: "Run protocol, trusted-approval-utils and gate-evidence-utils tests; inspect diff for absence of broad exception handling or signing/namespace changes."
  - id: T3
    owner_role: qc
    name: "Verify source-bound delivery and prepare DoD"
    objective: "Map all nine criteria to actual results and preserve unrelated work and signed state."
    paths_in_scope: ["work-items/protocol-receipt-binding-check"]
    dependencies: [T2]
    outputs_expected: ["s07 ordered review evidence", "s08 AC coverage, regression/compatibility summary and residuals", "No self-approved DoD"]
    review_checkpoint: "Explicit QC opening of Verify and human DoD after evidence; merge/release/cleanup remain separately authorized."
    verification_hint: "Focused suites, registered run-all.js with required generated runtime in a disposable copy, syntax, workflow/governance/protocol/planning and UTF-8/whitespace. Compare pre/post error sets; unexplained failures block PASS."
dependencies_global: ["Three signed admission dispositions and supported recovery", "Work-item approval", "Spec/DoR/Approach/Task Plan current-host receipts", "Explicit activation with owned paths"]
notes_for_implementation: "If existing helpers cannot meet Approach A without broader source changes, revise Approach/Task Plan before expanding."
```

## Verification Plan

Unit/integration: actual-validator synthetic fixtures and existing protocol/trust/resolver suites.
Full registered suite: run once on the final source with generated runtime prerequisites isolated
from the working tree. Static: node --check on touched JS. Security: targeted trust-attribution
review and non-mutation fixture evidence; this is not the parent's whole-pack security scan.
Database, browser, container, hosted release and live installation: not applicable to this patch.
Preserve all human receipts; do not use a green test result as a completion verdict.

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks:
  - "No production code changed; admission was signed by the human and recovered by the source CLI."
  - "Existing proposal, signed-history boundary and scope acceptance preserved."
blocking_items: []
owner: "developer/qc"
next_action: "Human review is recorded; verify all independent receipts and exact activation scope before implementation."
```

## Brownfield Delivery Plan

```yaml
regression_checkpoints: ["T0 before state", "T1 correct RED", "T2 GREEN plus ordered review", "T3 full error-set/AC evidence"]
compatibility_checkpoints: ["Full/Light host mapping", "Shared namespace", "Opaque legacy entries", "Existing lifecycle refusals"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Revert only reviewed correction commits; preserve reports, receipts and unrelated workspace state."]
```

## Delivery Rule Decisions

```yaml
tdd_status: REQUIRED
worktree_status: REQUIRED
worktree_reason: "Approval diagnostic affects all validator consumers and may span sessions."
review_mode: targeted
review_order: [spec_compliance, code_quality]
delegation_mode: agentic
independence_status: NOT_APPLICABLE
delegation_reason: "One tightly coupled collector/test path; no subagent or parallel implementation."
```

## Traceability

```yaml
upstream: ["protocol-receipt-binding-check.s05.technical-approach.md"]
task_refs:
  - "T1/T2: AC-RB-001..008"
  - "T0/T1/T3: AC-RB-009"
  - "T3: AC-RB-001..009 final evidence"
next_step: "Verify current-host receipts and execute T0; no production writes before s07 ACTIVE."
```
