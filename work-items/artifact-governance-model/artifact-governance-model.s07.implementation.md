---
artifact_id: "artifact-governance-model.s07.implementation"
artifact_family: workflow-step
work_item_slug: "artifact-governance-model"
step_id: "s07"
step_slug: "implementation"
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
  spec: []
  dor: []
  approach: []
  task_plan: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "artifact-governance-model.s06.task-breakdown.md"
linked_artifacts:
  - "product-specs/cards/artifact-governance-model.md"
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> P1 authored one guardrail skill and two references, docs-only, no runtime change.
> The rules were tested against a real multi-role work item before being written down.
> DoD is not claimed here; s08 owns the verdict.

## Artifact Chính
```yaml
implemented_changes: []   # P1 is docs-only; no production code changed
doc_changes:
  - path: "skills/guardrails/artifact-governance/references/worked-example.md"
    lines: 197
    task: T1
    summary: "Rules applied by hand to work-items/sample-execution-item before being written down. Twelve of twelve files given a determinate destination, 12 files to 5, ODC-004 resolved."
  - path: "skills/guardrails/artifact-governance/references/ownership-table.md"
    lines: 171
    task: T2
    summary: "Twelve-row ownership table, reference syntax with resolver specification, worked rewrite of duplication F9 #2, and the reader-migration constraint inherited by P2."
  - path: "skills/guardrails/artifact-governance/SKILL.md"
    lines: 158
    task: T3
    summary: "Three rules, threshold test, placement contract with verdicts on the measured collisions, decision procedure, and the non-ownership statement."
  - path: "work-items/artifact-governance-model/artifact-governance-model.s07.implementation.md"
    task: T4
    summary: "This record."
key_findings:
  - id: "WE-1"
    finding: "F12 is demonstrated inside the repository's own reference sample, not only in theory."
    detail: "sample-execution-item declares parallel_budget 3 but holds one worker-assignment. Its merge-report claims to have merged S07-FRONTEND-001, an assignment that appears nowhere else because <slug>.s07.worker-handoff-report.md is a single fixed filename already occupied by S07-BACKEND-001."
  - id: "WE-2"
    finding: "38 percent of the four runtime satellite artifacts is overhead that exists only because they are separate files."
    detail: "185 lines total, of which 60 are frontmatter and 10 are back-pointer Links blocks, leaving 115 lines of real content."
  - id: "WE-3"
    finding: "ODC-004 resolved as no, on the strength of a rule the repository already has."
    detail: "AGENTS.global.md requires a worker to hand off to the coordinator rather than to the next step, so the coordinator is a single writer and concurrency lives in the agent conversation, not in file writes. The escape hatch and its registered filename are stated in case a future topology writes to the repo in parallel."
  - id: "WE-4"
    finding: "The rules required no revision after contact with all twelve files."
    detail: "T1 was sequenced before T2 and T3 precisely so a rule that failed would be revised rather than shipped. None failed."
operational_notes:
  - "The skill is authored but deliberately NOT registered in the bundle inventory. managed_skills stays 40 while stabilize-architecture-skill-bundle holds an in-flight assertion. Registration is P2."
  - "No SKILL.vi.md was written. Seven of eight guardrail skills have one, so the i18n sibling is house convention, but s06 affected_boundary did not list it and workflow-pack-audit does not require it. Recorded as a gap for the registration step rather than silently added outside the approved boundary."
  - "s06 still carries affected_boundary.created, which the new ownership table row 2 marks as derivable from task_breakdown[].paths_in_scope. It was left in place because s06 is sealed to four trusted receipts and editing it would invalidate all four. First entry on the P2 cleanup list."
tooling_gap_found_3:
  summary: "wfc work-item activate creates the s07 note lazily but does not inherit spec_refs.card, work_item_type or spec_status from the work item, so wfc sdd fails immediately after a successful activation."
  observed: "ERROR: Missing spec_refs.card for SDD note: ...s07.implementation.md, raised on the note the CLI had just generated."
  workaround: "Fields filled by hand in this note."
  disposition: "Third gap in the same approval path, after TD-01 and TD-02 in s01. Reinforces the case for a follow-up work item covering the path end to end."
```

## Delivery Rule Evidence
```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_test_refs: []
tdd_exception_reason: "P1 is docs-only. It adds one skill directory and changes no executable path, so there is no behaviour to drive with a test. The TDD obligation transfers to P2, where migrating the readers in validate-workflow-execution.js is a behaviour change; ownership-table.md records that constraint so P2 inherits it."
tdd_alternative_verify_path:
  - "T1 tested the rules against twelve real files before they were written, which is the docs-only analogue of writing the test first"
  - "npm run validate:workflow:unit - 26 unit test files pass"
  - "npm run validate:workflow:fixtures - 10 governance fixture cases pass"
  - "npm run validate:workflow:pack-audit - PASS, including three new checks on the new skill"
change_risk_profile: QUICK_FIX
worktree_status: NOT_REQUIRED
worktree_refs: []
worktree_reason: "planning_track=quick, additive only, one new directory, single session, zero conflict risk. Write roots do not overlap those of the active work item stabilize-architecture-skill-bundle. Reassess at P2, which modifies packages/workflow-bundle where that work item is mid-flight."
review_status: COMPLETED
review_refs:
  - "Spec-compliance pass over AC-001 to AC-008 before starting T4; AC-009 verified during T4"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
independence_refs: []
merge_path: "Direct on main. Additive, no branch."
verify_path:
  - "npm run validate:workflow -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:sdd -- --workflow-root work-items"
  - "npm run validate:workflow:planning -- --workflow-root work-items"
  - "npm run validate:workflow:protocol -- --workflow-root work-items"
  - "npm run validate:workflow:unit"
  - "npm run validate:workflow:fixtures"
  - "npm run validate:workflow:pack-audit"
  - "git status --porcelain packages/ workflow-bundle.manifest.json"
  - "npx wfc status --mode claude | grep managed_skills"
```

