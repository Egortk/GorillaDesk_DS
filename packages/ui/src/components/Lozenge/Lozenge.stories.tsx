import type { Meta, StoryObj } from '@storybook/react-vite';
import { Matrix } from '../../docs/helpers';
import { INTENTS } from '../../lib/palette';
import { Lozenge } from './Lozenge';

const meta = {
  title: 'Components/Lozenge',
  component: Lozenge,
  args: { intent: 'success', emphasis: 'subtle', size: 'xs', children: 'Paid' },
  argTypes: { intent: { control: 'select', options: INTENTS } },
} satisfies Meta<typeof Lozenge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <Matrix
      rows={INTENTS}
      cols={['solid / xs', 'solid / sm', 'subtle / xs', 'subtle / sm'] as const}
      render={(intent, col) => {
        const [emphasis, size] = col.split(' / ') as ['solid' | 'subtle', 'xs' | 'sm'];
        return (
          <Lozenge intent={intent} emphasis={emphasis} size={size}>
            Lozenge
          </Lozenge>
        );
      }}
    />
  ),
};
