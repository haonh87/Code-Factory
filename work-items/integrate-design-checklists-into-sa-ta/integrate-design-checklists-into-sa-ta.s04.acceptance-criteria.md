---
artifact_id: "integrate-design-checklists-into-sa-ta.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "integrate-design-checklists-into-sa-ta"
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
change_id: "CHANGE-004"
change_status: approved
spec_delta_refs:
  - "changes/CHANGE-004/spec-delta/brd.delta.md"
  - "changes/CHANGE-004/spec-delta/srs.delta.md"
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: "changes/CHANGE-004/spec-delta/brd.delta.md"
  srs: "changes/CHANGE-004/spec-delta/srs.delta.md"
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
  spec_reviewed_at: "2026-08-19T02:53:05Z"
  contract_reviewed_by:
    - "developer"
  contract_reviewed_at: "2026-08-19T02:53:05Z"
  dor_reviewed_by:
    - "qc"
  dor_reviewed_at: "2026-08-19T02:53:05Z"
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
  - "workflow-governance-router"
  - "codex-workflow-chain"
  - "sa"
  - "ta"
  - "skill-creator"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "integrate-design-checklists-into-sa-ta.s01.restate.md"
  - "integrate-design-checklists-into-sa-ta.s02.business-goal.md"
  - "integrate-design-checklists-into-sa-ta.s03.open-questions.md"
linked_artifacts:
  - "changes/CHANGE-004/proposal.md"
  - "changes/CHANGE-004/spec-delta/brd.delta.md"
  - "changes/CHANGE-004/spec-delta/srs.delta.md"
  - "product-specs/cards/architecture-role-skills.md"
  - "product-specs/cards/arch-role-skills-release.md"
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Ten measurable criteria define portable checklist behavior, confidentiality, SA/TA role boundaries, compatibility, parity, and release truthfulness. Human reviewers approved Spec, Contract, and DoR under their declared roles; the gates remain untrusted until their three digest-bound receipts are sealed.

