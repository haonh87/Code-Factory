---
artifact_id: "mcp-root-containment.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "mcp-root-containment"
step_id: "s05"
step_slug: "technical-approach"
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
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-10-29T02:32:08.173Z"
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
  - "mcp-root-containment.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 — Technical Approach

## Option Analysis

```yaml
goal: "Enforce the existing filesystem boundary without creating a new runtime package."
options:
  - "A: Small module-local canonical resolvers, explicit missing-path mode, revalidation before operations. Preserves package independence and contained links."
  - "B: Reject every symlink. Simpler but breaks configured root aliases and legitimate contained links, including common temporary-root aliases."
  - "C: Shared confinement service/native sandbox. Stronger atomic controls but changes deployment and packaging beyond this correction."
recommended_option: A
reason: "Smallest option meeting the bounded threat model and compatibility requirements."
validation_needed: ["Root alias handling is idempotent", "Nearest ancestor does not ignore dangling links", "Result filtering validates actual session workspace", "No atomic-race security claim"]
```

## Main Artifact

```yaml
design_problem: "Lexical prefix checks authorize paths whose physical targets differ."
business_rule_trace: ["REQ-MR-001 repository boundary", "REQ-MR-002 session/workspace boundary", "REQ-MR-003 compatibility and evidence"]
recommended_design: "Private helpers inside each existing core module; canonicalize existing roots/targets with Node filesystem APIs, explicit ancestor handling for allowed missing paths, then segment-aware containment checks."
recommendation_reason: "No shared module/packaging dependency for three standalone MCPs; avoid changing public schemas."
component_changes: ["mcp/github-push/src/core.js", "mcp/gitlab/src/core.js", "mcp/session-search/src/core.js"]
data_flow: ["Validate path types -> resolve lexical input -> canonical existing root", "Accept spelling under configured root or its canonical alias -> resolve existing target or explicit missing suffix", "Reject escape/errors -> revalidate at use -> pass canonical path to existing Git/cass/stream call", "For returned sessions: validate source file first, read actual workspace, verify requested workspace and index metadata before sanitizing"]
interface_changes: ["No tool schema or names change", "Resolver functions remain synchronous; module-local realpath/lstat helpers preserve call signatures", "Existing output path fields may contain canonical values", "Invalid/unverifiable/stale records are rejected or filtered"]
failure_modes: ["ENOENT: allowed only in creation/history modes after verifying a real directory ancestor", "Dangling link/loop/permission/type errors: fail closed", "Missing configured root: reject rather than climb above root", "Retarget between operations: revalidate and reject; concurrent post-check replacement remains a stated limit"]
compatibility_impact: ["Valid contained links remain", "Existing root aliases work even when /tmp resolves to a physical alternate prefix", "Windows-only fabricated test paths become actual portable fixtures", "Stale indexed records can disappear from results by design"]
rollback_impact: ["Revert source/test/README delta; no database/state migration", "Do not roll back silently: lexical containment exposure returns"]
observability_hooks: ["Concise contextual errors without transcript data", "Per-case fixture results and outside sentinels", "Record platform/tool skips in s08"]
constraints_applied: ["Node built-ins only", "No remote Git/cass use", "No live MCP launch", "No unrelated remote/auth/config hardening"]
validation_plan: ["TDD in each MCP package", "Stub commands prove denied inputs are never passed downstream", "Positive local Git and synthetic JSONL session fixtures", "Three package checks plus workflow-bundle suite", "Static review and UTF-8/governance checks"]
```

## Brownfield Impact Analysis

```yaml
affected_boundaries: ["Three module-local path resolvers", "GitHub creation pre/post checks", "Session file/workspace checks and result filtering"]
unchanged_boundaries: ["MCP SDK integration and schemas", "Git remote host/auth policy", "cass installation/indexing", "Workflow approval runtime", "Installed harness"]
regression_risks: ["Canonical prefix aliases", "Historical workspace paths", "Changed error text", "Filesystem I/O added to bounded search results"]
mitigation: ["Return and re-accept canonical values", "Explicit missing-path modes", "Match error categories rather than entire OS messages", "Respect existing page/limit caps; no unbounded scan"]
```

## Governance Checks

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks: ["One SEC-002 scope", "Production remains unchanged before signed gates", "TDD and isolated worktree required"]
blocking_items: []
owner: developer
next_action: "Review the concrete Spec Card and s04-s06 packet"
```

## Traceability

```yaml
upstream: ["mcp-root-containment.s04.acceptance-criteria.md"]
next_step: "s06 execution plan"
```

