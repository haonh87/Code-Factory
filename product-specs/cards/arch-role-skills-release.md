---
artifact_id: "arch-role-skills-release.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: frozen
spec_version: "0.1"
owner: "ba"
reviewers:
  - "developer"
source_of_truth: true
linked_work_items:
  - "arch-role-skills-release"
linked_crs: []
---

# Spec Card - Arch Role Skills Release

> Đưa hai skill `sa` và `ta` vào lớp policy và lớp runtime của bundle, rồi cài cho cả `claude`
> và `codex`. Trạng thái: **draft, chưa qua gate.**

## Business Goal
```yaml
business_goal: "Hai skill sa và ta hiện chỉ tồn tại ở skills/ là nguồn của pack. Người dùng gọi /sa hay /ta đều không thấy gì, và policy chưa nói khi nào nên dùng chúng. Việc này đưa chúng vào đường chạy thật."
in_scope:
  - "Policy: thêm sa và ta vào mục Skill Requirement của AGENTS.global.md"
  - "Workflow chain: thêm sa và ta vào sơ đồ bước S1 trong workflow-chain.md và bản .vi.md"
  - "Sync runtime cho cả claude và codex, 38 lên 40 skill"
  - "Chạy bundle smoke test"
  - "Bump bundleVersion 2.3.1 lên 2.3.2"
  - "Cài cả hai scope project và global, cho cả hai mode claude và codex"
out_scope:
  - "Viết nội dung release note - script sinh khung với các mục để trống; điền nội dung là việc riêng"
  - "Sửa nội dung hai skill - đã freeze ở spec card architecture-role-skills v0.6"
  - "Bốn mục carried_forward của work item trước gồm AC-003, AC-016, AC-024, AC-025"
```

## Requirements
```yaml
requirements:
  - id: REQ-001
    description: "Mục Skill Requirement trong policies/codex/AGENTS.global.md nêu khi nào dùng sa và khi nào dùng ta, viết theo đúng khuôn các dòng đã có trong mục đó"
    provenance: BASELINE
    cr_required: false
  - id: REQ-002
    description: "Sơ đồ bước S1 trong workflow-chain.md và bản .vi.md có sa và ta, đặt sau requirement-analysis và product-thinking đúng thứ tự chạy thực tế"
    provenance: BASELINE
    cr_required: false
  - id: REQ-003
    description: "Runtime của cả hai mode claude và codex chứa đủ 40 skill; hai skill mới có đủ SKILL.md, SKILL.vi.md, references và agents"
    provenance: BASELINE
    cr_required: false
  - id: REQ-004
    description: "Bump bundleVersion từ 2.3.1 lên 2.3.2 bằng lệnh có sẵn, để số phiên bản và nội dung không lệch nhau. Ghi nhận: thêm skill mới theo semver thường là minor, chủ repo chọn patch ngày 2026-08-14"
    provenance: BASELINE
    cr_required: false
  - id: REQ-005
    description: "Cài thành công cho cả hai mode và cả hai scope project và global; sau khi cài, /sa và /ta gọi được"
    provenance: BASELINE
    cr_required: false
  - id: REQ-006
    description: "Không sửa nội dung hai skill và không sửa 38 skill cũ; việc này chỉ đưa cái đã có vào đường chạy"
    provenance: BASELINE
    cr_required: false
```

## Acceptance Criteria
```yaml
acceptance_criteria:
  - id: AC-001
    requirement: REQ-001
    description: "grep sa và ta trong mục Skill Requirement của AGENTS.global.md có kết quả; câu thêm vào nêu rõ thời điểm s01-s04 và phân biệt sa với ta"
  - id: AC-002
    requirement: REQ-002
    description: "Sơ đồ S1 trong cả workflow-chain.md và workflow-chain.vi.md đều có sa và ta"
  - id: AC-003
    requirement: REQ-003
    description: "Đếm SKILL.md trong runtime/claude/skills và runtime/codex/skills đều bằng 40; diff thư mục sa và ta giữa skills/ và runtime của từng mode phải rỗng"
  - id: AC-004
    requirement: REQ-004
    description: "bundleVersion trong cả hai manifest và trong package.json là 2.3.2; 10 file có tham chiếu version đều cập nhật; khung release note v2.3.2 được sinh ra"
  - id: AC-005
    requirement: REQ-005
    description: "wfc install chạy thành công cho 4 tổ hợp mode và scope; wfc status báo đúng số skill quản lý; sa và ta xuất hiện trong danh sách skill khả dụng"
  - id: AC-006
    requirement: REQ-006
    description: "git diff cho thấy không file nào dưới skills/analysis/sa, skills/analysis/ta bị sửa, và không SKILL.md nào của 38 skill cũ bị sửa"
```

## Assumptions And Open Decisions
```yaml
assumptions:
  - id: ASM-001
    description: "npm run build:workflow:bundle-runtime là cách chuẩn để đồng bộ skills/ sang runtime; script xoá và dựng lại toàn bộ runtime root nên không có rác cũ"
    owner: "developer"
  - id: ASM-002
    description: "Smoke test đọc bundleVersion động từ manifest nên không cần sửa assertion khi giữ nguyên version"
    owner: "developer"
open_decisions:
  - id: ODC-001
    description: "Nội dung release note v2.3.2. Script chỉ sinh khung với mục Scope và Verification để trống"
    owner: "po"
```

## Spec Freeze
```yaml
status: FROZEN
authority: "ba"
decided_at: "2026-08-14"
frozen_by_person: "Hao, Nguyen Huu"
```
