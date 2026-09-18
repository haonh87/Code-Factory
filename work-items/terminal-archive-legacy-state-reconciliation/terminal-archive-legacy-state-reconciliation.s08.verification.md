---
artifact_id: "terminal-archive-legacy-state-reconciliation.s08.verification"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
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
change_id: "CR-009"
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
  - "po"
  - "ba"
  - "sa"
  - "ta"
  - "developer"
  - "qc"
review_mode: independent
verification_owner: "qc"
artifact_shape: adaptive_v1
request_lane: product_delivery
workflow_required: true
routing_reasons:
  - "LANE_PRODUCT_DELIVERY"
escalation_reasons:
  - "HARD_PUBLIC_CONTRACT"
role_reasons:
  po:
    - "ROLE_PO_PRODUCT_OUTCOME"
  ba:
    - "ROLE_BA_REQUIREMENTS"
  sa:
    - "ROLE_SA_PUBLIC_CONTRACT_BOUNDARY"
  ta:
    - "ROLE_TA_PUBLIC_CONTRACT_RISK"
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
  source_version: "2.6.2"
  installed_versions:
    - "2.6.2"
    - "2.6.2"
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
  - "terminal-archive-legacy-state-reconciliation.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> PARTIAL local evidence for the refreshed CR-009 diff: revised T8a Option A has a matching Task Plan receipt, authoring smoke passes 13/13, and a clean mirror of the same reviewed implementation diff passes the full 45/45 bundle unit suite. QC approved Spec Compliance and closed F-TAR-S08-001, then Developer/QC accepted Code Quality and QC confirmed handoff completeness and opened s08. The user separately authorized a candidate commit/push for hosted CI, not merge or release. No immutable hosted candidate exists yet; Technical Verification and DoD are not approved.

## Step Contract
```yaml
step: s08
goal: "Provide reproducible, candidate-bound evidence for QC to decide CR-009 Technical Verification and DoD without changing live CR-008 state."
value: "A defensible verdict on exact-state disposition, historical compatibility, and terminal safety."
scope_in:
  - "Verify Spec Card AC-TAR-01..10 against the reviewed CR-009 implementation and negative cases."
  - "Run the approved full Node, workflow, planning, protocol, pack, syntax, text-encoding, and diff-scope checks."
  - "Assess static/security scan gaps, performance heuristics, brownfield compatibility, and candidate-binding limits."
scope_out:
  - "Live CR-008 state disposition, release/tag/publish, merge, worktree cleanup, and historical evidence rewrite."
  - "Self-approval of Technical Verification, DoD, Business Acceptance, or a governance waiver."
inputs_required:
  - "Historical QC-approved T8 handoff on diff 69e69c57… and the revised T8a Option A Task Plan receipt matching s06 SHA-256 e705c1b05fbe47686f3c2a0b859998ca32b959bc49819817c6fa8c55ef4beb86."
  - "Approved Spec Card AC-TAR-01..10, approved s06 plan, and current s07 implementation evidence; both review tiers passed in order and QC confirmed T8a/T6 handoff completeness and opened s08 for the unchanged diff."
  - "Current worktree and protocol state for terminal-archive-legacy-state-reconciliation."
outputs_required:
  - "One s08 note with AC results, test evidence, four-lane scan summary, governance and brownfield compatibility, and explicit gaps."
  - "Separate proposals for QC Technical Verification and DoD, with exact candidate identity and residual-risk owners."
done_when:
  - "All AC-TAR-01..10 have reproducible pass/fail/partial evidence against the same candidate."
  - "Negative cases, regression targets, corpus compatibility, scope boundaries, and changed-text encoding are checked."
  - "Every skipped scanner or uncommitted-candidate gap has an owner and a decision path."
  - "QC separately reviews Technical Verification before any DoD verdict is requested."
constraints:
  hard_constraints:
    - "No live CR-008 or published v2.6.2 artifact mutation."
    - "No interpretation of display text as state identity or approval."
    - "No AI-issued Technical Verification, DoD, Business Acceptance, or release approval."
  soft_constraints:
    - "Use the existing Node wrappers and canonical s08 note; avoid duplicate evidence files."
  prohibited_actions:
    - "Do not run the protocol verify transition as a substitute for QC Technical Verification approval."
    - "The evidence-authoring approval alone did not authorize a commit; the user separately accepted a candidate commit/push for hosted CI. Do not merge, tag, publish, or clean the worktree under either approval."
  compliance_checks:
    - "Inspect git scope and compare the reviewed diff hash before and after verification."
    - "Keep protocol state and gate verdicts distinct from local test results."
    - "Inspect text-selection, signer, lock, and atomic-write paths in the changed diff."
risks:
  - id: R-TAR-S08-01
    description: "An uncommitted local diff is mistaken for an immutable hosted candidate."
    likelihood: HIGH
    impact: HIGH
    severity: HIGH
    mitigation: "Label the diff hash as local review identity; require later source/hosted artifact binding before final DoD."
    contingency: "Keep the verdict PARTIAL and do not seal DoD until binding is complete."
    owner: developer
    status: OPEN
  - id: R-TAR-S08-02
    description: "Unavailable local eslint or semgrep leaves a static/security scan gap."
    likelihood: HIGH
    impact: MEDIUM
    severity: HIGH
    mitigation: "Run syntax, targeted manual security review, and negative authorization tests; present the residual gap to QC for hosted scan or explicit risk decision."
    contingency: "Keep Technical Verification or DoD pending if QC requires deterministic scanning."
    owner: qc
    status: OPEN
timebox:
  target_duration: "One evidence refresh and QC review cycle for the current local diff."
  deadline: ""
  escalation_rule: "Return to s07 and reopen the relevant review if code or contract changes during verification."
```

