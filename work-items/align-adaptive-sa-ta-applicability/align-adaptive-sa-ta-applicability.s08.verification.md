---
artifact_id: "align-adaptive-sa-ta-applicability.s08.verification"
artifact_family: workflow-step
work_item_slug: "align-adaptive-sa-ta-applicability"
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
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "qc"
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
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
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-09-08T06:08:19Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-09-08T06:08:19Z"
  dor_reviewed_by:
    - "ba"
    - "qc"
  dor_reviewed_at: "2026-09-08T06:08:19Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-09-08T06:41:51Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-09-08T07:26:34Z"
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "align-adaptive-sa-ta-applicability.s07.implementation.md"
linked_artifacts:
  - "align-adaptive-sa-ta-applicability.s07.implementation.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "../../policies/codex/AGENTS.global.md"
  - "../../.github/workflows/workflow-guardrails.yml"
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> QC opened s08 at `2026-09-08T10:28:40Z` for exact behavior source commit
> `a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff` and local pre-host artifact SHA-256
> `ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47`. All local
> semantic, full-regression, governance, package, diff, and encoding checks pass. Hosted run
> `34216520563` for source `96212a30a1a341d90f96b85709f9834e8bfaaef8` failed in Workflow
> Execution because s01-s07 use invalid frontmatter value `review_mode: targeted`; four upstream jobs
> passed, then four downstream jobs including candidate build and Node matrix were skipped. Finding
> `F-AR08-001` therefore returns the work item to s07 pending a human-approved metadata/receipt
> amendment. Technical Verification and DoD remain blocked and are not inferred.

## Step Contract
```yaml
step: "s08 Verify + DoD"
goal: "Establish candidate-bound technical, governance, regression, and compatibility evidence for CF-019 before QC decides Technical Verification and DoD."
value: "Prevent locally green policy wording or copy parity from hiding semantic drift, hosted-runtime failure, or stale parent evidence."
scope_in:
  - "AC-AR-01..10 and EDGE-AR-01..07"
  - "Exact behavior source a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff"
  - "Local pre-host workflow-bundle-2.6.2.tgz SHA-256 ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47"
  - "Local full verification, diff-aware scan, hosted Node 18/22 Guardrails, and parent handoff controls"
scope_out:
  - "Release, Business Acceptance, merge, tag, publish, persistent install, or worktree cleanup"
  - "Changing router behavior, reason vocabulary, schema, or SA/TA skill contracts"
inputs_required:
  - "Approved s07 with AR-B1/AR-B2 review evidence and no open implementation finding"
  - "Explicit QC authorization to open s08 at 2026-09-08T10:28:40Z"
  - "Exact source and local artifact binding from s07 T6"
outputs_required:
  - "Acceptance-mapped testing evidence and a four-lane scan summary"
  - "Brownfield Regression & Compatibility Summary"
  - "Hosted source/run/artifact binding for Node 18 and Node 22"
  - "QC-reviewable Technical Verification and DoD recommendations"
done_when:
  - "AC-AR-01..09 have passing semantic, parity, regression, package, and hosted evidence"
  - "AC-AR-10 preserves exact child-to-parent binding and blocks parent release until re-verification"
  - "All required checks pass or have an explicit justified disposition"
  - "QC explicitly approves Technical Verification first and DoD afterward"
constraints:
  hard_constraints:
    - "Do not infer Technical Verification or DoD from opening approval or green automation."
    - "Do not mutate production behavior while verifying; any fix returns to s07 and creates a new candidate."
    - "Do not merge, tag, publish, release, close, or clean the shared branch/worktree."
  soft_constraints:
    - "Reuse the existing build-once GitHub Guardrails workflow without pipeline changes."
  prohibited_actions:
    - "Substituting a mutable branch or abbreviated digest for an exact candidate identity"
    - "Treating local Node 26 evidence as hosted Node 18/22 evidence"
risks:
  - id: "R-S08-AR-001"
    description: "Hosted Node 18/22 behavior differs from local Node 26."
    severity: HIGH
    mitigation: "Require the unchanged build-once hosted matrix and zero failed or skipped required jobs."
    owner: "qc"
    status: BLOCKED_BY_F_AR08_001
  - id: "R-S08-AR-002"
    description: "Copy parity is exact while all policy copies express the same wrong semantics."
    severity: HIGH
    mitigation: "Keep the bounded canonical semantic assertion primary; use recursive parity only as supporting evidence."
    owner: "qc"
    status: CLOSED
  - id: "R-S08-AR-003"
    description: "Parent CR-008 resumes with stale pre-child evidence."
    severity: HIGH
    mitigation: "Keep parent release blocked until a candidate containing the exact child result is re-verified after child DoD."
    owner: "qc"
    status: MONITORING
timebox:
  target_duration: "One local full matrix plus one hosted Guardrails run"
  deadline: ""
  escalation_rule: "Any failed/skipped required hosted job, candidate mismatch, or new blocker returns the work item to s07."
```

