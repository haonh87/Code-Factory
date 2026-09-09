---
artifact_id: "align-adaptive-sa-ta-applicability.s07.implementation"
artifact_family: workflow-step
work_item_slug: "align-adaptive-sa-ta-applicability"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: BUG
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: review
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
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
execution_roles:
  - "developer"
  - "qc"
review_mode: independent
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
  dod: []
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
  - "align-adaptive-sa-ta-applicability.s06.task-breakdown.md"
linked_artifacts:
  - "../../packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "../../policies/codex/AGENTS.global.md"
  - "../../packages/workflow-bundle/runtime/codex/AGENTS.global.md"
  - "../../packages/workflow-bundle/runtime/claude/AGENTS.global.md"
  - "../adaptive-governance-human-approval-ux/adaptive-governance-human-approval-ux.s08.verification.md"
  - "../../changes/CR-008"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> QC reopened s07 and recorded `F-AR08-001` at `2026-09-08T10:55:26Z`. Developer approved T6a,
> and BA/Developer/QC re-approved the unchanged Spec, Contract, DoR, Approach, and Task Plan for a
> metadata-only rebind using `review_mode=independent`. T1..T6 and AR-B1/AR-B2 remain historical
> passing evidence; candidate `a97e0ee…` / `ebfb5ffb…` is now pre-amendment provenance only. All
> five refreshed receipts are `APPROVED` with `digest_match=true`, and Protocol passes for all
> 11 managed work items. T6a packed a new file from clean source `1a803ba…`; exact-artifact smoke
> passes 4/4. The tarball SHA-256 remains `ebfb5ffb…` because package payload bytes are unchanged.
> Hosted Guardrails and all terminal gates remain pending.

## Step Contract
```yaml
step: "s07 Implement"
goal: >-
  Correct the canonical SA/TA applicability precedence through a fail-first semantic contract,
  propagate it only through the approved generator, and collect reviewable evidence without
  changing router behavior or stable reason codes.
value: >-
  Remove irrelevant architecture-role ceremony while preserving every named hard-risk escalation
  and the child-to-parent CR-008 verification boundary.
scope_in:
  - "T1-T6 from the approved s06 Task Plan plus approved metadata-only amendment T6a"
  - "Canonical semantic fixture, canonical policy, generated runtime parity, regressions, and evidence"
scope_out:
  - "Router implementation, reason-code vocabulary, schemas, or SA/TA output contracts"
  - "Release, Business Acceptance, merge, tag, publish, install, or worktree cleanup"
inputs_required:
  - "Explicit QC approval to reopen s07 and record F-AR08-001"
  - "Explicit Developer approval of T6a and named-role re-approval of unchanged authoring gates"
  - "Fresh digest-valid Spec, Contract, DoR, Approach, and Task Plan receipts before new candidate creation"
  - "Protocol ACTIVE with the approved write roots"
  - "Approved s05 Option A and s06 T1..T6 sequence"
outputs_required:
  - "Fail-first precedence and exact six-trigger semantic evidence"
  - "Small canonical policy delta and generated Codex/Claude parity"
  - "AR-B1 and AR-B2 reviews in Spec Compliance -> Code Quality order"
  - "Exact child candidate handoff to child s08 and parent CR-008 re-verification"
done_when:
  - "T1-T6 outputs remain complete and T6a execution metadata passes locally"
  - "All T6a-affected trusted receipts are refreshed and digest-valid"
  - "Both targeted review batches have no unresolved blocker"
  - "The implementation note is ready for QC verification at s08"
owner: "developer"
```

