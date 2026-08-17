---
change_id: "CHANGE-002"
artifact_kind: "change-design"
status: approved
approach_reviewed_by: "developer"
approach_reviewed_at: "2026-08-14T14:40:17Z"
linked_work_items:
  - "stabilize-architecture-skill-bundle"
---

# Change Design - CHANGE-002

## Design
```yaml
summary: "Correct v2.3.2 through narrow changes to managed permission handling, sa/ta contracts, semantic evidence validation, and bundle composition; add a self-contained architecture-modeling skill whose built-in deterministic mxGraph renderer is used only when no house presentation skill owns the drawio lane."
technical_changes:
  - "Recover owner-write access only on explicit managed destinations before install/update mutation; preserve unmanaged paths and existing CLI syntax."
  - "Correct sa/ta EN/VI schema, ownership, examples, metric inventory, and coverage at canonical source, then regenerate runtimes."
  - "Add step-specific semantic validation for finalized evidence and protocol checks for blockers that contradict trusted receipts."
  - "Add skills/architecture/architecture-modeling with EN/VI content, agents metadata, references, and zero-dependency render/validate scripts for constrained drawio landscape/integration views."
  - "Reuse direct uncompressed mxGraph XML with computed domain containers, grid geometry, and orthogonal waypoints from the prior D1 spike."
  - "Regenerate Codex and Claude runtimes, assert 41 skills per mode, and align manifests, public docs, package metadata, tests, and the v2.4.0 release note."
ux_or_runtime_changes:
  - "Repeat install and update no longer require a manual chmod workaround for managed content."
  - "A clean bundle can emit drawio when no house renderer exists; when one exists, architecture-modeling emits only the model and handoff."
  - "Finalized workflow artifacts with empty, placeholder, stale, arithmetically inconsistent, or receipt-contradicting evidence are rejected."
  - "No existing command, adapter, or skill path is removed."
risk_notes:
  - "Permission changes must be allowlisted to managed targets and proved with unmanaged hash/mode checks."
  - "Drawio automation must be paired with a QC first-open inspection before Release."
  - "Any source change after candidate creation invalidates the retained tarball digest and its release evidence."
  - "The user-owned workflow-trusted-approval-utils.js change and untracked .claude skill candidate remain outside implementation ownership."
decision_refs:
  - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s05.technical-approach.md#Option Analysis"
  - "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s05.technical-approach.md#Architecture Details"
release_direction:
  target: "v2.4.0"
  candidate_rule: "Build once after verification, record SHA-256, and promote the same artifact."
  publication_rule: "No tag, registry publication, or live global update before human Release approval."
  rollback_rule: "Restore v2.3.2 managed content only and preserve unmanaged files plus append-only approval history."
```
