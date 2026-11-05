---
artifact_id: "project-context-session-continuity.s08.verification"
artifact_family: workflow-step
work_item_slug: "project-context-session-continuity"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: CHECKS_PENDING
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: "CR-013"
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: "product-specs/srs/project-context-session-continuity.md"
spec_status: approved
planning_track: full
execution_mode: agentic
execution_roles:
  - "po"
  - "ba"
  - "developer"
  - "qc"
  - "devops"
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "required"
  foundation: "not_applicable"
  uat: "required"
  release: "required"
  business_acceptance: "required"
role_signoffs:
  spec:
    - "ba"
  contract:
    - "developer"
    - "qc"
  dor:
    - "ba"
    - "qc"
  approach:
    - "developer"
  foundation: []
  task_plan:
    - "developer"
  uat:
    - "qc"
  release:
    - "devops"
  business_acceptance:
    - "po"
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "testing"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "project-context-session-continuity.s07.implementation.md"
linked_artifacts: []
tags:
  - "workflow/s08"
---

# Verification — CR-013 / 2.10.0 candidate

Technical evidence is prepared for human review. DoD, UAT, Release and Business Acceptance are not yet approved. Publication has not occurred. Readiness signatures remain valid; this note does not replace them.

## Step Contract
```yaml
step_goal: "Verify the distributed lifecycle on exact assets and an existing project."
input_summary: ["Approved CTX-01..12, s05 approach, s06 tasks, s07 implementation"]
output_summary: ["Technical evidence, bounded limitations, immutable artifacts and human review packet"]
done_when: ["Technical checks pass and authorized humans decide the terminal gates"]
owner: "qc"
```

## Main Artifact
```yaml
verification_scope: ["instructions", "context and handoff", "harness hooks/fallback", "history companion", "upgrade and rollback", "ai-maintainer pilot"]
evidence_refs:
  - "evidence/unit-candidate-final.log"
  - "evidence/lifecycle-negative-final.log"
  - "evidence/node20-companion-final.log"
  - "evidence/node22-companion-final.log"
  - "evidence/exact-core-node18.log"
  - "evidence/exact-core-node22.log"
  - "evidence/exact-companion-node20.log"
  - "evidence/exact-companion-node22.log"
  - "evidence/exact-rollback.log"
  - "evidence/pack-audit.log"
summary_verdict: PASS
summary_verdict_scope: "Technical verification only; human terminal gates and publication remain pending."
```

## Spec Coverage

Technical evidence is recorded below. CTX-11 remains PARTIAL until human QC reviews the pilot observations.

