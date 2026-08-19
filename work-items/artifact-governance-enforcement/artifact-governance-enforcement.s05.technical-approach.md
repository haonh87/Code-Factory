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
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-18T02:59:59.005Z"
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
  - "ci-cd-release"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "artifact-governance-enforcement.s04.acceptance-criteria.md"
linked_artifacts:
  - "changes/CHANGE-003/proposal.md"
  - "changes/CHANGE-003/design.md"
  - "changes/CHANGE-003/spec-delta/brd.delta.md"
  - "changes/CHANGE-003/spec-delta/srs.delta.md"
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> The approved write-new/read-both P2 design remains intact. CHANGE-003 adds the smallest
> release delta that gives the existing 42-skill source a truthful v2.5.0 identity and verifies
> one immutable candidate without rewriting v2.4.0 history.

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
- Recommended option: Preserve the approved P2 design and apply the CHANGE-003 v2.5.0 release delta below.
- Accepted trade-off: Keep historical version/count assertions beside new current-state assertions.
- Condition to move to step 6: Developer approval of the refreshed Approach digest.
- Deployment note: No tag, registry publication, or live global installation is authorized by s05.

## CHANGE-003 Technical Approach Delta

> [!warning]
> This addendum owns AC-011 through AC-016 only. It does not reopen the approved AC-001 through
> AC-010 design and is the approved release approach when its trusted Approach receipt matches this artifact.

### Step Contract Delta
```yaml
step: "s05 Technical Approach"
goal: "Lock a release-safe v2.5.0 design for managed skill 42 while preserving immutable v2.4.0 and v2.3.2 evidence."
value: "s06 can name exact sync, release, test, candidate, and rollback tasks without re-inferring version ownership or artifact provenance."
scope_in:
  - "AC-011 through AC-016"
  - "artifact-governance EN/VI completeness and canonical-to-runtime synchronization"
  - "v2.5.0 current release surfaces and version-scoped release tests"
  - "one retained candidate, exact-artifact install/update, and v2.5.0-to-v2.4.0 rollback"
scope_out:
  - "Changing the approved AC-001 through AC-010 enforcement design"
  - "Editing frozen v2.4.0 or v2.3.2 release claims"
  - "Registry publication, tag creation, live global installation, P4, or unrelated defects"
inputs_required:
  - "Approved CHANGE-003 and s04 Spec/Contract/DoR receipts with digest_match=true"
  - "Existing 42-skill source/runtime baseline"
  - "Retained v2.4.0 tarball SHA-256 44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e"
outputs_required:
  - "Option analysis, recommended system design, brownfield impact, and CI/CD release controls"
done_when:
  - "The recommendation traces to AC-011 through AC-016 and rejects smaller incorrect options"
  - "Current versus historical release ownership is unambiguous"
  - "Candidate creation, invalidation, promotion, and rollback rules are testable"
constraints:
  hard_constraints:
    - "Canonical skill source is the sole owner; generated runtimes are derived copies"
    - "v2.4.0 stays 41 skills; v2.3.2 stays 40 skills"
    - "Promoted bytes must equal verified candidate bytes"
    - "Install, update, and rollback must not change unmanaged hashes or modes"
  soft_constraints:
    - "Prefer direct changes on existing paths over a new release-metadata abstraction"
  prohibited_actions:
    - "Global count/version replacement, hand-edited generated sources, candidate mutation, or pre-approval publication"
  compliance_checks:
    - "Version-scoped release assertions, recursive runtime diff, exact-artifact matrices, and digest verification"
risks:
  - id: "R-D1"
    description: "A mechanical edit rewrites historical release truth."
    likelihood: "MEDIUM"
    impact: "HIGH"
    severity: "HIGH"
    mitigation: "Partition assertions by release identity and explicitly test v2.4.0=41 and v2.3.2=40."
    contingency: "Stop, restore historical files, and rerun the release-surface diff."
    owner: "developer"
    status: "OPEN"
  - id: "R-D2"
    description: "A source mutation makes the candidate digest stale."
    likelihood: "MEDIUM"
    impact: "HIGH"
    severity: "HIGH"
    mitigation: "Pack only after source verification and invalidate after any tracked mutation."
    contingency: "Discard, fully reverify, and build one replacement candidate."
    owner: "developer"
    status: "OPEN"
  - id: "R-D3"
    description: "Rollback uses a checkout rather than the retained v2.4.0 artifact."
    likelihood: "LOW"
    impact: "HIGH"
    severity: "HIGH"
    mitigation: "Pin the retained artifact filename and SHA-256."
    contingency: "Treat rollback as failed until the exact artifact resolves."
    owner: "qc"
    status: "OPEN"
timebox:
  target_duration: "One s05 authoring and developer-review cycle"
  deadline: ""
  escalation_rule: "Return to s04 if release identity, historical immutability, and known-good rollback cannot all be preserved."
```

