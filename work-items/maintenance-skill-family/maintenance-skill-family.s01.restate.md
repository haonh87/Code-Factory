---
artifact_id: "maintenance-skill-family.s01.restate"
artifact_family: workflow-step
work_item_slug: "maintenance-skill-family"
step_id: "s01"
step_slug: "restate"
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
  - "product-thinking"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts: []
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s01"
  - "skills/maintenance"
---

# Step 1 - Clarify

> [!summary]
> Add a new in-house `maintenance` skill family to Code-Factory (batch 1: five skills) so runtime maintenance agents (PM, BA, QC, TechLead, Dev, DevOps) can triage bugs, investigate logs/metrics and find root causes with evidence. Draft for human review; no gate is passed by this note.

## Step Contract
```yaml
step_goal: "Restate the maintenance skill family request, lock draft scope and surface open questions before s02-s04."
input_summary:
  - "User request 2026-10-27: build maintenance skills into Code-Factory in-house, no external skills"
  - "Research pack team-factory/docs/ai-maintainer (02 architecture, 04 agent flow, 08 tools/skills, 09 skills sourcing)"
  - "Current Code-Factory skill pack: 43 skills, none covering triage/log/metric/RCA"
output_summary:
  - "Restated request, draft scope in/out, assumptions, risks, open questions"
done_when:
  - "A human reviewer can confirm scope batch 1 and the standalone + maintenance-lane mapping decision"
owner: "developer"
```

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
request_lane: "product_delivery"
structured_triggers: {"public_contract": false, "migration": false, "security_sensitive": false, "regulated": false, "greenfield_foundation": false, "release": false}
routing_reasons: ["LANE_PRODUCT_DELIVERY: new skills ship in the workflow bundle"]
applicable_principles:
  - "AI proposes, human approves"
  - "Spec/design before code (s04-s06 before any SKILL.md is written)"
  - "Smallest correct solution: batch 1 only; extend existing skills before adding new ones"
  - "English is canonical; Vietnamese .vi.md sibling required"
required_reviews: ["spec (ba)", "dor (ba, qc)", "approach (developer)", "task_plan (developer)", "dod (qc)"]
prohibited_actions:
  - "Copying third-party skill text (obra/superpowers, Elastic Agent Skills, wshobson/agents, mattpocock/skills, anthropics/skills); ideas may inform design, wording and structure are original"
  - "Writing SKILL.md files before s06 Task Plan is human-approved"
open_governance_questions:
  - "Does adding a new top-level family `skills/maintenance/` change the bundle manifest / install contract (public_contract) or only extend it additively?"
dedup_review:
  candidates: ["code-factory-holistic-audit-remediation", "sdd-light-code-factory", "decouple-tests-from-tree-layout"]
  disposition: "no_overlap — confirmed by the repo owner in chat on 2026-10-27; none of them adds maintenance/operations skills"
  slug_decision: "maintenance-skill-family (replaces auto-proposed 'fix-maintenance-skill-family-batch')"
```

## Artifact Chính
```yaml
raw_request: "Tôi không muốn dùng skill bên ngoài, muốn vai trò chuyên gia của bạn, dựa trên trend skill tốt đó và build tiếp skill vào bộ Code-Factory của tôi"
restated_request: "Author, in-house, a `maintenance` skill family for Code-Factory. Batch 1 delivers five skills that cover intake and investigation of production bugs: evidence-handoff (shared), bug-triage (PM), log-investigation (QC), metric-correlation (QC/DevOps), root-cause-analysis (TechLead). Skills must work standalone for runtime maintenance agents (output into a case-file section) and document their mapping to the `maintenance` request lane and s01-s08 steps when used inside Code-Factory."
request_type: FEATURE
user_problem_initial: "Code-Factory skills target governed feature delivery by a human + coding agent. There is no skill for bug triage, log/metric investigation or root-cause analysis, which the planned AI Maintainer agents need."
business_context_initial: "GGG plans an AI Maintainer pipeline (Jira DC, ELK with correlation-id, Prometheus, GitLab, n8n, internal MCP) for apps such as G-DMS, PaymentHub, voucher lookup. Spike S1 measures RCA accuracy; these skills are the instruction layer for that spike and later runtime agents."
scope_draft:
  in:
    - "skills/maintenance/evidence-handoff: evidence citation, handoff schema (DONE/BLOCKED/NEED_INFO/ESCALATE), untrusted-input rule, PII handling"
    - "skills/maintenance/bug-triage: duplicate detection, severity/priority/SLA matrix, routing"
    - "skills/maintenance/log-investigation: correlation-id tracing, failing vs healthy window comparison, error pattern grouping; query-language neutral (KQL/ES|QL/Lucene) with examples"
    - "skills/maintenance/metric-correlation: RED/USE, SLO/error budget, metric-to-deploy correlation"
    - "skills/maintenance/root-cause-analysis: timeline, falsifiable hypotheses, trace to origin, confidence, >=2 fix options with blast radius"
    - "Per skill: SKILL.md (EN), SKILL.vi.md (VI), agents/openai.yaml; references/ only when needed"
    - "Registration: skills/README(.vi).md, inventory/coverage audit, workflow-step-definitions.js only if a skill binds to a step"
    - "Eval seeds: a small set of sample cases per skill for later spike use (format to be decided in s05)"
  out:
    - "Batch 2 (fix-acceptance-criteria, bugfix-tdd, release-rollback-plan, post-deploy-verification, postmortem) — separate item; prefer extending requirement-analysis/implementation"
    - "Runtime code: n8n workflows, agent-runtime, MCP gateway, case store"
    - "Changes to existing skills' behaviour"
    - "Bundle release / version bump"
