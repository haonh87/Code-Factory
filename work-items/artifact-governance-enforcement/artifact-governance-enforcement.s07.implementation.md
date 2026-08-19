---
artifact_id: "artifact-governance-enforcement.s07.implementation"
artifact_family: workflow-step
work_item_slug: "artifact-governance-enforcement"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
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
  spec: []
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
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "code-scan-review"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "artifact-governance-enforcement.s06.task-breakdown.md"
linked_artifacts:
  - "changes/CHANGE-003/proposal.md"
  - "changes/CHANGE-003/design.md"
  - "changes/CHANGE-003/tasks.md"
  - "changes/CHANGE-003/spec-delta/brd.delta.md"
  - "changes/CHANGE-003/spec-delta/srs.delta.md"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Step Contract
```yaml
step_goal: "Execute T0 to T7 from the approved task plan, in order, with the reader migration isolated so a silent-pass regression is attributable to one commit."
input_summary:
  - "s06 task plan T0 to T7, receipt sealed"
  - "s05 approach O-A write-new-read-both, receipt sealed"
output_summary:
  - "Per-task record with evidence"
  - "Delivery rule evidence for TDD, worktree, review and delegation"
done_when:
  - "T0 to T7 each have a recorded outcome"
  - "No claim of DoD; s08 owns the verdict"
owner: "developer"
```

