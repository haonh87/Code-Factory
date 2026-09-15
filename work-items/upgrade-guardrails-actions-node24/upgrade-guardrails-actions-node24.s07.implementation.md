---
artifact_id: "upgrade-guardrails-actions-node24.s07.implementation"
artifact_family: workflow-step
work_item_slug: "upgrade-guardrails-actions-node24"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: CHANGE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: BLOCKED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/upgrade-guardrails-actions-node24.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: []
  dor: []
  approach: []
  task_plan: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
  - "upgrade-guardrails-actions-node24.s06.task-breakdown.md"
linked_artifacts:
  - "../../.github/workflows/workflow-guardrails.yml"
  - "upgrade-guardrails-actions-node24.work-item-report.json"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> The approved token-only implementation is complete locally: all nine checkout and all nine
> setup-node selectors now use v7, while the masked workflow fingerprint remains identical.
> Local implementation checks pass and Developer/QC approved Spec Compliance for the exact
> workflow artifact. Developer/QC then approved Code Quality for the same workflow and production
> diff digests. The production-only source commit is `5baea95`. Hosted run `34947061938` passed
> all 10 jobs, but AC-04 failed because upload-artifact@v4 emitted one Node 20 warning and
> download-artifact@v4 emitted one warning in each matrix job. No scope expansion is authorized;
> finding `F-N24-H1` blocks verification pending a human-approved Spec/DoR/Approach/Task Plan amendment.

## Main Artifact
```yaml
implemented_changes:
  - ".github/workflows/workflow-guardrails.yml: replaced 9 actions/checkout@v4 selectors with @v7."
  - ".github/workflows/workflow-guardrails.yml: replaced 9 actions/setup-node@v4 selectors with @v7."
doc_changes:
  - "This s07 note records baseline, fail-first, implementation, compatibility, and review evidence."
operational_notes:
  - "No trigger, permission, job, needs, runner, timeout, command, Node matrix, input, cache, submodule, credential, artifact, or parallelisation setting changed."
  - "release-candidate retains fetch-depth: 0."
  - "No release, tag, merge, or publication action was performed."
```

## Baseline and Fail-First Evidence
```yaml
baseline_source: "acc73a438b029d188aa8fc8fe69d2ceb47cab096"
baseline_counts:
  checkout_v4: 9
  setup_node_v4: 9
  jobs: 9
  fetch_depth_zero: 1
job_ids:
  - workflow-tooling
  - workflow-artifacts
  - workflow-sdd
  - workflow-changes
  - workflow-execution
  - workflow-planning
  - workflow-authoring-smoke
  - release-candidate-build
  - release-candidate
normalized_sha256: "996b04b793fe274af74a32ff1d49bd635e3a18118cde74b7b5fa02d903b9d16e"
red_command: >-
  node -e '<assert exactly 9 checkout@v7, 9 setup-node@v7, and zero old v4 selectors>'
red_result:
  exit_code: 1
  observed: { checkout_v7: 0, setup_node_v7: 0, old_checkout_v4: 9, old_setup_node_v4: 9 }
  reason: "EXPECTED RED: v7 invariant not yet satisfied"
```

## Implementation and Local Verification Evidence
```yaml
green_result:
  source_commit: "5baea95"
  checkout_v7: 9
  setup_node_v7: 9
  old_checkout_v4: 0
  old_setup_node_v4: 0
  fetch_depth_zero: 1
  normalized_sha256: "996b04b793fe274af74a32ff1d49bd635e3a18118cde74b7b5fa02d903b9d16e"
focused_diff:
  path: ".github/workflows/workflow-guardrails.yml"
  additions: 18
  deletions: 18
  semantic_delta: "Only the 18 action-major selectors changed from v4 to v7."
checks:
  - { check: "js-yaml parse and exact nine-job inventory", result: PASS }
  - { check: "normalized pre/post workflow fingerprint", result: PASS }
  - { check: "git diff --check", result: PASS }
  - { check: "validate:workflow:unit", result: "PASS (45 test files)" }
  - { check: "validate:workflow:pack-audit", result: PASS }
  - { check: "validate:workflow:authoring-smoke", result: "PASS (13 cases)" }
  - { check: "scoped workflow naming/governance validation", result: PASS }
  - { check: "scoped SDD validation", result: PASS }
  - { check: "scoped planning validation", result: PASS }
  - { check: "scoped execution validation", result: PASS }
hosted_check: "FAIL for AC-04 on run 34947061938: 10/10 jobs PASS, 3 Node 20 deprecation annotations"
```

