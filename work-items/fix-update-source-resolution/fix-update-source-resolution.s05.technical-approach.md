---
artifact_id: "fix-update-source-resolution.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "fix-update-source-resolution"
step_id: "s05"
step_slug: "technical-approach"
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
execution_roles: ["developer", "qc", "devops"]
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
  spec: ["developer"]
  contract: []
  dor: ["qc"]
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
  approach_reviewed_at: "2026-11-07T06:28:17.933695+00:00"
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
  - "fix-update-source-resolution.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Technical Approach — Pin source and reject backward updates

## Option Analysis

```yaml
options:
  - "A: prefer the running CLI source and preflight update versions; preserve explicit source and deliberate install"
  - "B: retain cwd-first source and only warn; leaves unattended updates exposed to wrong content"
recommended_option: "A"
trade_offs: ["Authors must pass --repo-root for an alternative checkout", "Deliberate downgrade uses install instead of update"]
```

## Technical Approach

```yaml
recommended_approach: "Resolve explicit source first, then the manifest belonging to the running CLI; remove implicit cwd discovery"
owned_boundary: ["workflow-bundle-utils source resolver", "workflow-bundle-cli update preflight"]
version_guard: "Before writes, compare source stable X.Y.Z with nonempty installed runtime and selected integration versions; reject older/unsupported comparisons"
read_boundary: "Reuse integration's path-safe reader for global/project install manifests; do not follow linked metadata"
failure_behavior: ["Nonzero error with source, installed version and affected path", "No file/state/mode changes on refusal"]
compatibility: ["Same or forward versions allowed", "Fresh/legacy absence preserved", "Explicit install and context rollback unchanged"]
```

## Brownfield Impact Analysis

```yaml
impacted_modules: ["Source resolver used by status/install/update/skills", "update preflight before managed sync"]
compatibility_risks: ["Source authoring may rely on cwd implicitly", "Projects may be newer than their global state", "Malformed metadata must not be treated as a lower version"]
migration_notes: ["No migration or new dependency"]
rollback_notes: ["Revert scoped source patch", "Published package remains untouched"]
```

## Verification Plan

RED regressions precede source edits. Exercise installed artifact invocation from a
stale manifest checkout; explicit-source overrides; no-write byte/mode snapshots;
Codex/Claude fresh, same and forward versions; deliberate reinstall and context
rollback. Run the discovered core suite, workflow-pack audit and Node18/22 focused
smoke. No native Claude session is needed to test this CLI-only patch.

## Session Handoff

Approach is ready for the human trusted receipt. Implement only in the isolated
worktree after protocol activation; preserve unrelated root edits and branches.

