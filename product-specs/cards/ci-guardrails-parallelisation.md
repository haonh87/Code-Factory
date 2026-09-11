---
artifact_id: "ci-guardrails-parallelisation.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "0.1"
owner: "ba"
reviewers:
  - "devops"
  - "developer"
source_of_truth: true
linked_work_items:
  - "ci-guardrails-parallelisation"
linked_crs: []
---

# Spec Card - CI Guardrails Parallelisation

> Spec Card for `ci-guardrails-parallelisation`, running `sdd_mode=light`.
> Status: **DRAFT at `v0.1`**.
>
> `workflow-guardrails.yml` runs eight jobs in a single `needs:` chain. Six of them are independent
> validators that read the same checked-out tree and produce no artifact the next job consumes, so
> the chain buys nothing and costs a full checkout plus Node setup per job. Worse, the chain stops
> at the first failure, so one run never reports more than one broken validator.
>
> The same file pins `actions/checkout@v4` and `actions/setup-node@v4`, both of which run on
> Node 20. GitHub removes Node 20 from runners on **2026-09-23**. Current majors are `v7`.
> This is a dated break, not a warning to tidy up later.

## Business Goal
```yaml
business_goal: "Make one CI run report every validator failure instead of the first, and keep the pipeline working past the 2026-09-23 Node 20 removal."
in_scope:
  - "Run the six independent validators concurrently"
  - "Upgrade checkout and setup-node to majors that run on Node 24"
  - "Keep release-candidate gated behind every validator"
  - "Reduce the cost of adding a seventh validator to editing one place"
out_scope:
  - "Changing what any validator asserts"
  - "Changing the release-candidate matrix, its four steps, or its fetch-depth"
  - "Caching npm or node_modules - a separate optimisation with its own correctness questions"
  - "Any change to package.json scripts"
```

## Requirements
```yaml
requirements:
  - id: REQ-001
    description: "The six independent validators run concurrently and a single run reports every one that fails. Measured on 2026-09-11: workflow-tooling, workflow-artifacts, workflow-sdd, workflow-changes, workflow-execution and workflow-planning form a linear needs: chain, and none of them uploads or downloads an artifact, so no ordering dependency exists between them."
    provenance: BASELINE
    cr_required: false
  - id: REQ-002
    description: "actions/checkout and actions/setup-node are pinned to majors whose runtime is supported. Both are at v4 on Node 20; GitHub begins defaulting to Node 24 on 2026-06-16 and removes Node 20 on 2026-09-23. Latest majors on 2026-09-11 are checkout v7.0.1 and setup-node v7.0.0. Closes CF-018."
    provenance: BASELINE
    cr_required: false
  - id: REQ-003
    description: "release-candidate still runs only after every validator has passed. It is the expensive job - a two-version matrix over four steps including pack, install and artifact smoke - and running it against a tree that fails basic validation wastes the run."
    provenance: BASELINE
    cr_required: false
  - id: REQ-004
    description: "Adding or removing a validator is a one-place edit. The current file repeats an identical checkout and setup-node block eight times, so any change to the runner contract must be applied eight times and can drift between jobs."
    provenance: BASELINE
    cr_required: false
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "A hosted run in which two validators are deliberately broken reports both as failed in the same run. Verified by observing the run summary, not by reading the YAML."
  - id: AC-002
    requirement: REQ-001
    description: "Wall-clock for a green run is lower than the pre-change baseline. The baseline is recorded from the last green run before the change; the target is a reduction, with the actual figure recorded rather than predicted."
  - id: AC-003
    requirement: REQ-002
    description: "One hosted green run completes with zero Node deprecation annotations. Checked in the run's annotation list, which is where the current warnings appear."
  - id: AC-004
    requirement: REQ-003
    description: "release-candidate does not start while any validator is still running or has failed. Verified from the run graph."
  - id: AC-005
    requirement: REQ-004
    description: "The checkout and setup-node contract appears once. Adding a seventh validator is a single list entry with no copied job block."
  - id: AC-006
    requirement: REQ-001
    description: "Every validator that ran before the change still runs after it, with the same command and the same arguments. Verified by comparing the command list before and after, so parallelisation cannot silently drop a check."
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - id: ASM-001
    assumption: "The six validators are genuinely independent. Evidence: none reads another's output, none uploads an artifact, and each was run standalone against the working tree on 2026-09-11 with a PASS result."
    owner: "devops"
  - id: ASM-002
    assumption: "Job-name changes are acceptable. Parallelising through a matrix renames jobs in the checks list, which affects any branch protection rule that names a required check."
    owner: "devops"
open_decisions:
  - id: ODC-001
    description: "Does a branch protection rule currently require any of the eight job names? If so, the rule must be updated in the same change or the renamed checks will read as missing."
    owner: "devops"
  - id: ODC-002
    description: "Should workflow-authoring-smoke join the parallel group or stay gated behind the validators? It is independent, but keeping it gated avoids spending a scaffold-and-validate cycle on a tree that already fails validation."
    owner: "devops"
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
