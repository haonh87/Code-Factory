---
artifact_id: "materialization-dedup-recovery.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "materialization-dedup-recovery"
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
  srs: "product-specs/srs/materialization-dedup-recovery.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "sa"
  - "ta"
  - "developer"
  - "qc"
review_mode: self
verification_owner: "qc"
artifact_shape: adaptive_v1
request_lane: product_delivery
workflow_required: true
routing_reasons:
  - "LANE_PRODUCT_DELIVERY"
escalation_reasons:
  - "HARD_PUBLIC_CONTRACT"
  - "HARD_SECURITY_SENSITIVE"
role_reasons:
  po:
    - "ROLE_PO_PRODUCT_OUTCOME"
  ba:
    - "ROLE_BA_REQUIREMENTS"
  sa:
    - "ROLE_SA_PUBLIC_CONTRACT_BOUNDARY"
  ta:
    - "ROLE_TA_PUBLIC_CONTRACT_RISK"
    - "ROLE_TA_SECURITY_RISK"
  developer:
    - "ROLE_DEVELOPER_DELIVERY"
  qc:
    - "ROLE_QC_VERIFICATION"
gate_reasons:
  spec:
    - "GATE_SPEC_PRODUCT_DELIVERY"
  contract:
    - "GATE_CONTRACT_PUBLIC_CONTRACT"
  dor:
    - "GATE_DOR_PRODUCT_DELIVERY"
  approach:
    - "GATE_APPROACH_PRODUCT_DELIVERY"
  task_plan:
    - "GATE_TASK_PLAN_PRODUCT_DELIVERY"
  dod:
    - "GATE_DOD_PRODUCT_DELIVERY"
  business_acceptance:
    - "GATE_BUSINESS_ACCEPTANCE_PRODUCT_OUTCOME"
adaptive_activation:
  source_version: "2.6.3"
  installed_versions:
    - "2.6.3"
    - "2.6.3"
  parity_passed: true
approval_gates:
  spec: "required"
  contract: "required"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
  dod: "required"
