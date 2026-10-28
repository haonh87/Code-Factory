---
artifact_id: "workflow-pack-security-baseline.card"
artifact_family: "product-spec"
spec_type: "SPEC_CARD"
spec_status: "approved"
spec_version: "0.1"
owner: "ba"
reviewers: ["ta", "developer", "qc"]
source_of_truth: true
linked_work_items: ["workflow-pack-security-baseline"]
linked_crs: []
---

# Spec Card — CF-006 / P-SECURITY

The user accepted preparing this next work item on 2026-10-27. This card owns scope and criteria;
trusted human receipts own approval. RESEARCH uses the legacy full/strict writer with
`sdd_mode=none`; the card still supplies the Spec gate baseline.

## Scope

```yaml
in_scope: ["One security baseline and finding triage for tracked skills/, scripts/hooks/, adapters/, mcp/, packages/workflow-bundle/scripts/ at the pinned main commit.", "Pinned local SAST, secret scanning and manual skill/integration trust-boundary review in an ephemeral copy.", "Sanitized manifests, coverage, controls, findings and recommendations in this child work item."]
out_of_scope: ["Production fixes or auto-fix; other work-item remediation; release, publishing, installation into live harnesses or CI integration.", "Git history, untracked user files, private keys, real credentials, ~/.codex, ~/.claude, ~/.workflow-bundle and external connected services.", "Penetration testing, execution of target hooks/MCP services, dependency CVE/SBOM audit, formal proof or certification of security.", "Closing parent M7/M10/M11, language review or source/installed parity."]
```

## Requirements

```yaml
requirements: [{"id": "REQ-SEC-001", "statement": "Create a reproducible security baseline bound to the current tracked source and explicit coverage.", "provenance": "BASELINE", "source": "CF-006 / P-SECURITY accepted audit proposal"}, {"id": "REQ-SEC-002", "statement": "Keep scanner execution isolated, credential-free and offline; retain only sanitized evidence.", "provenance": "BASELINE", "source": "CF-006 / P-SECURITY accepted audit proposal"}, {"id": "REQ-SEC-003", "statement": "Classify actionable findings with evidence, severity and an accountable disposition owner; do not conflate scan completion with remediation.", "provenance": "BASELINE", "source": "CF-006 / P-SECURITY accepted audit proposal"}]
```

## Acceptance Criteria

```yaml
acceptance_criteria: [{"id": "AC-SEC-001", "requirement": "REQ-SEC-001", "description": "Manifest accounts for all 498 tracked files in the five target roots at 7dce0335c7339ba6f3859e1bc34aaa1168f40971, including 43 SKILL.md files; record path, Git mode, SHA-256 and scanner/manual eligibility. A changed count requires explanation before scanning.", "measurable": true}, {"id": "AC-SEC-002", "requirement": "REQ-SEC-002", "description": "Tool manifest records exact engine versions, acquisition source, publisher/package digest verification, executable/image digest, rule/config digest and licenses. No floating tag, remote rule resolution or unverified downloaded executable is used during scanning.", "measurable": true}, {"id": "AC-SEC-003", "requirement": "REQ-SEC-002", "description": "Scan process has no network, credentials, home directory or repository metadata access; source is read-only, output/temp are the only writable mounts. Controls demonstrate denied network/write access before scanning.", "measurable": true}, {"id": "AC-SEC-004", "requirement": "REQ-SEC-001", "description": "Each enabled detection class has a benign positive and negative control; missing positive detections, unexpected negatives, parser errors, timeouts or unaccounted skips produce PARTIAL/FAIL, never a clean PASS.", "measurable": true}, {"id": "AC-SEC-005", "requirement": "REQ-SEC-001", "description": "Coverage ledger accounts for every manifest entry by engine/manual result or explicit exclusion with reason and QC owner. Review all 43 skill entrypoints plus all executable hooks/adapters/MCP/bundle scripts for relevant trust boundaries; linked text follows the manifest.", "measurable": true}, {"id": "AC-SEC-006", "requirement": "REQ-SEC-003", "description": "Every finding records stable ID, rule/source path/line, sanitized evidence, severity, confidence, exploit preconditions, disposition, rationale and owner. False positives require local evidence and QC review; no blanket baseline suppression.", "measurable": true}, {"id": "AC-SEC-007", "requirement": "REQ-SEC-002", "description": "Synthetic secret controls confirm logs and retained SARIF/Markdown contain no secret text, matched source snippets or private absolute paths. Publish only allowlisted fields and retain hashes of private raw outputs without committing them.", "measurable": true}, {"id": "AC-SEC-008", "requirement": "REQ-SEC-002", "description": "Before/after hashes prove source, main, installed harnesses and existing unrelated work remain unchanged by the scan; cleanup addresses only recorded ephemeral resources.", "measurable": true}, {"id": "AC-SEC-009", "requirement": "REQ-SEC-003", "description": "s08 maps all ACs to evidence and residual gaps. Critical/high findings have proposed separate remediation scope and owner. QC DoD plus PO business acceptance are explicit; neither the parent audit nor product security is declared closed merely because scanning completes.", "measurable": true}]
```
