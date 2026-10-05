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
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
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
  dod_reviewed_by: [qc]
  dod_reviewed_at: "2026-10-05T02:40:09Z"
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

> Verification PASS; the human has explicitly approved child DoD for all six evidenced criteria. This finalized host is ready for trusted signing. Protocol remains VERIFIED/s08 until receipt validation and the normal close transition; parent M7 is unchanged.

## Step Contract
```yaml
step_goal: "Verify AC-AUTH-001..006 and prepare a bounded BA/QC decision without inheriting parent approval."
input_summary:
  - "s04 accepted criteria, frozen s05/s06 and s07 implementation evidence."
output_summary:
  - "Technical results, eight source identities and human-accepted bounded language scores."
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
    result: PASS
    evidence: "Explicit user accept of the BA/QC packet at fcff3b4; eight source hashes and scores unchanged, bounded mean 4.55/5, minimum dimension 4, zero critical flags."
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
release_blockers: []
status: PASS
gaps: []
residual_risks:
  - "Static lexical assertions cover known counterexamples and can reject legitimate rewording; they do not prove arbitrary natural-language correctness."
  - "The remaining parent M7 corpus is unrepaired by this child."
recommendation: "Human DoD is accepted. Seal this finalized host through the normal human-controlled TTY flow, verify the receipt, then perform the normal close transition."
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

Child naming, governance, execution and planning validators each PASS for eight notes. Repository protocol PASS for 21 managed work items, with 21 explicitly configured legacy skips. At the pre-acceptance source checkpoint, work-item status was ACTIVE/s07 and APPROVED; each of Spec, DoR, Approach and Task Plan reports APPROVED with digest_match=true. The initial gate-status invocation omitted --gate and was rejected without mutation; explicit per-gate checks above replace that invocation.

The eight source hashes match the bounded review table. Frozen child s04/s05/s06, tracked runtime/validator implementation and the package manifest remain byte-identical to the pre-implementation snapshot. All 19 root untracked file hashes and main/backup/evals refs are preserved. Report and s01 protocol contents remain exactly as produced by the existing approval/activation CLI; evidence authoring does not edit them. No generated runtime output is staged.

All five trusted signatures also pass production isTrustedReceiptSignatureValid/hasApprovedReceipt; all four gate artifact digests match current bytes. Final strict UTF-8 checks pass for all 13 changed text files; both evidence notes parse as YAML (frontmatter and every YAML fence), and git diff --check passes. No scanner, schema or validator was installed or changed to obtain these results.

## BA/QC Acceptance Checkpoint

The source CLI recorded technical verification after the explicit BA/QC decision using work-item verify with actor agent. The CLI-owned report and s01 projection now identify VERIFIED/s08 with handoff to definition-of-done. No gate approval command, signer or close operation was invoked. At that checkpoint, DoD fields were unset and the host was draft; the later explicit DoD decision is recorded below.

Naming/governance/execution/planning each PASS for eight child notes; post-transition protocol PASS for 21 managed items and 21 configured legacy skips. Existing five signatures and four artifact bindings remain valid. YAML, strict UTF-8 and whitespace checks pass; a bounded table check confirms eight rows with five columns, unchanged hashes and scores, and eight NO critical flags. Source/test bytes are identical to fcff3b4, so its successful 46-file suite is retained without rerunning unchanged production tests for this artifact-only decision record.

## Bounded Language Review

Scope is limited to the ranges below, including related authority statements. SHA-256 binds the complete file; scores assess only the stated ranges. Scores were proposed by the agent and are now **accepted by the human BA/QC reviewer** for this bounded packet. Dimension order: clarity (C), naturalness (N), next action (A), terminology (T), role/gate relevance (R). Human acceptance requires zero critical flags, mean >=4 and every dimension >=3.

| Unit / file SHA-256 | Read lines | C / N / A / T / R | Critical (accepted) | Source excerpts |
| --- | --- | --- | --- | --- |
| skills/analysis/requirement-analysis/SKILL.md<br>6c0dad6f45767cce36fe8ff469a42a522812d9985980f64c9fdcb9927a6e9633 | 27–33 | 5 / 4 / 5 / 5 / 5 | NO | 31: This skill does not modify code. Summary or analysis requests remain read-only even when the intended change is clear; clarity is not write authorization. |
| skills/analysis/requirement-analysis/SKILL.vi.md<br>19a642e6036df5fbf96c273ae787ceee35489a3974e528c1ae19358679a74581 | 27–33 | 5 / 4 / 5 / 5 / 5 | NO | 31: Skill này không trực tiếp sửa code. Yêu cầu tóm tắt hoặc phân tích luôn chỉ đọc, kể cả khi thay đổi đã rõ; sự rõ ràng không cấp quyền ghi. |
| skills/guardrails/definition-of-done-gate/SKILL.md<br>ee4389ed9f0b8271e327a69f82f9200c3a85d585f86402e0c5c4af5ea1c9bd3c | 1–88 | 5 / 4 / 5 / 5 / 5 | NO | 13: AI prepares an advisory assessment. Only an authorized human QC reviewer can approve DoD at `s08`; protocol-managed completion also requires the applicable trusted receipt and valid protocol transitions. Passing tests or an AI `DONE` recommendation alone never closes the work item.; 43: The `status` field records the AI recommendation, not the human gate decision or protocol status. Keep the human review and trusted receipt separate from this assessment.; 76: 7. Recommend `DONE`, `PARTIAL`, or `BLOCKED` and hand the assessment to the authorized human QC reviewer; do not pass the gate or close the work item yourself. |
| skills/guardrails/definition-of-done-gate/SKILL.vi.md<br>93ab5a193174077a86b5b044140d93f9e4575d871355900d6b4ccc4d8a9596ab | 1–88 | 4 / 4 / 5 / 4 / 5 | NO | 13: AI lập đánh giá đề xuất. Chỉ human reviewer có thẩm quyền QC mới được approve DoD tại `s08`; việc hoàn tất work item do protocol quản lý còn cần trusted receipt tương ứng và các transition protocol hợp lệ. Test pass hoặc đề xuất `DONE` của AI không tự đóng work item.; 43: Field `status` ghi đề xuất của AI, không phải quyết định human gate hoặc trạng thái protocol. Giữ human review và trusted receipt riêng với đánh giá này.; 76: 7. Đề xuất `DONE`, `PARTIAL` hoặc `BLOCKED` và chuyển đánh giá cho human reviewer có thẩm quyền QC; không tự pass gate hoặc đóng work item. |
| skills/orchestration/codex-workflow-chain/SKILL.md<br>84d56f1bad1d2885f5c59e1140650f30d57c9f1c62b8bec5d0778e00d4525b1b | 85–106, 237–274, 319–358 | 4 / 4 / 5 / 4 / 5 | NO | 87: Do not start `s07 Implement` until **all applicable** prerequisites have passed human review. A draft artifact is not a passed gate.; 89: For `sdd_mode=light`: `s04` hosts `Spec` and `DoR`; `s06` hosts `Approach` and `Task Plan`. Each gate still needs its own trusted receipt.; 90: Light has no separate `s05` physical note or receipt; all eight logical steps remain. See the Light profile below for eligibility and additional applicable gates.; 265: `ACTIVE` requires human-passed `work item approval`, `change package approval` when present, the `greenfield` `bootstrap gate` when present, and all applicable authoring gates with current trusted receipts (full/non-Light: `s04`, `s05`, `s06`; Light: `s04`, `s06`, with independent receipts for each gate). |
| skills/orchestration/codex-workflow-chain/SKILL.vi.md<br>bbad7cea83022a322f5a3d72daabd6dc4bff7bd6507c55e98fe923bf327afe22 | 85–105, 236–273, 318–356 | 4 / 4 / 5 / 4 / 5 | NO | 87: Chỉ bắt đầu `s07 Implement` sau khi **tất cả** điều kiện tiên quyết áp dụng đã qua human review. Artifact nháp không phải gate đã pass.; 89: Với `sdd_mode=light`: `s04` chứa `Spec` và `DoR`; `s06` chứa `Approach` và `Task Plan`. Mỗi gate vẫn cần trusted receipt riêng.; 90: Light không có note vật lý hoặc receipt riêng tại `s05`; vẫn giữ đủ tám bước logic. Xem profile Light bên dưới để biết điều kiện áp dụng và các gate bổ sung khi cần.; 264: `ACTIVE` yêu cầu human pass cho `work item approval`, `change package approval` khi có, `bootstrap gate` của `greenfield` khi có và tất cả authoring gate áp dụng với trusted receipt còn khớp (full/không dùng Light: `s04`, `s05`, `s06`; Light: `s04`, `s06`, mỗi gate có receipt độc lập). |
| skills/orchestration/codex-workflow-chain/references/work-item-protocol.md<br>d18f407a2e81ff91e84ab4f80d10cb1838940bcf087508bb837fe1b20e163b43 | 33–59, 143–153, 235–246, 298–322, 545–614 | 4 / 4 / 5 / 4 / 5 | NO | 55: `list` and `status` may bootstrap a read-only report from old `s01` only when `protocolControl.legacyScaffoldPolicy=allow_readonly`; 305: begin authoring at `s01`; scaffolding does not approve gates or open implementation; 316: open implementation at `s07` after all applicable human approvals and write grants are in place |
| skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md<br>178628a5433669f6951333f842fa155726abb71f5d6db0483874e44b27fe52fc | 33–59, 143–153, 235–246, 298–322, 524–592 | 4 / 4 / 5 / 4 / 5 | NO | 55: `list` và `status` có thể bootstrap report read-only từ `s01` cũ chỉ khi `protocolControl.legacyScaffoldPolicy=allow_readonly`; 305: bắt đầu authoring tại `s01`; scaffold không phê duyệt gate hoặc mở implementation; 316: mở implementation tại `s07` sau khi đủ mọi human approval áp dụng và phạm vi được cấp quyền ghi |

The accepted cohort totals 182/200 (mean 4.55/5), with minimum dimension 4 and zero critical flags. Naturalness/terminology scores of 4 acknowledge the existing mixed EN/VI workflow vocabulary and dense gate references. The read-only scopes state the action boundary directly; the DoD and lifecycle scopes identify the human reviewer and prerequisite handoff. The decision covers these eight read scopes only; the 147-unit parent score remains unchanged.

```yaml
human_language_review:
  status: APPROVED
  reviewer: "user"
  reviewer_role: "ba"
  reviewed_at: "2026-10-04T13:22:04Z"
  decision: "Explicit chat accept of the requested bounded BA/QC review packet at fcff3b4d53f7fbed76ec78788dd8e20b73447ac6."
  accepted_score_scope: "All eight hashed read scopes and five scores per row; mean 4.55/5, minimum 4, zero critical."
