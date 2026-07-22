---
language: vi
name: platform-runtime-deployment
description: Thiết kế và chuẩn hóa runtime deploy cho các môi trường dev, uat, prod trên Docker, Docker Swarm hoặc Kubernetes. Dùng khi cần chốt deployment unit, networking, config/secrets, storage, scaling, ingress, rollout/rollback strategy, observability guard hoặc deployment topology theo workload và mức độ stateful.
---

# Platform Runtime Deployment

> English: SKILL.md

Chốt topology và guard vận hành cho runtime deploy theo platform đích.

## Mục Tiêu

- Chọn runtime deploy phù hợp giữa `docker`, `swarm`, `k8s`.
- Chốt deployment unit, networking, config/secrets, storage và scaling strategy.
- Xác định rollout, rollback và observability guard cho từng môi trường.
- Phân biệt rõ workload stateless và stateful ở mức runtime.

## Khi Sử Dụng

- Khi cần map `dev`, `uat`, `prod` sang runtime cụ thể.
- Khi cần chuẩn hóa manifest/stack/deployment topology.
- Khi cần chốt ingress, service discovery, secret source, volume hoặc autoscaling.
- Khi rollout phụ thuộc mạnh vào stateful concern, health policy hoặc workload behavior.

## Không Thuộc Phạm Vi

- Không quyết định cách đóng gói artifact theo ngôn ngữ; việc đó thuộc `containerization-packaging`.
- Không thiết kế pipeline build/promote/approval; việc đó thuộc `ci-cd-release`.
- Không thay thế execution rollout thật trên hạ tầng.

## Đầu Vào Tối Thiểu

- `environment_targets`
- `workload_profile`
- `statefulness_profile`
- `network_requirements`
- `operational_constraints`

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
deployment_scope: ""
runtime_matrix:
  - environment: dev|uat|prod
    runtime: docker|swarm|k8s
    deployment_unit: ""
    topology: ""
    networking: []
    config_strategy: []
    secret_strategy: []
    storage_strategy: []
    scaling_strategy: []
runtime_artifacts:
  - environment: ""
    files_expected: []
operational_policies:
  health_policies: []
  observability_controls: []
  resource_controls: []
  disruption_controls: []
rollout_and_rollback:
  - environment: ""
    rollout_strategy: ""
    preconditions: []
    post_deploy_checks: []
    rollback_steps: []
platform_risks: []
runtime_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation_or_ops: ""
```

## Quy Tắc Chính

- `uat` nên bám topology gần `prod` nhất có thể nếu mục tiêu là kiểm chứng release.
- Runtime khác nhau giữa `uat` và `prod` phải được giải thích rõ.
- Workload stateful phải có `storage_strategy`, `rollback_steps` và guard dữ liệu.
- Không dùng cùng một pattern cho `docker`, `swarm`, `k8s` nếu platform semantics khác nhau.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Ở step 5, đặt schema YAML của skill này trong `## Architecture Details` cùng các schema DevOps khác đang có trong scope.
- Ở step 8, khi scope có packaging hoặc rollout, đặt schema của skill này trong `## Deployment Review` cạnh `deployment-devops` và các schema DevOps chuyên biệt khác đang có.
- Không thay thế `## Main Artifact`; output của skill này luôn là block DevOps hỗ trợ, không phải main artifact của step.

## Luật Ra Quyết Định

- `READY` khi `runtime_matrix` đầy đủ cho mọi môi trường trong phạm vi, `rollout_and_rollback` đã định nghĩa cho từng môi trường, và mọi workload stateful đều có `storage_strategy` và `rollback_steps`.
- `READY_WITH_GUARDS` khi runtime deploy vẫn khả thi nhưng kèm guard rõ (vd `uat` lệch topology so với `prod` có lý do ghi rõ, một bước scaling manual, hoặc autoscaling bị trì hoãn có follow-up theo dõi).
- `BLOCKED` khi một workload stateful không có `storage_strategy` hoặc `rollback_steps`, hoặc runtime target (`docker`/`swarm`/`k8s`) của một môi trường trong phạm vi chưa xác định được.

## Tài Liệu Tham Chiếu

- `references/runtime-platforms.md`: pattern theo Docker, Swarm, Kubernetes.
- `references/stateful-networking.md`: guard cho storage, networking, ingress, secrets, scaling.

## Điều Kiện Hoàn Tất

- Có `runtime_matrix` cho mọi môi trường trong phạm vi.
- Có `rollout_and_rollback` đủ rõ cho môi trường đích.
- Có `operational_policies` và `platform_risks`.
