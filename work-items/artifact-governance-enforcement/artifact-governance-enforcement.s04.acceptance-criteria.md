---
artifact_id: "artifact-governance-enforcement.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "artifact-governance-enforcement"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-17T07:02:47.000Z"
  contract_reviewed_by:
    - "ba"
  contract_reviewed_at: "2026-08-17T07:02:47.000Z"
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-08-17T07:02:47.000Z"
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
  - "artifact-governance-enforcement.s01.restate.md"
  - "artifact-governance-enforcement.s02.business-goal.md"
  - "artifact-governance-enforcement.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Ten acceptance criteria, each resolvable against a command output or a named fixture.
> Contract gate applies: the emitted artifact shape is a contract for bundle adopters.
> Spec, Contract and DoR are all human gates and none has passed.

## Step Contract
```yaml
step_goal: "Lock measurable acceptance for the enforcement change, record the compatibility constraints that bound it, and decide readiness."
input_summary:
  - "s02 objectives OBJ-1 to OBJ-4 and their measures"
  - "s03 readiness READY, with Q2 and Q3 carrying constraints into s05"
output_summary:
  - "Acceptance criteria AC-001 to AC-010"
  - "Existing system baseline and compatibility constraints"
  - "Contract baseline for the adopter-facing artifact shape"
  - "DoR verdict"
done_when:
  - "Every criterion names a command, a fixture, or a file it resolves against"
  - "The compatibility floor is stated as an invariant, not a hope"
owner: "ba"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "skills/guardrails/artifact-governance/SKILL.md"
  - "skills/guardrails/artifact-governance/references/ownership-table.md"
  - "skills/guardrails/artifact-governance/references/worked-example.md"
decision_notes:
  - "The requirement baseline is the rule set produced and sealed by artifact-governance-model, whose five gates all carry trusted receipts with digest_match=true. This work item implements that baseline rather than restating it."
  - "sdd_mode=none, so there is no BRD/SRS pair and no Spec Card. The rule set files are the spec."
```

## Contract Baseline
```yaml
status: APPROVED
api_contract_refs: []
ux_contract_refs: []
artifact_contract_refs:
  - "packages/workflow-bundle/scripts/workflow-execution-definitions.js - the artifact shape it emits"
  - "packages/workflow-bundle/scripts/validate-workflow-execution.js:70 - the fields it reads"
  - "skills/orchestration/codex-workflow-chain/references/workflow-chain.md - the registered naming convention"
  - "workflow-contracts.config.json - gains declared layer roots, per s03 Q1"
notes:
  - "This is why approval_gates.contract=required. The generated artifact shape and the naming convention are what adopters of workflow-bundle v2.3.2 build against; changing either changes their contract."
  - "The version implication is dependent on the s05 choice for Q2 and is recorded there as Q5, not decided here."
```

