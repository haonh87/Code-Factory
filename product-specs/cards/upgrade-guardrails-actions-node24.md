---
artifact_id: "upgrade-guardrails-actions-node24.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "0.1"
owner: "developer"
reviewers:
  - "qc"
source_of_truth: true
linked_work_items:
  - "upgrade-guardrails-actions-node24"
linked_crs: []
source_refs:
  - "https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/"
  - "https://github.com/actions/checkout/blob/main/CHANGELOG.md"
  - "https://github.com/actions/setup-node/releases"
---

# Spec Card - Upgrade Guardrails Actions Node24

> [!summary]
> SDD Light specification for a version-only GitHub Actions maintenance delta. It protects the
> existing guardrails and release-candidate topology from the Node 20 runner cutoff while keeping
> `ci-guardrails-parallelisation` fully outside this work item. Developer approved Spec, Approach,
> and Task Plan, while QC approved DoR at `2026-09-11T08:32:50Z`; trusted ready-bundle receipts
> remain separate and implementation is not yet authorized.

## Business Goal
```yaml
business_goal: "Keep Workflow Guardrails and its release-candidate evidence operational on GitHub-hosted runners after Node 20 is removed."
in_scope:
  - "Change all 9 actions/checkout@v4 references to actions/checkout@v7."
  - "Change all 9 actions/setup-node@v4 references to actions/setup-node@v7."
  - "Cover every existing job, including release-candidate-build."
  - "Preserve release-candidate-build fetch-depth: 0."
  - "Prove one hosted run is green with zero Node deprecation annotations."
out_scope:
  - "Validator parallelisation, matrix conversion, or fail-fast changes."
  - "Changes to job topology, needs edges, triggers, permissions, Node versions, cache, registry, submodules, or credential persistence."
  - "Application runtime upgrades, package publication, release tagging, or deployment changes."
```

## Requirements
```yaml
requirements:
  - id: "CI-N24-REQ-001"
    description: "Every checkout step in workflow-guardrails.yml uses the Node 24-backed v7 major."
    provenance: "BASELINE"
    provenance_note: "Transferred deadline-bound owner request"
    cr_required: false
  - id: "CI-N24-REQ-002"
    description: "Every setup-node step in workflow-guardrails.yml uses the Node 24-backed v7 major."
    provenance: "BASELINE"
    provenance_note: "Transferred deadline-bound owner request"
    cr_required: false
  - id: "CI-N24-REQ-003"
    description: "The action upgrade changes no workflow behavior other than the two action-major selections; release-candidate-build retains full-history checkout."
    provenance: "BASELINE"
    provenance_note: "Owner scope boundary"
    cr_required: false
  - id: "CI-N24-REQ-004"
    description: "A hosted Workflow Guardrails run for the changed source completes successfully with zero Node deprecation annotations."
    provenance: "BASELINE"
    provenance_note: "Owner verification requirement"
    cr_required: false
  - id: "CI-N24-REQ-005"
    description: "The separate ci-guardrails-parallelisation scope remains deferred and untouched."
    provenance: "BASELINE"
    provenance_note: "Scope-transfer decision"
    cr_required: false
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: "CI-N24-AC-01"
    requirement: "CI-N24-REQ-001"
    description: "The workflow contains exactly 9 actions/checkout@v7 references and zero actions/checkout@v4 references, covering the same 9 jobs as the baseline."
  - id: "CI-N24-AC-02"
    requirement: "CI-N24-REQ-002"
    description: "The workflow contains exactly 9 actions/setup-node@v7 references and zero actions/setup-node@v4 references, covering the same 9 jobs as the baseline."
  - id: "CI-N24-AC-03"
    requirement: "CI-N24-REQ-003"
    description: "The source diff contains only the 18 action-version token replacements; release-candidate-build still has fetch-depth: 0 and every trigger, job, needs edge, runner, Node version, cache/submodule/credential input, and command is unchanged."
  - id: "CI-N24-AC-04"
    requirement: "CI-N24-REQ-004"
    description: "One hosted Workflow Guardrails run for the exact changed source concludes success with every required job passing and zero Node deprecation annotations."
  - id: "CI-N24-AC-05"
    requirement: "CI-N24-REQ-005"
    description: "No matrix consolidation, validator parallelisation, or fail-fast setting is added or changed."
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - id: "CI-N24-ASM-001"
    description: "All jobs remain on GitHub-hosted ubuntu-latest runners, which satisfy the runner requirement for Node 24-backed actions."
    owner: "developer"
  - id: "CI-N24-ASM-002"
    description: "The repository's package manifest does not opt into setup-node automatic npm caching; no cache input is added."
    owner: "developer"
  - id: "CI-N24-ASM-003"
    description: "Existing checkout defaults remain fetch-depth 1, submodules false, and credential persistence true except the explicit release-candidate fetch-depth 0."
    owner: "developer"
open_decisions: []
```

## Spec Freeze
```yaml
status: FROZEN
authority: "developer"
decided_at: "2026-09-11T08:32:50Z"
approved_by: "developer"
freeze_requested_at: "2026-09-11"
spec_version_requested: "0.1"
```
