---
artifact_id: "artifact-governance-enforcement.s08.verification"
artifact_family: workflow-step
work_item_slug: "artifact-governance-enforcement"
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
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: "CHANGE-003"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-003/spec-delta/brd.delta.md"
  - "changes/CHANGE-003/spec-delta/srs.delta.md"
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
    - "po"
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release:
    - "qc"
    - "devops"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-18T06:17:49.622Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-08-18T06:18:04.992Z"
  dor_reviewed_by:
    - "qc"
  dor_reviewed_at: "2026-08-18T06:18:21.706Z"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-18T06:18:36.738Z"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-18T06:18:50.662Z"
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by:
    - "devops"
  release_reviewed_at: "2026-08-18T07:14:39Z"
  business_acceptance_reviewed_by:
    - "po"
  business_acceptance_reviewed_at: "2026-08-18T07:14:39Z"
  dod_reviewed_by:
    - "qc"
  dod_reviewed_at: "2026-08-18T07:14:39Z"
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
  - "artifact-governance-enforcement.s07.implementation.md"
linked_artifacts:
  - "changes/CHANGE-003/proposal.md"
  - "changes/CHANGE-003/execution/task-status.md"
  - "docs/releases/workflow-bundle-v2.5.0.md"
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> **APPROVED FOR RECEIPT SEALING.** CHANGE-003 resolves T7-F1 with a truthful v2.5.0/42 candidate. All 16 acceptance criteria pass, exact candidate install/update and rollback each pass 4/4, and the human reviewer explicitly approved DoD as `qc`, Release as `devops`, and Business Acceptance as `po` on 2026-08-18.

## Step Contract
```yaml
step_goal: "Verify T7 through T13 against AC-001 through AC-016, prove one immutable v2.5.0 candidate and exact v2.4.0 rollback, and hand evidence to the human-controlled gates."
input_summary:
  - "Approved AC-001 through AC-016 and CHANGE-003"
  - "Implemented T0 through T11 evidence in s07"
  - "Frozen package-input identity and retained v2.4.0 rollback artifact"
output_summary:
  - "Acceptance-to-evidence matrix"
  - "Source, candidate, rollback, scan, receipt, compatibility, and encoding evidence"
  - "Separate DoD, Release, Business Acceptance, and branch-finish handoffs"
done_when:
  - "All AC-001 through AC-016 have passing evidence"
  - "Candidate and rollback identities revalidate after execution"
  - "Release blockers and residual risks are explicit"
  - "DoD, Release, and Business Acceptance remain human-controlled"
owner: "developer"
```

