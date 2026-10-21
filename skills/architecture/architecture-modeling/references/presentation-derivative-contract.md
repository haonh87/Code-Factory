# Optional presentation derivative

After canonical model, view, source_fact_ids, destination and exactly-one-owner validation
and canonical rendering succeed, optionally assemble a presentation_derivative request.
Keep the request/result separate from canonical render_plan. The canonical owner and
DRAWIO/MERMAID/STRUCTURIZR_DSL routing never change because a derivative is requested.
Do not count diagram-design-presentation-adapter as a house canonical renderer.

The optional block contains request and result. Request maps existing SA/TA intent to
requesting_role, audience_profile, declared_question, canonical_model_ref,
canonical_view_ref, source_fact_ids, destination_ref, requested_formats (HTML/SVG/PNG),
presentation_artifact_id and render_owner (diagram-design-presentation-adapter).
Provide local validated JSON serialization of the model/view contract; retain all facts,
fields, evidence, constraints and annotation gaps. For DSL, validate the lossless projection
against its source first. Preserve the canonical source and its generated artifact.

Result is ACCEPTED with separate output_refs and validation_evidence_refs, or REJECTED
with rejection_reasons and blocking_input_refs. A missing or disabled adapter emits no
presentation block/artifact; a rejected adapter records reasons, not a replacement model.
All three cases keep canonical bytes, validity and ownership unchanged. Do not add
presentation IDs to canonical render_plan or grant scope from request data. Only invoke
after the verified CHANGE-004 baseline; use the caller's explicit write grants.

Apply the adapter request/result, output and provenance references. It owns derivative
rendering only, not architecture truth or human workflow gates. Independent reader review
and applicable DoD/Release/Business Acceptance remain separate.
