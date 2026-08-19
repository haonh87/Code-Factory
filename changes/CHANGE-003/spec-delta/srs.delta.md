---
change_id: "CHANGE-003"
artifact_kind: "spec-delta-srs"
status: draft
linked_work_items:
  - "artifact-governance-enforcement"
---

# SRS Delta - CHANGE-003

## Delta
```yaml
base_spec_ref: "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s04.acceptance-criteria.md@2e268cfce45dfad96d465b2e3b57669d03e10439d03c175f4f1b964f4b14dabc"
related_base_spec_refs:
  - "changes/CHANGE-002/spec-delta/srs.delta.md#CR-REQ-009"
  - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s07.implementation.md#T7-F1"
adds:
  - id: "CR-REQ-011"
    requirement: "artifact-governance must have a complete Vietnamese sibling for its declared public skill contract, and canonical content must be synchronized recursively into both generated runtimes."
    verification: "Assert required files exist, parse frontmatter/links, and recursively diff canonical artifact-governance against Codex and Claude copies."
  - id: "CR-REQ-012"
    requirement: "The current managed inventory must contain exactly 42 skills in canonical source, Codex runtime, and Claude runtime, with zero recursive managed-source drift."
    verification: "Run runtime-parity, pack-audit, package dry-run, and exact-artifact inventory assertions for 42/42/42 and diff count 0."
  - id: "CR-REQ-013"
    requirement: "The additive public skill must use a new release identity v2.5.0; every current package and public surface must agree on v2.5.0 and 42 skills."
    verification: "Assert version and inventory consistency across package metadata, manifests, CLI help, README, publish surface, release note, tests, and tarball contents."
  - id: "CR-REQ-014"
    requirement: "Historical release evidence must remain version-scoped: v2.4.0 stays 41 skills and v2.3.2 stays 40; no mechanical global replacement may change those facts."
    verification: "Assert frozen release documents retain their original version/count pairs and carry no v2.5.0 claims."
  - id: "CR-REQ-015"
    requirement: "Install and update of v2.5.0 must pass for Codex and Claude in global and project scopes while preserving unmanaged file hashes and modes."
    verification: "Run the serialized 4/4 install/update matrix from the exact v2.5.0 candidate and compare unmanaged snapshots."
  - id: "CR-REQ-016"
    requirement: "Rollback from the exact v2.5.0 candidate to the retained v2.4.0 artifact must pass in all four mode/scope combinations, change the managed count from 42 to 41, remove artifact-governance, and preserve unmanaged state."
    verification: "Run four exact-artifact rollback cases and assert version, count, removed skill, hashes, and modes."
updates:
  - target: "artifact-governance-enforcement AC-009"
    change: "Extend the non-regression gate to require the full 36-file unit command green, while retaining all original workflow and trusted-receipt checks."
  - target: "artifact-governance-enforcement approval_gates"
    change: "Require Release and Business Acceptance for the v2.5.0 candidate; Foundation and UAT remain not applicable."
  - target: "CHANGE-002 CR-REQ-009"
    change: "Do not modify the historical requirement. Treat it as the frozen v2.4.0 baseline; CHANGE-003 owns the new v2.5.0/42 current-state contract."
removes: []
contract_invariants:
  - "Canonical source remains the sole owner; generated runtimes are derived and byte-equal."
  - "One semantic version resolves to one immutable inventory and one candidate SHA-256."
  - "Promotion uses the same tarball that passed verification."
  - "Unmanaged files remain outside install/update/rollback ownership."
```
