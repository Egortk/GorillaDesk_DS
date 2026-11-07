# GorillaDesk Design System

Tokens and React components for the new GorillaDesk UI. Designed in Figma, built with React Aria and Tailwind v4.

| | |
|---|---|
| Figma — Tokens | `MQgY3hAxEgE9YUItxgUx6w` |
| Figma — Components | `ZGgeVYWW1borOyeuljsfS4` |
| Tokens package | `packages/tokens` (`@gorilladesk/tokens`) |
| Components package | `packages/ui` (`@gorilladesk/ui`) and `component-manifest.json` |

## Start here

- `CLAUDE.md` — rules for Claude Code sessions (also the shortest summary for people).
- `docs/tokens.md` — token layers, naming, Tailwind usage.
- `docs/components.md` — component conventions, Ready for dev, states, groups.
- `docs/workflow.md` — who does what, token sync, implementing and changing components.
- `docs/decisions.md` — why things are the way they are.
- `docs/known-issues.md` — known problems and things that only look wrong.

## Commands

```bash
npm install
npm run tokens        # rebuild tokens from packages/tokens/raw
```

## Related docs (Claude)

- [Дизайн-система GorillaDesk: план старту](https://claude.ai/artifact/3E6jjupikwwnNG54qFFag9)
- [Figma-компоненти: план правок перед кодом](https://claude.ai/artifact/2xikLi9HgF4fdUUuivThut)

Rules in this repository win over those documents where they differ.
