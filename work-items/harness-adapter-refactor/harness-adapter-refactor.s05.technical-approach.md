---
artifact_id: "harness-adapter-refactor.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "harness-adapter-refactor"
step_id: "s05"
step_slug: "technical-approach"
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
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "harness-adapter-refactor.s04.acceptance-criteria.md"
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
step_goal: "Chốt approach hoàn tất WIP theo SCOPE-A + văn bản hóa contract schema adapter.json; human pass Approach + Contract."
input_summary:
  - "s04: Spec+DoR passed (po, 2026-07-20), note chờ Contract để finalize; AC-1..AC-7"
  - "De-risk: bug CONFIRMED utils.js:634; ambiguity behavior OK; chmod risk LOW; test style chuẩn = plain assert + run-all.js"
output_summary:
  - "Option analysis + contract schema + validation plan + brownfield impact"
done_when:
  - "Human pass Approach + Contract (duyệt schema)"
owner: "claude (draft) -> human (pass Approach + Contract)"
```

## Option Analysis
```yaml
options:
  - "OPT-A: Giữ WIP làm base — characterization test bọc trước, fix bug theo TDD, bổ sung test thiếu"
  - "OPT-B: Reset WIP — re-implement từ đầu theo TDD thuần"
  - "OPT-C: Ship tối thiểu — giữ chmod fix, revert phần adapter registry (defer sang work item sau)"
recommended_option: "OPT-A"
trade_offs:
  - "Chấp nhận: phần code có sẵn không được viết test-first — bù bằng characterization test bọc TRƯỚC khi sửa bất kỳ dòng nào + bug fix đi đúng chu kỳ TDD (test fail trước); ghi TDD exception trong s07"
  - "Loại OPT-B vì vứt code đã điều tra là đủ tốt (validate/cache/fallback tử tế) — lãng phí không đổi lấy chất lượng tương xứng"
  - "Loại OPT-C vì revert nửa vời để lại codebase lai (import động đã nối dây), và không đóng được WIP đang chặn working tree"
```

### Option Details

**OPT-A — Giữ WIP làm base (recommended)**
- Summary: worktree riêng từ release/v2.2.0, apply WIP, viết characterization test cho toàn bộ hàm mới (theo style plain assert + run-all.js), test tái hiện bug 634 fail đúng lý do, fix, bổ sung test edge (ambiguity, adapter hỏng, adapters/ vắng), fixture test new-format.
- Pros: giữ giá trị WIP; TDD compliance qua bug-repro-first + test-bọc-trước-khi-sửa; test style khớp repo.
- Cons: TDD exception cho code đã viết (ghi nhận trung thực).
- Check before implement: đối chiếu run-all.js của sdd-light-t1 để test file mới không conflict cách chạy.

**OPT-B — Re-implement TDD thuần**
- Summary: git checkout 3 file về HEAD, viết test trước rồi code lại từng hàm.
- Pros: TDD sạch tuyệt đối.
- Cons: tốn công viết lại code đã đúng phần lớn; risk regression mới; không tăng chất lượng thực.

**OPT-C — Ship tối thiểu, defer registry**
- Summary: giữ copyFileWritable/chmod, revert adapter code + xóa adapters/.
- Pros: delta nhỏ nhất tuyệt đối.
- Cons: không giải bài toán gốc (hardcode harness); revert dở codebase đã nối dây; WIP quay lại trạng thái treo.

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: ""
selected_stack: []
selected_runtime: []
decision_notes:
  - "Adapter registry là additive trong package hiện có; không đổi stack/runtime/deployment"
```

