---
artifact_id: "arch-role-skills-release.s07.implementation"
artifact_family: workflow-step
work_item_slug: "arch-role-skills-release"
step_id: "s07"
step_slug: "implementation"
workflow_stage: delivery
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
  - "implementation"
  - "worktree-discipline"
  - "review-discipline"
  - "delegation-discipline"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "arch-role-skills-release.s06.task-breakdown.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s07"
---

# Step 7 - Implement

> [!summary]
> Tóm tắt thay đổi đã implement, giới hạn còn lại và note cho verify.

## Artifact Chính
```yaml
implemented_changes:
  - task: T1  status: DONE  what: "Thêm đoạn về sa và ta vào mục Skill Requirement của policies/codex/AGENTS.global.md, đặt trước dòng frontend theo đúng thứ tự bước"
  - task: T2  status: DONE  what: "Thêm sa và ta vào sơ đồ S1 của workflow-chain.md và workflow-chain.vi.md, đặt sau requirement-analysis và product-thinking"
  - task: T3  status: DONE  what: "npm run build:workflow:bundle-runtime; runtime hai mode lên 40 skill, tổng 80"
  - task: T3b status: DONE  what: "npm run bump-version -- 2.3.2; 11 file cập nhật, sinh khung docs/releases/workflow-bundle-v2.3.2.md"
  - task: T4  status: DONE  what: "bundle-smoke PASS; pack-audit PASS"
  - task: T5  status: DONE  what: "Cài 4 tổ hợp mode x scope; cả hai mode báo installed_version 2.3.2, managed_skills 40"
  - task: T6  status: DONE  what: "Sửa instinct smoke-test-version-bump đã lỗi thời; thêm instinct chmod-before-install"
doc_changes:
  - "policies/codex/AGENTS.global.md - lớp thẩm quyền"
  - "workflow-chain.md và .vi.md - bản đồ bước"
  - "11 file version từ bump-version"
  - ".claude/instincts.yaml - 1 sửa, 1 thêm"
operational_notes:
  - "PHÁT HIỆN: cài lần hai fail với EACCES vì file đã cài nằm ở quyền 0444, copyFileSync giữ nguyên quyền nguồn. Phải chmod -R u+w vào ~/.claude và ~/.codex trước khi cài. Ghi thành instinct chmod-before-install"
  - "PHÁT HIỆN: build:workflow:bundle-runtime cũng fail cùng lý do khi ghi manifest. Cùng gốc, khác điểm chạm"
  - "PHÁT HIỆN: instinct smoke-test-version-bump mô tả sai. Smoke đọc bundleVersion động ở dòng 103, không hardcode. Theo instinct cũ sẽ đi tìm một assertion không tồn tại"
  - "Xác nhận sống: sau khi cài, sa và ta xuất hiện trong danh sách skill khả dụng của phiên này"
```

## Delivery Rule Evidence
```yaml
behavior_change: NO
tdd_status: NOT_REQUIRED
tdd_exception_reason: "Không có behavior production mới; đây là đưa artifact đã freeze vào đường chạy. Verify thay bằng bundle-smoke, pack-audit và kiểm cài đặt thật"
tdd_alternative_verify_path: ["bundle-smoke", "pack-audit", "diff nguồn vs runtime", "wfc status hai mode"]
change_risk_profile: STANDARD
worktree_status: NOT_REQUIRED
worktree_reason: "planning_track quick; sửa 3 file nguồn, phần còn lại do lệnh sinh; rollback bằng git checkout"
review_status: COMPLETED
review_refs:
  - "Tầng 1 spec compliance: 6/6 REQ có bằng chứng, xem s08"
  - "Tầng 2: rà toàn bộ file tracked bị sửa, mọi file đều truy được về đúng task đã lên kế hoạch"
spec_compliance_status: PASS
code_quality_status: PASS
delegation_mode: agentic
independence_status: NOT_APPLICABLE
merge_path: "Trực tiếp trên main"
verify_path: ["3 validator workflow", "pack-audit", "bundle-smoke", "wfc status hai mode"]
```

## SDD Traceability
```yaml
requirement_refs: []
acceptance_refs: []
task_refs: []
test_refs: []
```