## Main Artifact
```yaml
verification_target: "CR-009 QC-reviewed local implementation diff SHA-256 fc86c3f150d89688faa98795a2b3cea22690fb001532346e6c2366987c49257a on source HEAD f49a402696435796ef1a1a7c0ee465e5d45adab4; QC opened s08 evidence authoring, but this is not an immutable hosted candidate."
risk_ranked_test_matrix:
  - risk: "Active blockers could be silently removed or an archive could falsely succeed."
    severity: HIGH
    required_evidence: ["raw/legacy/typed blocker archive refusal", "byte-identical report and s01 after failed archive", "copied CR-008 parent path"]
  - risk: "A stale or ambiguous selection, role-only claim, or failed write could remove the wrong entry."
    severity: HIGH
    required_evidence: ["snapshot-bound state IDs", "trusted Maintainer signer negatives", "exactly one history record", "failure injection, retry, and shared-lock tests"]
  - risk: "Legacy reports could be rewritten or rejected during the upgrade."
    severity: HIGH
    required_evidence: ["14-report read-only corpus", "exact raw text/shape preservation", "validator and workflow protocol checks"]
  - risk: "Implementation or evidence could drift outside CR-009 scope."
    severity: MEDIUM
    required_evidence: ["reviewed diff hash", "changed-path and UTF-8 checks", "read-only live parent inspection"]
test_strategy:
  unit_test:
    required: true
    rationale: "Exact state selection, signer, lock, atomic writer, and validator behavior are concentrated in Node helpers."
  integration_test:
    required: true
    rationale: "CLI, materializer, gate writer, and copied-parent transitions must agree on the same report contract."
  database_test:
    required: false
    rationale: "The work item has no database; the JSON report is covered by file-system atomicity and corpus tests."
  feature_test:
    required: true
    rationale: "The end-to-end copied CR-008 two-disposition-then-archive flow is the user-visible behavior."
negative_cases:
  - "Archive with raw-string, legacy-object, or typed active blocker refuses without changing report or s01."
  - "Unknown, stale, malformed, or ambiguous state_id and duplicate text cannot select another entry."
  - "Role-only, missing key/passphrase, wrong passphrase, tampered signature, or unauthorized fixture intent refuses mutation."
  - "Conflicting operation_id reuse, injected write failures, and competing writers cannot create a partial history transition."
  - "Malformed history, duplicate operation_id, and changed original text/signature fail protocol validation."
regression_targets:
  - "Existing work-item lifecycle and ready/closeout gate writers."
  - "Materializer report replacement and s01 projection refresh."
  - "All tracked legacy protocol reports and workflow-pack/runtime parity."
manual_exploration:
  flows_checked:
    - "Read-only wfc status of live adaptive-governance-human-approval-ux: ARCHIVED, two active blockers, zero required actions, two distinct disposition targets, zero history records."
    - "Parent report SHA-256 stayed 64f67605beab120ffa4fffe8407fc5e9c900d04c5d6727c3ecddf8ebabf785cc before and after status."
    - "Changed-area review of exact selectors, signer, shared lock, staged fsync/rename writer, archive guard, and transition clearing."
    - "Authoring smoke first reproduced the legacy block/resume failure; revised T8a now proves premature resume refusal, one signed exact-ID fixture disposition, and successful resume."
    - "Parent report SHA-256 remains 64f67605beab120ffa4fffe8407fc5e9c900d04c5d6727c3ecddf8ebabf785cc after the current local checks."
    - "QC confirmed refreshed T8a/T6 handoff completeness and opened s08 evidence authoring in conversation, recorded 2026-09-18T02:47:47Z for the unchanged local implementation diff SHA-256 fc86c3f150d89688faa98795a2b3cea22690fb001532346e6c2366987c49257a."
    - "The user accepted the immediately preceding, limited recommendation to commit/push the reviewed CR-009 candidate for hosted CI; recorded 2026-09-18T03:28:49Z. This does not authorize merge, release, tag, live CR-008 disposition, Technical Verification, or DoD."
    - "A direct worktree unit run hit an ignored generated-runtime duplicate support-policy inventory; the two extra 'workflow-artifact-naming 2.md' files are byte-identical to canonical source, ignored by Git, and outside approved CR-009 write roots. No source or generated-runtime file was deleted or edited."
  issues_found:
    - "Historical F-TAR-S08-001: the old smoke fixture assumed resume silently cleared an active blocker. Repaired by signed exact-ID disposition and closed by QC after refreshed Spec Compliance on the matching diff."
    - "T8a smoke exposed an activation regression: approved materializer-owned change/gate actions survived trusted receipts. A focused red/green T6 test and exact-ID cleanup now pass; Developer/QC accepted Code Quality on the matching diff."
criteria_results:
  - criterion: AC-TAR-01
    result: PASS
    evidence: "work-item-protocol.test.js copied-parent raw/legacy/typed blocker refusal and byte-unchanged failure cases; full suite PASS."
  - criterion: AC-TAR-02
    result: PASS
    evidence: "Status and state tests cover distinct snapshot/collection/position-bound IDs, equal-text entries, and stale/unknown/ambiguous rejection."
  - criterion: AC-TAR-03
    result: PASS
    evidence: "CLI and signer tests cover one signed Maintainer disposition, actor/reason/time/history, and role-only/key/passphrase negatives."
  - criterion: AC-TAR-04
    result: PASS
    evidence: "State selector tests and the new activation regression test use state_id/kind/gate or stable materializer IDs; same-gate different-ID and unrelated actions survive. Display text is not used for core transition selection."
  - criterion: AC-TAR-05
    result: PASS
    evidence: "Equal-text raw survivor test and 14-report corpus preserve original legacy text and untouched entry shape."
  - criterion: AC-TAR-06
    result: PASS
    evidence: "CLI identical operation_id retry is NOOP with one history record and projection repair; conflicting reuse rejects."
  - criterion: AC-TAR-07
    result: PASS
    evidence: "Atomic writer failure points, shared CLI/gate/materializer lock, snapshot guard, and post-commit projection retry tests PASS."
  - criterion: AC-TAR-08
    result: PASS
    evidence: "All 14 tracked governed reports load without migration, preserve exact legacy text, and protocol validation passes."
  - criterion: AC-TAR-09
    result: PASS
    evidence: "Copied parent retains two blockers until two explicit dispositions, then archives; live parent was only read."
  - criterion: AC-TAR-10
    result: PASS
    evidence: "23 modified tracked paths plus one untracked approved Spec Card, all within CR-009 authoring or approved implementation roots; no live parent, v2.6.2, tag, receipt, or cleanup mutation."
test_evidence:
  unit_test:
    - "Historical npm run validate:workflow:unit: 45/45 workflow-bundle test files PASS; pre-hook runtime build PASS."
    - "Earlier direct node packages/workflow-bundle/test/run-all.js: 45/45 test files PASS after QC opened s08. A later direct worktree rerun yielded 44/45 solely because two ignored, duplicate generated support-policy files made runtime inventory parity fail."
    - "Fresh temporary mirror of the same implementation diff fc86c3f1…: npm run validate:workflow:unit rebuilt its own runtime and passed all 45/45 test files, including Codex/Claude canonical/runtime parity; the source worktree's generated runtime was not changed."
  integration_test:
    - "CLI lifecycle, gate-review, materializer, trusted-approval, validator, workflow naming/governance, planning, and protocol suites PASS."
    - "Current authoring smoke PASS 13/13: premature resume refuses without report mutation, signed exact-ID fixture disposition preserves the original entry in history, then resume succeeds."
    - "Historical authoring smoke FAIL at materialize-auto-scaffold before T8a: Cannot resume add-google-oauth-login with active blockers (F-TAR-S08-001); the failure is repaired and QC closed the finding."
    - "Activation regression red/green test: approved materializer-owned gate action removed by exact ID; same-gate different-ID and unrelated actions retained."
    - "Execution validator initially rejected review_mode=targeted in s07/s08; metadata corrected to independent, then 214 notes PASS."
    - "Bundle smoke initially hit sandbox EACCES; approved unsandboxed rerun PASS, so this was an environment limit, not a candidate failure."
    - "Current source worktree bundle smoke PASS. In the clean mirror, bundle smoke raced a simultaneous self-pack runtime rebuild and first failed; the sequential rerun passed. The hosted jobs use isolated workspaces; do not count the raced attempt as a candidate verdict."
    - "Historical T8a blocker-free trial failed: block requires at least one --blocker; the trial edit was reverted before the signed-disposition plan."
  database_test: []
  feature_test:
    - "Copied CR-008 parent two-disposition-then-archive test PASS; live parent status was read-only."
commands_run:
  - "Historical direct unit suite 45/45 PASS; latest source-worktree direct suite 44/45 because ignored generated-runtime duplicate files affected only inventory parity. Clean mirror of exact implementation diff fc86c3f1…: npm run validate:workflow:unit rebuilt runtime and passed 45/45."
  - "npm run validate:workflow -- --workflow-root work-items/terminal-archive-legacy-state-reconciliation --project-root ."
  - "npm run validate:workflow:planning -- --workflow-root work-items/terminal-archive-legacy-state-reconciliation --project-root ."
  - "npm run validate:workflow:protocol -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:pack-audit"
  - "npm run validate:workflow:fixtures (10 expected outcomes PASS)"
  - "npm run validate:workflow:sdd -- --workflow-root work-items --project-root . (46 notes PASS)"
  - "npm run validate:workflow:change -- --workflow-root work-items --project-root . (50 notes PASS; legacy CHANGE-002 warnings)"
  - "npm run validate:workflow:execution -- --workflow-root work-items (214 notes PASS after frontmatter correction)"
  - "Historical npm run validate:workflow:authoring-smoke FAIL; current rerun PASS 13/13 after signed fixture disposition and activation cleanup"
  - "npm run validate:workflow:bundle-smoke (sandbox EACCES, then unsandboxed PASS)"
  - "npm run validate:workflow:release-candidate (local self-pack PASS; not hosted candidate binding)"
  - "Local self-pack on this evidence refresh produced tarball SHA-256 c7707703286d58b78bd07c35d66f7614a07bbc78a925eddaf7e9463f6d8007e6; this ephemeral local output is not a hosted candidate identity."
  - "Clean mirror: bundle-smoke PASS on sequential rerun and release-candidate self-pack PASS, with Codex/Claude global/project smoke 4/4; the initial parallel invocation raced a runtime rebuild."
  - "node --check on 12 changed JavaScript files; iconv UTF-8 on 11 tracked changed text files plus the untracked Spec Card; git diff --check"
  - "wfc work-item status on live CR-008 parent (read-only) with before/after report SHA-256 comparison"
skipped_checks:
  - "eslint unavailable locally; no equivalent configured lint/typecheck wrapper exists. Owner: Developer/QC; hosted or approved alternate scan decision pending."
  - "semgrep unavailable locally; no deterministic local security static scan was run. Owner: QC; hosted scan or explicit risk decision pending."
  - "No hosted exact-candidate run or immutable source binding for this uncommitted local diff. Owner: Developer/QC."
release_blockers:
  - "Current diff has QC Spec Compliance and Developer/QC Code Quality PASS, with F-TAR-S08-001 closed; QC confirmed refreshed handoff completeness and opened s08, but has not approved Technical Verification. Limited candidate commit/push is authorized separately."
  - "No QC Technical Verification verdict or DoD receipt yet."
  - "Local diff is not an immutable candidate; scanner gaps need QC disposition before final DoD."
status: PARTIAL
gaps:
  - "Immutable candidate/source and hosted artifact binding are pending; the QC-reviewed fc86c3f1… hash identifies only the local implementation diff."
  - "Deterministic lint/security scan or QC-accepted skip path is outstanding."
  - "Exact source/hosted artifact binding and independent QC Technical Verification are outstanding."
residual_risks:
  - "A manual diff review cannot provide the same coverage as a configured static/security scanner."
  - "Orphaned per-item locks require inspected operator recovery; no automatic lock stealing was introduced."
recommendation: "Keep s08 evidence PARTIAL; create and push only the separately authorized CR-009 candidate from the reviewed diff, then present scanner-gap and exact-candidate hosted evidence to QC for Technical Verification before DoD."
notes_for_review: "All AC results above describe local implementation evidence only. They do not approve Technical Verification, DoD, Business Acceptance, or release."
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md", "project-context/checklists/strict.md"]
checks:
  - "PASS: AC-TAR-01..10 have evidence and docs/protocol reference are synced with the implemented behavior."
  - "PASS: no live CR-008, release/tag, receipt, or historical artifact was changed; branch/worktree remain open."
  - "PASS: T8a authoring smoke covers signed exact-ID disposition and passes 13/13; QC approved refreshed Spec Compliance and closed F-TAR-S08-001 for the matching diff."
  - "PASS: legacy-compatibility checks cover 14 governed reports without migration."
  - "PASS: QC confirmed refreshed T8a/T6 handoff completeness and opened s08 for the unchanged local diff; this is not Technical Verification or DoD."
  - "PARTIAL: strict verification evidence lacks immutable candidate binding and deterministic lint/security scan disposition."
blocking_items:
  - "F-TAR-S08-001 is closed, sequential s07 review passed, and QC opened s08; the user separately authorized only candidate commit/push for hosted CI."
  - "QC Technical Verification is a separate unapproved gate."
  - "QC must decide whether to require hosted scanners or accept documented local gaps; candidate binding remains pending."
owner: "Developer prepares candidate/scan evidence; QC decides Technical Verification and DoD; PO later decides Business Acceptance."
next_action: "Keep protocol ACTIVE/s07 while s08 evidence is prepared; commit/push only the authorized reviewed candidate, then bind hosted evidence for QC review."
```

