---
artifact_id: "adaptive-governance-human-approval-ux.s08.verification"
artifact_family: workflow-step
work_item_slug: "adaptive-governance-human-approval-ux"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
change_id: "CR-008"
change_status: approved
spec_delta_refs:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CR-008/spec-delta/brd.delta.md"
  srs: "changes/CR-008/spec-delta/srs.delta.md"
spec_status: approved
planning_track: enterprise
execution_mode: agentic
execution_roles:
  - "developer"
  - "qc"
  - "devops"
  - "po"
review_mode: independent
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec: ["ba"]
  contract: ["developer"]
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: ["devops", "qc"]
  business_acceptance: ["po"]
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-08-28T14:23:15Z"
  contract_reviewed_by: ["developer"]
  contract_reviewed_at: "2026-08-28T14:23:15Z"
  dor_reviewed_by: ["ba", "qc"]
  dor_reviewed_at: "2026-08-28T14:23:15Z"
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-08-28T14:50:08Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-08-28T15:08:10Z"
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: ["qc"]
  dod_reviewed_at: "2026-09-02T06:24:11Z"
content_skills:
  - "codex-workflow-chain"
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "ci-cd-release"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "adaptive-governance-human-approval-ux.s07.implementation.md"
linked_artifacts:
  - "changes/CR-008/design.md"
  - "changes/CR-008/tasks.md"
  - "docs/releases/workflow-bundle-v2.6.2.md"
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> B4 independent review is approved. Formal local technical evidence recommends `PASS`: AG-01..AG-13
> are covered, Node 18/22/current each pass 44/44 unit files, and the same exact `v2.6.2` candidate
> plus immutable `v2.6.1` rollback asset pass all four Codex/Claude x global/project scenarios.
> Governance is aligned and release readiness is `READY_WITH_GUARDS`. Human QC explicitly approved
> Technical Verification and technical DoD at `2026-09-02T06:24:11Z`, bound to the recorded acceptance,
> candidate and rollback evidence. Overall workflow completion is still waiting for DevOps/QC Release
> and PO Business Acceptance. The branch/worktree stays `HOLD_OPEN`; no tag or publication is authorized.

## Step Contract
```yaml
step: "s08 Verify + DoD"
goal: >-
  Establish whether the reviewed CR-008 implementation satisfies AG-01..AG-13, strict governance,
  compatibility, privacy, exact-artifact and rollback controls, then present human-controlled
  Technical Verification, DoD, Release and Business Acceptance decisions without self-approving them.
value: >-
  Give QC, DevOps and PO an evidence-bound release decision over one immutable candidate instead of
  relying on implementation confidence or a generic passing test command.
scope_in:
  - "AG-01..AG-13 acceptance coverage"
  - "Node 18, Node 22 and current-runtime unit/regression evidence"
  - "Exact v2.6.2 candidate and immutable v2.6.1 rollback matrices"
  - "Governance, scan, documentation, runtime parity and release-readiness evidence"
  - "Branch/worktree finalization recommendation"
scope_out:
  - "Changing production behavior, accepted specs or the B4-reviewed candidate"
  - "Publishing, tagging, registry promotion or global installation"
  - "Self-approving Technical Verification, DoD, Release or Business Acceptance"
  - "Fixing the unchanged github-push MCP Windows-path fixture"
inputs_required:
  - "Approved Spec, Contract, DoR, Approach and Task Plan receipts"
  - "B0..B4 review decisions, including QC-approved B4"
  - "s07 implementation, TDD and T9/T8a evidence"
  - "Exact candidate and rollback artifact identities"
outputs_required:
  - "Risk-ranked verification report with every acceptance criterion mapped"
  - "Regression, compatibility, scan, governance and release summaries"
  - "Technical Verification and DoD recommendations for human QC"
  - "Explicit residual risks and branch/worktree HOLD_OPEN decision"
done_when:
  - "Every AG criterion has evidence and no technical release blocker is hidden"
  - "Mandatory unit, integration-style filesystem/CLI and feature-level paths pass"
  - "Negative, compatibility, privacy, exact-candidate and rollback paths are covered"
  - "Skipped tooling and remote checks have explicit impact and owners"
  - "Human-controlled decisions and branch-finalization constraints are stated without inference"
constraints:
  hard_constraints:
    - "Use the B4-reviewed source and exact candidate bytes; any packaged-source drift invalidates evidence"
    - "Do not self-approve Technical Verification, DoD, Release or Business Acceptance"
    - "Do not publish, tag, merge, clean or remove the branch/worktree in this evidence-preparation pass"
    - "Preserve immutable v2.6.1 history and rollback asset"
  soft_constraints:
    - "Prefer existing wrapper commands and diff-aware scans"
    - "Treat unavailable static tools as explicit limitations, not silent passes"
  prohibited_actions:
    - "Rebuild the v2.6.2 candidate after recording its digest without restarting verification"
    - "Use a convenience tag as the release source of truth"
    - "Use an uncommitted-delivery waiver without an explicit human reason"
  compliance_checks:
    - "Strict and default governance checklists"
    - "AG-01..AG-13 evidence mapping"
    - "Full unit, validator, pack, runtime, exact candidate and rollback checks"
    - "UTF-8, YAML, local-link, secret/network and whitespace checks"
risks:
  - id: "S08-R1"
    description: "A passing local suite hides a hosted-runner or packaging-only defect."
    likelihood: LOW
    impact: HIGH
    severity: MEDIUM
    mitigation: "Use one exact candidate on Node 18/22 and retain GitHub-hosted Guardrails as a pre-release guard."
    contingency: "Block Release and issue a governed patch if hosted Guardrails diverges."
    owner: "devops/qc"
    status: MONITORING
  - id: "S08-R2"
    description: "A closeout action mutates or removes the worktree before all human gates and receipts are complete."
    likelihood: LOW
    impact: HIGH
    severity: HIGH
    mitigation: "Keep branch-finish recommendation HOLD_OPEN until DoD, Release, Business Acceptance and receipt checks pass."
    contingency: "Stop closeout and retain the exact worktree/candidate evidence."
    owner: "qc/devops"
    status: OPEN
timebox:
  target_duration: "One bounded formal verification pass over the B4-reviewed candidate"
  deadline: "Before any v2.6.2 tag or publication"
  escalation_rule: "Any criterion failure, artifact drift or HIGH scan finding returns to s07 and reopens the affected B4 review."
```

