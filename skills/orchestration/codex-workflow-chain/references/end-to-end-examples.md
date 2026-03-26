# Ví Dụ End-To-End Workflow

Tài liệu này minh họa cách áp dụng `workflow-chain.md` và `execution-runtime.md` vào tình huống thực tế.

- Ví dụ A: work item nhỏ, một ownership boundary chính, chạy `agentic`.
- Ví dụ B: feature có nhiều boundary và tài liệu ngoài, chạy `multi-agent` từ step 5 trở đi và có dùng `notebooklm` như supporting research skill.
- Ví dụ C: `CHANGE` có migration/backfill/index rollout, chạy `multi-agent` theo kiểu database-heavy.

## Cách Đọc Ví Dụ

- Mỗi ví dụ đều đi qua đủ 8 step.
- Không phải step nào cũng phải materialize thành file trong thực tế, nhưng ví dụ này giả định có note workflow để dễ trace.
- Note `.md` của từng step vẫn là source of truth; output từ worker hoặc `notebooklm` chỉ là input phụ cho note đó.

## Ví Dụ A: `BUG` Nhỏ Chạy `agentic`

### Bối Cảnh

- `work_item_slug`: `fix-profile-phone-validation`
- `work_item_type`: `BUG`
- Mô tả ngắn: form cập nhật hồ sơ chấp nhận số điện thoại Việt Nam có dấu cách hoặc tiền tố `+84` sai cách, khiến user hợp lệ vẫn lưu thất bại.
- Lý do chọn `agentic`: chỉ chạm một boundary chính là validation + formatter trong cùng module profile; context nhỏ; verify có thể do cùng một agent thực hiện an toàn.

### Artifact Mẫu

- `fix-profile-phone-validation.s01.restate.md`
- `fix-profile-phone-validation.s02.business-goal.md`
- `fix-profile-phone-validation.s03.open-questions.md`
- `fix-profile-phone-validation.s04.acceptance-criteria.md`
- `fix-profile-phone-validation.s05.technical-approach.md`
- `fix-profile-phone-validation.s06.task-breakdown.md`
- `fix-profile-phone-validation.s07.implementation.md`
- `fix-profile-phone-validation.s08.verification.md`

### Chuỗi 8 Step

| Step | Skill chính | Execution | Output mẫu |
|---|---|---|---|
| 1. Restate + discovery framing | `requirement-analysis`, `product-thinking` | `agentic` | Chốt đây là `BUG`, phạm vi là validation profile form, risk là đổi behavior nhập liệu ngoài ý muốn |
| 2. Business goal | `product-thinking` | `agentic` | Mục tiêu là user nhập số hợp lệ theo chuẩn VN không bị chặn sai; không đổi luồng xác thực hay dữ liệu lịch sử |
| 3. Open questions | `requirement-analysis`, `input-readiness-assessor`, `step-goal-auditor` | `agentic` | Chốt cần hỗ trợ các format nào, backend hay frontend đang reject, có migration dữ liệu không |
| 4. Acceptance criteria + DoR | `requirement-analysis`, `definition-of-ready-gate` | `agentic` | Criteria ví dụ: `0901234567`, `090 123 4567`, `+84901234567` đều pass; input thiếu số vẫn fail; DoR=`READY` |
| 5. Technical approach | `brainstorming`, `system-design` | `agentic` | Chọn normalize input ở shared validation util, không rải rule riêng ở nhiều component |
| 6. Task breakdown | `task-breakdown-planner` | `agentic` | Task 1 sửa util normalize; Task 2 update test; Task 3 verify regression trên profile form |
| 7. Implement | `implementation` | `agentic` | Sửa util validator/formatter, cập nhật unit test và note implementation |
| 8. Verify + DoD | `testing`, `code-scan-review`, `step-goal-auditor`, `definition-of-done-gate` | `agentic` | Chạy unit test + lint + audit; xác nhận evidence đủ để đóng DoD |

### Delivery Narrative Mẫu

