---
artifact_id: "architecture-modeling-audience-views.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "architecture-modeling-audience-views"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
work_item_type: RESEARCH
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
  card: "product-specs/cards/architecture-modeling-audience-views.md"
spec_status: approved
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
  contract: "not_applicable"
  dor: "required"
  approach: "not_applicable"
  foundation: "not_applicable"
  task_plan: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
  dod: "required"
role_signoffs:
  spec:
    - "ba"
  contract: []
  dor:
    - "ba"
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by:
    - "ba"
  spec_reviewed_at: "2026-09-11T13:25:13.000Z"
  dor_reviewed_by:
    - "ba"
  dor_reviewed_at: "2026-09-11T13:25:13.000Z"
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
  - "architecture-modeling-audience-views.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> The research is complete and its outcome is recorded here. All four concepts receive `FOLD_IN`,
> none is `DELIBERATELY_EXCLUDED`, and assumption ASM-001 is withdrawn. Canonical v2.4.0 kept the
> whole model contract and dropped the whole method; that reads as a productisation that formalised
> the schema and left the craft behind, not as a deliberate scope cut.

> [!warning] Documented deviation
> `s06` and `s07` are not authored for this work item. The comparison was completed during
> clarification and the deliverable is a recorded decision, not a change. Authoring an option
> analysis and a task plan for a decision already made would be ceremony without evidence value.
> Only `s08` remains, to confirm the decision meets AC-001..003. Recorded here rather than raised as
> an exception because no gate is skipped: Approach and Task Plan are `not_applicable` for a work
> item that produces no change.

## Step Contract
```yaml
step_goal: "Record a checkable verdict for each of the four concepts the canonical skill does not carry, and correct the assumption the work item started from."
input_summary:
  - "~/.claude/backups/architecture-modeling-prototype-2026-08-13.tar.gz - 4 reference files, 20.346 bytes"
  - "skills/architecture/architecture-modeling at commit 7061740"
output_summary: ["Four verdicts with reasoning", "Corrected ASM-001", "DoR verdict"]
done_when: ["Every concept has one of three verdicts with a reason a reader can argue with"]
owner: "ba"
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "skills/architecture/architecture-modeling, commit 7061740, prepare v2.4.0 architecture bundle"
impacted_surfaces: []
compatibility_constraints:
  - "No change is made by this work item. Any fold-in is a separate work item and must wait for plugin-marketplace-distribution to settle the skills/ layout."
rollback_constraints: []
correction_to_earlier_analysis:
  - "An earlier concept-coverage grep reported 0 canonical hits for 'business owner'. That was a false negative: the canonical schema uses 'business_owner'. Canonical does carry the audience."
  - "Canonical model-contract.md opens with the invariant 'one model, many derived views' and defines business_views[].audience: business_owner, engineering_views, domain, tags, and the rule that excluding a fact requires an explicit reason. The contract was never dropped."
```

