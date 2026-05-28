---
artifact_id: "mcp-gitlab.s06.task-breakdown"
artifact_family: workflow-step
work_item_slug: "mcp-gitlab"
step_id: "s06"
step_slug: "task-breakdown"
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
  task_plan:
    - "developer"
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
  - "task-breakdown-planner"
  - "step-goal-contract"
artifact_skills:
  - "obsidian-markdown"
upstream_artifacts:
  - "mcp-gitlab.s05.technical-approach.md"
linked_artifacts: []
tags:
  - "agent-ops"
  - "workflow/s06"
---

# Step 6 - Task Plan

> [!summary]
> Tóm tắt task plan, dependency, verify checkpoints và review checkpoints.

## Step Contract
```yaml
step_goal: "Chuyển approach đã được approve thành task plan đủ cụ thể để implement lane GitLab theo hướng thin wrapper mà không làm mơ hồ path, verify path hay scope guard."
input_summary:
  - "Step 5 đã được approve ngày 2026-04-23"
  - "Phase 1 chỉ gồm inspect repository, pull current branch và push current branch"
  - "Lane GitLab dùng zereight/gitlab-mcp làm standard runtime/reference"
  - "GitHub lane hiện có phải giữ nguyên behavior"
output_summary:
  - "BA lane map acceptance criteria sang task và scope guard"
  - "DEV lane map path, dependency order và TDD targets"
  - "Task breakdown có ownership, review checkpoint và verification hint"
done_when:
  - "Không còn placeholder kiểu 'làm phần còn lại'"
  - "Mỗi task có objective, paths_in_scope, outputs_expected và verification_hint"
  - "Có verify path rõ cho SSH, ff-only, dirty tree, missing upstream và lane isolation"
owner: "developer"
```

