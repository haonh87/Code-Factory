---
language: vi
---

# DOD Canonical Pattern

> English: dod-pattern.md

Chỉ áp dụng reference này khi `architecture_style = DOD`. Nếu chọn style khác, bỏ qua hoàn toàn file này.

## 1. Mục Tiêu Chuẩn Hóa

- Chuẩn hóa toàn bộ source code business theo cùng một shape, bất kể service hay framework.
- Dùng `domain module` làm đơn vị tổ chức chính thay vì bắt đầu bằng layer kỹ thuật toàn cục.
- Giữ domain boundary, ownership và dependency rule rõ nhưng không ép full `DDD`.

## 2. Đơn Vị Cấu Trúc Bắt Buộc

- `domain module` là cấp thư mục business cao nhất và bắt buộc phải hiện diện trong source code.
- `subdomain` chỉ dùng để phân tích landscape hoặc nhóm capability trong tài liệu; không tạo thêm cấp thư mục mặc định chỉ vì muốn mô tả business chi tiết hơn.
- `bounded context` chỉ được đưa vào nếu thật sự có khác biệt ngôn ngữ, rule hoặc ownership; khi đó cân nhắc chuyển sang `DDD_LITE` hoặc `DDD`.

## 3. Source Code Shape Chuẩn

Mặc định đề xuất:

```text
src/
  modules/
    <module-name>/
      api/
      presentation/
      application/
      domain/
      infrastructure/
  shared/
    kernel/
```

Trong đó:

- `modules/<module-name>/` là boundary chính của một vùng nghiệp vụ.
- `api/` là contract công khai để module khác tương tác, ví dụ command/query facade, DTO contract, event contract.
- `presentation/` là inbound adapter như HTTP controller, gRPC handler, consumer, scheduler, CLI command.
- `application/` là use case, DTO nội bộ của use case, port interface, orchestration và transaction boundary.
- `domain/` là entity, value object, policy, domain service, domain event và business rule thuần.
- `infrastructure/` là repository implementation, external client, mapper, outbox publisher, adapter kỹ thuật.
- `shared/kernel/` chỉ chứa primitive kỹ thuật hoặc utility trung tính domain; tuyệt đối không chứa business rule liên module.

## 4. Dependency Rule Chuẩn

Phụ thuộc hợp lệ:

- `presentation -> application`
- `application -> domain`
- `application -> api` của module khác nếu cần gọi contract công khai
- `infrastructure -> application` và `infrastructure -> domain` để implement port hoặc map dữ liệu

Phụ thuộc bị cấm:

- `module A/domain -> module B/domain`
- `module A/application -> module B/infrastructure`
- `module A/presentation -> module B/domain`
- Mọi truy cập trực tiếp từ module này vào repository, ORM model hoặc internal service của module khác

Nguyên tắc tương tác:

- Cross-module write đi qua use case, facade hoặc command contract của module owner.
- Cross-module read ưu tiên đi qua read model, query contract hoặc view được expose rõ.
- Module chỉ được expose những gì nằm trong `api/`; các thư mục còn lại mặc định là private.

## 5. Ownership Rule Chuẩn

- Mỗi business capability quan trọng phải có đúng một `owner_module`.
- Mỗi nguồn dữ liệu nghiệp vụ chính phải có một module chịu trách nhiệm thay đổi.
- Không chia ownership theo controller, endpoint, table đơn lẻ hoặc team convenience nếu capability business chưa tách.
- Nếu hai module cùng sửa một tập rule hoặc cùng sở hữu một lifecycle, đó là dấu hiệu boundary đang sai.

## 6. Cách Đặt Tên Module

- Đặt tên theo business capability hoặc danh từ nghiệp vụ ổn định, ví dụ `customer`, `order`, `voucher`, `payment`.
- Không đặt theo framework, channel hay technical concern như `http`, `job`, `repository`, `service`.
- Không dùng tên mơ hồ như `core`, `common`, `base`, `manager` cho business module.

## 7. Khi Nào Được Tách Module

Chỉ tách thành module mới khi có ít nhất một trong các tín hiệu sau:

- Khác ownership của business rule hoặc dữ liệu chính.
- Khác lifecycle thay đổi hoặc cadence release.
- Khác nguồn sự thật dữ liệu.
- Khác integration boundary với hệ ngoài.
- Cùng một thuật ngữ nhưng mang nghĩa khác nhau theo ngữ cảnh.

Không tách module chỉ vì:

- Có nhiều endpoint.
- Có nhiều màn hình.
- Có nhiều bảng.
- Muốn chia folder cho gọn.

## 8. Khi Nào Không Còn Là DOD Thuần

- Khi cần nhiều `bounded_contexts` với language map rõ.
- Khi cần aggregate root, invariant và value object làm xương sống cho nhiều module hotspot.
- Khi cần context map giữa nhiều team hoặc nhiều service độc lập.

Các trường hợp này nên nâng lên `DDD_LITE` hoặc `DDD`.

## 9. Checklist Review Cho DOD

- Top-level business code có đi theo `modules/<module>` hay không.
- Mỗi module có `purpose`, `responsibilities`, `owned_data` rõ hay không.
- Có public contract rõ cho cross-module interaction hay không.
- Có import chéo vào `domain/` hoặc `infrastructure/` của module khác hay không.
- Có business rule bị đẩy vào `shared`, `common`, `core` hay không.
- Có module nào đang bị đặt tên theo technical layer thay vì business capability hay không.