### Option Analysis Delta
```yaml
goal: "Resolve T7-F1 without assigning two inventories to v2.4.0 or removing artifact-governance."
ba_lane:
  business_goal: "Restore the full bundle gate and expose artifact-governance as a truthful managed capability."
  user_scenarios:
    - "An adopter installs or updates v2.5.0 and receives the same 42 skills in Codex and Claude."
    - "A release owner audits or rolls back to the exact v2.4.0 41-skill artifact."
  business_rules:
    - "One semantic version owns one immutable inventory and digest."
    - "Historical release evidence is append-only; Release remains human-controlled."
  scope_notes: ["Only the CHANGE-003 release/inventory delta is reopened."]
  open_questions: []
dev_lane:
  repo_constraints:
    - "Source and both runtimes already contain 42 skill directories; five release tests still assert 41."
    - "The retained v2.4.0 tarball exists with a recorded immutable SHA-256."
  technical_risks: ["Nested runtime drift", "candidate drift", "historical/current claim mix-up"]
  integration_points: ["runtime sync", "package/public surfaces", "five release tests", "exact-artifact smoke"]
  nfr_notes: ["42/42/42 and diff=0; units 36/36; install/update 4/4; rollback 4/4; unmanaged changes=0"]
  baseline_context: "Brownfield v2.4.0 package with completed P2 behavior and deferred release registration."
options:
  - name: "Option A - Additive v2.5.0 release delta"
    summary: "Complete EN/VI, regenerate runtimes, update current surfaces/tests to v2.5.0/42, append a release note, and verify one candidate plus exact rollback."
    pros: ["Meets AC-011 through AC-016", "preserves history", "reuses existing delivery paths"]
    cons: ["Requires full release verification and fresh human gates"]
    risks: ["Version-scoped edits must be deliberate"]
  - name: "Option B - Rewrite v2.4.0 as 42 skills"
    summary: "Keep the old version and update its current inventory."
    pros: ["Smallest apparent text delta"]
    cons: ["Assigns 41 and 42 to one identity", "invalidates rollback meaning"]
    risks: ["Unauditable history"]
  - name: "Option C - Remove skill 42"
    summary: "Return current inventory to 41 and defer registration."
    pros: ["Makes legacy assertions green"]
    cons: ["Fails AC-011 and AC-012", "does not deliver the approved capability"]
    risks: ["Installed capability drifts from source intent"]
recommended_option: "Option A - Additive v2.5.0 release delta"
recommendation_reason: "It is the smallest option satisfying all six criteria while preserving one-version/one-inventory and the known-good rollback target."
validation_plan:
  - "Protect historical pairs before changing current surfaces; prove recursive parity; pack after all source gates; run four serialized install/update and rollback cases."
notes_for_next_step: "READY for system design and, after Approach approval, execution-oriented s06 planning."
```