## Artifact Chính
```yaml
implementation_goal: "Ship lane GitLab phase 1 dưới dạng MCP wrapper/integration mỏng cho inspect, pull và push trên repository GitLab đã tồn tại, đồng thời giữ explicit provider distinction và không làm đổi behavior của lane GitHub."
ba_lane:
  acceptance_coverage:
    - "AC1 + AC2 được cover bởi T1 và T3 qua package/config naming, provider metadata và host/runtime wiring explicit"
    - "AC3 + AC4 + AC5 được cover bởi T2 và T4 qua tool surface inspect/pull/push, SSH-first và ff-only guardrails"
    - "AC6 được cover bởi T3 và T5 qua installer/config registration và smoke check"
    - "AC7 được cover bởi T1, T4 và T5 qua lane isolation rule, read-only reference với github-push và regression checks"
  scope_guards:
    - "Không thêm create repository, merge request, pipeline hay project-settings flow"
    - "Không mở HTTPS + PAT trong phase 1 nếu không có blocker delivery thực tế"
    - "Không sửa tool surface hoặc contract của github-push hiện có"
    - "Không cho phép pull tự merge hoặc rebase; default phải là ff-only"
  human_review_points:
    - "Approve task plan trước khi mở step 7 implement"
    - "Review naming cuối cùng cho package/server/config của lane GitLab nếu khác mặc định `mcp/gitlab` và server `gitlab`"
    - "Review fail-fast behavior cho dirty working tree và diverged branch trước khi coi implementation là complete"
dev_lane:
  path_map:
    - "New package lane GitLab: mcp/gitlab/package.json, mcp/gitlab/codex-config.toml.template, mcp/gitlab/src/index.js, mcp/gitlab/src/core.js, mcp/gitlab/README.md, mcp/gitlab/test/core.test.js"
    - "Installer/config wiring: adapters/mcp/install-gitlab.sh, adapters/mcp/install-gitlab.ps1"
    - "Read-only reference baseline: mcp/github-push/src/core.js, mcp/github-push/src/index.js, mcp/github-push/README.md, adapters/mcp/install-github-push.sh"
    - "Workflow evidence only: work-items/mcp-gitlab/*"
  technical_sequence:
    - "T1 chốt package boundary, server name, config template và explicit provider/host metadata"
    - "T2 implement core wrapper tools và local git guardrails trong src/core.js + src/index.js"
    - "T3 wire installer/config cho Codex và đảm bảo lane GitHub không bị overwrite"
    - "T4 thêm tests + docs cho success path và failure path"
    - "T5 chạy package checks, workflow validation và smoke check trên repo GitLab đã tồn tại nếu environment cho phép"
  tdd_targets:
    - "T2/T4: pull_current_branch fail khi dirty working tree"
    - "T2/T4: pull_current_branch fail khi branch diverged và không ff-only được"
    - "T2/T4: push_current_branch fail rõ khi thiếu upstream hoặc auth SSH lỗi"
    - "T2/T4: inspect_repository chỉ báo metadata trong allowed root và reject path ngoài boundary"
task_breakdown:
  - id: T1
    owner_role: developer
    name: "Scaffold lane GitLab và khóa boundary config"
    objective: "Tạo skeleton `mcp/gitlab` theo pattern hiện có, chốt naming ngắn gọn và config template explicit cho provider GitLab, host self-hosted và allowed root."
    paths_in_scope:
      - "mcp/gitlab/package.json"
      - "mcp/gitlab/codex-config.toml.template"
      - "mcp/gitlab/README.md"
    dependencies: []
    outputs_expected:
      - "Package MCP mới cho lane GitLab với script start/test/check"
      - "Config template có server name, entry point, allowed root và host GitLab explicit"
      - "README nêu rõ standard runtime/reference là zereight/gitlab-mcp và scope phase 1 chỉ local inspect/pull/push"
    review_checkpoint: "Review boundary sau khi scaffold để chắc package mới không kéo scope sang GitLab platform API."
    verification_hint: "So sánh với pattern `mcp/github-push` và kiểm tra config template không ghi đè lane GitHub."
  - id: T2
    owner_role: developer
    name: "Implement core wrapper tools và guardrails local git"
    objective: "Expose đúng ba tool `inspect_repository`, `pull_current_branch`, `push_current_branch` với guardrails SSH-first, ff-only và explicit failure cho dirty tree, missing upstream, path ngoài allowed root."
    paths_in_scope:
      - "mcp/gitlab/src/core.js"
      - "mcp/gitlab/src/index.js"
    dependencies:
      - "T1"
    outputs_expected:
      - "Core helpers cho inspect/pull/push của repository GitLab đã tồn tại"
      - "Validation cho current branch, upstream tracking, allowed root và GitLab host expectation"
      - "Failure message rõ cho dirty working tree, diverged branch, auth fail và missing upstream"
    review_checkpoint: "Review sớm sau khi hoàn tất contract tool surface và guardrail, trước khi sang installer."
    verification_hint: "Đi theo TDD cho các behavior change chính: fail trước với dirty tree/diverged branch rồi pass sau khi implement."
  - id: T3
    owner_role: developer
    name: "Wire installer và Codex integration cho lane GitLab"
    objective: "Đăng ký MCP GitLab vào Codex config bằng installer shell/PowerShell theo pattern repo hiện có, nhưng giữ managed block tách biệt với `github-push`."
    paths_in_scope:
      - "adapters/mcp/install-gitlab.sh"
      - "adapters/mcp/install-gitlab.ps1"
      - "mcp/gitlab/codex-config.toml.template"
    dependencies:
      - "T1"
      - "T2"
    outputs_expected:
      - "Installer shell và PowerShell cho lane GitLab"
      - "Managed config block riêng cho server GitLab"
      - "Không đụng credential helper GitHub vì phase 1 là SSH-first"
    review_checkpoint: "Review config merge logic để tránh overwrite hoặc remove block của lane GitHub."
    verification_hint: "Dry-run bằng file config tạm hoặc inspection logic để chắc managed block của GitLab độc lập."
  - id: T4
    owner_role: developer
    name: "Bổ sung test và tài liệu vận hành"
    objective: "Bao phủ success/failure path cho inspect/pull/push và viết hướng dẫn cài đặt, boundary, non-goal và expected error behavior."
    paths_in_scope:
      - "mcp/gitlab/test/core.test.js"
      - "mcp/gitlab/README.md"
      - "mcp/gitlab/package-lock.json"
    dependencies:
      - "T2"
      - "T3"
    outputs_expected:
      - "Test cases cho dirty tree, missing upstream, diverged branch, allowed root và lane isolation"
      - "README mô tả SSH-first setup, ff-only pull, self-hosted host và rollback cách gỡ config"
      - "Package lock phản ánh dependency thực tế nếu có package mới"
    review_checkpoint: "Review coverage đủ cho edge cases trong acceptance criteria trước khi chuyển verify."
    verification_hint: "Chạy `npm test` và `npm run check` trong `mcp/gitlab`."
  - id: T5
    owner_role: developer
    name: "Thực hiện smoke check và gom evidence handoff"
    objective: "Chạy verify tối thiểu cho package mới và gom evidence lane isolation để handoff sang step 8."
    paths_in_scope:
      - "work-items/mcp-gitlab/mcp-gitlab.s07.implementation.md"
      - "work-items/mcp-gitlab/mcp-gitlab.s08.verification.md"
    dependencies:
      - "T4"
    outputs_expected:
      - "Evidence check cho package GitLab và workflow validator"
      - "Ghi nhận rõ những gì đã được smoke test và residual risk còn lại"
      - "Checklist rằng github-push không bị thay contract hay config"
    review_checkpoint: "Review evidence completeness trước khi đóng implementation batch."
    verification_hint: "Chạy package check, workflow validator và nếu môi trường cho phép thì smoke trên một repository GitLab SSH đã tồn tại."
dependencies_global:
  - "T1 phải xong trước khi implement tool surface để tránh drift naming/config"
  - "T2 là dependency chặn cho test và installer vì contract tool phải ổn định trước"
  - "T3 và T4 phải xong trước T5 để smoke có đủ package + config + docs"
risk_notes:
  - "Nguy cơ wrapper phình thành runtime riêng nếu T2 thêm capability ngoài inspect/pull/push"
  - "Nguy cơ overwrite config lane GitHub nếu T3 không tách managed block chuẩn"
  - "Nguy cơ mismatch standard runtime/reference nếu README/config không nói rõ zereight/gitlab-mcp chỉ là chuẩn lane GitLab"
  - "Nguy cơ false confidence nếu chỉ test happy path mà bỏ qua dirty tree, diverged branch và missing upstream"
verification_plan:
  - "Workflow note vẫn phải pass `npm run validate:workflow -- --workflow-root work-items/mcp-gitlab --project-root .`"
  - "Package mới phải pass `npm test` và `npm run check` trong `mcp/gitlab`"
  - "Installer logic phải được kiểm rằng chỉ thêm hoặc cập nhật block GitLab, không xóa block GitHub"
  - "Nếu có repo GitLab SSH sẵn trong allowed root, chạy smoke `inspect -> pull ff-only -> push` theo branch hiện tại"
  - "Nếu không có môi trường smoke thật, phải ghi rõ residual risk về SSH/auth/network ở step 8"
notes_for_implementation: "Giữ implementation nhỏ nhất: tham chiếu pattern `github-push`, nhưng không copy toàn bộ logic GitHub sang GitLab. Wrapper chỉ phục vụ local git workflow phase 1; mọi capability GitLab platform/API khác giữ ngoài scope."
```