## Main Artifact
```yaml
verification_target: "CF-019 router-precedence policy correction and exact workflow-bundle v2.6.2 candidate"
risk_ranked_test_matrix:
  - risk: "Generic skill guidance re-adds SA or TA after the router omits the role."
    severity: HIGH
    required_evidence:
      - "Bounded canonical Skill Requirement semantic assertion"
      - "Intentional RED evidence followed by GREEN on the same fixture"
  - risk: "One hard trigger loses its exact role, gate, or stable reason behavior."
    severity: HIGH
    required_evidence:
      - "Exact six-trigger positive and negative role/reason/gate matrix"
      - "20x deterministic baseline"
  - risk: "Generated Codex and Claude policies drift from canonical or package content."
    severity: HIGH
    required_evidence:
      - "Runtime recursive parity"
      - "Canonical and packaged policy SHA-256 equality"
  - risk: "Adjacent scaffold, approval, protocol, or SA/TA contracts regress."
    severity: HIGH
    required_evidence:
      - "Full 44-file workflow-bundle unit suite"
      - "Workflow fixtures, validators, authoring smoke, bundle smoke, and pack audit"
  - risk: "Local evidence does not represent supported hosted Node runtimes."
    severity: HIGH
    required_evidence:
      - "Build-once hosted Guardrails with Node 18 and Node 22"
test_strategy:
  unit_test:
    required: true
    rationale: "Adaptive policy/routing semantics, determinism, and stable reason contracts are pure Node.js logic with direct fixtures."
  integration_test:
    required: true
    rationale: "Scaffolding, workflow protocol, generated runtime parity, and installed-artifact behavior cross module and filesystem boundaries."
  database_test:
    required: false
    rationale: "No database, schema, migration, query, or persistence engine is in scope."
  feature_test:
    required: true
    rationale: "The exact tarball must install and update correctly in Codex/Claude global/project flows."
negative_cases:
  - "Non-delivery with no explicit materialization produces no workflow obligations."
  - "No-trigger maintenance excludes PO, BA, SA, TA, and DevOps."
  - "Release-only adds DevOps and Release but not SA or TA."
  - "Invalid trigger values fail closed instead of downgrading risk."
  - "Mixed non-delivery and delivery intent escalates safely."
  - "Readable prose without a stable reason code fails contract validation."
  - "All policy copies containing identical wrong wording still fail the semantic assertion."
regression_targets:
  - "Adaptive lane/trigger/role/gate derivation and 20x determinism"
  - "SA/TA skill output contracts and design-readiness references"
  - "Scaffold integration, trusted approvals, work-item protocol, and SDD/CR validation"
  - "Codex/Claude runtime generation and package install/update"
manual_exploration:
  flows_checked:
    - "Reviewed the exact c0fc0e6 implementation diff and confirmed the only executable addition is a bounded test fixture reading a repository-owned policy file."
    - "Confirmed the policy delta is one precedence paragraph and does not alter the executable router, reason values, schemas, or SA/TA contracts."
    - "Confirmed commits after a97e0ee and before hosted verification change workflow evidence only, not package payload sources."
  issues_found: []
criteria_results:
  - criterion: "AC-AR-01"
    result: PASS
    evidence: "The bounded policy assertion and exact wording require router applicability to be authoritative and prohibit generic re-addition."
  - criterion: "AC-AR-02..06 and EDGE-AR-01..05,07"
    result: PASS
    evidence: "The adaptive-governance fixture passes lane defaults, exact six-trigger role/reason/gate behavior, negative-role assertions, fail-closed cases, and 20x deterministic output."
  - criterion: "AC-AR-07"
    result: PASS
    evidence: "Semantic ownership stays in workflow-adaptive-governance.test.js; scaffold and architecture-role suites remain supporting contracts."
  - criterion: "AC-AR-08 and EDGE-AR-06"
    result: PASS
    evidence: "Canonical/runtime/package policy bytes equal SHA-256 4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9 while semantic expectations pass independently."
  - criterion: "AC-AR-09"
    result: PARTIAL
    evidence: "All local adjacent and full regressions pass; hosted run 34216520563 failed before candidate build because s01-s07 carry invalid review_mode=targeted frontmatter."
  - criterion: "AC-AR-10"
    result: PARTIAL
    evidence: "Exact child source/artifact handoff and parent HOLD control are recorded; actual parent candidate re-verification correctly follows child DoD."
test_evidence:
  unit_test:
    - "npm run validate:workflow:unit -> PASS, 44 workflow-bundle test files"
    - "workflow-adaptive-governance.test.js -> PASS, including bounded precedence and exact six-trigger matrix"
  integration_test:
    - "workflow governance fixtures -> PASS, 10/10 expected outcomes"
    - "workflow naming/governance, SDD, CR, protocol, planning, authoring-smoke, runtime-parity, scaffold, and architecture-role contracts -> PASS"
  database_test: []
  feature_test:
    - "workflow bundle smoke -> PASS"
    - "exact local artifact smoke -> PASS, Codex/Claude x global/project 4/4"
commands_run:
  - "node --check packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "npm run validate:workflow:fixtures"
  - "npm run validate:workflow -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:sdd -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:change -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:protocol -- --workflow-root work-items"
  - "npm run validate:workflow:planning -- --workflow-root work-items"
  - "npm run validate:workflow:authoring-smoke"
  - "npm run validate:workflow:unit"
  - "npm run validate:workflow:pack-audit"
  - "npm run validate:workflow:bundle-smoke"
  - "release-candidate-artifact-smoke.test.js in exact-artifact mode"
  - "gh run view 34216520563 --job 102029613415 --log-failed"
skipped_checks:
  - "Hosted candidate build and Node 18/22 matrix: skipped by GitHub after Workflow Execution failed."
  - "ESLint: no repository wrapper, dependency, or configuration exists."
  - "Semgrep: executable is unavailable and no tool installation is authorized."
release_blockers:
  - "F-AR08-001: invalid review_mode=targeted in s01-s07 fails Workflow Execution and prevents hosted candidate build/Node verification."
status: PARTIAL
gaps:
  - "Valid execution metadata with refreshed trusted receipts where receipt-bound notes change"
  - "Passing hosted run, exact hosted artifact SHA-256, and Node 18/22 required-job results"
residual_risks:
  - "A supported hosted Node runtime may differ from local Node 26 despite complete local evidence."
recommendation: "QC approves reopening s07 and records F-AR08-001; Developer approves a metadata-only Task Plan amendment that normalizes s01-s07 review_mode to the supported enum and refreshes affected trusted receipts before creating a new candidate."
notes_for_review: "Local product evidence remains green, but the hosted governance failure is blocking and must not be waived or hidden."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - item: "Explicit QC authority opened s08 for the exact source and local digest"
    result: PASS
    evidence: "User explicitly approved opening s08 at 2026-09-08T10:28:40Z."
  - item: "Specification and implementation traceability"
    result: PASS
    evidence: "AC-AR-01..10 trace through approved s05 Option A, s06 T1..T6, s07 outputs, and this verification matrix."
  - item: "No specification or governance drift"
    result: PASS
    evidence: "The executable router, reason vocabulary, schema, SA/TA contracts, and parent release authority remain unchanged."
  - item: "Hosted evidence boundary"
    result: FAIL
    evidence: "Run 34216520563 failed Workflow Execution at job 102029613415; candidate build and Node matrix were skipped."
  - item: "Human-controlled terminal decisions"
    result: PASS
    evidence: "Technical Verification and DoD remain pending QC; Release and Business Acceptance are not applicable to this child."
blocking_items:
  - "F-AR08-001 execution-metadata normalization and affected trusted-receipt refresh"
  - "Rerun hosted Guardrails through exact candidate build and Node 18/22"
owner: "qc"
next_action: "Approve returning to s07 for the proposed metadata-only amendment; do not edit receipt-bound notes before the required human approvals."
```

