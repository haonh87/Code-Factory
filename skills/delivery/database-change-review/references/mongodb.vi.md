---
language: vi
---

# MongoDB

> English: mongodb.md

Dùng reference này khi `database_design` hoặc `change_set` nhắm tới MongoDB.

## Rủi Ro Migration & Lock

- MongoDB mặc định không ép schema, nên "migration" thường là thay đổi contract ở tầng ứng dụng (field bắt buộc mới, đổi shape field) cộng với cập nhật validator `$jsonSchema` tuỳ chọn — rủi ro chuyển từ lock DDL sang tính đúng đắn của dual-write/backfill.
- Index build ở chế độ foreground sẽ block toàn bộ operation trên collection suốt thời gian build; bắt buộc dùng rolling/background index build (hoặc option background phù hợp driver/version) cho collection đang có traffic live.
- Thay đổi validator `$jsonSchema` với `validationAction: error` sẽ từ chối write từ document chưa được migrate — chỉ siết validator sau khi backfill hoàn tất, không bao giờ trước.

## Rollback

- Không có schema để rollback; đơn vị rollback là thay đổi validator và script backfill. Xác nhận có script đảo ngược nếu backfill không thuần cộng thêm (vd đổi tên hoặc xoá field).
- Xoá field đã thêm ở release trước cần bước backfill/cleanup riêng; không giả định nó tự biến mất khi deploy.

## Backfill

- Dùng bulk write (`bulkWrite`) theo batch có giới hạn, không update không giới hạn trên toàn collection — theo dõi oplog window/replication lag khi backfill lớn, đặc biệt trên replica set có oplog nhỏ.
- Ưu tiên backfill theo cursor trên khoảng `_id` để job có thể resume nếu bị gián đoạn.

## Rủi Ro Query / Tooling

- Yêu cầu `explain("executionStats")` cho query hot-path bị thay đổi; kiểm tra `COLLSCAN` ở nơi lẽ ra phải dùng index.
- Chú ý mảng `$in` không giới hạn và query không dùng được compound index do lệch thứ tự field.

## Fallback

- Nếu không có output `explain()`, liệt kê rủi ro query vào `required_actions` thay vì giả định index được dùng.
