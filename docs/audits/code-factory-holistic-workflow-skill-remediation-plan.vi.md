---
language: vi
artifact_id: "code-factory-holistic-workflow-skill-remediation-plan-vi"
artifact_family: audit-plan
work_item_slug: "code-factory-holistic-audit-remediation"
artifact_role: supporting
artifact_kind: portfolio-plan
source_of_truth: false
canonical_source: "code-factory-holistic-workflow-skill-remediation-plan.md"
status: approved-for-authoring
approval: human-approved
approved_by: po
approved_at: 2026-09-03T01:34:46.476Z
last_updated: 2026-09-07
delivery_context: brownfield
planning_track: full
governance_profile: strict
tags:
  - "code-factory"
  - "workflow-audit"
  - "skill-audit"
  - "remediation-portfolio"
---

# Master Plan Rà Soát Và Cải Tiến Toàn Bộ Code-Factory

> [!info] Nguồn chuẩn
> Bản tiếng Anh [[code-factory-holistic-workflow-skill-remediation-plan]] là source-of-truth.
> Bản này giữ nguyên phạm vi, finding, thứ tự và gate nhưng diễn đạt tự nhiên hơn cho người đọc
> tiếng Việt.

> [!warning] Ranh giới phê duyệt
> PO đã phê duyệt phạm vi master plan và thứ tự `P0 → P4` để tiếp tục authoring. Quyết định này
> không tự động phê duyệt bất kỳ child work item, implementation, DoD, Release, Business
> Acceptance, exception hoặc waiver nào. Approval ngày 2026-09-03 chỉ phủ `CF-001..018`;
> PO/BA/Developer/QC đã phê duyệt OQ-CF-004 Option C ngày 2026-09-08, qua đó chấp nhận `CF-019`
> nhưng chưa phê duyệt child work item hay implementation. `CF-020` và `AC-CF-011` vẫn là đề xuất.

## 1. Vì Sao Cần Master Plan Này

Các lần review trước nằm rải rác trong audit report, change package, work item, tài liệu bị ignore và
Git history. Vì vậy người dùng không có một nơi duy nhất để trả lời bốn câu hỏi:

1. Đã rà soát những phần nào của workflow và 42 skill?
2. Finding nào đã đóng, đang làm, còn mở hoặc chỉ là giả thuyết?
3. Nên xử lý theo thứ tự nào và vì sao?
4. Ai quyết định, bằng chứng nào mới đủ để đóng từng finding?

Master plan này là portfolio-level authority cho bốn câu hỏi trên. Workflow điều khiển nó nằm tại
`work-items/code-factory-holistic-audit-remediation/`.

## 2. Phạm Vi Rà Soát

- Authority: global policy, router, governance decision/role model và conflict resolution.
- Workflow: `s01-s08`, SDD full/light, step contract, gate, trusted receipt và protocol.
- Skill pack: 42 `SKILL.md`, trigger, boundary, input/output, schema, reference, EN/VI và khả năng
  tìm thấy trong runtime.
- Runtime: manifest, bundle được sinh, bản cài Codex/Claude và parity.
- Tooling: scaffold, materialize, validator, approval transaction, telemetry và fixture.
- Integration: adapter, hook, MCP và provenance của external skill.
- Delivery: branch/worktree, GitHub Actions, candidate SHA, tag, publish và rollback.
- Portfolio: prior plan, legacy work item, tài liệu bị ignore và tính nhất quán của status.

## 3. Hiện Trạng Đã Kiểm Chứng Ngày 2026-09-07

| Bề mặt | Bằng chứng hiện tại | Ý nghĩa |
|---|---|---|
| Skill source | 42 skill; pack audit cơ học `PASS` | Inventory ổn, nhưng chưa chứng minh chất lượng semantic hoặc UX. |
| Work item | Candidate branch có 26 item: 7 `DONE`, 1 `ARCHIVED`, 2 `VERIFIED`, 16 `MATERIALIZED` | Danh sách còn nhiều legacy/sample gây nhiễu trạng thái. |
| Protocol | 10 protocol-managed pass; 16 legacy bị skip trên candidate branch | Lịch sử chưa có policy phân loại và hiển thị thống nhất. |
| Runtime đang dùng | Codex và Claude đều báo source `2.6.2`, installed `2.3.2`, 40 managed skill | Adaptive governance chưa phải runtime thực tế của người dùng. |
| v2.6.2 child fix | Hosted run `33867082744` pass 10/10; candidate `da49e51167d6dbe2a497aca2201408828099707fb0b1aab3d24b381d405d6690`; commit evidence `fc08bfd` | QC đã duyệt Technical Verification + DoD, DevOps/QC đã duyệt Release, PO đã duyệt Business Acceptance; còn thiếu ba trusted closeout receipt. |
| Parent CR-008 | `VERIFIED` nhưng `F-AG08-001` vẫn mở cho tới khi child đóng và parent được verify lại | Không được kế thừa các approval cũ sang candidate đã sửa. |
| Master plan | Commit `569f48f` đã track bản EN/VI, work item và link từ README/docs map | `CF-001` đã đóng; plan hiện có một authority nhìn thấy được trong repository. |
| Policy role | Adaptive rule bỏ SA/TA khỏi maintenance khi không có trigger; Skill Requirement lại viết như bắt buộc SA/TA ở mọi `s01-s04` | Có conflict ngữ nghĩa cần sửa và khóa bằng fixture. |
| Public docs | Một số trang còn nói `v2.1.1` và 36 skill | Cần phân loại current hay historical trước public handoff. |