```yaml
status: PARTIAL
coverage:
  - requirement: "CTX-01"
    covered_by: "Native Codex 0.166.0 and Claude 2.1.316 fresh sessions read project instructions/context. Global/project, malformed markers, preserved custom rules, legacy migration and override handling have fixture coverage. Native transcripts are summarized in pilot-codex-first.txt and pilot-claude-first.txt."
    status: PASS
  - requirement: "CTX-02"
    covered_by: "Both pilot agents identified masking/broker/export/harness modules, Python/uv, make test/lint/secrets, local-only and masked-data constraints with source links. They did not invent the application structure."
    status: PASS
  - requirement: "CTX-03"
    covered_by: "Lifecycle tests cover zero/one/multiple/pending items, actual git branch change, stale source hashes, corrupt/lost cache and source reconstruction. Briefing exposes recorded authorization separately from receipt verification."
    status: PASS
  - requirement: "CTX-04"
    covered_by: "Fresh sessions and reopen after checkpoints recovered CF-LIFECYCLE-LOCAL-ONLY and the application's current blocker from canonical sources in both harnesses. Claude native /compact recorded a boundary and resumed with CF-PILOT-17 and BLOCKED state intact; native-compaction.txt. Concurrent session IDs and missing end-hook recovery pass. No unsaved work is invented."
    status: PASS
  - requirement: "CTX-05"
    covered_by: "Physical workspace/transcript containment, symlink/traversal and contradictory metadata tests pass. Companion exposes five read-only tools and no command/approval writer. Native probes keep pending gates closed and treat history/cache as hints. Package and source scans contain no raw data, secrets or developer paths. This is bounded test evidence, not a guarantee against all model prompt injection."
    status: PASS
  - requirement: "CTX-06"
    covered_by: "Pilot-installed companion with cass 0.2.7 retrieved known synthetic Codex and Claude exchanges with source/time; other project denied. Fresh isolated index uses two explicit sources, with user-home reads/writes and network blocked. pilot-history-real-cass.log. Missing dependencies remain explicit errors; stale search returns degraded health."
    status: PASS
  - requirement: "CTX-07"
    covered_by: "Exact published 2.9.0 upgrade, repeat idempotence, preserved unmanaged files/modes, legacy full-file transition, edited managed conflicts, read-only roots and injected mid-transaction failure pass."
    status: PASS
  - requirement: "CTX-08"
    covered_by: "Status is read-only; distinguishes native entrypoint/policy/helper/hook configuration, source context, optional history and recorded lifecycle observations. Evidence/config/source/version changes produce stale observations. It cannot attest a gate."
    status: PASS
  - requirement: "CTX-09"
    covered_by: "Exact assets extracted/installed outside checkout; core 947 files, companion 3657 bundled files. Node matrix uses identical checksums. No owned developer paths or private transcript/auth files. artifact-SHA256SUMS identifies exact bytes."
    status: PASS
  - requirement: "CTX-10"
    covered_by: "macOS 27.0.1 arm64; core Node18.20.8/22.23.4, companion Node20.20.2/22.23.4. Native Codex0.166.0 instruction fallback; Claude2.1.316 hooks and compaction. Native Windows is not verified; no support claim for its lifecycle hooks."
    status: PASS
  - requirement: "CTX-11"
    covered_by: "ai-maintainer actual candidate install and fresh/reopen sessions completed. Initial 99 and final 113 pre-existing files hash-checked unchanged outside integration. PII constraints preserved. Human QC acceptance of the attached observations is pending."
    status: PARTIAL
  - requirement: "CTX-12"
    covered_by: "Exact 2.10.0 to 2.9.0 rehearsal passes 4/4 Codex/Claude x global/project; owned integration restored before old installer runs. Later edits cause conflict. EN/VI upgrade/status/history/repair/rollback instructions are available."
    status: PASS
```

## Governance Checks

Final validation exposed an authoring defect in my earlier s05 packet: the accepted three-option Markdown table is not recognized by the validator, which requires `options` and `recommended_option` YAML fields. The canonical signed host remains unchanged. A representation-only correction is prepared at evidence/s05-format-normalized.txt and bound to original/proposed hashes in s05-format-repair.json. Human execution will apply it and re-seal Approach in the same terminal interaction as closeout. This is not new design approval. Until then, canonical validate/governance report these two known format errors; the corrected review snapshot is checked separately.

```yaml
checklist_applied: ["project-context/checklists/strict.md"]
checks:
  - "Five readiness receipts verified; no signed readiness source edited."
  - "Isolated implementation; no delegation or A3-A4 inclusion."
  - "Technical results do not approve human-controlled gates."
blocking_items: ["Human DoD/UAT/Release/Business Acceptance decisions; source CI and authorized publication", "Existing signed s05 option table needs YAML normalization and renewed Approach signature; no design change"]
owner: "qc"
next_action: "Review exact candidate and pilot evidence, then seal the applicable terminal receipts."
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
notes:
  - "Core Node18 retained. Optional companion needs Node20 and explicitly scoped cass."
  - "Unrecorded conversation cannot be recovered from a cache."
  - "Actual pilot history index remains stale; installation never indexes it. Synthetic acceptance uses a separate index."
  - "Pilot handoff contains older contradictory progress; both agents surfaced this. Its active application owner must reconcile it; integration does not rewrite that ongoing work."
```

