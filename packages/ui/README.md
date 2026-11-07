# @gorilladesk/ui

React components of the GorillaDesk design system.

- `component-manifest.json` maps every Figma component (Components file `ZGgeVYWW1borOyeuljsfS4`) to its React component and props. It replaces Code Connect.
- Implement only components marked **Ready for dev** in Figma. Process: `docs/workflow.md` → Implementing a component, and `skills/implement-component`.
- Styling: Tailwind v4 with `@gorilladesk/tokens/tailwind.css` (imported by `src/styles.css`). Behaviour: React Aria Components.

## Stack

React 19 · TypeScript 7 · Vite 8 (library mode) · Storybook 10 (`@storybook/react-vite`, addons: docs, a11y, themes). Node 22 (`.nvmrc` at the repo root).

## Layout

```
src/index.ts                          public exports
src/styles.css                        Tailwind + tokens; consumers import "@gorilladesk/ui/styles.css"
src/components/<Name>/<Name>.tsx      one folder per component, story next to it
src/docs/tokens/                      Storybook "Tokens" pages, generated from @gorilladesk/tokens dist (not exported)
.storybook/                           main.ts, preview.tsx (data-theme switcher), preview.css
```

## Commands

```bash
npm run storybook -w @gorilladesk/ui        # dev server on :6006
npm run build-storybook -w @gorilladesk/ui  # static Storybook → storybook-static/
npm run build -w @gorilladesk/ui            # vite build + tsc declarations → dist/
npm run typecheck -w @gorilladesk/ui
```

The theme toolbar sets `data-theme` on `<html>`. The a11y panel runs axe on every story (`a11y.test: 'error'`).
