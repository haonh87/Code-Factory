## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "changes/CHANGE-001/spec.md"
approved_spec_digests:
  - ref: "changes/CHANGE-001/spec.md"
    sha256: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "current implementation"
impacted_surfaces:
  - "validator"
compatibility_constraints:
  - "preserve current CLI"
rollback_constraints:
  - "revert the focused change"
```

## Main Artifact
```yaml
acceptance_criteria:
  - id: "AC-001"
    criterion: "The validator rejects an empty evidence list."
    verification: "Run the named negative fixture."
```

## Definition of Ready
```yaml
status: READY
blocking_gaps: []
```
