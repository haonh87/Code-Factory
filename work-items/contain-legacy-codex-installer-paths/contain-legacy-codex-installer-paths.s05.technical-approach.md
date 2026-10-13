---
artifact_id: "contain-legacy-codex-installer-paths.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "contain-legacy-codex-installer-paths"
step_id: "s05"
step_slug: "technical-approach"
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
  card: "product-specs/cards/contain-legacy-codex-installer-paths.md"
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "contain-legacy-codex-installer-paths.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 — Technical Approach

> [!summary]
> Draft only: validate a complete immutable operation plan before performing any mutation. Environment/isolation remain upstream blockers.

## Step Contract

```yaml
step: "s05"
step_goal: "Describe the minimum local containment approach without claiming readiness."
input_summary:
  - "Accepted parent containment scope and three verified Maintainer admission dispositions."
  - "Existing scripts at main 5a81126; spec card and named environment gaps."
output_summary:
  - "Concrete draft artifact with owner, evidence and remaining gates."
done_when:
  - "The draft is reviewable and its missing inputs are explicit; this does not mean the human gate passed."
owner: "developer"
constraints:
  - "No production/test implementation, installer execution or signing by the agent."
timebox: "One authoring pass; unresolved external verification input remains explicit."
```

## Option Analysis

```yaml
options:
  - "A: native preflight in each direct script; preserves direct entry points and existing packaging."
  - "B: retire direct routes; expands into wrapper and P-PUBLIC documentation ownership."
  - "C: delegate to central wfc; adds a runtime/dependency contract to standalone scripts."
  - "D: only validate stale deletion immediately before rm/Remove-Item; leaves earlier writes and replacement hazards."
recommended_option: "A"
trade_offs:
  - "Some validation is duplicated across languages; common behavioral fixtures must keep them aligned."
  - "Reject unsafe aliases instead of inventing safe traversal through them."
  - "Upstream environment gaps prevent locking the actual fixture invocation today."
```

## Foundation Decision

```yaml
status: "NOT_APPLICABLE"
solution_class: "Existing standalone installer scripts"
selected_stack: []
selected_runtime: []
decision_notes:
  - "No stack/runtime redesign or deployment baseline change."
```

## Main Artifact

```yaml
design_problem: "Stop malformed state from influencing destructive or in-place writes outside intended managed targets."
business_rule_trace:
  - "REQ-PI-001..004"
  - "AC-PI-001..006"
recommended_design: "A: parse, validate, inspect and freeze a complete read-only operation plan, then execute only validated literal targets."
recommendation_reason: "Fits the accepted three-path scope without a new runtime abstraction or install option."
component_changes:
  - "Bash: move directory creation and policy copy after manifest/source/topology preflight."
  - "PowerShell: inspect raw entries before Sort-Object -Unique; defer New-Item/Copy-Item; use literal operations after validation."
data_flow:
  - "Read source inventory and selected manifest without mutation."
  - "Validate complete raw names, portable grammar, reserved forms and uniqueness."
  - "Resolve physical root; validate all intended writes/deletes, types, links/reparse points and in-place output inode safety without following aliases."
  - "Freeze names/paths/actions; execute plan in existing semantic order; write selected current manifest last."
interface_changes:
  - "No new installation parameter; existing direct calls remain. Unsafe names/topology become explicit failures as detailed in the draft spec."
failure_modes:
  - scenario: "Invalid final entry after valid names"
    impact: "Earlier mutation would violate the zero-write contract"
    guardrail: "Validate every input before entering mutation phase."
  - scenario: "Alias within a recursively removed subtree"
    impact: "Recursive platform behavior may escape the intended boundary"
    guardrail: "Reject alias/reparse nodes during non-following inspection before any delete."
  - scenario: "Hard-linked policy/manifest destination"
    impact: "In-place overwrite may change external data"
    guardrail: "Reject detected multi-link output regular files or revise the replacement design with evidence."
  - scenario: "Concurrent hostile replacement after preflight"
    impact: "Time-of-check/time-of-use guarantee is absent"
    guardrail: "Explicitly excluded threat model; broaden design before claiming resistance."
  - scenario: "I/O error after valid preflight"
    impact: "Partial valid installation remains possible"
    guardrail: "Nonzero error and clear operation context; no transactional rollback promise."
compatibility_impact:
  - "product-specs/cards/contain-legacy-codex-installer-paths.md#Input and Compatibility Contract"
rollback_impact:
  - "Source revert only; preserve installed state; no unsafe reinstall to demonstrate rollback."
observability_hooks:
  - "Nonzero exit and stable input/category context before mutation; successful installer output remains usable."
constraints_applied:
  - "Three source/test paths only; platform-native scripts; no shared helper module or added dependency without scope review."
validation_plan:
  - "Spec fixture matrix on real isolated entry points; bind environment, source SHA and before/after state."
specialized_followups: []
notes_for_next_step: "Fill OQ-PI-ENV/ISOLATION before presenting an executable final plan."
```

## Architecture Details

```yaml
domain_boundaries:
  - "Direct adapter scripts only; central wfc unchanged."
integration_points:
  - "Current/legacy local manifests and canonical source skills."
data_or_runtime_notes:
  - "No database or externally hosted service. No container or CI provisioning is authorized by this design draft."
```

## Brownfield Impact Analysis

```yaml
impacted_modules:
  - "Direct Bash and PowerShell installer behavior."
compatibility_risks:
  - "Existing custom names, destination aliases and manifest quirks; compare against the explicit card contract."
migration_notes:
  - "No backfill; legacy manifest fallback retained."
rollback_notes:
  - "Revert source/test delta with reviewed state; never delete user files to simulate restoration."
```

## Traceability

```yaml
spec_ref: "product-specs/cards/contain-legacy-codex-installer-paths.md"
next_step: "s06 after Approach"
```

## Handoff

Draft authoring only. The work item remains MATERIALIZED/s01 with no implementation grants. Close the named readiness gaps and request the applicable human review; no gate is self-approved.
