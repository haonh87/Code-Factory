# Offline output and validation

`node scripts/export-svg.js request.json context.json` creates the complete output set.
The context extends request preflight with absolute `png_python` (a separately provisioned
venv interpreter) and `browser_path` (the reviewed Playwright browser cache).
Never install packages or download browsers in this command. The accepted local tuple is
Playwright 1.64.0, greenlet 3.5.6, pyee 14.0.0, typing-extensions 4.16.0 and Chromium
headless shell revision 1248 / version 156.0.8078.4. Other tuples need review and evidence.

The emitter uses closed static HTML and inline SVG templates with escaped canonical fields,
system monospace fonts, accessible title/description, visible NON-CANONICAL PRESENTATION,
canonical references and one presentation owner. Every fact group has data-source-fact-id.
All canonical field labels/values, directed endpoints, state and annotation gaps remain visible.
The initial executable layouts are one or two columns; the programmatic `columns` option
selects either. The validator reconstructs each supported template from validated canonical
facts, so malicious markup or changed visible semantics cannot hide behind a claimed manifest.
It compares source markup, not image pixels. Both layouts pass independently; pixel equality
is never required. Arbitrary handwritten HTML/SVG is outside this closed first release.

Static output permits no script, event handler, external assets, CSS imports or active embeds.
The browser consumes validated HTML using set_content, JavaScript disabled, service workers
blocked, offline context and an abort-all request route. This is browser-context isolation,
not an OS-wide network sandbox. PNG is transparent RGBA and always paired with accessible
HTML/SVG. Canvas limits are width <=1600 and height <=16000; larger views reject rather than
clip facts. Unknown fields stay marked; missing meaningful input must be resolved upstream.

All outputs are built in a private sibling staging directory. Validate before browser launch;
validate output, source digests, dependency and paths again before a single directory rename.
Destination must not already exist. Missing Python/Playwright/browser, launch/export failure,
semantic drift, source change or publication failure returns REJECTED, removes staging and
publishes no partial set. The granted destination parent is a trusted single-writer workspace;
this API is not a security boundary against an adversary concurrently replacing directories.

Final inventory: index.html, presentation.svg, presentation.png, manifest.json. The manifest
binds request identity, audience/question, canonical file hashes, all source_fact_ids, provenance,
output hashes, validation and actual browser evidence. Canonical files remain byte-identical.
READER-TASK-001 is independent human validation, not inferred from automated accessibility
or semantic checks. No invocation approves DoD, Release or Business Acceptance.
