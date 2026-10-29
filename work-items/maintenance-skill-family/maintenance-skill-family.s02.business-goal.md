---
artifact_id: "maintenance-skill-family.s02.business-goal"
artifact_family: workflow-step
work_item_slug: "maintenance-skill-family"
step_id: "s02"
step_slug: "business-goal"
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "maintenance-skill-family.s01.restate.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s02"
---

# Step 2 - Business Goal

> [!summary]
> Give maintenance agents an in-house, evidence-first instruction layer so that bug triage, investigation and root-cause analysis are consistent, auditable and measurable — starting with spike S1.

## Step Contract
```yaml
step_goal: "Lock the user problem, business outcome, success metrics and non-goals for maintenance skills batch 1."
input_summary: ["maintenance-skill-family.s01.restate.md (accepted 2026-10-27)"]
output_summary: ["Business goal, success metrics, non-goals"]
done_when: ["Metrics are measurable in spike S1 and by the skill pack validators"]
owner: "po"
```

## Artifact Chính
```yaml
user_problem: "Maintenance agents (and humans using Code-Factory on BUG work items) have no shared method for triage, log/metric investigation and RCA; results vary per prompt and cannot be audited or compared."
business_goal: "Reduce time-to-RCA and raise RCA accuracy for GGG application bugs by giving agents five governed, evidence-first skills that plug into the AI Maintainer pipeline and into Code-Factory's maintenance lane."
success_metrics:
  - "SM1: all 5 skills pass the pack validators (validate:workflow, pack-audit, unit tests) with EN + VI files and no external text"
  - "SM2: in spike S1, every RCA produced with the skills cites at least one evidence item per claim (100% of sampled outputs)"
  - "SM3: in spike S1, RCA accuracy with skills >= RCA accuracy without skills on the same golden set (target >= 60% correct root-cause category)"
  - "SM4: handoff outputs validate against the documented schema in >= 95% of S1 runs"
  - "SM5: each SKILL.md <= ~1,500 words; deeper material in references/ loaded on demand"
non_goals:
  - "Building runtime components (n8n, agent-runtime, MCP gateway, case store)"
  - "Batch 2 skills (fix AC, bugfix TDD, release/rollback, post-deploy, postmortem)"
  - "Vendor-specific playbooks for one observability product"
  - "Changing behaviour of existing 43 skills"
constraints:
  - "Original wording; ideas from public practice only"
  - "Tool-agnostic tool names (logs.search, metrics.query_range, issues.search, code.read)"
  - "EN canonical + VI sibling, UTF-8"
assumptions:
  - "Spike S1 (team-factory docs 07) will use these skills; metrics SM2–SM4 are measured there, not inside this work item's DoD"
```

## Traceability
```yaml
upstream: ["maintenance-skill-family.s01.restate.md"]
next_step: "s03 Open Questions"
```

## Handoff
- User problem đã chốt: thiếu phương pháp chung, có bằng chứng, đo được cho triage/điều tra/RCA.
- Non-goals: runtime, batch 2, playbook theo vendor, sửa 43 skill hiện có.
- Điều kiện sang step 3: owner đồng ý success metrics; SM2–SM4 đo ở spike S1, không chặn DoD của work item này.