## Artifact Chính
```yaml
recommended_approach: >-
  OPT-A trong worktree riêng (bắt buộc theo s04), branch từ release/v2.2.0, thứ tự:
  characterization tests -> bug-repro test 634 -> fix -> edge tests -> fixture new-format ->
  smoke + validate -> review 2 tầng -> merge vào release/v2.2.0.
why: >-
  Giữ giá trị WIP đã điều tra là đúng hướng, TDD được tôn trọng ở phần thay đổi mới
  (bug fix + code sửa thêm), test style thống nhất với bộ test sdd-light sắp land.
boundaries:
  - "Chạm: 3 script + test/ mới + adapters/ commit lần đầu + docs bundle"
  - "Không chạm: manifest root (SCOPE-A), shims, bin interface, skills/"
risk_notes:
  - "Merge coordination với sdd-light-t1 (bộ test 24 file cùng thư mục test/) — task plan phải có bước đối chiếu run-all.js"
```

## Architecture Details
```yaml
domain_boundaries:
  - "adapters/<harnessId>/adapter.json = registry per-harness; workflow-bundle-utils = resolver duy nhất đọc adapter"
integration_points:
  - "wfc CLI (install/update/sync) và sync-workflow-bundle-runtime tiêu thụ qua 4 hàm public mới"
data_or_runtime_notes:
  - "Adapter cache theo repoRoot:harnessId trong process; không state trên đĩa"
```

### Contract: adapter.json schema (đề nghị duyệt — Contract gate)

```yaml
# adapters/<harnessId>/adapter.json — public surface của bundle từ v2.2.0
harnessId: string            # bắt buộc, phải khớp tên thư mục
harnessLabel: string         # tên hiển thị
version: string              # version của adapter definition
detection:
  homeDirMarker: string      # vd ".claude" — marker trong $HOME
  envVar: string             # vd "CLAUDE_HOME" — env var override
  defaultHomeDir: string     # home mặc định khi không detect được
naming:
  globalAgentsFileName: string
  projectAgentsFileName: string
  managedSkillsManifestFile: string
  legacyManagedSkillsManifestFile: string
  installStateFile: string
  legacyInstallStateFile: string
paths:
  skillsHomeRel: string
  supportPoliciesTargetRoot: string
  agentsDirectory: string
  agentsManifestFileName: string|null
content:
  globalAgentsSourceRel: string
  skillsSourceRootRel: string
  supportPoliciesSourceRootRel: string
runtime:
  installStateHomeKey: string   # vd "claude_home"
# Quy tắc fallback: repo không có adapters/ -> legacy hardcode codex|claude nguyên vẹn;
# adapter.json hỏng -> bị bỏ qua trong listAvailableHarnesses (có test khẳng định);
# manifest legacy (top-level codex/claude key) là đường production, new-format
# (content+harnesses) chỉ active khi manifest khai báo tường minh (SCOPE-B tương lai).
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "packages/workflow-bundle/scripts/ (3 file), packages/workflow-bundle/test/ (+~4 file), adapters/ (mới)"
compatibility_risks:
  - "Đường legacy phải hành xử y hệt (characterization test khóa); interface shims/bin không đổi (AC-4)"
migration_notes:
  - "Không migration (SCOPE-A giữ manifest legacy)"
rollback_notes:
  - "Toàn bộ trong worktree; merge 1 commit revertable vào release/v2.2.0; main không đụng cho tới khi release merge"
```

## Traceability
```yaml
upstream:
  - "harness-adapter-refactor.s04.acceptance-criteria.md (Spec+DoR passed; Contract chờ duyệt schema ở note này)"
  - "harness-adapter-refactor.s03.open-questions.md (SCOPE-A + derisk evidence)"
next_step: "s06 Task Plan"
```

## Handoff
- Recommended option: OPT-A giữ WIP + characterization-first + bug-repro TDD.
- Trade-off chấp nhận: TDD exception cho code có sẵn (ghi s07).
- Điều kiện sang step 6: human pass Approach + Contract (duyệt schema ở trên); khi Contract pass sẽ backfill gate_reviews.contract vào s04+s05 và finalize s04.
- Deployment note khi có: merge vào release/v2.2.0; publish thuộc release lane.
