---
language: vi
name: deployment-devops
description: Điều phối DevOps end-to-end từ local đến dev, uat, prod bằng cách chọn và kết hợp các skill packaging, runtime deployment và CI/CD release. Dùng khi cần chốt hướng DevOps tổng thể, phân rã phạm vi giữa Dockerfile hoặc compose, runtime deploy trên Docker hoặc Swarm hoặc Kubernetes, và pipeline hoặc promotion hoặc rollback control cho release.
---

# Deployment DevOps

> English: SKILL.md

Điều phối hướng DevOps tổng thể để application có thể được đóng gói, triển khai và promote nhất quán từ local đến các môi trường đích.

## Mục Tiêu

- Chốt DevOps scope tổng thể ở mức work item.
- Buộc local có baseline chạy chuẩn bằng container khi scope yêu cầu.
- Chọn đúng skill chuyên trách cho packaging, runtime deploy và pipeline release.
- Gắn kết lại environment matrix, promotion flow, rollout strategy, rollback strategy và release readiness.
- Tạo handoff rõ cho step design, task breakdown, implement và verify.

## Khi Sử Dụng

- Khi người dùng yêu cầu “làm DevOps” ở mức tổng thể chứ chưa tách rõ layer.
- Khi cần xác định phạm vi nào thuộc packaging, layer nào thuộc runtime deploy, layer nào thuộc CI/CD release.
- Khi work item vừa có local container, vừa có deploy runtime, vừa có promotion hoặc approval flow.
- Khi step verify cần kết luận release readiness tổng thể thay vì chỉ một mảng hẹp.

## Không Thuộc Phạm Vi

- Không thay thế `implementation` cho việc viết file thực tế trong codebase.
- Không thay thế `testing` cho unit, integration, database hoặc feature test.
- Không tự áp đặt nền tảng hạ tầng nếu project chưa có ràng buộc đủ rõ.
- Không thay thế các skill chuyên trách khi bài toán đã rõ layer cần xử lý.
- Không xem production rollout là an toàn chỉ vì manifest, compose hoặc pipeline đã tồn tại.

## Đầu Vào Tối Thiểu

- `recommended_design`
- `acceptance_criteria`
- `application_runtime_requirements`
- `environment_constraints`
- `delivery_targets`
- `operational_context`

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
deployment_scope: ""
devops_objectives: []
environment_matrix:
  - environment: local|dev|uat|prod
    concerns: []
    runtime_target: ""
specialized_followups:
  - skill: containerization-packaging|platform-runtime-deployment|ci-cd-release
    reason: ""
    outputs_expected: []
cross_cutting_guards: []
evidence_or_gaps: []
release_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_release: ""
```

## Ý Nghĩa Từng Output

- `deployment_scope`: mô tả phần DevOps đang được xử lý ở mức tổng.
- `devops_objectives`: mục tiêu DevOps chính của work item.
- `environment_matrix`: map từng môi trường với concern chính và runtime target dự kiến.
- `specialized_followups`: skill chuyên trách cần gọi tiếp.
- `cross_cutting_guards`: guard áp dụng xuyên packaging, runtime và release.
- `evidence_or_gaps`: bằng chứng hiện có hoặc khoảng trống chặn release.
- `release_recommendation`: kết luận cuối về mức sẵn sàng.
- `notes_for_implementation_or_release`: handoff cho step implement hoặc execution release.

## Chuẩn Hóa Output Trong Workflow Note

- Nếu deployment chỉ là một phần của step 5, dùng skill này để khóa scope DevOps tổng rồi link sang note phụ của skill chuyên trách nếu cần.
- Ở step 6, dùng output của skill này để quyết định task nào thuộc packaging, task nào thuộc runtime, task nào thuộc pipeline.
- Ở step 8, khi scope có packaging hoặc rollout, có thể đặt schema của skill này làm block tổng quan cho `## Deployment Review`, kèm các schema chi tiết liên quan nếu cần.
- Nếu materialize thành note `.md` riêng, dùng `obsidian-markdown` và link từ step tương ứng thay vì thay thế note workflow chính.

## Luồng Thực Thi

1. Xác định môi trường nào thực sự thuộc phạm vi: `local`, `dev`, `uat`, `prod`.
2. Tách concern theo 3 lớp: packaging, runtime deploy, CI/CD release.
3. Gọi đúng skill chuyên trách cho từng lớp cần khóa sâu.
4. Tổng hợp environment matrix, promotion flow và guard vận hành xuyên suốt.
5. Kết luận `READY`, `READY_WITH_GUARDS` hoặc `BLOCKED`.

## Luật Ra Quyết Định

- `READY` khi `environment_matrix` đầy đủ, mọi mục trong `specialized_followups` đã resolve và không còn item mở trong `evidence_or_gaps` ảnh hưởng release.
- `READY_WITH_GUARDS` khi release vẫn khả thi nhưng `cross_cutting_guards` kèm điều kiện rõ (vd manual gate trước `prod`, hoặc rollback tạm chỉ dựa vào monitoring trong lúc xây rollback path đầy đủ).
- `BLOCKED` khi bất kỳ `packaging_recommendation`/`runtime_recommendation`/`pipeline_recommendation` của skill chuyên trách nào là `BLOCKED`, hoặc `evidence_or_gaps` còn item chưa resolve ảnh hưởng release.

## Quy Tắc Môi Trường

- `local` bắt buộc có baseline container hóa nếu work item yêu cầu chạy bằng container.
- `dev` nên ưu tiên rollout nhanh, quan sát được và dễ reset.
- `uat` phải bám cùng artifact contract với `prod` khi release flow cần kiểm chứng gần production.
- `prod` phải có rollout strategy, rollback strategy và verification sau deploy rõ ràng.
- Không bake secrets hoặc giá trị môi trường đặc thù vào image.
- Không tạo build riêng cho từng môi trường nếu không có lý do compliance rất rõ.

## Tài Liệu Tham Chiếu

Đọc đúng file cần thiết:

- `references/devops-skill-map.md`: khi cần chọn skill chuyên trách phù hợp.
- `../containerization-packaging/SKILL.md`: khi cần khóa packaging theo ngôn ngữ và workload.
- `../platform-runtime-deployment/SKILL.md`: khi cần khóa runtime deploy theo platform.
- `../ci-cd-release/SKILL.md`: khi cần khóa pipeline, tagging, promotion và approval.

## Điều Kiện Hoàn Tất

- Có `environment_matrix` đầy đủ cho mọi môi trường trong phạm vi.
- Có `specialized_followups` rõ và không chồng lấn mơ hồ.
- Có `cross_cutting_guards` đủ để step sau triển khai và verify.
- Có `release_recommendation` rõ ràng và nêu được các `evidence_or_gaps`.