## 4. Bảng Finding Tổng

| ID | Mức độ | Vấn đề | Trạng thái | Owner chính |
|---|---|---|---|---|
| CF-001 | HIGH | Không có master plan được track và dễ tìm | `RESOLVED` qua artifact + link này | PO/BA |
| CF-002 | HIGH | Child CR-008 đã `DONE`; parent re-verification và reconciliation residual còn mở | `IN_PROGRESS_PARENT_REVERIFY` | Developer/QC/DevOps/PO |
| CF-003 | HIGH | Source candidate, runtime đang cài và public state lệch nhau | `OPEN` | DevOps |
| CF-004 | HIGH | CHANGE-005 diagram adapter có prerequisite/status cũ | `OPEN` | Developer/QC |
| CF-005 | MEDIUM | Test cross-file còn đọc live work-item note | `OPEN` | Developer/QC |
| CF-006 | HIGH | Chưa có security baseline bao phủ skill, hook, MCP, adapter | `OPEN` | Security/QC |
| CF-007 | MEDIUM | Legacy work item bị skip và hiển thị status gây hiểu sai | `OPEN_DECISION` | Developer/QC |
| CF-008 | LOW | `wfc-demo` rỗng tạo inventory không hợp lệ trên main | `OPEN` | Maintainer |
| CF-009 | HIGH | Schema threshold SA/TA thiếu `binary` nhưng rule lại yêu cầu | `OPEN` | Developer/QC |
| CF-010 | HIGH | Pack audit cơ học vẫn xanh khi CF-009 tồn tại | `OPEN` | Developer/QC |
| CF-011 | MEDIUM | Plan/research còn hành động được đang bị ignore | `OPEN_DECISION` | PO/Maintainer |
| CF-012 | MEDIUM | Chưa có quality gate cho độ tự nhiên và role-friction của EN/VI | `OPEN` | BA/PO |
| CF-013 | MEDIUM | Memory authority/freshness/retention contract chưa được duyệt | `OPEN_DECISION` | PO/Developer/QC |
| CF-014 | LOW | Threshold và trọng số đánh giá SA/TA chưa được hiệu chỉnh | `OPEN_EXPERIMENT` | Architecture lead/PO |
| CF-015 | LOW | Rationalizations/anatomy pilot chưa có evidence | `OPEN_DECISION` | Developer |
| CF-016 | MEDIUM | Main worktree có nhiều WIP untracked dễ nhiễm audit/release | `OPEN` | Maintainer/DevOps |
| CF-017 | HIGH | Local và hosted `.tgz` khác byte dù extracted content bằng nhau | `OPEN` | Developer/DevOps/QC |
| CF-018 | MEDIUM | GitHub action runtime có cảnh báo deprecation | `OPEN` | DevOps |
| CF-019 | HIGH | Câu chữ authority về SA/TA mâu thuẫn với adaptive applicability | `ACCEPTED_PENDING_CHILD` | PO/BA/Developer/QC |
| CF-020 | MEDIUM | Tài liệu current-facing còn version/inventory cũ | `PROPOSED_FINDING` | PO/BA/DevOps |

## 5. Thứ Tự Thực Thi Đã Phê Duyệt

### P0 — Làm Cho Trạng Thái Hiện Tại Trung Thực

1. Linked defect của CR-008 đã `DONE` ở phạm vi child tại commit `eb3aeec`; ba receipt đều khớp
   digest s08 `acdd6b39…dde9`. Parent và branch/worktree vẫn `HOLD_OPEN`.
2. `OQ-CF-004` Option C đã được PO/BA/Developer/QC phê duyệt:
   - `CF-019` được chấp nhận là policy/runtime defect;
   - bước kế tiếp là đề xuất child độc lập, sửa rule SA/TA thành conditional theo applicability,
     thêm semantic fixture và tạo candidate binding mới;
   - quyết định OQ không tự mở child work item hoặc implementation gate.
3. Quay lại parent CR-008:
   - ghi child evidence và disposition của `CF-019`;
   - verify lại Technical Verification → DoD → Release → Business Acceptance trên candidate cuối;
   - chỉ finalize branch/worktree khi parent receipt khớp và cả hai protocol đều `DONE`.
