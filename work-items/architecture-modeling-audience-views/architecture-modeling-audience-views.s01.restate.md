---
artifact_id: "architecture-modeling-audience-views.s01.restate"
artifact_family: workflow-step
work_item_slug: "architecture-modeling-audience-views"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: RESEARCH
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: light
spec_refs:
  card: "product-specs/cards/architecture-modeling-audience-views.md"
spec_status: draft
planning_track: quick
execution_mode: agentic
execution_roles:
  - "ba"
  - "developer"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["ba"]
  contract: []
  dor: ["ba"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
  dod: ["qc"]
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
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "requirement-analysis"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts:
  - "../../skills/architecture/architecture-modeling/SKILL.md"
tags:
  - "agent-ops"
  - "workflow/s01"
---

# Step 1 - Clarify

> [!summary]
> A prototype of `architecture-modeling` dated 2026-08-13 lived untracked in `.claude/skills/` and
> shadowed the canonical bundle skill of the same name. The prototype was archived and removed on
> 2026-09-11. It carried an audience-modelling layer that the canonical v2.4.0 bundle does not:
> two-axis views, a domain-grouped landscape aimed at non-technical business owners, and a
> diagram-quality reference. This RESEARCH item decides whether that layer should be folded back
> into the canonical skill, or recorded as deliberately out of scope. It does not implement
> anything.

> [!note] SDD Light
> This work item runs `sdd_mode: light`. `s01` hosts Clarify, Business Goal and Open Questions.
> `s04` hosts Acceptance, DoR and the Spec Card. `s06` hosts option analysis, approach and task
> plan; there is no separate `s05` note. `Foundation Decision` is not applicable.

## Step Contract
```yaml
step_goal: >-
  Decide whether the archived audience-modelling layer belongs in the canonical
  architecture-modeling skill, and record the reasoning either way.
input_summary:
  - "Archive ~/.claude/backups/architecture-modeling-prototype-2026-08-13.tar.gz"
  - "Canonical skills/architecture/architecture-modeling at commit 7061740"
  - "Concept coverage comparison run on 2026-09-11"
output_summary:
  - "A recorded decision: fold in, fold in partially, or deliberately exclude"
  - "If fold in, the specific parts and their rationale"
done_when:
  - "The decision is written down with a reason a future reader can check"
  - "No skill content is modified by this work item"
owner: "ba"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles:
  - "Hard Rule: Prefer The Smallest Solution That Is Correct"
  - "Hard Rule: SDD Light Profile"
required_reviews:
  - "Spec + DoR at s04"
  - "Approach + Task Plan at s06"
prohibited_actions:
  - "Do not modify skills/architecture/architecture-modeling in this work item"
open_governance_questions: []
```

## Artifact Chính
```yaml
raw_request: >-
  After removing the duplicate architecture-modeling prototype, decide separately whether the
  concepts it carried and the canonical skill lacks should be brought back.
restated_request: >-
  Compare the archived 2026-08-13 prototype against the canonical v2.4.0 skill, and decide whether
  the audience-modelling layer was pruned deliberately or lost by accident. Produce a recorded
  decision, not a code change.
request_type: RESEARCH
user_problem_initial: >-
  The canonical skill can derive business and engineering views but no longer states the method for
  choosing what each audience sees. A reader following the canonical skill may produce one diagram
  and hand it to both audiences.
business_context_initial: >-
  Architecture output aimed at business owners is one of the reasons the skill exists. If the
  method for producing it was dropped silently during productisation, the skill is thinner than
  intended. If it was dropped on purpose, that reason should be written down so the question does
  not reopen.
scope_draft:
  in:
    - "Read the four archived reference files and judge whether their content is still wanted"
    - "Record a decision with reasoning"
    - "If fold in: name the specific parts and open a follow-up implementation item"
  out:
    - "Editing the canonical skill"
    - "Any change to the plugin split or distribution work"
    - "Re-deciding which copy is canonical - already settled on 2026-09-11"
constraints_initial:
  - "C1: the prototype exists only as a tar archive; it is not in git history"
  - "C2: no change may land in skills/** while the plugin-marketplace-distribution work item is in flight, to avoid restructuring collisions"
assumptions_initial:
  - "A1: the v2.4.0 narrowing toward model-as-code and render routing was deliberate; the burden of proof is on folding content back in, not on leaving it out"
open_questions_initial:
  - "OQ-01: is the non-technical business owner still a target audience for this skill, or did that role move to a presentation-deck skill?"
  - "OQ-02: does the two-axis method belong in architecture-modeling, or in sa where audience and stakeholder concerns already live?"
  - "OQ-03: is diagram-quality guidance already covered by quality-contract.md in canonical under different wording?"
dependencies_initial:
  - "D1: none blocking; this item can run at any time"
risks_initial:
  - "R1: folding content back in reverses a deliberate scope narrowing and re-widens a skill that was trimmed on purpose"
  - "R2: the archive is a single tar file outside git; losing it makes this decision unanswerable"
notes_for_step_2: >-
  Business goal is narrow: prevent a silent capability loss from becoming permanent by accident.
  Non-goal: improving the architecture-modeling skill in general.
```

## Traceability
```yaml
source_inputs:
  - "Independent review R-01, 2026-09-11"
  - "~/.claude/backups/architecture-modeling-prototype-2026-08-13.tar.gz"
  - "commit 7061740 feat(workflow-bundle): prepare v2.4.0 architecture bundle"
next_step: "s04 Acceptance + DoR (Light: no separate s02, s03, s05)"
```

## Handoff
- Settled: the canonical copy is `skills/architecture/architecture-modeling`; the duplicate is removed and archived.
- Still open: OQ-01 to OQ-03, all three are product judgement calls rather than technical questions.
- Condition to enter s04: read the four archived reference files. Nothing else blocks.