constraints_initial:
  - "Original wording only; no vendored third-party skill content"
  - "Each skill concise (target < ~1,500 words in SKILL.md; detail in references/ loaded on demand)"
  - "UTF-8, no BOM; EN canonical + VI sibling"
  - "Validators green: validate:workflow, pack-audit, unit tests"
assumptions_initial:
  - "A new top-level family folder is accepted by the bundle layout (to verify in s05)"
  - "Skills stay tool-agnostic: reference abstract tools (logs.search, metrics.query_range) rather than vendor APIs"
open_questions_initial:
  - "Q1: New family `skills/maintenance/` vs placing skills into existing families (analysis/delivery/guardrails)?"
  - "Q2: Should evidence-handoff live in guardrails/ since it is cross-cutting?"
  - "Q3: Which install/manifest files enumerate skills, and does a new family need adapter changes (Codex/Claude Code)?"
  - "Q4: Eval seed format — reuse an existing test fixture convention or a simple JSONL?"
  - "Q5: Do any maintenance skills bind to workflow-step-definitions (e.g. root-cause-analysis at s05 for BUG work items)?"
dependencies_initial:
  - "team-factory/docs/ai-maintainer/08-tools-skills-access-oversight.md (tool names, handoff types)"
  - "team-factory/docs/ai-maintainer/09-skills-sourcing.md (gap analysis)"
risks_initial:
  - "Skills drift into vendor-specific instructions and stop being reusable"
  - "Skill too long, wasting agent context"
  - "Bundle/install contract breakage if a new family is not registered everywhere"
  - "Unintentional close paraphrase of third-party skills (licence/attribution risk)"
notes_for_step_2: "Business goal: give maintenance agents a governed, evidence-first instruction layer; success = spike S1 can run with these skills and reviewers can trace every claim to evidence."
```

## Work Item Protocol
```yaml
protocol_status: ACTIVE
approval_status: APPROVED
review_required: true
work_item_slug: "maintenance-skill-family"
work_item_type: FEATURE
delivery_context: brownfield
workflow_root: "/Users/haonguyen87/Documents/workspaces/personal/projects/RnD-AI/Code-Factory/work-items/maintenance-skill-family"
current_step: "s07"
granted_write_paths:
  - "skills/maintenance"
  - "skills/README.md"
  - "skills/README.vi.md"
  - "docs/audits/code-factory-holistic-inventory.json"
  - "docs/audits/code-factory-holistic-coverage-matrix.md"
  - "packages/workflow-bundle/test/release-candidate-artifact-smoke.test.js"
  - "packages/workflow-bundle/test/release-install-all-smoke.test.js"
  - "packages/workflow-bundle/test/release-rollback-smoke.test.js"
  - "packages/workflow-bundle/test/release-surface.test.js"
  - "packages/workflow-bundle/test/workflow-bundle-runtime-parity.test.js"
materialization_status: READY
bootstrap_gate_status: NOT_REQUIRED
bootstrap_gate_ref: ""
bootstrap_reviewed_by: ""
bootstrap_reviewed_at: ""
change_strategy: none
change_id: ""
decision_owner: "coordinator"
protocol_owner: "po"
reviewed_by: "po"
reviewed_at: "2026-10-27T14:43:06.590Z"
handoff_target: "step-owner"
last_transition_action: "resume"
last_transition_at: "2026-10-28T14:38:08.022Z"
required_actions:
  - {"id":"se:59c625c9768efc1c74009edec61fad2b0b44dcef89d4e849bad61d9efcc03194","kind":"workflow_followup","text":"Review and continue workflow backbone s01 -> s08."}
  - {"id":"se:65a8ff65742d42ba80eae93e205f2159dd27c589faeab84cd9f8b5d53232b228","kind":"workflow_followup","text":"Continue active execution from the current step."}
blockers: []
review_notes:
  - "Human review approved."
refs:
  - "work-items/maintenance-skill-family"
audit_events:
  - "REPORT_BOOTSTRAPPED"
  - "WORK_ITEM_APPROVED"
  - "WORK_ITEM_ACTIVATED"
  - "WORK_ITEM_BLOCKED"
  - "WORK_ITEM_RESUMED"
```

## Traceability
```yaml
source_inputs:
  - "Chat request 2026-10-27 (repo owner)"
  - "team-factory/docs/ai-maintainer/09-skills-sourcing.md"
next_step: "s02 Business Goal"
```

## Handoff
- Điều đã rõ: batch 1 = 5 skill; skill độc lập cho runtime agent + ánh xạ lane maintenance; không dùng nội dung skill bên ngoài; dedup không chồng phạm vi (owner xác nhận 2026-10-27).
- Điều còn cần theo dõi: Q1–Q5 ở trên; xác nhận bundle chấp nhận họ skill mới.
- Điều kiện sang step 2: owner review restated request + scope in/out.
- Review: repo owner accepted s01 (restated request, scope in/out, Q1–Q5) in chat on 2026-10-27. s01 hosts no approval gate.
