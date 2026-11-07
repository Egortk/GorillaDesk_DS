---
name: implement-component
description: Build or update a React component in packages/ui from a Figma component marked Ready for dev, using the component manifest and design tokens. Use when asked to implement, build, code or update a design-system component.
---

# Implement a component from Figma

Inputs: component name. Sources: Figma **Components** `ZGgeVYWW1borOyeuljsfS4`, `packages/ui/component-manifest.json`, `docs/components.md`, `docs/tokens.md`.

## 1. Check the gate

- The Figma set has `devStatus = READY_FOR_DEV` (read it with `use_figma`: `node.devStatus`). If not, stop and tell the user.
- The manifest has an entry. If not, create one from the Figma set (key, nodeId, every property) and mark unclear mappings with `"todo"`. Ask the user about each `todo` before coding.

## 2. Read the design

- `create_session`, load `figma-use`. With read-only `use_figma` collect: property definitions, variant names, and for each state the bound variables (fills, strokes, padding, gap, radius, stroke width, sizes), text styles and effect styles. Use `get_design_context` / `get_screenshot` for layout and visuals.
- Map every bound variable to its CSS variable / Tailwind class via `packages/tokens/dist/tokens.flat.json` and `text-styles.json`. A raw value in a ready component is a Figma bug: report it, do not copy it.

## 3. Build

- React Aria Components for behaviour; Tailwind v4 classes from `@gorilladesk/tokens/tailwind.css`.
- Props exactly as in the manifest. `has*` booleans are not props: the slot renders when its prop is passed.
- Interaction states from React Aria data attributes: `data-hovered`, `data-pressed`, `data-focus-visible`, `data-disabled`, `data-invalid`, `data-selected`. Focus ring: `shadow-interactive-focus` (invalid fields: `shadow-interactive-focus-invalid`).
- No hex, no primitives, no raw px or rem where a token exists. `space/*` via `p-(--space-md)`, sizes via `h-control-md`, `size-icon-md`.
- Variants with a typed map (e.g. `tailwind-variants` or a plain object) keyed by the Figma variant values.
- Path: `packages/ui/src/components/<Name>/<Name>.tsx`, exported from the package index (internal `_` parts are not exported).

## 4. Verify

- Storybook story per Figma state and per variant axis; light and dark (`data-theme`).
- axe: 0 violations.
- `compare-component` (if available in this workspace) between the Figma set and the story: no differences. Otherwise compare screenshots side by side and list differences.
- Manifest checks: every Figma property is in `props`; every `prop` exists in the TypeScript type; `code.source` exists.

## 5. Finish

- Set the manifest `status` to `ready` only when all checks pass.
- Add a line to `docs/decisions.md` for any decision made (API choice, a `todo` resolved).
- Report: what was built, checks run and their results, open questions.