human_qc_verification:
  status: APPROVED
  reviewer: "user"
  reviewer_role: "qc"
  reviewed_at: "2026-10-04T13:22:04Z"
  decision: "Explicit chat accept of the same packet, including AC coverage, regression evidence, residual risks and justified scanner omissions; DoD was a separate next gate."
```

The preceding response explicitly requested BA/QC review of this packet before DoD; the user replied "accept". The record above applies that decision to BA and QC only. One human acts in the declared roles; no independent reviewer is claimed. The UTC value is the agent's decision-recording time, not an asserted exact chat-send timestamp. The agent authored this record; the user made the decision.

Two protocol rows in the reviewed Markdown table had source excerpts placed in the critical-flag column and stale excerpt text in the final column. This update restores NO and the exact lines 55/305/316 already present in the packet. Source hashes, read ranges, all scores and the stated zero-critical aggregate remain unchanged. This is a presentation correction, not new source or review scope.

The separate DoD request received a later explicit user accept. Frontmatter now records the authorized QC decision; no trusted receipt is fabricated. Keep the finalized host byte-identical after signing.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Work-item and authoring receipts were verified before implementation; frozen s04/s05/s06 remain unchanged."
  - "Exact granted source/test boundary; report and s01 protocol block owned by CLI."
  - "Ordered targeted developer review in s07; no independent reviewer or delegation claim."
blocking_items:
  - "At host finalization, the trusted DoD receipt has not yet been sealed; protocol completion waits for its successful verification."
owner: "qc"
next_action: "Human DoD is recorded; seal the finalized s08, verify the current signature/digest, then use the normal CLI close transition."
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
  - "Human QC accepted these justified omissions with the bounded verification packet; scanner status remains SKIPPED."
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
  - "AC-AUTH-005, human QC verification and explicit human DoD are accepted. Trusted DoD receipt was absent at finalization; no whole-M7 completion."
finish_target: "fix/workflow-authority-guidance"
workspace_kind: BOTH
verify_inputs:
  - "This note's accepted AC-AUTH-001..006 evidence and human DoD decision."
  - "Trusted receipt remains an external authority; validate it before closeout."
finish_gate_checks:
  verify_complete: PASS
  dod_complete: PENDING
  findings_closed: PASS
  exceptions_resolved: PASS
allowed_actions:
  - "Commit finalized evidence and seal the already-approved DoD in a human-controlled terminal."
blocked_actions:
  - "Protocol close until the signed receipt is verified."
  - "Merge/remove this worktree before its integration/finish conditions are met."
cleanup_sequence: []
merge_conditions:
  - "Verified trusted DoD receipt and completed child protocol handoff."
  - "Separate integration review; do not infer parent M7/CF-MB2 or release approval."
residual_risks:
  - "Pre-signature snapshot; a clean tree alone does not permit finalization."
final_recommendation: HOLD_OPEN
notes_for_closeout: "This is the pre-signature finish assessment. Keep the signed s08 immutable; later protocol events and the owning integration decision record further progress."
```