## Regression & Compatibility Summary
```yaml
regression_status: PARTIAL
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
evidence:
  - "All 44 workflow-bundle unit files and every targeted semantic/parity/scaffold/SA-TA contract suite pass locally."
  - "Workflow validators, 13-case authoring smoke, package smoke, and pack audit pass."
  - "Canonical, generated, and packaged policy SHA-256 values are identical."
  - "No router, stable reason, schema, public action, SA/TA contract, or dependency changed."
pending:
  - "Resolve F-AR08-001 and rerun hosted Node 18/22 regression matrix"
rollback_plan:
  - "If hosted or QC verification fails, return to s07 and revert the focused CF-019 implementation candidate; do not advance parent CR-008."
```

## Scan Summary
```yaml
scan_target: "Diff-only formal scan of the CF-019 canonical policy and semantic fixture"
scan_scope:
  mode: DIFF_ONLY
  changed_files:
    - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
    - "policies/codex/AGENTS.global.md"
  affected_modules:
    - "Adaptive-governance semantic fixture"
    - "Canonical Codex workflow policy"
language_stack:
  - "JavaScript"
  - "Node.js CommonJS"
  - "Markdown policy"
available_scan_tools:
  - "Node parser v26.5.0"
  - "Repository full regression wrappers"
  - "git diff --check"
  - "ripgrep"
false_positive_policy: "Diff-aware, evidence-based, dismiss only with a recorded reason."
scan_plan:
  syntax:
    - "Parse the changed JavaScript fixture."
  static_analysis:
    - "Use full repository tests and exact diff review; record missing ESLint."
  security:
    - "Inspect new filesystem access, input sources, command execution, secrets, writes, and path authority."
  performance_heuristic:
    - "Review policy-file I/O and the fixed six-trigger loop for unbounded or hot-path work."
syntax_scan_results:
  - command: "node --check packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
    scope:
      - "Changed JavaScript fixture"
    status: PASS
    evidence: "Node parser exited 0."
    blocker_files: []
static_analysis_results:
  - command: "npm run validate:workflow:unit plus exact diff review"
    config_used: "Repository harness; ESLint unavailable"
    scope:
      - "Workflow bundle and exact changed surfaces"
    status: PASS
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: "Ripgrep-assisted and manual diff-aware security review"
    scope:
      - "New test-only fs.readFileSync and canonical policy wording"
    status: PASS
    findings: []
    evidence: "The only new I/O is one read-only access to a repository-owned constant path in a test process; no external input, command execution, network, secret, write, deserialization, auth, or permission surface is introduced."
performance_heuristic_results:
  - check: "File I/O, loop bound, allocation, serialization, and hot-path review"
    scope:
      - "Changed test fixture and policy"
    status: PASS
    expected_impact: LOW
    confidence: HIGH
    trigger_condition: "One policy file is read once per test process and exactly six constant trigger fixtures are evaluated."
    evidence: "No production path, query, network call, unbounded loop, large clone, or repeated hot-path I/O changed."
skipped_scans:
  - "ESLint: no wrapper, dependency, or config exists."
  - "Semgrep: executable unavailable; no installation was authorized."
overall_status: PARTIAL
remediation_actions: []
notes_for_verify: "Tool gaps are explicit and proportionate to a test-plus-policy-only delta; hosted runtime evidence remains the only blocking verification gap."
```

