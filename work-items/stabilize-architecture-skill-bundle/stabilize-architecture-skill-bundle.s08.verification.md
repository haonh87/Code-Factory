---
artifact_id: "stabilize-architecture-skill-bundle.s08.verification"
artifact_family: workflow-step
work_item_slug: "stabilize-architecture-skill-bundle"
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
change_id: "CHANGE-002"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "ba"
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
  release:
    - "devops"
    - "qc"
  business_acceptance:
    - "po"
  dod:
    - "qc"
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
  release_reviewed_by:
    - "qc"
  release_reviewed_at: "2026-08-17T11:13:09Z"
  business_acceptance_reviewed_by:
    - "po"
  business_acceptance_reviewed_at: "2026-08-17T11:13:09Z"
  dod_reviewed_by:
    - "qc"
  dod_reviewed_at: "2026-08-17T11:13:09Z"
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
  - "stabilize-architecture-skill-bundle.s07.implementation.md"
linked_artifacts:
  - "qc-evidence/representative.drawio"
  - ".claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0/packages/workflow-bundle/workflow-bundle-2.4.0.tgz"
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> PASS — all ten acceptance criteria have passing evidence, including QC first-open. The human reviewer explicitly approved DoD as `qc`, Release as `qc`, and Business Acceptance as `po` on 2026-08-17.

## Step Contract
```yaml
step_goal: "Verify the frozen v2.4.0 candidate against AC-001 through AC-010, record manual first-open evidence, and prepare an auditable DoD/Release/Business Acceptance handoff without self-approval."
input_summary:
  - "Approved s04 Acceptance + DoR, s05 Technical Approach, and s06 Task Plan"
  - "Completed s07 implementation evidence and targeted two-tier reviews"
  - "Clean source commit e6190bd14b4f0156b159c23de2df850c401745d9"
  - "Retained unpublished workflow-bundle-2.4.0.tgz candidate"
output_summary:
  - "Fresh automated test, pack-audit, bundle-smoke, digest, and worktree evidence"
  - "QC first-open PASS for the representative draw.io artifact"
  - "AC-001 through AC-010 coverage and release-gate handoff"
done_when:
  - "Every acceptance criterion has explicit evidence and no technical release blocker remains"
  - "Regression, compatibility, rollback, scan limitations, and residual risks are documented"
  - "Authorized humans decide DoD, Release, and Business Acceptance"
owner: "qc"
```

## Artifact Chính
```yaml
verification_scope:
  - "AC-001 through AC-010 for corrective release v2.4.0"
  - "Installer/update safety, sa/ta contracts, architecture-modeling, both 41-skill runtimes, evidence validation, packaging, compatibility, and rollback"
  - "The exact retained candidate and representative draw.io fixture"
evidence_refs:
  - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s07.implementation.md"
  - "work-items/stabilize-architecture-skill-bundle/qc-evidence/representative.drawio"
  - ".claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0/packages/workflow-bundle/tests/fixtures/architecture-modeling/representative.quality.json"
  - ".claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0/packages/workflow-bundle/workflow-bundle-2.4.0.tgz"
summary_verdict: PASS
```

