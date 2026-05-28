---
artifact_id: "mcp-gitlab.s05.technical-approach"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s05"
step_slug: "technical-approach"
workflow_stage: delivery
work_item_type: FEATURE
delivery_context: brownfield
artifact_role: primary
artifact_kind: primary-note
source_of_truth: true
status: draft
governance_ref: "project-context/project-context.md"
governance_profile: strict
governance_status: ALIGNED
checklist_refs:
  - "project-context/checklists/strict.md"
change_id: ""
change_status: draft
spec_delta_refs: []
archive_status: not_ready
sdd_mode: none
spec_refs:
  brd: ""
  srs: ""
spec_status: reviewed
planning_track: full
execution_mode: agentic
execution_roles: []
review_mode: self
verification_owner: ""
approval_gates:
  spec: "required"
  contract: "not_applicable"
  foundation: "not_applicable"
  uat: "not_applicable"
  release: "not_applicable"
  business_acceptance: "not_applicable"
role_signoffs:
  spec:
    - "po"
  contract: []
  dor:
    - "po"
  approach:
    - "developer"
  foundation: []
  task_plan: []
  uat: []
  release: []
  business_acceptance: []
  dod: []
gate_reviews:
  spec_reviewed_by:
    - "po"
  spec_reviewed_at: "2026-04-23"
  contract_reviewed_by: []
  contract_reviewed_at: ""
  dor_reviewed_by:
    - "po"
  dor_reviewed_at: "2026-04-23"
  approach_reviewed_by:
    - "developer"
  approach_reviewed_at: "2026-04-23"
  foundation_reviewed_by: []
  foundation_reviewed_at: ""
  task_plan_reviewed_by: []
  task_plan_reviewed_at: ""
  uat_reviewed_by: []
  uat_reviewed_at: ""
  release_reviewed_by: []
  release_reviewed_at: ""
  business_acceptance_reviewed_by: []
  business_acceptance_reviewed_at: ""
  dod_reviewed_by: []
  dod_reviewed_at: ""
content_skills:
  - "codex-workflow-chain"
  - "system-design"
  - "brainstorming"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-gitlab.s04.acceptance-criteria.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s05"
---

# Step 5 - Technical Approach

> [!summary]
> Tóm tắt option được khuyến nghị, trade-off và boundary kỹ thuật cần giữ.

## Step Contract
```yaml
step_goal: "Chọn technical approach nhỏ nhất nhưng đủ đúng cho lane GitLab, dùng zereight/gitlab-mcp làm chuẩn mà vẫn khớp nhu cầu inspect/pull/push trên repository đã tồn tại."
input_summary:
  - "Acceptance criteria đã được requester approve ở step 4 ngày 2026-04-23"
  - "Lane GitLab phải explicit provider target, host và runtime chuẩn"
  - "Scope phase 1 chỉ gồm inspect repository, pull current branch và push current branch"
  - "Auth ưu tiên SSH và pull mặc định ff-only"
output_summary:
  - "So sánh option direct-use, thin-wrapper và build-from-scratch"
  - "Approach được khuyến nghị cho phase 1"
  - "Boundary kỹ thuật để giữ lane GitHub không bị ảnh hưởng"
done_when:
  - "Có option được chọn kèm trade-off rõ ràng"
  - "Boundary và compatibility risk đủ cụ thể để sang task plan"
  - "Không còn ambiguity trọng yếu về hướng kỹ thuật phase 1"
owner: "developer"
```

## Option Analysis
```yaml
options:
  - id: OPT1
    name: "Dùng zereight/gitlab-mcp trực tiếp"
    summary: "Adopt runtime chuẩn as-is và map nhu cầu phase 1 vào tool surface sẵn có của repo tham chiếu."
    pros:
      - "Bám sát tối đa quyết định dùng standard runtime/reference"
      - "Tận dụng cấu hình self-hosted GitLab đã được thiết kế sẵn"
      - "Giảm chi phí tạo thêm lớp adapter trong repo này"
    cons:
      - "Repo tham chiếu thiên về GitLab platform/API workflow hơn local git inspect/pull/push"
      - "Khó giữ tool surface phase 1 tối giản nếu dùng nguyên trạng"
      - "Risk cao về mismatch giữa acceptance criteria và hành vi thực tế"
    fit_verdict: "PARTIAL"
  - id: OPT2
    name: "Dùng zereight/gitlab-mcp làm chuẩn, thêm thin wrapper cho local git workflow"
    summary: "Giữ standard runtime/reference cho lane GitLab nhưng thêm lớp adapter mỏng để expose đúng inspect/pull/push cho repository đã tồn tại."
    pros:
      - "Tôn trọng quyết định dùng standard runtime/reference"
      - "Khớp trực tiếp acceptance criteria phase 1 cho repo-local workflow"
      - "Cho phép giữ provider distinction explicit và cô lập lane GitHub"
      - "Dễ rollback bằng cách gỡ lane GitLab mà không chạm GitHub lane"
    cons:
      - "Phát sinh thêm một lớp tích hợp cần bảo trì"
      - "Cần discipline để wrapper không phình thành runtime mới"
    fit_verdict: "BEST_FIT"
  - id: OPT3
    name: "Xây MCP GitLab mới từ đầu"
    summary: "Thiết kế runtime GitLab riêng cho repo này chỉ để phục vụ inspect/pull/push."
    pros:
      - "Tool surface có thể tối ưu tuyệt đối cho nhu cầu phase 1"
      - "Toàn quyền kiểm soát behavior local git workflow"
    cons:
      - "Đi ngược quyết định lấy zereight/gitlab-mcp làm chuẩn"
      - "Tăng maintenance cost và duplicate capability"
      - "Không cần thiết khi phase 1 còn nhỏ"
    fit_verdict: "REJECT"
recommended_option: "OPT2"
trade_offs:
  - "Chấp nhận một lớp wrapper mỏng để đổi lấy fit tốt hơn cho local git workflow"
  - "Không dùng trực tiếp tool surface rộng của runtime chuẩn trong phase 1 để tránh scope drift"
  - "Giữ chuẩn GitLab ở mức runtime/reference và config, không biến wrapper thành implementation thay thế hoàn toàn"
```

