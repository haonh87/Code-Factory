---
artifact_id: "stabilize-architecture-skill-bundle.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "stabilize-architecture-skill-bundle"
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
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CHANGE-002"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CHANGE-002/spec-delta/brd.delta.md"
  srs: "changes/CHANGE-002/spec-delta/srs.delta.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
  - "qc"
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
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat: []
  release:
    - "devops"
    - "qc"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-14T14:20:25Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-08-14T14:20:25Z"
  dor_reviewed_by:
    - "qc"
  dor_reviewed_at: "2026-08-14T14:20:25Z"
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
  - "skill-creator"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "stabilize-architecture-skill-bundle.s01.restate.md"
  - "stabilize-architecture-skill-bundle.s02.business-goal.md"
  - "stabilize-architecture-skill-bundle.s03.open-questions.md"
linked_artifacts:
  - "changes/CHANGE-002/proposal.md"
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
  - "product-specs/cards/architecture-role-skills.md"
  - "product-specs/cards/arch-role-skills-release.md"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Ten measurable criteria cover installer safety, sa/ta contracts, evidence validation,
> architecture-modeling, runtime inventory, and release truthfulness. Human reviewers approved
> Spec, Contract, and DoR under their declared roles; the gates remain pending until their three
> digest-bound trusted receipts are sealed.

## Step Contract
```yaml
step: "s04 Acceptance + DoR"
goal: "The corrective release scope is expressed as testable requirements and contracts with a complete brownfield baseline and an explicit human-controlled readiness verdict."
value: "A reviewer can decide whether design may begin, and later verification can prove each release claim without reconstructing intent."
scope_in:
  - "Measurable acceptance criteria for all reviewed findings and the newly observed protocol-state inconsistency"
  - "Installer, sa/ta, architecture-modeling, validator, runtime, evidence, and release contracts"
  - "Brownfield baseline, compatibility, rollback, edge cases, and governance checks"
scope_out:
  - "Technical option selection"
  - "Renderer/helper implementation design"
  - "Task sequencing or production edits"
inputs_required:
  - "s01 restatement and architecture drivers"
  - "s02 business goal"
  - "s03 readiness, conflicts, and dispositions"
  - "CHANGE-002 BRD and SRS deltas"
  - "Frozen product-spec baselines and current v2.3.2 runtime baseline"
outputs_required:
  - "Ten acceptance criteria with verification directions"
  - "Skill, installer, validator, and release contract baseline"
  - "Existing System Baseline"
  - "Governance checks and Definition of Ready verdict"
done_when:
  - "Every in-scope finding maps to at least one measurable criterion"
  - "The architecture-modeling contract has concrete no-house, house-skill, and incomplete-input cases"
  - "Compatibility and rollback constraints are explicit"
  - "Every required readiness check has evidence"
  - "The note clearly identifies the human receipts still required"
constraints:
  hard_constraints:
    - "Do not pass Spec, Contract, or DoR on behalf of a human"
    - "Do not weaken frozen drawio or landscape-quality requirements"
    - "Do not permit unmanaged-file modification during install/update"
    - "Do not treat a stale or placeholder approval artifact as valid evidence"
  soft_constraints:
    - "Prefer checks that can run in isolated temporary roots"
  prohibited_actions:
    - "Choosing the final renderer boundary"
    - "Editing production or bundle source"
    - "Publishing or globally installing v2.4.0"
  compliance_checks:
    - "Apply default and strict governance acceptance checks"
    - "Trace every criterion to a change requirement and an s01 objective/driver"
risks:
  - id: "S04-R01"
    description: "The contract could verify drawio XML structure while missing first-open visual defects."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Require automated geometry checks plus a QC-owned first-open visual check."
    contingency: "Block Release and keep the prior published version."
    owner: "qc"
    status: MONITORING
  - id: "S04-R02"
    description: "Permission remediation could extend beyond managed paths."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Make zero unmanaged-file mutation an acceptance invariant across all four scenarios."
    contingency: "Reject the installer change and restore the v2.3.2 managed-operation boundary."
    owner: "developer"
    status: MONITORING
timebox:
  target_duration: "60 minutes"
  deadline: ""
  escalation_rule: "Return to s03 if a reviewer finds an unresolved requirement or contract conflict; do not enter s05 on assumption."
```

