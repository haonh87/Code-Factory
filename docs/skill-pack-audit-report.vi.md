---
language: vi
---

# Báo Cáo Audit Skill Pack

> English: skill-pack-audit-report.md

Note theo dõi cho đợt audit skill pack của `workflow-bundle v2.3.0` (36 skill trải trên `analysis`, `architecture`, `delivery`, `guardrails`, `orchestration`, `obsidian`). Thực hiện theo phương pháp của `workflow-pack-audit` (check tương đương script + review checklist semantic), chạy qua 4 nhánh phân tích song song cộng với verify trực tiếp bằng `diff`/`grep` cho mọi claim quan trọng trước khi hành động theo nó.

Ngày audit: `2026-07-22`.

## Trạng Thái Nhanh

| Ưu tiên | Số finding | Trạng thái |
|---|---|---|
| P0 | 3 | ĐÃ FIX — commit `6297649` |
| P1 | 6 | ĐÃ FIX — commit `72c8f70` |
| P2 | 7 | CÒN MỞ — chưa bắt đầu |

Verify sau P0 và sau P1: `npm run build:workflow:bundle-runtime` (đồng bộ mirror), `npm run validate:workflow:bundle-smoke` (PASS), `npm run validate:workflow:unit` (25/25 PASS), kiểm UTF-8 trên mọi file `*.vi.md` đã sửa, và diff bằng `comm` xác nhận cả 15 heading `## Hard Rule` trong `policies/codex/AGENTS.global.md` đều có mặt nguyên văn ở đâu đó trong tầng skill.

## Findings

