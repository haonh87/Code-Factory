---
title: "Review và Plan v5 - SDD Light cho Code Factory"
date: 2026-07-16
revision: 5
status: approved
approval: approved-by-human
planning_track: full
planning_track_note: "Override từ quick sang full theo human decision 2026-07-16; scope 9 task + migration + rollout đa pha vượt eligibility quick."
sdd_mode: light
tags:
  - code-factory
  - workflow
  - sdd
  - change-request
  - plan
---

# Review và Plan v5 - SDD Light cho Code Factory

> [!warning] Trạng thái review
> **REQUEST CHANGES đối với v4**. Revision 5 là proposal đã xử lý feedback và đối chiếu lại contract hiện tại.
>
> [!note] Plan approval — 2026-07-16
> Human đã duyệt nguyên revision 5 theo Option B (lazy five-checkpoint) và mở s07 Implement. Override `planning_track` từ `quick` sang `full` vì scope thực tế (9 task, ~30 file, canonical rename + dual-read migration + rollout R0–R5) vượt eligibility quick. Reviewer: Hao, Nguyen Huu. S07 chạy trong worktree `sdd-light-t1`, bắt đầu từ T1.

## Kết Luận Review

Hướng của v4 là đúng ở mục tiêu giảm artifact và chuẩn hóa `CR = Change Request`, nhưng chưa phải phương án tối ưu để triển khai:

1. Dời toàn bộ evidence của `s07` sang `s08` làm review xảy ra quá muộn và mâu thuẫn authority hiện tại.
2. Dời Foundation gate sang `s06` khiến Light phải gánh một flow vốn nên tự nâng lên full.
3. Chưa có eligibility router nên work item rủi ro cao vẫn có thể bị ép chạy Light.
4. CR package hiện vẫn gồm bảy file; thêm package này vào Light sẽ tái tạo ceremony vừa loại bỏ.
5. Merge spec ngay khi CR ở trạng thái `VERIFIED` là quá sớm, đặc biệt khi một CR có nhiều work item.
6. Chưa có budget định lượng, rollout flag, telemetry hoặc rollback contract để chứng minh workflow thực sự nhẹ hơn và không làm yếu governance.

**Khuyến nghị revision 5:** giữ tám bước logic nhưng dùng mô hình **lazy five-checkpoint**:

- Khởi tạo: `Spec Card + s01 + s04 + s06`.
- Khi mở implementation: tạo `s07` evidence note tối giản.
- Khi bắt đầu verify: tạo `s08` và link tới `s07` đã tồn tại.
- Kết thúc: tối đa `1 Spec Card + 5 workflow notes`; nếu có compact CR thì thêm đúng một file.
- Work item không đạt eligibility phải tự nâng sang full/strict; explicit preset không được vượt hard guard.

Mô hình này giảm ceremony mà vẫn giữ review tại đúng thời điểm, giảm số thay đổi governance cần thiết và tạo rollback path rõ hơn so với v4.

## Baseline Và Mục Tiêu Định Lượng

Số liệu baseline được đo từ scaffold hiện tại với `planning_track=quick` và `sdd_mode=light`:

| Dimension | Baseline hiện tại | Mục tiêu v5 |
|---|---:|---:|
| Workflow notes | 8 | 3 khi authoring; 5 khi hoàn tất |
| Dòng scaffold workflow | 1.269 | Không quá 450 dòng trước implementation; 600 dòng khi hoàn tất, không tính CR |
| Product spec | BRD + SRS | 1 Spec Card |
| CR package | 7 file, 165 dòng | 1 file với `cr_profile=compact`; giữ 7 file với `full` |
| Artifact không CR | Tối thiểu 10 | 4 ban đầu; tối đa 6 khi hoàn tất |
| Artifact có compact CR | Tối thiểu 17 nếu cộng full package | Tối đa 7 khi hoàn tất |
| Human-authored required fields trước implementation | Chưa có budget | Không quá 20 field/prompt bắt buộc |
| Approval interactions không CR | Nhiều command rời | Không quá 3 lần: work item, ready bundle, done |
| Approval interactions có CR | Chưa có budget | Không quá 4 lần, gồm CR approval |

Budget là acceptance gate, không chỉ là số tham khảo. Optional section không có dữ liệu phải được omit thay vì sinh block rỗng.

## Review Findings

### F-01 - Light mode đã tồn tại

`sdd_mode=light` đã có trong `packages/workflow-bundle/scripts/workflow-sdd-definitions.js`. Scope đúng là hoàn thiện Light contract end-to-end, không thêm mode mới.

