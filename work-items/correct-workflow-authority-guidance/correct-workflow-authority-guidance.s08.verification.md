---
artifact_id: "correct-workflow-authority-guidance.s08.verification"
artifact_family: workflow-step
work_item_slug: "correct-workflow-authority-guidance"
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
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
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
execution_roles: [developer, qc, ba]
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
  dod: [qc]
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "correct-workflow-authority-guidance.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> Technical checks pass. AC-AUTH-005, human QC verification and DoD remain pending. This draft supports review; it does not approve a gate, conclude whole-M7 PASS, or authorize branch finalization.

## Step Contract
```yaml
step_goal: "Verify AC-AUTH-001..006 and prepare a bounded BA/QC decision without inheriting parent approval."
input_summary:
  - "s04 accepted criteria, frozen s05/s06 and s07 implementation evidence."
output_summary:
  - "Technical results, eight source identities and proposed language scores."
done_when:
  - "AC coverage, required human decisions and trusted DoD evidence are complete."
owner: "qc; human BA owns the bounded language assessment"
```

## Main Artifact
```yaml
verification_target: "Eight repaired authority scopes and the new static regression."
risk_ranked_test_matrix:
  - risk: "Guidance grants writes or skips applicable human gates."
    severity: critical
    required_evidence: "Original-defect RED, corrected controls, negative mutations and human BA/QC review."
  - risk: "Guidance implies AI DoD or wrong lifecycle entry."
    severity: critical
    required_evidence: "Paired source checks and preserved DoD schema; explicit human review."
  - risk: "Collateral source/runtime or authoring-host drift."
    severity: medium
    required_evidence: "Full suite, pack audit, exact scope/hash and receipt checks."
test_strategy:
  unit_test:
    required: true
    rationale: "Focused static contract plus the existing complete unit runner."
  integration_test:
    required: true
    rationale: "Existing runner covers lifecycle/runtime integration; local pack generation and audit."
  database_test:
    required: false
    rationale: "No database surface."
  feature_test:
    required: false
    rationale: "No application/UI/runtime feature change; human language review covers the changed reader behavior."
negative_cases:
  - "Read-only exception or clarity-as-write permission."
  - "Any-one/omitted full or Light prerequisite, draft-as-pass, unqualified ACTIVE, invented Light s05."
  - "s01 activation, unrestricted legacy read, scaffold-as-approval, list as future-only."
  - "AI self-approval, unqualified DoD evaluation, missing evidence check or schema enum drift."
regression_targets:
  - "Both languages, full and Light, existing protocol and trusted approval behavior."
manual_exploration:
  flows_checked:
    - "Reader follows summary/analysis, authoring-to-activation and advisory-to-human DoD instructions."
    - "New test uses fixed local source paths and in-memory mutations; no shell/network/secrets."
  issues_found: []
criteria_results:
  - criterion: AC-AUTH-001
    result: PASS
    evidence: "Read-only positive controls and negative mutations in EN/VI; s07 original RED."
  - criterion: AC-AUTH-002
    result: PASS
    evidence: "Every applicable full/Light prerequisite and independent approval control; omission/draft/extra-s05 mutations rejected."
  - criterion: AC-AUTH-003
    result: PASS
    evidence: "Authoring s01 versus activation s07, operative list and bounded legacy controls pass."
  - criterion: AC-AUTH-004
    result: PASS
    evidence: "Advisory/human authority controls; unchanged output schema and all six evidence checks."
  - criterion: AC-AUTH-005
    result: PARTIAL
    evidence: "Eight hashed scopes and proposed scores below; human BA/QC decisions absent."
  - criterion: AC-AUTH-006
    result: PASS
    evidence: "Original eight failures; corrected 56 checks with 48 mutations rejected; auto-discovered in 46-file complete runner."
test_evidence:
  unit_test:
    - "Focused: 56 PASS, 0 FAIL, 48 negative mutations rejected."
    - "Complete runner: 46 workflow-bundle unit test files PASS."
  integration_test:
    - "Existing full runner PASS; local runtime generation and pack audit PASS."
  database_test: []
  feature_test: []
commands_run:
  - "See Technical Verification below for commands/results."
skipped_checks:
  - "ESLint and Semgrep unavailable; no repository configuration or applicable script for either. No scanner PASS is claimed."
  - "Separate app build/type-check, database and deployment tests not applicable to this prose/static-test change."
release_blockers:
  - "Publication and installation are outside this child's scope."
status: PARTIAL
gaps:
  - "Human BA language decision, human QC verification and human DoD."
residual_risks:
  - "Static lexical assertions cover known counterexamples and can reject legitimate rewording; they do not prove arbitrary natural-language correctness."
  - "The remaining parent M7 corpus is unrepaired by this child."
recommendation: "Review the bounded packet, then complete T8 through the normal human-controlled flow."
notes_for_review:
  - "Do not reuse authoring acceptance as BA/QC/DoD approval."
```

