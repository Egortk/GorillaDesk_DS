import type { Meta, StoryObj } from '@storybook/react-vite';
import { SizeMatrix } from '../../docs/avatars';
import { AVATAR_SIZES } from './avatarBase';
import { CustomerAvatar } from './CustomerAvatar';

const meta = {
  title: 'Components/Avatar/CustomerAvatar',
  component: CustomerAvatar,
  args: { size: 'md', name: 'Olena Koval' },
  argTypes: { size: { control: 'select', options: AVATAR_SIZES } },
} satisfies Meta<typeof CustomerAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <SizeMatrix
      rows={['Olena Koval', 'Wade Warren Wilson', 'Mark']}
      render={(name, size) => <CustomerAvatar size={size} name={name} />}
    />
  ),
};