### F-02 - Scaffold mới là nguồn gây nặng chính

`scaffold-workflow.js` mặc định sinh đủ tám note. Baseline thử nghiệm tạo 1.269 dòng trước khi tính BRD/SRS. Chỉ rút ngắn BRD/SRS không giải quyết phần lớn authoring burden.

### F-03 - Materializer chưa truyền Light contract

`materialize-work-item.js` đang hard-code `sdd_mode: none`, luôn bắt đầu ở `s01` và scaffold toàn bộ workflow. Light phải được nối qua materializer, protocol, scaffold và validator trong cùng increment.

### F-04 - `s01` vẫn là protocol anchor

Protocol hiện phụ thuộc `s01`. Compact profile phải giữ `s01` và sinh upstream reference theo profile; không được tạo reference tới `s02`, `s03` hoặc `s05` khi các note này không tồn tại.

### F-05 - Light validator mới kiểm structure, chưa đủ semantic

Light chưa chứng minh đầy đủ requirement ID, AC mapping, freeze decision, CR approval, provenance và verification coverage. Đây là khoảng trống governance thực, không phải vấn đề template.

### F-06 - `CHANGE` đang mang hai nghĩa

`work_item_type=CHANGE` đang bị dùng lẫn với Change Request. Canonical vocabulary phải là `CR = Change Request`; một `FEATURE` hoặc `BUG` vẫn có thể liên kết `cr_id` mà không đổi primary work item type.

### F-07 - Bug thiếu nguồn phân loại

Thiếu `defect_source` làm router không phân biệt code sai frozen spec với spec sai/thiếu. Kết quả là không thể quyết định ổn định bug nào cần CR.

### F-08 - Provenance và CR reconciliation chưa khép kín

Hiện có link rời giữa product spec và change package nhưng chưa kiểm được chuỗi `baseline -> CR delta -> work item -> test -> accepted spec version`.

### F-09 - Governance đang gắn vào step vật lý

Validator hiện host Option Analysis, Foundation Decision và Brownfield Impact tại `s05`; Delivery Rule Evidence và spec compliance tại `s07`. Nếu note bị bỏ, một số check có thể bị skip im lặng.

Revision 5 xử lý theo hai rule khác nhau:

- Option Analysis và Brownfield Impact được host tại `s06` cho Light.
- Foundation-required work item không chạy Light; router tự nâng sang full.
- `s07` không bị xóa hoặc dời; note này được tạo muộn khi implementation path mở.

### F-10 - Authority layer và router đang hard-code full workflow

`policies/codex/AGENTS.global.md`, `workflow-chain.md`, router skill, protocol transition và trusted approval mapping đang gắn Approach với `s05` và yêu cầu `s04+s05+s06` trước ACTIVE.

Nguồn authority trong repo phải được sửa cùng tooling. Bản đã cài ngoài repo chỉ là cutover sync target, không phải source-of-truth cần sửa thủ công trong plan implementation.

### F-11 - V4 thiếu eligibility và escalation contract

Không phải quick work item nào cũng phù hợp Light. Thiếu hard guard sẽ biến Light thành đường bypass cho foundation, contract, migration, regulated evidence hoặc multi-system risk.

### F-12 - Dời `s07` sang `s08` làm yếu review timing

Evidence về TDD, delegation, worktree và review phải được ghi trong implementation, trước verify cuối. Gom vào `s08` chỉ chứng minh hậu kiểm và có thể tạo evidence sau sự kiện.

### F-13 - Full CR package làm Light nặng trở lại

CR package hiện có bảy Markdown file với tổng 165 dòng. Light cần `cr_profile=compact` một file; CR rủi ro cao giữ full package và tự nâng planning profile.

### F-14 - `VERIFIED` chưa đủ để merge current spec

`VERIFIED` chỉ chứng minh technical implementation. Current spec chỉ được cập nhật khi CR đã `ACCEPTED` bởi đúng authority và toàn bộ required work item đã đóng góp coverage evidence.

### F-15 - Thiếu budget cho ceremony và interaction

Chỉ đếm artifact không đo được metadata lặp, prompt bắt buộc và số lần approve. Plan phải coi artifact count, generated lines, required prompts và approval interactions là regression metrics.

### F-16 - Thiếu compatibility, rollback và observability contract

Canonical rename và profile routing cần schema version, dual-read/canonical-write, dry-run migration, preview flag, escalation reason và mismatch telemetry. Nếu không có các điểm này, rollout khó kiểm soát và rollback dễ làm artifact mất tương thích.

## Design Options

