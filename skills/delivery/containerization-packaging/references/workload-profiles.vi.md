---
language: vi
---

# Packaging Theo Workload

> English: workload-profiles.md

## web_api

- Cần `exposed_ports`, `healthcheck` và startup command phục vụ traffic.
- Nếu app phụ thuộc migration, không trộn migration chạy tự động vào startup nếu có thể gây downtime.

## worker

- Chốt rõ queue backend, concurrency model và graceful shutdown behavior.
- Worker không nhất thiết expose port; tránh copy nguyên pattern từ web API.

## cron

- Chốt rõ scheduler nằm trong container hay do platform orchestration kích hoạt.
- Nếu dùng cron kiểu sidecar hoặc platform job, đừng giả lập bằng vòng lặp sleep mơ hồ.

## frontend_static

- Chốt artifact build và static server phù hợp.
- Nếu app chỉ là static asset, runtime image nên tối giản; không kéo nguyên toolchain vào runtime.

## monolith

- Liệt kê rõ process chính và process phụ cần tách.
- Nếu một image phải phục vụ nhiều role, dùng command hoặc profile rõ ràng; không làm entrypoint quá thông minh.

## microservice

- Giữ image và compose service gọn theo một bounded responsibility.
- Phụ trợ local chỉ khai báo những gì service thật sự cần để boot hoặc verify.
