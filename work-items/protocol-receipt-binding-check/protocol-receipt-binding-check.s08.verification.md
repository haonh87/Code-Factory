---
artifact_id: "protocol-receipt-binding-check.s08.verification"
artifact_family: workflow-step
work_item_slug: "protocol-receipt-binding-check"
step_id: "s08"
step_slug: "verification"
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
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
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
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: ["qc"]
  dod_reviewed_at: "2026-10-27T10:04:04.500Z"
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
  - "protocol-receipt-binding-check.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 — CF-023 Verify + DoD

Technical acceptance coverage is PASS (9/9). The registered suite passes 50/50 test files.
Human QC approves this evidence and the disclosed scan limitation; the DoD receipt must match
this finalized note before the separate work-item closure transition. The implementation is
committed on `fix/cf-023-binding-current`; main's production files are unchanged and no merge,
release or worktree cleanup has occurred.

## Step Contract

```yaml
step_goal: "Verify the bounded collector correction against the approved nine criteria and prepare human DoD."
input_summary: ["Signed Spec/DoR/Approach/Task Plan", "s07 TDD and ordered review", "Source commit 0f0f5ad7fe4b20e6536c4ba31c084c2ff98cab95"]
output_summary: ["9/9 coverage", "Registered suite and scoped scan evidence", "Human DoD decision packet"]
done_when: ["Technical evidence is complete and residuals are explicit; completion still requires the QC signature."]
owner: qc
```

## Main Artifact

```yaml
verification_target: "CF-023 source commit 0f0f5ad7fe4b20e6536c4ba31c084c2ff98cab95"
risk_ranked_test_matrix:
  - risk: "Attributing an approval to different or absent bytes"
    severity: HIGH
    required_evidence: ["Full/Light ref/hash/missing-host matrices", "Matching controls", "Independent ACTIVE rejection"]
  - risk: "Hiding I/O failure or mutating evidence during validation"
    severity: HIGH
    required_evidence: ["Injected EACCES", "Corrupt JSON", "Before/after byte snapshots"]
test_strategy:
  unit_test:
    required: true
    rationale: "Trust/binding/lifecycle helpers and registered regression suite"
  integration_test:
    required: true
    rationale: "Actual validator reads and verifies synthetic signed files"
  database_test:
    required: false
    rationale: "No database or schema change"
  feature_test:
    required: true
    rationale: "Public validator CLI positive controls plus API negative matrix"
negative_cases: ["Stale hash", "Wrong ref", "Missing host/receipt", "Rejected receipt", "Invalid signature", "Wrong key", "Corrupt JSON", "Unexpected EACCES"]
regression_targets: ["Full/Light host mapping", "Namespace identity", "Opaque and typed state", "ACTIVE/VERIFIED/DONE guards"]
manual_exploration:
  flows_checked: ["Main admission/readiness receipt validation", "Isolated worktree protocol corpus", "Source diff and no-write boundary"]
  issues_found: ["Initial disposable test copy lacked a Git index; setup corrected and all 50 files rerun successfully."]
commands_run:
  - "node /tmp/cf023-implementation-20261027/run-binding-only.cjs packages/workflow-bundle/test/work-item-protocol.test.js"
  - "node packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js"
  - "node packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
  - "Node 22.23.2: sync-workflow-bundle-runtime.js then test/run-all.js in /tmp/cf023-verify-20261027 with local Git index"
  - "node --check on both changed JS files; git diff --check; workflow naming/governance/execution/planning/protocol; strict UTF-8"
skipped_checks: ["ESLint/type analysis: no configured wrapper or installed eslint/tsc", "Semgrep: not installed; no installation requested"]
release_blockers: []
status: PASS
gaps: []
residual_risks: ["Manual static/security review cannot claim scanner coverage", "No concurrent-write atomic snapshot guarantee is introduced"]
recommendation: "Approve technical DoD if the stated scan limitation is accepted; retain branch until signed and reviewed closure."
notes_for_review: "No production behavior beyond the approved collector changed. No actual signer/receipt store was mutated by the new tests."
```

## Spec Coverage

