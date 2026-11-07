import type { Meta, StoryObj } from '@storybook/react-vite';
import { byPrefix, resolve, toPx, type Token } from './data';
import { Code, Page, Section, Table } from './ui';

const value = (t: Token) => {
  const v = resolve(t.name, 'light');
  return v.endsWith('rem') ? `${v} · ${toPx(v)}` : v;
};

const sortBySize = (list: Token[]) => [...list].sort((a, b) => parseFloat(toPx(resolve(a.name, 'light'))) - parseFloat(toPx(resolve(b.name, 'light'))));

function Bar({ name }: { name: string }) {
  return <div className="h-(--space-lg) rounded-xs bg-interactive-primary-solid-bg-default" style={{ width: `var(--${name})` }} />;
}

const meta = {
  title: 'Tokens/Size',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Space: Story = {
  render: () => (
    <Page title="Space" intro="space/* is padding and gap. It lives outside the Tailwind theme on purpose: use p-(--space-md), gap-(--space-xl).">
      <Section title="Inside components">
        <Table
          head={['Token', 'Usage', 'Value', '']}
          rows={sortBySize(byPrefix('space-').filter((t) => !/^space-(section|overlap|button|input)/.test(t.name))).map((t) => [
            <Code>--{t.name}</Code>,
            <Code>p-(--{t.name})</Code>,
            value(t),
            <Bar name={t.name} />,
          ])}
        />
      </Section>
      <Section title="Between sections">
        <Table
          head={['Token', 'Usage', 'Value', '']}
          rows={sortBySize(byPrefix('space-section-')).map((t) => [<Code>--{t.name}</Code>, <Code>gap-(--{t.name})</Code>, value(t), <Bar name={t.name} />])}
        />
      </Section>
      <Section title="Overlap" note="Joins the borders of group items. Always equals minus border-width/md. Used as a margin on every item but the first.">
        <Table head={['Token', 'Usage', 'Value']} rows={byPrefix('space-overlap-').map((t) => [<Code>--{t.name}</Code>, <Code>ms-(--{t.name})</Code>, value(t)])} />
      </Section>
      <Section title="Component space">
        <Table
          head={['Token', 'Alias', 'Value']}
          rows={[...byPrefix('space-button-'), ...byPrefix('space-input-')].map((t) => [<Code>--{t.name}</Code>, <Code>{t.light}</Code>, value(t)])}
        />
      </Section>
    </Page>
  ),
};

function Box({ name, kind }: { name: string; kind: 'control' | 'icon' }) {
  return (
    <div
      className="rounded-xs border border-interactive-primary-solid-border-default bg-interactive-primary-transparent-bg-default"
      style={kind === 'control' ? { height: `var(--${name})`, width: '6rem' } : { height: `var(--${name})`, width: `var(--${name})` }}
    />
  );
}

export const ControlAndIcon: Story = {
  name: 'Control & icon size',
  render: () => (
    <Page title="Control & icon size" intro="spacing/* is element size. These live in the Tailwind theme: h-control-md, size-icon-md.">
      <Section title="Control height">
        <Table
          head={['Token', 'Class', 'Value', '']}
          rows={sortBySize(byPrefix('spacing-control-')).map((t) => [
            <Code>--{t.name}</Code>,
            <Code>h-{t.name.replace('spacing-', '')}</Code>,
            value(t),
            <Box name={t.name} kind="control" />,
          ])}
        />
      </Section>
      <Section title="Icon size">
        <Table
          head={['Token', 'Class', 'Value', '']}
          rows={sortBySize(byPrefix('spacing-icon-')).map((t) => [
            <Code>--{t.name}</Code>,
            <Code>size-{t.name.replace('spacing-', '')}</Code>,
            value(t),
            <Box name={t.name} kind="icon" />,
          ])}
        />
      </Section>
    </Page>
  ),
};

export const RadiusAndBorder: Story = {
  name: 'Radius & border',
  render: () => (
    <Page title="Radius & border width">
      <Section title="Radius">
        <Table
          head={['Token', 'Class', 'Value', '']}
          rows={sortBySize(byPrefix('radius-')).map((t) => [
            <Code>--{t.name}</Code>,
            <Code>rounded-{t.name.replace('radius-', '')}</Code>,
            value(t),
            <div className="size-12 border border-interactive-primary-solid-border-default bg-interactive-primary-transparent-bg-default" style={{ borderRadius: `var(--${t.name})` }} />,
          ])}
        />
      </Section>
      <Section title="Border width" note="Kept in px so borders and overlaps never drift apart at another root font size.">
        <Table
          head={['Token', 'Usage', 'Value', '']}
          rows={sortBySize(byPrefix('border-width-')).map((t) => [
            <Code>--{t.name}</Code>,
            <Code>border-(length:--{t.name})</Code>,
            value(t),
            <div className="h-8 w-24 rounded-xs border-solid border-content-neutral-text-default" style={{ borderWidth: `var(--${t.name})` }} />,
          ])}
        />
      </Section>
    </Page>
  ),
};
