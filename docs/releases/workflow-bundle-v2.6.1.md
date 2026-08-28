# workflow-bundle v2.6.1

Prepared: `2026-08-25`
Planned tag after Release approval: `v2.6.1`
Change package: `CHANGE-006`

## Summary

`workflow-bundle v2.6.1` is a patch candidate that aligns the release-blocking authoring-smoke
fixture with the already-approved legacy-scaffold approval bootstrap behavior. It does not change
production approval semantics, the public CLI contract, or the inventory of 42 managed skills.

## Changes

- Rename the obsolete `mutating-action-requires-report` smoke case to describe successful
  legacy-scaffold approval bootstrap.
- Prove read-only `status` persists no protocol report.
- Pass the required human reviewer during explicit approval and verify `request_source=legacy-scaffold`,
  `REPORT_BOOTSTRAPPED`, `approval_status=APPROVED`, and `reviewed_by=ba` afterward.
- Remove only the successful case-owned workflow before later cases scan the shared temporary project.
- Advance structured package and current-candidate documentation from `v2.6.0` to `v2.6.1`.
- Keep the immutable `v2.6.0/42` release as the exact rollback target.

## Compatibility

- No production approval-path file, command, flag, schema, event, runtime, deployment, or managed-skill
  contract changes.
- Node `>=18`, npm `>=9`, Codex/Claude, global/project, and unmanaged-content preservation remain in scope.
- The established design-readiness guidance from `v2.6.0` remains present.
- GitHub Release is the only publication target for this patch; npm publication is excluded.

## Verification

- The unchanged baseline reproduced the stale failure after 12 passing cases: approval stopped at the
  missing `--reviewed-by` argument while the case still expected `Missing work item report`.
- The corrected suite records 13/13 authoring smoke PASS.
- The dedicated TD-01 through TD-04 approval-path regression fixtures PASS without a production edit.
- Syntax, workflow validators, full unit, pack audit, source bundle smoke, exact candidate/rollback,
  remote CI, and digest evidence are recorded in the governed s07/s08 artifacts rather than inferred here.

## Rollback

- Use the retained immutable v2.6.0 artifact and `wfc install` for the downgrade.
- Re-run all Codex/Claude global/project scenarios and verify installed version `2.6.0`, managed skills
  `42`, and unchanged unmanaged hashes/modes.
- Never retarget `v2.6.0` or a published `v2.6.1`; issue a later governed patch if roll-forward is needed.

## Known Limitations

- This note describes an unpublished candidate and is not Release or Business Acceptance evidence.
- Remote Workflow Guardrails 9/9 and s08 QC evidence remain pending until the governed execution reaches
  those checkpoints.
- A source or package-payload edit after candidate freeze invalidates the recorded candidate digest.

## Public Docs

- [`docs/publish-surface.md`](../publish-surface.md)
- [`docs/workflow-docs-map.md`](../workflow-docs-map.md)
- [`docs/workflow-bundle-quickstart.md`](../workflow-bundle-quickstart.md)
- [`packages/workflow-bundle/README.md`](../../packages/workflow-bundle/README.md)

## Release Gates

- Technical Verification and DoD: human QC approval required in s08.
- Release: human DevOps and QC approval required before tag or GitHub Release publication.
- Business Acceptance: human PO approval required after remote identity and finding evidence are complete.
- Publication status: blocked until all required evidence and approvals are valid.