## Main Artifact
```yaml
recommended_design: "Canonical policy correction backed by the existing adaptive-governance semantic fixture and runtime generator."
implementation_mode: BUGFIX
tasks_completed:
  - "T1 added bounded Skill Requirement precedence evidence and the exact six-trigger role/reason/gate matrix."
  - "T1 RED was confirmed with exactly one failure caused by the unconditional canonical SA/TA rule."
  - "T2 replaced only the contradictory canonical Skill Requirement paragraph."
  - "T2 GREEN was confirmed with the complete adaptive-governance suite passing."
  - "Human QC approved AR-B1 Spec Compliance for candidate c0fc0e6d46c35884c0c52d6dfaa49bc911c6b045 at 2026-09-08T09:55:19Z."
  - "Human Developer and QC approved AR-B1 Code Quality for candidate c0fc0e6d46c35884c0c52d6dfaa49bc911c6b045 at 2026-09-08T10:00:24Z with no blocking finding."
  - "T3 ran the existing runtime generator for Codex and Claude and proved exact canonical byte parity."
  - "T4 passed the adaptive, runtime parity, scaffold, architecture-role contract, and bundle-smoke suites."
  - "T4 passed workflow-pack audit, child workflow validation, protocol validation, planning validation, diff, UTF-8, and U+FFFD checks."
  - "Human QC approved AR-B2 Spec Compliance for candidate aade0485c58f1ff1ead7bb55dcf2fe0f7a4bdfe8 at 2026-09-08T10:08:10Z."
  - "Human Developer and QC approved AR-B2 Code Quality for candidate aade0485c58f1ff1ead7bb55dcf2fe0f7a4bdfe8 at 2026-09-08T10:13:27Z with no blocking finding."
  - "T5 aggregated complete TDD, worktree isolation, two-tier review, agentic/no-subagent, and verify-path evidence."
  - "T6 bound exact reviewed source commit a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff to local pre-s08 workflow-bundle-2.6.2.tgz SHA-256 ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47."
  - "T6a normalized workflow execution metadata to review_mode=independent and refreshed affected gate provenance without changing product behavior; local execution/workflow/planning/diff/encoding checks pass and only the expected stale receipts remain."
bug_repro_evidence:
  - "node packages/workflow-bundle/test/workflow-adaptive-governance.test.js exited 1 with exactly one failed assertion: canonical Skill Requirement must make router-derived SA/TA applicability authoritative and must not re-add omitted roles."
hypothesis_log:
  - assumption: "The executable router already implements OQ-CF-004 Option C; the defect is the unconditional canonical Skill Requirement sentence."
    status: CONFIRMED
    evidence: "All no-trigger and six-trigger router assertions passed during the intentional RED run; only the bounded policy assertion failed."
debug_experiments:
  - goal: "Localize the contradiction without accepting formatting noise as bug evidence."
    action: "Read only the canonical Skill Requirement section and run the expanded semantic fixture before editing policy."
    result: "One policy-precedence assertion failed; all existing and new executable routing assertions passed."
  - goal: "Prove generated policy parity without creating another source of truth."
    action: "Run npm run build:workflow:bundle-runtime, then compare canonical, runtime Codex, and runtime Claude SHA-256 values."
    result: "All three files are byte-identical at SHA-256 4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9; generated runtime remains ignored and creates no unexpected tracked path."
  - goal: "Detect adjacent contract or workflow-pack regression before AR-B2."
    action: "Run the five T4 Node suites, pack audit, child workflow validator, protocol validator, planning validator, diff check, UTF-8 decode, and U+FFFD scan."
    result: "Every required check passed; the U+FFFD scan returned no match."
tdd_evidence:
  - behavior: "Generic SA/TA guidance defers to router applicability and never re-adds an omitted or not-applicable role."
    failing_test: "node packages/workflow-bundle/test/workflow-adaptive-governance.test.js -> exit 1, exactly one intended policy-precedence assertion."
    passing_test: "node packages/workflow-bundle/test/workflow-adaptive-governance.test.js -> exit 0 after the canonical policy-only correction."
safe_refactor_notes: []
code_changes:
  - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js: added the bounded policy contract and exact six-trigger positive/negative matrix."
doc_changes:
  - "policies/codex/AGENTS.global.md: made the entry router's role-applicability result authoritative and prohibited generic re-addition of omitted roles."
  - "packages/workflow-bundle/runtime/codex/AGENTS.global.md: regenerated from the canonical policy; generated/ignored runtime output."
  - "packages/workflow-bundle/runtime/claude/AGENTS.global.md: regenerated from the canonical policy; generated/ignored runtime output."
config_changes: []
review_checkpoints:
  - "AR-B1 Spec Compliance PASS by QC at 2026-09-08T09:55:19Z for candidate c0fc0e6d46c35884c0c52d6dfaa49bc911c6b045; scope matches AC-AR-01..07 with no unrecorded spec or governance drift."
  - "AR-B1 Code Quality PASS by Developer and QC at 2026-09-08T10:00:24Z for candidate c0fc0e6d46c35884c0c52d6dfaa49bc911c6b045; assertions are deterministic and bounded, the policy delta is focused, and no blocking finding remains."
  - "AR-B2 Spec Compliance PASS by QC at 2026-09-08T10:08:10Z for candidate aade0485c58f1ff1ead7bb55dcf2fe0f7a4bdfe8; generated runtime parity and T4 evidence match AC-AR-05..09 with no unrecorded spec or governance drift."
  - "AR-B2 Code Quality PASS by Developer and QC at 2026-09-08T10:13:27Z for candidate aade0485c58f1ff1ead7bb55dcf2fe0f7a4bdfe8; generated outputs remain derived/ignored, the evidence is deterministic and path-bounded, and no blocking finding remains."
outputs_actual:
  - "T1 intentional RED evidence"
  - "T2 focused canonical policy correction"
  - "T2 GREEN evidence"
  - "T3 generated Codex/Claude runtime parity at SHA-256 4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9"
  - "T4 targeted regression, governance, pack-audit, and encoding evidence"
  - "T5 complete Delivery Rule Evidence with both targeted review batches closed"
  - "T6 exact source/artifact binding plus installed-artifact smoke across Codex/Claude global/project"
  - "T6a metadata rebind, five refreshed digest-valid receipts, and newly packed post-T6a candidate smoke"
known_limitations:
  - "The T6 source/artifact pair is historical pre-amendment evidence and must not be reused as the resumed verification candidate."
  - "Child s08 Technical Verification and DoD, followed by parent CR-008 exact-candidate re-verification, remain human-controlled follow-up work."
  - "The local tarball digest is pre-host evidence; if hosted packaging produces different archive bytes, QC must compare extracted content and approve an amended hosted binding before Technical Verification."
follow_up_items:
  - "Push the binding-only handoff and rerun hosted Guardrails for the post-T6a branch head."
  - "After child DoD, refresh parent CR-008 verification against a candidate that contains source commit 1a803ba84a4e76150c90954d89dcc3b52f75111e."
notes_for_testing: "Treat run 34216520563 as historical failed evidence. The newly packed post-T6a tarball passes exact-artifact smoke; run hosted Node 18/22 against the pushed handoff without inferring Technical Verification or DoD."
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/cr-008-adaptive-governance"
  - "codex/adaptive-governance-human-approval-ux"
worktree_reason: "planning_track=full, multi-session CR-008 release risk, and parent/child candidate coupling require isolation."
review_status: COMPLETED
review_refs:
  - "AR-B1 Spec Compliance: PASS by QC at 2026-09-08T09:55:19Z for c0fc0e6d46c35884c0c52d6dfaa49bc911c6b045"
  - "AR-B1 Code Quality: PASS by Developer and QC at 2026-09-08T10:00:24Z for c0fc0e6d46c35884c0c52d6dfaa49bc911c6b045"
  - "AR-B2 Spec Compliance: PASS by QC at 2026-09-08T10:08:10Z for aade0485c58f1ff1ead7bb55dcf2fe0f7a4bdfe8"
  - "AR-B2 Code Quality: PASS by Developer and QC at 2026-09-08T10:13:27Z for aade0485c58f1ff1ead7bb55dcf2fe0f7a4bdfe8"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs:
  - "s06 records that test, policy, generator, and evidence paths share one tightly coupled sequence."
merge_path: "Child candidate -> QC s08 DoD -> exact candidate re-bound to parent CR-008 verification; no merge before DoD."
verify_path:
  - "node packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
  - "npm run build:workflow:bundle-runtime"
  - "node packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
  - "Targeted adjacent regressions and workflow-pack audit from s06 T4"
```

