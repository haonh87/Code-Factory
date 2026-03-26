# Runtime Platforms

## Docker

- Phù hợp môi trường đơn giản, đơn host, ít orchestration.
- Deployment unit thường là container hoặc compose project.
- Rollout thường là recreate hoặc script có kiểm soát.
- Cần guard rõ cho restart policy, mounted config và log collection.

## Docker Swarm

- Phù hợp khi team đang vận hành multi-host nhưng muốn giữ ecosystem Docker-native.
- Deployment unit thường là service hoặc stack.
- Có rolling update tích hợp nhưng cần chốt update config, rollback config và health behavior.
- Secrets và configs nên dùng native primitive của Swarm khi có thể.

## Kubernetes

- Phù hợp khi cần scheduling, policy, autoscaling, workload type đa dạng.
- Deployment unit có thể là Deployment, StatefulSet, DaemonSet, Job, CronJob hoặc Helm release.
- Config, secret, service account, ingress và autoscaling nên được mô tả rõ thay vì chỉ ghi “deploy lên k8s”.
- Rollout strategy có thể là rolling, blue-green, canary tùy controller và tooling.

## Rule Chọn Platform

- Chọn platform mà team vận hành được, không chọn chỉ vì phổ biến.
- Nếu workload đơn giản và quy mô nhỏ, `docker` có thể đủ.
- Nếu cần multi-host nhưng chưa cần toàn bộ phức tạp của K8s, cân nhắc `swarm`.
- Nếu cần policy, autoscaling, service mesh, workload đa dạng hoặc chuẩn tổ chức đã khóa, dùng `k8s`.