| Option | Mô tả | Ưu điểm | Hạn chế | Kết luận |
|---|---|---|---|---|
| A. Four-checkpoint relocation | `s01,s04,s06,s08`; dời `s07` evidence vào `s08` | Ít file nhất | Review muộn; validator/gate thay đổi rộng; evidence dễ thành hậu kiểm | Reject |
| B. Lazy five-checkpoint | Khởi tạo ba note; tạo `s07` khi ACTIVE và `s08` khi Verify | Giữ review timing; không dangling reference; giảm artifact ban đầu; rollback rõ | Cần lifecycle hook idempotent cho hai note tạo muộn | **Recommend** |
| C. Eight thin notes | Giữ đủ tám note nhưng giảm body | Compatibility tốt nhất | Vẫn nhiều file, context switching và approvals | Fallback, không đạt mục tiêu tối ưu |
| D. Một monolithic work-item file | Gom toàn bộ lifecycle vào một file | Ít artifact nhất | Diff conflict, ownership và gate hashing phức tạp; migration lớn | Reject |

## Recommended Design

### 1. Eligibility Router

Light chỉ được chọn khi **tất cả** điều kiện sau đúng:

| Điều kiện bắt buộc | Giá trị |
|---|---|
| Delivery context | `brownfield` |
| Planning | `planning_track=quick` |
| Governance | `governance_profile=default` |
| Execution | `execution_mode=agentic`, `interaction_mode=self` |
| Scope | Một primary outcome, boundary rõ, low/medium risk |
| Foundation | `not_required` |
| Contract/migration | Không public contract, schema migration, backfill hoặc cutover |
| Compliance | Không regulated evidence hoặc enterprise approval chain |
| Release | Không yêu cầu UAT/release gate phức tạp |

Hard escalation sang full/strict khi có một trong các trigger:

- greenfield hoặc foundation decision;
- public API/event/data contract;
- database migration, backfill, cutover hoặc rollback phức tạp;
- nhiều bounded context/hệ thống hoặc blast radius cao;
- regulated/security-sensitive evidence;
- required multi-agent delegation;
- `defect_source=UNKNOWN` hoặc spec impact chưa phân loại;
- compact CR vượt eligibility của requirement-only delta.

Explicit `--preset sdd-light` chỉ là preference. Router phải trả `eligible`, `selected_profile`, `escalation_reasons[]`; hard escalation không được override bằng flag thông thường.

### 2. Logical Steps Và Physical Notes

| Physical note | Logical responsibility | Thời điểm tạo |
|---|---|---|
| `s01` | Clarify + Business Goal + Open Questions + classification + protocol anchor | Materialize |
| `s04` | Acceptance + DoR + Spec Freeze/approved CR | Materialize |
| `s06` | Option Analysis + Brownfield Impact + Technical Approach + Task Plan | Materialize |
| `s07` | Implementation ledger + TDD/review/delegation/worktree evidence | Khi chuyển ACTIVE |
| `s08` | Verify + coverage + CR contribution + DoD | Khi bắt đầu Verify |

Tám logical step vẫn tồn tại trong trace model. `s02`, `s03` được host tại `s01`; `s05` được host tại `s06`. `s07` và `s08` giữ boundary riêng.

### 3. Gate Host Contract

| Gate/evidence | Light host | Rule |
|---|---|---|
| Work item approval | `s01` | Giữ protocol approval hiện tại |
| Spec + DoR | `s04` | Phải có trusted receipt trước implementation |
| Approach + Task Plan | `s06` | Phải có trusted receipt trước implementation |
| Foundation | Không hỗ trợ | Required thì auto-escalate full |
| Delivery Rule Evidence | `s07` | Không dời sang `s08` |
| DoD | `s08` | Chỉ pass khi coverage và CR contribution hợp lệ |

Thêm convenience command `approve-ready-bundle` để tạo các receipt độc lập cho Spec, DoR, Approach và Task Plan trong một interaction. Receipt vẫn hash đúng host artifact và vẫn có reviewer/timestamp riêng; bundle không làm yếu gate semantics.

### 4. Spec Card Contract

Light dùng một source-of-truth với các trường tối thiểu:

- `spec_card_id`, `spec_version`, `spec_status`;
- business goal, in-scope, out-of-scope;
- `REQ-###` với provenance `BASELINE|CR-###`;
- `AC-###` và mapping tới requirement;
- assumptions/open decisions có owner;
- freeze decision và authority.

Light dùng `spec_refs.card`; strict tiếp tục dùng `spec_refs.brd` và `spec_refs.srs`. Không duy trì trace matrix trùng lặp ở nhiều note.

### 5. Requirement, Bug Và CR Classification

