---
language: vi
name: containerization-packaging
description: Thiết kế và chuẩn hóa đóng gói ứng dụng theo ngôn ngữ, build system và loại workload. Dùng khi cần tạo hoặc cập nhật Dockerfile, .dockerignore, compose.yaml cho local, chọn base image, multi-stage build, entrypoint, healthcheck, cache build hoặc packaging contract cho Node.js, Python, Java, .NET, Go, PHP và các workload như web API, worker, cron, frontend static.
---

# Containerization Packaging

> English: SKILL.md

Chốt contract đóng gói ứng dụng thành container theo language stack và workload thực tế.

## Mục Tiêu

- Chọn chiến lược `Dockerfile` phù hợp với ngôn ngữ và build system.
- Chuẩn hóa `compose.yaml` cho local nếu scope có nhu cầu chạy container tại máy dev.
- Chốt entrypoint, command, port, healthcheck, artifact copy và cache strategy.
- Giảm drift giữa cách build local, CI và môi trường deploy.
- Tạo đầu vào đủ rõ cho step implement materialize file container runtime.

## Khi Sử Dụng

- Khi cần tạo hoặc sửa `Dockerfile`, `.dockerignore`, `compose.yaml`.
- Khi cần quyết định base image, multi-stage build, user chạy container, entrypoint hoặc healthcheck.
- Khi packaging phụ thuộc mạnh vào ngôn ngữ, framework, build artifact hoặc workload.
- Khi cần chốt local baseline cho web app, API, worker, cron, frontend static hoặc monolith.

## Không Thuộc Phạm Vi

- Không chọn runtime deploy cho `dev`, `uat`, `prod`; việc đó thuộc `platform-runtime-deployment`.
- Không thiết kế pipeline CI/CD; việc đó thuộc `ci-cd-release`.
- Không thay thế `implementation` để viết file thật trong repo.

## Đầu Vào Tối Thiểu

- `language_stack`
- `build_system`
- `application_type`
- `runtime_requirements`
- `local_dependency_needs`

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
packaging_scope: ""
language_profile:
  primary_language: ""
  framework: ""
  build_system: ""
  artifact_type: ""
workload_profile: web_api|worker|cron|frontend_static|monolith|microservice
dockerfile_contract:
  file_path: ""
  build_context: ""
  base_images: []
  stages: []
  build_args: []
  artifact_paths: []
  entrypoint: ""
  command: ""
  exposed_ports: []
  run_as_non_root: true|false
dockerignore_rules: []
local_compose_contract:
  required: true|false
  file_path: ""
  services: []
  env_files: []
  volumes: []
  profiles: []
build_optimizations: []
security_guards: []
verification_checks: []
packaging_recommendation: READY|READY_WITH_GUARDS|BLOCKED
notes_for_implementation: ""
```

## Quy Tắc Chính

- `Dockerfile` phải phản ánh đúng build artifact và startup command thật sự của ứng dụng.
- Ưu tiên multi-stage build khi có bước compile hoặc bundle tách biệt.
- Không copy toàn bộ workspace vào image nếu chỉ cần một phần.
- Không bake secrets vào image.
- Nếu local có phụ trợ như database, cache, queue, mô tả chúng trong `compose.yaml` thay vì chỉ ghi chạy tay.
- `frontend_static` và `web_api` không nên dùng cùng một pattern entrypoint nếu artifact runtime khác nhau.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:

- Ở step 5, đặt schema YAML của skill này trong `## Architecture Details` cùng các schema DevOps khác đang có trong scope.
- Ở step 8, khi scope có packaging hoặc rollout, đặt schema của skill này trong `## Deployment Review` cạnh `deployment-devops` và các schema DevOps chuyên biệt khác đang có.
- Không thay thế `## Main Artifact`; output của skill này luôn là block DevOps hỗ trợ, không phải main artifact của step.

## Luật Ra Quyết Định

- `READY` khi `dockerfile_contract` phản ánh đúng build artifact và startup command thật, không có secret nào bị bake vào image, và đã có `verification_checks`.
- `READY_WITH_GUARDS` khi packaging vẫn chạy được nhưng kèm guard rõ (vd chạy tạm bằng root user có follow-up theo dõi, hoặc thiếu `healthcheck` được bù bằng external monitor).
- `BLOCKED` khi không xác định được base image hoặc build stage cho `language_profile`, phải bake secret vào image mới chạy được, hoặc pattern `entrypoint`/`command` cho `workload_profile` chưa xác định.

## Tài Liệu Tham Chiếu

- `references/language-stacks.md`: chọn packaging pattern theo Node.js, Python, Java, .NET, Go, PHP.
- `references/workload-profiles.md`: chọn pattern theo web API, worker, cron, frontend static, monolith.

## Điều Kiện Hoàn Tất

- Có `language_profile` và `workload_profile` rõ ràng.
- Có `dockerfile_contract` đủ để implement file thật.
- Có `local_compose_contract` khi local cần chạy bằng container.
- Có `verification_checks` đủ để step 8 kiểm chứng packaging.
