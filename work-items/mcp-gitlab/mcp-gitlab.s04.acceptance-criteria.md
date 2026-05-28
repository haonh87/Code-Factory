---
artifact_id: "mcp-gitlab.s04.acceptance-criteria"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s04"
step_slug: "acceptance-criteria"
workflow_stage: discovery
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
  approach: []
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
  approach_reviewed_by: []
  approach_reviewed_at: ""
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
  - "requirement-analysis"
  - "step-goal-contract"
  - "definition-of-ready-gate"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-gitlab.s01.restate.md"
  - "mcp-gitlab.s02.business-goal.md"
  - "mcp-gitlab.s03.open-questions.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s04"
---

# Step 4 - Acceptance + DoR

> [!summary]
> Tóm tắt acceptance criteria, edge case, DoR và governance checks cho readiness.

## Step Contract
```yaml
step_goal: "Chuyển discovery đã được chốt thành acceptance criteria đo được và kết luận DoR ở mức đủ để sang technical approach."
input_summary:
  - "Step 1 đã restate scope phase 1 cho GitLab self-hosted"
  - "Step 2 đã khóa business goal và non-goals"
  - "User đã chốt auth SSH, pull ff-only và MVP inspect + pull + push"
  - "User đã chốt dùng zereight/gitlab-mcp làm chuẩn cho lane GitLab"
output_summary:
  - "Acceptance criteria đo được cho phase 1"
  - "Brownfield baseline và compatibility constraints"
  - "DoR verdict để chuyển sang step 5"
done_when:
  - "Criteria đủ rõ để thiết kế technical approach mà không tự suy diễn scope"
  - "Các blocker discovery còn lại không còn chặn design"
owner: "developer"
```

## Requirement Baseline
```yaml
status: APPROVED
approved_spec_refs:
  - "mcp-gitlab.s01.restate.md"
  - "mcp-gitlab.s02.business-goal.md"
  - "mcp-gitlab.s03.open-questions.md"
decision_notes:
  - "Phase 1 chỉ áp dụng cho repository GitLab đã tồn tại"
  - "MVP tool surface là inspect + pull + push"
  - "Auth ưu tiên SSH và pull mặc định ff-only"
  - "GitLab standard runtime/reference là zereight/gitlab-mcp"
  - "Workflow phải ghi explicit provider target và host khi chạm provider-specific MCP"
```

## Contract Baseline
```yaml
status: NOT_APPLICABLE
api_contract_refs: []
ux_contract_refs: []
notes:
  - "Phase 1 chưa mở API contract hay UX contract riêng; cách fit tool surface với runtime chuẩn sẽ được chốt ở step 5"
```

## Existing System Baseline
```yaml
current_behavior_refs:
  - "mcp/github-push/README.md"
  - "mcp/github-push/src/core.js"
  - "mcp/github-push/src/index.js"
  - "adapters/mcp/install-github-push.sh"
  - "https://github.com/zereight/gitlab-mcp"
impacted_surfaces:
  - "workflow artifact của lane GitLab"
  - "Codex MCP config/integration cho runtime GitLab chuẩn"
  - "nếu cần, wrapper mỏng hoặc adapter repo-local quanh standard runtime"
compatibility_constraints:
  - "Không làm thay đổi behavior của github-push MCP hiện có"
  - "Provider distinction GitHub/GitLab phải explicit, không được suy diễn"
  - "Guardrail và boundary của lane GitLab không được làm hỏng lane GitHub hiện có"
  - "Không tự động merge hoặc rebase khi pull; mặc định ff-only"
rollback_constraints:
  - "Có thể rollback bằng cách gỡ config/integration của lane GitLab mà không ảnh hưởng MCP GitHub hiện có"
```

