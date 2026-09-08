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
> semantic, full-regression, governance, package, diff, and encoding checks pass. The formal result
> remains PARTIAL until a pushed source commit completes the build-once hosted Node 18/22 Guardrails
> matrix. Technical Verification and DoD remain human-controlled and are not inferred.

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
    status: OPEN
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
    evidence: "All local adjacent and full regressions pass; hosted Node 18/22 evidence remains open."
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
skipped_checks:
  - "Hosted build-once Node 18/22 Guardrails: pending push of the s08-open source commit."
  - "ESLint: no repository wrapper, dependency, or configuration exists."
  - "Semgrep: executable is unavailable and no tool installation is authorized."
release_blockers:
  - "Hosted build-once Node 18/22 required jobs and candidate binding are not yet available."
status: PARTIAL
gaps:
  - "Hosted run identity, exact hosted artifact SHA-256, and required-job results"
residual_risks:
  - "A supported hosted Node runtime may differ from local Node 26 despite complete local evidence."
recommendation: "Commit and push this s08-open evidence, run the unchanged hosted Guardrails matrix, then amend the exact hosted binding before requesting Technical Verification."
notes_for_review: "Local evidence is complete; PARTIAL reflects the deliberately pending hosted boundary, not a local failure."
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
    result: PENDING
    evidence: "The branch has not yet supplied hosted Node 18/22 run identity for the current source commit."
  - item: "Human-controlled terminal decisions"
    result: PASS
    evidence: "Technical Verification and DoD remain pending QC; Release and Business Acceptance are not applicable to this child."
blocking_items:
  - "Hosted Guardrails matrix and candidate binding"
owner: "qc"
next_action: "Run hosted Guardrails and update candidate-bound evidence before Technical Verification review."
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
  - "Hosted Node 18/22 regression matrix"
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
hosted_source_sha: ""
hosted_run_id: ""
hosted_candidate_sha256: ""
binding_verdict: PENDING_HOSTED_EVIDENCE
notes:
  - "The opened local artifact passes exact install/update smoke 4/4."
  - "A hosted digest must not silently replace this local digest; QC must review any byte difference and extracted-content equivalence."
```

## Technical Verification
```yaml
status: PENDING
verdict: PARTIAL
candidate_sha256: "ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47"
source_sha: "a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff"
reviewed_by: []
reviewed_at: ""
blocking_items:
  - "Hosted build-once Node 18/22 Guardrails evidence is pending."
recommendation: "Do not approve Technical Verification until hosted required jobs and exact artifact binding pass."
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
    evidence: "No hosted run has been produced for the s08-open source commit yet."
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
  - "Hosted source/run/artifact binding"
  - "QC Technical Verification followed by QC DoD"
risk_level: MEDIUM
next_action: "Commit/push the s08-open source, obtain hosted Guardrails evidence, then return to QC review."
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
  - "Hosted Node 18/22 evidence and candidate binding"
  - "Explicit QC Technical Verification and subsequent DoD approval"
residual_risks:
  - "Hosted runtime variation may still invalidate the local candidate."
follow_up_items:
  - "After child DoD, parent CR-008 re-verifies a candidate containing the exact child result."
next_action: "Keep DoD blocked until hosted evidence is complete and QC reviews Technical Verification first."
```

## Branch Finish Decision
```yaml
finish_target: "codex/adaptive-governance-human-approval-ux and .claude/worktrees/cr-008-adaptive-governance"
workspace_kind: BOTH
verify_inputs:
  - "Local s08 matrix PASS"
  - "Hosted matrix pending"
  - "DoD pending"
finish_gate_checks:
  verify_complete: PENDING
  dod_complete: PENDING
  findings_closed: PASS
  exceptions_resolved: PASS
allowed_actions:
  - "Commit and push verification evidence required for hosted CI."
  - "Continue read-only verification and evidence updates."
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
next_step: "Obtain hosted Guardrails evidence; then request QC Technical Verification review before DoD."
```

## Handoff
- Overall status: PARTIAL; every local required check passes, hosted verification is pending.
- Residual risks: supported Node runtime variance and stale parent-candidate evidence.
- Recommendation: push one immutable s08-open source commit and use its build-once hosted artifact for the next QC binding decision.
- Release recommendation: NOT_APPLICABLE for this child; parent CR-008 remains blocked.
- Next action: run hosted Guardrails, then update Technical Verification evidence without inferring approval.
