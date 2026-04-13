---
name: codex-workflow-chain
description: Áp dụng workflow coding 8 bước cho tác vụ phát triển phần mềm bằng Codex. Dùng cho coding, debug, refactor, viết test, script automation, bàn giao tính năng và luồng DevOps local -> dev -> uat -> prod. Workflow giữ một chain duy nhất với tên ngắn Clarify, Business Goal, Open Questions, Acceptance + DoR, Technical Approach, Task Plan, Implement, Verify + DoD; có traceability business -> design -> code -> verify, governance overlay, SDD overlay, role signoff, release readiness và tách rõ skill nghiệp vụ với skill artifact.
---

# Chuỗi Workflow Coding Cho Codex

Tuân thủ workflow delivery 8 bước cho các tác vụ coding.

## Nguyên Tắc Mô Hình

- Workflow chain trong skill này là chuỗi delivery 8 bước cho một yêu cầu coding cụ thể.
- Mỗi step trong workflow là một bước nghiệp vụ thực sự, không phải một trường mô tả.
- `goal`, `input`, `output`, `done_when`, `constraints`, `risks`, `timebox` là metadata của từng step để khóa contract và kiểm soát handoff.
- Khi mô tả `input` và `output`, luôn viết theo ý nghĩa business trước; tên spec kỹ thuật chỉ để trong ngoặc để trace.
- Metadata không phải workflow step riêng.
- Skill được gắn vào step để hỗ trợ thực thi và kiểm soát chất lượng, không thay thế step.
- `agentic` và `multi-agent` là lớp execution topology của step; chúng mô tả cách vận hành step, không phải workflow step mới và không thay thế skill nghiệp vụ.
- Discovery và delivery cùng nằm trong một chain; không tách thành workflow khác, nhưng được phân lớp bằng `workflow_stage`.

## Quy Tắc Ngôn Ngữ Và Mã Hóa

- Mặc định trao đổi với người dùng bằng tiếng Việt.
- Mặc định nội dung tài liệu và báo cáo bằng tiếng Việt, trừ khi có yêu cầu khác.
- Khi sửa tài liệu văn bản, lưu UTF-8 và kiểm tra lỗi mã hóa trước khi bàn giao.

## Quy Tắc Artifact Obsidian

- Artifact chuẩn của workflow doc là note `.md`; nếu một step được materialize thành file thì mặc định file chuẩn là `.md` và phải dùng `obsidian-markdown`.
- Với artifact `.canvas` dùng cho sơ đồ kiến trúc, flow hoặc task map, áp dụng `json-canvas`.
- Với artifact `.base` dùng làm index, dashboard hoặc bảng tổng hợp note, áp dụng `obsidian-bases`.
- `.canvas` và `.base` chỉ là artifact phụ; không thay thế note `.md` làm nguồn sự thật cho quyết định và kết luận.
- Hiện tại chưa yêu cầu `obsidian-cli` trong workflow chain này.
- Nếu một step được lưu thành note `.md`, dùng template output chuẩn theo step tại `references/workflow-chain.md`, bao gồm naming, frontmatter và block contract/spec tương ứng.

## Quy Tắc Metadata Và Truy Vết

- Với note workflow, ưu tiên tách `content_skills` và `artifact_skills` thay vì gộp tất cả vào một field skill chung.
- `content_skills` ghi các skill tạo nội dung nghiệp vụ hoặc gate chất lượng.
- `artifact_skills` ghi các skill dùng để materialize note `.md`, `.canvas`, `.base`.
- Mỗi note workflow materialized nên có `work_item_type`, `workflow_stage`, `upstream_artifacts`, `linked_artifacts`.
- Mỗi note workflow materialized nên có block `## Traceability` để truy vết business -> readiness -> design -> implementation -> verify.

## Quy Tắc Execution Topology

- Chuỗi này nên được hiểu theo 6 lớp song song: `step`, `governance`, `SDD`, `content skill`, `artifact` và `execution topology`.
- `agentic` dùng khi một agent đủ ownership để tự đi trọn vòng `contract -> readiness -> execute -> self-check -> audit -> handoff`.
- `multi-agent` dùng khi cần tách rõ `coordinator`, `worker` và `verifier`, hoặc khi có nhiều ownership boundary có thể chạy song song.
- Execution topology luôn phải bám cùng `step-goal-contract`, không được tạo logic điều phối làm lệch goal, scope hoặc gate của step.
- `governance` là lớp mỏng dùng chung: phần lớn được nhúng vào step contract/gate, phần còn lại nằm ở `constitution`, `project-context`, `checklist` và `exception`.
- Trong prose có thể viết `multi-agent`, nhưng trong schema và frontmatter dùng `multi_agent`; nếu runtime không hỗ trợ delegation ổn định thì fallback `sequential_multi_role` theo execution policy.
- Nếu materialize workflow note, nên khai báo `execution_mode`, `execution_roles` và `role_signoffs`; `execution_roles` phản ánh role nghiệp vụ như `po`, `ba`, `designer`, `developer`, `qc`, `devops`, còn `role_signoffs` nên theo dõi tối thiểu `dor`, `approach`, `release`, `business_acceptance`, `dod`. Role vận hành như `coordinator` hoặc `verifier` được trace ở block `## Execution Topology`.
- Nếu step có nhiều role nghiệp vụ cùng tham gia hoặc cần audit handoff/signoff theo role, ưu tiên thêm block `## Role Outputs` dùng schema `role-output-map` trong note chính thay vì tách note riêng quá sớm.
- Nếu work item chạy theo SDD, khai báo `sdd_mode`, `spec_refs` và `spec_status`; step 4 phải chốt `spec-freeze-gate`, step 5-7 phải dùng spec change protocol khi phát hiện lệch spec, và step 8 phải có `spec-coverage-report`.
- Mapping theo step, quy tắc handoff và schema workflow nằm ở `references/workflow-chain.md`.
- Chính sách runtime, role contract, handoff protocol và rollout `Codex-first` nằm ở `references/execution-runtime.md`.

## Quy Tắc Governance

- Không tạo step governance riêng; `governance` phải đi vào đúng step nơi quyết định được đưa ra.
- Nếu không có chỉ định khác, `governance_ref` mặc định trỏ `project-context/project-context.md`, còn `checklist_refs` lấy từ `project-context/checklists/<governance_profile>.md`.
- `Clarify` phải ghi nhận `governance context` ban đầu trước khi sang `Technical Approach`.
- `Acceptance + DoR`, `Task Plan` và `Verify + DoD` là ba điểm tự nhiên để materialize `governance checks`.
- Nếu implementation hoặc approach đi lệch nguyên tắc chuẩn, phải ghi `governance-exception` hoặc `waiver`, không được ngầm bỏ qua.
- `governance` chỉ có giá trị khi đi vào gate, evidence và handoff; không nên để nó chỉ nằm ở tài liệu nền.

## Chuỗi Cốt Lõi

1. Clarify
- Làm rõ yêu cầu, `work_item_type`, context, scope/risk ban đầu, `governance context` liên quan và evidence cần giữ.

2. Business Goal
- Chốt giá trị nghiệp vụ, KPI/success metric, scope boundary, non-goals và mức độ phù hợp với nguyên tắc nền.

3. Open Questions
- Tách missing input, blocker, assumption, conflict và `governance blocker` cần owner/resolution.

4. Acceptance + DoR
- Chuyển mục tiêu thành acceptance criteria đo được, chốt readiness, phản ánh yêu cầu `governance` vào checklist và dùng `definition-of-ready-gate` khi materialize.

5. Technical Approach
- Chọn phương án kỹ thuật, trade-off và boundary kiến trúc/UX/DevOps trong các ràng buộc `governance` đang áp dụng.

6. Task Plan
- Tách implementation thành task nhỏ có thứ tự, trace được về requirement/AC, có kế hoạch verify và có đủ checkpoint review/governance.

7. Implement
- Thực hiện thay đổi tập trung, đúng phạm vi, đúng approach và không lệch `spec` hoặc `governance` khi chưa được approve.

8. Verify + DoD
- Đối chiếu kết quả với criteria/spec, kiểm tra mã hóa tiếng Việt cho file văn bản đã đổi, kết luận `governance compliance`, dùng `definition-of-done-gate` khi materialize và nêu rõ nếu không thể chạy kiểm tra.

Làn DevOps khi có phạm vi runtime delivery
- Không tạo step 9; đây là lane chạy xuyên step 5 -> 8.
- Ở step 5, dùng `deployment-devops` để khóa DevOps scope tổng; dùng thêm `containerization-packaging`, `platform-runtime-deployment`, `ci-cd-release` khi cần khóa sâu từng layer.
- Ở step 6, tách riêng task build image, compose, manifest, smoke, promotion và rollback khi có.
- Ở step 7, materialize Dockerfile, compose, manifest hoặc pipeline config trong phạm vi đã chốt.
- Ở step 8, kết luận readiness cho packaging hoặc rollout trước khi promote lên `dev`, `uat`, `prod`.

Khi giải thích workflow cho người đọc theo góc business, ưu tiên dùng mẫu:
- Step nhận gì từ bước trước hoặc từ stakeholder.
- Step trả ra quyết định, tài liệu hay bằng chứng gì cho bước sau.
- Tên spec chỉ dùng để định danh artifact, không thay cho ý nghĩa bàn giao.

## Quy Tắc Chất Lượng

- Ưu tiên sửa tận gốc nguyên nhân thay vì vá bề mặt.
- Giữ tính nhất quán giữa code và tài liệu.
- Tuân thủ convention hiện có của project.

## Ưu Tiên Lệnh

- Ưu tiên `rg` khi tìm kiếm file và nội dung.
- Dùng lệnh không tương tác trong script và bối cảnh CI.

## Tài Liệu Tham Chiếu

Đọc tài liệu tham chiếu theo 6 lớp chính và 1 bản thiết kế đích:

- `references/workflow-chain.md`: workflow 8 bước, step-skill-artifact mapping, template note và schema workflow.
- `references/role-aware-workflow.md`: overlay role nghiệp vụ, BRD/SRS rollout artifacts, role outputs và cách dùng NotebookLM như corpus retrieval trong quá trình thực thi.
- `references/spec-driven-development.md`: SDD lifecycle, requirement IDs, spec freeze, spec change protocol, traceability matrix và spec coverage report.
- `references/sdd-merge-strategy.md`: cách kết hợp workflow hiện tại với `spec-kit`, `OpenSpec`, `cc-sdd` và `BMAD-METHOD` theo từng lớp và từng loại work item.
- `references/target-architecture.md`: target architecture để hoàn thiện workflow backbone theo các lớp governance, change, execution và adaptive planning.
- `../../../project-context/README.md`: Governance Pack mặc định của repo, gồm `constitution`, `project-context`, checklist profile và exception register.
- `references/execution-runtime.md`: execution policy, role contract, handoff/merge protocol, rollout runtime và tích hợp `notebooklm`.
- `references/end-to-end-examples.md`: ví dụ áp dụng thật cho một flow `agentic` và một flow `multi-agent`.
