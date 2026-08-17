---
artifact_id: "artifact-governance-model.s08.verification"
artifact_family: workflow-step
work_item_slug: "artifact-governance-model"
step_id: "s08"
step_slug: "verification"
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
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: []
  foundation: []
  task_plan: []
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
  dod_reviewed_by:
    - "qc"
  dod_reviewed_at: "2026-08-17T05:27:04.000Z"
content_skills:
  - "codex-workflow-chain"
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "artifact-governance-model.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Verification evidence for P1. All nine acceptance criteria have evidence and every check run
> passes. `DoD` was granted by the repository owner, who initiated
> `wfc gate approve --gate dod --reviewed-by qc`; the trusted receipt ratifies this note.

## Step Contract
```yaml
step_goal: "Confirm every acceptance criterion in the Spec Card has evidence, confirm P1 changed no runtime behaviour, and state residual risk so a human can decide DoD."
input_summary:
  - "s07 implementation record and Non-Regression Evidence"
  - "The three artifacts produced by T1 to T3"
  - "Spec Card AC-001 to AC-009"
output_summary:
  - "Per-criterion evidence"
  - "Regression and compatibility summary"
  - "Residual risk and the P2 carry-forward list"
done_when:
  - "Each of AC-001 to AC-009 resolves against a named artifact or a command output"
  - "The inventory is shown unchanged"
  - "The DoD verdict is left to a human"
owner: "qc"
```

## Artifact Chính
```yaml
verification_scope:
  - "skills/guardrails/artifact-governance/SKILL.md"
  - "skills/guardrails/artifact-governance/references/ownership-table.md"
  - "skills/guardrails/artifact-governance/references/worked-example.md"
  - "Non-regression across packages/workflow-bundle, the manifest, and the skill inventory"
evidence_refs:
  - "artifact-governance-model.s07.implementation.md#Non-Regression Evidence"
acceptance_evidence:
  - id: AC-001
    result: PASS
    evidence: "SKILL.md Rule 1 states the shard-axis rule and cites BMAD-METHOD at nine roles and zero per-role files, plus Kiro, Spec Kit and OpenSpec at three to four files per feature."
  - id: AC-002
    result: PASS
    evidence: "worked-example.md section 3 gives a section-or-file verdict with Q1/Q2/Q3 reasoning for all four runtime artifact kinds. Four of four determinate; none needed a judgement call."
  - id: AC-003
    result: PASS
    evidence: "ownership-table.md holds twelve rows covering paths, task ids, acceptance ids, verification method and gate reviewer. All five F9 duplications are located at rows 1, 2, 4, 7 and 8. No fact appears twice in the Owner column."
  - id: AC-004
    result: PASS
    evidence: "ownership-table.md defines the ref syntax, gives a five-step resolver specification, and rewrites duplication F9 #2 verbatim from the real note."
  - id: AC-005
    result: PASS
    evidence: "SKILL.md Rule 3 assigns one root to each of the six layers and issues verdicts for the docs/release versus docs/releases collision, the four accumulated audit reports, and the six loose repository-root files."
  - id: AC-006
    result: PASS
    evidence: "SKILL.md decision procedure has five terminals: two return an owning section, one returns a registered filename, and two refuse. No branch returns an invented path."
  - id: AC-007
    result: PASS
    evidence: "SKILL.md 'What this skill does not own' names obsidian-markdown, wfc scaffold, wfc validate, codex-workflow-chain, and the CLI-owned Work Item Protocol block."
  - id: AC-008
    result: PASS
    evidence: "worked-example.md section 5 maps all twelve files of sample-execution-item to a destination; section 6 reports 12 files to 5, and +0 files when a seventh role is added against +2 today."
  - id: AC-009
    result: PASS
    evidence: "git status on packages/ shows only the pre-existing modification to workflow-trusted-approval-utils.js, which predates this session. The manifest is unmodified. wfc status reports managed_skills=40, unchanged."
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied: "project-context/checklists/default.md"
checks:
  - id: "GOV-V1"
    check: "Smallest solution that is correct"
    result: PASS
    evidence: "P1 assembled sdd_mode=light, the existing ## Role Outputs preference and the block-ownership pattern already applied to sa and ta. New material is limited to the ownership table, the reference syntax and the decision procedure."
  - id: "GOV-V2"
    check: "Brownfield delta discipline"
    result: PASS
    evidence: "Additive only. Rollback is deleting one directory."
  - id: "GOV-V3"
    check: "TDD for behaviour change"
    result: NOT_APPLICABLE
    evidence: "Docs-only, no executable path changed. The obligation transfers to P2 and is recorded in ownership-table.md."
  - id: "GOV-V4"
    check: "Review before handoff, spec compliance then code quality"
    result: PASS
    evidence: "s07 review_status COMPLETED; AC-001 to AC-008 reviewed before T4, AC-009 during it."
  - id: "GOV-V5"
    check: "Encoding"
    result: PASS
    evidence: "All three new files UTF-8."
  - id: "GOV-V6"
    check: "No self-declared DoD"
    result: PASS
    evidence: "The implementer did not declare DoD. The note was left BLOCKED with evidence_complete=true until the repository owner initiated wfc gate approve --gate dod --reviewed-by qc. The verdict below records that human decision; the trusted receipt is what makes it binding."
blocking_items: []
owner: "qc"
next_action: "Seal the dod receipt. Then open P2 as a separate work item."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
evidence:
  - suite: "validate:workflow"
    result: PASS
    detail: "131 files, 127 notes"
  - suite: "validate:workflow:sdd"
    result: PASS
    detail: "23 notes"
  - suite: "validate:workflow:planning"
    result: PASS
    detail: "127 notes"
  - suite: "validate:workflow:protocol"
    result: PASS
    detail: "2 protocol-managed work items"
  - suite: "validate:workflow:unit"
    result: PASS
    detail: "26 unit test files"
  - suite: "validate:workflow:fixtures"
    result: PASS
    detail: "10 governance fixture cases, both EXPECTED_FAIL cases behaved as expected"
  - suite: "validate:workflow:pack-audit"
    result: PASS
    detail: "folder_name, frontmatter and yaml_scalar all PASS for the new skill"
gate_digest_integrity:
  result: PASS
  detail: "All four gate receipts still report digest_match=true after the s07 and s08 notes were written, because neither is a gate host."
rollback_readiness: READY
rollback_procedure: "rm -rf skills/guardrails/artifact-governance/"
```