## Regression & Compatibility Summary
```yaml
regression_status: PARTIAL
compatibility_status: PASS
breaking_changes:
  - "Intentional archive safety change: any active blocker, including legacy/raw state, now refuses terminal archive until explicit disposition."
rollback_readiness: PARTIAL
evidence:
  - "Clean mirror of the unchanged reviewed diff passed the full 45/45 bundle suite; source worktree authoring smoke 13/13 PASS; 8 workflow notes and 14 governed reports validate; pack audit, bundle smoke, and local self-pack PASS. The source worktree's latest direct unit rerun had one ignored generated-runtime inventory failure, not a tracked candidate failure."
  - "T8a fixture tests the intentional active-blocker resume guard, signed exact-ID disposition, one history record, and subsequent resume; QC closed F-TAR-S08-001 on the refreshed diff."
  - "New T6 regression test proves activation retires only approved materializer-owned action IDs, retaining unrelated typed actions."
  - "All 14 tracked legacy reports load without migration and preserve exact raw text; copied-parent end-to-end flow PASS."
  - "Live parent report remains byte-identical at SHA-256 64f67605…; this work item does not resolve its two historical active blockers in place."
rollback_or_remediation: "Do not mutate the live parent or release artifacts under CR-009. QC opened s08, and the user separately authorized candidate commit/push for the reviewed diff; bind and verify that immutable hosted candidate before any Technical Verification or DoD decision."
```

