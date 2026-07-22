---
language: vi
name: ci-cd-release
description: Thiết kế và chuẩn hóa pipeline CI/CD, artifact flow và release promotion giữa local, dev, uat, prod. Dùng khi cần chốt build pipeline, quality gate, image registry, tagging strategy, promotion flow, approval control, release checklist, rollback control hoặc map quy trình cho GitHub Actions, GitLab CI, Jenkins, Azure DevOps hay nền tương đương.
---

# CI/CD Release

> English: SKILL.md

Chốt pipeline và control cho luồng build, verify, publish, promote và release.

## Mục Tiêu

- Chuẩn hóa quality gate từ build đến release.
- Chốt tagging strategy và artifact immutability.
- Mô tả rõ promotion giữa `dev`, `uat`, `prod`.
- Chốt approval, rollout control, rollback control và release evidence.

## Khi Sử Dụng

- Khi cần thiết kế hoặc sửa pipeline CI/CD.
- Khi cần quyết định registry, tagging, provenance hoặc promotion strategy.
- Khi cần map release control vào GitHub Actions, GitLab CI, Jenkins, Azure DevOps hoặc công cụ tương đương.
- Khi cần tách pre-merge, pre-release và post-deploy gate.

## Không Thuộc Phạm Vi

- Không chọn pattern Dockerfile theo ngôn ngữ; việc đó thuộc `containerization-packaging`.
- Không chọn topology runtime; việc đó thuộc `platform-runtime-deployment`.
- Không thay thế verify kỹ thuật thực tế trên codebase.

## Đầu Vào Tối Thiểu

- `source_control_context`
- `artifact_contract`
- `quality_gate_requirements`
- `environment_promotion_targets`
- `release_constraints`

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
pipeline_scope: ""
source_strategy:
  branch_model: ""
  triggers: []
build_and_verify:
  stages: []
  cache_strategy: []
  required_checks: []
artifact_flow:
  registry: ""
  artifact_types: []
  tagging_strategy: []
  provenance_controls: []
promotion_flow:
  - from: local|dev|uat
    to: dev|uat|prod
    conditions: []
    automation_level: ""
approval_controls: []
release_controls:
  pre_release: []
  post_release: []
rollback_controls: []
pipeline_risks: []
pipeline_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_ops: ""
```

## Quy Tắc Chính

- Tag release phải bất biến; không dùng `latest` làm source of truth.
- Promotion nên đi trên cùng artifact contract đã build và verify.
- Approval và rollout control của `prod` phải được ghi rõ, không để “manual” mơ hồ.
- Pre-merge gate và pre-release gate là hai tầng khác nhau; không gộp nếu rủi ro khác nhau.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Ở step 5, đặt schema YAML của skill này trong `## Architecture Details` cùng các schema DevOps khác đang có trong scope.
- Ở step 8, khi scope có packaging hoặc rollout, đặt schema của skill này trong `## Deployment Review` cạnh `deployment-devops` và các schema DevOps chuyên biệt khác đang có.
- Không thay thế `## Main Artifact`; output của skill này luôn là block DevOps hỗ trợ, không phải main artifact của step.

## Luật Ra Quyết Định

- `READY` khi quality gate, tagging strategy, promotion flow và rollback control đã chốt đủ evidence, và không có trigger `BLOCKED` nào ở dưới xảy ra.
- `READY_WITH_GUARDS` khi pipeline có thể chạy nhưng chỉ với guard rõ ghi trong `approval_controls` hoặc `release_controls` (vd bước approval manual tạm thời, rollout theo giai đoạn, hoặc follow-up có theo dõi).
- `BLOCKED` khi chưa có tag/registry strategy bất biến, chưa có runtime target rõ cho đích promotion, chưa có post-deploy verification check, hoặc chưa có rollback path khả thi cho môi trường quan trọng — xem `references/promotion-controls.md` và `deployment-devops/references/promotion-flow.vi.md § Dấu Hiệu BLOCKED` để có danh sách trigger chuẩn.

## Tài Liệu Tham Chiếu

- `references/pipeline-stages.md`: cấu trúc pipeline, build, test, publish.
- `references/promotion-controls.md`: tagging, promotion, approval, rollback, release checklist.

## Điều Kiện Hoàn Tất

- Có `build_and_verify` rõ.
- Có `artifact_flow` và `promotion_flow` rõ.
- Có `approval_controls`, `release_controls`, `rollback_controls`.
- Có `pipeline_recommendation` và `pipeline_risks`.
