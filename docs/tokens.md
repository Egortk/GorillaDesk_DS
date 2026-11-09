# Tokens

The Figma file **Tokens** (`MQgY3hAxEgE9YUItxgUx6w`) is the source. It also carries an embedded spec "Design tokens" on its first page. This document is the code-side view of the same rules; `packages/tokens/scripts/lint.mjs` enforces them.

## Collections

| Collection | Modes | Tokens | In CSS |
|---|---|---|---|
| `primitives` | Default | 209 | No (hidden) |
| `semantic/color` | Light, Dark | 747 (incl. 100 `alpha/*`) | Yes, except `alpha/*` |
| `semantic/size` | Desktop | 44 | Yes |
| `semantic/font` | Desktop | 50 | Yes |
| `semantic/motion` | Default | 8 | Yes |
| `semantic/layer` | Default | 9 | Yes |
| `components/color` | Default | 65 | Yes |
| `components/size` | Default | 15 | Yes |

Effect styles (8) and text styles (24) are built from these variables.

## Layers

```
primitives ──► semantic ──► components
 (hidden)       (public)     (public, per component)
```

- **Primitives:** raw values, hidden from publishing. Colour ramps `color/{hue}/{0,50…950,1000}`, `opacity/*`, `dimension/*`, `font/*`, `duration/*`, `easing/*`, `layer/*`.
- **Semantic:** role-based aliases of primitives. The only layer components and product code may use.
- **Components:** aliases of semantic tokens for a single component, when the semantic role does not describe the use (`color/input/border/invalid-focus`). Create one only when it is needed. Never alias a primitive here.

## Colour grammar

| Group | Pattern | Values |
|---|---|---|
| Interactive | `color/interactive/{intent}/{emphasis}/{property}/{state}` | intent: `primary` `secondary` `subsidiary` `accent` `success` `warning` `danger` `neutral` · emphasis: `solid` `subtle` `transparent` · property: `bg` `border` `text` `icon` · state: `default` `hover` `active` `selected` `disabled` |
| Content | `color/content/{intent\|inverse}/{property}/{level}` | level: `strong` `default` `muted` `faint` |
| Environment | `color/environment/surface/*` | `canvas` `sunken` `default` `raised` `overlay` `inverse` |
| | `color/environment/border/*` | `default` `muted` `strong` |
| | `color/environment/scrim/*` | `default` `subtle` |
| | `color/environment/shadow/{N}` | shadow layer colours at fixed opacity steps |
| Focus | `color/focus/{default\|invalid}` | focus ring colours |
| Components | `color/{component}/…` | `button`, `link`, `input`, `field`, `avatar` today |

The interactive and content matrices are complete (lint checks every combination). `selected` starts equal to `active`.

### Colour + separate opacity

Many semantic colours are a primitive colour plus an opacity taken from a hidden `alpha/*` token, e.g.
`color/interactive/primary/transparent/bg/default` = `color/violet/500` at `alpha/interactive/base/transparent/bg/default` (16 %).

- `alpha/*` mirrors the colour path: `alpha/interactive/{base|neutral}/{emphasis}/{property}/{state}`, `alpha/content/{base|inverse}/{property}/{level}`, `alpha/environment/…`, `alpha/focus/…`.
- In DTCG this is a 2025.10 property-level `$ref` (`components` from the colour, `alpha` from the opacity token).
- In CSS it is emitted as a resolved 8-digit hex (`#8d4afc29`). Opacity modifiers (`bg-x/50`) still work.

## Size

| Group | Use | Tailwind |
|---|---|---|
| `space/{2xs…3xl}` | padding, gap inside components | outside theme: `p-(--space-md)`, `gap-(--space-xl)` |
| `space/section/{xs…xl}` | gaps between sections and blocks | outside theme: `gap-(--space-section-md)` |
| `space/overlap/md` | −1 px: joins borders of group items | outside theme, px: `ms-(--space-overlap-md)` on every item but the first |
| `space/overlap/stack/{xs…xl}` | −4 … −12 px: items that overlap by part of their size (avatar group) | outside theme, rem: through a component token, e.g. `ms-(--space-avatar-group-overlap-md)` |
| `spacing/control/{2xs…2xl}` | control heights (16–56 px) | theme: `h-control-md` |
| `spacing/icon/{2xs…2xl}` | icon sizes (12–48 px) | theme: `size-icon-md` |
| `radius/{none,xs…3xl,full}` | corner radius | theme: `rounded-md` |
| `border-width/{none,md,lg,xl,focus}` | stroke widths, focus ring width | outside theme, px: `border-(length:--border-width-md)` |

