# Hợp đồng request và result v1

Các trường bắt buộc: requesting_role (SA|TA), audience_profile
(AUD-BUSINESS|AUD-ENGINEERING), declared_question, canonical_model_ref,
canonical_view_ref, source_fact_ids, destination_ref, requested_formats,
presentation_artifact_id và render_owner (`diagram-design-presentation-adapter`).
Từ chối trường lạ gồm content, HTML, URL, instruction và ghi đè dependency.
Bắt buộc đủ HTML/SVG/PNG; ID và owner bản trình bày phải khác ID/owner chính tắc.

Đầu vào thực thi dùng bản JSON của hợp đồng model/view hiện có; JSON tương thích YAML,
không tạo định dạng chính tắc mới. Với DSL, architecture-modeling phải cung cấp projection
đầy đủ đã xác thực. Adapter không phân tích DSL/YAML tùy ý hoặc suy diễn facts.
Tệp model chứa architecture_model và gaps; view chứa view_id, source_fact_ids,
render_owner, render_format, artifact_path. Artifact chính tắc phải tồn tại cục bộ.
Giữ đủ trường, ownership, boundary, constraint, evidence và hướng quan hệ trong projection.
BLOCK_MODEL/BLOCK_RENDER từ chối bản trình bày; ANNOTATE phải hiển thị.

Context riêng do bên gọi cấp: project_root, write_roots rõ ràng và change004_verified=true
sau khi kiểm tra baseline. Request không tự cấp quyền. Đường dẫn tương đối trong project,
không symlink, traversal hoặc URL; đích là thư mục mới dưới write root, parent đã tồn tại,
không ghi đè hoặc va chạm artifact chính tắc.

`node scripts/validate-request.js request.json context.json` chỉ kiểm tra, không ghi tệp.
ACCEPTED preflight có output/evidence refs rỗng tới khi export thành công. Kết quả cuối có
presentation_artifact_id, render_owner, canonical_source_ref, canonical_view_ref,
audience_profile, declared_question, source_fact_ids, output_refs, validation_evidence_refs.
REJECTED có rejection_reasons, blocking_input_refs và output/evidence refs rỗng; CLI thoát lỗi.
Mỗi lần gọi đều kiểm tra byte upstream đã khóa.

Từ chối model/view thiếu, facts thiếu/trùng/không biết, owner/ID chưa chốt hoặc trùng,
đích sai, nội dung tự thêm, format ngoài phạm vi, URL/nội dung thực thi, provenance sai
và baseline CHANGE-004 chưa xác thực. Không request nào được tự duyệt gate.