## Main Artifact
```yaml
verification_target: "CR-008 adaptive governance and exact workflow-bundle v2.6.2 candidate"
risk_ranked_test_matrix:
  - risk: "Unsafe routing downgrade or irrelevant role/gate ceremony"
    severity: HIGH
    required_evidence: ["golden lane matrix", "20x determinism", "hard-trigger negatives", "cross-adapter applicability"]
  - risk: "Partial or unauthorized approval state"
    severity: HIGH
    required_evidence: ["transaction failure/crash/concurrency matrix", "independent receipt-v1 verification"]
  - risk: "Telemetry leaks sensitive data or deletes foreign files"
    severity: HIGH
    required_evidence: ["secret canaries", "absolute allowlist", "disabled no-op", "ownership-safe purge"]
  - risk: "Runtime/candidate skew or unsafe rollback"
    severity: HIGH
    required_evidence: ["runtime parity", "one candidate SHA-256", "Node 18/22 exact install and rollback"]
  - risk: "Documentation or governance drift"
    severity: MEDIUM
    required_evidence: ["release surface", "validators", "pack audit", "UTF-8 and local links"]
test_strategy:
  unit_test:
    required: true
    rationale: "Routing, applicability, transaction, telemetry and validation decisions contain pure deterministic logic."
  integration_test:
    required: true
    rationale: "Approval transactions, protocol reconciliation, filesystem ownership, runtime installation and rollback cross module boundaries."
  database_test:
    required: false
    rationale: "CR-008 changes no database, schema, query or data migration."
  feature_test:
    required: true
    rationale: "CLI materialize, approval bundle, protocol, install/update and rollback flows require end-to-end evidence."
negative_cases:
  - "Every hard-risk trigger rejects a lower-lane or normal-preset downgrade."
  - "Malformed triggers, invalid override timestamps and runtime-minor skew fail before writes."
  - "Stale digest, unauthorized reviewer, persistence failure and crash expose no partial authority."
  - "Disabled telemetry writes nothing; secret canaries are absent; foreign JSON survives purge."
  - "Candidate and rollback digest mismatches fail closed."
regression_targets:
  - "Legacy fixed-shape artifacts and trusted receipt schema v1 remain readable without rewrite."
  - "Individual approval commands remain when adaptive bundle writes are disabled."
  - "Codex/Claude global/project installs preserve unmanaged content and modes."
  - "Published v2.6.1 history remains unchanged and is the exact known-good rollback."
manual_exploration:
  flows_checked:
    - "Reviewed B4 evidence against AG-01..AG-13 and approved CR-008 boundaries."
    - "Installed and rolled back exact artifacts across four harness/scope scenarios on Node 18/22."
    - "Inspected EN/VI docs, release identity, local links and immutable rollback guidance."
    - "Reviewed synchronous I/O as bounded CLI/transaction work rather than a request hot path."
  issues_found: []
criteria_results:
  - { criterion: "AG-01", result: PASS, evidence: "Non-delivery fixtures assert workflow_required=false and zero delivery writes without audited override." }
  - { criterion: "AG-02", result: PASS, evidence: "Maintenance fixtures omit PO/BA/SA/TA/DevOps without a named trigger." }
  - { criterion: "AG-03", result: PASS, evidence: "Eight lane fixtures are byte-stable over 20 repeated evaluations." }
  - { criterion: "AG-04", result: PASS, evidence: "Six hard triggers plus mixed intent reject every tested unsafe downgrade." }
  - { criterion: "AG-05", result: PASS, evidence: "Not-applicable roles/gates create zero actions, blockers or receipts across derived surfaces." }
  - { criterion: "AG-06", result: PASS, evidence: "Ready-bundle creates one receipt-v1 per applicable gate with reviewer, timestamp and digest." }
  - { criterion: "AG-07", result: PASS, evidence: "Preflight, failure, crash and concurrency fixtures retain zero partial state and idempotent recovery." }
  - { criterion: "AG-08", result: PASS, evidence: "Maintenance derives DoD only; release retains DoD, Release and Business Acceptance authority." }
  - { criterion: "AG-09", result: PASS, evidence: "Legacy/adaptive readers, fixed-host rules, receipt-v1 and rollback compatibility pass." }
  - { criterion: "AG-10", result: PASS, evidence: "Disabled no-op, allowlist, pseudonym, canary, retention and safe purge fixtures pass." }
  - { criterion: "AG-11", result: PASS, evidence: "Successful approval atomically reconciles every source and derived state surface." }
  - { criterion: "AG-12", result: PASS, evidence: "20 runs reduce median interactions 7->3 (57.14%) with 0.00% retry and independent receipts." }
  - { criterion: "AG-13", result: PASS, evidence: "Skew fails before writes; parity, exact candidate and rollback pass Node 18/22." }
test_evidence:
  unit_test:
    - "Node 26.5.0: 44/44 test files PASS."
    - "Node 18.20.8: 44/44 test files PASS."
    - "Node 22.23.2: 44/44 test files PASS."
  integration_test:
    - "Approval failure/crash/concurrency, protocol reconciliation and runtime parity PASS."
    - "Exact candidate and rollback filesystem/install matrices PASS."
  database_test: []
  feature_test:
    - "Authoring smoke: 13/13 PASS."
    - "Exact candidate: 4/4 PASS on Node 18 and Node 22."
    - "Exact v2.6.1 rollback: 4/4 PASS on Node 18 and Node 22."
commands_run:
  - "npm run validate:workflow:unit"
  - "Node 18.20.8 and Node 22.23.2 packages/workflow-bundle/test/run-all.js"
  - "release-candidate-artifact-smoke.test.js with exact path/SHA-256 on Node 18/22"
  - "release-rollback-smoke.test.js with exact candidate/rollback path/SHA-256 on Node 18/22"
  - "workflow standard/naming/governance/sdd/change/execution/planning/protocol validators"
  - "workflow pack audit, authoring smoke and bundle smoke"
  - "JavaScript syntax, Guardrails YAML, UTF-8, local-link, secret/network and diff checks"
skipped_checks:
  - "ESLint: no executable/config; node --check, full tests and manual diff review are the fallback."
  - "Semgrep: unavailable; canaries, pattern scans, negative tests and manual sensitive-path review are the fallback."
  - "GitHub-hosted Guardrails: branch is unpushed; exact local Node 18/22 topology passes and remains a pre-release guard."
release_blockers: []
status: PASS
gaps: []
residual_risks:
  - "Hosted runner behavior remains unobserved until the authorized branch/pull-request path executes."
  - "Unchanged github-push MCP has one macOS failure from a Windows-only fixture path; CR-008 changes no MCP file."
  - "Telemetry purge scans its local directory linearly; retained scope and CLI execution make current risk LOW."
recommendation: "QC approved Technical Verification; retain hosted Guardrails and human Release controls."
notes_for_review: "QC approved Technical Verification and technical DoD; this authorizes no Release, Business Acceptance, merge or cleanup."
technical_verification_decision:
  status: APPROVED
  reviewed_by: "qc"
  reviewed_at: "2026-09-02T06:24:11Z"
  decision_source: "User explicitly approved Technical Verification and DoD with role QC."
  evidence_binding:
    acceptance_coverage: "AG-01..AG-13 PASS"
    candidate_sha256: "ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5"
    rollback_sha256: "7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md", "project-context/checklists/strict.md"]
checks:
  - { check: "Pass/not-pass evidence is explicit", status: PASS, evidence: "Each AG maps to named evidence and exact artifact identities." }
  - { check: "Behavior, docs and release identity are synchronized", status: PASS, evidence: "Policy, runtimes, 42-skill inventories, EN/VI docs and v2.6.2 metadata agree." }
  - { check: "Remaining gaps have owners", status: PASS, evidence: "Hosted Guardrails belongs to DevOps/QC pre-release; unchanged MCP fixture is outside candidate scope." }
  - { check: "Evidence supports release decision", status: PASS, evidence: "Exact candidate/rollback digests, Node matrices, pipeline topology and controls are recorded." }
  - { check: "Rollback/remediation is viable", status: PASS, evidence: "Published v2.6.1 digest is verified and passes every rollback scenario." }
  - { check: "Exceptions are explicit", status: PASS, evidence: "No CR-008 governance exception or waiver is open." }
blocking_items:
  - "Release and Business Acceptance remain separate downstream human gates."
  - "GitHub-hosted Guardrails remains a pre-Release control on the authorized branch/pull-request path."
owner: "devops/qc/po"
next_action: "Preserve the VERIFIED branch/worktree for hosted Guardrails, Release and Business Acceptance."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
evidence:
  - "Node 18/22/current full suites pass without a regressed workflow-bundle test file."
  - "Legacy fixed-shape artifacts and receipt v1 retain reader/enforcement behavior."
  - "Adaptive writes require matching minor and parity; invalid activation writes nothing."
  - "Rollback to v2.6.1 removes adaptive runtime and preserves skills plus unmanaged hashes/modes."
known_baseline_gap: "Unchanged github-push MCP fixture uses a Windows-only D:\\ path on macOS; MCP diff is empty."
```

