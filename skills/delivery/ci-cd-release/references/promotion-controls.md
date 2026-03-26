# Promotion Và Release Controls

## Tagging

- Dùng tag bất biến theo commit SHA, build number hoặc semantic version.
- Có thể có tag tiện thao tác như `dev` hoặc `stable`, nhưng không dùng làm source of truth duy nhất.

## Promotion

- `local -> dev`: mục tiêu xác nhận artifact build và deploy được.
- `dev -> uat`: mục tiêu xác nhận artifact đủ ổn định cho kiểm chứng gần production.
- `uat -> prod`: mục tiêu release có kiểm soát, có approval và rollback path.

## Approval

- Approval nên gắn với môi trường và mức rủi ro, đặc biệt cho `prod`.
- Nếu approval là manual, ghi rõ ai chịu trách nhiệm và điều kiện cần thấy trước khi approve.

## Rollback

- Rollback phải trỏ về artifact đã biết tốt.
- Nếu có migration hoặc thay đổi stateful, ghi rõ rollback control ở tầng app và tầng data.

## Evidence

- Build log
- Test/scan result
- Artifact digest hoặc image tag bất biến
- Deploy result
- Post-deploy smoke hoặc health evidence