| Tình huống | Classification | CR |
|---|---|---|
| Spec chưa frozen | Baseline authoring | Không |
| Frozen spec đúng, code sai | `BUG + IMPLEMENTATION + NONE` | Không |
| Frozen spec sai/thiếu | `BUG + SPEC + CLARIFY|MODIFY` | Bắt buộc |
| Stakeholder yêu cầu behavior mới | `FEATURE + ADD|MODIFY|REMOVE` | Bắt buộc |
| Refactor giữ behavior | `REFACTOR + NONE` | Không |
| Config/data defect không đổi spec | `BUG + CONFIG|DATA + NONE` | Không, trừ khi governance khác yêu cầu |
| Migration/cutover/policy/contract | `work_item_type=CR` | Full CR và auto-escalate full |

Canonical fields:

| Legacy read alias | Canonical write |
|---|---|
| `CHANGE-001` | `CR-001` |
| `work_item_type=CHANGE` | `work_item_type=CR` |
| `change_id` | `cr_id` |
| `change_status` | `cr_status` |
| `change_strategy` | `cr_strategy` |
| `linked_changes` | `linked_crs` |

Physical root giữ `changes/` trong increment đầu.

### 6. Compact CR Contract

`cr_profile=compact` chỉ dùng cho requirement delta low/medium risk và tạo một file:

```text
changes/CR-###/request.md
```

File chứa metadata, base spec version, structured delta, approval, linked work items, aggregate coverage và accepted spec version. `cr_profile=full` giữ package bảy file cho migration, cutover, policy, contract và change rủi ro cao.

Normal lifecycle:

```text
DRAFT -> APPROVED -> IMPLEMENTING -> VERIFIED -> ACCEPTED -> ARCHIVED
```

Exception terminal states: `REJECTED`, `CANCELLED`, `SUPERSEDED`.

- `APPROVED`: cho phép implementation bắt đầu.
- `VERIFIED`: technical implementation và test đã đủ ở các linked work item.
- `ACCEPTED`: đúng authority chấp nhận aggregate result; lúc này mới atomic merge delta và tăng current spec version.
- `ARCHIVED`: record đã effective và không còn action mở.

### 7. Multi-Work-Item Reconciliation

Mỗi `s08` chỉ phát một `cr_coverage_contribution` cho scope work item của nó. CR aggregator kiểm:

- tất cả required linked work item đã `DONE`;
- approved requirement delta đều có task, test và evidence;
- không có `FAIL|PARTIAL|UNTESTED` chưa được waive;
- resulting behavior khớp approved delta;
- accepted spec update là atomic và ghi provenance/backlink.

Một work item không được tự chuyển toàn bộ CR sang `ACCEPTED` nếu CR còn required work item khác.

### 8. Compatibility, Rollback Và Observability

Compatibility contract:

- thêm `workflow_schema_version` và `cr_schema_version`;
- dual-read `CHANGE/change_*`, canonical-write `CR/cr_*`;
- migration command idempotent, mặc định `--dry-run`;
- warning có deadline trước khi legacy reader bị remove;
- strict/full artifact và gate mapping giữ nguyên.

Rollout flags:

- `sdd_light_profile=off|preview|default`;
- `cr_vocabulary=legacy|dual|canonical`;
- rollback về `off` chỉ đổi router default, không rewrite artifact đã tạo.

Telemetry tối thiểu:

- selected profile và `escalation_reasons[]`;
- artifact count, generated line count, required prompt count;
- approval interaction count;
- validation error/warning theo profile;
- CR reconciliation mismatch;
- authoring lead time tới READY và DONE.

## Technical Approach Review