## Existing System Baseline
```yaml
baseline_date: "2026-08-17"
current_behavior_refs:
  - surface: "workflow-execution-definitions.js"
    behaviour: "Emits one fixed filename per step per runtime artifact kind, while the schema it fills carries a single role. Demonstrated unrepresentable at two workers."
    evidence_ref: "skills/guardrails/artifact-governance/references/worked-example.md#2"
  - surface: "validate-workflow-execution.js:70"
    behaviour: "Reads assignment_id, role, owned_scope, done_when and status from the per-role artifact file."
  - surface: "wfc validate"
    behaviour: "Passes on notes containing all five F9 duplications. No placement check exists."
  - surface: "workflow-contracts.config.json"
    behaviour: "Carries protocolControl.legacyScaffoldPolicy. An established configuration surface with existing readers."
impacted_surfaces:
  - "packages/workflow-bundle/scripts/workflow-execution-definitions.js"
  - "packages/workflow-bundle/scripts/validate-workflow-execution.js"
  - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
  - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
  - "packages/workflow-bundle/test/** and tests/fixtures/**"
  - "skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
  - "workflow-contracts.config.json"
compatibility_constraints:
  - "All 17 existing work items must keep passing wfc validate. A governance tool that invalidates its own history is not adoptable. This is assumption A6 from s03, elevated here to an invariant."
  - "An adopter with a layout other than Code-Factory's six roots must be able to declare their own and pass."
  - "No field may be removed before its readers are migrated in the same change."
rollback_constraints:
  - "The change spans the generator, the validator and the fixtures. Rollback is a git revert of the whole set, not a partial disable, because a generator emitting the new shape against readers expecting the old one is worse than either end state."
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: "AC-001"
    criterion: "A role's contribution is emitted as a section, not a file."
    verify: "Regenerate the multi-role sample. The generator produces no worker-assignment, worker-handoff-report, merge-report or execution-policy file; their content appears in the owning sections named by worked-example.md section 5."
    objective: "OBJ-1"
  - id: "AC-002"
    criterion: "File count is invariant under added roles."
    verify: "Generate the sample at 2, 4 and 8 roles. File count is identical across all three."
    objective: "OBJ-1"
  - id: "AC-003"
    criterion: "Plural schemas represent more than one role."
    verify: "A fixture with 3 assignments and 3 handoffs round-trips through generate and validate with all 3 present. No orphaned assignment is possible: every id in merged_assignments resolves to a handoff entry, and a fixture violating that is rejected."
    objective: "OBJ-1"
  - id: "AC-004"
    criterion: "The readers are migrated, and the migration is proven by a failing test first."
    verify: "For each of assignment_id, role, owned_scope, done_when and status: a test asserting the reader resolves it from the owning section fails before the migration commit and passes after. Zero readers of the old location remain, evidenced by grep."
    objective: "OBJ-4"
  - id: "AC-005"
    criterion: "wfc validate rejects the measured duplication set."
    verify: "Five negative fixtures, one per F9 duplication, each rejected with a message naming the owning block. A deduplicated equivalent passes."
    objective: "OBJ-2"
  - id: "AC-006"
    criterion: "wfc validate rejects a file in no declared layer."
    verify: "A fixture file outside the declared roots is rejected. A fixture inside them passes."
    objective: "OBJ-3"
  - id: "AC-007"
    criterion: "Layer roots are configuration with a shipped default."
    verify: "A fixture declaring custom roots in workflow-contracts.config.json passes with its own layout. A fixture declaring none inherits Code-Factory's six roots. Per s03 Q1."
    objective: "OBJ-3"
  - id: "AC-008"
    criterion: "An escape hatch exists, requires a stated reason, and is visible."
    verify: "A file exempted without a reason is rejected. A file exempted with a reason passes and the reason appears in validation output. Per s03 Q3 constraint."
    objective: "OBJ-3"
  - id: "AC-009"
    criterion: "No existing artifact is invalidated."
    verify: "wfc validate, :sdd, :planning, :protocol all pass across all 17 work items after the change, with counts equal to or greater than the pre-change baseline."
    objective: "OBJ-4"
  - id: "AC-010"
    criterion: "The reference resolver behaves as specified."
    verify: "Positive: a same-note and a cross-file reference each resolve to the correct value. Negative: missing file, missing heading, missing yaml block and missing path each fail loudly rather than resolving to empty. Per the specification in ownership-table.md."
    objective: "OBJ-2"

edge_cases:
  - id: "EDGE-001"
    case: "A legacy work item written in the old per-role shape is validated after the change."
    expected: "Must not break. Which mechanism achieves that - dual-shape read, migrate-on-read, or one-off migration - is the s05 decision carrying the s03 Q2 constraint."
  - id: "EDGE-002"
    case: "A genuinely concurrent topology needs per-role files."
    expected: "The registered role-indexed filename is accepted and the primary note links every one. The escape hatch is the declared mechanism, not an invented filename."
  - id: "EDGE-003"
    case: "A duplication check false-positives on two blocks that legitimately hold the same value for different reasons."
    expected: "The ownership table decides. If a field has one owner, the other occurrence is a violation by definition. If the two are genuinely distinct facts, the table is wrong and gets a row - the fix is the table, not an exemption."
  - id: "EDGE-004"
    case: "A field is removed and no test covers its old reader."
    expected: "AC-004 forbids it. A removal without a red-then-green test is a rejected change, not a risk to accept."
  - id: "EDGE-005"
    case: "An adopter runs the new validator against a repository with no declared roots and a completely different layout."
    expected: "Inherits Code-Factory's default roots and therefore fails. AC-007 makes this configurable; the release note must say so, because a silent failure on upgrade is the worst outcome for an adopter."

out_of_scope:
  - "P4 migration of docs/, the repository root and changes/"
  - "The three approval-path defects TD-01, TD-02, tooling_gap_found_3"
  - "Release, version bump, or bundle inventory registration"
  - "Changing what any role analyses"

done_when:
  - "AC-001 to AC-010 each have evidence recorded in s08"
  - "The 17-work-item regression is green"
  - "Every removed field has a red-then-green test"

behavioral_invariants:
  - "Gate semantics are unchanged: no gate becomes easier or harder to pass"
  - "Governance evidence and receipt requirements are unchanged"
  - "wfc validate never passes vacuously on a check that previously had teeth"
```

