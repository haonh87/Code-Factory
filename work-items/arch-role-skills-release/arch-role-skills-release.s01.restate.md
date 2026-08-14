---
artifact_id: "arch-role-skills-release.s01.restate"
artifact_family: workflow-step
work_item_slug: "arch-role-skills-release"
step_id: "s01"
step_slug: "restate"
workflow_stage: discovery
work_item_type: CHANGE
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
sdd_mode: light
spec_refs:
  card: "product-specs/cards/arch-role-skills-release.md"
spec_status: frozen
planning_track: quick
execution_mode: agentic
review_mode: self
approval_gates:
  spec: "required"
role_signoffs:
  spec: []
  dor: []
  approach: []
  task_plan: []
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
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
---

# Step 1 - Clarify

> [!summary]
> Tóm tắt yêu cầu, phạm vi ban đầu, ràng buộc và governance context mở đầu.

## Governance Context
```yaml
governance_ref: "project-context/project-context.md"
applicable_principles: []
required_reviews: []
prohibited_actions: []
open_governance_questions: []
```

## Artifact Chính
```yaml
raw_request: "hãy làm luôn policy và cài trên claude vẫn codex"
restated_request: "Đưa hai skill sa và ta vào lớp policy và lớp runtime của bundle, rồi cài cho cả mode claude và codex, cả scope project và global. Không sửa nội dung skill, không bump version"
request_type: CHANGE
user_problem_initial: "Hai skill nằm ở skills/ là nguồn của pack, không phải nơi Claude Code nạp skill. Gõ /sa hay /ta đều không thấy gì. Policy cũng chưa nói khi nào nên dùng chúng, nên cả router lẫn người dùng đều không biết chúng tồn tại"
scope_draft:
  in: ["policy", "workflow-chain", "sync runtime hai mode", "smoke test", "cài 4 tổ hợp mode x scope"]
  out: ["sửa nội dung skill", "bốn mục carried_forward của work item trước"]
constraints_initial:
  - "Không sửa nội dung hai skill: spec architecture-role-skills đã freeze v0.6"
  - "Không sửa 38 skill cũ"
  - "Bump bundleVersion lên 2.3.2 theo quyết định chủ repo ngày 2026-08-14"
assumptions_initial:
  - "build:workflow:bundle-runtime xoá và dựng lại runtime root nên không để lại rác"
  - "Smoke đọc version động từ manifest, không cần sửa assertion"
risks_initial:
  - "R1 cùng số phiên bản ship hai nội dung khác nhau: ĐÃ GIẢI QUYẾT ngày 2026-08-14, chủ repo đổi quyết định sang bump 2.3.2. Ghi nhận thứ cấp: theo semver thì thêm skill mới thường là minor 2.4.0, chọn patch là quyết định của chủ repo"
  - "R2 cài global ghi vào ~/.claude và ~/.codex, ảnh hưởng mọi project trên máy, không riêng repo này"
  - "R3 policy là lớp thẩm quyền: viết sai một câu ở Skill Requirement có thể làm router chọn nhầm ở mọi work item về sau"
  - "R4 instinct smoke-test-version-bump trong .claude/instincts.yaml đã lỗi thời, mô tả một assertion không còn tồn tại"
notes_for_step_2: "Chủ repo chốt ngày 2026-08-14: A làm cả 6 việc; B ban đầu giữ 2.3.1, sau đổi sang bump 2.3.2; C cài cả hai scope"
```

## Business Goal
```yaml
business_goal: "Làm cho hai skill thật sự gọi được, và làm cho policy biết khi nào nên gọi chúng"
success_metrics:
  - "Gõ /sa và /ta thấy skill"
  - "Runtime cả hai mode đủ 40 skill"
  - "Mục Skill Requirement của policy nói được khi nào dùng sa, khi nào dùng ta"
non_goals:
  - "Không nhằm phát hành phiên bản mới"
  - "Không nhằm đóng bốn AC còn treo của work item trước"
```

## Open Questions
```yaml
open_questions:
  - id: "ODC-001"
    question: "Nội dung release note v2.3.2 viết gì"
    recommendation: "Script sinh khung có mục Scope và Verification để trống. Điền tối thiểu: thêm hai skill sa và ta, không thay đổi nào phá vỡ tương thích"
    owner: "po"
    blocking: "không chặn việc này"
missing_inputs: []
conflicts: []
```

## SDD Traceability
```yaml
requirement_refs: []
acceptance_refs: []
task_refs: []
test_refs: []
```