```yaml
status: PASS
summary:
  total: 9
  pass: 9
  fail: 0
  partial: 0
coverage:
  - id: AC-RB-001
    requirement: REQ-RB-001
    status: PASS
    evidence: "Matching signed host with typed pending state retains the real contradiction; absent pending state validates."
  - id: AC-RB-002
    requirement: REQ-RB-002
    status: PASS
    evidence: "Stale hash is not a current approval at MATERIALIZED; ACTIVE still rejects stale evidence."
  - id: AC-RB-003
    requirement: REQ-RB-002
    status: PASS
    evidence: "Wrong ref with matching hash is not a current approval; ACTIVE still rejects ref mismatch."
  - id: AC-RB-004
    requirement: REQ-RB-002
    status: PASS
    evidence: "Missing host adds no false contradiction or ENOENT at MATERIALIZED; ACTIVE rejects absence."
  - id: AC-RB-005
    requirement: REQ-RB-001
    status: PASS
    evidence: "Missing/rejected/invalid-signature/wrong-key controls and corrupt JSON all preserve explicit failure semantics."
  - id: AC-RB-006
    requirement: REQ-RB-003
    status: PASS
    evidence: "Both full s05 and Light s06 host matrices pass; trusted namespace regression suite passes."
  - id: AC-RB-007
    requirement: REQ-RB-004
    status: PASS
    evidence: "Every validator call snapshots fixture notes/reports/keys/receipts; injected EACCES remains visible."
  - id: AC-RB-008
    requirement: REQ-RB-003
    status: PASS
    evidence: "Opaque legacy state plus existing typed ACTIVE/VERIFIED/DONE regressions pass in the registered suite."
  - id: AC-RB-009
    requirement: REQ-RB-004
    status: PASS
    evidence: "Fourteen targeted RED assertions become zero GREEN; registered suite passes 50/50 after runtime/Git setup."
```

All criteria are owned by `product-specs/cards/protocol-receipt-binding-check.md`. Above entries
record verification only, not a second requirement definition.

## Verification Evidence

The permanent regression function is `testCurrentHostBindingInProtocolCollector` in
`packages/workflow-bundle/test/work-item-protocol.test.js`. The focused runner executes that
same function for TDD; the registered full suite executes it normally. Tests generate synthetic
signing material only in temporary fixture directories. Snapshot assertions cover every fixture
file before/after each API validation. Signature helpers and lifecycle guards are unchanged.

| Evidence | Outcome |
| --- | --- |
| `baseline-protocol.log` | Existing protocol suite PASS before new tests |
| `red-binding.log` | Exit 1; 14 expected failures, all valid controls passed |
| `green-binding.log` | Exit 0; zero failures on the same regression matrix |
| `trust.log`, `gates.log` | Focused trust/namespace and gate/reference suites PASS |
| `full-suite.log`, `full-suite-recheck.log` | Initial run had one missing-Git-index setup failure; isolated rerun passed |
| `full-suite-final.log` | Exit 0; registered suite 50/50 on Node 22.23.2 |
| `protocol-green.log` | Worktree corpus PASS, 27 managed items / 20 legacy skips |

Logs are local scratch under `/tmp/cf023-implementation-20261027/`. This note retains the commands,
counts, limitations, source identity and acceptance mapping after scratch expires. The full-suite
copy's two changed JS files were SHA-256 matched to the committed worktree source.

## Regression & Compatibility Summary

```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
```

Full and Light use their existing gate-host mapping. Valid matching approvals and genuine pending
contradictions stay valid. Stale receipts remain signatures over their original bytes; they are
not rewritten, revoked or resealed. Existing lifecycle guards continue to reject invalid evidence.
Rollback is a revert of the source correction commit; it restores the false diagnostic and does
not require any data or receipt migration.

## Scan Summary

