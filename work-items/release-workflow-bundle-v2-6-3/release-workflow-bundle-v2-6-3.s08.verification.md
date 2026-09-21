---
artifact_id: "release-workflow-bundle-v2-6-3.s08.verification"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-3"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: CHANGE
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
change_id: "CHANGE-007"
change_status: approved
spec_delta_refs: []
archive_status: ready_to_archive
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["po","ba","developer","qc","devops"]
review_mode: independent
verification_owner: "qc"
artifact_shape: adaptive_v1
request_lane: product_delivery
workflow_required: true
routing_reasons: ["LANE_PRODUCT_DELIVERY"]
escalation_reasons: ["HARD_RELEASE"]
role_reasons:
  po: ["ROLE_PO_PRODUCT_OUTCOME"]
  ba: ["ROLE_BA_REQUIREMENTS"]
  developer: ["ROLE_DEVELOPER_DELIVERY"]
  qc: ["ROLE_QC_VERIFICATION"]
  devops: ["ROLE_DEVOPS_RELEASE"]
gate_reasons:
  spec: ["GATE_SPEC_PRODUCT_DELIVERY"]
  dor: ["GATE_DOR_PRODUCT_DELIVERY"]
  approach: ["GATE_APPROACH_PRODUCT_DELIVERY"]
  task_plan: ["GATE_TASK_PLAN_PRODUCT_DELIVERY"]
  dod: ["GATE_DOD_PRODUCT_DELIVERY"]
  release: ["GATE_RELEASE_PUBLICATION"]
  business_acceptance: ["GATE_BUSINESS_ACCEPTANCE_PRODUCT_OUTCOME","GATE_BUSINESS_ACCEPTANCE_RELEASE_OUTCOME"]
adaptive_activation:
  source_version: "2.6.2"
  installed_versions: ["2.6.2"]
  parity_passed: true
approval_gates:
  spec: "required"
  contract: "not_applicable"
  dor: "required"
  approach: "required"
  foundation: "not_applicable"
  task_plan: "required"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
  dod: "required"
