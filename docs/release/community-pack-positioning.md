---
title: Community Pack Positioning — Code-Factory public release
date: 2026-06-23
status: proposal
decision_owner: human (brand gate)
current_release: workflow-bundle v2.1.1
---

# Community Pack Positioning — Proposal

> Đây là **proposal** (AI proposes, human approves). Việc chốt tên / tagline / định vị cho public release là **human-controlled brand gate** — mình chỉ đề xuất, không tự chốt.
> Sau khi human chốt, mới mở work item public-release và đi `s04→s05→s06→s07`.

## 1. Linh hồn sản phẩm (soul)

Code-Factory không phải **bộ skill** hay **spec template** — nó là **governed delivery runtime**:

- Chuỗi 8 bước `s01 Clarify → s08 Verify + DoD` với state machine.
- `AI proposes, human approves` ở **mọi gate** (Spec, Contract, DoR, Approach, Foundation, Task Plan, UAT, DoD, Release, Business Acceptance).
- **Enforce** bằng `wfc` CLI + hooks + validator — không phải khuyến khích agent tự tuân thủ.
- Overlay: governance, SDD, role signoff, DevOps lane (container → platform → CI/CD), brownfield/greenfield discipline.

→ **Moat = governance runtime**. Skill copy được, validator + human-gate thì không.

## 2. Bảng so sánh định vị (public-facing)

| Khía cạnh | superpowers | spec-driven (spec-kit) | **Code-Factory** |
|-----------|-------------|------------------------|------------------|
| Bản chất | skill pack nâng capability | workflow spec→plan→tasks→code | governed delivery chain + validator runtime |
| Ép buộc | suggest (agent tự tuân) | structure (spec làm SOT) | **enforce** (`wfc` + hooks + state machine) |
| Con người | đề xuất, agent quyết | spec | **human-controlled gate tường minh** |
| Độ nặng | nhẹ | trung | nặng (governance, role signoff, SDD, DevOps lane) |
| Phù hợp | cá nhân muốn agent giỏi hơn | team cần spec kỷ luật | team cần AI code **có kiểm soát, có audit** |

## 3. Đề xuất tên + tagline (3 combo, chọn 1)

### Combo A — Giữ Code-Factory, thêm Charter làm tagline (khuyến nghị)
- **Repo:** `Code-Factory`
- **Pack công cộng:** `code-factory` (npm), CLI `wfc`
- **Tagline:** *"Code-Factory — The Charter for Governed AI Delivery"*
- **1-liner:** *"AI proposes. Human approves. Code ships."*
- ✅ Giữ brand nội bộ, tận dụng `wfc` đã quen.
- ⚠️ "code-factory" phổ biến trên GitHub/npm → SEO khó; cần disambig bằng tagline "Charter".

### Combo B — Tách tên riêng "Charter" cho pack công cộng
- **Repo nguồn:** `Code-Factory` (internal)
- **Pack công cộng:** `charter` / `charter-cli` (npm), CLI `wfc`
- **Tagline:** *"Charter — governed delivery for AI coding agents"*
- ✅ Ownable hơn "code-factory"; "charter" nối tiếp khái niệm `constitution` + `project-context` đã có.
- ⚠️ "charter" cũng có đụng — cần check npm/USPTO; có thể phải `charter-cli` hoặc `charterflow`.

### Combo C — Tên thủ công/craft (Forge family)
- **Pack công cộng:** `forge` / `agentforge` / `smithy`
- **Tagline:** *"Forge — ship AI code with discipline"*
- ✅ Ngắn, gợi "xưởng đúc có khuôn", dễ nhớ.
- ⚠️ Đụng nhiều: Atlassian Forge, GitForge, Google Anvil → rủi ro cao nhất trong 3 combo.

**Khuyến nghị:** **Combo A** cho giai đoạn đầu (rủi ro thấp nhất, tận dụng asset), chuyển sang **Combo B** khi muốn owns brand riêng sau khi kiểm trademark xong.

## 4. Elevator pitch (dùng mọi nơi)

> Code-Factory là một **governed delivery workflow** cho AI coding agent: chuỗi 8 bước từ Clarify → Verify + DoD, mỗi gate do **human kiểm duyệt** và **enforce bằng CLI `wfc` + hooks** — không phải bộ skill khuyến khích, mà là runtime bắt agent tuân kỷ luật trước khi chạm production code.

