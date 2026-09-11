---
artifact_id: "architecture-modeling-audience-views.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
source_of_truth: true
linked_work_items:
  - "architecture-modeling-audience-views"
linked_crs: []
---

# Spec Card - Architecture Modeling Audience Views

> Spec Card for `architecture-modeling-audience-views`, running `sdd_mode=light`.
> Status: **DRAFT at `v0.1`**.
>
> On 2026-09-11 a prototype of `architecture-modeling` dated 2026-08-13 was found living untracked
> in `.claude/skills/`, shadowing the canonical bundle skill of the same name. Project-scope skills
> take precedence, so work done inside Code-Factory itself was running the prototype rather than
> the released skill, and `audit-workflow-pack.js` could not see it because it only scans `skills/**`.
>
> The prototype was archived to `~/.claude/backups/architecture-modeling-prototype-2026-08-13.tar.gz`
> and removed. Concept comparison showed the canonical v2.4.0 skill does not carry four ideas the
> prototype had: two-axis views, a domain-grouped landscape for non-technical business owners, an
> interface catalog, and a diagram-quality reference.
>
> This work item decides whether that was deliberate pruning or accidental loss. It changes no skill.

## Business Goal
```yaml
business_goal: "Stop a possible capability loss from becoming permanent by default. Either fold the audience-modelling layer back into the canonical skill, or write down why it does not belong, so the question is settled rather than rediscovered."
in_scope:
  - "Read the four archived reference files and judge whether their content is still wanted"
  - "Record a decision with reasoning a future reader can check"
  - "If the decision is fold-in, name the specific parts and open a separate implementation work item"
out_scope:
  - "Editing skills/architecture/architecture-modeling"
  - "Re-deciding which copy is canonical - settled on 2026-09-11 in favour of the bundle copy"
  - "Any change to the plugin split or the distribution work item"
  - "Improving architecture-modeling in any way not traceable to the archived content"
```

## Requirements
```yaml
requirements:
  - id: REQ-001
    description: "A recorded decision exists for each of the four concepts the canonical skill does not carry - two-axis views, domain-grouped landscape for non-technical business owners, interface catalog, diagram-quality guidance. Each gets one of three verdicts: FOLD_IN, BELONGS_ELSEWHERE, or DELIBERATELY_EXCLUDED, with a reason. Measured on 2026-09-11: grep across the canonical skill returns 0 files for two-axis, domain-grouped, business owner and diagram quality, while the archive returns 2, 1, 4 and 1 respectively. house conventions and audience are covered in both, so they are out of scope."
    provenance: BASELINE
    cr_required: false
  - id: REQ-002
    description: "Where a concept is judged BELONGS_ELSEWHERE, the owning skill is named. The leading candidate is sa, which already owns stakeholder concerns and audience, so a concept placed there does not need to live in architecture-modeling as well."
    provenance: BASELINE
    cr_required: false
  - id: REQ-003
    description: "The archive stays retrievable for as long as the decision is open. It exists only as a single tar file outside git history; if it is lost, the decision becomes unanswerable and the work item must close as UNRESOLVED rather than silently lapse."
    provenance: BASELINE
    cr_required: false
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "Four verdicts are recorded, one per concept, each with a reason stated in terms of who reads the output and what they need - not in terms of preference. A reader who disagrees can point at the reason and argue with it."
  - id: AC-002
    requirement: REQ-002
    description: "Every BELONGS_ELSEWHERE verdict names exactly one owning skill, and a check confirms that skill actually covers the concept today, or a follow-up item is opened against it."
  - id: AC-003
    requirement: REQ-003
    description: "The archive path is verified readable at the time the decision is sealed, and the verification is recorded. If any FOLD_IN verdict is reached, the affected reference files are copied into the repository before the archive is relied on any further."
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - id: ASM-001
    assumption: "The v2.4.0 narrowing toward model-as-code and render routing was deliberate. The canonical copy is four days newer than the prototype and was committed as 7061740 'prepare v2.4.0 architecture bundle', adding render scripts and a quality contract while dropping the audience layer - which reads as focus, not oversight. The burden of proof therefore sits on folding content back in."
    owner: "ba"
open_decisions:
  - id: ODC-001
    description: "Is the non-technical business owner still a target audience for architecture-modeling, or did that reader move to a presentation-deck skill? The canonical description still promises business views, so if the audience moved, that promise needs rewording too."
    owner: "po"
  - id: ODC-002
    description: "Does the two-axis method belong in architecture-modeling or in sa? sa already owns stakeholder concerns; placing it there avoids two skills teaching audience segmentation differently."
    owner: "ba"
  - id: ODC-003
    description: "Is diagram-quality guidance already covered by quality-contract.md in the canonical skill under different wording? If yes, the concept is not missing, only renamed, and no action follows."
    owner: "developer"
```

## Spec Freeze
```yaml
status: draft
authority: "ba"
decided_at: ""
frozen_by_person: ""
freeze_requested_at: "2026-09-11"
spec_version_requested: "0.1"
```