### Main Artifact Delta
```yaml
design_problem: "Give the already-present skill a truthful public bundle identity and restore the aggregate gate without altering approved P2 behavior or frozen history."
business_rule_trace:
  - "AC-011 -> bilingual canonical skill and recursive runtime equality"
  - "AC-012 -> exact 42/42/42 inventory"
  - "AC-013 -> v2.5.0 current surfaces; v2.4.0=41; v2.3.2=40"
  - "AC-014 -> exact-candidate install/update 4/4 with unmanaged changes 0"
  - "AC-015 -> exact rollback 4/4, 42-to-41, skill removed, unmanaged changes 0"
  - "AC-016 -> 36/36 units plus validators, audits, smokes, syntax, and UTF-8"
design_options:
  - name: "Additive v2.5.0 on the existing bundle architecture"
    summary: "Reuse canonical sync, current surfaces, existing tests, and immutable npm-pack evidence."
    pros: ["No new boundary", "Preserves history", "Directly testable"]
    cons: ["Full release matrix required"]
    risks: ["Claim mix-up", "candidate drift"]
  - name: "Reuse v2.4.0"
    summary: "Attach inventory 42 to the prior identity."
    pros: ["Fewer version edits"]
    cons: ["Breaks immutable identity"]
    risks: ["Audit ambiguity"]
rejected_options:
  - { name: "Reuse v2.4.0", reason: "Fails AC-013 and one-version/one-inventory." }
  - { name: "Remove skill 42", reason: "Fails AC-011 and AC-012." }
recommended_design: "Finish canonical artifact-governance EN/VI, generate both runtime copies, update only current surfaces and version-scoped tests, append v2.5.0 release evidence, retain one candidate, and prove rollback with the exact retained v2.4.0 tarball."
recommendation_reason: "It reuses all existing ownership and delivery boundaries and introduces no new framework, service, schema, or command."
component_changes:
  - "Canonical artifact-governance plus generated Codex/Claude copies"
  - "Package metadata, CLI help, current README/publish surfaces, and new v2.5.0 release note"
  - "Five release-contract tests and retained candidate evidence"
data_flow:
  - "Canonical skill -> runtime sync -> two generated copies"
  - "Verified source -> npm pack -> retained v2.5.0 tarball/digest -> exact-artifact tests"
  - "v2.5.0 isolated roots -> retained v2.4.0 tarball -> rollback evidence"
  - "Evidence -> QC DoD/Release -> PO Business Acceptance -> optional later promotion of identical bytes"
interface_changes:
  - "Public package/CLI identity changes from 2.4.0 to 2.5.0 and managed inventory from 41 to 42."
  - "No command syntax, workflow schema, receipt, or installer ownership contract changes."
failure_modes:
  - { scenario: "Historical claims are rewritten", impact: "Contradictory release history", guardrail: "Version-scoped assertions and historical diff" }
  - { scenario: "Nested runtime file drifts", impact: "Mode-dependent behavior", guardrail: "Recursive diff count 0" }
  - { scenario: "Candidate changes after verification", impact: "Stale evidence", guardrail: "Invalidate and fully reverify" }
  - { scenario: "Rollback does not use retained tarball", impact: "Unknown rollback target", guardrail: "Pin filename and SHA-256" }
compatibility_impact:
  - "Additive managed skill; commands and workflow artifacts remain compatible."
  - "Existing v2.4.0 roots can update to v2.5.0 and roll back to retained 41-skill bytes."
  - "Unmanaged state and historical approved artifacts remain untouched."
rollback_impact:
  - "Before publication, discard an invalid candidate and retain v2.4.0 as known-good."
  - "Executable rollback expects 42-to-41, artifact-governance removal, and unchanged unmanaged hashes/modes."
observability_hooks:
  - "Units 36/36; inventory 42/42/42; recursive diff 0; install/update 4/4; rollback 4/4; unmanaged changes 0."
  - "Candidate record contains version, filename, source commit, entry inventory, SHA-256, and invalidation state."
constraints_applied:
  - "Brownfield smallest delta, canonical ownership, human gates, immutable promotion, known-good rollback"
validation_plan:
  - "Focused fail-first release tests, full unit/validator/audit/smoke gate, recursive parity, package inspection, exact install/update, exact rollback, UTF-8 and diff checks"
specialized_followups:
  - { skill: "ci-cd-release", reason: "Lock artifact immutability, approval, evidence, and rollback." }
notes_for_next_step: "s06 must name owned paths, TDD red/green, batch reviews, exact commands, candidate invalidation, and the no-publication stop."
```