## Scan Summary
```yaml
status: NOT_APPLICABLE
notes:
  - "No executable code, no dependency and no runtime surface was added. Static analysis and security scanning have nothing to scan in P1."
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "approval_gates.uat is not_applicable for this work item."
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "The skill is deliberately unregistered. Registration and release belong to P2, gated on stabilize-architecture-skill-bundle closing its own DoD."
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes:
  - "approval_gates.business_acceptance is not_applicable for this work item."
```

## Audit
```yaml
audit_status: PASS
notes:
  - "Nine of nine acceptance criteria have evidence naming an artifact or a command output."
  - "Four of four tasks produced their declared output; T1 ran before T2 and T3 as the plan required."
  - "One measurement error was made and corrected during verification: a shell loop reported four validators as FAIL because it word-split the -- separator. Run individually, all four PASS. Recorded so the evidence trail shows the correction rather than only the final state."
  - "Three tooling gaps were found and recorded rather than silently worked around: TD-01 and TD-02 in s01, tooling_gap_found_3 in s07."
```

## Definition of Done
```yaml
status: DONE
gate_closed: true
closed_at: "2026-08-17T05:27:04.000Z"
closed_by_role: "qc"
verdict_reason: "9 of 9 acceptance criteria PASS, 0 PARTIAL, 0 UNTESTED, 0 FAIL. Seven of seven check suites pass. The skill inventory is unchanged at 40 and packages/workflow-bundle carries no modification from this work item. Four residual risks remain, all LOW or MEDIUM, none blocking, each with a named destination in P2."
scope_closed: "P1 only - authoring the skill and its rule set. P2 to P4 were never in scope and remain open as separate work."
decision_provenance:
  human_act: "The repository owner initiated wfc gate approve --work-item artifact-governance-model --gate dod --reviewed-by qc."
  transcription: "The verdict fields above were written by the assistant after that command, at the owner's direction. The binding artifact is the trusted receipt, which hashes this note and is sealed with the owner's passphrase in an interactive TTY."
  not_claimed_before: "This block read BLOCKED with evidence_complete=true until the owner acted."
evidence_complete: true
residual_risks:
  - id: "RR-1"
    risk: "The rules are not machine-enforced. A violation stays invisible until P3 adds the checks, which is exactly how docs/ drifted."
    severity: MEDIUM
    accepted_because: "A rule validated against a real work item is a better input to an enforcement check than an unvalidated one. Recorded in s06 as residual_risk_accepted."
  - id: "RR-2"
    risk: "ODC-004 was resolved against the currently declared topology. If workers ever write to the repository in parallel, REQ-002 reopens."
    severity: LOW
    accepted_because: "The escape hatch and its registered filename are stated in worked-example.md section 4."
  - id: "RR-3"
    risk: "No SKILL.vi.md sibling. Seven of eight guardrail skills have one."
    severity: LOW
    accepted_because: "workflow-pack-audit does not require it and s06 affected_boundary did not list it. Carried to the registration step rather than added outside the approved boundary."
  - id: "RR-4"
    risk: "s06 still carries affected_boundary.created, which the new ownership table marks as derivable."
    severity: LOW
    accepted_because: "s06 is sealed to four trusted receipts; editing it would invalidate all four. First entry on the P2 cleanup list."
owners:
  dod: "qc"
```