## Governance Checks
```yaml
checklist_applied: "project-context/checklists/default.md"
checks:
  - id: "GOV-01"
    check: "Spec/design before code"
    result: PASS
    evidence: "No packages/ file touched. s05 and s06 are unauthored at the time of writing."
  - id: "GOV-02"
    check: "Contract gate identified"
    result: PASS
    evidence: "approval_gates.contract=required, with the artifact contract refs named in Contract Baseline."
  - id: "GOV-03"
    check: "TDD for behaviour change"
    result: REQUIRED
    evidence: "This is a behaviour change. AC-004 makes red-then-green mandatory per removed field, and the constraint was inherited in writing from ownership-table.md rather than rediscovered."
  - id: "GOV-04"
    check: "Worktree for large or risky change"
    result: REQUIRED
    evidence: "planning_track=full, multiple boundaries, and an overlapping active work item. s01 assumption A3."
  - id: "GOV-05"
    check: "Brownfield compatibility floor stated"
    result: PASS
    evidence: "17 of 17 work items must keep passing; elevated from assumption A6 to an invariant in Existing System Baseline."
  - id: "GOV-06"
    check: "Option analysis before approach"
    result: PENDING
    evidence: "s05, not yet authored. Q2 and Q3 carry constraints into it."
  - id: "GOV-07"
    check: "No self-declared gate passage"
    result: PASS
    evidence: "spec_status draft, all role_signoffs declared but all gate_reviews empty."
blocking_items:
  - "s07 must not open while stabilize-architecture-skill-bundle holds an overlapping write root"
owner: "ba"
next_action: "Human Spec, Contract and DoR review."
```

## Definition of Ready
```yaml
status: READY
blockers: []
rationale: "Ten criteria each resolve against a command, a fixture or a grep. The compatibility floor is an invariant. The two deferred questions carry binding constraints into s05 rather than being left open. The one blocking item is a sequencing constraint on s07, not on design."
checks:
  - item: "Requirements clear enough"
    result: PASS
    evidence: "The rule set is sealed and referenced, not restated."
  - item: "Acceptance criteria testable"
    result: PASS
    evidence: "AC-002, AC-004, AC-005, AC-009 produce counts or red/green states."
  - item: "Scope boundary explicit"
    result: PASS
    evidence: "out_of_scope names P4, the approval-path defects, and release."
  - item: "Compatibility understood"
    result: PASS
    evidence: "17-work-item floor plus the adopter-layout case in AC-007 and EDGE-005."
  - item: "Dependencies identified"
    result: PASS
    evidence: "The collision is recorded in s01 and repeated as a blocking item here."
  - item: "Open questions do not block"
    result: PASS
    evidence: "Q2 and Q3 deferred to s05 with constraints; Q5 dependent on Q2; Q6 low risk."
owners:
  spec: "ba"
  contract: "ba, developer"
  dor: "po, ba"
notes:
  - "A5 and A6 from s03 are the two assumptions the human should accept or reject at this gate."
```

## Traceability
```yaml
upstream:
  - "artifact-governance-enforcement.s02.business-goal.md#Artifact Chính"
  - "artifact-governance-enforcement.s03.open-questions.md#Artifact Chính"
  - "skills/guardrails/artifact-governance/references/ownership-table.md"
objective_links:
  - "OBJ-1 -> AC-001, AC-002, AC-003"
  - "OBJ-2 -> AC-005, AC-010"
  - "OBJ-3 -> AC-006, AC-007, AC-008"
  - "OBJ-4 -> AC-004, AC-009"
coverage: "4 of 4 objectives have at least one criterion; 10 of 10 criteria trace to an objective"
next_step: "s05 Technical Approach"
```

## Handoff
- Ten criteria, each resolvable against a command output, a named fixture, or a grep.
- Compatibility floor is an invariant, not an aspiration: **17 of 17 existing work items keep passing.**
- `Contract` gate applies. The emitted artifact shape and the naming convention are what adopters build against.
- Carried into `s05` with binding constraints: `Q2` legacy shape, `Q3` escape-hatch design, `Q6` config surface confirmation.
- Blocking for `s07` only: the write-root collision with `stabilize-architecture-skill-bundle`.
- Not permitted yet: any change under `packages/`. That waits on Approach and Task Plan receipts, and on the collision clearing.