## Step Contract
```yaml
step: "s04 Acceptance + DoR"
goal: "CHANGE-004 is expressed as testable requirements and a public skill contract with a complete brownfield baseline, explicit verification directions, and a human-controlled readiness boundary."
value: "BA, Developer, and QC can independently decide whether technical option analysis may begin, and later verification can prove each promised outcome without reconstructing intent from the confidential source."
scope_in:
  - "Measurable acceptance criteria for all 34 source-rule routes and ten CHANGE-004 requirements"
  - "Conditional checklist evidence, confidentiality, SA/TA ownership, and downstream-authority contracts"
  - "Brownfield baseline, compatibility, rollback, edge cases, representative cases, and governance checks"
  - "Definition of Ready recommendation and exact human receipts required before s05"
scope_out:
  - "Choosing the checklist representation, file layout, schema extension, sync mechanism, or release version"
  - "Choosing a technology, pattern, domain boundary, schema, diagram, or architecture model"
  - "Task sequencing, production skill edits, runtime generation, installation, or publication"
  - "Passing any human-controlled gate on behalf of a reviewer"
inputs_required:
  - "Approved CHANGE-004 and work-item receipts"
  - "s01 restatement, routing matrix, SA drivers, and TA drivers"
  - "s02 business goal and measurable outcomes"
  - "s03 open-question dispositions and READY input assessment"
  - "CHANGE-004 human-approved BRD and SRS deltas plus frozen product-spec baselines"
outputs_required:
  - "Ten testable acceptance criteria with requirement, objective/driver, and verification traces"
  - "Requirement and public skill Contract baselines"
  - "Existing System Baseline and representative behavior matrix"
  - "Governance checks and Definition of Ready recommendation"
done_when:
  - "Every CR-REQ-001 through CR-REQ-010 maps to one measurable acceptance criterion"
  - "Every OBJ and SA/TA driver maps to at least one criterion"
  - "Representative positive and negative behavior is testable without prescribing implementation"
  - "Compatibility, confidentiality, rollback, and release constraints are explicit"
  - "The artifact states that Spec, Contract, and DoR receipts are still required before s05"
constraints:
  hard_constraints:
    - "AI must not pass Spec, Contract, or DoR."
    - "Only independently worded, domain-neutral content may be distributable; HCP provenance remains private."
    - "SA and TA remain s01-s04 driver skills; system-design and architecture-modeling retain s05 design and modeling authority."
    - "No required output block or ownership meaning may be silently removed, renamed, or reassigned."
    - "No implementation or release path opens until all required authoring receipts are sealed."
  soft_constraints:
    - "Prefer criteria that existing contract, parity, pack-audit, smoke, and UTF-8 lanes can verify."
    - "Keep the public skill body concise and place reusable detail in a directly referenced resource if s05 confirms one is needed."
  prohibited_actions:
    - "Copying confidential source prose or project-specific decisions into publishable files."
    - "Selecting the final checklist shape or bundle version in s04."
    - "Editing canonical skills, runtimes, tests, manifests, or release files."
  compliance_checks:
    - "Apply the strict governance checklist."
    - "Trace every criterion to CHANGE-004, one CR requirement, and the relevant s01 objective or driver."
    - "Keep Foundation and UAT not applicable while retaining Release and Business Acceptance as required."
risks:
  - id: "S04-R01"
    description: "Mechanically complete checklist fields could still encourage rote review instead of relevant architecture reasoning."
    likelihood: MEDIUM
    impact: MEDIUM
    severity: MEDIUM
    mitigation: "Require a trigger and authority for each check, an explicit not-applicable path, and representative behavior tests."
    contingency: "Remove items that cannot change an owned driver, question, handoff, or verification obligation."
    owner: "ba/qc"
    status: MONITORING
  - id: "S04-R02"
    description: "A source-derived phrase could leak HCP context despite passing structural checks."
    likelihood: LOW
    impact: HIGH
    severity: HIGH
    mitigation: "Combine denylist and source-similarity checks with human Spec and Contract review."
    contingency: "Exclude or rewrite the affected item and block Release."
    owner: "ba/qc"
    status: MONITORING
  - id: "S04-R03"
    description: "An additive contract surface could break existing consumers or create a second output authority."
    likelihood: MEDIUM
    impact: HIGH
    severity: HIGH
    mitigation: "Lock existing block ownership and negative no-solution-selection behavior before s05 compares representations."
    contingency: "Choose reference-only integration or reject the additive surface."
    owner: "developer"
    status: MONITORING
timebox:
  target_duration: "One focused s04 authoring and validation pass"
  deadline: ""
  escalation_rule: "Return to s03 if a reviewer finds an unresolved requirement or confidentiality conflict; do not enter s05 without all three trusted receipts."
```

## Requirement Baseline
```yaml
status: APPROVED
receipt_status: PENDING
approved_spec_refs:
  - "changes/CHANGE-004/spec-delta/brd.delta.md"
  - "changes/CHANGE-004/spec-delta/srs.delta.md"
approved_spec_digests:
  - ref: "changes/CHANGE-004/spec-delta/brd.delta.md"
    sha256: "fd420a4badf40b904c8064f9ff36315461a3678df9dea27f629614baf7466bc4"
  - ref: "changes/CHANGE-004/spec-delta/srs.delta.md"
    sha256: "f6dc14438e32432979a8eed38618b88f75ee7368d43d4def5631ec366e54256c"
decision_notes:
  - "The user explicitly approved Spec with the ba role on 2026-08-19T02:53:05Z."
  - "The deltas add portable pre-design guidance and preserve the frozen s01-s04 versus s05 authority boundary."
  - "The Spec gate becomes trusted only after its receipt is sealed against this final s04 artifact digest."
```