## Candidate Binding Review
```yaml
status: OPENED
opened_by: "qc"
opened_at: "2026-09-08T10:28:40Z"
behavior_source_commit: "a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff"
s07_handoff_commit: "7236e06643931d6ae34aa4d5f95b4e95b05dfbbc"
opened_local_candidate_sha256: "ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47"
local_candidate_version: "2.6.2"
local_candidate_size_bytes: 954956
runtime_policy_sha256: "4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9"
hosted_source_sha: "96212a30a1a341d90f96b85709f9834e8bfaaef8"
hosted_run_id: "34216520563"
hosted_candidate_sha256: ""
binding_verdict: BLOCKED_BEFORE_ARTIFACT_BUILD
notes:
  - "The opened local artifact passes exact install/update smoke 4/4."
  - "Hosted Workflow Tooling, Artifacts, SDD, and Changes passed."
  - "Hosted Workflow Execution failed on invalid review_mode=targeted in all seven CF-019 s01-s07 notes."
  - "Workflow Authoring Smoke, Planning, Build Exact Release Candidate, and Release Candidate matrix were skipped; no hosted artifact exists to bind."
```

## Verification Finding F-AR08-001
```yaml
finding_id: "F-AR08-001"
status: OPEN
severity: HIGH
category: "WORKFLOW_EXECUTION_METADATA"
detected_at: "2026-09-08T10:39:13Z"
detected_by: "GitHub Workflow Guardrails run 34216520563"
source_sha: "96212a30a1a341d90f96b85709f9834e8bfaaef8"
failed_job:
  name: "Workflow Execution"
  job_id: "102029613415"
  command: "npm run validate:workflow:execution -- --workflow-root work-items"
root_cause: "CF-019 s01-s07 frontmatter uses review_mode=targeted, while the canonical execution enum accepts only self, independent, or auto_fix_loop. TARGETED belongs to the review-discipline artifact schema, not workflow-note frontmatter."
affected_paths:
  - "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s01.restate.md"
  - "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s02.business-goal.md"
  - "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s03.open-questions.md"
  - "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s04.acceptance-criteria.md"
  - "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s05.technical-approach.md"
  - "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s06.task-breakdown.md"
  - "work-items/align-adaptive-sa-ta-applicability/align-adaptive-sa-ta-applicability.s07.implementation.md"
receipt_impact:
  status: REQUIRES_HUMAN_REVIEW
  reason: "s04, s05, and s06 are receipt-bound; changing their frontmatter invalidates current artifact digests and requires affected gate receipts to be refreshed with the existing authorities."
product_behavior_impact: NONE
hosted_impact:
  passed_jobs: 4
  failed_jobs: 1
  skipped_jobs: 4
  artifact_built: false
recommended_resolution:
  - "QC explicitly approves reopening s07 and records this finding."
  - "Developer approves a metadata-only Task Plan amendment for review_mode normalization."
  - "BA/Developer/QC re-confirm and refresh receipt-bound s04 gates; Developer re-confirms and refreshes s05 Approach and s06 Task Plan after the metadata edit."
  - "Use supported review_mode=independent consistently because human QC is separate from the implementation owner."
  - "Run execution/protocol/planning validators, create a new exact candidate, and rerun hosted Guardrails."
prohibited_shortcuts:
  - "Do not expand the validator enum to accept targeted without a separate approved contract change."
  - "Do not silently edit receipt-bound artifacts or reuse stale receipts."
  - "Do not approve Technical Verification or DoD for run 34216520563."
next_human_action: "Approve the recommended s07 metadata/receipt amendment with the named roles."
```

