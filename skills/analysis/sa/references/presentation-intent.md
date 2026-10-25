# Presentation intent handoff

SA/TA record intent only at s01-s04. They do not select a renderer, draw a diagram,
choose a solution or emit a canonical model. No new top-level output schema field.
Use invocation.directives_parsed to preserve the requesting role (SA|TA), audience
(AUD-BUSINESS|AUD-ENGINEERING) and optional presentation request; use
landscape.question_answered for the declared question. Keep landscape.produced_by
as architecture-modeling. Put downstream constraints in handoff.to_dev.items;
put acceptance/reader concerns in handoff.to_qc.items. Existing ownership rules apply.

At s05, architecture-modeling validates the canonical model/view and render_plan first.
Only then may it assemble an optional diagram-design-presentation-adapter request with
canonical_model_ref, canonical_view_ref, complete source_fact_ids, distinct ID/owner,
all HTML/SVG/PNG formats and a separately granted destination. The adapter has no
canonical rendering authority. Missing/disabled/rejected adapter leaves canonical output valid.
Never infer a grant, facts, owner or gate approval from the presentation request.
