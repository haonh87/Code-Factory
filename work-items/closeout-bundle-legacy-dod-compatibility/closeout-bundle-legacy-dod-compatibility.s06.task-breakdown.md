---
artifact_id: "closeout-bundle-legacy-dod-compatibility.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "closeout-bundle-legacy-dod-compatibility"
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
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
  - "devops"
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
  dod: "required"
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
  release:
    - "devops"
    - "qc"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-09-03T08:06:40Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-09-03T08:06:40Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-09-04T04:24:12Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-09-04T04:46:28Z"
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
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.s04.acceptance-criteria.md"
  - "closeout-bundle-legacy-dod-compatibility.s05.technical-approach.md"
linked_artifacts:
  - "closeout-bundle-legacy-dod-compatibility.work-item-report.json"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../packages/workflow-bundle/scripts/workflow-gate-review.js"
  - "../../packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
  - "../../packages/workflow-bundle/test/work-item-protocol.test.js"
  - "../../packages/workflow-bundle/test/workflow-gate-review.test.js"
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> The Developer approved this Task Plan at `2026-09-04T04:46:28Z`: execute a true-legacy RED fixture
> batch, one focused selector correction, and transaction/regression evidence in the existing worktree.
> Review Spec Compliance before Code Quality, then hand one immutable v2.6.2 candidate to s08.
> Implementation remains closed until the Task Plan receipt is sealed and s07 is explicitly activated.

## Step Contract
```yaml
step: "s06 Task Plan"
goal: "Convert the approved canonical-resolver Approach into an ordered, path-owned, TDD-first execution plan."
value: "Remove implementation guesswork while preserving atomicity, compatibility, provenance, and human authority."
scope_in:
  - "True legacy maintenance and product-release fixtures"
  - "Legacy closeout selector correction"
  - "Atomicity, retry, compatibility, review, and exact-candidate evidence"
scope_out:
  - "Transaction coordinator, receipt, signer, schema, protocol lifecycle, adaptive_v1, readiness, and OBS-CLD-001 changes"
  - "Parent terminal approval, publication, tagging, merge, or cleanup"
inputs_required:
  - "Approved Spec/DoR and Approach receipt SHA-256 417d9ca7996fd444e7592c46f1a4475416d77c77b7db2aaaef487dd034258e8e"
  - "AC-CLD-01..08, EDGE-CLD-01..06, and Option A"
outputs_required:
  - "Exact task paths, dependencies, TDD evidence, review checkpoints, and verify paths"
done_when:
  - "Every task has objective, paths, outputs, dependencies, review, and verification"
  - "Every AC maps to a task and verification path"
  - "No unresolved decision or placeholder remains"
constraints:
  - "T1 must fail for the expected legacy reasons before T2 changes production"
  - "Only workflow-gate-review.js changes production behavior"
  - "Adaptive and readiness branches remain unchanged"
  - "No new dependency, public action, schema, migration, or coordinator"
  - "Spec Compliance precedes Code Quality"
risks:
  - id: "R-S06-001"
    description: "A fixture accidentally exercises adaptive rather than legacy routing."
    mitigation: "Assert artifact_shape and report.gates are absent and s08 omits approval_gates.dod."
  - id: "R-S06-002"
    description: "Happy-path green does not prove atomic failure or retry behavior."
    mitigation: "Drive the real CLI through every exported transaction failure point and compare byte-level state."
  - id: "R-S06-003"
    description: "Local and hosted candidate identity diverge."
    mitigation: "Build once, record full SHA-256, and reuse that candidate for Node 18/22 verification."
timebox:
  target_duration: "One focused implementation and early-review cycle"
  escalation_rule: "Return to s05 if TDD requires changing the approved resolver or transaction boundary."
```

