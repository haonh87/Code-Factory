---
artifact_id: "release-workflow-bundle-v2-6-4.srs"
artifact_family: product-spec
spec_type: SRS
spec_status: approved
spec_version: "0.1"
owner: "ba"
reviewers: ["developer", "qc", "devops"]
source_of_truth: true
linked_work_items: ["release-workflow-bundle-v2-6-4-cr010"]
linked_changes: ["CR-010"]
---

# SRS — workflow-bundle v2.6.4

## Objective
Deliver a new immutable patch release that contains P-INSTALL while preserving v2.6.3. The user accepted this direction and separately accepted the prerequisite recovery fix. The release candidate and public transaction still require their own gates.

## Baseline and scope
Source baseline: cbf6c095b303f6979ac135b08c063bfdf2ad9fb2. Published fallback: v2.6.3. Preserve existing package allowlist, commands and runtime model. Do not close the parent holistic audit, install into live profiles, retarget old tags, or include unrelated untracked files.

## Acceptance Criteria

### AC-REL-01 — Immutable fallback
Remote v2.6.3 tag object 41ae8213a02de994333ddf25993e16ec99644560 and peeled commit 7f810352ca253b9b8356f9116335cc03713adae4 remain unchanged; retained workflow-bundle-2.6.3.tgz SHA-256 is f496aed3828e6722e26d8010a9e70cab585979467b3c9fbf35cce8e334a62e8f.

### AC-REL-02 — Complete source tag
The approved v2.6.4 tag must descend from main cbf6c095b303f6979ac135b08c063bfdf2ad9fb2 and therefore contain P-INSTALL merge 54243b7. Downloaded tagged source must contain the accepted Bash and PowerShell blobs with SHA-256 20e54a10ef2e3fdadda39623913dd3bec8367a1249bc4207eef35e82a4438ce5 and 859c41118ae1a9c3e8d0bf6154e7d00083a999dae08eb81b0eb60f818f475afa respectively, unless a separately approved successor is recorded.

### AC-REL-03 — Truthful release inventory
Release notes inventory all v2.6.3-to-candidate changes, distinguishing packaged CLI/runtime behavior from repository-only direct installers, CI and workflow evidence. No claim that adapters/codex scripts are in the npm tarball.

### AC-REL-04 — Candidate identity
Root/package manifests, package.json, CLI version/help and active English/Vietnamese release documentation agree on v2.6.4; candidate remains explicitly unpublished until Release approval. Retain Node >=18, npm >=9, five install modes and 42 managed skills per harness.

### AC-REL-05 — Build once
Build exactly one candidate tarball from the reviewed source; record full commit SHA, SHA-256 and complete file inventory. Node 18 and 22 must test the same bytes, and publication must upload those verified bytes without rebuilding.

### AC-REL-06 — Compatibility and rollback
Exact candidate artifact passes isolated Codex/Claude install, repeat update and status/skill checks; rollback to the retained v2.6.3 artifact preserves unmanaged files and reports v2.6.3/42. v2.6.3 retains exact state disposition but lacks the new recovery extension; rollback assertions reflect that boundary.

### AC-REL-07 — Verification
Run full unit tests, runtime parity/pack audit, native installer matrix Windows/Linux/macOS and exact-artifact smoke checks; retain run IDs and digests. Text encoding and release-contract checks pass. Any missing evidence is explicit and requires human acceptance, not inferred pass.

### AC-REL-08 — Release authority
DoD and Release gates bind the exact reviewed source and artifact digest. No tag, GitHub publication or registry mutation before Release approval; no autonomous signing. Work-item/change approval and s04-s06 receipts are separate prerequisites for preparation changes.

### AC-REL-09 — Public verification
After authorized publication, verify remote tag commit and ancestry, downloaded source installer hashes, release asset hash/version and intended distribution channel. Record Business Acceptance before closing; preserve rollback artifact and original signed evidence.

## Distribution boundary
Prepare the GitHub Release tarball/checksum and GitHub-generated source archives, matching the verified existing v2.6.3 surface. Registry publication is not implied by generating an npm-format tarball: if npm registry distribution is required, resolve package ownership/authentication and pin its exact channel in the Release approval before any publish command.

## Approval state
User explicitly accepted the CR-010 change/work-item and Spec/DoR, Approach and Task Plan packet in chat; recorded at 2026-10-16T06:59:48Z. Trusted preparation receipts remain pending. No Release or Business Acceptance approval is inferred.

## Current ownership
Current proposal: release-workflow-bundle-v2-6-4-cr010 / CR-010. The previous unsigned release draft is cancelled and retained for audit. Requirements are unchanged; new proposal requires its own gate receipts.
