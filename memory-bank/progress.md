# Progress

## Trạng Thái Hiện Tại

Project đang ở trạng thái có thể dùng thật cho `workflow backbone` và baseline của phase `0-5` trên Codex. `Target architecture` đã được materialize ở mức baseline; phần còn lại chủ yếu là hardening sâu hơn, semantic lint và mở rộng phạm vi vận hành.

Vấn đề quan trọng cần giữ rõ:

- backbone workflow đã materialize
- governance layer đã materialize baseline
- các lớp `SDD`, `change`, `execution`, `adaptive planning` và `automation hardening` đã materialize baseline; phần còn thiếu chủ yếu nằm ở hardening sâu hơn và semantic lint

Ở góc nhìn roadmap, repo đã đi qua giai đoạn rollout baseline và đang chuyển sang giai đoạn tăng độ chặt của guardrail, semantic validation và mở rộng coverage.

## Bảng Trạng Thái Theo Layer

| Layer | Trạng thái | Ghi chú |
|---|---|---|
| Backbone workflow | `DONE` | workflow 8 bước, naming, schema note, `work-items/` canonical root |
| Governance layer | `DONE` baseline | governance pack, role model, decision model, validator, fixture, authority/state enforcement baseline, CI phase 1-2 |
| SDD layer | `DONE` baseline | đã có `product-specs/`, template `BRD/SRS`, sample strict work item, validator SDD và CI job `workflow-sdd` |
| Change layer | `DONE` baseline | đã có `changes/`, sample change package, scaffold/validator change và CI job `workflow-changes` |
| Execution layer | `DONE` baseline | đã có `review_mode`, runtime artifacts thật, sample `multi_agent`, validator execution và CI job `workflow-execution` |
| Adaptive planning | `DONE` baseline | đã có `planning_track`, routing preset, validator planning, CI job `workflow-planning` và sample `quick|enterprise` |
| Automation hardening | `DONE` baseline | đã có validator/CI cho governance, SDD, change, execution, planning và `workflow-authoring-smoke`; còn thiếu drift checks và semantic lint sâu hơn |

## Những Gì Đang Hoạt Động

