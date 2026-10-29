---
artifact_id: "maintenance-skill-family.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "maintenance-skill-family"
step_id: "s03"
step_slug: "open-questions"
workflow_stage: discovery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: default
governance_status: CHECKS_PENDING
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "input-readiness-assessor"
  - "step-goal-auditor"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "maintenance-skill-family.s01.restate.md"
  - "maintenance-skill-family.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Q1–Q5 from s01 investigated in the repo. Four resolved by evidence; one protocol blocker remains (legacy scaffold policy) that needs the owner's action before any gate can be sealed.

## Step Contract
```yaml
step_goal: "Resolve or assign every open question that blocks s04 readiness."
input_summary: ["s01 Q1–Q5", "workflow-bundle.manifest.json", "workflow-contracts.config.json", "packages/workflow-bundle/scripts/sync-workflow-bundle-runtime.js", "skills/README.md"]
output_summary: ["Answered questions with evidence", "Remaining blockers with owner"]
done_when: ["No unowned blocker remains"]
owner: "ba"
```

## Artifact Chính
```yaml
open_questions:
  - id: Q1
    question: "New family skills/maintenance/ vs existing families?"
    answer: "New family skills/maintenance/. Existing families are organised by delivery phase (analysis/architecture/delivery/guardrails); maintenance skills serve a different operating context (runtime bug handling). skills/README.md already documents top-level groups and allows top-level integration skills (notebooklm), so a new group is consistent."
    status: RESOLVED_PROPOSED
    evidence: ["skills/README.md §Main Groups, §Top-Level Integration Skills"]
  - id: Q2
    question: "Should evidence-handoff live in guardrails/?"
    answer: "Keep it in skills/maintenance/ for batch 1 (its handoff types DONE/BLOCKED/NEED_INFO/ESCALATE are maintenance-runtime specific). Revisit promotion to guardrails/ if delivery skills adopt it."
    status: RESOLVED_PROPOSED
  - id: Q3
    question: "Which install/manifest files enumerate skills; adapter changes needed?"
    answer: "Runtime sync copies the whole skills/ tree recursively (copyDirectory(sourceSkillsRoot, runtimeSkillsRoot)); manifest only declares skillsSourceRoot='skills'. No per-skill enumeration in the manifest. Registration surfaces to update: skills/README(.vi).md and docs/audits holistic inventory/coverage matrix. Install flattening and managed-skills list must be confirmed by bundle-smoke in s08."
    status: RESOLVED_WITH_VERIFICATION
    evidence: ["workflow-bundle.manifest.json", "sync-workflow-bundle-runtime.js L149-172", "docs/audits/code-factory-holistic-inventory.json"]
  - id: Q4
    question: "Eval seed format?"
    answer: "Proposed: references/eval-seeds.md per skill with 3 worked cases (input → expected output shape). Machine-readable golden set lives in the AI Maintainer spike repo, not in the skill pack."
    status: RESOLVED_PROPOSED
  - id: Q5
    question: "Bind any skill to workflow-step-definitions.js?"
    answer: "No binding in batch 1 (smallest correct). Each SKILL.md documents its optional use inside Code-Factory: bug-triage/evidence-handoff at s01–s03 of BUG items, log-investigation/metric-correlation/root-cause-analysis at s03–s05. Binding can follow once usage is proven."
    status: RESOLVED_PROPOSED
missing_inputs: []
conflicts: []
assumptions:
  - "pack-audit accepts a new top-level group without code change (verify in s07 early run)"
```

## Input Readiness
```yaml
status: READY
resolved_blocking_items:
  - id: B1
    item: "workflow-contracts.config.json sets protocolControl.legacyScaffoldPolicy=allow_readonly. This item was scaffolded manually (wfc scaffold), so it has no .work-item-report.json and is a read-only reference; gates cannot be sealed on it as-is."
    owner: "repo owner (maintainer)"
    proposed_resolution: "Owner runs the protocol flow to materialize this slug (wfc materialize --request ... with the dedup disposition recorded in s01), or explicitly records a governance decision to proceed under allow_readonly with gate_reviews filled manually."
    resolution: "Owner chose the protocol path (accepted 2026-10-27). Per skills/orchestration/codex-workflow-chain/references/work-item-protocol.md, `wfc work-item approve` materializes a pending report from an existing scaffold before recording the explicit human approval. A fresh `wfc materialize` was not used: it returns reuse_work_item for the existing folder and needs_review (near-similar: code-factory-holistic-audit-remediation, sdd-light-code-factory, stabilize-architecture-skill-bundle) — owner already dispositioned these as no_overlap in s01."
    status: RESOLVED_PENDING_OWNER_COMMAND
owner_actions:
  - "Run `wfc work-item approve --work-item maintenance-skill-family --reviewed-by po` in an interactive terminal (signs work item approval, materializes the report)"
  - "Q1–Q5 proposed answers accepted by owner on 2026-10-27"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "All s01 questions answered with repo evidence and accepted by owner 2026-10-27; B1 resolved via the approve-materializes-scaffold path (owner command pending)"
```

## Traceability
```yaml
upstream: ["maintenance-skill-family.s01.restate.md", "maintenance-skill-family.s02.business-goal.md"]
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Trạng thái readiness: READY — owner chấp nhận Q1–Q5 và cách xử lý B1 (2026-10-27); còn lệnh `wfc work-item approve` do owner chạy.
- Điều cần làm để sang step 4: owner xác nhận Q1–Q5 và chọn cách xử lý B1.
