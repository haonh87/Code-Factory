---
artifact_id: "correct-workflow-authority-guidance.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "correct-workflow-authority-guidance"
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
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
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
  - developer
  - qc
  - ba
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
  spec: [ba]
  contract: []
  dor: [qc]
  approach: [developer]
  foundation: []
  task_plan: [developer]
  uat: []
  release: []
  business_acceptance: []
  dod: [qc]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: [developer]
  approach_reviewed_at: "2026-09-29T13:12:49Z"
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
  - "correct-workflow-authority-guidance.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> The user explicitly accepted this packet and its work-item, Spec, DoR, Approach and Task Plan decisions. Human review was recorded at 2026-09-29T13:12:49Z. Trusted receipt sealing and CLI activation are separate requirements; this note alone grants no source-write authority.

## Step Contract

```yaml
step_goal: "Lock accepted option A, the smallest repair satisfying s04 without changing runtime authority."
input_summary:
  - "correct-workflow-authority-guidance.s04.acceptance-criteria.md"
  - "Pinned source baseline and current CLI/gate behavior."
output_summary:
  - "One recommended direction, rejected alternative, failure controls and validation."
done_when:
  - "Reviewer can assess exact boundaries and trade-offs without redesign during implementation."
owner: "developer"
```

## Option Analysis

```yaml
options:
  - "A: bounded guidance correction. Repair the four instruction boundaries in eight EN/VI sources; add one focused regression and human meaning review."
  - "B: broad M7 rewrite/runtime redesign. Rewrite all reviewed language units or change enforcement to accommodate prose."
recommended_option: "A (explicit human acceptance recorded in s01)"
trade_offs:
  - "A leaves other M7 failures open but satisfies these six criteria with clear ownership."
  - "B exceeds admission/portfolio boundaries and adds unnecessary runtime/release risk."
```

## Foundation Decision

```yaml
status: "NOT_APPLICABLE"
solution_class: "Existing workflow pack"
selected_stack: []
selected_runtime: []
decision_notes:
  - "No architecture, stack or deployment baseline change."
```

## Main Artifact

