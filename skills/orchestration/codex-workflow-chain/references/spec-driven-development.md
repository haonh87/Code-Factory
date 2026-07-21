---
language: en
---

# Spec Driven Development Reference

> Vietnamese: spec-driven-development.vi.md

This document describes the `SDD` layer for the eight-step workflow. The goal is to make `BRD/SRS` actually drive design, tasking, implementation, verification, and rollout.

## Principles

- The workflow keeps eight steps; SDD is an artifact, gate, and traceability constraint layer.
- `BRD` and `SRS` are the source of truth for business and requirements when a work item needs a formal spec.
- `product-specs/` is the default root for materializing real `BRD/SRS` in the repo.
- NotebookLM is only a corpus storage and document-retrieval layer during execution; conclusions from NotebookLM must be normalized into `BRD`, `SRS`, or the workflow note before being used as a decision.
- Technical approach, tasks, implementation, and test evidence must trace back to a requirement ID when a work item runs under SDD.
- After the spec is `frozen`, any behavioral deviation must go through a `spec-change`; code must not become the source of truth in place of the spec.

## SDD Artifact Stack

| Layer | Artifact | Main owner | Purpose |
|---|---|---|---|
| Business | `BRD` | `po`, `ba` support | Pin problem, goal, KPI, scope, out-of-scope, business rules, and decision log. |
| Requirement | `SRS` | `ba`, delivery-role review | Pin functional requirements, NFRs, UX/system behavior, acceptance criteria, and constraints. |
| Acceptance | `AC` | `ba`, `qc` | Turn requirements into measurable criteria. |
| Technical | `technical-approach-spec` | `developer`, `designer/devops` support | Choose the technical direction based on the frozen spec. |
| Planning | `task-breakdown-spec` | `developer`, `qc/devops` support | Build a task plan that traces to requirement/AC. |
| Implementation | code/config/doc changes | `developer`, `devops` support | Implement per the frozen spec or an approved spec change. |
| Verification | `spec-coverage-report` | `qc` | Prove which requirements pass, fail, are partial, or untested. |
| Rollout | release/business acceptance | `qc`, `devops`, `po` | Close `dod`, `release`, and `business_acceptance`. |

## Product Spec Root

The default root for real product specs in the repo:

```text
product-specs/
  brd/
  srs/
  templates/
```

Existing validator command:

```bash
wfc sdd --workflow-root work-items --project-root .
```

## Spec Card (`sdd_mode=light`)

For a work item eligible for `SDD Light` (see `policies/codex/AGENTS.global.md § Hard Rule: SDD Light Profile`), one **Spec Card** replaces the separate `BRD` + `SRS` pair. Light uses `spec_refs.card`; `strict` continues to use `spec_refs.brd` and `spec_refs.srs`. Do not maintain a duplicate trace matrix across both when only one applies.

Root for a Spec Card:

```text
product-specs/
  cards/
    <scope>.md
  templates/
    spec-card.template.md
```

A Spec Card is a single note with five blocks (see `product-specs/templates/spec-card.template.md`):

- `Business Goal` — business goal, `in_scope`, `out_scope`.
- `Requirements` — `REQ-###` entries, each with a `provenance` of `BASELINE` (already in the current spec) or `CR-###` (a delta introduced by an approved Change Request). `cr_required=true` forces `provenance` to be a `CR-###`.
- `Acceptance Criteria` — `AC-###` entries, each mapping to an existing `REQ-###`; every requirement must have at least one AC (no-duplicate-trace / full mapping).
- `Assumptions And Open Decisions` — each entry has an owner.
- `Spec Freeze` — `status`, `authority` (the role with freeze authority per the governance role model), `decided_at`; a `frozen` status without a recorded `authority` fails validation.

For a Light work item, the semantic validator (`wfc sdd`) checks:
- every `REQ-###` has a valid `provenance`
- every `AC-###` maps to a requirement that exists
- no duplicate `REQ`/`AC` ids
- `frozen` requires both `authority` and `decided_at`
- a requirement with `cr_required=true` has a `CR-###` provenance

A missing origin, AC mapping, freeze authority, or required CR link fails the check — the same rigor as `BRD/SRS`, in one artifact.

