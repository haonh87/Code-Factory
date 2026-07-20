---
artifact_id: "sdd-light-code-factory.s03.open-questions"
artifact_family: workflow-step
work_item_slug: "sdd-light-code-factory"
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
execution_roles: []
review_mode: self
verification_owner: ""
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
  approach: []
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
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
  - "sdd-light-code-factory.s01.restate.md"
  - "sdd-light-code-factory.s02.business-goal.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s03"
---

# Step 3 - Open Questions

> [!summary]
> Tóm tắt câu hỏi mở, missing input, conflict và readiness verdict.

## Step Contract
```yaml
step_goal: "Resolve OQ-1/OQ-2 (scope s08) và audit trạng thái T1-T9 bằng evidence chạy thật."
input_summary:
  - "s01/s02; điều tra 2026-07-20: 23/23 test PASS, 7/7 verification command PASS trong worktree sdd-light-t1"
output_summary:
  - "T1-T9 status ledger + OQ resolve + readiness verdict"
done_when:
  - "Readiness verdict rõ; OQ-1 có owner quyết"
owner: "claude (audit) -> human (quyết OQ-1 ở s04/s05)"
```

## Artifact Chính
```yaml
open_questions:
  - id: OQ-1
    question: "Làm tiếp T8+T9 trong work item này, hay tách work item riêng và chốt T1-T7 DONE?"
    status: OPEN_FOR_S05
    finding: >-
      T8 (owner_role: maintainer) là sửa authority layer (AGENTS.global.md, workflow-chain.md,
      router SKILL) — ảnh hưởng MỌI work item khác trong repo. T9 cần canary + rollback rehearsal
      thật, không chỉ unit test. Cả hai đều rủi ro/effort khác hẳn T1-T7 (code + unit test thuần).
      Đề xuất s05: tách — chốt T1-T7 là scope work item này (DoD riêng), T8+T9 mở work item kế tiếp
      sau khi có quyết định rõ về thời điểm cutover.
    owner: "human quyết ở s05"
  - id: OQ-2
    question: "T1-T7 có tự đứng được thành 1 increment DoD-able không nếu tách T8/T9?"
    status: RESOLVED
    finding: >-
      CÓ, với điều kiện: light profile chưa cutover vào authority thật (router/policy) nên
      chưa ai "vô tình" dùng Light qua flow thật — đây là increment an toàn (code + test đã có,
      nhưng chưa live). R0 Contract + phần lớn R1 Preview của plan (release_phases) khớp với
      trạng thái này: 'R0 Contract: fixtures, budget và eligibility; chưa đổi default.'
    owner: "closed — dùng làm cơ sở đề xuất OPT tách ở s05"
task_ledger_2026_07_20:
  - task: T1
    name: "Profile contract, budget, golden fixtures"
    status: DONE
    evidence: "workflow-sdd-definitions.js, workflow-planning-definitions.js, workflow-change-definitions.js, run-workflow-authoring-smoke.js modified; golden Light baseline + budget tests PASS"
  - task: T2
    name: "Spec Card + Light semantic validation"
    status: DONE
    evidence: "product-specs/templates/spec-card.template.md mới; validate-workflow-sdd.js modified; 18 Spec Card test case PASS (valid + 15 negative fixture)"
  - task: T3
    name: "Compact scaffold + lazy note builders"
    status: DONE
    evidence: "scaffold-workflow.js, workflow-step-definitions.js modified; scaffold-workflow (Light compact) tests PASS"
  - task: T4
    name: "Profile-aware governance, gate, protocol"
    status: DONE
    evidence: "validate-workflow-governance.js, workflow-gate-review.js, workflow-gate-evidence-utils.js, workflow-trusted-approval-utils.js, work-item-protocol.js modified; work-item-protocol (Light) + workflow-gate-evidence (Light) tests PASS (lazy s07/s08, ready bundle, s05-skip cho Light)"
  - task: T5
    name: "Materializer classification + eligibility routing"
    status: DONE
    evidence: "materialize-work-item.js, change-item-utils.js modified; materialize-work-item (Light routing) tests PASS"
  - task: T6
    name: "Compact CR + canonical vocabulary"
    status: DONE
    evidence: "workflow-change-definitions.js, scaffold-change-package.js, validate-workflow-change.js, change-item.js modified; compact CR + dual-read + migrate dry-run idempotent tests PASS"
  - task: T7
    name: "CR aggregate reconciliation + accepted spec update"
    status: DONE
    evidence: "cr-aggregate-reconcile.js mới (chưa tracked); T7 + T7b wiring tests PASS (atomic ACCEPTED bump, no-self-accept, waiver PARTIAL/FAIL)"
  - task: T8
    name: "Authority, router, documentation cutover"
    status: NOT_STARTED
    evidence: "0 diff trên policies/codex/AGENTS.global.md, workflow-chain.md, spec-driven-development.md, work-item-materialization.md, router SKILL.md so với HEAD của worktree — CHƯA đụng"
  - task: T9
    name: "Regression, telemetry, staged rollout"
    status: PARTIAL
    evidence: "workflow-telemetry.js mới + test PASS; authoring-smoke golden Light baseline PASS. CHƯA có: changes/CHANGE-WFC-001 fixture, canary report, rollback rehearsal evidence, default-enable decision"
missing_inputs: []
conflicts: []
assumptions:
  - "cr-aggregate-reconcile.js và toàn bộ 24 file test hiện untracked — sẽ track ở s07 khi implement path chính thức mở"
```

## Input Readiness
```yaml
status: READY
blocking_items: []
owner_actions:
  - "human: quyết OQ-1 (tách hay làm tiếp T8/T9) khi review option analysis s05"
```

## Audit
```yaml
audit_status: PASS
notes:
  - "9/9 task đã audit bằng file diff + test evidence thật, không suy diễn"
```

## Traceability
```yaml
upstream:
  - "sdd-light-code-factory.s01.restate.md"
  - "sdd-light-code-factory.s02.business-goal.md"
next_step: "s04 Acceptance + DoR"
```

## Handoff
- Trạng thái readiness: READY — T1-T7 DONE có evidence, T8 NOT_STARTED, T9 PARTIAL; OQ-1 (scope) chờ human ở s05.
- Điều cần làm để sang step 4: draft s04 AC (kế thừa AC-01..AC-15 của plan) + DoR.