## Scan Summary
```yaml
scan_target: "CR-009 implementation diff only; no live parent or release tree."
scan_scope:
  mode: DIFF_ONLY
  changed_files: ["12 JavaScript files in packages/workflow-bundle/scripts and test"]
  affected_modules: ["work-item protocol/status/CLI", "trusted disposition signer", "materializer and gate writer", "validator"]
language_stack: ["Node.js JavaScript", "Markdown", "JSON"]
available_scan_tools: ["node --check", "git diff --check", "rg", "iconv", "workflow-bundle test, fixture, and pack-audit wrappers"]
false_positive_policy: "Diff-aware and evidence-based; no security finding dismissed without file/line and reason."
scan_plan:
  syntax: ["node --check for changed JS", "UTF-8 check for changed text", "git diff --check"]
  static_analysis: ["Prefer repo wrapper; check eslint availability; manually inspect affected API/validation paths as supplement"]
  security: ["Prefer semgrep; inspect changed signer/auth/file-write/transition paths and negative tests as supplement"]
  performance_heuristic: ["Inspect target enumeration, history scan, file I/O, and lock use for unbounded hot paths"]
syntax_scan_results:
  - command: "node --check on 12 changed JS files; iconv UTF-8 on 11 tracked changed text files plus the untracked Spec Card; git diff --check"
    scope: ["changed JS/Markdown/JSON and implementation diff"]
    status: PASS
    evidence: "12/12 JS parse, 12/12 text UTF-8, and whitespace check PASS."
    blocker_files: []
static_analysis_results:
  - command: "command -v eslint"
    config_used: "No configured lint/typecheck wrapper in root package scripts."
    scope: ["changed JavaScript"]
    status: SKIP
    findings: []
    new_blockers: []
security_scan_results:
  - command_or_check: "command -v semgrep"
    scope: ["changed auth, state selection, lock, and file-write paths"]
    status: SKIP
    findings: []
  - command_or_check: "Diff-aware manual check of exact IDs, signer negatives, filesystem writes, and command-execution patterns"
    scope: ["changed scripts and relevant tests"]
    status: PASS
    findings: []
performance_heuristic_results:
  - check: "Target enumeration and resolved-history lookup"
    scope: ["getDispositionTargets", "runDispositionAction"]
    status: PASS
    expected_impact: LOW
    confidence: MEDIUM
    trigger_condition: "Very large per-item state/history arrays; no such workload is evidenced."
    evidence: "Single-report array traversal per CLI invocation; no network or server hot loop added. No benchmark was run."
  - check: "Staged fsync/rename and per-item lock"
    scope: ["atomicWriteRawProtocolReport", "shared report writer lock"]
    status: PASS
    expected_impact: LOW
    confidence: MEDIUM
    trigger_condition: "High-frequency concurrent writes to one work item; this CLI path is low-volume."
    evidence: "One staged report write and fsync per applied disposition; identical retry avoids a second report write. No benchmark was run."
skipped_scans:
  - "eslint/static analysis unavailable locally; Developer/QC to provide hosted evidence or explicit skip decision."
  - "semgrep/security static scan unavailable locally; QC to require hosted evidence or explicitly accept the documented gap."
overall_status: PARTIAL
remediation_actions:
  - "Bind an immutable source/hosted candidate to this unchanged implementation and review its scan/check annotations."
  - "QC explicitly decides scanner-gap treatment before Technical Verification/DoD; do not describe manual review as scanner output."
notes_for_verify: "Syntax and tests PASS locally; static/security tool lanes remain SKIP. A new code diff reopens s07 review."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No UAT gate is required for this internal protocol defect; copied-parent feature flow is covered by automated tests."]
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["CR-009 does not itself authorize a release, publish, tag, or live parent closeout."]
```