### Architecture Details - CI/CD Release
```yaml
pipeline_scope: "Build, verify, retain, and human-promote one local v2.5.0 npm candidate; registry publication is out of scope."
source_strategy:
  branch_model: "Continue in codex/artifact-governance-enforcement; do not merge or clean before s08 DoD."
  triggers: ["Approach and Task Plan receipts open implementation", "All source checks permit one candidate build"]
build_and_verify:
  stages:
    - "pre-merge: focused red/green tests, 36 units, validators, fixtures, audit, smoke, syntax, UTF-8"
    - "build-publish: npm pack to one retained local tarball without publication"
    - "pre-release: inventory/digest, exact install/update 4/4, exact rollback 4/4, QC review"
  cache_strategy: ["Do not reuse or mutate a v2.5.0 tarball", "Treat retained v2.4.0 as read-only rollback input"]
  required_checks: ["36/36", "42/42/42 and diff=0", "install/update 4/4", "rollback 4/4", "version truth and UTF-8"]
artifact_flow:
  registry: "None in scope"
  artifact_types: ["workflow-bundle-2.5.0.tgz", "SHA-256 and package inventory"]
  tagging_strategy: ["Plan immutable v2.5.0 only after Release approval", "Never use latest as evidence"]
  provenance_controls: ["Record commit, filename, version, counts, inventory, digest", "Invalidate after any tracked mutation"]
promotion_flow:
  - from: "local"
    to: "dev"
    conditions: ["Not executed in scope", "Would require Release receipt, same digest, and smoke"]
    automation_level: "manual and blocked until separately authorized"
approval_controls:
  - "Developer: Approach and Task Plan; QC or DevOps: Release; QC: DoD; PO: Business Acceptance."
release_controls:
  pre_release: ["No HIGH finding, spec/parity drift, unit failure, unmanaged mutation, or stale digest", "Confirm v2.4.0 rollback digest"]
  post_release: ["If later authorized, verify version, count 42, skill presence, and resolved digest"]
rollback_controls:
  - "Stop on digest mismatch, unit failure, parity difference, or unmanaged mutation."
  - "Use retained v2.4.0 SHA-256 44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e only."
  - "After rollback verify skill absence and unchanged unmanaged hashes/modes."
pipeline_risks: ["Accidental rebuild", "premature v2.4.0 worktree cleanup", "broad historical edits"]
pipeline_recommendation: "READY_WITH_GUARDS"
notes_for_implementation_or_ops: "Ready only with digest immutability, retained rollback bytes, and no-tag/no-publish controls."
```

### Brownfield Impact Analysis Delta
```yaml
impacted_modules: ["artifact-governance source/runtimes", "package and current public surfaces", "five release tests", "s07/s08 evidence"]
compatibility_risks:
  - { risk: "v2.4.0 adopter receives an additive managed skill", handling: "Name it v2.5.0 and prove 4/4 updates without unmanaged mutation." }
  - { risk: "Historical files change with current docs", handling: "Freeze old version/count pairs and review their diff before packing." }
  - { risk: "Canonical/worktree notes diverge", handling: "Keep s04-s06 byte-equal until branch finalization after s08." }
migration_notes: ["No note, receipt, schema, or data migration", "Existing installer adds one managed directory"]
rollback_notes: ["Use exact retained v2.4.0 tarball, never a checkout", "No worktree cleanup before DoD"]
```

### Governance Exceptions
```yaml
status: "NONE"
exceptions: []
reason: "The design stays inside approved CHANGE-003, existing ownership, and human-controlled release gates."
```

### Spec Change
```yaml
status: "APPLIED_TO_S04"
change_id: "CHANGE-003"
approved_by: "po"
approved_at: "2026-08-17T14:42:39.211Z"
delta_scope: "AC-011 through AC-016 only"
additional_change_required: false
```

### Traceability Delta
```yaml
upstream:
  - "changes/CHANGE-003/proposal.md"
  - "changes/CHANGE-003/spec-delta/brd.delta.md"
  - "changes/CHANGE-003/spec-delta/srs.delta.md"
  - "artifact-governance-enforcement.s04.acceptance-criteria.md#CHANGE-003 Acceptance + DoR Delta"
acceptance_links:
  - "AC-011/012 -> canonical/runtime completeness and parity"
  - "AC-013 -> version-scoped release surfaces"
  - "AC-014/015 -> exact install/update and rollback"
  - "AC-016 -> complete source gate before packing"
next_step: "s06 CHANGE-003 Task Plan Delta after developer Approach approval"
```

### Delta Handoff
- Recommended option: additive v2.5.0 on the existing bundle architecture.
- Accepted trade-off: full release verification for a narrow code delta.
- Condition to move to s06: fresh developer Approach receipt with `digest_match=true`.
- Release boundary: retain locally only; no tag, publication, or live global update.
