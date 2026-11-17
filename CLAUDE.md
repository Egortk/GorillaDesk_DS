# GorillaDesk Design System

New design system for GorillaDesk, built from scratch. The old product UI is not touched and not migrated.
Goals: get Figma mockups into code fast, and keep the designer in control of the UI.

Read the doc that matches the task before you start. This file only holds what every session needs.

| Task | Read first |
|---|---|
| Anything with tokens, colors, spacing, type, shadows | `docs/tokens.md` |
| Implementing or changing a component | `docs/components.md`, `packages/ui/component-manifest.json` |
| Syncing from Figma, releasing, process questions | `docs/workflow.md` |
| "Why is it like this?" | `docs/decisions.md` |
| Before reporting a bug or "fixing" something odd | `docs/known-issues.md` |

## Sources of truth

| What | Where | Notes |
|---|---|---|
| Token values and names | Figma file **Tokens** `MQgY3hAxEgE9YUItxgUx6w` | `packages/tokens/tokens/**` is generated from it. Never hand-edit generated files. |
| Component visuals, variants, Figma API | Figma file **Components** `ZGgeVYWW1borOyeuljsfS4` | Only sets marked **Ready for dev** may be implemented. |
| Figma → code mapping | `packages/ui/component-manifest.json` | Replaces Code Connect (Figma Pro plan, no Code Connect). |
| Component API in code | TypeScript types in `packages/ui` | Must match the manifest. |
| Behaviour and accessibility | React Aria Components | |

The Figma file **Tokens-TW** `2OtOKYGduLamfGuLCWL4MA` is an obsolete copy. Do not read from it.

## Stack

React 19 · TypeScript 7 · Vite 8 · React Aria Components · Tailwind CSS v4 · Style Dictionary v5 · W3C DTCG 2025.10 tokens · Storybook 10 · axe.
Node 22 (`.nvmrc`; run `nvm use` first). Packages live under `packages/` (npm workspaces).

## Hard rules

1. **Light theme values do not change** without the product team. They match the shipping product. Dark theme may be tuned.
2. **Token layers:** primitives → semantic → components.
   - Semantic tokens alias primitives only (colors may also take an `alpha/*` opacity).
   - Component tokens alias semantic tokens only.
   - No raw values outside primitives.
   - Primitives and `alpha/*` are hidden: they never appear in CSS or in components.
3. **Use semantic or component tokens in code, never primitives or hex values.** If no token fits, stop and say so. Do not invent one.
4. **A value needed outside its token's scope** (e.g. a border color used as a fill) gets a **component token alias** with the right scope. Never widen a semantic token's scope.
5. **`space/*` is padding and gap, `spacing/*` is element size.** `space/*` lives outside the Tailwind theme on purpose: named `--spacing-*` keys break `max-w-*` (tailwindlabs/tailwindcss#18042). Use `p-(--space-md)`, `gap-(--space-xl)`.
6. **Dark theme** = `data-theme="dark"` on any element; `data-theme="light"` switches a subtree back. Never use `prefers-color-scheme` for theming.
7. **Component props match Figma properties 1:1** (camelCase), except the documented exceptions in the manifest. Boolean slot toggles are `has*` in Figma and become the presence of the slot prop in code.
8. **Interaction states are CSS, not props.** `hover`, `active`, `focused` come from React Aria data attributes / pseudo-classes. `disabled`, `loading`, `readonly`, `invalid` are props (`isDisabled`, `isPending`, `isReadOnly`, `isInvalid`).
9. **Groups (button group, input group)** join borders with a −1 px overlap (`space/overlap/md`), not with a gap over a coloured background. The focused or invalid item is raised with `z-index`. In ButtonGroup the resting shadow is on the group, not on the buttons.
10. **Do not touch generated output** (`packages/tokens/tokens`, `packages/tokens/dist`). Change Figma, then run `npm run tokens -w @gorilladesk/tokens`.

## Commands

```bash
npm run tokens -w @gorilladesk/tokens    # convert raw Figma export → DTCG → lint → build CSS/Tailwind → compile test page
npm run lint   -w @gorilladesk/tokens    # token structure lint only
npm run storybook                        # Storybook dev server on :6006 (packages/ui)
npm run build                            # build @gorilladesk/ui (vite + tsc declarations)
npm run typecheck -w @gorilladesk/ui
npm run chromatic                        # visual tests; needs CHROMATIC_PROJECT_TOKEN in the environment
```

## Skills

`skills/sync-tokens` (Figma → tokens package) and `skills/implement-component` (Figma → React component). Follow their `SKILL.md` when the task matches. To have Claude Code load them automatically, move the folders into `.claude/skills/`.

## Working with Figma (MCP)

- Use the claude.ai **Figma** connector (OAuth as the designer, GorillaDesk Pro plan). No personal access token is needed. The `plugin:figma:figma` server is a duplicate and can stay unauthorised.
- Call `create_session` with the file key before any Figma tool; load the `figma-use` skill before `use_figma`.
- Read component data with `use_figma` (read-only scripts) or `get_design_context`. Figma output is a reference to adapt, not code to paste.
- Before writing to a Figma file, describe the change and get confirmation. Never change Light token values.
- `use_figma` return values are capped at ~48 KB: export large data in chunks.

## Working style

- Plan first, confirm before changes that are hard to undo or touch Figma.
- Evidence over assumptions: check the file, run the build, look at the render.
- Record every non-obvious decision in `docs/decisions.md` (date, decision, why).
