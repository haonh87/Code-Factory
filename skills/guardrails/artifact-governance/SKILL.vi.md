---
name: artifact-governance
description: Quyết định nội dung thuộc về đâu trước khi viết để khối lượng tài liệu phụ thuộc vào công việc thay vì số vai trò và skill tham gia. Dùng trước khi tạo hoặc sửa workflow artifact và khi nhiều vai trò đóng góp vào cùng một bước. Trả lời ba câu hỏi - fact này đã có owner chưa, đóng góp này có xứng đáng thành file riêng không, và root nào sở hữu lớp nội dung này. Không định dạng nội dung, không chọn tên file và không thực thi rule.
language: vi
---

# Artifact Governance

> English: `SKILL.md`

Thêm một vai trò chỉ nên thêm một góc nhìn, không thêm một file. Thêm một skill vào một bước chỉ
nên thêm một section, không tạo thêm bản sao của context mà bước đó đã sở hữu.

Skill này chạy trước khi viết artifact. Đây là quyết định về vị trí, không phải quy tắc trình bày.

## Khi Nào Dùng

- Trước khi tạo file trong `work-items/`, `product-specs/`, `changes/` hoặc `docs/`.
- Trước khi thêm block vào một step note.
- Khi có nhiều hơn một vai trò hoặc skill đóng góp vào cùng một bước.
- Khi một report, audit hoặc review định kỳ được tạo lần thứ hai.

Bỏ qua với source code, test và configuration. Các loại đó có cấu trúc riêng.

## Rule 1 — Chia Theo Đơn Vị Công Việc, Không Theo Người Đóng Góp

Đóng góp của một vai trò cho một bước là một **section trong primary note của bước đó**. Nó không
phải là file đặt tên theo vai trò.

Tiền lệ: BMAD-METHOD chạy **chín** vai trò — Analyst, PM, Architect, PO, Scrum Master, Dev, QA,
UX, Orchestrator — và tạo **không** file theo vai trò. Trục phân chia là story, tức đơn vị công
việc. Kiro cố định ba file cho mỗi feature, Spec Kit ba file, OpenSpec ba đến bốn file; tất cả đều
không phụ thuộc số người đóng góp.

Hậu quả khi thiếu rule này được đo trong `references/worked-example.md`: schema chỉ chứa một
`role` cùng tên file không có vị trí cho role khiến hai worker không thể cùng được biểu diễn. Trong
sample của chính repository này, `merge-report` tuyên bố merge `S07-FRONTEND-001`, nhưng handoff
artifact của assignment đó không tồn tại và cũng không thể tồn tại.

## Rule 2 — Một Fact, Một Owner

Mỗi fact có đúng một owning block. Mọi nơi khác hoặc dẫn xuất, hoặc tham chiếu, hoặc không dùng nó.

Trước khi tham chiếu, hãy thử xóa: nếu một bản sao có thể dẫn xuất từ owner, nó không phải ứng viên
cho pointer mà là ứng viên để loại bỏ. Thay bản sao stale bằng pointer stale không phải là tiến bộ.

Các field đang tranh chấp, owner, cú pháp tham chiếu và constraint buộc migrate reader khi xóa về
sau nằm trong **`references/ownership-table.md`**.

## Rule 3 — Mỗi Lớp Nội Dung Có Đúng Một Root

| Lớp | Root sở hữu | Ghi chú |
|---|---|---|
| Spec | `product-specs/` | Card, BRD, SRS. Step note tham chiếu requirement và AC id; không chép lại nội dung. |
| Design | `work-items/<slug>/*.s06.*` với Light, `*.s05.*` với full | |
| Plan | Cùng note với Design trong Light | |
| Progress | `work-items/<slug>/*.s07.*` | Protocol state nằm trong `<slug>.work-item-report.json`, do CLI sở hữu. |
| Verify | `work-items/<slug>/*.s08.*` | |
| Decision | `## Option Analysis` / `design_decisions` của owning step note; governance exception nằm trong `project-context/governance-exception-register.md` | |

Nội dung không thuộc một trong sáu lớp này không phải workflow artifact. Nó là tài liệu đã publish
hoặc scratch. Scratch phải được gitignore và không bao giờ commit vào governed root.

### Supersede, Không Tích Lũy

Artifact định kỳ — audit, review, report — có **một stable path** và được ghi đè tại chỗ. Lịch sử
nằm trong git. Nếu thực sự cần snapshot có ngày, đặt nó trong subdirectory `archive/` của chính
root sở hữu, không đặt cạnh file canonical.

### Kết Luận Cho Các Collision Đã Đo

Áp dụng Rule 3 cho các census finding từ `F1` đến `F8`:

- **`docs/release/` và `docs/releases/`** trộn hai lớp. `docs/releases/` sở hữu release record,
  một file mỗi version, mang tính lịch sử và không supersede. Các file positioning và readme trong
  `docs/release/` là tài liệu publish, không phải release record; chúng phải được chuyển đi và
  directory trùng phải được xóa.
- **Bốn skill-pack audit report tích lũy** vi phạm supersede. Một stable path sở hữu audit;
  post-fix và review có ngày phải chuyển vào `archive/`.
- **Sáu file rời ở repository root.** `AGENTS.md` và `CLAUDE.md` là output cài đặt của `wfc install`,
  không phải authored artifact — cần gitignore. `Meeting.md`, `Booking.md`, `Daily.md`,
  `Untitled.base` không thuộc lớp nào — chúng là scratch và phải rời governed root.
- **`tmp-codex-home/`, `tmp-wfc-init-check/`** là test scratch — cần gitignore.

## Quy Trình Quyết Định

Chạy quy trình này trước khi viết. Mọi path kết thúc ở một owning section, một filename đã đăng ký
hoặc một quyết định từ chối. **Không nhánh nào trả về path tự nghĩ ra.**

```text
Bạn chuẩn bị viết một phần nội dung.

1. Nó thuộc lớp nào trong sáu lớp?
   └─ không thuộc lớp nào
      └─ DỪNG. Đây không phải workflow artifact. Nó là scratch hoặc tài liệu
         publish. Không đặt nó vào governed root.

2. Fact này đã có owner trong references/ownership-table.md chưa?
   └─ có
      └─ KẾT THÚC: viết vào owning block. Không tạo gì mới.

3. Threshold test — có câu trả lời nào là có không?
   a. Concurrent writers: hai actor có viết artifact này cùng lúc trong
      process hoặc worktree riêng đến mức một file sẽ gây conflict không?
   b. Independent addressability: cơ chế bên ngoài có phải hash, sign hoặc
      resolve artifact qua path riêng không?
   c. Independent lifecycle: nó có được tạo, supersede hoặc archive vào thời
      điểm khác bởi actor khác với host note không?
   └─ tất cả đều không
      └─ KẾT THÚC: dùng một section trong primary note của bước.

4. Naming convention đã đăng ký filename cho nó chưa?
   └─ có
      └─ KẾT THÚC: dùng tên đó và link từ primary note.
   └─ không
      └─ DỪNG. Không tự nghĩ tên. Hoặc đăng ký tên trước — một human decision —
         hoặc quay về dùng section.
```

Kết luận mẫu cho bốn loại runtime artifact cùng lập luận nằm trong
`references/worked-example.md` §3. Cả bốn đều là section. **Step note** là trường hợp đối lập trả
lời có ở 3b vì `wfc gate approve` hash nó theo path vào trusted receipt.

## Skill Này Không Sở Hữu Gì

Việc nêu rõ ranh giới là cần thiết: một governance skill có boundary mơ hồ sẽ trở thành nguồn
overlap tiếp theo.

| Concern | Owner |
|---|---|
| Cách định dạng nội dung — wikilink, callout, cú pháp frontmatter | `obsidian-markdown` |
| Filename nào tồn tại và note template | `wfc scaffold` và `workflow-step-definitions.js` |
| Thực thi các rule ở đây | `wfc validate` — chưa được xây dựng, xem phần dưới |
| Một bước cần các block nào | `codex-workflow-chain` |
| `## Work Item Protocol`, protocol state, audit event | `wfc` CLI, sinh từ `<slug>.work-item-report.json`. **Không bao giờ viết tay** — protocol transition tiếp theo sẽ ghi đè. |

Skill này chỉ quyết định **nội dung nằm ở đâu**.

## Trạng Thái Thực Thi

Các rule này **chưa được kiểm tra bằng máy**. Chúng đã được kiểm tra thủ công với một work item
nhiều vai trò thực tế trước khi được ghi lại, còn enforcement check là phase sau.

Cho đến lúc đó, violation vẫn vô hình; đó chính là cách `docs/` đã drift. Nếu chưa chắc một rule có
áp dụng hay không, hãy áp dụng — chi phí của section lẽ ra có thể là file thấp hơn nhiều so với
chi phí của một file mà không rule nào quản lý.

## Dấu Hiệu Cảnh Báo

Dừng lại nếu bắt gặp một trong các suy nghĩ sau:

- "Tôi sẽ đặt nội dung này vào file mới rồi link sau."
- "Vai trò này cần document riêng."
- "Tôi sẽ chép path vào đây để người đọc không phải cuộn."
- "Không có rule cho trường hợp này nên tôi sẽ chọn một cách hợp lý."
- "Tôi sẽ viết summary ở đây và tự đồng bộ detail ở nơi khác."
- "Report đã tồn tại nên tôi sẽ thêm bản `-v2` / có ngày."