## Spec Coverage
```yaml
spec_refs: ["changes/CR-008/spec-delta/brd.delta.md", "changes/CR-008/spec-delta/srs.delta.md"]
coverage:
  - { acceptance_ref: "AG-01", status: PASS, test_refs: ["materialize-work-item", "workflow-adaptive-governance"] }
  - { acceptance_ref: "AG-02", status: PASS, test_refs: ["scaffold-workflow", "materialize-work-item"] }
  - { acceptance_ref: "AG-03", status: PASS, test_refs: ["golden determinism"] }
  - { acceptance_ref: "AG-04", status: PASS, test_refs: ["hard-trigger negatives"] }
  - { acceptance_ref: "AG-05", status: PASS, test_refs: ["applicability parity"] }
  - { acceptance_ref: "AG-06", status: PASS, test_refs: ["workflow-gate-review", "work-item-protocol"] }
  - { acceptance_ref: "AG-07", status: PASS, test_refs: ["failure/crash/concurrency matrix"] }
  - { acceptance_ref: "AG-08", status: PASS, test_refs: ["terminal applicability"] }
  - { acceptance_ref: "AG-09", status: PASS, test_refs: ["legacy/adaptive readers", "receipt-v1", "rollback"] }
  - { acceptance_ref: "AG-10", status: PASS, test_refs: ["workflow-telemetry"] }
  - { acceptance_ref: "AG-11", status: PASS, test_refs: ["approval reconciliation"] }
  - { acceptance_ref: "AG-12", status: PASS, test_refs: ["20 controlled runs"] }
  - { acceptance_ref: "AG-13", status: PASS, test_refs: ["runtime skew/parity", "candidate", "rollback"] }
status: PASS
gaps: []
```

