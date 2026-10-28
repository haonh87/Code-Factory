---
artifact_id: "workflow-pack-security-baseline.s07.implementation"
artifact_family: workflow-step
work_item_slug: "workflow-pack-security-baseline"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
work_item_type: RESEARCH
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: reviewed
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: WAIVER_APPROVED
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
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
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
  - "workflow-pack-security-baseline.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 — Security Baseline Execution

## Main Artifact

```yaml
implementation_mode: HARDENING
recommended_design: "Pinned, credential-free local scanners in offline containers; manual review supplies explicitly bounded semantic coverage."
tasks_completed: ["T1: signed readiness verified and isolated worktree created", "T2: pinned tools and isolation controls", "T3: source manifest and detector controls", "T4: scans and targeted manual boundary review", "T5: retained-advisory triage and sanitized findings", "T6: technical evidence prepared; human closure blocked by AC-SEC-008"]
code_changes: []
doc_changes: ["Implementation evidence and scanner manifests in this work item"]
outputs_actual: ["498-file inventory with 43 skill entrypoints", "Pinned Semgrep/Gitleaks images", "Six Semgrep rule controls passed", "Non-root/no-network/read-only isolation controls passed"]
known_limitations: ["AC-SEC-008 historical installed/unrelated-untracked hash baseline was not captured", "Native PowerShell/CMD parsing unavailable", "Six selected JS rules and targeted manual review are bounded coverage", "Original aggregate invocation log was overwritten; raw outputs and hashes retained"]
notes_for_testing: "Control errors, unsupported syntax and skipped files must remain visible in coverage."
```

## Delivery Rule Evidence

```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: "Evidence-only baseline; no production behavior change. Positive/negative detector controls precede source scans."
tdd_alternative_verify_path:
  - "Six upstream Semgrep rule fixtures"
  - "Synthetic secret/redaction controls"
  - "Isolation controls"
change_risk_profile: LARGE_OR_RISKY
worktree_status: USED
worktree_refs:
  - ".claude/worktrees/workflow-pack-security-baseline"
worktree_reason: "Full/strict multi-session security evidence task with immutable source baseline."
review_status: COMPLETED
review_refs:
  - "Spec compliance and tool-preflight review below"
  - "Final batch review below"
  - "workflow-pack-security-baseline.s08.verification.md"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Evidence-only branch retained until human DoD and explicit finalization decision."
verify_path:
  - "s08 AC-SEC-001..009 evidence mapping"
  - "QC DoD and PO business acceptance after technical verify"
```

## Implementation Notes

```yaml
worktree_decision: REQUIRED
worktree_target: workflow-pack-security-baseline
planning_track: full
risk_signals: ["Security-sensitive evidence", "Multiple sessions"]
isolation_strategy:
  branch_name: "audit/workflow-pack-security-baseline"
  worktree_path: ".claude/worktrees/workflow-pack-security-baseline"
  owned_paths: ["work-items/workflow-pack-security-baseline"]
execution_guards: ["Canonical main CLI owns protocol transitions", "Signed gate hosts copied byte-identically; anchors are never rewritten", "Target source exported from pinned Git blobs without untracked files", "Containers receive no credentials or host home"]
cleanup_preconditions: ["Retain worktree until Verify + human DoD", "Dispose only run-owned scratch after sanitized evidence is retained"]
skip_reason: ""
```

## Spec Compliance and Tool Preflight

The source baseline is `7dce0335c7339ba6f3859e1bc34aaa1168f40971`. Canonical work-item and
Spec/DoR/Approach/Task Plan receipts verified before activation. Source remains unchanged.
The initial Docker daemon was stopped; OrbStack was started with approved OS access.
Semgrep initially attempted to write settings at a read-only default path. Only scanner
settings/log/Git config paths were moved to dedicated container tmpfs; isolation was preserved.
The control container returned UID 65534, CapEff zero, NoNewPrivs 1, EROFS on source/root writes
and ENETUNREACH on an outbound connection probe. Six pinned upstream Semgrep fixture pairs passed.