## Test Verification
```yaml
verification_target: "CHANGE-002 corrective workflow-bundle v2.4.0 candidate"
risk_ranked_test_matrix:
  - risk: "Managed updates mutate permissions or content of unmanaged files"
    severity: HIGH
    required_evidence: ["Codex/Claude x global/project install/update 4/4", "unchanged unmanaged SHA-256 and mode", "path-traversal and symlink refusal"]
  - risk: "architecture-modeling emits invalid or visually unusable draw.io"
    severity: HIGH
    required_evidence: ["valid mxGraph XML", "geometry thresholds", "QC first-open"]
  - risk: "Canonical and generated skill inventories drift"
    severity: HIGH
    required_evidence: ["41/41/41 counts", "recursive byte equality", "pack audit"]
  - risk: "The retained tarball differs from verified source behavior"
    severity: HIGH
    required_evidence: ["exact-artifact npm install smoke", "candidate SHA-256", "clean source commit"]
  - risk: "Rollback removes unmanaged state or fails across harness/scope combinations"
    severity: HIGH
    required_evidence: ["v2.4.0 to v2.3.2 transition 4/4", "41 to 40 managed skills", "unmanaged snapshots preserved"]
test_strategy:
  unit_test:
    required: true
    rationale: "Installer, validators, routing, rendering, metadata, and safety rules have deterministic behavior coverage."
  integration_test:
    required: true
    rationale: "Runtime synchronization, package installation, update, and rollback span multiple filesystem and CLI boundaries."
  database_test:
    required: false
    rationale: "No database or persistence schema is in scope."
  feature_test:
    required: true
    rationale: "The release contract requires exact-artifact install and complete Codex/Claude flows."
negative_cases:
  - "Managed-manifest path traversal and symbolic-link targets are rejected."
  - "Empty/placeholder/stale/inconsistent governance evidence is rejected."
  - "Oversized or geometrically invalid architecture models fail before release output."
  - "Unmanaged files inside and outside managed policy directories retain content and mode."
regression_targets:
  - "Repeat install/update EACCES defects"
  - "sa/ta schema, ownership, metric, example, and coverage drift"
  - "Missing architecture-modeling from either runtime"
  - "Version, inventory, evidence, compatibility, and rollback claim drift"
manual_exploration:
  flows_checked:
    - "QC opened work-items/stabilize-architecture-skill-bundle/qc-evidence/representative.drawio in draw.io and confirmed it is acceptable."
  issues_found: []
  reviewed_by: "qc"
  reviewed_at: "2026-08-17T10:53:04Z"
  result: PASS
criteria_results:
  - criterion: "AC-001"
    result: PASS
    evidence: "Hardened Codex/Claude x global/project install/update matrix passes 4/4 with zero EACCES and unchanged unmanaged hashes/modes."
  - criterion: "AC-002"
    result: PASS
    evidence: "Architecture-role contract checks parse EN/VI schemas/examples with exact threshold enums and zero compact-map defects."
  - criterion: "AC-003"
    result: PASS
    evidence: "Focused ownership checks keep SA and TA driver/handoff lenses distinct in EN/VI examples."
  - criterion: "AC-004"
    result: PASS
    evidence: "Named negative fixtures reject empty, placeholder, stale-digest, coverage-mismatch, and contradictory protocol states."
  - criterion: "AC-005"
    result: PASS
    evidence: "M-01 through M-10 inventory, required fields, declared counts, and computed coverage totals pass focused tests."
  - criterion: "AC-006"
    result: PASS
    evidence: "Canonical and both generated runtimes contain architecture-modeling; 41 skills per runtime and recursive parity pass."
  - criterion: "AC-007"
    result: PASS
    evidence: "Contract and renderer tests prove mutually exclusive house/built-in ownership with one shared architecture model."
  - criterion: "AC-008"
    result: PASS
    evidence: "Automated metrics are within every threshold and QC first-open passed for draw.io SHA-256 1585d15d0a9520e0940fcb389afbc7de6bb22e4ddb6fdb80f16958551017485d."
  - criterion: "AC-009"
    result: PASS
    evidence: "Release-surface, pack audit, runtime parity, package dry-run, exact-artifact smoke, compatibility, and rollback checks pass for v2.4.0 and 41 skills/runtime."
  - criterion: "AC-010"
    result: PASS
    evidence: "Corrective evidence preserves history, binds current receipts to reviewer/timestamp/digest, and reports no contradictory approved-state blocker."
test_evidence:
  unit_test:
    - "npm run validate:workflow:unit — 34/34 test files PASS on 2026-08-17"
  integration_test:
    - "Codex/Claude x global/project install/update 4/4 PASS"
    - "v2.4.0 to v2.3.2 rollback transition 4/4 PASS"
  database_test: []
  feature_test:
    - "Exact workflow-bundle-2.4.0.tgz install smoke PASS"
    - "npm run validate:workflow:bundle-smoke PASS"
commands_run:
  - "npm run validate:workflow:unit"
  - "npm run validate:workflow:pack-audit"
  - "npm run validate:workflow:bundle-smoke"
  - "git status --short and git rev-parse HEAD in the isolated worktree"
  - "shasum -a 256 for the retained candidate and QC draw.io copy"
skipped_checks:
  - "eslint and semgrep are unavailable in this dependency-free package; native JavaScript syntax checks, focused security regressions, manual changed-code review, and performance heuristics are the documented alternative."
release_blockers: []
status: PASS
gaps: []
residual_risks:
  - "Formal eslint/semgrep coverage is absent, although no open HIGH issue was found by the available checks."
  - "Any mutation of the retained candidate invalidates SHA-256 evidence and requires exact-artifact verification again."
recommendation: "Proceed with receipt sealing and publish only the immutable verified candidate digest."
notes_for_review: "QC first-open and the explicit DoD, Release, and Business Acceptance decisions are recorded with their authorized roles."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - id: "GC-01"
    check: "Approved scope and architecture contracts are fully evidenced"
    verdict: PASS
    evidence: "AC-001 through AC-010 each map to passing automated or manual evidence."
  - id: "GC-02"
    check: "Human-controlled gates are not inferred"
    verdict: PASS
    evidence: "The user explicitly approved DoD as qc, Release as qc or devops, and Business Acceptance as po; this artifact records Release under qc."
  - id: "GC-03"
    check: "Large/risky change stayed isolated and reviewable"
    verdict: PASS
    evidence: "Worktree is clean at e6190bd14b4f0156b159c23de2df850c401745d9; merge and cleanup remain closed."
  - id: "GC-04"
    check: "Release claims are tied to a retained immutable artifact"
    verdict: PASS
    evidence: "workflow-bundle-2.4.0.tgz SHA-256 is 44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e."
  - id: "GC-05"
    check: "Changed text evidence is valid UTF-8"
    verdict: PASS
    evidence: "Workflow and release text checks passed in T8; this s08 note is stored as UTF-8."
blocking_items: []
owner: "qc"
next_action: "Seal the three trusted gate receipts, then close and finalize the work item through the governed release path."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
notes:
  - "Fresh 34-file unit suite, pack audit, and bundle smoke pass against the clean source commit."
  - "Both generated runtimes remain byte-equal to canonical source at 41 skills each."
  - "Isolated v2.4.0 to v2.3.2 rollback changes 41 to 40 managed skills and preserves unmanaged state in 4/4 scenarios."
  - "No database, API migration, or runtime deployment cutover is in scope."
```