## Spec Coverage
```yaml
card: "product-specs/cards/artifact-governance-model.md"
coverage:
  - requirement: REQ-001
    acceptance: AC-001
    task: T3
    evidence: "SKILL.md Rule 1"
    status: PASS
  - requirement: REQ-002
    acceptance: AC-002
    task: T3
    evidence: "SKILL.md decision procedure steps 3 and 4; worked-example.md section 3 verdict table"
    status: PASS
  - requirement: REQ-003
    acceptance: AC-003
    task: T2
    evidence: "ownership-table.md the table, twelve rows"
    status: PASS
  - requirement: REQ-004
    acceptance: AC-004
    task: T2
    evidence: "ownership-table.md reference syntax, resolver specification and worked rewrite of F9 #2"
    status: PASS
  - requirement: REQ-005
    acceptance: AC-005
    task: T3
    evidence: "SKILL.md Rule 3 and the verdicts on measured collisions"
    status: PASS
  - requirement: REQ-006
    acceptance: AC-006
    task: T3
    evidence: "SKILL.md decision procedure, five terminals"
    status: PASS
  - requirement: REQ-007
    acceptance: AC-007
    task: T3
    evidence: "SKILL.md what this skill does not own"
    status: PASS
  - requirement: REQ-008
    acceptance: AC-008
    task: T1
    evidence: "worked-example.md sections 5 and 6"
    status: PASS
  - requirement: REQ-009
    acceptance: AC-009
    task: T4
    evidence: "s07 Non-Regression Evidence; managed_skills=40; packages/ unchanged by this work item"
    status: PASS
summary: "9 of 9 requirements covered, 9 of 9 PASS, 0 UNTESTED"
untested: []
```

## SDD Traceability
```yaml
card: "product-specs/cards/artifact-governance-model.md"
requirement_refs:
  - "REQ-001 to REQ-009"
acceptance_refs:
  - "AC-001 to AC-009"
task_refs:
  T1: "REQ-008"
  T2: "REQ-003, REQ-004"
  T3: "REQ-001, REQ-002, REQ-005, REQ-006, REQ-007"
  T4: "REQ-009"
test_refs:
  - "validate:workflow:unit - 26 unit test files"
  - "validate:workflow:fixtures - 10 governance fixture cases"
  - "validate:workflow:pack-audit - 3 checks on the new skill"
  - "validate:workflow, :sdd, :planning, :protocol"
note: "No new automated test was added because P1 adds no executable path. The document-level criteria are evidenced by artifact inspection recorded in Spec Coverage above; the suites listed here evidence non-regression only."
```

## Traceability
```yaml
upstream:
  - "artifact-governance-model.s07.implementation.md#Non-Regression Evidence"
  - "artifact-governance-model.s06.task-breakdown.md#Main Artifact"
  - "product-specs/cards/artifact-governance-model.md#Acceptance Criteria"
spec_coverage: "AC-001 to AC-009, 9 of 9 PASS"
next_step: "Human DoD decision. If granted, P2 opens as a separate work item."
```

## Handoff
- Overall status: **DONE for P1**, granted by the repository owner. Nine of nine acceptance criteria PASS; seven of seven check suites PASS; the skill inventory is unchanged at 40.
- Residual risks: `RR-1` to `RR-4` above, none blocking, all carried forward with a named destination.
- Recommendation: grant `DoD` for P1 and open P2 as a separate work item covering the `## Role Outputs` block, the reader migration at `validate-workflow-execution.js:70`, registration with the `SKILL.vi.md` sibling, and the three tooling gaps found along the way.
- Release recommendation: none. P1 ships nothing; the skill stays unregistered until `stabilize-architecture-skill-bundle` closes its own `DoD`.
- Next action:
