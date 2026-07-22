---
language: vi
---

# Promotion Flow

> English: promotion-flow.md

## Thứ Tự Chuẩn

`local -> dev -> uat -> prod`

Mỗi lần promote nên giữ nguyên image contract; chỉ thay config, secrets, replica, resource và guard.

## Tag Strategy

- Chủ sở hữu chuẩn cho tagging/approval/evidence là `ci-cd-release/references/promotion-controls.vi.md § Tagging`; dùng trực tiếp reference đó thay vì suy diễn lại tag policy ở đây.
- Điều quan trọng ở tầng này: bất kể chọn tag strategy nào, mọi môi trường trong `Thứ Tự Chuẩn` phải promote cùng artifact/image contract bất biến — chỉ config, secrets, replica, resource và guard thay đổi giữa các môi trường.

## Gate Theo Môi Trường

| Môi trường | Mục tiêu | Gate tối thiểu |
|---|---|---|
| `dev` | Xác nhận artifact build được, deploy được và smoke pass | image build pass, deploy pass, health pass |
| `uat` | Xác nhận hành vi gần production, sẵn sàng business validation | cùng image với nhánh promote, smoke pass, test nghiệp vụ hoặc sign-off liên quan |
| `prod` | Rollout an toàn với khả năng rollback | approval nếu cần, rollout plan, observability check, rollback path |

## Rollout Rule

- Chọn strategy rõ ràng: `recreate`, `rolling`, `blue-green`, `canary`, `manual phased rollout`.
- Strategy phải phù hợp runtime và mức chịu rủi ro của môi trường.
- Ghi rõ verification ngay sau rollout: health, smoke, log, metric, queue lag hoặc business KPI ngắn hạn nếu có.

## Rollback Rule

- Rollback phải dựa trên artifact đã biết là tốt, không rollback mù.
- Nếu có migration hoặc stateful change, rollback app và rollback data không được xem là một việc giống nhau.
- Nêu rõ điều kiện dừng rollout và điều kiện kích hoạt rollback.

## Guard Vận Hành Thường Gặp

- Manual approval trước `prod`
- Backup hoặc snapshot trước thay đổi stateful
- Feature flag
- Monitoring dashboard và alert window
- Maintenance window hoặc communication plan

## Dấu Hiệu BLOCKED

- Chưa có image bất biến hoặc chưa chốt tag strategy.
- Chưa có runtime target rõ cho môi trường đích.
- Chưa có verification check sau deploy.
- Chưa có rollback path khả thi cho môi trường quan trọng.