## Implementation Notes
```yaml
review_target: "CF-019 canonical semantic fixture and canonical policy"
planning_track: full
review_mode: INDEPENDENT
review_order:
  - SPEC_COMPLIANCE
  - CODE_QUALITY
review_batches:
  - batch: "AR-B1"
    scope:
      - "packages/workflow-bundle/test/workflow-adaptive-governance.test.js"
      - "policies/codex/AGENTS.global.md"
    trigger: "T2 GREEN and candidate c0fc0e6d46c35884c0c52d6dfaa49bc911c6b045"
    reviewer_role: "QC for Spec Compliance; Developer and QC for Code Quality"
  - batch: "AR-B2"
    scope:
      - "Generated Codex/Claude runtime policy parity"
      - "Targeted adjacent regression evidence"
    trigger: "T3-T4 complete"
    reviewer_role: "QC for Spec Compliance; Developer and QC for Code Quality"
required_checks:
  spec_compliance:
    - "Match AC-AR-01..07 and the approved Option A/T1-T2 scope"
    - "Keep router behavior, stable reason codes, schemas, and SA/TA contracts unchanged"
    - "Reject unrecorded specification or governance drift"
  code_quality:
    - "Keep assertions deterministic, bounded to the canonical section, and readable"
    - "Keep the policy delta focused and generated files out of AR-B1"
finding_policy:
  blocker_threshold: "Any acceptance mismatch, unrecorded drift, weakened assertion, or unexpected changed path blocks the batch."
  reopen_conditions:
    - "Any change to the AR-B1 candidate after review"
    - "Any later regression that invalidates the semantic fixture or canonical wording"
handoff_to_verify:
  - "AR-B1 Spec Compliance PASS is recorded before AR-B1 Code Quality PASS."
  - "AR-B2 Spec Compliance PASS is recorded before AR-B2 Code Quality PASS."
  - "Do not treat either review as s08 Technical Verification or DoD."
notes_for_implementation_or_verify: "AR-B1 and AR-B2 remain complete in the required order. T6a receipts and local candidate smoke pass; hosted verification is next."
framework_notes:
  - "Node.js CommonJS fixture; no framework or runtime architecture change."
known_limitations:
  - "Hosted T6a verification, resumed s08, and parent CR-008 exact-candidate re-verification remain open."
```