## Contract Baseline
```yaml
status: APPROVED
receipt_status: PENDING
api_contract_refs: []
ux_contract_refs: []
skill_contract_refs:
  - "changes/CHANGE-004/spec-delta/srs.delta.md#CR-REQ-001"
  - "changes/CHANGE-004/spec-delta/srs.delta.md#CR-REQ-002"
  - "changes/CHANGE-004/spec-delta/srs.delta.md#CR-REQ-003"
  - "changes/CHANGE-004/spec-delta/srs.delta.md#CR-REQ-004"
  - "changes/CHANGE-004/spec-delta/srs.delta.md#CR-REQ-005"
  - "changes/CHANGE-004/spec-delta/srs.delta.md#CR-REQ-006"
  - "changes/CHANGE-004/spec-delta/srs.delta.md#CR-REQ-007"
  - "changes/CHANGE-004/spec-delta/srs.delta.md#CR-REQ-008"
  - "changes/CHANGE-004/spec-delta/srs.delta.md#CR-REQ-009"
  - "changes/CHANGE-004/spec-delta/srs.delta.md#CR-REQ-010"
notes:
  - "No public API, event, database, or UX contract changes are in scope."
  - "The public contract is the SA/TA triggering, guidance, output ownership, handoff, reference, metadata, and distributed-runtime behavior."
  - "The user explicitly approved Contract with the developer role on 2026-08-19T02:53:05Z."
  - "The Contract gate becomes trusted only after its receipt is sealed against this final s04 artifact digest."
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "skills/analysis/sa and skills/analysis/ta are the canonical managed sources."
  - "Each canonical skill has EN/VI instructions, agents/openai.yaml, and shared reference families for schema, ownership, invocation, examples, metrics, landscape quality, and visual encoding."
  - "packages/workflow-bundle/runtime/codex/skills/analysis/{sa,ta} and runtime/claude equivalents are generated user-facing copies."
  - "packages/workflow-bundle/package.json and workflow-bundle.manifest.json currently report 2.4.0."
  - "The current role contract extracts architecture drivers and handoffs but has no approved public checklist derived from the selected HCP source."
impacted_surfaces:
  - "Canonical SA and TA SKILL.md, SKILL.vi.md, directly referenced resources, and agents metadata when triggering changes"
  - "Architecture-role contract and representative behavior tests"
  - "Codex and Claude generated runtime copies of SA and TA"
  - "Reference, EN/VI semantic parity, runtime recursive diff, workflow pack audit, bundle smoke, and UTF-8 validation lanes"
  - "Manifest inventory, compatibility statement, rollback guidance, and release notes only if s05-s06 approve packaging"
compatibility_constraints:
  - "Existing required output blocks keep their names, presence rules, and owner meanings."
  - "SA does not emit TA-owned technical drivers or to_devops content; TA does not emit SA-owned objectives or to_ba content."
  - "Shared handoffs contain only the contributor's lens."
  - "Existing standalone invocation, profiles, metrics M-01 through M-10, landscape handoff, and downstream skill authority remain valid."
  - "All currently valid architecture-role fixtures remain valid unless an explicit Contract delta says otherwise."
rollback_constraints:
  - "Rollback restores only CHANGE-004-managed canonical and generated files to the verified 2.4.0 baseline."
  - "Unmanaged user files and global installations remain untouched before Release approval."
  - "If packaging is approved, rollback must restore the prior managed version, inventory, references, and runtime parity together."
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: "AC-001"
    requirement_refs: ["CR-REQ-001", "OBJ-001", "OBJ-002", "TA-DRV-001"]
    criterion: "The private source-rule matrix contains every R-ID from R-01 through R-34 exactly once as a primary route, with 13 adopted, 10 converted to questions or handoffs, 8 deferred to s05 or implementation policy, 3 excluded as HCP-specific, and 0 missing or multiply routed rules."
    verification: "Parse the matrix, normalize R-IDs, assert the complete 1..34 set, unique primary routes, and exact route totals."
  - id: "AC-002"
    requirement_refs: ["CR-REQ-002", "OBJ-001", "SA-DRV-002", "SA-DRV-004"]
    criterion: "All 13 adopted portable checks define a trigger, owner lens, concern or invariant, expected evidence, downstream handoff, verification method, and authority reference when blocking; incomplete checks and unanchored blocking mandates total 0."
    verification: "Validate each adopted check against the approved checklist contract and run negative fixtures for each missing required field and missing blocking authority."
  - id: "AC-003"
    requirement_refs: ["CR-REQ-003", "OBJ-002", "SA-DRV-001", "SA-DRV-003", "TA-DRV-003"]
    criterion: "Publishable changed files contain 0 HCP-specific system or product names, HCP ownership decisions, exact HCP operational thresholds, source paths, private R-IDs, or verbatim confidential passages."
    verification: "Run scoped denylist, source-path/R-ID scan, and source-similarity review, then record BA and Developer review of generalized wording."
  - id: "AC-004"
    requirement_refs: ["CR-REQ-004", "OBJ-001", "OBJ-003", "TA-DRV-005"]
    criterion: "Six named architecture-readiness cases produce the applicable SA/TA driver, question, constraint, or handoff, while 0 cases select or prescribe a technology, pattern, schema, domain boundary, diagram, or architecture model."
    verification: "Run the representative behavior matrix and assert expected owner lens, concern, handoff target, and forbidden solution-selection tokens or decisions."
  - id: "AC-005"
    requirement_refs: ["CR-REQ-005", "OBJ-003", "SA-DRV-002", "TA-DRV-002"]
    criterion: "Required SA/TA output block names, presence rules, and ownership meanings have 0 removals, renames, or reassignments; all existing valid contract fixtures pass; system-design and architecture-modeling remain the only downstream design/model authorities."
    verification: "Run schema, block-ownership, shared-handoff, current-fixture regression, and downstream-authority assertions for both languages."
  - id: "AC-006"
    requirement_refs: ["CR-REQ-006", "OBJ-001", "SA-DRV-004"]
    criterion: "Every supplementary check is advisory unless it cites at least one named stakeholder concern, constraint, approved policy, or accepted criterion; unanchored universal mandates total 0."
    verification: "Inspect authority provenance and run negative fixtures for advisory-to-blocking escalation without authority."
  - id: "AC-007"
    requirement_refs: ["CR-REQ-007", "OBJ-003", "SA-DRV-005"]
    criterion: "Every adopted or converted concern maps to an existing canonical obligation or a unique approved gap, with 0 contradictory duplicate normative rules across SA, TA, and their shared references."
    verification: "Review a rule-to-existing-contract overlap matrix and run duplicate/conflict assertions over normative statements."
  - id: "AC-008"
    requirement_refs: ["CR-REQ-008", "OBJ-003", "SA-DRV-003", "TA-DRV-004"]
    criterion: "Canonical English and Vietnamese SA/TA resources have 0 unresolved semantic mismatches, all new references resolve, each Codex and Claude generated copy matches canonical source recursively, and unmanaged runtime skills have 0 CHANGE-004 differences."
    verification: "Run EN/VI semantic comparison, reference validation, scoped runtime synchronization, recursive diffs, and an unaffected-skill digest comparison."
  - id: "AC-009"
    requirement_refs: ["CR-REQ-009", "OBJ-003", "TA-DRV-001", "TA-DRV-002", "TA-DRV-003", "TA-DRV-004", "TA-DRV-005"]
    criterion: "Architecture-role contract, six representative cases, confidentiality, static/reference, semantic parity, runtime diff, workflow pack audit, bundle smoke, diff-check, and UTF-8 lanes all exit 0, or the work item remains blocked with the failed command and owner recorded."
    verification: "Reconcile command logs and exit codes to an acceptance-coverage matrix at s08."
  - id: "AC-010"
    requirement_refs: ["CR-REQ-010", "OBJ-003", "SA-DRV-003", "TA-DRV-004"]
    criterion: "If packaging is approved, package metadata, manifest inventory, compatibility notes, rollback guidance, release notes, and both runtimes state one approved version and scope; before Release approval there are 0 registry publications and 0 global-install mutations."
    verification: "Compare public surfaces and package dry-run contents, inspect isolated rollback evidence, and verify the trusted Release receipt before publication or global installation."
edge_cases:
  - "A source rule is relevant to both SA and TA: retain one primary route and express secondary lens ownership without duplicate normative text."
  - "No checklist concern applies: emit an explicit not-applicable reason rather than dumping all checks."
  - "A user directly requests a technology or pattern in s01-s04: record the constraint and hand it to s05 without choosing it."
  - "A check is labeled blocking but has no authority: downgrade it to advisory or open a question; do not enforce it."
  - "A source item cannot be generalized without exposing HCP context: exclude it."
  - "A new English rule lacks a reviewed Vietnamese semantic counterpart: parity fails and Release stays blocked."
  - "A runtime copy differs while canonical source is correct: canonical source wins and runtime must be regenerated, not hand-edited."
  - "The internal source changes after this snapshot: do not silently reclassify; open a new spec delta or change."
  - "Packaging is not approved: retain the 2.4.0 baseline and treat version/inventory edits as out of scope."
out_of_scope:
  - "Publishing or copying the internal source document"
  - "Selecting technical solutions, architecture models, or diagrams inside SA/TA"
  - "Changing the external HCP source"
  - "Redesigning system-design, architecture-modeling, or unrelated workflow capabilities"
  - "Multi-agent execution"
  - "Registry publication or global installation before Release approval"
done_when:
  - "AC-001 through AC-010 have PASS evidence or an explicit blocking finding at s08."
  - "Spec, Contract, and DoR receipts match the final s04 digest before s05 starts."
  - "Approach and Task Plan receipts match their final artifacts before s07 activation."
  - "Release, Business Acceptance, and DoD follow their declared human authorities."
behavioral_invariants:
  - "SA/TA surface concerns; they do not select the solution."
  - "A checklist check is advisory unless a named authority makes it blocking."
  - "Private provenance and public guidance remain separate."
  - "Existing output blocks and role ownership remain compatible."
  - "Canonical source owns generated runtimes."
```

