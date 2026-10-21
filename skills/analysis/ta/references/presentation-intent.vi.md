# Bàn giao ý định trình bày

SA/TA chỉ ghi ý định tại s01-s04; không chọn renderer, vẽ sơ đồ, chọn giải pháp hoặc
xuất model chính tắc. Không thêm trường cấp cao vào schema đầu ra.
Dùng invocation.directives_parsed để giữ vai trò yêu cầu (SA|TA), audience
(AUD-BUSINESS|AUD-ENGINEERING) và nhu cầu trình bày; dùng landscape.question_answered
cho câu hỏi. Giữ landscape.produced_by là architecture-modeling. Ghi ràng buộc bàn giao
vào handoff.to_dev.items, tiêu chí người đọc vào handoff.to_qc.items theo ownership hiện có.

Tại s05, architecture-modeling xác thực model/view và render_plan chính tắc trước.
Sau đó mới lập request tùy chọn cho diagram-design-presentation-adapter với
canonical_model_ref, canonical_view_ref, source_fact_ids đầy đủ, ID/owner riêng,
đủ HTML/SVG/PNG và đích được cấp riêng. Adapter không có quyền kết xuất chính tắc.
Adapter thiếu/bị tắt/từ chối vẫn giữ kết quả chính tắc hợp lệ. Không suy diễn quyền ghi,
facts, owner hoặc phê duyệt gate từ request trình bày.