## 5. Narrative arc (câu chuyện định vị)

> "Superpowers cho agent **năng lực**. Spec-driven cho agent **cấu trúc**. Code-Factory cho agent **kỷ luật** — và kỷ luật là thứ duy nhất agent không tự có."

## 6. Cấu trúc README hero (public repo)

1. **Hook 1 dòng:** *"Stop your AI agent from shipping unreviewed code."*
2. **Vấn đề (3 gạch đầu dòng):**
   - Agent đi đường ngắn nhất, tự tuyên bố `done`.
   - Bỏ test/spec/review → production risk.
   - Không audit trail cho ai approve cái gì.
3. **Khác biệt:** bảng so sánh mục 2.
4. **Quick start (3 lệnh):**
   ```bash
   npx wfc install --mode claude --scope global
   wfc init
   wfc scaffold --work-item my-first-feature
   ```
5. **Proof:** screenshot luồng gate, ví dụ work-item materialized, badge `v2.1.1`, "36 managed skills, 8-step chain, human-controlled gates".
6. **Starter vs Full pack:** (xem mục 7).

## 7. Cấu trúc pack cho cộng đồng (tier)

| Tier | Nội dung | Dành cho |
|------|----------|----------|
| **Starter** | `wfc` + chain 8 step + 3 skill cốt (clarify, approach, DoD) | cá nhân / dự án mới |
| **Standard** | + governance overlay + TDD/review discipline + instincts | team nhỏ |
| **Full** | + SDD overlay + DevOps lane + role signoff + strict profile | team enterprise / regulated |

- Tách rõ **prescriptive vs optional** — người mới bật Starter, mature team bật `strict` profile (`CF_HOOK_PROFILE=strict`).
- Document rõ `CF_HOOK_PROFILE=minimal|standard|strict` để onboarding không bị "ngợp" governance nặng.

## 8. Kênh launch

- **GitHub:** repo + topic tags `ai-agent`, `agent-ops`, `llm-workflow`, `claude-code`, `codex`, `spec-driven`, `governance`, `ai-coding`.
- **Blog bài cột sống:** *"Why superpowers isn't enough: the case for governed AI delivery"* — so sánh tư tưởng, không bôi nhọ.
- **Demo video 3 phút:** 1 feature request → agent cố implement → gate chặn → human approve → ship.
- **Listing:** Awesome Claude Code, Awesome Codex, Trendshift, Product Hunt.
- **MCP/skill marketplace:** publish như plugin (plugin marketplace pattern như `addyosmani/agent-skills`).

## 9. Lưu ý pháp lý / trademark (phải check trước khi chốt)

- [ ] Check `github.com/topics/<tên>` + search GitHub toàn văn.
- [ ] Check npm registry `<tên>` và `<tên>-cli`.
- [ ] Check USPTO / EUIPO trademark database.
- [ ] Google `"<tên>" ai workflow` / `"<tên>" agent`.
- [ ] Đánh giá đụng: "code-factory" (cao), "charter" (trung), "forge" (rất cao).
- [ ] Tên lệnh không dấu tiếng Việt, pronounceable quốc tế (`wfc`, `charter` OK).
- [ ] Tách **repo name** (Code-Factory) vs **pack name** (charter/code-factory) vs **CLI** (`wfc`) — không bắt buộc cùng tên.

## 10. Bước tiếp theo (Next Human Action)

1. Human review proposal này, **chốt 1 combo tên + tagline** (Combo A / B / C).
2. Chạy checklist trademark mục 9.
3. Mở work item `community-pack-release` qua `wfc scaffold --work-item community-pack-release`.
4. Đi `s04 Acceptance + DoR` → `s05 Technical Approach` (packaging, npm publish surface, README hero) → `s06 Task Plan` → `s07 Implement` → `s08 Verify + DoD`.
5. `s08` phải có release readiness + handoff sang lane deploy (publish npm + GitHub release).

## Traceability
- soul (governance runtime) ← moat (enforce vs suggest) ← positioning table ← naming combo → README hero → launch.
- governance: brand gate là human-controlled; proposal này chưa mở implementation path.