## Spec Coverage
```yaml
coverage:
  - id: "AC-001"
    status: PASS
    evidence: "4/4 hardened install/update matrix; unmanaged hashes and modes unchanged"
  - id: "AC-002"
    status: PASS
    evidence: "EN/VI schema and threshold contract tests"
  - id: "AC-003"
    status: PASS
    evidence: "SA/TA ownership and handoff lens tests"
  - id: "AC-004"
    status: PASS
    evidence: "Five required negative validator classes rejected"
  - id: "AC-005"
    status: PASS
    evidence: "M-01 through M-10 and coverage bookkeeping tests"
  - id: "AC-006"
    status: PASS
    evidence: "41-skill canonical/Codex/Claude parity"
  - id: "AC-007"
    status: PASS
    evidence: "Single render owner and model/handoff contract tests"
  - id: "AC-008"
    status: PASS
    evidence: "Automated geometry PASS plus QC first-open PASS"
  - id: "AC-009"
    status: PASS
    evidence: "Release surfaces, exact candidate, compatibility, and rollback"
  - id: "AC-010"
    status: PASS
    evidence: "Corrected evidence and receipt/protocol consistency"
status: PASS
summary: { pass: 10, partial: 0, untested: 0, fail: 0 }
```

## Scan Summary
```yaml
status: PARTIAL
notes:
  - "Native JavaScript syntax, focused security tests, path-confinement regressions, manual changed-code review, and performance heuristics pass with no open HIGH finding."
  - "eslint and semgrep are unavailable; this tooling gap is explicit and does not replace the recorded alternative evidence."
```

