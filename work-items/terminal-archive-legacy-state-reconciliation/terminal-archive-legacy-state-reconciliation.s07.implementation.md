---
artifact_id: "terminal-archive-legacy-state-reconciliation.s07.implementation"
artifact_family: workflow-step
work_item_slug: "terminal-archive-legacy-state-reconciliation"
step_id: "s07"
step_slug: "implementation"
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "terminal-archive-legacy-state-reconciliation.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Developer's revised T8a Option A Task Plan has a matching trusted receipt. The authoring smoke tests premature-resume refusal, one signed exact-ID fixture disposition, and successful resume; all 13 cases pass. An exact-ID cleanup also fixed the activation regression, and the 45-file unit suite passes. For implementation diff SHA-256 fc86c3f1…, QC approved refreshed Spec Compliance and closed F-TAR-S08-001, then Developer/QC accepted Code Quality. QC confirmed T8a/T6 handoff completeness and opened s08 evidence authoring for the unchanged diff; no candidate commit or hosted verification exists yet.

## Step Contract
```yaml
step: s07
goal: "Implement CR-009 so active state is never silently cleared and a Maintainer can dispose one exact entry with atomic, attributable history."
value: "A truthful archive state and auditable remediation path for the CR-008 finding."
scope_in:
  - "Execute approved Task Plan T1-T8 and the bounded T8a smoke-fixture amendment within the five granted write roots."
  - "Use red/green TDD for archive, status IDs, trusted disposition, writer locking, and transition safety."
  - "Review each risky batch in Spec Compliance then Code Quality order."
scope_out:
  - "Live CR-008 disposition, release or tag, historical evidence rewrite, and branch cleanup."
  - "Any new key, receipt kind, datastore, or unapproved write path."
inputs_required:
  - "Approved Spec, Contract, DoR, Approach, and Task Plan receipts with matching digests."
  - "ACTIVE work-item protocol at s07 with five granted write roots."
  - "Approved Spec Card AC-TAR-01..10 and s06 T1-T8 plus T8a Option A."
outputs_required:
  - "Focused production and test changes with red/green evidence for each behavior batch."
  - "s07 implementation and review evidence plus a QC-ready s08 handoff."
done_when:
  - "AC-TAR-01..10 have implementation evidence and no unresolved blocking s07 finding."
  - "Focused and full relevant checks pass, or every gap is explicitly assigned to QC."
  - "Every risky batch has Spec Compliance before Code Quality evidence."
constraints:
  hard_constraints:
    - "No active entry is selected or cleared by interpreting human text."
    - "Disposition removes one exact entry and appends its history in one atomic report commit."
    - "A role label alone is never trusted Maintainer approval."
    - "Published v2.6.2 and live CR-008 state are immutable during s07."
  soft_constraints:
    - "Reuse existing CLI, report, signing, and Node test conventions."
  prohibited_actions:
    - "Do not self-pass QC/PO gates or finalize the worktree."
    - "Do not write outside the five granted roots without an approved amendment."
  compliance_checks:
    - "Negative tests cover active-state preservation, stale IDs, authorization, retry, concurrency, and persistence failure."
    - "Diff and corpus checks confirm no historical evidence or release artifact changed."
risks:
  - id: R-TAR-S07-01
    description: "An unguarded writer overwrites signed history."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "T4 inventories and serializes all report writers; race tests reproduce competing writes."
    contingency: "Stop handoff and reopen the plan if an unapproved writer path is necessary."
    owner: developer
    status: OPEN
  - id: R-TAR-S07-02
    description: "Authorization or failed persistence removes active state without valid history."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Fail-first signer and failure-injection tests precede T3/T5 implementation."
    contingency: "Keep CR-008 HOLD_OPEN and do not run live dispositions."
    owner: developer
    status: OPEN
timebox:
  target_duration: "T1-T8 in reviewable batches; reassess at each failed check or contract drift"
  deadline: ""
  escalation_rule: "Return to s04/s05/s06 for any contract, approach, or write-root change before code."
```

