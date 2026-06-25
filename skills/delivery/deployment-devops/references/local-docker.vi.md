---
language: vi
---

# Baseline Local Docker

> English: local-docker.md

## Mục Tiêu

Tạo baseline chạy local đủ gần production để developer có thể build, boot, debug và verify nhanh bằng container.

## Dockerfile Checklist

- Dùng multi-stage build nếu project có bước build riêng.
- Tạo image tối thiểu, chỉ chứa runtime cần thiết.
- Không chạy process bằng user `root` nếu không có lý do bắt buộc.
- Không copy toàn bộ workspace nếu có thể giới hạn bằng `.dockerignore`.
- Không đưa secrets vào `ARG` hoặc `ENV` cố định trong image.
- Ghi rõ `WORKDIR`, entrypoint hoặc command khởi động.
- Khai báo `EXPOSE` theo cổng thật sự phục vụ traffic nội bộ hoặc debug.
- Thêm `HEALTHCHECK` nếu runtime hỗ trợ và service có endpoint phù hợp.

## compose.yaml Checklist

- Dùng tên file chuẩn `compose.yaml`.
- Khai báo service chính và dependency phụ trợ cần cho local như database, cache, queue giả lập.
- Chỉ map port thật sự cần expose cho developer.
- Dùng named volume hoặc bind mount có chủ đích; tránh mount bừa toàn bộ filesystem nếu không cần hot reload.
- Dùng `depends_on` kèm health behavior hợp lý; không giả định service phụ sẵn sàng ngay khi container start.
- Dùng `env_file` hoặc biến môi trường runtime cho non-secret config.
- Không commit secrets thật vào compose file.
- Dùng `profiles` khi local có nhiều mode như `app-only`, `full-stack`, `worker`.

## Verify Tối Thiểu

- `docker build` chạy thành công từ `build_context` đã chốt.
- `docker compose config` render thành công.
- `docker compose up` boot được service chính và dependency trong profile mặc định.
- Health endpoint hoặc smoke check local xác nhận ứng dụng thực sự nhận request hoặc xử lý job.
- Logs khởi động không có lỗi blocker rõ ràng.

## Handoff Sang Step 7

- File cần materialize: `Dockerfile`, `compose.yaml`, `.dockerignore`, file env template nếu có.
- Nếu local cần script bootstrap, coi đó là artifact phụ; không thay cho `compose.yaml`.
