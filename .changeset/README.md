# Changesets

Every PR that changes what a package ships (`@gorilladesk/tokens` or `@gorilladesk/ui`) adds a changeset:

```bash
npx changeset
```

Pick the package(s), the bump (patch / minor / major) and write one line for the changelog. Commit the generated `.changeset/*.md` with the PR.

On `main`, the Release workflow collects the changesets into a "Version packages" PR (versions + `CHANGELOG.md`). Merging that PR publishes the packages. Process: `docs/workflow.md` → Releases.