```yaml
audit_scope: "Toàn bộ cây skills/, policies/codex/AGENTS.global.md, và skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
findings:
  - id: GOV-01
    priority: P0
    status: FIXED
    fixed_in: "6297649"
    severity: HIGH
    area: WORKFLOW_CHAIN
    path: "skills/orchestration/codex-workflow-chain/SKILL.md"
    issue: "Hard Rule: SDD Light Profile tồn tại trong policies/codex/AGENTS.global.md nhưng hoàn toàn vắng mặt ở codex-workflow-chain/SKILL.md, dù workflow-governance-router trích dẫn thẳng rule này làm authority."
    recommendation: "Backfill đầy đủ mục SDD Light Profile vào SKILL.md và references/workflow-chain.md."
  - id: GOV-02
    priority: P0
    status: FIXED
    fixed_in: "6297649"
    severity: MEDIUM
    area: WORKFLOW_CHAIN
    path: "skills/orchestration/codex-workflow-chain/SKILL.md, references/workflow-chain.md"
    issue: "4 heading Hard Rule bị lệch chữ so với AGENTS.global.md: Prefer The Smallest Sufficient Solution vs ...That Is Correct; No Premature Done Declaration vs Do Not Self-Declare Done; Branch/Worktree Closed Only After Verify vs ...Only Finalized After Verify; Worktree For Large Or Risky Change vs ...Changes."
    recommendation: "Đổi tên 4 heading ở tầng skill để khớp nguyên văn AGENTS.global.md."
  - id: GOV-03
    priority: P0
    status: FIXED
    fixed_in: "6297649"
    severity: MEDIUM
    area: SCRIPT
    path: "skills/guardrails/workflow-pack-audit/references/checklist.md"
    issue: "workflow-pack-audit, công cụ audit chính của repo, không hề kiểm tra đồng bộ Hard Rule giữa AGENTS.global.md và tầng skill -- đúng loại drift tìm thấy ở GOV-01/GOV-02."
    recommendation: "Thêm mục checklist Governance Authority Sync (EN+VI) và một dòng check script."
  - id: DB-01
    priority: P0
    status: FIXED
    fixed_in: "6297649"
    severity: MEDIUM
    area: SKILL
    path: "skills/delivery/database-change-review/"
    issue: "Không có reference theo database engine dù rủi ro lock/rollback/backfill rất khác nhau giữa Postgres, MySQL, MongoDB."
    recommendation: "Thêm references/{postgresql,mysql,mongodb}.md (+ .vi.md) và mục Choosing The Reference By Engine."
  - id: GOV-04
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: LOW
    area: WORKFLOW_CHAIN
    path: "skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
    issue: "SDD Light Profile cũng thiếu ở đây (cùng gap GOV-01, bản sao thứ hai). Riêng biệt, nội dung Brownfield Baseline And Delta Discipline đã tồn tại nhưng thiếu line break khiến heading dính liền vào bullet trước, ẩn khỏi mọi scan theo `^## Hard Rule`."
    recommendation: "Backfill mục SDD Light Profile; sửa lỗi thiếu newline trước heading Brownfield."
  - id: GOV-05
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: MEDIUM
    area: WORKFLOW_CHAIN
    path: "skills/orchestration/workflow-governance-router/SKILL.md"
    issue: "Hard Rule: Router Before Action và Hard Rule: Generic Coding Defaults Do Not Open A Gate chỉ tồn tại ở AGENTS.global.md, không có bản đối chiếu nguyên văn ở tầng skill."
    recommendation: "Thêm cả 2 mục Hard Rule (EN+VI), trích dẫn nội dung <HARD-GATE>/Red Flags đã có sẵn của skill thay vì diễn giải lại."
  - id: DEL-01
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: LOW
    area: SKILL
    path: "skills/delivery/{delegation,worktree,review,branch-finish}-discipline/SKILL.md"
    issue: "50-65% nội dung Decision Rule của mỗi skill diễn giải lại nguyên văn điều kiện trigger của Hard Rule tương ứng trong codex-workflow-chain, thay vì chỉ giữ phần logic thực thi riêng của skill."
    recommendation: "Trỏ điều kiện trigger của mỗi Decision Rule thẳng về Hard Rule tương ứng; chỉ giữ phần logic quyết định đặc thù của skill."
  - id: DEVOPS-01
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: MEDIUM
    area: SKILL
    path: "skills/delivery/deployment-devops/references/promotion-flow.md, skills/delivery/ci-cd-release/references/promotion-controls.md"
    issue: "Quy tắc promotion/rollback/tagging gần như trùng lặp giữa 2 file, không có chủ sở hữu duy nhất."
    recommendation: "promotion-flow.md sở hữu Gate/Rollout/Rollback/Guard/BLOCKED signs; promotion-controls.md sở hữu Tagging/Approval/Evidence; mỗi bên trỏ chéo sang bên kia thay vì lặp lại."
  - id: DEVOPS-02
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: LOW
    area: SKILL
    path: "skills/delivery/{ci-cd-release,containerization-packaging,platform-runtime-deployment,deployment-devops}/SKILL.md"
    issue: "Enum *_recommendation (READY/READY_WITH_GUARDS/BLOCKED) ở cả 4 skill DevOps không có Decision Rule giải thích ngưỡng, và 3/4 skill cũng thiếu mục Normalizing Output In A Workflow Note."
    recommendation: "Thêm mục Decision Rule và Normalizing Output cho từng skill trong 4 skill trên."
  - id: FE-01
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: MEDIUM
    area: SKILL
    path: "skills/architecture/frontend-architecture/SKILL.md"
    issue: "frontend-experience-design trỏ sang frontend-architecture 2 lần; frontend-architecture không có dòng trỏ ngược lại, khiến agent bắt đầu từ đó sẽ không biết cần chạy UX design trước."
    recommendation: "Thêm dòng handoff đối xứng vào mục When To Use của frontend-architecture."
  - id: FE-02
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: MEDIUM
    area: SKILL
    path: "skills/delivery/frontend-quality-review/SKILL.md"
    issue: "Bước thực thi performance_heuristic liệt kê \"hot rerenders, hydration cost\" -- đúng gate của react-best-practices-review (render_stability, hydration_bundle_cost) -- dù Out Of Scope của frontend-quality-review tuyên bố không đụng render/hydration."
    recommendation: "Bỏ thuật ngữ React-specific khỏi bước thực thi; trỏ rõ sang gate của react-best-practices-review."
  - id: ARCH-01
    priority: P1
    status: FIXED
    fixed_in: "72c8f70"
    severity: LOW
    area: SKILL
    path: "skills/architecture/domain-architecture/SKILL.md, skills/architecture/frontend-architecture/SKILL.md"
    issue: "~48%/~47% mỗi SKILL.md là block canonical pattern chỉ áp dụng cho 1 giá trị architecture_style/frontend_style, nhưng bị nạp vô điều kiện mỗi lần trigger (lần lượt 247 và 229 dòng)."
    recommendation: "Tách sang references/dod-pattern.md và references/module-first-pattern.md (+ .vi.md); giữ pointer có điều kiện trong SKILL.md."
  - id: OBS-01
    priority: P2
    status: OPEN
    severity: LOW
    area: SKILL
    path: "skills/obsidian/{json-canvas,obsidian-bases,obsidian-markdown}/SKILL.md"
    issue: "3 skill dài 600+ dòng mỗi file, không có thư mục references/ -- 3 skill DUY NHẤT trong repo chưa dùng progressive disclosure, dù pattern này đã thiết lập ở nơi khác (code-scan-review, deployment-devops, codex-workflow-chain)."
    recommendation: "Tách nội dung ít dùng (Complete Examples, Functions Reference, bảng Callouts/Diagrams) sang references/; giữ SKILL.md chỉ còn cú pháp core, tần suất cao. Ước tính giảm 35-51% kích thước mỗi skill."
  - id: FE-03
    priority: P2
    status: OPEN
    severity: LOW
    area: SKILL
    path: "skills/architecture/frontend-architecture/SKILL.md, skills/architecture/frontend-experience-design/SKILL.md"
    issue: "\"state\" mang 2 nghĩa khác nhau giữa cặp skill: state_ownership_rules của frontend-architecture (module sở hữu state) vs surface_states của frontend-experience-design (loading/empty/error/success) -- cùng từ, khác khái niệm."
    recommendation: "Đổi tên 1 trong 2 field để tránh va chạm thuật ngữ."
  - id: NB-01
    priority: P2
    status: OPEN
    severity: LOW
    area: SKILL
    path: "skills/notebooklm/SKILL.md, skills/delivery/frontend-quality-review/SKILL.md, skills/delivery/implementation/SKILL.md"
    issue: "notebooklm có fallback khi auth lỗi nhưng không có khi MCP/network/uvx lỗi, dù CLAUDE.md yêu cầu rõ phải nêu limitation cho mọi trường hợp tool failure. Riêng biệt, React/Next.js là framework duy nhất có coverage ở s07/s08, chưa có dòng fallback rõ cho Vue/Angular/Svelte."
    recommendation: "Thêm đoạn fallback MCP/network-lỗi cho notebooklm; thêm 1 dòng fallback non-React vào Out Of Scope của các skill React-specific."
  - id: AN-01
    priority: P2
    status: OPEN
    severity: LOW
    area: SKILL
    path: "skills/analysis/system-design/SKILL.md"
    issue: "Mandatory Process của system-design chạy lại toàn bộ nghi thức so sánh option mà brainstorming đã làm, thay vì tiêu thụ recommended_option đã khoá."
    recommendation: "Tiêu thụ thẳng recommended_option từ brainstorming khi đã có; chỉ chạy lại so sánh khi thiếu hoặc yếu."
  - id: AN-02
    priority: P2
    status: OPEN
    severity: LOW
    area: SKILL
    path: "skills/analysis/requirement-analysis/SKILL.md"
    issue: "~20% file là ví dụ YAML minh hoạ, không thuộc hợp đồng bắt buộc."
    recommendation: "Cắt bớt ví dụ minh hoạ hoặc chuyển sang file reference ngắn."
  - id: ARCH-02
    priority: P2
    status: OPEN
    severity: LOW
    area: SKILL
    path: "skills/architecture/domain-architecture/SKILL.md, skills/architecture/database-design/SKILL.md, skills/architecture/frontend-architecture/SKILL.md"
    issue: "ownership_map (domain-architecture), owner_module (database-design) và state_ownership_rules (frontend-architecture) đều được định nghĩa độc lập, không field nào ép chúng phải khớp nhau -- gap traceability, không phải trùng lặp nguyên văn."
    recommendation: "Thêm rule ép giá trị owner_module ở database-design/frontend-architecture phải trace về ownership_map của domain-architecture, flag mismatch thành design_risk thay vì để trôi âm thầm."
  - id: DEVOPS-03
    priority: P2
    status: OPEN
    severity: LOW
    area: DOC
    path: "skills/delivery/{ci-cd-release,containerization-packaging,platform-runtime-deployment,deployment-devops,code-scan-review}/references/*.vi.md"
    issue: "~15 cặp reference EN/VI (30 file) được xác nhận là dịch line-for-line, chưa drift -- nhưng đi ngược quy ước đã công bố của project (\"Vietnamese retained as supplementary reference ... Runtime skills are EN-first\")."
    recommendation: "Quyết định giữ nguyên cặp reference VI đầy đủ hay gộp về 1 reference EN kèm pointer VI, khớp quy ước đã dùng ở cấp SKILL.md."
  - id: TAX-01
    priority: P2
    status: OPEN
    severity: LOW
    area: SKILL
    path: "skills/notebooklm/"
    issue: "notebooklm nằm trực tiếp dưới skills/, không có subfolder, khác mọi skill còn lại (analysis/architecture/delivery/guardrails/orchestration/obsidian)."
    recommendation: "Chuyển sang thư mục skills/tooling/ (hoặc skills/integrations/) mới; cập nhật path trong registry/manifest nếu có tham chiếu tới vị trí cũ."
overall_status: PARTIAL
follow_up_actions:
  - "Quyết định có chạy tiếp batch P2 không, và theo thứ tự nào."
  - "Chạy lại check Governance Authority Sync mới của workflow-pack-audit một lần trước khi bắt đầu P2, để xác nhận không có drift mới phát sinh."
notes: "P0 và P1 đã implement và commit (6297649, 72c8f70). P2 mới ở giai đoạn đề xuất theo đúng mô hình AI proposes, human approves của repo; chưa có file P2 nào bị đụng tới."
```

## Cách Dùng Note Này

- Cập nhật field `status` và `fixed_in` tại chỗ khi finding chuyển từ `OPEN` sang `FIXED`; không xoá finding sau khi đóng để giữ lịch sử.
- Nếu phát hiện drift hoặc overlap mới sau này (vd chạy lại `workflow-pack-audit`), thêm `id` mới theo đúng quy ước `<AREA>-<NN>` thay vì sửa nghĩa của entry đã có.
- `overall_status` ở cuối nên chuyển thành `PASS` khi mọi dòng `P0`/`P1`/`P2` đều `FIXED` (hoặc được defer rõ ràng có lý do ghi trong `notes`).
