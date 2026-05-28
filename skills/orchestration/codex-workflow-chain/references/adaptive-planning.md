# Adaptive Planning

Tài liệu này materialize `Phase 4: Adaptive Planning` theo hướng `BMAD-inspired routing`, nhưng vẫn giữ workflow backbone 8 bước là trục duy nhất.

## Mục Tiêu

- thêm `planning_track` vào workflow note
- route độ sâu authoring theo `quick|full|enterprise`
- giữ cùng một workflow backbone, không sinh workflow song song
- dùng validator và CI để khóa planning preset

## Planning Track

| Track | Khi dùng | Preset mặc định |
|---|---|---|
| `quick` | bug nhỏ, change nhỏ, scope hẹp, một boundary chính | `governance_profile=default`, `execution_mode=agentic`, `review_mode=self`, `sdd_mode=none` |
| `full` | feature/change thông thường, cần đủ discovery + delivery | `governance_profile=default`, `execution_mode=agentic`, `review_mode=self`, `sdd_mode=none` |
| `enterprise` | scope có nhiều role, review lane nặng, compliance/runtime risk cao | `governance_profile=strict`, `execution_mode=agentic`, `review_mode=independent`, `verification_owner=auditor`, `sdd_mode=none` |

## Routing Matrix

| Tín hiệu | Track khuyến nghị |
|---|---|
| một boundary, low risk, không cần review tách biệt | `quick` |
| nhiều requirement nhưng chưa tới mức compliance-heavy | `full` |
| nhiều role signoff, release risk cao, verify phải độc lập | `enterprise` |

## Rule Baseline Được Enforce

### `quick`

- `execution_mode` phải là `agentic`
- `review_mode` phải là `self`
- `sdd_mode` không được là `strict`

### `full`

- là baseline mặc định
- không thêm guardrail riêng ở phase này ngoài contract chung

### `enterprise`

- `governance_profile` không được là `default`
- step delivery `s05-s08` không được để `review_mode=self`
- step delivery `s05-s08` phải có `verification_owner`

## Command Chuẩn

Scaffold theo track:

```bash
wfc scaffold --work-item <work-item-slug> --planning-track quick
wfc scaffold --work-item <work-item-slug> --planning-track full
wfc scaffold --work-item <work-item-slug> --planning-track enterprise
```

Validate planning:

```bash
wfc plan --workflow-root work-items
```

## Sample Canonical

- `work-items/sample-quick-item/`
- `work-items/sample-enterprise-item/`
- các work item cũ chưa có `planning_track` hiện được validator xem như `full` để giữ backward compatibility trong rollout phase này
