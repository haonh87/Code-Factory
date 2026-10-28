---
artifact_id: "workflow-pack-security-baseline.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "workflow-pack-security-baseline"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: RESEARCH
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
  card: "product-specs/cards/workflow-pack-security-baseline.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["po", "ba", "ta", "developer", "qc"]
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
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: ["po"]
  dod: ["qc"]
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
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-10-27T14:39:32.499Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "workflow-pack-security-baseline.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 — Task Plan

Human content review is recorded below. Actual gate approval is established only by valid trusted receipts bound to these bytes; scanning also requires explicit s07 activation.

## Main Artifact

```yaml
implementation_goal: "Produce the accepted bounded security baseline evidence."
task_breakdown:
  - id: "T1"
    owner_role: "developer"
    name: "Admission and isolated workspace"
    objective: ["Supported admission recovery, work-item approval and four readiness receipts", "Create a dedicated child worktree at the pinned commit; keep canonical report ownership explicit"]
    paths_in_scope: ["work-items/workflow-pack-security-baseline"]
    dependencies: []
    verification_hint: "Verify signatures/current host hashes; source baseline and owned write grants match; no source implementation."
    review_checkpoint: "Spec compliance before evidence/tool quality; QC reviews the final handoff."
  - id: "T2"
    owner_role: "developer"
    name: "Tool provenance and isolation preflight"
    objective: ["Acquire exact-version engines and immutable local rules into owned scratch", "Record digest/license/rule inventory and network/write denial controls"]
    paths_in_scope: ["/tmp/cf-security-scan-<run-id>/tools", "work-items/workflow-pack-security-baseline/evidence/tool-manifest.json"]
    dependencies: ["T1"]
    verification_hint: "Verify publisher/package checksum, pinned digest, license eligibility; prove source write and network denied. Stop on any unresolved failure."
    review_checkpoint: "Spec compliance before evidence/tool quality; QC reviews the final handoff."
  - id: "T3"
    owner_role: "developer"
    name: "Manifest and detector controls"
    objective: ["Export allowlisted tracked blobs without following symlinks", "Construct harmless positive/negative fixtures for enabled detection classes and secret redaction"]
    paths_in_scope: ["/tmp/cf-security-scan-<run-id>/input", "/tmp/cf-security-scan-<run-id>/controls", "work-items/workflow-pack-security-baseline/evidence/source-manifest.json"]
    dependencies: ["T2"]
    verification_hint: "Reconcile 498 files/43 skill entries; run controls in isolation; no real credentials; failing controls invalidate lane."
    review_checkpoint: "Spec compliance before evidence/tool quality; QC reviews the final handoff."
  - id: "T4"
    owner_role: "developer"
    name: "Scan and manual review"
    objective: ["Run offline scans; account for all files, parse errors, timeouts and exclusions", "Review skill and integration trust boundaries with reachable evidence"]
    paths_in_scope: ["/tmp/cf-security-scan-<run-id>/output", "work-items/workflow-pack-security-baseline/evidence/coverage.json"]
    dependencies: ["T3"]
    verification_hint: "Check exit meanings rather than zero exit alone; every manifest path has a disposition; spec compliance then evidence quality review."
    review_checkpoint: "Spec compliance before evidence/tool quality; QC reviews the final handoff."
  - id: "T5"
    owner_role: "developer"
    name: "Triage and sanitize"
    objective: ["Classify each finding and propose remediation owners", "Export only allowlisted SARIF fields and sanitized Markdown"]
    paths_in_scope: ["work-items/workflow-pack-security-baseline/evidence/findings.sarif", "work-items/workflow-pack-security-baseline/evidence/findings.md"]
    dependencies: ["T4"]
    verification_hint: "QC checks false positives and severity against local evidence; synthetic secrets/source snippets absent from retained files."
    review_checkpoint: "Spec compliance before evidence/tool quality; QC reviews the final handoff."
  - id: "T6"
    owner_role: "developer"
    name: "Verify and closeout"
    objective: ["Complete s08 coverage and regression summary", "Request genuine QC DoD and PO business acceptance; parent CF-006 disposition remains separate"]
    paths_in_scope: ["work-items/workflow-pack-security-baseline/workflow-pack-security-baseline.s07.implementation.md", "work-items/workflow-pack-security-baseline/workflow-pack-security-baseline.s08.verification.md"]
    dependencies: ["T5"]
    verification_hint: "Check source/non-target hash preservation, UTF-8, workflow validators and every AC; do not mark DONE without required receipts."
    review_checkpoint: "Spec compliance before evidence/tool quality; QC reviews the final handoff."
```

## Verification Plan

```yaml
levels: ["Tool/rule controls", "Coverage reconciliation", "Manual trust-boundary review", "Evidence redaction", "Read-only preservation", "Workflow and UTF-8 validation"]
skipped: ["No production unit/build suite rerun for evidence-only authoring; behavior fixes need separate items.", "No live service penetration, dependency-CVE audit or git history scan."]
tdd: "No production behavior change; positive/negative scanner and sanitizer controls precede real scan."
worktree: "Required: full/strict, security-sensitive and likely multiple sessions."
delegation: "None; agentic sequential execution."
release: "Not applicable."
```

## Brownfield Delivery Plan

```yaml
regression_checkpoints: ["Pinned source hashes before/after all scan tasks"]
compatibility_checkpoints: ["No installer/runtime or approval-store mutation by scanners"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Dispose only resources listed in the run manifest; leave source and other worktrees intact."]
```

## Traceability

```yaml
task_refs: {"AC-SEC-001": ["T3"], "AC-SEC-002": ["T2"], "AC-SEC-003": ["T2", "T4"], "AC-SEC-004": ["T3", "T4"], "AC-SEC-005": ["T4"], "AC-SEC-006": ["T5"], "AC-SEC-007": ["T3", "T5"], "AC-SEC-008": ["T6"], "AC-SEC-009": ["T6"]}
upstream: ["product-specs/cards/workflow-pack-security-baseline.md", "workflow-pack-security-baseline.s05.technical-approach.md"]
next_step: "Verify work-item approval and readiness receipts before T1 activation or T2 acquisition."
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Bounded evidence-only scope", "Worktree and offline isolation required", "No delegation or production behavior change"]
blocking_items: []
owner: "developer"
next_action: "Verify current-host receipts and isolated workspace before execution."
```