## Definition of Done

The assistant explicitly requested child DoD approval against the s08 packet at commit b5360008434b5a06134b226868ee0f03dad77aba; the user replied "accept". This records that human decision, including the accepted bounded language review, verification evidence and scanner limitations. The reviewer role and UTC recording time are owned by frontmatter gate_reviews.dod; that time records the decision here, not an asserted exact chat-send timestamp. The human user approved; the agent recorded it.

The assessment below recommends DONE and the human content decision is APPROVED. Protocol completion still requires the external trusted receipt and normal CLI transition. No parent M7/CF-MB2 decision, publication or installation is included.

```yaml
work_item_slug: "correct-workflow-authority-guidance"
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
  - "Bounded static assertions and scanner omissions as described above."
follow_up_items:
  - "Return bounded evidence to P-SEM/P-LANGUAGE without changing parent M7 or CF-MB2 decisions."
next_action: "Seal the human-approved, finalized s08 through the normal TTY flow; verify its signature/current digest before CLI close. Do not modify this host after signing."
```

## Traceability
```yaml
upstream:
  - "correct-workflow-authority-guidance.s04.acceptance-criteria.md"
  - "correct-workflow-authority-guidance.s05.technical-approach.md"
  - "correct-workflow-authority-guidance.s06.task-breakdown.md"
  - "correct-workflow-authority-guidance.s07.implementation.md"
next_step: "T8 trusted receipt sealing/validation and normal closeout; human DoD, T7 and QC verification are accepted."
```

