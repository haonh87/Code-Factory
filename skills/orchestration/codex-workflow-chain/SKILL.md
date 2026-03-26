---
name: codex-workflow-chain
description: Áp dụng workflow coding 8 bước cho tác vụ phát triển phần mềm bằng Codex. Dùng cho coding, debug, refactor, viết test, script automation, bàn giao tính năng và luồng DevOps bám theo local -> dev -> uat -> prod, gồm skill điều phối tổng và các skill chuyên trách cho packaging, runtime deploy, CI/CD release. Workflow hiện tại giữ một chain duy nhất nhưng mở rộng step 1 thành restate cộng discovery framing, chốt Definition of Ready ở step 4, Definition of Done ở step 8, bổ sung traceability business -> design -> code -> verify và release readiness, đồng thời tách rõ skill nghiệp vụ với skill artifact trong note workflow.
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

- Chuỗi này nên được hiểu theo 4 lớp song song: `step`, `content skill`, `artifact` và `execution topology`.
- `agentic` dùng khi một agent đủ ownership để tự đi trọn vòng `contract -> readiness -> execute -> self-check -> audit -> handoff`.
- `multi-agent` dùng khi cần tách rõ `coordinator`, `worker` và `verifier`, hoặc khi có nhiều ownership boundary có thể chạy song song.
- Execution topology luôn phải bám cùng `step-goal-contract`, không được tạo logic điều phối làm lệch goal, scope hoặc gate của step.
- Nếu materialize workflow note, nên khai báo `execution_mode` và vai trò đang tham gia để trace cách step đã được vận hành.
- Mapping theo step, quy tắc handoff và schema workflow nằm ở `references/workflow-chain.md`.
- Chính sách runtime, role contract, handoff protocol và rollout `Codex-first` nằm ở `references/execution-runtime.md`.

## Chuỗi Cốt Lõi

1. Restate yêu cầu và discovery framing
- Diễn giải lại yêu cầu theo cách ngắn gọn, đúng ý và tránh hiểu sai.
- Bổ sung framing tối thiểu cho developer: `work_item_type`, user/business context ban đầu, scope draft, assumption, dependency và risk ban đầu.

2. Xác định mục tiêu business
- Chốt giá trị nghiệp vụ, kết quả mong muốn và phần không làm.

3. Liệt kê phần còn mơ hồ
- Tách câu hỏi mở, input còn thiếu, giả định và xung đột thông tin.

4. Viết acceptance criteria và chốt Definition of Ready
- Chuyển mục tiêu thành tiêu chí kiểm chứng được.
- Chốt gate sẵn sàng trước khi đi vào design và implementation planning.
- Khi materialize thành note hoặc report, dùng thêm guardrail `definition-of-ready-gate` cho block DoR.

5. Đề xuất technical approach
- Đưa ra phương án kỹ thuật, so sánh trade-off và chọn hướng khuyến nghị.

6. Chia task
- Tách implementation thành các việc nhỏ có thứ tự và có thể xác minh.

7. Implement
- Thực hiện thay đổi tập trung, đúng phạm vi và đúng hướng đã chốt.

8. Verify với criteria và chốt Definition of Done
- Đối chiếu kết quả thực tế với acceptance criteria và quality gates.
- Bao gồm kiểm tra mã hóa tiếng Việt cho các file văn bản đã thay đổi.
- Khi materialize thành note hoặc report, dùng thêm guardrail `definition-of-done-gate` cho block DoD.
- Nếu không thể chạy kiểm tra, phải nêu rõ.

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

Đọc tài liệu tham chiếu theo 3 lớp:

- `references/workflow-chain.md`: workflow 8 bước, step-skill-artifact mapping, template note và schema workflow.
- `references/execution-runtime.md`: execution policy, role contract, handoff/merge protocol, rollout runtime và tích hợp `notebooklm`.
- `references/end-to-end-examples.md`: ví dụ áp dụng thật cho một flow `agentic` và một flow `multi-agent`.
