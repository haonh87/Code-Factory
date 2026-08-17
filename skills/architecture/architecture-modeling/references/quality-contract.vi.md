# Contract Chất Lượng Landscape

Áp dụng các check này cho system landscape hoặc integration architecture `DRAWIO` đại diện. Business
và engineering view có thể dùng label khác nhau nhưng đều phải trace về cùng model fact.

## Metric Bắt Buộc

```yaml
quality_metrics:
  named_ownership_rate:
    value: 0
    threshold: 1.0
  overlap_count:
    value: 0
    threshold: 0
  non_endpoint_intersection_count:
    value: 0
    threshold: 0
  unanalyzed_two_way_arrow_count:
    value: 0
    threshold: 0
  vague_aggregate_box_count:
    value: 0
    threshold: 0
  engineering_element_count:
    value: 0
    threshold: 25
  delete_test_failure_count:
    value: 0
    threshold: 0
  containment_error_count:
    value: 0
    threshold: 0
  manual_step_count:
    value: 0
    threshold: 1
```

Mỗi metric báo `value`, `threshold`, measurement evidence và status. Không bỏ metric fail hoặc
non-applicable; nếu không đo được phải ghi reason.

## Luật Geometry

- Boundary domain/capability chứa child box thuộc nó với padding nhìn thấy được.
- Box không overlap. Label nằm trong box hoặc edge-label cell sở hữu nó.
- Relationship dùng directed orthogonal route.
- Edge được chạm source/target endpoint của chính nó; cắt box khác là defect
  `non_endpoint_intersection_count`.
- Edge được route có chủ đích nhưng cắt edge khác vẫn phải ghi để review dù XML hợp lệ.

## Luật Semantic

- Mọi system nhìn thấy có named owner hoặc annotation `OPEN owner` rõ.
- Không có mũi tên hai chiều chưa phân tích. Hành vi ngược chiều là relationship có hướng riêng.
- Không có vague box chỉ tên `integration layer`, `middleware`, `platform` hoặc tương đương mà thiếu
  stable fact, responsibility và owner.
- Engineering view có tối đa 25 element. Tách theo governed boundary thay vì thu nhỏ label.
- Delete test hỏi với từng box: nếu xóa, ai sẽ quyết định sai? Box không trả lời được câu hỏi quyết
  định là fail.
- Containment theo canonical boundary fact, không theo tiện lợi trình bày.

## Ngân Sách Manual Step

Output phải mở được như mxGraph XML hợp lệ và cần không quá một manual step được nêu. Manual step duy
nhất được phép là mở representative artifact để QC visual confirmation. Phải re-layout, nối lại edge
hoặc sửa label là quality failure.

## Verdict

- `PASS`: mọi threshold pass và XML hợp lệ về structure.
- `PARTIAL`: chỉ còn manual/QC check được nêu rõ, mọi automated threshold đã pass.
- `FAIL`: automated threshold fail, ownership chưa rõ hoặc artifact cần sửa.

First-open QC check tách khỏi automated geometry evidence và renderer không được tự phê duyệt.
