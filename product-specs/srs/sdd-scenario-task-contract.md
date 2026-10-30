---
artifact_id: "sdd-scenario-task-contract.srs"
artifact_family: "product-spec"
spec_type: "SRS"
spec_status: "approved"
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
  - "qc"
source_of_truth: true
linked_work_items:
  - "sdd-scenario-task-contract"
linked_changes:
  - "CR-011"
---

# SRS — Scenario and task contract

The maintainer accepted this bounded A1-A2 specification in chat. The decision was recorded at `2026-10-30T07:15:09Z`; trusted authoring receipts and protocol activation remain pending.

## Requirement Spec

```yaml
functional_requirements:
  - id: "SRS-FR-001"
    description: "Scenario guidance identifies actor/context, preconditions, success/failure outcomes and rule-linked ACs; unresolved decisions stay explicit; an inapplicable scenario is explained, not invented."
    source_refs:
      - "BRD-001"
    acceptance_refs:
      - "AC-001"
  - id: "SRS-FR-002"
    description: "Missing task_contract_version preserves the legacy reader result and artifact bytes; integer 1 selects the new contract; every other explicit value fails with a version diagnostic."
    source_refs:
      - "BRD-001"
    acceptance_refs:
      - "AC-002"
  - id: "SRS-FR-003"
    description: "Opted-in tasks have unique nonempty IDs; dependencies resolve within the same plan, contain no duplicates/self-edge and form a DAG."
    source_refs:
      - "BRD-001"
    acceptance_refs:
      - "AC-003"
  - id: "SRS-FR-004"
    description: "Every opted-in task has a declared kind and bounded repository-relative paths; reject absolute/parent traversal, empty/root/wildcard scope and existing symlink escape; planned nonexisting leaf files remain allowed."
    source_refs:
      - "BRD-001"
    acceptance_refs:
      - "AC-004"
  - id: "SRS-FR-005"
    description: "Every behavior task has focused verification argv, cwd and nonempty test_refs within its task paths; no placeholder qualifies. Validation never executes the command or treats it as permission."
    source_refs:
      - "BRD-001"
    acceptance_refs:
      - "AC-005"
  - id: "SRS-FR-006"
    description: "Each changed AC resolves in the referenced Spec Card or SRS and has at least one valid task mapping; dangling/duplicate mappings and invented ACs fail. Test references identify intended evidence, not semantic correctness or passing execution."
    source_refs:
      - "BRD-001"
    acceptance_refs:
      - "AC-006"
non_functional_requirements:
  - id: "SRS-NFR-001"
    description: "Only version-1 task/trace blocks use the proposed JSON payload; reject malformed/ambiguous duplicate owner blocks and unsupported types without falling back to legacy."
    source_refs:
      - "BRD-001"
    acceptance_refs:
      - "AC-007"
  - id: "SRS-NFR-002"
    description: "Existing trusted-gate, protocol, adaptive activation and legacy fixtures keep their behavior. No new mandatory roles, services, diagram skill, runtime writer or blanket ceremony is introduced."
    source_refs:
      - "BRD-001"
    acceptance_refs:
      - "AC-008"
  - id: "SRS-NFR-003"
    description: "Negative fixtures demonstrate each new validation failure, compatible legacy cases remain valid, EN/VI source guidance is consistent, and clean isolated source/runtime parity passes before handoff."
    source_refs:
      - "BRD-001"
    acceptance_refs:
      - "AC-009"
constraints:
  - "Extend existing field semantics; no mass migration or retrospective signing."
  - "A0 proposal metrics are not implementation performance evidence."
dependencies: []
open_questions:
  - "None for the accepted contract. Unforeseen wider scope requires a new review; no exception is pre-approved."
```

## Acceptance Criteria

