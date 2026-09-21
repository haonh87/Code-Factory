# Code-Factory language review

Pinned source: `5b85d7f943fff4fc9e0f559faed43e79f9483b12`; evidence tier: unmerged-child.

M7 prose scoring has not run. UTF-8 validity is not a naturalness score. AI recommendations and human BA/QC decisions will be recorded separately.

## Deterministic skill sample

Rule: min(group size, max(2, ceil(group size/4))), sorted canonical path; add every newly discovered high-risk wording surface. M2 still reviews all 42 source skills semantically.

| Group | Size | Initial EN/VI pairs | Selected skills |
| --- | --- | --- | --- |
| analysis | 6 | 2 | brainstorming, product-thinking |
| architecture | 5 | 2 | architecture-modeling, database-design |
| delivery | 16 | 4 | branch-finish-discipline, ci-cd-release, code-scan-review, containerization-packaging |
| guardrails | 8 | 2 | artifact-governance, definition-of-done-gate |
| notebooklm | 1 | 1 | notebooklm |
| obsidian | 3 | 2 | json-canvas, obsidian-bases |
| orchestration | 3 | 2 | codex-workflow-chain, goal-griller |

Total initial detailed sample: 15 pairs. Missing translations are explicit gaps, not excluded samples.

## Mandatory coverage and rubric

Review 100% of root README/docs navigation, EN/VI quickstart/onboarding/positioning, router/backbone/human-gate instructions and user-facing CLI help/approval/error/status messages. Per-unit dimensions: clarity, naturalness, next action, terminology and role/gate relevance.

First require zero critical authority/action failure. PASS also requires mean >=4.0/5 and every dimension of every reviewed unit >=3.0/5. No scores or human verdicts are fabricated before review.