```yaml
design_problem: >
  Giảm ceremony và duplication của Code Factory nhưng vẫn giữ freeze, trusted
  approval, review timing, traceability, verification và backward compatibility.

business_rule_trace:
  - "BR-01: Light chỉ tối ưu representation; không bỏ logical lifecycle hoặc control invariant."
  - "BR-02: Work item ngoài eligibility phải auto-escalate, không cho explicit preset bypass hard guard."
  - "BR-03: Review evidence phải được ghi tại s07 trước verify cuối."
  - "BR-04: Frozen spec có semantic delta phải đi qua approved CR."
  - "BR-05: Current spec chỉ đổi sau CR ACCEPTED, không phải chỉ VERIFIED."
  - "BR-06: Strict/full và legacy artifacts phải tiếp tục validate trong migration window."

design_options:
  - id: A
    name: four_checkpoint_relocation
    decision: rejected
  - id: B
    name: lazy_five_checkpoint
    decision: recommended
  - id: C
    name: eight_thin_notes
    decision: fallback
  - id: D
    name: monolithic_work_item
    decision: rejected

rejected_options:
  - "A: Dời s07 sang s08 làm review muộn và tăng governance blast radius."
  - "D: Monolith làm gate hashing, ownership và concurrent edit phức tạp."

recommended_design: >
  Eligibility router + Spec Card + ba note khởi tạo + lazy s07/s08 + profile-aware
  gate mapping + compact CR tùy điều kiện + dual-read/canonical-write rollout.

recommendation_reason: >
  Đây là phương án giảm nhiều artifact ban đầu nhất mà vẫn giữ s07 đúng thời điểm,
  cô lập work item phức tạp sang full và cho phép rollback bằng router flag.

component_changes:
  - "SDD/planning/change definitions: profile, schema, eligibility và CR contract."
  - "Scaffold/materializer: compact notes, Spec Card, conditional compact CR, lazy s07/s08."
  - "Governance/protocol/trusted approval: profile-aware host map và ready bundle."
  - "Validators: semantic Light, provenance, aggregate CR reconciliation và budget regression."
  - "Authority/docs/router: policy source, workflow-chain và installed-copy sync procedure."

data_flow:
  - "Request -> classification -> eligibility result -> Light hoặc full escalation."
  - "Light -> Spec Card + s01/s04/s06 -> ready bundle -> ACTIVE -> lazy s07."
  - "Verify start -> lazy s08 linked tới s07 -> contribution -> optional CR aggregate -> accepted spec version."

interface_changes:
  - "Preset sdd-light là preference, không phải persisted mode mới."
  - "Light dùng spec_refs.card; strict giữ spec_refs.brd/spec_refs.srs."
  - "Gate-to-step mapping trở thành profile-aware."
  - "CR writer dùng CR/cr_*; reader hỗ trợ legacy aliases."

failure_modes:
  - "Hard trigger không được nhận diện và work item rủi ro cao chạy Light."
  - "s07 không được tạo khi ACTIVE hoặc evidence được ghi sau verify."
  - "Ready bundle tạo receipt thiếu hoặc hash sai host artifact."
  - "Một linked work item tự ACCEPT toàn bộ CR."
  - "Authority source và installed copy lệch version."

compatibility_impact:
  - "Strict/full path phải giữ behavior-compatible gate logic nếu không liên quan profile."
  - "Legacy CHANGE/change_* được dual-read trong migration window."
  - "Fixtures CHANGE-001 và CHANGE-WFC-001 là compatibility gates."

rollback_impact:
  - "Set sdd_light_profile=off để router quay về full; không xóa artifact."
  - "Giữ dual reader qua ít nhất một release sau canonical default."
  - "Migration command phải idempotent và dry-run mặc định."

observability_hooks:
  - "profile selection/escalation reason"
  - "artifact, line, required-prompt và approval-interaction budgets"
  - "validator outcome theo profile"
  - "CR aggregate mismatch và authoring lead time"

constraints_applied:
  - "Không thêm SDD mode mới."
  - "Không thay physical root changes/ trong increment đầu."
  - "Không hỗ trợ Foundation-required flow trong Light."
  - "Không sinh empty optional hoặc CR section."

validation_plan:
  - "Golden fixtures cho route Light, từng hard escalation và ambiguous classification."
  - "Negative fixtures cho freeze, receipt host, lazy s07, provenance và CR aggregate."
  - "Regression suite cho strict/full và legacy CHANGE artifacts."
  - "Budget test trên generated output và approval interactions."
  - "Canary metrics trước khi chuyển preview thành default."

specialized_followups:
  - "definition-of-ready-gate cho Spec Card và ready bundle contract"
  - "testing cho risk-ranked compatibility và negative cases"
  - "workflow-pack-audit sau khi sửa authority, router và references"

notes_for_next_step: >
  Task Plan chỉ mở implementation sau khi human approve eligibility, lazy s07,
  Spec Card, compact CR lifecycle, budget và cutover policy.
```

## Task Plan v5

