---
artifact_id: "claude-hooks-instincts-adoption.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "claude-hooks-instincts-adoption"
step_id: "s05"
step_slug: "technical-approach"
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
  approach:
    - "developer"
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
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-07-20"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "claude-hooks-instincts-adoption.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.

## Step Contract
```yaml
step_goal: "Chốt approach adopt hooks + quyết OQ-1 (chế độ bật cho team); human pass Approach."
input_summary:
  - "s04 Spec+DoR passed (po, 2026-07-20); AC-1..AC-6"
  - "De-risk 2026-07-20: 4 hook exit 0 mọi input hỏng; profile controls hoạt động; tdd-enforce block đúng design"
output_summary:
  - "Option analysis OQ-1 + approach + brownfield impact"
done_when:
  - "Human pass Approach (kiêm quyết OQ-1)"
owner: "claude (draft) -> human (pass Approach)"
```

## Option Analysis
```yaml
options:
  - "OPT-A: Auto-on strict — commit settings.json nguyên trạng, default profile strict"
  - "OPT-B: Auto-on standard — commit settings.json nhưng sửa default profile thành standard (track không block)"
  - "OPT-C: Opt-in — commit settings.json.example, teammate tự copy"
recommended_option: "OPT-A"
trade_offs:
  - "Chấp nhận: teammate bị tdd-enforce block Edit/Write production thiếu test ngay khi pull — nhưng đây CHÍNH LÀ rule cứng của repo (TDD Cho Behavior Change trong CLAUDE.md); hook chỉ enforce điều governance đã tuyên bố"
  - "Opt-out 3 lớp đã có sẵn và documented: CF_HOOK_PROFILE / CF_DISABLED_HOOKS / settings.local.json"
  - "Loại OPT-B vì sửa default = behavior change ngoài tinh thần adopt-as-is, và làm rule TDD thành khuyến nghị mềm"
  - "Loại OPT-C vì lặp lại đúng vấn đề đang giải (reference gãy, config drift, không nhân rộng)"
```

### Option Details

**OPT-A — Auto-on strict (recommended)**
- Summary: commit settings.json + 4 hook + instincts.yaml nguyên trạng; dọn 2 blocker; fix 1 dòng exit 0.
- Pros: đúng adopt-as-is; enforce khớp governance; opt-out đầy đủ; hooks đã verify non-blocking.
- Cons: ma sát ban đầu cho teammate chưa quen TDD gate (mitigate: exempt list rộng — docs/json/yaml/md/sh không bị block; CLAUDE.md có sẵn mục Hook Runtime Controls).
- Check before implement: không còn — degrade + profile đã pre-verified ở s03.

**OPT-B — Auto-on standard default**
- Summary: như OPT-A nhưng đổi default `CF_HOOK_PROFILE` từ strict thành standard trong 3 script TDD.
- Pros: teammate không bao giờ bị block bất ngờ.
- Cons: đổi behavior script (vượt adopt-as-is); TDD rule cứng thành soft-suggestion; ai muốn strict phải tự bật.

**OPT-C — Opt-in qua example**
- Summary: commit settings.json.example, giữ settings.json untracked.
- Pros: không ai bị ảnh hưởng khi pull.
- Cons: reference CLAUDE.md tiếp tục "gãy" về mặt trải nghiệm (hệ thống mô tả nhưng không chạy); drift example vs thật; lặp vấn đề gốc.

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes:
  - "Adopt tooling nội bộ, không chạm architectural baseline"
```

## Artifact Chính
```yaml
recommended_approach: >-
  OPT-A: (1) dọn blocker — xóa scripts/.claude/ + thêm ignore scripts/.claude/ và .claude/worktrees/;
  (2) fix 1 dòng exit 0 cuối load-workflow-context.sh; (3) commit 4 hook + settings.json +
  instincts.yaml trong 1 commit revertable; (4) verify AC-1..AC-6.
why: >-
  Nhỏ nhất đủ đúng: 0 behavior change (trừ fix exit-0 phòng thủ), tận dụng opt-out sẵn có,
  đóng đúng gap commit-dở-dang. Mọi rủi ro đã de-risk bằng chạy thật ở s03.
boundaries:
  - "Chạm: .gitignore (+2 dòng), scripts/hooks/load-workflow-context.sh (+1 dòng), git tracking (+6 file), xóa scripts/.claude/"
  - "Không chạm: behavior 5 hook, default profile, workflow-bundle, bundle publish surface"
risk_notes:
  - "Nếu teammate phàn nàn strict sau khi dùng thật -> mở work item nhỏ đổi default (decision data-driven, không đoán trước)"
```

## Architecture Details
```yaml
domain_boundaries: []
integration_points:
  - "Claude Code hooks API (SessionStart/PreToolUse/PostToolUse/PreCompact/Stop) qua ${CLAUDE_PROJECT_DIR}"
data_or_runtime_notes:
  - "State per-session tại .claude/*-state.json (đã gitignore); không state nào commit"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - ".gitignore, scripts/hooks/load-workflow-context.sh, git tracking 6 file, xóa scripts/.claude/"
compatibility_risks:
  - "Teammate pull: hooks bật ngay (per design OPT-A); thiếu node -> hook lỗi nhưng session tiếp tục (AC edge case)"
migration_notes:
  - "Không migration; state file tự tạo"
rollback_notes:
  - "Revert 1 commit -> untracked như cũ; cá nhân: 3 lớp opt-out"
```

## Traceability
```yaml
upstream:
  - "claude-hooks-instincts-adoption.s04.acceptance-criteria.md (Spec+DoR passed)"
next_step: "s06 Task Plan"
```

## Handoff
- Recommended option: OPT-A auto-on strict, adopt-as-is + dọn blocker.
- Trade-off chấp nhận: ma sát TDD ban đầu — đúng governance, opt-out 3 lớp.
- Điều kiện sang step 6: human pass Approach (kiêm chốt OQ-1 = OPT-A).
- Deployment note khi có: hiệu lực khi teammate pull; merge target release/v2.2.1.