## Major-Version Compatibility Review
```yaml
checkout:
  v5: "Moves the action runtime from Node 20 to Node 24; GitHub-hosted runners satisfy the minimum runner contract."
  v6: "Persists credentials in a separate file; this workflow adds no credential or container override and keeps the existing defaults."
  v7: "Adds fork-PR protection for pull_request_target/workflow_run; neither trigger exists here, so the current pull_request/push/workflow_dispatch contract is unchanged."
  v7_0_1: "Contains safety and input-handling fixes; no input migration is required."
setup_node:
  v5: "May auto-detect npm caching from packageManager metadata; the root manifest has no packageManager or devEngines.packageManager field."
  v6: "Limits automatic caching to npm and removes always-auth; the workflow has neither cache nor always-auth inputs."
  v7: "Moves internals to ESM and removes the dummy NODE_AUTH_TOKEN fallback; the workflow has no registry-url or authentication inputs."
security_note: "The major aliases preserve repository convention; immutable SHA pinning is a separate policy decision and is not introduced by this deadline-bound delta."
rollback_note: "Before the Node 20 removal cutoff, revert this single source commit if hosted compatibility fails; after the cutoff, fix forward on a supported v7 patch."
references:
  - "https://github.com/actions/checkout/blob/main/CHANGELOG.md"
  - "https://github.com/actions/setup-node/releases"
  - "https://github.com/actions/setup-node"
  - "https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/"
```

## Delivery Rule Evidence
```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "CI-N24-V1 command-level RED/GREEN action-count assertion"
tdd_exception_reason: ""
tdd_alternative_verify_path: ["normalized topology fingerprint", "focused diff", "exact hosted run"]
change_risk_profile: QUICK_FIX
worktree_status: USED
worktree_refs:
  - "codex/adaptive-governance-human-approval-ux"
worktree_reason: "The file was already owned by the CR-008 branch; keeping the deadline change here avoids ownership conflict and preserves a cheap token-only commit."
review_status: COMPLETED
review_refs:
  - "CI-N24-R1 Spec Compliance approved by Developer/QC for workflow SHA-256 a059d1a379076ca8773fc78fab5b3d0ab13c07a7dfaf78028705ff16970bb99e"
  - "CI-N24-R2 Code Quality approved by Developer/QC for production diff SHA-256 f0a0e02baabf4e1f668078022ee1b888a05514de9bb64e9ed3b6f77ce806fe49"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "One isolated 18-token commit on codex/adaptive-governance-human-approval-ux; cherry-pick remains possible if the deadline contingency is triggered."
verify_path:
  - "Human Spec Compliance review"
  - "Human Developer/QC Code Quality review"
  - "Commit and push exact source"
  - "Successful hosted Workflow Guardrails run with zero Node deprecation annotations"
  - "QC Technical Verification and DoD"
```

## SDD Traceability
```yaml
requirement_refs: ["CI-N24-REQ-001", "CI-N24-REQ-002", "CI-N24-REQ-003", "CI-N24-REQ-004", "CI-N24-REQ-005"]
acceptance_refs: ["CI-N24-AC-01", "CI-N24-AC-02", "CI-N24-AC-03", "CI-N24-AC-04", "CI-N24-AC-05"]
task_refs: ["CI-N24-T0", "CI-N24-T1", "CI-N24-T2", "CI-N24-T3", "CI-N24-T4"]
test_refs: ["CI-N24-V1", "CI-N24-V2", "CI-N24-V3", "CI-N24-V4"]
```

## Two-Tier Review Handoff
```yaml
spec_compliance:
  proposed_verdict: PASS
  human_verdict: PASS
  reviewed_by: ["developer", "qc"]
  reviewed_at: "2026-09-15T08:07:05Z"
  artifact_sha256: "a059d1a379076ca8773fc78fab5b3d0ab13c07a7dfaf78028705ff16970bb99e"
  evidence:
    - "CI-N24-AC-01: 9 checkout@v7 and 0 checkout@v4."
    - "CI-N24-AC-02: 9 setup-node@v7 and 0 setup-node@v4."
    - "CI-N24-AC-03: normalized SHA-256 is unchanged and fetch-depth: 0 remains."
    - "CI-N24-AC-05: nine-job/needs topology and non-parallel structure are unchanged."
  pending: "AC-04 intentionally remains hosted-verification work and does not weaken the s07 Spec Compliance verdict."
code_quality:
  proposed_verdict: PASS
  analysis_status: PASS
  human_verdict: PASS
  reviewed_by: ["developer", "qc"]
  reviewed_at: "2026-09-15T08:12:34Z"
  artifact_sha256: "a059d1a379076ca8773fc78fab5b3d0ab13c07a7dfaf78028705ff16970bb99e"
  production_diff_sha256: "f0a0e02baabf4e1f668078022ee1b888a05514de9bb64e9ed3b6f77ce806fe49"
  evidence:
    - "Focused 18-line replacement pair; no adjacent source change."
    - "YAML parsing, diff hygiene, unit, pack, authoring, SDD, planning, and execution checks pass."
    - "Official v5-v7 compatibility changes were checked against actual workflow inputs and root manifest metadata."
    - "A post-Spec-review recheck found zero non-version changed lines and reproduced the exact workflow and diff SHA-256 values."
  pending: "None for s07 review; hosted CI-N24-AC-04 remains an s08 verification obligation."
```