## Business Acceptance Summary
```yaml
status: PARTIAL
reviewers: []
notes: ["Required PO Business Acceptance has not been requested or approved; it follows QC Technical Verification and DoD."]
```

## Audit
```yaml
step: s08
status: PARTIAL
checks:
  - criterion: "AC-TAR-01..10 have reproducible local pass/fail/partial evidence against the same candidate."
    result: PASS
    evidence: "10/10 local AC results refer to the current fc86c3f1… diff, 45-file bundle suite in a fresh mirror of that diff, and 13-case authoring smoke; this is not an immutable hosted candidate."
  - criterion: "Negative cases, regression, corpus compatibility, scope, and changed-text encoding are checked."
    result: PASS
    evidence: "Negative CLI/signer/atomic tests, 14-report corpus, authoring smoke 13/13, scope, and UTF-8 pass locally."
  - criterion: "Every skipped scanner or uncommitted-candidate gap has an owner and decision path."
    result: PASS
    evidence: "Scan Summary names eslint/semgrep SKIP and Developer/QC candidate/scanner actions."
  - criterion: "QC separately reviews Technical Verification before any DoD verdict is requested."
    result: PARTIAL
    evidence: "The s08 note is a draft of local evidence while protocol remains ACTIVE/s07; QC accepted the refreshed handoff and opened s08, but hosted binding and Technical Verification have not occurred. No DoD pass is requested."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "One evidence-authoring cycle; no fixed deadline was specified."
gaps:
  - "Immutable candidate binding is pending for the sequentially reviewed diff; QC handoff and s08 opening have passed."
  - "QC Technical Verification decision pending."
  - "Immutable candidate and scanner-gap disposition pending."
risk_level: HIGH
next_action: "Create and push only the separately authorized candidate, then prepare hosted binding and scanner-gap evidence for QC Technical Verification."
```

