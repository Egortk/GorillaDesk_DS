# Known issues

Things that look wrong on purpose, or are wrong and already known. Check here before "fixing" anything.

## Open

| Area | Issue | Impact | Owner / next step |
|---|---|---|---|
| Tokens, Light | `color/interactive/neutral/subtle/{text,icon}/{hover,active,selected}` = `neutral/100` on a `neutral/100` background (invisible). | Lint warns (6 warnings). Avoid `neutral` + `subtle` with text in these states. | Product team: Light values are frozen. |
| Tokens, Input | `color/input/border/invalid-focus` aliases `interactive/danger/solid/border/default` = dark red at 16 % in Light (`#47151529`), 12 % in Dark, so the invalid focused field loses its red border (the red focus ring still shows). | Input renders it as in Figma. | Designer: kept for now (2026-11-07), will revise later. |
| Tokens, Light contrast | axe `color-contrast` fails (< 4.5 : 1 for 11–14 px text) on: white text on `success` (3.0), `danger` (3.75), `secondary` (3.9) solid; intent text on `*-subtle` / transparent backgrounds (`primary` 3.7, `secondary` 3.2, `success` 2.5, `warning` 2.4, `danger` 3.0); `accent` hover/active text (4.4 / 3.4); `input/addon/text/invalid` on `input/addon/bg/invalid` (3.3); `field/helper/invalid` error text on white (3.75). Dark passes. | Button, IconButton, Badge (subtle), Input addon, CustomerAvatar initials, Checkbox / CheckboxGroup error text fail WCAG AA in Light. Components use the tokens correctly. | Product team: Light values are frozen; decide whether to darken. |
| Components vs Figma | Audit 2026-11-07 (every variant, Light and Dark, Figma bindings vs computed styles in Storybook): IconButton `success` disabled icon still uses `…/icon/default` (Button was fixed); `primary-subtle` stacks `surface/default` under the fill in Button hover and IconButton hover + active (code: fill alone). No visual effect: Button/IconButton `success` and `danger` hover/active text and icon bind `…/default` (same values as hover/active). Lozenge `sm` is 1.7 px narrower in the browser (text rendering; size, line height, weight and tracking match). | Small differences only. | Designer: fix IconButton success/disabled icon and the primary-subtle surface layer. |
| Badge | `variant=dot` is 6 × 6 px; no size token that small (`spacing/icon/2xs` = 12 px), and no obvious place for one in the size grammar. Code uses Tailwind `size-1.5`. Badge border is a centre stroke in Figma; code draws it inside (≤ 0.5 px difference). | Raw size in one place. | Designer: left as is for now (2026-11-07). |
| Icon library | Icon layers bind stroke widths to `stroke/stroke/regular` and `stroke/stroke/secondary`, and `more-verticale` uses fill style `LIGHT/neutral/neutral-70`, all from an old library not available in Components. The `dissmiss` icon name has a typo. | No visual effect today; Dev Mode shows old names. | Fix in the icon library (rebind or remove). |
| Input | In `focused` / `invalid-focused` the caret sits 10 px after the text, and after the placeholder in empty fields. | Mockup only; the browser draws the caret. | Designer. |
| Button group | Solid groups: the divider is the button's own border (subtle). A stronger divider needs a `color/button-group/divider/{intent}` token. | Visual decision. | Designer. |
| Tokens | `duration/*`, `ease/*`, `z-index/*` are starting values. `font/code` equals the UI font. | Review before release. | Designer + developers. |
| Tokens | Data-visualisation palette not defined yet. | Charts have no tokens. | Planned. |
| Figma | Tokens-TW (`2OtOKYGduLamfGuLCWL4MA`) is an outdated copy. | Confusion. | Delete or archive. |
| Avatar, Figma | The `size` values of CustomerAvatar, UserAvatar, BranchAvatar and `_avatarCounter` are listed as `md|lg|xl|sm|xs` in the property panel. The Plugin API cannot reorder variant values. | Cosmetic in Figma; code uses `xs|sm|md|lg|xl`. | Designer: drag the values into order in the `size` property panel. |
| AvatarGroup, tokens | The counter fill `interactive/neutral/subtle/bg/selected` equals `environment/surface/canvas` (both `#e5e5e5` in Light), and so does the canvas ring. On a canvas background the counter has no visible edge, only its text. | `background="canvas"` groups: the counter looks like loose text. | Designer: pick a counter fill that differs from canvas, or accept. |
| BranchAvatar | Figma places the logo image with a small inset (26 × 19 in a 32 circle); code draws `src` with `object-contain` over the whole circle. A wide logo without its own padding can touch the circle edge. | Depends on the logo file. | Decide if the logo needs an inset token, or logos keep their own padding (the Figma sample does). |
| Tokens, contrast | Select placeholder (`color/input/text/placeholder` = `content/neutral/text/faint`) fails axe `color-contrast`: 2.24 : 1 Light, 4.26 : 1 Dark. In Input axe does not check the placeholder attribute, in Select it is real text. | Light is frozen; Dark may be tuned. | Designer + product team. |
| ListBoxItem, Figma | `check` icon inside `_item-select-icon` binds its stroke to `neutral/text-ui-default` and `stroke/stroke/regular` from the old library. The visible mark is the boolean fill (bound correctly). | None in code (path exported as a fill). | Icon library clean-up. |
| ListBoxItem | In `state=disabled` the Badge keeps its normal colours: Badge has no disabled state. | Visual only. | Designer: decide whether a disabled row dims its badge. |
| List (was ListBox), Figma | Created 2026-11-10 by Claude, renamed 2026-11-11; Ready for dev cannot be set through the Plugin API. | Gate not passed yet. | Designer: review and mark Ready for dev. |
| Stories, axe | `landmark-one-main`, `page-has-heading-one`, `region` fire on isolated story pages; `label-content-name-mismatch` (experimental) fires on options with a badge or description and on the inline Select with "+N" (the visible "+2" is `aria-hidden`, the name says "2 more"). | Not component bugs. | — |

## Not bugs

- **Tag** `size=xs` has no icon slot; only `size=sm` takes an icon (designer decision 2026-11-07). In code `icon` is ignored at xs.
- **Spinner** `spin` layers have black strokes without a token. The stroke is the arc's geometry inside a boolean shape; the colour comes from the boolean fill. Removing it makes the spinner disappear.
- **Tag** has 192 of 320 variant combinations: `interactive=false` has only `state=default`.
- **Button / IconButton** `variant` lists are uneven on purpose (not every intent has every emphasis).
- **Lint warnings** for the Light `neutral/subtle` pairs above are expected until the product team changes them.
