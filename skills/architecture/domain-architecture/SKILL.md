---
name: domain-architecture
description: Thiết kế kiến trúc theo domain cho hệ thống backend hoặc service nghiệp vụ. Dùng khi cần xác định domain module, bounded context, ownership, layer rule, interaction boundary và các quyết định kiến trúc theo hướng DOD, DDD hoặc DDD-lite trước khi chia task hoặc triển khai.
---

# Domain Architecture

Thiết kế kiến trúc xoay quanh domain để chốt boundary, ownership và các quy tắc phụ thuộc trước khi triển khai.

## Mục Tiêu

- Xác định domain module hoặc bounded context của bài toán.
- Chốt ownership của từng vùng nghiệp vụ, dữ liệu và trách nhiệm xử lý.
- Thiết kế layer rule và interaction boundary để giảm coupling.
- Chọn mức áp dụng phù hợp giữa `DOD`, `DDD-lite` và `DDD`.
- Tạo blueprint đủ rõ để `system-design`, `database-design` và `task-breakdown-planner` dùng tiếp.

## Khi Sử Dụng

- Khi feature hoặc service mới chạm vào nhiều domain hoặc nhiều nhóm nghiệp vụ.
- Khi cần quyết định nên tổ chức hệ thống theo `DOD`, `DDD-lite` hay `DDD`.
- Khi codebase đang bị trộn trách nhiệm giữa nhiều module hoặc nhiều team.
- Khi cần chốt boundary trước khi thiết kế database, API hay use case chi tiết.

## Không Thuộc Phạm Vi

- Không thiết kế chi tiết bảng, cột, index hay migration.
- Không viết code production hoặc chia task thực thi chi tiết.
- Không thay thế cho `system-design` ở mức API, message flow, cache hay infra detail.
- Không tự mở rộng scope business ngoài yêu cầu đã được làm rõ.

## Đầu Vào Tối Thiểu

- `business_goal`: mục tiêu business hoặc user outcome đã được chốt.
- `acceptance_criteria`: tiêu chí chức năng chính của yêu cầu.
- `domain_terms`: thuật ngữ nghiệp vụ, khái niệm chính, actor và process liên quan.
- `current_context`: bối cảnh hiện tại của codebase hoặc hệ thống đang có.
- `known_constraints`: ràng buộc về team, ownership, integration, compliance hoặc scale.

Nếu chưa xác định được `business_goal` hoặc chưa có đủ `domain_terms`, dừng và yêu cầu làm rõ thêm.

## Đầu Ra Bắt Buộc

Xuất artifact YAML theo schema sau:

```yaml
architecture_style: DOD|DDD_LITE|DDD
domain_modules:
  - name: ""
    purpose: ""
    responsibilities: []
    owned_data: []
bounded_contexts:
  - name: ""
    language_scope: ""
    upstream_dependencies: []
    downstream_dependencies: []
ownership_map:
  - area: ""
    owner_module: ""
    notes: ""
interaction_rules:
  - from: ""
    to: ""
    allowed_via: ""
    forbidden_patterns: []
layer_rules:
  presentation: []
  application: []
  domain: []
  infrastructure: []
aggregate_candidates: []
architecture_risks: []
notes_for_next_step: ""
```

## Ý Nghĩa Từng Output

- `architecture_style`: mức độ áp dụng kiến trúc domain phù hợp với bài toán.
- `domain_modules`: các module nghiệp vụ chính và trách nhiệm của từng module.
- `bounded_contexts`: boundary ngôn ngữ và boundary tích hợp nếu cần tách context.
- `ownership_map`: ai sở hữu logic, dữ liệu và quyết định thay đổi ở từng vùng.
- `interaction_rules`: kênh tương tác được phép giữa các module hoặc context.
- `layer_rules`: quy tắc phụ thuộc giữa presentation, application, domain và infrastructure.
- `aggregate_candidates`: gợi ý vùng nghiệp vụ cần xét sâu hơn ở bước thiết kế dữ liệu hoặc mô hình domain.
- `architecture_risks`: các rủi ro nếu chọn boundary sai hoặc ownership không rõ.
- `notes_for_next_step`: ghi chú chuyển sang `database-design`, `system-design` hoặc `task-breakdown-planner`.

## Chuẩn Hóa Output Trong Workflow Note

Nếu output của skill này được lưu thành note `.md` trong workflow chain:
- Dùng template step 5 tại `../../orchestration/codex-workflow-chain/references/workflow-chain.md`.
- Đặt schema YAML của skill này trong block `## Architecture Details`.
- Giữ nguyên tên field trong schema; không đổi tên field khi ghi vào note.
- Chỉ ghi block này khi bài toán thực sự cần khóa backend boundary, ownership hoặc dependency rule.

## Luồng Thực Thi

1. Xác định các thuật ngữ nghiệp vụ và actor chính.
2. Gom nhóm use case theo responsibility để tìm `domain_modules`.
3. Kiểm tra xem có cần `bounded_contexts` tách biệt hay chỉ cần module boundary.
4. Chọn `architecture_style` phù hợp giữa `DOD`, `DDD-lite` và `DDD`.
5. Gán ownership cho dữ liệu, business rule và integration point.
6. Viết `interaction_rules` để chặn dependency chéo không kiểm soát.
7. Viết `layer_rules` để khóa hướng phụ thuộc.
8. Ghi lại `aggregate_candidates` và `architecture_risks`.

