---
artifact_id: "mcp-root-containment.s01.restate"
artifact_family: workflow-step
work_item_slug: "mcp-root-containment"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
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
  card: "product-specs/cards/mcp-root-containment.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "ta"
  - "developer"
  - "qc"
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
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
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
  - "requirement-analysis"
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 — Clarify SEC-002

## Main Artifact

```yaml
raw_request: "User accepts SEC-002 MCP symlink/root containment remediation and asks to continue."
restated_request: "Make Git/session operations and session result filtering honor the configured physical roots."
request_type: BUG
business_context: "A lexical in-root path can redirect to an outside filesystem target."
scope_in: ["Three MCP core modules", "Package-local regression tests", "Three README behavior notes", "Owned workflow/spec evidence"]
scope_out: ["Other security findings", "Live deployment", "Public tool schema changes", "Remote operations", "Merge/release"]
open_questions: ["Human approval of the explicit creation/history/filtering and threat-model decisions in the Spec Card"]
assumptions: ["Trusted configured binaries and administrative roots", "No concurrent hostile replacement guarantee", "Current machine provides macOS verification"]
dependencies: ["main 05fe8d6", "Accepted baseline SEC-002 finding", "Existing built-in Node test harness"]
risks_initial: ["Rejecting stale session entries narrows results", "Canonical paths change returned alias spellings", "TOCTOU remains outside atomic confinement", "Windows junction execution unavailable locally"]
acceptance_criteria_draft: ["AC-MR-001..010 in product-specs/cards/mcp-root-containment.md"]
notes_for_next_step: "Review the proposal; no source or test modification before activation."
```

## Admission and Applicability

```yaml
request_lane: product_delivery
security_sensitive: true
delivery_context: brownfield
planning_track: full
governance_profile: strict
execution_mode: agentic
sdd_mode: none
defect_source: code
spec_impact: "Restore intended local root restrictions with explicit missing-path and index filtering policy; no schema change."
role_reasons: {ba: SECURITY_ACCEPTANCE, ta: FILESYSTEM_TRUST_BOUNDARY, developer: CODE_REMEDIATION, qc: SECURITY_REGRESSION}
gate_reviewers: {spec: ba, dor: ba, approach: developer, task_plan: developer, dod: qc}
not_applicable: ["Contract: no public schema or entrypoint changes", "SA/foundation: no system ownership or runtime change", "PO/UAT/Release: no product rollout", "DevOps: no deployment"]
writer: "Legacy full/strict writer; adaptive write activation not claimed."
```

## Dedup and Intake History

```yaml
decision: "Single coupled SEC-002 outcome; no change layer."
existing_refs: ["Cancelled mcp-physical-root-containment intake", "DONE approval-path-defects (approval CLI, unrelated boundary)", "Legacy arch-role-skills-release (role skill release, unrelated boundary)", "DONE security baseline (evidence only)", "Legacy mcp-gitlab (original module delivery)"]
initial_intake: "Long request wording triggered split=2. Cancelled before admission through CLI; retained report and CLI-rendered s01. No report hand-edit or approval transfer."
initial_projection_repair: "Repeat cancel was rejected for duplicate blocker ID; used the canonical upsertProtocolBlockInS01 renderer on the unchanged cancelled report to restore only its derived projection."
source_unchanged: true
```

## Traceability

```yaml
upstream: []
next_step: "s02 goal and s03 decisions"
```


## Governance Context

```yaml
governance_profile: strict
governance_ref: project-context/project-context.md
checklist_refs: ["project-context/checklists/strict.md"]
constraints: ["Explicit human admission/readiness gates", "No production edits before ACTIVE", "Trusted local filesystem threat model", "No live deployment"]
exception_required: false
```

## Work Item Protocol
```yaml
protocol_status: DONE
approval_status: APPROVED
review_required: true
work_item_slug: "mcp-root-containment"
work_item_type: BUG
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/.claude/worktrees/mcp-physical-root-containment/work-items/mcp-root-containment"
current_step: "s08"
granted_write_paths:
  - "mcp/github-push/src/core.js"
  - "mcp/github-push/test/core.test.js"
  - "mcp/github-push/test/containment.test.js"
  - "mcp/github-push/README.md"
  - "mcp/gitlab/src/core.js"
  - "mcp/gitlab/test/core.test.js"
  - "mcp/gitlab/test/containment.test.js"
  - "mcp/gitlab/README.md"
  - "mcp/session-search/src/core.js"
  - "mcp/session-search/test/core.test.js"
  - "mcp/session-search/test/containment.test.js"
  - "mcp/session-search/README.md"
  - "work-items/mcp-root-containment"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "agent"
protocol_owner: "developer"
reviewed_by: "maintainer"
reviewed_at: "2026-10-29T02:32:08.173Z"
handoff_target: "archive-lifecycle"
last_transition_action: "close"
last_transition_at: "2026-10-29T10:49:14.493Z"
required_actions:
  - {"id":"se:97016268a85152e6072dbe9e85a872270ca9be19cae9d4d27040b0a70a0bf3e2","kind":"workflow_followup","text":"Archive the work item when all downstream lifecycle actions are complete."}
blockers: []
review_notes:
  - "Human approves the bounded SEC-002 physical containment packet across three MCPs, with the explicit creation/history/filtering policy, canonical path values and trusted-filesystem/platform limits. Other security findings, live rollout and merge remain separate."
refs:
  - "work-items/mcp-physical-root-containment"
  - "work-items/approval-path-defects"
  - "work-items/arch-role-skills-release"
  - "work-items/mcp-root-containment"
audit_events:
  - "REQUEST_CAPTURED"
  - "CANDIDATE_PROPOSED"
  - "SLUG_LOCKED"
  - "DEDUP_CONFIRMED"
  - "WORKFLOW_SCAFFOLDED"
  - "STEP_OPENED"
  - "WORK_ITEM_APPROVED"
  - "READINESS_BUNDLE_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "VERIFICATION_CONFIRMED"
  - "DONE_CONFIRMED"
```