## Technical Verification
```yaml
status: BLOCKED
verdict: FAIL
candidate_sha256: "ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47"
source_sha: "a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff"
reviewed_by: []
reviewed_at: ""
blocking_items:
  - "F-AR08-001 is open and hosted run 34216520563 failed before artifact build."
recommendation: "Do not approve Technical Verification; return to s07 only after explicit amendment approval."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "This internal policy and workflow-bundle bug does not require a separate business UAT gate."
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "This linked child owns no release action; parent CR-008 retains release authority after child DoD and parent re-verification."
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "Business Acceptance is not applicable to this child and remains a parent CR-008 responsibility."
```

## Audit
```yaml
step: "s08 Verify + DoD"
status: PARTIAL
checks:
  - criterion: "AC-AR-01..09 have complete local semantic, parity, regression, and package evidence"
    result: PASS
    evidence: "Targeted and full local matrices pass with exact source/artifact identities."
  - criterion: "Hosted Node 18/22 candidate evidence is bound"
    result: FAIL
    evidence: "Run 34216520563 failed Workflow Execution and produced no hosted candidate."
  - criterion: "AC-AR-10 preserves exact parent handoff control"
    result: PASS
    evidence: "The exact child source/artifact is recorded and parent release stays blocked until post-child re-verification."
  - criterion: "QC explicitly approves Technical Verification and DoD"
    result: FAIL
    evidence: "QC approved opening only; terminal review decisions remain pending."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "The local matrix completed in one verification session; hosted time is pending."
gaps:
  - "F-AR08-001 correction with refreshed receipt-bound gates"
  - "Passing hosted source/run/artifact binding"
  - "QC Technical Verification followed by QC DoD"
risk_level: MEDIUM
next_action: "Obtain human approval for the proposed s07 amendment before changing s01-s07 metadata."
```

