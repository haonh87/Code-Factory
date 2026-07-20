---
artifact_id: "community-pack-i18n.s08.verification"
artifact_family: workflow-step
work_item_slug: "community-pack-i18n"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: verified
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/default.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: draft
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: "developer"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: []
  contract: []
  dor: []
  approach: ["developer"]
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: ["developer"]
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: ["developer"]
  approach_reviewed_at: "2026-06-24"
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
  dod_reviewed_by: ["developer"]
  dod_reviewed_at: "2026-06-24"
content_skills:
  - "codex-workflow-chain"
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "community-pack-i18n.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Combo A community release (cleanup + i18n EN) verified across 6 stages. EN is now the
> operative source of truth; Vietnamese is preserved as supplementary reference. DoD passed
> by human (Hao, Nguyen Huu, acting in `developer` role) on 2026-06-24.

## Step Contract
```yaml
step_goal: "Verify the full i18n EN migration + cleanup combo against acceptance criteria and close the work item at DoD."
input_summary:
  - "s05 Technical Approach (Tiered EN migration, Option B, human-approved)"
  - "s06 Task Plan (T1-T7 across 4 tiers + authority flip)"
  - "s07 implementation: 26 implementation commits on worktree-release-combo-a (through DoD 2026-06-24); follow-up cleanup/i18n/review-fix commits added after DoD per human-directed review (see git log for the exact count)"
output_summary:
  - "69 EN-active files across docs/workflow-ref/skills/project-context/authority"
  - "60 VI supplement files preserved (not deleted)"
  - "Validator green throughout"
done_when:
  - "Validator green"
  - "All 4 tiers EN-active, governance enum/role-codes verbatim"
  - "Authority layer flipped to EN-default"
  - "DoD verdict human-passed"
owner: "developer"
```

## Main Artifact
```yaml
verification_scope:
  - "docs/ (8 EN active + 8 .vi.md)"
  - "workflow-chain refs (15 EN + 15 .vi.md)"
  - "skills (37 SKILL.md EN + 33 SKILL.vi.md)"
  - "project-context (9 EN-only, no .vi.md per convention pivot)"
  - ".claude/CLAUDE.md authority flip"
evidence_refs:
  - "validator: OK 60 files / 56 notes (green throughout)"
  - "project-context: 9 files language:en, non-ascii=0"
  - "governance enum 39 hits, role codes 6/6, exception-register _none_ sentinel preserved"
  - "skill discovery exact-match intact (37 SKILL.md)"
  - "docs/vi/README.md link integrity 11/11"
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "spec compliance: governance hard-rules translated per glossary, enum/role-codes/register-shape verbatim"
  - "two-tier review: Tier 1 (4 hard-rule files) independent semantic-preservation review human-approved"
  - "content quality: EN clean, no mojibake/BOM, em-dash only non-ascii"
  - "validator green at every stage gate"
blocking_items: []
owner: "developer"
next_action: "Human decides branch/worktree finalization + whether to commit work-item note"
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
```

## Scan Summary
```yaml
status: PASS
notes:
  - "No behavior production change (docs-only migration); TDD N/A"
  - "Worktree used (release-combo-a) per large-change rule"
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["Docs-only work item; no UAT surface"]
```

## Release Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["No packaging/runtime/deploy; release handled in separate community release lane"]
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: ["Not required for this work item profile"]
```

## Audit
```yaml
audit_status: PASS
notes:
  - "AI proposed at every gate; human approved Approach (s05), Tier 1 review, and DoD"
  - "AI did not self-approve any human-controlled gate"
```

## Definition of Done
```yaml
status: DONE
residual_risks:
  - "EN is now operative governance baseline; future hard-rule edits need glossary + two-tier review"
  - "VI hard-rule wording only in git history (no project-context .vi.md sibling)"
  - "branch/worktree not yet finalized (merge to main pending human decision)"
owners:
  - "developer (semantic baseline)"
  - "human (branch/worktree + note commit decision)"
```

## Traceability
```yaml
upstream:
  - "s01 restate -> s02 business-goal -> s03 open-questions -> s04 acceptance"
  - "s05 technical-approach (Option B tiered, human-approved) -> s06 task-plan (T1-T7)"
  - "s07 implementation (26 implementation commits through DoD + follow-up review-fix commits) -> s08 verification (this note)"
next_step: "Finalize branch/worktree (merge worktree-release-combo-a to main or keep for the community release lane)"
```

## Handoff
- Overall status: DONE + MERGED — DoD human-passed 2026-06-24; branch merged into `main` on 2026-07-20 (commit `3033a6f`).
- Residual risks: EN operative baseline drift (mitigated by glossary + two-tier review on future edits).
- Merge notes: `.claude/CLAUDE.md`, `.gitignore`, `README.md`, `docs/publish-surface.md`, `docs/workflow-bundle-quickstart.md`, `docs/workflow-docs-map.md`, and `packages/workflow-bundle/README.md` had real conflicts against the two release merges done earlier the same day (v2.2.0/v2.2.1 version bumps) — resolved by keeping this branch's EN wording with the current `v2.2.1` version references.
- Regression found and fixed during merge: `run-workflow-bundle-smoke.js` still asserted the pre-translation Vietnamese strings against `policies/codex/AGENTS.global.md` and the `codex-workflow-chain` skill — this work item's own verification never ran bundle-smoke, so the drift went undetected until now. Fixed in commit `4ec270e` (TDD: regression test added first) — see `harness-adapter-refactor`/`claude-hooks-instincts-adoption` work items for the sibling release work merged the same day.
- Policy scope clarified: only this repo's project-level `.claude/CLAUDE.md` and `policies/codex/AGENTS.global.md` flip to EN-default; the user's personal global `~/.claude/CLAUDE.md` is untouched.
- Release recommendation if any: N/A (no packaging/runtime); community release handled in a separate lane.
- Next action: none required. Worktree and branch removed after merge.
