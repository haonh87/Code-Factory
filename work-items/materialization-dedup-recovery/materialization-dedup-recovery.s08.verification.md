---
artifact_id: "materialization-dedup-recovery.s08.verification"
artifact_family: workflow-step
work_item_slug: "materialization-dedup-recovery"
step_id: "s08"
step_slug: "verification"
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "materialization-dedup-recovery.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Technical verification PASS for AC-DR-01..08. Scan coverage is PARTIAL because ESLint and Semgrep are unavailable; syntax checks, targeted review and deterministic security-negative tests are complete. Human DoD and Business Acceptance are pending. This work item is not DONE and the installed 2.6.3 runtime is unchanged.

## Step Contract

```yaml
step_goal: "Verify the approved proposal-recovery contract and prepare an explicit human closeout decision"
input_summary: ["Approved SRS and s04-s06", "Reviewed T1-T4 implementation", "ACTIVE bounded grant"]
output_summary: ["Acceptance coverage and actual verification evidence", "Disclosed scan limits", "Human closeout packet"]
done_when: ["All acceptance criteria have evidence", "Human DoD and Business Acceptance receipts are valid"]
owner: qc
```

## Main Artifact

```yaml
verification_target: "Materialization recovery CLI, protocol metadata, signed admission and missing-only authoring"
risk_ranked_test_matrix:
  - {risk: "Unsigned or tampered admission accepted", severity: HIGH, required_evidence: ["Signed-history negative matrix", "Activation still denied"]}
  - {risk: "Existing report/note overwritten or concurrent edit lost", severity: HIGH, required_evidence: ["Byte snapshots", "Ownership/path checks", "Lock and atomic race tests"]}
  - {risk: "Recovery retry duplicates lifecycle or loses provenance", severity: HIGH, required_evidence: ["APPLIED/NOOP CLI test", "Failure injection and metadata round trip"]}
test_strategy:
  unit_test: {required: true, rationale: "Eligibility, shape, signature mirrors, metadata and regression"}
  integration_test: {required: true, rationale: "Real temporary filesystem, crypto signatures, report locks and atomic replacement"}
  database_test: {required: false, rationale: "No database boundary"}
  feature_test: {required: true, rationale: "Public wfc CLI and isolated real-proposal copy"}
negative_cases: ["Missing/forged/tampered disposition", "Wrong identity/mirror fields", "Unsigned clear and unresolved state", "Unsupported lifecycle/split/change/grant", "Stale source hash or UUID conflict", "Request/profile override", "Malformed adaptive metadata", "Note ownership/gate mismatch", "Symlink", "Report lock and concurrent edit"]
regression_targets: ["Fresh legacy/adaptive materialization", "Light and full notes", "Disposition retry", "Approval and activation guards", "Protocol normalization", "Existing 45-file suite"]
manual_exploration:
  flows_checked: ["Copy of cr008-legacy-blocker-disposition, test-only signed decisions, explicit recovery", "EN/VI command and failure contract review"]
  issues_found: ["None remaining in acceptance scope"]
criteria_results:
  - {criterion: AC-DR-01, result: PASS, evidence: "READY resume, partial owned drafts, full and Light profiles"}
  - {criterion: AC-DR-02, result: PASS, evidence: "Three signed concerns, exact history/candidate preservation and copied CR-008 smoke"}
  - {criterion: AC-DR-03, result: PASS, evidence: "Refusal matrix compares complete temporary project and trust-root content"}
  - {criterion: AC-DR-04, result: PASS, evidence: "PENDING_REVIEW, empty grants, applicable actions; activate denied"}
  - {criterion: AC-DR-05, result: PASS, evidence: "Same UUID/source hash NOOP, signature/state recheck and conflicting/later-state refusal"}
  - {criterion: AC-DR-06, result: PASS, evidence: "Partial scaffold, pre-rename failure, committed projection retry, note ownership, symlink and race checks"}
  - {criterion: AC-DR-07, result: PASS, evidence: "Default overwrite refusal and 45-file full regression suite"}
  - {criterion: AC-DR-08, result: PASS, evidence: "EN/VI references, runtime sync, pack audit, applicable validators, UTF-8"}
test_evidence:
  unit_test: ["/private/tmp/cf-dedup-full-unit.log — 45 test files PASS, Node 22.23.2"]
  integration_test: ["materialize-work-item.test.js", "work-item-protocol.test.js"]
  database_test: []
  feature_test: ["testResumeCliAndLegacyFullNotes", "/private/tmp/cf-dedup-cr008-smoke-IqIp4A/result.log"]
commands_run:
  - "PATH=<Node22>/bin:$PATH npm run validate:workflow:unit"
  - "PATH=<Node22>/bin:$PATH npm run validate:workflow:pack-audit"
  - "node --check for all seven changed JavaScript files"
  - "wfc validate|plan|exec --workflow-root work-items/materialization-dedup-recovery"
  - "wfc protocol --workflow-root work-items: 19 managed reports PASS, 21 legacy skips retained"
  - "wfc sdd --workflow-root work-items/materialization-dedup-recovery: 0 applicable notes (sdd_mode=none); not SRS validation evidence"
  - "Strict UTF-8, git diff --check, scope and preservation hashes"
skipped_checks: ["ESLint and Semgrep not installed/configured; no dependency added", "No typecheck/build application, database, deployment or hosted release in scope"]
release_blockers: []
status: PASS
gaps: ["Human DoD and Business Acceptance not yet sealed"]
residual_risks: ["Static security scanner unavailable; security assessment combines signature/path negative tests and targeted source review", "Older protocol writers may drop materialization_recovery; documented compatibility limit", "No performance benchmark; synchronous traversal is confined to the selected work-item tree"]
recommendation: "Review the concrete packet and approve DoD/Business Acceptance if the documented verification limits are acceptable"
notes_for_review: "No live CR-008 resume/disposition, global update, release, merge or worktree cleanup is part of this repair"
```