role_signoffs:
  spec: ["ba"]
  contract: ["developer"]
  dor: ["ba","qc"]
  approach: ["developer"]
  task_plan: ["developer"]
  dod: ["qc"]
  business_acceptance: ["po"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "materialization-dedup-recovery.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Draft tasks with exact ownership and verification. No source-code task has started and no write grant has been issued.

## Step Contract

```yaml
step_goal: "Make the approved repair executable without reopening its design."
input_summary: ["Draft SRS", "s05 explicit_resume recommendation"]
output_summary: ["Ordered TDD tasks", "Owned paths", "Approval and verification handoff"]
done_when: ["Each task names paths, dependencies, acceptance coverage and a concrete verify method"]
owner: developer
```

## Main Artifact

```yaml
implementation_goal: "Implement the reviewed resume contract and preserve every existing approval boundary."
ba_lane:
  scope_guards: ["No live maintenance mutations", "No version/install/publish change", "No dedup scoring redesign"]
task_breakdown:
  - id: T1
    owner_role: developer
    name: "Reproduce admission recovery gaps"
    objective: "Capture READY continuation, reviewed near-match continuation and destructive default retry as failing regression cases."
    paths_in_scope: ["packages/workflow-bundle/test/materialize-work-item.test.js"]
    dependencies: []
    outputs_expected: ["Tests fail for absent resume behavior and overwrite protection, not fixture/setup errors"]
    review_checkpoint: "Spec compliance against AC-DR-01/02/07 before production changes"
    verification_hint: "Run node packages/workflow-bundle/test/materialize-work-item.test.js; record RED output in s07. Use only isolated temporary projects and test-owned signing keys."
  - id: T2
    owner_role: developer
    name: "Validate recovery authority and preserve metadata"
    objective: "Share exact signed-history verification and validate optional recovery metadata without changing signer behavior."
    paths_in_scope: ["packages/workflow-bundle/scripts/work-item-protocol-utils.js", "packages/workflow-bundle/scripts/work-item-protocol.js", "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js", "packages/workflow-bundle/test/work-item-protocol.test.js"]
    dependencies: [T1]
    outputs_expected: ["Invalid/mismatched history and metadata rejected", "Legacy reports unchanged", "Normal transitions preserve recovery identity"]
    review_checkpoint: "Spec compliance then targeted trust-boundary code review"
    verification_hint: "TDD tampered signature, wrong work item/collection/operation, unsigned clear, and normalizer round-trip tests; existing disposition and receipt tests remain green."
  - id: T3
    owner_role: developer
    name: "Resume with safe authoring and atomic report commit"
    objective: "Implement both eligible cases, guarded default refusal and retry/projection repair."
    paths_in_scope: ["packages/workflow-bundle/scripts/materialize-work-item.js", "packages/workflow-bundle/scripts/scaffold-workflow.js", "packages/workflow-bundle/test/materialize-work-item.test.js"]
    dependencies: [T2]
    outputs_expected: ["APPLIED/NOOP results", "No authored-note overwrite", "Pending approval and empty grants after recovery"]
    review_checkpoint: "Spec compliance then code-quality review before s08"
    verification_hint: "TDD missing notes, preserved notes, conflicting metadata, symlink escape, stale hash, lock contention, partial scaffold and failure before/after commit/projection; byte-compare all protected inputs."
  - id: T4
    owner_role: developer
    name: "Document the supported continuation"
    objective: "Explain prerequisites, precise command, retries and difference between materialization and approval."
    paths_in_scope: ["packages/workflow-bundle/README.md", "skills/orchestration/codex-workflow-chain/references/work-item-materialization.md", "skills/orchestration/codex-workflow-chain/references/work-item-materialization.vi.md", "skills/orchestration/codex-workflow-chain/references/work-item-protocol.md", "skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md"]
    dependencies: [T3]
    outputs_expected: ["English/Vietnamese references agree with tested behavior"]
    review_checkpoint: "Examples must not claim that resume grants implement or silently disposes blockers"
    verification_hint: "UTF-8 and pack audit; regenerate ignored runtime copies with the existing sync script."
  - id: T5
    owner_role: qc
    name: "Verify repair and hand off"
    objective: "Verify AC-DR-01..08 and record limitations before DoD/Business Acceptance."
    paths_in_scope: ["work-items/materialization-dedup-recovery"]
    dependencies: [T4]
    outputs_expected: ["s08 evidence matrix", "Human closeout decision", "Instructions for separately owned CR-008 maintenance"]
    review_checkpoint: "QC DoD and PO Business Acceptance; no cleanup or release inference"
    verification_hint: "Full unit suite, workflow validators and pack audit. Isolated acceptance smoke using a copy of the CR-008 proposal; do not sign or mutate live items."
dependencies_global: ["All authoring receipts and an exact ACTIVE write grant"]
risk_notes: ["Do not use production trusted keys in tests", "Do not run the new recovery path against live proposals before separate maintenance activation"]
verification_plan: ["Targeted RED/GREEN by task", "Full suite once after final implementation", "Preservation and encoding checks", "QC/PO terminal review"]
notes_for_implementation: "Stay in the dedicated worktree. If the proposed contract changes, return to the relevant gate before continuing."
```

## Verification Plan

After authoring approval, use `node packages/workflow-bundle/test/materialize-work-item.test.js` and `node packages/workflow-bundle/test/work-item-protocol.test.js` for focused cycles. Final verification uses `npm run validate:workflow:unit`, `npm run validate:workflow:pack-audit`, and `wfc validate|plan|exec|sdd|protocol` with the correct worktree roots. Record actual commands/results, not an assumed 45-file pass. Security verification covers forged/mismatched signatures, path escapes, state changes and zero-write refusal; disclose unavailable scanners. No deployment/build product exists beyond the bundle's normal runtime sync and tests.

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Every task has scope, dependencies and verify path", "TDD precedes each behavior change", "Single agent; no delegated ownership"]
blocking_items: ["Work-item and s04/s05/s06 gates unsealed"]
owner: developer
next_action: "Human review of the packet, explicit artifact finalization, then terminal signing."
```

## Brownfield Delivery Plan

```yaml
regression_checkpoints: ["Legacy/adaptive admission", "Signed disposition retry", "Approval/activate guards", "Normal protocol transitions"]
compatibility_checkpoints: ["No report history loss", "Existing authored notes unchanged", "Default overwrite becomes explicit refusal"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Retain source report backup for acceptance smoke", "No installed-package change in this item"]
```

## Human Approval Handoff

This packet is fully drafted for review, but **not yet eligible for sealing**: s04/s05/s06 are draft and their decision blocks still say pending. After explicit review of the SRS and OQ-DR-01..05, record only the approved decisions and finalize those host notes. Then the authorized human reviewers run the existing work-item/gate approve commands in their own terminal. `wfc gate approve` refuses unfinalized hosts, so do not treat the commands below as runnable now.

| Decision | Existing command after host finalization |
| --- | --- |
| Work-item approval | `wfc work-item approve --work-item materialization-dedup-recovery --reviewed-by maintainer` |
| BA Spec | `wfc gate approve --work-item materialization-dedup-recovery --gate spec --reviewed-by ba` |
| Developer Contract | `wfc gate approve --work-item materialization-dedup-recovery --gate contract --reviewed-by developer` |
| BA/QC DoR | `wfc gate approve --work-item materialization-dedup-recovery --gate dor --reviewed-by ba` |
| Developer Approach | `wfc gate approve --work-item materialization-dedup-recovery --gate approach --reviewed-by developer` |
| Developer Task Plan | `wfc gate approve --work-item materialization-dedup-recovery --gate task_plan --reviewed-by developer` |

BA and QC must both have explicitly reviewed DoR in the finalized host; the individual seal command names one authorized signer, BA. Do not pass repeated reviewer flags as a substitute for those reviews. Finalize all s04 decisions and reviewer metadata together before sealing Spec/Contract/DoR so later metadata edits do not invalidate earlier hashes.

Run from `.claude/worktrees/materialization-dedup-recovery`. Human signing authority is not inferred from `--reviewed-by`. No passphrase is requested in chat. Inspect each receipt's status/digest, then activate only with the exact union of paths listed in T1..T5 plus this item's SRS. Publication, installed global/harness writes, live CR-008 paths and the protected master audit register are excluded. The agent can perform activation and implementation after valid receipts exist.

## Traceability

```yaml
upstream: ["materialization-dedup-recovery.s04.acceptance-criteria.md", "materialization-dedup-recovery.s05.technical-approach.md"]
task_refs:
  - {task: T1, acceptance: [AC-DR-01, AC-DR-02, AC-DR-07]}
  - {task: T2, acceptance: [AC-DR-02, AC-DR-03, AC-DR-04]}
  - {task: T3, acceptance: [AC-DR-01, AC-DR-03, AC-DR-04, AC-DR-05, AC-DR-06]}
  - {task: T4, acceptance: [AC-DR-08]}
  - {task: T5, acceptance: [AC-DR-01, AC-DR-02, AC-DR-03, AC-DR-04, AC-DR-05, AC-DR-06, AC-DR-07, AC-DR-08]}
next_step: "s07 only after trusted receipts and ACTIVE scope grant"
```

## Handoff

First implementation task is T1. Current blocker is human authoring review/signing, not a materializer dead end for this repair item.