## CI Smoke Regression

The first CI run exposed an outdated smoke assertion against the legacy full policy. The smoke now checks native and legacy bridges plus the managed policy, resolves macOS temporary paths and cleans up hardened fixture directories. Source smoke passes. The rebuilt core differs in exactly one packaged file, the smoke runner; all pilot-installed production files remain byte-identical. Exact Node18/22 install checks and 2.9.0 rollback were rerun against the new checksum and passed.

## Scan Summary
```yaml
status: PASS
syntax: "Node --check and runtime tests passed."
static_analysis: "Pack validators and targeted manual review; no configured ESLint/type checker."
security: "Gitleaks zero findings on changed source; dependency audit zero known vulnerabilities after compatible updates; containment negative tests passed."
performance_heuristic: "Briefing output bounded at 16KiB, source files at 2MiB, work item entries at 1000; git identity has 1500ms timeout and Claude hooks 10s timeout. No benchmark claimed."
skipped_scans: ["ESLint/semgrep unavailable; no new scanner installed"]
evidence: ["evidence/secrets-scan.log", "evidence/static-encoding-summary.txt"]
```

## Deployment Review

GitHub Releases remains the delivery channel; no npm registry publication is included. Publish core and companion plus SHA256SUMS only after terminal approval and green source CI. Source and artifact identity must match the retained candidate. Rollback first restores managed integration with hash checks, then downgrades the CLI using exact retained 2.9.0. Existing project decisions and receipts are never rewritten. Global/user-owned installs were not silently changed by the pilot.

## UAT Summary
```yaml
status: PARTIAL
reviewers: []
notes: ["Native/pilot observations pass; human QC acceptance pending."]
```

## Release Summary
```yaml
status: PARTIAL
reviewers: []
notes: ["Candidate assets ready; terminal Release receipt, CI and publication pending."]
```

## Business Acceptance Summary
```yaml
status: PARTIAL
reviewers: []
notes: ["Maintainer must accept the demonstrated continuity outcome and documented limits."]
```

## Audit
```yaml
audit_status: PARTIAL
notes: ["Technical traceability complete; human terminal gate decisions pending."]
```

## Definition of Done
```yaml
work_item_slug: "project-context-session-continuity"
status: PARTIAL
checks:
  acceptance_criteria_evidenced: PASS
  implementation_recorded: PASS
  required_verification_completed: PASS
  code_scan_completed_or_justified: PASS
  traceability_complete: PASS
  residual_risks_documented: PASS
gaps: ["Human terminal decisions and authorized publication remain."]
residual_risks: ["Recorded sources determine continuity; unsaved chats are not durable memory.", "Native Windows not verified; existing pilot index remains stale until explicit operator maintenance."]
follow_up_items: ["Application owner reconciles its older handoff; no application code changed here."]
next_action: "Human QC/DevOps/PO review this packet and sign terminal gates; only then merge/publish."
```

## Traceability
```yaml
upstream: ["project-context-session-continuity.s04.acceptance-criteria.md", "project-context-session-continuity.s05.technical-approach.md", "project-context-session-continuity.s06.task-breakdown.md", "project-context-session-continuity.s07.implementation.md"]
next_step: "Human terminal review, then authorized release."
```

## Session Handoff

Retained candidate assets are in `.worktrees/project-context-session-continuity/.release-candidate/v2.10.0/`. Core digest `f2f60fe3addc17a0e8089e350750af88e5359f238070de88a1df3517b5ca53d3`; companion digest `20d4384baae1784a54c0eb4b98e8c0945e0e75f37ab71b663c11f23deb70d51f`. Source branch and worktree must remain open until human DoD. Do not publish rebuilt bytes or claim complete automatic conversation recall.