## Main Artifact
```yaml
recommended_design: "Approved s05 Option A: one signed report, snapshot-bound IDs, atomic one-entry disposition, and a common mutation lock."
implementation_mode: BUGFIX
tasks_completed: [T1, T2, T3, T4, T5, T6, T7, T8]
bug_repro_evidence:
  - "T1 baseline: state suite 19/19 PASS; validator suite PASS; CLI suite PASS."
  - "T1 red: state suite 19 PASS/3 FAIL (missing target IDs, raw snapshot, history preservation)."
  - "T1 red: validator suite fails the missing history-validator assertion."
  - "T1 red: CLI suite fails 6 TAR assertions (missing status targets and active-blocker archive guard); copied CR-008 blocker wording is used only in a temporary fixture."
  - "T8a red: authoring smoke failed materialize-auto-scaffold at resume because the fixture blocker remained active."
  - "After signed fixture disposition, authoring smoke reached final protocol validation and exposed stale materializer-owned change/gate approval actions despite APPROVED receipts in two temporary fixtures."
  - "T6 regression red: work-item-protocol.test.js failed one new activation assertion; an approved materializer-owned spec action was retained while an unrelated action had to remain."
hypothesis_log:
  - assumption: "Normalization drops optional resolved-state history and raw legacy shape."
    status: CONFIRMED
    evidence: "T1 state tests fail on undefined history and undefined rawReport."
  - assumption: "Archive lacks a pre-mutation active-blocker guard."
    status: CONFIRMED
    evidence: "T1 copied-parent tests observe archive success for raw, legacy-object, and typed blockers."
  - assumption: "Serializing the normalized copy during disposition would change an untouched legacy string into an object."
    status: CONFIRMED
    evidence: "The load adapter normalizes raw strings; T5 instead validates then atomically serializes the raw post-report, and the equal-text fixture retains the surviving raw string."
  - assumption: "The generic smoke can retain block/resume while omitting its synthetic blocker."
    status: REJECTED
    evidence: "The unchanged fixture fails at resume with an active blocker; removing only --blocker fails earlier because block requires at least one --blocker. The trial edit was reverted."
  - assumption: "Activation preserves materializer-owned approval actions even after the matching trusted receipts pass."
    status: CONFIRMED
    evidence: "After T8a disposition, the temporary DONE/VERIFIED reports retained structured change/gate approval actions; the focused activation test was red before the exact-ID cleanup."
debug_experiments:
  - goal: "Distinguish missing behavior from broken tests."
    action: "Run the same three suites before and after adding only T1 tests; run node --check and git diff --check."
    result: "All three baseline suites passed; only new TAR assertions fail; syntax and whitespace checks pass."
  - goal: "Test the approved T8a blocker-free block/resume fixture direction."
    action: "Reproduce authoring smoke failure, temporarily remove only the synthetic --blocker argument, rerun the same smoke, then restore the exact original lines."
    result: "Original fixture fails at resume with active blockers; blocker-free trial fails at block input validation. No green result or script diff remains; a revised plan choice is required."
  - goal: "Prove T8a Option A without weakening the resume guard."
    action: "Keep block --blocker; assert premature resume fails without report mutation; use status state_id and the temporary fixture key to sign one Maintainer dispose-state; inspect exact history; resume."
    result: "The smoke advanced past resume. Its next red point was the existing final validator, which found approved-but-pending structured actions in two temporary reports."
  - goal: "Distinguish a fixture-only issue from T6 transition cleanup regression."
    action: "Inspect the kept-temp report entries and add an activation test with one materializer-owned spec approval action and two unrelated actions, including a same-gate different-ID action."
    result: "The new test failed only the approved-action removal assertion; exact-ID activation cleanup made it and all 13 smoke cases pass."
tdd_evidence:
  - behavior: "Snapshot-bound ID and raw-state preservation"
    failing_test: "work-item-protocol-state.test.js: three TAR tests fail before production edits"
    passing_test: "work-item-protocol-state.test.js: 23/23 PASS after T2 reader/status changes"
  - behavior: "Status inventory and active-blocker archive refusal"
    failing_test: "work-item-protocol.test.js: six TAR assertions fail before production edits"
    passing_test: "T2 status assertions now pass; archive guard remains red for T6"
  - behavior: "Malformed history rejection"
    failing_test: "validate-work-item-protocol.test.js: TAR validator assertion fails before production edits"
    passing_test: "T7 validator suite PASS: signed record accepted; tampered signature or fields, duplicate operation_id, missing reason, and unauthorized fixture mode rejected"
  - behavior: "Trusted structured Maintainer disposition intent"
    failing_test: "workflow-trusted-approval-utils.test.js: missing signer/verifier export fails before production edit"
    passing_test: "workflow-trusted-approval-utils.test.js: signer suite passes with existing-key, tamper, fixture, missing-key, wrong-passphrase, and role-only cases"
  - behavior: "Per-work-item report writer serialization"
    failing_test: "T4 state lock, CLI writer, and gate-bundle tests failed before the shared lock; materializer replacement test failed before its guard"
    passing_test: "T4 state suite 25/25 PASS, gate-review suite PASS, materializer suite PASS; CLI lock assertions PASS while only T5/T6 red cases remain"
  - behavior: "Stale report snapshot protection"
    failing_test: "T4 snapshot pre-commit assertion failed before helper implementation"
    passing_test: "T4 state suite rejects an unexpectedly created, changed, or removed report snapshot"
  - behavior: "Exact one-entry disposition and atomic report replacement"
    failing_test: "T1 CLI red-case rejected unknown dispose-state action; T5 selector and atomic-writer tests failed before their helpers existed"
    passing_test: "T5 state suite 27/27 PASS; CLI disposition assertions pass, leaving only three T6 archive red-cases"
  - behavior: "Projection failure repair and report access-mode compatibility"
    failing_test: "T5 before_projection_refresh and report-mode assertions failed before their targeted fixes"
    passing_test: "Same operation_id retry repairs s01 without a second report commit; atomic replacement keeps the report's existing access mode"
  - behavior: "Archive rejects active blockers and lifecycle transitions cannot silently clear opaque state"
    failing_test: "T6 CLI suite failed three copied-parent archive assertions and the new activate legacy-action refusal before production edits"
    passing_test: "T6 CLI suite PASS: archive rejects raw/object/typed blockers, failed CLI archive leaves report and s01 byte-identical, and every affected transition refuses legacy or preserves unrelated typed state"
  - behavior: "Activation retires only approval purposes proven by trusted receipts"
    failing_test: "work-item-protocol.test.js: new activation assertion failed because the materializer-owned spec action survived activation"
    passing_test: "work-item-protocol.test.js PASS: exact materializer ID is removed, same-gate different-ID and unrelated workflow action are preserved; authoring smoke 13/13 PASS"
safe_refactor_notes: []
code_changes:
  - "T2: raw report bytes and raw entry shape are available from loadProtocolReport without rewriting the source."
  - "T2: status adds read-only disposition_targets with snapshot/collection/position-bound IDs; optional empty history survives normalization and write."
  - "T3 reviewed: structured intent signer/verifier uses the existing approver keypair and TTY passphrase policy; T5 CLI rejects role-only and wrong-passphrase attempts before report mutation."
  - "T4 reviewed: CLI and gate bundle share a fail-closed per-item lock; materializer guards governed reports and uses the same lock for report writes."
  - "T4 CLI checks the exact loaded report bytes immediately before mutation; gate bundle retains its expected-SHA transaction check."
  - "T5 reviewed: dispose-state checks operation_id before stale ID, selects one raw entry, signs Maintainer intent, and stages/fsyncs/renames one complete report image."
  - "T5 identical retry verifies signed history and refreshes the derived s01 projection without rewriting the report; original raw legacy shapes and report access mode are retained."
  - "T6 reviewed: archive rejects any active blocker before mutation; transitions reject unresolved legacy state and consume only their own structured follow-ups, preserving unrelated typed entries."
  - "T7 reviewed: validator checks optional resolved-state history on the raw report before normalization, including record shape, unique operation IDs, exact original text, structured Maintainer actor/reason/time, and signed intent binding. Historical archived reports remain readable."
  - "T8a reviewed: authoring smoke retains the blocker, proves premature resume refusal without mutation, signs one exact-ID fixture disposition with the existing test key, checks one history record, then resumes."
  - "T6 regression reviewed: activation retires only materializer-owned work-item, change, and readiness-gate approval action IDs after trusted receipt checks; unrelated typed actions remain untouched."
doc_changes:
  - "T7 reviewed: bundle README and canonical protocol reference document disposition inventory, signed exact-raw history, archive refusal, and the existing legacy-scaffold policy."
config_changes: []
review_checkpoints:
  - "T1 red-case Spec Compliance: QC explicitly approved in conversation on 2026-09-17T02:05:59Z; scope is the test matrix only, not any later implementation batch."
  - "T2 Spec Compliance PASS, then Code Quality PASS: user accepted the exact sequential QC review request for focused diff SHA-256 998e95c2a160ecba65532dbf138f78365a4d23278d055d68cf80d244cf59db0f on 2026-09-17T02:31:57Z."
  - "T4 Spec Compliance PASS (QC), then T4 Code Quality PASS (Developer and QC): explicit user approval on 2026-09-17T02:53:28Z for the matching ten-file implementation diff SHA-256 b09aa49668d1b3dcd4bedf0c36c51b5c6fb8271f39bc41e3a4e8748a4cf0d094. T3 signer code in that diff remains pending its own checkpoint."
  - "T3 signer and T5 disposition Spec Compliance PASS (QC), then Code Quality PASS (Developer and QC): user accepted the exact sequential review request on 2026-09-17T07:34:52Z for matching ten-file implementation diff SHA-256 f1d6332180132dca65a819588a71bcf4586f6b2cedd7ff1cfd9c8eda0af8021c."
  - "T6 Spec Compliance PASS (QC), then Code Quality PASS (Developer and QC): user accepted the exact sequential review request on 2026-09-17T07:47:53Z for matching ten-file implementation diff SHA-256 3d4fb385b6b9cc3158de2793b1824055fd029f9b755984b341ba474342f1053b."
  - "T7 Spec Compliance PASS (QC), then Code Quality PASS (Developer and QC): explicit user approval on 2026-09-17T08:03:11Z for matching focused four-file diff SHA-256 4e279f40464b5ef8486f3d6153d6322b211176896f8976e5b769a855b0314e0c."
  - "T8 handoff completeness and s08 evidence authoring approved by QC in conversation, recorded 2026-09-17T13:12:15Z for local implementation diff SHA-256 69e69c57b0dba970074ab3fff3d077a414e930b2bd299fbd3b545123be3bc607; Technical Verification and DoD remain separate."
  - "QC reopened s07 for F-TAR-S08-001 and Developer accepted bounded T8a in conversation, recorded 2026-09-17T13:44:33Z. The amended Task Plan receipt is not yet sealed; no refreshed Spec Compliance or Code Quality verdict exists."
  - "Developer approved revised T8a Option A in conversation, recorded 2026-09-17T13:55:42Z. The previous T8a receipt was sealed for the infeasible method and is stale for the revised s06 bytes; a new matching receipt and refreshed reviews remain pending."
  - "Developer sealed revised T8a Option A Task Plan on 2026-09-17T14:17:41.794Z; task_plan receipt APPROVED/digest_match=true for s06 SHA-256 e705c1b05fbe47686f3c2a0b859998ca32b959bc49819817c6fa8c55ef4beb86."
  - "QC explicitly approved refreshed T8a/T6 Spec Compliance and closed F-TAR-S08-001 in conversation, recorded 2026-09-18T02:33:11Z, for implementation diff SHA-256 fc86c3f150d89688faa98795a2b3cea22690fb001532346e6c2366987c49257a. Developer/QC Code Quality remains separate and pending; historical T6/T8 reviews bind earlier diff SHAs."
  - "Developer and QC accepted refreshed T8a/T6 Code Quality in conversation after QC Spec Compliance, recorded 2026-09-18T02:40:43Z, for unchanged implementation diff SHA-256 fc86c3f150d89688faa98795a2b3cea22690fb001532346e6c2366987c49257a. This does not approve s08 Technical Verification or DoD."
  - "QC confirmed refreshed T8a/T6 handoff completeness and opened s08 evidence authoring in conversation, recorded 2026-09-18T02:47:47Z, for unchanged local implementation diff SHA-256 fc86c3f150d89688faa98795a2b3cea22690fb001532346e6c2366987c49257a. This does not approve Technical Verification, DoD, candidate commit, or release."
outputs_actual:
  - "T1 fail-first tests in three approved test files."
  - "T2 focused state suite 23/23 PASS; 14 tracked report snapshots load without write; copied CR-008 parent exposes two distinct legacy IDs without changing its bytes."
  - "T3 signer test PASS after fail-first; no report writer or live parent path was invoked."
  - "T4 state suite 25/25 PASS, signer suite PASS, gate-review suite PASS, materializer suite PASS, JS syntax and git diff --check PASS."
  - "T5 state suite 27/27 PASS; signer, gate-review, and materializer suites PASS; CLI suite has only three expected T6 archive-guard failures."
  - "T6 state suite 27/27 PASS; CLI lifecycle suite PASS, including copied-parent two-disposition-then-archive path; gate-review and materializer suites PASS."
  - "T7 red-before-green: validator suite initially failed only the missing history-validator assertion; after the validator change, validator, CLI, and signer suites PASS."
  - "T7 tracked corpus: all 14 protocol-managed report snapshots normalize without migration, exact legacy text bytes remain intact, and report files stay byte-identical. Protocol validation reports 14 governed items PASS and 16 permitted legacy scaffolds skipped."
  - "T7 pack audit PASS and changed-area semantic review PASS; the separate T7 human reviews passed on the matching focused diff."
  - "T8 full bundle unit suite PASS (45/45 test files), including copied CR-008 parent, two explicit dispositions, atomic failure, retry, lock, writer, signer, validator, and corpus cases; runtime build/parity also PASS with no new generated diff."
  - "T8 workflow naming/governance PASS (8 notes), planning PASS (8 notes), protocol PASS (14 governed reports; 16 permitted legacy scaffolds skipped), and mechanical pack audit PASS."
  - "T8 syntax PASS (11/11 changed JS), UTF-8 PASS (12/12 changed text files), git diff --check PASS; all 23 changed/untracked paths are within CR-009 authoring or approved implementation roots. No CR-008 parent, v2.6.2 release, package, tag, or trusted-receipt path changed."
  - "T8a local smoke PASS 13/13: premature resume refuses byte-identically, one signed fixture disposition preserves the original blocker in history, and resume completes the lifecycle."
  - "T6 regression focused red then green; direct 45-file bundle unit runner PASS, workflow naming/governance/planning/execution PASS, 14 governed reports protocol PASS, pack audit PASS, and changed JS syntax/diff checks PASS."
  - "Bundle smoke PASS; local self-pack v2.6.2 artifact smoke PASS with SHA-256 e6a63556a3a54e152732ff21285eaef68fc1a2795e79fcc6bde96adad1ec53a4. This is local evidence, not a hosted exact-candidate binding."
ac_evidence:
  - id: AC-TAR-01
    refs: ["work-item-protocol.test.js:testTarCopiedCr008BlockersRefuseArchive", "work-item-protocol.test.js:terminal-transition guards"]
  - id: AC-TAR-02
    refs: ["work-item-protocol.test.js:testTarStatusExposesReadOnlySnapshotTargets", "work-item-protocol-state.test.js:disposition target IDs and exact selector", "work-item-protocol.test.js:testTarOneEntryDispositionRequiresTrustAndIsIdempotent"]
  - id: AC-TAR-03
    refs: ["work-item-protocol.test.js:testTarOneEntryDispositionRequiresTrustAndIsIdempotent", "workflow-trusted-approval-utils.test.js:structured signer negatives", "validate-work-item-protocol.test.js:signed history validation"]
  - id: AC-TAR-04
    refs: ["work-item-protocol-state.test.js:exact ID or kind+gate selectors", "work-item-protocol.test.js:activation exact materializer ID removal and different-ID preservation", "T8 diff-aware review of changed transition and disposition selectors; text is display/preservation only"]
  - id: AC-TAR-05
    refs: ["work-item-protocol.test.js:testTarUnselectedEqualRawTextRemainsRaw", "work-item-protocol.test.js:testTarOneEntryDispositionRequiresTrustAndIsIdempotent", "validate-work-item-protocol.test.js:14-report exact-text corpus"]
  - id: AC-TAR-06
    refs: ["work-item-protocol.test.js:testTarOneEntryDispositionRequiresTrustAndIsIdempotent", "work-item-protocol.test.js:testTarCommittedReportRepairsProjectionOnIdenticalRetry"]
  - id: AC-TAR-07
    refs: ["work-item-protocol-state.test.js:atomic report replacement failure points", "work-item-protocol.test.js:disposition failure and projection repair", "work-item-protocol.test.js:shared CLI/gate lock", "materialize-work-item.test.js:shared materializer lock"]
  - id: AC-TAR-08
    refs: ["validate-work-item-protocol.test.js:14 tracked reports exact legacy text and no migration", "wfc protocol:14 governed reports PASS"]
  - id: AC-TAR-09
    refs: ["work-item-protocol.test.js:testTarCopiedCr008BlockersRefuseArchive", "work-item-protocol.test.js:testTarOneEntryDispositionRequiresTrustAndIsIdempotent"]
  - id: AC-TAR-10
    refs: ["T8a/T6 diff scope check:23 modified paths plus one approved spec card, none outside CR-009", "no live parent/release/tag/trusted-receipt mutation; branch remains open"]
local_implementation_diff_sha256: "fc86c3f150d89688faa98795a2b3cea22690fb001532346e6c2366987c49257a"
source_head: "f49a402696435796ef1a1a7c0ee465e5d45adab4"
known_limitations:
  - "F-TAR-S08-001 is closed by QC; both s07 review tiers passed and QC accepted the refreshed handoff and opened s08 for the matching local diff."
  - "QC opened s08 evidence authoring, but has not approved Technical Verification or DoD; PO Business Acceptance remains independent."
  - "The local implementation diff SHA-256 is a review identity, not an immutable source commit or hosted artifact; CR-009 worktree changes remain uncommitted and need candidate binding before final DoD."
  - "eslint and semgrep are unavailable locally; automated lint and security static scans were skipped. Syntax, diff-aware manual review, and negative authorization tests passed, but QC owns acceptance of this scan gap or requires a hosted scanner."
  - "No live CR-008 disposition, publish, tag, or branch cleanup was attempted; these are explicitly outside CR-009 s07."
  - "Orphan locks require explicit operator recovery after inspection."
follow_up_items:
  - "Developer to refresh s08 evidence for the QC-opened T8a/T6 handoff; opening s08 is not Technical Verification or DoD."
  - "Obtain separate authority for an immutable candidate/hosted run, then separate QC scanner-gap, Technical Verification, and DoD decisions."
notes_for_testing: "Historical T2-T8 reviews remain bound to their recorded diff SHAs. QC Spec Compliance and Developer/QC Code Quality passed in order for the current T8a/T6 diff. The smoke uses only temporary fixture credentials and does not authorize a live CR-008 disposition. Scanner and exact-candidate gaps remain for s08."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/work-item-protocol-state.test.js"
  - "packages/workflow-bundle/test/work-item-protocol.test.js"
  - "packages/workflow-bundle/test/validate-work-item-protocol.test.js"
  - "packages/workflow-bundle/test/workflow-trusted-approval-utils.test.js"
  - "packages/workflow-bundle/test/workflow-gate-review.test.js"
  - "packages/workflow-bundle/test/materialize-work-item.test.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/terminal-archive-legacy-state-reconciliation"
worktree_reason: "Multi-session public-contract repair with merge and release risk."
review_status: PASS
review_refs:
  - "QC T1 red-case Spec Compliance approval, 2026-09-17T02:05:59Z."
  - "T2 Spec Compliance PASS then Code Quality PASS, user accept 2026-09-17T02:31:57Z, focused four-file diff SHA-256 998e95c2a160ecba65532dbf138f78365a4d23278d055d68cf80d244cf59db0f."
  - "T4 Spec Compliance PASS (QC) before Code Quality PASS (Developer and QC), user approval 2026-09-17T02:53:28Z, matching ten-file diff SHA-256 b09aa49668d1b3dcd4bedf0c36c51b5c6fb8271f39bc41e3a4e8748a4cf0d094."
  - "T3/T5 Spec Compliance PASS (QC) before Code Quality PASS (Developer and QC), user accept 2026-09-17T07:34:52Z, matching ten-file diff SHA-256 f1d6332180132dca65a819588a71bcf4586f6b2cedd7ff1cfd9c8eda0af8021c."
  - "T6 Spec Compliance PASS (QC) before Code Quality PASS (Developer and QC), user accept 2026-09-17T07:47:53Z, matching ten-file diff SHA-256 3d4fb385b6b9cc3158de2793b1824055fd029f9b755984b341ba474342f1053b."
  - "T7 targeted Spec Compliance PASS (QC) then Code Quality PASS (Developer and QC), explicit user approval 2026-09-17T08:03:11Z, matching focused four-file diff SHA-256 4e279f40464b5ef8486f3d6153d6322b211176896f8976e5b769a855b0314e0c."
  - "QC refreshed Spec Compliance PASS and F-TAR-S08-001 closure, recorded 2026-09-18T02:33:11Z for T8a/T6 regression diff SHA-256 fc86c3f150d89688faa98795a2b3cea22690fb001532346e6c2366987c49257a; Developer/QC Code Quality is not yet approved."
  - "Developer/QC refreshed Code Quality PASS, accepted in conversation after QC Spec Compliance and recorded 2026-09-18T02:40:43Z for the same unchanged diff SHA-256 fc86c3f150d89688faa98795a2b3cea22690fb001532346e6c2366987c49257a."
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "After independent s08 and branch-finish decision only."
verify_path:
  - "T1 red tests, then T2-T7 focused red/green checks and T8 full suite."
  - "QC separately verifies AC-TAR-01..10 and decides DoD at s08."
```

