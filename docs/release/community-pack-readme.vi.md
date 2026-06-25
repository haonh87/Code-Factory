---
title: Code-Factory — Tổng quan bản cộng đồng
date: 2026-06-23
status: proposal
language: vi
audience: cộng đồng / onboarding công khai
parent_positioning: docs/release/community-pack-positioning.md
canonical_release: workflow-bundle v2.1.1
---

# Code-Factory

> Tiếng Anh / English: community-pack-readme.md

> **The Charter for Governed AI Delivery.**
>
> *AI đề xuất. Human phê duyệt. Code được ship.*

Code-Factory là một **governed delivery workflow** cho AI coding agent. Nó giữ một chuỗi 8 bước — từ `Clarify` đến `Verify + Definition of Done` — trong đó mọi gate chạm production đều do **human kiểm duyệt**, và việc tuân thủ được **enforce bằng runtime** (`wfc` CLI, hooks, và một validator state machine) thay vì phó mặc cho kỷ luật tự thân của agent.

Nó không phải một skill pack *khuyến khích* hành vi tốt. Nó là runtime *bắt buộc* hành vi đó trước khi agent được phép viết production code.

---

## Vì sao

Các AI coding agent hiện đại tối ưu cho đường ngắn nhất. Tốt cho tốc độ, nguy hiểm cho delivery. Thực tế sinh ra ba lỗi lặp lại:

- **Tự tuyên bố "done" non.** Agent tuyên bố task hoàn tất sau một lượt test cục bộ, không có bằng chứng rằng acceptance criteria, regression risk hay governance constraint đã được đáp ứng.
- **Bỏ spec và design.** Một feature request bị coi như authorization để implement ngay, lách qua acceptance criteria, technical approach và task planning.
- **Không audit trail.** Không có bản ghi *ai approve cái gì*, *khi nào*, hay *theo criteria nào* — nên một human reviewer không thể dựng lại được production code ra sao.

Code-Factory tồn tại để các lỗi này về mặt cấu trúc là không thể xảy ra, không chỉ "khuyến khích đừng làm".

---

## Đây là gì

| Lớp | Trách nhiệm |
|-------|----------------|
| **Authority layer** | Hard rule, hard gate, conflict resolution, default an toàn (`AGENTS.global.md`, project `CLAUDE.md`). |
| **Entry router** | Một meta-skill phân loại task, xác định current step, và chặn implementation path cho tới khi gate mở. |
| **Workflow backbone** | Chuỗi 8 bước `s01 → s08` với state machine và governance rule chi tiết (`codex-workflow-chain`). |
| **Step skill** | Skill domain cho analysis, architecture, delivery, guardrails và artifact Obsidian — chỉ invoke sau khi router chốt step. |
| **Runtime + validator** | `workflow-bundle` (`wfc` CLI), support policy, validator, và capability control materialize, validate, enforce workflow state. |

Agent được phép phân tích, draft artifact, đề xuất option, đề xuất approach, đề xuất task plan, implement, chạy test, tổng hợp evidence. Agent **không** được approve work item, pass gate, hay tuyên bố `DONE`. Những việc đó do human kiểm soát, theo kiến trúc.

---

## Khác biệt thế nào

| Khía cạnh | Skill pack (vd *superpowers*) | Spec-driven (vd *spec-kit*) | **Code-Factory** |
|--------|----------------------------------|-------------------------------|------------------|
| Bản chất | Skill nâng capability agent | Cấu trúc spec → plan → tasks → code | Một governed delivery chain **cộng validator runtime** |
| Ép buộc | Khuyến khích; agent tự tuân | Cấu trúc; spec là SOT | **Enforce** qua `wfc` CLI, hooks, và state machine |
| Vai trò human | Tư vấn; agent quyết | Spec hóa intent | **Human-controlled gate tường minh** kèm signed receipt |
| Độ nặng | Nhẹ | Trung | Nặng — governance, role sign-off, SDD overlay, DevOps lane |
| Phù hợp | Cá nhân muốn agent giỏi hơn | Team cần spec kỷ luật | Team cần AI code **có kiểm soát, có audit** |

> *Superpowers cho agent **năng lực**. Spec-driven cho agent **cấu trúc**. Code-Factory cho agent **kỷ luật** — và kỷ luật là thứ duy nhất agent không tự có.*

---

## Khái niệm cốt lõi

### Chuỗi 8 bước

| Step | Tên | Mục đích |
|------|------|---------|
| `s01` | Clarify | Biến request thô thành bản hiểu chung, draft scope, và governance context. |
| `s02` | Business Goal | Chốt business objective, giá trị mong đợi, và non-goal. |
| `s03` | Open Questions | Nêu missing input, conflict, governance blocker, và decision owner. |
| `s04` | Acceptance + DoR | Chốt acceptance criteria đo được và verdict Definition of Ready. |
| `s05` | Technical Approach | Chọn approach nhỏ nhất đủ đúng, boundary bị tác động, và validation plan. |
| `s06` | Task Plan | Tạo task plan execution-oriented, có thứ tự, verify được. |
| `s07` | Implement | Thực hiện change, TDD cho behavior change, worktree cho change lớn/rủi ro, review sớm, delegation chỉ cho task độc lập. |
| `s08` | Verify + DoD | Kết luận với evidence, coverage, governance compliance, và verdict Definition of Done. |

### Human-controlled gate

Một gate chỉ được coi là pass khi **cả ba** điều kiện đúng: artifact nguồn sự thật của step đã cập nhật, evidence đủ cho reviewer, và approver đúng authority đã signoff. Các gate gồm `Spec`, `Contract`, `DoR`, `Approach`, `Foundation Decision`, `Task Plan`, `UAT`, `DoD`, `Release`, và `Business Acceptance`.

