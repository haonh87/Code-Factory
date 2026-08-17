---
change_id: "CHANGE-002"
artifact_kind: "spec-delta-srs"
status: approved
spec_reviewed_by: "ba"
spec_reviewed_at: "2026-08-14T14:20:25Z"
contract_reviewed_by: "developer"
contract_reviewed_at: "2026-08-14T14:20:25Z"
linked_work_items:
  - "stabilize-architecture-skill-bundle"
---

# SRS Delta - CHANGE-002

## Delta
```yaml
base_spec_ref: "product-specs/cards/architecture-role-skills.md@0.6"
related_base_spec_refs:
  - "product-specs/cards/arch-role-skills-release.md@0.1"
adds:
  - id: "CR-REQ-001"
    requirement: "Managed install and update operations must complete for Codex and Claude in global and project scopes after an earlier install has hardened managed content, without modifying unmanaged files."
    verification: "Run four isolated fresh-install then update scenarios and compare unmanaged-file hashes before and after."
  - id: "CR-REQ-002"
    requirement: "Every EN/VI sa and ta schema or worked-example YAML block must parse, and every copy of threshold.status must allow quantified, binary, and not_quantified."
    verification: "Extract and parse fenced YAML; assert the exact enum in both languages and both skills."
  - id: "CR-REQ-003"
    requirement: "sa and ta examples must obey the canonical block-ownership table: sa must not emit TA-owned driver kinds or to_devops content; ta must not emit SA-owned objectives or to_ba content; paired examples must demonstrate complementary lenses rather than byte-identical output."
    verification: "Run ownership assertions over EN/VI examples and compare paired artifacts."
  - id: "CR-REQ-004"
    requirement: "Workflow validation must reject required approval/freeze evidence that is empty, placeholder-only, digest-stale, or contradicted by derived protocol blockers, and must reject inconsistent coverage summaries."
    verification: "Add named negative fixtures for every defect and prove each is red before the validator change and rejected afterward."
  - id: "CR-REQ-005"
    requirement: "The sa/ta metric contract must consistently define M-01 through M-10, publish the correct count, and calculate verification, handoff, ownership, and coverage totals from auditable evidence in EN and VI."
    verification: "Assert metric IDs, count, formula/value/evidence fields, and computed denominators across both skills."
  - id: "CR-REQ-006"
    requirement: "architecture-modeling must exist once in canonical skills source and be synchronized into both runtime trees with EN/VI instructions, agents metadata, referenced resources, and no orphan references."
    verification: "Assert 41 managed skills per runtime and recursively compare the managed source skill with each runtime copy."
  - id: "CR-REQ-007"
    requirement: "architecture-modeling must consume a stable architecture model and derive audience-specific views. For a system landscape or integration architecture, drawio is mandatory. When a house presentation skill exists it owns the diagram-tool artifact; otherwise architecture-modeling or its bundled deterministic helper must produce the drawio artifact. Exactly one render owner is allowed per invocation."
    verification: "Exercise both house-skill-present and house-skill-absent fixtures and inspect ownership, handoff, model source, and emitted artifacts."
  - id: "CR-REQ-008"
    requirement: "A generated drawio landscape must open as valid mxGraph XML, preserve domain containment and directed orthogonal relationships, report all eight landscape quality counts, have zero box overlaps, zero non-endpoint edge/box intersections, zero containment errors, and require no more than one stated manual step."
    verification: "Generate a representative multi-domain landscape, parse XML, run deterministic geometry checks, and record a first-open visual check."
  - id: "CR-REQ-009"
    requirement: "All canonical and derived public surfaces must report v2.4.0, 41 managed skills per runtime, the same capability inventory, the same verification scope, and truthful limitations."
    verification: "Run version/inventory consistency assertions, runtime sync diff, pack audit, package dry-run, and release-document checks."
  - id: "CR-REQ-010"
    requirement: "Corrected v2.3.2 workflow or release evidence must identify CHANGE-002, must not retain stale trusted approval as current, and must be re-reviewed after the final artifact digest is known."
    verification: "Check correction trace, receipt digest match, reviewer/timestamp authority, and absence of placeholder evidence."
updates:
  - target: "architecture-role-skills REQ-002"
    change: "Clarify that shared handoff blocks contain only the contributor's lens; examples must not label a TA-owned block as shared."
  - target: "architecture-role-skills REQ-003 and schema threshold.status"
    change: "Add binary to every threshold-status enum while excluding binary drivers from the M-04 denominator."
  - target: "architecture-role-skills REQ-006/007"
    change: "Standardize the metric inventory as exactly M-01 through M-10 and make count/coverage claims mechanically reproducible."
  - target: "architecture-role-skills REQ-018/020/023/024"
    change: "Fulfill the formerly external architecture-modeling dependency and lock conditional drawio production ownership."
  - target: "arch-role-skills-release REQ-003"
    change: "Change the managed runtime inventory from 40 to 41 and include architecture-modeling with full resources and metadata."
  - target: "arch-role-skills-release REQ-004"
    change: "Supersede v2.3.2 with v2.4.0 for the corrective release."
  - target: "arch-role-skills-release REQ-006"
    change: "Permit only the sa/ta content corrections enumerated by CHANGE-002; unrelated skills remain unchanged."
removes: []
```
