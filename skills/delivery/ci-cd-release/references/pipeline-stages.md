---
language: en
---

# Pipeline Stages

> Vietnamese: pipeline-stages.vi.md

## Main Tiers

- `pre-merge`: lint, test, static analysis, build or type check enough to block errors early.
- `build-publish`: build the artifact, image, or package and publish it to a registry/repository.
- `pre-release`: verify the artifact, run policy gates, security or approval checks needed before promotion.
- `post-deploy`: short-term smoke, health, log, metric, or business checks.

## Tool Mapping

- GitHub Actions: event-driven workflows, reusable workflows for build/release when needed.
- GitLab CI: stages/jobs with environment and protected branch/tag controls.
- Jenkins: pipeline scripts or shared libraries, mind credential management.
- Azure DevOps: pipelines + environment approval + release controls.

## Common Rules

- Use caching intentionally; do not cache things that break artifact reproducibility.
- Keep artifact publish separate from the deploy step if the team needs to promote the same artifact across environments.
- If the pipeline modifies runtime artifact files, state the ownership and versioning clearly.