## Artifact Chính
```yaml
acceptance_criteria:
  - id: AC1
    description: "Lane GitLab của work item này dùng zereight/gitlab-mcp làm standard runtime/reference cho self-hosted host gitlab.ggg.com.vn."
    measurable: true
  - id: AC2
    description: "Workflow artifact chỉ rõ provider target là GitLab, host GitLab và runtime chuẩn; không suy diễn từ context."
    measurable: true
  - id: AC3
    description: "Giải pháp phase 1 đáp ứng inspect repository, pull current branch và push current branch cho repository GitLab đã tồn tại."
    measurable: true
  - id: AC4
    description: "Pull mặc định dùng fast-forward only; nếu branch state không cho phép ff-only thì tool phải fail rõ thay vì tự merge hoặc rebase."
    measurable: true
  - id: AC5
    description: "Auth phase 1 ưu tiên SSH và không yêu cầu flow tạo mới repository GitLab."
    measurable: true
  - id: AC6
    description: "Có Codex integration/config cho lane GitLab theo standard runtime đã chọn."
    measurable: true
  - id: AC7
    description: "Quyết định của lane GitLab không làm thay đổi behavior hoặc contract của lane GitHub hiện có."
    measurable: true
edge_cases:
  - "Repo local có thay đổi chưa commit trước khi pull"
  - "Remote GitLab không truy cập được hoặc auth SSH thất bại"
  - "Branch hiện tại không có upstream phù hợp để pull/push"
  - "Pull không ff-only được do local và remote diverged"
  - "Standard runtime cần wrapper hoặc adapter bổ sung để khớp local git workflow"
out_of_scope:
  - "Tạo project/repository GitLab mới"
  - "Merge request lifecycle"
  - "GitLab CI/CD hoặc project settings"
  - "HTTPS + PAT support nếu không thật sự cần trong phase 1"
  - "Xây GitLab MCP mới từ đầu nếu standard runtime hiện có đủ hoặc chỉ cần wrapper mỏng"
done_when:
  - "Acceptance criteria có thể map trực tiếp sang test/verification path"
  - "Brownfield compatibility constraints đã được ghi rõ"
  - "Không còn blocker discovery trọng yếu chặn technical approach"
behavioral_invariants:
  - "Không force push và không rewrite history"
  - "Không ngầm suy luận provider GitHub/GitLab"
  - "Không làm thay đổi workflow hoặc config của github-push MCP hiện có"
  - "Không tự merge hoặc rebase trong pull mặc định"
```

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - "Đã nâng profile strict vì scope chạm external integration"
  - "Đã khóa non-goals để tránh trượt sang create repo và MR flow"
  - "Đã phản ánh quyết định dùng zereight/gitlab-mcp làm chuẩn cho lane GitLab"
  - "Đã ghi rule explicit provider distinction ở mức artifact"
blocking_items: []
owner: "developer"
next_action: "Spec và DoR đã được requester approve ngày 2026-04-23; chuyển sang step 5 để chốt technical approach."
```

## Definition of Ready
```yaml
status: READY
blockers: []
owners:
  - "po/developer review gate owners"
notes:
  - "Restated request đã rõ và scope đã khóa"
  - "Provider target, host và standard runtime đã được user chốt"
  - "Conflict còn lại là bài toán technical-fit cho step 5, không chặn design"
  - "Requester đã approve step 4 ngày 2026-04-23; work item sẵn sàng sang technical approach"
```

## Traceability
```yaml
upstream:
  - "mcp-gitlab.s01.restate.md"
  - "mcp-gitlab.s02.business-goal.md"
  - "mcp-gitlab.s03.open-questions.md"
next_step: "mcp-gitlab.s05.technical-approach.md"
```

## Handoff
- Criteria bắt buộc: standard runtime là zereight/gitlab-mcp, provider distinction explicit, inspect + pull + push cho repo GitLab đã tồn tại, SSH-first, ff-only pull.
- Edge case phải giữ: local dirty state, upstream thiếu, auth fail, diverged branch không ff-only được và bài toán adopt-vs-wrap quanh standard runtime.
- Điều kiện sang step 5: đã đạt; tiếp theo phải chọn approach nhỏ nhất đúng mục tiêu giữa direct-use và thin-wrapper quanh standard runtime.