## Implementation Notes
```yaml
worktree_target: "terminal-archive-legacy-state-reconciliation"
planning_track: full
risk_signals:
  - "Multi-session implementation touching CLI, report writers, signer, validator, and published-runtime compatibility."
worktree_decision: REQUIRED
decision_reason:
  - "High merge and release risk; the dedicated in-repo worktree already exists."
isolation_strategy:
  branch_name: "codex/terminal-archive-legacy-state-reconciliation"
  worktree_path: ".claude/worktrees/terminal-archive-legacy-state-reconciliation"
  owned_paths:
    - "the five granted write roots in the approved s06 plan"
  expected_duration: "multi-session"
execution_guards:
  - "No live CR-008 report or published v2.6.2 mutation."
skip_reason: ""
cleanup_preconditions:
  - "QC s08 verify and DoD pass, no open findings, then separate branch-finish audit."
notes_for_implementation: "One agent works sequentially; no subagent delegation."
review_target: "CR-009 s07 behavior and public contract"
review_mode: TARGETED
review_order: [SPEC_COMPLIANCE, CODE_QUALITY]
review_batches:
  - batch: "T1 red-case matrix"
    scope: ["AC-TAR-01..07", "copied CR-008 blockers"]
    trigger: "before production edits"
    reviewer_role: qc
  - batch: "T2-T5 identity, signer, lock, and disposition"
    scope: ["public CLI contract", "atomic report mutation"]
    trigger: "before terminal-transition implementation"
    reviewer_role: qc
  - batch: "T6 archive guard and structured transition cleanup"
    scope: ["all transition paths", "legacy refusal", "typed state preservation"]
    trigger: "before T7 validator and documentation"
    reviewer_role: qc
  - batch: "T7 validator and compatibility"
    scope: ["signed history", "corpus", "documentation"]
    trigger: "before s08 handoff"
    reviewer_role: qc
  - batch: "T8a fixture and T6 approved-action reconciliation"
    scope: ["exact-ID fixture disposition", "trusted-receipt-bound activation cleanup", "unrelated-state preservation"]
    trigger: "before refreshed s08 handoff"
    reviewer_role: qc
required_checks:
  spec_compliance: ["AC mapping", "no text inference", "approved roots", "no live parent mutation"]
  code_quality: ["minimal delta", "negative tests", "atomicity", "lock ordering", "security boundary"]
finding_policy:
  blocker_threshold: "Any violated AC, unauthorized mutation, missing signer evidence, or unguarded report writer blocks the next batch."
  reopen_conditions: ["spec drift", "test exposes a missing writer", "history or active state can be lost"]
handoff_to_verify: ["red/green logs", "review verdicts", "full test and corpus evidence", "remaining scan gaps"]
notes_for_implementation_or_verify: "T1-T7 reviews passed in their recorded order and bind earlier diff SHAs. QC Spec Compliance and Developer/QC Code Quality passed sequentially on the current T8a/T6 diff; QC confirmed refreshed handoff completeness and opened s08 evidence authoring. Neither this opening nor prior s08 authoring approval implies Technical Verification or DoD."
```