## Representative Behavior Matrix

| Case | Expected pre-design result | Owner lens | Forbidden result |
|---|---|---|---|
| Data authority | Identify source-of-truth, ownership, seam, and reconciliation questions | SA + TA | Choose database, event bus, or integration pattern |
| Contested resource authority | Identify decision authority, conflict policy need, and measurable contention scenario | SA + TA | Choose locking or consensus mechanism |
| Reconciliation | Identify invariant, failure/recovery concern, evidence, and downstream handoff | TA | Prescribe job, queue, or algorithm |
| Compliance timing | Identify named policy/constraint, timing threshold need, evidence owner, and QC/DevOps handoff | SA + TA | Invent a regulatory threshold |
| Lifecycle or retirement | Identify system-of-record transition, ownership, exit criteria, rollback, and decommission evidence | SA | Select migration or cutover implementation |
| Offline or online invariant | Identify availability/consistency scenario, boundary condition, and verification obligation | TA | Choose cache, sync protocol, or storage engine |

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - id: "GOV-001"
    status: PASS
    evidence: "Approved CHANGE-004 and work-item trusted receipts establish the reviewed change boundary."
  - id: "GOV-002"
    status: PASS
    evidence: "Existing System Baseline identifies canonical ownership, generated runtimes, current version, compatibility, and rollback constraints."
  - id: "GOV-003"
    status: PASS
    evidence: "AC-003 and OQ-001 separate private provenance from distributable content."
  - id: "GOV-004"
    status: PASS
    evidence: "AC-004 through AC-006 preserve the SA/TA versus s05 authority boundary and require blocking authority."
  - id: "GOV-005"
    status: PASS
    evidence: "AC-001 through AC-010 each name a verification direction and trace to a CR requirement."
  - id: "GOV-006"
    status: PASS
    evidence: "The user explicitly approved Spec as ba, Contract as developer, and DoR as qc; reviewer fields and timestamps are recorded."
  - id: "GOV-007"
    status: PENDING
    evidence: "The three digest-bound trusted receipts have not yet been sealed."