## Main Artifact
```yaml
verification_target: "Artifact-governance enforcement plus CHANGE-003 v2.5.0/42 packaging, exact candidate installation, and exact v2.4.0 rollback"
risk_ranked_test_matrix:
  - risk: "Role count causes artifact-file multiplication or orphaned merge ids"
    severity: HIGH
    required_evidence:
      - "2/3/4/8-role scaffold file-count comparison"
      - "Orphan merged assignment negative case"
  - risk: "Section-first readers lose legacy compatibility or required fields"
    severity: HIGH
    required_evidence:
      - "Per-field reader tests"
      - "Legacy worker-assignment fixture"
  - risk: "Placement or duplication checks invalidate existing work items"
    severity: HIGH
    required_evidence:
      - "Negative fixtures plus full-repository validator sweep"
  - risk: "Implementation edits a sealed approval subject"
    severity: HIGH
    required_evidence:
      - "Trusted receipt digest checks"
  - risk: "Repository release inventory was already inconsistent at the integration baseline"
    severity: MEDIUM
    required_evidence:
      - "T8 fail-first evidence followed by a green 36/36 unit gate"
  - risk: "Candidate evidence accidentally tests source or a rebuilt artifact"
    severity: HIGH
    required_evidence:
      - "Absolute retained candidate path plus SHA-256 before and after both matrices"
  - risk: "Rollback removes unmanaged state or resolves to an unverified source checkout"
    severity: HIGH
    required_evidence:
      - "Exact retained v2.4.0 tarball digest and four isolated 42-to-41 transitions"
test_strategy:
  unit_test:
    required: true
    rationale: "Resolver, readers, validation rules and scaffold behavior are deterministic Node.js logic."
  integration_test:
    required: true
    rationale: "The CLI validators must read real workflow notes, configuration, fixtures and receipts together."
  database_test:
    required: false
    rationale: "No schema, query or persistence change."
  feature_test:
    required: true
    rationale: "Bundle smoke and multi-role scaffold flows prove the user-visible CLI contract."
negative_cases:
  - "Missing reference file, heading, YAML block and YAML path"
  - "Unsafe YAML mapping keys __proto__, constructor and prototype"
  - "Artifact outside all declared roots and exemption without a reason"
  - "Five ownership duplications"
  - "Missing assignment fields and orphaned merged assignment id"
  - "Role-indexed handoff missing reason, assignment match or primary-note link"
  - "Missing candidate tarball and missing rollback tarball fail before execution"
regression_targets:
  - "Legacy fixed-name execution artifacts remain readable"
  - "Existing workflow notes remain valid without receipt digest changes"
  - "Codex and Claude bundle smoke remains installable"
  - "File count is independent of 2/3/4/8 execution roles"
  - "Frozen v2.3.2/v2.4.0 release notes keep their historical hashes"
  - "Candidate and rollback preserve unmanaged file hashes and modes"
manual_exploration:
  flows_checked:
    - "Generated multi-agent s05/s06/s07 notes at 2, 3, 4 and 8 roles"
    - "Compared the five aggregate-unit failures with clean detached HEAD 7f5b984"
  issues_found:
    - "Three ignored byte-identical post-pack sync residues were absent from the candidate; they were removed and both source and candidate identities revalidated"
criteria_results:
  - criterion: "AC-001 role contribution is a section, not a generated file"
    result: PASS
    evidence: "scaffold-workflow.test.js emits only the three primary s05/s06/s07 notes and no execution-policy, worker-assignment, worker-handoff-report or merge-report file"
  - criterion: "AC-002 file count is invariant under added roles"
    result: PASS
    evidence: "2/3/4/8 roles each produce exactly 3 files"
  - criterion: "AC-003 plural schemas preserve multiple roles and reject orphan ids"
    result: PASS
    evidence: "3-role assignments/handoffs round-trip; injected S06-ORPHAN-999 is rejected"
  - criterion: "AC-004 readers migrate with red-then-green evidence"
    result: PASS
    evidence: "assignment_id, role, owned_scope, done_when and status failed before the section reader and pass after; one legacy fixture passes"
  - criterion: "AC-005 measured duplication set is rejected"
    result: PASS
    evidence: "Five negative fixtures name task dependencies, paths_in_scope, verification_hint, Traceability.task_refs and frontmatter.role_signoffs; deduplicated fixture passes"
  - criterion: "AC-006 artifact outside declared layers is rejected"
    result: PASS
    evidence: "Unplaced fixture fails; declared-root fixture passes"
  - criterion: "AC-007 layer roots are configurable with shipped defaults"
    result: PASS
    evidence: "Code-Factory defaults and custom adopter layout tests pass"
  - criterion: "AC-008 escape hatch requires and echoes a reason"
    result: PASS
    evidence: "Empty reason fails; stated reason passes and appears in NOTICE output"
  - criterion: "AC-009 no existing workflow artifact or approval trail is invalidated"
    result: PASS
    evidence: "139 workflow files/135 notes validate; planning and execution validate 135 notes; SDD validates 23 notes; canonical protocol validates 4 managed items and 16 legacy items; 18 direct gate checks report APPROVED and digest_match=true"
  - criterion: "AC-010 reference resolver succeeds and fails loudly as specified"
    result: PASS
    evidence: "Same-note/cross-file positives and missing file/heading/YAML/path negatives pass"
  - criterion: "AC-011 artifact-governance English/Vietnamese contract is complete"
    result: PASS
    evidence: "Canonical SKILL.md and SKILL.vi.md are present and recursively byte-equal in both generated runtimes"
  - criterion: "AC-012 canonical and runtime inventories are exactly 42"
    result: PASS
    evidence: "Canonical/Codex/Claude counts are 42/42/42 and packaged install scenarios each report 42"
  - criterion: "AC-013 current release surfaces are v2.5.0/42 without rewriting history"
    result: PASS
    evidence: "Bilingual current surfaces pass release-surface tests; v2.3.2 and v2.4.0 note hashes remain 476b3804... and 2b84621c..."
  - criterion: "AC-014 exact v2.5.0 candidate installs and updates in all supported targets"
    result: PASS
    evidence: "workflow-bundle-2.5.0.tgz SHA-256 36615668... passes Codex/Claude x global/project 4/4 with unmanaged changes 0"
  - criterion: "AC-015 exact v2.4.0 rollback is known-good"
    result: PASS
    evidence: "Retained v2.4.0 SHA-256 44f40296... passes 4/4, producing 41 skills and removing artifact-governance with unmanaged changes 0"
  - criterion: "AC-016 source, candidate, and rollback gates are evidence-backed"
    result: PASS
    evidence: "36/36 unit files, validators, fixtures, audit, source smoke, candidate 4/4, rollback 4/4, hashes, UTF-8, and diff checks pass"
test_evidence:
  unit_test:
    - "36 of 36 unit test files pass"
    - "The five T7-F1 release files pass under the approved v2.5.0/42 contract"
  integration_test:
    - "wfc validate, sdd, planning, protocol, execution, naming and governance"
    - "10 governance fixture cases"
  database_test: []
  feature_test:
    - "Workflow bundle smoke PASS"
    - "Workflow pack audit PASS"
    - "Exact v2.5.0 candidate install/update PASS 4/4"
    - "Exact v2.5.0-to-v2.4.0 rollback PASS 4/4"
commands_run:
  - "npm run validate:workflow -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:sdd -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:planning -- --workflow-root work-items"
  - "npm run validate:workflow:protocol -- --workflow-root work-items (canonical repository root)"
  - "npm run validate:workflow:execution -- --workflow-root work-items"
  - "npm run validate:workflow:naming -- --workflow-root work-items"
  - "npm run validate:workflow:governance -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:unit"
  - "npm run validate:workflow:fixtures"
  - "npm run validate:workflow:pack-audit"
  - "npm run validate:workflow:bundle-smoke"
  - "node --check on all changed/new JavaScript files"
  - "UTF-8 fatal decode on all 50 changed/new text files"
  - "npm pack once, tar inventory inspection, and SHA-256 verification"
  - "release-candidate-artifact-smoke.test.js with exact absolute path and digest"
  - "release-rollback-smoke.test.js with exact candidate/rollback paths and digests"
skipped_checks:
  - "eslint/typecheck: no project wrapper or installed eslint"
  - "semgrep: not installed; manual diff security review was used and found the unsafe YAML-key case, which was fixed with a red-then-green test"
release_blockers: []
status: PASS
gaps: []
residual_risks:
  - "Legacy execution files remain accepted by design and therefore keep a second read path"
  - "Static analysis/security tools were unavailable; syntax, targeted tests and manual review cover the diff"
recommendation: "Approve DoD after QC review, approve Release through QC or DevOps review, then approve Business Acceptance through PO review; retain the exact candidate and keep publication/merge/cleanup blocked until those receipts pass."
notes_for_review: "Technical verification is PASS. ESLint and Semgrep remain explicit tool gaps covered by syntax, focused negative tests, manual security review, and the complete regression matrix."
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - id: "GOV-01"
    result: PASS
    evidence: "Implementation follows the approved write-new/read-both approach plus approved CHANGE-003 additive release delta."
  - id: "GOV-02"
    result: PASS
    evidence: "Spec, Contract, DoR, Approach, and Task Plan receipts were resealed after final metadata normalization and report digest_match=true."
  - id: "GOV-03"
    result: PASS
    evidence: "Canonical protocol validation passes for 4 protocol-managed work items; the implementation path is ACTIVE at s07 before verify handoff."
  - id: "GOV-04"
    result: PASS
    evidence: "TDD, worktree isolation, early two-tier review, exact-artifact verification, and no-publication boundaries are all evidenced."
blocking_items: []
owner: "qc"
next_action: "Review and approve DoD only if this immutable candidate and the recorded evidence are accepted."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: PASS
baseline_comparison:
  p2_new_regressions: 0
  change_003_release_failures: 0
  finding: "T7-F1 is resolved by the approved v2.5.0/42 release contract; aggregate unit is 36/36."
compatibility_evidence:
  - "New scaffold writes sections only"
  - "Readers accept new sections and legacy fixed-name files"
  - "42-skill candidate preserves unmanaged hashes/modes in 4/4 targets"
  - "Exact rollback returns all 4/4 targets to v2.4.0/41 and removes only the managed artifact-governance skill"
  - "v2.3.2 and v2.4.0 release-note hashes remain frozen"
```