## Workflow Pack Audit
```yaml
audit_scope: "CR-009 T3-T8a script, test, README, and protocol-reference edits; whole-repo mechanical scan and changed-area semantic review of the optional report-history contract; no new skill or workflow-chain template"
checks:
  - id: mechanical_pack_audit
    status: PASS
    evidence: "npm run validate:workflow:pack-audit reports WORKFLOW_PACK_AUDIT=PASS, including 42 unique skills and 170 flat-layout references."
  - id: semantic_changed_area
    status: PASS
    evidence: "The optional resolved_state_history report contract, CLI, validator, canonical protocol reference, and README agree; the T8a fixture and T6 activation cleanup use existing scripts and stable IDs. No new skill, workflow-chain template, install path, or flat-layout boundary was added."
findings: []
overall_status: PASS
follow_up_actions:
  - "The current T8a/T6 diff has sequential QC Spec Compliance and Developer/QC Code Quality PASS, and QC accepted the refreshed s08 handoff. Pack consistency PASS is not a Technical Verification or DoD verdict."
notes: "Pack consistency PASS is not a Code Quality, Technical Verification, or DoD verdict."
```

## Audit
```yaml
step: s07
status: PASS
checks:
  - criterion: "AC-TAR-01..10 have implementation evidence and no unresolved blocking s07 finding."
    result: PASS
    evidence: "Main Artifact.ac_evidence maps all ten IDs; QC approved refreshed Spec Compliance and closed F-TAR-S08-001 for the matching current diff."
  - criterion: "Focused and full relevant checks pass, or every gap is explicitly assigned to QC."
    result: PASS
    evidence: "45/45 bundle test files, 13/13 authoring smoke cases, workflow/protocol validators, pack audit, bundle smoke, and local self-pack pass; scanner and hosted-candidate gaps remain assigned to QC/s08."
  - criterion: "Every risky batch has Spec Compliance before Code Quality evidence."
    result: PASS
    evidence: "Historical reviews are ordered and SHA-bound; QC Spec Compliance passed first, then Developer/QC accepted Code Quality for unchanged current T8a/T6 diff fc86c3f1…."
constraint_violations: []
unmitigated_high_risks: []
timebox_breach: false
timebox_evidence: "No fixed deadline was set for s07; T1-T8 were executed in reviewable batches."
gaps: []
risk_level: HIGH
next_action: "Continue the QC-opened s08 evidence authoring on the same diff; immutable candidate and scanner-gap decisions remain s08 obligations."
```

## Traceability
```yaml
upstream: ["terminal-archive-legacy-state-reconciliation.s06.task-breakdown.md", "product-specs/cards/terminal-archive-legacy-state-reconciliation.md#Acceptance Criteria"]
next_step: "s08 evidence authoring is open on the reviewed local diff; prepare an authorized immutable candidate and scanner-gap disposition before separate QC Technical Verification and DoD."
```

## Handoff
- Outputs actual: See `## Main Artifact.ac_evidence` and `outputs_actual`; the implementation diff is bound to the recorded SHA-256.
- Known limitations: See `## Main Artifact.known_limitations`; especially unavailable local lint/security scanners and pending Technical Verification/DoD.
- Notes for testing: QC should verify the exact candidate and scan gaps during s08; see `## Main Artifact.notes_for_testing`.
- Notes for deployment khi có: No release or deployment is authorized by CR-009 s07.