```yaml
implementation_goal: >
  Vận hành hóa SDD Light thành profile có eligibility rõ, giảm ít nhất 60% artifact
  authoring ban đầu, giữ s07 review evidence đúng thời điểm, và chuẩn hóa CR theo
  compact/full profile mà không làm regression strict/full hoặc legacy data.

ba_lane:
  owns:
    - "Eligibility business rule, requirement semantics và Spec Card acceptance."
    - "CR approval/acceptance authority và spec merge decision."
    - "Waiver rule cho PARTIAL/UNTESTED coverage."
  review_points:
    - "Sau T1: profile contract và hard escalation."
    - "Sau T2: Spec Card, freeze và provenance."
    - "Sau T7: aggregate CR acceptance và resulting spec version."

dev_lane:
  owns:
    - "Scaffold, lifecycle hooks, gate receipts, protocol và validators."
    - "Backward compatibility, migration, telemetry và rollback."
    - "Evidence chứng minh budget và no-regression."
  review_points:
    - "Sau T4: compact workflow chạy qua READY -> ACTIVE -> Verify."
    - "Sau T6: dual-read/canonical-write và migration dry-run."
    - "Sau T9: canary report và default-enable recommendation."

scope_guards:
  - "Không thêm SDD mode mới hoặc đổi tám logical steps."
  - "Không đưa Foundation, public contract, migration/cutover hoặc regulated flow vào Light."
  - "Không đổi physical root changes/ trong increment đầu."
  - "Không xóa legacy reader cùng release với canonical cutover."
  - "Không tự động ACCEPT CR từ một work item hoặc chỉ từ technical VERIFIED."
  - "Không redesign strict/full template ngoài phần cần cho compatibility."

acceptance_criteria:
  - "AC-01: Router trả eligibility và auto-escalate mọi hard trigger với reason testable."
  - "AC-02: Light không CR tạo 4 artifact ban đầu và tối đa 6 artifact khi hoàn tất."
  - "AC-03: Generated artifact không quá 450 dòng và 20 required prompts trước implementation; không quá 600 dòng khi hoàn tất, chưa tính CR."
  - "AC-04: Spec Card có REQ/AC, provenance, freeze và authority đủ semantic validation."
  - "AC-05: s07 được tạo khi ACTIVE, s08 được tạo khi Verify; thiếu s07/evidence thì không được tạo hoặc finalize s08."
  - "AC-06: Spec/DoR host s04; Approach/Task Plan host s06; Foundation required auto-escalate full."
  - "AC-07: Ready bundle tạo receipt độc lập, đúng hash, reviewer và timestamp cho từng gate."
  - "AC-08: Classification route đúng BUG implementation, BUG spec và FEATURE spec delta."
  - "AC-09: Compact CR tạo một request.md; full CR giữ package hiện tại."
  - "AC-10: CR chỉ ACCEPTED khi aggregate coverage của tất cả required linked work item pass."
  - "AC-11: Current spec chỉ merge/bump version atomic tại ACCEPTED."
  - "AC-12: New writer chỉ emit CR/cr_*; legacy CHANGE/change_* vẫn dual-read và warning."
  - "AC-13: Strict/full fixtures giữ behavior hiện tại; no silent skipped invariant."
  - "AC-14: Authority source, router, workflow-chain và installed-copy version được kiểm đồng bộ."
  - "AC-15: Preview/canary metrics chứng minh đạt artifact, prompt, interaction và lead-time budget."

task_breakdown:
  - id: T1
    name: "Khóa profile contract, budget và golden fixtures"
    owner_role: developer
    dependencies: []
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-sdd-definitions.js"
      - "packages/workflow-bundle/scripts/workflow-planning-definitions.js"
      - "packages/workflow-bundle/scripts/workflow-change-definitions.js"
      - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
    outputs_expected:
      - "Eligibility/escalation matrix và schema versions"
      - "Artifact/prompt/interaction budget assertions"
      - "Golden baseline cho strict/full và current Light"
    review_checkpoint: "BA/DEV chốt profile boundary, budget và hard escalation trước T2/T6."
    verification_hint: "Mỗi hard trigger có positive và negative route fixture."

  - id: T2
    name: "Spec Card và Light semantic validation"
    owner_role: developer
    dependencies: [T1]
    paths_in_scope:
      - "product-specs/templates"
      - "packages/workflow-bundle/scripts/validate-workflow-sdd.js"
    outputs_expected:
      - "Spec Card template và spec_refs.card"
      - "REQ/AC/provenance/freeze validation"
      - "No-duplicate-trace rule"
    review_checkpoint: "BA chốt requirement identity, freeze authority và CR provenance."
    verification_hint: "Thiếu origin, AC mapping, freeze authority hoặc required CR phải fail."

  - id: T3
    name: "Compact scaffold và lazy note builders"
    owner_role: developer
    dependencies: [T1, T2]
    paths_in_scope:
      - "packages/workflow-bundle/scripts/scaffold-workflow.js"
      - "packages/workflow-bundle/scripts/workflow-step-definitions.js"
    outputs_expected:
      - "Initial s01/s04/s06 scaffold"
      - "Profile-aware upstream references"
      - "Idempotent builders cho s07 và s08"
    review_checkpoint: "DEV đối chiếu generated artifact với line/prompt budget."
    verification_hint: "Không dangling refs, empty optional block hoặc duplicate lazy note."

  - id: T4
    name: "Profile-aware governance, gate và protocol"
    owner_role: developer
    dependencies: [T1, T3]
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-governance.js"
      - "packages/workflow-bundle/scripts/workflow-gate-review.js"
      - "packages/workflow-bundle/scripts/workflow-gate-evidence-utils.js"
      - "packages/workflow-bundle/scripts/workflow-trusted-approval-utils.js"
      - "packages/workflow-bundle/scripts/work-item-protocol.js"
      - "packages/workflow-bundle/scripts/work-item-protocol-utils.js"
      - "packages/workflow-bundle/scripts/validate-work-item-protocol.js"
    outputs_expected:
      - "Gate host map theo profile"
      - "s05 invariants enforce tại s06 cho Light"
      - "s07 evidence giữ nguyên boundary"
      - "ACTIVE/Verify transition hooks tạo s07/s08 đúng thời điểm"
      - "Ready bundle với independent trusted receipts"
    review_checkpoint: "DEV/maintainer review transition, artifact hash và negative gate cases."
    verification_hint: "ACTIVE fail nếu thiếu s04/s06 receipts; s08 fail nếu thiếu s07 evidence."

  - id: T5
    name: "Materializer classification và eligibility routing"
    owner_role: developer
    dependencies: [T1, T3, T4]
    paths_in_scope:
      - "packages/workflow-bundle/scripts/materialize-work-item.js"
      - "packages/workflow-bundle/scripts/change-item-utils.js"
    outputs_expected:
      - "Preset passthrough và selected-profile result"
      - "spec_impact/defect_source explicit override"
      - "Hard escalation reasons"
    review_checkpoint: "BA/DEV review ambiguous cases và lý do auto-escalation."
    verification_hint: "Ambiguous input dừng PROPOSED hoặc escalates; không silently guess."

  - id: T6
    name: "Compact CR và canonical vocabulary"
    owner_role: developer
    dependencies: [T1]
    paths_in_scope:
      - "packages/workflow-bundle/scripts/workflow-change-definitions.js"
      - "packages/workflow-bundle/scripts/scaffold-change-package.js"
      - "packages/workflow-bundle/scripts/validate-workflow-change.js"
      - "packages/workflow-bundle/scripts/change-item-utils.js"
      - "packages/workflow-bundle/scripts/change-item.js"
    outputs_expected:
      - "cr_profile compact/full"
      - "One-file CR request contract"
      - "Dual-read/canonical-write aliases"
      - "Dry-run idempotent migration"
    review_checkpoint: "BA/maintainer chốt CR authority, state transition và compatibility window."
    verification_hint: "Compact eligibility violation escalates full; legacy fixtures vẫn pass."

  - id: T7
    name: "CR aggregate reconciliation và accepted spec update"
    owner_role: developer
    dependencies: [T2, T5, T6]
    paths_in_scope:
      - "packages/workflow-bundle/scripts/validate-workflow-change.js"
      - "packages/workflow-bundle/scripts/validate-workflow-sdd.js"
      - "product-specs"
      - "work-items"
      - "changes"
    outputs_expected:
      - "Per-work-item coverage contribution"
      - "Multi-work-item aggregate validator"
      - "Atomic ACCEPTED spec bump và provenance backlink"
    review_checkpoint: "BA chốt aggregate acceptance, waiver và atomic spec update behavior."
    verification_hint: "Deliberate missing contribution hoặc partial coverage chặn ACCEPTED."

  - id: T8
    name: "Authority, router và documentation cutover"
    owner_role: maintainer
    dependencies: [T4, T5, T6, T7]
    paths_in_scope:
      - "policies/codex/AGENTS.global.md"
      - "skills/orchestration/codex-workflow-chain/references/workflow-chain.md"
      - "skills/orchestration/codex-workflow-chain/references/spec-driven-development.md"
      - "skills/orchestration/codex-workflow-chain/references/work-item-materialization.md"
      - "skills/orchestration/workflow-governance-router/SKILL.md"
    outputs_expected:
      - "Authority rules theo eligibility và profile host map"
      - "Canonical CR vocabulary"
      - "Versioned installed-copy sync checklist"
    review_checkpoint: "Maintainer xác nhận repo authority source và installed copy cùng contract version."
    verification_hint: "Repo source và installed copy report cùng contract version trước canary."

  - id: T9
    name: "Regression, telemetry và staged rollout"
    owner_role: maintainer
    dependencies: [T3, T4, T5, T6, T7, T8]
    paths_in_scope:
      - "packages/workflow-bundle/scripts/run-workflow-authoring-smoke.js"
      - "changes/CHANGE-001"
      - "changes/CHANGE-WFC-001"
      - "work-items/sample-sdd-item"
    outputs_expected:
      - "Strict/full/legacy compatibility suite"
      - "Preview/canary telemetry report"
      - "Rollback rehearsal và default-enable decision"
    review_checkpoint: "Human review canary evidence; default-enable là quyết định riêng, không tự động."
    verification_hint: "Chỉ chuyển default khi budget đạt và strict/full không regression."

dependency_graph: "T1 -> {T2,T6}; T2 -> T3; T3 -> T4 -> T5; {T2,T5,T6} -> T7; {T4,T5,T6,T7} -> T8 -> T9"

release_phases:
  - "R0 Contract: fixtures, budget và eligibility; chưa đổi default."
  - "R1 Preview: SDD Light core với lazy s07, sdd_light_profile=preview."
  - "R2 CR: compact CR + canonical-write, cr_vocabulary=dual."
  - "R3 Canary: authority sync, selected projects, telemetry và rollback rehearsal."
  - "R4 Default: chỉ sau khi exit criteria pass; legacy reader vẫn giữ."
  - "R5 Deprecation: remove legacy writer trước, reader ở release riêng có migration report."

verification_commands:
  - "npm run validate:workflow:governance -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:sdd -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:change -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:planning -- --workflow-root work-items"
  - "npm run validate:workflow:protocol -- --workflow-root work-items --project-root ."
  - "npm run validate:workflow:authoring-smoke"
  - "npm run validate:workflow -- --workflow-root work-items --project-root ."

exit_criteria:
  - "100% eligibility/escalation golden fixtures pass."
  - "Strict/full và legacy fixtures pass không đổi expected behavior."
  - "Initial artifact reduction >= 60% và đạt line/prompt/interaction budget."
  - "Không có silent skipped invariant trong compact profile."
  - "CR multi-work-item mismatch bị phát hiện trước ACCEPTED."
  - "Preview/canary không có release blocker và rollback rehearsal pass."
```

