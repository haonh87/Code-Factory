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
change_id: "CHANGE-003"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-003/spec-delta/brd.delta.md"
  - "changes/CHANGE-003/spec-delta/srs.delta.md"
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
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "ba"
    - "developer"
  dor:
    - "po"
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release:
    - "qc"
    - "devops"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-18T02:28:16.652Z"
  contract_reviewed_by:
    - "ba"
    - "developer"
  contract_reviewed_at: "2026-08-18T02:28:37.298Z"
  dor_reviewed_by:
    - "po"
    - "qc"
  dor_reviewed_at: "2026-08-18T02:28:51.735Z"
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
  - "sa"
  - "ta"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "artifact-governance-enforcement.s01.restate.md"
  - "artifact-governance-enforcement.s02.business-goal.md"
  - "artifact-governance-enforcement.s03.open-questions.md"
linked_artifacts:
  - "changes/CHANGE-003/proposal.md"
  - "changes/CHANGE-003/spec-delta/brd.delta.md"
  - "changes/CHANGE-003/spec-delta/srs.delta.md"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> The original AC-001 through AC-010 baseline was approved and remains intact. CHANGE-003 adds
> AC-011 through AC-016 for the v2.5.0/42-skill release delta. Refreshed Spec, Contract, and DoR
> receipts are required before release/inventory implementation resumes.

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

## CHANGE-003 Acceptance + DoR Delta

> [!warning]
> The original AC-001 through AC-010 baseline remains intact. This addendum is the only
> CHANGE-003 scope extension. Until refreshed Spec, Contract, and DoR receipts match this file,
> the release/inventory implementation path is closed.

### Delta Control
```yaml
change_id: "CHANGE-003"
change_receipt:
  status: APPROVED
  reviewed_by: "po"
  reviewed_at: "2026-08-17T14:42:39.211Z"
  trusted_receipt: "APPROVED"
base_spec_digest: "2e268cfce45dfad96d465b2e3b57669d03e10439d03c175f4f1b964f4b14dabc"
delta_refs:
  - "changes/CHANGE-003/spec-delta/brd.delta.md"
  - "changes/CHANGE-003/spec-delta/srs.delta.md"
supersedes:
  - "Artifact Chính.out_of_scope release/version/bundle-registration exclusion, for CHANGE-003 only"
preserves:
  - "AC-001 through AC-010"
  - "P4 and approval-path-defect exclusions"
  - "v2.4.0 at 41 skills and v2.3.2 at 40 skills as historical facts"
```

### Existing System Baseline Delta
```yaml
baseline_date: "2026-08-17"
current_state:
  package_version: "2.4.0"
  canonical_skill_count: 42
  codex_runtime_skill_count: 42
  claude_runtime_skill_count: 42
  aggregate_unit_result: "31 of 36 files pass"
  failing_release_files:
    - "release-candidate-artifact-smoke.test.js"
    - "release-install-all-smoke.test.js"
    - "release-rollback-smoke.test.js"
    - "release-surface.test.js"
    - "workflow-bundle-runtime-parity.test.js"
baseline_classification: "The five files also fail at clean HEAD 7f5b984 on 41-versus-42 assertions; CHANGE-003 owns the correction because P2's original s04 excluded release registration."
compatibility_floor:
  - "No current surface may assign 42 skills to v2.4.0."
  - "No historical surface may change v2.4.0 from 41 or v2.3.2 from 40."
  - "Unmanaged hashes and modes must be identical before and after install, update, and rollback."
```

### Contract Delta
```yaml
status: APPROVED
release_identity: "v2.5.0"
current_inventory: "42 canonical / 42 Codex / 42 Claude"
historical_inventory:
  v2.4.0: 41
  v2.3.2: 40
artifact_contract:
  - "Canonical skill source is the sole owner; both runtimes are recursive derived copies."
  - "artifact-governance ships with its declared Vietnamese sibling and referenced resources."
  - "One semantic version resolves to one immutable tarball inventory and one SHA-256."
  - "The verified tarball is the only artifact eligible for promotion."
rollback_contract:
  from: "v2.5.0"
  to: "v2.4.0"
  expected_count_transition: "42 -> 41"
  removes: "artifact-governance"
  unmanaged_change_count: 0
```