Rule acquisition uses commit `16b9e6d45f10649f6a531ec4838ed9924372c3bc`. The Semgrep Rules
License v1.0 allows internal business use; this run retains notices in private scratch and does
not redistribute third-party rules or provide a scan service. See
[upstream terms](https://semgrep.dev/legal/rules-license/). Scanner image/license hashes and
actual commands are captured under the run directory and will be sanitized for the child evidence.

## Traceability

```yaml
upstream: ["workflow-pack-security-baseline.s04.acceptance-criteria.md", "workflow-pack-security-baseline.s05.technical-approach.md", "workflow-pack-security-baseline.s06.task-breakdown.md"]
next_step: "s08 human closeout review under GOV-EX-003; signed blocker disposition and gate receipts remain required."
```

## Final Batch Review

Spec compliance precedes evidence quality. T1–T5 outputs match the approved source, scope and tool
boundary. All 498 files are accounted for; 58 JS files parsed without errors. Six rule controls,
secret-token/private-key controls and sanitizer rejection tests passed. Supplemental byte-identical
copies cover four ignored JS test files and four ignored lockfiles. Gitleaks reported zero alerts;
420 Semgrep records remain as advisories with IDs, source locations and developer/QC dispositions.
Six manual findings have explicit preconditions and separate remediation proposals.

The initial spec-compliance verdict was PARTIAL because AC-SEC-008 demands before/after hashes for installed
harnesses and unrelated work that were not fully captured before execution. Source/export/worktree
hashes and all 1,186 pre-existing tracked main-file hashes pass. This historical gap cannot be repaired
by inventing a pre-scan snapshot. The original aggregate command log was overwritten by a supplemental
runner; individual raw outputs remain hashed and reproducible invocation instructions are labeled as
reconstructed. The subsequently accepted exception below resolves the evidence-method decision; no clean-security claim is made.

Evidence-quality review followed identification of that scope/evidence gap: JSON/SARIF use allowlisted
fields, omit raw match snippets and private paths, retain advisory uncertainty and link source hashes.
Production code is unchanged. Technical evidence is handed to s08 with the blocker visible; human QC
review, DoD and PO business acceptance remain unapproved.

## Governance Exceptions
```yaml
exception_id: GOV-EX-003
work_item_ref: "work-items/workflow-pack-security-baseline"
step_ref: "s07,s08"
principle_ref: "AC-SEC-008 preservation evidence"
reason: "Historical pre-scan hashes were not captured for installed harnesses and unrelated untracked files; they cannot be reconstructed."
impact: "Accept a bounded evidence-method limitation for this baseline; do not assert hash preservation for the excluded locations."
mitigation: ["Retain the historical gap and isolation evidence", "Retain 498 pinned source hashes and 1186 pre-existing tracked-main hash checks", "Require explicitly scoped non-secret pre/post snapshots before any future authorized scan", "Keep all six findings and 420 advisories open for separate remediation"]
owner: "developer"
approved_by: "developer,qc,po"
status: APPROVED
review_date: "2026-10-28"
decision_recorded_at: "2026-10-28T08:31:58.975803+00:00"
human_decision: "User explicitly replied accept to the proposed limited evidence exception and remediation priority in this conversation. Approval applies to the evidence-method trade-off described in s08, including technical/QC/product authority requirements; it is one human decision, not an assertion of independent reviews."
limits: ["No historical hashes invented", "No vulnerability waiver", "No DoD or business-acceptance gate receipt created by this record", "No production fix, merge, release or parent closure authorized by this exception"]
```

The user accepted the narrowly scoped evidence-method exception after the report was presented.
The final batch review passes for this evidence-only baseline under GOV-EX-003; the factual
missing-hash limitation and all security findings remain. Human closure receipts are still separate.
