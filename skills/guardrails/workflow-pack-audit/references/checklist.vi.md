---
language: vi
---

# Workflow Pack Audit Checklist

> English: checklist.md

## 1. Skill Folder Và Frontmatter

- Tên folder skill phải khớp `name` trong frontmatter.
- `description` phải nêu rõ trigger, không chỉ mô tả chung chung.
- Không được có 2 skill trùng `name` vì runtime Codex cài theo layout phẳng `~/.codex/skills/<skill-name>`.
- Nếu skill mới là skill người dùng có khả năng gọi trực tiếp nhiều lần, nên có `agents/openai.yaml`.

## 2. Workflow-Chain Mapping

- Nếu skill tác động step 5, 7 hoặc 8, phải có mặt trong step table tương ứng ở `workflow-chain.md`.
- Nếu step table nhắc một block mới như `## Review Findings` hoặc `## Implementation Notes`, template step tương ứng cũng phải có block đó.
- Nếu template nhắc schema của một skill, mục `### \`<skill-name>\`` cũng phải tồn tại trong phần schema catalog.

## 3. Đồng Bộ Authority Governance

- Mỗi heading `## Hard Rule: ...` trong `policies/codex/AGENTS.global.md` phải có heading `## Hard Rule: ...` khớp trong `skills/orchestration/codex-workflow-chain/SKILL.md`, đúng nguyên văn (chạy `grep -n "^## Hard Rule" <file>` trên cả hai rồi diff danh sách heading).
- Một hard rule chỉ có ý nghĩa ở tầng router/entry (ví dụ `Router Before Action`, `Generic Coding Defaults Do Not Open A Gate`) có thể nằm ở `workflow-governance-router/SKILL.md` thay vì ở `codex-workflow-chain`, nhưng vẫn phải tồn tại nguyên văn ở ít nhất một skill file; không được để chỉ tồn tại ở `AGENTS.global.md` mà không có bản đối chiếu ở tầng skill.
- Nếu phần nội dung của rule (điều kiện eligibility, escalation trigger, gate host contract) dài, bản skill được phép tóm tắt, nhưng phải nêu rõ file nào là authority đầy đủ (ví dụ `Full authority for this rule is policies/codex/AGENTS.global.md § Hard Rule: <name>`) thay vì bỏ sót rule một cách im lặng.
- Check này là so khớp heading nguyên văn, không phải so khớp diễn giải: một rule tồn tại dưới heading diễn đạt khác (vd `Prefer The Smallest Sufficient Solution` vs `Prefer The Smallest Solution That Is Correct`) vẫn tính là drift và phải bị flag.
- `references/workflow-chain.md` trong `codex-workflow-chain` diễn giải lại cùng bộ Hard Rule cho mục đích step-mapping; heading của nó cũng phải khớp `AGENTS.global.md` 1:1 vì cùng lý do.

## 4. Template Và Schema

- Step 5:
  - Skill design/frontend specialized phải đi vào `## Architecture Details`.
- Step 7:
  - Skill implement specialized phải không thay thế `## Artifact Chính`; nếu cần, đi vào `## Implementation Notes`.
- Step 8:
  - Skill review specialized phải dùng `## Review Findings` hoặc block review tương đương, không đẩy vào `## Scan Summary`.

## 5. Boundary Giữa Các Skill

- `frontend-experience-design` phải rõ là design trước khi code.
- `frontend-architecture` phải rõ là source-code boundary và ownership.
- `react-web-implementation` phải rõ là guidance step 7.
- `frontend-quality-review` phải rõ là screen-level UX/accessibility/responsive review.
- `react-best-practices-review` phải rõ là React render/data boundary review.
- Nếu hai skill gần nhau về phạm vi, ít nhất một trong hai phải có mục `Không Thuộc Phạm Vi` hoặc decision rule để phân vai.

## 6. Cross-Reference Và Runtime Layout

- Mọi path tham chiếu chéo giữa skill phải đúng với layout runtime phẳng sau khi cài global.
- Không dùng path chỉ đúng trong cấu trúc nhóm của repo nếu runtime thực tế không còn giữ grouping đó.
- Nếu skill nhắc `references/...` hoặc `scripts/...`, file tương ứng phải tồn tại thật.

## 7. Script Và Check Tự Động

- Script audit nên bắt được ít nhất:
  - frontmatter hợp lệ
  - folder name match
  - unique skill name
  - workflow-chain tồn tại
  - các marker/template/schema cốt lõi tồn tại
  - heading `## Hard Rule` khớp nhau giữa `policies/codex/AGENTS.global.md` và `skills/orchestration/codex-workflow-chain/SKILL.md` (và `references/workflow-chain.md`)
- Những gì script chưa bắt được phải nằm trong checklist semantic này.

## 8. README Và Tài Liệu Repo

- Nếu skill mới làm thay đổi cách maintain repo, cân nhắc bổ sung vào README hoặc note vận hành.
- Không bắt buộc liệt kê mọi skill trong README, nhưng README không được mâu thuẫn với runtime model hiện tại.

## 9. Kết Luận Audit

- `PASS`: không có mismatch blocker, không còn drift template/schema quan trọng.
- `PARTIAL`: repo chạy được nhưng còn warning hoặc semantic gap nhỏ.
- `FAIL`: có conflict runtime, thiếu schema/block bắt buộc, hoặc trigger/boundary mâu thuẫn rõ.