### Delta Acceptance Criteria
```yaml
acceptance_criteria:
  - id: "AC-011"
    requirement_ref: "CR-REQ-011"
    criterion: "artifact-governance has complete declared EN/VI skill content and both runtime copies are recursively equal to canonical."
    verify: "Assert required files and references, then recursive-diff canonical against Codex and Claude copies with difference count 0."
    objective: "CHANGE-003 OBJ-002"
  - id: "AC-012"
    requirement_ref: "CR-REQ-012"
    criterion: "Canonical, Codex, and Claude managed inventories are exactly 42/42/42."
    verify: "Runtime parity, pack audit, package dry-run, and exact-artifact smoke each report 42 in all three inventories."
    objective: "CHANGE-003 OBJ-001, OBJ-002"
  - id: "AC-013"
    requirement_ref: "CR-REQ-013, CR-REQ-014"
    criterion: "All current surfaces agree on v2.5.0 and 42 skills while frozen v2.4.0 and v2.3.2 surfaces remain 41 and 40 respectively."
    verify: "Version/inventory assertions are partitioned by release identity and report zero conflicts; git diff shows no historical claim rewritten."
    objective: "CHANGE-003 OBJ-003"
  - id: "AC-014"
    requirement_ref: "CR-REQ-015"
    criterion: "Exact-candidate install and update pass for Codex and Claude in global and project scopes without unmanaged hash or mode changes."
    verify: "Serialized 4/4 matrix passes with unmanaged change count 0."
    objective: "CHANGE-003 OBJ-002"
  - id: "AC-015"
    requirement_ref: "CR-REQ-016"
    criterion: "Exact-artifact rollback from v2.5.0 to retained v2.4.0 passes all four mode/scope cases, changes 42 to 41, removes artifact-governance, and preserves unmanaged state."
    verify: "Serialized rollback matrix passes 4/4 with version, count, absence, hash, and mode assertions."
    objective: "CHANGE-003 OBJ-002, OBJ-003"
  - id: "AC-016"
    requirement_ref: "BRD-DELTA-006"
    criterion: "The complete workflow-bundle unit command and all P2 validators, fixtures, audits, and smokes are green before candidate creation."
    verify: "36 of 36 unit files pass; workflow validators, fixtures, pack audit, bundle smoke, syntax, and UTF-8 checks pass."
    objective: "CHANGE-003 OBJ-001"
edge_cases:
  - id: "EDGE-006"
    case: "A global replacement changes every 41 to 42."
    expected: "Rejected because it mutates v2.4.0 history; assertions must be version-scoped."
  - id: "EDGE-007"
    case: "A candidate is rebuilt after verification."
    expected: "Rejected; any tracked source mutation invalidates the candidate and requires full reverification."
  - id: "EDGE-008"
    case: "Rollback uses a source checkout rather than the retained v2.4.0 artifact."
    expected: "Rejected; rollback evidence must identify the immutable known-good artifact."
out_of_scope_still_applies:
  - "P4 docs/root/changes migration"
  - "TD-01, TD-02, and tooling_gap_found_3"
  - "Registry publication, tag creation, or live global update before Release approval"
```

### Definition of Ready
```yaml
work_item_slug: "artifact-governance-enforcement"
status: READY
checks:
  restated_request_clear: PASS
  business_goal_clear: PASS
  scope_defined: PASS
  open_questions_non_blocking: PASS
  acceptance_criteria_testable: PASS
  dependencies_known: PASS
  verification_direction_present: PASS
blocking_gaps: []
accepted_assumptions:
  - "PO approval of CHANGE-003 accepts v2.5.0 as the additive 42-skill release identity."
  - "The retained v2.4.0 artifact is the known-good rollback target."
residual_risks:
  - "Version-scoped documentation can be corrupted by mechanical search/replace; AC-013 blocks this."
  - "Candidate provenance breaks after any source mutation; AC-015 and AC-016 require rebuild and reverification."
next_action: "Use matching Spec, Contract, and DoR receipts as input to the approved CHANGE-003 implementation path."
```

### Delta Gate Control
```yaml
workflow_status: ACTIVE
missing_gates: []
next_artifact_after_gates: "s07 implementation evidence"
implementation_allowed: true
```
