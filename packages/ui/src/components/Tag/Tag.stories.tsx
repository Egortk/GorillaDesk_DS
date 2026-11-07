import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { AccountIcon, Force, iconControl, Matrix } from '../../docs/helpers';
import { INTENTS } from '../../lib/palette';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: { intent: 'neutral', emphasis: 'subtle', size: 'sm', children: 'Tag', onPress: fn(), onRemove: fn(), isDisabled: false },
  argTypes: { intent: { control: 'select', options: INTENTS }, icon: iconControl },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { icon: <AccountIcon /> } };

const STATES = ['default', 'hover', 'active', 'focused', 'disabled'] as const;

function InteractiveMatrix({ size }: { size: 'sm' | 'xs' }) {
  return (
    <Matrix
      rows={INTENTS.flatMap((i) => [`${i} / solid`, `${i} / subtle`])}
      cols={STATES}
      render={(row, state) => {
        const [intent, emphasis] = row.split(' / ') as [(typeof INTENTS)[number], 'solid' | 'subtle'];
        return (
          <Force state={state === 'disabled' ? 'default' : state}>
            <Tag
              intent={intent}
              emphasis={emphasis}
              size={size}
              icon={<AccountIcon />}
              onPress={() => {}}
              onRemove={() => {}}
              isDisabled={state === 'disabled'}
            >
              Tag
            </Tag>
          </Force>
        );
      }}
    />
  );
}

export const InteractiveSm: Story = { name: 'Interactive / sm', render: () => <InteractiveMatrix size="sm" /> };
export const InteractiveXs: Story = { name: 'Interactive / xs', render: () => <InteractiveMatrix size="xs" /> };

export const Static: Story = {
  name: 'Static (not interactive)',
  render: () => (
    <Matrix
      rows={INTENTS}
      cols={['solid / sm', 'subtle / sm', 'solid / xs', 'subtle / xs'] as const}
      render={(intent, col) => {
        const [emphasis, size] = col.split(' / ') as ['solid' | 'subtle', 'sm' | 'xs'];
        return (
          <Tag intent={intent} emphasis={emphasis} size={size} icon={<AccountIcon />} onRemove={() => {}}>
            Tag
          </Tag>
        );
      }}
    />
  ),
};
