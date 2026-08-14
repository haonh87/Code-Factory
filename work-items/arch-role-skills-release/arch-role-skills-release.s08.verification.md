---
artifact_id: "arch-role-skills-release.s08.verification"
artifact_family: workflow-step
work_item_slug: "arch-role-skills-release"
step_id: "s08"
step_slug: "verification"
workflow_stage: delivery
work_item_type: CHANGE
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
  dod:
    - "qc"
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by: []
  approach_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  dod_reviewed_by:
    - "qc"
  dod_reviewed_at: "2026-08-14"
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
  - "arch-role-skills-release.s07.implementation.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s08"
---

# Step 8 - Verify + DoD

> [!summary]
> Tóm tắt kết quả verify, governance compliance, residual risk và kết luận DoD.

## Artifact Chính
```yaml
verification_scope: ["6 acceptance criteria của spec card v0.1", "7 task T1 tới T6"]
evidence_refs:
  - "grep policy và workflow-chain"
  - "đếm SKILL.md runtime: 40 mỗi mode; diff -r nguồn vs runtime 4/4 rỗng"
  - "bundleVersion 2.3.2 ở 2 manifest và package.json"
  - "bundle-smoke PASS; pack-audit PASS; 3 validator workflow OK"
  - "wfc status hai mode: installed_version 2.3.2, managed_skills 40"
  - "sa và ta xuất hiện trong danh sách skill khả dụng của phiên"
summary_verdict: PASS
```

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - id: GC-01  check: "Không đụng file ngoài kế hoạch"  verdict: PASS
    evidence: "Rà từng file tracked bị sửa; mọi file truy được về T1, T2, T3, T3b hoặc T6. workflow-trusted-approval-utils.js đã ở trạng thái M từ trước phiên này, không phải thay đổi của việc này"
  - id: GC-02  check: "Không sửa nội dung hai skill đã freeze"  verdict: PASS
    evidence: "git status skills/analysis/sa và ta chỉ hiện là thư mục mới, không file nào bị sửa"
  - id: GC-03  check: "Text encoding UTF-8"  verdict: PASS
    evidence: "policy, workflow-chain và instincts.yaml đều UTF-8"
blocking_items: []
owner: "chủ repo"
next_action: "NONE"
```

## Regression & Compatibility Summary
```yaml
regression_status: PASS
compatibility_status: PASS
breaking_changes: []
rollback_readiness: READY
notes:
  - "3 validator workflow chạy sau toàn bộ đều OK, 112 note, không note nào hỏng"
  - "38 skill cũ không bị sửa; pack đi từ 38 lên 40 là mở rộng không phá vỡ"
  - "Version bump 2.3.1 lên 2.3.2 giải quyết rủi ro cùng version khác nội dung đã nêu ở s01"
  - "Rollback: git checkout policy và 2 file chain, gỡ 2 thư mục skill, chạy lại sync, bump ngược về 2.3.1"
```

## Spec Coverage
```yaml
coverage:
  - id: AC-001  status: PASS  evidence: "Mục Skill Requirement dòng 394 có đoạn về sa và ta, nêu s01-s04, phân biệt hai góc nhìn, và loại trừ system-design lẫn domain-architecture"
  - id: AC-002  status: PASS  evidence: "Sơ đồ S1 của cả workflow-chain.md và .vi.md đều có sa và ta"
  - id: AC-003  status: PASS  evidence: "40 SKILL.md mỗi mode, tổng 80; diff -r sa và ta giữa nguồn và runtime rỗng cho cả 4 tổ hợp"
  - id: AC-004  status: PASS  evidence: "bundleVersion 2.3.2 ở 2 manifest, version 2.3.2 ở package.json, 11 file cập nhật, khung release note v2.3.2 đã sinh"
  - id: AC-005  status: PASS  evidence: "4 lệnh install đều thành công; wfc status hai mode báo installed_version 2.3.2 và managed_skills 40; sa và ta có trong ~/.claude/skills và ~/.codex/skills, và xuất hiện trong danh sách skill khả dụng của phiên"
  - id: AC-006  status: PASS  evidence: "Không file nào dưới skills/analysis/sa hay ta bị sửa; không SKILL.md nào của 38 skill cũ bị sửa; hai file workflow-chain bị sửa là T2 có kế hoạch"
status: PASS
summary: {pass: 6, partial: 0, untested: 0, fail: 0}
```

## Definition of Done
```yaml
status: DONE
gate_closed: true
closed_at: "2026-08-14"
closed_by_role: "qc"
closed_by_person: "Hao, Nguyen Huu"
verdict_reason: "6/6 AC PASS, không AC nào PARTIAL, UNTESTED hay FAIL. Mọi bằng chứng đều là kết quả lệnh chạy thật, không phải suy luận. Xác nhận mạnh nhất: sa và ta xuất hiện trong danh sách skill khả dụng ngay trong phiên, tức việc cài có hiệu lực thật chứ không chỉ ghi file"
residual_risks:
  - id: RR-1
    risk: "Semver: thêm skill mới theo quy ước chung thường là minor"
    status: NOT_A_RISK
    impact: "Không có. Kiểm lại tiền lệ của chính pack: v2.3.1 cũng thêm một skill là goal-griller, 37 lên 38, và cũng là patch bump. Chọn 2.3.2 ĐÚNG quy ước sẵn có của repo, không phải lệch"
    owner: "po"
    mitigation: "Đã ghi rõ quy ước này ở mục Notes của release note v2.3.2 để lần sau không ai phải tra lại"
  - id: RR-2
    risk: "Release note v2.3.2 mới có khung"
    status: RESOLVED
    impact: "Đã điền ngày 2026-08-14. Đủ Changelog, Added, Changed, Scope, Known Issues, Verification, Notes; không còn chỗ nào để trống"
    owner: "po"
    mitigation: "Thêm mục Known Issues ghi lỗi EACCES khi cài đè, kèm lệnh chmod xử lý. Lỗi này ảnh hưởng mọi người nâng cấp từ 2.3.1 nên phải nằm trong release note, không chỉ nằm trong instinct nội bộ"
  - id: RR-3
    risk: "Cài global ảnh hưởng mọi project trên máy"
    impact: "sa và ta giờ xuất hiện ở mọi repo, kể cả repo không dùng workflow chain"
    owner: "chủ repo"
    mitigation: "Đã chấp nhận khi chọn C cả hai scope. Gỡ bằng cách cài lại bản không có hai skill"
owners: ["chủ repo: RR-3 phạm vi ảnh hưởng của cài global"]
next_action: "NONE"
```

## SDD Traceability
```yaml
requirement_refs: []
acceptance_refs: []
task_refs: []
test_refs: []
```
