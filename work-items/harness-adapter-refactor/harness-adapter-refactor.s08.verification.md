---
artifact_id: "harness-adapter-refactor.s08.verification"
artifact_family: workflow-step
work_item_slug: "harness-adapter-refactor"
step_id: "s08"
step_slug: "verification"
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
spec_status: approved
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
  dod:
    - "qc"
    - "po"
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
  dod_reviewed_by:
    - "qc"
    - "po"
  dod_reviewed_at: "2026-07-20"
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
  - "harness-adapter-refactor.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Tóm tắt kết quả verify, governance compliance, residual risk và kết luận DoD.

## Step Contract
```yaml
step_goal: "Verify AC-1..AC-7, regression/compatibility summary, đề xuất DoD verdict."
input_summary:
  - "s07: T-1..T-7 DONE; feat e5ee1d3 + merge 0fbe396 vào release/v2.2.0; đã stack tiếp vào v2.2.1 (merge 21acea3)"
output_summary:
  - "AC scoreboard 7/7 + DoD proposal"
done_when:
  - "Human pass DoD"
owner: "claude (evidence) -> human (pass DoD)"
```

## Artifact Chính
```yaml
verification_scope:
  - "AC-1..AC-7 theo s04 (HARD: AC-2/AC-3/AC-7)"
evidence_refs:
  - "AC-1 PASS: workflow-bundle-utils.test.js — loadAdapter 5 error paths + valid, listAvailableHarnesses 3 case, detectActiveHarness explicit/fallback/env/ambiguity, getRuntimeConfigFromAdapter precedence; toàn bộ pass"
  - "AC-2 HARD PASS (TDD): test repro chạy TRƯỚC fix -> FAIL 'custom_home=undefined' (đúng root cause precedence); sau fix 1 dòng -> PASS; fix khớp ngữ nghĩa getDefaultInstallState"
  - "AC-3 HARD PASS: bundle-smoke PASS tại 4 điểm (WIP baseline, sau fix, sau merge v2.2.0, sau stack v2.2.1); fixture new-format test pass; manifest root KHÔNG đổi (SCOPE-A)"
  - "AC-4 PASS: shim scripts/workflow-bundle-cli.js exit 0; bin/wfc.js version/status hoạt động nguyên trạng"
  - "AC-5 PASS: sync-workflow-bundle-runtime.test.js khóa hành vi chmod 644/755 (read-only source -> writable dest; 644-flat chủ đích); export copyDirectory cũng theo test-first"
  - "AC-6 PASS: ambiguity test — non-TTY 2 harness throw message có '--mode'; env detect 0/1/nhiều case"
  - "AC-7 HARD PASS: wfc validate khớp baseline ở worktree (68+64) và main (84+80) trước/sau toàn bộ"
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "TDD exception ghi trung thực (code WIP có sẵn) + alternative path đã thực thi đúng cam kết s05"
  - "Contract: schema adapter.json ship đúng bản duyệt; không spec-change nào phát sinh trong s07"
  - "Worktree + review 2 tầng + merge revertable đều đúng s06; incident rm nhầm adapters/ tracked đã recover 0 mất mát, ghi s07"
blocking_items: []
owner: "human (pass DoD)"
next_action: "human chốt DoD"
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
notes:
  - "Legacy manifest path khóa bằng characterization tests; smoke pass trên cả 2 release branch"
  - "Package manifest generated: modes đổi thứ tự alphabet (sort registry) — nội dung y hệt, đã review"
  - "Rollback: revert merge 0fbe396 trên release/v2.2.0 (1 merge commit); main chưa nhiễm thay đổi nào"
```

## Scan Summary
```yaml
status: PASS
notes:
  - "Diff production 3 file JS đã qua review 2 tầng + test suite; không secret, không network call mới, không dependency mới"
```

## UAT Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: []
```

## Release Summary
```yaml
status: PARTIAL
reviewers: []
notes:
  - "Đã land vào release/v2.2.0 (integration target đúng kế hoạch); tag/publish v2.2.0 là release-lane action riêng, chưa thuộc DoD work item này"
```

## Business Acceptance Summary
```yaml
status: NOT_APPLICABLE
reviewers: []
notes: []
```

## Audit
```yaml
audit_status: PASS
notes:
  - "Traceability đủ: hardcode-harness problem (s02) -> AC (s04) -> OPT-A+contract (s05) -> T-1..T-7 (s07) -> evidence (s08)"
```

## Definition of Done
```yaml
status: DONE
dod_passed_by: "human (qc/po), 2026-07-20 — residual risks accepted"
residual_risks:
  - "New-format manifest chỉ fixture-tested — kích hoạt end-to-end là SCOPE-B (work item tương lai)"
  - "sdd-light-t1 land sau sẽ phải merge nội dung 2 file test trùng tên (đã lường, coordination ghi s06/s07)"
owners:
  - "human: pass DoD"
```

## Traceability
```yaml
upstream:
  - "harness-adapter-refactor.s07.implementation.md"
next_step: "Work item DONE (2026-07-20). Follow-up: release lane chốt tag v2.2.0; SCOPE-B (new-format end-to-end) là work item tương lai."
```

## Handoff
- Overall status: DONE — DoD passed bởi human (qc/po) 2026-07-20. 7/7 AC PASS (3 HARD pass).
- Residual: SCOPE-B tương lai; test-file merge coordination với sdd-light.
- Recommendation: pass DoD; sau đó release lane chốt changelog + tag v2.2.0.
- Release recommendation khi có: v2.2.0 đủ scope (chỉ chứa work item này) — sẵn sàng cho Release gate khi anh muốn tag.
- Next action: không còn action bắt buộc. Release lane: chốt changelog + tag v2.2.0 khi anh muốn.