## Scan Summary
```yaml
scan_target: "CR-008 JavaScript, policy and release diff"
scan_scope:
  mode: DIFF_ONLY
  changed_files: ["packages/workflow-bundle/bin/wfc.js", "packages/workflow-bundle/scripts", "packages/workflow-bundle/test", ".github/workflows/workflow-guardrails.yml"]
  affected_modules: ["routing", "approval transaction", "telemetry", "runtime sync", "release pipeline"]
language_stack: ["JavaScript", "Node.js", "GitHub Actions YAML"]
available_scan_tools: ["node --check", "workflow tests", "rg pattern scans", "Ruby YAML parser"]
false_positive_policy: "Diff-aware, evidence-based, dismiss only with a recorded reason."
scan_plan:
  syntax: ["node --check changed JavaScript", "parse Guardrails YAML"]
  static_analysis: ["use ESLint if configured; otherwise explicit skip"]
  security: ["secret/network scans", "privacy and transaction negatives", "manual review"]
  performance_heuristic: ["review synchronous I/O, serialization and local purge complexity"]
syntax_scan_results:
  - command: "node --check for every changed/untracked JavaScript file"
    scope: ["CR-008 JavaScript diff"]
    status: PASS
    evidence: "Every selected file parses on Node 26.5.0."
    blocker_files: []
  - command: "Ruby YAML parser"
    scope: ["Workflow Guardrails"]
    status: PASS
    evidence: "Workflow YAML parses."
    blocker_files: []
static_analysis_results:
  - command: "ESLint"
    config_used: "none present"
    scope: ["CR-008 JavaScript diff"]
    status: SKIP
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: "Secret/network-surface scans and privacy/transaction negative tests"
    scope: ["changed production scripts and CLI"]
    status: PASS
    findings: []
  - command_or_check: "Semgrep"
    scope: ["CR-008 JavaScript diff"]
    status: SKIP
    findings: []
performance_heuristic_results:
  - check: "Synchronous I/O and JSON operations"
    scope: ["approval transaction", "telemetry", "adaptive kernel"]
    status: PASS
    expected_impact: LOW
    confidence: MEDIUM
    trigger_condition: "Very large telemetry directories or unusually high applicable-gate counts."
    evidence: "Operations are bounded CLI transactions; purge is linear and local; no network/request hot path was added."
skipped_scans:
  - "ESLint unavailable/unconfigured; syntax, full tests and review are the fallback."
  - "Semgrep unavailable; targeted scans, canaries, negatives and review are the fallback."
overall_status: PARTIAL
remediation_actions:
  - "If ESLint/Semgrep are later added to hosted Guardrails, any new HIGH finding blocks Release."
notes_for_verify: "No available scan found a blocker. PARTIAL reflects absent dedicated static tools, not a known defect."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["Controlled kernel runs and Business Acceptance replace a separate UAT gate for CR-008."]
```

