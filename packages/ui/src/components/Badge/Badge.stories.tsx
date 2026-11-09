import type { Meta, StoryObj } from '@storybook/react-vite';
import { Matrix } from '../../docs/helpers';
import { INTENTS } from '../../lib/palette';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { variant: 'count', intent: 'primary', emphasis: 'solid', children: '16' },
  argTypes: { intent: { control: 'select', options: INTENTS } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <Matrix
      rows={INTENTS}
      cols={['count / solid', 'count / subtle', 'dot / solid', 'dot / subtle'] as const}
      render={(intent, col) => {
        const [variant, emphasis] = col.split(' / ') as ['count' | 'dot', 'solid' | 'subtle'];
        return (
          <Badge variant={variant} intent={intent} emphasis={emphasis} aria-label={variant === 'dot' ? `${intent} status` : undefined}>
            16
          </Badge>
        );
      }}
    />
  ),
};
