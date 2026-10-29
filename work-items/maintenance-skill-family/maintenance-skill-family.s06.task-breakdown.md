---
artifact_id: "maintenance-skill-family.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "maintenance-skill-family"
step_id: "s06"
step_slug: "task-breakdown"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: approved
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
execution_roles: ["po", "ba", "developer", "qc"]
review_mode: self
verification_owner: "qc"
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec: ["ba"]
  contract: []
  dor: ["ba", "qc"]
  approach: ["developer"]
  foundation: []
  task_plan: ["developer"]
  uat: []
  release: []
  business_acceptance: []
  dod: ["qc"]
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
  task_plan_reviewed_by: ["developer"]
  task_plan_reviewed_at: "2026-10-28T02:54:17Z"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "maintenance-skill-family.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Nine ordered tasks on branch `feat/maintenance-skill-family`: two pilot skills, an early two-tier review checkpoint, three remaining skills, registration, full validation, then the s07 note. Every task names its files and its check.

## Step Contract
```yaml
step_goal: "Turn approach A (s05, approved 2026-10-28T02:18Z) into an executable, verifiable task order."
input_summary: ["s04 AC-1..AC-10", "s05 Option A, skill template, SC-1 heading mapping"]
output_summary: ["T1..T9 with owned paths, order, checks", "Review checkpoint R1", "Brownfield delivery plan"]
done_when: ["Task Plan gate human-reviewed (developer)"]
owner: "developer"
```

## Artifact Chính
```yaml
workspace:
  mode: "branch in main working tree: feat/maintenance-skill-family (no worktree)"
  reason_no_worktree: "Additive-only paths (skills/maintenance/** + 4 registration files), one session, no overlap with paths of other open items; existing untracked files in the tree are left untouched and not staged"
tasks:
  - id: T1
    title: "Author evidence-handoff"
    owned_paths: ["skills/maintenance/evidence-handoff/SKILL.md", "SKILL.vi.md", "agents/openai.yaml", "references/eval-seeds.md"]
    content: "Handoff envelope (role, status DONE|NEED_INFO|BLOCKED|ESCALATE, summary, evidence[] {id, source, query_or_ref, excerpt masked, link, observed_at}, confidence + basis, open_issues, next_action); claim→evidence rule; untrusted-input rule; PII/secret masking; status decision rules; 3 eval seeds (complete evidence, no evidence, injected instruction in ticket)"
    check: ["template headings in order (SC-1)", "wc -w SKILL.md <= 1500", "EN/VI heading parity", "npm run validate:workflow:pack-audit"]
  - id: T2
    title: "Author root-cause-analysis"
    owned_paths: ["skills/maintenance/root-cause-analysis/{SKILL.md,SKILL.vi.md,agents/openai.yaml,references/eval-seeds.md}"]
    content: "Timeline → hypotheses → falsifying prediction per hypothesis → test against evidence → trace survivor to origin (code/config/data/dependency/capacity) → confidence with basis → >= 2 fix options with blast radius + rollback; request_info loop max 2; competing-hypotheses output when evidence conflicts; ESCALATE rules; 3 eval seeds (deploy regression, data-dependent bug, conflicting evidence)"
    check: ["same as T1"]
  - id: R1
    title: "Early two-tier review checkpoint"
    scope: "T1 + T2"
    order: ["spec compliance vs AC-2..AC-8 and SC-1", "code quality: clarity, length, no vendor lock, originality"]
    reviewers: ["agent self-review recorded in s07", "owner review before T3 starts"]
    exit: "Fixes applied; template confirmed for T3-T5"
  - id: T3
    title: "Author bug-triage"
    owned_paths: ["skills/maintenance/bug-triage/{SKILL.md,SKILL.vi.md,agents/openai.yaml,references/eval-seeds.md}"]
    content: "Normalize report; duplicate scoring (signature, component, time, reporter text); impact x urgency → severity; priority + SLA matrix (configurable, example values); routing; ESCALATE for Sev1 / tier T3; 3 eval seeds (clear duplicate, vague report → NEED_INFO, Sev1 payment outage → ESCALATE)"
    check: ["same as T1"]
  - id: T4
    title: "Author log-investigation"
    owned_paths: ["skills/maintenance/log-investigation/{SKILL.md,SKILL.vi.md,agents/openai.yaml,references/eval-seeds.md,references/query-examples.md}"]
    content: "Identifier extraction; failing window bounds; correlation-id trace across services; healthy baseline selection; signature + rate diff; noise filtering; repro steps; query-examples for KQL, Lucene, ES|QL kept in references; 3 eval seeds"
    check: ["same as T1", "no vendor syntax in SKILL.md main text"]
  - id: T5
    title: "Author metric-correlation"
    owned_paths: ["skills/maintenance/metric-correlation/{SKILL.md,SKILL.vi.md,agents/openai.yaml,references/eval-seeds.md,references/query-examples.md}"]
    content: "RED vs USE lens; failing vs baseline windows; deploy/config timeline alignment; SLO / error-budget burn; correlation-strength wording (no causal claim); PromQL examples in references; 3 eval seeds"
    check: ["same as T4"]
  - id: T6
    title: "Register the group"
    owned_paths: ["skills/README.md", "skills/README.vi.md", "docs/audits/code-factory-holistic-inventory.json", "docs/audits/code-factory-holistic-coverage-matrix.md"]
    content: "Add `skills/maintenance/` to Main Groups (EN/VI); append 5 inventory entries following existing entry shape; add coverage rows"
    check: ["JSON parses (node -e JSON.parse)", "git diff shows additions only in these 4 files"]
  - id: T7
    title: "Full validation"
    commands:
      - "npm run validate:workflow -- --workflow-root work-items --project-root ."
      - "npm run validate:workflow:pack-audit"
      - "npm run validate:workflow:unit"
      - "npm run build:workflow:bundle-runtime && npm run validate:workflow:bundle-smoke   # runtime/ is untracked (generated)"
      - "UTF-8/BOM check on all new/changed text files"
      - "wc -w per skill (AC-6) and eval-seed count (AC-7)"
      - "git diff --stat main..feat/maintenance-skill-family limited to owned paths; existing 43 skills unchanged"
    check: ["all green; failures fixed or recorded with reason"]
  - id: T8
    title: "Originality attestation + phrase spot-check list"
    content: "Agent attests first-principles authoring; produce 10 distinctive phrases per skill for the owner to spot-check against public skill repos (AC-8)"
    check: ["owner confirms spot-check in s08"]
  - id: T9
    title: "s07 implementation note"
    owned_paths: ["work-items/maintenance-skill-family/maintenance-skill-family.s07.implementation.md"]
    content: "Delivery Rule Evidence: TDD not applicable (docs-only skills; eval seeds used as checks), worktree reason, R1 review record, delegation none, AC→file mapping"
    check: ["validate:workflow green"]
dependencies:
  - "T1 → T2 → R1 → (T3, T4, T5 sequential) → T6 → T7 → T8 → T9"
  - "R1 blocks T3 until owner review is recorded"
handoff_points:
  - "After R1: owner review"
  - "After T9: hand to s08 Verify (qc)"
```

