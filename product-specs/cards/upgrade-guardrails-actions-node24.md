---
artifact_id: "upgrade-guardrails-actions-node24.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: draft
spec_version: "0.2"
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
  - "https://github.com/actions/upload-artifact/releases/tag/v6.0.0"
  - "https://github.com/actions/download-artifact/releases/tag/v7.0.0"
---

# Spec Card - Upgrade Guardrails Actions Node24

> [!summary]
> Amended SDD Light specification for a version-only GitHub Actions maintenance delta. Hosted run
> `34947061938` proved that the original checkout/setup-node-only scope cannot satisfy the existing
> zero-deprecation criterion because upload-artifact@v4 and download-artifact@v4 also target Node 20.
> Developer/QC approved finding `F-N24-H1` and Developer approved amendment direction `T4a` at
> `2026-09-15T09:14:23Z`. This v0.2 draft adds the smallest two selectors that close the finding;
> fresh Spec, DoR, Approach, and Task Plan approvals and receipts remain mandatory before editing.

## Business Goal
```yaml
business_goal: "Keep Workflow Guardrails and its release-candidate evidence operational on GitHub-hosted runners after Node 20 is removed."
in_scope:
  - "Change all 9 actions/checkout@v4 references to actions/checkout@v7."
  - "Change all 9 actions/setup-node@v4 references to actions/setup-node@v7."
  - "Change the single actions/upload-artifact@v4 reference to actions/upload-artifact@v6."
  - "Change the single actions/download-artifact@v4 reference to actions/download-artifact@v7."
  - "Cover every existing job, including release-candidate-build."
  - "Preserve release-candidate fetch-depth: 0."
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
    description: "The action upgrade changes no workflow behavior other than the four approved action-major selections; release-candidate retains full-history checkout."
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
  - id: "CI-N24-REQ-006"
    description: "The upload/download artifact steps use the first majors that run on Node 24 by default while preserving the existing artifact name, path, retention, digest, and ordering contract."
    provenance: "BASELINE"
    provenance_note: "Hosted run 34947061938 emitted three Node 20 deprecation annotations from artifact actions"
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
    description: "Relative to the original baseline, the source diff contains only 20 action-version token replacements: the reviewed 18 checkout/setup-node selectors plus one upload-artifact and one download-artifact selector; release-candidate still has fetch-depth: 0 and every trigger, job, needs edge, runner, Node version, action input, and command is unchanged."
  - id: "CI-N24-AC-04"
    requirement: "CI-N24-REQ-004"
    description: "One hosted Workflow Guardrails run for the exact changed source concludes success with every required job passing and zero Node deprecation annotations."
  - id: "CI-N24-AC-05"
    requirement: "CI-N24-REQ-005"
    description: "No matrix consolidation, validator parallelisation, or fail-fast setting is added or changed."
  - id: "CI-N24-AC-06"
    requirement: "CI-N24-REQ-006"
    description: "The workflow contains exactly one actions/upload-artifact@v6 and one actions/download-artifact@v7 reference, zero v4 artifact-action references, and unchanged artifact name/path/retention/digest/order inputs."
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
  - id: "CI-N24-ASM-004"
    description: "download-artifact remains name-based, so the historical single-artifact-by-ID path change does not apply; download v8 is intentionally excluded because its digest-mismatch default changes behavior."
    owner: "developer"
open_decisions:
  - id: "CI-N24-DEC-001"
    status: "DIRECTION_APPROVED_GATE_PENDING"
    decision: "Use upload-artifact@v6 and download-artifact@v7 per Option A."
    owner: "developer"
    approved_by: ["developer", "qc"]
    approved_at: "2026-09-15T09:14:23Z"
```

## Spec Freeze
```yaml
status: draft
authority: "developer"
decided_at: ""
approved_by: ""
freeze_requested_at: "2026-09-15"
spec_version_requested: "0.2"
```