## Artifact Chính
```yaml
task_plan_ref: "artifact-governance-enforcement.s06.task-breakdown.md#Artifact Chính"

progress:
  - id: T0
    status: DONE
    outcome: "Worktree isolated, then fast-forwarded from b6424dd to tracked baseline 7f5b984. T0-F1 is resolved because all three formerly-untracked governed work items are now tracked."
    evidence:
      worktree: ".claude/worktrees/artifact-governance-enforcement on branch codex/artifact-governance-enforcement at 7f5b984 before P2 edits"
      gitignored: "confirmed via git check-ignore, .gitignore:29 .claude/worktrees/"
      tracked_artifacts: "git ls-files confirms artifact-governance-model, artifact-governance-enforcement and stabilize-architecture-skill-bundle are tracked"
  - id: T1
    status: DONE
    outcome: "Added a dependency-free artifact reference resolver with same-note/cross-file lookup, heading/YAML/path selectors, root confinement and unsafe-key rejection."
    evidence: "workflow-gate-evidence-utils.test.js: two live positives; missing file/heading/YAML/path negatives; prototype-pollution key negative. Red state was missing export, then green."
  - id: T2
    status: DONE
    outcome: "Added artifactGovernance.layerRoots with six shipped defaults and adopter override support."
    evidence: "validate-workflow-governance.test.js default/custom configuration cases pass."
  - id: T3
    status: DONE
    outcome: "Validator now rejects artifacts outside declared roots and supports a visible, reason-bearing exemption."
    evidence: "Unplaced and empty-reason fixtures fail; reason-bearing fixture and custom adopter layout pass; all current workflow notes pass."
  - id: T4
    status: DONE
    outcome: "Added five data-driven ownership duplication rules, prospectively applied to new Role Outputs notes."
    evidence: "Five negative fixtures name the owning block; deduplicated fixture passes; legacy sealed notes remain valid."
  - id: T5
    status: DONE
    outcome: "Execution readers now consume owning sections first and retain a legacy fallback."
    evidence: "Per-field assignment_id/role/owned_scope/done_when/status tests failed before migration and pass after; one legacy worker-assignment fixture remains accepted."
  - id: T6
    status: DONE
    outcome: "New multi-agent scaffolds emit Execution Topology, plural assignments/handoffs and Merge Summary into primary notes; no fixed-name runtime files are emitted."
    evidence: "2/3/4/8-role scaffolds each produce 3 files; orphaned merged id is rejected; role-indexed handoff escape hatch requires matching assignment id, reason and linked_artifacts entry."
  - id: T7
    status: DONE
    outcome: "Full T7 regression and receipt-integrity execution is recorded in s08. All P2 criteria pass; technical verification remains PARTIAL because the aggregate unit command has five clean-HEAD release inventory failures outside the approved P2 scope."
    evidence: "wfc validate 139 files/135 notes; SDD 23; planning/execution/governance 135; naming 139; protocol in canonical root 4 managed + 16 legacy; fixtures 10; pack audit PASS; bundle smoke PASS; 18 direct gate checks APPROVED with digest_match=true; clean detached HEAD 7f5b984 reproduces all five release failures."

findings:
  - id: "T0-F1"
    severity: RESOLVED
    finding: "The initial worktree baseline could not see governed artifacts that were then untracked."
    measurement: "After fast-forward to 7f5b984, git ls-files lists all artifacts for artifact-governance-model, artifact-governance-enforcement and stabilize-architecture-skill-bundle."
    why_it_matters: "Receipt subjects are now preserved in git and visible from the isolated worktree."
    consequence_for_this_work_item: "AC-009 can be checked from the worktree; trusted-receipt protocol validation remains canonical-root-only because report paths are absolute by design."
    disposition: "RESOLVED_BY_BASELINE_UPDATE"
    surfaced_by: "T0 baseline comparison between worktree and main tree, which is the reason the plan required a baseline before any other task."
  - id: "T7-F1"
    severity: MEDIUM
    finding: "Five release-only unit files expect 41 skills while the tracked canonical source contains 42."
    measurement: "release-candidate-artifact-smoke, release-install-all-smoke, release-rollback-smoke, release-surface and workflow-bundle-runtime-parity fail only on 41-versus-42 assertions; all other unit files, including every P2 test, pass."
    why_it_matters: "The aggregate unit command cannot be reported green."
    consequence_for_this_work_item: "P2 cannot change those expectations because s04 explicitly excludes release, version bump and bundle inventory registration."
    disposition: "BASELINE_FINDING_NOT_P2_REGRESSION; route to the release/inventory work item or approve a spec change before editing release expectations."

implemented_changes:
  - "Artifact reference resolver and safe YAML subset parser"
  - "Configurable six-layer placement validation with visible exemptions"
  - "Five ownership duplication rules"
  - "Section-first/legacy-fallback execution readers"
  - "Section-only multi-agent scaffold with plural schemas and merge integrity"
  - "Registered role-indexed handoff naming escape hatch"
doc_changes:
  - "workflow-chain.md now defines the owning sections, compatibility rule and role-indexed filename contract"
  - "workflow-contracts.config.json declares shipped artifact-governance roots"
operational_notes:
  - "All package edits stayed inside the P2 worktree; the user-owned dirty files in main were not modified."
  - "Protocol/receipt validation runs from the canonical repository root because work-item reports intentionally store canonical absolute paths."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/workflow-gate-evidence-utils.test.js"
  - "packages/workflow-bundle/test/validate-workflow-governance.test.js"
  - "packages/workflow-bundle/test/validate-workflow-execution.test.js"
  - "packages/workflow-bundle/test/scaffold-workflow.test.js"
  - "packages/workflow-bundle/test/validate-workflow-artifact-names.test.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
tdd_plan: "T1 and T5 require the failing state as a deliverable. T5 is the reader migration and the only task that can fail silently; its red state per field is the evidence, not the green one. T3, T4 and T6 carry negative fixtures."
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/artifact-governance-enforcement"
  - "branch codex/artifact-governance-enforcement based on 7f5b984"
worktree_reason: "planning_track=full, several boundaries under packages/workflow-bundle, and an overlapping active work item holding write roots in the same package. Required by s04 GOV-04 and executed as T0."
review_status: COMPLETED
review_refs:
  - "T1 review: spec compliance PASS, code quality PASS"
  - "T2-T4 review: spec compliance PASS, code quality PASS"
  - "T5 review before generator change: spec compliance PASS, code quality PASS"
  - "T6 review: spec compliance PASS, code quality PASS"
spec_compliance_status: PASS
code_quality_status: PASS
review_note: "Two-tier review completed in the required order for every batch. Pre-handoff code scan is PARTIAL only because eslint and semgrep are unavailable; syntax passed and manual diff review found and fixed unsafe YAML mapping keys."
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Merge branch codex/artifact-governance-enforcement into main after s08 DoD, not before. Branch finalisation is gated on the DoD verdict per the branch-finish rule."
verify_path:
  - "Per task: the verification_hint on each of T0 to T7 in s06"
  - "Before leaving s07: four validators, unit, fixtures, pack-audit"
  - "AC-009 sweep passed above the 17-work-item floor with 134 notes"
  - "P2 Spec, Contract, DoR, Approach and Task Plan receipts remain digest_match=true"
  - "T7-F1 must be owned by release/inventory scope or opened through a spec change"
```

## Implementation Notes
```yaml
framework_notes:
  - "P2 stays isolated on codex/artifact-governance-enforcement; branch cleanup remains forbidden before s08 DoD."
known_limitations:
  - "Aggregate unit remains red only on five release-inventory tests that hard-code 41 against the tracked 42-skill source. Release/inventory registration is excluded by the approved s04 scope."
notes_for_testing:
  scan_scope: "DIFF_ONLY JavaScript and workflow contract files"
  syntax: "PASS: node --check on all 12 changed/new JavaScript files"
  static_analysis: "SKIP: no project eslint/typecheck wrapper and eslint is unavailable"
  security: "PARTIAL: semgrep unavailable; manual path traversal and object-key review completed; unsafe __proto__/constructor/prototype YAML keys now fail with ARTIFACT_REFERENCE_YAML_INVALID"
  performance_heuristic: "PASS: resolver reads bounded local artifacts synchronously in CLI validation; no new hot runtime path, network call, unbounded recursion or role-dependent file growth"
  overall_status: PARTIAL
  s08_action: "Repeat/finalize the scan conclusion in s08 and keep T7-F1 explicit."
```

