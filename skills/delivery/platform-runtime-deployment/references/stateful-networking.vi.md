---
language: vi
---

# Stateful, Networking Và Guard Vận Hành

> English: stateful-networking.md

## Stateful Workload

- Chốt rõ volume, retention, backup hoặc snapshot trước rollout quan trọng.
- Rollback app và rollback data không được xem là cùng một việc.
- Nếu state migration không đảo ngược được, tăng mức guard và release recommendation.

## Networking

- Liệt kê entrypoint, internal service communication và dependency network cần thiết.
- Chốt ingress strategy, TLS termination và service discovery ở đúng layer platform.
- Không để routing hoặc port mapping mơ hồ ở production-like environment.

## Config Và Secrets

- Config và secret phải tách khỏi image.
- Nêu rõ source như env file, secret manager, Swarm secret, K8s Secret hay external secret operator.
- Không commit secret thật vào repo.

## Scaling Và Disruption

- Workload stateless có thể scale ngang nếu contract cho phép.
- Workload stateful cần rule rõ về replica, leader election hoặc partition tolerance.
- Nêu rõ readiness, liveness và disruption control nếu rollout có rủi ro ảnh hưởng traffic.

## Observability

- Sau deploy phải có post-check đủ mạnh: health, log, metric, queue lag hoặc business smoke.
- Nếu chưa có observability tối thiểu, release recommendation không nên là `READY`.
