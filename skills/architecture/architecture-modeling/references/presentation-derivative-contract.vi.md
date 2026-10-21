# Bản trình bày dẫn xuất tùy chọn

Sau khi model, view, source_fact_ids, đích và một owner chính tắc được xác thực, kết xuất
chính tắc thành công, mới có thể tạo request presentation_derivative tùy chọn.
Tách request/result khỏi render_plan chính tắc. Không đổi owner hoặc định tuyến
DRAWIO/MERMAID/STRUCTURIZR_DSL; không coi diagram-design-presentation-adapter là house
renderer chính tắc.

Block tùy chọn chứa request và result. Ánh xạ ý định SA/TA vào requesting_role,
audience_profile, declared_question, canonical_model_ref, canonical_view_ref,
source_fact_ids, destination_ref, requested_formats (HTML/SVG/PNG),
presentation_artifact_id và render_owner (diagram-design-presentation-adapter).
Cung cấp bản JSON cục bộ đã xác thực của hợp đồng model/view, giữ đủ facts, trường,
evidence, constraint và gap chú thích. Với DSL, xác thực projection đầy đủ với nguồn
trước. Giữ nguyên nguồn và artifact chính tắc.

Result ACCEPTED chứa output_refs và validation_evidence_refs riêng; REJECTED chứa
rejection_reasons và blocking_input_refs. Adapter thiếu hoặc tắt không xuất block/artifact
trình bày; adapter từ chối ghi lý do, không thay model. Cả ba trường hợp đều giữ byte,
tính hợp lệ và ownership chính tắc. Không thêm ID trình bày vào render_plan hoặc lấy quyền
ghi từ request. Chỉ gọi sau baseline CHANGE-004 đã xác thực, với write grants bên gọi cấp.

Theo hợp đồng request/result, output và provenance của adapter. Adapter chỉ sở hữu bản
trình bày, không sở hữu sự thật kiến trúc hay gate con người. Đánh giá người đọc độc lập
và DoD/Release/Business Acceptance vẫn tách riêng.
