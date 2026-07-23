---
language: vi
---

# Ví Dụ Minh Hoạ

> English: example.md

Yêu cầu gốc:
- "Làm chức năng cho phép người dùng đăng nhập trên hệ thống."

Artifact mong đợi:

```yaml
raw_request: "Làm chức năng cho phép người dùng đăng nhập trên hệ thống."
restated_request: "Cho phép người dùng đăng nhập bằng thông tin xác thực hợp lệ để truy cập vào hệ thống."
request_type: FEATURE
business_context: "Người dùng cần xác thực trước khi sử dụng các chức năng cá nhân hóa."
scope_in:
  - "Luồng đăng nhập thành công và thất bại"
  - "Thông báo lỗi khi sai thông tin xác thực"
scope_out:
  - "Đăng nhập mạng xã hội"
  - "Quên mật khẩu"
open_questions:
  - "Sử dụng session hay JWT?"
  - "Có yêu cầu khóa tài khoản khi nhập sai nhiều lần không?"
assumptions:
  - "Hệ thống đã có bảng user và cơ chế lưu mật khẩu an toàn"
dependencies:
  - "Dịch vụ user hiện tại"
risks_initial:
  - "Thiếu policy bảo mật cho rate limit và lockout"
acceptance_criteria_draft:
  - id: AC1
    description: "Người dùng đăng nhập thành công khi cung cấp thông tin hợp lệ"
    measurable: true
  - id: AC2
    description: "Người dùng nhận thông báo lỗi phù hợp khi cung cấp thông tin không hợp lệ"
    measurable: true
notes_for_next_step: "Cần chốt technical approach cho session/JWT và policy bảo mật."
```