## Foundation Decision
```yaml
status: NOT_APPLICABLE
solution_class: "brownfield MCP lane extension"
selected_stack:
  - "Node.js MCP tooling đang có trong repo"
  - "Git CLI local cho inspect/pull/push"
selected_runtime:
  - "zereight/gitlab-mcp làm standard runtime/reference cho GitLab lane"
decision_notes:
  - "Đây là quyết định approach ở mức work item, không phải foundation gate mới cho toàn repo"
  - "Lane GitHub hiện có giữ nguyên; lane GitLab được bổ sung độc lập"
  - "GitLab self-hosted host được cố định theo artifact thay vì suy diễn từ context"
```

## Artifact Chính
```yaml
recommended_approach: "Dùng zereight/gitlab-mcp làm standard runtime/reference cho lane GitLab, đồng thời tạo thin wrapper/integration layer trong repo này để expose đúng inspect_repository, pull_current_branch và push_current_branch cho repository GitLab đã tồn tại."
why: "Đây là phương án nhỏ nhất vẫn giữ được cả hai mục tiêu: tuân thủ chuẩn GitLab mà user chọn và đáp ứng chính xác local git workflow phase 1."
boundaries:
  - "Workflow artifact phải luôn ghi rõ git_provider_target=gitlab, gitlab_host=gitlab.ggg.com.vn và runtime chuẩn tương ứng"
  - "Wrapper chỉ được bao phủ inspect/pull/push và guardrail liên quan; không mở rộng sang create repo, MR hay CI/CD"
  - "Pull mặc định là ff-only; nếu không ff-only được thì fail rõ"
  - "Auth phase 1 ưu tiên SSH; không mở HTTPS + PAT nếu chưa có lý do delivery"
  - "Không sửa contract hoặc behavior của github-push lane hiện có"
risk_notes:
  - "Nếu wrapper dày lên, repo sẽ vô tình duy trì thêm một GitLab runtime thứ hai"
  - "Nếu dùng runtime chuẩn trực tiếp mà không adapter, acceptance criteria phase 1 có thể không map sạch sang tool behavior"
  - "Provider routing phải explicit; nếu không GitHub/GitLab lane dễ bị dùng sai runtime"
```

## Architecture Details
```yaml
domain_boundaries:
  - "Workflow governance lane: quyết định provider target và runtime lane ngay từ artifact"
  - "GitHub lane: tiếp tục dùng github-push MCP hiện có, không thay đổi"
  - "GitLab lane: chuẩn GitLab dựa trên zereight/gitlab-mcp và thin wrapper phase 1"
integration_points:
  - "Codex MCP config cho runtime GitLab"
  - "Adapter/wrapper local trong repo để map inspect/pull/push vào local git workflow"
  - "Git remote SSH tới GitLab self-hosted gitlab.ggg.com.vn"
data_or_runtime_notes:
  - "Base host cho lane GitLab là gitlab.ggg.com.vn; API/runtime config phải explicit"
  - "Branch operation chỉ áp dụng cho repository đã tồn tại và branch hiện tại"
  - "Pull behavior mặc định fast-forward only để tránh merge/rebase ngầm"
  - "Dirty working tree, missing upstream và auth failure phải được fail-fast với message rõ"
```

## Brownfield Impact Analysis
```yaml
impacted_modules:
  - "work-items/mcp-gitlab/*"
  - "MCP integration/config cho lane GitLab"
  - "nếu cần, adapter module mới cho GitLab local workflow"
compatibility_risks:
  - "Provider distinction không đủ explicit sẽ làm agent chọn sai lane GitHub/GitLab"
  - "Wrapper implement quá rộng sẽ drift khỏi standard runtime/reference"
  - "SSH/pull ff-only handling không rõ sẽ làm behavior khác acceptance criteria"
migration_notes:
  - "Không có data migration hay repository migration trong phase 1"
  - "Adoption path chỉ thêm lane GitLab song song lane GitHub hiện có"
rollback_notes:
  - "Có thể rollback bằng cách gỡ config và wrapper lane GitLab"
  - "Rollback không được yêu cầu thay đổi hay revert github-push MCP"
```

## Traceability
```yaml
upstream:
  - "mcp-gitlab.s04.acceptance-criteria.md"
  - "https://github.com/zereight/gitlab-mcp"
  - "mcp/github-push/README.md"
next_step: "mcp-gitlab.s06.task-breakdown.md"
```

## Handoff
- Recommended option: OPT2, dùng zereight/gitlab-mcp làm chuẩn và thêm thin wrapper cho inspect/pull/push.
- Trade-off chấp nhận: thêm một lớp tích hợp mỏng để đổi lấy fit đúng cho phase 1 và giữ lane GitHub không bị ảnh hưởng.
- Điều kiện sang step 6: task plan phải chỉ ra owned paths, config touch points, verify path cho SSH/ff-only/error cases và guard không drift sang GitHub lane.
- Deployment note khi có: phase 1 chủ yếu là config/integration và local workflow wiring; không có migration dữ liệu.