## Release Summary
```yaml
status: PARTIAL
reviewers: ["devops", "qc"]
technical_readiness: READY_WITH_GUARDS
candidate: { version: "2.6.2", sha256: "ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5" }
rollback: { version: "2.6.1", sha256: "7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9" }
pending_controls:
  - "GitHub-hosted Workflow Guardrails on the authorized branch/pull-request path."
  - "Human Release approval by DevOps and QC."
  - "Exact-digest publication with no rebuild or tag retarget."
notes: ["No v2.6.2 tag, release, publication or global install has executed."]
```

## Business Acceptance Summary
```yaml
status: PARTIAL
reviewers: ["po"]
evidence_ready: ["AG-01..AG-13 coverage", "57.14% interaction reduction", "zero retries", "independent receipts"]
pending_controls: ["Human PO Business Acceptance after the Release decision."]
notes: ["Technical evidence does not substitute for the PO decision."]
```

## Deployment Review
```yaml
pipeline_scope: "GitHub Actions build-once verification and GitHub Release promotion for v2.6.2"
source_strategy:
  branch_model: "Dedicated CR-008 branch reviewed before merge/release"
  triggers: ["authorized pull_request/push runs Guardrails", "release publication is separately human-controlled"]
build_and_verify:
  stages: ["pre-merge checks", "pack once and hash", "Node 18/22 exact candidate", "post-release digest/install smoke"]
  cache_strategy: ["Isolated temporary npm caches must not alter candidate bytes."]
  required_checks: ["44/44 unit files", "candidate/rollback 4/4 matrices", "runtime parity", "validators", "pack audit"]
artifact_flow:
  registry: "GitHub Releases; not contacted in this pass"
  artifact_types: ["workflow-bundle-2.6.2.tgz", "workflow-bundle-2.6.1.tgz rollback"]
  tagging_strategy: ["Immutable v2.6.2 plus SHA-256; latest is never source of truth."]
  provenance_controls: ["Build once and reuse exact digest.", "Packaged-source edits invalidate evidence."]
promotion_flow:
  - from: local
    to: dev
    conditions: ["Promote to hosted candidate verification with exact digest.", "Guardrails passes."]
    automation_level: "AUTOMATED_AFTER_AUTHORIZED_PUSH"
  - from: dev
    to: uat
    conditions: ["QC Technical Verification/DoD.", "DevOps/QC Release binds same digest."]
    automation_level: "HUMAN_GATED_RELEASE_PREPARATION"
  - from: uat
    to: prod
    conditions: ["Publish exact v2.6.2 bytes.", "Verify release asset digest and isolated install."]
    automation_level: "HUMAN_GATED_PUBLICATION"
approval_controls: ["QC owns Technical Verification/DoD.", "DevOps/QC own Release.", "PO owns Business Acceptance."]
release_controls:
  pre_release: ["Hosted Guardrails and human gates.", "Confirm v2.6.2 tag unused immediately before creation."]
  post_release: ["Verify GitHub asset digest.", "Run isolated install/status smoke."]
rollback_controls:
  - "Use immutable v2.6.1 SHA-256 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9."
  - "Stop on digest, parity or hosted Guardrails mismatch; preserve unmanaged content and receipts."
pipeline_risks: ["Hosted execution pending authorized push.", "Packaged-source edit invalidates candidate."]
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "Readiness only; no push, tag, publication, merge, cleanup or global install is authorized."
```