## Artifact Chính
```yaml
verdicts:
  - concept: "house-conventions"
    verdict: FOLD_IN
    scope: whole
    reason: >-
      Genuinely absent and the most transferable of the four. Canonical render-routing.md answers
      "who renders" - PRESENT/ABSENT/AMBIGUOUS, exactly-one-owner, handoff completeness. It does not
      answer "whose conventions govern". The prototype supplies a filename-pattern table for
      discovering existing house rules, a mapping table printed before drawing that records skill
      default versus house rule versus which is in force and its source, and conflict classification
      by scope.
    product_significance: >-
      Highest of the four. A pack that imposes its own conventions on someone else's repository gets
      rejected; one that detects and defers gets adopted. This matters more once distribution starts.

  - concept: "two-axis-views"
    verdict: FOLD_IN
    scope: partial
    reason: >-
      The conceptual half duplicates model-contract.md and should not be folded in. The tool
      constraints and edge cases cannot be derived from the schema and are absent.
    fold_in_specifically:
      - "Structurizr group accepts one string per element, so the primary axis goes in group (always domain) and the secondary in tags, filtered per view."
      - "Mermaid has no model layer, so both views must be regenerated from the model on every run and neither may be hand-edited."
      - "The same-model checklist - identical element set, identical relationships, labels sourced from business_label versus protocol+sync, zero protocol/database/cloud/framework names in the business view, both views regenerated this run."
      - "Edge case: a system spanning two domains takes the domain that owns its data; the other becomes a tag."
      - "Edge case: a relationship with no business meaning is excluded from the business view entirely, not relabelled with a technical term."
    drop:
      - "The conceptual preamble on why two axes rather than two diagrams - covered by the model-contract invariant."

  - concept: "diagram-quality"
    verdict: FOLD_IN
    scope: narrow
    reason: >-
      Largely duplicates quality-contract.md, which already carries geometry rules, semantic rules,
      the 25-element engineering-view cap, the delete test, the no-unexplained-two-way-arrow rule,
      and the PASS/PARTIAL/FAIL verdict. Two tables are not covered.
    fold_in_specifically:
      - "The notation conventions table: solid arrow sync, dashed async, dotted optional, vendor and external dashed border, legacy dashed border plus visible legacy tag, trust boundary as a labelled box."
      - "The C4 level table: what each level shows, for which audience, and when to render - notably L3 only for complex or high-risk containers and L4 almost never."
    note: "The notation rules are duplicated inside two-axis-views.md. Fold them in once, from here."

  - concept: "interface-catalog"
    verdict: FOLD_IN
    scope: narrow
    reason: >-
      The canonical relationships[] schema already carries 7 of the 8 required fields -
      integration_id, from/to, direction, business_purpose, protocol, interaction SYNC|ASYNC|BATCH,
      contract_owner, error_policy, data_classification. Two fields and one rule are missing.
    fold_in_specifically:
      - "Field: volume. Without numbers capacity cannot be sized."
      - "Field: version plus compatibility window. Determines which consumers break when the contract changes."
      - "Rule: the adapter-pair case. Owner of the sending component, owner of the receiving component, and who may change the contract between them are three different facts; the third must be named explicitly and is not implied by either of the first two."
    drop:
      - "The filled-correctly versus filled-wrongly example column - teaching material, and the canonical skill is not written in that register."

corrected_assumption:
  id: ASM-001
  original: "The v2.4.0 narrowing toward model-as-code and render routing was deliberate; the burden of proof sits on folding content back in."
  status: WITHDRAWN
  correction: >-
    Canonical kept the entire model contract and dropped the entire method. A deliberate scope cut
    would have trimmed both together. This pattern - schema formalised, craft left behind - reads as
    an artefact of productisation. The burden of proof is therefore neutral, not against fold-in.

acceptance_criteria:
  - id: AC-001
    description: "Four verdicts recorded, one per concept, each with a reason stated in terms of who reads the output and what they need."
    measurable: true
    status: MET
  - id: AC-002
    description: "Every BELONGS_ELSEWHERE verdict names one owning skill."
    measurable: true
    status: NOT_APPLICABLE
    note: "No concept received BELONGS_ELSEWHERE. ODC-002 asked whether two-axis belongs in sa; it does not - sa produces architecture drivers, not rendered views."
  - id: AC-003
    description: "The archive is verified readable when the decision is sealed, and any FOLD_IN content is copied into the repository before the archive is relied on further."
    measurable: true
    status: PARTIAL
    note: "Archive verified readable on 2026-09-11 via tar -tzf before extraction. The copy-into-repository half is outstanding and is the follow-on work item's first task."

out_of_scope:
  - "Editing skills/architecture/architecture-modeling - a separate work item"
  - "Any change to the plugin split or distribution work"

done_when:
  - "AC-001 met, AC-002 not applicable with reason, AC-003 partial with a named owner for the remainder"
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "Smallest correct option: no fold-in is proposed beyond what the comparison found absent - PASS"
  - "Approach and Task Plan gates: not_applicable, this work item produces no change - documented above"
  - "TDD: no production behaviour change - N/A with reason"
  - "Worktree: read-only analysis - not required"
blocking_items: []
owner: "ba"
next_action: "Seal Spec and DoR, then s08 to confirm AC-001..003 and open the follow-on fold-in work item"
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners: ["ba"]
notes:
  - "ODC-001 resolved: the non-technical business owner remains a target audience. Canonical declares business_views[].audience: business_owner, so the audience never left; only the method for serving it did."
  - "ODC-002 resolved: two-axis stays in architecture-modeling. sa owns drivers and stakeholder concerns, not rendered views."
  - "ODC-003 resolved: diagram-quality is not covered by quality-contract.md under different wording. quality-contract governs geometry, semantics and verdict; the notation vocabulary and C4 level purpose are absent."
  - "READY is an authoring verdict, not a human gate pass."
```

## Spec Freeze
```yaml
work_item_slug: "architecture-modeling-audience-views"
status: APPROVED_WITH_ASSUMPTIONS
checks:
  spec_card_owner_present: PASS
  requirement_ids_present: PASS
  acceptance_criteria_mapped: PASS
  blocking_questions_resolved: PASS
  role_reviewers_recorded: PASS
accepted_assumptions:
  - "ASM-001 is withdrawn and replaced by the corrected reading recorded in corrected_assumption."
blocking_gaps: []
next_action: "Seal Spec with BA and DoR with BA; both receipts bind to this finalized s04 note."
```

## SDD Traceability
```yaml
requirement_refs:
  - "product-specs/cards/architecture-modeling-audience-views.md#REQ-001 through REQ-003"
acceptance_refs:
  - "AC-001 MET · AC-002 NOT_APPLICABLE · AC-003 PARTIAL"
task_refs: []
test_refs:
  - "Verification is documentary: the four verdicts and their reasons are the evidence."
```

## Traceability
```yaml
upstream: ["architecture-modeling-audience-views.s01.restate.md", "product-specs/cards/architecture-modeling-audience-views.md"]
next_step: "s08 Verify + DoD (Light: s06 and s07 not applicable, see documented deviation)"
```

## Handoff
- Outcome: four `FOLD_IN` verdicts, none excluded. `house-conventions` is the whole-file fold-in and carries the most product value.
- Corrected: ASM-001 withdrawn. The canonical contract was never dropped; only the method was.
- Outstanding: AC-003's second half. Copying the four references into the repository is the follow-on work item's first task, and it must wait for `plugin-marketplace-distribution` to settle the `skills/` layout so the content is not written twice.
- Condition to enter s08: Spec and DoR sealed.
