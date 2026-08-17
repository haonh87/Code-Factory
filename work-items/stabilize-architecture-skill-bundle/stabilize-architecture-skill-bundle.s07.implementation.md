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
review_mode: targeted
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
doc_changes:
  - "This implementation note and CHANGE-002 task status record T0 evidence."
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
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0"
  - "codex/stabilize-architecture-skill-bundle-v2.4.0@b6424ddc8a98bafe0e8738211a61b940668d5222"
worktree_reason: "Full-track cross-cutting release change with dirty-main and generated-runtime conflict risk."
review_status: PARTIAL
review_refs:
  - "Approved s06 Early Review Plan R1-R4"
  - "R1 PASS: AC-001/CR-REQ-001 spec compliance, then managed-path/symlink/unmanaged-preservation code quality review."
  - "R2 PARTIAL: T2 spec and code-quality lanes pass; T3 and T4 remain before the batch verdict."
  - "R2 update: T3 SPEC_COMPLIANCE PASS for AC-004/AC-010 and CODE_QUALITY PASS for focused parsers, receipt reuse, backward-compatible profile routing, and preserved history; T4 remains."
  - "R2 PASS: T2-T4 satisfy AC-002 through AC-007 source-contract scope; CODE_QUALITY PASS for explicit resource routing, bilingual parity, close boundaries, and exactly-one-render-owner invariants. Runtime fan-out remains T6, not an R2 gap."
  - "R3 PARTIAL: T5 SPEC_COMPLIANCE PASS for AC-007/AC-008 automated scope and CODE_QUALITY PASS for zero-dependency pure layout, escaping, deterministic validation, and explicit refusal; T6 remains."
spec_compliance_status: PARTIAL
code_quality_status: PARTIAL
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
  - "review_mode=TARGETED; review order is SPEC_COMPLIANCE then CODE_QUALITY for R1-R4."
  - "execution_mode=agentic; no delegation is approved."
known_limitations:
  - "QC first-open draw.io evidence remains manual and cannot pass before the representative artifact exists."
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
next_step: "Continue T6-T8, complete early review, then hand evidence to s08 Verify + DoD."
```

## Handoff
- Outputs actual: T0-T5 implementation/evidence recorded; T6-T8 remain active.
- Known limitations: Manual QC first-open and human Release/Business Acceptance/DoD gates remain open.
- Notes for testing: Preserve fail-first command/output evidence and rerun focused tests after each minimal fix.
- Notes for deployment khi có: No live global install, tag, publish, merge, or worktree cleanup is authorized in s07.