## Governance Exceptions
```yaml
status: NONE
open_exceptions: []
waivers: []
notes: "Unavailable scan tools and unchanged MCP fixture are limitations, not governance exceptions."
```

## Audit

### Step Goal Audit
```yaml
step: "s08 Verify + DoD evidence preparation"
status: PASS
checks:
  - { criterion: "Every AG has evidence", result: PASS, evidence: "Spec Coverage records 13/13 PASS." }
  - { criterion: "Mandatory and negative paths are covered", result: PASS, evidence: "Node, transaction, CLI, compatibility, privacy, candidate and rollback matrices pass." }
  - { criterion: "Skipped checks are explicit", result: PASS, evidence: "ESLint, Semgrep and hosted Guardrails list fallbacks and impact." }
  - { criterion: "Human authority is preserved", result: PASS, evidence: "QC explicitly approved Technical Verification and technical DoD at 2026-09-02T06:24:11Z; Release and Business Acceptance remain pending and branch finish is HOLD_OPEN." }
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "One bounded pass; no production or candidate edit."
gaps: []
risk_level: MEDIUM
next_action: "Commit the VERIFIED snapshot, preserve HOLD_OPEN and prepare the hosted Guardrails/Release path."
```

### Branch And Worktree Closeout
```yaml
finish_target: "codex/adaptive-governance-human-approval-ux and its dedicated worktree"
workspace_kind: BOTH
verify_inputs: ["B4 QC review PASS", "formal evidence PASS", "QC Technical Verification and technical DoD approval"]
finish_gate_checks:
  verify_complete: PASS
  dod_complete: PASS
  findings_closed: PASS
  exceptions_resolved: PASS
allowed_actions: ["Commit the reviewed VERIFIED source snapshot.", "Keep the worktree open and run authorized hosted Guardrails."]
blocked_actions: ["Merge/close/remove branch or worktree.", "Tag/publish/install v2.6.2.", "Seal the final s08 receipts before Release and Business Acceptance freeze this host artifact."]
cleanup_sequence: []
merge_conditions: ["Hosted Guardrails", "required Release/Business Acceptance", "final digest-matched receipts", "post-merge verification"]
residual_risks: ["Release and Business Acceptance remain pending.", "Hosted Guardrails remains pending."]
final_recommendation: HOLD_OPEN
notes_for_closeout: "QC Technical Verification and technical DoD are approved, but downstream gates still prohibit branch finalization."
```