4. Reconcile CHANGE-005 diagram adapter: cập nhật prerequisite CHANGE-004, kiểm lại
   Playwright/Chromium và chỉ mở `s07` khi T0 thực sự pass.
5. Đóng residual test/tree bằng fixture ổn định và two-tree evidence.

### P1 — Đóng Blind Spot Về Governance Và Security

1. Tạo security baseline riêng cho skill, hook, MCP và adapter; chỉ scan/triage, không auto-fix.
2. Chốt policy phân loại legacy: `LEGACY_CLOSED`, actionable, ambiguous, empty-invalid; tuyệt đối
   không tạo receipt hồi tố.
3. Thêm fail-first semantic test cho schema SA/TA, sửa canonical schema và mở rộng pack audit.
4. Nâng GitHub Action runtime và yêu cầu một hosted run không còn cảnh báo deprecation.

### P2 — Cải Thiện Ngôn Ngữ Và Trải Nghiệm Human

1. BA sở hữu rubric; PO chỉ review business promise/tone; Developer hoặc DevOps chỉ tham gia khi
   câu chữ chạm đúng domain; QC kiểm coverage và evidence.
2. Review 100% README/quickstart, approval prompt, error/blocker và release/install instruction.
3. Chấm 5 chiều: rõ ràng, tự nhiên, next action, nhất quán thuật ngữ, role/gate relevance.
4. Pass khi không có lỗi authority/action nghiêm trọng, trung bình `>=4.0/5`, không chiều nào `<3.0`.
5. Mỗi public surface chỉ có một review bundle; không bắt mọi role ký mọi skill.

### P3 — Quyết Định Backlog Tùy Chọn

1. Memory umbrella: thu nhỏ và split hoặc retire; không mở lại trial đã DONE.
2. SA/TA metrics: giữ là experiment cho tới khi có PO sponsor và dữ liệu hiệu chỉnh đủ dài.
3. Rationalizations pilot: làm một skill có kiểm soát hoặc ghi superseded.

### P4 — Đóng Toàn Bộ Portfolio

1. Chạy workflow, pack, protocol, planning, unit, smoke và security checks phù hợp.
2. Semantic review đủ 42 skill và toàn bộ authority/runtime boundary.
3. Reconcile source, Codex, Claude, origin, hosted CI, release và portfolio status.
4. Xuất coverage matrix `PASS|PARTIAL|FAIL|NOT_APPLICABLE` cho từng finding.
5. Chỉ xin QC duyệt DoD khi mọi finding bắt buộc có evidence trực tiếp hoặc exception hợp lệ.

## 6. Tiêu Chí Đóng Portfolio

- 42/42 skill và mọi bề mặt trong phạm vi có inventory/evidence.
- Mỗi prior plan và finding chỉ có một verdict và một authority rõ ràng.
- Mọi finding mở có owner, priority, child boundary, next gate và verify path.
- Portfolio approval không bao giờ được dùng thay child approval.
- Candidate, version, inventory, source/runtime và hosted evidence khớp nhau.
- Mechanical PASS không che được semantic conflict đã biết.
- Có rubric và evidence cho chất lượng ngôn ngữ EN/VI.
- Không còn lifecycle contradiction không giải thích được.
- Release identity có deterministic build hoặc canonicalization rule được phê duyệt.
- Skill Requirement không được gọi role mà applicability router đã loại bỏ.
- Current-facing docs cùng nói một released version và skill inventory; tài liệu lịch sử có nhãn rõ.

## 7. Gate Hiện Tại

Master work item đang ở `s03 Open Questions`, trạng thái `BLOCKED` cho authoring `s04` vì còn bốn
quyết định human:

1. `OQ-CF-001` — PO/Maintainer chọn selective promotion cho tài liệu bị ignore.
2. `OQ-CF-002` — Developer/QC chọn classify-first cho legacy work item; không mint receipt hồi tố.
3. `OQ-CF-003` — BA sở hữu language rubric, PO/QC/domain reviewer chỉ tham gia theo phạm vi.
4. `OQ-CF-005` — PO/BA/DevOps chọn policy current/historical cho version và skill inventory,
   đồng thời disposition CF-020.

`OQ-CF-004` đã chốt **Option C**. Recommendation cho bốn OQ còn lại vẫn là **Option C**. Sau khi
các role tương ứng phê duyệt, bước kế tiếp mới là author `s04 Acceptance + DoR`; chưa được nhảy
sang Task Plan hoặc implementation.

## Traceability

```yaml
source_request:
  - "Xử lý theo thứ tự đã đề xuất."
  - "Làm cho plan review toàn bộ workflow và skill Code-Factory nhìn thấy được."
requirements: ["AC-CF-001..011"]
findings: ["CF-001..020"]
sequence: ["P0.1 -> P0.2 -> P0.3 -> P0.4 -> P0.5 -> P1 -> P2 -> P3 -> P4"]
current_step: "s03 Open Questions"
next_human_action: "Approve or amend OQ-CF-001..005 Option C with their named roles."
```
