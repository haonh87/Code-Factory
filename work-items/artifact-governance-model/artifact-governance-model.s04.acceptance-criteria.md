---
artifact_id: "artifact-governance-model.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "artifact-governance-model"
step_id: "s04"
step_slug: "acceptance-criteria"
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
sdd_mode: light
spec_refs:
  card: "product-specs/cards/artifact-governance-model.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec:
    - "ba"
  dor:
    - "po"
    - "ba"
  approach:
    - "developer"
  task_plan:
    - "developer"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-08-16T13:39:03.000Z"
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-08-16T13:39:03.000Z"
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "definition-of-ready-gate"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "artifact-governance-model.s01.restate.md"
  - "product-specs/cards/artifact-governance-model.md"
linked_artifacts:
  - "product-specs/cards/artifact-governance-model.md"
tags:
  - "agent-ops"
  - "workflow/s04"
  - "artifact-governance"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Acceptance criteria for P1 come from the Spec Card and are not restated here.
> This note holds the existing-system baseline, the governance checks and the readiness verdict.
> Spec and DoR both hold trusted receipts sealed by the repository owner on 2026-08-16.

## Step Contract
```yaml
step_goal: "Lock measurable acceptance for P1 and decide whether the work item is ready to move to approach and planning."
input_summary:
  - "s01 restate, including the measured census F1 to F13"
  - "Spec Card v0.1 draft with REQ-001 to REQ-009 and AC-001 to AC-009"
  - "User decisions of 2026-08-16: A6 confirmed, A8 approved, scope narrowed to P1"
output_summary:
  - "Existing system baseline for the artifact surfaces P1 touches"
  - "Governance checks under the default profile"
  - "DoR verdict"
  - "Freeze request for the Spec Card, pending a human authority"
done_when:
  - "Every acceptance criterion is checkable without reading the implementer's mind"
  - "The brownfield baseline names what exists today so the delta is visible"
  - "The DoR verdict is stated with its blocking items, if any"
owner: "ba"
```

## Existing System Baseline
```yaml
# Brownfield rule: name the running baseline before proposing a delta.
baseline_date: "2026-08-16"
what_exists_and_works:
  - surface: "wfc scaffold"
    behaviour: "Fixes step-note filenames. No skill owns a filename. This control works and P1 does not change it."
  - surface: "wfc validate"
    behaviour: "Validates naming across 127 files and governance across 123 notes. Passes today. P1 adds no check; enforcement is P3."
  - surface: "sdd_mode=light"
    behaviour: "Already reduces eight physical notes to five. architecture-role-skills demonstrates the shape. P1 uses it rather than inventing a layout."
  - surface: "Block ownership as a concept"
    behaviour: "Already applied to sa and ta by architecture-role-skills REQ-002, where every schema block has exactly one owner. P1 generalises an accepted pattern."
  - surface: "## Role Outputs preference"
    behaviour: "workflow-chain.md already states the preference for tracing role contribution via a Role Outputs block before splitting a per-role artifact. It is written but not enforced."
what_exists_and_is_defective:
  - surface: "workflow-execution-definitions.js"
    defect: "Emits one fixed filename per step while the schema it fills carries a single role. F12. Not changed in P1; this is P2."
  - surface: "validate-workflow-execution.js line 70"
    defect: "Reads assignment_id, role, owned_scope, done_when, status from the per-role artifact. Any change to where those live must migrate this reader in the same change. Not touched in P1."
  - surface: "s05 and s06 note templates"
    defect: "Compose several self-contained schemas, so shared context is restated once per contributing skill. F9 to F11. Not changed in P1."
  - surface: "docs/, repository root, changes/ versus work-items/"
    defect: "No declared owner per content layer. F1 to F8. Not changed in P1; this is P4."
what_p1_adds:
  - "One new skill directory under skills/guardrails/artifact-governance/"
  - "No modification to any existing file except the work-item notes and the Spec Card"
compatibility_position: "P1 is additive and docs-only. Nothing that runs today changes behaviour. The skill states rules that later phases enforce."
```

