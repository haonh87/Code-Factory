---
artifact_id: "mcp-root-containment.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "0.1"
owner: ba
reviewers: ["ta", "developer", "qc"]
source_of_truth: true
linked_work_items: ["mcp-root-containment"]
linked_crs: []
---

# SEC-002 — MCP Physical Root Containment

The user accepted SEC-002 after SEC-001 was closed. This is the concrete proposal for review;
accepting the topic did not sign its admission or readiness gates.

## Scope

One coupled physical-path security correction across github-push, gitlab and session-search.
Existing roots/targets are resolved physically. Missing GitHub creation destinations and historical
workspace names have an explicit ancestor policy. Session result filtering verifies the source file
and its actual workspace before returning indexed content. Three core modules, their tests and
README behavior notes are in scope; production entrypoint schemas remain unchanged.

## Requirements

- REQ-MR-001: Repository operations and creation must remain under the configured physical root.
- REQ-MR-002: Session files, workspace metadata and returned session entries must satisfy physical containment.
- REQ-MR-003: Keep valid MCP interfaces, isolate test effects and state compatibility/security limits honestly.

## Decisions Requiring Human Review

- Reject unresolvable configured roots; allow contained symlinks and root aliases after canonicalization.
- Keep historical workspace names only when their nearest existing directory ancestor is contained.
- Filter missing/outside/contradictory session result records; this intentionally narrows stale-index results.
- Canonical path values may be returned in existing fields; field names and tool schemas do not change.
- Threat model: administrator-controlled configuration, trusted Git/cass binaries and filesystem directories
  that are not concurrently replaced by a hostile local process. Revalidation reduces stale checks; it is
  not an atomic sandbox. Arbitrary repository hooks/config, .git external metadata, hard-link aliasing,
  remote-host policy SEC-005 and malicious binary/index behavior are separate security boundaries.
- Verification target is the current macOS environment. Author portable symlink/junction fixtures and
  explicitly record any unavailable Windows run; native Windows validation is needed before Windows rollout.

## Exclusions

No SEC-001 merge, SEC-005 remote-policy fix, SEC-006 spec-reference fix, shared framework, new dependency,
live MCP installation, source upload, real remote operation, release or merge. The cancelled initial
mcp-physical-root-containment intake remains historical; mcp-root-containment is the only active candidate.

## Acceptance Criteria

- **AC-MR-001 (REQ-MR-001)**: Existing repository operations stay within the physical configured root.
  Verify: For both Git MCPs, sibling-prefix, parent traversal, file/directory symlink escape, chained link and loop cases reject before the Git child is launched. Existing in-root repositories, root aliases and contained links succeed.
- **AC-MR-002 (REQ-MR-001)**: GitHub initialization may create only a verified in-root destination.
  Verify: Require an existing resolvable directory root; resolve the nearest existing parent of a missing destination, reject dangling links and non-directory ancestors, revalidate after mkdir and before git init. Assert no outside fixture write. GitLab continues to require an existing repository.
- **AC-MR-003 (REQ-MR-002)**: Session reads validate the physical file before opening it.
  Verify: view/context/related reject escaped, dangling, cyclic, missing or non-regular session paths before transcript open or cass invocation. Accept existing regular in-root files and contained file links.
- **AC-MR-004 (REQ-MR-002)**: Workspace checks resolve existing links while preserving bounded historical paths.
  Verify: Canonicalize an existing configured workspace root. Missing historical workspace suffixes may use a verified existing in-root directory ancestor; dangling links, permission failures, outside ancestors and invalid types fail closed. Test root aliases, sibling prefixes, .. traversal and a legitimate ..notes child.
- **AC-MR-005 (REQ-MR-002)**: List/search/related results do not expose unverifiable session entries.
  Verify: Validate the result file under sessions root and its actual session workspace under the requested physical workspace before sanitizing content. Filter outside/missing/invalid entries and contradictory index metadata. Preserve limits and pagination; use a stub cass with mixed valid/invalid records.
- **AC-MR-006 (REQ-MR-003)**: Valid public tool names, input schemas and output fields remain compatible.
  Verify: No entrypoint/schema or dependency changes. Canonical path values may replace aliases. Existing parsing/sanitization, Git status and local-only repository creation controls pass; replace OS-specific fake path fixtures with real temporary directories.
- **AC-MR-007 (REQ-MR-001)**: Filesystem uncertainty never falls back to lexical allow.
  Verify: Invalid types, embedded NUL, missing roots, ENOTDIR, ELOOP and permission/canonicalization failures reject or filter with bounded diagnostics; no private content or credential data in diagnostics.
- **AC-MR-008 (REQ-MR-003)**: The implementation revalidates near use without claiming atomic confinement.
  Verify: Use canonical paths for downstream Git/cass/read operations, recheck at each operation boundary and after creation. Deterministically retarget a link between calls to prove revalidation. Document the trusted/local filesystem assumption and remaining check/use race; do not claim protection from a concurrent hostile filesystem writer.
- **AC-MR-009 (REQ-MR-003)**: Tests remain isolated and portable.
  Verify: Synthetic temporary roots and transcripts only; stub Git/cass for denial-before-use assertions, use local Git fixtures with hooks/credentials/transports isolated for positive controls, bounded child timeouts. Never call real remote GitHub/GitLab, real cass index or installed MCP. Directory junction fixture runs on Windows when available; macOS evidence never counts as a Windows pass.
- **AC-MR-010 (REQ-MR-003)**: The bounded fix has complete review and verification evidence.
  Verify: TDD RED/GREEN per affected boundary; each MCP npm run check, the workflow-bundle registered suite, syntax/static/security review, UTF-8 and workflow validation. Record platform/tool skips explicitly for QC. Source and test edits confined to approved paths; live rollout and merge excluded.