## Traceability
```yaml
upstream:
  - "artifact-governance-enforcement.s06.task-breakdown.md#Artifact Chính"
  - "artifact-governance-enforcement.s05.technical-approach.md#Artifact Chính"
task_to_acceptance:
  - "T0 -> baseline obligation for AC-009"
  - "T1 -> AC-010"
  - "T2 -> AC-007"
  - "T3 -> AC-006, AC-008, AC-009"
  - "T4 -> AC-005, AC-009"
  - "T5 -> AC-004"
  - "T6 -> AC-001, AC-002, AC-003"
  - "T7 -> AC-009 and receipt integrity"
next_step: "T7 evidence is in s08; resolve or formally disposition T7-F1 before QC decides DoD."
```

## Handoff
- Done: **T0 through T7.** T7 evidence is recorded in the draft s08 verification note; all P2 criteria pass with zero P2-introduced regressions.
- Open finding **T7-F1**: five release-only tests hard-code 41 skills while the tracked source has 42. The approved P2 scope excludes release and bundle inventory registration, so this note does not hide the failure or widen scope silently.
- Receipt integrity: P2 Spec, Contract, DoR, Approach and Task Plan remain `APPROVED`, all with `digest_match=true`; canonical-root protocol validation passes.
- Next human/owner action: route the 41-to-42 release inventory correction to its owning work item, or approve a spec change if P2 should absorb it.

## CHANGE-003 Implementation Delta

> [!summary]
> CHANGE-003 resolves T7-F1 through the approved additive v2.5.0 release boundary. T8-T11 are complete; the candidate and rollback tasks remain deliberately unopened until the package input identity below is frozen.

