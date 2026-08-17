---
artifact_id: "stabilize-architecture-skill-bundle.s07.implementation"
artifact_family: workflow-step
work_item_slug: "stabilize-architecture-skill-bundle"
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
governance_profile: strict
governance_status: CHECKS_PENDING
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
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "stabilize-architecture-skill-bundle.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Step Contract
```yaml
step_goal: "Implement approved CHANGE-002 as the smallest compatible v2.4.0 delta in the isolated worktree."
input_summary:
  - "Approved s04 Spec, Contract, and DoR receipts"
  - "Approved s05 Approach receipt"
  - "Approved s06 Task Plan receipt"
  - "CHANGE-002 and the reviewed v2.3.2 findings"
output_summary:
  - "Permission-safe managed install/update and runtime sync"
  - "Corrected sa/ta contracts and stronger evidence validation"
  - "Canonical architecture-modeling skill with deterministic drawio tooling"
  - "Generated 41-skill runtimes and aligned v2.4.0 release surfaces"
  - "TDD and targeted two-tier review evidence for s08"
done_when:
  - "T0-T8 are implemented and their focused checks pass"
  - "No approved acceptance criterion or change requirement is uncovered"
  - "A retained candidate and remaining human gate handoff are recorded without a DoD claim"
owner: "developer"
```