## Deployment Review
```yaml
pipeline_scope: "Build, verify, approve, tag, and publish the workflow-bundle v2.4.0 npm package."
source_strategy:
  branch_model: "Isolated codex/stabilize-architecture-skill-bundle-v2.4.0 worktree at clean source commit e6190bd14b4f0156b159c23de2df850c401745d9."
  triggers:
    - "Human-approved DoD, Release, and Business Acceptance"
    - "Trusted gate receipts matching this s08 artifact digest"
build_and_verify:
  stages:
    - "34-file unit and integration suite"
    - "Workflow pack audit and bundle smoke"
    - "Exact tarball install, update, and rollback smoke"
    - "Candidate digest and inventory verification"
  cache_strategy:
    - "Use isolated writable npm cache only; cache is not release provenance."
  required_checks:
    - "34/34 tests PASS"
    - "WORKFLOW_PACK_AUDIT=PASS"
    - "Exact-artifact smoke PASS"
    - "QC first-open PASS"
artifact_flow:
  registry: "Configured npm-compatible registry; publication has not been executed in this approval step."
  artifact_types:
    - "workflow-bundle-2.4.0.tgz"
  tagging_strategy:
    - "Immutable semantic version v2.4.0"
    - "Source commit e6190bd14b4f0156b159c23de2df850c401745d9"
    - "SHA-256 44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e"
  provenance_controls:
    - "Publish the exact verified tarball; any byte change invalidates verification."
promotion_flow:
  - from: local
    to: prod
    conditions:
      - "DoD, Release, and Business Acceptance receipts are APPROVED and digest-matched."
      - "Tag and registry package resolve to the retained immutable candidate."
    automation_level: "Human-gated publication with automated post-publish verification."
approval_controls:
  - "DoD approved by qc."
  - "Release approved by qc."
  - "Business Acceptance approved by po."
release_controls:
  pre_release:
    - "Seal and verify all three trusted receipts against this artifact."
    - "Reconfirm candidate SHA-256 before tag/publication."
  post_release:
    - "Query published version and digest."
    - "Run clean install smoke and confirm 41 skills in both runtimes."
rollback_controls:
  - "Known-good baseline is v2.3.2."
  - "Use the verified v2.4.0 to v2.3.2 transition procedure; preserve unmanaged state."
  - "Stop publication if candidate digest differs or post-publish smoke fails."
pipeline_risks:
  - "Publishing a rebuilt or mutated tarball would break provenance."
  - "Registry or credential availability has not been exercised by this local verification."
pipeline_recommendation: READY_WITH_GUARDS
notes_for_implementation_or_ops: "The release decision is approved; execute tag/publication only after receipt sealing and preserve the verified digest."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "No separate UAT gate is required by the approved work item."
```

## Release Summary
```yaml
status: PASS
reviewers:
  - "qc"
notes:
  - "The user explicitly approved Release under the authorized qc role on 2026-08-17."
  - "The exact candidate is approved for the governed tag/publication path after trusted receipt sealing."
  - "Publication itself has not been executed by this gate-materialization step."
```

## Business Acceptance Summary
```yaml
status: PASS
reviewers:
  - "po"
notes:
  - "The corrective outcome matches the approved v2.4.0 business scope with 10/10 AC passing."
  - "The user explicitly approved Business Acceptance under the po role on 2026-08-17."
```

## Audit
```yaml
audit_status: PASS
notes:
  - "Business -> acceptance -> approach -> task -> implementation -> verification traceability is present."
  - "The candidate digest, clean source commit, manual QC evidence, and known scan limitation are explicit."
  - "No gate reviewer or approval timestamp has been fabricated."
```

## Definition of Done
```yaml
work_item_slug: "stabilize-architecture-skill-bundle"
status: DONE
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: []
residual_risks:
  - "Formal eslint/semgrep output is unavailable; alternative syntax, security regression, review, and heuristic evidence found no open HIGH issue."
  - "Candidate SHA-256 must remain unchanged through release or verification must be rerun."
follow_up_items:
  - "After all required gates pass, decide merge/worktree cleanup using branch-finish discipline."
  - "Tag and publish only the retained verified digest, or invalidate and rebuild it explicitly."
next_action: "Seal the trusted receipts, confirm digest matches, then close the protocol and execute the guarded release path."
```

## Traceability
```yaml
upstream:
  - "stabilize-architecture-skill-bundle.s04.acceptance-criteria.md"
  - "stabilize-architecture-skill-bundle.s05.technical-approach.md"
  - "stabilize-architecture-skill-bundle.s06.task-breakdown.md"
  - "stabilize-architecture-skill-bundle.s07.implementation.md"
  - "changes/CHANGE-002"
next_step: "Seal the approved gate receipts, close the work item, then finalize branch and release operations against the immutable candidate."
```

## Handoff
- Overall status: `APPROVED FOR RECEIPT SEALING`; technical criteria are 10/10 PASS, QC first-open is PASS, and all three final human decisions are recorded.
- Residual risks: formal eslint/semgrep coverage is unavailable; candidate digest must stay immutable.
- Recommendation: seal DoD, Release, and Business Acceptance receipts against this exact artifact, then close the work item.
- Release recommendation khi có: approved with guards; release only SHA-256 `44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e`, otherwise invalidate and reverify.
- Next action: run the three interactive gate approval commands, verify digest matches, then perform protocol close and branch/release finalization.