## Main Artifact
```yaml
implementation_goal: "Restore mandatory legacy DoD through the canonical resolver and prove the complete gate set through the unchanged atomic closeout path."
ba_lane:
  acceptance_coverage:
    - "AC-CLD-01/02 -> T1, T2"
    - "AC-CLD-03/04/06 -> T3"
    - "AC-CLD-05 -> T3, T5"
    - "AC-CLD-07 -> T5 and s08 hosted verification"
    - "AC-CLD-08 -> T5 handoff; parent closure follows child s08"
  scope_guards:
    - "Do not edit workflow-approval-transaction.js without reopening s05 on new failing evidence."
    - "Do not change adaptive_v1, readiness, receipt-v1, signer, telemetry, or CLI action names."
    - "Do not edit sealed s04/s05, historical receipts, or parent terminal evidence during s07."
    - "Do not absorb OBS-CLD-001 or publish, tag, merge, finalize, or clean the worktree."
  human_review_points:
    - "Developer approves and seals Task Plan before activation."
    - "QC reviews Spec Compliance before Developer/QC review Code Quality."
    - "QC controls Technical Verification/DoD; DevOps/QC control Release; PO controls Business Acceptance."
dev_lane:
  path_map:
    - owner: "Legacy selector"
      paths: ["packages/workflow-bundle/scripts/workflow-gate-review.js"]
    - owner: "Legacy CLI regression"
      paths: ["packages/workflow-bundle/test/work-item-protocol.test.js"]
    - owner: "Existing atomic regression"
      paths: ["packages/workflow-bundle/test/workflow-gate-review.test.js (execute unchanged)"]
    - owner: "Evidence"
      paths: ["work-items/closeout-bundle-legacy-dod-compatibility/*.s07.*", "work-items/closeout-bundle-legacy-dod-compatibility/*.s08.*"]
  technical_sequence:
    - "T0 baseline -> T1 RED -> T2 GREEN -> T3 atomicity/compatibility -> T4 two-tier review -> T5 candidate handoff"
  tdd_targets:
    - "Maintenance legacy fixture fails because the current selector finds no terminal gate."
    - "Product-release legacy fixture fails because the current selector omits DoD."
    - "T2 makes both green through the canonical resolver only."
task_breakdown:
  - id: "T0"
    owner_role: "developer"
    name: "Freeze baseline and owned worktree boundary"
    objective: "Record pre-change focused tests, receipts, dirty paths, and the files this defect may modify."
    paths_in_scope:
      - ".claude/worktrees/cr-008-adaptive-governance"
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "work-items/closeout-bundle-legacy-dod-compatibility/*.s07.*"
    dependencies: ["Task Plan receipt", "s07 activation"]
    outputs_expected:
      - "Branch/worktree and dirty-path inventory preserving unrelated CR-008 edits"
      - "Focused test baseline and four readiness receipt statuses"
      - "Owned scope in s07 Delivery Rule Evidence"
    review_checkpoint: "Confirm the selector, protocol test, and child evidence are the only writable defect paths."
    verification_hint: "Run git status --short, git diff --check, both focused tests, and wfc gate status for spec/dor/approach/task_plan; record outputs in s07."
  - id: "T1"
    owner_role: "developer"
    name: "Add true legacy failing-first fixtures"
    objective: "Reproduce missing DoD through the real approve-closeout-bundle CLI before production edits."
    paths_in_scope:
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "work-items/closeout-bundle-legacy-dod-compatibility/*.s07.*"
    dependencies: ["T0"]
    outputs_expected:
      - "Legacy report without artifact_shape or gates and s08 without approval_gates.dod"
      - "Maintenance RED: command finds no explicit terminal gate instead of selecting DoD"
      - "Product RED: command omits DoD while selecting Release and Business Acceptance"
    review_checkpoint: "SPEC_COMPLIANCE: QC confirms fixture shape matches BASE-CLD-001..004 and EDGE-CLD-01."
    verification_hint: "Run work-item-protocol.test.js and retain failures that name the two missing-DoD behaviors, not syntax or setup."
  - id: "T2"
    owner_role: "developer"
    name: "Reuse canonical finalized-gate resolution"
    objective: "Replace the legacy explicit-key filter with the approved canonical s08 gate set."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "work-items/closeout-bundle-legacy-dod-compatibility/*.s07.*"
    dependencies: ["T1 RED evidence"]
    outputs_expected:
      - "Import getRequiredFinalizedGateKeys"
      - "Legacy resolution uses snapshot approvalGates, sddMode, and artifactShape and filters to CLOSEOUT_GATES"
      - "Maintenance exact [dod] and product exact [dod, release, business_acceptance]"
      - "No adaptive, readiness, transaction, receipt, or reconciliation edit"
    review_checkpoint: "SPEC_COMPLIANCE checks AC-CLD-01/02; CODE_QUALITY checks one canonical call with no fallback or duplicate rule."
    verification_hint: "Rerun work-item-protocol.test.js to GREEN and run node --check on both changed JavaScript files."
  - id: "T3"
    owner_role: "developer"
    name: "Prove atomic state, retry, and compatibility"
    objective: "Show the complete resolved set traverses the unchanged transaction and reconciliation path safely."
    paths_in_scope:
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "packages/workflow-bundle/test/workflow-gate-review.test.js (execute unchanged)"
      - "work-items/closeout-bundle-legacy-dod-compatibility/*.s07.*"
    dependencies: ["T2"]
    outputs_expected:
      - "Exact receipts, reviewers, report/s01 state, actions, and audit event after success"
      - "Byte-identical receipt/report/s01/journal state at every transaction-fail-at boundary"
      - "Deterministic recovery and repeated unchanged closeout"
      - "Adaptive, readiness, receipt-v1, and dirty-delivery cases remain green"
    review_checkpoint: "QC checks AC-CLD-03..06; any transaction production edit reopens s05."
    verification_hint: "Run both focused tests, enumerate APPROVAL_TRANSACTION_FAILURE_POINTS, compare before/after bytes, and run the unchanged closeout twice."
  - id: "T4"
    owner_role: "developer/qc"
    name: "Perform mandatory two-tier s07 review"
    objective: "Review compliance with the approved chain before judging code quality."
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
      - "packages/workflow-bundle/test/work-item-protocol.test.js"
      - "work-items/closeout-bundle-legacy-dod-compatibility/*.s07.*"
    dependencies: ["T3"]
    outputs_expected:
      - "Separate Spec Compliance and Code Quality verdicts"
      - "No unresolved high finding before regression handoff"
    review_checkpoint: "Spec Compliance must pass or receive an explicit exception before Code Quality begins."
    verification_hint: "Map every implementation hunk to T1..T3 and AC-CLD-01..06, then record separate tier evidence and reviewer roles."
  - id: "T5"
    owner_role: "developer/qc/devops"
    name: "Run full regression and prepare exact-candidate handoff"
    objective: "Hand s08 one immutable v2.6.2 candidate identity without publishing it."
    paths_in_scope:
      - "packages/workflow-bundle/**"
      - ".github/workflows/workflow-guardrails.yml (verify unchanged)"
      - "work-items/closeout-bundle-legacy-dod-compatibility/*.s07.*"
      - "work-items/closeout-bundle-legacy-dod-compatibility/*.s08.* (s08 only)"
    dependencies: ["T4 Spec Compliance PASS", "T4 Code Quality PASS"]
    outputs_expected:
      - "Workflow validators, full unit, pack-audit, bundle-smoke, candidate smoke, syntax/static, security heuristic, and UTF-8 results"
      - "One v2.6.2 tarball with full SHA-256"
      - "Hosted Node 18/22 handoff for the same candidate"
      - "v2.6.1 rollback guard using individual terminal gates"
    review_checkpoint: "QC/DevOps reject evidence not bound to the full candidate digest or a matrix with any failed/skipped required job."
    verification_hint: "Run wfc validate/plan/protocol and all validate:workflow:* release checks; record tarball SHA-256 for later hosted comparison."
dependencies_global:
  - "T0 requires the Task Plan receipt and s07 activation."
  - "T1 expected RED gates T2; T2 is the only production task."
  - "T3 cannot edit the transaction coordinator without s05 re-review."
  - "T4 Spec Compliance precedes Code Quality; both gate T5."
risk_notes:
  - "Existing closeout fixtures are adaptive_v1 and cannot prove legacy compatibility."
  - "Failure injection stays behind the existing noninteractive fixture guard."
  - "v2.6.1 rollback is safe only with bundled closeout disabled."
verification_plan:
  - "Focused TDD RED/GREEN for two true legacy shapes"
  - "Real CLI atomic failure matrix and idempotent retry"
  - "Adaptive/readiness/receipt/dirty-delivery regression"
  - "Workflow validators, unit, pack audit, bundle smoke, diff, and candidate smoke"
  - "One full candidate SHA-256 reused by hosted Node 18/22"
  - "UTF-8 validation for changed Markdown, JSON, and JavaScript"
notes_for_implementation: >-
  Execute sequentially in the existing worktree, preserve unrelated parent edits, record RED before the
  selector edit, keep the transaction coordinator unchanged, and stop at human gates. No subagent is
  planned because T1 through T3 share one fixture and one tightly coupled behavior boundary.
```

