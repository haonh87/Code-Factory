# Skills Taxonomy

Tài liệu này giải thích cấu trúc thư mục `skills/` để publish repo rõ ràng hơn.

## Nhóm Chính

- `skills/orchestration/`: host workflow và flow điều phối chính.
- `skills/analysis/`: skill làm rõ yêu cầu, business intent và technical option.
- `skills/architecture/`: skill chốt boundary, schema, domain và frontend structure.
- `skills/delivery/`: skill planning, implementation, testing, review và DevOps delivery.
- `skills/guardrails/`: skill contract, readiness, audit và quality gate.
- `skills/obsidian/`: skill materialize artifact theo Obsidian Markdown, Bases và Canvas.

## Top-Level Integration Skills

- `skills/notebooklm/`: integration skill theo thiết kế, đứng top-level vì nó là external tool capability dùng xuyên nhiều phase, không thuộc riêng `analysis`, `delivery` hay `guardrails`.

Quy tắc:

- top-level chỉ dùng cho integration skill hoặc tool-facing skill dùng ngang nhiều nhóm
- skill nghiệp vụ thông thường phải nằm trong một nhóm taxonomy rõ
- folder cuối cùng của skill phải khớp `name` trong frontmatter của `SKILL.md`

## Publish Rules

- dùng `orchestration/codex-workflow-chain/SKILL.md` làm shape chuẩn cho skill docs
- không tạo hai skill trùng `name`
- nếu một skill là external integration, mô tả rõ điều đó trong `description` hoặc README nhóm