## Requirement Baseline
```yaml
status: APPROVED
receipt_status: PENDING
approved_spec_refs:
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
approved_spec_digests:
  - ref: "changes/CHANGE-002/spec-delta/brd.delta.md"
    sha256: "f3e5559fdea4d68488e0393ca8be9bd390d310fa23e17005a33f7abe51231100"
  - ref: "changes/CHANGE-002/spec-delta/srs.delta.md"
    sha256: "09210d3a3d477dd71ffbc43bb7d7e17aa8069f600f074ed50a25c7e4bd3e51e4"
decision_notes:
  - "The user explicitly approved Spec with the ba role on 2026-08-14T14:20:25Z."
  - "The draft supersedes only the enumerated architecture-role-skills and arch-role-skills-release clauses."
  - "The Spec gate becomes trusted only after its receipt is sealed against this final s04 artifact digest."
```

## Contract Baseline
```yaml
status: APPROVED
receipt_status: PENDING
api_contract_refs: []
ux_contract_refs: []
skill_contract_refs:
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-002"
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-003"
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-005"
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-006"
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-007"
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-008"
installer_contract_refs:
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-001"
validator_contract_refs:
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-004"
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-010"
release_contract_refs:
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-009"
notes:
  - "No public API or UX contract changes are in scope."
  - "The user explicitly approved Contract with the developer role on 2026-08-14T14:20:25Z."
  - "The Contract gate becomes trusted only after its receipt is sealed against this final s04 artifact digest."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "packages/workflow-bundle/package.json reports v2.3.2"
  - "packages/workflow-bundle/workflow-bundle.manifest.json reports v2.3.2"
  - "skills/, runtime/codex/skills, and runtime/claude/skills each contain 40 SKILL.md files"
  - "skills/analysis/sa and skills/analysis/ta are the canonical managed sources"
  - ".claude/skills/architecture-modeling is an untracked, read-only candidate and not a managed source"
  - "The approved work-item/change receipts are present, while the generated report still carries stale pending-approval blocker text"
impacted_surfaces:
  - "Installer/update permission lifecycle and its tests"
  - "sa/ta EN/VI schemas, ownership reference, examples, metrics, and metadata"
  - "Canonical architecture-modeling skill, references, metadata, and deterministic rendering support"
  - "Workflow evidence, coverage, and protocol-state validators plus negative fixtures"
  - "Runtime synchronization, manifest inventory, package metadata, smoke tests, and package contents"
  - "Corrective workflow/release artifacts, public docs, and v2.4.0 release notes"
compatibility_constraints:
  - "Existing CLI commands and supported Codex/Claude project/global modes remain available"
  - "Existing 40 managed skills retain their paths except for enumerated sa/ta corrections"
  - "Unmanaged files and directories under install roots remain byte-identical"
  - "House presentation skills retain their lane when detected; architecture-modeling must not create a competing diagram-tool artifact"
  - "sa/ta output shape remains stable while the threshold enum and ownership semantics are corrected"
rollback_constraints:
  - "Rollback is tested only in isolated roots before Release approval"
  - "A rollback may restore v2.3.2 managed files and inventory but must not remove or rewrite unmanaged content"
  - "v2.4.0 remains unpublished and global installations remain untouched until Release approval"
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: "AC-001"
    requirement_refs: ["CR-REQ-001", "OBJ-001", "TA-DRV-001"]
    criterion: "Given isolated Codex and Claude roots in both project and global scopes, when a fresh install is followed by an update after managed content is hardened, then all 4 scenarios exit successfully with 0 EACCES and every unmanaged-file hash is unchanged."
    verification: "Installer regression tests plus before/after unmanaged-content digest report."
  - id: "AC-002"
    requirement_refs: ["CR-REQ-002", "OBJ-003", "TA-DRV-002"]
    criterion: "All EN/VI sa and ta schema/example YAML fences parse with 0 errors, every threshold.status enum is exactly compatible with quantified, binary, and not_quantified, and no compact-map syntax defect remains."
    verification: "Automated fenced-YAML extraction, parse, and enum assertions."
  - id: "AC-003"
    requirement_refs: ["CR-REQ-003", "OBJ-003", "SA-DRV-004"]
    criterion: "Across EN/VI examples, sa emits 0 TA-owned driver kinds and no to_devops content; ta emits no SA-owned objectives or to_ba content; shared handoffs contain only the contributor's lens; paired sa/ta outputs are not byte-identical."
    verification: "Ownership-table assertions and paired-example semantic diff."
  - id: "AC-004"
    requirement_refs: ["CR-REQ-004", "OBJ-003", "TA-DRV-003"]
    criterion: "Named negative fixtures for empty required evidence, placeholder evidence, stale digests, inconsistent coverage totals, and contradictory protocol state fail before remediation and are rejected by the final validators with actionable messages."
    verification: "TDD red/green logs and full validator fixture suite."
  - id: "AC-005"
    requirement_refs: ["CR-REQ-005", "OBJ-003", "SA-DRV-005"]
    criterion: "Both languages define exactly M-01 through M-10; every metric row has formula, value, evidence, threshold, and calibration; declared metric counts and computed verification/handoff/ownership/coverage totals have 0 inconsistencies."
    verification: "Metric inventory and recomputation assertions over sa/ta references and examples."
  - id: "AC-006"
    requirement_refs: ["CR-REQ-006", "OBJ-002", "SA-DRV-003", "TA-DRV-004"]
    criterion: "architecture-modeling exists once under canonical skills source and in both generated runtimes with complete EN/VI content, agents metadata, and referenced resources; each runtime contains exactly 41 managed skills and recursive managed source/runtime diffs are empty."
    verification: "Skill validation, runtime sync, inventory assertions, orphan-reference scan, and recursive diff."
  - id: "AC-007"
    requirement_refs: ["CR-REQ-007", "OBJ-002", "SA-DRV-004"]
    criterion: "For the same representative input, the no-house-skill path produces model source plus drawio with architecture-modeling as the single render owner, while the house-skill path produces the same model and a complete handoff with the house skill as the single render owner; neither path creates two competing diagram-tool artifacts."
    verification: "Two deterministic ownership fixtures inspecting model, views, handoff, and artifact paths."
  - id: "AC-008"
    requirement_refs: ["CR-REQ-008", "OBJ-002", "TA-DRV-005"]
    criterion: "A representative multi-domain landscape opens as valid mxGraph drawio XML and reports 100% named ownership, 0 overlaps, 0 non-endpoint edge/box intersections, 0 unanalysed two-way arrows, 0 vague aggregate boxes, at most 25 engineering elements, 0 delete-test failures, 0 containment errors, and no more than 1 stated manual step."
    verification: "XML parse, geometry/containment/quality checks, and QC first-open visual confirmation."
  - id: "AC-009"
    requirement_refs: ["CR-REQ-009", "OBJ-001", "OBJ-002", "OBJ-003", "TA-DRV-006"]
    criterion: "Package metadata, manifests, CLI help, public docs, skill inventory, agents metadata, release notes, and package dry-run contain 0 conflicting values for v2.4.0, 41 skills per runtime, verification scope, limitations, compatibility, and rollback guidance."
    verification: "Version/inventory consistency checks, pack audit, bundle smoke, package dry-run, and release-document review."
  - id: "AC-010"
    requirement_refs: ["CR-REQ-010", "OBJ-003", "SA-DRV-002"]
    criterion: "Every corrected historical note identifies CHANGE-002, contains no required placeholder evidence, does not claim a stale receipt as current, and has a new reviewer/timestamp/digest match; protocol status output contains 0 blockers that contradict approved work-item or change receipts."
    verification: "Workflow/protocol/change validators, gate receipt status checks, and explicit correction trace review."
edge_cases:
  - "A managed root exists and is read-only from an earlier install"
  - "An unmanaged sibling file exists inside or beside a managed install root"
  - "Only one of the private/public approver key files exists"
  - "A threshold is binary and must be excluded from the M-04 numeric denominator"
  - "sa and ta receive the same raw request but must populate different owned content"
  - "A house presentation skill is present, absent, or detected with a notation conflict"
  - "A landscape element lacks an owner or domain; the gap must remain visible rather than guessed"
  - "An orthogonal edge would otherwise cross a non-endpoint box or leave its container"
  - "A prior gate receipt exists but no longer matches the corrected artifact digest"
  - "A report has APPROVED receipts but stale derived blocker prose"
out_of_scope:
  - "Registry publication and live global installation before Release approval"
  - "Unrelated workflow or application refactors"
  - "Replacing a house presentation skill or house modeling conventions"
  - "General-purpose graph layout beyond the required landscape/integration shapes"
  - "Dynamic newcomer, incident, and long-term drift tests as blocking release gates"
done_when:
  - "AC-001 through AC-010 each have passing evidence or an explicit release blocker"
  - "Spec, Contract, DoR, Approach, Task Plan, DoD, Release, and Business Acceptance receipts are valid when required"
  - "The full validation matrix and UTF-8 checks pass"
  - "No unrelated user-owned dirty file was modified"
behavioral_invariants:
  - "skills/ remains canonical; runtime trees remain derived"
  - "Unmanaged content is never modified by install, update, or rollback"
  - "sa and ta decide whether a landscape is required and accept it; they do not render it"
  - "Exactly one skill owns a diagram-tool artifact per invocation"
  - "Unknown architecture facts are reported, never invented"
  - "A human-controlled gate is valid only with authority, timestamp, and digest-bound trusted receipt"
```

