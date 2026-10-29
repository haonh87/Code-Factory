---
artifact_id: "mcp-root-containment.s08.verification"
artifact_family: workflow-step
work_item_slug: "mcp-root-containment"
step_id: "s08"
step_slug: "verification"
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
  card: "product-specs/cards/mcp-root-containment.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
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
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: ["qc"]
  dod_reviewed_at: "2026-10-29T10:48:23.975Z"
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
  - "mcp-root-containment.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 — Verify + DoD

Technical verification PASS for the bounded SEC-002 fix. Human QC DoD reviewed and approved at 2026-10-29T10:48:23.975Z.
The branch is retained; merge and live rollout are separate decisions.

## Step Contract
```yaml
step_goal: "Verify AC-MR-001 through AC-MR-010 and prepare the exact QC review packet."
input_summary: ["Approved Spec Card", "Reviewed s07", "Three MCP code/test/README diffs"]
output_summary: ["Acceptance evidence", "Static/security review", "Environment limits", "Human DoD handoff"]
done_when: ["Every AC has evidence", "Checks pass or have justified limits", "Human QC reviews and signs DoD"]
owner: qc
```

## Main Artifact
```yaml
verification_target: "Physical root containment across github-push, gitlab and session-search"
risk_ranked_test_matrix:
  - risk: "Outside filesystem access through symlinks or missing ancestors"
    severity: HIGH
    required_evidence: ["Denied before Git/cass/open", "No outside fixture write", "Canonical positive controls"]
  - risk: "Private session content returned from stale or contradictory index metadata"
    severity: HIGH
    required_evidence: ["Validate actual transcript workspace", "Mixed list/search/related fixtures", "Pagination and limits"]
  - risk: "Compatibility regression or unbounded diagnostic"
    severity: MEDIUM
    required_evidence: ["Existing parser/Git controls", "Portable aliases/history", "EACCES diagnostic sentinel"]
test_strategy:
  unit_test: {required: true, rationale: "Resolvers, parsers, sanitizers and workflow suite"}
  integration_test: {required: true, rationale: "Real temporary filesystem links and local Git repositories"}
  database_test: {required: false, rationale: "No database changes"}
  feature_test: {required: true, rationale: "Core operations with counted stub Git/cass and synthetic transcripts"}
negative_cases: ["Sibling/traversal", "File/directory escape links", "Chains/loops/dangling links", "Missing roots/files", "ENOTDIR/ELOOP/EACCES", "NUL/non-string/null", "Contradictory index metadata", "Retargeted links", "Read failure diagnostic"]
regression_targets: ["Local repository initialization", "Git status/upstream/dirty/diverged controls", "Session parser/sanitizer", "Canonical aliases", "Historical workspaces", "Search caps and cursors"]
manual_exploration:
  flows_checked: ["Every Git runGit boundary", "Creation before/after mkdir", "Session open/view/context boundaries", "List/search/related validation and returned fields", "Signed source preservation"]
  issues_found: ["Raw read failure diagnostic fixed with additional RED/GREEN", "Two workflow diagram fixtures inherit read-only source mode; verified in byte-identical snapshot"]
criteria_results:
  - {criterion: AC-MR-001, result: PASS, evidence: "Both Git containment files: denial counters for siblings/traversal/link escapes/chains/loops plus canonical positives"}
  - {criterion: AC-MR-002, result: PASS, evidence: "GitHub local initialization, missing-parent policy, no outside writes, post-mkdir retarget test; GitLab missing directory rejection"}
  - {criterion: AC-MR-003, result: PASS, evidence: "Session view/context denial tests count zero transcript opens and zero cass launches; contained file alias positive"}
  - {criterion: AC-MR-004, result: PASS, evidence: "Workspace alias/history/..notes positives and escape/dangling/file-parent/missing-root/type/EACCES negatives"}
  - {criterion: AC-MR-005, result: PASS, evidence: "Mixed records for list/search/three related groups; actual workspace, conflicting index metadata, cursor continuation and ten-page cap"}
  - {criterion: AC-MR-006, result: PASS, evidence: "82 total package tests; existing local Git/parser/sanitizer controls; entrypoint/schema/dependency bytes unchanged"}
  - {criterion: AC-MR-007, result: PASS, evidence: "Fault injection and filesystem negatives; bounded messages omit PRIVATE_SENTINEL"}
  - {criterion: AC-MR-008, result: PASS, evidence: "Canonical child/read paths, retarget between calls, mkdir revalidation; README states non-atomic limitation"}
  - {criterion: AC-MR-009, result: PASS, evidence: "Temporary JSONL/link fixtures; stub child counters; local Git children limited to 10 seconds, isolated config/credentials/file transport; native Windows NOT RUN"}
  - {criterion: AC-MR-010, result: PASS, evidence: "RED/GREEN logs, 50 workflow test files, syntax/static/security/UTF-8/workflow checks and disclosed tool/platform limits"}
test_evidence:
  unit_test: ["evidence/github-push-green.log: 25 pass", "evidence/gitlab-green.log: 22 pass", "evidence/session-search-green.log: 35 pass", "evidence/workflow-unit-snapshot.log: 50 files pass"]
  integration_test: ["Three package GREEN logs include physical temporary fixtures and isolated local Git"]
  database_test: []
  feature_test: ["Counted Git/cass/open denial cases and mixed-index filtering in containment tests"]
commands_run:
  - "npm --prefix mcp/github-push run check"
  - "npm --prefix mcp/gitlab run check"
  - "npm --prefix mcp/session-search run check"
  - "npm run validate:workflow:unit (worktree, then byte-identical disposable snapshot)"
  - "node --check on nine changed/new JS files; package checks also parse unchanged entrypoints"
  - "npm run validate:workflow:pack-audit"
  - "wfc naming/governance/exec/plan/protocol; UTF-8 strict decoding and diff whitespace checks"
  - "Signed-host/source preservation and targeted static/security audit: evidence/static-audit.json"
skipped_checks: ["Native Windows unavailable; required before Windows rollout", "ESLint/Semgrep unavailable: manual targeted static/security review, no general SAST claim", "Existing optional diagram renderer integration unprovisioned", "No live rollout or performance benchmark in scope"]
release_blockers: []
status: PASS
gaps: []
residual_risks: ["Non-atomic checks assume trusted filesystem writers and configured binaries", "Native Windows not validated", "General SAST unavailable", "No live rollout"]
recommendation: "Verify the trusted QC receipt and close protocol; retain branch pending a separate merge decision."
notes_for_review: "Human QC accepts this bounded technical evidence and disclosed tool/platform limits. Other security findings and merge remain separate."
```

