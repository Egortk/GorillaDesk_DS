---
name: sync-tokens
description: Export variables and styles from the Figma Tokens library and rebuild @gorilladesk/tokens (DTCG, CSS, Tailwind). Use when tokens changed in Figma, after a Tokens publish, or when asked to sync, update or rebuild tokens.
---

# Sync tokens from Figma

Source: Figma file **Tokens** `MQgY3hAxEgE9YUItxgUx6w`. Target: `packages/tokens`.

## Steps

1. `create_session` with the Tokens file key. Load the `figma-use` skill.
2. Run `packages/tokens/scripts/figma/export-base.js` with `use_figma` (read-only). Save the returned text exactly as `packages/tokens/raw/export1.txt`.
3. Run `packages/tokens/scripts/figma/export-semantic-color.js` three times with `PART = 0`, `1`, `2`. From each result drop the first two lines (`modes=…`, `DESC …`) and join the rest, in order, into `packages/tokens/raw/semantic-color.txt`. Check the total line count equals `total=` from the first line.
4. If a `DESC` line shows a description not yet handled in `scripts/figma-to-dtcg.mjs` (it re-applies grouped descriptions to `semantic/color`), add it there.
5. `npm run tokens -w @gorilladesk/tokens`. It must end with `0 errors`. Expected warnings are in `docs/known-issues.md`.
6. Review `git diff packages/tokens/tokens packages/tokens/dist`:
   - Any **Light** value change → stop and report it; Light values need product team approval.
   - New or removed tokens → check names against the grammar in `docs/tokens.md`.
   - Renamed tokens → search `packages/ui` for the old CSS variable or Tailwind class.
7. Summarise for the user: counts per collection, added / removed / changed tokens, Light changes (should be none), lint result.

## Do not

- Do not edit `tokens/` or `dist/` by hand; fix the source in Figma or the converter.
- Do not write to Figma in this skill.
- Do not commit unless asked.
