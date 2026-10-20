---
change_id: "CHANGE-005"
artifact_kind: "change-design"
status: approved
linked_work_items:
  - "add-diagram-design-adapter"
---

# Change Design - CHANGE-005

## Design
~~~yaml
design_ref: "work-items/add-diagram-design-adapter/add-diagram-design-adapter.s05.technical-approach.md"
approach_id: "APPROACH-005-A"
review_state: "APPROVED"
recommended_option: "First-party diagram-design-presentation-adapter with the pinned upstream capability vendored as non-discoverable managed resources."
summary: "SA/TA carry intent through existing fields; architecture-modeling stays canonical; one adapter atomically emits distinct offline HTML, SVG, and PNG derivatives."
technical_changes:
  - "One bilingual first-party adapter skill with contract, validation, provenance, and pinned resources."
  - "Logical-path mapping prevents the upstream root SKILL.md from becoming a second discovered skill while preserving digest evidence."
  - "SA/TA guidance changes without schema or authority changes."
  - "Optional post-canonical architecture-modeling derivative lane without canonical render-owner changes."
  - "Existing recursive Codex/Claude packaging plus parity and lifecycle evidence."
runtime_changes:
  - "No plugin install, URL onboarding, remote required asset, or active script."
  - "PNG needs approved version-pinned Playwright/Chromium provisioned outside adapter execution."
risk_notes:
  - "Release blocked until PNG runtime is pinned and verified."
  - "Overlapping s07 work blocked until CHANGE-004 is VERIFIED and re-read."
  - "Provenance, semantic, security, accessibility, parity, or lifecycle failure rejects the candidate/output."
foundation_decision: "NOT_APPLICABLE"
spec_change: "NOT_REQUIRED"
approach_gate: "APPROVED_PENDING_TRUSTED_RECEIPT"
reviewed_by: "developer"
reviewed_at: "2026-08-21T08:42:34Z"
~~~

## Decision Boundary

- This mirrors the s05 work-item source of truth.
- This s05 approval authorizes design closure only; it does not authorize production skill, runtime, dependency, test, or generated-artifact implementation.
- APPROACH-005-A was approved by the human as Developer at 2026-08-21T08:42:34Z.
- Next action: seal a trusted Approach receipt against the finalized s05 artifact.