role_signoffs:
  spec: ["ba"]
  dor: ["ba","qc"]
  approach: ["developer"]
  task_plan: ["developer"]
  dod: ["qc"]
  release: ["devops","qc"]
  business_acceptance: ["po"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: ["qc"]
  dod_reviewed_at: "2026-09-21T03:54:52Z"
  release_reviewed_by: ["devops","qc"]
  release_reviewed_at: "2026-09-21T03:54:52Z"
  business_acceptance_reviewed_by: ["po"]
  business_acceptance_reviewed_at: "2026-09-21T03:54:52Z"
content_skills:
  - "codex-workflow-chain"
  - "testing"
  - "code-scan-review"
  - "ci-cd-release"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills: ["artifact-governance","obsidian-markdown"]
upstream_artifacts: ["release-workflow-bundle-v2-6-3.s07.implementation.md"]
linked_artifacts: []
tags: ["agent-ops","workflow/s08"]
---

# Step 8 - Verify + DoD

> [!summary]
> `workflow-bundle` v2.6.3 is verified, released, publicly reproducible, and accepted. QC bound
> the authoritative candidate to main source `7f810352ca253b9b8356f9116335cc03713adae4`, run
> `35554116040`, and SHA-256 `f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f`.
> DevOps and QC approved Release; the same bytes were promoted through npm staging and GitHub
> Release before npm `latest` moved to 2.6.3. PO approved Business Acceptance. The immutable
> v2.6.2 rollback remains available at SHA-256 `af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f`.

## Step Contract
```yaml
step_goal: "Close the v2.6.3 release against one authoritative main artifact, prove public cross-channel equality, and preserve terminal approvals and rollback evidence before archive and cleanup."
input_summary:
  - "Reviewed and merged release-only PR #9."
  - "Authoritative main source 7f810352ca253b9b8356f9116335cc03713adae4 and Workflow Guardrails run 35554116040."
  - "Human-approved T9 binding, T10 Technical Verification and DoD, T11 Release, and T13 Business Acceptance."
output_summary:
  - "AC-R263-01..13 evidence for one exact public candidate."
  - "Exact candidate and immutable v2.6.2 rollback compatibility evidence."
  - "Release, Business Acceptance, terminal archive readiness, and cleanup guards."
done_when:
  - "Every required terminal gate has an explicit human decision bound to this final s08 host."
  - "npm and GitHub downloads equal the frozen candidate SHA-256 and public install smoke passes."
  - "Protocol close/archive and branch/worktree cleanup remain ordered after trusted receipt sealing."
owner: "qc,devops,po"
```

## Artifact Chính
```yaml
verification_target: "workflow-bundle v2.6.3 authoritative main and public release"
authoritative_identity:
  source_sha: "7f810352ca253b9b8356f9116335cc03713adae4"
  run_id: 35554116040
  run_result: "PASS - 10/10 jobs"
  annotations: "10 notice, 0 warning, 0 failure, 0 Node deprecation"
  artifact_name: "workflow-bundle-2.6.3.tgz"
  artifact_size_bytes: 971251
  candidate_sha256: "f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f"
rollback_identity:
  version: "2.6.2"
  sha256: "af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f"
risk_ranked_test_matrix:
  - risk: "Source, run, tarball, npm, or GitHub identity drift"
    severity: HIGH
    result: PASS
    evidence: "Frozen, npm staging/latest, and GitHub Release tarballs share the exact candidate SHA-256; annotated tag resolves to the authoritative source."
  - risk: "Candidate fails a supported CLI/Codex/Claude installation mode"
    severity: HIGH
    result: PASS
    evidence: "CLI plus Codex global/project and Claude global/project pass 5/5 against hosted and public tarballs."
  - risk: "Rollback is rebuilt or fails to restore immutable v2.6.2"
    severity: HIGH
    result: PASS
    evidence: "Retained v2.6.2 digest matches its release record and all five rollback modes pass within the target."
  - risk: "Non-atomic publication moves latest before channel equality"
    severity: HIGH
    result: PASS
    evidence: "npm staged under candidate-2-6-3 while latest stayed 2.6.2; GitHub bytes were verified before latest moved to 2.6.3."
criteria_results:
  - { criterion: AC-R263-01, result: PASS, evidence: "Released source is the reviewed release-only descendant of baseline 3204749e9fac592e9f38e327dbd85a87b84b2325." }
  - { criterion: AC-R263-02, result: PASS, evidence: "Active surfaces identify 2.6.3 and v2.0.0-v2.6.2 historical release records remain hash-stable." }
  - { criterion: AC-R263-03, result: PASS, evidence: "The v2.6.3 record separates complete packaged delta from repository-only history." }
  - { criterion: AC-R263-04, result: PASS, evidence: "Run 35554116040 built once; every verified and published tarball equals f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f." }
  - { criterion: AC-R263-05, result: PASS, evidence: "Required local release, workflow, package, security heuristic, diff, and UTF-8 checks pass; scanner skips are justified." }
  - { criterion: AC-R263-06, result: PASS, evidence: "Authoritative main run passes 10/10 jobs, including Node 18/22, with no warning, failure, or Node deprecation annotation." }
  - { criterion: AC-R263-07, result: PASS, evidence: "Exact candidate passes CLI plus Codex/Claude global/project 5/5 with 42 managed skills." }
  - { criterion: AC-R263-08, result: PASS, evidence: "Exact immutable v2.6.2 rollback passes the same five modes and timing target." }
  - { criterion: AC-R263-09, result: PASS, evidence: "GitHub haonh87 had ADMIN and npm haonguyen87 had workflow-bundle read-write; collision preflight passed before Release approval." }
  - { criterion: AC-R263-10, result: PASS, evidence: "QC DoD and DevOps/QC Release were approved before tag, GitHub Release, npm publication, or latest movement." }
  - { criterion: AC-R263-11, result: PASS, evidence: "Exact bytes moved through npm candidate-2-6-3, annotated GitHub v2.6.3, verified downloads, then npm latest without rebuild." }
  - { criterion: AC-R263-12, result: PASS, evidence: "Tag target, GitHub assets, npm latest tarball, version, visibility, and SHA-256 agree." }
  - { criterion: AC-R263-13, result: PASS, evidence: "PO approved Business Acceptance after public CLI and four Codex/Claude modes passed against the exact release." }
test_evidence:
  local_and_review: "PASS - 45-file package suite, workflow validators, release contracts, B1/B2/B3 ordered review, secret heuristic, YAML, links, and UTF-8."
  hosted: "PASS - run 35554116040, 10/10 jobs, Node 18/22 exact candidate."
  candidate: "PASS - CLI plus Codex/Claude global/project 5/5."
  rollback: "PASS - exact v2.6.2 CLI plus Codex/Claude global/project 5/5."
  public: "PASS - npm latest tarball and GitHub asset match candidate SHA-256; public install reports wfc 2.6.3 and passes 5/5 modes."
skipped_checks:
  - "ESLint: no repository script or configuration; Developer and QC accepted this as non-blocking in B1/B3 and T10."
  - "Semgrep: unavailable in the environment; Developer and QC accepted this as non-blocking in B1/B3 and T10."
release_blockers: []
status: PASS
gaps: []
residual_risks:
  - "ESLint and Semgrep remain explicit justified scan gaps, not PASS results."
  - "ubuntu-latest migration notices are non-blocking now but runner behavior changes after 2026-10-19."
  - "npm/GitHub publication is non-atomic; rollback keeps npm latest recoverable through immutable v2.6.2."
recommendation: READY_FOR_TERMINAL_ARCHIVE
```

## Technical Verification Decision
```yaml
proposed_verdict: PASS
human_verdict: PASS
reviewer_role: "qc"
reviewed_by: "qc"
reviewed_at: "2026-09-21T03:54:52Z"
approval_source: "Explicit user QC approval for T10 Technical Verification against the authoritative main identity."
source_sha: "7f810352ca253b9b8356f9116335cc03713adae4"
run_id: 35554116040
candidate_authority: AUTHORITATIVE_MAIN_AND_PUBLIC
candidate_sha256: "f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f"
rollback_version: "2.6.2"
rollback_sha256: "af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f"
criteria_passed: ["AC-R263-01..13"]
retained_scan_gaps:
  - "R263-SG-003: ESLint is not configured."
  - "R263-SG-004: Semgrep is unavailable."
verdict: PASS_FOR_AUTHORITATIVE_RELEASE
dod_status: HUMAN_APPROVED_PENDING_CLOSEOUT_RECEIPT
authority_boundary: "Technical Verification and DoD are distinct human decisions; neither permits retargeting immutable public identities."
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks:
  - "PASS - authoring and implementation gates retain trusted approvals."
  - "PASS - B1/B2/B3 review order was Spec Compliance then Code Quality."
  - "PASS - T9/T10 replaced pre-merge authority with exact main source/run/digest."
  - "PASS - T11 Release approval preceded all public mutation."
  - "PASS - T12 promoted the build-once artifact with latest protection and cross-channel equality."
  - "PASS - PO Business Acceptance followed public verification."
blocking_items: []
owner: "qc,devops,po"
next_action: "Seal the closeout bundle, close and archive protocol state, then finalize branch/worktree cleanup."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
candidate_modes: "PASS - CLI + Codex global/project + Claude global/project"
rollback_modes: "PASS - CLI + Codex global/project + Claude global/project"
rollback_version: "2.6.2"
rollback_sha256: "af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f"
rollback_total_seconds: 3
compatibility_boundary: "Authoritative hosted and public v2.6.3 bytes; immutable public v2.6.2 rollback."
```

## Spec Coverage
```yaml
acceptance_criteria_ref: "release-workflow-bundle-v2-6-3.s04.acceptance-criteria.md#Acceptance Criteria"
evidence_ref: "#Artifact Chính.criteria_results"
status: PASS
summary: { total: 13, pass: 13, fail: 0, partial: 0 }
coverage:
  - id: AC-R263-01
    status: PASS
  - id: AC-R263-02
    status: PASS
  - id: AC-R263-03
    status: PASS
  - id: AC-R263-04
    status: PASS
  - id: AC-R263-05
    status: PASS
  - id: AC-R263-06
    status: PASS
  - id: AC-R263-07
    status: PASS
  - id: AC-R263-08
    status: PASS
  - id: AC-R263-09
    status: PASS
  - id: AC-R263-10
    status: PASS
  - id: AC-R263-11
    status: PASS
  - id: AC-R263-12
    status: PASS
  - id: AC-R263-13
    status: PASS
```

## Scan Summary
```yaml
status: PASS_WITH_JUSTIFIED_GAPS
notes:
  - "Syntax, unit/regression, pack audit, bundle smoke, secret-pattern scan, diff, UTF-8, and hosted checks pass."
  - "ESLint is not configured and Semgrep is unavailable; both gaps were explicitly accepted as non-blocking by Developer and QC."
  - "10 hosted annotations are runner-migration notices; warning=0, failure=0, Node deprecation=0."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No separate UAT gate is applicable; exact package integration and public install evidence cover the release."]
```

## Release Summary
```yaml
status: APPROVED_AND_PUBLISHED
reviewers: ["devops","qc"]
reviewed_at: "2026-09-21T03:54:52Z"
source_sha: "7f810352ca253b9b8356f9116335cc03713adae4"
run_id: 35554116040
candidate_sha256: "f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f"
annotated_tag: "v2.6.3"
tag_target: "7f810352ca253b9b8356f9116335cc03713adae4"
github_release: "https://github.com/haonh87/Code-Factory/releases/tag/v2.6.3"
npm_version: "workflow-bundle@2.6.3"
npm_dist_tags: { latest: "2.6.3", candidate-2-6-3: "2.6.3" }
staging_tag_disposition: "Retained as an immutable audit alias to 2.6.3."
cross_channel_digest_match: PASS
rollback: "v2.6.2 SHA-256 af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f"
```

## Business Acceptance Summary
```yaml
status: APPROVED
verdict: PASS
reviewers: ["po"]
reviewed_at: "2026-09-21T03:54:52Z"
source_sha: "7f810352ca253b9b8356f9116335cc03713adae4"
run_id: 35554116040
candidate_sha256: "f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f"
basis: "Exact public npm/GitHub identity, public five-mode compatibility, approved Technical Verification, DoD, Release, and immutable rollback evidence."
scope: "Business Acceptance for workflow-bundle v2.6.3; public identities must not be changed or retargeted."
```

## Audit
```yaml
audit_status: PASS
finish_target: "codex/release-workflow-bundle-v2-6-3"
workspace_kind: BOTH
verify_inputs:
  - "QC-approved T10 Technical Verification and DoD for source 7f810352..., run 35554116040, candidate f496aed3...."
  - "DevOps/QC-approved Release and verified npm/GitHub public identity."
  - "PO-approved Business Acceptance and immutable v2.6.2 rollback."
finish_gate_checks:
  verify_complete: PASS
  dod_complete: PASS
  release_complete: PASS
  business_acceptance_complete: PASS
  findings_closed: PASS
  exceptions_resolved: PASS
  public_identity_verified: PASS
allowed_actions:
  - "Commit this canonical closeout evidence."
  - "Seal trusted closeout receipts."
  - "Close and archive protocol state."
  - "Delete the merged release branch/worktree only after archived state is committed and pushed."
blocked_actions:
  - "Retarget or overwrite v2.6.3 tag, GitHub Release, npm version, or assets."
  - "Delete or overwrite immutable v2.6.2 rollback evidence."
cleanup_sequence:
  - "Commit and push final s08 evidence."
  - "Seal and verify DoD, Release, and Business Acceptance receipts."
  - "Close then archive the work-item protocol with no blockers or required actions."
  - "Commit and push archived protocol state."
  - "Remove remote/local merged release branch and worktree after clean-tree confirmation."
residual_risks:
  - "ESLint and Semgrep remain explicitly accepted scan gaps."
  - "Future runner migration notices require separate maintenance if they become actionable."
final_recommendation: READY_TO_ARCHIVE_THEN_CLEANUP
```

## Definition of Done
```yaml
work_item_slug: "release-workflow-bundle-v2-6-3"
status: DONE
human_gate_status: APPROVED
human_decision: "QC approved T10 DoD for the authoritative main candidate after separately approving T10 Technical Verification."
reviewed_by: ["qc"]
reviewed_at: "2026-09-21T03:54:52Z"
technical_verification_source_sha: "7f810352ca253b9b8356f9116335cc03713adae4"
technical_verification_run_id: 35554116040
candidate_authority: AUTHORITATIVE_MAIN_AND_PUBLIC
candidate_sha256: "f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f"
trusted_receipt_status: PENDING_CLOSEOUT_BUNDLE
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: []
residual_risks:
  - "ESLint is not configured and Semgrep is unavailable; Developer and QC accepted both as non-blocking."
  - "Public publication is non-atomic; immutable v2.6.2 remains the rollback control."
follow_up_items: []
next_action: "Seal the terminal receipts against this final shared s08 host, then close and archive protocol state."
```

## Traceability
```yaml
upstream:
  - "release-workflow-bundle-v2-6-3.s04.acceptance-criteria.md"
  - "release-workflow-bundle-v2-6-3.s05.technical-approach.md"
  - "release-workflow-bundle-v2-6-3.s06.task-breakdown.md"
  - "release-workflow-bundle-v2-6-3.s07.implementation.md"
acceptance_coverage: "AC-R263-01..13 PASS against source 7f810352..., run 35554116040, and public candidate f496aed3...."
edge_case_controls:
  EC-R263-01: "Partial staging kept npm latest at 2.6.2 until GitHub and npm bytes matched."
  EC-R263-02: "No public identity was overwritten or rebuilt."
  EC-R263-03: "Collision checks ran before Release and publication."
  EC-R263-04: "Historical records remained immutable."
  EC-R263-05: "Digest mismatch remained assertion-blocking."
  EC-R263-06: "Functional and timing rollback evidence remained separate."
  EC-R263-07: "Authentication failure stopped promotion safely; retry preserved exact bytes and latest protection."
next_step: "Trusted closeout receipt sealing, protocol close/archive, then branch/worktree cleanup."
```

## Handoff
- Overall status: all acceptance criteria and required terminal gates have explicit human approvals for the authoritative public candidate.
- Public identity: npm/GitHub/tag/source all resolve to v2.6.3 candidate SHA-256 `f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f`.
- Rollback: immutable v2.6.2 SHA-256 `af49a95830c54165e045a1698932a15f81804dbda5fdb924568ad8728dc6c13f` remains available.
- Residual risks: accepted ESLint/Semgrep gaps and future Ubuntu runner migration notices.
- Recommendation: seal closeout receipts, close/archive protocol state, push canonical evidence, then remove the merged release branch/worktree.
