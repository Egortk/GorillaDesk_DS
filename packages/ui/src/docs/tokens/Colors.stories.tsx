import type { Meta, StoryObj } from '@storybook/react-vite';
import { byPrefix, get, rank, resolve, type Token } from './data';
import { Page, Section, ThemePanes } from './ui';

const INTENTS = ['primary', 'secondary', 'subsidiary', 'accent', 'success', 'warning', 'danger', 'neutral', 'inverse'];

interface Group {
  key: string;
  items: { label: string; token: Token }[];
}

/** Groups colour tokens by the first `depth` name segments after "color-"; the rest is the swatch label. */
function group(prefix: string, depth: number): Group[] {
  const map = new Map<string, Group>();
  for (const token of byPrefix(prefix)) {
    const segs = token.name.replace(/^color-/, '').split('-');
    const key = segs.slice(0, depth).join('-');
    const label = segs.slice(depth).join('-') || 'value';
    if (!map.has(key)) map.set(key, { key, items: [] });
    map.get(key)!.items.push({ label, token });
  }
  for (const g of map.values()) g.items.sort((a, b) => rank(a.label) - rank(b.label));
  return [...map.values()];
}

function Swatch({ label, token }: { label: string; token: Token }) {
  const tip = [
    `--${token.name}`,
    `class: bg-/text-/border-${token.name.replace(/^color-/, '')}`,
    `light: ${resolve(token.name, 'light')}`,
    `dark: ${resolve(token.name, 'dark')}`,
    token.description ?? '',
  ]
    .filter(Boolean)
    .join('\n');
  // Text and icon colours are shown as a glyph on their own bg token (same intent, emphasis and state), if it exists.
  const fg = /-(text|icon)-/.exec(token.name)?.[1];
  const bg = fg ? get(token.name.replace(`-${fg}-`, '-bg-')) : undefined;
  return (
    <div className="flex w-12 flex-col items-center gap-(--space-2xs)" title={tip}>
      {fg ? (
        <div
          className="flex h-8 w-12 items-center justify-center rounded-sm border border-environment-border-muted text-label-lg"
          style={{ background: bg ? `var(--${bg.name})` : undefined, color: `var(--${token.name})` }}
        >
          {fg === 'text' ? 'Aa' : '●'}
        </div>
      ) : (
        <div className="h-8 w-12 rounded-sm border border-environment-border-muted" style={{ background: `var(--${token.name})` }} />
      )}
      <span className="max-w-12 truncate text-body-xs text-content-neutral-text-muted">{label}</span>
    </div>
  );
}

function Groups({ groups, strip }: { groups: Group[]; strip: string }) {
  return (
    <div className="flex flex-col gap-(--space-md)">
      {groups.map((g) => (
        <div key={g.key} className="flex items-start gap-(--space-lg)">
          <div className="w-32 shrink-0 pt-(--space-xs) text-body-sm text-content-neutral-text-default">{g.key.replace(strip, '') || g.key}</div>
          <div className="flex flex-wrap gap-(--space-xs)">
            {g.items.map((i) => (
              <Swatch key={i.token.name} {...i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const byIntent = (groups: Group[], pos: number) =>
  INTENTS.map((intent) => ({ intent, groups: groups.filter((g) => g.key.split('-')[pos] === intent) })).filter((x) => x.groups.length);

const meta = {
  title: 'Tokens/Colors',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const hint = 'Hover a swatch for the CSS variable, Tailwind class and the resolved Light / Dark values.';

export const Interactive: Story = {
  render: () => (
    <Page title="Interactive colours" intro={<>color/interactive/{'{intent}/{emphasis}/{property}/{state}'}. {hint}</>}>
      {byIntent(group('color-interactive-', 4), 1).map(({ intent, groups }) => (
        <Section key={intent} title={intent}>
          <ThemePanes>
            <Groups groups={groups} strip={`interactive-${intent}-`} />
          </ThemePanes>
        </Section>
      ))}
    </Page>
  ),
};

export const Content: Story = {
  render: () => (
    <Page title="Content colours" intro={<>color/content/{'{intent|inverse}/{property}/{level}'}. {hint}</>}>
      {byIntent(group('color-content-', 3), 1).map(({ intent, groups }) => (
        <Section key={intent} title={intent}>
          <ThemePanes>
            <Groups groups={groups} strip={`content-${intent}-`} />
          </ThemePanes>
        </Section>
      ))}
    </Page>
  ),
};

export const EnvironmentAndFocus: Story = {
  name: 'Environment & focus',
  render: () => (
    <Page title="Environment & focus" intro={hint}>
      <Section title="Environment" note="Surfaces, borders, scrims and shadow layer colours.">
        <ThemePanes>
          <Groups groups={group('color-environment-', 2)} strip="environment-" />
        </ThemePanes>
      </Section>
      <Section title="Focus">
        <ThemePanes>
          <Groups groups={group('color-focus-', 1)} strip="" />
        </ThemePanes>
      </Section>
    </Page>
  ),
};

export const Components: Story = {
  render: () => (
    <Page title="Component colours" intro={<>Component tokens alias semantic tokens for one component. {hint}</>}>
      <Section title="Button">
        <ThemePanes>
          <Groups groups={group('color-button-', 4)} strip="button-" />
        </ThemePanes>
      </Section>
      <Section title="Input">
        <ThemePanes>
          <Groups groups={group('color-input-', 2)} strip="" />
        </ThemePanes>
      </Section>
      <Section title="Field">
        <ThemePanes>
          <Groups groups={group('color-field-', 2)} strip="" />
        </ThemePanes>
      </Section>
      <Section title="Link">
        <ThemePanes>
          <Groups groups={group('color-link-', 1)} strip="" />
        </ThemePanes>
      </Section>
    </Page>
  ),
};