## Spec Lifecycle

Standard states:

```text
draft -> reviewed -> approved -> frozen -> implemented -> verified -> accepted
```

Exception states:

```text
change_requested
deprecated
blocked
```

Rules:

- `draft`: still being written; not yet a source of truth for implementation.
- `reviewed`: a role reviewer has read it; it may still be edited.
- `approved`: the business/requirement owner has agreed on the content.
- `frozen`: stable enough that steps 5, 6, and 7 can follow it; any later change must go through a `spec-change`.
- `implemented`: code/config/doc changes exist that follow the spec.
- `verified`: QC has evidence per spec coverage.
- `accepted`: the PO or business owner has closed `business_acceptance` when the scope requires it.

## ID Vocabulary

| Prefix | Meaning | Owner |
|---|---|---|
| `BRD-###` | business goal, rule, scope decision | `po`, `ba` |
| `SRS-FR-###` | functional requirement | `ba` |
| `SRS-NFR-###` | non-functional requirement | `ba`, `developer`, `devops`, `qc` review |
| `SRS-UX-###` | UX/system behavior requirement | `ba`, `designer` |
| `AC-###` | acceptance criterion | `ba`, `qc` |
| `TASK-###` | implementation/verification/release task | `developer`, `qc`, `devops` |
| `TEST-###` | test scenario or verification evidence | `qc` |
| `CHANGE-###` | spec change request | the role that finds the gap; `po/ba` approves depending on scope |
| `REQ-###` | requirement in a Spec Card (`sdd_mode=light`), each with a `BASELINE`/`CR-###` provenance | `ba` |
| `ASM-###` | Spec Card assumption | owner named on the entry |
| `ODC-###` | Spec Card open decision | owner named on the entry |
| `CR-###` | canonical Change Request id (Spec Card / compact-CR vocabulary; `CHANGE-###`/`change_*` are dual-read legacy aliases during the migration window) | `po/ba` approves depending on scope |

You do not need to force IDs on every small note line. But if a work item is marked SDD, every important requirement must have an ID and at minimum trace to an AC or an accepted assumption.

## Step Mapping

| Step | SDD responsibility | Additional gate |
|---|---|---|
| `s01` Clarify | Create a `BRD` draft or business context section; record source evidence from NotebookLM/project docs if used. | A clear `BRD-*` or context decision if the work item needs a BRD. |
| `s02` Business Goal | Pin goal, KPI, scope, out-of-scope, and business rules in `BRD`. | `BRD` reaches at least `reviewed` or has accepted assumptions. |
| `s03` Open Questions | Find gaps, conflicts, and missing input; use NotebookLM/project search as evidence; update the `BRD/SRS` decision log. | No remaining blocker without an owner or resolution path. |
| `s04` Acceptance + DoR | Create/update `SRS`, assign requirement IDs, map ACs, run spec review and the `spec-freeze-gate` when ready. | `SRS` reaches `approved|frozen`; ACs map to requirement IDs; DoR `READY` or has accepted assumptions. |
| `s05` Technical Approach | The technical approach must reference the relevant `SRS-*` and `AC-*`. | No approach selection if a key requirement has no ID or a spec gap is unresolved. |
| `s06` Task Plan | Tasks must map to `SRS-*` and `AC-*`; test/release tasks must also trace. | Every in-scope requirement has a task or a clearly deferred decision. |
| `s07` Implement | Implement per the frozen spec; if behavior deviates, create a `spec-change`. | No merge/handoff if code deviates from spec without an approved change or a documented exception. |

For `sdd_mode=light`, the `s04`/`s05`/`s06` rows above apply to the Spec Card instead of `BRD`/`SRS`: `s04` creates/freezes the Spec Card (`REQ`/`AC` mapping, freeze authority); `s05`'s approach-must-reference-requirements rule applies to the Approach content hosted inside `s06` (there is no separate `s05` note for Light); `s06` still maps tasks to `REQ-*`/`AC-*`.
| `s08` Verify + DoD | Create a `spec-coverage-report`; close DoD/release/business acceptance based on `BRD/SRS`. | Requirement coverage clearly `PASS|FAIL|PARTIAL|UNTESTED`; remaining gaps have an owner/next action. |

