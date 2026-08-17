---
artifact_id: "CHANGE-002.evidence-correction"
artifact_family: "change"
artifact_kind: "evidence-correction"
change_id: "CHANGE-002"
work_item_slug: "stabilize-architecture-skill-bundle"
status: "active"
created_at: "2026-08-17"
source_of_truth: true
historical_approval_mutated: false
---

# CHANGE-002 Evidence Correction

This append-only record corrects evidence claims found during the v2.3.2 review. It does not edit,
revoke, re-date, or impersonate any historical reviewer or trusted receipt. The original artifacts
remain byte-for-byte preserved at the SHA-256 values below. New CHANGE-002 receipts prove only that
the corrective requirements and delivery plan were human-reviewed; final v2.4.0 verification still
requires the s08 human-controlled gates.

## Correction Authority

```yaml
change_id: "CHANGE-002"
change_approval_status: APPROVED
change_reviewed_by: "po"
change_reviewed_at: "2026-08-14T14:03:53.754Z"
replacement_work_item: "stabilize-architecture-skill-bundle"
historical_approval_mutated: false
receipt_proofs:
  - gate: spec
    reviewed_by: "ba"
    reviewed_at: "2026-08-14T14:23:58.650Z"
    artifact_ref: "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s04.acceptance-criteria.md"
    artifact_sha256: "47f6e27bb62dc570e0b94f65be2df63f0640df3f772a4ec488a395050ddac700"
  - gate: contract
    reviewed_by: "developer"
    reviewed_at: "2026-08-14T14:24:17.767Z"
    artifact_ref: "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s04.acceptance-criteria.md"
    artifact_sha256: "47f6e27bb62dc570e0b94f65be2df63f0640df3f772a4ec488a395050ddac700"
  - gate: dor
    reviewed_by: "qc"
    reviewed_at: "2026-08-14T14:24:31.489Z"
    artifact_ref: "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s04.acceptance-criteria.md"
    artifact_sha256: "47f6e27bb62dc570e0b94f65be2df63f0640df3f772a4ec488a395050ddac700"
  - gate: approach
    reviewed_by: "developer"
    reviewed_at: "2026-08-14T14:41:59.866Z"
    artifact_ref: "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s05.technical-approach.md"
    artifact_sha256: "744be8686c369aedf6c38e9787954d4433234373172b59777638aa132070cfda"
  - gate: task_plan
    reviewed_by: "developer"
    reviewed_at: "2026-08-14T14:53:48.277Z"
    artifact_ref: "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s06.task-breakdown.md"
    artifact_sha256: "d3e5409924a2d307d03afad3fafc9fb337f0e087bd879797f43390c9fff25458"
```

## Superseded Authoring Evidence

```yaml
corrections:
  - artifact_ref: "work-items/arch-role-skills-release/arch-role-skills-release.s04.acceptance-criteria.md"
    preserved_sha256: "1eaad2e18b579cbb951d8e61b0b199216ec83785117f029d7985711ba8cbb71c"
    correction_status: SUPERSEDED
    defects:
      - "The approved note has an empty acceptance_criteria list."
      - "Definition of Ready and Spec Freeze retain READY|BLOCKED|PARTIAL placeholders."
      - "The brownfield baseline and SDD traceability evidence are empty."
    replacement_artifact_ref: "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s04.acceptance-criteria.md"
    replacement_artifact_sha256: "47f6e27bb62dc570e0b94f65be2df63f0640df3f772a4ec488a395050ddac700"
    replacement_gates: [spec, contract, dor]
  - artifact_ref: "work-items/arch-role-skills-release/arch-role-skills-release.s06.task-breakdown.md"
    preserved_sha256: "03a8ea88bdd3c28b98f8cf724a021cdda52ba019f336faa285e32c227737c811"
    correction_status: SUPERSEDED
    defects:
      - "The plan treats whole-runtime replacement and global installation as safe without an unmanaged-content invariant."
      - "It explicitly excludes sa/ta edits although the reviewed release contains sa/ta contract defects."
      - "All four SDD traceability lists are empty."
    replacement_artifact_ref: "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.s06.task-breakdown.md"
    replacement_artifact_sha256: "d3e5409924a2d307d03afad3fafc9fb337f0e087bd879797f43390c9fff25458"
    replacement_gates: [task_plan]
```

