---
artifact_id: "ci-guardrails-parallelisation.s08.verification"
artifact_family: workflow-step
work_item_slug: "ci-guardrails-parallelisation"
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
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/ci-guardrails-parallelisation.md"
spec_status: verified
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: []
  dor: []
  approach: []
  task_plan: []
  dod: ["qc"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
  - "ci-guardrails-parallelisation.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Technical verification PASS for AC-001..006. Candidate run succeeds in 92s; both deliberate validator failures appear in one probe and downstream jobs skip. Zero Node deprecation annotations; ten Ubuntu image migration notices remain disclosed. Scan PARTIAL because actionlint/static security tooling is unavailable. Human QC DoD is pending; no merge, release or cleanup is authorized.

## Step Contract
```yaml
step_goal: "Verify the accepted CI scheduling amendment against six unchanged ACs and prepare human QC handoff."
input_summary: ["Approved Spec/s04", "Resealed s06 T1-R..T4-R", "s07 structural RED/GREEN and ordered review"]
output_summary: ["Hosted green and double-failure evidence", "Timing and annotations", "Criteria coverage and limitations"]
done_when: ["Each AC has concrete evidence", "Probe changes stay out of candidate", "Human DoD boundary preserved"]
owner: qc
```

## Main Artifact
```yaml
verification_target: "Workflow Guardrails six-validator matrix"
risk_ranked_test_matrix:
  - {risk: "One validator failure cancels or hides others", severity: HIGH, required_evidence: ["Hosted double-failure probe"]}
  - {risk: "Downstream artifact jobs start too early", severity: HIGH, required_evidence: ["Green timestamps", "Failure-run skipped jobs", "Unchanged artifact job bytes"]}
  - {risk: "Validator omitted or command drift", severity: MEDIUM, required_evidence: ["Six exact command comparison", "Local six-command PASS"]}
  - {risk: "Performance claim lacks measured improvement", severity: MEDIUM, required_evidence: ["92s hosted duration against unchanged 105s threshold"]}
test_strategy:
  unit_test: {required: false, rationale: "No production function changes; existing hosted candidate jobs retain the unit/regression suite."}
  integration_test: {required: true, rationale: "Run the six actual validator commands and compare workflow structure."}
  database_test: {required: false, rationale: "No database changes."}
  feature_test: {required: true, rationale: "Real GitHub Actions green/failure runs prove scheduling and gating."}
negative_cases: ["Pre-edit structural assertion fails for absent matrix", "Missing Governance Checks in valid fixture", "Missing referenced SRS in sample SDD", "Dependent jobs must skip when validators fail"]
regression_targets: ["Six original commands and arguments", "Authoring smoke steps", "Build-once candidate and Node 18/22 consumers", "Triggers/permissions/timeouts"]
manual_exploration:
  flows_checked: ["Diff scope", "All job timestamps and conclusions", "All ten check-run annotation lists", "SDD metadata inconsistency cross-check"]
  issues_found: ["Green SDD job/check status field says in_progress despite success/completed_at and all steps completed; recorded as API metadata inconsistency."]
criteria_results:
  - {criterion: AC-001, result: PASS, evidence: "Run 39368831066 has Fixtures and SDD failure; other four validators success."}
  - {criterion: AC-002, result: PASS, evidence: "Run 39261539913 duration 92s, strictly below historical 105s; 13s/12.4% reduction. Current 158s comparison improves 66s/41.8%."}
  - {criterion: AC-003, result: PASS, evidence: "Green run succeeds; all 10 annotation lists checked, zero Node deprecation annotations. Ten Ubuntu image migration notices are unrelated and disclosed."}
  - {criterion: AC-004, result: PASS, evidence: "Green timestamps respect validator -> smoke -> build -> consumers; failure probe skips smoke/build/consumer job."}
  - {criterion: AC-005, result: PASS, evidence: "Six matrix entries share one checkout/setup-node template; downstream setup remains outside that validator contract."}
  - {criterion: AC-006, result: PASS, evidence: "Structural comparison proves all six exact npm command/argument strings; unchanged in fault-injection probe."}
test_evidence:
  unit_test: ["Existing unit/regression steps remain in successful Node 18/22 candidate jobs; no separate new unit-test claim."]
  integration_test: ["Six local npm validator commands exit 0", "YAML/structural RED then GREEN", "Two probe local commands exit 1 for intended errors"]
  database_test: []
  feature_test: ["GitHub candidate success 39261539913", "GitHub controlled failure 39368831066"]
commands_run: ["Six original npm validator commands", "Scratch verify-structure.cjs", "gh workflow run / gh run view / gh api jobs and check annotations", "git diff --check", "Strict UTF-8 decoding"]
skipped_checks: ["actionlint unavailable; existing js-yaml parser, bounded structural assertions and actual hosted execution used.", "Dedicated static security scanner unavailable; manual scope/input review only.", "No separate build/type/database/container test needed for this YAML-only production delta."]
release_blockers: []
status: PASS
gaps: []
residual_risks: ["Single green timing observation; queue/image changes may alter future duration.", "ubuntu-latest migration notices present; runner image was not changed in this scope.", "API status inconsistency disclosed; success and completed step/timestamp evidence retained."]
recommendation: "Accept bounded CI change at human QC DoD; retain candidate/probe branches until separately authorized integration/cleanup."
notes_for_review: "Hosted failure is intentional evidence, not a defect in candidate. No merge/release approval is inferred."
```

## Hosted Evidence

Candidate branch `docs/ci-guardrails-resumption`, source `80bc20be002837b84b78ae064f1266e166ed2fc8`:
[green run 39261539913](https://github.com/haonh87/Code-Factory/actions/runs/39261539913), workflow_dispatch, run status completed, conclusion success. Run timestamps `2026-10-19T13:36:02Z` to `13:37:34Z` give **92s** using the same started/updated definition as the 158s current baseline. The unchanged approved 105s threshold passes. This is one observation, not a benchmark distribution or guarantee.

All six validator conclusions are success. The latest validator completion is `13:36:15Z`; authoring smoke starts `13:36:18Z`, completes `13:36:30Z`; candidate build starts `13:36:33Z`, completes `13:36:42Z`; both consumers start after build completion and complete successfully by `13:37:33Z`. Thus artifact consumers never run ahead of their required validators/build.

All ten check-run annotation lists were fetched and counts matched their reported annotation_count. Each contains one notice about the ubuntu-latest image migration. **Zero Node deprecation annotations** were found; this does not claim zero annotations overall.

GitHub returned `status=in_progress` for the SDD job/check while also reporting `conclusion=success`, `completed_at=2026-10-19T13:36:12Z`, all seven steps completed/success, and overall run completed/success. The validator step ended at `13:36:10Z`. The inconsistency is preserved in raw JSON rather than silently rewritten; completion conclusion is supported by step evidence, completion timestamp and downstream execution.

Probe branch `test/ci-guardrails-double-failure`, source `e453f13f3868492d565c532db48c62a2438545ab`:
[controlled-failure run 39368831066](https://github.com/haonh87/Code-Factory/actions/runs/39368831066), overall completed/failure as expected. Fixtures fails at `2026-10-20T04:18:04Z`; SDD fails at `04:18:06Z`; Planning, Execution, Changes and Artifacts all complete/success. Authoring smoke, build and the unexpanded release-consumer job are skipped. The probe changes only the two approved fixture inputs; its YAML is identical to candidate. Local reproduction confirmed the missing Governance Checks error and missing referenced SRS error before publication. The two-file fault commit is not part of the candidate branch.

Supporting raw evidence: `/private/tmp/cf-ci-verify-20261019/{baseline.yml,verify-structure.cjs,T3-red.log,local-*.log,probe-local-*.log,green-run.json,green-jobs.json,green-checks-and-annotations.json,probe-run.json,probe-jobs.json}`. This note retains conclusions, source identities and permanent hosted links without depending on scratch retention.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - {check: "Admission", status: PASS, evidence: "Two new gate signatures and two signed Maintainer dispositions verified before canonical CLI resume."}
  - {check: "Exception", status: PASS, evidence: "GOV-EX-002 RESOLVED after accepted conditions; no criteria waived."}
  - {check: "Scope", status: PASS, evidence: "Only validator blocks and authoring dependency changed; probe inputs isolated; no merge/release/settings/cleanup."}
  - {check: "Completion authority", status: PASS, evidence: "Human DoD remains pending, reviewer fields empty."}
blocking_items: ["Separate human QC DoD required before DONE."]
owner: qc
next_action: "Review this concrete s08 packet for DoD."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
notes: ["All six commands unchanged", "Candidate build/consumer bytes unchanged", "Current rulesets zero; last protection check reported unprotected", "Check names change to Validate (...); recheck rules before integration", "Revert isolated workflow change if needed"]
```

## Spec Coverage
```yaml
coverage:
  - id: AC-001
    requirement_refs: ["REQ-001"]
    task_refs: ["T3-R", "T4-R"]
    status: PASS
    evidence: "Two failures plus four successes in run 39368831066."
  - id: AC-002
    requirement_refs: ["REQ-001"]
    task_refs: ["T1-R", "T4-R"]
    status: PASS
    evidence: "92s < 105s; no threshold relaxation."
  - id: AC-003
    requirement_refs: ["REQ-002"]
    task_refs: ["T2-R", "T4-R"]
    status: PASS
    evidence: "Inherited v7 actions and new successful run with zero Node deprecation annotations."
  - id: AC-004
    requirement_refs: ["REQ-003"]
    task_refs: ["T3-R", "T4-R"]
    status: PASS
    evidence: "Green timestamps and probe skipped downstream jobs."
  - id: AC-005
    requirement_refs: ["REQ-004"]
    task_refs: ["T3-R"]
    status: PASS
    evidence: "Single validator setup template for six entries."
  - id: AC-006
    requirement_refs: ["REQ-001"]
    task_refs: ["T3-R", "T4-R"]
    status: PASS
    evidence: "Exact command/arguments comparison; probe changes inputs only."
summary: {total: 6, pass: 6, fail: 0, partial: 0, untested: 0}
status: PASS
```

## Scan Summary
```yaml
scan_target: ".github/workflows/workflow-guardrails.yml diff"
scan_scope: {mode: DIFF_ONLY, changed_files: [".github/workflows/workflow-guardrails.yml"], affected_modules: ["CI validator scheduling"]}
language_stack: ["GitHub Actions YAML"]
available_scan_tools: ["Existing js-yaml", "Scratch structural assertions", "git diff --check", "Hosted GitHub workflow execution"]
false_positive_policy: "Diff-aware, evidence-based, dismiss only with reason"
scan_plan:
  syntax: ["Parse YAML and execute hosted workflow"]
  static_analysis: ["Structural contract assertions", "Check actionlint availability"]
  security: ["Review matrix inputs, commands and unchanged permissions"]
  performance_heuristic: ["Compare actual run durations; disclose sample size"]
syntax_scan_results:
  - {command: "js-yaml load + hosted execution", scope: ["workflow YAML"], status: PASS, evidence: "YAML parsed; hosted jobs executed", blocker_files: []}
static_analysis_results:
  - {command: "verify-structure.cjs", config_used: "Baseline exact command/downstream comparison", scope: ["workflow YAML"], status: PASS, findings: [], new_blockers: []}
  - {command: "actionlint availability", config_used: "Not installed", scope: ["workflow YAML"], status: SKIP, findings: [], new_blockers: []}
security_scan_results:
  - {command_or_check: "Dedicated static security scan", scope: ["workflow diff"], status: SKIP, findings: []}
performance_heuristic_results:
  - {check: "Independent matrix scheduling", scope: ["six validators"], status: PASS, expected_impact: LOW, confidence: MEDIUM, trigger_condition: "Every Workflow Guardrails run", evidence: "One observed run improves 105s to 92s; no distribution or future guarantee claimed."}
skipped_scans: ["actionlint and dedicated static security tooling unavailable; no new dependency installed."]
overall_status: PARTIAL
remediation_actions: []
notes_for_verify: "Manual review: commands are fixed repository literals; no user/PR metadata interpolation, secret access, permission widening or continue-on-error. Hosted/structural checks supplement but do not replace a dedicated scanner."
```

## Review Findings

Early s07 Spec Compliance PASS preceded Code Quality PASS. Final review preserves the same conclusions: accepted delta only, unchanged thresholds/contracts, isolated probe, and no hidden failure or annotation. These are agent review findings, not human DoD approval.

## Audit
```yaml
step: s08
status: PASS
checks:
  - {criterion: "All six ACs evidenced", result: PASS, evidence: "Coverage 6/6 PASS; two hosted runs and local checks."}
  - {criterion: "Probe excluded from candidate", result: PASS, evidence: "Separate e453f13 branch; candidate 80bc20b retains original fixture inputs."}
  - {criterion: "Human completion boundary preserved", result: PASS, evidence: "DoD PARTIAL, no human reviewer fabricated."}
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "No fixed deadline in accepted amendment; resumed across sessions."
gaps: []
risk_level: LOW
next_action: "Human QC DoD review."
```

## Definition of Done
```yaml
work_item_slug: ci-guardrails-parallelisation
status: PARTIAL
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: ["Human QC DoD decision and trusted signature pending."]
residual_risks: ["Single timing sample", "Ubuntu migration notices", "API metadata inconsistency", "No dedicated actionlint/security scan"]
follow_up_items: ["Retain branches/worktrees; integration and cleanup are separate decisions."]
next_action: "Obtain human QC DoD on this verified packet."
```

## SDD Traceability
```yaml
requirement_refs: ["REQ-001", "REQ-002", "REQ-003", "REQ-004"]
acceptance_refs: ["AC-001", "AC-002", "AC-003", "AC-004", "AC-005", "AC-006"]
task_refs: ["T1-R", "T2-R", "T3-R", "T4-R"]
test_refs: ["verify-structure.cjs", "six npm validator commands", "39261539913", "39368831066"]
```

## Final Validation and Protocol

Downloaded hosted logs confirm SDD validated 57 notes, and **47 workflow-bundle unit test files passed on both Node 18 and Node 22**. Failed-job logs confirm the exact intended fixture and missing-SRS failures. These corroborate the API conclusions and preserve the disclosed SDD metadata inconsistency.

Scoped naming/governance, SDD, planning and execution passed for all five child notes. Structural/YAML/command-preservation checks, strict UTF-8 and whitespace checks passed. Candidate fixture inputs are byte-identical to the main baseline; no fault injection entered the candidate. Canonical/worktree workflow hosts match. The normal CLI has recorded VERIFIED/s08 at its canonical location; human QC DoD remains pending.

## Handoff

Technical PASS, scan PARTIAL with justified limitations, human DoD pending. Candidate and probe are pushed under the accepted authorization; no PR merge, release, branch deletion or worktree cleanup occurred. Diagram-adapter readiness and parent-audit completion remain separate work; this CI verification does not close them.