## Verification Plan

- TDD: `node packages/workflow-bundle/test/work-item-protocol.test.js` before and after T2.
- Atomicity: `node packages/workflow-bundle/test/workflow-gate-review.test.js` plus new legacy CLI failure/retry cases.
- Syntax/static: `node --check` for changed JavaScript and `git diff --check`.
- Repository: `wfc validate`, `wfc plan`, `wfc protocol`, full unit, pack audit, bundle smoke, and candidate smoke.
- Security: confirm fixture-only failure injection, unchanged receipt signing/digests, no secret logging, and no dependency change.
- Encoding: verify all changed text decodes as UTF-8 without replacement bytes.
- Release: bind local and hosted Node 18/22 evidence to one v2.6.2 tarball SHA-256; no s07 publication or tag.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks:
  - id: "GOV-S06-001"
    result: PASS
    evidence: "Every AC maps to a named task and deterministic verification."
  - id: "GOV-S06-002"
    result: PASS
    evidence: "T1 enforces TDD and T4 enforces Spec Compliance before Code Quality."
  - id: "GOV-S06-003"
    result: PASS
    evidence: "Existing worktree is retained; the production boundary is one file; delegation is not used."
  - id: "GOV-S06-004"
    result: PASS
    evidence: "No migration, public contract, new dependency, or governance exception is planned."