## Main Artifact
```yaml
# Acceptance criteria live in the Spec Card and are referenced, not restated.
# This is the first application of the rule this work item exists to establish.
acceptance_criteria_ref: "product-specs/cards/artifact-governance-model.md#Acceptance Criteria"
acceptance_criteria_ids:
  - "AC-001 shard-axis rule stated with external precedent"
  - "AC-002 threshold test yields a determinate verdict for all four runtime artifact kinds"
  - "AC-003 ownership table locates all five F9 duplications and no field has two owners"
  - "AC-004 reference syntax defined with a worked rewrite of a real duplicated field"
  - "AC-005 six content layers each have one declared root, with verdicts for the three census collisions"
  - "AC-006 every terminal branch of the decision procedure returns a section or a registered filename"
  - "AC-007 explicit non-ownership statement naming obsidian-markdown, wfc scaffold, wfc validate"
  - "AC-008 worked example on sample-execution-item with before and after counts, flat under a new role"
  - "AC-009 no runtime modification and unchanged skill inventory"
edge_cases:
  - id: "EDGE-001"
    case: "A contribution genuinely does not fit any existing owning section."
    expected: "The threshold test in AC-002 returns a verdict; if it returns file, the filename must come from the registered convention. The procedure must not return an invented path, and must not silently force unrelated content into a section where it does not belong."
  - id: "EDGE-002"
    case: "Two roles legitimately disagree inside the same owning section."
    expected: "The section records both positions with owners. Disagreement is content, not a reason to split a file."
  - id: "EDGE-003"
    case: "Concurrent multi-agent writers would conflict inside one note."
    expected: "ODC-004. The worked example must test this rather than assume it away. A positive finding reopens REQ-002 and is a legitimate reason for the threshold to return file."
  - id: "EDGE-004"
    case: "Deduplicating a field would remove the only copy a validator reads."
    expected: "Out of scope in P1 because P1 removes nothing. The skill must state the rule that a reader migration accompanies any later removal, so P2 inherits the constraint rather than rediscovering it."
out_of_scope:
  - "P2, P3, P4 as recorded in s01 phase_plan"
  - "Bundle inventory registration until stabilize-architecture-skill-bundle closes DoD"
done_when:
  - "AC-001 to AC-009 each have evidence recorded in s08"
  - "The worked example number for sample-execution-item is reported, not estimated"
  - "git status confirms packages/workflow-bundle is unmodified"
behavioral_invariants:
  - "wfc validate continues to pass on work-items with the same file and note counts, plus this work item's own notes"
  - "npm test result is unchanged"
  - "The managed-skill count reported by wfc status is unchanged during P1"
```

## Governance Checks
```yaml
checklist: "project-context/checklists/default.md"
checks:
  - id: "GOV-01"
    check: "Smallest solution that is correct"
    result: PASS
    evidence: "P1 assembles existing parts. sdd_mode=light already yields five notes; ## Role Outputs is already the stated preference; block ownership is already applied to sa and ta. The genuinely new material is the ownership table, the reference syntax and the decision procedure."
  - id: "GOV-02"
    check: "Brownfield delta discipline"
    result: PASS
    evidence: "Existing System Baseline names what works and what is defective, and P1 changes neither. The change is additive."
  - id: "GOV-03"
    check: "Option analysis before approach"
    result: PASS
    evidence: "Hosted in s06 under the Light gate contract. Three options compared with a recommended option and stated trade-offs; the Approach receipt is sealed."
  - id: "GOV-04"
    check: "No self-declared gate passage"
    result: PASS
    evidence: "spec_status remains draft. All role_signoffs and gate_reviews are empty. This note requests a freeze, it does not perform one."
  - id: "GOV-05"
    check: "TDD applicability"
    result: NOT_APPLICABLE
    evidence: "P1 is docs-only and changes no production behaviour. TDD becomes mandatory at P2, where the reader migration in validate-workflow-execution.js is a behaviour change; the skill must carry that constraint forward so P2 cannot skip it."
  - id: "GOV-06"
    check: "Worktree requirement"
    result: NOT_APPLICABLE
    evidence: "planning_track=quick, one new directory, single session, no conflict risk. P2 will need reassessment."
  - id: "GOV-07"
    check: "Encoding"
    result: PASS
    evidence: "All notes and the Spec Card are UTF-8. The Vietnamese raw_request in s01 retains its diacritics."
  - id: "GOV-08"
    check: "SDD Light eligibility"
    result: PASS
    evidence: "brownfield, quick, default profile, agentic, self, risk medium. No hard escalation trigger fires for P1: not greenfield, no public contract change, no migration, no regulated evidence, no multi-agent delegation, blast radius confined to one new directory."
blocking_items: []
```