## Definition of Done
```yaml
work_item_slug: "align-adaptive-sa-ta-applicability"
status: BLOCKED
checks:
  acceptance_criteria_evidenced: FAIL
  implementation_recorded: PASS
  required_verification_completed: FAIL
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps:
  - "F-AR08-001 correction and affected trusted-receipt refresh"
  - "Hosted Node 18/22 evidence and candidate binding"
  - "Explicit QC Technical Verification and subsequent DoD approval"
residual_risks:
  - "Hosted runtime variation may still invalidate the local candidate."
follow_up_items:
  - "After child DoD, parent CR-008 re-verifies a candidate containing the exact child result."
next_action: "Keep DoD blocked; return to s07 only after the proposed metadata/receipt amendment is explicitly approved."
```

## Branch Finish Decision
```yaml
finish_target: "codex/adaptive-governance-human-approval-ux and .claude/worktrees/cr-008-adaptive-governance"
workspace_kind: BOTH
verify_inputs:
  - "Local s08 matrix PASS"
  - "Hosted run 34216520563 FAIL before artifact build"
  - "DoD pending"
finish_gate_checks:
  verify_complete: FAIL
  dod_complete: PENDING
  findings_closed: FAIL
  exceptions_resolved: PASS
allowed_actions:
  - "Record F-AR08-001 and continue read-only diagnosis."
  - "Return to s07 after explicit human amendment approval."
blocked_actions:
  - "Merge branch"
  - "Remove or clean worktree"
  - "Tag, publish, release, or finalize parent CR-008"
cleanup_sequence: []
merge_conditions:
  - "Child Technical Verification and DoD pass."
  - "Parent CR-008 re-verifies the exact candidate and completes its own gates."
residual_risks:
  - "Shared parent/child branch state makes early cleanup destructive to the remaining verification path."
  - "Editing receipt-bound artifacts without refreshed receipts would create stale authorization."
final_recommendation: HOLD_OPEN
notes_for_closeout: "A clean workspace or green local tests do not permit finalization before child DoD and parent re-verification."
```

## Traceability
```yaml
upstream:
  - "align-adaptive-sa-ta-applicability.s04.acceptance-criteria.md"
  - "align-adaptive-sa-ta-applicability.s05.technical-approach.md"
  - "align-adaptive-sa-ta-applicability.s06.task-breakdown.md"
  - "align-adaptive-sa-ta-applicability.s07.implementation.md"
acceptance_refs:
  - "AC-AR-01..10"
  - "EDGE-AR-01..07"
implementation_candidate_commit: "a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff"
opened_local_candidate_sha256: "ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47"
hosted_run_id: "34216520563"
hosted_source_sha: "96212a30a1a341d90f96b85709f9834e8bfaaef8"
open_findings:
  - "F-AR08-001"
next_step: "Obtain human approval to reopen s07 and apply the metadata/receipt amendment; then create and verify a new candidate."
```

## Handoff
- Overall status: PARTIAL with a blocking hosted governance failure; local product evidence remains green.
- Residual risks: stale gate receipts if metadata is edited without re-sealing, hosted runtime variance, and stale parent-candidate evidence.
- Recommendation: approve the named s07 metadata/receipt amendment, then create and host a new exact candidate.
- Release recommendation: NOT_APPLICABLE for this child; parent CR-008 remains blocked.
- Next action: QC approves reopening s07; Developer approves the Task Plan amendment; affected BA/Developer/QC gate authorities approve receipt refresh.
