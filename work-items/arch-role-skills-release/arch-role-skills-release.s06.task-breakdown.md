---
artifact_id: "arch-role-skills-release.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "arch-role-skills-release"
step_id: "s06"
step_slug: "task-breakdown"
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
  approach:
    - "developer"
  task_plan:
    - "developer"
  dod: []
gate_reviews:
  spec_reviewed_by: []
  spec_reviewed_at: ""
  dor_reviewed_by: []
  dor_reviewed_at: ""
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-08-14"
  task_plan_reviewed_by:
    - "developer"
  task_plan_reviewed_at: "2026-08-14"
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "arch-role-skills-release.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Option Analysis
```yaml
options:
  - "O-A: sửa policy và workflow-chain trước, rồi sync runtime, rồi cài. Thứ tự này để runtime luôn phản ánh nguồn đã đúng, và nếu policy viết sai thì phát hiện trước khi đẩy ra runtime"
  - "O-B: sync runtime và cài trước cho dùng được ngay, policy bổ sung sau. Nhanh hơn ở bước đầu, nhưng có một khoảng thời gian runtime đã có skill mà policy chưa biết, tức router chọn nhầm mà không ai truy được vì sao"
  - "O-C: chỉ cài vào .claude/skills của repo, bỏ hẳn phần policy và runtime. Nhỏ nhất, nhưng skill sẽ không đi cùng bundle và người cài wfc không nhận được"
recommended_option: "O-A"
trade_offs:
  - "O-A chậm hơn O-B một nhịp, đổi lại không có cửa sổ thời gian nào mà runtime và policy lệch nhau"
  - "O-C bị loại vì mục tiêu là đưa skill vào đường chạy của bundle, không phải chỉ dùng cục bộ"
decision_detail:
  - id: "OA-1"
    question: "Sync runtime có an toàn không khi nó xoá cả thư mục"
    finding: "Script rmSync toàn bộ runtime root rồi copy lại từ skills/. Không có file nào chỉ tồn tại ở runtime mà không có ở nguồn, nên xoá và dựng lại là an toàn và còn sạch hơn copy chồng"
```

## Technical Approach
```yaml
recommended_approach: "Sửa hai file nguồn là policy và workflow-chain, chạy script sync có sẵn cho cả hai mode, chạy smoke, rồi cài bốn tổ hợp mode và scope. Không viết script mới, dùng đúng lệnh npm và wfc đã có"
why: "Toàn bộ cơ chế đã tồn tại và đang được dùng cho 38 skill hiện tại. Việc này chỉ là chạy đúng thứ tự"
boundaries:
  - "Chỉ sửa policies/codex/AGENTS.global.md và hai file workflow-chain"
  - "Không sửa file nào dưới skills/analysis/sa và skills/analysis/ta"
  - "Không sửa manifest ngoài phần script sync tự ghi"
  - "Chỉ đổi version bằng lệnh bump-version có sẵn, không sửa tay từng file"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "policies/codex/AGENTS.global.md - lớp thẩm quyền, mọi work item về sau đều đọc"
  - "codex-workflow-chain references - bản đồ bước cho router"
  - "runtime/claude/skills và runtime/codex/skills - dựng lại toàn bộ"
  - "~/.claude và ~/.codex - cài toàn cục"
compatibility_risks:
  - "Câu thêm vào Skill Requirement viết sai sẽ làm router chọn nhầm ở mọi work item sau này"
  - "Cài global ảnh hưởng mọi project trên máy"
migration_notes: ["Không có migration"]
rollback_notes:
  - "Policy và workflow-chain: git checkout hai file"
  - "Runtime: chạy lại build:workflow:bundle-runtime sau khi gỡ hai thư mục skill"
  - "Cài đặt: wfc có install state file, gỡ bằng cách cài lại bản không có hai skill"
```

## Verification Plan
- Check bắt buộc:
  - `grep` sa và ta trong mục Skill Requirement và trong sơ đồ S1 của cả hai bản ngôn ngữ
  - Đếm `SKILL.md` ở runtime hai mode, phải bằng 40
  - `diff -r` thư mục `sa` và `ta` giữa `skills/` và runtime từng mode, phải rỗng
  - `bundleVersion` ở cả hai manifest vẫn là `2.3.1`
  - `npm run validate:workflow:bundle-smoke`
  - `npm run validate:workflow:pack-audit`
  - `wfc status` sau khi cài, và kiểm `/sa` `/ta` có trong danh sách skill
  - `git diff --stat` xác nhận không file skill nào bị sửa
- Risk note:
  - Cài global là bước khó đảo nhất; chạy sau cùng, sau khi mọi kiểm khác đã pass
- Rollout note nếu có:
  - Không bump version nên không có release note; rủi ro cùng version khác nội dung ghi ở `s08`

