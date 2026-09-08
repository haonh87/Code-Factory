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
status: approved
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
review_mode: targeted
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
> CF-019 is ACTIVE in the existing CR-008 worktree. T1 produced one intentional RED assertion for
> the unconditional SA/TA rule while every router baseline remained green; T2 applied the smallest
> canonical policy correction and made the same suite green. Human QC approved AR-B1 Spec
> Compliance, followed by human Developer/QC approval of Code Quality, for candidate `c0fc0e6d…`.
> T3 regenerated both runtime modes with exact canonical byte parity; T4 passed every targeted
> regression, workflow/governance validator, encoding check, and the mechanical plus semantic pack
> audit. Human QC approved AR-B2 Spec Compliance for candidate `aade0485…`, followed by human
> Developer/QC approval of AR-B2 Code Quality. T5 records complete TDD, worktree, review, and
> no-delegation evidence with no open implementation finding. T6 binds source commit
> `a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff` to local pre-s08 artifact SHA-256
> `ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47`; QC must still open and
> perform s08, and parent CR-008 must re-verify an exact candidate containing this child result.

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
  - "T1-T6 from the approved s06 Task Plan"
  - "Canonical semantic fixture, canonical policy, generated runtime parity, regressions, and evidence"
scope_out:
  - "Router implementation, reason-code vocabulary, schemas, or SA/TA output contracts"
  - "Release, Business Acceptance, merge, tag, publish, install, or worktree cleanup"
inputs_required:
  - "Digest-valid Spec, Contract, DoR, Approach, and Task Plan trusted receipts"
  - "Protocol ACTIVE with the approved write roots"
  - "Approved s05 Option A and s06 T1..T6 sequence"
outputs_required:
  - "Fail-first precedence and exact six-trigger semantic evidence"
  - "Small canonical policy delta and generated Codex/Claude parity"
  - "AR-B1 and AR-B2 reviews in Spec Compliance -> Code Quality order"
  - "Exact child candidate handoff to child s08 and parent CR-008 re-verification"
done_when:
  - "T1-T6 outputs and verification paths are complete"
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
known_limitations:
  - "Child s08 Technical Verification and DoD, followed by parent CR-008 exact-candidate re-verification, remain human-controlled follow-up work."
  - "The local tarball digest is pre-host evidence; if hosted packaging produces different archive bytes, QC must compare extracted content and approve an amended hosted binding before Technical Verification."
follow_up_items:
  - "Request QC approval to open s08 for the exact T6 candidate."
  - "After child DoD, refresh parent CR-008 verification against a candidate that contains source commit a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff."
notes_for_testing: "Open s08 only after QC approval. Use source commit a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff and local pre-s08 artifact SHA-256 ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47; rerun the T4 matrix, exact-artifact smoke, and hosted Node matrix without inferring DoD."
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
review_mode: TARGETED
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
notes_for_implementation_or_verify: "AR-B1 and AR-B2 are complete in the required order with no blocking finding; bind the exact T6 candidate before requesting s08."
framework_notes:
  - "Node.js CommonJS fixture; no framework or runtime architecture change."
known_limitations:
  - "QC-owned s08 and parent CR-008 exact-candidate re-verification remain open."
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
  - "Child s08 Technical Verification and DoD pass for the exact T6 candidate."
  - "Parent CR-008 re-verifies a candidate that includes the exact child result."
next_action: "Request QC approval to open s08 for the exact T6 candidate."
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
  rule: "Parent CR-008 must re-verify an exact candidate containing child source commit a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff after child DoD."
  release_status: BLOCKED_PENDING_CHILD_DOD_AND_PARENT_REVERIFY
  rollback_version: "v2.6.1"
worktree_cleanup_guard:
  status: HOLD_OPEN
  reason: "Branch/worktree finalization remains blocked until child s08 DoD and parent exact-candidate re-verification complete."
next_human_action: "QC approves opening s08 Verify + DoD for the exact candidate."
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
implementation_candidate_commit: "a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff"
local_candidate_sha256: "ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47"
next_step: "Request human QC approval to open s08 Verify + DoD for the exact candidate; do not infer Technical Verification or DoD."
```

## Handoff
- Outputs actual: T1/T2 RED-to-GREEN policy evidence plus T3/T4 runtime parity, regression, governance, audit, and encoding evidence.
- Completed reviews: AR-B1 and AR-B2 passed Spec Compliance before Code Quality with the required human roles and no open finding.
- Candidate: source `a97e0ee38350a174b5a3dbe2ef69f47719c5f0ff`; local pre-s08 `workflow-bundle-2.6.2.tgz` SHA-256 `ebfb5ffb4c521d3269149cefd86c98971ad94e7037e5b6dfbc847053ad9d9f47`.
- Current gate: QC approval to open s08; Technical Verification, DoD, and parent re-verification remain open.
- Notes for testing: review the locked acceptance behavior before style; the router module and stable reason values are unchanged.
- Notes for deployment: none; this child performs no release or installation action.
