# Known issues

Things that look wrong on purpose, or are wrong and already known. Check here before "fixing" anything.

## Open

| Area | Issue | Impact | Owner / next step |
|---|---|---|---|
| Tokens, Light | `color/interactive/neutral/subtle/{text,icon}/{hover,active,selected}` = `neutral/100` on a `neutral/100` background (invisible). | Lint warns (6 warnings). Avoid `neutral` + `subtle` with text in these states. | Product team: Light values are frozen. |
| Tokens, Input | `color/input/border/invalid-focus` aliases `interactive/danger/solid/border/default` = dark red at 16 % in Light (`#47151529`), 12 % in Dark, so the invalid focused field loses its red border (the red focus ring still shows). | Input renders it as in Figma. | Designer: kept for now (2026-11-07), will revise later. |
| Tokens, Light contrast | axe `color-contrast` fails (< 4.5 : 1 for 11–14 px text) on: white text on `success` (3.0), `danger` (3.75), `secondary` (3.9) solid; intent text on `*-subtle` / transparent backgrounds (`primary` 3.7, `secondary` 3.2, `success` 2.5, `warning` 2.4, `danger` 3.0); `accent` hover/active text (4.4 / 3.4); `input/addon/text/invalid` on `input/addon/bg/invalid` (3.3). Dark passes. | Button, IconButton, Badge (subtle), Input addon fail WCAG AA in Light. Components use the tokens correctly. | Product team: Light values are frozen; decide whether to darken. |
| Components vs Figma | Button `primary-subtle` hover stacks `surface/default` under the fill; default and active do not. Code uses the fill alone in every state. | Hover looks slightly different over non-white backgrounds. | Designer: remove the surface layer in Figma. |
| Badge | `variant=dot` is 6 × 6 px; no size token that small (`spacing/icon/2xs` = 12 px), and no obvious place for one in the size grammar. Code uses Tailwind `size-1.5`. Badge border is a centre stroke in Figma; code draws it inside (≤ 0.5 px difference). | Raw size in one place. | Designer: left as is for now (2026-11-07). |
| Icon library | Icon layers bind stroke widths to `stroke/stroke/regular` and `stroke/stroke/secondary`, and `more-verticale` uses fill style `LIGHT/neutral/neutral-70`, all from an old library not available in Components. The `dissmiss` icon name has a typo. | No visual effect today; Dev Mode shows old names. | Fix in the icon library (rebind or remove). |
| Input | In `focused` / `invalid-focused` the caret sits 10 px after the text, and after the placeholder in empty fields. | Mockup only; the browser draws the caret. | Designer. |
| Button group | Solid groups: the divider is the button's own border (subtle). A stronger divider needs a `color/button-group/divider/{intent}` token. | Visual decision. | Designer. |
| Tokens | `duration/*`, `ease/*`, `z-index/*` are starting values. `font/code` equals the UI font. | Review before release. | Designer + developers. |
| Tokens | Data-visualisation palette not defined yet. | Charts have no tokens. | Planned. |
| Figma | Tokens-TW (`2OtOKYGduLamfGuLCWL4MA`) is an outdated copy. | Confusion. | Delete or archive. |

## Not bugs

- **Tag** `size=xs` has no icon slot; only `size=sm` takes an icon (designer decision 2026-11-07). In code `icon` is ignored at xs.
- **Spinner** `spin` layers have black strokes without a token. The stroke is the arc's geometry inside a boolean shape; the colour comes from the boolean fill. Removing it makes the spinner disappear.
- **Tag** has 192 of 320 variant combinations: `interactive=false` has only `state=default`.
- **Button / IconButton** `variant` lists are uneven on purpose (not every intent has every emphasis).
- **Lint warnings** for the Light `neutral/subtle` pairs above are expected until the product team changes them.
