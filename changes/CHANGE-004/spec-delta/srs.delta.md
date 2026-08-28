---
change_id: "CHANGE-004"
artifact_kind: "spec-delta-srs"
status: approved
spec_reviewed_by: "ba"
spec_reviewed_at: "2026-08-19T02:53:05Z"
contract_reviewed_by: "developer"
contract_reviewed_at: "2026-08-19T02:53:05Z"
linked_work_items:
  - "integrate-design-checklists-into-sa-ta"
---

# SRS Delta - CHANGE-004

## Delta
```yaml
base_spec_ref: "product-specs/cards/architecture-role-skills.md@0.6"
related_base_spec_refs:
  - "product-specs/cards/arch-role-skills-release.md@0.1"
adds:
  - id: "CR-REQ-001"
    requirement: "Every source rule R-01 through R-34 must have exactly one auditable primary route: adopted portable pre-design check, converted driver question or handoff, deferred to s05 or implementation policy, or excluded as HCP-specific."
    verification: "Parse the private routing matrix; assert 34 unique R-IDs, no missing IDs, no duplicate primary routes, and route counts of 13 adopted, 10 converted, 8 deferred, and 3 excluded."
  - id: "CR-REQ-002"
    requirement: "Every adopted public SA/TA check must identify its trigger, owner lens, architecture concern or invariant, expected evidence, downstream handoff, verification method, and authority when the check is blocking."
    verification: "Validate 13/13 adopted checks against the checklist contract and reject incomplete or unanchored blocking checks."
  - id: "CR-REQ-003"
    requirement: "Publishable skill content must contain no HCP-specific system or product name, HCP ownership decision, exact HCP operational threshold, or verbatim confidential passage; source path and R-ID provenance remain private workflow evidence."
    verification: "Run denylist and source-similarity checks over publishable changed files, then record human Spec and Contract review of the generalized wording."
  - id: "CR-REQ-004"
    requirement: "SA and TA must surface the applicable driver, question, constraint, or handoff for representative architecture-readiness cases without choosing a technology, pattern, schema, domain boundary, diagram, or architecture model."
    verification: "Run at least six named cases covering data authority, contested resource authority, reconciliation, compliance timing, lifecycle or retirement, and offline or online invariants; assert correct routing and zero solution-selection output."
  - id: "CR-REQ-005"
    requirement: "Existing required SA/TA output blocks and their ownership meanings must not be removed, renamed, or reassigned; shared handoffs remain contributor-lens only; system-design and architecture-modeling retain s05 design and modeling authority."
    verification: "Run the current output-schema and block-ownership fixtures, negative ownership cases, and explicit downstream-authority assertions."
  - id: "CR-REQ-006"
    requirement: "A supplementary check is advisory by default and becomes blocking only when it cites a named stakeholder concern, constraint, approved policy, or accepted criterion."
    verification: "Inspect every blocking check for authority provenance and assert zero unanchored universal mandates."
  - id: "CR-REQ-007"
    requirement: "New guidance must reference an existing canonical obligation when it covers the same concern and must not introduce a contradictory duplicate normative rule."
    verification: "Produce a rule-to-existing-contract matrix and assert zero conflicting duplicate normative rules."
  - id: "CR-REQ-008"
    requirement: "Canonical English and Vietnamese SA/TA resources and both generated runtime copies must resolve the same approved guidance with no broken references or unresolved semantic drift."
    verification: "Run reference validation, EN/VI semantic comparison, canonical-to-runtime synchronization, recursive diff, workflow pack audit, and bundle smoke."
  - id: "CR-REQ-009"
    requirement: "All architecture-role contract, representative behavior, static, reference, parity, pack-audit, bundle-smoke, diff, and UTF-8 checks required by the approved task plan must pass or record an explicit release blocker."
    verification: "Collect command, exit status, and artifact evidence for every required verification lane and reconcile it to acceptance coverage."
  - id: "CR-REQ-010"
    requirement: "If the change is packaged, public version, inventory, compatibility, rollback, and release-note surfaces must state one consistent approved scope and must not claim publication or global installation before Release approval."
    verification: "Compare package and manifest versions, managed inventory, release notes, compatibility statement, rollback evidence, and trusted Release receipt."
updates:
  - target: "architecture-role-skills REQ-001/004/008/009"
    change: "Add conditional architecture-readiness concern coverage while preserving the s01-s04 driver boundary and standalone invocation contract."
  - target: "architecture-role-skills REQ-002/003/012"
    change: "Preserve block ownership and downstream handoff authority; supplementary checks may add evidence but may not reassign ownership."
  - target: "architecture-role-skills REQ-005/006/007"
    change: "Make rule routing, check completeness, confidentiality, and representative role behavior auditable without changing the existing metric IDs."
  - target: "arch-role-skills-release REQ-003/004/006"
    change: "Synchronize only the approved SA/TA delta into both runtimes and make any version or inventory change explicit, consistent, and Release-gated."
removes: []
```