```yaml
design_problem: "Four instruction boundaries contradict existing authority or omit the human/advisory distinction."
business_rule_trace:
  - "AC-AUTH-001: M7-H01, M2-OBS-05"
  - "AC-AUTH-002: M7-L15, M7-L14"
  - "AC-AUTH-003: M7-H05, M2-OBS-15"
  - "AC-AUTH-004: M7-L10, M2-OBS-10"
  - "AC-AUTH-005: AC-CF-007"
  - "AC-AUTH-006: AC-CF-006"
design_options:
  - name: "A"
    summary: "Edit authoritative guidance sections and their EN/VI counterparts; protect the specific content contracts in the existing test runner."
    pros:
      - "Small owned source delta"
      - "No new dependencies or runtime gate interface"
    cons:
      - "Human review remains essential for naturalness and semantic completeness"
    risks:
      - "A prose assertion can miss a novel contradictory paraphrase"
  - name: "B"
    summary: "Broad language/runtime redesign."
    pros:
      - "Could address more M7 units"
    cons:
      - "Not the admitted outcome"
      - "Crosses independent owner boundaries"
    risks:
      - "Changes authority rather than fixing its description"
rejected_options:
  - name: "B"
    reason: "The existing runtime/policy is the accepted baseline; the bounded eight-file repair meets this scope."
recommended_design: "A: repair the four boundaries together; retain existing schema and receipt model."
recommendation_reason: "Addresses the selected authority failures and EN/VI parity with one regression file and no new abstraction."
component_changes:
  - paths:
      - "skills/analysis/requirement-analysis/SKILL.md"
      - "skills/analysis/requirement-analysis/SKILL.vi.md"
    change: "Replace the summary/analysis exception in Out Of Scope with an unconditional prohibition on code edits in this skill/read-only task."
  - paths:
      - "skills/orchestration/codex-workflow-chain/SKILL.md"
      - "skills/orchestration/codex-workflow-chain/SKILL.vi.md"
    change: "Align Spec/Design entry and ACTIVE gate statements with all applicable full/Light prerequisites; carry the necessary Light host explanation into VI."
  - paths:
      - "skills/orchestration/codex-workflow-chain/references/work-item-protocol.md"
      - "skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md"
    change: "Align materialize/activate goals and outputs, operative list status, legacy read policy, approve pending-report exception and full/Light gate hosts."
  - paths:
      - "skills/guardrails/definition-of-done-gate/SKILL.md"
      - "skills/guardrails/definition-of-done-gate/SKILL.vi.md"
    change: "Explain advisory AI assessment versus authorized human DoD throughout goal/evaluation/decision/completion prose; retain status schema and six evidence checks."
  - paths:
      - "packages/workflow-bundle/test/workflow-authority-guidance.test.js"
    change: "Node/assert-only, section-bounded EN/VI content-contract assertions plus in-memory negative mutations and positive controls. Use existing auto-discovery."
data_flow:
  - "Canonical skill/reference prose -> existing local bundle generation -> unit/pack validation."
  - "Human BA checks meaning and scores; QC checks evidence in child s08; parent receives only a bounded contribution."
interface_changes:
  - "None: no CLI flag, API, schema, lifecycle or gate implementation change."
failure_modes:
  - scenario: "Positive wording is present but a contradictory exception remains elsewhere in the relevant section."
    impact: "Regression appears green while guidance still grants the wrong action."
    guardrail: "Validate the complete relevant sections, explicit forbidden counterexamples and human cross-section review."
  - scenario: "A generic full-host sentence remains applicable to Light."
    impact: "Reader requests an unnecessary s05 host or omits an independent Light gate."
    guardrail: "Review every prerequisite/ACTIVE occurrence in both sources; full/Light positive and missing-gate negative controls."
  - scenario: "DoD status enum is renamed to express advisory meaning."
    impact: "Existing skill output consumers drift."
    guardrail: "Preserve schema identifiers and six checks; change explanatory text only."
  - scenario: "Prose regression is presented as proof of production enforcement."
    impact: "Overstated verification and false M7 closure."
    guardrail: "Label static contract results separately from runtime regression and human language verdict."
  - scenario: "Unrelated source or generated runtime needs a change."
    impact: "Ownership expansion or stale installed evidence."
    guardrail: "Stop the affected task, record scope/approval implications and reopen child authoring before expanding tracked paths."
compatibility_impact:
  - "Runtime, schema and existing full/Light receipt behavior remain compatible."
  - "VI must preserve diacritics and meaning, not merely English keywords."
  - "New test reads canonical files and uses only Node built-ins."
rollback_impact:
  - "Revert the owned source/test correction commit; retain child evidence."
  - "Regenerate local derived runtime after an authorized rollback; do not edit global installations or recover stale receipts."
observability_hooks:
  - "Focused test prints named boundary failures and exits nonzero."
  - "s07 records RED/GREEN/mutation commands and source hashes; s08 records bounded language findings and human decisions."
constraints_applied:
  - "Eight source paths plus one proposed test; exact map in s06."
  - "Legacy admission; no adaptive activation attestation."
  - "Agentic execution in the existing isolated child worktree; no delegation."
validation_plan:
  - "AC-AUTH-001..004/006: original defects fail first; corrected EN/VI pass; every targeted negative mutation is rejected."
  - "Node syntax check, existing unit suite, pack audit, workflow validators, UTF-8 and diff checks."
  - "AC-AUTH-005: exact repaired scopes scored in all eight files by the stated rubric with BA/QC review."
specialized_followups:
  - skill: "review-discipline"
    reason: "s07 spec compliance before code quality."
  - skill: "workflow-pack-audit"
    reason: "Skill/reference edits need structure and reference validation."
  - skill: "testing"
    reason: "s08 evidence must distinguish static guidance checks, regression and human language review."
notes_for_next_step: "The user accepted option A and the associated Task Plan. Seal finalized s04/s05/s06 hosts and verify all runtime prerequisites before any implementation task."
```

## Architecture Details

```yaml
domain_boundaries:
  - "Existing guidance and test-only content assertions."
integration_points:
  - "Existing unit runner auto-discovery and local runtime generation."
data_or_runtime_notes:
  - "No database, external account, network service or installed harness writes."
```

## Brownfield Impact Analysis

```yaml
impacted_modules:
  - "skills/analysis/requirement-analysis/SKILL.md"
  - "skills/analysis/requirement-analysis/SKILL.vi.md"
  - "skills/guardrails/definition-of-done-gate/SKILL.md"
  - "skills/guardrails/definition-of-done-gate/SKILL.vi.md"
  - "skills/orchestration/codex-workflow-chain/SKILL.md"
  - "skills/orchestration/codex-workflow-chain/SKILL.vi.md"
  - "skills/orchestration/codex-workflow-chain/references/work-item-protocol.md"
  - "skills/orchestration/codex-workflow-chain/references/work-item-protocol.vi.md"
compatibility_risks:
  - "Avoid altering schema/output semantics while clarifying advisory assessment."
  - "Avoid asserting full/Light prerequisites inconsistent with existing authority."
migration_notes:
  - "No migration or backfill."
rollback_notes:
  - "Owned-commit revert only; no branch reset or worktree cleanup."
```

## Traceability

```yaml
upstream:
  - "correct-workflow-authority-guidance.s04.acceptance-criteria.md"
next_step: "correct-workflow-authority-guidance.s06.task-breakdown.md"
```

## Handoff

Option A was explicitly accepted by the human reviewer through the review request recorded in s01. This finalized host must receive a current trusted Approach receipt; it supplies no source-write grant by itself.
