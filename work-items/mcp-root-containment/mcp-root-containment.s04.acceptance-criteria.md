---
artifact_id: "mcp-root-containment.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "mcp-root-containment"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  spec_reviewed_by: ["ba"]
  spec_reviewed_at: "2026-10-29T02:32:08.173Z"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: ["ba"]
  dor_reviewed_at: "2026-10-29T02:32:08.173Z"
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
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-root-containment.s01.restate.md"
  - "mcp-root-containment.s02.business-goal.md"
  - "mcp-root-containment.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 — Acceptance + DoR

## Existing System Baseline

```yaml
source_commit: "05fe8d6"
source_paths: ["mcp/github-push/src/core.js", "mcp/gitlab/src/core.js", "mcp/session-search/src/core.js"]
current_behavior_refs: ["github-push resolveRepoPath/runGit/ensureRepository", "gitlab resolveRepoPath/runGit", "session-search resolvers/readSessionWorkspace/list/search/view/context"]
impacted_surfaces: ["Local repository path selection", "Directory creation", "Session file reading and indexed-result filtering"]
compatibility_constraints: ["Tool schemas and names remain", "Missing creation/history paths have approved policy", "Canonical alias path values may differ"]
rollback_constraints: ["Source revert restores known SEC-002 exposure; no migration"]
known_behavior: ["Four resolvers accept an in-root symlink resolving outside in synthetic intake probes", "GitHub path tests contain Windows-only literal examples", "Existing session resolver tests use paths that do not exist", "MCP test packages run independently from workflow-bundle run-all"]
```

## Main Artifact

```yaml
acceptance_criteria:
  - id: AC-MR-001
    requirement: REQ-MR-001
    criterion: "See the owning Spec Card AC-MR-001"
    verification: "For both Git MCPs, sibling-prefix, parent traversal, file/directory symlink escape, chained link and loop cases reject before the Git child is launched. Existing in-root repositories, root aliases and contained links succeed."
  - id: AC-MR-002
    requirement: REQ-MR-001
    criterion: "See the owning Spec Card AC-MR-002"
    verification: "Require an existing resolvable directory root; resolve the nearest existing parent of a missing destination, reject dangling links and non-directory ancestors, revalidate after mkdir and before git init. Assert no outside fixture write. GitLab continues to require an existing repository."
  - id: AC-MR-003
    requirement: REQ-MR-002
    criterion: "See the owning Spec Card AC-MR-003"
    verification: "view/context/related reject escaped, dangling, cyclic, missing or non-regular session paths before transcript open or cass invocation. Accept existing regular in-root files and contained file links."
  - id: AC-MR-004
    requirement: REQ-MR-002
    criterion: "See the owning Spec Card AC-MR-004"
    verification: "Canonicalize an existing configured workspace root. Missing historical workspace suffixes may use a verified existing in-root directory ancestor; dangling links, permission failures, outside ancestors and invalid types fail closed. Test root aliases, sibling prefixes, .. traversal and a legitimate ..notes child."
  - id: AC-MR-005
    requirement: REQ-MR-002
    criterion: "See the owning Spec Card AC-MR-005"
    verification: "Validate the result file under sessions root and its actual session workspace under the requested physical workspace before sanitizing content. Filter outside/missing/invalid entries and contradictory index metadata. Preserve limits and pagination; use a stub cass with mixed valid/invalid records."
  - id: AC-MR-006
    requirement: REQ-MR-003
    criterion: "See the owning Spec Card AC-MR-006"
    verification: "No entrypoint/schema or dependency changes. Canonical path values may replace aliases. Existing parsing/sanitization, Git status and local-only repository creation controls pass; replace OS-specific fake path fixtures with real temporary directories."
  - id: AC-MR-007
    requirement: REQ-MR-001
    criterion: "See the owning Spec Card AC-MR-007"
    verification: "Invalid types, embedded NUL, missing roots, ENOTDIR, ELOOP and permission/canonicalization failures reject or filter with bounded diagnostics; no private content or credential data in diagnostics."
  - id: AC-MR-008
    requirement: REQ-MR-003
    criterion: "See the owning Spec Card AC-MR-008"
    verification: "Use canonical paths for downstream Git/cass/read operations, recheck at each operation boundary and after creation. Deterministically retarget a link between calls to prove revalidation. Document the trusted/local filesystem assumption and remaining check/use race; do not claim protection from a concurrent hostile filesystem writer."
  - id: AC-MR-009
    requirement: REQ-MR-003
    criterion: "See the owning Spec Card AC-MR-009"
    verification: "Synthetic temporary roots and transcripts only; stub Git/cass for denial-before-use assertions, use local Git fixtures with hooks/credentials/transports isolated for positive controls, bounded child timeouts. Never call real remote GitHub/GitLab, real cass index or installed MCP. Directory junction fixture runs on Windows when available; macOS evidence never counts as a Windows pass."
  - id: AC-MR-010
    requirement: REQ-MR-003
    criterion: "See the owning Spec Card AC-MR-010"
    verification: "TDD RED/GREEN per affected boundary; each MCP npm run check, the workflow-bundle registered suite, syntax/static/security review, UTF-8 and workflow validation. Record platform/tool skips explicitly for QC. Source and test edits confined to approved paths; live rollout and merge excluded."
```

## Definition of Ready

```yaml
status: READY
checks: ["Boundary and target modules identified", "Creation/history policy explicit", "ACs have positive and negative checks", "No environment installation required for core tests", "Threat model and platform limits disclosed"]
blocking_items: []
notes: "Technical readiness recommendation; human admission, policy acceptance and readiness signatures still required."
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
upstream: ["mcp-root-containment.s01.restate.md", "mcp-root-containment.s02.business-goal.md", "mcp-root-containment.s03.open-questions.md"]
next_step: "s05 proposed approach"
```


## Requirement Baseline

```yaml
status: APPROVED
approved_spec_refs:
  - "product-specs/cards/mcp-root-containment.md"
approved_spec_digests:
  - "sha256:3fa5aceaeb1aa1247a2116d8c8346c8e77381c6cd3bfcf558b4310a32f5a2041"
decision_notes: ["Conditional approval template only; a current trusted signature is required before activation."]
```
