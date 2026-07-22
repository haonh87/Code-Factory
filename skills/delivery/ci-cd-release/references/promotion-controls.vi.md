---
language: vi
---

# Promotion Và Release Controls

> English: promotion-controls.md

## Tagging

- Dùng tag bất biến theo commit SHA, build number hoặc semantic version.
- Có thể có tag tiện thao tác như `dev` hoặc `stable`, nhưng không dùng làm source of truth duy nhất.

## Promotion

- Chủ sở hữu chuẩn cho mục tiêu promotion và gate tối thiểu theo môi trường là `deployment-devops/references/promotion-flow.vi.md § Gate Theo Môi Trường`; dùng trực tiếp bảng đó thay vì suy diễn lại mục tiêu từng stage ở đây.
- Điều quan trọng ở tầng này: pipeline phải thực sự enforce gate tối thiểu của bảng đó trước khi cho artifact sang môi trường kế tiếp — pipeline stage bỏ qua gate là lỗi pipeline, không phải khoảng trống policy.

## Approval

- Approval nên gắn với môi trường và mức rủi ro, đặc biệt cho `prod`.
- Nếu approval là manual, ghi rõ ai chịu trách nhiệm và điều kiện cần thấy trước khi approve.

## Rollback

- Chủ sở hữu chuẩn cho rollback rule (artifact đã biết tốt, phân biệt tầng app/data cho migration, điều kiện dừng/kích hoạt) là `deployment-devops/references/promotion-flow.vi.md § Rollback Rule`.
- Điều quan trọng ở tầng này: "artifact đã biết tốt" mà rollback trỏ về phải resolve về đúng tag bất biến của file này, không bao giờ là tag tiện thao tác.

## Evidence

- Build log
- Test/scan result
- Artifact digest hoặc image tag bất biến
- Deploy result
- Post-deploy smoke hoặc health evidence