- Có thể mô tả project rõ như một workflow pack cho Codex.
- Có thể cài policy và skill vào `~/.codex`.
- Có thể tổ chức tác vụ coding theo 8 bước với DoR/DoD rõ ràng.
- Có DevOps delivery lane cho local -> dev -> uat -> prod, với local baseline bằng Dockerfile và compose.yaml.
- Có bộ skill DevOps gồm `deployment-devops`, `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` để khóa lần lượt scope tổng, packaging, runtime deploy và pipeline/release.
- Có bộ skill Obsidian để materialize artifact khi cần.
- Có skill `notebooklm` để hỗ trợ research/query corpus lớn qua NotebookLM.
- Có quy ước mở rộng repo theo `policies/<tool>` và `adapters/<tool>`.
- Đã có materialization đầu tiên của lớp `MCP` với `mcp/github-push` và adapter cài dependency tương ứng.
- Đã có `mcp/notebooklm` như managed upstream integration để Codex gọi NotebookLM MCP qua `uvx`, không cần repo tự mirror 35 tools của upstream; intent chính là hỗ trợ lưu corpus tài liệu và query/search khi workflow cần thêm context cho brainstorming hoặc spec.
- Đã có MCP thứ hai là `mcp/session-search`, read-only wrapper quanh `cass` để tra cứu local coding-agent session history.
- Có Memory Bank để giữ tầm nhìn dự án và giảm mất ngữ cảnh giữa các session.
- Đã có spec orchestration và runtime reference cho `agentic` và `multi-agent` theo hướng `Codex-first`.
- Đã có lớp role-aware workflow trong `codex-workflow-chain`, gồm `execution_roles`, `role_signoffs`, role matrix cho `po|ba|designer|developer|qc|devops`, block `## Role Outputs` và reference riêng `role-aware-workflow.md` để trace contribution theo role.
- Đã làm rõ ranh giới `BRD/SRS` là rollout outputs của quy trình phát triển sản phẩm, còn NotebookLM là lớp lưu corpus và truy hồi tài liệu trong lúc thực thi.
- Đã bổ sung lớp SDD vào workflow chain, gồm lifecycle/status, requirement IDs, spec freeze gate, spec change protocol, spec traceability matrix và spec coverage report.
- Tên hiển thị của workflow 8 bước đã được rút gọn và đồng bộ, còn slug/file naming vẫn giữ ổn định để không phá compatibility.
- Đã có thêm reference `sdd-merge-strategy.md` để định vị rõ phần nào của `spec-kit`, `OpenSpec`, `cc-sdd`, `BMAD-METHOD` nên được mượn vào workflow hiện tại.
- Đã có thêm `target-architecture.md` để chốt mô hình đích theo các lớp backbone, governance, change, execution và adaptive planning trước khi rollout implementation thật.
- Đã cập nhật workflow docs theo hướng `hybrid governance`, với `governance context`, `governance checks`, `governance exception` đi thẳng vào step contract, template note và gate.
- Đã rà và đồng bộ lại các docs workflow để loại bỏ conflict nội dung: metadata governance/runtime dùng cùng enum và naming, mô hình 6 lớp khớp giữa policy và reference, và role-aware workflow đã phản ánh trách nhiệm governance theo từng step.
- Đã có Governance Pack mức project trong `project-context/` để workflow dùng thật, thay vì chỉ mô tả governance ở mức contract.
- Đã có thêm governance role model để xác định authority cho `governance-exception`, `waiver` và approval theo role, thay vì suy diễn từ step owner hoặc `role_signoffs`.
- Đã có thêm governance decision model để chuẩn hóa profile selection, status transition và exception trigger cho workflow.
- Đã có workflow validators chạy bằng Node.js và command surface chuẩn qua `npm`, nên local flow và CI sau này có thể dùng cùng một entrypoint thay vì phụ thuộc PowerShell.
- Đã có fixture suite `tests/fixtures/workflow-governance/` để kiểm thử thủ công hoặc CI cho governance validator với cả case pass và fail có chủ đích.
- Đã có workflow authoring chuẩn qua `npm`, gồm scaffold cho cả workflow hoặc từng step, giúp giảm copy tay template và giữ naming/frontmatter/governance block đồng nhất từ đầu.
- Đã có thêm CI design cho workflow tooling và workflow artifacts, chốt phase rollout `tooling -> artifacts -> authoring smoke` trước khi implement GitHub Actions thật.
- Đã implement GitHub Actions phase 1 tại `.github/workflows/workflow-guardrails.yml`, làm nền cho enforcement qua fixture suite trước khi mở rộng sang artifact thật.
- Đã chốt `work-items/` làm canonical artifact root cho workflow artifacts thật, tạo target rõ ràng cho scaffolder, validator và CI phase 2.
- Đã implement CI phase 2: GitHub Actions hiện có thêm job `workflow-artifacts` để validate trực tiếp `work-items/`, và root này đã có `sample-workflow-item/` làm dữ liệu canonical tối thiểu cho enforcement.
- Đã có thêm `implementation-blueprint.md` để chuyển target architecture thành rollout plan có phase, artifact, validator, CI và done criteria rõ ràng.
- Đã materialize `Phase 1: SDD Materialization`, gồm `product-specs/`, template `BRD/SRS`, sample strict work item `sample-sdd-item/`, validator `validate:workflow:sdd` và CI job `workflow-sdd`.
- Đã materialize baseline của `Phase 2: Change Layer`, gồm `changes/`, sample change package `CHANGE-001`, metadata `change_id/change_status/spec_delta_refs/archive_status`, command `scaffold:change`, validator `validate:workflow:change` và CI job `workflow-changes`.
- Đã materialize baseline của `Phase 3: Execution Layer`, gồm metadata `review_mode/verification_owner`, runtime artifacts `execution-policy/worker-assignment/worker-handoff-report/merge-report`, validator `validate:workflow:execution`, CI job `workflow-execution` và sample canonical `sample-execution-item/`.
- Đã materialize baseline của `Phase 4: Adaptive Planning`, gồm metadata `planning_track`, reference `adaptive-planning.md`, validator `validate:workflow:planning`, CI job `workflow-planning` và sample canonical `sample-quick-item/`, `sample-enterprise-item/`.
- Đã materialize baseline của `Phase 5: Hardening`, gồm `validate:workflow:authoring-smoke`, CI job `workflow-authoring-smoke`, governance authority/state enforcement baseline và fixture fail cases mới cho authority/gate.
- Đã chốt `workflow-overview-author-edition.md` làm overview chính thức cho delivery/onboarding ở góc nhìn tác giả.
- Đã chốt `workflow-overview.md` làm technical/internal reference, tập trung vào mechanics, validator, CI, rollout status và chi tiết kỹ thuật hơn.
- Đã đồng bộ `README.md`, `SKILL.md`, `AGENTS.global.md` và các overview để entrypoint đọc tài liệu phản ánh đúng phân vai giữa official overview và technical reference.
- Đã polish lại phần landing của `README.md`: rút gọn lối vào, nhóm `Bắt Đầu Ở Đây`, `Workflow Commands Nhanh`, `Workflow Docs`, `Quy Ước Tên File` để người mới vào repo nhìn thấy luồng đọc và command surface ngay.
- Policy Codex đã phản ánh execution runtime ở mức sử dụng thực tế, không còn chỉ nằm trong reference docs.
- Đã có bộ ví dụ end-to-end cho `BUG` agentic, `FEATURE` multi-agent có `notebooklm`, và `CHANGE` database-heavy multi-agent.
- Đã kiểm chứng ngày `2026-04-08` rằng `cass` có thể tra cứu local Codex sessions theo workspace khi chạy ngoài sandbox; truy vấn `status` trên repo này trả hit thực từ session history.

