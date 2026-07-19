---
title: "Đo bổ sung AC-5: codebase-memory trace_path depth 2"
date: 2026-07-18
related_work_items:
  - "codebase-memory-mcp-trial (DONE 2026-07-17, AC-5 residual)"
  - "codebase-memory-team-rollout (input cho s01)"
tags:
  - "agent-ops"
  - "research"
---

# Đo bổ sung AC-5: trace_path depth 2 (post-DoD addendum)

> [!summary]
> Đo lại giả thuyết residual của AC-5: "MCP thắng manual grep ở query sâu (depth 2+)".
> Kết quả: giả thuyết **KHÔNG được xác nhận** ở v0.9.0 — depth 2 outbound bị đứt tại
> ranh giới import cross-file, output thiếu toàn bộ hop-2 callees.

## Phương pháp

- Query: call graph `getRuntimeContext` (workflow-bundle-cli.js), depth 2, cả 2 hướng.
- MCP path: tool `trace_path` trong session Claude Code (codebase-memory-mcp@0.9.0, index HEAD 3447969).
- Manual path: grep/awk trên `workflow-bundle-cli.js` + `workflow-bundle-utils.js`.
- Token ước lượng chars/4, cùng phương pháp cho cả 2 path (nhất quán với T-4 của trial).

## Kết quả MCP (depth 2, both)

- 1 tool call, output ~3050 chars ≈ 763 tokens.
- Callees: chỉ 8 node hop-1, **0 node hop-2** (thiếu ~10 hàm: getConfiguredBundleFileNames,
  getRuntimeConfig, describeManifestFiles, getManifestBundleName, getManifestBundleVersion,
  readUtf8, resolveExistingPath, getDefaultRepoRoot, getDefaultRuntimeHome, loadAdapter,
  validateRuntimeMode, findManifestUpwards, walk).
- Callers: đúng — hop-2 là module node (top-level gọi runCli); applyInstallOrUpdate/applySkillsAction
  được gọi bởi runCli (đã có ở hop-1, dedup hợp lệ).

## Root cause (đã xác minh)

- 8 hàm hop-1 là **import** từ `workflow-bundle-utils.js`; trace từ `getRuntimeContext` resolve
  chúng thành node thuộc module `workflow-bundle-cli` (import binding).
- Node definition thật nằm ở `workflow-bundle-utils.*` và **có đầy đủ CALLS edges**
  (trace thẳng `loadBundleManifest` trả đúng 5 callees phía utils).
- Traversal depth 2 tiếp tục từ node binding (không có outgoing edges) thay vì node definition
  → chuỗi đứt tại ranh giới cross-file import.

## Kết quả manual (cùng độ đầy đủ, đúng ground truth)

- 4 tool calls (grep định nghĩa, awk bodies bên utils, grep callers; 1 lệnh đầu miss do sai giả định khai báo).
- Output tổng ≈ 2400 chars ≈ 600 tokens, cho đầy đủ hop-2 callees + callers.

## So sánh

| Tiêu chí | MCP 1 call | MCP workaround (re-trace 8 hàm) | Manual grep/awk |
|---|---|---|---|
| Tool calls | 1 | 9 | 4 |
| Tokens (ước) | ~763 | ~1400+ | ~600 |
| Correctness hop-2 callees | ✗ 0/10+ | ✓ | ✓ |

## Kết luận cho rollout

1. Residual AC-5 chuyển từ "chưa đo" thành "đã đo, giả thuyết không xác nhận ở v0.9.0":
   depth >1 outbound không tin được khi call chain đi qua import cross-file (pattern phổ biến
   nhất của repo JS). Single-hop (depth 1) vẫn đúng và ít tool call hơn manual (AC-4/AC-6 giữ nguyên).
2. Guidance sử dụng: dùng `trace_path` depth 1 per-function; muốn đi sâu thì re-trace từng
   hàm theo tên (name-based lookup resolve đúng node definition).
3. Input cho work item `codebase-memory-team-rollout`: cân nhắc (a) ghi limitation này vào
   hướng dẫn team, (b) kiểm tra version mới hơn 0.9.0 có fix import-boundary resolution không,
   (c) file issue upstream DeusData/codebase-memory-mcp.