## Technical Verification

Executed on 2026-10-04 in the child worktree using Node 22.23.2. Commands below use node for that executable. These are local verification operations; no installation, publication or release gate is involved.

| Command / check | Result and limits |
| --- | --- |
| node packages/workflow-bundle/test/workflow-authority-guidance.test.js | PASS: 56 checks; 48 negative mutations rejected. Original RED is recorded in s07. |
| node --check packages/workflow-bundle/test/workflow-authority-guidance.test.js | PASS. |
| node packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js | PASS: bundle 2.6.3, 42 skills per harness / 84 derived entries; legacy manifest absent. |
| node packages/workflow-bundle/test/run-all.js | PASS: 46 test files, including new regression. |
| node packages/workflow-bundle/scripts/audit-workflow-pack.js --repo-root . | PASS: 42 skills and 171 skill-to-skill references. |
| git diff --check | PASS before evidence authoring; final evidence check below. |
| Strict UTF-8 / replacement-character check | PASS on eight changed sources plus regression; final evidence check below. |

Full runner scratch log: /private/tmp/cf-authority-implement-r914fojm/unit.log. The durable result is recorded here; the temporary log may expire. Frozen s06 contains the complete reproducible command sequence.

## Final Evidence Checks — 2026-10-04

Child naming, governance, execution and planning validators each PASS for eight notes. Repository protocol PASS for 21 managed work items, with 21 explicitly configured legacy skips. Work-item status remains ACTIVE/s07 and APPROVED; each of Spec, DoR, Approach and Task Plan reports APPROVED with digest_match=true. The initial gate-status invocation omitted --gate and was rejected without mutation; explicit per-gate checks above replace that invocation.

The eight source hashes match the bounded review table. Frozen child s04/s05/s06, tracked runtime/validator implementation and the package manifest remain byte-identical to the pre-implementation snapshot. All 19 root untracked file hashes and main/backup/evals refs are preserved. Report and s01 protocol contents remain exactly as produced by the existing approval/activation CLI; evidence authoring does not edit them. No generated runtime output is staged.

All five trusted signatures also pass production isTrustedReceiptSignatureValid/hasApprovedReceipt; all four gate artifact digests match current bytes. Final strict UTF-8 checks pass for all 13 changed text files; both evidence notes parse as YAML (frontmatter and every YAML fence), and git diff --check passes. No scanner, schema or validator was installed or changed to obtain these results.

## Bounded Language Review

Scope is limited to the ranges below, including related authority statements. SHA-256 binds the complete file; scores assess only the stated ranges. Scores are **AI proposals**, not human assessments. Dimension order: clarity (C), naturalness (N), next action (A), terminology (T), role/gate relevance (R). Human acceptance requires zero critical flags, mean >=4 and every dimension >=3.