## Quy Tắc Chất Lượng

- Mặc định viết và trao đổi bằng tiếng Việt.
- Không dùng `DDD` như nhãn hình thức nếu không chỉ ra boundary và ownership cụ thể.
- Nếu chọn `DOD`, mặc định áp cấu trúc `module-first`; không dùng `layer-first` làm cấu trúc gốc cho toàn bộ business code trừ khi hệ thống thực tế chỉ có đúng một domain module.
- Không gom toàn bộ nghiệp vụ vào một module chung kiểu `core`, `common`, `shared` nếu không có lý do rõ ràng.
- Mỗi module phải có trách nhiệm rõ và không trùng nghĩa với module khác.
- Nếu cùng một thuật ngữ mang nhiều nghĩa, phải cân nhắc tách `bounded_contexts`.
- Tài liệu phải lưu UTF-8 và không làm hỏng dấu tiếng Việt.

## Luật Ra Quyết Định

- Chọn `DOD` khi trọng tâm là tổ chức theo domain/module và độ phức tạp nghiệp vụ ở mức vừa.
- Chọn `DDD_LITE` khi đã cần aggregate, value object, invariant nhưng chưa cần strategic design đầy đủ.
- Chọn `DDD` khi có nhiều bounded context, nhiều team hoặc domain rule phức tạp.
- Trong `DOD`, `domain module` là đơn vị cấu trúc source code bắt buộc; `subdomain` chỉ là nhãn phân tích trong tài liệu nếu chưa có lý do tách thành module riêng.
- Nếu một dependency giữa hai module chỉ tồn tại để đọc dữ liệu, ưu tiên đi qua interface, contract hoặc read model thay vì cho phép truy cập trực tiếp logic nội bộ.
- Nếu ownership không rõ, đánh dấu thành `architecture_risks` thay vì tự suy diễn.

## DOD Canonical Pattern

Áp dụng mục này khi `architecture_style = DOD`.

### 1. Mục Tiêu Chuẩn Hóa

- Chuẩn hóa toàn bộ source code business theo cùng một shape, bất kể service hay framework.
- Dùng `domain module` làm đơn vị tổ chức chính thay vì bắt đầu bằng layer kỹ thuật toàn cục.
- Giữ domain boundary, ownership và dependency rule rõ nhưng không ép full `DDD`.

### 2. Đơn Vị Cấu Trúc Bắt Buộc

- `domain module` là cấp thư mục business cao nhất và bắt buộc phải hiện diện trong source code.
- `subdomain` chỉ dùng để phân tích landscape hoặc nhóm capability trong tài liệu; không tạo thêm cấp thư mục mặc định chỉ vì muốn mô tả business chi tiết hơn.
- `bounded context` chỉ được đưa vào nếu thật sự có khác biệt ngôn ngữ, rule hoặc ownership; khi đó cân nhắc chuyển sang `DDD_LITE` hoặc `DDD`.

### 3. Source Code Shape Chuẩn

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

### 4. Dependency Rule Chuẩn

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

### 5. Ownership Rule Chuẩn

- Mỗi business capability quan trọng phải có đúng một `owner_module`.
- Mỗi nguồn dữ liệu nghiệp vụ chính phải có một module chịu trách nhiệm thay đổi.
- Không chia ownership theo controller, endpoint, table đơn lẻ hoặc team convenience nếu capability business chưa tách.
- Nếu hai module cùng sửa một tập rule hoặc cùng sở hữu một lifecycle, đó là dấu hiệu boundary đang sai.

### 6. Cách Đặt Tên Module

- Đặt tên theo business capability hoặc danh từ nghiệp vụ ổn định, ví dụ `customer`, `order`, `voucher`, `payment`.
- Không đặt theo framework, channel hay technical concern như `http`, `job`, `repository`, `service`.
- Không dùng tên mơ hồ như `core`, `common`, `base`, `manager` cho business module.

### 7. Khi Nào Được Tách Module

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

### 8. Khi Nào Không Còn Là DOD Thuần

- Khi cần nhiều `bounded_contexts` với language map rõ.
- Khi cần aggregate root, invariant và value object làm xương sống cho nhiều module hotspot.
- Khi cần context map giữa nhiều team hoặc nhiều service độc lập.

Các trường hợp này nên nâng lên `DDD_LITE` hoặc `DDD`.

### 9. Checklist Review Cho DOD

- Top-level business code có đi theo `modules/<module>` hay không.
- Mỗi module có `purpose`, `responsibilities`, `owned_data` rõ hay không.
- Có public contract rõ cho cross-module interaction hay không.
- Có import chéo vào `domain/` hoặc `infrastructure/` của module khác hay không.
- Có business rule bị đẩy vào `shared`, `common`, `core` hay không.
- Có module nào đang bị đặt tên theo technical layer thay vì business capability hay không.

## Điều Kiện Hoàn Tất

- Có `architecture_style` và lý do chọn đủ rõ.
- Có `domain_modules` hoặc `bounded_contexts` đủ để bước sau không bị mơ hồ về ownership.
- Có `interaction_rules` và `layer_rules` đủ để kiểm soát dependency.
- Nếu chọn `DOD`, có source code shape chuẩn ở mức `module-first`, public contract và dependency rule đủ rõ để team áp dụng nhất quán.
- Có `architecture_risks` cho các điểm chưa chốt hoặc còn tranh chấp.