Why `space` and `spacing` are separate: Tailwind v4 reads named `--spacing-*` keys for `max-w-*` and `leading-*` too, so `--spacing-md` would silently change `max-w-md` (tailwindlabs/tailwindcss#18042, #19722). Only sizes that cannot collide (`control-*`, `icon-*`) live in the theme.

`space/overlap/md` must always equal −`border-width/md` (lint); `space/overlap/stack/*` has no such link. CSS `gap` cannot be negative, so in code it becomes a margin on every item but the first.

Units: px in Figma; rem (base 16) in CSS, except `border-width/*` and `space/overlap/*` without `stack` (px, so borders and overlaps never drift apart at another root font size) and `radius/full` (9999px).

## Typography

- Families: `font/ui` = Inter (CSS adds `system-ui, -apple-system, Segoe UI, sans-serif`). `font/code` is a placeholder equal to the UI font.
- Weights: `font-weight/{light,normal,medium,bold}` = 300/400/500/700.
- Roles: `text/{heading|body|label}-{size}` with `--line-height`, `--letter-spacing` and, for headings and labels, `--font-weight` modifiers. Tailwind: `text-body-md`, `text-heading-lg`.
- Text styles in Figma map to classes: `heading/md` → `font-ui text-heading-md`, `body/md/medium` → `font-ui text-body-md font-medium`, `label/sm` → `font-ui text-label-sm`. Full map: `packages/tokens/dist/text-styles.json`.

## Elevation

| Effect style | Tailwind |
|---|---|
| `shadow/container` | `shadow-container` |
| `shadow/elevation` | `shadow-elevation` |
| `shadow/interactive-default`, `-hover` | `shadow-interactive-default`, `shadow-interactive-hover` |
| `shadow/interactive-focus` | `shadow-interactive-focus` (focus ring: spread `border-width/focus`, colour `color/focus/default`) |
| `shadow/interactive-focus-invalid` | `shadow-interactive-focus-invalid` (ring colour `color/focus/invalid`) |
| `inset-shadow/interactive-active` | `inset-shadow-interactive-active` |
| `shadow/icon-surface` | `shadow-icon-surface` |

Every shadow layer colour is bound to `color/environment/shadow/{N}`, so shadows follow the theme.

## Motion and layers

`duration/{instant,fast,normal,slow}`, `ease/{standard,in,out,in-out}`, `z-index/{base…tooltip}`.
These are **starting values** and were not taken from the old product. Review them before release.
Tailwind: `ease-standard` (theme), `duration-(--duration-fast)`, `z-(--z-index-modal)`.

## Themes in CSS

- Light values sit on `:root` (and `[data-theme="light"]`).
- `[data-theme="dark"]` redeclares every token whose value differs, **plus every token that references one** (component colours, shadows). A custom property defined on `:root` is resolved there, so without the redeclaration a dark subtree would inherit light component colours.
- Tailwind: `@custom-variant dark` targets `[data-theme="dark"]`. Use `dark:` only for exceptions; tokens already switch.

## Dark theme design rules

Dark is not an inversion of Light. The current Dark values follow these rules; keep them when tuning:

- Surfaces step lighter as they rise: canvas `neutral/950`, sunken `neutral/1000`, default `neutral/900`, raised and overlay `neutral/800`.
- Solid buttons use dark text (`neutral/950`) on the lighter Dark solid fills.
- Shadow opacities are roughly doubled compared to Light.
- Every text/background pair passes WCAG AA (4.5:1 text, 3:1 UI and borders), checked over `surface/default`.

## Tailwind theme

`dist/tailwind.css` resets Tailwind's defaults for `color`, `font`, `font-weight`, `radius`, `text`, `ease`, `shadow`, `inset-shadow`. `bg-red-500`, `text-sm`, `shadow-md` do not exist on purpose. Default `--spacing` (the 0.25rem multiplier) and container sizes stay.

## Changing tokens

1. Change the variable in Figma Tokens (Light values: product team approval first).
2. Publish the library; accept the update in Components.
3. Re-export and rebuild (`docs/workflow.md` → Token sync). Review the diff of `tokens/` and `dist/`.
4. Add a line to `docs/decisions.md` if the change is a rule, not just a value.