- Step 5 không cần `multi-agent` vì không có nhiều module hoặc ownership boundary.
- Step 7 chỉ có một builder logic là chính agent đang làm việc.
- Step 8 không cần tách tester riêng vì verify path ngắn, risk thấp và evidence đủ rõ.
- Nếu trong Step 3 phát hiện validator nằm ở nhiều service hoặc nhiều app shell khác nhau, ví dụ này sẽ không còn phù hợp với `agentic` và phải re-evaluate mode.

## Ví Dụ B: `FEATURE` Vừa/Lớn Chạy `multi-agent`

### Bối Cảnh

- `work_item_slug`: `add-google-oauth-login`
- `work_item_type`: `FEATURE`
- Mô tả ngắn: thêm đăng nhập Google cho customer portal nhưng vẫn giữ email/password hiện có.
- Complexity signals: `multi_boundary`, `large_context`, `separate_verification`, `tool_specialization`.
- Vì sao phù hợp `multi-agent`: chạm frontend login UI, backend auth flow, security rule, callback config và verify integration; đồng thời có tài liệu ngoài từ Google cần đọc có cấu trúc.

### Execution Policy Snapshot

```yaml
execution_mode: multi_agent
selection_reason:
  - "Feature chạm nhiều backend/frontend/security boundary"
  - "Có external docs cần research trước khi chốt design"
complexity_signals:
  - multi_boundary
  - large_context
  - separate_verification
  - tool_specialization
shared_contract_ref: "add-google-oauth-login.s05.technical-approach#step-contract"
parallel_budget: 3
coordinator_role: "coordinator"
verification_owner: "auditor"
fallback_mode: sequential_multi_role
external_research:
  notebooklm: OPTIONAL
  expected_outputs:
    - notebooklm-research-capture
notes: "Chỉ bật multi-agent từ step 5 trở đi; step 1-4 vẫn giữ agentic để khóa scope trước."
```

### Worker Assignment Snapshot Cho Step 5

```yaml
assignment_id: "s05-design-pack"
step_id: "s05"
shared_contract_ref: "add-google-oauth-login.s05.technical-approach#step-contract"
role: "coordinator"
owned_scope:
  - "merge option analysis"
  - "chốt recommendation"
owned_paths: []
skills:
  - codex-workflow-chain
  - system-design
inputs:
  - "acceptance criteria đã chốt"
  - "security constraints hiện có"
done_when:
  - "có technical approach được chọn"
  - "có backend/frontend boundary rõ"
depends_on: []
status: READY
handoff_format: worker-handoff-report
```

### Vai Trò Tham Gia Theo Step

| Step | Mode | Vai trò chính | Output mẫu |
|---|---|---|---|
| 1. Restate + discovery framing | `agentic` | `coordinator` | Chốt scope: thêm provider mới, không thay account migration |
| 2. Business goal | `agentic` | `coordinator` | Chốt mục tiêu: giảm friction login, không làm yếu security policy |
| 3. Open questions | `agentic` + có thể dùng `notebooklm` | `coordinator`, optional `notebooklm-researcher` | Gom câu hỏi về callback URL, session model, account linking, compliance |
| 4. Acceptance criteria + DoR | `agentic` | `coordinator` | Criteria: user mới đăng nhập Google tạo account đúng rule; user cũ có thể link hoặc reject đúng policy; DoR=`READY` |
| 5. Technical approach | `multi-agent` | `coordinator`, `notebooklm-researcher`, `backend-architect`, `frontend-architect` | Chốt OAuth callback flow, token exchange, UI state và risk map |
| 6. Task breakdown | `multi-agent` | `coordinator`, `planner`, `dependency-reviewer` | Tách task backend auth, frontend CTA/state, config/secret, verify plan |
| 7. Implement | `multi-agent` | `coordinator`, `backend-builder`, `frontend-builder`, `doc-owner` | Backend auth provider + callback + UI login button + docs/config changes |
| 8. Verify + DoD | `multi-agent` | `coordinator`, `tester`, `scan-reviewer`, `auditor` | Integration evidence, code scan, security notes, final audit và DoD |

