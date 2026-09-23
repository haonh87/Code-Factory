---
artifact_id: "materialization-dedup-recovery.s07.implementation"
artifact_family: workflow-step
work_item_slug: "materialization-dedup-recovery"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: BUG
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "materialization-dedup-recovery.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Implementation complete and reviewed; technical verification recorded in s08. This is not a DoD verdict. The user approved the concrete authoring packet and signed the work-item receipt and five readiness receipts on 2026-09-22. All signatures and host digests were checked before activation at 02:00:56Z. No terminal approval is inferred.

## Main Artifact

```yaml
recommended_design: "Explicit persisted-proposal resume with signed admission checks, missing-only authoring and atomic report replacement"
implementation_mode: BUGFIX
tasks_completed: ["T1", "T2", "T3", "T4"]
bug_repro_evidence:
  - "T1: READY and signed needs_review resume fail because --request is required; ordinary reruns overwrite both PROPOSED and READY reports. Four intended failures."
  - "T2: normalizer drops recovery identity and accepts six malformed metadata cases. Seven intended failures."
hypothesis_log:
  - {assumption: "Materializer has no continuation path and admits overwrite of unapproved reports", status: CONFIRMED, evidence: "T1 regression cases"}
  - {assumption: "Recovery identity needs an explicit normalizer field", status: CONFIRMED, evidence: "T2 RED/GREEN"}
debug_experiments:
  - {goal: "Prove recovery failure independently of live state", action: "Temporary projects with test-owned signed dispositions", result: "Expected T1 failures; no production trust root used"}
tdd_evidence:
  - {behavior: "Resume and default overwrite refusal", failing_test: "/private/tmp/cf-dedup-t1-red.log", passing_test: "/private/tmp/cf-dedup-t3-first.log"}
  - {behavior: "Recovery metadata validation and preservation", failing_test: "/private/tmp/cf-dedup-t2-red.log", passing_test: "/private/tmp/cf-dedup-t2-green.log"}
safe_refactor_notes: ["Moved the existing disposition retry verifier unchanged into trusted approval utilities; signer and receipt formats unchanged"]
code_changes: ["Shared disposition verifier", "Validated recovery metadata", "Resume dispatch, eligibility and atomic report update", "Missing-only authoring preflight"]
doc_changes: ["Bundle README and EN/VI materialization/protocol references"]
config_changes: []
review_checkpoints: ["T1 spec compliance: intended failures match AC-DR-01/02/07", "T2 trust checks preserved; targeted review continues with negative fixtures"]
outputs_actual: ["Basic legacy/adaptive resume and existing protocol tests pass"]
known_limitations: ["No live CR-008 mutation or installed-package change; DoD and Business Acceptance remain pending"]
follow_up_items: ["Keep live CR-008 maintenance and audit reconciliation under their own owners"]
notes_for_testing: "Run targeted edge cases before the final unit suite and pack audit. No live resume, release, install or cleanup."
```

## Delivery Rule Evidence

```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/materialize-work-item.test.js — T1 four RED cases, then GREEN; retry signature/result checks and malformed adaptive preflight also RED then GREEN"
  - "packages/workflow-bundle/test/work-item-protocol.test.js — recovery metadata seven RED assertions, then GREEN"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/materialization-dedup-recovery"
worktree_reason: "Full profile, multisession public CLI and signed-admission boundary"
review_status: COMPLETED
review_refs:
  - "Implementation Notes: spec compliance, then targeted code-quality review"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Retain dedicated branch pending s08 DoD and Business Acceptance; no merge or cleanup yet"
verify_path:
  - "s08 AC-DR-01..08 evidence matrix, full 45-file suite, CLI smoke and validators"
```

TDD ran before production changes. All fixtures use isolated temporary project and approval roots. The existing production keypair was used only by the human Terminal signing interaction; the agent verifies public signatures.

Workspace is `.claude/worktrees/materialization-dedup-recovery`, branch `fix/materialization-dedup-recovery`. Worktree isolation is REQUIRED for this full-profile, multisession contract repair. The ACTIVE grant lists only T1–T5 files plus the work-item directory and SRS. Execution is single-agent; delegation is not used. Frozen SRS/s04/s05/s06 bytes remain unchanged after signing. Review order is spec compliance, then targeted code quality, before s08.

An execution-context mistake after a new user message briefly placed the two verifier-extraction edits in the root checkout. Their exact diff was checked, moved to this repair worktree, and only those two root files were restored to their known original bytes. Root tracked diff is empty again; no user file was reverted. Subsequent tool calls pin the full worktree path explicitly.

## Implementation Notes

Spec compliance review (first): AC-DR-01..08 map to tests and docs; first materialization and retry remain unapproved with empty grants; original candidate/raw history are retained; signed intent mirrors, producer ownership, snapshot hash, report lock and path checks are explicit. No change to crypto format or live maintenance scope. Verdict PASS for implementation scope.

Targeted code-quality review (second): reused the existing report lock, atomic writer, snapshot comparison, scaffold templates, validators and signature verifier. Recovery is isolated from new-request analysis and does not execute stored shell strings. Review found retry-signature/state revalidation and malformed adaptive input writing notes before rejection; both were reproduced with negative tests and fixed. Note ownership/gate conflicts, concurrent report edits, symlink escape, partial authoring and committed projection retry are covered. Verdict PASS; absent ESLint/Semgrep and lack of performance benchmark are disclosed in s08, not represented as completed scans.

Full verification: `npm run validate:workflow:unit` passed all 45 test files on Node 22.23.2; its pre-step synchronized ignored runtime files. `npm run validate:workflow:pack-audit` passed. Public CLI APPLIED/NOOP smoke passed, and an isolated copy of the real CR-008 proposal reached MATERIALIZED using only test-owned disposition signatures. No source report or production trust root was changed by that smoke.

## Traceability

```yaml
upstream: ["materialization-dedup-recovery.s06.task-breakdown.md"]
next_step: "s08 technical evidence and human closeout review"
```
