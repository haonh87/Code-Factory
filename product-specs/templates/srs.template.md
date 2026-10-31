---
artifact_id: "<scope-slug>.srs"
artifact_family: product-spec
spec_type: SRS
spec_status: draft
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
  - "qc"
source_of_truth: true
linked_work_items: []
linked_changes: []
---

# SRS - <scope-title>

## Metadata
```yaml
scope_slug: "<scope-slug>"
source_refs: []
dependency_refs: []
```

## Requirement Spec
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

## Optional Behavior Scenarios

Use this section only when scenarios clarify changed behavior. Keep the accepted
behavior here in the owning specification and reference its IDs from workflow
notes. For an inapplicable change, state the reason and omit the scenario payload.
Do not invent a missing product decision to complete an example.

```yaml
# Illustrative fields, not a new mandatory artifact/schema. Replace with accepted facts.
# scenarios:
#   - id: SC-001
#     actor_or_context: "Event consumer receives a previously processed event ID"
#     preconditions: ["The ID was accepted successfully once"]
#     success_outcome: "Outcome determined by the accepted duplicate-event rule"
#     failure_outcome: "Observable handling determined by the accepted error rule"
#     rule_refs: ["<existing rule ID>"]
#     acceptance_refs: ["<existing AC ID>"]
# Missing first-value/last-value or error policy belongs in the existing open decisions.
```