## AR-B2 Code Quality Review
```yaml
review_id: "AR-B2-CODE-QUALITY"
status: PASS
prerequisite:
  review: "AR-B2 Spec Compliance"
  status: PASS
  reviewed_by:
    - "qc"
  reviewed_at: "2026-09-08T10:08:10Z"
reviewed_by:
  - "developer"
  - "qc"
reviewed_at: "2026-09-08T10:13:27Z"
decision_source: "User explicitly approved AR-B2 Code Quality with role Developer and QC."
reviewed_candidate_commit: "aade0485c58f1ff1ead7bb55dcf2fe0f7a4bdfe8"
scope:
  - "Generated Codex/Claude runtime policy parity"
  - "Targeted adjacent regression, workflow/governance, pack-audit, and encoding evidence"
checks:
  deterministic_evidence: PASS
  generated_source_of_truth_discipline: PASS
  changed_path_boundary: PASS
  readability_and_traceability: PASS
  blocking_findings: 0
findings: []
next_action: "Complete T6 exact-candidate binding; this review is not Technical Verification or DoD."
```

## T5 Implementation Discipline Audit
```yaml
task: "T5"
status: PASS
checks:
  - criterion: "TDD RED -> GREEN evidence"
    result: PASS
    evidence: "The policy-precedence assertion failed for the intended reason before the minimal canonical correction and passed afterward."
  - criterion: "Worktree isolation and hold-open guard"
    result: PASS
    evidence: "The existing in-repo CR-008 worktree is used and remains open through child DoD plus parent exact-candidate re-verification."
  - criterion: "Targeted two-tier review"
    result: PASS
    evidence: "AR-B1 and AR-B2 each record Spec Compliance before Code Quality; all required human reviewers approved and no finding remains open."
  - criterion: "Delegation eligibility"
    result: PASS
    evidence: "Execution remains agentic because test, policy, generated runtime, evidence, and candidate binding share one tightly coupled sequence; no independent owned/merge/verify lane exists."
  - criterion: "Immediate verify path"
    result: PASS
    evidence: "The exact semantic, runtime parity, adjacent regression, governance, pack-audit, diff, and encoding checks are named for QC."
open_findings: []
cleanup_preconditions:
  - "Child s08 Technical Verification and DoD pass for the new post-T6a exact candidate."
  - "Parent CR-008 re-verifies a candidate that includes the exact child result."
next_action: "Push the binding-only handoff and rerun hosted Guardrails for the new candidate."
```