## Artifact Chính
```yaml
implemented_changes:
  - "T0 complete: activated s07 and created the approved ignored in-repo worktree at baseline b6424ddc8a98bafe0e8738211a61b940668d5222."
  - "T1 complete: managed install/update and runtime sync recover owner access only on explicit managed targets; runtime sync preserves unmanaged siblings."
  - "T2 complete: sa/ta schemas, lens ownership, worked examples, ten-metric inventory, computed coverage, metadata, and bilingual structure are internally consistent."
  - "T3 complete: strict/regulated semantic evidence and receipt-consistency validation reject the five named negative classes; contradictory protocol state is corrected without rewriting audit history."
  - "T4 complete: canonical architecture-modeling defines one-model/two-audience views, exact format routing, and mutually exclusive house/built-in render ownership in EN/VI."
  - "T5 complete: zero-dependency deterministic mxGraph rendering and validation support constrained landscape/integration views with retained quality evidence."
  - "T6 complete: both generated runtimes contain 41 skills and are recursively byte-equal to the canonical skill tree."
  - "T7 complete: v2.4.0 candidate metadata, release-candidate docs, 41-skill inventory, release notes, compatibility, limitations, rollback, and gate boundaries are aligned without claiming publication."
  - "T8 complete: integrated validation, install-all/update, v2.3.2 rollback, security/performance hardening, candidate packaging, digest capture, and final two-tier review evidence are retained for s08."
doc_changes:
  - "Workflow-chain routing, required-block mapping, s05 template/schema catalog, release-candidate docs, this implementation note, and CHANGE-002 execution evidence are aligned."
operational_notes:
  - "Baseline runtime sync reported bundle_version=2.3.2, modes=claude,codex, skills=80 (40 per runtime)."
  - "Node v26.5.0 and npm 11.17.0."
  - "The three T1-focused baseline tests passed before adding the red assertions."
  - "Main-root user-owned dirty paths are excluded from the implementation branch."
  - "T1 red evidence: hardened utility fixture failed with EACCES in six managed write paths; hardened runtime copy failed with ENOTEMPTY; the four-scenario helper was initially absent."
  - "T1 green evidence: three focused tests, Codex/Claude x global/project matrix, bundle smoke, hardened runtime resync, unmanaged SHA-256/mode comparison, symlink refusal, and git diff --check pass."
  - "T2 red evidence: 67 contract assertions failed across compact YAML, binary enum, copied examples, lens ownership, missing M-10, stale metric count, coverage values, required input-issue keys, and metadata."
  - "T2 green evidence: architecture-role contract test, pack audit, shared-reference equality, semantic EN/VI structure, UTF-8 decoder, and git diff --check pass."
  - "Skill-creator quick_validate.py was attempted for sa and ta but skipped because the host lacks PyYAML; the dependency-free repo audit and focused contract test are the recorded alternative."
  - "T3 red evidence: semantic, stale-receipt, and protocol-state tests failed because their helpers and activate blocker reset did not exist."
  - "T3 green evidence: four focused test files, 10 governance fixture cases, the 13-case authoring smoke, full unit suite, live 134-note governance validation, and live 3-item protocol validation pass."
  - "T3 correction evidence: two superseded authoring artifacts and two quarantined/miscalculated s08 artifacts retain their original SHA-256; five new gate receipts match reviewer, timestamp, artifact ref, and digest."
  - "T4 red evidence: the architecture-modeling contract test failed for all 9 missing canonical files."
  - "T4 green evidence: architecture-modeling contract, architecture-role regression, 41-skill pack audit, 154 resolved references, UTF-8 decoding, and git diff --check pass."
  - "T4 skill-creator quick_validate.py was attempted but skipped because PyYAML is absent; the focused dependency-free contract test and pack audit are the alternative verify path."
  - "T5 red evidence: renderer/layout/validator files were absent, and the added model-digest assertion caught hashing of invocation state rather than architecture_model only."
  - "T5 green evidence: owner refusal, quality-failure, deterministic digest, XML escaping/tamper, xmllint, stable IDs, geometry, and retained representative artifact/report checks pass."
  - "T5 automated quality is PASS, but overall quality remains PARTIAL and PENDING_QC_FIRST_OPEN; the agent did not self-approve visual evidence."
  - "T6 red evidence: both runtimes contained 40/41 skills, lacked architecture-modeling, and carried stale sa/ta bytes before sync."
  - "T6 green evidence: runtime sync reports 82 copies; 41/41/41 counts, recursive equality, diff -qr, focused contracts, pack audit, bundle smoke, package dry-run inclusion, and git diff --check pass."
  - "T6 packaging evidence: npm pack --dry-run includes 82 runtime SKILL.md files plus both complete architecture-modeling trees; an isolated writable cache was used because the host npm cache is not writable."
  - "T7 red evidence: release-surface reported 18 missing/conflicting assertions, and bump-version safety failed while its public-doc replacement remained broad."
  - "T7 green evidence: release-surface, bump-version, v2.4.0 package dry-run, runtime parity, pack audit, sequential bundle smoke, hardened update matrix, UTF-8 decoding, and git diff --check pass."
  - "T7 historical-evidence guard: bump-version now updates structured metadata only; v2.3.2 retains its recorded verification values under a dated supersession warning and CHANGE-002 correction link."
  - "T7 diagnostic sequencing: an attempted parallel run invoked three runtime sync writers concurrently and temporarily produced a partial generated tree; one sequential sync followed by parity/smoke restored 82/82, and T8 serialized every runtime-mutating check."
  - "Corrective T1 red evidence: an unmanaged 0440 file inside the managed policies tree changed to 0640 during update; the added regression assertion failed for the expected mode mismatch."
  - "Corrective T1 green evidence: support-policy sync prepares only source-corresponding managed directories/files; the focused utility test and Codex/Claude x global/project matrix preserve unmanaged content and mode inside and outside policies."
  - "Corrective pack-integration red evidence: the audit had no architecture-modeling s05 integration check; the new assertion failed until routing, required-block mapping, template, and schema catalog markers were present."
  - "Corrective pack-integration green evidence: workflow pack audit explicitly reports workflow_skill_integration::architecture-modeling PASS across the backbone and s05 contract surfaces."
  - "T8 integrated evidence: 34 unit test files, 13 authoring smoke cases, 10 governance fixture cases, a latest recorded live run of 138 notes, 4 managed protocol items, pack audit, bundle smoke, runtime parity, release-surface, xmllint, native JavaScript syntax, UTF-8/JSON/YAML, and diff checks pass."
  - "T8 install evidence: the serialized Codex/Claude x global/project install-all/update matrix passes 4/4 with 41 skills and unchanged unmanaged SHA-256/mode snapshots, including an unmanaged marker inside policies/codex."
  - "T8 rollback evidence: the actual v2.4.0 -> v2.3.2 install transition passes for Codex/Claude x global/project (4/4), changes 41 to 40 skills, removes architecture-modeling, and preserves unmanaged snapshots; v2.3.2 update is explicitly unsupported for this downgrade."
  - "T8 hardening review: managed-manifest path traversal is rejected before chmod/remove/copy, and drawio models above 25 engineering elements are rejected before layout; both protections have fail-first regression tests."
  - "T8 exact-artifact evidence: the new pack-install smoke installs the produced tarball through npm, runs wfc version, confirms architecture-modeling in both packaged runtimes, and passes full-install Codex/Claude x global/project 4/4."
  - "T8 candidate evidence: workflow-bundle-2.4.0.tgz is retained unpublished at 886190 bytes with 518 entries, 41 SKILL.md files per runtime, 12 architecture-modeling files per runtime, and SHA-256 44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e."
  - "T8 source freeze: the candidate was produced from clean commit e6190bd14b4f0156b159c23de2df850c401745d9; the prior 7061740/aee0fa candidate is superseded, the retained tarball passed an exact-file smoke, and no post-candidate tracked source edit was made."
  - "Code-scan status is PARTIAL because eslint and semgrep are unavailable in this dependency-free package; native syntax checks, focused security tests, manual changed-code review, and performance heuristics found no open HIGH issue."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "T1: packages/workflow-bundle/test/workflow-bundle-utils.test.js"
  - "T1: packages/workflow-bundle/test/sync-workflow-bundle-runtime.test.js"
  - "T1: packages/workflow-bundle/test/run-workflow-bundle-smoke.test.js"
  - "T2: packages/workflow-bundle/test/architecture-role-skills-contract.test.js"
  - "T3: packages/workflow-bundle/test/validate-workflow-governance.test.js"
  - "T3: packages/workflow-bundle/test/work-item-protocol.test.js"
  - "T3: packages/workflow-bundle/test/run-workflow-authoring-smoke.test.js"
  - "T3: packages/workflow-bundle/tests/fixtures/workflow-governance/*semantic* plus stale/protocol fixtures"
  - "T4: packages/workflow-bundle/test/architecture-modeling-contract.test.js"
  - "T5: packages/workflow-bundle/test/architecture-modeling-drawio.test.js"
  - "T5: packages/workflow-bundle/tests/fixtures/architecture-modeling/representative.drawio"
  - "T5: packages/workflow-bundle/tests/fixtures/architecture-modeling/representative.quality.json"
  - "T6: packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
  - "T7: packages/workflow-bundle/test/bump-version.test.js"
  - "T7: packages/workflow-bundle/test/release-surface.test.js"
  - "T8: packages/workflow-bundle/test/release-install-all-smoke.test.js"
  - "T8: packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
  - "T8: packages/workflow-bundle/test/release-rollback-smoke.test.js"
  - "T8: packages/workflow-bundle/test/audit-workflow-pack.test.js"
  - "T8: managed-manifest path traversal in packages/workflow-bundle/test/workflow-bundle-utils.test.js"
  - "T8: early engineering-element cap in packages/workflow-bundle/test/architecture-modeling-drawio.test.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0"
  - "codex/stabilize-architecture-skill-bundle-v2.4.0@b6424ddc8a98bafe0e8738211a61b940668d5222"
  - "corrective-source@e6190bd14b4f0156b159c23de2df850c401745d9"
  - "candidate-source@e6190bd14b4f0156b159c23de2df850c401745d9"
worktree_reason: "Full-track cross-cutting release change with dirty-main and generated-runtime conflict risk."
review_status: COMPLETED
review_refs:
  - "Approved s06 Early Review Plan R1-R4"
  - "R1 PASS: AC-001/CR-REQ-001 spec compliance, then managed-path/symlink/unmanaged-preservation code quality review."
  - "R2 PARTIAL: T2 spec and code-quality lanes pass; T3 and T4 remain before the batch verdict."
  - "R2 update: T3 SPEC_COMPLIANCE PASS for AC-004/AC-010 and CODE_QUALITY PASS for focused parsers, receipt reuse, backward-compatible profile routing, and preserved history; T4 remains."
  - "R2 PASS: T2-T4 satisfy AC-002 through AC-007 source-contract scope; CODE_QUALITY PASS for explicit resource routing, bilingual parity, close boundaries, and exactly-one-render-owner invariants. Runtime fan-out remains T6, not an R2 gap."
  - "R3 PARTIAL: T5 SPEC_COMPLIANCE PASS for AC-007/AC-008 automated scope and CODE_QUALITY PASS for zero-dependency pure layout, escaping, deterministic validation, and explicit refusal; T6 remains."
  - "R3 PASS: T5-T6 satisfy AC-006 through AC-009 automated scope; CODE_QUALITY PASS for deterministic rendering, refusal boundaries, 41-skill generated inventories, recursive byte equality, audit closure, and package inclusion."
  - "R4 PARTIAL: T7 SPEC_COMPLIANCE PASS for AC-009/AC-010 release-truth and historical-evidence boundaries; CODE_QUALITY PASS for structured-only bumping, explicit doc review, placeholder-free notes, version/inventory assertions, UTF-8, and serialized runtime verification. T8 candidate/rollback evidence remains."
  - "R4 PASS: T7-T8 satisfy AC-001 through AC-010 at the s07 implementation boundary; SPEC_COMPLIANCE PASS for the retained candidate, install/update, rollback, runtime inventory, architecture-modeling, and evidence-truth requirements."
  - "R4 CODE_QUALITY PASS for managed-path confinement, early model-size refusal, deterministic packaging, serialized runtime mutation, regression coverage, UTF-8, and clean source commit. Automated code-scan coverage is explicitly PARTIAL because eslint and semgrep are unavailable; no open HIGH finding remains."
  - "Corrective R4 SPEC_COMPLIANCE PASS: unmanaged policy siblings, architecture-modeling s05 integration, executable rollback, exact-artifact CI, and unpublished release truth now match AC-001/AC-006/AC-007/AC-009/AC-010."
  - "Corrective R4 CODE_QUALITY PASS: minimal managed-target permission preparation, fail-closed audit markers, shell-free execFileSync smoke paths, Node 18/22 CI matrix, YAML/JSON/UTF-8/syntax checks, and 34/34 regression files pass; no open HIGH finding remains."
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Keep branch/worktree intact until s08 DoD and branch-finish decision."
verify_path:
  - "Focused red/green tests after each behavior batch"
  - "Full unit, audit, validator, runtime parity, install smoke, package, UTF-8, and diff checks at T8"
```

