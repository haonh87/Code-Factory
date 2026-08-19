---
change_id: "CHANGE-003"
artifact_kind: "change-design"
status: draft
linked_work_items:
  - "artifact-governance-enforcement"
---

# Change Design - CHANGE-003

## Design
```yaml
summary: "Apply a narrow additive v2.5.0 release delta on the existing workflow-bundle architecture: complete artifact-governance EN/VI, derive both runtimes from canonical source, update only current release surfaces and version-scoped tests, then retain and verify one immutable candidate with exact v2.4.0 rollback."
technical_changes:
  - "Add the declared artifact-governance Vietnamese sibling at canonical source and regenerate Codex/Claude copies; recursive diff must be zero."
  - "Move current package, CLI, README/publish surfaces, and release tests to v2.5.0 and 42 skills without editing v2.4.0=41 or v2.3.2=40 historical claims."
  - "Append a v2.5.0 release note and update the five release-contract tests with version-scoped assertions."
  - "Create one retained workflow-bundle-2.5.0.tgz only after source verification and record commit, inventory, and SHA-256."
  - "Run exact-candidate install/update and exact retained-artifact rollback across Codex/Claude x global/project."
ux_or_runtime_changes:
  - "Clean and updated installations expose artifact-governance as managed skill 42 in both modes."
  - "No command syntax, workflow schema, receipt format, or managed/unmanaged ownership contract changes."
  - "No tag, registry publication, or live global update occurs before human Release approval."
risk_notes:
  - "Broad version/count replacement would corrupt historical release truth; edits and tests must be version-scoped."
  - "Any tracked mutation after candidate creation invalidates the candidate and requires full reverification."
  - "Rollback is valid only through the retained v2.4.0 tarball with SHA-256 44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e."
decision_refs:
  - "work-items/artifact-governance-enforcement/artifact-governance-enforcement.s05.technical-approach.md#CHANGE-003 Technical Approach Delta"
release_direction:
  target: "v2.5.0"
  candidate_rule: "Pack once after all source gates; promote only identical verified bytes."
  publication_rule: "No tag, registry publication, or live global installation before Release approval."
  rollback_rule: "Restore exact retained v2.4.0 managed bytes, expect 42-to-41 and artifact-governance removal, and preserve unmanaged hashes/modes."
```