### Handoff Report Mẫu Từ `notebooklm-researcher`

```yaml
assignment_id: "s05-notebooklm-google-oauth"
role: "notebooklm-researcher"
status: HANDOFF
summary: "Đã tổng hợp callback constraints, consent screen notes và provider flow từ corpus docs Google + internal auth notes."
outputs_produced:
  - notebooklm-research-capture
artifact_refs:
  - "add-google-oauth-login.s05.technical-approach.md"
code_refs: []
evidence:
  - "Notebook query: Required redirect URI rules"
  - "Notebook query: Account linking constraints"
external_tools_used:
  - tool: "notebooklm"
    purpose: "Tóm lược provider docs và internal auth notes"
    refs:
      - "google-oauth-notebook"
open_issues:
  - "Cần product quyết định auto-link hay explicit link với email trùng"
recommended_next_action: "Coordinator chuyển issue này vào option analysis và acceptance criteria refinement nếu còn blocker"
```

### Delivery Narrative Mẫu

- Step 1-4 vẫn giữ `agentic` để không tốn chi phí phối hợp quá sớm khi scope còn mơ hồ.
- `notebooklm` chỉ hỗ trợ ở step 3 và step 5 để đọc corpus lớn; mọi kết luận vẫn phải chốt vào note step.
- Step 5 là điểm đầu hợp lý để bật `multi-agent` vì bắt đầu xuất hiện nhiều boundary song song.
- Step 7 chia builder theo `owned_paths` hoặc module boundary; nếu hai builder phải cùng sửa một auth module lõi, coordinator phải giảm song song hoặc fallback `sequential multi-role`.
- Step 8 tách `tester`, `scan-reviewer`, `auditor` để tránh bias “người code tự xác nhận xong”.

## Ví Dụ C: `CHANGE` Database-Heavy Chạy `multi-agent`

### Bối Cảnh

- `work_item_slug`: `normalize-customer-phone-index`
- `work_item_type`: `CHANGE`
- Mô tả ngắn: thêm cột `normalized_phone` và rollout unique index cho bảng customer để hỗ trợ search/dedup theo số điện thoại chuẩn hóa, nhưng không làm hỏng luồng ghi hiện có.
- Complexity signals: `multi_boundary`, `parallelizable_work`, `separate_verification`, `tool_specialization`.
- Vì sao phù hợp `multi-agent`: change này chạm application write path, schema migration, backfill dữ liệu cũ, index rollout và review release safety; cần tách người implement với người review database.

### Artifact Mẫu

- `normalize-customer-phone-index.s01.restate.md`
- `normalize-customer-phone-index.s02.business-goal.md`
- `normalize-customer-phone-index.s03.open-questions.md`
- `normalize-customer-phone-index.s04.acceptance-criteria.md`
- `normalize-customer-phone-index.s05.technical-approach.md`
- `normalize-customer-phone-index.s06.task-breakdown.md`
- `normalize-customer-phone-index.s07.implementation.md`
- `normalize-customer-phone-index.s08.verification.md`

### Chuỗi 8 Step

| Step | Mode | Vai trò chính | Output mẫu |
|---|---|---|---|
| 1. Restate + discovery framing | `agentic` | `coordinator` | Chốt đây là `CHANGE`, không phải feature mới; phạm vi là chuẩn hóa phone và hỗ trợ lookup/dedup an toàn |
| 2. Business goal | `agentic` | `coordinator` | Chốt mục tiêu là tìm kiếm và chống trùng chính xác hơn, không làm gián đoạn create/update customer hiện có |
| 3. Open questions | `agentic` | `coordinator` | Xác định dữ liệu cũ bẩn ở mức nào, có bản ghi trùng sau normalize không, rollback window ra sao |
| 4. Acceptance criteria + DoR | `agentic` | `coordinator` | Criteria: write path mới luôn sinh `normalized_phone`; dữ liệu cũ được backfill; unique index chỉ bật khi dữ liệu sạch; DoR=`READY` |
| 5. Technical approach | `multi-agent` | `coordinator`, `backend-architect`, `data-architect` | Chọn rollout `expand-contract`: thêm cột nullable, dual-write, backfill, validate dữ liệu, rồi mới tạo unique index |
| 6. Task breakdown | `multi-agent` | `coordinator`, `planner`, `migration-owner`, `dependency-reviewer` | Tách task schema add, app dual-write, backfill job, dữ liệu trùng cần xử lý, verify plan, rollout guards |
| 7. Implement | `multi-agent` | `coordinator`, `app-builder`, `migration-owner`, `backfill-owner` | Tạo migration thêm cột, cập nhật service dual-write, viết backfill command/job, thêm logging/guard cho rollout |
| 8. Verify + DoD | `multi-agent` | `coordinator`, `tester`, `database-reviewer`, `auditor` | Chạy test app path, kiểm tra backfill dry-run, review migration safety, chốt release recommendation và DoD |

