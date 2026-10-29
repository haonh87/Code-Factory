---
artifact_id: "mcp-root-containment.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "mcp-root-containment"
step_id: "s06"
step_slug: "task-breakdown"
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
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-10-29T02:32:08.173Z"
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
  - "mcp-root-containment.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 — Task Plan

## Main Artifact

```yaml
implementation_goal: "Satisfy AC-MR-001..010 without changing deployment or unrelated security boundaries."
ba_lane: {acceptance_coverage: ["AC-MR-001..010"], scope_guards: ["Three MCPs only"], human_review_points: ["Admission and policy", "Spec/DoR", "Approach/Task Plan", "QC DoD"]}
dev_lane: {path_map: ["mcp/github-push/src/core.js", "mcp/gitlab/src/core.js", "mcp/session-search/src/core.js", "mcp/github-push/test/containment.test.js", "mcp/gitlab/test/containment.test.js", "mcp/session-search/test/containment.test.js", "mcp/github-push/test/core.test.js", "mcp/gitlab/test/core.test.js", "mcp/session-search/test/core.test.js", "mcp/github-push/README.md", "mcp/gitlab/README.md", "mcp/session-search/README.md"], technical_sequence: [T1,T2,T3,T4], tdd_targets: ["Physical escapes", "Missing ancestor handling", "Session filtering", "Before-use revalidation"]}
task_breakdown:
  - id: T1
    owner_role: developer
    name: "Create portable containment fixtures and record RED"
    objective: ["Create portable containment fixtures and record RED"]
    paths_in_scope: ["mcp/github-push/test/containment.test.js", "mcp/gitlab/test/containment.test.js", "mcp/session-search/test/containment.test.js", "mcp/github-push/test/core.test.js", "mcp/gitlab/test/core.test.js", "mcp/session-search/test/core.test.js"]
    dependencies: []
    outputs_expected: ["Create portable containment fixtures and record RED with evidence"]
    review_checkpoint: "Spec compliance before code quality at each risky batch"
    verification_hint: "Run new tests against unchanged source; retain the expected four-boundary failure evidence. Characterize existing OS-specific fixture failures separately."
  - id: T2
    owner_role: developer
    name: "Guard repository paths and safe GitHub creation"
    objective: ["Guard repository paths and safe GitHub creation"]
    paths_in_scope: ["mcp/github-push/src/core.js", "mcp/gitlab/src/core.js"]
    dependencies: ["T1"]
    outputs_expected: ["Guard repository paths and safe GitHub creation with evidence"]
    review_checkpoint: "Spec compliance before code quality at each risky batch"
    verification_hint: "Both Git MCP tests pass: denial before child launch, allowed aliases, missing creation path and sentinel preservation; review spec then code."
  - id: T3
    owner_role: developer
    name: "Guard session reads, workspace checks and result filtering"
    objective: ["Guard session reads, workspace checks and result filtering"]
    paths_in_scope: ["mcp/session-search/src/core.js"]
    dependencies: ["T1", "T2"]
    outputs_expected: ["Guard session reads, workspace checks and result filtering with evidence"]
    review_checkpoint: "Spec compliance before code quality at each risky batch"
    verification_hint: "Stub cass and synthetic transcripts prove view/context/list/search/related behavior, actual workspace validation, no escaped read and compatible limits."
  - id: T4
    owner_role: developer
    name: "Document policy and verify the bounded remediation"
    objective: ["Document policy and verify the bounded remediation"]
    paths_in_scope: ["mcp/github-push/README.md", "mcp/gitlab/README.md", "mcp/session-search/README.md", "work-items/mcp-root-containment"]
    dependencies: ["T2", "T3"]
    outputs_expected: ["Document policy and verify the bounded remediation with evidence"]
    review_checkpoint: "Spec compliance before code quality at each risky batch"
    verification_hint: "Run each MCP npm run check, workflow-bundle suite, static/security/syntax review and UTF-8/workflow validators; record macOS evidence and native Windows limitation before QC DoD."
dependencies_global: ["Signed readiness and ACTIVE protocol"]
risk_notes: ["No atomic hostile-filesystem guarantee", "Native Windows run must be explicit", "Git tests must not inherit real network transports or credentials"]
verification_plan: ["Three package checks", "Workflow unit suite", "Static/security/encoding/governance review"]
notes_for_implementation: "Record RED before production code; no subagents; no live service invocation."
```

## Brownfield Delivery Plan

```yaml
owned_scope: ["mcp/github-push/src/core.js", "mcp/gitlab/src/core.js", "mcp/session-search/src/core.js", "mcp/github-push/test/containment.test.js", "mcp/gitlab/test/containment.test.js", "mcp/session-search/test/containment.test.js", "mcp/github-push/test/core.test.js", "mcp/gitlab/test/core.test.js", "mcp/session-search/test/core.test.js", "mcp/github-push/README.md", "mcp/gitlab/README.md", "mcp/session-search/README.md", "work-items/mcp-root-containment"]
worktree: ".claude/worktrees/mcp-physical-root-containment on fix/mcp-physical-root-containment; main 05fe8d6"
regression_checkpoints: ["Each module RED/GREEN", "Existing parser/local Git controls", "Full workflow suite"]
compatibility_checkpoints: ["Same MCP schemas", "Canonical aliases", "Creation/history policy", "Pagination and limit caps"]
migration_or_backfill_steps: []
rollback_or_restore_steps: ["Source/test/README revert, with SEC-002 risk explicitly retained"]
```

## Verification Plan

```yaml
commands: ["npm --prefix mcp/github-push run check", "npm --prefix mcp/gitlab run check", "npm --prefix mcp/session-search run check", "npm run validate:workflow:unit", "wfc naming/governance/exec/plan/protocol"]
fixture_policy: "Use isolated temporary directories, synthetic session JSONL and stub Git/cass. Positive local Git fixtures explicitly disable hooks and isolate configuration; block network transport and inherited credential helpers. Never use real session roots or remote URLs."
tdd: "Mandatory by behavior batch; distinguish intended RED from fixture/environment failure."
review: "Targeted agentic two-tier review after T2 and T3; final human QC DoD."
delegation: "None; coupled contract and sequential integration."
platform_scope: "macOS local evidence; Windows junction fixture authored and native execution recorded as not run unless available. Windows rollout remains separate."
release: "Not in scope."
```

## Traceability

```yaml
upstream: ["mcp-root-containment.s05.technical-approach.md"]
next_step: "s07 only after signed gates and activation"
```


## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["Bounded task paths", "TDD with targeted two-tier review", "No delegated agents", "Platform limits disclosed"]
blocking_items: []
owner: developer
next_action: "Human Task Plan approval before activation"
```
