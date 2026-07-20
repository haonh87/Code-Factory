---
artifact_id: "claude-hooks-instincts-adoption.s08.verification"
artifact_family: workflow-step
work_item_slug: "claude-hooks-instincts-adoption"
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
  - "testing"
  - "code-scan-review"
  - "branch-finish-discipline"
  - "step-goal-contract"
  - "step-goal-auditor"
  - "definition-of-done-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "claude-hooks-instincts-adoption.s07.implementation.md"
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
step_goal: "Verify AC-1..AC-6, regression/compatibility summary, đề xuất DoD verdict."
input_summary:
  - "s07: T-1..T-5 DONE; commit aafcab1 trên release/v2.2.1; v2.2.1 đã stack đủ v2.2.0 (merge 21acea3)"
output_summary:
  - "AC scoreboard 6/6 + DoD proposal"
done_when:
  - "Human pass DoD"
owner: "claude (evidence) -> human (pass DoD)"
```

## Artifact Chính
```yaml
verification_scope:
  - "AC-1..AC-6 theo s04 (HARD: AC-2/AC-3/AC-5)"
evidence_refs:
  - "AC-1 PASS: git ls-files đủ 5 hook + settings.json + instincts.yaml trên release/v2.2.1; 5/5 script settings.json trỏ tới đều tồn tại"
  - "AC-2 HARD PASS: grep /Users/ staged diff = 0; junk scripts/.claude/ xóa + ignore; .claude/worktrees/ ignore (check-ignore pass)"
  - "AC-3 HARD PASS: degrade matrix 5 hook × (stdin rỗng, JSON hỏng) = exit 0 toàn bộ"
  - "AC-4 PASS: profile matrix — minimal=0, standard=0, strict block-case=2 (đúng design), CF_DISABLED_HOOKS=0"
  - "AC-5 HARD PASS: wfc validate 68+64 worktree trước/sau, cả sau merge stack v2.2.0"
  - "AC-6 PASS: load-workflow-context.sh có exit 0 tường minh; chạy lại exit 0"
  - "Rollback rehearsal: revert sạch trong worktree tạm, validate PASS trạng thái revert"
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/default.md"
checks:
  - "Security review commit settings.json: 5 script đã đọc kỹ (s03 agent) + degrade matrix chạy thật — không path máy, không network, không secret"
  - "Adopt-as-is giữ đúng (duy nhất 1 dòng defensive fix, có evidence trước/sau)"
  - "TDD NOT_REQUIRED đúng phân loại; review 2 tầng + rollback rehearsal đúng s06"
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
  - "Main worktree không đổi hành vi (bản untracked vẫn nguyên); hiệu lực team sau release merge + pull"
  - "Teammate: hooks bật strict khi pull (by design OPT-A); opt-out 3 lớp documented trong CLAUDE.md"
  - "Rollback: revert aafcab1 (rehearsed); cá nhân dùng opt-out không cần revert"
```

## Scan Summary
```yaml
status: PASS
notes:
  - "Shell scripts đã audit nội dung (s03) + matrix hành vi (s07); settings.json chỉ chứa hooks config"
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
  - "Đã land vào release/v2.2.1; tag/publish là release-lane action riêng"
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
  - "Traceability đủ: commit-dở-dang problem (s02) -> AC (s04) -> OPT-A auto-on strict (s05) -> T-1..T-5 (s07) -> evidence (s08)"
```

## Definition of Done
```yaml
status: PARTIAL
residual_risks:
  - "Máy thiếu node chưa test thật (mitigation: Claude Code bỏ qua hook lỗi — hành vi platform đã biết; teammate đầu tiên là verify thực tế)"
  - "Ma sát TDD strict với teammate mới — theo dõi sau rollout, đổi default là work item riêng nếu cần (data-driven)"
owners:
  - "human: pass DoD"
```

## Traceability
```yaml
upstream:
  - "claude-hooks-instincts-adoption.s07.implementation.md"
next_step: "Human pass DoD -> đóng work item; tag v2.2.1 thuộc release lane"
```

## Handoff
- Overall status: 6/6 AC PASS (3 HARD pass), verification verdict PASS — chờ human pass DoD.
- Residual: máy fresh/thiếu node chưa test thật; ma sát strict theo dõi sau rollout.
- Recommendation: pass DoD; release lane chốt changelog + tag v2.2.1 sau v2.2.0.
- Release recommendation khi có: v2.2.1 đủ scope — sẵn sàng Release gate sau khi v2.2.0 tag.
- Next action: human chốt DoD.