blocking_items:
  - "Developer Task Plan approval and digest-matched trusted receipt"
  - "Explicit s07 activation with bounded write roots"
owner: "developer/qc"
next_action: "Developer reviews the Task Plan, then seals its receipt and activates s07."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "T0 baseline before edits"
  - "T1 expected RED before T2"
  - "T2 focused GREEN without adaptive/readiness changes"
  - "T3 success, failure, retry, and compatibility evidence"
  - "T5 full repository/package comparison"
compatibility_checkpoints:
  - "adaptive_v1 report.gates remains authoritative"
  - "Readiness keeps READY_BUNDLE_GATES"
  - "Receipt-v1, signer, reviewers, digest binding, and dirty-delivery guard remain unchanged"
  - "Legacy Light and non-Light keep mandatory DoD through the canonical resolver"
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Before publication, revert the focused selector/test delta if any required check fails."
  - "For runtime rollback, reinstall immutable v2.6.1, disable approve-closeout-bundle, and use individual terminal gates."
  - "Never rewrite historical receipts."
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-AG-007", "REQ-AG-008", "REQ-AG-009"]
acceptance_refs: ["AC-CLD-01", "AC-CLD-02", "AC-CLD-03", "AC-CLD-04", "AC-CLD-05", "AC-CLD-06", "AC-CLD-07", "AC-CLD-08"]
task_refs: ["T0", "T1", "T2", "T3", "T4", "T5"]
test_refs:
  - "legacy-maintenance-missing-dod-red-green"
  - "legacy-product-release-missing-dod-red-green"
  - "legacy-closeout-transaction-failure-matrix"
  - "legacy-closeout-idempotent-retry"
  - "adaptive-and-readiness-regression"
  - "exact-v2.6.2-candidate-node-18-22"
```

## Audit
```yaml
step: "s06 Task Plan"
status: PASS
checks:
  - criterion: "Executable paths and ownership"
    result: PASS
    evidence: "T0..T5 name exact source, test, evidence, pipeline, and worktree paths."
  - criterion: "TDD and review order"
    result: PASS
    evidence: "T1 RED precedes T2 GREEN; T4 Spec Compliance precedes Code Quality."
  - criterion: "Brownfield compatibility and release provenance"
    result: PASS
    evidence: "T3/T5 retain compatibility, atomicity, rollback, and exact-candidate guards."
  - criterion: "No placeholders or scope expansion"
    result: PASS
    evidence: "Every task has objective, paths, outputs, dependencies, review, and verification."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
gaps:
  - "The digest-matched trusted Task Plan receipt and explicit s07 activation are pending."
risk_level: HIGH
next_action: "Seal and verify the Developer-approved Task Plan receipt, then activate s07 with bounded write roots."
```

## Traceability
```yaml
upstream:
  - "closeout-bundle-legacy-dod-compatibility.s04.acceptance-criteria.md"
  - "closeout-bundle-legacy-dod-compatibility.s05.technical-approach.md"
outputs:
  - "T0..T5 execution plan"
  - "TDD and two-tier review sequence"
  - "Brownfield regression and exact-candidate handoff"
next_step: "s07 only after the Developer-approved Task Plan receives a digest-matched receipt and the work item is activated"
```

## Handoff

- First batch: T0 baseline, then T1 true-legacy RED fixtures.
- Only production change: T2 in `packages/workflow-bundle/scripts/workflow-gate-review.js`.
- Mandatory review: T4 Spec Compliance before Code Quality.
- Delegation: none; fixtures and selector are tightly coupled.
- Current human review: Developer approved Task Plan at `2026-09-04T04:46:28Z`.
- Current blocker: seal the Task Plan receipt and activate s07 with bounded write roots.