| Unit / file SHA-256 | Read lines | C / N / A / T / R | Critical (AI) | Source excerpts |
| --- | --- | --- | --- | --- |
| skills/analysis/requirement-analysis/SKILL.md<br>6c0dad6f45767cce36fe8ff469a42a522812d9985980f64c9fdcb9927a6e9633 | 27–33 | 5 / 4 / 5 / 5 / 5 | NO | 31: This skill does not modify code. Summary or analysis requests remain read-only even when the intended change is clear; clarity is not write authorization. |
| skills/analysis/requirement-analysis/SKILL.vi.md<br>19a642e6036df5fbf96c273ae787ceee35489a3974e528c1ae19358679a74581 | 27–33 | 5 / 4 / 5 / 5 / 5 | NO | 31: Skill này không trực tiếp sửa code. Yêu cầu tóm tắt hoặc phân tích luôn chỉ đọc, kể cả khi thay đổi đã rõ; sự rõ ràng không cấp quyền ghi. |
| skills/guardrails/definition-of-done-gate/SKILL.md<br>ee4389ed9f0b8271e327a69f82f9200c3a85d585f86402e0c5c4af5ea1c9bd3c | 1–88 | 5 / 4 / 5 / 5 / 5 | NO | 13: AI prepares an advisory assessment. Only an authorized human QC reviewer can approve DoD at `s08`; protocol-managed completion also requires the applicable trusted receipt and valid protocol transitions. Passing tests or an AI `DONE` recommendation alone never closes the work item.; 43: The `status` field records the AI recommendation, not the human gate decision or protocol status. Keep the human review and trusted receipt separate from this assessment.; 76: 7. Recommend `DONE`, `PARTIAL`, or `BLOCKED` and hand the assessment to the authorized human QC reviewer; do not pass the gate or close the work item yourself. |
| skills/guardrails/definition-of-done-gate/SKILL.vi.md<br>93ab5a193174077a86b5b044140d93f9e4575d871355900d6b4ccc4d8a9596ab | 1–88 | 4 / 4 / 5 / 4 / 5 | NO | 13: AI lập đánh giá đề xuất. Chỉ human reviewer có thẩm quyền QC mới được approve DoD tại `s08`; việc hoàn tất work item do protocol quản lý còn cần trusted receipt tương ứng và các transition protocol hợp lệ. Test pass hoặc đề xuất `DONE` của AI không tự đóng work item.; 43: Field `status` ghi đề xuất của AI, không phải quyết định human gate hoặc trạng thái protocol. Giữ human review và trusted receipt riêng với đánh giá này.; 76: 7. Đề xuất `DONE`, `PARTIAL` hoặc `BLOCKED` và chuyển đánh giá cho human reviewer có thẩm quyền QC; không tự pass gate hoặc đóng work item. |
| skills/orchestration/codex-workflow-chain/SKILL.md<br>84d56f1bad1d2885f5c59e1140650f30d57c9f1c62b8bec5d0778e00d4525b1b | 85–106, 237–274, 319–358 | 4 / 4 / 5 / 4 / 5 | NO | 87: Do not start `s07 Implement` until **all applicable** prerequisites have passed human review. A draft artifact is not a passed gate.; 89: For `sdd_mode=light`: `s04` hosts `Spec` and `DoR`; `s06` hosts `Approach` and `Task Plan`. Each gate still needs its own trusted receipt.; 90: Light has no separate `s05` physical note or receipt; all eight logical steps remain. See the Light profile below for eligibility and additional applicable gates.; 265: `ACTIVE` requires human-passed `work item approval`, `change package approval` when present, the `greenfield` `bootstrap gate` when present, and all applicable authoring gates with current trusted receipts (full/non-Light: `s04`, `s05`, `s06`; Light: `s04`, `s06`, with independent receipts for each gate). |
| skills/orchestration/codex-workflow-chain/SKILL.vi.md<br>bbad7cea83022a322f5a3d72daabd6dc4bff7bd6507c55e98fe923bf327afe22 | 85–105, 236–273, 318–356 | 4 / 4 / 5 / 4 / 5 | NO | 87: Chỉ bắt đầu `s07 Implement` sau khi **tất cả** điều kiện tiên quyết áp dụng đã qua human review. Artifact nháp không phải gate đã pass.; 89: Với `sdd_mode=light`: `s04` chứa `Spec` và `DoR`; `s06` chứa `Approach` và `Task Plan`. Mỗi gate vẫn cần trusted receipt riêng.; 90: Light không có note vật lý hoặc receipt riêng tại `s05`; vẫn giữ đủ tám bước logic. Xem profile Light bên dưới để biết điều kiện áp dụng và các gate bổ sung khi cần.; 264: `ACTIVE` yêu cầu human pass cho `work item approval`, `change package approval` khi có, `bootstrap gate` của `greenfield` khi có và tất cả authoring gate áp dụng với trusted receipt còn khớp (full/không dùng Light: `s04`, `s05`, `s06`; Light: `s04`, `s06`, mỗi gate có receipt độc lập). |
| skills/orchestration/codex-workflow-chain/references/work-item-protocol.md<br>d18f407a2e81ff91e84ab4f80d10cb1838940bcf087508bb837fe1b20e163b43 | 33–59, 143–153, 235–246, 298–322, 545–614 | 4 / 4 / 5 / 4 / 5 | 55: `list` and `status` may bootstrap a read-only report from old `s01` only when `protocolControl.legacyScaffoldPolicy=allow_readonly`; 305: begin authoring at `s01`; scaffolding does not approve gates or open implementation; 316: open implementation at `s07` after all applicable human approvals and write grants are in place | 53: for `brownfield`, the protocol still allows materialize/scaffold for authoring, but the work item must declare `delivery_context=brownfield` and follow enough of the backbone's baseline/impact/regression output before implementing; 303: lock the `change_strategy`; 317:  |
| skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md<br>178628a5433669f6951333f842fa155726abb71f5d6db0483874e44b27fe52fc | 33–59, 143–153, 235–246, 298–322, 524–592 | 4 / 4 / 5 / 4 / 5 | 55: `list` và `status` có thể bootstrap report read-only từ `s01` cũ chỉ khi `protocolControl.legacyScaffoldPolicy=allow_readonly`; 305: bắt đầu authoring tại `s01`; scaffold không phê duyệt gate hoặc mở implementation; 316: mở implementation tại `s07` sau khi đủ mọi human approval áp dụng và phạm vi được cấp quyền ghi | 53: với `brownfield`, protocol vẫn cho phép materialize/scaffold để authoring, nhưng work item phải khai báo `delivery_context=brownfield` và bám đủ output baseline/impact/regression của backbone trước khi implement; 303: khóa `change_strategy`; 317:  |