## Architecture Modeling Skill Contract
```yaml
name: "architecture-modeling"
workflow_position: "s05 Technical Approach"
trigger_examples:
  - "Build a system landscape for a multi-system change"
  - "Model integration architecture with contract ownership and failure behavior"
  - "Derive business and engineering views from one architecture model"
input_contract:
  required:
    - "architecture_state"
    - "system inventory with stable IDs and responsibilities"
    - "domain and ownership data, or explicit gaps"
    - "directed integration relationships"
    - "question_answered for every requested landscape"
  optional:
    - "house conventions and adjacent presentation skill"
    - "prior human resolutions"
output_contract:
  model:
    - "single text source with stable elements and relationships"
    - "one architecture state per view"
    - "business and engineering view axes derived from the same facts"
  catalog:
    - "every integration has direction, protocol/format, sync mode, contract owner, version/compatibility, error policy, data classification, and volume or an owned gap"
  views:
    - "drawio for system landscape and integration architecture"
    - "mermaid only for flow or sequence"
    - "structurizr-dsl when one model must derive multiple model-as-code views"
  ownership:
    house_skill_present: "architecture-modeling emits model and handoff; the house skill alone owns the diagram-tool artifact"
    house_skill_absent: "architecture-modeling or its bundled deterministic helper emits drawio and its quality evidence"
    invariant: "exactly one render owner per invocation"
  evidence:
    - "output paths and source/model linkage"
    - "all eight landscape quality counts"
    - "overlap, edge-intersection, and containment results"
    - "manual_steps list"
    - "gaps, conflicts, ambiguous names, orphan nodes, and impacted views"
reusable_resources_required:
  - "house-convention detection guidance"
  - "two-axis view rules"
  - "integration catalog contract"
  - "diagram and landscape quality bars"
  - "drawio model/render contract"
  - "deterministic renderer/validator support selected at s05"
validation_cases:
  - id: "AM-C01"
    case: "No house presentation skill"
    expected: "Model plus accepted drawio produced by the architecture-modeling lane"
  - id: "AM-C02"
    case: "House presentation skill detected"
    expected: "Model plus complete handoff; no competing drawio generated"
  - id: "AM-C03"
    case: "Missing owner/domain or conflicting convention"
    expected: "Gap or conflict remains explicit; no fact is invented; notation conflict blocks only according to its declared scope"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
  - "project-context/checklists/strict.md"
checks:
  - id: "GOV-S04-001"
    check: "Acceptance criteria are measurable and verifiable"
    result: PASS
    evidence: "AC-001 through AC-010 each contain numeric or binary outcomes and a verification method."
  - id: "GOV-S04-002"
    check: "Reviewer coverage is specified for every main boundary"
    result: PASS
    evidence: "role_signoffs identifies ba, developer, qc, devops, and po authorities by gate."
  - id: "GOV-S04-003"
    check: "Backward compatibility and migration assumptions are recorded"
    result: PASS
    evidence: "Existing System Baseline defines CLI, runtime, unmanaged-file, output-shape, and house-lane compatibility constraints."
  - id: "GOV-S04-004"
    check: "Release impact and rollback expectations are identified"
    result: PASS
    evidence: "AC-009 plus rollback_constraints cover candidate update and isolated rollback before publication."
  - id: "GOV-S04-005"
    check: "Historical approval corrections remain auditable"
    result: PASS
    evidence: "AC-010 and CR-REQ-010 require CHANGE-002 traceability and new digest-bound receipts."
blocking_items:
  - "Spec, Contract, and DoR trusted receipts are not yet sealed"
owner: "ba/qc"
next_action: "Seal the three approved gates against the final s04 digest in a human-controlled terminal."
```