## Quyết Định Cần Human Review

- [x] Chấp nhận **lazy five-checkpoint** thay cho four-checkpoint relocation của v4.
- [x] Chấp nhận eligibility matrix và hard escalation không thể override bằng preset thường.
- [x] Cho phép Light dùng một Spec Card thay BRD/SRS riêng.
- [x] Giữ `s07` riêng, tạo `s07` khi ACTIVE và `s08` khi bắt đầu Verify.
- [x] Không hỗ trợ Foundation-required, public contract, migration/cutover hoặc regulated flow trong Light.
- [x] Chấp nhận host Option Analysis + Brownfield Impact + Approach + Task Plan tại `s06`.
- [x] Chấp nhận ready bundle là một interaction nhưng vẫn sinh trusted receipt độc lập.
- [x] `CR` là `Change Request`; canonical ID/field là `CR-###` và `cr_*`.
- [x] Chấp nhận `cr_profile=compact|full` và compact CR chỉ có `request.md`.
- [x] Chấp nhận CR lifecycle và rule chỉ merge current spec tại `ACCEPTED`.
- [x] Chấp nhận per-work-item contribution + CR aggregate cho quan hệ một-nhiều.
- [x] Giữ physical root `changes/` và dual-read legacy trong migration window.
- [x] Chấp nhận artifact, line, prompt và approval-interaction budget làm release gate.
- [x] Chấp nhận rollout preview -> canary -> default và rollback bằng profile flag.
- [x] Cập nhật repo authority source, router và references đồng bộ trước canary.

## Definition of Plan Approval

Plan được coi là approved khi:

- tất cả quyết định bắt buộc phía trên được chốt hoặc có documented exception;
- eligibility, gate host map, Spec Card và compact CR contract không còn conflict;
- BA xác nhận CR `ACCEPTED` và spec merge authority;
- DEV xác nhận lazy `s07`, trusted receipt và rollback khả thi;
- maintainer xác nhận authority source/cutover ownership;
- T1-T9 có owner, dependency, output và verification path rõ;
- budget và exit criteria được chấp nhận làm điều kiện chuyển default.

> [!note] Khuyến nghị phê duyệt
> Approve revision 5 theo Option B. Không tiếp tục implementation theo relocation `s07 -> s08` của revision 4.