## Definition of Ready
```yaml
verdict: READY
rationale: "Acceptance criteria are measurable and each names the artefact that will evidence it. The baseline is recorded. The three decisions that shaped scope were made by the user on 2026-08-16. No open decision blocks approach or planning."
checks:
  - item: "Problem is understood and measured"
    result: PASS
    evidence: "Census F1 to F13 in s01, with a correction recorded where an earlier reading was wrong"
  - item: "Acceptance criteria are testable"
    result: PASS
    evidence: "AC-002, AC-003 and AC-008 resolve against named existing artefacts and produce counts"
  - item: "Scope boundary is explicit"
    result: PASS
    evidence: "Spec Card out_scope plus s01 phase_plan P2 to P4"
  - item: "Dependencies identified"
    result: PASS
    evidence: "Inventory collision with stabilize-architecture-skill-bundle recorded as a sequencing constraint"
  - item: "Open decisions do not block"
    result: PASS
    evidence: "ODC-001 to ODC-003 shape deferred phases. ODC-004 is testable inside the P1 worked example."
residual_risk: "ODC-004 could reopen REQ-002 if concurrent writers genuinely need per-role files. The worked example is placed before skill authoring in the task plan so this surfaces early rather than after the rules are written."
```

## Spec Freeze
```yaml
# Freeze is a human gate. This block requests it; it does not perform it.
# status stays draft, the only non-frozen value the validator accepts.
# authority names the role that must sign, per governance-role-model.md;
# naming it is a declaration, not a signature.
status: draft
authority: "ba"
decided_at: ""
frozen_by_person: ""
freeze_requested_at: "2026-08-16"
spec_version_requested: "0.1"
requirements_in_freeze:
  - "REQ-001 to REQ-009"
acceptance_in_freeze:
  - "AC-001 to AC-009"
blocking_before_freeze: []
note: "spec_status stays draft in frontmatter until a human with ba authority records a reviewer and timestamp. Nothing downstream may treat this request as a passed gate."
```

## SDD Traceability
```yaml
card: "product-specs/cards/artifact-governance-model.md"
requirement_to_acceptance:
  - "REQ-001 -> AC-001"
  - "REQ-002 -> AC-002"
  - "REQ-003 -> AC-003"
  - "REQ-004 -> AC-004"
  - "REQ-005 -> AC-005"
  - "REQ-006 -> AC-006"
  - "REQ-007 -> AC-007"
  - "REQ-008 -> AC-008"
  - "REQ-009 -> AC-009"
coverage: "9 of 9 requirements have at least one acceptance criterion; no acceptance criterion maps to a missing requirement"
```

## Traceability
```yaml
upstream:
  - "artifact-governance-model.s01.restate.md#Business Goal"
  - "artifact-governance-model.s01.restate.md#Open Questions"
  - "product-specs/cards/artifact-governance-model.md"
next_step: "s06 Approach + Task Plan"
sdd_light_note: "Under the Light gate host contract, Spec and DoR are hosted here at s04; Approach and Task Plan are hosted together at s06. There is no s05 physical note."
```

## Review Provenance
```yaml
# Honest record of how gate_reviews came to be filled, so the audit trail is not misleading.
transcribed_by: "assistant, on the user's instruction in session"
transcribed_at: "2026-08-16T13:39:03.000Z"
basis:
  - "The user approved the scope narrowing to P1 and assumption A8 in session on 2026-08-16"
  - "The user successfully ran wfc work-item approve with their own passphrase, producing trusted_receipt=APPROVED"
  - "The user asked for the ready-bundle blocker to be cleared after being shown both options"
what_this_is_not: "This block is not itself a gate pass. The gate passes only when the user runs wfc gate approve-ready-bundle in an interactive TTY and supplies the approval passphrase, which hashes this note and signs the receipt. If the user has not actually read the acceptance criteria above, they should not seal."
reviewer_roles_source: "workflow-chain.md Default Owner For role_signoffs"
```

## Handoff
- Ready: acceptance is measurable, the baseline is recorded, and no open decision blocks approach or planning.
- Requested and not granted: the Spec freeze at `v0.1`, and the DoR gate. Both need a human with `ba` authority to record a reviewer and a timestamp.
- Carried into `s06`: option analysis, the brownfield impact of an additive skill, the approach, and a task plan that puts the `ODC-004` test before rule authoring.
- Not permitted yet: writing any line of the skill itself. That waits on the Approach and Task Plan receipts at `s06`.