## Verification Plan
- Check bắt buộc: T1–T5 per-skill checks; T7 repo-wide validators (validate:workflow, pack-audit, unit, bundle-smoke); encoding; word counts; eval seeds ≥ 3; existing skills unchanged.
- Risk note: installer flattening of a new group (bundle-smoke); originality (T8 + owner spot-check); length creep (wc gate).
- Rollout note nếu có: no release or version bump in this item; branch merged only after s08 DoD.

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - "Review early: R1 after first two skills"
  - "Two-tier review order: spec compliance → quality"
  - "No subagent delegation (tasks share one template; sequential is safer)"
  - "Branch finalization only after s08 DoD"
blocking_items: []
owner: "developer"
next_action: "Owner reviews s06; seals approach + task_plan receipts; then activate s07"
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "git diff shows no change under skills/ outside skills/maintenance/ except skills/README(.vi).md"
  - "validate:workflow:unit and pack-audit green (same as before the change)"
compatibility_checkpoints:
  - "bundle-smoke install/update into codex + claude modes includes skills/maintenance/*"
  - "No skill name collides with existing names"
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "git branch -D feat/maintenance-skill-family before merge, or revert the merge commit after; rerun build:workflow:bundle-runtime"
```

## Traceability
```yaml
upstream: ["maintenance-skill-family.s04.acceptance-criteria.md", "maintenance-skill-family.s05.technical-approach.md"]
next_step: "s07 Implement"
```

## Handoff
- Thứ tự: T1 → T2 → R1 (owner review) → T3 → T4 → T5 → T6 → T7 → T8 → T9.
- Điều kiện sang step 7: Task Plan được người duyệt; receipt approach + task_plan được seal; work item activate s07.
- Review: repo owner (acting as developer) accepted the task plan in chat at 2026-10-28T02:54:17Z; group folder name `skills/maintenance/` confirmed (slug `maintenance-skill-family` is the work item name only). Trusted receipt to be sealed by the owner.
