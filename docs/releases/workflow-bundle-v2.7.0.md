# Workflow Bundle v2.7.0 Candidate

Status: **UNPUBLISHED**. CHANGE-005 / add-diagram-design-adapter. This is preparation,
not a release approval or publication record.

## Complete Packaged Delta

One optional diagram-design-presentation-adapter, bringing each runtime to 43 managed skills.
SA/TA preserve their schemas and record presentation intent; architecture-modeling owns
canonical facts, views and rendering. The optional derivative uses a distinct ID/owner.
Static HTML, SVG and transparent PNG share canonical facts and a hashed evidence manifest.
Incomplete, unsafe, unpinned or contradictory input rejects without partial publication.

The 155-file upstream capability at commit 5f1b6ddc66036554dd68701798bd12aa5e3ef3f9
is preserved under non-discoverable resources, including MIT license and Read/Write
capability evidence. Aggregate SHA-256:
97c4979fcbb92f4b0e1af8ef6fa79728ed2fa9cffccf838c6a0fa2e11738de96.
No invocation-time download, install, auto-update or URL onboarding occurs.

## Non-Packaged Repository Changes

Workflow progress, unit fixtures and release documentation are review evidence. Runtime
copies are generated from canonical skills. The source base is fa9ad23 plus governance
notes; it includes post-release CI/fixture work and is not identical to published 2.6.4.
No pipeline, native installer, application service or live managed home is changed.

## Compatibility

SA/TA output schemas, canonical DRAWIO/MERMAID/STRUCTURIZR_DSL routing and exactly-one-owner
cases remain unchanged. Absent, disabled or rejected adapter preserves canonical output.
Existing CLI approval and signed state-disposition controls remain unchanged.

## Known Limitations

The executable presentation templates support one/two-column fact views and validated local
JSON serialization of canonical model/view contracts. DSL needs a validated lossless projection.
Arbitrary user HTML, URL onboarding, animation and remote assets are unsupported. Maximum
canvas is 1600 x 16000; excessive input rejects instead of clipping. The publisher assumes
a trusted single-writer destination parent. Browser-context offline mode is not an OS sandbox.
PNG needs separately provisioned Playwright 1.64.0, greenlet 3.5.6, pyee 14.0.0,
typing-extensions 4.16.0 and Chromium headless shell 156.0.8078.4/revision 1248.
User-selected independent AI READER-TASK-001 results and post-wrap regression checks are
recorded in s08. They are AI assessment, not measured human usability or human gate approval.

## Verification

Focused TDD and first-party review cover provenance, negative admission, static/semantic
validation, accessibility names/descriptions, actual PNG export, failure atomicity and
unchanged canonical files. Runtime parity, full unit and retained exact-artifact lifecycle
results are recorded in the owning s07 note as executed; this document does not claim
unexecuted checks or hosted Node 18/22 verification. Release blockers remain in s08.

## Rollback

Use the published workflow-bundle-2.6.4.tgz, SHA-256
`9d7c5395ff5fb3ae2a64d26089a2c4c62122fb769a7cacd2e3bcea3f6fa35e84`.
Verify digest before isolated install/update/disable/rollback rehearsal. Disable the optional
adapter, restore the exact prior managed runtime for the same mode/scope, verify 42 skills,
unchanged unmanaged files and canonical artifacts. Do not rebuild the fallback from main.
No global/live rollback runs during candidate preparation.

## Release Gates

Candidate-specific DoD, Release, and Business Acceptance require human approval.
READER-TASK-001 requires two independent reviewers, 2/2 canonical/derivative/owner checks,
at least 18/20 declared-question answers and zero semantic contradictions.
No tag, registry publication, live installation, merge, push or worktree cleanup follows
from local test success. The exact frozen tarball must be retained and reviewed before promotion.
