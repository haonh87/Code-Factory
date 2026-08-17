---
artifact_id: "artifact-governance-enforcement.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "artifact-governance-enforcement"
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
execution_roles: []
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "ba"
    - "developer"
  dor:
    - "po"
    - "ba"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release: []
  business_acceptance: []
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-17T07:02:47.000Z"
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
  - "artifact-governance-enforcement.s04.acceptance-criteria.md"
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
step_goal: "Choose the smallest approach that satisfies AC-001 to AC-010, and settle the two questions s03 deferred here."
input_summary:
  - "s04 acceptance AC-001 to AC-010 and the compatibility invariant"
  - "s03 Q2 legacy shape and Q3 escape-hatch design, each with a binding constraint"
output_summary:
  - "Option analysis with a recommendation"
  - "Q2 and Q3 resolved"
  - "Affected boundary and validation plan"
done_when:
  - "The recommended option is justified against the smaller alternative"
  - "Q2 and Q3 have answers, not preferences"
owner: "developer"
```

## Option Analysis
```yaml
problem: "Enforce the artifact-governance rules without invalidating the history the repository already has, and without producing a check that gets disabled."
decisive_constraint_found_here: "Nine trusted approval receipts are sealed across two work items - five on artifact-governance-model, four on stabilize-architecture-skill-bundle - and every one is hashed to its note content with digest_match=true. Editing any of those notes invalidates its receipt. Any option that migrates existing work items therefore destroys nine pieces of audit evidence. This was not visible at s03 and it removes two of the three options for Q2."
options:
  - "O-A write-new-read-both: the generator emits sections only, so no new work item can produce the old shape. The readers accept both the section and the legacy per-role file. Legacy files stay legal because the registered role-indexed filename is a declared escape hatch anyway. Zero existing notes are edited, so zero receipts break. Additive for adopters, minor version bump. Cost: two read paths, and the old shape remains representable so a hand-written note could still use it."
  - "O-B migrate-on-read with a one-off conversion: readers accept the old shape but emit a deprecation, and a script converts the 17 existing work items to the new shape. Gets to a single read path. Cost: rewrites notes that carry nine sealed receipts, breaking all nine, and a governance change whose side effect is destroying audit evidence is self-defeating."
  - "O-C clean break: readers require the new shape and all existing work items are migrated. Single read path, no deprecation debt. Cost: everything wrong with O-B, plus a breaking change for every adopter on v2.3.2 and a major version bump."
recommended_option: "O-A"
trade_offs:
  - "O-A accepts two read paths in exchange for touching zero existing notes. Given nine sealed receipts, that trade is not close."
  - "O-B and O-C buy a single read path at the cost of nine invalidated receipts. A work item about governance integrity cannot pay in governance integrity."
  - "O-A leaves the old shape representable by hand. Mitigated because the generator never emits it and the duplication check catches the content-level symptom regardless of which shape holds it."
rejected_reason_for_smaller: "A smaller option was searched for: enforce only the placement check and defer the shape change. Rejected because AC-001 to AC-003 are the objectives that actually stop file growth, and placement alone leaves role multiplication - the primary driver - untouched."
validation_before_or_during:
  - "Before migrating any reader: grep every reader of each field and record the list, per the constraint in ownership-table.md"
  - "Before writing the duplication check: confirm against all 17 work items that the ownership table produces zero false positives on content that is legitimately distinct"
  - "Confirm Q6: that workflow-contracts.config.json readers tolerate a new top-level key"
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes:
  - "Brownfield. No stack, runtime or deployment-model decision. The change stays inside the existing Node validator and generator, and approval_gates.foundation is not_applicable."
```

## Artifact Chính
```yaml
recommended_approach: "Write-new-read-both. The generator emits role contributions as sections in the step's primary note; the readers resolve them from the section but continue to accept the legacy per-role file; the validator gains a duplication check, a placement check and a reference resolver, all driven by declared configuration."
why: "It is the only option that satisfies the acceptance criteria without editing a note that carries a sealed receipt. Nine receipts across two work items make migration a governance cost, not just an engineering cost."

resolutions:
  - question: "Q2 legacy shape"
    answer: "Dual read, single write. Readers accept both shapes; the generator emits only the new one. No migration, no note edits, no broken receipts."
    consequence_for_q5: "Q5 resolved as a consequence: the change is additive for adopters, so a minor version bump suffices. A major bump would only be required by O-B or O-C."
  - question: "Q3 escape-hatch design"
    answer: "A frontmatter field on the artifact itself, carrying a required non-empty reason, echoed into validation output. Not a central registry."
    why: "A central registry would be a second place holding a fact the artifact already states, which is exactly the duplication this programme forbids. The rule set decides its own enforcement design here, which is a useful sign the rule is coherent."