blocking_items:
  - "Seal the Spec trusted receipt as ba."
  - "Seal the Contract trusted receipt as developer."
  - "Seal the DoR trusted receipt as qc."
owner: "ba/developer/qc"
next_action: "Seal independent spec, contract, and dor receipts against the unchanged s04 digest."
```

## Definition of Ready
```yaml
work_item_slug: "integrate-design-checklists-into-sa-ta"
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
  - "Version-independent acceptance criteria are sufficient for s04; the release/version target must be locked before Task Plan approval."
  - "Private R-ID provenance may remain in workflow evidence but not publishable skill content."
residual_risks:
  - "Automated and s08 confidentiality checks must still confirm that the human-approved wording has zero contextual leakage."
  - "s05 must prove that its chosen representation is smaller than or safer than alternatives without breaking current consumers."
next_action: "Seal the Spec receipt as ba, Contract receipt as developer, and DoR receipt as qc; s05 remains blocked until all three receipts match this final artifact digest."
```

## Human Gate Status
```yaml
spec:
  status: HUMAN_APPROVED_RECEIPT_PENDING
  required_role: "ba"
contract:
  status: HUMAN_APPROVED_RECEIPT_PENDING
  required_role: "developer"
dor:
  status: HUMAN_APPROVED_RECEIPT_PENDING
  allowed_roles:
    - "ba"
    - "qc"
