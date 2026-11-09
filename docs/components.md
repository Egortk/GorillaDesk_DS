# Components

Figma file **Components** `ZGgeVYWW1borOyeuljsfS4`. Mapping to code: `packages/ui/component-manifest.json`.

## The gate: Ready for dev

A component set marked **Ready for dev** in Figma is finished and may be implemented. Anything else is work in progress: do not implement it, do not copy from it.

When a ready component changes, Figma marks it **Changed**. Use Dev Mode → *Compare changes* to see the diff, update code and the manifest, then the designer marks it ready again.

Ready for dev today (2026-11-07): Button, IconButton, Spinner, Badge, DismissButton, Lozenge, Tag, Input, `_addon` (internal part of Input).
Not ready: Avatar (Customer / User / Branch / Counter), Avatar Group, Button Group.

All ready sets are implemented in `packages/ui/src/components` (status `draft` in the manifest until the definition of done passes; open items in `docs/known-issues.md`).

## Conventions

### Names
- Component sets: PascalCase, same name as the React component (`IconButton`).
- Internal building blocks start with `_` (`_addon`). They are not exported from the package.
- Layers: role-based kebab-case (`label`, `start-icon`, `icon-wrapper`, `dismiss-button`). No default names (`Frame 12`, `Rectangle 4`).

### Properties = props
- Property names are camelCase and equal the prop name: `variant`, `size`, `intent`, `emphasis`, `startIcon`.
- Variant values are the literal values used in code: `size="sm"`, `variant="danger-subtle"`.
- Boolean slot toggles are `has*` (`hasStartIcon`, `hasIcon`, `hasStartAddon`, `hasPlaceholder`). In code there is no such prop: the slot is shown when its prop is passed. The manifest records this as `enabledBy`.
- `label` / `count` text properties become `children` unless the manifest says otherwise.
- Every exception lives in the manifest. If a Figma property has no clear prop, it is a manifest decision, not a guess.

### Variant axes
- **Button, IconButton** use one `variant` axis (`default`, `default-subtle`, `primary`, `primary-subtle`, `secondary`, `secondary-subtle`, `subsidiary-subtle`, `accent`, `success`, `danger`, `danger-subtle`). The set is intentionally uneven: not every intent has every emphasis.
- **Badge, Lozenge, Tag** use `intent` × `emphasis` (`solid` | `subtle`) and cover the full matrix.

### States
| Figma `state` | In code |
|---|---|
| `default` | nothing |
| `hover`, `active`, `focused` | CSS only, from React Aria data attributes (`data-hovered`, `data-pressed`, `data-focus-visible`) |
| `selected` | `isSelected` (toggle-type components) |
| `disabled` | `isDisabled` |
| `loading` | `isPending` (Button, IconButton) |
| `readonly` | `isReadOnly` |
| `invalid` | `isInvalid` |
| `invalid-hover`, `invalid-focused` | `isInvalid` + the CSS state |

The focus state is named `focused` everywhere. Figma shows the focus ring with the effect style `shadow/interactive-focus` (or `shadow/interactive-focus-invalid` for invalid fields); in code use `data-focus-visible:shadow-interactive-focus`.

### Bindings
Everything visual is bound in Figma: fills and strokes to colour tokens, padding and gap to `space/*`, radius to `radius/*`, stroke width to `border-width/*`, sizes to `spacing/control/*` and `spacing/icon/*`, text to text styles, shadows to effect styles. A raw value in a ready component is a bug in Figma, not a value to copy.

Exception: an unused `gap` on a frame with a single child is set to 0 and ignored.

### Icons
- Icons are swapped with an INSTANCE_SWAP property (`icon`, `startIcon`, `endIcon`). In code they are React components passed as props, drawn with `currentColor` and sized by the parent (`size-icon-md`).
- The icon library currently binds its own stroke widths to variables from an old library (`stroke/stroke/*`). Ignore those values; see `docs/known-issues.md`.

### Groups
Button group and input group join items by overlapping borders, not by a coloured gap:
- container: no fill, no border, no clip; gap `space/overlap/md` (−1 px);
- items keep their own border; outer corners come from the first and last item (`radius/md`), inner corners are 0;
- in code: `ms-(--space-overlap-md)` on every item but the first, `first:rounded-s-md last:rounded-e-md`, and `relative z-10` on the focused, pressed or invalid item so its full border shows.

Solid (filled) groups may need a stronger divider than their own border. If so, add a 1 px divider element coloured by a component token `color/button-group/divider/{intent}` (fill scope). Not decided yet.

### Descriptions
The Components file has a **Read me** page (first page) with these conventions for designers and Dev Mode.

Every component set has a description in this format (Dev Mode shows it):

```
Purpose: one sentence.
Use for: concrete cases.
Do not use for: the case and which component to use instead.
Code: <Component prop="value">…</Component>
```

## Definition of done (per component)

- Figma properties match props (manifest check passes).
- Every Figma state exists in Storybook.
- axe reports no violations.
- `compare-component` (Figma ↔ React) shows no differences.
- Manifest entry status changed from `draft` to `ready`.
- A developer approved the PR.

## Component notes

| Component | Figma | Notes |
|---|---|---|
| **Button** | `22:2020`, 132 variants | Icons are 24 px (`spacing/icon/md`) in both sizes. `loading` variants contain a Spinner; check the Figma variant for what stays visible. |
| **IconButton** | `23:6385`, 132 variants | Same variants as Button. `aria-label` is required in code. |
| **Spinner** | `22:2139`, 6 variants | `variant`: `on-solid` (inside solid fills), `on-subtle`, `neutral`. The arc is a stroked ellipse inside a boolean shape: the stroke *is* the geometry, its colour comes from the boolean fill. In code: an SVG arc with `stroke="currentColor"`. |
| **Badge** | `35:8483`, 32 variants | `variant`: `count` or `dot`. `count` text → `children`. |
| **DismissButton** | `45:10314`, 20 variants | `shape`: `square` / `circle`. `aria-label` is required. Used inside Tag. |
| **Lozenge** | `44:8566`, 32 variants | Read-only status label. No states. |
| **Tag** | `50:10801`, 192 of 320 combinations | `interactive=false` has only `state=default` (intentional). `removable` → shows DismissButton; in code `onRemove`. Open: does `size=sm` support an icon (see known issues). |
| **Input** | `104:149`, 32 variants | `variant`: `box` (standalone) or `inline` (table cell, input-group item: no radius, no shadow). `filled` is a Figma-only axis: in code it follows the value. Addons come from `_addon`. |
| `_addon` (internal) | `104:31`, 8 variants | `variant` `box`/`inline`, `position` `start`/`end`, `state` `default`/`invalid`. Has a border only on the side facing the field. |