## Verification Environment

All 82 package tests pass on macOS. The first workflow suite run passed 48 files; two unrelated
diagram fixture tests failed EACCES because `fs.cpSync` preserved protected source mode 0444.
A disposable snapshot copied 1,211 tracked/new-test files byte-for-byte, restored normal Git checkout
modes only in the snapshot, and supplied a local Git index. All 50 registered workflow test files then
passed. Worktree protections were not relaxed. Staged whitespace checks pass for all twelve MCP paths.
The full staged check reports only verbatim test-output whitespace and pre-existing/generated
blank EOF lines in s01/s02/s03/s05; those evidence/approved bytes were preserved. The snapshot manifest digest and source hashes are
recorded in `evidence/verification.json` and `evidence/static-audit.json`.

Directory fixtures select Windows junctions, but there is no native Windows result. File symlinks
require appropriate Windows privileges. This is a stated platform limit under the approved card;
Windows rollout requires a separate native validation. Existing optional renderer integration was
not provisioned. These results do not claim live MCP installation, remote Git operations or a benchmark.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Five readiness signatures valid and current-host-bound", "Approved card and s04/s05/s06 unchanged", "Only twelve approved source/test/README paths changed", "TDD and targeted two-tier review", "Cancelled intake preserved as history", "No delegation, dependency or live rollout"]
blocking_items: []
owner: qc
next_action: "Verify the trusted QC receipt, then close the work item through the canonical CLI."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: ["Approved policy narrows unresolved/outside/contradictory inputs and stale index results", "Path values may use canonical spelling"]
rollback_readiness: READY
```

Tool names, input schemas and output field names are unchanged. The existing sync resolver signatures
remain intact. Missing creation/history suffixes follow the signed ancestor policy. Revert the three
core modules to base `05fe8d6` for source rollback, explicitly restoring SEC-002 exposure; there was
no deployment, data migration or dependency change to undo.

## Scan Summary
```yaml
scan_target: "Three MCP cores and six test files"
scan_scope: {mode: DIFF_ONLY, affected_modules: [github-push, gitlab, session-search]}
language_stack: [JavaScript]
available_scan_tools: ["node --check", "Package node:test scripts", "Source/hash audit and manual diff review"]
false_positive_policy: "Evidence-based, scoped to the signed threat model; no broad scanner claim."
syntax_scan_results:
  - {command: "node --check", status: PASS, evidence: "evidence/static-audit.json: nine JS files; package checks also parse entrypoints"}