## Spec Coverage

```yaml
status: PASS
coverage:
  - {id: AC-DR-01, status: PASS, evidence: "READY and existing draft recovery tests"}
  - {id: AC-DR-02, status: PASS, evidence: "Signed near-match and copied real-proposal smoke"}
  - {id: AC-DR-03, status: PASS, evidence: "Zero-write refusal matrix"}
  - {id: AC-DR-04, status: PASS, evidence: "Pending approval, no grants, activation rejection"}
  - {id: AC-DR-05, status: PASS, evidence: "Idempotent public CLI and conflicting retry cases"}
  - {id: AC-DR-06, status: PASS, evidence: "Filesystem ownership, atomic failure and concurrent edit fixtures"}
  - {id: AC-DR-07, status: PASS, evidence: "Full 45-file unit suite and overwrite guards"}
  - {id: AC-DR-08, status: PASS, evidence: "EN/VI, runtime parity, validators and UTF-8"}
summary: {total: 8, pass: 8, fail: 0, partial: 0}
```

## Scan Summary

```yaml
scan_target: "Changed JavaScript and workflow references"
scan_scope: {mode: DIFF_ONLY, changed_files: ["five production scripts", "two test files"], affected_modules: ["materializer", "scaffolder", "protocol/trusted utilities"]}
language_stack: ["JavaScript/CommonJS", "Markdown/YAML"]
available_scan_tools: ["Node 22 parser", "Repository unit suite and pack audit"]
false_positive_policy: "Diff-aware; retain limitations and classify expected test-only crypto failures explicitly"
scan_plan: {syntax: ["node --check"], static_analysis: ["Check configured tools; targeted source review"], security: ["Deterministic signature/path/refusal fixtures and targeted source review"], performance_heuristic: ["Bounded synchronous CLI traversal"]}
syntax_scan_results:
  - {command: "node --check", scope: ["seven changed JS files"], status: PASS, evidence: "All parse", blocker_files: []}
static_analysis_results:
  - {command: "command -v eslint; repository config discovery", config_used: "none", scope: ["changed JS"], status: SKIP, findings: [], new_blockers: []}
security_scan_results:
  - {command_or_check: "Semgrep availability", scope: ["changed JS"], status: SKIP, findings: []}
  - {command_or_check: "Signed intent/mirror, path escape, admission and retry negative tests", scope: ["recovery trust boundary"], status: PASS, findings: []}
performance_heuristic_results:
  - {check: "Review synchronous traversal and hashing", scope: ["selected work-item tree and report"], status: PASS, expected_impact: LOW, confidence: MEDIUM, trigger_condition: "Operator invokes recovery; unusually large work-item attachments increase preflight I/O", evidence: "No network or request hot path; no runtime benchmark claimed"}
skipped_scans: ["ESLint/Semgrep unavailable; syntax, deterministic security checks and targeted code review do not masquerade as those scanners"]
overall_status: PARTIAL
remediation_actions: []
notes_for_verify: "Disclosed tooling limit for human closeout review; no unhandled finding in the implemented contract"
```

## Workflow Pack Audit

```yaml
audit_scope: "Materialization/protocol EN/VI references and bundle README"
checks:
  - {id: mechanical, status: PASS, evidence: "/private/tmp/cf-dedup-pack-audit.log"}
  - {id: semantic, status: PASS, evidence: "Commands match CLI; materialization remains separate from approval; compatibility/retry/support boundaries agree in EN/VI"}
  - {id: runtime, status: PASS, evidence: "Unit pre-step synchronized ignored runtime; runtime tests passed"}
findings: []
overall_status: PASS
follow_up_actions: []
notes: "No new skill, gate, authority rule, template schema or installed bundle change"
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Valid authoring receipts retained", "Only ACTIVE granted paths changed", "TDD and spec-first review recorded", "33 protected paths and four sealed authoring hosts unchanged"]
blocking_items: ["Human DoD and Business Acceptance pending"]
owner: qc
next_action: "Human closeout review and trusted receipts"
```

## Regression & Compatibility Summary

```yaml
regression_status: PASS
compatibility_status: PASS
regression_evidence: ["45-file suite", "Legacy/adaptive full/Light fixtures", "Public CLI and real-proposal copy"]
compatibility_notes: ["Intentional default-overwrite refusal", "Optional recovery field preserved by current writers; older writers unsupported on recovered reports", "Installed/global 2.6.3 unchanged"]
```

## Definition of Done

```yaml
work_item_slug: materialization-dedup-recovery
status: PARTIAL
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: ["Await explicit QC DoD and PO Business Acceptance decision and trusted receipts"]
residual_risks: ["Static scanner availability and older-writer compatibility disclosed above"]
follow_up_items: ["Separately owned CR-008 maintenance after repair integration", "Master audit M2-M4 remain open"]
next_action: "Human review; no self-declared DONE or cleanup"
```

## Handoff

Spec/Contract/DoR/Approach/Task Plan and the work-item approval are already signed; do not ask for those again. This packet requests only QC DoD and PO Business Acceptance for the bounded repair. The same human can review in the applicable roles; no independent reviewer is invented. After explicit approval, finalize this s08 host and seal its two terminal receipts in a human-controlled terminal. Keep the branch/worktree until terminal evidence is valid. No release, install, live CR-008 mutation or audit-master completion is implied.