The proposed cohort totals 182/200 (mean 4.55/5), with minimum dimension 4 and zero proposed critical flags. Naturalness/terminology scores of 4 acknowledge the existing mixed EN/VI workflow vocabulary and dense gate references. The read-only scopes state the action boundary directly; the DoD and lifecycle scopes identify the human reviewer and prerequisite handoff. This is a bounded proposal, not a new 147-unit parent score.

```yaml
human_language_review:
  status: NOT_REVIEWED
  reviewer: ""
  reviewed_at: ""
  decision: ""
  accepted_score_scope: ""
human_qc_verification:
  status: NOT_REVIEWED
  reviewer: ""
  reviewed_at: ""
  decision: ""
```

The human BA should accept or amend the eight rows and identify any critical authority/action defect. QC should then confirm AC coverage and the scan limitations. A single human may act in the applicable authorized roles, but each decision must be explicit. DoD remains separate and requires its normal trusted receipt after the finalized s08 host is accepted.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Work-item and authoring receipts were verified before implementation; frozen s04/s05/s06 remain unchanged."
  - "Exact granted source/test boundary; report and s01 protocol block owned by CLI."
  - "Ordered targeted developer review in s07; no independent reviewer or delegation claim."
blocking_items:
  - "AC-AUTH-005 human BA/QC review is pending."
  - "Human DoD approval and applicable trusted receipt are absent."
owner: "qc"
next_action: "Complete T7 before T8; keep protocol ACTIVE/s07 while this review packet remains draft."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
```

CLI/runtime implementation, DoD output schema, package version and dependencies are unchanged. The package manifest SHA-256 remains 634d3a2c1dbb7e312883c9471958603b959600334e40cf501265e332c60b8e0f. Rollback is a scoped revert of the correction commit plus local runtime regeneration; no protocol history, signed host or external install should be reset.

## Scan Summary
```yaml
status: PARTIAL
syntax:
  status: PASS
  evidence: "Node --check and complete runner."
static_analysis:
  status: SKIPPED
  reason: "ESLint unavailable; no configured repository lint/type-check surface for this test. Pack audit and manual test review supplement, not replace, a scanner."
security:
  status: SKIPPED
  reason: "Semgrep unavailable; no configured security scanner. Manual review finds fixed local reads, in-memory mutations and no new dependencies, network, shell or secret handling."
performance:
  status: PASS
  evidence: "Heuristic only: eight small files, finite section scans, test-only execution; no runtime hot path."
notes:
  - "No automated security/static-analysis assurance is claimed."
  - "QC must review these justified omissions with the final verification packet."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No user acceptance gate required by the approved child scope; bounded BA review remains applicable separately."]
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No publishing/global install; archived 2.6.3 release is unchanged."]
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["Maintenance repair; BA has the named language-review trigger, not a Business Acceptance gate."]
```

## Audit
```yaml
audit_status: PARTIAL
notes:
  - "Technical checks and s07 ordered review pass."
  - "AC-AUTH-005 and human QC/DoD are pending; no whole-M7 completion."
```

## Definition of Done

Advisory assessment only; no human DoD decision has been supplied.

```yaml
work_item_slug: "correct-workflow-authority-guidance"
status: PARTIAL
checks:
  acceptance_criteria_evidenced: FAIL
  implementation_recorded: PASS
  required_verification_completed: FAIL
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps:
  - "AC-AUTH-005 human BA/QC decisions."
  - "Human QC DoD decision and trusted receipt against a finalized s08."
residual_risks:
  - "Bounded static assertions and scanner omissions as described above."
follow_up_items:
  - "Return bounded evidence to P-SEM/P-LANGUAGE without changing parent M7 or CF-MB2 decisions."
next_action: "Human BA review of the eight rows, then QC verification and DoD; do not close/merge/clean up now."
```

## Traceability
```yaml
upstream:
  - "correct-workflow-authority-guidance.s04.acceptance-criteria.md"
  - "correct-workflow-authority-guidance.s05.technical-approach.md"
  - "correct-workflow-authority-guidance.s06.task-breakdown.md"
  - "correct-workflow-authority-guidance.s07.implementation.md"
next_step: "T7 human BA review, then T8 human QC/DoD."
```

## Handoff

Technical evidence is ready for review. Parent P-SEM / CF-010 and P-LANGUAGE / CF-012 receive only a bounded contribution after their own integration review. Parent M7, CF-MB2, M10/M11 and master DoD are not passed by this child. All worktrees remain open.