## Governance Checks
```yaml
checklist_applied: ["project-context/checklists/default.md"]
checks:
  - id: "GC-01"
    check: "Prefer the smallest solution that is correct"
    verdict: PASS
    evidence: "Không viết script mới, dùng đúng lệnh đã có cho 38 skill hiện tại"
  - id: "GC-02"
    check: "TDD for behavior change"
    verdict: NOT_APPLICABLE
    evidence: "Không có behavior production mới; thay bằng smoke test và pack audit"
  - id: "GC-03"
    check: "Worktree cho thay đổi lớn"
    verdict: NOT_APPLICABLE
    evidence: "planning_track quick, sửa 3 file nguồn, rollback bằng git checkout"
blocking_items: []
owner: "chủ repo"
next_action: "NONE - gate gộp đã ký 2026-08-14 bởi Hao, Nguyen Huu. Work item ACTIVE, chạy T1"
```

## Artifact Chính
```yaml
tasks:
  - id: "T1"
    name: "Policy - thêm sa và ta vào Skill Requirement"
    owned_paths: ["policies/codex/AGENTS.global.md"]
    verify: "grep có kết quả; câu viết đúng khuôn các dòng đã có; nêu rõ s01-s04 và phân biệt sa với ta"
  - id: "T2"
    name: "Workflow chain - thêm vào sơ đồ S1"
    owned_paths:
      - "skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
      - "skills/orchestration/codex-workflow-chain/references/workflow-chain.vi.md"
    verify: "Cả hai bản đều có sa và ta ở khối S1"
    depends_on: ["T1"]
  - id: "T3"
    name: "Sync runtime hai mode"
    owned_paths: ["packages/workflow-bundle/runtime/claude/", "packages/workflow-bundle/runtime/codex/"]
    steps: ["npm run build:workflow:bundle-runtime"]
    verify: "Đếm SKILL.md mỗi mode bằng 40; diff -r sa và ta giữa nguồn và runtime rỗng; bundleVersion vẫn 2.3.1"
    depends_on: ["T2"]
  - id: "T3b"
    name: "Bump bundleVersion 2.3.1 lên 2.3.2"
    owned_paths: ["hai workflow-bundle.manifest.json", "packages/workflow-bundle/package.json", "README.md", ".claude/CLAUDE.md", "docs/ - các file có tham chiếu version", "docs/releases/workflow-bundle-v2.3.2.md"]
    steps: ["npm run bump-version -- 2.3.2"]
    verify: "grep 2.3.1 không còn ở file nào ngoài docs/releases của bản cũ và note của work item trước; khung release note v2.3.2 được sinh"
    depends_on: ["T3"]
    note: "Chạy SAU sync runtime để manifest đã ổn định rồi mới đổi số"
  - id: "T4"
    name: "Smoke và pack audit"
    owned_paths: []
    steps: ["npm run validate:workflow:bundle-smoke", "npm run validate:workflow:pack-audit"]
    verify: "Cả hai PASS"
    depends_on: ["T3b"]
  - id: "T5"
    name: "Cài bốn tổ hợp mode x scope"
    owned_paths: ["~/.claude", "~/.codex", ".claude", ".codex"]
    steps:
      - "wfc install --mode claude --scope project"
      - "wfc install --mode codex --scope project"
      - "wfc install --mode claude --scope global"
      - "wfc install --mode codex --scope global"
    verify: "Mỗi lệnh thành công; wfc status báo đúng số skill; sa và ta có trong danh sách khả dụng"
    depends_on: ["T4"]
    note: "Chạy project trước global. Global là bước khó đảo nhất nên để sau cùng"
  - id: "T6"
    name: "Sửa instinct lỗi thời"
    owned_paths: [".claude/instincts.yaml"]
    steps: ["Sửa smoke-test-version-bump: smoke đọc version động từ manifest, không có assertion hardcode"]
    verify: "Đọc lại instinct, đối chiếu dòng 103 của run-workflow-bundle-smoke.js"
    depends_on: ["T4"]
dependencies: ["Đường găng T1 -> T2 -> T3 -> T4 -> T5; T6 chạy song song sau T4"]
handoff_points: ["Sau T4: mọi kiểm nội bộ pass, sẵn sàng cài", "Sau T5: bàn giao s08"]
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "Sau T3: chạy validate:workflow, wfc sdd, wfc plan để chắc work item đang chạy không bị ảnh hưởng"
  - "Sau T5: wfc status ở cả hai mode"
compatibility_checkpoints:
  - "git diff --stat sau mỗi task; không file nào dưới skills/analysis/sa hay ta được sửa"
  - "bundleVersion đổi đúng một lần bằng lệnh, không sửa tay"
migration_or_backfill_steps: ["Không có"]
rollback_or_restore_steps:
  - "git checkout policies/codex/AGENTS.global.md và hai file workflow-chain"
  - "Gỡ hai thư mục skill rồi chạy lại build:workflow:bundle-runtime"
  - "Cài lại từ bản đã rollback"
```

## SDD Traceability
```yaml
requirement_refs: []
acceptance_refs: []
task_refs: []
test_refs: []
```