boundaries:
  modified:
    - "packages/workflow-bundle/scripts/workflow-execution-definitions.js - emit sections, plural assignments[] and handoffs[]"
    - "packages/workflow-bundle/scripts/validate-workflow-execution.js - readers resolve from section, legacy path retained"
    - "packages/workflow-bundle/scripts/validate-workflow-governance.js - duplication and placement checks"
    - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js - reference resolver helper"
    - "workflow-contracts.config.json - declared layer roots with shipped default"
    - "skills/orchestration/codex-workflow-chain/references/workflow-chain.md - register the role-indexed filename and the ## Role Outputs block"
  created:
    - "packages/workflow-bundle/tests/fixtures/** - negative fixtures for the five F9 duplications, placement, escape hatch, resolver, and an adopter-layout case"
    - "packages/workflow-bundle/test/** - focused tests per migrated reader"
  explicitly_untouched:
    - "Any existing work item note - the receipt-integrity constraint above"
    - "Gate semantics, receipt format, approval flow"
    - "docs/, repository root, changes/ - that is P4"

risk_notes:
  - id: "R-1"
    risk: "A migrated reader passes vacuously instead of failing loudly."
    mitigation: "AC-004 requires a red-then-green test per field. The red state is the evidence; a test that was never red proves nothing."
  - id: "R-2"
    risk: "The duplication check false-positives and gets disabled."
    mitigation: "Validate against all 17 work items before the check ships. A false positive means the ownership table is wrong and gains a row - the fix is the table, per s04 EDGE-003."
  - id: "R-3"
    risk: "The dual read path decays into the only path anyone maintains."
    mitigation: "The legacy branch gets no new features and is covered by exactly one fixture. Sunsetting it is a P4-or-later decision, recorded rather than promised."
  - id: "R-4"
    risk: "Concurrent work with stabilize-architecture-skill-bundle in the same package."
    mitigation: "Worktree, per s04 GOV-04. s07 does not open until the collision clears or the worktree plan is approved."

validation_plan:
  - "AC-001, AC-002, AC-003: regenerate the multi-role sample at 2, 4 and 8 roles; compare file counts and assert no orphaned assignment"
  - "AC-004: red-then-green per field, plus a grep proving no reader of the old location remains"
  - "AC-005: five negative fixtures, one per F9 duplication"
  - "AC-006, AC-007, AC-008: placement, adopter-layout and escape-hatch fixtures, positive and negative"
  - "AC-009: full validator sweep across 17 work items, counts compared against the pre-change baseline"
  - "AC-010: resolver positives plus four loud-failure negatives"
```

## Architecture Details
```yaml
domain_boundaries:
  - "Generator: decides what an artifact looks like. Owns emitted shape."
  - "Readers and validator: decide whether an artifact is acceptable. Own the checks."
  - "Configuration: declares layer roots and exemptions. Owns policy that varies per repository."
  - "The rule set under skills/: states the rules for humans and agents. Owns explanation, not enforcement."
integration_points:
  - "workflow-contracts.config.json gains a top-level artifactGovernance key with layerRoots and a default. Q6 confirms its readers tolerate an unknown key before this lands."
  - "The reference resolver is a shared helper in workflow-gate-evidence-utils.js so the duplication check and any future consumer use one implementation."
data_or_runtime_notes:
  - "No schema, database or runtime topology change. Text artifacts and a Node validator only."
  - "The generator change alters files under packages/workflow-bundle/runtime/ on the next sync, which overlaps stabilize-architecture-skill-bundle's generated lane. This is the concrete overlap behind R-4."
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "workflow-execution-definitions.js - emitted shape"
  - "validate-workflow-execution.js - reader location"
  - "validate-workflow-governance.js - two new checks"
  - "workflow-gate-evidence-utils.js - resolver helper"
  - "workflow-contracts.config.json - new configuration key"
  - "workflow-chain.md - naming convention and required block"
compatibility_risks:
  - risk: "Adopters on v2.3.2 upgrade and their existing artifacts fail the new placement check."
    handling: "AC-007 makes roots configurable and AC-009 keeps existing artifacts valid. The release note must state the new key explicitly; a silent failure on upgrade is the worst outcome and is called out in s04 EDGE-005."
  - risk: "Nine sealed receipts invalidated."
    handling: "Eliminated by design. O-A edits no existing note. This is the reason O-A was chosen over O-B and O-C."
  - risk: "Runtime regeneration collides with an active work item."
    handling: "Worktree plus sequencing. s07 blocked until resolved."
migration_notes:
  - "No data migration. No note migration. This is the point of O-A."
  - "Legacy per-role files remain valid indefinitely; sunsetting them is deferred and not promised here."
rollback_notes:
  - "git revert the whole change set. Partial rollback is forbidden: a generator emitting sections against readers expecting files is worse than either end state. Recorded in s04 rollback_constraints."
```

## Traceability
```yaml
upstream:
  - "artifact-governance-enforcement.s04.acceptance-criteria.md#Artifact Chính"
  - "artifact-governance-enforcement.s03.open-questions.md#Artifact Chính"
  - "skills/guardrails/artifact-governance/references/ownership-table.md#Constraint inherited by P2"
acceptance_links:
  - "AC-001 to AC-003 -> generator change plus plural schemas"
  - "AC-004 -> reader migration with red-then-green"
  - "AC-005, AC-010 -> duplication check and resolver"
  - "AC-006 to AC-008 -> placement check, configurable roots, escape hatch"
  - "AC-009 -> 17-work-item regression"
next_step: "s06 Task Plan"
```

## Handoff
- Recommended option:
- Trade-off chấp nhận:
- Điều kiện sang step 6:
- Deployment note khi có:
