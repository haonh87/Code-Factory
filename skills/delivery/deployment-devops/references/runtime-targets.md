# Runtime Targets

## Bất Biến Xuyên Môi Trường

- Cùng một image contract nên được promote từ `dev` sang `uat` và `prod`.
- Khác biệt môi trường nằm ở config, secrets, replica, resource, ingress và guard vận hành.
- Health check phải tồn tại ở mức phù hợp với runtime đích.
- Rollout và rollback phải được mô tả theo đúng deployment unit của runtime.

## Ma Trận Runtime

| Runtime | Khi phù hợp | Deployment unit thường gặp | Cấu hình và secrets | Rollout / rollback |
|---|---|---|---|---|
| `docker` | Máy đơn, môi trường đơn giản, service ít | container hoặc compose project | env file, mounted file, secret manager ngoài nếu có | recreate hoặc script có kiểm soát |
| `swarm` | Multi-host vừa phải, team muốn giữ Docker-native ops | service hoặc stack | config/secret của Swarm, overlay network | rolling update, rollback service hoặc stack |
| `k8s` | Cần orchestration đầy đủ, autoscaling, policy, ecosystem mạnh | Deployment, StatefulSet, Job, Helm release | ConfigMap, Secret, external secret operator, service account | rolling update, canary/blue-green tùy controller |

## Gợi Ý Theo Môi Trường

- `local`: luôn bắt đầu bằng `docker` với `Dockerfile` và `compose.yaml`.
- `dev`: có thể dùng `docker`, `swarm` hoặc `k8s` tùy maturity và hạ tầng sẵn có.
- `uat`: ưu tiên bám topology gần `prod` nhất để kiểm chứng release.
- `prod`: dùng runtime đã được team vận hành thành thạo; không đổi nền tảng chỉ vì trào lưu.

## Mapping Cần Chốt Trong environment_matrix

- `runtime`: `docker|swarm|k8s`
- `deployment_unit`: ví dụ `compose project`, `swarm stack`, `k8s deployment`
- `artifacts_expected`: ví dụ `Dockerfile`, `compose.yaml`, `stack.yaml`, `helm values`, `k8s manifests`
- `config_sources`: env file, mounted config, ConfigMap, parameter store
- `secret_sources`: secret manager, Swarm secret, K8s Secret, external secret operator

## Rule Chọn Runtime

- Chọn `docker` khi phạm vi nhỏ, vận hành đơn host và nhu cầu orchestration thấp.
- Chọn `swarm` khi team đang ở hệ Docker-native multi-host và không cần toàn bộ ecosystem của K8s.
- Chọn `k8s` khi cần scheduling, autoscaling, policy, workload type đa dạng hoặc chuẩn nền tảng đã khóa ở cấp tổ chức.
- Nếu `uat` và `prod` dùng runtime khác nhau, phải nêu rõ lý do và rủi ro tương thích.
