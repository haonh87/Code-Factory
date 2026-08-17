---
change_id: "CHANGE-002"
artifact_kind: "change-proposal"
status: approved
decision_owner: "agent"
review_required: true
approval_status: APPROVED
reviewed_by: "po"
reviewed_at: "2026-08-14T14:03:53.754Z"
materialization_ref: "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.work-item-report.json"
request_summary: "Create one corrective v2.4.0 release that fixes the reviewed v2.3.2 findings and adds architecture-modeling with drawio contract compatibility."
defect_source: "n/a"
spec_impact_classified: true
review_notes:
  - "Human review approved this change package."
linked_work_items:
  - "stabilize-architecture-skill-bundle"
---

# Change Proposal - CHANGE-002

## Summary
```yaml
problem: "The v2.3.2 bundle passes mechanical checks but has release-blocking semantic defects: repeat upgrades can fail on hardened files, sa/ta contracts and examples drift, approved workflow evidence can be empty, metrics and public documentation disagree, and the required architecture-modeling capability is absent from a clean install."
intent: "Publish one corrective v2.4.0 release that closes the reviewed findings and completes the architecture skill lane without erasing historical audit evidence."
change_scope: "Fix the seven reviewed finding groups, add architecture-modeling to the canonical skill source and both generated runtimes, align it with the drawio landscape contract, strengthen negative validation, and prepare truthful release evidence."
impact_areas:
  - "workflow bundle installer and managed-file permissions"
  - "sa and ta public output contracts, examples, metrics, and metadata"
  - "architecture-modeling skill source, deterministic rendering, and validation"
  - "workflow evidence validators and release work-item artifacts"
  - "runtime synchronization, manifests, package inventory, and smoke tests"
  - "public documentation, release notes, version references, and UTF-8 parity"
affected_specs:
  - "product-specs/cards/architecture-role-skills.md"
  - "product-specs/cards/arch-role-skills-release.md"
```

## Decision
```yaml
status: approved
owner: "po"
reviewers:
  - "ba"
  - "developer"
  - "qc"
  - "devops"
decision_note: "Approved change boundary; downstream Spec, Contract, DoR, Approach, Task Plan, Release, Business Acceptance, and DoD gates remain independent."
```