## Corrected Coverage Interpretation

```yaml
artifact_ref: "work-items/architecture-role-skills/architecture-role-skills.s08.verification.md"
preserved_sha256: "76fb5afb6f1f2d4b43dfb6c33cc192ac2dd77235756629c11bf2f1a8b69474f0"
correction_status: SUPERSEDED_FOR_COVERAGE_TOTALS
recorded_summary: {pass: 17, partial: 5, untested: 4, fail: 0}
recomputed_from_coverage_rows: {pass: 19, partial: 6, untested: 4, fail: 0, total: 29}
additional_conflict: "The same note's DoD reason says 16/24 AC PASS, which matches neither summary."
interpretation: "The historical DoD/coverage totals must not be reused as v2.4.0 evidence. This is an agent-calculated correction pending independent s08 review, not a retroactive human approval."
replacement_evidence: "CHANGE-002 AC-004 and the T3 inconsistent-coverage negative fixture; final replacement scoreboard belongs to s08."
```

## Release Claim Quarantine

```yaml
artifact_ref: "work-items/arch-role-skills-release/arch-role-skills-release.s08.verification.md"
preserved_sha256: "345e9a7a75883f02848ba7086f6dc16020ce89375f69c3dd8d2e7f1ce8159253"
correction_status: QUARANTINED_PENDING_HUMAN_GATES
claims_not_reusable:
  - "Repeat install/update safety, because v2.3.2 can fail against hardened managed content."
  - "Release completeness based only on a 40-skill runtime count."
  - "Global installation success as evidence for the corrective v2.4.0 candidate."
required_replacement:
  - "T1 four-scenario hardened update evidence with unchanged unmanaged hashes and modes."
  - "T6 41-skill canonical/runtime equality evidence."
  - "T8 integrated verification and human-controlled Release/DoD receipts."
replacement_candidate:
  artifact_ref: ".claude/worktrees/stabilize-architecture-skill-bundle-v2.4.0/packages/workflow-bundle/workflow-bundle-2.4.0.tgz"
  source_commit: "e6190bd14b4f0156b159c23de2df850c401745d9"
  sha256: "44f40296f2c3b0494ac84414c26c743c9cc3e91cb8caa54dfb8c41f33fb2db3e"
  size_bytes: 886190
  archive_entries: 518
  runtime_skill_counts: {codex: 41, claude: 41}
  exact_artifact_smoke: "PASS: wfc version=2.4.0; Codex/Claude x global/project=4/4; managed skills=41; unmanaged snapshots unchanged"
  supersedes:
    source_commit: "70617402c34deb20396c0e76b2d54993fad4d9fa"
    sha256: "aee0fa0943603b2d14a6cdb8440b82872c37d0bee3435e593073dac098070f1b"
    reason: "Post-review corrective source changes invalidated the prior candidate before any Release approval or publication."
  status: "UNPUBLISHED_PENDING_HUMAN_GATES"
```

## Protocol State Correction

```yaml
report_ref: "work-items/stabilize-architecture-skill-bundle/stabilize-architecture-skill-bundle.work-item-report.json"
observed_contradiction: "blockers contained 'Task Plan trusted receipt has not passed' after task_plan receipt APPROVED."
trusted_receipt_status: APPROVED
trusted_receipt_reviewed_by: "developer"
trusted_receipt_reviewed_at: "2026-08-14T14:53:48.277Z"
trusted_receipt_artifact_sha256: "d3e5409924a2d307d03afad3fafc9fb337f0e087bd879797f43390c9fff25458"
correction: "Clear the stale blocker; retain protocol_status ACTIVE, current_step s07, and the original audit events."
historical_event_mutated: false
```