## Việc Còn Thiếu

- Hardening sâu hơn:
  - stale `governance-exception` checks
  - drift check sâu hơn giữa docs, scaffold, validator và CI
  - semantic lint sâu hơn cho evidence, traceability và archive lifecycle
- Mở rộng lớp `MCP` từ starter đầu tiên sang nhiều server/use case hơn.
- Template runtime artifact hoặc ví dụ end-to-end cụ thể hơn cho docker, swarm, k8s nếu muốn đẩy DevOps từ guideline sang starter pack.
- Lộ trình và materialization chính thức để mở rộng từ Codex sang Claude, rồi các tool hoặc agent khác.
- Tài liệu release/maintenance rõ hơn nếu project bắt đầu có nhiều người cùng duy trì.

## Giới Hạn Và Rủi Ro Đã Biết

- Runtime flat layout tạo rủi ro trùng tên skill.
- Nhiều nguồn tài liệu có thể bị lệch nhau nếu không cập nhật đồng thời.
- Đã có automation cho naming/governance trên `work-items/`, nhưng chưa có automation xác nhận tính đầy đủ của toàn bộ target architecture sau mỗi lần chỉnh sửa.
- Phạm vi hiện tại còn Codex-centric, nên chưa kiểm chứng khả năng đa-agent ở mức thực chiến.
- Tầm nhìn AI KIT rộng hơn hiện trạng repo, nên nếu không cập nhật roadmap rõ ràng thì dễ tạo kỳ vọng vượt quá phần đã hiện thực.
- `agentic` và `multi-agent` đã có orchestration spec, runtime reference và policy Codex tương ứng, nhưng chưa có runner hoặc adapter runtime riêng để chứng minh behavior end-to-end.
- `notebooklm` là external integration nên còn phụ thuộc auth, network và cách team quản lý notebook/query thực tế.
- `github-push` MCP là side-effectful integration, nên cần guardrail tốt cho allowed root, auth và flow publish.
- `cass` có thể báo degraded trong sandbox hạn chế do không mở được DB/index ở Application Support, nên cần phân biệt lỗi quyền môi trường với lỗi cài đặt thật trước khi repair.
- `mcp/notebooklm` phụ thuộc mạnh vào upstream `notebooklm-mcp-cli`; nếu upstream đổi command surface, auth flow hoặc config guidance thì launcher/docs trong repo phải cập nhật theo.
- `session-search` hiện phụ thuộc runtime behavior và JSON contract của `cass`; nếu upstream CLI đổi schema thì MCP wrapper này cần cập nhật theo.

## Quyết Định Đã Chốt

- Memory Bank được thêm vào như lớp tài liệu chuẩn để phục hồi ngữ cảnh giữa các session.
- README cần trỏ người đọc vào Memory Bank trước khi đi sâu vào các tài liệu khác.
- Mục tiêu sản phẩm của project là xây dựng AI KIT cho quy trình phát triển sản phẩm số, trong đó workflow pack cho Codex là bước hiện thực đầu tiên, còn Claude là đích mở rộng kế tiếp.

## Bước Tiếp Theo Hợp Lý

- Phase 0-5 hiện đã có baseline thật trong repo; bước tiếp theo chỉ còn hardening sâu hơn và semantic lint.
- Nếu tiếp tục phase hardening, ưu tiên tiếp theo là stale register checks và drift checks sâu hơn giữa docs/scaffold/validator/CI.
- Chỉ tăng autonomy ở execution khi `SDD` và `change layer` đã có source-of-truth ổn định, điều kiện này hiện đã đạt ở mức baseline.
- Duy trì cập nhật Memory Bank mỗi khi thay đổi policy, skill, adapter hoặc scope dự án.
- Khi phần nền trên Codex đủ ổn định, lập kế hoạch port hoặc trừu tượng hóa để mở rộng sang Claude.