## T6 Exact Candidate Binding
```yaml
task: "T6"
status: PASS
bound_at: "2026-09-08T10:22:58Z"
source:
  commit_sha: "a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff"
  branch: "codex/adaptive-governance-human-approval-ux"
  worktree_status_at_pack: CLEAN
  role: "Exact reviewed implementation source; the later T6 handoff-note commit is metadata-only."
artifact:
  name: "workflow-bundle-2.6.2.tgz"
  version: "2.6.2"
  sha256: "ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47"
  size_bytes: 954956
  provenance: "Locally packed once from the clean exact source commit with the package prepack runtime generator."
  lifecycle: "Ephemeral local pre-s08 candidate; no publish, release, tag, install-to-user-home, or parent mutation."
runtime_policy_binding:
  canonical_sha256: "4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9"
  packaged_codex_sha256: "4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9"
  packaged_claude_sha256: "4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9"
artifact_smoke:
  status: PASS
  command: "WORKFLOW_BUNDLE_CANDIDATE_TARBALL=<absolute candidate path> WORKFLOW_BUNDLE_CANDIDATE_SHA256=ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47 node packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
  evidence:
    - "Digest identity PASS."
    - "Installed wfc version 2.6.2 PASS."
    - "Codex/Claude x global/project install/update matrix PASS 4/4."
    - "Packaged Codex and Claude policy digests equal the canonical policy digest."
open_implementation_findings: []
qc_verification_handoff:
  - "Rerun the semantic fixture, runtime generation/parity, adjacent regressions, workflow validators, pack audit, diff, and UTF-8 checks against the exact source candidate."
  - "Run hosted Node 18/22 Guardrails for a pushed exact candidate and bind the hosted artifact; retain this digest as historical pre-host evidence if archive bytes differ."
  - "Record Technical Verification first and DoD only afterward; neither verdict is inferred from this handoff."
parent_cr_008_handoff:
  required: true
  superseded_by: "T6a post-receipt candidate"
  rule: "Parent CR-008 must re-verify an exact candidate containing child source commit 1a803ba84a4e76150c90954d89dcc3b52f75111e after child DoD."
  release_status: BLOCKED_PENDING_CHILD_DOD_AND_PARENT_REVERIFY
  rollback_version: "v2.6.1"
worktree_cleanup_guard:
  status: HOLD_OPEN
  reason: "Branch/worktree finalization remains blocked until child s08 DoD and parent exact-candidate re-verification complete."
next_human_action: "Historical T6 handoff is superseded by the locally passing T6a candidate; hosted evidence remains pending."
```