## Hosted Finding F-N24-H1
```yaml
finding_id: "F-N24-H1"
status: DIRECTION_APPROVED_PENDING_AMENDED_GATES
severity: HIGH
approved_by: ["developer", "qc"]
approved_at: "2026-09-15T09:14:23Z"
approved_option: "A"
source_commit: "ae6df04aff58de39a5f2f9f703598ad6d2b4c257"
workflow_change_commit: "5baea95"
run_id: 34947061938
run_url: "https://github.com/haonh87/Code-Factory/actions/runs/34947061938"
job_summary: "10/10 PASS"
annotation_summary:
  total_node_deprecation: 3
  upload_artifact_v4: 1
  download_artifact_v4: 2
evidence:
  - "Build Exact Release Candidate: upload-artifact@v4 targets Node 20 and is forced to Node 24."
  - "Release Candidate (Node 18): download-artifact@v4 targets Node 20 and is forced to Node 24."
  - "Release Candidate (Node 22): download-artifact@v4 targets Node 20 and is forced to Node 24."
root_cause: "The approved 18-token scope covered checkout/setup-node only, while AC-04 requires zero Node deprecation annotations across the complete workflow."
spec_conflict:
  - "CI-N24-AC-04 requires zero Node deprecation annotations."
  - "CI-N24-AC-03 and the scope guard currently permit only 18 checkout/setup-node selector changes."
  - "Both constraints cannot be satisfied simultaneously on the hosted runner."
options:
  - id: A
    direction: "Add two minimal Node 24 selector changes: upload-artifact@v4 -> @v6 and download-artifact@v4 -> @v7."
    assessment: "RECOMMENDED"
    reason: "These are the first majors that run on Node 24 by default; current name/path inputs are compatible, and download v8's new digest-mismatch default is avoided."
  - id: B
    direction: "Move to latest upload-artifact@v7 and download-artifact@v8."
    assessment: "REJECTED"
    reason: "Adds unnecessary direct-upload/ESM surface and a download digest-mismatch behavior change beyond the deadline requirement."
  - id: C
    direction: "Waive or narrow AC-04 to ignore artifact-action warnings."
    assessment: "REJECTED"
    reason: "Leaves a known Node 20 dependency that becomes non-operational at the published cutoff."
recommended_amendment:
  scope: "20 selector changes relative to the original baseline: the approved 18 plus one upload-artifact@v6 and one download-artifact@v7."
  behavior_guards:
    - "Preserve artifact name, path, retention, digest file, and upload/download ordering."
    - "Continue downloading by artifact name, so the historical by-ID path breaking change is not applicable."
    - "Do not adopt upload direct mode or download v8 digest-mismatch behavior."
  implementation_method: "New fail-first warning/action-count assertion, two-token commit, refreshed Spec Compliance then Code Quality, second exact hosted run."
required_human_decisions:
  - "Developer re-approves amended Spec, Approach, and Task Plan; QC re-approves amended DoR."
  - "Trusted ready-bundle receipts are resealed before the two production tokens change."
authorized_authoring_path:
  - "product-specs/cards/upgrade-guardrails-actions-node24.md"
decision_note: "Developer/QC approved F-N24-H1 and readiness rework; Developer approved Task Plan amendment T4a Option A and the added Spec Card authoring path. This is not approval of the amended gate artifacts or production edits."
references:
  - "https://github.com/actions/upload-artifact/releases/tag/v6.0.0"
  - "https://github.com/actions/download-artifact/releases/tag/v7.0.0"
  - "https://github.com/actions/download-artifact/releases/tag/v8.0.0"
```

## Audit
```yaml
step: "s07 Implement"
status: BLOCKED_REWORK
review_order: ["Spec Compliance", "Code Quality"]
reviewed_artifact_sha256: "a059d1a379076ca8773fc78fab5b3d0ab13c07a7dfaf78028705ff16970bb99e"
reviewed_diff_sha256: "f0a0e02baabf4e1f668078022ee1b888a05514de9bb64e9ed3b6f77ce806fe49"
checks:
  - { criterion: "Spec and scope alignment", result: PASS, evidence: "Developer/QC approved CI-N24 Spec Compliance at 2026-09-15T08:07:05Z." }
  - { criterion: "Implementation quality and compatibility", result: PASS, evidence: "Developer/QC approved CI-N24 Code Quality at 2026-09-15T08:12:34Z." }
  - { criterion: "Local verification", result: PASS, evidence: "Exact counts, normalized fingerprint, YAML, diff, unit, pack, authoring, scoped governance/SDD/planning/execution, and UTF-8 checks pass." }
remaining_obligations:
  - "Resolve F-N24-H1 through an approved and digest-bound readiness amendment."
  - "Implement and review the bounded two-token delta, then repeat exact hosted verification."
  - "QC Technical Verification and DoD only after AC-04 reaches zero annotations."
```
