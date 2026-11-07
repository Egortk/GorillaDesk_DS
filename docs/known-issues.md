# Known issues

Things that look wrong on purpose, or are wrong and already known. Check here before "fixing" anything.

## Open

| Area | Issue | Impact | Owner / next step |
|---|---|---|---|
| Tokens, Light | `color/interactive/neutral/subtle/{text,icon}/{hover,active,selected}` = `neutral/100` on a `neutral/100` background (invisible). | Lint warns (6 warnings). Avoid `neutral` + `subtle` with text in these states. | Product team: Light values are frozen. |
| Tokens, Input | Since the 2026-11-07 sync `color/input/border/invalid-focus` aliases `interactive/danger/solid/border/default` = dark red at 16 % in Light (`#47151529`), 12 % in Dark. The invalid focused field loses its red border. Before: `content/danger/border/strong`. | Input is not built yet, so nothing renders it today. | Designer: confirm or change in Figma before Input is implemented. |
| Icon library | Icon layers bind stroke widths to `stroke/stroke/regular` and `stroke/stroke/secondary`, and `more-verticale` uses fill style `LIGHT/neutral/neutral-70`, all from an old library not available in Components. The `dissmiss` icon name has a typo. | No visual effect today; Dev Mode shows old names. | Fix in the icon library (rebind or remove). |
| Input | In `focused` / `invalid-focused` the caret sits 10 px after the text, and after the placeholder in empty fields. | Mockup only; the browser draws the caret. | Designer. |
| Input | Effect style `shadow/interactive-focus-invalid` exists but is not applied to `invalid-focused`. | Invalid fields show the neutral focus ring. | Product decision (Light visual change). |
| `_addon` | Not marked Ready for dev. | Input depends on it. | Designer. |
| Tag | Open question: does `size=sm` support an icon? `hasIcon` currently does nothing at that size. | API ambiguity. | Designer. |
| Button group | Solid groups: the divider is the button's own border (subtle). A stronger divider needs a `color/button-group/divider/{intent}` token. | Visual decision. | Designer. |
| Tokens | `duration/*`, `ease/*`, `z-index/*` are starting values. `font/code` equals the UI font. | Review before release. | Designer + developers. |
| Tokens | Data-visualisation palette not defined yet. | Charts have no tokens. | Planned. |
| Figma | Tokens-TW (`2OtOKYGduLamfGuLCWL4MA`) is an outdated copy. | Confusion. | Delete or archive. |

## Not bugs

- **Spinner** `spin` layers have black strokes without a token. The stroke is the arc's geometry inside a boolean shape; the colour comes from the boolean fill. Removing it makes the spinner disappear.
- **Tag** has 192 of 320 variant combinations: `interactive=false` has only `state=default`.
- **Button / IconButton** `variant` lists are uneven on purpose (not every intent has every emphasis).
- **Lint warnings** for the Light `neutral/subtle` pairs above are expected until the product team changes them.
