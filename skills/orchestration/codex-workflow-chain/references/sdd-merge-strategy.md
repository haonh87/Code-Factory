# Merge Strategy Giữa Workflow Hiện Tại, Spec Kit, OpenSpec, cc-sdd Và BMAD-METHOD

Tài liệu này chốt cách kết hợp workflow hiện tại của repo với bốn bộ kit/workflow AI phổ biến:

- `github/spec-kit`
- `Fission-AI/OpenSpec`
- `gotalab/cc-sdd`
- `bmad-code-org/BMAD-METHOD`

Thời điểm đối chiếu: `2026-04-11`.

Nguyên tắc nền:

- Workflow hiện tại của repo vẫn là `host workflow`.
- Không thay toàn bộ workflow hiện tại bằng một bộ kit bên ngoài.
- Chỉ mượn lớp mạnh nhất của từng kit để giảm trùng lặp và tránh xung đột triết lý.

## Nguồn Tham Chiếu

| Bộ kit | Repository | Điều nên lấy |
|---|---|---|
| `spec-kit` | `https://github.com/github/spec-kit` | governance, constitution, clarify/analyze/checklist mindset, phase discipline |
| `OpenSpec` | `https://github.com/Fission-AI/OpenSpec` | change-centric model, `specs/` vs `changes/`, archive lifecycle, brownfield workflow |
| `cc-sdd` | `https://github.com/gotalab/cc-sdd` | agentic implementation loop, subagent orchestration, requirements -> design -> tasks execution pattern |
| `BMAD-METHOD` | `https://github.com/bmad-code-org/BMAD-METHOD` | scale-adaptive routing, phase language, role-aware agile lifecycle, story-centric implementation, project-context |

## Merge Strategy Chính

| Lớp | Giữ từ workflow hiện tại | Mượn từ `spec-kit` | Mượn từ `OpenSpec` | Mượn từ `cc-sdd` | Mượn từ `BMAD-METHOD` | Quyết định merge |
|---|---|---|---|---|---|---|
| Workflow khung | `Clarify -> Business Goal -> Open Questions -> Acceptance + DoR -> Technical Approach -> Task Plan -> Implement -> Verify + DoD` | tư duy phase rõ ràng | không thay khung step | không thay khung step | phase language `Analysis -> Planning -> Solutioning -> Implementation` chỉ dùng như overlay đọc hiểu | giữ nguyên workflow 8 bước |
| Governance | `DoR`, `DoD`, `release`, `business_acceptance`, role signoff | constitution, checklist, quality bar, principle-driven delivery | không phải điểm mạnh chính | có thể tham khảo steering nhẹ | `project-context`, planning track rules, collaboration framing | dùng `spec-kit` làm nguồn cảm hứng chính; BMAD hỗ trợ ở lớp project-context |
| Product artifacts | `BRD`, `SRS`, role outputs, traceability theo role | tăng độ chặt của template/spec checklist | delta/change folder cho phần thay đổi | không thay artifact sản phẩm | `PRD`/story mindset chỉ dùng để enrich planning, không thay `BRD/SRS` | `BRD/SRS` vẫn là source-of-truth rollout |
| Change management | step note + rollout artifact | không phải lớp mạnh nhất | `openspec/specs/` là current truth, `openspec/changes/` là proposed change, có `archive` | không phải lớp chính | không phải lớp mạnh nhất | mượn mạnh từ `OpenSpec` |
| Discovery | `s01-s04` đã rõ business/requirement/readiness | `clarify`, `analyze`, `checklist` mindset | proposal-first cho change lớn | discovery routing kiểu Kiro | analyst/PM/UX collaboration và scale-adaptive routing | giữ `s01-s04`, thêm helper/checklist/routing khi cần |
| Design và tasking | `Technical Approach`, `Task Plan`, trace về requirement/AC | nhịp `specify -> plan -> tasks` | change folder chứa `design.md`, `tasks.md` | contract `requirements -> design -> tasks` | planning track: quick flow vs full flow vs enterprise; story breakdown | workflow hiện tại làm chủ; BMAD giúp chọn độ sâu planning |
| Implementation | `s07` bám frozen spec/spec-change | command mindset `/implement` | command mindset `/apply` | subagent, per-task review, auto-debug, long-running execution | story-centric dev cycle, just-in-time context, quick-dev cho change nhỏ | `cc-sdd` là nguồn tham chiếu chính cho execution engine; BMAD là nguồn phụ cho story flow |
| Verify và acceptance | `QC`, `release`, `business_acceptance`, `spec-coverage-report` | `analyze/checklist` trước implement hoặc release | `archive` sau khi verify xong | independent review loop | test-architect/test-strategy mindset khi scope lớn | verify vẫn do workflow hiện tại làm chủ |
| Brownfield vs greenfield | dùng chung một workflow có gate | hợp feature/planning rõ | rất mạnh cho brownfield, multi-spec update | mạnh ở implementation-heavy work | mạnh ở scale-adaptive planning từ small -> enterprise | route theo loại work item thay vì ép một bộ kit cho mọi case |
| Tooling UX | skill-based workflow hiện tại | command set của `spec-kit` chỉ nên tham khảo | command set của `OpenSpec` chỉ nên tham khảo | command/skill set của `cc-sdd` chỉ nên tham khảo | workflow/agent menu chỉ nên tham khảo, không bê nguyên | chỉ nên có một command surface nội bộ cho repo |

