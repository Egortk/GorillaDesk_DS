import type { ReactNode } from 'react';

/** Page wrapper for token docs. */
export function Page({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-(--space-section-md) p-(--space-section-md)">
      <header className="flex flex-col gap-(--space-xs)">
        <h1 className="text-heading-2xl text-content-neutral-text-strong">{title}</h1>
        {intro && <p className="max-w-3xl text-body-md text-content-neutral-text-muted">{intro}</p>}
      </header>
      {children}
    </div>
  );
}

export function Section({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-(--space-lg)">
      <div className="flex flex-col gap-(--space-2xs)">
        <h2 className="text-heading-lg text-content-neutral-text-strong">{title}</h2>
        {note && <p className="max-w-3xl text-body-sm text-content-neutral-text-muted">{note}</p>}
      </div>
      {children}
    </section>
  );
}

/** Renders the same content in a Light and a Dark pane side by side (data-theme on each pane). */
export function ThemePanes({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap gap-(--space-xl)">
      {(['light', 'dark'] as const).map((mode) => (
        <div
          key={mode}
          data-theme={mode}
          className="flex min-w-80 flex-1 flex-col gap-(--space-lg) rounded-lg border border-environment-border-default bg-environment-surface-default p-(--space-xl) text-content-neutral-text-default"
        >
          <div className="text-label-sm text-content-neutral-text-muted">{mode === 'light' ? 'Light' : 'Dark'}</div>
          {children}
        </div>
      ))}
    </div>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return <code className="font-code text-body-xs text-content-neutral-text-default">{children}</code>;
}

/** Simple token table: rows of cells. */
export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <table className="w-full border-collapse text-left text-body-sm">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} className="border-b border-environment-border-default px-(--space-md) py-(--space-sm) text-label-sm text-content-neutral-text-muted">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((cells, i) => (
          <tr key={i}>
            {cells.map((c, j) => (
              <td key={j} className="border-b border-environment-border-muted px-(--space-md) py-(--space-sm) align-middle">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