## Definition of Done
```yaml
work_item_slug: "adaptive-governance-human-approval-ux"
status: DONE
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
human_decision:
  technical_verification:
    status: APPROVED
    reviewed_by: "qc"
    reviewed_at: "2026-09-02T06:24:11Z"
    decision_source: "User explicitly approved Technical Verification and DoD with role QC."
  dod:
    status: APPROVED
    reviewed_by: "qc"
    reviewed_at: "2026-09-02T06:24:11Z"
    receipt_state: DEFERRED_UNTIL_FINAL_S08_FREEZE
    receipt_reason: "Release and Business Acceptance must still update the same s08 host; sealing now would make the receipt stale."
  evidence_binding:
    acceptance_coverage: "AG-01..AG-13 PASS"
    candidate_sha256: "ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5"
    rollback_sha256: "7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
gaps: []
residual_risks: ["Hosted Guardrails pre-release guard.", "ESLint/Semgrep unavailable with fallbacks.", "Release and Business Acceptance remain required."]
follow_up_items:
  - "Commit the reviewed VERIFIED source snapshot."
  - "Run GitHub-hosted Guardrails on the authorized branch/pull-request path."
  - "Obtain DevOps/QC Release and PO Business Acceptance before workflow DONE/publication."
  - "Freeze final s08 and seal terminal receipts only after every applicable decision is recorded."
next_action: "Commit the VERIFIED snapshot; technical DoD is DONE while overall workflow remains WAITING_APPROVAL."
```

## SDD Traceability
```yaml
requirement_refs: ["BR-AG-001", "BR-AG-002", "BR-AG-003", "BR-AG-004", "BR-AG-005", "BR-AG-006", "REQ-AG-001", "REQ-AG-002", "REQ-AG-003", "REQ-AG-004", "REQ-AG-005", "REQ-AG-006", "REQ-AG-007", "REQ-AG-008", "REQ-AG-009", "REQ-AG-010", "REQ-AG-011"]
acceptance_refs: ["AG-01", "AG-02", "AG-03", "AG-04", "AG-05", "AG-06", "AG-07", "AG-08", "AG-09", "AG-10", "AG-11", "AG-12", "AG-13"]
task_refs: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T8a", "T9"]
test_refs: ["workflow-adaptive-governance", "materialize-work-item", "scaffold-workflow", "workflow-gate-review", "work-item-protocol", "workflow-telemetry", "runtime-parity", "release-candidate", "release-rollback", "release-surface"]
```

## Traceability
```yaml
upstream:
  - "adaptive-governance-human-approval-ux.s04.acceptance-criteria.md"
  - "adaptive-governance-human-approval-ux.s05.technical-approach.md"
  - "adaptive-governance-human-approval-ux.s06.task-breakdown.md"
  - "adaptive-governance-human-approval-ux.s07.implementation.md"
verification_targets:
  - "changes/CR-008/spec-delta/brd.delta.md"
  - "changes/CR-008/spec-delta/srs.delta.md"
  - "v2.6.2 candidate ec0007aea70c69f02a3982b649b1ee594472d901259be253293ead676fe1f0c5"
  - "v2.6.1 rollback 7c1d2c7bde8307801cacc6a513a6c547abdd4e9accfdaa2d71685cd44533f0b9"
next_step: "GitHub-hosted Guardrails, followed by DevOps/QC Release and PO Business Acceptance."
```

## Handoff
- Overall status: QC approved Technical Verification and technical DoD; the work-item protocol is `VERIFIED`, but overall workflow completion remains `WAITING_APPROVAL` for Release and Business Acceptance.
- Residual risks: hosted Guardrails pending; ESLint/Semgrep unavailable with fallbacks; unchanged MCP fixture baseline gap.
- QC decision: `APPROVED` at `2026-09-02T06:24:11Z`, bound to AG-01..AG-13 and the recorded candidate/rollback digests.
- Release recommendation: `READY_WITH_GUARDS`; DevOps/QC Release, hosted Guardrails and exact-digest controls remain mandatory.
- Next action: commit the `VERIFIED` snapshot, then run hosted Guardrails before Release review. Branch/worktree remains `HOLD_OPEN`.
