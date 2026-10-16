---
artifact_id: "release-workflow-bundle-v2-6-4-cr010.s07.implementation"
artifact_family: workflow-step
work_item_slug: "release-workflow-bundle-v2-6-4-cr010"
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
change_id: "CR-010"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/release-workflow-bundle-v2-6-4.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "required"
  business_acceptance: "required"
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
  - "release-workflow-bundle-v2-6-4-cr010.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> R1-R4 implemented/reviewed and automated checks passed in isolated release/v2.6.4 worktree. Human scan-gap/DoD/Release decisions remain pending.

## Step Contract
```yaml
step_goal: "Prepare the approved v2.6.4 candidate without mutating v2.6.3."
input_summary: ["Six trusted preparation receipts verified on 2026-10-16", "Approved CR-010 s04-s06"]
output_summary: ["Version, active docs and release regression expectations", "Source/package inventory"]
done_when: ["Scoped implementation reviewed", "Verification handoff records actual evidence"]
owner: developer
```

## Main Artifact
```yaml
recommended_design: "Approved s05; preserve package allowlist, build once in hosted Guardrails."
implementation_mode: HARDENING
tasks_completed: [R1, R2, R3, R4]
bug_repro_evidence: []
hypothesis_log:
  - assumption: "Existing release assertions still describe v2.6.3."
    status: CONFIRMED
    evidence: "Four release test preflights fail on 2.6.4 expectations before metadata bump."
debug_experiments: []
tdd_evidence:
  - behavior: "Candidate identity and rollback boundary"
    failing_test: "/tmp/v264-red-*.log: expected 2.6.4, got 2.6.3"
    passing_test: "release-surface passes; full suite and exact artifact verification tracked in s08"
safe_refactor_notes: ["No production behavior rewrite; metadata/help version only."]
code_changes: ["bin/wfc.js public flow label"]
doc_changes: ["Active EN/VI release docs", "docs/releases/workflow-bundle-v2.6.4.md"]
config_changes: ["Root/package version manifests and package.json", "Native installer workflow manual dispatch trigger"]
review_checkpoints: ["B1 release contract/metadata", "B2 public docs and package boundary", "B3 candidate bytes and rollback PASS"]
outputs_actual: ["Isolated release/v2.6.4 worktree", "Candidate metadata and complete semantic delta inventory"]
known_limitations: ["CHANGE/CR alias collision remains out of scope and documented", "Final hosted candidate and publication are pending"]
follow_up_items: ["R3 exact candidate/fallback smoke", "R4 hosted/native evidence", "R5 only after Release receipt"]
notes_for_testing: "Use retained artifacts and explicit temporary runtime homes; never mutate live installs."
```

## Delivery Rule Evidence
```yaml
behavior_change: NO
tdd_status: DONE
tdd_test_refs: ["/tmp/v264-red-surface.log", "/tmp/v264-red-release-install-all-smoke.log", "/tmp/v264-red-release-candidate-artifact-smoke.log", "/tmp/v264-red-release-rollback-smoke.log"]
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs: [".claude/worktrees/release-workflow-bundle-v2-6-4-cr010"]
worktree_reason: "Full release scope, cross-session isolation and immutable release risk."
review_status: COMPLETED
review_refs: ["B1/B2 below; B3 exact artifact review complete; see s08"]
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "release/v2.6.4 -> main only after applicable human closure gates"
verify_path: ["Full unit", "Fixture and authoring smoke", "Pack audit", "Hosted Node 18/22 same artifact", "Native containment", "Exact rollback", "UTF-8"]
```

## Implementation Notes

Authoritative signed notes and protocol report remain in the main workspace. Root CLI activation grants the in-repo worktree and CR-010 artifact paths; no signed references were rewritten to worktree paths. The worktree starts at cbf6c095b303f6979ac135b08c063bfdf2ad9fb2. Historical release records, direct installer bytes, unrelated user files and v2.6.3 are unchanged.

B1 targeted review, spec compliance then code quality: metadata and four release tests implement AC-REL-01/02/04/06. Added v2.6.3 historical release digest, canonical LF installer hashes, existing allowlist guard and correct rollback assertions (v2.6.3 retains exact disposition/history but lacks recovery). Test-first logs showed expected old-version failures; release-surface passed after implementation and runtime sync.

B2 targeted review, spec compliance then code quality: AC-REL-03 inventory separates six packaged recovery scripts, generated EN/VI authority/Light/recovery guidance and candidate metadata from direct source installers/CI/history. Public docs remain explicitly unpublished. No registry permission, live-install permission or parent-audit completion is inferred.

Two evidence-driven plan refinements are confined to verification infrastructure, with no production expansion: (1) full unit exposed a telemetry test hardcoded to 2.6.3; read the package manifest instead, targeted test now passes; (2) native containment workflow's path/branch filters cannot run on a metadata-only release branch, so add only workflow_dispatch. Existing matrix, permissions and actions remain unchanged. These satisfy the s06 allowance for a reviewed verification-gap adjustment.

Pack audit and semantic checklist: no skill/template/schema additions; 42 skills retained; guidance from the baseline maintains human authority and Light host mapping. Mechanical audit, 10 governance fixtures and 13 authoring cases passed. UTF-8 strict decode/no replacement characters passed for 22 changed files. First full unit run had only the stale telemetry assertion; its corrected targeted run passed. Final full run passed all 47 files. No candidate tarball built locally.

## Traceability
SRS AC-REL-01..09 -> approved s05/s06 -> R1/R2 diff -> s08 verification. Signed s04-s06 and SRS remain byte-identical.

## Handoff
R3/R4 are complete; request candidate-specific human decisions using s08. Keep the branch/worktree until human DoD and Release decisions. No tag, release or npm publication has occurred.

B3 review, spec compliance then code quality: final a50da628efb512dfac65d0f7bd8c18b86f41b460 passes hosted Guardrails and 207 native cases. Exact archive comparison found npm auto-includes README.vi.md; corrected the release note and listed all 33 changed paths before the final run. Final CI tarball remains byte-identical (SHA-256 9d7c5395ff5fb3ae2a64d26089a2c4c62122fb769a7cacd2e3bcea3f6fa35e84); exact rollback passes all four scenarios. Complete file inventory and remaining scan gaps belong to s08. No publication/merge/DoD authority is inferred from this review.
