# Workflow

## Who owns what

| Designer (Yehor) | Developers |
|---|---|
| Tokens and Figma libraries | Building and wiring the package into the product |
| Component API, states, documentation | Code and architecture review |
| React components, Storybook, prototypes (with Claude Code) | Data and business logic integration |
| Visual and accessibility acceptance | Removing old CSS, production release |

## Flow

```
Figma Tokens ──publish──► Figma Components ──Ready for dev──► packages/ui (React)
     │                                                    ▲
     └──export (use_figma)──► packages/tokens ──build──────┘  (CSS variables + Tailwind theme)
```

There is no automatic two-way sync of components. Tokens sync Figma → code through DTCG. Components go Figma → code through the manifest and Claude Code. Code → Figma changes go through an audit (`compare-component`) and a human decision.

## Token sync (Figma → code)

Skill: `sync-tokens` (`skills/sync-tokens/SKILL.md`). Steps:

1. In Figma Tokens, run `packages/tokens/scripts/figma/export-base.js` with `use_figma`; save the result as `packages/tokens/raw/export1.txt`.
2. Run `packages/tokens/scripts/figma/export-semantic-color.js` three times (`PART = 0, 1, 2`); join the lines after the first two of each result into `packages/tokens/raw/semantic-color.txt`.
3. `npm run tokens -w @gorilladesk/tokens` (convert → lint → build → compile the Tailwind test page).
4. Review the diff of `tokens/` and `dist/`. Light values must not change unless the product team approved it.
5. Commit with the Figma version name in the message.

The lint must pass with 0 errors. Known warnings are listed in `docs/known-issues.md`.

## Implementing a component

Skill: `implement-component` (`skills/implement-component/SKILL.md`). Order:

1. Check the set is **Ready for dev** and has a manifest entry.
2. Read the Figma set (properties, variants, bindings) and the manifest entry.
3. Build the component on React Aria + tokens. Props from the manifest; no hex, no primitives, no raw px for anything that has a token.
4. Stories for every Figma state; axe; `compare-component`.
5. Set the manifest status to `ready`; add a line to `docs/decisions.md` for anything decided on the way.

## Changing a ready component

1. Designer edits the set in Figma; Figma marks it **Changed**.
2. Dev Mode → *Compare changes* shows what moved.
3. Update the code, stories and manifest; re-run the checks.
4. Designer marks it Ready for dev again.

## Releases

- Publish the Tokens library with a named version (e.g. `tokens 1.3.0 — focus invalid style`). Use the same number for `@gorilladesk/tokens`.
- Prototypes and the product use the same package. There are no prototype-only components.

## Visual tests (Chromatic)

- Chromatic snapshots every Storybook story (light and dark via the theme toolbar) and shows visual diffs for review.
- Config: `packages/ui/chromatic.config.json` (TurboSnap `onlyChanged`, `exitZeroOnChanges`). The project token is a secret: keep it in the `CHROMATIC_PROJECT_TOKEN` environment variable (shell profile or CI secret), never in a file in the repo.
- Run: `CHROMATIC_PROJECT_TOKEN=… npm run chromatic`. Or from Storybook: the **Visual tests** panel (`@chromatic-com/storybook`) signs in with your Chromatic account, no token needed.
- Accepting a change in Chromatic makes it the new baseline. A change to a Light visual needs product team approval first.

## Published Storybook

- https://egortk.github.io/GorillaDesk_DS/ — public, no sign-in. Share this link with the team.
- `.github/workflows/storybook-pages.yml` rebuilds it on every push to `main` and pushes the build to the `gh-pages` branch, which GitHub Pages serves. It can also be run by hand (Actions → Storybook on GitHub Pages → Run workflow).

## Git

- Repository: `github.com/Egortk/GorillaDesk_DS`. Branch `main`; work goes through pull requests from feature branches.
- Commit messages for token syncs carry the Figma version name.
- CI (`.github/workflows/ci.yml`) runs on every PR and on `main`: tokens rebuilt from `raw/` must equal the committed files, then typecheck, package build and Storybook build. A second job runs Chromatic when the repository secret `CHROMATIC_PROJECT_TOKEN` is set (otherwise it is skipped with a notice).
- Not committed: `node_modules`, `storybook-static`, `packages/ui/dist`, `.env*`, `.claude/settings.local.json`. Generated `packages/tokens/{tokens,dist}` are committed so diffs show token changes.

## Figma rules for agents

- `create_session` first; load `figma-use` before `use_figma`; read-only scripts unless a change was agreed.
- A script that throws rolls back fully; check `safeToRetryWithoutCanvasRead` before retrying.
- Variable renames keep bindings (bindings are by key). Deleting a variable breaks them.
- Never edit Light values; never widen a semantic scope (add a component token instead).
- Verify visually before removing anything that looks unused (example: the Spinner arc is a stroke that defines geometry).