```yaml
acceptance_criteria:
  - id: "AC-001"
    requirement: "SRS-FR-001"
    description: "Scenario guidance identifies actor/context, preconditions, success/failure outcomes and rule-linked ACs; unresolved decisions stay explicit; an inapplicable scenario is explained, not invented."
  - id: "AC-002"
    requirement: "SRS-FR-002"
    description: "Missing task_contract_version preserves the legacy reader result and artifact bytes; integer 1 selects the new contract; every other explicit value fails with a version diagnostic."
  - id: "AC-003"
    requirement: "SRS-FR-003"
    description: "Opted-in tasks have unique nonempty IDs; dependencies resolve within the same plan, contain no duplicates/self-edge and form a DAG."
  - id: "AC-004"
    requirement: "SRS-FR-004"
    description: "Every opted-in task has a declared kind and bounded repository-relative paths; reject absolute/parent traversal, empty/root/wildcard scope and existing symlink escape; planned nonexisting leaf files remain allowed."
  - id: "AC-005"
    requirement: "SRS-FR-005"
    description: "Every behavior task has focused verification argv, cwd and nonempty test_refs within its task paths; no placeholder qualifies. Validation never executes the command or treats it as permission."
  - id: "AC-006"
    requirement: "SRS-FR-006"
    description: "Each changed AC resolves in the referenced Spec Card or SRS and has at least one valid task mapping; dangling/duplicate mappings and invented ACs fail. Test references identify intended evidence, not semantic correctness or passing execution."
  - id: "AC-007"
    requirement: "SRS-NFR-001"
    description: "Only version-1 task/trace blocks use the proposed JSON payload; reject malformed/ambiguous duplicate owner blocks and unsupported types without falling back to legacy."
  - id: "AC-008"
    requirement: "SRS-NFR-002"
    description: "Existing trusted-gate, protocol, adaptive activation and legacy fixtures keep their behavior. No new mandatory roles, services, diagram skill, runtime writer or blanket ceremony is introduced."
  - id: "AC-009"
    requirement: "SRS-NFR-003"
    description: "Negative fixtures demonstrate each new validation failure, compatible legacy cases remain valid, EN/VI source guidance is consistent, and clean isolated source/runtime parity passes before handoff."
```

## Contract Proposal

The following contract is accepted for implementation, not an active writer contract. The current authoring packet uses the existing legacy format and does not opt itself into a validator that does not exist yet.

- Admission: `task_contract_version: 1` is an integer in s06 frontmatter (including a Light s06 host). Absence means legacy. Unknown versions and strings such as `"1"` fail explicitly.
- For v1, the existing `## Main Artifact` owns one fenced `json` object containing `implementation_goal` and `task_breakdown`. The existing `## Traceability` owns one fenced `json` object containing `acceptance_refs` and `task_refs`. Never retain a second authoritative YAML copy alongside these blocks.
- Existing task fields retain their names: `id`, `owner_role`, `name`, `objective`, `paths_in_scope`, `dependencies`, `outputs_expected`, `review_checkpoint`, `verification_hint`. Add `kind` (`behavior|documentation|verification`) and `verification` (`cwd`, `argv`, `test_refs`). `verification_hint` explains the check; executable data lives once in `verification`.
- Every task has a concrete objective, output and review checkpoint. Dependency IDs are plan-local. For behavior tasks, `test_refs` is a nonempty subset of `paths_in_scope`; verification/documentation tasks may use an empty list with an explicit reason in the hint. Kinds cannot be trusted to prove absence of behavior change: semantic review checks that classification.
- `cwd` is `.` or a bounded repository-relative directory. `argv` is a nonempty string array with no empty tokens; shell-interpreter `-c`/equivalent strings and standalone control operators are rejected. Environment setup belongs to the reviewed environment, not an implicit shell. This is validation, not a command allowlist or authorization to execute.
- `paths_in_scope` uses explicit repository-relative file paths, with no glob/root-only grants. Reject absolute, drive/UNC, parent traversal and existing parent symlinks that escape the repository. Check nearest existing ancestor for planned files; nonexistence alone is not rejection. No file access outside the root is required to validate a plan.
- Trace entries are `{acceptance_ref, task_ids}`. Resolve exact AC IDs against the note's existing `spec_refs.card` or `spec_refs.srs`. The proposed `acceptance_refs` list declares changed ACs; require exactly one mapping per declared AC and at least one task ID per mapping. Reject unresolved IDs and duplicate mappings. Semantic review determines whether the declared changed-AC set is complete.
- Empty/placeholder values (`TBD`, `TODO`, `write tests`, `handle edge case`) are invalid where concrete verification or scope is required. Do not claim arbitrary natural-language ambiguity can be decided by this blacklist.
- Reject malformed JSON, duplicate JSON keys, duplicate owner headings, wrong field types and unknown contract versions. Diagnostics identify the work item, section, task ID/field and reason; validation must not mutate documents.
- JSON is proposed only for the opt-in task/trace payload because it permits a small deterministic parser without adding a general YAML dependency. This serialization change and all consumers must be reviewed together. Existing YAML plans remain under the legacy reader; no implicit conversion.

## Spec Freeze

```yaml
status: "approved"
authority: "human maintainer (chat accept)"
decided_at: "2026-10-30T07:15:09Z"
```