transition_to_s05: BLOCKED
```

## Traceability
```yaml
upstream:
  - "integrate-design-checklists-into-sa-ta.s01.restate.md"
  - "integrate-design-checklists-into-sa-ta.s02.business-goal.md"
  - "integrate-design-checklists-into-sa-ta.s03.open-questions.md"
  - "changes/CHANGE-004/spec-delta/brd.delta.md"
  - "changes/CHANGE-004/spec-delta/srs.delta.md"
objective_to_acceptance:
  - "OBJ-001 -> AC-001, AC-002, AC-004, AC-006"
  - "OBJ-002 -> AC-001, AC-003"
  - "OBJ-003 -> AC-004, AC-005, AC-007, AC-008, AC-009, AC-010"
driver_to_acceptance:
  - "SA-DRV-001 -> AC-003"
  - "SA-DRV-002 -> AC-002, AC-005"
  - "SA-DRV-003 -> AC-003, AC-008, AC-010"
  - "SA-DRV-004 -> AC-002, AC-006"
  - "SA-DRV-005 -> AC-007"
  - "TA-DRV-001 -> AC-001, AC-009"
  - "TA-DRV-002 -> AC-005, AC-009"
  - "TA-DRV-003 -> AC-003, AC-009"
  - "TA-DRV-004 -> AC-008, AC-009, AC-010"
  - "TA-DRV-005 -> AC-004, AC-009"
next_step: "s05 Technical Approach after Spec, Contract, and DoR trusted receipts"
```

## Handoff
- Mandatory criteria: AC-001 through AC-010, including exact 34-rule accounting, zero leakage, role-boundary behavior, compatibility, and parity.
- Edge cases: dual-lens routing, not-applicable behavior, direct solution requests, unanchored blocking rules, confidential-only items, bilingual/runtime drift, source changes, and no-release mode.
- Current verdict: Spec, Contract, and DoR are human-approved; workflow remains WAITING_APPROVAL and transition to s05 BLOCKED until trusted receipts exist.
- Required human action: seal Spec as ba, Contract as developer, and DoR as qc against this unchanged artifact.
