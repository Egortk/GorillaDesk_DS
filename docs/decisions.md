# Decisions

Newest first. One line per decision: what, and why. Add to the top.
Entries dated 2026-11-05 to 2026-11-07 were reconstructed from the setup sessions; their dates are approximate within that range.

| Date | Decision | Why |
|---|---|---|
| 2026-11-07 | GitHub Actions CI: verify job (tokens up to date, typecheck, build, Storybook) and a Chromatic job that skips without the secret. Actions pinned to exact versions. | Catches hand-edited generated files and broken builds on every PR; Chromatic can be switched on later by adding the secret. |
| 2026-11-07 | Token sync from Figma: `interactive/neutral/subtle/bg/disabled` Light `neutral/500` → `neutral/50` (fixes the known issue); Input addon colours move to opaque `interactive/*/subtle` tokens; `input/border/focus` → `subtle/border/default`; `input/border/invalid-focus` → `danger/solid/border/default` (open question in known-issues). | Synced at the designer's request. The one semantic Light change still needs product team sign-off before the package ships. |
| 2026-11-07 | Storybook has a **Tokens** section (colours, size, typography, effects and motion) rendered from `tokens.flat.json` and `text-styles.json`. Colour pages show Light and Dark side by side; text and icon colours are drawn on the bg token of the same group. | The pages update with every token sync without hand edits, and Chromatic catches visual token changes. |
| 2026-11-07 | Chromatic for visual tests: CLI `chromatic` + `@chromatic-com/storybook` addon, config in `packages/ui/chromatic.config.json` with TurboSnap. Token only via `CHROMATIC_PROJECT_TOKEN`. | Visual review of every story without our own screenshot infra; the addon lets the designer run tests from Storybook without a token. |
| 2026-11-07 | Git initialised on `main`; generated token files are committed. | Token syncs are reviewed as diffs of `tokens/` and `dist/` (workflow step 4). |
| 2026-11-07 | Figma access goes through the claude.ai Figma connector (OAuth), not a personal access token. | Already signed in with the GorillaDesk Pro seat; no secret to store. |
| 2026-11-07 | `packages/ui` is set up by hand (not `npm create storybook`): Vite 8 library mode, Storybook 10 `react-vite` with addons docs, a11y, themes. Theme switching uses `withThemeByDataAttribute` on `data-theme`. | Only what we need, no starter files. `data-theme` is the only theming mechanism (CLAUDE.md rule 6). |
| 2026-11-07 | TypeScript 7. Declarations come from `tsc -p tsconfig.build.json`, not `vite-plugin-dts`. Storybook docgen is `react-docgen`, not `react-docgen-typescript`. | TypeScript 7 (native compiler) has no classic JS API, which `vite-plugin-dts` and `react-docgen-typescript` need. If prop tables in Docs turn out too poor, fall back to TypeScript 6 for those tools. |
| 2026-11-07 | Node 22 is pinned with `.nvmrc` and `engines: >=22.12`. Scripts resolve their own folder with `fileURLToPath(import.meta.url)`, not `new URL(...).pathname`. | 22.12 is the minimum for current Vite and Storybook. `.pathname` keeps `%20` for spaces in the repo path (`Claude Work Enviroment`), so it broke the token pipeline. |
| 2026-11-07 | Figma property names are camelCase and equal the React prop; slot toggles are `has*`. | One naming system for Figma, the manifest and TypeScript; no mapping table for ordinary props. |
| 2026-11-07 | Focus state is named `focused` in every component (Input used `focus`). | Consistent state names across sets. |
| 2026-11-07 | Icon size inside Button/IconButton is bound to `spacing/icon/md`. | Replaced `size/regular` from the old library; same 24 px. |
| 2026-11-07 | Groups join items with a −1 px overlap of their own borders (`space/overlap/md`), not a 1 px gap over a coloured container. | With a gap, an invalid or focused item shows its state on 3 sides only; alpha border colours composite differently as a fill; hover cannot change a container-owned line. Same approach as Bootstrap and Tailwind UI. |
| 2026-11-07 | `space/overlap/md` (−1 px) is a semantic token aliasing primitive `dimension/-1`; lint enforces it equals −`border-width/md`. | Figma variables cannot express "minus another variable"; the invariant lives in the build. |
| 2026-11-07 | `space/overlap/*` and `border-width/*` stay in px in CSS. | They must cancel exactly at any root font size. |
| 2026-11-07 | A value needed outside its token's scope gets a component token alias with the right scope; semantic scopes are never widened. | Keeps semantic pickers clean; the component layer exists for role-specific use. |
| 2026-11-07 | Effect style `shadow/interactive-focus-invalid` added, not yet applied to Input. | Applying it changes the Light look of invalid-focused fields: product decision. |
| 2026-11-07 | Dark theme redesigned (surfaces, solid text, subtle scale, faint text, shadows); Light unchanged. | Dark had contrast failures; Light ships in the product and is frozen. |
| 2026-11-07 | Light token values are frozen without product team approval. | They are live in the product; visual changes need sign-off. |
| 2026-11-07 | `selected` state added to every interactive token, starting equal to `active`; `color/focus/invalid` added. | Tabs, toggles and selected rows need a state; invalid fields need their own ring. |
| 2026-11-07 | Padding/gap tokens renamed `spacing/*` → `space/*`; `spacing/*` keeps only `control/*` and `icon/*`. | Tailwind v4 named spacing keys override `max-w-*` and `leading-*` (tailwindlabs/tailwindcss#18042, #19722). |
| 2026-11-07 | Token output: primitives and `alpha/*` are not emitted; semantic colours are resolved values; component tokens and shadows reference semantic vars. | Hidden in Figma = hidden in code; references keep components theme-aware. |
| 2026-11-07 | Dark = `data-theme="dark"` on any element; themed and dependent tokens are redeclared in the dark block. | Vars resolve where defined; a dark subtree would otherwise inherit light component colours. |
| 2026-11-07 | Tailwind defaults for colour, font, weight, radius, text, ease, shadow are reset. | Only system tokens are available; no `bg-red-500` drift. |
| 2026-11-06 | Token library rebuilt in place to the Tailwind-namespace structure (`color/*`, `spacing/*`, `radius/*`, `text/*`, `font/*`, `font-weight/*`, `ease/*`, `shadow/*`). | Names map 1:1 to Tailwind v4 theme variables; renaming in place kept every binding in Components. |
| 2026-11-06 | Colour + separate opacity token (`alpha/*`) for transparent colours. | One colour ramp, opacity tuned per mode; DTCG 2025.10 `$ref` expresses it. |
| 2026-11-06 | Variant values are renamed in Figma to code values instead of mapping them in the manifest. | Fewer exceptions; designers and code read the same words. |
| 2026-11-06 | No Code Connect; a JSON manifest maps Figma components to code. | Figma Pro plan. |
| 2026-11-05 | Figma Tokens is the source of truth for token values; the DTCG files in the repo are generated. | Supersedes the earlier plan "DTCG in repo, Figma synced from it": the designer works in Figma and owns the values. |
| 2026-11-05 | The old product is not touched; everything is built on the new system. | Supersedes the plan to map ~240 old CSS variables. |
| 2026-11-05 | React Aria Components for behaviour and accessibility; Tailwind v4 for styling. | Accessible primitives with full styling control. |