static_analysis_results:
  - {command: "Targeted call-site and diff inspection", status: PASS, findings: [], evidence: "s07 two-tier review and static-audit.json"}
security_scan_results:
  - {command_or_check: "Physical boundaries, side-effect counters, metadata consistency and error privacy", status: PASS, findings: [], evidence: "Containment tests and reviewed source"}
performance_heuristic_results:
  - {check: "Per-operation and per-result filesystem work", status: PASS, confidence: MEDIUM, expected_impact: "Additional synchronous stat/realpath checks and up to twenty transcript lines per candidate; existing request page/limit caps retained; no extra child or dependency. Not benchmarked."}
skipped_scans: ["ESLint and Semgrep absent; manual targeted static/security review used", "No performance benchmark"]
overall_status: PASS
remediation_actions: []
notes_for_verify: "No unresolved in-scope implementation finding. Concurrent hostile filesystem writers, hard links, repository metadata/hooks/config and hostile binary/index remain excluded by the signed card."
```

## Spec Coverage
```yaml
coverage:
  - id: COV-MR-001
    requirement: REQ-MR-001
    status: PASS
    evidence: "AC-MR-001,002,007; Git containment/creation and bounded error tests"
  - id: COV-MR-002
    requirement: REQ-MR-002
    status: PASS
    evidence: "AC-MR-003,004,005; session/workspace and mixed-index tests"
  - id: COV-MR-003
    requirement: REQ-MR-003
    status: PASS
    evidence: "AC-MR-006,008,009,010; compatibility, isolation, reviews and full verification"
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["Developer tooling fix; human QC DoD applies"]
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No release, live MCP install or merge in this approved work item"]
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No separate business gate in approved packet"]
```

## Audit
```yaml
audit_scope: "Bounded SEC-002 implementation and workflow compatibility"
checks:
  - {id: mechanical_pack, status: PASS, evidence: "evidence/pack-audit.log"}
  - {id: source_boundary, status: PASS, evidence: "evidence/static-audit.json: 1201 other readiness-pinned files unchanged, including cancelled intake"}
  - {id: traceability, status: PASS, evidence: "REQ-MR-001..003 -> AC-MR-001..010 -> T1..T4 -> core/test diffs -> s08"}
findings: []
overall_status: PASS
follow_up_actions: ["Verify trusted QC receipt and close protocol", "Separate merge/rollout decision", "Native Windows verification before Windows rollout"]
notes: "Mechanical checks do not replace human approval."
```

## Definition of Done
```yaml
work_item_slug: mcp-root-containment
status: DONE
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: []
residual_risks: ["Trusted filesystem assumption", "Native Windows not run", "General SAST unavailable", "No live rollout"]
follow_up_items: ["Separate merge/rollout decision", "Native Windows verification"]
next_action: "Confirm the matching trusted QC signature before protocol closure."
```

## Traceability
```yaml
upstream: ["mcp-root-containment.s07.implementation.md", "product-specs/cards/mcp-root-containment.md"]
next_step: "Verify trusted QC receipt, then protocol closure; merge/rollout remain separate decisions"
```

## Handoff
- Technical result: PASS within the approved scope and disclosed limits; human QC review recorded; receipt must match this exact host before closure.
- Branch: fix/mcp-physical-root-containment, retained for QC review.
- No merge, remote push or live rollout has run.