## Definition of Done
```yaml
work_item_slug: "terminal-archive-legacy-state-reconciliation"
status: BLOCKED
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: FAIL
  code_scan_completed_or_justified: FAIL
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps:
  - "QC refreshed handoff and s08 opening passed; exact-candidate verification remains required."
  - "QC Technical Verification has not been approved for an immutable candidate."
  - "Static/security scan SKIPs have not been independently dispositioned by QC."
  - "Required PO Business Acceptance is separate and pending."
residual_risks:
  - "Uncommitted local diff can drift before hosted verification."
  - "Manual security review cannot replace an unavailable deterministic scanner without QC risk acceptance."
  - "Orphan lock recovery remains an operator-controlled action."
follow_up_items:
  - "Developer: create and push only the separately authorized reviewed candidate, then prepare exact candidate/hosted evidence or other immutable binding."
  - "QC: decide scanner gaps, Technical Verification, then DoD as separate gates."
  - "PO: Business Acceptance only after QC DoD."
next_action: "Keep protocol ACTIVE/s07 while QC-opened s08 evidence is prepared; create/push only the separately authorized candidate before exact hosted-candidate evidence and separate QC Technical Verification and DoD."
```

## Traceability
```yaml
upstream:
  - "s04 approved Spec/Contract/DoR and Spec Card AC-TAR-01..10"
  - "s05 approved Approach; s06 approved T1-T8 and revised T8a Option A Task Plan with a matching receipt"
  - "s07 historical QC-approved T8 handoff on diff 69e69c57…; QC Spec Compliance and Developer/QC Code Quality passed in order, with F-TAR-S08-001 closed, and QC confirmed refreshed handoff and opened s08 for T8a/T6 diff fc86c3f1…"
next_step: "Create/push only the separately authorized reviewed candidate, then obtain immutable candidate evidence and a scanner-gap decision before separate QC Technical Verification, DoD, and PO Business Acceptance."
```

## Handoff
- Overall status: `PARTIAL` local evidence; QC confirmed handoff completeness and opened s08 evidence authoring, while protocol remains `ACTIVE/s07` pending a separate verification transition and Technical Verification decision.
- Residual risks: uncommitted local diff, unavailable eslint/semgrep, and operator-recovered orphan locks. QC closed F-TAR-S08-001 on the matching diff.
- Recommendation: create/push only the separately authorized candidate from QC-reviewed diff fc86c3f1…, then bind hosted evidence for QC Technical Verification. DoD and PO Business Acceptance remain separate.
- Release recommendation when applicable: `NOT_APPLICABLE` to CR-009; do not publish, tag, or mutate the live CR-008 parent.
- Next action: create/push only the separately authorized reviewed candidate. Do not run `wfc work-item verify` as a substitute for QC Technical Verification; exact-candidate binding and the QC verdict remain pending.
