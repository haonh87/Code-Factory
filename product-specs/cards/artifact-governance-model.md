---
artifact_id: "artifact-governance-model.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
source_of_truth: true
linked_work_items:
  - "artifact-governance-model"
linked_crs: []
---

# Spec Card - Artifact Governance Model

> Spec Card for work item `artifact-governance-model` running `sdd_mode=light`.
> Status: **APPROVED at `v0.1`**, not frozen. The `spec` gate holds a trusted receipt sealed by
> the repository owner on 2026-08-16 with `digest_match=true`. Freeze is a separate act and has
> not been performed, so requirement text may still change through normal revision rather than
> through `spec-change`.
>
> Scope is deliberately narrowed to P1: author the governance skill and its rule set.
> The runtime changes (Role Outputs block, generator, validator checks, migration) are
> P2 to P4 and belong to a separate work item. See `out_scope`.
>
> Precedent worth naming: `product-specs/cards/architecture-role-skills.md` REQ-002 already
> applies block ownership to the `sa` and `ta` skills - every block in the output schema has
> exactly one owner. This work item does not invent that mechanism, it generalises the one the
> repository already arrived at, from two skills to every contributor in the chain.

## Business Goal
```yaml
business_goal: "Make the volume of documentation a work item produces independent of how many roles and skills contribute to it, so that adding a role adds a perspective and not a file, and no fact is written in two places where the copies can diverge."
in_scope:
  - "Author the artifact-governance skill under skills/guardrails/"
  - "The shard-axis rule: a contributor's output is a section, a separate file needs a declared reason"
  - "The field-ownership table: every field wanted by two or more contributing schemas gets one owning block"
  - "The reference syntax a schema uses to point at an owning block instead of restating it"
  - "The placement contract: one declared home per content layer, and supersede versus accumulate"
  - "The decision procedure an agent runs before writing any artifact"
  - "A worked example applying the rules by hand to one existing multi-role work item, with a measured before and after file count"
out_scope:
  - "P2: making ## Role Outputs a required block, changing workflow-execution-definitions.js, migrating the readers in validate-workflow-execution.js"
  - "P3: adding duplication and layout checks to wfc validate"
  - "P4: migrating docs/, archiving changes/ deltas into product-specs/, cleaning the repository root"
  - "Registering the new skill into the bundle inventory, which must wait for stabilize-architecture-skill-bundle to close DoD"
  - "Changing obsidian-markdown, which formats content and does not decide what content exists"
  - "Changing the analytical content of any role skill; only the shape of their output is addressed"
  - "Reducing governance evidence, receipts or gate coverage"
```