## Spec Freeze Gate

The `spec-freeze-gate` is a gate at the end of step 4, or before step 5 goes deep into design.

Minimum conditions:

- `BRD` has an owner and a clear business scope.
- `SRS` has an owner and a primary reviewer.
- Key requirements have IDs.
- Acceptance criteria map to requirement IDs.
- Blocking open questions are resolved, deferred, or accepted as assumptions.
- The role signoff for `dor` has an owner.
- If the scope has UX, runtime, data, or release risk, the corresponding reviewers are recorded.

## Spec Change Protocol

Triggered when step 5, 6, 7, or 8 finds the spec missing, wrong, or unsafe to implement/verify.

Standard flow:

```text
detect spec gap
-> create CHANGE-###
-> classify impact: business|requirement|ux|technical|test|release
-> propose change
-> PO/BA and affected role review
-> update BRD/SRS/AC/task/test trace
-> continue or block
```

You must not silently edit code to match a new understanding if the `SRS` still says otherwise.

## Traceability Matrix

At minimum, you should be able to trace the chain:

```text
BRD-###
-> SRS-FR-### | SRS-NFR-### | SRS-UX-###
-> AC-###
-> TASK-###
-> TEST-###
-> PASS|FAIL|PARTIAL|UNTESTED
```

If a small work item does not create its own `BRD/SRS`, the workflow note should still keep an equivalent trace in a `## Traceability` block.

## Suggested Schemas

### `spec-metadata`

```yaml
spec_id: ""
spec_type: BRD|SRS|AC|TECHNICAL|TASK|TEST|CHANGE|COVERAGE
spec_status: draft|reviewed|approved|frozen|change_requested|implemented|verified|accepted|deprecated|blocked
spec_version: "0.1"
owner: ""
reviewers: []
source_refs: []
linked_workflow_steps: []
change_log: []
```

### `brd-spec`

```yaml
business_context: ""
stakeholders: []
problem_statement: ""
business_goals:
  - id: BRD-001
    description: ""
    kpi_refs: []
scope:
  in: []
  out: []
business_rules:
  - id: BRD-002
    rule: ""
assumptions: []
decision_log: []
acceptance_notes: []
```

### `srs-spec`

```yaml
functional_requirements:
  - id: SRS-FR-001
    description: ""
    source_refs: []
    acceptance_refs: []
non_functional_requirements:
  - id: SRS-NFR-001
    category: performance|security|reliability|compatibility|compliance|observability|other
    description: ""
    acceptance_refs: []
ux_system_behavior:
  - id: SRS-UX-001
    description: ""
    acceptance_refs: []
constraints: []
dependencies: []
open_questions: []
```

### `spec-freeze-gate`

```yaml
work_item_slug: ""
status: FROZEN|APPROVED_WITH_ASSUMPTIONS|BLOCKED
checks:
  brd_owner_present: PASS|FAIL
  srs_owner_present: PASS|FAIL
  requirement_ids_present: PASS|FAIL
  acceptance_criteria_mapped: PASS|FAIL
  blocking_questions_resolved: PASS|FAIL
  role_reviewers_recorded: PASS|FAIL
accepted_assumptions: []
blocking_gaps: []
next_action: ""
```

### `spec-change`

```yaml
change_id: CHANGE-001
detected_in_step: s05|s06|s07|s08
impact_area: business|requirement|ux|technical|test|release
current_spec_refs: []
problem: ""
proposed_change: ""
decision: APPROVED|REJECTED|DEFERRED|BLOCKED
decision_owner: ""
updated_artifacts: []
required_followups: []
```

### `spec-coverage-report`

```yaml
coverage_items:
  - requirement_id: SRS-FR-001
    acceptance_refs: [AC-001]
    task_refs: [TASK-001]
    test_refs: [TEST-001]
    status: PASS|FAIL|PARTIAL|UNTESTED
    evidence: ""
    gaps: []
overall_status: PASS|FAIL|PARTIAL|BLOCKED
untested_requirements: []
residual_risks: []
business_acceptance_readiness: READY|READY_WITH_GUARDS|BLOCKED
release_readiness: READY|READY_WITH_GUARDS|BLOCKED|NOT_APPLICABLE
```