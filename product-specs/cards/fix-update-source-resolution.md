---
artifact_id: "fix-update-source-resolution.card"
artifact_family: product-spec
spec_type: SPEC_CARD
spec_status: approved
spec_version: "1.0"
owner: "developer"
reviewers: ["qc", "devops"]
source_of_truth: true
linked_work_items: ["fix-update-source-resolution"]
linked_crs: []
---

# Update source selection and downgrade protection

## Business Goal

Prevent a globally installed workflow CLI from silently replacing a newer managed
installation with files from an older checkout under the current directory.
The maintainer requested the previously proposed priorities 1 and 2 with `làm 1 và 2`.
This baseline covers priority 2; trusted readiness receipts remain pending.

## Requirements

- REQ-001: Implicit bundle source follows the running CLI's own manifest, independent of cwd.
- REQ-002: An explicit `--repo-root` selects that source, including intentional source authoring; invalid explicit sources fail without fallback.
- REQ-003: `update` must reject a source older than any affected installed runtime/project before writing managed files or state. Diagnostics identify source, installed version, and affected location.
- REQ-004: Same-version updates, forward upgrades, fresh installs and explicit `install` for deliberate rollback remain available. No new command or flag is introduced.

## Acceptance Criteria

- AC-001: A packaged CLI invoked from an older checkout and its nested directories reports/uses its own source. Running a source checkout's CLI uses that checkout's packaged runtime; authors can select repository sources explicitly.
- AC-002: Explicit valid `--repo-root` wins; a missing/invalid explicit source errors rather than falling back to cwd or the CLI source.
- AC-003: Updating a newer runtime home or selected project from an older source exits nonzero before any byte or mode change. This also applies when an older source was selected explicitly. Unselected projects are untouched.
- AC-004: Stable X.Y.Z versions compare numerically, including minor/major boundaries. Nonempty unsupported versions fail conservatively on update; absent legacy installation-version metadata preserves existing bootstrap compatibility.
- AC-005: Codex and Claude pass fresh installation, same-version update and forward update in isolated homes/projects. `install --repo-root <chosen-source>` remains the deliberate reinstall/rollback path; `update --rollback-context` retains its existing behavior.
- AC-006: A packed artifact reproduces the old-cwd scenario safely; tests, source/runtime audit and documentation explain default source selection and downgrade recovery.

## Scope

Source resolution, update preflight, focused regression tests, package smoke and
English/Vietnamese CLI usage documentation. Base: origin/main 8e4fae4 (2.10.1).
Exclude package version bump, public release, npm publication, global/project rollout,
A3/A4 integration, and the separately observed large SessionStart payload truncation.
Do not overwrite the immutable published 2.10.1 package with an unpublished patch.

## Compatibility And Rollback

No public API/event/data schema changes, migration or new dependencies. The intentional
change is that update cannot perform a downgrade; explicit install remains available
for a deliberately selected older source. Existing --repo-root is preserved. Revert
the isolated patch to restore prior source/update behavior if necessary.