## Requirements
```yaml
requirements:
  - id: REQ-001
    description: "The skill states the shard-axis rule: work is sharded by unit of work, never by contributor. A role's contribution to a step is a section inside that step's primary note. Evidence cited: BMAD-METHOD runs nine roles and produces zero per-role files; Kiro, Spec Kit and OpenSpec each fix a canonical set of three to four files per feature independent of contributors."
    provenance: BASELINE
    cr_required: false
  - id: REQ-002
    description: "The skill defines the threshold at which a contribution earns its own file, as a rule rather than an authoring-time judgement. When the threshold is met, the filename must come from the registered naming convention and the primary note must link to it. When it is not met, the content goes into the primary note."
    provenance: BASELINE
    cr_required: false
  - id: REQ-003
    description: "The skill carries a field-ownership table. For every field that two or more contributing schemas in the same step want to express, the table names exactly one owning block. The table covers at minimum the fields measured as duplicated in the census: paths, task identifiers, acceptance identifiers, verification method, and gate reviewer."
    provenance: BASELINE
    cr_required: false
  - id: REQ-004
    description: "The skill defines a reference syntax by which a non-owning schema points at an owning block instead of restating its content. The syntax must be readable by a human without opening another file when the target is in the same note, and must be shaped so a later validator can resolve it mechanically."
    provenance: BASELINE
    cr_required: false
  - id: REQ-005
    description: "The skill defines the placement contract: for each content layer - spec, design, plan, progress, verify, decision - exactly one declared root, plus the rule for whether a recurring artifact supersedes its predecessor or accumulates a dated version."
    provenance: BASELINE
    cr_required: false
  - id: REQ-006
    description: "The skill states a decision procedure an agent runs before writing any artifact, which takes a piece of content and returns either the owning section to write into, or a registered filename, and never an invented path."
    provenance: BASELINE
    cr_required: false
  - id: REQ-007
    description: "The skill declares its own boundary: it does not format content, which belongs to obsidian-markdown; it does not choose filenames, which belongs to wfc scaffold; and it does not enforce, which belongs to wfc validate in a later phase. Stating the boundary prevents this skill from becoming the next source of overlap."
    provenance: BASELINE
    cr_required: false
  - id: REQ-008
    description: "The skill is validated by a worked example: the rules are applied by hand to work-items/sample-execution-item, the multi-role work item measured at twelve files, and the example reports the resulting file count together with which content moved where."
    provenance: BASELINE
    cr_required: false
  - id: REQ-009
    description: "P1 changes no runtime behaviour. No file under packages/workflow-bundle is modified, no generator output changes, and the skill is not added to the bundle inventory while stabilize-architecture-skill-bundle holds an inventory assertion in flight."
    provenance: BASELINE
    cr_required: false
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "The skill contains a rule stating that a contributor's output is a section, not a file, and cites at least one external precedent with its role count and per-role file count."
  - id: AC-002
    requirement: REQ-002
    description: "The skill states a threshold test with a determinate answer. Applying it to the four existing runtime artifact kinds - execution-policy, worker-assignment, worker-handoff-report, merge-report - yields a section-or-file verdict for each, with the reason recorded."
  - id: AC-003
    requirement: REQ-003
    description: "The ownership table names one owning block for each of paths, task identifiers, acceptance identifiers, verification method and gate reviewer. Applying the table to the measured 259-line s06 Main Artifact of stabilize-architecture-skill-bundle identifies every one of the five duplications recorded as F9, and no field in the table has two owners."
  - id: AC-004
    requirement: REQ-004
    description: "The reference syntax is defined with at least one worked instance rewriting a real duplicated field from F9, and the definition states how a resolver would locate the target."
  - id: AC-005
    requirement: REQ-005
    description: "Each of the six content layers has exactly one declared root. Applying the contract to the census findings gives a verdict for the docs/release versus docs/releases collision, for the four accumulated skill-pack audit reports, and for the six loose repository-root files."
  - id: AC-006
    requirement: REQ-006
    description: "The decision procedure is written as an ordered set of steps whose every terminal branch returns either an owning section or a registered filename. No branch returns an unregistered path."
  - id: AC-007
    requirement: REQ-007
    description: "The skill contains an explicit non-ownership statement naming obsidian-markdown, wfc scaffold and wfc validate, and what each owns instead."
  - id: AC-008
    requirement: REQ-008
    description: "The worked example on sample-execution-item reports a before count, an after count, and a per-file destination for all twelve current files. The after count is lower than twelve and does not increase when the example adds a hypothetical seventh role."
  - id: AC-009
    requirement: REQ-009
    description: "git status shows no modification under packages/workflow-bundle. npm test passes unchanged, and the managed-skill inventory reported by wfc status is unchanged from its pre-change value."
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - id: ASM-001
    description: "A8, confirmed with the user in session on 2026-08-16: a role's contribution is a section in the primary note by default, with a separate file only above a declared threshold. External evidence supports it - BMAD runs nine roles with no per-role file."
    owner: "ba"
  - id: ASM-002
    description: "A6, confirmed with the user in session on 2026-08-16: the fix is a management layer over documentation, not a change to how many skills or roles contribute."
    owner: "ba"
  - id: ASM-003
    description: "The repository already accepts block ownership as a mechanism, per architecture-role-skills REQ-002 applying it to sa and ta. Generalising it is therefore an extension of an accepted pattern, not a new concept requiring separate justification."
    owner: "ba"
  - id: ASM-004
    description: "The intra-note reference target is preferred over a cross-file wikilink, because the measured duplication in F9 is inside one note and an intra-note reference keeps the note readable without opening another file."
    owner: "developer"
open_decisions:
  - id: ODC-001
    description: "Does the placement contract bind only Code-Factory, or also the repository of a project that adopts the bundle? This changes whether P3 ships a check that runs on adopter repositories."
    owner: "po"
  - id: ODC-002
    description: "Supersede policy for recurring reports: overwrite in place, or retain dated versions under a declared archive path?"
    owner: "po"
  - id: ODC-003
    description: "Is docs/ public documentation for adopters, internal working notes, or both? The current mix of quickstart guides and audit reports suggests both, and the taxonomy in P4 depends on the answer."
    owner: "po"
  - id: ODC-004
    description: "Whether real multi-agent runs need per-role files because separate agents write concurrently and would conflict inside one note. ASM-001 assumes not; the P1 worked example must test this rather than assume it away, and a positive finding reopens REQ-002."
    owner: "developer"
```

## Spec Freeze
```yaml
# authority names the role that holds freeze authority per governance-role-model.md.
# Declaring it does not freeze anything. The freeze itself is status: FROZEN plus
# decided_at plus frozen_by_person, and none of those is set.
status: draft
authority: "ba"
decided_at: ""
frozen_by_person: ""
freeze_requested_at: "2026-08-16"
spec_version_requested: "0.1"
```