### Database Review Snapshot Cho Step 8

```yaml
review_scope:
  - "customers.normalized_phone"
  - "backfill command for legacy rows"
  - "unique index rollout"
migration_plan:
  steps:
    - "Add nullable column `normalized_phone`"
    - "Deploy application dual-write"
    - "Run backfill in batches with progress logging"
    - "Resolve duplicate normalized values"
    - "Create unique index after validation"
  deployment_order:
    - "schema-first"
    - "app-dual-write"
    - "backfill"
    - "index"
backfill_plan:
  required: true
  strategy: "batch backfill with checkpointing"
  safety_controls:
    - "limit rows per batch"
    - "progress metrics"
    - "pause/resume support"
rollback_plan:
  possible: true
  strategy: "keep nullable column, disable dual-write, postpone unique index if validation fails"
compatibility_risks:
  - "old app version may not populate normalized_phone if deployed out of order"
lock_risks:
  - "index creation can hold locks if table growth or duplicate cleanup is underestimated"
query_risks:
  - "new lookup path may bypass old phone formatting assumptions"
retention_risks: []
release_recommendation: GO_WITH_GUARDS
required_actions:
  - "ship schema before app dual-write"
  - "complete duplicate cleanup before unique index"
  - "monitor error rate during backfill"
evidence:
  - "dry-run duplicate report"
  - "batch backfill timing sample"
  - "staging verification logs"
```

### Delivery Narrative Mẫu

- Step 1-4 vẫn nên giữ `agentic` để khóa đúng bản chất đây là `CHANGE` có dữ liệu legacy, không phải chỉ thêm cột rồi xong.
- Step 5 bắt đầu cần `multi-agent` vì đã tách rõ boundary giữa app write path và data rollout path.
- `migration-owner` chỉ sở hữu migration/index/backfill mechanics; `app-builder` sở hữu dual-write và read-path tương thích.
- Step 7 không nên để hai worker cùng sửa một migration file hoặc cùng chỉnh một service write-path nếu chưa có ownership rõ; coordinator phải tách path hoặc chuyển về `sequential multi-role`.
- Step 8 bắt buộc có `database-reviewer`, vì đây là case mà release recommendation quan trọng gần ngang với test application.

## Kết Luận Rút Ra Từ 3 Ví Dụ

- `agentic` là lựa chọn mặc định cho work item nhỏ hoặc vừa, một boundary chính, verify ngắn.
- `multi-agent` nên bật muộn, thường từ step 5 trở đi, sau khi `DoR` đã khóa phạm vi đủ rõ.
- `notebooklm` có giá trị khi step có external corpus lớn, nhưng nó không thay cho decision artifact hay verify trên codebase.
- Với change database-heavy, `database-design` ở step 5 và `database-change-review` ở step 8 gần như là cặp skill mặc định.
- Rollout kiểu `expand-contract` là mẫu an toàn khi phải thêm cột, dual-write, backfill rồi mới khóa constraint hoặc unique index.
- Nếu chưa xác định rõ `coordinator`, `verification owner`, `owned_scope` và `merge strategy`, chưa nên bật `multi-agent`.