## Scan Summary
```yaml
status: PASS_WITH_JUSTIFIED_TOOL_GAPS
notes:
  - "Syntax: PASS for all changed/new JavaScript files"
  - "Static analysis: SKIP, no eslint/typecheck wrapper available"
  - "Security: manual diff review plus unsafe YAML-key negative test; semgrep unavailable"
  - "Performance heuristic: PASS; bounded local CLI reads, no network/hot runtime path, no role-dependent file growth"
  - "No HIGH finding"
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "No UAT gate in approved scope"
```

## Release Summary
```yaml
status: PASS
reviewers:
  - "devops"
reviewed_at: "2026-08-18T07:14:39Z"
notes:
  - "Candidate: workflow-bundle-2.5.0.tgz, 914217 bytes, 536 entries, SHA-256 36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec"
  - "Candidate exact install/update and exact v2.4.0 rollback both pass 4/4"
  - "No tag, registry publish, or live-global update has occurred"
```

## Business Acceptance Summary
```yaml
status: PASS
reviewers:
  - "po"
reviewed_at: "2026-08-18T07:14:39Z"
notes:
  - "Public contract is v2.5.0 with exactly 42 managed skills and complete artifact-governance EN/VI content"
  - "Current docs remain candidate-only until Release and Business Acceptance receipts pass"
```

