---
change_id: "CHANGE-004"
artifact_kind: "change-design"
status: approved
linked_work_items:
  - "integrate-design-checklists-into-sa-ta"
---

# Change Design - CHANGE-004

## Design
```yaml
summary: "Keep Option A and rebase it onto the integrated v2.5.0/42 baseline: add a domain-neutral, self-contained EN/VI design-readiness reference to SA and TA, invoke it through concise SKILL.md hooks, map findings into existing output fields, regenerate both runtimes, and prepare an unpublished v2.6.0/42 candidate."
source_ref: "work-items/integrate-design-checklists-into-sa-ta/integrate-design-checklists-into-sa-ta.s05.technical-approach.md"
review_state: "APPROACH_APPROVED_TRUSTED"
reviewed_by: "developer"
reviewed_at: "2026-08-22T15:09:55Z"
trusted_receipt:
  digest_match: true
  artifact_sha256: "1a8c335a047741421fd7d2d91e9f45a1ab95a7e23f3c35d76dea96f15fa1887a"
baseline:
  version: "2.5.0"
  managed_skill_count: 42
  main_head: "cdd68ccb10f1cdec5b3301068dd47cbb74175a92"
target:
  version: "2.6.0"
  managed_skill_count: 42
  publication_status: "PROHIBITED_UNTIL_RELEASE_APPROVAL"
technical_changes:
  - "Add design-readiness-checklist.md and design-readiness-checklist.vi.md under canonical SA and TA references; keep each language pair byte-identical across roles."
  - "Add concise EN/VI invocation hooks to canonical SA and TA SKILL.md files without changing triggers, required output blocks, or ownership meanings."
  - "Extend the existing architecture-role contract test for 13 portable checks, 10 converted questions/handoffs, six representative cases, authority, confidentiality, role boundary, and parity."
  - "Regenerate Codex and Claude runtime copies only through the existing canonical sync path."
  - "Align candidate metadata, tests, package evidence, and public docs on v2.6.0 with 42 managed skills."
ux_or_runtime_changes:
  - "No UI, API, database, deployment topology, or runtime invocation change."
  - "SA/TA behavior is additively enriched inside the existing output contract; solution and model selection remain downstream at s05."
  - "Canonical, Codex, and Claude inventories remain 42 and must be byte-consistent after generation."
risk_notes:
  - "The pre-amendment Approach receipt is stale and cannot authorize this design."
  - "Private source provenance must remain outside canonical, runtime, package, and public release files."
  - "Any new output block, owner meaning, trigger, skill, stack, or service requires returning to design/spec control."
  - "Rollback restores only CHANGE-004-managed surfaces to verified v2.5.0/42; unrelated files and installations remain untouched."
```