## Definition of Ready
```yaml
work_item_slug: "stabilize-architecture-skill-bundle"
status: READY
receipt_status: PENDING
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
  - "The pre-change managed inventory is 40 and the target is 41"
  - "Corrected historical evidence will be re-reviewed under CHANGE-002"
  - "Renderer internals are deferred to s05 without weakening the drawio outcome"
residual_risks:
  - "First-open drawio behavior still requires QC confirmation"
  - "The existing modified workflow-trusted-approval-utils.js file remains user-owned and must not be overwritten"
  - "The observed stale protocol blocker text may expose additional state-synchronization cases during implementation"
next_action: "Seal the pending Spec, Contract, and DoR receipts; only then may the workflow enter s05."
```

## Traceability
```yaml
upstream:
  - "stabilize-architecture-skill-bundle.s01.restate.md"
  - "stabilize-architecture-skill-bundle.s02.business-goal.md"
  - "stabilize-architecture-skill-bundle.s03.open-questions.md"
  - "changes/CHANGE-002/spec-delta/brd.delta.md"
  - "changes/CHANGE-002/spec-delta/srs.delta.md"
coverage:
  - "Finding 1 installer EACCES -> AC-001"
  - "Finding 2 schema/enum -> AC-002"
  - "Finding 3 ownership/example -> AC-003"
  - "Finding 4 evidence-free approvals -> AC-004 and AC-010"
  - "Finding 5 metric/coverage bookkeeping -> AC-005"
  - "Finding 6 missing architecture-modeling -> AC-006 through AC-008"
  - "Finding 7 public docs/metadata/release drift -> AC-009"
  - "Observed approved-receipt/stale-blocker inconsistency -> AC-004 and AC-010"
next_step: "s05 Technical Approach only after Spec, Contract, and DoR trusted receipts are valid"
```

## Handoff
- Mandatory criteria: AC-001 through AC-010, including the conditional single-owner drawio contract.
- Edge cases to preserve: hardened managed roots, unmanaged siblings, binary thresholds, house-skill presence/absence, explicit architecture gaps, geometry obstacles, stale digests, and contradictory protocol prose.
- Condition to move to step 5: reviewers and timestamps are now recorded; all three trusted receipts must still be sealed and match the final s04 artifact digest.