## T6a Metadata-only Rebind
```yaml
task: "T6a"
finding_ref: "F-AR08-001"
status: CANDIDATE_BOUND_READY_FOR_HOSTED
authorized_at: "2026-09-08T10:55:26Z"
authorization:
  reopen_s07_and_finding:
    reviewed_by: ["qc"]
  task_plan_amendment:
    reviewed_by: ["developer"]
  spec_reapproval:
    reviewed_by: ["ba"]
  contract_reapproval:
    reviewed_by: ["developer"]
  dor_reapproval:
    reviewed_by: ["ba", "qc"]
    receipt_sealer: "qc"
  approach_reapproval:
    reviewed_by: ["developer"]
  task_plan_reapproval:
    reviewed_by: ["developer"]
decision_source: "User explicitly approved the complete T6a recommendation bundle with the named roles."
change_class: "metadata-only workflow artifact rebind"
behavior_change: NO
tdd_status: NOT_APPLICABLE
tdd_reason: "No production policy, executable router, test behavior, schema, reason code, or packaged runtime content changes."
metadata_delta:
  - "Normalize s01-s07 frontmatter from invalid targeted to supported independent."
  - "Keep s08 on independent and synchronize affected gate-review provenance."
  - "Refresh s04 approved s02/s03 digests after their frontmatter changes."
  - "Record the approved T6a amendment and retain a97e0ee… / ebfb5ffb… as historical pre-amendment evidence."
receipt_boundary:
  affected_gates: ["spec", "contract", "dor", "approach", "task_plan"]
  status: VERIFIED
  rule: "No resumed candidate may be created until every refreshed receipt is APPROVED with digest_match=true."
  evidence:
    - "Spec APPROVED by BA at 2026-09-09T02:25:40.247Z; digest_match=true; s04 SHA-256 2068bb3a4ae95377e2cf5af79ef2c43f48fc71ac920b2af0fd5fabc3b7e74295."
    - "Contract APPROVED by Developer at 2026-09-09T02:25:56.083Z; digest_match=true; same s04 SHA-256."
    - "DoR APPROVED by QC at 2026-09-09T02:26:08.853Z; digest_match=true; same s04 SHA-256."
    - "Approach APPROVED by Developer at 2026-09-09T02:26:27.677Z; digest_match=true; s05 SHA-256 c423abe3bc3dab0f735bc757e740e5ba39d9659acc9962e4472cfa50c9a9b8e5."
    - "Task Plan APPROVED by Developer at 2026-09-09T02:26:39.341Z; digest_match=true; s06 SHA-256 af21fc0379d79cd4e345caaed4b693e191d727ea9b78d3d9d774162dee5b94b3."
verification_path:
  - "npm run validate:workflow:execution -- --workflow-root work-items"
  - "npm run validate:workflow -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:protocol -- --workflow-root work-items"
  - "npm run validate:workflow:planning -- --workflow-root work-items"
  - "git diff --check and UTF-8/U+FFFD checks for the eight CF-019 notes"
verification_evidence:
  validated_at: "2026-09-09T01:55:03Z"
  workflow_execution: "PASS; 193 workflow notes"
  child_workflow_governance: "PASS; 8 files and 8 notes"
  workflow_planning: "PASS; 193 workflow notes"
  work_item_report_json: PASS
  diff_check: PASS
  utf8_and_replacement_scan: PASS
  protocol: "PASS at 2026-09-09T02:28:18Z; 11 protocol-managed work items validated and 16 legacy items skipped"
historical_candidate:
  source_sha: "a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff"
  artifact_sha256: "ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47"
  hosted_run_id: "34216520563"
  disposition: "HISTORICAL_PRE_AMENDMENT_ONLY"
post_t6a_candidate:
  built_at: "2026-09-09T02:36:31Z"
  source_sha: "1a803ba84a4e76150c90954d89dcc3b52f75111e"
  source_worktree_status: CLEAN
  artifact_path: "/private/tmp/cf019-t6a-candidate.SdWPFD/workflow-bundle-2.6.2.tgz"
  artifact_sha256: "ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47"
  artifact_size_bytes: 954956
  package_version: "2.6.2"
  payload_relation: "Byte-identical to the pre-amendment package because T6a changes only work-item metadata outside the package files allowlist."
  runtime_policy_sha256: "4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9"
  artifact_smoke: "PASS; digest identity, version, and Codex/Claude global/project install-update matrix 4/4"
  lifecycle: "Ephemeral local post-T6a candidate; no publish, release, tag, or persistent install."
next_action: "Commit this binding-only handoff and push the branch to rerun hosted Guardrails."
```

