---
artifact_id: "recover-proposals-with-new-change.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "recover-proposals-with-new-change"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: CHANGE
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
  srs: "product-specs/srs/recover-proposals-with-new-change.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles: ["developer", "qc"]
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
  approach: ["developer"]
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
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-10-15T08:31:25Z"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "recover-proposals-with-new-change.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.

## Step Contract
```yaml
step_goal: "Prepare s05 for human review"
input_summary: ["Accepted scope", "main 54243b7", "product-specs/srs/recover-proposals-with-new-change.md"]
output_summary: ["Reviewable s05 proposal"]
done_when: ["Content reviewed; applicable human gates recorded separately"]
owner: "developer"
```

## Option Analysis
```yaml
options:
  - {"name": "prepared_output", "summary": "Pure canonical preparation and operation-owned exclusive writes.", "pros": ["Preflight and bounded retry"], "cons": ["Durable ownership metadata"]}
  - {"name": "direct_scaffold", "summary": "Remove guard and invoke current incremental writer.", "pros": ["Smaller code delta"], "cons": ["No safe preflight or partial-write ownership; rejected"]}
  - {"name": "recreate_intake", "summary": "Delete and recreate proposal.", "pros": [], "cons": ["Loses signed provenance; rejected"]}
recommended_option: prepared_output
trade_offs: ["Interrupted directory reservation without ownership manifest requires explicit inspection"]
```

## Foundation Decision
NOT_APPLICABLE: no stack, runtime or architectural foundation change.

## Main Artifact
```yaml
design_problem: "Extend none-only recovery while retaining bounded writes and independent gate authority."
business_rule_trace: ["AC-RC-01 through AC-RC-07"]
design_options:
  - name: "Prepared canonical output with operation ownership"
    summary: "Preflight pure change/workflow templates, then exclusive writes under locks."
    pros: ["Reuses canonical content", "Supports bounded retry"]
    cons: ["Needs durable partial-write ownership"]
    risks: ["Crash during ownership setup"]
rejected_options:
  - name: "Remove guard and invoke scaffold directly"
    reason: "Current scaffolder writes incrementally and rejects existing files; unsafe partial-write recovery."
  - name: "Delete and recreate intake"
    reason: "Discards signed admission history."
recommended_design: "Prepared canonical output with operation ownership"
recommendation_reason: "Smallest extension that satisfies preflight, ownership and retry criteria."
component_changes: ["materialize-work-item recovery", "pure full-change template preparation in scaffold-change-package", "materializer and scaffolder tests", "EN/VI recovery references"]
data_flow: ["Validate candidate and signatures", "Acquire work-item then change-ID lock", "Prepare and validate all output", "Persist ownership manifest", "Create missing artifacts exclusively", "Commit report atomically", "Refresh projection"]
interface_changes: ["Existing resume-proposal accepts consistent create_new full packages; no new flag"]
failure_modes:
  - scenario: "Conflicting change claim or artifact"
    impact: "Wrong package could be reused"
    guardrail: "Exclusive claim plus manifest/content validation; refuse mismatch"
  - scenario: "Interrupted artifact creation"
    impact: "Partial drafts"
    guardrail: "Keep original report, verify owned outputs and retry same operation"
compatibility_impact: ["none recovery unchanged", "Fresh scaffold output and approval defaults unchanged"]
rollback_impact: ["Revert implementation to refuse linked recovery; retain created drafts and signatures, never delete automatically"]
observability_hooks: ["Existing APPLIED/NOOP and explicit precommit/postcommit errors", "Operation UUID in recovery metadata"]
constraints_applied: ["No grants", "No signatures created", "No shell execution of stored commands"]
validation_plan: ["AC-mapped tests and fault injection in s06"]
specialized_followups: []
notes_for_next_step: "User accepted recommendation; trusted Approach and Task Plan receipts still required."
```

## Architecture Details
Proposed transaction boundary:

1. Retain the existing work-item lock. Acquire a nonblocking exclusive change-ID lock under changes (canonical validated ID, non-following path checks). All recovery writers acquire locks in this order. A busy or stale lock is reported; never auto-delete another process lock. Process termination recovery follows the existing explicit stale-lock inspection policy.
2. Reserve the absent change directory exclusively. Place one durable recovery ownership manifest in it, created exclusively: schema version, work-item slug, change ID, operation UUID, original report SHA-256, and ordered relative output paths with SHA-256 digests. This manifest proves operation identity, never approval. A crash between directory reservation and manifest creation leaves an unowned empty directory and must fail closed for explicit operator inspection; never adopt it by inference.
3. Pure preparation returns canonical full-package paths/content without creating directories or syncing capabilities. Validate all change/workflow paths, IDs, metadata and existing contents before writes. Under retry, require a matching manifest and exact generated content for any existing change file. Refuse authored modifications during incomplete recovery; preserve them for owner review. Workflow draft preservation follows the existing recovered-note contract.
4. Create only missing allowlisted files with exclusive writes. Recheck report bytes before atomic commit. After commit retain manifest for identity checks; validate ID/ownership and current gate-safe state before projection repair. Do not silently overwrite authored change content on a committed NOOP retry.
5. Do not claim safety against hostile concurrent filesystem mutation or an older unrelated writer that ignores locks. Exclusive file writes and refusal protect against observed collision; operator intervention is required on conflicting content. Test supported recovery/recovery concurrency explicitly.

Manifest location and format are runtime metadata, not new role documents; implementation tests must pin them. Proposed filename: .materialization-recovery.json inside the newly owned change root. It is persistent operation provenance and does not contain credentials.

## Brownfield Impact Analysis
Changes are bounded to recovery and pure canonical full-package preparation. Ordinary scaffold CLI output/approval defaults remain unchanged. No dependency, schema migration or installed-profile mutation. Optional shared utility extraction requires explicit review if the two scripts no longer suffice.

## Traceability
```yaml
upstream: ["product-specs/srs/recover-proposals-with-new-change.md"]
next_step: "s06 after applicable approval"
```

## Handoff
User accepted this authoring packet in chat; recorded at 2026-10-15T08:31:25Z. Trusted receipt sealing and verification are required before activation. Release authorization remains separate.