Approval phải **tường minh**. Không bao giờ suy diễn từ comment tích cực, một lượt review kỹ thuật pass, test pass cục bộ, hay việc tồn tại draft artifact.

### Enforce, không khuyến khích

Việc tuân thủ do runtime kiểm, không do thiện chí:

- `wfc validate` — validate workflow artifact và gate state trước handoff.
- `wfc scaffold` / `wfc scaffold-step` — materialize work item và step note với naming, frontmatter, governance block đồng nhất.
- `wfc status` — báo current step, gate status, và missing gate.
- Hooks — `PreToolUse` / `PostToolUse` / `Stop` track TDD discipline, persist context, và đề xuất behavioral instinct.

### Overlay

- **Governance overlay** — constitution, project context, checklist, và model exception/waiver với authority tường minh.
- **SDD overlay** — spec-driven development với `BRD/SRS`, requirement ID, spec freeze, spec change, và spec coverage khi scope yêu cầu.
- **DevOps lane** — `containerization-packaging`, `platform-runtime-deployment`, và `ci-cd-release` cho scope chạm image, runtime deploy, promotion, và rollback.
- **Brownfield discipline** — hệ thống hiện có là baseline đang vận hành; default là *delta nhỏ nhất đủ đúng*, và `Foundation Decision` chỉ mở khi change thực sự rewrite boundary kiến trúc.

---

## Bắt đầu nhanh

Yêu cầu: `node >= 18`, `npm >= 9`, `~/.codex` hoặc `~/.claude` writable.

```bash
# Cài vào Claude Code (scope global)
npx wfc install --mode claude --scope global

# Khởi tạo work items root trong project
wfc init

# Scaffold work item đầu tiên và step đầu tiên
wfc scaffold --work-item my-first-feature
wfc scaffold-step --work-item my-first-feature --step s01
```

Từ đó, entry router phân loại mọi coding request, chốt current step, và chặn implementation path cho tới khi gate yêu cầu mở.

---

## Pack và profile

Ba tier để team adopt dần mà không bị governance ngợp ngay ngày đầu.

| Tier | Nội dung | Dành cho |
|------|----------|-----|
| **Starter** | `wfc` + chuỗi 8 bước + 3 skill cốt (clarify, approach, DoD) | Cá nhân / dự án greenfield |
| **Standard** | + governance overlay + TDD/review discipline + hệ instincts | Team nhỏ |
| **Full** | + SDD overlay + DevOps lane + role sign-off + strict profile | Enterprise / regulated team |

Hook enforcement điều khiển bằng profile để onboarding êm:

| Env var | Hành vi |
|---------|----------|
| `CF_HOOK_PROFILE=minimal` | Tất cả TDD hook tắt — cho session docs-only |
| `CF_HOOK_PROFILE=standard` | Chỉ track TDD, không block — cho session docs/refactor |
| `CF_HOOK_PROFILE=strict` | Enforce + track TDD — default, full enforcement |

Có thể disable từng hook bằng `CF_DISABLED_HOOKS=tdd-enforce,tdd-track-write`.

---

## Kiến trúc tóm tắt

```
Request ─▶ workflow-governance-router ─▶ current step + missing gate
                │
                ▼
        codex-workflow-chain (s01 → s08 state machine)
                │
        ┌───────┼───────┐
        ▼       ▼       ▼
   step skill  overlay   artifact (.md / .canvas / .base)
                │
                ▼
        wfc CLI + hook (enforce + validate + materialize)
                │
                ▼
        Human-controlled gate ─▶ signed receipt ─▶ ship
```

Agent đề xuất ở mọi lớp; human approve ở mọi gate; runtime từ chối cho chain tiến nếu chưa.

---

## Public surface (v2.1.1)

- **Bundle cài được** cho Codex và Claude Code qua `wfc install | update | status | skills`.
- **Authoring CLI** qua `wfc init`, `wfc scaffold`, `wfc sdd | change | exec | plan`.
- **Agentic proposal flow** qua `wfc materialize`, `wfc change-item`, `wfc work-item`, `wfc protocol`.
- **Human approval gate** cho change, work item, và workflow gate receipt, kèm **trusted signed receipt** ngoài project root cho gate cần human.
- **Migration** từ legacy state `.codex-workflow-pack.*` sang `.codex-workflow-bundle.*`.

Tham chiếu chuẩn cho onboarding: tag `v2.1.1`, branch `release/v2.1.1`.

---

## Đây không phải

- **Không** phải delivery autonomous không cần human approve — điều đó bị loại rõ khỏi public promise.
- **Không** phải runtime ngoài Codex và Claude Code ở release này.
- **Không** phải backward-compatibility contract rộng hơn surface `v2.1.1` (legacy `workflow-contracts.config.json` và `.codex-workflow-pack.*` chỉ giữ để migration êm).

---

## Trạng thái và roadmap

- **Public release hiện tại:** `workflow-bundle v2.1.1`.
- **Skill managed:** 36, trải qua analysis, architecture, delivery, guardrails, orchestration, và Obsidian.
- **Chủ đề roadmap:** adapter rộng hơn, security scanning cho skill chặt hơn, và đường onboarding Starter gọn hơn.

---

## Đóng góp và license

Hoan nghênh đóng góp. Skill nên **specific** (action step cụ thể, không lời khuyên chung chung), **verifiable** (exit criteria rõ kèm yêu cầu evidence), **battle-tested** (dựa workflow thực), và **minimal** (chỉ đủ để dẫn agent).

Xem repo để biết `LICENSE`, `CONTRIBUTING`, và governance role model cho signoff authority.

---

*Code-Factory — governed delivery cho AI coding agent. Agent đề xuất; human phê duyệt; runtime enforce.*