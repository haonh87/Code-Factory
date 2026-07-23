---
language: vi
name: workflow-pack-audit
description: Audit một workflow pack hoặc skill pack trong repo local để phát hiện drift giữa skill, workflow-chain, frontmatter, runtime flat-layout, schema, template block và cross-reference. Dùng khi vừa thêm hoặc sửa skill, workflow reference, script, adapter hoặc trước khi publish/cập nhật gói workflow cho Codex.
---

# Workflow Pack Audit

> English: SKILL.md

Audit tính nhất quán của workflow pack theo hai lớp: kiểm tra cơ học bằng script và rà soát ngữ nghĩa bằng checklist.

## Mục Tiêu

- Phát hiện drift giữa folder skill, frontmatter, workflow-chain, template block và schema tham chiếu.
- Kiểm tra an toàn cho runtime flat-layout của Codex, nhất là uniqueness của skill name.
- Phát hiện mismatch giữa skill mới thêm và vị trí của nó trong step mapping hoặc workflow template.
- Tạo báo cáo audit đủ rõ để quyết định có thể bàn giao hoặc publish workflow pack hay chưa.

## Khi Sử Dụng

- Sau khi thêm mới hoặc sửa skill trong `skills/`.
- Sau khi sửa `workflow-chain.md`, template step, schema block hoặc runtime reference.
- Trước khi cài global hoặc publish phiên bản workflow pack mới.
- Khi nghi ngờ repo có drift giữa skill docs, workflow docs và layout runtime của Codex.

## Không Thuộc Phạm Vi

- Không thay thế `step-goal-auditor` cho audit một work item cụ thể.
- Không thay thế test hành vi của app hoặc MCP server.
- Không thay thế review thủ công về nội dung business hoặc technical correctness sâu.
- Không tự sửa hàng loạt ngoài phạm vi audit nếu chưa có quyết định rõ.

## Đầu Vào Tối Thiểu

- `repo_root`
- `audit_scope`
- `recent_changes` nếu có

`audit_scope` nên nêu ít nhất:
- audit toàn repo hay chỉ một nhóm skill
- có vừa thêm skill mới hay không
- có sửa `workflow-chain` hoặc template step hay không

## Tài Nguyên Kèm Theo

- Chạy audit `npm run validate:workflow:pack-audit` (Node, canonical) trước để lấy deterministic checks. Bản cũ `scripts/audit-workflow-pack.ps1` đã deprecated, chỉ giữ để tham khảo.
- Sau đó đọc `references/checklist.md` và rà các mục semantic còn lại cho vùng vừa thay đổi.
- Nếu cần note mẫu để ghi kết quả audit, dùng `templates/audit-report.sample.md`.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
audit_scope: ""
checks:
  - id: ""
    status: PASS|FAIL|WARN
    evidence: ""
findings:
  - severity: HIGH|MEDIUM|LOW
    area: SKILL|WORKFLOW_CHAIN|TEMPLATE|SCHEMA|RUNTIME_LAYOUT|SCRIPT|DOC
    path: ""
    issue: ""
    recommendation: ""
overall_status: PASS|FAIL|PARTIAL
follow_up_actions: []
notes: ""
```

## Ý Nghĩa Từng Output

- `audit_scope`: phạm vi repo hoặc nhóm skill đang được audit.
- `checks`: kết quả của từng check cơ học hoặc semantic.
- `findings`: drift hoặc mismatch cụ thể kèm đường dẫn và hướng xử lý.
- `overall_status`: kết luận tổng thể của audit.
- `follow_up_actions`: việc cần làm trước khi cài global, merge hoặc publish.
- `notes`: giới hạn hoặc ghi chú thêm của đợt audit.

## Chuẩn Hóa Output

- Nếu audit được lưu thành note `.md`, dùng `obsidian-markdown`.
- Giữ block YAML của audit làm nguồn sự thật, không tách findings ra prose rời rồi bỏ mất schema.
- Khi audit chạm workflow pack này, path tham chiếu phải bám layout runtime phẳng của Codex.

## Luồng Thực Thi

1. Chạy `npm run validate:workflow:pack-audit` (hoặc `node packages/workflow-bundle/scripts/audit-workflow-pack.js --repo-root <repo_root>`) để lấy deterministic checks.
2. Tải `references/checklist.md` và rà các mục semantic cho vùng vừa thay đổi.
3. Tập hợp `checks` từ script và bổ sung `findings` cho các drift không kiểm được bằng script.
4. Kết luận `overall_status`:
   - `PASS` nếu không có `FAIL`
   - `PARTIAL` nếu chỉ còn `WARN` hoặc semantic gap nhẹ
   - `FAIL` nếu có mismatch blocker
5. Ghi `follow_up_actions` rõ ràng trước khi bàn giao.

## Quy Tắc Chất Lượng

- Mặc định báo cáo bằng tiếng Việt.
- Mọi kết luận phải chỉ ra path hoặc marker cụ thể.
- Không gắn `PASS` nếu chỉ mới grep tên skill mà chưa kiểm tra template/schema tương ứng.
- Nếu script pass nhưng checklist semantic fail, kết luận không được là `PASS`.
- Tài liệu văn bản phải lưu UTF-8 và giữ nguyên tiếng Việt có dấu.

## Điều Kiện Hoàn Tất

- Đã chạy script audit cơ học.
- Đã rà checklist semantic cho vùng thay đổi.
- Có `overall_status` và `follow_up_actions` đủ rõ để người maintain quyết định bước tiếp theo.
