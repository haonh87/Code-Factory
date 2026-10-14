---
artifact_id: "contain-legacy-codex-installer-paths.s07.implementation"
artifact_family: workflow-step
work_item_slug: "contain-legacy-codex-installer-paths"
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
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: ""
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
  - "contain-legacy-codex-installer-paths.s06.task-breakdown.md"
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
step: s07
step_goal: "Execute T0-T4 in the approved four-path boundary; real hosted RED before production edits."
owner: developer
```

## Main Artifact

```yaml
recommended_design: "Approved Approach A; complete preflight before mutation."
implementation_mode: HARDENING
tasks_completed: [T0]
bug_repro_evidence: []
hypothesis_log:
  - assumption: "Legacy scripts write policy before validating stale manifest names and destination aliases."
    status: CONFIRMED
    evidence: "Read-only source review: mkdir/copy precede manifest reads in both entry points. Hosted behavior reproduction pending."
debug_experiments:
  - goal: "Confirm local integration refuses mutation"
    action: "Invoke runner without --ci-disposable"
    result: "Explicit --ci-disposable required; installer not invoked"
tdd_evidence: []
safe_refactor_notes: []
code_changes:
  - "Dedicated integration runner; production scripts unchanged pending RED."
doc_changes:
  - "This progress note; CLI-owned activation projections."
config_changes:
  - "Dedicated three-job GitHub-hosted verification workflow."
review_checkpoints:
  - "Spec compliance first: four-path ownership, same-SHA evidence, Windows Desktop 5.1, macOS Bash 3.2, no live-home execution."
  - "Test quality: fixture marker and bounded cleanup, aliases restricted to fixture-owned endpoints, UNC/drive syntax only through extracted pure validator, mandatory capability/guard preflights."
outputs_actual:
  - "T1 harness and workflow ready for hosted RED."
known_limitations:
  - "No hosted execution yet; setup failures cannot count as RED."
follow_up_items:
  - "Run T1 on hosted CI, inspect artifacts, then T2/T3 only after meaningful RED."
notes_for_testing: "No local destructive fixture execution; use the approved dedicated workflow."
```

## Delivery Rule Evidence

```yaml
behavior_change: YES
tdd_status: PENDING
tdd_test_refs:
  - "packages/workflow-bundle/test/legacy-installer-containment.integration.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/legacy-codex-installer-containment"
worktree_reason: "Approved full-track, destructive filesystem boundary, multiple sessions."
review_status: PARTIAL
review_refs: []
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Separate finalization after child DoD; no merge authorized here."
verify_path:
  - "Three hosted platform jobs and artifacts on one final SHA."
```

## Implementation Notes

T0: the human sealed work-item approval at 2026-10-13T13:34:45.850Z and readiness bundle at 2026-10-13T13:34:48.416Z, transaction `9c1474f8-7311-4220-9e08-67e6f16f7695`. Production CLI status confirms APPROVED signatures and matching s04/s05/s06 digests. Normal CLI activation succeeded at s07 with exactly four delivery paths plus this work-item evidence root. Accepted spec and s04/s05/s06 are frozen. No signer is executed by the agent.

T1 local review: Node syntax, workflow YAML and whitespace checks PASS; local no-flag guard rejects before writes. Upstream action v4 refs were resolved using the official GitHub API and pinned to immutable commits. Repo Actions is enabled. No source installer has been modified or executed locally. Mandatory hosted safety preflight tests cover missing flag, non-Actions invocation, wrong engine and existing managed root, followed by symlink/junction/hard-link capabilities.

## Handoff

ACTIVE, implementation incomplete. Publish the test/workflow commit on the approved branch and inspect real RED plus positive-control results before production repair. No DoD or Business Acceptance verdict is claimed.

Hosted run `38407996492` at `8135f70`: Linux and macOS completed their matrices with meaningful containment failures and passing valid-install controls. Windows failed capability setup because RUNNER_TEMP is on D: and home is on C:, so its hard-link probe crossed volumes; this is not counted as RED. T1 correction places unique outside sentinels beside the disposable native home on its own volume, while the synthetic repository stays under RUNNER_TEMP. Ownership and no-follow cleanup include that explicit sentinel root. Production scripts remain unchanged; rerun all jobs before T2.

T1 RED accepted as technical evidence: run `38512210399` at `5165c9b`, all 62 cases executed per platform, no setup errors or missing cases. Linux/macOS each had 54 FAIL and 8 PASS; Windows had 53 FAIL and 9 PASS. Valid-install controls passed; Bash additionally exposed CRLF/BOM stale-cleanup incompatibility. All four harness guards and required link capabilities passed. T2 now adds Bash name/duplicate/manifest/topology preflight before mutation, including portable link-count checks and non-following recursive inspection. Early review order: AC/spec alignment PASS, shell literal paths and Bash 3.2 syntax PASS; hosted GREEN pending. PowerShell remains unchanged until T2 evidence.

T2: run `38513013906` at `4777631` reports Linux and macOS job success; Windows remains expected RED on its unchanged production source. T3 implements PowerShell preflight with strict UTF-8 decoding, raw-name uniqueness, literal operations and no-follow destination inspection. Read-only Win32 metadata resolves the physical home and counts hard links; optional drive-root code is preserved. Early review: AC/spec alignment first, then native handle disposal, literal paths and preflight ordering. Desktop 5.1 parse/runtime evidence is delegated to the actual Windows CI job, not claimed locally.

Run `38513569396` at `4c3ce7b` reports all three jobs GREEN. Pre-verify review found a specific additional encoding concern: both parsers strip a trailing CR even without its LF terminator. T1 regression coverage is extended with bare-CR, NUL, invalid UTF-8 and invalid source-name fixtures under the same approved encoding/name contract. Reproduce bare-CR failure before changing the parsers; the earlier GREEN is not treated as final verification.

Encoding regression RED: run `38515188320` at `71f7014`, all 69 cases executed on each platform, no setup errors; exactly current-bare-carriage and legacy-bare-carriage failed on each platform. The minimal parser correction now removes CR only when an LF terminator was actually consumed. NUL, invalid UTF-8 and invalid source names already rejected correctly. Syntax and early spec/code review pass; rerun complete platform matrix.
