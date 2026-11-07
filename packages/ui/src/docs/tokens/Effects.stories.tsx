import type { Meta, StoryObj } from '@storybook/react-vite';
import { byPrefix, type Token } from './data';
import { Code, Page, Section, Table, ThemePanes } from './ui';

const shadows = [...byPrefix('shadow-'), ...byPrefix('inset-shadow-')];

const note = (t: Token) => <span className="text-body-xs text-content-neutral-text-muted">{t.description ?? ''}</span>;

const meta = {
  title: 'Tokens/Effects & motion',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Shadows: Story = {
  render: () => (
    <Page title="Shadows" intro="Figma effect styles. Shadow colours come from color/environment/shadow/* and follow the theme.">
      <ThemePanes>
        <div className="flex flex-wrap gap-(--space-section-sm) bg-environment-surface-canvas p-(--space-section-sm)">
          {shadows.map((t) => (
            <div key={t.name} className="flex w-40 flex-col gap-(--space-sm)">
              <div className="h-20 rounded-md bg-environment-surface-raised" style={{ boxShadow: `var(--${t.name})` }} />
              <Code>{t.name}</Code>
            </div>
          ))}
        </div>
      </ThemePanes>
      <Section title="Values">
        <Table head={['Class', 'Value']} rows={shadows.map((t) => [<Code>{t.name}</Code>, <Code>{t.light}</Code>])} />
      </Section>
    </Page>
  ),
};

export const Motion: Story = {
  render: () => (
    <Page title="Motion & layers" intro="Starting values; review before release (docs/known-issues.md).">
      <Section title="Duration">
        <Table head={['Token', 'Usage', 'Value', 'Note']} rows={byPrefix('duration-').map((t) => [<Code>--{t.name}</Code>, <Code>duration-(--{t.name})</Code>, t.light, note(t)])} />
      </Section>
      <Section title="Easing">
        <Table head={['Token', 'Class', 'Value']} rows={byPrefix('ease-').map((t) => [<Code>--{t.name}</Code>, <Code>{t.name}</Code>, <Code>{t.light}</Code>])} />
      </Section>
      <Section title="Z-index">
        <Table
          head={['Token', 'Usage', 'Value']}
          rows={[...byPrefix('z-index-')].sort((a, b) => +a.light - +b.light).map((t) => [<Code>--{t.name}</Code>, <Code>z-(--{t.name})</Code>, t.light])}
        />
      </Section>
    </Page>
  ),
};
