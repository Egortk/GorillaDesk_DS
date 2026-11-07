# @gorilladesk/tokens

Design tokens generated from the Figma library **Tokens** (`MQgY3hAxEgE9YUItxgUx6w`).

```
Figma Tokens ──(use_figma, scripts/figma/*.js)──► raw/*.txt
raw/*.txt ──(npm run convert)──► tokens/**   W3C DTCG 2025.10
tokens/** ──(npm run lint)──► structure checks
tokens/** ──(npm run build, Style Dictionary 5)──► dist/*
dist/tailwind.css ──(npm run test, Tailwind 4)──► test/out.css from test/index.html
```

`npm run tokens` runs all steps. A lint error stops the build. Do not edit `tokens/` or `dist/` by hand.

## Use

```css
@import "tailwindcss";
@import "@gorilladesk/tokens/tailwind.css";
```

Without Tailwind: `@gorilladesk/tokens/tokens.css`. Dark theme: `data-theme="dark"` on any element.

## Output

| File | Content |
|---|---|
| `dist/tailwind.css` | `@theme static` with Tailwind resets, `:root` for tokens outside the theme, dark and light-scope blocks |
| `dist/tokens.css` | The same variables without Tailwind |
| `dist/tokens.flat.json` | `{ name: { type, light, dark, description } }` for docs, the manifest and prototypes |
| `dist/text-styles.json` | Figma text style → classes (`body/md/medium` → `font-ui text-body-md font-medium`) |

## Updating from Figma

1. Run `scripts/figma/export-base.js` in the Tokens file via `use_figma`; save the output as `raw/export1.txt`.
2. Run `scripts/figma/export-semantic-color.js` with `PART = 0, 1, 2` (output limit 48 KB); join the lines after the first two of each result into `raw/semantic-color.txt`.
3. `npm run tokens`; review the diff in `tokens/` and `dist/`.

Raw format: `K;name;T;value[|darkValue];description`. Values: `@alias`, `#hex`, number, JSON string, or `@color~@alpha` for colour + opacity. Effect styles: `E;name;d|i,x,y,blur,spread,@color,@spreadVar|…`. Text styles: `T;name;@family|@size|@lineHeight|@letterSpacing|@weight`.

## Output rules

- Primitives and `alpha/*` are not emitted.
- Semantic colours are resolved values (hex or hex8). Component tokens and shadows reference semantic vars with `var()`.
- Sizes in rem (base 16), except `border-width/*`, `space/overlap/*` (px) and `radius/full` (9999px).
- Fonts get the fallback stack from `pipeline.config.json`.
- Tailwind theme namespaces: `color`, `spacing` (only `control/*`, `icon/*`), `radius`, `text`, `font`, `font-weight`, `ease`, `shadow`, `inset-shadow`. Their Tailwind defaults are reset.
- Outside the theme: `space/*` → `p-(--space-md)`; `border-width/*` → `border-(length:--border-width-md)`; `duration/*` → `duration-(--duration-fast)`; `z-index/*` → `z-(--z-index-modal)`.

## Lint rules

Naming grammar; complete `interactive` (8 intents × 3 emphases × 4 properties × 5 states) and `content` matrices; layer rules (semantic → primitives/alpha only, components → semantic only, alpha → opacity only); no raw values outside primitives; `alpha/*` mirrors the colour path; no `spacing/*` key that collides with Tailwind container sizes; `space/overlap/X` = −`border-width/X`; no text/icon colour equal to its background.

Expected warnings: 6, for the Light `neutral/subtle` pairs listed in `docs/known-issues.md`.