## Non-Regression Evidence
```yaml
# T4. AC-009: P1 changes no runtime behaviour.
packages_workflow_bundle:
  result: UNCHANGED_BY_THIS_WORK_ITEM
  observed: "git status --porcelain packages/ shows exactly one entry, M workflow-trusted-approval-utils.js"
  provenance: "That modification predates this session; it is present in the git status captured at session start. No task in this work item touched packages/."
manifest:
  result: UNCHANGED
  observed: "git status --porcelain workflow-bundle.manifest.json returns nothing"
skill_inventory:
  result: UNCHANGED
  observed: "npx wfc status --mode claude reports managed_skills=40, the same value as before P1"
  note: "The new directory exists on disk but is not registered, which is the intended state per REQ-009."
test_suites:
  - suite: "validate:workflow:unit"
    result: PASS
    observed: "26 workflow-bundle unit test files passed"
  - suite: "validate:workflow:fixtures"
    result: PASS
    observed: "10 governance fixture cases; the two EXPECTED_FAIL cases behaved as expected"
  - suite: "validate:workflow:pack-audit"
    result: PASS
    observed: "folder_name, frontmatter and yaml_scalar checks all PASS for skills/guardrails/artifact-governance"
validators:
  - name: "validate:workflow"
    result: PASS
  - name: "validate:workflow:planning"
    result: PASS
  - name: "validate:workflow:protocol"
    result: PASS
  - name: "validate:workflow:sdd"
    result: PASS_AFTER_FIX
    note: "Failed on the CLI-generated s07 note for missing spec_refs.card - see tooling_gap_found_3. Passes after the field was filled."
encoding:
  result: PASS
  observed: "All three new files are UTF-8"
files_created:
  - "skills/guardrails/artifact-governance/SKILL.md (158)"
  - "skills/guardrails/artifact-governance/references/ownership-table.md (171)"
  - "skills/guardrails/artifact-governance/references/worked-example.md (197)"
write_root_compliance:
  result: PASS
  observed: "granted_write_paths are skills/guardrails/artifact-governance and work-items/artifact-governance-model. Every file written falls inside one of them."
```

## SDD Traceability
```yaml
card: "product-specs/cards/artifact-governance-model.md"
requirement_refs:
  - "REQ-001 -> T3 -> SKILL.md Rule 1"
  - "REQ-002 -> T3 -> SKILL.md decision procedure step 3 and 4"
  - "REQ-003 -> T2 -> references/ownership-table.md the table"
  - "REQ-004 -> T2 -> references/ownership-table.md reference syntax and worked rewrite"
  - "REQ-005 -> T3 -> SKILL.md Rule 3 and verdicts"
  - "REQ-006 -> T3 -> SKILL.md decision procedure"
  - "REQ-007 -> T3 -> SKILL.md what this skill does not own"
  - "REQ-008 -> T1 -> references/worked-example.md"
  - "REQ-009 -> T4 -> Non-Regression Evidence above"
acceptance_refs:
  - "AC-001 to AC-008 reviewed PASS before T4"
  - "AC-009 evidenced in Non-Regression Evidence"
task_refs:
  T1: "references/worked-example.md"
  T2: "references/ownership-table.md"
  T3: "SKILL.md"
  T4: "this note"
test_refs:
  - "validate:workflow:unit"
  - "validate:workflow:fixtures"
  - "validate:workflow:pack-audit"
coverage: "9 of 9 requirements have an artifact; 4 of 4 tasks produced their expected output"
```

## Handoff
- Delivered: three files, 526 lines, all inside the granted write roots.
- Sequencing held: T1 tested the rules against twelve real files before T2 and T3 wrote them down. No rule needed revision.
- Not claimed: `DoD`. Acceptance evidence is recorded here; the verdict belongs to `s08`.
- Carried to `s08`: confirm AC-001 to AC-009 against the artifacts, and confirm the inventory is still 40.
- Carried to P2: the reader-migration constraint, the `SKILL.vi.md` sibling, registration into the bundle inventory, and the `s06` `affected_boundary.created` cleanup.
- Third tooling gap recorded as `tooling_gap_found_3`, joining `TD-01` and `TD-02` in `s01`.