## Audit
### Step Goal Audit
```yaml
step: "s08 Verify + DoD"
status: PASS
checks:
  - criterion: "All AC-001 through AC-016 have passing evidence"
    result: PASS
    evidence: "Criteria matrix covers 16/16; source gate, candidate 4/4, and rollback 4/4 pass."
  - criterion: "Candidate and rollback identities revalidate after execution"
    result: PASS
    evidence: "Candidate SHA-256 36615668... and rollback SHA-256 44f40296... match after both matrices; package input remains c83c457c... across 536 files."
  - criterion: "Release blockers and residual risks are explicit"
    result: PASS
    evidence: "No technical release blocker remains; ESLint/Semgrep gaps and legacy-reader compatibility are recorded."
  - criterion: "DoD, Release, and Business Acceptance remain human-controlled"
    result: PASS
    evidence: "The user explicitly approved DoD as qc, Release as devops, and Business Acceptance as po; trusted receipt sealing remains passphrase-protected."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "Verification completed within the current T11-T13 execution cycle."
gaps: []
risk_level: MEDIUM
next_action: "Seal the three trusted receipts against this final artifact digest; do not merge, clean, tag, or publish first."
```

### Branch Finish Audit
```yaml
finish_target: "codex/artifact-governance-enforcement and its dedicated worktree"
workspace_kind: BOTH
verify_inputs:
  - "Technical verification PASS across AC-001 through AC-016"
  - "Exact candidate and rollback evidence"
finish_gate_checks:
  verify_complete: PASS
  dod_complete: PENDING
  findings_closed: PASS
  exceptions_resolved: PASS
allowed_actions:
  - "Retain candidate and worktree for human review"
  - "Seal trusted DoD, Release, and Business Acceptance receipts after review"
blocked_actions:
  - "Merge branch"
  - "Remove or clean worktree"
  - "Tag, publish, or update live global installations"
cleanup_sequence: []
merge_conditions:
  - "Human DoD receipt PASS"
  - "Human Release receipt PASS"
  - "Human Business Acceptance receipt PASS"
residual_risks:
  - "ESLint and Semgrep were unavailable; the justified scan evidence must remain visible"
final_recommendation: HOLD_OPEN
notes_for_closeout: "Technical verification alone does not authorize branch/worktree finalization."
```

## Definition of Done
```yaml
work_item_slug: "artifact-governance-enforcement"
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
  - "Legacy execution artifacts remain readable by design and retain a compatibility path"
  - "Automated ESLint and Semgrep scans were unavailable; syntax, negative tests, manual security review, and full regression evidence compensate"
follow_up_items:
  - "Seal QC DoD trusted receipt"
  - "Seal DevOps Release trusted receipt"
  - "Seal PO Business Acceptance trusted receipt"
next_action: "Seal all three receipts without changing this evidence artifact afterward."
```

## Traceability
```yaml
upstream:
  - "artifact-governance-enforcement.s04.acceptance-criteria.md#Artifact Chính"
  - "artifact-governance-enforcement.s06.task-breakdown.md#Artifact Chính"
  - "artifact-governance-enforcement.s07.implementation.md#Artifact Chính"
coverage:
  - "AC-001, AC-002, AC-003 -> scaffold-workflow.test.js"
  - "AC-004 -> validate-workflow-execution.test.js"
  - "AC-005, AC-006, AC-007, AC-008 -> validate-workflow-governance.test.js and fixtures"
  - "AC-009 -> full validator sweep and receipt checks"
  - "AC-010 -> workflow-gate-evidence-utils.test.js"
  - "AC-011, AC-012 -> runtime parity, recursive skill diff, candidate inventory"
  - "AC-013 -> release-surface tests and frozen-note hashes"
  - "AC-014 -> exact candidate install/update 4/4"
  - "AC-015 -> exact v2.4.0 rollback 4/4"
  - "AC-016 -> full source gate plus immutable-artifact evidence"
next_step: "Seal QC DoD, DevOps Release, and PO Business Acceptance trusted receipts"
```

## Handoff
- Overall status: **APPROVED FOR RECEIPT SEALING.** AC-001 through AC-016 pass; the human approved DoD=`qc`, Release=`devops`, and Business Acceptance=`po`.
- Candidate: `workflow-bundle-2.5.0.tgz`, SHA-256 `36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec`, exact install/update 4/4.
- Rollback: retained v2.4.0 SHA-256 `44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e`, exact rollback 4/4.
- Residual risk: ESLint and Semgrep unavailable; no HIGH finding after syntax, focused negative tests, manual security review, and the full regression matrix.
- Next human actions: seal the three passphrase-protected trusted receipts. Branch/worktree remains `HOLD_OPEN` until all receipts pass.