## Routing Rule Theo Loại Work Item

| Loại work item | Merge strategy khuyến nghị |
|---|---|
| `FEATURE` mới, scope rõ | workflow hiện tại + `spec-kit` mạnh + `BMAD` vừa; `OpenSpec` và `cc-sdd` dùng theo nhu cầu |
| `CHANGE` trên hệ thống đang chạy | workflow hiện tại + `OpenSpec` mạnh, `cc-sdd` vừa, `spec-kit` nhẹ, `BMAD` nhẹ |
| `REFACTOR` hoặc migration phức tạp | workflow hiện tại + `OpenSpec` mạnh + `cc-sdd` mạnh + `BMAD` vừa |
| `BUG` nhỏ, scope hẹp | workflow hiện tại rút gọn + `BMAD Quick Flow` mindset; không cần full ceremony của cả 4 bộ |
| `RESEARCH` | workflow hiện tại + `spec-kit` checklist nhẹ; dùng `BMAD` nếu cần analyst-style exploration; chỉ dùng `OpenSpec` nếu research sinh proposed change rõ |
| enterprise/compliance-heavy | workflow hiện tại + `spec-kit` mạnh + `BMAD Enterprise track` mạnh; `OpenSpec` cho change trace; `cc-sdd` cho execution |

## Áp Vào Repo Này

| Thành phần trong repo | Quyết định áp dụng |
|---|---|
| `BRD` và `SRS` | giữ làm source-of-truth rollout artifact |
| note `s01` đến `s08` | giữ làm execution trace, handoff trace và evidence theo role |
| policy/constitution | bổ sung một lớp principle/checklist kiểu `spec-kit`; có thể thêm `project-context` kiểu `BMAD` để lưu convention, skill level, collaboration preference |
| change folder | có thể thêm một lớp `changes/<change-id>/` kiểu `OpenSpec` để quản lý proposal, design, tasks và spec delta |
| planning depth | có thể route `Quick Flow`, `Full Flow`, `Enterprise Flow` kiểu `BMAD`, nhưng map về cùng 8 step hiện tại |
| `s07-s08` execution | nếu muốn tăng autonomy, mượn mô hình implementer/reviewer/auto-debug từ `cc-sdd`, cộng thêm story-centric/quick-dev mindset từ `BMAD` |
| archive | chỉ archive change khi `DoD`, `release` và `business_acceptance` đã rõ |

## Không Nên Làm

| Tránh | Lý do |
|---|---|
| thay toàn bộ workflow hiện tại bằng `OpenSpec` | sẽ mất lớp role/signoff/product governance đang mạnh |
| thay toàn bộ workflow hiện tại bằng `BMAD` | sẽ tạo hai hệ role, hai hệ artifact và hai lớp phase bị chồng nhau |
| thay `BRD/SRS` bằng change delta | delta chỉ nên là lớp thay đổi, không thay source-of-truth |
| thay `BRD/SRS` bằng `PRD/story` của BMAD một cách máy móc | BMAD planning artifact nên chỉ bổ trợ, không thay rollout artifact hiện tại |
| bê nguyên command surface của cả bốn bộ kit | UX sẽ rối và trùng ngữ nghĩa |
| để execution kit quyết định thay business gate | implementation loop không thay được `DoR`, `DoD`, `release`, `business_acceptance` |

## Kết Luận

Mô hình khuyến nghị cho repo này là:

- workflow hiện tại làm `xương sống`
- `OpenSpec` làm `change layer`
- `cc-sdd` làm `execution layer`
- `spec-kit` làm `governance/checklist layer`
- `BMAD-METHOD` làm `scale-adaptive routing + role-aware agile planning layer`

Nếu cần hiện thực hóa tiếp, bước hợp lý tiếp theo là tách rõ:

- `source-of-truth artifact`
- `change artifact`
- `execution trace artifact`
- `archive protocol`

Kiến trúc đích tổng thể để review trước khi hiện thực hóa nằm tại `references/target-architecture.md`.