## Verification Plan
- Check bắt buộc: workflow validator cho work item, `npm test`, `npm run check`, installer block isolation và smoke path `inspect -> pull ff-only -> push` nếu có repo SSH thật.
- Risk note: SSH/auth và remote reachability có thể không chứng minh hết bằng unit test; nếu không smoke thật được thì phải giữ residual risk rõ ở step 8.
- Rollout note nếu có: rollout chỉ là thêm lane GitLab mới; rollback bằng cách gỡ config/installer của lane này mà không đụng GitHub lane.

## Governance Checks
```yaml
checklist_applied:
  - "project-context/checklists/strict.md"
checks:
  - "Step 5 đã được approve và materialize thành task plan có ownership rõ"
  - "Path map đã tách rõ path mới của lane GitLab và path read-only của lane GitHub"
  - "Verify path đã bao phủ SSH-first, ff-only, dirty tree, diverged branch và missing upstream"
  - "Task plan giữ non-goals rõ, không mở rộng sang create repo, MR hay CI/CD"
blocking_items: []
owner: "developer"
next_action: "Chờ human review/approve task plan trước khi mở step 7 implementation."
```

## Brownfield Delivery Plan
```yaml
regression_checkpoints:
  - "Xác nhận `mcp/github-push/*` không bị sửa ngoài phạm vi tham chiếu"
  - "Xác nhận installer GitLab không xóa hoặc overwrite block `github-push` trong Codex config"
compatibility_checkpoints:
  - "Provider distinction GitLab/GitHub explicit trong config và docs"
  - "Tool surface GitLab chỉ là inspect/pull/push cho repo đã tồn tại"
  - "Pull mặc định vẫn ff-only và fail-fast khi diverged"
migration_or_backfill_steps: []
rollback_or_restore_steps:
  - "Gỡ block server GitLab khỏi Codex config"
  - "Bỏ package và installer lane GitLab nếu rollout không đạt"
  - "Không cần rollback dữ liệu hay repository state migration"
```

## Traceability
```yaml
upstream:
  - "mcp-gitlab.s04.acceptance-criteria.md"
  - "mcp-gitlab.s05.technical-approach.md"
next_step: "mcp-gitlab.s07.implementation.md"
```

## Handoff
- Task thực hiện trước: T1 để khóa naming/config boundary, rồi T2 để ổn định tool contract trước installer và test.
- Phụ thuộc chặn: chưa có blocker kỹ thuật mới; gate còn thiếu là human approval cho task plan.
- Điều kiện sang step 7: approve `s06`, sau đó implement theo đúng order T1 -> T2 -> T3 -> T4 -> T5 và không vượt khỏi scope `inspect + pull + push`.
