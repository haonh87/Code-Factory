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
status: reviewed
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
  - "po"
  - "ba"
  - "ta"
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
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
tasks_completed: [T0, T1, T2, T3]
bug_repro_evidence:
  - "Hosted source-bound RED run 38512210399; see T1 record below."
hypothesis_log:
  - assumption: "Legacy scripts write policy before validating stale manifest names and destination aliases."
    status: CONFIRMED
    evidence: "Read-only source review: mkdir/copy precede manifest reads in both entry points. Hosted behavior reproduction pending."
debug_experiments:
  - goal: "Confirm local integration refuses mutation"
    action: "Invoke runner without --ci-disposable"
    result: "Explicit --ci-disposable required; installer not invoked"
tdd_evidence:
  - behavior: "Reject malformed names/topology before all writes; preserve valid installation."
    failing_test: "38512210399 / 5165c9b: meaningful RED on all three engines"
    passing_test: "38515427610 / 0e6392f: 69/69 cases on each engine"
  - behavior: "Reject bare CR while preserving CRLF"
    failing_test: "38515188320 / 71f7014: exactly two bare-CR failures per engine"
    passing_test: "38515427610 / 0e6392f: all encoding cases PASS"
safe_refactor_notes: []
code_changes:
  - "Both direct installers now preflight input/topology before target mutation; dedicated integration runner verifies the contract."
doc_changes:
  - "This progress note; CLI-owned activation projections."
config_changes:
  - "Dedicated three-job GitHub-hosted verification workflow."
review_checkpoints:
  - "Spec compliance first: four-path ownership, same-SHA evidence, Windows Desktop 5.1, macOS Bash 3.2, no live-home execution."
  - "Test quality: fixture marker and bounded cleanup, aliases restricted to fixture-owned endpoints, UNC/drive syntax only through extracted pure validator, mandatory capability/guard preflights."
outputs_actual:
  - "Four approved delivery files implemented; final hosted CI run 38515427610 PASS on all three engines."
known_limitations:
  - "Single-writer threat model only; post-preflight I/O failures are not transactional. No automated lint/security scanner is installed locally; s08 records justified skips and targeted manual review."
follow_up_items:
  - "Complete T4 human DoD and Business Acceptance from s08; keep worktree open."
notes_for_testing: "No local destructive fixture execution; use the approved dedicated workflow."
```

## Delivery Rule Evidence

```yaml
behavior_change: YES
tdd_status: DONE
tdd_test_refs:
  - "packages/workflow-bundle/test/legacy-installer-containment.integration.js"
tdd_exception_reason: ""
tdd_alternative_verify_path: []
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/legacy-codex-installer-containment"
worktree_reason: "Approved full-track, destructive filesystem boundary, multiple sessions."
review_status: COMPLETED
review_refs:
  - "contain-legacy-codex-installer-paths.s07.implementation.md#Final Implementation Review"
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

Implementation and ordered review are complete. T4 technical evidence is recorded in s08; human DoD and Business Acceptance remain pending. No merge, cleanup or completion verdict is claimed.

Hosted run `38407996492` at `8135f70`: Linux and macOS completed their matrices with meaningful containment failures and passing valid-install controls. Windows failed capability setup because RUNNER_TEMP is on D: and home is on C:, so its hard-link probe crossed volumes; this is not counted as RED. T1 correction places unique outside sentinels beside the disposable native home on its own volume, while the synthetic repository stays under RUNNER_TEMP. Ownership and no-follow cleanup include that explicit sentinel root. Production scripts remain unchanged; rerun all jobs before T2.

T1 RED accepted as technical evidence: run `38512210399` at `5165c9b`, all 62 cases executed per platform, no setup errors or missing cases. Linux/macOS each had 54 FAIL and 8 PASS; Windows had 53 FAIL and 9 PASS. Valid-install controls passed; Bash additionally exposed CRLF/BOM stale-cleanup incompatibility. All four harness guards and required link capabilities passed. T2 now adds Bash name/duplicate/manifest/topology preflight before mutation, including portable link-count checks and non-following recursive inspection. Early review order: AC/spec alignment PASS, shell literal paths and Bash 3.2 syntax PASS; hosted GREEN pending. PowerShell remains unchanged until T2 evidence.

T2: run `38513013906` at `4777631` reports Linux and macOS job success; Windows remains expected RED on its unchanged production source. T3 implements PowerShell preflight with strict UTF-8 decoding, raw-name uniqueness, literal operations and no-follow destination inspection. Read-only Win32 metadata resolves the physical home and counts hard links; optional drive-root code is preserved. Early review: AC/spec alignment first, then native handle disposal, literal paths and preflight ordering. Desktop 5.1 parse/runtime evidence is delegated to the actual Windows CI job, not claimed locally.

Run `38513569396` at `4c3ce7b` reports all three jobs GREEN. Pre-verify review found a specific additional encoding concern: both parsers strip a trailing CR even without its LF terminator. T1 regression coverage is extended with bare-CR, NUL, invalid UTF-8 and invalid source-name fixtures under the same approved encoding/name contract. Reproduce bare-CR failure before changing the parsers; the earlier GREEN is not treated as final verification.

Encoding regression RED: run `38515188320` at `71f7014`, all 69 cases executed on each platform, no setup errors; exactly current-bare-carriage and legacy-bare-carriage failed on each platform. The minimal parser correction now removes CR only when an LF terminator was actually consumed. NUL, invalid UTF-8 and invalid source names already rejected correctly. Syntax and early spec/code review pass; rerun complete platform matrix.

## Final Implementation Review

```yaml
review_target: "Four approved delivery paths at 0e6392f"
planning_track: full
review_mode: TARGETED
review_order: [SPEC_COMPLIANCE, CODE_QUALITY]
review_batches:
  - batch: "T1 fixture safety"
    scope: ["integration runner", "CI workflow"]
    trigger: "Before legacy entry-point execution"
    reviewer_role: developer
  - batch: "T2 Bash and T3 PowerShell"
    scope: ["preflight", "mutation phase", "encoding"]
    trigger: "After meaningful RED, before each platform rerun"
    reviewer_role: developer
required_checks:
  spec_compliance: ["AC-PI-001..006", "single-writer boundary", "four delivery files", "unchanged optional drive-root tail"]
  code_quality: ["literal path operations", "non-following topology inspection", "hard-link metadata", "pure lexical guard", "native handle disposal", "no secrets in CI"]
finding_policy:
  blocker_threshold: "Any containment failure, skipped mandatory fixture or unsupported evidence claim blocks verify."
  reopen_conditions: ["changed script/workflow bytes", "new behavioral failure", "scope/spec drift"]
handoff_to_verify: ["207 platform cases PASS at one source SHA", "47 unit files PASS across documented setup/retry runs", "scan limitations retained"]
notes_for_implementation_or_verify: "Targeted agent review, not an independent human security signoff. Human QC/PO decisions remain required."
```

Final technical checkpoint: run `38515427610`, commit `0e6392f2f3351890f88b40cfd16a3efbd49048f8`. All 69 expected cases and four harness guards pass on each of three platforms, with no setup/cleanup errors or skipped cases. The accepted spec and s04/s05/s06 digests remain unchanged. Source-bound evidence and the local unit environment corrections are owned by s08.