## Handoff

Human DoD, technical verification and bounded BA/QC review are accepted. Seal this frozen host in the human terminal; the agent can then verify the receipt and complete normal protocol closeout. Parent P-SEM / CF-010 and P-LANGUAGE / CF-012 receive a bounded contribution under their own integration review. Parent M7, CF-MB2, M10/M11 and master DoD are unchanged. Worktrees remain open pending their finish conditions.

## Trusted Signing Handoff

Run in the human-controlled terminal after the checkpoint is committed. The helper checks the exact s08 SHA-256, existing trusted authoring receipts, current reviewer metadata and the clean granted scope before it invokes the one normal signing command. It skips signing on retry only if the current DoD receipt already has a valid signature and matching digest.

```sh
sh /private/tmp/cf-authority-dod-95hynv2s/approve.sh
```

The durable equivalent, if the temporary helper is unavailable, is:

```sh
cd /Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/correct-workflow-authority-guidance
/Users/haonguyen87/.nvm/versions/node/v22.23.2/bin/node packages/workflow-bundle/bin/wfc.js gate approve --work-item correct-workflow-authority-guidance --gate dod --reviewed-by qc --reviewed-at 2026-10-05T02:40:09Z --note "Explicit user accept of child DoD against b536000; six criteria evidenced, BA/QC accepted, scanner limitations recorded. No parent or release approval." --project-root . --telemetry off
```

The normal CLI requires a human-controlled TTY and hidden passphrase prompt (workflow-trusted-approval-utils.js, promptHiddenInput/resolveApprovalPassphrase). The agent must not provide the passphrase or use a fixture path. This command seals only DoD; it performs no merge, cleanup, install or release. Keep s08 unchanged after sealing; later state is owned by the trusted receipt and CLI report.

Host-finalization checks PASS on 2026-10-05: naming/governance/execution/planning each validate eight notes; repository protocol validates 21 managed items with 21 configured legacy skips. YAML and whitespace checks pass. Source/test bytes, accepted BA/QC scores and s04/s05/s06 hosts remain unchanged; prior successful source tests are retained for this decision-only update. The report and its s01 projection remain VERIFIED/s08 and are not hand-edited.