```yaml
scan_target: "The two changed JavaScript files"
scan_scope:
  mode: DIFF_ONLY
  changed_files: ["validate-work-item-protocol.js", "work-item-protocol.test.js"]
  affected_modules: ["Protocol approval contradiction collector"]
language_stack: ["Node.js CommonJS"]
available_scan_tools: ["Node native parser", "Git diff checks", "Project validators and test runner"]
false_positive_policy: "No scanner finding is claimed; manual review evidence is separate from tool-backed scanning."
scan_plan:
  syntax: ["node --check"]
  static_analysis: ["Check repository wrappers/tool availability", "Targeted import/API/error-path review"]
  security: ["Check scanner availability", "Review signature-first/binding/no-write boundary", "Exercise signed negative controls"]
  performance_heuristic: ["Inspect bounded gate iteration and synchronous note reads"]
syntax_scan_results:
  - command: "node --check on both changed JS files"
    scope: ["Two-file diff"]
    status: PASS
    evidence: "Exit 0"
    blocker_files: []
static_analysis_results:
  - command: "ESLint/type-check availability"
    config_used: "No project lint/typecheck wrapper"
    scope: ["Two-file diff"]
    status: SKIP
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: "Semgrep availability"
    scope: ["Two-file diff"]
    status: SKIP
    findings: []
performance_heuristic_results:
  - check: "One profile read and stat/hash reads only for signature-valid gate receipts"
    scope: ["Collector, maximum ten known gate keys per item"]
    status: PASS
    expected_impact: LOW
    confidence: MEDIUM
    trigger_condition: "Large host notes increase synchronous hashing cost; no service latency claim is made."
    evidence: "Bounded gate array, no network/dependency work or persistent writes; heuristic only, no benchmark."
skipped_scans: ["eslint/tsc unavailable", "semgrep unavailable"]
overall_status: PARTIAL
remediation_actions: []
notes_for_verify: "Justification: bounded read-only change, existing binding/signature helpers unchanged, negative fixtures and targeted security review passed. Human QC must accept the disclosed absence of automated lint/SAST; no scan PASS is fabricated."
```

Manual security review: no catch-all suppression, only ENOENT treated as absence; stat and read
errors remain visible; no command construction, credential reading or signing added to production.
New test keys are isolated fixtures. Stored receipts, namespace and authorization guard code are
outside the diff. There are no known open findings from this targeted review.

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Nine criteria have source-bound evidence", "TDD/worktree/ordered review recorded", "Readiness host hashes unchanged", "Production diff limited to approved two files"]
blocking_items: []
owner: qc
next_action: "Verify the QC DoD receipt and committed delivery before the separate CLI close transition."
```

## UAT Summary

```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["Internal CLI diagnostic correction with no UAT environment requirement"]
```

## Release Summary

```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No install, publish, tag or deployment is part of this work item"]
```

## Business Acceptance Summary

```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No separately required business acceptance gate"]
```

## Audit

```yaml
audit_status: PASS
notes: ["Technical evidence PASS; human QC accepts the disclosed automated-scan limitation."]
```

## Definition of Done

```yaml
work_item_slug: protocol-receipt-binding-check
status: DONE
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: []
residual_risks: ["Automated lint/SAST unavailable; targeted manual review and negative tests substitute, subject to human acceptance"]
follow_up_items: []
next_action: "Verify the matching signed DoD receipt, then close the work item through the CLI."
```

## Traceability

```yaml
upstream: ["protocol-receipt-binding-check.s07.implementation.md"]
requirement_refs: [REQ-RB-001, REQ-RB-002, REQ-RB-003, REQ-RB-004]
acceptance_refs: [AC-RB-001, AC-RB-002, AC-RB-003, AC-RB-004, AC-RB-005, AC-RB-006, AC-RB-007, AC-RB-008, AC-RB-009]
next_step: "Signed DoD permits a separate reviewed branch/closure decision; this note does not itself merge or close."
```

Source commit: `0f0f5ad7fe4b20e6536c4ba31c084c2ff98cab95`.

`packages/workflow-bundle/scripts/validate-work-item-protocol.js` SHA-256: `0f06677c6a5e09a8ebe2c221f56ede17833add9cee9c5cd4e3df5cb53099336d`.

`packages/workflow-bundle/test/work-item-protocol.test.js` SHA-256: `66910e2a0a357028cc202036b4a63df2cc4e1c625b782024ad211a6887f3001f`.