### Task Progress Delta
```yaml
progress:
  - id: T8
    status: DONE
    outcome: "Changed the five release-contract tests first and observed the expected RED against the pre-v2.5.0 source state. Assertions now cover v2.5.0/42, EN/VI artifact-governance completeness, frozen historical notes, exact candidate identity, and exact rollback identity."
    evidence:
      red: "5/5 affected release files failed only on the approved version, inventory, bilingual-content, or exact-input delta before T9/T10."
      history_guards:
        v2_3_2_note_sha256: "476b3804e3fb901feb0ede4f817c31475072b1c578de4bdeab8c2d2a10fed98d"
        v2_4_0_note_sha256: "2b84621cccae1e0126287d9de48fa425dada7fd833b92d722fac33e2c15755a5"
        rollback_v2_4_0_sha256: "44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e"
  - id: T9
    status: DONE
    outcome: "Added the canonical Vietnamese artifact-governance skill and regenerated both runtimes with the official sync path."
    evidence: "Canonical/Codex/Claude inventories are 42/42/42; recursive artifact-governance diffs are zero; workflow pack audit passes."
  - id: T10
    status: DONE
    outcome: "Bumped structured bundle metadata to v2.5.0 and aligned all reviewed English/Vietnamese current-candidate surfaces without changing frozen release notes."
    evidence: "Five release tests and bump-version test pass; current surfaces report v2.5.0/42 and explicitly remain candidate-only before Release approval."
  - id: T11
    status: DONE
    outcome: "Completed the integrated source matrix and the final two-tier review, then froze a deterministic package-input identity before any candidate tarball existed."
    evidence:
      unit: "36/36 test files PASS"
      workflow: "validate 139 files/135 notes; naming 139; governance 135; SDD 23; change 19; execution 135; planning 135; fixtures 10 PASS"
      packaging: "workflow-pack audit PASS; source bundle smoke PASS; npm pack dry-run reports v2.5.0, 536 files, 4232847 unpacked bytes"
      runtime: "42/42/42; recursive artifact-governance diff 0"
      syntax: "node --check PASS for every changed/new JavaScript file"
      static_analysis: "PARTIAL: project ESLint wrapper and Semgrep are unavailable; no HIGH finding from manual diff/security review"
      security: "PASS by manual targeted review: argv-based execFileSync, bounded local paths, and explicit prototype-pollution key rejection"
      performance: "PASS heuristic: bounded artifact-tree I/O, no network path or unbounded hot loop"
      text_and_diff: "UTF-8 PASS for 50 changed/new text files; git diff --check PASS"
      receipts: "Canonical protocol validates 4 protocol-managed work items and skips 16 allowed legacy items; current work item status is ACTIVE at s07"
      exact_input_negatives: "Missing candidate and missing rollback tarball cases both fail loudly before execution"
      package_input_sha256: "c83c457cd4aef998f0309f5d5eecc529cecd33f460cc930b9b5d6a8881636b58"
candidate_input_freeze:
  identifier_kind: "npm-pack-file-set-sha256"
  identifier: "c83c457cd4aef998f0309f5d5eecc529cecd33f460cc930b9b5d6a8881636b58"
  file_count: 536
  unpacked_size: 4232847
  candidate_exists_at_freeze: false
  mutation_rule: "Any later mutation to a package input invalidates T11 and returns execution to the full pre-candidate matrix before packing."
verification_progress:
  - id: T12
    status: DONE
    outcome: "Created exactly one retained v2.5.0 candidate from the frozen input and passed the exact-artifact install/update matrix."
    evidence:
      path: ".claude/worktrees/artifact-governance-enforcement/packages/workflow-bundle/workflow-bundle-2.5.0.tgz"
      size_bytes: 914217
      entry_count: 536
      unpacked_size: 4232847
      sha256: "36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec"
      installed_version: "2.5.0"
      install_update_matrix: "PASS 4/4: Codex/Claude x global/project"
      managed_inventory: "42 in every scenario; artifact-governance EN/VI present in both packaged runtimes"
      unmanaged_changes: 0
  - id: T13
    status: DONE
    outcome: "Installed the exact retained v2.4.0 tarball over the exact v2.5.0 candidate in four isolated scenarios and proved the 42-to-41 rollback contract."
    evidence:
      candidate_sha256: "36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec"
      rollback_sha256: "44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e"
      rollback_matrix: "PASS 4/4: Codex/Claude x global/project"
      installed_version: "2.4.0"
      managed_inventory: "41 in every scenario; artifact-governance absent after rollback"
      unmanaged_changes: 0
post_candidate_integrity:
  package_input_sha256: "c83c457cd4aef998f0309f5d5eecc529cecd33f460cc930b9b5d6a8881636b58"
  candidate_sha256: "36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec"
  status: PASS
  note: "Three ignored byte-identical '* 2.md' sync residues appeared after pack, were absent from the candidate inventory, and were removed without changing tracked/package inputs; the frozen 536-file identity and candidate digest both revalidated."
```

### CHANGE-003 Two-Tier Review
```yaml
spec_compliance:
  status: PASS
  evidence:
    - "AC-001 through AC-010 remain green under the complete P2 regression matrix."
    - "AC-011: artifact-governance has EN/VI source and byte-equal runtime copies."
    - "AC-012: canonical/Codex/Claude inventories are exactly 42/42/42."
    - "AC-013: current surfaces are v2.5.0/42; v2.4.0 and v2.3.2 hashes are unchanged."
    - "AC-014 and AC-015 exact-input contracts reject unresolved artifacts; positive artifact checks remain owned by T12/T13."
    - "AC-016 pre-candidate source gate is green; post-candidate evidence remains owned by T12/T13."
  drift: "NONE"
code_quality:
  status: PASS
  evidence:
    - "Generated runtimes were synchronized from the canonical owner, not edited independently."
    - "Exact-artifact harnesses use absolute paths, lowercase SHA-256 values, argv execution, isolated temp roots, and deterministic cleanup."
    - "Historical-release assertions are file-scoped SHA-256 guards rather than broad text replacement."
  high_findings: []
  tool_limitations:
    - "ESLint unavailable"
    - "Semgrep unavailable"
review_order: "SPEC_COMPLIANCE -> CODE_QUALITY"
verdict: PASS
```

### CHANGE-003 Handoff
- T7-F1 is now **RESOLVED_BY_CHANGE_003** at source level: all 36 unit files pass with the truthful v2.5.0/42 contract.
- Candidate input remains `c83c457cd4aef998f0309f5d5eecc529cecd33f460cc930b9b5d6a8881636b58`; the retained candidate is SHA-256 `36615668ad2bcc752998d33e4e7e6f837aef3f1feabf83b04aecd612cabb92ec`.
- T12 exact install/update and T13 exact rollback both pass 4/4. Next: s08 evidence and human-controlled DoD, Release, and Business Acceptance review. No tag, publish, live-global update, merge, or worktree cleanup is authorized.
- Not claimed: human-approved `DoD`, `Release`, `Business Acceptance`, merge, or branch cleanup. Those remain gated on `s08` receipts.
