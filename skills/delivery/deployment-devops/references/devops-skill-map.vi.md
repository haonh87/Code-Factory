---
language: vi
---

# DevOps Skill Map

> English: devops-skill-map.md

## Khi Dùng `deployment-devops`

Dùng skill này khi cần nhìn DevOps theo bức tranh tổng:

- work item chạm nhiều môi trường
- vừa có packaging vừa có runtime deploy vừa có pipeline/release
- chưa rõ nên tách concern theo layer nào

## Khi Dùng `containerization-packaging`

Dùng khi trọng tâm là:

- `Dockerfile`
- `.dockerignore`
- `compose.yaml`
- base image
- build stage
- entrypoint
- healthcheck
- packaging theo Node.js, Python, Java, .NET, Go, PHP

## Khi Dùng `platform-runtime-deployment`

Dùng khi trọng tâm là:

- Docker hay Swarm hay Kubernetes
- deployment unit
- ingress
- secrets/config
- volume
- scaling
- stateful concern
- rollout/rollback trên runtime

## Khi Dùng `ci-cd-release`

Dùng khi trọng tâm là:

- pipeline CI/CD
- registry
- tagging
- artifact immutability
- promotion flow
- approval
- release gate
- rollback control ở mức pipeline/release

## Rule Phối Hợp

- Nếu chỉ có một concern nổi bật, gọi thẳng skill chuyên trách tương ứng.
- Nếu concern chồng lên nhau hoặc user nói “làm DevOps tổng thể”, bắt đầu bằng `deployment-devops`.
- `deployment-devops` không thay thế 3 skill chuyên trách; nó dùng để định tuyến và tổng hợp.
