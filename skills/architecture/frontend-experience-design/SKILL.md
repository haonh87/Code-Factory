---
language: en
name: frontend-experience-design
description: Design a frontend experience at the screen, section, component, interaction pattern, UI state, responsive behavior, accessibility baseline, motion rule, and visual direction level before coding. Use when you need to turn a business goal and acceptance criteria into a blueprint for layout, information hierarchy, form behavior, loading/empty/error/success states, navigation patterns, design system constraints, or handoff to `frontend-architecture`, `implementation`, and `testing`.
---

# Frontend Experience Design

> Vietnamese: SKILL.vi.md

Design the frontend experience at the surface and interaction level to lock how screens work before implementation.

## Goal

- Turn the business goal and acceptance criteria into clear decisions at the screen, state, and interaction level.
- Lock layout, information hierarchy, responsive behavior, and feedback rules for each important surface.
- Lock loading, empty, error, success, and blocked states instead of describing only the happy path.
- Set an accessibility baseline, motion rules, and performance guards clear enough that implementation does not guess.
- Produce a clear handoff for `frontend-architecture`, `task-breakdown-planner`, `implementation`, `react-web-implementation`, and `frontend-quality-review`.

## When To Use

- When a new page, screen, route, or flow needs its UI behavior shaped before coding.
- When acceptance criteria are enough for functionality but not clear enough for layout, UI state, feedback, form behavior, or navigation.
- When the same frontend surface must work well across many breakpoints or device types.
- When you need to lock a visual direction usable for delivery, but do not yet need or have a full design file.
- When you need to avoid discovering missing empty states, loading states, keyboard flows, or responsive rules only after implementation.

## Out Of Scope

- Does not replace `frontend-architecture` for module boundaries, route ownership, state ownership, or import boundaries.
- Does not invent brand guidelines, palettes, or visual identity when the input does not have them.
- Does not directly write production code or create pixel-perfect mockups.
- Does not replace user research, usability testing, or business-level product decisions.

## Minimum Input

- `business_goal`
- `acceptance_criteria`
- `frontend_surfaces`
- `primary_users`
- `current_ui_context`
- `design_constraints`

`design_constraints` should state at least:
- the design system or component library in use
- brand/tone if available
- the device mix or important breakpoints
- notable accessibility or performance constraints

If `frontend_surfaces` are missing or the main user outcome is not determined, stop and ask for more clarification.

## Required Output

Emit a YAML artifact using the following schema:

```yaml
experience_target: ""
primary_user_outcomes: []
frontend_surfaces:
  - surface: ""
    purpose: ""
    priority: CORE|SUPPORTING|AUXILIARY
interaction_model:
  entry_points: []
  navigation_rules: []
  primary_actions: []
  secondary_actions: []
  feedback_rules: []
surface_states:
  - surface: ""
    loading: ""
    empty: ""
    error: ""
    success: ""
    blocked: ""
layout_rules:
  information_hierarchy: []
  responsive_rules: []
  density_rules: []
visual_rules:
  tone_keywords: []
  emphasis_rules: []
  color_constraints: []
  typography_constraints: []
  motion_rules: []
accessibility_baseline:
  keyboard_flow: []
  screen_reader_notes: []
  contrast_rules: []
  touch_target_rules: []
performance_guards: []
design_system_hooks: []
validation_checks: []
notes_for_next_step: ""
```

## Meaning Of Each Output

- `experience_target`: the surface or flow whose experience is being designed.
- `primary_user_outcomes`: the outcomes users must reach when interacting with this surface.
- `frontend_surfaces`: the list of important surfaces and their priority.
- `interaction_model`: navigation rules, primary/secondary actions, and feedback rules of the experience.
- `surface_states`: how each surface handles loading, empty, error, success, and blocked states.
- `layout_rules`: hierarchy, responsive, and information density principles.
- `visual_rules`: tone, emphasis, color, typography, and motion at a level sufficient for handoff.
- `accessibility_baseline`: the minimum standard for keyboard, screen reader, contrast, and touch targets.
- `performance_guards`: guards to keep from design onward to avoid slow or janky UI.
- `design_system_hooks`: tokens, components, patterns, or constraints to reuse from the existing design system.
- `validation_checks`: a checklist for `implementation`, `react-web-implementation`, and `frontend-quality-review` to verify later.
- `notes_for_next_step`: handoff notes to `frontend-architecture`, `implementation`, `react-web-implementation`, or `testing`.

## Normalizing Output In A Workflow Note

If this skill's output is saved as a `.md` note in the workflow chain:
- Use the step 5 template in `../codex-workflow-chain/references/workflow-chain.md`.
- Place this skill's YAML schema in the `## Architecture Details` block.
- Keep the field names in the schema unchanged; do not rename fields when writing them into the note.
- Use this skill alongside or right before `frontend-architecture` when the problem needs both screen behavior and source-code boundaries.

## Execution Flow

1. Identify the `experience_target`, `primary_user_outcomes`, and the list of `frontend_surfaces`.
2. Attach each surface to its primary actions, secondary actions, and important feedback points.
3. Write the `interaction_model` clearly enough that implementation knows the entry flow, exit flow, and navigation rules.
4. Lock `surface_states` for every `CORE` surface; do not skip loading, empty, or error states.
5. Write `layout_rules` for hierarchy, responsive behavior, and density rules by usage context.
6. Write `visual_rules` at an enforceable constraint level, not vague descriptions like "look more modern".
7. Record `accessibility_baseline` and `performance_guards` as a mandatory quality floor.
8. List `design_system_hooks` to reuse existing components, tokens, or patterns.
9. Lock `validation_checks` and `notes_for_next_step` for the implement and review steps.

## Quality Rules

- Default to writing and communicating in English.
- Each `CORE` surface must have clear loading, empty, error, and blocked handling, unless there is a good reason.
- Do not use vague descriptions like "good responsive" or "smoother UX"; state concrete rules by breakpoint, density, or interaction.
- Motion is only used to orient, give feedback, or change context; do not add motion only for decoration.
- Do not sacrifice task clarity just to achieve a visual effect.
- If there is no clear brand/tone, prefer neutral, readable, and task-first over inventing a style.
- Store documents as UTF-8 and preserve accented characters in `*.vi.md` supplement files.

## Decision Rule

- Prefer one clear `primary_action` for each viewport or main surface.
- Use progressive disclosure for secondary actions instead of packing many same-level CTAs.
- If a surface is data-heavy and used often, density may increase; if a flow is rare or risky, prefer clarity over density.
- If there are large lists, heavy charts, or large media, record `performance_guards` from the start instead of waiting to optimize.
- If a form can fail or needs confirmation, record the feedback rule and recovery path clearly.
- If the layout differs meaningfully between mobile and desktop, describe the structure change rule, not just the breakpoint.
- If the problem needs module ownership, import boundaries, or state ownership, hand off to `frontend-architecture`.
- If the stack is React web or Next.js and the experience clearly depends on server/client split, loading path, or data-fetching placement, hand off to `react-web-implementation`.

## Completion Conditions

- An `interaction_model` and `surface_states` clear enough that implementation does not guess.
- `layout_rules`, `visual_rules`, and `accessibility_baseline` sufficient for the team to review against one standard.
- `performance_guards` for surfaces at risk of being heavy.
- `validation_checks` and `notes_for_next_step` sufficient to hand off to delivery.