## Implementation Notes
```yaml
framework_notes:
  - "worktree_decision=REQUIRED; implementation source changes are isolated from the dirty main root."
  - "review_strategy=TARGETED; review order is SPEC_COMPLIANCE then CODE_QUALITY for R1-R4. Frontmatter review_mode=self records the approved agentic reviewer topology."
  - "execution_mode=agentic; no delegation is approved."
known_limitations:
  - "QC first-open draw.io evidence remains manual and cannot pass before the representative artifact exists."
  - "The formal automated code scan is PARTIAL because eslint and semgrep are not installed; this limitation must remain visible in s08 risk assessment."
  - "Tag, publish, live global update, Release, Business Acceptance, DoD, merge, and cleanup remain out of s07 authority."
```

## Traceability
```yaml
upstream:
  - "stabilize-architecture-skill-bundle.s04.acceptance-criteria.md"
  - "stabilize-architecture-skill-bundle.s05.technical-approach.md"
  - "stabilize-architecture-skill-bundle.s06.task-breakdown.md"
  - "changes/CHANGE-002/design.md"
  - "changes/CHANGE-002/tasks.md"
next_step: "Hand the retained unpublished candidate and complete T8/R4 evidence to QC first-open and s08 Verify + DoD without claiming or self-approving DoD, Release, or Business Acceptance."
```

## Handoff
- Outputs actual: T0-T8 implementation/evidence recorded; the corrected unpublished candidate is retained at clean source commit e6190bd14b4f0156b159c23de2df850c401745d9 with SHA-256 44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e.
- Known limitations: Manual QC first-open and human Release/Business Acceptance/DoD gates remain open.
- Notes for testing: s08 should independently confirm the retained digest, candidate install behavior, acceptance coverage, manual draw.io first-open, and the recorded automated-scan limitation.
- Notes for deployment khi có: No live global install, tag, publish, merge, or worktree cleanup is authorized in s07.
