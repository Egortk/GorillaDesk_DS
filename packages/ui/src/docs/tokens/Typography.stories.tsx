import type { Meta, StoryObj } from '@storybook/react-vite';
import { byPrefix, get, resolve, textStyles, toPx } from './data';
import { Code, Page, Section, Table } from './ui';

const WEIGHTS: Record<string, string> = { light: '300', normal: '400', medium: '500', bold: '700' };

/** Size / line height / letter spacing / weight for a Figma text style such as "body/md/medium". */
function spec(style: string) {
  const [role, size, weight] = style.split('/');
  const base = `text-${role}-${size}`;
  const px = (n: string) => toPx(resolve(n, 'light'));
  const w = weight ? WEIGHTS[weight] : get(`${base}--font-weight`) ? resolve(`${base}--font-weight`, 'light') : '400';
  return `${px(base)} / ${px(`${base}--line-height`)} · tracking ${px(`${base}--letter-spacing`)} · ${w}`;
}

const meta = {
  title: 'Tokens/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextStyles: Story = {
  name: 'Text styles',
  render: () => (
    <Page title="Text styles" intro="Figma text styles and the Tailwind classes that reproduce them (from dist/text-styles.json).">
      <Section title="Styles">
        <Table
          head={['Figma style', 'Sample', 'Classes', 'Size / line height · tracking · weight']}
          rows={Object.entries(textStyles).map(([style, classes]) => [
            <Code>{style}</Code>,
            <span className={`${classes} text-content-neutral-text-strong`}>Schedule a service visit</span>,
            <Code>{classes}</Code>,
            <span className="text-body-xs text-content-neutral-text-muted">{spec(style)}</span>,
          ])}
        />
      </Section>
      <Section title="Families & weights">
        <Table
          head={['Token', 'Value', 'Note']}
          rows={[...byPrefix('font-'), ...byPrefix('font-weight-')]
            .filter((t, i, a) => a.findIndex((x) => x.name === t.name) === i)
            .map((t) => [<Code>--{t.name}</Code>, <Code>{t.light}</Code>, <span className="text-body-xs text-content-neutral-text-muted">{t.description ?? ''}</span>])}
        />
      </Section>
    </Page>
  ),
};
