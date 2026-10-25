# Request and result contract v1

Required request keys: requesting_role (SA|TA), audience_profile
(AUD-BUSINESS|AUD-ENGINEERING), declared_question, canonical_model_ref,
canonical_view_ref, source_fact_ids, destination_ref, requested_formats,
presentation_artifact_id and render_owner (`diagram-design-presentation-adapter`).
Unknown fields are rejected, including content, HTML, URL, instruction and dependency overrides.
All three formats HTML/SVG/PNG are mandatory. Presentation IDs must be distinct from model,
view and fact IDs; canonical and presentation owners must differ.

The executable boundary reads local JSON serializations of the existing architecture model
and view contract. JSON is a YAML-compatible serialization, not a new canonical format.
For a DSL source, architecture-modeling must supply its validated, lossless model projection;
the adapter does not parse arbitrary DSL/YAML or infer facts. The model file contains
architecture_model and gaps; the view contains view_id, source_fact_ids, render_owner,
render_format and artifact_path. The existing canonical artifact must exist locally.
Keep all model fields, ownership, boundaries, constraints, evidence and direction in the
projection. BLOCK_MODEL/BLOCK_RENDER gaps reject the derivative. ANNOTATE gaps stay visible.

Caller context is separate: project_root, explicit write_roots and change004_verified=true.
This assertion comes from the workflow caller's verified baseline, not an untrusted request.
Paths are project-relative, without symlinks, traversal or URLs. Destination is a new directory
strictly under a write root with an existing parent; no overwrite or canonical collision.

`node scripts/validate-request.js request.json context.json` performs read-only preflight.
An ACCEPTED preflight has empty output/evidence refs until export succeeds. Final ACCEPTED
includes presentation_artifact_id, render_owner, canonical_source_ref, canonical_view_ref,
audience_profile, declared_question, source_fact_ids, output_refs and validation_evidence_refs.
REJECTED includes rejection_reasons, blocking_input_refs and empty output/evidence refs.
The CLI exits nonzero on rejection. Every call verifies actual pinned upstream bytes.

Missing model/view, incomplete/duplicate/unknown facts, unresolved/duplicate owner or ID,
invalid destination, invented content, unsupported formats, URL/active-content requests,
provenance mismatch and unverified CHANGE-004 overlap fail before output publication.
No self-contained request can approve a gate or grant its own file-system scope.