## Workflow Pack Audit
```yaml
audit_scope: "CF-019 canonical policy wording, generated runtime parity, and adjacent workflow-pack compatibility"
checks:
  - id: "PACK-MECHANICAL"
    status: PASS
    evidence: "npm run validate:workflow:pack-audit returned WORKFLOW_PACK_AUDIT=PASS, including 170 flat-layout cross-references, 42 unique skill names, frontmatter, schemas, markers, and hard-rule heading sync."
  - id: "PACK-AUTHORITY"
    status: PASS
    evidence: "The delta changes no Hard Rule heading or executable router; authority sync remains green and the generic Skill Requirement now defers to router applicability."
  - id: "PACK-TEMPLATE-SCHEMA"
    status: PASS
    evidence: "No skill, workflow-chain mapping, step template, schema, or SA/TA contract changed; the semantic checklist requires no follow-on mapping update."
  - id: "PACK-RUNTIME-PARITY"
    status: PASS
    evidence: "Canonical, generated Codex, and generated Claude policies are byte-identical at SHA-256 4d8e8c686a266908b1642c829c7daa2ad7572e989e802432ec3dc9e4010435c9."
  - id: "PACK-ENCODING"
    status: PASS
    evidence: "All five affected source/generated text surfaces decode as UTF-8 and contain no U+FFFD replacement character."
findings: []
overall_status: PASS
follow_up_actions:
  - "Rerun the same matrix against the exact child candidate in s08."
notes: "No release, installation, merge, tag, or parent-candidate mutation was performed."
```

## Traceability
```yaml
upstream:
  - "align-adaptive-sa-ta-applicability.s04.acceptance-criteria.md"
  - "align-adaptive-sa-ta-applicability.s05.technical-approach.md"
  - "align-adaptive-sa-ta-applicability.s06.task-breakdown.md"
task_status:
  T1: COMPLETE
  T2: COMPLETE
  T3: COMPLETE
  T4: COMPLETE
  T5: COMPLETE
  T6: COMPLETE
  T6a: CANDIDATE_BOUND_READY_FOR_HOSTED
implementation_candidate_commit: "1a803ba84a4e76150c90954d89dcc3b52f75111e"
local_candidate_sha256: "ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47"
candidate_disposition: "Newly packed post-T6a local candidate; exact-artifact smoke PASS, hosted evidence pending."
next_step: "Push the binding-only handoff and run hosted Guardrails against the post-T6a branch head."
```

## Handoff
- Outputs actual: T1/T2 RED-to-GREEN policy evidence plus T3/T4 runtime parity, regression, governance, audit, and encoding evidence.
- Completed reviews: AR-B1 and AR-B2 passed Spec Compliance before Code Quality with the required human roles and no open finding.
- Candidate: clean source `1a803ba84a4e76150c90954d89dcc3b52f75111e`; newly packed local artifact SHA-256 `ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47`; exact smoke PASS 4/4.
- Historical note: the old package has the same digest because T6a changes no packaged byte; provenance now binds the newly created file to the post-receipt source.
- Current gate: hosted verification; Technical Verification, DoD, and parent re-verification remain open.
- Notes for testing: Workflow Execution and Protocol now pass; create and verify one immutable candidate while keeping router behavior and stable reason values unchanged.
- Notes for deployment: none; this child performs no release or installation action.
